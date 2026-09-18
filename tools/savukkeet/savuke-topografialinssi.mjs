/*
 * SELAINSAVUKE: TOPOGRAFIALINSSI — TARKKUUS, TYHJÄ LAUTA, KOKO MAAPALLO.
 *
 *   NODE_USE_ENV_PROXY=1 PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *     node tools/savukkeet/savuke-topografialinssi.mjs
 *
 * OMISTAJAN HAVAINTO 16.9.2026 klo 07.05 UTC (Raamattu,
 * TOPOGRAFIALINSSI: TARKKUUS EI NAY, PELIN ELEMENTIT POIS, KOKO
 * MAAPALLO KATSOTTAVISSA, sanatarkasti): *"Pitäisikö se tarkempi
 * topografialinssi olla jo pelissä? Nyt vielä ei ainakaan näyttänyt
 * olevan, ja siinä näkyy myös kaikkia pelin aikaisia juttuja kartalla,
 * mitkä pitäisivät siis olla pois. Ja topografialinssi kun on päällä,
 * niin huolimatta siitä, onko maailmatila päällä vai pois, niin pelaaja
 * pääsee katsomaan koko maapalloa."*
 *
 * KOLME ASIAA, JOKAINEN MITATAAN EIKÄ KATSOTA.
 *
 * 1. TARKKUUS. Juurisyy oli mitattuna se, että pallo katsoi TOISTA
 *    tiedostoa: 1′-reliefi meni v1917:ssä vain laudan Milleriin
 *    (10800 × 4859), ja pallon oma tasavälinen kuva jäi 4096 × 2048:aan
 *    eli 11,4 pikseliin astetta kohti. Korjaus on tarkennuslaastari
 *    (js/linssit/topografia-tarkennus.js), joka tuo näkyvälle ikkunalle
 *    lähteen oman 30 px/aste -tiheyden. Savuke vaatii, että laastari on
 *    lähizoomissa päällä, että sen kangas on lähteen tiheydessä ja että
 *    laastarin LÄHDE on mitattavasti terävämpi kuin koko pallon kalvon
 *    lähde. Terävyyttä EI mitata koko ruudusta: linssin alla on pelin
 *    oma laattakartta, joka on terävä kummallakin lähteellä ja hukuttaa
 *    eron 0,72-peittävyyden alle (mitattu 16.9.2026: 146,9 vs 148,2 eli
 *    kohinaa). Mitta on siksi samasta ikkunasta samaan kokoon
 *    piirretyissä lähdekuvissa. Vastakoe `?tarkennus=0` varmistaa, että
 *    laastari on se, mikä eron tekee — ja että linssi toimii ilmankin.
 *
 *    HUOM. Tehollinen tarkkuus (lähdepikseliä ruutupikseliä kohti) on
 *    lähizoomilla 0,17 eikä 0,8: aineiston oma katto on 30 px/aste ja
 *    ruudulla on 178 px/aste. 0,8 vaatisi 51 000 pikselin levyisen
 *    tasavälisen kuvan, jota ei ole olemassa eikä mahtuisi
 *    näytönohjaimelle (gl.MAX_TEXTURE_SIZE mitattuna 8192). Vaatimus on
 *    siksi "kaikki mitä lähteessä on" — 2,5-kertainen tiheys entiseen —
 *    ja mitattu terävyys.
 *
 * 2. PELIN ELEMENTIT. Linssin aikana kartalla ei saa näkyä yhtään pelin
 *    kerrosta: nostot, aihemerkit, nimikyltit, kaupunkimerkit, reitti,
 *    pelinappula, pulu, maapaneeli, saapumislappu, Liiku, kohdemaan
 *    korostus ja tasoituskerma. Valitsimet ovat väitteessä näkyvissä.
 *
 * 3. KOKO MAAPALLO. Linssin aikana zoomia ei rajata kohdemaahan:
 *    uloimmassa sallitussa näkymässä koko pallon halkaisija mahtuu
 *    ruudun kapeammalle sivulle. Sulkeminen palauttaa sekä rajat että
 *    kameran (±2 %).
 *
 * KUVAKAAPPAUKSET: topografialinssi-<leveys>-{pallo,lahi}.png kansioon
 * KAAPPAUKSET.
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inflateSync } from 'node:zlib';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/*
 * Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1).
 *
 * EPÄONNISTUNUTTA HAKUA EI MUISTETA. Välimuisti on koko ajon mittainen
 * ja jaettu neljän selainistunnon kesken, joten yksi verkkonykäys
 * ensimmäisessä istunnossa jäisi voimaan loppuun asti: mitattuna
 * 16.9.2026 koko pallon kalvo jäi silloin piirtymättä KOLMEEN
 * istuntoon, ja savuke olisi syyttänyt siitä koodia. Muistiin menee
 * vain onnistunut vastaus.
 */
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

