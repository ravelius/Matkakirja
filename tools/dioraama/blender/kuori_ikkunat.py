# Kuoren hämärätekstuurin lämpimät ikkunat (Linnanrakentaja 29.9., omistajan 22.28 hyväksyntä A:n tunnelmalle): kuoren UV0:aan
# leivotaan POSITION- ja NORMAL-passit, ja valokuvan tummat aukot (tekseli selvästi paikallista keskiarvoa tummempi) saavat
# lämpimän hehkun pystypinnoilla valituissa rakennuslaatikoissa (glTF-koordinaatit, sijoitettu rakennus.json).
#   nice -n 15 Blender -b -P kuori_ikkunat.py -- <kuori.glb> <kuori-valokuva.jpg> <kuori-hamara-4k.jpg> <ulos-kansio>
#     [--laatikot itasiipi,keittio,keskushalli,kappelikerros | --kaikki] [--rakennus rakennus-sijoitettu.json] [--voima 1.0] [--kynnys 1.1]
# Tulos: <ulos>/ulkokuori-hamara-{4k,2k}.jpg (+ ikkunamaski.png tarkistukseen). Laskenta 2k:ssa, maski skaalataan 4k:hon.
import bpy, json, os, sys
import numpy as np
a = sys.argv[sys.argv.index('--') + 1:]
def lippu(n, oletus):
    if n in a:
        i = a.index(n); v = a[i + 1]; del a[i:i + 2]; return v
    return oletus
# Oletuslaatikot (glTF, sijoitettu kuori): itäsiiven ikkunajulkisivu (vino, 29.9. pikselikartasta: (−2, −1) → (18, −12),
# ikkunat y 3–8), keittiön ja keskushallin tilat sekä Kirkkotornin kappelikerros. Tila-id = sen leikkaus-/rajalaatikko.
OLETUS = 'itasiipi,keittio,keskushalli,kappelikerros'
NIMETYT = {'itasiipi': ([-4, 1, -14], [20, 10, 1]), 'kappelikerros': ([-23.4, 6, -22.6], [-7.4, 12, -6.6])}
LAATIKOT = lippu('--laatikot', OLETUS).split(',')
RAK = lippu('--rakennus', '/Users/Shared/Claude/proto-3d/_valmiit/olavinlinna-blender/rakennus-sijoitettu.json')
KAIKKI = '--kaikki' in a
if KAIKKI: a.remove('--kaikki')
VOIMA = float(lippu('--voima', '1.0')); KYNNYS = float(lippu('--kynnys', '1.1'))  # z-arvo: hajontaa ympäristöä tummempi
GLB, KUVA, HAMARA, ULOS = a[:4]
os.makedirs(ULOS, exist_ok=True)
N = 2048  # laskentaresoluutio
LAMMIN = np.array([1.0, 0.70, 0.36], np.float32)  # sRGB, kynttilä/tuli

bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene; sc.render.engine = 'CYCLES'; sc.cycles.samples = 1
pr = bpy.context.preferences.addons['cycles'].preferences; pr.compute_device_type = 'METAL'; pr.get_devices()
for d in pr.devices: d.use = True
sc.cycles.device = 'GPU'
bpy.ops.import_scene.gltf(filepath=GLB)
kuori = next(o for o in sc.objects if o.type == 'MESH')
bpy.ops.object.select_all(action='DESELECT'); kuori.select_set(True); bpy.context.view_layer.objects.active = kuori
sc.render.bake.margin = 4

