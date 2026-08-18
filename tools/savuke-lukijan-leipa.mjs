/*
 * SELAINSAVUKE: lukijan leipätekstipolitiikka ja pysyvä kaiutinsäädin.
 *
 * Yksikkötestit näkevät valinnan pienoismallilla; tämä ajaa saman
 * valinnan OIKEASSA DOMissa (Firenzen matkaopas, Firenzen lehden
 * etusivu, yksi nähtävyysjuttu) ja kirjoittaa luentalistat
 * tekstitiedostoiksi, jotta ennen/jälkeen-ero on luettavissa.
 *
 * Lisäksi kaapataan kelluva kaiutin kartalla ja lehdessä leveällä ja
 * kapealla ruudulla.
 *
 *   node tools/savuke-lukijan-leipa.mjs
 *   KAAPPAUSKANSIO=/polku node tools/savuke-lukijan-leipa.mjs
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8744, r));

const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  // Lukijaääni on oikeaa äänen toistoa: ilman tätä ensimmäinen soitto
  // torjutaan automaattitoistosäännöllä ja luenta putoaa laitteen
  // omalle äänelle, jolla ei ole säätöpaneelia.
  args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
});
const ctx = await selain.newContext({
  viewport: { width: 1280, height: 900 }, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();

/** Hiljainen WAV: lukijaäänen pala ilman verkkoa ja ilman kuluja. */
function hiljainenWav(sekunnit = 6) {
  const taajuus = 8000;
  const naytteet = taajuus * sekunnit;
  const puskuri = Buffer.alloc(44 + naytteet * 2);
  puskuri.write('RIFF', 0);
  puskuri.writeUInt32LE(36 + naytteet * 2, 4);
  puskuri.write('WAVEfmt ', 8);
  puskuri.writeUInt32LE(16, 16);
  puskuri.writeUInt16LE(1, 20);
  puskuri.writeUInt16LE(1, 22);
  puskuri.writeUInt32LE(taajuus, 24);
  puskuri.writeUInt32LE(taajuus * 2, 28);
  puskuri.writeUInt16LE(2, 32);
  puskuri.writeUInt16LE(16, 34);
  puskuri.write('data', 36);
  puskuri.writeUInt32LE(naytteet * 2, 40);
  return puskuri;
}
const AANI = hiljainenWav();

// Ulkopuoliset osoitteet katkaistaan (kuvat) — paitsi pöllön
// puherajapinta, joka vastaa mockatulla äänellä. Ilman sitä lukijaääni
// putoaisi laitteen omalle äänelle eikä säätöpaneelia syntyisi.
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), async (route) => {
  const pyynto = route.request();
  if (pyynto.method() === 'POST' && /workers\.dev|pollo/.test(pyynto.url())) {
    await route.fulfill({ status: 200, body: AANI, headers: { 'content-type': 'audio/wav' } });
    return;
  }
  await route.abort();
});

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

await sivu.goto('http://127.0.0.1:8744/index.html?lauta=europe', { waitUntil: 'load' });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  n?.click();
});
await sivu.waitForTimeout(2500);
// Lähtöpiste valitaan, jotta peli siirtyy pelivaiheeseen: matkakirjan
// merkintä ja sen kaiutin ilmestyvät kartalle vasta silloin.
await sivu.evaluate(async () => {
  const g = window.matkakirja?.game;
  if (g?.phase === 'pickstart') g.actionPickStart('firenze', null);
  window.matkakirja?.ui?.render?.();
  await new Promise((r) => setTimeout(r, 800));
});
await sivu.waitForTimeout(1200);

/** Kokoaa luentalistan annetusta juuresta pelin omalla valinnalla. */
const listaa = async (kuvaus) => sivu.evaluate(async (mita) => {
  const mod = await import('/js/lukija.js');
  const juuri = document.querySelector(mita.valitsin);
  if (!juuri) return { virhe: `ei löydy: ${mita.valitsin}` };
  return { kohdat: mod.kokoaLuettavatKohdat(juuri).map((k) => k.teksti) };
}, kuvaus);

const tulokset = {};

