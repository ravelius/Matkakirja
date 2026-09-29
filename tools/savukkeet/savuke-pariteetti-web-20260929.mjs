/*
 * Savuke: SIIRTOSEPÄN PARITEETTIKATSAUS 29.9.2026 — KOLME WEB-VIKAA
 * (docs/raportit/pariteetti-20260929.md, rivit 4–6; Pelikoodarin
 * korjaustyö samana päivänä).
 *
 * VÄITTEET:
 *
 *   (a) OHITA EI LEIKKAA KUVATEKSTIÄ (rivi 4). Päätoimittajan päätös
 *       (löydös 138 / build 16) poisti saapumisen valokuvakortin
 *       polaroid-kehyksen ja kuvatekstipaperin kokonaan (natiivi
 *       seuraa: "kehys ja kuvateksti pois, pelkkä kuva") — kuvateksti
 *       jäi kuvan alt-attribuuttiin. Vartio: kuvatekstipaperia
 *       (`.fokusvirta-isokuva-teksti`) EI OLE DOMissa, kuvalla ON
 *       alt-teksti, ja Ohita ei ala ennen kuvan alareunaa — ajetaan
 *       sekä iPhonella (393 × 852) että iPadilla (834 × 1194).
 *   (b) VAIN YKSI LAPPU KERRALLAAN (rivi 5). Valokuvakortin avaus jo
 *       auki olevan maakortin (maapaneelin "valikko") TAI
 *       kaupunkipopupin ollessa auki sulkee ne molemmat
 *       (js/fokusvirta.js suljeMuutAvoimetLaput, kutsutaan
 *       avaaIsokuvaPaallys-funktiosta ja fokusnoston
 *       avaaNostonKortista). Vartio avaa ensin maakortin valikon ja
 *       kaupunkipopupin, sitten valokuvakortin, ja mittaa että vain
 *       yksi lappu jää auki.
 *   (c) LIIKU-NAPILLA ON NÄKYVÄ POHJA IPADILLA (rivi 6). Liiku hukkui
 *       Kreetanmeren nimiön alle 834 × 1194 -ruudulla, koska napilla
 *       ei ollut mitään taustaa. Vartio: napin laskettu tausta ei ole
 *       läpinäkyvä (alpha > 0) EIKÄ `none`/`transparent`, ja napin
 *       keskipisteestä `elementFromPoint` osuu NAPPIIN — ei minkään
 *       muun elementin (esim. karttanimiön) läpi.
 *
 * Sama offline-runko kuin tools/savukkeet/savuke-luentakuvat.mjs:
 * paikallinen http-palvelin, Chromiumille korvatut kuva/ääni-pyynnöt
 * (wikimedia.org|media.matkakirja.app|r2.dev), ei ulkoverkkoa.
 *
 * Aja:
 *   CHROMIUM=... PLAYWRIGHT_JS=... SAVUKE_CHROMIUM_LIPUT="--use-gl=angle --use-angle=swiftshader" \
 *   node tools/savukkeet/savuke-pariteetti-web-20260929.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const PW = process.env.PLAYWRIGHT_JS ?? 'playwright';
const paketti = await import(PW).catch(() => import('playwright'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const CHROME = process.env.CHROMIUM ?? '/opt/pw-browsers/chromium';
const LISALIPUT = (process.env.SAVUKE_CHROMIUM_LIPUT ?? '').split(' ').filter(Boolean);

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'ateena';

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
const PORTTI = Number(process.env.PORTTI ?? 0);
await new Promise((ok) => palvelin.listen(PORTTI, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

/* Sama 1 x 1 -sijaiskuva ja -ääni kuin savuke-luentakuvat.mjs:ssä. */
const VARAKUVA = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
  'base64',
);
const VARAAANI = Buffer.from('SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA', 'base64');

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: KAUPUNKI }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  executablePath: CHROME,
  args: ['--autoplay-policy=no-user-gesture-required', ...LISALIPUT],
});
const virheet = [];

