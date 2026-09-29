# Kuoren iltahämärätekstuuri (Linnanrakentaja 29.9., omistajan tunnelmapyyntö): fotogrammetrian värikuva × uusi valaistus
# (tumma sininen taivas, matala oranssi aurinko, tunnelma-tilan soihdut ja lyhdyt pistevaloina) leivotaan kuoren omaan
# UV:hen (sama UV kaikilla laatutasoilla). Tulos näytetään Unityssä valaisemattomana kuten tilojen valoatlas.
#   nice -n 15 Blender -b -P kuori_hamara.py -- <kuori.glb> <rakennus.json> <ulos-kansio> [näytteet 128] [koko 4096]
import bpy, json, math, os, sys
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
GLB, RAK, ULOS = a[0], a[1], a[2]
NAYTTEET = int(a[3]) if len(a) > 3 else 128
KOKO = int(a[4]) if len(a) > 4 else 4096
os.makedirs(ULOS, exist_ok=True)

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)
bl = lambda p: (p[0], -p[2], p[1])  # glTF → Blender

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
for d in pr.devices: d.use = True
sc.cycles.device = 'GPU'; sc.cycles.samples = NAYTTEET; sc.view_settings.view_transform = 'AgX'
bpy.ops.import_scene.gltf(filepath=GLB)
kuori = next(o for o in sc.objects if o.type == 'MESH')

# Valaistus: sama iltahämärä kuin leivo_tila.py --hamara.
w = bpy.data.worlds.new('ilta'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (*srgb('#34466e'), 1)
w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.45
aur = bpy.data.lights.new('aurinko', 'SUN'); aur.energy = 2.2 * 0.3; aur.color = srgb('#ff9a5c'); aur.angle = math.radians(1.5)
ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
atz, kor = math.radians(225), math.radians(4)
ao.rotation_euler = Vector((-math.sin(atz) * math.cos(kor), -math.cos(atz) * math.cos(kor), -math.sin(kor))).to_track_quat('-Z', 'Y').to_euler()
rak = json.load(open(RAK))
tunnelma = next(t for t in rak['tilat'] if t['id'] == 'tunnelma')
for i, lv in enumerate(tunnelma.get('valot', [])):
    if lv.get('voima', 1) < 0.75:
        continue  # reseptien pienet lähivalot (sade 1,4) eivät valaise muuria
    d = bpy.data.lights.new(f'v{i}', 'POINT'); d.energy = 260.0 * lv['voima']; d.color = srgb(lv.get('vari', '#ff9848'))
    d.shadow_soft_size = 0.15
    o = bpy.data.objects.new(f'v{i}', d); sc.collection.objects.link(o); o.location = bl(lv['paikka'])

# Leivontakohde: uusi kuva kuoren materiaaliin aktiiviseksi solmuksi (UV0 = valokuvan UV).
kuva = bpy.data.images.new('kuori_hamara', KOKO, KOKO, float_buffer=True)
for s in kuori.material_slots:
    nt = s.material.node_tree; n = nt.nodes.new('ShaderNodeTexImage'); n.image = kuva; nt.nodes.active = n
bpy.ops.object.select_all(action='DESELECT'); kuori.select_set(True); bpy.context.view_layer.objects.active = kuori
sc.render.bake.margin = 4
import time; t0 = time.time()
bpy.ops.object.bake(type='COMBINED')
print('HAMARA: leivonta', round(time.time() - t0, 1), 's')
sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 90
p4 = os.path.join(ULOS, f'ulkokuori-hamara-{KOKO // 1024}k.jpg')
kuva.save_render(p4, scene=sc)
k2 = bpy.data.images.load(p4); k2.scale(KOKO // 2, KOKO // 2)
k2.filepath_raw = os.path.join(ULOS, f'ulkokuori-hamara-{KOKO // 2048}k.jpg'); k2.file_format = 'JPEG'; k2.save(quality=90)
print('HAMARA: valmis', p4)
