# Tekselitiheys kuoren huippu-tasolla: cm/pikseli per kolmio (maailman pinta-ala vs UV-pinta-ala × 4096²),
# jaoteltuna pinnan suunnan mukaan (vaaka = katot/piha, pysty = seinät). Tulostaa persentiilit.
import sys, math
import bpy, bmesh
import numpy as np
glb = sys.argv[sys.argv.index('--') + 1]
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=glb)
ob = [o for o in bpy.context.scene.objects if o.type == 'MESH'][0]
me = ob.data
me.calc_loop_triangles()
n = len(me.loop_triangles)
co = np.empty(len(me.vertices) * 3); me.vertices.foreach_get('co', co); co = co.reshape(-1, 3)
uvl = me.uv_layers.active.data
uv = np.empty(len(uvl) * 2); uvl.foreach_get('uv', uv); uv = uv.reshape(-1, 2)
tv = np.empty(n * 3, dtype=np.int64); me.loop_triangles.foreach_get('vertices', tv); tv = tv.reshape(-1, 3)
tl = np.empty(n * 3, dtype=np.int64); me.loop_triangles.foreach_get('loops', tl); tl = tl.reshape(-1, 3)
a, b, c = co[tv[:, 0]], co[tv[:, 1]], co[tv[:, 2]]
cr = np.cross(b - a, c - a)
wa = 0.5 * np.linalg.norm(cr, axis=1)
nz = np.abs(cr[:, 2]) / np.maximum(np.linalg.norm(cr, axis=1), 1e-12)   # Blender Z ylös
ua, ub, uc = uv[tl[:, 0]], uv[tl[:, 1]], uv[tl[:, 2]]
uva = 0.5 * np.abs((ub[:, 0] - ua[:, 0]) * (uc[:, 1] - ua[:, 1]) - (uc[:, 0] - ua[:, 0]) * (ub[:, 1] - ua[:, 1]))
px = uva * 4096 * 4096
ok = (px > 0) & (wa > 0)
cm = np.sqrt(wa[ok] / px[ok]) * 100   # cm per tekseli
w = wa[ok]
def pct(mask, nimi):
    x, ww = cm[mask], w[mask]
    o = np.argsort(x); x, ww = x[o], ww[o]; cw = np.cumsum(ww) / ww.sum()
    q = [x[np.searchsorted(cw, p)] for p in (0.1, 0.5, 0.9)]
    print(f'{nimi:22s} ala {ww.sum():9.0f} m²  cm/tekseli p10 {q[0]:5.1f}  mediaani {q[1]:5.1f}  p90 {q[2]:5.1f}')
nzo = nz[ok]
pct(np.ones_like(nzo, bool), 'kaikki')
pct(nzo > 0.8, 'vaaka (katot, piha)')
pct(nzo < 0.3, 'pysty (seinät)')
print('UV-käyttö', round(px.sum() / 4096 / 4096 * 100, 1), '% atlaksesta, kolmioita', n)
