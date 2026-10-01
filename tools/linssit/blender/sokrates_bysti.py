# SOKRATEEN KIPSIBYSTI (Linnanrakentaja 1.10.2026; omistajan hyväksymä pilotti "Ajattelijat", Päätoimittajan tilaus).
# Lähde: SMK – Statens Museum for Kunst, KAS635 "Portræt af Sokrates (469–399 f.Kr.)", kipsivalos (Formeri: Rom,
# Malpieri nr. 101), korkeus 51 cm, Public Domain Mark 1.0; 3D-tiedosto museon palvelimelta
# (api.smk.dk/api/v1/download-3d/gh93h3975_179-smk-inv-635.stl), skannaus: Scan the World / SMK.
# Mallikuva: valkoinen kipsi (matta, hento pinnanalainen sironta) tummaa taustaa vasten, sivuvalo, ja kasvoille
# projektorista heijastettu mietelause (gobo: sokrates_gobo.py), joka kaartuu kasvojen muotojen mukaan.
#   Blender -b -P sokrates_bysti.py -- --malli <ulos.png> --gobo <gobo.png> --koko <L> <K> [--naytteita 256]
import math, os, sys
import bpy
from mathutils import Vector

A = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
STL = '/Users/Shared/Claude/proto-3d/_lahteet/smk/KAS635/smk-inv-635.stl'
KORKEUS = 0.51                       # museon mitta (cm → m); skannauksen yksiköt ovat mielivaltaiset
PH = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven'   # CC0-tekstuurit (v7: grey_plaster_02)
GOBO_LEV, GOBO_KORK = 0.172, 0.129     # gobon ala projisointietäisyydellä (m), kuvasuhde 4:3 kuten sokrates_gobo.py


def tuo():
    bpy.ops.wm.stl_import(filepath=STL)
    o = bpy.context.selected_objects[0]; o.name = 'sokrates'
    bb = [Vector(c) for c in o.bound_box]
    mn = Vector((min(v.x for v in bb), min(v.y for v in bb), min(v.z for v in bb)))
    mx = Vector((max(v.x for v in bb), max(v.y for v in bb), max(v.z for v in bb)))
    s = KORKEUS / (mx.z - mn.z)
    o.scale = (s, s, s); o.location = (-(mn.x + mx.x) / 2 * s, -(mn.y + mx.y) / 2 * s, -mn.z * s)
    bpy.ops.object.transform_apply(location=True, scale=True)
    bpy.ops.object.shade_smooth()
    return o


def kipsi():
    m = bpy.data.materials.new('kipsi'); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.86, 0.85, 0.82, 1); b.inputs['Roughness'].default_value = 0.62
    b.inputs['Subsurface Weight'].default_value = 0.18; b.inputs['Subsurface Radius'].default_value = (0.006, 0.004, 0.003)
    b.inputs['Specular IOR Level'].default_value = 0.3
    return m


def kohdista(o, kohde):
    o.rotation_euler = (Vector(kohde) - o.location).to_track_quat('-Z', 'Y').to_euler()


def projektori(gobo, kohde, etaisyys=1.6, voima=260.0, lev=None, suunta=None, nimi='projektori', pehmeys=0.002):
    """Spottivalo gobokuvalla: valon suunta (valon avaruudessa, −Z eteen) → kuvan uv perspektiivijaolla.
    lev: tekstin leveys kohteessa (m), korkeus kuvasuhteesta; suunta: kohteesta projektoriin (oletus edestä)."""
    kuva_ = bpy.data.images.load(gobo)
    if lev is None:
        ala_l, ala_k = GOBO_LEV, GOBO_KORK
    else:
        ala_l, ala_k = lev, lev * kuva_.size[1] / kuva_.size[0]
    d = bpy.data.lights.new(nimi, 'SPOT'); d.spot_blend = 0.0
    d.spot_size = min(math.radians(170), 2.4 * math.atan(max(ala_l, ala_k) / 2 / etaisyys))
    d.shadow_soft_size = pehmeys; d.energy = voima; d.color = (1.0, 0.95, 0.86); d.use_nodes = True
    nt = d.node_tree; nt.nodes.clear()
    tc = nt.nodes.new('ShaderNodeTexCoord'); sx = nt.nodes.new('ShaderNodeSeparateXYZ')
    nt.links.new(tc.outputs['Normal'], sx.inputs['Vector'])
    z = nt.nodes.new('ShaderNodeMath'); z.operation = 'MULTIPLY'; z.inputs[1].default_value = -1.0
    nt.links.new(sx.outputs['Z'], z.inputs[0])
    uv = []
    for akseli, ala in (('X', ala_l), ('Y', ala_k)):
        jako = nt.nodes.new('ShaderNodeMath'); jako.operation = 'DIVIDE'
        nt.links.new(sx.outputs[akseli], jako.inputs[0]); nt.links.new(z.outputs['Value'], jako.inputs[1])
        kerto = nt.nodes.new('ShaderNodeMath'); kerto.operation = 'MULTIPLY_ADD'
        kerto.inputs[1].default_value = etaisyys / ala; kerto.inputs[2].default_value = 0.5
        nt.links.new(jako.outputs['Value'], kerto.inputs[0]); uv.append(kerto)
    yh = nt.nodes.new('ShaderNodeCombineXYZ')
    nt.links.new(uv[0].outputs['Value'], yh.inputs['X']); nt.links.new(uv[1].outputs['Value'], yh.inputs['Y'])
    kuva = nt.nodes.new('ShaderNodeTexImage'); kuva.image = kuva_; kuva.extension = 'CLIP'
    nt.links.new(yh.outputs['Vector'], kuva.inputs['Vector'])
    em = nt.nodes.new('ShaderNodeEmission'); nt.links.new(kuva.outputs['Color'], em.inputs['Strength'])
    em.inputs['Color'].default_value = (1, 1, 1, 1)
    out = nt.nodes.new('ShaderNodeOutputLight'); nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
    o = bpy.data.objects.new(nimi, d); bpy.context.scene.collection.objects.link(o)
    suunta = (suunta or Vector((0.0, -1.0, 0.08))).normalized()
    o.location = Vector(kohde) + suunta * etaisyys; kohdista(o, kohde)
    return o


def valot():
    sc = bpy.context.scene
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.012, 0.012, 0.016, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0
    # sivuvalo vasemmalta, hieman edestä ja ylhäältä; heikko vastavalo oikealta takaa reunaksi
    for nimi, paikka, energia, koko, vari in (('sivu', (-1.3, -0.25, 0.75), 11, 0.45, (1.0, 0.96, 0.9)),
                                              ('reuna', (0.9, 0.9, 0.7), 9, 0.3, (0.8, 0.86, 1.0)),
                                              ('tayte', (0.6, -1.4, 0.3), 0.6, 1.2, (0.85, 0.88, 1.0))):
        d = bpy.data.lights.new(nimi, 'AREA'); d.energy = energia; d.size = koko; d.color = vari
        o = bpy.data.objects.new(nimi, d); sc.collection.objects.link(o); o.location = paikka; kohdista(o, (0, 0, 0.36))


def kasvot(o):
    """Kasvojen etupinta säteellä edestä silmien korkeudelta (z = 0,74 · korkeus)."""
    dg = bpy.context.evaluated_depsgraph_get(); z = 0.74 * KORKEUS
    osui, p, *_ = bpy.context.scene.ray_cast(dg, Vector((0, -2, z)), Vector((0, 1, 0)))
    return (0.0, p.y if osui else -0.12, z)


def rakenna(naytteita):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for dv in pr.devices: dv.use = True
        sc.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.cycles.samples = naytteita; sc.cycles.use_denoising = True
    o = tuo(); o.data.materials.append(kipsi()); valot()
    return o


