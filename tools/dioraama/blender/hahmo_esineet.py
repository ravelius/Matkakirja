# Hahmon esineet ja työliikkeet ilman lisäosia (Linnanrakentaja 6.10.2026; omistaja: MC Village Lifea ei osteta, lakaisu kevyesti
# omalla silmukalla, kanto ja ruoanlaitto Linnanrakentajan ehdotuksen mukaan). Ajetaan hahmo_mixamo.py:n tuloksille.
# Esine on hahmon glb:ssä oma luunsa (esine_tyo käden lapsena tai esine_kanto rintakehän lapsena), ja verkko on skinnattu siihen
# painolla 1. Se näkyy vain niissä leikkeissä, joissa sitä käytetään; muissa leikkeissä luun skaala on 0, joten natiivikoodia ei
# tarvita (natiivi soittaa kanto/kanto_idle/kanto_puhe ja tyo/tyo_puhe, Siirtoseppä 6.10.).
# Kädet viedään esineeseen kahden luun analyyttisella IK:lla joka ruutuun (olkavarsi ja kyynärvarsi, kyynärpään suunta vihjepisteestä),
# ja kämmen käännetään otteeseen: peukaloakseli varren suuntaan, sormet varren ympäri.
#   Blender -b -P hahmo_esineet.py -- <hahmo.glb> <ulos.glb> <tehtävä> [...]
#   kauha=<x>,<y>,<z>   kokki: tyo = idle + hämmennys padassa (padan keskipiste mallin koordinaateissa, m); kauha kaikissa leikkeissä
#   tarjotin            apulainen: kanto/kanto_idle/kanto_puhe = kävely/idle/puhe + vati oikealla kämmenellä olkapään korkeudella
#   olka                renki: kanto/kanto_idle/kanto_puhe = kävely/idle/puhe + säkki vasemmalla olalla, vasen käsi pitää
#   luuta               apulainen: tyo = idle + lakaisu (veto oikealta vasemmalle 1,6 s), tyo_puhe = puhe + luuta lattialla
# Mallin koordinaatit (Blender, glTF-tuonti): hahmo katsoo −Y:hen, vasen = +X, ylös = +Z, jalat z = 0. Mitat mallin yksiköissä
# (malli on ~1,78 m; natiivi skaalaa henkilön pituuteen, hahmot-skin.json skaala).
import bpy, bmesh, math, sys
from mathutils import Matrix, Quaternion, Vector
A = sys.argv[sys.argv.index('--') + 1:]
HAHMO, ULOS, TEHTAVAT = A[0], A[1], A[2:]
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene; sc.render.fps = 30
bpy.ops.import_scene.gltf(filepath=HAHMO)
arm = [o for o in bpy.data.objects if o.type == 'ARMATURE'][0]
for a in bpy.data.actions: a.use_fake_user = True
arm.animation_data_create()
V = Vector; ETEEN, VASEN, YLOS = V((0, -1, 0)), V((1, 0, 0)), V((0, 0, 1))

# --- esineluut (lepo = vanhemman lepo, joten esineen verkko mallinnetaan vanhemman paikallisessa kehyksessä) ---
def luo_luu(nimi, vanhempi):
    bpy.context.view_layer.objects.active = arm; bpy.ops.object.mode_set(mode='EDIT')
    eb = arm.data.edit_bones; v = eb[vanhempi]; b = eb.new(nimi)
    b.head, b.tail, b.roll = v.head.copy(), v.tail.copy(), v.roll; b.parent = v; b.use_connect = False; b.use_deform = True
    bpy.ops.object.mode_set(mode='OBJECT'); arm.pose.bones[nimi].rotation_mode = 'QUATERNION'
R = lambda n: arm.data.bones[n].matrix_local

# --- otteen kehys: kämmenen paikalliset akselit (sormet f, peukalo t, kämmenen normaali p) lepoasennosta ---
def kasi_akselit(s):
    Ri = R('hand_' + s).inverted()
    f = (Ri @ arm.data.bones['middle_01_' + s].head_local).normalized()
    t = (Ri @ arm.data.bones['thumb_01_' + s].head_local); t = (t - t.dot(f) * f).normalized()
    p = (Ri.to_3x3() @ V((0, 0, -1))); p = (p - p.dot(f) * f - p.dot(t) * t).normalized()  # T-asennossa kämmen alas
    return f, t, p
