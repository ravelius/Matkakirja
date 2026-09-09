/*
 * Savuke: LEHDEN SIVUNKÄÄNTÖ EI POMPAUTA SISÄLTÖÄ (omistaja 9.9.2026
 * klo 14.25, sanatarkasti: *"nyt jos lehteä selaa nuolinäppäimillä niin
 * lehden koko pomppaa hieman sivun käännön ajaksi. syy on oikeanpuolen
 * vierityspalkissa joka häviää käännöksen aikana mutta saa samalla
 * aikaan sivun sisällön leviämisen."*; Raamattu: LEHDEN SIVUNKÄÄNTÖ EI
 * SAA POMPAUTTAA SISÄLTÖÄ: VIERITYSPALKKI EI MUUTA SIVUN LEVEYTTÄ).
 *
 * JUURISYY, JOTA TÄMÄ VARTIOI. Kääntöteatterin kloonit ovat
 * `overflow-y: hidden` (css/styles.css `.sivunkaanto-sivu
 * .dialog-card`): ilman varattua kaistaa klooni ei piirrä
 * vierityspalkkia, ja klassisilla palkeilla sen 15 px vapautuu
 * tekstille juuri käännön ajaksi. Mitattu ennen korjausta 1600×1000,
 * Lontoon kaupunkilehti: elävä kortti 943 px, klooni 958 px. Korjaus on
 * `scrollbar-gutter: stable` molemmille.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *  1. Elävä lehtikortti varaa vierityspalkin kaistan aina
 *     (scrollbar-gutter: stable).
 *  2. Kääntöteatterin klooni varaa saman kaistan.
 *  3. Kortin sisäleveys (clientWidth) on TÄSMÄLLEEN sama ennen
 *     nuolinäppäintä, käännön aikana (rAF-näytteet teatterin ollessa
 *     näkyvissä) ja sen jälkeen — toleranssi 0 px.
 *  4. Sama sisältöleveydelle: kortin levein näkyvä lapsi mitattuna
 *     getBoundingClientRectillä ei muutu käännön aikana.
 *
 * KLASSISET VIERITYSPALKIT. Headless-Chromium piirtää päällekkäiset
 * (overlay) palkit, jotka eivät vie tilaa — silloin vika ei toistu
 * eivätkä mitat pompi kummallakaan koodilla. Siksi savuke ajaa
 * mieluiten näytöllisenä (`xvfb-run -a node ...`, jolloin DISPLAY on
 * asetettu) ja pakottaa klassiset palkit lipulla
 * `--disable-features=OverlayScrollbar`. Ilman DISPLAYtä ajo jatkuu
 * headlessinä ja tulostaa siitä HUOM-rivin: vartiot 1 ja 2 ovat silti
 * täysimääräisiä, sillä ne lukevat lasketun tyylin.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1):
 * StPageFlip haetaan Noden fetchillä ja tarjoillaan selaimelle.
 * Ilman ämpäriä teatteria ei synny, ja kloonivartiot todetaan
 * ohitetuiksi (HUOM) — muut ajetaan.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 xvfb-run -a node tools/savukkeet/savuke-lehden-kaanto.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
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

/* Kirjasto ämpäristä Noden kautta (kontin selain ei osaa välitystä). */
const KIRJASTO = 'https://media.matkakirja.app/vendor/page-flip-2.0.7.browser.js';
const kirjasto = await fetch(KIRJASTO)
  .then(async (v) => (v.ok ? Buffer.from(await v.arrayBuffer()) : null))
  .catch(() => null);
if (!kirjasto) console.log('HUOM  ämpäri ei vastaa — teatteria ei synny, kloonivartiot ohitetaan');
else tieto('kirjasto ämpäristä', `${kirjasto.length} tavua`);

/*
 * NÄYTTÖ = KLASSISET PALKIT. DISPLAY tarkoittaa xvfb:tä (tai oikeaa
 * näyttöä): silloin selain ajetaan näytöllisenä ja overlay-palkit
 * sammutetaan, jolloin palkki vie oikeasti tilaa ja mittavartiot
 * purevat. Headlessissä palkki on 0 px levyinen eikä vikaa voi toistaa.
 */
const NAYTOLLA = Boolean(process.env.DISPLAY);
if (!NAYTOLLA) console.log('HUOM  DISPLAY puuttuu — ajetaan headlessinä, jossa vierityspalkki ei vie tilaa');
const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  headless: !NAYTOLLA,
  args: NAYTOLLA ? ['--disable-features=OverlayScrollbar', '--no-sandbox'] : [],
});

/* Työpöytäkoko: leveä lehti, jossa palkki näkyy kortin oikeassa reunassa. */
const ctx = await selain.newContext({
  viewport: { width: 1600, height: 1000 },
  serviceWorkers: 'block',
});
/* Tallenne: Fogg Lontoossa, laatta pois — kaupunkilehti aukeaa suoraan. */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'lontoo' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('lontoo');
await ctx.addInitScript((data) => {
  try {
    localStorage.setItem('matkakirja-save-v1', data);
    localStorage.removeItem('matkakirja-lauta');
  } catch { /* yksityinen tila */ }
}, JSON.stringify(peli.toJSON()));
const sivu = await ctx.newPage();
/*
 * Ulkoverkko poikki (selain ei osaa välityspalvelinta) paitsi
 * kääntökirjasto, joka tarjoillaan Noden hakemasta puskurista.
 * Luentapalvelin katkeaa samalla: savuke ei kuluta generointikiintiötä.
 */
