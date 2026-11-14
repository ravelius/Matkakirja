"""KK 14.11. 23.40 D: palatsit ylhäältä. OSM-pohja (punainen), naapurit (harmaa), malli TyyppiPalatsiPiha parametreilla (piha, julkisivu, avoin sivu),
siipien peitto ja pääjulkisivun nuoli. Malli: Luonnos.dll <obj> piha2-<osm> palatsi-piha L W julkisivu avoin (ajetaan tässä).
python3 -I palatsikuva.py <ote-kansio> <merkit.json> <obj-kansio> <ulos.jpg> [osm ...]  (tyhjä = kaikki nimilistan palatsit)"""
import gzip, json, math, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tyypitys as T
ote, merkit, objk, ulos, *ids = sys.argv[1:]
DN = '/Applications/Unity/Hub/Editor/6000.3.24f1/Unity.app/Contents/Resources/Scripting/NetCoreRuntime/dotnet'
meta = json.load(open(f'{ote}/ote.json')); d = json.load(gzip.open(f'{ote}/osm.json.gz'))
P = T.projektori(meta['lat'], meta['lon'])
M = [m for m in json.load(open(merkit))['merkit'] if m['tyyppi'] == 'palatsi' and m['saanto'].startswith('nimilista')]
if ids: M = [m for m in M if m['osm'] in ids]
F = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
FB = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
renk = {w['osm']: ([w['p']] if 'p' in w else T.renkaat_rel(w)) for w in d['ways'] + d['rel'] if w['osm'] in {m['osm'] for m in M}}
sisa = {w['osm']: T.renkaat_sisa(w) for w in d['rel'] if w['osm'] in {m['osm'] for m in M}}

def lue_obj(nimi):
    v, f = [], []
    for r in open(f'{objk}/{nimi}.obj'):
        o = r.split()
        if o and o[0] == 'v': v.append(tuple(map(float, o[1:7])))
        elif o and o[0] == 'f': f.append(tuple(int(i) - 1 for i in o[1:4]))
    return v, f

S = 430
def paneeli(m):
    pa = m['parametrit'] or {}
    nimi = 'piha2-' + m['osm'].replace('/', '-')
    subprocess.run([DN, 'rakennus/Luonnos.dll', objk, nimi, 'palatsi-piha', str(m['pituus']), str(m['leveys']), pa.get('julkisivu', '+z'), pa.get('avoin_sivu') or ''],
                   check=True, capture_output=True)
    R = max(m['pituus'], m['leveys']) * 0.68
    im = Image.new('RGB', (S, S), (238, 234, 224)); dr = ImageDraw.Draw(im)
    lat, lon = m['keski']; cx, cy = P(lat, lon); k = S / (2 * R)
    px = lambda x, y: (S / 2 + (x - cx) * k, S / 2 - (y - cy) * k)
    for w in d['ways']:
        if 'p' not in w or not w.get('t', {}).get('building') or w['osm'] == m['osm']: continue
        la, lo = w['p'][0]
        if abs(la - lat) > R / 111000 * 1.3 or abs(lo - lon) > R / 73000 * 1.3: continue
        dr.polygon([px(*P(a, b)) for a, b in w['p']], fill=(206, 200, 188), outline=(170, 162, 150))
    rs = [[P(a, b) for a, b in r] for r in renk[m['osm']]]
    for q in rs: dr.polygon([px(*p) for p in q], fill=(226, 214, 200))
    ss = [[P(a, b) for a, b in r] for r in sisa.get(m['osm'], [])]
    for q in ss: dr.polygon([px(*p) for p in q], fill=(238, 234, 224))
    if not m['ei_sovi']:
        v, f = lue_obj(nimi)
        def tp(p):
            e, n = T.mallista_maailmaan(m['akseli'], p[0], -p[2])     # OBJ z = −Unity z
            return px(cx + e, cy + n)
        for t in sorted(f, key=lambda t: max(v[i][1] for i in t)):
            c = tuple(int(255 * sum(v[i][3 + j] for i in t) / 3) for j in range(3))
            dr.polygon([tp(v[i]) for i in t], fill=c)
    for q in rs + ss: dr.line([px(*p) for p in q + q[:1]], fill=(200, 40, 30), width=3)
    # pääjulkisivun nuoli (ilmansuunta käsin) ja siipien peitto
    if pa.get('julkisivu_suunta') in T.ILMANSUUNNAT:
        b = math.radians(T.ILMANSUUNNAT[pa['julkisivu_suunta']]); ex, ny = math.sin(b), math.cos(b)
        a0 = (S / 2 + ex * S * 0.30, S / 2 - ny * S * 0.30); a1 = (S / 2 + ex * S * 0.45, S / 2 - ny * S * 0.45)
        dr.line([a0, a1], fill=(30, 90, 200), width=5); dr.ellipse([a1[0] - 7, a1[1] - 7, a1[0] + 7, a1[1] + 7], fill=(30, 90, 200))
    for sivu, fr in (pa.get('siipien_peitto') or {}).items():
        x, z = {'+x': (m['pituus'] / 2 - 8, 0), '-x': (-m['pituus'] / 2 + 8, 0), '+z': (0, m['leveys'] / 2 - 8), '-z': (0, -m['leveys'] / 2 + 8)}[sivu]
        e, n = T.mallista_maailmaan(m['akseli'], x, z); q = px(cx + e, cy + n)
        auki = fr < T.PALATSI['siipi_min_peitto']
        dr.rectangle([q[0] - 21, q[1] - 10, q[0] + 21, q[1] + 10], fill=(200, 40, 30) if auki else (255, 255, 255), outline=(60, 50, 40))
        dr.text((q[0] - 18, q[1] - 8), f'{int(fr * 100)} %', fill=(255, 255, 255) if auki else (40, 34, 28), font=FB(13))
    dr.line([(12, S - 14), (12 + 20 * k, S - 14)], fill=(40, 34, 28), width=3); dr.text((14, S - 32), '20 m', fill=(40, 34, 28), font=F(13))
    dr.text((S - 22, 6), 'N', fill=(40, 34, 28), font=FB(16)); dr.line([(S - 16, 26), (S - 16, 46)], fill=(40, 34, 28), width=2)
    return im

