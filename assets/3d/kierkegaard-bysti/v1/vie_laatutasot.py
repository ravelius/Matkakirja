"""Vie veistosluonnoksesta GLB:t, paista kipsin normaalit ja tarkista vienti."""
import bpy
import bmesh
import json
import sys
import struct
from pathlib import Path
from mathutils import Vector

KANSIO = Path(__file__).resolve().parent
TYO = Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/kierkegaard-bysti-20261002')
bpy.ops.wm.open_mainfile(filepath=str(TYO / 'kierkegaard-luonnos-v2.blend'))
sc = bpy.context.scene
master = bpy.data.objects['kierkegaard-master']
perusmateriaali = master.data.materials[0]

def aktivoi(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o

def kolmiot(o):
    o.data.calc_loop_triangles()
    return len(o.data.loop_triangles)

def korjaa_nollatangentit(polku):
    # Yksittainen romahtanut UV voi antaa Blenderin MikkTSpace-viennissa
    # nollatangentin. Kohtisuora yksikkotangentti tekee binaarista glTF-kelpoisen.
    b = bytearray(polku.read_bytes())
    pituus = struct.unpack_from('<I', b, 12)[0]
    g = json.loads(b[20:20+pituus])
    alku = 28 + pituus
    korjattu = 0
    for mesh in g['meshes']:
        for p in mesh['primitives']:
            if 'TANGENT' not in p['attributes']:
                continue
            a = g['accessors'][p['attributes']['TANGENT']]
            n = g['accessors'][p['attributes']['NORMAL']]
            av, nv = g['bufferViews'][a['bufferView']], g['bufferViews'][n['bufferView']]
            for i in range(a['count']):
                at = alku+av.get('byteOffset',0)+a.get('byteOffset',0)+i*av.get('byteStride',16)
                t = Vector(struct.unpack_from('<3f',b,at))
                if t.length < .1:
                    nt = alku+nv.get('byteOffset',0)+n.get('byteOffset',0)+i*nv.get('byteStride',12)
                    normal = Vector(struct.unpack_from('<3f',b,nt))
                    akseli = Vector((1,0,0)) if abs(normal.x)<.8 else Vector((0,1,0))
                    t = normal.cross(akseli).normalized()
                    struct.pack_into('<4f',b,at,t.x,t.y,t.z,1)
                    korjattu += 1
    if korjattu:
        polku.write_bytes(b)
    return korjattu

# Kipsipore paistetaan objektikoordinaateista, jotta UV-saumoihin ei tule viivaa.
sc.render.engine = 'CYCLES'
sc.cycles.device = 'CPU'
sc.cycles.samples = 8
tilastot = []
for taso, tavoite, tarkkuus in [('L0', 198000, 2048), ('L1', 50000, 1024), ('L2', 12000, 512), ('symboli', 3000, 256)]:
    o = master.copy(); o.data = master.data.copy()
    o.name = 'kierkegaard-' + taso
    bpy.context.collection.objects.link(o)
    aktivoi(o)
    m = o.modifiers.new('Laatutason kolmioraja', 'DECIMATE')
    m.ratio = min(1, tavoite / kolmiot(o))
    m.use_collapse_triangulate = True
    bpy.ops.object.modifier_apply(modifier=m.name)
    m = o.modifiers.new('Kolmioi vienti', 'TRIANGULATE')
    bpy.ops.object.modifier_apply(modifier=m.name)
    # Decimoinnin aivan pienet degeneroituneet reunat eivat kuulu toimitukseen.
    bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.dissolve_degenerate(bm, edges=list(bm.edges), dist=1e-8)
    rajat = [e for e in bm.edges if e.is_boundary]
    if rajat:
        bmesh.ops.holes_fill(bm, edges=rajat, sides=0)
    irralliset = [e for e in bm.edges if e.is_wire]
    if irralliset:
        bmesh.ops.delete(bm, geom=irralliset, context='EDGES')
    irralliset = [v for v in bm.verts if not v.link_faces]
    if irralliset:
        bmesh.ops.delete(bm, geom=irralliset, context='VERTS')
    bmesh.ops.triangulate(bm, faces=list(bm.faces))
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(o.data); bm.free()
    # Decimointi voi siirtaa aariarvoa hieman: joka taso palautetaan samaan mittaan.
    alku = min(v.co.z for v in o.data.vertices)
    korkeus = max(v.co.z for v in o.data.vertices) - alku
    for v in o.data.vertices:
        v.co.z -= alku
        v.co *= .51 / korkeus
    o.data.update()
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=1.1519, island_margin=.008, area_weight=.2)
    bpy.ops.object.mode_set(mode='OBJECT')
    mat = perusmateriaali.copy(); mat.name = 'Valkoinen mattakipsi ' + taso
    o.data.materials.clear(); o.data.materials.append(mat)
    n = mat.node_tree.nodes
    tekstuuri = bpy.data.images.new('kierkegaard-' + taso + '-nor', width=tarkkuus, height=tarkkuus, alpha=False)
    tekstuuri.colorspace_settings.name = 'Non-Color'
    img = n.new('ShaderNodeTexImage'); img.image = tekstuuri
    n.active = img
    master.hide_render = True; master.hide_set(True)
    for aiempi in bpy.data.objects:
        if aiempi.type == 'MESH' and aiempi != o:
            aiempi.hide_render = True
    o.hide_render = False
    print('PAISTO', taso, kolmiot(o), flush=True)
    bpy.ops.object.bake(type='NORMAL', normal_space='TANGENT', margin=16, use_selected_to_active=False)
    tekstuuri.filepath_raw = str(KANSIO / ('kierkegaard-' + taso + '-nor.png'))
    tekstuuri.file_format = 'PNG'; tekstuuri.save()
    shader = n.get('Principled BSDF')
    for link in list(mat.node_tree.links):
        if link.to_socket == shader.inputs['Normal']:
            mat.node_tree.links.remove(link)
    nor = n.new('ShaderNodeNormalMap')
    mat.node_tree.links.new(img.outputs['Color'], nor.inputs['Color'])
    mat.node_tree.links.new(nor.outputs['Normal'], shader.inputs['Normal'])
    # GLB:n mukana tulee vain tekstuuriin paistettu pinta, ei Blender-solmuriippuvuuksia.
    aktivoi(o)
    bpy.ops.export_scene.gltf(filepath=str(KANSIO / ('kierkegaard-' + taso + '.glb')),
        export_format='GLB', use_selection=True, export_yup=True,
        export_normals=True, export_tangents=True, export_materials='EXPORT')
    tangentit = korjaa_nollatangentit(KANSIO / ('kierkegaard-' + taso + '.glb'))
    bm = bmesh.new(); bm.from_mesh(o.data)
    tilastot.append({'taso':taso, 'kolmiot':kolmiot(o), 'korkeus_m':float(max(v.co.z for v in o.data.vertices)),
        'origo':[float(v) for v in o.location], 'ei_manifold_reunoja':sum(not e.is_manifold for e in bm.edges),
        'normaalikartta':[tarkkuus,tarkkuus], 'korjatut_nollatangentit':tangentit})
    bm.free()
    o.hide_render = True; o.hide_set(True)
    print('VIETY', taso, flush=True)
(KANSIO / 'geometria.json').write_text(json.dumps(tilastot,ensure_ascii=False,indent=2)+'\n')

# Esikatselut renderoidaan uudelleen tuodusta toimitus-GLB:sta.
for o in list(bpy.data.objects):
    if o.type == 'MESH':
        bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.import_scene.gltf(filepath=str(KANSIO / 'kierkegaard-L0.glb'))
sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x = 1200; sc.render.resolution_y = 1500
sc.render.resolution_percentage = 100
for c, tied in [('Edesta','esikatselu-edesta.png'),('Kolme neljasosaa','esikatselu-3-4.png'),('Sivulta','esikatselu-sivulta.png')]:
    sc.camera = bpy.data.objects[c]
    sc.render.filepath = str(KANSIO / tied)
    bpy.ops.render.render(write_still=True)
sc.camera = bpy.data.objects['Kolme neljasosaa']
bpy.ops.wm.save_as_mainfile(filepath=str(KANSIO / 'kierkegaard.blend'))
print('TOIMITUS_VIENTI_VALMIS',flush=True)
