# Olavinlinnan tavoitekuva (Linnanrakentaja 30.9.2026, omistaja: "mahdollisimman laadukas kuvallisesti").
# Cycles: hämäräilta (Nishita-taivas, aurinko horisontin alla lounaassa), Senaatin kuori (CC BY 4.0) + CC0-yksityis-
# kohtapinnat (Poly Haven) pinnan suunnan mukaan, soihdut datan liekkipisteistä, ikkunat hämärätekstuurista,
# heijastava vesi kaksikerroksisella aallokolla, bloom. Ajo: Blender -b -P tavoitekuva.py -- <ulos> [--naytteita N]
import json, math, os, sys
import bpy
from mathutils import Vector

A = sys.argv[sys.argv.index('--') + 1:]
ULOS = A[0]
N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 96
VAIN = A[A.index('--vain') + 1].split(',') if '--vain' in A else None
os.makedirs(ULOS, exist_ok=True)
K = '/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender/ulkokuori'
PH = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven'
S = os.path.dirname(os.path.abspath(__file__))

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
try:
    pr = bpy.context.preferences.addons['cycles'].preferences
    pr.compute_device_type = 'METAL'; pr.get_devices()
    for d in pr.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e:
    print('GPU:', e)
sc.cycles.samples = N
sc.cycles.use_denoising = True
sc.view_settings.view_transform = 'AgX'
sc.view_settings.look = 'AgX - Medium High Contrast'
sc.view_settings.exposure = float(os.environ.get('VALOTUS', 0.6))


def G(x, y, z):
    """glTF (y ylös, pohjoinen −z) → Blender."""
    return Vector((x, -z, y))


# --- kuori ---
bpy.ops.import_scene.gltf(filepath=f'{K}/ulkokuori_huippu.glb')
kuori = [o for o in sc.objects if o.type == 'MESH'][0]
mat = kuori.active_material
nt = mat.node_tree
bsdf = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
kuva = next(n for n in nt.nodes if n.type == 'TEX_IMAGE')
uv = kuva.inputs['Vector'].links[0].from_node if kuva.inputs['Vector'].is_linked else None
if os.environ.get('TEKSTUURI'):   # vertailukoe C: korvaava atlas (esim. tekoälyskaalattu), sama UV
    kuva.image = bpy.data.images.load(os.environ['TEKSTUURI'])
    kuva.interpolation = 'Cubic'


def kuvasolmu(polku, varitila='sRGB', box=True, mitta=0.7):
    n = nt.nodes.new('ShaderNodeTexImage')
    n.image = bpy.data.images.load(polku); n.image.colorspace_settings.name = varitila
    if box:
        n.projection = 'BOX'; n.projection_blend = 0.25
        tk = nt.nodes.new('ShaderNodeTexCoord'); kt = nt.nodes.new('ShaderNodeMapping')
        kt.inputs['Scale'].default_value = (mitta, mitta, mitta)
        nt.links.new(tk.outputs['Object'], kt.inputs['Vector']); nt.links.new(kt.outputs['Vector'], n.inputs['Vector'])
    return n


# Ikkunat: hämärätekstuurin lämmin kirkas (R − B suuri) → emissio.
ham = nt.nodes.new('ShaderNodeTexImage'); ham.image = bpy.data.images.load(f'{K}/ulkokuori-hamara-4k.jpg')
if uv: nt.links.new(uv.outputs[0], ham.inputs['Vector'])
sep = nt.nodes.new('ShaderNodeSeparateColor'); nt.links.new(ham.outputs['Color'], sep.inputs['Color'])
ero = nt.nodes.new('ShaderNodeMath'); ero.operation = 'SUBTRACT'
nt.links.new(sep.outputs[0], ero.inputs[0]); nt.links.new(sep.outputs[2], ero.inputs[1])
maski = nt.nodes.new('ShaderNodeMapRange'); maski.inputs['From Min'].default_value = 0.2; maski.inputs['From Max'].default_value = 0.35
nt.links.new(ero.outputs[0], maski.inputs['Value'])
kirkas = nt.nodes.new('ShaderNodeMapRange'); kirkas.inputs['From Min'].default_value = 0.45; kirkas.inputs['From Max'].default_value = 0.7
nt.links.new(sep.outputs[0], kirkas.inputs['Value'])      # vain kirkkaat lämpimät alueet (ikkunat), ei yksittäisiä pisteitä
maski2 = nt.nodes.new('ShaderNodeMath'); maski2.operation = 'MULTIPLY'
nt.links.new(maski.outputs['Result'], maski2.inputs[0]); nt.links.new(kirkas.outputs['Result'], maski2.inputs[1])
nt.links.new(ham.outputs['Color'], bsdf.inputs['Emission Color'])
em = nt.nodes.new('ShaderNodeMath'); em.operation = 'MULTIPLY'; em.inputs[1].default_value = float(os.environ.get('IKKUNA', 6))
nt.links.new(maski2.outputs[0], em.inputs[0]); nt.links.new(em.outputs[0], bsdf.inputs['Emission Strength'])

