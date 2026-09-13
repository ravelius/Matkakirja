/*
 * Savuke: AARRE ON VIHREÄ PISTE, JONKA KAKSI NOSTOTEHTÄVÄÄ AVAA.
 *
 * Karttauudistuksen erä 7 (suunnitelma docs/raportit/
 * karttauudistus-suunnitelma-pallo-20260913.md luku 3.6; Raamattu
 * KARTTAUUDISTUS, omistaja 13.9.2026 sanatarkasti: *"Aarretehtava voi
 * olla jatkossa suoraan kartalla nakyvissa vihreana pisteena ja sita
 * voi heti yrittaa, kunhan on ratkaissut vahintaan kaksi mita tahansa
 * mini tehtavaa nostoissa."*).
 *
 * Piste (js/fokuspiste.js, pallolla js/pallolauta/nostot.js) on nyt
 * kartalla alusta asti. Lukittuna se on himmeä eikä tuiki, ja napautus
 * kertoo mitä puuttuu; kahdesta ratkaistusta noston minikysymyksestä
 * (game.nostotehtavatRatkaistu, erä 6) se syttyy ja avaa kohtaamisen.
 *
 * ── VARTIOT ───────────────────────────────────────────────────────
 *
 *   0. DATA. Pariisilla on kohtaamispiste maailmankartan laudalle ja
 *      lehden aarteen avaava tehtävä, jonka avaimella vanha tallennus
 *      rakennetaan (vartio 5).
 *   1. NOLLA TEHTÄVÄÄ → PISTE KARTALLA MUTTA LUKOSSA. Merkki on
 *      pallolla, sillä on lukkoluokka, ja ruudunlukijan lappu kertoo
 *      lukosta.
 *   2. LUKITUN PISTEEN NAPAUTUS EI AVAA KOHTAAMISTA vaan näyttää
 *      pulun kuplan.
 *   3. YKSI TEHTÄVÄ EI RIITÄ (VASTAKOE). Sama ajo yhdellä ratkaistulla
 *      tehtävällä: piste on yhä lukossa.
 *   4. KAKSI TEHTÄVÄÄ SYTYTTÄÄ PISTEEN. Lukkoluokka poistuu, lappu
 *      lupaa kohtaamisen ja napautus avaa kohtaamiskortin.
 *   5. VANHA TALLENNUS EI JUMITU. Laskuri 0, mutta aarre on avattu
 *      lehden kysymyksellä (minitehtavatOikein) → piste on auki. Uusi
 *      ehto ja vanha lehtipalkintoehto ovat TAI-ehto.
 *   6. PULUN OHJE KERRAN. Lukitussa kaupungissa pulu kertoo ohjeen ja
 *      tallennuksen lippu kääntyy; lipullisella tallennuksella kuplaa
 *      ei tule uudelleen.
 *
 * MIKSI PARIISI. Kaupungilla on kohtaamispiste molemmille laudoille
 * (js/packs/fokusvirta-pariisi.js) ja erän 6 pilottikysymys, joten
 * sama kaupunki mittaa koko ketjun. Laskuri asetetaan tallennukseen
 * suoraan: erän 6 savuke (savuke-nostovisa.mjs) mittaa sen kasvun,
 * tämä savuke mittaa sen SEURAUKSEN.
 *
 * ÄMPÄRI KULKEE NODEN KAUTTA (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aarrepiste.mjs [kuvakansio]
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUSVIRTA_PARIISI } from '../../js/packs/fokusvirta-pariisi.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

/** Kynnys on koodin vakio (js/fokusvirta.js NOSTOTEHTAVIA_AARREPISTEESEEN). */
const KYNNYS = 2;
/** Näkymä: Pariisi lähikuvassa, jotta kohtaamispiste on ladonnassa. */
const PARIISI = { lat: 48.8566, lng: 2.3522, alt: 0.09 };
/** Lehden aarteen avaava tehtävä (palkinto ei ole juliste). */
const AARRETEHTAVA = (FOKUSVIRTA_PARIISI.lehtitehtavat ?? [])
  .find((t) => t.palkinto !== 'juliste');
/** Vanhan tallennuksen avain (js/fokustehtavat.js tehtavanAvain). */
const VANHA_AVAIN = `maailmankartta:pariisi:fokus:${AARRETEHTAVA?.id}`;

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