def koukistus(s, kulmat=(55, 65, 45), peukalo=(20, 30, 20)):
    """Sormien kanta-kierrot otteeseen: jokainen nivel kiertyy kämmenen normaalin suuntaan (lepoasennosta laskettu akseli)."""
    p_w = (R('hand_' + s).to_3x3() @ kasi_akselit(s)[2]).normalized(); q = {}
    for sormi in ('index', 'middle', 'ring', 'pinky', 'thumb'):
        for i, k in enumerate(peukalo if sormi == 'thumb' else kulmat):
            n = f'{sormi}_0{i + 1}_{s}'
            if n not in arm.data.bones: continue
            Rb = R(n).to_3x3(); y = Rb.col[1].normalized(); akseli = y.cross(p_w)
            if akseli.length < 1e-4: continue
            q[n] = Quaternion((Rb.inverted() @ akseli).normalized(), math.radians(k))
    return q
def kehys(paa_l, paa_w, sivu_l, sivu_w):
    """Kierto, joka vie paikallisen pääakselin maailman pääakseliksi ja sivuakselin mahdollisimman lähelle annettua."""
    def orto(a, b): a = a.normalized(); b = (b - b.dot(a) * a).normalized(); return Matrix((a, b, a.cross(b))).transposed()
    return (orto(paa_w, sivu_w) @ orto(paa_l, sivu_l).transposed()).to_quaternion()

# --- kahden luun IK yhdelle kädelle yhdessä ruudussa ---
def ik(s, M, kohde, vihje, kasi_q=None, koukku=True):
    u, l, h, c = 'upperarm_' + s, 'lowerarm_' + s, 'hand_' + s, 'clavicle_' + s
    cu = (R(u).inverted() @ R(l)).translation; cl = (R(l).inverted() @ R(h)).translation
    a, b = cu.length, cl.length; S = M[u].translation; D = kohde - S
    d = min(max(D.length, abs(a - b) + 1e-3), a + b - 1e-3); n = D.normalized()
    pitka = (a * a - b * b + d * d) / (2 * d); kork = math.sqrt(max(0.0, a * a - pitka * pitka))
    pv = vihje - S; pv = (pv - pv.dot(n) * n).normalized(); E = S + n * pitka + pv * kork
    q0 = M[u].to_quaternion(); qu = (q0 @ cu).normalized().rotation_difference((E - S).normalized()) @ q0
    Mu = Matrix.LocRotScale(S, qu, None)
    Ml0 = Mu @ R(u).inverted() @ R(l) @ PERUS[l]
    ql0 = Ml0.to_quaternion(); ql = (ql0 @ cl).normalized().rotation_difference((kohde - Ml0.translation).normalized()) @ ql0
    Ml = Matrix.LocRotScale(Ml0.translation, ql, None)
    Mh0 = Ml @ R(l).inverted() @ R(h) @ PERUS[h]
    Mh = Matrix.LocRotScale(Mh0.translation, kasi_q if kasi_q is not None else Mh0.to_quaternion(), None)
    kanta = lambda Mp, p, ch, Mc: ((Mp @ R(p).inverted() @ R(ch)).inverted() @ Mc).to_quaternion()
    tulos = {u: kanta(M[c], c, u, Mu), l: kanta(Mu, u, l, Ml), h: kanta(Ml, l, h, Mh)}
    if kasi_q is not None and koukku: tulos.update(OTE[s])  # sormet koukkuun otteeseen
    return tulos, Mh

# --- leikkeen näytteistys: perusleike ruuduittain (asennot + kanta-arvot) ---
def toimi(act):
    arm.animation_data.action = act
    if getattr(act, 'slots', None) and len(act.slots): arm.animation_data.action_slot = act.slots[0]
