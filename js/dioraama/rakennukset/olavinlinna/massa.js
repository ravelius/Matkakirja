// OLAVINLINNA / massa: koko linnan muoto yleisnäkymään (kohdistettava: false).
// Erä 3 (docs/raportit/dioraama-rajapinnat-era3-20260929.md kohta 0): linna auki. Sisältökirjurin asettelu 29.9.:
// Kellotorni luoteessa ja Kirkkotorni sen itäpuolella pohjoismuurilla, Keskushalli (väentupa) tornien välissä,
// Pyhän Eerikin torni (todellisuudessa etelässä, dioraama tiivistää itään), portti ja laituri lounaassa (tulkinta).
//
// Massa sisältää perustan (vesi, kalliosaari), tornien kuoret auki-sektoreineen, muurit sakaroineen, tilojen
// ulkopuoliset kerroslattiat, Keskushallin yläkerran (voudin asunto), itäsiiven (Kuninkaansali) ja portaat.
// Eteläsivu (kameraa kohti) on aukileikattu: eteläiset muurinpätkät ovat matalia ja niiden yläreuna on
// leikkaus-roolissa; vartiotuvan ja keittiön kohdalla eteläseinässä on aukko.
//
// Tornien auki-sektorit (kompassiasteet, kamera katsoo etelä-kaakosta): Kellotorni 95…235, Kirkkotorni 100…230.
// Muurit päättyvät tornien kuoreen auki-sektorin ulkopuolella, jottei muuri näy leikatun tornin sisällä.

// Tornit (sitovat mitat speksin kohdassa 0; tilat viittaavat näihin).
const KELLOTORNI = { paikka: [-30, 0, -20], sade: 7.5, paksuus: 2, korkeus: 28, auki: { alku: 95, loppu: 235 } };
const KIRKKOTORNI = { paikka: [0, 0, -20], sade: 7, paksuus: 2, korkeus: 32, auki: { alku: 100, loppu: 230 } };
const EERIKINTORNI = { paikka: [32, 0, -4], sade: 7.5, paksuus: 2, korkeus: 28 };

// Rako tornin ulkopintaan kompassikulmassa a (w+ osoittaa ulos, reseptit.mjs:n sijoita: f = (sin s, 0, −cos s)).
function rako(torni, a, y, korkeus = 1.1) {
  const r = torni.sade + 0.01, s = (a * Math.PI) / 180;
  const [cx, , cz] = torni.paikka;
  return { resepti: 'rako', paikka: [cx + r * Math.sin(s), y, cz - r * Math.cos(s)], suunta: a, leveys: 0.22, korkeus };
}

// Tornin kerroslattia (kiekko, sama auki-sektori kuin tornilla), y = lattian yläpinta.
function kerros(torni, y, paksuus = 0.4) {
  const [cx, , cz] = torni.paikka;
  return {
    resepti: 'kiekko', paikka: [cx, y, cz], suunta: 0, sade: torni.sade - torni.paksuus + 0.05, paksuus,
    segmentit: 32, auki: torni.auki,
  };
}