sar, v_ = 4, 10
W_ = v_ + sar * (S + v_); H_ = 86 + math.ceil(len(M) / sar) * (S + 74) + 30
a = Image.new('RGB', (W_, H_), (245, 240, 228)); dr = ImageDraw.Draw(a)
dr.text((v_, 10), 'PALATSIT ylhäältä: umpipiha ja U-palatsi (Valoseppä 15.11.2026, KK 14.11. 23.40 D)', fill=(40, 34, 28), font=FB(24))
dr.text((v_, 42), 'Punainen = OSM-pohja, harmaa = naapurit, sininen nuoli = pääjulkisivu (ilmansuunta käsin). Laatikko = siiven osuus OSM-pohjan päällä; punainen = alle 50 % → siipi pois (U).', fill=(70, 62, 52), font=F(16))
dr.text((v_, 62), 'Kaksi avointa sivua → ei sovi. Lyhyt sivu alle 41,6 m → tanko. Malli mittakaavassa 1; akseli seinien suunnasta, reunan uloke (< 20 % pohjaa) rajataan pois.', fill=(70, 62, 52), font=F(16))
for i, m in enumerate(M):
    x0 = v_ + (i % sar) * (S + v_); y0 = 86 + (i // sar) * (S + 74); pa = m['parametrit'] or {}
    dr.text((x0, y0 + 2), m['nimi'][:40] or m['osm'], fill=(40, 34, 28), font=FB(17))
    tila = ('EI SOVI: ' + m['ei_sovi'][:34]) if m['ei_sovi'] else (('U, avoin ' + pa['avoin_sivu']) if pa.get('avoin_sivu') else ('umpipiha' if pa.get('piha') else 'tanko (kapea)'))
    if pa.get('rajattu'): tila += ' · rajattu ' + ', '.join(f'{k} {v:.0f} m' for k, v in pa['rajattu'].items())
    dr.text((x0, y0 + 24), f"{m['pituus']:.0f} × {m['leveys']:.0f} m · {tila}", fill=(200, 40, 30) if m['ei_sovi'] else (60, 52, 44), font=F(14))
    dr.text((x0, y0 + 44), f"julkisivu {pa.get('julkisivu_suunta') or '–'} ({pa.get('katu', '')[:38]})", fill=(80, 70, 60), font=F(13))
    a.paste(paneeli(m), (x0, y0 + 64))
dr.text((v_, H_ - 24), 'Lähde: _tyo/valoseppa/tyyppitalot/palatsikuva.py + tyypitys.py (palatsin_sovitus); OSM-ote KS otteet-63; malli oma/Tyyppimallit.cs TyyppiPalatsiPiha.', fill=(110, 100, 90), font=F(13))
a.save(ulos, quality=88); print(ulos, a.size)
