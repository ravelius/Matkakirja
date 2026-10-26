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
 *   (c) LIIKU PYSYY LÄPINÄKYVÄNÄ, MUTTA SIIRTYY IPADILLA (rivi 6,
 *       KORJATTU 29.9.2026 Päätoimittajan päätöksellä). Liiku hukkui
 *       Kreetanmeren nimiön alle 834 × 1194 -ruudulla, koska nappi oli
 *       ruudun keskilinjalla, jolle useimman maan oletusnäkymä
 *       keskittää rantaviivan ja siten myös meren nimiön. Pergamentti-
 *       pohja PALAUTETTIIN LÄPINÄKYVÄKSI (PÄÄTÖKSET 28 kohta 3 pätee
 *       taas sanatarkasti) ja nappi SIIRRETTIIN pois keskilinjalta
 *       Pulun pystyreunaan (css/styles.css, `@media (min-width: 768px)
 *       and (orientation: portrait)`). Vartio: napin laskettu tausta
 *       ON läpinäkyvä (alpha 0 TAI `none`/`transparent`), napin
 *       suorakulmio ei leikkaa yhdenkään todellisen kartan nimiön
 *       (`text.karttanimi`, pallolaudan CSS2D-nimikerros, pakotettu
 *       DOMiin `?glnimiot=0`:lla) suorakulmiota, ja napin
 *       keskipisteestä `elementFromPoint` osuu NAPPIIN itseensä.
 *       Mitattu Kreikan lisäksi kahdessa muussa maassa (Ranska,
 *       Italia). HUOM: osa luonnonkohteiden nimiöistä (meret, vuoret)
 *       piirtyy oletuksena GL-tekstuuriin eikä DOM-solmuksi edes
 *       `glnimiot=0`:lla, jos ladonta ei priorisoi niitä näkyviin
 *       juuri sillä kehyksellä — vartio kattaa siis kaikki DOMiin
 *       ASTUVAT nimiöt (mm. kaupunkien nimet), ei väitä kattavansa
 *       jokaista mahdollista GL-tekstuurinimeä. Siksi pääpuolustus on
 *       SIJAINTI: nappi ei ole enää sillä ruudun keskilinjalla, jolla
 *       Kreetanmeri mitattiin.
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
import { avaaChromium } from '../selain.mjs';

const PW = process.env.PLAYWRIGHT_JS ?? 'playwright';
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

