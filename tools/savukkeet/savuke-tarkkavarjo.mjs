/*
 * Savuke: TARKKA VARJO (js/korkeuskerros.js) — omistajan 1′-kokeilu.
 *
 *   node tools/savukkeet/savuke-tarkkavarjo.mjs --palat <kansio> [--ulos <kansio>]
 *
 * Omistajan tilaus 1.9.2026, sanatarkka: *"korkeusdatan 1′-ajoa
 * simuloidaan liverenderöinnillä pelissä: ensin haetaan normaali pohja
 * laatoista ja sitten peli rakentaa reaaliajassa tarkemman
 * korkeusvarjostuksen."*
 *
 * === MITÄ TÄMÄ VARTIOI ==============================================
 *
 *   V1  Kytkin pois → kerrosta ei ole eikä yhtäkään palaa haeta.
 *       Kokeilu ei saa maksaa mitään sille, joka ei ole kytkenyt sitä.
 *   V2  Kytkin päälle lähizoomissa → palat haetaan, worker vastaa ja
 *       varjokuva ilmestyy laattojen päälle KARTAN MUUNNOKSEN SISÄÄN
 *       (samaan <g>:hen kuin laatat, laattojen jälkeen).
 *   V3  Kuva muuttaa ruutua: ennen/jälkeen-kaappauksista lasketaan
 *       kuinka moni pikseli tummeni. Tyhjä kerros läpäisisi muuten
 *       kaikki muut väitteet.
 *   V4  Kytkin pois takaisin → kerros katoaa HETI.
 *
 * === MISTÄ PALAT TULEVAT ============================================
 *
 * Kokeilun alkaessa ämpärissä ei vielä ole yhtään palaa
 * (.github/workflows/vie-korkeuspalat.yml ei ole ajettu), joten savuke
 * tarjoilee ne paikallisesta kansiosta ja kertoo pelille juuren
 * osoiteriviltä: `?korkeusjuuri=/palat/`. Palat tehdään
 * tools/tee-korkeuspalat.mjs:llä.
 *
 * POHJALAATAT SEN SIJAAN TULEVAT OIKEASTA ÄMPÄRISTÄ. Juuri se on
 * kokeilun kysymys: näkyykö 1′-varjo sen 3′-varjon päällä, joka
 * laattoihin on jo poltettu. Paikallinen pilottipyramidi ei kertoisi
 * siitä mitään.
 */