await sivu.route('**://**', (reitti) => {
  const url = reitti.request().url();
  if (url.includes('localhost') || url.startsWith('data:')) { reitti.continue(); return; }
  if (kirjasto && url.includes('/vendor/page-flip')) {
    reitti.fulfill({ status: 200, contentType: 'text/javascript', body: kirjasto });
    return;
  }
  reitti.abort();
});
await sivu.goto(osoite, { waitUntil: 'domcontentloaded' });
await sivu.waitForTimeout(2500);

const PALKKI = await sivu.evaluate(() => {
  const d = document.createElement('div');
  d.style.cssText = 'width:100px;height:100px;overflow:scroll;position:absolute;top:-9999px';
  document.body.appendChild(d);
  const w = d.offsetWidth - d.clientWidth;
  d.remove();
  return w;
});
tieto('vierityspalkin leveys', `${PALKKI} px`);

await sivu.evaluate(() => {
  const { ui } = window.matkakirja;
  const oma = ui.game.cityOf();
  ui.game.tokens?.delete(oma.id);
  ui.openArrival(oma);
});
await sivu.waitForTimeout(2000);
vaadi('kaupunkilehti aukeaa (Lontoo)',
  await sivu.evaluate(() => Boolean(document.getElementById('arrival-dialog')?.open)));
vaadi('lehdessä on selattavia sivuja',
  await sivu.evaluate(() => (window.matkakirja.ui.lehtitila.tutkiSivut?.length ?? 0) > 1));

/*
 * Yksi mittaus: näkyvissä oleva sivu on joko elävä kortti tai — käännön
 * aikana — teatterin klooni sen päällä. Molemmista luetaan sama
 * sisäleveys, levein näkyvä lapsi ja varatun kaistan tila.
 */
const MITTA = `(() => {
  const teatteri = document.querySelector('#arrival-dialog .sivunkaanto-teatteri');
  const nakyy = Boolean(teatteri) && !teatteri.hidden;
  const kortti = nakyy
    ? teatteri.querySelector('.dialog-card')
    : document.querySelector('#arrival-dialog > .dialog-card');
  if (!kortti) return null;
  const leveydet = [...kortti.children]
    .map((el) => el.getBoundingClientRect().width)
    .filter((w) => w > 0);
  return {
    teatteri: nakyy,
    sisus: kortti.clientWidth,
    sisalto: leveydet.length ? Math.round(Math.max(...leveydet) * 100) / 100 : null,
    kaista: getComputedStyle(kortti).scrollbarGutter,
  };
})()`;

const ennen = await sivu.evaluate(MITTA);
tieto('ennen kääntöä', JSON.stringify(ennen));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'lehti-kaanto-ennen.png') });

vaadi('elävä lehtikortti varaa vierityspalkin kaistan (scrollbar-gutter: stable)',
  ennen?.kaista === 'stable', `kaista=${ennen?.kaista}`);

/* Nuolinäppäin kääntää, ja jokainen kehys mitataan käännön ajan. */
const naytteet = await sivu.evaluate(async (koodi) => {
  // eslint-disable-next-line no-new-func
  const mittaa = new Function(`return ${koodi}`);
  document.querySelector('#arrival-dialog > .dialog-card').focus();
  const tulos = [];
  document.getElementById('arrival-dialog').dispatchEvent(
    new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }),
  );
  for (let i = 0; i < 45; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await new Promise((ok) => { requestAnimationFrame(ok); });
    tulos.push(mittaa());
  }
  return tulos;
}, MITTA);
const kesken = naytteet.filter((m) => m?.teatteri);
tieto('kehyksiä käännön aikana', `${naytteet.length} (teatteri näkyvissä ${kesken.length})`);

await sivu.waitForTimeout(1500);
const jalkeen = await sivu.evaluate(MITTA);
tieto('käännön jälkeen', JSON.stringify(jalkeen));
if (KUVAKANSIO) await sivu.screenshot({ path: join(KUVAKANSIO, 'lehti-kaanto-jalkeen.png') });

vaadi('sivu vaihtui nuolinäppäimestä',
  await sivu.evaluate(() => window.matkakirja.ui.lehtitila.tutkiSivu) > 0);

if (kirjasto && kesken.length > 0) {
  const kaistat = [...new Set(kesken.map((m) => m.kaista))];
  vaadi('kääntöteatterin klooni varaa saman kaistan',
    kaistat.length === 1 && kaistat[0] === 'stable', `kaistat=${kaistat.join(', ')}`);
  const sisukset = [...new Set([ennen.sisus, ...kesken.map((m) => m.sisus), jalkeen.sisus])];
  vaadi('kortin sisäleveys on sama ennen kääntöä, sen aikana ja jälkeen (0 px)',
    sisukset.length === 1, `leveydet=${sisukset.join(', ')}`);
  const sisallot = [...new Set([ennen.sisalto, ...kesken.map((m) => m.sisalto), jalkeen.sisalto]
    .filter((w) => w !== null))];
  vaadi('sisältöelementin leveys ei muutu käännön aikana (0 px)',
    sisallot.length === 1, `leveydet=${sisallot.join(', ')}`);
} else {
  console.log('HUOM  teatteria ei nähty (kirjasto tai ajoitus) — kloonivartiot ohitettiin');
  vaadi('kortin sisäleveys on sama ennen kääntöä ja sen jälkeen (0 px)',
    ennen.sisus === jalkeen.sisus, `${ennen.sisus} ≠ ${jalkeen.sisus}`);
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
