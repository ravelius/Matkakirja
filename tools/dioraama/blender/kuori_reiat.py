# Kuoren reiät umpeen (Linnanrakentaja 1.10.2026, kuori v22; Päätoimittajan OK: "vian korjaus, linna pysyy ennallaan").
# Fotogrammetriassa on aukkoja (sisäpihan rakennusten juurella, katveissa), joista taivas näkyi lähikamerassa. Aukot
# löytyvät huippu-tason reunasärmistä, kun UV-saumoilla kahdennetut kärjet yhdistetään (3 mm). Jokainen sisäinen
# reunasilmukka (ei vesirajan ulkoreunaa) täytetään kolmioilla (triangle_fill, tarvittaessa viuhka keskipisteestä);
# avoin ketju suljetaan, jos sen päät ovat alle RAKO m:n päässä. Täyte pilkotaan ja saa oman UV:n atlaksen vapaasta
# tilasta (kuori_tayte.tayta), ja se maalataan kuten v17:n täyte (kuori_tayte.maalaa: pystypinnat muurin kivellä
# edestä kloonaten, vaakapinnat ympäröivän maan värillä). Sama täyte liitetään kaikkiin laatutasoihin (samat UV:t).
# Täytteen suunta ympäröivien pintojen mukaan ja sileät kärkinormaalit (hämärän leivonta).
#   nice -n 15 Blender -b -P kuori_reiat.py -- <ulkokuori-kansio> <tekstuuri_siivottu.png> [--min 1.0] [--max 30] [--rako 1.2]
#   nice -n 15 Blender -b -P kuori_reiat.py -- --valo <ulkokuori-kansio> <ulkokuori-valokartta-4k.exr>   (vaihe reiatvalo)
# Muokkaa kansion ulkokuori_{huippu,normaali,kevyt}.glb:t ja png:n paikallaan (kuori_putki.sh:n vaihe 'reiat').
import math, os, sys
import bpy, bmesh
import numpy as np
from collections import defaultdict
from mathutils import Vector
from mathutils.geometry import tessellate_polygon
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kuori_tayte
from kuori_tex import rasteri, laajenna
A = sys.argv[sys.argv.index('--') + 1:]
if A[0] == '--valo':
    # Vaihe 'reiatvalo' (hämärän leivonnan jälkeen): täytteen pienet UV-kartat leipoutuivat tummiksi ja rosoisiksi
    # (v22-koe 1.10.), joten täytetekselien valo = ympäröivien alkuperäisten tekselien valon keskiarvo 0,5 m:n
    # vokseleista (3×3×3, haku laajenee 5×5×5 ja 7×7×7). Tarvitsee <U>/sijainti-4096.npy (kuori_ranta.py:n leivonta).
    U, EXR = A[1:3]
    vk = bpy.data.images.load(EXR); K = vk.size[0]
    L = np.empty(K * K * 4, np.float32); vk.pixels.foreach_get(L); L = L.reshape(K, K, 4)
    m = np.unpackbits(np.load(os.path.join(U, 'reiat-maski.npy')))[:K * K].reshape(K, K).astype(bool)
    P = np.load(os.path.join(U, 'sijainti-4096.npy'))[::-1]  # rivi 0 = alareuna kuten Blenderin pikselit
    ok = P[..., 2] > 900; P = P - 1000
    alue_lo = P[m & ok].min(0) - 4; alue_hi = P[m & ok].max(0) + 4
    lahde = ok & ~m & np.all((P >= alue_lo) & (P <= alue_hi), -1)
    vok = lambda X: np.floor((X - alue_lo) / 0.5).astype(np.int64)
    dims = vok(alue_hi[None])[0] + 1; nv = int(np.prod(dims))
    vid = lambda v: (v[:, 0] * dims[1] + v[:, 1]) * dims[2] + v[:, 2]
    vs = vok(P[lahde]); ids = vid(vs)
    S = np.stack([np.bincount(ids, L[lahde][:, c], nv) for c in range(3)], -1); C = np.bincount(ids, None, nv)
    S = S.reshape(*dims, 3); C = C.reshape(*dims)
    kohde = m & ok; vt = vok(P[kohde]); uusi = np.zeros((len(vt), 3), np.float32); tehty = np.zeros(len(vt), bool)
    for r in (1, 2, 3):
        ss = np.zeros((len(vt), 3)); cc = np.zeros(len(vt))
        for dx in range(-r, r + 1):
            for dy in range(-r, r + 1):
                for dz in range(-r, r + 1):
                    v = np.clip(vt + [dx, dy, dz], 0, dims - 1); ss += S[v[:, 0], v[:, 1], v[:, 2]]; cc += C[v[:, 0], v[:, 1], v[:, 2]]
        uus = ~tehty & (cc > 20); uusi[uus] = (ss[uus] / cc[uus, None]); tehty |= uus
    L[kohde] = np.c_[np.where(tehty[:, None], uusi, L[kohde][:, :3]), np.ones(len(vt))]
    vk.pixels.foreach_set(L.ravel()); vk.update()
    sc = bpy.context.scene; ims = sc.render.image_settings; ims.file_format = 'OPEN_EXR'; ims.color_depth = '16'; ims.exr_codec = 'DWAA'
    sc.view_settings.view_transform = 'Standard'; vk.save_render(EXR, scene=sc)
    print(f'REIAT: valokartan täytetekseleitä {int(kohde.sum())}, korjattu {int(tehty.sum())}')
    sys.exit(0)
