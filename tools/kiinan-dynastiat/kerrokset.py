#!/usr/bin/env python3
"""Kiinan dynastiat -linssin lisäkerrokset (Karttaseppä 17.10.2026) kiinan-dynastiat.json-tiedoston avaimeen `kerrokset`.

Muoto: data/linssit/kiinan-dynastiat/MUOTO-KERROKSET.md. Data: kerrokset_data.py (omat piirrokset, CC0). Ajetaan vie.py:n
jälkeen; lukittu muoto (vuodet) pysyy koskemattomana. Käyttö: kerrokset.py <kiinan-dynastiat.json>
"""
import json, math, os, sys
sys.path.insert(0, os.path.dirname(__file__))
import kerrokset_data as K

TIHEYS = 0.25   # astetta, kuten vie.py:n viivat (pitkä jakso ei painu pallon pinnan alle)


def tihenna(p):
    ulos = []
    for i, (x, y) in enumerate(p):
        if i:
            px, py = p[i - 1]; n = int(max(abs(x - px), abs(y - py)) / TIHEYS)
            ulos += [(px + (x - px) * k / (n + 1), py + (y - py) * k / (n + 1)) for k in range(1, n + 1)]
        ulos.append((x, y))
    for x, y in ulos: assert 60 <= x <= 145 and -11 <= y <= 56, (x, y)
    return [[round(x, 3), round(y, 3)] for x, y in ulos]


def kaari(a, b, kaarevuus=0.18):
    """Siirtojälki: loiva kaari a → b (keskikohta sivuun pohjoiseen päin), 24 pistettä."""
    (ax, ay), (bx, by) = a, b
    dx, dy = bx - ax, by - ay; nx, ny = -dy, dx
    if ny < 0: nx, ny = -nx, -ny
    return [(ax + dx * t + nx * kaarevuus * 4 * t * (1 - t), ay + dy * t + ny * kaarevuus * 4 * t * (1 - t)) for t in (i / 23 for i in range(24))]


def viivat(lista):
    ulos = []
    for x in lista:
        y = {k: v for k, v in x.items() if k != 'osat'}
        y['osat'] = [{'p': tihenna(o)} if not isinstance(o, dict) else
                     {**{k: v for k, v in o.items() if k != 'p'}, 'p': tihenna(o['p'])} for o in x['osat']]
        ulos.append(y)
    return ulos


def vaesto():
    ulos = []
    for vuosi, milj, arvio, kausi, huom in K.VAESTO:
        osuudet = K.OSUUDET[kausi]; assert abs(sum(osuudet) - 1) < 1e-6, kausi
        r = {'vuosi': vuosi, 'milj': milj, 'arvio': arvio,
             'pisteet': [[lon, lat, round(milj * o, 1)] for (_, lon, lat), o in zip(K.ALUEET, osuudet)]}
        if huom: r['huom'] = huom
        ulos.append(r)
    return ulos


def siirrot():
    ulos = []
    for avain, vuosi, a, b in K.SIIRROT:
        pa, pb = K._P[a], K._P[b]
        ulos.append({'avain': avain, 'vuosi': vuosi, 'mista': {'nimi': a, 'lon': pa[0], 'lat': pa[1]},
                     'mihin': {'nimi': b, 'lon': pb[0], 'lat': pb[1]}, 'p': tihenna(kaari(pa, pb))})
    return ulos


def kerrokset():
    return {
        'muuri': viivat(K.MUURIT), 'joet': viivat(K.JOET), 'kanavat': viivat(K.KANAVAT), 'reitit': viivat(K.REITIT),
        'vaesto': vaesto(), 'alueet': [n for n, _, _ in K.ALUEET], 'taistelut': K.TAISTELUT, 'siirrot': siirrot(),
        'lahteet': {
            'muuri, joet, kanavat, reitit, siirrot': 'Omat piirrokset (Matkakirja, CC0) julkisista paikkakoordinaateista; '
                'Keltaisen joen uomat (602 eaa – 1128 pohjoinen, 1128–1855 Huai-joen kautta, 1855– nykyinen) yleisen historiallisen '
                'hydrografian mukaan, tarkkuus ~20 km.',
            'vaesto': 'Väkiluvut historiallisista väestölaskennoista (Han 140, Sui 609, Yuan 1290, Qing 1762) ja tutkimusarvioista '
                '(arvio = true). Alueosuudet ovat Karttasepän arvio väestön painopisteen siirtymästä etelään (Han → Tang → Song → Qing).',
            'taistelut': 'Paikat ja vuodet yleisesti tunnetuista lähteistä (faktat).'},
    }


if __name__ == '__main__':
    polku = sys.argv[1]
    d = json.load(open(polku))
    d['kerrokset'] = kerrokset()
    s = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
    with open(polku + '.tmp', 'w') as f: f.write(s)
    os.replace(polku + '.tmp', polku)
    k = d['kerrokset']
    print({x: len(k[x]) for x in ('muuri', 'joet', 'kanavat', 'reitit', 'vaesto', 'taistelut', 'siirrot')}, os.path.getsize(polku), 'tavua')
