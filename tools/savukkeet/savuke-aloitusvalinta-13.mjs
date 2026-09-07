/*
 * Savuke: LÄHTÖVALINNAN KOHTEET — jokaiseen pääsee lentämään ja
 * saapuminen toimii.
 *
 * TIEDOSTON NIMESSÄ ON 13, koska kohteita oli niin monta 7.9.2026
 * iltapäivällä, kun omistaja nosti ne takaisin. Samana iltana hän
 * vaihtoi Los Angelesin San Franciscoksi ja lisäsi Istanbulin, joten
 * niitä on nyt neljätoista — savuke lukee joukon aina
 * js/ui-apurit.js:stä (ETUSIVUN_KOHTEET) eikä omasta listastaan, joten
 * nimi on historiaa eikä lukumäärä.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aloitusvalinta-13.mjs
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aloitusvalinta-13.mjs --kohde ateena
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aloitusvalinta-13.mjs --kuvat kansio
 *
 * OMISTAJAN EHTO 7.9.2026 iltapäivä (Raamattu, ALOITUSVALINTA: PALLO
 * PAIKALLAAN, KAIKKI KOHTEET TAKAISIN KOKEEKSI), sanatarkasti: *"ja
 * nostetaan kokeeksi kaikki kohdekaupungit takaisin mitä aiemmin oli
 * käytössä"* — ja ehtona se, että jokaiseen kohteeseen on päästävä
 * lentämään ja saapumisen on toimittava. v1119 piilotti kohteet juuri
 * siksi, että osa niistä lupasi matkan, jota ei ollut;
 * tämä savuke on se koe, joka kertoo kaupungeittain, pitääkö lupaus.
 *
 * ── MITÄ MITATAAN, KAUPUNKI KERRALLAAN ─────────────────────────────
 *
 *   1. MERKKI. Kaupungilla on lähtövalinnassa oma kohdemerkki
 *      (.pallolauta-kohde[data-kohde="aloitus:<id>"]) ja sillä
 *      huomiorengas (.pallolauta-huomio). Merkki saa olla pallon
 *      takapuolella — kohteet eivät mahdu yhteen näkymään, ja
 *      takapuolen kaupungit haetaan palloa kääntämällä.
 *   2. LENTO. Kohteen napautus (pallolauta.napautaKohde, sama polku
 *      kuin sormella) vie pois pickstart-vaiheesta ja lento päättyy:
 *      body.flight-active poistuu ja aloituslentoKesken laskee.
 *   3. PERILLÄ. Matkaaja on kohdekaupungissa ja pelin lauta on
 *      vaihtunut aloitusnäytöstä maailmankartaksi.
 *   4. LEHTI AUKEAA. Kaupungin napautus pallolta avaa saapumisnäkymän
 *      (#arrival-dialog auki) — sama vartio kuin savuke-avauslennon P6
 *      (*"Kohdekaupunki avaa aina kaupunkilehden"*, omistaja 2.9.2026).
 *   5. EI VIRHEITÄ. Sivulla ei saa olla yhtään pageerroria koko
 *      napautuksesta lehteen.
 *
 * Kaupunki, joka ei läpäise kohtia 2–5, on ehdokas pois lähtökohteista
 * (js/ui-apurit.js ETUSIVUN_KOHTEET) — päätöksen tekee omistaja, tämä
 * savuke antaa taulukon.
 *
 * KOKO KIERROS KESTÄÄ NOIN VARTIN (mitattu kontissa: 60–90 s per
 * kaupunki, oma selainkonteksti kullekin). Yhden kaupungin voi ajaa
 * erikseen `--kohde <tunnus>`.
 *
 * ── MIKSI OMA SIVU JOKAISELLE ──────────────────────────────────────
 *
 * Lähtövalinta tapahtuu kerran pelissä, eikä siihen ole paluuta ilman
 * uutta tallennetta. Jokainen kaupunki ajetaan siksi omassa
 * selainkontekstissaan tyhjästä muistista — sama polku kuin oikealla
 * pelaajalla: aloitusportti, "Valitse aloituskaupunki", merkin
 * napautus.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1): kontin
 * selain ei osaa välityspalvelinta, Noden fetch osaa. Ilman ämpäriä
 * Globe.gl ei lataudu eikä savuke voi mitata mitään.
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { ETUSIVUN_KOHTEET } from '../../js/ui-apurit.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const argv = process.argv.slice(2);
const valitsin = (nimi, oletus = null) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};
const KUVAKANSIO = valitsin('kuvat');
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });
const YKSI = valitsin('kohde');
const KOHTEET = YKSI ? [YKSI] : [...ETUSIVUN_KOHTEET];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.geojson': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = http.createServer((req, res) => {
  const osa = req.url.split('?')[0];
  const polku = join(JUURI, osa === '/' ? 'index.html' : osa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://127.0.0.1:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

/* ---------- ämpäri Noden kautta ---------- */

