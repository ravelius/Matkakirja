/*
 * SELAINSAVUKE: LINSSI EI JÄTÄ LUENTAKUVAA KARTALLE, JA KERTOJAN TEKSTI
 * ON RUUDUN KESKELLÄ.
 *
 *   NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-linssi-teksti-keskella.mjs
 *
 * Raamattu "IHMISEN MATKA: LUENTAKUVA EI SAA JAADA LINSSIN PAALLE, JA
 * TEKSTI KESKELLE RUUTUA" (omistaja 9.9.2026 klo 16.35, kaksi
 * iPhone-kaappausta, sanatarkasti: *"Kartalla näkyy valokuva ja toinen
 * korjattava asia. Teksti pitää olla keskelle ruutua. Nyt se on liian
 * alhaalla."*).
 *
 * MIKSI SAVUKE EIKÄ VAIN YKSIKKÖTESTI. Kumpikin vika on mittasuhde,
 * ei logiikka: yksikkötesti näkee, että css-sääntö on olemassa
 * (tests/aikajana.test.mjs, tests/ihmisen-matka-esitys.test.mjs), mutta
 * ei sitä, MIHIN KOHTAAN RUUTUA lause lopulta latoutuu, kun linssin oma
 * yläpalkki ja alareunan aikaselain ovat paikallaan — juuri se oli
 * omistajan vika (61 % oli puhelimella jo alakolmannes). Eikä se näe,
 * kuuluuko luentakuva yhä dokumenttiin linssin jälkeen: piilotus saa
 * olla luokka, EI purku, jotta kuva palaa samassa kaupungissa.
 *
 * NÄKYMÄT: puhelin 430 × 930 (omistajan iPhone) ja työpöytä 1600 × 1000.
 *
 * VÄITTEET:
 *   1. Luentakuva nousee kartalle Pariisissa (paneeli, ankkuri ja kuva).
 *   2. LINSSIN AJAN PIILOSSA: paneelin ja ankkurin computed display on
 *      `none`, eikä kumpikaan piirrä ruudulle yhtään pikseliä.
 *   2b. PIILOTUS EI OLE PURKU: paneeli on yhä dokumentissa ja
 *      `ui.luentakuva` osoittaa siihen (muuten kuva ei voisi palata).
 *   3. TEKSTI KESKELLÄ: avausjakson lauselaatikon pystykeskipiste on
 *      50 % ± 5 % NÄKYMÄN korkeudesta — ei linssin palkin eikä
 *      aikaselaimen siirtämänä.
 *   4. Sama mitta myös 'valot'-jaksossa ("Tämä on se maanosa…"), joka
 *      on omistajan kaappauksen hetki.
 *   5. LINSSIN JÄLKEEN KUVA PALAA: sulkemisen jälkeen paneeli on taas
 *      näkyvissä samassa kaupungissa.
 *   6. Ei sivuvirheitä.
 *
 * KUVAKAAPPAUKSET (KAAPPAUKSET, oletus /tmp/matkakirja-kaappaukset):
 *   ihmisen-matka-teksti-keskella-puhelin.png
 *   ihmisen-matka-teksti-keskella-tyopoyta.png
 */
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PORTTI = 8751;
const ULOS = process.env.KAAPPAUKSET ?? '/tmp/matkakirja-kaappaukset';
mkdirSync(ULOS, { recursive: true });

/** Omistajan mitta: iPhone 430 × 930 ja työpöytä 1600 × 1000. */
const NAKYMAT = {
  puhelin: { viewport: { width: 430, height: 930 }, deviceScaleFactor: 1 },
  tyopoyta: { viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 },
};

/** Kuinka kaukana ruudun puolivälistä lause saa olla (omistajan mitta). */
const KESKITYKSEN_VARA = 0.05;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2',
};

/**
 * Hiljaisuus 16-bittisenä mono-WAVina (sama kikka kuin
 * savuke-ihmisen-esitys.mjs: selain päättää muodon sisällöstä, ja WAV
 * syntyy ilman ffmpegiä, jota kontissa ei ole).
 */
