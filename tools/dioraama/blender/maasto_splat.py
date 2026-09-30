# Olavinlinnan lähimaaston kerrosmaskit (Linnanrakentaja 1.10.2026; omistaja: "Saako linnan ympäristön maaston maata
# paremmaksi?"). Siirtosepän splat-rajapinta: kuusi CC0-kerrosta, maski kahtena RGBA-kuvana (summa 255), normaalitasolle
# oma 4-kerroksinen maski (kerros 4 → 0, 5 → 2). Kerrokset:
#   0 kallio (mossy_rock: graniitti ja jäkälä)   1 sammal- ja varpukangas (forrest_ground_01)   2 niitty (sparse_grass)
#   3 neulas-metsänpohja (forest_leaves_04)       4 rantakivikko (dry_river_pebbles)             5 hiekka (coast_sand_04)
# Säännöt (pääpiirteet, pehmeät rajat + kohina): kallio = MML:n kallioalueet tai rinne > 22°; rantakivikko 0–4 m vedestä,
# hiekka loivilla (< 5°) ja matalilla (< 0,6 m) rannoilla; niitty avoimella vyöhykkeellä (linnasta < AVOIN m); metsässä
# neulaset tiheän latvuksen alla (> 10 m) ja sammal-/varpukangas harvemman (3–10 m); muu maa varpukangasta.
#   <python numpy> maasto_splat.py <dem.raw> <ymparisto-kansio> [--alue 800] [--koko 2048] [--avoin 350]
# Lukee kansiosta n1500-maski.npz (kallio), puut-chm.npy, maasto-z.npz; kirjoittaa splat-0.png, splat-1.png,
# splat-normaali-0.png ja maasto.json.
import json, math, os, sys
import numpy as np
from PIL import Image, ImageFilter
A = sys.argv[1:]; DEM, K = A[:2]
def lippu(n, o): return float(A[A.index(n) + 1]) if n in A else o
ALUE = lippu('--alue', 800.0); N = int(lippu('--koko', 2048)); AVOIN = lippu('--avoin', 350.0)
ORIGO = (599993.0, 6860483.0); LEHTI = (596000.0, 6858000.0, 602000.0, 6864000.0); VESI_H = 75.7; SADE = 2000.0
px = 2 * ALUE / N
xs = -ALUE + (np.arange(N) + 0.5) * px; ys = ALUE - (np.arange(N) + 0.5) * px  # rivi 0 = pohjoinen (maxY)
X, Y = np.meshgrid(xs, ys)
# --- korkeus ja rinne (DEM 2 m, bilineaarinen) ---
d = np.fromfile(DEM, np.float32); w = int(round(math.sqrt(d.size))); d = d.reshape(w, w); R = (LEHTI[2] - LEHTI[0]) / w
def naytteista(arr, E0, N1, res, xx, yy):
    fx = np.clip((xx + ORIGO[0] - E0) / res - 0.5, 0, arr.shape[1] - 1.001); fy = np.clip((N1 - (yy + ORIGO[1])) / res - 0.5, 0, arr.shape[0] - 1.001)
    ix, iy = fx.astype(int), fy.astype(int); tx, ty = fx - ix, fy - iy
    return arr[iy, ix] * (1 - tx) * (1 - ty) + arr[iy, ix + 1] * tx * (1 - ty) + arr[iy + 1, ix] * (1 - tx) * ty + arr[iy + 1, ix + 1] * tx * ty
H = naytteista(d, LEHTI[0], LEHTI[3], R, X, Y) - VESI_H
gy, gx = np.gradient(H, px); rinne = np.degrees(np.arctan(np.hypot(gx, gy)))
maa = H > 0.05
# --- etäisyys veteen (m), 8-naapuri ---
def etaisyys(m, n_max):
    et = np.where(m, 0, n_max + 1).astype(np.float32); r = m.copy()
    for k in range(1, n_max + 1):
        q = np.pad(r, 1); uusi = np.logical_or.reduce([q[a:a + N, b:b + N] for a in range(3) for b in range(3)]) & ~r
        et[uusi] = k; r |= uusi
    return et * px
et_vesi = etaisyys(~maa, int(12 / px))
# --- latvus (1 m, rivi 0 = etelä, E0/N0 = ORIGO − SADE) ja MML:n kallio (sama ruudukko) ---
C = np.load(os.path.join(K, 'puut-chm.npy')); n1 = np.load(os.path.join(K, 'n1500-maski.npz'))
def ruudusta(arr):  # 1 m, rivi 0 = etelä
    ix = np.clip((X + SADE).astype(int), 0, arr.shape[1] - 1); iy = np.clip((Y + SADE).astype(int), 0, arr.shape[0] - 1)
    return arr[iy, ix]
