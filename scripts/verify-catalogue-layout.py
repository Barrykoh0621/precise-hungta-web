"""Render every public catalogue page and check common branding and source coverage."""
from pathlib import Path
from collections import Counter
import json
import re
import pdfplumber
from pypdf import PdfReader
from pdf2image import convert_from_path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tmp/catalogue-unification/qa"
OUT.mkdir(parents=True, exist_ok=True)
tiles = []
count = 0
for path in sorted((ROOT / "public/catalogues").rglob("*.pdf")):
    reader = PdfReader(path)
    for number, page in enumerate(reader.pages, start=1):
        text = page.extract_text()
        assert "enterprise" not in text.lower(), path
        assert "HUNG TA INSTRUMENT" in text, path
        assert "+60 12-628 0096" in text, path
    rendered = convert_from_path(str(path), dpi=30, fmt="png", thread_count=1)
    for number, image in enumerate(rendered, start=1):
        tile = Image.new("RGB", (260, 390), "#e5e7eb")
        image.thumbnail((250, 355))
        tile.paste(image, ((260-image.width)//2, 25))
        ImageDraw.Draw(tile).text((5, 5), f"{path.stem[:29]} / {number}", fill="black")
        tiles.append(tile)
        count += 1
for start in range(0, len(tiles), 24):
    sheet = Image.new("RGB", (1040, 2340), "#e5e7eb")
    for index, tile in enumerate(tiles[start:start+24]):
        sheet.paste(tile, ((index % 4)*260, (index//4)*390))
    sheet.save(OUT / f"all-catalogues-{start//24+1}.png")

def words(text):
    return set(re.findall(r"[a-z0-9]+", text.lower()))

coverage = []
for source, target in [(Path(r"C:/Users/USER/Downloads/HTE WAW-300E 300KN.pdf"), "armstrong-waw-300e"),
                       (Path(r"C:/Users/USER/Downloads/HTE YEW-3000E 3000kN.pdf"), "armstrong-yew-3000e")]:
    with pdfplumber.open(source) as pdf:
        source_words = words(" ".join(page.crop((0, 97, page.width, 775)).extract_text() or "" for page in pdf.pages))
    output = PdfReader(ROOT / f"public/catalogues/products/{target}.pdf")
    output_words = words(" ".join(page.extract_text() for page in output.pages))
    missing = sorted(source_words-output_words)
    coverage.append({"model": target, "pages": len(output.pages), "source_word_coverage": round(1-len(missing)/len(source_words), 4), "missing_words": missing})
(OUT / "source-coverage.json").write_text(json.dumps(coverage, indent=2), encoding="utf-8")
print(json.dumps({"rendered_pages": count, "contact_sheets": (len(tiles)+23)//24, "source_coverage": coverage}, indent=2))
