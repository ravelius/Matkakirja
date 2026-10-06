#!/usr/bin/env python3
"""KAUPUNGIN YÖVALOT (Linssiseppä 6.10.2026, kuvanlaatujärjestys kohta 2; Päätoimittaja): NASA Black Marble 2016 (VIIRS DNB,
500 m, public domain) Euroopan yhden asteen laatoiksi alkuperäisellä tarkkuudella (tasakulma, 240 px / aste, ei uudelleennäytteistystä).
Valon voimakkuus = punakanava taustan yli (tausta sinertävä ~R 20–40), harmaa JPEG q90. Pimeät laatat (meri, erämaa) jätetään pois
ja luetellaan index.json:ssa, jolloin natiivi tietää, ettei niitä haeta. Laatta {lat}_{lon}.jpg = lounaiskulma (lat, lon),
ylärivi pohjoisessa. Käyttö: kaupunki_yovalot.py <B1.jpg> <C1.jpg> <ulos>   (VAIN EUROOPPA: lat 34–72, lon −25…45)
"""
import json, os, sys
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
PX = 240                       # px / aste (21600 / 90)
LAT0, LAT1, LON0, LON1 = 34, 72, -25, 45
TAUSTA, PIMEA = 40, 12         # punakanavan tausta; laatta on pimeä, jos kirkkain arvo < PIMEA taustan jälkeen

def osa(lon):                  # B1: lon −90…0, C1: 0…90 (molemmat lat 90…0)
    return 'B1' if lon < 0 else 'C1'

def main(b1, c1, ulos):
    os.makedirs(ulos, exist_ok=True)
    kuvat = {'B1': Image.open(b1).getchannel('R'), 'C1': Image.open(c1).getchannel('R')}
    lut = [0 if v <= TAUSTA else min(255, round((v - TAUSTA) * 255 / (255 - TAUSTA))) for v in range(256)]
    laatat, pimeat = [], 0
    for lat in range(LAT0, LAT1):
        for lon in range(LON0, LON1):
            im = kuvat[osa(lon)]
            x0 = (lon - (-90 if lon < 0 else 0)) * PX
            y0 = (90 - (lat + 1)) * PX
            l = im.crop((x0, y0, x0 + PX, y0 + PX)).point(lut)
            if l.getextrema()[1] < PIMEA: pimeat += 1; continue
            l.save(os.path.join(ulos, f'{lat}_{lon}.jpg'), quality=90, optimize=True)
            laatat.append(f'{lat}_{lon}')
    json.dump({'sarja': 'kaupunki-yovalot', 'versio': '2026-10-06', 'px_aste': PX, 'alue': [LAT0, LAT1, LON0, LON1],
               'muoto': 'jpg harmaa, {lat}_{lon} = lounaiskulma, ylärivi pohjoisessa', 'tausta_r': TAUSTA,
               'lahde': 'NASA Earth Observatory, Black Marble 2016 (VIIRS DNB, Suomi NPP), 500 m', 'lisenssi': 'public domain (NASA)',
               'laatat': laatat}, open(os.path.join(ulos, 'index.json'), 'w'), ensure_ascii=False)
    print(f'yövalot: {len(laatat)} laattaa, {pimeat} pimeää pois')

if __name__ == '__main__':
    main(*sys.argv[1:4])
