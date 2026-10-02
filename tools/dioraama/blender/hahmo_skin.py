# Linnan skinnattu hahmo (Linnanrakentaja 2.10.2026; omistaja 18.0x: "valmiit mallit joiden päälle vaihdetaan vaatteet").
# Quaternius CC0: Modular Character Outfits – Fantasy (asu) + Universal Base Characters (pää, silmät, kulmat, parta)
# + Universal Animation Library (leikkeet). Sama 65 luun luuranko kaikissa. Tulos: yksi GLB (skin + leikkeet) + json.
#   Blender -b -P hahmo_skin.py -- <asu.gltf> <ulos-kansio> <nimi> [--parta] [--hiukset Hair_X]
import bpy, json, math, os, sys
from mathutils import Vector
A = sys.argv[sys.argv.index('--') + 1:]; ASU, ULOS, NIMI = A[:3]; os.makedirs(ULOS, exist_ok=True)
L = '/Users/Shared/Claude/proto-3d/_lahteet'
UBC = f'{L}/quaternius-ubc/Universal Base Characters[Standard]'
UAL = f'{L}/quaternius-ual/UAL1_Standard.glb'
LEIKKEET = {'Idle_Loop': 'idle', 'Walk_Loop': 'kavely', 'Idle_Talking_Loop': 'puhe', 'Interact': 'tyo'}
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene; sc.render.fps = 30
def tuo(f):
    ennen = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=f); return [o for o in bpy.data.objects if o not in ennen]
uudet = tuo(ASU); arm = [o for o in uudet if o.type == 'ARMATURE'][0]; arm.name = NIMI
for o in uudet:
    if o.type == 'MESH' and o.name.startswith('Icosphere'): bpy.data.objects.remove(o)
def liita(obs):
    obs = [o for o in obs]; nimet = [o.name for o in obs]
    for o in obs:
        if o.type == 'MESH':
            if o.name.startswith('Icosphere'): bpy.data.objects.remove(o); continue
            for m in o.modifiers:
                if m.type == 'ARMATURE': m.object = arm
            mw = o.matrix_world.copy(); o.parent = arm; o.matrix_world = mw
    for n in nimet:
        o = bpy.data.objects.get(n)
        if o is not None and o.type in ('ARMATURE', 'EMPTY'):
            for c in list(o.children): c.parent = arm
            bpy.data.objects.remove(o)
# pää perushahmosta: vain kärjet, joiden paino Head + neck_01 ≥ 0,5 (vartalo jää asun alle pois)
pohja = tuo(f'{UBC}/Base Characters/Godot - UE/Superhero_Male_FullBody.gltf')
for o in pohja:
    if o.type == 'MESH' and o.name.startswith('SuperHero'):
        ryhmat = {g.index: g.name for g in o.vertex_groups}
        bpy.context.view_layer.objects.active = o; bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='DESELECT')
        bpy.ops.object.mode_set(mode='OBJECT')
        for v in o.data.vertices:
            p = sum(g.weight for g in v.groups if ryhmat.get(g.group) in ('Head', 'neck_01'))
            v.select = p < 0.5
        bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.delete(type='VERT'); bpy.ops.object.mode_set(mode='OBJECT')
        o.name = f'{NIMI}_paa'
liita(pohja)
if '--parta' in A: liita(tuo(f'{UBC}/Hairstyles/Rigged to Head Bone/glTF (Godot -Unreal)/Hair_Beard.gltf'))
if '--hiukset' in A: liita(tuo(f'{UBC}/Hairstyles/Rigged to Head Bone/glTF (Godot -Unreal)/{A[A.index("--hiukset") + 1]}.gltf'))
# leikkeet UAL:sta (sama luuranko → toiminnot käyvät sellaisenaan); muut pois
ennen = set(bpy.data.actions); ual = [o.name for o in tuo(UAL)]
for a in list(bpy.data.actions):
    if a in ennen: continue
    if a.name in LEIKKEET: a.name = LEIKKEET[a.name]; a.use_fake_user = True
    else: bpy.data.actions.remove(a)
for n in ual:
    o = bpy.data.objects.get(n)
    if o is not None: bpy.data.objects.remove(o)
for a in list(bpy.data.actions):
    if a.name not in LEIKKEET.values(): bpy.data.actions.remove(a)
# kävely: in-place? ja askelpituus (jalan taaksepäin liukuma tukivaiheessa, 2 askelta / sykli)
def aseta(nimi):
    a = bpy.data.actions[nimi]; arm.animation_data.action = a
    if getattr(a, 'slots', None) and len(a.slots): arm.animation_data.action_slot = a.slots[0]   # Blender 5: kerrostettu toiminto