if '--malli' in A:
    ULOS = A[A.index('--malli') + 1]; GOBO = A[A.index('--gobo') + 1]
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 256
    o = rakenna(N); sc = bpy.context.scene
    k = kasvot(o); print('SOKRATES: kasvot', tuple(round(v, 3) for v in k))
    projektori(GOBO, (0.0, k[1], k[2] - 0.002))
    # kamera: 85 mm, hieman vasemmalta; pysty → koko bysti, vaaka → bysti koko korkeudelta
    cd = bpy.data.cameras.new('k'); cd.lens = 85; cd.sensor_fit = 'VERTICAL'
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    pysty = KORK > LEV
    kohde = Vector((0.0, -0.03, 0.20 if pysty else 0.27)); etai = 2.95 if pysty else 2.0
    suunta = Vector((-0.12, -1.0, 0.07)).normalized()
    cam.location = kohde + suunta * etai; kohdista(cam, kohde)
    cd.sensor_height = 24
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True); print('SOKRATES: malli', ULOS)


# ---------- laatutasot ja vienti ----------
# --lod <ulos>: L0 ~200 k (normaalikartta 2048 leivottu 2 M -skannauksesta), L1 ~50 k (1024), L2 ~12 k (1024),
# symboli ~3 k (karttasymboli, ei karttaa). Kukin GLB:nä: valkoinen kipsi (baseColor 0,86/0,85/0,82, karheus 0,62).
LOD = (('L0', 200_000, 2048), ('L1', 50_000, 1024), ('L2', 12_000, 1024), ('symboli', 3_000, 0))


def _kopio(o, nimi, kolmiot):
    c = o.copy(); c.data = o.data.copy(); c.name = nimi; bpy.context.scene.collection.objects.link(c)
    md = c.modifiers.new('karsi', 'DECIMATE'); md.ratio = kolmiot / len(o.data.polygons); md.use_collapse_triangulate = True
    bpy.ops.object.select_all(action='DESELECT'); c.select_set(True); bpy.context.view_layer.objects.active = c
    bpy.ops.object.modifier_apply(modifier='karsi'); return c


def _uv(c):
    bpy.ops.object.select_all(action='DESELECT'); c.select_set(True); bpy.context.view_layer.objects.active = c
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.004)
    bpy.ops.object.mode_set(mode='OBJECT')


def _leivo(lahde, c, koko, polku):
    img = bpy.data.images.new(f'nor-{c.name}', koko, koko, alpha=False, float_buffer=False)
    img.colorspace_settings.name = 'Non-Color'; img.generated_color = (0.5, 0.5, 1.0, 1.0)
    m = bpy.data.materials.new(f'kipsi-{c.name}'); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.86, 0.85, 0.82, 1); b.inputs['Roughness'].default_value = 0.62
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; nt.nodes.active = t
    c.data.materials.clear(); c.data.materials.append(m)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = 1
    bpy.ops.object.select_all(action='DESELECT'); lahde.select_set(True); c.select_set(True)
    bpy.context.view_layer.objects.active = c
    bk = sc.render.bake; bk.use_selected_to_active = True; bk.cage_extrusion = 0.002; bk.max_ray_distance = 0.006
    bk.margin = 8; bk.normal_space = 'TANGENT'
    bpy.ops.object.bake(type='NORMAL')
    img.filepath_raw = polku; img.file_format = 'PNG'; img.save()
    # vientiä varten normaalikartta kiinni materiaaliin
    nm = nt.nodes.new('ShaderNodeNormalMap'); nt.links.new(t.outputs['Color'], nm.inputs['Color'])
    nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])


def _vie(c, polku):
    bpy.ops.object.select_all(action='DESELECT'); c.select_set(True); bpy.context.view_layer.objects.active = c
    bpy.ops.export_scene.gltf(filepath=polku, use_selection=True, export_format='GLB', export_apply=True,
                              export_image_format='AUTO', export_yup=True)


if '--lod' in A:
    ULOS = A[A.index('--lod') + 1]; os.makedirs(ULOS, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for dv in pr.devices: dv.use = True
        bpy.context.scene.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    o = tuo()
    for nimi, kolmiot, kartta in LOD:
        c = _kopio(o, f'sokrates-{nimi}', kolmiot); print('SOKRATES:', nimi, len(c.data.polygons), 'kolmiota')
        if kartta:
            _uv(c); _leivo(o, c, kartta, os.path.join(ULOS, f'sokrates-{nimi}-nor.png'))
        else:
            m = bpy.data.materials.new('kipsi-symboli'); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
            b.inputs['Base Color'].default_value = (0.86, 0.85, 0.82, 1); b.inputs['Roughness'].default_value = 0.62
            c.data.materials.clear(); c.data.materials.append(m)
        _vie(c, os.path.join(ULOS, f'sokrates-{nimi}.glb')); print('SOKRATES: vienti', nimi)


# ---------- mallikuva v2 (omistaja 1.10. 21.4x): suomennos pinnoittain + kamera-ajo ----------
# Lause jaetaan pinnoille, kukin oma projektorinsa pinnan normaalin suunnasta (teksti seuraa pinnan muotoa):
#   "Tutkimaton elämä" otsalle, "ei ole elämisen / arvoinen" vasemmalle (katsojasta) poskelle, "ihmiselle" rinnalle
#   (aataminomena jää parran alle). Kamera: kokonaiskuva → otsa → poski → rinta, jokainen osa lähikuvana luettava.
#   Blender -b -P sokrates_bysti.py -- --v2 <gobokansio> <ulos-kansio> --koko <L> <K> [--naytteita 16] [--ruudut 1,90,160]
PINNAT = (  # nimi, säteen (x, z) edestä, tekstin leveys kohteessa (m), sivusuunnan painotus normaaliin
    ('otsa', (0.0, 0.438), 0.118, 0.6),
    ('poski', (-0.052, 0.350), 0.056, 0.7),
    ('rinta', (0.0, 0.110), 0.100, 0.5),
)
AIKA = ((1, 'koko'), (24, 'koko'), (75, 'otsa'), (100, 'otsa'), (145, 'poski'), (170, 'poski'), (215, 'rinta'), (240, 'rinta'))


def osuma(x, z):
    dg = bpy.context.evaluated_depsgraph_get()
    osui, p, n, *_ = bpy.context.scene.ray_cast(dg, Vector((x, -2, z)), Vector((0, 1, 0)))
    return p, n


if '--v2' in A:
    i = A.index('--v2'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 16
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; eteen = Vector((-0.12, -1.0, 0.07)).normalized()
    kohteet = {}
    for nimi, (x, z), lev, paino in PINNAT:
        p, n = osuma(x, z); suunta = (n * paino + Vector((0, -1, 0.05)) * (1 - paino)).normalized()
        projektori(os.path.join(GOBOT, f'gobo-{nimi}.png'), p, etaisyys=0.8, voima=60.0, lev=lev, suunta=suunta,
                   nimi=f'projektori-{nimi}', pehmeys=0.0)   # pistevalo: valon koko sumentaisi pienen tekstin
        # kamera: kuvan leveys ≈ 1,35 × tekstin leveys (85 mm, pystykuvan vaakakenttä = 24 mm · L/K)
        d = lev * 1.35 * 85 / (24 * LEV / KORK)
        kam_suunta = (suunta + eteen).normalized()
        kohteet[nimi] = (p + kam_suunta * d, p)
        print('SOKRATES: pinta', nimi, tuple(round(v, 3) for v in p), 'kamera', round(d, 2), 'm')
    kohde_koko = Vector((0.0, -0.03, 0.20)); kohteet['koko'] = (kohde_koko + eteen * 2.95, kohde_koko)
    cd = bpy.data.cameras.new('k'); cd.lens = 85; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.02
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    for ruutu, nimi in AIKA:
        cam.location, tahtain.location = kohteet[nimi]
        cam.keyframe_insert('location', frame=ruutu); tahtain.keyframe_insert('location', frame=ruutu)
    for ob in (cam, tahtain):   # pehmeät kiihdytykset ja jarrutukset
        for fc in ob.animation_data.action.fcurves if hasattr(ob.animation_data.action, 'fcurves') else []:
            for kp in fc.keyframe_points: kp.interpolation = 'BEZIER'; kp.easing = 'EASE_IN_OUT'
    sc.frame_start, sc.frame_end = 1, AIKA[-1][0]; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or range(sc.frame_start, sc.frame_end + 1)):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v2 valmis', ULOS)


# ---------- mallikuva v3 (omistaja 1.10. 21.5x): videotykki jättiläiskasvoilla, yksi teksti kerrallaan ----------
# - Projektori vinosti (vasemmalta alta) → kirjaimet taipuvat ryppyjen, kulmakaarten ja nenänvarren mukaan, kuopissa
#   tummempi, kipsin rakenne näkyy läpi. Gobo 16:9 (sokrates_gobo.py --tykki): halo + musta taso, lineaarisena.
# - Osat syttyvät kameran saapuessa (0,5 s) ja sammuvat ennen seuraavaa: otsa → poski → rinta → vetäytyminen.
# - Jättiläisen mittakaava: 24 mm lähellä pintaa, matala kulma; hento keila (tilavuuskartio) ja pölyhiukkaset keilassa.
#   Blender -b -P sokrates_bysti.py -- --v3 <gobot> <ulos> --koko L K [--naytteita 24] [--ruudut ...]
V3_PINNAT = (  # nimi, säde (x, z), tekstin leveys pinnalla (m), projektorin suunta normaaliin lisättynä
    ('otsa', (-0.008, 0.440), 0.092, (-0.35, -0.20, -0.30)),
    ('poski', (-0.052, 0.350), 0.056, (-0.55, -0.15, -0.40)),
    ('rinta', (0.0, 0.110), 0.095, (-0.55, -0.15, -0.40)),
)
#        ruutu, kameran paikka
V3_AIKA = ((1, 'koko'), (30, 'koko'), (80, 'otsa'), (135, 'otsa'), (180, 'poski'), (235, 'poski'),
           (280, 'rinta'), (335, 'rinta'), (375, 'loppu'), (420, 'loppu'))
V3_VALOT = {'otsa': (80, 125), 'poski': (180, 225), 'rinta': (280, 325)}    # syttyy alusta 15 r, sammuu lopusta 10 r
V3_LINSSI = 24


def _sammuta_paalle(o, alku, loppu, voima):
    for r, v in ((1, 0), (alku, 0), (alku + 15, voima), (loppu, voima), (loppu + 10, 0)):
        o.data.energy = v; o.data.keyframe_insert('energy', frame=r)


def _keila(nimi, karki, kohde, sade, tiheys=0.35):
    """Hento valokeila: tilavuuskartio projektorista pinnalle (näkyy vain spotin valossa)."""
    import bmesh
    v = Vector(kohde) - Vector(karki); L = v.length
    bm = bmesh.new(); bmesh.ops.create_cone(bm, cap_ends=True, segments=32, radius1=0.0005, radius2=sade, depth=L)
    me = bpy.data.meshes.new(nimi); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o)
    o.location = (Vector(karki) + Vector(kohde)) / 2; o.rotation_euler = v.to_track_quat('Z', 'Y').to_euler()
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    pv = nt.nodes.new('ShaderNodeVolumePrincipled'); pv.inputs['Density'].default_value = tiheys
    pv.inputs['Anisotropy'].default_value = 0.55
    out = nt.nodes.new('ShaderNodeOutputMaterial'); nt.links.new(pv.outputs['Volume'], out.inputs['Volume'])
    me.materials.append(m); o.visible_shadow = False
    return o