export const TILA = {
  id: 'massa',
  nimi: 'Olavinlinna (yleisnäkymä)',
  kohdistettava: false,
  rajat: { min: [-58, -10, -48], max: [58, 42, 36] },
  naapurit: ['laituri', 'fatabuuri', 'kierreportaat', 'muurinharja', 'kappeli', 'keskushalli', 'keittio'],
  hahmot: [],
  // Massan äänisilmukat: tuuli linnan muureilla + järven laineet rannassa (era2 kohta 2 "AANET").
  aanet: [{ aani: 'linna-tuuli' }, { aani: 'jarvi-laineet' }],
  // Satunnaiset kertaäänet (era2 kohta 2 "AANET"): lokit ja kaukaiset kellot, harvakseltaan.
  tehosteet: [
    { aanet: ['lokit'], valit_s: [15, 30] },
    { aanet: ['kellot-kaukaa'], valit_s: [40, 80] },
  ],
  kasikirjoitus: [],
  palikat: [
    // --- Perusta ---
    { resepti: 'vesi', paikka: [0, -7, 0], suunta: 0, leveys: 400, syvyys: 400 },
    {
      resepti: 'kallio', paikka: [0, -0.5, -6], suunta: 0,
      leveys: 110, syvyys: 80, korkeus: 9, siemen: 1873, kohina: 0.4,
    },

    // --- Kellotorni (luode): fatabuuri (y 0…4,5) ja kierreportaat (y 4,5…18) ovat omia tilojaan ---
    {
      resepti: 'torni', paikka: KELLOTORNI.paikka, suunta: 0, sade: KELLOTORNI.sade, korkeus: KELLOTORNI.korkeus,
      paksuus: KELLOTORNI.paksuus, segmentit: 32, auki: KELLOTORNI.auki, vyo: { y: 25, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [-30, 28, -20], suunta: 0, sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },
    kerros(KELLOTORNI, 18.4),
    kerros(KELLOTORNI, 23.2, 0.3),
    { resepti: 'tynnyri', paikka: [-32.5, 18.4, -23], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'sakki', paikka: [-27.8, 18.4, -24.2], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 21 },
    rako(KELLOTORNI, 250, 7), rako(KELLOTORNI, 285, 12), rako(KELLOTORNI, 320, 20), rako(KELLOTORNI, 60, 15),

    // --- Kirkkotorni (pohjoinen): kappeli (y 9…13,5) on oma tilansa; muut kerrokset massassa ---
    {
      resepti: 'torni', paikka: KIRKKOTORNI.paikka, suunta: 0, sade: KIRKKOTORNI.sade, korkeus: KIRKKOTORNI.korkeus,
      paksuus: KIRKKOTORNI.paksuus, segmentit: 32, auki: KIRKKOTORNI.auki, vyo: { y: 28.5, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [0, 32, -20], suunta: 0, sade: 7, korkeus: 8, ylitys: 0.6, segmentit: 32 },
    { resepti: 'lippu', paikka: [0, 39.4, -20], suunta: 90, korkeus: 3, leveys: 1.2, lippu: 0.8 },
    { resepti: 'kivilattia', paikka: [0, 0, -20], suunta: 0, leveys: 9, syvyys: 9, paksuus: 0.3, siemen: 1476 },
    kerros(KIRKKOTORNI, 4.5),
    kerros(KIRKKOTORNI, 14.0, 0.5),
    kerros(KIRKKOTORNI, 18.5),
    kerros(KIRKKOTORNI, 23.5, 0.3),
    // Pohjakerros: ovi tupaan (länsi), muutama tynnyri; 2. kerros: arkkuja; 4. kerros: puolustuskerroksen tarvikkeet.
    { resepti: 'tynnyri', paikka: [-2.6, 0, -23.2], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'tynnyri', paikka: [-1.8, 0, -24.0], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'arkku', paikka: [2.4, 4.5, -23.6], suunta: 200 },
    { resepti: 'nuolitynnyri', paikka: [-2.8, 14.0, -23.0], suunta: 0 },
    { resepti: 'hakapyssy', paikka: [2.2, 14.0, -24.0], suunta: 20 },
    rako(KIRKKOTORNI, 60, 6), rako(KIRKKOTORNI, 80, 16), rako(KIRKKOTORNI, 250, 11), rako(KIRKKOTORNI, 300, 20),

    // --- Pyhän Eerikin torni (itä, umpinainen) ---
    {
      resepti: 'torni', paikka: EERIKINTORNI.paikka, suunta: 0, sade: EERIKINTORNI.sade, korkeus: EERIKINTORNI.korkeus,
      paksuus: EERIKINTORNI.paksuus, segmentit: 32, auki: null, vyo: { y: 25, korkeus: 1.5 },
    },
    { resepti: 'kartiokatto', paikka: [32, 28, -4], suunta: 0, sade: 7.5, korkeus: 9, ylitys: 0.6, segmentit: 32 },
    rako(EERIKINTORNI, 150, 6), rako(EERIKINTORNI, 180, 13), rako(EERIKINTORNI, 210, 20), rako(EERIKINTORNI, 230, 9),
    rako(EERIKINTORNI, 165, 22),

    // --- Muurit (paksuus 3). Pohjoismuuri 13 m (Savon historia: kehämuurit 13 m). ---
    // Tornien välinen osa x −23…−6,5: muurinharja (oma tila) on sen päällä y 13, Keskushalli sen etelälaidalla.
    {
      resepti: 'seina', paikka: [-14.75, 0, -20], suunta: 0, pituus: 16.5, korkeus: 13, paksuus: 3,
      leikkaus: { vasen: true, oikea: true, yla: false },
    },
    // Itäosa x 6,5…33,5 koilliskulmaan.
    { resepti: 'seina', paikka: [20, 0, -20], suunta: 0, pituus: 27, korkeus: 13, paksuus: 3 },
    // Länsimuuri x −37 (Kellotornin länsikylki, auki-sektorin ulkopuolella) etelään.
    { resepti: 'seina', paikka: [-37, 0, -1.65], suunta: 90, pituus: 31.3, korkeus: 10, paksuus: 3 },
    // Itämuuri x 32, Eerikin torni välissä.
    { resepti: 'seina', paikka: [32, 0, -15.75], suunta: 90, pituus: 8.5, korkeus: 10, paksuus: 3 },
    { resepti: 'seina', paikka: [32, 0, 8.75], suunta: 90, pituus: 10.5, korkeus: 10, paksuus: 3 },
    // Eteläsivu, aukileikattu (4 m, yläreuna leikkaus): aukot vartiotuvan (x −32…−22) ja keittiön (x 8…20) kohdalla,
    // portti x −19,5 (u = −12,5 keskikohdasta −7).
    {
      resepti: 'seina', paikka: [-34.5, 0, 14], suunta: 0, pituus: 5, korkeus: 4, paksuus: 3,
      leikkaus: { vasen: false, oikea: true, yla: true },
    },
    {
      resepti: 'seina', paikka: [-7, 0, 14], suunta: 0, pituus: 30, korkeus: 4, paksuus: 3,
      aukot: [{ u: -12.5, y: 0, leveys: 3, korkeus: 3.2 }],
      leikkaus: { vasen: true, oikea: true, yla: true },
    },
    {
      resepti: 'seina', paikka: [26.75, 0, 14], suunta: 0, pituus: 13.5, korkeus: 4, paksuus: 3,
      leikkaus: { vasen: true, oikea: false, yla: true },
    },

    // --- Sakarat muurien ulkoreunoilla (muurinharjan tila tekee omansa tornien välissä) ---
    { resepti: 'sakarat', paikka: [20, 13, -21.2], suunta: 0, pituus: 26 },
    { resepti: 'sakarat', paikka: [-38.2, 10, -1.65], suunta: 90, pituus: 30 },
    { resepti: 'sakarat', paikka: [33.2, 10, -15.75], suunta: 90, pituus: 8 },
    { resepti: 'sakarat', paikka: [33.2, 10, 8.75], suunta: 90, pituus: 10 },

    // --- Keskushallin yläkerta (voudin asunto) porrastettuna taaemmas, harjakatto alle muurinharjan ---
    {
      resepti: 'seina', paikka: [-14.75, 5, -14], suunta: 0, pituus: 15.5, korkeus: 4, paksuus: 0.5,
      aukot: [{ u: -4.5, y: 1.2, leveys: 0.8, korkeus: 1.3 }, { u: 0, y: 1.2, leveys: 0.8, korkeus: 1.3 },
        { u: 4.5, y: 1.2, leveys: 0.8, korkeus: 1.3 }],
    },
    { resepti: 'laatta', paikka: [-14.75, 5, -16.25], suunta: 0, leveys: 15.5, syvyys: 4.5, paksuus: 0.4 },
    { resepti: 'harjakatto', paikka: [-14.75, 9, -16.25], suunta: 0, leveys: 15.5, syvyys: 4.5, korkeus: 2.5, ylitys: 0.3 },

    // --- Itäsiipi: Kuninkaansali (ikkunat pienelle linnanpihalle, keittiön lämpö hormeista) ---
    { resepti: 'seina', paikka: [17, 0, -14], suunta: 0, pituus: 14, korkeus: 5, paksuus: 0.5 },
    {
      resepti: 'seina', paikka: [17, 0, -2], suunta: 0, pituus: 14, korkeus: 5, paksuus: 0.5,
      aukot: [{ u: -4, y: 2, leveys: 0.9, korkeus: 1.5 }, { u: 0, y: 2, leveys: 0.9, korkeus: 1.5 },
        { u: 4, y: 2, leveys: 0.9, korkeus: 1.5 }],
    },
    { resepti: 'seina', paikka: [10, 0, -8], suunta: 90, pituus: 12, korkeus: 5, paksuus: 0.5 },
    { resepti: 'harjakatto', paikka: [17, 5, -8], suunta: 0, leveys: 14, syvyys: 12, korkeus: 3, ylitys: 0.4 },

    // --- Portaat ---
    // Keittiön itäovelta pihakannelle.
    { resepti: 'porras', paikka: [21, -4, 9.5], suunta: 0, leveys: 1.5, askelmat: 22, nousu: 0.18, etenema: 0.28 },
    // Laiturilta portille: portaat kalliota ylös (y −6,2 → 0) ja kivetty tasanne portille.
    { resepti: 'porras', paikka: [-19.5, -6.2, 33], suunta: 0, leveys: 2.2, askelmat: 34, nousu: 0.18, etenema: 0.28 },
    { resepti: 'laatta', paikka: [-19.5, 0, 19.5], suunta: 0, leveys: 3.2, syvyys: 8, paksuus: 1.2, pinnat: { yla: 'kivi' } },

    // --- Piha: vähäinen elämä (tynnyrit, halot) ---
    { resepti: 'tynnyri', paikka: [-4, 0, 2], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'tynnyri', paikka: [-3.2, 0, 2.6], suunta: 0, sade: 0.35, korkeus: 0.9, segmentit: 12 },
    { resepti: 'puukasa', paikka: [6.5, 0, 2.5], suunta: 90, pituus: 0.5, halkoja: 8, siemen: 403 },
    { resepti: 'sakki', paikka: [-2.4, 0, 1.8], suunta: 0, sade: 0.3, korkeus: 0.6, siemen: 31 },
  ],
};
