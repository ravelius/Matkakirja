// Kuvaa yhden maalehden aihesivut selaimessa ja RAPORTOI, montako kuvaa
// oikeasti latautui. Kaksi ehtoa, joita ilman tulos ei todista mitään:
//   1) serviceWorkers: 'block' — muuten sw sieppaa kuvapyynnöt,
//   2) page.route -koukku, joka hakee Commons-kuvat Nodella proxyn läpi.
//
//   node kuvaa-maalehti.mjs IRN ruoka kasityo

import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = process.env.KAAPPAUSKANSIO ?? '/tmp/matkakirja-kaappaukset';
const [maa, ...sivut] = process.argv.slice(2);
mkdirSync(ULOS, { recursive: true });

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp3': 'audio/mpeg',
};
const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  if (!existsSync(polku) || polku.endsWith('/')) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': MIME[extname(polku)] || 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((r) => palvelin.listen(8731, r));

const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const ctx = await selain.newContext({
  viewport: { width: 390, height: 900 }, serviceWorkers: 'block',
});
const sivu = await ctx.newPage();

let haettu = 0; let epaonnistui = 0;
// Kuvat tulevat kolmea reittiä (paikallinen kopio, R2-peili, Commons),
// joten koukun on katettava KAIKKI ulkopuoliset osoitteet — pelkkä
// commons.wikimedia.org jätti jokaisen kuvan lataamatta ja mittari
// näytti silti "0 pyyntöä".
await sivu.route((url) => !/127\.0\.0\.1|localhost/.test(url.href), async (route) => {
  try {
    const buf = execFileSync('curl', ['-sSL', '--max-time', '45', '-A',
      'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)', route.request().url()],
    { maxBuffer: 6e7 });
    // ÄLÄ tarjoile virhesivua kuvana. Peilistä puuttuva kuva palauttaa
    // HTML- tai XML-virheen; jos sen läpäisee content-type image/jpeg
    // -otsakkeella, selain ei koskaan laukaise onerroria eikä pelin oma
    // varareitti Commonsiin pääse ajoon — mittari näyttää silloin
    // "rikki 4" tilanteessa, jossa peli itse toimisi oikein.
    const kuva = buf.length > 100 && (buf[0] === 0xff || buf[0] === 0x89
      || buf.slice(0, 4).toString() === 'RIFF' || buf.slice(0, 5).toString() === '<?xml');
    if (!kuva) { epaonnistui += 1; await route.abort(); return; }
    haettu += 1;
    await route.fulfill({ status: 200, body: buf, headers: { 'content-type': 'image/jpeg' } });
  } catch {
    epaonnistui += 1;
    await route.abort();
  }
});

const virheet = [];
sivu.on('pageerror', (e) => virheet.push(String(e)));

await sivu.goto('http://127.0.0.1:8731/index.html?lauta=middleeast', { waitUntil: 'load' });
// Peli on oltava käynnissä ennen kuin lehtinäkymä on olemassa.
// ?lauta=-parametri käynnistää pelin nykyään suoraan (katselutila),
// jolloin aloitusnappia ei tule lainkaan — odotetaan siis joko nappia
// TAI käynnissä olevaa peliä, ja napin puute ilman peliä on virhe.
await sivu.waitForFunction(() => Boolean(window.matkakirja?.game?.phase)
  || [...document.querySelectorAll('button')]
    .some((b) => /aloita seikkailu/i.test(b.textContent)), null, { timeout: 30000 })
  .catch(() => {});
