/*
 * Savuke: TANGERIN LAIVAMATKA EI JUMITA.
 *
 * LÖYDÖS (Sonnet-testaaja, iPhone 18 Pro -simulaattori, tuotanto v1949,
 * 19.9.2026, docs/raportit/viesti-fable-ranska-testipeli-20260919.md
 * löydös 2): Tangerissa "Liiku" → laiva → "Laivalla (100 p)" → ruudulle
 * jäi noppakuvake, joka EI reagoinut yhteenkään kosketukseen. Sivun
 * uudelleenlataus ei auttanut, ja nappulan napautus toisti saman
 * saapumiskertomuksen ("Voi että — Tanger!") loputtomiin. Ainoa
 * ulospääsy oli "Uusi peli".
 *
 * ── MIKSI SAVUKE EIKÄ YKSIKKÖTESTI ────────────────────────────────
 *
 * Pelisäännöt olivat koko ajan kunnossa: Nodessa Tangerista lähtee
 * merikaari dakariin, ja findMoves antaa jokaiselle silmäluvulle
 * lailliset siirrot. Jumi oli KÄYTTÖLIITTYMÄN kerroksessa: noppanappi
 * ladotaan monitoiminapin liukuun, joka on suljettuna `opacity: 0;
 * pointer-events: none` — noppa siis piirtyi DOM:iin mutta napautus
 * meni sen läpi karttapallolle. Sellaista kerrosta ei ole Nodessa
 * olemassa, joten väitteet mitataan oikeassa selaimessa. WebKit on
 * ensisijainen, koska löydös tuli iOS Safarista.
 *
 * MITTA ON OSUMATESTI, EI KUUNTELIJA: nappia napautetaan hiirellä sen
 * keskipisteeseen ja osuma varmistetaan `elementFromPoint`-luvulla.
 * `element.click()` olisi mennyt läpi jumistakin.
 *
 * ── VÄITTEET ──────────────────────────────────────────────────────
 *
 *   1. "Laivalla (100 p)" vie nopanheittovaiheeseen ja jättää
 *      toimintorivin ELÄVÄKSI (ei data-busy, noppanappi käytettävissä).
 *   2. Nopan napautus vie siirron eteenpäin alle 3 s:ssa: vaihe on
 *      'move' ja kohteita on valittavana (tai nappula on jo liikkunut).
 *   3. Sivun uudelleenlataus KESKEN laivamatkan (nappula merikaaren
 *      askelpisteessä) ei toista saapumiskertomusta, ja peli jatkuu:
 *      noppa on yhä napautettavissa ja vie siirtovaiheeseen.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1), koska
 * media.matkakirja.app ei anna CORS-lupaa 127.0.0.1:lle. Ilman ämpäriä
 * palloa ei saa auki ja savuke OHITETAAN.
 *
 * Aja: NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-laivamatka-tanger.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { findMoves } from '../../js/rules.js';

const paketinLahde = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'));
// CommonJS-paketti voi tulla default-kääreen sisällä (Macin runner 19.9.2026:
// paketti.webkit oli undefined, savuke kaatui ennen yhtään väitettä).
const paketti = paketinLahde?.webkit ? paketinLahde : (paketinLahde?.default ?? paketinLahde);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const LAHTOKAUPUNKI = 'tanger';
/** Puhelimen ruutu: löydös tuli iPhonesta, joten 390 px on se mitta. */
const RUUTU = { nimi: '390 px', width: 390, height: 844, dpr: 2 };
/** Väite 2:n aikakatto — erän mitta "alle 3 s". */
const NOPAN_KATTO_MS = 3000;

const KAIKKI_SELAIMET = [
  { nimi: 'webkit', avaa: () => paketti.webkit.launch() },
  {
    nimi: 'chromium',
    avaa: () => paketti.chromium.launch({
      executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
    }),
  },
];
const SELAIMET = process.env.SAVUKE_SELAIN
  ? KAIKKI_SELAIMET.filter((s) => s.nimi === process.env.SAVUKE_SELAIN)
  : KAIKKI_SELAIMET;

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.webmanifest': 'application/manifest+json',
  '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(Number(process.env.SAVUKE_PORTTI) || 0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const AMPARI = 'https://media.matkakirja.app/';
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
  console.log('OHITUS  ämpäri ei vastaa — palloa ei voi avata; savuke ohitetaan');
  palvelin.close();
  process.exit(0);
}

