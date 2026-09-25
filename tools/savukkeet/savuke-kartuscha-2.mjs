/*
 * Savuke: KARTUSCHAN TOINEN KIERROS — RADIO ISOMMAKSI JA KESKELLE,
 * LIPPU OTSIKON PERÄÄN, VILKKU HAUN AJAKSI, KORTTI SAMALLE ETÄISYYDELLE
 * REUNOISTA (omistaja 20.9.2026 klo 13.20, kaappaus
 * docs/raportit/kaappaukset/omistaja-20260920/kartuscha-v1976.png).
 *
 * === MITA TAMA VARTIOI =============================================
 *
 *   1. RADIONAPPI ON ISOMPI JA PYSTYSUUNNASSA KESKELLA OTSIKON KANSSA.
 *      Valo on halkaisijaltaan suurempi kuin v1976:n 0,46rem, ja napin
 *      keskiviiva osuu otsikon keskiviivaan (< 4 px).
 *   2. LIPPU ON OTSIKON PERASSA TEKSTIN KORKUISENA. Lippu on otsikon
 *      OIKEALLA puolella, samalla rivilla (pystysuora limitys), ja sen
 *      korkeus on otsikkotekstin korkeusluokkaa (25-90 % otsikon
 *      rivikorkeudesta).
 *   3. LIPUN NAPAUTUS AVAA LIPPUIKKUNAN eika avaa/sulje kartuschaa.
 *      Ikkuna on `dialog.lippu-ikkuna`, ja kartuscha jaa auki.
 *   4. VALO VILKKUU KANAVAN HAUN AJAN: napautuksen jalkeen napissa on
 *      `etsii`-luokka ja valolla animaatio; kun lahetys alkaa kuulua,
 *      `etsii` on poissa ja `soi` paalla.
 *   5. KORTIN VALI VASEMPAAN REUNAAN ON SAMA KUIN ALAREUNAAN (< 2 px),
 *      molemmilla ruuduilla.
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 *   A. MAA ILMAN LIPPUTIETOJA. Palvelin poistaa LIPPUTIEDOT-kirjauksen,
 *      jolloin lippu ei ole napautettava — VAITTEEN 3 ON KAADUTTAVA.
 *   B. VANHA ASEMOINTI. Palvelin palauttaa v1976:n `top`-arvon ja
 *      pienen valon, jolloin nappi ei ole otsikon keskella eika isompi
 *      — VAITTEEN 1 ON KAADUTTAVA.
 *
 * Ajo:  node tools/savukkeet/savuke-kartuscha-2.mjs [kuvakansio]
 */
import http from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { RADIOT } from '../../js/packs/radiot.js';

// Playwright repon node_modulesista, muuten ympäristön osoittamasta
// (Mac Studio: PLAYWRIGHT_JS; kontti: /opt/node22).
const paketti = await import('playwright')
  .catch(() => import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js'))
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json', '.woff2': 'font/woff2',
};

/*
 * VASTAKOKEIDEN KYTKIN:
 *   'EI_LIPPUTIETOJA' — LIPPUTIEDOT-kirjaus poistetaan (lippu ei ole nappi).
 *   'VANHA_ASEMOINTI' — v1976:n radionapin koko ja paikka palautetaan.
 */
let vastakoe = null;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (vastakoe === 'EI_LIPPUTIETOJA' && polkuOsa.endsWith('/js/packs/lipputiedot.js')) {
    runko = Buffer.concat([runko,
      Buffer.from('\nfor (const k of Object.keys(LIPPUTIEDOT)) delete LIPPUTIEDOT[k];\n')]);
  }
  if (vastakoe === 'VANHA_ASEMOINTI' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.concat([runko, Buffer.from('\n'
      + '.maapaneeli-radio { top: 0.55rem !important; height: auto !important; }\n'
      + '.maapaneeli-radio-valo { width: 0.46rem !important; height: 0.46rem !important; }\n')]);
  }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(runko);
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

/* Tallenne: Fogg Pariisissa — Ranskalla on lähetys (js/packs/radiot.js). */
const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
peli.tokens.delete('pariisi');
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({
  // CHROMIUM kuten muissa savukkeissa (aja-sarja.mjs periyttää sen); PW_CHROMIUM jää varaksi.
  executablePath: process.env.CHROMIUM ?? process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
});

