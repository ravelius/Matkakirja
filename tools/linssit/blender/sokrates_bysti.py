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
