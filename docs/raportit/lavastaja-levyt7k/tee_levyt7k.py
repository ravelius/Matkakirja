#!/opt/homebrew/bin/python3
# LAV 7.11. (PT: 7u näytti korjauksen, sama sääntö kaikille, yksi koejuuri, ei leivontaa): koejuuri-levyt7k = levyt7, kaikkien palojen lod0: V4_kivireunus-sivu, jolla UV0.u ei etene pituussuunnassa (du/L <= 0,9, L >= 0,5 m), u = metrit pituussuuntaan. Geometria, valo-UV ja v ennallaan.
import os,glob,shutil,sys
import numpy as np
L='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/';KT=L+'katot-v125/';B=L+'kielletty-rakennukset/';TV='kielletty-tausta-v115'
sys.path.insert(0,L+'leivonta-216/uusinta/leijuva-v93/tyokalut');sys.path.insert(0,B+'tyokalut')
from korjaa import G,prims,lue_p,kirjoita_p
O_,N_=KT+'koejuuri-levyt7/',KT+'koejuuri-levyt7k/'
if os.path.exists(N_): shutil.rmtree(N_)
os.makedirs(N_+TV)
for n in sorted(os.listdir(O_)):
    if n!=TV: os.symlink(os.path.realpath(O_+n),N_+n)
for n in sorted(os.listdir(O_+TV)): os.symlink(os.path.realpath(O_+TV+'/'+n),N_+TV+'/'+n)
yht=0;yala=0.
for f in sorted(glob.glob(N_+TV+'/kk-tausta-*-lod0.glb')):
    pa=os.path.basename(f)[10:-9];r=os.path.realpath(f);g=G(r)
    ps=[p for me,p in prims(g) if g.j['materials'][p['material']]['name'].split('.')[0]=='V4_kivireunus']
    if not ps: continue
    os.remove(f);shutil.copyfile(r,f);g=G(f)
    m=0;ms=0.
    for me,p in prims(g):
        if g.j['materials'][p['material']]['name'].split('.')[0]!='V4_kivireunus': continue
        a,I=lue_p(g,p)
        if not len(I): continue
        a=dict(a);V=a['POSITION'].astype('f8');U=a['TEXCOORD_0'].astype('f8');T=V[I];n=np.cross(T[:,1]-T[:,0],T[:,2]-T[:,0]);ar=np.linalg.norm(n,axis=1)/2;ny=np.abs(n[:,1])/np.maximum(2*ar,1e-9)
        s=(ny<.1)&(ar>.005);h=n[:,[2,0]]*np.array([1,-1.]);h=h/np.maximum(np.linalg.norm(h,axis=1,keepdims=True),1e-9)
        sv=(T[:,:,[0,2]]*h[:,None,:]).sum(2);Lp=np.ptp(sv,axis=1);du=np.ptp(U[I][:,:,0],axis=1)
        e=np.nonzero(s&(Lp>=.5)&(du/np.maximum(Lp,1e-9)<=.9))[0]
        if not len(e): continue
        k=len(V);I2=I.copy();I2[e]=k+np.arange(len(e)*3).reshape(-1,3)
        ix=I[e].ravel()
        for key in list(a): a[key]=np.concatenate([a[key],a[key][ix]])
        a['TEXCOORD_0'][k:,0]=sv[e].ravel().astype(a['TEXCOORD_0'].dtype)
        kirjoita_p(g,p,a,I2.astype(I.dtype));m+=len(e);ms+=float(ar[e].sum())
    g.tallenna();yht+=m;yala+=ms;print(pa,'kolmioita',m,'m2 %.0f'%ms,flush=True)
print('VALMIS yhteensä',yht,'m2 %.0f'%yala)
