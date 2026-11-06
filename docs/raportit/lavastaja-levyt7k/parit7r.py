# LAV 6.11.: parit levyt7r | levyt7u samoista kameroista (kuvat täysikoossa) ja arkki. Ei leivontaa.
import os
from PIL import Image
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/';O=A+'kuvat-pari-levyt7u/';os.makedirs(O,exist_ok=True)
N=[f[:-4] for f in sorted(os.listdir(A+'kuvat-levyt7u')) if f.endswith('.png')]
for n in N:
    a=Image.open(A+'kuvat-levyt7r/'+n+'.png').convert('RGB');b=Image.open(A+'kuvat-levyt7u/'+n+'.png').convert('RGB');W=Image.new('RGB',(a.width*2+8,a.height),(255,255,255));W.paste(a,(0,0));W.paste(b,(a.width+8,0));W.save(O+n+'.png')
S=Image.new('RGB',(2000,1500),(0,0,0))
for i,n in enumerate(N):
    S.paste(Image.open(O+n+'.png').resize((998,250)),((i%2)*1002,(i//2)*300))
S.save(O+'arkki.png');print(N)
