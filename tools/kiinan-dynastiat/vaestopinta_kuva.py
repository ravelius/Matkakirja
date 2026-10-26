#!/usr/bin/env python3
"""Väestöpinnan esikatselu PT:lle: korkeus = tiheys, väri = omistaja, kamera matalalla (matplotlib, ei pelin piirto).
Käyttö: vaestopinta_kuva.py <vaestopinta-kansio> <vuosi> <ulos.png>"""
import json, os, sys
import numpy as np
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.colors import to_rgb, LightSource

k, vuosi, ulos = sys.argv[1], int(sys.argv[2]), sys.argv[3]
hetki = None
m = json.load(open(os.path.join(k, f'vaestopinta-{vuosi}.json'))); h = m['hila']; hetki = m.get('hetki')
L, H = h['leveys'], h['korkeus']
tih = np.fromfile(os.path.join(k, m['tiheys']['tiedosto']), '<u2').reshape(H, L) / 10.0
om = np.fromfile(os.path.join(k, m['omistus']['tiedosto']), np.uint8).reshape(H, L)
lon = h['lon0'] + (np.arange(L) + 0.5) * h['askel']; lat = h['lat1'] - (np.arange(H) + 0.5) * h['askel']
X, Y = np.meshgrid(lon, lat)
varit = np.array([to_rgb('#d8cfbf')] + [to_rgb(d['vari']) for d in m['dynastiat']])
rgb = varit[om]
rgb[tih < 0.5] = to_rgb('#cfd8dc')
ls = LightSource(azdeg=315, altdeg=40)
Z = tih * m['tiheys'].get('korotus', 1) / 20.0   # 20 hlö/km² (× pysäkin korotus) = 1 aste "korkeutta" esikatselussa
rgb = ls.shade_rgb(rgb, Z, vert_exag=6, blend_mode='soft')
fig = plt.figure(figsize=(16, 9), dpi=120); ax = fig.add_subplot(111, projection='3d')
s = 1
def zp(lo, la):
    c = int((lo - h['lon0']) / h['askel']); r = int((h['lat1'] - la) / h['askel']); return Z[r, c] + 0.25
ax.plot_surface(X[::s, ::s], Y[::s, ::s], Z[::s, ::s], facecolors=rgb[::s, ::s], rstride=1, cstride=1, linewidth=0,
                antialiased=False, shade=False)
for a in (hetki or {}).get('armeijat', []):
    p = a['reitti']; ax.plot([q['lon'] for q in p], [q['lat'] for q in p], [zp(q['lon'], q['lat']) for q in p], color='black', lw=1.4, zorder=5)
    ax.text(p[0]['lon'], p[0]['lat'], zp(p[0]['lon'], p[0]['lat']) + 0.6, f"{a['nimi']} ~{a['miehia'] // 1000} 000", fontsize=9)
for b in (hetki or {}).get('lyonnit', []): ax.scatter([b['lon']], [b['lat']], [zp(b['lon'], b['lat'])], color='#a01818', s=40)
ax.set_box_aspect((h['lon1'] - h['lon0'], h['lat1'] - h['lat0'], 6)); ax.view_init(elev=28, azim=-110); ax.set_axis_off()
ax.set_title(f"{(hetki or {}).get('nimi', '')} {vuosi}: väestöpinta (arvio {m['tiheys']['summa_milj']} milj.), korkeus = henkeä/km², "
             f"väri = omistaja (rajat {m['omistus']['rajat_vuosi']})", fontsize=11)
plt.savefig(ulos, bbox_inches='tight', facecolor='white'); print(ulos)