const PALLON_PACK = packById('maailmankartta');

/** Tallennus: Fogg seisoo Tangerin satamassa, vuoro alussa. */
function satamassa() {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: PALLON_PACK,
    seed: 5,
  });
  peli.phase = 'action';
  return JSON.stringify(peli.toJSON());
}

/**
 * Tallennus: Fogg on KESKEN merimatkan, nappula Tanger–Dakar-kaaren
 * askelpisteessä. Tila rakennetaan pelin omilla teoilla (valinta, heitto,
 * siirto), jotta se on täsmälleen se tila, johon pelaaja päätyy — ei
 * käsin kyhätty JSON.
 */
function merella() {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: LAHTOKAUPUNKI }],
    pack: PALLON_PACK,
    seed: 5,
  });
  peli.phase = 'action';
  peli.actionTravel('sea');
  peli.die = 2;
  peli.moves = findMoves(peli.board, peli.player.pos, 2, { mode: 'sea' });
  peli.phase = 'move';
  // posKey (js/rules.js): kaari on `e:<edge>:<idx>`, kaupunki `c:<id>`.
  const avain = [...peli.moves.keys()].find((k) => k.startsWith('e:'));
  peli.actionMove(avain);
  return { tallenne: JSON.stringify(peli.toJSON()), pos: peli.player.pos };
}

/** Yksi lause pelin tilasta — kaikki väitteet lukevat tämän. */
const LUE = `() => {
  const { ui, game } = window.matkakirja;
  const rivi = document.getElementById('actions');
  const noppa = [...rivi.querySelectorAll('button')]
    .find((b) => (b.getAttribute('aria-label') || '').startsWith('Heitä noppa'));
  return {
    vaihe: game.phase,
    tapa: game.travelMode,
    busy: Boolean(ui.busy),
    riviJumissa: rivi.hasAttribute('data-busy'),
    // Juurisyyn mittarit: kumpi kerros sulki napautuksen.
    riviLuokat: (ui.toimintoRivi?.className || ''),
    riviOttaa: getComputedStyle(rivi).pointerEvents,
    noppaOttaa: noppa ? getComputedStyle(noppa).pointerEvents : null,
    noppaNakyy: noppa ? getComputedStyle(noppa.parentElement).opacity : null,
    noppaa: Boolean(noppa),
    noppaEstetty: noppa ? noppa.disabled : null,
    kohteita: game.moves ? game.moves.size : 0,
    paikka: game.player.pos.type === 'city' ? game.player.pos.city
      : game.player.pos.edge + '@' + game.player.pos.idx,
    raha: game.player.money,
    kertomus: (document.getElementById('factText')?.textContent || '').slice(0, 40),
  };
}`;

/*
 * NOPPAA NAPAUTETAAN SORMELLA, EI `element.click()`:llä.
 *
 * Juuri tämä on koko löydöksen mitta: `click()` ajaa kuuntelijan
 * suoraan ja menisi läpi silloinkin, kun nappi on `pointer-events:
 * none` -kerroksen alla. Playwrightin hiiri osuu siihen elementtiin,
 * jonka SELAIN valitsee osumatestissä — sama päättely kuin iPhonen
 * kosketuksella. Siksi napautus tehdään napin keskipisteeseen ja
 * osuma varmistetaan `elementFromPoint`-lukemalla.
 */
const OSUMA = `(mitat) => {
  const piste = document.elementFromPoint(mitat.x, mitat.y);
  const noppa = piste?.closest('button');
  return (noppa?.getAttribute('aria-label') || '').startsWith('Heitä noppa')
    ? 'noppa' : (piste?.className || piste?.tagName || 'tyhjä');
}`;

