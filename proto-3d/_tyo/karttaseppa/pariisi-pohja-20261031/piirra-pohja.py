#!/usr/bin/env python3
"""PARIISIN LUKITTU POHJA CODEXILLE (Karttaseppä 31.10.2026; omistaja 19.40 hyväksyi G-tyylin: "Hyvä. Tee nyt koko
kaupunki noin."; PT: lukittu pohja tarkkaan zoomattavaan tuotantokarttaan, koko Pariisi OSM relation 7444).

Projektio = G-kuvan mittasuhteet (11 maamerkin sovitus), ortografinen kamera pohjoinen ylös, kallistus 58.2°:
  E = (lon − 2.3475) · 111320 · cos(48.859°),  N = (lat − 48.859) · 110574            [m]
  X = E,  Y = −0.85 N − 0.527 h                                                      [m, y alas, h = korkeus]
  pikseli = ((X − X0) / s, (Y − Y0) / s), s = 2.0 m/px;  käänteinen (h = 0): E = X, N = −Y / 0.85.

Tasot (koko kangas ja palat 1536 × 1024, 64 px limitys):
  pohja  = maa, puistot ja metsät, vesi, kadut leveysluokittain, radat (litteä, ei rakennuksia)
  malli  = pohja + valkoinen pienoismalli: rakennusjalanjäljet pursotettuina OSM-korkeuksiin samassa viistokulmassa
  maski  = kaupungin raja (relation 7444): valkoinen sisällä, musta ulkona
Käyttö: python3 -I piirra-pohja.py
"""
import glob, json, math, os, sys
from PIL import Image, ImageDraw

Image.MAX_IMAGE_PIXELS = None
TYO = os.path.dirname(os.path.abspath(__file__))
OSM, ULOS = os.path.join(TYO, 'osm'), os.path.join(TYO, 'tulos')
os.makedirs(os.path.join(ULOS, 'palat'), exist_ok=True)

LAT0, LON0 = 48.859, 2.3475
KX, KY = 111320 * math.cos(math.radians(LAT0)), 110574.0
# G-kuvan mittasuhteet (Karttaseppä 31.10.2026): 11 maamerkin sovitus hyväksyttyyn G-kuvaan antoi x = E + 0.09 N,
# y = −0.88 N + 0.05 E (G liioittelee keskustaa, jäännökset ±150 px). Valittu puhdas ortografinen kamera: pohjoinen ylös,
# kallistus 58.2° (sin = 0.85), korkeus nostaa cos = 0.527. Codexin layoutin x = E − .23N; y = −.61N − .06E (SOURCES.json)
# antoi leveän vinon suunnikkaan, joka ei näyttänyt G:ltä.
A, B, C_, HK = 0.0, 0.85, 0.0, 0.527
S = 2.0
PALA_W, PALA_H, LIMI = 1536, 1024, 64
DET = -B - A * C_


def en(lat, lon):
    return (lon - LON0) * KX, (lat - LAT0) * KY


def maailma(lat, lon, h=0.0):
    e, n = en(lat, lon)
    return e - A * n, -B * n - C_ * e - HK * h


def kaanteinen(X, Y):
    e = (-B * X + A * Y) / DET
    n = (C_ * X + Y) / DET
    return LAT0 + n / KY, LON0 + e / KX


# ---------- data ----------
nahty, alkiot = set(), []
for p in sorted(glob.glob(os.path.join(OSM, 'solu-*.json'))):
    for el in json.load(open(p, encoding='utf-8')).get('elements', []):
        k = (el['type'], el['id'])
        if k in nahty:
            continue
        nahty.add(k)
        alkiot.append(el)
raja_el = json.load(open(os.path.join(OSM, 'raja-7444.json'), encoding='utf-8'))['elements'][0]
print('alkioita', len(alkiot), flush=True)


