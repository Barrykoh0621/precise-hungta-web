"""One public catalogue design; preserve detailed content from supplied source PDFs."""
import argparse
import hashlib
import json
import re
import shutil
from html import escape
from io import BytesIO
from pathlib import Path

import pdfplumber
from PIL import Image as PILImage
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, LongTable, Table, TableStyle, KeepTogether, PageBreak

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
OUT = PUBLIC / "catalogues"
QA = ROOT / "tmp/catalogue-unification"
INK = colors.HexColor("#17334c")
RED = colors.HexColor("#bd153e")
GREY = colors.HexColor("#576470")
WIDTH = A4[0] - 80
FONT = "HTBody"
BOLD = "HTBold"


def clean(text):
    return re.sub(r"\benterprise\b", "business", str(text), flags=re.I).replace("\u00a0", " ").strip()


def p(text, style="body"):
    return Paragraph(escape(clean(text)).replace("\n", "<br/>"), STYLES[style])


def picture(image, width=WIDTH, max_height=240):
    if isinstance(image, Path):
        image = PILImage.open(image)
    image = image.copy()
    image.thumbnail((1400, 1400), PILImage.Resampling.LANCZOS)
    if image.mode == "RGBA":
        background = PILImage.new("RGB", image.size, "white")
        background.paste(image, mask=image.getchannel("A"))
        image = background
    else:
        image = image.convert("RGB")
    buffer = BytesIO()
    image.save(buffer, format="JPEG", quality=92, optimize=True)
    buffer.seek(0)
    ratio = min(width / image.width, max_height / image.height)
    result = Image(buffer, width=image.width * ratio, height=image.height * ratio)
    result.hAlign = "CENTER"
    return result


def table(rows, widths=None):
    cells = [[p(cell or "", "cell") for cell in row] for row in rows]
    result = LongTable(cells, colWidths=widths, repeatRows=1, hAlign="LEFT")
    result.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f1f4f6")]),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
        ("LINEBELOW", (0, 0), (-1, -1), .35, colors.HexColor("#d5dce1")),
    ]))
    for cell in cells[0]:
        cell.style = STYLES["tablehead"]
    for index, row in enumerate(rows[1:], start=1):
        if row[0] and all(not cell for cell in row[1:]):
            result.setStyle(TableStyle([("SPAN", (0, index), (-1, index))]))
    return result


def furniture(canvas, doc):
    canvas.saveState()
    canvas.drawImage(ImageReader(LOGO), 40, A4[1] - 69, width=43, height=43, preserveAspectRatio=True, mask="auto")
    canvas.setFillColor(INK)
    canvas.setFont(BOLD, 16)
    canvas.drawString(95, A4[1] - 43, "HUNG TA INSTRUMENT")
    canvas.setFillColor(GREY)
    canvas.setFont(FONT, 8.5)
    canvas.drawString(95, A4[1] - 60, "Quality / Service / Technology")
    canvas.setStrokeColor(colors.HexColor("#d5dce1"))
    canvas.line(40, A4[1] - 81, A4[0] - 40, A4[1] - 81)
    canvas.line(40, 82, A4[0] - 40, 82)
    canvas.setFont(BOLD, 8)
    canvas.setFillColor(INK)
    canvas.drawString(40, 67, "HUNG TA INSTRUMENT  |  www.hungtainstrument.com.my")
    canvas.setFont(FONT, 8)
    canvas.drawString(40, 53, "Tel / WhatsApp: +60 12-628 0096  |  hungtatest@yahoo.com")
    canvas.drawString(40, 39, "109, Taman A.S.T., Jalan Sungai Ujong, 70200 Seremban,")
    canvas.drawString(40, 26, "Negeri Sembilan, Malaysia")
    canvas.drawRightString(A4[0] - 40, 26, f"{doc.page}")
    canvas.linkURL("https://www.hungtainstrument.com.my/", (40, 61, 450, 76), relative=0)
    canvas.restoreState()


def build(destination, story, title):
    destination.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(str(destination), pagesize=A4, leftMargin=40, rightMargin=40,
                            topMargin=99, bottomMargin=100, title=title,
                            author="Hung Ta Instrument", subject="Product catalogue")
    doc.build(story, onFirstPage=furniture, onLaterPages=furniture)


