# AJATTELIJOIDEN VARASTO — havainnekuva (Linnanrakentaja 3.10.2026; omistajan idea 08.3x Päätoimittajan kautta).
# "kun linssin alussa halliin sytytetään valot … taustalla näkyisi kymmeniä muita patsaita ja ehkä tauluja ja muita
# kulttuuriesineitä … kuin suuri kulttuuriperimän varasto tai Noan arkki … heikosti sinertävässä valossa … varaston
# raoista siivilöityisi ohuita valonsuikaleita pölyisen ilman läpi"; kipsipatsas matalan kreikkalaisen pylvään päällä,
# pylväs jää hyvin tummaksi. VAIN HAVAINNEKUVA (ei peliin, ei lukuja).
# Aineisto: SMK:n kipsivalokset KAS635 (Sokrates), KAS979 (Marcus Aurelius), KAS2111 (Platon), PDM; taulut PD/CC0
# (David, Delacroix, Carstens, Kodros-maljakko, Artemision-pronssi, Marcuksen kaikujen lähteet); Poly Haven CC0 -tekstuurit.
#   Blender -b -P ajattelijat_varasto.py -- <ulos.png> --koko 1080 2340 [--naytteita 256] [--siemen 7]
import math, os, random, sys
import bpy
from mathutils import Vector

A = sys.argv[sys.argv.index('--') + 1:]
ULOS = A[0]; i = A.index('--koko'); LEV, KORK = int(A[i + 1]), int(A[i + 2])
N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 256
rnd = random.Random(int(A[A.index('--siemen') + 1]) if '--siemen' in A else 7)
SMK = '/Users/Shared/Claude/proto-3d/_lahteet/smk'
PH = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven'
KUVAT = ['/Users/Shared/Claude/proto-3d/_lahteet/sokrates/kuvat/kuolema-david.jpg',
         '/Users/Shared/Claude/proto-3d/_lahteet/sokrates/kuvat/sotilas-carstens.jpg',
         '/Users/Shared/Claude/proto-3d/_lahteet/sokrates/kuvat/oraakkeli-kodros.jpg',
         '/Users/Shared/Claude/proto-3d/_lahteet/sokrates/kuvat/jumala-artemision.jpg',
         '/Users/Shared/Claude/proto-3d/_lahteet/marcus-aurelius/kuvat/kuolema-delacroix.jpg',
         '/Users/Shared/Claude/proto-3d/_lahteet/marcus-aurelius/kuvat/uhri-angeli.jpg',
         '/Users/Shared/Claude/proto-3d/_lahteet/marcus-aurelius/kuvat/sade-pylvas.jpg']

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
try:
    sc.cycles.device = 'GPU'; bpy.context.preferences.addons['cycles'].preferences.compute_device_type = 'METAL'
    bpy.context.preferences.addons['cycles'].preferences.get_devices()
    for d in bpy.context.preferences.addons['cycles'].preferences.devices: d.use = True
except Exception: pass
sc.cycles.samples = N; sc.cycles.use_denoising = True; sc.cycles.max_bounces = 6; sc.cycles.volume_bounces = 1
sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
sc.render.resolution_x, sc.render.resolution_y, sc.render.resolution_percentage = LEV, KORK, 100


