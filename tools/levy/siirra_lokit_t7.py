"""Kertasiirto: proto-3d/lokit-kansiot, joihin ei ole koskettu 2 h:iin, T7:lle linkillä (kuten siirra_t7.py)."""
import os, sys, time, shutil, subprocess
L = '/Users/Shared/Claude/proto-3d/lokit'
T7 = '/Volumes/T7 4TB/koodaus/proto-lokit-arkisto'
ETULIITTEET = ('todistus-kierros-vaaka-216-', 'esikatselu-2026103', 'esikatselu-20261101-0', 'pari-k06z')
RAJA = time.time() - 2 * 3600
aja = '--aja' in sys.argv


def uusin(p):
    m = os.lstat(p).st_mtime
    for j, ks, ts in os.walk(p):
        for n in ks + ts:
            try:
                m = max(m, os.lstat(os.path.join(j, n)).st_mtime)
            except OSError:
                pass
    return m


yht = 0
for n in sorted(os.listdir(L)):
    p = os.path.join(L, n)
    if os.path.islink(p) or not os.path.isdir(p) or not n.startswith(ETULIITTEET):
        continue
    if uusin(p) > RAJA:
        print('TUORE', n)
        continue
    koko = int(subprocess.run(['du', '-xsk', p], capture_output=True, text=True).stdout.split()[0])
    yht += koko
    k = os.path.join(T7, n)
    if os.path.exists(k):
        print('KOHDE OLEMASSA, ohitan', n)
        continue
    print(('SIIRRAN ' if aja else 'SIIRTYISI ') + n, round(koko / 1048576, 2), 'G')
    if aja:
        shutil.copytree(p, k, symlinks=True)
        shutil.rmtree(p)
        os.symlink(k, p)
print('YHT', round(yht / 1048576, 1), 'G', 'ajettu' if aja else 'koe')