def quote(product):
    return [Spacer(1, 12), p("Configuration & quotation", "heading"),
            p("Send the specimen material and dimensions, required force range, test method and factory location. Confirm the supplied machine, fixtures and accessories in the quotation."),
            p("Specifications are reference values for configuration review. Contact Hung Ta Instrument for the current supplied configuration.", "small")]


def local_image(product, old_pdf):
    name = product["image"]
    lookup = {"ht-2402": ROOT / "src/assets/ht-2402.webp", "ht-9501": ROOT / "src/assets/ht-9501.jpg", "ht-2101": ROOT / "src/assets/ht-2101.jpg"}
    file = lookup.get(name, PUBLIC / name)
    if file.exists():
        return file
    if old_pdf.exists():
        candidates = [i.image for page in PdfReader(old_pdf).pages for i in page.images]
        if candidates:
            return max(candidates, key=lambda im: im.width * im.height)
    return None


def standard_product(product, image_height=155):
    target = OUT / "products" / f"{product['id']}.pdf"
    image = local_image(product, target)
    story = [p((product.get("brand") or "Hung Ta") + " / PRODUCT CATALOGUE", "eyebrow"),
             p(product["model"], "title"), p(product["name"], "subtitle"), p(product["tagline"], "small"), Spacer(1, 12)]
    if image is not None:
        story += [picture(image, max_height=image_height), Spacer(1, 10)]
    story += [p("Product overview", "heading"), p(product["description"]),
              p("Technical specifications", "heading"), table([["Parameter", "Specification"]] + [[s["label"], s["value"]] for s in product["specs"]], [185, WIDTH - 185])]
    if product.get("idealFor"):
        story += [p("Typical applications", "heading"), p(" / ".join(product["idealFor"]))]
    if product.get("standards"):
        story += [p("Referenced standards", "heading"), p(" / ".join(product["standards"]))]
    story += quote(product)
    build(target, story, f"{product['model']} Product Catalogue | Hung Ta Instrument")
    pages = PdfReader(target).pages
    if len(pages) > 1 and image_height > 100:
        last_lines = [line for line in pages[-1].extract_text().splitlines() if not line.startswith(("HUNG TA", "Quality /", "Tel /", "109,", "Negeri Sembilan")) and not line.strip().isdigit()]
        if len(" ".join(last_lines)) < 350:
            standard_product(product, image_height - 25)


