# Olavinlinnan fotogrammetriakuoren siivous (Linnanrakentaja 29.9.2026): poistaa vuoden 2021 restauroinnin työmaaromun
# (telineet, henkilönostin, työkoneet, pressut ja kontti). Ajetaan ulkokuori.py:n keskityksen jälkeen (`--siivoa`).
# Geometria: alueen (monikulmio, metrit keskityksen jälkeen: x itä, y pohjoinen) maanläheiset vertexit (romu mukaan
# lukien, enintään alueen korkeusrajan verran maasta) litistetään paikalliseen maanpintaan: ei ryppyjä eikä varjoja. Tekstuuri: alueen
# ortokuva kloonataan puhtaalta kivetykseltä (kuori_orto.py) ja maalataan vain alueen kolmioiden omiin tekseleihin.
#   Kutsu: ulkokuori.py --siivoa; kehitys: siivoa_np() numpy-taulukoilla.
import os, sys, time
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from kuori_geom import sisalla, maakentta, tasomaa, etaisyys
from kuori_tex import laajenna
from kuori_orto import ortokuva, kloonaa, paluu, reunat, seinapaikka

def _laatikko(x0, x1, y0, y1): return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


def _laajenna(p, d):
    """Monikulmio d m ulospäin (kärjet kulman puolittajaa pitkin; kiertosuunnasta riippumatta)."""
    q = np.asarray(p, float); n = len(q); ala = 0.5 * np.sum(q[:, 0] * np.roll(q[:, 1], -1) - np.roll(q[:, 0], -1) * q[:, 1])
    ulos = []
    for i in range(n):
        a, b, c = q[i - 1], q[i], q[(i + 1) % n]
        n1 = np.array([b[1] - a[1], a[0] - b[0]]); n2 = np.array([c[1] - b[1], b[0] - c[0]])
        n1 /= np.linalg.norm(n1); n2 /= np.linalg.norm(n2)
        if ala < 0: n1, n2 = -n1, -n2  # vastapäivään oikea normaali osoittaa ulos, myötäpäivään sisään
        m = n1 + n2; m /= max(np.linalg.norm(m), 1e-9); k = d / max(float(m @ n1), 0.3)
        ulos.append(tuple((b + m * k).round(3)))
    return ulos

