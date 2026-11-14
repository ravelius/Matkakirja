"""Tyyppimallit peliin (KK 15.11. 00.16 kohdat 1 ja 3): merkit-<k>.json → Resources/Elava/merkit-<k>-kartta.bytes + tulos/vienti-<k>.json (poisOsm-lista).

python3 -I vie.py <kaupunki> <ulos.bytes> [--merkit tulos/merkit-<k>.json] [--moduulit <maasto.py:n kansio>]

1) VAIN TALOJEN ALUEELTA: kaupunkitaulun raja (taulu-uusi.json) ja Pariisissa lisäksi talolähde (natiiviseppa/pariisi-talot/osm.json),
   kuten budjetti.py (tulos/budjetti-alueella-<k>.json). Tiedosto ja poisOsm syntyvät samasta listasta (vienti-<k>.json 'poisOsm').
2) Ei sovi (merkit-<k>.json 'ei_sovi', esim. venytys 0,6–1,6) = perustalo jää, ei tiedostoon eikä poisOsm:iin.

TIEDOSTO MK01 (little-endian; luku ja testit: pelin Ydin/Elava/MerkkiTiedosto.cs):
  otsake 32 t:  "MK01" | u16 malleja | u16 liput (bit 0 = maa merkeissä) | u32 merkkejä | u32 varattu | f64 origo lat | f64 origo lon
  malli 24 t:   u8 tyyppi | u8 a | u8 b | u8 c | f32 p0 | f32 p1 | f32 p2 | f32 p3 | u32 varattu
     tyyppi 1 kirkko-pieni, 2 kirkko-keski (a = torni_paikka 0 länsi / 1 risteys, b = torneja, c = huippu 0 pyramidi / 1 neula / 2 tasakatto),
            3 kirkko-suuri, 4 kupolikirkko (a = pylväspääty 0/1), 5 pylvästemppeli (p0 pituus, p1 leveys, a = päädyn pylväät, b = harja 0/1),
            6 palatsi-piha (p0 pituus, p1 leveys, a = julkisivun sivu, b = avoin sivu; sivu 0 ei, 1 +x, 2 −x, 3 +z, 4 −z),
            7 asema (a = halleja, p0 pituus, p1 leveys)
     Tyypit 1–4 ovat jaettuja verkkoja (instanssi, venytys sx sz); 5–7 rakennetaan pohjan mitoista (sx = sz = 1) ja leivotaan yhdeksi verkoksi.
  merkki 24 t:  f32 x | f32 z (m origosta itään ja pohjoiseen, WGS84-ENU kuten kartta_puut.py) | i16 maa (0,25 m, maasto.py z12; 0 jos ei maata)
                | u16 malli | u16 akseli (0,01°, mallin +x:n atsimuutti pohjoisesta myötäpäivään; kirkoissa +x = kuori, torni länsipäähän)
                | u16 sx | u16 sz (×0,001) | u16 varattu | i32 osm (way > 0, relation < 0)
"""
import json, math, os, struct, sys, hashlib

TY = os.path.dirname(os.path.abspath(__file__))
TAULU = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/vaihtelu-20261114/taulu-uusi.json'
PARIISI_TALOT = '/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/osm.json'
MAASTO_OLETUS = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/lontoo-kumpu/palat-rakennus'
# Origo = pelin kaupungit.json "puut" (lat, lon): kartan elämän juuri on tässä (KartanElama). Lontoo: karttaseppa/puut-lontoo (7c618a16e).
ORIGO = {'pariisi': (48.86122, 2.35092), 'lontoo': (51.49754, -0.12574)}
# Kartta tasainen (puiden tiedostossa ei MAA1:tä): peli laskee maan itse kuten puille (PuunMaa). Muualla maa merkkiin.
TASAINEN = {'pariisi'}
TYYPPI = {('kirkko', 'pieni'): 1, ('kirkko', 'keski'): 2, ('kirkko', 'suuri'): 3, ('kupolikirkko', 'keski'): 4, ('pylvastemppeli', 'keski'): 5,
          ('palatsi', 'keski'): 6, ('asema', 'suuri'): 7}
SIVU = {None: 0, '': 0, '+x': 1, '-x': 2, '+z': 3, '-z': 4}
PAIKKA = {'lansi': 0, 'risteys': 1}
HUIPPU = {'pyramidi': 0, 'neula': 1, 'tasakatto': 2}


