# Sokrateen bysti: projektorin gobokuva (Linnanrakentaja 1.10.2026). Valkoinen teksti mustalla, PIL.
#   python3 sokrates_gobo.py <ulos.png> [--fontti iowan|baskerville] [rivi1 rivi2 ...]
# Kuvan koko sovitetaan tekstiin (reunus 12 %); Blender-skripti lukee kuvasuhteen kuvasta.
# v1: Platon, Puolustuspuhe 38a kreikaksi (Baskerville: polytoninen kreikka; Iowan Old Style ja Georgia eivät sisällä sitä).
# v2 (omistaja 1.10. 21.4x): suomennos pinnoittain pelin lukufontilla Iowan Old Style.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

A = sys.argv[1:]; ULOS = A.pop(0)
FONTTI = 'baskerville'
if A and A[0] == '--fontti':
    FONTTI = A[1]; A = A[2:]
RIVIT = A or ['ὁ δὲ ἀνεξέταστος', 'βίος οὐ βιωτὸς', 'ἀνθρώπῳ']
POLKU = {'baskerville': ('/System/Library/Fonts/Supplemental/Baskerville.ttc', 0),
         'iowan': ('/System/Library/Fonts/Supplemental/Iowan Old Style.ttc', 1)}[FONTTI]   # Iowan: lihavoitu luettavuuteen
KOKO = 220; F = ImageFont.truetype(POLKU[0], KOKO, index=POLKU[1]); VALI = int(KOKO * 1.3)
lev = max(F.getbbox(r)[2] - F.getbbox(r)[0] for r in RIVIT); kork = VALI * (len(RIVIT) - 1) + KOKO
L, K = int(lev * 1.12) + 40, int(kork * 1.12 + KOKO * 0.5)
im = Image.new('L', (L, K), 0); d = ImageDraw.Draw(im); y0 = K / 2 - VALI * (len(RIVIT) - 1) / 2
for i, r in enumerate(RIVIT):
    d.text((L / 2, y0 + i * VALI), r, font=F, fill=255, anchor='mm')
im = im.filter(ImageFilter.GaussianBlur(2.0))        # projektorin pehmeys
im.save(ULOS); print('GOBO', ULOS, im.size)