const valimuisti = new Map();
async function ampariHaku(url) {
  if (!valimuisti.has(url)) {
    valimuisti.set(url, fetch(url).then(async (v) => ({
      status: v.status,
      contentType: v.headers.get('content-type') ?? 'application/octet-stream',
      headers: { 'access-control-allow-origin': '*' },
      body: Buffer.from(await v.arrayBuffer()),
    })).catch((e) => ({ status: 502, contentType: 'text/plain', body: Buffer.from(String(e)) })));
  }
  return valimuisti.get(url);
}
const kirjasto = await ampariHaku('https://media.matkakirja.app/vendor/globe.gl-2.46.2.min.js');
if (kirjasto.status !== 200) {
  console.log('HUOM  ämpäri ei vastaa — pallo ei voi latautua, savuke ei mittaa mitään');
  palvelin.close();
  process.exit(1);
}

const selain = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  // WebGL ohjelmistorasteroijalla (sama kuin savuke-avauslennossa):
  // ilman näitä Globe.gl ei rakenna kontekstia kontissa.
  args: ['--autoplay-policy=no-user-gesture-required',
    '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'],
});

/** Odottaa ehtoa; palauttaa true/false eikä koskaan heitä. */
const odota = (sivu, fn, ms, arg = null) => sivu
  .waitForFunction(fn, arg, { timeout: ms }).then(() => true).catch(() => false);

/**
 * Yksi kaupunki: tyhjä muisti → aloitusportti → lähtövalinta → merkin
 * napautus → lento → perillä → lehti.
 */
