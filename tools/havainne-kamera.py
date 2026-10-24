# Havainnekuvan pelikamera Blenderiin (OMISTAJAN PÄÄTÖS 24.10.2026 22.42: tekijät sovittavat työn havainnekuvaan itse ennen tarkistusta).
# Kamera kuten pelin kulma 810 (Pelikoodari, DroneNosto.cs): 6,77 m keisarin takana ja 3,88 m ylhäällä, vaakakuvan pystykenttä 38,8°,
# katse alas niin, että keisarin rinta (1,0 m) on 0,332 puolikorkeutta kuvan keskikohdan alla (16,4°; PK pelikoodari/havainne-210). Keisari mittakaavana: keltainen merkki
# 0,45 × 0,30 × 1,35 m (PuyiKorkeus) keisarin paikalla. Havainnekuva läpikuultavana: kameran taustakuvana (Blender-ikkunassa) ja
# renderöinnin jälkeen <ulos>-paallekkain.png (50 %) ja <ulos>-rinnakkain.png (havainne | oma).
#
# Ajo: Blender [-b] --factory-startup -P tools/havainne-kamera.py -- --puyi X Z [SUUNTA] [--havainne kuva.png] [--ulos polku/etuliite]
#        [--mallit kansio] [--tausta kielletty-tausta-v42] [--rakennukset kielletty-rakennukset-v31] [--avoimet avoimet-v31]
#        [--muurikate kielletty-muurikate-v12/kk-muurikate-v12.glb] [--ulkorengas kielletty-ulkorengas-v1] [--kulmatorni kielletty-kulmatorni-v1b]
#        [--sade 150] [--leveys 1448]
#   X Z = keisarin paikka pohja.json-kehyksessä (x itä, z pohjoinen), SUUNTA = katseen atsimuutti asteina (0 = pohjoinen, 90 = itä).
#   Ilman -b:tä Blender jää auki kameranäkymään (Numpad 0), havainnekuva taustakuvana 50 %.
#   Mallit luetaan vientipakettien kansioista (oletus: esikatselu-mallit, jossa on linkit _valmiit-paketteihin).
import bpy, sys, os, json, glob, math
from mathutils import Vector
A = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def arg(nimi, oletus=None):
    if nimi not in A: return oletus
    i = A.index(nimi) + 1; v = []
    while i < len(A) and not A[i].startswith('--'): v.append(A[i]); i += 1
    return v if len(v) > 1 else (v[0] if v else oletus)
P = arg('--puyi')
if not P or isinstance(P, str): sys.exit('anna --puyi X Z [SUUNTA]')
PX, PZ = float(P[0]), float(P[1]); SUUNTA = math.radians(float(P[2]) if len(P) > 2 else 0.0)
M = arg('--mallit', '/Users/Shared/Claude/proto-3d/_tyo/linnanrakentaja/esikatselu-mallit')
TAUSTA = os.path.join(M, arg('--tausta', 'kielletty-tausta-v42')); RAK = os.path.join(M, arg('--rakennukset', 'kielletty-rakennukset-v31'))
AVO = os.path.join(M, arg('--avoimet', 'avoimet-v31')); MK = os.path.join(M, arg('--muurikate', 'kielletty-muurikate-v12/kk-muurikate-v12.glb'))
HAV = arg('--havainne'); ULOS = arg('--ulos', '/tmp/havainne-kamera'); SADE = float(arg('--sade', '150')); LEV = int(arg('--leveys', '1448'))
TAAKSE, YLOS, KENTTA, HORISONTTI, PUYI_H = 6.77, 3.88, 38.8, 0.15, 1.35
bl = lambda x, z, y=0.0: Vector((x, -z, y))   # pohja (x, z, korkeus) → Blender
bpy.ops.wm.read_factory_settings(use_empty=True)
def tuo(f):
    e = set(bpy.data.objects); bpy.ops.import_scene.gltf(filepath=f); u_ = [o for o in bpy.data.objects if o not in e]
    for o in u_: o['lahde'] = os.path.basename(f)
    return u_
