/*
 * SELAINSAVUKE: AIKAJANALINSSI (keksinnöt Euroopassa).
 *
 *   node tools/savukkeet/savuke-aikajana.mjs                 (?lauta=kartta)
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-aikajana.mjs --lauta pallo
 *
 * PALLOLAUTA (aalto 2A, docs/moduulit/karttapallo.md luku 10.1):
 * `--lauta pallo` avaa pelin karttapallolla (Globe.gl ämpäristä Noden
 * fetchin kautta kuten savuke-pallolauta) ja valitsee linssin LAUKUSTA
 * (ui.valitseLinssi('keksinnot')). AIKAJANA PIIRTYY NYT PALLON PINNALLE
 * eikä linssikarttaan: valot ovat laudan linssiapurin merkkejä
 * (`linssit.merkit('aikajana', …)` — js/aikajana.js PALLON_OSA),
 * tummennus on ruutukalvo (`.pallolauta-kalvo`), ja kello, karuselli ja
 * ilmiöpaneeli asuvat karttaruudussa pallon päällä. Tasokartta EI herää:
 * svg#board pysyy tyhjänä ja ui.kartta.lepotila totena koko ajon.
 * Lopuksi aikajanan Sulje purkaa pallolinssin (ui.pallolinssi null,
 * aikajana-merkkejä 0, ruutukalvo poissa) ja pallo jää lautana näkyviin.
 * Ennen aaltoa 2A tämä savuke odotti linssikartan kuorta; se vartio on
 * korvattu näillä (5.9.2026).
 *
 * Yksikkötestit näkevät tahdin ja datan (tests/aikajana.test.mjs),
 * mutta eivät sitä, nouseeko kello ruudulle, syttyykö valo SVG:hen ja
 * liukuvatko kortit. Ne mitataan tässä nopeutetulla tahdilla: sivu
 * ajaa aikajanaa oikealla moottorilla, mutta vuosi kestää muutaman
 * millisekunnin, jotta koko kaari ehtii minuutissa.
 *
 * VÄITTEET:
 *   0. Avausjakso (omistaja 4.9.2026: musta, otsikko, Käynnistä) on
 *      pystyssä; Käynnistä-nappi aloittaa ajon. Ilman painallusta kello
 *      ei kulje — savuke painaa sen kuten pelaaja.
 *   1. Kehittäjävalikon nappi käynnistää aikajanan: kello, nauha ja
 *      valokerros ovat DOMissa, body.aikajana-paalla, ja ajo tietää
 *      oman musiikkilajinsa (aanet/linssi-keksinnot.mp3 ei ole
 *      savukkeen ulottuvilla: ulkoiset osoitteet katkaistaan, ja
 *      puuttuva raita on normaali hiljainen tila).
 *   2. Kamera: tasokartalla koko kaari (Lontoo ja Pietari näkyvissä),
 *      pallolla ensimmäisen lampun lähikuva (js/aikajana.js sovitaAlkuun).
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
 *   7. Sulje purkaa kaiken: ei kelloa, ei valoja, ei body-luokkaa
 *      (pallolla purku on siirtymän mittainen, joten sitä odotetaan).
 *   8. Ei sivuvirheitä.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const LAUTA = (() => { const i = process.argv.indexOf('--lauta'); return i > 0 && process.argv[i + 1] === 'pallo' ? 'pallo' : 'kartta'; })();
const PALLOLLA = LAUTA === 'pallo';
/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1) — vain pallolaudalla. */
const AMPARI_VALIMUISTI = new Map();
async function ampariHaku(url) {
  if (AMPARI_VALIMUISTI.has(url)) return AMPARI_VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI_VALIMUISTI.set(url, lupaus);
  return lupaus;
}
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
  // Nopeutettu tahti: vuosi 6 ms, viive 700 ms, paalu 60 ms. Luennan
  // katto 300 ms: kertojan ääni ei lataudu savukkeessa (ulkoiset
  // osoitteet katkaistu), ja kello pidättäisi muuten jokaista pysäkkiä
  // LUENNAN_PISIN_MS (14 s) — kaari ei ehtisi minuutissa.
  if (suhteellinen === 'js/aikajana.js') {
    sisalto = String(sisalto)
      .replace('export const AIKAJANA_VUOSI_MS = 260;', 'export const AIKAJANA_VUOSI_MS = 6;')
      .replace('export const AIKAJANA_VIIVE_MS = 4600;', 'export const AIKAJANA_VIIVE_MS = 700;')
      .replace('export const AIKAJANA_PAALU_MS = 3200;', 'export const AIKAJANA_PAALU_MS = 60;')
      .replace('export const LUENNAN_PISIN_MS = 14000;', 'export const LUENNAN_PISIN_MS = 300;');
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
if (PALLOLLA) {
  /*
   * Jälkimmäinen reitti voittaa: Globe.gl, laattaluettelo ja laatat
   * ämpäristä. ÄMPÄRIN OSOITE ON media.matkakirja.app, EI pub-*.r2.dev
   * (sama korjaus kuin savuke-avauslento.mjs:ssä 6.9.2026): pelkkä
   * r2.dev-reitti päästi kaiken ämpäriliikenteen selaimen omaan
   * verkkoon, joka kaatui, eikä palloa koskaan rakennettu. CORS-otsake
   * on pakollinen, koska laatat ladataan THREE:n tekstuurina.
   */
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
}
const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

await sivu.goto(`http://127.0.0.1:8741/index.html?lauta=${LAUTA}`, { waitUntil: 'load' });
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
if (PALLOLLA) {
  const pallo = await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  vaadi('pallolauta avautuu (?lauta=pallo, ämpäri Noden kautta)', pallo, 'ui.pallolauta ei syntynyt 45 s:ssa');
  await sivu.waitForTimeout(1500);
}

/* 1. Käynnistys: kartalla kehittäjänapista, pallolla laukun linssinä (pallon pinnalle) */
const kaynnistys = await sivu.evaluate(async (pallolla) => {
  const { ui } = window.matkakirja;
  ui.busy = false;
  let lahti = false;
  if (pallolla) {
    // Laukun tie vaatii omistuksen: ilman sitä valitsimen tahdistus
    // (paivitaLinssit) sammuttaisi omistamattoman linssin heti.
    if (!ui.game.player.linssit.includes('keksinnot')) ui.game.player.linssit.push('keksinnot');
    ui.valitseLinssi('keksinnot');
    for (let i = 0; i < 400; i += 1) {
      if (ui.aikajana) { lahti = true; break; }
      await new Promise((r) => setTimeout(r, 25));
    }
  } else {
    lahti = await ui.kaynnistaAikajana('keksinnot');
  }
  await new Promise((r) => setTimeout(r, 300));
  const kuori = document.querySelector('.pallo-kuori.pallolauta');
  const merkit = pallolla ? (ui.pallonInstanssi?.htmlElementsData?.() ?? []) : [];
  return {
    lahti,
    /*
     * PALLOLLA (aalto 2A): linssi on pallon oma, ei linssikartan kuori.
     * Valot ovat merkkikerroksessa avaimella `aikajana:<i>`, tummennus
     * on ruutukalvo, tasokartta nukkuu ja pallo pysyy näkyvissä.
     */
    pallolinssi: ui.pallolinssi?.tunnus ?? null,
    linssikartta: Boolean(ui.linssikartta),
    lepotila: ui.kartta.lepotila,
    svgLapsia: document.querySelectorAll('#board *').length,
    palloMerkkeja: merkit.filter((d) => String(d.avain ?? '').startsWith('aikajana:')).length,
    ruutukalvo: document.querySelectorAll('.pallolauta-kalvo').length,
    kuoriNakyy: Boolean(kuori) && !kuori.hidden && !kuori.classList.contains('linssin-alla'),
    karttaruudussa: ui.mapPane.contains(document.querySelector('.aikajana')),
    kello: Boolean(document.querySelector('.aikajana-kello')),
    nauha: document.querySelectorAll('.aikajana-kortti').length,
    valoja: document.querySelectorAll('.aikajana-valo').length,
    luokka: document.body.classList.contains('aikajana-paalla'),
    lauta: ui.game.pack.id,
    musiikki: ui.aikajana?.musiikkiLaji ?? null,
  };
}, PALLOLLA);
vaadi('aikajana käynnistyy: kello, nauha, valokerros ja oma musiikkilaji',
  kaynnistys.lahti && kaynnistys.kello && kaynnistys.nauha === 26 && kaynnistys.valoja === 25
    && kaynnistys.luokka && kaynnistys.musiikki === 'keksinnot',
  JSON.stringify(kaynnistys));
if (PALLOLLA) {
  vaadi('pallolaudalla aikajana piirtyy pallolle: valot merkkeinä (25), ruutukalvo, kello karttaruudussa, linssikarttaa ei avata',
    kaynnistys.pallolinssi === 'keksinnot' && !kaynnistys.linssikartta
      && kaynnistys.lepotila === true && kaynnistys.svgLapsia === 0
      && kaynnistys.palloMerkkeja === 25 && kaynnistys.ruutukalvo === 1
      && kaynnistys.kuoriNakyy && kaynnistys.karttaruudussa,
    JSON.stringify(kaynnistys));
}

/* 0. Avausjakso: Käynnistä aloittaa ajon (omistaja 4.9.2026). */
const avaus = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const kesken = Boolean(ui.aikajana?.avausKesken);
  const nappi = document.querySelector('.aikajana-avaus-nappi');
  nappi?.click();
  await new Promise((r) => setTimeout(r, 400));
  return { kesken, nappi: Boolean(nappi), jatkuu: ui.aikajana?.avausKesken === false };
});
vaadi('avausjakso: Käynnistä-nappi on ruudulla ja aloittaa ajon', avaus.kesken && avaus.nappi && avaus.jatkuu, JSON.stringify(avaus));

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
// Kortissa on vain nimi (v1637: vuosi on kellossa ja paneelin kuvatekstissä).
vaadi('ensimmäinen tapahtuma: Watt syttyy, kortti ja paneeli täsmäävät',
  eka.i === 0 && eka.palaa === 1 && /Watt/.test(eka.kortti)
    && /Montgolfier/.test(eka.seuraava) && /lauhdut/i.test(eka.paneeli) && eka.kello === 'Vuosi 1769',
  JSON.stringify(eka).slice(0, 300));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-watt.png') });

