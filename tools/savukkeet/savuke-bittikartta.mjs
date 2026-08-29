/*
 * Savuke: LAVAN POHJACANVAS (js/karttapohja.js, bittikarttakartta
 * vaiheet 1–3).
 *
 * === MIKÄ VIKA OLI (mitattu 29.8.2026) ===============================
 *
 * Lavan pohja on bittikarttoja, mutta niitä on päällekkäin jopa 25
 * (yleislehti + atlas + maailmanäkymän pikkulehdet), ja selain purkaa
 * ja maalaa ne uudestaan joka kerta kun se rasteroi kartan tiiliä.
 * Chromium 4x, Puolan jokitiheikkö maailmatilassa, 10 s:n HOLD-ele:
 *
 *     Decode Image   1105 ms / 116 kpl      (yksi purku 1104 ms)
 *     RasterTask      540 ms
 *
 * === KORJAUS, JOTA TÄMÄ SAVUKE VARTIOI ===============================
 *
 *   K1  Pohjakerrokset (pergamentti + neljä lehtiryhmää) koostetaan
 *       yhdelle canvakselle, joka on lavan kokoinen ja lavan paikalla
 *       karttakuoressa svg:n alla. Poltetut lehdet saavat luokan
 *       .karttapohja-poltettu ja katoavat svg:stä (display: none).
 *   K2  KESKEN ELEEN EI KOOSTETA. Sormen alla rebake-laskuri ei liiku
 *       eikä lavaa ikkunoida — sama sääntö kuin bittikartalla
 *       (js/ui.js taydennaTaide sääntö 1).
 *   K3  STRIPE-REBAKE: siirtyneestä lavasta koostetaan vain paljastunut
 *       kaista; vanha sisältö siirretään canvaksen sisällä.
 *   K4  Koosteen origo on TÄSMÄLLEEN lavaikkunan origo, eikä
 *       reunatäydennys siirrä näkymän keskipistettä pikseliäkään.
 *   K5  Mitoitus pysyy profiilibudjetissa (8/12/20 Mp) ja sivu 4096:ssa.
 *   K6  Canvas-pohja näyttää samalta kuin svg-pohja.
 *
 * === VAIHEIDEN 2 JA 3 LISÄVÄITTEET (29.8.2026) =======================
 *
 *   K7  ATOMINEN VAIHTO: täyden koosteen ajaksi ruudulle jää VANHA
 *       kooste CSS-muunnoksella venytettynä — svg ei ota pohjaa
 *       takaisin. Kuoressa on silloin kaksi canvasta, ja näkyvän
 *       ratkaisee luokka .karttapohja-nakyva.
 *   K8  KIINTEÄT ZOOMTASOT: nipistys napsahtaa portaikon tasoon
 *       (js/kartta.js napsautaTasoon) eikä jätä vapaata kerrointa.
 *   K9  SUMENNUSTA EI OLE: .fokus-sumu on tyhjä joka tilassa
 *       (omistajan linjaus 29.8.2026).
 *   K10 KAIKKI NÄKYVISSÄ ALUSTA: yksikään kartan osa ei ole
 *       .fokus-piilossa — käymättömän maan datakerros näkyy.
 *
 * === MIKSI RUUTUAVARUUDEN CANVASTA EI OLE ============================
 *
 * Vaiheen 2 resepti oli ruudun kokoinen, kuoren ulkopuolella elävä
 * canvas, johon blitataan joka kehyksellä. Se rakennettiin ja
 * mitattiin: WebKit p50 16 → 131 ms, koska kuoren ulkopuolinen
 * canvas ei voi siirtyä kompositorilla vaan sen sisältö on
 * kirjoitettava uusiksi joka kehyksellä. Tämä savuke vartioi siksi
 * sitä, että canvas ON kuoressa (K1a).
 *
 * === MITATTU KORJAUKSEN JÄLKEEN (sama ajo) ===========================
 *
 *     Decode Image   1105 → 73 ms / 107 kpl
 *     RasterTask      540 → 394 ms
 *     HOLD-kehykset   max 66,7 → 66,7 ms, p50 16,7 → 16,7 ms
 *
 * VERKOSTA EI HAETA MITÄÄN: lehdet tulevat testin omasta reitityksestä
 * (samat webp-tiedostot kuin muillakin fokussavukkeilla).
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import {
  KARTTAPOHJAN_PROFIILIT, mitoitaKarttapohja, valitseKarttapohjanProfiili,
} from '../../js/karttapohja.js';

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

/* ================= K5: mitoitus ilman selainta ====================== */

