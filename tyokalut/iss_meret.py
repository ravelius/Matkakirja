#!/usr/bin/env python3
"""ISS-OHJAAMON LCD:N MERIALUEET (Päätoimittaja 4.10.2026 23.2x: "SKAGERRAK keskellä Pohjanmerta on asiavirhe"): Natural Earth 10m
geography marine polys (public domain, 306 aluetta) → Assets/Matkakirja/Linssit/Resources/IssPaikat/meret.json.

    python3 tyokalut/iss_meret.py <ne_10m_geography_marine_polys.shp> <.dbf>

Piste polygonissa -periaatteella (IssSijainti). Suomenkielinen nimi: pelin oma meren nimipiste alueen sisällä (pelissä), muuten
SUOMI-taulukko (vakiintuneet nimet), muuten tyhjä (pelissä lähin pelin meren nimi kuten ennen). Renkaat yksinkertaistetaan
Douglas–Peucker 0,05° (~5 km: merellä riittää). Rivit: [englanninkielinen nimi, suomenkielinen nimi tai "", luokka, [[lon, lat, lon, lat, …], …]].
"""
import json, struct, sys
sys.path.insert(0, __file__.rsplit("/", 1)[0])
from iss_paikat import lue

SUOMI = {
    "North Sea": "Pohjanmeri", "Norwegian Sea": "Norjanmeri", "Skagerrak": "Skagerrak", "Kattegat": "Kattegat",
    "Baltic Sea": "Itämeri", "Gulf of Bothnia": "Pohjanlahti", "Bothnian Sea": "Selkämeri", "Bothnian Bay": "Perämeri",
    "Gulf of Finland": "Suomenlahti", "Gulf of Riga": "Riianlahti", "Bay of Biscay": "Biskajanlahti", "Celtic Sea": "Kelttienmeri",
    "English Channel": "Englannin kanaali", "Irish Sea": "Irlanninmeri", "Mediterranean Sea": "Välimeri",
    "Tyrrhenian Sea": "Tyrrhenanmeri", "Ligurian Sea": "Liguriamnmeri", "Adriatic Sea": "Adrianmeri", "Ionian Sea": "Joonianmeri",
    "Aegean Sea": "Aigeianmeri", "Sea of Crete": "Kreetanmeri", "Balearic Sea": "Baleaarienmeri", "Alboran Sea": "Alboraninmeri",
    "Black Sea": "Mustameri", "Sea of Azov": "Asovanmeri", "Sea of Marmara": "Marmaranmeri", "Barents Sea": "Barentsinmeri",
    "White Sea": "Vienanmeri", "Greenland Sea": "Grönlanninmeri", "Arctic Ocean": "Pohjoinen jäämeri",
    "North Atlantic Ocean": "Atlantin valtameri", "South Atlantic Ocean": "Atlantin valtameri", "Atlantic Ocean": "Atlantin valtameri",
    "Indian Ocean": "Intian valtameri", "North Pacific Ocean": "Tyyni valtameri", "South Pacific Ocean": "Tyyni valtameri",
    "Southern Ocean": "Eteläinen jäämeri", "Caspian Sea": "Kaspianmeri", "Red Sea": "Punainenmeri", "Persian Gulf": "Persianlahti",
    "Gulf of Mexico": "Meksikonlahti", "Caribbean Sea": "Karibianmeri", "Gulf of California": "Kalifornianlahti",
    "Labrador Sea": "Labradorinmeri", "Hudson Bay": "Hudsoninlahti", "Bay of Bengal": "Bengalinlahti", "Arabian Sea": "Arabianmeri",
    "South China Sea": "Etelä-Kiinan meri", "East China Sea": "Itä-Kiinan meri", "Sea of Japan": "Japaninmeri",
    "Tasman Sea": "Tasmaninmeri", "Coral Sea": "Korallimeri", "Bering Sea": "Beringinmeri", "Sea of Okhotsk": "Ohotanmeri",
    "Strait of Gibraltar": "Gibraltarinsalmi", "Gulf of Lion": "Leijonanlahti", "Wadden Sea": "Vattimeri",
}


def renkaat(shp):
    d = open(shp, "rb").read(); o = 100; r = []
    while o < len(d):
        _, pit = struct.unpack(">ii", d[o:o + 8]); s = d[o + 8:o + 8 + pit * 2]; o += 8 + pit * 2
        tyyppi = struct.unpack("<i", s[:4])[0]
        if tyyppi != 5: r.append([]); continue
        nosia, npist = struct.unpack("<ii", s[36:44]); osat = list(struct.unpack("<%di" % nosia, s[44:44 + 4 * nosia]))
        p0 = 44 + 4 * nosia; pist = [struct.unpack("<dd", s[p0 + 16 * i:p0 + 16 * i + 16]) for i in range(npist)]
        osat.append(npist)
        r.append([pist[osat[i]:osat[i + 1]] for i in range(nosia)])
    return r


def dp(p, tol):
    if len(p) < 4: return p
    a, b = p[0], p[-1]; dx, dy = b[0] - a[0], b[1] - a[1]; L = (dx * dx + dy * dy) ** 0.5 or 1e-12
    i, m = 0, -1
    for k in range(1, len(p) - 1):
        e = abs(dy * p[k][0] - dx * p[k][1] + b[0] * a[1] - b[1] * a[0]) / L
        if e > m: i, m = k, e
    return dp(p[:i + 1], tol)[:-1] + dp(p[i:], tol) if m > tol else [a, b]


def main():
    shp, dbf = sys.argv[1], sys.argv[2]
    rivit = list(lue(dbf)); geom = renkaat(shp); ulos = []
    for r, g in zip(rivit, geom):
        if not g: continue
        rr = []
        for ring in g:
            h = len(ring) // 2   # suljettu rengas (alku = loppu): yksinkertaistus kahtena puolikkaana
            s = dp(ring[:h + 1], 0.05)[:-1] + dp(ring[h:], 0.05)
            if len(s) >= 4: rr.append([round(v, 3) for xy in s for v in xy])
        if rr: ulos.append([r["name"], SUOMI.get(r["name"], ""), r["featurecla"], rr])
    polku = "Assets/Matkakirja/Linssit/Resources/IssPaikat/meret.json"
    with open(polku, "w", encoding="utf-8") as f:
        json.dump({"lahde": "Natural Earth 5.1.1 10m geography marine polys (public domain)", "alueet": ulos}, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{len(ulos)} aluetta, suomeksi taulukosta {sum(1 for u in ulos if u[1])} → {polku}")


if __name__ == "__main__":
    main()
