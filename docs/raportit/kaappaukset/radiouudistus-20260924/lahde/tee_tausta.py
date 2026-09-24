# Hämärä (0,18/0,17/0,24) + Black Marble -yövalot projisoituna kallistettuun näkymään + bloom; mastojen paikat.
import json, math, collections, sys
from PIL import Image, ImageFilter, ImageChops
sys.path.insert(0, 'bm')
from proj import Kamera, v, dot
k = Kamera(47, 6, 2600000, 40)
W, H = 1024, 1366
paiva = Image.open('kuvat/kall-paiva.png').convert('RGB')
from PIL import ImageDraw
def paikka(im, lahde, kohde, koko, sade=16):
    w, h = koko; pala = im.crop((lahde[0], lahde[1], lahde[0]+w, lahde[1]+h))
    m = Image.new('L', koko, 0); ImageDraw.Draw(m).rectangle((sade, sade, w-sade, h-sade), fill=255); m = m.filter(ImageFilter.GaussianBlur(sade/2))
    im.paste(pala, kohde, m)
paikka(paiva, (200, 1135), (440, 1135), (150, 75))      # Liiku
paikka(paiva, (640, 1240), (10, 1240), (300, 80))       # maan nimi
def lut(m, a): return [int(max(0, min(1, ((i/255)**2.2*m+a)**(1/2.2)))*255+.5) for i in range(256)]
hamara = paiva.point(lut(0.18, 0.006)+lut(0.17, 0.006)+lut(0.24, 0.016))
hamara.paste(paiva.crop((0, 0, W, 62)), (0, 0))
bm = Image.open('bm/VIIRS_Black_Marble.png').convert('RGB'); BW, BH = bm.size; bp = bm.load()
LAT1, LAT0, LON0, LON1 = 78, 20, -35, 50
VALITTU = (48.86, 2.35); vv = v(*VALITTU)
def smooth(e0, e1, x):
    t = max(0, min(1, (x-e0)/(e1-e0))); return t*t*(3-2*t)
valo = Image.new('RGB', (W, H)); vp = valo.load()
PERUS = 0.5
for py in range(62, H):
    for px in range(W):
        ll = k.maa(px+0.5, py+0.5)
        if ll is None: continue
        lat, lon = ll
        if not (LAT0 <= lat < LAT1 and LON0 <= lon < LON1): continue
        r, g, b = bp[int((lon-LON0)/(LON1-LON0)*BW), int((LAT1-lat)/(LAT1-LAT0)*BH)]
        # Vain valot: lämmin ja kirkas (kuunvalaistu maa on sinertävää, lumi harmaata).
        w = max(0, min(1, (r-48)/170)) * max(0, min(1, (r-b+10)/40))
        if w <= 0: continue
        dkm = math.acos(max(-1, min(1, dot(v(lat, lon), vv))))*6371
        m = PERUS + (1-PERUS)*smooth(230, 60, dkm)
        s = w*m*0.85
        vp[px, py] = (int(255*min(1, s*1.05)), int(255*min(1, s*0.82)), int(255*min(1, s*0.52)))
# Bloom: ydin + kaksi pehmeää halokerrosta (säde ~2× edellinen kuva)
halo1 = valo.filter(ImageFilter.GaussianBlur(4)).point(lambda x: min(255, int(x*1.4)))
halo2 = valo.filter(ImageFilter.GaussianBlur(14)).point(lambda x: min(255, int(x*1.9)))
tulos = ImageChops.add(ImageChops.add(ImageChops.add(hamara, halo2), halo1), valo)
# Kortin alue (pelin nimikortti) peitetään selitelaatikolla HTML:ssä.
tulos.save('kuvat/kall-hamara2.png'); valo.save('kuvat/valot.png')
# Mastot: radiokaupunki per maa (aloitus/tärkein), koko asukasluvusta.
K = json.load(open('/Users/Shared/Claude/sisalto-koe/v49/kokoelmat/kaupungit.json'))['alkiot']
R = json.load(open('/Users/Shared/Claude/sisalto-koe/v49/kokoelmat/radiot.json'))['alkiot']
per = collections.defaultdict(list)
for c in K: per[c['maa']].append(c)
out = []
for m in sorted({r['iso3'] for r in R}):
    if m not in per: continue
    c = max(per[m], key=lambda c: (c.get('aloitus', False), c['tarkeys'], c.get('asukkaat') or 0))
    if m == 'FRA': c = next(x for x in per[m] if x['id'] == 'pariisi')
    a = c.get('asukkaat'); alue = c.get('asukkaatAlue')
    koko = 'pieni' if a is None or alue else 'iso' if a >= 3e6 else 'keski' if a >= 5e5 else 'pieni'
    if dot(v(c['lat'], c['lon']), k.f) > -0.05: continue  # pallon takana
    x, y = k.ruutu(c['lat'], c['lon'])
    if not (-20 < x < W+20 and 330 < y < H-150): continue
    p = [q*6371000 for q in v(c['lat'], c['lon'])]
    d = math.sqrt(sum((a1-b1)**2 for a1, b1 in zip(p, k.silma)))
    out.append({'nimi': c['nimi'], 'x': round(x, 1), 'y': round(y, 1), 'koko': koko, 'mk': round(2600000*1.35/d, 3), 'asukkaat': a})
json.dump(out, open('kuvat/mastot.json', 'w'), ensure_ascii=False, indent=0)
print(len(out), [(o['nimi'], o['koko'], o['mk']) for o in out])
