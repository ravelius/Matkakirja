# Olavinlinnan fotogrammetriakuoren siivous (Linnanrakentaja 29.9.2026): poistaa vuoden 2021 restauroinnin työmaaromun
# (telineet, henkilönostin, työkoneet, pressut ja kontti). Ajetaan ulkokuori.py:n keskityksen jälkeen (`--siivoa`).
# Geometria: alueen (monikulmio, metrit keskityksen jälkeen: x itä, y pohjoinen) maanläheiset vertexit (romu mukaan
# lukien, enintään alueen korkeusrajan verran maasta) litistetään paikalliseen maanpintaan: ei ryppyjä eikä varjoja. Tekstuuri: alueen
# ortokuva kloonataan puhtaalta kivetykseltä (kuori_orto.py) ja maalataan vain alueen kolmioiden omiin tekseleihin.
#   Kutsu: ulkokuori.py --siivoa; kehitys: siivoa_np() numpy-taulukoilla.
import os, sys, time
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kuori_geom import sisalla, maakentta
from kuori_tex import laajenna
from kuori_orto import ortokuva, kloonaa, paluu, reunat

def _laatikko(x0, x1, y0, y1): return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]

# (nimi, monikulmio, korkeus, ryhmä): alueen vertexit, jotka ovat alle `korkeus` m paikallisesta maanpinnasta, litistetään
# maahan; korkeus rajataan romun mukaan, jotta muurit ja katot alueen reunalla säilyvät. Ryhmän alueet täytetään yhtenä
# (yhteinen reunarengas: varjot ja sävyt jatkuvat alueelta toiselle).
ALUEET = [
    ('telineet', [(2.4, 1.8), (8.5, 5.0), (10.4, 3.7), (15.6, -6.4), (15.0, -11.6), (14.5, -15.2), (13.7, -17.2), (11.7, -17.7)], 8.0, 'piha'),
    ('henkilonostin', _laatikko(17.4, 24.4, 4.0, 10.8), 6.0, 'piha'),
    ('kone_vihrea_ne', _laatikko(33.0, 39.2, 12.2, 19.4), 6.0, 'piha'),
    ('putket_ja_kone_vihrea_ke', [(19.4, 4.6), (23.8, 4.6), (23.8, 0.8), (26.2, 0.6), (26.2, -3.8), (22.6, -3.8), (22.6, 0.0), (19.4, 0.0)], 6.0, 'piha'),
    ('putket_pohjoinen', _laatikko(10.8, 19.6, -0.8, 5.8), 6.0, 'piha'),
    ('putket_keski', _laatikko(14.0, 23.5, -8.3, -0.8), 3.0, 'piha'),
    # Pohjoisrakennuksen seinän vieri telineiden takana: 1,1 m räystäslinjasta (y = 2,3 + 0,543 x) etelään.
    ('seinan_vieri', [(3.0, 2.8), (19.0, 11.5), (19.6, 5.8), (10.8, 5.8), (8.5, 5.0)], 3.0, 'piha'),
    ('romu_ita', [(26.4, -3.3), (40.5, -3.3), (40.5, -8.5), (33.5, -8.8), (26.4, -8.8)], 3.0, 'piha'),
    # Lounaan tasku: pressut, kontti ja lankkukasat muurin sisäpintaa myöten (0,2 m vara).
    ('pressut_kontti_romu', [(-18.6, -25.4), (-10.2, -29.5), (-4.5, -31.6), (-3.2, -31.9), (-2.9, -33.3), (-3.7, -35.1),
                             (-5.9, -35.0), (-11.3, -33.3), (-15.3, -34.8), (-15.7, -37.9), (-17.0, -38.2), (-21.0, -38.1),
                             (-25.3, -37.8), (-25.3, -30.0), (-21.4, -29.9), (-20.5, -27.5)], 3.5, 'lounas'),
]
DZ = 0.10        # tätä korkeammalla maanpintaa olevat vertexit lasketaan "painetuiksi" (loki)
RES = 0.03       # ortokuvan ruutu (m)
MARG = 18.0      # ortokuvan reunus alueen ympärillä (m): kloonauslähteet
LAAJENNUS = 3    # UV-saumavara pikseleinä (vain vapaisiin pikseleihin)
PUHDAS_VALI = 1.0  # puhtaan maan etäisyys mistä tahansa alueesta (m)
PAINUMA = 0.05  # painetun romun etäisyys maanpinnan alla (m)
ALAVARA = 0.6   # näin paljon maanpinnan alapuolella olevat (urat romun alla) nostetaan maahan
VENYMA = 0.5    # venynyt kolmio: kärki painui yli tämän ja toinen kärki jäi yli tämän maasta
# Venyneiden kolmioiden käsittely ryhmittäin: 'poista' (vapaa piha) tai 'jata' (muurin vieri: takana ei ole pintaa).
RYHMAT = {'piha': 'poista', 'lounas': 'jata'}


