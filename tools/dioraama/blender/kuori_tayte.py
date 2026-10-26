# Muurin juuren aukon täyttö omalla UV:lla (Linnanrakentaja 30.9.2026, kuori v17; Päätoimittajan tilaus). Muuria vasten
# seisseen romun (kaakon aitaus ja katokset) takaa ei ole kuvaa: litistyksessä venyneillä pinnoilla oli 3 m:n
# korkeudelle vain 1–2 tekseliä UV-alaa, joten ne näkyivät juovina tekstuurista riippumatta. Tässä venyneet pinnat
# (kuori_siivous, tapa 'tayta') pilkotaan ≤ MAKS_REUNA m:n kolmioiksi ja niille annetaan oma UV atlaksen vapaasta
# tilasta (kaistoina, KAISTA m levyisinä). Maalaus: kuori_orto.seinapaikka (muurin kivi edestä kloonattuna) ja
# vaakasuorille maan keskiväri ympäriltä. (Aukon täyttö holes_fillillä ei onnistunut: reunat eivät muodosta suljettuja
# silmukoita.)
import math
import numpy as np
import bmesh

MAKS_REUNA = 0.5   # uusien kolmioiden pisin sisäreuna (m)
KAISTA = 1.0       # UV-karttojen koko (m): atlas on 75 % täynnä, vapaa tila on pieninä rakoina
TIHEYS = 0.05      # tavoite m/tekseli (4k-atlas); suurennetaan, jos vapaa tila ei riitä
VARA = 3           # tekseliä karttojen ympärillä (saumavara, ei vuotoa naapuriin)


def tayta(bm, varattu, koko, log=print, tasoon=False, tiheys=None, vara=None, ohita=False):
    """bm: bmesh, jonka int-kerros 'tayte' = 1 venyneillä pinnoilla; varattu: koko² bool UV-varaus, koko:
    atlaksen koko. Pilkkoo pinnat ≤ MAKS_REUNA m:n kolmioiksi ja antaa niille uudet UV:t vapaasta tilasta. Palauttaa
    pintojen määrän. tasoon (v23, 1.10.): pystykartat projisoidaan kartan keskinormaalin tasoon (vaakatangentti ×
    rinteen suunta), jolloin kaltevat katot eivät veny; ohita: kartta, jolle ei löydy tilaa, jää vanhalle UV:lle
    (merkintä pois) eikä ajo kaadu; tiheys/vara: m/tekseli ja saumavara varausruudukon
    yksiköissä (8k-ruudukko: 0.025 ja 6 = sama tarkkuus kuin 4k:ssa 0.05 ja 3, mutta tiiviimpi pakkaus)."""
    tiheys = TIHEYS if tiheys is None else tiheys; vara = VARA if vara is None else vara
    lay = bm.faces.layers.int['tayte']
    kohde = [f for f in bm.faces if f[lay]]
    for _ in range(10):  # pitkät reunat puoliksi (vain merkittyjen pintojen väliset: vanhat pinnat eivät muutu)
        F = [f for f in bm.faces if f[lay]]
        pitkat = list({e for f in F for e in f.edges
                       if e.calc_length() > MAKS_REUNA and len(e.link_faces) == 2 and all(g[lay] for g in e.link_faces)})
        if not pitkat: break
        bmesh.ops.subdivide_edges(bm, edges=pitkat, cuts=1, use_grid_fill=False)
        F = [f for f in bm.faces if f[lay] and len(f.verts) > 3]
        if F: bmesh.ops.triangulate(bm, faces=F, quad_method='BEAUTY', ngon_method='BEAUTY')
    F = [f for f in bm.faces if f[lay]]
    log(f'TÄYTE: {len(kohde)} venynyttä → {len(F)} pintaa')
    # UV-kartat: sektori (vaakanormaalin suunta 30°) × kaista muurin suunnassa; vaakasuorat ylhäältä.
    kartat = {}
    for f in F:
        n = f.normal; c = f.calc_center_median()
        if math.hypot(n.x, n.y) < 0.4:
            avain = ('ylos', math.floor(c.x / KAISTA), math.floor(c.y / KAISTA))
        else:
            s = round(math.degrees(math.atan2(n.x, n.y)) / 30) % 12; a = math.radians(s * 30)
            avain = (s, math.floor((c.x * math.cos(a) - c.y * math.sin(a)) / KAISTA), math.floor(c.z / KAISTA))
        kartat.setdefault(avain, []).append(f)
    uvl = bm.loops.layers.uv.active
    log(f'TÄYTE: UV-varaus alussa {varattu.mean():.3f}')
    sijoitettu = 0; tiheydet = []; ohitetut = 0
    for avain, faces in sorted(kartat.items(), key=lambda kv: -len(kv[1])):
        if tasoon and avain[0] != 'ylos':
            nk = sum((f.normal for f in faces), faces[0].normal * 0).normalized()
            xt = np.cross([0.0, 0.0, 1.0], nk); xt = xt / max(np.linalg.norm(xt), 1e-9); yt = np.cross(nk, xt)
        else:
            xt = None
        def proj(v):
            if avain[0] == 'ylos': return v.co.x, v.co.y
            if xt is not None: return float(np.dot(v.co, xt)), float(np.dot(v.co, yt))
            a = math.radians(avain[0] * 30); return v.co.x * math.cos(a) - v.co.y * math.sin(a), v.co.z
        p = np.array([proj(l.vert) for f in faces for l in f.loops]); lo = p.min(0); ala = p.max(0) - lo
        d = tiheys
        S = np.pad(varattu.astype(np.int32).cumsum(0).cumsum(1), ((1, 0), (1, 0)))
        while True:
            w = int(math.ceil(ala[0] / d)) + 2 * vara + 1; h = int(math.ceil(ala[1] / d)) + 2 * vara + 1
            summa = S[h:, w:] - S[:-h, w:] - S[h:, :-w] + S[:-h, :-w]
            vapaa = np.argwhere(summa == 0)
            if len(vapaa): break
            d *= 1.25
            if d > 8 * tiheys:
                if not ohita: raise RuntimeError(f'TÄYTE: ei vapaata UV-tilaa kartalle {avain} ({ala[0]:.1f} × {ala[1]:.1f} m)')
                vapaa = None; break
        if vapaa is None:
            for f in faces: f[lay] = 0
            ohitetut += len(faces); log(f'TÄYTE: ohitettu kartta {avain} ({ala[0]:.1f} × {ala[1]:.1f} m, {len(faces)} pintaa)'); continue
        y0, x0 = vapaa[0]; varattu[y0:y0 + h, x0:x0 + w] = True
        for f in faces:
            for l in f.loops:
                u, v = proj(l.vert)
                l[uvl].uv = ((x0 + vara + 0.5 + (u - lo[0]) / d) / koko, (y0 + vara + 0.5 + (v - lo[1]) / d) / koko)
        sijoitettu += 1; tiheydet.append(d)
        if d > tiheys: log(f'TÄYTE: kartta {avain}: {len(faces)} pintaa, {ala[0]:.1f} × {ala[1]:.1f} m, {d:.3f} m/tekseli')
    if ohitetut: log(f'TÄYTE: tilan puutteessa ohitettu {ohitetut} pintaa')
    log(f'TÄYTE: {sijoitettu} UV-karttaa, tiheys {min(tiheydet) if tiheydet else 0:.3f}–{max(tiheydet) if tiheydet else 0:.3f} m/tekseli')
    return len(F)