/* 3b. Karuselli keskivaiheilla kaarta (omistajan tilaus 3.9.2026) */
const karuselli = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  ui.aikajana.napautaKorttia(5);
  ui.aikajana.pysayta();
  /*
   * Korttien liuku odotetaan LOPPUUN, ei kiinteää aikaa: kontin
   * ohjelmisto-WebGL piirtää pallon 1–2 kehystä sekunnissa, ja 900 ms
   * jälkeen nykyinen kortti oli pallolla vielä 410 px sivussa (mitattu
   * 6.9.2026). Kaksi samaa lukemaa peräkkäin = liuku on ohi.
   */
  let edellinenX = null;
  for (let k = 0; k < 40; k += 1) {
    await new Promise((r) => setTimeout(r, 250));
    const r = document.querySelector('.aikajana-kortti.nykyinen')?.getBoundingClientRect();
    const x = r ? r.left + r.width / 2 : null;
    if (x !== null && edellinenX !== null && Math.abs(x - edellinenX) < 0.5 && k >= 2) break;
    edellinenX = x;
  }
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
    // v1637: korttien blur poistettiin (css/aikajana.css: blur laskettiin
    // joka kehykselle). Menneet ovat tarkkoja siinä kuin tulevatkin.
    kaikkiTarkkoja: [...menneet, ...tulevat].every((k) => Number(k.sumea) === 0),
  };
});
vaadi('karuselli: nykyinen keskellä, menneet vasemmalla, tulevat oikealla, sivut pieninä ja tarkkoina',
  karuselli.i === 5 && karuselli.keskella < 2 && karuselli.leikkaus >= 0
    && karuselli.menneita >= 3 && karuselli.tulevia >= 3
    && karuselli.menneetVasemmalla && karuselli.tulevatOikealla && karuselli.sivutPienempia
    && karuselli.kaikkiTarkkoja
    && karuselli.nauhanLeveys === karuselli.ruutu,
  JSON.stringify(karuselli));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-karuselli.png') });
