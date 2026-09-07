/*
 * Savuke: VALIKON SULKU EI AVAA KOHDETTA KARTALLA.
 *
 * Omistajan iPad-havainto 7.9.2026, sanatarkasti: *"jos hampurilainen
 * tai joku muu valikko on auki ja käyttäjä klikkaa mitä tahansa kohtaa
 * kartalla, niin silloin vain se Valikko pitäisi sulkeutua, mutta mikään
 * kohde ei saisi avautua kartalla samalla klikkauksella."*
 *
 * Juurisyy oli sama kuin pöllön kuplassa 27.8.2026: valikot sulkeutuvat
 * pointerdownista, mutta laudan osumatesti ajetaan vasta clickissä —
 * yksi napautus siis sekä sulki valikon että avasi kohteen sen alta.
 * Korjaus on js/ui-apurit.js asennaValikonSulkuvartija (kartoitus ja
 * rajaukset: docs/moduulit/karttapallo.md luku 12).
 *
 * VARTIOT (sama sarja hampurilaiselle ja kehittäjän ratasvalikolle):
 *   1. Valikko on auki ennen napautusta.
 *   2. Napautus kohdekaupungin merkkiin SULKEE valikon.
 *   3. Sama napautus EI valu kartalle: yksikään .map-panen kuuntelija
 *      ei näe clickiä, eikä peli lähde liikkeelle (game.phase pysyy
 *      pickstartissa, yhtään dialogia tai kelluvaa korttia ei aukea).
 *   4. TOINEN napautus samaan kohtaan avaa kohteen normaalisti: click
 *      menee kartalle ja lähtökaupungin valinta etenee.
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-valikon-sulku.mjs
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

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

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.geojson': 'application/json' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/**
 * Yksi peli pallolaudalla lähtökaupungin valintaan asti. Jokainen
 * tapaus saa oman sivunsa: doPickStart vie pelin eteenpäin, eikä samaa
 * valintaa voi tehdä kahdesti.
 */
async function avaaLauta({ kehittaja, nakyma }) {
  /*
   * serviceWorkers: 'block' — muuten sw sieppaa ämpärin pyynnöt eikä
   * sivu.route näe niitä, jolloin Globe.gl jää lataamatta kontissa
   * ("Ladataan karttapalloa…" jää ruudulle).
   */
  const ctx = await selain.newContext({ viewport: nakyma, serviceWorkers: 'block' });
  if (kehittaja) {
    await ctx.addInitScript(() => {
      try { localStorage.setItem('matkakirja-kehittaja', '1'); } catch { /* yksityinen selaus */ }
    });
  }
  const sivu = await ctx.newPage();
  // Laattaluettelo ja laatat ämpäristä Noden kautta; wikimedia pois.
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: vastaus.tyyppi ?? 'application/octet-stream',
      body: vastaus.body,
    });
  });
  await sivu.route(/wikimedia\.org|wikipedia\.org/, (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui, null, { timeout: 60000 });
  // Aloitusportti (jos näkyvissä) ja avaustekstin jälkeinen valintanappi.
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent ?? ''))?.click();
  });
  // Nappi paljastuu vasta kun avausteksti on kirjoittunut loppuun.
  await sivu.waitForFunction(() => {
    const b = document.querySelector('.intro-valinta');
    return b && !b.classList.contains('intro-valinta-piilossa');
  }, null, { timeout: 90000 });
  await sivu.evaluate(() => document.querySelector('.intro-valinta')?.click());
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.pallolauta),
    null, { timeout: 90000 });
  await sivu.waitForFunction(() => document.querySelectorAll('.pallolauta-kohde').length > 0,
    null, { timeout: 90000 });
  await sivu.waitForTimeout(1500);
  /*
   * KUPLAT POIS TYYLILLÄ (sama kaava kuin savuke-kohdekaupungit): pöllön
   * kupla peittää kohdemerkin, ja sen oma nielu on eri asia kuin se, jota
   * tämä savuke mittaa.
   */
  await sivu.addStyleTag({
    content: '.pollo-paneeli, .pollo-nappi, .fokusvirta-kupla, .pollo-vihje,'
      + ' .pollo-kuplapino-kehys, .fact-card { display: none !important; }',
  });
  // Mittari: näkeekö yksikään kartan kuuntelija clickin?
  await sivu.evaluate(() => {
    window.__kartanKlikit = 0;
    document.querySelector('.map-pane')
      ?.addEventListener('click', () => { window.__kartanKlikit += 1; }, true);
  });
  return { ctx, sivu };
}

