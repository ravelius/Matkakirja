# LAV 6.11.: jäännös 3:n matala reunakivi: sivupinnat, materiaali, UV0, venymä; ja kaikki V4_kivireunus-sivut. Vain mittaus.
import sys,os,glob,collections
import numpy as np
A='/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/muuri/aukot/'
exec(open(A+'mittaa3.py').read().split("print('## kuvan pisteet")[0])
K7=KT+'koejuuri-levyt7/'+TV
def rivit(pat):
    R=[]
    for f in sorted(glob.glob(pat)):
        pala=os.path.basename(f)[10:-9];g=G(os.path.realpath(f))
        for me,p in prims(g):
            a,I=lue_p(g,p)
            if not len(I) or 'TEXCOORD_0' not in a: continue
            m=g.j['materials'][p['material']]
            q=a['POSITION'][I].astype('f8');u=a['TEXCOORD_0'][I].astype('f8')
            R.append((pala,m['name'].split('.')[0].replace('V4_',''),q,u,a['NORMAL'][I] if 'NORMAL' in a else None,a['TEXCOORD_1'][I] if 'TEXCOORD_1' in a else None))
    return R
def venyma(q,u):
    # UV:n pituus / 3D-pituus: kaksi pääakselia (singulaariarvot), metriä kohti
    e1=q[:,1]-q[:,0];e2=q[:,2]-q[:,0];n=np.cross(e1,e2);ar=np.linalg.norm(n,axis=1)/2
    t=e1/np.maximum(np.linalg.norm(e1,axis=1,keepdims=True),1e-9);b=np.cross(n/np.maximum(2*ar[:,None],1e-9),t)
    x1=(e1*t).sum(1);x2=(e2*t).sum(1);y2=(e2*b).sum(1)
    d1=u[:,1]-u[:,0];d2=u[:,2]-u[:,0]
    dux=d1/np.where(np.abs(x1)>1e-9,x1,1)[:,None];duy=(d2-dux*x2[:,None])/np.where(np.abs(y2)>1e-9,y2,1)[:,None]
    J=np.stack([dux,duy],2);s=np.linalg.svd(J,compute_uv=False)
    return ar,n/np.maximum(2*ar[:,None],1e-9),s[:,0],s[:,1]
R=rivit(K7)
print('## jäännös 3 x 225-265, z -125..-100, sivupinnat y<1')
for pala,m,q,u,N,u1 in R:
    s=(q[:,:,0].max(1)>225)&(q[:,:,0].min(1)<265)&(q[:,:,2].max(1)>-125)&(q[:,:,2].min(1)<-100)&(q[:,:,1].max(1)<1.2)
    if not s.any(): continue
    ar,nn,s1,s2=venyma(q[s],u[s])
    for i in np.argsort(-ar):
        if abs(nn[i,1])>.3 or ar[i]<.02: continue
        print(' ',pala,m[:9],'a',round(float(ar[i]),2),'P',np.round(q[s][i],2).tolist(),'UV',np.round(u[s][i],2).tolist(),'geoN',np.round(nn[i],2).tolist(),'uv/m %.3f %.3f'%(s1[i],s2[i]),'N',np.round(N[s][i][0],2).tolist() if N is not None else '-')
print('## kaikki kivireunus-sivut koko alue (lod0): UV/m suurin / pienin = venymä')
rv=[]
for pala,m,q,u,N,u1 in R:
    if 'kivireunus' not in m: continue
    ar,nn,s1,s2=venyma(q,u);sivu=np.abs(nn[:,1])<.3
    for i in np.nonzero(sivu&(ar>.02))[0]:
        rv.append((pala,float(ar[i]),float(s1[i]),float(s2[i]),q[i].mean(0),float(q[i,:,1].max()-q[i,:,1].min()),u[i]))
print(' sivuja',len(rv),'m2',round(sum(r[1] for r in rv),1))
s1=np.array([r[2] for r in rv]);s2=np.array([r[3] for r in rv]);ar=np.array([r[1] for r in rv])
print(' uv/m suurempi: pct',np.round(np.percentile(s1,[5,25,50,75,95]),3).tolist(),' pienempi pct',np.round(np.percentile(s2,[5,25,50,75,95]),3).tolist())
ve=s1/np.maximum(s2,1e-6)
for raja in (1.5,2,3,5,10,50):
    k=ve>raja;print(' venymä >',raja,': kolmioita',int(k.sum()),'m2',round(float(ar[k].sum()),1))
k=s2<.005;print(' UV lähes piste/viiva (pienempi <0,005/m): kolmioita',int(k.sum()),'m2',round(float(ar[k].sum()),1))
print('## 25 suurinta venymää, ala > 0,3')
for i in [j for j in np.argsort(-ve) if ar[j]>=.3][:25]:
    print(' ',rv[i][0],'a %.2f ve %.1f uv/m %.3f %.3f'%(ar[i],ve[i],s1[i],s2[i]),'kp',np.round(rv[i][4],1).tolist(),'kork %.2f'%rv[i][5])
