import sys, json
from PIL import Image, ImageDraw, ImageFont
out=sys.argv[1]; items=json.load(open(sys.argv[2])); cols=int(sys.argv[3]) if len(sys.argv)>3 else 4
w,h,cap=480,360,44
try: f=ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf',15)
except Exception: f=ImageFont.load_default()
rows=(len(items)+cols-1)//cols
S=Image.new('RGB',(cols*w,rows*(h+cap)),(24,20,16)); d=ImageDraw.Draw(S)
for i,(fn,txt) in enumerate(items):
    x=(i%cols)*w; y=(i//cols)*(h+cap)
    S.paste(Image.open(fn).convert('RGB').resize((w,h)),(x,y))
    d.rectangle([x,y+h,x+w,y+h+cap],fill=(24,20,16))
    for j,l in enumerate(txt.split('\n')[:2]): d.text((x+6,y+h+4+j*18),l,fill=(235,225,205),font=f)
S.save(out)
