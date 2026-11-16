"""Tyyppimallit peliin (KK 15.11. 00.16 kohdat 1 ja 3): merkit-<k>.json → Resources/Elava/merkit-<k>-kartta.bytes + tulos/vienti-<k>.json (poisOsm-lista).

python3 -I vie.py <kaupunki> <ulos.bytes> [--merkit tulos/merkit-<k>.json] [--moduulit <maasto.py:n kansio>]

1) VAIN TALOJEN ALUEELTA: kaupunkitaulun raja (taulu-uusi.json) ja Pariisissa lisäksi talolähde (natiiviseppa/pariisi-talot/osm.json),
   kuten budjetti.py (tulos/budjetti-alueella-<k>.json). Tiedosto ja poisOsm syntyvät samasta listasta (vienti-<k>.json 'poisOsm').
2) Ei sovi (merkit-<k>.json 'ei_sovi', esim. venytys 0,6–1,6) = perustalo jää, ei tiedostoon eikä poisOsm:iin.

TIEDOSTO MK01 (little-endian; luku ja testit: pelin Ydin/Elava/MerkkiTiedosto.cs):
  otsake 32 t:  "MK01" | u16 malleja | u16 liput (bit 0 = maa merkeissä) | u32 merkkejä | u32 varattu | f64 origo lat | f64 origo lon
  malli 24 t:   u8 tyyppi | u8 a | u8 b | u8 c | f32 p0 | f32 p1 | f32 p2 | f32 p3 (tyyppi 7: u32 bitteinä) | u32 varattu
     tyyppi 1 kirkko-pieni, 2 kirkko-keski (a = torni_paikka 0 länsi / 1 risteys, b = torneja, c = huippu 0 pyramidi / 1 neula / 2 tasakatto),
            3 kirkko-suuri, 4 kupolikirkko (a = pylväspääty 0/1), 5 pylvästemppeli (p0 pituus, p1 leveys, a = päädyn pylväät, b = harja 0/1, c = portiikki vain päädyssä 0/1),
            6 palatsi-piha (p0 pituus, p1 leveys, a = julkisivun sivu, b = avoin sivu, c = katto 0 mansardi / 1 attika; sivu 0 ei, 1 +x, 2 −x, 3 +z, 4 −z),
                          p2 = seinän sRGB 0xRRGGBB f32-kokonaislukuna (0 = oletuskivi; parametri 'seina' SEINA-taulusta)
            7 asema (p0 pituus L, p1 leveys W, p2 = kaupungin kattoväri sRGB 0xRRGGBB; kattovari(): KK 15.11. 05.22). Hallit pohjan sisään
                    (KK 15.11. 06.20 päätös B; pudonneet kaistat puolikkaina KK 07.25; hallit.py): MUOTO 2 = a = kaistoja (bitit 0–2) | julkisivukaistat << 3;
                    b | c << 8 = kaistakartta (bitti 15 = 1; kaistan k tila bitit 3k…: 0 ei, 1 kokonainen, 2 / 3 vain 1. / 2. puolikas, 4 molemmat);
                    hallien alku ja loppu u8:na jonossa H = [p3:n 4 RAAKAA tavua, varattu-kentän 4 tavua, jatkorivin tavut 1…23]; x = −L/2 + q · L/255.
                    Rivin perässä AINA JATKORIVI: tyyppi 11, 23 hallitavua (ei merkkejä, ei verkkoa). Mallin keskipiste = pohjan suorakaiteen keskipiste
                    kulman kehyksessä (merkin x z siirretty), akseli = hallien akseli (julkisivu −x kohti origoa). b c p3 varattu 0 = vanha malli (TyyppiAsema).
            8 kirkko-levea, 9 kirkko-basilika (a b c kuten 2; KK 15.11. 00.28 ja 01.14)
            10 kirkko-julkisivu (tornitön, KK 15.11.; a = kupoli 0/1: peli piirtää kupolin lisäosana tasaisella min(sx, sz); vain nimilistalta)
            12 PALETTIRIVI, aina rivi 0 (KK 15.11. 09.00 A): p0 = kattovari(k), p1 = seinavari(k) (sRGB f32-kokonaislukuina); ei merkkejä. Peli: kaikki
               tyyppimallien värit näistä (aukko ja seinän varjo seinästä, harjapelti katosta), tornin huippu ainoana omana värinä.
     Tyypit 1–4 ja 8–10 ovat jaettuja verkkoja (instanssi, venytys sx sz); 5–7 rakennetaan pohjan mitoista (sx = sz = 1) ja leivotaan yhdeksi verkoksi.
  merkki 24 t:  f32 x | f32 z (m origosta itään ja pohjoiseen, WGS84-ENU kuten kartta_puut.py) | i16 maa (0,25 m, maasto.py z12; 0 jos ei maata)
                | u16 malli | u16 akseli (0,01°, mallin +x:n atsimuutti pohjoisesta myötäpäivään; kirkoissa +x = kuori, torni länsipäähän)
                | u16 sx | u16 sz (×0,001) | u16 varattu | i32 osm (way > 0, relation < 0)
"""
import json, math, os, struct, sys, hashlib
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import hallit

