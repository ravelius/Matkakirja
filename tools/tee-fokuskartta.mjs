/*
 * FOKUSKARTTA: yhden maan esirenderöity topografiapohja pelilaudalle.
 *
 *   node tools/tee-fokuskartta.mjs GRC /polku/kohdekansioon \
 *        [--data <raaka-aineiston kansio>] [--leveys 6400] [--laatu 0.9]
 *        [--png] [--vuoto <osuus>] [--tarkistus] [--esikatselu]
 *
 * Tuottaa kohdekansioon kaksi tiedostoa:
 *
 *   GRC.webp   kokonainen 1873-atlaksen lehti: opaakki paperi, meren
 *              syvyysporrastus, akvarellihypsometria, naapurit haaleina
 *              ääriviivoina, merten ja vuorten nimet, asteverkko,
 *              kehys, kartuutsi ja mittajana
 *   GRC.json   kuvan paikka LAUDAN koordinaateissa
 *
 * Molemmat viedään ämpäriin kansioon `fokus/` (kuten julisteet), ja peli
 * lataa ne js/fokuskartta.js:n kautta. Repoon ei tule kumpaakaan.
 *
 * === KRIITTINEN KOHTA: TASAUS ===
 *
 * Kuva ei ole kuvitusta vaan karttaa, ja sen on osuttava laudan
 * koordinaatistoon. Pelilauta (maailmankartta) on Millerin lieriössä ja
 * maanosalaudat tasavälisessä projektiossa; molemmat kaavat asuvat
 * yhdessä paikassa (tools/fokuskartta/piirto.js laudanProjektio), jota
 * sekä tämä työkalu että piirtomoottori käyttävät.
 *
 * Kuva renderöidään laudan omalla kaavalla tunnettuun rajauslaatikkoon,
 * ja laatikko kirjoitetaan JSONiin: peli asettaa <image>-elementin
 * siihen eikä arvaa mitään. JSONissa on myös laudan tunnus, ja peli
 * jättää kuvan käyttämättä väärällä laudalla — sama tiedostonimi eri
 * projektiossa olisi pahin mahdollinen virhe, koska kuva näyttäisi
 * oikealta mutta olisi väärässä paikassa.
 *
 * Tasaus todennetaan joka ajossa (`tarkistaProjektio`): laudan omien
 * kaupunkien koordinaatit lasketaan uudelleen tunnetuista asteista, ja
 * jos ero on yli TASAUKSEN_RAJA lautayksikköä, ajo kaatuu. `--tarkistus`
 * kirjoittaa lisäksi kuvan, jossa on laudan oma maarengas punaisella ja
 * risti kaupungin laattakoordinaatissa — silmällä katsottava todiste.
 *
 * === LEHTI JA VUOTO: KAKSI LAATIKKOA ===
 *
 * Rajaus EI enää ole maan oma laatikko pienellä marginaalilla, vaan
 * tyylitiedoston (tools/fokuskartta/maat.mjs) antama LEHDEN IKKUNA:
 * prototyypin sommittelu, jossa Kreikan ympärillä on merta, naapureita
 * ja tilaa kartuutsille. Sen ympärille renderöidään VUOTOA — pelkkää
 * lisää samaa paperia — koska ruudun kuvasuhde ei ole koskaan lehden
 * kuvasuhde: kamera-ajo (js/kartta.js kameranKohde) sovittaa ikkunan
 * ruutuun ja näyttää siitä yli menevässä suunnassa aina hitusen
 * enemmän. Ilman vuotoa siihen jäisi sauma laudan omaan grafiikkaan.
 *
 * JSONiin (ja js/packs/fokus-grc.js FOKUS_POHJAT -tauluun) kirjataan
 * molemmat: `bbox` on kuvan paikka, `rajaus` on se laatikko, johon peli
 * ajaa kameran.
 *
 * Aineisto ja lähteet: tools/fokuskartta/aineisto.mjs.
 * Lehden käsin aseteltavat asiat: tools/fokuskartta/maat.mjs.
 * Piirtomoottori (ajetaan selaimessa): tools/fokuskartta/piirto.js.
 */
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { keraaAineisto } from './fokuskartta/aineisto.mjs';
import { FOKUSMAAT } from './fokuskartta/maat.mjs';
// Sama projektio kuin piirtomoottorilla — yksi kaava, ei kahta kopiota.
import { laudanProjektio } from './fokuskartta/piirto.js';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..');

