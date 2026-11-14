"""KK 15.11. 00.28 kohta 4a: arkki kirkko-levea. python3 -I arkki-levea.py <kuvakansio> <ulos.jpg> [alarivi]"""
import sys
from PIL import Image, ImageDraw, ImageFont
K, U = sys.argv[1:3]; ALA = sys.argv[3] if len(sys.argv) > 3 else ''
f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
fb = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
cw, ch, v, ot = 600, 427, 10, 44
RIVIT = [('SAMA POHJA 58 × 38 m (vaalea suorakaide): kirkko-levea venytettynä (yli rajan, vertailuksi) | kirkko-basilika 1,0 | basilika, tornipari (parametrit kuten keski)',
          [('basilika-58x38', 'levea x 1,71 z 1,81'), ('basilika-100', 'basilika 1,0'), ('basilika-pari', 'basilika 1,0, 2 tornia')]),
         ('BASILIKA PITUUS (x) 0,6 | 1,0 | 1,6', [(f'basilika-x{n}', f'x {s}') for n, s in (('060', '0,6'), ('100', '1,0'), ('160', '1,6'))]),
         ('BASILIKA LEVEYS (z) 0,6 | 1,0 | 1,6', [(f'basilika-z{n}', f'z {s}') for n, s in (('060', '0,6'), ('100', '1,0'), ('160', '1,6'))])]
W = v + 3 * (cw + v); H = 74 + len(RIVIT) * (ot + ch + v) + 70
a = Image.new('RGB', (W, H), (245, 240, 228)); d = ImageDraw.Draw(a)
d.text((v, 12), 'KIRKKO-BASILIKA (KK 15.11. 01.14, viides muoto): 58 × 38 m, leveän rakenne, torni 9 m / 46 m kuten keski, 160 kolmiota; 45° lounaasta, sama mittakaava, talo vieressä', font=fb(24), fill=(40, 34, 28))
y = 74
for otsikko, kuvat in RIVIT:
    d.text((v, y + 10), otsikko, font=fb(20), fill=(40, 34, 28)); y += ot
    for i, (n, t) in enumerate(kuvat):
        im = Image.open(f'{K}/{n}.png').convert('RGB').resize((cw, ch), Image.LANCZOS)
        x = v + i * (cw + v); a.paste(im, (x, y))
        w = int(d.textlength(t, font=fb(22))) + 16
        d.rectangle((x, y, x + w, y + 34), fill=(245, 240, 228)); d.text((x + 8, y + 5), t, font=fb(22), fill=(40, 34, 28))
    y += ch + v
for i, rivi in enumerate(ALA.split('|')): d.text((v, y + 6 + i * 26), rivi.strip(), font=f(18), fill=(60, 52, 44))
a.save(U, quality=88); print(U, a.size)
