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
  // Videotykin "epätäydellisyys" (v4): kromaattinen aberraatio ja tarkennuksen pehmeys.
  ca: 0.014,
  syvyys: 0.022,
  tykki: { vari: [1.0, 0.93, 0.80] },
});
