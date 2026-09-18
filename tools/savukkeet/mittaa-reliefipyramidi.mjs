/*
 * SELAINSAVUKE: RELIEFIPYRAMIDI TOPOGRAFIALINSSIN ALLA — KYTKIN POIS
 * VS. PÄÄLLÄ, ALPPIEN LÄHIZOOMI, 390 × 844.
 *
 *   PLAYWRIGHT_JS=<repo>/node_modules/playwright/index.js \
 *   CHROMIUM="<...>/Google Chrome for Testing" \
 *   RELIEFIPYRAMIDI_KANSIO=<levyllä oleva pyramidin juuri> \
 *   PORTTI=9121 SELAIN=chromium \
 *     node tools/savukkeet/mittaa-reliefipyramidi.mjs
 *
 * MIKSI OMA SAVUKE EIKÄ savuke-topografialinssi.mjs:n jatke.
 * `savuke-topografialinssi.mjs` on VARTIJA: se mittaa yhden kuvan ja
 * tarkennuslaastarin maailmaa (kaksi ruutua, neljä istuntoa,
 * vastakoe `?tarkennus=0`) ja kaatuu, jos pelin kerroksia näkyy linssin
 * aikana. Tämä on MITTARI: se ajaa saman näkymän kahdesti — kytkin pois
 * ja kytkin päällä — ja tulostaa taulukon, jonka perusteella kytkin
 * joko otetaan oletukseksi tai ei. Kahden erillisen ajon logiikka ei
 * mahdu vartijan runkoon ilman, että vartija muuttuu mittariksi.
 *
 * LAATAT LEVYLTÄ. Reliefipyramidia ei ole vielä viety ämpäriin, joten
 * `RELIEFIPYRAMIDI_KANSIO` osoittaa levyllä olevaan pyramidin juureen
 * (`.../maailma/`, jossa `reliefipyramidi.json` ja `z0…z7`). Peli
 * pyytää laatat ÄMPÄRIN OMASTA polusta
 * `media.matkakirja.app/matkakirja/reliefipyramidi/<versio>/…`
 * (js/reliefipyramidi.js), ja route-välitys vastaa levyltä. Näin
 * mitattava koodipolku on täsmälleen se, joka viennin jälkeen ajetaan
 * — `globalThis.RELIEFIPYRAMIDI_KANSIO`-oikotietä EI käytetä, koska
 * silloin mitattaisiin oikotie eikä tuotantopolku.
 *
 * MITÄ MITATAAN (Fablen erä 3, kohdat a–g):
 *   a) ensimmäinen reliefikehys avauksessa (ms) — kaappaussarjasta:
 *      ensimmäinen kehys, joka on jo asettuneen näkymän värissä.
 *   b) seepiapohjan laattapyyntöjä linssin aikana (tavoite 0 päällä)
 *      — verkkolokista, `julisteet/pyramidi/<versio>/z<n>/…`.
 *   c) reliefilaattapyyntöjä näkyvälle ikkunalle (tavoite ≤ 12).
 *   d) terävyys: gradienttienergia Alppien alueelta (päällä > pois).
 *   e) fps 3 s panoroinnissa (tavoite ≥ 50).
 *   f) meren alue = taustaväri, ei reikiä (patch pallon omista
 *      ruutukoordinaateista, ei arvattu paikka).
 *   g) vaaleaa karttaa ei välähdä: kaappaussarjan kirkkaus ei ylitä
 *      seepiapohjan kirkkautta linssin avauksen jälkeen.
 *
 * WEBKITILLÄ (`SELAIN=webkit`) ajetaan sama runko; kohdat a, b ja f
 * ovat ne, joita sillä vaaditaan — fps ja terävyys ovat Chromiumin
 * luvut, koska WebKitin ohjelmallinen kaappaus ei ole sama piirtopolku.
 */
import { createServer } from 'node:http';
import {
  readFileSync, existsSync, mkdirSync, writeFileSync, statSync,
} from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { decodePng } from './pallon-liike-mittarit.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET
  ?? join(JUURI, 'docs/raportit/kuvat/reliefipyramidi-20260918');
mkdirSync(ULOS, { recursive: true });

const KANSIO = process.env.RELIEFIPYRAMIDI_KANSIO ?? '';
const SELAIN = process.env.SELAIN ?? 'chromium';
const PORTTI = Number(process.env.PORTTI ?? 9121);
/** Avomeren väri, sama vakio kuin js/reliefipyramidi.js MERIVARI. */
const MERIVARI = [38, 78, 145];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/* ------------------------------------------------- paikallinen palvelin */
const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

