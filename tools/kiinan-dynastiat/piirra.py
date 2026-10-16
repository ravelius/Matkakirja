#!/usr/bin/env python3
"""Piirtää omat rajat (rajat.py) Natural Earth -pohjalle: GeoJSON per vuosi + kuva. --vertailu lisää Cliopatrian katkoviivan."""
import json, math, sys, os
sys.path.insert(0, os.path.dirname(__file__))
import matplotlib; matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import PathPatch
from matplotlib.path import Path
from shapely.geometry import shape, Polygon, mapping, box
from shapely.ops import unary_union
import rajat

K = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALUE = box(68, 12, 145, 58)
maa = unary_union([shape(f['geometry']) for f in json.load(open(f'{K}/lahteet/ne/ne_50m_land.geojson'))['features']]).intersection(ALUE.buffer(5))
joet = [shape(f['geometry']) for f in json.load(open(f'{K}/lahteet/ne/ne_50m_rivers_lake_centerlines.geojson'))['features']]
joet = [j for j in joet if j.intersects(ALUE)]
jarvet = [shape(f['geometry']) for f in json.load(open(f'{K}/lahteet/ne/ne_50m_lakes.geojson'))['features']]
jarvet = [j for j in jarvet if j.intersects(ALUE)]
KX = math.cos(math.radians(35))

def polut(g):
    gs = getattr(g, 'geoms', [g])
    for p in gs:
        if p.is_empty or p.geom_type != 'Polygon': continue
        v = [list(p.exterior.coords)] + [list(r.coords) for r in p.interiors]
        koodit, pisteet = [], []
        for rengas in v:
            pisteet += [(x * KX, y) for x, y in rengas]; koodit += [Path.MOVETO] + [Path.LINETO] * (len(rengas) - 2) + [Path.CLOSEPOLY]
        yield Path(pisteet, koodit)

def alueet(vuosi):
    v = rajat.VUODET[vuosi]; varattu = None; tulos = []
    for nimi, avain, tyyppi, karjet in v['alueet']:
        g = Polygon(karjet).buffer(0).intersection(maa)
        if varattu is not None: g = g.difference(varattu)
        varattu = g if varattu is None else varattu.union(g)
        tulos.append((nimi, avain, tyyppi, g))
    return v, tulos

def piirra(vuosi, vertailu=False, ax=None):
    v, al = alueet(vuosi)
    oma = ax is None
    if oma: fig, ax = plt.subplots(figsize=(12, 8.2), dpi=110)
    ax.set_facecolor('#d9dfd6')
    for p in polut(maa): ax.add_patch(PathPatch(p, fc='#efe4c8', ec='#8a7a5a', lw=0.5))
    for j in jarvet:
        for p in polut(j): ax.add_patch(PathPatch(p, fc='#d9dfd6', ec='none'))
    for j in joet:
        for l in getattr(j, 'geoms', [j]):
            x, y = l.xy; ax.plot([a * KX for a in x], y, color='#7f9bb0', lw=0.6, alpha=0.8)
    for nimi, avain, tyyppi, g in al:
        for p in polut(g): ax.add_patch(PathPatch(p, fc=rajat.VARIT[avain], ec='#3b2f25', lw=0.9, alpha=0.62))
        if avain in rajat.KOTISEUDUT:
            k = Polygon(rajat.KOTISEUDUT[avain]).intersection(maa)
            for p in polut(k): ax.add_patch(PathPatch(p, fc='none', ec='#3b2f25', hatch='////', lw=0.0, alpha=0.45))
        c = g.representative_point() if not g.is_empty else None
        if c is not None:
            cx, cy = c.x, c.y
            for kn in v['paakaupungit']:  # nimi pois pääkaupungin päältä
                px, py = rajat.KAUPUNGIT[kn]
                if abs(px - cx) < 4 and abs(py - cy) < 1.5:
                    p2 = g.intersection(box(px - 30, py - 30, px + 30, py - 1.8)).representative_point() if g.intersects(box(px - 30, py - 30, px + 30, py - 1.8)) else None
                    if p2 is not None and not p2.is_empty: cx, cy = p2.x, p2.y
            ax.text(cx * KX, cy, nimi, ha='center', va='center', fontsize=15 if tyyppi == 'kiina' else 12,
                    fontweight='bold', color='#2b211a', family='serif')
    for kn in v['paakaupungit']:
        x, y = rajat.KAUPUNGIT[kn]
        ax.plot(x * KX, y, marker='s', ms=6, mfc='#8b1a1a', mec='#2b211a'); ax.text(x * KX + 0.5, y + 0.4, kn, fontsize=8.5, family='serif')
    if vertailu:
        d = json.load(open(f'{K}/viite/cliopatria-{vuosi}.geojson'))
        for f in d['features']:
            for p in polut(shape(f['geometry'])):
                ax.add_patch(PathPatch(p, fc='none', ec='#222', lw=0.8, ls='--'))
    ax.set_xlim(70 * KX, 142 * KX); ax.set_ylim(14, 56); ax.set_aspect('equal'); ax.set_xticks([]); ax.set_yticks([])
    ax.set_title(v['otsikko'], fontsize=20, family='serif', loc='left')
    return al

if __name__ == '__main__':
    vuodet = [int(x) for x in sys.argv[1].split(',')]; vertailu = '--vertailu' in sys.argv
    os.makedirs(f'{K}/tulos', exist_ok=True)
    for vu in vuodet:
        fig, ax = plt.subplots(figsize=(12, 8.2), dpi=110)
        al = piirra(vu, vertailu, ax)
        fig.tight_layout(); fig.savefig(f"{K}/tulos/{vu}{'-vertailu' if vertailu else ''}.png"); plt.close(fig)
        if not vertailu:
            json.dump({'type': 'FeatureCollection', 'vuosi': vu, 'lisenssi': 'CC0-1.0', 'features': [
                {'type': 'Feature', 'properties': {'nimi': n, 'avain': a, 'tyyppi': t, 'vari': rajat.VARIT[a]}, 'geometry': mapping(g.simplify(0.02))}
                for n, a, t, g in al]}, open(f'{K}/tulos/rajat-{vu}.geojson', 'w'))
        print(vu, [(n, round(g.area, 1)) for n, _, _, g in al])
