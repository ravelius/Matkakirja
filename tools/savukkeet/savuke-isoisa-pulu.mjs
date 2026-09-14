/*
 * Savuke: ISOISÄN JA PULUN KUVAT KAUPUNGIN YLÄPUOLELLA.
 *
 * Omistaja 14.9.2026 (Raamattu PAATOKSET 12, kohta 2, sanatarkasti):
 * *"isoisan ja pulun kuvat ovat liian pienella ja vaarassa paikassa
 * (pitaisi olla hieman pariisin ylapuolella)."*
 *
 * Mitattu ennen korjausta (Chromium, 390 × 844, Pariisi): isoisän
 * pienennetty luentakuva 17,0 × 31,0 px kaupungista +48 oikealle ja
 * +7 ALAS, pulun kelluva nappi 48 × 48 px karttaruudun oikeassa
 * alanurkassa — kumpikaan ei ollut kaupungin yläpuolella.
 *
 * VARTIOT (kolme kaupunkia × kaksi ruutua):
 *   1. Isoisän pieni kuva on kaupungin YLÄPUOLELLA (alareuna kaupungin
 *      pisteen yläpuolella).
 *   2. Isoisän pieni kuva on vähintään ISOISAN_VAHIN_PX korkea.
 *   3. Pulun nappi on kaupungin YLÄPUOLELLA isoisän kuvan vieressä
 *      (sama korkeus, oikealla puolella).
 *   4. Kumpikaan ei peitä kaupungin nimikylttiä eikä turisti-info-merkkiä
 *      (päällekkäisyys 0 px²).
 *   5. Pulun napautus avaa chatin kuten ennenkin.
 *
 * Aja:  PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
 *         node tools/savukkeet/savuke-isoisa-pulu.mjs [kuvakansio]
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

/** Pienin hyväksyttävä isoisän kuvan korkeus css-pikseleinä. */
const ISOISAN_VAHIN_PX = 24;

const KAUPUNGIT = ['pariisi', 'marseille', 'ateena'];
const RUUDUT = [
  { nimi: 'puhelin', width: 390, height: 844 },
  { nimi: 'tyopoyta', width: 1400, height: 900 },
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

/**
 * Pieni kuva ruudulle ja pienennettynä — ja varmistus, että se on yhä
 * siellä. Saapumisvirta voi viedä paneelin kesken kaiken (luennan
 * kello, sarjan purku), joten tätä kutsutaan sekä saavuttaessa että
 * juuri ennen mittaa.
 */
async function varmistaPieniKuva(sivu) {
  for (let yritys = 0; yritys < 8; yritys += 1) {
    await sivu.evaluate(async () => {
      const { ui, game } = window.matkakirja;
      const m = await import('/js/fokusvirta.js');
      const city = game.cityOf();
      if (!ui.luentakuva?.isConnected) {
        m.piilotaLuentakuva(ui, { heti: true });
        m.naytaLuentakuva(ui, city);
      }
      m.pienennaLuentakuva(ui);
    });
    await sivu.waitForTimeout(1200);
    const valmis = await sivu.evaluate(
      () => Boolean(document.querySelector('.fokusvirta-luentakuva.pieni')),
    );
    if (valmis) break;
  }
  return sivu.evaluate(() => Boolean(document.querySelector('.fokusvirta-luentakuva.pieni')));
}

/** Avaa pelin ja saapuu kaupunkiin; palauttaa sivun apureineen. */
async function avaaAjo(viewport, kaupunki) {
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
  await sivu.evaluate((id) => {
    const { ui, game } = window.matkakirja;
    game.player.pos = { type: 'city', city: id };
    game.world.visited.add(id);
    game.arrivalFact = { packId: game.pack.id, cityId: id };
    ui.render();
  }, kaupunki);
  // Luentakuva esiin ja PIENEKSI — juuri se tila, jota omistaja katsoi.
  await sivu.waitForTimeout(2500);
  /*
   * KAMERA ASETTUU ENSIN. Pieni kuva on kartan kokoinen
   * (--luentakuva-karttaskaala), joten kesken saapumislennon otettu
   * mitta kertoo lennon vaiheesta eikä kuvan koosta.
   */
  await sivu.waitForFunction(() => {
    const nyt = window.matkakirja?.ui?.nakyvaAlue?.()?.skaala ?? 0;
    const edellinen = window.__skaala ?? 0;
    window.__skaala = nyt;
    return nyt > 0 && Math.abs(nyt - edellinen) < nyt * 0.002;
  }, null, { timeout: 60000, polling: 500 }).catch(() => {});
  await varmistaPieniKuva(sivu);
  return { ctx, sivu, cdp };
}

/** Kaikki mitat yhdessä evaluaatiossa. */
const MITTAA = () => {
  const laatikko = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!(r.width > 0) || !(r.height > 0)) return null;
    return {
      x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
    };
  };
  const { ui, game } = window.matkakirja;
  const city = game.cityOf();
  const lauta = ui.pallolauta;
  const asteet = lauta?.asteet?.({ x: city.x, y: city.y });
  const p = asteet ? lauta.pallo.getScreenCoords(asteet.lat, asteet.lon, 0) : null;
  const pane = ui.mapPane ?? document.querySelector('.map-pane');
  const pr = pane?.getBoundingClientRect?.() ?? { left: 0, top: 0 };
  // Kaupungin piste RUUDUN koordinaateiksi (pulun nappi on fixed).
  const kaupunki = p ? { x: +(p.x + pr.left).toFixed(1), y: +(p.y + pr.top).toFixed(1) } : null;
  // Kyltin ja merkin oma piirtolaatikko, ei CSS2D-kääre: kääre on
  // nollan kokoinen piste ja peittymistä mitattaisiin tyhjästä.
  const nimi = [...document.querySelectorAll('.karttanimi-kaupunki')]
    .find((el) => (el.textContent ?? '').trim().toLowerCase() === city.name.toLowerCase());
  return {
    kaupunki,
    isoisa: laatikko(document.querySelector('.fokusvirta-luentakuva.pieni')),
    // VALOKUVA erikseen: paneelin laatikossa on myös läpinäkyvä
    // kuvatekstilappu, ja luvattu korkeus koskee sitä, minkä pelaaja näkee.
    kuva: laatikko(document.querySelector('.fokusvirta-luentakuva.pieni img')),
    pulu: laatikko(document.querySelector('.pollo-nappi.pollo-kelluu')),
    nimikyltti: laatikko(nimi),
    turisti: laatikko(document.querySelector('.pallolauta-turisti-info svg')),
    nappula: laatikko(document.querySelector('.pallolauta-nappula')),
  };
};

