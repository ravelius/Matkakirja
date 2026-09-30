// Dioraaman äänipankki (erä 2, speksi docs/raportit/dioraama-rajapinnat-era2-
// 20260929.md kohta 2 "AANET"). Nimet ja arvot ovat sitovia sellaisenaan —
// rakennuskone (tools/dioraama/rakenna.mjs) ja rakennukset (mm. olavinlinna.js)
// viittaavat näihin id:llä (repliikit[].aani, reaktio.aani, taulu.kohdat[].aani,
// tilan aanet[].aani ja tehosteet[].aanet[]).
//
// Lähde: Pelikoodarin äänitoimitus 29.9.2026 (linna-keittio-aanet: ElevenLabs
// Sound Effects + Text-to-Speech). kesto_s toimituksen kestot.json:sta (id →
// kesto_s, 31 kpl); silmukka = toimituksen aanet.json:n laji === 'silmukka'
// (kerta/puhe eivät silmukoi). voimakkuus = 1 kaikilla (huonekohtainen
// vaimennus tulee tilan aanet[].voimakkuus/tehosteet[].voimakkuus-kentistä).
// lisenssi kopioitu aanet.json:sta silmukka-/kerta-äänille sellaisenaan; puhe-
// riveillä aanet.json:ssa ei ole lisenssi-kenttää, joten se on johdettu sen
// ylätason `lahde`-kentästä (Text-to-Speech eikä Sound Effects) — tarkista.
// versio: 1 kaikilla (uusi kenttä, ei speksissä): natiivi välimuistittaa äänet
// levylle URL:n mukaan, ja rakennus.json:n tiedosto-polku sisältää tämän
// (aanet/v<versio>/<id>.mp3) — uusintaotto tästä äänestä kasvattaa VAIN sen
// omaa versiota, jolloin natiivi lataa uuden tiedoston eikä vanhaa välimuistia.
export const AANET = {
  // --- Silmukat (ambienssit, päällekkäin taustana) ---
  'keittio-ambienssi': { silmukka: true, voimakkuus: 1, kesto_s: 28, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'tulisija-ratina': { silmukka: true, voimakkuus: 1, kesto_s: 9, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'pata-poreilu': { silmukka: true, voimakkuus: 1, kesto_s: 9, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  vaivaaminen: { silmukka: true, voimakkuus: 1, kesto_s: 7, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'linna-tuuli': { silmukka: true, voimakkuus: 1, kesto_s: 9, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'jarvi-laineet': { silmukka: true, voimakkuus: 1, kesto_s: 9, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },

  // --- Kerta-tehosteet (satunnaiset, ks. tilan tehosteet-kenttä) ---
  'pilkkominen-1': { silmukka: false, voimakkuus: 1, kesto_s: 2, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'pilkkominen-2': { silmukka: false, voimakkuus: 1, kesto_s: 1.76, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'pilkkominen-3': { silmukka: false, voimakkuus: 1, kesto_s: 2.2, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'pilkkominen-4': { silmukka: false, voimakkuus: 1, kesto_s: 1.6, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'askel-puu': { silmukka: false, voimakkuus: 1, kesto_s: 2.2, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'askel-kivi': { silmukka: false, voimakkuus: 1, kesto_s: 2.2, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  vesisanko: { silmukka: false, voimakkuus: 1, kesto_s: 2.48, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'ovi-puu': { silmukka: false, voimakkuus: 1, kesto_s: 3, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  lokit: { silmukka: false, voimakkuus: 1, kesto_s: 4, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },
  'kellot-kaukaa': { silmukka: false, voimakkuus: 1, kesto_s: 4.48, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Sound Effects)', versio: 1 },

  // --- Puhe: kokki, apulainen, vesipoika (repliikit) ---
  'kokki-1': { silmukka: false, voimakkuus: 1, kesto_s: 4, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'kokki-2': { silmukka: false, voimakkuus: 1, kesto_s: 4.88, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  // Apulaisen ääni vaihdettu 1.10.2026 (omistajan valinta 30.9. klo 23.3x: fi-merkattu Esko → C "Adam - Engaging,
  // Friendly and Bright", eleven_v4, −17,2 LUFS); versio 2 = uusi tiedosto ohi natiivin välimuistin.
  'apulainen-1': { silmukka: false, voimakkuus: 1, kesto_s: 4.16, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 2 },
  'apulainen-2': { silmukka: false, voimakkuus: 1, kesto_s: 5.12, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 2 },
  'vesipoika-1': { silmukka: false, voimakkuus: 1, kesto_s: 4, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'vesipoika-2': { silmukka: false, voimakkuus: 1, kesto_s: 5.04, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },

  // --- Puhe: Pulun reaktiot (yksi per hahmo) ---
  'pulu-kokki-r1': { silmukka: false, voimakkuus: 1, kesto_s: 4.16, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'pulu-apulainen-r1': { silmukka: false, voimakkuus: 1, kesto_s: 5.44, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'pulu-vesipoika-r1': { silmukka: false, voimakkuus: 1, kesto_s: 5.28, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },

  // --- Puhe: taulujen kohdat (Pulun kertoma, linnan taulu + keittiön taulu) ---
  'linna-kohta-0': { silmukka: false, voimakkuus: 1, kesto_s: 7.04, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'linna-kohta-1': { silmukka: false, voimakkuus: 1, kesto_s: 6.16, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'linna-kohta-2': { silmukka: false, voimakkuus: 1, kesto_s: 5.6, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'keittio-kohta-0': { silmukka: false, voimakkuus: 1, kesto_s: 6.48, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'keittio-kohta-1': { silmukka: false, voimakkuus: 1, kesto_s: 7.2, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
  'keittio-kohta-2': { silmukka: false, voimakkuus: 1, kesto_s: 6.64, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1 },
};
