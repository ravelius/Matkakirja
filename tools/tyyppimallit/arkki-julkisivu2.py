"""KK 15.11. ~03.3x: julkisivukirkko arkki 2. python3 -I arkki-julkisivu2.py <kuvakansio> <ulos.jpg>"""
import sys
from PIL import Image, ImageDraw, ImageFont
K, U = sys.argv[1:3]
f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s)
fb = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
SAR = [('j-1-1.0-1.0', '1,0 × 1,0'), ('j-1-0.6-1.0', 'x 0,6'), ('j-1-1.6-1.0', 'x 1,6'), ('j-1-1.0-0.6', 'z 0,6'), ('j-1-1.0-1.6', 'z 1,6'),
       ('j-1-0.6-0.6', '0,6 × 0,6'), ('j-1-1.6-1.6', '1,6 × 1,6'), ('j-1-1.6-0.6', 'x 1,6 z 0,6'), ('j-1-0.6-1.6', 'x 0,6 z 1,6')]
RIV = [('ylhaalta', 'YLHÄÄLTÄ'), ('sivulta', 'SIVULTA (etelä)'), ('edesta', 'EDESTÄ (länsi)')]
cw, ch, v, lw = 300, 222, 8, 150
W = lw + len(SAR) * (cw + v) + v
ph = 600 * 0.62
H = 70 + 34 + len(RIV) * (ch + v) + 50 + int(ph) + 70
a = Image.new('RGB', (W, int(H)), (245, 240, 228)); d = ImageDraw.Draw(a)
d.text((v, 10), 'JULKISIVUKIRKKO, ARKKI 2 (KK 15.11. ~03.3x ehdot a ja b): runko venyy (sx, sz), rumpu + kupoli + lyhty tasaisesti s = min(sx, sz), aina pyöreä', font=fb(24), fill=(40, 34, 28))
d.text((v, 42), 'Sama mittakaava kaikissa ruuduissa (92 m leveys). Kevyt kupoliversio: koko kirkko 545 kolmiota (raja 600; ennen 1 165, ilman kupolia 251).', font=f(19), fill=(60, 52, 44))
y = 78
for i, (_, ot) in enumerate(SAR):
    d.text((lw + v + i * (cw + v) + 6, y), ot, font=fb(20), fill=(40, 34, 28))
y += 34
for nak, ot in RIV:
    d.text((v, y + ch // 2 - 12), ot, font=fb(17), fill=(40, 34, 28))
    for i, (m, _) in enumerate(SAR):
        im = Image.open(f'{K}/{m}-{nak}.png').convert('RGB').resize((cw, ch), Image.LANCZOS)
        a.paste(im, (lw + v + i * (cw + v), y))
    y += ch + v
y += 12
d.text((v, y), 'PARI 45° lounaasta: NYKYINEN (raskas, 16 sivua, 7 kehää, 8 ripaa, lyhty pilareineen; 1 165) | KEVYT (12 sivua, 4 kehää, ei ripoja, lyhty yksinkertainen; 545)  ja pelin katseluetäisyydeltä (arvio ~1,5 px/m, suurennus ilman pehmennystä)', font=fb(18), fill=(40, 34, 28))
y += 34
pw = int(810 * 0.62); x = v
for m, ot in (('j-raskas', 'nykyinen 1 165'), ('j-1-1.0-1.0', 'kevyt 545')):
    a.paste(Image.open(f'{K}/{m}-pari.png').convert('RGB').resize((pw, int(ph)), Image.LANCZOS), (x, y))
    d.rectangle((x, y, x + 200, y + 30), fill=(245, 240, 228)); d.text((x + 6, y + 4), ot, font=fb(20), fill=(40, 34, 28)); x += pw + v
for m, ot in (('j-raskas', 'nykyinen, pelissä'), ('j-1-1.0-1.0', 'kevyt, pelissä')):
    im = Image.open(f'{K}/{m}-pelissa.png').convert('RGB'); im = im.resize((im.width * 3, im.height * 3), Image.NEAREST)
    a.paste(im, (x, y)); d.rectangle((x, y, x + 220, y + 30), fill=(245, 240, 228)); d.text((x + 6, y + 4), ot, font=fb(20), fill=(40, 34, 28)); x += im.width + v
y += int(ph) + 10
d.text((v, y), 'Peli: kupoli toisena jaettuna verkkona samalla merkillä (TyyppiLisaosa), paikka rungon venytyksestä (7 m · sx, 19 m). Ehto c: tyyppi 10 vain nimilistalta (Pariisi ja Lontoo), ei venytysvalintaan.', font=f(18), fill=(60, 52, 44))
a.save(U, quality=88); print(U, a.size)
