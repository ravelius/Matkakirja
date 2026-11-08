#!/opt/homebrew/bin/python3
# MERENPOHJA 3D (KS 8.11.2026, PT:n erä, suunnitelmat/20261108-merenpohja-3d.md osa 1).
# Kohokartan oma korkeuskenttä 15":ssa samasta aineistosta ja samalla säännöllä kuin v6-värit (bake-maailma.py):
#   z = where(GLO > 1e-3, GLO, min(ETOPO15, 0)); |z| < 1e-3 → 0
#   syvyys = max(−z, 0) silotetaan kuten värissä (--meri-pohja-km 6): Mercator-z8:n km(6) = 9,81 px,
#   joka 15":n hilassa on pituussuunnassa 12,93 px ja leveyssuunnassa 12,93·cos(lat) px (rivikohtainen Gauss).
#   h = where(z > 0, z, −silotettu syvyys). Kaikki alle 0 m (myös Kuollutmeri, polderit) on "merta" tässä kentässä;
#   värissä vain iso yhtenäinen z ≤ 0 -alue on merta (ero vain pienillä painanteilla, näkyy PT:n parissa).
#   Ei puristusta (3D:ssä maakaan ei puristu); liioittelu tehdään varjostimessa (kerroin 15).
# Ulos: int16 (arvo = round(h·2), 0,5 m), rivi 0 = 90 N (pikselin yläreuna), sarake 0 = 180 W, ja pyramidi
# kertoimin 2,4,…,64 (2×2-keskiarvo) sekä 192, 576 (3×3). Metatiedot <ulos>.json (raakahila.mjs lukee).
import json, math, os, sys, time
import numpy as np
from scipy.ndimage import gaussian_filter1d
R = '/Users/Shared/Claude/proto-3d/_tyo/karttaseppa-kohokartta-raaka'
GLO = f'{R}/maailma-glo15.f32'
ETO = f'{R}/maailma-etopo15.f32'
ULOS = sys.argv[1] if len(sys.argv) > 1 else f'{R}/maailma-3d15'
RIV, SAR = 43200, 86400
RES = 1 / 240
SIG = 9.81 * (360 / 65536) / RES   # 12,93 px
B = 960                             # kaistan ydinrivit (jaollinen 64:llä)
REUNA = 64                          # 4·σ ≥ 52
t0 = time.time()
def loki(*s): print(round(time.time() - t0), *s, flush=True)
g = np.memmap(GLO, dtype='<f4', mode='r', shape=(RIV, SAR))
e = np.memmap(ETO, dtype='<f4', mode='r', shape=(RIV, SAR))
TASOT = [1, 2, 4, 8, 16, 32, 64]
ulos = {k: np.memmap(f'{ULOS}-L{k}.i16', dtype='<i2', mode='w+', shape=(RIV // k, SAR // k)) for k in TASOT}
jak = lambda v, k: v.reshape(v.shape[0] // k, k, v.shape[1] // k, k).mean(axis=(1, 3))
def syvyys(r0, r1):
    gz = np.asarray(g[r0:r1]); ez = np.asarray(e[r0:r1])
    z = np.where(gz > 1e-3, gz, np.minimum(ez, 0)).astype(np.float32)
    z[np.abs(z) < 1e-3] = 0
    return z
hmin, hmax = 1e9, -1e9
for k0 in range(0, RIV, B):
    a0, a1 = max(0, k0 - REUNA), min(RIV, k0 + B + REUNA)
    z = syvyys(a0, a1)
    s = gaussian_filter1d(np.maximum(-z, 0), SIG, axis=1, mode='wrap', truncate=4.0)
    ydin = z[k0 - a0:k0 - a0 + B]
    out = np.empty((B, SAR), np.float32)
    for i in range(B):
        r = k0 + i
        lat = 90 - (r + 0.5) * RES
        sg = max(0.3, SIG * math.cos(math.radians(lat)))
        L = int(math.ceil(4 * sg))
        idx = np.clip(np.arange(r - L, r + L + 1), 0, RIV - 1) - a0
        w = np.exp(-0.5 * (np.arange(-L, L + 1) / sg) ** 2); w /= w.sum()
        out[i] = np.tensordot(w.astype(np.float32), s[idx], axes=(0, 0))
    h = np.where(ydin > 0, ydin, -out).astype(np.float32)
    del s, out, z
    hmin = min(hmin, float(h.min())); hmax = max(hmax, float(h.max()))
    for k in TASOT:
        v = h if k == 1 else jak(h, k)
        ulos[k][k0 // k:(k0 + B) // k] = np.clip(np.round(v * 2), -32768, 32767).astype('<i2')
    loki('kaista', k0, 'min', round(float(h.min())), 'max', round(float(h.max())))
for m in ulos.values(): m.flush()
# 3×3-tasot L192 ja L576 L64:stä
v = np.asarray(ulos[64]).astype(np.float32) / 2
for k in (192, 576):
    v = jak(v, 3)
    np.clip(np.round(v * 2), -32768, 32767).astype('<i2').tofile(f'{ULOS}-L{k}.i16')
meta = {
    'kuvaus': 'Kohokartan 3D-korkeus 15": maa Copernicus GLO-90 (> 0 m), muualla min(0, NOAA ETOPO 2022 15"), syvyys silotettu 6 km (v6:n säännöllä)',
    'latN': 90, 'lonW': -180, 'res': RES, 'rivit': RIV, 'sarakkeet': SAR, 'arvo': 'int16, metriä = arvo / 2', 'kierto': True,
    'tasot': [{'kerroin': k, 'polku': os.path.basename(f'{ULOS}-L{k}.i16'), 'rivit': RIV // k, 'sarakkeet': SAR // k} for k in TASOT + [192, 576]],
    'min': hmin, 'max': hmax,
    'lahteet': ['maailma-glo15.f32 (Copernicus GLO-90 15"-ruudukkoon)', 'maailma-etopo15.f32 (NOAA ETOPO 2022 15", PD)'],
}
json.dump(meta, open(f'{ULOS}.json', 'w'), ensure_ascii=False, indent=1)
loki('VALMIS', hmin, hmax)