# Yksityiskohtapinnat (hybridin esikuva): seinä = kivimuuri, katot (vaaka + korkealla) = liuskekatto, maa = kivetys.
YKS = os.environ.get('YKSITYISKOHDAT', '1') == '1'
KIRJ = os.environ.get('KIRJASTO', '0') == '1'   # v2: sama kuin reaaliaika (maski + kirjaston materiaalit)
if YKS and KIRJ:
    KV = '/Users/Shared/Claude/proto-3d/_kirjasto/valmiit/materiaali'
    MAN = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../js/dioraama/kirjasto/lahteet.json')))
    mk = nt.nodes.new('ShaderNodeTexImage'); mk.image = bpy.data.images.load(f'{K}/hybridi/kuori-materiaali-2k.png')
    mk.image.colorspace_settings.name = 'Non-Color'
    if uv: nt.links.new(uv.outputs[0], mk.inputs['Vector'])
    mks = nt.nodes.new('ShaderNodeSeparateColor'); nt.links.new(mk.outputs['Color'], mks.inputs[0])
    painot = [mks.outputs[0], mks.outputs[1], mks.outputs[2], mk.outputs['Alpha']]
    idt = ['graniittilohkomuuri', 'paanukatto', 'kivilaatta', 'kallio']
    vari_s, nor_s = None, None
    for w_, i_ in zip(painot, idt):
        mitta = 1.0 / MAN[f'materiaali/{i_}']['toisto_m']
        d = kuvasolmu(f'{KV}/{i_}/{i_}_diff.jpg', mitta=mitta); nn = kuvasolmu(f'{KV}/{i_}/{i_}_nor_gl.jpg', 'Non-Color', mitta=mitta)
        for kanava, lahde in (('v', d.outputs['Color']), ('n', nn.outputs['Color'])):
            kerto = nt.nodes.new('ShaderNodeMix'); kerto.data_type = 'RGBA'; kerto.blend_type = 'MULTIPLY'
            kerto.inputs[0].default_value = 1.0
            cc = nt.nodes.new('ShaderNodeCombineColor')
            for j in range(3): nt.links.new(w_, cc.inputs[j])
            nt.links.new(lahde, kerto.inputs[6]); nt.links.new(cc.outputs[0], kerto.inputs[7])
            if kanava == 'v':
                if vari_s is None: vari_s = kerto.outputs[2]
                else:
                    ad = nt.nodes.new('ShaderNodeMix'); ad.data_type = 'RGBA'; ad.blend_type = 'ADD'; ad.inputs[0].default_value = 1
                    nt.links.new(vari_s, ad.inputs[6]); nt.links.new(kerto.outputs[2], ad.inputs[7]); vari_s = ad.outputs[2]
            else:
                if nor_s is None: nor_s = kerto.outputs[2]
                else:
                    ad = nt.nodes.new('ShaderNodeMix'); ad.data_type = 'RGBA'; ad.blend_type = 'ADD'; ad.inputs[0].default_value = 1
                    nt.links.new(nor_s, ad.inputs[6]); nt.links.new(kerto.outputs[2], ad.inputs[7]); nor_s = ad.outputs[2]
    bw = nt.nodes.new('ShaderNodeRGBToBW'); nt.links.new(vari_s, bw.inputs[0])
    kerroin = nt.nodes.new('ShaderNodeMapRange'); kerroin.inputs['From Max'].default_value = 0.7
    kerroin.inputs['To Min'].default_value = 0.45; kerroin.inputs['To Max'].default_value = 1.55
    nt.links.new(bw.outputs[0], kerroin.inputs['Value'])
    kerro = nt.nodes.new('ShaderNodeMix'); kerro.data_type = 'RGBA'; kerro.blend_type = 'MULTIPLY'
    kerro.inputs[0].default_value = float(os.environ.get('YKS_VOIMA', 0.8))
    nt.links.new(kuva.outputs['Color'], kerro.inputs[6])
    yh = nt.nodes.new('ShaderNodeCombineColor')
    for j in range(3): nt.links.new(kerroin.outputs['Result'], yh.inputs[j])
    nt.links.new(yh.outputs[0], kerro.inputs[7]); nt.links.new(kerro.outputs[2], bsdf.inputs['Base Color'])
    nk = nt.nodes.new('ShaderNodeNormalMap'); nk.inputs['Strength'].default_value = 0.7
    nt.links.new(nor_s, nk.inputs['Color']); nt.links.new(nk.outputs[0], bsdf.inputs['Normal'])
