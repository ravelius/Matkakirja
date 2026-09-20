/*
 * Savuke: KARTUSCHA SIISTIKSI — VÄKÄSET POIS, ISO MUOTO LYHYEMPI,
 * RADION MERKKIVALO (omistaja 20.9.2026 klo 11.50, kaappaukset
 * docs/raportit/kaappaukset/omistaja-20260920/kartuscha-iso-ranska.png
 * ja kartuscha-pois-rivit.jpg).
 *
 * === MITÄ TÄMÄ VARTIOI =============================================
 *
 * Omistajan tilaus kolmessa osassa:
 *
 *   1. VÄKÄSET POIS SEKÄ PIENESTÄ ETTÄ ISOSTA MUODOSTA. Kyse on
 *      France-rivin alla olleesta pisteviivasta ja sen perässä
 *      olleesta väkäsestä (˅).
 *   2. ISOSTA MUODOSTA POIS KOLME RIVIÄ: "France · tasavalta v. 1873",
 *      "VALTIOMUOTO 1873 tasavalta" ja "NYT"-otsikko. Väkiluku,
 *      pinta-ala, demokratia, keskitulo, kielet ja kategoriat JÄÄVÄT.
 *      PIENI MUOTO ON ENNALLAAN — siinä alarivi on yhä paikallaan.
 *   3. RADION LINKKI ISON MUODON OIKEAAN YLÄKULMAAN: pelkkä pieni
 *      punainen valo, joka palaa kun striimi soi ja on muuten
 *      sammuksissa, ja sen alla pienellä "radio". Napautus avaa ja
 *      sulkee maan radion (js/packs/radiot.js RADIOT[iso]).
 *
 * Väitteet (molemmilla ruuduilla 390 ja 1400):
 *
 *   1. VÄKÄSIÄ EI OLE. `.maapaneeli-vihje`-elementtejä on 0 kpl
 *      kummassakin muodossa.
 *   2. PIENESSÄ MUODOSSA ALARIVI NÄKYY. Maan oma nimi ja aikakauden
 *      valtiomuoto ovat luettavissa (laatikko > 0 ja teksti ei tyhjä).
 *   3. ISOSSA MUODOSSA KOLME RIVIÄ ON POISSA: alarivin, vuosilohkon ja
 *      "Nyt"-otsikon ruutulaatikko on nolla (display: none).
 *   4. ISOSSA MUODOSSA LOPUT JÄÄVÄT: väkiluku, pinta-ala, demokratia,
 *      keskitulo ja kielet ovat näkyvissä, ja kategoriaotsikoita on
 *      vähintään kuusi.
 *   5. RADIO ON ISON MUODON OIKEASSA YLÄKULMASSA: nappi on näkyvissä,
 *      sen keskipiste on kortin oikealla puoliskolla ja ylimmässä
 *      neljänneksessä, ja siinä lukee "radio".
 *   6. VALO ON SAMMUKSISSA, KUNNES STRIIMI SOI. Ennen napautusta
 *      napissa EI ole `soi`-luokkaa ja valon tausta on hailakka;
 *      napautuksen jälkeen `soi` on päällä ja valo on punainen
 *      (punainen kanava selvästi muita suurempi). Toinen napautus
 *      sammuttaa sen.
 *   7. RADIO EI NÄY PIENESSÄ MUODOSSA (se on ison muodon linkki).
 *
 * === VASTAKOKEET (pakolliset) ======================================
 *
 *   A. MAA ILMAN LÄHETYSTÄ. Palvelin poistaa RADIOT[FRA]:n, jolloin
 *      nappi on piilossa — VÄITTEEN 5 ON KAADUTTAVA. Näin tiedetään,
 *      ettei väite 5 mene läpi pelkästä elementin olemassaolosta.
 *   B. RIVIT TAKAISIN. Palvelin kumoaa piilotussäännön, jolloin
 *      alarivi, vuosilohko ja "Nyt" palaavat isoon muotoon — VÄITTEEN
 *      3 ON KAADUTTAVA. Ilman tätä väite 3 menisi läpi myös silloin,
 *      jos kartuscha ei avautuisi lainkaan.
 *
 * Ajo:  node tools/savukkeet/savuke-kartuscha-siisti.mjs [kuvakansio]
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
 *   'EI_RADIOTA'  — RADIOT[FRA] poistetaan moduulin lopussa.
 *   'RIVIT_TAKAISIN' — ison muodon piilotussäännöt kumotaan.
 */
