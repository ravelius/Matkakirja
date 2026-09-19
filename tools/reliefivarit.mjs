/*
 * RELIEFIKARTAN VÄRIT YHDESSÄ PAIKASSA.
 *
 * Hypsometrinen maa-asteikko, meren syvyysasteikko, niistä koottu
 * metrin tarkkuuden hakutaulu, varjokalvon kertoimet ja napajään sävy.
 * Ei lataa mitään eikä kirjoita mitään — pelkkiä lukuja ja kaksi
 * puhdasta funktiota.
 *
 * === MIKSI OMA TIEDOSTO (16.9.2026) ================================
 *
 * Asteikot asuivat ennen tools/tee-reliefikartta.mjs:ssä, joka on
 * SKRIPTI eikä moduuli: sen tuominen ajaisi koko renderöinnin. Kun
 * tools/tee-pallotopografia-koko.mjs alkoi tarvita täsmälleen samat
 * värit (omistajan linjaus 16.9.2026: koko pallon reliefi navat
 * mukaan), vaihtoehtoja oli kaksi — kopioida luvut tai nostaa ne
 * omaan tiedostoonsa.
 *
 * Kopio olisi ollut kolmas paikka, jossa maailman värit voivat mennä
 * eri tahtiin (toinen on tools/fokuskartta/piirto.js, ja sen ero on
 * kirjattu sinne). Kaksi kuvaa samasta maailmasta ERI VÄREILLÄ on
 * juuri se virhe, jota ei huomaa katsomalla kumpaakaan yksin.
 *
 * Kommentit ovat siirtyneet tänne sanasta sanaan: ne perustelevat
 * lukuja, ja luvut ovat nyt täällä.
 */

/*
 * Fyysisen kartan perinteinen väriasteikko. Se ei ole makuasia vaan
 * sopimus, jonka jokainen koulukartaston nähnyt osaa lukea ilman
 * selitystä: matala on vihreä, korkea on ruskea, korkein on valkoinen.
 *
 * Väri EI KERRO KASVILLISUUDESTA. Sahara on tällä kartalla vihertävän
 * keltainen, koska se on 300 metrissä, eikä siksi että siellä kasvaisi
 * mitään. Amazonin sademetsä ja Argentiinan pampa ovat samaa vihreää.
 * Tämä on hypsometrinen kartta, ja se lupaa vain korkeuden.
 *
 * Portaiden VÄLI on tarkoituksella epätasainen. Maailman maasta yli
 * puolet on alle 500 metrissä, ja tasavälinen asteikko käyttäisi siihen
 * yhden ainoan värin: koko asuttu maailma olisi samaa vihreää eikä
 * alankojen muoto näkyisi lainkaan. Siksi portaat ovat tiheässä alhaalla
 * ja harvenevat ylöspäin.
 *
 * Portaiden VÄLISSÄ väri liukuu. Terävät rajat piirtäisivät kartalle
 * korkeuskäyrät, ja ne on jo piirretty toisessa linssissä
 * (js/packs/linssi-topografia.js). Tämä linssi näyttää maaston, ei rajoja.
 */
export const MAA = [
  [0, 62, 110, 66],       // tummanvihreä alanko
  [150, 104, 145, 72],
  [400, 152, 174, 84],
  [800, 205, 196, 112],   // kellertävä ylänkö
  [1400, 208, 170, 100],
  [2200, 182, 132, 82],   // ruskea vuoristo
  [3200, 148, 98, 62],    // tummanruskea
  [4200, 152, 112, 84],
  [5200, 186, 164, 152],  // paljas kivi
  [6000, 232, 232, 235],  // lumiraja
  [7000, 255, 255, 255],
];

/*
 * Meren syvyysasteikko. Sama logiikka toisin päin: matala on vaalea,
 * syvä on tumma.
 *
 * Portaat on valittu merenpohjan omista muodoista eikä tasavälein.
 * -200 m on mannerjalustan reuna (sama raja, jolla varjostuksen
 * merivaimennus on täysi ja jolla vyöhykelinssin matalin merivyöhyke
 * kulkee), -4000 m on valtamerten pohjan yleiskorkeus ja -6000 m alkaa
 * syvänteiden alue. Näin mannerjalusta erottuu vaaleana kaistaleena
 * rannikoilla — se on maailman suurimpia maastonmuotoja ja katoaisi
 * tasavälisellä asteikolla kokonaan.
 */
export const MERI = [
  [-11000, 10, 28, 78],
  [-6000, 22, 50, 112],
  [-4000, 38, 78, 145],
  [-2500, 62, 112, 176],
  [-1000, 100, 155, 208],
  [-200, 140, 190, 228],
  [0, 176, 214, 240],     // matala rannikkovesi
];

