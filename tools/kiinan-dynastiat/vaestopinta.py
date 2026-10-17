#!/usr/bin/env python3
"""Kiinan dynastiat: väestöpinta KAIKILLE 19 PYSÄKILLE (Karttaseppä 17.10.2026; omistajan pyyntö 07.36, päätös 07.37 ja 11.32 PT:n
kautta: "Käydäänkö siinä kaikki dynastia läpi? Pitää käydä"). Pinnan korkeus = väestöntiheys, väri = omistava dynastia, ja viidellä
taistelupysäkillä armeijat ja lyönnit (vaestopinta_data.HETKET). Muoto: data/linssit/kiinan-dynastiat/MUOTO-VAESTOPINTA.md.

Tiedostot nimetään PYSÄKIN vuodella (rajat-<vuosi>.geojson): vaestopinta-250 sisältää Punaisten kallioiden 208 hetken.
Hila per pysäkki: omistettujen alueiden rajaus ∪ ydin (lon 100–124, lat 20–42), leikattuna lon 73–135 / lat 18–54; askel 0,1°,
isoilla alueilla karkeampi (≤ 90 000 solua, iPadin normaalilaskenta joka ruudussa ajon aikana).

Tiheys on ARVIO, kunnes HYDE (3.2.1 CC0 / 3.3 CC BY) saadaan käsin ladattuna: ytimen väki (kerrokset_data.VAESTO, välivuosi
lineaarisesti) jaetaan kymmenelle alueelle (OSUUDET) ja reuna-alueiden väki (vaestopinta_data.REUNAT) omille keskuksilleen; alueen
sisällä väki painottuu matalikoille (Copernicus GLO-90, © DLR/ESA, vapaa käyttö) ja jokien varsille (Natural Earth 50 m, PD).
Omistus pysäkin rajoista (rajat-<vuosi>.geojson, omat piirrokset CC0).

Käyttö: vaestopinta.py <pysäkkivuosi|kaikki> <rajat-kansio> <korkeus-kiina-005.npy> <ne-kansio> <ulos-kansio>
"""
import json, math, os, sys
import numpy as np
from shapely.geometry import shape
from shapely import contains_xy
sys.path.insert(0, os.path.dirname(__file__))
import kerrokset_data as K
import vaestopinta_data as H

PYSAKIT = [-221, -200, -100, 140, 250, 440, 500, 589, 669, 790, 950, 1100, 1142, 1280, 1421, 1644, 1760, 1873, 1912]
YDIN = (100.0, 124.0, 20.0, 42.0)        # lon0, lon1, lat0, lat1: Kolmen kuningaskunnan ydin (208:n kokeilun hila)
RAJA = (73.0, 135.0, 18.0, 54.0)         # suurin hila (Qing 1760)
MOS = dict(lon0=70.0, lat1=55.0, n=20)   # korkeus_mosaiikki.py: 0,05° ruudukko, rivi 0 = 55° N
MAX_SOLUJA = 90_000
SKAALA = 10   # uint16 = hlö/km² × 10
KOROTUS_P99 = 74.0   # 208:n kokeilun p99 (hlö/km²), jolla omistaja hyväksyi korotuksen 4000 m (V0d, 11.08)


class Hila:
    def __init__(self, lon0, lon1, lat0, lat1, askel):
        self.lon0, self.lon1, self.lat0, self.lat1, self.askel = lon0, lon1, lat0, lat1, askel
        self.lev, self.kor = round((lon1 - lon0) / askel), round((lat1 - lat0) / askel)
        lon = lon0 + (np.arange(self.lev) + 0.5) * askel
        lat = lat1 - (np.arange(self.kor) + 0.5) * askel
        self.X, self.Y = np.meshgrid(lon, lat)


def rajaus(rajat):
    """Omistettujen alueiden (ei kotiseutuja) rajaus ∪ ydin, puolen asteen marginaali, leikattu RAJAan; askel solukaton mukaan."""
    a = list(YDIN)
    for f in rajat['features']:
        if f['properties'].get('tyyppi') == 'kotiseutu': continue
        b = shape(f['geometry']).bounds
        a = [min(a[0], b[0] - .5), max(a[1], b[2] + .5), min(a[2], b[1] - .5), max(a[3], b[3] + .5)]
    a = [max(a[0], RAJA[0]), min(a[1], RAJA[1]), max(a[2], RAJA[2]), min(a[3], RAJA[3])]
    a = [math.floor(a[0]), math.ceil(a[1]), math.floor(a[2]), math.ceil(a[3])]
    askel = 0.1
    while (a[1] - a[0]) / askel * (a[3] - a[2]) / askel > MAX_SOLUJA: askel += 0.05
    return Hila(a[0], a[1], a[2], a[3], round(askel, 2))


