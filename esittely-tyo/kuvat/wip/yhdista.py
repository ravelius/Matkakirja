#!/usr/bin/env python3
"""Yhdistää osa1..osa4.json yhdeksi ja validoi ankkurit tekstiä vasten."""
import json, sys, os, re

SP = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/user/Matkakirja"

AVAUS = ("Tervetuloa Pariisiin. Ylhäältä kaupunki näyttää vaalealta kiviviuhkalta, "
         "jonka keskellä Seine kiemurtelee kahden saaren ohi. Kierros alkaa joen "
         "keskeltä Cité-saarelta, josta Pariisi sai alkunsa ja jolla Notre-Dame on "
         "seissyt 1100-luvulta asti.")

SALLITUT_LISENSSIT = re.compile(
    r"^(PD|Public domain|CC0|CC BY(?:-SA)?(?:[ -]\d(?:\.\d)?)?)", re.I)
KIELLETYT = re.compile(r"\bNC\b|NonCommercial|\bND\b|NoDeriv|fair ?use", re.I)

JARJESTYS = ["kohde_id", "tekstilaji", "ankkuri", "kuvateksti", "commons_tiedosto",
             "url", "lisenssi", "tekija", "leveys", "korkeus", "tarkistettu",
             "perustelu"]


def lataa_tekstit():
    d = json.load(open(f"{REPO}/esittely-tyo/malli/pariisi.json"))
    t = {}
    for k in d["kohteet"]:
        t[(k["id"], "teksti")] = k["teksti"]
        if k.get("lyhyt"):
            t[(k["id"], "lyhyt")] = k["lyhyt"]
    t[("avaus", "avaus")] = AVAUS
    return t, {k["id"]: k["nimi"] for k in d["kohteet"]}


def main():
    tekstit, nimet = lataa_tekstit()
    nimet["avaus"] = "Kaupungin avaus"
    rivit, ongelmat = [], []

    for n in (1, 2, 3, 4):
        p = f"{SP}/osa{n}.json"
        if not os.path.exists(p):
            ongelmat.append(f"PUUTTUU: osa{n}.json")
            continue
        try:
            osa = json.load(open(p))
        except Exception as e:
            ongelmat.append(f"osa{n}.json ei jäsenny: {e}")
            continue
        for r in osa:
            r["_lahde"] = f"osa{n}"
            rivit.append(r)

    for i, r in enumerate(rivit):
        tag = f"[{r.get('_lahde')}#{i}] {r.get('kohde_id')}/{r.get('tekstilaji')}"
        for kentta in JARJESTYS:
            if kentta not in r:
                ongelmat.append(f"{tag}: kenttä puuttuu: {kentta}")

        avain = (r.get("kohde_id"), r.get("tekstilaji"))
        teksti = tekstit.get(avain)
        if teksti is None:
            ongelmat.append(f"{tag}: tuntematon kohde/tekstilaji")
        else:
            a = r.get("ankkuri", "")
            n_osumia = teksti.count(a) if a else 0
            if n_osumia != 1:
                ongelmat.append(f"{tag}: ankkuri {a!r} esiintyy {n_osumia} kertaa")
            else:
                r["_alku"] = teksti.index(a)
                # ei kolmea ensimmäistä sanaa
                kolme = " ".join(teksti.split()[:3])
                if r["_alku"] < len(kolme):
                    ongelmat.append(f"{tag}: ankkuri osuu tekstin kolmeen eka sanaan")

        lis = (r.get("lisenssi") or "")
        if KIELLETYT.search(lis):
            ongelmat.append(f"{tag}: KIELLETTY LISENSSI {lis!r}")
        elif not SALLITUT_LISENSSIT.match(lis.strip()):
            ongelmat.append(f"{tag}: lisenssi ei tunnistu sallituksi: {lis!r}")

        kt = (r.get("kuvateksti") or "")
        if len(kt.split()) > 8:
            ongelmat.append(f"{tag}: kuvateksti {len(kt.split())} sanaa (max 8): {kt!r}")
        if kt.endswith("."):
            ongelmat.append(f"{tag}: kuvatekstissä loppupiste: {kt!r}")

        if not str(r.get("commons_tiedosto", "")).startswith("File:"):
            ongelmat.append(f"{tag}: commons_tiedosto ei ala File: {r.get('commons_tiedosto')!r}")

    # päällekkäiset ankkurit samassa tekstissä
    from collections import defaultdict
    per_teksti = defaultdict(list)
    for r in rivit:
        if "_alku" in r:
            per_teksti[(r["kohde_id"], r["tekstilaji"])].append(r)
    for avain, rs in per_teksti.items():
        rs.sort(key=lambda x: x["_alku"])
        teksti = tekstit[avain]
        for a, b in zip(rs, rs[1:]):
            vali = teksti[a["_alku"] + len(a["ankkuri"]):b["_alku"]]
            sanoja = len(vali.split())
            if sanoja < 15:
                ongelmat.append(
                    f"[{avain[0]}/{avain[1]}] ankkurit liian lähekkäin ({sanoja} sanaa): "
                    f"{a['ankkuri']!r} -> {b['ankkuri']!r}")

    # sama kuvatiedosto kahdesti
    nahdyt = defaultdict(list)
    for r in rivit:
        nahdyt[r.get("commons_tiedosto")].append(f"{r.get('kohde_id')}/{r.get('tekstilaji')}")
    for f, paikat in nahdyt.items():
        if len(paikat) > 1:
            ongelmat.append(f"SAMA KUVA kahdesti: {f} -> {paikat}")

    # järjestys: kohteet pariisi.json:n järjestyksessä, avaus ensin
    d = json.load(open(f"{REPO}/esittely-tyo/malli/pariisi.json"))
    jarj = {k["id"]: n for n, k in enumerate(d["kohteet"])}
    jarj["avaus"] = -1
    lajijarj = {"avaus": 0, "teksti": 1, "lyhyt": 2}
    rivit.sort(key=lambda r: (jarj.get(r.get("kohde_id"), 999),
                              lajijarj.get(r.get("tekstilaji"), 9),
                              r.get("_alku", 0)))

    ulos = [{k: r.get(k) for k in JARJESTYS} for r in rivit]
    json.dump(ulos, open(f"{SP}/yhdistetty.json", "w"),
              ensure_ascii=False, indent=1)

    print(f"Rivejä: {len(ulos)}")
    print(f"tarkistettu=true: {sum(1 for r in ulos if r.get('tarkistettu') is True)}")
    print(f"Ongelmia: {len(ongelmat)}")
    for o in ongelmat:
        print("  -", o)


if __name__ == "__main__":
    main()