async function lennaKohteeseen(id) {
  const ctx = await selain.newContext({
    viewport: { width: 1400, height: 900 },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
  });
  const virheet = [];
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    route.fulfill(await ampariHaku(route.request().url()));
  });
  await sivu.route('**workers.dev/**', (route) => route.abort());
  await sivu.route(/wikimedia\.org|wikipedia\.org/, (route) => route.abort());

  const rivi = {
    id, merkki: false, huomio: false, edessa: null, lento: false,
    perilla: false, lehti: false, virheet, syy: '',
  };
  try {
    await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
    if (!await odota(sivu, () => window.matkakirja?.ui?.svg, 60000)) {
      rivi.syy = 'peli ei käynnistynyt';
      return rivi;
    }
    // Aloitusportti (äänet päälle) ja suoraan lähtövalintaan — sama
    // kutsu kuin "Valitse aloituskaupunki" -napissa (ui.aloitaKartalta).
    await sivu.evaluate(() => {
      [...document.querySelectorAll('button')]
        .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
    });
    await sivu.waitForTimeout(800);
    await sivu.evaluate(() => { window.matkakirja.ui.aloitaKartalta(); });
    if (!await odota(sivu, () => Boolean(window.matkakirja.ui.pallolauta), 90000)) {
      rivi.syy = 'pallolauta ei avautunut';
      return rivi;
    }
    // Merkit syntyvät piirrossa ja kamera-ajo asettuu; laatat saavat
    // hetken aikaa, jotta kuva on savukkeen kaappauksessa oikea.
    const nakyi = await odota(sivu, (kohde) => document
      .querySelector(`.pallolauta-kohde[data-kohde="aloitus:${kohde}"]`), 30000, id);
    rivi.merkki = nakyi;
    if (nakyi) {
      const merkki = await sivu.evaluate((kohde) => {
        const el = document.querySelector(`.pallolauta-kohde[data-kohde="aloitus:${kohde}"]`);
        return {
          huomio: Boolean(el.querySelector('.pallolauta-huomio')),
          // Pallon takapuolella oleva merkki on sallittu: sinne
          // käännetään. Tieto raportoidaan, ei vaadita.
          edessa: !el.classList.contains('pallolauta-takana'),
        };
      }, id);
      rivi.huomio = merkki.huomio;
      rivi.edessa = merkki.edessa;
    }
    if (KUVAKANSIO && id === KOHTEET[0]) {
      await sivu.waitForTimeout(2500);
      await sivu.screenshot({ path: join(KUVAKANSIO, 'aloitusvalinta.png'), scale: 'css' });
    }
    // Napautus kohdemerkkiin: sama polku kuin sormella (R-osuma vie
    // napautaKohteeseen, joka kutsuu ui.doPickStartia).
    const napautus = await sivu.evaluate((kohde) => window.matkakirja.ui.pallolauta
      .napautaKohde(`aloitus:${kohde}`), id);
    if (!napautus) {
      rivi.syy = 'kohdemerkin napautus ei mennyt läpi';
      return rivi;
    }
    if (!await odota(sivu, () => window.matkakirja.ui.game.phase !== 'pickstart', 60000)) {
      rivi.syy = 'peli ei lähtenyt pickstart-vaiheesta';
      return rivi;
    }
    // Lento loppuun: lentoluokka pois ja avauslennon lippu laskettu.
    rivi.lento = await odota(sivu, () => !document.body.classList.contains('flight-active')
      && !window.matkakirja.ui.aloituslentoKesken, 180000);
    if (!rivi.lento) {
      rivi.syy = 'lento ei päättynyt 180 s:ssa';
      return rivi;
    }
    // Saapumisen annosteluvirta (kuplat, kortit) varaa pelin hetkeksi.
    await odota(sivu, () => !window.matkakirja.ui.busy, 60000);
    const perilla = await sivu.evaluate((kohde) => {
      const { ui } = window.matkakirja;
      return {
        paikka: ui.game?.player?.pos?.city ?? null,
        pakka: ui.game?.pack?.id ?? null,
        osui: ui.game?.player?.pos?.city === kohde,
      };
    }, id);
    rivi.perilla = perilla.osui;
    rivi.pakka = perilla.pakka;
    if (!rivi.perilla) {
      rivi.syy = `matkaaja ei ole perillä (${perilla.paikka})`;
      return rivi;
    }
    // Lehti auki kaupungin napautuksesta (sama vartio kuin
    // savuke-avauslento P6).
    const lehti = await sivu.evaluate(async (kohde) => {
      const { ui } = window.matkakirja;
      const nuku = (ms) => new Promise((r) => { setTimeout(r, ms); });
      for (let i = 0; i < 40 && ui.busy; i += 1) await nuku(250);
      const tulos = ui.pallolauta?.napautaKaupunki(kohde);
      for (let i = 0; i < 24 && !ui.arrivalDialog?.open; i += 1) await nuku(250);
      return { tulos: Boolean(tulos), auki: Boolean(ui.arrivalDialog?.open) };
    }, id);
    rivi.lehti = lehti.auki;
    if (!rivi.lehti) rivi.syy = 'kaupungin napautus ei avannut lehteä';
    if (KUVAKANSIO) {
      await sivu.screenshot({ path: join(KUVAKANSIO, `saapuminen-${id}.png`), scale: 'css' });
    }
  } catch (e) {
    rivi.syy = `poikkeus: ${e?.message ?? e}`;
  } finally {
    await ctx.close();
  }
  return rivi;
}

/* ================= AJO ================= */

console.log(`Lähtökohteita: ${KOHTEET.length} (${KOHTEET.join(', ')})\n`);
const rivit = [];
for (const id of KOHTEET) {
  const alku = Date.now();
  const rivi = await lennaKohteeseen(id);
  rivi.sekuntia = Math.round((Date.now() - alku) / 1000);
  rivit.push(rivi);
  const ok = rivi.merkki && rivi.huomio && rivi.lento && rivi.perilla
    && rivi.lehti && rivi.virheet.length === 0;
  vaadi(`${id}: merkki → lento → saapuminen → lehti`, ok,
    `${rivi.syy || 'virheitä sivulla'} ${rivi.virheet.slice(0, 2).join(' | ')}`);
}

console.log('\nTAULUKKO (kaupunki, merkki, rengas, edessä, lento, perillä, lehti, virheet, s)');
for (const r of rivit) {
  const merkitse = (v) => (v === null ? ' -   ' : (v ? ' kyllä' : ' EI   '));
  console.log(`  ${r.id.padEnd(12)}${merkitse(r.merkki)}${merkitse(r.huomio)}`
    + `${merkitse(r.edessa)}${merkitse(r.lento)}${merkitse(r.perilla)}${merkitse(r.lehti)}`
    + `  ${String(r.virheet.length).padStart(2)}  ${String(r.sekuntia).padStart(4)}`
    + (r.syy ? `  ← ${r.syy}` : ''));
}
for (const r of rivit) {
  if (r.virheet.length) tieto(`${r.id} virheet`, r.virheet.slice(0, 3).join(' | '));
}
tieto('kohteita kuvassa (merkki pallon etupuolella)',
  `${rivit.filter((r) => r.edessa).length} / ${rivit.length}`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
