# Olavinlinnan rantaviiva makroon (Linnanrakentaja 1.10.2026; laatusuunnitelman tavoitekuvan viimeinen puute,
# Päätoimittajan OK 08.2x). Saimaan graniittirannoilla vesirajassa on tumma märkä kaista (aallot ja vedenpinnan
# vaihtelu), ja loivilla rannoilla rantaviivassa on katkonainen vaahto. Leivotaan makroon (ymparisto-{8k,4k,2k}.jpg),
# josta Siirtosepän splat-kaava (väri = makro · detalji / keskikirkkaus) ottaa sävyn ja josta hämärä leivotaan
# (kuori_hamara.py --albedo), joten vesivarjostimeen ei kosketa.
#   märkä: korkeus vedestä h < 0,12 m täysin, häivytys 0,35–0,6 m:iin (kohinalla, kallioilla korkeampi roiskevyöhyke);
#          kirkkaus × 0,58, kylläisyys hieman ylös (märkä kivi tummuu ja syvenee).
#   vaahto: h ∈ [−0,08, +0,06] m, katkonaisina laikkuina (2–6 m), vain loivilla rannoilla (kalteva kallio: alle pikselin).
#   veden alla (h < −0,3) makro ennallaan (peli piirtää veden).
#   <python numpy+PIL> makro_ranta.py <ymparisto-kansio> [--alue 1200]
# Korkeus: maasto-z.npz (2 m) + kohouma.npz (0,5 m, lähialue), kuten aluskasvien juuret (maasto_splat.py). Alkuperäinen
# talteen ymparisto-8k-ennen-ranta.jpg (ajo on toistettava: lähtee aina siitä).
import os, shutil, sys
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
A = sys.argv[1:]; K = A[0]
ALUE = float(A[A.index('--alue') + 1]) if '--alue' in A else 1200.0
SADE = 2000.0; VESI_Z = -7.0
alku = os.path.join(K, 'ymparisto-8k-ennen-ranta.jpg')
if not os.path.exists(alku): shutil.copy(os.path.join(K, 'ymparisto-8k.jpg'), alku)
im = Image.open(alku).convert('RGB'); T = im.size[0]; m_px = 2 * SADE / T
c0 = int((SADE - ALUE) / m_px); c1 = int((SADE + ALUE) / m_px); n = c1 - c0  # neliö, rivi 0 = pohjoinen
osa = np.asarray(im.crop((c0, c0, c1, c1))).astype(np.float32) / 255
xs = -ALUE + (np.arange(n) + 0.5) * m_px; ys = ALUE - (np.arange(n) + 0.5) * m_px
def bilin(arr, x0, y0, res, xx, yy):  # arr rivi 0 = y0 (pohjoinen), sarake 0 = x0
    fx = np.clip((xx - x0) / res, 0, arr.shape[1] - 1.001); fy = np.clip((y0 - yy) / res, 0, arr.shape[0] - 1.001)
    ix, iy = fx.astype(np.int32), fy.astype(np.int32); tx, ty = (fx - ix).astype(np.float32), (fy - iy).astype(np.float32)
    return arr[iy, ix] * (1 - tx) * (1 - ty) + arr[iy, ix + 1] * tx * (1 - ty) + arr[iy + 1, ix] * (1 - tx) * ty + arr[iy + 1, ix + 1] * tx * ty
X, Y = np.meshgrid(xs.astype(np.float32), ys.astype(np.float32))
mz = np.load(os.path.join(K, 'maasto-z.npz'))
h = bilin(mz['z'], float(mz['x0']), float(mz['y0']), float(mz['res']), X, Y) - VESI_Z
kz = os.path.join(K, 'kohouma.npz')
if os.path.exists(kz):
    g = np.load(kz); lahi = float(g['lahi'])
    h += np.where((np.abs(X) < lahi) & (np.abs(Y) < lahi), bilin(g['dz'], float(g['x0']), float(g['y0']), float(g['res']), X, Y), 0)
gy, gx = np.gradient(np.maximum(h, 0), m_px); rinne = np.degrees(np.arctan(np.hypot(gx, gy)))  # vesi pois: 2 m:n ruudun pudotus −7,5:een ei ole rinne
rng = np.random.default_rng(73)
def kohina(solu):  # pehmeä arvokohina, solu = pikseleinä
    m_ = n // solu + 3; k = rng.standard_normal((m_, m_)).astype(np.float32)
    k = np.asarray(Image.fromarray(k, 'F').resize((m_ * solu, m_ * solu), Image.BICUBIC))[:n, :n]
    return (k - k.mean()) / (k.std() + 1e-6)
