# Esikatselukuva ulkokuoresta dioraaman yleiskamerasta (Linnanrakentaja 29.9.): kuori + vesitaso + aurinko + taivas.
#   Blender -b -P kuori_kuva.py -- <kuori.glb> <ulos.png> [atsimuutti korkeus etäisyys fov [kohde_x kohde_y]]
import bpy, math, sys
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
GLB, ULOS = a[0], a[1]
az, kk, d, fov = (float(x) for x in (a[2:6] if len(a) >= 6 else ('165', '30', '230', '32')))
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
p = bpy.context.preferences.addons['cycles'].preferences; p.compute_device_type = 'METAL'; p.get_devices()
for dv in p.devices: dv.use = True
sc.cycles.device = 'GPU'; sc.cycles.samples = 64; sc.cycles.use_denoising = True
sc.view_settings.view_transform = 'AgX'
bpy.ops.import_scene.gltf(filepath=GLB)
bpy.ops.mesh.primitive_plane_add(size=900, location=(0, 0, -7))
vesi = bpy.data.materials.new('vesi'); vesi.use_nodes = True
b = vesi.node_tree.nodes['Principled BSDF']; b.inputs['Base Color'].default_value = (0.03, 0.06, 0.08, 1)
b.inputs['Roughness'].default_value = 0.08
bpy.context.object.data.materials.append(vesi)
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
tausta = w.node_tree.nodes['Background']
taivas = w.node_tree.nodes.new('ShaderNodeTexSky'); w.node_tree.links.new(taivas.outputs['Color'], tausta.inputs['Color'])
tausta.inputs['Strength'].default_value = 0.35
aur = bpy.data.lights.new('aur', 'SUN'); aur.energy = 4.0; aur.color = (1.0, 0.9, 0.78); aur.angle = math.radians(1)
ao = bpy.data.objects.new('aur', aur); sc.collection.objects.link(ao)
atz, kor = math.radians(225), math.radians(36)
ao.rotation_euler = Vector((-math.sin(atz) * math.cos(kor), -math.cos(atz) * math.cos(kor), -math.sin(kor))).to_track_quat('-Z', 'Y').to_euler()
azr, kr = math.radians(az), math.radians(kk)
kohde = Vector((float(a[6]), float(a[7]), 2) if len(a) >= 8 else (0, 0, 2))
sij = kohde + Vector((d * math.cos(kr) * math.sin(azr), d * math.cos(kr) * math.cos(azr), d * math.sin(kr)))
kd = bpy.data.cameras.new('k'); kd.sensor_fit = 'VERTICAL'; kd.angle_y = math.radians(fov); kd.clip_end = 3000
k = bpy.data.objects.new('k', kd); sc.collection.objects.link(k); sc.camera = k
k.location = sij; k.rotation_euler = (kohde - sij).to_track_quat('-Z', 'Y').to_euler()
sc.render.resolution_x, sc.render.resolution_y = 2048, 1536
sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True)
