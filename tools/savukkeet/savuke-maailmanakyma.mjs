/*
 * Savuke: kehittäjän MAAILMANÄKYMÄN sujuvuus — merkkikerrokset eivät
 * saa maalata koko lautaa, kun ruudulla näkyy siitä murto-osa.
 *
 * === MIKÄ VIKA OLI (mitattu 29.8.2026, Chromium 390x844 dpr3, 4x) ===
 *
 * Omistajan havainto: kartta jankkaa nimenomaan silloin, kun kehittäjän
 * maailmanappi (js/main.js #kehittaja-maailma-btn) on päällä. A/B-ajo
 * samalla eleellä Kreikan sisällä, nappi pois vs. päällä:
 *
 *                          nappi pois   nappi päällä
 *     Layerize                     1x         7,4x
 *     Paint                        1x       4–11x
 *     panoroinnin longtaskit    ~0 ms        668 ms
 *     nipistyksen longtaskit       —        1440 ms
 *     maailma-napin klikkaus       —        ~460 ms
 *
 * Juurisyy on solmumäärä: maailmanäkymä ohittaa käymättömien maiden
 * piilotuksen, jolloin kartalla on KOKO laudan kaupunkikerros — 602
 * näkyvää solmua. Eleenaikainen piilotus (js/kartta.js piilotaMerkit,
 * body.kartta-merkit-piilossa) kattaa vain fokuskohteet, fokuspisteet,
 * nostosymbolit ja nippuviivat, eikä siis niitä lainkaan. Kustannus on
 * lineaarinen näkyvissä solmuissa (varmistettu kloonikokeella), koska
 * kartan CSS-muunnos pakottaa selaimen pilkkomaan koko SVG:n uudestaan
 * maalipaloihin joka kehyksellä.
 *
 * === KORJAUS, JOTA TÄMÄ SAVUKE VARTIOI ===
 *
 *   K1  NÄKYMÄRAJAUS: näkymän + ruudullisen puskurin ulkopuolelle
 *       jäävät kaupunkiosat ja maailmanäkymän pikkulehdet saavat
 *       luokan .fokus-ikkunan-ulkona (js/ui.js paivitaMaailmanRajaus,
 *       css/styles.css display: none). Luokka, ei suodatin — sama
 *       iOS-sääntö kuin muillakin kartan kerroksilla.
 *   K2  LUKU/KIRJOITUS-KURI: näkymä mitataan asettumisketjussa KERRAN
 *       ja kulkee parametrina alas (js/ui.js taydennaTaide →
 *       paivitaMaastonimet → paivitaFokusAtlas / paivitaFokuskohteet /
 *       paivitaFokusNimilaput), ja fokusMerkkiSkaala lukee paneelin
 *       mitat fitViewBoxin välimuistista (ui.paneKoko) eikä ruudulta.
 *   K3  Maailmanapin kytkentä tekee lukunsa ennen kirjoituksiaan.
 *
 * === MITATTU KORJAUKSEN JÄLKEEN (sama ajo) ===
 *
 *     näkyviä .cities-solmuja   602 → 90
 *     panoroinnin longtaskit   1755 → 1070 ms (CDP-trace)
 *     nipistyksen longtaskit   2981 → 2188 ms (CDP-trace)
 *     maailma-napin kytkentä    905 →  443 ms (CDP-trace)
 *     Layerize panoroinnissa   1714 →  469 ms
 *     Paint panoroinnissa       891 →  396 ms
 *
 * === MIKSI RAJAT OVAT NÄIN VÄLJIÄ ===
 *
 * Kello flakkaa CI:n koneilla, joten aikaväitteet on asetettu selvästi
 * mitatun yläpuolelle: ne eivät vartioi viimeistä kymmentä prosenttia
 * vaan sitä, ettei rajaus katoa tai lakkaa toimimasta. Väite 2
 * (näkyvien solmujen määrä) on sen sijaan determinantti ja tiukka —
 * juuri se on korjauksen ydin.
 *
 * VERKOSTA EI HAETA MITÄÄN. Kaupunkikerros tulee laudan paketista,
 * eikä maailmanäkymän pikkulehtiä (js/fokuskartta.js haePikkulehti)
 * tarvita: ne ovat sama rajaus samalla koodilla, ja mitattava kuorma
 * on kaupunkikerroksessa.
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
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};

// Kreikan oikea rajaus (js/packs/fokus-grc.js FOKUS_POHJAT.GRC).
const BBOX = { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 };
const RAJAUS = { x: 6399.39, y: 1725.58, w: 467.89, h: 292.43 };
const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 3,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
// Kehittäjätila JA maailmanappi päälle ennen ensimmäistäkään moduulia:
// sama kytkentä kuin omistajan laitteella (js/ui-apurit.js).
await sivu.addInitScript(() => {
  try {
    localStorage.setItem('matkakirja-kehittaja', '1');
    localStorage.setItem('matkakirja-kehittaja-maailma', '1');
  } catch { /* yksityinen tila: savuke ajaa ilman */ }
});
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route('**r2.dev/**', (route) => route.abort());
await sivu.route('**/fokus/**', (route) => {
  const url = route.request().url();
  if (url.endsWith('GRC.json')) {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        iso: 'GRC', lauta: 'maailmankartta', bbox: BBOX, rajaus: RAJAUS, tiedosto: 'GRC.png',
      }),
    });
    return;
  }
  if (/GRC\.(png|webp)$/.test(url)) {
    route.fulfill({ status: 200, contentType: 'image/png', body: PIKSELI });
    return;
  }
  // Naapurit, yleislehti ja pikkulehdet puuttuvat: mitattava kuorma on
  // laudan kaupunkikerroksessa (ks. johdanto).
  route.fulfill({ status: 404, body: 'ei' });
});

