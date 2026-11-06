# LAV 6.11.: B:n laikku: tasainen väri ilman vaihtelua levyt7v:ssä viittaa kuviottomaan materiaaliin. Kaikki ei-lattia/ei-kivireunus-pinnat kolmioittain jalustan takana, y < 3, lod0. Vain mittaus.
import sys,os,glob,math
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
BB=(-90,-76,422,442)
W,H=2752,2064;f=(H/2)/math.tan(math.radians(40));c=(-83.8,4,419.7,-30,15);o=int(300*2752/666)
yw,pt=math.radians(c[3]),math.radians(c[4]);C=np.array(c[:3]);fw=np.array([math.sin(yw)*math.cos(pt),-math.sin(pt),math.cos(yw)*math.cos(pt)]);ri=np.array([math.cos(yw),0,-math.sin(yw)]);up=np.cross(fw,ri)
def pr(p):
    d=np.array(p,'f8')-C;cc=d@fw;return (round(W/2+f*(d@ri)/cc-o),round(H/2-f*(d@up)/cc-o))
import collections
for pat in sorted(glob.glob(KT+'koejuuri-levyt7/'+TV)):
    g=G(os.path.realpath(pat));pala=os.path.basename(pat)[10:-9]
    for me,p in prims(g):
        a,I=lue_p(g,p)
        if not len(I): continue
        q=a['POSITION'][I].astype('f8');s=(q[:,:,0].max(1)>BB[0])&(q[:,:,0].min(1)<BB[1])&(q[:,:,2].max(1)>BB[2])&(q[:,:,2].min(1)<BB[3])&(q[:,:,1].min(1)<3)
        if not s.any(): continue
        n=g.j['materials'][p['material']]['name'].split('.')[0];ar=np.linalg.norm(np.cross(q[s][:,1]-q[s][:,0],q[s][:,2]-q[s][:,0]),axis=1)/2
        print(pala,n,int(s.sum()),'m2 %.1f'%ar.sum())
        if n in('V4_lattia','V4_kivireunus'): continue
        for t,al in sorted(zip(q[s].tolist(),ar.tolist()),key=lambda r:-r[1])[:8]:
            t=np.array(t);print('    a %.2f'%al,np.round(t,2).tolist(),'kuva',[pr(v) for v in t])
print('laikku kuvassa rajaus noin x 880-960, y 55-150')