const selain = await avaaChromium({
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
 * (c) LIIKU ON LÄPINÄKYVÄ EIKÄ OSU KARTAN NIMIÖIHIN IPADILLA
 *
 * Oikea pallolauta (ei sijaiskuvia) reaalisella ämpärihaulla — sama
 * malli kuin tools/savukkeet/savuke-nimiot-sulavat.mjs. Jos ämpäri ei
 * vastaa, tämä osio ohitetaan siististi (sama sopimus kuin muillakin
 * pallosavukkeilla) eivätkä (a)/(b) kärsi siitä.
 * ================================================================== */

const AMPARI = 'https://media.matkakirja.app/';
const ampariValimuisti = new Map();
async function ampariHaku(url) {
  if (ampariValimuisti.has(url)) return ampariValimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  ampariValimuisti.set(url, lupaus);
  return lupaus;
}

const kirjasto = await ampariHaku(`${AMPARI}vendor/globe.gl-2.46.2.min.js`);
if (kirjasto?.status !== 200) {
  console.log('OHITUS  (c): ämpäri ei vastaa — palloa ei voi avata, nimiövartiot ohitetaan');
} else {
  /** Avaa pallolaudan oikeasti (ei sijaiskuvia) annetussa kaupungissa. */
  async function avaaPalloSivu(viewport, kaupunkiId) {
    const peliC = new Game({
      players: [{ name: 'Fogg', color: '#c9a227', start: kaupunkiId }],
      pack: packById('maailmankartta'),
      seed: 5,
    });
    peliC.phase = 'action';
    peliC.tokens.delete(kaupunkiId);
    const tallenneC = JSON.stringify(peliC.toJSON());
    const ctx = await selain.newContext({ ...viewport, serviceWorkers: 'block' });
    await ctx.addInitScript((data) => {
      try {
        localStorage.setItem('matkakirja-save-v1', data);
        localStorage.removeItem('matkakirja-lauta');
        localStorage.setItem('matkakirja-kehittaja', '1');
      } catch { /* yksityinen tila */ }
    }, tallenneC);
    const sivu = await ctx.newPage();
    sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
    await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
    await sivu.route(/wikimedia\.org/, (r) => r.abort());
    await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
      const v = await ampariHaku(route.request().url());
      if (!v || v.status !== 200) { route.abort(); return; }
      route.fulfill({
        status: 200, contentType: v.tyyppi ?? 'application/octet-stream', body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
    });
    await sivu.goto(`${osoite.replace(/\?.*$/, '')}?lauta=pallo&glnimiot=0`,
      { waitUntil: 'domcontentloaded', timeout: 60000 });
    const auki = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
      { timeout: 90000 }).then(() => true).catch(() => false);
    if (!auki) return { ctx, sivu, auki: false };
    await sivu.evaluate(async () => {
      const { ui } = window.matkakirja;
      clearTimeout(ui.automaattiheittoAjastin);
      ui.automaattiheittoAjastin = null;
      const { suljeFokusvirta } = await import('/js/fokusvirta.js');
      suljeFokusvirta(ui);
      await ui.pallolauta.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1600));
      for (const el of document.querySelectorAll(
        '.saapumistraileri, .fokusvirta-isokuva, .fokuskohde-popup, .fokusnosto-kerros',
      )) el.remove();
      /*
       * SAAPUMISPUHE VAIENNETAAN (ei vain kytkin pois — se ei pysäytä jo
       * soivaa ääntä): muuten body.luenta-aanessa pitää Liikun
       * display:none-tilassa eikä sitä voi mitata (sama juurisyy kuin
       * savuke-iphone-tekstit.mjs:n luentavartioilla).
       */
      const L = await import('/js/luenta.js');
      L.asetaLuentaKytkin(false);
      L.pysaytaSaapumispuhe?.(ui);
      L.stopDiaryVoice?.(ui);
      L.stopIntroVoice?.(ui);
    });
    await sivu.waitForTimeout(4000);
    await sivu.waitForFunction(() => {
      const l = window.matkakirja.ui.pallolauta;
      return l?.nostot?.sovittelunTulos?.()?.lukossa === false;
    }, null, { timeout: 15000, polling: 200 }).catch(() => {});
    await sivu.waitForTimeout(1000);
    return { ctx, sivu, auki: true };
  }

  /** Napin laatikko, tausta, reunus ja karttanimiöiden laatikot. */
  const mittaaLiikuJaNimiot = () => document.body && (() => {
    const rectOf = (el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.x, y: r.y, w: r.width, h: r.height,
        top: r.top, bottom: r.bottom, left: r.left, right: r.right,
      };
    };
    const nappi = document.querySelector('.toimintorivi .monitoimi-nappi');
    if (!nappi) return null;
    const r = rectOf(nappi);
    const tyyli = getComputedStyle(nappi);
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    const paalla = document.elementFromPoint(cx, cy);
    const nimiot = [...document.querySelectorAll('text.karttanimi')].map((n) => ({
      teksti: n.textContent?.trim(), laatikko: rectOf(n),
    }));
    const leikkaa = (a, b) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
    const osuneetNimiot = nimiot.filter((n) => leikkaa(r, n.laatikko)).map((n) => n.teksti);
    return {
      laatikko: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.w), h: Math.round(r.h) },
      tausta: tyyli.backgroundImage === 'none' ? tyyli.backgroundColor : tyyli.backgroundImage,
      paallaOnNappiItse: Boolean(paalla === nappi || nappi.contains(paalla)),
      paallaTagi: paalla ? `${paalla.tagName}.${[...paalla.classList].join('.')}` : null,
      nimioidenMaara: nimiot.length,
      nimiot: nimiot.map((n) => n.teksti),
      osuneetNimiot,
    };
  })();

  const lapinakyva = (arvo) => /rgba\([^)]*,\s*0\)/.test(String(arvo))
    || String(arvo) === 'transparent' || String(arvo) === 'none';

  const MAAT_C = [
    { nimi: 'Kreikka (Ateena, Kreetanmeri)', kaupunki: 'ateena' },
    { nimi: 'Ranska (Pariisi)', kaupunki: 'pariisi' },
    { nimi: 'Italia (Rooma)', kaupunki: 'rooma' },
  ];

  for (const maa of MAAT_C) {
    const { ctx, sivu, auki } = await avaaPalloSivu(
      { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2 }, maa.kaupunki,
    );
    if (!auki) {
      console.log(`OHITUS  (c) ${maa.nimi}: pallolauta ei ehtinyt avautua`);
      await ctx.close();
      continue;
    }
    const liiku = await sivu.evaluate(mittaaLiikuJaNimiot);
    tieto(`(c) Liiku iPadilla — ${maa.nimi}`, JSON.stringify(liiku));
    vaadi(`(c) ${maa.nimi}: Liiku-napin tausta on läpinäkyvä (alpha 0)`,
      Boolean(liiku) && lapinakyva(liiku.tausta), JSON.stringify(liiku?.tausta));
    vaadi(`(c) ${maa.nimi}: Liiku-napin suorakulmio ei leikkaa yhdenkään kartan nimiön suorakulmiota`,
      Boolean(liiku) && liiku.osuneetNimiot.length === 0, JSON.stringify(liiku));
    vaadi(`(c) ${maa.nimi}: Liiku-napin keskipisteestä osutaan nappiin itseensä`,
      Boolean(liiku) && liiku.paallaOnNappiItse === true, JSON.stringify(liiku));
    if (KUVAKANSIO) {
      await sivu.screenshot({
        path: join(KUVAKANSIO, `c-liiku-ipad-${maa.kaupunki}.png`),
        timeout: 10000,
      }).catch(() => {});
    }
    await ctx.close();
  }
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
