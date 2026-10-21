"""Public two-page product catalogues based on the website's confirmed product data."""
from pathlib import Path
from shutil import copy2
from io import BytesIO
import json
from urllib.parse import quote
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from pypdf import PdfReader
from pdf2image import convert_from_path

ROOT=Path(__file__).resolve().parents[1]
LOCAL=Path('D:/Documents/Hung ta/office/catalogue/ARMSTRONG WDS20 and ZL9001A')
PUBLIC=ROOT/'public/catalogues/products'
QA=ROOT/'tmp/armstrong-catalogue-qa'
for folder in (LOCAL,PUBLIC,QA):folder.mkdir(parents=True,exist_ok=True)
NAVY='#17334c';RED='#bd153e';INK='#1b2b39';GREY='#576470'
W,H=A4;M=39;CW=W-2*M
LOGO=Path('D:/Backup_from_C/Downloads/HungTa_WDS20_Customer_Manual/qa/hungta-gear.png')
assert LOGO.exists()
DETAILS={
 'armstrong-wds-20':dict(
  route='armstrong-wds-20-tensile-testing-machine',code='HT CAT WDS20 EN',
  subtitle='Dual Column Touchscreen\nTensile Testing Machine',
  metrics=[('500 kgf','Rated test load'),('1-500 mm/min','Test speed'),('800 mm','Travel excluding grips')],
  intro='A servo-driven, dual-column system for tensile testing in factory QC and material testing laboratories. Touchscreen control keeps test setup and live force readings together.',
  features=['TS7003L touchscreen measurement and control system.','Servo drive with configurable test and return settings.','Tensile testing; compression with suitable fixtures.'],
  configuration=['Specimen material, dimensions and expected maximum force.','Grip type, jaw faces and specimen holding requirements.','Compression fixtures and measurement needs, if required.'],
  caution='Electrical rating must be confirmed against the supplied machine nameplate before installation. Grips reduce the usable specimen clearance.',
  caption='Product illustration. Supplied grips and accessories depend on the confirmed configuration.'),
 'armstrong-zl-9001a':dict(
  route='armstrong-zl-9001a-carton-compression-testing-machine',code='HT CAT ZL9001A EN',
  subtitle='Computer Controlled\nCarton Compression Testing Machine',
  metrics=[('1000 kgf','Load cell rating'),('800 x 800 x 800','Compression space mm'),('TM2101','Computer control')],
  intro='A computer-controlled system for assessing the load-bearing ability of corrugated cartons and packaging containers. Review carton dimensions, expected force and test method before selecting the setup.',
  features=['800 x 800 x 800 mm compression space.','Servo motor with twin ball-screw drive.','TM2101 software for test setup and result reporting.'],
  configuration=['Carton length, width, height and expected compression load.','Compression or holding requirement and required test duration.','Applicable packaging test method, report format and site details.'],
  caution='The 1000 kgf figure is the documented load-cell rating, approximately 9.81 kN. Confirm the maximum permitted operating load and actual platen clearance before ordering.',
  caption='Reference machine photograph. Confirm the supplied configuration and accessories in the quotation.'),
}

