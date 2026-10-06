# Mixamo-leikkeet linnan hahmoon (Linnanrakentaja 5.10.2026; omistajan päätös 10.50: Mixamo-koe kappalaisella).
# Mixamon FBX (Without Skin, 30 fps) tai Kevin Iglesiasin Human Basic Motions -FBX → hahmon 65 luun Quaternius-luuranko (hahmo_skin.py), leivottuna hahmon glb:hen
# (ei erillisiä animaatiotiedostoja: Mixamon raakatiedostoja ei jaeta). Natiivi soittaa glb-leikkeitä omalla soittimella,
# joten retarget tehdään tässä eikä Unityn Humanoidilla (datapolku säilyy, Siirtoseppä 5.10.).
# Menetelmä: maailman rotaatiodelta lähteen lepoasennosta × lepoasentojen suunta-ero (lyhin kaari luun suunnasta toiseen),
# lantion siirto skaalattuna lantion lepokorkeuksien suhteella.
#   Blender -b -P hahmo_mixamo.py -- <hahmo.glb> <ulos.glb> <lähde.fbx|glb>=<leikkeen nimi>[@<lähdetoiminto>] ... [--tyo <nimi>]
#   <leike>:<s> lyhentää leikkeen s sekuntiin ja sulkee sen silmukaksi; --korvaa idle=a,puhe=b,tyo=c vaihtaa natiivin leikkeet.
#   --tyo <nimi>: korvaa hahmon työleikkeen (natiivi soittaa nimeä 'tyo') annetulla leikkeellä; muuten vanhat leikkeet ennallaan.
#   Identiteettikoe: lähteeksi UAL-glb (samat luunimet) → tuloksen pitää vastata alkuperäistä leikettä.
import bpy, math, os, sys
from mathutils import Matrix, Quaternion, Vector
A = sys.argv[sys.argv.index('--') + 1:]
HAHMO, ULOS = A[0], A[1]
TYO = A[A.index('--tyo') + 1] if '--tyo' in A else None
ARVOT = {A[i + 1] for i, x in enumerate(A[:-1]) if x.startswith('--')}  # lippujen arvot eivät ole lähteitä
LAHTEET = [x for x in A[2:] if '=' in x and x not in ARVOT]
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
# Kevin Iglesias (Human Basic Motions, Asset Store EULA; omistaja osti 5.10.): B-*-luuranko, 2 selkäluuta (spine_02 seuraa).
KARTTA.update({'B-hips': 'pelvis', 'B-spine': 'spine_01', 'B-chest': 'spine_03', 'B-neck': 'neck_01', 'B-head': 'Head'})
for s, t in (('L', 'l'), ('R', 'r')):
    KARTTA.update({f'B-shoulder.{s}': f'clavicle_{t}', f'B-upperArm.{s}': f'upperarm_{t}', f'B-forearm.{s}': f'lowerarm_{t}',
                   f'B-hand.{s}': f'hand_{t}', f'B-thigh.{s}': f'thigh_{t}', f'B-shin.{s}': f'calf_{t}', f'B-foot.{s}': f'foot_{t}',
                   f'B-toe.{s}': f'ball_{t}'})
    for sormi, q in (('thumb', 'thumb'), ('indexFinger', 'index'), ('middleFinger', 'middle'), ('ringFinger', 'ring'), ('pinky', 'pinky')):
        for i in (1, 2, 3): KARTTA[f'B-{sormi}0{i}.{s}'] = f'{q}_0{i}_{t}'
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

