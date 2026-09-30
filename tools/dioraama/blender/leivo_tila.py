# Dioraaman tila Blenderissä (Linnanrakentaja 29.9.2026, omistajan "uusi tapa": valokuvamainen, esilaskettu valo).
# Tuo rakennuskoneen tilan glb:n (tilat/<id>.glb) pohjaksi, vaihtaa pintojen materiaalit PBR-materiaaleiksi
# (proseduraaliset nyt, Poly Haven -tekstuurit myöhemmin), lisää tilan valot rakennus.json:sta (tulisija, kynttilät,
# ikkunakeila) ja joko renderöi esikuvan tilan kamerasta (--renderoi) tai leipoo valon atlakseen UV1:lle (--leivo) ja
# vie glb:n Unityyn. Ajo taustalla, yksi kerrallaan (kuormaraja):
#   nice -n 15 /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/dioraama/blender/leivo_tila.py -- \
#     --paketti dist/dioraama/olavinlinna --tila keittio --ulos <kansio> [--renderoi] [--leivo] [--naytteet 128]
import bpy, json, math, os, sys
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
def arg(nimi, oletus=None):
    return argv[argv.index(nimi) + 1] if nimi in argv else oletus
PAKETTI = arg('--paketti', 'dist/dioraama/olavinlinna')
TILA = arg('--tila', 'keittio')
ULOS = arg('--ulos', '/tmp/leivo')
NAYTTEET = int(arg('--naytteet', '128'))
RESO = int(arg('--reso', '2048'))
os.makedirs(ULOS, exist_ok=True)

rak = json.load(open(os.path.join(PAKETTI, 'rakennus.json')))
tila = next(t for t in rak['tilat'] if t['id'] == TILA)

def bl(p):  # glTF (x, y ylös, z etelä) → Blender (x, y = −z, z ylös)
    return (p[0], -p[2], p[1])

# --- Näyttämö tyhjäksi ja Cycles GPU:lle (Metal) ---
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
    sc.cycles.device = 'GPU'
except Exception as e:  # CPU varalla
    print('LEIVO: GPU ei käytössä:', e)
sc.cycles.samples = NAYTTEET
sc.view_settings.view_transform = 'AgX'
sc.view_settings.look = 'AgX - Medium High Contrast' if 'AgX - Medium High Contrast' in [l.name for l in bpy.types.ColorManagedViewSettings.bl_rna.properties['look'].enum_items] else 'None'

# --- Tuonti: oma tila + massa varjostajaksi (massa vain renderöintiin, ei leivota) ---
def tuo(polku):
    ennen = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=polku)
    return [o for o in bpy.data.objects if o not in ennen]
tilan = tuo(os.path.join(PAKETTI, 'tilat', f'{TILA}.glb'))
# Irtoesineet (voudin sinetti 29.9.: arkun kansi, sormus) vain esikuviin: ne liikkuvat natiivissa, joten niitä ei leivota.
esineet = []
if '--leivo' not in argv:
    for e_ in json.load(open(os.path.join(PAKETTI, 'rakennus.json')))['tilat']:
        if e_['id'] == TILA:
            for x in e_.get('esineet', []):
                if x.get('tiedosto'): esineet += tuo(os.path.join(PAKETTI, x['tiedosto']))
KUORI = arg('--kuori')
if KUORI:
    # Uusi tapa: fotogrammetriakuori ympäristöksi (varjostaa ja heijastaa valoa), ei proseduraalista massaa.
    massa = tuo(KUORI)
    if '--renderoi' in argv or '--leikkaa' in argv:
        # Leikkausikkuna (speksi kohta 3) samoin kuin Unityn DioraamaUlkokuori.PaivitaLeikkaus: laatikko = leikkaus.min/max
        # (tai rajat) + laajennus (oletus 1 m; alas enintään 0,2 m), käytävä kameraan vain kun kameraan ≠ false.
        # Ilman leikkaus-kenttää vanha tapa (rajat + 1 m, ylös +30 m), jotta aiemmat leivonnat pysyvät toistettavina.
        import bmesh
        lk = tila.get('leikkaus') or {}
        r = lk if lk.get('min') else tila['rajat']; mn = Vector(bl(r['min'])); mx = Vector(bl(r['max']))
        la = float(lk.get('laajennus', 1.0)); ylos = 0 if lk.get('min') else 30
        lo = Vector((min(mn.x, mx.x) - la, min(mn.y, mx.y) - la, min(mn.z, mx.z) - (min(la, 0.2) if lk.get('min') else la)))
        hi = Vector((max(mn.x, mx.x) + la, max(mn.y, mx.y) + la, max(mn.z, mx.z) + la))
        kameraan = lk.get('kameraan', True)
        kes = (lo + hi) / 2; puoli = max(hi.x - lo.x, hi.y - lo.y) / 2
        k_ = tila['kamera']; az_ = math.radians(k_['atsimuutti'])
        suunta2 = Vector((math.sin(az_), math.cos(az_)))  # kameran suunta kohteesta (Blender x itä, y pohjoinen)
        for o in massa:
            if o.type != 'MESH': continue
            bm = bmesh.new(); bm.from_mesh(o.data); pois = []
            for f in bm.faces:
                c = o.matrix_world @ f.calc_center_median()
                if lo.x <= c.x <= hi.x and lo.y <= c.y <= hi.y and lo.z <= c.z <= hi.z + ylos:
                    pois.append(f); continue
                if not kameraan: continue
                d2 = Vector((c.x - kes.x, c.y - kes.y)); pitkin = d2.dot(suunta2)
                sivuun = abs(d2.x * suunta2.y - d2.y * suunta2.x)
                if 0 < pitkin < k_['etaisyys'] + 5 and sivuun < puoli and c.z > lo.z:
                    pois.append(f)
            bmesh.ops.delete(bm, geom=pois, context='FACES'); bm.to_mesh(o.data); bm.free()
