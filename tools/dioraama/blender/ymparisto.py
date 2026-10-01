# Olavinlinnan ympäristö: Kyrönsalmen rannat ja saaret (Linnanrakentaja 30.9.2026, laatusuunnitelman vaihe 5;
# Päätoimittajan hyväksyntä 30.9. klo 23.4x). Lähteet: Maanmittauslaitos, korkeusmalli 2 m ja ortokuva 2024
# (CC BY 4.0, lehti N5311A, ladattu CSC:n/Funetin avoimen datan peilistä), ks. _lahteet/mml-kyronsalmi/LAHDE.md.
# Rekisteröinti (ortokuvan ja kuoren yläkuvan korrelaatio 30.9.): kuoren origo = ETRS-TM35FIN (599993, 6860483),
# kierto 0°, Saimaan pinta N2000 75,7 m = kuoren vesi −7 (z = h − 82,7).
#   nice -n 15 Blender -b -P ymparisto.py -- <dem.raw> <orto.png (lehden koko, 0,5 m/px)> <ulos-kansio>
#     [--sade 2000] [--kolmiot 380000,130000,42000] [--latvus puut-chm.npy --latvus-r 520]
# Tulos: ymparisto_{huippu,normaali,kevyt}.glb (UV = ortokuvan rajaus) + ymparisto-{8k,4k,2k}.jpg. Kuoren alue
# (x ±94, y ±53 m) jätetään pois, vesi jää pelin omaksi (maan reuna ulottuu 0,3 m vedenpinnan alle).
import bpy, math, os, sys, time
import numpy as np
A = sys.argv[sys.argv.index('--') + 1:]
DEM, ORTO, ULOS = A[:3]
SADE = float(A[A.index('--sade') + 1]) if '--sade' in A else 2000.0
KOLMIOT = [int(x) for x in (A[A.index('--kolmiot') + 1] if '--kolmiot' in A else '380000,130000,42000').split(',')]
# --latvus <puut-chm.npy> (ymparisto_puut.py): metsä maastoon latvuspintana kauempana kuin --latvus-r m linnasta
# (lähemmät puut ovat kortteja; 1.10.). Latvuspinta = 0,85 × latvuskorkeus 4 m:n maksimi + tasoitus.
LATVUS = A[A.index('--latvus') + 1] if '--latvus' in A else None
LATVUS_R = float(A[A.index('--latvus-r') + 1]) if '--latvus-r' in A else 520.0
N1500 = A[A.index('--n1500') + 1] if '--n1500' in A else None  # ymparisto_n1500.py: kaupunki metsäksi
# --avoin R --niitty <kuva>: linnan lähirannat R m:n säteellä niittyä (Päätoimittaja 1.10.: linnan ympäristö pidettiin
# puuttomana puolustuksen, polttopuun ja laidunten vuoksi); siirtymä 100 m, kalliot (MTK 34100) säilyvät.
AVOIN = float(A[A.index('--avoin') + 1]) if '--avoin' in A else 0.0
NIITTY = A[A.index('--niitty') + 1] if '--niitty' in A else None
LOHKOT = 2   # 2 × 2 lohkoa normaalissa ja huipussa (Siirtoseppä: näkymärajaus), kevyessä yksi
NIMET = ['huippu', 'normaali', 'kevyt']
LEHTI = (596000.0, 6858000.0, 602000.0, 6864000.0)   # N5311A: E0, N0, E1, N1
ORIGO = (599993.0, 6860483.0); VESI_H = 75.7; VESI_Z = -7.0
KUORI = (-94.0, 94.0, -53.0, 53.0)
os.makedirs(ULOS, exist_ok=True)
t0 = time.time()
bpy.ops.wm.read_factory_settings(use_empty=True); sc = bpy.context.scene

