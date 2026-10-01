# MYLLYN LAUTA OIKEANA ESINEENÄ (Linnanrakentaja 1.10.2026; omistajan hyväksymä erä klo 20.4x, Päätoimittajan tilaus):
# kaiverrettu pähkinälauta (Poly Haven wood_table_worn, Dimitrios Savva, CC0), 24 pistekuoppaa ja urat, sorvatut nappulat
# (vaalea vaahtera, tumma pähkinä; proseduraalinen puu), myllyn hillitty kultainen hehku urassa. Kerroksiksi samalla
# tekniikalla kuin ISS-kytkinpöytä (mylly_lauta_render.py); tämä tiedosto rakentaa kohtauksen ja mallikuvan.
# Koordinaatit: lauta 1 × 1 (= L), keskipiste origossa, yläpinta z = 0; kamera ortografinen ylhäältä (ortho_scale 1).
#   Blender -b -P mylly_lauta.py -- --malli <ulos.png> [--koko 1080] [--naytteita 128]
import math, os, sys
import bpy, bmesh
from mathutils import Vector

A = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
TEKSTUURIT = '/Users/Shared/Claude/proto-3d/_lahteet/polyhaven/wood_table_worn'
VALI = (1 - 0.18) / 6                  # Siirtoseppä 1.10.: marginaali 9 %, ruutuväli (1 − 0,18) / 6
NELIOT = (3 * VALI, 2 * VALI, VALI)    # sisäkkäisten neliöiden puolisivut (0,41 / 0,273 / 0,137)
URA_LEV, URA_SYV = 0.0105, 0.004       # kaiverrus
KUOPPA_R, KUOPPA_SYV = 0.017, 0.004    # pistekuoppa
NAPPULA_R = 0.049                      # nappulan säde (Siirtoseppä: halkaisija 0,098 laudasta)
PAKSUUS = 0.06


def pisteet():
    """24 pistettä järjestyksessä: neliö ulkoa sisään, kussakin vasen ylä → myötäpäivään (8 kpl)."""
    p = []
    for a in NELIOT:
        p += [(-a, a), (0, a), (a, a), (a, 0), (a, -a), (0, -a), (-a, -a), (-a, 0)]
    return p


def myllyt():
    """16 myllyä pisteindekseinä: kunkin neliön sivut (4 × 3) ja keskilinjat neliöiden yli (4)."""
    m = []
    for k in range(3):
        b = 8 * k
        m += [(b + 0, b + 1, b + 2), (b + 2, b + 3, b + 4), (b + 4, b + 5, b + 6), (b + 6, b + 7, b + 0)]
    for j in (1, 3, 5, 7):
        m.append((j, 8 + j, 16 + j))
    return m


def kuva(nimi):
    return bpy.data.images.load(os.path.join(TEKSTUURIT, f'wood_table_worn_{nimi}_2k.jpg'))


def puu_lauta():
    m = bpy.data.materials.new('lauta'); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord'); mp = nt.nodes.new('ShaderNodeMapping'); mp.inputs['Scale'].default_value = (1.6, 1.6, 1.6)
    nt.links.new(tc.outputs['Object'], mp.inputs['Vector'])
    d = nt.nodes.new('ShaderNodeTexImage'); d.image = kuva('diff'); nt.links.new(mp.outputs['Vector'], d.inputs['Vector'])
    r = nt.nodes.new('ShaderNodeTexImage'); r.image = kuva('rough'); r.image.colorspace_settings.name = 'Non-Color'
    n = nt.nodes.new('ShaderNodeTexImage'); n.image = kuva('nor'); n.image.colorspace_settings.name = 'Non-Color'
    for t in (r, n): nt.links.new(mp.outputs['Vector'], t.inputs['Vector'])
    nm = nt.nodes.new('ShaderNodeNormalMap'); nm.inputs['Strength'].default_value = 0.6
    nt.links.new(n.outputs['Color'], nm.inputs['Color']); nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])
    ao = nt.nodes.new('ShaderNodeAmbientOcclusion'); ao.inputs['Distance'].default_value = 0.006; ao.samples = 16
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs['Factor'].default_value = 0.85
    nt.links.new(d.outputs['Color'], mx.inputs['A']); nt.links.new(ao.outputs['AO'], mx.inputs['B'])
    nt.links.new(mx.outputs['Result'], b.inputs['Base Color'])  # kaiverrus tummuu (urat ja kuopat)
    rr = nt.nodes.new('ShaderNodeMapRange'); rr.inputs['To Min'].default_value = 0.25; rr.inputs['To Max'].default_value = 0.55
    nt.links.new(r.outputs['Color'], rr.inputs['Value']); nt.links.new(rr.outputs['Result'], b.inputs['Roughness'])
    b.inputs['Coat Weight'].default_value = 0.35; b.inputs['Coat Roughness'].default_value = 0.25  # öljytty pinta
    return m