else:
    massa = tuo(os.path.join(PAKETTI, 'tilat', 'massa.glb')) if TILA != 'massa' else []
    for n in tila.get('naapurit', []):
        if n not in ('massa', TILA):
            massa += tuo(os.path.join(PAKETTI, 'tilat', f'{n}.glb'))

# --- PBR-materiaalit pinnan nimen mukaan (proseduraaliset) ---
def solmu(nt, tyyppi, x=0, y=0):
    n = nt.nodes.new(tyyppi); n.location = (x, y); return n

PH = arg('--tekstuurit', '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven')
# Pinta → Poly Haven -tekstuuri (CC0, manifest.json samassa kansiossa) ja tekstuurin koko metreinä.
TEKSTUURIT = {
    'kivi': ('rustic_stone_wall', 2.5), 'leikkaus': ('stacked_stone_wall', 2.0),
    'rappaus': ('plastered_stone_wall', 2.5), 'kivilattia': ('slate_floor_02', 1.5),
    'lankku': ('rough_wood', 1.5), 'puu': ('wood_table_worn', 1.2), 'kallio': ('rock_face', 6.0),
    'metalli': ('rusty_metal_02', 1.0), 'rauta': ('rusty_metal_02', 1.0), 'kangas': ('hessian_230', 0.6),
    'tiili': ('medieval_red_brick', 2.0), 'katto': ('roof_slates_02', 2.0),
}

def pbr_kuva(nimi, tid, koko, metalli=0.0):
    m = bpy.data.materials.new(nimi + '_pbr'); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    ulos = solmu(nt, 'ShaderNodeOutputMaterial', 900, 0)
    b = solmu(nt, 'ShaderNodeBsdfPrincipled', 600, 0)
    nt.links.new(b.outputs['BSDF'], ulos.inputs['Surface'])
    b.inputs['Metallic'].default_value = metalli
    koord = solmu(nt, 'ShaderNodeTexCoord', -1100, 0)
    mapp = solmu(nt, 'ShaderNodeMapping', -900, 0)
    mapp.inputs['Scale'].default_value = (1 / koko, 1 / koko, 1 / koko)
    nt.links.new(koord.outputs['Object'], mapp.inputs['Vector'])
    def kuva(kartta, y, vari):
        t = solmu(nt, 'ShaderNodeTexImage', -600, y)
        t.image = bpy.data.images.load(os.path.join(PH, tid, f'{tid}_{kartta}_2k.jpg'), check_existing=True)
        t.image.colorspace_settings.name = 'sRGB' if vari else 'Non-Color'
        t.projection = 'BOX'; t.projection_blend = 0.25
        nt.links.new(mapp.outputs['Vector'], t.inputs['Vector'])
        return t
    nt.links.new(kuva('diff', 300, True).outputs['Color'], b.inputs['Base Color'])
    nt.links.new(kuva('rough', 0, False).outputs['Color'], b.inputs['Roughness'])
    nm = solmu(nt, 'ShaderNodeNormalMap', 300, -300)
    nt.links.new(kuva('nor', -300, False).outputs['Color'], nm.inputs['Color'])
    nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])
    return m