def mat(nimi, vari, karheus=0.7, kuva=None, normaali=None, toisto=1.0, sss=0.0):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']; nt = m.node_tree
    b.inputs['Base Color'].default_value = (*vari, 1); b.inputs['Roughness'].default_value = karheus
    if sss: b.inputs['Subsurface Weight'].default_value = sss; b.inputs['Subsurface Radius'].default_value = (0.006, 0.004, 0.003)
    if kuva:
        tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (toisto,) * 3
        nt.links.new(tc.outputs['Object' if toisto != 1.0 else 'UV'], mp.inputs['Vector'])
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = bpy.data.images.load(kuva, check_existing=True)
        if toisto != 1.0: t.projection = 'BOX'; t.projection_blend = 0.3
        nt.links.new(mp.outputs['Vector'], t.inputs['Vector'])
        sek = nt.nodes.new('ShaderNodeMix'); sek.data_type = 'RGBA'; sek.blend_type = 'MULTIPLY'; sek.inputs['Factor'].default_value = 1.0
        sek.inputs['A'].default_value = (*vari, 1); nt.links.new(t.outputs['Color'], sek.inputs['B']); nt.links.new(sek.outputs['Result'], b.inputs['Base Color'])
        if normaali:
            tn = nt.nodes.new('ShaderNodeTexImage'); tn.image = bpy.data.images.load(normaali, check_existing=True)
            tn.image.colorspace_settings.name = 'Non-Color'; tn.projection = t.projection; tn.projection_blend = 0.3
            nt.links.new(mp.outputs['Vector'], tn.inputs['Vector'])
            nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = 0.8
            nt.links.new(tn.outputs['Color'], nm.inputs['Color']); nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])
    return m


def laatikko(nimi, keski, koko, m, kierto=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=keski); o = bpy.context.object; o.name = nimi
    o.scale = koko; o.rotation_euler[2] = kierto; o.data.materials.append(m); return o


KIPSI = mat('kipsi', (0.86, 0.85, 0.82), 0.62, sss=0.12)
KIPSI_T = mat('kipsi-varasto', (0.80, 0.79, 0.76), 0.65, sss=0.08)
PUU = mat('puu', (0.55, 0.50, 0.44), 0.8, f'{PH}/rough_wood/rough_wood_diff_2k.jpg', f'{PH}/rough_wood/rough_wood_nor_2k.jpg', 1.2)
LATTIA = mat('lattia', (0.5, 0.5, 0.5), 0.75, f'{PH}/slate_floor_02/slate_floor_02_diff_2k.jpg', f'{PH}/slate_floor_02/slate_floor_02_nor_2k.jpg', 0.45)
KANGAS = mat('kangas', (0.62, 0.58, 0.50), 0.95, f'{PH}/hessian_230/hessian_230_diff_2k.jpg', f'{PH}/hessian_230/hessian_230_nor_2k.jpg', 1.5)
KIVI = mat('pylvas', (0.22, 0.21, 0.20), 0.8)   # pylväs jää hyvin tummaksi (omistaja)
KEHYS = mat('kehys', (0.30, 0.22, 0.12), 0.4)


def bysti(stl, korkeus, paikka, kierto, m, nimi):
    bpy.ops.wm.stl_import(filepath=stl); o = bpy.context.selected_objects[0]; o.name = nimi
    bb = [Vector(c) for c in o.bound_box]; mn = Vector([min(v[k] for v in bb) for k in range(3)]); mx = Vector([max(v[k] for v in bb) for k in range(3)])
    s = korkeus / (mx.z - mn.z); o.scale = (s, s, s)
    o.location = (-(mn.x + mx.x) / 2 * s, -(mn.y + mx.y) / 2 * s, -mn.z * s)
    bpy.ops.object.transform_apply(location=True, scale=True); bpy.ops.object.shade_smooth()
    o.location = paikka; o.rotation_euler[2] = kierto; o.data.materials.append(m); return o