/* ---------- Tallenne: Fogg Pariisissa, laskuri halutussa arvossa ---------- */
function tallenne({ ratkaistu = 0, vanhaAarre = false, ohjeNahty = false } = {}) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'pariisi' }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  /*
   * LAATTA JÄÄ PAIKALLEEN. `tokens.has(city.id)` on juuri se mitta,
   * jolla peli tietää aarteen olevan yhä löytämättä (js/fokusvirta.js
   * fokusvirtaLukitseeLehden) — käännetyn laatan kaupungissa pistettä
   * ei kuulu ollakaan. Savuke ei siis poista Pariisin laattaa.
   */
  peli.nostotehtavatRatkaistu = ratkaistu;
  peli.aarrepisteOhjeNahty = ohjeNahty;
  // Pulu on löydetty, jotta ohjekuplalla on nappi, johon osoittaa.
  peli.polloLoydetty = true;
  // Vanha tallennus: aarre avattiin aikanaan lehden kysymyksellä.
  if (vanhaAarre) peli.minitehtavatOikein.add(VANHA_AVAIN);
  return JSON.stringify(peli.toJSON());
}

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/** Yksi selainkonteksti valmiiksi ladattuna Pariisin palloon. */
async function avaaPeli(data) {
  const ctx = await selain.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, serviceWorkers: 'block',
  });
  await ctx.addInitScript((d) => {
    try {
      localStorage.setItem('matkakirja-save-v1', d);
      localStorage.removeItem('matkakirja-lauta');
      localStorage.setItem('matkakirja-kehittaja', '1');
    } catch { /* yksityinen tila */ }
  }, data);
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
  await sivu.goto(`${osoite}?lauta=pallo`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 90000 });
  const auki = await sivu
    .waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 60000 })
    .then(() => true).catch(() => false);
  if (auki) await sivu.waitForTimeout(3500);
  return { ctx, sivu, auki, virheet };
}

/** Kamera Pariisiin ja ladonta heti, jotta piste on merkeissä. */
const asetaNakyma = (sivu) => sivu.evaluate(async (n) => {
  const l = window.matkakirja.ui.pallolauta;
  l.pallo.pointOfView({ lat: n.lat, lng: n.lng, altitude: n.alt }, 0);
  await new Promise((v) => setTimeout(v, 1600));
  l.ladoHeti();
  await new Promise((v) => setTimeout(v, 500));
}, PARIISI);

/** Pisteen tila: koneen ehto, pallon merkki ja tasokartan merkki. */
const pisteenTila = (sivu) => sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const city = ui.game.cityOf();
  const {
    fokusvirtaKohtaamispiste, fokusAarrepisteAuki, fokusvirtaKohtaaminenPisteessa,
    fokusvirtaLukitseeLehden, fokusvirtaSisalto,
  } = await import('/js/fokusvirta.js');
  const piste = fokusvirtaKohtaamispiste(ui, city);
  const pallomerkki = document.querySelector('.pallolauta-piste');
  const karttamerkki = document.querySelector('.fokuspisteet .fokuspiste');
  return {
    kaupunki: city?.id ?? null,
    sisalto: Boolean(fokusvirtaSisalto(ui, city)),
    lukitsee: fokusvirtaLukitseeLehden(ui, city),
    pisteessa: fokusvirtaKohtaaminenPisteessa(ui, city),
    onPiste: Boolean(piste),
    lukittu: piste?.lukittu ?? null,
    teko: piste?.teko ?? '',
    auki: fokusAarrepisteAuki(ui, city),
    laskuri: ui.game.nostotehtavatRatkaistu,
    pallolla: Boolean(pallomerkki),
    palloLukossa: Boolean(pallomerkki?.classList.contains('lukittu')),
    palloKuvioLukossa: Boolean(
      pallomerkki?.querySelector('.fokuspiste')?.classList.contains('fokuspiste-lukittu'),
    ),
    palloLappu: pallomerkki?.getAttribute('aria-label') ?? '',
    kartalla: Boolean(karttamerkki),
    karttaLukossa: Boolean(karttamerkki?.classList.contains('fokuspiste-lukittu')),
  };
});

