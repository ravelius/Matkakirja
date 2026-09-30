// OLAVINLINNA / kierreportaat: Kellotornin 2.–4. kerros, y 4,5…18: kierreportaat seinän vierellä, avoin kuilu (tulkinta).
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md). Taulun faktat: Sisältökirjuri 29.9.
// (docs/raportit/sisaltokirjuri-olavinlinna-era3-20260929.md); tila 'luonnos' kunnes äänet ja tarkistus valmiit.
//
// Koordinaatit: Kellotorni [−30, 0, −20], sisäsäde 5,5, auki-sektori 95…235 (etelä-kaakko kameraa kohti).
// Kompassikulma a (astetta) ja säde r → maailma x = −30 + r·sin a, z = −20 − r·cos a (180 = etelä, +z).
// Kuilu on avoin: kapeat portaat (r 3,6…5,45) kiertävät seinän vierellä 1,5 kierrosta myötäpäivään (kompassikulma
// kasvaa noustessa; oikeakätinen puolustaja pitää miekkakäden vapaana), kuilu (r < 3,6) jää auki kattoon asti.

const KX = -30, KZ = -20;
const RAD = Math.PI / 180;
/** Maailmapiste kompassikulmassa a, säteellä r, korkeudella y. */
const P = (r, a, y) => [+(KX + r * Math.sin(a * RAD)).toFixed(3), y, +(KZ - r * Math.cos(a * RAD)).toFixed(3)];

// Portaiden mitat: 48 askelta, 11,25° / askel (1,5 kierrosta), nousu y 4,9 → 18 (korkeus 13,1), alkukulma 176
// (alin askel etelässä, kameran puolella; ylin askel pohjoisessa, y 18 = ylemmän lattian alapinta).
const ASKELIA = 48, ASKEL_KULMA = 11.25, ALKU = 176, Y_LATTIA = 4.9, NOUSU = 13.1;
const ASKEL_KORKEUS = NOUSU / ASKELIA, PAKSUUS = 0.8, SISA = 3.6, ULKO = 5.45;
const askelYla = (i) => Y_LATTIA + (i + 1) * ASKEL_KORKEUS; // askelman i yläpinta
const askelKulma = (i) => ALKU + (i + 0.5) * ASKEL_KULMA; // askelman i keskikulma

// Portaat sahalaitaisena kivilaattana: jokainen askel on oma 0,8 m paksu kiilapalikka (alapinta seuraa askelta,
// joten kuilun puolelta ja alta näkyy portaan alapinta eikä umpinainen pylväs). Alimmat askeleet rajataan y 4,5:een.
function portaat() {
  const k = [];
  for (let i = 0; i < ASKELIA; i++) {
    const yla = askelYla(i), ala = Math.max(yla - PAKSUUS, 4.5);
    k.push({
      resepti: 'kierreportaat', paikka: [KX, +ala.toFixed(3), KZ], suunta: 0, sadeSisa: SISA, sadeUlko: ULKO,
      korkeus: +(yla - ala).toFixed(3), askelmat: 1, kierrokset: ASKEL_KULMA / 360, alkukulma: ALKU + i * ASKEL_KULMA,
    });
  }
  return k;
}

// Välitasanne: kaarilaatta portaan sisäreunassa (r 2,0…3,6), 40° levyinen, yläpinta = askelman i yläpinta.
function tasanne(i) {
  const yla = askelYla(i);
  return {
    resepti: 'kierreportaat', paikka: [KX, +(yla - 0.5).toFixed(3), KZ], suunta: 0, sadeSisa: 2.0, sadeUlko: SISA,
    korkeus: 0.5, askelmat: 1, kierrokset: 40 / 360, alkukulma: askelKulma(i) - 20,
  };
}
const TASANNE_1 = 14, TASANNE_2 = 31; // askelmat, joiden yläpinta on y 8,99 ja 13,63
const Y1 = askelYla(TASANNE_1), Y2 = askelYla(TASANNE_2);
const A1 = askelKulma(TASANNE_1), A2 = askelKulma(TASANNE_2) - 360; // 339,1° (pohjoinen) ja 170,4° (etelä)

// Seinäsoihdun liekki (soihtu-billboard): soihtu on kalteva 15°, liekin tyvi ≈ 0,47 m origon yläpuolella ja
// 0,26 m seinästä sisään (reseptit-kalusteet2.mjs: seinasoihtu). r = seinäpinta 5,5.
const soihtuLiekki = (a, y) => P(5.5 - 0.262, a, +(y + 0.471).toFixed(3));
const soihtu = (a, y) => ({ resepti: 'seinasoihtu', paikka: P(5.5, a, y), suunta: a + 180 });
const seinalle = (resepti, a, y, muut = {}) => ({ resepti, paikka: P(5.5, a, y), suunta: a + 180, ...muut });

