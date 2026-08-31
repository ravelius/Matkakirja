/*
 * MITTA: kaupungin karttanostot, nippusarake ja yhdysviivat.
 *
 * Ei savuke vaan MITTANAUHA: tämä ei väitä mitään, vaan tulostaa luvut,
 * joilla kategoria per kaupunki -muutoksen (js/fokusryhmat.js) ennen ja
 * jälkeen voi verrata samasta näkymästä. Ajetaan sekä mainista että
 * haarasta, ja tulokset luetaan rinnakkain.
 *
 * Käyttö:  node tools/savukkeet/mittaa-niput.mjs [kaupunki,...] [kansio]
 * Oletus:  ateena,rooma,dubrovnik  → tools/savukkeet/kaappaukset/
 */
import http from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import { Game } from '../../js/game.js';
import { packById } from '../../js/pack.js';
import { FOKUS_POHJAT } from '../../js/packs/fokus-grc.js';

const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;

const JUURI = new URL('../..', import.meta.url).pathname;
const KAUPUNGIT = (process.argv[2] ?? 'ateena,rooma,dubrovnik').split(',');
const KANSIO = process.argv[3] ?? join(JUURI, 'tools/savukkeet/kaappaukset');
mkdirSync(KANSIO, { recursive: true });

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp',
};
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));
const osoite = `http://localhost:${palvelin.address().port}/`;

const PIKSELI = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function avaaKaupunki(cityId, viewport) {
  const peli = new Game({
    players: [{ name: 'Fogg', color: '#c9a227', start: cityId }],
    pack: packById('maailmankartta'),
    seed: 11,
  });
  peli.tokens.set(cityId, 'topaz');
  peli.revealed.delete(cityId);
  peli.phase = 'action';
  const ctx = await selain.newContext({ viewport, reducedMotion: 'reduce' });
  await ctx.addInitScript((data) => {
    try {
      localStorage.setItem('matkakirja-save-v1', data);
      localStorage.removeItem('matkakirja-fokusmoodi');
    } catch { /* yksityinen tila */ }
  }, JSON.stringify(peli.toJSON()));
  const sivu = await ctx.newPage();
  await sivu.route(/r2\.dev|wikimedia\.org/, (route) => route.fulfill({
    status: 200, contentType: 'image/png', body: PIKSELI,
  }));
  await sivu.route('**samireivinen.workers.dev/**', (route) => route.abort());
  await sivu.goto(osoite, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sivu.waitForFunction(() => window.matkakirja?.ui?.svg, null, { timeout: 60000 });
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 60000 }).catch(() => {});
  /*
   * KAMERA LEHDEN PERUSTASOLLE — sama ajo ja sama perustelu kuin
   * savuke-fokuskohteet.mjs ajaLehdelle(): sivun lataus kesken pelin ei
   * aja kameraa, joten ilman tätä mitattaisiin yleiskuvaa, jossa merkit
   * ovat piilossa eikä yhdysviivoja piirretä lainkaan.
   */
  const iso = peli.pack.map.cityCountry?.[cityId];
  await sivu.evaluate((varakohde) => {
    const ui = window.matkakirja.ui;
    ui.kartta.ajaKamera({
      bbox: ui.fokusPohjaRajaus ?? ui.fokusPohjaBbox ?? varakohde, marginaali: 0,
    });
  }, FOKUS_POHJAT[iso]?.rajaus ?? null);
  await sivu.waitForTimeout(4200);
  await sivu.waitForFunction(() => Boolean(window.matkakirja.ui.fokusPohjaBbox),
    null, { timeout: 30000 }).catch(() => {});
  return { ctx, sivu };
}

/* Kartan tila laudan yksiköissä — sama lähde kuin kasauspassilla. */
const mittaa = (sivu) => sivu.evaluate(() => {
  const ui = window.matkakirja.ui;
  const city = ui.game.cityOf();
  const ryhmat = ui.fokuskohdeRyhmat ?? [];
  // Vain vasemmanpuoleinen kopio: kiertävä lauta piirtää jokaisen kahdesti.
  const omat = ryhmat.filter((r) => Math.abs(r.x - city.x) < 6000);
  const viivat = [...document.querySelectorAll('.nippuviivat line')].map((v) => Math.hypot(
    Number(v.getAttribute('x2')) - Number(v.getAttribute('x1')),
    Number(v.getAttribute('y2')) - Number(v.getAttribute('y1')),
  ));
  const nipussa = omat.filter((r) => r.nippu);
  return {
    kaupunki: city.name,
    merkkeja: new Set(ryhmat.map((r) => r.id)).size,
    tunnukset: [...new Set(ryhmat.map((r) => r.id))],
    nipussa: nipussa.length,
    nipunTunnukset: nipussa.map((r) => r.id),
    sarakkeenKorkeus: nipussa.length > 1
      ? Math.max(...nipussa.map((r) => r.nippu.y)) - Math.min(...nipussa.map((r) => r.nippu.y))
      : 0,
    viivoja: viivat.length,
    pisinViiva: viivat.length ? Math.max(...viivat) : 0,
    lyhinViiva: viivat.length ? Math.min(...viivat) : 0,
    viivatYhteensa: viivat.reduce((a, b) => a + b, 0),
    piilossa: Boolean(document.querySelector('.fokuskohteet')?.classList.contains('fokuskohteet-piilossa')),
    osuus: ui.fokusPohjaBbox && ui.nakyvaAlue ? ui.fokusPohjaBbox.w / ui.nakyvaAlue().w : null,
    kerros: Boolean(document.querySelector('.nippuviivat')),
  };
});

