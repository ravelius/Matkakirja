#!/usr/bin/env python3
# ELÄVÄ KAUPUNKI: SAVU JA LIPUT (Linssiseppä 9.10.2026; suunnitelma docs/raportit/pallo-elava-kaupunki-20261008.md B8, juna 171).
# Lisää olemassa olevaan Resources/Elava/elava-<id>.json:iin (tyokalut/elava_kaupunki.py) vain kentät "piiput" ja "liput"; muut kentät
# säilyvät tavu tavulta ennallaan (sama json.dump-muoto, tarkistetaan ennen kirjoitusta).
#   piiput [{x, z, korkeus}]: Karttasepän kohteet-<id>.json kerros "piiput" (man_made=chimney; rengas → keskipiste, piste);
#     korkeus = height-tagi tai korkeus_m, puuttuessa 25 m (teollisuuspiippu). Sama piippu kahdesti (≤ 5 m) vain kerran.
#   liput [{x, z, tyvi, korkeus, maa}]: kerros "liput" (man_made=flagpole) kohteet-<id>.json:ssa tai liput-<id>.json:ssa samassa
#     kansiossa; tyvi = tyvi_m (tyven korkeus maasta), korkeus = height tai korkeus_m (puuttuessa 6 m, Karttaseppä 9.10.), maa = "SE" / "FR" tagista
#     country tai flag:name (muuten null = neutraali). Seinäliput (support=wall_mounted) ohitetaan (Karttaseppä 9.10.: osalle
#     on tullut virheellisesti katon korkeus, esim. Taipei Mission 74 m). Jos lippuaineistoa ei vielä ole, kenttää ei kirjoiteta (ohitetaan hiljaa).
# Koordinaatit paketin origossa (x itä, z pohjoinen); OSM-origo muunnetaan ECEF:n kautta, jos se poikkeaa. Maan korkeus ajonaikana
# omasta korkeusmallista (Map Tiles C4: ei Googlen laatoista). Krediitti paketissa jo: © OpenStreetMap contributors (ODbL).
# Ajo: python3 tyokalut/elava_savu_liput.py <kohde> <osm-kansio> <elava-<kohde>.json>
import json, math, os, sys
from elava_kaupunki import muunnin

PIIPPU_OLETUS_M, LIPPU_OLETUS_M, SADE_M = 25.0, 6.0, 15000.0


def luku(v):
    try: return float(str(v).replace(",", ".").replace("m", "").strip())
    except (TypeError, ValueError): return None


def keskipiste(t):
    pts = t.get("rengas") or ([t["piste"]] if t.get("piste") else None)
    if not pts: return None
    if len(pts) > 1 and pts[0] == pts[-1]: pts = pts[:-1]
    return sum(q[0] for q in pts) / len(pts), sum(q[1] for q in pts) / len(pts)


def korkeus(t, oletus):
    tg = t.get("tagit") or {}
    k = luku(tg.get("height")) if tg.get("height") is not None else None
    if k is None and t.get("korkeus_m") is not None: k = luku(t["korkeus_m"])
    return k if k and k > 0 else oletus


def maa(tg):
    s = " ".join(str(tg.get(k, "")) for k in ("country", "flag:name", "flag:country", "subject")).lower().strip()
    if {"se", "swe"} & set(s.split()) or any(w in s for w in ("sweden", "sverige", "svensk", "swedish")): return "SE"
    if {"fr", "fra"} & set(s.split()) or any(w in s for w in ("france", "français", "francais", "french", "tricolore")): return "FR"
    return None


def main():
    kohde, osm, elava = sys.argv[1:4]
    alku = open(elava, encoding="utf-8").read()
    j = json.loads(alku)
    pohja = {k: v for k, v in j.items() if k not in ("piiput", "liput")}
    if json.dumps(json.loads(alku), ensure_ascii=False, separators=(",", ":")) != alku:
        sys.exit(f"{elava}: muoto poikkeaa json.dumpista, ei kirjoiteta (muut kentät eivät säilyisi tavu tavulta)")
    kohteet = json.load(open(f"{osm}/kohteet-{kohde}.json", encoding="utf-8"))
    m = muunnin((kohteet["origo"]["lat"], kohteet["origo"]["lon"]), (j["origo"]["lat"], j["origo"]["lon"]))

    piiput = []
    for t in kohteet["kerrokset"].get("piiput", []):
        c = keskipiste(t)
        if c is None: continue
        x, z, _ = m(*c)
        if math.hypot(x, z) > SADE_M or any(math.hypot(x - q["x"], z - q["z"]) <= 5 for q in piiput): continue
        piiput.append({"x": round(x, 1), "z": round(z, 1), "korkeus": round(korkeus(t, PIIPPU_OLETUS_M), 1)})

    lahde = kohteet["kerrokset"].get("liput")
    lp = f"{osm}/liput-{kohde}.json"
    if lahde is None and os.path.exists(lp):
        lj = json.load(open(lp, encoding="utf-8"))
        ml = muunnin((lj["origo"]["lat"], lj["origo"]["lon"]), (j["origo"]["lat"], j["origo"]["lon"])) if "origo" in lj else m
        lahde = [dict(t, _m=ml) for t in (lj.get("kerrokset", {}).get("liput") or lj.get("liput") or [])]
    liput = None
    if lahde:
        liput = []
        for t in lahde:
            c = keskipiste(t)
            # Seinäliput pois; yli 60 m:n tyvi on virheellinen rakennuskorkeus (Tukholman Taipei Mission 74 m ilman support-tagia).
            if c is None or (t.get("tagit") or {}).get("support") == "wall_mounted" or (luku(t.get("tyvi_m")) or 0) > 60: continue
            x, z, _ = t.get("_m", m)(*c)
            if math.hypot(x, z) > SADE_M or any(math.hypot(x - q["x"], z - q["z"]) <= 1 for q in liput): continue
            liput.append({"x": round(x, 1), "z": round(z, 1), "tyvi": round(luku(t.get("tyvi_m")) or 0.0, 1),
                          "korkeus": round(korkeus(t, LIPPU_OLETUS_M), 1), "maa": maa(t.get("tagit") or {})})

    ulos = dict(pohja, piiput=piiput)
    if liput is not None: ulos["liput"] = liput
    teksti = json.dumps(ulos, ensure_ascii=False, separators=(",", ":"))
    # Muut kentät ennallaan: uuden tekstin alku = vanha ilman loppusulkua (lisätyt kentät tulevat viimeisiksi).
    assert teksti.startswith(json.dumps(pohja, ensure_ascii=False, separators=(",", ":"))[:-1] + ","), "muut kentät muuttuivat"
    open(elava, "w", encoding="utf-8").write(teksti)
    from collections import Counter
    oletus = sum(1 for t in kohteet["kerrokset"].get("piiput", []) if korkeus(t, None) is None)
    lt = "ei aineistoa" if liput is None else f"{len(liput)} {dict(Counter(q['maa'] for q in liput))}"
    print(f"{kohde}: {len(piiput)} piippua (oletuskorkeus {oletus}), liput {lt}")


if __name__ == "__main__":
    main()
