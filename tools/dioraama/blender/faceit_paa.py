# Faceit ilman käyttöliittymää (Linnanrakentaja 6.10.2026): rekisteröinti, maamerkit mittauksista, projektio, riggi, sidonta,
# ARKit-ilmeet ja leivonta muotoavaimiksi; vain ~16 tarvittavaa muotoa jää. Faceit 2.3.73 (omistajan lisenssi, ei repoon).
#   Blender -b -P faceit_paa.py -- <hahmo_paa.glb> <ulos.glb> [--blend tallennus.blend]
# Maamerkit (Faceitin 41 pisteen symmetrinen pohja, +X = hahmon vasen): mitattu UBC-miespäästä (kasvomitta.py, 6.10.):
# keskiprofiili, huulirako, silmämunat (Eyes), kulmakarvat (Eyebrows) ja ääriviiva.
import bpy, sys, addon_utils
from mathutils import Vector
A = sys.argv[sys.argv.index('--') + 1:]; GLB, ULOS = A[0], A[1]; BLEND = A[A.index('--blend') + 1] if '--blend' in A else None
addon_utils.enable('bl_ext.user_default.faceit', default_set=True)
from bl_ext.user_default.faceit.core import faceit_utils as futils, faceit_data as fdata
bpy.ops.wm.read_factory_settings(use_empty=False)
for o in list(bpy.data.objects): bpy.data.objects.remove(o)
addon_utils.enable('bl_ext.user_default.faceit', default_set=True)
sc = bpy.context.scene; sc.render.fps = 30
bpy.ops.import_scene.gltf(filepath=GLB)
arm = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
arm.animation_data_create(); arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = pb.matrix_basis.__class__()
bpy.context.view_layer.update()
paa = [o for o in bpy.data.objects if o.name.endswith('_paa')][0]; NIMI = paa.name[:-4]
suu = bpy.data.objects[f'{NIMI}_suu']; silmat = bpy.data.objects['Eyes']
karvat = [o for o in bpy.data.objects if o.type == 'MESH' and (o.name == 'Eyebrows' or o.name.startswith('Hair_Beard'))]
hiukset = [o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('Hair_') and o not in karvat]

def ryhma(o, nimi, ix=None):
    g = o.vertex_groups.get(nimi) or o.vertex_groups.new(name=nimi)
    g.add(list(range(len(o.data.vertices))) if ix is None else ix, 1.0, 'REPLACE')
ryhma(paa, 'faceit_main')
Wm = silmat.matrix_world
ryhma(silmat, 'faceit_left_eyeball', [v.index for v in silmat.data.vertices if (Wm @ v.co).x > 0])
ryhma(silmat, 'faceit_right_eyeball', [v.index for v in silmat.data.vertices if (Wm @ v.co).x < 0])
for vanha, uusi in (('faceit_ylahampaat', 'faceit_upper_teeth'), ('faceit_alahampaat', 'faceit_lower_teeth'), ('faceit_kieli', 'faceit_tongue')):
    g = suu.vertex_groups.get(vanha)
    if g: g.name = uusi
for o in karvat: ryhma(o, 'faceit_facial_hair')
for o in hiukset: ryhma(o, 'faceit_rigid')
# rekisteröinti (FACEIT_OT_AddFacialPart.execute ilman valintaa)
for o in [paa, silmat, suu] + karvat + hiukset:
    it = sc.faceit_face_objects.add(); it.name = o.name; it.obj_pointer = o
sc.faceit_body_armature = arm; sc.faceit_asymmetric = False

