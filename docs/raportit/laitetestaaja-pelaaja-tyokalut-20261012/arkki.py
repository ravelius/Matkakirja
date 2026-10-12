import sys
from PIL import Image
n=sys.argv[1]; fs=sys.argv[2:]
cols=2 if len(fs)<=4 else 3
rows=(len(fs)+cols-1)//cols
w=750 if cols==2 else 500; h=int(w*0.75)
W=Image.new('RGB',(cols*w,rows*h))
for i,f in enumerate(fs):
    W.paste(Image.open(f).resize((w,h)),((i%cols)*w,(i//cols)*h))
W.save(n)
