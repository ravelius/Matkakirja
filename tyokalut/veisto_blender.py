# TAIDEMUSEON PATSAS → PELIN MUOTO (Natiiviseppä 10.10.2026; PT 11.2x, budjetti suunnitelma 6.4: veistokset ≤ 40 Mt/sali).
# Ajetaan Blenderissä: Blender -b -P veisto_blender.py -- <lähde.glb> <ulos-kansio> [kolmioita=150000] [tekstuuri=2048] [korkeus_m]
# korkeus_m (teokset.patsaat.v2.1.json mitat_cm_kork_lev_syv[0] / 100): Sketchfab-mallien yksikkö vaihtelee (mm, cm, m) → skaalataan
# todelliseen korkeuteen; ilman sitä koko jää lähteen yksiköihin.
# Sketchfab-GLB (kvantisoitu/Draco, monta solmua ja materiaalia) → <ulos>/malli.glb: YKSI mesh, float POSITION/NORMAL/TEXCOORD_0,
# uint-indeksit, ei kuvia (DioraamaGlb lukee) + <ulos>/vari.png (väritekstuuri ≤ 2048 px, yhteen atlakseen leivottu, jos materiaaleja
# on useita) + <ulos>/veisto.json (kolmiot, mitat m, alkuperäinen kolmiomäärä). Väritekstuurista teos_astc-ketju tekee vari.astcm:n.
# Mallin origo: pohjan keskipiste (jalustalle), +Y ylös, koko metreinä kuten lähde.
import bpy, bmesh, json, math, os, sys
from mathutils import Vector

a = sys.argv[sys.argv.index('--') + 1:]
lahde, ulos = a[0], a[1]
KOLMIOT = int(a[2]) if len(a) > 2 else 150000
KOKO = int(a[3]) if len(a) > 3 else 2048
KORKEUS = float(a[4]) if len(a) > 4 else 0.0
os.makedirs(ulos, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=lahde)
meshit = [o for o in bpy.context.scene.objects if o.type == 'MESH']
if not meshit: sys.exit('ei meshiä')
alkuperaisia = sum(len(o.data.polygons) for o in meshit)

# Muunnokset meshiin ja yhdeksi objektiksi.
bpy.ops.object.select_all(action='DESELECT')
for o in meshit: o.select_set(True)
bpy.context.view_layer.objects.active = meshit[0]
bpy.ops.object.parent_clear(type='CLEAR_KEEP_TRANSFORM')
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
if len(meshit) > 1: bpy.ops.object.join()
ob = bpy.context.view_layer.objects.active
for o in [o for o in bpy.context.scene.objects if o != ob]: bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.quads_convert_to_tris()
bpy.ops.object.mode_set(mode='OBJECT')

# Harvennus (Collapse, UV-saumat säilyvät Blenderin oletuksella).
n = len(ob.data.polygons)
if n > KOLMIOT:
    m = ob.modifiers.new('harvennus', 'DECIMATE'); m.ratio = KOLMIOT / n
    bpy.ops.object.modifier_apply(modifier=m.name)

# Väritekstuuri: yksi materiaali ja kuva → skaalataan; useita → leivotaan uuteen UV-atlakseen.
def perusvari(mat):
    if not mat or not mat.use_nodes: return None
    for nd in mat.node_tree.nodes:
        if nd.type == 'BSDF_PRINCIPLED':
            l = nd.inputs['Base Color'].links
            if l and l[0].from_node.type == 'TEX_IMAGE': return l[0].from_node.image
    return None

kuvat = {perusvari(s.material) for s in ob.material_slots} - {None}
uv = ob.data.uv_layers
if len(kuvat) == 1 and len(ob.material_slots) == 1 and len(uv) >= 1:
    kuva = next(iter(kuvat))
    w, h = kuva.size
    s = min(1.0, KOKO / max(w, h))
    if s < 1: kuva.scale(max(1, int(w * s)), max(1, int(h * s)))
    kuva.filepath_raw = os.path.join(ulos, 'vari.png'); kuva.file_format = 'PNG'; kuva.save()
    tapa = 'skaalattu'
elif kuvat:
    # Uusi UV (smart project) + leivonta DIFFUSE color, ei valoa.
    vanha = uv.active.name if uv.active else None
    uusi = uv.new(name='atlas'); uv.active = uusi
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.003)
    bpy.ops.object.mode_set(mode='OBJECT')
    kuva = bpy.data.images.new('vari', KOKO, KOKO)
    for s_ in ob.material_slots:
        if not s_.material or not s_.material.use_nodes: continue
        nd = s_.material.node_tree.nodes.new('ShaderNodeTexImage'); nd.image = kuva
        s_.material.node_tree.nodes.active = nd
        for uvn in s_.material.node_tree.nodes:
            if uvn.type == 'UVMAP' and vanha: uvn.uv_map = vanha
    # Leivonnan lähde-UV = vanha (materiaalien kuvasolmut käyttävät aktiivista renderöinti-UV:ta).
    if vanha: uv[vanha].active_render = True
    bpy.context.scene.render.engine = 'CYCLES'; bpy.context.scene.cycles.samples = 1
    bpy.context.scene.render.bake.use_pass_direct = False; bpy.context.scene.render.bake.use_pass_indirect = False
    bpy.ops.object.bake(type='DIFFUSE', pass_filter={'COLOR'}, margin=4, uv_layer='atlas')
    if vanha: uv.remove(uv[vanha])
    uusi.active_render = True
    kuva.filepath_raw = os.path.join(ulos, 'vari.png'); kuva.file_format = 'PNG'; kuva.save()
    tapa = f'leivottu {len(ob.material_slots)} materiaalista'
else:
    tapa = 'ei tekstuuria'

# Origo pohjan keskelle.
mn = Vector((min(v.co.x for v in ob.data.vertices), min(v.co.y for v in ob.data.vertices), min(v.co.z for v in ob.data.vertices)))
mx = Vector((max(v.co.x for v in ob.data.vertices), max(v.co.y for v in ob.data.vertices), max(v.co.z for v in ob.data.vertices)))
siirto = Vector(((mn.x + mx.x) / 2, (mn.y + mx.y) / 2, mn.z))   # Blender Z ylös
kerroin = KORKEUS / (mx.z - mn.z) if KORKEUS > 0 and mx.z > mn.z else 1.0
for v in ob.data.vertices: v.co = (v.co - siirto) * kerroin
ob.data.update()
mn, mx = (mn - siirto) * kerroin, (mx - siirto) * kerroin

# Vienti: ei materiaaleja/kuvia (peli käyttää MuseoValaistu + vari.astcm), ei kvantisointia eikä Dracoa.
for i in range(len(ob.material_slots)): ob.active_material_index = 0; bpy.ops.object.material_slot_remove()
bpy.ops.export_scene.gltf(filepath=os.path.join(ulos, 'malli.glb'), export_format='GLB', use_selection=False,
    export_materials='NONE', export_draco_mesh_compression_enable=False, export_texcoords=True, export_normals=True,
    export_yup=True, export_apply=True)
tieto = {'kolmioita': len(ob.data.polygons), 'alkuperaisia': alkuperaisia, 'tekstuuri': tapa, 'tekstuurikoko': KOKO,
         'kerroin': round(kerroin, 6), 'mitat_m': [round(mx.x - mn.x, 4), round(mx.z - mn.z, 4), round(mx.y - mn.y, 4)]}   # leveys, korkeus, syvyys (Y ylös)
json.dump(tieto, open(os.path.join(ulos, 'veisto.json'), 'w'), ensure_ascii=False, indent=1)
print('VEISTO', json.dumps(tieto, ensure_ascii=False))
