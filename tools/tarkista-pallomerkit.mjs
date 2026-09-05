/*
 * PALLOMERKKIEN PORTTI — jokaisella pallolaudan näkyvällä merkillä on nimi
 * ja napautus (pallolauta vaihe 3, docs/moduulit/karttapallo.md luku 4.2:
 * *"jokainen näkyvä merkki on nimetty ja napautettava (kone valvoo:
 * tools/tarkista-karttamerkit.mjs saa pallovastineen vaiheessa 3)"*).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/tarkista-pallomerkit.mjs [--maa GRC] [--kuvat <kansio>]
 *
 * OMISTAJAN SÄÄNTÖ (Raamattu, JOKAINEN NAKYVA KARTTAMERKKI ON NIMETTY JA
 * NAPAUTETTAVA, 2.9.2026): *"nyt nämä Euroopan kaikki karttakohteet on
 * huolella tarkistettava … tämä on äärimmäisen tärkeää saada kuntoon."*
 * Tasokartan portti (tools/tarkista-karttamerkit.mjs) lukee SVG:tä ja
 * osumatestiä; pallolla merkit ovat CSS2D-elementtejä ja osuma on pallon
 * oma (js/pallolauta/lauta.js napautaPintaan, R-malli), joten portti on
 * oma — sama vaatimus, pallon omat mittarit:
 *
 *   1. NIMET: jokaisella elävällä kaupunginnimellä on piste, pisteitä on
 *      vain nimetyillä (+ oma kaupunki), nimet eivät limity keskenään
 *      eivätkä elävien nostojen kanssa, nimiä ≤ 40.
 *   2. NOSTOT: jokainen elävä H-nosto on nimetty (nimiö tai kaupunkikohde,
 *      jonka nimen sanoo kaupunki) ja on lähimmän merkin osumajoukossa
 *      (ui.pallolauta.nostot.osumat); otos napautetaan pallon omalla
 *      osumatestillä (onGlobeClick merkin asteilla) ja kortin on
 *      auettava. Poltetut (pallon laatoissa) saavat R-osuman ja lasketaan
 *      erikseen — pallon laatoissa ei vielä ole nostotasoa.
 *   3. EI SUODATTIMIA H-elementtien SVG:ssä (iOS-sääntö).
 *
 * Ajaa Euroopan laudan maat kuten tasokartan portti (pelaaja maan
 * ensimmäisessä kaupungissa, saapumisnäkymä), ämpäri Noden fetchillä.
 * Poistumiskoodi 0 = ei löydöksiä.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';
import { FOKUS_POHJAT } from '../js/packs/fokus-grc.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const lippu = (nimi) => { const i = argv.indexOf(nimi); return i >= 0 ? argv[i + 1] ?? '' : null; };
const VAIN_MAAT = (lippu('--maa') ?? '').toUpperCase().split(',').filter(Boolean);
const KUVAKANSIO = lippu('--kuvat');
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const EUROOPPA = [
  'ALB', 'AUT', 'BEL', 'BGR', 'BIH', 'BLR', 'CHE', 'CYP', 'CZE', 'DEU',
  'DNK', 'ESP', 'EST', 'FIN', 'FRA', 'GBR', 'GRC', 'HRV', 'HUN', 'IRL',
  'ISL', 'ITA', 'LTU', 'LUX', 'LVA', 'MDA', 'MKD', 'MNE', 'NLD', 'NOR',
  'POL', 'PRT', 'ROU', 'SRB', 'SVK', 'SVN', 'SWE', 'TUR', 'UKR',
];
const pack = packById('maailmankartta');
const cityCountry = pack.map?.cityCountry ?? {};
const kaupungitMaittain = {};
for (const c of pack.cities ?? []) {
  const iso = cityCountry[c.id];
  if (iso) (kaupungitMaittain[iso] ??= []).push(c);
}
const MAAT = EUROOPPA
  .filter((iso) => FOKUS_POHJAT[iso]?.lauta === 'maailmankartta')
  .filter((iso) => (kaupungitMaittain[iso] ?? []).length > 0)
  .filter((iso) => !VAIN_MAAT.length || VAIN_MAAT.includes(iso));
if (!MAAT.length) { console.error('Ei maita ajettavaksi.'); process.exit(2); }

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const AMPARI = 'https://pub-7bc0ed2083a74a68bd7115618bca4709.r2.dev/';
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
const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.error('Ämpäri ei vastaa — pallo ei lataudu. Aja NODE_USE_ENV_PROXY=1 ja tarkista verkko.');
  palvelin.close();
  process.exit(2);
}

function tallenne(kaupunki) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: kaupunki }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(kaupunki, 'topaz');
  peli.revealed.delete(kaupunki);
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce',
});
const sivu = await ctx.newPage();
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route(/wikimedia\.org/, (route) => route.abort());
await sivu.route(/r2\.dev\//, async (route) => {
  const vastaus = await ampariHaku(route.request().url());
  if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
  route.fulfill({ status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body });
});
const PEITTO_POIS = '.pollo-paneeli, .pollo-nappi, .fokusvirta-kupla, .fact-card, .pollo-vihje,'
  + ' .pollo-kuplapino-kehys, .paivakirjalappu, .reveal { display: none !important; }';

/** Merkit ruudulta pallon omilla mittareilla. */
const KERAA = () => sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const pallo = ui.pallonInstanssi;
  const tulos = ui.pallolauta.ladoHeti();
  const laatikko = (el) => {
    const r = el.getBoundingClientRect();
    return { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width };
  };
  const leikkaa = (a, b) => a.x0 < b.x1 - 0.5 && a.x1 > b.x0 + 0.5 && a.y0 < b.y1 - 0.5 && a.y1 > b.y0 + 0.5;
  const nakyy = (el) => !el.classList.contains('pallolauta-takana') && !el.classList.contains('pallolauta-poistuu');
  const nimet = [...document.querySelectorAll('.pallolauta-nimi')].filter(nakyy)
    .map((el) => ({ id: el.dataset.kaupunki, r: laatikko(el.querySelector('text')) })).filter((n) => n.r.w > 0);
  const nostot = [...document.querySelectorAll('.pallolauta-nosto')].filter(nakyy).map((el) => ({
    id: el.dataset.nosto,
    nimio: el.dataset.nimio,
    aria: el.getAttribute('aria-label') ?? '',
    suodatin: Boolean(el.querySelector('filter, [filter]')),
    r: laatikko(el.querySelector('svg')),
  }));
  const limitykset = [];
  for (let i = 0; i < nimet.length; i += 1) {
    for (let j = i + 1; j < nimet.length; j += 1) if (leikkaa(nimet[i].r, nimet[j].r)) limitykset.push(`${nimet[i].id}+${nimet[j].id}`);
    for (const n of nostot) if (n.r.w > 0 && leikkaa(nimet[i].r, n.r)) limitykset.push(`${nimet[i].id}+${n.id}`);
  }
  const pisteet = pallo.pointsData().filter((p) => !p.laji).map((p) => p.id);
  const oma = ui.game.cityOf()?.id;
  const osumat = ui.pallolauta.nostot.osumat();
  const tiedot = ui.pallolauta.nostot.osumat().map((o) => ({ id: o.id, perhe: o.perhe, poltettu: o.poltettu, lat: o.lat, lng: o.lng, nimi: o.nimi }));
  return {
    leveys: ui.pallolauta.kamera.kameranTila()?.leveys,
    nimia: nimet.length,
    ehdokkaita: tulos?.nimet?.ehdokkaita ?? null,
    nimetIlmanPistetta: nimet.filter((n) => !pisteet.includes(n.id)).map((n) => n.id),
    pisteetIlmanNimea: pisteet.filter((id) => id !== oma && !nimet.some((n) => n.id === id)),
    limitykset,
    nostoja: nostot.length,
    nostotNimettomat: nostot.filter((n) => !n.nimio && !n.aria).map((n) => n.id),
    nostotIlmanOsumaa: nostot.filter((n) => !osumat.some((o) => o.id === n.id)).map((n) => n.id),
    suodattimet: nostot.filter((n) => n.suodatin).map((n) => n.id),
    poltettuja: osumat.filter((o) => o.poltettu).length,
    elavia: osumat.filter((o) => !o.poltettu).length,
    html: pallo.htmlElementsData().length,
    osumat: tiedot,
  };
});