def puu_proseduraali(nimi, vari1, vari2, karheus=0.35):
    """Sorvattu puu: renkaat (Wave, rings) akselin ympäri + kohina."""
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tc = nt.nodes.new('ShaderNodeTexCoord')
    w = nt.nodes.new('ShaderNodeTexWave'); w.wave_type = 'RINGS'; w.rings_direction = 'Z'
    w.inputs['Scale'].default_value = 9; w.inputs['Distortion'].default_value = 6.0; w.inputs['Detail'].default_value = 4
    nt.links.new(tc.outputs['Object'], w.inputs['Vector'])
    cr = nt.nodes.new('ShaderNodeValToRGB'); cr.color_ramp.elements[0].color = (*vari1, 1); cr.color_ramp.elements[1].color = (*vari2, 1)
    cr.color_ramp.elements[0].position = 0.35; cr.color_ramp.elements[1].position = 0.95
    nt.links.new(w.outputs['Fac'], cr.inputs['Fac']); nt.links.new(cr.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = karheus; b.inputs['Coat Weight'].default_value = 0.5; b.inputs['Coat Roughness'].default_value = 0.2
    return m


def emissio(nimi, vari, voima):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*vari, 1); b.inputs['Emission Color'].default_value = (*vari, 1)
    b.inputs['Emission Strength'].default_value = voima
    return m


def lauta():
    bpy.ops.mesh.primitive_cube_add(size=1); o = bpy.context.object; o.name = 'lauta'
    o.scale = (1.0, 1.0, PAKSUUS); o.location = (0, 0, -PAKSUUS / 2); bpy.ops.object.transform_apply(scale=True)
    md = o.modifiers.new('viiste', 'BEVEL'); md.width = 0.012; md.segments = 4
    # urat ja kuopat erillisinä leikkaajina kokoelmassa (yksi päällekkäinen leikkaaja tyhjensi laudan EXACT-ratkaisijalla)
    kok = bpy.data.collections.new('leikkaajat'); bpy.context.scene.collection.children.link(kok)
    def laatikko(x0, x1, y0, y1):
        bm = bmesh.new(); r = bmesh.ops.create_cube(bm, size=1)
        for v in r['verts']:
            v.co.x = x0 if v.co.x < 0 else x1; v.co.y = y0 if v.co.y < 0 else y1; v.co.z = -URA_SYV if v.co.z < 0 else 0.01
        me = bpy.data.meshes.new('ura'); bm.to_mesh(me); bm.free(); kok.objects.link(bpy.data.objects.new('ura', me))
    h = URA_LEV / 2
    for a in NELIOT:
        laatikko(-a - h, a + h, a - h, a + h); laatikko(-a - h, a + h, -a - h, -a + h)
        laatikko(-a - h, -a + h, -a + h, a - h); laatikko(a - h, a + h, -a + h, a - h)
    s, t = NELIOT[0], NELIOT[2]
    for sgn in (1, -1):
        y0, y1 = sorted((sgn * (t + h), sgn * (s - h)))
        laatikko(-h, h, y0, y1); laatikko(y0, y1, -h, h)
    for x, y in pisteet():
        bm = bmesh.new(); r = bmesh.ops.create_cone(bm, cap_ends=True, segments=40, radius1=KUOPPA_R, radius2=KUOPPA_R, depth=0.02)
        for v in r['verts']:
            v.co.x += x; v.co.y += y; v.co.z = (-KUOPPA_SYV if v.co.z < 0 else 0.01)
        me = bpy.data.meshes.new('kuoppa'); bm.to_mesh(me); bm.free(); kok.objects.link(bpy.data.objects.new('kuoppa', me))
    bo = o.modifiers.new('kaiverrus', 'BOOLEAN'); bo.operation = 'DIFFERENCE'; bo.operand_type = 'COLLECTION'; bo.collection = kok
    bo.solver = 'EXACT'
    kok.hide_render = True; kok.hide_viewport = True
    o.data.materials.append(puu_lauta())
    return o


def nappula(nimi, x, y, mat, nosto=0.0):
    """Sorvattu nappula: profiili Screw-muokkaimella (pohja, kupera kansi, koristeura)."""
    R = NAPPULA_R
    prof = [(0, 0.0), (R * 0.92, 0.0), (R, 0.004), (R, 0.012), (R * 0.97, 0.015), (R * 0.90, 0.016),
            (R * 0.88, 0.018), (R * 0.93, 0.020), (R * 0.90, 0.026), (R * 0.70, 0.031), (R * 0.35, 0.034), (0, 0.035)]
    me = bpy.data.meshes.new(nimi); me.from_pydata([(r, 0, z) for r, z in prof], [(i, i + 1) for i in range(len(prof) - 1)], [])
    o = bpy.data.objects.new(nimi, me); bpy.context.scene.collection.objects.link(o)
    sc = o.modifiers.new('sorvi', 'SCREW'); sc.steps = 64; sc.render_steps = 64; sc.use_merge_vertices = True
    o.modifiers.new('sileys', 'SUBSURF').levels = 1
    o.location = (x, y, -KUOPPA_SYV * 0.6 + nosto); o.data.materials.append(mat)
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.shade_smooth()
    return o