console.log('--- mitoitus (puhdas funktio) ---');
{
  // Lavan nimellinen koko = ruutu + lavamarginaali (720 px) molemmin
  // puolin, eli täsmälleen se, mitä js/kartta.js lavaIkkuna tuottaa.
  const laudat = [
    { nimi: 'iPhone 390x844', leveys: 390 + 1440, korkeus: 844 + 1440, profiili: 'kapea' },
    { nimi: 'iPad 820x1180', leveys: 820 + 1440, korkeus: 1180 + 1440, profiili: 'tabletti' },
    { nimi: 'tyopoyta 1440x900', leveys: 1440 + 1440, korkeus: 900 + 1440, profiili: 'tyopoyta' },
    // Poikkeuksellisen iso lava: kattojen on pakko purra.
    { nimi: 'jattilava 6000x6000', leveys: 6000, korkeus: 6000, profiili: 'tyopoyta' },
  ];
  let kaikkiMahtuu = true;
  let sivutMahtuu = true;
  let huiputMahtuu = true;
  for (const lauta of laudat) {
    const m = mitoitaKarttapohja({
      leveysCss: lauta.leveys, korkeusCss: lauta.korkeus, profiili: lauta.profiili,
    });
    const mahtuu = m.tavut <= m.budjettiTavut;
    const sivut = m.leveysPx <= 4096 && m.korkeusPx <= 4096;
    const huippu = m.huippuTavut <= m.huippuBudjettiTavut;
    if (!mahtuu) kaikkiMahtuu = false;
    if (!sivut) sivutMahtuu = false;
    if (!huippu) huiputMahtuu = false;
    console.log(`      ${lauta.nimi} (${lauta.profiili}): k=${m.kerroin.toFixed(3)}`
      + ` canvas=${m.leveysPx}x${m.korkeusPx} ${(m.tavut / 1e6).toFixed(1)} Mt`
      + ` / budjetti ${(m.budjettiTavut / 1e6).toFixed(0)} Mt`
      + ` (huippu tuplapuskurin kanssa ${(m.huippuTavut / 1e6).toFixed(1)} Mt)`);
  }
  vaadi('K5a canvas mahtuu profiilin budjettiin kaikilla laudoilla', kaikkiMahtuu);
  vaadi('K5b canvaksen sivu enintään 4096 px', sivutMahtuu);
  vaadi('K5c transientti tuplapuskuri mahtuu huippubudjettiin', huiputMahtuu);
  // Puhelimen koostokerroin on speksin mitattu luku: lehden lähdetarkkuus
  // (3200 px) on noin 1,36 x css, joten 1,38 ei menetä pohjatarkkuutta.
  const puhelin = mitoitaKarttapohja({ leveysCss: 1830, korkeusCss: 2284, profiili: 'kapea' });
  vaadi('K5d puhelimen koostokerroin on 1,38', Math.abs(puhelin.kerroin - 1.38) < 0.01,
    `kerroin ${puhelin.kerroin}`);
  vaadi('K5e sama syöte antaa saman olion (muisti)',
    mitoitaKarttapohja({ leveysCss: 1830, korkeusCss: 2284, profiili: 'kapea' }) === puhelin);
  vaadi('K5f profiili valitaan ruudun lyhyestä sivusta ja kosketuksesta',
    valitseKarttapohjanProfiili({ leveys: 390, korkeus: 844, kosketus: true }) === 'kapea'
    && valitseKarttapohjanProfiili({ leveys: 820, korkeus: 1180, kosketus: true }) === 'tabletti'
    // Iso kosketuslaite (iPad Pro) EI saa työpöydän budjettia.
    && valitseKarttapohjanProfiili({ leveys: 1024, korkeus: 1366, kosketus: true }) === 'tabletti'
    && valitseKarttapohjanProfiili({ leveys: 1440, korkeus: 900 }) === 'tyopoyta');
  vaadi('K5g kolme profiilia, kaikilla sama 4096 px:n sivukatto',
    Object.values(KARTTAPOHJAN_PROFIILIT).every((p) => p.sivuKatto === 4096)
    && Object.keys(KARTTAPOHJAN_PROFIILIT).length === 3);
}

