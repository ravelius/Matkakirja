# Pään vaihto Faceit-ilmeitä varten (Linnanrakentaja 6.10.2026; omistaja osti Faceit 2.3:n, Päätoimittaja 14.1x).
# Pelin pää (<hahmo>_paa) on kevennetty ~780 kolmioon ilman suun ja silmien reunasilmukoita (ilmekoe-20261006.png), joten se
# korvataan Quaterniuksen alkuperäisellä päällä (UBC Superhero, 2 808 kolmiota; sama luuranko ja UV, joten hahmon oma ihomateriaali
# käy). Lisäksi suun sisus (suupussi, hampaat, kieli) omana verkkonaan <hahmo>_suu, verteksiryhmät Faceitin rekisteröintiin
# (faceit_suupussi, faceit_ylahampaat, faceit_alahampaat, faceit_kieli). Leikkeet säilyvät ennallaan.
#   Blender -b -P hahmo_paa.py -- <hahmo.glb> <ulos.glb> [--nainen]
import bpy, bmesh, math, sys
from mathutils import Vector, Matrix
A = sys.argv[sys.argv.index('--') + 1:]; HAHMO, ULOS = A[0], A[1]; NAINEN = '--nainen' in A
UBC = '/Users/Shared/Claude/proto-3d/_lahteet/quaternius-ubc/Universal Base Characters[Standard]/Base Characters/Godot - UE'
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene; sc.render.fps = 30
def tuo(f):
    ennen = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=f); return [o for o in bpy.data.objects if o not in ennen]
hahmo = tuo(HAHMO); arm = [o for o in hahmo if o.type == 'ARMATURE'][0]
for a in bpy.data.actions: a.use_fake_user = True
vanha = [o for o in hahmo if o.type == 'MESH' and o.name.endswith('_paa')][0]; NIMI = vanha.name[:-4]
iho = vanha.data.materials[0]; vanhat_kolmiot = sum(len(p.vertices) - 2 for p in vanha.data.polygons)
bpy.data.objects.remove(vanha)
ennen_act = set(bpy.data.actions)
ubc = tuo(f'{UBC}/Superhero_{"Female" if NAINEN else "Male"}_FullBody.gltf')
for a in list(bpy.data.actions):
    if a not in ennen_act: bpy.data.actions.remove(a)
paa = [o for o in ubc if o.type == 'MESH' and o.name.lower().startswith('superhero')][0]
ryhmat = {g.index: g.name for g in paa.vertex_groups}
bm = bmesh.new(); bm.from_mesh(paa.data); bm.verts.ensure_lookup_table(); dl = bm.verts.layers.deform.active
pois = [v for v in bm.verts if sum(w for g, w in v[dl].items() if ryhmat.get(g) in ('Head', 'neck_01')) < 0.5]
bmesh.ops.delete(bm, geom=pois, context='VERTS'); bm.to_mesh(paa.data); bm.free()
paa.data.materials.clear(); paa.data.materials.append(iho)
for o in ubc:
    if o is not paa: bpy.data.objects.remove(o)