TY = os.path.dirname(os.path.abspath(__file__))
TAULU = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/vaihtelu-20261114/taulu-uusi.json'
PARIISI_TALOT = '/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/osm.json'
MAASTO_OLETUS = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/lontoo-kumpu/palat-rakennus'
# Origo = pelin kaupungit.json "puut" (lat, lon): kartan elämän juuri on tässä (KartanElama). Lontoo: karttaseppa/puut-lontoo (7c618a16e).
ORIGO = {'pariisi': (48.86122, 2.35092), 'lontoo': (51.49754, -0.12574)}
# Kartta tasainen (puiden tiedostossa ei MAA1:tä): peli laskee maan itse kuten puille (PuunMaa). Muualla maa merkkiin.
TASAINEN = {'pariisi'}
TYYPPI = {('kirkko', 'pieni'): 1, ('kirkko', 'keski'): 2, ('kirkko', 'suuri'): 3, ('kupolikirkko', 'keski'): 4, ('pylvastemppeli', 'keski'): 5,
          ('palatsi', 'keski'): 6, ('asema', 'suuri'): 7, ('kirkko', 'levea'): 8, ('kirkko', 'basilika'): 9,
          ('kirkko', 'julkisivu'): 10}
SIVU = {None: 0, '': 0, '+x': 1, '-x': 2, '+z': 3, '-z': 4}
PAIKKA = {'lansi': 0, 'risteys': 1}
HUIPPU = {'pyramidi': 0, 'neula': 1, 'tasakatto': 2}
# Palatsin rivikohtainen seinä (KS 15.11. 01.4x): Portland-kivi = katot.py PERHEET['lontoo'].seinat[0], punatiili = viimeinen (KK 09.00 A: samasta
# lähteestä kuin talot, ei omia vakioita). Täytetään main():ssa lähteestä; None = kaupungin seinä (palettirivi).
SEINA = {None: 0, 'portland': None, 'tiili': None}
# Asemahallien kattoväri (KK 15.11. 05.22): kaupungin talokattojen perusväri SAMASTA LÄHTEESTÄ kuin talopalat. Kaupunkirivin katot.paletti
# (kaupungit-talot.json): vaihtelu-perhe → paletti → KATTO, kustakin suurimman osuuden sävy (KK 15.11. 05.26). Testi: testi_kattovari.py.
KATTOVARI = (0, '-')
# Ohitus ympäristömuuttujalla VS_KATOT_KANSIO (kansio, jossa katot.py), esim. KS:n commitista irrotettu kopio ennen kuin KS:n työpuu on sen haarassa.
KAUPUNKI_TYOKALU = os.environ.get('VS_KATOT_KANSIO') or '/Users/Shared/Claude/wt/proto-karttaseppa-tyokalu1/tyokalut/kaupunki'
# Kaupungit, joiden talopalat tehdään jo tyyliperheellä, vaikka kaupunkirivi (kaupungit-talot.json katot.vaihtelu.perhe) ei vielä ole KS:n haarassa:
# Lontoo l3d (KK 15.11. 07.05; KS katot.py 380dd4ae3, raakapalat karttaseppa/lontoo-tyyliperhe-20261115/l-l3d, rivi TYYLIPERHE.md). Kun rivi tulee, tämä ei muuta mitään.
PERHE_OHITUS = {'lontoo': 'lontoo', 'rooma': 'rooma', 'wien': 'wien'}  # rooma, wien: KS 797a3bf17 (KK 16.11. 23.5x; KOE)
TEE_PALAT = '/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py'