const PORTTI = Number(process.env.PORTTI ?? 8757);
const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(PORTTI, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
/*
 * ══════════════════════════════════════════════════════════════════════
 * SELAINMOOTTORI ON LIPULLA (18.9.2026, erä "reliefin velat")
 * ══════════════════════════════════════════════════════════════════════
 *
 * Sama syy kuin kermalla (tools/savukkeet/savuke-kerma-reuna.mjs):
 * v1942:n kerma oli Chromiumilla oikein mutta omistajan iPhonella
 * (WebKit) rikki, ja vika oli OffscreenCanvasin erossa. Reliefilaatasto
 * kulkee saman kankaan ja saman `createImageBitmap`-polun läpi, joten
 * vain Chromiumilla vartioitu laatasto ei ole vartioitu laatasto.
 *
 * `--webkit` ajaa saman rungon WebKitillä. Kaksi asiaa eroaa, ja
 * molemmat ovat moottorin omia eivätkä pelin:
 *
 *   1. CDP:tä EI OLE. Kaappaus ja kompositorin kehyssarja
 *      (Page.startScreencast) ovat Chromiumin protokollaa. WebKitillä
 *      kaapataan Playwrightin omalla `page.screenshot`illa, ja
 *      avauksen kirkkaussarja otetaan pienestä ruudun keskiöstä
 *      tiheään — se on hitaampi mutta mittaa samaa asiaa.
 *   2. `performance.memory` on Chromiumin oma. WebKitillä JS-muisti
 *      jää nulliksi, ja se KIRJATAAN nullina eikä arvata.
 */
const MOOTTORI = process.argv.includes('--webkit') ? 'webkit' : 'chromium';
const chromium = paketti[MOOTTORI] ?? paketti.default?.[MOOTTORI];
if (!chromium) throw new Error(`selainmoottoria ${MOOTTORI} ei ole Playwrightissa`);
const selain = await (MOOTTORI === 'webkit'
  ? chromium.launch(process.env.WEBKIT ? { executablePath: process.env.WEBKIT } : {})
  : chromium.launch({
    executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
    /*
     * Ilman tätä Chromium ei päästä isoisän luentaa soimaan ilman elettä,
     * eikä luennan tila (pulun pluskupla, luentakuvapakka) synny lainkaan
     * — ja juuri se tila on omistajan vika 16.9.2026 klo 15.30.
     */
    args: ['--autoplay-policy=no-user-gesture-required'],
  }));

/*
 * AJON RAJAUS YMPÄRISTÖMUUTTUJALLA. `VAIHE=avaus` ajaa vain
 * avausmittauksen (390 px, luenta) ja `VAIHE=ruudut` vain kahden ruudun
 * tarkkuusajot. Oletus on koko savuke. Rajaus on mittausta varten:
 * avauksen ajoitusta hiotaan yhtä lukua vastaan, eikä neljää raskasta
 * istuntoa kannata ajaa jokaisen säädön perään — vartijana savuke
 * ajetaan aina kokonaan (sarjat.json ei anna muuttujaa).
 */
const VAIHE = process.env.VAIHE ?? 'kaikki';

/** Omistajan kaksi ruutua: pystypuhelin ja työpöytä. */
const RUUDUT = [
  { nimi: '390', viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 },
  { nimi: '1400', viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
];

/** Globe.gl:n kameran avauskulma (js/pallolauta/kamera.js PALLO_FOV). */
const FOV = 50;
/** Pallokuvan tiheys px/aste (js/linssit/topografia-tarkennus.js). */
const PERUSKUVAN_TIHEYS = 4096 / 360;
/** Millerin 1′-kuvan tiheys px/aste (10800 / 360). */
const LAHTEEN_TIHEYS = 30;

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/* ----------------------------------------------------- PNG:n terävyys */
/*
 * Reunagradienttien keskiarvo ruudun keskiosasta. Sama mitta kuin
 * juurisyyn mittauksessa 16.9.2026: se ei kerro kauneudesta mitään
 * mutta kertoo, onko kuvassa hienojakoista vaihtelua vai venytettyä
 * puuroa — ja juuri se oli omistajan havainto.
 */
function pngRGBA(buf) {
  let i = 8; let w = 0; let h = 0; const idat = [];
  while (i < buf.length) {
    const len = buf.readUInt32BE(i);
    const tyyppi = buf.toString('ascii', i + 4, i + 8);
    const data = buf.subarray(i + 8, i + 8 + len);
    if (tyyppi === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); }
    else if (tyyppi === 'IDAT') idat.push(data);
    else if (tyyppi === 'IEND') break;
    i += 12 + len;
  }
  const raaka = inflateSync(Buffer.concat(idat));
  const bpp = 4; const rivi = w * bpp;
  const ulos = Buffer.alloc(w * h * bpp);
  let p = 0;
  for (let y = 0; y < h; y += 1) {
    const f = raaka[p]; p += 1;
    for (let x = 0; x < rivi; x += 1) {
      const a = x >= bpp ? ulos[y * rivi + x - bpp] : 0;
      const b = y > 0 ? ulos[(y - 1) * rivi + x] : 0;
      const c = (x >= bpp && y > 0) ? ulos[(y - 1) * rivi + x - bpp] : 0;
      const v = raaka[p + x];
      let out = v;
      if (f === 1) out = v + a;
      else if (f === 2) out = v + b;
      else if (f === 3) out = v + ((a + b) >> 1);
      else if (f === 4) {
        const pp = a + b - c;
        const pa = Math.abs(pp - a); const pb = Math.abs(pp - b); const pc = Math.abs(pp - c);
        out = v + (pa <= pb && pa <= pc ? a : (pb <= pc ? b : c));
      }
      ulos[y * rivi + x] = out & 255;
    }
    p += rivi;
  }
  return { w, h, d: ulos };
}
function teravyys(buf, osuus = 0.5) {
  const { w, h, d } = pngRGBA(buf);
  const x0 = Math.round(w * (1 - osuus) / 2); const x1 = w - x0;
  const y0 = Math.round(h * (1 - osuus) / 2); const y1 = h - y0;
  const L = (x, y) => {
    const i = (y * w + x) * 4;
    return 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
  };
  let s = 0; let n = 0;
  for (let y = y0 + 1; y < y1 - 1; y += 1) {
    for (let x = x0 + 1; x < x1 - 1; x += 1) {
      s += Math.hypot(L(x + 1, y) - L(x - 1, y), L(x, y + 1) - L(x, y - 1));
      n += 1;
    }
  }
  return n ? +(s / n).toFixed(3) : 0;
}

/** Pallon halkaisija ruudulla (px) korkeudesta — kamera.js:n kaava. */
const halkaisija = (alt, korkeusPx) => {
  const d = 1 + Math.max(0, Number(alt) || 0);
  const a = Math.asin(Math.min(1, 1 / d));
  return korkeusPx * Math.tan(a) / Math.tan((FOV / 2) * (Math.PI / 180));
};

/** Kerrosten, kameran ja laastarin tila yhdellä luennalla. */
const TILA = `() => {
  const nakyy = (el) => {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.display !== 'none'
      && s.visibility !== 'hidden' && Number(s.opacity) > 0.02;
  };
  const kpl = (sel) => [...document.querySelectorAll(sel)].filter(nakyy).length;
  const ui = window.matkakirja?.ui;
  const lauta = ui?.pallolauta;
  const pallo = lauta?.pallo;
  const vm = lauta?.vektorit?.()?.mittarit?.() ?? null;
  let pisteSkaala = null;
  try {
    const kaup = (pallo?.pointsData?.() ?? []).find((d) => d.laji !== 'helmi' && d.laji !== 'valo');
    pisteSkaala = kaup?.__threeObjPoint?.scale?.x ?? null;
  } catch { /* pisteitä ei vielä ole */ }
  let pxPerAste = null;
  const pov = pallo?.pointOfView?.() ?? null;
  try {
    const a = pallo.getScreenCoords(pov.lat, pov.lng);
    const b = pallo.getScreenCoords(pov.lat, pov.lng + 0.25);
    pxPerAste = Math.hypot(b.x - a.x, b.y - a.y) / 0.25;
  } catch { /* kamera ei vielä pystyssä */ }
  const ohj = pallo?.controls?.();
  const R = pallo?.getGlobeRadius?.() ?? 1;
  return {
    pov,
    pxPerAste,
    kotelo: { w: lauta?.kotelo?.clientWidth ?? 0, h: lauta?.kotelo?.clientHeight ?? 0 },
    rajat: ohj ? { min: ohj.minDistance / R - 1, max: ohj.maxDistance / R - 1 } : null,
    linssi: ui?.pallolinssi?.tunnus ?? null,
    laastari: (() => { try { return ui?.pallolinssi?.kahva?.tila?.() ?? null; } catch { return null; } })(),
    portti: document.body.classList.contains('aikajana-paalla'),
    elementit: {
      nostot: kpl('.pallolauta-nosto'),
      nimet: kpl('.pallolauta-nimi'),
      kaupunkimerkit: kpl('.pallolauta-piste'),
      kohteet: kpl('.pallolauta-kohde'),
      vesinimet: kpl('.pallolauta-vesinimi'),
      nappula: kpl('.pallolauta-nappula'),
      maapaneeli: kpl('.pallolauta-maapaneeli'),
      pulu: kpl('.pollo-nappi'),
      lappu: kpl('.fact-card'),
      liiku: kpl('.toimintorivi .monitoimi-nappi'),
      kartuutsi: kpl('.fokus-kartuutsi'),
    },
    /*
     * ISOT PEITOT — VALITSINLISTAN ULKOPUOLINEN VARTIO.
     *
     * Nimilista löytää vain sen, mitä osataan odottaa. Mitattuna
     * 16.9.2026 kartan päällä oli linssin ajan saapumisen valokuva
     * (.fokusvirta-isokuva, 1077 x 770 px), jota ei ollut yhdelläkään
     * listalla. Tämä laskee KAIKKI näkyvät elementit, jotka peittävät
     * yli 12 % ruudusta — paitsi kartan oma kuori ja pelin sivupalkki,
     * jotka ovat sallittuja.
     */
    isotPeitot: (() => {
      /*
       * RAJAUS ON .stage: siellä asuvat kartta (.map-pane), pelin
       * sivupalkki (.rail) ja niiden VÄLIIN nouseva päällyskerros, johon
       * saapumisen valokuva (.fokusvirta-isokuva) laitetaan
       * (js/fokusvirta.js isokuvanKoti). Kartta ja sivupalkki ovat
       * sallittuja — sivupalkki on se, josta linssi suljetaan — ja
       * kaikki muu iso on peittoa.
       */
      const nayttamo = document.querySelector('.stage');
      if (!nayttamo) return [];
      const lista = [];
      for (const el of nayttamo.querySelectorAll('*')) {
        if (el.closest('.map-pane') || el.closest('.rail')) continue;
        const s2 = getComputedStyle(el);
        if (s2.display === 'none' || s2.visibility === 'hidden' || Number(s2.opacity) < 0.05) continue;
        const r = el.getBoundingClientRect();
        if (r.width * r.height < window.innerWidth * window.innerHeight * 0.12) continue;
        const luokka = el.getAttribute('class') || el.id || '';
        lista.push(el.tagName.toLowerCase() + '.' + luokka.slice(0, 40));
      }
      return lista;
    })(),
    reitteja: (pallo?.pathsData?.() ?? []).filter((d) => !d.linssi).length,
    korostus: vm?.korostus ?? null,
    korostusJanoja: vm?.korostusJanoja ?? 0,
    pisteSkaala,
  };
}`;

/** Onko URL seepiapohjan (julisteet/pyramidi) laatta? */
const seepiaLaatta = (u) => /julisteet\/pyramidi\/[^/]+\/z\d+\/\d+\/\d+\.\w+/.test(u);
/** Onko URL reliefipyramidin laatta? */
const reliefiLaatta = (u) => /reliefipyramidi\/[^/]+\/z\d+\/\d+\/\d+\.\w+/.test(u);

/**
 * Yksi ruutu: peli auki Pariisiin, linssi päälle, mittaukset.
 *
 * `pyramidi = true` on OLETUS eli se, mitä pelaaja saa (Raamattu,
 * ASTRONAUTIN KAMERA LISAYS 16 kohta 49): topografialinssi piirtää
 * reliefipyramidista, eikä koko pallon kalvoa tai tarkennuslaastaria
 * ole lainkaan. `pyramidi = false` (`?reliefipyramidi=0`) on VARALLA
 * oleva vanha maailma — yksi kuva ja laastari — ja se ajetaan
 * vastakokeena, jotta varapolku ei mätäne huomaamatta.
 */
async function ajaRuutu(ruutu, { pyramidi = true } = {}) {
  /* Laastari ja koko pallon kalvo ovat olemassa vain varapolulla. */
  const tarkennus = !pyramidi;
  const virheet = [];
  const pyynnot = [];
  const konteksti = await selain.newContext({ ...ruutu, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  sivu.on('request', (r) => pyynnot.push({ t: Date.now(), url: r.url() }));
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  /*
   * KAAPPAUS MOOTTORIN MUKAAN: Chromiumilla CDP (ei jonota sivun
   * omaa työtä), WebKitillä Playwrightin oma kaappaus.
   */
  const cdp = MOOTTORI === 'webkit' ? null : await konteksti.newCDPSession(sivu);
  const kuvaa = async () => (cdp
    ? Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64')
    : sivu.screenshot({ type: 'png' }));
  const lue = () => sivu.evaluate(`(${TILA})()`);

  const osoite = `http://127.0.0.1:${PORTTI}/index.html?lauta=pallo${pyramidi ? '' : '&reliefipyramidi=0'}`;
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
  await sivu.waitForFunction(
    () => Boolean(window.matkakirja?.ui?.pallolauta?.vektorit?.()?.mittarit?.()?.korostus),
    null, { timeout: 30000 },
  ).catch(() => null);
  await sivu.waitForTimeout(3000);
  const ennen = await lue();

  /* ---- linssi päälle ------------------------------------------------ */
  const t0 = Date.now();
  await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('topografia')) ui.game.player.linssit.push('topografia');
    await ui.lataaLinssit?.();
    ui.valitseLinssi('topografia');
  });
  await sivu.waitForTimeout(4000);
  const avattu = await lue();

  /* ---- lähizoom Alpeille: laastarin oma näkymä ---------------------- */
  await sivu.evaluate(() => {
    const lauta = window.matkakirja.ui.pallolauta;
    lauta.kamera?.pysaytaKameraAjo?.();
    lauta.pallo.pointOfView({ lat: 45.8, lng: 6.9, altitude: 0.06 }, 0);
  });
  /*
   * LINSSIN ON PIIRRETTÄVÄ JOTAIN ENNEN KUIN SITÄ MITATAAN. Ilman
   * laastaria (vastakoe) se on koko pallon kalvo, laastarin kanssa
   * laastari. Odotus on rajattu: jos kumpikaan ei ole näkyvissä 30
   * sekunnissa, seuraavat väitteet kaatuvat kuten kuuluukin. Ilman
   * tätä savuke mittasi ajoittain kesken jäänyttä häivytystä —
   * mitattuna 16.9.2026 kuormitetussa kontissa sivun kehyssilmukka ja
   * ajastimet voivat pysähtyä sekunneiksi kesken linssin avautumisen.
   */
  await sivu.waitForFunction((pyr) => {
    const t = window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.();
    if (!t) return false;
    /*
     * PYRAMIDITILASSA EI OLE KALVOA EIKÄ LAASTARIA (kohta 49), joten
     * vanha ehto ei toteudu koskaan — ja juuri se katkaisi savukkeen
     * 18.9.2026: jokainen tämän tiedoston odotus käveli aikakattoonsa
     * (30 + 120 + 20 s ruutua kohden) ja ajo kuoli 600 sekuntiin
     * kesken. Pyramiditilassa odotetaan sitä, mikä oikeasti piirtää:
     * laattakerros on ajossa ja on koonnut laattoja.
     */
    if (pyr) {
      const m = window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
      return Boolean(t.reliefipyramidi) && (m?.laattoja ?? 0) > 0;
    }
    return t.perusKalvo === true || t.tarkennus?.paalla === true;
  }, pyramidi, { timeout: 30000 }).catch(() => null);

  if (tarkennus) {
    await sivu.waitForFunction(
    () => window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.()?.tarkennus?.paalla === true,
    /*
     * PITKÄ ODOTUS ON TARKOITUKSELLINEN. Laastarin kangas syntyy vasta
     * kun 11,6 Mt:n lähdekuva on haettu ja siitä on purettu kaistale;
     * kuormitetussa kontissa (monta rinnakkaista selainta) se vie
     * kymmeniä sekunteja, oikealla laitteella sekunnin pari. Savuke
     * mittaa lopputuloksen, ei konttia.
     */
    null, { timeout: 120000 },
    ).catch(() => null);
  }
  if (pyramidi) {
    /*
     * Pyramiditilassa lähizoomi mitataan vasta kun laatasto on osunut
     * tarkkaan tasoon (z ≥ 5) — kerros aloittaa karkeasta ja täydentää.
     * Rajattu odotus: jos se ei tapahdu 30 sekunnissa, väitteet
     * kaatuvat kuten kuuluukin.
     */
    await sivu.waitForFunction(() => {
      const m = window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
      return Boolean(m) && (m.taso ?? 0) >= 5 && (m.valmiita ?? 0) > 0;
    }, null, { timeout: 30000 }).catch(() => null);
  }
  await sivu.waitForTimeout(3000);
  const lahi = await lue();
  /*
   * TERÄVYYS MITATAAN SIITÄ, MITÄ LINSSI PIIRTÄÄ — ei koko ruudusta.
   * Ruutukuvassa on linssin alla pelin oma laattakartta, joka on
   * terävä kummallakin lähteellä ja hukuttaa 0,72-peittävyyden alla
   * olevan eron gradienttiin (mitattu 16.9.2026: 146,9 vs 148,2 eli
   * kohinaa). Mitta on siksi LÄHTEISSÄ, samasta ikkunasta ja samaan
   * kokoon piirrettynä: juuri se kuva, jonka laastari tuo tilalle.
   */
  const lahteet = await sivu.evaluate(async (ikkuna) => {
    if (!ikkuna) return null;
    const lataa = (u) => new Promise((ok, ei) => {
      const i = new Image(); i.crossOrigin = 'anonymous';
      i.onload = () => ok(i); i.onerror = () => ei(new Error(u)); i.src = u;
    });
    const gradientti = (ctx, w, h) => {
      const d = ctx.getImageData(0, 0, w, h).data;
      const L = (x, y) => {
        const i = (y * w + x) * 4;
        return 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      };
      let s = 0; let n = 0;
      for (let y = 1; y < h - 1; y += 1) {
        for (let x = 1; x < w - 1; x += 1) {
          s += Math.hypot(L(x + 1, y) - L(x - 1, y), L(x, y + 1) - L(x, y - 1));
          n += 1;
        }
      }
      return n ? +(s / n).toFixed(3) : 0;
    };
    const W = 512;
    const piirra = (kuva, sx, sy, sw, sh) => {
      const c = document.createElement('canvas');
      c.width = W; c.height = W;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(kuva, sx, sy, sw, sh, 0, 0, W, W);
      return { teravyys: gradientti(ctx, W, W), lahdePx: +sw.toFixed(1) };
    };
    const { TOPOGRAFIA_KUVA, TOPOGRAFIA_PALLOKUVA } = await import('/js/packs/linssi-topografia-kuva.js');
    const M = await import('/js/linssit/topografia-tarkennus.js');
    // 1) koko pallon kalvo: tasavälinen kuva, suora asteikko.
    const pallokuva = await lataa(TOPOGRAFIA_PALLOKUVA);
    const px = (lng) => (lng + 180) / 360 * pallokuva.width;
    const py = (lat) => (90 - lat) / 180 * pallokuva.height;
    const vanhaMitta = piirra(
      pallokuva, px(ikkuna.lng0), py(ikkuna.lat1),
      px(ikkuna.lng1) - px(ikkuna.lng0), py(ikkuna.lat0) - py(ikkuna.lat1),
    );
    // 2) laastarin lähde: sama ikkuna Millerin 1′-kuvasta.
    const miller = await lataa(TOPOGRAFIA_KUVA.kuva);
    const r = M.millerRajaus(ikkuna, TOPOGRAFIA_KUVA);
    const uusiMitta = piirra(miller, r.sx, r.sy, r.sw, r.sh);
    return { vanha: vanhaMitta, uusi: uusiMitta };
  }, tarkennus ? (lahi.laastari?.tarkennus?.ikkuna ?? null) : null);
  const lahikuva = await kuvaa();
  writeFileSync(join(ULOS, `topografialinssi-${ruutu.nimi}-lahi${pyramidi ? '' : '-vastakoe'}.png`), lahikuva);
  /*
   * LAATTAKERROKSEN OMA TILA lähizoomista. Ruutukuva kertoo, MITÄ
   * näkyy; kerroksen mittarit kertovat, MISTÄ se tuli — mihin tasoon
   * laatasto osui ja montako laattaa se on koonnut
   * (js/pallolaatat.js, sama luenta kuin mittaa-reliefipyramidi.mjs).
   */
  const kerrosLahi = await sivu.evaluate(() => {
    const k = window.matkakirja?.ui?.pallolauta?.lepokerros?.();
    const m = k?.mittarit?.() ?? null;
    return m ? {
      tila: m.tila, syy: m.syy, taso: m.taso, laattoja: m.laattoja,
      valmiita: m.valmiita, pyyntoja: m.pyyntoja,
    } : null;
  });

  /* ---- uloimpaan sallittuun: mahtuuko koko pallo? ------------------- */
  await sivu.evaluate(() => {
    const lauta = window.matkakirja.ui.pallolauta;
    const ohj = lauta.pallo.controls();
    const R = lauta.pallo.getGlobeRadius();
    const pov = lauta.pallo.pointOfView();
    lauta.kamera?.pysaytaKameraAjo?.();
    lauta.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: ohj.maxDistance / R - 1 }, 0);
  });
  /*
   * ODOTETAAN TILAA, EI KELLOA. Yleiskuvaan siirtyminen purkaa
   * laastarin ja häivyttää koko pallon kalvon takaisin näkyviin, ja
   * 8k-pohja puretaan 33,5 megapikselistä — kuormitetussa kontissa se
   * vie sekunteja. Kiinteä odotus mittasi silloin kontin nopeutta eikä
   * linssiä (mitattu 16.9.2026: 3,5 s riitti 4k:lle muttei 8k:lle).
   * Raja on silti tiukka: jos tila ei asetu 20 sekunnissa, väite
   * kaatuu.
   */
  await sivu.waitForFunction((pyr) => {
    const t = window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.();
    if (!t) return false;
    /* Pyramiditilassa yleiskuva on laatasto karkealla tasolla. */
    if (pyr) {
      const m = window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
      return (m?.laattoja ?? 0) > 0 && (m?.taso ?? 99) <= 3;
    }
    return t.perusKalvo === true && t.tarkennus?.paalla === false;
  }, pyramidi, { timeout: 20000 }).catch(() => null);
  await sivu.waitForTimeout(600);
  const uloin = await lue();
  const pallokuva = await kuvaa();
  writeFileSync(join(ULOS, `topografialinssi-${ruutu.nimi}-pallo${pyramidi ? '' : '-vastakoe'}.png`), pallokuva);

  /* ---- linssi kiinni ------------------------------------------------ */
  /*
   * LAATTALASKURIN IKKUNA SULKEUTUU TÄHÄN. Linssin sulkeminen palauttaa
   * seepiakartan, ja sen laatat ovat silloin oikea tila — ilman tätä
   * rajaa väite "seepiaa ei haeta linssin aikana" mittasi myös
   * sulkemisen jälkeisen paluun (mitattu 18.9.2026: 94 pyyntöä, joista
   * yksikään ei ollut linssin ajalta).
   */
  const t1 = Date.now();
  await sivu.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await sivu.waitForTimeout(4000);
  const kiinni = await lue();

  await konteksti.close();
  /*
   * LAATTAPYYNNÖT LINSSIN AVAUKSEN JÄLKEEN. Kohta 49: pyramiditilassa
   * seepiapohjaa EI ladota linssin alle, joten `seepiat` on oikea tila
   * vain nollana — ja `reliefit` todistaa, että laatasto todella haki
   * laattansa ämpäristä (route-välityksen läpi).
   */
  const jalkeen = pyynnot.filter((p) => p.t >= t0 && p.t <= t1).map((p) => p.url);
  return {
    ennen, avattu, lahi, uloin, kiinni, virheet, lahteet, kerrosLahi,
    seepiapyyntoja: new Set(jalkeen.filter(seepiaLaatta)).size,
    reliefipyyntoja: new Set(jalkeen.filter(reliefiLaatta)).size,
    teravyysLahi: teravyys(lahikuva),
  };
}

