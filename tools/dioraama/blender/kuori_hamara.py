# Kuoren iltahämärätekstuuri (Linnanrakentaja 29.9., omistajan tunnelmapyyntö): fotogrammetrian värikuva × uusi valaistus
# (tumma sininen taivas, matala oranssi aurinko, tunnelma-tilan soihdut ja lyhdyt pistevaloina) leivotaan kuoren omaan
# UV:hen (sama UV kaikilla laatutasoilla). Tulos näytetään Unityssä valaisemattomana kuten tilojen valoatlas.
#   nice -n 15 Blender -b -P kuori_hamara.py -- <kuori.glb> <rakennus.json> <ulos-kansio> [näytteet 128] [koko 4096]
#     [--tavoite] [--albedo <8k-albedo.png>] [--valokartta <valokartta.exr>]
# --tavoite (laatusuunnitelman vaihe 4, 30.9.): tavoitekuvan valaistus eli Blenderin taivas (aurinko 1,5° horisontin alla
#   lounaassa) ja ulkosoihdut rakennus.json:n liekkipisteistä (tunnelma, laituri, muurinharja; SOIHTU_W 450 W), AgX-sävytys
#   kuten tavoitekuva.py (VALOTUS 0.6). --albedo: leivotaan pelkkä valo (DIFFUSE, suora + epäsuora, ilman väriä) koon
#   mukaan ja kerrotaan albedolla sen omassa koossa (esim. 4k-valo × 8k Real-ESRGAN-albedo → hamara-8k), jolloin 8k:n
#   terävyys säilyy ilman 8k-leivontaa. Valokartta tallentuu myös erikseen (ulkokuori-valokartta-<koko>.exr, lineaarinen).
import bpy, json, math, os, sys
import numpy as np
from mathutils import Vector
a = sys.argv[sys.argv.index('--') + 1:]
def lippu(n, oletus=None):
    if n in a:
        i = a.index(n); v = a[i + 1]; del a[i:i + 2]; return v
    return oletus
ALBEDO = lippu('--albedo')
VALOKARTTA = lippu('--valokartta')  # valmis ulkokuori-valokartta-<koko>.exr: ei leivontaa (delighting vaihtaa vain albedon)
TASOITA = lippu('--tasoita')  # siivousmaski.png (ulkokuori.py --siivoa): siivottujen maatekselien valo ympäristöstä
TAVOITE = '--tavoite' in a
if TAVOITE: a.remove('--tavoite')
GLB, RAK, ULOS = a[0], a[1], a[2]
NAYTTEET = int(a[3]) if len(a) > 3 else 128
KOKO = int(a[4]) if len(a) > 4 else 4096
os.makedirs(ULOS, exist_ok=True)

def srgb(h):
    h = h.lstrip('#'); c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)
bl = lambda p: (p[0], -p[2], p[1])  # glTF → Blender

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'
pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
for d in pr.devices: d.use = True
sc.cycles.device = 'GPU'; sc.cycles.samples = NAYTTEET; sc.view_settings.view_transform = 'AgX'
bpy.ops.import_scene.gltf(filepath=GLB)
kuori = next(o for o in sc.objects if o.type == 'MESH')

rak = json.load(open(RAK))
if TAVOITE:
    # Valaistus: tavoitekuva.py:n hämäräilta (sama taivas ja soihdut, omistajan hyväksymä tavoite 30.9.).
    sc.view_settings.look = 'AgX - Medium High Contrast'
    sc.view_settings.exposure = float(os.environ.get('VALOTUS', 0.6))
    w = bpy.data.worlds.new('hamara'); w.use_nodes = True; sc.world = w
    st = w.node_tree.nodes.new('ShaderNodeTexSky'); st.sky_type = 'MULTIPLE_SCATTERING'
    st.sun_elevation = math.radians(float(os.environ.get('AURINKO', -1.5))); st.sun_rotation = math.radians(225 - 90)
    st.air_density = 1.2
    if hasattr(st, 'aerosol_density'): st.aerosol_density = 2.5
    bg = w.node_tree.nodes['Background']; bg.inputs['Strength'].default_value = float(os.environ.get('TAIVAS', 0.9))
    w.node_tree.links.new(st.outputs['Color'], bg.inputs['Color'])
    n = 0
    for t in rak['tilat']:
        if t['id'] not in ('tunnelma', 'laituri', 'muurinharja'): continue
        for lk in t.get('liekit', []):
            if lk.get('liekki') != 'soihtu': continue
            x, y, z = lk['paikka']
            d = bpy.data.lights.new('soihtu', 'POINT'); d.energy = float(os.environ.get('SOIHTU_W', 450)); d.color = (1.0, 0.55, 0.22)
            d.shadow_soft_size = 0.35  # muurin vieressä 700 W / 0,15 m paloi valkoiseksi (30.9.)
            o = bpy.data.objects.new('soihtu', d); sc.collection.objects.link(o); o.location = bl((x, y + 0.15, z)); n += 1
    print('HAMARA: tavoitevalaistus, soihtuja', n)