def _perheen_kentta(lahde, perhe, kentta):
    """katot.py:n PERHEET[perhe][kentta] lähdetekstistä AST:lla (ei katot.py:n tuontia). Kentän lauseke saa viitata moduulin literaalivakioihin
    ja kutsua sorted/sum/len/abs (KS 797a3bf17: Rooman katot=sorted(TERRAKOTTA, key=lambda c: -sum(c[0])))."""
    import ast
    puu = ast.parse(lahde)
    vakiot = {}
    for n in puu.body:
        if isinstance(n, ast.Assign) and len(n.targets) == 1 and isinstance(n.targets[0], ast.Name):
            try: vakiot[n.targets[0].id] = ast.literal_eval(n.value)
            except ValueError: pass
    for n in puu.body:
        if isinstance(n, ast.Assign) and isinstance(n.targets[0], ast.Name) and n.targets[0].id == 'PERHEET':
            for avain, arvo in zip(n.value.keys, n.value.values):
                if isinstance(avain, ast.Constant) and avain.value == perhe:
                    for kw in arvo.keywords:
                        if kw.arg == kentta:
                            koodi = compile(ast.Expression(kw.value), 'katot.py', 'eval')
                            return eval(koodi, {'__builtins__': {'sorted': sorted, 'sum': sum, 'len': len, 'abs': abs}}, dict(vakiot))
                    raise KeyError(f"PERHEET['{perhe}'] ilman kenttää {kentta}")
    raise KeyError(f"katot.py PERHEET ilman perhettä '{perhe}'")


def perheen_katot(lahde, perhe):
    """katot.py:n PERHEET[perhe]['katot'] (lista ((r, g, b), osuus)) lähdetekstistä."""
    return _perheen_kentta(lahde, perhe, 'katot')


def kattovari(k):
    """(sRGB 0xRRGGBB, selite) kaupungin talokattojen perusväri SAMASTA LÄHTEESTÄ kuin talopalat (KK 15.11. 05.26):
    kaupunkirivin katot.vaihtelu → katot.py PERHEET[perhe].katot suurin osuus; muuten katot.paletti → PALETTI_* suurin osuus; muuten tee-palat.py KATTO.
    Tasatilanteessa listan ensimmäinen (max palauttaa ensimmäisen). Talokohtainen ±4,5 % ja tiili eivät kuulu halliin (KK 05.26 kohta 2)."""
    import ast, re
    rivit = json.load(open(os.path.join(KAUPUNKI_TYOKALU, 'kaupungit-talot.json')))
    rivit = rivit.get('kaupungit', rivit) if isinstance(rivit, dict) else rivit
    rivi = ({r.get('nimi', r.get('id')): r for r in rivit} if isinstance(rivit, list) else rivit).get(k) or {}
    katot = rivi.get('katot') or {}
    lahde = open(os.path.join(KAUPUNKI_TYOKALU, 'katot.py'), encoding='utf-8').read()
    def suurin(lista, nimi):
        (r, g, b), osuus = max(lista, key=lambda x: x[1])
        return (r << 16) | (g << 8) | b, f'{nimi} suurin osuus {osuus}'
    perhe = (katot.get('vaihtelu') or {}).get('perhe') or PERHE_OHITUS.get(k)
    if perhe: return suurin(perheen_katot(lahde, perhe), f"katot.py PERHEET['{perhe}'].katot")
    paletti = katot.get('paletti')
    if paletti:
        nimi = {'k2b': 'PALETTI_K2B', 'k2': 'PALETTI_K2'}[paletti]
        return suurin(ast.literal_eval(re.search(rf'^{nimi} = (\[.*\])$', lahde, re.M).group(1)), f'katot.py {nimi}')
    r, g, b = ast.literal_eval(re.search(r'KATTO=(\([0-9, ]+\))', open(TEE_PALAT, encoding='utf-8').read()).group(1))
    return (r << 16) | (g << 8) | b, 'tee-palat.py KATTO'



