/*
 * Puuttuvien maiden rajat maailmankartalle Natural Earthista.
 *
 *   NE_GEOJSON=/tmp/.../ne_50m_admin_0_countries.geojson \
 *     node tools/maat-lisaa-maailmankartalle.mjs [--kuiva]
 *
 * Miksi eri työkalu kuin tools/maat-maailmankartalle.mjs: se siirsi
 * rajat VANHALTA yhdistetyltä laudalta, ja sinne rajat tulivat vain
 * maille, joissa on kaupunki (cityCountry). Kaupungittomat maat —
 * Kirgisia, Kaukasia, Bangladesh, Laos... — jäivät kokonaan ilman
 * rengasta, ja omistaja huomasi aukon kartalla: "Kirgisia puuttuu".
 * Näille ei ole lähdelautaa, joten rajat haetaan alkuperäisestä
 * aineistosta kuten tools/aasian-rajat.mjs teki vanhalle laudalle.
 *
 * Millerin sovitus luetaan LAUDALTA ITSELTÄÄN: maailmankartan
 * kaupungeille tunnetaan sekä lon/lat (tools/vanha-maailma.mjs,
 * kaupunki-id:t ovat yhteiset) että valmis x/y, joten skaalan ja
 * siirron saa pienimmän neliösumman sovituksella. Näin työkalu ei voi
 * ajautua eri mittakaavaan kuin lauta, vaikka lukee toista lähdettä.
 *
 * Kiertävä kartta tuo yhden mutkan: x on lineaarinen pituusasteessa
 * vain modulo laudan leveys (sauma on 175°W:ssä). Siksi pystyakseli
 * sovitetaan tavallisella pienimmällä neliösummalla ja vaakasiirto
 * kierron huomioivalla mediaanilla samasta mittakaavasta — projektio
 * käyttää yhtä skaalaa molempiin suuntiin (ks. sovitaMaailma).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { miller, kaupungit, KOKO_MAAILMA } from './vanha-maailma.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const kuiva = process.argv.includes('--kuiva');
const LAHDE = process.env.NE_GEOJSON ?? join(JUURI, 'ne_50m_admin_0_countries.geojson');
const luku = (n) => Number(n.toFixed(1));

/*
 * Pienin sallittu rengas lautayksikköinä (sama henki kuin
 * tools/aasian-rajat.mjs:n MIN_KOKO): suistosaaret olisivat
 * minikartalla yksittäisiä täpliä ja kasvattaisivat pakettia turhaan.
 * Maailmankartan mittakaava (33 yks/aste) on lähellä vanhan laudan
 * mittakaavaa, joten samat rajat toimivat.
 */
const MIN_KOKO = 12;
const MIN_PISTEITA = 4;
const SIETO = 1.2;        // harvennuksen sallima poikkeama lautayksikköinä

/*
 * Lisättävät maat: suomenkielinen nimi, fi-wikipedian artikkeli ja
 * Commonsin lipputiedosto (kaikki tarkistettu Commonsista ja
 * fi.wikipediasta 13.8.2026). "Pohjois-Korea" on uudelleenohjaus kuten
 * olemassa oleva "Etelä-Korea" — artikkelinäkymä seuraa ohjauksen.
 */
const MAAT = {
  ARM: ['Armenia', 'Armenia', 'Flag of Armenia.svg'],
  AZE: ['Azerbaidžan', 'Azerbaidžan', 'Flag of Azerbaijan.svg'],
  BGD: ['Bangladesh', 'Bangladesh', 'Flag of Bangladesh.svg'],
  BTN: ['Bhutan', 'Bhutan', 'Flag of Bhutan.svg'],
  GEO: ['Georgia', 'Georgia', 'Flag of Georgia.svg'],
  KGZ: ['Kirgisia', 'Kirgisia', 'Flag of Kyrgyzstan.svg'],
  KHM: ['Kambodža', 'Kambodža', 'Flag of Cambodia.svg'],
  LAO: ['Laos', 'Laos', 'Flag of Laos.svg'],
  PRK: ['Pohjois-Korea', 'Pohjois-Korea', 'Flag of North Korea.svg'],
  TJK: ['Tadžikistan', 'Tadžikistan', 'Flag of Tajikistan.svg'],
  TKM: ['Turkmenistan', 'Turkmenistan', 'Flag of Turkmenistan.svg'],
};

