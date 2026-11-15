import json,math,sys
from PIL import Image,ImageDraw
TY='/Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot'
m=[x for x in json.load(open(TY+'/tulos/merkit-pariisi.json'))['merkit'] if x['osm']==sys.argv[1]][0]
d=json.load(open('/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/osm.json'))
la0,lo0=m['keski']; k=math.cos(math.radians(la0))
L=lambda p:((p[1]-lo0)*k*111320,(p[0]-la0)*111320)
P=m['pohja'][0] if isinstance(m['pohja'][0][0],list) else m['pohja']
t=math.radians(90-m['akseli']); c,s=math.cos(t),math.sin(t)
uv=lambda q:(q[0]*c+q[1]*s,-q[0]*s+q[1]*c)
inrect=lambda q:abs(uv(q)[0])<=m['pituus']/2 and abs(uv(q)[1])<=m['leveys']/2
def sis(pt,r):
    x,y=pt; cc=False
    for i in range(len(r)):
        x1,y1=r[i]; x2,y2=r[i-1]
        if (y1>y)!=(y2>y) and x<(x2-x1)*(y-y1)/(y2-y1)+x1: cc=not cc
    return cc
def ala(r): return abs(sum(r[i-1][0]*r[i][1]-r[i][0]*r[i-1][1] for i in range(len(r))))/2
R=220; out=[]
im=Image.new('RGB',(900,900),'white'); dr=ImageDraw.Draw(im); S=900/(2*R*1.3)
tp=lambda q:(450+q[0]*S,450-q[1]*S)
for e in d['ways']+d['rel']:
    rr=[e['p']] if 'p' in e else [j['p'] for j in e.get('j',[]) if j.get('rooli')!='inner']
    for r in rr:
        loc=[L(p) for p in r]
        if not loc or min(abs(q[0]) for q in loc)>R*1.3 or min(abs(q[1]) for q in loc)>R*1.3: continue
        cx=sum(q[0] for q in loc)/len(loc); cy=sum(q[1] for q in loc)/len(loc)
        if abs(cx)>R*1.3 or abs(cy)>R*1.3: continue
        osuus=sum(inrect(q) for q in loc)/len(loc); sisalla=sis((cx,cy),P)
        väri=(200,200,200)
        if e['osm']==m['osm']: väri=(120,160,220)
        elif inrect((cx,cy)) and not sisalla: väri=(230,120,90); out.append((e['osm'],round(ala(loc)),round(osuus,2),e.get('t',{}).get('building'),e.get('t',{}).get('building:levels')))
        elif inrect((cx,cy)): väri=(240,200,90)
        dr.polygon([tp(q) for q in loc],fill=väri,outline=(80,80,80))
cor=[(sx*m['pituus']/2,sy*m['leveys']/2) for sx,sy in [(-1,-1),(1,-1),(1,1),(-1,1)]]
dr.polygon([tp((u*c-v*s,u*s+v*c)) for u,v in cor],outline=(0,0,0),width=3)
dr.line([tp(q) for q in P]+[tp(P[0])],fill=(0,0,200),width=2)
im.save(sys.argv[2])
print(m['nimi'],'rect',m['pituus'],m['leveys'],'pohja ala',round(ala(P)),'rect ala',round(m['pituus']*m['leveys']))
for o in sorted(out,key=lambda x:-x[1]): print(o)
print('yht',len(out),'ala',sum(o[1] for o in out))
