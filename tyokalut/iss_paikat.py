#!/usr/bin/env python3
"""ISS-OHJAAMON LCD:N PAIKAT (Päätoimittaja 4.10.2026, omistaja 21.5x "miksi ei ole tarkempaa sijaintia"): Natural Earth 10m
populated places (public domain, naturalearthdata.com, 7 342 paikkaa) → Assets/Matkakirja/Linssit/Resources/IssPaikat/paikat.json.

    python3 tyokalut/iss_paikat.py <ne_10m_populated_places.dbf>

Nimi: maan oma kieli, kun Natural Earthissa on sille kenttä (Puola NAME_PL "Warszawa", Saksa ja Itävalta NAME_DE "München",
Unkari, Italia, Espanja, Ranska, Portugali, Alankomaat, Ruotsi, Turkki), muuten NAME (paikallinen latinalainen kirjoitus,
esim. "Poznań", "Brno"). Pelin suomenkielinen nimi (Varsova, Krakova) valitaan pelissä (IssSijainti: pelin kaupunki voittaa
Natural Earthin paikan saman maan ≤ 15 km:n päässä). Rivit: [nimi, lat, lon, maa (ISO3), väkiluku]. Näkymättömät
ohjausmerkit (U+200E ym.) poistetaan; VT323 kattaa kaikki Euroopan latinalaiset kirjaimet (Ń Ł Ż Ś Č Ř Ő Ş Ğ İ).
"""
import json, struct, sys, unicodedata

KIELI = {"POL": "NAME_PL", "DEU": "NAME_DE", "AUT": "NAME_DE", "HUN": "NAME_HU", "ITA": "NAME_IT", "ESP": "NAME_ES",
         "FRA": "NAME_FR", "PRT": "NAME_PT", "BRA": "NAME_PT", "NLD": "NAME_NL", "SWE": "NAME_SV", "TUR": "NAME_TR"}


def lue(polku):
    f = open(polku, "rb"); h = f.read(32)
    n, hl, rl = struct.unpack("<IHH", h[4:12]); kentat = []
    while True:
        d = f.read(32)
        if d[0] == 0x0D: break
        kentat.append((d[:11].split(b"\0")[0].decode(), d[16]))
    f.seek(hl)
    for _ in range(n):
        r = f.read(rl); o = 1; rivi = {}
        for nimi, pit in kentat:
            rivi[nimi] = r[o:o + pit].decode("utf-8", "replace").strip(); o += pit
        yield rivi


def puhdas(s):
    return "".join(c for c in s if unicodedata.category(c)[0] != "C").strip()


def main():
    paikat = []
    for r in lue(sys.argv[1]):
        maa = r["ADM0_A3"]
        nimi = puhdas(r.get(KIELI.get(maa, ""), "") or "") or puhdas(r["NAME"])
        if not nimi: continue
        paikat.append([nimi, round(float(r["LATITUDE"]), 4), round(float(r["LONGITUDE"]), 4), maa, int(float(r["POP_MAX"] or 0))])
    paikat.sort(key=lambda p: (p[3], -p[4]))
    ulos = {"lahde": "Natural Earth 5.1.2 10m populated places (public domain)", "paikat": paikat}
    polku = "Assets/Matkakirja/Linssit/Resources/IssPaikat/paikat.json"
    with open(polku, "w", encoding="utf-8") as f:
        json.dump(ulos, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{len(paikat)} paikkaa → {polku}")


if __name__ == "__main__":
    main()
