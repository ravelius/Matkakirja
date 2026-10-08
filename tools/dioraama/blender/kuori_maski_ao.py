# Kuoren materiaalimaski ja AO UV0-tilaan (Linnanrakentaja 30.9.2026, laatusuunnitelman vaihe 2A ja 3).
#   kuori-materiaali-2k.png: R = seinä (kivimuuri), G = katto, B = maa/piha, A = rantakallio (painot 0–1, summa ≈ 1)
#   kuori-ao-2k.png:        ambient occlusion (harmaa), delightingiin ja kontaktivarjoihin
# Säännöt (Blender Z ylös = glTF y): kallio = alle KALLIO_Y (vesi −7) tai vino rinne alle RINNE_Y; kalteva vaakapinta
# korkealla = katto; muut vaakapinnat (piha, muurikäytävät) = maa; pystypinta = seinä. Siirtymät smoothstepillä, ettei maskiin tule portaita.
# Ajo: Blender -b --factory-startup -P kuori_maski_ao.py -- <huippu.glb> <ulos-kansio> [--koko 2048] [--ao-naytteita 64]
import os, sys
import bpy

A = sys.argv[sys.argv.index('--') + 1:]
GLB, ULOS = A[0], A[1]
KOKO = int(A[A.index('--koko') + 1]) if '--koko' in A else 2048   # Siirtoseppä: maski matalataajuinen, 2k riittää
AO_N = int(A[A.index('--ao-naytteita') + 1]) if '--ao-naytteita' in A else 64
KALLIO_Y, KATTO_Y = float(os.environ.get('KALLIO_Y', -2.5)), float(os.environ.get('KATTO_Y', 4.5))
RINNE_Y = float(os.environ.get('RINNE_Y', 1.5))   # vino pinta tätä matalammalla = kallio

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
try:
    pr = bpy.context.preferences.addons['cycles'].preferences
    pr.compute_device_type = 'METAL'; pr.get_devices()
    for d in pr.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e:
    print('GPU:', e)
bpy.ops.import_scene.gltf(filepath=GLB)
ob = [o for o in sc.objects if o.type == 'MESH'][0]
bpy.context.view_layer.objects.active = ob
ob.select_set(True)
mat = ob.active_material
nt = mat.node_tree
out = next(n for n in nt.nodes if n.type == 'OUTPUT_MATERIAL')


def smooth(arvo, a, b):
    m = nt.nodes.new('ShaderNodeMapRange'); m.interpolation_type = 'SMOOTHSTEP'
    m.inputs['From Min'].default_value = a; m.inputs['From Max'].default_value = b
    nt.links.new(arvo, m.inputs['Value'])
    return m.outputs['Result']


def math(op, a, b=None, arvo=None):
    m = nt.nodes.new('ShaderNodeMath'); m.operation = op
    nt.links.new(a, m.inputs[0])
    if b is not None: nt.links.new(b, m.inputs[1])
    elif arvo is not None: m.inputs[1].default_value = arvo
    return m.outputs[0]


geo = nt.nodes.new('ShaderNodeNewGeometry')
n = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(geo.outputs['Normal'], n.inputs[0])
p = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(geo.outputs['Position'], p.inputs[0])
def yksi_miinus(x):
    m = nt.nodes.new('ShaderNodeMath'); m.operation = 'SUBTRACT'; m.inputs[0].default_value = 1.0
    nt.links.new(x, m.inputs[1])
    return m.outputs[0]


