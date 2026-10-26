# Olavinlinnan kuoren delighting (Linnanrakentaja 1.10.2026; laatusuunnitelman vaihe 3, Päätoimittajan OK 08.4x).
# Fotogrammetrian albedossa on kuvauspäivän aurinko: aurinkoon päin olevat pinnat kirkkaita ja lämpimiä, varjopuolet ja
# heittovarjot tummia ja sinisiä. Hämärä (kuori_hamara.py --albedo) kertoo albedon uudella valolla, joten päivän valo jäi
# hämärään ("päivä + sininen suodin"). Tämä tekee hämärän albedon, josta päivän valoa on poistettu; päivätekstuuri
# (ulkokuori-{8k,4k,2k}.jpg) jää ennalleen, jotta päivänäkymä pysyy elävänä.
# Malli (lineaarinen valo, logaritmeina):
#   1) suunta: koko linnan geometrinen keskiarvo pinnan normaalin suunnan mukaan (26 suuntaa, pehmeä painotus) → poistetaan
#      kertoimella ALFA_SUUNTA kanavittain (aurinkopuolen lämpö ja varjopuolen sini).
#   2) paikallinen: 2 m:n vokselin ja normaalisuunnan keskiarvo suhteessa suunnan keskiarvoon (heittovarjot) → poistetaan
#      kirkkaudesta kertoimella ALFA_PAIKKA ja värisävystä ALFA_SAVY; suhde rajataan [0,7, 1,6]:een, ettei materiaali
#      (punatiili, laastipinnat) latistu harmaaksi.
# Kaksi vaihetta:
#   1) Blender -b -P kuori_delight.py -- <kuori.glb> <ulos-kansio> [koko 2048]  → sijainti- ja normaali-<koko>.npy
#   2) <python numpy+PIL> kuori_delight.py <albedo-8k.png> <ulos-kansio> [--suunta 0.8] [--paikka 0.5] [--savy 0.3]
#      → <ulos>/albedo-delight-8k.png (kuori_hamara.py --albedo) ja delight-suhde.png (tarkistukseen)
import os, sys
try:
    import bpy
except ImportError:
    bpy = None