def alueella(k, merkit):
    t = json.load(open(TAULU)); la0, la1, lo0, lo1 = t[k]['raja']
    pid = None
    if k == 'pariisi':
        o = json.load(open(PARIISI_TALOT)); pid = {w['osm'] for w in o['ways']} | {w['osm'] for w in o['rel']}
    return [m for m in merkit if la0 <= m['keski'][0] <= la1 and lo0 <= m['keski'][1] <= lo1 and (pid is None or m['osm'] in pid)]


def malli(m):
    """(avain, rivi): sama avain = sama verkko."""
    t, k, p = m['tyyppi'], m['koko'], m['parametrit'] or {}
    ty = TYYPPI[(t, k)]
    if t == 'kirkko' and k != 'suuri':
        return (ty, PAIKKA[m['torni_paikka']], m['torneja'], HUIPPU[m['huippu']], 0.0, 0.0, 0.0, 0.0)
    if t == 'kirkko': return (ty, 0, 0, 0, 0.0, 0.0, 0.0, 0.0)
    if t == 'kupolikirkko': return (ty, 0 if p.get('pylvaspaaty') is False else 1, 0, 0, 0.0, 0.0, 0.0, 0.0)
    if t == 'pylvastemppeli':
        attika = p.get('katto') == 'attika'
        return (ty, 10 if attika else 8, 0 if attika else 1, 0, float(m['pituus']), float(m['leveys']), 0.0, 0.0)
    if t == 'palatsi':
        return (ty, SIVU[p.get('julkisivu') or '+z'], SIVU[p.get('avoin_sivu') or ''], 0, float(m['pituus']), float(m['leveys']), 0.0, 0.0)
    if t == 'asema': return (ty, int(p['halleja']), 0, 0, float(m['pituus']), float(m['leveys']), 0.0, 0.0)
    raise ValueError(t)


def akseli(m):
    """Mallin +x:n atsimuutti. Kirkoissa +x = kuori (itäpää): jos länsipää on akselin suuntaan, käännetään 180°."""
    a = m['akseli'] % 360
    if m['tyyppi'] in ('kirkko', 'kupolikirkko'):
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

    mallit, rivit, merkit_b, puuttuu = {}, [], [], []
    for m in ms:
        r = malli(m)
        if r not in mallit: mallit[r] = len(rivit); rivit.append(r)
        x, z = enu(*m['keski'])
        y = 0
        if maa:
            v = maa(m)
            if v is None: puuttuu.append(m['osm']); v = float('nan')
            y = v
        inst = (m['tyyppi'], m['koko']) in {('kirkko', 'pieni'), ('kirkko', 'keski'), ('kirkko', 'suuri'), ('kupolikirkko', 'keski')}
        sx = m['sx'] if inst and m['sx'] else 1.0; sz = m['sz'] if inst and m['sz'] else 1.0
        if inst and m['sovitus'] == 'luonnollinen': sx = sz = m['mittakaava']
        merkit_b.append([x, z, y, mallit[r], akseli(m), sx, sz, osm_luku(m['osm'])])
    # Puuttuva maa (laatta ei välimuistissa): lähimmän tunnetun merkin maa.
    tunnetut = [b for b in merkit_b if not (isinstance(b[2], float) and math.isnan(b[2]))]
    for b in merkit_b:
        if isinstance(b[2], float) and math.isnan(b[2]):
            b[2] = min(tunnetut, key=lambda t: (t[0] - b[0]) ** 2 + (t[1] - b[1]) ** 2)[2]; maa_lkm['lahin_tunnettu'] += 1

    liput = 1 if maa else 0
    out = bytearray(b'MK01' + struct.pack('<HHII', len(rivit), liput, len(merkit_b), 0) + struct.pack('<dd', lat0, lon0))
    for r in rivit: out += struct.pack('<BBBBffffI', *r, 0)
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
    json.dump(tieto, open(os.path.join(TY, 'tulos', f'vienti-{k}.json'), 'w'), ensure_ascii=False, indent=1)
    print(k, {a_: b for a_, b in tieto.items() if a_ != 'poisOsm'})


if __name__ == '__main__':
    main(sys.argv[1:])
