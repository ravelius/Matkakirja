/*
 * Savuke: LUENTAKUVAN KERROS JA PULUCAM-SARJAN KETJU.
 *
 * Kaksi omistajan vikailmoitusta 12.9.2026, sanatarkasti:
 *   *"kuva saisi jäädä matkakirjan alle. pulun kuvat eivät tule
 *   jostain syystä isoisän kuvien jälkeen näkyville"*
 * ja saman päivän tarkennus:
 *   *"kun tullaan ateenaan niin isoisän kuvat saisi tulla vasta kun
 *   isoisän luenta alkaa"*.
 *
 * VARTIOT:
 *   1. KERROS: iso luentakuva EI maalaudu matkakirjakortin päälle.
 *      Mitataan kolmella ruudulla kortin TEKSTIALASTA pisteotannalla —
 *      ei geometrialla, koska kuva saa yhä olla kortin takana.
 *   2. KUVA ON YHÄ ISO: kotelo täyttää vähintään puolet ruudun
 *      lyhyemmästä sivusta. Kerroskorjaus ei saa muuttua kuvan
 *      pienentämiseksi (omistaja tilasi ISOT luentakuvat).
 *   3. KETJU: isoisän kuva → (luenta loppuu) → pulun kommentti →
 *      PULUCAM-KUVAT ISOINA → pieni pakka kartalle. Juuri kolmas
 *      lenkki katkesi: kommentti tuli vasta sen jälkeen, kun sarja oli
 *      jo purkautunut, eikä yksikään vartio nähnyt sitä.
 *   4. JÄRJESTYS: isoisän kuva ei tule ennen isoisän luentaa.
 *
 * KOEKAUPUNKI ON VENETSIA: sillä on isoisän kaksi luentakuvaa ja VIISI
 * PuluCam-kuvaa eli pisin mahdollinen sarja. Juuri Venetsiassa ketju
 * mitattiin katkenneeksi (kommentti 44,4 s, sarja purkautui 35,2 s).
 *
 * Aja:  NODE_USE_ENV_PROXY=1 node tools/savukkeet/savuke-luentakuvan-kerros.mjs [kuvakansio]
 */
import http from 'node:http';
import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { extname, join } from 'node:path';

import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KUVAKANSIO = process.argv[2] ?? null;
if (KUVAKANSIO && !existsSync(KUVAKANSIO)) mkdirSync(KUVAKANSIO, { recursive: true });

const KAUPUNKI = 'venetsia';
const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tabletti', width: 834, height: 1194 },
  { nimi: 'tyopoyta', width: 1280, height: 800 },
];

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg',
  '.geojson': 'application/json',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/?lauta=pallo`;

/* Ämpäri Noden kautta (selaimessa ei ole ulkoverkkoa). */
const valimuisti = new Map();
async function ampariHaku(url) {
  if (valimuisti.has(url)) return valimuisti.get(url);
  const lupaus = fetch(url).then(async (v) => (v.ok
    ? { status: 200, body: Buffer.from(await v.arrayBuffer()), tyyppi: v.headers.get('content-type') }
    : { status: v.status, body: Buffer.alloc(0), tyyppi: 'text/plain' }))
    .catch(() => null);
  valimuisti.set(url, lupaus);
  return lupaus;
}

let lapi = 0;
let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => {
  kaikki += 1;
  if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`);
};
const tieto = (nimi, arvo) => console.log(`INFO  ${nimi}: ${arvo}`);

const peli = new Game({
  players: [{ name: 'Fogg', color: '#c9a227', start: 'ateena' }],
  pack: packById('maailmankartta'),
  seed: 5,
});
peli.phase = 'action';
const tallenne = JSON.stringify(peli.toJSON());

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const virheet = [];

/** Avaa pelin, saapuu koekaupunkiin ja palauttaa sivun apureineen. */
async function avaaAjo(viewport, { lykkays = false } = {}) {
  const ctx = await selain.newContext({ viewport, serviceWorkers: 'block' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.setItem('matkakirja-livia-avaus', '1');
      localStorage.setItem('matkakirja-livia-paljastus', '1');
    } catch { /* yksityinen tila */ }
  }, tallenne);
  const sivu = await ctx.newPage();
  const cdp = await ctx.newCDPSession(sivu);
  sivu.on('pageerror', (e) => virheet.push(String(e.message ?? e)));
  await sivu.route('**samireivinen.workers.dev/**', (r) => r.abort());
  await sivu.route(/wikimedia\.org/, (r) => r.abort());
  await sivu.route(/media\.matkakirja\.app|r2\.dev\//, async (route) => {
    const v = await ampariHaku(route.request().url());
    if (!v || v.status !== 200) { route.abort(); return; }
    route.fulfill({
      status: 200,
      contentType: v.tyyppi ?? 'application/octet-stream',
      body: v.body,
      headers: { 'access-control-allow-origin': '*' },
    });
  });
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui), null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja?.ui?.pallolauta), null,
    { timeout: 90000 }).catch(() => console.log('HUOM  pallolauta ei ehtinyt avautua'));
  await sivu.waitForTimeout(4000);
  await sivu.evaluate(([id, lykkays]) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    /*
     * ENSISAAPUMISEN LYKKÄYS (js/livia.js odotaLuenta): luenta odottaa
     * pulun kahta aloituskuplaa. Savuke nostaa saman lipun kuin peli,
     * koska juuri tässä tilassa isoisän kuva tuli ennen aikojaan.
     */
    if (lykkays) ui.luennanLykkays = true;
    ui.render();
  }, [KAUPUNKI, lykkays]);
  return { ctx, sivu, cdp };
}