/* ═══════════════════════════════ ajo ═══════════════════════════════ */

for (const ruutu of (VAIHE === 'avaus' ? [] : RUUDUT)) {
  const r = await ajaRuutu(ruutu);
  const nimi = `${ruutu.nimi} px`;

  /*
   * 1. TARKKUUS — RELIEFIPYRAMIDI ON OLETUS (Raamattu, ASTRONAUTIN
   * KAMERA LISAYS 16 kohta 49 ja KARTTAUUDISTUKSEN PAATOKSET 36
   * TARKENNUS 3). Linssi piirtää 15 kaarisekunnin laatastosta, eikä
   * koko pallon kalvoa tai tarkennuslaastaria rakenneta lainkaan.
   * Vanhan maailman väitteet (kalvo, laastari, pohjakuvan valinta,
   * lähteiden terävyys) ovat siirtyneet vastakokeeseen alla.
   */
  vaadi(`${nimi}: linssi piirtää reliefipyramidista, ei kalvosta eikä laastarista`,
    r.lahi.laastari?.reliefipyramidi === true
      && r.lahi.laastari?.perusKalvo === false
      && r.lahi.laastari?.tarkennus === null,
    JSON.stringify({
      pyramidi: r.lahi.laastari?.reliefipyramidi, perus: r.lahi.laastari?.perusKalvo,
      laastari: r.lahi.laastari?.tarkennus,
    }));
  /*
   * LAATASTO ON OIKEASSA TASOSSA. Alppien lähizoomissa (altitude 0,06)
   * kerroksen on osuttava tarkkaan tasoon eikä jäätävä karkeaan: z ≥ 5
   * on se raja, jonka alapuolella pyramidi ei anna enempää kuin vanha
   * 4k-pallokuva. Laattoja on oltava koottuna ja valmiina.
   */
  vaadi(`${nimi}: reliefilaatasto on lähizoomissa tarkassa tasossa (z ≥ 5)`,
    (r.kerrosLahi?.taso ?? 0) >= 5 && (r.kerrosLahi?.valmiita ?? 0) > 0,
    JSON.stringify(r.kerrosLahi));
  /*
   * KOHTA 49 KONEELLISESTI: seepiapohjaa EI ladota linssin alle.
   * Nolla pyyntöä on tässä oikea tila — ja se on nimenomaan
   * mitattava, koska pohjan laatat olivat ennen erää 4 se, mikä
   * välähti vaaleana reliefin alta.
   */
  vaadi(`${nimi}: seepiapohjan laattoja ei haeta linssin aikana (0 pyyntöä)`,
    r.seepiapyyntoja === 0 && r.reliefipyyntoja > 0,
    `seepia ${r.seepiapyyntoja}, reliefi ${r.reliefipyyntoja}`);

  /* 2. PELIN ELEMENTIT */
  const e = r.lahi.elementit;
  const nakyvia = Object.values(e).reduce((a, b) => a + b, 0);
  vaadi(`${nimi}: linssin aikana pelin elementtejä 0`,
    nakyvia === 0 && r.lahi.reitteja === 0 && !r.lahi.korostus
      && r.lahi.korostusJanoja === 0 && r.lahi.pisteSkaala === 0,
    JSON.stringify({
      ...e, reitteja: r.lahi.reitteja, korostus: r.lahi.korostus,
      janoja: r.lahi.korostusJanoja, pisteSkaala: r.lahi.pisteSkaala,
    }));
  vaadi(`${nimi}: kartan päällä ei ole yhtään isoa pelin peittoa`,
    (r.lahi.isotPeitot?.length ?? 0) === 0 && (r.uloin.isotPeitot?.length ?? 0) === 0,
    JSON.stringify({ lahi: r.lahi.isotPeitot, uloin: r.uloin.isotPeitot }));

  /* 3. KOKO MAAPALLO */
  const kapein = Math.min(r.uloin.kotelo.w, r.uloin.kotelo.h);
  const halk = halkaisija(r.uloin.rajat?.max ?? 0, r.uloin.kotelo.h);
  vaadi(`${nimi}: uloimmassa näkymässä koko pallo mahtuu ruudulle`,
    halk > 0 && halk <= kapein,
    `halkaisija ${Math.round(halk)} px, kapein sivu ${kapein} px, katto ${(r.uloin.rajat?.max ?? 0).toFixed(3)}`);
  /*
   * YLEISKUVASSA LAASTARIA EI OLE (mitattu vika 16.9.2026): kun
   * pelaaja zoomaa ulos, tarkennettu suorakaide ei saa jäädä pallon
   * pinnalle eikä koko pallon kalvo saa jäädä läpinäkyväksi — muuten
   * yleiskuvassa näkyy laikku ja muualla ei reliefiä lainkaan.
   */
  vaadi(`${nimi}: yleiskuvassa reliefi on yhä pallon pinnalla (karkea taso)`,
    r.uloin.laastari?.reliefipyramidi === true && r.uloin.laastari?.perusKalvo === false,
    JSON.stringify({
      pyramidi: r.uloin.laastari?.reliefipyramidi, perus: r.uloin.laastari?.perusKalvo,
      laastari: r.uloin.laastari?.tarkennus,
    }));
  vaadi(`${nimi}: linssin katto on laudan omaa kattoa ulompana`,
    (r.uloin.rajat?.max ?? 0) > (r.ennen.rajat?.max ?? 0) * 1.5,
    `linssi ${(r.uloin.rajat?.max ?? 0).toFixed(3)} vs peli ${(r.ennen.rajat?.max ?? 0).toFixed(3)}`);

  /* 4. SULKEMINEN PALAUTTAA */
  const suhde = (a, b) => (b ? Math.abs(a - b) / Math.abs(b) : (a ? 1 : 0));
  const kameraPalasi = r.kiinni.pov && r.avattu.pov
    && suhde(r.kiinni.pov.altitude, r.avattu.pov.altitude) <= 0.02
    && Math.abs(r.kiinni.pov.lat - r.avattu.pov.lat) <= 0.5
    && Math.abs(r.kiinni.pov.lng - r.avattu.pov.lng) <= 0.5;
  vaadi(`${nimi}: sulkeminen palauttaa kameran (±2 %) ja zoomirajat`,
    kameraPalasi && suhde(r.kiinni.rajat?.max ?? 0, r.ennen.rajat?.max ?? 0) <= 0.02,
    JSON.stringify({
      avattu: r.avattu.pov, kiinni: r.kiinni.pov,
      rajaEnnen: r.ennen.rajat?.max, rajaKiinni: r.kiinni.rajat?.max,
    }));
  vaadi(`${nimi}: sulkeminen palauttaa pelin kerrokset`,
    r.kiinni.korostus === r.ennen.korostus && r.kiinni.korostusJanoja > 0
      && r.kiinni.pisteSkaala > 0 && !r.kiinni.portti,
    JSON.stringify({
      korostus: r.kiinni.korostus, janoja: r.kiinni.korostusJanoja,
      piste: r.kiinni.pisteSkaala, portti: r.kiinni.portti,
    }));

  vaadi(`${nimi}: ei sivuvirheitä`, r.virheet.length === 0, r.virheet.slice(0, 3).join(' | '));

  /*
   * 1b. LINSSI PIIRTÄÄ JOTAIN. Ruudun terävyys ei erottele lähteitä
   * (pallon oma pinta hallitsee gradienttia), mutta se erottaa
   * PIIRRETYN linssin piirtämättömästä — mustan pallon vika 17.9.2026
   * näkyi juuri tässä luvussa.
   */
  vaadi(`${nimi}: lähizoomissa ruudulla on piirrettyä reliefiä`,
    r.teravyysLahi > 0, `ruudun terävyys ${r.teravyysLahi}`);

  /* ────────────────────────────────────────────────────────────────
   * 5. VASTAKOE: ?reliefipyramidi=0 eli VARALLA OLEVA VANHA MAAILMA
   * ────────────────────────────────────────────────────────────────
   * Varapolku on oltava ehjä: jos pyramidi ei ole saatavilla, linssin
   * on yhä piirrettävä koko pallon kalvo ja tarkennuslaastari. Nämä
   * viisi väitettä ovat entiset päävaiheen väitteet, siirrettyinä
   * sinne, missä mitattava maailma yhä on. (Entinen `?tarkennus=0`
   * -vastakoe on jäänyt pois: pyramidin kanssa laastaria ei ole, ja
   * ilman pyramidia laastarin poisjättö mitataan tässä samassa
   * ajossa `tarkennus`-kentän kautta.)
   */
  const v = await ajaRuutu(ruutu, { pyramidi: false });
  const t = v.lahi.laastari?.tarkennus ?? null;
  const tiheys = t?.kangas && t?.ikkuna
    ? t.kangas.leveys / (t.ikkuna.lng1 - t.ikkuna.lng0) : 0;
  vaadi(`${nimi}: vastakoe — ilman pyramidia tarkennuslaastari on päällä lähizoomissa`,
    Boolean(t?.paalla) && v.lahi.laastari?.perusKalvo === false,
    JSON.stringify({ paalla: t?.paalla, perus: v.lahi.laastari?.perusKalvo, rakennuksia: t?.rakennuksia }));
  vaadi(`${nimi}: vastakoe — laastarin kangas on lähteen omassa tiheydessä`,
    tiheys >= LAHTEEN_TIHEYS * 0.9 && tiheys >= PERUSKUVAN_TIHEYS * 2.5,
    `${tiheys.toFixed(1)} px/aste (4k-pallokuva ${PERUSKUVAN_TIHEYS.toFixed(1)}, lähde ${LAHTEEN_TIHEYS})`);
  /*
   * POHJAKUVA VALITAAN RUUDUN MUKAAN (16.9.2026, js/linssit/reliefikuva.js
   * valitseReliefi): leveällä ruudulla 8192 px (22,8 px/aste), kapealla
   * 4096 px (11,4 px/aste). Sama valinta kuin Astronautin kameralla.
   */
  const odotettuPohja = ruutu.viewport.width >= 1024 ? '8k' : '4k';
  vaadi(`${nimi}: vastakoe — pohjakuva on ruudulle oikea (${odotettuPohja})`,
    v.lahi.laastari?.pohja === odotettuPohja,
    JSON.stringify({
      pohja: v.lahi.laastari?.pohja, tiheys: v.lahi.laastari?.pohjanTiheys,
      kynnys: v.lahi.laastari?.tarkennus?.kynnys,
    }));
  /*
   * YLEISKUVASSA LAASTARIA EI OLE (mitattu vika 16.9.2026): kun
   * pelaaja zoomaa ulos, tarkennettu suorakaide ei saa jäädä pallon
   * pinnalle eikä koko pallon kalvo saa jäädä läpinäkyväksi.
   */
  vaadi(`${nimi}: vastakoe — yleiskuvassa laastari on pois ja kalvo näkyvissä`,
    v.uloin.laastari?.tarkennus?.paalla === false && v.uloin.laastari?.perusKalvo === true,
    JSON.stringify({
      peitto: v.uloin.laastari?.perusPeitto, tavoite: v.uloin.laastari?.perusTavoite,
      ladattu: v.uloin.laastari?.perusLadattu, pohja: v.uloin.laastari?.pohja,
      laastari: v.uloin.laastari?.tarkennus?.paalla,
    }));

  /* 5b. TERÄVYYS: laastarin lähde vs. koko pallon kalvon lähde */
  const L = v.lahteet;
  /*
   * KAKSI KYNNYSTÄ, ERI LUONNETTA. Lähdepikselien suhde on pelkkää
   * geometriaa (10800 / 4096 × sama ikkuna = 2,64) ja siksi tiukka.
   * Terävyyden suhde riippuu siitä, mitä ikkunassa sattuu olemaan —
   * mitattu 16.9.2026: 2,45× (Alpit, 4°), 1,51× (390 px:n ikkuna) ja
   * 1,38× (1400 px:n ikkuna, jossa pallokuvassakin on jo hienojakoista
   * vaihtelua 512 pikseliin piirrettynä). Kynnys on 1,25, jotta
   * vartija kertoo regressiosta eikä maisemasta.
   */
  vaadi(`${nimi}: vastakoe — laastarin lähde on mitattavasti terävämpi`,
    Boolean(L) && L.uusi.teravyys > L.vanha.teravyys * 1.25
      && L.uusi.lahdePx > L.vanha.lahdePx * 2.5,
    L ? `terävyys ${L.vanha.teravyys} → ${L.uusi.teravyys} `
      + `(${(L.uusi.teravyys / L.vanha.teravyys).toFixed(2)}×), lähdepikseleitä `
      + `${L.vanha.lahdePx} → ${L.uusi.lahdePx}` : 'mittaa ei saatu');
}

