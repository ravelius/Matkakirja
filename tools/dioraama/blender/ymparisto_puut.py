# Olavinlinnan ympäristön puut oikeille paikoille (Linnanrakentaja 1.10.2026, ympäristösuunnitelman vaihe 1; omistajan
# hyväksyntä 1.10. klo 00.0x). Lähde: Maanmittauslaitos, laserkeilausaineisto 2011 (N5311A1–A4, CC BY 4.0) ja
# korkeusmalli 2 m; lajin arvio ortokuvasta 2024 (latvan väri). Ajo erillisellä Pythonilla (laspy + lazrs + numpy):
#   /Users/Shared/Claude/proto-3d/_lahteet/venv-laser/bin/python ymparisto_puut.py <laser-kansio> <dem.raw> <orto.png|-> <ulos.json>
#     [--sade 2000] [--ruutu 1.0] [--min 3]
# Menetelmä: latvuskorkeusmalli (1 m ruutu, ylin paluu − maanpinta), 3 × 3 -tasoitus, latvat = paikalliset maksimit
# ikkunassa, jonka säde kasvaa puun korkeuden mukana (0,6 + 0,06·h m); latvuksen säde = puolet etäisyydestä
# lähimpään korkeampaan latvaan, enintään 0,25·h. Koordinaatit kuoren mukaan: origo ETRS-TM35FIN (599993, 6860483),
# z = korkeus − 82,7 (Saimaa 75,7 m = −7). Kuoren alue (x ±94, y ±53) ja vesi pois.
# Tulos: {"lahde": ..., "puut": [[x, y, z_maa, h, r_latvus, laji], ...]}, laji 0 = mänty, 1 = kuusi, 2 = koivu.
import glob, json, math, os, sys
import numpy as np
import laspy

A = sys.argv[1:]
LASER, DEM, ORTO, ULOS = A[:4]
def lippu(n, o): return float(A[A.index(n) + 1]) if n in A else o
SADE = lippu('--sade', 2000.0); R = lippu('--ruutu', 1.0); HMIN = lippu('--min', 3.0)
ORIGO = (599993.0, 6860483.0); LEHTI = (596000.0, 6858000.0, 602000.0, 6864000.0); VESI_H = 75.7
KUORI = (-94.0, 94.0, -53.0, 53.0)
E0, N0 = ORIGO[0] - SADE, ORIGO[1] - SADE; n = int(2 * SADE / R)

# --- ylin paluu 1 m ruutuun (kaikki luokat paitsi kohina 7/18 ja vesi 9) ---
ylin = np.full((n, n), -np.inf, np.float32)
for p in sorted(glob.glob(os.path.join(LASER, '*.laz'))):
    with laspy.open(p) as f:
        for pala in f.chunk_iterator(5_000_000):
            x = np.asarray(pala.x); y = np.asarray(pala.y); z = np.asarray(pala.z, np.float32); c = np.asarray(pala.classification)
            ok = (c != 7) & (c != 18) & (c != 9) & (x >= E0) & (x < E0 + 2 * SADE) & (y >= N0) & (y < N0 + 2 * SADE)
            ix = ((x[ok] - E0) / R).astype(np.int64); iy = ((y[ok] - N0) / R).astype(np.int64)
            np.maximum.at(ylin, (iy, ix), z[ok])
    print('PUUT: luettu', os.path.basename(p), flush=True)