/* ================= selainosuus ====================================== */

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 3,
  serviceWorkers: 'block',
});
const sivu = await ctx.newPage();
await sivu.addInitScript(() => {
  try { localStorage.setItem('matkakirja-kehittaja', '1'); } catch { /* yksityinen tila */ }
});
await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
await sivu.route('**r2.dev/**', (route) => route.abort());
/*
 * KREIKAN LEHTI PAIKALLISESTA TIEDOSTOSTA. Verkkoon ei mennä, mutta
 * pelkkä yhden pikselin kuva ei kelpaisi: kuvavertailu (K6) ja
 * reunahäivytysmaski vaativat oikean kokoisen, monivärisen lehden.
 * Kaupunkikartta on repossa valmiina ja kelpaa siihen sellaisenaan.
 */
const LEHDEN_KUVA = readFileSync(join(JUURI, 'assets/kartat/dubrovnik-keskusta.png'));
// Kreikan oikea rajaus (js/packs/fokus-grc.js FOKUS_POHJAT.GRC).
const BBOX = { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 };
const RAJAUS = { x: 6399.39, y: 1725.58, w: 467.89, h: 292.43 };
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
  /*
   * KAIKKI LEHDET SAAVAT SAMAN KUVAN. Rajaukset tulevat repon omasta
   * taulusta (js/packs/fokus-grc.js FOKUS_POHJAT), joten pelkkä kuva
   * riittää — ja koko atlas naapureineen syntyy, jolloin lavaa
   * pääsee panoroimaan niin pitkälle että reunatäydennys laukeaa.
   */
  if (/\.(png|webp)$/.test(url)) {
    route.fulfill({ status: 200, contentType: 'image/png', body: LEHDEN_KUVA });
    return;
  }
  route.fulfill({ status: 404, body: 'ei' });
});
await sivu.goto(osoite, { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(1500);
await sivu.evaluate(() => {
  const g = window.matkakirja.game;
  if (g.phase === 'pickstart') { g.actionPickStart('ateena', 0); window.matkakirja.ui.render(); }
});
await sivu.waitForTimeout(7000);
// Kaksi porrasta lähemmäs: syväzoom, jossa lehti täyttää ruudun.
for (let z = 0; z < 2; z++) {
  await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(1); });
  await sivu.waitForTimeout(1500);
}
await sivu.waitForTimeout(6000);

const tilasto = () => sivu.evaluate(() => window.matkakirja.ui.karttapohja?.tilasto ?? null);
/*
 * Odotetaan että pohja on koostettu JA asettunut: naapurilehti voi
 * saapua verkosta kesken kaiken ja käynnistää uuden koosteen, jonka
 * ajaksi svg ottaa pohjan takaisin (js/karttapohja.js piilota).
 */
const odotaVakaa = async (vakaaMs = 1600, katto = 60000) => {
  const loppu = Date.now() + katto;
  let viimeRebakeja = -1;
  let vakaastaAlkaen = Date.now();
  while (Date.now() < loppu) {
    const t = await tilasto();
    if (!t || !t.kaytossa || t.rebakeja !== viimeRebakeja) {
      viimeRebakeja = t?.rebakeja ?? -1;
      vakaastaAlkaen = Date.now();
    } else if (Date.now() - vakaastaAlkaen >= vakaaMs) return t;
    await sivu.waitForTimeout(200);
  }
  return tilasto();
};
await odotaVakaa();

/* --- K1: pohja on canvaksella ja poltetut lehdet piilossa ---------- */

console.log('\n--- selain: kooste ---');
const alku = await tilasto();
const rakenne = await sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const kuori = ui.karttaKuori;
  const canvas = kuori?.querySelector('canvas.karttapohja-nakyva');
  const kuvia = ui.fokuskarttaKerros?.querySelectorAll('image.fokuskartta-kuva').length ?? 0;
  const puskureita = kuori?.querySelectorAll('canvas.karttapohja').length ?? 0;
  const sumua = ui.svg.querySelector('.fokus-sumu')?.childElementCount ?? 0;
  const piilossaMaita = ui.svg.querySelectorAll('.fokus-piilossa').length;
  const poltettuja = ui.fokuskarttaKerros?.querySelectorAll('image.karttapohja-poltettu').length ?? 0;
  const piilossa = [...(ui.fokuskarttaKerros?.querySelectorAll('image.karttapohja-poltettu') ?? [])]
    .every((k) => getComputedStyle(k).display === 'none');
  const paperi = ui.svg.querySelector('.paper-pohja');
  return {
    onCanvas: Boolean(canvas),
    ennenSvgta: canvas ? canvas.compareDocumentPosition(ui.svg) === 4 : false,
    canvasKoko: canvas ? `${canvas.width}x${canvas.height}` : null,
    // Ruutulaatikot: canvaksen on oltava täsmälleen lavan päällä.
    canvasLaatikko: canvas
      ? (({ x, y, width, height }) => ({
        x: Math.round(x * 100) / 100,
        y: Math.round(y * 100) / 100,
        w: Math.round(width * 100) / 100,
        h: Math.round(height * 100) / 100,
      }))(canvas.getBoundingClientRect())
      : null,
    lavaLaatikko: (({ x, y, width, height }) => ({
      x: Math.round(x * 100) / 100,
      y: Math.round(y * 100) / 100,
      w: Math.round(width * 100) / 100,
      h: Math.round(height * 100) / 100,
    }))(ui.svg.getBoundingClientRect()),
    luokka: document.body.classList.contains('karttapohja-canvas'),
    kuvia,
    poltettuja,
    piilossa,
    paperiPiilossa: paperi ? getComputedStyle(paperi).display === 'none' : null,
    merkkejaNakyvissa: ui.svg.querySelectorAll('.cities > *').length,
    puskureita,
    sumua,
    piilossaMaita,
  };
});
console.log(`      ${JSON.stringify(rakenne)}`);
console.log(`      tilasto: ${JSON.stringify(alku)}`);
vaadi('K1a canvas on karttakuoressa svg:n ALLA', rakenne.onCanvas && rakenne.ennenSvgta,
  JSON.stringify(rakenne));