# --- Sokrates matalan doorilaisen pylvään päällä ---
PYLVAS_K = 1.0
def pylvas(paikka, korkeus, sade, m, nimi):
    """Uurrettu doorilainen tynkä: 20 uurretta (profiili tähtimäinen), echinus ja abakus."""
    import bmesh
    me = bpy.data.meshes.new(nimi); bm = bmesh.new(); n = 80; renkaat = []
    for z in (0.0, korkeus):
        r_ = []
        for k in range(n):
            th = 2 * math.pi * k / n; rr = sade * (1 - 0.045 * abs(math.sin(10 * th)) ** 0.6) * (1 - 0.06 * z / korkeus)
            r_.append(bm.verts.new((rr * math.cos(th), rr * math.sin(th), z)))
        renkaat.append(r_)
    for k in range(n):
        bm.faces.new((renkaat[0][k], renkaat[0][(k + 1) % n], renkaat[1][(k + 1) % n], renkaat[1][k]))
    bm.faces.new(list(reversed(renkaat[0]))); bm.faces.new(renkaat[1]); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(nimi, me); sc.collection.objects.link(o); o.location = paikka; o.data.materials.append(m)
    bpy.ops.mesh.primitive_cone_add(vertices=64, radius1=sade * 0.95, radius2=sade * 1.25, depth=0.08,
                                    location=(paikka[0], paikka[1], paikka[2] + korkeus + 0.04)); bpy.context.object.data.materials.append(m)
    laatikko(nimi + '-abakus', (paikka[0], paikka[1], paikka[2] + korkeus + 0.115), (sade * 2.3, sade * 2.3, 0.06), m)
    return korkeus + 0.15


yla = pylvas((0, 0, 0), PYLVAS_K - 0.15, 0.20, KIVI, 'pylvas')
sok = bysti(f'{SMK}/KAS635/smk-inv-635.stl', 0.51, (0, 0, yla), 0.0, KIPSI, 'sokrates')
PAA = Vector((0, -0.06, yla + 0.38))

# --- varasto: suljettu lautahalli (raot seinissä ja katossa), lattia ---
X0, X1, Y0, Y1, Z1 = -8.0, 8.0, -6.0, 62.0, 7.5   # omistaja 09.0x: halli jatkuu pimeyteen asti
laatikko('lattia', ((X0 + X1) / 2, (Y0 + Y1) / 2, -0.05), (X1 - X0, Y1 - Y0, 0.1), LATTIA)
def lautaseina(alku, loppu, z0, z1, akseli, paikka, rako=0.012, leveys=0.22):
    """Pystylaudat raoilla: akseli 'x' = seinä x-suunnassa (paikka = y), 'y' = seinä y-suunnassa (paikka = x)."""
    t = alku
    while t < loppu:
        lev = leveys * rnd.uniform(0.8, 1.2); r_ = rako * (4 if rnd.random() < 0.05 else 0.6) if rnd.random() < 0.22 else 0.0
        if akseli == 'x': laatikko('lauta', (t + lev / 2, paikka, (z0 + z1) / 2), (lev - r_, 0.03, z1 - z0), PUU)
        else: laatikko('lauta', (paikka, t + lev / 2, (z0 + z1) / 2), (0.03, lev - r_, z1 - z0), PUU)
        t += lev
lautaseina(X0, X1, 0, Z1, 'x', Y1); lautaseina(X0, X1, 0, Z1, 'x', Y0)
lautaseina(Y0, Y1, 0, Z1, 'y', X0); lautaseina(Y0, Y1, 0, Z1, 'y', X1, rako=0.0)   # oikea seinä umpinainen (ei kovia viivoja)
y_ = Y0                                                     # katto: poikittaiset laudat, muutama leveä rako (kattoluukut)
while y_ < Y1:
    lev = 0.25; rako = (0.09 if rnd.random() < 0.12 else (0.006 if rnd.random() < 0.25 else 0.0)) if y_ < 18 else 0.0   # raot vain lähellä
    laatikko('katto', (0, y_ + lev / 2, Z1), (X1 - X0, lev - rako, 0.04), PUU); y_ += lev
for x_ in (-6, -2, 2, 6):                                    # kattopalkit
    laatikko('palkki', (x_, (Y0 + Y1) / 2, Z1 - 0.25), (0.25, Y1 - Y0, 0.4), PUU)

# --- kulttuuriperimän varasto: bystit jalustoilla, hyllyt, kankaiden alla olevat patsaat, taulut, laatikot ---
STL = [f'{SMK}/KAS635/smk-inv-635.stl', f'{SMK}/KAS979/smk-inv-979.stl', f'{SMK}/KAS2111/smk-inv-2111.stl']
pohjat = [bysti(s, 0.5, (0, 0, -50), 0, KIPSI_T, f'pohja{k}') for k, s in enumerate(STL)]
def kopio(pohja, paikka, kierto, skaala):
    o = pohja.copy(); o.data = pohja.data; sc.collection.objects.link(o); o.location = paikka; o.rotation_euler[2] = kierto
    o.scale = (skaala,) * 3; return o
