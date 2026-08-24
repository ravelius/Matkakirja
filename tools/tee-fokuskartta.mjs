/*
 * FOKUSKARTTA: yhden maan esirenderöity topografiapohja pelilaudalle.
 *
 *   node tools/tee-fokuskartta.mjs GRC /polku/kohdekansioon \
 *        [--data <raaka-aineiston kansio>] [--leveys 2048]
 *        [--marginaali 6] [--tarkistus]
 *
 * Tuottaa kohdekansioon kaksi tiedostoa:
 *
 *   GRC.png    läpinäkyvätaustainen maastokuva (akvarellihypsometria,
 *              rantavyöhykkeet, joet, järvet — ei tekstiä)
 *   GRC.json   kuvan paikka LAUDAN koordinaateissa
 *
 * Molemmat viedään ämpäriin kansioon `fokus/` (kuten julisteet), ja peli
 * lataa ne js/fokuskartta.js:n kautta. Repoon ei tule kumpaakaan.
 *
 * === KRIITTINEN KOHTA: TASAUS ===
 *
 * Kuva ei ole kuvitusta vaan karttaa, ja sen on osuttava laudan
 * koordinaatistoon. Euroopan lauta on tasavälinen projektio
 *
 *     x = (lon + 11) * 19.2      y = (72 - lat) * 26.3
 *
 * ja kaupunkien laatat on aseteltu sillä kaavalla (Ateena 23,7275 E /
 * 37,9838 N -> 666,8 / 894,6, laudalla 667 / 895). Kuva renderöidään
 * TÄSMÄLLEEN samalla kaavalla tunnettuun laudan rajauslaatikkoon, ja
 * laatikko kirjoitetaan JSONiin: peli asettaa <image>-elementin siihen
 * eikä arvaa mitään.
 *
 * Tasaus todennetaan joka ajossa (`tarkistaProjektio`): laudan omien
 * kaupunkien koordinaatit lasketaan uudelleen tunnetuista asteista, ja
 * jos ero on yli TASAUKSEN_RAJA lautayksikköä, ajo kaatuu. `--tarkistus`
 * kirjoittaa lisäksi kuvan, jossa on laudan oma maarengas punaisella ja
 * risti kaupungin laattakoordinaatissa — silmällä katsottava todiste.
 *
 * === MIKSI VAIN KOHDEMAA ===
 *
 * Naapureita ei renderöidä: fokusmoodin harso (js/ui.js paivitaFokusSumu)
 * hoitaa ne pelissä, ja käydyt naapurit saavat jäädä laudan omaksi
 * taiteeksi. Tausta on läpinäkyvä eikä meri: lauta on kuvan alla, ja
 * peittävä meripohja jättäisi kuvan reunaan suoran sävyrajan keskelle
 * Egeanmerta.
 *
 * Aineisto ja lähteet: tools/fokuskartta/aineisto.mjs.
 * Piirtomoottori (ajetaan selaimessa): tools/fokuskartta/piirto.js.
 */
import { createServer } from 'node:http';
import { mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { keraaAineisto } from './fokuskartta/aineisto.mjs';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAALLA, '..');

/*
 * LAUDAT JA NIIDEN PROJEKTIOT.
 *
 * Vain ne laudat, joiden projektio on TASAVÄLINEN (lineaarinen sekä
 * pituus- että leveysasteessa). Maailmankartta on Millerin lieriössä,
 * jossa leveysaste ei ole lineaarinen — sille tarvitaan oma haara, kun
 * fokusmoodi joskus sinne tuodaan. Väärä projektio ei näy tarkistuksessa
 * yhdessä kaupungissa mutta siirtäisi maan pohjoisosaa kymmeniä
 * yksikköjä, joten mieluummin kaadutaan kuin arvataan.
 */
const LAUDAT = [
  {
    id: 'europe',
    moduuli: './js/packs/europe.js',
    vienti: 'EUROPE',
    // x = (lon + 11) * 19.2, y = (72 - lat) * 26.3
    projektio: { lonA: 19.2, lonB: 11 * 19.2, latA: -26.3, latB: 72 * 26.3 },
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
    + '[--data <kansio>] [--leveys 2048] [--marginaali 6] [--tarkistus]');
  process.exit(1);
}

const dataKansio = resolve(valitsin('data',
  process.env.FOKUSKARTTA_DATA ?? join(tmpdir(), 'matkakirja-fokuskartta')));
/*
 * Kuvan leveys pikseleinä.
 *
 * 1600 riittää: Kreikan rajaus on 139 lautayksikköä leveä, joten
 * pikseleitä tulee 11,5 yhtä lautayksikköä kohti, kun laudan lähin
 * zoomiporras näyttää 88 yksikköä noin 800 pikselin levyisenä eli
 * yhdeksän pikseliä yksikköä kohti. Kuva on siis tarkempi kuin mihin
 * peliä voi zoomata.
 *
 * Ylärajan sanelee tiedostokoko: aineisto on rakeista akvarellia, joka
 * ei pakkaudu, ja 2048 leveänä Kreikan PNG on 4,1 Mt kun 1600 leveänä
 * se on 2,8 Mt. Ämpäristä ladataan yksi kuva maata kohti kesken pelin,
 * joten kolme megatavua on katto.
 */
