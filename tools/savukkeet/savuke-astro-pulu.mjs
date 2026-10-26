/*
 * SELAINSAVUKE: PULUN TERVETULO ASTRONAUTIN KAMERASSA (A1–A2).
 *
 *   PLAYWRIGHT_JS=… CHROMIUM=… SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader" \
 *     node tools/savukkeet/savuke-astro-pulu.mjs
 *
 * Käsikirjoitus: päätoimittaja 28.9.2026 (docs/raportit/
 * pulu-iss-kasikirjoitus-20260928.md), lyhennetty omistajan palautteella
 * 29.9.2026 (B ja C pois, ei kuplia, taulu auki puheen ajan); logiikka
 * js/linssit/pulu-tervetulo.js, yksikkötestit tests/pulu-iss.test.mjs.
 * Yksikkötestit näkevät ajoituksen tynkäkellolla; TÄMÄ mittaa oikealla
 * pallolla ja oikeilla eleven_v4-äänitteillä, että jakso oikeasti tapahtuu.
 *
 * OMISTAJA 29.9.2026: *"Ota pulun ääni toistaiseksi kokonaan pois
 * ISS-kohtauksesta."* (js/linssit/pulu-tervetulo.js PULUN_TERVETULO_KAYTOSSA).
 *
 * VÄITTEET:
 *   1. Ensimmäinen avaus ei aloita tervetuloa eikä kuluta muistia.
 *   2. Pulun taulu aukeaa itsestään heti paljastuksen jälkeen.
 *   3. Pulu ei puhu: yhtään ISS-äänitettä ei soiteta 15 s:n aikana, eikä
 *      Pulun kuplaa näy.
 *   4. Aseman seuranta on päällä (Pulu ei liikuta kameraa).
 *
 * VERKKO: ämpäri Noden fetchin kautta (äänet, Globe.gl, tekstuurit), muu katki.
 */
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { avaaChromium } from '../selain.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const VALIMUISTI = new Map();
function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
const PORTTI = Number(process.env.PORTTI ?? 8771);
await new Promise((r) => palvelin.listen(PORTTI, r));

// Rivikohtaiset Chromium-liput (SAVUKE_CHROMIUM_LIPUT) samalla shimillä kuin sarja-ajossa.
await import('./chromium-liput.mjs');
const selain = await avaaChromium({
  args: ['--autoplay-policy=no-user-gesture-required'],
});

const { PULUN_TERVETULO_TALLE } = await import('../../js/linssit/pulu-tervetulo.js');

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Kaaren etäisyys asteina (pallon pinnalla). */

/* Soittimen haut sivulla: jokainen play() jättää osoitteensa. */
const VAHTI = () => {
  window.__puluSoitot = [];
  const vanha = HTMLMediaElement.prototype.play;
  HTMLMediaElement.prototype.play = function play(...a) {
    window.__puluSoitot.push({ src: String(this.currentSrc || this.src || ''), t: Math.round(performance.now()) });
    return vanha.apply(this, a);
  };
};

async function avaaSivu(virheet, haetut) {
  const konteksti = await selain.newContext({
    viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  await konteksti.addInitScript(() => {
    try {
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  });
  await konteksti.addInitScript(VAHTI);
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/, async (route) => {
    const url = route.request().url();
    const vastaus = await ulkohaku(url);
    if (/livia-iss-/.test(url)) haetut.push({ url, ok: Boolean(vastaus) });
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virheet.push(String(e?.message ?? e).slice(0, 300)));
  return { konteksti, sivu };
}

async function avaaPeli(s) {
  await s.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
    document.querySelector('dialog[open]')?.close?.();
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
    // Livia on pelissä: pöllö löydetty ja nappi näkyvissä (kupla tarvitsee sen).
    window.matkakirja.game.polloLoydetty = true;
    window.matkakirjaPollo?.paivitaNakyvyys?.();
  });
  await s.waitForTimeout(1200);
  return pallo;
}

/** Linssi päälle ja odotus, kunnes sen kahva on olemassa (avaus on asynkroninen). */
const avaaLinssi = async (s) => {
  await s.evaluate(() => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
  });
  await s.waitForFunction(() => Boolean(window.matkakirja.ui.pallolinssi?.kahva), null, { timeout: 30000 })
    .catch(() => {});
  return s.evaluate(() => {
    const kahva = window.matkakirja.ui.pallolinssi?.kahva;
    return { avattu: Boolean(kahva), tervetulo: Boolean(kahva?.tervetulo) };
  });
};

/** Näytteet sivulla, kunnes jakso on ohi tai katto täynnä. */

/* ════════════════ AJO: hiljainen avaus ════════════════ */
{
  const virheet = [];
  const haetut = [];
  const { konteksti, sivu: s } = await avaaSivu(virheet, haetut);
  vaadi('pallolauta avautuu', await avaaPeli(s));
  const avaus = await avaaLinssi(s);
  vaadi('1. avaus ei aloita tervetuloa', avaus.avattu && !avaus.tervetulo, JSON.stringify(avaus));
  const auki = await s.waitForFunction(
    () => Boolean(window.matkakirja.ui.pallolinssi?.kahva?.taulu?.tila?.()?.auki), null, { timeout: 30000 },
  ).then(() => true).catch(() => false);
  vaadi('2. Pulun taulu aukeaa itsestään', auki);
  await s.waitForTimeout(15000);
  const tila = await s.evaluate(() => ({
    soitot: (window.__puluSoitot ?? []).map((x) => x.src).filter((src) => /livia-iss-/.test(src)),
    kuplat: document.querySelectorAll('.pollo-vihje').length,
    seuranta: window.matkakirja.ui.pallolinssi?.kahva?.avaruus?.tila?.()?.issSeuranta ?? null,
  }));
  vaadi('3. Pulu ei puhu (ei ISS-äänitteitä)', tila.soitot.length === 0 && haetut.length === 0, JSON.stringify(tila.soitot));
  vaadi('3. ei Pulun kuplaa', tila.kuplat === 0, `${tila.kuplat} kuplaa`);
  vaadi('4. aseman seuranta päällä', tila.seuranta === true, `seuranta ${tila.seuranta}`);
  const muisti = await s.evaluate((k) => localStorage.getItem(k), PULUN_TERVETULO_TALLE);
  vaadi('1. muistia ei kulutettu', muisti === null);
  await s.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();
const lapi = tulokset.filter((t) => t.ok).length;
console.log(`\nSavuke astro-pulu: ${lapi}/${tulokset.length} läpi.`);
process.exit(lapi === tulokset.length ? 0 : 1);
