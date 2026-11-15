"""Kierros 5 arkki KK:lle (KK 15.11. 06.20 B): Nyt | Uusi -parit (JU:n ajo valoseppa-tyyppimallit5-pariisi) + asemien pohjat ja uudet hallit.
python3 -I arkki5.py"""
import json, os, sys, glob
from PIL import Image, ImageDraw, ImageFont
TY = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, TY)
import hallit, testi_hallit as T
L = '/Users/Shared/Claude/proto-3d/lokit'; AJO = sys.argv[1] if len(sys.argv) > 1 else f'{L}/valoseppa-tyyppimallit5b-pariisi'; ULOS = f'{L}/valoseppa-tyyppimallit5-koonti'
os.makedirs(ULOS, exist_ok=True)
F = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
FB = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)

def pohjat():
    """Asemien OSM-pohja (harmaa), naapuritalot (vaalea) ja uudet hallit + julkisivu (sininen/ruskea) pelin tiedostosta."""
    lat0, lon0, M = T.lue(f'{TY}/tulos/vienti/merkit-pariisi-kartta.bytes'); enu = T.enu_f(lat0, lon0)
    d = json.load(open(T.TALOT['pariisi'])); by = {e['osm']: e for e in d['ways'] + d['rel']}
    tulos = {t['osm']: t for t in json.load(open(f'{TY}/tulos/testi-hallit.json'))['kaupungit']['pariisi']}
    asemat = [m for m in M if m['rivi'][0] == 7]
    S, R = 2.0, 190  # px/m, säde m
    s = S / 2.0; w = int(2 * R * s)
    koko = Image.new('RGB', (len(asemat) * w, w + 60), 'white')
    for i, m in enumerate(asemat):
        im = Image.new('RGB', (w, w + 60), 'white'); dr = ImageDraw.Draw(im)
        ox, oy = w / 2, 60 + w / 2
        P = lambda e, n: (ox + (e - m['x']) * s, oy - (n - m['z']) * s)
        for o, e in by.items():
            rr = [e['p']] if 'p' in e else [j['p'] for j in e.get('j', []) if j.get('rooli') != 'inner']
            for r in rr:
                q = [enu(*p) for p in r]
                if not q or abs(q[0][0] - m['x']) > R + 100 or abs(q[0][1] - m['z']) > R + 100: continue
                dr.polygon([P(*p) for p in q], fill=(150, 150, 150) if o == m['osm'] else (225, 222, 214), outline=(120, 120, 120))
        for j, (a, b, c, d_) in enumerate(T.laatikot(m['rivi'], False)):
            nurkat = [hallit.maailmaan(m['akseli'], x, z) for x, z in ((a, c), (b, c), (b, d_), (a, d_))]
            jul = j == len(T.laatikot(m['rivi'], False)) - 1 and (m['rivi'][1] >> 3)
            dr.polygon([P(m['x'] + e, m['z'] + n) for e, n in nurkat], outline=(150, 80, 30) if jul else (30, 80, 200), width=3)
        dr.rectangle([0, 0, w - 1, 52], fill='white'); dr.rectangle([0, 0, w - 1, w + 59], outline=(200, 200, 200))
        t = tulos.get(m['osm'], {})
        dr.text((8, 6), f"{m['osm']}", fill='black', font=FB(16))
        dr.text((8, 30), f"naapurit alla: uusi {t.get('ala', 0):.0f} m², vanha {t.get('vanha_ala') or 0:.0f} m²", fill='black', font=F(14))
        koko.paste(im, (i * w, 0))
    koko.save(f'{ULOS}/asemat-pohjat-uudet-hallit.png'); return koko

def parit():
    nyt = sorted(glob.glob(f'{AJO}/p*-nyt.png'), key=lambda p: int(os.path.basename(p)[1:].split('-')[0]))
    if not nyt: print('ei kuvia', AJO); return
    rivit = []
    for p in nyt:
        u = p.replace('-nyt.png', '-uusi.png')
        a = Image.open(p).convert('RGB'); b = Image.open(u).convert('RGB') if os.path.exists(u) else Image.new('RGB', a.size, 'gray')
        k = 900 / a.width; a = a.resize((900, int(a.height * k))); b = b.resize((900, int(b.height * k)))
        rivit.append((os.path.basename(p).split('-')[0], a, b))
    H = sum(a.height + 40 for _, a, _ in rivit) + 70
    im = Image.new('RGB', (1820, H), (246, 242, 234)); dr = ImageDraw.Draw(im)
    dr.text((10, 14), 'Kierros 5 (VS 15.11.): KK 06.20 B hallit pohjan sisään + KS poisOsm-palat. Vasen NYT (nykyiset talot), oikea UUSI. EI JUNAAN', fill=(40, 34, 28), font=FB(24))
    y = 70
    for t, a, b in rivit:
        dr.text((10, y + 8), f'{t}  NYT', fill='black', font=FB(20)); dr.text((930, y + 8), f'{t}  UUSI', fill='black', font=FB(20))
        im.paste(a, (10, y + 40)); im.paste(b, (920, y + 40)); y += a.height + 40
    im.save(f'{ULOS}/tyyppimallit5-nyt-uusi.jpg', quality=88)

pohjat(); parit(); print(ULOS)
