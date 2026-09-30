// OLAVINLINNA / fatabuuri: Kellotornin pohjakerros (torni [−30, 0, −20], sisäsäde 5,5), y 0…4,5; holvattu vaate- ja
// tavara-aitta (Sisältökirjuri 29.9. era4: fatabuuri = vaate- ja tavara-aitta, arvotavaran varasto, EI ruokavarasto;
// Päätoimittajan päätös: arkut, kangaspakat, vaatteet orsilla, kalusto, hoitajan kirjanpito; voudin sinetti arkussa).
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Asettelu: pyöreä huone, kaikki esineet sisäsäteen 5,5 sisällä. Kompassikulma a (0 = pohjoinen, 90 = itä):
// piste = keskipiste + r·(sin a, −cos a). Auki-sektori 95…235 (kamera katsoo etelä-kaakosta sen läpi), joten
// takaseinä on kulmilla 235…360…95 (länsi–pohjoinen–itä). Seinänvieruskalusteet: suunta = a + 180 (etupuoli sisään).

const C = [-30, -20]; // tornin keskipiste (x, z)
const AUKI = { alku: 95, loppu: 235 };
const RAD = Math.PI / 180;
const r1 = (x) => Math.round(x * 1000) / 1000;

// Piste kulmassa a (kompassiasteet), säteellä r, korkeudella y.
const pol = (a, r, y = 0) => [r1(C[0] + r * Math.sin(a * RAD)), y, r1(C[1] - r * Math.cos(a * RAD))];
// Paikallinen (u, w) → maailma esineen paikan P ja suunnan s ympärillä (kuten reseptit.mjs:n sijoita).
const lok = (P, s, u, y, w) => [
  r1(P[0] + u * Math.cos(s * RAD) + w * Math.sin(s * RAD)), y, r1(P[2] + u * Math.sin(s * RAD) - w * Math.cos(s * RAD)),
];

// Seinänvierus: esine kulmassa a, säteellä r (y valinnainen), etupuoli sisään.
const sein = (resepti, a, r, { y = 0, ...extra } = {}) => ({ resepti, paikka: pol(a, r, y), suunta: a + 180, ...extra });

const TAULU = {
  otsikko: 'Kellotornin fatabuuri',
  // Sisältökirjurin korjaus 29.9. (era4-tarkistus, F1–F3): fatabuuri = vaate- ja tavara-aitta, ei ruokavarasto.
  tila: 'tarkistettu',
  kohdat: [
    { teksti: 'Kellotornin fatabuuri: suojainen, vaikeapääsyinen varasto – holvikatto kertoo muurareiden taidosta.', lahde: 'Kansallismuseo: Kellotornin fatabuuri' },
    { teksti: 'Sana fatabuuri tulee ruotsista: se oli vaate- ja tavara-aitta, arvotavaran varasto.', lahde: 'Kotimaisten kielten keskus / SKES: fatabuuri' },
    { teksti: 'Hämeen linnan fatabuurissa säilytettiin vaatteita ja kalustoa; naisväki kutoi ja hoiti sitä.', lahde: 'Ailio: Hämeen linnan asukkaista ja oloista (1500-luku, analogia)' },
  ],
};

