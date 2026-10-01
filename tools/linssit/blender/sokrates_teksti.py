# Sokrateen mallikuva: suomennos alareunaan ja merkinnät kuvaan (Linnanrakentaja 1.10.2026), PIL.
#   python3 sokrates_teksti.py <render.png> <ulos.jpg> <merkintä>
# Suomennos pelin lukufontilla (--font-luku: Iowan Old Style), lähde pienellä; tumma liukuma tekstin taakse.
import sys
from PIL import Image, ImageDraw, ImageFont

SISAAN, ULOS, MERKINTA = sys.argv[1], sys.argv[2], sys.argv[3]
NAKYVYYS = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0   # v3-videon häivytys
SUOMI = 'Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.'   # Sisältökirjurin suomennos (v2)
KREIKKA = 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'
LAHDE = 'Platon, Puolustuspuhe 38a'
BASKERVILLE = '/System/Library/Fonts/Supplemental/Baskerville.ttc'
IOWAN = '/System/Library/Fonts/Supplemental/Iowan Old Style.ttc'

im = Image.open(SISAAN).convert('RGBA'); alkup = im.copy(); L, K = im.size; lyhyt = min(L, K)
# liukuma alareunaan: läpinäkyvä → 85 % tausta
liuku = Image.new('RGBA', im.size, (0, 0, 0, 0)); d = ImageDraw.Draw(liuku); alku = int(K * 0.74)
for y in range(alku, K):
    a = int(215 * ((y - alku) / (K - alku)) ** 1.2); d.line([(0, y), (L, y)], fill=(8, 8, 11, a))
im.alpha_composite(liuku); d = ImageDraw.Draw(im)
koko = int(lyhyt * (0.050 if K > L else 0.040))
F = ImageFont.truetype(IOWAN, koko, index=0); Fi = ImageFont.truetype(IOWAN, int(koko * 0.6), index=2)
# rivitys: pystykuvassa kahdelle riville
rivit = ['Tutkimaton elämä ei ole elämisen', 'arvoinen ihmiselle.'] if K > L else [SUOMI]
y = K - int(lyhyt * 0.10) - koko * (len(rivit) - 1) * 1.25 - int(koko * 1.9)
for r in rivit:
    d.text((L / 2, y), r, font=F, fill=(240, 236, 228, 255), anchor='mm'); y += koko * 1.25
# kreikka vain pienenä lähderivinä suomennoksen alla (omistaja 1.10. 21.4x)
Fk = ImageFont.truetype(BASKERVILLE, int(koko * 0.58), index=0)
d.text((L / 2, y + koko * 0.30), KREIKKA, font=Fk, fill=(170, 166, 158, 255), anchor='mm')
d.text((L / 2, y + koko * 1.05), LAHDE, font=Fi, fill=(150, 146, 140, 255), anchor='mm')
# merkintä vasempaan yläkulmaan
Fm = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial.ttf', int(lyhyt * 0.022))
d.text((int(lyhyt * 0.03), int(lyhyt * 0.03)), MERKINTA, font=Fm, fill=(150, 150, 150, 255))
im = Image.blend(alkup, im, NAKYVYYS) if NAKYVYYS < 1 else im
im.convert('RGB').save(ULOS, quality=88); print('TEKSTI', ULOS)