def build(product):
    extra=DETAILS[product['id']];model=product['model']
    out=LOCAL/f"ARMSTRONG_{model}_Catalogue.pdf"
    c=canvas.Canvas(str(out),pagesize=A4)
    c.setTitle(f'ARMSTRONG {model} Product Catalogue')
    c.setAuthor('Hung Ta Instrument Enterprise')
    c.setSubject('Public product specifications and quotation enquiries')
    def text(x,y,s,size=10,bold=False,color=INK):
        c.setFillColor(HexColor(color));c.setFont('Helvetica-Bold' if bold else 'Helvetica',size);c.drawString(x,y,s)
    def para(s,x,top,width,size=10,color=INK,bold=False):
        st=ParagraphStyle('copy',fontName='Helvetica-Bold' if bold else 'Helvetica',fontSize=size,leading=size*1.36,textColor=HexColor(color))
        block=Paragraph(escape(s).replace('\n','<br/>'),st);_,hh=block.wrap(width,1000);block.drawOn(c,x,top-hh)
        return top-hh
    def rule(y):c.setStrokeColor(HexColor('#d5dce1'));c.setLineWidth(.5);c.line(M,y,W-M,y)
    def furniture(page):
        c.drawImage(str(LOGO),M,H-66,width=34,height=38,preserveAspectRatio=True,anchor='c',mask='auto')
        text(M+47,H-42,'HUNG TA INSTRUMENT',15,True,NAVY)
        text(M+47,H-58,'Enterprise  |  Testing machines and local support',8.5,color=GREY)
        rule(H-80)
        rule(48)
        text(M,34,'www.hungtainstrument.com.my',8.5,color=NAVY)
        c.linkURL('https://www.hungtainstrument.com.my/',(M,30,M+180,43),relative=0)
        text(M,21,f"{extra['code']}  |  Rev 02  |  20 October 2026",7.5,color=GREY)
        text(W-M-35,23,f'{page} / 2',8,color=GREY)
    def cta():
        c.setFillColor(HexColor(RED));c.rect(M,64,CW,84,stroke=0,fill=1)
        text(M+13,132,'HUNG TA INSTRUMENT ENTERPRISE',11,True,'#ffffff')
        text(M+13,117,f'Request your {model} quotation',9.5,True,'#ffffff')
        text(M+13,102,'Tel / WhatsApp: +60 12-628 0096  |  Email: hungtatest@yahoo.com',9,color='#ffffff')
        text(M+13,87,'109, Taman A.S.T., Jalan Sungai Ujong,',8.5,color='#ffffff')
        text(M+13,74,'70200 Seremban, Negeri Sembilan, Malaysia',8.5,color='#ffffff')
        message=f'Hello Hung Ta Instrument, I would like a quotation for ARMSTRONG {model}.\nCompany and location:\nSpecimen / carton dimensions:\nExpected force:\nRequired test method:\nRequired date:'
        c.linkURL('https://wa.me/60126280096?text='+quote(message),(M,111,W-M,127),relative=0)
        c.linkURL('https://wa.me/60126280096',(M+13,98,M+220,111),relative=0)
        c.linkURL('mailto:hungtatest@yahoo.com',(M+225,98,W-M-13,111),relative=0)

    furniture(1)
    text(M,738,'ARMSTRONG',12,True,RED)
    text(M,693,model,41,True,NAVY)
    para(extra['subtitle'],M,675,CW,17,bold=True)
    image=ROOT/'public'/product['image']
    c.drawImage(ImageReader(str(image)),M+42,266,width=CW-84,height=353,preserveAspectRatio=True,anchor='c',mask='auto')
    para(extra['caption'],M,257,CW,8,GREY)
    rule(226)
    for idx,(value,label) in enumerate(extra['metrics']):
        x=M+idx*(CW/3)
        para(value,x,211,CW/3-12,16 if len(value)<14 else 13,NAVY,True)
        para(label,x,183,CW/3-12,8.5,GREY)
    cta();c.showPage()

    furniture(2)
    text(M,738,f'ARMSTRONG {model}',25,True,NAVY)
    y=para(extra['intro'],M,719,CW,10,GREY)-18
    text(M,y,'Technical specifications',15,True,NAVY);y-=17
    c.setFillColor(HexColor(NAVY));c.rect(M,y-23,CW,23,stroke=0,fill=1)
    text(M+9,y-16,'Parameter',9,True,'#ffffff');text(M+155,y-16,'Specification',9,True,'#ffffff');y-=23
    for n,spec in enumerate(product['specs']):
        style=ParagraphStyle('cell',fontName='Helvetica',fontSize=9,leading=12)
        a=Paragraph(escape(spec['label']),style);b=Paragraph(escape(spec['value']),style)
        ah=a.wrap(137,1000)[1];bh=b.wrap(CW-171,1000)[1];hh=max(ah,bh)+14
        if n%2==0:c.setFillColor(HexColor('#f1f4f6'));c.rect(M,y-hh,CW,hh,stroke=0,fill=1)
        a.drawOn(c,M+9,y-7-ah);b.drawOn(c,M+155,y-7-bh)
        y-=hh;rule(y)
    y-=20;text(M,y,'Confirm your test configuration',12,True,NAVY);y-=10
    for item in extra['configuration']:y=para('- '+item,M,y,CW,9)-4
    y-=5;y=para(extra['caution'],M,y,CW,8.5,GREY)
    y-=10;y=para('Specifications are reference values for configuration review. Final capacity, fixtures, software functions and supplied accessories must be agreed in the quotation. Calibration scope and documentation are confirmed separately.',M,y,CW,8,GREY)
    assert y>158,(model,'Content reaches quotation panel',y)
    cta();c.showPage();c.save()
    copy2(out,PUBLIC/f"{product['id']}.pdf")
    pages=convert_from_path(str(out),dpi=120,fmt='png')
    assert len(pages)==2
    for i,im in enumerate(pages,1):im.save(QA/f"{product['id']}-{i}.png")
    doc=PdfReader(out);body='\n'.join(p.extract_text() for p in doc.pages)
    assert model in body and 'ARMSTRONG' in body and 'Serial number' not in body
    assert 'ISO/IEC 17025 accredited' not in body
    for page in doc.pages:
        for contact in ('HUNG TA INSTRUMENT ENTERPRISE', '+60 12-628 0096', 'hungtatest@yahoo.com', 'Jalan Sungai Ujong', 'www.hungtainstrument.com.my'):
            assert contact in page.extract_text(), (model, 'Missing contact', contact)
    assert any('/Annots' in p for p in doc.pages)
    print(str(out))

for product in json.loads((ROOT/'tmp/armstrong-catalogue-data.json').read_text(encoding='utf-8')):build(product)