U, PNG = A[:2]
lippu = lambda k, o: float(A[A.index(k) + 1]) if k in A else o
MIN_L, MAX_L, RAKO = lippu('--min', 1.0), lippu('--max', 30.0), lippu('--rako', 1.2)
KOMPAKTI = lippu('--kompakti', 0.12)  # 4πA/L²: ympyrä 1, 4 m × 0,1 m suikale 0,07


def tuo(polku):
    ennen = set(bpy.context.scene.objects); bpy.ops.import_scene.gltf(filepath=polku)
    return next(o for o in bpy.context.scene.objects if o not in ennen and o.type == 'MESH')


bpy.ops.wm.read_factory_settings(use_empty=True)
kuori = tuo(os.path.join(U, 'ulkokuori_huippu.glb')); me = kuori.data
# --- reunasilmukat yhdistetyistä kärjistä ---
bm = bmesh.new(); bm.from_mesh(me); bm.transform(kuori.matrix_world)
bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.003); bm.verts.ensure_lookup_table(); bm.normal_update()
B = [e for e in bm.edges if len(e.link_faces) == 1]
adj = defaultdict(list); en = defaultdict(lambda: Vector())
for e in B:
    a, b = e.verts; adj[a.index].append(b.index); adj[b.index].append(a.index)
    for v in e.verts: en[v.index] += e.link_faces[0].normal * e.calc_length()
nahty = set(); silmukat = []
for v0 in adj:
    if v0 in nahty: continue
    comp = []; st = [v0]; nahty.add(v0)
    while st:
        x = st.pop(); comp.append(x)
        for y in adj[x]:
            if y not in nahty: nahty.add(y); st.append(y)
    suljettu = all(len(adj[i]) == 2 for i in comp)
    paat = [i for i in comp if len(adj[i]) == 1]
    if not suljettu and not (len(paat) == 2 and all(len(adj[i]) <= 2 for i in comp)): continue  # haarautuva: ohi
    alku = comp[0] if suljettu else paat[0]; jarj = [alku]; jo = {alku}; ed = None; nyt = alku
    while True:  # järjestetty kulku reunaa pitkin
        seur = [y for y in adj[nyt] if y != ed and y not in jo]
        if not seur: break
        ed, nyt = nyt, seur[0]; jarj.append(nyt); jo.add(nyt)
    if len(jarj) != len(comp): continue
    P = [bm.verts[i].co.copy() for i in jarj]
    L = sum((P[i] - P[i - 1]).length for i in range(1, len(P))) + ((P[0] - P[-1]).length if suljettu else 0)
    rako = (P[0] - P[-1]).length
    if len(P) < 3 or L < MIN_L or L > MAX_L or (not suljettu and rako > RAKO): continue
    N = sum((en[i] for i in jarj), Vector()); N = N.normalized() if N.length > 1e-6 else Vector((0, 0, 1))
    silmukat.append((P, N, L, suljettu))
