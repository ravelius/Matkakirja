# Olavinlinnan kuoren märkä vesiraja (Linnanrakentaja 1.10.2026; makro_ranta.py:n pari kuorelle). Linnasaaren oma
# kallio ja muurien juuret ovat kuoren fotogrammetriaa, ei maastoa: rantaviivan kaista tarvitaan myös kuoren atlakseen.
# Kaksi vaihetta samassa tiedostossa:
#   1) Blender -b -P kuori_ranta.py -- <kuori-kansio> [koko 4096]
#      leipoo jokaisen tekselin maailmakoordinaatin (UV0, sama kaikilla laatutasoilla) → <kuori-kansio>/sijainti-<koko>.npy
#   2) <python numpy+PIL> kuori_ranta.py <kuori-kansio>
#      tummentaa ulkokuori-{8k,4k,2k}.jpg:t ja ulkokuori-hamara-{8k,4k,2k}.jpg:t (alkuperäiset talteen *-ennen-ranta.jpg)
#      ja kirjoittaa ASTC-lähteiksi häviöttömät *-ranta.png:t: astc-mip.swift <nimi>-ranta.png <nimi>-4x4.astcm 4, sitten rm.
# Märkä: korkeus vedestä h < 0,15 m täysin, häivytys 0,4–0,55 m:iin (maailmakohinalla); laiturin kansi (> 0,6 m) ei
# kastu. Veden alla (h > −0,6) myös tumma, koska matalikko näkyy veden läpi. Päivä: kirkkaus × 0,6, kylläisyys × 1,15;
# hämärä: kirkkaus × 0,6 (hämärä = albedo × valo, joten kerroin on sama kuin albedossa; ikkunat ovat ylempänä).
import os, sys
VESI_Z = -7.0
try:
    import bpy
except ImportError:
    bpy = None
if bpy:
    import numpy as np
    A = sys.argv[sys.argv.index('--') + 1:]; K = A[0]; KOKO = int(A[1]) if len(A) > 1 else 4096
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = 1
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for d in pr.devices: d.use = True
        sc.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    bpy.ops.import_scene.gltf(filepath=os.path.join(K, 'ulkokuori_huippu.glb'))
    kuori = [o for o in sc.objects if o.type == 'MESH']
    kuva = bpy.data.images.new('sijainti', KOKO, KOKO, float_buffer=True)
    kuva.generated_color = (0, 0, 0, 0)
    m = bpy.data.materials.new('sijainti'); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
    g = nt.nodes.new('ShaderNodeNewGeometry'); ad = nt.nodes.new('ShaderNodeVectorMath'); ad.operation = 'ADD'
    ad.inputs[1].default_value = (1000, 1000, 1000)  # positiiviseksi (0 = leipomaton tekseli)
    e = nt.nodes.new('ShaderNodeEmission'); e.inputs['Strength'].default_value = 1.0; out = nt.nodes.new('ShaderNodeOutputMaterial')
    t = nt.nodes.new('ShaderNodeTexImage'); t.image = kuva; nt.nodes.active = t
    nt.links.new(g.outputs['Position'], ad.inputs[0]); nt.links.new(ad.outputs['Vector'], e.inputs['Color'])
    nt.links.new(e.outputs['Emission'], out.inputs['Surface'])
    for o in kuori:
        o.data.materials.clear(); o.data.materials.append(m)
        o.data.uv_layers.active_index = 0
    bpy.ops.object.select_all(action='DESELECT')
    for o in kuori: o.select_set(True)
    bpy.context.view_layer.objects.active = kuori[0]
    sc.render.bake.margin = 4; sc.view_settings.view_transform = 'Standard'
    bpy.ops.object.bake(type='EMIT')
    p = np.empty(KOKO * KOKO * 4, np.float32); kuva.pixels.foreach_get(p)
    p = p.reshape(KOKO, KOKO, 4)[::-1, :, :3]  # rivi 0 = kuvan yläreuna (kuten jpg)
    np.save(os.path.join(K, f'sijainti-{KOKO}.npy'), p)
    ok = p[..., 2] > 1
    print(f'KUORI_RANTA: sijainti {KOKO}², leivottu {ok.mean():.2f}, z {p[ok, 2].min() - 1000:.1f}…{p[ok, 2].max() - 1000:.1f}')
else:
    import glob, shutil
    import numpy as np
    from PIL import Image
    Image.MAX_IMAGE_PIXELS = None
    K = sys.argv[1]
    P = np.load(sorted(glob.glob(os.path.join(K, 'sijainti-*.npy')))[-1]); n0 = P.shape[0]
    ok = P[..., 2] > 1; P = P - 1000
    s = lambda x, a, b: np.clip((x - a) / (b - a), 0, 1)
    rng = np.random.default_rng(29)
    def kohina3(x, y, z, solu):  # maailmakohina hilan arvoista (trilineaarinen), ±1 suuruusluokka
        g = rng.standard_normal((64, 64, 64)).astype(np.float32)
        fx, fy, fz = (x / solu) % 63, (y / solu) % 63, (z / solu) % 63
        ix, iy, iz = fx.astype(int), fy.astype(int), fz.astype(int); tx, ty, tz = fx - ix, fy - iy, fz - iz
        v = 0
        for a in (0, 1):
            for b in (0, 1):
                for c in (0, 1):
                    v = v + g[ix + a, iy + b, iz + c] * (tx if a else 1 - tx) * (ty if b else 1 - ty) * (tz if c else 1 - tz)
        return v
    h = P[..., 2] - VESI_Z
    k = 0.6 * kohina3(P[..., 0], P[..., 1], P[..., 2], 1.5) + 0.4 * kohina3(P[..., 0], P[..., 1], P[..., 2], 0.4)
    yla = np.clip(0.47 + 0.08 * k, 0.3, 0.6)
    marka = np.where(ok, (1 - s(h, 0.15, yla)) * s(h, -0.6, -0.3), 0).astype(np.float32)
    print(f'KUORI_RANTA: märkiä tekseleitä {(marka > 0.5).mean() * 100:.2f} % atlaksesta')
    for nimi in ('ulkokuori-8k', 'ulkokuori-4k', 'ulkokuori-2k', 'ulkokuori-hamara-8k', 'ulkokuori-hamara-4k', 'ulkokuori-hamara-2k'):
        alku = os.path.join(K, f'{nimi}-ennen-ranta.jpg')
        if not os.path.exists(alku): shutil.copy(os.path.join(K, f'{nimi}.jpg'), alku)
        im = Image.open(alku).convert('RGB'); n = im.size[0]
        m_ = np.asarray(Image.fromarray(marka, 'F').resize((n, n), Image.BILINEAR))[..., None]
        x = np.asarray(im).astype(np.float32) / 255
        if 'hamara' in nimi:
            y = x * 0.6
        else:
            L = (x @ np.array([0.2126, 0.7152, 0.0722], np.float32))[..., None]
            y = np.clip((L + (x - L) * 1.15) * 0.6, 0, 1)
        tulos = Image.fromarray((np.clip(x * (1 - m_) + y * m_, 0, 1) * 255).round().astype(np.uint8))
        tulos.save(os.path.join(K, f'{nimi}.jpg'), quality=92)
        tulos.save(os.path.join(K, f'{nimi}-ranta.png'))  # ASTC tästä (ei toista JPEG-sukupolvea); kutsuja poistaa
        print('KUORI_RANTA:', nimi, n)
