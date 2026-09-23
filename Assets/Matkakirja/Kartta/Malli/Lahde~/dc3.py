# Matkakirja: DC-3-tyyppinen hopeinen potkurimatkustajakone, matalapolyinen (oma työ, CC0).
# Blender 5.x: blender -b -P dc3.py -- <ulos.fbx> <esikatselu.png>
# Mitat metreinä kuten oikea DC-3 (pituus ~19,7 m, kärkiväli ~29 m). Nokka Blenderin -Y (edestä katsottuna),
# ylös +Z. Potkurit ovat omat oliot "Potkuri_V" ja "Potkuri_O", origo navassa, pyörimisakseli paikallinen Y.
import bpy, bmesh, math, sys
from mathutils import Vector, Matrix

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
ULOS = argv[0] if argv else "/tmp/DC3.fbx"
KUVA = argv[1] if len(argv) > 1 else None

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def materiaali(nimi, vari, metalli, karheus):
    m = bpy.data.materials.new(nimi)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = (*vari, 1)
    b.inputs["Metallic"].default_value = metalli
    b.inputs["Roughness"].default_value = karheus
    m.diffuse_color = (*vari, 1)
    return m

HOPEA = materiaali("Hopea", (0.80, 0.81, 0.83), 0.9, 0.38)
LASI = materiaali("Lasi", (0.05, 0.07, 0.10), 0.2, 0.15)
TUMMA = materiaali("Potkuri", (0.13, 0.12, 0.11), 0.6, 0.45)
PUNAINEN = materiaali("Raita", (0.62, 0.13, 0.10), 0.0, 0.5)

def olio(nimi, bm, mat, pehmea=True):
    me = bpy.data.meshes.new(nimi)
    bm.to_mesh(me)
    bm.free()
    for p in me.polygons:
        p.use_smooth = pehmea
    o = bpy.data.objects.new(nimi, me)
    scene.collection.objects.link(o)
    if isinstance(mat, list):
        for m in mat: me.materials.append(m)
    else:
        me.materials.append(mat)
    return o

def loft(bm, renkaat, sulje_alku=True, sulje_loppu=True):
    """Renkaat: lista pistelistoja (sama määrä). Palauttaa kasvot."""
    vv = [[bm.verts.new(p) for p in r] for r in renkaat]
    n = len(renkaat[0])
    kasvot = []
    for a, b in zip(vv, vv[1:]):
        for i in range(n):
            kasvot.append(bm.faces.new((a[i], a[(i + 1) % n], b[(i + 1) % n], b[i])))
    if sulje_alku: kasvot.append(bm.faces.new(list(reversed(vv[0]))))
    if sulje_loppu: kasvot.append(bm.faces.new(vv[-1]))
    return kasvot

def rengas(y, rx, rz, zc=0.0, n=20, xc=0.0):
    return [Vector((xc + rx * math.cos(2 * math.pi * i / n), y, zc + rz * math.sin(2 * math.pi * i / n))) for i in range(n)]

# --- runko: asemat (y, säde, keskikorkeus); nokka -Y, pyrstö nousee ---
asemat = [(-9.85, 0.12, -0.05), (-9.6, 0.55, -0.02), (-9.1, 0.95, 0.0), (-8.3, 1.25, 0.03), (-7.3, 1.40, 0.05),
          (-5.5, 1.45, 0.05), (-2.0, 1.45, 0.05), (1.5, 1.42, 0.08), (4.0, 1.28, 0.18), (6.0, 1.02, 0.34),
          (7.8, 0.72, 0.52), (9.2, 0.42, 0.66), (9.95, 0.12, 0.72)]
bm = bmesh.new()
loft(bm, [rengas(y, r * 0.96, r, zc) for y, r, zc in asemat])
runko = olio("Runko", bm, HOPEA)

# Ohjaamon ikkunat: rungon pinnan mukaiset tummat kaistaleet nokan yläpuolella (kulmat 35°–80°).
def pinta(y, kulma, lisa=1.025):
    for (y0, r0, z0), (y1, r1, z1) in zip(asemat, asemat[1:]):
        if y0 <= y <= y1:
            t = (y - y0) / (y1 - y0)
            r, zc = r0 + (r1 - r0) * t, z0 + (z1 - z0) * t
            break
    return Vector((0.96 * r * math.cos(kulma) * lisa, y, zc + r * math.sin(kulma) * lisa))
