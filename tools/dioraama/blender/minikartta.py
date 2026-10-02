# Olavinlinnan pienoiskartta (Linnanrakentaja 2.10.2026; omistaja 14.44: takaisin-napin tilalle pienoiskartta).
# Kuori (glb) yleiskameran vaakakulmasta, läpinäkyvä tausta, Cycles; huonepisteet projisoidaan kuvaan.
# Koordinaatit: rakennus.json on Unityn (glb z-peilattu, DioraamaGlb) → Blender (x, y, z) = (ux, uz, uy).
#   Blender -b -P minikartta.py -- <ulkokuori.glb> <rakennus.json> <ulos-kansio> [koko 1024] [naytteita 64]
import bpy, json, math, os, sys
from mathutils import Vector
from bpy_extras.object_utils import world_to_camera_view
A = sys.argv[sys.argv.index('--') + 1:]; GLB, RJ, ULOS = A[:3]; KOKO = int(A[3]) if len(A) > 3 else 1024
N = int(A[4]) if len(A) > 4 else 64
os.makedirs(ULOS, exist_ok=True); R = json.load(open(RJ))
U = lambda p: Vector((p[0], p[2], p[1]))
bpy.ops.wm.read_factory_settings(use_empty=True); bpy.ops.import_scene.gltf(filepath=GLB)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = N; sc.cycles.use_denoising = True
try:
    pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
    for dv in pr.devices: dv.use = True
    sc.cycles.device = 'GPU'
except Exception as e: print('GPU:', e)
sc.render.film_transparent = True; sc.render.resolution_x = sc.render.resolution_y = KOKO
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.75, 0.8, 0.9, 1)
au = bpy.data.lights.new('aurinko', 'SUN'); au.energy = 3.2; au.angle = math.radians(2); au.color = (1.0, 0.95, 0.86)
ao = bpy.data.objects.new('aurinko', au); sc.collection.objects.link(ao); ao.rotation_euler = (math.radians(50), 0, math.radians(200))
# kamera: yleiskamera.vaaka (kohteesta kameraan: x = ck·sin a, y = sin k, z = −ck·cos a Unityssä)
yk = R['yleiskamera']['vaaka']; k, a = math.radians(yk['korkeus']), math.radians(yk['atsimuutti']); ck = math.cos(k)
suunta = U((ck * math.sin(a), math.sin(k), -ck * math.cos(a))).normalized(); kohde = U(yk['kohde'])
cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
cam.location = kohde + suunta * 400; cam.rotation_euler = (-suunta).to_track_quat('-Z', 'Y').to_euler(); cd.clip_end = 2000
# rajaus: kuoren kärjet kameran tasoon (vain vedenpinnan yläpuolelta), neliö + 4 % reunus
bpy.context.view_layer.update(); M = cam.matrix_world.inverted()
xs, ys = [], []
for o in sc.objects:
    if o.type != 'MESH': continue
    for v in o.data.vertices:
        p = o.matrix_world @ v.co
        if p.z < -6.5: continue
        q = M @ p; xs.append(q.x); ys.append(q.y)
cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2; cd.ortho_scale = max(max(xs) - min(xs), max(ys) - min(ys)) * 1.08
cam.location = cam.matrix_world @ Vector((cx, cy, 0)); bpy.context.view_layer.update()
tilat = {}
for t in R['tilat']:
    if t['id'] in ('massa', 'tunnelma'): continue
    mn, mx = Vector(t['rajat']['min']), Vector(t['rajat']['max']); kesk = U((mn + mx) / 2)
    p = world_to_camera_view(sc, cam, kesk)
    tilat[t['id']] = {'nimi': t['nimi'], 'x': round(p.x, 4), 'y': round(1 - p.y, 4)}
json.dump({'kuva': 'olavinlinna-minikartta.png', 'koordinaatit': 'x, y = 0–1 kuvan vasemmasta yläkulmasta (rajojen keskipiste)',
           'kamera': 'yleiskamera.vaaka (atsimuutti %d, korkeus %d), ortografinen' % (yk['atsimuutti'], yk['korkeus']), 'tilat': tilat},
          open(os.path.join(ULOS, 'olavinlinna-minikartta.json'), 'w'), ensure_ascii=False, indent=1)
sc.render.filepath = os.path.join(ULOS, 'olavinlinna-minikartta.png'); bpy.ops.render.render(write_still=True)
print('MINIKARTTA', ULOS, tilat)
