/*
 * SELAINSAVUKE: SATELLIITTILINSSI (NASAn astronauttien Maa-kuvat).
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-satelliittilinssi.mjs
 *
 * Yksikkötestit näkevät aineiston ja puhtaat funktiot; ne eivät näe,
 * hohtaako piste pallolla, vaihtuuko YLÄPALKKI kokonaan, avautuuko
 * havaintokuva lähes koko ruudun kokoisena ja pysyykö PELITILA
 * koskemattomana. Ne mitataan tässä oikealla pallolaudalla.
 *
 * VERKKO: kaikki muu ulkoinen liikenne katkaistaan, mutta ämpäri
 * (laatat, Globe.gl) ja NASAn kuva-ämpäri tarjoillaan Noden fetchin
 * kautta — juuri niin kuin selain ne oikeassa pelissä hakee. NASAn
 * kuva-ämpäri EI lähetä CORS-otsaketta, mutta se ei haittaa: linssi
 * näyttää kuvat tavallisina <img>-elementteinä eikä lue niitä
 * canvasille tai fetchillä (tarkistettu 12.9.2026).
 *
 * VÄITTEET:
 *   1. Linssi syttyy laukusta pallolle: ui.pallolinssi === 'satelliitti',
 *      jokaiselle kohteelle yksi merkki, linssikarttaa EI avata
 *      (svg#board pysyy tyhjänä) ja pallo on yhä lautana.
 *   2. KOKO YLÄPALKKI VAIHTUU eikä siinä ole VETOLAATIKKOA (omistaja
 *      12.9.2026: *"Ota yläpalkin vetolaatikko pois"*). Palkin korkeus
 *      on Matkakirjan oman palkin mitattu korkeus — myös silloin kun
 *      kohteen nimi on siinä.
 *   3. Hohtavat vihreät pisteet: merkit ovat vihreitä, näkyviä ja
 *      nimettyjä; hehku ei sykähtele (ei loputonta animaatiota).
 *   4. PALLON TAKAPUOLEN MERKKI EI OTA NAPAUTUKSIA, ja LINSSIN AIKANA
 *      VAIN VIHREÄ PISTE ON NAPAUTETTAVA (omistaja 12.9.2026: *"Ja
 *      kartalta ei saa voida klikata mitään muita kohteita kuin niitä
 *      vihreitä kohteita"*): kaupunkipiste, karttanosto, eläintäky,
 *      nimilappu ja tyhjä meri eivät avaa mitään eivätkä liikuta kameraa.
 *   5. Vihreän pisteen napautus avaa kuvan HETI KOKO RUUTUUN, oma
 *      kuvasuhde säilyy, eikä kuvan päällä ole muuta tekstiä kuin
 *      lähdeleima. Kohteen nimi on vain yläpalkissa.
 *   6. Napit: sulkuristi alaoikealla (≥ 44 px, irti reunasta, ei
 *      minkään alla), pikkukuvat kuvan päällä alareunassa.
 *   7. Sormizoom: nipistys zoomaa kuvaa, pallon kamera EI liiku,
 *      katto on kuvan oma tarkkuus, panorointi toimii.
 *   8. Info-nappi avaa pienen popupin, jossa aineisto, aika, alue,
 *      kuvaustapa, lisenssi ja lähdelinkit; popup sulkeutuu.
 *   9. Galleria kuvan päällä: pikkukuvat, laskuri, nuolet, Vertaa —
 *      ja zoom nollautuu otosta vaihdettaessa.
 *  10. Sulkuristi sulkee havaintoikkunan mutta EI linssiä.
 *  11. Linssin merkit eivät kuluta pelivuoroa.
 *  12. Sulje linssi palauttaa yläpalkin, pelitilan ja tallennuksen
 *      täsmälleen; merkit ja palkki poistuvat. Ei sivuvirheitä.
 *
 * Sama ajo tehdään työpöydällä, iPadilla (834 × 1194) ja puhelimella
 * (390 × 844): omistaja arvioi palkin ja havaintoikkunan jokaisesta, ja
 * mobiilissa palkin on pysyttävä yhtenä tiiviinä rivinä.
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

const VALIMUISTI = new Map();
async function ulkohaku(url) {
  if (VALIMUISTI.has(url)) return VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  VALIMUISTI.set(url, lupaus);
  return lupaus;
}

const palvelin = createServer((req, res) => {
  const suhteellinen = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const polku = join(JUURI, suhteellinen);
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8749, r));

const paketti = await import(process.env.PLAYWRIGHT_JS ?? '/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' });

const NAKYMAT = {
  tyopoyta: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
};

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

async function avaaSivu(nakyma, virheet) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  // Ämpäri ja NASAn kuva-ämpäri Noden kautta; muu verkko katki.
  await sivu.route(/media\.matkakirja\.app|r2\.dev|images-assets\.nasa\.gov/,
    async (route) => {
      const vastaus = await ulkohaku(route.request().url());
      if (!vastaus) { route.abort(); return; }
      route.fulfill({
        status: 200,
        contentType: vastaus.tyyppi ?? 'application/octet-stream',
        body: vastaus.body,
        headers: { 'access-control-allow-origin': '*' },
      });
    });
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  return { konteksti, sivu };
}

async function avaaPeli(s) {
  await s.goto('http://127.0.0.1:8749/index.html?lauta=pallo', { waitUntil: 'load' });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await s.waitForTimeout(2500);
  await s.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'ateena' };
    game.world.visited.add('ateena');
    game.phase = 'action';
    ui.render();
  });
  await s.waitForTimeout(1200);
  const pallo = await s.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
  await s.waitForTimeout(1500);
  /*
   * SAAPUMISPINNAT POIS ENNEN KUVIA. Pakotettu saapuminen Ateenaan avaa
   * kohtaamiskuvan ja saapumiskortin pallon päälle; ne eivät kuulu
   * linssiin, mutta peittäisivät kaappauksissa juuri sen, mitä
   * mitataan. Suljetaan kuten pelaaja: Escape ja kortin oma sulku.
   */
  await s.keyboard.press('Escape');
  await s.evaluate(async () => {
    const { suljeFokusvirta } = await import('/js/fokusvirta.js');
    suljeFokusvirta(window.matkakirja.ui);
  });
  await s.waitForTimeout(600);
  await s.evaluate(() => {
    for (const v of ['[aria-label*="Sulje"]', '.saapumistraileri-sulje', '.arrival-close']) {
      document.querySelector(v)?.click();
    }
    document.querySelector('dialog[open]')?.close?.();
    // Saapumistraileri ohitetaan napauttamalla sen kehystä (js/saapumistraileri.js).
    document.querySelector('.saapumistraileri')
      ?.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    /*
     * Saapumisvirran isokuva jää pystyyn, koska savuke pakotti pelaajan
     * Ateenaan ilman oikeaa matkaa. Se ei ole linssin pinta eikä sillä
     * ole tekemistä mitattavien väitteiden kanssa — poistetaan, jotta
     * kaappauksissa näkyy pallo eikä saapumiskuva.
     */
    for (const el of document.querySelectorAll('.fokusvirta-isokuva, .saapumistraileri')) el.remove();
  });
  await s.waitForTimeout(1600);
  const peittava = await s.evaluate(() => {
    // Mikä tahansa pinta, joka peittää yli puolet ruudusta pallon päällä.
    const nimet = [];
    for (const el of document.body.querySelectorAll('body > *, .map-pane > *')) {
      const r = el.getBoundingClientRect();
      const t = getComputedStyle(el);
      if (t.display === 'none' || t.visibility === 'hidden' || Number(t.opacity) < 0.05) continue;
      if (r.width * r.height > window.innerWidth * window.innerHeight * 0.5
        && !el.classList.contains('pallo-kuori') && el.tagName !== 'SCRIPT') {
        nimet.push(el.className || el.tagName);
      }
    }
    return nimet;
  });
  if (peittava.length) console.log(`    (peittäviä pintoja: ${peittava.join(', ')})`);
  return pallo;
}

