#!/usr/bin/env python3
"""Kiinan dynastiat -linssin pallodata (CC0): kaikki avainvuodet yhteen JSONiin Isoisän linssin 1873 muodossa.

Isoisä 1873 (Linssit/Ydin/Isoisa/Isoisa1873.cs) lukee { viivat [{ l, p [[lon, lat]] }], valtiot [{ teksti, lat, lon,
luokka, koko }] }: WGS84, kolme desimaalia, maarajat viivoina (rannikko tulee pohjasta), luokka 1 valtionraja ja 2 vasalli.
Sama muoto per vuosi, ja lisäksi täytöt (alueet) ja kotiseudut monikulmioina, koska aluemoottori värittää alueet.
Antimeridiaania ei ylitetä (alue 60–145° I). Käyttö: vie.py <ulos.json>
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from shapely.geometry import Polygon, box, mapping
from shapely.ops import unary_union, linemerge
import rajat, piirra

SIEVENNYS = 0.03     # astetta (~3 km); Isoisän viivoissa pisteväli mediaani ~9 km
RANTAVARA = 0.04
TIHEYS_VIIVA = 0.25  # astetta: pitkä suora jakso painuisi pallolla pinnan alle
TIHEYS_ALUE = 0.5     # rannikkoa lähempänä oleva rajan osa on rantaa, ei maarajaa
KOKO = {'kiina': 'suuri', 'ulkoinen': 'keski', 'protektoraatti': 'pieni'}


def pyorista(koord, tiheys=None):
    koord = list(koord); ulos = []
    for i, (x, y) in enumerate(koord):
        if tiheys and i:
            px, py = koord[i - 1]; n = int(max(abs(x - px), abs(y - py)) / tiheys)
            ulos += [(px + (x - px) * k / (n + 1), py + (y - py) * k / (n + 1)) for k in range(1, n + 1)]
        ulos.append((x, y))
    return [[round(x, 3), round(y, 3)] for x, y in ulos]


def monikulmiot(g):
    """Polygon/MultiPolygon → [[ulkokehä, reiät...], ...] (GeoJSON MultiPolygonin coordinates)."""
    ulos = []
    for p in getattr(g, 'geoms', [g]):
        if p.is_empty or p.geom_type != 'Polygon' or p.area < 0.05: continue
        ulos.append([pyorista(p.exterior.coords, TIHEYS_ALUE)] + [pyorista(r.coords, TIHEYS_ALUE) for r in p.interiors if Polygon(r).area >= 0.05])
    return ulos


def viivat(g):
    for l in getattr(g, 'geoms', [g]):
        if l.is_empty or l.geom_type != 'LineString' or l.length < 0.2: continue
        yield pyorista(l.coords, TIHEYS_VIIVA)


# Käsin siirretyt nimiöt (vuosi, alue) → (lat, lon[, teksti]): selkeän historiakartan 2× nimet törmäsivät (simut 17.–18.10.2026):
# Itäturkit 589 Mongolian rajan yli, Eteläinen Tang 950 naapureihin (kahdelle riville), Nurgan 1421 ruudun reunaan, Wu 250 Punaisen
# kallion taistelunimen alle (proto kiina-paketti-200 f173a6f37, PT hyväksyi 18.10. 08.4x).
NIMET_KASIN = {
    (250, 'Wu'): (26.2, 115.2),
    (589, 'Itäturkit'): (44.3, 112.48),
    (950, 'Eteläinen Tang'): (25.9, 116.0, 'ETELÄINEN\nTANG'),
    (1421, 'Nurgan'): (45.5, 129.5),
}


def nimio(vu, n, t, g, v):
    k = NIMET_KASIN.get((vu, n))
    lat, lon = (k[0], k[1]) if k else nimen_paikka(g, v)
    return {'teksti': k[2] if k and len(k) > 2 else n.upper(), 'lat': lat, 'lon': lon,
            'luokka': 2 if t == 'protektoraatti' else 1, 'koko': KOKO[t]}


def nimen_paikka(g, v):
    """Sama paikka kuin piirra.py:n kuvassa (lat, lon)."""
    lon, lat = piirra.nimen_paikka(g, v)
    return lat, lon


def vuosi(vu):
    v, al = piirra.alueet(vu)
    ranta = piirra.maa.boundary.buffer(RANTAVARA)
    alueet = [(n, a, t, g.simplify(SIEVENNYS).buffer(0)) for n, a, t, g in al if not g.is_empty]
    taydet = unary_union([g.boundary for _, _, t, g in alueet if t != 'protektoraatti']).difference(ranta)
    # Protektoraatin ja sen oman emovaltion yhteinen raja on katkoviiva (luokka 2), ei valtionraja.
    for _, a, t, g in alueet:
        if t != 'protektoraatti': continue
        for _, a2, t2, g2 in alueet:
            if t2 != 'protektoraatti' and a2 == a:
                taydet = taydet.difference(g.boundary.intersection(g2.buffer(0.02)).buffer(0.02))
    taydet = linemerge(taydet) if not taydet.is_empty else taydet
    prot = unary_union([g.boundary for _, _, t, g in alueet if t == 'protektoraatti'])
    prot = prot.difference(ranta).difference(taydet.buffer(0.01)) if not prot.is_empty else prot
    prot = linemerge(prot) if not prot.is_empty and prot.geom_type != 'LineString' else prot
    kotiseudut = []
    for n, a, t, g in alueet:
        k = piirra.kotiseutu(a, al)  # vain pääosin omalla alueella, leikattuna siihen
        if k is not None and not any(x['avain'] == a for x in kotiseudut):
            k = k.simplify(SIEVENNYS)
            kotiseudut.append({'avain': a, 'vari': rajat.VARIT[a], 'monikulmiot': monikulmiot(k)})
    return {
        'vuosi': vu, 'otsikko': v['otsikko'],
        'alueet': [{'nimi': n, 'avain': a, 'tyyppi': t, 'vari': rajat.VARIT[a], 'monikulmiot': monikulmiot(g)} for n, a, t, g in alueet],
        'kotiseudut': kotiseudut,
        'viivat': [{'l': 1, 'p': p} for p in viivat(taydet)] + ([{'l': 2, 'p': p} for p in viivat(prot)] if not prot.is_empty else []),
        'nimet': [nimio(vu, n, t, g, v) for n, a, t, g in alueet],
        'paakaupungit': [{'nimi': kn.split('|')[0], 'lat': rajat.KAUPUNGIT[kn][1], 'lon': rajat.KAUPUNGIT[kn][0]} for kn in v['paakaupungit']],
    }


if __name__ == '__main__':
    vuodet = sorted(rajat.VUODET)
    d = {
        '$skeema': 'matkakirja-linssi/kiinan-dynastiat/1',
        'lisenssi': 'CC0-1.0',
        'attribuutio': 'Omat rajat (Matkakirja, CC0). Dynastiakarttojen laadinnassa on käytetty apuna Cliopatria-aineistoa '
                       '(Seshat Global History Databank), CC BY 4.0, doi:10.5281/zenodo.13363120; kartat on yksinkertaistettu '
                       'ja piirretty uudelleen. Rannikko Natural Earth 50 m (public domain).',
        'lahdekoodi': 'tools/kiinan-dynastiat/ (rajat.py, vuodet_*.py, vie.py)',
        'luokat': {'1': 'valtionraja', '2': 'protektoraatin tai vasallin raja'},
        'tyypit': {'kiina': 'kiinalainen dynastia', 'ulkoinen': 'ulkoinen hallitsija', 'protektoraatti': 'löyhemmin hallittu alue: protektoraatti, vasalli tai yliherruus (vaaleampi)'},
        'vuodet': [vuosi(vu) for vu in vuodet],
    }
    json.dump(d, open(sys.argv[1], 'w'), ensure_ascii=False, separators=(',', ':'))
    for y in d['vuodet']:
        print(y['vuosi'], len(y['alueet']), 'aluetta', len(y['viivat']), 'viivaa', sum(len(v['p']) for v in y['viivat']), 'viivapistettä')
    print(os.path.getsize(sys.argv[1]) // 1024, 'kt')