/*
 * Rantaviiva on ainoa terävä raja koko asteikolla: nollan alapuolella
 * vaalea sini, yläpuolella tumma vihreä. Se on tarkoitus — ranta on
 * maailman selvin raja, ja ilman sitä mantereilla ei olisi muotoa.
 *
 * Sama kolikko kääntöpuolelta: ETOPO1 ei tiedä, onko kuiva painanne
 * kuivaa. Kaspianmeren alanko, Qattaran painanne, Kuolemanlaakso ja
 * Hollannin polderit ovat merenpinnan alapuolella ja saavat siksi
 * merenvärin. Kaspianmeren tapauksessa se on enimmäkseen oikein (siellä
 * ON meri), muualla se levittää sinistä muutaman pikselin verran sinne
 * missä on kuivaa maata. Korjaus vaatisi erillisen maa-merimaskin, ja
 * se olisi uusi aineisto uusine virheineen — tämä työkalu kertoo mitä
 * korkeus kertoo.
 */
export const poimi = (asteikko, z) => {
  if (z <= asteikko[0][0]) return asteikko[0].slice(1);
  const viimeinen = asteikko[asteikko.length - 1];
  if (z >= viimeinen[0]) return viimeinen.slice(1);
  let i = 1;
  while (asteikko[i][0] < z) i += 1;
  const [aM, aR, aG, aB] = asteikko[i - 1];
  const [bM, bR, bG, bB] = asteikko[i];
  const t = (z - aM) / (bM - aM);
  return [aR + (bR - aR) * t, aG + (bG - aG) * t, aB + (bB - aB) * t];
};

/*
 * Väri metrin tarkkuudella hakutauluksi.
 *
 * Ruudukossa on kymmeniä miljoonia lukuja ja jokainen niistä luetaan
 * pystyvaiheessa pariin kertaan: asteikon haarukointi jokaiselle
 * erikseen olisi kymmeniä miljoonia turhia vertailuja. Metri on
 * värissä näkymätön askel — koko asteikko käy 20 000 portaassa läpi,
 * ja taulu on 60 kilotavua.
 */
export const LUT_POHJA = 11000;
export const LUT_YLA = 9000;
export const LUT = new Uint8Array((LUT_POHJA + LUT_YLA + 1) * 3);
for (let m = -LUT_POHJA; m <= LUT_YLA; m += 1) {
  const [r, g, b] = m >= 0 ? poimi(MAA, m) : poimi(MERI, m);
  const i = (m + LUT_POHJA) * 3;
  LUT[i] = Math.round(r); LUT[i + 1] = Math.round(g); LUT[i + 2] = Math.round(b);
}

/** Hakutaulun kohta metreille — rajat mukaan leikaten. */
export const lutKohta = (m) => (
  ((m < -LUT_POHJA ? -LUT_POHJA : (m > LUT_YLA ? LUT_YLA : Math.round(m))) + LUT_POHJA) * 3
);

/*
 * TUMMENNUS ja VAALENNUS ovat eri suuruiset, eikä se ole epäsymmetriaa
 * epäsymmetrian vuoksi.
 *
 * Valkoiseen leikkautunut pikseli on menettänyt värinsä lopullisesti:
 * lumiraja, ruskea vuori ja vihreä laakso ovat kaikki 255,255,255 eikä
 * korkeutta voi enää lukea. Mustaan leikkautunut on yhä varjo, ja varjo
 * kuuluu maastoon. Siksi tummennus saa mennä lähes täysille ja vaalennus
 * vain reiluun puoleen.
 *
 * Tummennus on 0,85 eikä 1: täysin musta pikseli ei ole muoto vaan reikä.
 * Kuudesosa väriä jäljellä riittää siihen, että syvinkin varjo näyttää
 * yhä vuorelta eikä kartan repeämältä — Andien itäkylki on tumma mutta
 * yhä ruskea.
 */
export const KALVO = { tummennus: 0.85, vaalennus: 0.5 };

/* ═══════════════════ NAPAJÄÄ (16.9.2026) ══════════════════════════ */