def leivo_geometria(ulostulo, siirto, skaala):
    """Leipoo Geometry-solmun vektorin (Position/Normal) emissiona UV0:aan: arvo = (v + siirto) / skaala."""
    kuva = bpy.data.images.new(ulostulo, N, N, float_buffer=True)
    for s in kuori.material_slots:
        nt = s.material.node_tree
        for n in [n for n in nt.nodes if n.get('ikkuna')]: nt.nodes.remove(n)
        g = nt.nodes.new('ShaderNodeNewGeometry'); vm = nt.nodes.new('ShaderNodeVectorMath'); vm.operation = 'MULTIPLY_ADD'
        vm.inputs[1].default_value = (1 / skaala,) * 3; vm.inputs[2].default_value = (siirto / skaala,) * 3
        e = nt.nodes.new('ShaderNodeEmission'); o = nt.nodes.new('ShaderNodeOutputMaterial'); t = nt.nodes.new('ShaderNodeTexImage')
        t.image = kuva
        for n in (g, vm, e, o, t): n['ikkuna'] = 1
        nt.links.new(g.outputs[ulostulo], vm.inputs[0]); nt.links.new(vm.outputs[0], e.inputs['Color'])
        nt.links.new(e.outputs[0], o.inputs['Surface']); nt.nodes.active = t; o.is_active_output = True
    bpy.ops.object.bake(type='EMIT')
    p = np.empty(N * N * 4, np.float32); kuva.pixels.foreach_get(p); p = p.reshape(N, N, 4)
    return p[..., :3] * skaala - siirto, p[..., 3]

SIIRTO, SKAALA = 200.0, 400.0
pos, peitto = leivo_geometria('Position', SIIRTO, SKAALA)
nor, _ = leivo_geometria('Normal', 1.0, 2.0)
peitto = (np.abs(pos + SIIRTO).sum(-1) > 1e-3)  # leivottu tekseli (tausta jää nollaksi)
gl = np.stack([pos[..., 0], pos[..., 2], -pos[..., 1]], -1)  # Blender → glTF (x, z, −y)

def lataa(polku, koko):
    k = bpy.data.images.load(polku)
    if k.size[0] != koko: k.scale(koko, koko)
    p = np.empty(koko * koko * 4, np.float32); k.pixels.foreach_get(p); return p.reshape(koko, koko, 4)[..., :3]

def laatikkosumennus(x, r):
    """Erotettava laatikkosumennus kumulatiivisilla summilla (reunat venytetty)."""
    for akseli in (0, 1):
        x = np.pad(x, [(r + 1, r) if i == akseli else (0, 0) for i in range(x.ndim)], mode='edge')
        c = np.cumsum(x, axis=akseli)
        x = (np.take(c, range(2 * r + 1, c.shape[akseli]), axis=akseli) - np.take(c, range(0, c.shape[akseli] - 2 * r - 1), axis=akseli)) / (2 * r + 1)
    return x

valo = lataa(KUVA, N); L = valo @ np.array([0.2126, 0.7152, 0.0722], np.float32)
w = peitto.astype(np.float32)
if os.environ.get('IKKUNAT_NPY'):  # vianetsintä: välitulokset numpyna
    np.savez_compressed(os.path.join(ULOS, 'valitulokset.npz'), gl=gl.astype(np.float16), nor=nor.astype(np.float16), L=L, peitto=peitto)
rak = json.load(open(RAK)); tilat = {t['id']: t for t in rak['tilat']}
if KAIKKI:
    sisalla = np.ones((N, N), bool)
else:
    sisalla = np.zeros((N, N), bool)
    for tid in LAATIKOT:
        if tid in NIMETYT:
            lo, hi = (np.array(v, np.float32) for v in NIMETYT[tid])
        else:
            b = tilat[tid].get('leikkaus') or tilat[tid]['rajat']
            lo, hi = np.array(b['min']) - 1.5, np.array(b['max']) + 1.5
        sisalla |= np.all((gl >= lo) & (gl <= hi), -1)
pysty = np.abs(nor[..., 2]) < 0.35  # Blender z = ylös

