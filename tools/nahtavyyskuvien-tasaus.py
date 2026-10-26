#!/usr/bin/env python3
"""
Nähtävyyskuvien koneellinen tyylin tasaus (Sisältökirjuri, 27.9.2026).

Omistajan päätös (Fablen välittämänä 27.9.2026): tasaa kaikkien paikallisten
miniatyyrikuvien kylläisyys väriKORJATUN (-vari2) referenssiryhmän tasolle
(tavoite S-mediaani 0,332), koska paikallinen aineisto jakautuu kahteen
sukupolveen jotka poikkeavat tavoitteesta VASTAKKAISIIN suuntiin (ks.
docs/raportit/nahtavyyskuvien-tyyli-20260927.md kohta 2.1):
  - "vanha/muu mitta" (n=363, mediaani 0,243) — liian haalea, nostetaan.
  - "Codex-kohtaus (korjaamaton)" (n=86, mediaani 0,417) — liian värikäs,
    lasketaan.

MENETELMÄ (kaksi vaihetta, koska pelkkä lineaarinen sukupolvikerroin EI voi
korjata yksittäisiä poikkeamia — mikä tahansa lineaarinen skaalaus säilyttää
jokaisen kuvan suhteellisen z-arvon omassa sukupolvessaan muuttumattomana,
todennettu simulaatiolla ennen tätä versiota):
  1) Sukupolvikerroin siirtää koko sukupolven mediaanin tavoitteeseen
     (S_uusi = S_vanha × kerroin, ks. SUKUPOLVI_MEDIAANI).
  2) Jos yksittäisen kuvan sisällön KESKIMÄÄRÄINEN kylläisyys jää vaiheen 1
     jälkeen tavoitekaistan [tavoite ± VYOHYKE_KERROIN × tavoite_hajonta]
     ulkopuolelle, sitä vedetään lisäksi lähemmäs kaistan reunaa (vaimennus
     VAIMENNUS, ei täyttä litistystä — jättää hieman luonnollista vaihtelua).
     Simulaatio (docs/raportit/nahtavyyskuvien-mittarit-20260927.json-datalla,
     VYOHYKE_KERROIN=1,0): poikkeamien määrä 42 → 16, kaikki jäljelle jäävät
     ovat "vanha/muu mitta" -sukupolven aiemmin jo silmämääräisesti liian
     värikkäitä kuvia (Codex-kohtaus-sukupolvi: 0 jäljellä).
Molemmat vaiheet sovelletaan yhtenä kerroimena per kuva VAIN "sisältö"-
pikseleihin (ei-läpinäkyvät JA ei-lähes-valkoiset, sama maski kuin
tyylimittarissa). Tausta, läpinäkyvyys ja tumma viivapiirros (S jo lähellä
nollaa) jäävät koskemattomiksi. Vain S-kanavaa (HSV) muutetaan — V (kirkkaus)
säilyy, joten kontrasti ei muutu.

TÄMÄ SKRIPTI EI KIRJOITA TUOTANTOKANSIOON. Tulos menee --ulos-kansioon
(oletus: tilapäinen), jotta omistaja voi katsoa ennen/jälkeen-kontaktiarkit
ennen kuin mitään korvataan (ks. tools/nahtavyyskuvien-kontaktiarkki.py).

Käyttö:
    python3 tools/nahtavyyskuvien-tasaus.py \
        --kansio assets/kartat/miniatyyrit \
        --map /tmp/miniatyyrit-map.json \
        --ulos /tmp/miniatyyrit-tasattu \
        [--tavoite 0.332] [--vain onPolku-tiedostonimet.txt]
"""
import argparse
import colorsys
import json
import os
import sys

from PIL import Image

LAHES_VALKOINEN_KYNNYS = 235
ALFA_LAPINAKYVA_KYNNYS = 12

