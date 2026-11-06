# LAV 7.11.: mitä on jäännös 3:n itäpäädyn edessä: pystypinnat z -117..-112, x 256-266, y < 3. Vain mittaus.
import os,glob
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
g=G(os.path.realpath(KT+'koejuuri-levyt7/'+TV.replace('*','3-1')))
for me,p in prims(g):
    a,I=lue_p(g,p)
    if not len(I): continue
    T=a['POSITION'][I].astype('f8');s=(T[:,:,2].min(1)<-112)&(T[:,:,2].max(1)>-117)&(T[:,:,0].max(1)>256)&(T[:,:,0].min(1)<268)&(T[:,:,1].min(1)<3)
    n=np.cross(T[:,1]-T[:,0],T[:,2]-T[:,0]);ar=np.linalg.norm(n,axis=1)/2
    for k in np.nonzero(s&(np.abs(n[:,1])/np.maximum(2*ar,1e-9)<.2)&(ar>.3))[0]:
        print(g.j['materials'][p['material']]['name'].split('.')[0][3:12],'a %.1f'%ar[k],np.round(T[k],2).tolist())