/*
 * LAUDAT JA NIIDEN PROJEKTIOT — PELILAUTA ENSIN.
 *
 * Peliä pelataan yhdellä laudalla (js/pack.js: maailmankartta);
 * maanosalaudat ovat enää datan lähde ja katselutila (?lauta=europe).
 * Siksi kuva tehdään maailmankartalle, ja Eurooppa on listassa vain
 * katselutilaa varten — ensimmäinen lauta, jolta maa löytyy, voittaa.
 *
 * Maailmankartan luvut ovat tools/tee-maailmankartta.mjs:n vakioita
 * (LEVEYS 12000, LON0 -175, POHJOINEN 76) ja kaava sen käyttämä Millerin
 * lieriö (tools/vanha-maailma.mjs sovitaMaailma). Mitattu tässä
 * työkalussa joka ajossa: yhdellätoista tunnetulla kaupungilla ero on
 * alle yksikön (ks. tarkistaProjektio).
 */
const LAUDAT = [
  {
    id: 'maailmankartta',
    moduuli: './js/packs/maailmankartta.js',
    vienti: 'MAAILMANKARTTA',
    projektio: {
      tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
    },
  },
  {
    id: 'europe',
    moduuli: './js/packs/europe.js',
    vienti: 'EUROPE',
    // x = (lon + 11) * 19.2, y = (72 - lat) * 26.3
    projektio: {
      tyyppi: 'tasavali', lonA: 19.2, lonB: 11 * 19.2, latA: -26.3, latB: 72 * 26.3,
    },
  },
];

/*
 * TASAUKSEN TARKISTUSPISTEET: kaupungin laudan tunnus ja sen todellinen
 * sijainti asteina. Luvut ovat Wikipediasta / Natural Earthista ja
 * pyöristettyjä neljään desimaaliin — laudalla yksi desimaali on
 * kolmisen sataa metriä, joten tarkkuus riittää moninkertaisesti.
 */
const TARKISTUSPISTEET = {
  ateena: { nimi: 'Ateena', lon: 23.7275, lat: 37.9838 },
  rooma: { nimi: 'Rooma', lon: 12.4964, lat: 41.9028 },
  lontoo: { nimi: 'Lontoo', lon: -0.1276, lat: 51.5072 },
  helsinki: { nimi: 'Helsinki', lon: 24.9384, lat: 60.1699 },
  lissabon: { nimi: 'Lissabon', lon: -9.1393, lat: 38.7223 },
  istanbul: { nimi: 'Istanbul', lon: 28.9784, lat: 41.0082 },
  pariisi: { nimi: 'Pariisi', lon: 2.3522, lat: 48.8566 },
  madrid: { nimi: 'Madrid', lon: -3.7038, lat: 40.4168 },
  berliini: { nimi: 'Berliini', lon: 13.405, lat: 52.52 },
  wien: { nimi: 'Wien', lon: 16.3738, lat: 48.2082 },
  kairo: { nimi: 'Kairo', lon: 31.2357, lat: 30.0444 },
};
/*
 * Suurin sallittu ero lautayksikköinä. Laatat on aseteltu kokonaisiin
 * yksiköihin, joten puolen yksikön pyöristysvirhe on odotettu; kaksi
 * yksikköä on jo merkki siitä, että kaava on eri.
 *
 * RAJA ON EHDOTON VAIN KOHDEMAAN KAUPUNGEILLE. Osa laudan laatoista on
 * siirretty käsin, jotta nimet mahtuvat (js/packs/europe.js: "Wieniä,
 * Budapestia ja Alppeja on siirretty muutama yksikkö") tai jotta laatta
 * osuu piirretylle rannikolle — esimerkiksi Helsinki on kahdeksan
 * yksikköä todellisesta paikastaan. Ne eivät kerro projektiosta mitään,
 * joten muilta kaupungeilta vaaditaan vain, ettei MEDIAANI ylitä rajaa:
 * väärä kaava siirtäisi kaikkia, ei yhtä.
 */
