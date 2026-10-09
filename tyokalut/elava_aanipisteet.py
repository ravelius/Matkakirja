#!/usr/bin/env python3
# ELÄVÄ KAUPUNKI: ÄÄNIPISTEET KAUPUNKIÄÄNILLE (Linssiseppä 9.10.2026; PT junaan 173, Pelikoodarin aanet/pallo-kaupunki-v1: kirkonkellot,
# suihkulähteet, kahvilat, kauppahallit). Lisää olemassa olevaan Resources/Elava/elava-<id>.json:iin kentät "kirkot", "suihkulahteet",
# "kahvilat" ja "hallit"; muut kentät säilyvät tavu tavulta ennallaan (sama json.dump-muoto, tarkistetaan ennen kirjoitusta), kuten
# elava_ihmiset.py. Uudelleenajo korvaa vain nämä neljä kenttää.
#   kirkot        [{x, z}]     Karttasepän kerros "kirkot" (place_of_worship, kaikki christian); piste = rakennuksen keskipiste
#   suihkulahteet [{x, z}]     kerros "suihkulahteet" (amenity=fountain); rengas → keskipiste
#   kahvilat      [{x, z, l}]  kerros "kahvilat"; l = 0 cafe, 1 bar/pub
#   hallit        [{x, z, k, t}] kerros "hallit"; k = 1 katettu (building ≠ no, covered=yes tai indoor), 0 ulko; t = 0 marketplace,
#                              1 shop=mall (kauppakeskus; Ydin KaupunkiAanet valitsee kauppahallin tai kauppakeskuksen äänen)
# Harvennus ruudukolla (tiedosto kohtuullisena): kirkot ja suihkulähteet ≤ 1 per 60 m:n solu, kahvilat ≤ 1 per 40 m:n solu (solun
# ensimmäinen OSM-järjestyksessä; kahvilan tiheys ja baarien osuus säilyvät karkeasti). Hallit kaikki.
# Koordinaatit paketin origossa (x itä, z pohjoinen). Krediitti paketissa jo: © OpenStreetMap contributors (ODbL).
# Ajo: python3 tyokalut/elava_aanipisteet.py <kohde> <osm-kansio> <elava-<kohde>.json>
import json, math, sys
from elava_kaupunki import muunnin

SADE_M = 15000.0
KENTAT = ("kirkot", "suihkulahteet", "kahvilat", "hallit")


def keskipiste(t):
    if t.get("piste"): return t["piste"]
    pts = t.get("rengas")
    if not pts: return None
    if len(pts) > 1 and pts[0] == pts[-1]: pts = pts[:-1]
    return [sum(q[0] for q in pts) / len(pts), sum(q[1] for q in pts) / len(pts)]


def katettu(tg):
    return 1 if (tg.get("building") not in (None, "no") or tg.get("covered") == "yes" or tg.get("indoor") not in (None, "no")) else 0


def main():
    kohde, osm, elava = sys.argv[1:4]
    alku = open(elava, encoding="utf-8").read()
    j = json.loads(alku)
    pohja = {k: v for k, v in j.items() if k not in KENTAT}
    if json.dumps(json.loads(alku), ensure_ascii=False, separators=(",", ":")) != alku:
        sys.exit(f"{elava}: muoto poikkeaa json.dumpista, ei kirjoiteta (muut kentät eivät säilyisi tavu tavulta)")
    kohteet = json.load(open(f"{osm}/kohteet-{kohde}.json", encoding="utf-8"))
    m = muunnin((kohteet["origo"]["lat"], kohteet["origo"]["lon"]), (j["origo"]["lat"], j["origo"]["lon"]))
    ker = kohteet["kerrokset"]

    def pisteet(kerros, solu, lisa):
        tul, solut = [], set()
        for t in ker.get(kerros, []):
            p = keskipiste(t)
            if not p: continue
            x, z, _ = m(p[0], p[1])
            if math.hypot(x, z) > SADE_M: continue
            if solu:
                s = (math.floor(x / solu), math.floor(z / solu))
                if s in solut: continue
                solut.add(s)
            tul.append(dict({"x": round(x, 1), "z": round(z, 1)}, **lisa(t.get("tagit") or {})))
        return tul

    uudet = {
        "kirkot": pisteet("kirkot", 60, lambda tg: {}),
        "suihkulahteet": pisteet("suihkulahteet", 60, lambda tg: {}),
        "kahvilat": pisteet("kahvilat", 40, lambda tg: {"l": 0 if tg.get("amenity") == "cafe" else 1}),
        "hallit": pisteet("hallit", 0, lambda tg: {"k": katettu(tg), "t": 1 if tg.get("shop") == "mall" else 0}),
    }
    teksti = json.dumps(dict(pohja, **uudet), ensure_ascii=False, separators=(",", ":"))
    # Muut kentät ennallaan: uuden tekstin alku = vanha ilman loppusulkua (lisätyt kentät tulevat viimeisiksi).
    assert teksti.startswith(json.dumps(pohja, ensure_ascii=False, separators=(",", ":"))[:-1] + ","), "muut kentät muuttuivat"
    open(elava, "w", encoding="utf-8").write(teksti)
    k, h = uudet["kahvilat"], uudet["hallit"]
    print(f"{kohde}: {len(uudet['kirkot'])}/{len(ker.get('kirkot', []))} kirkkoa, {len(uudet['suihkulahteet'])}/{len(ker.get('suihkulahteet', []))} "
          f"suihkulähdettä, {len(k)}/{len(ker.get('kahvilat', []))} kahvilaa ({sum(q['l'] for q in k)} baaria), {len(h)} hallia "
          f"({sum(q['k'] for q in h)} katettua, {sum(q['t'] for q in h)} kauppakeskusta); {len(alku.encode())} → {len(teksti.encode())} tavua")


if __name__ == "__main__":
    main()