/** Kohdemerkin keskipiste ruudulla (lähtökaupungin valinta). */
const kohdePiste = (sivu) => sivu.evaluate(() => {
  const r = [...document.querySelectorAll('.pallolauta-kohde')]
    .map((e) => e.getBoundingClientRect())
    .find((k) => k.width > 0);
  return r
    ? { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) }
    : null;
});

/**
 * Mihin napautetaan valikon ollessa auki: kohdemerkin keskipiste, jos
 * valikko ei peitä sitä — muuten vapaa kohta pallon pinnalta.
 *
 * Renkaan alta napautettu piste kuuluisi valikolle eikä kartalle, eikä
 * se mittaisi vartijaa lainkaan. Kumpikin tapaus ajetaan siksi
 * näkymässä, jossa rengas on vapaana (ks. tapausten `nakyma`), ja tämä
 * on varareitti: omistajan sääntö koskee *"mitä tahansa kohtaa
 * kartalla"*, joten vapaa pinnan kohta kelpaa mittaukseen yhtä hyvin.
 */
const napautuskohta = (sivu) => sivu.evaluate(() => {
  const vapaa = (x, y) => {
    const el = document.elementFromPoint(x, y);
    if (!el?.closest) return false;
    if (!el.closest('.map-pane')) return false;
    if (el.closest('#paavalikko, #kehittaja-valikko')) return false;
    return !el.closest('a, button, input, select, textarea, label, [role="button"]');
  };
  const merkki = [...document.querySelectorAll('.pallolauta-kohde')]
    .map((e) => e.getBoundingClientRect())
    .find((r) => r.width > 0);
  if (merkki) {
    const x = Math.round(merkki.left + merkki.width / 2);
    const y = Math.round(merkki.top + merkki.height / 2);
    if (vapaa(x, y)) return { x, y, kohde: true };
  }
  /*
   * KESKELTÄ ULOSPÄIN: pallo täyttää kotelon keskustan, ja sen REUNAN
   * ULKOPUOLELLE osunut napautus jättää kirjaston raycastin siihen
   * tilaan, jossa seuraavatkaan pinnan napautukset eivät osu (mitattu
   * 7.9.2026 sekä vartijan kanssa että ilman — kirjaston oma piirre,
   * ei tämän savukkeen aihe). Siksi vapaa kohta haetaan lähimpänä
   * keskustaa olevista ruuduista, jolloin se on varmasti pallolla.
   */
  const kotelo = document.querySelector('.pallo-kuori.pallolauta') ?? document.querySelector('.map-pane');
  const r = kotelo.getBoundingClientRect();
  const ruudut = [];
  for (let sy = 0.2; sy <= 0.8; sy += 0.04) {
    for (let sx = 0.2; sx <= 0.8; sx += 0.04) {
      ruudut.push({ sx, sy, etaisyys: Math.hypot(sx - 0.5, sy - 0.5) });
    }
  }
  ruudut.sort((a, b) => a.etaisyys - b.etaisyys);
  for (const { sx, sy } of ruudut) {
    const x = Math.round(r.left + r.width * sx);
    const y = Math.round(r.top + r.height * sy);
    if (vapaa(x, y)) return { x, y, kohde: false };
  }
  return null;
});

const tila = (sivu) => sivu.evaluate(() => ({
  paavalikko: !document.getElementById('paavalikko')?.hidden,
  ratasvalikko: !document.getElementById('kehittaja-valikko')?.hidden,
  klikit: window.__kartanKlikit,
  vaihe: window.matkakirja.ui.game?.phase ?? null,
  busy: Boolean(window.matkakirja.ui.busy),
  dialogit: [...document.querySelectorAll('dialog[open]')].map((d) => d.id || d.className),
  kortit: document.querySelectorAll(
    '.fokuskohde-popup, .minipopup, .fokusnosto-kerros, .elaintaky-kerros',
  ).length,
}));