arm.animation_data_create(); aseta('kavely')
fr = bpy.data.actions['kavely'].frame_range; f0, f1 = int(fr[0]), int(fr[1])
def piste(luu): return arm.matrix_world @ arm.pose.bones[luu].head
jalka, lantio = [], []
for f in range(f0, f1 + 1):
    sc.frame_set(f); jalka.append(piste('foot_l').copy()); lantio.append(piste('pelvis').copy())
eteen = max(range(3), key=lambda i: max(p[i] for p in jalka) - min(p[i] for p in jalka) if i != 2 else -1)
alin = min(p.z for p in jalka); tuki = [i for i, p in enumerate(jalka) if p.z < alin + 0.02]
nop = [abs(jalka[i + 1][eteen] - jalka[i][eteen]) for i in tuki if i + 1 < len(jalka) and i + 1 in tuki]
v = sum(nop) / max(1, len(nop)) * sc.render.fps; kesto = (f1 - f0) / sc.render.fps
tiedot = {'nimi': NIMI, 'leikkeet': {'idle': 'idle', 'kavely': 'kavely', 'katselu': 'idle', 'kaanto': None,
                                      'puhe': 'puhe', 'tyo': 'tyo'},
          'huom_leikkeet': 'UAL Standardissa ei katselu- eikä kääntöleikettä: katselu = idle, kääntö moottorin juurikiertona',
          'kavely_sykli_m': round(v * kesto, 3), 'fps': sc.render.fps,
          'kavely': {'kesto_s': round(kesto, 3), 'nopeus_m_s': round(v, 3), 'askelpituus_m': round(v * kesto / 2, 3),
                     'lantion_siirto_m': round((lantio[-1] - lantio[0]).length, 3), 'akseli': 'xyz'[eteen]},
          'korkeus_m': None}
aseta('idle'); sc.frame_set(0)
pts = [o.matrix_world @ Vector(c) for o in arm.children if o.type == 'MESH' for c in o.bound_box]
tiedot['pituus_m'] = round(max(p.z for p in pts) - min(p.z for p in pts), 3)
tiedot.pop('korkeus_m', None)
d = piste('ball_l') - piste('foot_l')   # varpaat kantapäästä eteen (Blender) → glTF: (x, z, -y)
tiedot['kasvot_gltf'] = [round(d.x, 3), round(d.z, 3), round(-d.y, 3)]
tiedot['kolmiot'] = sum(len(o.data.polygons) for o in arm.children if o.type == 'MESH')
arm.animation_data.action = None
# asun värit: --korvaa KUVA=polku (esim. T_Ranger_BaseColor=…vartija.png; aikakauden villa rakennus.jsonin väreistä)
if '--korvaa' in A:
    for pari in A[A.index('--korvaa') + 1].split(','):
        nimi, polku = pari.split('=')
        uusi = bpy.data.images.load(polku)   # tuodut kuvat ovat pakattuja: kopioidaan pikselit (sama koko)
        for im in list(bpy.data.images):
            if im.name.startswith(nimi) and im != uusi and tuple(im.size) == tuple(uusi.size):
                px = [0.0] * (uusi.size[0] * uusi.size[1] * 4); uusi.pixels.foreach_get(px); im.pixels.foreach_set(px); im.pack()
        bpy.data.images.remove(uusi)
# tekstuurit kevyiksi: perusväri 1024, normaali/ORM/karheus 512, JPEG viennissä (pienoisnäkymässä riittää)
for im in bpy.data.images:
    if im.size[0] == 0: continue
    k = 1024 if ('BaseColor' in im.name or im.name.endswith(('_Dark', '_Ligh')) or 'Eye' in im.name) else 512
    if im.size[0] > k: im.scale(k, k)
bpy.ops.object.select_all(action='DESELECT'); arm.select_set(True)
for o in arm.children: o.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.export_scene.gltf(filepath=os.path.join(ULOS, f'{NIMI}.glb'), use_selection=True, export_format='GLB',
                          export_animation_mode='ACTIONS', export_skins=True, export_yup=True, export_apply=False,
                          export_image_format='JPEG', export_jpeg_quality=85)
json.dump(tiedot, open(os.path.join(ULOS, f'{NIMI}.json'), 'w'), ensure_ascii=False, indent=1)
print('HAHMO', tiedot)