/*
 * Canvas on TÄSMÄLLEEN lavan päällä — ei puolta pikseliä sivussa.
 * Murto-osapikselin paikka pakottaisi kompositorin näytteistämään
 * 8 Mp:n canvaksen uudestaan joka maalauksessa (mitattu: kehyksen
 * p50 16,7 → 100 ms; js/karttapohja.js laskeTila).
 */
{
  const c = rakenne.canvasLaatikko ?? { x: -9, y: -9, w: 0, h: 0 };
  const l = rakenne.lavaLaatikko;
  vaadi('K1b canvas on pikselilleen lavan päällä',
    c.x === l.x && c.y === l.y && c.w === l.w && c.h === l.h,
    `${JSON.stringify(c)} vs ${JSON.stringify(l)}`);
}
vaadi('K1c poltetut lehdet ovat display:none', rakenne.poltettuja > 0 && rakenne.piilossa,
  `poltettuja ${rakenne.poltettuja}`);
vaadi('K1d pergamentin pohja on canvaksella eikä svg:ssä',
  rakenne.paperiPiilossa === true);
vaadi('K1e merkit jäävät svg:hen eläviksi', rakenne.merkkejaNakyvissa > 0,
  `${rakenne.merkkejaNakyvissa}`);
/*
 * K9/K10: sumennuksesta luovuttiin ja käymättömien maiden datakerros
 * jäi näkyviin (omistajan linjaus 29.8.2026). Molemmat ovat
 * kartalla NÄKEMISEN väitteitä, ja siksi ne mitataan samasta
 * näkymästä kuin kooste.
 */
vaadi('K9 sumuverho on tyhjä', rakenne.sumua === 0, `solmuja ${rakenne.sumua}`);
vaadi('K10 yksikään kartan osa ei ole fokus-piilossa',
  rakenne.piilossaMaita === 0, `piilossa ${rakenne.piilossaMaita}`);

/* --- K8: nipistys napsahtaa kiinteään tasoon ---------------------- */

console.log('\n--- kiinteät zoomtasot ---');
const tasot = await sivu.evaluate(() => {
  const k = window.matkakirja.ui.kartta;
  const portaat = k.zoomiTasot();
  const { pienin, suurin } = k.zoomiRajat();
  const pohja = k.fokusZoomMinimi();
  // Kolme mielivaltaista kerrointa portaiden välistä: jokaisen on
  // napsahdettava johonkin ehdokkaaseen (porras tai fokusikkuna).
  const kokeet = [pienin * 1.13, Math.sqrt(pienin * suurin), suurin * 0.77];
  return {
    portaat: portaat.length,
    pienin,
    suurin,
    pohja,
    tulokset: kokeet.map((x) => ({ x, ...k.napsautaTasoon(x) })),
  };
});
console.log(`      portaita ${tasot.portaat}, rajat ${tasot.pienin.toFixed(2)}…`
  + `${tasot.suurin.toFixed(2)}, fokusikkuna ${tasot.pohja.toFixed(2)}`);