# (nimi, monikulmio, korkeus, ryhmä[, maa]): alueen vertexit, jotka ovat alle `korkeus` m paikallisesta maanpinnasta, litistetään
# maahan; korkeus rajataan romun mukaan, jotta muurit ja katot alueen reunalla säilyvät. Ryhmän alueet täytetään yhtenä
# (yhteinen reunarengas: varjot ja sävyt jatkuvat alueelta toiselle). Valinnainen `maa` (m): maanpinta on tason
# mukainen sovitus sen ympäriltä (kuori_geom.tasomaa) eikä maakenttä; muurien vieri ja korkeat kannet (v16, 30.9.).
ALUEET = [
    ('telineet', [(2.4, 1.8), (8.5, 5.0), (10.4, 3.7), (15.6, -6.4), (15.0, -11.6), (14.5, -15.2), (13.7, -17.2), (11.7, -17.7)], 8.0, 'piha'),
    ('henkilonostin', _laatikko(17.4, 24.4, 4.0, 10.8), 6.0, 'piha'),
    ('kone_vihrea_ne', _laatikko(33.0, 39.2, 12.2, 19.4), 6.0, 'piha'),
    ('putket_ja_kone_vihrea_ke', [(19.4, 4.6), (23.8, 4.6), (23.8, 0.8), (26.2, 0.6), (26.2, -3.8), (22.6, -3.8), (22.6, 0.0), (19.4, 0.0)], 6.0, 'piha'),
    ('putket_pohjoinen', _laatikko(10.8, 19.6, -0.8, 5.8), 6.0, 'piha'),
    ('putket_keski', _laatikko(14.0, 23.5, -8.3, -0.8), 3.0, 'piha'),
    # Pohjoisrakennuksen seinän vieri telineiden takana: 1,1 m räystäslinjasta (y = 2,3 + 0,543 x) etelään.
    ('seinan_vieri', [(3.0, 2.8), (19.0, 11.5), (19.6, 5.8), (10.8, 5.8), (8.5, 5.0)], 3.0, 'piha'),
    ('romu_ita', [(26.4, -3.3), (40.5, -3.3), (40.5, -8.5), (33.5, -8.8), (26.4, -8.8)], 3.0, 'piha', -2.2),  # v16: putket jäivät v13:ssa
    # Lounaan tasku: pressut, kontti ja lankkukasat muurin sisäpintaa myöten (0,2 m vara).
    ('pressut_kontti_romu', [(-18.6, -25.4), (-10.2, -29.5), (-4.5, -31.6), (-3.2, -31.9), (-2.9, -33.3), (-3.7, -35.1),
                             (-5.9, -35.0), (-11.3, -33.3), (-15.3, -34.8), (-15.7, -37.9), (-17.0, -38.2), (-21.0, -38.1),
                             (-25.3, -37.8), (-25.3, -30.0), (-21.4, -29.9), (-20.5, -27.5)], 3.5, 'lounas'),
    # --- v16 (30.9.2026): romuinventaario yläkuvasta ja vinokuvista (scratchpad-agentti, Linnanrakentaja tarkisti). ---
    # Koillinen: 1 m korkea puukansi pohjoismuurin vieressä (kansi −1,3, piha −2,3): suursäkit, telinekehikot, putkikasat.
    ('putkikasa_portaan_vieri', [(19.4, 17.6), (21.4, 17.6), (21.6, 21.0), (21.0, 23.2), (19.4, 23.2)], 1.8, 'koillinen_kansi', -1.2),
    ('saekit_ja_kehikot', [(21.8, 20.4), (39.6, 28.9), (39.6, 32.7), (21.8, 24.0)], 2.5, 'koillinen_kansi', -1.33),
    ('kannen_ita_irtotavara', [(34.5, 23.4), (38.0, 23.4), (40.3, 25.0), (40.3, 28.4), (34.5, 25.6)], 1.0, 'koillinen_kansi', -1.3),
    ('kannen_reunaputket', [(21.6, 11.6), (37.8, 21.3), (37.8, 23.2), (21.6, 13.5)], 0.7, 'koillinen'),  # kannen reuna 0,9 m
    ('kehys_pihalla', _laatikko(29.0, 30.9, 14.7, 16.4), 0.6, 'koillinen'),
    ('tahra_piha', _laatikko(32.4, 34.3, 6.8, 9.6), 0.5, 'koillinen'),          # v13:n jättämä harmaa läiskä (tekstuuri)
    ('laatikko_piha_ita', _laatikko(43.2, 44.6, 17.2, 18.6), 0.6, 'koillinen'),
    ('putki_piha_koillinen', _laatikko(40.6, 42.8, 19.6, 23.4), 0.6, 'koillinen'),
    # Pihan itäreuna: telineputkipino portaiden vieressä ja putket itäportaan muurin vieressä.
    ('putkipino_portaan_vieri', _laatikko(47.6, 49.4, -0.2, 9.0), 1.2, 'itaportas', -2.8),
    ('putket_itaportaan_vieri', [(37.6, -8.4), (49.2, -0.7), (49.2, 2.4), (37.6, -5.2)], 1.2, 'itaportas', -2.6),
    # Koillisbastionin piha (maa −5,5): suursäkit ja valkoinen laatikko tornin juurella.
    ('saekit_bastioni', [(53.0, 37.7), (56.8, 38.2), (58.7, 39.1), (58.7, 41.5), (56.5, 41.6), (53.6, 40.9)], 2.0, 'koillisbastioni', -5.55),
    # Kaakon kenttä: musta puuaitaus kahdella katoksella, koppi, tynnyrit, renkaat ja lava, kaksi henkilönostinta.
    # v18: 1 m laajemmaksi muurin juureen asti (muurin juuren suoja pitää muurin): juurelle jääneet nostimen ja aidan
    # sirpaleet ovat nyt alueella.
    ('aitaus_kopit_nostimet', _laajenna([(42.6, -25.8), (45.9, -28.0), (52.2, -24.6), (54.0, -22.2), (56.7, -22.3), (60.3, -21.2),
                               (60.3, -18.8), (49.5, -14.9), (48.5, -16.2), (46.8, -20.1), (43.3, -25.3)], 1.0), 4.0, 'kaakko', -5.45),
    ('ovi_kentalla', _laatikko(49.5, 53.8, -26.4, -23.8), 1.0, 'kaakko', -5.6),  # v16b: aitauksen ovi rajan päällä
    ('lankut_ja_lava_kaakko', [(38.6, -32.9), (44.8, -32.9), (44.8, -29.6), (40.5, -27.6), (38.6, -27.6)], 1.5, 'kaakko', -5.7),
    # Etelä: kärry eteläportaiden vieressä.
    ('karry_portaiden_vieri', _laatikko(26.5, 29.3, -12.1, -10.0), 1.5, 'etela'),
    # Läntinen sisäpiha: lankut, puna-valkoiset työmaa-aidat, kuormalava, säkit, valkoinen laatikko.
    ('lansipiha_romu', [(-25.6, -11.7), (-21.0, -15.0), (-17.8, -14.4), (-16.2, -10.8), (-17.6, -8.6), (-18.9, -5.8),
                        (-24.2, -5.8), (-25.4, -8.0)], 1.8, 'lansipiha'),
    # Lounas: kulmaan jäänyt romukasa ja lankku nurmella.
    ('romukasa_lounaskulma', [(-20.8, -28.9), (-20.6, -31.0), (-17.6, -31.0), (-15.8, -29.4), (-16.2, -26.9), (-18.4, -25.9),
                              (-19.9, -26.6)], 4.0, 'lounas', -5.6),
    ('lankku_nurmella', _laatikko(-14.2, -9.3, -36.9, -35.3), 0.6, 'lounas'),
    # Itäbastionin sorakatto (11,9 m): kohdevalo ja kaapeli.
    ('kohdevalo_sorakatto', _laatikko(63.4, 65.6, -2.2, -0.6), 0.8, 'itabastioni'),
    # Portin edustan moottorivene (v16b, Päätoimittaja): painetaan vedenpinnan (−7) alle, pelin vesi peittää.
    ('moottorivene', _laatikko(-67.9, -64.1, -16.5, -12.9), 1.2, 'vene', -7.0),
    # v19 (Päätoimittaja 1.10., aikakerros n1500): nykyinen ponttonisilta, sen kellukkeet ja portin teräsluiska pois;
    # tilalle laituri.js:n puulaituri suoraan vesiportilta. Raja kulkee 0,75 m kallion ja muurin juuren ulkopuolella
    # (kuoren ylhäältä säteillä mitattu kallioviiva 1.10.) ja 0,3 m ennen portin ovea (luiskan tolpat mukaan); kaiteet (≤ 2,6 m vedestä)
    # mukaan. Kaikki painuu vedenpinnan alle (maa −7,0); venyneet reunakolmiot jäävät verhoksi kallion juurelle.
    ('ponttonisilta', [(-100.0, 3.0), (-80.5, 3.0), (-79.0, 1.0), (-76.3, -2.0), (-72.0, -5.0), (-67.5, -8.0),
                       (-63.3, -10.0), (-61.5, -12.0), (-60.3, -13.0), (-59.0, -14.0), (-58.6, -15.2), (-55.0, -15.2),
                       (-54.3, -18.0), (-53.0, -19.0), (-52.3, -21.0), (-52.3, -22.0), (-53.5, -24.0), (-54.5, -26.0),
                       (-56.0, -28.0), (-56.5, -30.0), (-56.3, -33.0), (-55.8, -36.0), (-100.0, -36.0)], 2.6, 'ponttoni', -7.0),
    # v19: luoteiskärjen moottorivene ja keltainen merkkipaalu (kallio alkaa y < 12,6 ja x > −70)
    ('vene_ja_merkki_luode', [(-82.0, 12.8), (-71.5, 12.8), (-70.5, 14.5), (-70.5, 19.5), (-82.0, 19.5)], 3.0, 'ponttoni', -7.0),
    # Korkeat kannet (maakenttä putoaisi alapihalle, siksi kiinteä taso): itämuurin harjan kävelykansi 12 m,
    # eteläinen yläkansi 5,7 m ja alakatto 2,8 m.
    ('ita_harja_telineet', [(40.6, 34.5), (41.5, 30.0), (44.9, 24.0), (46.3, 20.0), (49.4, 14.4), (51.2, 9.5),
                            (54.4, 9.5), (52.6, 14.4), (49.6, 20.0), (48.2, 24.0), (44.8, 30.0), (43.9, 34.5)], 1.8, 'ita_harja', 12.1),
    ('ita_harja_irtotavara', [(50.2, 19.0), (53.0, 19.0), (56.6, 22.0), (56.6, 24.6), (54.6, 27.8), (52.0, 27.8), (49.0, 24.0)], 1.5, 'ita_harja', 12.2),
    ('koillinen_harja_irtotavara', [(43.9, 30.5), (47.0, 30.5), (49.0, 32.5), (48.4, 34.8), (44.4, 35.4)], 1.5, 'ita_harja', 12.2),
    ('muovit_ylakansi', _laatikko(39.0, 42.2, -22.9, -20.6), 1.0, 'etela_katto', 5.75),
    ('lankut_ylakansi', [(34.0, -15.3), (36.0, -15.3), (37.4, -12.4), (35.2, -11.8), (34.0, -12.2)], 0.8, 'etela_katto', 5.72),
    ('pressu_luukulla', [(36.0, -14.2), (38.8, -13.8), (38.8, -10.4), (36.4, -10.4)], 0.8, 'etela_katto', 5.72),
    ('laatikko_alakatto', _laatikko(17.1, 18.7, -23.6, -21.7), 0.8, 'etela_alakatto', 2.8),
    ('muovi_alakatto_ita', _laatikko(17.0, 20.9, -26.6, -25.2), 0.6, 'etela_alakatto', 2.8),
]
DZ = 0.10        # tätä korkeammalla maanpintaa olevat vertexit lasketaan "painetuiksi" (loki)
RES = 0.03       # ortokuvan ruutu (m)
MARG = 18.0      # ortokuvan reunus alueen ympärillä (m): kloonauslähteet
LAAJENNUS = 3    # UV-saumavara pikseleinä (vain vapaisiin pikseleihin)
PUHDAS_VALI = 1.0  # puhtaan maan etäisyys mistä tahansa alueesta (m)
LAHDE_VALI = 6.0  # kiinteän tason alueen kloonauslähteet näin kaukaa tasolta (m); 15 m toi harjan kannelle muurin kiveä
PUHDAS_VALI_KANSI = 0.3  # kansiryhmän puhdas kansi näin lähellä alueita (kapea kansi: 1 m jätti harjalle harmaan laikun)
PAINUMA = 0.05  # painetun romun etäisyys maanpinnan alla (m)
ALAVARA = 0.6   # näin paljon maanpinnan alapuolella olevat (urat romun alla) nostetaan maahan
VENYMA = 0.5    # venynyt kolmio: kärki painui yli tämän ja toinen kärki jäi yli tämän maasta
# Venyneiden kolmioiden käsittely ryhmittäin: 'poista' (vapaa piha), 'jata' (muurin vieri: takana ei ole pintaa) tai
# 'paikkaa' (v16: jätetään ja maalataan muurin kivellä edestä kloonaten, kuori_orto.seinapaikka) tai 'tayta' (v17:
# pilkotaan ja saavat oman UV:n atlaksen vapaasta tilasta, sitten sama maalaus; kuori_tayte). v23 (1.10.): 'lounas' jata → tayta
# (lounaisbastionin sisäkulman muurissa näkyi venymäraitoja lähikameraan).
RYHMAT = {'piha': 'poista', 'lounas': 'tayta', 'koillinen': 'paikkaa', 'koillinen_kansi': 'paikkaa', 'itaportas': 'paikkaa', 'kaakko': 'tayta', 'koillisbastioni': 'poista',
          'lansipiha': 'poista', 'etela': 'poista', 'itabastioni': 'poista', 'ita_harja': 'poista', 'etela_katto': 'poista',
          'etela_alakatto': 'poista', 'vene': 'poista', 'ponttoni': 'paikkaa'}
