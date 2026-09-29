// OLAVINLINNA / fatabuuri: Kellotornin pohjakerros (torni [−30, 0, −20], sisäsäde 5,5), y 0…4,5; holvattu varasto.
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
  tila: 'luonnos',
  kohdat: [
    { teksti: 'Fatabuuri on suojainen, vaikeapääsyinen varastotila, jonka holvikatto näyttää muurareiden taidon.', lahde: 'Kansallismuseo: Kellotornin fatabuuri' },
    { teksti: 'Kalaa syötiin katolisen paaston vuoksi 229 päivänä vuodessa – suolakala tarvitsi varastotilaa.', lahde: 'Apu: Suomen keskiaikaiset kivilinnat 6/6' },
    { teksti: 'Hämeen linnassa fatabuuria hoiti naispuolinen fatabuurinhoitaja, joka vastasi ruokavarastosta.', lahde: 'Ailio: Hämeen linnan asukkaista ja oloista (analogia)' },
  ],
};

// Hahmot: hoitaja kiertää varastoa pulpetin ja hyllyjen välillä, tynnyrintekijä korjaa tynnyriä läntisellä laidalla.
const HAHMOT = [
  {
    id: 'fatabuurinhoitaja', henkilo: 'fatabuurinhoitaja-1500', paikka: pol(318, 2.9), suunta: 318, peilattu: false,
    silmukka: 'tyo', heraa: 1, reitti: null,
    repliikit: [
      { id: 'fatabuurinhoitaja-1', teksti: 'Kaksisataakaksikymmentäyhdeksän kalapäivää vuodessa. Tynnyrit eivät riitä ilman minua.' },
      { id: 'fatabuurinhoitaja-2', teksti: 'Jokainen tynnyri kirjaan, jokainen säkki myös. Rotta ei kirjaa, se vain syö.' },
    ],
    reaktio: { id: 'pulu-fatabuurinhoitaja-r1', teksti: 'Kaikki kirjattuna käsin! Meillä sama tehdään taulukolla, ja silti puuttuu aina yksi tynnyri.' },
  },
  {
    id: 'tynnyrintekija', henkilo: 'tynnyrintekija-1500', paikka: pol(268, 2.6), suunta: 320, peilattu: false,
    silmukka: 'tyo', heraa: 2, reitti: null,
    repliikit: [
      { id: 'tynnyrintekija-1', teksti: 'Tämä vanne löystyi suolasta. Olut ja suolakala syövät puuta, ei tynnyri ikuisesti kestä.' },
      { id: 'tynnyrintekija-2', teksti: 'Hyvä tynnyri pitää oluen makeana ja voin vihreänä. Väelle riittää vihreä.' },
    ],
    reaktio: { id: 'pulu-tynnyrintekija-r1', teksti: 'Puinen tynnyri, käsin sidottu vanne. Muovia ei vielä keksitty, ja hyvä niin.' },
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

// Tynnyrit: rivi länsi- ja luoteisseinällä (r 4,95, tornin sisäsäde 5,5), pinoja ja toinen rivi edessä.
const TYNNYRIT = [
  [244, 0.38, 0.95], [255, 0.34, 0.85], [266, 0.4, 1.0], [277, 0.36, 0.9], [288, 0.35, 0.9],
].map(([a, sade, korkeus]) => ({ resepti: 'tynnyri', paikka: pol(a, 4.95, Y), suunta: a * 3, sade, korkeus, segmentit: 16 }));
const TYNNYRIT_PINO = [
  { resepti: 'tynnyri', paikka: pol(255, 4.95, Y + 0.85), suunta: 20, sade: 0.3, korkeus: 0.7, segmentit: 14 },
  { resepti: 'tynnyri', paikka: pol(266, 4.95, Y + 1.0), suunta: 50, sade: 0.31, korkeus: 0.72, segmentit: 14 },
  { resepti: 'tynnyri', paikka: pol(248, 3.95, Y), suunta: 70, sade: 0.33, korkeus: 0.8, segmentit: 14 },
  { resepti: 'tynnyri', paikka: pol(281, 3.95, Y), suunta: 130, sade: 0.34, korkeus: 0.85, segmentit: 14 },
  { resepti: 'tynnyri', paikka: pol(238, 4.9, Y), suunta: 10, sade: 0.36, korkeus: 0.9, segmentit: 14 },
];

// Viljasäkit itäseinällä: alarivi, toinen ja kolmas kerros pyramidina + makaavia edessä.
const SAKIT = [
  ...[44, 54, 64, 74, 84].map((a, i) => ({ resepti: 'sakki', paikka: pol(a, 4.9, Y), suunta: i * 40, sade: 0.3, korkeus: 0.6, siemen: 40 + i })),
  ...[49, 59, 69, 79].map((a, i) => ({ resepti: 'sakki', paikka: pol(a, 4.9, Y + 0.55), suunta: i * 70, sade: 0.28, korkeus: 0.55, siemen: 50 + i })),
  ...[59, 69].map((a, i) => ({ resepti: 'sakki', paikka: pol(a, 4.9, Y + 1.05), suunta: i * 90, sade: 0.26, korkeus: 0.5, siemen: 60 + i })),
  { resepti: 'sakki', paikka: pol(52, 4.0, Y), suunta: 20, sade: 0.3, korkeus: 0.6, siemen: 71 },
  { resepti: 'sakki', paikka: pol(61, 4.05, Y), suunta: 80, sade: 0.29, korkeus: 0.55, siemen: 72 },
  { resepti: 'sakki', paikka: pol(104, 4.6, Y), suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 73 },
  { resepti: 'sakki', paikka: pol(111, 4.35, Y), suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 74 },
];

// Hyllyt pohjoisseinällä (leveys 2,2, r 5,08) ruukkuineen, suolalaatikkoineen ja suolakaloineen. Hyllytasojen
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
    [-0.8, 0, 'ruukku', R(0.12, 0.2)], [-0.4, 0, 'ruukku', R(0.1, 0.18)], [0.05, 0, 'suolalaatikko'], [0.5, 0, 'suolalaatikko', {}, 0, 15],
    [0.85, 0, 'ruukku', R(0.11, 0.19)],
    [-0.8, 1, 'ruukku', R(0.11, 0.19)], [-0.4, 1, 'ruukku', R(0.13, 0.21)], [0.0, 1, 'ruukku', R(0.1, 0.17)],
    [0.45, 1, 'vati', { sade: 0.14 }], [0.85, 1, 'pullo', { sade: 0.05, korkeus: 0.19 }],
    [-0.75, 2, 'pullo', { sade: 0.05, korkeus: 0.18 }], [-0.3, 2, 'ruukku', R(0.1, 0.17)],
    [0.15, 2, 'pullo', { sade: 0.055, korkeus: 0.2 }], [0.6, 2, 'ruukku', R(0.11, 0.18)],
  ]),
  ...hyllyRivi(20, [
    [-0.75, 0, 'ruukku', R(0.13, 0.22)], [-0.3, 0, 'ruukku', R(0.12, 0.2)], [0.25, 0, 'vesisanko', R(0.13, 0.2)],
    [0.75, 0, 'suolalaatikko'],
    [-0.65, 1, 'kala', { pituus: 0.32 }, 0, 90], [-0.2, 1, 'kala', { pituus: 0.3 }, 0.05, 80], [0.25, 1, 'suolalaatikko'],
    [0.7, 1, 'ruukku', R(0.1, 0.18)],
    [-0.75, 2, 'pullo', { sade: 0.05, korkeus: 0.17 }], [-0.4, 2, 'pullo', { sade: 0.05, korkeus: 0.18 }],
    [0.0, 2, 'ruukku', R(0.11, 0.19)], [0.45, 2, 'ruukku', R(0.1, 0.17)],
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
  // Toinen arkku vasemmassa etukulmassa (sektorin reunalla) ja suolalaatikko sen vieressä.
  { resepti: 'arkku', paikka: pol(226, 4.5, Y), suunta: 226 + 180 - 20 },
  { resepti: 'suolalaatikko', paikka: pol(232, 3.9, Y), suunta: 30, leveys: 0.5, syvyys: 0.34, korkeus: 0.3 },
  { resepti: 'koysikieppi', paikka: pol(112, 3.5, Y), suunta: 0 },
];

// Tynnyrintekijän työpaikka: avoin saavi (auki oleva tynnyri), tynnyrin kansi lattialla, kaaria ja kauha.
const TYOPAIKKA = [
  { resepti: 'saavi', paikka: pol(303, 3.0, Y), suunta: 0, sade: 0.42, korkeus: 0.55 },
  {
    resepti: 'kiekko', paikka: pol(292, 3.55, Y + 0.05), suunta: 0, sade: 0.4, paksuus: 0.05, segmentit: 16,
    pinnat: { yla: 'puu', ala: 'puu', sivu: 'puu' },
  },
  { resepti: 'puukasa', paikka: pol(262, 3.3, Y), suunta: 35, pituus: 0.55, halkoja: 7, siemen: 611 },
  { resepti: 'kauha', paikka: pol(303, 3.0, Y + 0.55), suunta: 60 },
  { resepti: 'vesisanko', paikka: pol(284, 3.2, Y), suunta: 20, sade: 0.14, korkeus: 0.2 },
  { resepti: 'saavi', paikka: pol(330, 3.4, Y), suunta: 0, sade: 0.34, korkeus: 0.42 },
];

// Katosta roikkuvat reikäleivät holvin alla (holvin alapinta r 4,3:ssa ≈ y 3,66) ja seinäsoihdut + ampumarako.
const RIPUSTETUT = [
  { resepti: 'orsileivat', paikka: pol(290, 4.3, 3.55), suunta: 290, pituus: 1.4, leipia: 5, siemen: 701 },
  { resepti: 'orsileivat', paikka: pol(40, 4.3, 3.55), suunta: 40, pituus: 1.3, leipia: 4, siemen: 702 },
  { resepti: 'orsileivat', paikka: pol(350, 4.4, 3.55), suunta: 350, pituus: 1.2, leipia: 4, siemen: 703 },
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
  naapurit: ['massa', 'laituri', 'kierreportaat', 'keskushalli'],
  // Vaaka: kohde siirretty oikealle (taulu peittää oikean 40 %), jotta huone jää näkyvälle 60 %:lle.
  kamera: { kohde: [-27.0, 1.3, -20.4], atsimuutti: 172, korkeus: 17, etaisyys: 15.5, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-29.0, -1.2, -17.2], atsimuutti: 160, korkeus: 19, etaisyys: 28, fov: 38, aukko: 0.8 },
  kierto: { atsimuutti: [-40, 40], korkeus: [10, 40], etaisyys: [0.8, 1.3] },
  pulu: { laskeutuminen: lok(P_ARKKU, 298 + 180, 0.0, Y + 0.6, 0), taulupuoli: 'oikea' },
  taulu: TAULU,
  valot: [
    // Päävalo: soihtu pohjoisseinällä, lämmin ja lepattava; tumma perusvalo tekee varastosta hämärän.
    {
      paikka: pol(0, 3.6, 2.6), sade: 9, voima: 2.0, vari: '#ff9a4a', lepatus: 0.3,
    },
    // Läntinen lisähehku tynnyrien ja tynnyrintekijän kohdalle (öljylampun ja tynnyrityön valo).
    {
      paikka: pol(283, 3.6, 1.8), sade: 5.5, voima: 1.2, vari: '#ffb070', lepatus: 0.2,
    },
    // Ampumaraon valokeila: kylmä päivänvalo ulkoa pulpetin ja saavin suuntaan (ks. keittiön ikkunakeila).
    {
      tyyppi: 'keila', paikka: pol(312, 7.6, 3.2), kohti: pol(305, 2.2, Y), kulma: 28, sade: 9, voima: 140, vari: '#dfe8ff',
    },
  ],
  palikat: [
    ...RAKENNE, ...TYNNYRIT, ...TYNNYRIT_PINO, ...SAKIT, ...HYLLYT, ...KIRJANPITO, ...TYOPAIKKA, ...RIPUSTETUT, ...SOIHDUT,
  ],
  hahmot: HAHMOT,
  aanet: [],
  tehosteet: [],
  liekit: [
    { liekki: 'soihtu', paikka: soihduLiekki(0, SOIHTU_Y), koko: 1, vaihe: 0 },
    { liekki: 'soihtu', paikka: soihduLiekki(75, SOIHTU_Y + 0.1), koko: 1, vaihe: 0.5 },
    { liekki: 'kynttila', paikka: lok(LAMPPU, 0, 0.021, LAMPPU[1] + 0.102, 0), koko: 1, vaihe: 0.25 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'fatabuurinhoitaja' },
    { tee: 'reaktio', hahmo: 'fatabuurinhoitaja' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'tynnyrintekija' },
    { tee: 'reaktio', hahmo: 'tynnyrintekija' },
    { tee: 'kohta', n: 2 },
  ],
};
