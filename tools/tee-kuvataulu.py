"""Kokoaa vuorikuvien ehdokkaista kuvataulun silmätarkistusta varten.

    python3 tools/tee-kuvataulu.py kaukasus            # ehdokkaat 0-8
    python3 tools/tee-kuvataulu.py kaukasus 9 18       # seuraava sivu
    python3 tools/tee-kuvataulu.py kaukasus --koko 0 4 7   # valitut kokonaan

Kolmas muoto on VESILEIMATARKISTUS. Tavallinen taulu rajaa ruudut
keskeltä, joten kuvan kulmaan poltettu nimi voi jäädä rajauksen
ulkopuolelle — Karpaateilla puolet ehdokkaista oli erään valokuvaajan
vesileimattuja, ja osa leimoista näkyi vain kokonaisessa kuvassa.
Valitut kuvat katsotaan siis vielä kerran kokonaisina ennen hyväksyntää.

Kuvatarkastus on tämän työn ainoa oikea portti: väärä vuori, vesileima
ja pehmeä tarkennus eivät näy tiedostonimessä eivätkä lisenssikentässä.
Yksi kuva kerrallaan katsominen olisi kuitenkin satojen kuvien urakka,
joten ehdokkaat ladotaan yhdeksän ruudun tauluksi. Jokainen ruutu on
480 pikseliä leveä — sama mitta kuin julkaisusääntöjen silmätarkistus —
ja ruudun yläreunassa on ehdokkaan numero, jotta valinnat voi merkitä.

Taulut kirjoitetaan tools/vuorikuva-taulut/ ja ne ovat väliaikaisia:
kansio on .gitignoressa eikä sitä viedä repoon.
"""
import hashlib
import json
import os
import sys
import time
import urllib.error
import urllib.request

from PIL import Image, ImageDraw

JUURI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AINEISTO = os.path.join(JUURI, "tools", "vuorikuva-aineisto")
TAULUT = os.path.join(JUURI, "tools", "vuorikuva-taulut")
VALIMUISTI = os.path.join(TAULUT, "kuvat")
UA = "Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)"

RUUTU = 480          # ruudun leveys pikseleinä
KORKEUS = 340        # ruudun korkeus; ylimenevä osa rajataan keskeltä
OTSAKE = 26          # numerorivin korkeus


def thumb_url(t, leveys=RUUTU):
    """Ehdokkaan pikkukuvaosoite pyydetyssä leveydessä."""
    osoite = t.get("thumb")
    if not osoite:
        return None
    return osoite.replace("/800px-", f"/{leveys}px-")


def valimuistinimi(tiedosto):
    """Välimuistin tiedostonimi Commonsin tiedostonimestä.

    EI ehdokkaan järjestysnumeroa. Numero vaihtuu, kun ehdokaslista
    haetaan uudelleen — ja silloin välimuistista tuli väärä kuva
    väärällä nimilapulla. Se ehti kerran sotkea Kaukasuksen taulun:
    kolme ruutua oli edellisen haun kuvia. Tiivisteavain ei voi mennä
    väärin, koska se on kuvan oma nimi.
    """
    return f"{hashlib.sha1(tiedosto.encode('utf-8')).hexdigest()[:16]}.jpg"


def lataa(osoite, polku):
    """Pikkukuva levylle, 429 odotetaan pois.

    Wikimedia rajoittaa peräkkäisiä hakuja, ja ilman odotusta taulusta
    tuli puolityhjä: ruutuja jäi mustaksi ja koko kohde näytti siltä
    kuin siitä ei olisi kuvia. Tyhjä ruutu on pahin mahdollinen virhe
    tässä työssä — se johtaa hylkäämään kelvollisen kuvan sitä
    näkemättä.
    """
    if os.path.exists(polku):
        return polku
    pyynto = urllib.request.Request(osoite, headers={"User-Agent": UA})
    for yritys in range(5):
        try:
            with urllib.request.urlopen(pyynto, timeout=60) as vastaus:
                data = vastaus.read()
            break
        except urllib.error.HTTPError as virhe:
            if virhe.code != 429 or yritys == 4:
                raise
            time.sleep(5 * (yritys + 1))
    with open(polku, "wb") as tiedosto:
        tiedosto.write(data)
    time.sleep(0.4)
    return polku


