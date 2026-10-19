#!/usr/bin/env python3
"""ASEMATAULUN SYNKKA (omistaja 12.10.2026 klo 21.4x: "tee korjaus joka pitää huolen että työlista ja asemataulu
pysyy päivitettynä kaikissa tilanteissa").

Totuus on tiedostoissa data/talo/<dokumentti>.json (Päätoimittaja kirjoittaa). Postivahti ajaa tämän joka
kierroksella heti ArtifactData listin jälkeen:

  python3 -I synkka.py --lista <listin out_dir>/talo --versiot junat=6,tyolista=2,... [--ulos kirjoitukset.json]

1) Vertaa PT:n dokumentteja (junat, tyolista, tehtavat, viestit, huom) taulun nykyiseen sisältöön. Erot
   kirjoitetaan --ulos-tiedostoon valmiiksi ArtifactData batchin writes-listaksi (op set, file_path,
   if_version listin versioista). Rivi "VIE|<doc>|<syy>" per kirjoitus. Tyhjällä taululla (uusi tili) kaikki.
2) Vanhenemisvahti: jos junat tai tyolista on vanhempi kuin viimeisin tapahtuma (PT:n kirjattavat-tiedosto,
   mainin viimeisin commit) yli 45 min, tai tyolista yli 6 h päivällä (07–24), tulostaa
   "VANHA|<doc>|<ikä min>|<viimeisin tapahtuma HH.MM>" — Postivahti viestii sen Päätoimittajalle
   (enintään kerran tunnissa per dokumentti; tila data/.vanha-ilmoitettu.json).
3) Tarkistin ennen vientiä (omistaja 19.10.2026 klo 19.51, docs/moduulit/asemataulu.md): junat (+ eteneminen) ja tyolista
   ajetaan tarkista-junat.py:n läpi; dokumentti, jossa on VIRHE, jää viemättä ja tulostuu rivi
   "ESTO|<doc>|<virheiden määrä>|<ensimmäinen virhe>" — Asemataulu-sessio kertoo sen PT:lle, PT korjaa tiedoston.
Ei kirjoita tauluun itse eikä muuta data-tiedostoja.
"""
import argparse
import glob
import importlib.util
import json
import os
import subprocess
import time

TAMA = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(TAMA, "data", "talo")
FABLE = "/Users/Shared/Claude/Matkakirja-fable"
PT_DOCS = ["junat", "tyolista", "tehtavat", "viestit", "huom"]
TILA = os.path.join(TAMA, "data", ".vanha-ilmoitettu.json")
RAJA_TAPAHTUMA = 45 * 60
RAJA_TYOLISTA = 6 * 3600
ILMOITUSVALI = 3600


def lue(polku):
    try:
        with open(polku, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def tarkistimen_virheet():
    """{doc: [virheet]} tarkista-junat.py:n mukaan (sama kansio)."""
    sp = importlib.util.spec_from_file_location("tarkista_junat", os.path.join(TAMA, "tarkista-junat.py"))
    t = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(t)
    tulos = {}
    junat = lue(os.path.join(DATA, "junat.json"))
    if junat is not None:
        tulos["junat"] = t.tarkista(junat, lue(os.path.join(DATA, "eteneminen.json")))[0]
    tl = lue(os.path.join(DATA, "tyolista.json"))
    if tl is not None:
        tulos["tyolista"] = t.tarkista_tyolista(tl)[0]
    return tulos


def doc_ts(doc, sisalto):
    ts = sisalto.get("ts") if isinstance(sisalto, dict) else None
    if isinstance(ts, (int, float)) and ts > 0:
        return ts / 1000.0
    try:
        return os.path.getmtime(os.path.join(DATA, doc + ".json"))
    except OSError:
        return 0.0


def viimeisin_tapahtuma():
    ajat = []
    for p in glob.glob(os.path.join(FABLE, "scratchpad", "kirjattavat-*.md")):
        try:
            ajat.append(os.path.getmtime(p))
        except OSError:
            pass
    try:
        r = subprocess.run(["git", "-C", FABLE, "log", "-1", "--format=%ct", "origin/main"],
                           capture_output=True, text=True, timeout=10)
        if r.stdout.strip().isdigit():
            ajat.append(float(r.stdout.strip()))
    except (OSError, subprocess.SubprocessError):
        pass
    return max(ajat) if ajat else 0.0


def hhmm(t):
    return time.strftime("%H.%M", time.localtime(t))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--lista", required=True, help="ArtifactData listin out_dir/talo")
    ap.add_argument("--versiot", default="", help="doc=versio,doc=versio (listin tulosteesta)")
    ap.add_argument("--ulos", default=os.path.join(TAMA, "data", "kirjoitukset.json"))
    a = ap.parse_args()

    versiot = {}
    for osa in filter(None, (x.strip() for x in a.versiot.split(","))):
        k, _, v = osa.partition("=")
        if v.strip().isdigit():
            versiot[k.strip()] = int(v)

    kirjoitukset = []
    estot = tarkistimen_virheet()
    for doc in PT_DOCS:
        oma_polku = os.path.join(DATA, doc + ".json")
        oma = lue(oma_polku)
        if oma is None:
            continue
        if estot.get(doc):
            print(f"ESTO|{doc}|{len(estot[doc])}|{estot[doc][0][:160]}")
            continue
        live = lue(os.path.join(a.lista, doc + ".json"))
        if live == oma:
            continue
        k = {"op": "set", "collection": "talo", "doc_id": doc, "file_path": oma_polku}
        if live is not None:
            if doc not in versiot:
                print(f"VERSIO PUUTTUU|{doc}|anna --versiot {doc}=<versio listin tulosteesta>")
                continue
            k["if_version"] = versiot[doc]
            print(f"VIE|{doc}|sisältö eroaa taulusta")
        else:
            print(f"VIE|{doc}|puuttuu taulusta")
        kirjoitukset.append(k)
    tmp = a.ulos + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(kirjoitukset, f, ensure_ascii=False, indent=1)
    os.replace(tmp, a.ulos)
    print(f"KIRJOITUKSIA|{len(kirjoitukset)}|{a.ulos}")

    nyt = time.time()
    tapahtuma = viimeisin_tapahtuma()
    tila = lue(TILA) or {}
    muuttui = False
    for doc in ("junat", "tyolista"):
        sis = lue(os.path.join(DATA, doc + ".json"))
        if sis is None:
            continue
        ts = doc_ts(doc, sis)
        vanha = (tapahtuma - ts > RAJA_TAPAHTUMA and nyt - ts > RAJA_TAPAHTUMA)
        if doc == "tyolista" and 7 <= time.localtime(nyt).tm_hour <= 23 and nyt - ts > RAJA_TYOLISTA:
            vanha = True
        if vanha and nyt - float(tila.get(doc, 0)) > ILMOITUSVALI:
            print(f"VANHA|{doc}|{int((nyt - ts) / 60)}|{hhmm(tapahtuma) if tapahtuma else '-'}")
            tila[doc] = nyt
            muuttui = True
    if muuttui:
        tmp = TILA + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(tila, f)
        os.replace(tmp, TILA)


if __name__ == "__main__":
    main()