/* ------------------------------------------------------- ämpäri Nodella */
const AMPARI = new Map();
async function ampariHaku(url) {
  if (AMPARI.has(url)) return AMPARI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI.set(url, lupaus);
  const vastaus = await lupaus;
  if (!vastaus) AMPARI.delete(url);
  return vastaus;
}

/**
 * Reliefipyramidin ämpäripolku levyn tiedostoksi.
 * `…/matkakirja/reliefipyramidi/<versio>/z7/166/21.webp` → `<kansio>/z7/166/21.webp`.
 * Null, jos osoite ei ole reliefipyramidin tai tiedostoa ei ole.
 */
function reliefiLevylta(url) {
  if (!KANSIO) return null;
  const osa = url.split('matkakirja/reliefipyramidi/')[1];
  if (!osa) return null;
  const ilmanVersiota = osa.split('/').slice(1).join('/').split('?')[0];
  if (!ilmanVersiota) return null;
  const polku = join(KANSIO, ilmanVersiota);
  if (!existsSync(polku) || statSync(polku).isDirectory()) return null;
  return polku;
}

/* --------------------------------------------------- kuvan pikselimitat */
/** Ruudun keskiön suorakaide laitepikseleinä. */
const keskio = (kuva, osuus = 0.5) => {
  const x0 = Math.round(kuva.width * (1 - osuus) / 2);
  const y0 = Math.round(kuva.height * (1 - osuus) / 2);
  return { x0, y0, x1: kuva.width - x0, y1: kuva.height - y0 };
};

/** Keskiön keskiväri ja kirkkaus. */
function vari(kuva, alue = keskio(kuva)) {
  let r = 0; let g = 0; let b = 0; let n = 0;
  for (let y = alue.y0; y < alue.y1; y += 2) {
    for (let x = alue.x0; x < alue.x1; x += 2) {
      const i = (y * kuva.width + x) * 4;
      r += kuva.data[i]; g += kuva.data[i + 1]; b += kuva.data[i + 2]; n += 1;
    }
  }
  if (!n) return { r: 0, g: 0, b: 0, L: 0 };
  const m = { r: r / n, g: g / n, b: b / n };
  return { ...m, L: 0.299 * m.r + 0.587 * m.g + 0.114 * m.b };
}

/** Kahden keskivärin etäisyys (euklidinen RGB). */
const variEro = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);

/**
 * Gradienttienergia: reunavoimakkuuden keskiarvo. Sama mitta kuin
 * savuke-topografialinssin `teravyys` — ei kerro kauneudesta mitään,
 * mutta kertoo, onko kuvassa hienojakoista vaihtelua vai puuroa.
 */
function gradientti(kuva, alue = keskio(kuva)) {
  const L = (x, y) => {
    const i = (y * kuva.width + x) * 4;
    return 0.299 * kuva.data[i] + 0.587 * kuva.data[i + 1] + 0.114 * kuva.data[i + 2];
  };
  let s = 0; let n = 0;
  for (let y = alue.y0 + 1; y < alue.y1 - 1; y += 1) {
    for (let x = alue.x0 + 1; x < alue.x1 - 1; x += 1) {
      s += Math.hypot(L(x + 1, y) - L(x - 1, y), L(x, y + 1) - L(x, y - 1));
      n += 1;
    }
  }
  return n ? +(s / n).toFixed(2) : 0;
}

/*
 * MERILAIKUN TILASTOT.
 *
 * KYSYMYS ON REIÄT, EI SÄVY. Taustaväri maalataan kankaalle
 * (js/reliefipyramidi.js MERIVARI), mutta ruudulle se tulee pallon
 * materiaalin ja valaistuksen läpi: mitattu 18.9.2026 Chromiumilla
 * kankaan rgb(38, 78, 145) näkyi ruudulla arvona rgb(48, 72, 104).
 * Siksi mitta on laikun OMA tasaisuus — reikä, sauma tai puuttuva
 * laatta erottuisi ympäristöstään — ja sävy raportoidaan tiedoksi.
 */
