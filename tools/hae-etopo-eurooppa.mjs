/*
 * HAKEE EUROOPAN YHTEISEN KORKEUSRUUDUKON (ETOPO1, yksi kaariminuutti).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/hae-etopo-eurooppa.mjs <datakansio> \
 *       [--alue lon0,lon1,lat0,lat1] [--kaista 1] [--lisaa <csv-kansio>]
 *
 * Kirjoittaa kansioon etopo-eurooppa.bin + .json (ks.
 * tools/fokuskartta/etopo.mjs). Kansio on REPON ULKOPUOLELLA — levy on
 * parikymmentä megatavua eikä sitä committoida, aivan kuten muutakaan
 * raaka-aineistoa.
 *
 * === HAKU ON KESKEYTETTÄVISSÄ JA JATKETTAVISSA ===
 *
 * Levy luodaan täyteen "ei haettu" -arvoa ja tallennetaan JOKA PALAN
 * jälkeen. Uusi ajo lukee levyn, katsoo mitkä pisteet puuttuvat ja hakee
 * vain ne. Sama koskee `--alue`-valitsinta: sillä voi hakea ensin
 * kiireiset maat (Kreikan naapurit) ja laajentaa myöhemmin muualle
 * Eurooppaan ilman että mitään haetaan kahdesti.
 *
 * === MIKSI AUKOT ETSITÄÄN RIVEITTÄIN ===
 *
 * Osa aineistosta on jo levyllä aiemmista hauista (`--lisaa`), ja ne
 * ovat suorakaiteita: yhdellä leveysasterivillä voi olla katettuna
 * keskiosa muttei laitoja. Yhtenä palana haettu "pienimmästä
 * puuttuvasta suurimpaan" lataisi keskiosan turhaan uudestaan, joten
 * jokaiselta riviltä etsitään puuttuvat VÄLIT erikseen ja peräkkäiset
 * samanlaiset rivit niputetaan yhdeksi hauksi.
 *
 * Lähde: ETOPO1 Global Relief (NOAA, Amante & Eakins 2009,
 * doi:10.7289/V5C8276M) — public domain, ERDDAP
 * coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360 (sama palvelin kuin
 * tools/hae-korkeusruudukko.mjs).
 */
import {
  avaaLevy, idxLat, idxLon, lueCsv, lueCsvKansio, PUUTTUVA, tallennaLevy,
} from './fokuskartta/etopo.mjs';

/*
 * Levyn oletusalue: koko Euroopan pelilauta marginaaleineen.
 *
 * Länsiraja -30 kattaa Islannin ikkunan, itäraja 51 Suomen ja Turkin,
 * etelä 30 Italian ja Turkin ikkunoiden alalaidat ja pohjoinen 76,5
 * Norjan. Rajat EIVÄT ole maiden rajoja vaan KUVIEN rajoja: jokainen
 * kuva ulottuu ikkunaansa selvästi kauemmas, koska kamera näyttää
 * ikkunaa leveämmältä. Venäjä EI mahdu tähän eikä ole tarkoituskaan: sen
 * ikkuna ulottuu Tyynellemerelle asti, ja se on oma tapauksensa.
 */
const OLETUSALUE = {
  lon0: -30, lon1: 51, lat0: 30, lat1: 76.5,
};

const PALVELIN = 'https://coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360.csv';

const argv = process.argv.slice(2);
const kansio = argv[0];
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const valitsimet = (nimi) => argv.reduce((ulos, a, i) => (
  a === `--${nimi}` && argv[i + 1] ? [...ulos, argv[i + 1]] : ulos), []);

if (!kansio) {
  console.error('Käyttö: NODE_USE_ENV_PROXY=1 node tools/hae-etopo-eurooppa.mjs '
    + '<datakansio> [--alue lon0,lon1,lat0,lat1] [--kaista 1] [--lisaa <csv-kansio>]');
  process.exit(1);
}

const alueValitsin = valitsin('alue', null);
const alue = alueValitsin
  ? (() => {
    const [a, b, c, d] = alueValitsin.split(',').map(Number);
    return {
      lon0: a, lon1: b, lat0: c, lat1: d,
    };
  })()
  : null;
/* Kaistan korkeus asteina: yhden asteen pala koko Euroopan leveydeltä on
 * noin viisi megatavua CSV:tä, mikä on ERDDAPille mukava suupala. */
const KAISTA = Number(valitsin('kaista', 1));

const levy = avaaLevy(kansio, OLETUSALUE);
console.log(`Levy ${levy.w} x ${levy.h} — lon ${levy.lon0}..${levy.lon1} `
  + `lat ${levy.lat0}..${levy.lat1}`);

for (const lisa of valitsimet('lisaa')) {
  const { tiedostoja, pisteita } = lueCsvKansio(levy, lisa);
  console.log(`  lisätty ${lisa}: ${tiedostoja} tiedostoa, ${pisteita} pistettä`);
}

/* Se osa levystä, jonka tämä ajo täyttää. */
const kohde = alue ?? {
  lon0: levy.lon0, lon1: levy.lon1, lat0: levy.lat0, lat1: levy.lat1,
};
const kx0 = Math.max(0, idxLon(kohde.lon0) - idxLon(levy.lon0));
const kx1 = Math.min(levy.w - 1, idxLon(kohde.lon1) - idxLon(levy.lon0));
const ky0 = Math.max(0, idxLat(levy.lat1) - idxLat(kohde.lat1));
const ky1 = Math.min(levy.h - 1, idxLat(levy.lat1) - idxLat(kohde.lat0));

