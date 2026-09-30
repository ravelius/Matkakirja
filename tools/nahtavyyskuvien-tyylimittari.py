#!/usr/bin/env python3
"""
Nähtävyyskuvien tyylimittari (Sisältökirjuri, 27.9.2026).

Laskee jokaiselle kohdekartan miniatyyrikuvalle koneellisen mittarin:
kylläisyys, täyttö, tausta ja tyylisukupolvi. Tarkoitus on TUNNISTAA
tyylipoikkeamia (liian värikäs, maalattu tausta, väärä mitta) — EI
korjata mitään kuvaa. Ks. docs/raportit/nahtavyyskuvien-tyyli-20260927.md.

Käyttö (kaksivaiheinen — ks. tools/nahtavyyskuvien-kartta-json.mjs):

    node tools/nahtavyyskuvien-kartta-json.mjs > /tmp/miniatyyrit-map.json

    # HUOM (löydös 27.9.2026): kaikki tähän mennessä väriKORJATUT (-vari2)
    # miniatyyrit ovat VAIN R2-ämpärissä, ei paikallisessa
    # assets/kartat/miniatyyrit/-kansiossa (js/media.js R2_ASSETIT.miniatyyrit
    # = true, ja -vari2-nimet ovat aina "pelkkä tunnus" -muodossa). Jos haluat
    # referenssiryhmän (lähinnä LUEMINUT.md:n tavoitetyyliä) mukaan
    # tilastoihin, lataa ne ensin (ks. edellisen tiedoston ohje):
    #   node tools/nahtavyyskuvien-kartta-json.mjs --vain-vari2-tunnukset \
    #     > /tmp/vari2-tunnukset.txt
    #   mkdir -p /tmp/vari2ref && cd /tmp/vari2ref
    #   xargs -P 12 -I{} curl -sS -o {}.png \
    #     "https://media.matkakirja.app/kohtaamiset/miniatyyrit/{}.png" \
    #     < /tmp/vari2-tunnukset.txt

    python3 tools/nahtavyyskuvien-tyylimittari.py \
        --kansio assets/kartat/miniatyyrit \
        --map /tmp/miniatyyrit-map.json \
        --ulos docs/raportit/nahtavyyskuvien-mittarit-20260927.json \
        [--lisakansio /tmp/vari2ref]

--map on JSON-taulukko [{kaupunki, kohde, arvo, onPolku, tiedostonimi, tunnus}, ...]
joka on tuotettu tuomalla js/packs/miniatyyrit.js Node.js:llä (MINIATYYRIT-taulu).
Tämä skripti ei itse jäsennä JS-tiedostoa, koska se on turvallisempaa tehdä
oikealla JS-tulkilla (Node) kuin regexillä. --lisakansio-kuvien sukupolvi
tunnistetaan automaattisesti tiedostonimestä (-vari2 → "värikorjattu"),
joten --lisasukupolvi-lippua ei yleensä tarvita.

Reunan (taustan) tunnistus: näytteistää kuvan ulomman n. 6 %:n kehän
pikselit (reunanauha). Jos kehä on suurimmaksi osaksi läpinäkyvä
(alfa < 12) → "läpinäkyvä". Jos kehä on lähes yksivärinen (RGB-keskihajonta
kehällä pieni) → "valkoinen tausta" (myös silloin kun väri ei ole aivan
puhdas valkoinen — merkitään sellöin lisäksi reuna_vari-kenttään).
Muuten → "maalattu tausta" (kehä vaihtelee: kuvioitu/maalattu maisema
ulottuu reunaan asti).

Kylläisyys lasketaan HSV-värimallin S-kanavasta VAIN "sisältö"-pikseleistä
(ei-läpinäkyvät JA ei-lähes-valkoiset pikselit), koska tausta ei saa
vääristää kuvitusosan väri-intensiteetin arviota.

Täyttö = sisältöpikselien osuus koko 512x512-ruudusta (karkea arvio
kuinka lähelle reunoja kuvitus ulottuu).
"""
import argparse
import json
import os
import sys
import colorsys
from statistics import mean, pstdev

