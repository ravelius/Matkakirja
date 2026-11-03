"""Pari: vasen vanha pohja | oikea uusi, sama laattarajaus. Käyttö: python -I pari.py <vanha> <uusi> <ulos.jpg> z:x0-x1:y0-y1
Uudesta puuttuva laatta otetaan vanhasta (muuttumaton)."""
import os, sys
from PIL import Image


def mosaiikki(juuri, z, xs, ys, vara=None):
    im = Image.new('RGB', (256 * len(xs), 256 * len(ys)))
    for i, x in enumerate(xs):
        for j, y in enumerate(ys):
            p = os.path.join(juuri, str(z), str(x), f'{y}.jpg')
            if not os.path.exists(p) and vara: p = os.path.join(vara, str(z), str(x), f'{y}.jpg')
            if os.path.exists(p): im.paste(Image.open(p).convert('RGB'), (256 * i, 256 * j))
    return im


def main():
    vanha, uusi, ulos, alue = sys.argv[1:5]
    z, xs, ys = alue.split(':'); z = int(z)
    x0, x1 = map(int, xs.split('-')); y0, y1 = map(int, ys.split('-'))
    xs, ys = range(x0, x1 + 1), range(y0, y1 + 1)
    a, b = mosaiikki(vanha, z, xs, ys), mosaiikki(uusi, z, xs, ys, vanha)
    im = Image.new('RGB', (a.width * 2 + 12, a.height), (255, 255, 255))
    im.paste(a, (0, 0)); im.paste(b, (a.width + 12, 0))
    im.save(ulos, quality=90)


if __name__ == '__main__':
    main()
