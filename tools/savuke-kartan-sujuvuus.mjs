/*
 * SELAINSAVUKE: kartan sujuvuus — tarkkuusvahti ei saa tökkiä.
 *
 * v607 toi kartan tarkkuusvahdin (ui.js: tarkistaTarkkuus), joka
 * tarkisti rasteroinnin mittakaavan 350 ms jokaisen fitViewBoxin
 * jälkeen. Omistaja: "kartta tökkii, vieritys nykii." Mitattu syy:
 *
 *   - vahdin kynnys (2 %) on tiukempi kuin taydennaTaiden oma sietoraja
 *     (20 %), joten jokainen nipistys portaiden välistä pakotti koko
 *     ruutusarjan piirrettäväksi uudestaan — työtä, jonka taydennaTaide
 *     oli tarkoituksella jättänyt tekemättä juuri siksi, että se tökkii
 *   - 350 ms on eleiden VÄLI eikä eleen jälkeinen tauko, joten
 *     rasterointi osui hetkeen, jossa sormi oli yhä kartalla
 *
 * Tämä savuke vartioi korjausta: rasterointi ei käynnisty eleen aikana
 * eikä heti sen jälkeen, mutta väärä mittakaava korjautuu yhä kun
 * kartta jää rauhaan.
 *
 *   node tools/savuke-kartan-sujuvuus.mjs
 *
 * serviceWorkers: 'block' on pakollinen — muuten sw sieppaa pyynnöt ja
 * ajo mittaa välimuistia eikä koodia. Ulkopuoliset osoitteet (kuvat)
 * katkaistaan, jotta ajo ei riipu verkosta; peli piirtyy ilman niitä.
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
  '.webmanifest': 'application/manifest+json',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8747, r));

const paketti = await import(process.env.PLAYWRIGHT_JS
  ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

// --- peli käyntiin ja kartta lähikuvaan --------------------------------
await sivu.goto('http://127.0.0.1:8747/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') {
    g.actionPickStart(g.pack.cities.find((c) => c.links?.length).id, 0);
    window.matkakirja.ui.render();
  }
});
await sivu.waitForTimeout(2500);
const lahikuvassa = await sivu.evaluate(() => {
  window.matkakirja.ui.zoomaaPainikkeella(1);
  return true;
});
await sivu.waitForTimeout(3000);
vaadi('kartta on lähikuvassa', lahikuvassa === true);

/*
 * MITTARIT. Ruudut lasketaan DOMista (jokainen lisätty solmu on yksi
 * rasteroitu ruutu), pakotukset kääreestä tarkistaTarkkuuden ympärillä.
 * Molemmista kirjataan, oliko sormi kartalla juuri sillä hetkellä —
 * juuri se on se tökkiminen, jota vartioidaan.
 */
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const m = {
    ruudut: 0, ruudutEleessa: 0, aloitukset: 0, aloituksetEleessa: 0,
    tarkistus: 0, pakotus: 0, pakotusEleessa: 0, loki: [],
  };
  window.__sujuvuus = m;
  const eleKesken = () => Boolean(ui.osoitinKartalla || ui.kartanRaahaus);
  /*
   * Rasteroinnin ALKU mitataan createObjectURLista: mapart.js kääntää
   * jokaisen ruudun ensin SVG-blobiksi, joten yksi svg-tyyppinen
   * objektiosoite on täsmälleen yksi alkava rasterointi. Juuri se on
   * se satojen millisekuntien työ, joka ei saa alkaa sormen alla.
   */
  const alkuperainenOsoite = URL.createObjectURL.bind(URL);
  URL.createObjectURL = (blob) => {
    if (blob?.type?.startsWith('image/svg+xml')) {
      m.aloitukset += 1;
      if (eleKesken()) m.aloituksetEleessa += 1;
    }
    return alkuperainenOsoite(blob);
  };
  /*
   * Ruudut lasketaan insertBeforesta eikä MutationObserverista: vahti
   * mittaa nimenomaan sitä HETKEÄ, jona ruutu valmistuu, ja observerin
   * takaisinkutsu ajetaan vasta tehtävän lopussa — silloin sormi on jo
   * voinut nousta tai laskeutua ja mittaus kertoisi väärää.
   */
  const lisaa = ui.taideRyhma.insertBefore.bind(ui.taideRyhma);
  ui.taideRyhma.insertBefore = (solmu, ennen) => {
    m.ruudut += 1;
    if (eleKesken()) m.ruudutEleessa += 1;
    return lisaa(solmu, ennen);
  };
  const alkuperainen = ui.tarkistaTarkkuus.bind(ui);
  ui.tarkistaTarkkuus = function kaare(...a) {
    m.tarkistus += 1;
    const ennen = this.taideSkaala;
    const eleessa = eleKesken();
    const tulos = alkuperainen(...a);
    if (ennen && this.taideSkaala !== ennen) {
      m.pakotus += 1;
      if (eleessa) m.pakotusEleessa += 1;
      m.loki.push(`pakotus suhde ${(this.nakyvaAlue().skaala / ennen).toFixed(3)}`);
    }
    return tulos;
  };
});
const nollaa = () => sivu.evaluate(() => {
  Object.assign(window.__sujuvuus, {
    ruudut: 0, ruudutEleessa: 0, aloitukset: 0, aloituksetEleessa: 0,
    tarkistus: 0, pakotus: 0, pakotusEleessa: 0, loki: [],
  });
});
const mittarit = () => sivu.evaluate(() => ({ ...window.__sujuvuus }));
const suhde = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const n = ui.nakyvaAlue();
  return n && ui.taideSkaala ? n.skaala / ui.taideSkaala : null;
});

