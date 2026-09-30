# Olavinlinnan ympäristö: Kyrönsalmen rannat ja saaret (Linnanrakentaja 30.9.2026, laatusuunnitelman vaihe 5;
# Päätoimittajan hyväksyntä 30.9. klo 23.4x). Lähteet: Maanmittauslaitos, korkeusmalli 2 m ja ortokuva 2024
# (CC BY 4.0, lehti N5311A, ladattu CSC:n/Funetin avoimen datan peilistä), ks. _lahteet/mml-kyronsalmi/LAHDE.md.
# Rekisteröinti (ortokuvan ja kuoren yläkuvan korrelaatio 30.9.): kuoren origo = ETRS-TM35FIN (599993, 6860483),
# kierto 0°, Saimaan pinta N2000 75,7 m = kuoren vesi −7 (z = h − 82,7).
#   nice -n 15 Blender -b -P ymparisto.py -- <dem.raw> <orto.png (lehden koko, 0,5 m/px)> <ulos-kansio>
#     [--sade 2000] [--kolmiot 400000,150000,50000]
# Tulos: ymparisto_{huippu,normaali,kevyt}.glb (UV = ortokuvan rajaus) + ymparisto-{8k,4k,2k}.jpg. Kuoren alue
# (x ±94, y ±53 m) jätetään pois, vesi jää pelin omaksi (maan reuna ulottuu 0,3 m vedenpinnan alle).
import bpy, math, os, sys, time
import numpy as np
A = sys.argv[sys.argv.index('--') + 1:]
DEM, ORTO, ULOS = A[:3]
SADE = float(A[A.index('--sade') + 1]) if '--sade' in A else 2000.0
KOLMIOT = [int(x) for x in (A[A.index('--kolmiot') + 1] if '--kolmiot' in A else '400000,150000,50000').split(',')]
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
z = np.where(maa, Z - VESI_H + VESI_Z, VESI_Z - 0.3)
print(f'YMP: DEM {nx}×{ny} ruutua ({RES} m), maata {maa.mean():.2f}, korkeus {Z.max() - VESI_H:.1f} m vedestä')

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
kuvat = {}
for koko in (8192, 4096, 2048):
    k = bpy.data.images.new(f'ymparisto-{koko // 1024}k', raj.shape[1], raj.shape[0])
    k.pixels.foreach_set(np.ascontiguousarray(raj[::-1]).ravel()); k.scale(koko, koko)
    k.filepath_raw = os.path.join(ULOS, f'ymparisto-{koko // 1024}k.jpg'); k.file_format = 'JPEG'; k.save(quality=90)
    kuvat[koko] = k
del raj
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
    bpy.ops.object.select_all(action='DESELECT'); k.select_set(True); bpy.context.view_layer.objects.active = k
    p = os.path.join(ULOS, f'ymparisto_{nimi}.glb')
    bpy.ops.export_scene.gltf(filepath=p, use_selection=True, export_format='GLB', export_image_format='JPEG',
                              export_jpeg_quality=85, export_texcoords=True, export_normals=True, export_materials='EXPORT')
    print(f'YMP: {nimi} {sum(len(q.vertices) - 2 for q in k.data.polygons)} kolmiota, {os.path.getsize(p) / 1e6:.1f} Mt')
    bpy.data.objects.remove(k)
print(f'YMP: valmis {time.time() - t0:.0f} s', ULOS)
