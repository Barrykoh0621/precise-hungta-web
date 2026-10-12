"""Create public product sheets without copying customer quotation details."""
import sys
from pathlib import Path
from pypdf import PdfReader
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = [
    ("armstrong-waw-300d", "WAW-300D", "Electro-Hydraulic Servo", "Universal Testing Machine", "300 kN", "Computerised electro-hydraulic servo", "Image34.jp2"),
    ("armstrong-yew-3000e", "YEW-3000E", "Computer Controlled", "Compression Testing Machine", "3,000 kN", "Computer controlled", "Image36.jp2"),
]


def paragraph(pdf, text, x, top, width, size=11, color="#374151"):
    style = ParagraphStyle("copy", fontName="Helvetica", fontSize=size, leading=size * 1.5, textColor=HexColor(color))
    block = Paragraph(text, style)
    _, height = block.wrap(width, 160)
    block.drawOn(pdf, x, top - height)
    return top - height


def main(source):
    images = {image.name: image.image for image in PdfReader(source).pages[0].images}
    (ROOT / "public/product-images").mkdir(parents=True, exist_ok=True)
    (ROOT / "public/catalogues/products").mkdir(parents=True, exist_ok=True)
    for slug, model, title, subtitle, capacity, control, image_name in PRODUCTS:
        image = images[image_name]
        image.save(ROOT / f"public/product-images/{slug}.png")
        pdf = canvas.Canvas(str(ROOT / f"public/catalogues/products/{slug}.pdf"), pagesize=A4)
        pdf.setTitle(f"Armstrong {model} | Hung Ta Instrument")
        pdf.setAuthor("Hung Ta Instrument Enterprise")
        pdf.setFillColor(HexColor("#c91436"))
        pdf.rect(0, 828, A4[0], 14, fill=1, stroke=0)
        pdf.setFont("Helvetica-Bold", 15)
        pdf.drawString(44, 794, "HUNG TA INSTRUMENT")
        pdf.setFillColor(HexColor("#374151"))
        pdf.setFont("Helvetica", 9)
        pdf.drawString(44, 774, "ARMSTRONG PRODUCT RANGE  /  PRODUCT CATALOGUE")
        pdf.setFillColor(HexColor("#111827"))
        pdf.setFont("Helvetica-Bold", 30)
        pdf.drawString(44, 723, model)
        pdf.setFont("Helvetica-Bold", 19)
        pdf.drawString(44, 691, title)
        pdf.drawString(44, 666, subtitle)
        pdf.drawImage(ImageReader(image), 135, 427, width=325, height=220, preserveAspectRatio=True, anchor="c", mask="auto")
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(44, 398, "MODEL OVERVIEW")
        for y, label, value in [(371, "Brand", "Armstrong"), (341, "Capacity", capacity), (311, "Control", control)]:
            pdf.setStrokeColor(HexColor("#e5e7eb"))
            pdf.line(44, y-10, 551, y-10)
            pdf.setFont("Helvetica", 10)
            pdf.drawString(44, y, label)
            pdf.setFont("Helvetica-Bold", 10)
            pdf.drawString(180, y, value)
        paragraph(pdf, "Share your specimen details, test method and laboratory requirements for a configuration review. Fixtures, measurement accuracy, power supply, dimensions and applicable standards must be confirmed before ordering.", 44, 274, 507)
        paragraph(pdf, "Specifications are subject to confirmation for the supplied configuration. Product image is reproduced from the supplied product quotation for reference.", 44, 196, 507, 9)
        pdf.setFillColor(HexColor("#c91436"))
        pdf.rect(44, 59, 507, 89, fill=1, stroke=0)
        pdf.setFillColor(HexColor("#ffffff"))
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(59, 124, "REQUEST THIS MODEL'S QUOTATION")
        pdf.setFont("Helvetica", 10)
        pdf.drawString(59, 104, "012-628 0096  |  hungtatest@yahoo.com")
        pdf.drawString(59, 83, "www.hungtainstrument.com.my  |  Seremban, Malaysia")
        pdf.linkURL(f"https://www.hungtainstrument.com.my/products/?product={slug}", (44,59,551,148), relative=0)
        pdf.setFillColor(HexColor("#6b7280"))
        pdf.setFont("Helvetica", 8)
        pdf.drawString(44, 36, "Hung Ta Instrument Enterprise | Product information sheet | October 2026")
        pdf.showPage()
        pdf.save()


if __name__ == "__main__":
    main(sys.argv[1])
