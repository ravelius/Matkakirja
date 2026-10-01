# Sokrates v5: nimi ja elinvuodet tai kysymys kasvojen viereen (Linnanrakentaja 1.10.2026), PIL.
#   python3 sokrates_nimi.py <render.png> <ulos.jpg> <nimi|kysymys> [näkyvyys 0–1] [merkintä]
# Pelin lukufontti Iowan Old Style; teksti kuvan vasempaan reunaan kasvojen korkeudelle (kasvot ovat oikealla).
import sys
from PIL import Image, ImageDraw, ImageFont

SISAAN, ULOS, MITA = sys.argv[1], sys.argv[2], sys.argv[3]
NAKYVYYS = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0
MERKINTA = sys.argv[5] if len(sys.argv) > 5 else ''
IOWAN = '/System/Library/Fonts/Supplemental/Iowan Old Style.ttc'
im = Image.open(SISAAN).convert('RGBA'); L, K = im.size
kerros = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(kerros)
x, y = int(L * 0.06), int(K * 0.42)
if MITA == 'nimi':
    F = ImageFont.truetype(IOWAN, int(L * 0.062), index=0); Fv = ImageFont.truetype(IOWAN, int(L * 0.034), index=2)
    vali = int(L * 0.008); xx = x                         # harvennettu versaali
    for kirjain in 'SOKRATES':
        d.text((xx, y), kirjain, font=F, fill=(238, 233, 224, 255), anchor='ls'); xx += F.getlength(kirjain) + vali
    d.text((x + 2, y + int(L * 0.058)), 'n. 470–399 eaa.', font=Fv, fill=(176, 171, 162, 255), anchor='ls')
else:
    F = ImageFont.truetype(IOWAN, int(L * 0.062), index=2)
    for i, rivi in enumerate(('Miten pitäisi', 'elää?')):
        d.text((x, y + i * int(L * 0.078)), rivi, font=F, fill=(238, 233, 224, 255), anchor='ls')
r, g, b, a = kerros.split(); kerros.putalpha(a.point(lambda v: int(v * NAKYVYYS)))
im.alpha_composite(kerros)
if MERKINTA:
    Fm = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', int(min(L, K) * 0.022))
    ImageDraw.Draw(im).text((int(L * 0.03), int(L * 0.03)), MERKINTA, font=Fm, fill=(150, 150, 150, 255))
im.convert('RGB').save(ULOS, quality=90); print('NIMI', ULOS)