/*
 * Mihin kohtaan COUNTRY_SHAPES-lohkoa kukin maa kirjoitetaan. Lohko on
 * rakennejärjestyksessä (Eurooppa, Afrikka, Lähi-itä, Aasia), joten
 * uudet maat menevät naapureidensa viereen, kukin ryhmä aakkosissa:
 * Kaukasia Irakin perään, Pohjois-Korea Etelä-Korean perään ja niin
 * edelleen.
 */
const ANKKURIT = [
  ['IRQ', ['ARM', 'AZE', 'GEO']],
  ['KOR', ['PRK']],
  ['VNM', ['KHM', 'LAO']],
  ['NPL', ['BGD', 'BTN']],
  ['UZB', ['KGZ', 'TJK', 'TKM']],
];

const { MAAILMANKARTTA } = await import(`file://${join(JUURI, 'js/packs/maailmankartta.js')}`);
const LEVEYS = MAAILMANKARTTA.map.width;

// --- Millerin sovitus laudalta -------------------------------------------------

const { kaupungit: kaikki } = await kaupungit(KOKO_MAAILMA);
const lonlat = new Map(kaikki.map((c) => [c.id, c]));

const parit = [];
for (const c of MAAILMANKARTTA.cities) {
  const g = lonlat.get(c.id);
  if (!g) continue;
  const [mx, my] = miller.eteen(g.lon, g.lat);
  parit.push({ mx, my, x: c.x, y: c.y });
}
if (parit.length < 20) throw new Error(`liian vähän vertailukaupunkeja: ${parit.length}`);

/*
 * Pystyakseli ensin: y = k*my + b on yksikäsitteinen, koska
 * leveysasteet eivät kierrä. Kolme kierrosta, huonoin viidennes pois —
 * rannalle tai maalle käsin siirretyt kaupungit eivät noudata
 * projektiota, eivätkä ne saa vetää sovitusta vinoon.
 */
function sovita(xs, ys) {
  const n = xs.length;
  const sx = xs.reduce((a, b) => a + b, 0);
  const sy = ys.reduce((a, b) => a + b, 0);
  const sxx = xs.reduce((a, b) => a + b * b, 0);
  const sxy = xs.reduce((a, b, i) => a + b * ys[i], 0);
  const k = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return { k, b: (sy - k * sx) / n };
}

let joukko = parit;
let pysty = sovita(joukko.map((p) => p.my), joukko.map((p) => p.y));
for (let kierros = 0; kierros < 3; kierros++) {
  const virheet = joukko
    .map((p) => ({ p, e: Math.abs(pysty.k * p.my + pysty.b - p.y) }))
    .sort((a, b) => a.e - b.e);
  joukko = virheet.slice(0, Math.max(20, Math.floor(virheet.length * 0.8))).map((v) => v.p);
  pysty = sovita(joukko.map((p) => p.my), joukko.map((p) => p.y));
}

// Kiertävällä laudalla skaalan PITÄÄ olla leveys / 2π — muuten sauma
// ei kohtaa itseään. Sovituksen on löydettävä sama arvo itsenäisesti.
const skaala = pysty.k;
const ero = Math.abs(skaala - LEVEYS / (2 * Math.PI)) / (LEVEYS / (2 * Math.PI));
if (ero > 0.02) throw new Error(`skaala eroaa täydestä kierroksesta ${(ero * 100).toFixed(1)} %`);

/*
 * Vaakasiirto: x_i - skaala*mx_i on vakio vain modulo laudan leveys.
 * Kierretään jäännökset ensimmäisen jäännöksen viereen ja otetaan
 * mediaani — poikkeamat ovat yksiköitä, kierrosväli tuhansia, joten
 * rypäs on yksiselitteinen.
 */
const jaannokset = parit.map((p) => {
  let r = (p.x - skaala * p.mx) % LEVEYS;
  const viite = parit[0].x - skaala * parit[0].mx;
  while (r - viite > LEVEYS / 2) r -= LEVEYS;
  while (r - viite < -LEVEYS / 2) r += LEVEYS;
  return r;
}).sort((a, b) => a - b);
const siirtoX = jaannokset[Math.floor(jaannokset.length / 2)];

