/*
 * Savuke: NOSTOTASON LAATTAKERROS JA MAASTOKOHTEEN NIMI.
 *
 * Kaksi omistajan havaintoa 2.9.2026 illalta, ja molemmat ovat
 * KAKSOISKUVIA — sama asia kartalla kahdesti:
 *
 *   A) TUPLANÄKYMÄ. *"välillä tulee tällaisia tuplanäkymiä … ne onneksi
 *      häviävät jonkun ajan kuluttua"* (Sofia, mittajana 100 km):
 *      sumea, venytetty ja hieman siirtynyt poltettu nimi ("Boyanan
 *      kirkko", "Rila-vuoristo") terävän nimen vieressä. Juurisyy oli
 *      pohjan sääntö väärässä kerroksessa: nostotaso piti EDELLISEN
 *      zoomtason laatat uusien ALLA, kunnes uudet latautuivat — ja
 *      läpinäkyvällä kerroksella vanha muste ei katoa uuden alle vaan
 *      näkyy sen läpi. Kaksoiskuva on myös erikokoinen, koska nostojen
 *      ruutukatto lasketaan tason omalla tiheydellä (js/nostoladonta.js
 *      nostoladontaKattoSuhde).
 *
 *   B) IRRALLINEN VUORENKUVA. *"Balkan vuoret ovat edelleen polttamatta
 *      eikä tekstiä voi klikata. sen sijaan sen yläpuolella oleva
 *      irrallinen vuorenkuva vie balkan vuorten popupiin."* Sama
 *      vuoristo oli kahdessa aineistossa 19 lautayksikön päässä
 *      toisistaan: napautettava mutta nimetön kohdemerkki ja
 *      napauttamaton maastonimi sen alapuolella.
 *
 * VARTIOT:
 *   1. NOSTOKERROKSESSA ON VAIN YHDEN TASON LAATTOJA — ei koskaan
 *      kahden, ei zoomin aikana eikä sen jälkeen.
 *   2. JOKAINEN NOSTOLAATTA ON LUETTELON OMASTA VERSIOSTA.
 *   3. MITTAUS EI OLE SOKEA: pohjakerros SAA pitää kaksi tasoa (sääntö
 *      2, "vanha taso ei katoa ennen kuin uusi on paikallaan"), ja
 *      sama otanta näkee sen — jos ei näkisi, vartio 1 menisi läpi
 *      tyhjästä.
 *   4. MAASTOKOHTEEN NIMI ON MERKIN OMA. "Balkanvuoret" on kartalla
 *      TÄSMÄLLEEN KERRAN ja se on kohdemerkin nimiö (data-kohde),
 *      ei nimikerroksen maastonimi.
 *   5. NIMEÄ VOI NAPAUTTAA: napautus nimen päälle avaa kohteen kortin.
 *   6. IRRALLISTA KOLMIOTA EI OLE: nimikerros ei piirrä samalle
 *      vuorelle omaa kolmiotaan merkin viereen.
 *
 * Vartiot 4-6 mitataan kahdella mittajanalla (100 km ja 50 km) —
 * omistajan omat näkymät.
 *
 * Aja:  node tools/savukkeet/savuke-nostolaatat.mjs
 */
import http from 'node:http';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
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

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

/*
 * LUETTELO AJETAAN OIKEALLA TYÖKALULLA eikä jäljitellä käsin: juuri se
 * komento ajetaan tuotannossa, ja vartion arvo on siinä, että laattojen
 * ruudukko, nostotason peite ja ladontasäännön tunnus tulevat samasta
 * lähteestä kuin ämpärissä. Tasot 5-7 riittävät — nostolaattoja on vain
 * niillä — ja ajo kestää pari sekuntia, koska laattoja ei piirretä.
 */
