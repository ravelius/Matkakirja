/*
 * AJATTELIJAT-LINSSI: MARCUS AURELIUS (toinen ajattelija; omistaja 1.10.2026, Päätoimittaja 2.10.2026: "pelkkänä
 * sisältönä"). Luvut Linnanrakentajan mallista docs/raportit/marcus-aurelius-v1/marcus-tekstit.json (haara
 * linnanrakentaja-sokrates-bysti) sellaisinaan Blenderin koordinaateissa; yhteiset osat (prologi, taustavirran
 * projektorit, fontit, videotykki, kipsi) ovat samat kuin Sokrateella (ajattelija-sokrates.js).
 * Lähde: SMK KAS979, kipsivalos (Formeri: Paris, Louvre nr. 383), PDM 1.0; Scan the World / SMK.
 * Kaikua ei vielä ole (kaiku: null); elämä-lappu ja Pulun kysymykset tulevat Sisältökirjurilta.
 */
import { SOKRATES } from './ajattelija-sokrates.js';

export const MARCUS = Object.freeze({
  tunnus: 'marcus',
  nimi: 'Marcus Aurelius',
  nimiRivit: ["MARCUS", "AURELIUS"],
  vuodet: "121–180 jaa.",
  kysymys: "Miten pitäisi elää?",
  malli: 'ajattelijat/marcus/v1/marcus-L1.glb',
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
  kaiku: null,
  /*
   * Ääni (tools/ajattelija-aaniraita.mjs --ajattelija marcus): Beethoven, Eroica II Marcia funebre (Czech National SO /
   * Musopen 2012, CC0) 75.48 s:sta, forte 84.88 s osuu ruutuun 282 (Rembrandt + nimi);
   * luennat a 20 s ja b 32 s; vaimennus ×0,22 17,5 s:sta.
   */
  aani: { puhe: 'ajattelijat/marcus/v1/kierros1-puhe.mp3', musiikki: 'ajattelijat/marcus/v1/kierros1-musiikki.mp3' },
  syke: null,
});
