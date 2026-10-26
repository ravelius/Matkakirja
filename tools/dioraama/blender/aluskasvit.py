# Aluskasvien korttiatlas (Linnanrakentaja 1.10.2026, lähimaaston laatu; Siirtoseppä: korttipareina yhtenä meshinä kuten
# puut). Omat proseduraaliset mallit, renderöity sivulta läpinäkyvälle taustalle: 0 kanerva, 1 mustikka/puolukka,
# 2 kivi (matala), 3 ruoko, 4 heinä, 5 risut, 6 kataja, 7 nuori mänty, 8 nuori koivu (v2, 5 × 2 -solut, u- ja v-rajat). Päivä- ja hämäräversio samalla valaistuksella kuin puukortit.py.
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
    for _ in range(420):  # v2: hienompi (pienet oksankärjet), matala kumpu
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0, 0.32) * math.sqrt(rng.random()); h = rng.uniform(0.02, 0.24) * (1 - 0.7 * r / 0.32)
        k.append(mottu((r * math.cos(a), r * math.sin(a), h), rng.uniform(0.009, 0.018), 2.2, kukka if rng.random() < 0.08 else lehti, rng, 0.3, 1))
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

def kivi(rng):  # v2: tumma graniittilohkare jäkälälaikuin, puoliksi maahan uponnut (keskipiste maan alla)
    m = bpy.data.materials.new('kivi'); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 18; n.inputs['Detail'].default_value = 8
    r = nt.nodes.new('ShaderNodeValToRGB'); r.color_ramp.elements[0].position = 0.52; r.color_ramp.elements[1].position = 0.56
    r.color_ramp.elements[0].color = (0.055, 0.054, 0.05, 1); r.color_ramp.elements[1].color = (0.20, 0.21, 0.14, 1)  # kivi → jäkälä
    nt.links.new(n.outputs['Fac'], r.inputs['Fac']); nt.links.new(r.outputs['Color'], b.inputs['Base Color']); b.inputs['Roughness'].default_value = 0.95
    return [mottu((0, 0, -0.08), 0.36, 0.5, m, rng, 0.22, 4)], 0.46

def ruoko(rng):  # v2: tupsu, korret 0,5–2,1 m, tiheämpi keskeltä, osa taipunut
    k = []; m = mat('ruoko', (0.40, 0.37, 0.19), 0.3); mv = mat('ruokovihrea', (0.20, 0.27, 0.09), 0.3)
    for _ in range(90):
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0, 0.3) * rng.random(); h = rng.uniform(0.5, 2.1) * (1 - 0.5 * r / 0.3); kal = rng.uniform(-0.35, 0.35)
        bpy.ops.mesh.primitive_cylinder_add(vertices=4, radius=0.007, depth=h, location=(r * math.cos(a), r * math.sin(a), h / 2))
        o = bpy.context.object; o.rotation_euler = (kal, rng.uniform(-0.25, 0.25), 0); o.data.materials.append(m if rng.random() < 0.55 else mv); k.append(o)
    return k, 2.1

def heina(rng):  # heinätupsu niitylle
    k = []; m = mat('heina', (0.13, 0.19, 0.06), 0.35); mk = mat('heinakuiva', (0.30, 0.28, 0.13), 0.3)
    for _ in range(160):  # v2: vihreämpi, matalampi, leveämpi tupsu (ei heinäpaali)
        a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0, 0.2) * math.sqrt(rng.random()); h = rng.uniform(0.08, 0.4) * (1 - 0.5 * r / 0.2); kal = rng.uniform(-0.7, 0.7)
        bpy.ops.mesh.primitive_cylinder_add(vertices=3, radius=0.004, depth=h, location=(r * math.cos(a), r * math.sin(a), h / 2))
        o = bpy.context.object; o.rotation_euler = (kal, rng.uniform(-0.7, 0.7), 0); o.data.materials.append(mk if rng.random() < 0.2 else m); k.append(o)
    return k, 0.42

