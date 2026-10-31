#!/usr/bin/env python3
"""HAALEAT NÄHTÄVYYSPIIRROKSET KYLLÄISEMMIKSI (Karttaseppä 31.10.2026; omistaja 09.14 "Osa rakennuksista on vielä
liian haaleita tälle kartalle", PT).

Osa kohdekartan piirroksista on itsessään vaaleita akvarelleja (Pariisi: Palais Garnier, Orsay, Panthéon,
Sacré-Cœur, Louvre): musteen kylläisyys 0,24–0,27 ja kirkkaus 0,73–0,80, kun kartan kylläisimmät (Notre-Dame,
Tuileries) ovat 0,27–0,34 / 0,64–0,67. Työkalu nostaa vain alle tavoitteen jäävät kohti tavoitetta: kylläisyys,
kirkkaus (gamma) ja kontrasti läpinäkymättömän musteen mukaan, alfa ennallaan (leikkaus ja varjot eivät muutu).
Tulos uutena tiedostona <nimi>-v3.webp (uusi osoite → Cloudflaren 30 päivän välimuisti ei näytä vanhaa).

Käyttö:  python3 -I tools/miniatyyri-kyllaisyys.py [--kirjoita] <kuva.webp> [...]
Ilman --kirjoita vain mittaa ja kertoo kertoimet.
"""
import colorsys
import math
import os
import statistics
import sys

from PIL import Image, ImageEnhance

TAVOITE_KYLL = 0.32     # musteen keskikylläisyys
TAVOITE_KIRK = 0.68     # musteen keskikirkkaus (V)
TAVOITE_KONTR = 0.14    # kirkkauden keskihajonta
KATTO_KYLL, KATTO_KONTR = 1.45, 1.25


def mitat(im):
    pieni = im.resize((256, 256))
    hsv = [colorsys.rgb_to_hsv(r / 255, g / 255, b / 255) for r, g, b, a in pieni.get_flattened_data() if a > 200]
    return (statistics.mean(h[1] for h in hsv), statistics.mean(h[2] for h in hsv),
            statistics.pstdev([h[2] for h in hsv]))


def kyllaista(im):
    kyll, kirk, kontr = mitat(im)
    rgb, alfa = im.convert('RGB'), im.getchannel('A')
    # 1) Kontrasti musteen keskikirkkauden ympäri (ei koko kuvan: läpinäkyvä alue vääristäisi keskikohdan).
    k_kontr = min(KATTO_KONTR, max(1.0, TAVOITE_KONTR / kontr))
    if k_kontr > 1.0:
        m = 255 * kirk
        rgb = rgb.point([max(0, min(255, round(m + k_kontr * (i - m)))) for i in range(256)] * 3)
    # 2) Gamma niin, että musteen keskikirkkaus osuu tavoitteeseen (V^g: valkoiset kohokohdat jäävät valkoisiksi).
    gamma = 1.0
    kirk2 = mitat(Image.merge('RGBA', (*rgb.split(), alfa)))[1]
    if kirk2 > TAVOITE_KIRK:
        gamma = min(1.8, math.log(TAVOITE_KIRK) / math.log(kirk2))
        rgb = rgb.point([round(255 * ((i / 255) ** gamma)) for i in range(256)] * 3)
    # 3) Kylläisyys tavoitteeseen.
    kyll2 = mitat(Image.merge('RGBA', (*rgb.split(), alfa)))[0]
    k_kyll = min(KATTO_KYLL, max(1.0, TAVOITE_KYLL / kyll2))
    if k_kyll > 1.0:
        rgb = ImageEnhance.Color(rgb).enhance(k_kyll)
    tulos = Image.merge('RGBA', (*rgb.split(), alfa))
    return tulos, (kyll, kirk, kontr), mitat(tulos), (gamma, k_kontr, k_kyll)


def main():
    kirjoita = '--kirjoita' in sys.argv
    for polku in [a for a in sys.argv[1:] if not a.startswith('--')]:
        im = Image.open(polku).convert('RGBA')
        tulos, ennen, jalkeen, k = kyllaista(im)
        nimi = os.path.basename(polku)
        print(f"{nimi:42} ennen {ennen[0]:.2f}/{ennen[1]:.2f}/{ennen[2]:.2f} → {jalkeen[0]:.2f}/{jalkeen[1]:.2f}/{jalkeen[2]:.2f}"
              f"  (gamma {k[0]:.2f}, kontrasti {k[1]:.2f}, kylläisyys {k[2]:.2f})")
        if kirjoita:
            ulos = polku[:-5] + '-v3.webp' if polku.endswith('.webp') else polku + '-v3.webp'
            tulos.save(ulos, 'WEBP', quality=92, method=6, exact=True)
            print(f"  → {ulos}")


if __name__ == '__main__':
    main()