// --- eleet -------------------------------------------------------------
/** Yhden sormen pyyhkäisy kartalla. */
async function panoroi(matka = 200, askelia = 20) {
  const cdp = await ctx.newCDPSession(sivu);
  const x = 195; const y = 500;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
  for (let i = 1; i <= askelia; i++) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: x - (matka * i) / askelia, y: y - (matka * i) / (askelia * 4), id: 1 }],
    });
    await sivu.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach();
}

/** Kahden sormen nipistys annetulla kertoimella. */
async function nipista(kerroin) {
  const cdp = await ctx.newCDPSession(sivu);
  const kx = 195; const ky = 420; const alku = 120; const askelia = 14;
  const pisteet = (d) => [{ x: kx - d / 2, y: ky, id: 1 }, { x: kx + d / 2, y: ky, id: 2 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: pisteet(alku) });
  for (let i = 1; i <= askelia; i++) {
    const d = alku * (1 + (kerroin - 1) * (i / askelia));
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: pisteet(d) });
    await sivu.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await cdp.detach();
}

// 1) PANOROINTI ei aiheuta yhtään ylimääräistä rasterointia.
await nollaa();
for (let i = 0; i < 3; i++) { await panoroi(); await sivu.waitForTimeout(250); }
await sivu.waitForTimeout(700);
const panorointi = await mittarit();
vaadi('panorointi ei pakota uudelleenrasterointia',
  panorointi.pakotus === 0, JSON.stringify(panorointi));
vaadi('panoroinnin aikana ei aloiteta yhtään rasterointia',
  panorointi.aloituksetEleessa === 0,
  `${panorointi.aloituksetEleessa}/${panorointi.aloitukset} aloitusta eleen aikana`);

// 2) NIPISTYS ei pakota rasterointia eleen aikana eikä heti perään.
// Ennen korjausta tässä oli aina yksi pakotus (suhde 1,150) 350 ms:ssä.
await sivu.waitForTimeout(2000);
await nollaa();
await nipista(1.15);
await sivu.waitForTimeout(700);
const nipistys = await mittarit();
vaadi('nipistys ei pakota rasterointia 700 ms:n sisällä',
  nipistys.pakotus === 0, JSON.stringify(nipistys));
vaadi('nipistyksen aikana ei aloiteta yhtään rasterointia',
  nipistys.aloituksetEleessa === 0,
  `${nipistys.aloituksetEleessa}/${nipistys.aloitukset} aloitusta eleen aikana`);

/*
 * 3) NIPISTYS JA HETI PERÄÄN PANOROINTI — se ele, jossa tökkiminen
 * tuntui. Mitattavana on ruudunpäivitys: pisin väli kahden kehyksen
 * välillä panoroinnin aikana.
 *
 *   v607 ennen korjausta: pisin väli 1467 ms, yhdeksän yli 100 ms:n
 *   kehystä, yksi pakotettu uudelleenrasterointi kesken panoroinnin
 *   korjauksen jälkeen: pisin väli 133 ms, kaksi yli 100 ms:n kehystä,
 *   ei yhtään pakotusta
 *
 * Raja on väljä (600 ms), koska kehysajat riippuvat ajokoneesta —
 * mutta sekunnin mittainen jumi ei mahdu siihen millään koneella.
 */
