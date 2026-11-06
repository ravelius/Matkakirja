# LAV 7.11.: kohdat 1-4 ja 1-1: onko kivireunus-sivu seinän sisällä? Pinnat poikkileikkauksessa ja vapaa paikka kameralle. Vain mittaus.
import os
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
for pa,z0,x0,x1 in (('1-4',501.,-135.,-85.),('1-1',-258.,-245.,-200.)):
    g=G(os.path.realpath(KT+'koejuuri-levyt7/'+TV.replace('*',pa)));print('##',pa,'z',z0)
    R=[]
    for me,p in prims(g):
        a,I=lue_p(g,p)
        if not len(I): continue
        T=a['POSITION'][I].astype('f8');s=(T[:,:,2].min(1)<=z0)&(T[:,:,2].max(1)>=z0)&(T[:,:,0].max(1)>x0)&(T[:,:,0].min(1)<x1)&(T[:,:,1].min(1)<2)
        n=np.cross(T[:,1]-T[:,0],T[:,2]-T[:,0]);ar=np.linalg.norm(n,axis=1)/2
        for k in np.nonzero(s&(np.abs(n[:,0])/np.maximum(2*ar,1e-9)>.9)&(ar>.1))[0]:
            R.append((round(float(T[k,:,0].mean()),2),'%+.0f'%(n[k,0]/(2*ar[k])),g.j['materials'][p['material']]['name'].split('.')[0][3:12],round(float(T[k,:,1].min()),2),round(float(T[k,:,1].max()),2)))
    for r in sorted(set(R)): print(' ',r)