// Hahmot (erä 2, 29.9.): aitan hoitaja kirjaa tavaraa pulpetilla (kirjuri-1500, Päätoimittaja), renki kantaa
// kangaspakkoja arkuilta itäseinän pinoihin. Repliikit ja Pulun reaktiot: Päätoimittaja 29.9.
const HAHMOT = [
  {
    id: 'hoitaja', henkilo: 'kirjuri-1500', paikka: pol(312, 3.95), suunta: 312, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'hoitaja-1', teksti: 'Kolme viittaa, kaksi verkaröijyä, tusina tinakannuja. Kaikki kirjaan, muuten vouti kysyy.' },
      { id: 'hoitaja-2', teksti: 'Arkkuihin ei kosketa ilman lupaa – täällä on linnan arvokkain tavara.' },
    ],
    reaktio: { id: 'pulu-hoitaja-r1', teksti: 'Kaikki kirjassa, tinakannuja myöten. Murujakin varmaan laskettiin.' },
  },
  {
    id: 'renki', henkilo: 'renki-1500', paikka: pol(262, 2.4), suunta: 80, peilattu: false,
    silmukka: 'kanto', heraa: 2,
    reitti: { pisteet: [pol(262, 2.4), pol(200, 0.8), pol(75, 3.3), pol(200, 0.8), pol(262, 2.4)], nopeus: 0.7, tauko: 2 },
    repliikit: [
      { id: 'renki-1', teksti: 'Kangaspakka painaa enemmän kuin näyttää. Kutojat eivät säästäneet lankaa.' },
      { id: 'renki-2', teksti: 'Vaatteet kuivina ja koit poissa – siinä on aitan koko salaisuus.' },
    ],
    reaktio: { id: 'pulu-renki-r1', teksti: 'Koit ovat aitan pahin vihollinen. Minä en syö villaa, lupaan sen.' },
  },
];

// ---------------------------------------------------------------------------
// Rakenne: pyöreä kivilattia (yläpinta y 0,1, sivut kuten tornin ulkosäde: sektorin kohdalla lattia näkyy
// "näyttämönä") ja holvi (sisäpinta kiveä: muurareiden taito), jonka yläreuna jää alle kierreportaiden lattian (4,5).
const Y = 0.1; // lattian yläpinta
const RAKENNE = [
  // Tornin seinä (uusi tapa 29.9.: kuoressa ei ole sisäpintaa; säde 7,1 jää kuoren sisään).
  { resepti: 'torni', paikka: [C[0], -0.3, C[1]], suunta: 0, sade: 7.1, paksuus: 1.6, korkeus: 4.8, segmentit: 32, auki: { alku: 95, loppu: 235 } },
  {
    resepti: 'kiekko', paikka: [C[0], Y, C[1]], suunta: 0, sade: 7.1, paksuus: 0.4, segmentit: 32, pinnat: { yla: 'kivi' },
  },
  {
    resepti: 'kupoli', paikka: [C[0], 3.1, C[1]], suunta: 0, sade: 5.5, korkeus: 1.3, segmentit: 32, paksuus: 0.2,
    auki: AUKI, pinnat: { holvi: 'kivi' },
  },
];

// Arkut länsi- ja luoteisseinällä (r 4,9) etupuoli sisään, osa päällekkäin, ja kangaspakkoja arkkujen kansilla.
const ARKUT = [
  ...[[244, 0.9, 0.5, 0.55], [256, 1.0, 0.55, 0.6], [268, 0.9, 0.5, 0.55], [280, 0.8, 0.45, 0.5]].map(([a, leveys, syvyys, korkeus]) => (
    { resepti: 'arkku', paikka: pol(a, 4.75, Y), suunta: a + 180, leveys, syvyys, korkeus })),
  { resepti: 'arkku', paikka: pol(256, 4.8, Y + 0.6), suunta: 256 + 180 + 6, leveys: 0.75, syvyys: 0.42, korkeus: 0.45 },
  { resepti: 'arkku', paikka: pol(268, 4.8, Y + 0.55), suunta: 268 + 180 - 5, leveys: 0.7, syvyys: 0.4, korkeus: 0.42 },
  { resepti: 'kangaspakka', paikka: pol(244, 4.75, Y + 0.55), suunta: 244 + 90, pituus: 0.8, sade: 0.08, siemen: 11 },
  { resepti: 'kangaspakka', paikka: pol(280, 4.75, Y + 0.5), suunta: 280 + 95, pituus: 0.7, sade: 0.085, siemen: 12 },
  { resepti: 'vaatepino', paikka: pol(256, 4.8, Y + 1.05), suunta: 256 + 180, leveys: 0.4, syvyys: 0.3, kerroksia: 3, siemen: 13 },
];

