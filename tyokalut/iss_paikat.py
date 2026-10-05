#!/usr/bin/env python3
"""ISS-OHJAAMON LCD:N PAIKAT (Päätoimittaja 4.10.2026, omistaja 21.5x "miksi ei ole tarkempaa sijaintia"): Natural Earth 10m
populated places (public domain, naturalearthdata.com, 7 342 paikkaa) → Assets/Matkakirja/Linssit/Resources/IssPaikat/paikat.json.

    python3 tyokalut/iss_paikat.py <ne_10m_populated_places.dbf> <ne_10m_admin_0_countries.dbf>

Nimi: maan oma kieli, kun Natural Earthissa on sille kenttä (Puola NAME_PL "Warszawa", Saksa ja Itävalta NAME_DE "München",
Unkari, Italia, Espanja, Ranska, Portugali, Alankomaat, Ruotsi, Turkki), muuten NAME (paikallinen latinalainen kirjoitus,
esim. "Poznań", "Brno"). Pelin suomenkielinen nimi (Varsova, Krakova) valitaan pelissä (IssSijainti: pelin kaupunki voittaa
Natural Earthin paikan saman maan ≤ 15 km:n päässä). Vakiintuneet suomenkieliset eksonyymit (EKSONYYMIT: Viipuri, Harkova,
Belgrad, Haag, Geneve, Nizza …) ensin. Kyrillisten ja kreikkalaisten maiden nimet ovat NE:n NAME-kentästä valmiiksi latinalaisina
(Vyborg, Kharkiv, Thessaloniki); muu kuin latinalainen kirjain (≥ U+0250) → NAMEASCII. Rivit: [nimi, lat, lon, maa (ISO3), väkiluku,
maanosa (admin-0:n CONTINENT maakoodin mukaan, esim. "Europe"; Natiivi-UI 5.10.: elävän oppaan kohdevalitsin)]. Näkymättömät
ohjausmerkit (U+200E ym.) poistetaan; VT323 kattaa kaikki Euroopan latinalaiset kirjaimet (Ń Ł Ż Ś Č Ř Ő Ş Ğ İ).
"""
import json, struct, sys, unicodedata

# Vakiintuneet suomenkieliset eksonyymit (Päätoimittaja 4.10. 23.0x, Kotuksen suositukset): (maa, NAMEASCII) → nimi. Pelin
# kaupungit saavat pelin nimen joka tapauksessa (IssSijainti, ≤ 15 km); tämä kattaa pelin ulkopuoliset.
EKSONYYMIT = {
    ("RUS", "Vyborg"): "Viipuri", ("RUS", "Petrozavodsk"): "Petroskoi", ("RUS", "Arkhangelsk"): "Arkangeli",
    ("RUS", "Archangel"): "Arkangeli", ("RUS", "St. Petersburg"): "Pietari", ("RUS", "Saint Petersburg"): "Pietari",
    ("RUS", "Moscow"): "Moskova", ("RUS", "Priozersk"): "Käkisalmi", ("RUS", "Pskov"): "Pihkova",
    ("RUS", "Kandalaksha"): "Kantalahti", ("RUS", "Kostomuksha"): "Kostamus", ("RUS", "Velikiy Novgorod"): "Novgorod",
    ("RUS", "Sortavala"): "Sortavala", ("RUS", "Olonets"): "Aunus", ("RUS", "Belomorsk"): "Sorokka",
    ("UKR", "Kyiv"): "Kiova", ("UKR", "Kiev"): "Kiova", ("UKR", "Kharkiv"): "Harkova", ("UKR", "Kharkov"): "Harkova",
    ("UKR", "Odesa"): "Odessa", ("UKR", "Odessa"): "Odessa",
    ("EST", "Tartu"): "Tarto", ("EST", "Tallinn"): "Tallinna", ("LVA", "Riga"): "Riika", ("LTU", "Vilnius"): "Vilna",
    ("SRB", "Belgrade"): "Belgrad", ("NLD", "The Hague"): "Haag", ("NLD", "Den Haag"): "Haag", ("BEL", "Brussels"): "Bryssel",
    ("CHE", "Geneva"): "Geneve", ("CHE", "Zurich"): "Zürich", ("FRA", "Nice"): "Nizza", ("FRA", "Paris"): "Pariisi",
    ("ITA", "Rome"): "Rooma", ("ITA", "Venice"): "Venetsia", ("GRC", "Athens"): "Ateena", ("GRC", "Piraievs"): "Pireus",
    ("GRC", "Piraeus"): "Pireus", ("DNK", "Copenhagen"): "Kööpenhamina", ("DNK", "Kobenhavn"): "Kööpenhamina", ("SWE", "Stockholm"): "Tukholma",
    ("GBR", "London"): "Lontoo", ("PRT", "Lisbon"): "Lissabon", ("POL", "Warsaw"): "Varsova", ("POL", "Krakow"): "Krakova",
    ("DEU", "Hamburg"): "Hampuri", ("DEU", "Lubeck"): "Lyypekki", ("ROU", "Bucharest"): "Bukarest",
    ("CZE", "Prague"): "Praha", ("CYP", "Nicosia"): "Nikosia", ("LUX", "Luxembourg"): "Luxemburg",
    ("BLR", "Minsk"): "Minsk", ("TUR", "Istanbul"): "Istanbul",
}

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


def latinalainen(s):
    """VT323:n kattama: latinalainen perus, Latin-1 ja Latin Extended-A/B (ei U+1E00-lisämerkkejä, kyrillisiä, kreikkaa)."""
    return all(ord(c) < 0x250 for c in s)


def main():
    maanosat = {}
    for r in lue(sys.argv[2]):
        for k in ("ADM0_A3", "SOV_A3", "ISO_A3", "ADM0_A3_US"):
            if r.get(k) and r[k] != "-99": maanosat.setdefault(r[k], r["CONTINENT"].replace("\x00", "").strip())
    paikat = []
    for r in lue(sys.argv[1]):
        maa = r["ADM0_A3"]
        nimi = EKSONYYMIT.get((maa, r["NAMEASCII"])) or puhdas(r.get(KIELI.get(maa, ""), "") or "") or puhdas(r["NAME"])
        if not latinalainen(nimi): nimi = puhdas(r["NAMEASCII"])   # esim. Ṭarābulus → Tarabulus (ei tofua LCD:llä)
        if not nimi: continue
        paikat.append([nimi, round(float(r["LATITUDE"]), 4), round(float(r["LONGITUDE"]), 4), maa, int(float(r["POP_MAX"] or 0)),
                       maanosat.get(maa) or maanosat.get(r.get("SOV_A3", ""), "")])
    paikat.sort(key=lambda p: (p[3], -p[4]))
    ulos = {"lahde": "Natural Earth 5.1.2 10m populated places (public domain)", "paikat": paikat}
    polku = "Assets/Matkakirja/Linssit/Resources/IssPaikat/paikat.json"
    with open(polku, "w", encoding="utf-8") as f:
        json.dump(ulos, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{len(paikat)} paikkaa → {polku}")


if __name__ == "__main__":
    main()