await sivu.evaluate(() => window.matkakirja.ui.aikajana.alusta());
await sivu.waitForTimeout(600);

/* 2. Kamera Euroopassa (odotetaan kamera-ajo loppuun) */
await sivu.waitForTimeout(1600);
const kamera = await sivu.evaluate(async () => {
  const { ui, game } = window.matkakirja;
  /*
   * AJO ODOTETAAN LOPPUUN, EI KELLOSTA. Pallolaudalla kaaren kamera-ajo
   * on laudan oma liuku (js/pallolauta/kamera.js) ja kontin ohjelmisto-
   * WebGL piirtää sen hitaammin kuin tasokartta: kiinteä odotus mittasi
   * kesken lentoa olevan näkymän, jolloin kaaren pohjoisin kaupunki oli
   * vielä kuvan ulkopuolella. Näkymän annetaan pysähtyä (kaksi samaa
   * lukemaa peräkkäin) ennen mittausta.
   */
  const lue = () => {
    const a = ui.nakyvaAlue();
    return { x: a.x, y: a.y, skaala: a.skaala };
  };
  let edellinen = lue();
  let alue = edellinen;
  for (let i = 0; i < 60; i += 1) {
    await new Promise((r) => setTimeout(r, 150));
    alue = lue();
    const paikallaan = Math.abs(alue.x - edellinen.x) < 1 && Math.abs(alue.y - edellinen.y) < 1
      && Math.abs(alue.skaala - edellinen.skaala) < 1e-4;
    if (paikallaan && i > 0) break;
    edellinen = alue;
  }
  const w = ui.mapPane.clientWidth / alue.skaala;
  const h = ui.mapPane.clientHeight / alue.skaala;
  const kuvassa = (x, y) => x >= alue.x && x <= alue.x + w && y >= alue.y && y <= alue.y + h;
  const kaupunki = (id) => {
    const c = game.pack.cities.find((k) => k.id === id);
    return Boolean(c) && kuvassa(c.x, c.y);
  };
  // Pallolla ajo alkaa ENSIMMÄISEN lampun yltä lähikuvassa (omistaja
  // 5.9.2026: *"zoomaa maapallo näin lähelle"*, js/aikajana.js
  // sovitaAlkuun) — koko kaaren rajaus on tasokartan näkymä.
  const eka = ui.aikajana?.tapahtumat?.find((t) => Number.isFinite(t.x) && Number.isFinite(t.y)) ?? null;
  return {
    lontoo: kaupunki('lontoo'),
    pietari: kaupunki('pietari'),
    ekaLamppuKuvassa: Boolean(eka) && kuvassa(eka.x, eka.y),
    lahikuva: w < 900,
    leveys: Math.round(w),
    alue: { x: Math.round(alue.x), y: Math.round(alue.y), skaala: alue.skaala },
  };
});
if (PALLOLLA) {
  /*
   * PALLON ALKUNÄKYMÄ ON LÄHIKUVA, EI KOKO KAARI. Vaatimus on siksi
   * lähikuva; lampun tarkkaa paikkaa EI vaadita, koska pallon
   * `nakyvaAlue()` on suorakulmainen arvio pallopinnan näkymästä ja
   * ajo jättää karusellin tilan alareunaan. Mitattu luku raportoidaan,
   * jotta poikkeama näkyy ilman että vartio väittää siitä liikaa.
   */
  vaadi('kamera on pallon omassa alkunäkymässä: lähikuva eikä koko kaaren rajaus',
    kamera.lahikuva, JSON.stringify(kamera));
  console.log(`INFO  ensimmäinen lamppu näkyvän alueen sisällä: ${kamera.ekaLamppuKuvassa}`
    + ` (näkyvä leveys ${kamera.leveys} lautayksikköä)`);
} else {
  vaadi('kamera sovittaa Euroopan: Lontoo ja Pietari näkyvissä', kamera.lontoo && kamera.pietari, JSON.stringify(kamera));
}

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

