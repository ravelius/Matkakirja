#!/usr/bin/env python3
"""OMAT MALLIT CESIUM-KAUPUNKIIN (Linssiseppä 7.10.2026, Giza-pilotti; omistaja 6.10. 23.35, Päätoimittajan lupa 7.10. 00.3x).

Linnanrakentajan GLB-paketti (sijainnit.json + glb/<kohde>-lod{0,1,2}.glb) → 3D Tiles -kansio, jonka Cesium piirtää itse
(ei glTF-tuojaa Unityyn). Jokaiselle kohteelle tileset.json: LOD2 (juuri) → LOD1 → LOD0 REPLACE-tarkennuksena, juuren
muunnos = ENU → ECEF kohteen pisteessä (lat, lon, ellipsoidikorkeus). glTF:n +Y ylös / −Z pohjoinen kääntyy 3D Tilesin
Z-ylös-kehykseen Cesiumin vakiomuunnoksella, joten erillistä kiertoa ei tarvita (atsimuutti on leivottu verkkoon).

Lisäksi mallit.json (CesiumOmatMallit lukee): tekijärivi, kohteet, leikkauspolygonit ja tilesetin suhteellinen polku.

Käyttö: omat_mallit_tileset.py <giza-v1-kansio> <ulos> [--tekija "Pyramidien 3D-malli: Matkakirja"]
"""
import argparse, json, math, os, shutil, struct, sys

A_WGS84, E2 = 6378137.0, 6.69437999014e-3


def ecef(lat, lon, h):
    f, l = math.radians(lat), math.radians(lon)
    n = A_WGS84 / math.sqrt(1 - E2 * math.sin(f) ** 2)
    return ((n + h) * math.cos(f) * math.cos(l), (n + h) * math.cos(f) * math.sin(l), (n * (1 - E2) + h) * math.sin(f))


def enu_matriisi(lat, lon, h):
    """4×4 sarakejärjestyksessä (3D Tiles transform): sarakkeet itä, pohjoinen, ylös, origo."""
    f, l = math.radians(lat), math.radians(lon)
    e = (-math.sin(l), math.cos(l), 0.0)
    n = (-math.sin(f) * math.cos(l), -math.sin(f) * math.sin(l), math.cos(f))
    u = (math.cos(f) * math.cos(l), math.cos(f) * math.sin(l), math.sin(f))
    p = ecef(lat, lon, h)
    return [*e, 0.0, *n, 0.0, *u, 0.0, *p, 1.0]


def glb_tiedot(polku):
    """POSITION-attribuuttien min/max (glTF-kehys) ja kolmiomäärä GLB:n JSON-lohkosta."""
    with open(polku, 'rb') as f:
        data = f.read()
    magia, versio, _ = struct.unpack_from('<4sII', data, 0)
    if magia != b'glTF' or versio != 2:
        raise SystemExit(f'{polku}: ei glTF 2 -binääri')
    pituus, tyyppi = struct.unpack_from('<I4s', data, 12)
    if tyyppi != b'JSON':
        raise SystemExit(f'{polku}: ensimmäinen lohko ei ole JSON')
    g = json.loads(data[20:20 + pituus])
    for solmu in g.get('nodes', []):
        if any(k in solmu for k in ('matrix', 'translation', 'rotation', 'scale')):
            print(f'VAROITUS {polku}: solmulla {solmu.get("name")} on muunnos; laatikko lasketaan ilman sitä', file=sys.stderr)
    lo, hi, kolmiot = [math.inf] * 3, [-math.inf] * 3, 0
    for m in g.get('meshes', []):
        for p in m.get('primitives', []):
            acc = g['accessors'][p['attributes']['POSITION']]
            for i in range(3):
                lo[i] = min(lo[i], acc['min'][i]); hi[i] = max(hi[i], acc['max'][i])
            if 'indices' in p:
                kolmiot += g['accessors'][p['indices']]['count'] // 3
            else:
                kolmiot += acc['count'] // 3
    return lo, hi, kolmiot


def laatikko(lo, hi):
    """glTF (x itä, y ylös, z etelä) → 3D Tiles -kehys (x itä, y pohjoinen, z ylös): box = keskipiste + puoliakselit."""
    cx, cy, cz = [(a + b) / 2 for a, b in zip(lo, hi)]
    hx, hy, hz = [(b - a) / 2 for a, b in zip(lo, hi)]
    return [cx, -cz, cy, hx, 0, 0, 0, hz, 0, 0, 0, hy]


