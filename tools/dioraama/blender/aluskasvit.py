# Aluskasvien korttiatlas (Linnanrakentaja 1.10.2026, lähimaaston laatu; Siirtoseppä: korttipareina yhtenä meshinä kuten
# puut). Omat proseduraaliset mallit, renderöity sivulta läpinäkyvälle taustalle: 0 kanerva, 1 mustikka/puolukka,
# 2 kivi (matala), 3 ruoko. Päivä- ja hämäräversio samalla valaistuksella kuin puukortit.py.
#   nice -n 15 Blender -b -P aluskasvit.py -- <ulos-kansio> [solu 256] [--hamara]
# Tulos: aluskasvit.png (4 solua vaakaan, solu neliö) tai aluskasvit-hamara.png, aluskasvit.json (solujen u-rajat,
# kortin mitta suhteessa kasvin kokoon, juuri solun alareunassa keskellä).
import bpy, json, math, os, random, sys
import numpy as np
from mathutils import Vector, noise
A = sys.argv[sys.argv.index('--') + 1:]; ULOS = A[0]; SOLU = int(A[1]) if len(A) > 1 and A[1].isdigit() else 256
HAMARA = '--hamara' in A; LOPPU = '-hamara' if HAMARA else ''
os.makedirs(ULOS, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 48; sc.render.film_transparent = True; sc.view_settings.view_transform = 'Standard'
p = bpy.context.preferences.addons['cycles'].preferences; p.compute_device_type = 'METAL'; p.get_devices()
for d in p.devices: d.use = True
sc.cycles.device = 'GPU'

def mat(nimi, vari, vaihtelu=0.3, karhe=0.8):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 25; n.inputs['Detail'].default_value = 6
    r = nt.nodes.new('ShaderNodeValToRGB'); r.color_ramp.elements[0].color = [c * (1 - vaihtelu) for c in vari] + [1]
    r.color_ramp.elements[1].color = [min(1, c * (1 + vaihtelu)) for c in vari] + [1]
    nt.links.new(n.outputs['Fac'], r.inputs['Fac']); nt.links.new(r.outputs['Color'], b.inputs['Base Color']); b.inputs['Roughness'].default_value = karhe
    return m

def mottu(keski, sade, litteys, m, rng, kohina=0.4, jako=3):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=jako, radius=1, location=keski)
    o = bpy.context.object; o.scale = (sade, sade * rng.uniform(0.8, 1.2), sade * litteys)
    siirto = Vector((rng.random() * 50, rng.random() * 50, rng.random() * 50))
    for v in o.data.vertices: v.co *= 1 + kohina * noise.noise(v.co * 3 + siirto) + 0.15 * noise.noise(v.co * 9 + siirto)
    for f in o.data.polygons: f.use_smooth = True
    o.data.materials.append(m); return o

def kanerva(rng):  # matala tupsu, ruskeanvihreä ja violetti kukinta
    k = []; lehti = mat('kanerva', (0.11, 0.12, 0.06)); kukka = mat('kukka', (0.24, 0.13, 0.20), 0.3)
    for _ in range(170):
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0, 0.3) * math.sqrt(rng.random()); h = rng.uniform(0.03, 0.28) * (1 - 0.6 * r / 0.3)
        k.append(mottu((r * math.cos(a), r * math.sin(a), h), rng.uniform(0.018, 0.035), 1.6, kukka if rng.random() < 0.12 else lehti, rng, 0.3, 2))
    return k, 0.4

def mustikka(rng):  # tiheä vihreä varpu, muutama tumma marja
    k = []; lehti = mat('mustikka', (0.10, 0.20, 0.06)); marja = mat('marja', (0.05, 0.06, 0.18), 0.2, 0.3)
    for _ in range(140):
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0, 0.32) * math.sqrt(rng.random()); h = rng.uniform(0.03, 0.3) * (1 - 0.5 * r / 0.32)
        k.append(mottu((r * math.cos(a), r * math.sin(a), h), rng.uniform(0.022, 0.042), 0.5, lehti, rng, 0.3, 2))
    for _ in range(6):
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0.05, 0.25)
        k.append(mottu((r * math.cos(a), r * math.sin(a), rng.uniform(0.08, 0.2)), 0.012, 1, marja, rng, 0.0, 2))
    return k, 0.38

def kivi(rng):  # pyöristynyt graniittilohkare, jäkälää
    m = mat('kivi', (0.07, 0.069, 0.065), 0.45, 0.9)  # tumma: päivän kortissa aurinko ylivalotti vaalean kiven
    return [mottu((0, 0, 0.18), 0.35, 0.55, m, rng, 0.25, 4)], 0.42

