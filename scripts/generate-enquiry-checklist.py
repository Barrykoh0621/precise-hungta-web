"""Generate the customer-facing, fillable A4 enquiry checklist."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "public/testing-machine-enquiry-checklist.pdf"
RED = HexColor("#c92332")
INK = HexColor("#242424")
GREY = HexColor("#606060")
LINE = HexColor("#d5d5d5")
W, H = A4
M = 36
c = canvas.Canvas(str(DEST), pagesize=A4)
c.setTitle("Testing Machine Enquiry Checklist | Hung Ta Instrument")
c.setAuthor("Hung Ta Instrument Enterprise")
c.setSubject("Machine selection, calibration and service enquiry form")
c.setFillColor(RED)
c.rect(0, H - 10, W, 10, fill=1, stroke=0)
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 19)
c.drawString(M, H - 48, "HUNG TA INSTRUMENT")
c.setFont("Helvetica", 9)
c.setFillColor(GREY)
c.drawString(M, H - 65, "MALAYSIA  /  MACHINE SUPPLY, CALIBRATION & SERVICE ENQUIRIES")
c.setFillColor(INK)
c.setFont("Helvetica-Bold", 22)
c.drawString(M, H - 100, "Testing machine enquiry checklist")
c.setFont("Helvetica", 9)
c.setFillColor(GREY)
c.drawString(M, H - 119, "Complete the relevant sections. Leave unknown details blank; attach photos or records if available.")
fields = []
y = H - 145

def section(number, title):
    global y
    c.setFillColor(RED)
    c.setFont("Helvetica-Bold", 10)
    c.drawString(M, y, number)
    c.setFillColor(INK)
    c.drawString(M + 25, y, title)
    c.setStrokeColor(LINE)
    c.line(M, y - 7, W - M, y - 7)
    y -= 31

def row(name, label):
    global y
    c.setFont("Helvetica", 9)
    c.setFillColor(INK)
    c.drawString(M, y + 5, label)
    c.acroForm.textfield(name=name, tooltip=label, x=M + 190, y=y,
                        width=W - 2 * M - 190, height=21,
                        fontName="Helvetica", fontSize=9, textColor=INK,
                        borderColor=LINE, fillColor=HexColor("#f7f7f7"),
                        borderWidth=0.6, forceBorder=True, maxlen=250)
    fields.append(name)
    y -= 28

section("01", "CONTACT & SCHEDULING")
row("company", "Company / contact person")
row("contact", "Phone / email")
row("location", "Factory location / required date")
section("02", "NEW MACHINE SELECTION")
for name, label in [
    ("material", "Material / product"),
    ("specimen", "Specimen shape / dimensions"),
    ("test_type", "Test type: tensile / compression / other"),
    ("force", "Working force range / maximum load"),
    ("method", "Test method / customer standard"),
    ("fixtures", "Grips / fixtures / report requirements"),
]:
    row(name, label)
section("03", "CALIBRATION OR SERVICE SUPPORT")
for name, label in [
    ("machine", "Machine brand / model / serial no."),
    ("capacity", "Load cell capacity / working range"),
    ("controller", "Controller / software"),
    ("condition", "Faults / recent repairs"),
    ("calibration", "Previous calibration / due date"),
    ("records", "Certificate / audit requirements"),
]:
    row(name, label)

y -= 3
c.setFillColor(RED)
c.setFont("Helvetica-Bold", 10)
c.drawString(M, y, "SEND YOUR COMPLETED CHECKLIST")
c.setFillColor(INK)
c.setFont("Helvetica", 9)
c.drawString(M, y - 17, "Email: hungtatest@yahoo.com    |    WhatsApp: +60 12-628 0096")
c.linkURL("mailto:hungtatest@yahoo.com", (M, y - 21, M + 170, y - 7), relative=0)
c.linkURL("https://wa.me/60126280096", (M + 180, y - 21, W - M, y - 7), relative=0)
c.setFillColor(GREY)
c.setFont("Helvetica", 8)
c.drawString(M, y - 34, "Service availability, measurement scope and documentation must be confirmed before booking.")
c.drawString(M, y - 47, "If accredited calibration is required, state the required scope so the provider can be confirmed.")
c.setStrokeColor(LINE)
c.line(M, 59, W - M, 59)
c.setFont("Helvetica", 7.5)
c.drawString(M, 44, "Hung Ta Instrument Enterprise  |  Seremban, Negeri Sembilan, Malaysia")
c.drawString(M, 31, "www.hungtainstrument.com.my  |  Mon-Fri, 8:30 AM - 6:00 PM")
c.drawRightString(W - M, 31, "ENQUIRY CHECKLIST  /  1 OF 1")
c.showPage()
c.save()

reader = PdfReader(DEST)
assert len(reader.pages) == 1
assert set(reader.get_fields()) == set(fields)
assert len(reader.pages[0].get("/Annots", [])) >= len(fields)
assert "hungtatest@yahoo.com" in reader.pages[0].extract_text()
print(f"Created {DEST.name}: 1 page, {len(fields)} fillable fields")