def _polya(kohde, suunta, maara, rnd, nakyvissa):
    """Pölyhiukkaset kohteen edessä; näkyvissä vain oman projektorin palaessa (muuten sivuvalo valaisisi ne)."""
    m = bpy.data.materials.new('poly'); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.9, 0.88, 0.85, 1); b.inputs['Roughness'].default_value = 1.0
    me = bpy.data.meshes.new('hiukkanen'); import bmesh; bm = bmesh.new()
    bmesh.ops.create_icosphere(bm, subdivisions=1, radius=0.00014); bm.to_mesh(me); bm.free(); me.materials.append(m)
    for i in range(maara):
        t = rnd.uniform(0.01, 0.09)          # vain pinnan lähellä: kameran edessä hiukkanen näkyisi läiskänä
        p = Vector(kohde) + suunta * t + Vector((rnd.uniform(-1, 1), rnd.uniform(-1, 1), rnd.uniform(-1, 1))) * (0.015 + t * 0.3)
        o = bpy.data.objects.new('poly', me); bpy.context.scene.collection.objects.link(o); o.location = p
        o.visible_shadow = False
        for r, nakyy in ((1, False), (nakyvissa[0], True), (nakyvissa[1] + 10, False)):
            o.hide_render = not nakyy; o.keyframe_insert('hide_render', frame=r)


def _kipsin_rakenne(o):
    """Kipsin hieno huokoisuus kuhmuna (näkyy kirjainten läpi lähikuvassa)."""
    m = o.data.materials[0]; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); no = nt.nodes.new('ShaderNodeTexNoise')
    no.inputs['Scale'].default_value = 900; no.inputs['Detail'].default_value = 6; no.inputs['Roughness'].default_value = 0.7
    nt.links.new(tc.outputs['Object'], no.inputs['Vector'])
    bu = nt.nodes.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.12; bu.inputs['Distance'].default_value = 0.0004
    nt.links.new(no.outputs['Fac'], bu.inputs['Height']); nt.links.new(bu.outputs['Normal'], b.inputs['Normal'])


if '--v3' in A:
    import random
    i = A.index('--v3'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 24
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; _kipsin_rakenne(o); rnd = random.Random(38)
    sc.cycles.volume_bounces = 0; sc.cycles.volume_step_rate = 4.0
    eteen = Vector((-0.12, -1.0, 0.07)).normalized()
    vaaka = 24 * LEV / KORK                                   # pystykuvan vaakakenttä (mm)
    kohteet = {}
    osumat = {nimi: osuma(x, z) for nimi, (x, z), *_ in V3_PINNAT}   # ennen keiloja ja pölyä (säde osuisi niihin)
    for nimi, (x, z), lev, vino in V3_PINNAT:
        p, n = osumat[nimi]
        # projektori vinosti vasemmalta alta (n. 30–35°); kamera matalalta, lähellä projektorin akselia
        pr_suunta = (n + Vector(vino)).normalized()
        gobo = os.path.join(GOBOT, f'gobo-{nimi}.png')
        pj = projektori(gobo, p, etaisyys=0.75, voima=1.0, lev=lev / 0.62, suunta=pr_suunta, nimi=f'tykki-{nimi}', pehmeys=0.0)
        pj.data.color = (1.0, 0.93, 0.80)
        for nd in pj.data.node_tree.nodes:
            if nd.type == 'TEX_IMAGE': nd.image.colorspace_settings.name = 'Non-Color'
        _sammuta_paalle(pj, *V3_VALOT[nimi], 55.0)
        keila = _keila(f'keila-{nimi}', pj.location, p, lev / 0.62 * 0.75)
        for r, nakyy in ((1, False), (V3_VALOT[nimi][0], True), (V3_VALOT[nimi][1] + 10, False)):
            keila.hide_render = not nakyy; keila.keyframe_insert('hide_render', frame=r)
        _polya(p, pr_suunta, 220, rnd, V3_VALOT[nimi])
        kam_suunta = (n + Vector((-0.25, -0.2, -0.55))).normalized()
        d = lev * 1.3 * V3_LINSSI / vaaka
        kohteet[nimi] = (p + kam_suunta * d, p + Vector((0, 0, 0.004)))
        print('SOKRATES v3: pinta', nimi, tuple(round(v, 3) for v in p), 'kamera', round(d, 3), 'm')
    kohde_koko = Vector((0.0, -0.03, 0.20)); kohteet['koko'] = (kohde_koko + eteen * 0.95, kohde_koko)
    kohde_loppu = Vector((0.0, -0.05, 0.30)); kohteet['loppu'] = (kohde_loppu + (eteen + Vector((0, 0, -0.25))).normalized() * 0.62, kohde_loppu)
    cd = bpy.data.cameras.new('k'); cd.lens = V3_LINSSI; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.01
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    for ruutu, nimi in V3_AIKA:
        cam.location, tahtain.location = kohteet[nimi]
        cam.keyframe_insert('location', frame=ruutu); tahtain.keyframe_insert('location', frame=ruutu)
    sc.frame_start, sc.frame_end = 1, V3_AIKA[-1][0]; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or range(sc.frame_start, sc.frame_end + 1)):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v3 valmis', ULOS)