# --- maanpinta (DEM 2 m, rivi 0 = pohjoinen) bilineaarisesti 1 m:n ruutuun ---
d = np.fromfile(DEM, np.float32); w = int(round(math.sqrt(d.size))); d = d.reshape(w, w); DR = (LEHTI[2] - LEHTI[0]) / w
cx = E0 + (np.arange(n) + 0.5) * R; cy = N0 + (np.arange(n) + 0.5) * R
fx = np.clip((cx - LEHTI[0]) / DR - 0.5, 0, w - 1.001); fy = np.clip((LEHTI[3] - cy) / DR - 0.5, 0, w - 1.001)
X0, Y0 = np.meshgrid(fx, fy); ix0 = X0.astype(int); iy0 = Y0.astype(int); tx = X0 - ix0; ty = Y0 - iy0
maa = (d[iy0, ix0] * (1 - tx) * (1 - ty) + d[iy0, ix0 + 1] * tx * (1 - ty) + d[iy0 + 1, ix0] * (1 - tx) * ty + d[iy0 + 1, ix0 + 1] * tx * ty)
chm = np.where(np.isfinite(ylin), ylin - maa, 0).astype(np.float32); chm = np.clip(chm, 0, 45)
q = np.pad(chm, 1, mode='edge'); chm_s = sum(q[a:a + n, b:b + n] for a in range(3) for b in range(3)) / 9  # 3 × 3 -tasoitus

# --- latvat: paikallinen maksimi muuttuvassa ikkunassa (0,6 + 0,06·h m) ---
ehd = np.argwhere((chm_s >= HMIN) & (maa > VESI_H + 0.1))
h = chm_s[ehd[:, 0], ehd[:, 1]]; jarj = np.argsort(-h); ehd = ehd[jarj]; h = h[jarj]
varattu = np.zeros((n, n), bool); latvat = []
for (iy, ix), hh in zip(ehd, h):
    if varattu[iy, ix]: continue
    r = int(math.ceil((0.6 + 0.06 * hh) / R))
    y0, y1, x0, x1 = max(iy - r, 0), min(iy + r + 1, n), max(ix - r, 0), min(ix + r + 1, n)
    if chm_s[y0:y1, x0:x1].max() > hh + 1e-4: continue
    varattu[y0:y1, x0:x1] = True; latvat.append((iy, ix, float(hh)))
