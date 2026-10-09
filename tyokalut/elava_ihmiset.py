#!/usr/bin/env python3
# ELÄVÄ KAUPUNKI: AUKIOT IHMISÄÄNILLE (Linssiseppä 9.10.2026; PT junaan 172, Pelikoodarin aanet/pallo-elava-v2: sorina, nauru, lapset,
# katusoittaja). Lisää olemassa olevaan Resources/Elava/elava-<id>.json:iin (tyokalut/elava_kaupunki.py) vain kentän "aukiot";
# muut kentät säilyvät tavu tavulta ennallaan (sama json.dump-muoto, tarkistetaan ennen kirjoitusta), kuten elava_savu_liput.py.
#   aukiot [{x, z, ala, tori}]: Karttasepän kohteet-<id>.json kerros "aukiot" (place=square ja highway=pedestrian-alueet; rengas →
#     pisteiden keskipiste, piste sellaisenaan); ala = renkaan pinta-ala (m², piste 0), tori = 1, jos place=square (katusoittaja
#     soi vain toreilla tai isoilla aukioilla, Ydin IhmisAanet.ToriAlaM2). Alle MIN_ALA_M2:n kävelyalueet ja ≤ 10 m:n kaksoiset pois.
# Pyörän kellot ja laivan torvet tulevat paketin "kadut"- ja "reitit"-kentistä ajonaikana (Ydin IhmisAanet), ei tästä työkalusta.
# Koordinaatit paketin origossa (x itä, z pohjoinen). Krediitti paketissa jo: © OpenStreetMap contributors (ODbL).
# Ajo: python3 tyokalut/elava_ihmiset.py <kohde> <osm-kansio> <elava-<kohde>.json>
import json, math, sys
from elava_kaupunki import muunnin

MIN_ALA_M2, SADE_M = 150.0, 15000.0


def ala(pts):
    if len(pts) < 3: return 0.0
    return abs(sum(pts[i][0] * pts[(i + 1) % len(pts)][1] - pts[(i + 1) % len(pts)][0] * pts[i][1] for i in range(len(pts)))) / 2


def main():
    kohde, osm, elava = sys.argv[1:4]
    alku = open(elava, encoding="utf-8").read()
    j = json.loads(alku)
    pohja = {k: v for k, v in j.items() if k != "aukiot"}
    if json.dumps(json.loads(alku), ensure_ascii=False, separators=(",", ":")) != alku:
        sys.exit(f"{elava}: muoto poikkeaa json.dumpista, ei kirjoiteta (muut kentät eivät säilyisi tavu tavulta)")
    kohteet = json.load(open(f"{osm}/kohteet-{kohde}.json", encoding="utf-8"))
    m = muunnin((kohteet["origo"]["lat"], kohteet["origo"]["lon"]), (j["origo"]["lat"], j["origo"]["lon"]))
    aukiot = []
    for t in kohteet["kerrokset"].get("aukiot", []):
        tg = t.get("tagit") or {}
        pts = t.get("rengas") or ([t["piste"]] if t.get("piste") else None)
        if not pts: continue
        if len(pts) > 1 and pts[0] == pts[-1]: pts = pts[:-1]
        a = ala(pts)
        tori = 1 if tg.get("place") == "square" else 0
        if not tori and len(pts) > 1 and a < MIN_ALA_M2: continue
        x, z, _ = m(sum(q[0] for q in pts) / len(pts), sum(q[1] for q in pts) / len(pts))
        if math.hypot(x, z) > SADE_M or any(math.hypot(x - q["x"], z - q["z"]) <= 10 for q in aukiot): continue
        aukiot.append({"x": round(x, 1), "z": round(z, 1), "ala": int(round(a)), "tori": tori})
    teksti = json.dumps(dict(pohja, aukiot=aukiot), ensure_ascii=False, separators=(",", ":"))
    # Muut kentät ennallaan: uuden tekstin alku = vanha ilman loppusulkua (lisätty kenttä tulee viimeiseksi).
    assert teksti.startswith(json.dumps(pohja, ensure_ascii=False, separators=(",", ":"))[:-1] + ","), "muut kentät muuttuivat"
    open(elava, "w", encoding="utf-8").write(teksti)
    print(f"{kohde}: {len(aukiot)} aukiota ({sum(q['tori'] for q in aukiot)} toria, {sum(1 for q in aukiot if q['ala'] >= 1000)} yli 1000 m²)")


if __name__ == "__main__":
    main()
