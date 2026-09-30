# Olavinlinnan horisonttirengas (Linnanrakentaja 1.10.2026, ympäristön vaihe 1; Siirtosepän budjetti ≤ 8k kolmiota,
# 1 draw call, 1k-tekstuuri). Lähde: Maanmittauslaitos, korkeusmalli 10 m (2019, CC BY 4.0), lehdet M5244, M5422,
# N5133, N5134, N5311, N5312. 20 × 20 km linnan ympäriltä, sisempi 4 × 4 km (ymparisto.py) pois. Metsä +12 m
# maalla (ei rannan 40 m:n vyöhykkeellä) antaa horisontille metsän siluetin. Tekstuuri: metsän väri ortokuvan
# keskiarvosta, vinovalo (rinteet) ja pieni kohinavaihtelu; sumu tulee pelistä.
#   nice -n 15 Blender -b -P horisontti.py -- <dem10m-kansio (*.raw)> <ulos-kansio> [--kolmiot 8000]
import bpy, math, os, sys, time
import numpy as np
A = sys.argv[sys.argv.index('--') + 1:]; KANSIO, ULOS = A[:2]
KOLMIOT = int(A[A.index('--kolmiot') + 1]) if '--kolmiot' in A else 8000
ORIGO = (599993.0, 6860483.0); VESI_H = 75.7; VESI_Z = -7.0; SADE = 10000.0; SISA = 1950.0; RES = 10.0
LEHDET = {'M5244': (572000, 6858000), 'M5422': (596000, 6858000), 'N5133': (572000, 6870000),
          'N5311': (596000, 6870000), 'N5134': (572000, 6882000), 'N5312': (596000, 6882000)}  # vasen yläkulma (E, N)
os.makedirs(ULOS, exist_ok=True); t0 = time.time()
E0, N1 = 572000, 6882000; W, H = 4800, 3600
mos = np.full((H, W), np.nan, np.float32)
for nimi, (e, nn) in LEHDET.items():
    d = np.fromfile(os.path.join(KANSIO, nimi + '.raw'), np.float32).reshape(1200, 2400)
    c = int((e - E0) / RES); r = int((N1 - nn) / RES); mos[r:r + 1200, c:c + 2400] = d
mos[mos < -1000] = np.nan
c0 = int((ORIGO[0] - SADE - E0) / RES); r0 = int((N1 - (ORIGO[1] + SADE)) / RES); n = int(2 * SADE / RES)
Z = mos[r0:r0 + n, c0:c0 + n].astype(np.float64); Z = np.where(np.isnan(Z), VESI_H, Z)
xs = ORIGO[0] - SADE + (np.arange(n) + 0.5) * RES - ORIGO[0]; ys = ORIGO[1] + SADE - (np.arange(n) + 0.5) * RES - ORIGO[1]
X, Y = np.meshgrid(xs, ys)
maa = Z > VESI_H + 0.05
# rannan 40 m:n vyöhyke: metsän korotus nousee vasta sen jälkeen (4 ruudun laajennus vedestä)
vesi = ~maa; lahi = vesi.copy()
for _ in range(4):
    q = np.pad(lahi, 1); lahi = np.logical_or.reduce([q[a:a + n, b:b + n] for a in range(3) for b in range(3)])