/* 5. Kaaren loppu — merkkipaalun välinäytös (omistaja 4.9.2026) jatketaan
   kuten pelaaja painaisi Jatka, ja se kirjataan raporttiin. */
const loppu = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  const valinaytokset = [];
  // 30 s: kaari kestää nopeutetulla tahdilla ~15–25 s (pallolaudalla
  // kontin ohjelmisto-WebGL hidastaa kehyksiä).
  for (let i = 0; i < 600; i += 1) {
    if (ui.aikajana?.loppu) break;
    if (ui.aikajana?.valinaytos) {
      valinaytokset.push(ui.aikajana.tila.i);
      ui.aikajana.jatkaValinaytoksesta();
    }
    await new Promise((r) => setTimeout(r, 50));
  }
  await new Promise((r) => setTimeout(r, 300));
  return {
    valinaytokset,
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
  // Paneeli on v1637:ssä havainnekuva kuvatekstillä (vuosi ◈ otsikko),
  // ei enää henkilörivi: seuraaminen näkyy kuvatekstin otsikosta.
  tila.paneeli = document.querySelector('.aikajana-ilmio-sivu.esilla .aikajana-ilmiokuvateksti-nimi, .aikajana-ilmio-sivu.esilla .aikajana-ilmio-nimi')?.textContent ?? '';
  return tila;
});
vaadi('nykyisen kortin napautus avaa Tiedeliitteen, alanappi selaa edelliseen ja paneeli seuraa',
  juttu.auki && juttu.nimio === 'Tiedeliite' && /Penisilliini/.test(juttu.otsikko) && juttu.kasvoja >= 2
    && juttu.seuraavaPois === true && !juttu.dialogi && /Televisio/.test(juttu.edellinen)
    && /Televisio|Baird/.test(juttu.paneeli),
  JSON.stringify(juttu));