async function avaaSivu(viewport) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org|media\.matkakirja\.app|r2\.dev\//, (route) => {
    const url = route.request().url();
    const aani = /\.mp3(\?|$)/.test(url);
    route.fulfill({
      status: 200,
      contentType: aani ? 'audio/mpeg' : 'image/png',
      body: aani ? VARAAANI : VARAKUVA,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
    { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  await sivu.waitForTimeout(4000);
  return { ctx, sivu };
}

/**
 * Saapuminen kaupunkiin ja valinnaisesti muiden lappujen esiavaus
 * ENNEN valokuvakorttia — juuri sitä väite (b) mittaa.
 */
async function saavuJaAvaaValokuvakortti(sivu, { esiavaaMaakortti = false, esiavaaKaupunkipopup = false } = {}) {
  return sivu.evaluate(async ({ id, esiavaaMaakortti: maa, esiavaaKaupunkipopup: popup }) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
    const tulos = { maapaneeliAuki: null, kaupunkipopupAuki: null };
    if (maa) {
      // Maakortin "valikko" auki ennen valokuvakorttia — sama tila
      // kuin ruudulla, kun pelaaja on juuri katsonut maan tietoja.
      ui.pallolauta?.maapaneeli?.paivita?.({
        iso: game.pack?.map?.cityCountry?.[id] ?? null,
        laatikko: null,
      });
      // avaaValikko ei ole julkinen — avataan samalla napautuksella
      // kuin pelaaja tekisi (maapaneeli-avain), jos kortti on DOMissa.
      document.querySelector('.maapaneeli-avain')?.click();
      /*
       * PALLO EI AINA EHDI AVAUTUA OFFLINE-AJOSSA (sama HUOM kuin
       * savuke-luentakuvat.mjs:ssä: WebGL/Globe.gl ei aina ehdi
       * valmistua verkottomassa savukkeessa 90 s:n katossa). Silloin
       * `ui.pallolauta.maapaneeli` puuttuu eikä oikeaa korttia voi
       * avata — testataan silti SAMAA `suljeMuutAvoimetLaput`-sopimusta
       * (js/fokusvirta.js) pienellä korvikkeella, jolla on sama
       * julkinen muoto (`suljeValikko`, `valikkoAuki`) kuin oikealla
       * maapaneelilla (js/pallolauta/maapaneeli.js). Tämä ei testaa
       * pallon piirtoa, vain sulkusopimusta.
       */
      if (!ui.pallolauta?.maapaneeli?.suljeValikko) {
        let auki = true;
        ui.pallolauta = ui.pallolauta ?? {};
        ui.pallolauta.maapaneeli = {
          valikkoAuki: () => auki,
          suljeValikko: () => { auki = false; },
        };
      }
      tulos.maapaneeliAuki = Boolean(ui.pallolauta?.maapaneeli?.valikkoAuki?.());
    }
    if (popup) {
      const K = await import('/js/kaupunkinosto.js');
      K.avaaKaupunkipopup(ui, game.cityOf());
      tulos.kaupunkipopupAuki = Boolean(ui.kaupunkipopupAuki);
    }
    const F = await import('/js/fokusvirta.js');
    ui.diaryVoice = { paused: false, currentTime: 1, ended: false, error: null };
    F.naytaLuentakuvasarja(ui, game.cityOf());
    return tulos;
  }, { id: KAUPUNKI, esiavaaMaakortti, esiavaaKaupunkipopup });
}

const laatikot = (sivu) => sivu.evaluate(() => {
  const b = (el) => (el ? (({ x, y, width, height, bottom, top }) => ({
    x: Math.round(x), y: Math.round(y), w: Math.round(width), h: Math.round(height),
    top: Math.round(top), bottom: Math.round(bottom),
  }))(el.getBoundingClientRect()) : null);
  const ruutu = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')].pop();
  const ohitaEl = document.querySelector('.fokusvirta-isokuva-ohita');
  const kuvaEl = ruutu?.querySelector('.fokusvirta-isokuva-kuva');
  return {
    kuva: b(kuvaEl),
    kuvanAlt: kuvaEl?.alt ?? null,
    paperi: Boolean(document.querySelector('.fokusvirta-isokuva-teksti')),
    ohita: b(ohitaEl),
    ohitaNakyy: Boolean(ohitaEl) && getComputedStyle(ohitaEl).visibility !== 'hidden',
  };
});

/* ==================================================================
 * (a) OHITA EI LEIKKAA KUVATEKSTIÄ — iPhone JA iPad
 * ================================================================== */

const RUUDUT_A = [
  { nimi: 'iPhone 393×852', viewport: { width: 393, height: 852, deviceScaleFactor: 2 } },
  { nimi: 'iPad 834×1194', viewport: { width: 834, height: 1194, deviceScaleFactor: 2 } },
];

for (const ruutu of RUUDUT_A) {
  const { ctx, sivu } = await avaaSivu(ruutu.viewport);
  await saavuJaAvaaValokuvakortti(sivu);
  await sivu.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
  await sivu.waitForTimeout(1500);
  const m = await laatikot(sivu);
  tieto(`${ruutu.nimi} · kuva`, JSON.stringify(m.kuva));
  tieto(`${ruutu.nimi} · Ohita`, JSON.stringify(m.ohita));
  vaadi(`${ruutu.nimi}: ei enää kuvatekstipaperia`, m.paperi === false);
  vaadi(`${ruutu.nimi}: kuvateksti on kuvan alt-attribuutissa`, Boolean(m.kuvanAlt));
  vaadi(`${ruutu.nimi}: Ohita näkyy eikä ala ennen kuvan alareunaa`,
    m.ohitaNakyy && Boolean(m.ohita) && Boolean(m.kuva) && m.ohita.top >= m.kuva.bottom,
    JSON.stringify({ ohita: m.ohita, kuva: m.kuva }));
  if (KUVAKANSIO) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `a-ohita-${ruutu.nimi.replace(/[^\w]+/g, '-')}.png`),
    });
  }
  await ctx.close();
}

