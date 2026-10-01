# Lähimaaston pienmuodot (Linnanrakentaja 1.10.2026, ympäristö v3; Päätoimittaja: "maan tasaisuus lähellä").
# MML:n 2 m:n korkeusmalli ja vuoden 2011 laserkeilaus (0,26 maapistettä/m²) eivät sisällä alle 2 m:n muotoja, joten
# lähialueen pinta oli sileä kuin pöytä. Tämä laskee linnan ympärille (±LAHI m) 0,5 m:n ruudukkoon korotuksen dz:
#   1. silokalliot: MML:n kallioalueet (MTK 34100) ja avoimen rannan kalliolaikut kupeiksi (0,5–1,6 m), jäätikön
#      hiomina luode–kaakko-suuntaan venytettyinä; kallion reunassa loiva laskeuma maahan,
#   2. mättäät ja painanteet: kaksi mittakaavaa kohinaa (1,5 m ja 5 m), metsässä ja kankaalla 0,15–0,3 m, niityllä
#      puolet siitä,
#   3. häivytys: 0 veden äärellä (rantaviiva ei liiku), kuoren alueella ja lähialueen reunalla (saumaton 2 m:n verkkoon).
# Sama dz ohjaa maastoverkkoa (ymparisto.py --kohouma), puiden ja aluskasvien juuria (ymparisto_jalki.py,
# maasto_splat.py) ja kalliokerroksen painoa (maasto_splat.py: kalliotekstuuri osuu kallion kupuihin).
#   <python numpy+PIL> maasto_kohouma.py <dem.raw> <ymparisto-kansio> [--lahi 400] [--res 0.5] [--avoin 350]
# Tulos: <kansio>/kohouma.npz: dz (float32, rivi 0 = pohjoinen), kallio (0–1), x0, y0 (ensimmäisen ruudun keskipiste,
# kuoren koordinaatisto: x itä, y pohjoinen), res, lahi.
import json, math, os, sys
import numpy as np
from PIL import Image
A = sys.argv[1:]; DEM, K = A[:2]
def lippu(nimi, oletus): return float(A[A.index(nimi) + 1]) if nimi in A else oletus
LAHI = lippu('--lahi', 400.0); RES = lippu('--res', 0.5); AVOIN = lippu('--avoin', 350.0)
ORIGO = (599993.0, 6860483.0); LEHTI = (596000.0, 6858000.0, 602000.0, 6864000.0); VESI_H = 75.7; SADE = 2000.0
KUORI = (-94.0, 94.0, -53.0, 53.0)
N = int(round(2 * LAHI / RES))
xs = -LAHI + (np.arange(N) + 0.5) * RES; ys = LAHI - (np.arange(N) + 0.5) * RES  # rivi 0 = pohjoinen
X, Y = np.meshgrid(xs.astype(np.float32), ys.astype(np.float32))
s = lambda x, a, b: np.clip((x - a) / (b - a), 0, 1)
sm = lambda t: t * t * (3 - 2 * t)

# --- maa ja etäisyys veteen (DEM 2 m bilineaarisesti; sama raja kuin ymparisto.py) ---
d = np.fromfile(DEM, np.float32); w = int(round(math.sqrt(d.size))); d = d.reshape(w, w); R = (LEHTI[2] - LEHTI[0]) / w
fx = np.clip((X + ORIGO[0] - LEHTI[0]) / R - 0.5, 0, w - 1.001); fy = np.clip((LEHTI[3] - (Y + ORIGO[1])) / R - 0.5, 0, w - 1.001)
ix, iy = fx.astype(int), fy.astype(int); tx, ty = fx - ix, fy - iy
H = d[iy, ix] * (1 - tx) * (1 - ty) + d[iy, ix + 1] * tx * (1 - ty) + d[iy + 1, ix] * (1 - tx) * ty + d[iy + 1, ix + 1] * tx * ty - VESI_H
maa = H > 0.05
del d, fx, fy, ix, iy, tx, ty

def laatikko(a, r):  # laatikkokeskiarvo säteellä r ruutua (kumulatiivisilla summilla)
    I = np.pad(a.astype(np.float64).cumsum(0).cumsum(1), ((1, 0), (1, 0))); n0, n1 = a.shape
    i0 = np.clip(np.arange(n0) - r, 0, n0); i1 = np.clip(np.arange(n0) + r + 1, 0, n0)
    j0 = np.clip(np.arange(n1) - r, 0, n1); j1 = np.clip(np.arange(n1) + r + 1, 0, n1)
    S = I[i1][:, j1] - I[i0][:, j1] - I[i1][:, j0] + I[i0][:, j0]
    return (S / ((i1 - i0)[:, None] * (j1 - j0)[None])).astype(np.float32)
def pehmea(a, r, kerrat=3):  # kolme laatikkoa ≈ gaussi
    for _ in range(kerrat): a = laatikko(a, r)
    return a
# etäisyys veteen (m) karkeasti: maan osuus pehmennetyssä ikkunassa → 0 rannassa, 1 sisämaassa
sisamaa = pehmea(maa.astype(np.float32), int(1.5 / RES)) * maa
rantavara = s(sisamaa, 0.55, 0.98)  # ~0 rantaviivalla, 1 noin 3 m:n päässä

