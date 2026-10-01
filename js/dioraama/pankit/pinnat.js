// Dioraaman pintapankki (erä 1, speksi docs/raportit/dioraama-rajapinnat-20260929.md
// kohta 1; erä 2, speksi docs/raportit/dioraama-rajapinnat-era2-20260929.md kohta 2
// "PINNAT" ja "UV"). Nimet ja arvot ovat sitovia sellaisenaan — rakennuskone (A1,
// tools/dioraama/rakenna.mjs) ja kaikki rakennukset (mm. olavinlinna.js)
// viittaavat näihin id:llä. Väri on baseColorFactorin pohja (leivotaan
// lineaariseksi rakennuskoneessa), toisto_m = tekstuurin toistoväli metreinä
// UV:n laskennassa (number → sama toisto molemmilla akseleilla, [u_m, v_m] →
// eri toisto per akseli). `lahde`: Codexin kuva suhteessa assets/dioraama/
// (puuttuva lähde EI ole virhe — rakennuskone käyttää paikkamerkkiä). `virtaus`
// (vain vesi): UV-siirtymä metriä/sekunti (u, v) pinnan animointiin natiivissa.
// metalli, kangas ja hiillos EIVÄT saa Codex-lähdettä vielä (paikkamerkki jatkuu).
// `kuvio` (erä 2b, speksin kohta 2 "PINNAT"): { tyyppi, koko_m?: [u, v], sauma_m?, vaihtelu?: 0–1 }
// proseduraaliselle vaihtoehto A:lle — kopioidaan rakennus.json:iin sellaisenaan (rakenna.mjs),
// ja natiivi/esikatselu lukevat sen DioraamaKuvio(tyyppi, parametrit, uv, maailma, COLOR_0.B):lle
// (Assets/Matkakirja/Linssit/Resources/Varjostimet/DioraamaKuviot.hlsl, tools/dioraama/kuviot.glsl.mjs).
// katto: valittu 'tiili' (kattotiilien limitys) kahdesta speksin vaihtoehdosta (tiili/tasainen).
export const PINNAT = {
  kivi: {
    vari: '#9c8d76', toisto_m: 2.0, lahde: 'pinnat/kivi.jpg',
    kuvio: { tyyppi: 'kivi', koko_m: [0.42, 0.28], sauma_m: 0.02, vaihtelu: 0.35 },
  },
  leikkaus: {
    vari: '#d9ceb8', toisto_m: [4, 1], lahde: 'pinnat/leikkaus.jpg',
    kuvio: { tyyppi: 'kivi', koko_m: [0.3, 0.2], sauma_m: 0.015, vaihtelu: 0.3 }, // kivi, pienempi
  },
  rappaus: {
    vari: '#d6c3a3', toisto_m: 2.0, lahde: 'pinnat/rappaus.jpg',
    kuvio: { tyyppi: 'rappaus', koko_m: [1.2, 1.2], vaihtelu: 0.3 },
  },
  lankku: {
    vari: '#caa678', toisto_m: 1.5, lahde: 'pinnat/lankku.jpg',
    kuvio: { tyyppi: 'lankku', koko_m: [0.2, 2.0], sauma_m: 0.01, vaihtelu: 0.3 },
  },
  puu: {
    vari: '#6e4f34', toisto_m: 1.0, lahde: 'pinnat/puu.jpg',
    kuvio: { tyyppi: 'puu', koko_m: [0.3, 0.3], vaihtelu: 0.3 },
  },
  katto: {
    vari: '#5c5652', toisto_m: 1.5, lahde: 'pinnat/katto.jpg',
    kuvio: { tyyppi: 'tiili', koko_m: [0.35, 0.18], sauma_m: 0.012, vaihtelu: 0.25 },
  },
  tiili: {
    vari: '#9c7b6a', toisto_m: [4, 1], lahde: 'pinnat/tiili.jpg',
    kuvio: { tyyppi: 'tiili', koko_m: [0.25, 0.07], sauma_m: 0.012, vaihtelu: 0.3 },
  },
  kallio: {
    vari: '#8f8a7e', toisto_m: 4.0, lahde: 'pinnat/kallio.jpg',
    kuvio: { tyyppi: 'kallio', koko_m: [1.5, 1.5], vaihtelu: 0.4 },
  },
  vesi: {
    vari: '#465e68', toisto_m: 8.0, lahde: 'pinnat/vesi.jpg', virtaus: [0.04, 0.015],
    kuvio: { tyyppi: 'vesi', koko_m: [2.0, 2.0], vaihtelu: 0.15 },
  },
  metalli: { vari: '#3d3a38', toisto_m: 0.5, kuvio: { tyyppi: 'metalli', koko_m: [0.4, 0.4], vaihtelu: 0.2 } },
  kangas: { vari: '#cdbf9e', toisto_m: 0.5, kuvio: { tyyppi: 'kangas', koko_m: [0.05, 0.05], vaihtelu: 0.2 } },
  hiillos: { vari: '#d38c41', toisto_m: 1.0, hehku: 1, kuvio: { tyyppi: 'tasainen' } },

  // Erä 2b (kohta 3 "Rekvisiitta ja lattiat"): kivilattia — proseduraalinen, EI Codex-lähdettä
  // (koko ideana on käsintehdyn kivilattian tuntu geometrialla + kuviolla, ei maalatulla kuvalla).
  // toisto_m koskee vain jäljelle jäävää tasoprojektiota (kuvio-kaava on itsenäinen mittakaava).
  kivilattia: {
    vari: '#a89a86', toisto_m: 0.5,
    kuvio: { tyyppi: 'kivi', koko_m: [0.55, 0.55], sauma_m: 0.02, vaihtelu: 0.3 },
  },

  // Erä 2b (docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 4 "3D-HAHMOT"):
  // pienoisfiguurien pinnat (tools/dioraama/hahmot3d.mjs). Yhteinen oletusväri
  // kaikille hahmoille — vaate/vaate2/esiliina korvautuvat HENKILOT[id].malli3d.
  // varit:llä hahmokohtaisesti (ks. js/dioraama/pankit/henkilot.js:n kommentti).
  // EI lähdekuvaa (pienoisfiguuri on yksivärinen maalattu osa, ei tekstuuria) —
  // kuvio (era2b kohta 2 "PINNAT", P3b:n täydennys 29.9.) antaa silti pienen proseduraalisen
  // vaihtelun samalla varjostimella kuin muut pinnat: vaatteet 'kangas' (kudos), muut 'tasainen'.
  iho: { vari: '#d3a17e', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  vaate: { vari: '#7a3b2e', toisto_m: 1.0, kuvio: { tyyppi: 'kangas', koko_m: [0.05, 0.05], vaihtelu: 0.2 } },
  vaate2: { vari: '#5c2c22', toisto_m: 1.0, kuvio: { tyyppi: 'kangas', koko_m: [0.05, 0.05], vaihtelu: 0.2 } },
  esiliina: { vari: '#e8e0cc', toisto_m: 1.0, kuvio: { tyyppi: 'kangas', koko_m: [0.05, 0.05], vaihtelu: 0.2 } },
  hiukset: { vari: '#4a3527', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  kengat: { vari: '#3b2a20', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  silmat: { vari: '#241a12', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  'esine-metalli': { vari: '#8a8f94', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  'esine-puu': { vari: '#9c7648', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },

  // Erä 2b (P3, docs/raportit/dioraama-rajapinnat-era2b-20260929.md kohta 3 "Rekvisiitta ja lattiat"):
  // keittiön pienesineiden (tools/dioraama/reseptit-rekvisiitta.mjs) pinnat. kuvio lisätty P3b:n
  // täydennyksenä (era2b kohta 2 "PINNAT", tyypit sen taulukosta) — koko_m pieni, esineet ovat
  // pieniä (≤ 0,4 m) verrattuna huoneen pintoihin. EI Codex-lähdettä (paikkamerkki jatkuu).
  savi: { vari: '#b5764f', toisto_m: 0.4, kuvio: { tyyppi: 'rappaus', koko_m: [0.15, 0.15], vaihtelu: 0.3 } },
  leipa: { vari: '#c9995f', toisto_m: 0.3, kuvio: { tyyppi: 'rappaus', koko_m: [0.25, 0.25], vaihtelu: 0.25 } },
  kala: { vari: '#9aa8ad', toisto_m: 0.3, kuvio: { tyyppi: 'metalli', koko_m: [0.15, 0.15], vaihtelu: 0.2 } },
  vihannes: { vari: '#8a9a52', toisto_m: 0.3, kuvio: { tyyppi: 'tasainen' } },
  // Harmaantunut hirsi (1.10., rannan aitat ja venevaja n1500): vanhan hirren hopeanharmaa, puun syy kuviona.
  hirsi: { vari: '#6f6a61', toisto_m: 1.0, kuvio: { tyyppi: 'puu', koko_m: [0.3, 0.3], vaihtelu: 0.3 } },
  olki: { vari: '#d8c27a', toisto_m: 0.3, kuvio: { tyyppi: 'olki', koko_m: [0.15, 0.15], vaihtelu: 0.3 } },
  kupari: { vari: '#b3702e', toisto_m: 0.4, kuvio: { tyyppi: 'metalli', koko_m: [0.3, 0.3], vaihtelu: 0.25 } },
  rauta: { vari: '#524f4a', toisto_m: 0.4, kuvio: { tyyppi: 'metalli', koko_m: [0.3, 0.3], vaihtelu: 0.25 } },
  nahka: { vari: '#6b4a34', toisto_m: 0.3, kuvio: { tyyppi: 'kangas', koko_m: [0.06, 0.06], vaihtelu: 0.2 } },
  vaha: { vari: '#f0e0b0', toisto_m: 0.2, hehku: 0.15, kuvio: { tyyppi: 'tasainen' } },

  // P4c (29.9.2026, dioraama-rajapinnat-era2b kohta 4 "3D-HAHMOT" -korjauskierros,
  // "NYKYISET VIAT" -> kasvot): poskien lämmin sävy (tools/dioraama/hahmot3d.mjs:n
  // rakennaKasvot) - ERI pinta kuin "iho", jotta yksivärimaalattu figuuri (ei
  // tekstuuria/verteksiväriä) voi silti näyttää posket ihoa lämpimämpänä omana osanaan.
  iho2: { vari: '#dd9c78', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  // Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md kohta 2, tools/dioraama/reseptit-kalusteet2.mjs):
  // linnan tilojen kalusteiden ja rekvisiitan pinnat. 'olki' (kuvio 'olki') on jo erän 2b rekvisiitasta.
  punamulta: { vari: '#8a2e20', toisto_m: 0.6, kuvio: { tyyppi: 'rappaus', koko_m: [0.4, 0.4], vaihtelu: 0.3 } },
  kulta: { vari: '#b8923a', toisto_m: 0.4, kuvio: { tyyppi: 'metalli', koko_m: [0.3, 0.3], vaihtelu: 0.2 } },
  aukko: { vari: '#1c1611', toisto_m: 1.0, kuvio: { tyyppi: 'tasainen' } },
  lippu: { vari: '#8a2e20', toisto_m: 0.5, kuvio: { tyyppi: 'kangas', koko_m: [0.05, 0.05], vaihtelu: 0.2 } },
};