/* --- 1) Firenzen lehden etusivu ---------------------------------- */
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('firenze'));
  await new Promise((r) => setTimeout(r, 1200));
});
await sivu.waitForTimeout(600);
tulokset.lehtiEtusivu = await listaa({ valitsin: '#arrival-dialog .dialog-card' });

/* --- 2) Firenzen matkaopas --------------------------------------- */
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const opas = ui.lehtitila.tutkiKansi?.matkailijalle?.artikkeli;
  if (opas) ui.avaaNahtavyys(opas, null, { henkilolinkit: [], valikko: false });
  await new Promise((r) => setTimeout(r, 900));
});
await sivu.waitForTimeout(600);
tulokset.opas = await listaa({ valitsin: '#nahtavyys-dialog .nahtavyys-kortti' });

/* --- 3) Yksi nähtävyysjuttu -------------------------------------- */
const juttu = await sivu.evaluate(async () => {
  document.getElementById('nahtavyys-dialog')?.close();
  await new Promise((r) => setTimeout(r, 400));
  // Kohdekartan selitelista avaa nähtävyysjutun samalla polulla kuin
  // pelaajan napautus — ei sisäisiä kutsuja.
  const rivi = [...document.querySelectorAll('#arrival-dialog button.kartta-selite')][0];
  if (!rivi) return 'ei selitelistaa';
  rivi.click();
  await new Promise((r) => setTimeout(r, 900));
  return document.getElementById('nahtavyys-otsikko')?.textContent ?? '';
});
console.log('nähtävyysjuttu:', juttu);
await sivu.waitForTimeout(600);
tulokset.nahtavyys = await listaa({ valitsin: '#nahtavyys-dialog .nahtavyys-kortti' });

/* --- 4) Maalehden menovinkkisivu (listamalli) --------------------- */
const vinkit = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  document.getElementById('nahtavyys-dialog')?.close();
  await new Promise((r) => setTimeout(r, 300));
  ui.avaaMaalehti('ITA');
  await new Promise((r) => setTimeout(r, 1200));
  const i = (ui.lehtitila.tutkiSivut ?? []).findIndex((s) => s?.lista);
  if (i < 0) return 'ei listasivua';
  ui.naytaTutkiSivu(i + 1, { heti: true });
  await new Promise((r) => setTimeout(r, 700));
  return document.querySelector('#arrival-kategoria .aihe-nimi')?.textContent ?? '';
});
console.log('menovinkkisivu:', vinkit);
tulokset.menovinkit = await listaa({ valitsin: '#arrival-dialog .dialog-card' });

const leima = process.env.LUENTALISTA_LEIMA ?? 'nyt';
for (const [nimi, tulos] of Object.entries(tulokset)) {
  const rivit = tulos.virhe ? [`VIRHE: ${tulos.virhe}`] : tulos.kohdat;
  writeFileSync(join(ULOS, `luenta-${nimi}-${leima}.txt`),
    `${rivit.length} kohtaa\n\n${rivit.map((r, i) => `[${i}] ${r}`).join('\n\n')}\n`);
  console.log(`${nimi}: ${rivit.length} kohtaa → luenta-${nimi}-${leima}.txt`);
}

/* --- 4) Kelluvan kaiuttimen kaappaukset -------------------------- */
async function kaappaa(nimi) {
  await sivu.screenshot({ path: join(ULOS, `${nimi}-${leima}.png`) });
}

/** Kelluvan säätimen tila ja paikka suhteessa ylälaidan ankkuriin. */
const kelluvanTila = () => sivu.evaluate(() => {
  const kotelo = document.querySelector('.lukija-kelluva');
  if (!kotelo) return { on: false };
  const r = kotelo.getBoundingClientRect();
  const oma = document.querySelector('.lukija-nappi:not(.lukija-kelluva-nappi)');
  const hamppari = document.querySelector('header.topbar, .lehti-hampurilainen');
  const a = oma?.getBoundingClientRect?.() ?? hamppari?.getBoundingClientRect?.() ?? null;
  return {
    on: true,
    tila: kotelo.firstChild?.className ?? '',
    ylhaalla: r.top < window.innerHeight * 0.5,
    oikealla: r.right > window.innerWidth * 0.5,
    ankkurinAlla: a ? r.top >= a.bottom : null,
    isanta: kotelo.parentElement?.id || kotelo.parentElement?.tagName,
  };
});