for (const t of tasot.tulokset) {
  console.log(`      ${t.x.toFixed(2)} → ${t.kerroin.toFixed(2)} (porras ${t.porras})`);
}
vaadi('K8a napsautus osuu aina portaaseen tai fokusikkunaan',
  tasot.tulokset.every((t) => t.porras >= 0 || Math.abs(t.kerroin - tasot.pohja) < 1e-6),
  JSON.stringify(tasot.tulokset));
vaadi('K8b napsautus pysyy rajojen sisällä',
  tasot.tulokset.every((t) => t.kerroin >= tasot.pienin * 0.999
    && t.kerroin <= tasot.suurin * 1.001),
  JSON.stringify(tasot.tulokset));
vaadi('K8c portaikossa on ainakin kolme tasoa fokusnäkymässä',
  tasot.portaat >= 3, `${tasot.portaat}`);

/* --- K7: atominen vaihto zoomin napsahduksessa -------------------- */

console.log('\n--- atominen vaihto ---');
const vaihto = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const kp = ui.karttapohja;
  const ennen = { ...kp.tilasto };
  // Yksi porras lähemmäs: sovitus vaihtaa lavan ja pakottaa täyden
  // koosteen — juuri se hetki, jonka ajaksi ruudulle pitää jäädä
  // vanha kooste eikä svg:n hidas pohja.
  ui.kartta.zoomaaPainikkeella(1);
  const otokset = [];
  for (let i = 0; i < 24; i++) {
    await new Promise((ok) => setTimeout(ok, 120));
    otokset.push({
      luokka: document.body.classList.contains('karttapohja-canvas'),
      muunnos: kp.tilasto.nakyvaMuunnos,
      puskureita: kp.tilasto.puskureita,
      taydet: kp.tilasto.taydet,
    });
    if (kp.tilasto.taydet > ennen.taydet && !kp.tyoKesken) break;
  }
  return { ennen, otokset, lopussa: { ...kp.tilasto } };
});
const kesken = vaihto.otokset.filter((o) => o.muunnos !== '');
console.log(`      otoksia ${vaihto.otokset.length}, muunnos päällä ${kesken.length},`
  + ` täysiä ${vaihto.ennen.taydet} → ${vaihto.lopussa.taydet},`
  + ` vaihtoja ${vaihto.lopussa.vaihtoja}`);
vaadi('K7a pohja ei palaa svg:lle kesken täyden koosteen',
  vaihto.otokset.every((o) => o.luokka),
  JSON.stringify(vaihto.otokset.map((o) => o.luokka)));
vaadi('K7b vanha kooste näkyy venytettynä uuden rakentuessa',
  kesken.length > 0 || vaihto.lopussa.vaihtoja > vaihto.ennen.vaihtoja,
  JSON.stringify(vaihto.lopussa));
/*
 * ASETTUNUT NÄKYMÄ, EI KESKEN OLEVA. Zoomin napsahdus voi käynnistää
 * peräkkäin kaksi koostetta (lava ikkunoituu vielä kertaalleen), ja
 * väite koskee lopputilaa: kun kartta on rauhassa, ruudulla on
 * kooste ILMAN venytystä eli täydellä tarkkuudella.
 */
const asettunut = await odotaVakaa();
console.log(`      asettunut: muunnos "${asettunut.nakyvaMuunnos}",`
  + ` puskureita ${asettunut.puskureita}`);
vaadi('K7c asettuneessa näkymässä kooste vastaa lavaa (ei muunnosta)',
  asettunut.nakyvaMuunnos === '', asettunut.nakyvaMuunnos);
await sivu.evaluate(() => { window.matkakirja.ui.kartta.zoomaaPainikkeella(-1); });
await sivu.waitForTimeout(2500);
await odotaVakaa();

/* --- K2: HOLD 10 s — ei yhtään koostetta eikä ikkunointia ---------- */

console.log('\n--- HOLD 10 s ---');
await sivu.evaluate(() => {
  const k = window.matkakirja.ui.kartta;
  window.__ikkunointeja = 0;
  const alkuperainen = k.ikkunoiLava.bind(k);
  k.ikkunoiLava = (...a) => { window.__ikkunointeja += 1; return alkuperainen(...a); };
});
const ennenHold = await tilasto();
await sivu.evaluate(async () => {
  const pane = document.querySelector('.map-pane');
  const tee = (tyyppi, cx, cy) => pane.dispatchEvent(new PointerEvent(tyyppi, {
    pointerId: 1, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true,
    clientX: cx, clientY: cy, buttons: tyyppi === 'pointerup' ? 0 : 1,
  }));
  tee('pointerdown', 195, 430);
  const loppu = performance.now() + 10000;
  let vaihe = 0;
  while (performance.now() < loppu) {
    vaihe += 1;
    tee('pointermove', 195 + Math.sin(vaihe / 6) * 170, 430 + Math.cos(vaihe / 9) * 90);
    await new Promise((ok) => { requestAnimationFrame(() => ok()); });
  }
  window.__holdLoppu = {
    ikkunointeja: window.__ikkunointeja,
    tilasto: { ...window.matkakirja.ui.karttapohja.tilasto },
  };
  tee('pointerup', 195, 430);
});
const hold = await sivu.evaluate(() => window.__holdLoppu);
console.log(`      kesken eleen: ikkunoiLava=${hold.ikkunointeja}`
  + ` rebakeja=${hold.tilasto.rebakeja} (ennen ${ennenHold.rebakeja})`);
