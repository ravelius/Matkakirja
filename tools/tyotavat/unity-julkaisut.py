#!/usr/bin/env python3
# UNITY-JULKAISUSEURANTA (Natiiviseppä 10.10.2026, PT 19.5x; omistaja: "kokeillaan aina uusimmalla testi versio").
# Hakee Unityn julkaisurajapinnasta uusimmat editorit ja tulostaa ne, joita ei ole vielä nähty: 6000.7 ja myöhemmät,
# beeta tai lopullinen (ei alfoja). Nähdyt: unity-julkaisut-nahty.txt (yksi versio per rivi).
# Käyttö: unity-julkaisut.py [--alusta]   (--alusta: merkitse nykyiset nähdyiksi, ei tulostetta)
# Tuloste: "UUSI <versio> <päivä> <stream> <julkaisutiedotteen url>" per uusi versio; ei mitään, jos ei uutta.
import json, os, sys, urllib.request

NAHTY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "unity-julkaisut-nahty.txt")
URL = "https://services.api.unity.com/unity/editor/release/v1/releases?limit=25&order=RELEASE_DATE_DESC"

def versio_avain(v):
    p = v.split(".")
    return (int(p[0]), int(p[1]))

with urllib.request.urlopen(URL, timeout=30) as r:
    tulokset = json.load(r).get("results", [])
ehdokkaat = [t for t in tulokset if t.get("stream") != "ALPHA" and versio_avain(t["version"]) >= (6000, 7)]
nahty = set(open(NAHTY).read().split()) if os.path.exists(NAHTY) else set()
uudet = [t for t in ehdokkaat if t["version"] not in nahty]
if "--alusta" not in sys.argv:
    for t in reversed(uudet):
        print("UUSI", t["version"], t["releaseDate"][:10], t["stream"], (t.get("releaseNotes") or {}).get("url", "-"))
with open(NAHTY, "a") as f:
    for t in uudet:
        f.write(t["version"] + "\n")