varatut = [(0.0, 0.0, 1.6)]
def vapaa(x, y, r):
    if y > 3.0 and abs(x) < 2.1 + r: return False   # keskikäytävä pimeyteen ja kaukovaloon pidetään tyhjänä
    return all(math.hypot(x - a, y - b) > r + c for a, b, c in varatut)
for k in range(80):                                          # jalustat + bystit hajallaan, syvälle
    for _ in range(40):
        x, y = rnd.uniform(-7, 7), rnd.uniform(2.5, 55)
        if vapaa(x, y, 0.5): break
    varatut.append((x, y, 0.5)); kork = rnd.uniform(0.7, 1.4)
    laatikko('jalusta', (x, y, kork / 2), (0.45, 0.45, kork), KIPSI_T if rnd.random() < 0.5 else PUU, rnd.uniform(-0.3, 0.3))
    kopio(rnd.choice(pohjat), (x, y, kork), rnd.uniform(-math.pi, math.pi), rnd.uniform(0.85, 1.25))
for y in (9.0, 12.0, 16.0, 20.5, 25.5, 31.0, 37.0, 43.5, 50.0, 56.5):   # hyllyrivit toistuvat pimeyteen
    for x0 in (-7.2, -4.6, 2.2, 4.8):                        # keskikäytävä |x| < 2,2 jää auki pimeyteen asti
        HL = 2.4; varatut.append((x0 + HL / 2, y, 1.5))
        for zt in (0.05, 1.05, 2.05, 3.05):
            laatikko('hylly', (x0 + HL / 2, y, zt), (HL, 0.7, 0.05), PUU)
        for xt in (x0, x0 + HL):
            laatikko('pysty', (xt, y, 1.6), (0.07, 0.7, 3.2), PUU)
        for zt in (0.1, 1.1, 2.1):                           # hyllyillä bystejä, laatikoita, ruukkuja
            xt = x0 + 0.2
            while xt < x0 + HL - 0.2:
                v = rnd.random()
                if v < 0.45: kopio(rnd.choice(pohjat), (xt + 0.15, y, zt), rnd.uniform(-1, 1) + math.pi * (y > 10), rnd.uniform(0.6, 0.85)); xt += 0.45
                elif v < 0.8:
                    s_ = rnd.uniform(0.25, 0.5); laatikko('laatikko', (xt + s_ / 2, y, zt + s_ * 0.4), (s_, 0.5, s_ * 0.8), PUU, rnd.uniform(-0.1, 0.1)); xt += s_ + 0.05
                else:
                    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.14, location=(xt + 0.15, y, zt + 0.16)); o = bpy.context.object
                    o.scale = (1, 1, 1.35); bpy.ops.object.shade_smooth(); o.data.materials.append(KIVI); xt += 0.35
# suojakankaiden alla olevat patsaat (Päätoimittaja 3.10.: vaalea haalistunut pellava, selvät laskokset, alta erottuu
# pää, olkapäät ja kohotettu käsi; vähemmän ja syvemmällä): kangassimulaatio putoaa patsasmuodon päälle
LAKANA = mat('lakana', (0.86, 0.83, 0.76), 0.9, f'{PH}/hessian_230/hessian_230_diff_2k.jpg', None, 3.0)
for b_ in LAKANA.node_tree.nodes:
    if b_.type == 'MIX': b_.inputs['Factor'].default_value = 0.25   # pellavan kuvio vain häivähdyksenä
bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 4, 0)); maa = bpy.context.object; maa.modifiers.new('t', 'COLLISION'); maa.hide_render = True
for k in range(10):
    for _ in range(60):
        x, y = rnd.uniform(-6.5, 6.5), rnd.uniform(8.0, 45.0)
        if vapaa(x, y, 0.8): break
    varatut.append((x, y, 0.8)); kork = rnd.uniform(1.7, 2.2); puoli = rnd.choice((-1, 1))
    muodot = []
    bpy.ops.mesh.primitive_cone_add(vertices=24, radius1=0.40, radius2=0.26, depth=kork - 0.45, location=(x, y, (kork - 0.45) / 2)); muodot.append(bpy.context.object)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.15, location=(x, y - 0.02, kork - 0.25)); muodot.append(bpy.context.object)          # pää
    bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=0.75, location=(x + puoli * 0.32, y, kork - 0.05)); kasi = bpy.context.object
    kasi.rotation_euler = (0, puoli * math.radians(-28), 0); muodot.append(kasi)                                                      # kohotettu käsi
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.2, location=(x, y, kork - 0.5)); o_ = bpy.context.object; o_.scale = (1.6, 0.9, 0.6); muodot.append(o_)  # olkapäät
    for o_ in muodot: o_.modifiers.new('t', 'COLLISION'); o_.collision.thickness_outer = 0.015
    bpy.ops.mesh.primitive_grid_add(x_subdivisions=56, y_subdivisions=56, size=2.6, location=(x, y, kork + 0.45)); kan = bpy.context.object
    kan.rotation_euler[2] = rnd.uniform(0, math.pi)
    cl = kan.modifiers.new('kangas', 'CLOTH'); cs = cl.settings; cs.quality = 6; cs.mass = 0.25; cs.bending_stiffness = 0.6
    cs.tension_stiffness = 12; cs.compression_stiffness = 12; cl.collision_settings.distance_min = 0.008
    cl.collision_settings.use_self_collision = True; cl.collision_settings.self_distance_min = 0.006
    cl.point_cache.frame_start, cl.point_cache.frame_end = 1, 70
    for f_ in range(1, 71): sc.frame_set(f_)
    bpy.context.view_layer.objects.active = kan; bpy.ops.object.modifier_apply(modifier='kangas')
    kan.modifiers.new('paksuus', 'SOLIDIFY').thickness = 0.006; kan.modifiers.new('sile', 'SUBSURF').levels = 1
    kan.data.materials.append(LAKANA); bpy.ops.object.shade_smooth()
    for o_ in muodot: o_.hide_render = True
sc.frame_set(1)
for k in range(54):                                          # taulut kehyksissä: nojaamassa hyllyihin, seinään ja toisiinsa
    kuva = KUVAT[k % len(KUVAT)]; img = bpy.data.images.load(kuva, check_existing=True); sk = img.size[1] / max(img.size[0], 1)
    lev = rnd.uniform(0.6, 1.4); kork = lev * sk
    paikka_ = k % 3   # 0 = takaseinä, 1 = hyllyrivin eteen, 2 = vapaasti lattialle
    for _ in range(60):
        if paikka_ == 0: x, y = rnd.uniform(-7.0, 7.0), Y1 - 0.35
        elif paikka_ == 1: x, y = rnd.uniform(-6.3, 6.3), rnd.choice((9.0, 12.0, 16.0, 20.5, 25.5, 31.0, 37.0)) - 0.55
        else: x, y = rnd.uniform(-6.5, 6.5), rnd.uniform(3.5, 40)
        if (paikka_ == 0 or abs(x) > 2.2 + lev / 2) and (paikka_ != 2 or vapaa(x, y, lev * 0.5)): break
    varatut.append((x, y, lev * 0.5)); kierto = (0.0 if rnd.random() < 0.8 else math.pi) + rnd.uniform(-0.6, 0.6)   # useimmat kasvot kameraan päin
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0)); taulu = bpy.context.object
    taulu.scale = (lev, kork, 1); bpy.ops.object.transform_apply(scale=True)
    mt = mat(f'taulu{k}', (0.85, 0.82, 0.76), 0.55, kuva); taulu.data.materials.append(mt)
    kehys = []
    for (cx, cy, sx, sy) in ((0, kork / 2 + 0.04, lev + 0.16, 0.08), (0, -kork / 2 - 0.04, lev + 0.16, 0.08),
                             (lev / 2 + 0.04, 0, 0.08, kork), (-lev / 2 - 0.04, 0, 0.08, kork)):
        kehys.append(laatikko('kehys', (cx, cy, 0.02), (sx, sy, 0.05), KEHYS))
    for o in kehys: o.parent = taulu
    taulu.rotation_euler = (math.radians(rnd.uniform(72, 82)), 0, kierto)
    taulu.location = (x, y, kork / 2 * math.sin(math.radians(77)) + 0.04)