// Kangaspakat itäseinällä kahtena siistinä pinona matalalla lavalla (pakat seinän suuntaisesti, 4 + 3 + 2 kerroksin).
function pakkapino(a, siemen) {
  const P = pol(a, 4.55, Y), s = a + 180, lava = [{ resepti: 'laatta', paikka: [P[0], Y + 0.04, P[2]], suunta: s, leveys: 1.1, syvyys: 0.9, paksuus: 0.08, pinnat: { yla: 'lankku', ala: 'lankku', sivu: 'puu' } }];
  const rivit = [[-0.3, -0.1, 0.1, 0.3], [-0.2, 0, 0.2], [-0.1, 0.1]];
  return lava.concat(rivit.flatMap((ws, r) => ws.map((w, i) => ({
    resepti: 'kangaspakka', paikka: lok(P, s, (i % 2) * 0.03, Y + 0.08 + r * 0.17, w), suunta: s, pituus: 1.0 - r * 0.05, sade: 0.095, siemen: siemen + r * 10 + i,
  }))));
}
const PAKAT = [
  ...pakkapino(45, 400), ...pakkapino(72, 500),
  { resepti: 'vaatepino', paikka: pol(55, 4.0, Y), suunta: 55 + 180, siemen: 71 },
  { resepti: 'vaatepino', paikka: pol(70, 4.05, Y), suunta: 70 + 170, kerroksia: 5, siemen: 72 },
  { resepti: 'arkku', paikka: pol(104, 4.5, Y), suunta: 104 + 180, leveys: 0.8, syvyys: 0.45, korkeus: 0.5 },
];

// Hyllyt pohjoisseinällä (leveys 2,2, r 5,08): linnan kalusto (kattilat, vadit, kannut, kynttilänjalat) ja tekstiilit. Hyllytasojen
// yläpinnat y = 0,12 / 1,045 / 1,97 hyllyn pohjasta (reseptit-kalusteet.mjs). Rivi: [u, taso, resepti, parametrit, w, suuntaLisa].
const HYLLYTASO = [0.12, 1.045, 1.97];
function hyllyRivi(a, rivit) {
  const P = pol(a, 5.08, Y), s = a + 180;
  const palikat = [{ resepti: 'hylly', paikka: P, suunta: s, leveys: 2.2, korkeus: 2.0, syvyys: 0.4, hyllyt: 3 }];
  for (const [u, taso, resepti, p = {}, w = 0, suuntaLisa = 0] of rivit) {
    palikat.push({ resepti, paikka: lok(P, s, u, Y + HYLLYTASO[taso], w), suunta: s + suuntaLisa, ...p });
  }
  return palikat;
}
const R = (sade, korkeus) => ({ sade, korkeus });
const HYLLYT = [
  ...hyllyRivi(340, [
    [-0.55, 0, 'vaatepino', { leveys: 0.4, syvyys: 0.3, kerroksia: 3, siemen: 81 }], [0.45, 0, 'vaatepino', { leveys: 0.4, syvyys: 0.3, kerroksia: 4, siemen: 82 }],
    [-0.8, 1, 'kattila', { sade: 0.13, korkeus: 0.15 }], [-0.4, 1, 'kattila', { sade: 0.11, korkeus: 0.13 }],
    [0.05, 1, 'vati', { sade: 0.14 }], [0.45, 1, 'vati', { sade: 0.13 }], [0.85, 1, 'pullo', { sade: 0.05, korkeus: 0.19 }],
    [-0.7, 2, 'kynttilanjalka', { korkeus: 0.17 }], [-0.4, 2, 'kynttilanjalka', { korkeus: 0.17 }],
    [0.05, 2, 'kirja'], [0.5, 2, 'pullo', { sade: 0.055, korkeus: 0.2 }],
  ]),
  ...hyllyRivi(20, [
    [-0.5, 0, 'kangaspakka', { pituus: 0.9, sade: 0.085, siemen: 91 }, 0, 0], [0.45, 0, 'vaatepino', { leveys: 0.4, syvyys: 0.3, siemen: 92 }],
    [-0.5, 1, 'kangaspakka', { pituus: 0.85, sade: 0.08, siemen: 93 }, 0, 0], [0.45, 1, 'kangaspakka', { pituus: 0.8, sade: 0.08, siemen: 94 }, 0, 0],
    [-0.75, 2, 'pullo', { sade: 0.05, korkeus: 0.17 }], [-0.4, 2, 'vati', { sade: 0.12 }],
    [0.05, 2, 'kattila', { sade: 0.1, korkeus: 0.12 }], [0.5, 2, 'ruukku', R(0.1, 0.17)],
  ]),
];

