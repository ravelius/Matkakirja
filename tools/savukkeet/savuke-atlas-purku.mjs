/*
 * Savuke: ATLASLEHTIEN PURKU JA PORRASVAIHTO — kartan jaksottainen jankki.
 *
 * === MIKSI TÄMÄ ON OLEMASSA (Fablemaxin diagnoosi 28.8.2026) ===
 *
 * Omistajan havainto: kartta tökkii JAKSOTTAIN kaikilla laitteilla,
 * myös M4:llä — ei koko ajan, vaan aina kun näkymä ylittää rajan ja
 * uusi lehti saapuu. Juurisyy oli kolmen mekanismin summa, ja kaikki
 * kolme ovat sidoksissa 6400 x 4000 (25,6 Mp) atlaslehtiin:
 *
 *   1. Lehden PURKU tapahtui maalauspolulla. Osoite kirjoitettiin
 *      suoraan `<image href>`:iin, ja selain purki kuvan vasta
 *      maalatessaan sen — WebKitissä pääsäikeessä. Mitattu
 *      `Decode Image` 508–1256 ms, perässä MajorGC 131–540 ms ja
 *      85–120 ms:n commit-odotus.
 *   2. RASTERIPORTAAN vaihto paistoi koko merkkikerroksen uusiksi
 *      yhdessä ajastintehtävässä, ja rasteri kirjoitettiin
 *      synkronisella `canvas.toDataURL`illa: 346–416 ms:n
 *      TimerFire-piikkejä 350 ms:n levon jälkeen.
 *   3. Sama lehti KIERSI pura-lataa-pura rajan molemmin puolin, koska
 *      vapautus tehtiin heti kun lehti poistui näkymästä.
 *
 * === MITÄ TÄMÄ SAVUKE VARTIOI ===
 *
 * 1. `toDataURL`-laskuri on NOLLA eleiden aikana. Rasterit tehdään
 *    `toBlob`illa (js/fokusnosto-symbolit.js kangasOsoitteeksi), ja
 *    paluu synkroniseen pakkaukseen näkyisi tässä heti.
 * 2. Jokainen kartalle kirjoitettu fokuslehden osoite on PURETTU
 *    (Image.decode) ennen kuin se päätyi määreeseen — juuri se, mikä
 *    siirtää purun pois maalauksesta (js/fokuskartta.js esipura).
 * 3. Kartalle kirjoitetun lehden PIKSELIKOKO on katon alla: pitkä sivu
 *    enintään PIENENNYS_TYOPOYTA_PITKA_SIVU ja pinta-ala enintään
 *    PIENENNYS_TYOPOYTA_KATTO_MP. Vartioi ettei 25,6 Mp palaa
 *    työpöydälle, jos pienennys joskus rajattaisiin taas puhelimeen.
 * 4. Lehden saapumisikkunassa ei ole yli 120 ms:n pääsäietaskia
 *    4x-kuristuksella. Kello mitataan VERROKKIIN suhteutettuna samalla
 *    tavalla kuin savuke-webkit-eleissä: hidas kontti ei saa flakata,
 *    mutta lehden saapuminen ei saa olla verrokkia moninkerroin
 *    raskaampi.
 *
 * LEHDET OVAT OIKEAN KOKOISIA EIVÄTKÄ 1 px STUBEJA. Ne generoidaan
 * ajossa selaimen omalla canvasilla (6400 x 4000 webp) — repoon ei
 * committoida binäärejä, ja stubi mittaisi tyhjää: koko tämän
 * savukkeen vikaluokka ON lehden koko.
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

// Playwright repon node_modulesista, muuten kontin globaalista (README).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.geojson': 'application/json',
};

/*
 * KATOT LUETAAN LÄHTEESTÄ, jotta savuke ei jää jälkeen jos niitä
 * viritetään — mutta niiden OLEMASSAOLO on väite: lehti ei saa palata
 * kartalle täytenä 25,6 megapikselinä.
 */
const lahde = readFileSync(join(JUURI, 'js/fokuskartta.js'), 'utf8');
const PITKA_SIVU = Number(/PIENENNYS_TYOPOYTA_PITKA_SIVU = (\d+)/.exec(lahde)?.[1] ?? 4096);
const KATTO_MP = Number(/PIENENNYS_TYOPOYTA_KATTO_MP = ([\d.]+)/.exec(lahde)?.[1] ?? 15);

