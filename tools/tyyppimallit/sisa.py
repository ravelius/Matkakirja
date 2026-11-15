import json,math,sys
TY='/Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot'
m=[x for x in json.load(open(TY+'/tulos/merkit-pariisi.json'))['merkit'] if x['osm']==sys.argv[1]][0]
P=m['pohja'][0] if isinstance(m['pohja'][0][0],list) else m['pohja']
t=math.radians(90-m['akseli']); c,s=math.cos(t),math.sin(t)
Q=[(x*c+y*s,-x*s+y*c) for x,y in P]
def sis(pt,r):
    x,y=pt; cc=False
    for i in range(len(r)):
        x1,y1=r[i]; x2,y2=r[i-1]
        if (y1>y)!=(y2>y) and x<(x2-x1)*(y-y1)/(y2-y1)+x1: cc=not cc
    return cc
st=2.0; u0=-m['pituus']/2; v0=-m['leveys']/2; nu=int(m['pituus']/st); nv=int(m['leveys']/st)
g=[[sis((u0+(i+.5)*st, v0+(j+.5)*st),Q) for i in range(nu)] for j in range(nv)]
best=(0,)
h=[0]*nu
for j in range(nv):
    for i in range(nu): h[i]=h[i]+1 if g[j][i] else 0
    stk=[]
    for i in range(nu+1):
        cur=h[i] if i<nu else 0; start=i
        while stk and stk[-1][1]>=cur:
            si,sh=stk.pop(); a=sh*(i-si)
            if a>best[0]: best=(a,si,i,j-sh+1,j+1)
            start=si
        stk.append((start,cur))
a,i0,i1,j0,j1=best
print(m['nimi'],'sisäsuorakaide',(i1-i0)*st,'×',(j1-j0)*st,'m, keskus u,v',round(u0+(i0+i1)/2*st,1),round(v0+(j0+j1)/2*st,1),'ala',a*st*st,'/ pohja-ala; ulko',m['pituus'],'×',m['leveys'])
# hallikohtaiset pituudet (halleja = parametrit)
H=m['parametrit']['halleja']; w=m['leveys']/H
for k in range(H):
    js=range(int(k*w/st),int((k+1)*w/st))
    rivi=[all(g[j][i] for j in js if j<nv) for i in range(nu)]
    pit=max((sum(1 for _ in g) for g in [[]]),default=0)
    run=b=0
    for x in rivi:
        run=run+1 if x else 0; b=max(b,run)
    print(' halli',k+1,'pisin yhtenäinen pituus pohjan sisällä',b*st,'m')
