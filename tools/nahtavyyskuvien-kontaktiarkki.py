#!/usr/bin/env python3
"""
Nähtävyyskuvien ennen/jälkeen-kontaktiarkit (Sisältökirjuri, 27.9.2026).

Piirtää valituille kaupungeille ruudukon, jossa jokainen paikallinen kuva
näkyy PARINA: alkuperäinen (ENNEN) vasemmalla, tasattu (JÄLKEEN) oikealla.
Jokaisen parin alla lukee tiedostonimi, sukupolvi ja kylläisyys ennen→jälkeen.
Tarkoitus on antaa omistajalle silmämääräinen näyte tools/
nahtavyyskuvien-tasaus.py:n vaikutuksesta ENNEN kuin mitään korvataan
tuotannossa.

Käyttö:
    python3 tools/nahtavyyskuvien-kontaktiarkki.py \
        --ennen assets/kartat/miniatyyrit \
        --jalkeen /tmp/miniatyyrit-tasattu \
        --raportti /tmp/tasaus-raportti.json \
        --map /tmp/miniatyyrit-map.json \
        --kaupungit pariisi lontoo helsinki wien madrid rooma \
        --ulos docs/raportit/kuvat/nahtavyyskuvien-tasaus-20260927
"""
import argparse
import json
import os

from PIL import Image, ImageDraw, ImageFont

THUMB = 180
PAD = 10
RIVIN_KORKEUS_TEKSTI = 46
SARAKKEET = 4  # montako kuva-paria per rivi kontaktiarkissa


def lataa_fontti(koko):
    for nimi in ("/System/Library/Fonts/Supplemental/Arial.ttf", "/System/Library/Fonts/Helvetica.ttc"):
        if os.path.exists(nimi):
            try:
                return ImageFont.truetype(nimi, koko)
            except Exception:  # noqa: BLE001
                pass
    return ImageFont.load_default()


def taustoita(im, koko=THUMB):
    """Sovittaa kuvan neliöön säilyttäen kuvasuhteen, tausta shakkiruudulla
    (jotta läpinäkyvyys näkyy kontaktiarkissa)."""
    im = im.convert("RGBA")
    im.thumbnail((koko, koko), Image.LANCZOS)
    tausta = Image.new("RGBA", (koko, koko), (235, 235, 235, 255))
    px = tausta.load()
    ruutu = 10
    for y in range(0, koko, ruutu):
        for x in range(0, koko, ruutu):
            if ((x // ruutu) + (y // ruutu)) % 2 == 0:
                for yy in range(y, min(y + ruutu, koko)):
                    for xx in range(x, min(x + ruutu, koko)):
                        px[xx, yy] = (215, 215, 215, 255)
    ox, oy = (koko - im.width) // 2, (koko - im.height) // 2
    tausta.alpha_composite(im, (ox, oy))
    return tausta


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ennen", required=True)
    ap.add_argument("--jalkeen", required=True)
    ap.add_argument("--raportti", required=True, help="tasaus-raportti.json (kerroin + kyllaisyys per tiedosto)")
    ap.add_argument("--map", required=True)
    ap.add_argument("--kaupungit", nargs="+", required=True)
    ap.add_argument("--ulos", required=True)
    args = ap.parse_args()

    os.makedirs(args.ulos, exist_ok=True)
    raportti = {r["tiedostonimi"]: r for r in json.load(open(args.raportti, encoding="utf-8"))}
    kartta_rows = json.load(open(args.map, encoding="utf-8"))
    fontti = lataa_fontti(13)
    fontti_otsikko = lataa_fontti(20)

    for kaupunki in args.kaupungit:
        kuvat = sorted(
            (r for r in kartta_rows
             if r.get("onPolku") and r.get("kaupunki") == kaupunki and r["tiedostonimi"] in raportti),
            key=lambda r: r["tiedostonimi"])
        if not kuvat:
            print(f"EI KUVIA: {kaupunki}")
            continue
        n = len(kuvat)
        rivit = (n + SARAKKEET - 1) // SARAKKEET
        parin_leveys = THUMB * 2 + PAD
        leveys = SARAKKEET * (parin_leveys + PAD) + PAD
        korkeus = 50 + rivit * (THUMB + RIVIN_KORKEUS_TEKSTI + PAD) + PAD
        arkki = Image.new("RGB", (leveys, korkeus), (255, 255, 255))
        piirto = ImageDraw.Draw(arkki)
        piirto.text((PAD, 12), f"{kaupunki} — ennen | jälkeen ({n} kuvaa)", fill=(0, 0, 0), font=fontti_otsikko)

        for i, rivi in enumerate(kuvat):
            f = rivi["tiedostonimi"]
            rep = raportti[f]
            rv, sar = divmod(i, SARAKKEET)
            x0 = PAD + sar * (parin_leveys + PAD)
            y0 = 50 + rv * (THUMB + RIVIN_KORKEUS_TEKSTI + PAD)
            try:
                ennen_im = taustoita(Image.open(os.path.join(args.ennen, f)))
            except Exception:  # noqa: BLE001
                ennen_im = Image.new("RGBA", (THUMB, THUMB), (255, 0, 0, 255))
            try:
                jalkeen_im = taustoita(Image.open(os.path.join(args.jalkeen, f)))
            except Exception:  # noqa: BLE001
                jalkeen_im = Image.new("RGBA", (THUMB, THUMB), (255, 0, 0, 255))
            arkki.paste(ennen_im, (x0, y0), ennen_im)
            arkki.paste(jalkeen_im, (x0 + THUMB, y0), jalkeen_im)
            piirto.rectangle([x0, y0, x0 + THUMB * 2, y0 + THUMB], outline=(180, 180, 180))
            piirto.line([(x0 + THUMB, y0), (x0 + THUMB, y0 + THUMB)], fill=(120, 120, 120))
            nimi_lyhyt = rip = f.replace(f"{kaupunki}-", "").rsplit(".", 1)[0]
            teksti = f"{nimi_lyhyt}\n{rep['sukupolvi'][:14]} {rep['kyllaisyys_ennen']:.3f}→{rep['kyllaisyys_jalkeen']:.3f}"
            piirto.text((x0, y0 + THUMB + 2), teksti, fill=(0, 0, 0), font=fontti)

        ulospolku = os.path.join(args.ulos, f"kontaktiarkki-{kaupunki}.png")
        arkki.save(ulospolku)
        print(f"{kaupunki}: {n} kuvaa -> {ulospolku}")


if __name__ == "__main__":
    main()