bm = bmesh.new()
for s in (-1, 1):
    kulmat = [math.radians(a) for a in (32, 48, 64, 82)]
    ys = (-9.05, -8.35)
    for k0, k1 in zip(kulmat, kulmat[1:]):
        pts = [pinta(ys[0], k0), pinta(ys[1], k0), pinta(ys[1], k1), pinta(ys[0], k1)]
        pts = [Vector((s * abs(p.x) if s > 0 else -abs(p.x), p.y, p.z)) for p in pts]
        vs = [bm.verts.new(p) for p in pts]
        bm.faces.new(vs if s < 0 else list(reversed(vs)))
olio("Ikkunat", bm, LASI, pehmea=False)

# Matkustamon ikkunarivit: pienet tummat laatat kyljissä.
bm = bmesh.new()
for s in (-1, 1):
    for i in range(7):
        y = -5.6 + i * 1.2
        x = s * 1.40
        vs = [bm.verts.new(Vector((x, y + dy, 0.35 + dz))) for dy, dz in ((0, 0), (0.5, 0), (0.5, 0.45), (0, 0.45))]
        bm.faces.new(vs if s < 0 else list(reversed(vs)))
olio("Matkustamo", bm, LASI, pehmea=False)

# --- siivet: alasiipi, nuolinen etureuna, suora jättöreuna, V-kulma 5° ---
def siipi(nimi, x0, x1, z0, dihedral, etu0, taka0, etu1, taka1, paksu0, paksu1, mat=HOPEA):
    bm = bmesh.new()
    renkaat = []
    for s in (-1, 1):
        pass
    osat = []
    for x, etu, taka, pk in ((x0, etu0, taka0, paksu0), (x1, etu1, taka1, paksu1)):
        z = z0 + (abs(x) - abs(x0)) * math.tan(math.radians(dihedral))
        pituus = taka - etu
        profiili = [(0.0, 0.0), (0.25, 0.5), (1.0, 0.0), (0.3, -0.35)]  # (osuus jänteestä, osuus paksuudesta)
        osat.append([Vector((x, etu + a * pituus, z + b * pk)) for a, b in profiili])
    loft(bm, osat)
    return olio(nimi, bm, mat, pehmea=False)

for s, puoli in ((-1, "V"), (1, "O")):
    siipi("Siipi_" + puoli, s * 1.2, s * 14.5, -0.95, 6.0, -2.9, 1.6, -1.1, 0.5, 0.62, 0.2)
    # Siiven pää pyöristettynä: pieni päätyläppä.
    siipi("Siivenpaa_" + puoli, s * 14.5, s * 14.8, -0.95 + 13.3 * math.tan(math.radians(6.0)), 0.0, -1.0, 0.35, -0.7, 0.15, 0.2, 0.08)
    # Korkeusvakaaja pyrstössä.
    siipi("Vakaaja_" + puoli, s * 0.3, s * 4.3, 0.55, 0.0, 7.4, 9.7, 8.7, 9.6, 0.22, 0.08)

# Sivuvakaaja: etureuna nuolinen, pyöristetty yläkulma.
bm = bmesh.new()
profiili = lambda y0, y1, z, pk: [Vector((0, y0, z)), Vector((pk, y0 + 0.3 * (y1 - y0), z)), Vector((0, y1, z)), Vector((-pk, y0 + 0.3 * (y1 - y0), z))]
loft(bm, [profiili(6.6, 9.9, 0.7, 0.14), profiili(8.1, 9.95, 2.4, 0.1), profiili(8.9, 9.85, 3.55, 0.06), profiili(9.3, 9.7, 3.8, 0.03)])
olio("Sivuvakaaja", bm, HOPEA, pehmea=False)