# Tunnistus JULKISIVUN TASOSSA, ei UV:ssa (fotogrammetrian atlas on pieninä saarina, ikkuna ≈ 6 tekseliä): pystytekselit
# ryhmitellään normaalin atsimuutin (30° sektorit) ja seinän syvyyden (3 m) mukaan, ja kukin ryhmä rasteroidaan
# 0,12 m:n ruudukkoon (u = seinän suuntaan, v = korkeus). Ikkuna = ruudukossa yhtenäinen läiskä, joka on selvästi
# ympäröivää 1,5 m:n keskiarvoa tummempi.
RUUTU = 0.12
maski = np.zeros((N, N), np.float32); hehku = np.zeros((N, N), np.float32)
valinta = peitto & sisalla & pysty
iy, ix = np.nonzero(valinta)
P = gl[iy, ix]; Nn = np.stack([nor[iy, ix, 0], -nor[iy, ix, 1]], -1)  # glTF (x, z) -vaakanormaali
Lv = L[iy, ix]
ky, kx = np.nonzero(peitto & sisalla); Kaikki = gl[ky, kx]  # kaikki laatikoiden tekselit suunnasta riippumatta
sektori = np.round(np.degrees(np.arctan2(Nn[:, 0], Nn[:, 1])) / 30).astype(int) % 12
def sumenna(x, r): return laatikkosumennus(x, r)
def maksimi(x, ru, rv):
    """Suorakaiteen maksimisuodin (u-säde ru, v-säde rv ruutuina)."""
    y = x.copy()
    for d in range(1, ru + 1): y[:, d:] = np.maximum(y[:, d:], x[:, :-d]); y[:, :-d] = np.maximum(y[:, :-d], x[:, d:])
    x = y.copy()
    for d in range(1, rv + 1): y[d:] = np.maximum(y[d:], x[:-d]); y[:-d] = np.maximum(y[:-d], x[d:])
    return y
for sk in range(12):
    ss = np.nonzero(sektori == sk)[0]
    if len(ss) < 400: continue
    c = np.radians(sk * 30); n_ = np.array([np.sin(c), np.cos(c)]); t_ = np.array([np.cos(c), -np.sin(c)])
    u = P[ss][:, [0, 2]] @ t_; syv = P[ss][:, [0, 2]] @ n_; v = P[ss][:, 1]
    for kerros in np.unique(np.floor(syv / 3)):
        kk = ss[np.floor(syv / 3) == kerros]; uu = u[np.floor(syv / 3) == kerros]; vv = v[np.floor(syv / 3) == kerros]
        if len(kk) < 400: continue
        gu = ((uu - uu.min()) / RUUTU).astype(int); gv = ((vv - vv.min()) / RUUTU).astype(int)
        W_, H_ = gu.max() + 1, gv.max() + 1
        solu = gv * W_ + gu
        summa = np.bincount(solu, Lv[kk], H_ * W_).reshape(H_, W_); lkm = np.bincount(solu, None, H_ * W_).reshape(H_, W_).astype(np.float32)
        summa2 = np.bincount(solu, Lv[kk] ** 2, H_ * W_).reshape(H_, W_)
        ok = (lkm > 0).astype(np.float32)
        pieni = sumenna(summa, 2) / np.maximum(sumenna(lkm, 2), 1e-4)  # ikkunan kokoinen (0,6 m)
        iso = sumenna(summa, 12) / np.maximum(sumenna(lkm, 12), 1e-4)
        hajonta = np.sqrt(np.maximum(sumenna(summa2, 12) / np.maximum(sumenna(lkm, 12), 1e-4) - iso ** 2, 1e-6))
        sisus = (sumenna(ok, 4) > 0.55) & (sumenna(ok, 1) > 0.3)  # julkisivun reunat (räystäs, nurkat) eivät ole ikkunoita
        yla = np.zeros_like(sisus); yla[:-7] = sumenna(ok, 2)[7:] > 0.3; sisus &= yla  # räystään varjo: seinää oltava 0,8 m yllä
        z = (iso - pieni) / hajonta * sisus  # kuinka monta hajontaa ympäristöä tummempi
        # Paikalliset huiput (ikkunaväli ≥ 1,3 m) ja niiden ympärille aukon kokoinen suorakaide 1,08 × 1,32 m.
        huippu = ((z >= maksimi(z, 5, 5)) & (z > KYNNYS)).astype(np.float32)
        if os.environ.get('IKKUNAT_NPY'): print('IKKUNAT: ryhmä', sk * 30, int(kerros), W_, H_, 'z max', round(float(z.max()), 2), 'huippuja', int(huippu.sum()), 'hajonta', round(float(np.median(hajonta)), 3), 'iso', round(float(np.median(iso)), 3))
        ikkuna = np.clip(sumenna(maksimi(huippu, 4, 5), 1) * 1.3, 0, 1)
        kaje = sumenna(ikkuna, 5)  # valon kajo seinälle aukon ympärille (≈ 0,6 m)
        # Aukon kaikki tekselit (myös syvennyksen pielet ja kohinaiset normaalit) julkisivun syvyydeltä ±0,8 m.
        syv_k = syv[np.floor(syv / 3) == kerros]
        pu = Kaikki[:, [0, 2]] @ t_; ps = Kaikki[:, [0, 2]] @ n_
        au = np.round((pu - uu.min()) / RUUTU).astype(int); av = np.round((Kaikki[:, 1] - vv.min()) / RUUTU).astype(int)
        mukana = (ps > syv_k.min() - 0.8) & (ps < syv_k.max() + 0.8) & (au >= 0) & (au < W_) & (av >= 0) & (av < H_)
        j = np.nonzero(mukana)[0]
        maski[ky[j], kx[j]] = np.maximum(maski[ky[j], kx[j]], ikkuna[av[j], au[j]])
        hehku[ky[j], kx[j]] = np.maximum(hehku[ky[j], kx[j]], kaje[av[j], au[j]])
        if os.environ.get('IKKUNAT_NPY') and len(kk) > 3000:
            kuva = np.stack([pieni / max(float(iso.max()), 1e-3), ikkuna, ikkuna * 0], -1)[::-1]
            tk = bpy.data.images.new('g', W_, H_); tk.pixels.foreach_set(np.concatenate([np.clip(kuva[::-1], 0, 1), np.ones((H_, W_, 1))], -1).astype(np.float32).ravel())
            tk.filepath_raw = os.path.join(ULOS, f'julkisivu-{sk * 30}-{int(kerros)}.png'); tk.file_format = 'PNG'; tk.save()
