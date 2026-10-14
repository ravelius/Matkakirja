#!/usr/bin/env python3
"""CODEX ODOTTAA -tarkistus Postivahdin kierrokselle (Keskustelukanava 14.10.2026, omistajan kysymys:
"kuka pitää huolen että codex ja claude eivät jää vahingossa tyhjäkäynnille?").

Codex kirjoittaa postilaatikkoon (haara claude/postilaatikko) tiedostoja posti/codex-fable-*, Päätoimittaja vastaa
tiedostoilla posti/fable-codex-*. Jos Codexin uusin toimitus on uudempi kuin PT:n uusin vastaus ja vanhempi kuin
30 min, tulostetaan yksi rivi "CODEX ODOTTAA <min> min: <aihe> (klo HH.MM)". Muuten ei tulosteta mitään.
Käyttö: python3 -I /Users/Shared/Claude/Matkakirja-posti/codex-odottaa.py
"""
import subprocess, time, datetime

REPO = '/Users/Shared/Claude/Matkakirja-fable'
HAARA = 'origin/claude/postilaatikko'
RAJA_MIN = 30


def git(*args):
    return subprocess.run(['git', '-C', REPO, *args], capture_output=True, text=True, timeout=60).stdout.strip()


git('fetch', '-q', 'origin', 'claude/postilaatikko')
codex = git('log', '-1', '--format=%ct|%s', HAARA, '--', 'posti/codex-fable-*')
pt = git('log', '-1', '--format=%ct', HAARA, '--', 'posti/fable-codex-*')
if codex:
    t_codex, aihe = codex.split('|', 1)
    t_codex = int(t_codex)
    t_pt = int(pt) if pt else 0
    odotus = (time.time() - t_codex) / 60
    if t_codex > t_pt and odotus >= RAJA_MIN:
        klo = datetime.datetime.fromtimestamp(t_codex).strftime('%H.%M')
        print(f'CODEX ODOTTAA {int(odotus)} min: {aihe} (klo {klo})')
