# Ortografinen yläkuva kuoresta metriruudukolla tilojen sijoittelua varten (Linnanrakentaja 29.9.).
#   Blender -b -P kuori_ylakuva.py -- <kuori.glb> <ulos.png> <keski_x> <keski_pohjoinen> <leveys_m>
import bpy, sys, math
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
GLB, ULOS, cx, cy, lev = a[0], a[1], float(a[2]), float(a[3]), float(a[4])
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE' if 'BLENDER_EEVEE' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE_NEXT'
bpy.ops.import_scene.gltf(filepath=GLB)
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0
aur = bpy.data.lights.new('aur', 'SUN'); aur.energy = 4
ao = bpy.data.objects.new('aur', aur); sc.collection.objects.link(ao); ao.rotation_euler = (math.radians(30), 0, math.radians(200))
sc.view_settings.view_transform = 'Standard'
kd = bpy.data.cameras.new('k'); kd.type = 'ORTHO'; kd.ortho_scale = lev; kd.clip_end = 1000
k = bpy.data.objects.new('k', kd); sc.collection.objects.link(k); sc.camera = k
k.location = (cx, cy, 200); k.rotation_euler = (0, 0, 0)
sc.render.resolution_x = sc.render.resolution_y = 1600
sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True)
