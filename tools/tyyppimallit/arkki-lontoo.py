"""KK 15.11. 01.13 kohta 4: arkki Lontoo (kuvat/lontoo, obj/lontoo/lista.json) → lontoo-1.jpg. python3 -I arkki-lontoo.py"""
from PIL import Image, ImageDraw, ImageFont
import json
K = 'kuvat/lontoo'; l = json.load(open('obj/lontoo/lista.json'))
f = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', s); fb = lambda s: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', s)
cw, ch, v = 450, 320, 10; W = v + 4 * (cw + v); H = 70 + 2 * (ch + v + 4) + 60
a = Image.new('RGB', (W, H), (245, 240, 228)); d = ImageDraw.Draw(a)
d.text((v, 12), 'LONTOO (KK 15.11. 01.13 kohta 4): asemat (hyväksytty) | palatsit attikalla + Royal Exchange portiikilla; MK01-rivit kuten pelissä, 45° lounaasta, talo vieressä', font=fb(20), fill=(40, 34, 28))
y = 60
for i, (nimi, n, L, W_, r) in enumerate(l):
    x = v + (i % 4) * (cw + v); yy = y + (i // 4) * (ch + v + 4)
    a.paste(Image.open(f'{K}/{nimi}.png').convert('RGB').resize((cw, ch), Image.LANCZOS), (x, yy))
    t = f'{n}  {L:.0f} × {W_:.0f} m' + (f', {r[1]} hallia' if r[0] == 7 else '')
    w = int(d.textlength(t, font=fb(17))) + 12; d.rectangle((x, yy, x + w, yy + 28), fill=(245, 240, 228)); d.text((x + 6, yy + 4), t, font=fb(17), fill=(40, 34, 28))
yy = y + 2 * (ch + v + 4)
d.text((v, yy), 'Palatsit: katto attika (räystäslista + kaide, tasakatto), 495 kolmiota vs mansardi 1 359. Royal Exchange: 8 pylvään portiikki vain länsipäädyssä + kolmiopääty, 225 kolmiota.', font=f(16), fill=(60, 52, 44))
d.text((v, yy + 24), "Mansardi ehdotettu vain County Hallille ja Old Admiraltylle (oikeasti korkeat katot). St James's pois. Mittakaava vaihtelee ruuduittain (asemat 120–450 m).", font=f(16), fill=(60, 52, 44))
a.save('lontoo-1.jpg', quality=88); print(a.size)
