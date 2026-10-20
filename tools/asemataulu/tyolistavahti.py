#!/usr/bin/env python3
"""TYÖLISTAVAHTI (omistaja 20.10.2026 klo 23.12, Raamattu 7.39 TYÖLISTAVAHTI; speksi docs/moduulit/asemataulu.md, TYÖLISTA).

Ajetaan jokaisessa taulun viennissä (synkka.py kutsuu ennen tarkistinta) PT:n tiedostolle data/talo/tyolista.json:

  1) työn alla ilman päivitystä (rivin ts) yli 24 h → rivin kenttä "vahti" = "ei päivitystä N h" (taululla punaisena) ja
     rivi "TYOLISTA VANHA|<otsikko>|<h>" PT:lle; yli 48 h → tila "pidossa" (taululla Odottaa) ja "TYOLISTA PIDOSSA|…",
     ellei PT ole uusinut riviä (uusi ts).
  2) tila valmis tai edistys ≥ 5 → tila "valmis", edistys 5, valmistui = päivä (pp.kk.), jos puuttuu → taululla Valmistuneet
     samassa viennissä; edistys > 5 korjataan 5:ksi.
  3) tuplarivit (sama tai lähes sama otsikko, vähintään toinen keskeneräinen) → "TYOLISTA TUPLA|<otsikko>|<otsikko>".
  4) työn alla yli 15 → "TYOLISTA LIIKAA|<määrä>".
  5) dokumentin kenttä "vahti": "kunnossa" tai "N vanhaa riviä" (taululla työlistan otsikon perässä).
Rivin ts normalisoidaan: millisekuntien merkkijono → luku; puuttuva (None) = vanha: "ei päivitysaikaa" punaisena ja
rivi "TYOLISTA EI TS|<otsikko>" PT:lle, mutta ei siirtoa pitoon (ikää ei tiedetä; 20.10. illan uudet rivit olivat ilman ts:ää).

  python3 -I tyolistavahti.py <tyolista.json> [--kirjoita] [--nyt <ms>]
Ilman --kirjoita vain tulostaa; --kirjoita tallentaa muutokset (väliaikainen tiedosto + os.replace).
"""
import argparse
import difflib
import json
import os
import re
import time

TUNTI_MS = 3600 * 1000
RAJA_VANHA_H = 24
RAJA_PIDOSSA_H = 48
RAJA_TYON_ALLA = 15
TUPLA_SUHDE = 0.88


def _ts(arvo):
    if isinstance(arvo, bool):
        return None
    if isinstance(arvo, (int, float)) and arvo > 0:
        return int(arvo)
    if isinstance(arvo, str) and arvo.strip().isdigit():
        return int(arvo.strip())
    return None


def _tyon_alla(r):
    return bool(re.search(r"työn alla|kokoamassa", str(r.get("tila", "")), re.I)) and not _valmis(r)


def _valmis(r):
    return str(r.get("tila", "")).strip().lower().startswith("valmis")


def _avain(otsikko):
    return re.sub(r"[^0-9a-zåäö]+", " ", str(otsikko).lower()).strip()


def vahti(tl, nyt_ms):
    """Palauttaa (muuttunut, rivit PT:lle). Muokkaa tl:ää paikallaan."""
    rivit_pt = []
    if not isinstance(tl, dict) or not isinstance(tl.get("rivit"), list):
        return False, rivit_pt
    alku = json.dumps(tl, ensure_ascii=False, sort_keys=True)
    paiva = time.strftime("%d.%m.", time.localtime(nyt_ms / 1000)).lstrip("0").replace(".0", ".")
    vanhoja = 0
    for r in tl["rivit"]:
        if not isinstance(r, dict):
            continue
        ts = _ts(r.get("ts"))
        if ts is not None and r.get("ts") != ts:
            r["ts"] = ts
        ed = r.get("edistys")
        if isinstance(ed, (int, float)) and not isinstance(ed, bool) and ed > 5:
            r["edistys"] = 5
            ed = 5
        if _valmis(r) or (isinstance(ed, (int, float)) and not isinstance(ed, bool) and ed >= 5):
            r["tila"] = "valmis"
            r["edistys"] = 5
            if not r.get("valmistui"):
                r["valmistui"] = paiva
            r.pop("vahti", None)
            continue
        if not _tyon_alla(r):
            r.pop("vahti", None)
            continue
        ika_h = (nyt_ms - ts) / TUNTI_MS if ts is not None else None
        otsikko = str(r.get("otsikko", "?"))[:60]
        if ika_h is None:
            r["vahti"] = "ei päivitysaikaa"
            vanhoja += 1
            rivit_pt.append("TYOLISTA EI TS|%s" % otsikko)
        elif ika_h > RAJA_PIDOSSA_H:
            r["tila"] = "pidossa"
            r["vahti"] = "ei päivitystä yli %d h – pidossa" % RAJA_PIDOSSA_H
            rivit_pt.append("TYOLISTA PIDOSSA|%s|%d h" % (otsikko, ika_h))
        elif ika_h > RAJA_VANHA_H:
            r["vahti"] = "ei päivitystä %d h" % ika_h
            vanhoja += 1
            rivit_pt.append("TYOLISTA VANHA|%s|%d h" % (otsikko, ika_h))
        else:
            r.pop("vahti", None)
    # Tuplat: sama tai lähes sama otsikko, vähintään toinen keskeneräinen.
    rs = [r for r in tl["rivit"] if isinstance(r, dict) and r.get("otsikko")]
    for i in range(len(rs)):
        for j in range(i + 1, len(rs)):
            a, b = rs[i], rs[j]
            if _valmis(a) and _valmis(b):
                continue
            ka, kb = _avain(a["otsikko"]), _avain(b["otsikko"])
            if ka == kb or difflib.SequenceMatcher(None, ka, kb).ratio() >= TUPLA_SUHDE:
                rivit_pt.append("TYOLISTA TUPLA|%s|%s" % (str(a["otsikko"])[:60], str(b["otsikko"])[:60]))
    tyon_alla = sum(1 for r in rs if _tyon_alla(r))
    if tyon_alla > RAJA_TYON_ALLA:
        rivit_pt.append("TYOLISTA LIIKAA|%d työn alla (raja %d)" % (tyon_alla, RAJA_TYON_ALLA))
    tl["vahti"] = "kunnossa" if vanhoja == 0 else "%d vanhaa riviä" % vanhoja
    return json.dumps(tl, ensure_ascii=False, sort_keys=True) != alku, rivit_pt


def aja_tiedostolle(polku, kirjoita, nyt_ms=None):
    try:
        with open(polku, encoding="utf-8") as f:
            tl = json.load(f)
    except (OSError, ValueError):
        return False, []
    muuttui, rivit = vahti(tl, nyt_ms if nyt_ms is not None else int(time.time() * 1000))
    if muuttui and kirjoita:
        tmp = polku + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(tl, f, ensure_ascii=False, indent=1)
        os.replace(tmp, polku)
    return muuttui, rivit


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tiedosto")
    ap.add_argument("--kirjoita", action="store_true")
    ap.add_argument("--nyt", type=int, default=None, help="nykyhetki millisekunteina (testit)")
    a = ap.parse_args()
    muuttui, rivit = aja_tiedostolle(a.tiedosto, a.kirjoita, a.nyt)
    for r in rivit:
        print(r)
    print("TYOLISTAVAHTI|%s" % ("muutettu" if muuttui and a.kirjoita else "muuttuisi" if muuttui else "ennallaan"))


if __name__ == "__main__":
    main()