import { spawnSync } from 'node:child_process';
import http from 'node:http';
import {
  existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/*
 * VÄLITYSPALVELIN. Pohjalaatat tulevat OIKEASTA ämpäristä, ja
 * kehityskontissa ulos mennään vain välityspalvelimen kautta. Noden
 * fetch ei lue HTTPS_PROXYa ilman lippua, ja Chromium ei tässä
 * ympäristössä pääse ulos lainkaan (mitattu: ERR_CONNECTION_RESET
 * jokaiseen laattaan, myös --proxy-server-lipulla). Siksi savuke
 * NOUTAA laatat itse Nodella ja tarjoilee ne selaimelle omasta
 * palvelimestaan — ja käynnistää itsensä uudelleen oikealla lipulla,
 * kuten muutkin verkkoa käyttävät työkalut.
 */
const TAMA = fileURLToPath(import.meta.url);
if (!process.env.NODE_USE_ENV_PROXY
  && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [TAMA, ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const PALAT = valitsin('palat', process.env.KORKEUSPALAT ?? '');
const ULOS = valitsin('ulos', join(JUURI, 'tools/savukkeet/kaappaukset'));

if (!PALAT || !existsSync(PALAT)
  || !readdirSync(PALAT).some((n) => n.endsWith('.bin.gz'))) {
  console.error('Korkeuspaloja ei löydy. Aja ensin\n'
    + '  node tools/tee-korkeuspalat.mjs --palat N30E020,N40E020 --ulos <kansio>\n'
    + 'ja anna kansio: --palat <kansio> (tai KORKEUSPALAT).');
  process.exit(2);
}
mkdirSync(ULOS, { recursive: true });

const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.geojson': 'application/json',
  '.gz': 'application/gzip',
};

/** Palat omasta polustaan, muu repon juuresta. */
const palvelin = http.createServer((req, res) => {
  const polku = req.url.split('?')[0];
  const tiedosto = polku.startsWith('/palat/')
    ? join(PALAT, polku.slice('/palat/'.length))
    : join(JUURI, polku === '/' ? 'index.html' : polku);
  if (!existsSync(tiedosto)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(tiedosto)] ?? 'application/octet-stream' });
  res.end(readFileSync(tiedosto));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?korkeusjuuri=/palat/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 900, height: 900 },
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
/*
 * KEHITTÄJÄTILA JA MAAILMANÄKYMÄ päälle ennen sivunlatausta.
 * Kehittäjätila paljastaa hammasratasvalikon (jossa kytkin on) ja
 * maailmanäkymä vapauttaa panoroinnin fokusikkunasta — sama tila,
 * jossa omistaja kokeilua katsoo. Tarkka varjo jätetään POIS, koska
 * V1 mittaa juuri sen.
 */
await ctx.addInitScript(() => {
  try {
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-kehittaja-maailma', '1');
    localStorage.removeItem('matkakirja-kehittaja-tarkkavarjo');
  } catch { /* yksityinen selaus: väite kaatuu näkyvästi */ }
});

const sivu = await ctx.newPage();

/*
 * POHJALAATAT ÄMPÄRISTÄ NODEN KAUTTA, LEVYVÄLIMUISTIIN.
 *
 * Sama laatta haetaan yhden ajon aikana monta kertaa (zoomtasot,
 * ennen/jälkeen), ja peräkkäiset ajot hakisivat kaiken uudestaan.
 * Välimuisti on tmpdirissä eikä repossa — laatat ovat ämpärin
 * omaisuutta, eivät tämän työkalun.
 */
const LAATTAVARASTO = valitsin('laattavalimuisti',
  join(tmpdir(), 'matkakirja-savuke-pyramidi'));
async function ampariin(route) {
  const url = route.request().url();
  const osa = url.split('/julisteet/')[1];
  const kohde = join(LAATTAVARASTO, osa);
  const tyyppi = osa.endsWith('.json') ? 'application/json' : 'image/webp';
  if (existsSync(kohde)) {
    route.fulfill({ status: 200, contentType: tyyppi, body: readFileSync(kohde) });
    return;
  }
  try {
    const v = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (!v.ok) { route.fulfill({ status: v.status, body: 'ei' }); return; }
    const runko = Buffer.from(await v.arrayBuffer());
    mkdirSync(dirname(kohde), { recursive: true });
    writeFileSync(kohde, runko);
    route.fulfill({ status: 200, contentType: tyyppi, body: runko });
  } catch (e) {
    route.fulfill({ status: 599, body: String(e.message) });
  }
}
await sivu.route('**/julisteet/**', ampariin);

const palapyynnot = [];
await sivu.route('**/palat/**', (route) => {
  // Vain oikeat palapyynnöt kirjataan: sivun oma osoite kantaa
  // `?korkeusjuuri=/palat/`, ja se osuisi muuten samaan seulaan.
  const url = new URL(route.request().url());
  if (url.pathname.startsWith('/palat/')) palapyynnot.push(url.pathname.slice(7));
  route.continue();
});
sivu.on('console', (v) => {
  if (v.type() === 'error') console.log(`  [konsoli] ${v.text().slice(0, 160)}`);
});

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') { g.actionPickStart('ateena', 0); window.matkakirja.ui.render(); }
});
await sivu.waitForTimeout(8000);

/* Lähizoomiin: kerros on hiljaa uloimmilla tasoilla (z5 ja syvemmät). */
for (let i = 0; i < 4; i += 1) {
  await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
  await sivu.waitForTimeout(1400);
}
await sivu.waitForTimeout(6000);

const pyramidinTaso = await sivu.evaluate(() => globalThis.__pyramidinMittarit?.()?.taso ?? null);
console.log(`--- laattataso z${pyramidinTaso} ---`);

/* ---------------------------------------------------------------- V1 */

console.log('--- V1: kytkin pois ---');
const varjoja0 = await sivu.evaluate(
  () => document.querySelectorAll('image.korkeus-varjo').length,
);
vaadi('V1a kerrosta ei ole ennen kytkintä', varjoja0 === 0, `kuvia ${varjoja0}`);
vaadi('V1b yhtäkään palaa ei haettu', palapyynnot.length === 0,
  `pyyntöjä ${palapyynnot.length}: ${palapyynnot.slice(0, 3).join(' ')}`);

const ennen = join(ULOS, 'tarkkavarjo-ennen.png');
await sivu.screenshot({ path: ennen });

/* ---------------------------------------------------------------- V2 */

console.log('--- V2: kytkin päälle ---');
await sivu.click('#kehittaja-valikko-btn');
await sivu.waitForTimeout(300);
await sivu.click('#kehittaja-varjo-btn');
await sivu.waitForTimeout(300);
await sivu.click('#kehittaja-valikko-btn'); // valikko kiinni kuvaa varten
/*
 * Odotetaan varjokuvaa eikä kiinteää aikaa: palat ladataan, worker
 * laskee ja canvas koodataan PNG:ksi — kokonaisuus on sekunteja, ja
 * kiinteä odotus olisi joko liian lyhyt tai turhan pitkä.
 */
