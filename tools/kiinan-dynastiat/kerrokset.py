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


VARIT = {'muuri': '#6b3a2a', 'joki': '#3b6ea8', 'joki-vanha': '#8fb0d6', 'kanava': '#2f8f8a', 'silkkitie': '#b5832f',
         'marco-polo': '#7d4fa0', 'zheng-he': '#b0306a', 'siirto': '#5a5a5a', 'taistelu': '#a01818', 'vaesto': '#4a3a32',
         'pysakki': '#7d4fa0'}
LOPPU = 1912   # linssin viimeinen avainvuosi: loppu null → 1912


def kerrokset():
    """LS:n muoto 17.10.2026 (juureen, vuosista erillään): [{avain, laji viiva|virtaus|piste, alku, loppu, nimi, pisteet
    [[lon,lat],...], leveys | leveydet, vari, arvo}]; lisäkentät (voittaja, havio, seuraus, huom) kulkevat mukana."""
    r = []
    def lisaa(avain, laji, nimi, alku, loppu, pisteet, vari, **lisa):
        r.append({'avain': avain, 'laji': laji, 'alku': alku, 'loppu': LOPPU if loppu is None else loppu, 'nimi': nimi,
                  'pisteet': pisteet, 'vari': vari, **lisa})
    for x in K.MUURIT:
        for o in x['osat']: lisaa('muuri', 'viiva', x['nimi'], x['alku'], x['loppu'], tihenna(o), VARIT['muuri'], leveys=0.6)
    for x in K.JOET:
        for o in x['osat']:
            lisaa('joki', 'viiva', x['nimi'], x['alku'], x['loppu'], tihenna(o),
                  VARIT['joki' if x['avain'] == 'huanghe-nyky' else 'joki-vanha'], leveys=0.8, uoma=x['avain'])
    for x in K.KANAVAT:
        for o in x['osat']: lisaa('kanava', 'viiva', x['nimi'], x['alku'], x['loppu'], tihenna(o), VARIT['kanava'], leveys=0.5)
    for x in K.REITIT:
        for i, o in enumerate(x['osat']):
            laji = 'virtaus' if x['avain'] in ('silkkitie', 'zheng-he') else 'viiva'
            lev = 1.0 if (x['avain'] != 'silkkitie' or i == 0) else 0.6   # Silkkitie: Hexi-käytävä täysi, haarat ohuemmat
            lisaa(x['avain'], laji, x['nimi'], o.get('alku', x['alku']), o.get('loppu', x['loppu']), tihenna(o['p']),
                  VARIT[x['avain']], leveys=lev)
        for q in x.get('pysakit', []):
            lisaa('pysakki-' + x['avain'], 'piste', q['nimi'], q.get('vuosi', x['alku']), x['loppu'], [[q['lon'], q['lat']]],
                  VARIT['pysakki'])
    vuodet = [v[0] for v in K.VAESTO]
    for j, (vuosi, milj, arvio, kausi, huom) in enumerate(K.VAESTO):
        seur = vuodet[j + 1] if j + 1 < len(vuodet) else LOPPU
        for (alue, lon, lat), o in zip(K.ALUEET, K.OSUUDET[kausi]):
            lisaa('vaesto', 'piste', alue, vuosi, seur, [[lon, lat]], VARIT['vaesto'], arvo=round(milj * o, 1), arvio=arvio,
                  **({'huom': huom} if huom else {}), koko_kiina=milj)
    for t in K.TAISTELUT:
        lisaa('taistelu', 'piste', t['nimi'], t['vuosi'], LOPPU, [[t['lon'], t['lat']]], VARIT['taistelu'], arvo=None,
              voittaja=t['voittaja'], havio=t['havio'], seuraus=t['seuraus'])
    for avain, vuosi, a, b in K.SIIRROT:
        lisaa('siirto', 'virtaus', f'{a} → {b}', vuosi, LOPPU, tihenna(kaari(K._P[a], K._P[b])), VARIT['siirto'],
              leveydet=[round(0.25 + 0.75 * i / 23, 2) for i in range(24)], dynastia=avain)
    return r


LAHTEET = {
    'viivat': 'Muurit, Keltaisen joen uomat (602 eaa – 1128 pohjoinen, 1128–1855 Huai-joen kautta, 1855– nykyinen), Suuri kanava, '
        'reitit ja siirtojäljet: omat piirrokset (Matkakirja, CC0) julkisista paikkakoordinaateista, tarkkuus ~20 km.',
    'vaesto': 'Väkiluvut historiallisista väestölaskennoista (Han 140, Sui 609, Yuan 1290, Qing 1762) ja tutkimusarvioista '
        '(arvio = true). Alueosuudet ovat Karttasepän arvio väestön painopisteen siirtymästä etelään.',
    'taistelut': 'Paikat ja vuodet yleisesti tunnetuista lähteistä (faktat).'}


if __name__ == '__main__':
    polku = sys.argv[1]
    d = json.load(open(polku))
    d['kerrokset'] = kerrokset(); d['kerrokset_lahteet'] = LAHTEET
    s = json.dumps(d, ensure_ascii=False, separators=(',', ':'))
    with open(polku + '.tmp', 'w') as f: f.write(s)
    os.replace(polku + '.tmp', polku)
    from collections import Counter
    print(dict(Counter(x['avain'] for x in d['kerrokset'])), os.path.getsize(polku), 'tavua')
