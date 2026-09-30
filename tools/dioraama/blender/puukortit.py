# Puukorttien atlas (Linnanrakentaja 1.10.2026, ympäristön vaihe 1): mänty, kuusi ja koivu omina proseduraalisina
# malleina (ei ulkoista lähdettä), renderöity sivulta läpinäkyvälle taustalle. Natiivi piirtää puun kahtena
# ristikkäisenä korttina (Siirtoseppä: 4 kolmiota/puu, yksi atlas = yksi draw call kaikille lajeille).
#   nice -n 15 Blender -b -P puukortit.py -- <ulos-kansio> [solu 512]
# Tulos: puukortit.png (4 solua vaakaan: mänty, kuusi, koivu, varakoivu; solu leveys × 2·leveys), puukortit.json
# (solujen uv-rajat, kortin leveys/korkeus-suhde, rungon juuren kohta).
import bpy, bmesh, json, math, os, random, sys
from mathutils import Vector, noise
A = sys.argv[sys.argv.index('--') + 1:]; ULOS = A[0]; SOLU = int(A[1]) if len(A) > 1 and A[1].isdigit() else 512
# --hamara: hämäräversio (sama malli, valona kuoren hämärän taivas) → puukortit-hamara.png
HAMARA = '--hamara' in A; LOPPU = '-hamara' if HAMARA else ''
os.makedirs(ULOS, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 64; sc.render.film_transparent = True
sc.view_settings.view_transform = 'Standard'
p = bpy.context.preferences.addons['cycles'].preferences; p.compute_device_type = 'METAL'; p.get_devices()
for d in p.devices: d.use = True
sc.cycles.device = 'GPU'

def mat(nimi, vari, vaihtelu=0.15, karhe=0.8, aukot=0.0):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 18; n.inputs['Detail'].default_value = 6
    if aukot > 0:  # lehvästön aukot: läpinäkyvät kohdat hienosta kohinasta (latvus näyttää harvalta, ei möhkäleeltä)
        a = nt.nodes.new('ShaderNodeTexNoise'); a.inputs['Scale'].default_value = 9; a.inputs['Detail'].default_value = 8
        ra = nt.nodes.new('ShaderNodeValToRGB'); ra.color_ramp.elements[0].position = aukot; ra.color_ramp.elements[1].position = aukot + 0.04
        ra.color_ramp.elements[0].color = (0, 0, 0, 1); ra.color_ramp.elements[1].color = (1, 1, 1, 1)
        nt.links.new(a.outputs['Fac'], ra.inputs['Fac']); nt.links.new(ra.outputs['Color'], b.inputs['Alpha'])
    r = nt.nodes.new('ShaderNodeValToRGB'); r.color_ramp.elements[0].color = [c * (1 - vaihtelu) for c in vari] + [1]
    r.color_ramp.elements[1].color = [min(1, c * (1 + vaihtelu)) for c in vari] + [1]
    nt.links.new(n.outputs['Fac'], r.inputs['Fac']); nt.links.new(r.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = karhe
    bump = nt.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.6
    nt.links.new(n.outputs['Fac'], bump.inputs['Height']); nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def runko(h, r0, r1, m, kulma=0.0):
    bpy.ops.mesh.primitive_cone_add(vertices=10, radius1=r0, radius2=r1, depth=h, location=(0, 0, h / 2))
    o = bpy.context.object; o.data.materials.append(m); return o

def mottu(keski, sade, litteys, m, rng, kohina=0.35):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=4, radius=1, location=keski)
    o = bpy.context.object; o.scale = (sade, sade * rng.uniform(0.8, 1.2), sade * litteys)
    siirto = Vector((rng.random() * 50, rng.random() * 50, rng.random() * 50))
    for v in o.data.vertices:  # kaksi mittakaavaa: isot möhkäleet ja oksien rosoisuus
        v.co *= 1 + kohina * noise.noise(v.co * 2.2 + siirto) + 0.18 * noise.noise(v.co * 7.5 + siirto)
    for f in o.data.polygons: f.use_smooth = True
    o.data.materials.append(m); return o

def mänty(rng):
    H = 20.0; kohteet = [runko(H * 0.86, 0.32, 0.08, mat('mrunko', (0.55, 0.30, 0.16), 0.25))]
    lehvä = mat('mlehva', (0.09, 0.15, 0.06), 0.35, aukot=0.42)
    for _ in range(45):
        z = rng.uniform(H * 0.62, H * 0.97); a = rng.uniform(0, 2 * math.pi); r = rng.uniform(0.3, 2.4) * (1.15 - (z - H * 0.62) / (H * 0.4))
        kohteet.append(mottu((r * math.cos(a), r * math.sin(a), z), rng.uniform(1.0, 1.9), 0.45, lehvä, rng))
    return kohteet, H

def kuusi(rng):
    H = 22.0; kohteet = [runko(H * 0.95, 0.3, 0.05, mat('krunko', (0.28, 0.20, 0.14), 0.2))]
    lehvä = mat('klehva', (0.045, 0.095, 0.06), 0.35, aukot=0.36)
    kerroksia = 30
    for i in range(kerroksia):
        t = i / (kerroksia - 1); z = H * (0.05 + 0.93 * t); r = 3.0 * (1 - t) ** 1.05 + 0.2
        for _ in range(6):
            a = rng.uniform(0, 2 * math.pi); rr = rng.uniform(0.2, 0.75) * r
            kohteet.append(mottu((rr * math.cos(a), rr * math.sin(a), z - 0.25 * rr), r * 0.55 + 0.35, 0.55, lehvä, rng, 0.3))
    return kohteet, H

def koivu(rng):
    H = 17.0; kohteet = [runko(H * 0.9, 0.22, 0.05, mat('korunko', (0.82, 0.80, 0.74), 0.35))]
    lehvä = mat('kolehva', (0.27, 0.38, 0.11), 0.4, aukot=0.46)
    for _ in range(90):
        z = rng.uniform(H * 0.38, H * 0.98); a = rng.uniform(0, 2 * math.pi)
        u = (z - H * 0.38) / (H * 0.6); r = rng.uniform(0.2, 1.0) * 3.2 * math.sin(math.pi * min(1, u * 0.9 + 0.1))
        kohteet.append(mottu((r * math.cos(a), r * math.sin(a), z), rng.uniform(0.6, 1.1), 0.8, lehvä, rng, 0.45))
    return kohteet, H

# Valo: taivas + matala aurinko edestä-vasemmalta (sama suunta kaikilla, kortit eivät kierry kameraan päin).
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.65, 0.8, 1); w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8
su = bpy.data.lights.new('aur', 'SUN'); su.energy = 3.0; so = bpy.data.objects.new('aur', su); sc.collection.objects.link(so)
so.rotation_euler = (math.radians(55), 0, math.radians(-35))
if HAMARA:  # hämärän taivas valona, ei aurinkoa; valotus kuten kuoren hämärässä (AgX + VALOTUS)
    # sama taivas kuin kuoren hämärässä (kuori_hamara.py --tavoite): kirkkaus täsmää linnaan
    su.energy = 0.0; st = w.node_tree.nodes.new('ShaderNodeTexSky'); st.sky_type = 'MULTIPLE_SCATTERING'
    st.sun_elevation = math.radians(-1.5); st.sun_rotation = math.radians(225 - 90); st.air_density = 1.2
    if hasattr(st, 'aerosol_density'): st.aerosol_density = 2.5
    w.node_tree.links.new(st.outputs['Color'], w.node_tree.nodes['Background'].inputs['Color'])
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.9
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.view_settings.exposure = float(os.environ.get('VALOTUS', 0.6))
cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; kam = bpy.data.objects.new('k', cd); sc.collection.objects.link(kam); sc.camera = kam
kam.rotation_euler = (math.radians(90), 0, 0)
sc.render.resolution_x = SOLU; sc.render.resolution_y = 2 * SOLU
tiedot = {}; kuvat = []
for i, (nimi, f, siemen) in enumerate([('manty', mänty, 3), ('kuusi', kuusi, 5), ('koivu', koivu, 7), ('koivu2', koivu, 11)]):
    for o in [o for o in sc.objects if o.type == 'MESH']: bpy.data.objects.remove(o)
    kohteet, H = f(random.Random(siemen))
    lev = max(max(abs((o.matrix_world @ Vector(c)).x) for c in o.bound_box) for o in kohteet) * 2 * 1.05
    kork = H * 1.04; mitta = max(lev * 2, kork)  # solu on 1:2
    cd.ortho_scale = mitta; kam.location = (0, -50, mitta / 2)
    sc.render.filepath = os.path.join(ULOS, f'kortti-{nimi}{LOPPU}.png'); bpy.ops.render.render(write_still=True)
    tiedot[nimi] = {'solu': i, 'u': [i / 4, (i + 1) / 4], 'v': [0, 1], 'kortti_per_puu': round(mitta / H, 4),
                    'leveys_per_korkeus': 0.5, 'juuri_v': 0.0}
    print('KORTTI', nimi, 'puun korkeus', H, 'solun korkeus', round(mitta, 1))