def nayte(act):
    toimi(act); f0, f1 = (int(round(x)) for x in act.frame_range); ruudut = []
    for f in range(f0, f1 + 1):
        sc.frame_set(f)
        ruudut.append(({pb.name: pb.matrix.copy() for pb in arm.pose.bones},
                       {pb.name: (pb.location.copy(), pb.rotation_quaternion.copy()) for pb in arm.pose.bones}))
    return ruudut
PERUS = {}
def uusi_leike(nimi, pohja, muokkaa):
    """pohja-leike näytteistetään; muokkaa(i, n, M) palauttaa {luu: kanta-kvaternio}; tulos uutena leikkeenä nimi."""
    global PERUS
    ruudut = nayte(bpy.data.actions[pohja]); n = len(ruudut)
    sijainnit = {b for b in arm.pose.bones.keys() if any(r[1][b][0].length > 1e-5 for r in ruudut)}
    vanha = bpy.data.actions.get(nimi)
    if vanha: vanha.name = nimi + '_vanha'
    uusi = bpy.data.actions.new(nimi); uusi.use_fake_user = True; arm.animation_data.action = uusi
    for i, (M, kanta) in enumerate(ruudut):
        PERUS = {b: Matrix.LocRotScale(kanta[b][0], kanta[b][1], None) for b in kanta}
        muutos = muokkaa(i, n, M)
        for pb in arm.pose.bones:
            l, q = kanta[pb.name]; pb.rotation_quaternion = muutos.get(pb.name, q); pb.keyframe_insert('rotation_quaternion', frame=i)
            if pb.name in sijainnit: pb.location = l; pb.keyframe_insert('location', frame=i)
    if vanha: bpy.data.actions.remove(vanha)
    print(f'ESINEET {nimi}: pohja {pohja}, {n} ruutua')
    return n

# --- verkot (lepoasennon mallikoordinaateissa) ---
def materiaali(nimi, rgb):
    m = bpy.data.materials.get(nimi) or bpy.data.materials.new(nimi); m.use_nodes = True
    bsdf = m.node_tree.nodes['Principled BSDF']; bsdf.inputs['Base Color'].default_value = (*rgb, 1); bsdf.inputs['Roughness'].default_value = 0.85
    return m
def lieriot(nimi, luu, osat):
    """osat: [(alku, loppu, säde_alku, säde_loppu, materiaali)] mallikoordinaateissa → yksi skinnattu verkko luuhun."""
    bm = bmesh.new(); mats = []
    for p0, p1, r0, r1, mat in osat:
        if mat not in mats: mats.append(mat)
        ax = (p1 - p0); q = V((0, 0, 1)).rotation_difference(ax.normalized())
        tulos = bmesh.ops.create_cone(bm, cap_ends=True, segments=10, radius1=r0, radius2=r1, depth=ax.length)
        for v in tulos['verts']: v.co = p0 + q @ (v.co + V((0, 0, ax.length / 2)))
        for f in {f for v in tulos['verts'] for f in v.link_faces}: f.material_index = mats.index(mat)
    me = bpy.data.meshes.new(nimi); bm.to_mesh(me); bm.free()
    for m in mats: me.materials.append(m)
    o = bpy.data.objects.new(nimi, me); sc.collection.objects.link(o); o.parent = arm
    vg = o.vertex_groups.new(name=luu); vg.add(list(range(len(me.vertices))), 1.0, 'REPLACE')
    o.modifiers.new('Armature', 'ARMATURE').object = arm
    print(f'ESINEET verkko {nimi}: {len(me.polygons)} monikulmiota → {luu}')

OTE = {s: koukistus(s) for s in ('l', 'r')}
NAKYY = {}  # esineluu → leikkeet, joissa skaala 1 (None = kaikissa)
puu, olki, tina, savi, sakki = (materiaali('esine_puu', (0.20, 0.12, 0.06)), materiaali('esine_olki', (0.48, 0.38, 0.17)),
                                materiaali('esine_tina', (0.32, 0.32, 0.30)), materiaali('esine_savi', (0.40, 0.21, 0.10)),
                                materiaali('esine_sakki', (0.36, 0.30, 0.20)))