// Kirjanpitonurkka luoteessa: pulpetti kirjoineen, arkku ja öljylamppu arkun kannella.
const P_ARKKU = pol(298, 4.85, Y);
const LAMPPU = lok(P_ARKKU, 298 + 180, 0.28, Y + 0.56, 0.02);
const KIRJANPITO = [
  sein('pulpetti', 312, 4.85, { y: Y }),
  sein('arkku', 298, 4.85, { y: Y }),
  { resepti: 'kirja', paikka: lok(P_ARKKU, 298 + 180, -0.15, Y + 0.56, 0), suunta: 298 + 180 + 12 },
  { resepti: 'oljylamppu', paikka: LAMPPU, suunta: 0, sade: 0.07, korkeus: 0.1 },
  // Toinen arkku vasemmassa etukulmassa (sektorin reunalla) ja kangaspakka sen vieressä lattialla.
  { resepti: 'arkku', paikka: pol(226, 4.5, Y), suunta: 226 + 180 - 20 },
  { resepti: 'kangaspakka', paikka: pol(233, 3.85, Y), suunta: 30, pituus: 0.7, sade: 0.08, siemen: 21 },
  { resepti: 'koysikieppi', paikka: pol(112, 3.5, Y), suunta: 0 },
];

// VOUDIN SINETTI (käsikirjoitus kohta 4, Päätoimittaja 29.9.: vaatearkun kannen alla kankaiden välissä). Arkku
// huoneen keskellä vasemmalla, etupuoli kameraan; runko palikkana (yläpinta kangasta), kansi ja sormus irtoesineinä
// (esineet[] alla), jotta natiivi voi avata kannen saranastaan ja nostaa sormuksen. Vieressä hoitajan jo purkamia vaatteita.
const P_SINETTI = pol(250, 3.3, Y);
const S_SINETTI = 250 + 180 - 25;
const SINETTI_ARKKU = { leveys: 0.9, syvyys: 0.5, korkeus: 0.55 };
const SINETTI_Y = Y + SINETTI_ARKKU.korkeus * 0.72;
const P_SORMUS = lok(P_SINETTI, S_SINETTI, 0.14, SINETTI_Y, 0.06);
const SINETTI = [
  { resepti: 'arkku', paikka: P_SINETTI, suunta: S_SINETTI, ...SINETTI_ARKKU, osa: 'runko', pinnat: { kansi: 'kangas' } },
  { resepti: 'vaatepino', paikka: lok(P_SINETTI, S_SINETTI, -0.75, Y, 0.35), suunta: S_SINETTI + 20, kerroksia: 3, siemen: 31 },
  { resepti: 'kangaspakka', paikka: lok(P_SINETTI, S_SINETTI, 0.2, Y, 0.62), suunta: S_SINETTI - 12, pituus: 0.75, sade: 0.08, siemen: 32 },
];
const ESINEET = [
  { id: 'arkun-kansi', resepti: 'arkku', paikka: P_SINETTI, suunta: S_SINETTI, ...SINETTI_ARKKU, osa: 'kansi', sarana: [0, SINETTI_Y - Y, -SINETTI_ARKKU.syvyys / 2], avaa: 105 },
  { id: 'sinetti', resepti: 'sinettisormus', paikka: P_SORMUS, suunta: S_SINETTI + 30 },
];

