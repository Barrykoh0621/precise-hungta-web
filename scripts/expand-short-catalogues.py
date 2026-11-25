"""Reflow short public catalogues; do not infer specs from adjacent models."""
import json
import re
from html import escape
from pathlib import Path
from shutil import copyfile

from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Image, LongTable, PageBreak, Paragraph, SimpleDocTemplate, Spacer, TableStyle

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PRODUCTS = PUBLIC / "catalogues" / "products"
REF = Path.home() / "Documents" / "Barry" / "hung ta business" / "catalogue" / "D CATALOGUE"
LOGO = PUBLIC / "catalogues" / "brand" / "hungta-logo.png"
INK = colors.HexColor("#17334c")
RED = colors.HexColor("#bd153e")
PALE = colors.HexColor("#eef2f4")
WIDTH, HEIGHT = A4
FONT, BOLD = "HTBody", "HTBold"

for name, file in [(FONT, "arial.ttf"), (BOLD, "arialbd.ttf")]:
    pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / file)))


def para(value, size=11, bold=False, color=INK, leading=None):
    style = ParagraphStyle("catalogue", fontName=BOLD if bold else FONT, fontSize=size,
                           leading=leading or size * 1.42, textColor=color)
    return Paragraph(escape(str(value)), style)


def furniture(c, doc):
    c.drawImage(str(LOGO), 40, HEIGHT - 66, 36, 36, preserveAspectRatio=True, mask="auto")
    c.setFillColor(INK)
    c.setFont(BOLD, 14)
    c.drawString(85, HEIGHT - 45, "HUNG TA INSTRUMENT")
    c.setFont(FONT, 9)
    c.drawString(85, HEIGHT - 60, "Materials testing / Product catalogue")
    c.setStrokeColor(RED)
    c.line(40, HEIGHT - 78, WIDTH - 40, HEIGHT - 78)
    c.line(40, 83, WIDTH - 40, 83)
    c.setFont(BOLD, 8.5)
    c.drawString(40, 69, "For Sales & Services please call")
    c.setFont(FONT, 8)
    for y, label, uri in [
        (54, "012-2201096 | Product Specialist", "https://wa.me/60122201096"),
        (42, "012-6280096 | Marketing Manager", "https://wa.me/60126280096"),
        (30, "Email: hungtatest@yahoo.com", "mailto:hungtatest@yahoo.com"),
    ]:
        c.drawString(40, y, label)
        c.linkURL(uri, (40, y - 2, 200, y + 8), relative=0)
    c.drawString(272, 54, "Website: www.hungtainstrument.com.my")
    c.drawString(272, 42, "109, Taman A.S.T., Jalan Sungai Ujong,")
    c.drawString(272, 30, "70200 Seremban, Negeri Sembilan, Malaysia")
    c.drawRightString(WIDTH - 40, 30, str(doc.page))


def image_for(product):
    path = {
        "ht-2402": ROOT / "src/assets/ht-2402.webp",
        "ht-9501": ROOT / "src/assets/ht-9501.jpg",
        "ht-2101": ROOT / "src/assets/ht-2101.jpg",
    }.get(product["image"], PUBLIC / product["image"])
    assert path.is_file(), (product["id"], path)
    photo = Image(str(path))
    k = min(435 / photo.imageWidth, 255 / photo.imageHeight)
    photo.drawWidth, photo.drawHeight = photo.imageWidth * k, photo.imageHeight * k
    return photo


def build(product, target):
    heading = f'{product.get("brand") or "Hung Ta"}  |  {product["model"]}'
    story = [para(heading, 14, True, RED), Spacer(1, 8),
             para(product["name"], 23, True), Spacer(1, 10), image_for(product),
             Spacer(1, 15), para("Product overview", 14, True),
             Spacer(1, 5), para(product["description"])]
    if product.get("idealFor"):
        story += [Spacer(1, 12), para("Typical applications", 13, True), Spacer(1, 5),
                  para(" / ".join(product["idealFor"]))]
    story += [PageBreak(), para(heading, 12, True, RED), Spacer(1, 8),
              para("Technical specifications", 21, True), Spacer(1, 12)]
    rows = [[para("Parameter", 10, True, colors.white), para("Specification", 10, True, colors.white)]]
    rows += [[para(item["label"], 9.5, True), para(item["value"], 9.5)] for item in product["specs"]]
    table = LongTable(rows, colWidths=[183, WIDTH-275], repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [PALE, colors.white]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    story.append(table)
    if product.get("standards"):
        story += [Spacer(1, 14), para("Standards listed for this model", 12, True),
                  Spacer(1, 5), para(" / ".join(product["standards"]), 9.5)]
    story += [Spacer(1, 12), para("Confirm accessories, fixtures and supplied configuration in the quotation.", 9)]
    SimpleDocTemplate(str(target), pagesize=A4, leftMargin=40, rightMargin=40, topMargin=99,
                      bottomMargin=97, title=product["model"] + " Product Catalogue",
                      author="Hung Ta Instrument").build(story, onFirstPage=furniture, onLaterPages=furniture)


def code(value):
    return re.sub(r"[^a-z0-9]", "", value.lower())


def main():
    products = json.loads((ROOT / "tmp" / "catalogue-products.json").read_text(encoding="utf-8"))
    candidates = [(code(p.stem), p.name) for p in REF.rglob("*") if p.suffix.lower() in (".pdf", ".docx", ".doc")]
    results = []
    for product in products:
        slug = product["id"]
        path = PRODUCTS / (slug + ".pdf")
        before = len(PdfReader(path).pages)
        if before == 1:
            build(product, path)
        reader = PdfReader(path)
        assert len(reader.pages) >= 2, slug
        if before == 1:
            first, second = reader.pages[:2]
            assert "Product overview" in first.extract_text() and len(first.images) >= 2, slug
            assert "Technical specifications" in second.extract_text(), slug
            whole = " ".join(" ".join(page.extract_text().split()) for page in reader.pages[1:])
            for spec in product["specs"]:
                assert " ".join(spec["value"].split()) in whole, (slug, spec)
        model = code(product["model"])
        sources = sorted({name for key, name in candidates if len(model) >= 5 and model in key})
        status = "Source specifications checked" if slug in {"armstrong-wdw-02d", "chy-ca", "hd-a520"} else "Original-source comparison pending"
        results.append((slug, product["model"], before, len(reader.pages), len(product["specs"]), status, sources))
    for filename, slug in {
        "armstrong-automatic-concrete-compression-tester.pdf": "armstrong-concrete-compression-tester",
        "armstrong-800c-muffle-furnace.pdf": "armstrong-muffle-furnace-800c",
        "armstrong-200g-laboratory-balance.pdf": "armstrong-laboratory-balance-200g",
        "armstrong-5kg-digital-weighing-scale.pdf": "armstrong-digital-scale-5kg",
    }.items():
        dest = PUBLIC / "catalogues" / filename
        if len(PdfReader(dest).pages) < 2:
            copyfile(PRODUCTS / (slug + ".pdf"), dest)
    (ROOT / "tmp" / "catalogue-expansion-audit.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"Verified {len(results)} models at two or more pages; rebuilt {sum(row[2] == 1 for row in results)}.")


if __name__ == "__main__":
    main()