const sama = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Yksi tapaus: avaa valikon, napauta kartalla, napauta uudestaan.
 *
 * @param {string} nimi tapauksen nimi tulosriveille.
 * @param {{ nappi: string, valikko: string, kehittaja?: boolean,
 *   nakyma: { width: number, height: number } }} tiedot
 */
async function ajaTapaus(nimi, { nappi, valikko, kehittaja = false, nakyma }) {
  const { ctx, sivu } = await avaaLauta({ kehittaja, nakyma });

  await sivu.evaluate((id) => document.getElementById(id)?.click(), nappi);
  await sivu.waitForTimeout(300);
  const auki = await tila(sivu);
  vaadi(`${nimi}: valikko on auki`, auki[valikko] === true, JSON.stringify(auki));

  const piste = await napautuskohta(sivu);
  vaadi(`${nimi}: napautuskohta kartalla löytyy`, Boolean(piste), JSON.stringify(piste));
  if (!piste) { await ctx.close(); return; }

  await sivu.mouse.click(piste.x, piste.y);
  await sivu.waitForTimeout(1200);
  const jalkeen = await tila(sivu);
  vaadi(`${nimi}: napautus sulkee valikon`, jalkeen[valikko] === false, JSON.stringify(jalkeen));
  vaadi(`${nimi}: napautus ei valu kartalle`, jalkeen.klikit === 0, JSON.stringify(jalkeen));
  vaadi(`${nimi}: mikään kohde ei avaudu`,
    jalkeen.vaihe === auki.vaihe && !jalkeen.busy
      && sama(jalkeen.dialogit, auki.dialogit) && jalkeen.kortit === auki.kortit,
    JSON.stringify({ auki, jalkeen }));

  await sivu.mouse.click(piste.x, piste.y);
  await sivu.waitForTimeout(1200);
  const toinen = await tila(sivu);
  vaadi(`${nimi}: toinen napautus menee kartalle`, toinen.klikit === 1, JSON.stringify(toinen));

  /*
   * KOHDE AUKEAA NORMAALISTI. Jos napautuskohta oli jo lähtökaupungin
   * rengas, edellinen napautus teki sen; muuten rengasta napautetaan
   * erikseen. VALINTANÄKYMÄ PYÖRII HITAASTI (aalto 3A), joten rengas
   * ehtii liikkua lukemisen ja napautuksen välissä — paikka luetaan
   * joka yrityksellä uudestaan ja pyörinnän annetaan pysähtyä.
   */
  let lopuksi = await tila(sivu);
  for (let yritys = 0; yritys < 3 && lopuksi.vaihe === auki.vaihe && !lopuksi.busy; yritys += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForFunction(
      () => !window.matkakirja.ui.pallolauta?.aloitusvalinnanPyorinta?.(),
      null, { timeout: 6000 },
    ).catch(() => {});
    // eslint-disable-next-line no-await-in-loop
    const rengas = await kohdePiste(sivu);
    if (!rengas) break;
    // eslint-disable-next-line no-await-in-loop
    await sivu.mouse.click(rengas.x, rengas.y);
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(1500);
    // eslint-disable-next-line no-await-in-loop
    lopuksi = await tila(sivu);
  }
  vaadi(`${nimi}: kohde avautuu normaalisti`,
    lopuksi.vaihe !== auki.vaihe || lopuksi.busy,
    JSON.stringify({ auki, lopuksi }));
  await ctx.close();
}

/*
 * KAKSI NÄKYMÄÄ, YKSI SYY. Hampurilainen on lyhyt ja jättää iPadin
 * pystyruudulla lähtökaupungin renkaan vapaaksi; kehittäjän ratasvalikko
 * on kytkinrivien mittainen ja peittäisi sen (mitattu: valikko x 458…771,
 * y 50…793, rengas 635, 724). Vaakanäkymässä valikko jää renkaan oikealle
 * puolelle, joten kumpikin tapaus napauttaa TÄSMÄLLEEN SITÄ KOHDETTA,
 * jonka omistaja sanoo avautuvan väärin.
 */
await ajaTapaus('hampurilainen', {
  nappi: 'menu-btn', valikko: 'paavalikko', nakyma: { width: 834, height: 1194 },
});
await ajaTapaus('ratasvalikko', {
  nappi: 'kehittaja-valikko-btn',
  valikko: 'ratasvalikko',
  kehittaja: true,
  nakyma: { width: 1280, height: 800 },
});

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