def korkeus(mos, h):
    c = np.clip(((h.X - MOS['lon0']) * MOS['n']).astype(int), 0, mos.shape[1] - 1)
    r = np.clip(((MOS['lat1'] - h.Y) * MOS['n']).astype(int), 0, mos.shape[0] - 1)
    return mos[r, c].astype(float)


def sumenna(a, sigma_solut):
    """Gaussin sumennus erikseen riveittäin ja sarakkeittain (numpy, ei scipyä)."""
    n = int(3 * sigma_solut) + 1
    x = np.arange(-n, n + 1); g = np.exp(-x * x / (2 * sigma_solut ** 2)); g /= g.sum()
    a = np.apply_along_axis(lambda v: np.convolve(np.pad(v, n, mode='edge'), g, 'valid'), 1, a)
    return np.apply_along_axis(lambda v: np.convolve(np.pad(v, n, mode='edge'), g, 'valid'), 0, a)


def joet(ne, h):
    """Jokien läheisyys 0–1: NE 50 m -joet pisteinä hilaan, sumennus ~25 km."""
    d = json.load(open(os.path.join(ne, 'ne_50m_rivers_lake_centerlines.geojson')))
    m = np.zeros(h.X.shape)
    for f in d['features']:
        g = f['geometry']; osat = g['coordinates'] if g['type'] == 'MultiLineString' else [g['coordinates']]
        for o in osat:
            for (x0, y0), (x1, y1) in zip(o, o[1:]):
                n = max(2, int(max(abs(x1 - x0), abs(y1 - y0)) / (h.askel / 2)))
                for t in np.linspace(0, 1, n):
                    x, y = x0 + (x1 - x0) * t, y0 + (y1 - y0) * t
                    c, r = int((x - h.lon0) / h.askel), int((h.lat1 - y) / h.askel)
                    if 0 <= c < h.lev and 0 <= r < h.kor: m[r, c] = 1
    m = sumenna(m, 2.2 * 0.1 / h.askel)
    return m / max(m.max(), 1e-9)


def maa(ne, h):
    d = json.load(open(os.path.join(ne, 'ne_50m_land.geojson')))
    m = np.zeros(h.X.shape, bool)
    for f in d['features']:
        g = shape(f['geometry'])
        if g.bounds[2] < h.lon0 or g.bounds[0] > h.lon1 or g.bounds[3] < h.lat0 or g.bounds[1] > h.lat1: continue
        m |= contains_xy(g, h.X, h.Y)
    return m


def vakiluku(vuosi):
    """Ytimen väki (milj.) avainvuosien välistä lineaarisesti; aluejako lähemmästä jälkimmäisestä avainvuodesta."""
    v = getattr(H, 'VAESTO', K.VAESTO)
    for (a, ma, _, ka, _), (b, mb, _, kb, _) in zip(v, v[1:]):
        if a <= vuosi <= b:
            t = (vuosi - a) / (b - a)
            return ma + (mb - ma) * t, (kb if t > 0.3 else ka)
    raise ValueError(vuosi)


def reuna(milj, vuosi):
    """Reuna-alueen väki (milj.) vuodelle: avainvuosien välistä lineaarisesti, reunoilla vakio."""
    v = sorted(milj.items())
    if vuosi <= v[0][0]: return v[0][1]
    for (a, ma), (b, mb) in zip(v, v[1:]):
        if a <= vuosi <= b: return ma + (mb - ma) * (vuosi - a) / (b - a)
    return v[-1][1]


