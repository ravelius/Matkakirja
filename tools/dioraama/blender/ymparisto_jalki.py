# Ympäristön jälkikäsittely (Linnanrakentaja 1.10.2026): puut.json etäisyysjärjestykseen + laatutasojen määrät
# (Siirtosepän budjetti: kevyt 15k, normaali 40k, huippu 100k kolmiota, 4 kolmiota/puu) ja veden syvyyskartta.
#   Blender -b --python-expr "..." tai python (numpy): ymparisto_jalki.py <puut.json> <dem.raw> <ulos-kansio>
# Syvyys: MML:n korkeusmallissa järvi on tasainen (75,7 m), joten syvyys arvioidaan etäisyydestä rantaan:
# 0,12 m/m, enintään 30 m (pehmeä rantagradientti vaahtoa ja väriä varten). 2048² PNG, 8 bit, arvo × kerroin_m.
import json, math, os, sys
import numpy as np
A = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
PUUT, DEM, ULOS = A[:3]
ORIGO = (599993.0, 6860483.0); LEHTI = (596000.0, 6858000.0, 602000.0, 6864000.0); SADE = 2000.0; VESI_H = 75.7
TASOT = {'kevyt': 3500, 'normaali': 10000, 'huippu': 25000}
j = json.load(open(PUUT)); P = np.array(j['puut'])
et = np.hypot(P[:, 0], P[:, 1]); P = P[np.argsort(et)]
j['puut'] = [[round(float(v), 2) if i < 5 else int(v) for i, v in enumerate(r)] for r in P]
j['tasot'] = TASOT; j['atlas'] = 'puukortit.json'
j['huom'] = 'Lista on etäisyysjärjestyksessä linnasta: tason puut = N ensimmäistä. Kauempana metsä on maaston latvuspinnassa.'
json.dump(j, open(PUUT, 'w'), separators=(',', ':'), ensure_ascii=False)
print('JALKI: puita', len(P), 'tasot', TASOT)
# --- syvyys ---
d = np.fromfile(DEM, np.float32); w = int(round(math.sqrt(d.size))); d = d.reshape(w, w); R = (LEHTI[2] - LEHTI[0]) / w
N = 2048; px = 2 * SADE / N
xs = ORIGO[0] - SADE + (np.arange(N) + 0.5) * px; ys = ORIGO[1] + SADE - (np.arange(N) + 0.5) * px  # rivi 0 = pohjoinen
ix = np.clip(((xs - LEHTI[0]) / R).astype(int), 0, w - 1); iy = np.clip(((LEHTI[3] - ys) / R).astype(int), 0, w - 1)
maa = d[iy][:, ix] > VESI_H + 0.05
et = np.where(maa, 0, np.inf).astype(np.float32); reuna = maa.copy(); k = 0
while not reuna.all() and k < 160:  # 8-naapurin laajennus: etäisyys rantaan pikseleinä
    k += 1; q = np.pad(reuna, 1)
    uusi = np.logical_or.reduce([q[a:a + N, b:b + N] for a in range(3) for b in range(3)]) & ~reuna
    et[uusi] = k; reuna |= uusi
et[~reuna] = k + 1
syv = np.minimum(30.0, 0.12 * et * px)
KERROIN = 30.0 / 255
img = np.clip(np.round(syv / KERROIN), 0, 255).astype(np.uint8)
try:
    import bpy
    im = bpy.data.images.new('syvyys', N, N); b = np.ones((N, N, 4), np.float32); b[..., :3] = (img[::-1] / 255.0)[..., None]
    im.pixels.foreach_set(b.ravel()); im.filepath_raw = os.path.join(ULOS, 'syvyys.png'); im.file_format = 'PNG'
    im.colorspace_settings.name = 'Non-Color'; im.save()
except ImportError:
    from PIL import Image; Image.fromarray(img, 'L').save(os.path.join(ULOS, 'syvyys.png'))
json.dump({'kuva': 'syvyys.png', 'koko': N, 'pikseli_m': px, 'kerroin_m': KERROIN,
           'origo': [-SADE, SADE], 'huom': 'origo = kuvan vasen yläkulma kuoren koordinaatistossa (Blender x itä, y pohjoinen; '
           'glTF x, −z). 0 = ranta/maa. Syvyys arvioitu etäisyydestä rantaan (0,12 m/m, max 30 m); MML:n korkeusmallissa järvi on tasainen.'},
          open(os.path.join(ULOS, 'syvyys.json'), 'w'), ensure_ascii=False, indent=1)
print('JALKI: syvyys', N, 'px', round(px, 3), 'm/px, vettä', round(float((~maa).mean()), 2))
