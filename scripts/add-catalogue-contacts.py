"""Update catalogue footers without reflowing product specifications or images."""

import argparse
from collections import Counter
from contextlib import closing
from hashlib import sha256
from io import BytesIO
from math import ceil
from pathlib import Path
from tempfile import NamedTemporaryFile

import pypdfium2 as pdfium
from PIL import Image, ImageChops, ImageDraw
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ArrayObject, NameObject
from reportlab.lib.colors import HexColor
from reportlab.pdfgen.canvas import Canvas


CONTACTS = (
    ("012-2201096  |  Barry, Product Specialist", "https://wa.me/60122201096"),
    ("012-6280096  |  Jackie, Marketing Manager", "https://wa.me/60126280096"),
    ("hungtatest@yahoo.com", "mailto:hungtatest@yahoo.com"),
)
SITE = "https://www.hungtainstrument.com.my/"
ADDRESS = (
    "109, Taman A.S.T., Jalan Sungai Ujong,",
    "70200 Seremban, Negeri Sembilan, Malaysia",
)
PROFILES = {
    "unified": (79, (
        "HUNG TA INSTRUMENT  |  www.hungtainstrument.com.my",
        "Tel / WhatsApp: +60 12-628 0096  |  hungtatest@yahoo.com",
        "109, Taman A.S.T., Jalan Sungai Ujong, 70200 Seremban,",
        "Negeri Sembilan, Malaysia",
    )),
    "compact": (52, (
        "109, Taman A.S.T., Jalan Sungai Ujong, 70200 Seremban, Negeri Sembilan, Malaysia",
        "+60 12-628 0096  |  hungtatest@yahoo.com  |  www.hungtainstrument.com.my",
    )),
    "legacy": (41, ("www.hungtainstrument.com.my  |  06-763 6031",)),
}
PROFILES["compact-landline"] = (52, (
    PROFILES["compact"][1][0],
    "+60 6-763 6031  |  hungtatest@yahoo.com  |  www.hungtainstrument.com.my",
))
FOOTER_HEIGHT = 53


def normal(text):
    return " ".join(text.split())


def identify(page, rendered):
    stream = page.get_contents()
    texts = Counter(normal(str(a[0])) for a, op in stream.operations if op == b"Tj")
    with closing(rendered.get_textpage()) as tp:
        bottom = rendered.get_bbox()[1]
        footer = normal(tp.get_text_bounded(0, bottom, rendered.get_width(), bottom + 79))
        if all(normal(label) in footer for label, _ in CONTACTS):
            raise ValueError("This page already has the new contact footer")
        for profile, (height, lines) in PROFILES.items():
            footer = normal(tp.get_text_bounded(0, 0, rendered.get_width(), height))
            if all(texts[normal(line)] == 1 and normal(line) in footer for line in lines):
                return profile
    return "extension"


def overlay(width, height, profile):
    buffer = BytesIO()
    c = Canvas(buffer, pagesize=(width, height), pageCompression=1)
    x = 39
    baseline = {"unified": 64, "compact": 40, "compact-landline": 40,
                "legacy": 30, "extension": 34}[profile]
    gap = 11 if profile != "unified" else 13
    c.setFillColor(HexColor("#16293d"))
    if profile == "extension":
        c.setStrokeColor(HexColor("#d5dce1"))
        c.line(x, 46, width - x, 46)
    for i, (label, uri) in enumerate(CONTACTS):
        y = baseline - gap * i
        c.setFont("Helvetica-Bold" if i == 0 else "Helvetica", 8.5)
        c.drawString(x, y, label)
        c.linkURL(uri, (x, y - 2, x + c.stringWidth(label), y + 8), relative=0)
    right = 258
    website = "www.hungtainstrument.com.my"
    c.setFont("Helvetica-Bold", 8)
    c.drawString(right, baseline, "HUNG TA INSTRUMENT")
    c.setFont("Helvetica", 8)
    c.drawString(right, baseline - gap, website)
    c.linkURL(SITE, (right, baseline - gap - 2,
                    right + c.stringWidth(website), baseline - gap + 8), relative=0)
    if profile != "legacy":
        c.drawString(right, baseline - 2 * gap, ADDRESS[0])
        c.drawString(right, baseline - 2 * gap - 9, ADDRESS[1])
    else:
        c.drawString(right, baseline - 2 * gap, "Office: 06-763 6031")
    c.showPage()
    c.save()
    return PdfReader(buffer).pages[0]


def render(page):
    with closing(page.render(scale=1)) as bitmap:
        return bitmap.to_pil().convert("RGB")