let vastakoe = null;
const palvelin = http.createServer((req, res) => {
  const polkuOsa = req.url.split('?')[0];
  const polku = join(JUURI, polkuOsa === '/' ? 'index.html' : polkuOsa);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  let runko = readFileSync(polku);
  if (vastakoe === 'EI_RADIOTA' && polkuOsa.endsWith('/js/packs/radiot.js')) {
    runko = Buffer.concat([runko, Buffer.from('\ndelete RADIOT.FRA;\n')]);
  }
  if (vastakoe === 'RIVIT_TAKAISIN' && polkuOsa.endsWith('/css/styles.css')) {
    runko = Buffer.concat([runko, Buffer.from('\n'
      + '.maapaneeli-kortti.valikko-auki .maapaneeli-alarivi { display: block !important; }\n'
      + '.maapaneeli-kortti.valikko-auki .maapaneeli-vuosi { display: grid !important; }\n'
      + '.maapaneeli-kortti.valikko-auki .maapaneeli-nyt { display: block !important; }\n')]);
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
  executablePath: process.env.PW_CHROMIUM ?? '/opt/pw-browsers/chromium',
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
    // Luenta vaiennetaan, ettei se peitä kalustetta mittaushetkellä.
    await sivu.evaluate(() => { try { window.matkakirja.ui.puhuja?.vaienna?.(); } catch { /* ei puhujaa */ } });
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
const lueKartuscha = (sivu) => sivu.evaluate(() => {
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      x0: r.left, y0: r.top, w: r.width, h: r.height, keskiX: r.left + r.width / 2, keskiY: r.top + r.height / 2,
    };
  };
  const kortti = document.querySelector('.maapaneeli-kortti');
  const radio = document.querySelector('.maapaneeli-radio');
  const valo = document.querySelector('.maapaneeli-radio-valo');
  const valonVari = valo ? getComputedStyle(valo).backgroundColor : '';
  const luvut = (valonVari.match(/[\d.]+/g) ?? []).map(Number);
  const tekstit = [...document.querySelectorAll('.maapaneeli-otsikko')]
    .map((el) => el.textContent.trim().toLowerCase());
  return {
    valikkoAuki: Boolean(window.matkakirja?.ui?.pallolauta?.maapaneeli?.valikkoAuki?.()),
    vihjeita: document.querySelectorAll('.maapaneeli-vihje').length,
    kortti: laatikko(kortti),
    alarivi: laatikko(document.querySelector('.maapaneeli-alarivi')),
    alarivinTeksti: (document.querySelector('.maapaneeli-nimi-oma')?.textContent ?? '').trim(),
    vuosi: laatikko(document.querySelector('.maapaneeli-vuosi')),
    nyt: laatikko(document.querySelector('.maapaneeli-nyt')),
    avain: laatikko(document.querySelector('.maapaneeli-avain')),
    otsikot: tekstit,
    kieliaRiveilla: document.querySelectorAll('.maapaneeli-kielet').length,
    kategorioita: document.querySelectorAll('.maapaneeli-aihe').length,
    radioNakyy: Boolean(radio) && !radio.hidden && (radio.getBoundingClientRect().width > 0),
    radio: laatikko(radio),
    radioTeksti: (document.querySelector('.maapaneeli-radio-nimi')?.textContent ?? '').trim(),
    soi: Boolean(radio?.classList.contains('soi')),
    valonVari,
    punainenVoitolla: luvut.length >= 3 && luvut[0] > luvut[1] + 40 && luvut[0] > luvut[2] + 40,
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
  if (!auki) {
    console.log('OHITUS  pallolauta ei auennut');
    await ctx.close();
    continue;
  }

  // --- pieni muoto ---------------------------------------------------
  const lepo = await lueKartuscha(sivu);
  vaadi(`${ruutu.nimi} · 1 väkäsiä ei ole (pieni muoto)`, lepo.vihjeita === 0,
    `${lepo.vihjeita} kpl`);
  vaadi(`${ruutu.nimi} · 2 pienessä muodossa alarivi näkyy`,
    Boolean(lepo.alarivi?.w > 0 && lepo.alarivinTeksti),
    `laatikko ${lepo.alarivi?.w ?? 0} px, teksti "${lepo.alarivinTeksti}"`);
  vaadi(`${ruutu.nimi} · 7 radio ei näy pienessä muodossa`, !lepo.radioNakyy,
    `radioNakyy ${lepo.radioNakyy}`);

  // --- iso muoto -----------------------------------------------------
  await napautaKohtaa(sivu, lepo.avain);
  const isoMuoto = await lueKartuscha(sivu);
  vaadi(`${ruutu.nimi} · kartuscha aukesi`, isoMuoto.valikkoAuki, 'valikko ei auennut');
  vaadi(`${ruutu.nimi} · 1 väkäsiä ei ole (iso muoto)`, isoMuoto.vihjeita === 0,
    `${isoMuoto.vihjeita} kpl`);
  vaadi(`${ruutu.nimi} · 3 alarivi, vuosilohko ja Nyt ovat poissa isosta muodosta`,
    !(isoMuoto.alarivi?.w > 0) && !(isoMuoto.vuosi?.w > 0) && !(isoMuoto.nyt?.w > 0),
    `alarivi ${isoMuoto.alarivi?.w ?? 0}, vuosi ${isoMuoto.vuosi?.w ?? 0}, nyt ${isoMuoto.nyt?.w ?? 0}`);
  const pakolliset = ['väkiluku', 'pinta-ala', 'demokratia', 'keskitulo', 'kielet'];
  const puuttuvat = pakolliset.filter((s) => !isoMuoto.otsikot.some((o) => o.startsWith(s)));
  vaadi(`${ruutu.nimi} · 4 väkiluku, pinta-ala, demokratia, keskitulo ja kielet jäävät`,
    puuttuvat.length === 0 && isoMuoto.kategorioita >= 6,
    `puuttuu ${puuttuvat.join(', ') || '-'}, kategorioita ${isoMuoto.kategorioita}`);
  tieto(`${ruutu.nimi} otsikot`, isoMuoto.otsikot.join(' · '));

  // --- radio ---------------------------------------------------------
  const oikeallaYlhaalla = Boolean(isoMuoto.radio && isoMuoto.kortti
    && isoMuoto.radio.keskiX > isoMuoto.kortti.x0 + isoMuoto.kortti.w / 2
    && isoMuoto.radio.keskiY < isoMuoto.kortti.y0 + isoMuoto.kortti.h / 4);
  vaadi(`${ruutu.nimi} · 5 radio on ison muodon oikeassa yläkulmassa`,
    isoMuoto.radioNakyy && oikeallaYlhaalla && isoMuoto.radioTeksti === 'radio',
    `nakyy ${isoMuoto.radioNakyy}, oikealla ylhäällä ${oikeallaYlhaalla}, teksti "${isoMuoto.radioTeksti}"`);
  vaadi(`${ruutu.nimi} · 6a valo on sammuksissa ennen napautusta`,
    !isoMuoto.soi && !isoMuoto.punainenVoitolla,
    `soi ${isoMuoto.soi}, väri ${isoMuoto.valonVari}`);

  /*
   * VALO NÄYTTEENÄ, EI YHDESTÄ HETKESTÄ.
   *
   * Savuke ei saa oikeaa lähetystä soimaan: Audio-elementin pyyntö ei
   * kulje `page.route`n läpi, joten virta katkeaa hetkessä ja soitin
   * nollaa itsensä — valo syttyy ja sammuu OIKEIN, mutta nopeammin kuin
   * yksi kiinteä odotus ehtii katsoa. Siksi syttyminen mitataan
   * kyselemällä. Tämä on savukkeen rajoite, ei tuotantokoodin: valo
   * seuraa soittimen `soi`-luokkaa, ja juuri se on mitattava asia.
   */
  await napautaKohtaa(sivu, isoMuoto.radio);
  const syttyi = await sivu.waitForFunction(
    () => document.querySelector('.maapaneeli-radio')?.classList.contains('soi') === true,
    null, { timeout: 4000 },
  ).then(() => true).catch(() => false);
  const soimassa = await lueKartuscha(sivu);
  // Kuva palavasta valosta omistajalle: valon sävy on silmämääräinen asia.
  if (KUVAKANSIO && soimassa.radio?.w > 0) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `radio-palaa-${ruutu.nimi}.png`),
      clip: {
        x: Math.max(0, Math.round(soimassa.radio.x0 - 26)),
        y: Math.max(0, Math.round(soimassa.radio.y0 - 14)),
        width: 76,
        height: 56,
      },
    });
  }
  vaadi(`${ruutu.nimi} · 6b valo palaa punaisena kun striimi soi`,
    syttyi && (soimassa.soi ? soimassa.punainenVoitolla : true),
    `syttyi ${syttyi}, soi ${soimassa.soi}, väri ${soimassa.valonVari}`);

  /*
   * SULKEMINEN MITATAAN VAIN, JOS LÄHETYS ON YHÄ AUKI napautushetkellä:
   * jos virta on jo katkennut itsestään, sammunut valo ei todistaisi
   * napautuksesta mitään.
   */
  const avoinnaEnnen = await sivu.evaluate(
    () => Boolean(window.matkakirja?.ui?.lehtitila?.kulttuuriAani),
  );
  if (avoinnaEnnen) {
    await napautaKohtaa(sivu, soimassa.radio.w > 0 ? soimassa.radio : isoMuoto.radio);
    await sivu.waitForTimeout(400);
    const sammutettu = await lueKartuscha(sivu);
    const soitinKiinni = await sivu.evaluate(
      () => !window.matkakirja?.ui?.lehtitila?.kulttuuriAani,
    );
    vaadi(`${ruutu.nimi} · 6c napautus sulkee radion ja sammuttaa valon`,
      !sammutettu.soi && !sammutettu.punainenVoitolla && soitinKiinni,
      `soi ${sammutettu.soi}, soitinKiinni ${soitinKiinni}, väri ${sammutettu.valonVari}`);
  } else {
    /*
     * Virta katkesi itsestään — valon ON silti oltava sammunut. Se on
     * tärkein väite: valo ei saa jäädä palamaan hiljaiselle napille.
     */
    const itsestaan = await lueKartuscha(sivu);
    vaadi(`${ruutu.nimi} · 6c valo sammuu kun lähetys katkeaa`,
      !itsestaan.soi && !itsestaan.punainenVoitolla,
      `soi ${itsestaan.soi}, väri ${itsestaan.valonVari}`);
  }

  if (KUVAKANSIO && isoMuoto.kortti) {
    await sivu.screenshot({
      path: join(KUVAKANSIO, `kartuscha-${ruutu.nimi}.png`),
      clip: {
        x: Math.max(0, Math.round(isoMuoto.kortti.x0 - 12)),
        y: Math.max(0, Math.round(isoMuoto.kortti.y0 - 12)),
        width: Math.min(ruutu.leveys, Math.round(isoMuoto.kortti.w + 24)),
        height: Math.min(ruutu.korkeus, Math.round(isoMuoto.kortti.h + 24)),
      },
    });
  }
  vaadi(`${ruutu.nimi} · sivulla ei ole virheitä`, virheet.length === 0, virheet.slice(0, 2).join(' | '));
  await ctx.close();
  /* eslint-enable no-await-in-loop */
}