const kansio = mkdtempSync(join(tmpdir(), 'nostolaatat-'));
execFileSync(process.execPath, [
  join(JUURI, 'tools', 'generoi-laattapyramidi.mjs'), kansio,
  '--tasot', '5-7',
  '--versio', 'pohja-koe',
  '--nostotaso', '--nostoversio', 'nosto-koe',
  '--vain-luettelo',
], { stdio: 'pipe' });
const POLTETTU_LUETTELO = readFileSync(join(kansio, 'pyramidi.json'), 'utf8');
const NOSTOVERSIO = JSON.parse(POLTETTU_LUETTELO).nostotaso.versio;

/*
 * TOINEN FIKSTUURI: LUETTELO ILMAN POLTETTUJA NOSTOJA (sama sisältö ja
 * sama syy kuin tools/savukkeet/mittaa-syvazoomi.mjs:ssä). Vartiot 4-6
 * lukevat merkkien nimet DOMista, ja poltettu merkki on laatan
 * pikseleitä — ilman tätä fikstuuria mitattavaa ei olisi. Ladonta on
 * sama kummallakin (Raamattu: elävä = poltettu), joten elävästä
 * kerroksesta mitattu nimi on se, joka laattaankin palaa.
 */
const ELAVA_LUETTELO = JSON.stringify({
  versio: '2026-08-31',
  lauta: 'maailmankartta',
  laatta: 512,
  muoto: 'webp',
  nimiot: false,
  arkki: { x: 0, y: -1046.3149255312064, w: 12000, h: 7307.715927310571 },
  tasot: [{
    z: 0,
    leveys: 675,
    korkeus: 411,
    pikseliaPerYksikko: 0.05625,
    sarakkeita: 2,
    riveja: 1,
    laatasto: null,
  }],
});

/**
 * Avaa pelin Sofiassa ja zoomaa `askelia` porrasta sisään.
 *
 * @param {object} asetukset luettelo (JSON-merkkijono), laattaviive ms,
 *   askelia, otanta (kutsutaan zoomin aikana joka 60 ms)
 */