function merilaikku(kuva, kx, ky, sade = 18) {
  const x0 = Math.max(0, kx - sade); const x1 = Math.min(kuva.width, kx + sade);
  const y0 = Math.max(0, ky - sade); const y1 = Math.min(kuva.height, ky + sade);
  let n = 0;
  const summa = { r: 0, g: 0, b: 0 };
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const i = (y * kuva.width + x) * 4;
      summa.r += kuva.data[i]; summa.g += kuva.data[i + 1]; summa.b += kuva.data[i + 2];
      n += 1;
    }
  }
  if (!n) return { n: 0, hajonta: 0, reikia: 0, keski: null, eroMerivarista: 0 };
  const keski = [summa.r / n, summa.g / n, summa.b / n];
  let hajonta = 0; let reikia = 0;
  for (let y = y0; y < y1; y += 1) {
    for (let x = x0; x < x1; x += 1) {
      const i = (y * kuva.width + x) * 4;
      const d = Math.hypot(
        kuva.data[i] - keski[0], kuva.data[i + 1] - keski[1], kuva.data[i + 2] - keski[2],
      );
      if (d > hajonta) hajonta = d;
      // Reikä: yli 30 yksikköä laikun omasta keskiväristä.
      if (d > 30) reikia += 1;
    }
  }
  return {
    n,
    hajonta: +hajonta.toFixed(1),
    reikia,
    keski: keski.map((v) => Math.round(v)),
    eroMerivarista: +Math.hypot(
      keski[0] - MERIVARI[0], keski[1] - MERIVARI[1], keski[2] - MERIVARI[2],
    ).toFixed(1),
  };
}

/* ------------------------------------------------------------ Playwright */
const pw = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const tyyppi = (pw[SELAIN] ?? pw.default?.[SELAIN]);
if (!tyyppi) throw new Error(`selainta ${SELAIN} ei ole Playwrightissa`);
const asetukset = { args: SELAIN === 'chromium' ? ['--autoplay-policy=no-user-gesture-required'] : undefined };
if (SELAIN === 'chromium' && process.env.CHROMIUM) asetukset.executablePath = process.env.CHROMIUM;
if (SELAIN === 'webkit' && process.env.WEBKIT) asetukset.executablePath = process.env.WEBKIT;
const selain = await tyyppi.launch(asetukset);

const RUUTU = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 };
/** Alppien lähizoomi — sama näkymä kuin savuke-topografialinssin `lahi`. */
const ALPIT = { lat: 45.8, lng: 6.9, altitude: 0.06 };
/** Välimeri Lyoninlahden edustalla: avomerta, jolle ei polteta laattaa. */
const MERI = { lat: 42.4, lng: 5.2, altitude: 0.12 };

/** Onko URL seepiapohjan laatta (ei ranta-, viiva-, nosto- eikä väritaso)? */
const seepiaLaatta = (u) => /julisteet\/pyramidi\/[^/]+\/z\d+\/\d+\/\d+\.\w+/.test(u);
/** Onko URL reliefipyramidin laatta? */
const reliefiLaatta = (u) => /reliefipyramidi\/[^/]+\/z\d+\/\d+\/\d+\.\w+/.test(u);