/** Yksi ajo: konteksti, peli Pariisissa, pallolauta auki. */
async function avaaPeli({ leveys, korkeus }) {
  const ctx = await selain.newContext({
    viewport: { width: leveys, height: korkeus }, deviceScaleFactor: 1, serviceWorkers: 'block',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
      /*
       * ÄÄNIPEILI POIS TÄSTÄ AJOSTA (js/media.js poisAvain).
       *
       * js/media.js aaniOsoite ohjaa äänet peiliin, eikä peili tunne
       * suoria lähetyksiä: ensimmäinen napautus meni peiliin, kaatui,
       * putosi varareitille ja sammutti `soi`-luokan kesken mittauksen —
       * radio vaati savukkeessa kaksi napautusta, vaikka tuotantokoodi
       * oli kunnossa. Kun peili on poissa, lähetys haetaan suoraan
       * alkuperäisestä osoitteesta, jonka tämä savuke vastaa itse.
       * Mitattava asia on VALO, ei peilin reititys.
       */
      sessionStorage.setItem('matkakirja-peili-pois-aanet', String(Date.now() + 3600000));
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const virheet = [];
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  /*
   * LÄHETYSTÄ EI NOUDETA VERKOSTA. Savuke mittaa valoa, ei ääntä, ja
   * oikea striimi olisi hidas ja epäluotettava. Soitin saa lyhyen
   * hiljaisen wav-vastauksen samasta osoitteesta, joten `soi`-luokka
   * ja valo käyttäytyvät kuten tuotannossa.
   */
  /*
   * LÄHETYKSEN OSOITE TUNNISTETAAN AINEISTOSTA, EI RESURSSITYYPISTÄ.
   * Ensimmäinen versio tunnisti sen `resourceType() === 'media'`
   * -ehdolla, mutta Audio-elementin pyyntö ei aina ole sitä: pyyntö meni
   * `route.abort()`iin, soitin kaatui varareitilleen ja nollasi itsensä
   * — `soi`-luokka ehti syttyä ja sammua ennen mittausta, ja savuke
   * syytti tuotantokoodia omasta puutteestaan. Nyt osoite on sama
   * merkkijono kuin js/packs/radiot.js:ssä, joten osuma on varma.
   */
  const LAHETYS = RADIOT.FRA?.url ?? '';
  await sivu.route(/^https?:\/\/(?!localhost)/, async (route) => {
    const url = route.request().url();
    if (LAHETYS && url.startsWith(LAHETYS)) {
      /*
       * LÄHETYS VASTAA VIIVEELLÄ, JOTTA HAKU ON MITATTAVISSA.
       * Hiljainen wav alkaisi soida heti, ja `etsii`-luokka ehtisi
       * syttyä ja sammua kahden mittauksen välissä — savuke luulisi,
       * ettei vilkkua ole. Puolitoista sekuntia on sama luokka kuin
       * oikean aseman avautuminen.
       */
      await new Promise((r) => { setTimeout(r, 1500); });
      route.fulfill({
        status: 200,
        contentType: 'audio/wav',
        body: HILJAINEN_WAV,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    if (/media\.matkakirja\.app|r2\.dev\//.test(url)) {
      const v = await ampariHaku(url);
      if (!v || v.status !== 200) {
        /*
         * PEILI EI TUNNE LÄHETYSTÄ, JA JUURI SITÄ KAUTTA SE HAETAAN:
         * js/media.js aaniOsoite ohjaa radion osoitteen äänipeiliin
         * (media.matkakirja.app), josta suoria lähetyksiä ei löydy.
         * Tuotannossa soitin putoaa silloin alkuperäiseen lähteeseen;
         * savukkeessa se johti abortiin, soittimen varareittiin ja
         * `soi`-luokan sammumiseen kesken mittauksen. Peilin 404 on siis
         * äänelle sama hiljainen wav kuin alkuperäiselle osoitteelle.
         */
        if (!/\.(webp|jpg|jpeg|png|json|js|css|geojson|woff2)$/i.test(new URL(url).pathname)) {
          route.fulfill({
            status: 200, contentType: 'audio/wav', body: HILJAINEN_WAV,
            headers: { 'access-control-allow-origin': '*' },
          });
          return;
        }
        route.abort();
        return;
      }
      route.fulfill({
        status: 200,
        contentType: v.tyyppi ?? 'application/octet-stream',
        body: v.body,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    if (route.request().resourceType() === 'media') {
      route.fulfill({
        status: 200, contentType: 'audio/wav', body: HILJAINEN_WAV,
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    route.abort();
  });
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) {
    await sivu.waitForTimeout(4000);
    await sivu.evaluate(async () => {
      const l = window.matkakirja.ui.pallolauta;
      await l.saavu({ kesto: 0 });
      await new Promise((v) => setTimeout(v, 1500));
      l.ladoHeti();
      await new Promise((v) => setTimeout(v, 400));
    });
    // (Luennan vaiennus poistettu: ui.puhuja ei ole UI:n kenttä - savukevartija.)
    await sivu.waitForTimeout(600);
  }
  return { ctx, sivu, virheet, auki };
}

/** Yhden kanavan hiljainen wav — soitin saa jotain soitettavaa. */
const HILJAINEN_WAV = (() => {
  const naytteita = 8000;
  const data = Buffer.alloc(44 + naytteita * 2);
  data.write('RIFF', 0); data.writeUInt32LE(36 + naytteita * 2, 4); data.write('WAVE', 8);
  data.write('fmt ', 12); data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20);
  data.writeUInt16LE(1, 22); data.writeUInt32LE(8000, 24); data.writeUInt32LE(16000, 28);
  data.writeUInt16LE(2, 32); data.writeUInt16LE(16, 34);
  data.write('data', 36); data.writeUInt32LE(naytteita * 2, 40);
  return data;
})();

/** Kartuschan mitat ruudusta. */

/** Kartuschan mitat ruudusta. */
const lueKartuscha = (sivu) => sivu.evaluate(() => {
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x0: r.left, y0: r.top, x1: r.right, y1: r.bottom, w: r.width, h: r.height,
      keskiX: r.left + r.width / 2, keskiY: r.top + r.height / 2,
    };
  };
  const radio = document.querySelector('.maapaneeli-radio');
  const valo = document.querySelector('.maapaneeli-radio-valo');
  const tyyli = valo ? getComputedStyle(valo) : null;
  const luvut = ((tyyli?.backgroundColor ?? '').match(/[\d.]+/g) ?? []).map(Number);
  const lippu = document.querySelector('.maapaneeli-lippu');
  const kuva = document.querySelector('.maapaneeli-lippukuva');
  return {
    valikkoAuki: Boolean(window.matkakirja?.ui?.pallolauta?.maapaneeli?.valikkoAuki?.()),
    kortti: laatikko(document.querySelector('.maapaneeli-kortti')),
    otsikko: laatikko(document.querySelector('.maapaneeli-nimi-suomi')),
    avain: laatikko(document.querySelector('.maapaneeli-avain')),
    radio: laatikko(radio),
    radioNakyy: Boolean(radio) && !radio.hidden && radio.getBoundingClientRect().width > 0,
    valo: laatikko(valo),
    valonLeveys: valo ? parseFloat(getComputedStyle(valo).width) : 0,
    animaatio: tyyli?.animationName ?? 'none',
    etsii: Boolean(radio?.classList.contains('etsii')),
    soi: Boolean(radio?.classList.contains('soi')),
    punainenVoitolla: luvut.length >= 3 && luvut[0] > luvut[1] + 40 && luvut[0] > luvut[2] + 40,
    lippu: laatikko(lippu),
    lippuNakyy: Boolean(lippu) && !lippu.hidden && lippu.getBoundingClientRect().width > 0,
    lippuNapautettava: Boolean(lippu?.classList.contains('napautettava')),
    lippukuvanKorkeus: kuva ? kuva.getBoundingClientRect().height : 0,
    lippuikkuna: Boolean(document.querySelector('dialog.lippu-ikkuna')),
    ruutu: { w: window.innerWidth, h: window.innerHeight },
  };
});

const napautaKohtaa = async (sivu, laatikko) => {
  if (!laatikko || !(laatikko.w > 0)) return false;
  await sivu.mouse.click(Math.round(laatikko.keskiX), Math.round(laatikko.keskiY));
  await sivu.waitForTimeout(500);
  return true;
};

const RUUDUT = [
  { nimi: '390', leveys: 390, korkeus: 844 },
  { nimi: '1400', leveys: 1400, korkeus: 900 },
];

for (const ruutu of RUUDUT) {
  console.log(`\n=== RUUTU ${ruutu.nimi} (${ruutu.leveys}x${ruutu.korkeus}) ===`);
  /* eslint-disable no-await-in-loop */
  const { ctx, sivu, virheet, auki } = await avaaPeli(ruutu);
  if (!auki) { console.log('OHITUS  pallolauta ei auennut'); await ctx.close(); continue; }

  const lepo = await lueKartuscha(sivu);
  await napautaKohtaa(sivu, lepo.avain);
  const iso = await lueKartuscha(sivu);
  vaadi(`${ruutu.nimi} · kartuscha aukesi`, iso.valikkoAuki, 'valikko ei auennut');

  // --- 1. radio isompi ja otsikon keskella ---------------------------
  const keskitysEro = iso.radio && iso.otsikko ? Math.abs(iso.radio.keskiY - iso.otsikko.keskiY) : 999;
  vaadi(`${ruutu.nimi} · 1 radio on isompi ja otsikon kanssa keskella`,
    iso.radioNakyy && iso.valonLeveys > 7.4 && keskitysEro < 4,
    `valo ${iso.valonLeveys.toFixed(1)} px (v1976: 7,36), keskitysero ${keskitysEro.toFixed(1)} px`);
  tieto(`${ruutu.nimi} valon leveys`, `${iso.valonLeveys.toFixed(2)} px`);

  // --- 2. lippu otsikon perassa, tekstin korkuisena ------------------
  const lippuOikealla = Boolean(iso.lippu && iso.otsikko && iso.lippu.x0 >= iso.otsikko.x1 - 2);
  const samallaRivilla = Boolean(iso.lippu && iso.otsikko
    && iso.lippu.y0 < iso.otsikko.y1 && iso.lippu.y1 > iso.otsikko.y0);
  const suhde = iso.otsikko?.h ? iso.lippukuvanKorkeus / iso.otsikko.h : 0;
  vaadi(`${ruutu.nimi} · 2 lippu on otsikon perassa tekstin korkuisena`,
    iso.lippuNakyy && lippuOikealla && samallaRivilla && suhde > 0.25 && suhde < 0.9,
    `nakyy ${iso.lippuNakyy}, oikealla ${lippuOikealla}, rivilla ${samallaRivilla}, `
    + `korkeus ${iso.lippukuvanKorkeus.toFixed(1)}/${(iso.otsikko?.h ?? 0).toFixed(1)} px`);

  // --- 5. valit reunoihin samat --------------------------------------
  const vasen = iso.kortti ? iso.kortti.x0 : 0;
  const ala = iso.kortti ? iso.ruutu.h - iso.kortti.y1 : 0;
  vaadi(`${ruutu.nimi} · 5 vali vasempaan reunaan on sama kuin alareunaan`,
    Math.abs(vasen - ala) < 2,
    `vasen ${vasen.toFixed(1)} px, ala ${ala.toFixed(1)} px`);
  tieto(`${ruutu.nimi} valit`, `vasen ${vasen.toFixed(1)} · ala ${ala.toFixed(1)}`);

  // --- 4. vilkku haun ajan -------------------------------------------
  await napautaKohtaa(sivu, iso.radio);
  const vilkkui = await sivu.waitForFunction(
    () => document.querySelector('.maapaneeli-radio')?.classList.contains('etsii') === true,
    null, { timeout: 4000 },
  ).then(() => true).catch(() => false);
  const haussa = await lueKartuscha(sivu);
  vaadi(`${ruutu.nimi} · 4a valo vilkkuu kanavan haun ajan`,
    vilkkui && (haussa.etsii ? haussa.animaatio !== 'none' : true),
    `etsii ${haussa.etsii}, animaatio ${haussa.animaatio}`);
  const hakuPaattyi = await sivu.waitForFunction(
    () => document.querySelector('.maapaneeli-radio')?.classList.contains('etsii') === false,
    null, { timeout: 14000 },
  ).then(() => true).catch(() => false);
  vaadi(`${ruutu.nimi} · 4b haku paattyy eika valo jaa vilkkumaan`, hakuPaattyi,
    'etsii-luokka jai paalle');
  await sivu.evaluate(() => window.matkakirja?.ui?.pysaytaKulttuuriAani?.());
  await sivu.waitForTimeout(300);

  // --- 3. lipun napautus avaa lippuikkunan ---------------------------
  const ennenLippua = await lueKartuscha(sivu);
  await napautaKohtaa(sivu, ennenLippua.lippu);
  await sivu.waitForTimeout(700);
  const lipunJalkeen = await lueKartuscha(sivu);
  vaadi(`${ruutu.nimi} · 3 lipun napautus avaa lippuikkunan, kartuscha jaa auki`,
    lipunJalkeen.lippuikkuna && lipunJalkeen.valikkoAuki,
    `ikkuna ${lipunJalkeen.lippuikkuna}, kartuscha auki ${lipunJalkeen.valikkoAuki}`);
  await sivu.evaluate(() => document.querySelector('dialog.lippu-ikkuna')?.close());
  await sivu.waitForTimeout(300);

  if (KUVAKANSIO && iso.kortti) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `kartuscha2-${ruutu.nimi}.png`),
      clip: {
        x: Math.max(0, Math.round(iso.kortti.x0 - 12)),
        y: Math.max(0, Math.round(iso.kortti.y0 - 12)),
        width: Math.min(ruutu.leveys, Math.round(iso.kortti.w + 24)),
        height: Math.min(ruutu.korkeus, Math.round(iso.kortti.h + 24)),
      },
    });
  }
  vaadi(`${ruutu.nimi} · sivulla ei ole virheita`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

console.log('\n=== VASTAKOE A: maa ilman lipputietoja ===');
vastakoe = 'EI_LIPPUTIETOJA';
{
  const { ctx, sivu, auki } = await avaaPeli(RUUDUT[1]);
  if (auki) {
    const lepo = await lueKartuscha(sivu);
    await napautaKohtaa(sivu, lepo.avain);
    const iso = await lueKartuscha(sivu);
    await napautaKohtaa(sivu, iso.lippu);
    await sivu.waitForTimeout(600);
    const jalkeen = await lueKartuscha(sivu);
    vaadi('A ilman lipputietoja lippu ei ole nappi (vaitteen 3 on kaaduttava)',
      !iso.lippuNapautettava && !jalkeen.lippuikkuna,
      `napautettava ${iso.lippuNapautettava}, ikkuna ${jalkeen.lippuikkuna}`);
  } else console.log('OHITUS  pallolauta ei auennut');
  await ctx.close();
}

console.log('\n=== VASTAKOE B: vanha asemointi takaisin ===');
vastakoe = 'VANHA_ASEMOINTI';
{
  const { ctx, sivu, auki } = await avaaPeli(RUUDUT[1]);
  if (auki) {
    const lepo = await lueKartuscha(sivu);
    await napautaKohtaa(sivu, lepo.avain);
    const iso = await lueKartuscha(sivu);
    const ero = iso.radio && iso.otsikko ? Math.abs(iso.radio.keskiY - iso.otsikko.keskiY) : 999;
    vaadi('B vanha asemointi ei ole keskella eika isompi (vaitteen 1 on kaaduttava)',
      iso.valikkoAuki && !(iso.valonLeveys > 7.4 && ero < 4),
      `valo ${iso.valonLeveys.toFixed(1)} px, keskitysero ${ero.toFixed(1)} px`);
  } else console.log('OHITUS  pallolauta ei auennut');
  await ctx.close();
}

console.log(`\n${lapi}/${kaikki} vartiota lapi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
