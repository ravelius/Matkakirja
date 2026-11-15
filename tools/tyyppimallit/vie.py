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
                    (KK 15.11. 06.20 päätös B; hallit.py): a = halleja (bitit 0–2) | julkisivukaistat << 3; kaistan k alku ja loppu u8:na tavuissa
                    T[2k], T[2k+1], T = [b, c, p3:n 4 RAAKAA tavua, varattu-kentän 4 tavua] (LE); x = −L/2 + q · L/255, kaista mukana jos loppu > alku.
                    Mallin keskipiste = pohjan suorakaiteen keskipiste kulman kehyksessä (merkin x z siirretty), akseli = hallien akseli (julkisivu −x
                    kohti origoa). Kaikki tavut 0 = vanha malli (peli TyyppiAsema).
            8 kirkko-levea, 9 kirkko-basilika (a b c kuten 2; KK 15.11. 00.28 ja 01.14)
            10 kirkko-julkisivu (tornitön, KK 15.11.; a = kupoli 0/1: peli piirtää kupolin lisäosana tasaisella min(sx, sz); vain nimilistalta)
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
# Seinävärit (KS 15.11. 01.4x, katot.py PERHEET['lontoo'].seinat): Portland-kivi = 'lontoo'-stukko, punatiili; LUONNOS (KK päättää pelikuvista).
SEINA = {None: 0, 'portland': 0xE4DCCA, 'tiili': 0xAC7862}
# Asemahallien kattoväri (KK 15.11. 05.22): kaupungin talokattojen perusväri SAMASTA LÄHTEESTÄ kuin talopalat. Kaupunkirivin katot.paletti
# (kaupungit-talot.json): vaihtelu-perhe → paletti → KATTO, kustakin suurimman osuuden sävy (KK 15.11. 05.26). Testi: testi_kattovari.py.
KATTOVARI = (0, '-')
KAUPUNKI_TYOKALU = '/Users/Shared/Claude/wt/proto-karttaseppa-tyokalu1/tyokalut/kaupunki'
TEE_PALAT = '/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/tee-palat.py'


def perheen_katot(lahde, perhe):
    """katot.py:n PERHEET[perhe]['katot'] (lista ((r, g, b), osuus)) lähdetekstistä."""
    import ast, re
    lohko = lahde[lahde.index('PERHEET = {'):]
    lohko = lohko[lohko.index(f"'{perhe}': dict("):]
    return ast.literal_eval(re.search(r'katot=(\[[^\]]*\])', lohko).group(1))


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
    perhe = (katot.get('vaihtelu') or {}).get('perhe')
    if perhe: return suurin(perheen_katot(lahde, perhe), f"katot.py PERHEET['{perhe}'].katot")
    paletti = katot.get('paletti')
    if paletti:
        nimi = {'k2b': 'PALETTI_K2B', 'k2': 'PALETTI_K2'}[paletti]
        return suurin(ast.literal_eval(re.search(rf'^{nimi} = (\[.*\])$', lahde, re.M).group(1)), f'katot.py {nimi}')
    r, g, b = ast.literal_eval(re.search(r'KATTO=(\([0-9, ]+\))', open(TEE_PALAT, encoding='utf-8').read()).group(1))
    return (r << 16) | (g << 8) | b, 'tee-palat.py KATTO'



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
    mpolku = a[a.index('--merkit') + 1] if '--merkit' in a else os.path.join(TY, 'tulos', f'merkit-{k}.json')
    moduulit = a[a.index('--moduulit') + 1] if '--moduulit' in a else MAASTO_OLETUS
    kaikki = json.load(open(mpolku))['merkit']
    sopivat = [m for m in kaikki if not m['ei_sovi']]
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
    for m in ms:
        x, z = enu(*m['keski'])
        if m['tyyppi'] == 'asema':
            # KK 15.11. 06.20 B: hallit pohjan sisään (hallit.py), julkisivu (−x) kohti origoa; merkki pohjan suorakaiteen keskelle.
            m['_hallit'] = hallit.laske(m, (-x, -z))
            x, z = x + m['_hallit']['siirto'][0], z + m['_hallit']['siirto'][1]
            asemat.append(dict(osm=m['osm'], nimi=m.get('nimi'), akseli=round(m['_hallit']['akseli'], 2), poikkeama=m['_hallit']['poikkeama'],
                               siirto=[round(v, 2) for v in m['_hallit']['siirto']], pituus=round(m['_hallit']['pituus'], 1), leveys=round(m['_hallit']['leveys'], 1),
                               halleja=m['_hallit']['halleja'], julkisivu=m['_hallit']['julkisivu'],
                               kaistat=[None if a_ is None else [round(a_, 1), round(b_, 1)] for a_, b_ in zip(m['_hallit']['alku'], m['_hallit']['loppu'])]))
        r = malli(m)
        if r not in mallit: mallit[r] = len(rivit); rivit.append(r)
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
    for r in rivit: out += struct.pack('<BBBBfff', *r[:7]) + r[7] + struct.pack('<I', r[8])
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
    json.dump(tieto, open(os.path.join(TY, 'tulos', f'vienti-{k}.json'), 'w'), ensure_ascii=False, indent=1)
    print(k, {a_: b for a_, b in tieto.items() if a_ != 'poisOsm'})


if __name__ == '__main__':
    main(sys.argv[1:])
