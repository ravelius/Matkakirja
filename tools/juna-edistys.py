#!/usr/bin/env python3
"""Junan edistys TestFlight-ajosta (PT 11.10.): tulostaa JSON {edistys, valmis_arvio, valmis} gh run view -tiedoista.
Ajo: python3 -I tools/juna-edistys.py [ajo-id]   (oletus: uusin 'proto-3d TestFlight' -ajo)
Vaiheet: 1 lukittu · 2 'Arkistoi ja allekirjoita' valmis · 3 'Lähetä TestFlightiin' valmis ·
4 'Build sisäiselle testiryhmälle' käynnissä (Apple käsittelee) · 5 sama valmis (build TestFlightissa)."""
import json, subprocess, sys, time

REPO = 'ravelius/Matkakirja'
MIN_JAANYT = {1: 35, 2: 12, 3: 8, 4: 5, 5: 0}  # karkea arvio minuutteina


def gh(*a):
    return subprocess.run(['gh', *a], capture_output=True, text=True, timeout=60).stdout


ajo = sys.argv[1] if len(sys.argv) > 1 else None
if ajo is None:
    rivit = json.loads(gh('run', 'list', '--repo', REPO, '--workflow', 'proto-3d TestFlight', '-L', '1', '--json', 'databaseId') or '[]')
    if not rivit:
        sys.exit(1)
    ajo = str(rivit[0]['databaseId'])
d = json.loads(gh('run', 'view', ajo, '--repo', REPO, '--json', 'status,conclusion,jobs'))
vaiheet = {s['name']: s for j in d['jobs'][:1] for s in j['steps']}
def tila(n):
    s = vaiheet.get(n)
    return (s['status'], s['conclusion']) if s else ('', '')
edistys = 1
if tila('Arkistoi ja allekirjoita')[1] == 'success':
    edistys = 2
if tila('Lähetä TestFlightiin')[1] == 'success':
    edistys = 3
sis = tila('Build sisäiselle testiryhmälle')
if sis[0] == 'in_progress':
    edistys = 4
if sis[1] == 'success':
    edistys = 5
arvio = time.strftime('%Y-%m-%dT%H:%M:%S+0300', time.gmtime(time.time() + 3 * 3600 + MIN_JAANYT[edistys] * 60))
print(json.dumps({'ajo': ajo, 'edistys': edistys, 'valmis_arvio': arvio, 'valmis': edistys == 5,
                  'ajo_epaonnistui': d.get('conclusion') in ('failure', 'cancelled')}, ensure_ascii=False))
