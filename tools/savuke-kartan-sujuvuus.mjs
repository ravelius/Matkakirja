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
 *   node tools/savuke-kartan-sujuvuus.mjs             # Chromium
 *   WEBKIT=1 node tools/savuke-kartan-sujuvuus.mjs    # WebKit
 *
 * KAKSI MOOTTORIA (iPad-kierros 13.8.2026): omistajan laitteet ovat
 * WebKit-pohjaisia, ja Grönlanti-hyppy sekä pakkaustökkiminen näkyivät
 * vain siellä. WebKitissä ei ole CDP:tä, joten eleet syötetään
 * synteettisinä Pointer/Touch-tapahtumina sivun sisällä; lisäksi
 * headless-WebKitin requestAnimationFrame ei tikitä ilman piirrettävää,
 * joten kehysväleihin nojaavat väitteet ohitetaan siellä (aikamittaus
 * ei kertoisi selaimesta vaan ajoympäristöstä).
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
const WEBKIT = process.env.WEBKIT === '1';
const selain = WEBKIT
  ? await (paketti.webkit ?? paketti.default?.webkit).launch({
    executablePath: process.env.WEBKIT_BIN ?? '/opt/pw-browsers/webkit-2336/pw_run.sh',
  })
  : await (paketti.chromium ?? paketti.default?.chromium).launch({
    executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  });
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
    tarkistus: 0, pakotus: 0, pakotusEleessa: 0, pakotusLepo: null, loki: [],
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
      /*
       * Lepo pakotushetkellä: montako millisekuntia viimeisestä eleestä.
       * Vahti saa korjata mittakaavan vasta todellisen levon jälkeen
       * (TARKKUUS_LEPO_MS = 1600), ja juuri sitä tässä vartioidaan —
       * seinäkelloikkuna ("ei 700 ms:n sisällä") valehteli hitaalla
       * ajokoneella, jossa itse ele venyy sekunteihin.
       */
      const lepo = Math.round(performance.now() - (this.kartanEleHetki ?? -1e9));
      m.pakotusLepo = m.pakotusLepo === null ? lepo : Math.min(m.pakotusLepo, lepo);
      m.loki.push(`pakotus suhde ${(this.nakyvaAlue().skaala / ennen).toFixed(3)} lepo=${lepo}`);
    }
    return tulos;
  };
});
const nollaa = () => sivu.evaluate(() => {
  Object.assign(window.__sujuvuus, {
    ruudut: 0, ruudutEleessa: 0, aloitukset: 0, aloituksetEleessa: 0,
    tarkistus: 0, pakotus: 0, pakotusEleessa: 0, pakotusLepo: null, loki: [],
  });
});
const mittarit = () => sivu.evaluate(() => ({ ...window.__sujuvuus }));
const suhde = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const n = ui.nakyvaAlue();
  return n && ui.taideSkaala ? n.skaala / ui.taideSkaala : null;
});

// --- eleet -------------------------------------------------------------
/*
 * Chromiumissa eleet syötetään CDP:llä (aidot, luotetut tapahtumat,
 * joista selain johtaa myös pointer-tapahtumat). WebKitissä CDP:tä ei
 * ole, joten samat eleet rakennetaan synteettisinä tapahtumina sivun
 * sisällä: panorointi Pointer-tapahtumina (raahaus kuuntelee niitä) ja
 * nipistys kosketustapahtumina (nipistys kuuntelee niitä). WebKit-GTK:n
 * `new Touch()` on "Illegal constructor", joten kosketuslista
 * kirjoitetaan geneerisen Eventin päälle — käsittelijät lukevat vain
 * touches[i].clientX/Y:n ja lengthin.
 */