# --- maamerkit: pohja kirjastosta, pisteet mitatuista kohdista (x, z), y projektiolla ---
X = {  # indeksi: (x, z) maailmassa; keskiviiva x = 0
    0: (0, 1.578), 1: (0, 1.588), 2: (0, 1.600), 3: (0, 1.607), 5: (0, 1.614), 8: (0, 1.632), 10: (0, 1.640), 11: (0, 1.652),
    21: (0, 1.693), 36: (0, 1.790),
    7: (0.026, 1.623), 6: (0.014, 1.615), 9: (0.0135, 1.630), 13: (0.012, 1.642), 16: (0.010, 1.665),
    4: (0.024, 1.590), 14: (0.040, 1.624), 15: (0.033, 1.668), 25: (0.056, 1.690), 12: (0.050, 1.610), 22: (0.066, 1.645),
    37: (0.062, 1.718), 40: (0.058, 1.765), 39: (0.035, 1.790), 38: (0.013, 1.785),
    30: (0.012, 1.712), 34: (0.034, 1.722), 35: (0.056, 1.712),
    20: (0.017, 1.702), 26: (0.022, 1.709), 31: (0.034, 1.7125), 33: (0.044, 1.711), 32: (0.051, 1.706),
    18: (0.0205, 1.697), 23: (0.025, 1.704), 27: (0.034, 1.7075), 29: (0.0425, 1.706), 28: (0.048, 1.700),
    24: (0.0425, 1.692), 19: (0.034, 1.689), 17: (0.025, 1.691),
}
if '--nainen' in A:  # UBC-naisen pää (mitattu apulaisesta 6.10.): sama muoto ~4 cm matalammalla, suupielet 0,024
    zn = lambda z: z - (0.038 if z < 1.66 else 0.042 if z < 1.74 else 0.045)
    X = {i: (x, zn(z)) for i, (x, z) in X.items()}
    X.update({7: (0.024, 1.585), 6: (0.013, 1.578), 9: (0.0125, 1.591), 22: (0.060, X[22][1])})
kok = futils.get_faceit_collection()
with bpy.data.libraries.load(fdata.get_landmarks_file()) as (df, dt): dt.objects = [n for n in df.objects if n == 'facial_landmarks']
lm = dt.objects[0]; kok.objects.link(lm); lm.name = 'facial_landmarks'
assert len(lm.data.vertices) == 41 and set(X) == set(range(41)), (len(lm.data.vertices), set(range(41)) - set(X))
Pm = [paa.matrix_world @ v.co for v in paa.data.vertices]
y_eteen = min(p.y for p in Pm) - 0.01
lm.location = Vector((0, y_eteen, X[1][1])); lm.rotation_euler = (0, 0, 0); lm.scale = (1, 1, 1)
for i, v in enumerate(lm.data.vertices): v.co = Vector((X[i][0], 0, X[i][1] - X[1][1]))
# projektio pintaan +Y-suunnassa (FACEIT_OT_ProjectLandmarks ilman näkymäoperaattoreita)
bpy.context.view_layer.objects.active = lm
for o in bpy.context.selected_objects: o.select_set(False)
lm.select_set(True)
md = lm.modifiers.new('ShrinkWrap', 'SHRINKWRAP'); md.target = paa; md.wrap_method = 'PROJECT'; md.use_project_y = True
md.use_positive_direction = True; md.cull_face = 'BACK'
bpy.ops.object.modifier_apply(modifier=md.name)
eiosu = [i for i, v in enumerate(lm.data.vertices) if abs(v.co.y) < 1e-6]
print('FACEIT y-syvyydet', [round(v.co.y, 3) for v in lm.data.vertices])
print('FACEIT maamerkit projisoitu, osumatta:', eiosu)
lm['state'] = 4

def aja(nimi, **k):
    op = getattr(bpy.ops.faceit, nimi)
    try: r = op('EXEC_DEFAULT', **k)
    except Exception as e: print(f'FACEIT {nimi} VIRHE {e}'); raise
    print(f'FACEIT {nimi} → {r}')
aja('generate_rig')
aja('smart_bind') if hasattr(bpy.ops.faceit, 'smart_bind') else None
aja('append_action_to_faceit_rig', expressions_type='ARKIT')
if BLEND: bpy.ops.wm.save_as_mainfile(filepath=BLEND)
print('FACEIT vaihe 1 valmis')