const TASAUKSEN_RAJA = 2;

/* ------------------------------------------------------------ argumentit */

const argv = process.argv.slice(2);
const iso = (argv[0] ?? '').toUpperCase();
const kohdekansio = argv[1];
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const lippu = (nimi) => argv.includes(`--${nimi}`);

if (!/^[A-Z]{3}$/.test(iso) || !kohdekansio) {
  console.error('Käyttö: node tools/tee-fokuskartta.mjs GRC <kohdekansio> '
    + '[--data <kansio>] [--leveys 6400] [--laatu 0.9] [--png] '
    + '[--vuoto <osuus>] [--tarkistus] [--esikatselu]');
  process.exit(1);
}

const dataKansio = resolve(valitsin('data',
  process.env.FOKUSKARTTA_DATA ?? join(tmpdir(), 'matkakirja-fokuskartta')));
/*
 * Kuvan leveys pikseleinä.
 *
 * Omistajan iPad-havainto v1095:stä: *"taustakartan resoluutio ylös —
 * kuva pikselöityy fokuszoomilla"*, ja ohje oli vähintään kaksinkertainen
 * entiseen 2400 pikseliin nähden. 6400 on 2,7-kertainen leveys ja
 * 3,8-kertainen pikselimäärä.
 *
 * MIKSI EI VIELÄ ISOMPI, vaikka tiedosto mahtuisi budjettiin (6400 on
 * 1,5 Mt ja 9600 olisi 2,8 Mt eli yhä alle neljän)? Koska rajoite ei ole
 * tiedostokoko vaan iOS:n PURETTU kuva. 6400 x 4000 on 25,6
 * megapikseliä eli noin 100 Mt muistia; 9600 x 6000 olisi 230 Mt.
 * Suurin kuva, jonka peli on tähän asti vienyt läpi omistajan iPadilla,
 * on 6,8 megapikseliä (edellinen fokuspohja), ja repon muut suurimmat
 * ovat 5–6 megapikseliä. Kahdeksankertainen loikka tunnetun rajan yli
 * on juuri se tapa, jolla iOS jättää kuvan lataamatta — ja silloin
 * pelaaja ei näkisi karttaa lainkaan, mikä on paljon pahempi vika kuin
 * pehmeys lähimmällä zoomiportaalla.
 *
 * Ratkaiseva ero entiseen on joka tapauksessa se, että fokusrajauksessa
 * lehti näkyy KOKONAAN eikä sitä enää suurenneta: iPadin
 * verkkokalvonäytöllä kuvaa on tällöin noin kaksinkertaisesti yli
 * tarpeen. Jos lähin zoomiporras osoittautuu silti pehmeäksi, `--leveys
 * 9600` on yhden valitsimen päässä — mutta se on mitattava iPadilla
 * ennen kuin se jää päälle.
 */
const kuvaLeveys = Number(valitsin('leveys', 6400));

/*
 * TALLENNUSMUOTO: WebP, läpinäkyvyys mukana.
 *
 * Aineisto on rakeista akvarellia, joka ei pakkaudu häviöttömästi:
 * Kreikka on PNG:nä 2400 pikselin levyisenä yli viisi megatavua mutta
 * WebPinä laatuarvolla 0,9 vajaan megatavun. Ero on niin suuri, että se
 * ratkaisee koko kuvakoon — WebPillä kuva voi olla pelin lähimmän
 * zoomiportaan tarkkuinen, PNG:llä ei. Muoto on ollut pelissä käytössä
 * jo linssikartoilla (assets/linssit/topografia.webp).
 *
 * --png pakottaa häviöttömään PNG:hen, jos jokin joskus vaatii sen.
 */