# --- korkeusmalli: 2 m ruutu, rivi 0 = pohjoisreuna ---
# Blender luki LZW-pakatun float-TIFFin väärin (30.9.), joten DEM annetaan raakana: <nimi>.raw = float32, rivi 0 =
# pohjoinen, koko neliö (3000 × 3000 lehdellä). Muunnos: python3 -c "from PIL import Image; im=Image.open('x.tif');
# open('x.raw','wb').write(im.tobytes())".
d = np.fromfile(DEM, np.float32); w = h = int(round(math.sqrt(d.size))); d = d.reshape(h, w)
RES = (LEHTI[2] - LEHTI[0]) / w
c0 = int((ORIGO[0] - SADE - LEHTI[0]) / RES); c1 = int((ORIGO[0] + SADE - LEHTI[0]) / RES)
r0 = int((LEHTI[3] - (ORIGO[1] + SADE)) / RES); r1 = int((LEHTI[3] - (ORIGO[1] - SADE)) / RES)
c0, r0 = max(c0, 0), max(r0, 0); c1, r1 = min(c1, w - 1), min(r1, h - 1)
Z = d[r0:r1 + 1, c0:c1 + 1].astype(np.float64)
ny, nx = Z.shape
xs = LEHTI[0] + (np.arange(c0, c1 + 1) + 0.5) * RES - ORIGO[0]
ys = LEHTI[3] - (np.arange(r0, r1 + 1) + 0.5) * RES - ORIGO[1]
X, Y = np.meshgrid(xs, ys)
maa = Z > VESI_H + 0.05
if N1500:
    # Aikakerros n1500: kaupunkimaskin kapeat maakaistaleet (pengertiet, siltojen maatuet, laiturit) vedeksi:
    # avaus 10 m (kaventaa ja levittää maata), vain maskin sisällä.
    MKd = np.load(N1500)['maski'][::-1]  # 1 m, rivi 0 = pohjoinen
    iyy = np.clip((np.arange(r0, r1 + 1) - int((LEHTI[3] - (ORIGO[1] + SADE)) / RES)) * int(RES), 0, MKd.shape[0] - 1)
    ixx = np.clip((np.arange(c0, c1 + 1) - int((ORIGO[0] - SADE - LEHTI[0]) / RES)) * int(RES), 0, MKd.shape[1] - 1)
    mk2 = MKd[iyy][:, ixx]
    def _morf(m, k, ja):
        for _ in range(k):
            q = np.pad(m, 1, constant_values=ja); nb = [q[a:a + m.shape[0], b:b + m.shape[1]] for a in range(3) for b in range(3)]
            m = np.logical_and.reduce(nb) if ja else np.logical_or.reduce(nb)
        return m
    avattu = _morf(_morf(maa, 5, True), 5, False)
    ennen = maa.sum(); maa = np.where(mk2, avattu & maa, maa)
    print(f'YMP: n1500 kapeat maakaistaleet vedeksi {int(ennen - maa.sum())} ruutua')
# Ranta (1.10., Päätoimittajan havainnot): järven rantatörmä (1–2 m) putosi lähes pystysuoraan ja näytti paksulta laatalta.
# Etäisyys rantaan molemmin puolin (8-naapurin laajennus, ruutuina): maalla RANTA_M m:n vyöhyke laskee pehmeästi
# (smoothstep) vedenpinnan tasolle, vedessä pohja viettää loivasti (0,25 m/m, enintään 3 m).
def etaisyys(m, n_max):
    et = np.where(m, 0, n_max + 1).astype(np.float32); r = m.copy(); ny_, nx_ = m.shape
    for k in range(1, n_max + 1):
        q = np.pad(r, 1); uusi = np.logical_or.reduce([q[a:a + ny_, b:b + nx_] for a in range(3) for b in range(3)]) & ~r
        et[uusi] = k; r |= uusi
    return et
