# Kuoren iltahämärätekstuuri (Linnanrakentaja 29.9., omistajan tunnelmapyyntö): fotogrammetrian värikuva × uusi valaistus
# (tumma sininen taivas, matala oranssi aurinko, tunnelma-tilan soihdut ja lyhdyt pistevaloina) leivotaan kuoren omaan
# UV:hen (sama UV kaikilla laatutasoilla). Tulos näytetään Unityssä valaisemattomana kuten tilojen valoatlas.
#   nice -n 15 Blender -b -P kuori_hamara.py -- <kuori.glb> <rakennus.json> <ulos-kansio> [näytteet 128] [koko 4096]
#     [--tavoite] [--albedo <8k-albedo.png>]
# --tavoite (laatusuunnitelman vaihe 4, 30.9.): tavoitekuvan valaistus eli Blenderin taivas (aurinko 1,5° horisontin alla
#   lounaassa) ja ulkosoihdut rakennus.json:n liekkipisteistä (tunnelma, laituri, muurinharja; SOIHTU_W 450 W), AgX-sävytys
#   kuten tavoitekuva.py (VALOTUS 0.6). --albedo: leivotaan pelkkä valo (DIFFUSE, suora + epäsuora, ilman väriä) koon
#   mukaan ja kerrotaan albedolla sen omassa koossa (esim. 4k-valo × 8k Real-ESRGAN-albedo → hamara-8k), jolloin 8k:n
#   terävyys säilyy ilman 8k-leivontaa. Valokartta tallentuu myös erikseen (ulkokuori-valokartta-<koko>.exr, lineaarinen).
import bpy, json, math, os, sys
import numpy as np
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
def lippu(n, oletus=None):
    if n in a:
        i = a.index(n); v = a[i + 1]; del a[i:i + 2]; return v
    return oletus
ALBEDO = lippu('--albedo')
TAVOITE = '--tavoite' in a
if TAVOITE: a.remove('--tavoite')
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

rak = json.load(open(RAK))
if TAVOITE:
    # Valaistus: tavoitekuva.py:n hämäräilta (sama taivas ja soihdut, omistajan hyväksymä tavoite 30.9.).
    sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.view_settings.exposure = float(os.environ.get('VALOTUS', 0.6))
    w = bpy.data.worlds.new('hamara'); w.use_nodes = True; sc.world = w
    st = w.node_tree.nodes.new('ShaderNodeTexSky'); st.sky_type = 'MULTIPLE_SCATTERING'
    st.sun_elevation = math.radians(float(os.environ.get('AURINKO', -1.5))); st.sun_rotation = math.radians(225 - 90)
    st.air_density = 1.2
    if hasattr(st, 'aerosol_density'): st.aerosol_density = 2.5
    bg = w.node_tree.nodes['Background']; bg.inputs['Strength'].default_value = float(os.environ.get('TAIVAS', 0.9))
    w.node_tree.links.new(st.outputs['Color'], bg.inputs['Color'])
    n = 0
    for t in rak['tilat']:
        if t['id'] not in ('tunnelma', 'laituri', 'muurinharja'): continue
        for lk in t.get('liekit', []):
            if lk.get('liekki') != 'soihtu': continue
            x, y, z = lk['paikka']
            d = bpy.data.lights.new('soihtu', 'POINT'); d.energy = float(os.environ.get('SOIHTU_W', 450)); d.color = (1.0, 0.55, 0.22)
            d.shadow_soft_size = 0.35  # muurin vieressä 700 W / 0,15 m paloi valkoiseksi (30.9.)
            o = bpy.data.objects.new('soihtu', d); sc.collection.objects.link(o); o.location = bl((x, y + 0.15, z)); n += 1
    print('HAMARA: tavoitevalaistus, soihtuja', n)
else:
    # Valaistus: sama iltahämärä kuin leivo_tila.py --hamara.
    w = bpy.data.worlds.new('ilta'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (*srgb('#34466e'), 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.45
    aur = bpy.data.lights.new('aurinko', 'SUN'); aur.energy = 2.2 * 0.3; aur.color = srgb('#ff9a5c'); aur.angle = math.radians(1.5)
    ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
    atz, kor = math.radians(225), math.radians(4)
    ao.rotation_euler = Vector((-math.sin(atz) * math.cos(kor), -math.cos(atz) * math.cos(kor), -math.sin(kor))).to_track_quat('-Z', 'Y').to_euler()
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
if ALBEDO:
    # Pelkkä valo (irradianssi) ja kertominen albedolla sen omassa koossa.
    b = sc.render.bake; b.use_pass_direct = True; b.use_pass_indirect = True; b.use_pass_color = False
    bpy.ops.object.bake(type='DIFFUSE')
    print('HAMARA: valoleivonta', round(time.time() - t0, 1), 's')
    ims = sc.render.image_settings; ims.file_format = 'OPEN_EXR'; ims.color_depth = '16'; ims.exr_codec = 'DWAA'
    kuva.save_render(os.path.join(ULOS, f'ulkokuori-valokartta-{KOKO // 1024}k.exr'), scene=sc)  # lineaarinen, puolitarkkuus
    alb = bpy.data.images.load(ALBEDO); A = alb.size[0]
    pa = np.empty(A * A * 4, np.float32); alb.pixels.foreach_get(pa); pa = pa.reshape(A, A, 4)[..., :3]
    bpy.data.images.remove(alb)
    pa = np.where(pa <= 0.04045, pa / 12.92, ((pa + 0.055) / 1.055) ** 2.4)  # tavukuvan pikselit ovat sRGB-arvoja
    if A != KOKO:
        kuva.scale(A, A)  # valokartta albedon kokoon (bilineaarinen)
    pv = np.empty(A * A * 4, np.float32); kuva.pixels.foreach_get(pv); pv = pv.reshape(A, A, 4)
    pv[..., :3] *= pa; pv[..., 3] = 1; del pa
    tulos = bpy.data.images.new('kuori_hamara_tulos', A, A, float_buffer=True); tulos.pixels.foreach_set(pv.ravel()); del pv
    KOKO = A; kuva = tulos
else:
    bpy.ops.object.bake(type='COMBINED')
print('HAMARA: leivonta', round(time.time() - t0, 1), 's')
sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 90; sc.render.image_settings.color_depth = '8'
p4 = os.path.join(ULOS, f'ulkokuori-hamara-{KOKO // 1024}k.jpg')
kuva.save_render(p4, scene=sc)
koko = KOKO
while koko > 2048:
    k2 = bpy.data.images.load(os.path.join(ULOS, f'ulkokuori-hamara-{koko // 1024}k.jpg')); koko //= 2; k2.scale(koko, koko)
    k2.filepath_raw = os.path.join(ULOS, f'ulkokuori-hamara-{koko // 1024}k.jpg'); k2.file_format = 'JPEG'; k2.save(quality=90)
    bpy.data.images.remove(k2)
print('HAMARA: valmis', p4)