async function ajaKerta(kytkin) {
  const nimi = kytkin ? 'paalla' : 'pois';
  const virheet = [];
  const pyynnot = [];
  const konteksti = await selain.newContext({ ...RUUTU, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const url = route.request().url();
    const levylta = reliefiLevylta(url);
    if (levylta) {
      route.fulfill({
        status: 200,
        contentType: url.endsWith('.json') ? 'application/json' : 'image/webp',
        body: readFileSync(levylta),
        headers: { 'access-control-allow-origin': '*' },
      });
      return;
    }
    if (/matkakirja\/reliefipyramidi\//.test(url)) {
      // Avomeri: laattaa ei ole poltettu — 404 on oikea vastaus.
      route.fulfill({ status: 404, body: '', headers: { 'access-control-allow-origin': '*' } });
      return;
    }
    const vastaus = await ampariHaku(url);
    if (!vastaus) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('request', (r) => pyynnot.push({ t: Date.now(), url: r.url() }));
  sivu.on('pageerror', (e) => virheet.push(String(e).split('\n')[0]));
  if (process.env.VERKKOLOKI) {
    sivu.on('request', (r) => { if (/reliefipyramidi|julisteet\/pyramidi/.test(r.url())) console.log(`  ${Date.now()} -> ${r.url()}`); });
    sivu.on('requestfailed', (r) => { if (/reliefipyramidi/.test(r.url())) console.log(`  !! ${r.url()} ${r.failure()?.errorText}`); });
    sivu.on('console', (m) => { if (m.type() === 'error') console.log(`  konsoli: ${m.text().slice(0, 160)}`); });
  }

  const kuvaa = async () => decodePng(await sivu.screenshot({ type: 'png' }));

  const osoite = `http://127.0.0.1:${PORTTI}/index.html?lauta=pallo${kytkin ? '&reliefipyramidi=1' : ''}`;
  await sivu.goto(osoite, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    const kaupunki = game.pack.cities.find((c) => c.id === 'pariisi') ?? game.pack.cities[0];
    game.player.pos = { type: 'city', city: kaupunki.id };
    game.world.visited.add(kaupunki.id);
    game.phase = 'action';
    ui.render();
  });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .catch(() => null);
  await sivu.waitForTimeout(2500);

  /* ---- Alppien lähizoomi ENNEN linssiä: avaus mitataan siitä näkymästä,
   *      jossa pelaaja sen tekee, eikä koko pallosta. ------------------ */
  await sivu.evaluate((n) => {
    const lauta = window.matkakirja.ui.pallolauta;
    lauta.kamera?.pysaytaKameraAjo?.();
    lauta.pallo.pointOfView(n, 0);
  }, ALPIT);
  await sivu.waitForTimeout(4000);
  const pohjakuva = await kuvaa();
  const pohjaVari = vari(pohjakuva);
  writeFileSync(join(ULOS, `reliefi-${SELAIN}-${nimi}-ennen-linssia.png`), await sivu.screenshot({ type: 'png' }));

  /* ---- linssi päälle; kaappaussarja 100 ms ------------------------- */
  const t0 = Date.now();
  if (process.env.VERKKOLOKI) console.log(`  === linssi auki, t0 = ${t0}`);
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('topografia')) ui.game.player.linssit.push('topografia');
    await ui.lataaLinssit?.();
    ui.valitseLinssi('topografia');
  });
  const sarja = [];
  while (Date.now() - t0 < 8000) {
    const ms = Date.now() - t0;
    let kuva = null;
    try { kuva = await kuvaa(); } catch { /* kaappaus kesken piirron */ }
    if (kuva) sarja.push({ ms, ...vari(kuva) });
    await sivu.waitForTimeout(60);
  }

  /* ---- asettunut näkymä ------------------------------------------- */
  await sivu.waitForTimeout(4000);
  const asettunut = await kuvaa();
  const asettunutVari = vari(asettunut);
  const teravyys = gradientti(asettunut);
  /*
   * LAATTAKERROKSEN OMA TILA. Ilman tätä mittaus kertoo vain, mitä
   * ruudulla on — ei sitä, MIKSI. Kerroksen mittarit (js/pallolaatat.js)
   * kertovat, onko kerros ylipäätään ajossa, mihin tasoon se osui ja
   * montako laattaa se on koonnut.
   */
  const kerrostila = await sivu.evaluate(() => {
    const k = window.matkakirja?.ui?.pallolauta?.lepokerros?.();
    if (!k) return { puuttuu: true };
    const m = k.mittarit?.() ?? null;
    return m ? {
      tila: m.tila, syy: m.syy, taso: m.taso, laattoja: m.laattoja,
      valmiita: m.valmiita, pyyntoja: m.pyyntoja, lukossa: k.lukossa?.() ?? null,
    } : { mittareitaEi: true };
  });

  writeFileSync(join(ULOS, `reliefi-${SELAIN}-${nimi}-alpit.png`), await sivu.screenshot({ type: 'png' }));

  /*
   * a) ENSIMMÄINEN RELIEFIKEHYS = ensimmäinen kaappaus, joka on jo
   * asettuneen näkymän värissä (ero ≤ 12) EIKÄ ole enää lähtötilanteen
   * seepia. Mitta on tarkoituksella lopputuloksesta taaksepäin: linssin
   * avaus käy läpi odotuspeitteen ja häivytyksen, eikä kumpikaan ole se
   * kehys, jota pelaaja odottaa.
   */
  const ensimmainen = sarja.find((s) => variEro(s, asettunutVari) <= 12
    && variEro(s, pohjaVari) > 6);
  /*
   * g) VÄLÄHDYS: kirkkain kaappaus avauksen jälkeen ennen asettumista.
   * Jos seepiakartta välähtäisi, kirkkaus nousisi pohjan tasolle tai yli
   * — reliefi on selvästi tummempi. Kynnys on pohjan kirkkaus −6.
   */
  const valahdys = sarja.filter((s) => s.ms > 400).reduce((a, s) => Math.max(a, s.L), 0);

  /* ---- b, c: pyynnöt linssin avauksen jälkeen ---------------------- */
  const jalkeen = pyynnot.filter((p) => p.t >= t0);
  const seepiat = [...new Set(jalkeen.filter((p) => seepiaLaatta(p.url)).map((p) => p.url))];
  const reliefit = [...new Set(jalkeen.filter((p) => reliefiLaatta(p.url)).map((p) => p.url))];

  /* ---- e: fps 3 s panoroinnissa ------------------------------------ */
  const fps = await sivu.evaluate(async (n) => {
    const lauta = window.matkakirja.ui.pallolauta;
    const alku = performance.now();
    let kehyksia = 0;
    await new Promise((valmis) => {
      const askel = () => {
        const t = (performance.now() - alku) / 3000;
        kehyksia += 1;
        lauta.pallo.pointOfView({ ...n, lng: n.lng + t * 0.9 }, 0);
        if (t >= 1) { valmis(); return; }
        requestAnimationFrame(askel);
      };
      requestAnimationFrame(askel);
    });
    return +(kehyksia / ((performance.now() - alku) / 1000)).toFixed(1);
  }, ALPIT);

  /* ---- f: meri taustavärinä, ei reikiä ------------------------------ */
  await sivu.evaluate((n) => {
    const lauta = window.matkakirja.ui.pallolauta;
    lauta.kamera?.pysaytaKameraAjo?.();
    lauta.pallo.pointOfView(n, 0);
  }, MERI);
  await sivu.waitForTimeout(6000);
  const merikuva = await kuvaa();
  const meripiste = await sivu.evaluate((n) => {
    const { pallo } = window.matkakirja.ui.pallolauta;
    const p = pallo.getScreenCoords(n.lat, n.lng);
    return { x: p.x, y: p.y, dpr: window.devicePixelRatio };
  }, MERI);
  const meri = merilaikku(
    merikuva, Math.round(meripiste.x * meripiste.dpr), Math.round(meripiste.y * meripiste.dpr),
  );
  writeFileSync(join(ULOS, `reliefi-${SELAIN}-${nimi}-meri.png`), await sivu.screenshot({ type: 'png' }));

  const linssitila = await sivu.evaluate(() => {
    try { return window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.() ?? null; } catch { return null; }
  });

  await konteksti.close();
  return {
    nimi,
    selain: SELAIN,
    ensimmainenMs: ensimmainen?.ms ?? null,
    seepiapyyntoja: seepiat.length,
    reliefipyyntoja: reliefit.length,
    teravyys,
    fps,
    meri,
    pohjaL: +pohjaVari.L.toFixed(1),
    asettunutL: +asettunutVari.L.toFixed(1),
    valahdysL: +valahdys.toFixed(1),
    reliefipyramidiLipussa: linssitila?.reliefipyramidi ?? null,
    kerrostila,
    virheet: virheet.slice(0, 5),
    sarja: sarja.map((s) => ({ ms: s.ms, L: +s.L.toFixed(1) })),
  };
}