const laudalle = (lon, lat) => {
  const [mx, my] = miller.eteen(lon, lat);
  const x = ((skaala * mx + siirtoX) % LEVEYS + LEVEYS) % LEVEYS;
  return [x, skaala * my + pysty.b];
};

// Sovituksen laatu mediaanilla (käsin siirretyt kaupungit ovat
// poikkeamia aineistossa, eivät virheitä sovituksessa).
const virheet = parit.map((p) => {
  let dx = ((skaala * p.mx + siirtoX) % LEVEYS + LEVEYS) % LEVEYS - p.x;
  while (dx > LEVEYS / 2) dx -= LEVEYS;
  while (dx < -LEVEYS / 2) dx += LEVEYS;
  return Math.hypot(dx, skaala * p.my + pysty.b - p.y);
}).sort((a, b) => a - b);
const mediaani = virheet[Math.floor(virheet.length / 2)];
console.log(`sovitus ${parit.length} kaupungista: skaala ${skaala.toFixed(2)} `
  + `(odotus ${(LEVEYS / (2 * Math.PI)).toFixed(2)}), mediaanipoikkeama ${mediaani.toFixed(1)}, `
  + `pahin ${virheet.at(-1).toFixed(1)} yksikköä`);
if (mediaani > 5) throw new Error('sovitus ei osu kaupunkeihin — rajoja ei kirjoiteta');

/*
 * Rengas laudalle yhtenäisenä viivana: peräkkäiset pisteet pidetään
 * samalla puolella saumaa (vrt. sovitaMaailma.muunnaViiva). Yksikään
 * näistä maista ei ylitä 175°W:tä, mutta varmistus ei maksa mitään.
 */
function viivaLaudalle(pisteet) {
  const ulos = [];
  let siirto = 0;
  let edellinen = null;
  for (const [lon, lat] of pisteet) {
    let [x, y] = laudalle(lon, lat);
    if (edellinen != null) {
      while (x + siirto - edellinen > LEVEYS / 2) siirto -= LEVEYS;
      while (x + siirto - edellinen < -LEVEYS / 2) siirto += LEVEYS;
    }
    x += siirto;
    edellinen = x;
    ulos.push([luku(x), luku(y)]);
  }
  return ulos;
}

// --- harvennus -----------------------------------------------------------------

/** Ramer–Douglas–Peucker: karsii pisteitä säilyttäen muodon. */
function harvenna(pisteet, sieto) {
  if (pisteet.length < 3) return pisteet;
  let maxD = 0;
  let kohta = 0;
  const [ax, ay] = pisteet[0];
  const [bx, by] = pisteet[pisteet.length - 1];
  const pituus = Math.hypot(bx - ax, by - ay);
  for (let i = 1; i < pisteet.length - 1; i++) {
    const [px, py] = pisteet[i];
    const d = pituus === 0
      ? Math.hypot(px - ax, py - ay)
      : Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / pituus;
    if (d > maxD) { maxD = d; kohta = i; }
  }
  if (maxD <= sieto) return [pisteet[0], pisteet[pisteet.length - 1]];
  return [
    ...harvenna(pisteet.slice(0, kohta + 1), sieto).slice(0, -1),
    ...harvenna(pisteet.slice(kohta), sieto),
  ];
}

// --- maat ----------------------------------------------------------------------

const nykyiset = MAAILMANKARTTA.map.countryShapes ?? {};
const data = JSON.parse(readFileSync(LAHDE, 'utf8'));
const piirteet = new Map();
for (const f of data.features) {
  const iso = f.properties.ADM0_A3 || f.properties.ISO_A3;
  if (iso && !piirteet.has(iso)) piirteet.set(iso, f);
}

