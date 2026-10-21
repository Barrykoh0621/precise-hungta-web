"""Remove only thin, red full-width PDF header rules; preserve other artwork."""
from pathlib import Path
from shutil import copy2
from datetime import datetime
import json
import argparse
import pdfplumber
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream
from pdf2image import convert_from_path
from PIL import ImageChops

ROOT=Path(__file__).resolve().parents[1]
PUBLIC=ROOT/'public/catalogues'
QA=ROOT/'tmp/catalogue-header-removal'

def targets(path):
    found={}
    with pdfplumber.open(path) as doc:
        for i,page in enumerate(doc.pages):
            boxes=[]
            for r in page.rects:
                co=r.get('non_stroking_color')
                if (r.get('fill') and isinstance(co,(list,tuple)) and len(co)==3
                    and co[0]>.45 and co[0]>co[1]*1.6 and co[0]>co[2]*1.3
                    and r['width']>page.width*.7 and 0<r['height']<=18 and -.5<=r['top']<110):
                    boxes.append((r['x0'],r['y0'],r['width'],r['height']))
            if boxes:found[i]=boxes
    return found

def remove_bars(source,dest,boxes):
    reader=PdfReader(source);writer=PdfWriter();writer.clone_document_from_reader(reader)
    removed=0
    for i,rects in boxes.items():
        page=writer.pages[i];stream=ContentStream(page.get_contents(),writer)
        count=0
        for j,(args,op) in enumerate(stream.operations):
            if op!=b're' or len(args)!=4:continue
            if not any(all(abs(float(a)-b)<.1 for a,b in zip(args,box)) for box in rects):continue
            # These generated PDFs paint each rectangle as an isolated path.
            assert j>0 and stream.operations[j-1][1]==b'n','Unexpected combined path'
            assert stream.operations[j+1][1] in (b'f',b'f*'),'Unexpected rectangle painting'
            stream.operations[j+1]=([],b'n')
            count+=1
        assert count==len(rects),(source,i,count,len(rects))
        page.replace_contents(stream);removed+=count
    with dest.open('wb') as f:writer.write(f)
    after=PdfReader(dest)
    assert len(reader.pages)==len(after.pages)
    for a,b in zip(reader.pages,after.pages):
        assert a.extract_text()==b.extract_text(),'Text changed'
        assert len(a.get('/Annots',[]))==len(b.get('/Annots',[])),'Link count changed'
    assert not targets(dest),'Header bar still present'
    return removed

def verify_pixels(before,after,boxes,folder):
    folder.mkdir(parents=True,exist_ok=True)
    aa=convert_from_path(str(before),dpi=90);bb=convert_from_path(str(after),dpi=90)
    checks=[]
    doc=PdfReader(before)
    for i,(a,b) in enumerate(zip(aa,bb)):
        diff=ImageChops.difference(a.convert('RGB'),b.convert('RGB'))
        allowed=diff.copy()
        from PIL import ImageDraw
        draw=ImageDraw.Draw(allowed)
        height=float(doc.pages[i].mediabox.height)
        sx=a.width/float(doc.pages[i].mediabox.width);sy=a.height/height
        for x,y,w,h in boxes.get(i,[]):
            draw.rectangle((max(0,int(x*sx)-2),max(0,int((height-y-h)*sy)-2),int((x+w)*sx)+2,int((height-y)*sy)+2),fill=(0,0,0))
        assert allowed.getbbox() is None,(before,i,'Pixels outside header changed')
        a.save(folder/f'before-{i+1}.png');b.save(folder/f'after-{i+1}.png')
        checks.append({'page':i+1,'changed':diff.getbbox() is not None,'outside_header_unchanged':True})
    return checks

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--apply',action='store_true');args=parser.parse_args()
    files=sorted(PUBLIC.rglob('*.pdf'));plan=[(p,targets(p)) for p in files];plan=[(p,b) for p,b in plan if b]
    print(json.dumps({'scanned':len(files),'files_to_edit':len(plan),'pages_to_edit':sum(len(b) for _,b in plan)}))
    if not args.apply:return
    backup=Path('D:/Documents/Hung ta/office/catalogue/Website header removal backups')/datetime.now().strftime('%Y%m%d-%H%M%S')
    backup.mkdir(parents=True);QA.mkdir(parents=True,exist_ok=True)
    report=[]
    for p,boxes in plan:
        rel=p.relative_to(PUBLIC);original=backup/rel;original.parent.mkdir(parents=True,exist_ok=True);copy2(p,original)
        staged=QA/'staged'/rel;staged.parent.mkdir(parents=True,exist_ok=True)
        count=remove_bars(original,staged,boxes)
        checks=verify_pixels(original,staged,boxes,QA/p.stem)
        report.append({'file':str(rel),'bars_removed':count,'checks':checks})
    # Publish local replacements only after every document passes verification.
    for entry in report:copy2(QA/'staged'/entry['file'],PUBLIC/entry['file'])
    payload={'scanned':len(files),'edited':len(report),'backup':str(backup),'results':report}
    (QA/'report.json').write_text(json.dumps(payload,indent=2),encoding='utf-8')
    print(json.dumps({'edited':len(report),'bars_removed':sum(x['bars_removed'] for x in report),'backup':str(backup)}))

if __name__=='__main__':main()
