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
 * Lisättävät maat: suomenkielinen nimi, fi-wikipedian artikkeli,
 * Commonsin lipputiedosto ja valinnaiset maakohtaiset asetukset
 * (kaikki nimet ja liput tarkistettu Commonsista ja fi.wikipediasta
 * 13.8.2026). "Pohjois-Korea" ja "Salomonsaaret" ovat
 * uudelleenohjauksia kuten olemassa oleva "Etelä-Korea" —
 * artikkelinäkymä seuraa ohjauksen.
 *
 * Asetukset:
 *   minKoko  renkaan pienin leveys tai korkeus (oletus MIN_KOKO);
 *            isoilla saaristomailla suurempi, ettei paketti paisu
 *   sieto    harvennuksen toleranssi (oletus SIETO); vuonorannikot
 *            (Kanada, Grönlanti, Chile) karsitaan rohkeammin
 *   sade     pisin sallittu etäisyys keskuksesta lautayksikköinä —
 *            Saint Helenan kortti näyttää saaren, ei koko Atlanttia
 *            (NE:n SHN sisältää myös Ascensionin)
 *   lisaksi  NE:n erilliset alueet, jotka kuuluvat maan muotoon,
 *            koska laudan kaupunki on siellä: San Juan on Puerto
 *            Ricossa (NE:ssä oma piirre PRI, suvereniteetti US1) ja
 *            Norfolkinsaari on NE:ssä NFK (AU1). Ei rajatulkintaa —
 *            suvereniteetti luetaan NE:stä sellaisenaan.
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
  // Eurooppa
  ALB: ['Albania', 'Albania', 'Flag of Albania.svg'],
  BEL: ['Belgia', 'Belgia', 'Flag of Belgium (civil).svg'],
  BLR: ['Valko-Venäjä', 'Valko-Venäjä', 'Flag of Belarus.svg'],
  LUX: ['Luxemburg', 'Luxemburg', 'Flag of Luxembourg.svg'],
  MDA: ['Moldova', 'Moldova', 'Flag of Moldova.svg'],
  MKD: ['Pohjois-Makedonia', 'Pohjois-Makedonia', 'Flag of North Macedonia.svg'],
  MNE: ['Montenegro', 'Montenegro', 'Flag of Montenegro.svg'],
  SRB: ['Serbia', 'Serbia', 'Flag of Serbia.svg'],
  SVK: ['Slovakia', 'Slovakia', 'Flag of Slovakia.svg'],
  SVN: ['Slovenia', 'Slovenia', 'Flag of Slovenia.svg'],
  // Aasia ja Atlantti: pienet mutta kaupungilliset — pilleri ja
  // Tutki-palsta tarvitsevat muodon, pieni rengas riittää.
  HKG: ['Hongkong', 'Hongkong', 'Flag of Hong Kong.svg', { minKoko: 0, sieto: 0.3 }],
  SGP: ['Singapore', 'Singapore', 'Flag of Singapore.svg', { minKoko: 0, sieto: 0.3 }],
  SHN: ['Saint Helena', 'Saint Helena', 'Flag of Saint Helena.svg', { minKoko: 0, sieto: 0.3, sade: 200 }],
  TLS: ['Itä-Timor', 'Itä-Timor', 'Flag of East Timor.svg'],
  // Amerikat
  ARG: ['Argentiina', 'Argentiina', 'Flag of Argentina.svg', { sieto: 2 }],
  BOL: ['Bolivia', 'Bolivia', 'Flag of Bolivia.svg'],
  BRA: ['Brasilia', 'Brasilia', 'Flag of Brazil.svg', { sieto: 2 }],
  CAN: ['Kanada', 'Kanada', 'Flag of Canada.svg', { minKoko: 50, sieto: 6 }],
  CHL: ['Chile', 'Chile', 'Flag of Chile.svg', { minKoko: 15, sieto: 3 }],
  COL: ['Kolumbia', 'Kolumbia', 'Flag of Colombia.svg'],
  CUB: ['Kuuba', 'Kuuba', 'Flag of Cuba.svg'],
  ECU: ['Ecuador', 'Ecuador', 'Flag of Ecuador.svg'],
  GRL: ['Grönlanti', 'Grönlanti', 'Flag of Greenland.svg', { minKoko: 50, sieto: 6 }],
  GTM: ['Guatemala', 'Guatemala', 'Flag of Guatemala.svg'],
  MEX: ['Meksiko', 'Meksiko', 'Flag of Mexico.svg', { sieto: 2 }],
  NIC: ['Nicaragua', 'Nicaragua', 'Flag of Nicaragua.svg'],
  PAN: ['Panama', 'Panama', 'Flag of Panama.svg'],
  PER: ['Peru', 'Peru', 'Flag of Peru.svg'],
  URY: ['Uruguay', 'Uruguay', 'Flag of Uruguay.svg'],
  USA: ['Yhdysvallat', 'Yhdysvallat', 'Flag of the United States.svg', { minKoko: 25, sieto: 4, lisaksi: ['PRI'] }],
  VEN: ['Venezuela', 'Venezuela', 'Flag of Venezuela.svg'],
  // Oseania
  AUS: ['Australia', 'Australia', 'Flag of Australia.svg', { minKoko: 15, sieto: 2, lisaksi: ['NFK'] }],
  FJI: ['Fidži', 'Fidži', 'Flag of Fiji.svg'],
  NZL: ['Uusi-Seelanti', 'Uusi-Seelanti', 'Flag of New Zealand.svg', { sieto: 1.6 }],
  PNG: ['Papua-Uusi-Guinea', 'Papua-Uusi-Guinea', 'Flag of Papua New Guinea.svg', { sieto: 1.6 }],
  SLB: ['Salomonsaaret', 'Salomonsaaret', 'Flag of the Solomon Islands.svg'],
  VUT: ['Vanuatu', 'Vanuatu', 'Flag of Vanuatu.svg'],
};

