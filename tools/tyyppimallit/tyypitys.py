"""TYÖKALU 2, TYYPITYS (Valoseppä 14.11.2026; KK 22.55 ja 22.54: erillisenä komentona, kytkentä generaattoriin KS:lle).
Lukee kaupungin OSM-otteen (KS:n planeettaote: <ote>/osm.json.gz, ways + rel) ja kirjoittaa:
  merkit-<kaupunki>.json   resepti: tyyppi, kokoluokka, pohja (metreinä keskipisteestä), pitkä akseli, mitat, korkeus, nimi, wikidata, sääntö
  poistot-<kaupunki>.json  OSM-tunnisteet, joiden tavallinen talo korvataan tyyppimallilla (työkalulle 1 / generaattorille)
  ohitetut-<kaupunki>.tsv  ehdokkaat, joita ei tyypitetty, ja syy (ikoni, liian pieni, asuintalo ...)
  eisovi-<kaupunki>.tsv    tyypitetyt, jotka eivät sovi mihinkään tyyppimalliin (KK 23.05 kohta 3): jäävät koodimalleiksi tai perustaloksi; KK päättää.
                           Nämä EIVÄT ole poistoissa (perustalo jää), ellei KK siirrä niitä käsikorjauksella tyyppiin.
Käsikorjaukset erillisessä tiedostossa (kasikorjaukset-<kaupunki>.json): {"tyyppi": {"way/1": "kirkko-keski"}, "ohita": ["way/2"],
  "torni": {"way/3": "risteys|2|neula"}, "ei_sovi": {"way/4": "syy"}} (tornin kentät paikka|torneja|huippu, tyhjä = oletus; KK 23.05 kohta 2).
Käyttö: python3 -I tyypitys.py <ote-kansio> <kaupunki> <ulos-kansio> [--kasi <json>] [--otos 30]
Säännöt ovat dataa (SAANNOT alla); ei käsityötä per rakennus."""
import gzip, json, math, os, random, sys

