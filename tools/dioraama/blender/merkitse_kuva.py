# Merkinnät suoraan kuvaan (kuvaparit ja vertailut; muistisääntö: versio, kulma ja vaihtoehto kuvaan, ei erilliseen
# selitteeseen). Ajo: Blender -b --factory-startup -P merkitse_kuva.py -- <sisään.png> <ulos.png> "teksti@x,y" ...
# x, y = vasemman yläkulman pikselit; teksti valkoisena tummalla laatikolla (Barlow Condensed, OFL).
import sys
import bpy

A = sys.argv[sys.argv.index('--') + 1:]
SISAAN, ULOS, MERKIT = A[0], A[1], A[2:]
FONTTI = '/Users/Shared/Claude/proto-3d/_lahteet/fontit/barlow-condensed/BarlowCondensed-SemiBold.ttf'
KOKO = 34

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE' if 'BLENDER_EEVEE' in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items.keys() else 'CYCLES'
sc.view_settings.view_transform = 'Standard'
img = bpy.data.images.load(SISAAN)
W, H = img.size
sc.render.resolution_x, sc.render.resolution_y = W, H
sc.render.film_transparent = False
w = bpy.data.worlds.new('m'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0


def emissio(nimi, kuva=None, vari=(1, 1, 1, 1), alfa=1.0):
    m = bpy.data.materials.new(nimi); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    o = nt.nodes.new('ShaderNodeOutputMaterial'); e = nt.nodes.new('ShaderNodeEmission')
    if kuva:
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = kuva; t.interpolation = 'Closest'
        nt.links.new(t.outputs['Color'], e.inputs['Color'])
    else:
        e.inputs['Color'].default_value = vari
    if alfa < 1:
        tr = nt.nodes.new('ShaderNodeBsdfTransparent'); mx = nt.nodes.new('ShaderNodeMixShader')
        mx.inputs[0].default_value = alfa
        nt.links.new(tr.outputs[0], mx.inputs[1]); nt.links.new(e.outputs[0], mx.inputs[2])
        nt.links.new(mx.outputs[0], o.inputs['Surface'])
    else:
        nt.links.new(e.outputs[0], o.inputs['Surface'])
    return m


# Taustakuva tasona z = 0 (1 yksikkö = 1 px), ortokamera ylhäältä.
bpy.ops.mesh.primitive_plane_add(size=1, location=(W / 2, -H / 2, 0))
tausta = bpy.context.object; tausta.scale = (W, H, 1)
tausta.data.materials.append(emissio('tausta', img))
cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; cd.ortho_scale = max(W, H)
k = bpy.data.objects.new('k', cd); sc.collection.objects.link(k); sc.camera = k
k.location = (W / 2, -H / 2, 100)
fontti = bpy.data.fonts.load(FONTTI)
for i, merkki in enumerate(MERKIT):
    teksti, paikka = merkki.rsplit('@', 1)
    x, y = (float(v) for v in paikka.split(','))
    cu = bpy.data.curves.new(f't{i}', 'FONT'); cu.body = teksti; cu.font = fontti; cu.size = KOKO
    ob = bpy.data.objects.new(f't{i}', cu); sc.collection.objects.link(ob)
    ob.location = (x + 8, -y - KOKO * 0.85, 2)
    ob.data.materials.append(emissio(f'v{i}'))
    bpy.context.view_layer.update()
    bb = [ob.matrix_world @ __import__('mathutils').Vector(c) for c in ob.bound_box]
    x0, x1 = min(v.x for v in bb) - 8, max(v.x for v in bb) + 8
    y0, y1 = min(v.y for v in bb) - 8, max(v.y for v in bb) + 8
    bpy.ops.mesh.primitive_plane_add(size=1, location=((x0 + x1) / 2, (y0 + y1) / 2, 1))
    laatikko = bpy.context.object; laatikko.scale = (x1 - x0, y1 - y0, 1)
    laatikko.data.materials.append(emissio(f'l{i}', vari=(0, 0, 0, 1), alfa=0.65))
sc.render.filepath = ULOS
if sc.render.engine == 'CYCLES':
    sc.cycles.samples = 4
bpy.ops.render.render(write_still=True)
print('MERKITTY', ULOS)