def seinavari(k):
    """(sRGB 0xRRGGBB, selite) kaupungin talojen perusseinä SAMASTA LÄHTEESTÄ ja samalla säännöllä kuin kattovari() (KK 15.11. 09.00 A):
    kaupunkirivin katot.vaihtelu → PERHEET[perhe].seinat suurin osuus (tasatilanteessa ensimmäinen); muuten katot.seina 'puoli' → SEINA_PUOLI[0],
    '1' → SEINA_VAALEA[0]; muuten tee-palat.py SEINA[0]."""
    import ast, re
    rivit = json.load(open(os.path.join(KAUPUNKI_TYOKALU, 'kaupungit-talot.json')))
    rivit = rivit.get('kaupungit', rivit) if isinstance(rivit, dict) else rivit
    rivi = ({r.get('nimi', r.get('id')): r for r in rivit} if isinstance(rivit, list) else rivit).get(k) or {}
    katot = rivi.get('katot') or {}
    lahde = open(os.path.join(KAUPUNKI_TYOKALU, 'katot.py'), encoding='utf-8').read()
    perhe = (katot.get('vaihtelu') or {}).get('perhe') or PERHE_OHITUS.get(k)
    if perhe:
        (r, g, b), osuus = max(perheen_seinat(lahde, perhe), key=lambda x: x[1])
        return (r << 16) | (g << 8) | b, f"katot.py PERHEET['{perhe}'].seinat suurin osuus {osuus}"
    seina = str(katot.get('seina') or '')
    if seina:
        nimi = 'SEINA_PUOLI' if seina == 'puoli' else 'SEINA_VAALEA'
        r, g, b = ast.literal_eval(re.search(rf'^{nimi} = (\[[^\]]*\])', lahde, re.M).group(1))[0]
        return (r << 16) | (g << 8) | b, f'katot.py {nimi}[0]'
    r, g, b = ast.literal_eval(re.search(r'SEINA=\[(\([0-9, ]+\))', open(TEE_PALAT, encoding='utf-8').read()).group(1))
    return (r << 16) | (g << 8) | b, 'tee-palat.py SEINA[0]'


def perheen_seinat(lahde, perhe):
    """katot.py:n PERHEET[perhe]['seinat'] (lista ((r, g, b), osuus)) lähdetekstistä."""
    return _perheen_kentta(lahde, perhe, 'seinat')


def alueella(k, merkit):
    t = json.load(open(TAULU)); la0, la1, lo0, lo1 = t[k]['raja']
    pid = None
    if k == 'pariisi':
        o = json.load(open(PARIISI_TALOT)); pid = {w['osm'] for w in o['ways']} | {w['osm'] for w in o['rel']}
    return [m for m in merkit if la0 <= m['keski'][0] <= la1 and lo0 <= m['keski'][1] <= lo1 and (pid is None or m['osm'] in pid)]


def malli(m):
    """(avain, rivi): sama avain = sama verkko. Rivi = (tyyppi, a, b, c, p0, p1, p2, p3:n 4 tavua, varattu)."""
    r = _malli(m)
    return r if len(r) == 9 else r[:7] + (struct.pack('<f', r[7]), 0)


