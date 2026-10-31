#!/usr/bin/env python3
"""Pariisin lukitun pohjan OSM-haku (Karttaseppä 31.10.2026; PT: koko Pariisi, OSM relation 7444).
Overpass, 6 × 4 solua bboxissa [2.219, 48.809, 2.476, 48.909]; välimuisti osm/solu-r<r>-c<c>.json ja osm/raja-7444.json.
Käyttö: python3 -I hae-osm.py   (jatkaa kesken jääneestä; robots/ehdot: Overpass API, 1 pyyntö kerrallaan, tauko)."""
import json, os, sys, time, urllib.request, urllib.parse
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'osm')
PAL = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter',
       'https://maps.mail.ru/osm/tools/overpass/api/interpreter']
W, S, E, N = 2.219, 48.809, 2.476, 48.909
C, R = 6, 4
UA = {'User-Agent': 'matkakirja/1.0 (opetuspeli; karttaseppa)'}

def hae(kysely, ulos):
    if os.path.exists(ulos) and os.path.getsize(ulos) > 100:
        return
    for i in range(1, 30):
        p = PAL[(i - 1) % len(PAL)]
        try:
            req = urllib.request.Request(p, data=urllib.parse.urlencode({'data': kysely}).encode(), headers=UA)
            with urllib.request.urlopen(req, timeout=400) as v:
                b = v.read()
            j = json.loads(b)
            if 'remark' in j and 'runtime error' in j['remark']:
                raise RuntimeError(j['remark'][:120])
            open(ulos + '.tmp', 'wb').write(b); os.replace(ulos + '.tmp', ulos)
            print('ok', os.path.basename(ulos), len(j.get('elements', [])), flush=True)
            return
        except Exception as e:
            print('  yritys', i, p.split('/')[2], str(e)[:100], flush=True)
            time.sleep(min(120, 10 * i))
    sys.exit('ei onnistunut: ' + ulos)

hae('[out:json][timeout:300];relation(7444);out geom;', os.path.join(D, 'raja-7444.json'))
for r in range(R):
    for c in range(C):
        w = W + (E - W) * c / C; e = W + (E - W) * (c + 1) / C
        n = N - (N - S) * r / R; s = N - (N - S) * (r + 1) / R
        bb = f'{s:.5f},{w:.5f},{n:.5f},{e:.5f}'
        q = (f'[out:json][timeout:300][bbox:{bb}];('
             'way["building"];relation["building"];'
             'way["highway"];way["railway"~"rail|light_rail|subway|tram"]["tunnel"!="yes"];'
             'way["natural"~"water|wood|scrub|grassland"];relation["natural"~"water|wood"];'
             'way["waterway"~"riverbank|canal|river|dock"];relation["waterway"="riverbank"];'
             'way["leisure"~"park|garden|pitch|playground|golf_course|stadium"];relation["leisure"~"park|garden"];'
             'way["landuse"~"grass|forest|cemetery|recreation_ground|meadow|village_green"];relation["landuse"~"forest|cemetery|grass"];'
             'way["man_made"="bridge"];'
             ');out geom;')
        hae(q, os.path.join(D, f'solu-r{r}-c{c}.json'))
        time.sleep(5)
print('VALMIS')