def renkaat(el, rooli='outer'):
    """Suljetut renkaat (lat, lon) -listoina. Relaatioiden saman roolin palat ketjutetaan."""
    if el['type'] == 'way':
        g = [(p['lat'], p['lon']) for p in el.get('geometry', []) if p]
        return [g] if len(g) >= 3 else []
    palat = [[(p['lat'], p['lon']) for p in m.get('geometry', []) if p]
             for m in el.get('members', []) if m.get('type') == 'way' and m.get('role', 'outer') in (rooli, '' if rooli == 'outer' else rooli)]
    palat = [q for q in palat if len(q) >= 2]
    tulos = []
    while palat:
        r = palat.pop(0)
        muutos = True
        while r[0] != r[-1] and muutos:
            muutos = False
            for i, q in enumerate(palat):
                if q[0] == r[-1]:
                    r += q[1:]
                elif q[-1] == r[-1]:
                    r += q[::-1][1:]
                elif q[-1] == r[0]:
                    r = q[:-1] + r
                elif q[0] == r[0]:
                    r = q[::-1][:-1] + r
                else:
                    continue
                palat.pop(i)
                muutos = True
                break
        if len(r) >= 3:
            tulos.append(r)
    return tulos


raja = renkaat(raja_el)
pts = [maailma(la, lo) for r in raja for la, lo in r]
X0 = min(p[0] for p in pts) - 200
X1 = max(p[0] for p in pts) + 200
Y0 = min(p[1] for p in pts) - 300          # tilaa korkeille rakennuksille pohjoisreunassa
Y1 = max(p[1] for p in pts) + 150
LEV, KOR = math.ceil((X1 - X0) / S), math.ceil((Y1 - Y0) / S)
ASK_X, ASK_Y = PALA_W - LIMI, PALA_H - LIMI
SAR = math.ceil((LEV - LIMI) / ASK_X)
RIV = math.ceil((KOR - LIMI) / ASK_Y)
LEV, KOR = SAR * ASK_X + LIMI, RIV * ASK_Y + LIMI
print('kangas', LEV, KOR, 'palat', RIV, '×', SAR, flush=True)


def px(lat, lon, h=0.0):
    X, Y = maailma(lat, lon, h)
    return ((X - X0) / S, (Y - Y0) / S)


# ---------- värit ----------
MAA = (244, 238, 224)
PUISTO = (218, 224, 196)
METSA = (200, 211, 180)
HAUTA = (222, 222, 205)
VESI = (191, 206, 212)
KATU, REUNA = (255, 253, 248), (206, 197, 178)
RATA = (160, 152, 140)
KATTO, SEINA_E, SEINA_SIVU, VIIVA = (253, 252, 248), (234, 231, 223), (216, 212, 203), (176, 170, 160)

KATULEVEYS = {'motorway': 24, 'trunk': 22, 'primary': 18, 'secondary': 15, 'tertiary': 12, 'motorway_link': 10,
              'trunk_link': 10, 'primary_link': 10, 'secondary_link': 9, 'tertiary_link': 8, 'residential': 9,
              'unclassified': 9, 'living_street': 7, 'pedestrian': 8, 'service': 5, 'busway': 7, 'footway': 2.5,
              'path': 2, 'cycleway': 2.5, 'track': 3}

kangas = Image.new('RGB', (LEV, KOR), MAA)
d = ImageDraw.Draw(kangas)


def monikulmio(el, vari):
    for r in renkaat(el, 'outer'):
        d.polygon([px(la, lo) for la, lo in r], fill=vari)
    if el['type'] == 'relation':
        for r in renkaat(el, 'inner'):
            d.polygon([px(la, lo) for la, lo in r], fill=MAA)


