/*
 * AJATTELIJAT-LINSSI: SOKRATES (pilotti; omistaja 1.10.2026, loki "AJATTELIJOIDEN KIPSIBYSTIT KARTALLE").
 *
 * Kohtauksen luvut ovat Linnanrakentajan Blender-mallista (tools/linssit/blender/sokrates_bysti.py, haara
 * linnanrakentaja-sokrates-bysti, v7–v10) SELLAISINAAN Blenderin koordinaateissa (metrit, z ylös, kasvot −y),
 * jotta mallin ja webin vertailu on suora. js/linssit/ajattelija.js muuntaa ne three.js:n koordinaatteihin (b2t).
 * Ruudut ovat Blenderin 30 r/s -ruutuja; webi laskee ajan ruutuina (aika × 30).
 *
 * Tekstit: docs/raportit/sokrates-v10/tekstit.json (Linnanrakentaja 2.10.2026). Taustarivit ovat vielä
 * PAIKKAMERKKEJÄ (hyväksytyt 38a/21d/49b ja kaksi suomenkielistä), kunnes Sisältökirjurin 18 katkelmaa tulevat.
 */

import { SOKRATES_AIKAJANA } from './ajattelija-sokrates-aikajana.js';

export const SOKRATES = Object.freeze({
  tunnus: 'sokrates',
  nimi: 'Sokrates',
  vuodet: 'n. 470–399 eaa.',
  kysymys: 'Miten pitäisi elää?',
  // GLB: proto-3d/_valmiit/sokrates-bysti/v1 (SMK KAS635, PDM 1.0; Scan the World / SMK). L1 ~50 k kolmiota + normaalikartta.
  malli: 'ajattelijat/sokrates/v1/sokrates-L1.glb',
  // Kartan pää ERIKOISNOSTOT-sarakkeessa (js/ajattelijapaat.js): Linnanrakentaja _valmiit/ajattelijat-kartta/v1, ~5 k kolmiota.
  // Kiinteä karttapiste (omistaja 16.5x): Pohjois-Egeanmeri Pelionin ja Euboian välissä, ei kaupunki eikä nimien päällä.
  kartta: { glb: 'ajattelijat/kartta/v1/sokrates-kartta.glb', maa: 'GRC', piste: [39.49, 23.98] },
  // Kipsin mikronormaali (Poly Haven grey_plaster_02 nor_gl, Rob Tuytel, CC0; 1024 px).
  kipsi: 'ajattelijat/yhteiset/kipsi-nor-1k.jpg',
  korkeus: 0.51,
  // Pään keskipiste (PAA) ja avainvalo (v7 "aurinko"): kova spotti 1,3 m:n päässä, viimeinen V7_VALO-suunta = Rembrandt.
  paa: [0.0, -0.06, 0.38],
  avainvalo: { suunta: [0.95, -0.30, 0.55], etaisyys: 1.3, keila: 32, tahtays: [0.0, -0.06, 0.43] },
  tausta: 0.012,           // maailman väri (lineaarinen)
  // Kamera: Blenderin pystysensori 24 mm → pystykenttä 2·atan(12 / polttoväli).
  otokset: {
    // Nimi ja vuodet alemmasta kuvakulmasta (omistajan v9-palaute 2.10. 10.3x; Linnanrakentaja v10).
    rembrandt: { paikka: [-0.30, -1.02, 0.25], katse: [-0.06, -0.06, 0.40], mm: 35 },
  },
  // Kierros 1: päälause (paalauseet-avain), jonka videotykki projisoi ja jonka lähderivi näytetään.
  kierros: { paalause: '38a' },
  linssi: 18,              // V3B_LINSSI: lähikuvat pinnan yllä
  kierto: 22,              // V6_KIERTO: ± astetta pinnan normaalin ympäri tekstin aikana
  liuku: 0.008,            // V6_LIUKU: ± m sivuttain
  // Päälauseet: paikka säteenä edestä (x, z) → osuma(), projektorin vinous normaaliin, kuva-alan leveys, etäisyys.
  paalauseet: {
    '38a': {
      fi: 'Tutkimaton elämä ei ole elämisen arvoinen ihmiselle.',
      el: 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ',
      viite: 'Platon, Puolustuspuhe 38a',
      sade: [-0.005, 0.418], vino: [-0.40, -0.15, -0.30], ala: 0.075, etaisyys: 0.6,
      korkeus: 0.025625, kameraKulma: 55, kameraMatka: 0.11,
    },
    // Kierrokset 2–3 (Blender v9/v10): poski (Rembrandt-varjon puoli) ja kasvojen sivu valon puolella, säde sivulta.
    '21d': {
      fi: 'Mitä en tiedä, en luulekaan tietäväni.',
      el: 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι',
      viite: 'Platon, Puolustuspuhe 21d',
      sade: [-0.055, 0.352], vino: [-0.55, -0.15, -0.30], ala: 0.065, etaisyys: 0.6, korkeus: 0.02125,
    },
    // v13 (kertojan kappale 07 ja loppu): 30e ja kysymys nauhoina (Linnanrakentajan gobot-v13 nauha-30e, nauha-kysymys).
    '30e': {
      fi: 'Olen kuin paarma, jonka jumala on kiinnittänyt suureen ja laiskaan hevoseen herättämään sitä.',
      el: 'προσκείμενον τῇ πόλει ὑπὸ τοῦ θεοῦ ὥσπερ ἵππῳ μεγάλῳ μὲν καὶ γενναίῳ, ὑπὸ μεγέθους δὲ νωθεστέρῳ καὶ δεομένῳ ἐγείρεσθαι ὑπὸ μύωπός τινος',
      viite: 'Platon, Puolustuspuhe 30e',
      korkeus: 0.025625,
    },
    kysymys: {
      fi: 'Miten pitäisi elää?',
      el: '',
      viite: '',
      korkeus: 0.022,   // kiinteä keskellä (sokrates_bysti.py v13: tykki-kysymys)
    },
    '49b': {
      fi: 'Vääryyttä ei siis saa tehdä koskaan.',
      el: 'οὐδαμῶς ἄρα δεῖ ἀδικεῖν',
      viite: 'Platon, Kriton 49b',
      sivulta: [-0.08, 0.375], vino: [0.0, -0.45, -0.25], ala: 0.075, etaisyys: 0.6, korkeus: 0.02375,
    },
  },
  // Kierros 1 (v7/v10, 30 r/s): intro 1–281, Rembrandt + nimi 282–372, kysymys 373–461, lähestyminen otsalle,
  // 38a, lähderivi, kaiku (b-luenta) ja pito. Ääniraita alkaa ruudusta 0 (sokrates_aani.sh).
  // V12 (omistaja 3.10.2026 klo 04.5x/05.0x; Linnanrakentaja sokrates-luvut-v12.json a6308b998): intro pitenee 442 ruutua
  // (musiikki alusta leikkaamattomana, leikkaukset vain kuuluviin iskuihin); Rembrandt + nimi 724, kysymys 815.
  // V14 (omistaja 3.10.2026 klo 14.5x; sokrates-luvut-v14.json 85b583529): tiivis alku. Rembrandt + nimi ruudussa 184
  // (musiikin huippu 6,1 s), kysymys 250 (8,3 s), kertoja 286 (9,5 s; linssin ajassa 12,0 s). Muut v12:n ajat −540
  // (käytössä vain ilman aikajanaa).
  ajat: {
    nimi: [184, 249], kysymys: [250, 338], lahesty: [364, 457], vieritys: [427, 797], proj: [457, 802],
    lahde: [804, 852], kaariLoppu: 867, kaiku: [867, 1342], pito: 1352,
  },
  /*
   * PROLOGI (omistaja 2.10. 08.5x; kaikkien ajattelijoiden vakioaloitus, sokrates_bysti.py --prologi): 0–1 s pimeää →
   * kytkin napsahtaa → reunavalot syttyvät hehkulangan tavoin (t^2,2 ja pieni värähdys) → leikkaus introon. 120 ruutua.
   * Omistaja 2.10. klo 10.3x (v9-palaute): ei taustavaloa eikä kehää, vain ääriviivavalo (levy ja takavalo pois).
   */
  prologi: {
    // V14 (omistaja 3.10.2026 klo 14.5x: alku liian hidas; sokrates-luvut-v14.json 822739628): 75 ruutua (2,5 s),
    // musiikki alkaa heti prologin jälkeen. Kytkin 30 ja täysi valo 58 ennallaan.
    kytkin: 30, taysi: 58, loppu: 75,
    kamera: { paikka: [-0.22, -1.15, 0.34], katse: [0.0, -0.04, 0.30], mm: 35 },
    vari: [1.0, 0.86, 0.66],
    valot: [
      { paikka: [-0.30, 0.55, 0.42], kohde: [0.0, -0.06, 0.42], teho: 45, keila: 26, blend: 0.45 }, // reunavalo vasemmalta takaa
      { paikka: [0.30, 0.55, 0.42], kohde: [0.0, -0.06, 0.42], teho: 45, keila: 26, blend: 0.45 },  // reunavalo oikealta takaa
    ],
  },
  // INTRO (v7): leikkaukset Zarathustran iskuihin (CONSTANT) ja aurinko kiertää takaa kohti Rembrandtia.
  intro: {
    /*
     * V11 (omistaja 3.10.2026 klo 00.0x: "ajattelijoiden alkukuvat saisivat olla enemmän varjopuolelta kuvattuja, jotta
     * kasvoille piirtyisi enemmän pelkkä valon piirtämä ääriviiva"; Blender --v11, sokrates-luvut-v11.json): kamera
     * valon vastapuolelle (x → −|x|) ja aurinko kameran vastakkaiselta sivulta (1,0 / 0,05 / 0,5); avausruudussa valo
     * hieman edestä. Rembrandt + nimi (282) ennallaan.
     */
    /*
     * V12 (omistaja 3.10.2026): yksi hidas ajo profiilista ¾-kuvaan (ruudut 1→520, BEZIER), sitten leikkaukset vain
     * kuuluviin iskuihin (521, 627, 649, 673). Kamera varjon puolella (v11). Aurinko sivulta (omistajan toive):
     * intro (1,0 / −0,45 / 0,5), Rembrandtista (724) eteenpäin (0,95 / −0,30 / 0,55). Tausta pimeä, ei täyttöä.
     */
    /*
     * V14 (omistaja 3.10.2026 klo 14.5x; sokrates-luvut-v14.json 85b583529, silmä ja suu korjattu): lyhyt ajo 1 → 60, sitten leikkaukset
     * musiikin iskuihin: suuri sointu 61 (2,0 s), patarummut 118 / 136 / 154 (3,9 / 4,5 / 5,1 s), huippu ja
     * Rembrandt 184 (6,1 s). Aikajana-tilassa kamera ja aurinko tulevat aikajanasta; nämä samat avaimet ilman sitä.
     */
    otokset: [   // [ruutu, kameran paikka, katsepiste, mm, tapa?]
      [1, [-0.85, 0.3, 0.52], [0, -0.04, 0.38], 35, 'BEZIER'],
      [60, [-0.8, 0.1, 0.48], [0, -0.05, 0.38], 35],
      [61, [-0.72, -0.08, 0.35], [0, -0.08, 0.34], 45],
      [118, [0.22, -0.55, 0.425], [0.03, -0.12, 0.392], 50],   // silmä
      [136, [-0.05, -0.5, 0.3], [0, -0.13, 0.285], 50],        // suu ja parta
      [154, [-0.42, -0.52, 0.82], [0, -0.07, 0.4], 35],
    ],
    // Auringon suunta (paikka − aurinko_kohde) v14-avaimista.
    valo: [[1, [1.075, 0.591, 0.43]], [61, [1.129, -0.508, 0.395]], [118, [0.697, -0.697, 0.847]],
      [136, [0.729, -0.841, 0.673]], [154, [0.342, -0.968, 0.797]], [184, [1.085, -0.343, 0.628]]],
    tayte: 0,
  },
  /*
   * KAIKU (v8–v10): kaikukuva samalla videotykillä otsalla b-luennan ajan, ainoana valona (aurinko ja maailma
   * hiipuvat 45 ruudussa), seepiana, liukuu hitaasti; voima sykkii Satien verhokäyrän mukaan (1 ± 0,15). Himmeä,
   * viileähkö täyte vasemmalta ylhäältä (0,10 × aurinko). Kuva on paikkamerkki (Carstens 1788, PD), Codex korvaa.
   */
  kaiku: {
    kuva: 'ajattelijat/sokrates/v1/kaiku-sotilas-v2.png',   // positiivinen (omistaja 2.10. 11.13: kaiut aina positiivisia)
    // v10 (omistajan v9-palaute: kamera lähempänä tasaisempaa pintaa): oma projektori otsalle, kuva-ala 0,06 m;
    // kamera p + norm(n + suunta) × 0,21 → 0,19 ja liuku t × 0,006, 35 mm.
    // v11 (omistaja 3.10.: "ensimmäinen kaiku on liian pieni läntti. kameran pitäisi olla lähempänä"): kuva-ala 0,06 → 0,07
    // ja kamera 0,21/0,19 → 0,15/0,14; kaiku täyttää suurimman osan ruudusta.
    lev: 0.07, vino: [-0.10, -0.05, -0.08], etaisyys: 0.6, voima: 20, liuku: 0.05, savy: [1.0, 0.78, 0.52], blend: 0.3,
    kamera: { suunta: [0.08, -0.05, -0.12], matka: [0.15, 0.14], liuku: 0.006, mm: 35, siirtyma: 45 },
    tayte: { osuus: 0.10, suunta: [-0.65, -0.25, 0.7], vari: [0.90, 0.94, 1.0], keila: 45, blend: 0.7 },
  },
  /*
   * LAPPU "Sokrateen elämä" (NOSTOKORTTI, teema tumma) kierroksen lopussa. Teksti: Sisältökirjuri, docs/raportit/
   * sisaltokirjuri-sokrates-pilotti-20261001.md osio 6 (haara sisalto-pelikatalogi-20260927), Päätoimittajan korjauksin;
   * lähteet osion taulukossa. Omistajan OK lapulle puuttuu 2.10.2026: vain kehityslipun takana.
   */
  elama: {
    otsikko: 'Sokrateen elämä',
    kappaleet: [
      { otsikko: 'Kivenhakkaajan poika', teksti: 'Sokrates syntyi Ateenassa vuonna 470 tai 469 eaa. kivenhakkaaja Sofroniskoksen ja kätilö Fainaretan poikana.' },
      { otsikko: 'Sotilas', teksti: 'Peloponnesolaissodassa hän taisteli raskaana jalkaväkimiehenä Potidaiassa, Amfipoliksessa ja Delionissa. Platonin Pidoissa Alkibiades kertoo, että Sokrates käveli talvella jäällä paljain jaloin, seisoi kerran aamusta seuraavaan aamuun paikallaan ajatuksiinsa vaipuneena ja pelasti haavoittuneen Alkibiadeen taistelussa.' },
      { otsikko: 'Delfoin oraakkeli', teksti: 'Ystävä Khairefon kysyi Delfoin oraakkelilta, onko kukaan Sokratesta viisaampi. Oraakkeli vastasi, ettei ole. Sokrates ryhtyi sen jälkeen kysymään ateenalaisilta viisailta, mitä he oikeasti tiesivät.' },
      { otsikko: 'Oikeudenkäynti', teksti: 'Vuonna 399 eaa. kolme ateenalaista syytti häntä jumalattomuudesta ja nuorison turmelemisesta, ja tuomaristo julisti hänet syylliseksi ja tuomitsi hänet kuolemaan.' },
      { otsikko: 'Ei pakoa', teksti: 'Ystävät tarjosivat hänelle keinoa paeta vankilasta, mutta hän kieltäytyi: Platonin Kritonissa hän sanoo, ettei vääryyttä saa tehdä koskaan, ei edes vääryyden vastaukseksi.' },
      { otsikko: 'Viimeiset sanat', teksti: 'Hän joi maljallisen myrkkykatkoa, käveli, kunnes jalat tuntuivat raskailta, ja asettui sitten makuulle. Platonin mukaan hänen viimeiset sanansa olivat: "Kriton, olemme Asklepiokselle kukon velkaa. Maksakaa se, älkää unohtako."' },
      { teksti: 'Sokrates ei kirjoittanut itse mitään. Lähes kaikki, mitä hänestä tiedetään, tulee Platonilta, Ksenofonilta ja Aristofanekselta; myös Aristoteles kertoo hänestä, mutta toisen käden tietoon perustuen.' },
    ],
  },
  // PULU kierroksen lopussa: viisi kysymystä (Sisältökirjuri 7.3, omistaja hyväksyi 1.10. klo 23.1x).
  pulunKysymykset: [
    'Mitä sokraattinen kysyminen tarkoittaa?',
    'Mitä Sokrates tarkoitti tietämättömyydellään?',
    'Millaista Sokrateen arki Ateenassa oli?',
    'Miten Sokrates vaikutti Platoniin ja filosofiaan?',
    'Missä sokraattinen kysyminen näkyy nykyään?',
  ],
  /*
   * Ääniraita kahtena (tools/ajattelija-aaniraita.mjs): puhe = luennat, kierroksen KELLO; musiikki = Zarathustra koko
   * kohtauksen ajan, loppusoinnun urkupohja silmukkana ja vaimennus tekstien ja luentojen alla (omistajan v9-palaute
   * 2.10.2026 klo 10.3x; "Zarathustra kaikille", Sascha Ende CC BY 4.0). Musiikki on vaihdettavissa ilman uutta ajoitusta.
   */
  aani: { puhe: 'ajattelijat/sokrates/v1/kierros1-puhe.mp3', musiikki: 'ajattelijat/sokrates/v1/kierros1-musiikki.mp3' },
  syke: 'ajattelijat/sokrates/v1/syke-musiikki.json',   // sokrates_syke.py musiikkiraidasta (1 ± 0,15)
  /*
   * KIERROKSET 2–3 (Blender v9/v10, sokrates_bysti.py --v9 --v10; luvut docs/raportit/sokrates-v10/sokrates-luvut.json,
   * haara linnanrakentaja-sokrates-bysti 728f8f3d0; kamera v11: docs/raportit/ajattelijat-v11/sokrates-luvut-v11.json,
   * 4e9755313) kierroksen 1 jatkoksi ruudusta 1450, loppu 3330 (111,0 s):
   *   kierros 2: 21d nauhana poskella → oraakkelin kylix SILMÄMUNAAN ainoana valona (d-luenta)
   *   kierros 3: 49b nauhana kasvojen sivulla → Davidin "Sokrateen kuolema" ainoana valona (f-luenta)
   * Kamera kulkee Blenderin avaimilla (Blender-koordinaatit; AUTO_CLAMPED-Bézier, js/linssit/ajattelija.js kamerakayra);
   * ruudun 1450 avain korvataan kierroksen 1 pidon kameralla. Ääni on yksi 111 s:n raita (tools/ajattelija-aaniraita.mjs
   * --kierrokset; luennat c 51,667 s, d 62,667 s, e 80,0 s, f 88,833 s), syke siitä. Taustavirta: sama 20 riviä, oma siemen.
   */
  /*
   * AIKAJANA (v13, omistaja 3.10.2026; Linnanrakentaja sokrates-luvut-v13.json 847976897): kertoja Iv4 William
   * (oletusotto) 28,0 s:sta kymmenenä kappaleena; lainaukset 38a/21d/30e/49b ja kysymys, kaiut jumala/sotilas/oraakkeli/
   * David, pyyhkäisy, valon kierto, lämmin, kova ja ilta, efektit. Avaimet generoitu (tools/ajattelija-aikajana.mjs).
   * Ääni: tools/ajattelija-aaniraita.mjs --v12 (musiikki Linssisepän oma, kertoja ja efektit puheraidassa).
   * Kun aikajana on, moottori ei käytä kierrokset-kenttää (Marcus käyttää).
   */
  aikajana: {
    ...SOKRATES_AIKAJANA,
    /*
     * V14 (omistaja 3.10.2026 klo 15.4x): päälainaus korttina (koko lause kerralla luettavissa, terävä ja kirkkain) ja
     * taustavirran rivit epäterävinä yksi kerrallaan kasvojen eri puolilta: ensimmäinen 12,3 s linssin ajassa
     * (kohtauksen ruutu 295, kertojan alku), sitten 0,5 s:n välein; rivi juoksee sisään kasvojen reunasta (rintama 3 ×
     * tekstin nopeus, alku 55 % keilan puolileveydestä). Rivien voima 0,4 (päälainaus kirkkain, kasvot näkyvät rivien välistä); kortti väistää rivit.
     */
    lauseKortti: { merkkeja: 34, leveys: 0.11 },   // leveys luvuista (nauha_lev_m), tämä oletus; 2–3 riviä otsalla
    virtaPorrastus: { alku: 295, vali: 15, haivytys: 12, rintama: 3, reuna: 0.55 },
    virtaVoima: 0.4,
    // V14: puhe = kertoja (sama William-otto, 9,5 s:sta kohtauksen alusta) + efektit; musiikki Linssisepän v14-sävellys
    // (iskut 2,0 / 3,9 / 4,5 / 5,1 / 6,1 s, −8 dB puheen alla). Zarathustralla ei ole v14-ajoitusta, joten vaihtoehto pois.
    // ÄMPÄRIIN vasta omistajan hyväksynnän jälkeen (ajattelijat/sokrates/v4/).
    aani: {
      puhe: 'ajattelijat/sokrates/v4/v14-puhe.mp3',
      musiikki: 'ajattelijat/sokrates/v4/v14-musiikki.mp3',
    },
    syke: 'ajattelijat/sokrates/v4/syke-v14.json',
    /*
     * KAIKUSARJAT (omistaja 3.10.2026: oletus A väritön, savu päällä; vertailuun ?kaikusarja=<nimi>, ?kaikuvari=seepia,
     * ?savu=0): oletus A = Linnanrakentajan v13c:n rajatut hahmot (gobot-v13cA: Zeus, hopliitti v2, Themis yksin; David
     * paikkamerkkinä) aikajanan omina kuvina, väri valosta. v13b = edellinen sarja; sk = Sisältökirjurin rajatut omina
     * harmaa- ja seepiaversioina. B (Codex) lisätään samoilla nimillä, kun kuvat tulevat.
     */
    kaikusarja: 'a',
    kaikusarjat: {
      v13b: ['ajattelijat/sokrates/v3/kaiku-jumala.png', 'ajattelijat/sokrates/v3/kaiku-sotilas.png',
        'ajattelijat/sokrates/v3/kaiku-oraakkeli.png', 'ajattelijat/sokrates/v3/kaiku-kuolema.png'],
      sk: [
        { harmaa: 'ajattelijat/sokrates/v3/kaiut/jumala-harmaa.png', seepia: 'ajattelijat/sokrates/v3/kaiut/jumala-seepia.png' },
        { harmaa: 'ajattelijat/sokrates/v3/kaiut/sotilas-v2-harmaa.png', seepia: 'ajattelijat/sokrates/v3/kaiut/sotilas-v2-seepia.png' },
        { harmaa: 'ajattelijat/sokrates/v3/kaiut/themis-harmaa.png', seepia: 'ajattelijat/sokrates/v3/kaiut/themis-seepia.png' },
        'ajattelijat/sokrates/v3/kaiku-kuolema.png',
      ],
    },
  },
  kierrokset: {
    aani: { puhe: 'ajattelijat/sokrates/v1/kierrokset-puhe.mp3', musiikki: 'ajattelijat/sokrates/v1/kierrokset-musiikki.mp3' },
    syke: 'ajattelijat/sokrates/v1/syke-kierrokset.json',
    loppu: 3232,   // ALUSTAVA (v12 +442): kierrosten ajat sidotaan lopullisesti uuden kertojan puheen mukaan
    lista: [
      {
        paalause: '21d', vieritys: [1382, 1657], lahde: [1664, 1712], virta: [1352, 1402, 1662, 1712], siemen: 21,
        kaiku: {
          kuva: 'ajattelijat/sokrates/v1/kaiku-oraakkeli.png',   // Kodros-maalarin kylix (PD), positiivinen
          kohde: { sade: [0.040, 0.374] },                       // vasen silmämuna
          ruudut: [1772, 2202], vino: [-0.15, 0.0, 0.10], etaisyys: 0.5, lev: 0.03, voima: 15, liuku: 0.08,
          tayte: { suunta: [-0.55, -0.55, 0.6] },                // vasemmalta edestä ylhäältä
        },
      },
      {
        paalause: '49b', vieritys: [2232, 2497], lahde: [2504, 2552], virta: [2202, 2252, 2502, 2552], siemen: 49,
        kaiku: {
          kuva: 'ajattelijat/sokrates/v1/kaiku-kuolema.png',     // David 1787 (The Met, CC0), ilman maljaa
          kohde: { sivulta: [-0.08, 0.375] },                    // kasvojen sivu valon puolella
          ruudut: [2557, 3152], vino: [0.0, -0.10, 0.05], etaisyys: 0.6, lev: 0.07, voima: 30, liuku: 0.05,
          tayte: { suunta: [0.45, 0.75, 0.55] },                 // takaviistosta oikealta
        },
      },
    ],
    kamera: [   // [ruutu, kameran paikka, katsepiste, mm]
      [1352, [0.0301, -0.2589, 0.4641], [-0.002, -0.1304, 0.418], 35],
      [1412, [-0.0983, -0.1598, 0.2678], [-0.0579, -0.1008, 0.352], 18],
      [1712, [-0.0524, -0.1741, 0.2678], [-0.0521, -0.1026, 0.352], 18],
      [1772, [0.0498, -0.1824, 0.3675], [0.04, -0.1083, 0.374], 50],
      [2202, [0.0519, -0.1823, 0.3696], [0.04, -0.1083, 0.374], 50],
      [2262, [0.1078, -0.1321, 0.284], [0.0689, -0.0826, 0.375], 18],
      [2552, [0.1342, -0.0864, 0.284], [0.0719, -0.0774, 0.375], 18],
      [2602, [0.205, -0.1767, 0.337], [0.0704, -0.08, 0.375], 35],
      [3152, [0.2011, -0.1641, 0.3393], [0.0724, -0.0765, 0.375], 35],
      // Paluu Rembrandt-otokseen: webin oma otokset.rembrandt.
      [3212, [-0.3, -1.02, 0.25], [-0.06, -0.06, 0.4], 35],
      [3232, [-0.3, -1.02, 0.25], [-0.06, -0.06, 0.4], 35],
    ],
  },
  /*
   * TAUSTAVIRTA (v10, omistaja 2.10. 08.2x–08.4x; sokrates_bysti.py paan_virta + tausta_rivi): 20 henkeä
   * tekstiriviä koko pään yli viidestä projektorista; jokaisella oma tahti (0,0007 × 1,18^k uv/ruutu, sekoitettuna),
   * suunta (joka toinen vastakkaiseen), kulma ±7°, koko ja kirkkaus (osuus päälauseen tehosta × 3).
   * Suomenkieliset aina kahdessa pienimmässä koossa ja himmeämpinä. Luuppaavat vaakasuunnassa saumattomasti.
   */
  taustavirta: {
    // v14 (omistaja 3.10.2026 klo 16.0x): rivit pehmeinä kuin syväterävyyden ulkopuolinen tausta — sumennus ≈ kirjaimen
    // korkeus (0,45 em), kirjaimet puolikokoisina 80 px:n nauhassa (riviTila 2), jotta pehmeä reuna mahtuu nauhaan.
    sumeus: 0.45,
    riviTila: 2,
    riviKorkeus: 80,
    etaisyys: 0.9,
    blend: 0.5,
    voimaKerroin: 3.0,
    siemen: 38,
    // Tahti pinnalla (omistaja 3.10.2026 klo 00.0x; Blender v11 V11_VIRTA_MS): kaikki rivit lähes samaa nopeutta,
    // 25 mm/s ±15 %. Suunta vaihtelee rivi riviltä kuten ennen.
    nopeus: { mms: 25, vaihtelu: 0.15 },
    rivikork: [0.009, 0.012, 0.015, 0.019],
    kirkkaus: { el: [0.10, 0.28], fi: [0.08, 0.13] },
    kulma: 7,
    projektorit: [   // (kohde, suunta kohteesta, kuva-alan leveys m, rivejä) — Blender-koordinaatit
      { kohde: [0.0, -0.10, 0.33], suunta: [0.0, -1.0, 0.10], ala: 0.30, riveja: 6 },   // kasvot ja parta
      { kohde: [0.0, -0.03, 0.47], suunta: [0.0, -0.55, 1.0], ala: 0.26, riveja: 5 },   // otsa ja päälaen etuosa
      // v14: kauempana kasvojen pinnasta olevat rivit pehmeämpiä (pehmeys × sumeus).
      { kohde: [0.0, 0.05, 0.47], suunta: [0.0, 0.6, 1.0], ala: 0.24, riveja: 3, pehmeys: 1.5 },      // päälaen takaosa
      { kohde: [-0.09, -0.04, 0.38], suunta: [-1.0, -0.35, 0.15], ala: 0.22, riveja: 3, pehmeys: 1.3 }, // vasen ohimo ja poski
      { kohde: [0.09, -0.04, 0.38], suunta: [1.0, -0.35, 0.15], ala: 0.22, riveja: 3, pehmeys: 1.3 },  // oikea ohimo ja poski
    ],
    // Kierros 1 (virta1): häivytys sisään, täysi, häivytys ulos (v12: v11 + 442 ruutua).
    ajat: [364, 442, 802, 852],   // v14: v12 −540
    // Sisältökirjurin 18 varmennettua kreikkalaista katkelmaa (Stephanus-viite) ja 2 suomenkielistä (21d, Kriton 49b),
    // fontit riveittäin (Linnanrakentaja tekstit.json taustarivit 08efbe694; docs/raportit/sokrates-taustavirta-20261002.json).
    rivit: [
      ['el', 'gentium-plus', 'οὗτος ὑμῶν, ὦ ἄνθρωποι, σοφώτατός ἐστιν, ὅστις ὥσπερ Σωκράτης ἔγνωκεν ὅτι οὐδενὸς ἄξιός ἐστι τῇ ἀληθείᾳ πρὸς σοφίαν.'],   // Apol. 23b
      ['el', 'gfs-didot', 'ἕωσπερ ἂν ἐμπνέω καὶ οἷός τε ὦ, οὐ μὴ παύσωμαι φιλοσοφῶν'],   // Apol. 29d
      ['el', 'gfs-solomos', 'προσκείμενον τῇ πόλει ὑπὸ τοῦ θεοῦ ὥσπερ ἵππῳ μεγάλῳ μὲν καὶ γενναίῳ, ὑπὸ μεγέθους δὲ νωθεστέρῳ καὶ δεομένῳ ἐγείρεσθαι ὑπὸ μύωπός τινος'],   // Apol. 30e
      ['el', 'gentium-plus', 'καὶ τυγχάνει μέγιστον ἀγαθὸν ὂν ἀνθρώπῳ τοῦτο, ἑκάστης ἡμέρας περὶ ἀρετῆς τοὺς λόγους ποιεῖσθαι καὶ τῶν ἄλλων περὶ ὧν ὑμεῖς ἐμοῦ ἀκούετε διαλεγομένου καὶ ἐμαυτὸν καὶ ἄλλους ἐξετάζοντος, ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],   // Apol. 38a
      ['fi', 'iowan-ohut', 'Mitä en tiedä, en luulekaan tietäväni.'],   // Platon, Puolustuspuhe 21d
      ['el', 'gfs-solomos', 'ἢ γὰρ οἷον μηδὲν εἶναι μηδὲ αἴσθησιν μηδεμίαν μηδενὸς ἔχειν τὸν τεθνεῶτα'],   // Apol. 40c
      ['el', 'gentium-plus', 'οὐκ ἔστιν ἀνδρὶ ἀγαθῷ κακὸν οὐδὲν οὔτε ζῶντι οὔτε τελευτήσαντι, οὐδὲ ἀμελεῖται ὑπὸ θεῶν τὰ τούτου πράγματα'],   // Apol. 41d
      ['fi', 'iowan-ohut', 'Vääryyttä ei siis saa tehdä koskaan.'],   // Platon, Kriton 49b
      ['el', 'gfs-solomos', 'οὐ τὸ ζῆν περὶ πλείστου ποιητέον, ἀλλὰ τὸ εὖ ζῆν'],   // Crito 48b
      ['el', 'gentium-plus', 'ταῦτα, ὦ φίλε ἑταῖρε Κρίτων, εὖ ἴσθι ὅτι ἐγὼ δοκῶ ἀκούειν, ὥσπερ οἱ κορυβαντιῶντες τῶν αὐλῶν δοκοῦσιν ἀκούειν, καὶ ἐν ἐμοὶ αὕτη ἡ ἠχὴ τούτων τῶν λόγων βομβεῖ'],   // Crito 54d
      ['el', 'gfs-didot', 'κινδυνεύουσι γὰρ ὅσοι τυγχάνουσιν ὀρθῶς ἁπτόμενοι φιλοσοφίας λεληθέναι τοὺς ἄλλους ὅτι οὐδὲν ἄλλο αὐτοὶ ἐπιτηδεύουσιν ἢ ἀποθνῄσκειν τε καὶ τεθνάναι.'],   // Phaed. 64a
      ['el', 'gfs-solomos', 'οὐ πείθω, ὦ ἄνδρες, Κρίτωνα, ὡς ἐγώ εἰμι οὗτος Σωκράτης, ὁ νυνὶ διαλεγόμενος καὶ διατάττων ἕκαστον τῶν λεγομένων, ἀλλ᾽ οἴεταί με ἐκεῖνον εἶναι, ὃν ὄψεται ὀλίγον ὕστερον νεκρόν'],   // Phaed. 115c
      ['el', 'gentium-plus', 'ὦ Κρίτων, τῷ Ἀσκληπιῷ ὀφείλομεν ἀλεκτρυόνα· ἀλλὰ ἀπόδοτε καὶ μὴ ἀμελήσητε.'],   // Phaed. 118a
      ['el', 'gfs-didot', 'ἑστήκει ἐξ ἑωθινοῦ φροντίζων τι'],   // Symp. 220c
      ['el', 'gfs-solomos', 'οὐ δύναμαί πω κατὰ τὸ Δελφικὸν γράμμα γνῶναι ἐμαυτόν· γελοῖον δή μοι φαίνεται'],   // Phdr. 229e
      ['el', 'gentium-plus', 'φιλομαθὴς γάρ εἰμι· τὰ μὲν οὖν χωρία καὶ τὰ δένδρα οὐδέν μ᾽ ἐθέλει διδάσκειν, οἱ δ᾽ ἐν τῷ ἄστει ἄνθρωποι'],   // Phdr. 230d
      ['el', 'gfs-didot', 'ἰδὲ γὰρ ἀνθρώπους οἷον ἐν καταγείῳ οἰκήσει σπηλαιώδει, ἀναπεπταμένην πρὸς τὸ φῶς τὴν εἴσοδον ἐχούσῃ μακρὰν παρὰ πᾶν τὸ σπήλαιον, ἐν ταύτῃ ἐκ παίδων ὄντας ἐν δεσμοῖς'],   // Resp. 514a
      ['el', 'gfs-solomos', 'τὸ δὲ αἴτιον τούτου τόδε· μαιεύεσθαί με ὁ θεὸς ἀναγκάζει, γεννᾶν δὲ ἀπεκώλυσεν.'],   // Tht. 150c
      ['el', 'gentium-plus', 'βουλοίμην μὲν ἂν ἔγωγε οὐδέτερα· εἰ δ᾽ ἀναγκαῖον εἴη ἀδικεῖν ἢ ἀδικεῖσθαι, ἑλοίμην ἂν μᾶλλον ἀδικεῖσθαι ἢ ἀδικεῖν.'],   // Grg. 469c
      ['el', 'gfs-didot', 'ἐμαυτὸν καταμέμφομαι ὡς οὐκ εἰδὼς περὶ ἀρετῆς τὸ παράπαν· ὃ δὲ μὴ οἶδα τί ἐστιν, πῶς ἂν ὁποῖόν γέ τι εἰδείην;'],   // Men. 71b
    ],
  },
  // Blenderin gobot sokrates_gobo.py:n fonteilla (macOS/iOS-järjestelmäfontit; polytoninen kreikka).
  fontit: {
    iowan: { perhe: '"Iowan Old Style", Charter, Palatino, serif', paino: 'bold' },
    baskerville: { perhe: 'Baskerville, "Baskerville Old Face", "Times New Roman", serif', paino: 'normal' },
    times: { perhe: '"Times New Roman", Times, serif', paino: 'italic normal' },
    'iowan-ohut': { perhe: '"Iowan Old Style", Charter, Palatino, serif', paino: 'italic normal' },
    // Taustavirran kreikka (SIL OFL 1.1; ladataan ämpäristä FontFacella vasta linssissä, ks. js/linssit/ajattelija.js).
    'gentium-plus': { perhe: '"Gentium Plus", serif', paino: 'normal', tiedosto: 'ajattelijat/fontit/v1/GentiumPlus-Regular.ttf' },
    'gfs-didot': { perhe: '"GFS Didot", serif', paino: 'normal', tiedosto: 'ajattelijat/fontit/v1/GFSDidot-Regular.ttf' },
    'gfs-solomos': { perhe: '"GFS Solomos", serif', paino: 'normal', tiedosto: 'ajattelijat/fontit/v1/GFSSolomos.otf' },
  },
  // Videotykin "epätäydellisyys" (v4): kromaattinen aberraatio ja tarkennuksen pehmeys.
  ca: 0.014,
  syvyys: 0.022,
  tykki: { vari: [1.0, 0.93, 0.80] },
});
