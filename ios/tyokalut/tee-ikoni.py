#!/usr/bin/env python3
"""Piirtää kuoren VÄLIAIKAISEN sovelluskuvakkeen.

Tämä on paikkamerkki, ei lopullinen ikoni: tumma pohja, kultainen kehä ja
kompassiruusu — pelin värit (#1d1610, #e5ac36), mutta ei pelin kuvitusta.
Oikea ikoni piirretään myöhemmin erikseen; silloin tämän tiedoston voi
poistaa ja korvata valmiin PNG:n.

Ajo:  python3 ios/tyokalut/tee-ikoni.py

Kirjoittaa: ios/Matkakirja/Resurssit/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png

iOS tarvitsee vain yhden 1024×1024 kuvan ilman läpinäkyvyyttä ja ilman omia
pyöristyksiä — järjestelmä hoitaa maskin ja pienemmät koot itse.
"""

import math
import os

from PIL import Image, ImageDraw

KOKO = 1024
POHJA = (29, 22, 16)        # #1d1610
HOHDE = (61, 44, 28)        # keskustan lämpö
KULTA = (229, 172, 54)      # #e5ac36
VAALEA_KULTA = (255, 219, 133)


def pohjakuva():
    """Tumma pohja, jonka keskellä on hillitty hehku."""
    kuva = Image.new("RGB", (KOKO, KOKO), POHJA)
    pikselit = kuva.load()
    keski = KOKO / 2
    sade = KOKO * 0.72
    for y in range(KOKO):
        for x in range(KOKO):
            etaisyys = math.hypot(x - keski, y - keski) / sade
            osuus = max(0.0, 1.0 - etaisyys) ** 1.6
            pikselit[x, y] = tuple(
                int(POHJA[i] + (HOHDE[i] - POHJA[i]) * osuus) for i in range(3)
            )
    return kuva


def tahti(piirto, keski, ulko, sisa, sakarat, vari, kierto=0.0):
    """Monisakarainen tähti (kompassiruusu)."""
    pisteet = []
    for i in range(sakarat * 2):
        kulma = math.pi * i / sakarat - math.pi / 2 + kierto
        pituus = ulko if i % 2 == 0 else sisa
        pisteet.append((keski[0] + math.cos(kulma) * pituus,
                        keski[1] + math.sin(kulma) * pituus))
    piirto.polygon(pisteet, fill=vari)


def main():
    # Piirretään nelinkertaisena ja kutistetaan: reunoista tulee pehmeät
    # ilman erillistä pehmennystä.
    tarkkuus = 4
    kuva = pohjakuva().resize((KOKO * tarkkuus, KOKO * tarkkuus), Image.LANCZOS)
    piirto = ImageDraw.Draw(kuva)
    reuna = KOKO * tarkkuus
    keski = (reuna / 2, reuna / 2)

    # Kultainen kehä.
    keha = reuna * 0.34
    paksuus = int(reuna * 0.018)
    piirto.ellipse(
        [keski[0] - keha, keski[1] - keha, keski[0] + keha, keski[1] + keha],
        outline=KULTA, width=paksuus,
    )

    # Kompassiruusu: pitkät pääilmansuunnat ja lyhyemmät väli-ilmansuunnat.
    tahti(piirto, keski, reuna * 0.29, reuna * 0.055, 4, KULTA)
    tahti(piirto, keski, reuna * 0.155, reuna * 0.035, 4, VAALEA_KULTA,
          kierto=math.pi / 4)

    # Napa.
    napa = reuna * 0.028
    piirto.ellipse(
        [keski[0] - napa, keski[1] - napa, keski[0] + napa, keski[1] + napa],
        fill=POHJA,
    )

    kuva = kuva.resize((KOKO, KOKO), Image.LANCZOS).convert("RGB")

    juuri = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    kohde = os.path.join(
        juuri, "Matkakirja", "Resurssit", "Assets.xcassets",
        "AppIcon.appiconset", "AppIcon-1024.png",
    )
    kuva.save(kohde, "PNG", optimize=True)
    print("Kirjoitettu:", kohde)


if __name__ == "__main__":
    main()