def tiheys(vuosi, h, kork, joki, maski):
    """Henkeä / km² per solu. Ydinalueen i väki = osuus_i × ytimen väki ja reuna-alueen väki REUNAT-taulukosta, kumpikin jaettuna
    keskuksensa ympärille (Gauss) painolla matalikko × jokilaakso; vuoristo > 4 500 m ja meri tyhjiä."""
    milj, kausi = vakiluku(vuosi)
    paino = np.exp(-np.clip(kork, 0, None) / 450.0) * (0.35 + 1.65 * joki)
    paino = np.maximum(paino, 0.02 * np.exp(-np.clip(kork, 0, None) / 1500.0))   # ylängöt (Tiibet, Yunnan) eivät nollaannu
    paino[(kork > 4500) | ~maski] = 0
    ala = (h.askel * 111.32 * np.cos(np.radians(h.Y))) * (h.askel * 110.57)   # km²
    vaki = np.zeros(h.X.shape)
    osuudet = getattr(H, 'OSUUDET', None) or K.OSUUDET
    reunat = getattr(H, 'REUNAT', [])
    sis = getattr(H, 'REUNA_SISALTYY_VUODESTA', {})
    ydin = milj - sum(reuna(m, vuosi) for (n, _, _, _, m) in reunat if vuosi >= sis.get(n, 9999))   # VAESTO sisältää nämä reunat
    keskukset = [(lon, lat, 2.2, osuus * ydin) for (_, lon, lat), osuus in zip(K.ALUEET, osuudet[kausi])]
    keskukset += [(lon, lat, s, reuna(m, vuosi)) for (_, lon, lat, s, m) in reunat]
    for lon, lat, s, m in keskukset:
        dx = (h.X - lon) * np.cos(np.radians(lat)); dy = h.Y - lat
        w = np.exp(-(dx * dx + dy * dy) / (2 * s ** 2)) * paino
        if w.sum() <= 0: continue
        vaki += m * 1e6 * w / w.sum()
    return vaki / ala, milj, kausi


def varitaulu(rajat_kansio):
    """Kaikkien vuosien dynastiavärit (armeijan dynastia voi puuttua pysäkin rajoista, esim. Zhao 260 eaa)."""
    v = {}
    for n in sorted(os.listdir(rajat_kansio)):
        if not (n.startswith('rajat-') and n.endswith('.geojson')): continue
        for f in json.load(open(os.path.join(rajat_kansio, n)))['features']:
            p = f['properties']; v.setdefault(p['avain'], {'avain': p['avain'], 'nimi': p['nimi'], 'vari': p['vari'], 'tyyppi': p['tyyppi']})
    return v


def omistus(rajat, h, hetki, varit):
    """Solun omistaja: indeksi listaan (0 = ei kenenkään); kotiseudut ohitetaan. Hetken armeijoiden dynastiat lisätään listan perään
    (väri huipulle), vaikka niillä ei ole aluetta pysäkin rajoissa."""
    lista, m = [None], np.zeros(h.X.shape, np.uint8)
    for f in rajat['features']:
        p = f['properties']
        if p.get('tyyppi') == 'kotiseutu': continue
        if p['avain'] not in [x and x['avain'] for x in lista]:
            lista.append({'avain': p['avain'], 'nimi': p['nimi'], 'vari': p['vari'], 'tyyppi': p['tyyppi']})
        i = [x and x['avain'] for x in lista].index(p['avain'])
        m[(m == 0) & contains_xy(shape(f['geometry']), h.X, h.Y)] = i
    for a in (hetki or {}).get('armeijat', []):
        d = a['dynastia']
        if d not in [x and x['avain'] for x in lista]:
            lista.append(dict(varit.get(d) or {'avain': d, 'nimi': d, 'vari': '#7a6a5e', 'tyyppi': 'kiina'}, alueeton=True))
    return m, lista[1:]