elif YKS:
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    sepn = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(geo.outputs['Normal'], sepn.inputs[0])
    absz = nt.nodes.new('ShaderNodeMath'); absz.operation = 'ABSOLUTE'; nt.links.new(sepn.outputs[2], absz.inputs[0])
    vaaka = nt.nodes.new('ShaderNodeMapRange'); vaaka.inputs['From Min'].default_value = 0.55; vaaka.inputs['From Max'].default_value = 0.8
    nt.links.new(absz.outputs[0], vaaka.inputs['Value'])
    sepp = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(geo.outputs['Position'], sepp.inputs[0])
    korkea = nt.nodes.new('ShaderNodeMapRange'); korkea.inputs['From Min'].default_value = 3.0; korkea.inputs['From Max'].default_value = 5.0
    nt.links.new(sepp.outputs[2], korkea.inputs['Value'])
    seina = kuvasolmu(f'{PH}/stacked_stone_wall/stacked_stone_wall_diff_2k.jpg', mitta=0.45)
    katto = kuvasolmu(f'{PH}/roof_slates_02/roof_slates_02_diff_2k.jpg', mitta=0.9)
    maa = kuvasolmu(f'{PH}/slate_floor_02/slate_floor_02_diff_2k.jpg', mitta=0.6)
    s_n = kuvasolmu(f'{PH}/stacked_stone_wall/stacked_stone_wall_nor_2k.jpg', 'Non-Color', mitta=0.45)
    k_n = kuvasolmu(f'{PH}/roof_slates_02/roof_slates_02_nor_2k.jpg', 'Non-Color', mitta=0.9)
    m_n = kuvasolmu(f'{PH}/slate_floor_02/slate_floor_02_nor_2k.jpg', 'Non-Color', mitta=0.6)

    def sekoita(a, b, f, tyyppi='RGBA'):
        m = nt.nodes.new('ShaderNodeMix'); m.data_type = tyyppi
        nt.links.new(f, m.inputs[0])
        nt.links.new(a, m.inputs[6]); nt.links.new(b, m.inputs[7])
        return m.outputs[2]

    vaakapinta = sekoita(maa.outputs['Color'], katto.outputs['Color'], korkea.outputs['Result'])
    yks = sekoita(seina.outputs['Color'], vaakapinta, vaaka.outputs['Result'])
    vaaka_n = sekoita(m_n.outputs['Color'], k_n.outputs['Color'], korkea.outputs['Result'])
    yks_n = sekoita(s_n.outputs['Color'], vaaka_n, vaaka.outputs['Result'])
    # Valokuvan väri × yksityiskohdan kirkkausvaihtelu (keskiarvo ~0,35 → kerroin ~0,55–1,45).
    bw = nt.nodes.new('ShaderNodeRGBToBW'); nt.links.new(yks, bw.inputs[0])
    kerroin = nt.nodes.new('ShaderNodeMapRange'); kerroin.inputs['From Min'].default_value = 0.0
    kerroin.inputs['From Max'].default_value = 0.7; kerroin.inputs['To Min'].default_value = 0.45; kerroin.inputs['To Max'].default_value = 1.55
    nt.links.new(bw.outputs[0], kerroin.inputs['Value'])
    kerro = nt.nodes.new('ShaderNodeMix'); kerro.data_type = 'RGBA'; kerro.blend_type = 'MULTIPLY'
    kerro.inputs[0].default_value = float(os.environ.get('YKS_VOIMA', 0.8))
    nt.links.new(kuva.outputs['Color'], kerro.inputs[6])
    yhd = nt.nodes.new('ShaderNodeCombineColor')
    for i in range(3): nt.links.new(kerroin.outputs['Result'], yhd.inputs[i])
    nt.links.new(yhd.outputs[0], kerro.inputs[7])
    nt.links.new(kerro.outputs[2], bsdf.inputs['Base Color'])
    nk = nt.nodes.new('ShaderNodeNormalMap'); nk.inputs['Strength'].default_value = 0.7
    nt.links.new(yks_n, nk.inputs['Color']); nt.links.new(nk.outputs[0], bsdf.inputs['Normal'])