// Vaateorret holvin alla (holvin alapinta r 4,3:ssa ≈ y 3,66): viitat, paidat ja mekot kuivumassa ja tuulettumassa.
// Hoitajan taittopöytä huoneen oikealla: kangas levitettynä, taiteltu pino ja kynttilä (iltahämärän toinen valo).
const P_POYTA = pol(28, 2.7, Y);
const KYNTTILA_POYTA = lok(P_POYTA, 28 + 180, 0.45, Y + 0.75, -0.1);
const POYTA = [
  { resepti: 'poyta', paikka: P_POYTA, suunta: 28 + 180, leveys: 1.4, syvyys: 0.7, korkeus: 0.75 },
  { resepti: 'laatta', paikka: lok(P_POYTA, 28 + 180, -0.15, Y + 0.752, 0.02), suunta: 28 + 180 + 4, leveys: 0.9, syvyys: 0.6, paksuus: 0.006, pinnat: { yla: 'vaate', ala: 'vaate', sivu: 'vaate' } },
  { resepti: 'vaatepino', paikka: lok(P_POYTA, 28 + 180, 0.4, Y + 0.75, 0.12), suunta: 28 + 170, leveys: 0.35, syvyys: 0.28, kerroksia: 3, siemen: 41 },
  { resepti: 'kynttilanjalka', paikka: KYNTTILA_POYTA, suunta: 0, korkeus: 0.17 },
];

const RIPUSTETUT = [
  { resepti: 'vaateorsi', paikka: pol(290, 4.1, 3.5), suunta: 290 + 90, pituus: 1.4, vaatteita: 4, pituusVaate: 1.0, siemen: 701 },
  { resepti: 'vaateorsi', paikka: pol(40, 4.1, 3.5), suunta: 40 + 90, pituus: 1.3, vaatteita: 4, pituusVaate: 0.9, siemen: 702 },
  { resepti: 'vaateorsi', paikka: pol(350, 4.2, 3.5), suunta: 350 + 90, pituus: 1.2, vaatteita: 3, pituusVaate: 1.1, siemen: 703 },
];
const SOIHTU_Y = 2.25;
const SOIHDUT = [
  sein('seinasoihtu', 0, 5.455, { y: SOIHTU_Y }),
  sein('seinasoihtu', 75, 5.455, { y: SOIHTU_Y + 0.1 }),
  sein('rako', 312, 5.455, { y: 1.75, leveys: 0.22, korkeus: 1.0 }),
];
// Soihdun liekin alapää maailmassa (paikallinen [0, 0,47, 0,262]) — liekki-billboard.
const soihduLiekki = (a, y) => lok(pol(a, 5.455, 0), a + 180, 0, y + 0.47, 0.262);

