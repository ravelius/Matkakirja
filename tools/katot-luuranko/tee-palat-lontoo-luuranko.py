#!/opt/homebrew/opt/python@3.14/bin/python3
# NS 5.11.2026, KK 23.38 osa C: koko Pariisin talot paloina (z15). Sama talo kuin tee-talot.py (Marais), lisäksi: palat, nähtävyysalueiden maskit v7 ja maanpinta talokohtaisesti.
# python3 tee-palat.py <kansio> [uusi kansio] [korvaus.json] [siisti.json] -> 15_x_y.bytes, indeksi.txt, mittarit.json
# MT02: otsikko 36 t (taika, kärjet, indeksit, lat, lon, maan korkeus), kärki 24 t kuten MT01 (normaalin w = talon pohja metreinä palan maasta, 1 m tarkkuudella, ±127), UInt32-indeksit.
# Ajo ilman -I: numpy ja PIL käyttäjän kirjastoista.
import glob,hashlib,json,math,os,struct,sys
import numpy as np
from PIL import Image,ImageDraw
Image.MAX_IMAGE_PIXELS=None
# KS 9.11.2026 (PT 23.3x, kaupungit koodilla osa A, koe): luurankokatot koealueelle. Ympäristö: KATOT_VAIHE=pohjat|rakenna, KATOT_ALUE='la0,la1,lo0,lo1',
# KATOT_POHJAT (json, vaihe pohjat kirjoittaa, rakenna lukee), KATOT_RANKA (Blenderin tulos), KATOT_LISAPALA='x y' (toistuvuuden vertailu). Ilman KATOT_VAIHE tulos tavulleen kuten tee-palat.py.
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)));import katot as KT
KVAIHE=os.environ.get('KATOT_VAIHE');KALUE=tuple(float(v) for v in os.environ['KATOT_ALUE'].split(',')) if KVAIHE else None
KPOHJAT=[];KRANKA=json.load(open(os.environ['KATOT_RANKA'])) if KVAIHE=='rakenna' else {};KTIETO={q_['osm']:q_ for q_ in json.load(open(os.environ['KATOT_POHJAT']))} if KVAIHE=='rakenna' else {}
KLISA=tuple(int(v) for v in os.environ['KATOT_LISAPALA'].split()) if os.environ.get('KATOT_LISAPALA') else None
KD=10.0
def koe(T):return KALUE is not None and KALUE[0]<=T['la']<=KALUE[1] and KALUE[2]<=T['lo']<=KALUE[3]
def koe_muoto(T):
    m=T['t'].get('roof:shape');b=T['t'].get('building')
    if m=='flat':return 'tasa','tagi'
    if m in('mansard','gambrel','saltbox','double_saltbox','quadruple_saltbox'):return 'mansardi','tagi'
    if m=='gabled':return 'harja','tagi'
    if m in('hipped','half-hipped','pyramidal','dome','cone','round','onion','many','skillion'):return 'auma','tagi'
    if b in('commercial','retail','office','industrial','warehouse','supermarket','parking') and T['koko']>=2000:return 'tasa','saanto'
    if T['n']<=1.0 and T['h']>=8:return 'tasa','korkeusaineisto'  # IGN/LIDAR: katon korkeus alle metrin = tasakatto
    return 'auma','saanto'  # Lontoo: rivi- ja kerrostalojen harjakatot; naapurireunat päätyinä antavat harjan rivin suuntaan
D=sys.argv[1];UL=sys.argv[2] if len(sys.argv)>2 else D+'/palat';os.makedirs(UL,exist_ok=True)  # toinen argumentti: uusi versiokansio (PT 6.11. 07.3x)
D=sys.argv[1];UL=sys.argv[2] if len(sys.argv)>2 else D+'/palat';os.makedirs(UL,exist_ok=True)  # toinen argumentti: uusi versiokansio (PT 6.11. 07.3x)
# Sama rajaus kuin TaloAlue.cs (La0, La1, Lo0, Lo1): kehätien sisäpuoli ilman metsiä
LA0,LA1,LO0,LO1=map(float,os.environ['LONTOO_RAJA'].split(','))
Z=15;N=2**Z;KERROIN=2.0  # KorkeusKerroin.Oletus: maasto on 2x
MLA=111319.49079327358
def tx(lo):return (lo+180)/360*N
def ty(la):return (1-math.asinh(math.tan(math.radians(la)))/math.pi)/2*N
def lon(x):return x/N*360-180
def lat(y):return math.degrees(math.atan(math.sinh(math.pi*(1-2*y/N))))
A0,O0=(LA0+LA1)/2,(LO0+LO1)/2;MLO=MLA*math.cos(math.radians(A0))
xy=lambda la,lo:((lo-O0)*MLO,(la-A0)*MLA)
ala=lambda r:sum(r[i][0]*r[(i+1)%len(r)][1]-r[(i+1)%len(r)][0]*r[i][1] for i in range(len(r)))/2
def kesk(r):
    a=ala(r)
    if abs(a)<1e-6:return r[0]
    cx=cy=0
    for i in range(len(r)):
        p,q=r[i],r[(i+1)%len(r)];c=p[0]*q[1]-q[0]*p[1];cx+=(p[0]+q[0])*c;cy+=(p[1]+q[1])*c
    return(cx/(6*a),cy/(6*a))
def sisalla(r,x,y):
    s=False
    for i in range(len(r)):
        a,b=r[i],r[(i+1)%len(r)]
        if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:s=not s
    return s
