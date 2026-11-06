#!/opt/homebrew/bin/python3
# LAV 6.11. (PT: omistajan vaalea viiva; mittaa22-23.py): koejuuri-levyt7u = levyt7 (leivottu), mutta V4_kivireunus-sivuilla, joilla UV0.u ei etene pituussuunnassa, u = metrit pituussuuntaan. Vain jäännös 3:n jalusta ja B:n jalusta. Geometria, valo-UV ja v ennallaan. Ei leivontaa.
import os,shutil,sys
import numpy as np
L='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/';KT=L+'katot-v125/';B=L+'kielletty-rakennukset/';TV='kielletty-tausta-v115'
sys.path.insert(0,L+'leivonta-216/uusinta/leijuva-v93/tyokalut');sys.path.insert(0,B+'tyokalut')
from korjaa import G,prims,lue_p,kirjoita_p
O_,N_=KT+'koejuuri-levyt7/',KT+'koejuuri-levyt7u/'
if os.path.exists(N_): shutil.rmtree(N_)
os.makedirs(N_+TV)
for n in sorted(os.listdir(O_)):
    if n!=TV: os.symlink(os.path.realpath(O_+n),N_+n)
for n in sorted(os.listdir(O_+TV)): os.symlink(os.path.realpath(O_+TV+'/'+n),N_+TV+'/'+n)
AL={'1-3':[(-86.9,-82.6,424.4,428.9)],'3-1':[(241.2,258.8,-118,-111.5)]}
for pa,bbs in AL.items():
    f=N_+TV+'/kk-tausta-%s-lod0.glb'%pa;r=os.path.realpath(f);os.remove(f);shutil.copyfile(r,f);g=G(f)
    p=next(p for me,p in prims(g) if g.j['materials'][p['material']]['name'].split('.')[0]=='V4_kivireunus')
    a,I=lue_p(g,p);a=dict(a);V=a['POSITION'].astype('f8');U=a['TEXCOORD_0'].astype('f8');T=V[I];n=np.cross(T[:,1]-T[:,0],T[:,2]-T[:,0]);ar=np.linalg.norm(n,axis=1)/2;ny=np.abs(n[:,1])/np.maximum(2*ar,1e-9)
    s=np.zeros(len(I),bool)
    for x0,x1,z0,z1 in bbs: s|=(T[:,:,0].min(1)>x0)&(T[:,:,0].max(1)<x1)&(T[:,:,2].min(1)>z0)&(T[:,:,2].max(1)<z1)
    s&=(ny<.1)&(ar>.005)
    uusi=[];I2=I.copy();k=len(V);m=0
    for e in np.nonzero(s)[0]:
        t=T[e];h=n[e][[2,0]]*np.array([1,-1.]);h=h/np.linalg.norm(h);sv=t[:,[0,2]]@h;L_=np.ptp(sv);du=np.ptp(U[I[e],0])
        if L_<.5 or du/L_>.9: continue
        uusi.append((I[e].copy(),sv));I2[e]=[k,k+1,k+2];k+=3;m+=1;print(pa,'ala %.2f pituus %.2f du %.2f -> kp %s'%(ar[e],L_,du,np.round(t.mean(0),1).tolist()))
    print(pa,'muutettu kolmioita',m)
    if not m: continue
    ix=np.concatenate([x[0] for x in uusi]);uu=np.concatenate([x[1] for x in uusi])
    for key in list(a):
        a[key]=np.concatenate([a[key],a[key][ix]])
    a['TEXCOORD_0'][len(V):,0]=uu.astype(a['TEXCOORD_0'].dtype)
    kirjoita_p(g,p,a,I2.astype(I.dtype));g.tallenna()
print('VALMIS')
