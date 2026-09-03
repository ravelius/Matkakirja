/*
 * SELAINSAVUKE: AIKAJANALINSSI (keksinnöt Euroopassa).
 *
 *   node tools/savukkeet/savuke-aikajana.mjs
 *
 * Yksikkötestit näkevät tahdin ja datan (tests/aikajana.test.mjs),
 * mutta eivät sitä, nouseeko kello ruudulle, syttyykö valo SVG:hen ja
 * liukuvatko kortit. Ne mitataan tässä nopeutetulla tahdilla: sivu
 * ajaa aikajanaa oikealla moottorilla, mutta vuosi kestää muutaman
 * millisekunnin, jotta koko kaari ehtii minuutissa.
 *
 * VÄITTEET:
 *   1. Kehittäjävalikon nappi käynnistää aikajanan: kello, nauha ja
 *      valokerros ovat DOMissa, body.aikajana-paalla, ja ajo tietää
 *      oman musiikkilajinsa (aanet/linssi-keksinnot.mp3 ei ole
 *      savukkeen ulottuvilla: ulkoiset osoitteet katkaistaan, ja
 *      puuttuva raita on normaali hiljainen tila).
 *   2. Kamera on Euroopassa (näkyvä alue sisältää Lontoon ja Pietarin).
 *   3. Ensimmäinen tapahtuma syttyy: yksi valo palaa, nykyinen kortti
 *      on Watt, ilmiöpaneelissa Wattin nimi ja selite.
 *   3b. KARUSELLI keskivaiheilla kaarta (omistaja 3.9.2026): nauha
 *      täyttää ruudun leveyden, nykyinen kortti on keskellä, menneet
 *      ovat vasemmalla sumeina ja tulevat oikealla tarkkoina — ja
 *      kaikki sivukortit merkittävästi pienempiä. Sama mittaus
 *      vartioi sitä, ettei kortti leikkaudu nauhan yläreunasta.
 *   4. Kellon napautus pysäyttää; toinen jatkaa.
 *   5. Kaaren lopussa kaikki valot palavat ja loppusanat näkyvät.
 *   6. Nykyisen kortin napautus avaa nähtävyysdialogin jutulla.
 *   7. Sulje purkaa kaiken: ei kelloa, ei valoja, ei body-luokkaa.
 *   8. Ei sivuvirheitä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  let sisalto = readFileSync(polku);
  // Nopeutettu tahti: vuosi 6 ms, viive 700 ms, paalu 60 ms.
  if (suhteellinen === 'js/aikajana.js') {
    sisalto = String(sisalto)
      .replace('export const AIKAJANA_VUOSI_MS = 260;', 'export const AIKAJANA_VUOSI_MS = 6;')
      .replace('export const AIKAJANA_VIIVE_MS = 4600;', 'export const AIKAJANA_VIIVE_MS = 700;')
      .replace('export const AIKAJANA_PAALU_MS = 3200;', 'export const AIKAJANA_PAALU_MS = 60;');
  }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(sisalto);
});
await new Promise((r) => palvelin.listen(8741, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({ viewport: { width: 1280, height: 800 }, serviceWorkers: 'block' });
const sivu = await ctx.newPage();
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

await sivu.goto('http://127.0.0.1:8741/index.html', { waitUntil: 'load' });
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
});
await sivu.waitForTimeout(2500);
await sivu.evaluate(() => {
  const { game, ui } = window.matkakirja;
  if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
  game.player.pos = { type: 'city', city: 'ateena' };
  game.world.visited.add('ateena');
  game.phase = 'action';
  ui.render();
});
await sivu.waitForTimeout(1200);

/* 1. Käynnistys kehittäjänapista */
const kaynnistys = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.busy = false;
  const lahti = await ui.kaynnistaAikajana('keksinnot');
  await new Promise((r) => setTimeout(r, 300));
  return {
    lahti,
    kello: Boolean(document.querySelector('.aikajana-kello')),
    nauha: document.querySelectorAll('.aikajana-kortti').length,
    valoja: document.querySelectorAll('.aikajana-valo').length,
    luokka: document.body.classList.contains('aikajana-paalla'),
    lauta: ui.game.pack.id,
    musiikki: ui.aikajana?.musiikkiLaji ?? null,
  };
});
vaadi('aikajana käynnistyy: kello, nauha, valokerros ja oma musiikkilaji',
  kaynnistys.lahti && kaynnistys.kello && kaynnistys.nauha === 26 && kaynnistys.valoja === 25
    && kaynnistys.luokka && kaynnistys.musiikki === 'keksinnot',
  JSON.stringify(kaynnistys));