RANTA_M = 10.0
d_maa = etaisyys(~maa, int(RANTA_M / RES)) * RES      # maaruudun etäisyys veteen
d_vesi = etaisyys(maa, 6) * RES                         # vesiruudun etäisyys maahan
t = np.clip(d_maa / RANTA_M, 0, 1); t = t * t * (3 - 2 * t)
z_maa = VESI_Z + 0.05 + (Z - VESI_H - 0.05) * t
z = np.where(maa, z_maa, VESI_Z - np.minimum(3.0, 0.25 * d_vesi))
if LATVUS:
    C = np.load(LATVUS)  # 1 m, rivi 0 = etelä (N0), sarake 0 = länsi (E0), E0/N0 = ORIGO − SADE
    k = int(round(RES)); C = C[:C.shape[0] // k * k, :C.shape[1] // k * k].reshape(C.shape[0] // k, k, C.shape[1] // k, k).max((1, 3))
    for _ in range(2):  # 4 m:n maksimi ja tasoitus: latvuksista yhtenäinen metsämassa
        q = np.pad(C, 1, mode='edge'); C = np.maximum(C, np.max([q[a:a + C.shape[0], b:b + C.shape[1]] for a in range(3) for b in range(3)], 0))
    for _ in range(3):
        q = np.pad(C, 1, mode='edge'); C = sum(q[a:a + C.shape[0], b:b + C.shape[1]] for a in range(3) for b in range(3)) / 9
    C = C[::-1]; C = np.pad(C, ((0, max(0, ny - C.shape[0])), (0, max(0, nx - C.shape[1]))), mode='edge')[:ny, :nx]  # rivi 0 = pohjoinen
    et = np.hypot(X, Y); paino = np.clip((et - LATVUS_R) / 60.0, 0, 1)
    z = np.where(maa, z + 0.85 * np.where(C > 3, C, 0) * paino, z)
    print(f'YMP: latvuspinta yli {LATVUS_R:.0f} m, keskikorkeus metsässä {np.mean(C[(C > 3) & maa]):.1f} m')
print(f'YMP: DEM {nx}×{ny} ruutua ({RES} m), maata {maa.mean():.2f}, korkeus {Z.max() - VESI_H:.1f} m vedestä')

np.savez_compressed(os.path.join(ULOS, 'maasto-z.npz'), z=np.where(maa, z_maa, VESI_Z - 0.5).astype(np.float32), x0=xs[0], y0=ys[0], res=RES)  # puiden juuret (jalki)
# --- pinnat: ruutu mukaan, jos jokin kulma on maata (rannan reuna jatkuu veden alle) ja ruutu ei ole kuoren alueella ---
kulma_maa = maa[:-1, :-1] | maa[1:, :-1] | maa[:-1, 1:] | maa[1:, 1:]
cx = (X[:-1, :-1] + X[1:, 1:]) / 2; cy = (Y[:-1, :-1] + Y[1:, 1:]) / 2
kuori = (cx > KUORI[0]) & (cx < KUORI[1]) & (cy > KUORI[2]) & (cy < KUORI[3])
mukana = kulma_maa & ~kuori
ii, jj = np.nonzero(mukana)
idx = np.arange(ny * nx).reshape(ny, nx)
quads = np.stack([idx[ii + 1, jj], idx[ii + 1, jj + 1], idx[ii, jj + 1], idx[ii, jj]], 1)  # vastapäivään ylhäältä
kaytetyt = np.unique(quads); uusi = -np.ones(ny * nx, np.int64); uusi[kaytetyt] = np.arange(len(kaytetyt))
V = np.stack([X.ravel(), Y.ravel(), z.ravel()], 1)[kaytetyt]; Q = uusi[quads]
me = bpy.data.meshes.new('ymparisto')
me.vertices.add(len(V)); me.vertices.foreach_set('co', V.astype(np.float32).ravel())
me.loops.add(Q.size); me.loops.foreach_set('vertex_index', Q.astype(np.int32).ravel())
me.polygons.add(len(Q)); me.polygons.foreach_set('loop_start', np.arange(0, Q.size, 4, dtype=np.int32)); me.polygons.foreach_set('loop_total', np.full(len(Q), 4, np.int32))
me.update(calc_edges=True); me.validate()
# UV: ortokuvan rajaus (sama alue kuin DEM-rajaus)
E0 = LEHTI[0] + c0 * RES - ORIGO[0]; E1 = LEHTI[0] + (c1 + 1) * RES - ORIGO[0]
N0 = LEHTI[3] - (r1 + 1) * RES - ORIGO[1]; N1 = LEHTI[3] - r0 * RES - ORIGO[1]
uvl = me.uv_layers.new(name='UVMap'); lv = np.empty(len(me.loops), np.int32); me.loops.foreach_get('vertex_index', lv)
co = V[lv]; uv = np.stack([(co[:, 0] - E0) / (E1 - E0), (co[:, 1] - N0) / (N1 - N0)], 1)
uvl.data.foreach_set('uv', uv.astype(np.float32).ravel())
ob = bpy.data.objects.new('ymparisto', me); sc.collection.objects.link(ob)
for p in me.polygons: p.use_smooth = True
print(f'YMP: verkko {len(me.polygons)} nelikulmiota, {time.time() - t0:.0f} s')

# --- ortokuva: rajaus samaan alueeseen, 8k/4k/2k ---
oim = bpy.data.images.load(ORTO); ow, oh = oim.size; ORES = (LEHTI[2] - LEHTI[0]) / ow
ox0 = int(round((E0 + ORIGO[0] - LEHTI[0]) / ORES)); ox1 = int(round((E1 + ORIGO[0] - LEHTI[0]) / ORES))
oy0 = int(round((LEHTI[3] - (N1 + ORIGO[1])) / ORES)); oy1 = int(round((LEHTI[3] - (N0 + ORIGO[1])) / ORES))
op = np.empty(ow * oh * 4, np.float32); oim.pixels.foreach_get(op); op = op.reshape(oh, ow, 4)[::-1]  # rivi 0 = pohjoinen
raj = op[oy0:oy1, ox0:ox1]; del op; bpy.data.images.remove(oim)
print(f'YMP: ortokuva {raj.shape[1]}×{raj.shape[0]} px ({ORES} m/px)')
# Vesipikselit täytetään lähimmän maan värillä (push-pull): rannan loiva vyöhyke ulottuu veteen, ja ortokuvan tumma
# vesi piirsi siihen paksun tumman reunan (1.10.). Maa-maski DEM:stä, rannalta 1,5 m sisään (sekapikselit pois).
import sys as _s; _s.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kuori_tex import push_pull
K = 8192
k8 = bpy.data.images.new('ymparisto-8k', raj.shape[1], raj.shape[0]); k8.pixels.foreach_set(np.ascontiguousarray(raj[::-1]).ravel()); k8.scale(K, K)
del raj
px8 = np.empty(K * K * 4, np.float32); k8.pixels.foreach_get(px8); px8 = px8.reshape(K, K, 4)[::-1]  # rivi 0 = pohjoinen
iy = np.clip((np.arange(K) + 0.5) / K * ny, 0, ny - 1).astype(int); ix = np.clip((np.arange(K) + 0.5) / K * nx, 0, nx - 1).astype(int)
mm = maa[iy][:, ix]
for _ in range(3):
    q = np.pad(mm, 1, constant_values=True); mm = np.logical_and.reduce([q[a:a + K, b:b + K] for a in range(3) for b in range(3)])
px8[..., :3] = np.where(mm[..., None], px8[..., :3], push_pull(px8[..., :3], mm)); px8[..., 3] = 1
if N1500:
    # Kaupunkimaskin alue metsäksi: ortokuvan luonnonmetsästä (latvus > 12 m, ei maskissa) 48 m:n laattoja
    # satunnaisin siirroin ja 6 m:n sulautuksella; reuna sulautetaan 5 m:n matkalla.
    g = np.load(N1500); MK = g['maski']  # 1 m, rivi 0 = etelä
    Ck = np.load(LATVUS) if LATVUS else None
    jy = np.clip(((np.arange(K) + 0.5) / K * MK.shape[0]).astype(int), 0, MK.shape[0] - 1)
    mk8 = MK[::-1][jy][:, jy]  # rivi 0 = pohjoinen, K × K
    lahde = mm & ~mk8
    if Ck is not None: lahde &= (Ck[::-1][jy][:, jy] > 6)
    T = int(48 / (4000.0 / K)); F = int(6 / (4000.0 / K)); rng = np.random.default_rng(21); TT = T + 2 * F
    kirkas = px8[..., :3].mean(-1) > 0.42  # mökkien katot ym. vaaleat pisteet lähdemetsästä pois
    ok_l = (lahde & ~kirkas).astype(np.int32); I = np.pad(ok_l.cumsum(0).cumsum(1), ((1, 0), (1, 0)))
    ly, lx = np.mgrid[0:K - TT:16, 0:K - TT:16]; ly = ly.ravel(); lx = lx.ravel()
    tays = (I[ly + TT, lx + TT] - I[ly, lx + TT] - I[ly + TT, lx] + I[ly, lx]) >= 0.9 * TT * TT  # laatta lähes kokonaan metsää
    ly, lx = ly[tays], lx[tays]
    print(f'YMP: n1500 lähdelaattoja {len(ly)}')
    synt = np.zeros((K, K, 3), np.float32); wsum = np.zeros((K, K), np.float32)
    ramp = np.minimum(1, np.minimum(np.arange(T + 2 * F) + 1, np.arange(T + 2 * F)[::-1] + 1) / F).astype(np.float32); wt = ramp[:, None] * ramp[None, :]
    nb = K // T; lohko = mk8[:nb * T, :nb * T].reshape(nb, T, nb, T).any((1, 3))  # laatta jokaiseen lohkoon, jossa on maskia
    yy, xx = np.nonzero(lohko); yy *= T; xx *= T
    kuva8 = px8  # rivi 0 = pohjoinen (vesipikselit jo täytetty)
    for y0, x0 in zip(yy, xx):
        i = rng.integers(len(ly)); sy, sx = ly[i], lx[i]
        ty0, tx0 = y0 - F, x0 - F; a0, b0 = max(ty0, 0), max(tx0, 0); a1, b1 = min(ty0 + T + 2 * F, K), min(tx0 + T + 2 * F, K)
        pala = kuva8[sy + (a0 - ty0):sy + (a1 - ty0), sx + (b0 - tx0):sx + (b1 - tx0), :3]; w_ = wt[a0 - ty0:a1 - ty0, b0 - tx0:b1 - tx0]
        synt[a0:a1, b0:b1] += pala * w_[..., None]; wsum[a0:a1, b0:b1] += w_
    synt /= np.maximum(wsum, 1e-6)[..., None]
    reuna = mk8.astype(np.float32)
    for _ in range(int(5 / (4000.0 / K))):
        q = np.pad(reuna, 1, mode='edge'); reuna = sum(q[a:a + K, b:b + K] for a in range(3) for b in range(3)) / 9
    reuna = np.where(mk8, np.maximum(reuna, 0.999), reuna)
    kuva8[..., :3] = kuva8[..., :3] * (1 - reuna[..., None]) + synt * reuna[..., None]
    del synt
    print(f'YMP: n1500 kaupunki metsäksi ({mk8.mean():.2f} tekstuurista, {len(yy)} laattaa)')
if AVOIN > 0 and NIITTY:
    ni = bpy.data.images.load(NIITTY); nw = ni.size[0]; pn = np.empty(nw * nw * 4, np.float32); ni.pixels.foreach_get(pn)
    pn = pn.reshape(nw, nw, 4)[::-1, :, :3]; MM = 4000.0 / K; LAATTA_M = 40.0  # niittylaatta 40 m (lähde 15 m, väljempi rakenne)
    yyk, xxk = np.mgrid[0:K, 0:K].astype(np.float32)
    xm = xxk * MM - SADE; ym = SADE - yyk * MM  # kuoren koordinaatit (rivi 0 = pohjoinen)
    u = ((xm / LAATTA_M) % 1.0 * nw).astype(int); v = ((ym / LAATTA_M) % 1.0 * nw).astype(int)
    niitty = pn[v, u]
    rng = np.random.default_rng(31); kk = rng.standard_normal((K // 64 + 2, K // 64 + 2)).astype(np.float32)
    kk = np.kron(kk, np.ones((64, 64), np.float32))[:K, :K]
    for _ in range(3):
        q = np.pad(kk, 16, mode='edge'); kk = sum(q[a:a + K, b:b + K] for a in range(0, 33, 16) for b in range(0, 33, 16)) / 9
    niitty = niitty * (1 + 0.12 * kk / (kk.std() + 1e-6))[..., None]  # laikukkuus (laidun, kaski)
    # sävy ortokuvan luonnonalueiden (niitty, kallio) mukaiseksi: vähemmän keltaista, hieman tummempi
    harmaa = niitty.mean(-1, keepdims=True); niitty = (0.55 * niitty + 0.45 * harmaa) * np.array([0.78, 0.86, 0.80], np.float32)
    et = np.hypot(xm, ym); w_ = np.clip((AVOIN + 100 - et) / 100, 0, 1) * mm
    if N1500:  # kalliot (MTK 34100): harmaa kallio niityn sijaan, sama siirtymä
        ka = np.load(N1500)['kallio'][::-1]; jyk = np.clip(((np.arange(K) + 0.5) / K * ka.shape[0]).astype(int), 0, ka.shape[0] - 1)
        kal = ka[jyk][:, jyk]; niitty = np.where(kal[..., None], harmaa * np.array([0.95, 0.95, 0.92], np.float32) * 0.9, niitty)
    px8[..., :3] = px8[..., :3] * (1 - w_[..., None]) + np.clip(niitty, 0, 1) * w_[..., None]
    print(f'YMP: avoin vyöhyke {AVOIN:.0f} m niityksi ({(w_ > 0.5).mean():.3f} tekstuurista)')
    del niitty, yyk, xxk, xm, ym, u, v
k8.pixels.foreach_set(np.ascontiguousarray(px8[::-1]).ravel()); del px8
print(f'YMP: vesipikselit täytetty maan värillä ({(~mm).mean():.2f})')
kuvat = {}
for koko in (8192, 4096, 2048):
    k = k8 if koko == K else k8.copy()
    if koko != K: k.scale(koko, koko)
    k.name = f'ymparisto-{koko // 1024}k'
    k.filepath_raw = os.path.join(ULOS, f'ymparisto-{koko // 1024}k.jpg'); k.file_format = 'JPEG'; k.save(quality=90)
    kuvat[koko] = k
mat = bpy.data.materials.new('ymparisto'); mat.use_nodes = True; nt = mat.node_tree
bsdf = nt.nodes['Principled BSDF']; tex = nt.nodes.new('ShaderNodeTexImage'); tex.image = kuvat[4096]
nt.links.new(tex.outputs['Color'], bsdf.inputs['Base Color']); bsdf.inputs['Roughness'].default_value = 0.9
me.materials.append(mat)

# --- laatutasot: harvennus (collapse), vienti glb (tekstuuri erikseen JPEG:nä, glb:ssä 2k) ---
tex.image = kuvat[2048]
for nimi, kohde in zip(NIMET, KOLMIOT):
    k = ob.copy(); k.data = ob.data.copy(); sc.collection.objects.link(k)
    nyt = len(k.data.polygons) * 2
    if kohde < nyt:
        m = k.modifiers.new('kevennys', 'DECIMATE'); m.ratio = kohde / nyt
        bpy.ops.object.select_all(action='DESELECT'); k.select_set(True); bpy.context.view_layer.objects.active = k
        bpy.ops.object.modifier_apply(modifier=m.name)
    osat = [k]
    if nimi != 'kevyt':  # 2 × 2 lohkoa (erotus pintojen keskipisteen neljänneksen mukaan)
        import bmesh
        bpy.ops.object.select_all(action='DESELECT'); k.select_set(True); bpy.context.view_layer.objects.active = k
        bpy.ops.object.mode_set(mode='EDIT'); bm = bmesh.from_edit_mesh(k.data)
        for f in bm.faces: c = f.calc_center_median(); f.select = c.x < 0 and c.y < 0
        bmesh.update_edit_mesh(k.data); bpy.ops.mesh.separate(type='SELECTED')
        for f in bm.faces: c = f.calc_center_median(); f.select = c.x >= 0 and c.y < 0
        bmesh.update_edit_mesh(k.data); bpy.ops.mesh.separate(type='SELECTED')
        for f in bm.faces: c = f.calc_center_median(); f.select = c.x < 0 and c.y >= 0
        bmesh.update_edit_mesh(k.data); bpy.ops.mesh.separate(type='SELECTED')
        bpy.ops.object.mode_set(mode='OBJECT'); osat = [o for o in bpy.context.selected_objects]
    bpy.ops.object.select_all(action='DESELECT')
    for o in osat: o.select_set(True)
    p = os.path.join(ULOS, f'ymparisto_{nimi}.glb')
    bpy.ops.export_scene.gltf(filepath=p, use_selection=True, export_format='GLB', export_image_format='JPEG',
                              export_jpeg_quality=85, export_texcoords=True, export_normals=True, export_materials='EXPORT')
    print(f'YMP: {nimi} {sum(sum(len(q.vertices) - 2 for q in o.data.polygons) for o in osat)} kolmiota, {len(osat)} lohkoa, '
          f'{os.path.getsize(p) / 1e6:.1f} Mt')
    for o in osat: bpy.data.objects.remove(o)
print(f'YMP: valmis {time.time() - t0:.0f} s', ULOS)