/* ==================================================================
 * (b) VAIN YKSI LAPPU KERRALLAAN: maakortti JA kaupunkipopup
 * ================================================================== */

{
  const { ctx, sivu } = await avaaSivu({ width: 393, height: 852, deviceScaleFactor: 2 });
  const esitila = await saavuJaAvaaValokuvakortti(sivu, {
    esiavaaMaakortti: true, esiavaaKaupunkipopup: true,
  });
  tieto('(b) esitila ennen valokuvakorttia', JSON.stringify(esitila));
  await sivu.waitForSelector('.fokusvirta-isokuva-ruutu', { timeout: 30000 });
  await sivu.waitForTimeout(1000);
  const jalkitila = await sivu.evaluate(() => {
    // JS-tila (maapaneeli.valikkoAuki(), myös korvikkeella) TAI
    // DOM (oikea kortti) — kumpi tahansa niistä on olemassa.
    const jsMaakortti = window.matkakirja.ui.pallolauta?.maapaneeli?.valikkoAuki?.();
    const domMaakortti = document.querySelector('.maapaneeli-kortti.valikko-auki');
    return {
      maakortinValikkoAuki: typeof jsMaakortti === 'boolean' ? jsMaakortti : Boolean(domMaakortti),
      kaupunkipopupAuki: Boolean(window.matkakirja.ui.kaupunkipopupAuki)
        || Boolean(document.querySelector('.kaupunkipopup')),
      valokuvakorttiAuki: Boolean(document.querySelector('.fokusvirta-isokuva-ruutu')),
      aukiLaskuri: document.querySelectorAll(
        '.fokusvirta-isokuva-ruutu, .kaupunkipopup',
      ).length + (domMaakortti ? 1 : 0),
    };
  });
  tieto('(b) tila valokuvakortin jälkeen', JSON.stringify(jalkitila));
  vaadi('(b) esiehto täyttyi: maakortti oli oikeasti auki ennen valokuvakorttia',
    esitila.maapaneeliAuki === true, JSON.stringify(esitila));
  vaadi('(b) esiehto täyttyi: kaupunkipopup oli oikeasti auki ennen valokuvakorttia',
    esitila.kaupunkipopupAuki === true, JSON.stringify(esitila));
  vaadi('(b) maakortin valikko sulkeutui valokuvakortin avautuessa',
    jalkitila.maakortinValikkoAuki === false, JSON.stringify(jalkitila));
  vaadi('(b) kaupunkipopup sulkeutui valokuvakortin avautuessa',
    jalkitila.kaupunkipopupAuki === false, JSON.stringify(jalkitila));
  vaadi('(b) valokuvakortti on auki', jalkitila.valokuvakorttiAuki === true, JSON.stringify(jalkitila));
  vaadi('(b) vain yksi lappu on auki (laskuri === 1)',
    jalkitila.aukiLaskuri === 1, `laskuri ${jalkitila.aukiLaskuri}`);
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, 'b-vain-yksi-lappu.png') });
  }
  await ctx.close();
}