const kuvaLeveys = Number(valitsin('leveys', 1600));
// Marginaali lautayksikköinä. Rantavyöhyke ulottuu noin neljä yksikköä
// rannasta ulos, joten kuusi antaa sille tilan ja hitusen ilmaa lisää.
const marginaali = Number(valitsin('marginaali', 6));

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
const laudanBbox = (() => {
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const rengas of renkaat) {
    for (const [x, y] of rengas) {
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }
  return {
    x: x0 - marginaali,
    y: y0 - marginaali,
    w: (x1 - x0) + 2 * marginaali,
    h: (y1 - y0) + 2 * marginaali,
  };
})();

const { projektio } = lauta;
const lonPisteesta = (x) => (x - projektio.lonB) / projektio.lonA;
const latPisteesta = (y) => (y - projektio.latB) / projektio.latA;
// Aineiston laatikko puoli astetta väljempi joka suuntaan: rannikko saa
// jatkua kuvan reunan yli, jotta reunaan ei jää katkennutta viivaa.
const laatikko = {
  lon0: lonPisteesta(laudanBbox.x) - 0.5,
  lon1: lonPisteesta(laudanBbox.x + laudanBbox.w) + 0.5,
  lat0: latPisteesta(laudanBbox.y + laudanBbox.h) - 0.5,
  lat1: latPisteesta(laudanBbox.y) + 0.5,
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
    const x = projektio.lonA * piste.lon + projektio.lonB;
    const y = projektio.latA * piste.lat + projektio.latB;
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
console.log(`  bbox laudalla   x ${laudanBbox.x.toFixed(1)} y ${laudanBbox.y.toFixed(1)} `
  + `w ${laudanBbox.w.toFixed(1)} h ${laudanBbox.h.toFixed(1)}`);
console.log(`  asteina         lon ${laatikko.lon0.toFixed(2)}..${laatikko.lon1.toFixed(2)} `
  + `lat ${laatikko.lat0.toFixed(2)}..${laatikko.lat1.toFixed(2)}`);
console.log(`  aineisto        ${dataKansio}`);

const aineisto = keraaAineisto({ kansio: dataKansio, iso, laatikko });
console.log(`  renkaat ${aineisto.maa.renkaat.length} · joet ${aineisto.joet.length} `
  + `· järvet ${aineisto.jarvet.length} · korkeusruudukko `
  + `${aineisto.korkeus.w}x${aineisto.korkeus.h}`);

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
  window.__kuva = document.getElementById('k').toDataURL('image/png');
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
  const data = await sivu.evaluate(() => window.__kuva);
  const mitat = await sivu.evaluate(() => window.__mitat);
  await sivu.close();
  if (virheet.length) throw new Error(`Piirto virheili: ${virheet.join(' | ')}`);
  return { puskuri: Buffer.from(data.split(',')[1], 'base64'), mitat };
}

mkdirSync(kohdekansio, { recursive: true });

const alkoi = Date.now();
const { puskuri, mitat } = await renderoi({
  bbox: laudanBbox, projektio, leveys: kuvaLeveys,
});
const pngPolku = join(kohdekansio, `${iso}.png`);
writeFileSync(pngPolku, puskuri);

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
  kuva: mitat,
  tiedosto: `${iso}.png`,
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
    bbox: laudanBbox, projektio, leveys: kuvaLeveys, esikatseluTausta: '#e9d8b0',
  });
  writeFileSync(join(kohdekansio, `${iso}-esikatselu.png`), e);
  console.log(`  esikatselu      ${join(kohdekansio, `${iso}-esikatselu.png`)}`);
}

if (lippu('tarkistus')) {
  const { puskuri: t } = await renderoi({
    bbox: laudanBbox,
    projektio,
    leveys: kuvaLeveys,
    tarkistus: {
      renkaat,
      ristit: pack.cities
        .filter((c) => TARKISTUSPISTEET[c.id])
        .map((c) => ({ x: c.x, y: c.y })),
    },
  });
  writeFileSync(join(kohdekansio, `${iso}-tarkistus.png`), t);
  console.log(`  tarkistuskuva   ${join(kohdekansio, `${iso}-tarkistus.png`)}`);
}

await selain.close();
palvelin.close();

const mt = (p) => `${(statSync(p).size / 1e6).toFixed(2)} Mt`;
console.log(`  kuva            ${pngPolku} — ${mitat.w}x${mitat.h}, ${mt(pngPolku)}`);
console.log(`  paikka          ${jsonPolku}`);
console.log(`  kesto           ${((Date.now() - alkoi) / 1000).toFixed(1)} s`);
console.log(`\nVie ämpäriin kansioon fokus/ (fokus/${iso}.png ja fokus/${iso}.json).`);