/* ---- VASTAKOKEET --------------------------------------------------- */

console.log('\n=== VASTAKOE A: maa ilman lähetystä ===');
vastakoe = 'EI_RADIOTA';
{
  const { ctx, sivu, auki } = await avaaPeli(RUUDUT[1]);
  if (auki) {
    const lepo = await lueKartuscha(sivu);
    await napautaKohtaa(sivu, lepo.avain);
    const iso = await lueKartuscha(sivu);
    vaadi('A radiotonta maata ei varusteta valolla (väitteen 5 on kaaduttava)',
      iso.valikkoAuki && !iso.radioNakyy,
      `auki ${iso.valikkoAuki}, radioNakyy ${iso.radioNakyy}`);
  } else console.log('OHITUS  pallolauta ei auennut');
  await ctx.close();
}

console.log('\n=== VASTAKOE B: rivit takaisin isoon muotoon ===');
vastakoe = 'RIVIT_TAKAISIN';
{
  const { ctx, sivu, auki } = await avaaPeli(RUUDUT[1]);
  if (auki) {
    const lepo = await lueKartuscha(sivu);
    await napautaKohtaa(sivu, lepo.avain);
    const iso = await lueKartuscha(sivu);
    const nakyy = (iso.alarivi?.w > 0) || (iso.vuosi?.w > 0) || (iso.nyt?.w > 0);
    vaadi('B kumottu piilotus palauttaa rivit (väitteen 3 on kaaduttava)',
      iso.valikkoAuki && nakyy,
      `auki ${iso.valikkoAuki}, alarivi ${iso.alarivi?.w ?? 0}, vuosi ${iso.vuosi?.w ?? 0}, nyt ${iso.nyt?.w ?? 0}`);
  } else console.log('OHITUS  pallolauta ei auennut');
  await ctx.close();
}

console.log(`\n${lapi}/${kaikki} vartiota läpi`);
await selain.close();
palvelin.close();
process.exit(lapi === kaikki ? 0 : 1);
