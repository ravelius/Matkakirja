#!/usr/bin/env python3
"""CODEX ODOTTAA -tarkistus Postivahdin kierrokselle (Keskustelukanava 14.10.2026; korjattu omistajan kortilla
17.10.2026 klo 07.25 "Kyllä (Suositus)": vanha versio katsoi vain posti/codex-fable-*, joten Codexin viestit muille
rooleille, esim. 00.38 posti/codex-linssiseppa-peking361-*, jäivät näkymättä).

Codexin viestit: posti/codex-<vastaanottaja>-<aihe>-*.md. Clauden vastaukset: posti/<lähettäjä>-codex-<aihe>-*.md.
Viesti on vastattu, kun sen jälkeen sama rooli on kirjoittanut Codexille (mihin tahansa aiheeseen) tai joku rooli on
vastannut samaan aiheeseen (aihetunnus = ensimmäinen sana roolin jälkeen, esim. peking361).
Katsotaan viestit IKKUNA_H tunnin ajalta (vanhat aiheet eivät jää huutamaan ikuisesti).
Tuloste, yksi rivi per vastaamaton viesti:
  CODEX ODOTTAA <min> min: <tiedosto> (klo HH.MM, <sha>)            ≥ 30 min → Postivahti PT:lle
  CODEX ODOTTAA YLI 60 MIN <min> min: <tiedosto> (klo HH.MM, <sha>) → myös KK:lle + Asemataulun VAATII TOIMIA
Ei tulostetta = kaikki vastattu. --kaikki näyttää myös alle 30 min odotukset (testi).
Käyttö: python3 -I /Users/Shared/Claude/Matkakirja-posti/codex-odottaa.py [--kaikki]
"""
import os, re, subprocess, sys, time, datetime

REPO = '/Users/Shared/Claude/Matkakirja-fable'
HAARA = 'origin/claude/postilaatikko'
RAJA_MIN = 30
HALYTYS_MIN = 60
IKKUNA_H = 72


def git(*args):
    return subprocess.run(['git', '-C', REPO, *args], capture_output=True, text=True, timeout=120).stdout


def aihe(sana):
    m = re.match(r'([a-zåäö]+)-?(\d*)', sana)
    return (m.group(1) + m.group(2)) if m else sana


git('fetch', '-q', 'origin', 'claude/postilaatikko')
loki = git('log', HAARA, f'--since={IKKUNA_H}.hours', '--diff-filter=A', '--name-only', '--format=@%ct|%h')
viestit, vastaukset = [], []
t, sha = 0, ''
for rivi in loki.splitlines():
    if rivi.startswith('@'):
        t, sha = rivi[1:].split('|')
        t = int(t)
        continue
    m = re.fullmatch(r'posti/([^/]+)\.md', rivi.strip())
    if not m:
        continue
    osat = m.group(1).split('-')
    if len(osat) >= 3 and osat[0] == 'codex':
        viestit.append((t, sha, osat[1], aihe(osat[2]), rivi.strip()))
    elif len(osat) >= 3 and osat[1] == 'codex':
        vastaukset.append((t, osat[0], aihe(osat[2])))

# Käsin kuitatut (PT 17.10. klo 07.5x): Codexin viestit, joiden vastaanottaja ei ole roolin nimi (esim. codex-peking-*,
# codex-fable-*) eikä vastaus siksi täsmää; yksi tiedostopolku per rivi tiedostossa kuitatut.txt skriptin vieressä.
try:
    KUITATUT = {r.strip() for r in open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'kuitatut.txt')) if r.strip() and not r.startswith('#')}
except OSError:
    KUITATUT = set()
viestit = [v for v in viestit if v[4] not in KUITATUT]
kaikki = '--kaikki' in sys.argv
nyt = time.time()
for t, sha, rooli, a, tiedosto in sorted(viestit):
    # vastattu: sama rooli on kirjoittanut Codexille myöhemmin (keskustelu etenee), tai mikä tahansa rooli samaan aiheeseen
    if any(vt >= t and (vr == rooli or va == a) for vt, vr, va in vastaukset):
        continue
    odotus = int((nyt - t) / 60)
    if odotus < RAJA_MIN and not kaikki:
        continue
    klo = datetime.datetime.fromtimestamp(t).strftime('%d.%m. %H.%M')
    taso = f'YLI {HALYTYS_MIN} MIN ' if odotus >= HALYTYS_MIN else ''
    print(f'CODEX ODOTTAA {taso}{odotus} min: {tiedosto} (klo {klo}, {sha})')
