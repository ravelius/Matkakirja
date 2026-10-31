import sys
import numpy as np
from PIL import Image
def luokat(p, rajaus=None):
    im = Image.open(p).convert('RGB')
    if rajaus: im = im.crop(rajaus)
    a = np.asarray(im).astype(np.int16); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    katto = (b > r + 12) & (b > g + 2) & (r < 200) & ~((g > r + 30) & (b < g + 25) & (g > 150))
    vesi = (g > r + 35) & (b > r + 35) & (r < 170)
    katto &= ~vesi
    seina = (r > 165) & (r >= g) & (g > b) & (r - b > 28) & (r - b < 120) & (g - b > 12)
    puu = (g > r + 4) & (g > b + 12) & ~vesi
    tulos = {}
    for n, m in (('seinä', seina), ('katto', katto), ('puu', puu), ('vesi', vesi)):
        tulos[n] = (m.mean(), np.median(a[m], axis=0).astype(int).tolist() if m.any() else None)
    return tulos
for p in sys.argv[1:]:
    print(p.split('/')[-1], {k: (round(v[0] * 100, 1), v[1]) for k, v in luokat(p).items()})