def pbr(nimi, vari, karheus=0.8, metalli=0.0, kuvio='kohina', mittakaava=4.0, kumpu=0.15, vaihtelu=0.25, hehku=0.0):
    m = bpy.data.materials.new(nimi + '_pbr'); m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    ulos = solmu(nt, 'ShaderNodeOutputMaterial', 900, 0)
    b = solmu(nt, 'ShaderNodeBsdfPrincipled', 600, 0)
    nt.links.new(b.outputs['BSDF'], ulos.inputs['Surface'])
    b.inputs['Roughness'].default_value = karheus
    b.inputs['Metallic'].default_value = metalli
    koord = solmu(nt, 'ShaderNodeTexCoord', -900, 0)
    if kuvio == 'kivi':
        t = solmu(nt, 'ShaderNodeTexVoronoi', -600, 0); t.inputs['Scale'].default_value = mittakaava
        t.feature = 'DISTANCE_TO_EDGE'
        nt.links.new(koord.outputs['Object'], t.inputs['Vector'])
        arvo = t.outputs['Distance']
    elif kuvio == 'puu':
        t = solmu(nt, 'ShaderNodeTexWave', -600, 0); t.inputs['Scale'].default_value = mittakaava
        t.inputs['Distortion'].default_value = 6; t.inputs['Detail'].default_value = 4
        nt.links.new(koord.outputs['Object'], t.inputs['Vector'])
        arvo = t.outputs['Fac']
    else:
        t = solmu(nt, 'ShaderNodeTexNoise', -600, 0); t.inputs['Scale'].default_value = mittakaava
        t.inputs['Detail'].default_value = 8
        nt.links.new(koord.outputs['Object'], t.inputs['Vector'])
        arvo = t.outputs['Fac']
    ramppi = solmu(nt, 'ShaderNodeValToRGB', -300, 150)
    r, g, bb = vari
    ramppi.color_ramp.elements[0].color = (r * (1 - vaihtelu), g * (1 - vaihtelu), bb * (1 - vaihtelu), 1)
    ramppi.color_ramp.elements[1].color = (min(1, r * (1 + vaihtelu)), min(1, g * (1 + vaihtelu)), min(1, bb * (1 + vaihtelu)), 1)
    nt.links.new(arvo, ramppi.inputs['Fac'])
    nt.links.new(ramppi.outputs['Color'], b.inputs['Base Color'])
    kb = solmu(nt, 'ShaderNodeBump', 300, -250); kb.inputs['Strength'].default_value = kumpu
    nt.links.new(arvo, kb.inputs['Height'])
    nt.links.new(kb.outputs['Normal'], b.inputs['Normal'])
    if hehku > 0:
        # Hiillos: tuhkan seassa hehkuvia pisteitä (tasainen hehku paloi AgX:ssä valkoiseksi laataksi).
        hk = solmu(nt, 'ShaderNodeTexNoise', -600, -400); hk.inputs['Scale'].default_value = mittakaava * 1.5
        hk.inputs['Detail'].default_value = 6; nt.links.new(koord.outputs['Object'], hk.inputs['Vector'])
        hr = solmu(nt, 'ShaderNodeValToRGB', -300, -400)
        hr.color_ramp.elements[0].position = 0.56; hr.color_ramp.elements[0].color = (0, 0, 0, 1)
        hr.color_ramp.elements[1].position = 0.8; hr.color_ramp.elements[1].color = (1.0, 0.16, 0.02, 1)
        nt.links.new(hk.outputs['Fac'], hr.inputs['Fac']); nt.links.new(hr.outputs['Color'], b.inputs['Emission Color'])
        b.inputs['Emission Strength'].default_value = hehku
    return m

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)

