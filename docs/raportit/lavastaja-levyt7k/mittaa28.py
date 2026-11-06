# LAV 7.11.: juovan kuvan vaihtelu katselukulman mukaan (kuvat-levyt7r, sivu 3-1): 4-5 / noin 23 / noin 39 astetta. Vain kuvasta mitattu.
import math
import numpy as np
from PIL import Image
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
W,H=2752,2064;f=(H/2)/math.tan(math.radians(40))
def pr(c,p):
    x,y,z,yw,pt=c;yw,pt=math.radians(yw),math.radians(pt);C=np.array([x,y,z]);fw=np.array([math.sin(yw)*math.cos(pt),-math.sin(pt),math.cos(yw)*math.cos(pt)]);ri=np.array([math.cos(yw),0,-math.sin(yw)]);up=np.cross(fw,ri)
    d=np.array(p,'f8')-C;cc=d@fw;return W/2+f*(d@ri)/cc,H/2-f*(d@up)/cc,cc
a=np.array([241.38,-112.06]);b=np.array([258.53,-111.65])
for n,c in (('j3-alkup-kamera',(245.3,2.5,-111.7,-90,15)),('j3-kamera-1m-sivuun',(245.3,2.5,-110.7,-90,15)),('j3-kamera-2m-sivuun',(245.3,2.5,-109.7,-90,15)),('j3-kiven-sivu-kaukaa',(247,1.2,-108.5,180,10))):
    I=np.asarray(Image.open(A+'kuvat-levyt7r/'+n+'.png').convert('RGB')).astype('f4')@np.array([.3,.59,.11])
    V=[];ks=[];lev=[]
    for x in np.arange(241.6,243.4,.01):
        z=a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0]);p=pr(c,(x,.12,z))
        if not(0<=p[0]<W and 0<=p[1]<H) or p[2]<.2: continue
        V.append(I[int(p[1]),int(p[0])]);v=np.array(c[:3])-np.array((x,.12,z));ks.append(math.degrees(math.asin(abs(v[2])/np.linalg.norm(v))))
        p0=pr(c,(x,0,z));p1=pr(c,(x,.24,z));lev.append(math.hypot(p0[0]-p1[0],p0[1]-p1[1]))
    V=np.array(V)
    if len(V)<5: print(n,'ei näkyvissä');continue
    # hajonta liukuvan mediaanin ympärillä, saumat pois (10-90 %)
    q=np.percentile(V,[10,50,90]);print(n,'näytteitä',len(V),'kulma %.0f°'%np.median(ks),'korkeus kuvassa %.0f px'%np.median(lev),'L p10 %.0f p50 %.0f p90 %.0f, ero %.0f'%(q[0],q[1],q[2],q[2]-q[0]))
