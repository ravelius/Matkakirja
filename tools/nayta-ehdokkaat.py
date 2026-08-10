"""Tulostaa valittujen kuvaehdokkaiden tiedot lisenssiriviä varten.

    python3 tools/nayta-ehdokkaat.py kaukasus 0 1 7 24

Kuvataulusta valitaan numerot silmällä; tämä hakee niille tekijän,
lisenssin ja Commonsin kuvauksen, joista suomenkielinen selite
kirjoitetaan. Tekijä otetaan aina täältä eikä muistista.
"""
import json
import os
import sys

JUURI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

avain = sys.argv[1]
numerot = [int(n) for n in sys.argv[2:]]
with open(os.path.join(JUURI, "tools", "vuorikuva-aineisto", f"{avain}.json"),
          encoding="utf-8") as tiedosto:
    ehdokkaat = json.load(tiedosto)

for n in numerot:
    t = ehdokkaat[n]
    print(f"--- {n} | {t['tiedosto']}")
    print(f"    {t['leveys']}x{t['korkeus']} | {t['lisenssi']} | {t['tekija']!r} | {t['vuosi']!r}")
    print(f"    {t['kuvaus'][:260]}")
