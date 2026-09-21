/*
 * SAVUKE: HIOMASSA-LINSSI JA OPTIKON HYVITYS (omistaja 21.9.2026;
 * js/linssit/aarteet.js, omistus.js, game.js linssiAarteenKylkiaisena,
 * ui.js rakennaLinssivalikko).
 *
 * LINSSIAARTEET on tuotannossa tyhjä, joten savuke lisää rekisteriin
 * testilinssin (tila hiomassa) ja antaa pelille oman taulun
 * (pariisi → testilinssi). Pariisi, 390 ja 1400 px.
 *
 * VARTIOT:
 *   1. Ison aarteen paljastus Pariisissa: aarteen raha + 500 hyvitys,
 *      linssi omistuksessa, aid-kupla "Linssi hiomassa" tekstillä
 *      optikosta.
 *   2. Laukku: linssi harmaalla hiomassa-rivillä (.linssi-liuskat-
 *      hiomassa button.hiomassa), kuvana yhteinen hiomassa.svg, selite
 *      "Hiomassa optikolla" napautettaessa, ei Aktivoi-nappia.
 *   3. Hyvitys vain kerran: toinen paljastus (uusi peli, sama passi)
 *      ei maksa hyvitystä.
 *   4. Rekisterin rivin valmistuminen (tila pois, tuo mukaan):
 *      laukku näyttää linssin valmiiden rivillä valmistui-merkillä;
 *      napautus kuittaa merkin.
 *   5. Kehittäjätila ei myönnä hiomassa-linssiä.
 *   6. Ei sivuvirheitä.
 *
 * Aja: PLAYWRIGHT_JS=… CHROMIUM=… node tools/savukkeet/savuke-hiomassa-linssi.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
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

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.polloLoydetty = true;
peli.tokens.set('pariisi', 'isoAarre');
const TALLENNE = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});

const RUUDUT = (process.env.SAVUKE_RUUTU ? [process.env.SAVUKE_RUUTU] : ['390', '1400']).map((w) => (
  w === '390' ? { nimi: '390', width: 390, height: 844 } : { nimi: '1400', width: 1400, height: 900 }
));

/** Testilinssi rekisteriin ja taulu peliin (sivun sisällä). */
const VALMISTELU = async () => {
  const { LINSSIT } = await import('/js/linssit/rekisteri.js');
  if (!LINSSIT.some((r) => r.tunnus === 'testilinssi')) {
    LINSSIT.push({ tunnus: 'testilinssi', manner: null, tila: 'hiomassa', nimi: 'Testilinssi' });
  }
  window.matkakirja.game.linssiAarteet = { pariisi: 'testilinssi' };
};

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} ===`);
  /* eslint-disable no-await-in-loop */
  const ctx = await selain.newContext({
    viewport: { width: ruutu.width, height: ruutu.height },
    deviceScaleFactor: 1,
    serviceWorkers: 'block',
    hasTouch: ruutu.nimi === '390',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.removeItem('matkakirja.passi.v1');
      localStorage.removeItem('matkakirja-kehittaja');
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
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    clearTimeout(ui.automaattiheittoAjastin);
    ui.automaattiheittoAjastin = null;
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(ui);
    for (const el of document.querySelectorAll('.fokusnosto-kerros, .fokuskohde-popup, .saapumistraileri')) el.remove();
  });
  await sivu.addStyleTag({ content: '.fokusvirta-kortti, .fokusvirta-isokuva, .fokusvirta-kupla, .fokusvirta-lentokerros, .saapumistraileri, .fokusnosto-kerros, .fokuskohde-popup { visibility: hidden !important; }' });

  /* ── 1. paljastus ────────────────────────────────────────────────── */
  const loyto = await sivu.evaluate(async (valmistele) => {
    // eslint-disable-next-line no-new-func
    await new Function(`return (${valmistele})()`)();
    const { game, ui } = window.matkakirja;
    const { OPTIKON_HYVITYS, omistetut } = await import('/js/linssit/omistus.js');
    const { ISO_AARRE_ARVO } = await import('/js/tokens.js');
    const p = game.player;
    p.pos = { type: 'city', city: 'pariisi' };
    const rahat = p.money;
    const xp = p.xp ?? 0;
    game.tokens.set('pariisi', 'isoAarre');
    game.revealToken('pariisi');
    const kupla = game.events.find((t) => t.tilanne === 'peli.linssi.hiomassa') ?? null;
    ui.render();
    await new Promise((r) => setTimeout(r, 800));
    const passi = JSON.parse(localStorage.getItem('matkakirja.passi.v1') ?? '{}');
    return {
      saatu: p.money - rahat, xpEro: (p.xp ?? 0) - xp,
      vali: [ISO_AARRE_ARVO.min + OPTIKON_HYVITYS, ISO_AARRE_ARVO.max + OPTIKON_HYVITYS],
      omistaa: omistetut(game).has('testilinssi'),
      leimat: Object.keys(passi).filter((k) => /testilinssi/.test(k)),
      kupla: kupla ? { otsikko: kupla.text, hyvitys: kupla.hyvitys, sub: kupla.sub } : null,
    };
  }, VALMISTELU.toString());
  tieto(`${ruutu.nimi} · löytö`, JSON.stringify(loyto));
  vaadi(`${ruutu.nimi} · 1. Iso aarre + 500 hyvitys, linssi omistuksessa, kupla optikosta, ei tp`,
    loyto.saatu >= loyto.vali[0] && loyto.saatu <= loyto.vali[1] && loyto.omistaa && loyto.xpEro === 0
      && loyto.leimat.includes('linssi:testilinssi') && loyto.leimat.includes('hyvitys:testilinssi')
      && loyto.kupla?.hyvitys === 500 && /Optikko hioo/.test(loyto.kupla?.sub ?? ''),
    JSON.stringify(loyto));

  /* ── 2. laukku ───────────────────────────────────────────────────── */
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    for (const d of document.querySelectorAll('dialog[open]')) if (d.id !== 'passport-dialog') d.close();
    ui.openPassport();
    await ui.paivitaLinssit();
    await new Promise((r) => setTimeout(r, 600));
  });
  const laukku = await sivu.evaluate(async () => {
    const nappi = document.querySelector('.linssi-liuskat-hiomassa button.hiomassa[data-linssi="testilinssi"]');
    const img = nappi?.querySelector('img');
    nappi?.click();
    await new Promise((r) => setTimeout(r, 300));
    const tiedot = document.querySelector('.linssi-tiedot');
    return {
      rivi: Boolean(nappi),
      kuva: img?.getAttribute('src') ?? '',
      harmaa: nappi ? getComputedStyle(nappi).filter : '',
      nimi: tiedot?.querySelector('.linssi-nimi')?.textContent ?? '',
      selite: tiedot?.querySelector('.linssi-lyhyt')?.textContent ?? '',
      aktivoi: Boolean(tiedot?.querySelector('.linssi-aktivoi')),
      valmiillaRivilla: Boolean(document.querySelector('.linssi-liuskat:not(.linssi-liuskat-kesken) button[data-linssi="testilinssi"]')),
    };
  });
  tieto(`${ruutu.nimi} · laukku`, JSON.stringify(laukku));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `hiomassa-laukku-${ruutu.nimi}.png`), await sivu.screenshot());
  vaadi(`${ruutu.nimi} · 2. Laukussa harmaalla hiomassa-rivillä, hiomassa-kuva, selite ilman Aktivoi-nappia`,
    laukku.rivi && /hiomassa\.svg/.test(laukku.kuva) && /grayscale/.test(laukku.harmaa)
      && laukku.nimi === 'Testilinssi' && /Hiomassa optikolla/.test(laukku.selite) && !laukku.aktivoi
      && !laukku.valmiillaRivilla,
    JSON.stringify(laukku));

  /* ── 3. hyvitys vain kerran ──────────────────────────────────────── */
  const toinen = await sivu.evaluate(async () => {
    const { game } = window.matkakirja;
    const { hyvitaHiomassa } = await import('/js/linssit/omistus.js');
    const p = game.player;
    const rahat = p.money;
    const uudestaan = hyvitaHiomassa(game, p, 'testilinssi');
    return { uudestaan, ero: p.money - rahat };
  });
  vaadi(`${ruutu.nimi} · 3. Hyvitys vain kerran per linssi`, toinen.uudestaan === 0 && toinen.ero === 0,
    JSON.stringify(toinen));

  /* ── 4. linssi valmistuu ─────────────────────────────────────────── */
  const valmis = await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const { LINSSIT } = await import('/js/linssit/rekisteri.js');
    const { valmistuneet } = await import('/js/linssit/omistus.js');
    const rivi = LINSSIT.find((r) => r.tunnus === 'testilinssi');
    // Optikko toi linssin: rivi avataan valmiiksi. Moduulina kelpaa
    // radion metatieto — vain tunnus on tarkistuksessa kiinni, joten
    // annetaan kopio omalla tunnuksella.
    delete rivi.tila;
    rivi.tuo = async () => {
      const m = await import('/js/linssit/radio.js');
      return { ...m, LINSSI: { ...m.LINSSI, tunnus: 'testilinssi', nimi: 'Testilinssi' } };
    };
    // Laukun valikoima luetaan kerros.haeKaikki():sta, joka on muistissa:
    // päivitetään tuen lista käsin kuten uusi lataus tekisi.
    const kerros = await import('/js/linssit/kerros.js');
    const linssi = await kerros.haeLinssi('testilinssi');
    if (linssi && !ui.linssiTuki.kaikki.some((l) => l.tunnus === 'testilinssi')) ui.linssiTuki.kaikki.push(linssi);
    const ennen = valmistuneet(game);
    await ui.paivitaLinssit();
    await new Promise((r) => setTimeout(r, 500));
    const nappi = document.querySelector('.linssi-liuskat:not(.linssi-liuskat-kesken) button[data-linssi="testilinssi"]');
    const merkki = Boolean(nappi?.classList.contains('valmistui'));
    const hiomassaRivi = Boolean(document.querySelector('.linssi-liuskat-hiomassa button[data-linssi="testilinssi"]'));
    nappi?.click();
    await new Promise((r) => setTimeout(r, 300));
    return {
      ladattu: Boolean(linssi), ennen, valmiillaRivilla: Boolean(nappi), merkki, hiomassaRivi,
      merkkiKuitattu: nappi ? !nappi.classList.contains('valmistui') : false,
      jalkeen: valmistuneet(game),
      aktivoi: Boolean(document.querySelector('.linssi-tiedot .linssi-aktivoi')),
    };
  });
  tieto(`${ruutu.nimi} · valmis`, JSON.stringify(valmis));
  if (KUVAKANSIO) writeFileSync(join(KUVAKANSIO, `hiomassa-valmis-${ruutu.nimi}.png`), await sivu.screenshot());
  vaadi(`${ruutu.nimi} · 4. Valmistunut linssi herää: valmiiden rivillä, valmistui-merkki kerran, Aktivoi tarjolla`,
    valmis.ladattu && valmis.ennen.includes('testilinssi') && valmis.valmiillaRivilla && valmis.merkki
      && !valmis.hiomassaRivi && valmis.merkkiKuitattu && valmis.jalkeen.length === 0 && valmis.aktivoi,
    JSON.stringify(valmis));

  /* ── 5. kehittäjätila ────────────────────────────────────────────── */
  const kehittaja = await sivu.evaluate(async () => {
    const { game } = window.matkakirja;
    const { LINSSIT } = await import('/js/linssit/rekisteri.js');
    const { omistetut } = await import('/js/linssit/omistus.js');
    LINSSIT.push({ tunnus: 'toinenhiomassa', manner: null, tila: 'hiomassa', nimi: 'Toinen' });
    localStorage.setItem('matkakirja-kehittaja', '1');
    const omat = omistetut(game);
    localStorage.removeItem('matkakirja-kehittaja');
    return { hiomassa: omat.has('toinenhiomassa'), valmis: omat.has('radio') };
  });
  vaadi(`${ruutu.nimi} · 5. Kehittäjätila ei myönnä hiomassa-linssiä`, !kehittaja.hiomassa && kehittaja.valmis,
    JSON.stringify(kehittaja));
  vaadi(`${ruutu.nimi} · 6. Ei sivuvirheitä`, virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\nYHTEENVETO ${lapi}/${kaikki}`);
process.exit(lapi === kaikki ? 0 : 1);