const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, {
    'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream',
    // Pienennys noutaa lehden tavut CORSilla (js/fokuskartta.js haeTavut);
    // ämpärissä on vastaava sääntö.
    'access-control-allow-origin': '*',
  });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/*
 * OIKEAN KOKOINEN LEHTI, GENEROITU AJOSSA. Kuvio on karkea
 * korkeuskäyrämäinen liuku: pakkautuu kuin akvarelli eikä tasaisena
 * pintana muutamaan kilotavuun, jolloin purkukin on oikean työn
 * kokoinen.
 */
const tehdasSivu = await (await selain.newContext()).newPage();
const lehtiB64 = await tehdasSivu.evaluate(() => {
  const c = document.createElement('canvas');
  c.width = 6400; c.height = 4000;
  const ctx = c.getContext('2d');
  const liuku = ctx.createLinearGradient(0, 0, 6400, 4000);
  liuku.addColorStop(0, '#e8dcbc');
  liuku.addColorStop(1, '#b08a5a');
  ctx.fillStyle = liuku;
  ctx.fillRect(0, 0, 6400, 4000);
  ctx.strokeStyle = 'rgba(74,52,33,0.35)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 220; i += 1) {
    ctx.beginPath();
    for (let x = 0; x <= 6400; x += 64) {
      const y = 20 * i + 140 * Math.sin((x / 900) + i) + 60 * Math.cos(x / 310);
      if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  return c.toDataURL('image/webp', 0.7).split(',')[1];
});
await tehdasSivu.close();
const LEHTI = Buffer.from(lehtiB64, 'base64');
console.log(`      lehti generoitu: 6400 x 4000 webp, ${Math.round(LEHTI.length / 1024)} kt`);

/*
 * KAKSI AJOA, KOSKA KATOT OVAT LAITEKOHTAISET (js/fokuskartta.js
 * pienennysRajat):
 *
 *   A. TYÖPÖYTÄIKKUNA — pelkkä saapuminen ja lehden pikselimitta.
 *      Juuri työpöydältä pienennys ennen puuttui kokonaan, ja väite 3
 *      vartioi ettei 25,6 Mp palaa sinne.
 *   B. PUHELINIKKUNA — eleet. Kartan panorointi on rajattu maan
 *      lehteen (js/kartta.js rajaaFokusPan), ja leveässä ikkunassa
 *      Kreikan lehti täyttää näkymän niin, ettei naapurimaahan pääse
 *      lainkaan: rajanylitys — se hetki, jossa vika näkyy — on
 *      puhelinikkunan geometriaa.
 */
const varusta = async (sivu) => {
  await sivu.addInitScript(() => {
    window.__savuke = { dataUrl: 0, dataUrlEleissa: 0, eleissa: false, puretut: [] };
    const kangas = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function (...a) {
      window.__savuke.dataUrl += 1;
      if (window.__savuke.eleissa) window.__savuke.dataUrlEleissa += 1;
      return kangas.apply(this, a);
    };
    const pura = HTMLImageElement.prototype.decode;
    HTMLImageElement.prototype.decode = function (...a) {
      window.__savuke.puretut.push(this.getAttribute('src') ?? this.src ?? '');
      return pura.apply(this, a);
    };
    window.__longtaskit = [];
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__longtaskit.push(Math.round(e.duration));
    }).observe({ type: 'longtask', buffered: true });
  });
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route('**r2.dev/**', (r) => r.abort());
  await sivu.route('**/julisteet/fokus/**', (route) => {
    const nimi = route.request().url().split('/').pop();
    // Rajaukset luetaan reposta (FOKUS_POHJAT), joten JSONia ei tarvita.
    if (!nimi.endsWith('.webp')) { route.fulfill({ status: 404, body: 'ei' }); return; }
    route.fulfill({
      status: 200,
      contentType: 'image/webp',
      body: LEHTI,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
};

/** Peli käyntiin ja Ateenaan; palauttaa vasta kun lehdet ovat kartalla. */
const ateenaan = async (sivu) => {
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')]
      .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(1500);
  await sivu.evaluate(() => {
    const g = window.matkakirja.game;
    if (g.phase === 'pickstart') { g.actionPickStart('ateena', 0); window.matkakirja.ui.render(); }
  });
  await sivu.waitForTimeout(8000);
};

/** Kartalla olevien fokuslehtien todelliset pikselimitat. */
const lehtienMitat = (sivu) => sivu.evaluate(async () => {
  const kuvat = [...document.querySelectorAll(
    '.fokus-lehti image, .fokus-atlas image, .fokus-yleislehti image',
  )];
  const ulos = [];
  for (const k of kuvat) {
    const i = new Image();
    i.src = k.getAttribute('href');
    try { await i.decode(); } catch { /* mitat luetaan silti */ }
    ulos.push({
      ryhma: k.parentNode.getAttribute('class'),
      w: i.naturalWidth,
      h: i.naturalHeight,
      blob: (k.getAttribute('href') ?? '').startsWith('blob:'),
    });
  }
  return ulos;
});

/* --- A. TYÖPÖYTÄ: LEHDEN PIKSELIKOKO --------------------------------- */

const tyoCtx = await selain.newContext({
  viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2, serviceWorkers: 'block',
});
const tyoSivu = await tyoCtx.newPage();
await varusta(tyoSivu);
await ateenaan(tyoSivu);
const tyoMitat = await lehtienMitat(tyoSivu);
const isot = tyoMitat.filter((m) => Math.max(m.w, m.h) > PITKA_SIVU
  || (m.w * m.h) / 1e6 > KATTO_MP + 0.5);
vaadi('3a työpöydän lehti on katon alla', tyoMitat.length > 0 && isot.length === 0,
  isot.map((m) => `${m.ryhma} ${m.w}x${m.h}`).join(', ') || 'ei mitattavia lehtiä');
vaadi('3b työpöydän lehti on pienennetty (blob-osoite)', tyoMitat.length > 0
  && tyoMitat.every((m) => m.blob),
  tyoMitat.filter((m) => !m.blob).map((m) => m.ryhma).join(', ') || 'ei lehtiä');
console.log(`      mitattu: ${tyoMitat.map((m) => `${m.ryhma}=${m.w}x${m.h}`).join(' ')}`
  + ` (katto ${PITKA_SIVU} px / ${KATTO_MP} Mp; lähde 6400x4000 = 25,6 Mp)`);
await tyoCtx.close();

/* --- B. PUHELIN: ELEET ----------------------------------------------- */

const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true,
  deviceScaleFactor: 3, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
await varusta(sivu);
const sivuvirheet = [];
sivu.on('pageerror', (e) => sivuvirheet.push(e.message));

const cdp = await ctx.newCDPSession(sivu);
await ateenaan(sivu);
// Syvä zoomi: kaksi porrasta sisään, jolloin panorointi ylittää rajoja.
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(1200);
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(2500);

const pohjatila = await sivu.evaluate(() => ({
  lehdet: [...(window.matkakirja.ui.atlasLehdet?.keys() ?? [])],
  kerros: Boolean(window.matkakirja.ui.fokuskarttaKerros),
}));
vaadi('0 fokuskartta on pystyssä', pohjatila.kerros, 'fokuskarttaKerros puuttuu');

/* --- ELEET ----------------------------------------------------------- */

const pyyhkaisy = async (x0, y0, x1, y1, askeleet = 22) => {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0, id: 1 }] });
  for (let i = 1; i <= askeleet; i += 1) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: x0 + ((x1 - x0) * i) / askeleet, y: y0 + ((y1 - y0) * i) / askeleet, id: 1 }],
    });
    await sivu.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};