for (const cityId of KAUPUNGIT) {
  for (const [nimi, viewport] of [
    ['ipad', { width: 834, height: 1112 }],
    ['iphone', { width: 390, height: 844 }],
  ]) {
    const { ctx, sivu } = await avaaKaupunki(cityId, viewport);
    await sivu.waitForTimeout(3000);
    /*
     * SAAPUMISEN KOHTAAMISKUPLA POIS ENNEN KAAPPAUSTA: se peittää
     * kartasta juuri sen puolen, jolla nippusarake on.
     */
    await sivu.evaluate(() => {
      for (const kupla of document.querySelectorAll(
        '.fokusvirta-kupla, .fokusvirta-kortti, .fokuskohde-popup',
      )) kupla.remove();
    }).catch(() => {});
    await sivu.waitForTimeout(600);
    const tulos = await mittaa(sivu);
    console.log(`${cityId}/${nimi} ${JSON.stringify(tulos)}`);
    await sivu.screenshot({ path: join(KANSIO, `niput-${cityId}-${nimi}.png`) });
    /*
     * LÄHIKUVA RYPPÄÄSTÄ. Koko ruudun kaappauksessa sarake on parinsadan
     * pikselin läiskä; rajattu kuva on se, josta ennen ja jälkeen
     * oikeasti näkee toisistaan eron. Rajaus lasketaan nipun merkkien
     * omista ruutupaikoista, joten se osuu samaan kohtaan kummassakin.
     */
    const rajaus = await sivu.evaluate(() => {
      const merkit = [...document.querySelectorAll('.fokuskohde-osuma')]
        .map((m) => m.getBoundingClientRect())
        .filter((r) => r.width > 0 && r.left > -200 && r.left < innerWidth + 200);
      const laatta = document.querySelector('.fokuslaatta-osuma')?.getBoundingClientRect();
      if (!laatta) return null;
      const lahella = merkit.filter((r) => Math.hypot(
        r.left - laatta.left, r.top - laatta.top,
      ) < 150);
      const kaikki = [laatta, ...lahella];
      const x = Math.min(...kaikki.map((r) => r.left)) - 90;
      const y = Math.min(...kaikki.map((r) => r.top)) - 70;
      const x2 = Math.max(...kaikki.map((r) => r.right)) + 160;
      const y2 = Math.max(...kaikki.map((r) => r.bottom)) + 70;
      return {
        x: Math.max(0, Math.round(x)),
        y: Math.max(0, Math.round(y)),
        width: Math.round(Math.min(innerWidth, x2) - Math.max(0, x)),
        height: Math.round(Math.min(innerHeight, y2) - Math.max(0, y)),
      };
    });
    /*
     * YHDISTETYN MERKIN LEHTI KUVAKSI (MERKKI=<tunnus>): sarakkeen
     * lyheneminen näkyy kartalta, mutta se, ETTEI SISÄLTÖ NIPUTU,
     * näkyy vain avatusta kortista.
     */
    if (process.env.MERKKI) {
      const kohta = await sivu.evaluate((id) => {
        const merkki = [...document.querySelectorAll(`.fokuskohde[data-kohde="${id}"]`)]
          .map((g) => g.querySelector('.fokuskohde-osuma').getBoundingClientRect())
          .filter((r) => r.width > 0 && r.left > 0 && r.right < innerWidth)[0];
        return merkki ? { x: merkki.left + merkki.width / 2, y: merkki.top + merkki.height / 2 } : null;
      }, process.env.MERKKI);
      if (kohta) {
        await sivu.mouse.click(kohta.x, kohta.y);
        await sivu.waitForTimeout(900);
        const kortti = await sivu.$('.fokuskohde-popup');
        if (kortti) {
          await kortti.screenshot({
            path: join(KANSIO, `niput-${cityId}-${nimi}-lehti.png`),
          });
        }
        await sivu.keyboard.press('Escape');
        await sivu.waitForTimeout(300);
      }
    }
    if (rajaus?.width > 40 && rajaus?.height > 40) {
      await sivu.screenshot({
        path: join(KANSIO, `niput-${cityId}-${nimi}-lahikuva.png`), clip: rajaus,
      });
    }
    await ctx.close();
  }
}

await selain.close();
palvelin.close();