# ---------- mallikuva v3b (omistaja 1.10. 21.5x, tarkennus): ilmakuva vuoristosta, vierivä teksti ----------
# Kamera sukeltaa pinnan lähelle ja liitää matalassa viistossa kulmassa (kasvot eivät näytä kasvoilta); projektorin
# tekstinauha vierii pinnan poikki (~3 s) ja taipuu harjanteiden ja laaksojen mukaan; musta taso (kehys) pysyy paikallaan.
# Yksi teksti kerrallaan: otsa → poski → rinta; lopuksi vetäytyminen koko bystiin (teksti alareunaan jälkikäsittelyssä).
#   Blender -b -P sokrates_bysti.py -- --v3b <gobot> <ulos> --koko L K [--naytteita 16] [--ruudut ...]
V3B_PINNAT = (  # nimi, säde (x, z), nauhan korkeus pinnalla (m), projektorin vinous normaaliin, kehyksen leveys (m),
               # kameran kulma pintaan (°): otsa jyrkemmin, koska kupoli kaartuu pois ja teksti jäisi horisonttiin
    ('otsa', (-0.005, 0.418), 0.015, (-0.40, -0.15, -0.30), 0.07, 55),
    ('poski', (-0.055, 0.352), 0.012, (-0.55, -0.15, -0.30), 0.06, 38),
    ('rinta', (0.0, 0.115), 0.017, (-0.50, -0.15, -0.35), 0.08, 35),
)
V3B_LINSSI = 18
V3B_LENTO = {'otsa': (80, 160), 'poski': (195, 285), 'rinta': (320, 395)}
V3B_LOPPU = 485              # vetäytyminen 395→440, loppuun pysähdys; teksti alareunaan 445→460 (jälkikäsittely)


def vieriva_projektori(nimi, p, suunta, etaisyys, kehys_lev, kehys_kuva, nauha_kuva, nauha_kork, ruudut, voima):
    """Spotti: staattinen musta taso (kehys) + vierivä tekstinauha; siirto animoituna (Value-solmu)."""
    nk = bpy.data.images.load(nauha_kuva); nk.colorspace_settings.name = 'Non-Color'
    kk = bpy.data.images.load(kehys_kuva) if kehys_kuva else None
    if kk: kk.colorspace_settings.name = 'Non-Color'
    kehys_kork = kehys_lev * (kk.size[1] / kk.size[0] if kk else 9 / 16); nauha_lev = nauha_kork * nk.size[0] / nk.size[1]
    d = bpy.data.lights.new(nimi, 'SPOT'); d.spot_blend = 0.0 if kk else 0.45; d.shadow_soft_size = 0.0
    d.spot_size = 2.4 * math.atan(kehys_lev / 2 / etaisyys); d.color = (1.0, 0.93, 0.80); d.use_nodes = True
    nt = d.node_tree; nt.nodes.clear()
    tc = nt.nodes.new('ShaderNodeTexCoord'); sx = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Normal'], sx.inputs['Vector'])
    z = nt.nodes.new('ShaderNodeMath'); z.operation = 'MULTIPLY'; z.inputs[1].default_value = -1.0; nt.links.new(sx.outputs['Z'], z.inputs[0])
    def jaa(akseli):
        j = nt.nodes.new('ShaderNodeMath'); j.operation = 'DIVIDE'
        nt.links.new(sx.outputs[akseli], j.inputs[0]); nt.links.new(z.outputs['Value'], j.inputs[1]); return j.outputs['Value']
    jx, jy = jaa('X'), jaa('Y')
    def kerro_lisaa(sis, k, c):
        m = nt.nodes.new('ShaderNodeMath'); m.operation = 'MULTIPLY_ADD'; m.inputs[1].default_value = k; m.inputs[2].default_value = c
        nt.links.new(sis, m.inputs[0]); return m.outputs['Value']
    def kuva(img, u, v):
        yh = nt.nodes.new('ShaderNodeCombineXYZ'); nt.links.new(u, yh.inputs['X']); nt.links.new(v, yh.inputs['Y'])
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; t.extension = 'CLIP'; nt.links.new(yh.outputs['Vector'], t.inputs['Vector'])
        return t.outputs['Color']
    kehys = kuva(kk, kerro_lisaa(jx, etaisyys / kehys_lev, 0.5), kerro_lisaa(jy, etaisyys / kehys_kork, 0.5)) if kk else None
    siirto = nt.nodes.new('ShaderNodeValue'); siirto.name = 'siirto'
    ux = nt.nodes.new('ShaderNodeMath'); ux.operation = 'ADD'
    nt.links.new(kerro_lisaa(jx, etaisyys / nauha_lev, 0.5), ux.inputs[0]); nt.links.new(siirto.outputs['Value'], ux.inputs[1])
    nauha = kuva(nk, ux.outputs['Value'], kerro_lisaa(jy, etaisyys / nauha_kork, 0.5))
    em = nt.nodes.new('ShaderNodeEmission')
    if kehys:
        # nauha näkyy vain kehyksen sisällä (videotykin kuva-ala)
        sis = nt.nodes.new('ShaderNodeMath'); sis.operation = 'GREATER_THAN'; sis.inputs[1].default_value = 0.0
        nt.links.new(kehys, sis.inputs[0])
        nm = nt.nodes.new('ShaderNodeMath'); nm.operation = 'MULTIPLY'; nt.links.new(nauha, nm.inputs[0]); nt.links.new(sis.outputs['Value'], nm.inputs[1])
        summa = nt.nodes.new('ShaderNodeMath'); summa.operation = 'ADD'; nt.links.new(nm.outputs['Value'], summa.inputs[0]); nt.links.new(kehys, summa.inputs[1])
        nt.links.new(summa.outputs['Value'], em.inputs['Strength'])
    else:   # v4: vain kirjaimet; spotin pehmeä reuna häivyttää nauhan sisään ja ulos
        nt.links.new(nauha, em.inputs['Strength'])
    out = nt.nodes.new('ShaderNodeOutputLight'); nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
    o = bpy.data.objects.new(nimi, d); bpy.context.scene.collection.objects.link(o)
    o.location = Vector(p) + suunta.normalized() * etaisyys; kohdista(o, p)
    alku, loppu = ruudut; s0 = 0.5 + kehys_lev / 2 / nauha_lev
    sv = siirto.outputs['Value']
    for r, v in ((alku + 4, -s0), (loppu - 4, s0)):
        sv.default_value = v; sv.keyframe_insert('default_value', frame=r)
    for r, v in ((1, 0), (alku, 0), (alku + 6, voima), (loppu - 6, voima), (loppu, 0)):
        d.energy = v; d.keyframe_insert('energy', frame=r)
    for fc in (d.node_tree.animation_data.action.fcurves if d.node_tree.animation_data and hasattr(d.node_tree.animation_data.action, 'fcurves') else []):
        for kp in fc.keyframe_points: kp.interpolation = 'LINEAR'
    return o


def lentoasento(p, n, kulma=38, matka=0.09):
    """Kamera pinnan alapuolelta katsoen ylös pintaa pitkin (kirjaimet pystyssä), matalassa kulmassa; nostetaan,
    jos pinta peittää näkymän."""
    zk = Vector((0, 0, 1)); u = (zk - n * zk.dot(n)).normalized(); t = u.cross(n).normalized()
    a = math.radians(kulma); f = (u * math.cos(a) - n * math.sin(a)).normalized()
    dg = bpy.context.evaluated_depsgraph_get()
    for _ in range(8):
        c = p - f * matka
        osui, q, *_ = bpy.context.scene.ray_cast(dg, c, (p - c).normalized(), distance=(p - c).length - 0.004)
        if not osui: break
        a += math.radians(6); f = (u * math.cos(a) - n * math.sin(a)).normalized()
    return c, t, u