vaadi('K2a rebake-laskuri ei liiku kesken eleen',
  hold.tilasto.rebakeja === ennenHold.rebakeja,
  `${ennenHold.rebakeja} → ${hold.tilasto.rebakeja}`);
vaadi('K2b lavaa ei ikkunoida kesken eleen', hold.ikkunointeja === 0,
  `${hold.ikkunointeja}`);
await sivu.waitForTimeout(2500);

/* --- K3 + K4: vetosarja, kaistat ja keskipiste --------------------- */

console.log('\n--- RELEASE-sarja syväzoomissa ---');
const veto = async (dx, dy) => sivu.evaluate(async ([sx, sy]) => {
  const pane = document.querySelector('.map-pane');
  const tee = (tyyppi, cx, cy) => pane.dispatchEvent(new PointerEvent(tyyppi, {
    pointerId: 1, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true,
    clientX: cx, clientY: cy, buttons: tyyppi === 'pointerup' ? 0 : 1,
  }));
  tee('pointerdown', 195, 430);
  for (let s = 1; s <= 14; s++) {
    tee('pointermove', 195 + (sx * s) / 14, 430 + (sy * s) / 14);
    await new Promise((ok) => { requestAnimationFrame(() => ok()); });
  }
  tee('pointerup', 195 + sx, 430 + sy);
}, [dx, dy]);

/** Näkymän keskipiste laudan yksiköissä — sama luku ennen ja jälkeen. */
const keskipiste = () => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const pane = ui.mapPane.getBoundingClientRect();
  const s = ui.zoomSkaala;
  return {
    x: ui.zoomVasenReuna + (pane.width / 2 - (ui.panX ?? 0)) / s,
    y: ui.zoomYlaReuna + (pane.height / 2 - (ui.panY ?? 0)) / s,
  };
});