def source_story(source, product):
    """Reflow source text and tables, with original technical artwork in reading order."""
    story = [p("ARMSTRONG / PRODUCT CATALOGUE", "eyebrow"), p(product["model"], "title"), p(product["name"], "subtitle")]
    reader = PdfReader(source)
    with pdfplumber.open(source) as pdf:
        for number, page in enumerate(pdf.pages):
            body = page.crop((0, 97, page.width, 775))
            if product["model"] == "YEW-3000E" and number == 1:
                description = body.extract_text().split("Specifications", 1)[0].replace("Product Description", "", 1)
                story += [PageBreak(), p("Product description", "heading"), p(description), p("Technical specifications", "heading"),
                          table([["Parameter", "Specification"]] + [[s["label"], s["value"]] for s in product["specs"]], [185, WIDTH - 185]),
                          p("Extra wide and/or extra height frames are available. The power supply system is customisable."),
                          p("The source lists both 3000 kN and 300000 kgf, and a minimum resolution of 0.01 N. Confirm these numerical values for the supplied configuration before ordering.", "small")]
                continue
            tables = [t for t in page.find_tables() if t.bbox[1] >= 90 and t.bbox[3] <= 775 and t.bbox[3] - t.bbox[1] > 50]
            # The YEW specification table has fragmented borders; retain its full text instead.
            if product["model"] == "YEW-3000E" and number == 1:
                tables = []
            excluded = [t.bbox for t in tables]
            text_body = body.filter(lambda obj: not (obj.get("object_type") == "char" and any(
                box[0] <= (obj["x0"] + obj["x1"]) / 2 <= box[2] and box[1] <= (obj["top"] + obj["bottom"]) / 2 <= box[3]
                for box in excluded)))
            events = []
            for line in text_body.extract_text_lines():
                if line["text"].strip():
                    events.append((line["top"], "text", line["text"]))
            for item in tables:
                rows = [[clean(cell or "") for cell in row] for row in item.extract()]
                rows = [row for row in rows if any(row)]
                rows = [row for row in rows if not (len(row) > 1 and all(not cell for cell in row[1:]) and (re.fullmatch(r"\d+", row[0]) or row[0] == "Serial No."))]
                if rows:
                    events.append((item.bbox[1], "table", rows))
            images = {i.name.rsplit(".", 1)[0]: i.image for i in reader.pages[number].images}
            for image in body.images:
                if image["top"] < 97 or image["height"] < 25:
                    continue
                key = image["name"].lstrip("/")
                if key in images:
                    top = image["top"]
                    containing = next((t for t in tables if t.bbox[1] <= top < t.bbox[3]), None)
                    if containing:
                        top = containing.bbox[3] + .1
                    value = images[key]
                    if product["model"] == "YEW-3000E" and number >= 2:
                        label = "Accessory"
                        if containing:
                            rows = containing.extract()
                            centre = (image["top"] + image["bottom"]) / 2
                            for index, row in enumerate(containing.rows):
                                if row.bbox[1] <= centre <= row.bbox[3] and len(rows[index]) > 1:
                                    label = rows[index][1] or label
                                    break
                        value = (images[key], label)
                    events.append((top, "image", value))
            pending = []
            gallery = []
            def flush():
                if pending:
                    story.append(p(" ".join(pending)))
                    story.append(Spacer(1, 5))
                    pending.clear()
            for _, kind, value in sorted(events, key=lambda event: event[0]):
                if kind == "text":
                    heading = len(value) < 95 and (re.match(r"^(?:\d+[.)]|[IVX]+\.|Product description|Specifications|Machine Accessories|NOTE:)", value, re.I) or value.endswith(":"))
                    if heading:
                        flush()
                        story.append(p(value, "heading"))
                    else:
                        pending.append(value)
                else:
                    flush()
                    if kind == "image":
                        if product["model"] == "YEW-3000E" and number >= 2:
                            illustration, label = value
                            gallery.append([picture(illustration, width=WIDTH / 3 - 16, max_height=105), p(label, "small")])
                        else:
                            story += [picture(value, max_height=230), Spacer(1, 10)]
                    else:
                        rows = value
                        if len(rows[0]) == 5 and (product["model"] == "YEW-3000E"):
                            # Remove the empty picture column; the original images follow the table.
                            rows = [[row[i] for i in [0, 1, 3, 4]] for row in rows]
                            for row in rows:
                                if len(row[0]) > 8 and not row[1]:
                                    row[1], row[0] = row[0], ""
                        header = ["No.", "Item", "Specification / remarks", "Quantity"] if len(rows[0]) == 4 else ["No.", "Parameter", "Value"] if len(rows[0]) == 3 else None
                        if header and not any("name" in cell.lower() or "project" in cell.lower() for cell in rows[0]):
                            rows.insert(0, header)
                        widths = [32, 155, WIDTH - 240, 53] if len(rows[0]) == 4 else [32, 250, WIDTH - 282] if len(rows[0]) == 3 else [WIDTH / len(rows[0])] * len(rows[0])
                        story += [table(rows, widths), Spacer(1, 10)]
            flush()
            if gallery:
                rows = [gallery[i:i+3] + [""] * (3 - len(gallery[i:i+3])) for i in range(0, len(gallery), 3)]
                grid = Table(rows, colWidths=[WIDTH / 3] * 3)
                grid.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8)]))
                story += [p("Accessory reference images", "heading"), grid, Spacer(1, 10)]
    story += [p("Configuration notes", "heading"), p("Technical values, standards references, software functions and accessory information are reproduced from the supplied product catalogue. Confirm the applicable standards, current numerical values and supplied configuration with the quotation.", "small")]
    return story


