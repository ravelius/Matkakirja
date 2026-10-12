import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB'); w,h=im.size
px=im.load(); xs=[]; ys=[]
for y in range(0,h,2):
    for x in range(0,w,2):
        r,g,b=px[x,y]
        if r>170 and g<80 and b<80: xs.append(x); ys.append(y)
if len(xs)<20: print('?'); sys.exit()
mx=sum(xs)/len(xs); my=sum(ys)/len(ys)
if my>h*0.8: print('P')
elif mx<w*0.2: print('L')
elif mx>w*0.8: print('R')
else: print('?')