const tulokset = [];
const VALITUT = process.env.KYTKIN === 'paalla' ? [true]
  : (process.env.KYTKIN === 'pois' ? [false] : [false, true]);
for (const kytkin of VALITUT) {
  const t = await ajaKerta(kytkin);
  tulokset.push(t);
  console.log(`\n=== ${SELAIN} — kytkin ${t.nimi} ===`);
  console.log(`  a) ensimmäinen reliefikehys  ${t.ensimmainenMs ?? '—'} ms`);
  console.log(`  b) seepiapohjan laattapyyntöjä linssin aikana  ${t.seepiapyyntoja}`);
  console.log(`  c) reliefilaattapyyntöjä  ${t.reliefipyyntoja}`);
  console.log(`  d) gradienttienergia (Alpit)  ${t.teravyys}`);
  console.log(`  e) fps 3 s panoroinnissa  ${t.fps}`);
  console.log(`  f) meri yhtenäinen  reikiä ${t.meri.reikia}/${t.meri.n}, hajonta ${t.meri.hajonta}, keski ${t.meri.keski} (ero MERIVARIin ${t.meri.eroMerivarista})`);
  console.log(`  g) kirkkaus: pohja ${t.pohjaL}, asettunut ${t.asettunutL}, max avauksen jälkeen ${t.valahdysL}`);
  console.log(`  linssin tila.reliefipyramidi = ${t.reliefipyramidiLipussa}`);
  console.log(`  laattakerros: ${JSON.stringify(t.kerrostila)}`);
  if (t.virheet.length) console.log(`  sivuvirheet: ${t.virheet.join(' | ')}`);
}

writeFileSync(join(ULOS, `reliefi-mittaus-${SELAIN}.json`), JSON.stringify(tulokset, null, 1));
console.log(`\nkaappaukset ja JSON: ${ULOS}`);
await selain.close();
palvelin.close();