def ruoko(rng):  # ruokotupsu: kapeat korret
    k = []; m = mat('ruoko', (0.42, 0.40, 0.20), 0.3); mv = mat('ruokovihrea', (0.22, 0.30, 0.10), 0.3)
    for _ in range(60):
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0, 0.25); h = rng.uniform(1.2, 2.0); kal = rng.uniform(-0.25, 0.25)
        bpy.ops.mesh.primitive_cylinder_add(vertices=4, radius=0.008, depth=h, location=(r * math.cos(a), r * math.sin(a), h / 2))
        o = bpy.context.object; o.rotation_euler = (kal, rng.uniform(-0.2, 0.2), 0); o.data.materials.append(m if rng.random() < 0.6 else mv); k.append(o)
    return k, 2.0

w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.65, 0.8, 1); w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8
su = bpy.data.lights.new('aur', 'SUN'); su.energy = 3.0; so = bpy.data.objects.new('aur', su); sc.collection.objects.link(so)
so.rotation_euler = (math.radians(55), 0, math.radians(-35))
if HAMARA:  # sama taivas kuin kuoren hämärässä
    su.energy = 0.0; st = w.node_tree.nodes.new('ShaderNodeTexSky'); st.sky_type = 'MULTIPLE_SCATTERING'
    st.sun_elevation = math.radians(-1.5); st.sun_rotation = math.radians(225 - 90); st.air_density = 1.2
    if hasattr(st, 'aerosol_density'): st.aerosol_density = 2.5
    w.node_tree.links.new(st.outputs['Color'], w.node_tree.nodes['Background'].inputs['Color'])
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.9
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'; sc.view_settings.exposure = 0.6
cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; kam = bpy.data.objects.new('k', cd); sc.collection.objects.link(kam); sc.camera = kam
kam.rotation_euler = (math.radians(80), 0, 0)
sc.render.resolution_x = sc.render.resolution_y = SOLU
tiedot = {}; pix = np.zeros((SOLU, 4 * SOLU, 4), np.float32)
for i, (nimi, f, siemen) in enumerate([('kanerva', kanerva, 3), ('mustikka', mustikka, 5), ('kivi', kivi, 7), ('ruoko', ruoko, 9)]):
    for o in [o for o in sc.objects if o.type == 'MESH']: bpy.data.objects.remove(o)
    kohteet, koko = f(random.Random(siemen))
    mitta = koko * 1.9 if nimi != 'ruoko' else koko * 1.15
    cd.ortho_scale = mitta; kam.location = (0, -30 * math.cos(math.radians(10)), mitta / 2 - 0.02 + 30 * math.sin(math.radians(10)))
    sc.render.filepath = os.path.join(ULOS, f'ak-{nimi}{LOPPU}.png'); bpy.ops.render.render(write_still=True)
    im = bpy.data.images.load(sc.render.filepath); a = np.empty(SOLU * SOLU * 4, np.float32); im.pixels.foreach_get(a)
    pix[:, i * SOLU:(i + 1) * SOLU] = a.reshape(SOLU, SOLU, 4); os.remove(sc.render.filepath)
    tiedot[nimi] = {'solu': i, 'u': [i / 4, (i + 1) / 4], 'v': [0, 1], 'kortti_per_koko': round(mitta / koko, 3), 'leveys_per_korkeus': 1.0, 'juuri_v': 0.0}
at = bpy.data.images.new('aluskasvit', 4 * SOLU, SOLU, alpha=True); at.pixels.foreach_set(pix.ravel())
at.filepath_raw = os.path.join(ULOS, f'aluskasvit{LOPPU}.png'); at.file_format = 'PNG'; at.save()
if not HAMARA:
    json.dump({'atlas': 'aluskasvit.png', 'atlas_hamara': 'aluskasvit-hamara.png', 'lajit': {'0': 'kanerva', '1': 'mustikka', '2': 'kivi', '3': 'ruoko'},
               'kortit': tiedot, 'huom': 'Kortin korkeus = rivin koko × kortti_per_koko, leveys = korkeus × leveys_per_korkeus; juuri solun alareunassa keskellä. Kaksi korttia ristiin 90°.'},
              open(os.path.join(ULOS, 'aluskasvit.json'), 'w'), ensure_ascii=False, indent=1)
print('ALUSKASVIT valmis', ULOS, LOPPU)