# --- MML:n kallio ja latvus (1 m, rivi 0 = etelä, E0/N0 = ORIGO − SADE) ---
n1 = np.load(os.path.join(K, 'n1500-maski.npz')); C = np.load(os.path.join(K, 'puut-chm.npy'))
def ruudusta(arr):
    jx = np.clip((X + SADE).astype(int), 0, arr.shape[1] - 1); jy = np.clip((Y + SADE).astype(int), 0, arr.shape[0] - 1)
    return arr[jy, jx]
kal = ruudusta(n1['kallio']).astype(np.float32); lat = pehmea(ruudusta(C).astype(np.float32), int(2 / RES), 2)

rng = np.random.default_rng(73)
def kohina(solu_m, venytys=(1.0, 1.0), kulma=0.0):
    # pehmeä arvokohina: satunnaisruudukko bikuubisesti suurennettuna; venytys ja kierto (jäätikön suunta)
    solu = max(2, int(round(solu_m / RES)))
    n_ = int(N * 1.5) // solu + 3; k = rng.standard_normal((n_, n_)).astype(np.float32)
    k = np.asarray(Image.fromarray(k, 'F').resize((n_ * solu, n_ * solu), Image.BICUBIC))
    if venytys != (1.0, 1.0) or kulma:
        c, sn = math.cos(kulma), math.sin(kulma); jj, ii = np.meshgrid(np.arange(N), np.arange(N))
        u = (jj - N / 2) * c + (ii - N / 2) * sn; v = -(jj - N / 2) * sn + (ii - N / 2) * c
        u = np.clip(u / venytys[0] + k.shape[1] / 2, 0, k.shape[1] - 1).astype(int); v = np.clip(v / venytys[1] + k.shape[0] / 2, 0, k.shape[0] - 1).astype(int)
        k = k[v, u]
    else: k = k[:N, :N]
    return (k - k.mean()) / (k.std() + 1e-6)

# --- 1. silokalliot ---
avoin = s(AVOIN + 100 - np.hypot(X, Y), 0, 100)
laikut = s(kohina(18, (2.2, 1.0), math.radians(-35)) * 0.8 + 0.2 * kohina(6), 1.25, 1.7) * avoin  # avokallio niityllä
kallio_alue = np.maximum(kal, laikut) * maa
k_peh = pehmea(kallio_alue, int(3 / RES))                    # 0…1, reunat pehmeinä (~6 m)
harjanne = kohina(9, (2.5, 1.0), math.radians(-35))           # hiottu, luode–kaakko-suuntainen muoto
kupu = sm(s(k_peh, 0.15, 0.95)) * (0.95 + 0.4 * harjanne + 0.08 * kohina(2.5))  # sileä, hiottu pinta
kupu = np.clip(kupu, 0, 1.6)
# --- 2. mättäät ja painanteet ---
metsa = s(lat, 2, 6)
amp = 0.10 + 0.12 * metsa + 0.08 * (1 - avoin)               # niitty ~0,1, kangas ~0,2, metsä ~0,3
laikku = s(kohina(20) + 0.3, -0.6, 0.9)                     # mättäikkö laikuittain, välissä tasaisempaa
mattaat = amp * (0.35 * kohina(1.5) * laikku + 0.6 * kohina(5.0) + 1.1 * kohina(16.0))  # v3b: loivat kumpareet näkyviin
# --- 3. häivytys ---
reuna = sm(s(LAHI - np.maximum(np.abs(X), np.abs(Y)), 0, 30))   # lähialueen reunalla 0 (sauma 2 m:n verkkoon)
kx = np.maximum(np.maximum(KUORI[0] - X, X - KUORI[1]), 0); ky = np.maximum(np.maximum(KUORI[2] - Y, Y - KUORI[3]), 0)
kuori = sm(s(np.hypot(kx, ky), 2, 14))                         # kuoren laatikon ulkopuolella 12 m:n liuku
dz = (kupu + mattaat * (1 - 0.7 * sm(s(k_peh, 0.2, 0.8)))) * rantavara * reuna * maa * kuori
dz = np.maximum(dz, -0.25 * rantavara)  # painanteet enintään 0,25 m (ei vesilammikoita pinnan alle)
kallio_paino = np.clip(sm(s(k_peh, 0.25, 0.7)) * s(kupu, 0.15, 0.5), 0, 1) * maa
np.savez_compressed(os.path.join(K, 'kohouma.npz'), dz=dz.astype(np.float32), kallio=(kallio_paino * 255).astype(np.uint8),
                    x0=float(xs[0]), y0=float(ys[0]), res=RES, lahi=LAHI)
print(f'KOHOUMA: {N}² ({RES} m), maata {maa.mean():.2f}, dz maalla keski {dz[maa].mean():.2f} m, '
      f'maks {dz.max():.2f} m, kalliokupuja {(kupu > 0.3).mean() * 100:.1f} % alasta')
