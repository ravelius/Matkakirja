#!/usr/bin/env python3
"""Kiinan dynastiat: väestöpinta (Karttaseppä 17.10.2026, omistajan pyyntö 07.36 ja päätös 07.37 PT:n kautta).

"Voisiko ihmisten ja sotajoukkojen määrää kuvata värillisellä korkeuskartalla?" Pinnan korkeus = väestöntiheys, väri = omistava
dynastia. Ensimmäinen hetki: Punaiset kalliot 208. Muoto: data/linssit/kiinan-dynastiat/MUOTO-VAESTOPINTA.md.

Tiheys on ARVIO, kunnes HYDE (3.2.1 CC0 / 3.3 CC BY) saadaan käsin ladattuna: koko Kiinan väkiluku (kerrokset_data.VAESTO,
välivuosi lineaarisesti) jaetaan kymmenelle alueelle (OSUUDET), ja alueen sisällä väki painottuu matalikoille (ETOPO1, PD) ja
jokien varsille (Natural Earth 50 m, PD). Omistus avainvuoden rajoista (rajat-<vuosi>.geojson, omat piirrokset CC0).

Käyttö: vaestopinta.py <vuosi> <rajat-vuosi> <korkeus-maailma-4096.bytes> <ne-kansio> <ulos-kansio>
"""
import json, math, os, sys
import numpy as np
from shapely.geometry import shape
from shapely import contains_xy
sys.path.insert(0, os.path.dirname(__file__))
import kerrokset_data as K

LON0, LON1, LAT0, LAT1, ASKEL = 100.0, 124.0, 20.0, 42.0, 0.1   # Kolmen kuningaskunnan ydin; solu ~11 km
LEV, KOR = round((LON1 - LON0) / ASKEL), round((LAT1 - LAT0) / ASKEL)
SKAALA = 10   # uint16 = hlö/km² × 10


def hila():
    """Solukeskipisteet: sarake 0 = länsi, rivi 0 = POHJOINEN (kuten korkeus-maailma-4096)."""
    lon = LON0 + (np.arange(LEV) + 0.5) * ASKEL
    lat = LAT1 - (np.arange(KOR) + 0.5) * ASKEL
    return np.meshgrid(lon, lat)


def korkeus(polku, X, Y):
    k = np.fromfile(polku, dtype='<i2').reshape(2048, 4096)
    c = np.clip(((X + 180) / 360 * 4096).astype(int), 0, 4095)
    r = np.clip(((90 - Y) / 180 * 2048).astype(int), 0, 2047)
    return k[r, c].astype(float)


def sumenna(a, sigma_solut):
    """Gaussin sumennus erikseen riveittäin ja sarakkeittain (numpy, ei scipyä)."""
    n = int(3 * sigma_solut) + 1
    x = np.arange(-n, n + 1); g = np.exp(-x * x / (2 * sigma_solut ** 2)); g /= g.sum()
    a = np.apply_along_axis(lambda v: np.convolve(np.pad(v, n, mode='edge'), g, 'valid'), 1, a)
    return np.apply_along_axis(lambda v: np.convolve(np.pad(v, n, mode='edge'), g, 'valid'), 0, a)


def joet(ne, X, Y):
    """Jokien läheisyys 0–1: NE 50 m -joet pisteinä hilaan, sumennus ~25 km."""
    d = json.load(open(os.path.join(ne, 'ne_50m_rivers_lake_centerlines.geojson')))
    m = np.zeros(X.shape)
    for f in d['features']:
        g = f['geometry']; osat = g['coordinates'] if g['type'] == 'MultiLineString' else [g['coordinates']]
        for o in osat:
            for (x0, y0), (x1, y1) in zip(o, o[1:]):
                n = max(2, int(max(abs(x1 - x0), abs(y1 - y0)) / (ASKEL / 2)))
                for t in np.linspace(0, 1, n):
                    x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
                    c, r = int((x - LON0) / ASKEL), int((LAT1 - y) / ASKEL)
                    if 0 <= c < LEV and 0 <= r < KOR: m[r, c] = 1
    m = sumenna(m, 2.2)
    return m / max(m.max(), 1e-9)


def maa(ne, X, Y):
    d = json.load(open(os.path.join(ne, 'ne_50m_land.geojson')))
    m = np.zeros(X.shape, bool)
    for f in d['features']:
        g = shape(f['geometry'])
        if g.bounds[2] < LON0 or g.bounds[0] > LON1 or g.bounds[3] < LAT0 or g.bounds[1] > LAT1: continue
        m |= contains_xy(g, X, Y)
    return m


def vakiluku(vuosi):
    """Koko Kiinan väki (milj.) avainvuosien välistä lineaarisesti; kausi lähemmästä jälkimmäisestä avainvuodesta."""
    v = K.VAESTO
    for (a, ma, _, ka, _), (b, mb, _, kb, _) in zip(v, v[1:]):
        if a <= vuosi <= b:
            t = (vuosi - a) / (b - a)
            return ma + (mb - ma) * t, (kb if t > 0.3 else ka)
    raise ValueError(vuosi)