/** Yhden rivin puuttuvat välit levyn x-indekseinä, pienet raot yhdistettynä. */
function puuttuvatValit(y) {
  const valit = [];
  let alkoi = -1;
  for (let x = kx0; x <= kx1; x++) {
    const tyhja = levy.grid[y * levy.w + x] === PUUTTUVA;
    if (tyhja && alkoi < 0) alkoi = x;
    if (!tyhja && alkoi >= 0) { valit.push([alkoi, x - 1]); alkoi = -1; }
  }
  if (alkoi >= 0) valit.push([alkoi, kx1]);
  // Alle asteen rako kahden aukon välissä ei kannata: erillinen pyyntö
  // maksaa enemmän kuin 60 pisteen uudelleenhaku.
  const yhdistetty = [];
  for (const v of valit) {
    const edellinen = yhdistetty[yhdistetty.length - 1];
    if (edellinen && v[0] - edellinen[1] <= 60) edellinen[1] = v[1];
    else yhdistetty.push([...v]);
  }
  return yhdistetty;
}

/* Peräkkäiset rivit, joilla on samat aukot, niputetaan yhdeksi kaistaksi. */
const palat = [];
let nykyinen = null;
const avain = (valit) => valit.map((v) => v.join('-')).join('|');
for (let y = ky0; y <= ky1; y++) {
  const valit = puuttuvatValit(y);
  const a = avain(valit);
  const korkeus = nykyinen ? nykyinen.y1 - nykyinen.y0 + 1 : 0;
  if (nykyinen && nykyinen.avain === a && korkeus < KAISTA * 60) {
    nykyinen.y1 = y;
  } else {
    if (nykyinen && nykyinen.valit.length) palat.push(nykyinen);
    nykyinen = {
      avain: a, valit, y0: y, y1: y,
    };
  }
}
if (nykyinen && nykyinen.valit.length) palat.push(nykyinen);

const pisteita = palat.reduce((s, p) => s + (p.y1 - p.y0 + 1)
  * p.valit.reduce((t, v) => t + (v[1] - v[0] + 1), 0), 0);
console.log(`  haettavaa ${palat.length} kaistaa, ${(pisteita / 1e6).toFixed(2)} Mpistettä `
  + `(~${(pisteita * 20 / 1e6).toFixed(0)} Mt CSV:tä)`);
if (!palat.length) { console.log('  ei mitään haettavaa — levy on jo täynnä.'); process.exit(0); }

const aste = (v) => (v / 60).toFixed(6);
/** ERDDAPin pituusasteakseli on 0..360, ruudukkomme -180..180. */
const erddapLon = (i) => (i < 0 ? i + 360 * 60 : i);

let haettu = 0;
let virheet = 0;
for (let p = 0; p < palat.length; p++) {
  const pala = palat[p];
  const latYla = (idxLat(levy.lat1) - pala.y0);
  const latAla = (idxLat(levy.lat1) - pala.y1);
  for (const [x0, x1] of pala.valit) {
    const lonAlku = idxLon(levy.lon0) + x0;
    const lonLoppu = idxLon(levy.lon0) + x1;
    /*
     * Nollameridiaanin sauma: ERDDAPin akselilla länsi on 349..360 ja
     * itä 0..11, joten välin yli menevä pyyntö on jaettava kahtia.
     */
    const osat = (lonAlku < 0 && lonLoppu >= 0)
      ? [[lonAlku, -1], [0, lonLoppu]]
      : [[lonAlku, lonLoppu]];
    for (const [a, b] of osat) {
      const u = `${PALVELIN}?altitude%5B(${aste(latAla)}):1:(${aste(latYla)})%5D`
        + `%5B(${aste(erddapLon(a))}):1:(${aste(erddapLon(b))})%5D`;
      let teksti = null;
      for (let yritys = 0; yritys < 5 && teksti == null; yritys += 1) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const r = await fetch(u);
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          // eslint-disable-next-line no-await-in-loop
          teksti = await r.text();
        } catch (e) {
          console.log(`    yritys ${yritys + 1} kaatui: ${e.message}`);
          // eslint-disable-next-line no-await-in-loop
          await new Promise((s) => setTimeout(s, 3000 * (yritys + 1)));
        }
      }
      if (!teksti) {
        virheet += 1;
        console.error(`  EI SAATU lat ${aste(latAla)}..${aste(latYla)} `
          + `lon ${aste(a)}..${aste(b)} — jatketaan, ajo voi täydentää myöhemmin.`);
        continue;
      }
      const osui = lueCsv(levy, teksti);
      haettu += osui;
      console.log(`  ${p + 1}/${palat.length} lat ${aste(latAla)}..${aste(latYla)} `
        + `lon ${aste(a)}..${aste(b)} — ${(teksti.length / 1e6).toFixed(1)} Mt, ${osui} pistettä`);
    }
  }
  tallennaLevy(levy);
}

let yha = 0;
for (let y = ky0; y <= ky1; y++) {
  for (let x = kx0; x <= kx1; x++) if (levy.grid[y * levy.w + x] === PUUTTUVA) yha += 1;
}
tallennaLevy(levy);
console.log(`Valmis: ${haettu} pistettä haettu, ${virheet} epäonnistunutta palaa, `
  + `${yha} pistettä yhä puuttuu alueelta.`);