/*
 * OMISTAJA 16.9.2026, sanatarkasti: *"onhan tarkemmassa topografia
 * ajossa myos pohjois ja etelanavat mukana, etta ei tule tyhjia kohtia
 * niihin?"* — ja päätös kortilla: *"Kyllä, koko pallo 1′-datasta."*
 *
 * Pelkkä hypsometrinen asteikko tekee navoista VÄÄRÄN NÄKÖISET.
 * ETOPO1:n jääpinta antaa Etelämantereen sisäosalle 2 000–4 000 metriä,
 * ja asteikko maalaa sen samaksi RUSKEAKSI kuin Tiibetin ylängön; sen
 * rannikko taas on lähellä nollaa ja siis vihreä. Jäämeri olisi puhtaan
 * sininen valtameri. Kumpikaan ei ole se, mitä astronautti näkee.
 *
 * Siksi väri sekoitetaan leveysasteen mukaan jäätä kohti — ja juuri
 * VÄRI eikä valmis pikseli, sillä varjostus kerrotaan vasta sen
 * jälkeen: Etelämantereen jäätiköiden korkeuserot, Transantarktiset
 * vuoret ja rannikon jäätikköreuna säilyvät muotoina, vaikka sävy on
 * jäätä.
 *
 * MAA JA MERI ERIKSEEN, KOLMESTA SYYSTÄ:
 *
 *  1. Mannerjäätikkö on pysyvää ja paksua: se saa olla lähes puhdasta
 *     jäätä (maaKatto 0,88). Merijää on vuodenaikaista ja rikkonaista,
 *     ja jos se olisi yhtä valkoista, ETELÄMANTEREEN RANTAVIIVA
 *     KATOAISI — juuri se raja, jonka omistaja haluaa nähdä.
 *  2. Merijää alkaa myöhemmin (66°) kuin mannerjää (62°): Grönlannin ja
 *     Etelämantereen jäätiköt ulottuvat etelämmäs kuin kiinteä
 *     merijää, ja Norjan rannikko on sula vielä 70°:ssa.
 *  3. Sekoitus jää merellä osittaiseksi (meriKatto 0,72), jolloin
 *     syvyysasteikko näkyy sen läpi: Jäämeren keskiselänne ja
 *     mannerjalusta erottuvat yhä.
 *
 * Kaista on LIUKU eikä kytkin. Terävä raja piirtäisi navan ympäri
 * renkaan, ja rengas näkyisi pallolla heti — sama vika, jonka takia
 * varjostuksen merivaimennuskin liukuu.
 */

/**
 * Napajään sävy. SAMA LUKU kuin js/linssit/satelliitti-avaruus.js:n
 * JAAN_VARI: generoitu Maa jää reliefin alle, ja jos sävyt eroaisivat,
 * raja näkyisi juuri siellä missä kuva vaihtuu. Yksikkötesti
 * (tests/satelliitti-avaruus.test.mjs) vartioi, että nämä pysyvät
 * samana.
 */
export const JAAN_VARI = [236, 240, 244];

/*
 * JÄÄMERI KEVYEMMÄKSI (omistaja 19.9.2026 klo 15.40 Suomen aikaa,
 * Fablen tehtävä 5b). Astronautin kamerassa pohjoisnapa näkyi
 * tasaisena vaaleana levynä: 72 %:n merijää peitti Jäämeren altaat ja
 * Lomonosovin selänteen, ja linssin oma himmennys (saturaatio 0,8 ja
 * valokompensaatio navalla noin 0,63) vei loputkin sävyerot. Pohjoisen
 * merijää alkaa nyt 72°:sta ja jää 40 %:iin, joten syvyysasteikko
 * näkyy jään läpi. Koeala 64–90° N: meren sinisyys (sininen − punainen)
 * yli 80°:n leveydellä 34 → 67. ETELÄ EI MUUTU: Etelämantereen
 * ympäryksen merijää ja kaikki mannerjää (maa, maaKatto) ovat ennallaan.
 */
/** Jäävyöhykkeet asteina ja sekoituksen katto. Ks. yllä. */
export const JAA = {
  maa: [62, 70],
  meri: [66, 78],
  maaKatto: 0.88,
  meriKatto: 0.72,
  meriPohjoinen: [72, 84],
  meriPohjoinenKatto: 0.4,
};

/** Pehmeä askel (smoothstep) — sama kaava kuin pelin linsseillä. */
export const pehmea = (a, b, x) => {
  if (b === a) return x >= b ? 1 : 0;
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * Jään osuus 0…1 leveysasteella ja korkeudella.
 *
 * @param {number} lat leveysaste (−90…90)
 * @param {number} korkeusM metriä merenpinnasta; alle nollan on merta
 */
export function jaapaino(lat, korkeusM) {
  const a = Math.abs(lat);
  return korkeusM >= 0
    ? JAA.maaKatto * pehmea(JAA.maa[0], JAA.maa[1], a)
    : (lat > 0
      ? JAA.meriPohjoinenKatto * pehmea(JAA.meriPohjoinen[0], JAA.meriPohjoinen[1], a)
      : JAA.meriKatto * pehmea(JAA.meri[0], JAA.meri[1], a));
}