/** Kahden laatikon päällekkäinen pinta-ala (px²). */
const paallekkain = (a, b) => {
  if (!a || !b) return 0;
  const w = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
  const h = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  return +(w * h).toFixed(1);
};

for (const ruutu of RUUDUT) {
  for (const kaupunki of KAUPUNGIT) {
    const { ctx, sivu, cdp } = await avaaAjo(
      { width: ruutu.width, height: ruutu.height }, kaupunki,
    );
    /*
     * KARTTASKAALA ASETTUU ENNEN MITTAA. Pieni kuva on kartan kokoinen
     * (`--luentakuva-karttaskaala` = nykyinen skaala / se skaala, jolla
     * kuva nousi), ja savuke ajaa kameraa käsin: jos kamera liikkuu
     * kuvan nousun JÄLKEEN, mitta kertoo kameran liikkeestä eikä kuvan
     * koosta. Odotetaan skaalan palautuminen ykkösen tuntumaan; jos se
     * ei palaa, vertailukohta asetetaan nykyiseen näkymään ja asia
     * kirjataan — mitta on silloin yhä kuvan oma koko.
     */
    const nousi = await varmistaPieniKuva(sivu);
    if (!nousi) console.log(`HUOM  ${ruutu.nimi}/${kaupunki}: pieni kuva ei noussut`);
    await sivu.waitForFunction(() => {
      const arvo = Number.parseFloat(window.matkakirja?.ui?.luentakuvaAnkkuri
        ?.solmu?.style?.getPropertyValue('--luentakuva-karttaskaala') ?? '0');
      return arvo >= 0.9 && arvo <= 1.1;
    }, null, { timeout: 15000, polling: 300 }).catch(async () => {
      console.log(`HUOM  ${ruutu.nimi}/${kaupunki}: karttaskaala ei asettunut, vertailukohta nollattu`);
      await sivu.evaluate(() => {
        const n = window.matkakirja?.ui?.luentakuvaAnkkuri;
        if (n) n.perusSkaala = window.matkakirja.ui.nakyvaAlue?.()?.skaala ?? n.perusSkaala;
      });
      await sivu.waitForTimeout(600);
    });
    const m = await sivu.evaluate(MITTAA);
    const tunnus = `${ruutu.nimi}/${kaupunki}`;
    tieto(tunnus, JSON.stringify(m));

    vaadi(`${tunnus}: isoisän kuva löytyy`, Boolean(m.isoisa && m.kaupunki),
      JSON.stringify({ isoisa: m.isoisa, kaupunki: m.kaupunki }));
    /*
     * MITTA ON VALOKUVA. Paneelin laatikossa on myös kuvatekstilappu,
     * joka on pienenä läpinäkyvä mutta varaa yhä tilaa — se ei ole
     * sitä, mitä omistaja katsoo.
     */
    if (m.kuva) m.isoisa = m.kuva;
    if (m.isoisa && m.kaupunki) {
      vaadi(`${tunnus}: isoisän kuva on kaupungin YLÄPUOLELLA`,
        m.isoisa.y + m.isoisa.h < m.kaupunki.y,
        `kuvan alareuna ${(m.isoisa.y + m.isoisa.h).toFixed(1)}, kaupunki ${m.kaupunki.y}`);
      const korkeus = m.isoisa.h;
      vaadi(`${tunnus}: isoisän kuva vähintään ${ISOISAN_VAHIN_PX} px korkea`,
        korkeus >= ISOISAN_VAHIN_PX, `${korkeus} px`);
    }
    vaadi(`${tunnus}: pulun nappi löytyy`, Boolean(m.pulu), 'ei nappia');
    if (m.pulu && m.kaupunki) {
      vaadi(`${tunnus}: pulun nappi on kaupungin YLÄPUOLELLA`,
        m.pulu.y + m.pulu.h < m.kaupunki.y,
        `napin alareuna ${(m.pulu.y + m.pulu.h).toFixed(1)}, kaupunki ${m.kaupunki.y}`);
    }
    if (m.pulu && m.isoisa) {
      vaadi(`${tunnus}: pulu on isoisän OIKEALLA puolella`,
        m.pulu.x >= m.isoisa.x + m.isoisa.w - 1,
        `pulu x ${m.pulu.x}, isoisän oikea reuna ${(m.isoisa.x + m.isoisa.w).toFixed(1)}`);
      const keskiEro = Math.abs((m.pulu.y + m.pulu.h / 2) - (m.isoisa.y + m.isoisa.h / 2));
      vaadi(`${tunnus}: pulu ja isoisä samalla korkeudella`, keskiEro <= 26,
        `keskipisteiden ero ${keskiEro.toFixed(1)} px`);
      vaadi(`${tunnus}: kuvat eivät ole päällekkäin`,
        paallekkain(m.pulu, m.isoisa) === 0, `${paallekkain(m.pulu, m.isoisa)} px²`);
    }
    for (const [nimi, laatikko] of [['nimikyltti', m.nimikyltti], ['turisti-info', m.turisti]]) {
      if (!laatikko) { tieto(`${tunnus}: ${nimi} ei ruudulla`, 'ohitettu'); continue; }
      vaadi(`${tunnus}: isoisän kuva ei peitä ${nimi}ä`,
        paallekkain(m.isoisa, laatikko) === 0, `${paallekkain(m.isoisa, laatikko)} px²`);
      vaadi(`${tunnus}: pulun nappi ei peitä ${nimi}ä`,
        paallekkain(m.pulu, laatikko) === 0, `${paallekkain(m.pulu, laatikko)} px²`);
    }

    // 5. Pulun napautus avaa chatin (vain Pariisi, molemmat ruudut).
    if (kaupunki === 'pariisi') {
      const auki = await sivu.evaluate(async () => {
        const nappi = document.querySelector('.pollo-nappi.pollo-kelluu');
        nappi?.click();
        await new Promise((ok) => setTimeout(ok, 700));
        const paneeli = document.querySelector('.pollo-paneeli');
        return Boolean(paneeli && !paneeli.hidden
          && paneeli.getBoundingClientRect().height > 0);
      });
      vaadi(`${tunnus}: pulun napautus avaa chatin`, auki === true, 'paneeli ei auennut');
    }

    if (KUVAKANSIO && kaupunki === 'pariisi') {
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
      writeFileSync(join(KUVAKANSIO, `isoisa-pulu-${ruutu.nimi}.jpg`), Buffer.from(data, 'base64'));
    }
    await ctx.close();
  }
}

vaadi('sivulla ei ole JS-virheitä', virheet.length === 0, virheet.slice(0, 3).join(' | '));

console.log(`\n${lapi}/${kaikki} vartiota läpi.`);
await selain.close();
await new Promise((ok) => palvelin.close(ok));
process.exit(lapi === kaikki ? 0 : 1);