def varaus(uv, pois, koko, rasteri):
    """UV-varaus koko²: kolmiot paitsi pois (uv (T,3,2) 0..1; venyneiden oma vanha UV vapautuu), 1 tekselin vara.
    rasteri = kuori_tex.rasteri."""
    m = rasteri(uv[~pois] * koko, koko, koko)
    return m | np.roll(m, 1, 0) | np.roll(m, -1, 0) | np.roll(m, 1, 1) | np.roll(m, -1, 1)


def maalaa(me, rgb, log=print):
    """Maalaa 'tayte'-attribuutin pinnat: pystysuorat muurin kivellä (seinapaikka), vaakasuorat ympäröivän maan
    keskivärillä. Poistaa attribuutin. Palauttaa maalatut pikselit."""
    from kuori_orto import seinapaikka
    from kuori_tex import rasteri
    H, W = rgb.shape[:2]
    n = len(me.vertices); co = np.empty(n * 3, np.float32); me.vertices.foreach_get('co', co); co = co.reshape(n, 3)
    me.calc_loop_triangles(); nt = len(me.loop_triangles)
    tv = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('vertices', tv); tv = tv.reshape(nt, 3)
    tl = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('loops', tl); tl = tl.reshape(nt, 3)
    uv = np.empty(len(me.loops) * 2, np.float32); me.uv_layers[0].data.foreach_get('uv', uv); uvp = uv.reshape(-1, 2)[tl] * np.array([W, H], np.float32)
    pi = np.empty(nt, np.int32); me.loop_triangles.foreach_get('polygon_index', pi)
    a = me.attributes['tayte']; t = np.empty(len(me.polygons), np.int32); a.data.foreach_get('value', t)
    V = np.flatnonzero(t[pi] == 1)
    M, vaaka = seinapaikka(co, tv, uvp, rgb, V, log=log)
    if len(vaaka):
        c = co[tv[vaaka]].mean(1); kp = co[tv].mean(1)
        nn = np.cross(co[tv[:, 1]] - co[tv[:, 0]], co[tv[:, 2]] - co[tv[:, 0]])
        ymp = np.flatnonzero((np.abs(nn[:, 2]) > 0.8 * np.linalg.norm(nn, axis=1)) & (t[pi] == 0)
                             & (np.abs(kp[:, 0] - c[:, 0].mean()) < 8) & (np.abs(kp[:, 1] - c[:, 1].mean()) < 8)
                             & (np.abs(kp[:, 2] - c[:, 2].mean()) < 1.0))
        if len(ymp):
            mm = rasteri(uvp[ymp], H, W); vari = np.median(rgb[mm], 0)
            mv = rasteri(uvp[vaaka], H, W); rgb[mv] = vari; M |= mv
    from kuori_orto import reunat
    sauma = reunat(rgb, uvp, M, V, VARA)  # karttojen vara täyteen: bilineaarinen näyte ei tuo mustaa reunaa
    log(f'TÄYTE: maalattu {int(M.sum())} tekseliä + saumavara {sauma} ({len(V)} kolmiota, vaakasuoria {len(vaaka)})')
    me.attributes.remove(a)
    return M