absn = math('ABSOLUTE', n.outputs[2])
vaaka = smooth(absn, 0.55, 0.8)
# Kallio: syvällä vesirajan tuntumassa (alle KALLIO_Y) TAI matalalla vino rinne (sisäpiha on tasainen → ei kalliota).
syva = yksi_miinus(smooth(p.outputs[2], KALLIO_Y - 1.5, KALLIO_Y))
vinous = math('MULTIPLY', smooth(absn, 0.35, 0.5), yksi_miinus(smooth(absn, 0.9, 0.95)))
rinne = math('MULTIPLY', vinous, yksi_miinus(smooth(p.outputs[2], RINNE_Y - 1.5, RINNE_Y)))
kallio = math('MAXIMUM', syva, rinne)
ei_kallio = yksi_miinus(kallio)
korkea = smooth(p.outputs[2], KATTO_Y - 1.0, KATTO_Y + 1.0)
yla = math('MULTIPLY', vaaka, ei_kallio)                           # vaakapinta, ei kalliota
katto = math('MULTIPLY', math('MULTIPLY', yla, korkea), yksi_miinus(smooth(absn, 0.95, 0.985)))  # vain kalteva
maa = math('SUBTRACT', yla, katto)                                 # piha, muurikäytävät
seina = math('MULTIPLY', yksi_miinus(vaaka), ei_kallio)
yhd = nt.nodes.new('ShaderNodeCombineColor')
nt.links.new(seina, yhd.inputs[0]); nt.links.new(katto, yhd.inputs[1]); nt.links.new(maa, yhd.inputs[2])
emis = nt.nodes.new('ShaderNodeEmission'); nt.links.new(yhd.outputs[0], emis.inputs['Color'])
alfa_emis = nt.nodes.new('ShaderNodeEmission')
nt.links.new(kallio, alfa_emis.inputs['Strength']); alfa_emis.inputs['Color'].default_value = (1, 1, 1, 1)
alkup = out.inputs['Surface'].links[0].from_socket


def leivo(nimi, tyyppi, pinta, naytteita):
    img = bpy.data.images.new(nimi, KOKO, KOKO, alpha=False, float_buffer=False)
    img.colorspace_settings.name = 'Non-Color'
    kuva = nt.nodes.new('ShaderNodeTexImage'); kuva.image = img
    for x in nt.nodes: x.select = False
    kuva.select = True; nt.nodes.active = kuva
    if pinta is not None: nt.links.new(pinta, out.inputs['Surface'])
    sc.cycles.samples = naytteita
    sc.render.bake.margin = 8
    bpy.ops.object.bake(type=tyyppi, margin=8, use_clear=True)
    img.filepath_raw = os.path.join(ULOS, f'{nimi}.png'); img.file_format = 'PNG'; img.save()
    print('LEIVOTTU', img.filepath_raw)
    return img


os.makedirs(ULOS, exist_ok=True)
leivo('_rgb', 'EMIT', emis.outputs[0], 1)
leivo('_kallio', 'EMIT', alfa_emis.outputs[0], 1)
nt.links.new(alkup, out.inputs['Surface'])
sc.world = bpy.data.worlds.new('ao')
sc.world.light_settings.distance = float(A[A.index('--ao-etaisyys') + 1]) if '--ao-etaisyys' in A else 3.0  # 5.10.: kontakti-AO 0,5 m
leivo(f'kuori-ao-{KOKO // 1024}k', 'AO', None, AO_N)

# Yhdistetään RGB + kallio (A) yhdeksi RGBA-maskiksi.
import numpy as np
r = bpy.data.images.load(os.path.join(ULOS, '_rgb.png')); k = bpy.data.images.load(os.path.join(ULOS, '_kallio.png'))
a = np.empty(KOKO * KOKO * 4, np.float32); r.pixels.foreach_get(a)
b = np.empty(KOKO * KOKO * 4, np.float32); k.pixels.foreach_get(b)
a = a.reshape(-1, 4); a[:, 3] = b.reshape(-1, 4)[:, 0]
m = bpy.data.images.new('maski', KOKO, KOKO, alpha=True); m.colorspace_settings.name = 'Non-Color'
m.pixels.foreach_set(a.ravel()); m.alpha_mode = 'STRAIGHT'
m.filepath_raw = os.path.join(ULOS, f'kuori-materiaali-{KOKO // 1024}k.png'); m.file_format = 'PNG'; m.save()
for f in ('_rgb.png', '_kallio.png'):
    os.remove(os.path.join(ULOS, f))
print('MASKI', m.filepath_raw)