def _malli(m):
    t, k, p = m['tyyppi'], m['koko'], m['parametrit'] or {}
    ty = TYYPPI[(t, k)]
    if t == 'kirkko' and k == 'julkisivu': return (ty, 1 if p.get('kupoli') else 0, 0, 0, 0.0, 0.0, 0.0, 0.0)   # kupoli vain lähde + Commons-kuva
    if t == 'kirkko' and k != 'suuri':
        return (ty, PAIKKA[m['torni_paikka']], m['torneja'], HUIPPU[m['huippu']], 0.0, 0.0, 0.0, 0.0)
    if t == 'kirkko': return (ty, 0, 0, 0, 0.0, 0.0, 0.0, 0.0)
    if t == 'kupolikirkko': return (ty, 0 if p.get('pylvaspaaty') is False else 1, 0, 0, 0.0, 0.0, 0.0, 0.0)
    if t == 'pylvastemppeli':
        attika = p.get('katto') == 'attika'
        return (ty, 8 if p.get('portiikki') or not attika else 10, 0 if attika else 1, 1 if p.get('portiikki') else 0, float(m['pituus']), float(m['leveys']), 0.0, 0.0)
    if t == 'palatsi':
        return (ty, SIVU[p.get('julkisivu') or '+z'], SIVU[p.get('avoin_sivu') or ''], 1 if p.get('katto') == 'attika' else 0, float(m['pituus']), float(m['leveys']), float(SEINA[p.get('seina')]), 0.0)
    if t == 'asema':
        r = m['_hallit']
        return (ty, r['a'], r['b'], r['c'], float(r['pituus']), float(r['leveys']), float(KATTOVARI[0]), struct.pack('<I', r['p3_bitit']), r['varattu'])
    raise ValueError(t)


def akseli(m):
    """Mallin +x:n atsimuutti. Kirkoissa +x = kuori (itäpää): jos länsipää on akselin suuntaan, käännetään 180°."""
    a = m['akseli'] % 360
    if m['tyyppi'] in ('kirkko', 'kupolikirkko') or (m['tyyppi'] == 'pylvastemppeli' and (m['parametrit'] or {}).get('portiikki')):   # portiikki (−x) länteen
        ux, uy = math.sin(math.radians(a)), math.cos(math.radians(a))
        lx, ly = m['lansipaa']
        if ux * lx + uy * ly > 0: a = (a + 180) % 360
    return a


def osm_luku(oid):
    laji, n = oid.split('/'); n = int(n)
    assert n < 2 ** 31, oid
    return n if laji == 'way' else -n


