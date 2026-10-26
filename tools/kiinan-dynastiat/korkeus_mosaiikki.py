"""Kiinan väestöpinnan korkeusmosaiikki (Karttaseppä 17.10.2026): Copernicus GLO-90 (ESA, vapaa käyttö) 1°-laattojen
300×300-yleiskuvista 0,05°:n ruudukoksi alueelle lon 70–136, lat 14–55. Puuttuva laatta = meri (0). Ulos: int16 .npy, rivi 0 = pohjoinen.
Käyttö: korkeus_mosaiikki.py <glo90-kansio> <ulos.npy>"""
import sys, os, numpy as np, tifffile
LON0, LON1, LAT0, LAT1, N = 70, 136, 14, 55, 20   # N px/aste
src, ulos = sys.argv[1], sys.argv[2]
tied = {f for f in os.listdir(src) if f.endswith('_DEM.tif')}
M = np.zeros(((LAT1 - LAT0) * N, (LON1 - LON0) * N), np.float32)
n = 0
for lat in range(LAT0, LAT1):
    for lon in range(LON0, LON1):
        nimi = f"Copernicus_DSM_COG_30_{'N' if lat >= 0 else 'S'}{abs(lat):02d}_00_{'E' if lon >= 0 else 'W'}{abs(lon):03d}_00_DEM.tif"
        if nimi not in tied: continue
        with tifffile.TiffFile(os.path.join(src, nimi)) as t:
            lv = t.series[0].levels
            a = lv[-1].asarray().astype(np.float32)          # 300×300 (leveyksillä > 50° kapeampi)
        h, w = a.shape
        a = a[: h - h % N, : w - w % N].reshape(N, h // N, N, w // N).mean(axis=(1, 3))
        r = (LAT1 - 1 - lat) * N; c = (lon - LON0) * N
        M[r:r + N, c:c + N] = a
        n += 1
np.save(ulos, np.clip(M, -500, 9000).astype(np.int16))
print('laattoja', n, 'mosaiikki', M.shape, 'max', float(M.max()))
