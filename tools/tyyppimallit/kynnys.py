"""KK 23.25 työ A: kynnyskuva. Kaistan 1,10–1,25 kirkot ylhäältä: OSM-pohja (punainen ääriviiva), naapuritalot (harmaa) ja tyyppimalli sovitettuna
kahdella tavalla: VENYTETTY (malli pohjan pituuteen ja leveyteen) ja LUONNOLLINEN (mittasuhde säilyy, mahtuu pohjan sisään).
python3 -I kynnys.py <ote-kansio> <merkit.json> <obj-kansio> <ulos.jpg> osm1 osm2 ..."""
import gzip, json, math, sys
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, '.')
import tyypitys as T
ote, merkit, objk, ulos, *ids = sys.argv[1:]
meta = json.load(open(f'{ote}/ote.json')); d = json.load(gzip.open(f'{ote}/osm.json.gz'))
P = T.projektori(meta['lat'], meta['lon'])
M = {m['osm']: m for m in json.load(open(merkit))['merkit']}

def lue_obj(nimi):
    v, f = [], []
    for r in open(f'{objk}/{nimi}.obj'):
        o = r.split()
        if not o: continue
        if o[0] == 'v': v.append(tuple(map(float, o[1:7])))
        elif o[0] == 'f': f.append(tuple(int(i) - 1 for i in o[1:4]))
    return v, f

S, R = 440, 70.0       # paneelin koko px, puolileveys metreinä
def paneeli(m, tapa):
    im = Image.new('RGB', (S, S), (238, 234, 224)); dr = ImageDraw.Draw(im)
    lat, lon = m['keski']; cx, cy = P(lat, lon)
    k = S / (2 * R)
    px = lambda x, y: (S / 2 + (x - cx) * k, S / 2 - (y - cy) * k)
    # naapurit
    for w in d['ways']:
        if 'p' not in w or not w.get('t', {}).get('building') or w['osm'] == m['osm']: continue
        la, lo = w['p'][0]
        if abs(la - lat) > 0.0009 or abs(lo - lon) > 0.0013: continue
        dr.polygon([px(*P(a, b)) for a, b in w['p']], fill=(206, 200, 188), outline=(170, 162, 150))
    pohja = [(cx + x, cy + y) for x, y in m['pohja']]
    dr.polygon([px(*q) for q in pohja], fill=(226, 214, 200))
    # malli: OBJ x = pitkä akseli (torni −x = länsi), OBJ −z = leveys
    v, f = lue_obj(f"kirkko-{m['koko']}")
    xs = [p[0] for p in v]; zs = [p[2] for p in v]
    L, W = max(xs) - min(xs), max(zs) - min(zs); mx, mz = (max(xs) + min(xs)) / 2, (max(zs) + min(zs)) / 2
    if tapa == 'venytetty': sx, sz = m['pituus'] / L, m['leveys'] / W
    else: sx = sz = min(m['pituus'] / L, m['leveys'] / W)
    a = math.radians(m['akseli']); ux, uy = math.sin(a), math.cos(a)     # akselin suunta (0 = pohjoinen)
    lp = m['lansipaa']
    if lp[0] * ux + lp[1] * uy > 0: ux, uy = -ux, -uy                     # +x osoittaa itään (pois länsipäästä)
    vx, vy = -uy, ux
    def tp(p):
        x, z = (p[0] - mx) * sx, (p[2] - mz) * sz
        return px(cx + x * ux + z * vx, cy + x * uy + z * vy)
    for t in sorted(f, key=lambda t: max(v[i][1] for i in t)):
        c = tuple(int(255 * sum(v[i][3 + j] for i in t) / 3) for j in range(3))
        dr.polygon([tp(v[i]) for i in t], fill=c)
    dr.line([px(*q) for q in pohja + pohja[:1]], fill=(200, 40, 30), width=3)
    # mittakaava 20 m
    dr.line([(12, S - 14), (12 + 20 * k, S - 14)], fill=(40, 34, 28), width=3); dr.text((14, S - 34), '20 m', fill=(40, 34, 28), font=F(14))
    dr.text((10, 8), 'VENYTETTY pohjaan' if tapa == 'venytetty' else f'LUONNOLLINEN (mittakaava {sx:.2f})', fill=(40, 34, 28), font=FB(16))
    if tapa == 'venytetty': dr.text((10, 28), f'pituus × {sx:.2f}, leveys × {sz:.2f}', fill=(80, 70, 60), font=F(14))
    return im

F = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
FB = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
v_, otsikko = 10, 50
sar = 2   # kirkkoa per rivi
W_ = v_ + sar * (2 * S + v_ * 3); H_ = 74 + math.ceil(len(ids) / sar) * (otsikko + S + v_) + 26
a = Image.new('RGB', (W_, H_), (245, 240, 228)); dr = ImageDraw.Draw(a)
dr.text((v_, 10), 'KYNNYSKUVA: kirkot sivusuhteella 1,10–1,25 ylhäältä (Valoseppä 14.11.2026, KK 23.25 työ A)', fill=(40, 34, 28), font=FB(24))
dr.text((v_, 42), 'Punainen = OSM-pohja (vaalea sisus = tyhjäksi jäävä ala), harmaa = naapuritalot. Malli kirkko-keski (46 × 18 m laiva), torni länteen. Nyt kynnys 1,25 → kaikki nämä ovat "ei sovi" (perustalo jää).', fill=(70, 62, 52), font=F(16))
for i, o in enumerate(ids):
    m = M[o]; x0 = v_ + (i % sar) * (2 * S + v_ * 3); y0 = 74 + (i // sar) * (otsikko + S + v_)
    dr.text((x0, y0 + 4), f"{m['nimi']}  ({o})", fill=(40, 34, 28), font=FB(18))
    dr.text((x0, y0 + 26), f"ala {m['ala']} m², pohja {m['pituus']:.0f} × {m['leveys']:.0f} m, sivusuhde {m['sivusuhde']:.2f}", fill=(80, 70, 60), font=F(15))
    for j, tapa in enumerate(('venytetty', 'luonnollinen')): a.paste(paneeli(m, tapa), (x0 + j * (S + v_), y0 + otsikko))
dr.text((v_, H_ - 22), 'Lähde: _tyo/valoseppa/tyyppitalot/kynnys.py; OSM-ote KS otteet-63/pariisi; malli oma/Tyyppimallit.cs (OBJ, valo leivottu kärkiväreihin).', fill=(110, 100, 90), font=F(13))
a.save(ulos, quality=88); print(ulos, a.size)
