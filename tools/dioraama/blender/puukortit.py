# Puukorttien atlas (Linnanrakentaja 1.10.2026; v3 Päätoimittajan hyväksymä 1.10.): mänty, kuusi ja koivu omina
# proseduraalisina malleina (ei ulkoista lähdettä), kolme muunnosta lajia kohden, renderöity sivulta läpinäkyvälle
# taustalle. Natiivi piirtää puun kahtena ristikkäisenä korttina (Siirtoseppä: 4 kolmiota/puu, yksi atlas = yksi draw
# call). v3: oikea oksarakenne (runko → pääoksat → neulas-/lehtitupsut kärjissä) möykkypallojen tilalla, epäsymmetria
# ja kallistus muunnoksittain, sekä tangenttiavaruuden normaalikartta (puukortit-normaali.png, OpenGL, kortin tasossa).
#   nice -n 15 Blender -b -P puukortit.py -- <ulos-kansio> [solu 512] [--hamara]
# Tulos: puukortit.png (+ -hamara, + -normaali): 2048 × 4096 = 4 × 4 solua à 512 × 1024 (Siirtoseppä: kahden
# potenssi ASTC/ETC2:lle), 9 käytössä; puukortit.json: kortit["<laji>-<muunnos>"] + vanhat nimet (manty, kuusi, koivu,
# koivu2) muunnokseen 0/1, muunnokset[laji] = nimilista. Kentät kuten ennen (solu, u, v, kortti_per_puu,
# leveys_per_korkeus, juuri_v).
import bpy, json, math, os, random, sys
import numpy as np
from mathutils import Vector, Matrix, noise
A = sys.argv[sys.argv.index('--') + 1:]; ULOS = A[0]; SOLU = int(A[1]) if len(A) > 1 and A[1].isdigit() else 512
HAMARA = '--hamara' in A; LOPPU = '-hamara' if HAMARA else ''
SARAKE, RIVI = 4, 4
os.makedirs(ULOS, exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 96; sc.render.film_transparent = True
sc.view_settings.view_transform = 'Standard'
p = bpy.context.preferences.addons['cycles'].preferences; p.compute_device_type = 'METAL'; p.get_devices()
for d in p.devices: d.use = True
sc.cycles.device = 'GPU'

def mat(nimi, vari, vaihtelu=0.15, karhe=0.8, aukot=0.0, mitta=18.0):
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = mitta; n.inputs['Detail'].default_value = 6
    if aukot > 0:  # neulas-/lehtitupsun reunan rikkonaisuus: läpinäkyvät kohdat hienosta kohinasta
        a = nt.nodes.new('ShaderNodeTexNoise'); a.inputs['Scale'].default_value = 26; a.inputs['Detail'].default_value = 10
        ra = nt.nodes.new('ShaderNodeValToRGB'); ra.color_ramp.elements[0].position = aukot; ra.color_ramp.elements[1].position = aukot + 0.05
        ra.color_ramp.elements[0].color = (0, 0, 0, 1); ra.color_ramp.elements[1].color = (1, 1, 1, 1)
        nt.links.new(a.outputs['Fac'], ra.inputs['Fac']); nt.links.new(ra.outputs['Color'], b.inputs['Alpha'])
    r = nt.nodes.new('ShaderNodeValToRGB'); r.color_ramp.elements[0].color = [c * (1 - vaihtelu) for c in vari] + [1]
    r.color_ramp.elements[1].color = [min(1, c * (1 + vaihtelu)) for c in vari] + [1]
    nt.links.new(n.outputs['Fac'], r.inputs['Fac']); nt.links.new(r.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = karhe
    bump = nt.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.5
    nt.links.new(n.outputs['Fac'], bump.inputs['Height']); nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def kuori(nimi, ala, yla, raja=(0.35, 0.75), laikut=None):
    # Kaarna korkeuden mukaan (Generated Z): tyvi `ala`, latva `yla`; koivulle mustat laikut (laikut = kynnys)
    m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; b = nt.nodes['Principled BSDF']
    tk = nt.nodes.new('ShaderNodeTexCoord'); sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(tk.outputs['Generated'], sep.inputs[0])
    r = nt.nodes.new('ShaderNodeValToRGB'); r.color_ramp.elements[0].position = raja[0]; r.color_ramp.elements[1].position = raja[1]
    r.color_ramp.elements[0].color = (*ala, 1); r.color_ramp.elements[1].color = (*yla, 1); nt.links.new(sep.outputs['Z'], r.inputs['Fac'])
    n = nt.nodes.new('ShaderNodeTexNoise'); n.inputs['Scale'].default_value = 40; n.inputs['Detail'].default_value = 8
    mx = nt.nodes.new('ShaderNodeMix'); mx.data_type = 'RGBA'; mx.blend_type = 'MULTIPLY'; mx.inputs[0].default_value = 0.5
    nt.links.new(r.outputs['Color'], mx.inputs[6]); nt.links.new(n.outputs['Color'], mx.inputs[7]); ulos = mx.outputs[2]
    if laikut is not None:
        n2 = nt.nodes.new('ShaderNodeTexNoise'); n2.inputs['Scale'].default_value = 22; r2 = nt.nodes.new('ShaderNodeValToRGB')
        r2.color_ramp.elements[0].position = laikut; r2.color_ramp.elements[1].position = laikut + 0.03
        r2.color_ramp.elements[0].color = (1, 1, 1, 1); r2.color_ramp.elements[1].color = (0.08, 0.07, 0.07, 1)
        nt.links.new(n2.outputs['Fac'], r2.inputs['Fac'])
        m2 = nt.nodes.new('ShaderNodeMix'); m2.data_type = 'RGBA'; m2.blend_type = 'MULTIPLY'; m2.inputs[0].default_value = 1
        nt.links.new(ulos, m2.inputs[6]); nt.links.new(r2.outputs['Color'], m2.inputs[7]); ulos = m2.outputs[2]
    nt.links.new(ulos, b.inputs['Base Color']); b.inputs['Roughness'].default_value = 0.9
    return m

def putki(a, b_, r0, r1, m, sivut=8):
    """Kartiomainen putki pisteestä a pisteeseen b_ (oksa tai runko)."""
    a, b_ = Vector(a), Vector(b_); d = b_ - a
    bpy.ops.mesh.primitive_cone_add(vertices=sivut, radius1=r0, radius2=r1, depth=d.length, location=(a + b_) / 2)
    o = bpy.context.object; o.rotation_euler = d.to_track_quat('Z', 'Y').to_euler(); o.data.materials.append(m); return o

def tupsu(keski, koko, litteys, m, rng, kohina=0.45, jako=3):
    """Neulas- tai lehtitupsu: litistetty, rosoinen pallo (pienempi ja tiheämpi kuin v2:n möykyt)."""
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=jako, radius=1, location=keski)
    o = bpy.context.object; o.scale = (koko, koko * rng.uniform(0.75, 1.25), koko * litteys)
    o.rotation_euler = (rng.uniform(-0.3, 0.3), rng.uniform(-0.3, 0.3), rng.uniform(0, math.pi))
    s = Vector((rng.random() * 50, rng.random() * 50, rng.random() * 50))
    for v in o.data.vertices: v.co *= 1 + kohina * noise.noise(v.co * 2.5 + s) + 0.2 * noise.noise(v.co * 8 + s)
    for f in o.data.polygons: f.use_smooth = True
    o.data.materials.append(m); return o

def mänty(rng, muunnos):
    # Kilpikaarnamänty: suora runko, alaosa paljas, latvus epäsäännöllinen ja kerroksellinen (tasaiset neulaslevyt
    # pääoksien kärjissä), latva usein litteä tai vino; muunnokset: kallistus, latvuksen korkeus ja leveys.
    H = 20.0 * rng.uniform(0.92, 1.05); kallistus = Vector((rng.uniform(-0.6, 0.6), rng.uniform(-0.3, 0.3), 0)) * (muunnos * 0.6)
    k = [putki((0, 0, 0), kallistus + Vector((0, 0, H * 0.94)), 0.34, 0.07,
               kuori('mrunko', (0.17, 0.14, 0.11), (0.58, 0.30, 0.14)), 10)]
    oksa_m = kuori('moksa', (0.30, 0.20, 0.12), (0.45, 0.25, 0.13)); lehva = mat('mlehva', (0.08, 0.14, 0.055), 0.35, aukot=0.40)
    ala = H * rng.uniform(0.42, 0.52); n_oksa = rng.randint(14, 19)  # v3b: täyteläisempi latvus (kohtauksessa pylväitä)
    for i in range(n_oksa):
        t = (i + rng.uniform(0, 0.8)) / n_oksa; z = ala + (H * 0.97 - ala) * t
        a = rng.uniform(0, 2 * math.pi); pituus = (3.8 + rng.uniform(-0.8, 1.8)) * (1.05 - 0.65 * t ** 1.4)
        if rng.random() < 0.15 * (1 - t): continue  # puuttuvia oksia: aukkoja latvukseen
        tyvi = kallistus * (z / H) + Vector((0, 0, z)); nousu = rng.uniform(0.15, 0.55)
        karki = tyvi + Vector((math.cos(a) * pituus, math.sin(a) * pituus, pituus * nousu))
        k.append(putki(tyvi, karki, 0.07 * (1 - 0.5 * t) + 0.03, 0.02, oksa_m, 6))
        for j in range(rng.randint(5, 9)):  # neulaslevyt oksan ulko-osalle (vaakasuorat, litteät)
            u = rng.uniform(0.45, 1.0); p_ = tyvi.lerp(karki, u) + Vector((rng.uniform(-0.4, 0.4), rng.uniform(-0.4, 0.4), rng.uniform(-0.1, 0.25)))
            k.append(tupsu(p_, rng.uniform(0.7, 1.3) * (0.7 + 0.3 * pituus / 3), 0.36, lehva, rng))
    return k, H

def kuusi(rng, muunnos):
    # Kuusi: kartio maasta latvaan, oksat roikkuvat ja kaartuvat kärjestä ylös, neulasverho oksien päällä tiheänä,
    # tyvellä kuivia oksia; muunnokset: kartion leveys, latvan kaltevuus ja oksien roikkuminen.
    H = 22.0 * rng.uniform(0.92, 1.05); leveys = 3.0 * rng.uniform(0.85, 1.15) * (1 + 0.08 * muunnos)
    k = [putki((0, 0, 0), (0, 0, H * 0.97), 0.30, 0.05, kuori('krunko', (0.22, 0.16, 0.12), (0.34, 0.24, 0.17)), 10)]
    oksa_m = kuori('koksa', (0.20, 0.15, 0.11), (0.25, 0.18, 0.12)); lehva = mat('klehva', (0.04, 0.085, 0.055), 0.3, aukot=0.33)
    kerroksia = 44  # v3b: tiheämmät, epätasaiset kerrokset; tupsut roikkuvat ja kallistuvat oksan mukana (ei pagodalevyjä)
    for i in range(kerroksia):
        t = min(1.0, max(0.0, i / (kerroksia - 1) + rng.uniform(-0.012, 0.012))); z = H * (0.03 + 0.94 * t)
        r = leveys * (1 - t) ** 1.0 * rng.uniform(0.8, 1.1) + 0.25
        for _ in range(4 if t < 0.85 else 2):
            a = rng.uniform(0, 2 * math.pi); pituus = r * rng.uniform(0.6, 1.05); roikku = rng.uniform(0.3, 0.6) * (1 - 0.6 * t)
            tyvi = Vector((0, 0, z)); suunta = Vector((math.cos(a), math.sin(a), 0))
            keski = tyvi + suunta * pituus * 0.55 + Vector((0, 0, -roikku * pituus * 0.5))
            karki = tyvi + suunta * pituus + Vector((0, 0, -roikku * pituus * 0.35))  # kärki kaartuu takaisin ylös
            k.append(putki(tyvi, keski, 0.05, 0.03, oksa_m, 5)); k.append(putki(keski, karki, 0.03, 0.012, oksa_m, 5))
            if z < H * 0.08 and rng.random() < 0.6: continue  # tyven kuivat oksat ilman neulasia
            for u in (0.3, 0.55, 0.8, 1.0):  # roikkuva neulasverho: pystymmät, rosoiset tupsut oksan alla
                p_ = (tyvi.lerp(keski, u * 2) if u < 0.5 else keski.lerp(karki, (u - 0.5) * 2)) + Vector((0, 0, -0.25 * u))
                o_ = tupsu(p_, (0.38 + 0.35 * (1 - t)) * rng.uniform(0.75, 1.25), 0.75, lehva, rng, 0.55)
                o_.rotation_euler = (rng.uniform(-0.5, 0.5), rng.uniform(-0.5, 0.5), a); k.append(o_)
    return k, H

def koivu(rng, muunnos):
    # Rauduskoivu: valkoinen runko mustin laikuin ja tyvellä tumma kaarna, pääoksat kohti ylös haarautuen, latvus
    # pyöreähkö ja harva, reunoilla riippuvat oksat lehtitupsuin; muunnokset: haarautuminen, kallistus, latvuksen korkeus.
    H = 17.0 * rng.uniform(0.9, 1.08); kal = Vector((rng.uniform(-0.8, 0.8), rng.uniform(-0.4, 0.4), 0)) * (0.4 + 0.4 * muunnos)
    k = [putki((0, 0, 0), kal + Vector((0, 0, H * 0.9)), 0.22, 0.05,
               kuori('korunko', (0.25, 0.22, 0.20), (0.86, 0.84, 0.78), raja=(0.04, 0.14), laikut=0.6), 10)]
    oksa_m = kuori('kooksa', (0.30, 0.25, 0.22), (0.35, 0.30, 0.27)); lehva = mat('kolehva', (0.26, 0.37, 0.10), 0.4, aukot=0.46, mitta=30)
    ala = H * rng.uniform(0.32, 0.45)
    for i in range(rng.randint(12, 16)):
        t = rng.uniform(0, 1); z = ala + (H * 0.92 - ala) * t; a = rng.uniform(0, 2 * math.pi)
        pituus = 4.6 * math.sin(math.pi * min(1, 0.15 + 0.85 * t)) * rng.uniform(0.75, 1.15) + 0.8
        tyvi = kal * (z / H) + Vector((0, 0, z)); karki = tyvi + Vector((math.cos(a) * pituus * 0.8, math.sin(a) * pituus * 0.8, pituus * 0.75))
        k.append(putki(tyvi, karki, 0.06, 0.02, oksa_m, 6))
        for j in range(rng.randint(3, 5)):  # sivuhaarat, jotka kaartuvat alas (riippukoivu)
            u = rng.uniform(0.35, 0.95); s_ = tyvi.lerp(karki, u); b2 = rng.uniform(0, 2 * math.pi); l2 = rng.uniform(0.8, 1.8)
            loppu = s_ + Vector((math.cos(b2) * l2, math.sin(b2) * l2, -l2 * rng.uniform(0.3, 0.9)))
            k.append(putki(s_, loppu, 0.02, 0.008, oksa_m, 4))
            for v in (0.4, 0.75, 1.0):
                k.append(tupsu(s_.lerp(loppu, v), rng.uniform(0.45, 0.75), 0.75, lehva, rng, 0.5, 2))
        k.append(tupsu(karki, rng.uniform(0.6, 0.9), 0.8, lehva, rng, 0.5, 2))
    return k, H

# Valo: taivas + aurinko edestä-vasemmalta ylhäältä (sama suunta kaikilla, kortit eivät kierry kameraan päin).
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs['Color'].default_value = (0.55, 0.65, 0.8, 1); w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.8
su = bpy.data.lights.new('aur', 'SUN'); su.energy = 3.0; so = bpy.data.objects.new('aur', su); sc.collection.objects.link(so)
so.rotation_euler = (math.radians(55), 0, math.radians(-35))
if HAMARA:  # sama taivas kuin kuoren hämärässä (kuori_hamara.py --tavoite): kirkkaus täsmää linnaan
    su.energy = 0.0; st = w.node_tree.nodes.new('ShaderNodeTexSky'); st.sky_type = 'MULTIPLE_SCATTERING'
    st.sun_elevation = math.radians(-1.5); st.sun_rotation = math.radians(225 - 90); st.air_density = 1.2
    if hasattr(st, 'aerosol_density'): st.aerosol_density = 2.5
    w.node_tree.links.new(st.outputs['Color'], w.node_tree.nodes['Background'].inputs['Color'])
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.9
    sc.view_settings.view_transform = 'AgX'; sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.view_settings.exposure = float(os.environ.get('VALOTUS', 0.6))
# Normaalikartta (vain päiväajossa): geometrian normaali emissiona (materiaalin korvaus) kortin tangenttiavaruuteen. Kamera katsoo +y:hen,
# kortin u = +x, v = +z, normaali kameraan päin = −y → n_ts = (Nx, Nz, −Ny) · 0,5 + 0,5; tausta (0,5, 0,5, 1).
NORMAALI = not HAMARA
cd = bpy.data.cameras.new('k'); cd.type = 'ORTHO'; kam = bpy.data.objects.new('k', cd); sc.collection.objects.link(kam); sc.camera = kam
kam.rotation_euler = (math.radians(90), 0, 0)
sc.render.resolution_x = SOLU; sc.render.resolution_y = 2 * SOLU

def normaalikuva(polku):
    """Renderöi saman näkymän normaalit materiaalin korvauksella (emissio) ja kirjoittaa tangenttiavaruuden PNG:n.
    Alfa otetaan värirenderöinnistä (tupsujen aukot), joten normaali kattaa samat pikselit."""
    nm = bpy.data.materials.get('_normaali') or bpy.data.materials.new('_normaali'); nm.use_nodes = True; nt = nm.node_tree; nt.nodes.clear()
    o_ = nt.nodes.new('ShaderNodeOutputMaterial'); em = nt.nodes.new('ShaderNodeEmission'); g = nt.nodes.new('ShaderNodeNewGeometry')
    sep = nt.nodes.new('ShaderNodeSeparateXYZ'); nt.links.new(g.outputs['Normal'], sep.inputs[0])
    cmb = nt.nodes.new('ShaderNodeCombineXYZ')
    for kanava, lahde, merkki in (('X', 'X', 1), ('Y', 'Z', 1), ('Z', 'Y', -1)):
        mm = nt.nodes.new('ShaderNodeMath'); mm.operation = 'MULTIPLY_ADD'; mm.inputs[1].default_value = 0.5 * merkki; mm.inputs[2].default_value = 0.5
        nt.links.new(sep.outputs[lahde], mm.inputs[0]); nt.links.new(mm.outputs[0], cmb.inputs[kanava])
    nt.links.new(cmb.outputs[0], em.inputs['Color']); nt.links.new(em.outputs[0], o_.inputs['Surface'])
    bpy.context.view_layer.material_override = nm
    vt = sc.view_settings.view_transform; sc.view_settings.view_transform = 'Standard'; sc.cycles.samples = 16
    sc.render.filepath = polku; bpy.ops.render.render(write_still=True)
    bpy.context.view_layer.material_override = None; sc.cycles.samples = 96; sc.view_settings.view_transform = vt

LAJIT = [('manty', mänty, 0), ('kuusi', kuusi, 1), ('koivu', koivu, 2)]
tiedot = {}; muunnokset = {}
for li, (nimi, f, laji) in enumerate(LAJIT):
    muunnokset[str(laji)] = []
    for mu in range(3):
        solu = li * 3 + mu; sx, sy = solu % SARAKE, solu // SARAKE  # sy = rivi alhaalta (Blenderin pikselijärjestys)
        for o in [o for o in sc.objects if o.type == 'MESH']: bpy.data.objects.remove(o)
        kohteet, H = f(random.Random(1000 * laji + 17 * mu + 3), mu)
        lev = max(max(abs((o.matrix_world @ Vector(c)).x) for c in o.bound_box) for o in kohteet) * 2 * 1.05
        kork = H * 1.04; mitta = max(lev * 2, kork)  # solu on 1:2
        cd.ortho_scale = mitta; kam.location = (0, -50, mitta / 2)
        sc.render.filepath = os.path.join(ULOS, f'kortti-{laji}-{mu}{LOPPU}.png'); bpy.ops.render.render(write_still=True)
        if NORMAALI: normaalikuva(os.path.join(ULOS, f'kortti-{laji}-{mu}-normaali.png'))
        avain = f'{laji}-{mu}'
        tiedot[avain] = {'solu': solu, 'u': [sx / SARAKE, (sx + 1) / SARAKE], 'v': [sy / RIVI, (sy + 1) / RIVI],
                         'kortti_per_puu': round(mitta / H, 4), 'leveys_per_korkeus': 0.5, 'juuri_v': 0.0}
        muunnokset[str(laji)].append(avain)
        print('KORTTI', avain, 'puun korkeus', round(H, 1), 'solun korkeus', round(mitta, 1))
for vanha, avain in (('manty', '0-0'), ('kuusi', '1-0'), ('koivu', '2-0'), ('koivu2', '2-1')):
    tiedot[vanha] = dict(tiedot[avain])  # vanha natiivilukija hakee lajinimellä

def atlas(nimi, liite, tausta):
    pix = np.zeros((RIVI * 2 * SOLU, SARAKE * SOLU, 4), np.float32); pix[...] = tausta
    for avain, t in tiedot.items():
        if '-' not in avain: continue
        k = bpy.data.images.load(os.path.join(ULOS, f'kortti-{avain}{liite}.png')); a = np.empty(SOLU * 2 * SOLU * 4, np.float32); k.pixels.foreach_get(a)
        a = a.reshape(2 * SOLU, SOLU, 4); sx, sy = t['solu'] % SARAKE, t['solu'] // SARAKE
        if liite == '-normaali':  # alfa värikortista; tausta tasainen normaali
            c = bpy.data.images.load(os.path.join(ULOS, f'kortti-{avain}.png')); ca = np.empty(a.size, np.float32); c.pixels.foreach_get(ca)
            al = ca.reshape(2 * SOLU, SOLU, 4)[..., 3:4]; a = a * al + np.array(tausta, np.float32) * (1 - al); a[..., 3] = 1
        pix[sy * 2 * SOLU:(sy + 1) * 2 * SOLU, sx * SOLU:(sx + 1) * SOLU] = a
    im = bpy.data.images.new(nimi, SARAKE * SOLU, RIVI * 2 * SOLU, alpha=True)
    if liite == '-normaali': im.colorspace_settings.name = 'Non-Color'
    im.pixels.foreach_set(pix.ravel()); im.filepath_raw = os.path.join(ULOS, f'{nimi}.png'); im.file_format = 'PNG'; im.save()

atlas(f'puukortit{LOPPU}', LOPPU, (0, 0, 0, 0))
if NORMAALI: atlas('puukortit-normaali', '-normaali', (0.5, 0.5, 1.0, 1.0))
if HAMARA: print('KORTIT hämärä valmis'); sys.exit(0)
json.dump({'atlas': 'puukortit.png', 'atlas_hamara': 'puukortit-hamara.png', 'atlas_normaali': 'puukortit-normaali.png',
           'solut': SARAKE * RIVI, 'lajit': {'0': 'manty', '1': 'kuusi', '2': 'koivu'}, 'kortit': tiedot, 'muunnokset': muunnokset,
           'huom': 'Kortin korkeus = puun korkeus × kortti_per_puu, leveys = korkeus × leveys_per_korkeus; juuri solun alareunassa '
                   '(juuri_v 0) ja keskellä vaakasuunnassa. Kaksi korttia ristiin 90°. Kortti: kortit[muunnokset[laji][muunnos]] '
                   '(puut.json 7. sarake, puuttuu = 0); vanhat nimet (manty, kuusi, koivu, koivu2) säilyvät. Normaalikartta '
                   'tangenttiavaruudessa (OpenGL, u oikealle, v ylös, kortin normaali katsojaan päin).'},
          open(os.path.join(ULOS, 'puukortit.json'), 'w'), ensure_ascii=False, indent=1)
print('KORTIT valmis', ULOS)