/** Yhden sormen pyyhkäisy kartalla. */
async function panoroi(matka = 200, askelia = 20) {
  if (WEBKIT) {
    await sivu.evaluate(async ({ matka: m, askelia: n }) => {
      const pane = window.matkakirja.ui.svg.parentElement;
      const x = 195; const y = 500;
      const laheta = (tyyppi, px, py, lisa = {}) => pane.dispatchEvent(new PointerEvent(tyyppi, {
        pointerId: 7, pointerType: 'touch', isPrimary: true,
        clientX: px, clientY: py, bubbles: true, cancelable: true, ...lisa,
      }));
      laheta('pointerdown', x, y, { buttons: 1 });
      for (let i = 1; i <= n; i++) {
        laheta('pointermove', x - (m * i) / n, y - (m * i) / (n * 4), { buttons: 1 });
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 16));
      }
      laheta('pointerup', x - m, y - m / 4);
    }, { matka, askelia });
    return;
  }
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
  if (WEBKIT) {
    await sivu.evaluate(async ({ kerroin: k }) => {
      const pane = window.matkakirja.ui.svg.parentElement;
      const kx = 195; const ky = 420; const alku = 120; const n = 14;
      const sormi = (id, x, y) => ({ identifier: id, clientX: x, clientY: y, pageX: x, pageY: y });
      const parit = (d) => [sormi(1, kx - d / 2, ky), sormi(2, kx + d / 2, ky)];
      const laheta = (tyyppi, koskee, muuttuneet) => {
        const e = new Event(tyyppi, { bubbles: true, cancelable: true });
        Object.defineProperty(e, 'touches', { value: koskee });
        Object.defineProperty(e, 'targetTouches', { value: koskee });
        Object.defineProperty(e, 'changedTouches', { value: muuttuneet });
        pane.dispatchEvent(e);
      };
      let p = parit(alku);
      laheta('touchstart', p, p);
      for (let i = 1; i <= n; i++) {
        p = parit(alku * (1 + (k - 1) * (i / n)));
        laheta('touchmove', p, p);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 16));
      }
      laheta('touchend', [], p);
    }, { kerroin });
    return;
  }
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

/*
 * 2) NIPISTYS ei pakota rasterointia eleen aikana eikä heti perään.
 * Ennen v607:n korjausta tässä oli aina yksi pakotus (suhde 1,150)
 * 350 ms:ssä. Ehto on lepoaika eikä seinäkello: hitaalla ajokoneella
 * itse ele venyy sekunteihin, ja kiinteä "ei 700 ms:n sisällä" alkoi
 * kaatua heti kun ruutuputki nopeutui niin paljon, että vahti EHTI
 * tehdä laillisen leponsa jälkeisen korjauksen mittausikkunassa.
 * Vartioitava asia on: korjaus vasta todellisen levon (1600 ms ilman
 * elettä) jälkeen, ei koskaan sormen alla.
 */
await sivu.waitForTimeout(2000);
await nollaa();
await nipista(1.15);
await sivu.waitForTimeout(700);
const nipistys = await mittarit();
vaadi('nipistyksen pakotus tulee vasta todellisen levon jälkeen',
  nipistys.pakotusEleessa === 0
  && (nipistys.pakotusLepo === null || nipistys.pakotusLepo >= 1500),
  JSON.stringify(nipistys));
vaadi('nipistyksen aikana ei aloiteta yhtään rasterointia',
  nipistys.aloituksetEleessa === 0,
  `${nipistys.aloituksetEleessa}/${nipistys.aloitukset} aloitusta eleen aikana`);

/*
 * 2b) ANKKURI PITÄÄ (omistajan havainto iPadilta 13.8.2026: "hyppää
 * ihan eri kohtaan, yleensä Grönlantiin"). Nipistyksen alla ollut
 * kartan piste on eleen ja sen viimeistelyn jälkeen yhä sormien
 * kohdalla. Jos ankkuri romahtaa nollapisteeseen (laudan vasen
 * ylänurkka = Grönlanti), ero kasvaa satoihin pikseleihin.
 * Kiertävällä kartalla vaakaero normalisoidaan jakson yli, ettei
 * kierron kopio näyttäisi valheellista loikkaa.
 */
const ankkurinSiirtyma = (p, kx, ky) => sivu.evaluate(({ piste, x, y }) => {
  const ui = window.matkakirja.ui;
  const r = ui.svg.getBoundingClientRect();
  const vb = ui.svg.viewBox.baseVal;
  const px = r.width / vb.width;
  let dx = (piste.x - vb.x) * px + r.left - x;
  const dy = (piste.y - vb.y) * px + r.top - y;
  if (ui.kiertava()) {
    const jakso = window.matkakirja.game.pack.map.width * px;
    dx = ((dx % jakso) + jakso) % jakso;
    dx = Math.min(dx, jakso - dx);
  }
  return { dx: Math.round(dx), dy: Math.round(dy) };
}, { piste: p, x: kx, y: ky });