mw = paa.matrix_world.copy(); paa.parent = arm; paa.matrix_world = mw
paa.modifiers.clear(); paa.modifiers.new('Armature', 'ARMATURE').object = arm; paa.name = f'{NIMI}_paa'
W = paa.matrix_world; P = [W @ v.co for v in paa.data.vertices]
# huulirako: etuosan rajareunat suun korkeudella → suun keskikohta ja suupielet
bm = bmesh.new(); bm.from_mesh(paa.data)
raja = [W @ v.co for e in bm.edges if e.is_boundary for v in e.verts]
rako = [p for p in raja if p.y < -0.05 and 1.58 < p.z < 1.68]; bm.free()
if not rako: raise SystemExit('huulirakoa ei löytynyt')
x0, x1 = min(p.x for p in rako), max(p.x for p in rako); zk = sum(p.z for p in rako) / len(rako); yk = sum(p.y for p in rako) / len(rako)
print(f'PAA {NIMI}: vanha {vanhat_kolmiot} → uusi {sum(len(p.vertices) - 2 for p in paa.data.polygons)} kolmiota; huulirako x {x0:.3f}…{x1:.3f} z {zk:.3f} y {yk:.3f}')
# suun sisus: suupussi (sisäänpäin käännetty puoliellipsoidi), ylä- ja alahampaat (kaaririvit), kieli (litteä ellipsoidi)
lev = max(0.02, (x1 - x0) / 2); bm = bmesh.new(); osat = {}
def ellipsoidi(nimi, keski, r, sisaan=False, seg=10, ren=6):
    t = bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=ren, radius=1.0)
    for v in t['verts']: v.co = keski + Vector((v.co.x * r[0], v.co.y * r[1], v.co.z * r[2]))
    fs = list({f for v in t['verts'] for f in v.link_faces})
    if sisaan: bmesh.ops.reverse_faces(bm, faces=fs)
    osat[nimi] = t['verts']; return fs
def hammasrivi(nimi, z, korkeus):
    vs = []; n = 6
    for i in range(n):  # kaari: keskellä edessä, sivuilla taaempana
        a = (i + 0.5) / n * math.pi; x = -math.cos(a) * lev * 0.85; y = yk + 0.012 + (1 - math.sin(a)) * 0.012
        t = bmesh.ops.create_cube(bm, size=1.0)
        for v in t['verts']: v.co = Vector((x + v.co.x * lev * 0.28, y + v.co.y * 0.006, z + v.co.z * korkeus))
        vs += t['verts']
    osat[nimi] = vs
pussi = ellipsoidi('faceit_suupussi', Vector((0, yk + 0.028, zk - 0.003)), (lev * 1.05, 0.030, 0.020), sisaan=True)
hammasrivi('faceit_ylahampaat', zk + 0.004, 0.006); hammasrivi('faceit_alahampaat', zk - 0.005, 0.005)
ellipsoidi('faceit_kieli', Vector((0, yk + 0.030, zk - 0.010)), (lev * 0.7, 0.022, 0.005))
me = bpy.data.meshes.new(f'{NIMI}_suu'); bm.to_mesh(me)
indeksit = {k: [v.index for v in vs] for k, vs in osat.items()}; bm.free()
def mat(nimi, rgb):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*rgb, 1); b.inputs['Roughness'].default_value = 0.6; return m
me.materials.append(mat('suu_sisus', (0.12, 0.035, 0.035))); me.materials.append(mat('suu_hampaat', (0.75, 0.70, 0.60)))
me.materials.append(mat('suu_kieli', (0.45, 0.12, 0.12)))
suu = bpy.data.objects.new(f'{NIMI}_suu', me); sc.collection.objects.link(suu); suu.parent = arm
for k, ix in indeksit.items():
    g = suu.vertex_groups.new(name=k); g.add(ix, 1.0, 'REPLACE')
    for p in me.polygons:
        if p.vertices[0] in set(ix): p.material_index = 1 if 'hampaat' in k else 2 if k == 'faceit_kieli' else 0
g = suu.vertex_groups.new(name='Head'); g.add(list(range(len(me.vertices))), 1.0, 'REPLACE')
suu.modifiers.new('Armature', 'ARMATURE').object = arm
print(f'PAA suun sisus {sum(len(p.vertices) - 2 for p in me.polygons)} kolmiota')
arm.animation_data_create(); arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = Matrix()
bpy.ops.object.select_all(action='DESELECT'); arm.select_set(True)
for o in arm.children: o.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_animation_mode='ACTIONS', export_skins=True,
                          export_yup=True, export_apply=False, export_image_format='JPEG', export_jpeg_quality=85)
print('PAA valmis', ULOS, 'kolmiot yht', sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in arm.children if o.type == 'MESH'))
