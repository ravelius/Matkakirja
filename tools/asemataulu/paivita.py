#!/usr/bin/env python3
"""Asemataulun pikapäivitys (Päivitä-napin kommentti tai jonokierros): kokoaa tuoreet tiedot vientiä varten.

Ajo: python3 -I scratchpad/asemataulu/paivita.py → kirjoittaa vienti/{mittarit,roolit,laitteet}.json,
jotka Päätoimittaja vie artefaktiin ArtifactData batchilla (if_version). Mittarit = Postivahdin mittarit.json,
jonka Muisti- ja Prosessori-laatat ja ts tulevat tästä ajosta (kone.py); laitteet ajetaan uudelleen (laitteet.py).
"""
import json, os, subprocess, sys, time

KANSIO = os.path.dirname(os.path.abspath(__file__))
VIENTI = os.path.join(KANSIO, 'vienti')


def aja(skripti):
    ulos = subprocess.run([sys.executable, '-I', os.path.join(KANSIO, skripti)], capture_output=True, text=True, timeout=60)
    return json.loads(ulos.stdout.strip().splitlines()[-1])


def main():
    os.makedirs(VIENTI, exist_ok=True)
    nyt = int(time.time() * 1000)
    kone = aja('kone.py')
    laitteet = aja('laitteet.py')
    with open(os.path.join(KANSIO, 'mittarit.json')) as f:
        mittarit = json.load(f)
    laatat = [l for l in mittarit.get('laatat', []) if l.get('nimi') not in ('Uusin TestFlight', 'Muisti', 'Prosessori')]
    i = next((n for n, l in enumerate(laatat) if l.get('nimi') == 'Levy'), len(laatat) - 1)
    laatat[i + 1:i + 1] = [{'nimi': 'Muisti', 'arvo': f"{kone['muisti']} %"}, {'nimi': 'Prosessori', 'arvo': f"{kone['prosessori']} %"}]
    mittarit['laatat'] = laatat
    mittarit['ts'] = nyt
    with open(os.path.join(KANSIO, 'roolit.json')) as f:
        roolit = json.load(f)
    laitteet['ts'] = nyt
    for nimi, data in (('mittarit', mittarit), ('roolit', roolit), ('laitteet', laitteet)):
        with open(os.path.join(VIENTI, nimi + '.json'), 'w') as f:
            json.dump(data, f, ensure_ascii=False)
    print(json.dumps({'muisti': kone['muisti'], 'prosessori': kone['prosessori'],
                      'laitteet': [(r['nimi'], r['tila']) for r in laitteet['rivit']]}, ensure_ascii=False))


if __name__ == '__main__':
    sys.exit(main())
