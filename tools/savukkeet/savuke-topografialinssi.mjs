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
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

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

/** Yksi ruutu: peli auki Pariisiin, linssi päälle, mittaukset. */
async function ajaRuutu(ruutu, { tarkennus = true } = {}) {
  const virheet = [];
  const konteksti = await selain.newContext({ ...ruutu, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
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
  const cdp = await konteksti.newCDPSession(sivu);
  const kuvaa = async () => Buffer.from(
    (await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64',
  );
  const lue = () => sivu.evaluate(`(${TILA})()`);

  const osoite = `http://127.0.0.1:${PORTTI}/index.html?lauta=pallo${tarkennus ? '' : '&tarkennus=0'}`;
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
  writeFileSync(join(ULOS, `topografialinssi-${ruutu.nimi}-lahi${tarkennus ? '' : '-vastakoe'}.png`), lahikuva);

  /* ---- uloimpaan sallittuun: mahtuuko koko pallo? ------------------- */
  await sivu.evaluate(() => {
    const lauta = window.matkakirja.ui.pallolauta;
    const ohj = lauta.pallo.controls();
    const R = lauta.pallo.getGlobeRadius();
    const pov = lauta.pallo.pointOfView();
    lauta.kamera?.pysaytaKameraAjo?.();
    lauta.pallo.pointOfView({ lat: pov.lat, lng: pov.lng, altitude: ohj.maxDistance / R - 1 }, 0);
  });
  await sivu.waitForTimeout(3500);
  const uloin = await lue();
  const pallokuva = await kuvaa();
  writeFileSync(join(ULOS, `topografialinssi-${ruutu.nimi}-pallo${tarkennus ? '' : '-vastakoe'}.png`), pallokuva);

  /* ---- linssi kiinni ------------------------------------------------ */
  await sivu.evaluate(() => window.matkakirja.ui.valitseLinssi(null));
  await sivu.waitForTimeout(4000);
  const kiinni = await lue();

  await konteksti.close();
  return {
    ennen, avattu, lahi, uloin, kiinni, virheet, lahteet,
    teravyysLahi: teravyys(lahikuva),
  };
}

/* ═══════════════════════════════ ajo ═══════════════════════════════ */

for (const ruutu of RUUDUT) {
  const r = await ajaRuutu(ruutu);
  const nimi = `${ruutu.nimi} px`;

  /* 1. TARKKUUS */
  const t = r.lahi.laastari?.tarkennus ?? null;
  const tiheys = t?.kangas && t?.ikkuna
    ? t.kangas.leveys / (t.ikkuna.lng1 - t.ikkuna.lng0) : 0;
  vaadi(`${nimi}: tarkennuslaastari on päällä lähizoomissa`,
    Boolean(t?.paalla) && r.lahi.laastari?.perusKalvo === false,
    JSON.stringify({ paalla: t?.paalla, perus: r.lahi.laastari?.perusKalvo, rakennuksia: t?.rakennuksia }));
  vaadi(`${nimi}: laastarin kangas on lähteen omassa tiheydessä`,
    tiheys >= LAHTEEN_TIHEYS * 0.9 && tiheys >= PERUSKUVAN_TIHEYS * 2.5,
    `${tiheys.toFixed(1)} px/aste (pallokuva ${PERUSKUVAN_TIHEYS.toFixed(1)}, lähde ${LAHTEEN_TIHEYS})`);

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
  vaadi(`${nimi}: yleiskuvassa laastari on pois ja koko pallon kalvo näkyvissä`,
    r.uloin.laastari?.tarkennus?.paalla === false && r.uloin.laastari?.perusKalvo === true,
    JSON.stringify(r.uloin.laastari));
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

  /* 1b. TERÄVYYS: laastarin lähde vs. koko pallon kalvon lähde */
  const L = r.lahteet;
  /*
   * KAKSI KYNNYSTÄ, ERI LUONNETTA. Lähdepikselien suhde on pelkkää
   * geometriaa (10800 / 4096 × sama ikkuna = 2,64) ja siksi tiukka.
   * Terävyyden suhde riippuu siitä, mitä ikkunassa sattuu olemaan —
   * mitattu 16.9.2026: 2,45× (Alpit, 4°), 1,51× (390 px:n ikkuna) ja
   * 1,38× (1400 px:n ikkuna, jossa pallokuvassakin on jo hienojakoista
   * vaihtelua 512 pikseliin piirrettynä). Kynnys on 1,25, jotta
   * vartija kertoo regressiosta eikä maisemasta.
   */
  vaadi(`${nimi}: laastarin lähde on mitattavasti terävämpi`,
    Boolean(L) && L.uusi.teravyys > L.vanha.teravyys * 1.25
      && L.uusi.lahdePx > L.vanha.lahdePx * 2.5,
    L ? `terävyys ${L.vanha.teravyys} → ${L.uusi.teravyys} `
      + `(${(L.uusi.teravyys / L.vanha.teravyys).toFixed(2)}×), lähdepikseleitä `
      + `${L.vanha.lahdePx} → ${L.uusi.lahdePx}` : 'mittaa ei saatu');

  /* 5. VASTAKOE: ilman laastaria linssi jää koko pallon kalvoon */
  const v = await ajaRuutu(ruutu, { tarkennus: false });
  vaadi(`${nimi}: vastakoe — ?tarkennus=0 jättää laastarin pois`,
    v.lahi.laastari?.tarkennus?.paalla !== true && v.lahi.laastari?.perusKalvo === true,
    JSON.stringify(v.lahi.laastari));
  /*
   * VARAPOLKU ON OLTAVA EHJÄ. Jos laite ei jaksa purkaa 10800 pikselin
   * kuvaa, linssin on silti näytettävä reliefiä koko pallon kalvolla —
   * ei tyhjää karttaa. Mitta on ruudun terävyys: se ei erottele
   * lähteitä luotettavasti (linssin alla oleva laattakartta hallitsee
   * gradienttia), mutta se erottaa PIIRRETYN linssin piirtämättömästä.
   */
  vaadi(`${nimi}: vastakoe — ilman laastaria linssi piirtää yhä reliefin`,
    v.lahi.laastari?.perusKalvo === true && v.teravyysLahi > 0,
    `ruudun terävyys ilman laastaria ${v.teravyysLahi}, laastarilla ${r.teravyysLahi}; `
    + `pelin elementtejä ${Object.values(v.lahi.elementit ?? {}).reduce((a, b) => a + b, 0)} `
    + JSON.stringify(v.lahi.elementit));
}

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi.`);
if (kaatui.length) process.exitCode = 1;
