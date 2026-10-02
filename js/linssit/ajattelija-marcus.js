/*
 * AJATTELIJAT-LINSSI: MARCUS AURELIUS (toinen ajattelija; omistaja 1.10.2026, Päätoimittaja 2.10.2026: "pelkkänä
 * sisältönä"). Luvut Linnanrakentajan mallista docs/raportit/marcus-aurelius-v1/marcus-tekstit.json (haara
 * linnanrakentaja-sokrates-bysti) sellaisinaan Blenderin koordinaateissa; yhteiset osat (prologi, taustavirran
 * projektorit, fontit, videotykki, kipsi) ovat samat kuin Sokrateella (ajattelija-sokrates.js).
 * Lähde: SMK KAS979, kipsivalos (Formeri: Paris, Louvre nr. 383), PDM 1.0; Scan the World / SMK.
 * Kierrosten 2–3 kaiut (uhri, Delacroix) tulevat kierrosten mukana; elämä-lappu ja Pulun kysymykset Sisältökirjurilta (2.10.).
 */
import { SOKRATES } from './ajattelija-sokrates.js';

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
  },
  ajat: { ...SOKRATES.ajat },
  prologi: SOKRATES.prologi,
  intro: {
    otokset: [
      [1, [0.62, -0.1, 0.38], [0.0, -0.1, 0.38], 50],
      [33, [0.26, -0.3, 0.72], [0.0, -0.09, 0.4], 35],
      [51, [-0.05, -0.36, 0.13], [0.0, -0.1, 0.36], 28],
      [149, [0.3, -0.27, 0.47], [0.0, -0.11, 0.43], 50],
      [216, [0.3, -0.34, 0.42], [0.03, -0.1, 0.38], 50],
      [243, [0.3, -0.36, 0.22], [0.02, -0.11, 0.3], 50],
    ],
    valo: [[1, [0.85, 0.45, 0.35]], [149, [1.0, 0.15, 0.45]], [216, [1.0, -0.25, 0.6]], [243, [0.85, -0.5, 0.75]], [282, [0.7, -0.7, 0.85]]],
  },
  taustavirta: {
    ...SOKRATES.taustavirta,
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
