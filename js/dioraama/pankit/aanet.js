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
  // kuiva/kaiku/kaikuPitka (valinnaiset, Pelikoodari 30.9.): kehittäjätilan mikseritilan vaihtoehtoiset otot; '/'-alkuinen
  // polku luetaan median juuresta (natiivi DioraamaData.cs). Pelaajan ääni ei muutu.
  'kokki-1': { silmukka: false, voimakkuus: 1, kesto_s: 4, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1,
    kuiva: '/aanet/mikseri/v1/kokki-1.kuiva.mp3', kaiku: '/aanet/mikseri/v1/kokki-1.kaiku.mp3', kaikuPitka: '/aanet/mikseri/v1/kokki-1.kaiku-pitka.mp3' },
  'kokki-2': { silmukka: false, voimakkuus: 1, kesto_s: 4.88, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1,
    kuiva: '/aanet/mikseri/v1/kokki-2.kuiva.mp3', kaiku: '/aanet/mikseri/v1/kokki-2.kaiku.mp3', kaikuPitka: '/aanet/mikseri/v1/kokki-2.kaiku-pitka.mp3' },
  // Apulaisen ääni vaihdettu 1.10.2026 (omistajan valinta 30.9. klo 23.3x: fi-merkattu Esko → C "Adam - Engaging,
  // Friendly and Bright", eleven_v4, −17,2 LUFS); versio 2 = uusi tiedosto ohi natiivin välimuistin.
  'apulainen-1': { silmukka: false, voimakkuus: 1, kesto_s: 4.16, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 2,
    kuiva: '/aanet/mikseri/v2/apulainen-1.kuiva.mp3', kaiku: '/aanet/mikseri/v2/apulainen-1.kaiku.mp3', kaikuPitka: '/aanet/mikseri/v2/apulainen-1.kaiku-pitka.mp3' },
  'apulainen-2': { silmukka: false, voimakkuus: 1, kesto_s: 5.12, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 2,
    kuiva: '/aanet/mikseri/v2/apulainen-2.kuiva.mp3', kaiku: '/aanet/mikseri/v2/apulainen-2.kaiku.mp3', kaikuPitka: '/aanet/mikseri/v2/apulainen-2.kaiku-pitka.mp3' },
  'vesipoika-1': { silmukka: false, voimakkuus: 1, kesto_s: 4, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1,
    kuiva: '/aanet/mikseri/v1/vesipoika-1.kuiva.mp3', kaiku: '/aanet/mikseri/v1/vesipoika-1.kaiku.mp3', kaikuPitka: '/aanet/mikseri/v1/vesipoika-1.kaiku-pitka.mp3' },
  'vesipoika-2': { silmukka: false, voimakkuus: 1, kesto_s: 5.04, lisenssi: 'CC0 (oma tuotanto, ElevenLabs Text-to-Speech)', versio: 1,
    kuiva: '/aanet/mikseri/v1/vesipoika-2.kuiva.mp3', kaiku: '/aanet/mikseri/v1/vesipoika-2.kaiku.mp3', kaikuPitka: '/aanet/mikseri/v1/vesipoika-2.kaiku-pitka.mp3' },

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

  // --- Linnan äänimaisema (Linnanrakentaja 30.9.2026, omistajan lupa: vain CC0/PD-lähteet, ei generointia).
  // Äänitetyt lähteet (Freesound CC0, tekijä ja id; lisäksi Commons PD-self), käsittely ja lisenssit:
  // docs/raportit/linna-aanet-suunnitelma-20260930.md, tools/dioraama/linna-aanet.mjs. Tasoitus kuten keittiössä.
  'keskushalli-ambienssi': { silmukka: true, voimakkuus: 1, kesto_s: 26, lisenssi: 'CC0 (Freesound, kyles 451600)', versio: 1 },
  'takka-ratina': { silmukka: true, voimakkuus: 1, kesto_s: 21, lisenssi: 'CC0 (Freesound, schulmancreative 414298)', versio: 1 },
  'soihtu-ratina': { silmukka: true, voimakkuus: 1, kesto_s: 22, lisenssi: 'CC0 (Freesound, schulmancreative 414298)', versio: 1 },
  'kynttila-ratina': { silmukka: true, voimakkuus: 1, kesto_s: 24, lisenssi: 'CC0 (Freesound, NickTayloe 813328)', versio: 1 },
  'kappeli-ambienssi': { silmukka: true, voimakkuus: 1, kesto_s: 28, lisenssi: 'CC0 (Freesound, AAEPGranollers 157375)', versio: 1 },
  'vartiotupa-ambienssi': { silmukka: true, voimakkuus: 1, kesto_s: 26, lisenssi: 'CC0 (Freesound, Vrymaa 770108)', versio: 1 },
  'fatabuuri-ambienssi': { silmukka: true, voimakkuus: 1, kesto_s: 28, lisenssi: 'CC0 (Freesound, leonelmail 427862 + xkeril 628404)', versio: 1 },
  'porras-kaiku': { silmukka: true, voimakkuus: 1, kesto_s: 26, lisenssi: 'CC0 (Freesound, Tonmeister88 557380)', versio: 1 },
  'muuri-tuuli': { silmukka: true, voimakkuus: 1, kesto_s: 28, lisenssi: 'CC0 (Freesound, xkeril 708747)', versio: 1 },
  'laituri-laineet': { silmukka: true, voimakkuus: 1, kesto_s: 26, lisenssi: 'CC0 (Freesound, TRP 573171 + Rmutt 145721)', versio: 1 },
  'laulu-kaukaa': { silmukka: false, voimakkuus: 1, kesto_s: 40, lisenssi: 'PD (Wikimedia Commons, Membeth: Ecce lignum Crucis, PD-self)', versio: 1 },
  'kello-kappeli': { silmukka: false, voimakkuus: 1, kesto_s: 9, lisenssi: 'CC0 (Freesound, wuola 144496)', versio: 1 },
  'askel-porras-1': { silmukka: false, voimakkuus: 1, kesto_s: 3, lisenssi: 'CC0 (Freesound, TRP 616615)', versio: 1 },
  'askel-porras-2': { silmukka: false, voimakkuus: 1, kesto_s: 3, lisenssi: 'CC0 (Freesound, Sadiquecat 811375)', versio: 1 },
  tippa: { silmukka: false, voimakkuus: 1, kesto_s: 2.5, lisenssi: 'CC0 (Freesound, LordFluffeh 478547)', versio: 1 },
  'noppa-1': { silmukka: false, voimakkuus: 1, kesto_s: 2.2, lisenssi: 'CC0 (Freesound, ekfink 235489)', versio: 1 },
  'noppa-2': { silmukka: false, voimakkuus: 1, kesto_s: 2.2, lisenssi: 'CC0 (Freesound, H_Botha 764367)', versio: 1 },
  airot: { silmukka: false, voimakkuus: 1, kesto_s: 5, lisenssi: 'CC0 (Freesound, bruno.auzet 525030)', versio: 1 },
  'koysi-narina': { silmukka: false, voimakkuus: 1, kesto_s: 3.5, lisenssi: 'CC0 (Freesound, Rmutt 145721)', versio: 1 },
  'pikari-1': { silmukka: false, voimakkuus: 1, kesto_s: 1.6, lisenssi: 'CC0 (Freesound, Jae-Aye 528898)', versio: 1 },
  'pikari-2': { silmukka: false, voimakkuus: 1, kesto_s: 1.6, lisenssi: 'CC0 (Freesound, Jae-Aye 528898)', versio: 1 },
  penkki: { silmukka: false, voimakkuus: 1, kesto_s: 2.2, lisenssi: 'CC0 (Freesound, kyles 637357)', versio: 1 },
  'sivu-kaanto': { silmukka: false, voimakkuus: 1, kesto_s: 1, lisenssi: 'CC0 (Freesound, esperri 119127)', versio: 1 },
  'keihas-kolahdus': { silmukka: false, voimakkuus: 1, kesto_s: 1.52, lisenssi: 'CC0 (Freesound, loganzsound 774269)', versio: 1 },
  'arkku-kansi': { silmukka: false, voimakkuus: 1, kesto_s: 1.76, lisenssi: 'CC0 (Freesound, The_Frisbee_of_Peace 573653)', versio: 1 },
  'soihtu-syttyy': { silmukka: false, voimakkuus: 1, kesto_s: 3, lisenssi: 'CC0 (Freesound, DanielVega 479338)', versio: 1 },
};