z = np.where(maa, Z - VESI_H + VESI_Z + np.where(lahi, 0, 12.0), VESI_Z - 0.5)
kulma = maa[:-1, :-1] | maa[1:, :-1] | maa[:-1, 1:] | maa[1:, 1:]
cx = (X[:-1, :-1] + X[1:, 1:]) / 2; cy = (Y[:-1, :-1] + Y[1:, 1:]) / 2
mukana = kulma & ~((np.abs(cx) < SISA) & (np.abs(cy) < SISA))
ii, jj = np.nonzero(mukana); idx = np.arange(n * n).reshape(n, n)
quads = np.stack([idx[ii + 1, jj], idx[ii + 1, jj + 1], idx[ii, jj + 1], idx[ii, jj]], 1)
kay = np.unique(quads); uusi = -np.ones(n * n, np.int64); uusi[kay] = np.arange(len(kay))
V = np.stack([X.ravel(), Y.ravel(), z.ravel()], 1)[kay]; Q = uusi[quads]
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
me = bpy.data.meshes.new('horisontti')
me.vertices.add(len(V)); me.vertices.foreach_set('co', V.astype(np.float32).ravel())
me.loops.add(Q.size); me.loops.foreach_set('vertex_index', Q.astype(np.int32).ravel())
me.polygons.add(len(Q)); me.polygons.foreach_set('loop_start', np.arange(0, Q.size, 4, dtype=np.int32)); me.polygons.foreach_set('loop_total', np.full(len(Q), 4, np.int32))
me.update(calc_edges=True); me.validate()
uvl = me.uv_layers.new(name='UVMap'); lv = np.empty(len(me.loops), np.int32); me.loops.foreach_get('vertex_index', lv)
co = V[lv]; uvl.data.foreach_set('uv', np.stack([(co[:, 0] + SADE) / (2 * SADE), (co[:, 1] + SADE) / (2 * SADE)], 1).astype(np.float32).ravel())
ob = bpy.data.objects.new('horisontti', me); sc.collection.objects.link(ob)
print(f'HOR: {len(me.polygons)} nelikulmiota ennen harvennusta, maata {maa.mean():.2f}')
# --- tekstuuri 1k: metsä (ortokuvan metsän keskiväri) × vinovalo, rannoilla vaaleampi kallio ---
T = 1024; k = n // T if n >= T else 1
Zt = Z[::k, ::k][:T, :T]; mt = maa[::k, ::k][:T, :T]; lt = lahi[::k, ::k][:T, :T]
gy, gx = np.gradient(Zt, RES * k); valo = np.clip(0.75 + 0.9 * (-gx * 0.6 + gy * 0.8) / np.sqrt(1 + gx ** 2 + gy ** 2), 0.45, 1.25)
rng = np.random.default_rng(3); koh = 1 + 0.12 * rng.standard_normal((T, T)); koh = (koh + np.roll(koh, 1, 0) + np.roll(koh, 1, 1)) / 3
metsa = np.array([0.105, 0.14, 0.085]); kallio = np.array([0.36, 0.35, 0.31]); vesi_v = np.array([0.03, 0.05, 0.06])
rgb = np.where(mt[..., None], np.where(lt[..., None] & mt[..., None], 0.5 * metsa + 0.5 * kallio, metsa) * (valo * koh)[..., None], vesi_v)
im = bpy.data.images.new('horisontti-1k', T, T); p = np.ones((T, T, 4), np.float32); p[..., :3] = np.clip(rgb, 0, 1)  # värit ovat jo sRGB-arvoja
im.pixels.foreach_set(p[::-1].ravel()); im.filepath_raw = os.path.join(ULOS, 'horisontti-1k.jpg'); im.file_format = 'JPEG'; im.save(quality=90)
mat = bpy.data.materials.new('horisontti'); mat.use_nodes = True; nt = mat.node_tree; tx = nt.nodes.new('ShaderNodeTexImage'); tx.image = im
nt.links.new(tx.outputs['Color'], nt.nodes['Principled BSDF'].inputs['Base Color']); me.materials.append(mat)
for pp in me.polygons: pp.use_smooth = True
m = ob.modifiers.new('kevennys', 'DECIMATE'); m.ratio = min(1.0, KOLMIOT / (len(me.polygons) * 2))
bpy.context.view_layer.objects.active = ob; ob.select_set(True); bpy.ops.object.modifier_apply(modifier=m.name)
p = os.path.join(ULOS, 'horisontti.glb')
bpy.ops.export_scene.gltf(filepath=p, use_selection=True, export_format='GLB', export_image_format='JPEG', export_jpeg_quality=88,
                          export_texcoords=True, export_normals=True, export_materials='EXPORT')
print(f'HOR: {sum(len(q.vertices) - 2 for q in ob.data.polygons)} kolmiota, {os.path.getsize(p) / 1e6:.2f} Mt, {time.time() - t0:.0f} s', p)