/** Pelitilan tiiviste: linssi ei saa muuttaa tästä mitään. */
const PELITILA = () => {
  const { game } = window.matkakirja;
  return JSON.stringify({
    vaihe: game.phase,
    paikka: game.player.pos,
    rahat: game.player.money,
    paiva: game.world?.day ?? null,
    aarteet: (game.player.treasures ?? []).length,
    tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
  });
};

/** Kameran tila: ele kuvan päällä ei saa liikuttaa palloa. */
const KAMERA = () => JSON.stringify(window.matkakirja.ui.pallolauta.kamera.kameranTila() ?? null);

/** Merkin ruutupaikka kohteen tunnuksella (pallon oma projektio). */
const RUUTUPAIKKA = (tunnus) => {
  const { ui } = window.matkakirja;
  const kohde = window.__satelliitti.find((k) => k.tunnus === tunnus);
  /*
   * PAIKKA LUETAAN MERKIN OMASTA ELEMENTISTÄ, kun se on ruudulla:
   * CSS2D-solmu on siellä, minne kirjasto sen piirsi, kun taas
   * projektio voi olla kesken olevan kameran takia vanhentunut.
   */
  const el = [...document.querySelectorAll('.satelliitti-piste')]
    .find((e) => e.querySelector('.satelliitti-nimi')?.textContent === kohde.nimi);
  if (el && !el.classList.contains('pallolauta-takana')) {
    const r = el.getBoundingClientRect();
    if (r.width || r.height || r.left || r.top) {
      return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
    }
  }
  const p = ui.pallonInstanssi?.getScreenCoords?.(kohde.lat, kohde.lon, 0);
  const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori')?.getBoundingClientRect();
  if (!p || !kotelo) return null;
  return { x: Math.round(kotelo.left + p.x), y: Math.round(kotelo.top + p.y) };
};

/** Avoinna olevat pelin pinnat — mikä tahansa kortti, lehti tai kerros. */
const PINNAT = () => {
  const val = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
    + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup, .satelliitti-katselu,'
    + ' .arrival, .arrival-card, .saapumistraileri, .fokusvirta-isokuva, dialog[open]';
  return [...document.querySelectorAll(val)].map((e) => e.className || e.tagName);
};