function hiljaisuusWav(sekunteja = 3, hz = 8000) {
  const tavuja = hz * sekunteja * 2;
  const p = Buffer.alloc(44 + tavuja);
  p.write('RIFF', 0); p.writeUInt32LE(36 + tavuja, 4); p.write('WAVE', 8);
  p.write('fmt ', 12); p.writeUInt32LE(16, 16); p.writeUInt16LE(1, 20);
  p.writeUInt16LE(1, 22); p.writeUInt32LE(hz, 24); p.writeUInt32LE(hz * 2, 28);
  p.writeUInt16LE(2, 32); p.writeUInt16LE(16, 34);
  p.write('data', 36); p.writeUInt32LE(tavuja, 40);
  return p;
}
const HILJAISUUS = hiljaisuusWav(3);

/* Ämpäri Noden kautta (CLAUDE.md: NODE_USE_ENV_PROXY=1). */
const AMPARI_VALIMUISTI = new Map();
async function ampariHaku(url) {
  if (AMPARI_VALIMUISTI.has(url)) return AMPARI_VALIMUISTI.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : null)).catch(() => null);
  AMPARI_VALIMUISTI.set(url, lupaus);
  return lupaus;
}

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
  args: ['--autoplay-policy=no-user-gesture-required'],
});

const tulokset = [];
const vaadi = (nimi, ok, lisa = '') => {
  tulokset.push({ nimi, ok, lisa });
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${nimi}${lisa ? ` — ${lisa}` : ''}`);
};

/** Selainikkuna reitityksineen (ulkoverkko kiinni, ämpäri Noden kautta). */
async function avaaSivu(nakyma, virheet) {
  const konteksti = await selain.newContext({ ...nakyma, serviceWorkers: 'block' });
  const sivu = await konteksti.newPage();
  sivu.on('pageerror', (e) => virheet.push(String(e)));
  await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), (route) => route.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev/, async (route) => {
    const vastaus = await ampariHaku(route.request().url());
    if (!vastaus) { route.abort(); return; }
    route.fulfill({
      status: 200, contentType: vastaus.tyyppi ?? 'application/octet-stream', body: vastaus.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  // Äänitteet hiljaisuutena: jaksot etenevät kontissakin ennustettavasti.
  await sivu.route(/\/puhe\/|\/aanet\//, (route) => route.fulfill({
    status: 200, contentType: 'audio/wav', body: HILJAISUUS,
    headers: { 'access-control-allow-origin': '*' },
  }));
  return { konteksti, sivu };
}

/** Peli auki pallolaudalle Pariisiin (kaupunki, jolla ON luentakuva). */
async function avaaPeli(sivu) {
  await sivu.goto(`http://127.0.0.1:${PORTTI}/index.html?lauta=pallo`, { waitUntil: 'load' });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    [...document.querySelectorAll('button')].find((b) => /aloita seikkailu/i.test(b.textContent))?.click();
  });
  await sivu.waitForTimeout(2500);
  await sivu.evaluate(() => {
    const { game, ui } = window.matkakirja;
    if (game.phase === 'pickstart') game.actionPickStart(game.pack.cities.find((c) => c.links?.length).id, 0);
    game.player.pos = { type: 'city', city: 'pariisi' };
    game.world.visited.add('pariisi');
    game.phase = 'action';
    ui.render();
  });
  await sivu.waitForTimeout(1200);
  return sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null, { timeout: 45000 })
    .then(() => true).catch(() => false);
}