/* ================================================================
   1–2. KERROS JA KOKO KOLMELLA RUUDULLA
   ================================================================ */
for (const ruutu of RUUDUT) {
  const { ctx, sivu, cdp } = await avaaAjo({ width: ruutu.width, height: ruutu.height });
  // Sarja tulee vasta luennan alkaessa; odotetaan se ja varmistetaan.
  await sivu.waitForFunction(() => Boolean(document.querySelector('.fokusvirta-isokuva-ruutu')),
    null, { timeout: 30000 }).catch(() => {});
  await sivu.evaluate(async () => {
    const { ui, game } = window.matkakirja;
    if (ui.luentakuvasarja) return;
    const m = await import('/js/fokusvirta.js');
    m.naytaLuentakuvasarja(ui, game.cityOf());
    ui.diaryVoice = { paused: false, currentTime: 1, ended: false, error: null };
  });
  await sivu.waitForTimeout(1500);

  const mitta = await sivu.evaluate(() => {
    const laatikko = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height };
    };
    const kortti = document.querySelector('.fact-card');
    const kehys = document.querySelector('.fokusvirta-isokuva');
    const kotelo = document.querySelector('.fokusvirta-isokuva-ruutu.nakyy .fokusvirta-isokuva-kotelo')
      ?? document.querySelector('.fokusvirta-isokuva-kotelo');
    const osat = [...(kortti?.querySelectorAll('h2, .fact-text, p') ?? [])]
      .map(laatikko).filter((b) => b && b.w > 4 && b.h > 4);
    /*
     * TODELLINEN NÄKYVYYS PISTEOTANNALLA. Kuva saa olla kortin takana,
     * joten geometrinen leikkaus ei kerro mitään — vain se, kumpi
     * maalautuu päälle.
     *
     * OSOITINTAPAHTUMAT KYTKETÄÄN KUVAAN, EI KEHYKSEEN. Kehys on koko
     * ruudun kokoinen ja läpinäkyvä; jos se ottaisi napautukset, otanta
     * osuisi siihen myös siellä, missä kuvaa ei ole, ja mittari
     * näyttäisi nollaa jokaisella ruudulla. Mitattava on KUVA.
     */
    let nakyvia = 0;
    let yhteensa = 0;
    if (kotelo && osat.length) {
      const vanha = kotelo.style.pointerEvents;
      kotelo.style.pointerEvents = 'auto';
      for (const o of osat) {
        for (let sy = 0; sy < 10; sy += 1) {
          for (let sx = 0; sx < 10; sx += 1) {
            const el = document.elementFromPoint(
              o.x + (o.w * (sx + 0.5)) / 10, o.y + (o.h * (sy + 0.5)) / 10,
            );
            yhteensa += 1;
            if (el?.closest?.('.fact-card')) nakyvia += 1;
          }
        }
      }
      kotelo.style.pointerEvents = vanha;
    }
    return {
      kortti: Boolean(kortti),
      kotelo: laatikko(kotelo),
      nakyvyys: yhteensa ? Math.round((nakyvia / yhteensa) * 100) : null,
      zKehys: kehys ? getComputedStyle(kehys).zIndex : null,
    };
  });
  tieto(`${ruutu.nimi} ${ruutu.width}×${ruutu.height}`, JSON.stringify(mitta));
  vaadi(`${ruutu.nimi}: matkakirjakortin teksti näkyy kokonaan`,
    mitta.nakyvyys === 100, `näkyvissä ${mitta.nakyvyys} %`);
  const lyhyt = Math.min(ruutu.width, ruutu.height);
  vaadi(`${ruutu.nimi}: luentakuva on yhä ISO`,
    Boolean(mitta.kotelo) && Math.max(mitta.kotelo.w, mitta.kotelo.h) >= lyhyt * 0.5,
    JSON.stringify(mitta.kotelo));
  if (KUVAKANSIO) {
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png' });
    writeFileSync(join(KUVAKANSIO, `luentakuvan-kerros-${ruutu.nimi}.png`),
      Buffer.from(data, 'base64'));
  }
  await ctx.close();
}