await sivu.waitForTimeout(1500);
const ankkuriEnnen = await sivu.evaluate(() => window.matkakirja.ui.kartanKohta(195, 420));
await nipista(1.3);
await sivu.waitForTimeout(400);
const ankkuri = await ankkurinSiirtyma(ankkuriEnnen, 195, 420);
vaadi('nipistyksen ankkuri pysyy sormien alla',
  Math.abs(ankkuri.dx) < 40 && Math.abs(ankkuri.dy) < 40, JSON.stringify(ankkuri));

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
  return { pisin: Math.round(Math.max(0, ...v)), yli100: v.filter((x) => x > 100).length, kehyksia: v.length };
});
const nipistyksenJalkeen = await mittarit();
// Headless-WebKitin rAF ei tikitä luotettavasti ilman piirrettävää,
// joten kehysväli mittaisi ajoympäristöä eikä selainta (ks. otsikko).
if (WEBKIT) {
  console.log(`ohit  nipistyksen jälkeinen panorointi ei jumita ruudunpäivitystä — WebKit headless, kehyksiä ${kehykset.kehyksia}`);
} else {
  vaadi('nipistyksen jälkeinen panorointi ei jumita ruudunpäivitystä',
    kehykset.pisin < 600, `pisin kehysväli ${kehykset.pisin} ms, ${kehykset.yli100} yli 100 ms`);
}
// Pakotus saa osua vetojen VÄLIIN vain todellisen levon jälkeen —
// hitaalla ajokoneella CDP-vetojen väliin jää helposti yli 1600 ms.
vaadi('nipistyksen jälkeisen panoroinnin aikana ei pakoteta rasterointia sormen alla',
  nipistyksenJalkeen.pakotusEleessa === 0
  && (nipistyksenJalkeen.pakotusLepo === null || nipistyksenJalkeen.pakotusLepo >= 1500),
  JSON.stringify(nipistyksenJalkeen));
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
vaadi('elesarjan aikana ei pakoteta rasterointia sormen alla',
  sarjanAikana.pakotusEleessa === 0
  && (sarjanAikana.pakotusLepo === null || sarjanAikana.pakotusLepo >= 1500),
  JSON.stringify(sarjanAikana));
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
// Edellisen osion pakotus voi vielä piirtää ruutujaan (liukupanorointi
// siirtää eleen lepohetkeä ja siten koko sarjaa myöhemmäksi), ja
// kesken piirron ensitarkistus siirtyy — tässä mitataan vain sen omaa
// viivettä, joten piirron annetaan ensin valmistua.
for (let i = 0; i < 40; i++) {
  const kesken = await sivu.evaluate(() => window.matkakirja.ui.taidePiirtyy === true);
  if (!kesken) break;
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(250);
}
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

/*
 * 8) MAAN ÄÄRIVIIVA piirtyy uuteen maahan saavuttaessa (omistajan
 * tilaus 13.8.2026) — mutta EI samaan maahan palatessa, eikä animaatio
 * saa pakottaa kartan uudelleenrasterointia. Jälkimmäinen on tämän
 * savukkeen ydinasia: kartan päällä pyörivä animaatio on juuri se
 * tilanne, jossa tökkiminen ennen näkyi.
 */
const maat = await sivu.evaluate(() => {
  const { game } = window.matkakirja;
  const map = game.pack.map;
  const oma = map.cityCountry?.[game.cityOf().id];
  const kaupungit = game.board.cities;
  return {
    oma,
    toisessa: kaupungit.find((c) => map.cityCountry?.[c.id] && map.cityCountry[c.id] !== oma)?.id,
  };
});
vaadi('laudalta löytyy toisen maan kaupunki vertailua varten',
  Boolean(maat.toisessa), JSON.stringify(maat));

