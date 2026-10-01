# Kuoren venyneet tekstuurialueet (Linnanrakentaja 1.10.2026, kuori v23; Päätoimittajan OK: "viat näkyvät lähikamerassa").
# Fotogrammetriassa osa kolmioista sai atlaksesta vain murto-osan normaalista tekselitiheydestä (pystyraidat muurin
# sisäkulmissa, tummat kiilat aumakatossa). Ajetaan ulkokuori.py:ssä siivouksen jälkeen ja ennen laatutasoja, jolloin
# kaikki tasot perivät korjauksen (`--venyneet`):
#   1) venynyt = tekselitiheys < KYNNYS × mediaani ja ala > MIN_ALA (vesirajan alapuoli ohi)
#   2) pilkotaan ja uusi UV vapaasta tilasta (kuori_tayte.tayta tasoon=True: kartan oma taso, ei kaltevuusvenymää);
#      varaus 8k-ruudukossa (tiiviimpi pakkaus pirstoutuneeseen tilaan), venyneiden vanhat UV:t vapautuvat
#   3) maalaus kuori_orto.tasopaikka: kloonaus samansuuntaiselta puhtaalta pinnalta (laudat ja kivet oikeaan suuntaan);
#      lähteettömät ja poikkeavan sävyiset kolmiot ympäristön mediaanilla; saumavara push-pullilla.
import os, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kuori_tayte
from kuori_tex import rasteri, laajenna
from kuori_orto import tasopaikka, reunat, bary_rasteri

KYNNYS = 0.25     # osuus mediaanitiheydestä
MIN_ALA = 0.01    # m²
VARAUS = 8192     # UV-varausruudukko
VESIRAJA = -7.3   # tätä alempana (veden alla) ei korjata
PITKA = 1.0       # m: tätä pidemmät venyneiden särmät pilkotaan ennen UV:ta


def _kolmiot(me, W, H):
    me.calc_loop_triangles(); nt = len(me.loop_triangles)
    tv = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('vertices', tv); tv = tv.reshape(nt, 3)
    tl = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('loops', tl); tl = tl.reshape(nt, 3)
    pi = np.empty(nt, np.int32); me.loop_triangles.foreach_get('polygon_index', pi)
    co = np.empty(len(me.vertices) * 3, np.float32); me.vertices.foreach_get('co', co); co = co.reshape(-1, 3)
    uv = np.empty(len(me.loops) * 2, np.float32); me.uv_layers[0].data.foreach_get('uv', uv)
    return tv, tl, pi, co, uv.reshape(-1, 2)[tl]