def ote(s, suunta, sivu):
    """Kämmen otteeseen: peukalo varren suuntaan, sormet sivu-suuntaan (varren ympäri)."""
    f, t, p = kasi_akselit(s); return kehys(t, suunta, f, sivu)

for tehtava in TEHTAVAT:
    nimi, _, arvo = tehtava.partition('=')
    if nimi == 'kauha':
        pata = V(tuple(float(x) for x in arvo.split(',')))
        luo_luu('esine_tyo', 'hand_r'); NAKYY['esine_tyo'] = None
        f, t, p = kasi_akselit('r'); g = f * 0.075 + p * 0.025               # ote kämmenen keskellä
        k0 = V((pata.x + 0.04, -0.32, pata.z + 0.12)); L = (pata - k0).length       # käsi padan edessä, kauhan pituus
        Rh = R('hand_r'); a = lambda s: Rh @ (g + t * s)
        lieriot('kauha', 'esine_tyo', [(a(-0.08), a(L - 0.05), 0.012, 0.010, puu), (a(L - 0.06), a(L + 0.02), 0.05, 0.035, puu)])
        idle_n = len(nayte(bpy.data.actions['idle'])); jakso = max(1, round(idle_n / 66))  # ~2,2 s kierros
        def hammennys(i, n, M):
            w = 2 * math.pi * i * jakso / (n - 1)
            karki = pata + V((math.cos(w), math.sin(w), 0)) * 0.10
            kasi = k0 + V((math.cos(w), math.sin(w), 0)) * 0.05
            for _ in range(2):
                D = (karki - kasi).normalized(); q = kehys(t, D, f, VASEN)
                kasi_t = kasi - (q @ g)
                kk, _m = ik('r', M, kasi_t, M['upperarm_r'].translation + V((-0.25, 0.25, -0.35)), q)
            return kk
        uusi_leike('tyo', 'idle', hammennys)
    elif nimi in ('tarjotin', 'olka'):
        luo_luu('esine_kanto', 'spine_03'); NAKYY['esine_kanto'] = {'kanto', 'kanto_idle', 'kanto_puhe'}
        s = 'r' if nimi == 'tarjotin' else 'l'; Rs = R('spine_03')
        if nimi == 'tarjotin':   # vati oikealla kämmenellä olkapään korkeudella, hieman sivulla ja edessä
            kohde_lepo = V((-0.30, -0.22, 1.40)); kasi_q_lepo = kehys(kasi_akselit('r')[2], -YLOS, kasi_akselit('r')[0], ETEEN + VASEN * 0.3)
            c = kohde_lepo + V((0, 0, 0.06))
            osat = [(c, c + V((0, 0, 0.025)), 0.2, 0.2, tina)]
            for dx, dy in ((-0.07, 0.05), (0.08, 0.03), (0.0, -0.09)):
                b0 = c + V((dx, dy, 0.025)); osat.append((b0, b0 + V((0, 0, 0.045)), 0.045, 0.065, savi))
            lieriot('vati', 'esine_kanto', osat); vihje = V((-0.45, 0.25, 0.95))
        else:                    # säkki vasemmalla olalla (pitkittäin), vasen käsi säkin etupäässä
            c = V((0.25, 0.06, 1.58)); y = lambda d: c + V((0, d, 0))   # säkki: pullea keskeltä, suppenevat päät
            lieriot('sakki', 'esine_kanto', [(y(0.24), y(0.14), 0.06, 0.14, sakki), (y(0.14), y(-0.14), 0.14, 0.14, sakki), (y(-0.14), y(-0.24), 0.14, 0.06, sakki)])
            kohde_lepo = V((0.24, -0.16, 1.50)); kasi_q_lepo = kehys(kasi_akselit('l')[2], ETEEN + YLOS * 0.4, kasi_akselit('l')[0], YLOS)
            vihje = V((0.45, -0.20, 1.05))
        def kanto(i, n, M, s=s, kohde_lepo=kohde_lepo, kasi_q_lepo=kasi_q_lepo, vihje=vihje, koukku=nimi == 'olka'):
            Ms = M['spine_03'] @ Rs.inverted(); q = Ms.to_quaternion() @ kasi_q_lepo
            return ik(s, M, Ms @ kohde_lepo, Ms @ vihje, q, koukku)[0]  # vati lepää avokämmenellä
        for leike, pohja in (('kanto', 'kavely'), ('kanto_idle', 'idle'), ('kanto_puhe', 'puhe')): uusi_leike(leike, pohja, kanto)
    elif nimi == 'luuta':
        luo_luu('esine_tyo', 'hand_r'); NAKYY['esine_tyo'] = {'tyo', 'tyo_puhe'}
        f, t, p = kasi_akselit('r'); g = f * 0.075 + p * 0.025
        R0 = V((-0.16, -0.32, 0.92)); B_keski = V((-0.05, -0.80, 0.0)); L = (B_keski - R0).length
        Rh = R('hand_r'); a = lambda s_: Rh @ (g + t * s_)
        lieriot('luuta', 'esine_tyo', [(a(-0.55), a(L - 0.30), 0.014, 0.014, puu), (a(L - 0.32), a(L + 0.02), 0.035, 0.10, olki)])
        fl, tl, pl = kasi_akselit('l'); gl = fl * 0.075 + pl * 0.025
        def veto(u):
            """u ∈ [0, 1): veto oikealta vasemmalle (0–0,6) ja paluu ilmassa (0,6–1). Palauttaa harjan pään ja oikean käden."""
            if u < 0.6: x = u / 0.6; x = x * x * (3 - 2 * x); sx = -1 + 2 * x; z = 0.0
            else: x = (u - 0.6) / 0.4; x = x * x * (3 - 2 * x); sx = 1 - 2 * x; z = 0.06 * math.sin(math.pi * x)
            return B_keski + V((0.35 * sx, 0.04 * sx * sx, z)), R0 + V((0.10 * sx, 0, 0.02 * sx))
        def lakaisu(i, n, M, liike=True):
            u = (i * jakso / (n - 1)) % 1.0 if liike else 0.3
            B, kasi = veto(u)
            for _ in range(2):
                D = (B - kasi).normalized(); q = kehys(t, D, f, VASEN); kasi_t = kasi - (q @ g)
            oikea = ik('r', M, kasi_t, M['upperarm_r'].translation + V((-0.30, 0.30, -0.30)), q)[0]
            ylakasi = kasi - D * 0.42; ql = kehys(tl, D, fl, -VASEN)
            vasen = ik('l', M, ylakasi - (ql @ gl), M['upperarm_l'].translation + V((0.30, 0.20, -0.30)), ql)[0]
            return {**oikea, **vasen}
        idle_n = len(nayte(bpy.data.actions['idle'])); jakso = max(1, round(idle_n / 48))  # ~1,6 s veto
        uusi_leike('tyo', 'idle', lakaisu)
        uusi_leike('tyo_puhe', 'puhe', lambda i, n, M: lakaisu(i, n, M, liike=False))
    else:
        raise SystemExit(f'tuntematon tehtävä {tehtava}')

# --- näkyvyys: esineluun skaala jokaiseen leikkeeseen ---
for act in bpy.data.actions:
    toimi(act); f0, f1 = (int(round(x)) for x in act.frame_range)
    for luu, leikkeet in NAKYY.items():
        pb = arm.pose.bones[luu]; s = 1.0 if leikkeet is None or act.name in leikkeet else 0.0
        pb.location = V(); pb.rotation_quaternion = Quaternion(); pb.scale = V((s, s, s))
        for f in (f0, f1):
            for kanava in ('location', 'rotation_quaternion', 'scale'): pb.keyframe_insert(kanava, frame=f)
arm.animation_data.action = None
for pb in arm.pose.bones: pb.matrix_basis = Matrix()
bpy.ops.object.select_all(action='DESELECT'); arm.select_set(True)
for o in arm.children: o.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.export_scene.gltf(filepath=ULOS, use_selection=True, export_format='GLB', export_animation_mode='ACTIONS', export_skins=True,
                          export_yup=True, export_apply=False, export_image_format='JPEG', export_jpeg_quality=85)
print('ESINEET valmis', ULOS, sorted(a.name for a in bpy.data.actions), 'luita', len(arm.data.bones))
