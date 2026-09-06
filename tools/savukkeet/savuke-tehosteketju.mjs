/*
 * Savuke: TEHOSTEKETJUT (js/tehosteketju.js) — Tuna 1.1.3 ämpärin
 * vendor/-polusta (omistajan päätös 5.9.2026, kirjastokartoituksen TOP 6
 * kohta 5: *"megafoni kuulostaa megafonilta, radiolinssin asema rätisee
 * oikein, ja Livian ääni luolassa saa luolan kaiun"*).
 *
 * ── VARTIOT ──────────────────────────────────────────────────────────
 *
 *   KIRJASTO ÄMPÄRISTÄ (?lauta=kartta, kehittäjätila, äänet päällä):
 *   1. lataaTuna() antaa rakentimen, ja vendor/tuna-1.1.3.js pyydettiin
 *      TASAN kerran kahdesta kutsusta (memoized).
 *   2. Jokainen viidestä ketjusta syntyy pelin omaan kontekstiin
 *      (sfx.ctx), on kytketty sfx.busiin ja purkautuu ilman virheitä —
 *      oikea Tuna oikeassa Web Audiossa (Filter, Overdrive, Bitcrusher,
 *      Tremolo, Delay).
 *   3. Kuuntelunappi on ratasvalikossa ja kuunteleTehosteketjut() palaa
 *      'ok'; sivulle ei tule yhtään virhettä soiton aikana.
 *   4. Luolan kortti (Vjetrenica, BIH) asettaa puhujan akustiikan
 *      'luola' ja sulkeminen nollaa sen — sama polku, jota Livian
 *      vastaus ja kertojan luenta kysyvät (js/puhe.js).
 *   5. Äänet pois -asetus pysäyttää: kuunteleTehosteketjut() palaa
 *      'aanet-pois' eikä uutta ketjua synny.
 *
 *   ILMAN KIRJASTOA (uusi sivu, vendor/tuna katkaistu):
 *   6. lataaTuna() on null, tehosteketju() on null,
 *      kuunteleTehosteketjut() palaa 'ei-kirjastoa' — ääni kulkee
 *      suoraan, sivulle ei tule virhettä.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Vastaukseen
 * lisätään CORS-otsake, koska moduulituonti (import()) vaatii sen ja
 * ämpäri antaa sen vain julkaistun pelin alkuperälle — savukkeen sivu
 * on localhost. Ilman ämpäriä savuke ajaa vain virhehaaran vartiot.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-tehosteketju.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.mp3': 'audio/mpeg',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
const TUNA = `${AMPARI}vendor/tuna-1.1.3.js`;
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
const kirjasto = await ampariHaku(TUNA);
const AMPARI_TOIMII = kirjasto?.status === 200;
tieto('vendor/tuna-1.1.3.js', AMPARI_TOIMII ? `${kirjasto.body.length} tavua` : 'ei saatavilla');
if (!AMPARI_TOIMII) console.log('HUOM  ämpäri ei vastaa — ajetaan vain virhehaaran vartiot');

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Uusi sivu: kehittäjätila ja äänet päällä, ämpäri reititetty (tai katkaistu). */
async function avaaSivu({ ampari }) {
  const ctx = await selain.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.addInitScript(() => {
    try {
      localStorage.setItem('matkakirja-kehittaja', '1');
      localStorage.setItem('matkakirja-aani', 'on');
      localStorage.setItem('matkakirja-lauta', 'kartta');
    } catch { /* yksityinen tila */ }
  });
  const sivu = await ctx.newPage();
  const tila = { tuna: 0, virheet: [], katkaistut: [] };
  sivu.on('pageerror', (e) => tila.virheet.push(String(e.message ?? e)));
  // Savuke katkaisee itse pöllöpalvelimen, Commonsin ja (virhehaarassa)
  // kirjaston pyynnöt; selain kirjaa jokaisesta "Failed to load
  // resource" -rivin. Ne ovat savukkeen omaa tekoa, eivät koodin
  // virheitä — kerätään erikseen tiedoksi, ei virheiksi.
  sivu.on('console', (m) => {
    if (m.type() !== 'error') return;
    if (/Failed to load resource/.test(m.text())) return;
    tila.virheet.push(m.text());
  });
  sivu.on('requestfailed', (r) => tila.katkaistut.push(r.url().replace(/\?.*$/, '')));
  sivu.on('request', (r) => { if (r.url().includes('vendor/tuna')) tila.tuna += 1; });
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org/, (route) => route.abort());
  await sivu.route(/r2\.dev\//, async (route) => {
    const url = route.request().url();
    if (!ampari && url.includes('vendor/tuna')) { route.abort(); return; }
    const vastaus = await ampariHaku(url);
    if (!vastaus || vastaus.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      // Moduulituonti vaatii CORS-luvan; ämpäri antaa sen vain julkaistulle
      // pelille (Vary: Origin), savukkeen localhostille ei — lisätään tässä.
      headers: { 'access-control-allow-origin': '*' },
      body: vastaus.body,
    });
  });
  await sivu.goto(`${osoite}?lauta=kartta`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  // Ele herättää äänikontekstin (js/sound.js: konteksti syntyy vasta napautuksesta).
  await sivu.mouse.move(200, 500);
  await sivu.mouse.down();
  await sivu.mouse.up();
  await sivu.waitForTimeout(400);
  return { ctx, sivu, tila };
}