# --- earcut: korvamenetelmä, reiät sillattuna (tee-talot.py) ---
def risti(a,b,c):return(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
def sillat(ulko,reiat):
    r=list(ulko)
    for h in sorted(reiat,key=lambda h:-max(p[0] for p in h)):
        i=max(range(len(h)),key=lambda k:h[k][0]);m=h[i];par=None;pd=1e18
        for j in range(len(r)):
            a,b=r[j],r[(j+1)%len(r)]
            if (a[1]-m[1])*(b[1]-m[1])<=0 and a[1]!=b[1]:
                x=a[0]+(m[1]-a[1])/(b[1]-a[1])*(b[0]-a[0])
                if x>=m[0] and x-m[0]<pd:pd=x-m[0];par=j if a[0]>b[0] else (j+1)%len(r)
        if par is None:par=min(range(len(r)),key=lambda j:(r[j][0]-m[0])**2+(r[j][1]-m[1])**2)
        r=r[:par+1]+h[i:]+h[:i+1]+r[par:]
    return r
def kolmiot(r):
    n=len(r)
    if n<3:return[]
    idx=list(range(n));ulos=[];v=0;raja=2*n*n
    while len(idx)>3 and raja>0:
        raja-=1;m=len(idx);i0,i1,i2=idx[(v-1)%m],idx[v%m],idx[(v+1)%m];a,b,c=r[i0],r[i1],r[i2];kor=risti(a,b,c)>1e-9
        if kor:
            for j in idx:
                if j in(i0,i1,i2):continue
                p=r[j]
                if p in(a,b,c):continue
                if risti(a,b,p)>=-1e-9 and risti(b,c,p)>=-1e-9 and risti(c,a,p)>=-1e-9:kor=False;break
        if kor:ulos.append((i0,i1,i2));idx.pop(v%m);v=max(v-1,0)
        else:
            v+=1
            if v>=len(idx)*3:break
    if len(idx)==3:ulos.append(tuple(idx))
    return ulos
def kolmiot2(r):
    """KK 6.11. 08.4x, palat-v5: varatie vajaalle katolle. Etsii korvan koko renkaasta joka kierroksella ja poistaa suorat kärjet; hitaampi, ajetaan vain vajaille."""
    n=len(r);idx=list(range(n));ulos=[]
    while len(idx)>3:
        m=len(idx);loyto=None;suora=None
        for v in range(m):
            i0,i1,i2=idx[v-1],idx[v],idx[(v+1)%m];a,b,c=r[i0],r[i1],r[i2];rr=risti(a,b,c)
            if abs(rr)<=1e-9:
                if suora is None:suora=v
                continue
            if rr<0:continue
            for j in idx:
                if j in(i0,i1,i2):continue
                p=r[j]
                if p in(a,b,c):continue
                if risti(a,b,p)>=-1e-9 and risti(b,c,p)>=-1e-9 and risti(c,a,p)>=-1e-9:break
            else:
                loyto=v;break
        if loyto is not None:ulos.append((idx[loyto-1],idx[loyto],idx[(loyto+1)%m]));idx.pop(loyto)
        elif suora is not None:idx.pop(suora)
        else:break
    if len(idx)==3 and abs(risti(r[idx[0]],r[idx[1]],r[idx[2]]))>1e-9:ulos.append(tuple(idx))
    return ulos
def viipale(renkaat):
    """Palat-v5, reiällisen talon varatie: tasakatto suorakaistoina (parillinen-pariton-täyttö). Ei siltoja, peittää alueen aina tarkasti. Palauttaa kärjet ja kolmiot."""
    reunat=[(r_[i],r_[(i+1)%len(r_)]) for r_ in renkaat for i in range(len(r_)) if r_[i][0]!=r_[(i+1)%len(r_)][0]]
    xs=sorted({p[0] for r_ in renkaat for p in r_});pts=[];tr=[]
    def yx(e,x):
        return e[0][1]+(x-e[0][0])/(e[1][0]-e[0][0])*(e[1][1]-e[0][1])
    for x0,x1 in zip(xs,xs[1:]):
        if x1-x0<1e-6:continue
        xm=(x0+x1)/2;mukana=sorted((e for e in reunat if min(e[0][0],e[1][0])<xm<max(e[0][0],e[1][0])),key=lambda e:yx(e,xm))
        for k in range(0,len(mukana)-1,2):
            e0,e1=mukana[k],mukana[k+1];s0=len(pts)
            pts+=[(x0,yx(e0,x0)),(x1,yx(e0,x1)),(x1,yx(e1,x1)),(x0,yx(e1,x0))]
            tr+=[(s0,s0+1,s0+2),(s0,s0+2,s0+3)]
    tr=[t for t in tr if abs(risti(pts[t[0]],pts[t[1]],pts[t[2]]))>1e-9]
    return pts,tr
def peitto_kuva(renkaat,pol,tris):
    """Oikea peitto reiälliselle talolle: pinta-alojen summa ei huomaa päällekkäisiä kolmioita (Monnaie de Paris)."""
    xs=[p[0] for p in renkaat[0]];ys=[p[1] for p in renkaat[0]];x0,y0=min(xs),min(ys);k=256/max(max(xs)-x0,max(ys)-y0,1e-6);L=258
    q=lambda p:((p[0]-x0)*k+1,(p[1]-y0)*k+1)
    A_=Image.new('1',(L,L));d=ImageDraw.Draw(A_);d.polygon([q(p) for p in renkaat[0]],fill=1)
    for h in renkaat[1:]:d.polygon([q(p) for p in h],fill=0)
    B_=Image.new('1',(L,L));d=ImageDraw.Draw(B_)
    for a,b,c in tris:d.polygon([q(pol[a]),q(pol[b]),q(pol[c])],fill=1)
    a_,b_=np.array(A_),np.array(B_);n=a_.sum()
    return 1.0 if n==0 else float((a_&b_).sum()/n)
def peitto(pol,tris):
    A_=abs(ala(pol))
    return 1.0 if A_<=0 else sum(abs(risti(pol[a],pol[b],pol[c]))/2 for a,b,c in tris)/A_
# --- nähtävyysalueet v7 (KS:n nahtavyyssarja, omistaja 08.52: lähelle ei jää striimikartan rakennuksia): talo pois keskipisteestä, koko talo kerrallaan ---
S='/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/nahtavyyssarja'
L={'varatut':[],'kohteet':[]}  # Lontoossa ei Pariisin nähtävyysalueita
Z17=2**17
def m17(la):return 156543.03392/Z17*math.cos(math.radians(la))
def tx17(lo):return (lo+180)/360*Z17*256
def ty17(la):return (1-math.asinh(math.tan(math.radians(la)))/math.pi)/2*Z17*256
maskit=[]
def lisaa_maski(nimi,a,la,lo,mp,siirto=None):
    k=mp/m17(la);ox,oy=tx17(lo)-a.shape[1]/2*k,ty17(la)-a.shape[0]/2*k
    if siirto:ox+=siirto[0]/m17(la);oy+=siirto[1]/m17(la)
    maskit.append(dict(nimi=nimi,a=a,k=k,ox=ox,oy=oy,x1=ox+a.shape[1]*k,y1=oy+a.shape[0]*k,pois=0))
# Omistaja 6.11. 08.13, koe: valinnainen 3. argumentti korvaa varatun maskin nimellä (json {nimi: varattu}). Ilman sitä sama kuin ennen.
KORVAA=json.load(open(sys.argv[3])) if len(sys.argv)>3 else {}
for v in L['varatut']:
    v=KORVAA.get(v['nimi'],v)
    i=Image.open(v['kuva']);a=np.array(i.split()[-1] if v['kanava']=='alfa' else i.convert('L'))>(8 if v['kanava']=='alfa' else 127)
    lisaa_maski(v['nimi'],a,v['lat'],v['lon'],v['m_per_px'],v.get('siirto_m'))
for k in L['kohteet']:
    # KS 6.11., ryhmä 2, koe: korvaus-json koskee myös sarjan kohteita (sama muoto kuin varatuilla). Ilman avainta sama kuin ennen.
    if k['id'] in KORVAA:v=KORVAA[k['id']];lisaa_maski(v['nimi'],np.array(Image.open(v['kuva']).convert('L'))>127,v['lat'],v['lon'],v['m_per_px'],v.get('siirto_m'));continue
    t=json.load(open(f"{S}/alueet/{k['id']}/alue.json"));a=np.array(Image.open(f"{S}/alueet/{k['id']}/maski.png").convert('L'))>127
    lisaa_maski(k['id'],a,t['keski_lat'],t['keski_lon'],t['m_per_px'])
def maskissa(la,lo):
    x,y=tx17(lo),ty17(la)
    for m in maskit:
        if m['ox']<=x<m['x1'] and m['oy']<=y<m['y1']:
            if m['a'][int((y-m['oy'])/m['k']),int((x-m['ox'])/m['k'])]:m['pois']+=1;return m['nimi']
    return None
# Ohjelmakohteet (OhjelmaKohteet.cs): oma OSM-talo pois, kun piste on sen sisällä. Sillat eivät ole taloja.
OHJELMA=json.loads(os.environ.get('LONTOO_OHJELMA','[]'))
# --- aineisto ---
print('luetaan',flush=True)
o=json.load(open(D+'/osm.json'))
ruudut={}
nI=0
for f in glob.glob(D+'/ign/*.json'):
    for x in json.load(open(f)):
        g=x['g'];pol=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
        for pp in pol:
            r=[xy(c[1],c[0]) for c in pp[0]];c=kesk(r);ruudut.setdefault((int(c[0]//40),int(c[1]//40)),[]).append((r,c,x['p']));nI+=1
print('ign',nI,flush=True)
def korkeus(c,t):
    gx,gy=int(c[0]//40),int(c[1]//40);lah=None;ld=225
    for i in(-1,0,1):
        for j in(-1,0,1):
            for r,k,p in ruudut.get((gx+i,gy+j),[]):
                if p.get('hauteur') is None:continue
                if sisalla(r,*c):return p,'ign'
                d=(k[0]-c[0])**2+(k[1]-c[1])**2
                if d<ld:ld=d;lah=p
    if lah:return lah,'ign-lähin'
    return None,'levels' if t.get('building:levels') else 'oletus'
def maa_lahin(c):
    """Maan korkeus lähimmästä IGN-rakennuksesta, jos omalla ei ole."""
    gx,gy=int(c[0]//40),int(c[1]//40);ld=1e18;a=None
    for sade in(2,8,24):
        for i in range(-sade,sade+1):
            for j in range(-sade,sade+1):
                for r,k,p in ruudut.get((gx+i,gy+j),[]):
                    if p.get('altitude_minimale_sol') is None:continue
                    d=(k[0]-c[0])**2+(k[1]-c[1])**2
                    if d<ld:ld=d;a=p['altitude_minimale_sol']
        if a is not None:return a
    return 35.0
def ketjuta(pal):
    pal=[list(p) for p in pal];u=[]
    while pal:
        c=pal.pop()
        while c[0]!=c[-1]:
            for k,p in enumerate(pal):
                if p[0]==c[-1]:c+=p[1:];pal.pop(k);break
                if p[-1]==c[-1]:c+=p[-2::-1];pal.pop(k);break
            else:break
        if c[0]==c[-1] and len(c)>=4:u.append(c)
    return u
EI_TALOJA={'no','roof','ruins','collapsed','construction','proposed','demolished','bridge','carport'}
# KK 6.11. 08.4x, palat-v5: laivat ja pysäkkikatokset eivät ole taloja.
LAIVAT={'boat','houseboat','ship'}
talot=[];poissa=dict(pieni=0,laji=0,alla=0,ulkona=0,laiva=0,katos=0)
# Omistaja 6.11. 10.04 (PT): Les Hallesin porrasreunaiset korttelit. Valinnainen 4. argumentti: json {osm: {"ulko": [ala m², sivu m], "reika": [ala m², sivu m]}}. Täyttää vain luetelluista taloista lovet ulospäin, joten kartan litteä muoto jää talon alle. Ilman argumenttia sama tulos kuin ennen.
SIISTI=json.load(open(sys.argv[4])) if len(sys.argv)>4 else {}
siistitty={}
# KK 6.11. 11.34 ja 11.43, palat-v10: samassa siisti-jsonissa "_taloksi" [osm] (EI_TALOJA ei koske), "_pois" [osm] (talo pois) ja "_leikkaa" {osm: [[la,lo],[la,lo]]} (ulkorenkaasta jää suoran vasen puoli, reiät eivät muutu). Ilman avaimia sama tulos kuin ennen.
TALOKSI=set(SIISTI.get('_taloksi',[]));POIS_OSM=set(SIISTI.get('_pois',[]));LEIKKAA=SIISTI.get('_leikkaa',{})
def leikkaa(p,a,b):
    q=p[:-1];u=[];a,b=xy(*a),xy(*b)
    for i in range(len(q)):
        c,d=q[i],q[(i+1)%len(q)];sc,sd=risti(a,b,xy(*c)),risti(a,b,xy(*d))
        if sc>=0:u.append(c)
        if sc*sd<0:s=sc/(sc-sd);u.append((c[0]+s*(d[0]-c[0]),c[1]+s*(d[1]-c[1])))
    return u+[u[0]]
def tayta_lovet(p,raja_ala,raja_sivu,reika):
    q=list(p[:-1]);m=1 if ala([xy(*c) for c in q])>0 else -1
    if reika:m=-m
    while len(q)>4:
        par=None
        for i in range(len(q)):
            a,b,c=xy(*q[i-1]),xy(*q[i]),xy(*q[(i+1)%len(q)]);t=risti(a,b,c)*m
            if t>=0 or -t/2>raja_ala or math.dist(a,c)>raja_sivu:continue
            ohi=(i,(i-1)%len(q),(i+1)%len(q));sisalla_kolmio=False
            for j in range(len(q)):
                if j in ohi:continue
                e=xy(*q[j]);v=(risti(a,b,e),risti(b,c,e),risti(c,a,e))
                if all(x>0 for x in v) or all(x<0 for x in v):sisalla_kolmio=True;break
            if sisalla_kolmio:continue
            if par is None or -t/2<par[0]:par=(-t/2,i)
        if par is None:break
        q.pop(par[1])
    return q+[q[0]]
def lisaa(osm,t,ulko,reiat,koko=None):
    if osm in POIS_OSM:poissa['kohde']=poissa.get('kohde',0)+1;return
    if osm in LEIKKAA:
        n0=len(ulko);ulko=leikkaa(ulko,*LEIKKAA[osm]);print('leikattu',osm,n0,'->',len(ulko),flush=True)
    if osm in SIISTI:
        s_=SIISTI[osm];n0=len(ulko);ulko=tayta_lovet(ulko,*s_['ulko'],False);reiat=[tayta_lovet(h,*s_['reika'],True) for h in reiat]
        siistitty[osm]=[n0,len(ulko)];print('siistitty',osm,n0,'->',len(ulko),flush=True)
    r=[xy(*p) for p in ulko[:-1]];c=kesk(r)
    la=A0+c[1]/MLA;lo=O0+c[0]/MLO
    if not(LA0<=la<=LA1 and LO0<=lo<=LO1):poissa['ulkona']+=1;return
    if abs(ala(r))<8:poissa['pieni']+=1;return
    if t.get('building') in EI_TALOJA and osm not in TALOKSI:poissa['laji']+=1;return
    if t.get('building') in LAIVAT:poissa['laiva']+=1;return
    if t.get('amenity')=='shelter':poissa['katos']+=1;return
    if t.get('location')=='underground' or t.get('layer','').startswith('-'):poissa['alla']+=1;return
    if maskissa(la,lo):return
    if ala(r)<0:r.reverse();ulko=ulko[::-1]
    for nimi,ola,olo in OHJELMA:
        if sisalla(r,*xy(ola,olo)):poissa[nimi]=poissa.get(nimi,0)+1;return
    rr=[]
    for h in reiat:
        q=[xy(*p) for p in h[:-1]]
        if ala(q)>0:q.reverse();h=h[::-1]
        rr.append((q,h))
    talot.append(dict(osm=osm,t=t,r=r,avain=[tuple(p) for p in ulko[:-1]],reiat=rr,c=c,la=la,lo=lo,koko=koko if koko is not None else abs(ala(r))))
for w in o['ways']:lisaa(w['osm'],w['t'],w['p'],[])
for e in o['rel']:
    ul=ketjuta([j['p'] for j in e['j'] if j['rooli']!='inner']);si=ketjuta([j['p'] for j in e['j'] if j['rooli']=='inner'])
    koko=sum(abs(ala([xy(*p) for p in u[:-1]])) for u in ul)  # palat-v5: moniosaisen talon pieni osa ei ole pieni talo
    for u in ul:
        ru=[xy(*p) for p in u[:-1]]
        lisaa(e['osm'],e['t'],u,[h for h in si if sisalla(ru,*xy(*h[0]))],koko)
del o
print('taloja',len(talot),poissa,flush=True)
# PT ja KK 6.11. 08.5x, palat-v5: pieni talo (alle 30 m²), kioski ja 1-kerroksinen kauppa eivät saa korkeutta naapurilta eivätkä 15 m:n oletusta. Oma IGN > oma height > kerrokset > matala oletus.
# Ei koske: rakennusta isomman IGN-talon sisällä (keskipiste yli ruudun päässä, korkeus() ei löydä; jää ennalleen) eikä suojeltua tai merkittyä kohdetta (obeliski, muistomerkit, suihkulähteet).
PIENI_ALA=30.0;MATALA=3.5
SUOJELTU=('historic','heritage','ref:mhs','wikidata','wikipedia','man_made','tower:type','memorial')
# PT 6.11. 09.0x, palat-v6: aito pieni kohde ilman suojelumerkintää ja irrallinen pylväs korjataan yksitellen (selvitys-yhteinen/v5-kohteet.py). Octroi: arvio, 1-kerroksinen paviljonki, ei mitattu; way/73119876: 9,7 m², ei naapuria, pysyy v4:n korkeudessa.
KOHDE_KORKEUS={'way/81203962':6.0,'way/73119876':4.4}
laaja={}
for lista in ruudut.values():
    for rr,_,p in lista:
        if p.get('hauteur') is None:continue
        xs=[q[0] for q in rr];ys=[q[1] for q in rr]
        for i in range(int(min(xs)//40),int(max(xs)//40)+1):
            for j in range(int(min(ys)//40),int(max(ys)//40)+1):laaja.setdefault((i,j),[]).append(rr)
def luku(s):
    try:return float(str(s).replace('m','').replace(',','.').strip())
    except ValueError:return 0.0
def matalan_saanto(T):
    t=T['t'];lv=luku(t.get('building:levels',0))
    return T['koko']<PIENI_ALA or t.get('shop')=='kiosk' or t.get('building')=='kiosk' or ((t.get('shop') or t.get('building')=='retail') and lv==1)
lahde={};muutokset=[]
# --- Lontoo: korkeus Environment Agencyn LiDARista (DSM - DTM ääriviivan sisällä), maa pelin omasta maastosta z12, jotta talo istuu kartan pinnalle ---
sys.path.insert(0,os.path.dirname(os.path.abspath(sys.argv[0])))
from bng import bng
import maasto,re as _re
LI=os.environ['LONTOO_LIDAR'];_dsm={};_dtm={}
for f in glob.glob(LI+'/*.tif'):
    m=_re.search(r'(ds|dt)m_(\d+)_(\d+)',f);(_dsm if m[1]=='ds' else _dtm)[(int(m[2]),int(m[3]))]=np.array(Image.open(f),dtype='f4')
_E0=min(k[0] for k in _dsm);_E1=max(k[0] for k in _dsm)+500;_N0=min(k[1] for k in _dsm);_N1=max(k[1] for k in _dsm)+500
ND=np.full((_N1-_N0,_E1-_E0),np.nan,'f4')
for k,a in _dsm.items():ND[_N1-k[1]-500:_N1-k[1],k[0]-_E0:k[0]-_E0+500]=a-_dtm[k]
del _dsm,_dtm
_mc={}
def maapinta(la,lo):
    k=(round(la/0.0003),round(lo/0.0004))
    if k not in _mc:_mc[k]=maasto.korkeus(la,lo,12)[0]
    return _mc[k]
def lidar(T):
    Q=[bng(*p) for p in T['avain']];xs=[q[0]-_E0 for q in Q];ys=[_N1-q[1] for q in Q];x0,x1,y0,y1=int(min(xs)),int(max(xs))+2,int(min(ys)),int(max(ys))+2
    m=maapinta(T['la'],T['lo'])
    if x0<0 or y0<0 or x1>ND.shape[1] or y1>ND.shape[0]:return dict(altitude_minimale_sol=m,hauteur=float(T['t'].get('height','0').split()[0] or 0) or 15.0),'ei-lidar'
    im=Image.new('1',(x1-x0,y1-y0));d=ImageDraw.Draw(im);d.polygon([(a-x0,b-y0) for a,b in zip(xs,ys)],fill=1)
    for q,h in T['reiat']:
        Rq=[bng(*p) for p in h[:-1]];d.polygon([(a[0]-_E0-x0,_N1-a[1]-y0) for a in Rq],fill=0)
    v=ND[y0:y1,x0:x1][np.array(im)];v=v[np.isfinite(v)]
    if v.size<4 or np.percentile(v,50)<2.5:return dict(altitude_minimale_sol=m,hauteur=None),'matala'
    h,t=float(np.percentile(v,50)),float(np.percentile(v,97))
    return dict(altitude_minimale_sol=m,hauteur=h,altitude_minimale_toit=m+h,altitude_maximale_toit=m+t),'ign'
for T in talot:
    p,l=lidar(T)
    if p and p.get('hauteur') is not None:
        h=float(p['hauteur']);a,b=p.get('altitude_minimale_toit'),p.get('altitude_maximale_toit');n=(b-a) if a is not None and b is not None else 3
    else:
        try:h=float(T['t'].get('building:levels',0))*3.2+1 or 15
        except ValueError:h=15
        if h<2:h=15
        n=3
    if l!='ign' and matalan_saanto(T):
        t=T['t'];h4=max(3.0,h)
        if any(sisalla(rr,*T['c']) for rr in laaja.get((int(T['c'][0]//40),int(T['c'][1]//40)),[])):l='pieni-ign-sisalla'
        elif any(k in t for k in SUOJELTU) or t.get('building') in('church','chapel','cathedral','temple','tower','monument') or t.get('amenity')=='place_of_worship':l='pieni-suojeltu'
        else:
            hk,lv=luku(t.get('height',0)),luku(t.get('building:levels',0))
            if hk>0:h,l=hk,'pieni-height'
            elif lv>0:h,l=lv*3.2+1,'pieni-levels'
            else:h,l=MATALA,'pieni-oletus'
            if T['osm'] in KOHDE_KORKEUS:h,l=KOHDE_KORKEUS[T['osm']],'pieni-kohde'
            n=1 if h<8 else 3  # Matalan talon katto ei saa kaksinkertaistaa korkeutta (rinne oli 3 m).
            if abs(max(3.0,h)-h4)>=0.5:muutokset.append(dict(osm=T['osm'],ala=round(abs(ala(T['r'])),1),ennen=round(h4,1),nyt=round(max(3.0,h),1),lahde=l,la=round(T['la'],5),lo=round(T['lo'],5),rakennus=t.get('building'),nimi=t.get('name')))
    lahde[l]=lahde.get(l,0)+1
    T['h']=max(3.0,h);T['n']=max(1.0,min(6.0,n))
    m=p.get('altitude_minimale_sol') if p else None
    T['maa']=float(m)
    T['pala']=(int(tx(T['lo'])),int(ty(T['la'])))
print('korkeudet',lahde,flush=True)
# Palan maa = mediaani; talon pohja ja katto maan 2x-korkeudella, talo itse oikeissa metreissä (kuten nähtävyydet)
palat={}
for k,T in enumerate(talot):palat.setdefault(T['pala'],[]).append(k)
palamaa={}
for pk,kk in palat.items():
    m=sorted(talot[k]['maa'] for k in kk);palamaa[pk]=m[len(m)//2]
for T in talot:
    # PT 6.11. 07.5x, koe: mäen laella kartta on matalammalla (ajo maa2: maa ≥ 105 → pinta 2 × maa + 8; sc-80: rivi leijuu). Piirretty pohja = 2 × (maa + 15) − LAKI_LASKU(maa): 30 m:n lisä pienenee 8 m:iin, kun oma maa kasvaa 90:stä 110:een. Alle 90: ennallaan.
    T['pohja']=max(-127.0,min(127.0,round((T['maa']-palamaa[T['pala']])*KERROIN-1.1*max(0.0,min(20.0,T['maa']-90.0)))))
    T['ylin']=T['pohja']+T['h']
# yhteiset reunat
rk=lambda p:(round(p[0],6),round(p[1],6))
reuna={}
for k,T in enumerate(talot):
    for rng in[T['avain']]+[x[1][:-1] for x in T['reiat']]:
        for i in range(len(rng)):
            a,b=rk(rng[i]),rk(rng[(i+1)%len(rng)]);reuna.setdefault((min(a,b),max(a,b)),[]).append(k)
# --- verkko ---
def lin(c):return tuple(round(255*((v/255/12.92) if v/255<=0.04045 else ((v/255+0.055)/1.055)**2.4)) for v in c)
SEINA=[(240,222,180),(226,199,160),(233,210,170)];KATTO=(168,140,116)
tilasto=dict(seinia=0,piilossa=0,rinteita=0,tasa=0,tasakatto=0,vajaa_edelleen=0,puuttuva_ala_ennen=0.0,puuttuva_ala_nyt=0.0);tasakatot=[]
# Viillot katon sisällä: kolmiointi voi jäädä kesken, ja alle 2 %:n vaje (ison talon 60 m²) näkyi kapeina rakoina läpi. Tyylin taloille täysi peitto: kolmiot2, sitten viipale.
def tarkka(u):
    if len(u)>1:  # Koe6: peitto_kuva ei näe kapeita rakoja reiällisessä talossa, joten aina viipale.
        tilasto['tarkka_viipale']=tilasto.get('tarkka_viipale',0)+1;p3,t3=viipale(u);return p3,t3,1.0
    pol=sillat(u[0],u[1:]) if len(u)>1 else u[0]
    t=kolmiot(pol);pe=peitto(pol,t)
    if len(u)>1:pe=min(pe,peitto_kuva(u,pol,t))
    if pe>=0.9995:return pol,t,pe
    if len(u)==1:
        t2=kolmiot2(pol);p2=peitto(pol,t2)
        if abs(p2-1)<0.0005:tilasto['tarkka_k2']=tilasto.get('tarkka_k2',0)+1;return pol,t2,p2
    tilasto['tarkka_viipale']=tilasto.get('tarkka_viipale',0)+1;p3,t3=viipale(u);return p3,t3,1.0
# Koe8: pitkät raot talojen välissä ovat kahden vastakkaisen rinteen V-uria: talot ovat vierekkäin, mutta OSM:ssä seinillä ei ole samoja solmuja, joten reuna luultiin kadun puoleiseksi (rakot8-naapurit.py: 31 km rinnereunoista alle metrin päässä toisesta talosta). Naapuri = 1,5 m reunan ulkopuolella toisen talon sisällä vähintään 70 %:lla reunasta; yksittäiseksi naapuriksi vähintään 20 %.
RUUDUT={}
def ruudukko():
    for k_,t_ in enumerate(talot):
        for r_ in [t_['r']]+[q for q,_ in t_['reiat']]:
            for i in range(len(r_)):
                a,b=r_[i],r_[(i+1)%len(r_)];ns=int(math.dist(a,b)//10)+1
                for s_ in range(ns+1):
                    f=s_/ns;RUUDUT.setdefault((int((a[0]+(b[0]-a[0])*f)//10),int((a[1]+(b[1]-a[1])*f)//10)),set()).add((k_,))
def sijaintinaapurit(k,a,b):
    if not RUUDUT:ruudukko()
    l=math.dist(a,b) or 1e-6;ns=max(2,int(l));osu=0;laskut={};ox,oy=(b[1]-a[1])/l,-(b[0]-a[0])/l  # ulospäin: sama suunta kuin renkaan sisänormaalin vastakohta, myös reiällä
    for s_ in range(ns):
        f=(s_+.5)/ns;x,y=a[0]+(b[0]-a[0])*f+ox*1.5,a[1]+(b[1]-a[1])*f+oy*1.5;jb=None;nahty=set()
        for dx in(-1,0,1):
            for dy in(-1,0,1):
                for j,*_ in RUUDUT.get((int(x//10)+dx,int(y//10)+dy),()):
                    if j==k or j in nahty or jb is not None:continue
                    nahty.add(j)
                    if sisalla(talot[j]['r'],x,y) and not any(sisalla(q,x,y) for q,_h in talot[j]['reiat']):jb=j
        if jb is not None:osu+=1;laskut[jb]=laskut.get(jb,0)+1
    if osu<0.7*ns:return []
    tilasto['sijaintinaapuri']=tilasto.get('sijaintinaapuri',0)+1;tilasto['sijaintinaapuri_m']=tilasto.get('sijaintinaapuri_m',0)+round(l)
    return [j for j,c in laskut.items() if c>=0.2*ns]
def talo(k,T,V,I,sx,sz):
    # Maan ero palan sisällä, kaikki kärjet palan keskipisteestä. Naapurin katto vertailuun abs. korkeuksina: talot rinteessä peittävät toisiaan vain, jos ovat oikeasti yhtä korkealla.
    pohja=T['pohja'];h=T['h'];ylin=T['ylin'];w=int(pohja);vk=int(hashlib.md5(T['osm'].encode()).hexdigest()[:4],16);s=SEINA[vk%3];f=1+((vk>>4)%9-4)*0.012
    vari=lin(tuple(min(255,c*f) for c in s));kv=lin(tuple(min(255,c*(1+((vk>>8)%7-3)*0.015)) for c in KATTO))
    r0=[(x-sx,z-sz) for x,z in T['r']];A=abs(ala(r0));P=sum(math.dist(r0[i],r0[(i+1)%len(r0)]) for i in range(len(r0)));dm=min(2.2,0.35*2*A/P)
    on_koe=koe(T);V0_talo=len(V)
    if KVAIHE=='pohjat' and not on_koe:return
    ty=None
    def karki(x,y,z,n,v,lj,u,uw):
        V.append(struct.pack('<3f4b4B2e',x,y,z,max(-127,min(127,round(n[0]*127))),max(-127,min(127,round(n[1]*127))),max(-127,min(127,round(n[2]*127))),w,v[0],v[1],v[2],lj,min(u,4000.0),uw))
    def nelio(a,b,c,d,n,v,lj,uv):
        s0=len(V)
        for p,q in zip((a,b,c,d),uv):karki(*p,n,v,lj,*q)
        I.extend((s0,s0+1,s0+2,s0,s0+2,s0+3))
    renkaat=[(r0,T['avain'],False)]+[([(x-sx,z-sz) for x,z in q],hh[:-1],True) for q,hh in T['reiat']]
    sis=[];ok=True;kos=[]  # KS koe6: reunalla naapuri (nh2), katot.KOSKETUS
    for r,avain,reika in renkaat:
        n=len(r);nh=[];hn=[];nh2=[];hn2=[]
        for i in range(n):
            a,b=rk(avain[i]),rk(avain[(i+1)%n]);m=[j for j in reuna.get((min(a,b),max(a,b)),[]) if j!=k]
            # KK 6.11. 08.23, palat-v4: naapurin katto tämän palan korkeustasossa (palamaat voivat erota) ja naapurin oma korkeus seinän alarajaan.
            nh.append(max((talot[j]['ylin']+KERROIN*(palamaa[talot[j]['pala']]-palamaa[T['pala']]) for j in m),default=-1e9));hn.append(max((talot[j]['h'] for j in m),default=0.0))
            m2=sijaintinaapurit(k,(r[i][0]+sx,r[i][1]+sz),(r[(i+1)%n][0]+sx,r[(i+1)%n][1]+sz)) if on_koe else []
            nh2.append(max([nh[-1]]+[talot[j]['ylin']+KERROIN*(palamaa[talot[j]['pala']]-palamaa[T['pala']]) for j in m2]));hn2.append(max([hn[-1]]+[talot[j]['h'] for j in m2]))
        # KK 6.11. 08.23, palat-v4: katto saa olla reunassa suora vain, jos naapuri on yhtä korkea myös tasauksessa; muuten katon reunan (ylin + nousu) ja seinän väliin jää rako (sc-80).
        ds=[0.0 if min(nh2[i],pohja+hn2[i])>=ylin-2 else dm for i in range(n)]
        ring=[];ot=[]
        for i in range(n):
            a,b=r[i],r[(i+1)%n];l=math.dist(a,b) or 1e-6;t=((b[0]-a[0])/l,(b[1]-a[1])/l);ot.append((t,(-t[1],t[0])))
        for i in range(n):
            t0,n0=ot[i-1];t1,n1=ot[i];d0,d1=ds[i-1],ds[i];v=r[i];c=t0[0]*t1[1]-t0[1]*t1[0]
            if abs(c)<0.05:
                nn=(n0[0]+n1[0],n0[1]+n1[1]);ln=math.hypot(*nn) or 1;e=max(d0,d1);ring.append((v[0]+nn[0]/ln*e,v[1]+nn[1]/ln*e))
            else:
                ax,ay=v[0]+n0[0]*d0,v[1]+n0[1]*d0;bx,by=v[0]+n1[0]*d1,v[1]+n1[1]*d1;s_=((bx-ax)*t1[1]-(by-ay)*t1[0])/c
                px,py=ax+t0[0]*s_,ay+t0[1]*s_
                if math.hypot(px-v[0],py-v[1])>3*max(dm,0.01):px,py=v[0]+(n0[0]+n1[0])*0.5*max(d0,d1),v[1]+(n0[1]+n1[1])*0.5*max(d0,d1)
                ring.append((px,py))
        sis.append((r,ring,ds,nh,ot,hn));kos.append([x_>-1e8 for x_ in nh2])
        if reika and ala(ring)>=0:ok=False
        if not reika and ala(ring)<=A*0.15:ok=False
    if on_koe:
        km,kl=koe_muoto(T);nb=[[d_==0.0 for d_ in s_[2]] for s_ in sis];alk=[[tuple(p_) for p_ in s_[0]] for s_ in sis]
        if km=='harja':
            if len(alk)==1 and len(alk[0])==4 and not any(nb[0]):
                L=[math.dist(alk[0][i_],alk[0][(i_+1)%4]) for i_ in range(4)];lyh=0 if L[0]+L[2]<L[1]+L[3] else 1;nb[0][lyh]=True;nb[0][lyh+2]=True
            else:km='auma'
        nk=max(3.0,min(6.0,T['n'])) if km=='mansardi' else max(1.5,min(6.0,T['n']))
        avain_k=str(k)
        if KVAIHE=='pohjat':
            cx,cy=kesk(alk[0]);u_,d_,nb=(setattr(KT,'KOSKETUS',kos),KT.laajenna_kaikki([[(x_-cx,y_-cy) for x_,y_ in q_] for q_ in alk],nb,KD))[1]
            KPOHJAT.append(dict(osm=avain_k,o=T['osm'],c=[cx,cy],renkaat=u_,D=d_,muoto=km,lahde=kl,n=nk,nb=nb,tayte=[list(q_) for q_ in KT.TAYTE]));return
        nousu=0.0
    else:
        nousu=T['n'] if ok and dm>0.3 else 0.0
    # KK 6.11. 08.4x, palat-v5: jos katon kolmiointi jää vajaaksi (alle 98 %), tasakatto alkuperäisestä ääriviivasta ilman rinteitä. Muiden talojen verkko ennallaan.
    u=[s[1] if nousu>0 else s[0] for s in sis]
    pol=sillat(u[0],u[1:]) if len(u)>1 else u[0]
    tris=kolmiot(pol);pe=peitto(pol,tris)
    if len(u)>1:pe=min(pe,peitto_kuva(u,pol,tris))
    if on_koe:pol,tris,pe=tarkka(u)
    if pe<0.98:
        tilasto['tasakatto']+=1;tilasto['puuttuva_ala_ennen']+=(1-pe)*abs(ala(pol));nousu=0.0
        u=[s[0] for s in sis]
        if len(u)>1:pol,tris=viipale(u);pe=1.0
        else:
            pol=u[0];t2=kolmiot2(pol);p2=peitto(pol,t2);t1=kolmiot(pol);p1=peitto(pol,t1)
            tris,pe=(t2,p2) if abs(p2-1)<=abs(p1-1) else (t1,p1)
        if pe<0.98:tilasto['vajaa_edelleen']+=1;tilasto['puuttuva_ala_nyt']+=(1-pe)*abs(ala(pol))
        tasakatot.append((T['osm'],round(abs(ala(pol))),round(pe,3)))
    for r,ring,ds,nh,ot,hn in sis:
        n=len(r);alku=next((j for j in range(n) if nh[j]!=nh[j-1] or hn[j]!=hn[j-1] or abs(ot[j][0][0]*ot[j-1][0][1]-ot[j][0][1]*ot[j-1][0][0])>0.07),0)
        j=0
        while j<n:
            a=(alku+j)%n;m=1
            while j+m<n:
                b=(alku+j+m)%n;e=(b-1)%n
                if nh[b]==nh[a] and hn[b]==hn[a] and abs(ot[b][0][0]*ot[e][0][1]-ot[b][0][1]*ot[e][0][0])<0.07:m+=1
                else:break
            p0=r[a];p1=r[(a+m)%n];ala_y=max(pohja,min(nh[a],pohja+hn[a]));j+=m  # Tasauksessa naapurin katto putoaa korkeudelle pohja + h_n: seinä alkaa viimeistään siitä (sc-80:n läikkä, selvitys-yhteinen/seina-aukot.py).
            if ala_y>=ylin-0.2:tilasto['piilossa']+=1;continue
            pit=math.dist(p0,p1);l=pit or 1e-6;t=((p1[0]-p0[0])/l,(p1[1]-p0[1])/l);nor=(t[1],-t[0])
            nw=(nor[0],0.0,nor[1]);tilasto['seinia']+=1;u0=ala_y-pohja;u1=h
            nelio((p0[0],ala_y,p0[1]),(p0[0],ylin,p0[1]),(p1[0],ylin,p1[1]),(p1[0],ala_y,p1[1]),nw,vari,255,((0,u0),(0,u1),(pit,u1),(pit,u0)))
        if nousu>0:
            for i in range(n):
                if ds[i]<=0:continue
                a,b=r[i],r[(i+1)%n];c,d=ring[(i+1)%n],ring[i];tilasto['rinteita']+=1
                t,nn=ot[i];slope=math.hypot(ds[i],nousu);nx,nz=-nn[0]*nousu/slope,-nn[1]*nousu/slope;ny=ds[i]/slope
                pit=math.dist(a,b);nelio((a[0],ylin,a[1]),(d[0],ylin+nousu,d[1]),(c[0],ylin+nousu,c[1]),(b[0],ylin,b[1]),(nx,ny,nz),kv,128,((0,0),(0,slope),(pit,slope),(pit,0)))
    if on_koe:
        V0_=V0_talo
        kt=KTIETO[avain_k];ra=KRANKA.get(avain_k,{});cx,cy=kt['c'];nb=kt['nb'];km=kt['muoto'];tulos=None;syy='laajennus'
        if kt['renkaat'] and ra.get('kasvot'):
            kas=[dict(reuna=f_['reuna'],p=[[x_+cx,y_+cy,d_] for x_,y_,d_ in f_['p']]) for f_ in ra['kasvot']]
            pt=[(pol[a_],pol[b_],pol[c_]) for a_,b_,c_ in tris]
            if km!='tasa':
                if avain_k in KVALMIS:tulos,syy=KVALMIS[avain_k]
                else:
                    tulos=KT.katto(alk,nb,kas,km,kt['n'],pt,[[(x_+cx,y_+cy) for x_,y_ in q_] for q_ in kt.get('tayte',[])]);syy='katto'
                    Ap=abs(KT.ala(alk[0]))-sum(abs(KT.ala(q_)) for q_ in alk[1:])
                    if tulos and abs(tulos[2]-Ap)>max(0.5,0.005*Ap):syy='peitto';tulos=None
        elif ra.get('virhe'):syy='ranka'
        if km=='tasa':syy='tasa'
        # KS 9.11. palakoko: esikierros kerää päädyt absoluuttisina (naapurin pääty voi olla toisessa palassa), toinen kierros piirtää jaetuin kärjin.
        oab=(sx,sz,ylin+KERROIN*palamaa[T['pala']])
        if KERAA:
            KVALMIS[avain_k]=(tulos,syy)
            if tulos:
                for p_,q_,no_ in tulos[1]:KPH.lisaa(k,(p_[0]+oab[0],p_[1]+oab[1],p_[2]+oab[2]),(q_[0]+oab[0],q_[1]+oab[1],q_[2]+oab[2]))
            return
        if tulos:
            tilasto['luuranko_'+km]=tilasto.get('luuranko_'+km,0)+1
            pois=[0]
            def piilo(p_,q_):
                h_=KPH.piilossa(k,(p_[0]+oab[0],p_[1]+oab[1],p_[2]+oab[2]),(q_[0]+oab[0],q_[1]+oab[1],q_[2]+oab[2]));pois[0]+=h_;return h_
            Kk_,Tk_=KT.verkko(tulos,piilo);s0=len(V)
            for x_,y_,z_,nw_,lj_,uu_,vv_,se_ in Kk_:karki(x_,ylin+z_,y_,nw_,vari if se_ else kv,lj_,uu_,vv_)
            for a_,b_,c_ in Tk_:I.extend((s0+a_,s0+b_,s0+c_))
            ps_=sum(1 for q_ in Kk_ if q_[7]);KKARJET.append((T['osm'],km,sum(len(r_) for r_ in alk),len(ra['kasvot']),len(Kk_)-ps_,ps_,len(tulos[0])));tilasto['k_katto']=tilasto.get('k_katto',0)+len(Kk_)-ps_;tilasto['k_paaty']=tilasto.get('k_paaty',0)+ps_;tilasto['k_talo_alku']=tilasto.get('k_talo_alku',0)+s0-V0_
            tilasto['paatyja']=tilasto.get('paatyja',0)+len(tulos[1]);tilasto['paatyja_piilossa']=tilasto.get('paatyja_piilossa',0)+pois[0];return
        # varakatto: tasakatto ja 0,6 m reunus kadun puolelle
        tilasto['varakatto_'+syy]=tilasto.get('varakatto_'+syy,0)+1
        if syy!='tasa':KVARA.append((T['osm'],km,syy,ra.get('virhe')))
        for r_,nbr in zip(alk,nb):
            for i_ in range(len(r_)):
                if nbr[i_]:continue
                p0_,p1_=r_[i_],r_[(i_+1)%len(r_)];l_=math.dist(p0_,p1_) or 1e-6;t_=((p1_[0]-p0_[0])/l_,(p1_[1]-p0_[1])/l_)
                nelio((p0_[0],ylin,p0_[1]),(p0_[0],ylin+0.6,p0_[1]),(p1_[0],ylin+0.6,p1_[1]),(p1_[0],ylin,p1_[1]),(t_[1],0.0,-t_[0]),vari,255,((0,3.4),(0,3.4),(0,3.4),(0,3.4)))
    tilasto['tasa']+=len(tris);s0=len(V);y=ylin+nousu
    for x,z in pol:karki(x,y,z,(0,1,0),kv,0,0.0,0.0)
    for a,b,c in tris:I.extend((s0+a,s0+c,s0+b))
# --- Lontoo: puut palojen verkkoon (kohta D) ---
PV=os.environ.get('LONTOO_PUUT');puutP={};PV_T=(1+5**.5)/2
IK=[(-1,PV_T,0),(1,PV_T,0),(-1,-PV_T,0),(1,-PV_T,0),(0,-1,PV_T),(0,1,PV_T),(0,-1,-PV_T),(0,1,-PV_T),(PV_T,0,-1),(PV_T,0,1),(-PV_T,0,-1),(-PV_T,0,1)]
IK=[tuple(c/math.hypot(*v) for c in v) for v in IK]
IKT=[(0,11,5),(0,5,1),(0,1,7),(0,7,10),(0,10,11),(1,5,9),(5,11,4),(11,10,2),(10,7,6),(7,1,8),(3,9,4),(3,4,2),(3,2,6),(3,6,8),(3,8,9),(4,9,5),(2,4,11),(6,2,10),(8,6,7),(9,8,1)]
PVARI=[(120,122,70),(108,114,66),(134,130,76),(114,110,62)];RUNKO=(96,78,58)
if PV:
    for q in json.load(open(PV)):
        if LA0<=q[0]<=LA1 and LO0<=q[1]<=LO1:puutP.setdefault((int(tx(q[1])),int(ty(q[0]))),[]).append((q[0],q[1]))
    for pk,pp in puutP.items():
        if pk not in palat:
            palat[pk]=[];mm=sorted(maapinta(*p) for p in pp);palamaa[pk]=mm[len(mm)//2]
def puut_palaan(pk,V,I,sx,sz):
    for la,lo in puutP.get(pk,[]):
        s=int(hashlib.md5(f'{la:.7f}{lo:.7f}'.encode()).hexdigest()[:8],16);x,z=xy(la,lo);x-=sx;z-=sz
        pohja=max(-127.0,min(127.0,round((maapinta(la,lo)-palamaa[pk])*KERROIN)));w=int(pohja)
        r=4.5+(s%100)/100*3.0;h=12.0+((s>>8)%100)/100*6.0;v=lin(PVARI[(s>>16)%4]);ky=pohja+h-r*0.9;kulma=((s>>20)%360)*math.pi/180;c,sn=math.cos(kulma),math.sin(kulma)
        def kk(px,py,pz,n,vv):V.append(struct.pack('<3f4b4B2e',px,py,pz,round(n[0]*127),round(n[1]*127),round(n[2]*127),w,vv[0],vv[1],vv[2],0,0.0,0.0))
        s0=len(V)
        for a,b,e in IK:
            ax,az=a*c-e*sn,a*sn+e*c;kk(x+ax*r,ky+b*r*0.9,z+az*r,(ax,b,az),v)
        for a,b,e in IKT:I.extend((s0+a,s0+b,s0+e))
        s0=len(V);rv=lin(RUNKO)
        for i in range(3):
            ka=kulma+i*2.094;kk(x+math.cos(ka)*0.6,pohja,z+math.sin(ka)*0.6,(math.cos(ka),0,math.sin(ka)),rv)
            kk(x+math.cos(ka)*0.4,ky,z+math.sin(ka)*0.4,(math.cos(ka),0,math.sin(ka)),rv)
        for i in range(3):
            a,b=i*2,((i+1)%3)*2;I.extend((s0+a,s0+a+1,s0+b+1,s0+a,s0+b+1,s0+b))
KVARA=[]
indeksi=[];yht=0;suurin=0;nK=nT=0
KERAA=False;KVALMIS={};KPH=KT.Paatyhaku();KKARJET=[]
if KVAIHE:
    kpalat={T['pala'] for T in talot if koe(T)}
    if KVAIHE=='rakenna' and KLISA:kpalat.add(KLISA)
    palat={pk:kk for pk,kk in palat.items() if pk in kpalat};print('koealueen palat',len(palat),flush=True)
if KVAIHE=='rakenna':
    KERAA=True;_ts=dict(tilasto)  # esikierros ei kasvata mittareita
    for pk,kk in sorted(palat.items()):
        if pk==KLISA:continue
        px,py=pk;sx,sz=xy(lat(py+0.5),lon(px+0.5))
        for k in kk:
            if koe(talot[k]):talo(k,talot[k],[],[],sx,sz)
    KERAA=False;tilasto.clear();tilasto.update(_ts);print('esikierros',len(KVALMIS),flush=True)
for n,(pk,kk) in enumerate(sorted(palat.items())):
    px,py=pk;lak=lat(py+0.5);lok=lon(px+0.5);sx,sz=xy(lak,lok);V=[];I=[];e=(1e9,-1e9,1e9,-1e9)
    if KVAIHE and pk==KLISA:
        KV=KVAIHE;KVAIHE=None
        for k in kk:talo(k,talot[k],V,I,sx,sz)
        KVAIHE=KV
    else:
        for k in kk:talo(k,talot[k],V,I,sx,sz)
    if KVAIHE=='pohjat':continue
    puut_palaan(pk,V,I,sx,sz)
    data=b'MT02'+struct.pack('<IIddd',len(V),len(I),lak,lok,palamaa[pk])+b''.join(V)+struct.pack(f'<{len(I)}I',*I)
    nimi=f'15_{px}_{py}.bytes';tmp=UL+'/'+nimi+'.tmp';open(tmp,'wb').write(data);os.replace(tmp,UL+'/'+nimi)
    indeksi.append(f'{px} {py} {len(data)}');yht+=len(data);suurin=max(suurin,len(data));nK+=len(V);nT+=len(I)//3
    if n%20==0:print(n,'/',len(palat),yht//1048576,'Mt',flush=True)
if KVAIHE=='pohjat':
    json.dump(KPOHJAT,open(os.environ['KATOT_POHJAT'],'w'));print('KATOT pohjat',len(KPOHJAT),'laajennus epäonnistui',sum(1 for q in KPOHJAT if not q['renkaat']),flush=True);sys.exit(0)
if KVAIHE:
    vanha={}
    for rv in open(UL+'/indeksi.txt').read().split('\n'):
        if rv.strip():a_,b_,c_=rv.split();vanha[(int(a_),int(b_))]=int(c_)
    for rv in indeksi:a_,b_,c_=rv.split();vanha[(int(a_),int(b_))]=int(c_)
    indeksi=[f'{a_} {b_} {c_}' for (a_,b_),c_ in sorted(vanha.items())]
    json.dump(KVARA,open(UL+'.varakatot.json','w'),ensure_ascii=False)
    json.dump(KKARJET,open(UL+'.kattokarjet.json','w'))
    import pickle;pickle.dump({talot[int(k_)]['osm']:(v_[0],v_[1],KTIETO[k_]['muoto']) for k_,v_ in KVALMIS.items()},open(UL+'.katot.pickle','wb'))
open(UL+'/indeksi.txt','w').write('\n'.join(indeksi)+'\n')
m=dict(taloja=len(talot),paloja=len(palat),yhteensa_Mt=yht//1048576,suurin_pala_Mt=round(suurin/1048576,1),keski_Mt=round(yht/len(palat)/1048576,1),karkia=nK,kolmioita=nT,korkeuslahde=lahde,poissa=poissa,alueilla={m_['nimi']:m_['pois'] for m_ in maskit},maa=(min(palamaa.values()),max(palamaa.values())),**tilasto)
print(json.dumps(m,ensure_ascii=False));json.dump(m,open(UL+'.mittarit.json','w'),ensure_ascii=False)
json.dump(dict(korkeus=muutokset,tasakatot=tasakatot),open(UL+'.muutokset.json','w'),ensure_ascii=False)
