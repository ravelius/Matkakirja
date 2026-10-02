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
  avainvalo: { suunta: [0.70, -0.70, 0.85], etaisyys: 1.3, keila: 32, tahtays: [0.0, -0.06, 0.43] },
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
  },
  // Kierros 1 (v7/v10, 30 r/s): intro 1–281, Rembrandt + nimi 282–372, kysymys 373–461, lähestyminen otsalle,
  // 38a, lähderivi, kaiku (b-luenta) ja pito. Ääniraita alkaa ruudusta 0 (sokrates_aani.sh).
  ajat: {
    nimi: [282, 372], kysymys: [373, 461], lahesty: [462, 555], vieritys: [525, 895], proj: [555, 900],
    lahde: [902, 950], kaariLoppu: 965, kaiku: [965, 1440], pito: 1450,
  },
  /*
   * PROLOGI (omistaja 2.10. 08.5x; kaikkien ajattelijoiden vakioaloitus, sokrates_bysti.py --prologi): 0–1 s pimeää →
   * kytkin napsahtaa → reunavalot syttyvät hehkulangan tavoin (t^2,2 ja pieni värähdys) → leikkaus introon. 120 ruutua.
   * Omistaja 2.10. klo 10.3x (v9-palaute): ei taustavaloa eikä kehää, vain ääriviivavalo (levy ja takavalo pois).
   */
  prologi: {
    kytkin: 30, taysi: 58, loppu: 120,
    kamera: { paikka: [-0.22, -1.15, 0.34], katse: [0.0, -0.04, 0.30], mm: 35 },
    vari: [1.0, 0.86, 0.66],
    valot: [
      { paikka: [-0.30, 0.55, 0.42], kohde: [0.0, -0.06, 0.42], teho: 45, keila: 26, blend: 0.45 }, // reunavalo vasemmalta takaa
      { paikka: [0.30, 0.55, 0.42], kohde: [0.0, -0.06, 0.42], teho: 45, keila: 26, blend: 0.45 },  // reunavalo oikealta takaa
    ],
  },
  // INTRO (v7): leikkaukset Zarathustran iskuihin (CONSTANT) ja aurinko kiertää takaa kohti Rembrandtia.
  intro: {
    otokset: [   // [ruutu, kameran paikka, katsepiste, mm]
      [1, [0.62, -0.10, 0.38], [0.0, -0.10, 0.38], 50],
      [15, [0.26, -0.30, 0.72], [0.0, -0.09, 0.40], 35],
      [57, [-0.05, -0.36, 0.13], [0.0, -0.10, 0.36], 28],
      [119, [0.30, -0.27, 0.47], [0.0, -0.11, 0.43], 50],
      [236, [0.30, -0.34, 0.42], [0.03, -0.10, 0.38], 50],
      [259, [0.30, -0.36, 0.22], [0.02, -0.11, 0.30], 50],
    ],
    valo: [[1, [0.55, 0.85, 0.30]], [119, [0.9, 0.55, 0.35]], [236, [1.0, -0.05, 0.6]], [259, [0.85, -0.45, 0.75]], [282, [0.70, -0.70, 0.85]]],
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
    lev: 0.06, vino: [-0.10, -0.05, -0.08], etaisyys: 0.6, voima: 20, liuku: 0.05, savy: [1.0, 0.78, 0.52], blend: 0.3,
    kamera: { suunta: [0.08, -0.05, -0.12], matka: [0.21, 0.19], liuku: 0.006, mm: 35, siirtyma: 45 },
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
   * TAUSTAVIRTA (v10, omistaja 2.10. 08.2x–08.4x; sokrates_bysti.py paan_virta + tausta_rivi): 20 henkeä
   * tekstiriviä koko pään yli viidestä projektorista; jokaisella oma tahti (0,0007 × 1,18^k uv/ruutu, sekoitettuna),
   * suunta (joka toinen vastakkaiseen), kulma ±7°, koko ja kirkkaus (osuus päälauseen tehosta × 3).
   * Suomenkieliset aina kahdessa pienimmässä koossa ja himmeämpinä. Luuppaavat vaakasuunnassa saumattomasti.
   */
  taustavirta: {
    etaisyys: 0.9,
    blend: 0.5,
    voimaKerroin: 3.0,
    siemen: 38,
    rivikork: [0.009, 0.012, 0.015, 0.019],
    kirkkaus: { el: [0.10, 0.28], fi: [0.08, 0.13] },
    kulma: 7,
    projektorit: [   // (kohde, suunta kohteesta, kuva-alan leveys m, rivejä) — Blender-koordinaatit
      { kohde: [0.0, -0.10, 0.33], suunta: [0.0, -1.0, 0.10], ala: 0.30, riveja: 6 },   // kasvot ja parta
      { kohde: [0.0, -0.03, 0.47], suunta: [0.0, -0.55, 1.0], ala: 0.26, riveja: 5 },   // otsa ja päälaen etuosa
      { kohde: [0.0, 0.05, 0.47], suunta: [0.0, 0.6, 1.0], ala: 0.24, riveja: 3 },      // päälaen takaosa
      { kohde: [-0.09, -0.04, 0.38], suunta: [-1.0, -0.35, 0.15], ala: 0.22, riveja: 3 }, // vasen ohimo ja poski
      { kohde: [0.09, -0.04, 0.38], suunta: [1.0, -0.35, 0.15], ala: 0.22, riveja: 3 },  // oikea ohimo ja poski
    ],
    // Kierros 1 (virta1): häivytys sisään 462–540, täysi, häivytys ulos 900–950.
    ajat: [462, 540, 900, 950],
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