bm.free()
print(f'REIAT: täytetään {len(silmukat)} silmukkaa (suljettuja {sum(s[3] for s in silmukat)}), piiri yhteensä {sum(s[2] for s in silmukat):.1f} m')
# --- täyte omaan bmeshiin ---
ALAT = []; OHI = []
pb = bmesh.new(); uvl = pb.loops.layers.uv.new('UVMap'); lay = pb.faces.layers.int.new('tayte')
for P, N, L, _ in silmukat:
    vs = [pb.verts.new(p) for p in P]; c = None
    # kolmiointi silmukan PCA-tasossa (triangle_fill antoi rosoiselle vinolle silmukalle lähes nolla-alaisen täytön)
    X = np.array([tuple(p) for p in P]); c0 = X.mean(0); _, _, Vt = np.linalg.svd(X - c0)
    Q = (X - c0) @ Vt[:2].T
    ala2d = 0.5 * abs(np.dot(Q[:, 0], np.roll(Q[:, 1], -1)) - np.dot(Q[:, 1], np.roll(Q[:, 0], -1)))
    tri = tessellate_polygon([[Vector((q[0], q[1], 0)) for q in Q]])
    fs = []
    for i, j, k in tri:
        try: fs.append(pb.faces.new((vs[i], vs[j], vs[k])))
        except ValueError: pass
    ala3d = sum(f.calc_area() for f in fs)
    if ala3d < 0.5 * ala2d:  # itseään leikkaava projektio: viuhka keskipisteestä
        for f in fs: pb.faces.remove(f)
        c = pb.verts.new(sum(P, Vector()) / len(P))
        fs = [pb.faces.new((vs[i], vs[(i + 1) % len(vs)], c)) for i in range(len(vs))]
        ala3d = sum(f.calc_area() for f in fs)
    if 4 * math.pi * ala3d / L ** 2 < KOMPAKTI:  # ohut suikale (esim. palkin reuna), ei aukko: ei täytetä
        for f in fs: pb.faces.remove(f)
        for v in vs + ([c] if c is not None else []):
            if v.is_valid and not v.link_faces: pb.verts.remove(v)
        OHI.append(L); continue
    ALAT.append(ala3d)
    pb.normal_update()
    if sum((f.normal for f in fs), Vector()).dot(N) < 0: bmesh.ops.reverse_faces(pb, faces=fs)
    for f in fs: f[lay] = 1
# UV-varaus kaikista nykyisistä kolmioista (atlaksen koko = png:n koko)
kuva = bpy.data.images.load(PNG); W_, H_ = kuva.size; assert W_ == H_
me.calc_loop_triangles(); nt = len(me.loop_triangles)
tl = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('loops', tl)
uv = np.empty(len(me.loops) * 2, np.float32); me.uv_layers[0].data.foreach_get('uv', uv)
varattu = kuori_tayte.varaus(uv.reshape(-1, 2)[tl.reshape(nt, 3)], np.zeros(nt, bool), W_, rasteri)
print(f'REIAT: täytetty {len(ALAT)}, ala {sum(ALAT):.1f} m² (suurin {max(ALAT):.1f}); suikaleina ohitettu {len(OHI)}')
# Täytteen silotus ennen UV:ita: pitkät sisäsärmät puoliksi, kauniimpi kolmiointi ja sisäkärkien Laplace-tasoitus
# reunat kiinni (viuhka/vino kolmiointi näkyi muuten raitoina: vaihtelevat normaalit → eri UV-kartat ja maalauslähteet).
for _ in range(8):
    F = [f for f in pb.faces if f[lay]]
    pitkat = list({e for f in F for e in f.edges if e.calc_length() > kuori_tayte.MAKS_REUNA and len(e.link_faces) == 2})
    if pitkat:
        bmesh.ops.subdivide_edges(pb, edges=pitkat, cuts=1, use_grid_fill=False)
        bmesh.ops.triangulate(pb, faces=[f for f in pb.faces if len(f.verts) > 3])
    sis = [e for e in pb.edges if len(e.link_faces) == 2]
    bmesh.ops.beautify_fill(pb, faces=list(pb.faces), edges=sis)
    vapaat = [v for v in pb.verts if not v.is_boundary]
    for _ in range(10): bmesh.ops.smooth_vert(pb, verts=vapaat, factor=0.5, use_axis_x=True, use_axis_y=True, use_axis_z=True)