def virhe(lo, hi, kolmiot):
    """Geometrinen virhe (m) karkeasta arviosta: 0,3 × lävistäjä / √kolmiot (Kheops 0,5k → noin 4 m, 13k → noin 0,9 m)."""
    lavistaja = math.dist(lo, hi)
    return round(0.3 * lavistaja / math.sqrt(max(1, kolmiot)), 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('lahde'); ap.add_argument('ulos')
    ap.add_argument('--tekija', default='Pyramidien 3D-malli: Matkakirja')
    ap.add_argument('--lisaa', help='olemassa oleva mallit.json, jonka kohteet säilyvät (esim. Giza + Concorde samaan vientiin)')
    a = ap.parse_args()
    s = json.load(open(os.path.join(a.lahde, 'glb', 'sijainnit.json'), encoding='utf-8'))
    os.makedirs(a.ulos, exist_ok=True)
    indeksi = {'tekija': a.tekija, 'lahde': 'Linnanrakentaja, ' + os.path.basename(os.path.normpath(a.lahde)), 'kohteet': []}
    if a.lisaa:
        vanha = json.load(open(a.lisaa, encoding='utf-8'))
        for k in vanha.get('kohteet', []):
            if 'tekija' not in k and vanha.get('tekija'): k['tekija'] = vanha['tekija']   # kohdekohtainen krediitti säilyy
            indeksi['kohteet'].append(k)
    for kid, k in s['kohteet'].items():
        glbt = [os.path.join(a.lahde, p) for p in k['glb']]
        puuttuu = [p for p in glbt if not os.path.exists(p)]
        if puuttuu:
            print(f'{kid}: ohitetaan, puuttuu {", ".join(os.path.basename(p) for p in puuttuu)}', file=sys.stderr)
            continue
        h = k.get('korkeus_ellipsoidi') or k['korkeus_ellipsoidi_arvio']
        kansio = os.path.join(a.ulos, kid); os.makedirs(kansio, exist_ok=True)
        tasot = []
        for taso, p in enumerate(glbt):   # glb-lista: lod0 (tarkin), lod1, lod2
            shutil.copyfile(p, os.path.join(kansio, f'lod{taso}.glb'))
            tasot.append(glb_tiedot(p))
        # Juuri = karkein (lod2), lapsi lod1, lapsenlapsi lod0 (virhe 0). Kaikilla sama laatikko (yhteinen ulkoraja).
        lo = [min(t[0][i] for t in tasot) for i in range(3)]; hi = [max(t[1][i] for t in tasot) for i in range(3)]
        bv = {'box': laatikko(lo, hi)}
        lapsi = None
        for taso in range(len(tasot)):
            tile = {'boundingVolume': bv, 'geometricError': 0.0 if taso == 0 else virhe(lo, hi, tasot[taso][2]),
                    'refine': 'REPLACE', 'content': {'uri': f'lod{taso}.glb'}}
            if lapsi: tile['children'] = [lapsi]
            lapsi = tile
        juuri = lapsi
        # MAAPOHJAHELMA (Linnanrakentaja giza-v2, glb/<kohde>-helma.glb): hiekkalevy 1 m Googlen pinnan alla ~70 m leikkauksen yli,
        # ettei leikkausreiän reunassa näy taustaa. Erillinen lapsi ADD-tarkennuksella tyhjän juuren alla: piirretään aina mallin rinnalla.
        helma = os.path.join(a.lahde, 'glb', f'{kid}-helma.glb')
        if os.path.exists(helma):
            shutil.copyfile(helma, os.path.join(kansio, 'helma.glb'))
            hl, hh, hk = glb_tiedot(helma)
            bl = [min(lo[i], hl[i]) for i in range(3)]; bh = [max(hi[i], hh[i]) for i in range(3)]
            # Tyhjä juuri tarkennetaan aina (virhe 10 000): muuten kaukaa (5 km) piirrettäisiin vain sisällötön juuri (simu 7.10. 10.51).
            juuri = {'boundingVolume': {'box': laatikko(bl, bh)}, 'geometricError': 10000.0, 'refine': 'ADD',
                     'children': [juuri, {'boundingVolume': {'box': laatikko(hl, hh)}, 'geometricError': 0.0, 'content': {'uri': 'helma.glb'}}]}
            print(f'{kid}: helma {hk} kolmiota')
        juuri['transform'] = enu_matriisi(k['lat'], k['lon'], h)
        # Tilesetin oma virhe suuri: malli piirretään aina, kun Googlen tiilet alueella näkyvät (leikkausreikä ei saa jäädä tyhjäksi).
        ts = {'asset': {'version': '1.1', 'generator': 'Matkakirja omat_mallit_tileset.py'}, 'geometricError': 10000.0, 'root': juuri}
        json.dump(ts, open(os.path.join(kansio, 'tileset.json'), 'w'), indent=1)
        uusi = {'id': kid, 'lat': k['lat'], 'lon': k['lon'], 'korkeus': h, 'leikkaus': k['leikkaus'], 'tileset': f'{kid}/tileset.json'}
        if k.get('tekija'): uusi['tekija'] = k['tekija']   # kohteen oma krediittirivi (Concorde: IGN + OSM)
        indeksi['kohteet'] = [x for x in indeksi['kohteet'] if x['id'] != kid] + [uusi]
        print(f'{kid}: {len(tasot)} tasoa, kolmiot {[t[2] for t in tasot]}, virheet {[virhe(lo, hi, t[2]) for t in tasot[1:]]} m, h {h} m')
    json.dump(indeksi, open(os.path.join(a.ulos, 'mallit.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'mallit.json: {len(indeksi["kohteet"])} kohdetta → {a.ulos}')


if __name__ == '__main__':
    main()