const MUOTO = lippu('png') ? 'png' : 'webp';
const LAATU = Number(valitsin('laatu', 0.9));
/*
 * Vuoto osuutena lehden koosta (ks. tiedoston alku). Oletus tulee
 * tyylitiedostosta; `--vuoto` on vain kokeilua varten.
 */
const vuotoValitsin = valitsin('vuoto', null);

/* ------------------------------------------------------------ lauta ja bbox */

let lauta = null;
let muodot = null;
let pack = null;
for (const ehdokas of LAUDAT) {
  // eslint-disable-next-line no-await-in-loop
  const moduuli = await import(ehdokas.moduuli.replace('./', `${JUURI}/`));
  const p = moduuli[ehdokas.vienti];
  if (p?.map?.countryShapes?.[iso]) {
    lauta = ehdokas; muodot = p.map.countryShapes; pack = p;
    break;
  }
}
if (!lauta) {
  console.error(`Maata ${iso} ei ole yhdelläkään laudalla, jonka projektio on tiedossa `
    + `(${LAUDAT.map((l) => l.id).join(', ')}).`);
  process.exit(1);
}

const renkaat = muodot[iso].renkaat;

const tyyli = FOKUSMAAT[iso];
if (!tyyli) {
  console.error(`Maalle ${iso} ei ole lehden tyyliä (tools/fokuskartta/maat.mjs).\n`
    + 'Lehti on kokonainen atlaksen sivu — merten nimet, kartuutsi ja ikkuna\n'
    + 'ovat karttatypografiaa, joita ei saa aineistosta. Lisää maalle oma\n'
    + 'osio FOKUSMAAT-tauluun ja aja uudestaan.');
  process.exit(1);
}

const { projektio } = lauta;
const kaava = laudanProjektio(projektio);

/*
 * LEHTI (rajaus) ja KUVA (bbox).
 *
 * Ikkunan LEVEYSASTEET ovat sommittelun kiinnityspiste (maat.mjs), ja
 * pituusasteiden väli lasketaan kuvasuhteesta laudan omalla kaavalla.
 * Näin päin siksi, että lauta ratkaisee, montako yksikköä leveysaste on
 * — sama lat-väli on Millerin lieriössä eri korkuinen kuin prototyypin
 * Mercatorissa, ja jos lehti mitoitettaisiin pituusasteista, maa
 * kutistuisi kehyksen sisään eri kokoisena joka laudalla.
 */
const vuoto = vuotoValitsin != null ? Number(vuotoValitsin) : (tyyli.vuoto ?? 0.15);
const { laudanRajaus, laudanBbox } = (() => {
  const { lonKeski, lat0, lat1, kuvasuhde } = tyyli.ikkuna;
  const y0 = kaava.lautaY(lat1);
  const h = kaava.lautaY(lat0) - y0;
  const w = h * kuvasuhde;
  const rajausLaatikko = { x: kaava.lautaX(lonKeski) - w / 2, y: y0, w, h };
  return {
    laudanRajaus: rajausLaatikko,
    laudanBbox: {
      x: rajausLaatikko.x - w * vuoto,
      y: rajausLaatikko.y - h * vuoto,
      w: w * (1 + 2 * vuoto),
      h: h * (1 + 2 * vuoto),
    },
  };
})();
// Aineiston laatikko puoli astetta väljempi joka suuntaan: rannikko saa
// jatkua kuvan reunan yli, jotta reunaan ei jää katkennutta viivaa.
const laatikko = {
  lon0: kaava.lautaLon(laudanBbox.x) - 0.5,
  lon1: kaava.lautaLon(laudanBbox.x + laudanBbox.w) + 0.5,
  lat0: kaava.lautaLat(laudanBbox.y + laudanBbox.h) - 0.5,
  lat1: kaava.lautaLat(laudanBbox.y) + 0.5,
};

/* ------------------------------------------------------------ tasaus */

/**
 * Todistaa, että laudan kaupungit osuvat samaan paikkaan kuin projektio
 * laskee. Palauttaa rivit raporttiin ja kaataa ajon, jos ero on liian
 * suuri.
 */
