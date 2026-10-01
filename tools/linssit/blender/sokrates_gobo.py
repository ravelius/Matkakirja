# Sokrateen bysti: projektorin gobokuva (Linnanrakentaja 1.10.2026). Valkoinen teksti mustalla, PIL.
#   python3 sokrates_gobo.py <ulos.png> [rivi1] [rivi2]
# Oletuksena Platon, Sokrateen puolustuspuhe 38a: "ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ".
# Fontti: Baskerville (macOS) sisältää polytonisen kreikan; Iowan Old Style ja Georgia eivät.
import sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ULOS = sys.argv[1]
RIVIT = sys.argv[2:] or ['ὁ δὲ ἀνεξέταστος', 'βίος οὐ βιωτὸς', 'ἀνθρώπῳ']
L, K = 2048, 1536                                   # kuvasuhde 4:3 (Blender-skriptin GOBO_LEV / GOBO_KORK)
F = ImageFont.truetype('/System/Library/Fonts/Supplemental/Baskerville.ttc', 230)
im = Image.new('L', (L, K), 0); d = ImageDraw.Draw(im)
vali = 330; y0 = K / 2 - vali * (len(RIVIT) - 1) / 2
for i, r in enumerate(RIVIT):
    d.text((L / 2, y0 + i * vali), r, font=F, fill=255, anchor='mm')
im = im.filter(ImageFilter.GaussianBlur(2.0))        # projektorin pehmeys
im.save(ULOS); print('GOBO', ULOS)
