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
 *      kuvasuhde säilyy, ja kuvan päällä on VAIN selite (kohteen nimi,
 *      seutu ja kuvateksti) ruudun vasemmassa yläkulmassa — uusittu
 *      16.9.2026, korvaa 15.9. tehdyn yläpalkin pillerin.
 *   6. UUSI ASETTELU (omistaja 16.9.2026): selite ruudun VASEMMASSA
 *      YLÄKULMASSA, harmaa pyöreä ✕ ruudun OIKEASSA YLÄKULMASSA heti
 *      palkin alla ja pikkukuvat ruudun VASEMMASSA ALAKULMASSA —
 *      kaikki kiinnitettynä ruutuun, ei kuvaelementtiin. i-nappia ja
 *      nimi/päivä-pilleriä ei ole enää olemassa.
 *   7. Sormizoom: nipistys zoomaa kuvaa, pallon kamera EI liiku,
 *      katto on kuvan oma tarkkuus, panorointi toimii.
 *   8. Selitteen väkänen avaa lisätiedot (aineisto, aika, alue,
 *      kuvaustapa, lisenssi, lähdelinkit) selitteen alle samaan
 *      laatikkoon, ja selitetekstin napautus kelaa tekstin ylös niin
 *      että vain otsikkorivi jää.
 *   9. Galleria: hyvin pienet pikkukuvat vaihtavat otosta (EI laskuria,
 *      nuolia eikä Vertaa-nappia); zoom nollautuu otosta vaihdettaessa.
 *  10. ✕ sulkee havaintoikkunan mutta EI linssiä.
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

/*
 * KOLME PYSTYÄ JA KOLME VAAKAA (omistaja 12.9.2026: *"Korjaa vaaka
 * näkymä"*). Vaakanäkymä oli rikki juuri siksi, ettei sitä mitattu:
 * kortti oli rakennettu pystyruudulle, ja matalassa ruudussa yläpalkki
 * ja kuva menivät päällekkäin, kaksirivinen alapalkki söi kuvan
 * alakolmanneksen ja napit hajosivat neljään nurkkaan.
 */
const NAKYMAT = {
  // 1400 × 900 (omistaja 15.9.2026, Astronautin kamera -mittausvaatimus):
  // sama koko kuin muut työpöytämittaukset, jotta X-nappi, NASA-rivi ja
  // Liiku-napin piilotus mitataan täsmälleen tilatussa ikkunassa.
  tyopoyta: { viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 },
  ipad: { viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2, hasTouch: true },
  puhelin: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true },
  puhelinvaaka: { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, hasTouch: true },
  ipadvaaka: { viewport: { width: 1194, height: 834 }, deviceScaleFactor: 2, hasTouch: true },
  pienivaaka: { viewport: { width: 740, height: 360 }, deviceScaleFactor: 2, hasTouch: true },
};