/** Napauta pistettä samasta portista, jota molemmat laudat käyttävät. */
const napauta = (sivu) => sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const { avaaFokuspiste } = await import('/js/fokuspiste.js');
  for (const k of document.querySelectorAll('.pollo-vihje')) k.remove();
  const avasi = avaaFokuspiste(ui, ui.game.cityOf());
  /*
   * AUENNUT PISTE AVAA LAATTAKYSYMYKSEN SUORAAN (js/fokusvirta.js
   * avaaFokusKohtaaminen, KORTIT POIS 2.9.2026): pinta on pelin oma
   * visalaatikko #quiz-dialog, ei fokusvirran kortti. Kutsu kulkee
   * ui.doActionin läpi, joten se tarvitsee hetken.
   */
  for (let i = 0; i < 20 && !document.getElementById('quiz-dialog')?.open; i += 1) {
    await new Promise((v) => setTimeout(v, 300));
  }
  const kupla = [...document.querySelectorAll('.pollo-vihje')]
    .find((k) => !k.hidden && (k.textContent ?? '').trim());
  return {
    avasi,
    kortti: Boolean(document.getElementById('quiz-dialog')?.open),
    kupla: (kupla?.textContent ?? '').trim(),
  };
});

/**
 * Odota pulun ohjekuplaa (viive js/fokusvirta.js
 * AARREPISTEEN_OHJE_VIIVE_MS). Kuplia voi olla muitakin — saapuminen
 * puhuu omansa — joten haku on TEKSTILLÄ eikä ensimmäisellä kuplalla.
 */
const odotaOhje = (sivu) => sivu.evaluate(async (tunniste) => {
  for (let i = 0; i < 30; i += 1) {
    const kupla = [...document.querySelectorAll('.pollo-vihje')]
      .find((k) => !k.hidden && (k.textContent ?? '').includes(tunniste));
    const teksti = (kupla?.textContent ?? '').trim();
    if (teksti) return { teksti, lippu: window.matkakirja.game.aarrepisteOhjeNahty };
    await new Promise((v) => setTimeout(v, 400));
  }
  return { teksti: '', lippu: window.matkakirja.game.aarrepisteOhjeNahty };
}, 'Löytämällä kartalta');

/* ---------- VARTIO 0: DATA (ei tarvitse selainta) ---------- */
const paikka = FOKUSVIRTA_PARIISI.kohtaamispiste?.laudat?.maailmankartta;
tieto('Pariisin kohtaamispiste', `${FOKUSVIRTA_PARIISI.kohtaamispiste?.nimi} `
  + `(${paikka?.x}, ${paikka?.y})`);
tieto('vanhan tallennuksen avain', VANHA_AVAIN);
vaadi('0. data: kohtaamispiste ja lehden aarteen avaava tehtävä ovat olemassa',
  Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y) && Boolean(AARRETEHTAVA),
  `paikka ${JSON.stringify(paikka)}, tehtävä ${AARRETEHTAVA?.id}`);

/* ---------- AJO A: NOLLA RATKAISTUA TEHTÄVÄÄ ---------- */
const a = await avaaPeli(tallenne({ ratkaistu: 0 }));
vaadi('pallolauta aukesi (0 tehtävää)', a.auki, a.virheet.join(' | '));
if (a.auki) {
  await asetaNakyma(a.sivu);
  const tila = await pisteenTila(a.sivu);
  tieto('0 tehtävää', `piste ${tila.onPiste}, lukittu ${tila.lukittu}, `
    + `pallolla ${tila.pallolla} (lukko ${tila.palloLukossa}), kartalla ${tila.kartalla}`);
  tieto('lukitun pisteen lappu', `"${tila.palloLappu}"`);
  vaadi('1. 0 tehtävää: piste on kartalla mutta lukossa',
    tila.onPiste && tila.lukittu === true && tila.auki === false
      && tila.pallolla && tila.palloLukossa && tila.palloKuvioLukossa,
    JSON.stringify(tila));

  if (KUVAKANSIO) {
    // scale: 'css' pitää kuvan raportin katossa (≤ 400 kt): 390 × 844
    // pikseliä eikä deviceScaleFactorin kaksinkertaista ruutua.
    await a.sivu.screenshot({
      path: join(KUVAKANSIO, 'karttauudistus-7-piste-lukossa.png'), scale: 'css',
    });
  }

  /*
   * OHJE ENNEN NAPAUTUSTA: se tulee itsestään viiveellä, ja napautus
   * veisi kuplapaikan lukkoviestille (sama pulun kupla).
   */
  const ohje = await odotaOhje(a.sivu);
  tieto('pulun ohje (lippu tallennuksessa oli false)', `"${ohje.teksti}" — lippu ${ohje.lippu}`);
  vaadi('6a. pulu kertoo ohjeen kerran ja lippu kääntyy',
    ohje.teksti.includes('Löytämällä kartalta kaksi kysymystä') && ohje.lippu === true,
    JSON.stringify(ohje));

  const napautus = await napauta(a.sivu);
  tieto('lukitun pisteen napautus', `avasi ${napautus.avasi}, kortti ${napautus.kortti}, `
    + `kupla "${napautus.kupla}"`);
  vaadi('2. lukitun pisteen napautus ei avaa kohtaamista vaan kertoo lukosta',
    napautus.avasi === false && !napautus.kortti && napautus.kupla.includes('kaksi kysymystä'),
    JSON.stringify(napautus));
  await a.ctx.close();
} else {
  await a.ctx.close();
}