/** Luentakuvan tila ruudulla: onko olemassa, näkyykö, onko viite tallessa. */
const luentakuvanTila = (sivu) => sivu.evaluate(() => {
  const paneeli = document.querySelector('.fokusvirta-luentakuva');
  const ankkuri = document.querySelector('.fokusvirta-luentakuva-ankkuri');
  const nakyy = (el) => {
    if (!el) return false;
    const t = getComputedStyle(el);
    if (t.display === 'none' || t.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  return {
    dom: Boolean(paneeli),
    viite: Boolean(window.matkakirja?.ui?.luentakuva),
    display: paneeli ? getComputedStyle(paneeli).display : null,
    ankkurinDisplay: ankkuri ? getComputedStyle(ankkuri).display : null,
    nakyy: nakyy(paneeli),
    ankkuriNakyy: nakyy(ankkuri),
    laatikko: paneeli ? paneeli.getBoundingClientRect().toJSON() : null,
    aarrenappi: (() => {
      const n = document.querySelector('.etsi-aarre-ankkuri');
      return n ? { on: true, nakyy: nakyy(n) } : { on: false, nakyy: false };
    })(),
  };
});

/** Kertojan lauselaatikon pystykeskipiste osuutena näkymän korkeudesta. */
const tekstinPaikka = (sivu) => sivu.evaluate(() => {
  const rivi = document.querySelector('.aikajana-kertomusteksti');
  const sisus = document.querySelector('.aikajana-kertomusteksti-sisus');
  const r = sisus?.getBoundingClientRect() ?? null;
  const palkki = document.querySelector('.aikajana-palkki');
  const nauha = document.querySelector('.aikaselain');
  return {
    keskella: rivi?.classList.contains('keskella') ?? false,
    esilla: rivi?.classList.contains('esilla') ?? false,
    nakyy: sisus?.classList.contains('nakyy') ?? false,
    teksti: sisus?.textContent ?? '',
    keski: r ? (r.top + r.height / 2) / window.innerHeight : null,
    laatikko: r ? { top: r.top, bottom: r.bottom, h: r.height } : null,
    palkkiKorkeus: palkki ? Math.round(palkki.getBoundingClientRect().height) : 0,
    nauhaKorkeus: nauha ? Math.round(nauha.getBoundingClientRect().height) : 0,
    vaihe: window.matkakirja?.ui?.aikajana?.esitys?.tila?.()?.vaihe ?? null,
    ruutu: { w: window.innerWidth, h: window.innerHeight },
  };
});

/**
 * Odottaa esityksen vaihetta JA PYSÄYTTÄÄ samalla kierroksella.
 *
 * Sama oppi kuin savuke-ihmisen-esitys.mjs:ssä: kontin ohjelmisto-WebGL
 * piirtää pallon noin kehyksen sekunnissa, joten erillinen odotus ja
 * erillinen mittaus osuvat eri hetkiin.
 */
const odotaVaihe = (sivu, vaihe, kierroksia = 900) => sivu.evaluate(async ([v, n]) => {
  const { ui } = window.matkakirja;
  for (let i = 0; i < n; i += 1) {
    const t = ui.aikajana?.esitys?.tila?.();
    if (!t || t.paattynyt) break;
    const sisus = document.querySelector('.aikajana-kertomusteksti-sisus');
    // Vaihe on oikea JA lause on ehtinyt ruudulle: tyhjää laatikkoa ei mitata.
    if (t.vaihe === v && sisus?.classList.contains('nakyy') && sisus.textContent.trim()) {
      ui.aikajana.esitys.tauko();
      return { osui: true, vaihe: t.vaihe };
    }
    await new Promise((r) => setTimeout(r, 60));
  }
  return { osui: false, vaihe: ui.aikajana?.esitys?.tila?.()?.vaihe ?? null };
}, [vaihe, kierroksia]);

for (const nimi of Object.keys(NAKYMAT)) {
  const virheet = [];
  const { konteksti, sivu } = await avaaSivu(NAKYMAT[nimi], virheet);
  const n = (teksti) => `${teksti} (${nimi})`;

  const pallo = await avaaPeli(sivu);
  vaadi(n('pallolauta avautuu Pariisiin'), pallo, 'ui.pallolauta ei syntynyt 45 s:ssa');

  /* ------------------------------------ 1. luentakuva kartalle ennen linssiä */

  await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    const moduuli = await import('/js/fokusvirta.js');
    window.__luentakuva = moduuli.naytaLuentakuva(ui, game.cityOf());
  });
  await sivu.waitForTimeout(1200);
  const ennen = await luentakuvanTila(sivu);
  vaadi(n('luentakuva on kartalla ennen linssiä'),
    ennen.dom && ennen.viite && ennen.nakyy, JSON.stringify(ennen));

  /* --------------------------------------------------- 2. linssi päälle */

  const lahto = await sivu.evaluate(async () => {
    const { ui } = window.matkakirja;
    ui.busy = false;
    if (!ui.game.player.linssit.includes('ihmisen-matka')) ui.game.player.linssit.push('ihmisen-matka');
    ui.valitseLinssi('ihmisen-matka');
    for (let i = 0; i < 600; i += 1) {
      if (document.querySelector('.aikajana-avaus-nappi')) break;
      await new Promise((r) => setTimeout(r, 25));
    }
    return { aikajana: Boolean(ui.aikajana), nappi: Boolean(document.querySelector('.aikajana-avaus-nappi')) };
  });
  vaadi(n('Ihmisen matka avautuu ja Käynnistä-nappi on ruudulla'),
    lahto.aikajana && lahto.nappi, JSON.stringify(lahto));

  const linssissa = await luentakuvanTila(sivu);
  vaadi(n('luentakuva on linssin ajan piilossa'),
    linssissa.display === 'none' && linssissa.ankkurinDisplay === 'none'
      && !linssissa.nakyy && !linssissa.ankkuriNakyy,
    JSON.stringify(linssissa));
  vaadi(n('piilotus ei ole purku: paneeli ja ui.luentakuva ovat tallessa'),
    linssissa.dom && linssissa.viite, JSON.stringify(linssissa));
  vaadi(n('Etsi aarre -nappi ei jää linssin päälle'),
    !linssissa.aarrenappi.nakyy, JSON.stringify(linssissa.aarrenappi));

  /* --------------------------------------- 3.–4. teksti keskellä ruutua */

  await sivu.evaluate(() => {
    document.querySelector('.aikajana-avaus-nappi')?.click();
  });

  const pimea = await odotaVaihe(sivu, 'pimea', 400);
  const avaus = await tekstinPaikka(sivu);
  vaadi(n('avausjakson lause on pystysuunnassa ruudun keskellä'),
    pimea.osui && avaus.keskella && avaus.keski !== null
      && Math.abs(avaus.keski - 0.5) <= KESKITYKSEN_VARA,
    `keski ${avaus.keski === null ? '—' : (avaus.keski * 100).toFixed(1)} % `
      + `(palkki ${avaus.palkkiKorkeus} px, nauha ${avaus.nauhaKorkeus} px) "${avaus.teksti.slice(0, 40)}"`);
  await sivu.evaluate(() => window.matkakirja.ui.aikajana?.esitys?.jatka());

  /*
   * OMISTAJAN KAAPPAUKSEN HETKI: 'valot'-jakso ("Tämä on se maanosa…"),
   * jossa pallo on jo esillä lauseen takana. Kontissa zoomi kestää
   * kauan, joten odotus on pitkä ja epäonnistuminen kirjataan väitteenä.
   */
  const valot = await odotaVaihe(sivu, 'valot', 2400);
  const afrikka = await tekstinPaikka(sivu);
  vaadi(n('afrikka-jakson lause on pystysuunnassa ruudun keskellä'),
    valot.osui && afrikka.keskella && afrikka.keski !== null
      && Math.abs(afrikka.keski - 0.5) <= KESKITYKSEN_VARA,
    `keski ${afrikka.keski === null ? '—' : (afrikka.keski * 100).toFixed(1)} % `
      + `(palkki ${afrikka.palkkiKorkeus} px, nauha ${afrikka.nauhaKorkeus} px) "${afrikka.teksti.slice(0, 40)}"`);

  const linssissaViela = await luentakuvanTila(sivu);
  vaadi(n('luentakuva on yhä piilossa kesken esityksen'),
    !linssissaViela.nakyy && linssissaViela.dom, JSON.stringify(linssissaViela));

  await sivu.screenshot({ path: join(ULOS, `ihmisen-matka-teksti-keskella-${nimi}.png`) });

  /* ------------------------------------------ 5. sulku palauttaa kuvan */

  await sivu.evaluate(() => window.matkakirja.ui.pysaytaAikajana?.());
  await sivu.waitForTimeout(1500);
  const jalkeen = await luentakuvanTila(sivu);
  vaadi(n('luentakuva palaa kartalle linssin sulkeuduttua'),
    jalkeen.dom && jalkeen.viite && jalkeen.nakyy && jalkeen.display !== 'none',
    JSON.stringify(jalkeen));

  vaadi(n('ei sivuvirheitä'), virheet.length === 0, virheet.slice(0, 3).join(' | '));
  await konteksti.close();
}

await selain.close();
palvelin.close();

const kaatui = tulokset.filter((t) => !t.ok);
console.log(`\n${tulokset.length - kaatui.length}/${tulokset.length} väitettä läpi`);
process.exit(kaatui.length ? 1 : 0);
