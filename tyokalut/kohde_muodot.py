#!/usr/bin/env python3
# KOHTEIDEN MUODOT KOROSTUKSEEN (Linssiseppä 9.10.2026; omistaja: muotoa seuraava korostus, PT 00.52): kierroskohteiden
# pohjapiirrokset Resources/Elava/muodot-<kaupunki>.json:iin { kohteet: { "<Wikidata Q>": { laji, nimi, korkeus_m, renkaat: [[[lat, lon], …]] } } }.
# Lähteet järjestyksessä: 1) Karttasepän jalanjaljet-<kaupunki>.json (OSM wikidata / sisältävä rakennus tai alue), 2) varana
# Karttasepän kohteet-<kaupunki>.json:n pienin aukio, joka sisältää kohteen pisteen (aukion oma muoto; nimet ovat suomeksi). Ilman muotoa kohde saa nykyisen renkaan.
# Krediitti: © OpenStreetMap contributors (ODbL).
# Ajo: python3 tyokalut/kohde_muodot.py <kaupunki> <pallo-37.json> <osm-kansio> <ulos.json> [jalanjaljet.json]
import json, math, sys, unicodedata


def norm(s):
    s = unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode().lower()
    return "".join(ch for ch in s if ch.isalnum() or ch == " ").strip()


def main():
    kaupunki, lista, osm, ulos = sys.argv[1:5]
    jalan = json.load(open(sys.argv[5])) if len(sys.argv) > 5 else {"kohteet": []}
    kaup = next(c for c in json.load(open(lista))["kaupungit"] if c["id"] == kaupunki)
    kohteet = json.load(open(f"{osm}/kohteet-{kaupunki}.json"))
    o = kohteet["origo"]; lat0, lon0 = o["lat"], o["lon"]; cl = math.cos(math.radians(lat0))
    def ll(x, y): return [round(lat0 + y / 111132.0, 7), round(lon0 + x / (111320.0 * cl), 7)]
    aukiot = [a["rengas"] for a in kohteet["kerrokset"].get("aukiot", []) if a.get("rengas") and len(a["rengas"]) >= 4]
    def sisalla(r, x, y):
        c = False
        for (x1, y1), (x2, y2) in zip(r, r[1:] + r[:1]):
            if (y1 > y) != (y2 > y) and x < x1 + (y - y1) / (y2 - y1) * (x2 - x1): c = not c
        return c
    def ala(r): return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(r, r[1:] + r[:1]))) / 2
    jj = {k["id"]: k for k in jalan.get("kohteet", []) if k.get("laji") in ("rakennus", "alue") and k.get("renkaat")}
    tulos, lahteet = {}, {"jalanjalki": 0, "aukio": 0, "ei": 0}
    for k in kaup["kohteet"]:
        q = k.get("id")
        if q in jj:
            j = jj[q]
            tulos[q] = {"laji": j["laji"], "nimi": k["nimi"], "korkeus_m": j.get("korkeus_m"), "renkaat": j["renkaat"] + j.get("reiat", [])}
            lahteet["jalanjalki"] += 1; continue
        kx, ky = (k["lon"] - lon0) * 111320.0 * cl, (k["lat"] - lat0) * 111132.0
        sis = [a for a in aukiot if sisalla(a, kx, ky) and ala(a) < 400000]
        if sis:
            r = min(sis, key=ala)
            tulos[q] = {"laji": "alue", "nimi": k["nimi"], "korkeus_m": 0, "renkaat": [[ll(x, y) for x, y in r]]}
            lahteet["aukio"] += 1; continue
        lahteet["ei"] += 1
    json.dump({"kaupunki": kaupunki, "krediitti": "© OpenStreetMap contributors (ODbL)", "kohteet": tulos}, open(ulos, "w"), ensure_ascii=False, separators=(",", ":"))
    print(f"{kaupunki}: {len(kaup['kohteet'])} kohdetta → muoto {len(tulos)} ({lahteet})")


if __name__ == "__main__":
    main()
