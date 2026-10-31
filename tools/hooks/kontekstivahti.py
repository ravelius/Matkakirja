#!/usr/bin/env python3
"""KONTEKSTIVAHTI kaikille rooleille (omistaja 31.10.2026 klo 22.17: "Jokainen rooli näkee oman kokonsa ja luovuttaa
työnsä rajalla."). Asennus: bash tools/hooks/asenna-kontekstivahti-hook.sh (omistaja ajaa itse; käyttäjätaso
~/.claude/settings.json, joten koskee myös roolien worktreitä).

Rooli päätellään session kansiosta (cwd), rajat Raamattu 7.37 NOLLAUSRAJAT ROOLEITTAIN (pehmeä–kova):
Postivahti 20–30; Laitetestaaja ja Äänittäjä 30–40; muut roolit 25–35. Päätoimittajan ja Keskustelukanavan
yhteinen kansio Matkakirja-fable ohitetaan: sillä on oma vahti (pt-taulu-muistutus.py). Koskee vain kansioita
/Users/Shared/Claude/Matkakirja-* ja /Users/Shared/Claude/wt/* (ei omistajan muita projekteja).
Mittaus enintään kerran 2 minuutissa ja muistutus enintään kerran 10 minuutissa per laji ja sessio
(tila /Users/Shared/Claude/hooks/.kontekstivahti-tila.json). Ei koskaan estä mitään; virheessä hiljaa.
"""
import json
import os
import sys
import time

TILA = "/Users/Shared/Claude/hooks/.kontekstivahti-tila.json"
OHITA = "/Users/Shared/Claude/Matkakirja-fable"
KOSKEE = ("/Users/Shared/Claude/Matkakirja-", "/Users/Shared/Claude/wt/")  # KK 31.10. 22.2x: ei omistajan muita projekteja
MITTAUSVALI = 120
VALI = 600
IKKUNA = 1_000_000  # get_usage: contextWindow 1000000
LOPPU_TAVUT = 3_000_000


def rajat(cwd):
    nimi = os.path.basename(cwd.rstrip("/")).lower()
    if "posti" in nimi:
        return "Postivahti", 20, 30
    if "laitetestaaja" in nimi:
        return "Laitetestaaja", 30, 40
    if "aanittaja" in nimi:
        return "Äänittäjä", 30, 40
    return "rooli", 25, 35


def lue_tila():
    try:
        with open(TILA, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def kirjoita_tila(t):
    try:
        tmp = TILA + ".tmp"
        with open(tmp, "w", encoding="utf-8") as f:
            json.dump(t, f)
        os.replace(tmp, TILA)
    except OSError:
        pass


def konteksti_prosentti(polku):
    """Viimeisen pääkeskustelun mallikutsun konteksti prosentteina, tai None (sama laskenta kuin pt-taulu-muistutus.py)."""
    with open(polku, "rb") as f:
        f.seek(0, os.SEEK_END)
        koko = f.tell()
        f.seek(max(0, koko - LOPPU_TAVUT))
        rivit = f.read().splitlines()
    for rivi in reversed(rivit):
        if b'"usage"' not in rivi:
            continue
        try:
            e = json.loads(rivi)
        except ValueError:
            continue
        if e.get("type") != "assistant" or e.get("isSidechain"):
            continue
        u = (e.get("message") or {}).get("usage") or {}
        tokenit = u.get("input_tokens", 0) + u.get("cache_read_input_tokens", 0) + u.get("cache_creation_input_tokens", 0)
        if tokenit:
            return round(100 * tokenit / IKKUNA)
    return None


def main():
    try:
        d = json.load(sys.stdin)
    except ValueError:
        return
    cwd = str(d.get("cwd") or os.getcwd())
    if cwd.rstrip("/") == OHITA or not cwd.startswith(KOSKEE):
        return
    polku = str(d.get("transcript_path") or "")
    sessio = str(d.get("session_id") or "")
    if not polku or not os.path.exists(polku):
        return
    t = lue_tila()
    nyt = time.time()
    if nyt - float(t.get(f"mittaus:{sessio}", 0)) < MITTAUSVALI:
        return
    t[f"mittaus:{sessio}"] = nyt
    p = konteksti_prosentti(polku)
    rooli, pehmea, kova = rajat(cwd)
    teksti = None
    if p is not None and p >= pehmea:
        laji = "kova" if p >= kova else "pehmea"
        if nyt - float(t.get(f"{laji}:{sessio}", 0)) >= VALI:
            t[f"{laji}:{sessio}"] = nyt
            if laji == "kova":
                teksti = (f"KONTEKSTIVAHTI (hook): konteksti {p} % ≥ {kova} % : KOVA RAJA ({rooli}, Raamattu 7.37). Lopeta uudet "
                          "työt, vie vaihe turvalliseen kohtaan, kirjoita luovutus (docs/moduulit/siirtoraportti.md) ja push, "
                          "ja lähetä Postivahdille LUOVUTUS VALMIS <sha>. Toistuu 10 min välein.")
            else:
                teksti = (f"KONTEKSTIVAHTI (hook): konteksti {p} % ≥ {pehmea} % : pehmeä raja ({rooli}, Raamattu 7.37). Ei uusia "
                          f"isoja tehtäviä; luovutus ja nollaus ensimmäisellä luontevalla tauolla, viimeistään {kova} %:ssa.")
    kirjoita_tila(t)
    if teksti:
        tapahtuma = d.get("hook_event_name") or "PostToolUse"
        print(json.dumps({"hookSpecificOutput": {"hookEventName": tapahtuma, "additionalContext": teksti}}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception:  # noqa: BLE001 — hook ei saa koskaan kaataa vuoroa
        pass