const piirto = await sivu.evaluate(async (kohde) => {
  const { game, ui } = window.matkakirja;
  game.actionKehittajaSiirto(kohde);
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  const kerros = document.querySelector('.country-borders');
  const polut = [...kerros.querySelectorAll('.country-korostus')];
  return {
    piirtyy: kerros.classList.contains('maa-piirtyy'),
    polkuja: polut.length,
    // Jokaisella polulla on OMA pituutensa viiva-aukkokuviona: saaristo
    // piirtyy rinnakkain eikä jonossa.
    omatPituudet: polut.every((p) => parseFloat(p.style.strokeDasharray) > 0),
    animaatioita: polut.reduce((n, p) => n + (p.getAnimations?.().length ?? 0), 0),
  };
}, maat.toisessa);
vaadi('uuteen maahan saavuttaessa ääriviiva alkaa piirtyä',
  piirto.piirtyy === true && piirto.animaatioita > 0, JSON.stringify(piirto));
vaadi('jokainen rengas on oma polkunsa omalla pituudellaan',
  piirto.polkuja > 0 && piirto.omatPituudet === true, JSON.stringify(piirto));

/*
 * Viiva paisuu piirron AIKANA (omistajan tarkennus 13.8.2026 ilta):
 * puolivälissä leveyden pitää olla piirron lähtöarvon (3.5) yläpuolella
 * mutta alle piirron loppuleveyden (5.4) — tasainen kasvu, ei
 * kertahyppy.
 */
const kesken = await sivu.evaluate(async () => {
  await new Promise((r) => setTimeout(r, 700));
  const polku = document.querySelector('.country-borders .country-korostus');
  return { leveys: parseFloat(getComputedStyle(polku).strokeWidth) };
});
vaadi('viiva paisuu jo piirtyessään',
  kesken.leveys > 3.7 && kesken.leveys < 5.5, JSON.stringify(kesken));

/*
 * VÄLÄYSTÄ EI ENÄÄ OLE (omistaja 13.8.2026 ilta: "otetaan rajan
 * väläytys pois mutta raja voisi jäädä lähes yhtä voimakkaana näkyviin
 * kuin se on piirron lopussa"): piirron perään tulee vain lyhyt pehmeä
 * asettuminen (.maa-asettuu), jonka aikana viiva EI saa ylittää
 * piirron loppuleveyttä, ja lepoon jää vahva viiva (5 / 0.72).
 */
const asettuminen = await sivu.evaluate(async () => {
  const kerros = document.querySelector('.country-borders');
  // Piirto kestää kaksi sekuntia; asettuminen odotetaan sen perään.
  let nahty = false;
  let leveys = 0;
  for (let i = 0; i < 40 && !nahty; i++) {
    if (kerros.classList.contains('maa-asettuu')) {
      nahty = true;
      leveys = parseFloat(getComputedStyle(kerros.querySelector('.country-korostus')).strokeWidth);
    }
    // eslint-disable-next-line no-await-in-loop
    await new Promise((r) => setTimeout(r, 50));
  }
  // Asettuminen kestää 750 ms (AARIVIIVAN_ASETTUMIS_MS) — loppuarvot
  // luetaan vasta sen mentyä kokonaan ohi.
  await new Promise((r) => setTimeout(r, 1100));
  const polku = kerros.querySelector('.country-korostus');
  return {
    nahty,
    leveysAsettuessa: leveys,
    ohi: !kerros.classList.contains('maa-asettuu'),
    // Viiva-aukkokuvio siivotaan lopuksi: viiva jää yhtenäiseksi.
    dashLopussa: polku?.style.strokeDasharray ?? '',
    leveysLopussa: parseFloat(getComputedStyle(polku).strokeWidth),
  };
});
vaadi('piirron valmistuttua viiva asettuu pehmeästi',
  asettuminen.nahty === true, JSON.stringify(asettuminen));
vaadi('asettuminen ei väläytä: leveys ei ylitä piirron loppua',
  asettuminen.leveysAsettuessa > 0 && asettuminen.leveysAsettuessa <= 5.5,
  JSON.stringify(asettuminen));