else:
    # Valaistus: sama iltahämärä kuin leivo_tila.py --hamara.
    w = bpy.data.worlds.new('ilta'); sc.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs['Color'].default_value = (*srgb('#34466e'), 1)
    w.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.45
    aur = bpy.data.lights.new('aurinko', 'SUN'); aur.energy = 2.2 * 0.3; aur.color = srgb('#ff9a5c'); aur.angle = math.radians(1.5)
    ao = bpy.data.objects.new('aurinko', aur); sc.collection.objects.link(ao)
    atz, kor = math.radians(225), math.radians(4)
    ao.rotation_euler = Vector((-math.sin(atz) * math.cos(kor), -math.cos(atz) * math.cos(kor), -math.sin(kor))).to_track_quat('-Z', 'Y').to_euler()
    tunnelma = next(t for t in rak['tilat'] if t['id'] == 'tunnelma')
    for i, lv in enumerate(tunnelma.get('valot', [])):
        if lv.get('voima', 1) < 0.75:
            continue  # reseptien pienet lähivalot (sade 1,4) eivät valaise muuria
        d = bpy.data.lights.new(f'v{i}', 'POINT'); d.energy = 260.0 * lv['voima']; d.color = srgb(lv.get('vari', '#ff9848'))
        d.shadow_soft_size = 0.15
        o = bpy.data.objects.new(f'v{i}', d); sc.collection.objects.link(o); o.location = bl(lv['paikka'])

# Leivontakohde: uusi kuva kuoren materiaaliin aktiiviseksi solmuksi (UV0 = valokuvan UV).
kuva = bpy.data.images.new('kuori_hamara', KOKO, KOKO, float_buffer=True)
for s in kuori.material_slots:
    nt = s.material.node_tree; n = nt.nodes.new('ShaderNodeTexImage'); n.image = kuva; nt.nodes.active = n