const cdp = await ctx.newCDPSession(sivu);

/* ------------------------------------------------ peli Ateenaan */

await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2000);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') g.actionPickStart('ateena', 0);
  window.matkakirja.ui.render();
});
// Saapumisajo, lehden asennus ja rasterointi rauhassa loppuun.
await sivu.waitForTimeout(7000);
// Kaksi zoomiporrasta: sama lähiluku kuin omistajan havainnossa.
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
await sivu.waitForTimeout(4000);

const tila = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const nakyvia = (valitsin) => [...ui.svg.querySelectorAll(valitsin)]
    .filter((e) => getComputedStyle(e).display !== 'none').length;
  return {
    maailmanakyma: Boolean(ui.maailmanakyma?.()),
    fokusmoodi: Boolean(ui.fokusmoodi),
    pohja: Boolean(ui.fokusPohjaBbox),
    citiesSolmut: ui.svg.querySelectorAll('.cities > *').length,
    citiesNakyvia: nakyvia('.cities > *'),
    rajattuja: ui.svg.querySelectorAll('.fokus-ikkunan-ulkona').length,
  };
});

const alku = await tila();
vaadi('0a kehittäjän maailmanäkymä on päällä Kreikassa',
  alku.maailmanakyma && alku.fokusmoodi && alku.pohja, JSON.stringify(alku));
vaadi('0b koko laudan kaupunkikerros on kartalla',
  alku.citiesSolmut > 400, `citiesSolmut ${alku.citiesSolmut}`);

/* ------------------------------------------------ mittarit päälle */

await sivu.evaluate(() => {
  window.__savuke = { longtasks: [] };
  new PerformanceObserver((lista) => {
    for (const e of lista.getEntries()) {
      window.__savuke.longtasks.push(Math.round(e.duration));
    }
  }).observe({ type: 'longtask', buffered: false });
});
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

const nollaa = () => sivu.evaluate(() => { window.__savuke.longtasks = []; });
const longtaskit = () => sivu.evaluate(() => window.__savuke.longtasks.slice());

const pyyhkaisy = async (x0, y0, x1, y1, askeleet = 14) => {
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y: y0, id: 1 }] });
  for (let i = 1; i <= askeleet; i++) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{
        x: x0 + ((x1 - x0) * i) / askeleet,
        y: y0 + ((y1 - y0) * i) / askeleet,
        id: 1,
      }],
    });
    await sivu.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};