/* 3. Ensimmäinen tapahtuma */
const eka = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  for (let i = 0; i < 300; i += 1) {
    if (ui.aikajana?.tila.i >= 0) { ui.aikajana.pysayta(); break; }
    await new Promise((r) => setTimeout(r, 15));
  }
  await new Promise((r) => setTimeout(r, 200));
  const nykyinen = document.querySelector('.aikajana-kortti.nykyinen');
  return {
    i: ui.aikajana.tila.i,
    palaa: document.querySelectorAll('.aikajana-valo.palaa').length,
    kortti: nykyinen?.textContent ?? '',
    // Karusellissa tulevat ovat oikealla DOM-järjestyksessä, joten
    // ensimmäinen .tuleva on seuraava pysäkki.
    seuraava: document.querySelector('.aikajana-kortti.tuleva')?.textContent ?? '',
    paneeli: document.querySelector('.aikajana-ilmio-sivu.esilla')?.textContent ?? '',
    kello: document.querySelector('.aikajana-kello')?.getAttribute('aria-label'),
    kuvia: document.querySelectorAll('.aikajana-kortti.nykyinen img').length,
  };
});
vaadi('ensimmäinen tapahtuma: Watt syttyy, kortti ja paneeli täsmäävät',
  eka.i === 0 && eka.palaa === 1 && /Watt/.test(eka.kortti) && /1769/.test(eka.kortti)
    && /Montgolfier/.test(eka.seuraava) && /lauhdut/i.test(eka.paneeli) && eka.kello === 'Vuosi 1769',
  JSON.stringify(eka).slice(0, 300));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-watt.png') });

/* 3b. Karuselli keskivaiheilla kaarta (omistajan tilaus 3.9.2026) */
const karuselli = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.aikajana.napautaKorttia(5);
  ui.aikajana.pysayta();
  await new Promise((r) => setTimeout(r, 900));
  const nauha = document.querySelector('.aikajana-nauha').getBoundingClientRect();
  const keski = nauha.left + nauha.width / 2;
  const tiedot = (valitsin) => [...document.querySelectorAll(valitsin)].map((k) => {
    const r = k.getBoundingClientRect();
    return { x: r.left + r.width / 2, w: r.width, ylin: r.top, sumea: /blur\(([\d.]+)px\)/.exec(getComputedStyle(k).filter)?.[1] ?? '0' };
  });
  const nyk = tiedot('.aikajana-kortti.nykyinen')[0];
  const menneet = tiedot('.aikajana-kortti.mennyt');
  const tulevat = tiedot('.aikajana-kortti.tuleva');
  return {
    i: ui.aikajana.tila.i,
    keskella: Math.abs(nyk.x - keski),
    nauhanLeveys: Math.round(nauha.width),
    ruutu: Math.round(document.querySelector('.aikajana').getBoundingClientRect().width),
    leikkaus: Math.round(nyk.ylin - nauha.top),
    menneita: menneet.length,
    tulevia: tulevat.length,
    menneetVasemmalla: menneet.every((k) => k.x < nyk.x),
    tulevatOikealla: tulevat.every((k) => k.x > nyk.x),
    sivutPienempia: [...menneet, ...tulevat].every((k) => k.w < nyk.w * 0.7),
    menneetSumeita: menneet.every((k) => Number(k.sumea) >= 1.5),
    tulevatTarkkoja: tulevat.every((k) => Number(k.sumea) === 0),
  };
});
vaadi('karuselli: nykyinen keskellä, menneet vasemmalla sumeina, tulevat oikealla tarkkoina',
  karuselli.i === 5 && karuselli.keskella < 2 && karuselli.leikkaus >= 0
    && karuselli.menneita >= 3 && karuselli.tulevia >= 3
    && karuselli.menneetVasemmalla && karuselli.tulevatOikealla && karuselli.sivutPienempia
    && karuselli.menneetSumeita && karuselli.tulevatTarkkoja
    && karuselli.nauhanLeveys === karuselli.ruutu,
  JSON.stringify(karuselli));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-karuselli.png') });
await sivu.evaluate(() => window.matkakirja.ui.aikajana.alusta());
await sivu.waitForTimeout(600);

/* 2. Kamera Euroopassa (odotetaan kamera-ajo) */
await sivu.waitForTimeout(1600);
const kamera = await sivu.evaluate(() => {
  const { ui, game } = window.matkakirja;
  const alue = ui.nakyvaAlue();
  const sisalla = (id) => {
    const c = game.pack.cities.find((k) => k.id === id);
    const w = ui.mapPane.clientWidth / alue.skaala;
    const h = ui.mapPane.clientHeight / alue.skaala;
    return c && c.x >= alue.x && c.x <= alue.x + w && c.y >= alue.y && c.y <= alue.y + h;
  };
  return { lontoo: sisalla('lontoo'), pietari: sisalla('pietari'), alue: { x: Math.round(alue.x), y: Math.round(alue.y), skaala: alue.skaala } };
});
vaadi('kamera sovittaa Euroopan: Lontoo ja Pietari näkyvissä', kamera.lontoo && kamera.pietari, JSON.stringify(kamera));