s = lambda x, a, b: np.clip((x - a) / (b - a), 0, 1)
px = lambda m: max(2, int(round(m / m_px)))
def laatikko(x, r):  # laatikkosumennus säteellä r px (kahdesti ≈ gauss)
    for ax in (0, 1):
        c = np.cumsum(np.pad(x, [(r + 1, r) if a_ == ax else (0, 0) for a_ in (0, 1)], mode='edge'), ax, dtype=np.float64)
        x = ((np.take(c, np.arange(2 * r + 1, c.shape[ax]), ax) - np.take(c, np.arange(0, c.shape[ax] - 2 * r - 1), ax)) / (2 * r + 1)).astype(np.float32)
    return x
def etaisyys(m, n_max):  # metreinä etäisyys maskista m (8-naapuri), enintään n_max px
    et = np.where(m, 0, n_max + 1).astype(np.float32); r = m.copy()
    for k in range(1, n_max + 1):
        q = np.pad(r, 1); u = np.logical_or.reduce([q[a_:a_ + n, b_:b_ + n] for a_ in range(3) for b_ in range(3)]) & ~r
        et[u] = k; r |= u
    return et * m_px
# v2: kaista vaakaetäisyytenä vesirajasta (v1 korkeudesta oli alle pikselin: DEM-rannan reuna nousee jyrkästi, ja
# tuloksena oli kova yhden pikselin ääriviiva). Vesiraja = h 0; maalla märkää 0,6–2,2 m (jyrkällä kalliolla +1,2 m
# roiskevyöhyke), veden puolella 1–3 m (matalikon kivet näkyvät veden läpi tummina).
vesi = h < 0; d_maa = etaisyys(vesi, px(5)); d_vesi = etaisyys(~vesi, px(4))
rinne_r = laatikko(laatikko(rinne, px(1.5)), px(1.5))  # vesirajan pikseleille naapuriston maan rinne
k6 = kohina(px(6)); k2 = kohina(px(2))
marka = np.where(vesi, 1 - s(d_vesi, 1.0, 3.0),
                 (1 - s(d_maa, 0.6 + 0.3 * k6, 2.2 + 0.8 * k6 + 1.2 * s(rinne_r, 10, 30))) * (1 - s(h, 0.7, 1.2)))
marka = laatikko(laatikko(marka, 1), 1)
L = osa @ np.array([0.2126, 0.7152, 0.0722], np.float32)
kyl = 1.15  # kylläisyys
markana = np.clip((L[..., None] + (osa - L[..., None]) * kyl) * 0.6, 0, 1)
tulos = osa * (1 - marka[..., None]) + markana * marka[..., None]
# vaahto: vesirajan veden puolelle 0–1,2 m (maalle 0,3 m), katkonaisina laikkuina, vain loivilla (< 12°) rannoilla
viiva = np.where(vesi, 1 - s(d_vesi, 0.4, 1.4), 1 - s(d_maa, 0.0, 0.5))
laikut = s(0.65 * kohina(px(5)) + 0.35 * k2, 0.0, 0.9)
vaahto = laatikko(laatikko(viiva * laikut * (1 - s(rinne_r, 6, 12)), 1), 1) * 0.45
VAAHTO = np.array([0.80, 0.82, 0.80], np.float32)
tulos = tulos * (1 - vaahto[..., None]) + VAAHTO * vaahto[..., None]
kuva = np.asarray(im).copy(); kuva[c0:c1, c0:c1] = (np.clip(tulos, 0, 1) * 255).round().astype(np.uint8)
ulos = Image.fromarray(kuva)
for koko in (8192, 4096, 2048):
    (ulos if koko == T else ulos.resize((koko, koko), Image.LANCZOS)).save(os.path.join(K, f'ymparisto-{koko // 1024}k.jpg'), quality=90)
maalla = h > -0.3
print(f'RANTA: märkä {(marka > 0.5).sum() * m_px * m_px / 1e4:.1f} ha, vaahto {(vaahto > 0.2).sum() * m_px * m_px:.0f} m² '
      f'(alue ±{ALUE:.0f} m, {m_px:.2f} m/px, maata {maalla.mean():.2f})')