L = np.array(latvat, np.float64)
px = E0 + (L[:, 1] + 0.5) * R - ORIGO[0]; py = N0 + (L[:, 0] + 0.5) * R - ORIGO[1]
pois = (px > KUORI[0]) & (px < KUORI[1]) & (py > KUORI[2]) & (py < KUORI[3])
L = L[~pois]; px = px[~pois]; py = py[~pois]
zmaa = maa[L[:, 0].astype(int), L[:, 1].astype(int)] - VESI_H - 7.0
# latvuksen säde: puolet etäisyydestä lähimpään korkeampaan (järjestyksessä aiempaan) latvaan, 0,15–0,25·h
from itertools import islice
rad = np.minimum(0.25 * L[:, 2], 6.0)
ruudukko = {}
for i, (x, y) in enumerate(zip(px, py)):
    k = (int(x // 8), int(y // 8)); lahin = 1e9
    for dx in (-1, 0, 1):
        for dy in (-1, 0, 1):
            for j in ruudukko.get((k[0] + dx, k[1] + dy), ()):
                lahin = min(lahin, math.hypot(x - px[j], y - py[j]))
    rad[i] = max(0.15 * L[i, 2], min(rad[i], lahin / 2)); ruudukko.setdefault(k, []).append(i)

# --- tihennys (1.10.): vuoden 2011 harva laserdata (noin 0,5 pistettä/m²) löytää vain valtapuut, joten metsäruutuihin
# (latvuskorkeus > 5 m), joissa ei ole latvaa TIHEYS_M m:n säteellä, lisätään puita värisevään ruudukkoon (korkeus =
# latvusmalli × 0,9, latvus 0,18·h). Vain TIHENNYS_R m:n säteellä linnasta (kauempana metsä on maaston latvuspintana).
TIHEYS_M = lippu('--tiheys', 3.5); TIHENNYS_R = lippu('--tihennys-r', 1300.0)
rng = np.random.default_rng(1)
askel = TIHEYS_M; gx = np.arange(-TIHENNYS_R, TIHENNYS_R, askel); GX, GY = np.meshgrid(gx, gx)
GX = GX.ravel() + rng.uniform(-askel / 2, askel / 2, GX.size); GY = GY.ravel() + rng.uniform(-askel / 2, askel / 2, GY.size)
sis = np.hypot(GX, GY) < TIHENNYS_R
GX, GY = GX[sis], GY[sis]
jx = ((GX + ORIGO[0] - E0) / R).astype(int); jy = ((GY + ORIGO[1] - N0) / R).astype(int)
hc = chm_s[jy, jx]; ok = (hc > 5) & (maa[jy, jx] > VESI_H + 0.3) & ~((GX > KUORI[0]) & (GX < KUORI[1]) & (GY > KUORI[2]) & (GY < KUORI[3]))
GX, GY, jx, jy, hc = GX[ok], GY[ok], jx[ok], jy[ok], hc[ok]
lahella = np.zeros((n, n), bool); r_ = int(math.ceil(TIHEYS_M / R))
for iy, ix in L[:, :2].astype(int):
    lahella[max(iy - r_, 0):iy + r_ + 1, max(ix - r_, 0):ix + r_ + 1] = True
uus = ~lahella[jy, jx]
lisa_x, lisa_y, lisa_h = GX[uus], GY[uus], 0.9 * hc[uus]
lisa_z = maa[jy[uus], jx[uus]] - VESI_H - 7.0
print(f'PUUT: tihennys {len(lisa_x)} lisäpuuta {TIHENNYS_R:.0f} m:n säteellä', flush=True)
px = np.concatenate([px, lisa_x]); py = np.concatenate([py, lisa_y]); zmaa = np.concatenate([zmaa, lisa_z])
L = np.concatenate([L, np.stack([np.zeros_like(lisa_h), np.zeros_like(lisa_h), lisa_h], 1)]); rad = np.concatenate([rad, 0.18 * lisa_h])

# --- laji ortokuvan latvan väristä (kevät 2024: koivu vaalean vihreä, kuusi tumma, mänty väliltä) ---
laji = np.zeros(len(L), np.int32)
if ORTO != '-':
    from PIL import Image  # vain jos saatavilla
    Image.MAX_IMAGE_PIXELS = None
    o = Image.open(ORTO); OR = (LEHTI[2] - LEHTI[0]) / o.size[0]
    ox = ((px + ORIGO[0] - LEHTI[0]) / OR).astype(int); oy = ((LEHTI[3] - (py + ORIGO[1])) / OR).astype(int)
    a = np.asarray(o.crop((ox.min() - 3, oy.min() - 3, ox.max() + 4, oy.max() + 4))).astype(np.float32)
    rgb = np.stack([a[oy - oy.min() + 3 + dy, ox - ox.min() + 3 + dx] for dy in (-2, 0, 2) for dx in (-2, 0, 2)]).mean(0)
    kirk = rgb.mean(1); vih = rgb[:, 1] - (rgb[:, 0] + rgb[:, 2]) / 2
    laji = np.where((vih > 12) & (kirk > 70), 2, np.where(kirk < 45, 1, 0))
puut = [[round(float(x), 2), round(float(y), 2), round(float(z), 2), round(float(hh), 1), round(float(r), 1), int(l)]
        for x, y, z, hh, r, l in zip(px, py, zmaa, L[:, 2], rad, laji)]
json.dump({'lahde': 'Maanmittauslaitos, laserkeilaus 2011 ja korkeusmalli 2 m (CC BY 4.0), ortokuva 2024 (CC BY 4.0)',
           'sarakkeet': ['x', 'y', 'z_maa', 'korkeus', 'latvus_r', 'laji (0 mänty, 1 kuusi, 2 koivu)'], 'puut': puut},
          open(ULOS, 'w'), separators=(',', ':'))
np.save(os.path.splitext(ULOS)[0] + '-chm.npy', chm_s)
print(f'PUUT: {len(puut)} puuta, korkeus mediaani {np.median(L[:, 2]):.1f} m, max {L[:, 2].max():.1f} m, '
      f'lajit mänty {int((laji == 0).sum())} kuusi {int((laji == 1).sum())} koivu {int((laji == 2).sum())}', ULOS)