for f in pb.faces: f[lay] = 1
pb.normal_update()
uusia = kuori_tayte.tayta(pb, varattu, W_, print)
pme = bpy.data.meshes.new('tayte'); pb.to_mesh(pme); pb.free()
pme.uv_layers[0].name = me.uv_layers[0].name


def liita(o):
    """Liittää täytteen kopion kohteeseen o (sama materiaali, täytteen kulmanormaalit = sileät kärkinormaalit)."""
    p = bpy.data.objects.new('tayte', pme.copy()); bpy.context.scene.collection.objects.link(p)
    p.data.materials.clear(); p.data.materials.append(o.data.materials[0])
    bpy.ops.object.select_all(action='DESELECT'); p.select_set(True); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.join()
    m = o.data; m.update()
    a = m.attributes['tayte']; t = np.empty(len(m.polygons), np.int32); a.data.foreach_get('value', t)
    nl = len(m.loops); kn = np.empty(nl * 3, np.float32); m.corner_normals.foreach_get('vector', kn); kn = kn.reshape(nl, 3)
    pn = np.empty(len(m.polygons) * 3, np.float32); m.polygons.foreach_get('normal', pn); pn = pn.reshape(-1, 3)
    lt = np.empty(len(m.polygons), np.int32); m.polygons.foreach_get('loop_total', lt)
    lp = np.repeat(np.arange(len(m.polygons)), lt); mm = t[lp] == 1
    # täytteen kulmille sileä kärkinormaali (täyte on silotettu; tasonormaali teki hämärän leivontaan fasetit)
    lv = np.empty(nl, np.int32); m.loops.foreach_get('vertex_index', lv)
    vn = np.empty(len(m.vertices) * 3, np.float32); m.vertex_normals.foreach_get('vector', vn); vn = vn.reshape(-1, 3)
    kn[mm] = vn[lv[mm]]; m.normals_split_custom_set(kn.tolist()); m.update()
    return m


def vie(o, nimi):
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    if 'tayte' in o.data.attributes: o.data.attributes.remove(o.data.attributes['tayte'])
    polku = os.path.join(U, f'ulkokuori_{nimi}.glb')
    bpy.ops.export_scene.gltf(filepath=polku, use_selection=True, export_format='GLB', export_image_format='JPEG',
                              export_jpeg_quality=88, export_texcoords=True, export_normals=True, export_materials='EXPORT')
    print(f'REIAT: {nimi} {sum(len(p.vertices) - 2 for p in o.data.polygons)} kolmiota, {os.path.getsize(polku) / 1e6:.1f} Mt')