await sivu.waitForFunction(
  () => document.querySelectorAll('image.korkeus-varjo').length > 0,
  null,
  { timeout: 30000 },
).catch(() => {});
await sivu.waitForTimeout(1500);

const tila = await sivu.evaluate(() => {
  const kuva = document.querySelector('image.korkeus-varjo');
  const kerros = document.querySelector('g.korkeus-kerros');
  return {
    kuvia: document.querySelectorAll('image.korkeus-varjo').length,
    mittarit: globalThis.__tarkkaVarjo?.() ?? null,
    // Kerroksen on oltava SAMASSA <g>:ssä kuin laatat ja tarkan
    // laattatason JÄLKEEN: silloin kartan siirtokuori liikuttaa sitä
    // kompositorilla ja varjo on laattojen päällä.
    emonLuokka: kerros?.parentElement?.getAttribute('class') ?? null,
    edellisenLuokka: kerros?.previousElementSibling?.getAttribute('class') ?? null,
    seuraavanLuokka: kerros?.nextElementSibling?.getAttribute('class') ?? null,
  };
});
vaadi('V2a varjokuva on puussa', tila.kuvia === 1, `kuvia ${tila.kuvia}`);
vaadi('V2b palat haettiin', palapyynnot.length > 0, `pyyntöjä ${palapyynnot.length}`);
vaadi('V2c kerros on laattojen kanssa samassa kuoressa',
  tila.emonLuokka === 'pyramidi-kerros' || /pyramidi/.test(String(tila.emonLuokka)),
  `emo ${tila.emonLuokka}`);
vaadi('V2d kerros on tarkan laattatason päällä',
  tila.edellisenLuokka === 'pyramidi-tarkkataso', `edellinen ${tila.edellisenLuokka}`);
vaadi('V2e kerros on viivatason ja nostojen alla',
  /viivataso|nostotaso/.test(String(tila.seuraavanLuokka)),
  `seuraava ${tila.seuraavanLuokka}`);
vaadi('V2f worker laski kuvan', (tila.mittarit?.paivityksia ?? 0) > 0,
  JSON.stringify(tila.mittarit));
vaadi('V2g yksikään pala ei epäonnistunut', (tila.mittarit?.epaonnistui ?? 1) === 0,
  JSON.stringify(tila.mittarit));
/*
 * VARJOKUVAN OMA SISÄLTÖ. Ilman tätä väitteet menisivät läpi myös
 * täysin läpinäkyvällä kuvalla: elementti olisi puussa, mittarit
 * täynnä ja ruutu ennallaan. Kuva puretaan takaisin canvasille ja
 * lasketaan, kuinka suuri osa pikseleistä on maata (peittävyys > 0).
 */
const kuvanSisalto = await sivu.evaluate(async () => {
  const kuva = document.querySelector('image.korkeus-varjo');
  if (!kuva) return null;
  const laatikko = kuva.getBoundingClientRect();
  const osoite = kuva.getAttribute('href');
  const ladattu = await new Promise((ok) => {
    const i = new Image();
    i.onload = () => ok(i);
    i.onerror = () => ok(null);
    i.src = osoite;
  });
  if (!ladattu) return { osoite: osoite?.slice(0, 12), virhe: 'kuva ei latatunut' };
  const c = document.createElement('canvas');
  c.width = ladattu.width; c.height = ladattu.height;
  c.getContext('2d').drawImage(ladattu, 0, 0);
  const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  let peittavia = 0;
  let suurin = 0;
  for (let i = 3; i < d.length; i += 4) {
    if (d[i] > 0) peittavia += 1;
    if (d[i] > suurin) suurin = d[i];
  }
  return {
    leveys: ladattu.width,
    korkeus: ladattu.height,
    peittavia: peittavia / (d.length / 4),
    suurinPeitto: suurin,
    ruudulla: { w: Math.round(laatikko.width), h: Math.round(laatikko.height) },
  };
});
console.log(`  kuva: ${JSON.stringify(kuvanSisalto)}`);
vaadi('V2h varjokuvassa on maata', (kuvanSisalto?.peittavia ?? 0) > 0.05,
  JSON.stringify(kuvanSisalto));
vaadi('V2i kuva on ruudulla oikean kokoisena',
  (kuvanSisalto?.ruudulla?.w ?? 0) > 300, JSON.stringify(kuvanSisalto?.ruudulla));