# Atlas: 4 solua vierekkäin (4·SOLU × 2·SOLU).
at = bpy.data.images.new('puukortit', 4 * SOLU, 2 * SOLU, alpha=True)
import numpy as np
pix = np.zeros((2 * SOLU, 4 * SOLU, 4), np.float32)
for nimi, t in tiedot.items():
    k = bpy.data.images.load(os.path.join(ULOS, f'kortti-{nimi}{LOPPU}.png')); a = np.empty(SOLU * 2 * SOLU * 4, np.float32); k.pixels.foreach_get(a)
    pix[:, t['solu'] * SOLU:(t['solu'] + 1) * SOLU] = a.reshape(2 * SOLU, SOLU, 4)
at.pixels.foreach_set(pix.ravel()); at.filepath_raw = os.path.join(ULOS, f'puukortit{LOPPU}.png'); at.file_format = 'PNG'; at.save()
if HAMARA: print('KORTIT hämärä valmis'); sys.exit(0)
json.dump({'atlas': 'puukortit.png', 'atlas_hamara': 'puukortit-hamara.png', 'solut': 4, 'lajit': {'0': 'manty', '1': 'kuusi', '2': 'koivu'}, 'kortit': tiedot,
           'huom': 'Kortin korkeus = puun korkeus × kortti_per_puu, leveys = korkeus × leveys_per_korkeus; juuri solun alareunassa (juuri_v 0) ja keskellä vaakasuunnassa. Kaksi korttia ristiin 90°.'},
          open(os.path.join(ULOS, 'puukortit.json'), 'w'), ensure_ascii=False, indent=1)
print('KORTIT valmis', ULOS)
