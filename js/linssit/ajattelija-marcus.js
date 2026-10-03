/*
 * AJATTELIJAT-LINSSI: MARCUS AURELIUS (toinen ajattelija; omistaja 1.10.2026, Päätoimittaja 2.10.2026: "pelkkänä
 * sisältönä"). Luvut Linnanrakentajan mallista docs/raportit/marcus-aurelius-v1/marcus-tekstit.json (haara
 * linnanrakentaja-sokrates-bysti) sellaisinaan Blenderin koordinaateissa; yhteiset osat (prologi, taustavirran
 * projektorit, fontit, videotykki, kipsi) ovat samat kuin Sokrateella (ajattelija-sokrates.js).
 * Lähde: SMK KAS979, kipsivalos (Formeri: Paris, Louvre nr. 383), PDM 1.0; Scan the World / SMK.
 * Kierrosten 2–3 kaiut (uhri, Delacroix) tulevat kierrosten mukana; elämä-lappu ja Pulun kysymykset Sisältökirjurilta (2.10.).
 */
import { SOKRATES } from './ajattelija-sokrates.js';
import { MARCUS_AIKAJANA } from './ajattelija-marcus-aikajana.js';

export const MARCUS = Object.freeze({
  tunnus: 'marcus',
  nimi: 'Marcus Aurelius',
  nimiRivit: ["MARCUS", "AURELIUS"],
  vuodet: "121–180 jaa.",
  kysymys: "Miten pitäisi elää?",
  malli: 'ajattelijat/marcus/v1/marcus-L1.glb',
  // Kiinteä karttapiste (omistaja 16.5x): Keski-Apenniinit Rooman koillispuolella, ei kaupunki eikä nimien päällä.
  kartta: { glb: 'ajattelijat/kartta/v1/marcus-kartta.glb', maa: 'ITA', piste: [42.82, 12.17] },
  kipsi: SOKRATES.kipsi,
  korkeus: 0.51,
  paa: [0.0, -0.06, 0.38],
  avainvalo: { suunta: [0.7, -0.7, 0.85], etaisyys: 1.3, keila: 32, tahtays: [0.0, -0.06, 0.43] },
  tausta: SOKRATES.tausta,
  otokset: {
    rembrandt: { paikka: [-0.36, -1.24, 0.24], katse: [-0.075, -0.06, 0.39], mm: 35 },
  },
  kierros: { paalause: 'itselleen-10-16' },
  linssi: 18,
  kierto: 22,
  liuku: 0.008,
  paalauseet: {
    'itselleen-10-16': {
      fi: "Älä enää puhu siitä, millainen hyvän ihmisen pitäisi olla. Ole sellainen.",
      el: "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον.",
      viite: "Marcus Aurelius, Itselleen 10.16",
      sade: [-0.005, 0.418], vino: [-0.4, -0.15, -0.3], ala: 0.075, etaisyys: 0.6,
      korkeus: 0.025625, kameraKulma: 55, kameraMatka: 0.11,
    },
    // Kierrokset 2–3 (marcus-tekstit.json kierrokset_2_3): poski poskiparran yläpuolella, kasvojen sivu säteellä sivulta.
    'itselleen-4-49': {
      // Sama sanamuoto kuin kertojan tekstissä ja v13-nauhassa (omistaja hyväksyi 3.10.2026 klo 14.31).
      fi: 'Ole kuin niemi, johon aallot lyövät lakkaamatta. Se pysyy paikallaan, ja vesi tyyntyy sen ympärillä.',
      el: 'Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος.',
      viite: 'Marcus Aurelius, Itselleen 4.49',
      sade: [-0.035, 0.360], vino: [-0.55, -0.15, -0.30], ala: 0.065, etaisyys: 0.6, korkeus: 0.02125,
    },
    'itselleen-2-11': {
      fi: 'Tee, sano ja ajattele kaikki niin, kuin voisit jo nyt lähteä elämästä.',
      el: 'Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι.',
      viite: 'Marcus Aurelius, Itselleen 2.11',
      sivulta: [-0.08, 0.375], vino: [0.0, -0.45, -0.25], ala: 0.075, etaisyys: 0.6, korkeus: 0.02375,
    },
    // v13 (kertojan loppu "Miten pitäisi elää?" 90,00 s): kysymys nauhana kuten Sokrateella (gobot-v13 nauha-kysymys).
    kysymys: {
      fi: 'Miten pitäisi elää?',
      el: '',
      viite: '',
      korkeus: 0.022,
    },
  },
  // v13 (Linnanrakentaja marcus-luvut-v13.json 6c2fb3c51, v13b): intro ja leikkaukset samat kuin Sokrateen (v14: tiivis alku, prologi 75).
  ajat: SOKRATES.ajat,
  prologi: SOKRATES.prologi,
  intro: SOKRATES.intro,
  taustavirta: {
    ...SOKRATES.taustavirta,
    ajat: SOKRATES.taustavirta.ajat,   // v13: samat kuin Sokrateella (v12 +442)
    // PAIKKAMERKIT (marcus-tekstit.json 2.10.): Sisältökirjurin katkelmat korvaavat nämä.
    rivit: [
      ["el", "times", "Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος."],
      ["el", "baskerville", "Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι."],
      ["el", "times", "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον."],
      ["el", "baskerville", "Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος."],
      ["el", "times", "Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι."],
      ["el", "baskerville", "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον."],
      ["el", "times", "Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος."],
      ["el", "baskerville", "Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι."],
      ["el", "times", "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον."],
      ["el", "baskerville", "Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος."],
      ["el", "times", "Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι."],
      ["el", "baskerville", "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον."],
      ["el", "times", "Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος."],
      ["el", "baskerville", "Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι."],
      ["el", "times", "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον."],
      ["el", "baskerville", "Ὅμοιον εἶναι τῇ ἄκρᾳ, ᾗ διηνεκῶς τὰ κύματα προσρήσσεται· ἡ δὲ ἕστηκε καὶ περὶ αὐτὴν κοιμίζεται τὰ φλεγμήναντα τοῦ ὕδατος."],
      ["el", "times", "Ὡς ἤδη δυνατοῦ ὄντος ἐξιέναι τοῦ βίου, οὕτως ἕκαστα ποιεῖν καὶ λέγειν καὶ διανοεῖσθαι."],
      ["el", "baskerville", "Μηκέθ᾽ ὅλως περὶ τοῦ οἷόν τινα εἶναι τὸν ἀγαθὸν ἄνδρα διαλέγεσθαι, ἀλλὰ εἶναι τοιοῦτον."],
      ["fi", "iowan-ohut", "Ole kuin niemi, johon aallot lyövät lakkaamatta."],
      ["fi", "iowan-ohut", "Tee, sano ja ajattele kaikki niin, kuin voisit jo nyt lähteä elämästä."],
    ],
  },
  fontit: SOKRATES.fontit,
  ca: SOKRATES.ca,
  syvyys: SOKRATES.syvyys,
  tykki: SOKRATES.tykki,
  // Kierroksen 1 kaiku (b-luenta): Marcuksen pylvään sadeihme, POSITIIVINEN (omistaja 2.10. 11.13); projektori, kamera,
  // seepia ja häivytys kuten Sokrateella (marcus-tekstit.json kaiku, 3682f58af). CC BY 3.0: nimeäminen tekijätietoihin.
  kaiku: {
    ...SOKRATES.kaiku,
    kuva: 'ajattelijat/marcus/v1/kaiku-sade.png',
    nimeaminen: 'Nico Kokkonen, CC BY 3.0, Wikimedia Commons (Column_of_Marcus_Aurelius_-_detail2.jpg)',
  },
  /*
   * Ääni (tools/ajattelija-aaniraita.mjs --ajattelija marcus): Beethoven, Eroica II Marcia funebre (Czech National SO /
   * Musopen 2012, CC0) 75.48 s:sta, forte 84.88 s osuu ruutuun 282 (Rembrandt + nimi);
   * luennat a 20 s ja b 32 s; vaimennus ×0,22 17,5 s:sta.
   */
  aani: { puhe: 'ajattelijat/marcus/v1/kierros1-puhe.mp3', musiikki: 'ajattelijat/marcus/v1/kierros1-musiikki.mp3' },
  syke: 'ajattelijat/marcus/v1/syke-musiikki.json',   // sokrates_syke.py Marcuksen musiikkiraidasta
  /*
   * KIERROKSET 2–3 (Linnanrakentaja 2.10.2026, marcus-tekstit.json kierrokset_2_3 ja marcus-luvut.json, fda74daca; kamera v11 marcus-luvut-v11.json 4e9755313; sama
   * rakenne ja ruudut kuin Sokrateen v10:ssä, ks. ajattelija-sokrates.js kierrokset):
   *   kierros 2: 4.49 nauhana poskella → uhrireliefi silmämunassa ainoana valona (d-luenta: rutto ja Lucius Verus)
   *   kierros 3: 2.11 nauhana kasvojen sivulla → Delacroix'n "Marcus Aureliuksen viimeiset sanat" (f-luenta)
   * Ääni: Eroica jatkuu yhtenäisenä 111 s (tools/ajattelija-aaniraita.mjs --ajattelija marcus --kierrokset).
   * v14: ruudut kuten Sokrateella (v12 +442, v14 −540); aikajana-tilassa kierrokset jää käyttämättä.
   */
  /*
   * AIKAJANA (v13, Päätoimittaja 3.10.2026 klo 14.4x: Sokrateen v13c-mallin mukaan; Linnanrakentaja marcus-luvut-v13.json
   * 6c2fb3c51, v13b): kertoja (Sisältökirjuri, Iv4 William, yksi otto, 91,84 s) 28,0 s:sta yhdeksänä kappaleena; lainaukset
   * 10.16/4.49/2.11 ja kysymys, kaiut sade/uhri/kuolinvuode, värit neutraalit, savu v5, efektit. Avaimet generoitu:
   *   node tools/ajattelija-aikajana.mjs <marcus-luvut-v13.json> js/linssit/ajattelija-marcus-aikajana.js
   *     --vienti MARCUS_AIKAJANA --kaiut ajattelijat/marcus/v3/kaiut-v13 --savu ajattelijat/sokrates/v3/savu-atlas-v5.png
   *     --savu-ydin 0.286 --paalauseet 1016=itselleen-10-16,449=itselleen-4-49,211=itselleen-2-11
   * Ääni: tools/ajattelija-aaniraita.mjs --ajattelija marcus --v12 --puhe <kertoja.mp3> --puhe-alku 28 --musiikki <oma>
   * --efektit <json> (musiikki Linssisepän oma sävellys). Kun aikajana on, kierrokset jää käyttämättä.
   */
  aikajana: {
    ...MARCUS_AIKAJANA,
    // v14 (omistaja 3.10.2026 klo 15.4x): sama tekstilinja kuin Sokrateella (kortti, epäterävät porrastetut rivit).
    // Kortti 2 cm alemmas: ylin rivi pois hiusrajan kiharoilta (tallenteen tarkistus 3.10.2026, 4.49 ja 2.11).
    lauseKortti: { ...SOKRATES.aikajana.lauseKortti, siirto: -0.02 },
    virtaPorrastus: SOKRATES.aikajana.virtaPorrastus,
    virtaVoima: SOKRATES.aikajana.virtaVoima,
    // v14: kertoja 9,5 s:sta, Linssisepän v14-sävellys; ÄMPÄRIIN vasta omistajan hyväksynnän jälkeen (ajattelijat/marcus/v4/).
    aani: { puhe: 'ajattelijat/marcus/v4/v14-puhe.mp3', musiikki: 'ajattelijat/marcus/v4/v14-musiikki.mp3' },
    syke: 'ajattelijat/marcus/v4/syke-v14.json',
  },
  kierrokset: {
    aani: { puhe: 'ajattelijat/marcus/v1/kierrokset-puhe.mp3', musiikki: 'ajattelijat/marcus/v1/kierrokset-musiikki.mp3' },
    syke: 'ajattelijat/marcus/v1/syke-kierrokset.json',
    loppu: 3232,
    lista: [
      {
        paalause: 'itselleen-4-49', vieritys: [1382, 1657], lahde: [1664, 1712], virta: [1352, 1402, 1662, 1712], siemen: 21,
        kaiku: {
          kuva: 'ajattelijat/marcus/v1/kaiku-uhri.png',   // Marcuksen uhrireliefi, Musei Capitolini (kuva D. Angeli 1908, PD)
          kohde: { sade: [0.040, 0.374] },
          ruudut: [1772, 2202], vino: [-0.15, 0.0, 0.10], etaisyys: 0.5, lev: 0.03, voima: 15, liuku: 0.08,
          tayte: { suunta: [-0.55, -0.55, 0.6] },
        },
      },
      {
        paalause: 'itselleen-2-11', vieritys: [2232, 2497], lahde: [2504, 2552], virta: [2202, 2252, 2502, 2552], siemen: 49,
        kaiku: {
          kuva: 'ajattelijat/marcus/v1/kaiku-kuolema.png',   // Delacroix 1844, Musée des Beaux-Arts de Lyon (PD)
          kohde: { sivulta: [-0.08, 0.375] },
          ruudut: [2557, 3152], vino: [0.0, -0.10, 0.05], etaisyys: 0.6, lev: 0.07, voima: 30, liuku: 0.05,
          tayte: { suunta: [0.45, 0.75, 0.55] },
        },
      },
    ],
    kamera: [   // [ruutu, kameran paikka, katsepiste, mm]; loppu takaisin otokset.rembrandt
      [1352, [0.0011, -0.245, 0.4355], [-0.002, -0.1058, 0.418], 35],
      [1412, [-0.0866, -0.1345, 0.2729], [-0.0376, -0.0873, 0.36], 18],
      [1712, [-0.0441, -0.1571, 0.2729], [-0.0324, -0.0901, 0.36], 18],
      [1772, [0.0682, -0.1507, 0.3375], [0.04, -0.0915, 0.374], 50],
      [2202, [0.0699, -0.1509, 0.3392], [0.04, -0.0915, 0.374], 50],
      [2262, [0.0875, -0.1567, 0.301], [0.0531, -0.082, 0.375], 18],
      [2552, [0.1272, -0.1219, 0.301], [0.0577, -0.078, 0.375], 18],
      [2602, [0.1578, -0.2157, 0.3756], [0.0554, -0.08, 0.375], 35],
      [3152, [0.1578, -0.2024, 0.3755], [0.0584, -0.0774, 0.375], 35],
      [3212, [-0.36, -1.24, 0.24], [-0.075, -0.06, 0.39], 35],
      [3232, [-0.36, -1.24, 0.24], [-0.075, -0.06, 0.39], 35],
    ],
  },
  // Kierroksen lopussa "Marcus Aureliuksen elämä" -lappu (Sisältökirjuri 2.10.2026, sisaltokirjuri-marcus-aurelius-20261002.md
  // osio 9; lähteet tapahtumittain samassa osiossa). Kohderyhmä 13+, ei Historia Augusta -anekdootteja.
  elama: {
    otsikko: 'Marcus Aureliuksen elämä',
    kappaleet: [
      { otsikko: 'Rikkaan suvun poika', teksti: 'Marcus syntyi Roomassa 26.4.121. Hänen isänsä kuoli, kun Marcus oli kolmevuotias, ja poika kasvoi isoisänsä hoivissa.' },
      { otsikko: 'Hadrianuksen valinta', teksti: 'Vuonna 138 keisari Hadrianus määräsi, että hänen seuraajansa Antoninus Pius adoptoi nuoren Marcuksen. Marcus oli nyt tulevan keisarin perillinen.' },
      { otsikko: 'Stoalainen opettaja', teksti: 'Filosofian opettaja Rusticus antoi hänelle Epiktetoksen muistiinpanot, ja Marcus kääntyi stoalaisuuteen.' },
      { otsikko: 'Kaksi keisaria', teksti: 'Vuonna 161 hän nousi valtaan mutta kieltäytyi hallitsemasta yksin: kanssakeisariksi tuli Lucius Verus. Valtakuntaa hallitsi ensimmäistä kertaa kaksi keisaria.' },
      { otsikko: 'Sota ja rutto', teksti: 'Tonavan rajalla käytiin vuosina 166–180 sotia germaanikansoja vastaan. Samaan aikaan Antoninuksen rutto tappoi arvioiden mukaan miljoonia ihmisiä.' },
      { otsikko: 'Kuolema Tonavalla', teksti: 'Marcus kuoli 17.3.180 Tonavan rajalla sotaretkellä. Vallan peri hänen poikansa Commodus.' },
      { teksti: 'Marcus kirjoitti muistiinpanonsa itselleen kreikaksi; teos Itselleen on yksi tärkeimmistä lähteistä, joiden kautta stoalaisuutta tunnetaan.' },
    ],
  },
  // PULU kierroksen lopussa: viisi kysymystä (Sisältökirjuri 2.10.2026, osio 3; sama jako kuin Sokrateella).
  pulunKysymykset: [
    'Mitä stoalaisuus on?',
    'Miksi Marcus kirjoitti itselleen muistiinpanoja?',
    'Millainen ihminen Marcus Aurelius oli?',
    'Miten Marcus Aurelius vaikutti stoalaisuuteen?',
    'Missä Marcuksen ajatukset näkyvät nykyään?',
  ],
});