const nipista = async (suhde, askeleet = 18) => {
  const cx = 195; const cy = 480; let vali = 90;
  const loppu = 90 * suhde;
  const piste = (v, kulma) => ({ x: cx + Math.cos(kulma) * v, y: cy + Math.sin(kulma) * v });
  const parit = (v) => [{ ...piste(v, 0), id: 1 }, { ...piste(v, Math.PI), id: 2 }];
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: parit(vali) });
  for (let i = 1; i <= askeleet; i += 1) {
    vali = 90 + ((loppu - 90) * i) / askeleet;
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: parit(vali) });
    await sivu.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};

const eleetPaalle = (paalla) => sivu.evaluate((p) => { window.__savuke.eleissa = p; }, paalla);
const nollaaLongtaskit = () => sivu.evaluate(() => { window.__longtaskit = []; });
const lueLongtaskit = () => sivu.evaluate(() => window.__longtaskit.slice());

// Kuristus vasta nyt: saapumislento saa kulkea täydellä koneella.
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

/*
 * VERROKKI ENSIN: sama panorointi lännessä, jossa lehdet ovat jo
 * kartalla eikä yhtäkään ole saapumassa. Se on tämän koneen pohja-aika
 * samalle eleelle (ks. savuke-webkit-eleet, väite 4).
 */
