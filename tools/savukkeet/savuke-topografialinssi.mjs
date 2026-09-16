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
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
  /*
   * Ilman tätä Chromium ei päästä isoisän luentaa soimaan ilman elettä,
   * eikä luennan tila (pulun pluskupla, luentakuvapakka) synny lainkaan
   * — ja juuri se tila on omistajan vika 16.9.2026 klo 15.30.
   */
  args: ['--autoplay-policy=no-user-gesture-required'],
});

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
  /*
   * LINSSIN ON PIIRRETTÄVÄ JOTAIN ENNEN KUIN SITÄ MITATAAN. Ilman
   * laastaria (vastakoe) se on koko pallon kalvo, laastarin kanssa
   * laastari. Odotus on rajattu: jos kumpikaan ei ole näkyvissä 30
   * sekunnissa, seuraavat väitteet kaatuvat kuten kuuluukin. Ilman
   * tätä savuke mittasi ajoittain kesken jäänyttä häivytystä —
   * mitattuna 16.9.2026 kuormitetussa kontissa sivun kehyssilmukka ja
   * ajastimet voivat pysähtyä sekunneiksi kesken linssin avautumisen.
   */
  await sivu.waitForFunction(() => {
    const t = window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.();
    return Boolean(t) && (t.perusKalvo === true || t.tarkennus?.paalla === true);
  }, null, { timeout: 30000 }).catch(() => null);

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
  if (!tarkennus) {
    // Vastakoe: laastaria ei tule, joten mitataan vasta kun koko pallon
    // kalvo on oikeasti näkyvissä (sama rajattu odotus kuin yllä).
    await sivu.waitForFunction(() => {
      const t = window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.();
      return Boolean(t) && t.perusKalvo === true;
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
  /*
   * ODOTETAAN TILAA, EI KELLOA. Yleiskuvaan siirtyminen purkaa
   * laastarin ja häivyttää koko pallon kalvon takaisin näkyviin, ja
   * 8k-pohja puretaan 33,5 megapikselistä — kuormitetussa kontissa se
   * vie sekunteja. Kiinteä odotus mittasi silloin kontin nopeutta eikä
   * linssiä (mitattu 16.9.2026: 3,5 s riitti 4k:lle muttei 8k:lle).
   * Raja on silti tiukka: jos tila ei asetu 20 sekunnissa, väite
   * kaatuu.
   */
  await sivu.waitForFunction(() => {
    const t = window.matkakirja?.ui?.pallolinssi?.kahva?.tila?.();
    return Boolean(t) && t.perusKalvo === true && t.tarkennus?.paalla === false;
  }, null, { timeout: 20000 }).catch(() => null);
  await sivu.waitForTimeout(600);
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
    `${tiheys.toFixed(1)} px/aste (4k-pallokuva ${PERUSKUVAN_TIHEYS.toFixed(1)}, lähde ${LAHTEEN_TIHEYS})`);

  /*
   * POHJAKUVA VALITAAN RUUDUN MUKAAN (16.9.2026, js/linssit/reliefikuva.js
   * valitseReliefi): leveällä ruudulla 8192 px (22,8 px/aste), kapealla
   * 4096 px (11,4 px/aste). Sama valinta kuin Astronautin kameralla.
   */
  const odotettuPohja = ruutu.viewport.width >= 1024 ? '8k' : '4k';
  vaadi(`${nimi}: pohjakuva on ruudulle oikea (${odotettuPohja})`,
    r.lahi.laastari?.pohja === odotettuPohja,
    JSON.stringify({
      pohja: r.lahi.laastari?.pohja, tiheys: r.lahi.laastari?.pohjanTiheys,
      kynnys: r.lahi.laastari?.tarkennus?.kynnys,
    }));

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
    JSON.stringify({
      peitto: r.uloin.laastari?.perusPeitto, tavoite: r.uloin.laastari?.perusTavoite,
      ladattu: r.uloin.laastari?.perusLadattu, pohja: r.uloin.laastari?.pohja,
      laastari: r.uloin.laastari?.tarkennus?.paalla,
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
  const cdp = await konteksti.newCDPSession(sivu);

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
    if (await nakyvissa('.pollo-kuplapalautus') && await nakyvissa('.fokusvirta-luentakuva')) break;
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
      window.__topo.naytteet.push({
        t: +performance.now().toFixed(1),
        portti: document.body.classList.contains('aikajana-paalla'),
        peitto: t?.perusPeitto ?? null,
        tavoite: t?.perusTavoite ?? null,
        peite: t?.peite ?? null,
      });
      requestAnimationFrame(askel);
    };
    requestAnimationFrame(askel);
  });

  /* --- kompositorin kehykset (ks. a) yllä) -------------------------- */
  const kehykset = [];
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
  await sivu.waitForTimeout(2500);

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
    return Boolean(t) && (t.perusPeitto ?? 0) >= (t.perusTavoite ?? 0.72) * 0.98;
  }, null, { timeout: 120000 }).catch(() => null);
  await sivu.waitForTimeout(1200);
  await cdp.send('Page.stopScreencast').catch(() => {});

  const data = await sivu.evaluate(() => {
    window.__topo.kaynnissa = false;
    return { alku: window.__topo.alku, pitkat: window.__topo.pitkat, naytteet: window.__topo.naytteet };
  });
  const jalkeenJaanteet = await sivu.evaluate(`(${JAANTEET})()`);
  const tila = await sivu.evaluate(`(${TILA})()`);
  const kuva = Buffer.from(
    (await cdp.send('Page.captureScreenshot', { format: 'png' })).data, 'base64',
  );
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
  const valmis = data.naytteet.find((s) => (s.peitto ?? 0) >= (s.tavoite ?? 0.72) * 0.98);
  const loppu = valmis ? valmis.t - t0 : Infinity;
  const ennenRivit = rivit.filter((x) => x.t < 0);
  const avausRivit = rivit.filter((x) => x.t >= 0 && x.t <= loppu);
  const ennenKirkkaus = ennenRivit.length
    ? ennenRivit.reduce((a, b) => a + b.kirkkaus, 0) / ennenRivit.length : 0;

  /* Paljaan kartan näytteet: portti auki, ei peitettä eikä reliefiä. */
  const avausNaytteet = data.naytteet.filter((s) => s.t >= t0 && s.t - t0 <= loppu);
  const paljaat = avausNaytteet.filter(
    (s) => s.portti === true && (s.peitto ?? 0) < 0.05 && s.peite !== true,
  );

  const pitkat = data.pitkat.map((l) => ({ dt: l.alku - t0, kesto: l.kesto }));
  const lepo = pitkat.filter((l) => l.dt < 0).map((l) => l.kesto);
  const avaus = pitkat.filter((l) => l.dt >= 0 && l.dt <= loppu).map((l) => l.kesto);

  return {
    luentaSoi,
    ennenJaanteet,
    jalkeenJaanteet,
    tila,
    purku,
    tekstuuri,
    virheet,
    ennenKirkkaus,
    avausKehykset: avausRivit.length,
    avausHuippu: avausRivit.length ? Math.max(...avausRivit.map((x) => x.kirkkaus)) : 0,
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
 * MUU EI MUUTU: luenta, saapumiskuva ja pulun pluskupla ovat yhä
 * pakollisia, ja juuri ne ovat se tila, jossa omistaja linssin avasi.
 * Mittaukset (a) kirkkaus, (b) paljas kartta ja (c) jäänteet ajetaan
 * kytkimestä riippumatta.
 */
const PAKKA_KARTALLA = /^export const LUENTAKUVAPAKKA_KARTALLA = true;$/m
  .test(readFileSync(new URL('../../js/fokusvirta.js', import.meta.url), 'utf8'));
const pakkaRuudulla = a.ennenJaanteet.some((x) => x.valitsin.includes('fokusvirta-luentakuva'));

vaadi(`${nimiA}: omistajan tila toistui (luenta, saapumiskuva, pluskupla, kuvapakka)`,
  a.luentaSoi
    && a.ennenJaanteet.some((x) => x.valitsin.includes('pollo-kuplapalautus'))
    && (PAKKA_KARTALLA ? pakkaRuudulla : !pakkaRuudulla),
  `luenta ${a.luentaSoi}, pluskupla `
  + `${a.ennenJaanteet.some((x) => x.valitsin.includes('pollo-kuplapalautus'))}, kuvapakka `
  + `${pakkaRuudulla} (odotus ${PAKKA_KARTALLA}, LUENTAKUVAPAKKA_KARTALLA=${PAKKA_KARTALLA}); `
  + `ennen linssiä ruudulla ${JSON.stringify(a.ennenJaanteet.slice(0, 6))}`);

/*
 * (a) EI VAALEAA VÄLIVAIHETTA. Omistajan sanat: *"vaalea kartta piirtyy
 * ilmeisesti ensin ja sitten Topografia sen päälle"*. Ruudun
 * keskipisteen kirkkaus ei saa avauksen aikana nousta yli sen, mitä se
 * oli ENNEN linssiä — ei kymmentäkään prosenttia. Näytteitä on
 * kompositorin kehyksistä, ja niitä vaaditaan vähintään 20, jottei
 * väite mene läpi tyhjällä otoksella.
 */
vaadi(`${nimiA}: avauksen aikana ruutu ei ole kertaakaan ennen-linssiä-tasoa vaaleampi`,
  a.avausKehykset >= 20 && a.avausHuippu <= a.ennenKirkkaus * 1.1,
  `kehyksiä ${a.avausKehykset}, huippu ${a.avausHuippu.toFixed(1)}, `
  + `ennen linssiä ${a.ennenKirkkaus.toFixed(1)} (raja ${(a.ennenKirkkaus * 1.1).toFixed(1)})`);

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
vaadi(`${nimiA}: avaus ei kolminkertaista sivun omaa pisintä tehtävää`,
  a.lepoPisin > 0 && a.avausPisin <= a.lepoPisin * 3,
  `lepo ${a.lepoPisin} ms, avaus ${a.avausPisin} ms (raja ${(a.lepoPisin * 3).toFixed(0)} ms)`);

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
vaadi(`${nimiA}: linssin pohjatekstuuri on valmiiksi käännetty ImageBitmap`,
  a.tekstuuri?.laji === 'ImageBitmap' && a.tekstuuri?.flipY === false,
  JSON.stringify(a.tekstuuri));

vaadi(`${nimiA}: ei sivuvirheitä`, a.virheet.length === 0, a.virheet.slice(0, 3).join(' | '));

/*
 * VASTAKOE: `?topopeite=0` ottaa odotuspeitteen pois, jolloin portti
 * menee päälle heti kuten ennen korjausta. Silloin paljaan kartan
 * näytteitä ON — ja juuri se todistaa, että väite (b) mittaa oikeaa
 * asiaa eikä kerro vain siitä, että jokin on tummaa.
 */
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