/** Napautus pallon omalla osumatestillä merkin asteista: aukeaako kortti? */
async function napauta(o) {
  return sivu.evaluate(async (osuma) => {
    const { ui } = window.matkakirja;
    const pallo = ui.pallonInstanssi;
    pallo.onGlobeClick()({ lat: osuma.lat, lng: osuma.lng });
    await new Promise((r) => setTimeout(r, 450));
    const kortti = document.querySelector('.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros, .fokusnosto-kerros, .syvennys-kerros, .visa-kortti, .fokusvirta-kortti');
    const luokka = kortti?.className ?? null;
    for (const e of document.querySelectorAll('.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros, .fokusnosto-kerros, .syvennys-kerros')) e.remove();
    ui.fokuskohdeAuki = null;
    return luokka;
  }, o);
}

const loydokset = [];
const yhteenveto = [];
for (const iso of MAAT) {
  const kaupunki = kaupungitMaittain[iso][0];
  /* eslint-disable no-await-in-loop */
  try {
    await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.evaluate((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-fokusmoodi');
        localStorage.removeItem('matkakirja-lauta');
      } catch { /* yksityinen tila */ }
    }, tallenne(kaupunki.id));
    await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
    await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
    await sivu.waitForTimeout(2500);
    await sivu.addStyleTag({ content: PEITTO_POIS });
    await sivu.evaluate(() => { window.matkakirja.ui.arrivalDialog?.close?.(); });
    await sivu.evaluate(async () => { await window.matkakirja.ui.pallolauta.kamera.kotiin({ kesto: 0 }); });
    await sivu.waitForTimeout(800);
    const t = await KERAA();
    await sivu.waitForTimeout(400);
    const rikki = [];
    for (const id of t.nimetIlmanPistetta) rikki.push({ laji: 'nimi', id, puuttuu: 'piste' });
    for (const id of t.pisteetIlmanNimea) rikki.push({ laji: 'piste', id, puuttuu: 'nimi' });
    for (const pari of t.limitykset) rikki.push({ laji: 'nimi', id: pari, puuttuu: 'limittyy' });
    for (const id of t.nostotNimettomat) rikki.push({ laji: 'nosto', id, puuttuu: 'nimi' });
    for (const id of t.nostotIlmanOsumaa) rikki.push({ laji: 'nosto', id, puuttuu: 'napautus' });
    for (const id of t.suodattimet) rikki.push({ laji: 'nosto', id, puuttuu: 'suodatin (iOS)' });
    if (t.nimia > 40 || t.html > 60) rikki.push({ laji: 'katto', id: `${t.nimia}/${t.html}`, puuttuu: 'katto' });
    // Napautusotos: yksi kustakin perheestä (nosto, elain, piste) ja yksi poltettu.
    const otos = [];
    for (const perhe of ['nosto', 'elain', 'piste']) {
      const o = t.osumat.find((m) => m.perhe === perhe && !m.poltettu);
      if (o) otos.push(o);
    }
    const poltettu = t.osumat.find((m) => m.poltettu);
    if (poltettu) otos.push(poltettu);
    for (const o of otos) {
      const kortti = await napauta(o);
      if (!kortti) rikki.push({ laji: o.perhe, id: o.id, puuttuu: 'kortti' });
    }
    for (const r of rikki) loydokset.push({ maa: iso, ...r });
    yhteenveto.push({
      maa: iso, nimia: t.nimia, nostoja: t.nostoja, poltettuja: t.poltettuja, html: t.html, loydoksia: rikki.length,
    });
    console.log(`${iso} leveys ${String(Math.round(t.leveys ?? 0)).padStart(4)} nimiä ${String(t.nimia).padStart(2)}`
      + ` nostoja ${String(t.nostoja).padStart(2)} poltettuja ${String(t.poltettuja).padStart(2)}`
      + ` html ${String(t.html).padStart(2)} napautuksia ${otos.length} löydöksiä ${rikki.length}`);
    for (const r of rikki) console.log(`   ${r.laji} ${r.id} puuttuu: ${r.puuttuu}`);
    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, `pallo-${iso}.png`), timeout: 15000 })
        .catch((virhe) => console.log(`   (kaappaus ei onnistunut: ${virhe.name})`));
    }
  } catch (virhe) {
    console.log(`${iso} KAATUI — ${virhe.name}: ${String(virhe.message).split('\n')[0]}`);
    loydokset.push({ maa: iso, laji: 'ajo', id: null, puuttuu: 'mittaus' });
  }
  /* eslint-enable no-await-in-loop */
}

await selain.close();
palvelin.close();

console.log('\n================ RAPORTTI ================');
for (const r of yhteenveto) {
  console.log(`${r.maa} nimiä ${String(r.nimia).padStart(2)} nostoja ${String(r.nostoja).padStart(2)}`
    + ` poltettuja ${String(r.poltettuja).padStart(2)} html ${String(r.html).padStart(2)} löydöksiä ${r.loydoksia}`);
}
console.log(`\nLöydöksiä yhteensä ${loydokset.length} / maita ${MAAT.length}`);
if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, 'pallomerkit.json'), JSON.stringify({ yhteenveto, loydokset }, null, 1));
process.exit(loydokset.length ? 1 : 0);
