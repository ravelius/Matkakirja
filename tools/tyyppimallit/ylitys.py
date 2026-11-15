"""Pariisi: merkkien suorakaiteen (pituus × leveys, akseli) alle jäävät MUUT talolähteen rakennukset, pinta-alaosuus näytteillä."""
import json,math,sys
TY='/Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot'
mk=json.load(open(TY+'/tulos/merkit-pariisi.json'))['merkit']
pois=set(json.load(open(TY+'/tulos/vienti-pariisi.json'))['poisOsm'])
d=json.load(open('/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/osm.json'))
G=[(e['osm'],[e['p']] if 'p' in e else [j['p'] for j in e.get('j',[]) if j.get('rooli')!='inner']) for e in d['ways']+d['rel']]
B=[]
for o,rr in G:
    pts=[p for r in rr for p in r]
    if pts: B.append((o,rr,min(p[0] for p in pts),max(p[0] for p in pts),min(p[1] for p in pts),max(p[1] for p in pts)))
def sis(pt,r):
    x,y=pt; cc=False
    for i in range(len(r)):
        x1,y1=r[i]; x2,y2=r[i-1]
        if (y1>y)!=(y2>y) and x<(x2-x1)*(y-y1)/(y2-y1)+x1: cc=not cc
    return cc
tulos=[]
for m in mk:
    if m['osm'] not in pois or not m.get('pituus'): continue
    la0,lo0=m['keski']; k=math.cos(math.radians(la0)); L=lambda p:((p[1]-lo0)*k*111320,(p[0]-la0)*111320)
    t=math.radians(90-m['akseli']); c,s=math.cos(t),math.sin(t)
    pl=(m.get('sx') or 1)*m['pituus']/2 if False else m['pituus']/2; ll=m['leveys']/2
    inr=lambda q:abs(q[0]*c+q[1]*s)<=pl and abs(-q[0]*s+q[1]*c)<=ll
    R=math.hypot(pl,ll)/111320; Rl=R/k
    rivit=[]
    for o,rr,a0,a1,b0,b1 in B:
        if o==m['osm'] or o in pois or a1<la0-R or a0>la0+R or b1<lo0-Rl or b0>lo0+Rl: continue
        loc=[[L(p) for p in r] for r in rr]
        xs=[q[0] for r in loc for q in r]; ys=[q[1] for r in loc for q in r]
        n=0;i_=0;st=2.0
        x=min(xs)
        while x<=max(xs):
            y=min(ys)
            while y<=max(ys):
                if any(sis((x,y),r) for r in loc):
                    n+=1; i_+=inr((x,y))
                y+=st
            x+=st
        if n and i_*st*st>=20: rivit.append((o,round(i_*st*st),round(i_/n,2)))
    if rivit: tulos.append(dict(osm=m['osm'],nimi=m.get('nimi'),tyyppi=m['tyyppi']+'-'+m['koko'],sovitus=m.get('sovitus'),ala_alle=sum(r[1] for r in rivit),talot=sorted(rivit,key=lambda r:-r[1])))
tulos.sort(key=lambda t:-t['ala_alle'])
json.dump(tulos,open(sys.argv[1],'w'),ensure_ascii=False,indent=1)
print('merkkejä',len(tulos),'/',len(pois))
for t in tulos[:25]: print(t['ala_alle'],'m²',len(t['talot']),'taloa',t['tyyppi'],t['sovitus'],t['nimi'],t['osm'])