# tausta: LOD0-palat SADE m:n sisältä
tj = json.load(open(os.path.join(TAUSTA, 'tausta.json')))['palat']
for nimi, d in tj.items():
    x0, x1, z0, z1 = d['rajat_xz']
    if x0 - SADE <= PX <= x1 + SADE and z0 - SADE <= PZ <= z1 + SADE: tuo(os.path.join(TAUSTA, d['tiedostot']['lod0']))
# tarkat rakennukset paikoilleen
for nimi, t in json.load(open(os.path.join(RAK, 'rakennukset.json')))['mallit'].items():
    px, pz = t['paikka_pohja']
    if math.hypot(px - PX, pz - PZ) > SADE + 200: continue
    for o in tuo(os.path.join(RAK, f'{nimi}-lod0.glb')):
        if o.parent is None: o.location = bl(px, pz)
# avoimet huoneet sijoituksen mukaan (sijoitus taustapaketissa)
sij = os.path.join(TAUSTA, 'avoimet-sijoitus.json')
if os.path.exists(sij):
    for h in json.load(open(sij))['huoneet']:
        tx, _, tz = h['translation']
        if math.hypot(tx - PX, tz - PZ) > SADE: continue
        uudet = tuo(os.path.join(AVO, h['glb'].split('/')[-1])); e = bpy.data.objects.new('H', None); bpy.context.scene.collection.objects.link(e)
        e.location = bl(tx, tz); e.rotation_euler = (0, 0, 2 * math.atan2(h['rotation'][1], h['rotation'][3]))
        for o in uudet:
            if o.parent is None: o.parent = e
if os.path.exists(MK): tuo(MK)
# pelin muut kerrokset (PT 24.10.: taivas keskellä): ulkorengas (lod2-palat, maailman koordinaatit) ja kulmatornit, jos annettu
for _k in filter(None, [arg('--ulkorengas'), arg('--kulmatorni')]):
    _d = _k if os.path.isabs(_k) else os.path.join(M, _k)
    for _f in sorted(glob.glob(os.path.join(_d, '*-lod2.glb')) or glob.glob(os.path.join(_d, '*-lod0.glb')) or glob.glob(os.path.join(_d, '*.glb'))): tuo(_f)
# keisari mittakaavana (PuyiKorkeus 1,35 m): tummat jalat 0–0,30 m, keltainen viitta 0,30–1,05 m, musta pää ja hattu 1,05–1,35 m
def osa(nimi, vari, z0, z1, lev, syv, hehku=0.0):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; b_ = m.node_tree.nodes['Principled BSDF']; b_.inputs['Base Color'].default_value = (*vari, 1)
    if hehku: b_.inputs['Emission Color'].default_value = (*vari, 1); b_.inputs['Emission Strength'].default_value = hehku
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=bl(PX, PZ, (z0 + z1) / 2)); o = bpy.context.active_object; o.name = nimi
    o.scale = (lev, syv, z1 - z0); o.rotation_euler = (0, 0, -SUUNTA); o.data.materials.append(m)
osa('keisari_jalat', (0.06, 0.05, 0.05), 0.0, 0.30, 0.30, 0.22)
osa('keisari_viitta', (0.95, 0.72, 0.08), 0.30, 1.05, 0.55, 0.32, 0.6)
osa('keisari_paa', (0.04, 0.04, 0.05), 1.05, PUYI_H, 0.30, 0.28)
# kamera
sc = bpy.context.scene; sc.render.resolution_x, sc.render.resolution_y = LEV, round(LEV * 3 / 4)
cd = bpy.data.cameras.new('pelikamera'); cd.sensor_fit = 'VERTICAL'; cd.lens_unit = 'FOV'; cd.angle = math.radians(KENTTA); cd.clip_start = 0.1; cd.clip_end = 3000
cam = bpy.data.objects.new('pelikamera', cd); sc.collection.objects.link(cam); sc.camera = cam
dx, dz = math.sin(SUUNTA), math.cos(SUUNTA)
cam.location = bl(PX - dx * TAAKSE, PZ - dz * TAAKSE, YLOS)
alas = math.atan2(YLOS - 1.0, TAAKSE) - math.atan(0.332 * math.tan(math.radians(KENTTA) / 2))   # PK: rinta (1,0 m) 0,332 puolikorkeutta keskikohdan alla → 16,4°
eteen = bl(dx, dz) - bl(0, 0); suunta = Vector((eteen.x * math.cos(alas), eteen.y * math.cos(alas), -math.sin(alas)))
cam.rotation_euler = suunta.to_track_quat('-Z', 'Y').to_euler()
if HAV and os.path.exists(HAV):
    cd.show_background_images = True; tk = cd.background_images.new(); tk.image = bpy.data.images.load(HAV); tk.alpha = 0.5; tk.display_depth = 'FRONT'