for k in range(70):                                          # laatikkopinot
    for _ in range(40):
        x, y = rnd.uniform(-7.4, 7.4), rnd.uniform(3, 58)
        if vapaa(x, y, 0.45): break
    varatut.append((x, y, 0.45)); z = 0.0
    for _ in range(rnd.randint(1, 3)):
        s_ = rnd.uniform(0.5, 0.9); laatikko('laatikko', (x, y, z + s_ * 0.35), (s_, s_ * 0.8, s_ * 0.7), PUU, rnd.uniform(-0.2, 0.2)); z += s_ * 0.7
for o in pohjat: bpy.data.objects.remove(o, do_unlink=True)

# --- valot ---
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.35, 0.55, 1.0, 1); w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.4
vol = bpy.data.materials.new('pöly'); vol.use_nodes = True; vn = vol.node_tree; vn.nodes.remove(vn.nodes['Principled BSDF'])
vs = vn.nodes.new('ShaderNodeVolumeScatter'); vs.inputs['Density'].default_value = 0.035; vs.inputs['Anisotropy'].default_value = 0.65
nz = vn.nodes.new('ShaderNodeTexNoise'); nz.inputs['Scale'].default_value = 0.6
ma = vn.nodes.new('ShaderNodeMath'); ma.operation = 'MULTIPLY_ADD'; ma.inputs[1].default_value = 0.03; ma.inputs[2].default_value = 0.018   # ohuempi: rivit häipyvät vähitellen pimeyteen
vn.links.new(nz.outputs['Fac'], ma.inputs[0]); vn.links.new(ma.outputs['Value'], vs.inputs['Density'])
vn.links.new(vs.outputs['Volume'], vn.nodes['Material Output'].inputs['Volume'])
ilma = laatikko('ilma', ((X0 + X1) / 2, (Y0 + Y1) / 2, Z1 / 2), (X1 - X0 - 0.1, Y1 - Y0 - 0.1, Z1 - 0.1), vol)
ilma.visible_shadow = False
aur = bpy.data.lights.new('aurinko', 'SUN'); aur.energy = 17.0; aur.color = (0.70, 0.82, 1.0); aur.angle = math.radians(3.0)   # säde leviää raosta
ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao); ao.rotation_euler = (math.radians(38), 0, math.radians(200))
kp = bpy.data.lights.new('keila', 'SPOT'); kp.energy = 700; kp.spot_size = math.radians(13); kp.spot_blend = 0.55
kp.color = (1.0, 0.80, 0.58); kp.shadow_soft_size = 0.05
ko = bpy.data.objects.new('keila', kp); sc.collection.objects.link(ko); ko.location = PAA + Vector((0.7, -1.1, 2.9))
ko.rotation_euler = (PAA + Vector((0, 0, -0.08)) - ko.location).to_track_quat('-Z', 'Y').to_euler()
tay = bpy.data.lights.new('sini', 'AREA'); tay.energy = 220; tay.size = 8; tay.color = (0.55, 0.68, 1.0)
to = bpy.data.objects.new('sini', tay); sc.collection.objects.link(to); to.location = (0, 8, Z1 - 0.6)
# kaukainen valonheitin pimeydessä kameraa kohti (syvyys): pieni kirkas lähde + keila pölyssä
kd = bpy.data.lights.new('kaukovalo', 'SPOT'); kd.energy = 1500; kd.spot_size = math.radians(28); kd.spot_blend = 0.6
kd.color = (1.0, 0.88, 0.70); kd.shadow_soft_size = 0.05
kv = bpy.data.objects.new('kaukovalo', kd); sc.collection.objects.link(kv); kv.location = (-1.3, 38.0, 2.8)   # keskikäytävän päässä, näkyy bystin vasemmalla
kv.rotation_euler = (Vector((0.0, -6.0, 1.5)) - kv.location).to_track_quat('-Z', 'Y').to_euler()
bpy.ops.mesh.primitive_circle_add(vertices=32, radius=0.09, fill_type='NGON', location=kv.location); lam = bpy.context.object
lam.rotation_euler = kv.rotation_euler; lm = bpy.data.materials.new('lamppu'); lm.use_nodes = True
em_ = lm.node_tree.nodes.new('ShaderNodeEmission'); em_.inputs['Color'].default_value = (1.0, 0.9, 0.75, 1); em_.inputs['Strength'].default_value = 60
lm.node_tree.links.new(em_.outputs[0], lm.node_tree.nodes['Material Output'].inputs['Surface']); lam.data.materials.append(lm)
# pölyhiukkaset keilassa ja suikaleissa (pienet tetraedrit, valaistuina vain valossa)
import bmesh
me = bpy.data.meshes.new('poly'); bm = bmesh.new()
for _ in range(2600):
    c = Vector((rnd.gauss(0, 0.9), rnd.gauss(0.3, 1.2), rnd.uniform(0.3, 3.4))) if rnd.random() < 0.6 else \
        Vector((rnd.uniform(-7, 7), rnd.uniform(1, 14), rnd.uniform(0.2, 7)))
    s_ = rnd.uniform(0.0008, 0.0022)
    bmesh.ops.create_icosphere(bm, subdivisions=1, radius=s_, matrix=__import__('mathutils').Matrix.Translation(c))
