#!/usr/bin/env python3
"""Ihmeen tähden paikka piirroksessa (tools/mittaa-ihmetahdet.mjs kutsuu; Karttaseppä 31.10.2026, KK).

Sama sääntö kuin js/nahtavyydet.js mittaaRajat + piirroksenPaikat: kuva 64 × 64:ksi, muste = alfa > 24,
tähden kohta = ylin muste keskikaistalla (±4 saraketta musteen keskeltä), laatikon koordinaatistossa
(leveä kuva on object-fit: contain -kirjeenä keskellä). Tulostaa JSON-rivin: {"tiedosto": [yla, keski], ...}.

Käyttö: python3 -I tools/ihmetahti-mitta.py <kuva> [<kuva> …]
"""
import json
import sys

from PIL import Image

RUUTU, RAJA, KAISTA = 64, 24, 4


def mittaa(polku):
    kuva = Image.open(polku).convert('RGBA')
    suhde = kuva.width / kuva.height if kuva.height else 1
    s = suhde if suhde > 1 else 1
    alfa = kuva.resize((RUUTU, RUUTU), Image.BILINEAR).split()[3].load()
    muste = [(x, y) for y in range(RUUTU) for x in range(RUUTU) if alfa[x, y] > RAJA]
    if not muste:
        return [0.0, 0.5]
    vasen = min(x for x, _ in muste)
    oikea = max(x for x, _ in muste)
    yla = min(y for _, y in muste)
    c = (vasen + oikea) // 2
    kaistalla = [y for x, y in muste if max(vasen, c - KAISTA) <= x <= min(oikea, c + KAISTA)]
    y = min(kaistalla) if kaistalla else yla
    return [round(((1 - 1 / s) / 2) + (y / RUUTU) / s, 3), round((vasen + oikea + 1) / (2 * RUUTU), 3)]


print(json.dumps({p: mittaa(p) for p in sys.argv[1:]}))
