#!/usr/bin/env python3
"""Raadin seuranta (PT 11.10.): vertaa ryhmän Arvioijat liittyneitä ja asentaneita edelliseen lukuun (raati-tila.json).
Tulostaa rivin 'RAATI: +N (yhteensä M, pvm)' vain kun luku kasvaa; muuten ei mitään. Ajo: python3 -I tools/raati-seuranta.py"""
import json, os, sys, time

LAHDE = '/Users/Shared/Claude/julkaisija-tyokalut/asc-testaajat.json'
TILA = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'raati-tila.json')

try:
    ryhma = next(r for r in json.load(open(LAHDE))['ryhmat'] if r.get('nimi') == 'Arvioijat')
except (OSError, ValueError, StopIteration, KeyError):
    sys.exit(0)
liittyneet = ryhma.get('liittyneita', 0) or 0
asentaneet = ryhma.get('asentaneet', (ryhma.get('tilat') or {}).get('INSTALLED', 0)) or 0
try:
    ed = json.load(open(TILA))
except (OSError, ValueError):
    ed = {'liittyneet': 0, 'asentaneet': 0}
dl, da = liittyneet - ed.get('liittyneet', 0), asentaneet - ed.get('asentaneet', 0)
if dl > 0 or da > 0:
    pvm = time.strftime('%d.%m.')
    print(f"RAATI: +{max(dl, 0)} liittynyt, +{max(da, 0)} asentanut (yhteensä {liittyneet}/{asentaneet}, {pvm})")
with open(TILA + '.tmp', 'w') as f:
    json.dump({'liittyneet': liittyneet, 'asentaneet': asentaneet, 'ts': int(time.time())}, f)
os.replace(TILA + '.tmp', TILA)
