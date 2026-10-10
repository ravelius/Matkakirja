#!/usr/bin/env python3
"""SÄVYN TÄSMÄYS (Karttaseppä 9.10.2026, PT: F liian vaalean harmaa; tavoite KL:n eteläjulkisivun valokuva 153/146/131, LS2:n mittaus).
Kanavittainen kerroin lineaarisessa valossa niin, että mittausmaskin (esim. materiaali = rappaus) mediaani osuu kohdeväriin;
kerroin sovelletaan soveltamismaskiin (oletus sama). Ikkunat ja varjot (luma < 95) jätetään mittauksesta pois.
Käyttö: python3 savy.py <tulos.png> <ulos.png> --kohde 153,146,131 [--mittaus maski.png] [--sovellus maski.png] [--laatikko x0,y0,x1,y1]
(maskit valkoinen = mukana, samaa kokoa kuin renderi; tulos skaalataan maskin kokoon)"""
import argparse
from PIL import Image

def lin(v): v /= 255; return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
def srgb(v): v = max(0.0, min(1.0, v)); return round(255 * (12.92 * v if v <= 0.0031308 else 1.055 * v ** (1 / 2.4) - 0.055))
LIN = [lin(i) for i in range(256)]

def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument('tulos'); p.add_argument('ulos'); p.add_argument('--kohde', required=True)
    p.add_argument('--mittaus'); p.add_argument('--sovellus'); p.add_argument('--laatikko'); p.add_argument('--koko', default='1600,900')
    a = p.parse_args()
    W, H = (int(x) for x in a.koko.split(','))
    im = Image.open(a.tulos).convert('RGB').resize((W, H), Image.LANCZOS)
    mm = Image.open(a.mittaus).convert('L').resize((W, H)) if a.mittaus else Image.new('L', (W, H), 255)
    if a.laatikko:
        x0, y0, x1, y1 = (int(v) for v in a.laatikko.split(',')); b = Image.new('L', (W, H), 0); b.paste(255, (x0, y0, x1, y1))
        from PIL import ImageChops; mm = ImageChops.multiply(mm, b)
    sm = Image.open(a.sovellus).convert('L').resize((W, H)) if a.sovellus else mm
    px, mp = im.load(), mm.load(); otos = []
    for y in range(0, H, 2):
        for x in range(0, W, 2):
            if mp[x, y] < 128: continue
            r, g, b = px[x, y]
            if 0.299 * r + 0.587 * g + 0.114 * b > 95: otos.append((r, g, b))
    if not otos: raise SystemExit('mittausmaski tyhjä')
    med = [sorted(c)[len(c) // 2] for c in zip(*otos)]; kohde = [int(v) for v in a.kohde.split(',')]
    k = [LIN[kohde[c]] / max(1e-6, LIN[med[c]]) for c in range(3)]
    lut = [[srgb(LIN[i] * k[c]) for i in range(256)] for c in range(3)]
    korj = Image.merge('RGB', [ch.point(lut[c]) for c, ch in enumerate(im.split())])
    out = Image.composite(korj, im, sm)
    out.save(a.ulos)
    print({'mediaani_ennen': med, 'kohde': kohde, 'kertoimet_lin': [round(v, 3) for v in k], 'nayte': len(otos)})

if __name__ == '__main__':
    main()