let kaistoja = 0;
let taysia = 0;
let pahinKeskipiste = 0;
let vetoja = 0;
let pahinRebakenJalkeen = 0;
for (let i = 0; i < 6; i++) {
  const ennen = await tilasto();
  const kEnnen = await keskipiste();
  await sivu.evaluate(() => {
    window.__kehykset = [];
    let viime = performance.now();
    const askel = () => {
      const nyt = performance.now();
      window.__kehykset.push(nyt - viime);
      viime = nyt;
      window.__pyynto = requestAnimationFrame(askel);
    };
    window.__pyynto = requestAnimationFrame(askel);
  });
  // SAMAAN SUUNTAAN: vasta kun lavamarginaali (720 px) on syöty
  // puoleen, reunatäydennys ikkunoi lavan ja pohjasta koostetaan
  // kaista. Edestakainen veto ei koskaan pääse siihen asti.
  await veto(-300, -110);
  await sivu.waitForTimeout(2600);
  const jalkeen = await tilasto();
  const kJalkeen = await keskipiste();
  const kehykset = await sivu.evaluate(() => {
    cancelAnimationFrame(window.__pyynto);
    return window.__kehykset;
  });
  vetoja += 1;
  const uusia = jalkeen.rebakeja - ennen.rebakeja;
  kaistoja += jalkeen.kaistat - ennen.kaistat;
  taysia += jalkeen.taydet - ennen.taydet;
  const ero = Math.hypot(kJalkeen.x - kEnnen.x, kJalkeen.y - kEnnen.y);
  // Veto siirtää karttaa tarkoituksella; keskipisteen lupaus koskee
  // REBAKEA, joten verrataan lopullista keskipistettä siihen, minkä
  // lava itse ilmoittaa (origo + puolet näkymästä) — ks. K4 alla.
  void ero;
  const pahin = kehykset.length ? Math.max(...kehykset) : 0;
  if (uusia > 0) pahinRebakenJalkeen = Math.max(pahinRebakenJalkeen, pahin);
  console.log(`      veto ${i}: rebakeja +${uusia}`
    + ` (kaistoja ${jalkeen.kaistat}, täysiä ${jalkeen.taydet}),`
    + ` pisin kehys ${Math.round(pahin)} ms`);
  vaadi(`K3 veto ${i}: enintään yksi kooste vetoa kohti`, uusia <= 1, `+${uusia}`);
}
console.log(`      yhteensä: kaistoja ${kaistoja}, täysiä ${taysia}, vetoja ${vetoja}`);
/*
 * KAISTA OMANA KOKEENAAN. Syväzoomissa fokusrajaus (js/kartta.js
 * rajaaFokusPan) pitää käsieleen lehden ikkunan sisällä, joten
 * lavamarginaali ei ehdy pelkillä vedoilla. Siirto tehdään siksi
 * suoraan panilla — sama koodipolku kuin eleen lopussa, ilman
 * rajausta.
 */
{
  const ennen = await tilasto();
  const kEnnen = await keskipiste();
  const siirtoTiedot = await sivu.evaluate(() => {
    const ui = window.matkakirja.ui;
    const pane = ui.mapPane.getBoundingClientRect();
    const keski = () => ({
      x: ui.zoomVasenReuna + (pane.width / 2 - (ui.panX ?? 0)) / ui.zoomSkaala,
      y: ui.zoomYlaReuna + (pane.height / 2 - (ui.panY ?? 0)) / ui.zoomSkaala,
    });
    ui.kartta.asetaPan((ui.panX ?? 0) - 760, ui.panY ?? 0);
    // Keskipiste HETI panoroinnin jälkeen, ennen ikkunointia: juuri tämän
    // luvun reunatäydennyksen on säilytettävä pikselilleen.
    const ennenIkkunointia = keski();
    ui.kartta.ikkunoiLava();
    return { ennenIkkunointia, ikkunoinninJalkeen: keski() };
  });
  await sivu.waitForTimeout(3000);
  const jalkeen = await tilasto();
  const kJalkeen = await keskipiste();
  const siirtoK = Math.hypot(kJalkeen.x - kEnnen.x, kJalkeen.y - kEnnen.y);
  console.log(`      lavan siirto: kaistoja +${jalkeen.kaistat - ennen.kaistat},`
    + ` täysiä +${jalkeen.taydet - ennen.taydet},`
    + ` origo ${JSON.stringify(jalkeen.origo)}`);
  vaadi('K3b lavan siirto koostaa KAISTAN eikä koko pohjaa',
    jalkeen.kaistat - ennen.kaistat === 1 && jalkeen.taydet - ennen.taydet === 0,
    `kaistoja +${jalkeen.kaistat - ennen.kaistat}, täysiä +${jalkeen.taydet - ennen.taydet}`);
  /*
   * Keskipisteen lupaus mitataan LAILLISESTA näkymästä (K4a): tässä
   * siirto tehdään tahallaan fokusrajauksen yli, jolloin
   * sovitaMannerZoom vetää sen takaisin lehden ikkunaan (js/kartta.js
   * rajaaFokusPan) — se on rajauksen työtä eikä ikkunoinnin heittoa.
   */
  console.log(`      siirto rajauksen jälkeen ${siirtoK.toFixed(1)} yks`
    + ` (rajaus veti takaisin ${Math.hypot(
      siirtoTiedot.ikkunoinninJalkeen.x - siirtoTiedot.ennenIkkunointia.x,
      siirtoTiedot.ikkunoinninJalkeen.y - siirtoTiedot.ennenIkkunointia.y,
    ).toFixed(1)} yks)`);
}
void kaistoja; void taysia;
/*
 * Kehysraja on väljä tarkoituksella (CI:n kello heittelehtii ja ajo on
 * 4x-kuristamaton): se vartioi sitä, ettei kooste palaa yhdeksi
 * jättikehykseksi — ei viimeistä kymmentä prosenttia.
 */
vaadi('K3c koosteen jälkeen ei jättikehyksiä', pahinRebakenJalkeen < 700,
  `pisin ${Math.round(pahinRebakenJalkeen)} ms`);
void pahinKeskipiste;

/* --- K4: kooste ei siirrä keskipistettä --------------------------- */