MATERIAALIT = {
    'kivi': dict(vari=srgb('#8f8577'), kuvio='kivi', mittakaava=2.2, kumpu=0.35, karheus=0.9),
    'leikkaus': dict(vari=srgb('#a99d8a'), kuvio='kivi', mittakaava=3.0, kumpu=0.3, karheus=0.9),
    'kivilattia': dict(vari=srgb('#7c7266'), kuvio='kivi', mittakaava=1.8, kumpu=0.25, karheus=0.85),
    'rappaus': dict(vari=srgb('#cdbfa6'), kuvio='kohina', mittakaava=6, kumpu=0.08, karheus=0.95, vaihtelu=0.12),
    'lankku': dict(vari=srgb('#6e4c30'), kuvio='puu', mittakaava=3, kumpu=0.1, karheus=0.7),
    'puu': dict(vari=srgb('#5d402a'), kuvio='puu', mittakaava=5, kumpu=0.1, karheus=0.7),
    'metalli': dict(vari=srgb('#3b3836'), metalli=0.85, karheus=0.45, mittakaava=12),
    'rauta': dict(vari=srgb('#2f2c2a'), metalli=0.9, karheus=0.5, mittakaava=12),
    'kupari': dict(vari=srgb('#9a5a36'), metalli=0.95, karheus=0.35, mittakaava=10),
    'savi': dict(vari=srgb('#9a5f42'), karheus=0.9, mittakaava=10, kumpu=0.05),
    'kangas': dict(vari=srgb('#c8b995'), karheus=1.0, mittakaava=40, kumpu=0.05),
    'kulta': dict(vari=srgb('#d8a93a'), karheus=0.3, metalli=1.0, kumpu=0.0),  # voudin sinettisormus
    'olki': dict(vari=srgb('#c9b27a'), kuvio='puu', mittakaava=30, karheus=1.0),
    'nahka': dict(vari=srgb('#5a3a26'), karheus=0.7, mittakaava=20),
    'leipa': dict(vari=srgb('#b07a3e'), karheus=0.8, mittakaava=15),
    'kala': dict(vari=srgb('#9a9a8e'), karheus=0.4, mittakaava=20),
    'vihannes': dict(vari=srgb('#b98a4a'), karheus=0.6, mittakaava=15),
    'vaha': dict(vari=srgb('#e8dcc0'), karheus=0.5, mittakaava=10),
    'hiillos': dict(vari=srgb('#2a2522'), karheus=1.0, hehku=2.5, mittakaava=8, vaihtelu=0.4),
    'katto': dict(vari=srgb('#5c5652'), kuvio='kivi', mittakaava=4, kumpu=0.2),
    'tiili': dict(vari=srgb('#8c5a45'), kuvio='kivi', mittakaava=6, kumpu=0.2),
    'kallio': dict(vari=srgb('#6d6458'), kuvio='kivi', mittakaava=0.6, kumpu=0.5),
    'vesi': dict(vari=srgb('#2c3d44'), karheus=0.15, mittakaava=2, kumpu=0.02),
}
valmiit = {}
for o in tilan + esineet + ([] if KUORI else massa):
    if o.type != 'MESH':
        continue
    for s in o.material_slots:
        if not s.material:
            continue
        perus = s.material.name.split('.')[0]
        if perus not in valmiit:
            if perus in TEKSTUURIT and os.path.isdir(os.path.join(PH, TEKSTUURIT[perus][0])):
                tid, koko = TEKSTUURIT[perus]
                valmiit[perus] = pbr_kuva(perus, tid, koko, metalli=0.8 if perus in ('metalli', 'rauta') else 0.0)
            else:
                # Tuntematon pinta (esim. aitan 'vaate', sinetin 'kulta'): väri rakennus.json:n pinnat-pankista.
                valmiit[perus] = pbr(perus, **MATERIAALIT.get(perus, dict(vari=srgb(rak.get('pinnat', {}).get(perus, {}).get('vari', '#8a8580')))))
        s.material = valmiit[perus]

# --- Maailma: tumma taivas (omistajan linjaus: tumma yleisvalo) + aurinko valaistus.json:sta ---
maailma = bpy.data.worlds.new('taivas'); sc.world = maailma; maailma.use_nodes = True
tausta = maailma.node_tree.nodes['Background']
v = rak.get('valaistus', {})
tausta.inputs['Color'].default_value = (*srgb(v.get('taivas', {}).get('yla', '#8fa3bc')), 1)
tausta.inputs['Strength'].default_value = 0.3
a = v.get('aurinko', {})
HAMARA = '--hamara' in argv  # iltahämärä (tunnelma 29.9.): matala oranssi aurinko, tumma sininen taivas, soihdut päävalona
if HAMARA:
    tausta.inputs['Color'].default_value = (*srgb('#34466e'), 1); tausta.inputs['Strength'].default_value = 0.45
    a = dict(a, voima=0.3, vari='#ff9a5c', korkeus=4)
aur = bpy.data.lights.new('aurinko', 'SUN'); aur.energy = 2.2 * a.get('voima', 1.5)
aur.color = srgb(a.get('vari', '#ffd29a')); aur.angle = math.radians(1.5)
ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
atz, kor = math.radians(a.get('atsimuutti', 225)), math.radians(a.get('korkeus', 36))
# Valo tulee atsimuutin suunnasta: suunta auringosta alas = −(sin a·cos k, cos a·cos k [pohjoinen = +y], sin k)
suunta = (-math.sin(atz) * math.cos(kor), -math.cos(atz) * math.cos(kor), -math.sin(kor))
from mathutils import Vector
ao.rotation_euler = Vector(suunta).to_track_quat('-Z', 'Y').to_euler()

