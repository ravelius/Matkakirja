/*
 * SELAINSAVUKE: VIISAAN PÖLLÖN ARVONIMET NIMILAPUSSA (Raamattu VIISAAN
 * POLLON ARVONIMET, omistaja 19.9.2026 klo 21.45; js/ui-apurit.js
 * polloNimilappu `arvonimi`, tiivistaNimilappu; data
 * js/packs/pollon-arvonimet.js).
 *
 *   PLAYWRIGHT_JS=<polku>/playwright/index.js CHROMIUM=<selain> \
 *     node tools/savukkeet/savuke-arvonimet.mjs
 *
 * VÄITTEET (390 × 844, Ateenan kohdekortti):
 *   1. 20 avausta → vähintään 5 eri arvonimeä.
 *   2. Yksikään otsikko ei rivity (yksi rivi) eikä ylitä korttia.
 *   3. Pisin nimi ("Pöllöltä, Jolla On Kaksi Tutkintoa Enemmän Kuin
 *      Sinulla") mahtuu: tiivistys scaleX ≥ NIMILAPUN_TIIVISTYS_MIN, "pululta" näkyy
 *      kortin sisällä ja kynänveto on sanan levyinen.
 *   4. Ei sivuvirheitä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI_VALIMUISTI = new Map();
async function ampariHaku(url) {
  if (AMPARI_VALIMUISTI.has(url)) return AMPARI_VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI_VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8783, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

/** Omistajan katselumitat: iPad-luokan ruutu ja puhelin. */
const NAKYMAT = {
  tabletti: { viewport: { width: 834, height: 1100 }, deviceScaleFactor: 1 },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virhelista) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    /*
     * PUUTTUVA KUVA ON 404 EIKÄ KATKO. Lisänostojen kuvituskuvat ovat
     * vielä kuvaputkella (aikajana/ihmisen-matka/nosto/<tunnus>.jpg),
     * ja kortin varapaikka syntyy nimenomaan img-alkion `error`-
     * tapahtumasta: abort ei laukaise sitä kaikissa selaimissa.
     */
    if (!vastaus) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virhelista.push(String(e)));
  return { konteksti, sivu };
}
async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8783/index.html?lauta=pallo', { waitUntil: 'load' });
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
    // Pöllö on aarre: ilman löytöä valmiit kysymykset eivät lähtisi.
    game.polloLoydetty = true;
    ui.render();
  });
  await s.waitForTimeout(1200);
  return s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
}
const PISIN = 'Pöllöltä, Jolla On Kaksi Tutkintoa Enemmän Kuin Sinulla';
const virheet = [];
const { konteksti, sivu: s } = await avaaSivu({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true }, virheet);
vaadi('peli aukesi', await avaaPeli(s));
const avaukset = await s.evaluate(async () => {
  const { KOHDE_MAAT, kohteidenNykyinenIso, avaaFokuskohde } = await import('/js/fokuskohteet.js');
  const ui = window.matkakirja.ui;
  const kohde = (KOHDE_MAAT[kohteidenNykyinenIso(ui)] ?? []).find((k) => k.kysymykset?.length) ?? (KOHDE_MAAT[kohteidenNykyinenIso(ui)] ?? [])[0];
  const ulos = [];
  for (let i = 0; i < 20; i += 1) {
    document.querySelector('.fokuskohde-popup .fokuskohde-sulje, .fokuskohde-sulje')?.click();
    await new Promise((r) => setTimeout(r, 120));
    avaaFokuskohde(ui, kohde, {});
    await new Promise((r) => setTimeout(r, 300));
    // Kuva edellä (js/nostokuva.js): "Lisää" latoo koko kortin.
    document.querySelector('.fokuskohde-popup .nostokuva-lisaa, .nostokuva-lisaa')?.click();
    await new Promise((r) => setTimeout(r, 450));
    const h = document.querySelector('.fokuskohde-kysy-otsikko');
    if (!h) { ulos.push({ puuttuu: true, kohde: kohde?.nimi, kysymyksia: kohde?.kysymykset?.length ?? 0, kortti: !!document.querySelector('[class*="fokuskohde"]') }); continue; }
    const kortti = h.closest('[class*="fokuskohde"]:not(.fokuskohde-kysy-otsikko)') ?? h.parentElement;
    const hb = h.getBoundingClientRect(); const kb = kortti.getBoundingClientRect();
    const lh = parseFloat(getComputedStyle(h).lineHeight) || parseFloat(getComputedStyle(h).fontSize) * 1.3;
    const sana = h.querySelector('.pollo-yliviivattu-sana');
    ulos.push({
      nimi: sana?.textContent ?? '', rivi: hb.height <= lh * 1.5, ylittaa: h.scrollWidth > h.clientWidth + 1 || hb.right > kb.right + 1,
      k: sana?.style.transform || '1',
    });
  }
  return ulos;
});
const nimet = new Set(avaukset.map((a) => a.nimi).filter(Boolean));
vaadi('20 avausta: vähintään 5 eri arvonimeä', nimet.size >= 5, `${nimet.size}: ${[...nimet].slice(0, 8).join(' | ')}`);
vaadi('yksikään otsikko ei rivity eikä ylitä korttia', avaukset.length === 20 && avaukset.every((a) => a.rivi && !a.ylittaa && !a.puuttuu),
  JSON.stringify(avaukset.filter((a) => !a.rivi || a.ylittaa || a.puuttuu).slice(0, 3)));
const pisin = await s.evaluate(async (PISIN) => {
  const { polloNimilappu, tiivistaNimilappu, NIMILAPUN_TIIVISTYS_MIN } = await import('/js/ui-apurit.js');
  const h = document.querySelector('.fokuskohde-kysy-otsikko');
  const uusi = document.createElement('p'); uusi.className = h.className;
  h.replaceWith(uusi);
  polloNimilappu(uusi, { ennen: 'Kysy ', yli: PISIN, tilalle: 'pululta', jalkeen: ':' });
  uusi.style.whiteSpace = 'nowrap';
  const k = tiivistaNimilappu(uusi);
  const b = uusi.getBoundingClientRect();
  const viiva = uusi.querySelector('.pollo-yliviivattu').getBoundingClientRect();
  const sana = uusi.querySelector('.pollo-yliviivattu-sana').getBoundingClientRect();
  const lh = parseFloat(getComputedStyle(uusi).lineHeight) || 20;
  return { k: +k.toFixed(3), min: NIMILAPUN_TIIVISTYS_MIN, mahtuu: uusi.scrollWidth <= uusi.clientWidth + 1, yksiRivi: b.height <= lh * 1.5,
    vetoSanaEro: Math.abs(viiva.width - sana.width).toFixed(1), leveys: Math.round(b.width) };
}, PISIN);
vaadi('pisin nimi mahtuu yhdelle riville tiivistettynä, veto sanan levyinen', pisin.mahtuu && pisin.yksiRivi && pisin.k >= pisin.min && pisin.k < 1 && Number(pisin.vetoSanaEro) < 3,
  JSON.stringify(pisin));
await s.screenshot({ path: join(ULOS, 'arvonimet-pisin-390.png') });
vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));
await konteksti.close();
await selain.close();
palvelin.close();
const hylatyt = tulokset.filter((t) => !t.ok).length;
console.log(`\n${tulokset.length - hylatyt}/${tulokset.length} läpi`);
process.exit(hylatyt ? 1 : 0);
