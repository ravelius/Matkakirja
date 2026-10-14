#!/usr/bin/env python3
"""Asemataulun VAATII TOIMIA -vahti (omistaja 12.10.2026 klo 11.1x: "miten taulun saisi päivittymään heti kun kysymys tulee").

Lukee Clauden sessioiden tilatiedostot ~/.claude/sessions/<pid>.json kahden sekunnin välein. Kun session tila on "waiting"
(lupakysely tai kysymys odottaa omistajaa roolin ikkunassa) vähintään VIIVE sekuntia, tulostaa rivin
    ODOTTAA|<rooli>|<mitä odottaa>|<doc_id>|<alkoi HH.MM>
ja kun odotus päättyy (tai sessio sulkeutuu), rivin
    JATKUU|<rooli>|<doc_id>
Käynnistyessä ensimmäinen rivi on TILA|<doc_id,doc_id,...> (kaikki juuri nyt odottavat), jotta valvoja voi poistaa vanhentuneet
toimi-*-odottaa-dokumentit. Jokainen rivi on Monitor-tapahtuma: valvoja (Postivahti) kirjoittaa talo/<doc_id> tai poistaa sen.

Käyttö: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py [--kerran]
"""
import glob
import json
import os
import sys
import time

KANSIO = os.path.expanduser("~/.claude/sessions")
VALI = 2.0
VIIVE = 10.0


def rooli(nimi):
    nimi = (nimi or "").strip()
    return nimi.split(" (")[0].strip() or "Tuntematon"


def doc_id(r):
    s = r.lower()
    for a, b in (("ä", "a"), ("ö", "o"), ("å", "a"), ("é", "e")):
        s = s.replace(a, b)
    s = "".join(c if c.isalnum() else "-" for c in s).strip("-")
    while "--" in s:
        s = s.replace("--", "-")
    return "toimi-" + s + "-odottaa"


def lue():
    tilat = {}
    for p in glob.glob(os.path.join(KANSIO, "*.json")):
        try:
            with open(p, encoding="utf-8") as f:
                d = json.load(f)
        except (OSError, ValueError):
            continue
        sid = d.get("hostSessionId") or d.get("sessionId") or p
        tilat[sid] = d
    return tilat


def odottaa(d):
    return str(d.get("status", "")) == "waiting"


def main():
    kerran = "--kerran" in sys.argv
    ilmoitetut = {}  # sid -> doc_id
    nyt = lue()
    alussa = sorted({doc_id(rooli(d.get("name"))) for d in nyt.values() if odottaa(d)})
    print("TILA|" + ",".join(alussa), flush=True)
    if kerran:
        return
    while True:
        nyt = lue()
        hetki = time.time()
        for sid, d in nyt.items():
            if not odottaa(d) or sid in ilmoitetut:
                continue
            alku = (d.get("statusUpdatedAt") or 0) / 1000.0
            if hetki - alku < VIIVE:
                continue
            r = rooli(d.get("name"))
            di = doc_id(r)
            mita = str(d.get("waitingFor") or "kysymys")
            print("ODOTTAA|%s|%s|%s|%s" % (r, mita, di, time.strftime("%H.%M", time.localtime(alku))), flush=True)
            ilmoitetut[sid] = di
        for sid in list(ilmoitetut):
            d = nyt.get(sid)
            if d is None or not odottaa(d):
                print("JATKUU|%s|%s" % (rooli((d or {}).get("name")) if d else "?", ilmoitetut[sid]), flush=True)
                del ilmoitetut[sid]
        time.sleep(VALI)


if __name__ == "__main__":
    main()