/* ══════════════════════════════════════════════════════════════════════
 * AVAUSMITTAUS — 390 px, ISOISÄN LUENTA KÄYNNISSÄ
 * ══════════════════════════════════════════════════════════════════════
 *
 * OMISTAJAN VIKA 16.9.2026 klo 15.30 (sanatarkasti): *"Topografia linssi
 * tökkii (vaalea kartta piirtyy ilmeisesti ensin ja sitten Topografia
 * sen päälle) lisäksi näytölle jää ilmeisesti kuvia sekä ainakin pulun
 * mini puhekupla jossa plus merkki"*.
 *
 * MIKSI YLLÄ OLEVA AJO EI NÄHNYT MITÄÄN NÄISTÄ. `ajaRuutu` pakottaa
 * pelin toimintavaiheeseen Pariisiin ja avaa linssin siitä: silloin
 * isoisän luentaa ei ole, saapumiskuvaa ei ole, pulu ei ole puhunut
 * eikä luentakuvapakkaa ole nostettu kartalle. Omistaja pelaa peliä,
 * eli hän avaa linssin JUURI SILLOIN kun kaikki nuo ovat ruudulla.
 * Tämä ajo tekee sen: oikea tallenne Ateenaan, saapumiskortti auki,
 * luenta soimassa — ja mittaa AVAUKSEN, ei vain lopputilaa.
 *
 * KOLME MITTAA, KAIKKI KONEELTA:
 *
 *   a) KIRKKAUS kompositorin kehyksistä (Page.startScreencast).
 *      Screencast on tässä ainoa kelpo tapa: pääsäie on avauksen
 *      aikana varattu, ja `Page.captureScreenshot` jonottaa sen
 *      taakse — mitattuna kaappausväli venyi 2,4 sekuntiin, eli
 *      mittari olisi mitannut itseään.
 *   b) PALJAAN KARTAN NÄYTTEET sivun omasta kehyssilmukasta: onko
 *      hetkeäkään, jolloin pelin kerrokset on jo riisuttu mutta
 *      kartan päällä ei ole peitettä eikä reliefiä.
 *   c) JÄÄNTEET kartan päällä (> 400 px²), nimilistan sijaan koko
 *      puusta — nimilista löytää vain sen, mitä osataan odottaa.
 */

/*
 * ──────────────────────────────────────────────────────────────────────
 * MUISTI: GPU-TEKSTUURIT JA JS-KASA
 * ──────────────────────────────────────────────────────────────────────
 * `kaytetytTavut` on laattakerroksen oma kirjanpito (js/pallolaatat.js):
 * jokaisen laatan kankaan pikselit kerrottuna mipmapin lisällä. Se on
 * ainoa luku, jonka SELAIN antaa tekstuurimuistista — WebGL:ssä ei ole
 * kyselyä käytetylle muistille, ja `renderer.info.memory` kertoo vain
 * kappalemäärät. `performance.memory` on Chromiumin oma; WebKitillä se
 * jää nulliksi eikä arvata.
 */
const MUISTI = `() => {
  const ui = window.matkakirja?.ui;
  let kerros = null;
  try { kerros = ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null; } catch { kerros = null; }
  let info = null;
  try {
    const r = ui?.pallolauta?.pallo?.renderer?.();
    info = r?.info?.memory ? { tekstuureja: r.info.memory.textures, geometrioita: r.info.memory.geometries } : null;
  } catch { info = null; }
  const m = performance.memory ?? null;
  return {
    laattojenTavut: kerros?.kaytetytTavut ?? null,
    laattoja: kerros?.laattoja ?? null,
    valmiita: kerros?.valmiita ?? null,
    kolmiInfo: info,
    jsKasaMt: m ? Math.round(m.usedJSHeapSize / 1048576) : null,
  };
}`;

/*
 * ──────────────────────────────────────────────────────────────────────
 * NIMIÖN VAALEAN REUNUKSEN KONTRASTI (WCAG 2.1, 1.4.3)
 * ──────────────────────────────────────────────────────────────────────
 *
 * MIKÄ MITATAAN. Nostotason nimiöt on poltettu laattoihin SEEPIAA
 * varten (tummaa harmaata tasaisen vaalealle pergamentille). Reliefin
 * päällä tausta vaihtelee kirjaimen sisällä, ja v1939 lisäsi siksi
 * vaalean reunuksen (js/pallolaatat.js NIMION_HALO). Reunus on hyvä
 * vain, jos se todella kantaa: tekstin ja sen VÄLITTÖMÄN taustan
 * suhteen on oltava >= 4,5:1 sekä tummimmalla että vaaleimmalla
 * reliefialueella.
 *
 * MIKSI LAATOISTA EIKÄ RUUDUSTA. Ruudulta nimiön löytäminen vaatisi
 * arvatun paikan, ja pallon pinnalla teksti on kalteva ja
 * interpoloitu — mitta kertoisi näytönohjaimen suodatuksesta.
 * Laatta on se pikselijoukko, jonka peli itse kokoaa, ja tässä se
 * kootaan PELIN OMILLA VAKIOILLA (NIMION_HALO, -PX, -VETOJA tuodaan
 * js/pallolaatat.js:stä) ja pelin omilla osoitteilla
 * (pyramidinKerrostasot, pyramidinLaattaUrl) — ei kopioituja lukuja.
 *
 * TUMMIN JA VAALEIN ALUE. Sama laatta sisältää molemmat: jokaisen
 * kirjaimen ympäriltä katsotaan reliefin oma kirkkaus, ja mustepikselit
 * lajitellaan sen mukaan kolmannekseen (tummin / vaalein). Kontrasti
 * lasketaan kirjaimen tummimmasta ytimestä sen ympärillä olevaan
 * VAALEIMPAAN taustaan 3 pikselin säteellä — eli juuri siihen
 * reunukseen, jota vasten kirjain luetaan.
 */