# Nykyiset sukupolvimediaanit (docs/raportit/nahtavyyskuvien-tyyli-20260927.md
# kohta 2.1) — käytetään kertoimen laskentaan jos --tavoite annetaan ilman
# --lahtomediaani-ohituksia.
SUKUPOLVI_MEDIAANI = {
    "vanha/muu mitta": 0.243,
    "Codex-kohtaus (korjaamaton)": 0.417,
    "värikorjattu": 0.332,  # ei paikallisia tiedostoja, kerroin pysyy 1.0
}
TAVOITE_HAJONTA = 0.071  # väriKORJATUN referenssiryhmän oma keskihajonta
VYOHYKE_KERROIN = 1.0    # kaista = tavoite ± VYOHYKE_KERROIN × TAVOITE_HAJONTA
VAIMENNUS = 0.15         # kuinka paljon kaistan ULKOPUOLELLE jäävästä osasta jää jäljelle


def lataa_map(polku):
    if not polku or not os.path.exists(polku):
        return {}, set()
    rows = json.load(open(polku, encoding="utf-8"))
    kartta = {}
    aktiiviset = set()
    for r in rows:
        if r.get("onPolku") and r.get("tiedostonimi"):
            kartta[r["tiedostonimi"]] = {"kaupunki": r["kaupunki"], "kohde": r["kohde"]}
            aktiiviset.add(r["tiedostonimi"])
    return kartta, aktiiviset


def sukupolvi(tiedostonimi, koko):
    if "-vari2" in tiedostonimi:
        return "värikorjattu"
    if koko != (512, 512):
        return "vanha/muu mitta"
    return "Codex-kohtaus (korjaamaton)"


def rgba_arvo(px):
    if len(px) == 4:
        return px
    return (px[0], px[1], px[2], 255)


def onko_lahes_valkoinen(r, g, b):
    return min(r, g, b) >= LAHES_VALKOINEN_KYNNYS


def paata_kerroin(oma_kylla, sukupolvi_kerroin, tavoite):
    """Vaihe 1 (sukupolvikerroin) + vaihe 2 (kaistavedon lisäkerroin).
    Palauttaa (lopullinen_kerroin, vaihe1_arvio)."""
    if oma_kylla <= 0:
        return sukupolvi_kerroin, 0.0
    s1_arvio = oma_kylla * sukupolvi_kerroin
    matala, korkea = tavoite - VYOHYKE_KERROIN * TAVOITE_HAJONTA, tavoite + VYOHYKE_KERROIN * TAVOITE_HAJONTA
    if s1_arvio > korkea:
        tavoite_arvo = korkea + (s1_arvio - korkea) * VAIMENNUS
    elif s1_arvio < matala:
        tavoite_arvo = matala - (matala - s1_arvio) * VAIMENNUS
    else:
        tavoite_arvo = s1_arvio
    return tavoite_arvo / oma_kylla, s1_arvio


def mittaa_sisalto(im):
    """Palauttaa sisältöpikselien keskimääräisen S-arvon (kevyt, näytteistetty)."""
    w, h = im.size
    px = im.load()
    askel = 2 if (w * h) > 90000 else 1
    summa = 0.0
    n = 0
    for y in range(0, h, askel):
        for x in range(0, w, askel):
            r, g, b, a = rgba_arvo(px[x, y])
            if a < ALFA_LAPINAKYVA_KYNNYS or onko_lahes_valkoinen(r, g, b):
                continue
            _, s, _ = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
            summa += s
            n += 1
    return (summa / n) if n else 0.0


