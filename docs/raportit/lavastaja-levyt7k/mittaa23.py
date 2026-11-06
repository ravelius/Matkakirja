# LAV 6.11.: jäännös 3:n juova: projektio kuvaan, pikselit, katselukulma, UV1; rappeutuneet sivut koko alueella (u vakio). Vain mittaus.
import sys,os,glob,math
import numpy as np
from PIL import Image
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
src=open(A+'mittaa22.py').read().split("R=rivit(K7)")[0];exec(src)
W,H=2752,2064;f=(H/2)/math.tan(math.radians(40))
def pr(c,p):
    x,y,z,yw,pt=c;yw,pt=math.radians(yw),math.radians(pt);C=np.array([x,y,z]);fw=np.array([math.sin(yw)*math.cos(pt),-math.sin(pt),math.cos(yw)*math.cos(pt)]);ri=np.array([math.cos(yw),0,-math.sin(yw)]);up=np.cross(fw,ri)
    d=np.array(p,'f8')-C;cc=d@fw
    return W/2+f*(d@ri)/cc,H/2-f*(d@up)/cc,cc
cam=(245.3,2.5,-111.7,-90,15)
a=np.array([241.38,0,-112.06]);b=np.array([258.53,0,-111.65])
Im={k:np.asarray(Image.open(A+'kuvat-%s/jaannos3-237-112.png'%k).convert('RGB')).astype('f4') for k in ('levyt7','levyt7b')}
print('## juova: maailmapiste -> kuva, keskiväri kiven keskeltä (y 0,12), viereinen lattia')
for x in (241.5,241.8,242.2,242.6,243.0,243.3):
    z=a[2]+(x-a[0])*(b[2]-a[2])/(b[0]-a[0]);ylä=.24+(x-a[0])*(.21-.24)/(b[0]-a[0])
    p0=pr(cam,(x,0,z));p1=pr(cam,(x,ylä,z));pm=pr(cam,(x,ylä/2,z))
    n=np.array([-.02,0,1.]);v=np.array(cam[:3])-np.array((x,ylä/2,z));g=math.degrees(math.asin(abs(v@n)/np.linalg.norm(v)/np.linalg.norm(n)))
    m={}
    for k,I in Im.items():
        xx,yy=int(round(pm[0])),int(round(pm[1]));m[k]=np.round(I[yy-1:yy+2,xx-1:xx+2].reshape(-1,3).mean(0)).tolist()
    print(' x',x,'kuva ala',np.round(p0[:2]).tolist(),'ylä',np.round(p1[:2]).tolist(),'leveys px %.1f'%abs(p0[0]-p1[0]),'kulma pintaan %.0f°'%g,m)
print('## pikselihajonta juovan pituussuunnassa (leipomaton, mediaaniväri) vs oikean kiven sivu kuvassa')
ps=[]
for x in np.arange(241.5,243.4,.01):
    z=a[2]+(x-a[0])*(b[2]-a[2])/(b[0]-a[0]);q=pr(cam,(x,.12,z));ps.append(Im['levyt7'][int(q[1]),int(q[0])])
ps=np.array(ps);L=ps@np.array([.3,.59,.11]);print(' juova L ka %.0f hajonta %.1f min %.0f max %.0f väri %s'%(L.mean(),L.std(),L.min(),L.max(),np.round(np.median(ps,0)).tolist()))
# uv/m pikseliä kohti
print('## rappeutuneet näkyvät kivireunus-sivut: u vakio (uv/m < 0,1) ja pituus >= 1 m, y-yläreuna > 0,05')
for nm,pat in (('levyt7',K7),('levyt6',KT+'koejuuri-levyt6/'+TV),('uusi',LAH['uusi'])):
    R=rivit(pat);tot=0;n=0;pit=0;esim=[];hyva=0;pit2=0
    for pala,m,q,u,N,u1 in R:
        if 'kivireunus' not in m: continue
        ar,nn,s1,s2=venyma(q,u);sivu=(np.abs(nn[:,1])<.3)&(ar>.005)&(q[:,:,1].max(1)>.05)
        L_=np.maximum(np.linalg.norm(q[:,:,[0,2]][:,0]-q[:,:,[0,2]][:,1],axis=1),np.maximum(np.linalg.norm(q[:,:,[0,2]][:,1]-q[:,:,[0,2]][:,2],axis=1),np.linalg.norm(q[:,:,[0,2]][:,0]-q[:,:,[0,2]][:,2],axis=1)))
        du=np.maximum(np.abs(u[:,0,0]-u[:,1,0]),np.maximum(np.abs(u[:,1,0]-u[:,2,0]),np.abs(u[:,0,0]-u[:,2,0])))/np.maximum(L_,1e-6)
        b_=sivu&(L_>=1)&(du<.1);g_=sivu&(L_>=1)&(du>=.9)
        tot+=ar[b_].sum();n+=int(b_.sum());hyva+=ar[g_].sum()
        for i in np.nonzero(b_)[0]:
            esim.append((float(L_[i]),pala,np.round(q[i].mean(0),1).tolist(),np.round(nn[i],1).tolist(),round(float(q[i,:,1].max()),2),round(float(q[i,:,1].min()),2)))
    print(' ',nm,'u vakio: kolmioita',n,'m2 %.0f'%tot,'; u oikein m2 %.0f'%hyva)
    if nm=='levyt7':
        for e in sorted(esim,reverse=True)[:14]: print('    pituus %.1f pala %s kp %s n %s y %s..%s'%(e[0],e[1],e[2],e[3],e[5],e[4]))