/** Onko ruutu vaakatasossa (leveämpi kuin korkeampi)? */
const vaaka = (nimi) => NAKYMAT[nimi].viewport.width > NAKYMAT[nimi].viewport.height;

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

  /*
   * --- 0. OMA KUVAKE MATKALAUKUN LINSSIVALIKOSSA (omistaja 15.9.2026:
   * *"tee astronauttilinssille oma kuvake matkalaukkuun ... samankokoisena
   * kuin muut"*). Mitataan vain työpöydällä — sama kuvake piirtyy
   * kaikilla ruuduilla, eikä ruutukoko vaikuta 64 px:n varasoluun.
   */
  if (nakymanNimi === 'tyopoyta') {
    const kuvake = await s.evaluate(async () => {
      const { ui } = window.matkakirja;
      // Molemmat linssit omistukseen: laukun valikko näyttää vain
      // omistetut linssit (nakyvatLinssit).
      for (const t of ['satelliitti', 'ihmisen-matka']) {
        if (!ui.game.player.linssit.includes(t)) ui.game.player.linssit.push(t);
      }
      ui.openPassport();
      await ui.paivitaLinssit();
      // Kuva (ihmisen-matka) ja SVG (satelliitti) latautuvat eri
      // reittejä — odotetaan molemmat ehtineen piirtyä.
      for (let i = 0; i < 40; i += 1) {
        const sat = document.querySelector('.linssi-liuskat button[data-linssi="satelliitti"] svg');
        const muu = document.querySelector('.linssi-liuskat button[data-linssi="ihmisen-matka"] img');
        if (sat && muu && (muu.complete || muu.naturalWidth > 0)) break;
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 50));
      }
      const mitat = (b) => {
        const kuva = b?.querySelector('svg, img');
        const r = kuva?.getBoundingClientRect();
        return r ? { w: Math.round(r.width), h: Math.round(r.height) } : null;
      };
      const satNappi = document.querySelector('.linssi-liuskat button[data-linssi="satelliitti"]');
      const muuNappi = document.querySelector('.linssi-liuskat button[data-linssi="ihmisen-matka"]');
      return {
        satOnOmaSvg: Boolean(satNappi?.querySelector('svg.token-icon .icon-linssi-satelliitti')),
        satOnKuva: Boolean(satNappi?.querySelector('img')),
        sat: mitat(satNappi),
        muu: mitat(muuNappi),
      };
    });
    vaadi(nimessa('linssivalikon kuvake on oma inline-SVG, ei ulkoinen kuva'),
      kuvake.satOnOmaSvg && !kuvake.satOnKuva, JSON.stringify(kuvake));
    vaadi(nimessa('kuvake piirtyy samankokoisena kuin muiden linssien kuvake (± 1 px)'),
      Boolean(kuvake.sat && kuvake.muu)
        && Math.abs(kuvake.sat.w - kuvake.muu.w) <= 1 && Math.abs(kuvake.sat.h - kuvake.muu.h) <= 1,
      JSON.stringify(kuvake));
    await s.waitForTimeout(200);
    await kaappaa('kuvake-laukku');
    await s.evaluate(() => window.matkakirja.ui.suljeLaukku());
    await s.waitForTimeout(300);
  }

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
      // Hampurilainen X:n tilalla (omistaja 16.9.2026).
      hampurilaisia: document.querySelectorAll('.satelliittipalkki-hampurilainen').length,
      viivoja: document.querySelectorAll('.satelliittipalkki-hampurilainen .satelliittipalkki-viiva').length,
      hampurilainenAria: document.querySelector('.satelliittipalkki-hampurilainen')?.getAttribute('aria-label') ?? null,
      vanhaX: document.querySelectorAll('.satelliittipalkki-sulje').length,
      // OMISTAJA 12.9.2026: "Ota yläpalkin vetolaatikko pois".
      valintoja: document.querySelectorAll('.satelliittipalkki select, .satelliittipalkki-valinta').length,
      // i-nappi ja nimi/päivä-pilleri poistuivat 16.9.2026.
      pillereita: document.querySelectorAll('.satelliittipalkki-kohde').length,
      infoja: document.querySelectorAll('.satelliittipalkki-info').length,
      ikoneja: document.querySelectorAll('.satelliittipalkki-ikoni').length,
      nimenRivit: [...document.querySelectorAll('.satelliittipalkki-nimi .satelliittipalkki-rivi')]
        .map((e) => e.textContent),
      ohjeNakyy: oma && omaTyyli
        ? getComputedStyle(document.querySelector('.satelliittipalkki-ohje')).display !== 'none' : null,
      ohjeTeksti: document.querySelector('.satelliittipalkki-ohje')?.textContent ?? null,
      // Liiku-nappi (js/ui.js .monitoimi-nappi) piilossa linssin ajan
      // (omistaja 15.9.2026: "Vasemman alareunan liikunnappi pitaa ottaa
      // pois"). getComputedStyle, koska CSS piilottaa display:nonella.
      liikuNakyy: (() => {
        const n = document.querySelector('.toimintorivi .monitoimi-nappi');
        return n ? getComputedStyle(n).display !== 'none' : null;
      })(),
    };
  });
  vaadi(nimessa('yläpalkissa EI ole vetolaatikkoa, pilleriä eikä i-nappia'),
    palkki.valintoja === 0 && palkki.pillereita === 0 && palkki.infoja === 0,
    JSON.stringify(palkki));
  vaadi(nimessa('yläpalkin X on hampurilainen (kolme viivaa), vanhaa X:ää ei ole'),
    palkki.hampurilaisia === 1 && palkki.viivoja === 3 && palkki.vanhaX === 0
      && palkki.hampurilainenAria === 'Linssin valikko', JSON.stringify(palkki));
  vaadi(nimessa('tunnus: linssin ikoni ja ASTRONAUTIN / KAMERA kahdella rivillä'),
    palkki.ikoneja === 1 && JSON.stringify(palkki.nimenRivit) === JSON.stringify(['ASTRONAUTIN', 'KAMERA']),
    JSON.stringify(palkki));
  vaadi(nimessa('ohjeteksti on lyhyt totuudenmukainen NASA-rivi, ei enää "Napauta hohtavaa..."'),
    !/Napauta hohtavaa/.test(palkki.ohjeTeksti ?? '')
      && /NASA/.test(palkki.ohjeTeksti ?? '') && (palkki.ohjeTeksti ?? '').length <= 50,
    JSON.stringify(palkki));
  vaadi(nimessa('Liiku-nappi on piilossa linssin ollessa auki'),
    palkki.liikuNakyy === false, JSON.stringify(palkki));
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
    /*
     * KUVAN PÄÄLLÄ ON VAIN SELITE (omistaja 16.9.2026). Kulmanappi ja
     * selite suljetaan pois — mitään MUUTA tekstiä ei saa jäädä.
     */
    const tekstit = [...(katselu?.querySelectorAll('*') ?? [])]
      .filter((el) => !el.closest('.satelliitti-kulma') && !el.closest('.satelliitti-selite')
        && el.children.length === 0 && el.textContent.trim())
      .map((el) => el.textContent.trim());
    return {
      auki: Boolean(katselu),
      ladattu: img?.naturalWidth ?? 0,
      osoite: img?.currentSrc ?? null,
      kuvaLeveys: r ? Math.round(r.width) : null,
      kuvaKorkeus: r ? Math.round(r.height) : null,
      ruutu: [Math.round(kr?.width ?? 0), Math.round(kr?.height ?? 0)],
      ikkuna: [window.innerWidth, window.innerHeight],
      /*
       * VAAKANÄKYMÄN MITAT (12.9.2026, uusittu 15.9.2026 kun
       * pystysarake poistui): kuvan pitää mahtua kokonaan sekä pysty-
       * että vaakaruudulla, eikä yläpalkki saa peittää sitä.
       */
      kuvaPalkinAlla: (() => {
        const pr = document.querySelector('.satelliittipalkki')?.getBoundingClientRect();
        return Boolean(r && pr && r.top < pr.bottom - 0.5 && r.bottom > pr.top);
      })(),
      kuvaKokonaan: Boolean(r && r.top >= -0.5 && r.bottom <= window.innerHeight + 0.5
        && r.left >= -0.5 && r.right <= window.innerWidth + 0.5),
      tekstit,
      popupeja: document.querySelectorAll('.satelliitti-popup').length,
      // Selite kuvan päällä: otsikkorivi (kohde — seutu) ja kuvateksti.
      seliteOtsikko: document.querySelector('.satelliitti-selite-otsikko')?.textContent ?? null,
      seliteTeksti: document.querySelector('.satelliitti-selite-teksti')?.textContent ?? null,
      // NASA-rivi väistyy kuvan ajaksi.
      ohjeNakyy: (() => {
        const o = document.querySelector('.satelliittipalkki-ohje');
        return o ? !o.hidden : null;
      })(),
      palkinKorkeus: document.querySelector('.satelliittipalkki')?.getBoundingClientRect().height ?? null,
      /*
       * PALKIN ALAREUNA, EI PELKKÄ KORKEUS (12.9.2026). Palkki on
       * KARTTARUUDUN sisällä ja alkaa pelin kehyksen verran alempaa
       * kuin ikkuna, joten korkeus yksin ei kerro, mistä kortin pitää
       * alkaa — juuri siitä syntyi vaakanäkymän 11 px:n limitys.
       */
      palkinAla: document.querySelector('.satelliittipalkki')?.getBoundingClientRect().bottom ?? 0,
      // Kuvan oma alue (lava): sama kuin koko kortti nyt, kun oma
      // hallintasarake on poistettu (15.9.2026).
      lava: (() => {
        const b = katselu?.querySelector('.satelliitti-lava')?.getBoundingClientRect();
        return b ? [Math.round(b.width), Math.round(b.height)] : null;
      })(),
    };
  });
  const lyhyempi = Math.min(kokoruutu.ikkuna[0], kokoruutu.ikkuna[1]);
  // Ikkuna alkaa linssin yläpalkin alta (kohteen nimi on palkissa), ja
  // kuva täyttää kaiken sen alapuolelta — KOKO ALAN, ei vain "lavan",
  // koska hallintasaraketta ei enää ole (omistaja 15.9.2026).
  const alue = kokoruutu.lava ?? kokoruutu.ruutu;
  const tayttoaste = Math.max(kokoruutu.kuvaLeveys / alue[0], kokoruutu.kuvaKorkeus / alue[1]);
  vaadi(nimessa('kuva avautuu heti koko ruudun peittäväksi, oma kuvasuhde säilyy'),
    kokoruutu.auki && kokoruutu.ladattu > 0 && tayttoaste > 0.98
      && kokoruutu.kuvaKorkeus <= kokoruutu.ruutu[1] + 1
      && kokoruutu.ruutu[0] === kokoruutu.ikkuna[0]
      && kokoruutu.ruutu[1] >= kokoruutu.ikkuna[1] - (kokoruutu.palkinAla ?? 0) - 1
      && /images-assets\.nasa\.gov/.test(kokoruutu.osoite ?? ''),
    JSON.stringify({ ...kokoruutu, tekstit: kokoruutu.tekstit.slice(0, 6), tayttoaste: Number(tayttoaste.toFixed(2)), lyhyempi }));
  /*
   * SELITE ON KUVAN PÄÄLLÄ (omistaja 16.9.2026: *"näytä suoraan
   * kohteen nimi ja selite vasemmassa yläreunassa kuvan päällä"*).
   * Muuta tekstiä kuvan päälle ei jää, ja NASA-rivi väistyy palkista.
   */
  vaadi(nimessa('kohteen nimi ja selite lukevat kuvan päällä, muuta tekstiä ei ole'),
    (kokoruutu.seliteOtsikko ?? '').startsWith('Saharan silmä')
      && (kokoruutu.seliteTeksti ?? '').length > 40
      && kokoruutu.ohjeNakyy === false
      && kokoruutu.popupeja === 0
      && kokoruutu.tekstit.length === 0,
    JSON.stringify({ otsikko: kokoruutu.seliteOtsikko, tekstit: kokoruutu.tekstit }));

  /* --- 5b. VAAKANÄKYMÄ: kuva mahtuu, palkit eivät peitä ------------- */
  vaadi(nimessa('yläpalkki ja kuva eivät mene päällekkäin'),
    kokoruutu.kuvaPalkinAlla === false,
    JSON.stringify({ palkinAlla: kokoruutu.kuvaPalkinAlla }));
  if (vaaka(nakymanNimi)) {
    vaadi(nimessa('vaakanäkymässä kuva mahtuu kokonaan — ei omaa hallintasaraketta enää'),
      kokoruutu.kuvaKokonaan === true,
      JSON.stringify({ kokonaan: kokoruutu.kuvaKokonaan,
        kuva: [kokoruutu.kuvaLeveys, kokoruutu.kuvaKorkeus], ikkuna: kokoruutu.ikkuna }));
  }
  vaadi(nimessa('palkin korkeus ei muutu kuvan avautuessa'),
    Math.abs((kokoruutu.palkinKorkeus ?? 0) - (palkki.omaKorkeus ?? 0)) < 0.5,
    JSON.stringify({ korkeus: kokoruutu.palkinKorkeus, ennen: palkki.omaKorkeus }));
  await kaappaa('havainto');

  /*
   * --- 6. Asettelu (omistaja 16.9.2026): selite ruudun vasemmassa
   * yläkulmassa, harmaa ✕ oikeassa yläkulmassa heti palkin alla,
   * pienoiskuvat ruudun vasemmassa alakulmassa — kaikki kiinnitettynä
   * RUUTUUN, ei kuvaelementtiin.
   */
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
    const sulkuEl = document.querySelector('.satelliitti-sulku');
    const t = sulkuEl ? getComputedStyle(sulkuEl) : null;
    const nauha = r('.satelliitti-nauha');
    const sulku = r('.satelliitti-sulku');
    const selite = r('.satelliitti-selite');
    const palkinAla = document.querySelector('.satelliittipalkki')?.getBoundingClientRect().bottom ?? 0;
    const paallekkain = (a, b) => Boolean(a && b)
      && a.x < b.oikea && b.x < a.oikea && a.y < b.ala && b.y < a.ala;
    const pikkuja = [...document.querySelectorAll('.satelliitti-pikku')].map((el) => {
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.left), y: Math.round(b.top), oikea: Math.round(b.right), ala: Math.round(b.bottom) };
    });
    return {
      nauha,
      sulku,
      selite,
      palkinAla: Math.round(palkinAla),
      ikkuna: [window.innerWidth, window.innerHeight],
      varit: t ? { teksti: t.color, tausta: t.backgroundColor, reuna: t.borderTopColor, pyorea: t.borderTopLeftRadius } : null,
      sulkuPikkujenPaalla: pikkuja.some((p) => paallekkain(sulku, p)),
      pikkuja: pikkuja.length,
      infoja: document.querySelectorAll('.satelliittipalkki-info').length,
    };
  });
  /** Onko laskettu väri harmaa (r = g = b)? */
  const harmaa = (v) => {
    const o = String(v ?? '').match(/rgba?\((\d+), (\d+), (\d+)/);
    return Boolean(o) && o[1] === o[2] && o[2] === o[3];
  };
  vaadi(nimessa('✕ on ruudun oikeassa yläkulmassa heti palkin alla, pyöreä ja HARMAA'),
    Boolean(napit.sulku) && napit.sulku.w >= 28 && napit.sulku.h >= 28
      && napit.ikkuna[0] - napit.sulku.oikea <= 20
      && napit.sulku.y - napit.palkinAla <= 20 && napit.sulku.y >= napit.palkinAla - 1
      && Math.round(parseFloat(napit.varit?.pyorea ?? '0')) >= 14
      && harmaa(napit.varit?.teksti) && harmaa(napit.varit?.tausta) && harmaa(napit.varit?.reuna)
      && !napit.sulkuPikkujenPaalla,
    JSON.stringify(napit));
  vaadi(nimessa('selite on ruudun vasemmassa yläkulmassa heti palkin alla, i-nappia ei ole'),
    Boolean(napit.selite) && napit.selite.x <= 16
      && napit.selite.y - napit.palkinAla <= 20 && napit.selite.y >= napit.palkinAla - 1
      && napit.infoja === 0,
    JSON.stringify(napit));
  vaadi(nimessa('pienoiskuvat kelluvat ruudun vasemmassa alakulmassa'),
    Boolean(napit.nauha) && napit.nauha.x <= 16
      && napit.ikkuna[1] - napit.nauha.ala <= 24 && napit.pikkuja === 2,
    JSON.stringify({ nauha: napit.nauha, ikkuna: napit.ikkuna }));

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

  /* --- 8. Väkänen avaa lisätiedot, tekstin napautus kelaa ----------- */
  const ennenKelaus = await s.evaluate(
    () => Math.round(document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height),
  );
  await s.evaluate(() => document.querySelector('.satelliitti-vakanen').click());
  await s.waitForTimeout(400);
  const info = await s.evaluate(() => {
    const lisa = document.querySelector('.satelliitti-lisatiedot');
    const selite = document.querySelector('.satelliitti-selite');
    const b = selite?.getBoundingClientRect();
    return {
      auki: Boolean(lisa) && !lisa.hidden,
      // Lisätiedot ovat SELITTEEN sisällä, saman laatikon alaosassa.
      samassaLaatikossa: Boolean(lisa && selite && selite.contains(lisa)),
      seliteLeveys: b ? Math.round(b.width) : null,
      ikkuna: [window.innerWidth, window.innerHeight],
      vakasenAria: document.querySelector('.satelliitti-vakanen')?.getAttribute('aria-expanded') ?? null,
      vakanenKaantyi: Boolean(document.querySelector('.satelliitti-vakanen.satelliitti-vakanen-auki')),
      tekstit: [...(lisa?.querySelectorAll('div') ?? [])].map((d) => d.textContent),
      linkkeja: [...(lisa?.querySelectorAll('.satelliitti-linkki') ?? [])].map((a) => a.href),
      // Väkäsen napautus EI saa kelata selitettä kiinni.
      kelautui: Boolean(selite?.classList.contains('satelliitti-selite-kiinni')),
    };
  });
  const infoTeksti = (info.tekstit ?? []).join(' | ');
  vaadi(nimessa('väkänen avaa lisätiedot selitteen alle samaan laatikkoon — eikä kelaa tekstiä'),
    info.auki && info.samassaLaatikossa && info.vakasenAria === 'true'
      && info.vakanenKaantyi && !info.kelautui
      && info.seliteLeveys <= Math.round(info.ikkuna[0] * (info.ikkuna[0] > 620 ? 0.47 : 1)),
    JSON.stringify({ ...info, tekstit: info.tekstit?.slice(0, 2) }));
  vaadi(nimessa('lisätiedoissa on koko lähdeketju aineistosta kuvakirjastoon'),
    /Aineisto:.*NASA/.test(infoTeksti) && /Kuvausaika: \d+\.\d+\.\d{4}/.test(infoTeksti)
      && /Paikka:.*°/.test(infoTeksti) && /Kuvaustapa:.*avaruusasemalta/.test(infoTeksti)
      && /Kuvatunnus: iss/.test(infoTeksti)
      && /Lisenssi: Public domain \(NASA\)/.test(infoTeksti)
      && info.linkkeja.some((u) => /images\.nasa\.gov\/details\//.test(u))
      && info.linkkeja.some((u) => /^https:\/\/images\.nasa\.gov\/$/.test(u)),
    JSON.stringify({ tekstit: info.tekstit?.slice(0, 3), linkkeja: info.linkkeja }));
  await kaappaa('lisatiedot');
  // Selitetekstin napautus kelaa tekstin ylös: vain otsikkorivi jää.
  await s.evaluate(() => document.querySelector('.satelliitti-selite-teksti')
    .dispatchEvent(new MouseEvent('click', { bubbles: true })));
  /*
   * ODOTETAAN TULOSTA, EI KELLOA. Korkeussiirtymä on 250 ms, mutta
   * kontin ohjelmisto-WebGL ja rinnakkaiset savukkeet voivat nälkiinnyttää
   * ruudunpiirron sekunneiksi — kiinteä odotus mittasi silloin siirtymän
   * puolivälistä. Tämä odottaa mitattavaa arvoa ja antaa periksi vasta
   * aikakatkaisussa, jolloin väite kaatuu aidosti.
   */
  await s.waitForFunction(
    () => document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height <= 1,
    null, { timeout: 15000 },
  ).catch(() => {});
  const kelaus = await s.evaluate(() => {
    const otsikko = document.querySelector('.satelliitti-selite-otsikko').getBoundingClientRect();
    return {
      kiinni: document.querySelector('.satelliitti-selite').classList.contains('satelliitti-selite-kiinni'),
      runko: Math.round(document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height),
      otsikkoNakyy: otsikko.height > 4,
    };
  });
  vaadi(nimessa('selitetekstin napautus kelaa tekstin ylös — vain otsikkorivi jää'),
    kelaus.kiinni && kelaus.runko <= 1 && kelaus.otsikkoNakyy && ennenKelaus > 10,
    JSON.stringify({ ...kelaus, ennenKelaus }));
  // Uusi napautus avaa takaisin.
  await s.evaluate(() => document.querySelector('.satelliitti-selite')
    .dispatchEvent(new MouseEvent('click', { bubbles: true })));
  await s.waitForFunction(
    () => document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height > 10,
    null, { timeout: 15000 },
  ).catch(() => {});
  const takaisin = await s.evaluate(
    () => Math.round(document.querySelector('.satelliitti-selite-runko').getBoundingClientRect().height),
  );
  vaadi(nimessa('uusi napautus avaa selitteen takaisin'), takaisin > 10, String(takaisin));

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
    const pikkukuvat = [...katselu.querySelectorAll('.satelliitti-pikku')];
    const valittuIndeksi = pikkukuvat.findIndex((el) => el.classList.contains('valittu'));
    const seliteEnnen = document.querySelector('.satelliitti-selite-teksti')?.textContent ?? '';
    // EI NUOLIA ENÄÄ (omistaja 15.9.2026): vaihto tapahtuu TOISESTA
    // pikkukuvasta, ei .satelliitti-seuraava-napista (poistettu).
    pikkukuvat[1]?.click();
    await new Promise((r) => setTimeout(r, 300));
    return {
      pikkuja: pikkukuvat.length,
      valittuIndeksi,
      seliteEnnen,
      seliteJalkeen: document.querySelector('.satelliitti-selite-teksti')?.textContent ?? '',
      otsikko: document.querySelector('.satelliitti-selite-otsikko')?.textContent ?? '',
      srcVaihtui: katselu.querySelector('.satelliitti-kuva').src !== ennenSrc,
      zoomEnnen,
      zoomJalkeen: getComputedStyle(katselu.querySelector('.satelliitti-kuva')).transform,
      // Vertaa-toiminto on poistettu kokonaan (kysymyskortti 15.9.2026).
      vertaaOlemassa: Boolean(katselu.querySelector('.satelliitti-vertaa')),
      nuoletOlemassa: Boolean(katselu.querySelector('.satelliitti-nuoli')),
      laskuriOlemassa: Boolean(katselu.querySelector('.satelliitti-laskuri')),
    };
  });
  vaadi(nimessa('galleria kuvan päällä: 2 hyvin pientä pikkukuvaa, EI laskuria, nuolia eikä Vertaa-nappia'),
    galleria.pikkuja === 2 && galleria.valittuIndeksi === 0 && galleria.srcVaihtui
      && !galleria.vertaaOlemassa && !galleria.nuoletOlemassa && !galleria.laskuriOlemassa
      && galleria.otsikko.startsWith('Etna')
      && galleria.seliteEnnen !== galleria.seliteJalkeen,
    JSON.stringify(galleria));
  vaadi(nimessa('zoom nollautuu otosta vaihdettaessa'),
    galleria.zoomEnnen !== 'none' && (galleria.zoomJalkeen === 'none' || /matrix\(1, 0, 0, 1, 0, 0\)/.test(galleria.zoomJalkeen)),
    JSON.stringify({ ennen: galleria.zoomEnnen, jalkeen: galleria.zoomJalkeen }));
  await kaappaa('galleria');

  /* --- 10. Sulkuristi sulkee ikkunan, EI linssiä -------------------- */
  await s.evaluate(() => document.querySelector('.satelliitti-sulku')?.click());
  await s.waitForTimeout(600);
  const suljettuIkkuna = await s.evaluate(() => ({
    ikkunoita: document.querySelectorAll('.satelliitti-katselu').length,
    linssi: window.matkakirja.ui.pallolinssi?.tunnus ?? null,
    palkkeja: document.querySelectorAll('.satelliittipalkki').length,
    ohjeNakyy: (() => {
      const o = document.querySelector('.satelliittipalkki-ohje');
      return o ? !o.hidden : null;
    })(),
    merkkeja: document.querySelectorAll('.satelliitti-piste').length,
  }));
  vaadi(nimessa('sulkuristi sulkee havaintoikkunan mutta EI linssiä'),
    suljettuIkkuna.ikkunoita === 0 && suljettuIkkuna.linssi === 'satelliitti'
      && suljettuIkkuna.palkkeja === 1 && suljettuIkkuna.ohjeNakyy === true
      && suljettuIkkuna.merkkeja > 0,
    JSON.stringify(suljettuIkkuna));

  /* --- 11. Merkit eivät kuluta pelivuoroa --------------------------- */
  const kesken = await s.evaluate(PELITILA);
  vaadi(nimessa('linssin merkit eivät kuluta pelivuoroa eivätkä käynnistä matkustusta'),
    kesken === ennen, `${ennen}\n    vs ${kesken}`);

  /* --- 12. Linssin sulkeminen palauttaa kaiken ---------------------- */
  await s.evaluate(() => {
    document.querySelector('.satelliittipalkki-hampurilainen').click();
    document.querySelector('.satelliittipalkki-poistu').click();
  });
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
      liikuNakyy: (() => {
        const n = document.querySelector('.toimintorivi .monitoimi-nappi');
        return n ? getComputedStyle(n).display !== 'none' : null;
      })(),
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
  vaadi(nimessa('Liiku-nappi palaa näkyviin, kun linssi suljetaan'),
    jalkeen.liikuNakyy === true, JSON.stringify(jalkeen));
  await kaappaa('suljettu');

  vaadi(nimessa('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' / '));
  await konteksti.close();
}

for (const nakyma of (process.env.NAKYMAT ? process.env.NAKYMAT.split(',') : ['tyopoyta', 'ipad', 'puhelin', 'puhelinvaaka', 'ipadvaaka', 'pienivaaka'])) {
  // eslint-disable-next-line no-await-in-loop
  await ajaNakyma(nakyma);
}

await selain.close();
palvelin.close();
const kaatuneet = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatuneet.length}/${tulokset.length} läpi. Kaappaukset: ${ULOS}`);
process.exit(kaatuneet.length ? 1 : 0);