/* 4. Kellon napautus pysäyttää ja jatkaa */
const tauko = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.aikajana.jatka();
  const a = ui.aikajana.kaynnissa;
  document.querySelector('.aikajana-kello').click();
  const b = ui.aikajana.kaynnissa;
  const luokka = document.querySelector('.aikajana').classList.contains('tauolla');
  document.querySelector('.aikajana-kello').click();
  const c = ui.aikajana.kaynnissa;
  return { a, b, c, luokka, nappi: document.querySelector('.aikajana-nappi')?.textContent };
});
vaadi('kellon napautus pysäyttää ja jatkaa', tauko.a && !tauko.b && tauko.luokka && tauko.c, JSON.stringify(tauko));

/* 5. Kaaren loppu */
const loppu = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  for (let i = 0; i < 400; i += 1) {
    if (ui.aikajana?.loppu) break;
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 300));
  return {
    loppu: ui.aikajana.loppu,
    palaa: document.querySelectorAll('.aikajana-valo.palaa').length,
    lopussa: document.querySelector('.aikajana').classList.contains('lopussa'),
    paneeli: document.querySelector('.aikajana-ilmio-sivu.esilla')?.textContent ?? '',
    kello: document.querySelector('.aikajana-kello')?.getAttribute('aria-label'),
    menneita: document.querySelectorAll('.aikajana-kortti.mennyt').length,
    tulevia: document.querySelectorAll('.aikajana-kortti.tuleva').length,
  };
});
vaadi('kaaren lopussa kaikki 25 valoa palavat ja loppusanat näkyvät',
  loppu.loppu && loppu.palaa === 25 && loppu.lopussa && /Atlantin takana/.test(loppu.paneeli)
    && loppu.kello === 'Vuosi 1928' && loppu.menneita >= 5 && loppu.tulevia === 0,
  JSON.stringify(loppu).slice(0, 300));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-loppu.png') });

/* 6. Kortin napautus avaa Tiedeliitteen (v1495: keksijän lehtisivu
   Lisälehden taitossa, ei nähtävyyskortti) ja alanappi selaa edelliseen */
const juttu = await sivu.evaluate(async () => {
  document.querySelector('.aikajana-kortti.nykyinen')?.click();
  await new Promise((r) => setTimeout(r, 500));
  const kortti = document.querySelector('.tiedeliite-kortti');
  const tila = {
    auki: Boolean(kortti && document.querySelector('.tiedeliite-kerros.tiedeliite-auki')),
    nimio: kortti?.querySelector('.looppi-nimio')?.textContent ?? '',
    otsikko: kortti?.querySelector('.looppi-otsikko')?.textContent ?? '',
    kasvoja: kortti?.querySelectorAll('.tiedeliite-kasvo').length ?? 0,
    seuraavaPois: kortti?.querySelector('.tiedeliite-navinappi.seuraava')?.disabled,
    dialogi: Boolean(document.getElementById('nahtavyys-dialog')?.open),
  };
  kortti?.querySelector('.tiedeliite-navinappi.edellinen')?.click();
  await new Promise((r) => setTimeout(r, 600));
  tila.edellinen = document.querySelector('.tiedeliite-kortti .looppi-otsikko')?.textContent ?? '';
  tila.paneeli = document.querySelector('.aikajana-ilmio-sivu.esilla .aikajana-ilmio-nimi')?.textContent ?? '';
  return tila;
});
vaadi('nykyisen kortin napautus avaa Tiedeliitteen, alanappi selaa edelliseen ja paneeli seuraa',
  juttu.auki && juttu.nimio === 'Tiedeliite' && /Penisilliini/.test(juttu.otsikko) && juttu.kasvoja >= 2
    && juttu.seuraavaPois === true && !juttu.dialogi && /Televisio/.test(juttu.edellinen)
    && /Baird/.test(juttu.paneeli),
  JSON.stringify(juttu));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-juttu.png') });

/* 7. Sulje */
const sulku = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  document.getElementById('nahtavyys-dialog')?.close?.();
  ui.pysaytaAikajana();
  await new Promise((r) => setTimeout(r, 200));
  return {
    kello: document.querySelectorAll('.aikajana-kello').length,
    valot: document.querySelectorAll('.aikajana-valo').length,
    luokka: document.body.classList.contains('aikajana-paalla'),
    aikajana: Boolean(ui.aikajana),
  };
});
vaadi('sulje purkaa kellon, valot ja body-luokan', sulku.kello === 0 && sulku.valot === 0 && !sulku.luokka && !sulku.aikajana, JSON.stringify(sulku));

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