const KONTRASTI = `async () => {
  const { pyramidinKerrostasot, pyramidinLaattaUrl, pyramidinLaattaOlemassa } =
    await import('/js/laattapyramidi.js');
  const { NIMION_HALO, NIMION_HALO_PX, NIMION_HALO_VETOJA } =
    await import('/js/pallolaatat.js');

  const lum = (r, g, b) => {
    const f = (v) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const suhde = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

  /* Etsitään taso, jolla on SEKÄ reliefi ETTÄ nostotaso. */
  let taso = null;
  for (const z of [7, 6, 5, 4]) {
    const kerrokset = pyramidinKerrostasot(z) ?? [];
    const reliefi = kerrokset.find((k) => k.reliefi);
    const nosto = kerrokset.find((k) => k.nosto);
    if (reliefi && nosto) { taso = { z, reliefi, nosto }; break; }
  }
  if (!taso) return { virhe: 'ei tasoa, jolla olisi sekä reliefi että nosto' };

  /* Laatat, joilla on poltettu nimiö: laataston oma bittikartta kertoo. */
  const osumat = [];
  for (let sarake = 0; sarake < taso.nosto.sarakkeita && osumat.length < 8; sarake += 1) {
    for (let rivi = 0; rivi < taso.nosto.riveja && osumat.length < 8; rivi += 1) {
      if (!pyramidinLaattaOlemassa(taso.nosto, sarake, rivi)) continue;
      if (!pyramidinLaattaOlemassa(taso.reliefi, sarake, rivi)) continue;
      osumat.push({ sarake, rivi });
    }
  }
  if (!osumat.length) return { virhe: 'nostotasolla ei laattaa reliefin päällä' };

  /* Sama kangas kuin pelillä, mutta varareitillä: WebKitin
   * OffscreenCanvas-tuki on ollut se, mikä kerman v1943:ssa rikkoi. */
  const kangas = (L, K) => {
    try { return new OffscreenCanvas(L, K); } catch { /* ei tukea */ }
    const cv = document.createElement('canvas'); cv.width = L; cv.height = K; return cv;
  };
  const kuvaksi = async (url) => {
    const v = await fetch(url);
    if (!v.ok) return null;
    return createImageBitmap(await v.blob());
  };

  const tulokset = [];
  for (const { sarake, rivi } of osumat) {
    const nostoKuva = await kuvaksi(pyramidinLaattaUrl(taso.nosto, sarake, rivi)).catch(() => null);
    const reliefiKuva = await kuvaksi(pyramidinLaattaUrl(taso.reliefi, sarake, rivi)).catch(() => null);
    if (!nostoKuva || !reliefiKuva) continue;
    const L = nostoKuva.width; const K = nostoKuva.height;

    /* a) pelkkä reliefi — taustan oma kirkkaus */
    const cvR = kangas(L, K); const cR = cvR.getContext('2d');
    cR.drawImage(reliefiKuva, 0, 0, L, K);
    const relief = cR.getImageData(0, 0, L, K).data;

    /* b) pelin oma kompositio: reliefi + kolme halovetoa + nimiö */
    const cv = kangas(L, K); const ctx = cv.getContext('2d');
    ctx.drawImage(reliefiKuva, 0, 0, L, K);
    ctx.save();
    ctx.shadowColor = NIMION_HALO;
    ctx.shadowBlur = NIMION_HALO_PX;
    for (let veto = 0; veto < NIMION_HALO_VETOJA; veto += 1) ctx.drawImage(nostoKuva, 0, 0, L, K);
    ctx.restore();
    ctx.drawImage(nostoKuva, 0, 0, L, K);
    const yhdessa = ctx.getImageData(0, 0, L, K).data;

    /* c) nimiön oma alfa: mikä on mustetta */
    const cvN = kangas(L, K); const cN = cvN.getContext('2d');
    cN.drawImage(nostoKuva, 0, 0, L, K);
    const nosto = cN.getImageData(0, 0, L, K).data;

    const S = 3;
    for (let y = S; y < K - S; y += 1) {
      for (let x = S; x < L - S; x += 1) {
        const i = (y * L + x) * 4;
        /* MUSTE ON KIRJAIMEN RUNKO, EI SEN REUNAPIKSELI. Puoliksi
         * peittävä reunapikseli on jo sekoitus mustetta ja reunusta;
         * jos se laskettaisiin tekstiksi, mitta kertoisi ladonnan
         * pehmennyksestä eikä luettavuudesta. Vaatimus on siksi vahva
         * peittävyys nostotason omassa kuvassa (alfa >= 200) ja tumma
         * muste sen omassa värissä — viivamerkit ovat samaa mustetta
         * eikä niitä tarvitse erottaa, sillä reunus koskee molempia.
         *
         * RAJA EI OLE TÄYSI PEITTÄVYYS (kokeiltu 18.9.2026): alfa >= 250
         * jätti koko z7-otokseen VIIDEN pikselin joukon, koska poltettu
         * kursiivi on siellä hiusviivaa eikä yksikään veto yllä täyteen
         * alfaan. Viisi pikseliä ei ole mitta. */
        if (nosto[i + 3] < 200) continue;
        if (lum(nosto[i], nosto[i + 1], nosto[i + 2]) > 0.25) continue;
        const tekstiL = lum(yhdessa[i], yhdessa[i + 1], yhdessa[i + 2]);
        if (tekstiL > 0.25) continue;
        /* Ympäristön vaalein: se on se reunus, jota vasten luetaan. */
        let paras = -1;
        for (let dy = -S; dy <= S; dy += 1) {
          for (let dx = -S; dx <= S; dx += 1) {
            const j = ((y + dy) * L + (x + dx)) * 4;
            if (nosto[j + 3] >= 230) continue;
            const l2 = lum(yhdessa[j], yhdessa[j + 1], yhdessa[j + 2]);
            if (l2 > paras) paras = l2;
          }
        }
        if (paras < 0) continue;
        tulokset.push({
          suhde: suhde(tekstiL, paras),
          reliefiL: lum(relief[i], relief[i + 1], relief[i + 2]),
        });
      }
    }
    nostoKuva.close?.(); reliefiKuva.close?.();
  }
  if (!tulokset.length) return { virhe: 'mustepikseleitä ei löytynyt', taso: taso.z };

  tulokset.sort((a, b) => a.reliefiL - b.reliefiL);
  const kolmannes = Math.max(1, Math.floor(tulokset.length / 3));
  const tummin = tulokset.slice(0, kolmannes);
  const vaalein = tulokset.slice(-kolmannes);
  const pienin = (lista) => lista.reduce((a, b) => Math.min(a, b.suhde), Infinity);
  const mediaani = (lista) => {
    const v = lista.map((x) => x.suhde).sort((a, b) => a - b);
    return v[Math.floor(v.length / 2)];
  };
  const pyorista = (v) => Math.round(v * 100) / 100;
  return {
    taso: taso.z,
    laattoja: osumat.length,
    pikseleita: tulokset.length,
    tummin: { pienin: pyorista(pienin(tummin)), mediaani: pyorista(mediaani(tummin)) },
    vaalein: { pienin: pyorista(pienin(vaalein)), mediaani: pyorista(mediaani(vaalein)) },
    kaikkiPienin: pyorista(pienin(tulokset)),
  };
}`;

const AVAUSRUUTU = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 };
const AVAUSKAUPUNKI = 'ateena';
/**
 * Näiden alla asuu sovelluksen oma kehys (yläpalkki, sivupalkki) ja
 * linssin omat kerrokset. Kaikki muu kartan päällä on jäänne.
 */
const SALLITUT_PESAT = '.rail, header, .topbar, .linssi-selite, .linssivalitsin, .pallolauta-kalvo';
/** Kartan ja pallon omat kuoret: kontteja, eivät sisältöä. */
const KUORET = '.app, .stage, .map-pane, .scene-container, .kartta-kuori, #board, '
  + '.pallo-kuori, .pallo-kotelo, .maapaneeli-nurkka';

/** Kartan päälle jääneet, linssiin kuulumattomat elementit. */
const JAANTEET = `() => {
  const kartta = document.querySelector('.map-pane');
  const karttaAla = kartta ? (() => { const r = kartta.getBoundingClientRect(); return r.width * r.height; })() : 0;
  const tulos = [];
  for (const el of document.body.querySelectorAll('*')) {
    if (['SCRIPT', 'STYLE', 'DEFS', 'TITLE', 'LINK', 'META', 'CANVAS'].includes(el.tagName)) continue;
    if (el.closest(${JSON.stringify(SALLITUT_PESAT)})) continue;
    if (el.matches(${JSON.stringify(KUORET)})) continue;
    const r = el.getBoundingClientRect();
    const ala = r.width * r.height;
    if (ala <= 400) continue;
    // Kartan kokoiset kuoret eivät ole sisältöä (nimettömät väli-divit).
    if (karttaAla && ala >= karttaAla * 0.85) continue;
    if (r.right <= 0 || r.bottom <= 0 || r.left >= innerWidth || r.top >= innerHeight) continue;
    let piilossa = false;
    for (let p = el; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (s.display === 'none' || s.visibility === 'hidden' || Number(s.opacity) < 0.05) { piilossa = true; break; }
    }
    if (piilossa) continue;
    tulos.push({
      valitsin: el.tagName.toLowerCase() + (el.id ? '#' + el.id : '')
        + (el.getAttribute('class') ? '.' + el.getAttribute('class').split(/\\s+/).slice(0, 3).join('.') : ''),
      ala: Math.round(ala),
    });
  }
  return tulos.sort((a, b) => b.ala - a.ala);
}`;