tag = lambda el: el.get('tags', {})
# 1) maankäyttö
for el in alkiot:
    t = tag(el)
    if 'building' in t:
        continue
    if t.get('landuse') == 'forest' or t.get('natural') in ('wood', 'scrub'):
        monikulmio(el, METSA)
    elif t.get('landuse') == 'cemetery':
        monikulmio(el, HAUTA)
    elif t.get('leisure') in ('park', 'garden', 'golf_course', 'pitch', 'playground', 'stadium') or \
            t.get('landuse') in ('grass', 'recreation_ground', 'meadow', 'village_green') or t.get('natural') == 'grassland':
        monikulmio(el, PUISTO)
# 2) vesi
for el in alkiot:
    t = tag(el)
    if t.get('natural') == 'water' or t.get('waterway') in ('riverbank', 'dock') or \
            (t.get('waterway') in ('canal', 'river') and el['type'] == 'way' and el['geometry'][0] == el['geometry'][-1]):
        monikulmio(el, VESI)
    elif t.get('waterway') in ('canal', 'river') and el['type'] == 'way':
        d.line([px(p['lat'], p['lon']) for p in el['geometry']], fill=VESI, width=max(2, round(12 / S)))
# 3) radat ja kadut
kadut = [el for el in alkiot if el['type'] == 'way' and tag(el).get('highway') in KATULEVEYS
         and tag(el).get('tunnel') not in ('yes', 'building_passage') and tag(el).get('area') != 'yes']
for el in alkiot:
    t = tag(el)
    if el['type'] == 'way' and t.get('railway') and t.get('tunnel') != 'yes':
        d.line([px(p['lat'], p['lon']) for p in el['geometry']], fill=RATA, width=max(1, round(3 / S)))
for vaihe in (0, 1):
    for el in kadut:
        w = KATULEVEYS[tag(el)['highway']] / S * 0.85
        viiva = [px(p['lat'], p['lon']) for p in el['geometry']]
        if vaihe == 0 and w >= 4:
            d.line(viiva, fill=REUNA, width=round(w + 2), joint='curve')
        elif vaihe == 1:
            d.line(viiva, fill=KATU, width=max(1, round(w)), joint='curve')
print('pohja piirretty', flush=True)
kangas.save(os.path.join(ULOS, 'pohja-kokonainen.png'), optimize=False)

# ---------- pienoismalli ----------


def korkeus(t):
    for k in ('height', 'building:height'):
        if k in t:
            try:
                return max(2.0, min(330.0, float(str(t[k]).replace('m', '').replace(',', '.').split(';')[0].strip())))
            except ValueError:
                pass
    if 'building:levels' in t:
        try:
            return float(str(t['building:levels']).split(';')[0]) * 3.2 + 2.0
        except ValueError:
            pass
    return {'house': 9, 'detached': 9, 'garage': 3, 'garages': 3, 'shed': 3, 'roof': 4, 'kiosk': 3, 'hut': 3,
            'church': 25, 'cathedral': 35, 'train_station': 20, 'industrial': 10, 'warehouse': 10,
            'construction': 6}.get(t.get('building'), 18.0)


rakennukset = []
for el in alkiot:
    t = tag(el)
    if 'building' not in t or t.get('building') in ('no',) or t.get('location') == 'underground':
        continue
    h = korkeus(t)
    for r in renkaat(el, 'outer'):
        if r[0] != r[-1]:
            r = r + [r[0]]
        xy = [maailma(la, lo) for la, lo in r]
        syv = sum(p[1] for p in xy) / len(xy)
        rakennukset.append((syv, h, r))