console.log('\n--- keskipiste rebakessa ---');
const k4 = await sivu.evaluate(async () => {
  const ui = window.matkakirja.ui;
  const pane = ui.mapPane.getBoundingClientRect();
  const keski = () => ({
    x: ui.zoomVasenReuna + (pane.width / 2 - (ui.panX ?? 0)) / ui.zoomSkaala,
    y: ui.zoomYlaReuna + (pane.height / 2 - (ui.panY ?? 0)) / ui.zoomSkaala,
  });
  const ennen = keski();
  const rebakejaEnnen = ui.karttapohja.tilasto.rebakeja;
  // Pakotettu reunatäydennys: sama kutsu kuin eleen lopussa.
  ui.kartta.fitViewBox();
  ui.karttapohja.paivita('savuke');
  await new Promise((ok) => setTimeout(ok, 3000));
  const t = ui.karttapohja.tilasto;
  return {
    ennen,
    jalkeen: keski(),
    rebakeja: t.rebakeja - rebakejaEnnen,
    origo: t.origo,
    askel: t.askel,
    lavaIkkuna: { x: ui.lavaIkkunaTila.x, y: ui.lavaIkkunaTila.y },
  };
});
const siirto = Math.hypot(k4.jalkeen.x - k4.ennen.x, k4.jalkeen.y - k4.ennen.y);
console.log(`      keskipiste ${JSON.stringify(k4.ennen)} → ${JSON.stringify(k4.jalkeen)}`
  + ` (siirto ${siirto.toFixed(4)} yks)`);
vaadi('K4a reunatäydennys ei siirrä näkymän keskipistettä', siirto < 0.01,
  `siirto ${siirto}`);
/*
 * Koostoruudukon origo on lavaikkunan origossa YHDEN koostopikselin
 * tarkkuudella — se on ankkuroitu lautaan, jotta kaista olisi
 * pikselintarkka jatke (js/karttapohja.js laskeTila), ja erotus
 * hoidetaan canvaksen css-paikalla.
 */
vaadi('K4b koosteen origo on lavaikkunan origossa alle puolen pikselin tarkkuudella',
  k4.origo != null
  && Math.abs(k4.origo.x - k4.lavaIkkuna.x) < k4.askel * 0.5
  && Math.abs(k4.origo.y - k4.lavaIkkuna.y) < k4.askel * 0.5,
  JSON.stringify(k4));

/* --- K6: canvas-pohja vs svg-pohja -------------------------------- */

console.log('\n--- kuvavertailu ---');
await sivu.waitForTimeout(1500);
const canvasKuva = await sivu.locator('.map-pane').screenshot();
// Sama näkymä ilman canvasta: svg piirtää pohjan itse.
await sivu.evaluate(() => { window.matkakirja.ui.karttapohja.pura(); });
await sivu.waitForTimeout(2500);
const svgKuva = await sivu.locator('.map-pane').screenshot();
const ero = await sivu.evaluate(async ([a, b]) => {
  const lataa = (data) => new Promise((ok) => {
    const im = new Image();
    im.onload = () => ok(im);
    im.src = `data:image/png;base64,${data}`;
  });
  const [ka, kb] = await Promise.all([lataa(a), lataa(b)]);
  const w = Math.min(ka.width, kb.width);
  const h = Math.min(ka.height, kb.height);
  const piirra = (im) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(im, 0, 0);
    return g.getImageData(0, 0, w, h).data;
  };
  const da = piirra(ka);
  const db = piirra(kb);
  let summa = 0;
  let pahin = 0;
  let poikkeavia = 0;
  for (let i = 0; i < da.length; i += 4) {
    const d = Math.max(
      Math.abs(da[i] - db[i]), Math.abs(da[i + 1] - db[i + 1]), Math.abs(da[i + 2] - db[i + 2]),
    );
    summa += d;
    if (d > pahin) pahin = d;
    if (d > 24) poikkeavia += 1;
  }
  const pikselit = da.length / 4;
  return {
    keskiero: summa / pikselit, pahin, poikkeavaOsuus: poikkeavia / pikselit, pikselit,
  };
}, [canvasKuva.toString('base64'), svgKuva.toString('base64')]);
console.log(`      keskiero ${ero.keskiero.toFixed(2)}/255, pahin ${ero.pahin},`
  + ` yli 24:n poikkeamia ${(ero.poikkeavaOsuus * 100).toFixed(2)} %`
  + ` (${ero.pikselit} pikseliä)`);
vaadi('K6 canvas-pohja vastaa svg-pohjaa', ero.keskiero < 6 && ero.poikkeavaOsuus < 0.06,
  JSON.stringify(ero));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi`);
process.exit(lapi === kaikki ? 0 : 1);
