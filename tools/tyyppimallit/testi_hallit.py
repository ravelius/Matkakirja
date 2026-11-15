"""TESTI (KK 15.11. 06.20 päätös B): naapuritalot asemahallien ja julkisivun alla, jokaiselle kaupunkiriville.

python3 -I testi_hallit.py [--vanha <pariisi.bytes> <lontoo.bytes>] [--ulos tulos/testi-hallit.json]

Geometria pelin purusta: hallit.pura() (kaistat ja julkisivu mallin kehyksessä) + merkin x z ja akseli MK01-tiedostosta (vie.py:n tulos/vienti/).
Talot: Pariisi natiiviseppa/pariisi-talot/osm.json, Lontoo pelikoodari/lontoo/osm-d6/osm.json; pois aseman oma talo ja koko poisOsm
(vienti-<k>.json). Näytteet 2 m (kuten ylitys.py): ala = näytteitä hallien tai julkisivun alla × 4 m². Näyte, joka on aseman OMAN OSM-pohjan
sisällä, ei ole naapuri (aseman sisäiset OSM-rakennukset: maanalaiset liikkeet, kävelysilta; ne raportoidaan erikseen 'sisalla').
Syvyys = näytteen etäisyys mallin reunasta sisäänpäin. Läpäisy: jokaisella asemalla ala ≤ TOLERANSSI ja syvyys ≤ SYVYYS (reunakosketus:
pohjan 0,1 m:n pyöristys, 1 m:n rasteri, u8-kvantisointi L/255).
--vanha: sama mittaus vanhan mallin geometriasta (x = −16 … L − 16, kellopääty −17,5, z ±W/2, julkisivu ±(W/2 + 2); akseli ja paikka vanhasta tiedostosta).
"""
import json, math, os, struct, sys
TY = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, TY)
import hallit

TALOT = {'pariisi': '/Users/Shared/Claude/proto-3d/_tyo/natiiviseppa/pariisi-talot/osm.json',
         'lontoo': '/Users/Shared/Claude/proto-3d/_tyo/pelikoodari/lontoo/osm-d6/osm.json'}
TOLERANSSI = 30.0   # m² / asema (reunakosketus)
SYVYYS = 0.5        # m
ASKEL = 2.0


def lue(polku):
    d = open(polku, 'rb').read()
    nm, _, nk = struct.unpack_from('<HHI', d, 4); lat0, lon0 = struct.unpack_from('<dd', d, 16)
    rivit = [struct.unpack_from('<BBBBffffI', d, 32 + 24 * i) + (struct.unpack_from('<I', d, 32 + 24 * i + 16)[0],) for i in range(nm)]
    o = 32 + 24 * nm; merkit = []
    for i in range(nk):
        x, z, _, mi, ak, _, _, _, osm = struct.unpack_from('<ffhHHHHHi', d, o + 24 * i)
        merkit.append(dict(x=x, z=z, rivi=rivit[mi], akseli=ak / 100.0, osm=('way/%d' % osm) if osm > 0 else ('relation/%d' % -osm)))
    return lat0, lon0, merkit


def enu_f(lat0, lon0):
    WA, WF = 6378137.0, 1 / 298.257223563; WE2 = WF * (2 - WF); rad = math.pi / 180; s0 = math.sin(lat0 * rad)
    Nr = WA / math.sqrt(1 - WE2 * s0 * s0); Mr = Nr * (1 - WE2) / (1 - WE2 * s0 * s0); kx = rad * Nr * math.cos(lat0 * rad); kz = rad * Mr
    return lambda la, lo: ((lo - lon0) * kx, (la - lat0) * kz)


def laatikot(rivi, vanha):
    t, a, b, c, L, W, p2, p3f, va, p3 = rivi
    if vanha:
        return [(-17.5, L - 16, -W / 2, W / 2), (-17.5, 0.0, -W / 2 - 2, W / 2 + 2)]
    hs, jul = hallit.pura(L, W, a, b, c, p3, va)
    q = [(x0, x1, z0, z1) for z0, z1, x0, x1, _ in hs]
    if jul: q.append(jul)
    return q


def sis(pt, r):
    x, y = pt; cc = False
    for i in range(len(r)):
        x1, y1 = r[i]; x2, y2 = r[i - 1]
        if (y1 > y) != (y2 > y) and x < (x2 - x1) * (y - y1) / (y2 - y1) + x1: cc = not cc
    return cc


