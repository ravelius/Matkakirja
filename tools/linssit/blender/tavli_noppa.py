# TAVLIN NOPPA (Linnanrakentaja 5.10.2026, Siirtosepän Tavli-suunnitelma): pyöristetty luunvärinen noppa, mustat silmät (1 suurempi).
# Tekstuuriatlas (3 × 2 ruutua) piirretään tässä numpy-koodilla, oma tuotanto CC0. glb:ssä kuusi tyhjää lasta "tahko-1" …
# "tahko-6" tahkojen keskipisteissä: natiivi lukee tahkon suunnan niistä (ei riipu akselimuunnoksista).
# Vastakkaiset tahkot 1–6, 2–5, 3–4 (summa 7); 1 ylös (+Y glTF), 2 eteen (+Z), 3 oikealle (+X) → 1-2-3 vastapäivään ylhäältä.
#   Blender -b -P tavli_noppa.py -- <ulos-kansio>
import bpy, bmesh, math, os, sys, json
import numpy as np
from mathutils import Vector

ULOS = sys.argv[sys.argv.index('--') + 1]; os.makedirs(ULOS, exist_ok=True)
SIVU = 1.0                                   # särmä 1 (natiivi skaalaa: noppa ≈ 11 % laudan leveydestä)
RUUTU = 512
# tahko → (Blenderin normaali (Z ylös), atlaksen ruutu (sarake, rivi)); glTF-vienti: Blender (x, y, z) → glTF (x, z, −y)
TAHKOT = {1: ((0, 0, 1), (0, 0)), 6: ((0, 0, -1), (1, 0)), 2: ((0, -1, 0), (2, 0)),
          5: ((0, 1, 0), (0, 1)), 3: ((1, 0, 0), (1, 1)), 4: ((-1, 0, 0), (2, 1))}
SILMAT = {1: [(0, 0)], 2: [(-1, -1), (1, 1)], 3: [(-1, -1), (0, 0), (1, 1)], 4: [(-1, -1), (1, -1), (-1, 1), (1, 1)],
          5: [(-1, -1), (1, -1), (0, 0), (-1, 1), (1, 1)], 6: [(-1, -1), (-1, 0), (-1, 1), (1, -1), (1, 0), (1, 1)]}


