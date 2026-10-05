# Mixamo-leikkeet linnan hahmoon (Linnanrakentaja 5.10.2026; omistajan päätös 10.50: Mixamo-koe kappalaisella).
# Mixamon FBX (Without Skin, 30 fps) → hahmon 65 luun Quaternius-luuranko (hahmo_skin.py), leivottuna hahmon glb:hen
# (ei erillisiä animaatiotiedostoja: Mixamon raakatiedostoja ei jaeta). Natiivi soittaa glb-leikkeitä omalla soittimella,
# joten retarget tehdään tässä eikä Unityn Humanoidilla (datapolku säilyy, Siirtoseppä 5.10.).
# Menetelmä: maailman rotaatiodelta lähteen lepoasennosta × lepoasentojen suunta-ero (lyhin kaari luun suunnasta toiseen),
# lantion siirto skaalattuna lantion lepokorkeuksien suhteella.
#   Blender -b -P hahmo_mixamo.py -- <hahmo.glb> <ulos.glb> <lähde.fbx|glb>=<leikkeen nimi>[@<lähdetoiminto>] ... [--tyo <nimi>]
#   --tyo <nimi>: korvaa hahmon työleikkeen (natiivi soittaa nimeä 'tyo') annetulla leikkeellä; muuten vanhat leikkeet ennallaan.
#   Identiteettikoe: lähteeksi UAL-glb (samat luunimet) → tuloksen pitää vastata alkuperäistä leikettä.
import bpy, math, os, sys
from mathutils import Matrix, Quaternion, Vector
A = sys.argv[sys.argv.index('--') + 1:]
HAHMO, ULOS = A[0], A[1]
TYO = A[A.index('--tyo') + 1] if '--tyo' in A else None
LAHTEET = [x for x in A[2:] if '=' in x]
KARTTA = {'Hips': 'pelvis', 'Spine': 'spine_01', 'Spine1': 'spine_02', 'Spine2': 'spine_03', 'Neck': 'neck_01', 'Head': 'Head'}
for s, t in (('Left', 'l'), ('Right', 'r')):
    KARTTA.update({f'{s}Shoulder': f'clavicle_{t}', f'{s}Arm': f'upperarm_{t}', f'{s}ForeArm': f'lowerarm_{t}',
                   f'{s}Hand': f'hand_{t}', f'{s}UpLeg': f'thigh_{t}', f'{s}Leg': f'calf_{t}', f'{s}Foot': f'foot_{t}',
                   f'{s}ToeBase': f'ball_{t}'})
    for sormi, q in (('Thumb', 'thumb'), ('Index', 'index'), ('Middle', 'middle'), ('Ring', 'ring'), ('Pinky', 'pinky')):
        for i in (1, 2, 3): KARTTA[f'{s}Hand{sormi}{i}'] = f'{q}_0{i}_{t}'

LAPSI = {'pelvis': ('spine_01',), 'spine_01': ('spine_02',), 'spine_02': ('spine_03',), 'spine_03': ('neck_01',), 'neck_01': ('Head',)}
for t in ('l', 'r'):
    LAPSI.update({f'clavicle_{t}': (f'upperarm_{t}',), f'upperarm_{t}': (f'lowerarm_{t}',), f'lowerarm_{t}': (f'hand_{t}',),
                  f'hand_{t}': (f'middle_01_{t}',), f'thigh_{t}': (f'calf_{t}',), f'calf_{t}': (f'foot_{t}',), f'foot_{t}': (f'ball_{t}',)})
    for q in ('thumb', 'index', 'middle', 'ring', 'pinky'):
        LAPSI.update({f'{q}_01_{t}': (f'{q}_02_{t}',), f'{q}_02_{t}': (f'{q}_03_{t}',)})
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene; sc.render.fps = 30
def tuo(f):
    ennen = set(bpy.data.objects)
    if f.lower().endswith('.fbx'): bpy.ops.import_scene.fbx(filepath=f, automatic_bone_orientation=False)
    else: bpy.ops.import_scene.gltf(filepath=f)
    return [o for o in bpy.data.objects if o not in ennen]
hahmo = tuo(HAHMO); arm = [o for o in hahmo if o.type == 'ARMATURE'][0]
vanhat = {a.name for a in bpy.data.actions}
for a in bpy.data.actions: a.use_fake_user = True
arm.animation_data_create(); arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = Matrix()
Tw = arm.matrix_world.to_quaternion()

