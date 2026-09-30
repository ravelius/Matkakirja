# Olavinlinnan ulkokuori Senaatin fotogrammetriasta (Linnanrakentaja 29.9.2026, omistajan "uusi tapa").
# Lähde: Olavinlinna by Senaatti-kiinteistöt – Senate Properties, CC BY 4.0 (Sketchfab, 2021), ks. LAHDE.md.
# Tuo OBJ:n (Rhino, Z ylös), poistaa veden (materiaali 'Custom'; peli piirtää veden itse), siirtää saaren keskelle
# ja vedenpinnan korkeudelle VESI_Y (dioraaman koordinaatisto: vesi y −7), keventää LOD-tasoiksi ja vie glb:t.
# Lisäksi yläkuva (ortografinen, pohjoinen ylös) ja yleiskuva dioraaman yleiskamerasta tilojen sijoittelua varten.
#   nice -n 15 Blender -b -P tools/dioraama/blender/ulkokuori.py -- <obj> <ulos> [--lod 200000,60000,20000] [--siivoa]
#   --siivoa: poistaa restauroinnin työmaaromun (kuori_siivous.py) keskityksen jälkeen ja tallentaa tekstuuri_siivottu.png.
import bpy, math, os, sys, time
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
OBJ, ULOS = a[0], a[1]
LOD = [int(x) for x in (a[a.index('--lod') + 1] if '--lod' in a else '1400000,400000,150000').split(',')]
NIMET = ['huippu', 'normaali', 'kevyt']
VESI_Y = -7.0
os.makedirs(ULOS, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.obj_import(filepath=OBJ, forward_axis='Y', up_axis='Z')
o = next(x for x in bpy.data.objects if x.type == 'MESH')
bpy.context.view_layer.objects.active = o; o.select_set(True)
me = o.data

# Veden korkeus ja poisto (materiaali 'Custom').
vesi_i = next(i for i, s in enumerate(o.material_slots) if s.material and s.material.name.startswith('Custom'))
vesi_z = [me.vertices[v].co.z for p in me.polygons if p.material_index == vesi_i for v in p.vertices]
vesi = sum(vesi_z) / len(vesi_z)
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT')
o.active_material_index = vesi_i; bpy.ops.object.material_slot_select(); bpy.ops.mesh.delete(type='FACE')
bpy.ops.object.mode_set(mode='OBJECT')
o.active_material_index = vesi_i; bpy.ops.object.material_slot_remove()

# Keskitys: saaren XY-keskipiste origoon, vedenpinta VESI_Y:hyn.
xs = [v.co.x for v in me.vertices]; ys = [v.co.y for v in me.vertices]; zs = [v.co.z for v in me.vertices]
cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
siirto = Vector((-cx, -cy, VESI_Y - vesi))
me.transform(__import__('mathutils').Matrix.Translation(siirto))
me.update()
print(f'KUORI: vesi {vesi:.2f} → {VESI_Y}, keskitys ({cx:.1f}, {cy:.1f}), koko x {max(xs)-min(xs):.1f} y {max(ys)-min(ys):.1f} '
      f'korkeus {min(zs)-vesi:.1f}…{max(zs)-vesi:.1f} m vedestä, kolmioita {sum(len(p.vertices)-2 for p in me.polygons)}')

# Valinnainen siivous: työmaaromu pois geometriasta ja tekstuurista (ennen 2k-kopiota ja LOD-vientiä).
if '--siivoa' in a:
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    import kuori_siivous
    _k = next(im for im in bpy.data.images if 'diffuse' in im.name)
    kuori_siivous.siivoa(o, _k)
    kuori_siivous.tallenna_kuva(_k, os.path.join(ULOS, 'tekstuuri_siivottu.png'))

# Tekstuuri: 4k alkuperäinen LOD0:lle, 2k muille (JPEG vientiin).
kuva = next(im for im in bpy.data.images if 'diffuse' in im.name)
kuva2k = kuva.copy(); kuva2k.scale(2048, 2048); kuva2k.name = 'kuori_2k'

# Kuvat ennen kevennystä: yläkuva ja yleiskuva (Eevee, nopea).
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE' if 'BLENDER_EEVEE' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE_NEXT'
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0
aur = bpy.data.lights.new('aur', 'SUN'); aur.energy = 3; ao = bpy.data.objects.new('aur', aur); sc.collection.objects.link(ao)
ao.rotation_euler = (math.radians(50), 0, math.radians(135))
def kuvaa(nimi, sij, kohde, orto=None, res=(1600, 1200)):
    kd = bpy.data.cameras.new(nimi)
    if orto: kd.type = 'ORTHO'; kd.ortho_scale = orto
    else: kd.lens = 50
    kd.clip_end = 2000
    k = bpy.data.objects.new(nimi, kd); sc.collection.objects.link(k); sc.camera = k
    k.location = sij
    k.rotation_euler = (Vector(kohde) - Vector(sij)).to_track_quat('-Z', 'Y').to_euler()
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.render.filepath = os.path.join(ULOS, nimi + '.png'); bpy.ops.render.render(write_still=True)
if '--kuvat' in a:
    kuvaa('ylakuva', (0, 0, 300), (0, 0, 0), orto=260)
# Dioraaman yleiskamera (atsimuutti 165 = kamera etelä-kaakossa, korkeus 30°, etäisyys 150): Blender y = pohjoinen.
if '--kuvat' in a:
    az, kk, d = math.radians(165), math.radians(30), 170
    kuvaa('yleis', (d * math.cos(kk) * math.sin(az), d * math.cos(kk) * math.cos(az), d * math.sin(kk)), (0, 0, 0), res=(1600, 900))

# LOD-tasot: Decimate (collapse) kopioihin, vienti glb:nä.
for i, kohde in enumerate(LOD):
    k = o.copy(); k.data = o.data.copy(); sc.collection.objects.link(k)
    nyt = sum(len(p.vertices) - 2 for p in k.data.polygons)
    mod = k.modifiers.new('kevennys', 'DECIMATE'); mod.ratio = min(1.0, kohde / nyt)
    bpy.ops.object.select_all(action='DESELECT'); k.select_set(True); bpy.context.view_layer.objects.active = k
    t = time.time(); bpy.ops.object.modifier_apply(modifier=mod.name)
    if i == 2:
        for n in k.active_material.node_tree.nodes:
            if n.type == 'TEX_IMAGE': n.image = kuva2k
    polku = os.path.join(ULOS, f'ulkokuori_{NIMET[i]}.glb')
    bpy.ops.export_scene.gltf(filepath=polku, use_selection=True, export_format='GLB', export_image_format='JPEG',
                              export_jpeg_quality=88, export_texcoords=True, export_normals=True, export_materials='EXPORT')
    print(f'KUORI: {NIMET[i]} {sum(len(p.vertices)-2 for p in k.data.polygons)} kolmiota, {os.path.getsize(polku)/1e6:.1f} Mt, '
          f'{time.time()-t:.1f} s')
    if i == 2:
        for n in k.active_material.node_tree.nodes:
            if n.type == 'TEX_IMAGE': n.image = kuva
    bpy.data.objects.remove(k)