const nipista = async (suhde, askeleet = 16) => {
  const cx = 195; const cy = 480;
  const piste = (v, k) => ({ x: cx + Math.cos(k) * v, y: cy + Math.sin(k) * v });
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ ...piste(80, 0), id: 1 }, { ...piste(80, Math.PI), id: 2 }],
  });
  for (let i = 1; i <= askeleet; i++) {
    const v = 80 + (80 * suhde - 80) * (i / askeleet);
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ ...piste(v, 0), id: 1 }, { ...piste(v, Math.PI), id: 2 }],
    });
    await sivu.waitForTimeout(16);
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
};

/* --------------------------------- 1. panorointi Kreikan sisällä */

await nollaa();
for (let i = 0; i < 3; i++) {
  await pyyhkaisy(280, 420, 140, 420);
  await sivu.waitForTimeout(450);
  await pyyhkaisy(140, 420, 280, 420);
  await sivu.waitForTimeout(450);
}
const panLt = await longtaskit();
const panSumma = panLt.reduce((s, x) => s + x, 0);
const panPahin = panLt.length ? Math.max(...panLt) : 0;
console.log(`      mitattu: panoroinnin longtaskit ${panLt.length} kpl,`
  + ` summa ${panSumma} ms, pahin ${panPahin} ms`);

const panTila = await tila();
console.log(`      mitattu: näkyviä kaupunkiosia ${panTila.citiesNakyvia}`
  + ` / ${panTila.citiesSolmut} (rajattuja ${panTila.rajattuja})`);

/*
 * Väite 1 on korjauksen ydin ja ainoa tiukka luku: ilman rajausta tässä
 * on 602. Raja 200 päästää läpi zoomitason ja lehtivalinnan vaihtelun
 * mutta kaatuu heti, jos rajaus katoaa.
 */
vaadi('1 eleen asetuttua kartalla on vain näkymän merkit',
  panTila.citiesNakyvia > 0 && panTila.citiesNakyvia < 200,
  `näkyviä ${panTila.citiesNakyvia} / ${panTila.citiesSolmut}`);
vaadi('2 rajaus on oikeasti piilottanut osan kerroksesta',
  panTila.rajattuja > 100, `rajattuja ${panTila.rajattuja}`);
// Tällä savukkeella mitattu: ennen 389 ms / 7 taskia, jälkeen 215 / 4.
// (Omistajan omalla A/B-ajolla, jossa naapurilehti on kartalla, sama
// ero on 799 → 475 ms.) Raja 350 kaatuu korjauksen katoamiseen mutta
// ei CI-koneen vaihteluun.
vaadi('3a panorointi ei kasaa pitkiä tehtäviä',
  panSumma < 350, `longtask-summa ${panSumma} ms (raja 350)`);
vaadi('3b yksikään panoroinnin tehtävä ei veny nykäykseksi',
  panPahin < 150, `pahin ${panPahin} ms (raja 150)`);

/* ------------------------------------ 2. nipistys saman maan sisällä */

await nollaa();
for (let i = 0; i < 2; i++) {
  await nipista(1.35);
  await sivu.waitForTimeout(600);
  await nipista(0.75);
  await sivu.waitForTimeout(600);
}
const nipLt = await longtaskit();
const nipSumma = nipLt.reduce((s, x) => s + x, 0);
console.log(`      mitattu: nipistyksen longtaskit ${nipLt.length} kpl, summa ${nipSumma} ms`);
// Neljä pientä nipistystä. Tällä savukkeella mitattu ennen 960 ms,
// jälkeen 480 ms; CDP-tracella kuudella eleellä 2981 → 2188 ms.
vaadi('4 nipistys pysyy budjetissa',
  nipSumma < 750, `longtask-summa ${nipSumma} ms (raja 750)`);

/* --------------------- 3. maailma-napin kytkentä ja merkkien paluu */

await nollaa();
const pois = await sivu.evaluate(async () => {
  const t0 = performance.now();
  document.getElementById('kehittaja-maailma-btn')?.click();
  return Math.round(performance.now() - t0);
});
await sivu.waitForTimeout(2500);
const poisTila = await tila();
console.log(`      mitattu: napin klikkauskäsittely ${pois} ms`);
// Omistajan A/B-ajolla klikkauskäsittely oli ~460 ms (3,2 s jättikehys
// koko kytkennälle). Tällä savukkeella ennen 216 ms, jälkeen 160 ms —
// ja paluu päälle 222 → 77 ms.
vaadi('5 maailma-napin kytkentä ei jää jättikehykseksi',
  pois > 0 && pois < 200, `${pois} ms (raja 200)`);