# --- Tilan valot rakennus.json:sta (tulisija, rekvisiitan kynttilät, keilat) ---
for i, lv in enumerate(tila.get('valot', [])):
    if lv.get('tyyppi') == 'keila':
        if HAMARA:
            continue  # iltahämärässä ikkunasta ei tule päivänvaloa
        d = bpy.data.lights.new(f'keila{i}', 'SPOT'); d.spot_size = math.radians(lv.get('kulma', 30) * 2)
        d.energy = 60.0 * lv.get('voima', 100) / 100; d.color = srgb(lv.get('vari', '#ffd8a0'))
        o = bpy.data.objects.new(f'keila{i}', d); sc.collection.objects.link(o); o.location = bl(lv['paikka'])
        kohti = Vector(bl(lv['kohti'])) - Vector(bl(lv['paikka']))
        o.rotation_euler = kohti.to_track_quat('-Z', 'Y').to_euler()
        continue
    d = bpy.data.lights.new(f'valo{i}', 'POINT')
    rekvisiitta = lv.get('lahde') == 'rekvisiitta'
    d.energy = (25.0 if rekvisiitta else 260.0) * lv.get('voima', 1.0)
    d.color = srgb(lv.get('vari', '#ffb070')); d.shadow_soft_size = 0.05 if rekvisiitta else 0.35
    o = bpy.data.objects.new(f'valo{i}', d); sc.collection.objects.link(o)
    p = list(lv['paikka'])
    # Tulisijan valo on datassa hiilloksen korkeudella (lämmön leivontaa varten); Cyclesissä se nostetaan liekin
    # keskelle ja hieman huoneeseen päin, jottei tulisijan kivirunko varjosta sitä kokonaan.
    if not rekvisiitta and lv.get('lepatus', 0) >= 0.3:
        p[1] += 0.9
    o.location = bl(p)

# --- Kamera tilan kamera-asennosta (sama kaava kuin speksin asentoSijainti) ---
k = tila.get('kamera') or dict(rak.get('yleiskamera', {}).get('vaaka', {}), **{})
kk, ka = math.radians(k['korkeus']), math.radians(k['atsimuutti'])
kohde = k['kohde']
sij = (kohde[0] + k['etaisyys'] * math.cos(kk) * math.sin(ka), kohde[1] + k['etaisyys'] * math.sin(kk),
       kohde[2] - k['etaisyys'] * math.cos(kk) * math.cos(ka))
kd = bpy.data.cameras.new('kamera'); kd.sensor_fit = 'VERTICAL'; kd.angle_y = math.radians(k.get('fov', 38))
kd.dof.use_dof = True; kd.dof.focus_distance = k['etaisyys']; kd.dof.aperture_fstop = 2.8
ko = bpy.data.objects.new('kamera', kd); sc.collection.objects.link(ko); sc.camera = ko
ko.location = bl(sij)
ko.rotation_euler = (Vector(bl(kohde)) - Vector(bl(sij))).to_track_quat('-Z', 'Y').to_euler()

# Luonnoskuvat (elävän linnan käsikirjoitus 29.9.): hahmot paikoilleen ja kamera huoneen sisälle.
if '--hahmot' in argv:
    for h in tila.get('hahmot', []):
        polku = os.path.join(PAKETTI, 'hahmot3d', f"{h.get('henkilo', h['id'])}.glb")
        if not os.path.exists(polku):
            continue
        for o in tuo(polku):
            if o.parent is None:
                kierto = math.radians(180 - h.get('suunta', 0)); alku = o.location.copy(); alku.rotate(__import__('mathutils').Euler((0, 0, kierto)))
                o.location = Vector(bl(h['paikka'])) + alku; o.rotation_euler = (0, 0, kierto)  # juuri (lantio) jää korkeudelleen
    # Hahmojen pinnat nimen mukaan (verteksiväri ei kulje Cyclesiin luonnoksessa).
    HAHMOVARIT = {'iho': '#c9a07e', 'vaate2': '#4a3a2c', 'vaate': '#7a5c3e', 'esiliina': '#d8cfbd', 'hiukset': '#3a2a1e',
                  'kengat': '#2e241c', 'esine-metalli': '#8a8580', 'esine-puu': '#6b4a2e'}
    for m in bpy.data.materials:
        perus = m.name.split('.')[0]
        if perus in HAHMOVARIT and m.use_nodes and 'Principled BSDF' in m.node_tree.nodes:
            b = m.node_tree.nodes['Principled BSDF']
            for l_ in list(b.inputs['Base Color'].links): m.node_tree.links.remove(l_)
            b.inputs['Base Color'].default_value = (*srgb(HAHMOVARIT[perus]), 1); b.inputs['Roughness'].default_value = 0.8
    # Näkyvät liekit luonnokseen (Unityssä partikkelit): hehkuva kartio jokaiseen liekkiin.
    for l in tila.get('liekit', []):
        k0 = {'tulisija': 0.45, 'soihtu': 0.25}.get(l.get('liekki'), 0.05) * l.get('koko', 1)
        # Rypäs kapeita kieliä: korkeus ja väri vaihtelevat (keltainen ydin → punaoranssi reuna).
        for n_, (dx, dy, kk_, vari_) in enumerate([(0, 0, 1.0, (1, 0.5, 0.08)), (0.25, 0.1, 0.7, (1, 0.28, 0.03)),
                                                   (-0.22, 0.05, 0.75, (1, 0.22, 0.02)), (0.08, -0.2, 0.6, (1, 0.18, 0.02)),
                                                   (-0.1, 0.22, 0.55, (0.9, 0.12, 0.01))]):
            h_ = k0 * kk_
            bpy.ops.mesh.primitive_cone_add(radius1=k0 * 0.16, depth=h_, vertices=8,
                                            location=Vector(bl(l['paikka'])) + Vector((dx * k0, dy * k0, h_ * 0.5)))
            lm = bpy.data.materials.new('liekki-luonnos'); lm.use_nodes = True; nt_ = lm.node_tree; nt_.nodes.clear()
            em = nt_.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (*vari_, 1)
            em.inputs['Strength'].default_value = 1.2  # puhdas emissio: ei heijasta tulisijan valoa
            nt_.links.new(em.outputs['Emission'], nt_.nodes.new('ShaderNodeOutputMaterial').inputs['Surface'])
            bpy.context.object.data.materials.append(lm)