/* ==================================================================
 * (c) LIIKU-NAPILLA ON NÄKYVÄ POHJA IPADILLA
 * ================================================================== */

{
  const { ctx, sivu } = await avaaSivu({ width: 834, height: 1194, deviceScaleFactor: 2 });
  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    ui.render();
  }, KAUPUNKI);
  await sivu.waitForSelector('.toimintorivi .monitoimi-nappi', { timeout: 30000 });
  await sivu.waitForTimeout(1000);
  const liiku = await sivu.evaluate(() => {
    const nappi = document.querySelector('.toimintorivi .monitoimi-nappi');
    if (!nappi) return null;
    const r = nappi.getBoundingClientRect();
    const tyyli = getComputedStyle(nappi);
    const cx = r.x + r.width / 2;
    const cy = r.y + r.height / 2;
    const paalla = document.elementFromPoint(cx, cy);
    return {
      laatikko: { w: Math.round(r.width), h: Math.round(r.height) },
      tausta: tyyli.backgroundImage === 'none' ? tyyli.backgroundColor : tyyli.backgroundImage,
      reunus: tyyli.borderTopWidth,
      paallaOnNappiItse: Boolean(paalla === nappi || nappi.contains(paalla)),
      paallaTagi: paalla ? `${paalla.tagName}.${[...paalla.classList].join('.')}` : null,
    };
  });
  tieto('(c) Liiku iPadilla', JSON.stringify(liiku));
  const lapinakyva = (arvo) => /rgba\([^)]*,\s*0\)/.test(String(arvo))
    || String(arvo) === 'transparent' || String(arvo) === 'none';
  vaadi('(c) Liiku-napilla on näkyvä (ei-läpinäkyvä) pohja iPadilla',
    Boolean(liiku) && !lapinakyva(liiku.tausta), JSON.stringify(liiku));
  vaadi('(c) Liiku-napilla on näkyvä reunus (ei enää 0px)',
    Boolean(liiku) && liiku.reunus !== '0px', JSON.stringify(liiku));
  vaadi('(c) Liiku-napin keskipisteestä osutaan nappiin itseensä, ei nimiön läpi',
    Boolean(liiku) && liiku.paallaOnNappiItse === true, JSON.stringify(liiku));
  if (KUVAKANSIO) {
    await sivu.screenshot({ path: join(KUVAKANSIO, 'c-liiku-ipad-pohja.png') });
  }
  await ctx.close();
}

if (virheet.length) {
  tieto('sivuvirheitä', virheet.length);
  for (const v of virheet.slice(0, 5)) console.log(`VIRHE ${v}`);
}

await selain.close();
palvelin.close();

console.log(`\n${lapi}/${kaikki} väitettä läpi`);
if (KUVAKANSIO) {
  writeFileSync(join(KUVAKANSIO, 'tulos.txt'), `${lapi}/${kaikki} väitettä läpi\n`);
}
process.exit(lapi === kaikki ? 0 : 1);