/*
 * Mihin kohtaan COUNTRY_SHAPES-lohkoa kukin maa kirjoitetaan. Lohko on
 * rakennejärjestyksessä (Eurooppa, Afrikka, Lähi-itä, Aasia, ...),
 * joten uudet maat menevät naapureidensa viereen tai oman alueensa
 * ryhmäksi, kukin ryhmä aakkosissa: Kaukasia Irakin perään,
 * Pohjois-Korea Etelä-Korean perään, Amerikat ja Oseania omiksi
 * lohkoikseen loppuun ja niin edelleen. Käsitellään järjestyksessä,
 * joten ankkuri saa olla myös samalla ajolla kirjoitettu maa (VEN).
 */
const ANKKURIT = [
  ['IRQ', ['ARM', 'AZE', 'GEO']],
  ['KOR', ['PRK']],
  ['VNM', ['KHM', 'LAO']],
  ['NPL', ['BGD', 'BTN']],
  ['UZB', ['KGZ', 'TJK', 'TKM']],
  ['DNK', ['ALB', 'BEL', 'BLR', 'LUX', 'MDA', 'MKD', 'MNE', 'SRB', 'SVK', 'SVN']],
  ['MDG', ['SHN']],
  ['CHN', ['HKG']],
  ['MYS', ['SGP']],
  ['IDN', ['TLS']],
  ['TKM', ['ARG', 'BOL', 'BRA', 'CAN', 'CHL', 'COL', 'CUB', 'ECU', 'GRL', 'GTM', 'MEX', 'NIC', 'PAN', 'PER', 'URY', 'USA', 'VEN']],
  ['VEN', ['AUS', 'FJI', 'NZL', 'PNG', 'SLB', 'VUT']],
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

/*
 * Päivämäärärajalla katkaistujen renkaiden liitos (vrt.
 * tools/yhdista-paivamaararaja.mjs). Natural Earth on leikattu 180.
 * pituuspiirillä; Fidžin saaret jatkuvat sen yli ja olisivat muuten
 * kahtena monikulmiona, joiden välissä näkyisi pystyviiva keskellä
 * saarta. Leikkauksen jälki on yksikäsitteinen: kaksi rengasta, joissa
 * on TÄSMÄLLEEN sama pystysuora jana vastakkaisiin suuntiin
 * kuljettuna. Pituusvaatimusta ei ole — Fidžin leikkausjanat ovat
 * lyhyitä — mutta parivaatimus estää luonnollisen pystyrannikon
 * virheliitoksen.
 */
function liitaKatkaistut(renkaat) {
  const SIETO_X = 0.6;
  const jana = (rengas) => {
    const ulos = [];
    for (let k = 1; k < rengas.length; k++) {
      const [x1, y1] = rengas[k - 1];
      const [x2, y2] = rengas[k];
      if (Math.abs(x1 - x2) > SIETO_X) continue;
      if (Math.abs(y1 - y2) < 2) continue;
      ulos.push({ kohta: k - 1, x: x1, ya: y1, yb: y2 });
    }
    return ulos;
  };
  // Rengas auki leikkausjanan kohdalta: kierretään niin, että jana on
  // lopussa, ja pudotetaan se pois (sama kuin yhdista-paivamaararaja).
  const avaa = (rengas, kohta) => {
    const suljettu = rengas[0][0] === rengas.at(-1)[0] && rengas[0][1] === rengas.at(-1)[1];
    const pisteet = suljettu ? rengas.slice(0, -1) : rengas.slice();
    const n = pisteet.length;
    const ulos = [];
    for (let i = 1; i < n; i++) ulos.push(pisteet[(kohta + 1 + i) % n]);
    ulos.unshift(pisteet[(kohta + 1) % n]);
    return ulos;
  };
  let taas = true;
  while (taas) {
    taas = false;
    ulko: for (let i = 0; i < renkaat.length; i++) {
      for (const a of jana(renkaat[i])) {
        for (let k = i + 1; k < renkaat.length; k++) {
          for (const b of jana(renkaat[k])) {
            if (Math.abs(a.x - b.x) > SIETO_X) continue;
            if (Math.abs(a.ya - b.yb) > 2 || Math.abs(a.yb - b.ya) > 2) continue;
            const liitos = [...avaa(renkaat[i], a.kohta), ...avaa(renkaat[k], b.kohta)];
            liitos.push([...liitos[0]]);
            renkaat.splice(k, 1);
            renkaat.splice(i, 1, liitos);
            taas = true;
            continue ulko;
          }
        }
      }
    }
  }
  return renkaat;
}

/** Onko piste renkaan sisällä? Säteenheitto laudan tasossa. */
const sisalla = ([px, py], rengas) => {
  let osuu = false;
  for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
    const [xi, yi] = rengas[i];
    const [xj, yj] = rengas[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) osuu = !osuu;
  }
  return osuu;
};