VEDEN_ALLE = {'ponttoni', 'vene'}
VEDEN_ALLE_SYVYYS = 0.3  # painuma tason (vedenpinnan) alle näissä ryhmissä  # ryhmät, joiden pinta painuu kokonaan vedenpinnan alle: geometria vain, ei maalausta


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
    nl = len(me.loops); kn = np.empty(nl * 3, np.float32); me.corner_normals.foreach_get('vector', kn); kn = kn.reshape(nl, 3)
    vanha = co.copy()
    co, poista = siivoa_np(co, tv, uv, rgb, log)
    me.vertices.foreach_set('co', co.ravel()); me.update()
    # OBJ:n omat kulmanormaalit jäivät siirrettyihin kärkiin (entisten seinien normaalit sivulle), jolloin litistetty
    # romu näkyi hämärän leivonnassa tummina kuvioina (v16, 30.9.): siirrettyjen kärkien kulmille uuden pinnan normaali.
    siirretty = np.abs(co - vanha).max(1) > 1e-4
    lv = np.empty(nl, np.int32); me.loops.foreach_get('vertex_index', lv)
    pn = np.empty(len(me.polygons) * 3, np.float32); me.polygons.foreach_get('normal', pn); pn = pn.reshape(-1, 3)
    lp = np.empty(nl, np.int32)
    ls = np.empty(len(me.polygons), np.int32); me.polygons.foreach_get('loop_start', ls)
    lt = np.empty(len(me.polygons), np.int32); me.polygons.foreach_get('loop_total', lt)
    lp = np.repeat(np.arange(len(me.polygons)), lt)
    m = siirretty[lv]; kn[m] = pn[lp[m]]
    me.normals_split_custom_set(kn.tolist()); me.update()
    log(f'SIIVOUS: normaalit uusittu {int(m.sum())} kulmaan ({int(siirretty.sum())} siirrettyä kärkeä)')
    if poista.any() or TAYTTO.any():
        import bmesh
        pi = np.empty(nt, np.int32); me.loop_triangles.foreach_get('polygon_index', pi)
        pois = set(np.unique(pi[poista]).tolist())
        tpois = set(np.unique(pi[TAYTTO]).tolist()) - pois
        bm = bmesh.new(); bm.from_mesh(me)
        lay = bm.faces.layers.int.new('tayte'); bm.faces.ensure_lookup_table()  # kerros ennen viittauksia
        for i in tpois: bm.faces[i][lay] = 1
        bmesh.ops.delete(bm, geom=[bm.faces[i] for i in pois], context='FACES_ONLY')
        uusia = 0
        if tpois:
            import kuori_tayte
            from kuori_tex import rasteri
            varattu = kuori_tayte.varaus(uv, poista | np.isin(pi, list(tpois)), W, rasteri)
            uusia = kuori_tayte.tayta(bm, varattu, W, log)
        bm.to_mesh(me); bm.free(); me.update()
        log(f'SIIVOUS: poistettu {len(pois)} venynyttä pintaa, uusi UV {uusia} pinnalle')
        if uusia:
            # Pilkottujen pintojen uusilla kulmilla ei ole kelvollista omaa normaalia (hämärässä tummat piikit):
            # kulmanormaali = pinnan normaali, muut ennallaan.
            a = me.attributes['tayte']; t = np.empty(len(me.polygons), np.int32); a.data.foreach_get('value', t)
            nl = len(me.loops); kn = np.empty(nl * 3, np.float32); me.corner_normals.foreach_get('vector', kn); kn = kn.reshape(nl, 3)
            pn = np.empty(len(me.polygons) * 3, np.float32); me.polygons.foreach_get('normal', pn); pn = pn.reshape(-1, 3)
            lt = np.empty(len(me.polygons), np.int32); me.polygons.foreach_get('loop_total', lt)
            lp = np.repeat(np.arange(len(me.polygons)), lt); m = t[lp] == 1
            kn[m] = pn[lp[m]]; me.normals_split_custom_set(kn.tolist()); me.update()
            global MASKI
            MASKI = MASKI | kuori_tayte.maalaa(me, rgb, log)
    # Alfa 1 kaikkialle: atlaksen tyhjät kohdat ovat läpinäkyviä, ja JPEG-vienti teki sinne maalatut uudet UV-kartat
    # valkoisiksi (v17).
    pix[..., :3] = rgb; pix[..., 3] = 1; kuva.pixels.foreach_set(pix.ravel()); kuva.update()