def risut(rng):  # maassa makaavia oksia ja risuja
    k = []; m = mat('risu', (0.20, 0.15, 0.10), 0.3)
    for _ in range(14):
        L = rng.uniform(0.2, 0.55); a = rng.uniform(0, math.pi)
        bpy.ops.mesh.primitive_cylinder_add(vertices=5, radius=rng.uniform(0.008, 0.02), depth=L, location=(rng.uniform(-0.12, 0.12), rng.uniform(-0.12, 0.12), 0.02))
        o = bpy.context.object; o.rotation_euler = (math.pi / 2 + rng.uniform(-0.2, 0.2), 0, a); o.data.materials.append(m); k.append(o)
    return k, 0.42

def kataja(rng):  # pylväsmäinen kataja 1–3 m
    k = []; m = mat('kataja', (0.07, 0.12, 0.08), 0.3)
    for _ in range(90):
        z = rng.uniform(0.05, 2.4); r = 0.45 * (1 - z / 2.7) ** 0.7 * math.sqrt(rng.random()); a = rng.uniform(0, 2 * math.pi)
        k.append(mottu((r * math.cos(a), r * math.sin(a), z), rng.uniform(0.08, 0.16), 1.4, m, rng, 0.35, 2))
    return k, 2.6

def nuori_manty(rng):  # nuori mänty 3–5 m: latvus alhaalta asti, harva
    k = []; kuori = mat('nmrunko', (0.40, 0.22, 0.12), 0.2); m = mat('nmlehva', (0.10, 0.16, 0.06), 0.35)
    bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=0.08, radius2=0.02, depth=4.2, location=(0, 0, 2.1)); o = bpy.context.object; o.data.materials.append(kuori); k.append(o)
    for _ in range(40):
        z = rng.uniform(0.8, 4.3); r = 1.1 * (1 - z / 4.6) * rng.uniform(0.3, 1); a = rng.uniform(0, 2 * math.pi)
        k.append(mottu((r * math.cos(a), r * math.sin(a), z), rng.uniform(0.25, 0.45), 0.5, m, rng, 0.35, 2))
    return k, 4.5

def nuori_koivu(rng):  # v2b: hento runko mustin laikuin, riippuvat oksat ja pienet lehdet (ei möykkyjä)
    k = []; m = mat('nklehva', (0.22, 0.32, 0.09), 0.35); oksa = mat('nkoksa', (0.18, 0.14, 0.11), 0.2)
    kuori = bpy.data.materials.new('nkrunko'); kuori.use_nodes = True; ntk = kuori.node_tree; bk = ntk.nodes['Principled BSDF']
    nk = ntk.nodes.new('ShaderNodeTexNoise'); nk.inputs['Scale'].default_value = 30; rk = ntk.nodes.new('ShaderNodeValToRGB')
    rk.color_ramp.elements[0].position = 0.56; rk.color_ramp.elements[1].position = 0.59
    rk.color_ramp.elements[0].color = (0.78, 0.76, 0.70, 1); rk.color_ramp.elements[1].color = (0.06, 0.05, 0.05, 1)
    ntk.links.new(nk.outputs['Fac'], rk.inputs['Fac']); ntk.links.new(rk.outputs['Color'], bk.inputs['Base Color'])
    bpy.ops.mesh.primitive_cone_add(vertices=8, radius1=0.045, radius2=0.01, depth=4.2, location=(0, 0, 2.1)); o = bpy.context.object; o.data.materials.append(kuori); k.append(o)
    for _ in range(24):  # riippuvat oksat
        z0 = rng.uniform(1.4, 4.1); a = rng.uniform(0, 2 * math.pi); L = 0.9 * (1 - (z0 - 1.6) / 3.0) + 0.3
        x1, y1 = L * math.cos(a), L * math.sin(a); z1 = z0 - rng.uniform(0.2, 0.7)
        bpy.ops.mesh.primitive_cylinder_add(vertices=4, radius=0.008, depth=math.dist((0, 0, z0), (x1, y1, z1)),
                                            location=(x1 / 2, y1 / 2, (z0 + z1) / 2))
        o = bpy.context.object; o.rotation_euler = Vector((x1, y1, z1 - z0)).to_track_quat('Z', 'Y').to_euler(); o.data.materials.append(oksa); k.append(o)
        for _ in range(70):  # lehtitupsut oksan varrella, painuvat alas (kortin 256 px:ssä lehti ≥ 2 px)
            t = rng.uniform(0.15, 1); px = x1 * t + rng.uniform(-0.2, 0.2); py = y1 * t + rng.uniform(-0.2, 0.2); pz = z0 + (z1 - z0) * t - rng.uniform(0, 0.5) * t
            k.append(mottu((px, py, pz), rng.uniform(0.04, 0.07), 0.45, m, rng, 0.2, 1))
    return k, 4.5

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
LAJIT = [('kanerva', kanerva, 3), ('mustikka', mustikka, 5), ('kivi', kivi, 7), ('ruoko', ruoko, 9), ('heina', heina, 11),
         ('risut', risut, 13), ('kataja', kataja, 15), ('nuori_manty', nuori_manty, 17), ('nuori_koivu', nuori_koivu, 19)]