/** Yksi avausmittaus. `peite = false` on vastakoe (`?topopeite=0`). */
async function ajaAvaus({ peite = true } = {}) {
  const virheet = [];
  const konteksti = await selain.newContext({ ...AVAUSRUUTU, serviceWorkers: 'block' });
  const { Game } = await import('../../js/game.js');
  const { packById } = await import('../../js/pack.js');
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: AVAUSKAUPUNKI }],
    pack: packById('maailmankartta'),
    seed: 5,
  });
  peli.phase = 'action';
  await konteksti.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, JSON.stringify(peli.toJSON()));
  const sivu = await konteksti.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.fulfill({ status: 404, body: '' }); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  const cdp = MOOTTORI === 'webkit' ? null : await konteksti.newCDPSession(sivu);

  await sivu.goto(
    `http://127.0.0.1:${PORTTI}/index.html?lauta=pallo${peite ? '' : '&topopeite=0'}`,
    { waitUntil: 'domcontentloaded' },
  );
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 90000 })
    .catch(() => null);
  await sivu.waitForTimeout(4000);
  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
  }, AVAUSKAUPUNKI);
  // Luenta soimaan: vasta silloin ruudulla on se tila, jonka omistaja näki.
  const luentaSoi = await sivu.waitForFunction(`(() => {
    const a = window.matkakirja?.ui?.diaryVoice;
    return Boolean(a) && !a.paused && a.currentTime > 0;
  })()`, null, { timeout: 90000 }).then(() => true).catch(() => false);
  /*
   * PULUN PLUSKUPLA JA LUENTAKUVAPAKKA PELIN OMILLA FUNKTIOILLA.
   *
   * Molemmat syntyvät pelatessa itsestään, mutta vasta isojen
   * luentakuvien sarjan LOPUKSI (js/fokusvirta.js naytaPulunKuvapakka)
   * ja pulun ensimmäisestä repliikistä — kuormitetussa kontissa se on
   * minuutteja. Savuke kutsuu siksi samoja funktioita suoraan: syntyvät
   * elementit ovat pelin omia, eikä vartija odota kelloa.
   *
   * Pystyruudulla uusi puhekupla imeytyy heti pluskuplaan
   * (js/pollo.js lisaaPinoon, css/styles.css kohta 26917) — juuri se
   * *"pulun mini puhekupla jossa plus merkki"*, jonka omistaja näki.
   */
  const nakyvissa = (valitsin) => sivu.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 4 && r.height > 4 && st.display !== 'none'
      && st.visibility !== 'hidden' && Number(st.opacity) > 0.02;
  }, valitsin);
  const pakota = () => sivu.evaluate(async (id) => {
    const { ui } = window.matkakirja;
    const P = await import('/js/pollo.js');
    P.polloSaapumiskupla('Kurr! Ateenassa tuulee lämpimästi.');
    const F = await import('/js/fokusvirta.js');
    const kaupunki = ui.game.pack.cities.find((c) => c.id === id);
    if (kaupunki) F.naytaPulunKuvapakka(ui, kaupunki, { heti: true });
  }, AVAUSKAUPUNKI).catch(() => null);
  /*
   * ISO LUENTAKUVASARJA ELÄÄ TAUSTALLA ja voi korvata juuri nostetun
   * pakan seuraavalla kuvallaan, joten pakotus toistetaan kunnes
   * molemmat ovat ruudulla (tai yritykset loppuvat). Mitattuna yksi
   * kutsu riitti kevyellä kuormalla mutta ei aina raskaalla.
   */
  for (let yritys = 0; yritys < 5; yritys += 1) {
    await pakota();
    await sivu.waitForTimeout(2500);
    // Pluskupla poistui 18.9.2026 (PAATOKSET 34 kohta 20 a), joten
    // pakotuksen mittari on enää luentakuva.
    if (await nakyvissa('.fokusvirta-luentakuva')) break;
  }

  const ennenJaanteet = await sivu.evaluate(`(${JAANTEET})()`);

  /* --- mittarit sivun sisään: kehyskohtainen näyte + longtask ------- */
  await sivu.evaluate(() => {
    window.__topo = { alku: performance.timeOrigin, pitkat: [], naytteet: [], kaynnissa: true };
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          window.__topo.pitkat.push({ alku: +e.startTime.toFixed(1), kesto: +e.duration.toFixed(1) });
        }
      }).observe({ entryTypes: ['longtask'] });
    } catch { /* ei tuettu */ }
    const askel = () => {
      if (!window.__topo.kaynnissa) return;
      const ui = window.matkakirja?.ui;
      let t = null;
      try { t = ui?.pallolinssi?.kahva?.tila?.() ?? null; } catch { t = null; }
      /*
       * PYRAMIDITILASSA KALVOA EI OLE (kohta 49), joten `peitto` on
       * null eikä kerro mitään. Reliefin saapuminen luetaan silloin
       * laattakerroksen omista mittareista (js/pallolaatat.js) — sama
       * luenta kuin mittaa-reliefipyramidi.mjs:ssa.
       */
      let valmiita = null;
      try { valmiita = ui?.pallolauta?.lepokerros?.()?.mittarit?.()?.valmiita ?? null; } catch { valmiita = null; }
      window.__topo.naytteet.push({
        t: +performance.now().toFixed(1),
        portti: document.body.classList.contains('aikajana-paalla'),
        peitto: t?.perusPeitto ?? null,
        tavoite: t?.perusTavoite ?? null,
        peite: t?.peite ?? null,
        pyramidi: t?.reliefipyramidi ?? null,
        valmiita,
      });
      requestAnimationFrame(askel);
    };
    requestAnimationFrame(askel);
  });

  /* --- kompositorin kehykset (ks. a) yllä) -------------------------- */
  const kehykset = [];
  let kaappausKay = true;
  if (cdp) {
    cdp.on('Page.screencastFrame', async (f) => {
      kehykset.push({ ts: f.metadata.timestamp * 1000, data: f.data });
      try { await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }); } catch { /* ohi */ }
    });
    await cdp.send('Page.startScreencast', {
      format: 'png',
      everyNthFrame: 1,
      maxWidth: Math.round(AVAUSRUUTU.viewport.width / 2),
      maxHeight: Math.round(AVAUSRUUTU.viewport.height / 2),
    });
  }
  /*
   * WEBKITIN KEHYSSARJA: pieni keskiö tiheään. Screencastia ei ole,
   * ja koko ruudun kaappaus kestäisi enemmän kuin mitattava ikkuna.
   * Rajaus on sama ala, josta kirkkaus lasketaan Chromiumillakin
   * (`keskikirkkaus` ottaa ruudun keskeltä 16 % × 8 %), joten luvut
   * ovat vertailukelpoisia — ja koska kellonaika luetaan sivun omasta
   * `performance.now()`:sta, kaappauksen oma viive ei siirry mittaan.
   */
  const webkitSilmukka = cdp ? null : (async () => {
    const klippi = {
      x: Math.round(AVAUSRUUTU.viewport.width * 0.36),
      y: Math.round(AVAUSRUUTU.viewport.height * 0.42),
      width: Math.round(AVAUSRUUTU.viewport.width * 0.28),
      height: Math.round(AVAUSRUUTU.viewport.height * 0.16),
    };
    while (kaappausKay) {
      try {
        const [data, nyt] = await Promise.all([
          sivu.screenshot({ type: 'png', clip: klippi }),
          sivu.evaluate(() => performance.timeOrigin + performance.now()),
        ]);
        kehykset.push({ ts: nyt, data: data.toString('base64'), koko: true });
      } catch { break; }
    }
  })();
  await sivu.waitForTimeout(2500);

  const muistiEnnen = await sivu.evaluate(`(${MUISTI})()`);

  const t0 = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('topografia')) ui.game.player.linssit.push('topografia');
    await ui.lataaLinssit?.();
    const t = performance.now();
    ui.valitseLinssi('topografia');
    return +t.toFixed(1);
  });
  // Reliefi perille asti; kuormitetussa kontissa se vie kymmeniä sekunteja.
  await sivu.waitForFunction(() => {
    const t = window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.();
    if (!t) return false;
    /* Pyramiditilassa perille on laattakerroksen ensimmäinen valmis laatta. */
    if (t.reliefipyramidi) {
      const m = window.matkakirja?.ui?.pallolauta?.lepokerros?.()?.mittarit?.() ?? null;
      return (m?.valmiita ?? 0) > 0;
    }
    return (t.perusPeitto ?? 0) >= (t.perusTavoite ?? 0.72) * 0.98;
  }, null, { timeout: 120000 }).catch(() => null);
  /*
   * KAAPPAUS JATKUU VAKIINTUNEESEEN TILAAN ASTI (2,5 s). Välähdys on
   * vika vain suhteessa siihen, mihin ruutu asettuu — ja se vertailuluku
   * on otettava SAMASTA kehyssarjasta, ei toisesta kuvasta.
   */
  await sivu.waitForTimeout(2500);
  kaappausKay = false;
  if (cdp) await cdp.send('Page.stopScreencast').catch(() => {});
  else await webkitSilmukka;

  const data = await sivu.evaluate(() => {
    window.__topo.kaynnissa = false;
    return { alku: window.__topo.alku, pitkat: window.__topo.pitkat, naytteet: window.__topo.naytteet };
  });
  const jalkeenJaanteet = await sivu.evaluate(`(${JAANTEET})()`);
  const tila = await sivu.evaluate(`(${TILA})()`);
  const kuva = cdp
    ? Buffer.from((await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64')
    : await sivu.screenshot({ type: 'png' });
  writeFileSync(join(ULOS, `topografialinssi-390-luenta${peite ? '' : '-vastakoe'}.png`), kuva);

  /* --- GPU-latauksen mekanismi: ImageBitmap vs <img> ---------------- */
  const purku = peite ? await sivu.evaluate(async () => {
    const { valitseReliefi } = await import('/js/linssit/reliefikuva.js');
    // Sama valinta kuin linssillä: puhelimella 4k, leveällä ruudulla 8k.
    const osoite = valitseReliefi({ leveys: innerWidth, dpr: devicePixelRatio }).osoite;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = osoite;
    await new Promise((r) => { img.onload = r; img.onerror = r; });
    const bm = await createImageBitmap(await (await fetch(osoite)).blob(), { imageOrientation: 'flipY' });
    const vie = (lahde) => {
      const cv = document.createElement('canvas'); cv.width = 32; cv.height = 32;
      const gl = cv.getContext('webgl2') || cv.getContext('webgl');
      if (!gl) return null;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      const t = performance.now();
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, lahde);
      gl.finish();
      const ms = Math.round(performance.now() - t);
      gl.deleteTexture(tex);
      return ms;
    };
    const tulos = { img: vie(img), bitmap: vie(bm), koko: `${bm.width}x${bm.height}` };
    bm.close();
    return tulos;
  }) : null;
  /* --- onko linssin OMA tekstuuri bittikartta ja oikein päin? ------- */
  const tekstuuri = await sivu.evaluate(async () => {
    /*
     * LINSSIN OMA KALVO TUNNISTETAAN SYVYYSSIIRROSTA. Näyttämöllä on
     * monta 4096 pikselin tekstuuria (pallon oma pinta, laatat), ja
     * ensimmäinen osuma olisi niistä väärä — mitattuna juuri niin kävi.
     * `KALVON_SYVYYSSIIRTO` on vain linssikalvoilla.
     */
    const { KALVON_SYVYYSSIIRTO } = await import('/js/pallolauta/linssit.js');
    const pallo = window.matkakirja?.ui?.pallolauta?.pallo;
    const nayttamo = pallo?.scene?.();
    let osuma = null;
    nayttamo?.traverse?.((o) => {
      if (osuma) return;
      const m = Array.isArray(o.material) ? o.material[0] : o.material;
      if (!m || m.polygonOffsetUnits !== KALVON_SYVYYSSIIRTO) return;
      const t = m.map ?? m.emissiveMap;
      const kuva = t?.image;
      // Koko pallon kalvo, ei tarkennuslaastarin kangas (pieni canvas).
      if (!kuva || (kuva.width !== 4096 && kuva.width !== 8192)) return;
      osuma = {
        laji: typeof ImageBitmap !== 'undefined' && kuva instanceof ImageBitmap
          ? 'ImageBitmap' : (kuva.tagName ?? 'muu'),
        flipY: t.flipY,
        leveys: kuva.width,
      };
    });
    return osuma;
  });

  /* --- LINSSIKETJUN VAIHEET (erä "reliefin velat", kohta 3) --------- */
  /*
   * Avaus kulkee kolmen moduulin läpi (js/ui.js, js/linssit/topografia.js,
   * js/pallolaatat.js), ja loki on niiden yhteinen — ks.
   * js/reliefipyramidi.js LINSSIKETJUN LOKI. Tästä nähdään, kuinka moni
   * millisekunti on odotusta ja kuinka moni verkkoa.
   */
  const ketju = await sivu.evaluate(() => {
    try { return window.matkakirja?.ui?.linssiketju?.() ?? []; } catch { return []; }
  });

  /* --- MUISTI AVAUKSEN JÄLKEEN ------------------------------------- */
  const muistiJalkeen = await sivu.evaluate(`(${MUISTI})()`);

  /* --- NIMIÖN REUNUKSEN KONTRASTI (kohta 2) ------------------------ */
  const kontrasti = await sivu.evaluate(`(${KONTRASTI})()`).catch((e) => ({ virhe: String(e) }));

  await konteksti.close();

  /* --- kehysten kirkkaus: ruudun keskipiste ------------------------- */
  const keskikirkkaus = (buf) => {
    const { w, h, d } = pngRGBA(buf);
    const x0 = Math.round(w * 0.42); const x1 = Math.round(w * 0.58);
    const y0 = Math.round(h * 0.46); const y1 = Math.round(h * 0.54);
    let s = 0; let n = 0;
    for (let y = y0; y < y1; y += 1) {
      for (let x = x0; x < x1; x += 1) {
        const i = (y * w + x) * 4;
        s += 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        n += 1;
      }
    }
    return n ? s / n : 0;
  };
  const rivit = kehykset.map((k) => ({
    t: k.ts - data.alku - t0,
    kirkkaus: keskikirkkaus(Buffer.from(k.data, 'base64')),
  })).sort((a, b) => a.t - b.t);

  /*
   * IKKUNA ON AVAUS: linssin valinnasta siihen hetkeen, jolloin reliefi
   * on perillä. Sen jälkeen ruutu on linssin oma eikä siirtymää enää
   * ole.
   */
  const valmis = data.naytteet.find((s) => (s.pyramidi
    ? (s.valmiita ?? 0) > 0
    : (s.peitto ?? 0) >= (s.tavoite ?? 0.72) * 0.98));
  /*
   * AVAUSIKKUNA ON VÄHINTÄÄN SEKUNTI. Pyramiditilassa ensimmäinen
   * valmis laatta on ruudulla noin sadassa millisekunnissa, jolloin
   * ikkunaan mahtuisi yksi kompositorin kehys eikä vartija näkisi
   * mitään (mitattu 18.9.2026: 1 kehys, kattavuus 0 %). Vaalea
   * välivaihe näkyisi yhtä hyvin heti reliefin saapumisen jälkeen,
   * joten ikkuna pidetään sekunnin mittaisena riippumatta siitä, kuinka
   * nopeasti reliefi on perillä.
   */
  const IKKUNA_VAHINTAAN_MS = 1000;
  const loppu = Math.max(valmis ? valmis.t - t0 : Infinity, IKKUNA_VAHINTAAN_MS);
  const ennenRivit = rivit.filter((x) => x.t < 0);
  const avausRivit = rivit.filter((x) => x.t >= 0 && x.t <= loppu);
  const ennenKirkkaus = ennenRivit.length
    ? ennenRivit.reduce((a, b) => a + b.kirkkaus, 0) / ennenRivit.length : 0;
  /*
   * VAKIINTUNUT TILA = kehykset 2 sekuntia avauksen jälkeen. Tämä on se
   * luku, jota vasten välähdys mitataan (ks. väite alla).
   */
  const vakiintuneet = rivit.filter((x) => x.t >= 2000);
  const vakiintunut = vakiintuneet.length
    ? vakiintuneet.reduce((a, b) => a + b.kirkkaus, 0) / vakiintuneet.length : 0;
  /*
   * PALUU YLHÄÄLTÄ ALAS: suurin pudotus siihenastisesta huipusta
   * avausikkunan sisällä. Juuri se on "vaalea kartta ensin ja
   * topografia sen päälle" — kirkkaus käy ylhäällä ja tulee alas.
   */
  let huippuToistaiseksi = -Infinity;
  let suurinPudotus = 0;
  for (const x of rivit.filter((y) => y.t >= 0 && y.t <= loppu)) {
    huippuToistaiseksi = Math.max(huippuToistaiseksi, x.kirkkaus);
    suurinPudotus = Math.max(suurinPudotus, huippuToistaiseksi - x.kirkkaus);
  }

  /* Paljaan kartan näytteet: portti auki, ei peitettä eikä reliefiä. */
  const avausNaytteet = data.naytteet.filter((s) => s.t >= t0 && s.t - t0 <= loppu);
  /*
   * PALJAS KARTTA = portti auki (pelin kerrokset riisuttu), ei
   * odotuspeitettä EIKÄ reliefiä. Pyramiditilassa reliefi on
   * laattakerroksen valmiissa laatoissa, ei kalvon peittävyydessä.
   */
  const paljaat = avausNaytteet.filter(
    (s) => s.portti === true && s.peite !== true
      && (s.peitto ?? 0) < 0.05 && (s.valmiita ?? 0) === 0,
  );

  const pitkat = data.pitkat.map((l) => ({ dt: l.alku - t0, kesto: l.kesto }));
  const lepo = pitkat.filter((l) => l.dt < 0).map((l) => l.kesto);
  const avaus = pitkat.filter((l) => l.dt >= 0 && l.dt <= loppu).map((l) => l.kesto);

  return {
    ketju,
    kontrasti,
    muistiEnnen,
    muistiJalkeen,
    luentaSoi,
    ennenJaanteet,
    jalkeenJaanteet,
    tila,
    purku,
    tekstuuri,
    virheet,
    ennenKirkkaus,
    avausKehykset: avausRivit.length,
    /*
     * KATTAVUUS = kuinka suuren osan avausikkunasta kehysnäytteet
     * peittävät. Kehysten LUKUMÄÄRÄ riippuu koneesta (kontissa
     * ohjelmisto-WebGL syytää kehyksiä tiheään, Macilla oikea
     * näytönohjain harvemmin), mutta kattavuus ei.
     */
    avausKattavuus: avausRivit.length >= 2 && Number.isFinite(loppu) && loppu > 0
      ? (avausRivit[avausRivit.length - 1].t - avausRivit[0].t) / loppu : 0,
    avausHuippu: avausRivit.length ? Math.max(...avausRivit.map((x) => x.kirkkaus)) : 0,
    vakiintunut,
    vakiintuneita: vakiintuneet.length,
    suurinPudotus,
    avausNaytteita: avausNaytteet.length,
    paljaita: paljaat.length,
    avausMs: Number.isFinite(loppu) ? Math.round(loppu) : null,
    lepoPisin: lepo.length ? Math.max(...lepo) : 0,
    avausPisin: avaus.length ? Math.max(...avaus) : 0,
  };
}

