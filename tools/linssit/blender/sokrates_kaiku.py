# Sokrates v8: kaikukuva projektorille (Linnanrakentaja 2.10.2026), PIL. Valoa vain sisällössä (omistaja: ei taustavuotoa).
#   python3 sokrates_kaiku.py <lähde> <ulos.png> <viiva|kuva> x0 y0 x1 y1
# KAIKKI KAIUT POSITIIVISINA (omistaja 2.10. 11.1x). viiva: viivapiirros/kaiverrus positiivina, tummat viivat vaalealla
#        (Codexin musta viiva läpinäkyvällä taustalla yhdistetään ensin valkoiselle paperille). kuva: maalaus/valokuva,
#        tummat taustat mustaksi tasokäyrällä (sisältö jää valoksi). Molemmissa pehmeä soikea maski (ei suorakaidetta).
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

lahde, ulos, tapa = sys.argv[1], sys.argv[2], sys.argv[3]; x0, y0, x1, y1 = map(int, sys.argv[4:8])
src = Image.open(lahde)
if src.mode in ('RGBA', 'LA') or 'transparency' in src.info:
    tausta = Image.new('RGBA', src.size, (255, 255, 255, 255)); tausta.alpha_composite(src.convert('RGBA')); src = tausta
im = ImageOps.autocontrast(src.convert('L').crop((x0, y0, x1, y1)), cutoff=1)
im.thumbnail((1600, 1600))
if tapa == 'viiva':
    # omistaja 2.10. 11.1x: "varmista jatkossa että kaikki ovat positiivina" → EI kääntöä: tummat viivat vaalealla
    # paperilla; paperi himmennetään hieman (×0,75), jotta valo ei vie kipsin muotoja, ja viivat jäävät varjoiksi
    im = im.point(lambda v: int(min(255, v) * 0.75))
else:
    im = im.point(lambda v: 0 if v < 105 else min(255, int((v - 105) * 255 / 130)))
im = im.filter(ImageFilter.GaussianBlur(1.0))
L, K = im.size; maski = Image.new('L', (L, K), 0)
ImageDraw.Draw(maski).ellipse((L * 0.06, K * 0.06, L * 0.94, K * 0.94), fill=255)
maski = maski.filter(ImageFilter.GaussianBlur(min(L, K) * 0.08))
ImageChops.multiply(im, maski).save(ulos); print('KAIKU', ulos, tapa, im.size)