async function avaaSofia({
  luettelo, laattaViiveMs = 0, askelia = 5, otanta = null,
}) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: 'sofia' }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set('sofia', 'topaz');
  peli.revealed.delete('sofia');
  peli.phase = 'action';
  const tallenne = JSON.stringify(peli.toJSON());

  const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await selain.newContext({
    viewport: { width: 834, height: 1112 }, deviceScaleFactor: 2, reducedMotion: 'reduce',
  });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  /*
   * REITIT MYÖHEMMÄSTÄ VANHEMPAAN: Playwright kokeilee viimeksi
   * rekisteröityä ensin, joten yleinen r2-sieppari on rekisteröitävä
   * ENNEN pyramidin omia reittejä. Väärässä järjestyksessä se nappaisi
   * myös pyramidi.jsonin ja peli jäisi ilman luetteloa.
   */
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  /*
   * LAATAT VIIVEELLÄ. Kaksoiskuva on olemassa vain sen ajan, jonka uusi
   * taso latautuu; kontin verkossa se on nolla. Viive tekee ikkunasta
   * mitattavan — ja juuri se ikkuna on omistajan havainto.
   */
  await sivu.route(/\/julisteet\/pyramidi\/.*\.webp$/, async (route) => {
    if (laattaViiveMs) await new Promise((ok) => { setTimeout(ok, laattaViiveMs); });
    await route.fulfill({ status: 200, contentType: 'image/webp', body: PIKSELI });
  });
  await sivu.route('**/julisteet/pyramidi/pyramidi.json', (route) => route.fulfill({
    status: 200, contentType: 'application/json', body: luettelo,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForTimeout(3000);
  for (let i = 0; i < 6; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.keyboard.press('Escape');
    // eslint-disable-next-line no-await-in-loop
    await sivu.waitForTimeout(250);
  }
  for (let i = 0; i < askelia; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await sivu.evaluate(() => window.matkakirja.ui.kartta.zoomaaPainikkeella(1));
    if (!otanta) {
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(700);
      continue;
    }
    for (let n = 0; n < 20; n += 1) {
      // eslint-disable-next-line no-await-in-loop
      await sivu.waitForTimeout(60);
      // eslint-disable-next-line no-await-in-loop
      await otanta(sivu);
    }
  }
  await sivu.waitForTimeout(2500);
  return { sivu, selain };
}

/** Kerrosten laattatasot ja osoitteet juuri nyt. */
const kerrostila = (sivu) => sivu.evaluate(() => {
  const lue = (valitsin) => {
    const kuvat = [...document.querySelectorAll(`${valitsin} image`)];
    return {
      kpl: kuvat.length,
      tasot: [...new Set(kuvat.map((k) => k.dataset.taso))].sort(),
      versiot: [...new Set(kuvat.map((k) => (k.getAttribute('href') ?? '')
        .split('/julisteet/pyramidi/')[1]?.split('/')[0] ?? ''))],
    };
  };
  return {
    nostot: lue('.pyramidi-nostotaso'),
    pohja: lue('.pyramidi-tarkkataso'),
  };
});

/* ================================ A: nostotason kaksoiskuva ======== */

console.log('=== A: nostotaso zoomin aikana (laattaviive 400 ms) ===');
const otokset = [];
const { sivu: aSivu, selain: aSelain } = await avaaSofia({
  luettelo: POLTETTU_LUETTELO,
  laattaViiveMs: 400,
  askelia: 6,
  otanta: async (sivu) => { otokset.push(await kerrostila(sivu)); },
});
otokset.push(await kerrostila(aSivu));

const nostoOtokset = otokset.filter((o) => o.nostot.kpl > 0);
const kaksiTasoa = nostoOtokset.filter((o) => o.nostot.tasot.length > 1);
const vaaraVersio = nostoOtokset.filter((o) => o.nostot.versiot.some((v) => v !== NOSTOVERSIO));
const pohjaKaksiTasoa = otokset.filter((o) => o.pohja.tasot.length > 1);
console.log(`   otoksia ${otokset.length}, joista nostolaattoja ${nostoOtokset.length}`);
console.log(`   nostokerros kahdella tasolla ${kaksiTasoa.length} otoksessa`);
console.log(`   pohjakerros kahdella tasolla ${pohjaKaksiTasoa.length} otoksessa`);
console.log(`   viimeisin: ${JSON.stringify(otokset[otokset.length - 1])}`);

vaadi('0. nostolaattoja oli ruudulla (muuten vartiot mittaisivat tyhjää)',
  nostoOtokset.length > 0, `otoksia ${otokset.length}`);
vaadi('1. nostokerroksessa ei koskaan kahden tason laattoja',
  kaksiTasoa.length === 0,
  `${kaksiTasoa.length} otosta, esim. ${JSON.stringify(kaksiTasoa[0]?.nostot)}`);
vaadi('2. jokainen nostolaatta on luettelon omasta versiosta',
  vaaraVersio.length === 0, JSON.stringify(vaaraVersio[0]?.nostot?.versiot));
vaadi('3. pohja SAA pitää kaksi tasoa (otanta ei ole sokea)',
  pohjaKaksiTasoa.length > 0,
  'pohjakerroksessa ei nähty kahta tasoa kertaakaan — otanta ei osunut siirtymään');
await aSelain.close();

/* ============================ B: maastokohteen nimi ja merkki ====== */

const MAASTOKOHTEET_SOFIASSA = ['balkanvuoret', 'rila', 'musala'];

for (const askelia of [5, 6]) {
  /* eslint-disable no-await-in-loop */
  const { sivu, selain } = await avaaSofia({ luettelo: ELAVA_LUETTELO, askelia });
  const jana = await sivu.evaluate(() => document
    .querySelector('.fokus-jana-maksimi')?.textContent ?? '');
  const nimi = `Sofia ${jana.trim() || `+${askelia}`}`;
  console.log(`\n=== B: ${nimi} ===`);

  const tila = await sivu.evaluate((tunnukset) => {
    const kerros = document.querySelector('.karttanimet');
    const tekstit = [...(kerros?.querySelectorAll('text') ?? [])].map((e) => ({
      teksti: e.textContent,
      laji: (e.getAttribute('class') ?? '').replace('karttanimi karttanimi-', ''),
      kohde: e.dataset.kohde ?? null,
    }));
    const kolmiot = [...(kerros?.querySelectorAll('.karttamerkki-vuori') ?? [])].map((e) => {
      const r = e.getBoundingClientRect();
      return { x: +(r.x + r.width / 2).toFixed(1), y: +(r.y + r.height / 2).toFixed(1) };
    });
    const merkit = {};
    for (const r of window.matkakirja.ui.fokuskohdeRyhmat ?? []) {
      if (!tunnukset.includes(r.id)) continue;
      merkit[r.id] = { nimi: r.nimi ?? '', nakyy: Boolean(r.g?.isConnected) };
    }
    return { tekstit, kolmiot, merkit };
  }, MAASTOKOHTEET_SOFIASSA);

  for (const tunnus of MAASTOKOHTEET_SOFIASSA) {
    const merkki = tila.merkit[tunnus];
    if (!merkki?.nakyy || !merkki.nimi) continue;
    const osumat = tila.tekstit.filter((t) => t.teksti === merkki.nimi);
    vaadi(`4. ${nimi}: "${merkki.nimi}" täsmälleen kerran kartalla`,
      osumat.length === 1, `osumia ${osumat.length}: ${JSON.stringify(osumat)}`);
    vaadi(`4b. ${nimi}: "${merkki.nimi}" on kohdemerkin nimiö eikä maastonimi`,
      osumat.length === 1 && osumat[0].kohde === tunnus,
      JSON.stringify(osumat[0] ?? null));

    /* 5. Napautus nimen päälle avaa kortin. */
    const paikka = await sivu.evaluate((id) => {
      const e = document.querySelector(`.karttanimet [data-kohde="${CSS.escape(id)}"]`);
      if (!e) return null;
      const r = e.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }, tunnus);
    if (paikka) {
      await sivu.mouse.click(paikka.x, paikka.y);
      await sivu.waitForTimeout(600);
    }
    const otsikko = await sivu.evaluate(() => document
      .querySelector('.fokuskohde-popup .fokuskohde-otsikko')?.textContent ?? null);
    vaadi(`5. ${nimi}: nimen napautus avaa "${merkki.nimi}" -kortin`,
      Boolean(otsikko && otsikko.includes(merkki.nimi.split(/[ -]/)[0])),
      `kortin otsikko: ${otsikko}`);
    await sivu.keyboard.press('Escape');
    await sivu.waitForTimeout(300);
  }

  /*
   * 6. IRRALLINEN KOLMIO. Nimikerroksen oma vuorikolmio piirtyy vain
   * nimensä kanssa (js/karttanimet.js nimetytVuoret), joten irrallinen
   * kolmio näkyisi tässä kolmiona, jonka nimeä ei ole — mutta koska
   * kohdemerkki omistaa nyt sekä nimen että symbolin, tälle vuorelle ei
   * saa jäädä nimikerroksen kolmiota lainkaan.
   */
  const balkan = tila.merkit.balkanvuoret;
  const balkanTeksti = tila.tekstit.find((t) => t.teksti === 'Balkanvuoret');
  vaadi(`6. ${nimi}: Balkanvuorilla ei ole nimikerroksen omaa kolmiota`,
    !tila.tekstit.some((t) => t.teksti === 'Balkanvuoret' && t.laji === 'vuori'),
    `nimi: ${JSON.stringify(balkanTeksti)} · merkki: ${JSON.stringify(balkan)}`
      + ` · kolmioita ${tila.kolmiot.length}`);
  await selain.close();
  /* eslint-enable no-await-in-loop */
}

palvelin.close();
console.log(`\n${lapi}/${kaikki} vartiota läpi`);
process.exit(lapi === kaikki ? 0 : 1);