def tasaa_kuva(im, kerroin):
    """Skaalaa HSV S-kanavaa kertoimella vain sisältöpikseleille. Palauttaa
    (uusi_kuva, jalkeen_kyll) — koko kuvan (ei näytteistetty) jälkeen-arvo."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()
    jalkeen_summa = 0.0
    n_sisalto = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = rgba_arvo(px[x, y])
            if a < ALFA_LAPINAKYVA_KYNNYS or onko_lahes_valkoinen(r, g, b):
                continue
            n_sisalto += 1
            hh, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
            s2 = min(1.0, s * kerroin)
            jalkeen_summa += s2
            if abs(s2 - s) < 1e-4:
                continue
            r2, g2, b2 = colorsys.hsv_to_rgb(hh, s2, v)
            px[x, y] = (int(round(r2 * 255)), int(round(g2 * 255)), int(round(b2 * 255)), a)
    jalkeen = jalkeen_summa / n_sisalto if n_sisalto else 0.0
    return im, jalkeen


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--kansio", required=True)
    ap.add_argument("--map", required=True, help="Sama map-JSON kuin tyylimittarissa (vain onPolku-rivit käytetään)")
    ap.add_argument("--ulos", required=True, help="Kansio korjatuille kuville (EI tuotantokansio)")
    ap.add_argument("--tavoite", type=float, default=0.332)
    ap.add_argument("--raportti", required=True, help="JSON: ennen/jälkeen kylläisyys per tiedosto")
    args = ap.parse_args()

    _, aktiiviset = lataa_map(args.map)
    if not aktiiviset:
        print("VIRHE: map ei tuottanut aktiivisia (onPolku) tiedostoja", file=sys.stderr)
        sys.exit(1)

    os.makedirs(args.ulos, exist_ok=True)
    kerroin_vanha = args.tavoite / SUKUPOLVI_MEDIAANI["vanha/muu mitta"]
    kerroin_codex = args.tavoite / SUKUPOLVI_MEDIAANI["Codex-kohtaus (korjaamaton)"]
    print(f"Kerroin vanha/muu mitta: {kerroin_vanha:.4f}, Codex-kohtaus: {kerroin_codex:.4f}", file=sys.stderr)

    tulokset = []
    tiedostot = sorted(f for f in os.listdir(args.kansio) if f in aktiiviset)
    ohitettu = 0
    for i, f in enumerate(tiedostot):
        polku = os.path.join(args.kansio, f)
        try:
            im = Image.open(polku)
            im.load()
        except Exception as exc:  # noqa: BLE001
            print(f"OHITETTU {f}: {exc}", file=sys.stderr)
            ohitettu += 1
            continue
        sp = sukupolvi(f, im.size)
        if sp == "vanha/muu mitta":
            sukupolvi_kerroin = kerroin_vanha
        elif sp == "Codex-kohtaus (korjaamaton)":
            sukupolvi_kerroin = kerroin_codex
        else:
            sukupolvi_kerroin = 1.0
        oma_kylla = mittaa_sisalto(im.convert("RGBA"))
        kerroin, vaihe1_arvio = paata_kerroin(oma_kylla, sukupolvi_kerroin, args.tavoite)
        uusi, jalkeen = tasaa_kuva(im, kerroin)
        ulospolku = os.path.join(args.ulos, f)
        # Tallenna alkuperäisessä muodossa (webp/png), häviötön
        muoto = "WEBP" if f.lower().endswith(".webp") else "PNG"
        tallenna_kwargs = {"lossless": True} if muoto == "WEBP" else {}
        uusi.save(ulospolku, muoto, **tallenna_kwargs)
        tulokset.append({
            "tiedostonimi": f,
            "sukupolvi": sp,
            "kerroin": round(kerroin, 4),
            "kyllaisyys_ennen": round(oma_kylla, 4),
            "kyllaisyys_vaihe1": round(vaihe1_arvio, 4),
            "kyllaisyys_jalkeen": round(jalkeen, 4),
        })
        if (i + 1) % 50 == 0:
            print(f"...{i + 1}/{len(tiedostot)}", file=sys.stderr)

    with open(args.raportti, "w", encoding="utf-8") as fh:
        json.dump(tulokset, fh, ensure_ascii=False, indent=1)
    print(f"Käsitelty {len(tulokset)} kuvaa ({ohitettu} ohitettu) -> {args.ulos}")
    print(f"Raportti -> {args.raportti}")


if __name__ == "__main__":
    main()