print('IKKUNAT: tekseleitä', int((maski > 0.5).sum()), '/', int((peitto & sisalla).sum()), 'laatikoissa')

H = lataa(HAMARA, 4096)
m4 = np.repeat(np.repeat(maski, 2, 0), 2, 1)[..., None]; h4 = np.repeat(np.repeat(hehku, 2, 0), 2, 1)[..., None]
# JPEG-pikselit ovat sRGB-arvoja (tavukuva): aukko korvautuu lämpimällä hehkulla (ei tummemmaksi kuin ennen).
ulos = H * (1 - m4) + m4 * np.maximum(H, LAMMIN * 0.9 * VOIMA) + h4 * LAMMIN * 0.22 * VOIMA
def tallenna(arr, nimi, koko):
    k = bpy.data.images.new(nimi, koko, koko)  # tavukuva: arvot tallentuvat sRGB:nä sellaisenaan
    k.pixels.foreach_set(np.concatenate([np.clip(arr, 0, 1), np.ones((koko, koko, 1), np.float32)], -1).ravel())
    k.filepath_raw = os.path.join(ULOS, nimi); k.file_format = 'JPEG' if nimi.endswith('jpg') else 'PNG'
    k.save(quality=90) if nimi.endswith('jpg') else k.save()
tallenna(ulos, 'ulkokuori-hamara-4k.jpg', 4096)
tallenna(ulos.reshape(2048, 2, 2048, 2, 3).mean((1, 3)), 'ulkokuori-hamara-2k.jpg', 2048)
tallenna(np.repeat(maski[..., None], 3, -1), 'ikkunamaski.png', N)
print('IKKUNAT: valmis', ULOS)
