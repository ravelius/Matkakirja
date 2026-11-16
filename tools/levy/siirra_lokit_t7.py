"""Siirto: proto-3d/lokit-kansiot, joihin ei ole koskettu RAJA_H tuntiin, T7:lle linkillä (kuten siirra_t7.py).

Käyttö: python3 -I tools/levy/siirra_lokit_t7.py [--aja] [--kaikki] [--raja-h 3] [etuliite ...]
  --kaikki   kaikki kansiot (ei vain etuliitteet); ilman sitä oletusetuliitteet tai annetut etuliitteet.
JU 14.11.2026 (PT 21.0x, KK: tilaa siirtämällä, ajoja ei pysäytetä): siirto vasta kun kopion tiedostomäärä, tavumäärä ja
sha256-summat täsmäävät; sitten lähde pois ja linkki tilalle. Ohitetaan kansiot, joiden nimi (tai nimen alku ennen viimeistä
'-osaa') esiintyy ajossa olevan jono-*.zsh-skriptin tekstissä. Jos poisto estyy (Operation not permitted), lähde jää,
linkkiä ei tehdä ja rivi ESTO tulostetaan (ei kierretä).
"""
import os, sys, time, shutil, subprocess, hashlib

L = '/Users/Shared/Claude/proto-3d/lokit'
T7 = '/Volumes/T7 4TB/koodaus/proto-lokit-arkisto'
TYOKALUT = '/Users/Shared/Claude/julkaisija-tyokalut'
OLETUS = ('todistus-kierros-vaaka-216-', 'esikatselu-2026103', 'esikatselu-20261101-0', 'pari-k06z')
args = sys.argv[1:]
aja = '--aja' in args
kaikki = '--kaikki' in args
raja_h = 2.0
if '--raja-h' in args:
    raja_h = float(args[args.index('--raja-h') + 1])
annetut = tuple(a for i, a in enumerate(args) if not a.startswith('--') and (i == 0 or args[i - 1] != '--raja-h'))
ETULIITTEET = annetut or OLETUS
RAJA = time.time() - raja_h * 3600


def ajossa_teksti():
    """Ajossa olevien jono-*.zsh-skriptien teksti (ps: 'zsh jono-x.zsh')."""
    out = subprocess.run(['ps', '-axo', 'command'], capture_output=True, text=True).stdout
    t = []
    for r in out.splitlines():
        for s in r.split():
            if s.startswith('jono-') and s.endswith('.zsh'):
                try:
                    t.append(open(os.path.join(TYOKALUT, os.path.basename(s)), encoding='utf-8', errors='replace').read())
                except OSError:
                    pass
    return '\n'.join(t)


def uusin(p):
    m = os.lstat(p).st_mtime
    for j, ks, ts in os.walk(p):
        for n in ks + ts:
            try:
                m = max(m, os.lstat(os.path.join(j, n)).st_mtime)
            except OSError:
                pass
    return m


def luettelo(juuri):
    """{suhteellinen polku: (koko, sha256)} tavallisille tiedostoille, linkit: ('L', kohde)."""
    d = {}
    for j, ks, ts in os.walk(juuri):
        for n in ks + ts:
            p = os.path.join(j, n)
            r = os.path.relpath(p, juuri)
            if os.path.islink(p):
                d[r] = ('L', os.readlink(p))
            elif os.path.isfile(p):
                h = hashlib.sha256()
                with open(p, 'rb') as f:
                    for k in iter(lambda: f.read(1 << 20), b''):
                        h.update(k)
                d[r] = (os.path.getsize(p), h.hexdigest())
    return d


teksti = ajossa_teksti()
yht = siirretty = 0
for n in sorted(os.listdir(L)):
    p = os.path.join(L, n)
    if os.path.islink(p) or not os.path.isdir(p) or not (kaikki or n.startswith(ETULIITTEET)):
        continue
    alku = n.rsplit('-', 1)[0]
    if n in teksti or (len(alku) >= 12 and alku in teksti):
        print('KETJUSSA', n)
        continue
    if uusin(p) > RAJA:
        print('TUORE', n)
        continue
    koko = int(subprocess.run(['du', '-xsk', p], capture_output=True, text=True).stdout.split()[0])
    k = os.path.join(T7, n)
    if os.path.exists(k):
        print('KOHDE OLEMASSA, ohitan', n)
        continue
    yht += koko
    print(('SIIRRAN ' if aja else 'SIIRTYISI ') + n, round(koko / 1048576, 3), 'G', flush=True)
    if not aja:
        continue
    shutil.copytree(p, k, symlinks=True)
    a, b = luettelo(p), luettelo(k)
    if a != b:
        print('VIKA tarkistus ei täsmää, lähde jää:', n, len(a), len(b), flush=True)
        continue
    try:
        shutil.rmtree(p)
    except OSError as e:
        print('ESTO poisto', n, e, '(lähde jää osittain, linkkiä ei tehty)', flush=True)
        continue
    os.symlink(k, p)
    siirretty += koko
print('YHT', round(yht / 1048576, 2), 'G', 'ajettu, siirretty', round(siirretty / 1048576, 2), 'G' if aja else 'koe')
