#!/usr/bin/env python3
"""ASEMATAULUN MUISTUTUS Päätoimittajalle (omistaja 12.10.2026 klo 21.4x: "tee korjaus joka pitää huolen
että työlista ja asemataulu pysyy päivitettynä kaikissa tilanteissa").

Hook (vain Päätoimittajan checkout, Matkakirja-fable/.claude/settings.local.json):
- PostToolUse SendMessage|send_message: kun PT:n viesti kuittaa, lukitsee tai kertoo junasta/TF:stä,
  lisätään kontekstiin muistutus kirjata se Asemataulun tiedostoihin.
- UserPromptSubmit: kun omistaja kirjoittaa (ei roolien viestit eikä ajastukset), muistutus lisätä uusi
  pyyntö työlistaan.
Muistutus enintään kerran 10 minuutissa per laji (tila /Users/Shared/Claude/hooks/.pt-taulu-tila.json).
Ei koskaan estä mitään; virheessä hiljaa.
"""
import json
import os
import re
import sys
import time

TILA = "/Users/Shared/Claude/hooks/.pt-taulu-tila.json"
VALI = 600
DATA = "/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/data/talo"
JUNA = re.compile(r"KUITATTU|LUKITSE|OMISTAJA PYYSI|BUILD 1\d\d|TF 1\d\d|juna(an)? 1\d\d", re.I)


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


def muistuta(laji, teksti, tapahtuma):
    t = lue_tila()
    nyt = time.time()
    if nyt - float(t.get(laji, 0)) < VALI:
        return
    t[laji] = nyt
    kirjoita_tila(t)
    print(json.dumps({"hookSpecificOutput": {"hookEventName": tapahtuma, "additionalContext": teksti}},
                     ensure_ascii=False))


def main():
    try:
        d = json.load(sys.stdin)
    except ValueError:
        return
    tapahtuma = d.get("hook_event_name") or "PostToolUse"
    if tapahtuma == "UserPromptSubmit":
        p = str(d.get("prompt") or "")
        if not p.strip() or "cross-session-message" in p or p.lstrip().startswith(("JONOKIERROS", "<", "Another Claude session")):
            return
        muistuta("omistaja",
                 "ASEMATAULU (hook): jos omistajan viesti on uusi pyyntö tai päätös, lisää se työlistaan "
                 f"({DATA}/tyolista.json: oma paketti tai Työn alla -rivi) samassa vuorossa; Postivahti vie "
                 "tiedoston tauluun, tai vie itse ArtifactData set file_path.", tapahtuma)
        return
    viesti = str((d.get("tool_input") or {}).get("message") or "")
    if JUNA.search(viesti):
        muistuta("juna",
                 "ASEMATAULU (hook): päivitä tämä kuittaus/junatapahtuma tiedostoihin "
                 f"{DATA}/junat.json (Valmiina / Työn alla) ja tyolista.json (paketin tilanne, 'Junassa N:') "
                 "ennen vuoron loppua; Postivahti vie muuttuneet tiedostot tauluun.", tapahtuma)


if __name__ == "__main__":
    try:
        main()
    except Exception:  # noqa: BLE001 — hook ei saa koskaan kaataa vuoroa
        pass