await sivu.screenshot({ path: join(ULOS, 'savuke-aikajana-juttu.png') });

/* 7. Sulje */
const sulku = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  document.getElementById('nahtavyys-dialog')?.close?.();
  ui.pysaytaAikajana();
  /*
   * PURKU ON SIIRTYMÄN MITTAINEN PALLOLLA. Tasokartalla valot ovat
   * svg-kerroksessa ja katoavat samassa kutsussa; pallolla ne ovat
   * laudan linssiapurin merkkejä (aalto 2A), joita kirjasto siirtää
   * ulos pathTransitionDurationin verran. Odotetaan tyhjenemistä sen
   * sijaan että mitattaisiin kiinteän 200 ms:n kohdalta.
   */
  for (let i = 0; i < 60; i += 1) {
    if (!document.querySelectorAll('.aikajana-valo').length) break;
    await new Promise((r) => setTimeout(r, 100));
  }
  return {
    kello: document.querySelectorAll('.aikajana-kello').length,
    valot: document.querySelectorAll('.aikajana-valo').length,
    luokka: document.body.classList.contains('aikajana-paalla'),
    aikajana: Boolean(ui.aikajana),
  };
});
vaadi('sulje purkaa kellon, valot ja body-luokan', sulku.kello === 0 && sulku.valot === 0 && !sulku.luokka && !sulku.aikajana, JSON.stringify(sulku));
if (PALLOLLA) {
  /* 8. Pallolaudalla aikajanan Sulje purkaa pallolinssin: merkit ja
     ruutukalvo pois, pallo jää lautana näkyviin. Purku on siirtymän
     mittainen (`pura` häivyttää kalvon), joten sitä odotetaan. */
  const paluu = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    const merkit = () => (ui.pallonInstanssi?.htmlElementsData?.() ?? [])
      .filter((d) => String(d.avain ?? '').startsWith('aikajana:')).length;
    const odotaPurku = async () => {
      const alku = Date.now();
      for (let i = 0; i < 160; i += 1) {
        const k = document.querySelector('.pallo-kuori.pallolauta');
        if (k && !k.hidden && getComputedStyle(k).opacity === '1'
          && merkit() === 0 && document.querySelectorAll('.pallolauta-kalvo').length === 0) break;
        await new Promise((r) => setTimeout(r, 50));
      }
      return Date.now() - alku;
    };
    const purkuMs = await odotaPurku();
    const kuori = document.querySelector('.pallo-kuori.pallolauta');
    return {
      purkuMs,
      linssi: ui.linssiValittu,
      pallolinssi: ui.pallolinssi?.tunnus ?? null,
      palloMerkkeja: merkit(),
      ruutukalvo: document.querySelectorAll('.pallolauta-kalvo').length,
      linssikartta: Boolean(ui.linssikartta),
      luokka: document.body.classList.contains('linssikartta-auki'),
      svgLapsia: document.querySelectorAll('#board *').length,
      lepotila: ui.kartta.lepotila,
      kuoriNakyy: Boolean(kuori) && !kuori.hidden && getComputedStyle(kuori).opacity === '1',
      kuori: kuori ? { hidden: kuori.hidden, opacity: getComputedStyle(kuori).opacity, luokat: kuori.className } : null,
      kehys: Boolean(document.querySelector('.linssikartta-kehys')),
    };
  });
  vaadi('pallolaudalla aikajanan Sulje purkaa pallolinssin: valinta null, merkit ja ruutukalvo pois, svg#board tyhjä, pallo näkyvissä',
    paluu.linssi === null && paluu.pallolinssi === null && paluu.palloMerkkeja === 0
      && paluu.ruutukalvo === 0 && !paluu.linssikartta && !paluu.luokka && paluu.svgLapsia === 0
      && paluu.lepotila === true && paluu.kuoriNakyy && !paluu.kehys,
    JSON.stringify(paluu));
}

vaadi('ei sivuvirheitä', virheet.length === 0, virheet.join(' | ').slice(0, 300));

await selain.close();
palvelin.close();
const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatui.length ? 1 : 0);