def main():
    global LOGO, STYLES
    args = argparse.ArgumentParser()
    args.add_argument("--waw-source", required=True)
    args.add_argument("--yew-source", required=True)
    args.add_argument("--only-detailed", action="store_true")
    options = args.parse_args()
    pdfmetrics.registerFont(TTFont(FONT, "C:/Windows/Fonts/arial.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, "C:/Windows/Fonts/arialbd.ttf"))
    pdfmetrics.registerFontFamily(FONT, normal=FONT, bold=BOLD, italic=FONT, boldItalic=BOLD)
    STYLES = {
        "body": ParagraphStyle("body", fontName=FONT, fontSize=9, leading=13, textColor=INK, spaceAfter=5),
        "small": ParagraphStyle("small", fontName=FONT, fontSize=8, leading=11, textColor=GREY, spaceAfter=6),
        "heading": ParagraphStyle("heading", fontName=BOLD, fontSize=11, leading=15, textColor=INK, spaceBefore=8, spaceAfter=5, keepWithNext=True),
        "title": ParagraphStyle("title", fontName=BOLD, fontSize=25, leading=30, textColor=INK, spaceAfter=8, keepWithNext=True),
        "subtitle": ParagraphStyle("subtitle", fontName=BOLD, fontSize=15, leading=20, textColor=INK, spaceAfter=8, keepWithNext=True),
        "eyebrow": ParagraphStyle("eyebrow", fontName=BOLD, fontSize=8, leading=12, textColor=RED, spaceAfter=8),
        "cell": ParagraphStyle("cell", fontName=FONT, fontSize=8.5, leading=12, textColor=INK),
        "tablehead": ParagraphStyle("tablehead", fontName=BOLD, fontSize=8.5, leading=12, textColor=colors.white),
    }
    QA.mkdir(parents=True, exist_ok=True)
    backup = QA / "originals"
    if not backup.exists():
        shutil.copytree(OUT, backup)
    logo_file = OUT / "brand/hungta-logo.png"
    logo_file.parent.mkdir(parents=True, exist_ok=True)
    PdfReader(options.waw_source).pages[0].images[0].image.save(logo_file)
    LOGO = PILImage.open(logo_file)
    products = json.loads((ROOT / "tmp/catalogue-products.json").read_text(encoding="utf-8"))
    special = {"armstrong-waw-300e": options.waw_source, "armstrong-yew-3000e": options.yew_source}
    for product in products:
        if product["id"] in special:
            build(OUT / "products" / f"{product['id']}.pdf", source_story(special[product["id"]], product), f"{product['model']} Product Catalogue | Hung Ta Instrument")
        elif not options.only_detailed:
            standard_product(product)
    aliases = {
        "armstrong-automatic-concrete-compression-tester.pdf": "armstrong-concrete-compression-tester",
        "armstrong-800c-muffle-furnace.pdf": "armstrong-muffle-furnace-800c",
        "armstrong-200g-laboratory-balance.pdf": "armstrong-laboratory-balance-200g",
        "armstrong-5kg-digital-weighing-scale.pdf": "armstrong-digital-scale-5kg",
        "products/armstrong-waw-300d.pdf": "armstrong-waw-300e",
    }
    for alias, product_id in aliases.items():
        shutil.copy2(OUT / "products" / f"{product_id}.pdf", OUT / alias)
    results = []
    for file in OUT.rglob("*.pdf"):
        reader = PdfReader(file)
        for page in reader.pages:
            text = page.extract_text()
            assert "enterprise" not in text.lower(), file
            assert "HUNG TA INSTRUMENT" in text, file
            image_objects = [value.get_object() for value in page["/Resources"].get("/XObject", {}).values()]
            logos = [obj for obj in image_objects if obj.get("/Subtype") == "/Image" and (obj.get("/Width"), obj.get("/Height")) == LOGO.size]
            assert any(hashlib.sha256(obj.get_data()).digest() == hashlib.sha256(LOGO.convert("RGB").tobytes()).digest() for obj in logos), (file, "Logo missing")
        assert "enterprise" not in str(reader.metadata).lower(), file
        results.append({"file": str(file.relative_to(ROOT)), "pages": len(reader.pages)})
    (QA / "verification.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"Verified {len(results)} catalogues: logo on every page; no Enterprise in text or metadata.")


if __name__ == "__main__":
    main()