def korjaa(o, kuva, log=print):
    """o: keskitetty kuoriobjekti (UV0), kuva: sen 4k-diffuse (Blender-kuva). Muokkaa molempia paikallaan."""
    import bmesh
    me = o.data; W, H = kuva.size
    tv, tl, pi, co, uvt = _kolmiot(me, W, H)
    P = co[tv]; a3 = 0.5 * np.linalg.norm(np.cross(P[:, 1] - P[:, 0], P[:, 2] - P[:, 0]), axis=1)
    q = uvt * np.array([W, H]); d = q[:, 1] - q[:, 0]; e = q[:, 2] - q[:, 0]
    a2 = 0.5 * np.abs(d[:, 0] * e[:, 1] - d[:, 1] * e[:, 0])
    ok = a3 > 1e-4; tih = np.where(ok, a2 / np.maximum(a3, 1e-9), 0); med = float(np.median(tih[ok]))
    ven = ok & (tih < KYNNYS * med) & (a3 > MIN_ALA) & (P[:, :, 2].max(1) > VESIRAJA)
    log(f'VENYNEET: mediaani {med:.0f} tekseliä/m², venyneitä {int(ven.sum())} kolmiota, {a3[ven].sum():.1f} m²')
    if not ven.any(): return 0
    bm = bmesh.new(); bm.from_mesh(me)
    lay = bm.faces.layers.int.get('tayte') or bm.faces.layers.int.new('tayte'); bm.faces.ensure_lookup_table()
    for f in bm.faces: f[lay] = 0
    for i in np.unique(pi[ven]): bm.faces[int(i)][lay] = 1
    # pitkät särmät (myös rajalla alkuperäisiin pintoihin) puoliksi: venyneet suikaleet ulottuvat muurin mitalta (v23-koe:
    # 6,6 × 34 m:n kartta), ja tayta pilkkoo vain täytteen sisäiset särmät. Naapuripinnat kolmioidaan, UV:t interpoloituvat.
    for _ in range(8):
        pitkat = list({e for f in bm.faces if f[lay] for e in f.edges if e.calc_length() > PITKA})
        if not pitkat: break
        bmesh.ops.subdivide_edges(bm, edges=pitkat, cuts=1, use_grid_fill=False)
        bmesh.ops.triangulate(bm, faces=[f for f in bm.faces if len(f.verts) > 3], quad_method='BEAUTY', ngon_method='BEAUTY')
    varattu = kuori_tayte.varaus(uvt, ven, VARAUS, rasteri)
    s = VARAUS / W
    uusia = kuori_tayte.tayta(bm, varattu, VARAUS, log, tasoon=True, tiheys=kuori_tayte.TIHEYS / s,
                              vara=int(kuori_tayte.VARA * s), ohita=True)
    bm.to_mesh(me); bm.free(); me.update()
    # uusien kulmien normaali = pinnan normaali (kuten kuori_siivous: pilkotuilla kulmilla ei kelvollista omaa)
    a = me.attributes['tayte']; t = np.empty(len(me.polygons), np.int32); a.data.foreach_get('value', t)
    nl = len(me.loops); kn = np.empty(nl * 3, np.float32); me.corner_normals.foreach_get('vector', kn); kn = kn.reshape(nl, 3)
    pn = np.empty(len(me.polygons) * 3, np.float32); me.polygons.foreach_get('normal', pn); pn = pn.reshape(-1, 3)
    lt = np.empty(len(me.polygons), np.int32); me.polygons.foreach_get('loop_total', lt)
    lp = np.repeat(np.arange(len(me.polygons)), lt); m = t[lp] == 1
    kn[m] = pn[lp[m]]; me.normals_split_custom_set(kn.tolist()); me.update()
    # maalaus
    tv, tl, pi, co, uvt = _kolmiot(me, W, H); uvp = uvt * np.array([W, H], np.float32)
    V = np.flatnonzero(t[pi] == 1)
    pix = np.empty(W * H * 4, np.float32); kuva.pixels.foreach_get(pix); pix = pix.reshape(H, W, 4); rgb = pix[..., :3].copy()
    M, jaljelle = tasopaikka(co, tv, uvp, rgb, V, log=log)
    from mathutils.kdtree import KDTree
    kp = co[tv].mean(1); onV = np.zeros(len(tv), bool); onV[V] = True
    kd = KDTree(len(kp))
    for i, p in enumerate(kp): kd.insert(p, i)
    kd.balance()
    ti_, ys_, xs_, _ = bary_rasteri(uvp[V], H, W)  # täytteen pikselit kolmioittain
    jarj = np.argsort(ti_, kind='stable'); ti_, ys_, xs_ = ti_[jarj], ys_[jarj], xs_[jarj]
    raja = np.searchsorted(ti_, np.arange(len(V) + 1))
    Lk = lambda x: x @ np.array([0.2126, 0.7152, 0.0722], np.float32)
    korj = 0
    for k, i in enumerate(V):  # maalaamattomat ja poikkeavat (kloonilähteen varjo) → ympäristön mediaani
        ys, xs = ys_[raja[k]:raja[k + 1]], xs_[raja[k]:raja[k + 1]]
        if len(ys) == 0:  # ohut suikale: kolmion UV-alueen ympäristö
            c = uvp[i].mean(0).astype(int); ys, xs = np.array([min(c[1], H - 1)]), np.array([min(c[0], W - 1)])
        maal = M[ys, xs]
        oma = rgb[ys[maal], xs[maal]].mean(0) if maal.any() else None
        lah = np.array([j for _, j, _ in kd.find_n(kp[i], 40) if j != i])
        lah = lah[(~onV[lah]) | (np.isin(lah, V))]
        t2, y2, x2, _ = bary_rasteri(uvp[lah], H, W)
        hyva = M[y2, x2] | ~onV[lah[t2]]
        if not hyva.any(): continue
        viite = np.median(rgb[y2[hyva], x2[hyva]], 0)
        if oma is None or not (0.6 < Lk(oma) / max(Lk(viite), 1e-3) < 1.7):
            y0, y1 = max(ys.min() - 2, 0), min(ys.max() + 3, H); x0, x1 = max(xs.min() - 2, 0), min(xs.max() + 3, W)
            loc = np.zeros((y1 - y0, x1 - x0), bool); loc[ys - y0, xs - x0] = True; loc = laajenna(loc, 2)
            rgb[y0:y1, x0:x1][loc] = viite; M[y0:y1, x0:x1] |= loc; korj += 1
    sauma = reunat(rgb, uvp, M, V, kuori_tayte.VARA)
    log(f'VENYNEET: {uusia} uutta pintaa, maalattu {int(M.sum())} tekseliä (+ saumavara {sauma}), mediaanilla {korj}')
    pix[..., :3] = rgb; pix[..., 3] = 1; kuva.pixels.foreach_set(pix.ravel()); kuva.update()
    me.attributes.remove(a)
    return uusia