function tarkistaProjektio() {
  const rivit = [];
  const omat = pack.map.cityCountry ?? {};
  for (const kaupunki of pack.cities) {
    const piste = TARKISTUSPISTEET[kaupunki.id];
    if (!piste) continue;
    const x = kaava.lautaX(piste.lon);
    const y = kaava.lautaY(piste.lat);
    const ero = Math.hypot(x - kaupunki.x, y - kaupunki.y);
    rivit.push({
      id: kaupunki.id,
      nimi: piste.nimi,
      kohdemaassa: omat[kaupunki.id] === iso,
      lauta: [kaupunki.x, kaupunki.y],
      projektio: [Math.round(x * 10) / 10, Math.round(y * 10) / 10],
      ero: Math.round(ero * 100) / 100,
    });
  }
  if (!rivit.length) throw new Error('Yhtään tarkistuspistettä ei löytynyt laudalta.');
  // 1. Kohdemaan omat kaupungit: näiden ON osuttava maastoon.
  for (const r of rivit.filter((v) => v.kohdemaassa)) {
    if (r.ero > TASAUKSEN_RAJA) {
      throw new Error(`Tasaus pettää: ${r.nimi} on ${r.ero} lautayksikköä sivussa `
        + `(raja ${TASAUKSEN_RAJA}). Kuva ei osuisi laattaan.`);
    }
  }
  if (!rivit.some((r) => r.kohdemaassa)) {
    console.warn(`  VAROITUS: maalla ${iso} ei ole yhtään tarkistuspistettä — `
      + 'tasaus jää yleisen mediaanin varaan.');
  }
  // 2. Koko lauta: väärä kaava siirtäisi kaikkia, ei yhtä.
  const erot = rivit.map((r) => r.ero).sort((a, b) => a - b);
  const mediaani = erot[Math.floor(erot.length / 2)];
  if (mediaani > TASAUKSEN_RAJA) {
    throw new Error(`Tasaus pettää: erojen mediaani ${mediaani} lautayksikköä `
      + `(raja ${TASAUKSEN_RAJA}). Projektio ei vastaa laudan kaavaa.`);
  }
  return rivit;
}

const tasaus = tarkistaProjektio();

/* ------------------------------------------------------------ aineisto */

console.log(`Fokuskartta ${iso} — lauta ${lauta.id}`);
console.log(`  lehti laudalla  x ${laudanRajaus.x.toFixed(1)} y ${laudanRajaus.y.toFixed(1)} `
  + `w ${laudanRajaus.w.toFixed(1)} h ${laudanRajaus.h.toFixed(1)}`);
console.log(`  kuva laudalla   x ${laudanBbox.x.toFixed(1)} y ${laudanBbox.y.toFixed(1)} `
  + `w ${laudanBbox.w.toFixed(1)} h ${laudanBbox.h.toFixed(1)}  (vuoto ${vuoto})`);
console.log(`  asteina         lon ${laatikko.lon0.toFixed(2)}..${laatikko.lon1.toFixed(2)} `
  + `lat ${laatikko.lat0.toFixed(2)}..${laatikko.lat1.toFixed(2)}`);
console.log(`  aineisto        ${dataKansio}`);

const aineisto = keraaAineisto({
  kansio: dataKansio,
  iso,
  laatikko,
  naapurit: (tyyli.naapurit ?? []).map((n) => n.iso),
});
console.log(`  renkaat ${aineisto.maa.renkaat.length} · joet ${aineisto.joet.length} `
  + `· järvet ${aineisto.jarvet.length} · naapurit `
  + `${Object.keys(aineisto.naapurit).join(' ') || '–'} · korkeusruudukko `
  + `${aineisto.korkeus.w}x${aineisto.korkeus.h} `
  + `(lon ${aineisto.korkeus.lon0}..${aineisto.korkeus.lon1} `
  + `lat ${aineisto.korkeus.lat0}..${aineisto.korkeus.lat1})`);
/*
 * Korkeusruudukon on katettava koko kuva, muuten meren syvyysporrastus
 * vaihtuu tasaiseksi sävyksi ja kuvaan jää suora sauma (ks.
 * aineisto.mjs). Varoitus eikä kaatuminen: rannikkomaalla ruudukon
 * kulma voi olla mantereen sisällä, jolloin sillä ei ole väliä.
 */
