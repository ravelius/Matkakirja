/*
 * SAVUKE: KELLOT-LINSSI (Fable 21.9.2026, ensimmäinen leikkilinssi;
 * js/linssit/kellot.js, kellot-aika.js, game.js vastaaKellokysymykseen).
 *
 * Marseille, 390 ja 1400 px. Linssi myönnetään pelaajalle (omistus.js
 * myonna) ja avataan matkalaukun tapaan ui.valitseLinssi('kellot').
 *
 * VARTIOT:
 *   1. Linssi aukeaa pallolle: portti (body.aikajana-paalla), ✕,
 *      vivut Nyt/1873/Livia kysyy; kelloja DOMissa yhtä monta kuin
 *      kellokaupunkeja (≥ 60, < 140), 24 vyöhykerajaa polkukerroksessa;
 *      Marseillen kello näyttää vyöhykeajan (+1 h tai +2 h).
 *   2. Vipu 1873: rajat pois, kellot aurinkoaikaan — Pariisin ja
 *      Marseillen ero 12 ± 1 min ja Marseillen selite "aurinko +22 min";
 *      Horation päiväkirjakortti (kaksitoista minuuttia) kerran.
 *   3. Livia kysyy: kortti Livian nimellä ja Fablen kysymyksellä
 *      (kaupunkien nimet paikoillaan), parin kellot korostuvat
 *      (.kellot-pari); oikea vastaus tuo XP_KELLOT tp, palaute "Oikein",
 *      B:n kello kääntyy vastaukseen; väärä vastaus ei tuo pisteitä.
 *   4. Sulku (✕ → ui.valitseLinssi(null)): kellot, kehikko, luokat ja
 *      polut pois; ei jäänteitä.
 *   5. Laukku: kellot on valmiiden rivillä Codexin webp-ikonilla (ei
 *      hiomassa-rivillä).
 *   6. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-kellot.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game, XP_KELLOT } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) lapi += 1;
  console.log(`${ehto ? 'OK  ' : 'FAIL'}  ${nimi}${ehto ? '' : ` — ${lisa}`}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}
const kirjasto = await ampariHaku('https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js');
if (kirjasto?.status !== 200) {
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'marseille' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('marseille');
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400']).map((w) => (
  w === '390' ? { nimi: '390', width: 390, height: 844, dpr: 2 } : { nimi: '1400', width: 1400, height: 900, dpr: 1 }
));

const kello = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}.${String(min % 60).padStart(2, '0')}`;

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: ruutu.dpr,
    serviceWorkers: 'block',
    hasTouch: ruutu.nimi === '390',
    isMobile: ruutu.nimi === '390',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.removeItem('matkakirja.passi.v1');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, TALLENNE);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      if (/\.(mp3|mp4|webm|ogg|wav|m4a)(\?|$)/.test(url)) { route.abort(); return; }
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  const t = ruutu.nimi;
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    await ui.pallolauta.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1500));
    for (const el of document.querySelectorAll('.saapumistraileri, .fokusvirta-isokuva, .fokusvirta-ohitanappi, .fokuskohde-popup, .fokusnosto-kerros')) el.remove();
    for (const d of document.querySelectorAll('dialog[open]')) d.close();
  });

  /* ── 1. avaus ───────────────────────────────────────────────────── */
  const avaus = await sivu.evaluate(async () => {
    const o = await import('/js/linssit/omistus.js');
    const { game, ui } = window.matkakirja;
    o.myonna(game, game.player, 'kellot');
    await ui.valitseLinssi('kellot');
    await new Promise((r) => setTimeout(r, 2000));
    const k = ui.pallolinssi?.kahva;
    return {
      linssi: ui.pallolinssi?.tunnus ?? null,
      tila: k?.tila?.() ?? null,
      kaupunkeja: k?.kaupungit?.().length ?? 0,
      kelloja: document.querySelectorAll('.kellot-kello').length,
      polkuja: ui.pallolauta.pallo.pathsData().filter((d) => String(d.avain ?? '').startsWith('vyohykeraja:')).length,
      portti: document.body.classList.contains('aikajana-paalla'),
      sulku: Boolean(document.querySelector('.kellot-linssisulku')),
      vivut: [...document.querySelectorAll('.kellot-vivut button')].map((b) => b.textContent),
      marseille: document.querySelector('.kellot-kello[data-kaupunki="marseille"]')?.getAttribute('aria-label') ?? null,
    };
  });
  tieto(`${t}: avaus`, JSON.stringify(avaus));
  vaadi(`${t}: 1. linssi aukeaa pallolle: portti, ✕, vivut, kellot ja 24 vyöhykerajaa`,
    avaus.linssi === 'kellot' && avaus.tila === 'nyt' && avaus.portti && avaus.sulku
      && avaus.kelloja === avaus.kaupunkeja && avaus.kelloja >= 60 && avaus.kelloja < 140 && avaus.polkuja === 24
      && avaus.vivut.join('|') === 'Nyt|1873|Livia kysyy' && /Marseille: \d\d\.\d\d \(\+[12] h\)/.test(avaus.marseille ?? ''),
    JSON.stringify(avaus));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `kellot-nyt-${t}.png`), await sivu.screenshot());

  /* ── 2. 1873 ────────────────────────────────────────────────────── */
  const v1873 = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    k.asetaTila('1873');
    await new Promise((r) => setTimeout(r, 700));
    const lue = (id) => document.querySelector(`.kellot-kello[data-kaupunki="${id}"]`)?.getAttribute('aria-label') ?? '';
    const min = (s) => { const m = /(\d\d)\.(\d\d)/.exec(s); return m ? Number(m[1]) * 60 + Number(m[2]) : NaN; };
    return {
      tila: k.tila(), luokka: document.body.classList.contains('kellot-1873'),
      polkuja: ui.pallolauta.pallo.pathsData().filter((d) => String(d.avain ?? '').startsWith('vyohykeraja:')).length,
      pariisi: lue('pariisi'), marseille: lue('marseille'), ero: min(lue('marseille')) - min(lue('pariisi')),
      nappi: document.querySelector('.kellot-vivut [data-tila="1873"]')?.getAttribute('aria-pressed'),
      horatio: document.querySelector('.kellot-kortti .kellot-puhuja')?.textContent ?? '',
      kortti: document.querySelector('.kellot-kortti .kellot-kysymys')?.textContent ?? '',
    };
  });
  await sivu.evaluate(() => document.querySelector('.kellot-kortti .kellot-sulje-kortti')?.click());
  tieto(`${t}: 1873`, JSON.stringify(v1873));
  vaadi(`${t}: 2. vipu 1873: rajat pois, aurinkoaika — Pariisi–Marseille 12 ± 1 min, Horation kortti`,
    v1873.tila === '1873' && v1873.luokka && v1873.polkuja === 0 && Math.abs(v1873.ero - 12) <= 1
      && /aurinko \+22 min/.test(v1873.marseille) && v1873.nappi === 'true'
      && /^Horatio/.test(v1873.horatio) && /kaksitoista minuuttia/.test(v1873.kortti),
    JSON.stringify(v1873));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `kellot-1873-${t}.png`), await sivu.screenshot());

  /* ── 3. Livia kysyy ─────────────────────────────────────────────── */
  const kysymys = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const k = ui.pallolinssi.kahva;
    const xp0 = game.player.xp ?? 0;
    // Väärä vastaus ensin: ei pisteitä.
    k.kysy();
    await new Promise((r) => setTimeout(r, 200));
    const q1 = k.kysymys();
    const kortti = document.querySelector('.kellot-kortti');
    const puhuja = kortti?.querySelector('.kellot-puhuja')?.textContent ?? '';
    const teksti = kortti?.querySelector('.kellot-kysymys')?.textContent ?? '';
    const pariA = document.querySelector(`.kellot-kello[data-kaupunki="${q1.a.id}"]`)?.classList.contains('kellot-pari');
    const pariB = document.querySelector(`.kellot-kello[data-kaupunki="${q1.b.id}"]`)?.classList.contains('kellot-pari-b');
    const vaaraMin = (q1.oikea.minuutit + 180) % 1440;
    k.vastaa(`${String(Math.floor(vaaraMin / 60)).padStart(2, '0')}.${String(vaaraMin % 60).padStart(2, '0')}`);
    await new Promise((r) => setTimeout(r, 200));
    const palauteVaarin = document.querySelector('.kellot-palaute')?.textContent ?? '';
    const xpVaarin = (game.player.xp ?? 0) - xp0;
    document.querySelector('.kellot-kortti .kellot-sulje-kortti')?.click();
    await new Promise((r) => setTimeout(r, 200));
    // Oikea vastaus: pisteet.
    k.kysy();
    await new Promise((r) => setTimeout(r, 200));
    const q2 = k.kysymys();
    const oikea = q2.oikea.minuutit;
    const syote = document.querySelector('.kellot-kortti input');
    syote.value = `${String(Math.floor(oikea / 60)).padStart(2, '0')}:${String(oikea % 60).padStart(2, '0')}`;
    document.querySelector('.kellot-kortti form').requestSubmit();
    await new Promise((r) => setTimeout(r, 300));
    const palauteOikein = document.querySelector('.kellot-palaute')?.textContent ?? '';
    const bKello = document.querySelector(`.kellot-kello[data-kaupunki="${q2.b.id}"]`)?.getAttribute('aria-label') ?? '';
    const aKello = document.querySelector(`.kellot-kello[data-kaupunki="${q2.a.id}"]`)?.getAttribute('aria-label') ?? '';
    const xpOikein = (game.player.xp ?? 0) - xp0 - xpVaarin;
    const kupla = game.events.find((e) => e.tilanne === 'peli.kellot.oikein');
    return {
      puhuja, teksti, a: q1.a.n, b: q1.b.n, tila: q1.kysymys.tila, pariA, pariB, palauteVaarin, xpVaarin,
      q2: { a: q2.a.n, b: q2.b.n, oikea }, palauteOikein, xpOikein, aKello, bKello, kupla: Boolean(kupla),
    };
  });
  tieto(`${t}: kysymys`, JSON.stringify(kysymys));
  const fablenLause = kysymys.tila === '1873'
    ? /(Arvaa minuutin tarkkuudella, minä laskin sen kerran siivillä\.|junat myöhästyivät periaatteesta)/
    : /vyöhykkeet ovat ihmisten keksintö, aurinko ei niistä tiedä\./;
  vaadi(`${t}: 3. Livia kysyy: Fablen lause kaupunkien nimillä, pari korostuu, väärä 0 tp, oikea +${XP_KELLOT} tp ja kello kääntyy`,
    kysymys.puhuja === 'Livia' && fablenLause.test(kysymys.teksti)
      && kysymys.teksti.includes(kysymys.a) && kysymys.teksti.includes(kysymys.b)
      && kysymys.pariA && kysymys.pariB
      && /^Ei ihan\./.test(kysymys.palauteVaarin) && kysymys.xpVaarin === 0
      && /^Oikein!/.test(kysymys.palauteOikein) && kysymys.xpOikein === XP_KELLOT && kysymys.kupla
      && kysymys.bKello.includes(kello(kysymys.q2.oikea)) && kysymys.aKello.includes('12.00'),
    JSON.stringify(kysymys));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `kellot-livia-${t}.png`), await sivu.screenshot());

  /* ── 4. sulku ───────────────────────────────────────────────────── */
  const sulku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    document.querySelector('.kellot-linssisulku')?.click();
    await new Promise((r) => setTimeout(r, 1500));
    return {
      linssi: ui.pallolinssi, valittu: ui.linssiValittu ?? null,
      kelloja: document.querySelectorAll('.kellot-kello').length,
      kehikko: Boolean(document.querySelector('.kellot-kehikko, .kellot-linssisulku')),
      luokat: ['aikajana-paalla', 'aikajana-palkki-auki', 'kellot-1873'].filter((l) => document.body.classList.contains(l)),
      polkuja: ui.pallolauta.pallo.pathsData().filter((d) => String(d.avain ?? '').startsWith('vyohykeraja:')).length,
    };
  });
  tieto(`${t}: sulku`, JSON.stringify(sulku));
  vaadi(`${t}: 4. sulku ✕: kellot, kehikko, luokat ja rajat pois`,
    sulku.linssi === null && !sulku.valittu && sulku.kelloja === 0 && !sulku.kehikko && sulku.luokat.length === 0 && sulku.polkuja === 0,
    JSON.stringify(sulku));

  /* ── 5. laukku ──────────────────────────────────────────────────── */
  const laukku = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.openPassport();
    await new Promise((r) => setTimeout(r, 800));
    const nappi = document.querySelector('.linssi-valikko button[data-linssi="kellot"]');
    return {
      loytyy: Boolean(nappi),
      hiomassa: Boolean(nappi?.closest('.linssi-liuskat-hiomassa')),
      kuva: nappi?.querySelector('img')?.getAttribute('src') ?? null,
    };
  });
  tieto(`${t}: laukku`, JSON.stringify(laukku));
  vaadi(`${t}: 5. laukku: kellot valmiiden rivillä Codexin webp-ikonilla`,
    laukku.loytyy && !laukku.hiomassa && laukku.kuva === 'assets/linssit/ikonit/linssi-kellot.webp',
    JSON.stringify(laukku));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `kellot-laukku-${t}.png`), await sivu.screenshot());

  vaadi(`${t}: 6. ei sivuvirheitä`, virheet.length === 0, virheet.join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