bsdf.inputs['Roughness'].default_value = 0.85
bsdf.inputs['Specular IOR Level'].default_value = 0.3

# --- vesi ---
bpy.ops.mesh.primitive_plane_add(size=3000, location=G(0, -7, 0))
vesi = bpy.context.object
vm = bpy.data.materials.new('vesi'); vm.use_nodes = True; vesi.data.materials.append(vm)
vt = vm.node_tree; vb = vt.nodes['Principled BSDF']
vb.inputs['Base Color'].default_value = (0.006, 0.012, 0.014, 1)
vb.inputs['Roughness'].default_value = 0.04
vb.inputs['IOR'].default_value = 1.33
tk = vt.nodes.new('ShaderNodeTexCoord')
aal = []
for mitta, voima in ((0.06, 0.35), (0.35, 0.12)):   # iso maininki + pieni väre
    kt = vt.nodes.new('ShaderNodeMapping'); kt.inputs['Scale'].default_value = (mitta, mitta * 2.5, mitta)
    vt.links.new(tk.outputs['Object'], kt.inputs['Vector'])
    ko = vt.nodes.new('ShaderNodeTexNoise'); ko.inputs['Scale'].default_value = 1.0; ko.inputs['Detail'].default_value = 3
    vt.links.new(kt.outputs['Vector'], ko.inputs['Vector'])
    bu = vt.nodes.new('ShaderNodeBump'); bu.inputs['Strength'].default_value = voima; bu.inputs['Distance'].default_value = 0.2
    vt.links.new(ko.outputs['Fac'], bu.inputs['Height'])
    if aal: vt.links.new(aal[-1].outputs['Normal'], bu.inputs['Normal'])
    aal.append(bu)
vt.links.new(aal[-1].outputs['Normal'], vb.inputs['Normal'])

# --- taivas: Nishita, aurinko juuri laskenut lounaaseen ---
w = bpy.data.worlds.new('hamara'); w.use_nodes = True; sc.world = w
st = w.node_tree.nodes.new('ShaderNodeTexSky'); st.sky_type = 'MULTIPLE_SCATTERING'
try:
    st.sun_elevation = math.radians(float(os.environ.get('AURINKO', -1.5)))
    st.sun_rotation = math.radians(225 - 90)
    st.air_density = 1.2
    if hasattr(st, 'aerosol_density'): st.aerosol_density = 2.5
except Exception as e:
    print('taivas:', e)
bg = w.node_tree.nodes['Background']; bg.inputs['Strength'].default_value = float(os.environ.get('TAIVAS', 0.9))
w.node_tree.links.new(st.outputs['Color'], bg.inputs['Color'])

