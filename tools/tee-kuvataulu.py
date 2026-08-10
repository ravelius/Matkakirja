"""Kokoaa vuorikuvien ehdokkaista kuvataulun silmätarkistusta varten.

    python3 tools/tee-kuvataulu.py kaukasus            # ehdokkaat 0-8
    python3 tools/tee-kuvataulu.py kaukasus 9 18       # seuraava sivu

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
    if os.path.exists(polku):
        return polku
    pyynto = urllib.request.Request(osoite, headers={"User-Agent": UA})
    with urllib.request.urlopen(pyynto, timeout=60) as vastaus:
        data = vastaus.read()
    with open(polku, "wb") as tiedosto:
        tiedosto.write(data)
    return polku


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
    alku = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    loppu = int(sys.argv[3]) if len(sys.argv) > 3 else alku + 9

    with open(os.path.join(AINEISTO, f"{avain}.json"), encoding="utf-8") as tiedosto:
        ehdokkaat = json.load(tiedosto)
    os.makedirs(VALIMUISTI, exist_ok=True)

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
                ruutu = sovita(kuva.convert("RGB"))
        except Exception as virhe:              # noqa: BLE001 - taulu ei saa kaatua
            print(f"  {numero}: lataus ei onnistunut ({virhe})")
            continue
        x = (kohta % sarakkeita) * RUUTU
        y = (kohta // sarakkeita) * (KORKEUS + OTSAKE)
        piirto.text((x + 6, y + 6), f"{numero}  {t['tiedosto'][:56]}", fill=(235, 235, 240))
        taulu.paste(ruutu, (x, y + OTSAKE))

    ulos = os.path.join(TAULUT, f"{avain}-{alku}.jpg")
    taulu.save(ulos, quality=88)
    print(ulos)


if __name__ == "__main__":
    main()
