# LAV 7.11.: 1-1:n rako: pituus ja leveys z:n mukaan (ei pintaa y < 1), naapurien korkeudet, käytävän päät. Vain mittaus.
import glob,os
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
T,M,P=lue(KT+'koejuuri-levyt7/'+TV,(-232,-224,-285,-225))
print('palat',sorted(set(P.tolist())))
rivit=[]
for z in np.arange(-284,-226,.5):
    xs=np.arange(-231.5,-225,.02);tyh=[x for x in xs if not [p for p in lay(T,M,float(x),float(z)) if p[0]<1.3]]
    if not tyh: rivit.append((float(z),None,None,0));continue
    a=np.array(tyh);ryh=np.split(a,np.nonzero(np.diff(a)>.03)[0]+1)
    rivit.append((float(z),[(round(float(r[0]),2),round(float(r[-1]),2)) for r in ryh]))
for r in rivit[::2]: print(r[:2])
z=-258.
print('korkeudet z-258',[(round(float(x),1),[p for p in lay(T,M,float(x),z) if p[0]<8][:3]) for x in (-231,-230,-229.4,-229,-228.2,-226)])
print('## kaikki palat, x -228,7..-228,2')
for z_ in (-262.,-258.,-254.,-250.):
    for x in (-228.7,-228.52,-228.42,-228.3):
        i=[k for k in range(len(T))]
        print(z_,x,[p for p in lay(T,M,float(x),float(z_)) if p[0]<1.3])
a=T;s=(T[:,:,2].min(1)<-258)&(T[:,:,2].max(1)>-258)&(T[:,:,0].min(1)<-228.42)&(T[:,:,0].max(1)>-228.42)&(np.abs(T[:,:,1]).max(1)<1.3)
print('pala ja materiaali',sorted({(P[k],M[k][:6]) for k in np.nonzero(s)[0]}))
print('## y=0-kaista kivien välissä: x-väli, jonka kummallakin puolella kivi (y > 0,1)')
for z_ in np.arange(-270.25,-243,1.):
    xs=np.arange(-230.2,-226.8,.01);h=[]
    for x in xs:
        q=[p[0] for p in lay(T,M,float(x),float(z_)) if p[0]<1.3];h.append(max(q) if q else np.nan)
    h=np.array(h);m=np.nonzero(h<.05)[0];v=[]
    if len(m):
        for r in np.split(m,np.nonzero(np.diff(m)>1)[0]+1):
            if r[0]>0 and r[-1]<len(h)-1 and h[r[0]-1]>.1 and h[r[-1]+1]>.1: v.append((round(float(xs[r[0]]),2),round(float(xs[r[-1]]),2),round(float(h[r[0]-1]),2),round(float(h[r[-1]+1]),2)))
    print(round(float(z_),2),v)