// --- maat ----------------------------------------------------------------------

const nykyiset = MAAILMANKARTTA.map.countryShapes ?? {};
const cityCountry = MAAILMANKARTTA.map.cityCountry ?? {};
const data = JSON.parse(readFileSync(LAHDE, 'utf8'));
const piirteet = new Map();
for (const f of data.features) {
  const iso = f.properties.ADM0_A3 || f.properties.ISO_A3;
  if (iso && !piirteet.has(iso)) piirteet.set(iso, f);
}

const uudet = {};
let renkaita = 0;
let pisteitaKaikkiaan = 0;
for (const [iso, [nimi, wiki, lippu, asetukset = {}]] of Object.entries(MAAT)) {
  if (nykyiset[iso]) { console.log(`${iso} on jo laudalla — ohitetaan`); continue; }
  const f = piirteet.get(iso);
  if (!f) throw new Error(`${iso} ei ole Natural Earthissa`);
  const minKoko = asetukset.minKoko ?? MIN_KOKO;
  const sieto = asetukset.sieto ?? SIETO;

  /*
   * Keskus on nimen paikka minikartalla. Natural Earthin LABEL_X/Y on
   * kartografin asettama ja parempi kuin laskettu keskipiste. Se
   * lasketaan ENNEN renkaita, koska renkaat keskitetään sen ympärille.
   */
  let keskus = Number.isFinite(f.properties.LABEL_X) && Number.isFinite(f.properties.LABEL_Y)
    ? viivaLaudalle([[f.properties.LABEL_X, f.properties.LABEL_Y]])[0]
    : null;

  // Maan omat kaupungit laudalla: saari, jolla on pysäkki, säilyy
  // vaikka olisi kuinka pieni (Robinson Crusoe, Galápagos, Hawaii) —
  // muuten kaupunki jäisi seisomaan tyhjän meren päälle.
  const omatKaupungit = MAAILMANKARTTA.cities.filter((c) => cityCountry[c.id] === iso);

  const piirreLista = [f, ...(asetukset.lisaksi ?? []).map((extra) => {
    const lisa = piirteet.get(extra);
    if (!lisa) throw new Error(`${iso}: lisäaluetta ${extra} ei ole Natural Earthissa`);
    return lisa;
  })];
  const monet = piirreLista.flatMap((piirre) => (piirre.geometry.type === 'Polygon'
    ? [piirre.geometry.coordinates] : piirre.geometry.coordinates));
  let raakile = [];
  for (const monikko of monet) {
    // Vain ulkoreuna: reiät (järvet) eivät näy tässä mittakaavassa.
    let rengas = viivaLaudalle(monikko[0]);
    /*
     * Kiertävällä laudalla rengas voi päätyä eri kierrokselle kuin
     * maan keskus: Aleutit jatkuvat sauman (175°W) yli ja putoaisivat
     * muuten kartan oikeaan laitaan Alaskan ollessa vasemmalla.
     * Siirretään rengas sille kierrokselle, jolla se on lähimpänä
     * keskusta — piirtäjä toistaa kartan molemmin puolin, joten
     * negatiivinenkin x osuu naapurikopioon.
     */
    if (keskus) {
      const keskiX = rengas.reduce((s, [x]) => s + x, 0) / rengas.length;
      const siirto = Math.round((keskus[0] - keskiX) / LEVEYS) * LEVEYS;
      if (siirto) rengas = rengas.map(([x, y]) => [luku(x + siirto), y]);
    }
    raakile.push(rengas);
  }
  raakile = liitaKatkaistut(raakile);

  const renkaat = [];
  for (const rengas of raakile) {
    const xs = rengas.map(([x]) => x);
    const ys = rengas.map(([, y]) => y);
    if (asetukset.sade && keskus) {
      const kx = (Math.max(...xs) + Math.min(...xs)) / 2;
      const ky = (Math.max(...ys) + Math.min(...ys)) / 2;
      if (Math.hypot(kx - keskus[0], ky - keskus[1]) > asetukset.sade) continue;
    }
    const leveys = Math.max(...xs) - Math.min(...xs);
    const korkeus = Math.max(...ys) - Math.min(...ys);
    /*
     * Pakollinen rengas: laudan kaupunki on sen sisällä TAI aivan sen
     * vieressä. Läheisyys tarvitaan, koska satamakaupungit on
     * siirretty käsin rannalle ja pieni saarikaupunki (Honolulu,
     * Kap Horn) voi seistä hiuksenhienosti renkaansa ulkopuolella —
     * ilman sitä saari karsiutuisi ja kaupunki jäisi tyhjän meren
     * päälle.
     */
    const laatikossa = ([px, py]) => px > Math.min(...xs) - 12 && px < Math.max(...xs) + 12
      && py > Math.min(...ys) - 12 && py < Math.max(...ys) + 12;
    const pakollinen = omatKaupungit.some((c) => [c.x, c.x - LEVEYS, c.x + LEVEYS]
      .some((x) => sisalla([x, c.y], rengas)
        || ((leveys < 60 && korkeus < 60) && laatikossa([x, c.y]))));
    if (!pakollinen && leveys < minKoko && korkeus < minKoko) continue;
    const harva = harvenna(rengas, pakollinen ? Math.min(sieto, SIETO) / 2 : sieto);
    if (!pakollinen && harva.length < MIN_PISTEITA) continue;
    renkaat.push(harva.length < MIN_PISTEITA ? rengas : harva);
  }
  if (!renkaat.length) throw new Error(`${iso}: ei riittävän isoa rengasta`);

  if (!keskus) {
    const xs = renkaat.flat().map(([x]) => x);
    const ys = renkaat.flat().map(([, y]) => y);
    keskus = [luku((Math.min(...xs) + Math.max(...xs)) / 2), luku((Math.min(...ys) + Math.max(...ys)) / 2)];
  }

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
  pisteitaKaikkiaan += pisteita;
  console.log(`${iso}  ${nimi.padEnd(18)} ${String(renkaat.length).padStart(3)} rengasta, `
    + `${String(pisteita).padStart(5)} pistettä, keskus [${keskus.join(', ')}]`);
}
console.log(`\n${Object.keys(uudet).length} maata, ${renkaita} rengasta, ${pisteitaKaikkiaan} pistettä.`);

// Tarkistus: kaupungin pitää osua oman maansa rajojen sisään (kierto
// huomioiden). Poikkeamat raportoidaan, ei kaadeta — esimerkiksi
// San Juan on Puerto Ricossa, joka on NE:ssä oma alueensa (PRI).
const ohi = [];
for (const c of MAAILMANKARTTA.cities) {
  const iso = cityCountry[c.id];
  const maa = iso && uudet[iso];
  if (!maa) continue;
  const kohdat = [c.x, c.x - LEVEYS, c.x + LEVEYS];
  if (!maa.renkaat.some((r) => kohdat.some((x) => sisalla([x, c.y], r)))) {
    ohi.push(`${c.id} (${iso})`);
  }
}
if (ohi.length) console.log(`\nHUOM: rajojen ulkopuolella: ${ohi.join(', ')}`);
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