/* ---------- AJO B (VASTAKOE): YKSI RATKAISTU TEHTÄVÄ ---------- */
const b = await avaaPeli(tallenne({ ratkaistu: 1 }));
vaadi('pallolauta aukesi (1 tehtävä)', b.auki, b.virheet.join(' | '));
if (b.auki) {
  await asetaNakyma(b.sivu);
  const tila = await pisteenTila(b.sivu);
  tieto('1 tehtävä', `laskuri ${tila.laskuri}, lukittu ${tila.lukittu}, auki ${tila.auki}`);
  vaadi('3. yksi tehtävä ei sytytä pistettä (VASTAKOE)',
    tila.onPiste && tila.lukittu === true && tila.auki === false && tila.palloLukossa,
    JSON.stringify(tila));
  await b.ctx.close();
} else {
  await b.ctx.close();
}

/* ---------- AJO C: KAKSI RATKAISTUA TEHTÄVÄÄ ---------- */
const c = await avaaPeli(tallenne({ ratkaistu: KYNNYS }));
vaadi('pallolauta aukesi (2 tehtävää)', c.auki, c.virheet.join(' | '));
if (c.auki) {
  await asetaNakyma(c.sivu);
  const tila = await pisteenTila(c.sivu);
  tieto('2 tehtävää', `laskuri ${tila.laskuri}, lukittu ${tila.lukittu}, auki ${tila.auki}, `
    + `pallolla ${tila.pallolla} (lukko ${tila.palloLukossa})`);
  tieto('auenneen pisteen lappu', `"${tila.palloLappu}"`);
  if (KUVAKANSIO) {
    await c.sivu.screenshot({
      path: join(KUVAKANSIO, 'karttauudistus-7-piste-auki.png'), scale: 'css',
    });
  }
  const napautus = await napauta(c.sivu);
  tieto('auenneen pisteen napautus', `avasi ${napautus.avasi}, kortti ${napautus.kortti}`);
  vaadi('4. kaksi tehtävää sytyttää pisteen ja napautus avaa kohtaamisen',
    tila.onPiste && tila.lukittu === false && tila.auki === true
      && tila.pallolla && !tila.palloLukossa && !tila.palloKuvioLukossa
      && napautus.avasi === true && napautus.kortti,
    `${JSON.stringify(tila)} / ${JSON.stringify(napautus)}`);
  await c.ctx.close();
} else {
  await c.ctx.close();
}

/* ---------- AJO D: VANHA TALLENNUS (laskuri 0, aarre avattu lehdestä) ---------- */
const d = await avaaPeli(tallenne({ ratkaistu: 0, vanhaAarre: true }));
vaadi('pallolauta aukesi (vanha tallennus)', d.auki, d.virheet.join(' | '));
if (d.auki) {
  await asetaNakyma(d.sivu);
  const tila = await pisteenTila(d.sivu);
  tieto('vanha tallennus', `laskuri ${tila.laskuri}, lukittu ${tila.lukittu}, auki ${tila.auki}`);
  vaadi('5. vanha tallennus: lehden kautta avattu aarre pysyy auki laskurin ollessa 0',
    tila.laskuri === 0 && tila.onPiste && tila.lukittu === false && tila.auki === true,
    JSON.stringify(tila));
  await d.ctx.close();
} else {
  await d.ctx.close();
}

/* ---------- AJO E: OHJE ON JO NÄHTY ---------- */
const e = await avaaPeli(tallenne({ ratkaistu: 0, ohjeNahty: true }));
vaadi('pallolauta aukesi (ohje nähty)', e.auki, e.virheet.join(' | '));
if (e.auki) {
  await asetaNakyma(e.sivu);
  const ohje = await odotaOhje(e.sivu);
  tieto('ohje jo nähty', `kupla "${ohje.teksti}"`);
  vaadi('6b. nähty ohje ei tule toista kertaa',
    ohje.teksti === '' && ohje.lippu === true, JSON.stringify(ohje));
  await e.ctx.close();
} else {
  await e.ctx.close();
}

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