def siivoa(o, kuva, log=print):
    """o: keskitetty Blender-mesh-objekti (UV 'UVMap'), kuva: sen diffuse-kuva. Muokkaa molempia paikallaan."""
    me = o.data
    n = len(me.vertices); co = np.empty(n * 3, np.float32); me.vertices.foreach_get('co', co); co = co.reshape(n, 3)
    me.calc_loop_triangles(); nt = len(me.loop_triangles)
    tv = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('vertices', tv); tv = tv.reshape(nt, 3)
    tl = np.empty(nt * 3, np.int32); me.loop_triangles.foreach_get('loops', tl); tl = tl.reshape(nt, 3)
    uv = np.empty(len(me.loops) * 2, np.float32); me.uv_layers[0].data.foreach_get('uv', uv); uv = uv.reshape(-1, 2)[tl]
    H, W = kuva.size[1], kuva.size[0]
    pix = np.empty(H * W * 4, np.float32); kuva.pixels.foreach_get(pix); pix = pix.reshape(H, W, 4)
    rgb = pix[..., :3].copy()
    co, poista = siivoa_np(co, tv, uv, rgb, log)
    me.vertices.foreach_set('co', co.ravel()); me.update()
    if poista.any():
        import bmesh
        pi = np.empty(nt, np.int32); me.loop_triangles.foreach_get('polygon_index', pi)
        pois = set(np.unique(pi[poista]).tolist())
        bm = bmesh.new(); bm.from_mesh(me); bm.faces.ensure_lookup_table()
        bmesh.ops.delete(bm, geom=[bm.faces[i] for i in pois], context='FACES_ONLY')
        bm.to_mesh(me); bm.free(); me.update()
        log(f'SIIVOUS: poistettu {len(pois)} venynyttä pintaa')
    pix[..., :3] = rgb; kuva.pixels.foreach_set(pix.ravel()); kuva.update()