const aloitus = await sivu.evaluate(() => {
  const n = [...document.querySelectorAll('button')]
    .find((b) => /aloita seikkailu/i.test(b.textContent));
  if (n) { n.click(); return 'napista'; }
  return window.matkakirja?.game?.phase ? 'kaynnissa' : false;
});
if (!aloitus) {
  console.log('VIRHE: peli ei käynnisty — lehteä ei voi avata.');
  process.exit(1);
}
console.log('aloitus:', aloitus);
await sivu.waitForTimeout(3000);
const tulos = await sivu.evaluate(async (iso) => {
  const ui = window.matkakirja?.ui;
  if (!ui || typeof ui.avaaMaalehti !== 'function') return { virhe: 'ui.avaaMaalehti ei löydy' };
  // Katselutilassa lauta on jo middleeast.
  if (!ui.game?.pack?.map?.countryShapes?.[iso]) {
    const pack = await import('/js/pack.js');
    const lauta = pack.PACKS.find((p) => p.map?.countryShapes?.[iso]);
    if (!lauta) return { virhe: `${iso}: ei maamuotoa millään laudalla` };
    // game.pack on getteri world.packin yli (js/game.js), joten suora
    // sijoitus ui.game.pack = lauta menee hiljaa ohi — vaihto tehdään
    // vuorossa olevan pelaajan worldiin.
    const world = ui.game.worlds?.get?.(ui.game.player?.packId) ?? ui.game.world;
    if (!world) return { virhe: 'worldia ei löydy laudanvaihtoon' };
    world.pack = lauta;
    if (!ui.game.pack?.map?.countryShapes?.[iso]) {
      return { virhe: 'laudanvaihto ei tarttunut (game.pack ennallaan)' };
    }
  }
  ui.avaaMaalehti(iso);
  return { ok: true, lauta: ui.game.pack.id, sivuja: ui.lehtitila.tutkiSivut?.length ?? 0 };
}, maa);
console.log('avaus:', JSON.stringify(tulos).slice(0, 400));
await sivu.waitForTimeout(3000);

for (const id of sivut.length ? sivut : ['']) {
  if (id) {
    const painettu = await sivu.evaluate((sid) => {
      const ui = window.matkakirja.ui;
      const i = ui.lehtitila.tutkiSivut.findIndex((s) => s.id === sid);
      if (i < 0) return ui.lehtitila.tutkiSivut.map((s) => s.id);
      ui.naytaTutkiSivu(i + 1, { heti: true }); // 0 on lehden kansi
      return { sivu: ui.lehtitila.tutkiSivut[i].id, indeksi: i };
    }, id);
    console.log('liuska', id, '→', JSON.stringify(painettu).slice(0, 200));
    await sivu.waitForTimeout(2500);
  }
  // Odota, että jokainen kuva on joko latautunut tai luovuttanut. Pelkkä
  // kiinteä odotus antoi "rikki 3" laiskasti ladatuista kuvista, jotka
  // eivät olleet vielä edes aloittaneet latausta.
  await sivu.waitForFunction(() => {
    const kuvat = [...document.querySelectorAll('.wiki-nosto img')];
    // naturalWidth > 0, EI i.complete: epäonnistuneella kuvalla complete
    // on myös true, ja mittaus ehti silloin pelin oman varareitin edelle.
    return kuvat.length > 0 && kuvat.every((i) => i.naturalWidth > 0);
  }, null, { timeout: 30000 }).catch(() => console.log('  (odotus umpeutui)'));
  const kuvat = await sivu.evaluate(() => [...document.querySelectorAll('.wiki-nosto img')]
    .map((i) => ({ src: i.currentSrc.split('/').pop().slice(-45), w: i.naturalWidth })));
  console.log(`  kuvia sivulla: ${kuvat.length}, rikki: ${kuvat.filter((k) => !k.w).length}`);
  for (const k of kuvat) console.log('   ', k.w ? 'ok ' : 'RIKKI', k.w, k.src);
  await sivu.screenshot({ path: join(ULOS, `${maa}-${id || 'lehti'}.png`), fullPage: true });
}

console.log(`# kuvapyyntöjä proxyn läpi: ${haettu}, epäonnistui: ${epaonnistui}`);
if (virheet.length) console.log('# sivuvirheet:', virheet.slice(0, 5));
await selain.close();
palvelin.close();