def sovita_kokonaan(kuva):
    """Koko kuva ruutuun mahtuvaksi, reunoille musta palkki.

    Vesileima on melkein aina kulmassa, joten rajaamaton kuva on ainoa
    tapa nähdä se varmasti.
    """
    suhde = min(RUUTU / kuva.width, KORKEUS / kuva.height)
    uusi = kuva.resize(
        (max(1, round(kuva.width * suhde)), max(1, round(kuva.height * suhde))),
        Image.LANCZOS,
    )
    pohja = Image.new("RGB", (RUUTU, KORKEUS), (12, 12, 14))
    pohja.paste(uusi, ((RUUTU - uusi.width) // 2, (KORKEUS - uusi.height) // 2))
    return pohja


def sovita(kuva):
    """Ruudun kokoiseksi: skaalataan täyttäen ja rajataan keskeltä."""
    suhde = max(RUUTU / kuva.width, KORKEUS / kuva.height)
    uusi = kuva.resize(
        (max(1, round(kuva.width * suhde)), max(1, round(kuva.height * suhde))),
        Image.LANCZOS,
    )
    x = (uusi.width - RUUTU) // 2
    y = (uusi.height - KORKEUS) // 2
    return uusi.crop((x, y, x + RUUTU, y + KORKEUS))


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    avain = sys.argv[1]
    kokonaan = "--koko" in sys.argv
    luvut = [int(a) for a in sys.argv[2:] if a.lstrip("-").isdigit()]

    with open(os.path.join(AINEISTO, f"{avain}.json"), encoding="utf-8") as tiedosto:
        ehdokkaat = json.load(tiedosto)
    os.makedirs(VALIMUISTI, exist_ok=True)

    if kokonaan:
        alku = luvut[0] if luvut else 0
        valitut = [(n, ehdokkaat[n]) for n in luvut]
    else:
        alku = luvut[0] if luvut else 0
        loppu = luvut[1] if len(luvut) > 1 else alku + 9
        valitut = list(enumerate(ehdokkaat))[alku:loppu]
    sarakkeita = 3
    riveja = (len(valitut) + sarakkeita - 1) // sarakkeita
    taulu = Image.new(
        "RGB",
        (sarakkeita * RUUTU, riveja * (KORKEUS + OTSAKE)),
        (24, 24, 28),
    )
    piirto = ImageDraw.Draw(taulu)

    for kohta, (numero, t) in enumerate(valitut):
        osoite = thumb_url(t)
        if not osoite:
            continue
        polku = os.path.join(VALIMUISTI, valimuistinimi(t["tiedosto"]))
        try:
            lataa(osoite, polku)
            with Image.open(polku) as kuva:
                rgb = kuva.convert("RGB")
                ruutu = sovita_kokonaan(rgb) if kokonaan else sovita(rgb)
        except Exception as virhe:              # noqa: BLE001 - taulu ei saa kaatua
            print(f"  {numero}: lataus ei onnistunut ({virhe})")
            continue
        x = (kohta % sarakkeita) * RUUTU
        y = (kohta // sarakkeita) * (KORKEUS + OTSAKE)
        piirto.text((x + 6, y + 6), f"{numero}  {t['tiedosto'][:56]}", fill=(235, 235, 240))
        taulu.paste(ruutu, (x, y + OTSAKE))

    ulos = os.path.join(TAULUT, f"{avain}-{'koko-' if kokonaan else ''}{alku}.jpg")
    taulu.save(ulos, quality=88)
    print(ulos)


if __name__ == "__main__":
    main()