def tiheys(vuosi, X, Y, kork, joki, maski):
    """Henkeä / km² per solu. Alueen i väki = osuus_i × kokonaisväki, jaettuna alueen ytimeen (Gauss σ 2,2°) painolla
    matalikko × jokilaakso; vuoristo > 3 500 m ja meri tyhjiä."""
    milj, kausi = vakiluku(vuosi)
    paino = np.exp(-np.clip(kork, 0, None) / 450.0) * (0.35 + 1.65 * joki)
    paino[(kork > 3500) | ~maski] = 0
    ala = (ASKEL * 111.32 * np.cos(np.radians(Y))) * (ASKEL * 110.57)   # km²
    vaki = np.zeros(X.shape)
    for (nimi, lon, lat), osuus in zip(K.ALUEET, K.OSUUDET[kausi]):
        dx = (X - lon) * np.cos(np.radians(lat)); dy = Y - lat
        w = np.exp(-(dx * dx + dy * dy) / (2 * 2.2 ** 2)) * paino
        vaki += osuus * milj * 1e6 * w / w.sum()
    return vaki / ala, milj, kausi


def omistus(polku, X, Y):
    """Solun omistaja rajat-<vuosi>.geojsonista: indeksi listaan (0 = ei kenenkään); kotiseutu-featuret ohitetaan."""
    d = json.load(open(polku))
    lista, m = [None], np.zeros(X.shape, np.uint8)
    for f in d['features']:
        p = f['properties']
        if p.get('tyyppi') == 'kotiseutu': continue
        if p['avain'] not in [x and x['avain'] for x in lista]:
            lista.append({'avain': p['avain'], 'nimi': p['nimi'], 'vari': p['vari'], 'tyyppi': p['tyyppi']})
        i = [x and x['avain'] for x in lista].index(p['avain'])
        m[(m == 0) & contains_xy(shape(f['geometry']), X, Y)] = i
    return m, lista[1:]


def kirjoita(ulos, vuosi, tih, om, dyn, milj, kausi, X, Y):
    import vaestopinta_data as H
    os.makedirs(ulos, exist_ok=True)
    nimi = f'vaestopinta-{vuosi}'
    raaka = np.clip(np.round(tih * SKAALA), 0, 65535).astype('<u2')
    raaka.tofile(os.path.join(ulos, nimi + '.bytes'))
    om.astype(np.uint8).tofile(os.path.join(ulos, f'omistus-{vuosi}.bytes'))
    ala = (ASKEL * 111.32 * np.cos(np.radians(Y))) * (ASKEL * 110.57)
    meta = {
        '$skeema': 'matkakirja-linssi/kiinan-dynastiat/vaestopinta/1', 'lisenssi': 'CC0-1.0', 'vuosi': vuosi,
        'hila': {'lon0': LON0, 'lon1': LON1, 'lat0': LAT0, 'lat1': LAT1, 'askel': ASKEL, 'leveys': LEV, 'korkeus': KOR,
                 'rivi0': 'pohjoinen', 'solu': 'keskipiste lon0 + (c + 0,5)·askel, lat1 − (r + 0,5)·askel'},
        'tiheys': {'tiedosto': nimi + '.bytes', 'tyyppi': 'uint16 LE', 'yksikko': 'henkeä/km² × 10',
                   'max': round(float(tih.max()), 1), 'p99': round(float(np.percentile(tih[tih > 0], 99)), 1),
                   'summa_milj': round(float((tih * ala).sum() / 1e6), 2), 'arvio': True},
        'omistus': {'tiedosto': f'omistus-{vuosi}.bytes', 'tyyppi': 'uint8', 'arvot': '0 = ei kenenkään, i = dynastiat[i − 1]',
                    'rajat_vuosi': H.HETKET[vuosi]['rajat_vuosi']},
        'dynastiat': dyn, 'vakiluku_milj': round(milj, 1), 'aluejako': kausi,
        'hetki': H.HETKET[vuosi],
        'lahteet': {'tiheys': 'ARVIO: kokonaisväki kerrokset_data.VAESTO (laskenta 140 ja arvio 250 lineaarisesti), alueosuudet '
                              'OSUUDET, painotus matalikoille ETOPO1 (NOAA, PD) ja jokilaaksoihin Natural Earth 50 m (PD). '
                              'Korvataan HYDE 3.2.1 (CC0) / 3.3 (CC BY 4.0) -ruudukolla, kun aineisto on ladattu.',
                    'omistus': f'rajat-{H.HETKET[vuosi]["rajat_vuosi"]}.geojson (Matkakirja, CC0)', 'armeijat': H.LAHTEET},
    }
    with open(os.path.join(ulos, nimi + '.json.tmp'), 'w') as f: json.dump(meta, f, ensure_ascii=False, indent=1)
    os.replace(os.path.join(ulos, nimi + '.json.tmp'), os.path.join(ulos, nimi + '.json'))
    return meta


if __name__ == '__main__':
    import vaestopinta_data as H
    vuosi = int(sys.argv[1]); rajat, korkeus_polku, ne, ulos = sys.argv[2:6]
    X, Y = hila()
    kork = korkeus(korkeus_polku, X, Y); maski = maa(ne, X, Y); joki = joet(ne, X, Y)
    tih, milj, kausi = tiheys(vuosi, X, Y, kork, joki, maski)
    tih = sumenna(tih, 1.5) * maski
    om, dyn = omistus(rajat, X, Y)
    m = kirjoita(ulos, vuosi, tih, om, dyn, milj, kausi, X, Y)
    print(LEV, '×', KOR, 'väki', m['tiheys']['summa_milj'], 'milj. (tavoite', m['vakiluku_milj'], ') max', m['tiheys']['max'],
          'p99', m['tiheys']['p99'], 'hlö/km²; omistajat', [d['avain'] for d in dyn])