/* ================================================================
   3–4. KETJU: JÄRJESTYS JA PULUCAM-KUVIEN ILMESTYMINEN
   ================================================================ */
const { ctx, sivu } = await avaaAjo({ width: 1280, height: 800 });
const t0 = Date.now();
const hetket = {};
/*
 * NÄYTTEENOTTO 400 ms:n VÄLEIN, ei kiinteitä odotuksia: ketjun kellot
 * ovat sekuntien mittaisia ja vaihtelevat äänitteen pituuden mukaan,
 * joten savuke katsoo mitä ruudulla TAPAHTUU eikä oleta milloin.
 */
for (let i = 0; i < 200; i += 1) {
  const tila = await sivu.evaluate(() => {
    const { ui } = window.matkakirja;
    const ruudut = [...document.querySelectorAll('.fokusvirta-isokuva-ruutu')];
    return {
      luenta: ui.luentaKesken?.() === true,
      isoisa: ruudut.some((r) => !r.querySelector('.pulucam-merkki-iso')),
      pulu: ruudut.some((r) => r.querySelector('.pulucam-merkki-iso')),
      pakka: document.querySelectorAll('.pulucam-kortti').length > 0,
    };
  });
  const t = Date.now() - t0;
  for (const [nimi, arvo] of Object.entries(tila)) {
    if (arvo && hetket[nimi] === undefined) hetket[nimi] = t;
  }
  if (hetket.pakka !== undefined) break;
  await sivu.waitForTimeout(400);
}
tieto('ketjun hetket (ms saapumisesta)', JSON.stringify(hetket));
vaadi('isoisän luenta alkaa', hetket.luenta !== undefined);
vaadi('isoisän kuva tulee ruudulle', hetket.isoisa !== undefined);
vaadi('isoisän kuva EI tule ennen isoisän luentaa',
  hetket.isoisa >= hetket.luenta, `kuva ${hetket.isoisa} ms, luenta ${hetket.luenta} ms`);
vaadi('PULUCAM-KUVAT TULEVAT ISOINA isoisän kuvien jälkeen',
  hetket.pulu !== undefined && hetket.pulu > hetket.isoisa,
  `pulu ${hetket.pulu} ms, isoisä ${hetket.isoisa} ms`);
vaadi('pieni pakka jää kartalle vasta pulun kuvien jälkeen',
  hetket.pakka !== undefined && hetket.pakka > hetket.pulu,
  `pakka ${hetket.pakka} ms, pulu ${hetket.pulu} ms`);
await ctx.close();

/* ================================================================
   5. ENSISAAPUMINEN: KUVA VASTA LYKÄTYN LUENNAN ALKAESSA
   ================================================================

   Omistaja 12.9.2026: *"kun tullaan ateenaan niin isoisän kuvat saisi
   tulla vasta kun isoisän luenta alkaa. nyt ne tulivat heti kun
   ateenaan oli saavuttu ja pulun aloituskommentit vasta alkoivat"*.

   Mitattu ennen korjausta (Ateena, 8 s lykkäys): isoisän kuva 2,4 s,
   luenta 8,8 s — kuva oli ruudulla 6,4 sekuntia liian aikaisin. */
{
  const ajo = await avaaAjo({ width: 1280, height: 800 }, { lykkays: true });
  await ajo.sivu.waitForTimeout(6000);
  const kesken = await ajo.sivu.evaluate(() => ({
    paallys: document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
    lykkays: window.matkakirja.ui.luennanLykkays === true,
  }));
  tieto('lykkäyksen aikana', JSON.stringify(kesken));
  vaadi('lykkäys on yhä päällä 6 s kuluttua', kesken.lykkays === true);
  vaadi('isoisän kuva EI ole ruudulla lykkäyksen aikana', kesken.paallys === 0,
    `ruutuja ${kesken.paallys}`);

  // Pulun kuplat sanottu: luenta lähtee — ja vasta nyt kuva.
  await ajo.sivu.evaluate(() => window.matkakirja.ui.aloitaLykattyLuenta());
  await ajo.sivu.waitForFunction(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length > 0,
    null, { timeout: 15000 },
  ).catch(() => {});
  const jalkeen = await ajo.sivu.evaluate(
    () => document.querySelectorAll('.fokusvirta-isokuva-ruutu').length,
  );
  vaadi('isoisän kuva tulee heti lykätyn luennan alettua', jalkeen > 0, `ruutuja ${jalkeen}`);
  await ajo.ctx.close();
}

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