SAR, RIV = 5, 2
tiedot = {}; pix = np.zeros((RIV * SOLU, SAR * SOLU, 4), np.float32)
for i, (nimi, f, siemen) in enumerate(LAJIT):
    for o in [o for o in sc.objects if o.type == 'MESH']: bpy.data.objects.remove(o)
    kohteet, koko = f(random.Random(siemen))
    mitta = koko * (1.15 if nimi in ('ruoko', 'kataja', 'nuori_manty', 'nuori_koivu') else 1.9)
    cd.ortho_scale = mitta; kam.location = (0, -30 * math.cos(math.radians(10)), mitta / 2 - 0.02 + 30 * math.sin(math.radians(10)))
    sc.render.filepath = os.path.join(ULOS, f'ak-{nimi}{LOPPU}.png'); bpy.ops.render.render(write_still=True)
    im = bpy.data.images.load(sc.render.filepath); a = np.empty(SOLU * SOLU * 4, np.float32); im.pixels.foreach_get(a)
    sx, sy = i % SAR, i // SAR  # rivi 0 ylhäällä (v = 1…0,5), Blenderin kuva alhaalta ylös
    pix[(RIV - 1 - sy) * SOLU:(RIV - sy) * SOLU, sx * SOLU:(sx + 1) * SOLU] = a.reshape(SOLU, SOLU, 4); os.remove(sc.render.filepath)
    tiedot[nimi] = {'solu': i, 'u': [sx / SAR, (sx + 1) / SAR], 'v': [(RIV - 1 - sy) / RIV, (RIV - sy) / RIV],
                    'kortti_per_koko': round(mitta / koko, 3), 'leveys_per_korkeus': 1.0, 'juuri_v': 0.0}
at = bpy.data.images.new('aluskasvit', SAR * SOLU, RIV * SOLU, alpha=True); at.pixels.foreach_set(pix.ravel())
at.filepath_raw = os.path.join(ULOS, f'aluskasvit{LOPPU}.png'); at.file_format = 'PNG'; at.save()
if not HAMARA:
    json.dump({'atlas': 'aluskasvit.png', 'atlas_hamara': 'aluskasvit-hamara.png', 'lajit': {str(i): n for i, (n, _, _) in enumerate(LAJIT)},
               'kortit': tiedot, 'huom': 'Kortin korkeus = rivin koko × kortti_per_koko, leveys = korkeus × leveys_per_korkeus; juuri solun alareunassa keskellä. Kaksi korttia ristiin 90°.'},
              open(os.path.join(ULOS, 'aluskasvit.json'), 'w'), ensure_ascii=False, indent=1)
print('ALUSKASVIT valmis', ULOS, LOPPU)