await nollaa();
await sivu.evaluate(() => {
  window.__valit = [];
  let edellinen = performance.now();
  const askel = (t) => {
    window.__valit.push(t - edellinen);
    edellinen = t;
    window.__valiPyynto = requestAnimationFrame(askel);
  };
  window.__valiPyynto = requestAnimationFrame(askel);
});
await nipista(1.15);
await sivu.waitForTimeout(150);
await sivu.evaluate(() => { window.__valit = []; });
await panoroi();
await panoroi();
await panoroi();
const kehykset = await sivu.evaluate(() => {
  cancelAnimationFrame(window.__valiPyynto);
  const v = window.__valit;
  return { pisin: Math.round(Math.max(...v)), yli100: v.filter((x) => x > 100).length, kehyksia: v.length };
});
const nipistyksenJalkeen = await mittarit();
vaadi('nipistyksen jälkeinen panorointi ei jumita ruudunpäivitystä',
  kehykset.pisin < 600, `pisin kehysväli ${kehykset.pisin} ms, ${kehykset.yli100} yli 100 ms`);
vaadi('nipistyksen jälkeisen panoroinnin aikana ei pakoteta rasterointia',
  nipistyksenJalkeen.pakotus === 0, JSON.stringify(nipistyksenJalkeen));
vaadi('edellisen eleen sarja ei jatka piirtoa seuraavan sormen alla',
  nipistyksenJalkeen.aloituksetEleessa === 0,
  `${nipistyksenJalkeen.aloituksetEleessa}/${nipistyksenJalkeen.aloitukset} aloitusta eleen aikana`);

// 4) LEPO: kartta ei jää väärälle mittakaavalle, vaan tarkentuu itsestään.
await sivu.waitForTimeout(3000);
const levossa = await suhde();
vaadi('levossa kartta on näkymän tarkkuudessa',
  levossa !== null && Math.abs(levossa - 1) <= 0.02, String(levossa));

// 5) JATKUVA ELESARJA: väärä mittakaava odottaa lepoa eikä keskeytä elettä.
await nollaa();
await sivu.evaluate(() => { window.matkakirja.ui.taideSkaala *= 0.88; });
await sivu.evaluate(() => { window.matkakirja.ui.fitViewBox(); });
for (let i = 0; i < 3; i++) { await panoroi(160, 16); await sivu.waitForTimeout(200); }
const sarjanAikana = await mittarit();
vaadi('elesarjan aikana ei pakoteta rasterointia',
  sarjanAikana.pakotus === 0, JSON.stringify(sarjanAikana));
vaadi('elesarjan aikana ei aloiteta rasterointia sormen alla',
  sarjanAikana.aloituksetEleessa === 0,
  `${sarjanAikana.aloituksetEleessa}/${sarjanAikana.aloitukset} aloitusta eleen aikana`);

// 6) ... ja kun sarja loppuu, virhe korjautuu.
await sivu.waitForTimeout(3500);
const sarjanJalkeen = await mittarit();
const korjattu = await suhde();
vaadi('elesarjan jälkeen väärä mittakaava korjataan',
  sarjanJalkeen.pakotus === 1, JSON.stringify(sarjanJalkeen));
vaadi('korjauksen jälkeen tarkkuussuhde on 1,00',
  korjattu !== null && Math.abs(korjattu - 1) <= 0.02, String(korjattu));
vaadi('yksikään pakotus ei osunut eleen kohdalle',
  sarjanJalkeen.pakotusEleessa === 0, String(sarjanJalkeen.pakotusEleessa));

// 7) LATAUKSENJÄLKEINEN ENSITARKISTUS: ilman eleitä korjaus tulee heti
// näkymän asetuttua — juuri se korjaa mountin 10 %:n mittakaavavirheen.
await nollaa();
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.taideSkaala *= 0.9;
  ui.kartanEleHetki = null;
  ui.osoitinKartalla = false;
  ui.fitViewBox();
});
await sivu.waitForTimeout(900);
const ensi = await mittarit();
const ensiSuhde = await suhde();
vaadi('ensitarkistus korjaa mittakaavan alle sekunnissa',
  ensi.pakotus === 1, JSON.stringify(ensi));
vaadi('ensitarkistuksen jälkeen tarkkuussuhde on 1,00',
  ensiSuhde !== null && Math.abs(ensiSuhde - 1) <= 0.02, String(ensiSuhde));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi.`);
process.exit(kaatui.length ? 1 : 0);