# --- soihdut: ulkoiset liekkipisteet datasta (tunnelma, laituri, muurinharja) ---
L = json.load(open(os.environ.get('LIEKIT', f'{S}/liekit.json')))   # rakennus.json:n tilat[].liekit (tila, laji, paikka)
for tila, laji, (x, y, z) in L:
    if tila not in ('tunnelma', 'laituri', 'muurinharja') or laji != 'soihtu':
        continue
    d = bpy.data.lights.new('soihtu', 'POINT'); d.energy = float(os.environ.get('SOIHTU_W', 700)); d.color = (1.0, 0.55, 0.22)
    d.shadow_soft_size = 0.15
    o = bpy.data.objects.new('soihtu', d); sc.collection.objects.link(o); o.location = G(x, y + 0.15, z)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.22, location=G(x, y + 0.15, z))
    pl = bpy.context.object; pm = bpy.data.materials.new('liekki'); pm.use_nodes = True
    pb = pm.node_tree.nodes['Principled BSDF']; pb.inputs['Emission Color'].default_value = (1, 0.5, 0.15, 1)
    pb.inputs['Emission Strength'].default_value = 40; pl.data.materials.append(pm)

# --- jälkikäsittely: bloom (Blender 5: kompositorin solmuryhmä) ---
try:
    ng = bpy.data.node_groups.new('komp', 'CompositorNodeTree')
    sc.compositing_node_group = ng
    ng.interface.new_socket('Image', in_out='OUTPUT', socket_type='NodeSocketColor')
    rl = ng.nodes.new('CompositorNodeRLayers'); ulos = ng.nodes.new('NodeGroupOutput')
    gl = ng.nodes.new('CompositorNodeGlare')
    for k, v in (('glare_type', 'BLOOM'), ('threshold', 0.8), ('size', 7)):
        try: setattr(gl, k, v)
        except Exception: pass
    for nimi, v in (('Threshold', 0.8), ('Size', 0.6), ('Strength', 0.6)):
        if nimi in gl.inputs: gl.inputs[nimi].default_value = v
    if 'Type' in gl.inputs:
        try: gl.inputs['Type'].default_value = 'Bloom'
        except Exception: pass
    ng.links.new(rl.outputs['Image'], gl.inputs['Image']); ng.links.new(gl.outputs['Image'], ulos.inputs[0])
except Exception as e:
    print('bloom pois:', e)

# --- kamerat: pelin kulmat (atsimuutti mitattuna kuten Siirtosepän kiertokamera: 0 = etelä +z, myötäpäivään yltä) ---
cd = bpy.data.cameras.new('kamera'); kam = bpy.data.objects.new('kamera', cd); sc.collection.objects.link(kam); sc.camera = kam


def kamera(kohde, atsim, korkeus, etaisyys, fov, lev, kork):
    a, e = math.radians(atsim), math.radians(korkeus)
    k = G(*kohde)
    suunta = G(math.sin(a) * math.cos(e), math.sin(e), math.cos(a) * math.cos(e)) - G(0, 0, 0)
    kam.location = k + suunta * etaisyys
    kam.rotation_euler = (k - kam.location).to_track_quat('-Z', 'Y').to_euler()
    cd.sensor_fit = 'VERTICAL'; cd.angle = math.radians(fov); cd.clip_end = 5000
    sc.render.resolution_x, sc.render.resolution_y = lev, kork


KUVAT = {
    'yleis-vaaka': ([0, 2, 0], 165, 30, 250, 32, 1600, 900),
    'yleis-pysty': ([0, 0, 2], 160, 38, 330, 40, 900, 1600),
    'lahi-muuri': ([-16, 12, -18], 150, 22, 45, 38, 1600, 900),
    # Vertailukoe A–D (Päätoimittaja 30.9.): tornin lähikuva pelin hämärävalossa, huonekameran etäisyys.
    'torni-vertailu': ([-19, 14, -21], 150, 12, 26, 34, 1200, 1200),
}
for nimi, (kohde, at, ko, et, fov, lw, kh) in KUVAT.items():
    if VAIN and nimi not in VAIN:
        continue
    kamera(kohde, at, ko, et, fov, lw, kh)
    sc.render.filepath = os.path.join(ULOS, f'{nimi}.png')
    bpy.ops.render.render(write_still=True)
    print('KUVA', sc.render.filepath)
