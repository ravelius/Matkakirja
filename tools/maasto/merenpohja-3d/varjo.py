#!/opt/homebrew/bin/python3
# Kentän tarkistuskuva: varjostus 3D-kentästä (L1), kaistarajat (4°) punaisella reunassa. varjo.py lon0 lat0 lon1 lat1 ulos.jpg [liioittelu]
import sys, numpy as np
from PIL import Image
R='/Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-raaka/maailma-3d15-L1.i16'
lon0, lat0, lon1, lat1 = map(float, sys.argv[1:5]); ulos = sys.argv[5]; k = float(sys.argv[6]) if len(sys.argv) > 6 else 15
m = np.memmap(R, dtype='<i2', mode='r', shape=(43200, 86400))
r0, r1 = int((90 - lat1) * 240), int((90 - lat0) * 240); c0, c1 = int((lon0 + 180) * 240), int((lon1 + 180) * 240)
h = np.asarray(m[r0:r1, c0:c1]).astype(np.float32) / 2 * k
s = max(1, (c1 - c0) // 2000); h = h[::s, ::s]
d = 463.3 * s; cl = np.cos(np.radians((lat0 + lat1) / 2))
gy, gx = np.gradient(h, d, d * cl)
n = np.dstack([-gx, gy, np.ones_like(h)]); n /= np.linalg.norm(n, axis=2, keepdims=True)
L = np.array([-1, 1, 1.2]); L /= np.linalg.norm(L)
v = np.clip(n @ L, 0, 1)
vari = np.where(h[..., None] > 0, [0.75, 0.68, 0.5], [0.45, 0.6, 0.75])
img = (vari * (0.25 + 0.75 * v[..., None]) * 255).astype(np.uint8)
for lat in np.arange(np.ceil(lat0 / 4) * 4 - 2, lat1, 4):   # kaistarajat 90 − 4k = …, 22, 18, …
    if lat0 < lat < lat1:
        y = int((lat1 - lat) * 240 / s); img[y, :12] = [255, 0, 0]
Image.fromarray(img).save(ulos, quality=88); print(ulos, img.shape)