if '--lyhty' in argv:  # luonnos: lyhty hahmon oikeaan käteen (esim. vartija muurinharjalla)
    h = next(h for h in tila.get('hahmot', []) if h['id'] == arg('--lyhty'))
    s_ = math.radians(h.get('suunta', 0)); f_ = (math.sin(s_), -math.cos(s_)); r_ = (math.cos(s_), math.sin(s_))
    p_ = [h['paikka'][0] + 0.25 * f_[0] + 0.32 * r_[0], h['paikka'][1] + 0.78, h['paikka'][2] + 0.25 * f_[1] + 0.32 * r_[1]]
    bpy.ops.mesh.primitive_cube_add(size=0.16, location=bl(p_)); lk = bpy.context.object
    km = bpy.data.materials.new('lyhty-luonnos'); km.use_nodes = True; nt_ = km.node_tree; nt_.nodes.clear()
    em = nt_.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (1, 0.55, 0.15, 1); em.inputs['Strength'].default_value = 3
    nt_.links.new(em.outputs['Emission'], nt_.nodes.new('ShaderNodeOutputMaterial').inputs['Surface']); lk.data.materials.append(km)
    lv_ = bpy.data.lights.new('lyhtyvalo', 'POINT'); lv_.energy = 60; lv_.color = srgb('#ffb060'); lv_.shadow_soft_size = 0.05
    lo_ = bpy.data.objects.new('lyhtyvalo', lv_); sc.collection.objects.link(lo_); lo_.location = Vector(bl(p_)) + Vector((0, 0, 0.02))
if '--luonnos' in argv:  # luonnoskuva: Standard-näyttömuunnos, jotta liekkien värit säilyvät (AgX latisti ne)
    sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'; sc.view_settings.exposure = 0.4
if '--kamera' in argv:  # --kamera x,y,z,kx,ky,kz (glTF): silmä ja katsekohde
    c_ = [float(x) for x in arg('--kamera').split(',')]
    ko.location = bl(c_[:3]); ko.rotation_euler = (Vector(bl(c_[3:])) - Vector(bl(c_[:3]))).to_track_quat('-Z', 'Y').to_euler()
    kd.angle_y = math.radians(55); kd.dof.focus_distance = (Vector(bl(c_[3:])) - Vector(bl(c_[:3]))).length
if '--renderoi' in argv:
    sc.render.resolution_x, sc.render.resolution_y = 1600, 900
    sc.cycles.use_denoising = True
    sc.render.filepath = os.path.join(ULOS, f'{TILA}-cycles.png')
    bpy.ops.render.render(write_still=True)
    print('LEIVO: renderöity', sc.render.filepath)

