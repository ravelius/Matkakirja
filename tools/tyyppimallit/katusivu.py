"""Käsitaulun tuki (Valoseppä 17.11.): lähteiden nimeämän kadun/aukion OSM-pisteet (muut.json.gz) → mallin sivu ja ilmansuunta.
Käyttö: python3 -I katusivu.py <kaupunki> <osm> "<kadun nimen osa>" ..."""
import gzip, json, math, sys
TY = '/Users/Shared/Claude/proto-3d/_tyo/valoseppa/tyyppitalot'
SUUNTA = ['pohjoinen', 'koillinen', 'itä', 'kaakko', 'etelä', 'lounas', 'länsi', 'luode']
def ilma(atsi, sivu): return SUUNTA[int(((atsi + {'+x': 0, '-x': 180, '+z': -90, '-z': 90}[sivu]) % 360 + 22.5) // 45) % 8]
k = sys.argv[1]; d = json.load(open(f'{TY}/koe-rw/{k}/merkit-{k}.json')); M = {m['osm']: m for m in d['merkit']}
muut = json.load(gzip.open(d['lahde'] + '/muut.json.gz'))
pyynnot = list(zip(sys.argv[2::2], sys.argv[3::2]))
for oid, nimi in pyynnot:
    m = M[oid]; la0, lo0 = m['keski']; atsi = m['akseli']; pit, lev = m['pituus'], m['leveys']
    ux, uy = math.sin(math.radians(atsi)), math.cos(math.radians(atsi)); kx = 111320 * math.cos(math.radians(la0))
    paino = {}
    for w in muut['ways'] + muut['rel']:
        t = w.get('t', {})
        if nimi.lower() not in t.get('name', '').lower(): continue
        if not (t.get('highway') or t.get('place') or t.get('area:highway')): continue   # vain katu tai aukio (ei associatedStreet-relaatioita)
        rr = [w['p']] if 'p' in w else [j['p'] for j in w.get('j', [])]
        for r in rr:
            tihea = [r[0]]   # 2 m:n välein: harvat kärkipisteet eivät jätä sivun edustaa tyhjäksi (Herrengasse)
            for (la1, lo1), (la2, lo2) in zip(r, r[1:]):
                n = max(1, int(math.hypot((lo2 - lo1) * kx, (la2 - la1) * 111320) / 2))
                tihea += [(la1 + (la2 - la1) * i / n, lo1 + (lo2 - lo1) * i / n) for i in range(1, n + 1)]
            for la, lo in tihea:
                ex, ny = (lo - lo0) * kx, (la - la0) * 111320
                x, z = ex * ux + ny * uy, -ex * uy + ny * ux
                dx, dz = abs(x) - pit / 2, abs(z) - lev / 2
                # vain sivun edessä olevat pisteet (projektio sivun sisällä): kulman ohi jatkuva katu ei äänestä
                if dx > 0 and dz <= 0: s, etais = ('+x' if x > 0 else '-x'), dx
                elif dz > 0 and dx <= 0: s, etais = ('+z' if z > 0 else '-z'), dz
                else: continue
                if etais > 60: continue
                paino[s] = paino.get(s, 0) + 1 / max(etais, 5)
    tot = sum(paino.values()) or 1
    jak = ', '.join(f'{s} {ilma(atsi, s)} {v / tot:.0%}' for s, v in sorted(paino.items(), key=lambda t: -t[1]))
    print(f"{oid} {m['nimi']} ← '{nimi}': {jak or 'EI OSUMIA'}")