def main(a):
    k, ulos = a[0], a[1]
    global KATTOVARI
    KATTOVARI = kattovari(k)
    SEINAVARI = seinavari(k)
    lontoo = perheen_seinat(open(os.path.join(KAUPUNKI_TYOKALU, 'katot.py'), encoding='utf-8').read(), 'lontoo')
    rgb = lambda c: (c[0] << 16) | (c[1] << 8) | c[2]
    SEINA['portland'], SEINA['tiili'] = rgb(lontoo[0][0]), rgb(lontoo[-1][0])
    mpolku = a[a.index('--merkit') + 1] if '--merkit' in a else os.path.join(TY, 'tulos', f'merkit-{k}.json')
    moduulit = a[a.index('--moduulit') + 1] if '--moduulit' in a else MAASTO_OLETUS
    kaikki = json.load(open(mpolku))['merkit']
    # KOE-rivit (KK 16.11.: Rooman ja Wienin palatsit ja julkisivukirkot kokeeksi, ei peliin ennen KK:n kuvaa): vain lipulla --koe.
    sopivat = [m for m in kaikki if not m['ei_sovi'] and ('--koe' in sys.argv or not (m.get('parametrit') or {}).get('koe'))]
    ms = alueella(k, sopivat)
    ms.sort(key=lambda m: m['osm'])
    lat0, lon0 = ORIGO[k]
    WA, WF = 6378137.0, 1 / 298.257223563; WE2 = WF * (2 - WF); rad = math.pi / 180; s0 = math.sin(lat0 * rad)
    Nr = WA / math.sqrt(1 - WE2 * s0 * s0); Mr = Nr * (1 - WE2) / (1 - WE2 * s0 * s0); kx = rad * Nr * math.cos(lat0 * rad); kz = rad * Mr
    enu = lambda la, lo: ((lo - lon0) * kx, (la - lat0) * kz)

    maa_lkm = dict(pisteita=0, lahin_tunnettu=0)
    maa = None
    if k not in TASAINEN:
        sys.path.insert(0, moduulit); import maasto
        def vain_valimuisti(polku):
            t = os.path.join(maasto.VALI, polku.replace('/', '_'))
            return open(t, 'rb').read() if os.path.exists(t) else None
        maasto.hae = vain_valimuisti
        vm = {}
        def h(la, lo):
            kk = (round(la * 10000), round(lo * 10000))
            if kk not in vm:
                r = maasto.korkeus(kk[0] * 1e-4, kk[1] * 1e-4, 12)
                vm[kk] = (r[0] if isinstance(r, (tuple, list)) else r) if r else None
            return vm[kk]
        def maa(m):
            # Matalin maa pohjan keskeltä ja kulmista (rinteessä malli ei jää ilmaan; perustalot samoin pohjan matalimmasta).
            la, lo = m['keski']; ky, kx_ = 111320.0, 111320.0 * math.cos(math.radians(la))
            pts = [(la, lo)] + [(la + y / ky, lo + x / kx_) for x, y in m['pohja']]
            hs = [v for v in (h(p, q) for p, q in pts) if v is not None]
            maa_lkm['pisteita'] += 1
            return min(hs) if hs else None

    mallit, rivit, merkit_b, puuttuu, asemat = {}, [], [], [], []
    rivit.append((12, 0, 0, 0, float(KATTOVARI[0]), float(SEINAVARI[0]), 0.0, struct.pack('<f', 0.0), 0))   # palettirivi = rivi 0 (KK 09.00 A)
    for m in ms:
        x, z = enu(*m['keski'])
        if m['tyyppi'] == 'asema':
            # KK 15.11. 06.20 B: hallit pohjan sisään (hallit.py), julkisivu (−x) kohti origoa; merkki pohjan suorakaiteen keskelle.
            m['_hallit'] = hallit.laske(m, (-x, -z))
            def kat(r):
                hs, jul = hallit.pura(r['pituus'], r['leveys'], r['a'], r['b'], r['c'], r['p3_bitit'], r['varattu'], r['jatko'])
                return round(100 * hallit.kattavuus(m, r['akseli'], r['siirto'], hs, jul), 1)
            ennen = hallit.laske(m, (-x, -z), puolikkaat=False)
            x, z = x + m['_hallit']['siirto'][0], z + m['_hallit']['siirto'][1]
            asemat.append(dict(osm=m['osm'], nimi=m.get('nimi'), akseli=round(m['_hallit']['akseli'], 2), poikkeama=m['_hallit']['poikkeama'],
                               siirto=[round(v, 2) for v in m['_hallit']['siirto']], pituus=round(m['_hallit']['pituus'], 1), leveys=round(m['_hallit']['leveys'], 1),
                               halleja=m['_hallit']['halleja'], julkisivu=m['_hallit']['julkisivu'],
                               kaistat=m['_hallit']['kaistat'], hallimaara=m['_hallit']['hallimaara'],
                               katettu_pct=kat(m['_hallit']), katettu_ennen_pct=kat(ennen), kaistat_ennen=ennen['kaistat']))
        r = malli(m)
        avain = (r, m['_hallit']['jatko']) if m['tyyppi'] == 'asema' else r
        if avain not in mallit:
            mallit[avain] = len(rivit); rivit.append(r)
            if m['tyyppi'] == 'asema': rivit.append(('jatko', m['_hallit']['jatko']))   # KK 07.25: hallitavut jatkuvat seuraavalle riville (tyyppi 11)
        r = avain
        y = 0
        if maa:
            v = maa(m)
            if v is None: puuttuu.append(m['osm']); v = float('nan')
            y = v
        inst = (m['tyyppi'], m['koko']) in {('kirkko', 'pieni'), ('kirkko', 'keski'), ('kirkko', 'levea'), ('kirkko', 'basilika'), ('kirkko', 'suuri'), ('kirkko', 'julkisivu'), ('kupolikirkko', 'keski')}
        sx = m['sx'] if inst and m['sx'] else 1.0; sz = m['sz'] if inst and m['sz'] else 1.0
        if inst and m['sovitus'] == 'luonnollinen': sx = sz = m['mittakaava']
        merkit_b.append([x, z, y, mallit[r], m['_hallit']['akseli'] if m['tyyppi'] == 'asema' else akseli(m), sx, sz, osm_luku(m['osm'])])
    # Puuttuva maa (laatta ei välimuistissa): lähimmän tunnetun merkin maa.
    tunnetut = [b for b in merkit_b if not (isinstance(b[2], float) and math.isnan(b[2]))]
    for b in merkit_b:
        if isinstance(b[2], float) and math.isnan(b[2]):
            b[2] = min(tunnetut, key=lambda t: (t[0] - b[0]) ** 2 + (t[1] - b[1]) ** 2)[2]; maa_lkm['lahin_tunnettu'] += 1

    liput = 1 if maa else 0
    out = bytearray(b'MK01' + struct.pack('<HHII', len(rivit), liput, len(merkit_b), 0) + struct.pack('<dd', lat0, lon0))
    for r in rivit:
        if r[0] == 'jatko': assert len(r[1]) == 23; out += bytes([11]) + r[1]; continue
        out += struct.pack('<BBBBfff', *r[:7]) + r[7] + struct.pack('<I', r[8])
    for x, z, y, mi, ak, sx, sz, oid in merkit_b:
        out += struct.pack('<ffhHHHHHi', x, z, int(round(y / 0.25)) if maa else 0, mi, int(round(ak * 100)) % 36000,
                           int(round(sx * 1000)), int(round(sz * 1000)), 0, oid)
    assert len(out) == 32 + 24 * len(rivit) + 24 * len(merkit_b)
    os.makedirs(os.path.dirname(os.path.abspath(ulos)), exist_ok=True)
    open(ulos, 'wb').write(out)
    from collections import Counter
    tieto = dict(kaupunki=k, origo=dict(lat=lat0, lon=lon0), merkkeja=len(merkit_b), malleja=len(rivit), tavua=len(out),
                 sha256=hashlib.sha256(out).hexdigest(), maa='maasto.py z12 (pohjan matalin piste), MAA 0,25 m' if maa else 'ei (kartta tasainen: peli kuten puut)',
                 maa_laskut=maa_lkm, lahde=os.path.abspath(mpolku), lahde_sha256=hashlib.sha256(open(mpolku, 'rb').read()).hexdigest(),
                 tyypit=dict(Counter(f"{m['tyyppi']}-{m['koko']}" for m in ms)), ei_sovi_alueella=len(alueella(k, [m for m in kaikki if m['ei_sovi']])),
                 poisOsm=[m['osm'] for m in ms])
    tieto['asemat'] = asemat
    tieto['asemien_kattovari'] = {'srgb': f'#{KATTOVARI[0]:06X}', 'lahde': KATTOVARI[1]}
    tieto['paletti'] = {'katto': f'#{KATTOVARI[0]:06X}', 'katto_lahde': KATTOVARI[1], 'seina': f'#{SEINAVARI[0]:06X}', 'seina_lahde': SEINAVARI[1],
                        'palatsin_seinat': {n: f'#{v:06X}' for n, v in SEINA.items() if n}}
    json.dump(tieto, open(os.path.join(TY, 'tulos', f'vienti-{k}.json'), 'w'), ensure_ascii=False, indent=1)
    print(k, {a_: b for a_, b in tieto.items() if a_ != 'poisOsm'})


if __name__ == '__main__':
    main(sys.argv[1:])
