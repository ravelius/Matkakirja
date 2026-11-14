"""KK 14.11. 23.40 (ajz): asemat uusilla halleilla (E) + Élysée U-palatsina (D). python3 -I arkki-ajz.py <kuvat> <ulos.jpg>"""
import sys
from PIL import Image, ImageDraw, ImageFont
K, U = sys.argv[1:3]
f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
fb = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
RIVIT = [('ASEMAT: hallin leveys 35–65 m, 1–5 hallia (lähin 50 m), julkisivu ≥ 0,8 × harja, kellopääty harjan yli (E)',
          [('asema-nord-45', 'Gare du Nord 185 × 137 m: 3 hallia à 46 m – 944 kolmiota'), ('asema-lazare-45', 'Saint-Lazare 249 × 247 m: 5 hallia à 49 m – 1 324'),
           ('asema-lyon-45', 'Gare de Lyon 217 × 181 m: 4 hallia à 45 m – 1 104')]),
         ('ASEMAT edestä: kellopääty keskimmäisen hallin edessä, julkisivurakennus 20 m (≥ 0,8 × harja 22–24 m), paviljongit +6 m',
          [('asema-nord-edesta', 'Gare du Nord edestä'), ('asema-lazare-edesta', 'Saint-Lazare edestä'), ('asema-lyon-sivulta', 'Gare de Lyon sivulta (hallien päädyt)')]),
         ("PALAIS DE L'ÉLYSÉE U-palatsina (D): 114 × 108 m, akseli seinistä, avoin sivu = lounaan puoli (19 %), pääjulkisivu pohjoiseen (Faubourg-Saint-Honoré)",
          [('piha2-relation-1060803-45', 'Élysée 45° lounaasta (avoin sivu edessä)'), ('piha2-relation-1060803-edesta', 'Élysée sivukuva A (pohjoisesta)'), ('piha2-relation-1060803-sivulta', 'Élysée sivukuva B (idästä)')])]
cw, ch, v, ot = 600, 427, 10, 34
W = v + 3 * (cw + v); H = 64 + len(RIVIT) * (ot + ch + v) + 24
a = Image.new('RGB', (W, H), (245, 240, 228)); d = ImageDraw.Draw(a)
d.text((v, 10), 'TYÖKALU 2 – KK 14.11. 23.40 päätökset: asemat uusilla halleilla ja Élysée U:na (Valoseppä 15.11.2026; ei junaan)', fill=(40, 34, 28), font=fb(24))
d.text((v, 40), 'Tasavärit, ortokamera; tavallinen pariisilainen talo (16 × 12 m, räystäs 18 m) vieressä mittakaavaksi. Kolmioraja 1 500.', fill=(70, 62, 52), font=f(16))
y = 64
for otsikko, kuvat in RIVIT:
    d.text((v, y + 6), otsikko, fill=(40, 34, 28), font=fb(18))
    for i, (n, o) in enumerate(kuvat):
        im = Image.open(f'{K}/{n}.png').convert('RGB').resize((cw, ch), Image.LANCZOS); x = v + i * (cw + v); a.paste(im, (x, y + ot))
        d.text((x + 8, y + ot + 6), o, fill=(60, 52, 44), font=f(15))
    y += ot + ch + v
d.text((v, H - 22), 'Lähde: _tyo/valoseppa/tyyppitalot (oma/Tyyppimallit.cs TyyppiAsema, AsemanHallit, TyyppiPalatsiPiha; renderoi.py Blender 5.2).', fill=(110, 100, 90), font=f(13))
a.save(U, quality=90); print(U, a.size)
