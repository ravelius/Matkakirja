"""Kattavuuskuva (KK 15.11. 07.25 kohta 1): jokaisen aseman OSM-pohja (harmaa), hallit (sininen, puolikkaat vaaleampi), julkisivu (oranssi),
kattamaton pohja (punainen); vasen = kierros 5 (ennen), oikea = puolikkaat (jälkeen). python3 -I kattavuus-kuva.py <ulos.png>"""
import json, sys, os
from PIL import Image, ImageDraw, ImageFont
TY = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, TY)
import hallit

def piirra(m, r, S=1.0, koko=300):
    hs, jul = hallit.pura(r['pituus'], r['leveys'], r['a'], r['b'], r['c'], r['p3_bitit'], r['varattu'], r['jatko'])
    cx, cz = hallit.paikallinen(r['akseli'], *r['siirto'])
    Q = [[(x - cx, z - cz) for x, z in (hallit.paikallinen(r['akseli'], e, n) for e, n in rr)] for rr in hallit.renkaat(m)]
    R = max(max(abs(x), abs(z)) for q in Q for x, z in q) * 1.05; s = koko / (2 * R)
    P = lambda x, z: (koko / 2 + x * s, koko / 2 - z * s)
    im = Image.new('RGB', (koko, koko), (250, 250, 248)); d = ImageDraw.Draw(im)
    for q in Q: d.polygon([P(x, z) for x, z in q], fill=(220, 80, 70))
    for z0, z1, x0, x1, j in hs:
        puoli = abs((z1 - z0) - r['leveys'] / r['halleja']) > 0.01
        a, b = P(x0, z1), P(x1, z0); d.rectangle([a, b], fill=(140, 180, 230) if puoli else (60, 110, 190), outline=(20, 40, 80))
    if jul:
        a, b = P(jul[0], jul[3]), P(jul[1], jul[2]); d.rectangle([a, b], fill=(235, 160, 60), outline=(90, 50, 0))
    for q in Q: d.line([P(x, z) for x, z in q + q[:1]], fill=(40, 40, 40), width=1)
    return im

def main(ulos):
    rivit = []
    for k in ('pariisi', 'lontoo'):
        v = json.load(open(os.path.join(TY, 'tulos', f'vienti-{k}.json')))
        ms = {m['osm']: m for m in json.load(open(os.path.join(TY, 'tulos', f'merkit-{k}.json')))['merkit']}
        for s in v['asemat']:
            m = ms[s['osm']]
            import math
            WA = 6378137.0
            # sama kohti-suunta kuin vie.py: merkin paikka origosta (vienti 'asemat' ei tallenna sitä, lasketaan uudelleen)
            lat0, lon0 = v['origo']['lat'], v['origo']['lon']; la, lo = m['keski']
            x = (lo - lon0) * math.radians(1) * WA * math.cos(math.radians(lat0)); z = (la - lat0) * math.radians(1) * WA
            rivit.append((k, s, piirra(m, hallit.laske(m, (-x, -z), puolikkaat=False)), piirra(m, hallit.laske(m, (-x, -z)))))
    W, H = 2 * 300 + 30, 300 + 40
    arkki = Image.new('RGB', (W * 3, H * ((len(rivit) + 2) // 3)), (255, 255, 255)); d = ImageDraw.Draw(arkki)
    try: f = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', 15)
    except Exception: f = None
    for i, (k, s, a, b) in enumerate(rivit):
        X, Y = (i % 3) * W, (i // 3) * H
        arkki.paste(a, (X + 5, Y + 34)); arkki.paste(b, (X + 315, Y + 34))
        d.text((X + 8, Y + 4), f"{(s['nimi'] or s['osm'])[:34]} ({k})", fill=(0, 0, 0), font=f)
        d.text((X + 8, Y + 19), f"ennen {s['katettu_ennen_pct']} %   →   jälkeen {s['katettu_pct']} %   ({s['hallimaara']} hallia)", fill=(0, 0, 0), font=f)
    arkki.save(ulos); print(ulos, arkki.size)

if __name__ == '__main__':
    main(sys.argv[1])