const TAULU = {
  otsikko: 'Tornin kierreportaat (tulkinta)',
  // Sisältökirjurin tarkistus 30.9. (docs/raportit/sisaltokirjuri-olavinlinna-era5-tarkistus-20260930.md). P1–P3; oikeakätisyys-myytti poistettu
  tila: 'tarkistettu',
  kohdat: [
    // Sisältökirjuri 30.9. (5684d5d81): "päätorni" epävarma, "vain yksi mies" ilman lähdettä → korjattu.
    { aani: 'kierreportaat-kohta-0', teksti: 'Tornissa oli viisi kerrosta: kolmas oli ylin asuttu, neljännessä kulki avoin puolustuskäytävä.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { aani: 'kierreportaat-kohta-1', teksti: 'Kierreportaat olivat kapeat ja ahtaat – hyökkääjälle hankala paikka.', lahde: 'Savon historia: Olavinlinnan suojassa' },
    { aani: 'kierreportaat-kohta-2', teksti: 'Kehämuurit ja esilinnan muurit kohosivat 13 metrin korkeuteen.', lahde: 'Savon historia: Olavinlinnan suojassa' },
  ],
};

// Kirjurin kävelyreitti: portaiden pinnan keskisäteen pisteet (kierrePiste, 10 pistettä s = 0…1) ylös ja samat
// takaisin alas (reitti sulkeutuu alkupisteeseen kuten keittiön vesipojalla). Laskettu reseptit-linna.mjs:n
// kierrePiste-kaavalla (sadeSisa 3,6, sadeUlko 5,45, 1,5 kierrosta, alkukulma 176) + palikan sijoitus maailmaan.
const KIRJURI_YLOS = [
  [-30.13, 5.17, -15.48], [-33.93, 6.6, -17.76], [-33.95, 8.02, -22.2], [-30.17, 9.45, -24.52],
  [-26.22, 10.87, -22.49], [-25.91, 12.3, -18.06], [-29.54, 13.72, -15.5], [-33.61, 15.15, -17.27],
  [-34.21, 16.57, -21.67], [-30.76, 18, -24.46],
];
const KIRJURI_REITTI = [...KIRJURI_YLOS, ...KIRJURI_YLOS.slice(1, -1).reverse(), KIRJURI_YLOS[0]];

const HAHMOT = [
  {
    id: 'kirjuri', henkilo: 'kirjuri-1500', paikka: KIRJURI_YLOS[0], suunta: 268, peilattu: false,
    // Elävä linna (erä 3): kirjuri kantaa lyhtyä portaissa, joten valo vilkkuu ampumaraoissa ylös ja alas (käsikirjoitus kohta 2).
    silmukka: 'kavely', heraa: 2, lyhty: true,
    reitti: { pisteet: KIRJURI_REITTI, nopeus: 1.3, tauko: 2.5 },
    repliikit: [
      { id: 'kirjuri-1', aani: 'kierreportaat-kirjuri-1', teksti: 'Jyrkät nämä portaat: joka askel on kuin pieni kallio, ja niitä riittää.' },
      { id: 'kirjuri-2', aani: 'kierreportaat-kirjuri-2', teksti: 'Viestit voudille eivät odota, vaikka jalat jo huutaisivat armoa.' },
    ],
    reaktio: { id: 'pulu-kirjuri-r1', aani: 'kierreportaat-pulu-kirjuri-r1', teksti: 'Ei hissiä, ei rullaportaita. Siivet ovat kyllä erinomainen keksintö.' },
  },
  {
    id: 'renki', henkilo: 'renki-1500', paikka: P(2.7, 160, Y2), suunta: 110, peilattu: false,
    silmukka: 'idle', heraa: 1, reitti: null,
    repliikit: [
      { id: 'renki-1', aani: 'kierreportaat-renki-1', teksti: 'Raoista käy kylmä veto, eikä tämä lyhty saa sitä kuriin.' },
      { id: 'renki-2', aani: 'kierreportaat-renki-2', teksti: 'Näissä portaissa ei ohiteta ketään. Vastaantulija odottaa tasanteella, halusi tai ei.' },
    ],
    reaktio: { id: 'pulu-renki-r1', aani: 'kierreportaat-pulu-renki-r1', teksti: 'Veto raoista? Höyhenpuku pitää lämpimänä – lyhdyn liekkiä vain säälin.' },
  },
];

const LAMMIN = '#ff9a4a';

export const TILA = {
  id: 'kierreportaat',
  nimi: 'Kierreportaat',
  // Infotaulu (omistajan hyväksymä rakenne 30.9.): nimi + rivi siitä, mikä huone oli (Päätoimittaja, faktat
  // Sisältökirjuri 30.9. 5684d5d81); muoto kuten taulu.kohdat.
  infotaulu: { nimi: 'Kierreportaat', rivit: [{ teksti: 'Kapeat portaat yhdistävät tornin viisi kerrosta.', lahde: 'Savon historia: Olavinlinnan suojassa' }] },
  // Kuunnelma (Päätoimittaja 30.9., v2 faktantarkistettu, docs/raportit/olavinlinna-kuunnelmat-20260930.md d22082f88):
  // kohtaus = rivijono; puhuja = tämän tilan hahmon id tai 'pulu' (huom = esim. oven takaa, ei näkyvissä).
  // id = tuleva ääni-id; aani null, kunnes omistaja valitsee äänet (ei generointia ennen lupaa).
  kuunnelma: [
    { id: 'kierreportaat-k1', puhuja: 'kirjuri', nimi: 'Kirjuri', aani: 'kierreportaat-k1',
      teksti: 'Kolmas kerros, neljäs kerros… Ilman voudin sinettiä ei yksikään kirje lähde linnasta, ja minä juoksen näitä portaita edestakaisin.' },
    { id: 'kierreportaat-k2', puhuja: 'renki', nimi: 'Renki', aani: 'kierreportaat-k2',
      teksti: 'Varovasti, herra kirjuri, näissä portaissa ei ohiteta ketään. Kapeaa ja ahdasta – vihollisellekin, kiitos siitä.' },
    { id: 'kierreportaat-k3', puhuja: 'kirjuri', nimi: 'Kirjuri', aani: 'kierreportaat-k3',
      teksti: 'Viisi kerrosta, ja ylin asuttu on kolmas. Neljännellä vain tuuli ja vartijat. Minä en ole kumpaakaan.' },
    { id: 'kierreportaat-k4', puhuja: 'pulu', nimi: 'Pulu', aani: 'kierreportaat-k4',
      teksti: 'Portaat ylös, portaat alas, ja sinetti yhä hukassa. Siivet olisivat tässä linnassa kova sana.' },
  ],
  kohdistettava: true,
  // Uusi tapa (dioraama-rajapinnat-blender-20260929.md kohta 2): pohjoismuurin muunnos Kellotornin (−30, −20) → kuoren
  // Kellotorni (−44,4; −4,6) ja lähteen +x → Kirkkotornia kohti (suunta 341), iso linnanpiha y 2,9 (säteet 29.9. klo 21).
  sijoitus: { ankkuri: [-30, 0, -20], paikka: [-44.4, 2.9, -4.6], suunta: 341 },
  rajat: { min: [-35.5, 4.5, -25.5], max: [-24.5, 18, -14.5] },
  leikkaus: { laajennus: 1.0, kameraan: true, min: [-38.5, 4.5, -28.5], max: [-21.5, 18, -11.5] },
  naapurit: ['massa', 'fatabuuri', 'muurinharja'],
  // Tornin pystysuora leikkaus: korkea kapea tila; kamera hieman ylempää kuin kuilun pohja, jotta portaiden
  // etukaari, välitasanteet ja kuilun pohja näkyvät. Pystynäytössä taulu peittää alimman 45 %.
  kamera: { kohde: [-30, 11.2, -20], atsimuutti: 160, korkeus: 16, etaisyys: 34, fov: 38, aukko: 0.8 },
  kameraPysty: { kohde: [-30, 3.6, -20], atsimuutti: 160, korkeus: 18, etaisyys: 68, fov: 40, aukko: 0.8 },
  kierto: { atsimuutti: [-40, 40], korkeus: [8, 50], etaisyys: [0.7, 1.4] },
  // Pulu laskeutuu 4. kerroksen tasanteen tynnyrin kanteen (P(3,1; 183°), tynnyri 0,9 m).
  pulu: { aani: 'kierreportaat-pulu', laskeutuminen: P(3.1, 183, +(Y2 + 0.9).toFixed(2)), taulupuoli: 'oikea',
    // Pulun kertomus (napautus reunakuvasta), tekstit v2 Päätoimittajalta (Sisältökirjuri 30.9.); ääni 1.10.2026 (omistajan lupa 30.9. klo 23.4x).
    teksti: 'Tornissa oli viisi kerrosta: kolmas oli ylin asuttu kerros, ja neljännessä kulki puolustuskäytävä. Kierreportaat olivat kapeat ja ahtaat – hyökkääjälle hankala paikka. Kehä- ja esilinnan muurit kohosivat jopa 13 metrin korkeuteen.' },
  taulu: TAULU,
  // Elävä linna (29.9.): Kellotornin kylki portaiden korkeudella kameran puolella (lyhty ampumaraoissa).
  elava: { kohde: [-27.4, 11, -12.8], sade: 6 },
  valot: [
    // Päälähde: soihtu pohjoisen välitasanteen yläpuolella (lämmin, lepattava, kuilun poikki näkyvä).
    { paikka: P(4.8, 335, 11.6), sade: 9, voima: 1.7, vari: LAMMIN, lepatus: 0.3 },
    // Länsiseinän soihtu valaisee alakerran lattian ja ensimmäisen kierroksen.
    { paikka: P(4.9, 270, 9.9), sade: 7, voima: 0.8, vari: LAMMIN, lepatus: 0.25 },
    // Pöydän kynttilä valaisee kuilun pohjan.
    { paikka: P(2.6, 320, 5.9), sade: 6, voima: 1.0, vari: LAMMIN, lepatus: 0.25 },
    // Rengin lyhty etelän tasanteella.
    { paikka: [P(2.7, 160, Y2)[0], +(Y2 + 1.3).toFixed(2), P(2.7, 160, Y2)[2]], sade: 5, voima: 0.6, vari: '#ffb35c', lepatus: 0.2 },
    // Ampumaraoista keilat (päivänvalo, ei lämpöä). Voima viritetty kuten keittiössä (käänteisneliövaimennus).
    {
      tyyppi: 'keila', paikka: P(5.35, 285, 12.55), kohti: P(3.0, 335, Y1), kulma: 24, sade: 9, voima: 150, vari: '#ffe2b0',
    },
    {
      tyyppi: 'keila', paikka: P(5.35, 60, 15.55), kohti: P(3.5, 105, 11.6), kulma: 24, sade: 9, voima: 150, vari: '#ffe2b0',
    },
  ],
  palikat: [
    // 2. kerroksen lattia (y 4,5…4,9), koko ympyrä ilman auki-sektoria.
    { resepti: 'kiekko', paikka: [KX, Y_LATTIA, KZ], suunta: 0, sade: 7.1, paksuus: 0.4, segmentit: 32 },
    // Tornin seinä (uusi tapa 29.9.: kuoressa ei ole sisäpintaa).
    { resepti: 'torni', paikka: [KX, 4.5, KZ], suunta: 0, sade: 7.1, paksuus: 1.6, korkeus: 13.5, segmentit: 32, auki: { alku: 95, loppu: 235 } },
    ...portaat(),
    tasanne(TASANNE_1),
    tasanne(TASANNE_2),

    // Sisäpuolen ampumaraot (vastaavat massan ulkopuolisia rakoja) ja soihdut portaiden varrella.
    seinalle('rako', 250, 7.05, { leveys: 0.22, korkeus: 1.1 }),
    seinalle('rako', 285, 12, { leveys: 0.22, korkeus: 1.1 }),
    seinalle('rako', 60, 15, { leveys: 0.22, korkeus: 1.1 }),
    soihtu(270, 9.4), soihtu(335, 10.9), soihtu(60, 13),

    // Seinälle: kilvet, jalkajousi (puolustuksen vihje).
    seinalle('kilpi', 300, 10.6, { sade: 0.28 }),
    seinalle('kilpi', 322, 11.3, { sade: 0.26 }),
    seinalle('kilpi', 30, 12.6, { sade: 0.28 }),
    seinalle('jalkajousi', 12, 14.4, { kpl: 2 }),

    // 2. kerroksen lattia: varasto kuilun pohjoisosassa (portaiden alla), kirjuripulpetti, pöytä kuilun pohjalla.
    { resepti: 'tynnyri', paikka: P(4.8, 292, Y_LATTIA), suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'tynnyri', paikka: P(4.85, 306, Y_LATTIA), suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'tynnyri', paikka: P(4.15, 298, Y_LATTIA), suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'sakki', paikka: P(4.9, 320, Y_LATTIA), suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 31 },
    { resepti: 'sakki', paikka: P(4.4, 327, Y_LATTIA), suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 32 },
    { resepti: 'sakki', paikka: P(4.95, 336, Y_LATTIA), suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 33 },
    { resepti: 'arkku', paikka: P(4.9, 352, Y_LATTIA), suunta: 352 + 180 },
    { resepti: 'keihasteline', paikka: P(5.1, 12, Y_LATTIA), suunta: 12 + 180 },
    { resepti: 'hakapyssy', paikka: P(4.5, 32, Y_LATTIA), suunta: 32 + 180 },
    { resepti: 'saavi', paikka: P(4.7, 46, Y_LATTIA), suunta: 0, sade: 0.4, korkeus: 0.45 },
    { resepti: 'vesisanko', paikka: P(4.25, 52, Y_LATTIA), suunta: 40, sade: 0.15, korkeus: 0.22 },
    { resepti: 'puukasa', paikka: P(4.9, 63, Y_LATTIA), suunta: 63 + 90, pituus: 0.5, halkoja: 8, siemen: 601 },
    { resepti: 'tynnyri', paikka: P(4.8, 78, Y_LATTIA), suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'sakki', paikka: P(4.9, 88, Y_LATTIA), suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 34 },
    { resepti: 'sakki', paikka: P(4.85, 256, Y_LATTIA), suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 35 },
    { resepti: 'koysikieppi', paikka: P(4.6, 266, Y_LATTIA), suunta: 20, sade: 0.24 },
    { resepti: 'pulpetti', paikka: P(4.95, 243, Y_LATTIA), suunta: 243 + 180 },
    { resepti: 'poyta', paikka: P(2.6, 320, Y_LATTIA), suunta: 320, leveys: 1.8, syvyys: 0.8, korkeus: 0.8 },
    { resepti: 'penkki', paikka: P(3.45, 320, Y_LATTIA), suunta: 320, leveys: 1.5, syvyys: 0.3, korkeus: 0.45 },
    { resepti: 'kynttilanjalka', paikka: P(2.55, 316, Y_LATTIA + 0.8), suunta: 0, korkeus: 0.17 },
    { resepti: 'vati', paikka: P(2.6, 324, Y_LATTIA + 0.8), suunta: 0, sade: 0.15 },
    { resepti: 'pullo', paikka: P(2.35, 321, Y_LATTIA + 0.8), suunta: 0, sade: 0.05, korkeus: 0.18 },
    { resepti: 'vesisanko', paikka: P(3.0, 215, Y_LATTIA), suunta: -50, sade: 0.15, korkeus: 0.22 },
    { resepti: 'luuta', paikka: P(3.4, 236, Y_LATTIA), suunta: 100, korkeus: 0.8 },

    // Pohjoinen välitasanne (3. kerros, y ≈ 9): tynnyri, säkki, ruukku ja öljylamppu.
    { resepti: 'tynnyri', paikka: P(3.05, 350, Y1), suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'sakki', paikka: P(2.55, 332, Y1), suunta: 0, sade: 0.28, korkeus: 0.55, siemen: 36 },
    { resepti: 'ruukku', paikka: P(3.3, 334, Y1), suunta: 0, sade: 0.11, korkeus: 0.2 },
    { resepti: 'oljylamppu', paikka: P(2.5, 343, Y1), suunta: 0, sade: 0.06, korkeus: 0.09 },

    // Eteläinen välitasanne (4. kerros, y ≈ 13,6): tynnyri (Pulun kansi) ja nuolitynnyri = vihje puolustuskäytävästä.
    { resepti: 'tynnyri', paikka: P(3.1, 183, Y2), suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'nuolitynnyri', paikka: P(2.5, 174, Y2), suunta: 0, nuolia: 14, siemen: 21 },
    { resepti: 'sakki', paikka: P(3.3, 156, Y2), suunta: 0, sade: 0.26, korkeus: 0.5, siemen: 37 },
  ],
  hahmot: HAHMOT,
  aanet: [{ aani: 'linna-tuuli' }],
  tehosteet: [{ aanet: ['askel-kivi'], valit_s: [9, 18] }],
  liekit: [
    { liekki: 'soihtu', paikka: soihtuLiekki(270, 9.4), koko: 1, vaihe: 0 },
    { liekki: 'soihtu', paikka: soihtuLiekki(335, 10.9), koko: 1, vaihe: 0.35 },
    { liekki: 'soihtu', paikka: soihtuLiekki(60, 13), koko: 1, vaihe: 0.7 },
    { liekki: 'kynttila', paikka: P(2.55, 316, Y_LATTIA + 0.97), koko: 1, vaihe: 0.2 },
  ],
  kasikirjoitus: [
    { tee: 'pulu-lenna' },
    { tee: 'taulu' },
    { tee: 'kohta', n: 0 },
    { tee: 'repliikki', hahmo: 'kirjuri' },
    { tee: 'reaktio', hahmo: 'kirjuri' },
    { tee: 'kohta', n: 1 },
    { tee: 'repliikki', hahmo: 'renki' },
    { tee: 'reaktio', hahmo: 'renki' },
    { tee: 'kohta', n: 2 },
  ],
};