if (aineisto.korkeus.lon0 > laatikko.lon0 + 0.5
  || aineisto.korkeus.lon1 < laatikko.lon1 - 0.5
  || aineisto.korkeus.lat0 > laatikko.lat0 + 0.5
  || aineisto.korkeus.lat1 < laatikko.lat1 - 0.5) {
  console.warn('  VAROITUS: korkeusruudukko ei kata koko kuvaa — meren sävyyn '
    + 'voi jäädä sauma. Hae leveämmät etopo-kaistat.');
}

for (const r of tasaus) {
  console.log(`  tasaus ${r.nimi.padEnd(10)} lauta ${r.lauta.join(',')} `
    + `→ projektio ${r.projektio.join(',')} (ero ${r.ero})`
    + (r.kohdemaassa ? '  ← kohdemaa, ehdoton raja' : ''));
}

/* ------------------------------------------------------------ piirto */

const tyokansio = join(tmpdir(), `fokuskartta-${iso}-${process.pid}`);
mkdirSync(tyokansio, { recursive: true });
writeFileSync(join(tyokansio, 'aineisto.json'), JSON.stringify(aineisto));

const SIVU = `<!doctype html><meta charset="utf-8"><title>fokuskartta</title>
<body style="margin:0;background:#333"><canvas id="k"></canvas>
<script type="module">
  import { piirra } from './piirto.js';
  const aineisto = await (await fetch('./aineisto.json')).json();
  const asetukset = JSON.parse(document.currentScript?.dataset?.asetukset
    ?? new URLSearchParams(location.search).get('asetukset'));
  const mitat = piirra(document.getElementById('k'), aineisto, asetukset);
  window.__mitat = mitat;
  document.body.dataset.valmis = '1';
</script>`;

const TYYPIT = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json' };
const palvelin = createServer((req, res) => {
  const polku = decodeURIComponent(req.url.split('?')[0]);
  if (polku === '/' || polku === '/index.html') {
    res.writeHead(200, { 'content-type': TYYPIT['.html'] });
    res.end(SIVU);
    return;
  }
  // Selain pyytää kuvakkeen itsestään; tyhjä vastaus pitää konsolin
  // puhtaana, jolloin virhelista kertoo vain oikeista virheistä.
  if (polku === '/favicon.ico') { res.writeHead(204); res.end(); return; }
  const lahteet = {
    '/piirto.js': join(TAALLA, 'fokuskartta', 'piirto.js'),
    '/aineisto.json': join(tyokansio, 'aineisto.json'),
  };
  const tiedosto = lahteet[polku];
  if (!tiedosto) { res.writeHead(404); res.end('ei'); return; }
  res.writeHead(200, { 'content-type': polku.endsWith('.json') ? TYYPIT['.json'] : TYYPIT['.js'] });
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, '127.0.0.1', ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

// Playwright repon node_modulesista, muuten kontin globaalista (sama
// kaava kuin tools/savukkeet/README.md kuvaa).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
  args: ['--no-sandbox'],
});

/** Yksi renderöinti; palauttaa PNG-puskurin ja kuvan mitat. */
async function renderoi(asetukset) {
  const sivu = await selain.newPage({ viewport: { width: 400, height: 300 } });
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  sivu.on('console', (m) => { if (m.type() === 'error') virheet.push(m.text()); });
  const kysely = `?asetukset=${encodeURIComponent(JSON.stringify(asetukset))}`;
  await sivu.goto(osoite + kysely, { waitUntil: 'load' });
  await sivu.waitForSelector('body[data-valmis="1"]', { timeout: 600000 })
    .catch(() => { throw new Error(`Piirto ei valmistunut: ${virheet.join(' | ') || 'aikakatkaisu'}`); });
  const data = await sivu.evaluate(
    ([tyyppi, laatu]) => document.getElementById('k').toDataURL(tyyppi, laatu),
    [`image/${MUOTO}`, LAATU],
  );
  const mitat = await sivu.evaluate(() => window.__mitat);
  await sivu.close();
  if (virheet.length) throw new Error(`Piirto virheili: ${virheet.join(' | ')}`);
  return { puskuri: Buffer.from(data.split(',')[1], 'base64'), mitat };
}

