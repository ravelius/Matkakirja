# LAV 6.11.: jakokuvat levyt7b (valokartta) | levyt7v (tasainen valo): täysikokoiset rajaukset B:n laikku ja jäännös 3:n kiila + raita. Ei leivontaa.
import os,sys
from PIL import Image
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/';O=A+'kuvat-pari-levyt7v/';os.makedirs(O,exist_ok=True)
s=2752/666
RJ={'jaannos3-237-112':(int(200*s),int(230*s),int(450*s),int(500*s)),'B-koko2':(int(300*s),int(300*s),int(600*s),int(500*s))}
for n,r in RJ.items():
    a=Image.open(A+'kuvat-levyt7b/'+n+'.png').convert('RGB').crop(r);b=Image.open(A+'kuvat-levyt7v/'+n+'.png').convert('RGB').crop(r);W=Image.new('RGB',(a.width*2+8,a.height),(255,255,255));W.paste(a,(0,0));W.paste(b,(a.width+8,0));W.save(O+'rajaus-'+n+'.png')
print(sorted(os.listdir(O)))