bpy.ops.object.select_all(action='DESELECT'); kuori.select_set(True); bpy.context.view_layer.objects.active = kuori
sc.render.bake.margin = 4
import time; t0 = time.time()
if ALBEDO:
    # Pelkkä valo (irradianssi) ja kertominen albedolla sen omassa koossa.
    b = sc.render.bake; b.use_pass_direct = True; b.use_pass_indirect = True; b.use_pass_color = False
    if VALOKARTTA:
        vk = bpy.data.images.load(VALOKARTTA); assert tuple(vk.size) == (KOKO, KOKO), vk.size
        pv_ = np.empty(KOKO * KOKO * 4, np.float32); vk.pixels.foreach_get(pv_); kuva.pixels.foreach_set(pv_); del pv_
    else:
        bpy.ops.object.bake(type='DIFFUSE')
    print('HAMARA: valoleivonta', round(time.time() - t0, 1), 's')
    if TASOITA and not VALOKARTTA:  # valokartassa tasoitus on jo mukana
        # Litistetty romu on päällekkäisinä kerroksina 5 cm:n välein, ja kerrokset varjostavat toisiaan reunoiltaan:
        # leivottu valo piirsi siivottuun maahan romun ääriviivat (v16). Siivottujen ylöspäin osoittavien tekselien valo
        # otetaan puhtaasta maasta maailmankoordinaateissa (0,25 m:n ruudukko, korkeuskerroksittain, push-pull-täyttö).
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from kuori_tex import push_pull
        def leivo_vektori(nimi, siirto, skaala):
            k = bpy.data.images.new('v_' + nimi, KOKO, KOKO, float_buffer=True)
            for sl in kuori.material_slots:
                nt = sl.material.node_tree
                g = nt.nodes.new('ShaderNodeNewGeometry'); vm = nt.nodes.new('ShaderNodeVectorMath'); vm.operation = 'MULTIPLY_ADD'
                vm.inputs[1].default_value = (1 / skaala,) * 3; vm.inputs[2].default_value = (siirto / skaala,) * 3
                e = nt.nodes.new('ShaderNodeEmission'); o = nt.nodes.new('ShaderNodeOutputMaterial'); t = nt.nodes.new('ShaderNodeTexImage')
                t.image = k
                nt.links.new(g.outputs[nimi], vm.inputs[0]); nt.links.new(vm.outputs[0], e.inputs['Color'])
                nt.links.new(e.outputs[0], o.inputs['Surface']); nt.nodes.active = t; o.is_active_output = True
            bpy.ops.object.bake(type='EMIT')
            p = np.empty(KOKO * KOKO * 4, np.float32); k.pixels.foreach_get(p)
            return p.reshape(KOKO, KOKO, 4)[..., :3] * skaala - siirto
        pos = leivo_vektori('Position', 200.0, 400.0); nor = leivo_vektori('Normal', 1.0, 2.0)
        mk = bpy.data.images.load(TASOITA)
        if mk.size[0] != KOKO: mk.scale(KOKO, KOKO)
        pm = np.empty(KOKO * KOKO * 4, np.float32); mk.pixels.foreach_get(pm); m = pm.reshape(KOKO, KOKO, 4)[..., 0] > 0.5
        peitto = np.abs(pos + 200.0).sum(-1) > 1e-3; ylos = nor[..., 2] > 0.7
        kohde = m & ylos & peitto; lahde = ~m & ylos & peitto
        L = np.empty(KOKO * KOKO * 4, np.float32); kuva.pixels.foreach_get(L); L = L.reshape(KOKO, KOKO, 4)
        R = 0.25; ky, kx = np.nonzero(kohde); ly, lx = np.nonzero(lahde)
        kz = np.floor(pos[ky, kx, 2]); lz = pos[ly, lx, 2]
        for z in np.unique(kz):
            ks = kz == z; ls = np.abs(lz - (z + 0.5)) < 1.5
            kp = pos[ky[ks], kx[ks], :2]; lp = pos[ly[ls], lx[ls], :2]
            lo = kp.min(0) - 3.0; n = np.ceil((kp.max(0) + 3.0 - lo) / R / 16).astype(int) * 16
            sis = np.all((lp >= lo) & (lp < lo + n * R), 1)
            if sis.sum() < 20: continue
            c = ((lp[sis] - lo) / R).astype(int); i = c[:, 1] * n[0] + c[:, 0]
            arvo = L[ly[ls][sis], lx[ls][sis], :3]
            summa = np.stack([np.bincount(i, arvo[:, j], n[0] * n[1]) for j in range(3)], -1).reshape(n[1], n[0], 3)
            lkm = np.bincount(i, None, n[0] * n[1]).reshape(n[1], n[0])
            ruutu = push_pull((summa / np.maximum(lkm, 1)[..., None]).astype(np.float32), lkm > 0)
            q = np.pad(ruutu, ((1, 1), (1, 1), (0, 0)), mode='edge')
            ruutu = sum(q[dy:dy + n[1], dx:dx + n[0]] for dy in range(3) for dx in range(3)) / 9
            kc = np.clip(((kp - lo) / R).astype(int), 0, n - 1)
            L[ky[ks], kx[ks], :3] = ruutu[kc[:, 1], kc[:, 0]]
        # Pystysuorat siivotut tekselit (v17: muurin juuren uudet pinnat): valo samansuuntaisesta muurista aukon
        # yläpuolelta (sektori 30°, syvyys 1 m:n kerroksina), muuten raon varjo piirsi tummia piikkejä.
        pysty = ~ylos & (np.hypot(nor[..., 0], nor[..., 1]) > 0.2)  # myös vinot (ramppi muurin juurella)
        vk = m & pysty & peitto
        # Siivotun pystypinnan viereiset alkuperäiset pinnat (0,5 m, maailmankoordinaateissa, enintään 4 m korkeudelle
        # siivotusta): venyneiden pintojen väliin jääneet muurin kaistaleet olivat raon varjossa tummina piikkeinä (v18).
        V = 0.25; ky_, kx_ = np.nonzero(vk)
        if len(ky_):
            av = np.floor(pos[ky_, kx_] / V).astype(np.int64)
            o = np.stack(np.meshgrid(*[np.arange(-2, 3)] * 3, indexing='ij'), -1).reshape(-1, 3)
            koodi = lambda k: (k[..., 0] * 1_000_003 + k[..., 1]) * 1_000_003 + k[..., 2]
            lahella = np.unique(koodi(np.unique(av, axis=0)[:, None, :] + o[None]).ravel())
            ey, ex = np.nonzero(~m & pysty & peitto)
            sis = np.isin(koodi(np.floor(pos[ey, ex] / V).astype(np.int64)), lahella)
            vk[ey[sis], ex[sis]] = True
            print('HAMARA: muurin juuren viereisiä tekseleitä', int(sis.sum()))
        vl = ~vk & pysty & peitto
        sek = lambda n: np.round(np.degrees(np.arctan2(n[..., 0], n[..., 1])) / 30).astype(int) % 12
        vy, vx = np.nonzero(vk); wy, wx = np.nonzero(vl)
        vs = sek(nor[vy, vx]); ws = sek(nor[wy, wx]); nk = 0
        for s_ in np.unique(vs):
            c = np.radians(s_ * 30); t_ = np.array([np.cos(c), -np.sin(c)]); n_ = np.array([np.sin(c), np.cos(c)])
            ks = vs == s_; ls = ws == s_
            kp = np.stack([pos[vy[ks], vx[ks], :2] @ t_, pos[vy[ks], vx[ks], 2]], -1); ksyv = pos[vy[ks], vx[ks], :2] @ n_
            lp = np.stack([pos[wy[ls], wx[ls], :2] @ t_, pos[wy[ls], wx[ls], 2]], -1); lsyv = pos[wy[ls], wx[ls], :2] @ n_
            for d in np.unique(np.floor(ksyv)):
                kk = np.flatnonzero(np.floor(ksyv) == d); ll = np.flatnonzero(np.abs(lsyv - (d + 0.5)) < 1.5)
                if len(ll) < 20: continue
                # Sarakkeittain (0,5 m muurin suunnassa): valo muurista heti aukon yläpuolelta (0,2–2,5 m), mediaani;
                # sarakkeiden välillä lineaarisesti. Aukon vieressä oleva muuri on raon varjossa, joten sitä ei käytetä.
                sar = np.floor(kp[kk, 0] / 0.5).astype(int); lsar = np.floor(lp[ll, 0] / 0.5).astype(int)
                keski = []; arvot = []
                for c_ in np.unique(sar):
                    zmax = kp[kk[sar == c_], 1].max()
                    ok = ll[(lsar == c_) & (lp[ll, 1] > zmax + 0.2) & (lp[ll, 1] < zmax + 2.5)]
                    if len(ok) >= 5:
                        keski.append((c_ + 0.5) * 0.5); arvot.append(np.median(L[wy[ls][ok], wx[ls][ok], :3], 0))
                if not keski: continue
                keski = np.array(keski); arvot = np.array(arvot)
                for j in range(3):  # v24 (1.10.): vain vaalentaa — raon varjo nousee, mutta soihdun hehku jää
                    # (v23: lounaisbastionin tayta-tekselit maskissa → soihdun alapuolelle tumma suorakaide)
                    L[vy[ks][kk], vx[ks][kk], j] = np.maximum(L[vy[ks][kk], vx[ks][kk], j], np.interp(kp[kk, 0], keski, arvot[:, j]))
                nk += len(kk)
        kuva.pixels.foreach_set(L.ravel()); kuva.update()
        print('HAMARA: tasoitettu', int(kohde.sum()), 'vaakatekseliä ja', nk, 'pystytekseliä')
    ims = sc.render.image_settings; ims.file_format = 'OPEN_EXR'; ims.color_depth = '16'; ims.exr_codec = 'DWAA'
    kuva.save_render(os.path.join(ULOS, f'ulkokuori-valokartta-{KOKO // 1024}k.exr'), scene=sc)  # lineaarinen, puolitarkkuus
    alb = bpy.data.images.load(ALBEDO); A = alb.size[0]
    pa = np.empty(A * A * 4, np.float32); alb.pixels.foreach_get(pa); pa = pa.reshape(A, A, 4)[..., :3]
    bpy.data.images.remove(alb)
    pa = np.where(pa <= 0.04045, pa / 12.92, ((pa + 0.055) / 1.055) ** 2.4)  # tavukuvan pikselit ovat sRGB-arvoja
    if A != KOKO:
        kuva.scale(A, A)  # valokartta albedon kokoon (bilineaarinen)
    pv = np.empty(A * A * 4, np.float32); kuva.pixels.foreach_get(pv); pv = pv.reshape(A, A, 4)
    pv[..., :3] *= pa; pv[..., 3] = 1; del pa
    tulos = bpy.data.images.new('kuori_hamara_tulos', A, A, float_buffer=True); tulos.pixels.foreach_set(pv.ravel()); del pv
    KOKO = A; kuva = tulos
else:
    bpy.ops.object.bake(type='COMBINED')
print('HAMARA: leivonta', round(time.time() - t0, 1), 's')
sc.render.image_settings.file_format = 'JPEG'; sc.render.image_settings.quality = 90; sc.render.image_settings.color_depth = '8'
p4 = os.path.join(ULOS, f'ulkokuori-hamara-{KOKO // 1024}k.jpg')
kuva.save_render(p4, scene=sc)
koko = KOKO
while koko > 2048:
    k2 = bpy.data.images.load(os.path.join(ULOS, f'ulkokuori-hamara-{koko // 1024}k.jpg')); koko //= 2; k2.scale(koko, koko)
    k2.filepath_raw = os.path.join(ULOS, f'ulkokuori-hamara-{koko // 1024}k.jpg'); k2.file_format = 'JPEG'; k2.save(quality=90)
    bpy.data.images.remove(k2)
print('HAMARA: valmis', p4)