def rewrite(source, data):
    reader = PdfReader(BytesIO(data))
    writer = PdfWriter(clone_from=reader)
    profiles = []
    with pdfium.PdfDocument(data) as original:
        for i, page in enumerate(writer.pages):
            with closing(original[i]) as old:
                profile = identify(page, old)
            if (page.rotation or tuple(page.cropbox) != tuple(page.mediabox)
                    or float(page.mediabox.left) != 0 or float(page.mediabox.bottom) != 0):
                raise ValueError(f"Unexpected page geometry: {source}, page {i + 1}")
            profiles.append(profile)
            if profile == "extension":
                page.mediabox.bottom = -FOOTER_HEIGHT
                page.cropbox.bottom = -FOOTER_HEIGHT
            else:
                limit, lines = PROFILES[profile]
                old_lines = set(map(normal, lines))
                stream = page.get_contents()
                stream.operations = [(a, op) for a, op in stream.operations
                                     if op != b"Tj" or normal(str(a[0])) not in old_lines]
                page.replace_contents(stream)
                if "/Annots" in page:
                    page[NameObject("/Annots")] = ArrayObject([
                        ref for ref in page["/Annots"]
                        if not (
                            ref.get_object().get("/Subtype") == "/Link"
                            and float(ref.get_object()["/Rect"][3]) <= limit
                            and str(ref.get_object().get("/A", {}).get("/URI", "")).startswith(
                                ("https://wa.me/", "mailto:", SITE)
                            )
                        )
                    ])
            width, height = float(page.mediabox.width), float(page.mediabox.height)
            page.merge_translated_page(overlay(width, height, profile), 0,
                                       -FOOTER_HEIGHT if profile == "extension" else 0)
            page.compress_content_streams()

    output = BytesIO()
    writer.write(output)
    result = output.getvalue()
    checked = PdfReader(BytesIO(result))
    samples = {}
    with pdfium.PdfDocument(data) as before, pdfium.PdfDocument(result) as after:
        assert len(before) == len(after) == len(checked.pages)
        for i, (profile, page) in enumerate(zip(profiles, checked.pages)):
            links = [str(a.get_object().get("/A", {}).get("/URI")) for a in page.get("/Annots", [])]
            assert all(uri in links for _, uri in CONTACTS), (source, i, "links")
            with closing(before[i]) as original, closing(after[i]) as edited, closing(edited.get_textpage()) as tp:
                limit = 0 if profile == "extension" else PROFILES[profile][0]
                box = (-FOOTER_HEIGHT, -1) if profile == "extension" else (0, limit)
                footer = normal(tp.get_text_bounded(0, box[0], edited.get_width(), box[1]))
                labels = [footer.index(normal(label)) for label, _ in CONTACTS]
                assert labels == sorted(labels), (source, i, "contact order")
                old_img, new_img = render(original), render(edited)
                comparison = new_img
                if profile == "extension":
                    # Match the old viewport to avoid subpixel scaling from the taller page.
                    edited.set_mediabox(*original.get_mediabox())
                    edited.set_cropbox(*original.get_cropbox())
                    comparison = render(edited)
                unchanged = (0, 0, old_img.width, old_img.height - ceil(limit))
                diff = ImageChops.difference(old_img.crop(unchanged), comparison.crop(unchanged))
                channels = diff.split()
                maximum = ImageChops.lighter(ImageChops.lighter(channels[0], channels[1]), channels[2])
                # Re-encoding PDF coordinates can round an isolated antialiased pixel.
                hist = maximum.histogram()
                assert sum(hist[1:]) <= 8 or (sum(hist[1:]) <= 400 and sum(hist[17:]) == 0), (
                    source, i, "body changed", diff.getbbox(), sum(hist[1:]), sum(hist[17:]))
                if profile not in samples:
                    samples[profile] = new_img.crop((0, new_img.height - max(limit, FOOTER_HEIGHT),
                                                     new_img.width, new_img.height))
    return result, profiles, samples


def replace(path, data):
    with NamedTemporaryFile(dir=path.parent, suffix=".tmp", delete=False) as stream:
        temporary = Path(stream.name)
        stream.write(data)
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true")
    parser.add_argument("--preview", type=Path, required=True)
    parser.add_argument("roots", nargs="+", type=Path)
    args = parser.parse_args()
    files = sorted({f for root in args.roots for f in
                    ([root] if root.is_file() else root.rglob("*.pdf"))})
    if not files:
        parser.error("no PDF catalogues found")
    results, pending, previews, counts = {}, [], {}, Counter()
    for f in files:
        data = f.read_bytes()
        key = sha256(data).digest()
        if key not in results:
            results[key] = rewrite(f, data)
        output, profiles, samples = results[key]
        pending.append((f, output))
        counts.update(profiles)
        for profile, sample in samples.items():
            previews.setdefault(profile, (f.name, sample))
    sheet = Image.new("RGB", (660, sum(im.height + 27 for _, im in previews.values())), "#edf1f4")
    draw = ImageDraw.Draw(sheet)
    y = 0
    for profile, (filename, im) in previews.items():
        draw.text((12, y + 5), f"{profile}: {filename}", fill="#16293d")
        sheet.paste(im, (12, y + 22))
        y += im.height + 27
    args.preview.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(args.preview)
    if args.apply:
        for f, output in pending:
            replace(f, output)
    print(f"{'Updated' if args.apply else 'Verified'} {len(files)} PDFs / {sum(counts.values())} pages")
    print(dict(counts))


if __name__ == "__main__":
    main()