export const TILA = {
  id: 'fatabuuri',
  nimi: 'Fatabuuri',
  kohdistettava: true,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): pohjoismuurin muunnos Kellotornin (−30, −20) → kuoren
  // Kellotorni (−44,4; −4,6) ja lähteen +x → Kirkkotornia kohti (suunta 341), iso linnanpiha y 2,9 (säteet 29.9. klo 21).
  sijoitus: { ankkuri: [-30, 0, -20], paikka: [-44.4, 2.9, -4.6], suunta: 341 },
  rajat: { min: [-35.5, 0, -25.5], max: [-24.5, 4.5, -14.5] },
  // Leikkaus kuoren Kellotornin säteelle (≈ 7,7): kapeammalla ulkoseinä peitti puolet (Siirtoseppä 1.0.55).
  leikkaus: { laajennus: 1.0, kameraan: true, min: [-38.5, 0, -28.5], max: [-21.5, 4.5, -11.5] },
  naapurit: ['massa', 'laituri', 'kierreportaat', 'keskushalli'],
  // Vaaka: kohde siirretty oikealle (taulu peittää oikean 40 %), jotta huone jää näkyvälle 60 %:lle.
  kamera: { kohde: [-27.0, 1.3, -20.4], atsimuutti: 172, korkeus: 17, etaisyys: 15.5, fov: 38, aukko: 0.8 },
  // Pysty (Siirtosepän 1.0.60-löydös): kohde 3,3 m vasemmalle, jotta sinettiarkku on keskellä vapaalla alueella
  // (ruudulla x 0,51, y 0,38) eikä Pulun ja taulukortin takana vasemmassa reunassa.
  kameraPysty: { kohde: [-32.05, -1.2, -16.09], atsimuutti: 160, korkeus: 19, etaisyys: 28, fov: 38, aukko: 0.8 },
  kierto: { atsimuutti: [-40, 40], korkeus: [10, 40], etaisyys: [0.8, 1.3] },
  // Pulu pohjoisen hyllyn päälle (pysty x 0,80 / vaaka x 0,36): ei peitä sinettiarkkua kummassakaan asennossa.
  pulu: { laskeutuminen: pol(340, 5.05, Y + 2.02), taulupuoli: 'oikea' },
  taulu: TAULU,
  // Elävä linna (29.9.): Kellotornin juuri kameran puolella (ovi raollaan, viileä hämärä).
  elava: { kohde: [-28.2, 1.5, -13.2], sade: 6 },
  valot: [
    // Päävalo: soihtu pohjoisseinällä, lämmin ja lepattava; tumma perusvalo tekee varastosta hämärän.
    {
      paikka: pol(0, 3.6, 2.6), sade: 9, voima: 2.0, vari: '#ff9a4a', lepatus: 0.3,
    },
    // Läntinen lisähehku arkkujen ja sinettiarkun kohdalle (öljylampun valo).
    {
      paikka: pol(283, 3.6, 1.8), sade: 5.5, voima: 1.2, vari: '#ffb070', lepatus: 0.2,
    },
    // Ampumaraon valokeila: kylmä päivänvalo ulkoa pulpetin ja saavin suuntaan (ks. keittiön ikkunakeila).
    {
      tyyppi: 'keila', paikka: pol(312, 7.6, 3.2), kohti: pol(305, 2.2, Y), kulma: 28, sade: 9, voima: 140, vari: '#dfe8ff',
    },
  ],
  palikat: [
    ...RAKENNE, ...ARKUT, ...PAKAT, ...HYLLYT, ...KIRJANPITO, ...SINETTI, ...POYTA, ...RIPUSTETUT, ...SOIHDUT,
  ],
  esineet: ESINEET,
  // Voudin sinetin etsintä, vaihe 3 (löytö): napautus arkkuun avaa kannen ja nostaa sormuksen → PeliOhjain.LoydaMatkamuisto.
  etsinta: [
    { etsinta: 'voudin-sinetti', vaihe: 3, tyyppi: 'loyto', kohde: [P_SORMUS[0], SINETTI_Y + 0.05, P_SORMUS[2]], sade: 0.8,
      kansi: 'arkun-kansi', esine: 'sinetti', pulu: 'Tässä se on, kankaiden välissä! Vouti vaihtoi viitan iltamessun jälkeen, ja sormus luiskahti mukaan.' },
  ],
  hahmot: HAHMOT,
  // Äänet (Linnanrakentaja 30.9., CC0/PD, suunnitelma docs/raportit/linna-aanet-suunnitelma-20260930.md kohta 2).
  aanet: [{ aani: 'fatabuuri-ambienssi', voimakkuus: 0.6 }],
  tehosteet: [
    { aanet: ['tippa'], valit_s: [6, 14], voimakkuus: 0.35 },
    { aanet: ['arkku-kansi'], valit_s: [30, 60], voimakkuus: 0.4 },
    { aanet: ['sivu-kaanto'], valit_s: [15, 30], voimakkuus: 0.35 },
    { aanet: ['askel-kivi'], valit_s: [10, 22] },
    { aanet: ['ovi-puu'], valit_s: [30, 60] },
  ],
  liekit: [
    { liekki: 'soihtu', paikka: soihduLiekki(0, SOIHTU_Y), koko: 1, vaihe: 0 },
    { liekki: 'soihtu', paikka: soihduLiekki(75, SOIHTU_Y + 0.1), koko: 1, vaihe: 0.5 },
    { liekki: 'kynttila', paikka: lok(LAMPPU, 0, 0.021, LAMPPU[1] + 0.102, 0), koko: 1, vaihe: 0.25 },
    { liekki: 'kynttila', paikka: [KYNTTILA_POYTA[0], r1(KYNTTILA_POYTA[1] + 0.167), KYNTTILA_POYTA[2]], koko: 1, vaihe: 0.6 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'hoitaja' },
    { tee: 'reaktio', hahmo: 'hoitaja' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'renki' },
    { tee: 'reaktio', hahmo: 'renki' },
    { tee: 'kohta', n: 2 },
  ],
};