mkdirSync(kohdekansio, { recursive: true });

const alkoi = Date.now();
const { puskuri, mitat } = await renderoi({
  bbox: laudanBbox, rajaus: laudanRajaus, projektio, leveys: kuvaLeveys, tyyli,
});
const kuvaPolku = join(kohdekansio, `${iso}.${MUOTO}`);
writeFileSync(kuvaPolku, puskuri);

const jsonPolku = join(kohdekansio, `${iso}.json`);
writeFileSync(jsonPolku, `${JSON.stringify({
  iso,
  lauta: lauta.id,
  // Kuvan paikka LAUDAN koordinaateissa: peli asettaa <image>-elementin
  // tähän laatikkoon sellaisenaan.
  bbox: {
    x: Math.round(laudanBbox.x * 100) / 100,
    y: Math.round(laudanBbox.y * 100) / 100,
    w: Math.round(laudanBbox.w * 100) / 100,
    h: Math.round(laudanBbox.h * 100) / 100,
  },
  // Lehden ikkuna: tähän peli ajaa kameran (js/fokuskartta.js). Kuvan ja
  // lehden väliin jäävä vuoto on paperia, jota ruudun kuvasuhde vaatii.
  rajaus: {
    x: Math.round(laudanRajaus.x * 100) / 100,
    y: Math.round(laudanRajaus.y * 100) / 100,
    w: Math.round(laudanRajaus.w * 100) / 100,
    h: Math.round(laudanRajaus.h * 100) / 100,
  },
  kuva: mitat,
  tiedosto: `${iso}.${MUOTO}`,
  tehty: new Date().toISOString().slice(0, 10),
  tasaus,
  lahteet: [
    'Natural Earth 10m (Kelso & Patterson) — public domain',
    'ETOPO1 Global Relief (NOAA, Amante & Eakins 2009) — public domain',
  ],
}, null, 2)}\n`);

if (lippu('esikatselu')) {
  // Sama kuva pergamentin päällä: läpinäkyvyys näyttää katselimessa
  // mustalta, eikä kuvaa voi sillä taustalla arvioida lainkaan.
  const { puskuri: e } = await renderoi({
    bbox: laudanBbox,
    rajaus: laudanRajaus,
    projektio,
    leveys: kuvaLeveys,
    tyyli,
    esikatseluTausta: '#e9d8b0',
  });
  writeFileSync(join(kohdekansio, `${iso}-esikatselu.${MUOTO}`), e);
  console.log(`  esikatselu      ${join(kohdekansio, `${iso}-esikatselu.${MUOTO}`)}`);
}

if (lippu('tarkistus')) {
  const { puskuri: t } = await renderoi({
    bbox: laudanBbox,
    rajaus: laudanRajaus,
    projektio,
    leveys: kuvaLeveys,
    tyyli,
    tarkistus: {
      renkaat,
      ristit: pack.cities
        .filter((c) => TARKISTUSPISTEET[c.id])
        .map((c) => ({ x: c.x, y: c.y })),
    },
  });
  writeFileSync(join(kohdekansio, `${iso}-tarkistus.${MUOTO}`), t);
  console.log(`  tarkistuskuva   ${join(kohdekansio, `${iso}-tarkistus.${MUOTO}`)}`);
}

await selain.close();
palvelin.close();

const mt = (p) => `${(statSync(p).size / 1e6).toFixed(2)} Mt`;
console.log(`  kuva            ${kuvaPolku} — ${mitat.w}x${mitat.h}, ${mt(kuvaPolku)}`);
console.log(`  paikka          ${jsonPolku}`);
console.log(`  kesto           ${((Date.now() - alkoi) / 1000).toFixed(1)} s`);
console.log(`\nVie ämpäriin kansioon fokus/ (fokus/${iso}.${MUOTO} ja fokus/${iso}.json).`);