if '--leivo' in argv:
    # UV1 ("valo", lightmap-atlas) tilan omille objekteille, leivonta COMBINED yhteen kuvaan, vienti glb:nä
    # Siirtosepän sopimuksella (29.9.): kaikilla primitiiveillä TEXCOORD_1, tyhjät liekki:/valo:/ikkuna: extras-kentin.
    kuva = bpy.data.images.new(f'{TILA}_valo', RESO, RESO, float_buffer=True)
    omat = [o for o in tilan if o.type == 'MESH']
    # Alaspäin osoittavat pinnat (laattojen, kalusteiden pohjat) eivät näy dioraaman kameroista, mutta veisivät
    # atlaksesta tilaa ja leipoutuisivat mustiksi: pois ennen UV-levitystä.
    import bmesh
    for o in omat:
        bm = bmesh.new(); bm.from_mesh(o.data)
        pois = [f for f in bm.faces if f.normal.z < -0.7]
        bmesh.ops.delete(bm, geom=pois, context='FACES'); bm.to_mesh(o.data); bm.free()
    for o in omat:
        o.data.uv_layers.new(name='valo')
        o.data.uv_layers.active = o.data.uv_layers['valo']
    bpy.ops.object.select_all(action='DESELECT')
    for o in omat: o.select_set(True)
    bpy.context.view_layer.objects.active = omat[0]
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(66), island_margin=0.003)
    # Tasainen tekselitiheys ja tiivis pakkaus (smart_project jätti atlaksesta suurimman osan tyhjäksi).
    bpy.ops.uv.select_all(action='SELECT')
    bpy.ops.uv.average_islands_scale()
    bpy.ops.uv.pack_islands(rotate=True, margin=0.002, shape_method='CONCAVE')
    bpy.ops.object.mode_set(mode='OBJECT')
    kaytetyt = {s.material for o in omat for s in o.material_slots if s.material}
    for m in kaytetyt:
        n = m.node_tree.nodes.new('ShaderNodeTexImage'); n.image = kuva
        uvn = m.node_tree.nodes.new('ShaderNodeUVMap'); uvn.uv_map = 'valo'
        m.node_tree.links.new(uvn.outputs['UV'], n.inputs['Vector'])
        m.node_tree.nodes.active = n
    sc.cycles.samples = NAYTTEET
    sc.render.bake.margin = 6
    t0 = __import__('time').time()
    bpy.ops.object.bake(type='COMBINED')
    print('LEIVO: leivonta', round(__import__('time').time() - t0, 1), 's')
    # Tallennus: 4k ja 2k JPEG (näyttömuunnos mukaan: AgX kuten renderissä).
    sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 90
    os.makedirs(os.path.join(ULOS, 'valot'), exist_ok=True)
    kuva.save_render(os.path.join(ULOS, 'valot', f'{TILA}.jpg'), scene=sc)
    # 2k tallennetusta 4k-kuvasta: kuva.copy() leivotusta float-puskurista oli musta (29.9. korjaus).
    k2 = bpy.data.images.load(os.path.join(ULOS, 'valot', f'{TILA}.jpg')); k2.scale(RESO // 2, RESO // 2)
    k2.filepath_raw = os.path.join(ULOS, 'valot', f'{TILA}-2k.jpg'); k2.file_format = 'JPEG'; k2.save(quality=90)
    # Vientiä varten: pinnan alkuperäinen nimi takaisin (ei kuvatekstuureja glb:hen), UV "valo" = TEXCOORD_1.
    for m in kaytetyt:
        m.name = m.name.replace('_pbr', '')
    for o in omat:
        o.data.uv_layers.active = o.data.uv_layers[0]
    # Tyhjät: liekit, valot, ikkunakeilat.
    tyhjat = []
    def tyhja(nimi, paikka, **extras):
        e = bpy.data.objects.new(nimi, None); sc.collection.objects.link(e); e.location = bl(paikka)
        for k_, v_ in extras.items(): e[k_] = v_
        tyhjat.append(e)
    # Siirtosepän sopimus: extras.koko = liekin korkeus metreinä. Lepatus enintään 8 liekille nimijärjestyksessä,
    # joten tärkeimmät ensin (tulisija, soihdut, kynttilät lähdejärjestyksessä) ja numero nollilla täytettynä.
    LIEKKIKOOT = {'tulisija': (0.45, 1.0, 1.2, 0), 'soihtu': (0.25, 0.4, 0.8, 1), 'kynttila': (0.045, 0.1, 0.4, 2)}
    liekit = sorted(tila.get('liekit', []), key=lambda l: LIEKKIKOOT.get(l.get('liekki'), (0, 0, 0, 3))[3])
    for j, l in enumerate(liekit):
        k0, savu0, kork0, _ = LIEKKIKOOT.get(l.get('liekki'), (0.3, 0.2, 1.0, 3))
        tyhja(f"liekki:{j:02d}-{l.get('liekki', 'liekki')}", l['paikka'], koko=round(k0 * l.get('koko', 1), 3),
              savu=savu0, korkeus=kork0, sade=2.5)
    # Tunnelma (Siirtosepän sopimus 29.9.): savu:NN {leveys, korkeus, voima, vari}, lokit:NN {maara, sade, korkeus}.
    for j, sv in enumerate(tila.get('savut', [])):
        tyhja(f'savu:{j:02d}', sv['paikka'], leveys=sv.get('leveys', 0.5), korkeus=sv.get('korkeus', 5.0),
              voima=sv.get('voima', 0.5), vari=sv.get('vari', '#8a8580'))
    for j, lk in enumerate(tila.get('lokit', [])):
        tyhja(f'lokit:{j:02d}', lk['paikka'], maara=lk.get('maara', 5), sade=lk.get('sade', 10.0), korkeus=lk.get('korkeus', 5.0))
    for j, lv in enumerate(tila.get('valot', [])):
        if lv.get('tyyppi') == 'keila':
            # Siirtosepän sopimus (f5938d7c): keila kulkee tyhjän Blender-Z:n suuntaan huoneeseen; leveys = X, korkeus = Y.
            tyhja(f'ikkuna:{j}', lv['paikka'], leveys=0.9, korkeus=1.3, pituus=5.0, levenema=0.3,
                  voima=0.25, vari=lv.get('vari', '#fff0d8'), poly=1.0)
            suunta = Vector(bl(lv['kohti'])) - Vector(bl(lv['paikka']))
            tyhjat[-1].rotation_euler = suunta.to_track_quat('Z', 'Y').to_euler()
        else:
            tyhja(f'valo:{j}', lv['paikka'], sade=min(4.0, lv.get('sade', 4)), voima=lv.get('voima', 1),
                  vari=lv.get('vari', '#ffc26a'), lepatus=lv.get('lepatus', 0.0))
    bpy.ops.object.select_all(action='DESELECT')
    # Liput (Siirtosepän sopimus 29.9.): UV0.u = 0 tangon kohdalla → 1 kärjessä heilumisvarjostinta varten. Lippu
    # osoittaa +x:ään (tunnelma.js suunta 90); u = (x − saaren min x) / saaren leveys.
    for o in omat:
        li = [i for i, s_ in enumerate(o.material_slots) if s_.material and 'lippu' in s_.material.name]
        if not li:
            continue
        bm = bmesh.new(); bm.from_mesh(o.data); uv0 = bm.loops.layers.uv[0]; bm.faces.ensure_lookup_table()
        jaljella = {f for f in bm.faces if f.material_index in li}
        while jaljella:
            saari, pino = set(), [jaljella.pop()]
            while pino:
                f = pino.pop(); saari.add(f)
                for e_ in f.edges:
                    for g_ in e_.link_faces:
                        if g_ in jaljella: jaljella.discard(g_); pino.append(g_)
            xs = [v_.co.x for f in saari for v_ in f.verts]; x0, x1 = min(xs), max(xs)
            for f in saari:
                for l_ in f.loops: l_[uv0].uv = ((l_.vert.co.x - x0) / max(x1 - x0, 1e-4), l_[uv0].uv[1])
        bm.to_mesh(o.data); bm.free()
    for o in omat + tyhjat: o.select_set(True)
    os.makedirs(os.path.join(ULOS, 'tilat'), exist_ok=True)
    bpy.ops.export_scene.gltf(filepath=os.path.join(ULOS, 'tilat', f'{TILA}.glb'), use_selection=True,
                              export_format='GLB', export_extras=True, export_texcoords=True, export_normals=True,
                              export_materials='PLACEHOLDER', export_image_format='NONE')
    print('LEIVO: vienti', os.path.join(ULOS, 'tilat', f'{TILA}.glb'), 'tyhjiä', len(tyhjat))

if '--tarkista' in argv:
    # Unityä vastaava tarkistus: viety glb (leivottu) + atlas UV1:llä emissiona, render tilan kamerasta.
    for o in list(bpy.data.objects):
        if o.type == 'MESH' and o in tilan: bpy.data.objects.remove(o)
    uudet = tuo(os.path.join(ULOS, 'tilat', f'{TILA}.glb'))
    at = bpy.data.images.load(os.path.join(ULOS, 'valot', f'{TILA}.jpg'))
    m = bpy.data.materials.new('leivottu'); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    o_ = nt.nodes.new('ShaderNodeOutputMaterial'); e = nt.nodes.new('ShaderNodeEmission')
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = at; uvn = nt.nodes.new('ShaderNodeUVMap'); uvn.uv_map = 'UVMap.001'
    nt.links.new(uvn.outputs['UV'], t.inputs['Vector']); nt.links.new(t.outputs['Color'], e.inputs['Color'])
    nt.links.new(e.outputs['Emission'], o_.inputs['Surface'])
    for o in uudet:
        if o.type == 'MESH':
            uvn.uv_map = o.data.uv_layers[1].name
            for sl in o.material_slots: sl.material = m
    sc.view_settings.view_transform = 'Standard'
    sc.render.resolution_x, sc.render.resolution_y = 1600, 900
    sc.cycles.samples = 16
    sc.render.filepath = os.path.join(ULOS, f'{TILA}-leivottu.png')
    bpy.ops.render.render(write_still=True)
    print('LEIVO: tarkistus', sc.render.filepath)