lat = ruudusta(C).astype(np.float32); kal = ruudusta(n1['kallio']); kaup = ruudusta(n1['maski'])
q = np.pad(lat, 3, mode='edge'); lat = sum(q[a:a + N, b:b + N] for a in range(0, 7, 3) for b in range(0, 7, 3)) / 9  # pehmeä
# --- kohina rajojen rikkomiseen (kaksi mittakaavaa) ---
rng = np.random.default_rng(41)
def kohina(solu):  # pehmeä arvokohina: pieni satunnaisruudukko bikuubisesti suurennettuna
    n_ = N // solu + 2; k = rng.standard_normal((n_, n_)).astype(np.float32)
    k = np.asarray(Image.fromarray(k, 'F').resize((n_ * solu, n_ * solu), Image.BICUBIC))[:N, :N]
    return (k - k.mean()) / (k.std() + 1e-6)
k1 = kohina(24); k2 = kohina(6); kk = 0.7 * k1 + 0.3 * k2
s = lambda x, a, b: np.clip((x - a) / (b - a), 0, 1)  # pehmeä askel
et_linna = np.hypot(X, Y)
w = np.zeros((6, N, N), np.float32)
w[0] = np.maximum(kal.astype(np.float32) * 0.85, s(rinne + 4 * kk, 18, 28))                         # kallio
w[4] = s(4.0 - et_vesi + 1.2 * k2, 0, 2.5) * (1 - s(rinne, 25, 35))                                 # rantakivikko
w[5] = w[4] * s(5 - rinne, 0, 3) * s(0.6 - H, 0, 0.4) * s(kk, -0.2, 0.6)                             # hiekka (loiva, matala)
w[4] *= 1 - w[5]
avoin = s(AVOIN + 100 - et_linna + 40 * kk, 0, 100)
w[2] = avoin * s(kk, -1.2, 0.2)                                                                      # niitty (avoin ranta: puut harvennettu, latvusmallista riippumatta)
metsa = (1 - avoin) * s(lat, 2, 5)
w[3] = metsa * s(lat + 4 * kk, 17, 22)                                                               # neulaset (tiheä, varjoisa)
w[1] = np.maximum(metsa * (1 - w[3]), (1 - avoin) * (1 - s(lat, 2, 5)) * 0.9) + 0.55 * avoin * s(k2, 0.4, 1.4)  # sammal/varpu (v2: laikkuina niitylle)
k3 = kohina(40); w[0] = np.maximum(w[0], avoin * s(k3 + 0.3 * k2, 1.3, 1.8))  # v2: avokalliota niityn keskellä
for i in (1, 2, 3): w[i] *= 1 - np.maximum(w[0], np.maximum(w[4], w[5]))
vesi = ~maa  # veden alla: pohja kivikkoa rannan lähellä (< 6 m), sitten hiekkaa (näkyy veden läpi matalikossa)
et_maa = etaisyys(maa, int(20 / px))
w[:, vesi] = 0; w[4, vesi] = s(6 - et_maa, 0, 4)[vesi]; w[5, vesi] = 1 - w[4, vesi]
summa = w.sum(0); w = np.where(summa[None] > 1e-4, w / np.maximum(summa, 1e-4)[None], np.array([0, 1, 0, 0, 0, 0], np.float32)[:, None, None])
def tallenna(kanavat, nimi, koko, taydenna=True):
    a = np.stack(kanavat, -1)
    if koko != N: a = a.reshape(koko, N // koko, koko, N // koko, a.shape[-1]).mean((1, 3))
    b = np.round(a * 255).astype(np.int32)
    if taydenna: b[..., 0] += 255 - b.sum(-1)  # summa tasan 255 (pyöristysero kanavaan 0)
    b[..., 0] = np.clip(b[..., 0], 0, 255)
    Image.fromarray(b.astype(np.uint8), 'RGBA').save(os.path.join(K, nimi))
tallenna([w[0], w[1], w[2], w[3]], 'splat-0.png', N)
tallenna([w[4], w[5], np.zeros_like(w[0]), np.zeros_like(w[0])], 'splat-1.png', N, taydenna=False)  # yhteissumma alla
# splat-1:n kanavat eivät yksin summaudu 255:een: yhteissumma splat-0 + splat-1 = 255 (Siirtosepän rajapinta)
b0 = np.asarray(Image.open(os.path.join(K, 'splat-0.png'))).astype(np.int32); b1 = np.asarray(Image.open(os.path.join(K, 'splat-1.png'))).astype(np.int32)[..., :2]
b0[..., 0] = np.clip(255 - b0[..., 1:].sum(-1) - b1.sum(-1), 0, 255)
Image.fromarray(b0.astype(np.uint8), 'RGBA').save(os.path.join(K, 'splat-0.png'))
tallenna([w[0] + w[4], w[1], w[2] + w[5], w[3]], 'splat-normaali-0.png', N // 2)
KERR = [('kallio', 'mossy_rock', 3.0), ('varpukangas', 'forrest_ground_01', 2.0), ('niitty', 'sparse_grass', 2.0),
        ('neulaset', 'forest_leaves_04', 1.5), ('rantakivikko', 'dry_river_pebbles', 2.0), ('hiekka', 'coast_sand_04', 3.94)]
json.dump({'alue': [-ALUE, -ALUE, ALUE, ALUE], 'koko': N, 'pikseli_m': px, 'lahi_m': 400,
           'huom': 'alue [minX, minZ, maxX, maxZ] = Blender [minX, minY, maxX, maxY]; kuvan rivi 0 = maxY (pohjoinen), sarake 0 = minX. '
                   'splat-0 RGBA = kerrokset 0–3, splat-1 RG = 4–5 (yhteissumma 255); splat-normaali-0 (1024²) = 0+4, 1, 2+5, 3.',
           'kerrokset': [{'id': i, 'lahde': l, 'toisto_m': t} for i, l, t in KERR]},
          open(os.path.join(K, 'maasto.json'), 'w'), ensure_ascii=False, indent=1)
osuus = w.reshape(6, -1)[:, maa.ravel()].mean(1)
print('SPLAT: kerrosten osuudet maalla', ' '.join(f'{KERR[i][0]} {osuus[i]:.2f}' for i in range(6)), f'({N}², {px:.2f} m/px)')

# --- aluskasvit (Siirtoseppä: korttipareina, normaali ≤ 8k, huippu ≤ 20k, 300 m:n säteellä) -------------------------
# Tiheys (kpl/m²) kerrospainoista: kanerva varpukankaalla ja kallion reunoilla, mustikka metsän varpukankaalla ja
# neulasilla, kivet rantakivikolla ja niityllä harvakseen, ruoko matalassa (1,5–9 m rannasta) loivan rannan edustalla.
# Rivi [x, y, z, laji, koko] kuoren koordinaatistossa; lista etäisyysjärjestyksessä (tasot = N ensimmäistä).
SADE_AK = lippu('--ak-sade', 300.0)
mz = np.load(os.path.join(K, 'maasto-z.npz')); zz = mz['z']
def korkeus(x, y):
    fx = np.clip((x - float(mz['x0'])) / float(mz['res']), 0, zz.shape[1] - 1.001); fy = np.clip((float(mz['y0']) - y) / float(mz['res']), 0, zz.shape[0] - 1.001)
    ix, iy = fx.astype(int), fy.astype(int); tx, ty = fx - ix, fy - iy
    return zz[iy, ix] * (1 - tx) * (1 - ty) + zz[iy, ix + 1] * tx * (1 - ty) + zz[iy + 1, ix] * (1 - tx) * ty + zz[iy + 1, ix + 1] * tx * ty
metsa_w = (1 - avoin) * s(lat, 2, 5)
# v2 (Päätoimittaja 1.10.): ruoko vain lahdissa tupsuryhminä, kivet tummat ja uponneet, heinätupsut, risut, katajat,
# nuoret männyt ja koivut niityn ja metsän reunoille.
def laatikkokeski(x, r):
    I = np.pad(x.astype(np.float64).cumsum(0).cumsum(1), ((1, 0), (1, 0))); ii = np.arange(N)
    a0 = np.clip(ii - r, 0, N); a1 = np.clip(ii + r + 1, 0, N)
    return ((I[a1][:, a1] - I[a0][:, a1] - I[a1][:, a0] + I[a0][:, a0]) / ((a1 - a0)[:, None] * (a1 - a0)[None])).astype(np.float32)
maata_ymp = laatikkokeski(maa, int(40 / px))  # maan osuus 40 m:n säteellä
lahti = s(maata_ymp, 0.35, 0.55)                                   # vesi, jota maa ympäröi (lahti, salmen poukama)
ryhma = s(kohina(10), 0.5, 1.2)                                    # tupsuryhmät
reuna_m = avoin * s(lat, 1, 4) + (1 - avoin) * (1 - s(lat, 4, 10))  # niityn ja metsän raja
tiheys = np.stack([
    w[1] * (1 - 0.6 * metsa_w) * 0.35 + w[0] * 0.20 * s(3 - rinne / 10, 0, 1) + w[2] * 0.06 * s(kk, -0.5, 0.8),  # 0 kanerva
    (w[1] * metsa_w + 0.5 * w[3]) * 0.14 + w[2] * 0.02,                                                  # 1 mustikka
    w[4] * 0.12 + w[2] * 0.02 + w[0] * 0.06,                                                             # 2 kivi
    np.zeros_like(w[0]),                                                                                 # 3 ruoko (alla)
    w[2] * 0.7 * s(kohina(3), -0.8, 0.6),                                                                # 4 heinä (laikuittain)
    (w[1] + w[3]) * 0.03 + w[2] * 0.01,                                                                  # 5 risut
    (w[2] + w[0]) * 0.004 * avoin,                                                                       # 6 kataja
    reuna_m * 0.004 + w[0] * 0.002 * avoin,                                                              # 7 nuori mänty
    reuna_m * 0.003,                                                                                     # 8 nuori koivu
]) * maa[None].astype(np.float32)
tiheys[3] = np.where(vesi, s(et_maa, 1.5, 3) * (1 - s(et_maa, 7, 9)) * lahti * ryhma * 0.9 * s(8 - rinne, 0, 4), 0)
sisalla = (et_linna < SADE_AK) & ~((np.abs(X) < 94) & (np.abs(Y) < 53))  # ei kuoren päälle
tiheys *= sisalla[None]
rng_ak = np.random.default_rng(51); rivit = []
for laji in range(tiheys.shape[0]):
    odotus = tiheys[laji] * px * px; lkm = rng_ak.poisson(odotus)
    iy, ix = np.nonzero(lkm)
    for jy, jx in zip(iy, ix):
        for _ in range(lkm[jy, jx]):
            x = X[jy, jx] + rng_ak.uniform(-px / 2, px / 2); y = Y[jy, jx] + rng_ak.uniform(-px / 2, px / 2)
            koko = {0: rng_ak.uniform(0.25, 0.45), 1: rng_ak.uniform(0.3, 0.5), 2: rng_ak.uniform(0.25, 0.8), 3: rng_ak.uniform(1.0, 2.2),
                    4: rng_ak.uniform(0.15, 0.35), 5: rng_ak.uniform(0.3, 0.5), 6: rng_ak.uniform(1.0, 2.8), 7: rng_ak.uniform(2.5, 5.0), 8: rng_ak.uniform(2.5, 5.0)}[laji]
            rivit.append((x, y, laji, koko))
R_ = np.array(rivit); jarj = np.argsort(np.hypot(R_[:, 0], R_[:, 1])); R_ = R_[jarj]
zt = np.where(R_[:, 2] == 3, -7.0, korkeus(R_[:, 0], R_[:, 1]) - np.where(R_[:, 2] == 2, 0.12 * R_[:, 3], 0.02))  # kivet uponneet
ak = [[round(float(x), 2), round(float(y), 2), round(float(z), 2), int(l), round(float(k), 2)] for (x, y, l, k), z in zip(R_, zt)]
json.dump({'lahde': 'Linnanrakentaja 1.10.2026: kerrospainoista (maasto_splat.py), omat proseduraaliset kortit (aluskasvit.py)',
           'sarakkeet': ['x', 'y', 'z', 'laji (aluskasvit.json lajit)', 'koko'], 'atlas': 'aluskasvit.json',
           'tasot': {'kevyt': 0, 'normaali': 8000, 'huippu': 20000}, 'kasvit': ak},
          open(os.path.join(K, 'aluskasvit-lista.json'), 'w'), separators=(',', ':'), ensure_ascii=False)
d_ = np.hypot(R_[:, 0], R_[:, 1])
print(f'ALUSKASVIT: {len(ak)} kpl {SADE_AK:.0f} m:n säteellä, lajit', np.bincount(R_[:, 2].astype(int), minlength=9).tolist(),
      '8000. säde', round(float(d_[min(7999, len(d_) - 1)])), 'm, 20000. säde', round(float(d_[min(19999, len(d_) - 1)])), 'm')