def retarget(lahde, nimi, toiminto):
    uudet = tuo(lahde); src = [o for o in uudet if o.type == 'ARMATURE'][0]
    tuodut = [a for a in bpy.data.actions if a.name not in vanhat and a.name != nimi]
    act = bpy.data.actions.get(toiminto) if toiminto else (src.animation_data.action if src.animation_data and src.animation_data.action else tuodut[0])
    src.animation_data_create(); src.animation_data.action = act
    if getattr(act, 'slots', None) and len(act.slots): src.animation_data.action_slot = act.slots[0]
    # lähteen luunimet ilman "mixamorig:"-etuliitettä; UAL-lähteellä nimet ovat suoraan kohteen nimiä
    snimi = {b.name.split(':')[-1]: b.name for b in src.data.bones}
    pari = {}
    for s, t in KARTTA.items():
        if s in snimi and t in arm.data.bones: pari[t] = snimi[s]
    for b in arm.data.bones:
        if b.name in snimi and b.name not in pari and b.name != 'root': pari[b.name] = snimi[b.name]
    Sw = src.matrix_world; Sq = Sw.to_quaternion()
    sw_rest = {t: (Sq @ src.data.bones[s].matrix_local.to_quaternion()).normalized() for t, s in pari.items()}
    tw_rest = {t: (Tw @ arm.data.bones[t].matrix_local.to_quaternion()).normalized() for t in pari}
    # lepoasentojen suunta-ero luun alusta pääketjun lapsen alkuun (glTF/FBX ei tallenna luiden kärkiä, tuoja arvaa ne);
    # ilman kartoitettua lasta (pää, sormenpäät) suunta-eroa ei korjata
    def lapsi(t):
        for k in LAPSI.get(t, ()):
            if k in pari: return k
    linja = {}
    for t, s in pari.items():
        k = lapsi(t)
        if k is None: linja[t] = Quaternion(); continue
        dt = (arm.matrix_world @ arm.data.bones[k].head_local) - (arm.matrix_world @ arm.data.bones[t].head_local)
        ds = (Sw @ src.data.bones[pari[k]].head_local) - (Sw @ src.data.bones[s].head_local)
        linja[t] = dt.normalized().rotation_difference(ds.normalized())
    ps = src.data.bones[pari['pelvis']]; pt = arm.data.bones['pelvis']
    ps_rest = Sw @ ps.head_local; pt_rest = arm.matrix_world @ pt.head_local
    suhde = (pt_rest.z - (arm.matrix_world @ arm.data.bones['foot_l'].head_local).z) / max(1e-4, ps_rest.z - (Sw @ src.data.bones[pari['foot_l']].head_local).z)
    uusi = bpy.data.actions.new(nimi); uusi.use_fake_user = True; arm.animation_data.action = uusi
    f0, f1 = (int(round(x)) for x in act.frame_range)
    jarj = [b for b in arm.data.bones]  # data.bones on hierarkiajärjestyksessä (vanhempi ennen lasta)
    for f in range(f0, f1 + 1):
        sc.frame_set(f); M = {}
        for b in jarj:
            pb = arm.pose.bones[b.name]
            ylin = (M[b.parent.name] @ b.parent.matrix_local.inverted() if b.parent else Matrix()) @ b.matrix_local
            if b.name in pari:
                s = src.pose.bones[pari[b.name]]
                q_s = (Sq @ s.matrix.to_quaternion()).normalized()
                q_w = (q_s @ sw_rest[b.name].inverted()) @ linja[b.name] @ tw_rest[b.name]
                q = (Tw.inverted() @ q_w).normalized()
                paikka = ylin.translation
                if b.name == 'pelvis':
                    pw = pt_rest + ((Sw @ s.head) - ps_rest) * suhde
                    paikka = arm.matrix_world.inverted() @ pw
                haluttu = Matrix.LocRotScale(paikka, q, None)
                kanta = ylin.inverted() @ haluttu
            else:
                kanta = Matrix()
            pb.rotation_mode = 'QUATERNION'
            l, r, _ = kanta.decompose()
            pb.rotation_quaternion = r; pb.keyframe_insert('rotation_quaternion', frame=f - f0)
            if b.name == 'pelvis': pb.location = l; pb.keyframe_insert('location', frame=f - f0)
            M[b.name] = ylin @ Matrix.LocRotScale(l if b.name == 'pelvis' else Vector(), r, None)
    for o in uudet: bpy.data.objects.remove(o)
    for a in list(bpy.data.actions):
        if a.name not in vanhat and a != uusi: bpy.data.actions.remove(a)  # lähteen raakatoiminnot eivät saa päätyä glb:hen
    print(f'MIXAMO {nimi}: {len(pari)} luuta, {f1 - f0 + 1} ruutua, lantion skaala {suhde:.3f}')
    return uusi

for x in LAHTEET:
    polku, nimi = x.split('='); toiminto = None
    if '@' in nimi: nimi, toiminto = nimi.split('@')
    retarget(polku, nimi, toiminto); vanhat.add(nimi)
if TYO:
    vanha = bpy.data.actions.get('tyo')
    if vanha: vanha.name = 'tyo_ual'; bpy.data.actions.remove(vanha)
    bpy.data.actions[TYO].name = 'tyo'
arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = Matrix()
bpy.ops.object.select_all(action='DESELECT'); arm.select_set(True)
for o in arm.children: o.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_animation_mode='ACTIONS', export_skins=True,
                          export_yup=True, export_apply=False, export_image_format='JPEG', export_jpeg_quality=85)
print('MIXAMO valmis', ULOS, sorted(a.name for a in bpy.data.actions))