bm.to_mesh(me); bm.free(); po = bpy.data.objects.new('poly', me); sc.collection.objects.link(po)
pm = bpy.data.materials.new('pölyhiukkanen'); pm.use_nodes = True; pn = pm.node_tree; pn.nodes.clear()
tl = pn.nodes.new('ShaderNodeBsdfTranslucent'); tl.inputs['Color'].default_value = (1, 0.97, 0.92, 1)
tp = pn.nodes.new('ShaderNodeBsdfTransparent'); mx_ = pn.nodes.new('ShaderNodeMixShader'); mx_.inputs['Fac'].default_value = 0.35
pn.links.new(tp.outputs[0], mx_.inputs[1]); pn.links.new(tl.outputs[0], mx_.inputs[2]); ou = pn.nodes.new('ShaderNodeOutputMaterial')
pn.links.new(mx_.outputs[0], ou.inputs['Surface']); po.data.materials.append(pm)   # valaisematon hiukkanen lähes näkymätön

# --- kamera: bysti valokeilassa, tausta epätarkka ---
cd = bpy.data.cameras.new('k'); cd.sensor_fit = 'VERTICAL'; cd.sensor_height = 24
cam = bpy.data.objects.new('k', cd); sc.collection.objects.link(cam); sc.camera = cam
pysty = KORK > LEV
cd.lens = 32 if pysty else 30
cam.location = PAA + (Vector((-0.45, -2.2, 0.05)) if pysty else Vector((-0.6, -2.4, 0.0)))
kohde = PAA + (Vector((0, 0, -0.30)) if pysty else Vector((0, 0, -0.05)))   # pysty: bysti yläkolmannekseen, pylväs alas
cam.rotation_euler = (kohde - cam.location).to_track_quat('-Z', 'Y').to_euler()
cd.dof.use_dof = True; cd.dof.focus_distance = (PAA - cam.location).length; cd.dof.aperture_fstop = 2.2
sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True)
print('VARASTO valmis', ULOS)
