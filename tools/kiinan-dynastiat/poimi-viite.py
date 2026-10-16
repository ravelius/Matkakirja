#!/usr/bin/env python3
"""Cliopatria (CC BY 4.0) -> pienet viitetiedostot avainvuosille Itä-Aasian rajauksella. Vain viitteeksi omalle piirrokselle."""
import json, sys, zipfile
from shapely.geometry import shape, box, mapping
K = sys.argv[1]
VUODET = [-221, -200, -100, 140, 250, 440, 500, 589, 669, 790, 950, 1100, 1142, 1280, 1421, 1644, 1760, 1873, 1911]
ALUE = box(60, 5, 145, 60)
z = zipfile.ZipFile(f'{K}/lahteet/cliopatria/cliopatria.geojson.zip')
nimi = [n for n in z.namelist() if n.endswith('.geojson')][0]
d = json.load(z.open(nimi))
print(len(d['features']), 'riviä', list(d['features'][0]['properties'].keys()))
for v in VUODET:
    ulos = []
    for f in d['features']:
        p = f['properties']
        if not (p['FromYear'] <= v <= p['ToYear']): continue
        g = shape(f['geometry'])
        if not g.intersects(ALUE): continue
        ulos.append({'type': 'Feature', 'properties': {'Name': p['Name'], 'FromYear': p['FromYear'], 'ToYear': p['ToYear']},
                     'geometry': mapping(g.intersection(ALUE).simplify(0.05))})
    json.dump({'type': 'FeatureCollection', 'features': ulos}, open(f'{K}/viite/cliopatria-{v}.geojson', 'w'))
    print(v, len(ulos), ', '.join(sorted(x['properties']['Name'] for x in ulos))[:300])