console.log(`  mittarit: ${JSON.stringify(tila.mittarit)}`);
console.log(`  palat: ${[...new Set(palapyynnot)].join(' ')}`);

const jalkeen = join(ULOS, 'tarkkavarjo-jalkeen.png');
await sivu.screenshot({ path: jalkeen });

/* ---------------------------------------------------------------- V3 */

console.log('--- V3: kuva oikeasti muuttui ---');
/*
 * Ennen ja jälkeen -kaappaukset puretaan selaimessa canvasille ja
 * verrataan pikseleittäin: kuinka moni pikseli TUMMENI ja kuinka moni
 * VAALENI. Molempia on oltava, koska varjostus tekee kummankin —
 * pelkkä tummeneminen tarkoittaisi, että valopuoli jäi laskematta.
 */
const ero = await sivu.evaluate(async ([a, b]) => {
  const lataa = (url) => new Promise((ok) => {
    const kuva = new Image();
    kuva.onload = () => ok(kuva);
    kuva.src = url;
  });
  const [k1, k2] = await Promise.all([lataa(a), lataa(b)]);
  const piirra = (kuva) => {
    const c = document.createElement('canvas');
    c.width = kuva.width; c.height = kuva.height;
    c.getContext('2d').drawImage(kuva, 0, 0);
    return c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  };
  const d1 = piirra(k1);
  const d2 = piirra(k2);
  let tummeni = 0;
  let vaaleni = 0;
  let sama = 0;
  for (let i = 0; i < d1.length; i += 4) {
    const v1 = d1[i] + d1[i + 1] + d1[i + 2];
    const v2 = d2[i] + d2[i + 1] + d2[i + 2];
    if (v2 < v1 - 9) tummeni += 1;
    else if (v2 > v1 + 9) vaaleni += 1;
    else sama += 1;
  }
  const n = d1.length / 4;
  return {
    tummeni: tummeni / n, vaaleni: vaaleni / n, sama: sama / n, pikseleita: n,
  };
}, [
  `data:image/png;base64,${readFileSync(ennen).toString('base64')}`,
  `data:image/png;base64,${readFileSync(jalkeen).toString('base64')}`,
]);
console.log(`  tummeni ${(ero.tummeni * 100).toFixed(1)} %, `
  + `vaaleni ${(ero.vaaleni * 100).toFixed(1)} %, `
  + `sama ${(ero.sama * 100).toFixed(1)} %`);
vaadi('V3a ruutu muuttui merkittävästi', ero.tummeni + ero.vaaleni > 0.08,
  `${((ero.tummeni + ero.vaaleni) * 100).toFixed(2)} %`);
/*
 * MOLEMMAT PUOLET. Varjostus sekä tummentaa että vaalentaa, ja
 * tasainen maa jää moottorin kaavassa hitusen VALOISALLE puolelle
 * (0,669 > 0,5) — siksi vaalenevia pikseleitä on aina enemmän.
 * Tummeneva puoli on silti se, joka rinteet piirtää: jos se katoaa,
 * kerros on pelkkä valkoinen lasi maan päällä.
 */
vaadi('V3b varjopuoli piirtyi', ero.tummeni > 0.003,
  `${(ero.tummeni * 100).toFixed(2)} %`);
vaadi('V3b2 valopuoli piirtyi', ero.vaaleni > 0.02,
  `${(ero.vaaleni * 100).toFixed(2)} %`);
vaadi('V3c meri ja paperi jäivät koskematta', ero.sama > 0.3,
  `${(ero.sama * 100).toFixed(2)} %`);

/* ---------------------------------------------------------------- V4 */

console.log('--- V4: kytkin pois ---');
await sivu.click('#kehittaja-valikko-btn');
await sivu.waitForTimeout(300);
await sivu.click('#kehittaja-varjo-btn');
await sivu.waitForTimeout(800);
const jaljella = await sivu.evaluate(() => ({
  kuvia: document.querySelectorAll('image.korkeus-varjo').length,
  kerroksia: document.querySelectorAll('g.korkeus-kerros').length,
}));
vaadi('V4a varjokuva katosi heti', jaljella.kuvia === 0, `kuvia ${jaljella.kuvia}`);
vaadi('V4b kerros purettiin', jaljella.kerroksia === 0, `kerroksia ${jaljella.kerroksia}`);

await ctx.close();
await selain.close();
palvelin.close();

console.log(`\nkaappaukset:\n  ${ennen}\n  ${jalkeen}`);
console.log(`\n${lapi}/${kaikki} väitettä läpi`);
process.exit(lapi === kaikki ? 0 : 1);