vaadi('lepoon jää lähes piirron loppuvoima',
  asettuminen.ohi === true && Math.abs(asettuminen.leveysLopussa - 5) < 0.2
  && asettuminen.dashLopussa === '', JSON.stringify(asettuminen));

const samaMaa = await sivu.evaluate(async () => {
  const { game, ui } = window.matkakirja;
  const map = game.pack.map;
  const nyt = game.cityOf();
  const oma = map.cityCountry?.[nyt.id];
  // Naapurikaupunki SAMASTA maasta — tai sama kaupunki, jos toista ei ole.
  const kohde = game.board.cities.find((c) => c.id !== nyt.id
    && map.cityCountry?.[c.id] === oma)?.id ?? nyt.id;
  // countryKey nollataan, jotta kerros oikeasti piirretään uudelleen —
  // juuri se on se tilanne, jossa animaatio EI saa käynnistyä. Sama
  // tilanne syntyy pelin latauksessa ja laudan uudelleenpiirrossa.
  ui.countryKey = null;
  if (kohde !== nyt.id) game.actionKehittajaSiirto(kohde);
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  const kerros = document.querySelector('.country-borders');
  return {
    maa: oma,
    kohde,
    piirtyy: kerros.classList.contains('maa-piirtyy'),
    dash: kerros.querySelector('.country-korostus')?.style.strokeDasharray ?? '',
  };
});
vaadi('samaan maahan palatessa ääriviivaa ei piirretä uudelleen',
  samaMaa.piirtyy === false && samaMaa.dash === '', JSON.stringify(samaMaa));

/*
 * Rasterointi mitataan ERIKSEEN eristetyllä animaatiolla: pelkkä
 * maanvaihto liikuttaa myös karttaa (uusi kaupunki keskelle), ja sen
 * ruudut sekoittuisivat mittaukseen. Tässä pelaaja pysyy paikallaan ja
 * vain ääriviiva piirretään uudestaan — jos kartta silti rasteroituu,
 * syy on animaatiossa.
 */
await sivu.waitForTimeout(1500);
// Puskurirengas tyhjäksi ennen vertailua: rengas piirtää ruutuja
// joutohetkinä, ja sen sattumanvarainen jakautuminen kahden
// mittausikkunan välille näkyisi erona, joka ei kerro animaatiosta
// mitään (mitattu välkkyväksi: väliin 2 leporuutua ja 3
// animaatioruutua samasta jonosta).
for (let i = 0; i < 60; i++) {
  const kesken = await sivu.evaluate(() => Boolean(window.matkakirja.ui.taideRengas)
    || window.matkakirja.ui.taidePiirtyy === true);
  if (!kesken) break;
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(250);
}
// Vertailuluku: yhtä pitkä lepojakso ilman animaatiota. Kartta täydentää
// ruutujaan joutohetkinä muutenkin, joten pelkkä ruutujen määrä ei
// kertoisi mitään ilman tätä.
await nollaa();
await sivu.waitForTimeout(1500);
const lepo = await mittarit();
await nollaa();
const eristetty = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  ui.countryKey = null;
  ui.viimeMaa = 'savuke:XXX'; // eri maa kuin nykyinen → animaatio käynnistyy
  ui.render();
  await new Promise((r) => setTimeout(r, 250));
  return {
    piirtyy: document.querySelector('.country-borders').classList.contains('maa-piirtyy'),
  };
});
await sivu.waitForTimeout(1500);
const animaationAikana = await mittarit();
vaadi('eristetty ääriviiva-animaatio käynnistyy', eristetty.piirtyy === true,
  JSON.stringify(eristetty));
vaadi('ääriviiva-animaatio ei pakota uudelleenrasterointia',
  animaationAikana.pakotus === 0, JSON.stringify(animaationAikana));
vaadi('ääriviiva-animaatio ei lisää rasterointia levon yli',
  animaationAikana.aloitukset <= lepo.aloitukset,
  `animaatio ${animaationAikana.aloitukset}, lepo ${lepo.aloitukset}`);