def siivoa_np(co, tv, uv, rgb, log=print):
    """co (N,3), tv (T,3), uv (T,3,2) 0..1, rgb (H,W,3) float32 (muokataan paikallaan). Palauttaa (uudet vertexit,
    poistettavat kolmiot bool (T,))."""
    t0 = time.time(); H, W = rgb.shape[:2]
    uvp = uv * np.array([W, H], np.float32); co = co.copy()
    kp = co[tv].mean(1)
    nrm = np.cross(co[tv[:, 1]] - co[tv[:, 0]], co[tv[:, 2]] - co[tv[:, 0]])
    ylos = np.abs(nrm[:, 2]) > 0.6 * np.linalg.norm(nrm, axis=1)
    M_kaikki = np.zeros((H, W), bool); K_kaikki = []; poista = np.zeros(len(tv), bool); taytto = np.zeros(len(tv), bool)
    for ryhma, tapa in RYHMAT.items():
        osat = [(a[0], np.asarray(a[1], float), a[2], a[4] if len(a) > 4 else None) for a in ALUEET if a[3] == ryhma]
        polyt = [o[1] for o in osat]; pk = np.vstack(polyt)
        muiden = [np.asarray(a[1], float) for a in ALUEET if a[3] != ryhma]
        g = maakentta(co, polyt, marg=MARG + 2, pros=5)
        lo = pk.min(0) - MARG; hi = pk.max(0) + MARG
        Wg = int(np.ceil((hi[0] - lo[0]) / RES / 256)) * 256; Hg = int(np.ceil((hi[1] - lo[1]) / RES / 256)) * 256
        # Ortokuvan kolmiot (alkuperäinen geometria) ja maanpinta: ylöspäin ja enintään 0,35 m maasta.
        ehd = np.flatnonzero((kp[:, 0] > lo[0] - 1) & (kp[:, 0] < lo[0] + Wg * RES + 1) & (kp[:, 1] > lo[1] - 1) & (kp[:, 1] < lo[1] + Hg * RES + 1))
        maa_t = np.zeros(len(tv), bool); maa_t[ehd] = ylos[ehd] & (kp[ehd, 2] - g(kp[ehd, :2]) < 0.35)
        tasot = {nimi: tasomaa(kp, ylos, p, maa) for nimi, p, _, maa in osat if maa is not None}
        kansi = len(tasot) == len(osat)
        if kansi:  # kansiryhmä: lähteet vain kannelta (maakentän alapiha näkyy ortokuvassa kannen ohi)
            maa_t[:] = False
        for nimi, p, _, maa in osat:  # kiinteän tason alueiden ympäristön maa kloonauslähteiksi (LAHDE_VALI)
            if maa is None: continue
            e = ehd[(np.abs(kp[ehd, 0] - p[:, 0].mean()) < np.ptp(p[:, 0]) / 2 + LAHDE_VALI) & (np.abs(kp[ehd, 1] - p[:, 1].mean()) < np.ptp(p[:, 1]) / 2 + LAHDE_VALI)]
            maa_t[e] |= ylos[e] & (np.abs(kp[e, 2] - tasot[nimi](kp[e, :2])) < 0.35)
        orto, maa = ortokuva(co, tv, uvp, rgb, ehd, maa_t, lo, RES, Hg, Wg)
        gy, gx = np.mgrid[0:Hg, 0:Wg]; gxy = np.stack([(gx.ravel() + 0.5) * RES + lo[0], (gy.ravel() + 0.5) * RES + lo[1]], 1)
        oma = np.zeros(len(gxy), bool); muut = np.zeros(len(gxy), bool)
        for q in polyt: oma |= sisalla(gxy, q)
        for q in muiden: muut |= sisalla(gxy, q)
        P = laajenna(oma.reshape(Hg, Wg), int(0.3 / RES)); muut = laajenna(muut.reshape(Hg, Wg), int(PUHDAS_VALI / RES))
        puhdas = maa & ~muut & ~laajenna(P, int((PUHDAS_VALI_KANSI if kansi else PUHDAS_VALI) / RES))
        rengas = maa & ~muut & laajenna(P, int(2.5 / RES)) & ~P
        # Veden alle painuva ryhmä (v19 ponttonisilta): ei maalausta, pinta jää vedenpinnan alle eikä ympärillä ole maata
        # kloonauslähteeksi (kloonaa() kaatui tyhjään renkaaseen 1.10.).
        tayt = None if ryhma in VEDEN_ALLE else kloonaa(orto, puhdas, P, RES, rengas, askel_m=1.0 if kansi else 3.0)  # kapea kansi: 6 m:n ikkuna ei mahdu
        # Geometria: alueiden maanläheiset vertexit maahan (kukin oman korkeusrajansa mukaan).
        lahi = np.flatnonzero((co[:, 0] > pk[:, 0].min() - 3) & (co[:, 0] < pk[:, 0].max() + 3) & (co[:, 1] > pk[:, 1].min() - 3) & (co[:, 1] < pk[:, 1].max() + 3))
        gk = np.zeros(len(co), np.float32); gk[lahi] = g(co[lahi, :2])
        Kr = np.zeros(len(tv), bool); venyneet = np.zeros(len(tv), bool); juuret = np.zeros(len(tv), bool)
        for nimi, p, korkeus, maa in osat:
            alue = sisalla(co[:, :2], p)
            suoja = np.zeros(len(co), bool)
            if maa is not None:  # tason maa alueelle ja 3 m:n vyöhykkeelle (venymätesti) tason ylä- ja yläpuolella
                t = tasot[nimi](co[lahi, :2])
                if ryhma in VEDEN_ALLE: t = np.full_like(t, maa)  # vedenpinnan alle tasan (sovitettu taso jäi −6,9:ään, 1.10.)
                oma = alue[lahi] | ((co[lahi, 2] > t - 0.5) & (etaisyys(co[lahi, :2], p) < 3.0))
                gk[lahi[oma]] = t[oma]
                # Muurin juuri säilyy: kärki, jonka 0,25 m:n pystysarakkeessa pinta jatkuu yli korkeusrajan (linnan muuri
                # nousee siitä), ei ole irtoromua. Muuten muurin alaosa painui romun mukana ja venyi raidoiksi (v16).
                i = np.flatnonzero(alue); R = 0.25
                kx = np.floor(co[lahi, 0] / R).astype(np.int64); ky = np.floor(co[lahi, 1] / R).astype(np.int64)
                avain = kx * 1_000_003 + ky; jarj = np.argsort(avain); ak = avain[jarj]
                raja = np.maximum.reduceat(co[lahi, 2][jarj], np.r_[0, np.flatnonzero(np.diff(ak)) + 1])
                ainut = ak[np.r_[0, np.flatnonzero(np.diff(ak)) + 1]]
                oa = np.floor(co[i, 0] / R).astype(np.int64) * 1_000_003 + np.floor(co[i, 1] / R).astype(np.int64)
                korkein = raja[np.clip(np.searchsorted(ainut, oa), 0, len(ainut) - 1)]
                suoja[i] = korkein > gk[i] + korkeus + 1.0
            tas = alue & ~suoja & (co[:, 2] < gk + korkeus) & (co[:, 2] > gk - ALAVARA)
            siirr = tas & (co[:, 2] > gk + DZ)
            zv = co[:, 2].copy(); co[tas, 2] = gk[tas]
            # Painettu romu 5 cm maanpinnan alle: päällekkäiset pinnat eivät varjosta toisiaan leivonnassa (hämärä 29.9.).
            co[siirr, 2] = gk[siirr] - (VEDEN_ALLE_SYVYYS if ryhma in VEDEN_ALLE else PAINUMA)
            if ryhma in VEDEN_ALLE: co[tas, 2] = gk[tas] - VEDEN_ALLE_SYVYYS  # myös maan tasolle jääneet (−7,0 välkkyi veden kanssa)
            ylhaalla = np.zeros(len(co), bool); ylhaalla[lahi] = ~tas[lahi] & (co[lahi, 2] - gk[lahi] > VENYMA)
            ven = ((zv - co[:, 2])[tv] > VENYMA).any(1) & ylhaalla[tv].any(1)
            if tapa == 'poista': poista |= ven
            if tapa == 'paikkaa': venyneet |= ven
            if tapa == 'tayta': taytto |= ven
            if tapa in ('paikkaa', 'tayta') and suoja.any():
                # Muurin juurelle suojan takia pystyyn jääneet romun sirpaleet (nostimen ja aidan palat): alhaalla olevat
                # pinnat, joissa on suojattu kärki, maalataan muurin kivellä (v18; hämärässä ne näkyivät tummina piikkeinä).
                matala = (co[tv, 2] < gk[tv] + korkeus + 1.0).all(1)
                juuret |= suoja[tv].any(1) & matala & alue[tv].any(1) & ~ven
            # Maalataan kaikki alueen maanpinnan kolmiot (myös urat) ja painetut; venyneitä ei (muurin vieri jää ennalleen).
            maassa = alue[tv].all(1) & (np.abs(co[tv, 2] - gk[tv]) < ALAVARA + 0.05).all(1)
            Kr |= (maassa | siirr[tv].any(1)) & ~ven
            log(f'SIIVOUS: {nimi}: {int(alue.sum())} vertexiä alueella, {int(siirr.sum())} painettu maahan '
                f'(dz keskim. {float((zv[siirr]-gk[siirr]).mean()) if siirr.any() else 0:.2f} m), venyneitä {int(ven.sum())} ({tapa}), muurin juuria {int(suoja.sum())}')
        venyneet |= juuret & ~taytto
        if venyneet.any():  # v19: myös veden alle painuvien ryhmien verhot maalataan muurin kivellä
            Ms, vaaka = seinapaikka(co, tv, uvp, rgb, np.flatnonzero(venyneet), log=log)
            Kr[vaaka] = True; M_kaikki |= Ms; K_kaikki.append(np.setdiff1d(np.flatnonzero(venyneet), vaaka))
        K = np.flatnonzero(Kr & ~poista)
        M = paluu(rgb, co, tv, uvp, K, tayt, lo, RES) if tayt is not None else np.zeros((H, W), bool)
        M_kaikki |= M; K_kaikki.append(K)
        if os.environ.get('KUORI_DEBUG') and tayt is not None:
            np.savez_compressed(os.environ['KUORI_DEBUG'] + f'_{ryhma}.npz', orto=orto.astype(np.float16), tayt=tayt.astype(np.float16), puhdas=puhdas, P=P, lo=lo)
        log(f'SIIVOUS: ryhmä {ryhma}: {len(K)} pintaa maalattu, puhdasta maata {puhdas.mean():.2f}, tekseleitä {int(M.sum())}')
    sauma = reunat(rgb, uvp, M_kaikki, np.concatenate(K_kaikki), LAAJENNUS)
    log(f'SIIVOUS: valmis {time.time()-t0:.1f} s, saumavara {sauma} px')
    global MASKI, TAYTTO
    TAYTTO = taytto  # 'tayta'-ryhmien venyneet kolmiot: siivoa() poistaa ja täyttää (kuori_tayte)
    MASKI = M_kaikki  # maalatut tekselit (kuvan rivijärjestys), hämärän valon tasoitukseen (tallenna_maski)
    return co, poista


def tallenna_maski(polku):
    """Tallentaa viimeisimmän siivouksen maalatut tekselit (valkoinen) PNG:ksi: kuori_hamara.py --tasoita."""
    import bpy
    H, W = MASKI.shape; k = bpy.data.images.new('siivousmaski', W, H)
    p = np.zeros((H, W, 4), np.float32); p[..., :3] = MASKI[..., None]; p[..., 3] = 1
    k.pixels.foreach_set(p.ravel()); k.filepath_raw = polku; k.file_format = 'PNG'; k.save()


def tallenna_kuva(kuva, polku):
    """Tallentaa siivotun tekstuurin omaan tiedostoon (lähde säilyy)."""
    kuva.filepath_raw = polku; kuva.file_format = 'PNG'; kuva.save()
