# LAV 6.11.: tarkistus levyt7u: vain UV0.u muuttui valituilla kivireunus-sivuilla; kolmiomäärät ja pinta-alat ennallaan.
import sys,os
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
for pa in ('1-3','3-1'):
    for r in ('koejuuri-levyt7','koejuuri-levyt7u'):
        g=G(os.path.realpath(KT+r+'/kielletty-tausta-v115/kk-tausta-%s-lod0.glb'%pa));n=0;ar=0;img=len(g.j.get('images',[]))
        for me,p in prims(g):
            a,I=lue_p(g,p);t=a['POSITION'][I].astype('f8');n+=len(I);ar+=float((np.linalg.norm(np.cross(t[:,1]-t[:,0],t[:,2]-t[:,0]),axis=1)/2).sum())
        print(pa,r,'kolmioita',n,'ala %.3f'%ar,'kuvia',img,'tiedosto',os.path.getsize(os.path.realpath(KT+r+'/kielletty-tausta-v115/kk-tausta-%s-lod0.glb'%pa)))