def retarget(lahde, nimi, toiminto, sek=None):
    uudet = tuo(lahde); src = [o for o in uudet if o.type == 'ARMATURE'][0]
    # FBX-tuoja asettaa kohtauksen kuvanopeuden tiedoston mukaan (Kevin Iglesias 25 fps): lähde näytteistetään sen omalla
    # nopeudella ja kohde kirjoitetaan aina 30 fps:llä (5.10.: muuten koko hahmon leikkeet vietiin 20 % hitaampina).
    fps_l = sc.render.fps / sc.render.fps_base; sc.render.fps = 30; sc.render.fps_base = 1
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
    # Lähteen lepoasento (5.10., Kevin Iglesias): kartoittamaton juuriluu (B-root) kantaa animaatiossa koko muunnoksen
    # (pystyyn + senttimetrit), joten lepo = asento, jossa juuri pitää ruudun f0 arvonsa ja muut luut ovat levossa.
    # Mixamolla juuri (Hips) on kartoitettu, joten lepo = matrix_local.
    f0_ = int(round(act.frame_range[0])); juuret = [b.name for b in src.data.bones if b.parent is None and b.name not in pari.values()]
    if juuret:
        sc.frame_set(f0_); juurikanta = {n: src.pose.bones[n].matrix_basis.copy() for n in juuret}
        src.animation_data.action = None
        for pb in src.pose.bones: pb.matrix_basis = Matrix()
        for n, m in juurikanta.items(): src.pose.bones[n].matrix_basis = m
        bpy.context.view_layer.update(); LEPO = {b.name: src.pose.bones[b.name].matrix.copy() for b in src.data.bones}
        src.animation_data.action = act
        if getattr(act, 'slots', None) and len(act.slots): src.animation_data.action_slot = act.slots[0]
    else:
        LEPO = {b.name: b.matrix_local.copy() for b in src.data.bones}
    # Lähteen asento kohteen maailmaan: kanta (sivu, ylös) lantio→pää ja vasen–oikea reisi kummastakin luurangosta.
    def kanta(o, lantio, paa, rl, rr):
        W = (lambda n: o.matrix_world @ o.data.bones[n].head_local) if o == arm else (lambda n: o.matrix_world @ LEPO[n].translation)
        x = (W(rl) - W(rr)).normalized(); z = (W(paa) - W(lantio)); z = (z - x * z.dot(x)).normalized()
        return Matrix((x, z.cross(x), z)).transposed()
    G = kanta(arm, 'pelvis', 'Head', 'thigh_l', 'thigh_r') @ kanta(src, pari['pelvis'], pari['Head'], pari['thigh_l'], pari['thigh_r']).inverted()
    Sw = G.to_4x4() @ src.matrix_world; Sq = Sw.to_quaternion()   # ei objektille: FBX:n objektianimaatio palauttaisi sen
    sw_rest = {t: (Sq @ LEPO[s].to_quaternion()).normalized() for t, s in pari.items()}
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
        ds = (Sw @ LEPO[pari[k]].translation) - (Sw @ LEPO[s].translation)
        linja[t] = dt.normalized().rotation_difference(ds.normalized())
    ps = src.data.bones[pari['pelvis']]; pt = arm.data.bones['pelvis']
    ps_rest = Sw @ LEPO[ps.name].translation; pt_rest = arm.matrix_world @ pt.head_local
    suhde = (pt_rest.z - (arm.matrix_world @ arm.data.bones['foot_l'].head_local).z) / max(1e-4, ps_rest.z - (Sw @ LEPO[pari['foot_l']].translation).z)
    uusi = bpy.data.actions.new(nimi); uusi.use_fake_user = True; arm.animation_data.action = uusi
    f0, f1 = (int(round(x)) for x in act.frame_range)
    n = int(round((f1 - f0) / fps_l * 30)) + 1
    if sek: n = min(n, int(round(sek * 30)))
    arvot = {b.name: [] for b in arm.data.bones}
    jarj = [b for b in arm.data.bones]  # data.bones on hierarkiajärjestyksessä (vanhempi ennen lasta)
    for i in range(n):
        t = f0 + i * fps_l / 30; sc.frame_set(int(t), subframe=t - int(t)); M = {}
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
            l, r, _ = kanta.decompose(); arvot[b.name].append((l, r))
            M[b.name] = ylin @ Matrix.LocRotScale(l if b.name == 'pelvis' else Vector(), r, None)
    # lyhennetty leike suljetaan silmukaksi: viimeinen 0,5 s sulautuu ensimmäiseen ruutuun (smoothstep)
    K = min(15, n // 3) if sek else 0
    for b in jarj:
        pb = arm.pose.bones[b.name]; pb.rotation_mode = 'QUATERNION'; l0, r0 = arvot[b.name][0]
        for i, (l, r) in enumerate(arvot[b.name]):
            if K and i >= n - K:
                w = (i - (n - K) + 1) / K; w = w * w * (3 - 2 * w)
                r = r.slerp(r0, w) if r.dot(r0) >= 0 else (-r).slerp(r0, w); l = l.lerp(l0, w)
            pb.rotation_quaternion = r; pb.keyframe_insert('rotation_quaternion', frame=i)
            if b.name == 'pelvis': pb.location = l; pb.keyframe_insert('location', frame=i)
    for o in uudet: bpy.data.objects.remove(o)
    for a in list(bpy.data.actions):
        if a.name not in vanhat and a != uusi: bpy.data.actions.remove(a)  # lähteen raakatoiminnot eivät saa päätyä glb:hen
    print(f'MIXAMO {nimi}: {len(pari)} luuta, {n} ruutua (lähde {fps_l:g} fps), lantion skaala {suhde:.3f}')
    return uusi

for x in LAHTEET:
    polku, nimi = x.rsplit('=', 1); toiminto = sek = None
    if ':' in nimi: nimi, sek = nimi.split(':'); sek = float(sek)
    if '@' in nimi: nimi, toiminto = nimi.split('@')
    retarget(polku, nimi, toiminto, sek); vanhat.add(nimi)
# --korvaa idle=hengitys,puhe=puhe_m,tyo=rukous: natiivin soittama nimi saa uuden leikkeen, vanha (UAL) poistetaan
KORVAA = dict(x.split('=') for x in A[A.index('--korvaa') + 1].split(',')) if '--korvaa' in A else {}
if TYO: KORVAA['tyo'] = TYO
for vanha_nimi, uusi_nimi in KORVAA.items():
    vanha = bpy.data.actions.get(vanha_nimi)
    if vanha: bpy.data.actions.remove(vanha)
    bpy.data.actions[uusi_nimi].name = vanha_nimi
arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = Matrix()
bpy.ops.object.select_all(action='DESELECT'); arm.select_set(True)
for o in arm.children: o.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_animation_mode='ACTIONS', export_skins=True,
                          export_yup=True, export_apply=False, export_image_format='JPEG', export_jpeg_quality=85)
print('MIXAMO valmis', ULOS, sorted(a.name for a in bpy.data.actions))