# valo kuten pelin leivonta (VS k20b: 170°/45°) ja taivas
w = bpy.data.worlds.new('taivas'); w.use_nodes = True; w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.45, 0.6, 0.9, 1); sc.world = w
au = bpy.data.objects.new('aurinko', bpy.data.lights.new('aurinko', 'SUN')); au.data.energy = 3.0; au.data.color = (1.0, 0.87, 0.70)
AZ, EL = math.radians(170), math.radians(45)
au.rotation_euler = (-Vector((math.sin(AZ) * math.cos(EL), -math.cos(AZ) * math.cos(EL), math.sin(EL)))).to_track_quat('-Z', 'Y').to_euler(); sc.collection.objects.link(au)
sc.render.engine = 'BLENDER_EEVEE'; sc.view_settings.view_transform = 'Standard'
print('KAMERA', 'keisari', round(PX, 2), round(PZ, 2), 'suunta', round(math.degrees(SUUNTA), 1), 'kamera', [round(c, 2) for c in cam.location], 'alas', round(math.degrees(alas), 1), flush=True)
OA = [float(v) for v in arg('--osumaalue', ['0.35', '0.65', '0', '0.20'])]   # x0 x1 y0 y1 (osuudet kuvasta)
if '--osumat' in A:   # mitkä kappaleet täyttävät keskikaistan (x 0,35–0,65, y < 0,20): säteet kamerasta, osumat tiedostoittain (etäisyys, korkeus)
    from mathutils import Vector as _V
    dg = bpy.context.evaluated_depsgraph_get(); fr = cd.view_frame(scene=sc); R = cam.matrix_world.to_3x3(); osu = {}
    for iy in range(12):
        for ix in range(24):
            u, v = OA[0] + (OA[1] - OA[0]) * (ix + 0.5) / 24, OA[2] + (OA[3] - OA[2]) * (iy + 0.5) / 12
            p_ = fr[3] + (fr[0] - fr[3]) * u + (fr[2] - fr[3]) * v   # view_frame: [ylä-oikea, ala-oikea, ala-vasen, ylä-vasen]
            d_ = (R @ p_).normalized(); hit, loc, n_, i_, ob, m_ = sc.ray_cast(dg, cam.location, d_)
            k_ = 'taivas' if not hit else ob.get('lahde', ob.name)
            e = osu.setdefault(k_, [0, 0.0, 0.0]); e[0] += 1
            if hit: e[1] += (loc - cam.location).length; e[2] = max(e[2], loc.z)
    for k_, (c_, dsum, zmax) in sorted(osu.items(), key=lambda t: -t[1][0]):
        print('OSUMA %4.1f %%  %-50s etäisyys ~%5.0f m  korkein %5.1f m' % (100 * c_ / 288, k_[:50], dsum / max(1, c_), zmax), flush=True)
if bpy.app.background:
    sc.render.filepath = ULOS + '-oma.png'; bpy.ops.render.render(write_still=True)
    if HAV and os.path.exists(HAV):
        try:
            from PIL import Image
            o = Image.open(ULOS + '-oma.png').convert('RGB'); h = Image.open(HAV).convert('RGB').resize(o.size)
            Image.blend(h, o, 0.5).save(ULOS + '-paallekkain.png')
            r = Image.new('RGB', (o.width * 2 + 10, o.height), (255, 255, 255)); r.paste(h, (0, 0)); r.paste(o, (o.width + 10, 0)); r.save(ULOS + '-rinnakkain.png')
        except ImportError:
            print('PIL puuttuu Blenderin Pythonista: aja tools/havainne-mittari.py, joka tekee myös kuvat', flush=True)
    print('VALMIS', ULOS, flush=True)