/** Painaa kaiutinta ja odottaa, että luenta on käynnissä. */
async function kuuntele(valitsin) {
  // Edellinen luenta seis, jottei painallus toimikaan katkaisijana.
  await sivu.evaluate(async () => {
    const mod = await import('/js/lukija.js');
    mod.pysaytaLukija();
  });
  await sivu.waitForTimeout(300);
  const on = await sivu.evaluate((v) => {
    const n = document.querySelector(v);
    return Boolean(n) && !n.hidden;
  }, valitsin);
  if (!on) return `ei kaiutinta: ${valitsin}`;
  // Oikea painallus (page.click) — luotettu ele, jota äänen toisto vaatii.
  await sivu.click(valitsin);
  await sivu.waitForTimeout(1200);
  return 'painettu';
}

// Kartta: sulje ikkunat ja kuuntele matkakirjan merkintä.
await sivu.evaluate(async () => {
  document.getElementById('nahtavyys-dialog')?.close();
  document.getElementById('arrival-dialog')?.close();
  await new Promise((r) => setTimeout(r, 600));
});
console.log('kartta leveä:', await kuuntele('#fact-kuuntele'),
  JSON.stringify(await kelluvanTila()));
await kaappaa('kaiutin-kartta-leveä');

await sivu.setViewportSize({ width: 390, height: 844 });
await sivu.waitForTimeout(700);
console.log('kartta kapea:', await kuuntele('#fact-kuuntele'),
  JSON.stringify(await kelluvanTila()));
await kaappaa('kaiutin-kartta-kapea');

// Lehti kapealla: avaa Firenze ja paina sivun omaa kaiutinta.
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.openArrival(ui.game.board.cityById.get('firenze'));
  await new Promise((r) => setTimeout(r, 1400));
});
console.log('lehti kapea:', await kuuntele('#arrival-dialog .lukija-nappi'),
  JSON.stringify(await kelluvanTila()));
await kaappaa('kaiutin-lehti-kapea');

// Lehti leveällä: ikkunan koon muutos pysäyttää luennan (sivu piirtyy
// uusiksi), joten kaiutinta painetaan uudelleen.
await sivu.setViewportSize({ width: 1280, height: 900 });
await sivu.waitForTimeout(900);
console.log('lehti leveä:', await kuuntele('#arrival-dialog .lukija-nappi'),
  JSON.stringify(await kelluvanTila()));
await kaappaa('kaiutin-lehti-leveä');

// Kelluvan napautus avaa saman säätöpaneelin — sen alle, ei dialogin
// yläkulmaan.
await sivu.click('.lukija-kelluva-nappi');
await sivu.waitForTimeout(400);
// Nappi vipuaa: jos sivun oma kaiutin ehti jo avata paneelin, ensimmäinen
// napautus sulki sen — toinen tuo sen takaisin.
if (await sivu.evaluate(() => document.querySelector('.lukija-paneeli')?.hidden !== false)) {
  await sivu.click('.lukija-kelluva-nappi');
  await sivu.waitForTimeout(400);
}
const paneeli = await sivu.evaluate(() => {
  const p = document.querySelector('.lukija-paneeli');
  const k = document.querySelector('.lukija-kelluva');
  if (!p || !k) return { on: false };
  const pr = p.getBoundingClientRect();
  const kr = k.getBoundingClientRect();
  return {
    on: !p.hidden,
    kotelossa: k.contains(p),
    napinAlla: pr.top >= kr.bottom - 1,
    nappeja: p.querySelectorAll('button').length,
  };
});
console.log('paneeli kelluvasta:', JSON.stringify(paneeli));
await kaappaa('kaiutin-paneeli-lehti');

console.log('sivuvirheet:', virheet.length ? virheet.slice(0, 5) : 'ei yhtään');
await selain.close();
palvelin.close();