/*
 * 9) KOKONÄKYMÄSTÄ NIPISTYS EI LOIKI. Ennen korjausta ele sytytti
 * lähikuvatilan heti kahden sormen osuessa ruutuun: näkymä hyppäsi
 * saapumisportaaseen pelaajan nappulan kohdalle kesken eleen. Nyt ele
 * lähtee kokonäkymän omasta mittakaavasta ja ankkuroituu sormiin, ja
 * lähikuvatilaan siirrytään vasta sormien irrotessa. Pystysuunnassa
 * sallitaan asettelun vaihdoksen siirtymä (lähikuvan kartta kiinnittyy
 * yläreunaan), vaakasuunnassa ankkurin on pidettävä.
 */
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  ui.nollaaAloitusZoom();
  ui.fitViewBox();
  ui.paivitaZoomiNapit();
});
await sivu.waitForTimeout(2500);
const yleisEnnen = await sivu.evaluate(() => ({
  kohta: window.matkakirja.ui.kartanKohta(195, 420),
  manner: window.matkakirja.ui.mannerZoom,
}));
await nipista(1.5);
await sivu.waitForTimeout(400);
const yleisSiirtyma = await ankkurinSiirtyma(yleisEnnen.kohta, 195, 420);
const yleisJalkeen = await sivu.evaluate(() => ({
  manner: window.matkakirja.ui.mannerZoom,
  kerroin: Math.round((window.matkakirja.ui.zoomiVapaa || 0) * 100) / 100,
}));
vaadi('kokonäkymän nipistys alkaa kokonäkymästä eikä hyppää eleen alussa',
  yleisEnnen.manner === false && yleisJalkeen.manner === true,
  JSON.stringify({ yleisEnnen, yleisJalkeen }));
vaadi('kokonäkymän nipistyksen ankkuri ei karkaa (ei Grönlanti-hyppyä)',
  Math.abs(yleisSiirtyma.dx) < 80 && Math.abs(yleisSiirtyma.dy) < 320,
  JSON.stringify(yleisSiirtyma));

/*
 * 10) LIUKUPANOROINTI (omistajan toive 13.8.2026: "Earthissa vieritys
 * ei lopu heti kun sormi irtoaa vaan hidastuu pehmeästi"). Nopean
 * pyyhkäisyn jälkeen kartta liukuu vielä eteenpäin — mutta liuku EI
 * rasteroi kesken liikkeen: kartanRaahaus pysyy liu'un ajan pystyssä
 * ja rasterointi (loppukirjaus) tulee vasta pysähdyttyä.
 */
await sivu.waitForTimeout(2500);
await nollaa();
const panEnnenLiukua = await sivu.evaluate(() => window.matkakirja.ui.panX);
/*
 * Pyyhkäisy uusitaan tarvittaessa: CDP:n kosketustapahtumien ajoitus
 * elää ajokoneen kuorman mukana, ja liian tiheään niputtuneista
 * tapahtumista ei kerry nopeusikkunaan näytteitä (alle 30 ms:n
 * mittausväli hylätään kohinana myös oikealla laitteella). Vartioitava
 * asia on "nopea pyyhkäisy liukuu", ei "jokainen synteettinen
 * tapahtumasarja tulkitaan nopeaksi".
 */
let liukuHeti = { raahaus: false, panX: null };
for (let yritys = 0; yritys < 3 && !liukuHeti.raahaus; yritys++) {
  // eslint-disable-next-line no-await-in-loop
  await panoroi(220, 8);
  // eslint-disable-next-line no-await-in-loop
  liukuHeti = await sivu.evaluate(() => ({
    raahaus: window.matkakirja.ui.kartanRaahaus,
    panX: window.matkakirja.ui.panX,
  }));
  // eslint-disable-next-line no-await-in-loop
  if (!liukuHeti.raahaus) await sivu.waitForTimeout(400);
}
await sivu.waitForTimeout(250);
const liukuKesken = await sivu.evaluate(() => ({
  panX: window.matkakirja.ui.panX,
}));
await sivu.waitForTimeout(2000);
const liukuMittarit = await mittarit();
const liukuLopussa = await sivu.evaluate(() => ({
  raahaus: window.matkakirja.ui.kartanRaahaus,
}));
vaadi('pyyhkäisyn jälkeen kartta liukuu pehmeästi eteenpäin',
  liukuHeti.raahaus === true && liukuKesken.panX !== liukuHeti.panX
  && liukuLopussa.raahaus === false,
  JSON.stringify({ panEnnenLiukua, liukuHeti, liukuKesken, liukuLopussa }));
