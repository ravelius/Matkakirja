# Sokrates v10: pehmeä pystyvinjetti laajoihin otoksiin (omistaja 2.10. 08.4x: "pehmeämpi vinjetointi").
# Kaula, rinta ja sokkeli tummenevat asteittain alaspäin (alareuna noin 1,5 EV = ×0,35) ilman näkyvää rajaa,
# ja reunoilla on lievä säteittäinen häivytys. Lähikuviin ei käytetä.
#   python3 sokrates_vinjetti.py <sisään> <ulos> [voimakkuus 0–1]
import sys
from PIL import Image, ImageChops

sis, ulos = sys.argv[1], sys.argv[2]; v = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
im = Image.open(sis).convert('RGB'); L, K = im.size


def kerroin(y):
    t = max(0.0, (y / K - 0.52) / 0.48)                 # 52 %:sta alaspäin
    t = t * t * (3 - 2 * t)                              # smoothstep
    return 1.0 - v * 0.65 * t                            # alareuna ×0,35 ≈ −1,5 EV


pysty = Image.new('L', (1, K)); pysty.putdata([int(255 * kerroin(y)) for y in range(K)]); pysty = pysty.resize((L, K))
sade = Image.radial_gradient('L').resize((L, K)).point(lambda p: int(255 * (1.0 - v * 0.18 * (p / 255) ** 2)))
maski = ImageChops.multiply(pysty, sade).convert('RGB')
ImageChops.multiply(im, maski).save(ulos, quality=92); print('VINJETTI', ulos)
