"""KK 15.11. 00.16 kohta 2: arkki sama kirkko 0,6 | 1,0 | 1,6 (rivi x, rivi z). python3 -I arkki-venytys.py <kuvakansio> <malli> <ulos.jpg> [alarivi]"""
import sys
from PIL import Image, ImageDraw, ImageFont
K, M, U = sys.argv[1:4]; ALA = sys.argv[4] if len(sys.argv) > 4 else ''
f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
fb = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
cw, ch, v, ot = 600, 427, 10, 44
W = v + 3 * (cw + v); H = 74 + 2 * (ot + ch + v) + 40
a = Image.new('RGB', (W, H), (245, 240, 228)); d = ImageDraw.Draw(a)
d.text((v, 12), f'VENYTYSRAJA 0,6–1,6 (KK 15.11. 00.16 kohta 2): {M} pohja-sovituksessa, 45° lounaasta, sama mittakaava, talo vieressä', font=fb(24), fill=(40, 34, 28))
y = 74
for ak, ot_ in (('x', 'PITUUS (x): sx = pohjan pituus / mallin pituus, leveys 1,0'), ('z', 'LEVEYS (z): sz = pohjan leveys / mallin leveys, pituus 1,0')):
    d.text((v, y + 10), ot_, font=fb(20), fill=(40, 34, 28)); y += ot
    for i, s in enumerate((0.6, 1.0, 1.6)):
        im = Image.open(f'{K}/{M}-{ak}{int(s * 100):03d}.png').convert('RGB').resize((cw, ch), Image.LANCZOS)
        x = v + i * (cw + v); a.paste(im, (x, y))
        d.rectangle((x, y, x + 150, y + 34), fill=(245, 240, 228)); d.text((x + 8, y + 5), f'{ak} {s:.1f}'.replace('.', ','), font=fb(22), fill=(40, 34, 28))
    y += ch + v
d.text((v, y + 6), ALA, font=f(18), fill=(60, 52, 44))
a.save(U, quality=88); print(U, a.size)
