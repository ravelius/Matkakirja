# Kuoren välitaso (Linnanrakentaja 5.10.2026, kevennysehdotus B:n korvaaja) (~0,8 M) huippu-tasosta: kärjet yhdistetään (ei halkeamia), harvennus Collapse-menetelmällä
# saumaherkästi: UV-saumojen kärjet painotetaan (vertex group) kalliimmiksi, jolloin harvennus kohdistuu karttojen
# sisäosiin; UV0 säilyy silmukoittain (sama tekstuuri). Mittaa UV-venymän (UV-ala / 3D-ala) ennen/jälkeen.
#   Blender -b --factory-startup -P kuori_valitaso.py -- <huippu.glb> <ulos.glb> [tavoite 800000] [saumapaino 0.2]
import bpy, bmesh, sys, os, time
import numpy as np
A = sys.argv[sys.argv.index('--') + 1:]; HUIPPU, ULOS = A[:2]
TAVOITE = int(A[2]) if len(A) > 2 else 800000; PAINO = float(A[3]) if len(A) > 3 else 0.2
t0 = time.time()
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
bpy.ops.import_scene.gltf(filepath=HUIPPU)
o = next(x for x in sc.objects if x.type == 'MESH'); me = o.data

def venyma(me):
    """UV-ala / 3D-ala per kolmio, normalisoitu mediaaniin: kertoo karttojen yli venyneistä kolmioista."""
    bm = bmesh.new(); bm.from_mesh(me); uv = bm.loops.layers.uv.active
    a3 = np.array([f.calc_area() for f in bm.faces]); au = np.empty(len(bm.faces))
    for i, f in enumerate(bm.faces):
        (u0, v0), (u1, v1), (u2, v2) = [tuple(l[uv].uv) for l in f.loops[:3]]
        au[i] = abs((u1 - u0) * (v2 - v0) - (u2 - u0) * (v1 - v0)) / 2
    bm.free(); r = au / np.maximum(a3, 1e-12); r /= np.median(r)
    return dict(kolmioita=len(a3), yli4=round(float((r > 4).mean() * 100), 3), yli16=round(float((r > 16).mean() * 100), 3),
                p999=round(float(np.quantile(r, 0.999)), 1))
alku = venyma(me)
bm = bmesh.new(); bm.from_mesh(me)
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.001)
# UV-saumat: reuna, jonka kahden puolen silmukoilla eri UV
uv = bm.loops.layers.uv.active; sauma = set()
for e in bm.edges:
    if len(e.link_loops) != 2: sauma.update(v.index for v in e.verts); continue
    l1, l2 = e.link_loops
    a1, b1 = l1[uv].uv, l1.link_loop_next[uv].uv; a2, b2 = l2.link_loop_next[uv].uv, l2[uv].uv
    if (a1 - a2).length > 1e-5 or (b1 - b2).length > 1e-5: sauma.update(v.index for v in e.verts)
bm.verts.ensure_lookup_table(); nv = len(bm.verts)
bm.to_mesh(me); bm.free()
vg = o.vertex_groups.new(name='sisus')                       # 1 = karttojen sisus (harvenee vapaasti), PAINO = sauma
sis = [i for i in range(nv) if i not in sauma]
vg.add(sis, 1.0, 'REPLACE'); vg.add(list(sauma), PAINO, 'REPLACE')
print(f'VALITASO: kärkiä {nv} yhdistettynä, saumakärkiä {len(sauma)} ({100 * len(sauma) / nv:.0f} %)', flush=True)
mod = o.modifiers.new('valitaso', 'DECIMATE'); mod.decimate_type = 'COLLAPSE'
mod.ratio = TAVOITE / len(me.polygons); mod.vertex_group = 'sisus'; mod.vertex_group_factor = 1.0
mod.use_collapse_triangulate = True
bpy.context.view_layer.objects.active = o; o.select_set(True)
bpy.ops.object.modifier_apply(modifier=mod.name)
o.vertex_groups.clear()
loppu = venyma(me)
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_image_format='JPEG',
                          export_jpeg_quality=88, export_texcoords=True, export_normals=True, export_materials='EXPORT')
print('VALITASO', dict(alku=alku, loppu=loppu, mt=round(os.path.getsize(ULOS) / 1e6, 1), s=round(time.time() - t0)))
