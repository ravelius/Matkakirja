# Sokrates v8: kaikukuva projektorille (Linnanrakentaja 2.10.2026), PIL. Harmaasävy, automaattinen kontrasti,
# pehmeä soikea vinjetti (ei suorakaidetta pinnalle), kevyt pehmennys.
#   python3 sokrates_kaiku.py <lähde.jpg> <ulos.png> x0 y0 x1 y1
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageOps

lahde, ulos = sys.argv[1], sys.argv[2]; x0, y0, x1, y1 = map(int, sys.argv[3:7])
im = ImageOps.autocontrast(Image.open(lahde).convert('L').crop((x0, y0, x1, y1)), cutoff=1)
im.thumbnail((1600, 1600)); im = im.filter(ImageFilter.GaussianBlur(1.2))
L, K = im.size; maski = Image.new('L', (L, K), 0)
ImageDraw.Draw(maski).ellipse((L * 0.06, K * 0.06, L * 0.94, K * 0.94), fill=255)
maski = maski.filter(ImageFilter.GaussianBlur(min(L, K) * 0.08))
ImageChops.multiply(im, maski).save(ulos); print('KAIKU', ulos, im.size)