/* ================= KIRJASTO ÄMPÄRISTÄ ================= */
if (AMPARI_TOIMII) {
  const { ctx, sivu, tila } = await avaaSivu({ ampari: true });

  const lataus = await sivu.evaluate(async () => {
    const m = await import('/js/tehosteketju.js');
    const a = await m.lataaTuna();
    const b = await m.lataaTuna();
    return { tyyppi: typeof a, sama: a === b, valmis: m.tunaValmis() === a, osoite: m.TUNA_KIRJASTO };
  });
  vaadi('1. Tuna latautuu ämpärin vendor/-polusta ja muistetaan',
    lataus.tyyppi === 'function' && lataus.sama && lataus.valmis, JSON.stringify(lataus));
  vaadi('1. kirjasto pyydettiin tasan kerran kahdesta kutsusta', tila.tuna === 1, `pyyntöjä ${tila.tuna}`);
  vaadi('1. osoite on ämpärin vendor-polku', /r2\.dev\/vendor\/tuna-1\.1\.3\.js$/.test(lataus.osoite), lataus.osoite);

  const ketjut = await sivu.evaluate(async () => {
    const m = await import('/js/tehosteketju.js');
    const { sfx } = await import('/js/sound.js');
    sfx.enabled = true;
    const ctx = sfx.ensureContext();
    if (!ctx) return { virhe: 'ei kontekstia' };
    const tulos = {};
    for (const nimi of m.TEHOSTEKETJUT) {
      const ketju = m.tehosteketju(ctx, nimi, sfx.bus);
      if (!ketju) { tulos[nimi] = null; continue; }
      const osc = ctx.createOscillator();
      osc.connect(ketju.input);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      ketju.pura();
      tulos[nimi] = {
        input: ketju.input instanceof GainNode,
        output: ketju.output instanceof GainNode,
        ctx: ketju.input.context === ctx,
        purettu: ketju.purettu(),
      };
    }
    await new Promise((r) => setTimeout(r, 400));
    return { tila: ctx.state, tulos };
  });
  const kaikkiKetjut = ketjut.tulos && Object.values(ketjut.tulos).every((k) => k && k.input && k.output && k.ctx && k.purettu);
  vaadi('2. viisi ketjua syntyvät pelin kontekstiin ja purkautuvat', kaikkiKetjut, JSON.stringify(ketjut));
  vaadi('2. konteksti on käynnissä eleen jälkeen', ketjut.tila === 'running', String(ketjut.tila));
  vaadi('2. ketjut eivät tuota virheitä sivulle', tila.virheet.length === 0, tila.virheet.join(' | '));

  const nappi = await sivu.evaluate(() => Boolean(document.getElementById('kehittaja-tehosteketjut-btn')));
  vaadi('3. kuuntelunappi on ratasvalikossa', nappi);
  const kuuntelu = await sivu.evaluate(async () => {
    const m = await import('/js/tehosteketju.js');
    const tulos = await m.kuunteleTehosteketjut();
    await new Promise((r) => setTimeout(r, (m.TEHOSTEKETJUT.length + 1) * m.KUUNTELUN_ASKEL_S * 1000 + 300));
    return tulos;
  });
  vaadi('3. kuunteleTehosteketjut soittaa suoran ja viisi ketjua', kuuntelu === 'ok', String(kuuntelu));
  vaadi('3. soiton aikana ei virheitä', tila.virheet.length === 0, tila.virheet.join(' | '));

  const kortti = await sivu.evaluate(async () => {
    const m = await import('/js/tehosteketju.js');
    const f = await import('/js/fokuskohteet.js');
    const { FOKUSKOHTEET_BIH } = await import('/js/packs/fokuskohteet-bih.js');
    const kohde = FOKUSKOHTEET_BIH.find((k) => k.id === 'vjetrenica');
    const ui = window.matkakirja.ui;
    let virhe = null;
    try {
      f.avaaFokuskohde(ui, kohde);
    } catch (e) {
      virhe = String(e?.message ?? e);
    }
    const auki = m.akustiikka();
    const kortti = Boolean(ui.fokuskohdeAuki?.kohde === kohde);
    f.suljeFokuskohde(ui);
    return { data: kohde?.akustiikka, auki, kortti, jalkeen: m.akustiikka(), virhe };
  });
  vaadi('4. luolan kortti asettaa akustiikan ja sulkeminen nollaa sen',
    kortti.data === 'luola' && kortti.auki === 'luola' && kortti.kortti && kortti.jalkeen === null && !kortti.virhe,
    JSON.stringify(kortti));

  const pois = await sivu.evaluate(async () => {
    const m = await import('/js/tehosteketju.js');
    const { sfx } = await import('/js/sound.js');
    sfx.setEnabled(false);
    const tulos = await m.kuunteleTehosteketjut();
    const ketju = sfx.ctx ? m.tehosteketju(sfx.enabled ? sfx.ctx : null, 'luola', sfx.bus) : null;
    sfx.setEnabled(true);
    return { tulos, ketju: Boolean(ketju) };
  });
  vaadi('5. äänet pois -asetus pysäyttää kuuntelun', pois.tulos === 'aanet-pois' && !pois.ketju, JSON.stringify(pois));

  tieto('savukkeen katkaisemat pyynnöt', [...new Set(tila.katkaistut)].join(', ') || 'ei yhtään');
  await ctx.close();
}

