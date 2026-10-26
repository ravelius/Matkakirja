#!/usr/bin/env python3
"""Kirjoittaa tuoreet mittarit.json ja roolit.json Asemataulun scratchpad-kansioon (Päivitä-napin pikapäivitys lukee ne).

Ajo: python3 -I tools/tuore-json.py <viikko%> <5h%> <pt%> <nollautuu ISO> <työssä-roolit pilkuilla tai ->
"""
import json, os, subprocess, sys, time

D = '/Users/Shared/Claude/Matkakirja-fable/scratchpad/asemataulu/'
viikko, viisi, pt, nollautuu = int(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
tyo = set(r for r in sys.argv[5].split(',') if r and r != '-')
now = int(time.time() * 1000)
gi = int(subprocess.run(['df', '-g', '/'], capture_output=True, text=True).stdout.splitlines()[-1].split()[3])


def kirjoita(nimi, data):
    p = D + nimi
    open(p + '.tmp', 'w').write(json.dumps(data, ensure_ascii=False))
    os.replace(p + '.tmp', p)


m = json.load(open(D + 'mittarit.json'))
for l in m['laatat']:
    if l['nimi'] == 'Viikko':
        l['prosentti'] = viikko
        l['arvo'] = '%d %%' % viikko
    elif l['nimi'] == '5 tuntia':
        l['prosentti'] = viisi
        l['nollautuu'] = nollautuu
    elif l['nimi'] == 'Levy':
        l['arvo'] = '%d Gi' % gi
        l['lisa'] = 'alle 100 Gi'
m['ts'] = now
m['pt_konteksti'] = pt
kirjoita('mittarit.json', m)

r = json.load(open(D + 'roolit.json'))
for x in r['rivit']:
    x['aika'] = time.strftime('%H.%M')
    if x['nimi'] in tyo:
        x['teksti'], x['tila'] = 'Työ käynnissä', 'työ'
    elif x['nimi'] == 'Laitetestaaja':
        x['teksti'], x['tila'] = 'Odottaa', 'odottaa'
    else:
        x['teksti'], x['tila'] = 'Levossa', 'lepo'
r['ts'] = now
kirjoita('roolit.json', r)
print('ok levy', gi)
