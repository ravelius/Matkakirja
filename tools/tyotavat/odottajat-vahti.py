#!/usr/bin/env python3
"""Asemataulun VAATII TOIMIA -vahti (omistaja 12.10.2026 klo 11.1x: "miten taulun saisi päivittymään heti kun kysymys tulee").

Lukee Clauden sessioiden tilatiedostot ~/.claude/sessions/<pid>.json kahden sekunnin välein. Kun session tila on "waiting"
(lupakysely tai kysymys odottaa omistajaa roolin ikkunassa) vähintään VIIVE sekuntia, tulostaa rivin
    ODOTTAA|<rooli>|<mitä odottaa>|<doc_id>|<alkoi HH.MM>
ja kun odotus päättyy (tai sessio sulkeutuu), rivin
    JATKUU|<rooli>|<doc_id>
Käynnistyessä ensimmäinen rivi on TILA|<doc_id,doc_id,...> (kaikki juuri nyt odottavat), jotta valvoja voi poistaa vanhentuneet
toimi-*-odottaa-dokumentit. Jokainen rivi on Monitor-tapahtuma: valvoja (Postivahti) kirjoittaa talo/<doc_id> tai poistaa sen.
TYHJÄKÄYNTI (KK 15.10.2026; omistaja 14.10. 20.2x "kuka pitää huolen että codex ja claude eivät jää vahingossa
tyhjäkäynnille?"; 15.10. seitsemän roolia lepäsi 1–3 h huomaamatta): kun roolin tila on "idle" vähintään TYHJA_MIN
minuuttia, tulostuu rivi
    TYHJÄKÄYNTI|<rooli>|<min> min|<levossa klo HH.MM>
enintään kerran tunnissa roolia kohden (tila säilyy uudelleenkäynnistyksen yli). PT antaa roolille seuraavan erän
työlistalta tai toteaa levon oikeutetuksi. Ohjaavat sessiot ja Laitetestaaja eivät hälytä.

Käyttö: python3 -u /Users/Shared/Claude/hooks/odottajat-vahti.py [--kerran | --tyhjat]
  --tyhjat: tulosta nyt tyhjäkäynnillä olevat roolit kerran (ei tilamuutosta) ja lopeta
"""
import glob
import json
import os
import sys
import time

KANSIO = os.path.expanduser("~/.claude/sessions")
VALI = 2.0
VIIVE = 10.0
TYHJA_MIN = 20
TYHJA_VALI = 3600
TYHJA_TILA = "/Users/Shared/Claude/hooks/.tyhjakaynti-tila.json"
EI_TYHJA = {"KESKUSTELUKANAVA", "PÄÄTOIMITTAJA", "Postivahti", "Asemataulu", "Laitetestaaja"}


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


def tyhjat(nyt, hetki):
    """[(rooli, minuutit, alkoi HH.MM)] rooleista, joiden tila on ollut 'idle' vähintään TYHJA_MIN minuuttia."""
    tulos = []
    for d in nyt.values():
        r = rooli(d.get("name"))
        if r in EI_TYHJA or str(d.get("status", "")) != "idle":
            continue
        alku = (d.get("statusUpdatedAt") or 0) / 1000.0
        minuutit = int((hetki - alku) / 60) if alku else 0
        if minuutit >= TYHJA_MIN:
            tulos.append((r, minuutit, time.strftime("%H.%M", time.localtime(alku))))
    return sorted(tulos, key=lambda x: -x[1])


def lue_json(polku):
    try:
        with open(polku, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def kirjoita_json(polku, d):
    try:
        with open(polku + ".tmp", "w", encoding="utf-8") as f:
            json.dump(d, f)
        os.replace(polku + ".tmp", polku)
    except OSError:
        pass


def ilmoita_tyhjat(nyt, hetki):
    tila = lue_json(TYHJA_TILA)
    muuttui = False
    for r, minuutit, alkoi in tyhjat(nyt, hetki):
        if hetki - float(tila.get(r, 0)) < TYHJA_VALI:
            continue
        print("TYHJÄKÄYNTI|%s|%d min|levossa klo %s" % (r, minuutit, alkoi), flush=True)
        tila[r] = hetki
        muuttui = True
    if muuttui:
        kirjoita_json(TYHJA_TILA, tila)


def main():
    if "--tyhjat" in sys.argv:
        for r, minuutit, alkoi in tyhjat(lue(), time.time()):
            print("TYHJÄKÄYNTI|%s|%d min|levossa klo %s" % (r, minuutit, alkoi))
        return
    kerran = "--kerran" in sys.argv
    ilmoitetut = {}  # sid -> doc_id
    nyt = lue()
    alussa = sorted({doc_id(rooli(d.get("name"))) for d in nyt.values() if odottaa(d)})
    print("TILA|" + ",".join(alussa), flush=True)
    if kerran:
        return
    seuraava_tyhja = 0.0
    while True:
        nyt = lue()
        hetki = time.time()
        if hetki >= seuraava_tyhja:
            ilmoita_tyhjat(nyt, hetki)
            seuraava_tyhja = hetki + 60
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