KIRKKO_B = {'church', 'cathedral', 'chapel', 'basilica', 'religious', 'shrine', 'convent', 'monastery'}
ASUIN_B = {'house', 'apartments', 'residential', 'detached', 'terrace', 'houseboat;chapel', 'boat', 'kiosk', 'roof'}
SAANNOT = {
    'kirkko_suuri_ala': 2500,      # m²: katedraali-tyyppi (sivulaivat, poikkilaiva, kaksi länsitornia)
    'kirkko_pieni_ala': 400,       # m²: kappeli-tyyppi
    'min_ala': 60,                 # m²: pienemmät (lippaat, kioskit) ohitetaan
    'asema_halli_ala': 8000,       # m² ja pituus: hallikatollinen pääteasema
    'asema_halli_pituus': 100,
    'asema_min_ala': 150,          # m²: pienemmät asemarakennukset (metron sisäänkäynnit) ohitetaan
    'palatsi_nimi_ala': 1500,      # m²: nimi "Palais …" / "Château …" riittää tästä alasta
    'katedraali_min_ala': 2000,    # m²: nimi/building=cathedral antaa katedraalimallin vasta tästä (Saint-Irénée 310 m², N-D-des-Victoires 1 435 m²)
    'kappeli_max_ala': 800,        # m²: building=chapel antaa pienen mallin vain tähän asti (Saint-Martin-des-Champs 1 518 m²)
}
# Palatsin nimisääntö ei koske näitä (Palais des Sports ×7, Palais des Congrès; tarkistus 14.11.).
PALATSI_EI_NIMI = ('sport', 'congrès', 'congres', 'femme')
PALATSI_EI_B = {'sports_centre', 'dormitory', 'stadium'}
# NIMILISTAT (KK 23.25): harvinaiset tyypit (asema, palatsi, kupolikirkko, myöhemmin pylvästemppeli) VAIN nimilistalta per kaupunki; säännöllä
# tyypitetään vain kirkot. Säännön löytämät asemat ja palatsit, jotka eivät ole listalla, ovat "ei sovi". Lista voi myös nostaa ehdokkaaksi rakennuksen,
# jota sääntö ei löydä (Institut = building=public, Hôtel de Ville = civic). OSM-otteissa ei ole kupoli- eikä hallitietoa. Avain OSM-tunniste.
# Tila: KUPOLIT hyväksytty (KK 23.25); ASEMAT ja PALATSIT EHDOTUS (VS 14.11. klo 23.4x, ehdotus-listat-pariisi.md) → odottaa KK:n hyväksyntää.
NIMILISTAT = {
    'pariisi': {
        # KUPOLIT (hyväksytty KK 23.25)
        'way/59846865': ('kupolikirkko', 'keski', 'Val-de-Grâce'),
        'way/56046786': ('kupolikirkko', 'keski', 'Saint-Paul-Saint-Louis'),
        'way/67501490': ('kupolikirkko', 'keski', 'Saint-Augustin'),
        # PYLVÄSTEMPPELIT (hyväksytty KK 23.32, seitsemäs tyyppi)
        'way/54180046': ('pylvastemppeli', 'keski', 'Madeleine', {'katto': 'harja'}),
        'way/54657155': ('pylvastemppeli', 'keski', 'Palais Brongniart', {'katto': 'attika'}),
        # ASEMAT (KK 23.32: Austerlitz ja l'Est hyväksytty; Nord, Saint-Lazare ja Lyon odottavat parametria halleja 1–3, työ E)
        'way/62380197': ('asema', 'suuri', "Gare d'Austerlitz", {'halleja': 1}),
        'way/280670907': ('asema', 'suuri', "Gare de l'Est (halli, nimetön OSM-pohja)", {'halleja': 1}),
        'way/63197091': ('asema', 'suuri', 'Gare du Nord (halli, nimetön OSM-pohja)', {'odottaa': 'halleja-parametri (KK 23.32, työ E)'}),
        'way/727994377': ('asema', 'suuri', 'Gare Saint-Lazare', {'odottaa': 'halleja-parametri (KK 23.32, työ E)'}),
        'way/1161318094': ('asema', 'suuri', 'Gare de Lyon', {'odottaa': 'halleja-parametri (KK 23.32, työ E)'}),
        # PALATSIT (KK 23.32: nimet hyväksytty, malli EI vielä: sovitus ja umpipihavariantti, työ D)
        'relation/1019368': ('palatsi', 'keski', 'Palais Bourbon', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/975955': ('palatsi', 'keski', 'Palais du Luxembourg', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/1060803': ('palatsi', 'keski', "Palais de l'Élysée", {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/1002192': ('palatsi', 'keski', "Palais de la Légion d'Honneur", {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/542460': ('palatsi', 'keski', 'Palais Cambon', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'way/448794899': ('palatsi', 'keski', 'Quai d’Orsay (ministère)', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'way/175448743': ('palatsi', 'keski', 'Hôtel de Lassay', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'way/83203039': ('palatsi', 'keski', 'Château de la Muette', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/284089': ('palatsi', 'keski', 'Hôtel de Ville', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/1060822': ('palatsi', 'keski', 'Hôtel de la Marine', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/1060804': ('palatsi', 'keski', 'Hôtel de Crillon', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
        'relation/1076880': ('palatsi', 'keski', 'Hôtel de Matignon', {'odottaa': 'palatsin sovitus / umpipiha (KK 23.32, työ D)'}),
    },
}
NIMILISTA_TILA = {'kupolikirkko': 'hyväksytty', 'pylvastemppeli': 'hyväksytty', 'asema': 'hyväksytty', 'palatsi': 'nimi hyväksytty'}
# TORNIN OLETUKSET kokoluokittain (KK 23.05 kohta 2): paikka (lansi | risteys), torneja (1 | 2), huippu (pyramidi | neula | tasakatto).
TORNI_OLETUS = {'pieni': ('lansi', 1, 'pyramidi'), 'keski': ('lansi', 1, 'neula'), 'suuri': ('lansi', 2, 'tasakatto')}
# Tyypit, joille on malli (oma/Tyyppimallit.cs); muut tyypitetyt menevät "ei sovi" -listaan.
MALLIT = {('kirkko', 'pieni'), ('kirkko', 'keski'), ('kirkko', 'suuri'), ('kupolikirkko', 'keski'), ('asema', 'suuri'), ('palatsi', 'keski'), ('pylvastemppeli', 'keski')}
# Mallien pohjan mitat (pituus × leveys m, torni mukana; kaanna.sh tulostaa): luonnollinen sovitus kirkoille kaistalla (KK 23.32).
MALLIMITAT = {('kirkko', 'pieni'): (32.0, 12.0), ('kirkko', 'keski'): (61.0, 19.0), ('kirkko', 'suuri'): (111.0, 49.0)}
SOVITUS = {
    'kirkko_min_sivusuhde': 1.10,  # alle: neliömäinen tai pyöreä pohja = keskeiskirkko, ei pitkäkirkkoa (KK 23.32, oli 1,25)
    'luonnollinen_alle': 1.25,     # kaistalla 1,10–1,25 LUONNOLLINEN sovitus (mittasuhde säilyy, loppu pohjasta kirkkopihaksi; KK 23.32)
    'max_ylitys': 2.0,             # m: luonnollinen malli saa ylittää pohjan enintään tämän, muuten pienennetään
    'min_mittakaava': 0.7,         # luonnollinen mittakaava tätä pienempi → ei sovi
    'min_tayttoaste': 0.55,        # ala / pienin suorakaide: pienempi = L-, U- tai sisäpihallinen pohja
}
# Ikonien koodimallit (OhjelmaKohde*.cs, Lat/Lon-vakiot) ja säde metreinä: ehdokas, jonka keskipiste on säteen sisällä, on ikoni ja ohitetaan.
IKONIT = {
    'pariisi': [('Notre-Dame', 48.853018, 2.349881, 90), ('Sainte-Chapelle', 48.8553868, 2.3450299, 40), ('Sacré-Cœur', 48.8862, 2.3431, 80),
                ('Panthéon', 48.8462, 2.3461, 80), ('Invalides', 48.8559016, 2.3126136, 260), ('Opéra', 48.87198, 2.33163, 100),
                ('Louvre', 48.8617038, 2.3362195, 320), ('Orsay', 48.86, 2.32661, 120), ('Grand Palais', 48.86616, 2.31223, 150),
                ('Petit Palais', 48.8660642, 2.3149164, 80), ('Montparnasse', 48.84211, 2.32197, 60), ('Riemukaari', 48.87378, 2.29504, 40)],
    'lontoo': [('Abbey', 51.499406, -0.127429, 80), ('St Paul', 51.51378, -0.098322, 110), ('Westminster', 51.4995, -0.1248, 160),
               ('Tower', 51.5081, -0.0762, 150), ('British Museum', 51.5194, -0.127, 120), ('NHM', 51.4965, -0.1758, 120),
               ('Buckingham', 51.500916, -0.142449, 120), ('Royal Albert Hall', 51.501021, -0.177405, 70), ('Kensington', 51.505158, -0.188124, 90),
               ('Greenwich College', 51.483172, -0.005494, 120), ('Queens House', 51.481192, -0.00375, 60)],
}


def projektori(lat0, lon0):
    ky = 111320.0; kx = 111320.0 * math.cos(math.radians(lat0))
    return lambda la, lo: ((lo - lon0) * kx, (la - lat0) * ky)   # x itään, y pohjoiseen


def renkaat_rel(rel):
    """Liittää ulkorenkaan palat päistä yhteen (multipolygon); palauttaa suljetut ulkorenkaat."""
    palat = [list(map(tuple, j['p'])) for j in rel.get('j', []) if j.get('rooli') in ('outer', '') and len(j.get('p', [])) >= 2]
    valmiit = []
    while palat:
        r = palat.pop(0)
        muuttui = True
        while r[0] != r[-1] and muuttui:
            muuttui = False
            for i, q in enumerate(palat):
                if q[0] == r[-1]: r += q[1:]
                elif q[-1] == r[-1]: r += q[-2::-1]
                elif q[-1] == r[0]: r = q[:-1] + r
                elif q[0] == r[0]: r = q[:0:-1] + r
                else: continue
                palat.pop(i); muuttui = True; break
        if len(r) >= 4: valmiit.append(r)
    return valmiit


def ala(q):
    return 0.5 * sum(q[i][0] * q[(i + 1) % len(q)][1] - q[(i + 1) % len(q)][0] * q[i][1] for i in range(len(q)))


def kupera(pts):
    pts = sorted(set(pts))
    if len(pts) < 3: return pts
    def risti(o, a, b): return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    ala_, yla = [], []
    for p in pts:
        while len(ala_) >= 2 and risti(ala_[-2], ala_[-1], p) <= 0: ala_.pop()
        ala_.append(p)
    for p in reversed(pts):
        while len(yla) >= 2 and risti(yla[-2], yla[-1], p) <= 0: yla.pop()
        yla.append(p)
    return ala_[:-1] + yla[:-1]


def pienin_suorakaide(pts):
    """Pienialaisin kierretty suorakaide kuperan verhon särmien suuntiin: (pituus, leveys, akselin atsimuutti 0–180, keskipiste)."""
    h = kupera(pts); paras = None
    for i in range(len(h)):
        ax, ay = h[i]; bx, by = h[(i + 1) % len(h)]
        l = math.hypot(bx - ax, by - ay)
        if l < 1e-6: continue
        ux, uy = (bx - ax) / l, (by - ay) / l
        us = [p[0] * ux + p[1] * uy for p in h]; vs = [-p[0] * uy + p[1] * ux for p in h]
        a = (max(us) - min(us)) * (max(vs) - min(vs))
        if paras is None or a < paras[0]:
            uc, vc = (max(us) + min(us)) / 2, (max(vs) + min(vs)) / 2
            paras = (a, max(us) - min(us), max(vs) - min(vs), ux, uy, (uc * ux - vc * uy, uc * uy + vc * ux))
    _, du, dv, ux, uy, c = paras
    if du >= dv: px, py, pit, lev = ux, uy, du, dv
    else: px, py, pit, lev = -uy, ux, dv, du
    atsi = math.degrees(math.atan2(px, py)) % 180.0   # 0 = pohjoinen, 90 = itä
    return pit, lev, atsi, c


def luku(s):
    try: return float(str(s).replace(',', '.').split()[0].rstrip('m'))
    except Exception: return None


def korkeus(t):
    h = luku(t.get('height')) if 'height' in t else None
    if h: return h, 'height'
    k = luku(t.get('building:levels')) if 'building:levels' in t else None
    if k: return round(k * 3.4 + 2.0, 1), 'levels'
    return None, None


def piste_ulkona(p, poly):
    """Etäisyys monikulmion ulkopuolelle (0 = sisällä)."""
    x, y = p; sis = False; n = len(poly); dmin = 1e9
    for i in range(n):
        (ax, ay), (bx, by) = poly[i], poly[(i + 1) % n]
        if (ay > y) != (by > y) and x < (bx - ax) * (y - ay) / (by - ay) + ax: sis = not sis
        dx, dy = bx - ax, by - ay; l2 = dx * dx + dy * dy or 1e-9
        t = max(0.0, min(1.0, ((x - ax) * dx + (y - ay) * dy) / l2))
        dmin = min(dmin, math.hypot(x - ax - t * dx, y - ay - t * dy))
    return 0.0 if sis else dmin


def sovita_luonnollinen(poly, atsi, L, W, pit, lev):
    """Mittasuhteen säilyttävä mittakaava: mahtuu pienimpään suorakaiteeseen, ja jos malli ylittää pohjan yli max_ylitys m, pienennetään.
    poly suhteessa suorakaiteen keskipisteeseen. Palauttaa (mittakaava, ylitys)."""
    s = min(pit / L, lev / W); ux, uy = math.sin(math.radians(atsi)), math.cos(math.radians(atsi)); vx, vy = -uy, ux
    while True:
        hl, hw = L * s / 2, W * s / 2
        pts = [(i * hl, j * hw) for i in (-1, 0, 1) for j in (-1, 0, 1) if i or j]
        yl = max(piste_ulkona((a * ux + b * vx, a * uy + b * vy), poly) for a, b in pts)
        if yl <= SOVITUS['max_ylitys'] or s < SOVITUS['min_mittakaava'] * 0.9: return s, yl
        s *= 0.97


def nimi_hall(nimi):
    import re
    return re.search(r'\b(Hall|Halle)\b', nimi or '') is not None


def ei_sovi(tyyppi, koko, a, pit, lev, renkaita, nimi=''):
    """KK 23.05 kohta 3: syy, miksi tyypitetty ei sovi mihinkään tyyppimalliin, tai None."""
    if (tyyppi, koko) not in MALLIT: return f'ei mallia tyypille {tyyppi}'
    taytto = a / max(pit * lev, 1.0)
    if tyyppi == 'kirkko' and pit / max(lev, 0.1) < SOVITUS['kirkko_min_sivusuhde']: return f'keskeinen pohja (sivusuhde {pit / max(lev, 0.1):.2f})'
    if taytto < SOVITUS['min_tayttoaste']: return f'epäsäännöllinen pohja (täyttö {taytto:.2f})'
    if renkaita > 1 and tyyppi != 'asema': return f'{renkaita} erillistä pohjaa'
    if tyyppi == 'asema' and nimi_hall(nimi): return 'aseman hallin osa (OSM jakaa aseman)'
    return None


def tyypita(t, a, pit):
    """Palauttaa (tyyppi, kokoluokka, sääntö) tai (None, None, syy)."""
    b = t.get('building', ''); am = t.get('amenity', ''); rel = t.get('religion', ''); nimi = t.get('name', '')
    kirkollinen = b in KIRKKO_B or am == 'place_of_worship' or b in ('synagogue', 'mosque', 'temple')
    asema = b == 'train_station' or (t.get('railway') == 'station' and b) or (t.get('public_transport') == 'station' and b)
    palatsi = b == 'palace' or t.get('castle_type') in ('palace', 'stately') or \
        ((nimi.startswith('Palais') or nimi.startswith('Château')) and a >= SAANNOT['palatsi_nimi_ala'] and b not in ASUIN_B
         and b not in PALATSI_EI_B and not any(k in nimi.lower() for k in PALATSI_EI_NIMI))
    if not (kirkollinen or asema or palatsi): return None, None, None
    if a < SAANNOT['min_ala']: return None, None, f'liian pieni {a:.0f} m²'
    if kirkollinen:
        if b in ASUIN_B: return None, None, f'asuintalo tai muu (building={b})'
        if b == 'synagogue' or rel == 'jewish': return 'synagoga', 'keski', 'building/religion'
        if b == 'mosque' or rel == 'muslim': return 'moskeija', 'keski', 'building/religion'
        if b == 'temple' or rel in ('buddhist', 'hindu'): return 'temppeli', 'keski', 'building/religion'
        if rel and rel != 'christian': return None, None, f'religion={rel}'
        if ((b == 'cathedral' or nimi.startswith('Cathédrale') or nimi.startswith('Basilique')) and a >= SAANNOT['katedraali_min_ala']) \
                or a >= SAANNOT['kirkko_suuri_ala']:
            return 'kirkko', 'suuri', 'cathedral/nimi' if a < SAANNOT['kirkko_suuri_ala'] else f'ala ≥ {SAANNOT["kirkko_suuri_ala"]}'
        if (b == 'chapel' and a < SAANNOT['kappeli_max_ala']) or a < SAANNOT['kirkko_pieni_ala']:
            return 'kirkko', 'pieni', 'chapel' if b == 'chapel' else f'ala < {SAANNOT["kirkko_pieni_ala"]}'
        return 'kirkko', 'keski', 'oletus'
    if asema:
        # Metro (station=subway, subway=yes) ja muut kuin rautatieasemarakennukset (vene, katos, työmaa) eivät saa asemamallia.
        if t.get('station') == 'subway' or (t.get('subway') == 'yes' and b != 'train_station'): return None, None, 'asema: metro'
        if b in ('boat', 'roof', 'construction', 'kiosk'): return None, None, f'asema: building={b}'
        if b != 'train_station' and not nimi.startswith('Gare'): return None, None, f'asema: building={b} ilman Gare-nimeä'
        if a < SAANNOT['asema_min_ala']: return None, None, f'asema liian pieni {a:.0f} m²'
        if a >= SAANNOT['asema_halli_ala'] and pit >= SAANNOT['asema_halli_pituus']: return 'asema', 'suuri', 'halli (ala ja pituus)'
        return 'asema', 'pieni', 'asemarakennus'
    return 'palatsi', 'keski', 'building/castle_type' if b == 'palace' or t.get('castle_type') else 'nimi + ala'


def main(a):
    ote, kaupunki, ulos = a[0], a[1], a[2]
    kasi = {}; otos = 30
    if '--kasi' in a: kasi = json.load(open(a[a.index('--kasi') + 1]))
    if '--otos' in a: otos = int(a[a.index('--otos') + 1])
    os.makedirs(ulos, exist_ok=True)
    meta = json.load(open(os.path.join(ote, 'ote.json')))
    d = json.load(gzip.open(os.path.join(ote, 'osm.json.gz')))
    P = projektori(meta['lat'], meta['lon'])
    ikonit = [(n, *P(la, lo), r) for n, la, lo, r in IKONIT.get(kaupunki, [])]
    lista = NIMILISTAT.get(kaupunki, {})
    merkit, poistot, ohit = [], [], []
    for w in d['ways'] + d.get('rel', []):
        t = w.get('t', {})
        if not t.get('building'): continue
        oid = w['osm']
        renkaat = [w['p']] if 'p' in w else renkaat_rel(w)
        if not renkaat: continue
        qs = [[P(la, lo) for la, lo in r] for r in renkaat]
        alat = [abs(ala(q)) for q in qs]
        A = sum(alat)
        pts = [p for q in qs for p in q]
        pit, lev, atsi, c = pienin_suorakaide(pts)
        tyyppi, koko, saanto = tyypita(t, A, pit); parametrit = {}
        if oid in lista:
            tyyppi, koko, ln, *pa = lista[oid]; parametrit = dict(pa[0]) if pa else {}
            saanto = f'nimilista ({NIMILISTA_TILA.get(tyyppi, "ehdotus")}): {ln}'
        elif tyyppi in ('asema', 'palatsi'):
            saanto = 'ei nimilistalla (KK 23.25: harvinaiset tyypit vain listalta)'
        if tyyppi is None and saanto is None: continue
        nimi = t.get('name', '')
        if oid in kasi.get('ohita', []): ohit.append((oid, nimi, 'käsikorjaus: ohita')); continue
        if tyyppi is None: ohit.append((oid, nimi, saanto)); continue
        ik = next((n for n, ix, iy, r in ikonit if math.hypot(c[0] - ix, c[1] - iy) < r), None)
        if ik: ohit.append((oid, nimi, f'ikoni {ik}')); continue
        if oid in kasi.get('tyyppi', {}):
            tyyppi, koko = kasi['tyyppi'][oid].split('-'); saanto = 'käsikorjaus'
        h, hl = korkeus(t)
        # Torni länsipäähän (kuori itään), ellei käsikorjaus muuta: akselin pää, jonka suunta on lähempänä länttä.
        ax = math.sin(math.radians(atsi)); ay = math.cos(math.radians(atsi))
        lansi = (-ax, -ay) if ax > 0 or (ax == 0 and ay > 0) else (ax, ay)
        # Tornin kentät: oletus kokoluokasta, käsikorjaus "paikka|torneja|huippu" (tyhjä kenttä = oletus). Muilla kuin kirkoilla ei tornia.
        tp = tn = th = None
        if tyyppi == 'kirkko':
            tp, tn, th = TORNI_OLETUS[koko]
            kk = kasi.get('torni', {}).get(oid, '').split('|')
            if len(kk) > 0 and kk[0]: tp = kk[0]
            if len(kk) > 1 and kk[1]: tn = int(kk[1])
            if len(kk) > 2 and kk[2]: th = kk[2]
        syy = ei_sovi(tyyppi, koko, A, pit, lev, len(qs), nimi) if saanto != 'käsikorjaus' else None
        if saanto.startswith('ei nimilistalla'): syy = 'ei nimilistalla'
        if 'odottaa' in parametrit: syy = 'odottaa: ' + parametrit.pop('odottaa')
        if oid in kasi.get('ei_sovi', {}): syy = 'käsikorjaus: ' + kasi['ei_sovi'][oid]
        suurin = qs[alat.index(max(alat))]
        # Sovitus (KK 23.32): kirkko kaistalla 1,10–1,25 luonnollisesti (mittakaava, kirkkopiha), muuten pohjaan.
        sovitus, mk, yl = 'pohja', None, None
        if tyyppi == 'kirkko' and syy is None and pit / max(lev, 0.1) < SOVITUS['luonnollinen_alle']:
            poly = [(x - c[0], y - c[1]) for x, y in suurin]
            # Ensin pinta-alan kokoluokka, sitten pienempi (keski → pieni, suuri → keski), jos mittakaava jää alle rajan.
            for kk_ in [koko] + {'suuri': ['keski'], 'keski': ['pieni'], 'pieni': []}[koko]:
                L, W = MALLIMITAT[(tyyppi, kk_)]
                mk, yl = sovita_luonnollinen(poly, atsi, L, W, pit, lev)
                if mk >= SOVITUS['min_mittakaava'] and yl <= SOVITUS['max_ylitys']:
                    if kk_ != koko: saanto += f'; luonnollinen: {koko} → {kk_}'; koko = kk_
                    break
            sovitus = 'luonnollinen'
            if tyyppi == 'kirkko': tp, tn, th = TORNI_OLETUS[koko]
            if mk < SOVITUS['min_mittakaava']: syy = f'luonnollinen sovitus (mittakaava {mk:.2f} < {SOVITUS["min_mittakaava"]})'
            elif yl > SOVITUS['max_ylitys']: syy = f'luonnollinen sovitus (ylitys {yl:.1f} m)'
        la_c = meta['lat'] + c[1] / 111320.0; lo_c = meta['lon'] + c[0] / (111320.0 * math.cos(math.radians(meta['lat'])))
        merkit.append({
            'osm': oid, 'tyyppi': tyyppi, 'koko': koko, 'saanto': saanto, 'nimi': nimi, 'wikidata': t.get('wikidata'),
            'keski': [round(la_c, 7), round(lo_c, 7)], 'akseli': round(atsi, 1), 'pituus': round(pit, 1), 'leveys': round(lev, 1),
            'ala': round(A), 'sivusuhde': round(pit / max(lev, 0.1), 2), 'korkeus': h, 'korkeus_lahde': hl,
            'torni_paikka': tp, 'torneja': tn, 'huippu': th, 'ei_sovi': syy, 'lansipaa': [round(c[0] + lansi[0] * pit / 2 - c[0], 1), round(lansi[1] * pit / 2, 1)],
            'pohja': [[round(x - c[0], 1), round(y - c[1], 1)] for x, y in suurin[:-1]],
            'renkaita': len(qs), 'sovitus': sovitus, 'mittakaava': round(mk, 3) if mk else None, 'ylitys': round(yl, 1) if yl is not None else None,
            'parametrit': parametrit or None,
        })
        if syy is None: poistot.append(oid)
    merkit.sort(key=lambda m: (m['tyyppi'], m['koko'], -m['ala']))
    json.dump({'kaupunki': kaupunki, 'lahde': os.path.abspath(ote), 'saannot': SAANNOT, 'merkit': merkit},
              open(os.path.join(ulos, f'merkit-{kaupunki}.json'), 'w'), ensure_ascii=False, indent=0)
    json.dump(sorted(poistot), open(os.path.join(ulos, f'poistot-{kaupunki}.json'), 'w'))
    with open(os.path.join(ulos, f'ohitetut-{kaupunki}.tsv'), 'w') as f:
        for r in ohit: f.write('\t'.join(r) + '\n')
    eis = [m for m in merkit if m['ei_sovi']]
    lu = [m for m in merkit if m['sovitus'] == 'luonnollinen']
    lu_ok = [m for m in lu if not m['ei_sovi']]
    with open(os.path.join(ulos, f'eisovi-{kaupunki}.tsv'), 'w') as f:
        f.write('osm\ttyyppi\tala\tnimi\tei sovi mihinkään tyyppiin\tosm-linkki\n')
        for m in sorted(eis, key=lambda m: -m['ala']):
            f.write(f"{m['osm']}\t{m['tyyppi']}-{m['koko']}\t{m['ala']}\t{m['nimi']}\t{m['ei_sovi']}\thttps://www.openstreetmap.org/{m['osm']}\n")
    # Yhteenveto ja otos tarkistukseen (näyttö b: 30 satunnaista, väärin < 10 %).
    from collections import Counter
    c = Counter((m['tyyppi'], m['koko']) for m in merkit)
    print(f'{kaupunki}: {len(merkit)} tyypitetty ({len(poistot)} malliin, {len(eis)} ei sovi), {len(ohit)} ohitettu')
    if lu: print(f"  luonnollinen sovitus (kaista {SOVITUS['kirkko_min_sivusuhde']}–{SOVITUS['luonnollinen_alle']}): {len(lu)} kirkkoa, {len(lu_ok)} malliin "
                 f"(mittakaava {min(m['mittakaava'] for m in lu_ok):.2f}–{max(m['mittakaava'] for m in lu_ok):.2f}, pienempi kokoluokka {sum('→' in m['saanto'] for m in lu_ok)}), {len(lu) - len(lu_ok)} ei sovi")
    print('  ei sovi:', ', '.join(f'{k} {n}' for k, n in Counter(m['ei_sovi'].split(' (')[0] for m in eis).most_common()))
    for k, n in sorted(c.items()): print(f'  {k[0]}-{k[1]}\t{n}')
    co = Counter(r[2].split(' ')[0] for r in ohit)
    print('  ohitetut:', ', '.join(f'{k} {n}' for k, n in co.most_common()))
    random.seed(1873)
    with open(os.path.join(ulos, f'otos-{kaupunki}.tsv'), 'w') as f:
        for m in random.sample(merkit, min(otos, len(merkit))):
            f.write(f"{m['osm']}\t{m['tyyppi']}-{m['koko']}\t{m['ala']}\t{m['nimi']}\t{m['saanto']}\t{m['ei_sovi'] or ''}\thttps://www.openstreetmap.org/{m['osm']}\n")


if __name__ == '__main__':
    main(sys.argv[1:])