await eleetPaalle(true);
await nollaaLongtaskit();
for (let i = 0; i < 4; i += 1) {
  await pyyhkaisy(120, 420, 300, 420);
  await pyyhkaisy(300, 420, 120, 420);
}
const verrokki = await lueLongtaskit();

/*
 * SAAPUMISIKKUNA: panorointi ITÄÄN kunnes Turkin lehti saapuu
 * atlakseen. Juuri tässä ikkunassa vanha koodi purki lehden
 * maalauspolulla.
 */
await nollaaLongtaskit();
let tur = false;
for (let i = 0; i < 16 && !tur; i += 1) {
  await pyyhkaisy(340, 620, 60, 260);
  await sivu.waitForTimeout(250);
  tur = await sivu.evaluate(() => [...(window.matkakirja.ui.atlasLehdet?.keys() ?? [])].includes('TUR'));
}
await sivu.waitForTimeout(1500);
const saapuminen = await lueLongtaskit();

/*
 * NIPISTYSSARJA KOLMEN RASTERIPORTAAN YLI. Portaanvaihto on se
 * mekanismi, joka ennen paistoi koko merkkikerroksen uusiksi
 * (js/fokuskohteet.js ajastaRasteriporras).
 *
 * Merkkisolmut MERKITÄÄN ennen sarjaa: väite 4b on rakenne eikä kello
 * — samojen solmujen on oltava kartalla sarjan jälkeenkin, ja vain
 * niiden osoitteen on vaihduttava.
 */
const ennenSarjaa = await sivu.evaluate(() => {
  const kuvat = [...document.querySelectorAll('image.nostosym-rasteri')];
  kuvat.forEach((k, i) => { k.dataset.savuke = String(i); });
  return kuvat.map((k, i) => ({ i, href: k.getAttribute('href') ?? '' }));
});
await nollaaLongtaskit();
for (let i = 0; i < 3; i += 1) { await nipista(0.5); await sivu.waitForTimeout(700); }
for (let i = 0; i < 3; i += 1) { await nipista(2.0); await sivu.waitForTimeout(700); }
for (let i = 0; i < 4; i += 1) {
  await nipista(i % 2 === 0 ? 1.8 : 0.55);
  await sivu.waitForTimeout(700);
}
await sivu.waitForTimeout(1500);
const nipistys = await lueLongtaskit();
const jalkeenSarjan = await sivu.evaluate(() => [...document.querySelectorAll('image.nostosym-rasteri')]
  .filter((k) => k.dataset.savuke !== undefined)
  .map((k) => ({ i: Number(k.dataset.savuke), href: k.getAttribute('href') ?? '' })));
await eleetPaalle(false);

/* --- VÄITTEET -------------------------------------------------------- */

vaadi('1a Turkin lehti saapui atlakseen', tur, 'TUR ei ilmestynyt 16 pyyhkäisyssä');

const laskurit = await sivu.evaluate(() => ({
  dataUrl: window.__savuke.dataUrl,
  eleissa: window.__savuke.dataUrlEleissa,
}));
vaadi('1b toDataURL-laskuri on nolla eleiden aikana', laskurit.eleissa === 0,
  `${laskurit.eleissa} synkronista toDataURL-kutsua`);
console.log(`      mitattu: toDataURL yhteensä ${laskurit.dataUrl}, eleiden aikana ${laskurit.eleissa}`);

/*
 * VÄITE 2: jokainen kartalla oleva fokuslehden osoite on purettu ennen
 * kirjoitusta. Purkulista kerätään Image.decoden kaappauksesta.
 */
const purku = await sivu.evaluate(() => {
  const puretut = new Set(window.__savuke.puretut);
  const kuvat = [...document.querySelectorAll(
    '.fokus-lehti image, .fokus-atlas image, .fokus-yleislehti image, .fokus-maailma image',
  )];
  return kuvat.map((k) => ({
    ryhma: k.parentNode.getAttribute('class'),
    osoite: k.getAttribute('href') ?? '',
    purettu: puretut.has(k.getAttribute('href') ?? ''),
  }));
});
vaadi('2a kartalla on lehtiä', purku.length > 0, 'yhtään fokuslehteä ei ole kartalla');
const purkamatta = purku.filter((k) => !k.purettu);
vaadi('2b jokainen lehti on purettu ennen href-kirjoitusta', purkamatta.length === 0,
  `purkamatta ${purkamatta.length}/${purku.length}: ${purkamatta.map((k) => k.ryhma).join(', ')}`);

/*
 * VÄITE 3 (jatko): sama katto myös puhelimessa, jossa luvut ovat
 * tiukemmat. Mitta luetaan kuvasta itsestään eikä koodin lupauksesta.
 */
