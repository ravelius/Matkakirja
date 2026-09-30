# Lähimaaston makrotekstuuri kerrosten väreistä (Linnanrakentaja 1.10.2026). Siirtosepän splat-kaava (väri = makro ·
# detalji / keskikirkkaus) ottaa sävyn makrosta, joten makron täytyy lähialueella vastata kerroksia: muuten ilmakuvan
# (ja aikakerroksen n1500 metsälaattojen) sävyt näkyvät lähellä laikkuina. Makro = Σ wᵢ · kerroksen keskiväriᵢ ×
# ilmakuvan paikallinen kirkkausvaihtelu (30 %), splat-alueen reunalla 100 m:n sulautus alkuperäiseen. Hämärä leivotaan
# tästä kuten ennen (kuori_hamara.py --albedo), joten sama kaava toimii myös hämärässä.
#   <python numpy+PIL> makro_kerroksista.py <ymparisto-kansio> <kerrosmateriaalien kansio>
# Muokkaa kansion ymparisto-{8k,4k,2k}.jpg:t (alkuperäinen talteen ymparisto-8k-ilmakuva.jpg).
import json, os, shutil, sys
import numpy as np
from PIL import Image, ImageFilter
Image.MAX_IMAGE_PIXELS = None
K, MAT = sys.argv[1:3]
M = json.load(open(os.path.join(K, 'maasto.json'))); a = M['alue']; SADE = 2000.0
alku = os.path.join(K, 'ymparisto-8k-ilmakuva.jpg')
if not os.path.exists(alku): shutil.copy(os.path.join(K, 'ymparisto-8k.jpg'), alku)
im = Image.open(alku).convert('RGB'); T = im.size[0]; m_px = 2 * SADE / T
# alue ymparisto-tekstuurissa (rivi 0 = pohjoinen): x ∈ [a0, a2], y ∈ [a1, a3]
c0 = int((a[0] + SADE) / m_px); c1 = int((a[2] + SADE) / m_px); r0 = int((SADE - a[3]) / m_px); r1 = int((SADE - a[1]) / m_px)
osa = np.asarray(im.crop((c0, r0, c1, r1))).astype(np.float32) / 255
n = osa.shape[0]
def kanavat(nimi):  # kanava kerrallaan: PIL esikertoo alfan RGBA-skaalauksessa (A = 0 nollasi muut kanavat)
    return np.stack([np.asarray(b.resize((n, n), Image.BILINEAR)) for b in Image.open(os.path.join(K, nimi)).split()], -1).astype(np.float32) / 255
s0 = kanavat('splat-0.png'); s1 = kanavat('splat-1.png')
w = np.concatenate([s0, s1[..., :2]], -1)
keski = []
for k in M['kerrokset']:
    d = np.asarray(Image.open(os.path.join(MAT, f"{k['lahde']}_diff_1k.jpg")).convert('RGB')).astype(np.float32) / 255
    keski.append(d.reshape(-1, 3).mean(0))
keski = np.array(keski)
kerros = w @ keski  # Σ wᵢ · keskivärii (sRGB-arvoina, kuten tekstuurit)
L = osa @ np.array([0.2126, 0.7152, 0.0722], np.float32)
Lb = np.asarray(Image.fromarray((L * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(int(25 / m_px)))).astype(np.float32) / 255
vaihtelu = np.clip(L / np.maximum(Lb, 1e-3), 0.6, 1.5)
uusi = kerros * (1 + 0.3 * (vaihtelu - 1))[..., None]
# vesi (painot rantakivikko/hiekka veden alla): pidä alkuperäinen (peli piirtää veden)
reuna = np.minimum.reduce([np.arange(n)[None, :].repeat(n, 0), np.arange(n)[:, None].repeat(n, 1),
                           (n - 1 - np.arange(n))[None, :].repeat(n, 0), (n - 1 - np.arange(n))[:, None].repeat(n, 1)]) * m_px
t = np.clip(reuna / 100.0, 0, 1)
# Vain puuttomille pinnoille (avoin ranta, kalliot, rannat): metsässä makro on latvuston väri ylhäältä katsottuna, ja
# kaukana (puukorttien ulkopuolella) se näkyy metsänä. Latvus 1 m:n ruudusta (rivi 0 = etelä), pehmeä raja 3–8 m.
C = np.load(os.path.join(K, 'puut-chm.npy'))
iy = np.clip(((a[3] - (np.arange(n) + 0.5) * (a[3] - a[1]) / n) + SADE).astype(int), 0, C.shape[0] - 1)  # rivi 0 = etelä: indeksi = y + SADE
ix = np.clip(((a[0] + (np.arange(n) + 0.5) * (a[2] - a[0]) / n) + SADE).astype(int), 0, C.shape[1] - 1)
lat = C[iy][:, ix].astype(np.float32); q = np.pad(lat, 3, mode='edge'); lat = sum(q[a_:a_ + n, b_:b_ + n] for a_ in range(0, 7, 3) for b_ in range(0, 7, 3)) / 9
avoin = 1 - np.clip((lat - 3) / 5, 0, 1)
t = (t * avoin)[..., None]
kerros = kerros * 0.75  # ylhäältä katsottuna pinta tummempi kuin lähikuvatekstuurin keskiarvo (varjot, kosteus)
uusi = kerros * (1 + 0.3 * (vaihtelu - 1))[..., None]
tulos = osa * (1 - t) + np.clip(uusi, 0, 1) * t
kuva = np.asarray(im).copy(); kuva[r0:r1, c0:c1] = (tulos * 255).round().astype(np.uint8)
ulos = Image.fromarray(kuva)
for koko in (8192, 4096, 2048):
    (ulos if koko == T else ulos.resize((koko, koko), Image.LANCZOS)).save(os.path.join(K, f'ymparisto-{koko // 1024}k.jpg'), quality=90)
print('MAKRO: lähialue kerrosten väreistä', n, 'px, keskivärit', np.round(keski, 3).tolist())