const a = await ajaAvaus();
const nimiA = '390 px, luenta';

/*
 * KUVAPAKKA ON TOISTAISEKSI KUMOTTU (omistaja 16.9.2026 klo 16.05 UTC,
 * Raamattu KARTTAUUDISTUKSEN PAATOKSET 31 kohta 1). Kartalle jäävää
 * pientä luentakuvapakkaa ei enää nosteta lainkaan
 * (js/fokusvirta.js LUENTAKUVAPAKKA_KARTALLA = false), joten sitä ei
 * voi vaatia omistajan tilan osaksi — se olisi vaatimus siitä, että
 * kumottu asia palaa. Väitettä ei silti poisteta: kytkin luetaan
 * lähteestä, ja kun se kääntyy takaisin, pakka on jälleen pakollinen
 * osa omistajan tilaa ilman että tätä savuketta kirjoitetaan uusiksi.
 *
 * MUU EI MUUTU: luenta ja saapumiskuva ovat yhä pakollisia, ja juuri
 * ne ovat se tila, jossa omistaja linssin avasi. PLUSKUPLA POISTETTIIN
 * 18.9.2026 (PAATOKSET 34 kohta 20 a), joten sitä ei enää vaadita —
 * pulun repliikit palaavat nyt chatin ylärivin napista.
 * Mittaukset (a) kirkkaus, (b) paljas kartta ja (c) jäänteet ajetaan
 * kytkimestä riippumatta.
 */
const PAKKA_KARTALLA = /^export const LUENTAKUVAPAKKA_KARTALLA = true;$/m
  .test(readFileSync(new URL('../../js/fokusvirta.js', import.meta.url), 'utf8'));
const pakkaRuudulla = a.ennenJaanteet.some((x) => x.valitsin.includes('fokusvirta-luentakuva'));

vaadi(`${nimiA}: omistajan tila toistui (luenta, saapumiskuva, kuvapakka)`,
  a.luentaSoi && (PAKKA_KARTALLA ? pakkaRuudulla : !pakkaRuudulla),
  `luenta ${a.luentaSoi}, kuvapakka `
  + `${pakkaRuudulla} (odotus ${PAKKA_KARTALLA}, LUENTAKUVAPAKKA_KARTALLA=${PAKKA_KARTALLA}); `
  + `ennen linssiä ruudulla ${JSON.stringify(a.ennenJaanteet.slice(0, 6))}`);

/*
 * (a) EI VAALEAA VÄLIVAIHETTA. Omistajan sanat: *"vaalea kartta piirtyy
 * ilmeisesti ensin ja sitten Topografia sen päälle"*.
 *
 * VERTAILULUKU ON LOPPUTILA, EI SEEPIA (Fablen linjaus 18.9.2026, erän
 * 2 raportti "TÄRKEIN LÖYTÖ"). Pyramiditilassa itse reliefi on
 * seepiakarttaa vaaleampi — vakiintunut ruutu on noin 115, seepia noin
 * 61 — joten vanha ehto "ei saa olla seepiaa vaaleampi" olisi
 * vaatimus siitä, ettei reliefi piirry lainkaan. Välähdys on vika vain
 * suhteessa siihen, mihin ruutu asettuu:
 *
 *   1) avausikkunan MAKSIMI on yli 15 yksikköä vakiintunutta
 *      kirkkaampi (piikki, joka ei jää), tai
 *   2) ikkunassa on PALUU YLHÄÄLTÄ ALAS yli 15 yksikköä (kirkkaus käy
 *      ensin vaaleassa ja putoaa sitten) — juuri se, mitä omistaja
 *      kuvasi.
 *
 * OTOKSEN RIITTÄVYYS MITATAAN KATTAVUUTENA, EI KEHYSTEN MÄÄRÄNÄ
 * (17.9.2026, Mac). Vaatimus "vähintään 20 kehystä" oli kontin
 * kehystahdin mitta: Macilla sama 384 ms:n avaus tuotti 10 kehystä ja
 * väite kaatui, vaikka huippu oli täsmälleen odotetulla tasolla.
 * Tyhjää otosta vastaan suojaa nyt kaksi ehtoa: vähintään 8 kehystä JA
 * kehysten on peitettävä vähintään 60 % avausikkunasta.
 */
const VALAHDYSVARA = 15;
console.log(`INFO  ${nimiA}: avauksen maksimikirkkaus ${a.avausHuippu.toFixed(1)}, `
  + `vakiintunut (2 s jälkeen, ${a.vakiintuneita} kehystä) ${a.vakiintunut.toFixed(1)}, `
  + `suurin paluu ylhäältä alas ${a.suurinPudotus.toFixed(1)}, `
  + `seepia ennen linssiä ${a.ennenKirkkaus.toFixed(1)}`);
/*
 * ── MEDIAANI KOLMESTA NÄYTTEESTÄ KUORMASSA ──────────────────────────
 *
 * Omistaja 18.9.2026 (Raamattu: AGENTIT VAIN OPUS JA SONNET,
 * TARKENNUS 11 kohta 24 b). Tämä vartio oli `sarjat.json`:n
 * `tunnetutPunaisetMac`-listalla: kun Mac-runnerilla ajettiin kahdeksan
 * savuketta rinnakkain, avausikkunan "paluu alas" oli 19,4 (raja 15),
 * kun sama mittaus YKSIN ajettuna antoi 4,0 ja maksimi oli täsmälleen
 * lopputila. Vika ei ole pelissä vaan mittauksessa: kuormassa kehyksiä
 * putoaa, ja yksittäinen pudonnut kehys näyttää kirkkauden "paluulta".
 *
 * KERTAMITTAUS EI OLE SE, MITÄ VARTIO VÄITTÄÄ. Väite on *"avauksessa
 * ei ole välähdystä"* — ominaisuus avauksesta, ei yhdestä otoksesta.
 * Siksi otoksia otetaan kuormassa kolme ja VERTAILULUKUINA käytetään
 * niiden MEDIAANIA: yksittäinen kehysromahdus ei enää päätä tulosta,
 * mutta aito välähdys näkyy kaikissa kolmessa eikä mediaani pelasta
 * sitä.
 *
 * KOLMEA EI OTETA TURHAAN: jos ensimmäinen näyte on vihreä, se
 * riittää. Kuormahäily tekee mittauksesta PUNAISEN, ei vihreää, joten
 * vihreä kertakäynti ei voi olla häilyn tulosta. Näin vartio maksaa
 * kaksi lisäavausta vain silloin, kun se muuten olisi ollut punainen.
 * Vartion tiukkuus ei löysty: rajat (8 kehystä, 60 %, VALAHDYSVARA)
 * ovat samat kuin ennen.
 */
const valahdysLapi = (x) => x.avausKehykset >= 8 && x.avausKattavuus >= 0.6
  && x.vakiintuneita > 0
  && x.avausHuippu <= x.vakiintunut + VALAHDYSVARA
  && x.suurinPudotus <= VALAHDYSVARA;
const mediaani = (luvut) => [...luvut].sort((x, y) => x - y)[Math.floor(luvut.length / 2)];
const valahdysNaytteet = [a];
while (valahdysNaytteet.length < 3 && !valahdysLapi(valahdysNaytteet[valahdysNaytteet.length - 1])) {
  console.log(`INFO  ${nimiA}: välähdysnäyte ${valahdysNaytteet.length} punainen `
    + `(paluu alas ${valahdysNaytteet[valahdysNaytteet.length - 1].suurinPudotus.toFixed(1)}) `
    + '— otetaan lisänäyte mediaania varten');
  // eslint-disable-next-line no-await-in-loop
  valahdysNaytteet.push(await ajaAvaus());
}
const v = valahdysNaytteet.length === 1 ? a : {
  avausKehykset: mediaani(valahdysNaytteet.map((x) => x.avausKehykset)),
  avausKattavuus: mediaani(valahdysNaytteet.map((x) => x.avausKattavuus)),
  vakiintuneita: mediaani(valahdysNaytteet.map((x) => x.vakiintuneita)),
  avausHuippu: mediaani(valahdysNaytteet.map((x) => x.avausHuippu)),
  vakiintunut: mediaani(valahdysNaytteet.map((x) => x.vakiintunut)),
  suurinPudotus: mediaani(valahdysNaytteet.map((x) => x.suurinPudotus)),
};
if (valahdysNaytteet.length > 1) {
  console.log(`INFO  ${nimiA}: välähdysnäytteitä ${valahdysNaytteet.length}, `
    + `paluu alas ${valahdysNaytteet.map((x) => x.suurinPudotus.toFixed(1)).join(' / ')} `
    + `→ mediaani ${v.suurinPudotus.toFixed(1)}`);
}
vaadi(`${nimiA}: avauksessa ei ole välähdystä suhteessa linssin lopputilaan`,
  valahdysLapi(v),
  `kehyksiä ${v.avausKehykset} (kattavuus ${(100 * v.avausKattavuus).toFixed(0)} %), `
  + `maksimi ${v.avausHuippu.toFixed(1)} vs vakiintunut ${v.vakiintunut.toFixed(1)} `
  + `(raja ${(v.vakiintunut + VALAHDYSVARA).toFixed(1)}), `
  + `paluu alas ${v.suurinPudotus.toFixed(1)} (raja ${VALAHDYSVARA})`
  + `${valahdysNaytteet.length > 1 ? `, mediaani ${valahdysNaytteet.length} näytteestä` : ''}`);

