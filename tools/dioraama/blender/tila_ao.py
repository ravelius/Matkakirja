# Kontakti-AO leivottujen tilojen valo-UV:lle (Linnanrakentaja 5.10.2026, Päätoimittajan linnan ilmeen A/B, vaihtoehto b/c).
# Leipoo AO:n valmiin tilan glb:n TEXCOORD_1:lle (sama UV kuin valoatlaksella), jolloin glb pysyy ennallaan ja AO voidaan
# kertoa nykyisiin päivä- ja hämäräatlaksiin (kuori_ao_kerroin.py). Tila yksin varjostaa itseään (nurkat, kalusteiden juuret).
#   Blender -b --factory-startup -P tila_ao.py -- <tilat/keittio.glb> <ulos.png> [--koko 4096] [--naytteita 128] [--etaisyys 0.3]
import bpy, os, sys
A = sys.argv[sys.argv.index('--') + 1:]
GLB, ULOS = A[0], A[1]
KOKO = int(A[A.index('--koko') + 1]) if '--koko' in A else 4096
N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 128
ET = float(A[A.index('--etaisyys') + 1]) if '--etaisyys' in A else 0.3
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
bpy.ops.import_scene.gltf(filepath=GLB)
sc.render.engine = 'CYCLES'; sc.cycles.samples = N
try:
    pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
    for dv in pr.devices: dv.use = True
    sc.cycles.device = 'GPU'
except Exception as e:
    print('GPU:', e)
w = bpy.data.worlds.new('w'); sc.world = w; w.light_settings.distance = ET
kuva = bpy.data.images.new('ao', KOKO, KOKO, float_buffer=True)
omat = [o for o in sc.objects if o.type == 'MESH']
for o in omat:
    uv = o.data.uv_layers
    if len(uv) < 2: print('TILA-AO: ei TEXCOORD_1:tä', o.name); continue
    uv.active = uv[1]                                      # bake kirjoittaa aktiiviselle UV:lle = valoatlaksen UV
    for s in o.material_slots:
        m = s.material
        if not m: continue
        m.use_nodes = True
        if not any(n.type == 'TEX_IMAGE' and n.image == kuva for n in m.node_tree.nodes):
            n = m.node_tree.nodes.new('ShaderNodeTexImage'); n.image = kuva; m.node_tree.nodes.active = n
bpy.ops.object.select_all(action='DESELECT')
for o in omat: o.select_set(True)
bpy.context.view_layer.objects.active = omat[0]
sc.render.bake.margin = 6
bpy.ops.object.bake(type='AO', margin=6, use_clear=True)
kuva.filepath_raw = ULOS; kuva.file_format = 'PNG'; kuva.save()
print('TILA-AO:', os.path.basename(GLB), KOKO, 'näytteitä', N, 'etäisyys', ET, '→', ULOS)