def ura_hehku(mylly, mat):
    """Kultainen hehku myllyn urassa: ohut emissiivinen nauha uran pohjalla kolmen pisteen välillä."""
    P = pisteet(); (x0, y0), (x2, y2) = P[mylly[0]], P[mylly[2]]
    h = URA_LEV * 0.28
    bm = bmesh.new(); r = bmesh.ops.create_cube(bm, size=1)
    for v in r['verts']:
        v.co.x = (min(x0, x2) - h if v.co.x < 0 else max(x0, x2) + h); v.co.y = (min(y0, y2) - h if v.co.y < 0 else max(y0, y2) + h)
        v.co.z = -URA_SYV + (0.0002 if v.co.z < 0 else 0.0012)
    me = bpy.data.meshes.new('hehku'); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('hehku', me); bpy.context.scene.collection.objects.link(o); o.data.materials.append(mat)
    return o


def valot():
    sc = bpy.context.scene
    w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.30, 0.26, 0.22, 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.35
    d = bpy.data.lights.new('avain', 'AREA'); d.energy = 42; d.size = 1.2; d.color = (1.0, 0.92, 0.82)
    o = bpy.data.objects.new('avain', d); sc.collection.objects.link(o)
    o.location = (-0.9, 0.9, 1.6); o.rotation_euler = (Vector((0, 0, 0)) - o.location).to_track_quat('-Z', 'Y').to_euler()


def kamera(koko):
    sc = bpy.context.scene
    cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; cd.ortho_scale = 1.0
    k = bpy.data.objects.new('k', cd); sc.collection.objects.link(k); sc.camera = k; k.location = (0, 0, 3)
    sc.render.resolution_x = sc.render.resolution_y = koko


def rakenna():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for dv in pr.devices: dv.use = True
        sc.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    lauta(); valot()
    return {'vaalea': puu_proseduraali('vaahtera', (0.66, 0.48, 0.28), (0.52, 0.36, 0.19), 0.35),
            'tumma': puu_proseduraali('pahkina', (0.16, 0.09, 0.05), (0.08, 0.045, 0.025), 0.3),
            'kulta': emissio('kulta', (1.0, 0.50, 0.08), 0.55)}


if '--malli' in A:
    ULOS = A[A.index('--malli') + 1]; KOKO = int(A[A.index('--koko') + 1]) if '--koko' in A else 1080
    N = int(A[A.index('--naytteita') + 1]) if '--naytteita' in A else 128
    M = rakenna(); kamera(KOKO); sc = bpy.context.scene; sc.cycles.samples = N; sc.cycles.use_denoising = True
    P = pisteet()
    # Mallitilanne: vaalea mylly ulkoneliön yläsivulla (0, 1, 2) hehkuu; tummat 9, 11, 21; valittu vaalea 15 (nostettu);
    # poistettava tumma 12 (punertava rengas); kohde tyhjä piste 13 (kultainen rengas kuopassa).
    for i in (0, 1, 2, 7): nappula(f'v{i}', *P[i], M['vaalea'])
    for i in (9, 11, 21, 12): nappula(f't{i}', *P[i], M['tumma'])
    nappula('v15', *P[15], M['vaalea'], nosto=0.012)
    ura_hehku((0, 1, 2), M['kulta'])
    # valittu: lämmin rengas; poistettava: punainen rengas; kohde: kultainen rengas kuopan reunalla
    def rengas(nimi, x, y, r, vari, voima):
        bpy.ops.mesh.primitive_torus_add(major_radius=r, minor_radius=0.0011, location=(x, y, 0.0005))
        t = bpy.context.object; t.name = nimi; t.data.materials.append(emissio(nimi, vari, voima))
    rengas('valittu', *P[15], NAPPULA_R + 0.005, (1.0, 0.50, 0.08), 0.8)
    rengas('poistettava', *P[12], NAPPULA_R + 0.005, (0.9, 0.12, 0.06), 0.8)
    rengas('kohde', *P[13], KUOPPA_R + 0.004, (1.0, 0.50, 0.08), 0.8)
    sc.render.filepath = ULOS; bpy.ops.render.render(write_still=True); print('MYLLY: malli', ULOS)