rakennukset.sort(key=lambda x: x[0])
print('rakennuksia', len(rakennukset), flush=True)
VALO = (-0.6, -0.8)          # valo lounaasta (E, N)
for syv, h, r in rakennukset:
    en_ = [en(la, lo) for la, lo in r]
    ala = sum(en_[i][0] * en_[i + 1][1] - en_[i + 1][0] * en_[i][1] for i in range(len(en_) - 1))
    if ala < 0:
        r, en_ = r[::-1], en_[::-1]
    pohja_px = [px(la, lo) for la, lo in r]
    katto_px = [(x, y - HK * h / S) for x, y in pohja_px]
    for i in range(len(r) - 1):
        de, dn = en_[i + 1][0] - en_[i][0], en_[i + 1][1] - en_[i][1]
        pit = math.hypot(de, dn) or 1
        ne_, nn = dn / pit, -de / pit            # ulospäin osoittava normaali (vastapäivään kiertävä rengas)
        if nn > 0.02 and abs(ne_) < 0.98 and nn > abs(ne_) * 0.3:
            continue                              # pohjoiseen päin: takaseinä, ei näy
        valoisuus = max(0.0, -(ne_ * VALO[0] + nn * VALO[1]))
        vari = tuple(round(SEINA_SIVU[k] + (SEINA_E[k] - SEINA_SIVU[k]) * valoisuus) for k in range(3))
        d.polygon([pohja_px[i], pohja_px[i + 1], katto_px[i + 1], katto_px[i]], fill=vari)
    d.polygon(katto_px, fill=KATTO, outline=VIIVA)
print('malli piirretty', flush=True)
kangas.save(os.path.join(ULOS, 'malli-kokonainen.png'), optimize=False)

# ---------- maski ----------
maski = Image.new('L', (LEV, KOR), 0)
dm = ImageDraw.Draw(maski)
for r in raja:
    dm.polygon([px(la, lo) for la, lo in r], fill=255)
maski.save(os.path.join(ULOS, 'maski-kokonainen.png'))

# ---------- palat ja manifesti ----------
pohja = Image.open(os.path.join(ULOS, 'pohja-kokonainen.png'))
palat = []
for rr in range(RIV):
    for cc in range(SAR):
        x0, y0 = cc * ASK_X, rr * ASK_Y
        laatikko = (x0, y0, x0 + PALA_W, y0 + PALA_H)
        nimi = f'r{rr + 1}-c{cc + 1}'
        for taso, kuva in (('pohja', pohja), ('malli', kangas), ('maski', maski)):
            kuva.crop(laatikko).save(os.path.join(ULOS, 'palat', f'pariisi-{taso}-{nimi}.png'))
        kulmat = {k: [round(v, 6) for v in kaanteinen(X0 + x * S, Y0 + y * S)]
                  for k, (x, y) in {'nw': (x0, y0), 'ne': (x0 + PALA_W, y0), 'se': (x0 + PALA_W, y0 + PALA_H),
                                    'sw': (x0, y0 + PALA_H)}.items()}
        lats = [v[0] for v in kulmat.values()]
        lons = [v[1] for v in kulmat.values()]
        sisalla = sum(1 for v in maski.crop(laatikko).resize((64, 43)).getdata() if v > 127) / (64 * 43)
        palat.append({'nimi': nimi, 'rivi': rr + 1, 'sarake': cc + 1, 'pikselit': list(laatikko),
                      'kulmat_maanpinta_latlon': kulmat,
                      'bbox_latlon': [round(min(lons), 6), round(min(lats), 6), round(max(lons), 6), round(max(lats), 6)],
                      'kaupunkia_osuus': round(sisalla, 3)})