async function ajaNakyma(nakymanNimi) {
  const virheet = [];
  const { konteksti, sivu: s } = await avaaSivu(NAKYMAT[nakymanNimi], virheet);
  const kuva = (t) => join(ULOS, `savuke-satelliitti-${nakymanNimi}-${t}.png`);
  // Konttiympäristön ohjelmisto-WebGL piirtää hitaasti: kaappaus saa
  // epäonnistua ilman että koko ajo kaatuu.
  const kaappaa = async (t) => {
    await s.screenshot({ path: kuva(t), timeout: 90000 }).catch((e) => console.log(`    (kaappaus ${t} ei onnistunut: ${e.message.split('\n')[0]})`));
  };
  const nimessa = (t) => `${t} (${nakymanNimi})`;
  const pallo = await avaaPeli(s);
  vaadi(nimessa('pallolauta avautuu'), pallo, 'ui.pallolauta ei syntynyt');

  const ennen = await s.evaluate(PELITILA);
  // Matkakirjan oman palkin korkeus ENNEN linssiä: linssin palkin on
  // oltava sama, eikä kohteen nimi saa sitä muuttaa.
  const topbarEnnen = await s.evaluate(() => document.querySelector('.topbar')?.getBoundingClientRect().height ?? 0);

  /* --- 1. Linssi laukusta pallolle ---------------------------------- */
  const syttyi = await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('satelliitti')) ui.game.player.linssit.push('satelliitti');
    ui.valitseLinssi('satelliitti');
    for (let i = 0; i < 400; i += 1) {
      if (ui.pallolinssi?.tunnus === 'satelliitti') break;
      await new Promise((r) => setTimeout(r, 25));
    }
    const moduuli = await import('/js/linssit/satelliitti-data.js');
    window.__satelliitti = moduuli.SATELLIITTI_KOHTEET;
    await new Promise((r) => setTimeout(r, 900));
    return {
      pallolinssi: ui.pallolinssi?.tunnus ?? null,
      linssikartta: Boolean(ui.linssikartta),
      lautaNakyy: ui.pallolauta?.paalla?.() === true,
      boardLapsia: document.querySelectorAll('#board > *').length,
      merkkeja: document.querySelectorAll('.satelliitti-piste').length,
      kohteita: moduuli.SATELLIITTI_KOHTEET.length,
    };
  });
  vaadi(nimessa('linssi syttyy pallolle: yksi merkki per kohde, linssikarttaa ei avata'),
    syttyi.pallolinssi === 'satelliitti' && !syttyi.linssikartta && syttyi.lautaNakyy
      && syttyi.merkkeja === syttyi.kohteita && syttyi.boardLapsia === 0,
    JSON.stringify(syttyi));

  /* --- 2. Koko yläpalkki vaihtuu — EIKÄ SIINÄ OLE VETOLAATIKKOA ----- */
  const palkki = await s.evaluate(() => {
    const topbar = document.querySelector('.topbar');
    const oma = document.querySelector('.satelliittipalkki');
    const tyyli = topbar ? getComputedStyle(topbar) : null;
    const omaTyyli = oma ? getComputedStyle(oma) : null;
    const kartta = oma?.parentElement ?? null;
    return {
      topbarNakyvyys: tyyli?.visibility ?? null,
      topbarKorkeus: topbar?.getBoundingClientRect().height ?? null,
      palkkeja: document.querySelectorAll('.satelliittipalkki').length,
      omaKorkeus: oma?.getBoundingClientRect().height ?? null,
      omaLeveys: oma?.getBoundingClientRect().width ?? null,
      karttaLeveys: kartta?.getBoundingClientRect().width ?? null,
      karttaKorkeus: kartta?.getBoundingClientRect().height ?? null,
      ikkunanKorkeus: window.innerHeight,
      bodyLuokat: ['aikajana-palkki-auki', 'aikajana-paalla'].filter((l) => document.body.classList.contains(l)),
      sulje: document.querySelector('.satelliittipalkki-sulje')?.textContent ?? null,
      // OMISTAJA 12.9.2026: "Ota yläpalkin vetolaatikko pois".
      valintoja: document.querySelectorAll('.satelliittipalkki select, .satelliittipalkki-valinta').length,
      kohdenimi: document.querySelector('.satelliittipalkki-kohde')?.textContent ?? null,
      ohjeNakyy: oma && omaTyyli
        ? getComputedStyle(document.querySelector('.satelliittipalkki-ohje')).display !== 'none' : null,
    };
  });
  vaadi(nimessa('yläpalkissa EI ole vetolaatikkoa — vain linssin nimi, kohteen nimi ja Sulje linssi'),
    palkki.valintoja === 0 && palkki.sulje === 'Sulje linssi' && palkki.kohdenimi === '',
    JSON.stringify(palkki));
  vaadi(nimessa('koko yläpalkki vaihtuu: Matkakirjan palkki piilossa, yksi linssipalkki, kartta ei kutistu'),
    palkki.topbarNakyvyys === 'hidden' && palkki.topbarKorkeus === 0 && palkki.palkkeja === 1
      && Math.abs(palkki.omaKorkeus - topbarEnnen) < 2
      && palkki.omaLeveys >= palkki.karttaLeveys - 4
      && palkki.karttaKorkeus > palkki.ikkunanKorkeus * 0.9
      && palkki.bodyLuokat.length === 2,
    JSON.stringify({ ...palkki, topbarEnnen }));
  if (nakymanNimi === 'puhelin') {
    vaadi(nimessa('mobiilissa yksi tiivis rivi: ohje väistyy, palkki ei kasva kahdeksi riviksi'),
      palkki.ohjeNakyy === false && palkki.omaKorkeus < 80, JSON.stringify(palkki));
  }
  await kaappaa('palkki');

  /* --- 3. Hohtavat vihreät pisteet ---------------------------------- */
  await s.evaluate(async () => {
    const { ui } = window.matkakirja;
    const richat = window.__satelliitti.find((k) => k.tunnus === 'richat');
    await ui.pallolauta.kamera.ajaKamera({ lat: richat.lat, lng: richat.lon, leveys: 2600 }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 1200));
  });
  await s.waitForTimeout(1500);
  const hehku = await s.evaluate(() => {
    const merkit = [...document.querySelectorAll('.satelliitti-piste')];
    const edessa = merkit.filter((el) => !el.classList.contains('pallolauta-takana'));
    const yksi = edessa[0];
    const rengas = yksi?.querySelector('.satelliitti-rengas');
    const hehkuEl = yksi?.querySelector('.satelliitti-hehku');
    const nimi = yksi?.querySelector('.satelliitti-nimi');
    const t = rengas ? getComputedStyle(rengas) : null;
    const h = hehkuEl ? getComputedStyle(hehkuEl) : null;
    return {
      yhteensa: merkit.length,
      edessa: edessa.length,
      takana: merkit.length - edessa.length,
      reuna: t?.borderTopColor ?? null,
      varjo: t?.boxShadow ?? null,
      hehkunLeveys: h ? Math.round(parseFloat(h.width)) : null,
      nimi: nimi?.textContent ?? null,
      animaatio: yksi ? getComputedStyle(yksi).animationIterationCount : null,
      osumat: yksi ? getComputedStyle(yksi).pointerEvents : null,
    };
  });
  vaadi(nimessa('hohtava vihreä piste: sädekehä, hehkuva rengas, nimi — eikä loputonta pulssia'),
    hehku.edessa > 0 && hehku.takana > 0 && /rgb\(93, 255, 168\)/.test(hehku.reuna ?? '')
      && /rgba?\(93, 255, 168/.test(hehku.varjo ?? '') && hehku.hehkunLeveys >= 40
      && Boolean(hehku.nimi) && hehku.animaatio === '1' && hehku.osumat === 'none',
    JSON.stringify(hehku));
  await kaappaa('pisteet');

  /* --- 4. Pallon takapuolen merkki ei ota napautuksia ---------------- */
  const takana = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori')?.getBoundingClientRect();
    for (const kohde of window.__satelliitti) {
      const el = [...document.querySelectorAll('.satelliitti-piste')]
        .find((e) => e.querySelector('.satelliitti-nimi')?.textContent === kohde.nimi);
      if (!el?.classList.contains('pallolauta-takana')) continue;
      const p = ui.pallonInstanssi?.getScreenCoords?.(kohde.lat, kohde.lon, 0);
      if (!p || !kotelo) continue;
      const x = Math.round(kotelo.left + p.x);
      const y = Math.round(kotelo.top + p.y);
      if (x < 4 || y < 60 || x > window.innerWidth - 4 || y > window.innerHeight - 4) continue;
      return { tunnus: kohde.tunnus, x, y, nakyvyys: getComputedStyle(el).opacity };
    }
    return null;
  });
  if (takana) await s.mouse.click(takana.x, takana.y);
  await s.waitForTimeout(800);
  const takanaTulos = await s.evaluate(() => document.querySelectorAll('.satelliitti-katselu').length);
  vaadi(nimessa('pallon takapuolen merkki ei ota napautusta'),
    Boolean(takana) && takanaTulos === 0 && Number(takana.nakyvyys) < 0.5,
    JSON.stringify({ takana, ikkunoita: takanaTulos }));

  /* --- 4b. VAIN VIHREÄ PISTE ON NAPAUTETTAVA ------------------------
   *
   * OMISTAJA 12.9.2026: *"Ja kartalta ei saa voida klikata mitään muita
   * kohteita kuin niitä vihreitä kohteita."* Mitataan napauttamalla
   * pelin omien kohteiden ruutupaikkoja: yksikään ei saa avata mitään
   * eikä liikuttaa kameraa. Ennen korjausta poltettu eläintäky avasi
   * kortin ja kaupunkipiste sukelsi kameran kaupungin ylle.
   */
  await s.evaluate(async () => {
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera({ lat: 37.98, lng: 23.73, leveys: 1200 }, { kesto: 0 });
    await new Promise((r) => setTimeout(r, 1500));
  });
  await s.waitForTimeout(2200);
  const pelinOsumat = await s.evaluate(() => {
    const { ui } = window.matkakirja;
    const kotelo = document.querySelector('.pallo-kotelo, .pallo-kuori')?.getBoundingClientRect();
    const ruudullaRaaka = (lat, lng) => {
      const p = ui.pallonInstanssi?.getScreenCoords?.(lat, lng, 0);
      if (!p || !kotelo) return null;
      return { x: Math.round(kotelo.left + p.x), y: Math.round(kotelo.top + p.y) };
    };
    const ruudulla = (lat, lng) => {
      const p = ruudullaRaaka(lat, lng);
      if (!p) return null;
      if (p.x < 40 || p.y < 90 || p.x > window.innerWidth - 40 || p.y > window.innerHeight - 120) return null;
      return p;
    };
    const ulos = [];
    // Tyhjä meri: Egeanmeren piste, jossa ei ole yhtään merkkiä.
    const meri = ruudulla(36.2, 25.6);
    if (meri) ulos.push({ laji: 'tyhjameri', ...meri });
    const kaupunki = ui.pallolauta.kaupunki('ateena');
    const kp = kaupunki ? ruudulla(kaupunki.lat, kaupunki.lon) : null;
    if (kp) ulos.push({ laji: 'kaupunkipiste', ...kp });
    for (const o of ui.pallolauta.nostot.osumat()) {
      const p = ruudulla(o.lat, o.lng);
      if (!p) continue;
      if (o.perhe === 'nosto' && !ulos.some((x) => x.laji === 'karttanosto')) {
        ulos.push({ laji: 'karttanosto', ...p });
        ulos.push({ laji: 'nostonimi', x: p.x, y: Math.max(95, p.y - 26) });
      }
      if (o.perhe === 'elain' && !ulos.some((x) => x.laji === 'elaintaky')) ulos.push({ laji: 'elaintaky', ...p });
      if (o.perhe === 'piste' && !ulos.some((x) => x.laji === 'fokuspiste')) ulos.push({ laji: 'fokuspiste', ...p });
    }
    return ulos;
  });
  /*
   * PELIN PINNAT, EI LINSSIN OMAA IKKUNAA. Aineiston vaihduttua
   * (26 kohdetta) mittapiste voi osua vihreän pisteen päälle, jolloin
   * kuva avautuu — se on nimenomaan OIKEA vastaus eikä rike. Väite
   * pysyy silti tiukkana: yksikään PELIN oma pinta ei saa avautua eikä
   * kamera liikkua. Linssin oma ikkuna suljetaan mittausten välissä.
   */
  const pelinPinnat = () => s.evaluate(() => {
    const val = '.fokuskohde-popup, .elaintaky-kerros, .skandaali-kerros, .hetki-kerros,'
      + ' .fokusnosto-kerros, .syvennys-kerros, .minipopup,'
      + ' .arrival, .arrival-card, .saapumistraileri, .fokusvirta-isokuva, dialog[open]';
    return [...document.querySelectorAll(val)].map((e) => e.className || e.tagName);
  });
  let avautui = 0;
  const avautuneet = [];
  for (const kohta of pelinOsumat) {
    // eslint-disable-next-line no-await-in-loop
    const ennenPinnat = await pelinPinnat();
    // eslint-disable-next-line no-await-in-loop
    const ennenKamera = await s.evaluate(KAMERA);
    // eslint-disable-next-line no-await-in-loop
    await s.mouse.click(kohta.x, kohta.y);
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(900);
    // eslint-disable-next-line no-await-in-loop
    const jalkeenPinnat = await pelinPinnat();
    // eslint-disable-next-line no-await-in-loop
    const jalkeenKamera = await s.evaluate(KAMERA);
    if (jalkeenPinnat.length > ennenPinnat.length || jalkeenKamera !== ennenKamera) {
      avautui += 1;
      avautuneet.push(`${kohta.laji}: ${jalkeenPinnat.join(',') || 'kamera liikkui'}`);
    }
    // eslint-disable-next-line no-await-in-loop
    await s.evaluate(() => document.querySelector('.satelliitti-sulku')?.click());
    // eslint-disable-next-line no-await-in-loop
    await s.waitForTimeout(400);
  }
  vaadi(nimessa('linssin aikana pelin omat kohteet eivätkä tyhjä meri avaa mitään eivätkä liikuta kameraa'),
    avautui === 0 && pelinOsumat.length >= 3 && pelinOsumat.some((o) => o.laji === 'tyhjameri'),
    JSON.stringify({ mitattuja: pelinOsumat.map((o) => o.laji), avautuneet }));

  /* --- 5. Vihreän pisteen napautus avaa kuvan KOKO RUUTUUN heti ----- */
  const vakaaPaikka = async (tunnus) => {
    let edellinen = null;
    for (let i = 0; i < 20; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const p = await s.evaluate(RUUTUPAIKKA, tunnus);
      if (p && edellinen && Math.abs(p.x - edellinen.x) < 2 && Math.abs(p.y - edellinen.y) < 2) return p;
      edellinen = p;
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(400);
    }
    return edellinen;
  };
  const napautaPistetta = async (tunnus) => {
    let paikka = await vakaaPaikka(tunnus);
    // Konttiympäristön ohjelmisto-WebGL piirtää puhelinmitalla (dpr 2)
    // noin kehyksen sekunnissa, joten merkin ruutupaikka voi olla yhä
    // matkalla: yritetään riittävän monta kertaa.
    for (let yritys = 0; yritys < 6; yritys += 1) {
      // eslint-disable-next-line no-await-in-loop
      if (paikka) await s.mouse.click(paikka.x, paikka.y);
      // eslint-disable-next-line no-await-in-loop
      await s.waitForFunction(
        () => document.querySelector('.satelliitti-katselu .satelliitti-kuva')?.naturalWidth > 0,
        null, { timeout: 20000 },
      ).catch(() => {});
      // eslint-disable-next-line no-await-in-loop
      if (await s.evaluate(() => Boolean(document.querySelector('.satelliitti-katselu')))) return paikka;
      // eslint-disable-next-line no-await-in-loop
      const tila = await s.evaluate((t) => {
        const kohde = window.__satelliitti.find((k) => k.tunnus === t);
        const el = [...document.querySelectorAll('.satelliitti-piste')]
          .find((e) => e.querySelector('.satelliitti-nimi')?.textContent === kohde.nimi);
        const r = el?.getBoundingClientRect();
        const keski = r ? document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) : null;
        return {
          merkkeja: document.querySelectorAll('.satelliitti-piste').length,
          takana: el?.classList.contains('pallolauta-takana') ?? null,
          rect: r ? [Math.round(r.left), Math.round(r.top)] : null,
          busy: window.matkakirja.ui.busy,
          sormet: JSON.stringify({ ...(window.matkakirja.ui.pallonSormet ?? {}), idt: [...(window.matkakirja.ui.pallonSormet?.idt ?? [])] }),
          paalla: keski ? `${keski.tagName}.${keski.className}` : null,
        };
      }, tunnus);
      console.log(`    (${tunnus}: yritys ${yritys + 1} ei avannut — ${JSON.stringify({ paikka, ...tila })})`);
      // eslint-disable-next-line no-await-in-loop
      await s.waitForTimeout(800);
      // eslint-disable-next-line no-await-in-loop
      paikka = await vakaaPaikka(tunnus);
    }
    return paikka;
  };
  await s.evaluate(async () => {
    const richat = window.__satelliitti.find((k) => k.tunnus === 'richat');
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera(
      { lat: richat.lat, lng: richat.lon, leveys: 2600 }, { kesto: 0 },
    );
    await new Promise((r) => setTimeout(r, 1200));
  });
  await s.waitForTimeout(1500);
  const richatPaikka = await napautaPistetta('richat');
  const kokoruutu = await s.evaluate(() => {
    const katselu = document.querySelector('.satelliitti-katselu');
    const img = katselu?.querySelector('.satelliitti-kuva');
    const r = img?.getBoundingClientRect();
    const kr = katselu?.getBoundingClientRect();
    // Kuvan päällä ei saa olla muuta tekstiä kuin lähdeleima ja
    // pikkukuvien päiväykset: info-popup ei ole auki ennen nappia.
    const tekstit = [...(katselu?.querySelectorAll('*') ?? [])]
      .filter((el) => !el.closest('.satelliitti-ala') && el.children.length === 0 && el.textContent.trim())
      .map((el) => el.textContent.trim());
    return {
      auki: Boolean(katselu),
      ladattu: img?.naturalWidth ?? 0,
      osoite: img?.currentSrc ?? null,
      kuvaLeveys: r ? Math.round(r.width) : null,
      kuvaKorkeus: r ? Math.round(r.height) : null,
      ruutu: [Math.round(kr?.width ?? 0), Math.round(kr?.height ?? 0)],
      ikkuna: [window.innerWidth, window.innerHeight],
      leima: katselu?.querySelector('.satelliitti-leima')?.textContent ?? null,
      tekstit,
      popupeja: document.querySelectorAll('.satelliitti-popup').length,
      palkinKohde: document.querySelector('.satelliittipalkki-kohde')?.textContent ?? null,
      palkinKorkeus: document.querySelector('.satelliittipalkki')?.getBoundingClientRect().height ?? null,
    };
  });
  const lyhyempi = Math.min(kokoruutu.ikkuna[0], kokoruutu.ikkuna[1]);
  // Ikkuna alkaa linssin yläpalkin alta (kohteen nimi on palkissa), ja
  // kuva täyttää kaiken sen alapuolelta.
  const tayttoaste = Math.max(kokoruutu.kuvaLeveys / kokoruutu.ruutu[0],
    kokoruutu.kuvaKorkeus / kokoruutu.ruutu[1]);
  vaadi(nimessa('kuva avautuu heti koko ruudun peittäväksi, oma kuvasuhde säilyy'),
    kokoruutu.auki && kokoruutu.ladattu > 0 && tayttoaste > 0.98
      && kokoruutu.kuvaKorkeus <= kokoruutu.ruutu[1] + 1
      && kokoruutu.ruutu[0] === kokoruutu.ikkuna[0]
      && kokoruutu.ruutu[1] >= kokoruutu.ikkuna[1] - (kokoruutu.palkinKorkeus ?? 0) - 1
      && /images-assets\.nasa\.gov/.test(kokoruutu.osoite ?? ''),
    JSON.stringify({ ...kokoruutu, tekstit: kokoruutu.tekstit.slice(0, 6), tayttoaste: Number(tayttoaste.toFixed(2)), lyhyempi }));
  vaadi(nimessa('kuvan päällä ei ole tekstiä ennen info-nappia — vain lähdeleima'),
    kokoruutu.leima === 'Valokuva avaruudesta · NASA'
      && kokoruutu.popupeja === 0
      && kokoruutu.tekstit.every((t) => t === 'Valokuva avaruudesta · NASA'),
    JSON.stringify(kokoruutu.tekstit));
  vaadi(nimessa('kohteen nimi on VAIN yläpalkissa eikä palkin korkeus muutu'),
    kokoruutu.palkinKohde === 'Saharan silmä'
      && Math.abs((kokoruutu.palkinKorkeus ?? 0) - (palkki.omaKorkeus ?? 0)) < 0.5,
    JSON.stringify({ kohde: kokoruutu.palkinKohde, korkeus: kokoruutu.palkinKorkeus, ennen: palkki.omaKorkeus }));
  await kaappaa('havainto');

  /* --- 6. Napit: sulkuristi alaoikealla, mikään ei mene päällekkäin - */
  const napit = await s.evaluate(() => {
    const r = (v) => {
      const el = document.querySelector(v);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return {
        x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height),
        oikea: Math.round(b.right), ala: Math.round(b.bottom),
      };
    };
    const nauha = r('.satelliitti-nauha');
    const sulku = r('.satelliitti-sulku');
    const paallekkain = (a, b) => Boolean(a && b)
      && a.x < b.oikea && b.x < a.oikea && a.y < b.ala && b.y < a.ala;
    const pikkuja = [...document.querySelectorAll('.satelliitti-pikku')].map((el) => {
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.left), y: Math.round(b.top), w: Math.round(b.width), h: Math.round(b.height), oikea: Math.round(b.right), ala: Math.round(b.bottom) };
    });
    return {
      nauha,
      sulku,
      info: r('.satelliitti-info'),
      vertaa: r('.satelliitti-vertaa'),
      ikkuna: [window.innerWidth, window.innerHeight],
      sulkuNauhanAlla: paallekkain(sulku, nauha),
      sulkuPikkujenAlla: pikkuja.some((p) => paallekkain(sulku, p)),
      sulkuInfonAlla: paallekkain(sulku, r('.satelliitti-info')),
      // Sulkuristin ja lähimmän muun napin väli.
      valiInfoon: sulku && r('.satelliitti-vertaa') ? sulku.x - r('.satelliitti-vertaa').oikea : null,
      valiNuoleen: sulku && r('.satelliitti-seuraava') ? sulku.x - r('.satelliitti-seuraava').oikea : null,
    };
  });
  vaadi(nimessa('sulkuristi on alaoikealla, ≥ 44 px, irti reunasta eikä minkään alla'),
    napit.sulku && napit.sulku.w >= 44 && napit.sulku.h >= 44
      && napit.ikkuna[0] - napit.sulku.oikea >= 6 && napit.ikkuna[0] - napit.sulku.oikea <= 30
      && napit.ikkuna[1] - napit.sulku.ala <= 30
      && napit.sulku.x > napit.ikkuna[0] / 2
      && !napit.sulkuNauhanAlla && !napit.sulkuPikkujenAlla && !napit.sulkuInfonAlla
      && (napit.valiNuoleen ?? napit.valiInfoon) >= 8,
    JSON.stringify(napit));
  vaadi(nimessa('pikkukuvat ovat kuvan päällä alareunassa'),
    napit.nauha && napit.nauha.ala <= napit.ikkuna[1]
      && napit.nauha.y > napit.ikkuna[1] * 0.6,
    JSON.stringify(napit.nauha));

  /* --- 7. Sormizoom: ele ei vuoda pallolle, katto pitää, nollautuu -- */
  const kameraEnnen = await s.evaluate(KAMERA);
  const keskiX = Math.round(NAKYMAT[nakymanNimi].viewport.width / 2);
  const keskiY = Math.round(NAKYMAT[nakymanNimi].viewport.height / 2);
  // Nipistys ohjelmallisesti: kaksi osoitinta lavan päällä.
  const zoomTulos = await s.evaluate(async ([kx, ky]) => {
    const lava = document.querySelector('.satelliitti-lava');
    const img = document.querySelector('.satelliitti-kuva');
    const ele = (tyyppi, id, x, y) => lava.dispatchEvent(new PointerEvent(tyyppi, {
      pointerId: id, clientX: x, clientY: y, bubbles: true, cancelable: true, pointerType: 'touch',
    }));
    ele('pointerdown', 1, kx - 40, ky);
    ele('pointerdown', 2, kx + 40, ky);
    for (let i = 1; i <= 6; i += 1) {
      ele('pointermove', 1, kx - 40 - i * 20, ky);
      ele('pointermove', 2, kx + 40 + i * 20, ky);
      await new Promise((r) => setTimeout(r, 16));
    }
    const skaala = (getComputedStyle(img).transform.match(/matrix\(([\d.]+)/) ?? [])[1];
    ele('pointerup', 1, kx - 200, ky);
    ele('pointerup', 2, kx + 200, ky);
    return {
      skaala: Number(skaala ?? 1),
      katto: img.naturalWidth / img.offsetWidth,
      zoomLuokka: document.querySelector('.satelliitti-katselu').classList.contains('satelliitti-zoomattu'),
    };
  }, [keskiX, keskiY]);
  const kameraJalkeen = await s.evaluate(KAMERA);
  /*
   * ZOOMIN YLÄRAJA ON KUVAN OMA TARKKUUS, joten leveällä ruudulla
   * suurennus jää pieneksi (NASAn kuva on 1920 px leveä). Vaaditaan
   * siis että nipistys vie kattoon asti — ei kiinteää kerrointa.
   */
  vaadi(nimessa('nipistys zoomaa kuvaa EIKÄ pallon kamera liiku'),
    zoomTulos.skaala > 1.02 && zoomTulos.skaala >= Math.min(1.6, zoomTulos.katto) - 0.02
      && kameraJalkeen === kameraEnnen && zoomTulos.zoomLuokka,
    JSON.stringify({ ...zoomTulos, kameraSama: kameraJalkeen === kameraEnnen }));
  vaadi(nimessa('zoomin katto on kuvan oma tarkkuus — ei pikselipuuroa'),
    zoomTulos.skaala <= Math.max(1, zoomTulos.katto) + 0.01,
    JSON.stringify(zoomTulos));
  /*
   * PANOROINTI ZOOMATUSSA KUVASSA. Vara lasketaan ensin: zoomin katto on
   * kuvan oma tarkkuus, joten leveällä työpöydällä suurennettu kuva voi
   * mahtua yhä ruudulle — silloin ei OLE mitään panoroitavaa, ja oikea
   * vastaus on että kuva pysyy paikallaan (ei karkaa reunan yli).
   */
  const panorointi = await s.evaluate(async ([kx, ky]) => {
    const lava = document.querySelector('.satelliitti-lava');
    const img = document.querySelector('.satelliitti-kuva');
    const skaala = Number((getComputedStyle(img).transform.match(/matrix\(([\d.]+)/) ?? [])[1] ?? 1);
    const varaX = Math.max(0, (img.offsetWidth * skaala - lava.clientWidth) / 2);
    const varaY = Math.max(0, (img.offsetHeight * skaala - lava.clientHeight) / 2);
    const pysty = varaY > varaX;
    const ennen = pysty ? img.getBoundingClientRect().top : img.getBoundingClientRect().left;
    const ele = (tyyppi, x, y) => lava.dispatchEvent(new PointerEvent(tyyppi, {
      pointerId: 7, clientX: x, clientY: y, bubbles: true, cancelable: true, pointerType: 'touch',
    }));
    ele('pointerdown', kx, ky);
    for (let i = 1; i <= 5; i += 1) {
      ele('pointermove', pysty ? kx : kx - i * 12, pysty ? ky - i * 12 : ky);
      await new Promise((r) => setTimeout(r, 16));
    }
    ele('pointerup', pysty ? kx : kx - 60, pysty ? ky - 60 : ky);
    const jalkeen = pysty ? img.getBoundingClientRect().top : img.getBoundingClientRect().left;
    return {
      siirtyi: Math.round(ennen - jalkeen), vara: Math.round(pysty ? varaY : varaX), suunta: pysty ? 'pysty' : 'vaaka',
    };
  }, [keskiX, keskiY]);
  vaadi(nimessa('zoomattua kuvaa panoroidaan yhdellä sormella varan verran — ei yli reunan'),
    panorointi.vara > 4 ? panorointi.siirtyi > 4 : panorointi.siirtyi === 0,
    JSON.stringify(panorointi));
  await kaappaa('zoomattu');

  /* --- 8. Info-popup: kaikki tietorivit ja lisenssi ------------------ */
  await s.evaluate(() => document.querySelector('.satelliitti-info').click());
  await s.waitForTimeout(400);
  const info = await s.evaluate(() => {
    const popup = document.querySelector('.satelliitti-popup');
    const b = popup?.getBoundingClientRect();
    return {
      auki: Boolean(popup),
      leveys: b ? Math.round(b.width) : null,
      korkeus: b ? Math.round(b.height) : null,
      ikkuna: [window.innerWidth, window.innerHeight],
      tekstit: [...(popup?.querySelectorAll('div') ?? [])].map((d) => d.textContent),
      linkkeja: [...(popup?.querySelectorAll('.satelliitti-linkki') ?? [])].map((a) => a.href),
      sulku: Boolean(popup?.querySelector('.satelliitti-popup-sulku')),
    };
  });
  const infoTeksti = (info.tekstit ?? []).join(' | ');
  vaadi(nimessa('info-nappi avaa pienen popupin, jossa koko lähdeketju'),
    info.auki && info.leveys < info.ikkuna[0] && info.korkeus < info.ikkuna[1] * 0.7
      && /Aineisto:.*NASA/.test(infoTeksti) && /Kuvausaika: \d+\.\d+\.\d{4}/.test(infoTeksti)
      && /Paikka:.*°/.test(infoTeksti) && /Kuvaustapa:.*avaruusasemalta/.test(infoTeksti)
      && /Kuvatunnus: iss/.test(infoTeksti)
      && /Lisenssi: Public domain \(NASA\)/.test(infoTeksti)
      // Kuvateksti on popupin ensimmäinen rivi: se on ainoa teksti,
      // jonka pelaaja lukee, eikä se saa jäädä lähdetietojen alle.
      && /Saharan silmä/.test(info.tekstit?.[0] ?? '')
      && (info.tekstit?.[1] ?? '').length > 80
      && info.linkkeja.some((u) => /images\.nasa\.gov\/details\//.test(u))
      && info.linkkeja.some((u) => /^https:\/\/images\.nasa\.gov\/$/.test(u)) && info.sulku,
    JSON.stringify({ ...info, tekstit: info.tekstit?.slice(0, 3) }));
  await kaappaa('info-popup');
  await s.evaluate(() => document.querySelector('.satelliitti-popup-sulku').click());
  await s.waitForTimeout(300);
  const popupKiinni = await s.evaluate(() => document.querySelectorAll('.satelliitti-popup').length);
  vaadi(nimessa('info-popup sulkeutuu omasta rististään'), popupKiinni === 0, String(popupKiinni));

  /* --- 9. Galleria kuvan päällä: Etnan kaksi purkausvuotta ---------- */
  await s.evaluate(() => document.querySelector('.satelliitti-sulku').click());
  await s.waitForTimeout(500);
  await s.evaluate(async () => {
    const etna = window.__satelliitti.find((k) => k.tunnus === 'etna');
    await window.matkakirja.ui.pallolauta.kamera.ajaKamera(
      { lat: etna.lat, lng: etna.lon, leveys: 2600 }, { kesto: 0 },
    );
    await new Promise((r) => setTimeout(r, 1400));
  });
  await s.waitForTimeout(3000);
  await napautaPistetta('etna');
  const galleria = await s.evaluate(async () => {
    const katselu = document.querySelector('.satelliitti-katselu');
    if (!katselu) return { puuttuu: true };
    const img = katselu.querySelector('.satelliitti-kuva');
    // Zoomataan ensin, jotta nähdään nollautuuko zoom otoksen vaihdossa.
    katselu.querySelector('.satelliitti-lava').dispatchEvent(new WheelEvent('wheel', {
      deltaY: -200, clientX: window.innerWidth / 2, clientY: window.innerHeight / 2,
      bubbles: true, cancelable: true,
    }));
    await new Promise((r) => setTimeout(r, 120));
    const zoomEnnen = getComputedStyle(img).transform;
    const ennenSrc = img.src;
    const laskuri = katselu.querySelector('.satelliitti-laskuri')?.textContent;
    const pikkuja = katselu.querySelectorAll('.satelliitti-pikku').length;
    const paivat = [...katselu.querySelectorAll('.satelliitti-pikku span')].map((x) => x.textContent);
    const valittu = katselu.querySelector('.satelliitti-pikku.valittu span')?.textContent;
    katselu.querySelector('.satelliitti-seuraava')?.click();
    await new Promise((r) => setTimeout(r, 300));
    return {
      laskuri,
      pikkuja,
      paivat,
      valittu,
      laskuriJalkeen: katselu.querySelector('.satelliitti-laskuri')?.textContent,
      srcVaihtui: katselu.querySelector('.satelliitti-kuva').src !== ennenSrc,
      zoomEnnen,
      zoomJalkeen: getComputedStyle(katselu.querySelector('.satelliitti-kuva')).transform,
      vertaa: Boolean(katselu.querySelector('.satelliitti-vertaa')),
      palkinKohde: document.querySelector('.satelliittipalkki-kohde')?.textContent ?? '',
    };
  });
  vaadi(nimessa('galleria kuvan päällä: 2 päivämäärällistä pikkukuvaa, laskuri ja nuolet'),
    galleria.pikkuja === 2 && galleria.laskuri === '1 / 2' && galleria.valittu === '30.10.02'
      && galleria.laskuriJalkeen === '2 / 2' && galleria.srcVaihtui && galleria.vertaa
      && galleria.palkinKohde === 'Etna',
    JSON.stringify(galleria));
  vaadi(nimessa('zoom nollautuu otosta vaihdettaessa'),
    galleria.zoomEnnen !== 'none' && (galleria.zoomJalkeen === 'none' || /matrix\(1, 0, 0, 1, 0, 0\)/.test(galleria.zoomJalkeen)),
    JSON.stringify({ ennen: galleria.zoomEnnen, jalkeen: galleria.zoomJalkeen }));
  vaadi(nimessa('saman pisteen kuvat erottuvat toisistaan päiväyksestä'),
    (galleria.paivat ?? []).length === 2
      && new Set(galleria.paivat).size === (galleria.paivat ?? []).length,
    JSON.stringify(galleria.paivat));
  await kaappaa('galleria');

  /* --- 9b. Vertailu: kaksi havaintoa RINNAKKAIN, ei liukuria -------- */
  await s.evaluate(() => document.querySelector('.satelliitti-vertaa')?.click());
  await s.waitForFunction(
    () => [...document.querySelectorAll('.satelliitti-vertailu img')]
      .every((i) => i.naturalWidth > 0) && document.querySelectorAll('.satelliitti-vertailu img').length === 2,
    null, { timeout: 20000 },
  ).catch(() => {});
  const vertailu = await s.evaluate(() => {
    const kerros = document.querySelector('.satelliitti-vertailu');
    const kuvat = [...(kerros?.querySelectorAll('img') ?? [])];
    return {
      auki: Boolean(kerros),
      kuvia: kuvat.length,
      eriLahteet: new Set(kuvat.map((i) => i.src)).size,
      tekstit: [...(kerros?.querySelectorAll('figcaption') ?? [])].map((f) => f.textContent),
    };
  });
  vaadi(nimessa('Vertaa näyttää kaksi eri havaintoa rinnakkain omine päiväyksineen'),
    vertailu.auki && vertailu.kuvia === 2 && vertailu.eriLahteet === 2
      && vertailu.tekstit.length === 2 && new Set(vertailu.tekstit).size === 2
      // Päiväys on kummankin kuvan alla. Kellonaikaa ei vaadita: NASA
      // merkitsee astronauttikuvalle useimmiten pelkän päivän, eikä
      // linssi keksi sille kelloa.
      && vertailu.tekstit.every((t) => /^\d+\.\d+\.\d{4}$/.test(t.trim())),
    JSON.stringify(vertailu));
  await kaappaa('vertailu');
  await s.evaluate(() => {
    const kerros = document.querySelector('.satelliitti-vertailu');
    [...(kerros?.querySelectorAll('button') ?? [])].at(-1)?.click();
  });
  await s.waitForTimeout(400);

  /* --- 10. Sulkuristi sulkee ikkunan, EI linssiä -------------------- */
  await s.evaluate(() => document.querySelector('.satelliitti-sulku')?.click());
  await s.waitForTimeout(600);
  const suljettuIkkuna = await s.evaluate(() => ({
    ikkunoita: document.querySelectorAll('.satelliitti-katselu').length,
    linssi: window.matkakirja.ui.pallolinssi?.tunnus ?? null,
    palkkeja: document.querySelectorAll('.satelliittipalkki').length,
    kohdenimi: document.querySelector('.satelliittipalkki-kohde')?.textContent ?? null,
    merkkeja: document.querySelectorAll('.satelliitti-piste').length,
  }));
  vaadi(nimessa('sulkuristi sulkee havaintoikkunan mutta EI linssiä'),
    suljettuIkkuna.ikkunoita === 0 && suljettuIkkuna.linssi === 'satelliitti'
      && suljettuIkkuna.palkkeja === 1 && suljettuIkkuna.kohdenimi === ''
      && suljettuIkkuna.merkkeja > 0,
    JSON.stringify(suljettuIkkuna));

  /* --- 11. Merkit eivät kuluta pelivuoroa --------------------------- */
  const kesken = await s.evaluate(PELITILA);
  vaadi(nimessa('linssin merkit eivät kuluta pelivuoroa eivätkä käynnistä matkustusta'),
    kesken === ennen, `${ennen}\n    vs ${kesken}`);

  /* --- 12. Linssin sulkeminen palauttaa kaiken ---------------------- */
  await s.evaluate(() => document.querySelector('.satelliittipalkki-sulje').click());
  /*
   * MERKIT HÄIVYTETÄÄN ULOS ja elementit irtoavat vasta seuraavassa
   * piirrossa. Kontin ohjelmisto-WebGL piirtää noin kehyksen
   * sekunnissa, joten odotetaan tulosta eikä kelloa.
   */
  await s.waitForFunction(() => document.querySelectorAll('.satelliitti-piste').length === 0,
    null, { timeout: 30000 }).catch(() => {});
  await s.waitForTimeout(1000);
  const jalkeen = await s.evaluate(() => {
    const topbar = document.querySelector('.topbar');
    return {
      pallolinssi: window.matkakirja.ui.pallolinssi?.tunnus ?? null,
      palkkeja: document.querySelectorAll('.satelliittipalkki').length,
      merkkeja: document.querySelectorAll('.satelliitti-piste').length,
      ikkunoita: document.querySelectorAll('.satelliitti-katselu').length,
      bodyLuokat: ['aikajana-palkki-auki', 'aikajana-paalla'].filter((l) => document.body.classList.contains(l)),
      topbarNakyvyys: topbar ? getComputedStyle(topbar).visibility : null,
      topbarKorkeus: topbar?.getBoundingClientRect().height ?? null,
      lautaNakyy: window.matkakirja.ui.pallolauta?.paalla?.() === true,
      tila: (() => {
        const { game } = window.matkakirja;
        return JSON.stringify({
          vaihe: game.phase,
          paikka: game.player.pos,
          rahat: game.player.money,
          paiva: game.world?.day ?? null,
          aarteet: (game.player.treasures ?? []).length,
          tallennus: (localStorage.getItem('matkakirja-save') ?? '').length,
        });
      })(),
    };
  });
  vaadi(nimessa('Sulje linssi palauttaa yläpalkin, pelitilan ja tallennuksen täsmälleen'),
    jalkeen.pallolinssi === null && jalkeen.palkkeja === 0 && jalkeen.merkkeja === 0
      && jalkeen.ikkunoita === 0 && jalkeen.bodyLuokat.length === 0
      && jalkeen.topbarNakyvyys === 'visible' && jalkeen.topbarKorkeus > 20
      && jalkeen.lautaNakyy && jalkeen.tila === ennen,
    JSON.stringify(jalkeen));
  await kaappaa('suljettu');

  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' / '));
  await konteksti.close();
}

for (const nakyma of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : ['tyopoyta', 'ipad', 'puhelin'])) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nakyma);
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