def kirjoita(ulos, vuosi, h, tih, om, dyn, milj, kausi, hetki):
    os.makedirs(ulos, exist_ok=True)
    nimi = f'vaestopinta-{vuosi}'
    np.clip(np.round(tih * SKAALA), 0, 65535).astype('<u2').tofile(os.path.join(ulos, nimi + '.bytes'))
    om.astype(np.uint8).tofile(os.path.join(ulos, f'omistus-{vuosi}.bytes'))
    ala = (h.askel * 111.32 * np.cos(np.radians(h.Y))) * (h.askel * 110.57)
    meta = {
        '$skeema': 'matkakirja-linssi/kiinan-dynastiat/vaestopinta/1', 'lisenssi': 'CC0-1.0', 'vuosi': vuosi,
        'hila': {'lon0': h.lon0, 'lon1': h.lon1, 'lat0': h.lat0, 'lat1': h.lat1, 'askel': h.askel, 'leveys': h.lev, 'korkeus': h.kor,
                 'rivi0': 'pohjoinen', 'solu': 'keskipiste lon0 + (c + 0,5)·askel, lat1 − (r + 0,5)·askel'},
        'tiheys': {'tiedosto': nimi + '.bytes', 'tyyppi': 'uint16 LE', 'yksikko': 'henkeä/km² × 10',
                   'max': round(float(tih.max()), 1), 'p99': round(float(np.percentile(tih[tih > 0], 99)), 1),
                   'summa_milj': round(float((tih * ala).sum() / 1e6), 2), 'arvio': True,
                   # korotus: pysäkin korkeuskerroin suhteessa 208:n kokeiluun (omistaja 11.08: 4000 m/(hlö/km²) kun p99 = 74), jotta
                   # 25 milj. (250) ja 420 milj. (1912) ovat molemmat luettavia: p99:n korkeus kasvaa väen potenssin 0,2 mukaan
                   # (250: ~250 km, 1912: ~420 km; lineaarisesti 1912 olisi 1 600 km ja huippu 4 000 km).
                   'korotus': round((KOROTUS_P99 / max(float(np.percentile(tih[tih > 0], 99)), 1.0)) ** 0.8, 3)},
        'omistus': {'tiedosto': f'omistus-{vuosi}.bytes', 'tyyppi': 'uint8', 'arvot': '0 = ei kenenkään, i = dynastiat[i − 1]',
                    'rajat_vuosi': vuosi},
        'dynastiat': dyn, 'vakiluku_milj': round(milj, 1), 'aluejako': kausi,
        'lahteet': {'tiheys': 'ARVIO: ytimen väki kerrokset_data.VAESTO (väestölaskennat ja arviot, välivuodet lineaarisesti), alueosuudet '
                              'OSUUDET, reuna-alueet vaestopinta_data.REUNAT (' + getattr(H, 'REUNAT_LAHDE', 'arvio') + '); painotus matalikoille '
                              'Copernicus GLO-90 (© DLR e.V. 2010–2014 ja © Airbus Defence and Space GmbH 2014–2018, ESA, vapaa käyttö) ja '
                              'jokilaaksoihin Natural Earth 50 m (PD). Korvataan HYDE 3.2.1 (CC0) / 3.3 (CC BY 4.0) -ruudukolla, kun aineisto on ladattu.',
                    'omistus': f'rajat-{vuosi}.geojson (Matkakirja, CC0)'},
    }
    if hetki:
        meta['hetki'] = hetki
        meta['lahteet']['armeijat'] = hetki.get('lahteet', H.LAHTEET)
    with open(os.path.join(ulos, nimi + '.json.tmp'), 'w') as f: json.dump(meta, f, ensure_ascii=False, indent=1)
    os.replace(os.path.join(ulos, nimi + '.json.tmp'), os.path.join(ulos, nimi + '.json'))
    return meta


def tee(vuosi, rajat_kansio, mos, ne, ulos, varit):
    rajat = json.load(open(os.path.join(rajat_kansio, f'rajat-{vuosi}.geojson')))
    hetki = next((x for x in H.HETKET.values() if x['rajat_vuosi'] == vuosi), None)
    h = rajaus(rajat)
    kork = korkeus(mos, h); maski = maa(ne, h); joki = joet(ne, h)
    tih, milj, kausi = tiheys(vuosi, h, kork, joki, maski)
    tih = sumenna(tih, 1.5 * 0.1 / h.askel) * maski
    om, dyn = omistus(rajat, h, hetki, varit)
    m = kirjoita(ulos, vuosi, h, tih, om, dyn, milj, kausi, hetki)
    print(vuosi, f'{h.lev}×{h.kor} askel {h.askel}', 'väki', m['tiheys']['summa_milj'], 'milj. (ydin', m['vakiluku_milj'], ') max',
          m['tiheys']['max'], 'p99', m['tiheys']['p99'], '; omistajat', [d['avain'] for d in dyn], '; hetki', hetki and hetki['nimi'])


if __name__ == '__main__':
    mita, rajat_kansio, mos_polku, ne, ulos = sys.argv[1:6]
    mos = np.load(mos_polku); varit = varitaulu(rajat_kansio)
    for v in (PYSAKIT if mita == 'kaikki' else [int(mita)]):
        tee(v, rajat_kansio, mos, ne, ulos, varit)