const uudet = {};
let renkaita = 0;
for (const [iso, [nimi, wiki, lippu]] of Object.entries(MAAT)) {
  if (nykyiset[iso]) { console.log(`${iso} on jo laudalla — ohitetaan`); continue; }
  const f = piirteet.get(iso);
  if (!f) throw new Error(`${iso} ei ole Natural Earthissa`);

  const geo = f.geometry;
  const monet = geo.type === 'Polygon' ? [geo.coordinates] : geo.coordinates;
  const renkaat = [];
  for (const monikko of monet) {
    // Vain ulkoreuna: reiät (järvet) eivät näy tässä mittakaavassa.
    const rengas = viivaLaudalle(monikko[0]);
    const xs = rengas.map(([x]) => x);
    const ys = rengas.map(([, y]) => y);
    const leveys = Math.max(...xs) - Math.min(...xs);
    const korkeus = Math.max(...ys) - Math.min(...ys);
    if (leveys < MIN_KOKO && korkeus < MIN_KOKO) continue;
    const harva = harvenna(rengas, SIETO);
    if (harva.length < MIN_PISTEITA) continue;
    renkaat.push(harva);
  }
  if (!renkaat.length) throw new Error(`${iso}: ei riittävän isoa rengasta`);

  /*
   * Keskus on nimen paikka minikartalla. Natural Earthin LABEL_X/Y on
   * kartografin asettama ja parempi kuin laskettu keskipiste.
   */
  const keskus = Number.isFinite(f.properties.LABEL_X) && Number.isFinite(f.properties.LABEL_Y)
    ? viivaLaudalle([[f.properties.LABEL_X, f.properties.LABEL_Y]])[0]
    : (() => {
      const xs = renkaat.flat().map(([x]) => x);
      const ys = renkaat.flat().map(([, y]) => y);
      return [luku((Math.min(...xs) + Math.max(...xs)) / 2), luku((Math.min(...ys) + Math.max(...ys)) / 2)];
    })();

  const xs = renkaat.flat().map(([x]) => x);
  uudet[iso] = {
    nimi,
    wiki,
    lippu,
    keskus,
    leveys: luku(Math.max(...xs) - Math.min(...xs)),
    renkaat,
  };
  renkaita += renkaat.length;
  const pisteita = renkaat.reduce((s, r) => s + r.length, 0);
  console.log(`${iso}  ${nimi.padEnd(16)} ${renkaat.length} rengasta, ${pisteita} pistettä, `
    + `keskus [${keskus.join(', ')}]`);
}
console.log(`\n${Object.keys(uudet).length} maata, ${renkaita} rengasta.`);
if (kuiva) process.exit(0);

// --- kirjoitus -----------------------------------------------------------------

const polku = join(JUURI, 'js/packs/maailmankartta.js');
let teksti = readFileSync(polku, 'utf8');
let lisatty = 0;
for (const [ankkuri, isot] of ANKKURIT) {
  for (const iso of isot) {
    if (!uudet[iso]) continue;
    if (new RegExp(`^ {2}"${iso}": `, 'm').test(teksti)) continue;
    // Ankkurimaan rivin perään; ryhmän sisällä aakkosjärjestys säilyy,
    // kun jokainen uusi rivi menee edellisen lisätyn perään.
    const edellinen = isot.slice(0, isot.indexOf(iso)).reverse()
      .find((e) => new RegExp(`^ {2}"${e}": `, 'm').test(teksti)) ?? ankkuri;
    const osuma = teksti.match(new RegExp(`^ {2}"${edellinen}": .*$`, 'm'));
    if (!osuma) throw new Error(`ankkuria ${edellinen} ei löydy COUNTRY_SHAPESista`);
    const rivi = `  ${JSON.stringify(iso)}: ${JSON.stringify(uudet[iso])},`;
    teksti = teksti.replace(osuma[0], `${osuma[0]}\n${rivi}`);
    lisatty += 1;
  }
}
// Lohkon kommentti kertoo mistä rajat ovat peräisin — myös uudet.
if (!teksti.includes('maat-lisaa-maailmankartalle')) {
  teksti = teksti.replace(
    ' * (tools/maat-maailmankartalle.mjs).\n */',
    ' * (tools/maat-maailmankartalle.mjs). Kaupungittomat maat lisätty\n'
    + ' * suoraan Natural Earthin 50m-aineistosta\n'
    + ' * (tools/maat-lisaa-maailmankartalle.mjs).\n */',
  );
}
writeFileSync(polku, teksti);
console.log(`Kirjoitettu ${polku}: ${lisatty} uutta maata.`);
