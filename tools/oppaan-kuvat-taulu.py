"""Elävän oppaan kuvataulu: ehdokkaat numeroituna ruutuina silmätarkistusta varten.

    python3 tools/oppaan-kuvat-taulu.py <syote.json> <ulos.jpg>

Syöte: [{q, nimi, tiedosto, mitat, lisenssi}]. Jokainen ruutu on 420 px leveä, ylärivillä numero, kohteen nimi ja mitat.
Välimuisti: tiedoston nimen tiiviste (ei järjestysnumeroa, ks. tee-kuvataulu.py:n selitys). Kuva näytetään KOKONAAN
(ei keskirajausta), jotta kuvan kulmiin poltetut vesileimat ja tekstit näkyvät.
"""
import hashlib
import json
import os
import sys
import time
import urllib.parse
import urllib.request

from PIL import Image, ImageDraw

UA = "MatkakirjaOpas/1.0 (https://github.com/ravelius/Matkakirja)"
RUUTU = 420
KORKEUS = 300
OTSAKE = 40
SARAKKEITA = 4
VALIMUISTI = os.path.join(os.environ.get("TMPDIR", "/tmp"), "oppaan-kuvat-valimuisti")


def lataa(tiedosto, leveys=RUUTU * 2):
    os.makedirs(VALIMUISTI, exist_ok=True)
    polku = os.path.join(VALIMUISTI, hashlib.sha1(tiedosto.encode("utf-8")).hexdigest()[:16] + ".jpg")
    if os.path.exists(polku):
        return polku
    osoite = "https://commons.wikimedia.org/wiki/Special:FilePath/" + urllib.parse.quote(tiedosto.replace(" ", "_")) + f"?width={leveys}"
    for yritys in range(6):
        try:
            with urllib.request.urlopen(urllib.request.Request(osoite, headers={"User-Agent": UA}), timeout=60) as v:
                data = v.read()
            with open(polku, "wb") as f:
                f.write(data)
            return polku
        except Exception as e:  # noqa: BLE001
            if yritys == 5:
                print(f"! lataus epäonnistui: {tiedosto}: {e}", file=sys.stderr)
                return None
            time.sleep(2 * (yritys + 1))
    return None


def main():
    syote, ulos = sys.argv[1], sys.argv[2]
    kohteet = json.load(open(syote, encoding="utf-8"))
    rivit = (len(kohteet) + SARAKKEITA - 1) // SARAKKEITA
    kuva = Image.new("RGB", (SARAKKEITA * RUUTU, rivit * (KORKEUS + OTSAKE)), (24, 24, 24))
    piirto = ImageDraw.Draw(kuva)
    for i, k in enumerate(kohteet):
        x = (i % SARAKKEITA) * RUUTU
        y = (i // SARAKKEITA) * (KORKEUS + OTSAKE)
        piirto.rectangle([x, y, x + RUUTU - 2, y + OTSAKE - 2], fill=(60, 60, 60))
        piirto.text((x + 6, y + 4), f"{i + 1}  {k['q']}  {k['nimi'][:34]}", fill=(255, 235, 150))
        piirto.text((x + 6, y + 22), f"{k['mitat']}  {k['lisenssi'][:24]}  {k['tiedosto'][:30]}", fill=(190, 190, 190))
        polku = lataa(k["tiedosto"])
        if not polku:
            piirto.text((x + 20, y + OTSAKE + 20), "EI LATAUTUNUT", fill=(255, 80, 80))
            continue
        try:
            with Image.open(polku) as im:
                im = im.convert("RGB")
                im.thumbnail((RUUTU - 4, KORKEUS - 4))
                kuva.paste(im, (x + 2 + (RUUTU - 4 - im.width) // 2, y + OTSAKE + 2 + (KORKEUS - 4 - im.height) // 2))
        except Exception as e:  # noqa: BLE001
            piirto.text((x + 20, y + OTSAKE + 20), f"VIRHE: {e}"[:50], fill=(255, 80, 80))
    kuva.save(ulos, quality=88)


main()