def atlas():
    W, H = 3 * RUUTU, 2 * RUUTU
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    rng = np.random.default_rng(1873)
    kohina = rng.normal(0, 1, (H // 8, W // 8)).astype(np.float32)
    kohina = np.kron(kohina, np.ones((8, 8), np.float32))[:H, :W]
    luu = np.stack([0.80 + 0.02 * kohina, 0.74 + 0.02 * kohina, 0.60 + 0.02 * kohina], -1)   # luunvaalea, kevyt vaihtelu
    vari = luu.copy()
    for n, (_, (c, r)) in TAHKOT.items():
        cx0, cy0 = c * RUUTU, r * RUUTU
        for sx, sy in SILMAT[n]:
            px_, py_ = cx0 + RUUTU / 2 + sx * RUUTU * 0.26, cy0 + RUUTU / 2 + sy * RUUTU * 0.26
            rad = RUUTU * (0.105 if n != 1 else 0.13)
            d = np.sqrt((xx - px_) ** 2 + (yy - py_) ** 2)
            silma = np.clip((rad - d) / 3.0, 0, 1)                       # pehmeä reuna
            reuna = np.clip(1 - np.abs(d - rad) / 6.0, 0, 1) * 0.25      # kuopan reunan varjo
            tum = np.array([0.03, 0.025, 0.02], np.float32)   # kaikki silmät mustia (kahvilanopat)
            vari = vari * (1 - silma[..., None]) + tum * silma[..., None]
            vari = vari * (1 - reuna[..., None] * 0.6)
    vari = np.clip(vari, 0, 1)
    img = bpy.data.images.new('noppa_atlas', W, H, alpha=False)
    rgba = np.concatenate([np.flipud(vari), np.ones((H, W, 1), np.float32)], -1)
    img.pixels.foreach_set(rgba.ravel()); img.filepath_raw = os.path.join(ULOS, 'noppa-atlas.png'); img.file_format = 'PNG'
    img.save(); return img


bpy.ops.wm.read_factory_settings(use_empty=True)
img = atlas()
bpy.ops.mesh.primitive_cube_add(size=SIVU); o = bpy.context.object; o.name = 'noppa'
bv = o.modifiers.new('pyoristys', 'BEVEL'); bv.width = 0.11 * SIVU; bv.segments = 5; bv.limit_method = 'NONE'
bpy.ops.object.modifier_apply(modifier='pyoristys')
# UV: kunkin pinnan normaalin hallitseva akseli → tahkon ruutu, projektio ruudun sisään
bm = bmesh.new(); bm.from_mesh(o.data); uv = bm.loops.layers.uv.verify()   # olemassa oleva aktiivinen UV (materiaali käyttää sitä)
akselit = {n: Vector(v) for n, (v, _) in TAHKOT.items()}
for f in bm.faces:
    n = max(akselit, key=lambda k: f.normal.dot(akselit[k])); nv = akselit[n]; c, r = TAHKOT[n][1]
    # tahkon tason kantavektorit (u oikealle, v ylös katsottuna tahkon ulkopuolelta)
    ylos = Vector((0, 1, 0)) if abs(nv.z) > 0.5 else Vector((0, 0, 1))
    u_ax = ylos.cross(nv).normalized() * -1; v_ax = nv.cross(u_ax).normalized()
    for l in f.loops:
        p = l.vert.co; u = 0.5 + p.dot(u_ax) / SIVU; v = 0.5 + p.dot(v_ax) / SIVU
        l[uv].uv = ((c + min(max(u, 0.02), 0.98)) / 3, 1 - (r + 1 - min(max(v, 0.02), 0.98)) / 2)
bm.to_mesh(o.data); bm.free()
bpy.ops.object.shade_smooth()
m = bpy.data.materials.new('noppa'); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
t = m.node_tree.nodes.new('ShaderNodeTexImage'); t.image = img; m.node_tree.links.new(t.outputs['Color'], b.inputs['Base Color'])
b.inputs['Roughness'].default_value = 0.32; b.inputs['Coat Weight'].default_value = 0.3; o.data.materials.append(m)
# tahkojen tyhjät
for n, (v, _) in TAHKOT.items():
    e = bpy.data.objects.new(f'tahko-{n}', None); bpy.context.scene.collection.objects.link(e)
    e.location = Vector(v) * SIVU / 2; e.parent = o; e.empty_display_size = 0.1
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(ULOS, 'noppa.glb'), export_format='GLB', use_selection=True, export_yup=True)
# nopat.json: tahkojen normaalit glTF-koordinaatistossa (Y ylös) ja kierto, jolla tahko n osoittaa ylös (+Y)
gl = lambda v: [v[0], v[2], -v[1]]
def kierto_ylos(nv):
    a = Vector(gl(nv)); y = Vector((0, 1, 0))
    if (a - y).length < 1e-6: return [0, 0, 0, 1]
    if (a + y).length < 1e-6: return [1, 0, 0, 0]          # 180° X-akselin ympäri (x, y, z, w)
    q = a.rotation_difference(y); return [round(q.x, 6), round(q.y, 6), round(q.z, 6), round(q.w, 6)]
J = {'huom': 'Linnanrakentaja 5.10.2026. glTF-koordinaatisto (Y ylös, +Z eteen). Tahkon n suunta = lapsen "tahko-n" paikka '
             'nopan keskipisteestä (luotettavin Unityssä akselimuunnoksen jälkeen). kierto_ylos = kvaternio (x, y, z, w), joka '
             'kääntää tahkon n ylös lepoasennosta; peli lisää satunnaisen kierron Y-akselin ympäri.',
     'sarma': SIVU, 'atlas': 'noppa-atlas.png', 'vastakkaiset': [[1, 6], [2, 5], [3, 4]],
     'tahkot': {str(n): {'normaali': gl(v), 'kierto_ylos': kierto_ylos(v)} for n, (v, _) in sorted(TAHKOT.items())}}
json.dump(J, open(os.path.join(ULOS, 'nopat.json'), 'w'), ensure_ascii=False, indent=1)
print('NOPPA valmis', ULOS)
