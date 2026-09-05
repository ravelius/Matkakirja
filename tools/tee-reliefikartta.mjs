/*
 * Täysvärinen varjostettu reliefikartta -> assets/linssit/topografia.webp
 *
 *   NODE_USE_ENV_PROXY=1 node tools/tee-reliefikartta.mjs [--kuiva]
 *                        [--leveys 3600] [--liioittelu 15] [--katto 1200]
 *
 * Ottaa korkeusruudukon (tools/hae-korkeusruudukko.mjs), varjostaa sen
 * (tools/varjostus.mjs), värittää hypsometrisellä asteikolla, projisoi
 * pelin Miller-lautaan ja pakkaa WebPiksi. Ulos tulee YKSI kuva, joka
 * peittää laudan kokonaan ja kiertää saumattomasti ympäri, sekä sen
 * paikan ja lähteen kertova js/packs/linssi-topografia-kuva.js.
 *
 * --- miksi tämä on eri näköinen kuin peli ---
 *
 * Omistaja näytti Wikipedian reliefikartan Magdalena-joesta ja päätti
 * 4.8.2026: "täysväri siihen linssiin, mutta pidetään seepia normaalissa
 * pelinäkymässä, ja sitä voi hieman kehittää vielä noiden mainitsemieni
 * varjostusten ja muiden avulla."
 *
 * Siitä seuraa KAKSI ERI LOPPUTULOSTA SAMASTA LASKENNASTA. Tämä työkalu
 * tekee niistä ensimmäisen: linssin, joka saa näyttää täysin erilaiselta
 * kuin lauta sen alla. Se on taikalasien koko idea — lasit eivät koristele
 * karttaa vaan näyttävät toisen maailman. Pohjakartta ottaa samasta
 * varjosta vain hyvin hienovaraisen syvyyden seepiaan (TEHTÄVÄ 2b), eikä
 * kumpikaan tarvitse omaa laskentaansa.
 *
 * --- mikä tekee reliefikartasta hienon ---
 *
 * EI VÄRISKAALA VAAN VARJOSTUS. Sama vihreä-keltainen-ruskea-valkoinen
 * asteikko ilman varjoa on litteä läntti: se kertoo vain, kuinka korkealla
 * kukin kohta on, ja korkeus yksin on tylsä luku. Varjo kertoo MUODON —
 * mihin suuntaan rinne viettää — ja silmä lukee muodon. Vasta yhdessä
 * niistä tulee maastoa: väri sanoo "kaksi kilometriä", varjo sanoo
 * "harjanne, joka kaartuu tuonne".
 *
 * Siksi varjo on tässä KERTOLASKU värin päällä eikä oma harmaa kerros
 * sen vieressä. Kerroin 1 on tasainen maa, alle 1 tummentaa poispäin
 * kääntyvän rinteen ja yli 1 vaalentaa aurinkoon päin kääntyvän. Väri
 * pysyy koko ajan sinä värinä, jonka korkeus sille antoi.
 *
 * --- miksi kuva eikä monikulmioita ---
 *
 * js/packs/linssi-topografia.js on jo olemassa ja piirtää saman aineiston
 * vyöhykkeiden ÄÄRIVIIVOINA. Varjostusta ei voi piirtää ääriviivoina
 * lainkaan: se ei ole rajoja vaan jatkuva kenttä, jossa jokainen ruutu
 * saa oman arvonsa naapureidensa erosta. Sama syy kuin yökartalla
 * (tools/hae-yonkartta.mjs) — kenttä on kuva, raja on monikulmio.
 *
 * Vyöhykelinssi ei siis korvaudu tällä vaan saa rinnalleen toisen tavan
 * katsoa samaa maastoa: toinen kertoo missä 1000 metriä kulkee, toinen
 * miltä maa näyttää.
 *
 * --- miksi projektio ajetaan tässä eikä selaimessa ---
 *
 * Sama perustelu kuin yökartalla: lauta on Millerin lieriöprojektiossa ja
 * ruudukko tasakulmainen. Millerissä pystymittakaava kasvaa navoille päin,
 * 76. leveysasteella yli kaksinkertaiseksi. Suoraan laudan päälle
 * venytettynä Skandinavian vuoret olisivat satoja kilometrejä väärässä
 * paikassa. Selain ei osaa venyttää kuvaa epälineaarisesti ilman WebGL:ää,
 * ja lauta on joka tapauksessa kiinteä, joten muunnos tehdään kerran
 * täällä ja peli saa valmiin kuvan.
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXY=1,
 * ks. tools/hae-radiot.mjs. Skripti käynnistää itsensä uudelleen, jos
 * muuttuja puuttuu — korkeusruudukko haetaan verkosta, ellei se ole jo
 * välimuistissa.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { haeKorkeusruudukko, LAHTEET } from './hae-korkeusruudukko.mjs';
import { varjosta, tasainenVarjo, AURINKO } from './varjostus.mjs';
import { sovitaMaailma, miller } from './vanha-maailma.mjs';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const VALIMUISTI = join(tmpdir(), 'matkakirja-reliefikartta');
const SUHTEELLINEN = 'assets/linssit/topografia.webp';
// Pallon kalvo on sama reliefi tasavälisenä; tekee sen tools/tee-pallokalvo.mjs
// (aalto 1A). Polku kirjoitetaan pakettiin täältä, jotta nimi on yksi.
const PALLON_SUHTEELLINEN = 'assets/linssit/topografia-pallo.webp';
const KOHDE = join(JUURI, SUHTEELLINEN);
const PAKETTI = join(JUURI, 'js', 'packs', 'linssi-topografia-kuva.js');

// --- laudan sovitus ----------------------------------------------------------
//
// Nämä neljä lukua ovat samat kuin maailmankartalla (js/packs/maailmankartta.js,
// tools/tee-maasto.mjs ja tools/hae-yonkartta.mjs). Jos lauta joskus piirretään
// toisin, tämä ajetaan uudelleen — ruudukkoa ei tarvitse hakea enää koskaan,
// sillä se on välimuistissa.

const LAUTA = { leveys: 12000, lon0: -175, etela: -58, pohjoinen: 76 };

const argv = process.argv.slice(2);
const kuiva = argv.includes('--kuiva');
const arvo = (lippu, oletus) => {
  const i = argv.indexOf(lippu);
  return i >= 0 ? Number(argv[i + 1]) : oletus;
};

/*
 * Kuvan leveys pikseleinä.
 *
 * 3600 on kymmenesosa asteesta: yksi kuvapikseli on päiväntasaajalla 11 km
 * ja laudalla 3,3 yksikköä. Korkeusruudukko on 0,05°, joten jokaiseen
 * kuvapikseliin osuu noin neljä ruutua — kuva on siis KESKIARVO eikä
 * poiminta, ja varjostuksen hienoin rakenne pehmenee siihen sen sijaan
 * että välkkyisi.
 *
 * Tätä isompi ei kannata: laudan lähikuvassa venytys on jo nyt reilusti
 * alle sen, mitä 0,05°:n ruudukko voi kertoa, ja tiedostokoko kasvaa
 * neliöllisesti.
 */