/*
 * (b) KARTTA EI OLE HETKEÄKÄÄN PALJAANA. Tämä on se väite, joka
 * erottaa korjatun avauksen rikkinäisestä: kirkkausväite yksin ei
 * riitä, koska paljas pelikartta EI OLE saapumiskuvaa vaaleampi
 * (mitattu 16.9.2026: keskipiste 96,9 → 68,7 → 91,5). Portin
 * asettaminen riisuu kartan; jos samalla hetkellä ei ole peitettä eikä
 * reliefiä, pelaaja katsoo paljasta karttaa.
 */
vaadi(`${nimiA}: paljaan kartan näytteitä avauksen aikana 0`,
  a.avausNaytteita >= 5 && a.paljaita === 0,
  `paljaita ${a.paljaita} / ${a.avausNaytteita} näytettä, avaus ${a.avausMs} ms`);

/* (c) JÄÄNTEET: pluskupla ja luentakuvapakka. */
vaadi(`${nimiA}: linssin aikana kartan päällä ei ole yhtään jäännettä (> 400 px²)`,
  a.jalkeenJaanteet.length === 0,
  JSON.stringify(a.jalkeenJaanteet.slice(0, 8)));

/*
 * (d) PITKÄT TEHTÄVÄT. Ehdoton 150 ms:n raja EI OLE TÄSSÄ KONTISSA
 * MITATTAVISSA: ohjelmistorenderöity pallo tuottaa lepotilassakin
 * 0,5–1,3 sekunnin tehtäviä (mitattu 16.9.2026 samassa kontissa:
 * mediaani 568 ms ja maksimi 652 ms kevyellä kuormalla, 1 316 ms
 * silloin kun rinnalla ajoi toinen työsessio — ilman mitään linssiä).
 * Sitä taustaa vasten 150 ms:n väite kertoisi kontin kuormasta eikä
 * linssistä.
 *
 * Vartija mittaa siksi sen, mikä on mitattavissa: avaus ei saa
 * KOLMINKERTAISTAA sivun OMAA lepotason pisintä tehtävää. Raja on
 * väljä tarkoituksella — se on romahdusvartija (esimerkiksi
 * synkroninen purku, joka veisi kymmenen sekuntia), ei hienosäätö.
 * Varsinainen mitta korjaukselle on alla mekanismiväitteessä:
 * ImageBitmapin vienti näytönohjaimelle vs. <img>:n (mitattu 63 ms vs
 * 287 ms eli 4,6×).
 */
/*
 * LEPOTASO EI OLE JOKA KONEELLA OLEMASSA (17.9.2026, Mac). Macilla
 * sivu ei tuottanut lepotilassa YHTÄÄN pitkää tehtävää (lepoPisin 0,
 * PerformanceObserverin longtask-raja on 50 ms), jolloin ehto
 * `lepoPisin > 0` kaatoi väitteen — ja raja olisi ollut 0 ms.
 * Vertailukohta on nyt `max(lepo × 3, 150 ms)`: hitaassa kontissa
 * mitta on entinen (lepo 650 ms → raja 1 950 ms), nopeassa koneessa
 * romahdusvartija pitää 150 ms:n rajan, joka on pienin longtaskina
 * havaittava merkittävä ylitys. Väite säilyy romahdusvartijana.
 */
const PITKA_KATTO_MS = Math.max(a.lepoPisin * 3, 150);
vaadi(`${nimiA}: avaus ei kolminkertaista sivun omaa pisintä tehtävää`,
  a.avausPisin <= PITKA_KATTO_MS,
  `lepo ${a.lepoPisin} ms, avaus ${a.avausPisin} ms (raja ${PITKA_KATTO_MS.toFixed(0)} ms)`);

/*
 * (e) MEKANISMI. Purku siirrettiin työsäikeeseen (createImageBitmap) ja
 * valmiiksi käännettynä, jotta pääsäikeelle jää pelkkä kopio. Väite
 * mittaa sekä hinnan (texImage2D) että sen, että linssin OMA tekstuuri
 * todella on bittikartta eikä <img> — ja että kääntö on tehty purussa
 * (flipY false), jolloin mantereet eivät voi mennä ylösalaisin sen
 * mukaan, miten selain kohtelee UNPACK_FLIP_Y_WEBGL-lippua.
 */
vaadi(`${nimiA}: ImageBitmapin vienti näytönohjaimelle on alle puolet <img>:n hinnasta`,
  Boolean(a.purku) && a.purku.img > 0 && a.purku.bitmap <= a.purku.img * 0.5,
  JSON.stringify(a.purku));
/*
 * PYRAMIDITILASSA LINSSILLÄ EI OLE OMAA POHJATEKSTUURIA LAINKAAN
 * (kohta 49: kalvoa ei rakenneta), joten sitä ei voi vaatia — mutta
 * sen POISSAOLO on yhtä lailla mitattava tila: jos kalvo palaisi
 * huomaamatta pyramidin alle, ruudulla olisi kaksi lähdettä
 * päällekkäin. Varapolulla (`?reliefipyramidi=0`) vaatimus on entinen.
 */
vaadi(`${nimiA}: ${a.tila?.laastari?.reliefipyramidi
  ? 'pyramidin alla ei ole linssin omaa kalvotekstuuria'
  : 'linssin pohjatekstuuri on valmiiksi käännetty ImageBitmap'}`,
  a.tila?.laastari?.reliefipyramidi
    ? a.tekstuuri === null
    : (a.tekstuuri?.laji === 'ImageBitmap' && a.tekstuuri?.flipY === false),
  JSON.stringify(a.tekstuuri));

vaadi(`${nimiA}: ei sivuvirheitä`, a.virheet.length === 0, a.virheet.slice(0, 3).join(' | '));

/*
 * VASTAKOE: `?topopeite=0` ottaa odotuspeitteen pois, jolloin portti
 * menee päälle heti kuten ennen korjausta. Silloin paljaan kartan
 * näytteitä ON — ja juuri se todistaa, että väite (b) mittaa oikeaa
 * asiaa eikä kerro vain siitä, että jokin on tummaa.
 */
/*
 * ══════════════════════════════════════════════════════════════════════
 * LINSSIKETJU: NAPAUTUKSESTA ENSIMMÄISEEN RELIEFIKEHYKSEEN
 * ══════════════════════════════════════════════════════════════════════
 *
 * Omistajan vika 18.9.2026: avauksesta kuluu lähes sekunti ennen kuin
 * reliefi on ruudulla. Loki on pelin oma (js/reliefipyramidi.js), ja
 * kello käynnistyy NAPAUTUKSESTA (js/ui.js valitseLinssi) eikä siitä,
 * milloin `sytytaLinssi` pääsee ajoon — pelaajan odotus alkaa napista.
 *
 * KATTO ON 400 ms CHROMIUMILLA. WebKit ajaa saman rungon
 * ohjelmallisella kaappauksella ja hitaammalla kankaalla, ja sen luku
 * KIRJATAAN mutta ei kaada vartijaa: moottorien ero ei ole pelin vika,
 * ja WebKitin oma vaatimus (Raamattu LISAYS 16 kohta 49) on se, että
 * ensimmäinen reliefilaatta on ruudulla eikä seepiaa haeta.
 */
const ketjuRivi = (loki) => loki.map((r) => `${r.vaihe} ${r.ms}`).join(' → ');
console.log(`\n  linssiketju (${MOOTTORI}): ${ketjuRivi(a.ketju) || '—'}`);
console.log(`  muisti ennen:   ${JSON.stringify(a.muistiEnnen)}`);
console.log(`  muisti jälkeen: ${JSON.stringify(a.muistiJalkeen)}`);
console.log(`  nimiön kontrasti: ${JSON.stringify(a.kontrasti)}`);

const ruudulla = a.ketju.find((r) => r.vaihe === 'laatta-ruudulla')?.ms ?? null;
const KETJUN_KATTO_MS = 400;
vaadi(`${nimiA}: napautuksesta ensimmäiseen reliefikehykseen alle ${KETJUN_KATTO_MS} ms`,
  MOOTTORI === 'webkit' ? ruudulla !== null : (ruudulla !== null && ruudulla < KETJUN_KATTO_MS),
  `${ruudulla ?? '—'} ms — ${ketjuRivi(a.ketju)}`);

/*
 * ══════════════════════════════════════════════════════════════════════
 * NIMIÖN VAALEA REUNUS KANTAA (WCAG 1.4.3, 4,5:1)
 * ══════════════════════════════════════════════════════════════════════
 *
 * Reunus (js/pallolaatat.js NIMION_HALO) lisättiin v1939:ssä, koska
 * seepiaa varten poltettu nimiö hukkui vaihtelevaan reliefiin. Vartija
 * mittaa, ONKO siitä apua: tekstin ja sen välittömän taustan suhde
 * sekä tummimmalla että vaaleimmalla reliefialueella. Mitta on pelin
 * omista laatoista ja pelin omilla vakioilla — ks. KONTRASTI yllä.
 */
const KONTRASTIN_KATTO = 4.5;
/*
 * MITTA ON MEDIAANI EIKÄ PIENIN, ja syy on mitattu (18.9.2026,
 * Chromium ja WebKit, 2 620 / 2 617 mustepikseliä): pienin arvo on
 * molemmilla moottoreilla 1,04 eikä se tule nimiöstä lainkaan vaan
 * VIIVAMERKKIEN umpinaisista sisuksista. Sama muste latoo nostotasolle
 * sekä kirjaimet että pienen vuori- ja tassumerkin, ja paksun merkin
 * sisällä lähin ei-mustepikseli on itsekin mustetta — reunus ei voi
 * eikä sen pidä loistaa merkin sisään. WCAG 1.4.3 koskee TEKSTIÄ, ja
 * mediaani on se luku, joka kertoo kirjaimen ja sen reunuksen
 * suhteesta. `pienin` jää lokiin, jotta poikkeama näkyy.
 */
console.log(`  kontrastin mediaani: tummin ${a.kontrasti?.tummin?.mediaani}, `
  + `vaalein ${a.kontrasti?.vaalein?.mediaani} (pienin ${a.kontrasti?.kaikkiPienin}, `
  + `otos ${a.kontrasti?.pikseleita} pikseliä)`);
vaadi(`${nimiA}: nimiön kontrasti reunusta vasten >= ${KONTRASTIN_KATTO}:1 tummimmalla reliefillä`,
  (a.kontrasti?.tummin?.mediaani ?? 0) >= KONTRASTIN_KATTO,
  JSON.stringify(a.kontrasti));
vaadi(`${nimiA}: nimiön kontrasti reunusta vasten >= ${KONTRASTIN_KATTO}:1 vaaleimmalla reliefillä`,
  (a.kontrasti?.vaalein?.mediaani ?? 0) >= KONTRASTIN_KATTO,
  JSON.stringify(a.kontrasti));

const b = await ajaAvaus({ peite: false });
vaadi(`${nimiA}: vastakoe — ilman odotuspeitettä kartta on paljaana`,
  b.paljaita > 0,
  `paljaita ${b.paljaita} / ${b.avausNaytteita} näytettä, avaus ${b.avausMs} ms`);
vaadi(`${nimiA}: vastakoe — jäänteiden piilotus ei riipu peitteestä`,
  b.jalkeenJaanteet.length === 0,
  JSON.stringify(b.jalkeenJaanteet.slice(0, 8)));

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi.`);
if (kaatui.length) process.exitCode = 1;