if '--v3b' in A:
    import random
    i = A.index('--v3b'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 16
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; _kipsin_rakenne(o); rnd = random.Random(38)
    osumat = {nimi: osuma(x, z) for nimi, (x, z), *_ in V3B_PINNAT}
    eteen = Vector((-0.12, -1.0, 0.07)).normalized()
    avaimet = []                       # (ruutu, kameran paikka, katsepiste)
    kohde_koko = Vector((0.0, -0.03, 0.22)); avaimet += [(1, kohde_koko + eteen * 0.80, kohde_koko), (45, kohde_koko + eteen * 0.72, kohde_koko)]
    edellinen = None
    for nimi, (x, z), nauha_kork, vino, kehys_lev, kulma in V3B_PINNAT:
        p, n = osumat[nimi]; alku, loppu = V3B_LENTO[nimi]
        pr_suunta = (n + Vector(vino)).normalized()
        vieriva_projektori(f'tykki-{nimi}', p, pr_suunta, 0.6, kehys_lev, os.path.join(GOBOT, 'kehys.png'),
                           os.path.join(GOBOT, f'nauha-{nimi}.png'), nauha_kork, (alku, loppu), 70.0)
        _polya(p, pr_suunta, 60, rnd, (alku, loppu))
        c, t, u = lentoasento(p, n, kulma=kulma)
        siirtyma = t * 0.012 + u * 0.006
        if edellinen is not None:      # siirtymä nostettuna pinnasta irti (ei läpi nenän tai parran)
            ec, ep, en = edellinen; keski_p = (ep + p) / 2; keski_n = (en + n).normalized()
            avaimet.append(((avaimet[-1][0] + alku) // 2, keski_p + keski_n * 0.16, keski_p))
        avaimet += [(alku, c - siirtyma, p - siirtyma), (loppu, c + siirtyma, p + siirtyma)]
        edellinen = (c, p, n)
        print('SOKRATES v3b: pinta', nimi, tuple(round(v, 3) for v in p), 'kamera', tuple(round(v, 3) for v in c))
    kohde_loppu = Vector((0.0, -0.04, 0.27))
    avaimet += [(440, kohde_loppu + eteen * 0.62, kohde_loppu), (V3B_LOPPU, kohde_loppu + eteen * 0.66, kohde_loppu)]
    cd = bpy.data.cameras.new('k'); cd.lens = V3B_LINSSI; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.003
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    cd.dof.use_dof = True; cd.dof.focus_object = tahtain; cd.dof.aperture_fstop = 11
    for ruutu, c, q in avaimet:
        cam.location, tahtain.location = c, q
        cam.keyframe_insert('location', frame=ruutu); tahtain.keyframe_insert('location', frame=ruutu)
    sc.frame_start, sc.frame_end = 1, V3B_LOPPU; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or range(sc.frame_start, sc.frame_end + 1)):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v3b valmis', ULOS)


# ---------- mallikuva v4 (omistaja 1.10. 22.1x): yksi ajatus yhdessä paikassa ----------
# Koko lause kulkee yhtenä nauhana saman pinta-alueen yli (otsa: Puolustuspuhe 38a), sitten kamera liukuu poskelle,
# jossa kulkee toinen ajatus (21d). Vain kirjaimet (ei kehystä, haloa, keilaa eikä pölyä). Kamera kiertää hyvin
# hitaasti (orbit pinnan normaalin ympäri) tekstin kulkiessa. Lähderivi lisätään jälkikäsittelyssä lauseen jälkeen.
#   Blender -b -P sokrates_bysti.py -- --v4 <gobot> <ulos> --koko L K [--naytteita 16] [--ruudut ...]
V4_PAIKAT = (  # nimi, säde (x, z), nauhan korkeus (m), projektorin vinous, kuva-alan leveys (m), kameran kulma, ruudut (alku, loppu)
    ('otsa', (-0.005, 0.418), 0.016, (-0.40, -0.15, -0.30), 0.075, 55, (95, 350)),
    ('poski', (-0.055, 0.352), 0.013, (-0.55, -0.15, -0.30), 0.065, 38, (445, 655)),
)
V4_LOPPU = 705          # lähderivit jälkikäsittelyssä: 38a ruudut 352–395, 21d 657–705
V4_KIERTO = 14          # orbit ± astetta pinnan normaalin ympäri paikan aikana


def v4_projektori(nimi, p, suunta, etaisyys, ala, nauha_kuva, nauha_kork, ruudut, voima, ca=0.014, syvyys=0.022):
    """v4: vain kirjaimet + projektorin epätäydellisyys (omistaja 22.1x): kromaattinen aberraatio (punainen ja sininen
    erkanevat säteittäin, ero kasvaa reunoja kohti: uv skaalataan kanavittain 1 ± ca) ja tarkennuksen pehmeys
    (sekoitus terävän ja sumean goboparin välillä etäisyyden |säde − tarkennus| / syvyys mukaan)."""
    nk = bpy.data.images.load(nauha_kuva); sk = bpy.data.images.load(nauha_kuva[:-4] + '-sumea.png')
    for k in (nk, sk): k.colorspace_settings.name = 'Non-Color'
    nauha_lev = nauha_kork * nk.size[0] / nk.size[1]
    d = bpy.data.lights.new(nimi, 'SPOT'); d.spot_blend = 0.45; d.shadow_soft_size = 0.0
    d.spot_size = 2.4 * math.atan(ala / 2 / etaisyys); d.color = (1.0, 0.93, 0.80); d.use_nodes = True
    nt = d.node_tree; nt.nodes.clear()
    def m(op, a, b=None, c=None):
        n_ = nt.nodes.new('ShaderNodeMath'); n_.operation = op
        for i_, v in enumerate((a, b, c)):
            if v is None: continue
            if isinstance(v, (int, float)): n_.inputs[i_].default_value = v
            else: nt.links.new(v, n_.inputs[i_])
        return n_.outputs['Value']
    tc = nt.nodes.new('ShaderNodeTexCoord'); sx = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tc.outputs['Normal'], sx.inputs['Vector'])
    z = m('MULTIPLY', sx.outputs['Z'], -1.0); jx = m('DIVIDE', sx.outputs['X'], z); jy = m('DIVIDE', sx.outputs['Y'], z)
    siirto = nt.nodes.new('ShaderNodeValue'); siirto.name = 'siirto'
    lp = nt.nodes.new('ShaderNodeLightPath')
    sumeus = m('MINIMUM', m('DIVIDE', m('ABSOLUTE', m('SUBTRACT', lp.outputs['Ray Length'], etaisyys)), syvyys), 1.0)
    def kanava(skaala):
        u = m('ADD', m('MULTIPLY_ADD', jx, etaisyys * skaala / nauha_lev, 0.5), siirto.outputs['Value'])
        v = m('MULTIPLY_ADD', jy, etaisyys * skaala / nauha_kork, 0.5)
        yh = nt.nodes.new('ShaderNodeCombineXYZ'); nt.links.new(u, yh.inputs['X']); nt.links.new(v, yh.inputs['Y'])
        arvot = []
        for img in (nk, sk):
            t = nt.nodes.new('ShaderNodeTexImage'); t.image = img; t.extension = 'CLIP'
            nt.links.new(yh.outputs['Vector'], t.inputs['Vector']); arvot.append(t.outputs['Color'])
        sek = nt.nodes.new('ShaderNodeMix'); sek.data_type = 'FLOAT'
        nt.links.new(sumeus, sek.inputs['Factor']); nt.links.new(arvot[0], sek.inputs['A']); nt.links.new(arvot[1], sek.inputs['B'])
        return sek.outputs['Result']
    yhd = nt.nodes.new('ShaderNodeCombineColor')
    for kanava_nimi, sk_ in (('Red', 1 + ca), ('Green', 1.0), ('Blue', 1 - ca)):
        nt.links.new(kanava(sk_), yhd.inputs[kanava_nimi])
    em = nt.nodes.new('ShaderNodeEmission'); nt.links.new(yhd.outputs['Color'], em.inputs['Color']); em.inputs['Strength'].default_value = 1.0
    out = nt.nodes.new('ShaderNodeOutputLight'); nt.links.new(em.outputs['Emission'], out.inputs['Surface'])
    o = bpy.data.objects.new(nimi, d); bpy.context.scene.collection.objects.link(o)
    o.location = Vector(p) + suunta.normalized() * etaisyys; kohdista(o, p)
    alku, loppu = ruudut; s0 = 0.5 + ala / 2 / nauha_lev; sv = siirto.outputs['Value']
    for r, v in ((alku, -s0), (loppu, s0)):
        sv.default_value = v; sv.keyframe_insert('default_value', frame=r)
    for r, v in ((1, 0), (alku, 0), (alku + 6, voima), (loppu - 6, voima), (loppu, 0)):
        d.energy = v; d.keyframe_insert('energy', frame=r)
    for fc in (d.node_tree.animation_data.action.fcurves if d.node_tree.animation_data and hasattr(d.node_tree.animation_data.action, 'fcurves') else []):
        for kp in fc.keyframe_points: kp.interpolation = 'LINEAR'
    return o


if '--v4' in A:
    i = A.index('--v4'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 16
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; _kipsin_rakenne(o)
    osumat = {nimi: osuma(x, z) for nimi, (x, z), *_ in V4_PAIKAT}
    eteen = Vector((-0.12, -1.0, 0.07)).normalized()
    kohde_koko = Vector((0.0, -0.03, 0.22))
    avaimet = [(1, kohde_koko + eteen * 0.80, kohde_koko), (50, kohde_koko + eteen * 0.72, kohde_koko)]
    edellinen = None
    from mathutils import Matrix
    for nimi, (x, z), nauha_kork, vino, ala, kulma, (alku, loppu) in V4_PAIKAT:
        p, n = osumat[nimi]
        v4_projektori(f'tykki-{nimi}', p, (n + Vector(vino)).normalized(), 0.6, ala,
                      os.path.join(GOBOT, f'nauha-{nimi}.png'), nauha_kork, (alku + 5, loppu - 5), 70.0)
        c, t, u = lentoasento(p, n, kulma=kulma, matka=0.11)
        if edellinen is not None:      # siirtymä nostettuna pinnasta irti
            ep, en = edellinen; kp = (ep + p) / 2; kn = (en + n).normalized()
            avaimet.append(((avaimet[-1][0] + alku) // 2, kp + kn * 0.16, kp))
        # hidas orbit: kameran paikka kiertää p:n ympäri normaalin akselilla −KIERTO → +KIERTO (6 avainta)
        for k in range(6):
            r = alku + (loppu + 45 - alku) * k // 5
            kierto = Matrix.Rotation(math.radians(-V4_KIERTO + 2 * V4_KIERTO * k / 5), 3, n)
            avaimet.append((r, p + kierto @ (c - p), p))
        edellinen = (p, n)
        print('SOKRATES v4: paikka', nimi, tuple(round(v, 3) for v in p))
    avaimet.sort(key=lambda a: a[0])
    cd = bpy.data.cameras.new('k'); cd.lens = V3B_LINSSI; cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.003
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    cd.dof.use_dof = True; cd.dof.focus_object = tahtain; cd.dof.aperture_fstop = 11
    for ruutu, c, q in avaimet:
        cam.location, tahtain.location = c, q
        cam.keyframe_insert('location', frame=ruutu); tahtain.keyframe_insert('location', frame=ruutu)
    sc.frame_start, sc.frame_end = 1, V4_LOPPU; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or range(sc.frame_start, sc.frame_end + 1)):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v4 valmis', ULOS)


# ---------- mallikuva v5 (omistajan kohtaussuunnitelma 1.10. 22.3x): intro, nimi, kysymys, projisointi ----------
# INTRO: kova valo kiertää takaa kuin aurinko ja kääntyy vähitellen kohtisuoremmaksi; kamera leikkaa suoraan
# yllättäviin kuvakulmiin (~1,2 s/otos), kasvot näkyvät aina jostain kulmasta. Viimeinen otos: Rembrandt-valo
# (avainvalo 45° sivulta ja ylhäältä, valokolmio varjopuolen poskella), nimi ja vuodet → kysymys (jälkikäsittely),
# sitten kamera liukuu otsalle ja 38a kulkee kuten v4.
#   Blender -b -P sokrates_bysti.py -- --v5 <gobot> <ulos> --koko L K [--naytteita 16] [--ruudut ...]
PAA = Vector((0.0, -0.06, 0.38))
V5_OTOKSET = (  # (ruutu, kameran paikka, katsepiste, polttoväli mm) — kasvot näkyvät jokaisessa otoksessa
    (1, (0.62, -0.10, 0.38), (0.0, -0.10, 0.38), 50),      # puhdas profiili oikealta: vastavalo piirtää nenän ja kulmat
    (37, (0.26, -0.30, 0.72), (0.0, -0.09, 0.40), 35),     # ylhäältä oikealta otsan yli kohti kasvoja
    (73, (-0.05, -0.36, 0.13), (0.0, -0.10, 0.36), 28),    # alhaalta parran alta kohti nenää
    (109, (0.30, -0.34, 0.42), (0.03, -0.10, 0.38), 50),   # silmä ja kulmakaari valon puolelta
    (145, (0.30, -0.36, 0.22), (0.02, -0.11, 0.30), 50),   # parta ja suu oikealta alaviistosta
    (181, (0.48, -0.30, 0.60), (0.0, -0.08, 0.38), 50),    # kolme neljäsosaa ylhäältä oikealta
    (217, (-0.30, -1.02, 0.40), (-0.06, -0.06, 0.36), 35), # Rembrandt: kasvot kokonaan oikealla, nimi vasemmalle
)
V5_VALO = (  # (ruutu, valon suunta päästä) — takaa oikealta → oikealle → edestä oikealta ylhäältä (Rembrandt)
    (1, (0.55, 0.85, 0.30)), (60, (0.9, 0.55, 0.35)), (120, (1.0, -0.05, 0.6)), (180, (0.8, -0.55, 0.8)),
    (217, (0.70, -0.70, 0.85)),   # Rembrandt: 45° sivulta ja ylhäältä, valokolmio varjopuolen poskella
)
V5_NIMI, V5_KYSYMYS, V5_LAHESTY = (217, 306), (307, 396), (397, 445)
V5_PROJ = (445, 700)          # 38a otsalla; lähderivi 702–747 (jälkikäsittely)
V5_LOPPU = 747


if '--v5' in A:
    from mathutils import Matrix
    i = A.index('--v5'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 16
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; _kipsin_rakenne(o)
    for nimi in ('sivu', 'reuna', 'tayte'):
        bpy.data.objects[nimi].hide_render = True          # vain yksi kova "aurinko" + hyvin heikko täyte
    taytto = bpy.data.lights.new('taytto', 'AREA'); taytto.energy = 0.25; taytto.size = 1.5
    to = bpy.data.objects.new('taytto', taytto); sc.collection.objects.link(to); to.location = (-1.2, -1.0, 0.4); kohdista(to, PAA)
    aur = bpy.data.lights.new('aurinko', 'SPOT'); aur.spot_size = math.radians(60); aur.spot_blend = 0.3
    aur.shadow_soft_size = 0.012; aur.color = (1.0, 0.95, 0.88); aur.energy = 95
    ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
    for r, s_ in V5_VALO:
        ao.location = PAA + Vector(s_).normalized() * 1.3; kohdista(ao, PAA)
        ao.keyframe_insert('location', frame=r); ao.keyframe_insert('rotation_euler', frame=r)
    # projisoinnin aikana avainvalo himmenee, jotta kirjaimet erottuvat
    for r, v in ((V5_LAHESTY[0], 95), (V5_PROJ[0], 38)):
        aur.energy = v; aur.keyframe_insert('energy', frame=r)
    p, n = osuma(-0.005, 0.418)
    v4_projektori('tykki-otsa', p, (n + Vector((-0.40, -0.15, -0.30))).normalized(), 0.6, 0.075,
                  os.path.join(GOBOT, 'nauha-otsa.png'), 0.016, (V5_PROJ[0] + 5, V5_PROJ[1] - 5), 70.0)
    c, t, u = lentoasento(p, n, kulma=55, matka=0.11)
    cd = bpy.data.cameras.new('k'); cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.003
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    cd.dof.use_dof = True; cd.dof.focus_object = tahtain; cd.dof.aperture_fstop = 16
    def avain(r, c_, q_, mm, tapa):
        cam.location, tahtain.location, cd.lens = Vector(c_), Vector(q_), mm
        for ob, ominaisuus in ((cam, 'location'), (tahtain, 'location'), (cd, 'lens')):
            ob.keyframe_insert(ominaisuus, frame=r)
        avaimet_tapa.append((r, tapa))
    avaimet_tapa = []
    for r, c_, q_, mm in V5_OTOKSET:
        avain(r, c_, q_, mm, 'CONSTANT')                     # leikkaus, ei panorointia
    rem = V5_OTOKSET[-1]
    avain(V5_LAHESTY[0], rem[1], rem[2], rem[3], 'BEZIER')   # Rembrandt pysyy nimen ja kysymyksen ajan
    for k in range(6):                                       # lähestyminen ja hidas orbit kuten v4
        r = V5_PROJ[0] + (V5_PROJ[1] + 45 - V5_PROJ[0]) * k // 5
        kierto = Matrix.Rotation(math.radians(-V4_KIERTO + 2 * V4_KIERTO * k / 5), 3, n)
        avain(r, p + kierto @ (c - p), p, V3B_LINSSI, 'BEZIER')
    # interpolaatio: leikkaukset CONSTANT, muuten pehmeä
    tavat = dict(avaimet_tapa)
    for idb in (cam, tahtain, cd):
        ad = idb.animation_data
        act = ad.action if ad else None
        kayrat = getattr(act, 'fcurves', None) or []
        if not kayrat and act is not None:                  # Blender 5: kerrostettu toiminto
            for kerros in getattr(act, 'layers', []):
                for kaista in kerros.strips:
                    for kp_ in kaista.channelbags: kayrat = list(kayrat) + list(kp_.fcurves)
        for fc in kayrat:
            for kp in fc.keyframe_points: kp.interpolation = tavat.get(int(round(kp.co.x)), 'BEZIER')
    sc.frame_start, sc.frame_end = 1, V5_LOPPU; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or range(sc.frame_start, sc.frame_end + 1)):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v5 valmis', ULOS)


# ---------- mallikuva v6 (omistaja 1.10. 23.0x): pehmeät ajot, hitaampi teksti, eläväisempi kamera ----------
# Kuten v5 (intro-leikkaukset → Rembrandt + nimi → kysymys → 38a otsalla → lähderivi), mutta:
# - kaikki ajot Bezier-käyrillä, AUTO_CLAMPED-kahvat → nopeus kasvaa ja hidastuu luontevasti (leikkaukset CONSTANT)
# - tekstinauha 25 % hitaammin (v5: 255 ruutua → 340)
# - tekstin aikana kierto ±22° ja sivuliuku ±8 mm (kolme avainta, jatkuva nopeus)
# - 38a:n ja lähderivin jälkeen 12 s paikallaan ilman projisointia (lukijan elämänkertomus)
V6_LAHESTY = (396, 490)
V6_PROJ = (490, 835)            # 38a 345 ruutua; lähderivi 837–885 (jälkikäsittely)
V6_KAARI_LOPPU = 900            # kierto jatkuu tekstin yli ja hidastuu pysähdykseen lähderivin aikana
V6_PITO = 1250                  # 12 s pito lähderivin jälkeen; renderöidään yksi ruutu, kooste monistaa sen
V6_KIERTO, V6_LIUKU = 22, 0.008


if '--v6' in A:
    from mathutils import Matrix
    i = A.index('--v6'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 16
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; _kipsin_rakenne(o)
    for nimi in ('sivu', 'reuna', 'tayte'):
        bpy.data.objects[nimi].hide_render = True
    taytto = bpy.data.lights.new('taytto', 'AREA'); taytto.energy = 0.25; taytto.size = 1.5
    to = bpy.data.objects.new('taytto', taytto); sc.collection.objects.link(to); to.location = (-1.2, -1.0, 0.4); kohdista(to, PAA)
    aur = bpy.data.lights.new('aurinko', 'SPOT'); aur.spot_size = math.radians(60); aur.spot_blend = 0.3
    aur.shadow_soft_size = 0.012; aur.color = (1.0, 0.95, 0.88); aur.energy = 95
    ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
    for r, s_ in V5_VALO:
        ao.location = PAA + Vector(s_).normalized() * 1.3; kohdista(ao, PAA)
        ao.keyframe_insert('location', frame=r); ao.keyframe_insert('rotation_euler', frame=r)
    for r, v in ((V6_LAHESTY[0], 95), (V6_PROJ[0], 38)):
        aur.energy = v; aur.keyframe_insert('energy', frame=r)
    p, n = osuma(-0.005, 0.418)
    v4_projektori('tykki-otsa', p, (n + Vector((-0.40, -0.15, -0.30))).normalized(), 0.6, 0.075,
                  os.path.join(GOBOT, 'nauha-otsa.png'), 0.016, (V6_PROJ[0] + 5, V6_PROJ[1] - 5), 70.0)
    c, t, u = lentoasento(p, n, kulma=55, matka=0.11)
    cd = bpy.data.cameras.new('k'); cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.003
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    cd.dof.use_dof = True; cd.dof.focus_object = tahtain; cd.dof.aperture_fstop = 16
    tavat = {}
    def avain(r, c_, q_, mm, tapa):
        cam.location, tahtain.location, cd.lens = Vector(c_), Vector(q_), mm
        for ob, ominaisuus in ((cam, 'location'), (tahtain, 'location'), (cd, 'lens')):
            ob.keyframe_insert(ominaisuus, frame=r)
        tavat[r] = tapa
    for r, c_, q_, mm in V5_OTOKSET:
        avain(r, c_, q_, mm, 'CONSTANT')                     # intron leikkaukset
    rem = V5_OTOKSET[-1]
    avain(V6_LAHESTY[0], rem[1], rem[2], rem[3], 'BEZIER')   # Rembrandt pysyy; lähestyminen alkaa pehmeästi
    for k, osuus in enumerate((0.0, 1.0)):                   # kierto + sivuliuku: alku ja loppu (yksi jatkuva kaari)
        r = V6_PROJ[0] + round((V6_KAARI_LOPPU - V6_PROJ[0]) * osuus)
        kierto = Matrix.Rotation(math.radians(-V6_KIERTO + 2 * V6_KIERTO * osuus), 3, n)
        liuku = t * (-V6_LIUKU + 2 * V6_LIUKU * osuus)
        avain(r, p + kierto @ (c - p) + liuku, p + liuku * 0.5, V3B_LINSSI, 'BEZIER')
    loppu_c, loppu_q = cam.location.copy(), tahtain.location.copy()
    avain(V6_PITO, loppu_c, loppu_q, V3B_LINSSI, 'BEZIER')    # pito: sama asento → pysähtyy pehmeästi
    for idb in (cam, tahtain, cd):
        act = idb.animation_data.action; kayrat = []
        for kerros in getattr(act, 'layers', []):
            for kaista in kerros.strips:
                for cb in kaista.channelbags: kayrat += list(cb.fcurves)
        kayrat += list(getattr(act, 'fcurves', []) or [])
        for fc in kayrat:
            for kp in fc.keyframe_points:
                kp.interpolation = tavat.get(int(round(kp.co.x)), 'BEZIER')
                kp.handle_left_type = kp.handle_right_type = 'AUTO_CLAMPED'
            fc.update()
    sc.frame_start, sc.frame_end = 1, V6_PITO; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or list(range(sc.frame_start, V6_KAARI_LOPPU + 1)) + [V6_PITO]):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v6 valmis', ULOS)


# ---------- mallikuva v7 (omistajan päätökset 1.10. 23.1x): musiikkiin leikattu intro, terävä pinta, luenta ----------
# - Intron leikkaukset osuvat Zarathustran (Sascha Ende, CC BY 4.0) trumpetteihin, sointuun ja patarumpuihin;
#   musiikki 13,0–22,4 s → hyppy loppusointuun 60,5 s: suuri sointu tulee Rembrandt-otokseen nimen kanssa.
#   Valoa kohti kasvoja tullut otos on poistettu (omistaja: "ei toiminut").
# - Terävä pinta: syväterävyys pois; kipsin hieno pintakuvio (Poly Haven grey_plaster_02, Rob Tuytel, CC0, korkeus
#   kuhmuna laatikkoprojektiolla ~3,5 cm:n toistolla; reaaliajassa sama kartta triplanar-detaljinormaalina).
# - Kierros 1: 38a nauhana + a-luenta, sitten pito + b-luenta. Ääni kootaan erikseen (sokrates_aani.sh).
V7_OTOKSET = (  # (ruutu, kameran paikka, katsepiste, polttoväli mm); ruutu = musiikin isku (30 r/s, alku 13,0 s)
    (1, (0.62, -0.10, 0.38), (0.0, -0.10, 0.38), 50),      # rumpujen pohjasävel: profiili vastavalossa
    (15, (0.26, -0.30, 0.72), (0.0, -0.09, 0.40), 35),     # trumpetti 1 (13,48 s): ylhäältä otsan yli
    (57, (-0.05, -0.36, 0.13), (0.0, -0.10, 0.36), 28),    # trumpetti 2 (14,88 s): parran alta kohti nenää
    (119, (0.30, -0.27, 0.47), (0.0, -0.11, 0.43), 50),    # sointu (16,92 s): otsan rypyt valon puolelta
    (236, (0.30, -0.34, 0.42), (0.03, -0.10, 0.38), 50),   # patarumpu (20,84 s): silmä ja kulmakaari
    (259, (0.30, -0.36, 0.22), (0.02, -0.11, 0.30), 50),   # patarumpu (21,60 s): parta ja suu
    (282, (-0.30, -1.02, 0.40), (-0.06, -0.06, 0.36), 35), # loppusointu (60,6 s): Rembrandt + nimi
)
V7_VALO = ((1, (0.55, 0.85, 0.30)), (119, (0.9, 0.55, 0.35)), (236, (1.0, -0.05, 0.6)), (259, (0.85, -0.45, 0.75)),
           (282, (0.70, -0.70, 0.85)))
V7_LAHESTY = (462, 555)       # nimi 282–372, kysymys 373–461
V7_PROJ = (555, 900)          # 38a; a-luenta alkaa 600; lähderivi 902–950
V7_KAARI_LOPPU = 965
V7_PITO = 1450                # b-luenta alkaa 960 (15,5 s)
V7_RENDER = list(range(1, 283)) + list(range(V7_LAHESTY[0], V7_KAARI_LOPPU + 1)) + [V7_PITO]


def _kipsin_pinta(o):
    """Kipsin hieno pintakuvio: grey_plaster_02-korkeus laatikkoprojektiolla kuhmuna (ei vaadi UV:ta)."""
    m = o.data.materials[0]; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (28.5,) * 3
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    t = nt.nodes.new('ShaderNodeTexImage'); t.projection = 'BOX'; t.projection_blend = 0.25
    t.image = bpy.data.images.load(os.path.join(PH, 'grey_plaster_02', 'grey_plaster_02_disp_2k.png'))
    t.image.colorspace_settings.name = 'Non-Color'; nt.links.new(mp.outputs['Vector'], t.inputs['Vector'])
    bu = nt.nodes.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = 0.35; bu.inputs['Distance'].default_value = 0.0006
    nt.links.new(t.outputs['Color'], bu.inputs['Height']); nt.links.new(bu.outputs['Normal'], b.inputs['Normal'])


if '--v7' in A:
    from mathutils import Matrix
    i = A.index('--v7'); GOBOT, ULOS = A[i + 1], A[i + 2]; os.makedirs(ULOS, exist_ok=True)
    i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 16
    RUUDUT = [int(v) for v in A[A.index('--ruudut') + 1].split(',')] if '--ruudut' in A else None
    o = rakenna(N); sc = bpy.context.scene; _kipsin_pinta(o)
    for nimi in ('sivu', 'reuna', 'tayte'):
        bpy.data.objects[nimi].hide_render = True
    taytto = bpy.data.lights.new('taytto', 'AREA'); taytto.energy = 0.25; taytto.size = 1.5
    to = bpy.data.objects.new('taytto', taytto); sc.collection.objects.link(to); to.location = (-1.2, -1.0, 0.4); kohdista(to, PAA)
    aur = bpy.data.lights.new('aurinko', 'SPOT'); aur.spot_size = math.radians(60); aur.spot_blend = 0.3
    aur.shadow_soft_size = 0.012; aur.color = (1.0, 0.95, 0.88); aur.energy = 95
    ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
    for r, s_ in V7_VALO:
        ao.location = PAA + Vector(s_).normalized() * 1.3; kohdista(ao, PAA)
        ao.keyframe_insert('location', frame=r); ao.keyframe_insert('rotation_euler', frame=r)
    for r, v in ((V7_LAHESTY[0], 95), (V7_PROJ[0], 38)):
        aur.energy = v; aur.keyframe_insert('energy', frame=r)
    p, n = osuma(-0.005, 0.418)
    v4_projektori('tykki-otsa', p, (n + Vector((-0.40, -0.15, -0.30))).normalized(), 0.6, 0.075,
                  os.path.join(GOBOT, 'nauha-otsa.png'), 0.016, (V7_PROJ[0] + 5, V7_PROJ[1] - 5), 70.0)
    c, t, u = lentoasento(p, n, kulma=55, matka=0.11)
    cd = bpy.data.cameras.new('k'); cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24; cd.clip_start = 0.003
    cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
    tahtain = bpy.data.objects.new('tahtain', None); sc.collection.objects.link(tahtain)
    tc = cam.constraints.new('TRACK_TO'); tc.target = tahtain; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    cd.dof.use_dof = False                                   # omistaja 23.1x: pinta terävänä tekstin ympärillä
    tavat = {}
    def avain(r, c_, q_, mm, tapa):
        cam.location, tahtain.location, cd.lens = Vector(c_), Vector(q_), mm
        for ob, ominaisuus in ((cam, 'location'), (tahtain, 'location'), (cd, 'lens')):
            ob.keyframe_insert(ominaisuus, frame=r)
        tavat[r] = tapa
    for r, c_, q_, mm in V7_OTOKSET:
        avain(r, c_, q_, mm, 'CONSTANT')
    rem = V7_OTOKSET[-1]
    avain(V7_LAHESTY[0], rem[1], rem[2], rem[3], 'BEZIER')
    for osuus in (0.0, 1.0):
        r = V7_LAHESTY[1] + round((V7_KAARI_LOPPU - V7_LAHESTY[1]) * osuus)
        kierto = Matrix.Rotation(math.radians(-V6_KIERTO + 2 * V6_KIERTO * osuus), 3, n)
        liuku = t * (-V6_LIUKU + 2 * V6_LIUKU * osuus)
        avain(r, p + kierto @ (c - p) + liuku, p + liuku * 0.5, V3B_LINSSI, 'BEZIER')
    avain(V7_PITO, cam.location.copy(), tahtain.location.copy(), V3B_LINSSI, 'BEZIER')
    for idb in (cam, tahtain, cd):
        act = idb.animation_data.action; kayrat = []
        for kerros in getattr(act, 'layers', []):
            for kaista in kerros.strips:
                for cb in kaista.channelbags: kayrat += list(cb.fcurves)
        for fc in kayrat:
            for kp in fc.keyframe_points:
                kp.interpolation = tavat.get(int(round(kp.co.x)), 'BEZIER')
                kp.handle_left_type = kp.handle_right_type = 'AUTO_CLAMPED'
            fc.update()
    sc.frame_start, sc.frame_end = 1, V7_PITO; sc.render.fps = 30
    sc.render.resolution_x, sc.render.resolution_y = LEV, KORK; sc.render.resolution_percentage = 100
    for ruutu in (RUUDUT or V7_RENDER):
        sc.frame_set(ruutu); sc.render.filepath = os.path.join(ULOS, f'ruutu-{ruutu:04d}.png')
        bpy.ops.render.render(write_still=True)
    print('SOKRATES: v7 valmis', ULOS)
