"""Oma parametrinen Kierkegaard-veistos PD/CC0-muotokuvien pohjalta.

Blender 5.2.1, ei ulkopuolista pohjameshia. Sisainen Z-ylos/-Y-eteen
muuntuu GLB-viennissa Y-ylos/+Z-eteen. Mitta normalisoidaan lopuksi.
"""
import bpy
import bmesh
import math
import json
import sys
from pathlib import Path
from mathutils import Vector

KANSIO = Path(__file__).resolve().parent
LUONNOS = '--luonnos' in sys.argv
TYO = Path('/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/kierkegaard-bysti-20261002')
TYO.mkdir(parents=True, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
osat = []

def aktivoi(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o

def verkko(nimi, pisteet, tahkot):
    m = bpy.data.meshes.new(nimi)
    m.from_pydata(pisteet, [], tahkot)
    m.update()
    bm = bmesh.new()
    bm.from_mesh(m)
    bmesh.ops.recalc_face_normals(bm, faces=list(bm.faces))
    bm.to_mesh(m)
    bm.free()
    o = bpy.data.objects.new(nimi, m)
    bpy.context.collection.objects.link(o)
    for p in m.polygons:
        p.use_smooth = True
    osat.append(o)
    return o

def ellipsoidi(nimi, paikka, koko, kierto=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=64, ring_count=40, location=paikka)
    o = bpy.context.object
    o.name = nimi
    o.scale = koko
    o.rotation_euler = kierto
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    for p in o.data.polygons:
        p.use_smooth = True
    osat.append(o)
    return o

def putki(nimi, pisteet, sade, litistys=1):
    # Vaihtuva poikkileikkaus tuottaa veistetyn harjanteen tasapaksun langan sijaan.
    v, f = [], []
    for i, p in enumerate(pisteet):
        a = Vector(pisteet[max(0, i - 1)])
        b = Vector(pisteet[min(len(pisteet) - 1, i + 1)])
        t = (b - a).normalized()
        u = t.cross(Vector((0, 1, 0))).normalized()
        if u.length < 0.1:
            u = t.cross(Vector((1, 0, 0))).normalized()
        w = t.cross(u).normalized()
        r = sade * (0.35 + 0.65 * math.sin(math.pi * i / (len(pisteet) - 1)) ** 0.4)
        for j in range(12):
            q = Vector(p) + r * (u * math.cos(j * math.tau / 12) + w * math.sin(j * math.tau / 12) * litistys)
            v.append(tuple(q))
    for i in range(len(pisteet) - 1):
        for j in range(12):
            k = i * 12 + j
            f.append((k, i * 12 + (j + 1) % 12, (i + 1) * 12 + (j + 1) % 12, k + 12))
    f.append(tuple(reversed(range(12))))
    f.append(tuple((len(pisteet) - 1) * 12 + j for j in range(12)))
    return verkko(nimi, v, f)

def profiili(z, rivit, sarake):
    for i, (a, b) in enumerate(zip(rivit, rivit[1:])):
        if a[0] <= z <= b[0]:
            t = (z - a[0]) / (b[0] - a[0])
            p0 = rivit[max(0, i - 1)][sarake]
            p1, p2 = a[sarake], b[sarake]
            p3 = rivit[min(len(rivit) - 1, i + 2)][sarake]
            return .5 * (2*p1 + (-p0+p2)*t + (2*p0-5*p1+4*p2-p3)*t*t + (-p0+3*p1-3*p2+p3)*t*t*t)
    return rivit[0 if z < rivit[0][0] else -1][sarake]

def gauss(x, z, cx, cz, wx, wz):
    return math.exp(-((x - cx) / wx) ** 2 - ((z - cz) / wz) ** 2)

# Pitka, kapea leukalinja, korkea otsa ja voimakas nenan selka seuraavat piirrosta.
rivit = [(4.75, .12, .38, -.10), (4.94, .47, .58, -.06),
         (5.20, .63, .71, .02), (5.58, .77, .78, .04),
         (6.04, .89, .80, .08), (6.44, .92, .81, .10),
         (6.90, .96, .83, .11), (7.40, .91, .86, .14),
         (7.78, .69, .71, .17), (7.98, .15, .30, .18)]
v, f = [], []
renkaat, kehalla = 230, 256
for i in range(renkaat):
    z = 4.75 + (7.98 - 4.75) * i / (renkaat - 1)
    leveys = profiili(z, rivit, 1)
    syvyys = profiili(z, rivit, 2)
    kesk = profiili(z, rivit, 3)
    for j in range(kehalla):
        a = j * math.tau / kehalla
        c = math.cos(a)
        x = leveys * math.sin(a)
        y = kesk - syvyys * c
        if c > 0:
            paino = c ** 3
            d = .22 * gauss(x, z, 0, 6.31, .15, .50)
            d += .35 * gauss(x, z, 0, 5.91, .20, .19)
            d += .11 * gauss(x, z, 0, 5.83, .29, .085)
            for s in [-1, 1]:
                d -= .145 * gauss(x, z, s * .435, 6.38, .32, .18)
                d += .14 * gauss(x, z, s * .45, 6.64, .34, .12)
                d += .12 * gauss(x, z, s * .60, 6.00, .23, .28)
                d -= .05 * gauss(x, z, s * .48, 5.60, .16, .23)
                d += .055 * gauss(x, z, s * .22, 5.53, .18, .16)
                d -= .035 * gauss(x, z, s * .12, 5.66, .03, .11)
            kaari = 5.44 + .015 * math.cos(x * 13) - .028 * abs(x)
            d += .045 * gauss(x, z, 0, 5.50, .34, .055)
            d += .075 * gauss(x, z, 0, 5.35, .32, .08)
            d -= .070 * math.exp(-(x / .37) ** 6 - ((z - kaari) / .025) ** 2)
            d -= .045 * gauss(x, z, 0, 5.20, .37, .06)
            d += .085 * gauss(x, z, 0, 5.03, .43, .14)
            y -= d * paino
        v.append((x, y, z))
for i in range(renkaat - 1):
    for j in range(kehalla):
        k = i * kehalla + j
        f.append((k, i * kehalla + (j + 1) % kehalla, (i + 1) * kehalla + (j + 1) % kehalla, k + kehalla))
f.extend([tuple(reversed(range(kehalla))), tuple((renkaat - 1) * kehalla + j for j in range(kehalla))])
paa = verkko('Kasvojen yhtenainen veistos', v, f)
ellipsoidi('Kaula', (0, .10, 4.72), (.50, .47, .81))

# Silmamunat ovat samanvalkoista kipsia, ilman maalattuja pupilleja.
for s in [-1, 1]:
    ellipsoidi('Veistetty silma', (s * .435, -.491, 6.385), (.225, .087, .122), (0, 0, s * -.18))
    for yla in [True, False]:
        p = []
        for i in range(45):
            t = i / 44
            x = s * .435 - .25 + .50 * t
            z = 6.38 + (.122 if yla else -.092) * math.sin(t * math.pi) + .020 * (t - .5) * s
            sisaan = t if s > 0 else 1 - t
            y = -.69 + .215 * sisaan - .015 * math.sin(math.pi * t)
            p.append((x, y, z))
        putki('Ylaluomi' if yla else 'Alaluomi', p, .024 if yla else .019)
    p = [(s * (.17 + .55 * t / 44), -.69 - .04 * math.sin(t / 44 * math.pi),
          6.64 + .060 * math.sin(t / 44 * math.pi) - .055 * t / 44) for t in range(45)]
    # Kulman muoto on kasvomeshissa, eika irrallisena maalatun kulmakarvan nauhana.
    ellipsoidi('Nenansiipi', (s * .17, -.909, 5.84), (.105, .087, .067))
    ellipsoidi('Korva', (s * .94, .01, 6.12), (.12, .22, .34), (0, s * .10, s * .13))
    p = [(s * (1.02 + .10 * math.sin(t * math.tau / 70)),
          -.11 - .08 * math.sin(t * math.tau / 70), 6.12 + .26 * math.cos(t * math.tau / 70)) for t in range(71)]
    putki('Korvan helix', p, .036)
    ellipsoidi('Korvan tragus', (s * 1.04, -.19, 6.04), (.05, .07, .09))

# Niskahiukset ja otsalta taakse nouseva kampaus on veistetty laajoina suortuvina.
hv, hf = [], []
for i in range(100):
    t = i / 99
    for j in range(192):
        a = j * math.tau / 192
        c = math.cos(a)
        loppu = 1.90 - .57 * max(c, 0) + .20 * max(-c, 0) + .055 * math.sin(3*a)
        phi = .001 + t * loppu
        aalto = 1 + .07 * math.sin(7*a + phi*3) * math.sin(phi) ** 2
        x = 1.115 * math.sin(phi) * math.sin(a) * aalto
        y = .16 - .98 * math.sin(phi) * math.cos(a) * aalto
        z = 7.06 + 1.28 * math.cos(phi)
        hv.append((x, y, z))
for i in range(99):
    for j in range(192):
        k = i * 192 + j
        hf.append((k, i * 192 + (j + 1) % 192, (i + 1) * 192 + (j + 1) % 192, k + 192))
hf.append(tuple(reversed(range(192))))
hf.append(tuple(99 * 192 + j for j in range(192)))
hiukset = [verkko('Hiusten massa', hv, hf)]
for k in range(20):
    a0 = (k / 20) * math.tau
    etu = max(math.cos(a0), 0)
    phi0 = 1.87 - .57 * etu + .20 * max(-math.cos(a0), 0)
    p = []
    for i in range(70):
        t = i / 69
        phi = phi0 * (1 - t) + .40 * t
        a = a0 + .64 * math.sin(math.pi * t) + .42 * t
        aalto = 1 + .07 * math.sin(7*a + phi*3) * math.sin(phi)**2
        x = 1.12 * math.sin(phi) * math.sin(a) * aalto
        y = .16 - .993 * math.sin(phi) * math.cos(a) * aalto
        z = 7.06 + 1.295 * math.cos(phi)
        p.append((x, y, z))
    hiukset.append(putki('Kammattu hiusura', p, .060 if etu else .049, .42))
for k in range(5):
    p = []
    a0 = -.67 + k * .29
    for i in range(60):
        t = i / 59
        phi = 1.28 - .78*t
        a = a0 + .58*math.sin(math.pi*t) + .55*t
        p.append((1.10*math.sin(phi)*math.sin(a), .12 - .995*math.sin(phi)*math.cos(a),
                  7.06 + 1.35*math.cos(phi) + .065*math.sin(math.pi*t)))
    hiukset.append(putki('Otsakiehkura', p, .085 + .018*k, .52))

def yhdista(nimi, ryhma, voxel):
    bpy.ops.object.select_all(action='DESELECT')
    for o in ryhma:
        o.select_set(True)
    bpy.context.view_layer.objects.active = ryhma[0]
    bpy.ops.object.join()
    o = bpy.context.object
    o.name = nimi
    m = o.modifiers.new('Yhtenaista valupinta', 'REMESH')
    m.mode = 'VOXEL'
    m.voxel_size = voxel
    m.use_smooth_shade = True
    bpy.ops.object.modifier_apply(modifier=m.name)
    m = o.modifiers.new('Hio kipsi', 'SMOOTH')
    m.factor = .65
    m.iterations = 3
    bpy.ops.object.modifier_apply(modifier=m.name)
    return o

kasvot = yhdista('Paa kaula ja veistetyt silmat', [o for o in osat if o not in hiukset], .016)
hius = yhdista('Veistetty kampaus', hiukset, .019)
osat = [kasvot, hius]

# 1840-luvun korkea kaulus, solmio ja takin kaanteet, ei antiikin toogaa.
rivit = [(1.10, .93, .54, .08), (1.65, 1.40, .71, .06),
         (2.40, 2.12, .89, .07), (3.08, 2.14, .86, .07),
         (3.68, 1.67, .69, .09), (4.08, .91, .57, .08), (4.40, .52, .47, .09)]
v, f = [], []
for i in range(120):
    z = 1.10 + 3.30 * i / 119
    for j in range(160):
        a = j * math.tau / 160
        v.append((profiili(z, rivit, 1) * math.sin(a), .08 - profiili(z, rivit, 2) * math.cos(a), z))
for i in range(119):
    for j in range(160):
        k = i * 160 + j
        f.append((k, i * 160 + (j + 1) % 160, (i + 1) * 160 + (j + 1) % 160, k + 160))
f.extend([tuple(reversed(range(160))), tuple(119 * 160 + j for j in range(160))])
takki = verkko('Surdutin rintakuva', v, f)

def kangas(nimi, pisteet):
    o = verkko(nimi, pisteet, [tuple(range(len(pisteet)))])
    aktivoi(o)
    m = o.modifiers.new('Kankaan reliefi', 'SOLIDIFY'); m.thickness = .09
    bpy.ops.object.modifier_apply(modifier=m.name)
    m = o.modifiers.new('Pehmea valureuna', 'BEVEL'); m.width = .055; m.segments = 4
    bpy.ops.object.modifier_apply(modifier=m.name)
    return o

for s in [-1, 1]:
    pisteet = [(s * .54, -.45, 4.39), (s * .94, -.61, 4.01),
          (s * .79, -.79, 3.80), (s * 1.22, -.80, 3.54),
          (s * .10, -.90, 2.23), (s * .46, -.80, 3.43)]
    pisteet = [(x, .08-profiili(z,rivit,2)*math.sqrt(max(.01,1-(x/profiili(z,rivit,1))**2))-.055, z) for x,y,z in pisteet]
    kangas('Takin kaanne', pisteet)
    kangas('Pystykaulus', [(s * .06, -.46, 4.55), (s * .43, -.35, 4.67),
          (s * .61, -.44, 4.20), (s * .20, -.62, 4.10)])
ellipsoidi('Solmion solmu', (0, -.59, 4.10), (.26, .18, .18))
kangas('Solmion taitos', [(-.22, -.65, 4.02), (.22, -.65, 4.02),
       (.30, -.80, 3.40), (.06, -.90, 3.12), (-.28, -.80, 3.43)])

def sorvaa(nimi, profiilit):
    v, f = [], []
    for z, r in profiilit:
        for j in range(192):
            a = j * math.tau / 192
            v.append((r * math.sin(a), .73 * r * math.cos(a), z))
    for i in range(len(profiilit) - 1):
        for j in range(192):
            k = i * 192 + j
            f.append((k, i * 192 + (j + 1) % 192, (i + 1) * 192 + (j + 1) % 192, k + 192))
    f.extend([tuple(reversed(range(192))), tuple((len(profiilit) - 1) * 192 + j for j in range(192))])
    return verkko(nimi, v, f)

sorvaa('Kipsinen sokkeli', [(0, 1.16), (.06, 1.20), (.20, 1.20), (.27, 1.12),
       (.31, 1.06), (.38, 1.03), (.45, .77), (.83, .67), (.92, .79), (1.12, .94)])
bpy.ops.object.select_all(action='DESELECT')
for o in osat:
    o.select_set(True)
bpy.context.view_layer.objects.active = kasvot
bpy.ops.object.join()
bysti = bpy.context.object
bysti.name = 'kierkegaard-master'
aktivoi(bysti)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
# Poista sokkelin syvyysakselin siirtyma: origo pysyy pohjan keskella.
minz = min(v.co.z for v in bysti.data.vertices)
maxz = max(v.co.z for v in bysti.data.vertices)
mitta = .51 / (maxz - minz)
for v in bysti.data.vertices:
    v.co.z -= minz
    v.co *= mitta
bysti.location = (0, 0, 0)
for p in bysti.data.polygons:
    p.use_smooth = True

kipsi = bpy.data.materials.new('Valkoinen mattakipsi')
kipsi.use_nodes = True
n = kipsi.node_tree.nodes
shader = n.get('Principled BSDF')
shader.inputs['Base Color'].default_value = (.86, .85, .82, 1)
shader.inputs['Roughness'].default_value = .73
shader.inputs['Metallic'].default_value = 0
shader.inputs['Specular IOR Level'].default_value = .23
koord = n.new('ShaderNodeTexCoord')
kohina = n.new('ShaderNodeTexNoise'); kohina.inputs['Scale'].default_value = 1900
kohina.inputs['Detail'].default_value = 2
bump = n.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = .15
bump.inputs['Distance'].default_value = .000045
kipsi.node_tree.links.new(koord.outputs['Object'], kohina.inputs['Vector'])
kipsi.node_tree.links.new(kohina.outputs['Fac'], bump.inputs['Height'])
kipsi.node_tree.links.new(bump.outputs['Normal'], shader.inputs['Normal'])
bysti.data.materials.clear(); bysti.data.materials.append(kipsi)

def kamera(paikka, kohde, nimi):
    bpy.ops.object.camera_add(location=paikka)
    c = bpy.context.object; c.name = nimi
    c.rotation_euler = (Vector(kohde) - c.location).to_track_quat('-Z', 'Y').to_euler()
    c.data.type = 'ORTHO'; c.data.ortho_scale = .62
    return c

def valo(nimi, paikka, teho, koko):
    bpy.ops.object.light_add(type='AREA', location=paikka)
    o = bpy.context.object; o.name = nimi
    o.data.energy = teho; o.data.shape = 'DISK'; o.data.size = koko
    o.rotation_euler = (Vector((0, 0, .29)) - o.location).to_track_quat('-Z', 'Y').to_euler()

sc = bpy.context.scene
sc.render.engine = 'BLENDER_EEVEE'
sc.render.resolution_x = 900; sc.render.resolution_y = 1100
sc.render.resolution_percentage = 100
sc.world.color = (.018, .018, .020)
sc.world.use_nodes = True
sc.world.node_tree.nodes.get('Background').inputs[0].default_value = (.022, .024, .030, 1)
sc.world.node_tree.nodes.get('Background').inputs[1].default_value = .20
sc.view_settings.view_transform = 'AgX'
valo('Kova sivuvalo', (-.65, -.45, .80), 28, .15)
valo('Hento tayte', (.48, -.75, .33), 3, .65)
valo('Reunavalo', (.30, .48, .70), 22, .25)
etu = kamera((0, -.90, .33), (0, 0, .265), 'Edesta')
kolme = kamera((.62, -.83, .38), (0, 0, .27), 'Kolme neljasosaa')
sivu = kamera((.95, 0, .32), (0, 0, .265), 'Sivulta')
sc.camera = kolme
bpy.ops.wm.save_as_mainfile(filepath=str(TYO / 'kierkegaard-luonnos-v2.blend'))
print('MASTER_VERTICES', len(bysti.data.vertices), flush=True)
for c, tied in [(etu, 'edesta-luonnos-v2.png'), (kolme, 'kolme-neljasosaa-luonnos-v2.png'), (sivu, 'sivulta-luonnos-v2.png')]:
    sc.camera = c; sc.render.filepath = str(TYO / tied)
    bpy.ops.render.render(write_still=True)
print('LUONNOS_VALMIS', flush=True)