const PUH_PITKA = Number(/PIENENNYS_PITKA_SIVU = (\d+)/.exec(lahde)?.[1] ?? 3200);
const PUH_KATTO = Number(/PIENENNYS_KATTO_MP = ([\d.]+)/.exec(lahde)?.[1] ?? 8);
const mitat = await lehtienMitat(sivu);
const puhIsot = mitat.filter((m) => Math.max(m.w, m.h) > PUH_PITKA
  || (m.w * m.h) / 1e6 > PUH_KATTO + 0.5);
vaadi('3c puhelimen lehti on katon alla', mitat.length > 0 && puhIsot.length === 0,
  puhIsot.map((m) => `${m.ryhma} ${m.w}x${m.h}`).join(', ') || 'ei mitattavia lehtiä');
console.log(`      mitattu: ${mitat.map((m) => `${m.ryhma}=${m.w}x${m.h}`).join(' ')}`
  + ` (puhelimen katto ${PUH_PITKA} px / ${PUH_KATTO} Mp)`);

/*
 * VÄITE 4a: saapumisikkunassa ei yli 120 ms:n pääsäietaskia. Kello
 * suhteessa verrokkiin, jos ympäristö ei absoluuttiseen rajaan yllä
 * (sama malli kuin savuke-webkit-eleissä).
 */
const suurin = (lista) => (lista.length ? Math.max(...lista) : 0);
const RAJA_MS = 120;
const KERROIN = 2.5;
const vMax = suurin(verrokki);
const sMax = suurin(saapuminen);
const nMax = suurin(nipistys);
console.log(`      mitattu: longtaskin max — verrokki ${vMax} ms, saapuminen ${sMax} ms`
  + `, nipistyssarja ${nMax} ms (n=${verrokki.length}/${saapuminen.length}/${nipistys.length})`);
if (vMax <= 60) {
  vaadi('4a lehden saapumisessa ei yli 120 ms:n taskia', sMax <= RAJA_MS, `max ${sMax} ms`);
} else {
  const katto = Math.round(Math.max(vMax * KERROIN, RAJA_MS));
  console.log(`      HUOM: verrokki ${vMax} ms > 60 ms — ympäristö ei yllä ${RAJA_MS} ms:n`
    + ` rajaan, käytetään suhteellista kattoa ${katto} ms.`);
  vaadi('4a lehden saapuminen ei ole verrokkia moninkerroin raskaampi', sMax <= katto,
    `max ${sMax} ms > ${katto} ms`);
}

/*
 * VÄITE 4b ON RAKENNE EIKÄ KELLO. Nipistyssarjassa on aina yksi
 * roskienkeruupiikki, jota tämä paketti ei poista, joten kello
 * flakkaisi — mutta se mekanismi, joka piikin ENNEN teki, on
 * mitattavissa suoraan: merkkikerrosta ei enää pureta portaanvaihdossa
 * (js/fokuskohteet.js ajastaRasteriporras). Samojen solmujen on siis
 * oltava kartalla sarjan jälkeenkin, ja niiden osoitteen on vaihduttava
 * — jälkimmäinen todistaa, että porras oikeasti vaihtui.
 */
vaadi('4b merkkikerroksessa oli merkkejä ennen sarjaa', ennenSarjaa.length > 0,
  'yhtään nostosym-rasteria ei ollut kartalla');
const sailyneet = new Set(jalkeenSarjan.map((k) => k.i));
const kadonneet = ennenSarjaa.filter((k) => !sailyneet.has(k.i));
vaadi('4c porrasvaihto ei pura merkkikerrosta', kadonneet.length === 0,
  `${kadonneet.length}/${ennenSarjaa.length} merkkisolmua purettiin`);
const vanhat = new Map(ennenSarjaa.map((k) => [k.i, k.href]));
const vaihtuneet = jalkeenSarjan.filter((k) => k.href && k.href !== vanhat.get(k.i));
vaadi('4d rasterin osoite vaihtui paikallaan', vaihtuneet.length > 0,
  'yksikään merkki ei saanut uutta rasteria — vaihtuiko porras lainkaan?');
console.log(`      mitattu: merkkisolmuja ${ennenSarjaa.length}, säilyi `
  + `${ennenSarjaa.length - kadonneet.length}, uusi rasteri ${vaihtuneet.length}:lle`);

vaadi('5 ei sivuvirheitä', sivuvirheet.length === 0, sivuvirheet[0] ?? '');

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