if bpy:
    import numpy as np
    A = sys.argv[sys.argv.index('--') + 1:]; GLB, ULOS = A[:2]; KOKO = int(A[2]) if len(A) > 2 else 2048
    os.makedirs(ULOS, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = 1; sc.view_settings.view_transform = 'Standard'
    try:
        pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
        for d in pr.devices: d.use = True
        sc.cycles.device = 'GPU'
    except Exception as e:
        print('GPU:', e)
    bpy.ops.import_scene.gltf(filepath=GLB)
    kuori = [o for o in sc.objects if o.type == 'MESH']
    for o in kuori: o.data.uv_layers.active_index = 0
    def leivo(nimi, ulostulo):
        kuva = bpy.data.images.new(nimi, KOKO, KOKO, float_buffer=True); kuva.generated_color = (0, 0, 0, 0)
        m = bpy.data.materials.new(nimi); m.use_nodes = True; nt = m.node_tree; nt.nodes.clear()
        g = nt.nodes.new('ShaderNodeNewGeometry'); ad = nt.nodes.new('ShaderNodeVectorMath'); ad.operation = 'ADD'
        ad.inputs[1].default_value = (1000, 1000, 1000)  # positiiviseksi (0 = leipomaton tekseli)
        e = nt.nodes.new('ShaderNodeEmission'); out = nt.nodes.new('ShaderNodeOutputMaterial')
        t = nt.nodes.new('ShaderNodeTexImage'); t.image = kuva; nt.nodes.active = t
        nt.links.new(g.outputs[ulostulo], ad.inputs[0]); nt.links.new(ad.outputs['Vector'], e.inputs['Color'])
        nt.links.new(e.outputs['Emission'], out.inputs['Surface'])
        for o in kuori: o.data.materials.clear(); o.data.materials.append(m)
        bpy.ops.object.select_all(action='DESELECT')
        for o in kuori: o.select_set(True)
        bpy.context.view_layer.objects.active = kuori[0]
        sc.render.bake.margin = 4; bpy.ops.object.bake(type='EMIT')
        p = np.empty(KOKO * KOKO * 4, np.float32); kuva.pixels.foreach_get(p)
        np.save(os.path.join(ULOS, f'{nimi}-{KOKO}.npy'), p.reshape(KOKO, KOKO, 4)[::-1, :, :3])  # rivi 0 = yläreuna
    leivo('sijainti', 'Position'); leivo('normaali', 'Normal')  # Normal = varjostusnormaali (pehmeä)
    print('DELIGHT: sijainti ja normaali', KOKO)
else:
    import glob
    import numpy as np
    from PIL import Image
    Image.MAX_IMAGE_PIXELS = None
    A = sys.argv[1:]; ALB, ULOS = A[:2]
    lippu = lambda n, o: float(A[A.index(n) + 1]) if n in A else o
    ALFA_SUUNTA = lippu('--suunta', 0.8); ALFA_PAIKKA = lippu('--paikka', 0.5); ALFA_SAVY = lippu('--savy', 0.3)
    VOKSELI = lippu('--vokseli', 2.0)
    P = np.load(sorted(glob.glob(os.path.join(ULOS, 'sijainti-*.npy')))[-1]); N = np.load(sorted(glob.glob(os.path.join(ULOS, 'normaali-*.npy')))[-1])
    n0 = P.shape[0]; ok = (P[..., 2] > 900) & (N[..., 2] > 990)  # margin-sekoitus (0 ↔ 1000) pois
    P = P - 1000; N = N - 1000; N /= np.maximum(np.linalg.norm(N, axis=-1, keepdims=True), 1e-6)
    im = Image.open(ALB).convert('RGB'); T = im.size[0]
    srgb2lin = lambda x: np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)
    a2 = srgb2lin(np.asarray(im.resize((n0, n0), Image.BOX)).astype(np.float32) / 255)
    la = np.log(np.maximum(a2, 1e-3))  # kanavittain log
    lY = np.log(np.maximum(a2 @ np.array([0.2126, 0.7152, 0.0722], np.float32), 1e-3))
    pi = np.nonzero(ok); p = P[pi]; nn = N[pi]; la_ = la[pi]; lY_ = lY[pi]
    # 26 suuntaa (kuution sivut, särmät ja kulmat), pehmeä painotus max(0, n·d)^4
    D = np.array([(x, y, z) for x in (-1, 0, 1) for y in (-1, 0, 1) for z in (-1, 0, 1) if (x, y, z) != (0, 0, 0)], np.float32)
    D /= np.linalg.norm(D, axis=1, keepdims=True)
    W = np.maximum(nn @ D.T, 0) ** 4; W /= np.maximum(W.sum(1, keepdims=True), 1e-6)  # (n, 26)
    # 1) suunnan keskiarvo kanavittain
    suunta_k = (W.T @ la_) / np.maximum(W.sum(0)[:, None], 1e-6)  # (26, 3)
    globaali = la_.mean(0)
    suunta = W @ suunta_k  # tekselin suunnan log-valo (n, 3)
    # 2) paikallinen: vokseli × suunta, log-kirkkaus ja log-kanavat; ruudukon 3×3×3-pehmennys
    v = np.floor((p - p.min(0)) / VOKSELI).astype(np.int64); dims = v.max(0) + 3; v += 1
    vid = (v[:, 0] * dims[1] + v[:, 1]) * dims[2] + v[:, 2]; nv = int(np.prod(dims))
    def ruudukko(arvo):  # Σ w·arvo ja Σ w per (vokseli, suunta), pehmennettynä naapurivokseleihin
        S = np.zeros((26, nv), np.float64); C = np.zeros((26, nv), np.float64)
        for b in range(26):
            S[b] = np.bincount(vid, W[:, b] * arvo, nv); C[b] = np.bincount(vid, W[:, b], nv)
        S = S.reshape(26, *dims); C = C.reshape(26, *dims)
        def peh(X):
            for ax in (1, 2, 3):
                X = X + np.roll(X, 1, ax) + np.roll(X, -1, ax)
            return X
        S = peh(S).reshape(26, nv); C = peh(C).reshape(26, nv)
        return (W * (S[:, vid].T)).sum(1) / np.maximum((W * (C[:, vid].T)).sum(1), 1e-9)
    paikka_Y = ruudukko(lY_)
    paikka_k = np.stack([ruudukko(la_[:, c]) for c in range(3)], 1)
    suunta_Y = suunta @ np.array([0.2126, 0.7152, 0.0722], np.float32)  # log-keskiarvon kirkkaus (likiarvo)
    # korjaus (log): suunta kanavittain + paikallinen kirkkaus + paikallinen sävy
    kor = ALFA_SUUNTA * (globaali[None] - suunta)
    kor += ALFA_PAIKKA * np.clip(suunta_Y - paikka_Y, np.log(0.7), np.log(1.6))[:, None]
    savy = (paikka_k - paikka_Y[:, None]) - (suunta - suunta_Y[:, None])  # paikallinen värivirhe suunnan väriin nähden
    kor -= ALFA_SAVY * np.clip(savy, -0.4, 0.4)
    kor = np.clip(kor, np.log(0.6), np.log(1.9))
    kor -= np.median(kor @ np.array([0.2126, 0.7152, 0.0722], np.float32))  # kokonaiskirkkaus ennallaan (mediaani 1)
    K = np.zeros((n0, n0, 3), np.float32); K[pi] = kor
    # leipomattomat tekselit: suhde 1 (log 0); pehmennys 3×3 kartalla (UV-saumat: margin 4 px kantaa)
    S_ = K.copy(); Cn = ok.astype(np.float32)
    for _ in range(2):
        S_ = sum(np.roll(np.roll(S_, i, 0), j, 1) for i in (-1, 0, 1) for j in (-1, 0, 1)); Cn = sum(np.roll(np.roll(Cn, i, 0), j, 1) for i in (-1, 0, 1) for j in (-1, 0, 1))
    K = np.where(ok[..., None], S_ / np.maximum(Cn, 1e-6)[..., None], 0)
    suhde = np.exp(K)
    print(f'DELIGHT: suhde mediaani {np.median(suhde[ok], 0).round(3).tolist()}, 5–95 % {np.percentile(suhde[ok][:, 1], 5):.2f}–{np.percentile(suhde[ok][:, 1], 95):.2f}')
    Image.fromarray((np.clip(suhde / 2, 0, 1) * 255).astype(np.uint8)).save(os.path.join(ULOS, 'delight-suhde.png'))  # 128 = 1
    # 8k: suhde bilineaarisesti, albedo lineaarisena × suhde → sRGB
    a8 = np.asarray(im).astype(np.float32) / 255
    s8 = np.stack([np.asarray(Image.fromarray(suhde[..., c], 'F').resize((T, T), Image.BILINEAR)) for c in range(3)], -1)
    l8 = srgb2lin(a8) * s8; del a8, s8
    o8 = np.where(l8 <= 0.0031308, l8 * 12.92, 1.055 * np.power(np.maximum(l8, 0.0031308), 1 / 2.4) - 0.055)
    Image.fromarray((np.clip(o8, 0, 1) * 255).round().astype(np.uint8)).save(os.path.join(ULOS, 'albedo-delight-8k.png'))
    print('DELIGHT: valmis', os.path.join(ULOS, 'albedo-delight-8k.png'))