def mittaa(k, bytes_polku, vanha=False):
    lat0, lon0, merkit = lue(bytes_polku)
    enu = enu_f(lat0, lon0)
    pois = set(json.load(open(os.path.join(TY, 'tulos', f'vienti-{k}.json')))['poisOsm'])
    d = json.load(open(TALOT[k]))
    talot = []
    for e in d['ways'] + d['rel']:
        rr = [e['p']] if 'p' in e else [j['p'] for j in e.get('j', []) if j.get('rooli') != 'inner']
        rr = [[enu(p[0], p[1]) for p in r] for r in rr if r]
        if rr: talot.append((e['osm'], rr))
    oma = {o: rr for o, rr in talot}
    tulos = []
    for m in merkit:
        if m['rivi'][0] != 7: continue
        q = laatikot(m['rivi'], vanha)
        omat = oma.get(m['osm'], [])
        sisalla, syv = {}, 0.0
        R = max(math.hypot(max(abs(a), abs(b)), max(abs(c), abs(d_))) for a, b, c, d_ in q) + 5
        ala, rivit = 0.0, []
        for o, rr in talot:
            if o == m['osm'] or o in pois: continue
            xs = [p[0] for r in rr for p in r]; ys = [p[1] for r in rr for p in r]
            if min(xs) > m['x'] + R or max(xs) < m['x'] - R or min(ys) > m['z'] + R or max(ys) < m['z'] - R: continue
            n = 0
            x = math.floor(min(xs) / ASKEL) * ASKEL + ASKEL / 2
            while x <= max(xs):
                y = math.floor(min(ys) / ASKEL) * ASKEL + ASKEL / 2
                while y <= max(ys):
                    if any(sis((x, y), r) for r in rr):
                        px, pz = hallit.paikallinen(m['akseli'], x - m['x'], y - m['z'])
                        sy = max((min(px - a, b - px, pz - c, d_ - pz) for a, b, c, d_ in q if a <= px <= b and c <= pz <= d_), default=None)
                        if sy is not None:
                            if any(sis((x, y), r) for r in omat): sisalla[o] = sisalla.get(o, 0) + ASKEL * ASKEL
                            else: n += 1; syv = max(syv, sy)
                    y += ASKEL
                x += ASKEL
            if n: rivit.append((o, n * ASKEL * ASKEL)); ala += n * ASKEL * ASKEL
        tulos.append(dict(osm=m['osm'], ala=ala, syvyys=round(syv, 2), talot=sorted(rivit, key=lambda r: -r[1])[:5], sisalla=sisalla))
    return tulos


def main(a):
    ulos = a[a.index('--ulos') + 1] if '--ulos' in a else os.path.join(TY, 'tulos', 'testi-hallit.json')
    vanhat = dict(zip(('pariisi', 'lontoo'), a[a.index('--vanha') + 1:a.index('--vanha') + 3])) if '--vanha' in a else {}
    kaikki, ok = {}, True
    for k in ('pariisi', 'lontoo'):
        nimet = {s['osm']: s.get('nimi') for s in json.load(open(os.path.join(TY, 'tulos', f'vienti-{k}.json')))['asemat']}
        uusi = mittaa(k, os.path.join(TY, 'tulos', 'vienti', f'merkit-{k}-kartta.bytes'))
        vanha = {t['osm']: t for t in mittaa(k, vanhat[k], True)} if k in vanhat else {}
        for t in uusi:
            t['nimi'] = nimet.get(t['osm']); t['vanha_ala'] = vanha.get(t['osm'], {}).get('ala')
            hyva = t['ala'] <= TOLERANSSI and t['syvyys'] <= SYVYYS; ok &= hyva
            print(f"{'OK ' if hyva else 'YLI'} {k:8s} {t['osm']:18s} {str(t['nimi'] or '')[:30]:30s} uusi {t['ala']:5.0f} m² (syvyys {t['syvyys']:.2f} m)"
                  f"   vanha {t['vanha_ala'] if t['vanha_ala'] is not None else '-':>6} m²   {t['talot'][:2]}  sisällä {t['sisalla'] or '-'}")
        kaikki[k] = uusi
    json.dump(dict(toleranssi_m2=TOLERANSSI, syvyys_m=SYVYYS, askel_m=ASKEL, kaupungit=kaikki), open(ulos, 'w'), ensure_ascii=False, indent=1)
    print('LÄPI' if ok else 'EI LÄPI', f'(toleranssi {TOLERANSSI} m² ja {SYVYYS} m / asema)')
    return 0 if ok else 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