kangas.resize((LEV // 8, KOR // 8), Image.LANCZOS).save(os.path.join(ULOS, 'malli-yleiskuva-1-8.png'))
pohja.resize((LEV // 8, KOR // 8), Image.LANCZOS).save(os.path.join(ULOS, 'pohja-yleiskuva-1-8.png'))
ankkurit = json.load(open(os.path.join(TYO, 'ankkurit.json'), encoding='utf-8'))
for a in ankkurit:
    a['pikseli'] = [round(v, 1) for v in px(a['lat'], a['lon'])]
    a['pala'] = next((p['nimi'] for p in palat if p['pikselit'][0] + LIMI / 2 <= a['pikseli'][0] < p['pikselit'][2] - LIMI / 2
                      and p['pikselit'][1] + LIMI / 2 <= a['pikseli'][1] < p['pikselit'][3] - LIMI / 2), None)
# Kuvakulma natiivin kameralle: katsesuunta = rivi_x × rivi_y (lähes ortografinen, rivien kulma 85°).
_rx, _ry = (1.0, -A, 0.0), (-C_, -B, -HK)  # rivit lähes ortonormaalit (|ry| = 1.0)
_d = (_rx[1] * _ry[2] - _rx[2] * _ry[1], _rx[2] * _ry[0] - _rx[0] * _ry[2], _rx[0] * _ry[1] - _rx[1] * _ry[0])
_l = math.sqrt(sum(v * v for v in _d))
KAMERA = {'katsesuunta_ENU': [round(v / _l, 4) for v in _d],
          'suunta_astetta': round(math.degrees(math.atan2(_d[0], _d[1])), 2),
          'kallistus_astetta': round(math.degrees(math.asin(_d[2] / _l)), 2),
          'huom': 'Piirros näkyy oikein vain tästä suunnasta (suunta pohjoisesta itään, kallistus alaspäin). Natiivissa '
                  'kapea näkökenttä tai ortografinen kamera; muissa kulmissa piirros häivytetään (omistaja 17.43).'}
manifesti = {
    'otsikko': 'Pariisin lukittu pohja (koko kaupunki, OSM relation 7444) G-tyylin tuotantokarttaan',
    'tekija': 'Karttaseppä 31.10.2026', 'tilaaja': 'Päätoimittaja (omistaja 31.10.2026 klo 19.40)',
    'projektio': {
        'kuvaus': f'ortografinen kamera G-kuvan mittasuhteilla: x = E - {A} N, y = -{B} N - {C_} E - {HK} h (h = korkeus m)',
        'origo_latlon': [LAT0, LON0], 'kx_m_per_aste': KX, 'ky_m_per_aste': KY,
        'eteenpain': f'E=(lon-lon0)*kx; N=(lat-lat0)*ky; X=E-{A}N; Y=-{B}N-{C_}E-{HK}h; px=(X-X0)/s; py=(Y-Y0)/s',
        'kaanteinen_maanpinta': f'det={DET}; E=(-{B}X+{A}Y)/det; N=({C_}X+Y)/det; lat=lat0+N/ky; lon=lon0+E/kx',
        'X0_m': X0, 'Y0_m': Y0, 's_m_per_px': S, 'korkeuskerroin': HK, 'pohjoinen': 'suoraan ylös',
        'kamera': KAMERA},
    'kangas_px': [LEV, KOR],
    'palat': {'leveys': PALA_W, 'korkeus': PALA_H, 'limitys_px': LIMI, 'riveja': RIV, 'sarakkeita': SAR,
              'nimeaminen': 'pariisi-<taso>-r<rivi>-c<sarake>.png (rivi 1 = pohjoisin, sarake 1 = läntisin)',
              'tasot': {'pohja': 'maa, puistot, vesi, kadut, radat', 'malli': 'pohja + valkoinen pienoismalli (OSM-jalanjäljet ja -korkeudet)',
                        'maski': 'kaupungin raja 7444: valkoinen = Pariisi'}, 'lista': palat},
    'ankkurit': ankkurit,
    'lahteet': {'osm': 'OpenStreetMap, Overpass API 31.10.2026 (24 solua bboxissa 2.219,48.809,2.476,48.909)',
                'raja': 'relation 7444', 'alkioita': len(alkiot), 'rakennuksia': len(rakennukset),
                'googlen_kuvia': False},
    'attribuutio': '© OpenStreetMap contributors · https://www.openstreetmap.org/copyright · ODbL 1.0',
}
json.dump(manifesti, open(os.path.join(ULOS, 'manifest.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('VALMIS', LEV, KOR, RIV, SAR, flush=True)
