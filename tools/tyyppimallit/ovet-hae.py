"""PÄÄOVET OSM:STÄ (Valoseppä 17.11.2026; KK 17.11. ~01.1x kohta 1): planeettaotteissa ei ole ovisolmuja, joten haetaan Overpassista
entrance=*-solmut niille merkeille, joiden julkisivu ratkaistaan koneellisesti (parametrit.avoimuus), ja kirjoitetaan ovet-<kaupunki>.json:
  {"haettu": "...", "lahde": "OSM Overpass (ODbL)", "ovet": {"relation/1": [{"node": 1, "lat": .., "lon": .., "entrance": "main", "nimi": "..", "katu": ".."}]}}
tyypitys.py lukee tiedoston (--ovet tai oletuksena tämän kansion ovet-<kaupunki>.json): yhden sivun entrance=main voittaa avoimuussäännön.
Käyttö: python3 -I ovet-hae.py <merkit-<kaupunki>.json> <ulos.json>"""
import json, os, sys, time, urllib.parse, urllib.request

PALVELIMET = ('https://overpass-api.de/api/interpreter', 'https://overpass.private.coffee/api/interpreter', 'https://overpass.kumi.systems/api/interpreter')


def kysy(q):
    viive = 10
    for kierros in range(5):
        for url in PALVELIMET:
            try:
                req = urllib.request.Request(url, data=urllib.parse.urlencode({'data': q}).encode(), headers={'User-Agent': 'matkakirja-tyokalu/1.0'})
                raw = urllib.request.urlopen(req, timeout=180).read()
                if raw[:1] == b'{': return json.loads(raw)
            except Exception as e:
                print(f'  {url}: {e}', file=sys.stderr)
        time.sleep(viive); viive *= 2
    raise SystemExit('Overpass ei vastannut')


def main(merkit_polku, ulos):
    ms = json.load(open(merkit_polku))['merkit']
    oidit = [m['osm'] for m in ms if (m.get('parametrit') or {}).get('avoimuus')]
    sel = ''.join(f"{'way' if o.startswith('way/') else 'rel'}({o.split('/')[1]});" for o in oidit)
    q = (f'[out:json][timeout:170];({sel})->.b;foreach.b->.x(.x out ids;(way(r.x);.x;)->.ww;way.ww->.ww;node(w.ww)[entrance];out;);')
    d = kysy(q)
    ovet, nyk = {}, None
    for e in d['elements']:
        if e['type'] != 'node': nyk = f"{'way' if e['type'] == 'way' else 'relation'}/{e['id']}"; ovet[nyk] = []; continue
        t = e.get('tags', {})
        ovet[nyk].append({'node': e['id'], 'lat': e['lat'], 'lon': e['lon'], 'entrance': t.get('entrance'),
                          'nimi': t.get('name'), 'katu': t.get('addr:street'), 'numero': t.get('addr:housenumber'), 'access': t.get('access')})
    json.dump({'haettu': time.strftime('%Y-%m-%d %H:%M'), 'lahde': 'OSM Overpass (ODbL), entrance=* rakennuksen ääriviivan solmuilla',
               'merkit': os.path.abspath(merkit_polku), 'ovet': ovet}, open(ulos, 'w'), ensure_ascii=False, indent=1)
    print(f'{ulos}: {len(oidit)} merkkiä, {sum(1 for v in ovet.values() if any(o["entrance"] == "main" for o in v))} joilla entrance=main')


if __name__ == '__main__':
    main(*sys.argv[1:3])