async function napautaNoppa(sivu) {
  const nappi = sivu.locator('#actions button[aria-label^="Heitä noppa"]').first();
  if (!await nappi.count()) return { tulos: 'ei noppaa' };
  const laatikko = await nappi.boundingBox();
  if (!laatikko) return { tulos: 'noppa ei ole ruudulla' };
  const piste = { x: laatikko.x + laatikko.width / 2, y: laatikko.y + laatikko.height / 2 };
  const osuma = await sivu.evaluate(`(${OSUMA})(${JSON.stringify(piste)})`);
  if (osuma !== 'noppa') return { tulos: `napautus osuu muualle: ${osuma}` };
  await sivu.mouse.click(piste.x, piste.y);
  return { tulos: 'napautettu' };
}

async function avaaKonteksti(selain, tallenne) {
  const ctx = await selain.newContext({
    viewport: { width: RUUTU.width, height: RUUTU.height },
    deviceScaleFactor: RUUTU.dpr,
    serviceWorkers: 'block',
  });
  /*
   * TALLENNUS KIRJOITETAAN VAIN KERRAN. Init-skripti ajetaan myös
   * uudelleenlatauksessa, ja ehdoton kirjoitus palauttaisi alkutilan
   * juuri silloin, kun mitataan mitä UUDELLEENLATAUS tekee pelin omalle
   * tallennukselle (väite 3).
   */
  await ctx.addInitScript((data) => {
    try {
      if (!localStorage.getItem('matkakirja-save-v1')) {
        localStorage.setItem('matkakirja-save-v1', data);
      }
      localStorage.removeItem('matkakirja-lauta');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  return { ctx, sivu, virheet };
}

/** "Liiku" → laiva → "Laivalla (100 p)" oikeina napautuksina. */
const VALITSE_LAIVA = `async () => {
  const nappi = (teksti) => [...document.querySelectorAll('#actions button')]
    .find((b) => ((b.getAttribute('aria-label') || '') + ' ' + (b.textContent || ''))
      .includes(teksti));
  const odota = (ms) => new Promise((r) => setTimeout(r, ms));
  const liiku = nappi('Liiku');
  if (!liiku) return { virhe: 'ei Liiku-nappia' };
  liiku.click();
  await odota(500);
  const laiva = nappi('Laivalla');
  if (!laiva) return { virhe: 'ei laivanappia' };
  laiva.click();
  await odota(500);
  const lippu = nappi('Laivalla (');
  if (!lippu) return { virhe: 'ei laivalippua' };
  lippu.click();
  await odota(900);
  return { ok: true };
}`;

async function odotaPeli(sivu, { uudelleen = false } = {}) {
  if (uudelleen) await sivu.reload({ waitUntil: 'domcontentloaded', timeout: 60000 });
  else await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 });
  await sivu.evaluate(async () => {
    const l = window.matkakirja.ui.pallolauta;
    await l.saavu({ kesto: 0 });
    await new Promise((v) => setTimeout(v, 1200));
  });
}

for (const selainTieto of SELAIMET) {
  const selain = await selainTieto.avaa().catch((e) => {
    console.log(`OHITUS  ${selainTieto.nimi} ei käynnisty — ${e.message}`);
    return null;
  });
  if (!selain) continue;
  const tunnus = selainTieto.nimi;


  /* ── 1–2. satamasta merelle, ja 3 sama uudelleenladattuna ────── */
  {
    const { ctx, sivu, virheet } = await avaaKonteksti(selain, satamassa());
    await odotaPeli(sivu);

    const valinta = await sivu.evaluate(`(${VALITSE_LAIVA})()`);
    tieto(`${tunnus}: laivan valinta`, JSON.stringify(valinta));
    const satamassaTila = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: tila laivalipun jälkeen`, JSON.stringify(satamassaTila));
    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, `tanger-noppa-${tunnus}.png`), scale: 'css' });
    }
    vaadi(`${tunnus}: 1. laivalippu vie nopanheittoon ja toimintorivi elää`,
      satamassaTila.vaihe === 'roll' && satamassaTila.tapa === 'sea'
        && satamassaTila.noppaa && !satamassaTila.riviJumissa && !satamassaTila.busy,
      JSON.stringify(satamassaTila));

    const alku = Date.now();
    const { tulos } = await napautaNoppa(sivu);
    const eteni = await sivu
      .waitForFunction(() => window.matkakirja.game.phase !== 'roll', null,
        { timeout: NOPAN_KATTO_MS, polling: 100 })
      .then(() => true).catch(() => false);
    const kesto = Date.now() - alku;
    const heiton = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: nopan napautus`, `${tulos}, ${kesto} ms, ${JSON.stringify(heiton)}`);
    vaadi(`${tunnus}: 2. nopan napautus vie siirron eteenpäin alle ${NOPAN_KATTO_MS} ms`,
      tulos === 'napautettu' && eteni && heiton.vaihe === 'move' && heiton.kohteita > 0,
      `${tulos} / ${kesto} ms / ${JSON.stringify(heiton)}`);
    vaadi(`${tunnus}: ei sivuvirheitä satamassa`, virheet.length === 0,
      virheet.join(' | ').slice(0, 300));
    await ctx.close();
  }

  /* ── 3. uudelleenlataus kesken laivamatkan ───────────────────── */
  {
    const { tallenne, pos } = merella();
    tieto(`${tunnus}: merellä-tallennuksen paikka`, JSON.stringify(pos));
    const { ctx, sivu, virheet } = await avaaKonteksti(selain, tallenne);
    await odotaPeli(sivu);
    /*
     * OIKEA UUDELLEENLATAUS, EI PELKKÄ AVAUS. Löydös 2:n toinen puoli
     * oli juuri se, ettei sivun lataaminen uudestaan vapauttanut
     * pelaajaa: peli tallentaa itsensä, joten toinen lataus lukee
     * PELIN oman tallennuksen eikä savukkeen kylvämää alkutilaa.
     */
    await sivu.waitForTimeout(1200);
    await odotaPeli(sivu, { uudelleen: true });
    await sivu.waitForTimeout(1500);
    const merella1 = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: tila uudelleenlatauksen jälkeen merellä`, JSON.stringify(merella1));
    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, `tanger-merella-${tunnus}.png`), scale: 'css' });
    }
    /*
     * SAAPUMISKERTOMUS EI SAA OLLA RUUDULLA MERELLÄ. Nappula on kaaren
     * askelpisteessä, joten mikään kaupunki ei ole juuri saavuttu —
     * "Voi että — Tanger!" oli löydöksen 2 toistuva puoli.
     */
    vaadi(`${tunnus}: 3a. uudelleenlataus merellä ei toista saapumiskertomusta`,
      !merella1.kertomus.includes('Voi että'), JSON.stringify(merella1));
    vaadi(`${tunnus}: 3b. nappula on yhä merellä eikä peli palannut satamaan`,
      merella1.paikka.startsWith('tanger|dakar'), JSON.stringify(merella1));

    /*
     * JA MATKA JATKUU. Merellä ainoa tapa on laiva; riippumatta siitä,
     * onko vaihe latauksen jäljiltä 'roll' (sama versio) vai 'action'
     * (välitila pyyhitty version vaihtuessa, js/main.js nollaaValitila),
     * pelaajan on päästävä eteenpäin samalla eleellä kuin satamassa.
     */
    if (merella1.vaihe !== 'roll') await sivu.evaluate(`(${VALITSE_LAIVA})()`);
    const alku = Date.now();
    const { tulos } = await napautaNoppa(sivu);
    const eteni = await sivu
      .waitForFunction(() => window.matkakirja.game.phase !== 'roll', null,
        { timeout: NOPAN_KATTO_MS, polling: 100 })
      .then(() => true).catch(() => false);
    const kesto = Date.now() - alku;
    const jalkeen = await sivu.evaluate(`(${LUE})()`);
    tieto(`${tunnus}: nopan napautus merellä`, `${tulos}, ${kesto} ms, ${JSON.stringify(jalkeen)}`);
    vaadi(`${tunnus}: 3c. nopan napautus merellä vie eteenpäin alle ${NOPAN_KATTO_MS} ms`,
      tulos === 'napautettu' && eteni && jalkeen.vaihe === 'move' && jalkeen.kohteita > 0,
      `${tulos} / ${kesto} ms / ${JSON.stringify(jalkeen)}`);
    vaadi(`${tunnus}: ei sivuvirheitä merellä`, virheet.length === 0,
      virheet.join(' | ').slice(0, 300));
    await ctx.close();
  }

  await selain.close();
}

palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
