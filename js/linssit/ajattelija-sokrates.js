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
  vuodet: '469–399 eaa.',
  kysymys: 'Miten pitäisi elää?',
  // GLB: proto-3d/_valmiit/sokrates-bysti/v1 (SMK KAS635, PDM 1.0; Scan the World / SMK). L1 ~50 k kolmiota + normaalikartta.
  malli: 'ajattelijat/sokrates/v1/sokrates-L1.glb',
  korkeus: 0.51,
  // Pään keskipiste (PAA) ja avainvalo (v7 "aurinko"): kova spotti 1,3 m:n päässä, viimeinen V7_VALO-suunta = Rembrandt.
  paa: [0.0, -0.06, 0.38],
  avainvalo: { suunta: [0.70, -0.70, 0.85], etaisyys: 1.3, keila: 32, tahtays: [0.0, -0.06, 0.43] },
  tausta: 0.012,           // maailman väri (lineaarinen)
  // Kamera: Blenderin pystysensori 24 mm → pystykenttä 2·atan(12 / polttoväli).
  otokset: {
    rembrandt: { paikka: [-0.30, -1.02, 0.40], katse: [-0.06, -0.06, 0.36], mm: 35 },
  },
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
  // Kierros 1 (v7/v10, 30 r/s): lähestyminen Rembrandtista otsalle, 38a, kaari ja pito.
  ajat: { lahesty: [462, 555], vieritys: [525, 895], proj: [555, 900], kaariLoppu: 965, pito: 1450 },
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
    // PAIKKAMERKIT (tekstit.json 2.10.): Sisältökirjurin 18 kreikkalaista katkelmaa korvaavat nämä.
    rivit: [
      ['el', 'baskerville', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
      ['el', 'times', 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι'],
      ['el', 'baskerville', 'οὐδαμῶς ἄρα δεῖ ἀδικεῖν'],
      ['el', 'times', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
      ['fi', 'iowan-ohut', 'Mitä en tiedä, en luulekaan tietäväni.'],
      ['el', 'baskerville', 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι'],
      ['el', 'times', 'οὐδαμῶς ἄρα δεῖ ἀδικεῖν'],
      ['fi', 'iowan-ohut', 'Vääryyttä ei siis saa tehdä koskaan.'],
      ['el', 'baskerville', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
      ['el', 'times', 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι'],
      ['el', 'iowan-ohut', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
      ['el', 'baskerville', 'οὐδαμῶς ἄρα δεῖ ἀδικεῖν'],
      ['el', 'times', 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι'],
      ['el', 'baskerville', 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι'],
      ['el', 'times', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
      ['el', 'baskerville', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
      ['el', 'times', 'οὐδαμῶς ἄρα δεῖ ἀδικεῖν'],
      ['el', 'iowan-ohut', 'ἃ μὴ οἶδα οὐδὲ οἴομαι εἰδέναι'],
      ['el', 'baskerville', 'οὐδαμῶς ἄρα δεῖ ἀδικεῖν'],
      ['el', 'times', 'ὁ δὲ ἀνεξέταστος βίος οὐ βιωτὸς ἀνθρώπῳ'],
    ],
  },
  // Blenderin gobot sokrates_gobo.py:n fonteilla (macOS/iOS-järjestelmäfontit; polytoninen kreikka).
  fontit: {
    iowan: { perhe: '"Iowan Old Style", Charter, Palatino, serif', paino: 'bold' },
    baskerville: { perhe: 'Baskerville, "Baskerville Old Face", "Times New Roman", serif', paino: 'normal' },
    times: { perhe: '"Times New Roman", Times, serif', paino: 'italic normal' },
    'iowan-ohut': { perhe: '"Iowan Old Style", Charter, Palatino, serif', paino: 'italic normal' },
  },
  // Videotykin "epätäydellisyys" (v4): kromaattinen aberraatio ja tarkennuksen pehmeys.
  ca: 0.014,
  syvyys: 0.022,
  tykki: { vari: [1.0, 0.93, 0.80] },
});