vaadi('liuku ei aloita rasterointia kesken liikkeen',
  liukuMittarit.aloituksetEleessa === 0 && liukuMittarit.pakotus === 0,
  JSON.stringify(liukuMittarit));

/*
 * 11) RUUTUPUTKEN VAIHE 2 (tiilipyramidi): kolme takuuta.
 *
 *   a) Taidelähde on jäsennetty KERRAN ja pyramidin pohjataso — koko
 *      laudan karkea bittikartta — on syntynyt laudan luonnissa.
 *      pohjaValmisMs on aika laudan luonnista pohjan valmistumiseen;
 *      raja on väljä, koska ajokoneiden nopeus vaihtelee, mutta
 *      "ei koskaan" ei mahdu siihen millään koneella.
 *   b) Pohja on aina tarkkojen ruutujen ALLA (edeltävä sisarus), ja
 *      siksi ele piirtää aina valmista bittikarttaa — myös siellä,
 *      minne tarkkoja ruutuja ei vielä ole ehditty tehdä.
 *   c) Ruudun piirto EI jäsennä SVG:tä: kokonainen pakotettu
 *      ruutusarja syntyy ilman yhtäkään ruutukohtaista SVG-blobia
 *      (aloitukset lasketaan createObjectURL-koukusta, ks. mittarit).
 */
const pyramidi = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  return {
    lahde: Boolean(ui.taideLahde),
    pohja: Boolean(ui.taidePohja),
    pohjaValmisMs: Math.round(ui.pohjaValmisMs ?? -1),
    pohjaAllaRuutujen: Boolean(ui.pohjaRyhma && ui.taideRyhma
      // eslint-disable-next-line no-bitwise
      && (ui.pohjaRyhma.compareDocumentPosition(ui.taideRyhma) & Node.DOCUMENT_POSITION_FOLLOWING)),
  };
});
vaadi('taidelähde on jäsennetty ja pohjataso syntyi laudan luonnissa',
  pyramidi.lahde && pyramidi.pohja
  && pyramidi.pohjaValmisMs > 0 && pyramidi.pohjaValmisMs < 60000,
  JSON.stringify(pyramidi));
vaadi('pohjataso on tarkkojen ruutujen alla',
  pyramidi.pohjaAllaRuutujen, JSON.stringify(pyramidi));

// c) pakotettu sarja lähizoomissa: ruutuja syntyy, SVG-blobeja ei.
await nollaa();
await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const vb = ui.svg.viewBox.baseVal;
  const kx = vb.x + vb.width / 2;
  const ky = vb.y + vb.height / 2;
  vb.width /= 8;
  vb.height /= 8;
  vb.x = kx - vb.width / 2;
  vb.y = ky - vb.height / 2;
  await new Promise((r) => requestAnimationFrame(r));
  ui.kartanEleHetki = null;
  ui.osoitinKartalla = false;
  ui.taideSkaala = 0;
  ui.taideRuudut = new Map();
  ui.taideTyhjat = new Set();
  ui.taydennaTaide({ heti: true });
});
for (let i = 0; i < 240; i++) {
  const valmis = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    return Boolean(ui.taideSkaala) && ui.taidePiirtyy === false && ui.taideRuudut.size > 0;
  });
  if (valmis) break;
  // eslint-disable-next-line no-await-in-loop
  await sivu.waitForTimeout(250);
}
const sarjaJalkeen = await mittarit();
const sarjanRuudut = await sivu.evaluate(() => window.matkakirja.ui.taideRuudut.size);
vaadi('ruudun piirto ei jäsennä SVG:tä (leikkaus jäsennetystä lähteestä)',
  sarjanRuudut > 0 && sarjaJalkeen.aloitukset === 0,
  `ruutuja ${sarjanRuudut}, svg-blobeja ${sarjaJalkeen.aloitukset}`);

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi.`);
process.exit(kaatui.length ? 1 : 0);
