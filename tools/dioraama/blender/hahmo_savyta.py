# Asun kuvan sävytys henkilön värillä (Linnanrakentaja 2.10.2026): valitut sävyalueet → väri × kirkkausvaihtelu.
#   python3 savyta.py <lähde.png> <ulos.png> <alue> <#rrggbb>   alue: vihrea (Ranger) | paita (Peasant, vaalea pellava)
import sys
from PIL import Image
LAHDE, ULOS, ALUE, HEX = sys.argv[1:5]
c = tuple(int(HEX[i:i + 2], 16) for i in (1, 3, 5))
im = Image.open(LAHDE).convert('RGB'); hsv = im.convert('HSV')
src = list(im.get_flattened_data() if hasattr(im, 'get_flattened_data') else im.getdata())
H = list(hsv.get_flattened_data() if hasattr(hsv, 'get_flattened_data') else hsv.getdata())
def valittu(h, s, v):
    if ALUE == 'vihrea': return 45 <= h <= 130 and s > 40
    if ALUE == 'paita': return 8 <= h <= 40 and s < 110 and v > 120
    return False
vv = [v for (h, s, v) in H if valittu(h, s, v)]; ka = sum(vv) / max(1, len(vv))
out = []
for (r, g, b), (h, s, v) in zip(src, H):
    if valittu(h, s, v):
        k = 0.55 + 0.45 * v / ka; out.append(tuple(min(255, int(x * k)) for x in c))
    else: out.append((r, g, b))
o = Image.new('RGB', im.size); o.putdata(out); o.save(ULOS); print('SAVY', ALUE, HEX, len(vv), 'pikseliä')
