# Tunnelman esikatselu Unityn tapaan (Linnanrakentaja 29.9.): kuori valaisemattomana annetusta tekstuurista, tunnelma.glb
# valoatlas UV1:llä emissiona, liekkityhjille pienet hehkupallot, iltataivas ja tumma järvi.
#   Blender -b -P tunnelma_kuva.py -- <kuori.glb> <kuoritekstuuri.jpg> <tunnelma.glb|-> <atlas.jpg|-> <ulos.png>
#     [atsimuutti korkeus etäisyys fov [kohde_x kohde_y]] [--paiva]
import bpy, math, sys
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
PAIVA = '--paiva' in a; a = [x for x in a if x != '--paiva']
SYTTYNEET = 1.0  # --syttyneet 0.6: vain osa liekeistä palaa (saapuminen, soihdut syttymässä)
if '--syttyneet' in a:
    i_ = a.index('--syttyneet'); SYTTYNEET = float(a[i_ + 1]); del a[i_:i_ + 2]
GLB, TEX, TGLB, ATLAS, ULOS = a[:5]
az, kk, d, fov = (float(x) for x in (a[5:9] if len(a) >= 9 else ('165', '30', '230', '32')))
kohde = Vector((float(a[9]), float(a[10]), 2) if len(a) >= 11 else (0, 0, 2))
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
for dv in pr.devices: dv.use = True
sc.cycles.device = 'GPU'; sc.cycles.samples = 48; sc.cycles.use_denoising = True
sc.view_settings.view_transform = 'Standard'

def valaisematon(o, kuva, uv=None):
    m = bpy.data.materials.new('u'); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = kuva
    if uv:
        u = nt.nodes.new('ShaderNodeUVMap'); u.uv_map = uv; nt.links.new(u.outputs['UV'], t.inputs['Vector'])
    e = nt.nodes.new('ShaderNodeEmission'); out = nt.nodes.new('ShaderNodeOutputMaterial')
    nt.links.new(t.outputs['Color'], e.inputs['Color']); nt.links.new(e.outputs['Emission'], out.inputs['Surface'])
    o.data.materials.clear(); o.data.materials.append(m)

bpy.ops.import_scene.gltf(filepath=GLB)
kuori = [o for o in sc.objects if o.type == 'MESH']
for o in kuori: valaisematon(o, bpy.data.images.load(TEX))
if TGLB != '-':
    ennen = set(sc.objects); bpy.ops.import_scene.gltf(filepath=TGLB)
    uudet = [o for o in sc.objects if o not in ennen]
    at = bpy.data.images.load(ATLAS)
    for o in uudet:
        if o.type == 'MESH':
            valaisematon(o, at, uv=o.data.uv_layers[-1].name)
        elif o.name.startswith('liekki:') and not PAIVA and (hash(o.name) % 100) / 100 < SYTTYNEET:
            r = 0.12 if 'soihtu' in o.name else 0.05
            bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=o.matrix_world.translation)
            p = bpy.context.object; m = bpy.data.materials.new('liekki'); m.use_nodes = True
            b = m.node_tree.nodes['Principled BSDF']; b.inputs['Emission Color'].default_value = (1, 0.45, 0.12, 1)
            b.inputs['Emission Strength'].default_value = 60; p.data.materials.append(m)
# Järvi ja taivas.
bpy.ops.mesh.primitive_plane_add(size=1200, location=(0, 0, -7))
vm = bpy.data.materials.new('vesi'); vm.use_nodes = True; vb = vm.node_tree.nodes['Principled BSDF']
vb.inputs['Base Color'].default_value = (0.01, 0.02, 0.035, 1) if not PAIVA else (0.03, 0.06, 0.08, 1)
vb.inputs['Roughness'].default_value = 0.06; bpy.context.object.data.materials.append(vm)
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.04, 0.06, 0.12, 1) if not PAIVA else (0.55, 0.65, 0.8, 1)
if not PAIVA:  # iltataivas: lämmin horisontti → tumma sininen lakipiste
    nt = w.node_tree; tc = nt.nodes.new('ShaderNodeTexCoord'); sx = nt.nodes.new('ShaderNodeSeparateXYZ')
    cr = nt.nodes.new('ShaderNodeValToRGB'); e0, e1 = cr.color_ramp.elements
    e0.position, e0.color = 0.0, (0.55, 0.25, 0.12, 1); e1.position, e1.color = 0.35, (0.02, 0.03, 0.08, 1)
    m_ = cr.color_ramp.elements.new(0.08); m_.color = (0.12, 0.13, 0.24, 1)
    nt.links.new(tc.outputs['Generated'], sx.inputs['Vector']); nt.links.new(sx.outputs['Z'], cr.inputs['Fac'])
    nt.links.new(cr.outputs['Color'], nt.nodes['Background'].inputs['Color'])
w.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0
azr, kr = math.radians(az), math.radians(kk)
sij = kohde + Vector((d * math.cos(kr) * math.sin(azr), d * math.cos(kr) * math.cos(azr), d * math.sin(kr)))
kd = bpy.data.cameras.new('k'); kd.sensor_fit = 'VERTICAL'; kd.angle_y = math.radians(fov); kd.clip_end = 3000
k = bpy.data.objects.new('k', kd); sc.collection.objects.link(k); sc.camera = k
k.location = sij; k.rotation_euler = (kohde - sij).to_track_quat('-Z', 'Y').to_euler()
sc.render.resolution_x, sc.render.resolution_y = 1600, 1000
sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True)