# --- moottorigondolit ja potkurit ---
MX, MY, MZ = 3.6, -4.7, -0.55
for s, puoli in ((-1, "V"), (1, "O")):
    bm = bmesh.new()
    loft(bm, [rengas(y, r, r, MZ + dz, 16, s * MX) for y, r, dz in
              ((MY + 0.05, 0.35, 0), (MY + 0.25, 0.78, 0), (MY + 0.9, 0.82, 0), (MY + 2.6, 0.72, -0.05),
               (MY + 4.4, 0.45, -0.1), (MY + 5.3, 0.12, -0.12))])
    olio("Moottori_" + puoli, bm, HOPEA)

    # Potkuri: napa + kolme lapaa, origo navassa. Rakennetaan origoon ja siirretään.
    bm = bmesh.new()
    loft(bm, [rengas(y, r, r, 0, 12) for y, r in ((-0.45, 0.02), (-0.3, 0.16), (0.0, 0.26), (0.1, 0.26))])
    for k in range(3):
        kulma = 2 * math.pi * k / 3 + (0.5 if s > 0 else 0.0)
        R = Matrix.Rotation(kulma, 4, 'Y')
        lapa = [Vector(p) for p in ((-0.12, 0.0, 0.2), (0.12, -0.02, 0.2), (0.14, -0.02, 1.2), (0.08, 0.0, 1.7), (-0.08, 0.02, 1.7), (-0.14, 0.02, 1.2))]
        ylos = [p + Vector((0, 0.03, 0)) for p in lapa]
        vs0 = [bm.verts.new(R @ p) for p in lapa]
        vs1 = [bm.verts.new(R @ p) for p in ylos]
        bm.faces.new(vs0)
        bm.faces.new(list(reversed(vs1)))
        n = len(lapa)
        for i in range(n):
            bm.faces.new((vs0[i], vs1[i], vs1[(i + 1) % n], vs0[(i + 1) % n]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    p = olio("Potkuri_" + puoli, bm, TUMMA, pehmea=False)
    p.location = Vector((s * MX, MY - 0.05, MZ))

# Punainen raita rungon kyljissä (vuoden 1930 lentoyhtiötyyli): ohut vyö ikkunoiden alla.
bm = bmesh.new()
for s in (-1, 1):
    vs = [bm.verts.new(Vector((s * 1.43, y, z))) for y, z in ((-8.4, 0.12), (6.2, 0.12), (6.2, 0.24), (-8.4, 0.24))]
    bm.faces.new(vs if s < 0 else list(reversed(vs)))
olio("Raita", bm, PUNAINEN, pehmea=False)

# Laskutelineet sisään (lento): ei pyöriä. Kannuspyörä pyrstössä pieni.
for o in scene.objects:
    o.select_set(False)

# Normaalit ulospäin kaikille suljetuille verkoille.
for o in list(scene.objects):
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode='OBJECT')
    o.select_set(False)

# Juuri: tyhjä "DC3", kaikki lapsiksi (Unityssä yksi prefab-juuri).
juuri = bpy.data.objects.new("DC3", None)
scene.collection.objects.link(juuri)
for o in scene.objects:
    if o is not juuri:
        mw = o.matrix_world.copy()
        o.parent = juuri
        o.matrix_world = mw

kolmiot = sum(sum(len(p.vertices) - 2 for p in o.data.polygons) for o in scene.objects if o.type == 'MESH')
print("DC3 kolmioita:", kolmiot)

bpy.ops.export_scene.fbx(filepath=ULOS, use_selection=False, apply_scale_options='FBX_SCALE_UNITS',
                         axis_forward='-Z', axis_up='Y', bake_space_transform=True,
                         object_types={'EMPTY', 'MESH'}, mesh_smooth_type='FACE', add_leaf_bones=False,
                         path_mode='STRIP', embed_textures=False)
print("vienti:", ULOS)

if KUVA:
    kam = bpy.data.objects.new("Kamera", bpy.data.cameras.new("Kamera"))
    scene.collection.objects.link(kam)
    kam.location = Vector((-22, -24, 12))
    kam.rotation_euler = (Vector((0, 0.5, -0.3)) - kam.location).to_track_quat('-Z', 'Y').to_euler()
    kam.data.lens = 50
    scene.camera = kam
    valo = bpy.data.objects.new("Aurinko", bpy.data.lights.new("Aurinko", 'SUN'))
    valo.data.energy = 4
    valo.rotation_euler = (math.radians(40), math.radians(-20), math.radians(30))
    scene.collection.objects.link(valo)
    w = bpy.data.worlds.new("Maailma")
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (0.55, 0.62, 0.72, 1)
    w.node_tree.nodes["Background"].inputs[1].default_value = 0.8
    scene.world = w
    scene.render.engine = 'BLENDER_EEVEE'
    scene.render.resolution_x, scene.render.resolution_y = 1200, 700
    scene.render.filepath = KUVA
    bpy.ops.render.render(write_still=True)
    print("kuva:", KUVA)