def siivoa_np(co, tv, uv, rgb, log=print):
    """co (N,3), tv (T,3), uv (T,3,2) 0..1, rgb (H,W,3) float32 (muokataan paikallaan). Palauttaa (uudet vertexit,
    poistettavat kolmiot bool (T,))."""
    t0 = time.time(); H, W = rgb.shape[:2]
    uvp = uv * np.array([W, H], np.float32); co = co.copy()
    kp = co[tv].mean(1)
    nrm = np.cross(co[tv[:, 1]] - co[tv[:, 0]], co[tv[:, 2]] - co[tv[:, 0]])
    ylos = np.abs(nrm[:, 2]) > 0.6 * np.linalg.norm(nrm, axis=1)
    M_kaikki = np.zeros((H, W), bool); K_kaikki = []; poista = np.zeros(len(tv), bool)
    for ryhma, tapa in RYHMAT.items():
        osat = [(n, np.asarray(p, float), k) for n, p, k, r in ALUEET if r == ryhma]
        polyt = [p for _, p, _ in osat]; pk = np.vstack(polyt)
        muiden = [np.asarray(p, float) for _, p, _, r in ALUEET if r != ryhma]
        g = maakentta(co, polyt, marg=MARG + 2, pros=5)
        lo = pk.min(0) - MARG; hi = pk.max(0) + MARG
        Wg = int(np.ceil((hi[0] - lo[0]) / RES / 256)) * 256; Hg = int(np.ceil((hi[1] - lo[1]) / RES / 256)) * 256
        # Ortokuvan kolmiot (alkuperäinen geometria) ja maanpinta: ylöspäin ja enintään 0,35 m maasta.
        ehd = np.flatnonzero((kp[:, 0] > lo[0] - 1) & (kp[:, 0] < lo[0] + Wg * RES + 1) & (kp[:, 1] > lo[1] - 1) & (kp[:, 1] < lo[1] + Hg * RES + 1))
        maa_t = np.zeros(len(tv), bool); maa_t[ehd] = ylos[ehd] & (kp[ehd, 2] - g(kp[ehd, :2]) < 0.35)
        orto, maa = ortokuva(co, tv, uvp, rgb, ehd, maa_t, lo, RES, Hg, Wg)
        gy, gx = np.mgrid[0:Hg, 0:Wg]; gxy = np.stack([(gx.ravel() + 0.5) * RES + lo[0], (gy.ravel() + 0.5) * RES + lo[1]], 1)
        oma = np.zeros(len(gxy), bool); muut = np.zeros(len(gxy), bool)
        for q in polyt: oma |= sisalla(gxy, q)
        for q in muiden: muut |= sisalla(gxy, q)
        P = laajenna(oma.reshape(Hg, Wg), int(0.3 / RES)); muut = laajenna(muut.reshape(Hg, Wg), int(PUHDAS_VALI / RES))
        puhdas = maa & ~muut & ~laajenna(P, int(PUHDAS_VALI / RES))
        rengas = maa & ~muut & laajenna(P, int(2.5 / RES)) & ~P
        tayt = kloonaa(orto, puhdas, P, RES, rengas)
        # Geometria: alueiden maanläheiset vertexit maahan (kukin oman korkeusrajansa mukaan).
        lahi = np.flatnonzero((co[:, 0] > pk[:, 0].min() - 3) & (co[:, 0] < pk[:, 0].max() + 3) & (co[:, 1] > pk[:, 1].min() - 3) & (co[:, 1] < pk[:, 1].max() + 3))
        gk = np.zeros(len(co), np.float32); gk[lahi] = g(co[lahi, :2])
        Kr = np.zeros(len(tv), bool)
        for nimi, p, korkeus in osat:
            alue = sisalla(co[:, :2], p)
            tas = alue & (co[:, 2] < gk + korkeus) & (co[:, 2] > gk - ALAVARA)
            siirr = tas & (co[:, 2] > gk + DZ)
            zv = co[:, 2].copy(); co[tas, 2] = gk[tas]
            # Painettu romu 5 cm maanpinnan alle: päällekkäiset pinnat eivät varjosta toisiaan leivonnassa (hämärä 29.9.).
            co[siirr, 2] = gk[siirr] - PAINUMA
            ylhaalla = np.zeros(len(co), bool); ylhaalla[lahi] = ~tas[lahi] & (co[lahi, 2] - gk[lahi] > VENYMA)
            ven = ((zv - co[:, 2])[tv] > VENYMA).any(1) & ylhaalla[tv].any(1)
            if tapa == 'poista': poista |= ven
            # Maalataan kaikki alueen maanpinnan kolmiot (myös urat) ja painetut; venyneitä ei (muurin vieri jää ennalleen).
            maassa = alue[tv].all(1) & (np.abs(co[tv, 2] - gk[tv]) < ALAVARA + 0.05).all(1)
            Kr |= (maassa | siirr[tv].any(1)) & ~ven
            log(f'SIIVOUS: {nimi}: {int(alue.sum())} vertexiä alueella, {int(siirr.sum())} painettu maahan '
                f'(dz keskim. {float((zv[siirr]-gk[siirr]).mean()) if siirr.any() else 0:.2f} m), venyneitä {int(ven.sum())} ({tapa})')
        K = np.flatnonzero(Kr & ~poista)
        M = paluu(rgb, co, tv, uvp, K, tayt, lo, RES)
        M_kaikki |= M; K_kaikki.append(K)
        if os.environ.get('KUORI_DEBUG'):
            np.savez_compressed(os.environ['KUORI_DEBUG'] + f'_{ryhma}.npz', orto=orto.astype(np.float16), tayt=tayt.astype(np.float16), puhdas=puhdas, P=P, lo=lo)
        log(f'SIIVOUS: ryhmä {ryhma}: {len(K)} pintaa maalattu, puhdasta maata {puhdas.mean():.2f}, tekseleitä {int(M.sum())}')
    sauma = reunat(rgb, uvp, M_kaikki, np.concatenate(K_kaikki), LAAJENNUS)
    log(f'SIIVOUS: valmis {time.time()-t0:.1f} s, saumavara {sauma} px')
    return co, poista


def tallenna_kuva(kuva, polku):
    """Tallentaa siivotun tekstuurin omaan tiedostoon (lähde säilyy)."""
    kuva.filepath_raw = polku; kuva.file_format = 'PNG'; kuva.save()
