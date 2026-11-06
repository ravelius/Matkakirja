# LAV 6.11.: B:n jalustan yläpinta (laikku näkyy B-oikea-sivu-kuvassa): kolmiot, UV0, y. Vain mittaus.
import os
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
JB=(-87.2,-82.2,424,429.3)
for nm,f in (('levyt6',KT+'koejuuri-levyt6/kielletty-tausta-v115/kk-tausta-1-3-lod0.glb'),('levyt7',KT+'koejuuri-levyt7/kielletty-tausta-v115/kk-tausta-1-3-lod0.glb')):
    g=G(os.path.realpath(f));print('##',nm)
    for me,p in prims(g):
        a,I=lue_p(g,p)
        if not len(I): continue
        T=a['POSITION'][I].astype('f8');s=(T[:,:,0].max(1)>JB[0])&(T[:,:,0].min(1)<JB[1])&(T[:,:,2].max(1)>JB[2])&(T[:,:,2].min(1)<JB[3])&(T[:,:,1].max(1)<1.2)&(T[:,:,1].max(1)>.05)
        n=np.cross(T[:,1]-T[:,0],T[:,2]-T[:,0]);ar=np.linalg.norm(n,axis=1)/2;ny=n[:,1]/np.maximum(2*ar,1e-9)
        for k in np.nonzero(s&(np.abs(ny)>.5))[0]:
            print(' ',g.j['materials'][p['material']]['name'].split('.')[0][3:12],'a %.2f ny %+.2f'%(ar[k],ny[k]),'P',np.round(T[k],2).tolist(),'UV',np.round(a['TEXCOORD_0'][I[k]],2).tolist())
