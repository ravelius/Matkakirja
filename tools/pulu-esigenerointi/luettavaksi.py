# Pulun valmiiden vastausten luettava kooste lähdetarkistukseen (PK 10.11.2026; PT/KK 02.57: jokainen paketti riippumattomaan
# lähdetarkistukseen ennen vientiä). python3 tools/pulu-esigenerointi/luettavaksi.py <kansio> "<otsikko>" "<paketti>"
import json, sys, os
k, otsikko, paketti = sys.argv[1:4]
s = json.load(open(os.path.join(k, 'syote.json'))); v1 = json.load(open(os.path.join(k, 'vaihe1.json'))); v2 = json.load(open(os.path.join(k, 'vaihe2.json')))
o = [f'# Pulun valmiit vastaukset: {otsikko}', '', f'PK 10.11.2026. {len(v1)} kysymystä + {len(v2)} "Kerro lisää" -vastausta. Paketti {paketti}.', '']
for x in s:
    nimi = (x.get('aihe') or {}).get('nimi') or x['kohta']
    o += [f"## {nimi} ({x['kohta']})", '']
    for e in [y for y in v1 if y['kohde'] == x['kohta']]:
        o += [f"**{e['kysymys']}**", '', e['vastaus'], '', 'Jatkot: ' + ' / '.join(e['jatkot']), '']
    l = [y for y in v2 if y['kohde'] == x['kohta']]
    o += [f'### Kerro lisää ({len(l)})', '']
    for e in l:
        o += [f"- **{e['kasite']}:** {e['vastaus']} (Jatkot: {' / '.join(e['jatkot'])})", '']
open(os.path.join(k, 'LUETTAVAKSI.md'), 'w').write('\n'.join(o))
print(k, len(o), 'riviä')