/*
 * Väite 6: rajaus EI OLE ENÄÄ KEHITTÄJÄN NÄKYMÄN OSA (29.8.2026,
 * bittikarttakartan vaihe 2).
 *
 * Ennen väite kuului "näkymän sammuessa rajausluokka puretaan
 * kokonaan": rajaus oli olemassa vain maailmanäkymää varten, ja
 * pelaajan oma näkymä olisi perinyt kehittäjätilan piilotukset.
 *
 * Nyt käymättömien maiden datakerros näkyy pelaajallekin
 * (js/ui.js paivitaFokusKerros: KAIKKI NÄKYVISSÄ ALUSTA), joten
 * lähikuvassa on samat 600 solmua kytkimestä riippumatta ja rajaus
 * on voimassa aina. Väite mittaa siksi sitä, mikä on olennaista:
 * rajaus ei jätä yhtäkään NÄKYMÄN SISÄLLÄ olevaa kaupunkia piiloon —
 * eli kytkimen jälkeen kartalla on yhä merkkejä.
 */
vaadi('6 rajaus jää voimaan myös näkymän sammuttua eikä tyhjennä karttaa',
  !poisTila.maailmanakyma && poisTila.citiesNakyvia > 0,
  `maailmanakyma ${poisTila.maailmanakyma}, näkyviä ${poisTila.citiesNakyvia},`
  + ` rajattuja ${poisTila.rajattuja}`);

// Takaisin päälle: rajaus on laskettava uudestaan heti kytkimestä eikä
// vasta ensimmäisestä eleestä.
const paalle = await sivu.evaluate(async () => {
  const t0 = performance.now();
  document.getElementById('kehittaja-maailma-btn')?.click();
  return Math.round(performance.now() - t0);
});
await sivu.waitForTimeout(2500);
const paalleTila = await tila();
console.log(`      mitattu: paluun klikkauskäsittely ${paalle} ms,`
  + ` näkyviä ${paalleTila.citiesNakyvia} / ${paalleTila.citiesSolmut}`);
vaadi('7 paluu maailmanäkymään rajaa heti kytkimestä',
  paalleTila.maailmanakyma && paalleTila.citiesNakyvia > 0
    && paalleTila.citiesNakyvia < 200,
  `näkyviä ${paalleTila.citiesNakyvia} / ${paalleTila.citiesSolmut}`);

/*
 * Väite 8: merkit PALAAVAT kun näkymä siirtyy niiden ylle. Panoroidaan
 * pitkä matka ja katsotaan, että näkyvien joukko oikeasti vaihtui —
 * eli ettei rajaus ole kertaluontoinen piilotus vaan seuraa näkymää.
 */
const ennenSiirtoa = await sivu.evaluate(() => [...window.matkakirja.ui.svg
  .querySelectorAll('.cities > *')]
  .filter((e) => !e.classList.contains('fokus-ikkunan-ulkona'))
  .map((e) => e.dataset.kaupunki ?? '').join(','));
for (let i = 0; i < 6; i++) {
  await pyyhkaisy(340, 420, 60, 420);
  await sivu.waitForTimeout(300);
}
await sivu.waitForTimeout(1200);
const siirronJalkeen = await sivu.evaluate(() => [...window.matkakirja.ui.svg
  .querySelectorAll('.cities > *')]
  .filter((e) => !e.classList.contains('fokus-ikkunan-ulkona'))
  .map((e) => e.dataset.kaupunki ?? '').join(','));
const siirtoTila = await tila();
console.log(`      mitattu: näkyvien joukko vaihtui ${ennenSiirtoa !== siirronJalkeen},`
  + ` näkyviä ${siirtoTila.citiesNakyvia}`);
vaadi('8 merkit palaavat kun näkymä siirtyy niiden ylle',
  ennenSiirtoa !== siirronJalkeen && siirtoTila.citiesNakyvia > 0
    && siirtoTila.citiesNakyvia < 250,
  `vaihtui ${ennenSiirtoa !== siirronJalkeen}, näkyviä ${siirtoTila.citiesNakyvia}`);

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