/* ================= ILMAN KIRJASTOA ================= */
{
  const { ctx, sivu, tila } = await avaaSivu({ ampari: false });
  const vara = await sivu.evaluate(async () => {
    const m = await import('/js/tehosteketju.js');
    const { sfx } = await import('/js/sound.js');
    sfx.enabled = true;
    const T = await m.lataaTuna();
    const c = sfx.ensureContext();
    const ketju = c ? m.tehosteketju(c, 'luola', sfx.bus) : 'ei kontekstia';
    const kuuntelu = await m.kuunteleTehosteketjut();
    await new Promise((r) => setTimeout(r, 1200));
    return { T, ketju, kuuntelu };
  });
  vaadi('6. ilman kirjastoa lataus on null, ketju null ja kuuntelu kertoo syyn',
    vara.T === null && vara.ketju === null && vara.kuuntelu === 'ei-kirjastoa', JSON.stringify(vara));
  vaadi('6. virhehaara ei tuota virheitä sivulle', tila.virheet.length === 0, tila.virheet.join(' | '));
  vaadi('6. kirjastoa yritettiin (pyyntö lähti, katkaistiin)', tila.tuna >= 1, `pyyntöjä ${tila.tuna}`);
  tieto('savukkeen katkaisemat pyynnöt', [...new Set(tila.katkaistut)].join(', ') || 'ei yhtään');
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