const LEVEYS_PX = arvo('--leveys', 3600);
const KATTO_KT = arvo('--katto', 1200);

/*
 * LIIOITTELU on linssillä suurempi kuin varjostuksen oletus (10), muttei
 * niin suuri kuin sen mittaus sallisi.
 *
 * varjostus.mjs mittasi koko maailmasta, että 15 jättää 0,48 % maasta
 * täysin mustaksi. Koko maailman kuvassa se ei näy, mutta linssiä
 * katsotaan myös lähikuvassa, ja siellä se näkyy: kokeiltuna
 * Kolumbian Andeilla kerroin 15 tekee itäkylkien varjoista yhtenäistä
 * mustaa, jossa Magdalenan laakso hukkuu naapuriharjanteen alle.
 * Kertoimella 12 sama rinne on yhä selvästi jyrkempi kuin tasanko
 * mutta säilyttää värinsä.
 *
 * Pohjakartta EI säädä voimakkuutta tästä vaan piirron läpinäkyvyydellä —
 * leikkautunut varjo pysyy leikkautuneena, vaikka sen piirtäisi kuinka
 * haaleana.
 */
const LIIOITTELU = arvo('--liioittelu', 12);

// --- hypsometrinen väriasteikko ----------------------------------------------

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
const MAA = [
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
const MERI = [
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
const poimi = (asteikko, z) => {
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
 * Ruudukossa on 26 miljoonaa lukua ja jokainen niistä luetaan pystyvaiheessa
 * pariin kertaan: asteikon haarukointi jokaiselle erikseen olisi kymmeniä
 * miljoonia turhia vertailuja. Metri on värissä näkymätön askel — koko
 * asteikko käy 20 000 portaassa läpi, ja taulu on 60 kilotavua.
 */
const LUT_POHJA = 11000;
const LUT_YLA = 9000;
const LUT = new Uint8Array((LUT_POHJA + LUT_YLA + 1) * 3);
for (let m = -LUT_POHJA; m <= LUT_YLA; m++) {
  const [r, g, b] = m >= 0 ? poimi(MAA, m) : poimi(MERI, m);
  const i = (m + LUT_POHJA) * 3;
  LUT[i] = Math.round(r); LUT[i + 1] = Math.round(g); LUT[i + 2] = Math.round(b);
}

// --- varjon kalvo ------------------------------------------------------------

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
const KALVO = { tummennus: 0.85, vaalennus: 0.5 };

// --- kohdepikselien maantiede ------------------------------------------------

/*
 * Kohdekuvan pikselirivien ja -sarakkeiden REUNAT asteina.
 *
 * Reunat eivätkä keskikohdat, koska laatikkosuodatus tarvitsee tietää
 * kunkin pikselin PEITTÄMÄN alueen. Reunoja on yksi enemmän kuin
 * pikseleitä. Sama laskenta kuin yökartalla (tools/hae-yonkartta.mjs),
 * ja tarkoituksella sama: kahden linssin kuvat osuvat laudalla
 * päällekkäin pikselilleen.
 */
function reunatAsteina(sovitus, leveysPx, korkeusPx) {
  const RAD = Math.PI / 180;
  const yPohjoinen = miller.eteen(0, LAUTA.pohjoinen)[1];
  // sovitaMaailma antaa vain eteenpäin menevän kaavan; nämä ovat sen
  // käänteiset. miller.taakse on saman tiedoston vienti, joten kaava
  // pysyy yhtenä eikä sitä kirjoiteta tänne uudelleen.
  const lon = (lautaX) => LAUTA.lon0 + (lautaX / sovitus.skaala) / RAD;
  const lat = (lautaY) => miller.taakse(0, yPohjoinen + lautaY / sovitus.skaala)[1];

  const lonReunat = [];
  for (let i = 0; i <= leveysPx; i++) lonReunat.push(lon((i * sovitus.leveys) / leveysPx));
  const latReunat = [];
  for (let j = 0; j <= korkeusPx; j++) latReunat.push(lat((j * sovitus.korkeus) / korkeusPx));
  return { lonReunat, latReunat };
}

// --- projisointi -------------------------------------------------------------

/**
 * Väritetty ja varjostettu ruudukko laudan Miller-projektioon.
 *
 * Palauttaa Uint8ClampedArrayn, jossa on leveysPx * korkeusPx RGB-pikseliä
 * riveittäin, ylin rivi pohjoisin.
 *
 * --- ruudukon reunakoordinaatti ---
 *
 * Ruudukon rivi y on PISTE leveysasteella -90 + y*ruutu, ei ruutu. Piste
 * edustaa aluetta, joka ulottuu puoli ruutua kumpaankin suuntaan, joten
 * laatikkosuodatuksessa sen peittämä väli on [y - 0,5, y + 0,5]. Puolikkaan
 * siirto tehdään kertaalleen tässä (+0,5 reunakoordinaattiin), jolloin
 * loppu laskenta saa käsitellä ruutuja tavallisina väleinä [y, y+1).
 *
 * Ilman siirtoa koko kartta olisi puoli ruutua eli 2,8 kilometriä
 * pohjoiseen ja itään — näkymätön virhe, mutta väärin, ja väärin
 * kahdessa kuvassa eri tavalla, jos toinen työkalu joskus tekee sen
 * oikein.
 */
function projisoi(g, varjo, tasainen, sovitus, leveysPx, korkeusPx) {
  const { z, leveys, korkeus, ruutu } = g;
  const { lonReunat, latReunat } = reunatAsteina(sovitus, leveysPx, korkeusPx);

  const yReuna = (lat) => (lat + 90) / ruutu + 0.5;
  const xReuna = (lon) => (lon + 180) / ruutu + 0.5;

  /*
   * Sauman jakso. Ruudukon sarakkeet 0 ja leveys-1 ovat SAMA meridiaani
   * kahdesti, joten kierron jakso on leveys-1 eikä leveys: viimeinen
   * sarake on kaksoiskappale eikä oma paikkansa. Väärä jakso venyttäisi
   * kartan yhden sarakkeen verran ja jättäisi saumaan hiusviivan.
   */
  const JAKSO = leveys - 1;

  const kuva = new Uint8ClampedArray(leveysPx * korkeusPx * 3);
  // Yksi väliaikainen rivi ruudukon leveydeltä: pystyvaiheen tulos
  // menee suoraan vaakavaiheeseen, joten koko välikuvaa ei ole olemassa.
  const rivi = new Float64Array(leveys * 3);

  for (let j = 0; j < korkeusPx; j++) {
    // latReunat laskee pohjoisesta etelään, ruudukon y kasvaa pohjoiseen.
    const a = yReuna(latReunat[j + 1]);
    const b = yReuna(latReunat[j]);

    rivi.fill(0);
    let paino = 0;
    const eka = Math.max(0, Math.floor(a));
    const vika = Math.min(korkeus, Math.ceil(b));
    for (let gy = eka; gy < vika; gy++) {
      const p = Math.min(b, gy + 1) - Math.max(a, gy);
      if (p <= 0) continue;
      paino += p;
      const alku = gy * leveys;
      for (let x = 0; x < leveys; x++) {
        const i = alku + x;
        const m = z[i];
        const l = ((m < -LUT_POHJA ? -LUT_POHJA : m > LUT_YLA ? LUT_YLA : Math.round(m))
          + LUT_POHJA) * 3;

        /*
         * Varjo kertolaskuna värin päälle. k on 1 tasaisella maalla,
         * 0 täydessä varjossa ja enintään 1/sin(45°) = 1,41 suoraan
         * aurinkoa vasten olevalla rinteellä.
         */
        const k = varjo[i] / tasainen;
        let kerroin; let valo;
        if (k <= 1) { kerroin = 1 - (1 - k) * KALVO.tummennus; valo = 0; }
        else { kerroin = 1; valo = (k - 1) * KALVO.vaalennus; }

        const r = LUT[l] * kerroin;
        const v = LUT[l + 1] * kerroin;
        const s = LUT[l + 2] * kerroin;
        const o = x * 3;
        rivi[o] += p * (r + (255 - r) * valo);
        rivi[o + 1] += p * (v + (255 - v) * valo);
        rivi[o + 2] += p * (s + (255 - s) * valo);
      }
    }
    if (paino > 0) for (let i = 0; i < rivi.length; i++) rivi[i] /= paino;

    // Vaakavaihe: sama laatikkosuodatus, mutta sauman yli kiertäen.
    const kohde = j * leveysPx * 3;
    for (let i = 0; i < leveysPx; i++) {
      const va = xReuna(lonReunat[i]);
      const vb = xReuna(lonReunat[i + 1]);
      let sr = 0; let sg = 0; let sb = 0; let sp = 0;
      const gEka = Math.floor(va);
      const gVika = Math.ceil(vb);
      for (let gx = gEka; gx < gVika; gx++) {
        const p = Math.min(vb, gx + 1) - Math.max(va, gx);
        if (p <= 0) continue;
        const c = (((gx % JAKSO) + JAKSO) % JAKSO) * 3;
        sr += p * rivi[c]; sg += p * rivi[c + 1]; sb += p * rivi[c + 2];
        sp += p;
      }
      const o = kohde + i * 3;
      kuva[o] = Math.round(sr / sp);
      kuva[o + 1] = Math.round(sg / sp);
      kuva[o + 2] = Math.round(sb / sp);
    }
  }
  return kuva;
}

// --- sijoittelun tarkistus ---------------------------------------------------

/*
 * Näytepisteet, joilla valmiin kuvan sijoittelu tarkistetaan.
 *
 * Projektiovirhe on juuri se vika, jota ei huomaa katsomalla: siirtynyt
 * reliefikartta näyttää yhä reliefikartalta. Siksi valmiista kuvasta
 * luetaan pikseli sieltä, mihin laudan sovitus sanoo tunnetun paikan
 * osuvan, ja katsotaan onko se sitä väriä mitä maantieto lupaa.
 *
 * 'meri' tunnistuu sinisestä (b selvästi suurin), 'maa' siitä ettei ole:
 * matala maa on vihreä, korkea ruskea ja korkein valkoinen, eikä
 * yhdessäkään niistä sini johda.
 */
const KOETIN = [
  { nimi: 'Amazonin alanko', lon: -60, lat: -3, odotus: 'maa' },
  { nimi: 'Kongon allas', lon: 20, lat: -1, odotus: 'maa' },
  { nimi: 'Tiibetin ylänkö', lon: 88, lat: 33, odotus: 'maa' },
  { nimi: 'Australian keskus', lon: 133, lat: -24, odotus: 'maa' },
  { nimi: 'Tyynenmeren keskiosa', lon: -140, lat: 0, odotus: 'meri' },
  { nimi: 'Pohjois-Atlantti', lon: -30, lat: 30, odotus: 'meri' },
  { nimi: 'Intian valtameri', lon: 80, lat: -20, odotus: 'meri' },
  { nimi: 'Beringinmeri', lon: -177, lat: 58, odotus: 'meri' },
];

// --- pakkaus -----------------------------------------------------------------
//
// Node ei osaa kirjoittaa WebPiä eikä peliin saa lisätä riippuvuuksia, joten
// pakkaus tehdään Pythonin Pillow'lla. Työkalu saa käyttää mitä tahansa
// koneelta löytyvää; peli itse ei näe tästä mitään.
//
// Raakapikselit kulkevat tiedostona eivätkä stdinin kautta: 3600 x 1620
// RGB on 17 megatavua, ja se on JSONiin kääritynä satoja megatavuja.
//
// Skripti kirjoitetaan tiedostoon eikä anneta python3 -c:lle: -c:n
// argumentti puretaan käyttöjärjestelmän merkistöllä, joten ä ja ö
// hajoaisivat koneella, jolla LANG on C.

const PYTHON = `
import io, json, sys
import numpy as np
from PIL import Image

ohje = json.load(sys.stdin)
raaka = np.fromfile(ohje['raaka'], dtype=np.uint8)
kuva = Image.fromarray(raaka.reshape((ohje['korkeus'], ohje['leveys'], 3)), 'RGB')

# Laatu haarukoidaan: otetaan paras, joka mahtuu kattoon. Kiinteä luku
# vanhenisi heti, jos kuvan leveys, väriasteikko tai varjostus vaihtuu.
#
# method=6 on Pillow'n hitain ja tiukin hakuasetus. Se maksaa sekunteja
# kerran ajossa ja säästää kymmeniä kilotavuja jokaisessa latauksessa.
paras = None
for laatu in ohje['laadut']:
    puskuri = io.BytesIO()
    kuva.save(puskuri, format='WEBP', quality=laatu, method=6)
    tavut = puskuri.getvalue()
    if len(tavut) <= ohje['kattoTavua']:
        paras = (laatu, tavut)
        break

if paras is None:
    sys.exit('katto ei tayty edes huonoimmalla laadulla')

if not ohje['kuiva']:
    with open(ohje['kohde'], 'wb') as t:
        t.write(paras[1])

print(json.dumps({'laatu': paras[0], 'tavua': len(paras[1])}))
`;

// --- ajo ---------------------------------------------------------------------

const sovitus = sovitaMaailma(LAUTA);
const korkeusPx = Math.round((sovitus.korkeus * LEVEYS_PX) / sovitus.leveys);

console.log(`lauta: ${sovitus.leveys} x ${sovitus.korkeus} yksikköä, `
  + `nollakohta ${LAUTA.lon0}°, ${LAUTA.etela}…${LAUTA.pohjoinen}° leveyttä`);
console.log(`kohde: ${LEVEYS_PX} x ${korkeusPx} px `
  + `(${(sovitus.leveys / LEVEYS_PX).toFixed(1)} lautayksikköä eli `
  + `noin ${Math.round(40075 / LEVEYS_PX)} km päiväntasaajalla per pikseli)`);

const g = await haeKorkeusruudukko();
console.log(`ruudukko: ${g.leveys} x ${g.korkeus} (${g.ruutu}°), `
  + `${(g.leveys / LEVEYS_PX * (g.korkeus / korkeusPx)).toFixed(1)} ruutua per kuvapikseli`);

const { varjo } = varjosta(g, { liioittelu: LIIOITTELU });
const tasainen = tasainenVarjo();
console.log(`varjostus: aurinko atsimuutti ${AURINKO.atsimuutti}°, `
  + `korkeuskulma ${AURINKO.korkeuskulma}°, liioittelu ${LIIOITTELU}, `
  + `tasainen maa ${tasainen.toFixed(3)}`);

const kuva = projisoi(g, varjo, tasainen, sovitus, LEVEYS_PX, korkeusPx);

console.log('sijoittelun tarkistus:');
let virheita = 0;
for (const k of KOETIN) {
  const [bx, by] = sovitus.muunna([k.lon, k.lat]);
  const px = Math.min(LEVEYS_PX - 1, Math.max(0, Math.round((bx / sovitus.leveys) * LEVEYS_PX)));
  const py = Math.min(korkeusPx - 1, Math.max(0, Math.round((by / sovitus.korkeus) * korkeusPx)));
  const o = (py * LEVEYS_PX + px) * 3;
  const [r, v, s] = [kuva[o], kuva[o + 1], kuva[o + 2]];
  // Meren sini johtaa selvästi; maalla se ei johda millään korkeudella.
  const meri = s > r + 30 && s > v + 20;
  const osui = (k.odotus === 'meri') === meri;
  if (!osui) virheita++;
  console.log(`  ${osui ? 'ok  ' : 'VIKA'} ${k.nimi.padEnd(22)} `
    + `rgb(${String(r).padStart(3)},${String(v).padStart(3)},${String(s).padStart(3)}) `
    + `(odotus: ${k.odotus})`);
}
if (virheita) {
  throw new Error(`${virheita} näytepistettä osui väärin — projisointi tai `
    + 'väriasteikko ei ole se, joka luullaan. Kuvaa EI kirjoitettu.');
}

mkdirSync(VALIMUISTI, { recursive: true });
mkdirSync(dirname(KOHDE), { recursive: true });
const raakaPolku = join(VALIMUISTI, 'reliefi.raw');
writeFileSync(raakaPolku, Buffer.from(kuva.buffer, kuva.byteOffset, kuva.length));

const skriptiPolku = join(VALIMUISTI, 'pakkaa-reliefikartta.py');
writeFileSync(skriptiPolku, PYTHON, 'utf8');

const ajo = spawnSync('python3', [skriptiPolku], {
  input: JSON.stringify({
    raaka: raakaPolku,
    kohde: KOHDE,
    kuiva,
    leveys: LEVEYS_PX,
    korkeus: korkeusPx,
    laadut: [92, 88, 84, 80, 76, 72, 68, 62, 56, 50, 44, 38],
    kattoTavua: KATTO_KT * 1024,
  }),
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});
unlinkSync(raakaPolku);

if (ajo.status !== 0) {
  console.error(ajo.stderr || ajo.stdout);
  throw new Error('pakkaus epäonnistui — onko python3 + Pillow + NumPy asennettu?');
}

const tulos = JSON.parse(ajo.stdout.trim().split('\n').pop());
console.log(`kuva: ${LEVEYS_PX} x ${korkeusPx} px, WebP-laatu ${tulos.laatu}, `
  + `${(tulos.tavua / 1024).toFixed(0)} kt (katto ${KATTO_KT} kt)`);

if (kuiva) {
  console.log('kuiva ajo — mitään ei kirjoitettu');
  process.exit(0);
}

// --- pakettitiedosto ---------------------------------------------------------

const HAKUPAIVA = new Date().toISOString().slice(0, 10);

/*
 * JS-merkkijono heittomerkeillä, talon tyyliin. JSON.stringify käyttäisi
 * lainausmerkkejä, jolloin kirjoitettu tiedosto erottuisi käsin
 * kirjoitetuista paketeista ilman mitään syytä.
 */
const jono = (teksti) => {
  if (/['\\\n]/.test(teksti)) throw new Error(`lainaus vaatisi pakomerkin: ${teksti}`);
  return `'${teksti}'`;
};

/** Rivittää pitkän tekstin otsikkokommentin sarkaimeen. */
const rivita = (teksti, sisennys = 13) => {
  const rivit = [];
  let rivi = '';
  for (const sana of teksti.split(' ')) {
    if (rivi && (sisennys + rivi.length + 1 + sana.length) > 78) { rivit.push(rivi); rivi = sana; }
    else rivi = rivi ? `${rivi} ${sana}` : sana;
  }
  rivit.push(rivi);
  return rivit.join(`\n//${' '.repeat(sisennys - 2)}`);
};

const paketti = `// Reliefikartta: maailma maastona. Kuvan polku ja sen paikka laudalla.
//
// TÄMÄ TIEDOSTO ON KONEEN KIRJOITTAMA. Älä muokkaa käsin:
//   NODE_USE_ENV_PROXY=1 node tools/tee-reliefikartta.mjs
//
// Aineisto: ${rivita(LAHTEET.aineisto)}
// Viite:    ${rivita(LAHTEET.viite)}
// Haettu:   ${HAKUPAIVA} osoitteesta
//           ${LAHTEET.osoite} (NOAA CoastWatch ERDDAP)
// Lisenssi: Public domain — Yhdysvaltain liittovaltion viraston (NOAA)
//           tuottamana aineisto ei ole tekijänoikeuden alainen. ERDDAPin
//           oma lisenssiteksti: "The data may be used and redistributed for
//           free but is not intended for legal use, since it may contain
//           inaccuracies."
//
// TÄSSÄ TIEDOSTOSSA EI OLE KUVAA vaan sen polku. Kuva on binääri ja
// asuu assets-kansiossa: ${SUHTEELLINEN} (${(tulos.tavua / 1024).toFixed(0)} kt).
// Yhden tiedoston versio (dist/matkakirja.html) ei siis saa tätä
// linssiä mukaansa — se on tarkoituksellinen raja, sillä kuvan
// upottaminen base64:nä kasvattaisi paketin megatavulla.
//
// --- mistä kuva on tehty ---
//
// Korkeusruudukko ${g.ruutu}° (${g.leveys} x ${g.korkeus} ruutua) on väritetty
// hypsometrisellä asteikolla ja varjostettu kuvitteellisella auringolla
// luoteesta (atsimuutti ${AURINKO.atsimuutti}°, korkeuskulma ${AURINKO.korkeuskulma}°,
// liioittelu ${LIIOITTELU}). Varjo on kertolasku värin päällä: väri kertoo
// KORKEUDEN, varjo kertoo MUODON, ja silmä lukee muodon.
//
// Aurinko on luoteesta, koska ihminen olettaa valon tulevan ylhäältä ja
// vasemmalta. Kaakosta valaistuna sama kuva kääntyisi nurin: vuoret
// näyttäisivät laaksoilta eikä sitä voisi tahdolla kumota.
//
// --- mihin kuva laudalla osuu ---
//
// Kuva on projisoitu tasakulmaisesta Milleriin samalla sovituksella kuin
// lauta itse (tools/vanha-maailma.mjs, sovitaMaailma). Se peittää laudan
// TARKALLEEN: vasen reuna x=0, oikea x=${sovitus.leveys}, ylin y=0, alin y=${sovitus.korkeus}.
// Piirtäjän ei siis tarvitse laskea asteita lainkaan — kuva venytetään
// suoraan raja-suorakulmioon. Samat rajat kuin yökartalla, joten linssit
// osuvat toistensa päälle pikselilleen.
//
// Kartta kiertää ympäri, joten kuva on toistettava laudan molemmin
// puolin samoin kuin rannikot: kuvan oikea reuna jatkuu vasempaan
// saumattomasti, koska molemmat ovat samaa pituusastetta ${LAUTA.lon0}°.
//
// --- mitä väri lupaa ja mitä ei ---
//
// Väri on KORKEUS eikä kasvillisuus. Sahara on vihertävän keltainen,
// koska se on 300 metrissä, ei siksi että siellä kasvaisi mitään;
// Amazonin sademetsä ja Argentiinan pampa ovat samaa vihreää. Grönlanti
// on ruskea, koska ETOPO1:n jääpinta on siellä kahden-kolmen kilometrin
// korkeudessa — kartta näyttää sen ylänkönä, mikä se korkeutena onkin.
//
// Merenpinnan alapuolinen kuiva maa saa merenvärin: Kaspianmeren alanko,
// Qattaran painanne ja Hollannin polderit näkyvät sinisinä. Korkeus ei
// kerro, onko painanteessa vettä.
//
// Lauta ulottuu ${LAUTA.etela}°:sta ${LAUTA.pohjoinen}°:seen, joten Etelämanner ja pohjoisin
// arktinen alue jäävät kuvan ulkopuolelle. Ne eivät ole kadonneet
// aineistosta vaan laudalta.

export const TOPOGRAFIA_KUVA = {
  kuva: ${jono(SUHTEELLINEN)},

  // Kuvan omat mitat pikseleinä. Piirtäjä ei tarvitse näitä venytykseen
  // (raja riittää), mutta esilataus ja mittasuhteen tarkistus tarvitsevat.
  leveysPx: ${LEVEYS_PX},
  korkeusPx: ${korkeusPx},

  // Kuvan paikka laudan koordinaatteina. Peittää laudan kokonaan.
  raja: { x: 0, y: 0, leveys: ${sovitus.leveys}, korkeus: ${sovitus.korkeus} },

  // Kuva jatkuu reunan yli itseensä, kuten lauta.
  kiertava: true,

  // Rajaus asteina — sama kuin laudalla. Tämä on tarkistusta ja
  // kuvatekstejä varten, ei piirtoa.
  rajaus: { lon0: ${LAUTA.lon0}, etela: ${LAUTA.etela}, pohjoinen: ${LAUTA.pohjoinen} },

  // Millä asetuksilla kuva on tehty. Ei piirtoa varten vaan siksi, että
  // kuvan voi tehdä uudelleen samanlaisena ilman tämän tiedoston lukemista.
  varjostus: {
    atsimuutti: ${AURINKO.atsimuutti},
    korkeuskulma: ${AURINKO.korkeuskulma},
    liioittelu: ${LIIOITTELU},
    ruutu: ${g.ruutu},
  },

  otsikko: 'Reliefikartta: maailma maastona',
  kuvaus: 'Maapallon korkeus ja syvyys hypsometrisin värein, varjostettuna '
    + 'kuvitteellisella auringolla luoteesta. Vihreä on alankoa, ruskea '
    + 'vuoristoa, valkoinen lumirajan yläpuolta; meri vaalenee matalikoilla '
    + 'ja tummuu syvänteissä. Väri kertoo korkeuden, varjo kertoo muodon.',

  lahde: {
    aineisto: ${jono(LAHTEET.aineisto)},
    viite: ${jono(LAHTEET.viite)},
    osoite: ${jono(LAHTEET.osoite)},
    haettu: '${HAKUPAIVA}',
  },

  lisenssi: {
    nimi: 'Public domain (Yhdysvaltain liittovaltion virasto)',
    ehto: 'Lähteen maininta: NOAA NGDC ETOPO1.',
    osoite: ${jono(LAHTEET.osoite)},
  },
};

/*
 * SAMA RELIEFI PALLOLLE — TASAVÄLISENÄ (karttapallo.md luku 10.1).
 *
 * Laudan kuva on Millerissä, pallon pinta odottaa tasaväliä; pallokuva on
 * siis oma tiedostonsa samasta ruudukosta ja samasta varjostuksesta.
 * Polku kirjoitetaan tässä, jotta se ei katoa kun paketti tehdään uusiksi.
 */
export const TOPOGRAFIA_PALLOKUVA = ${jono(PALLON_SUHTEELLINEN)};
`;

writeFileSync(PAKETTI, paketti);
console.log(`kirjoitettu ${KOHDE.replace(JUURI + '/', '')}`);
console.log(`kirjoitettu ${PAKETTI.replace(JUURI + '/', '')} (${Math.round(paketti.length / 1024)} kt)`);