from PIL import Image

LAHES_VALKOINEN_KYNNYS = 235  # min(R,G,B) tämän yli -> "lähes valkoinen"
ALFA_LAPINAKYVA_KYNNYS = 12   # alfa tämän alle -> "läpinäkyvä" pikseli
KEHAN_OSUUS = 0.06            # reunanauhan leveys suhteessa kuvan kokoon


def lataa_map(polku):
    if not polku or not os.path.exists(polku):
        return {}
    rows = json.load(open(polku, encoding="utf-8"))
    kartta = {}
    for r in rows:
        if r.get("onPolku") and r.get("tiedostonimi"):
            kartta[r["tiedostonimi"]] = {"kaupunki": r["kaupunki"], "kohde": r["kohde"]}
        elif not r.get("onPolku") and r.get("tunnus"):
            # R2-only tunnus: liitetään .png-nimellä, jos ladattu referenssiksi
            kartta[f"{r['tunnus']}.png"] = {"kaupunki": r["kaupunki"], "kohde": r["kohde"]}
    return kartta


def kehan_pikselit(im, kehan_osuus=KEHAN_OSUUS):
    """Palauttaa listan (r,g,b,a) kuvan ulomman kehän pikseleistä (näyte)."""
    w, h = im.size
    kaista = max(2, int(round(min(w, h) * kehan_osuus)))
    px = im.load()
    tulokset = []
    askel = max(1, w // 128)  # näytteistetään harvakseltaan nopeuden vuoksi
    for x in range(0, w, askel):
        for y in list(range(0, kaista)) + list(range(h - kaista, h)):
            tulokset.append(px[x, y])
    askel2 = max(1, h // 128)
    for y in range(0, h, askel2):
        for x in list(range(0, kaista)) + list(range(w - kaista, w)):
            tulokset.append(px[x, y])
    return tulokset


def onko_lahes_valkoinen(r, g, b):
    return min(r, g, b) >= LAHES_VALKOINEN_KYNNYS


def rgba_arvo(px):
    if len(px) == 4:
        return px
    return (px[0], px[1], px[2], 255)


def analysoi_tausta(kehapikselit):
    n = len(kehapikselit)
    if n == 0:
        return "tuntematon", None
    lapinakyvia = sum(1 for p in kehapikselit if rgba_arvo(p)[3] < ALFA_LAPINAKYVA_KYNNYS)
    if lapinakyvia / n >= 0.5:
        return "läpinäkyvä", None
    # Vain opaakit (tai lähes opaakit) reunapikselit mukaan värianalyysiin
    opaakit = [rgba_arvo(p) for p in kehapikselit if rgba_arvo(p)[3] >= ALFA_LAPINAKYVA_KYNNYS]
    if not opaakit:
        return "läpinäkyvä", None
    rs = [p[0] for p in opaakit]
    gs = [p[1] for p in opaakit]
    bs = [p[2] for p in opaakit]
    keski = (mean(rs), mean(gs), mean(bs))
    hajonta = mean([pstdev(rs), pstdev(gs), pstdev(bs)])
    reuna_hex = "#%02x%02x%02x" % tuple(int(round(k)) for k in keski)
    if hajonta <= 10:
        return "valkoinen tausta", reuna_hex
    return "maalattu tausta", reuna_hex


def analysoi_sisalto(im):
    """Kylläisyys (sisältöpikseleistä) ja täyttö (sisältöpikselien osuus)."""
    w, h = im.size
    px = im.load()
    yhteensa = 0
    sisalto = 0
    s_summa = 0.0
    # Näytteistetään joka toinen pikseli nopeuden vuoksi (riittää tilastoon)
    askel = 2 if (w * h) > 90000 else 1
    for y in range(0, h, askel):
        for x in range(0, w, askel):
            r, g, b, a = rgba_arvo(px[x, y])
            yhteensa += 1
            if a < ALFA_LAPINAKYVA_KYNNYS:
                continue
            if onko_lahes_valkoinen(r, g, b):
                continue
            sisalto += 1
            _, s, _ = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)
            s_summa += s
    tayttö = sisalto / yhteensa if yhteensa else 0.0
    kyllaisyys = (s_summa / sisalto) if sisalto else 0.0
    return kyllaisyys, tayttö


def sukupolvi(tiedostonimi, koko):
    if "-vari2" in tiedostonimi:
        return "värikorjattu"
    if koko != (512, 512):
        return "vanha/muu mitta"
    return "Codex-kohtaus (korjaamaton)"


def kasittele_kuva(polku, tiedostonimi, kartta, pakotettu_sukupolvi=None):
    try:
        im = Image.open(polku)
        im.load()
    except Exception as exc:  # noqa: BLE001
        return {"tiedostonimi": tiedostonimi, "virhe": str(exc)}
    koko = im.size
    if im.mode not in ("RGBA", "RGBA;16"):
        im = im.convert("RGBA")
    kylla, tayttö = analysoi_sisalto(im)
    tausta, reuna_hex = analysoi_tausta(kehan_pikselit(im))
    sp = pakotettu_sukupolvi or sukupolvi(tiedostonimi, koko)
    tiedot = kartta.get(tiedostonimi, {})
    return {
        "tiedostonimi": tiedostonimi,
        "kaupunki": tiedot.get("kaupunki", "tuntematon"),
        "kohde": tiedot.get("kohde", tiedostonimi),
        "leveys": koko[0],
        "korkeus": koko[1],
        "kyllaisyys": round(kylla, 4),
        "tayttö": round(tayttö, 4),
        "tausta": tausta,
        "reuna_vari": reuna_hex,
        "sukupolvi": sp,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--kansio", required=True, help="Paikallinen kuvakansio (450 kuvaa)")
    ap.add_argument("--map", required=False, help="JSON-kartoitus tiedostonimi -> kaupunki/kohde")
    ap.add_argument("--ulos", required=True, help="Ulostulo JSON")
    ap.add_argument("--lisakansio", action="append", default=[], help="Lisäkansio (esim. R2-referenssit), voi antaa monta kertaa")
    ap.add_argument("--lisasukupolvi", action="append", default=[], help="Pakotettu sukupolvinimi vastaavalle --lisakansio-arvolle")
    args = ap.parse_args()

    kartta = lataa_map(args.map)

    rivit = []
    tiedostot = sorted(f for f in os.listdir(args.kansio) if f.lower().endswith((".webp", ".jpg", ".jpeg", ".png")))
    for i, f in enumerate(tiedostot):
        polku = os.path.join(args.kansio, f)
        rivit.append(kasittele_kuva(polku, f, kartta))
        if (i + 1) % 50 == 0:
            print(f"...{i + 1}/{len(tiedostot)}", file=sys.stderr)

    for idx, lisakansio in enumerate(args.lisakansio):
        pakotettu = args.lisasukupolvi[idx] if idx < len(args.lisasukupolvi) else None
        lisatiedostot = sorted(f for f in os.listdir(lisakansio) if f.lower().endswith((".webp", ".jpg", ".jpeg", ".png")))
        for i, f in enumerate(lisatiedostot):
            polku = os.path.join(lisakansio, f)
            rivit.append(kasittele_kuva(polku, f, kartta, pakotettu_sukupolvi=pakotettu))
            if (i + 1) % 100 == 0:
                print(f"...(lisä) {i + 1}/{len(lisatiedostot)}", file=sys.stderr)

    with open(args.ulos, "w", encoding="utf-8") as fh:
        json.dump(rivit, fh, ensure_ascii=False, indent=1)
    print(f"Kirjoitettu {len(rivit)} riviä -> {args.ulos}")


if __name__ == "__main__":
    main()