# Huippu: liitos, maalaus (koko kuoren kolmiot naapureina), vienti
m = liita(kuori)
pix = np.empty(W_ * H_ * 4, np.float32); kuva.pixels.foreach_get(pix); pix = pix.reshape(H_, W_, 4)
rgb = pix[..., :3].copy()
m.calc_loop_triangles(); nt2 = len(m.loop_triangles)
pi2 = np.empty(nt2, np.int32); m.loop_triangles.foreach_get('polygon_index', pi2)
ta = np.empty(len(m.polygons), np.int32); m.attributes['tayte'].data.foreach_get('value', ta); V = np.flatnonzero(ta[pi2] == 1)
M = kuori_tayte.maalaa(m, rgb, print)  # poistaa 'tayte'-attribuutin
# Maalaamatta jääneet täytekolmiot (seinapaikka ohittaa alle 3 kolmion sektorit): ympäristön mediaaniväri 0,75 m:n
# säteeltä (maalatut täytekolmiot ja alkuperäiset), tasavärinä.
tv2 = np.empty(nt2 * 3, np.int32); m.loop_triangles.foreach_get('vertices', tv2); tv2 = tv2.reshape(nt2, 3)
tl2 = np.empty(nt2 * 3, np.int32); m.loop_triangles.foreach_get('loops', tl2); tl2 = tl2.reshape(nt2, 3)
nv = len(m.vertices); co2 = np.empty(nv * 3, np.float32); m.vertices.foreach_get('co', co2); co2 = co2.reshape(nv, 3)
uv2 = np.empty(len(m.loops) * 2, np.float32); m.uv_layers[0].data.foreach_get('uv', uv2); uvp2 = uv2.reshape(-1, 2)[tl2] * np.array([W_, H_], np.float32)
kp = co2[tv2].mean(1); tyhjia = 0; PV = rasteri(uvp2[V], H_, W_)
for i in V:
    ydin = rasteri(uvp2[i:i + 1], H_, W_)
    if ydin.sum() > 0 and (ydin & M).sum() >= 0.5 * ydin.sum(): continue
    mi = laajenna(ydin | rasteri(uvp2[i:i + 1], H_, W_, eps=0.6), 2)  # ohut suikale: ei tekselikeskipisteitä → laajennus
    lah = np.flatnonzero(np.linalg.norm(kp - kp[i], axis=1) < 0.75)
    ml = rasteri(uvp2[lah], H_, W_) & ~mi & (M | ~PV)  # maalatut tai alkuperäiset tekselit
    if ml.any(): rgb[mi] = np.median(rgb[ml], 0); M |= mi; tyhjia += 1
print(f'REIAT: täydennetty {tyhjia} maalaamatonta täytekolmiota')
# Kloonilähteen tummat tai vaaleat poikkeamat (seinapaikka kloonasi joskus varjoa): täytekolmio, jonka kirkkaus on
# alle 0,6× tai yli 1,7× naapuruston (1,5 m, täyte ja alkuperäinen) mediaanin, saa naapuruston mediaanin.
Lk = lambda x: x @ np.array([0.2126, 0.7152, 0.0722], np.float32)
vari = np.zeros((nt2, 3), np.float32)
for i in V:
    r_ = rasteri(uvp2[i:i + 1], H_, W_, eps=0.6); vari[i] = rgb[r_].mean(0) if r_.any() else 0
korj = 0
for i in V:
    lah = np.flatnonzero(np.linalg.norm(kp - kp[i], axis=1) < 1.5); lah = lah[lah != i]
    ml = rasteri(uvp2[lah], H_, W_) & ~PV
    viite = np.median(np.r_[rgb[ml], vari[np.intersect1d(lah, V)]], 0) if (ml.any() or len(np.intersect1d(lah, V))) else None
    if viite is None: continue
    s_ = Lk(vari[i]) / max(Lk(viite), 1e-3)
    if s_ < 0.6 or s_ > 1.7:
        mi = laajenna(rasteri(uvp2[i:i + 1], H_, W_, eps=0.6), 2); rgb[mi] = viite; korj += 1
print(f'REIAT: poikkeavan sävyiset täytekolmiot korjattu: {korj}')
pix[..., :3] = rgb; pix[..., 3] = 1; kuva.pixels.foreach_set(pix.ravel()); kuva.update()
kuva.filepath_raw = PNG; kuva.file_format = 'PNG'; kuva.save()
maski = laajenna(PV, 2)  # täytteen tekselit (UV0, Blenderin pikselijärjestys: rivi 0 = alareuna) valon korjausta varten
np.save(os.path.join(U, 'reiat-maski.npy'), np.packbits(maski))
vie(kuori, 'huippu')
for nimi in ('normaali', 'kevyt'):
    o = tuo(os.path.join(U, f'ulkokuori_{nimi}.glb')); liita(o); vie(o, nimi)
print(f'REIAT: valmis, {uusia} täytepintaa, maalattu {int(M.sum())} tekseliä')
