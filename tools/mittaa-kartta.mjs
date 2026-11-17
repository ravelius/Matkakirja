/*
 * Mittaa kartan raskauden: montako elementtiä laudalla on, kauanko
 * ensimmäinen piirto kestää ja kuinka sujuvasti panorointi kulkee.
 *
 *   node tools/mittaa-kartta.mjs vanhamaailma europe
 *
 * Tämä on olemassa siksi, ettei hitauden syytä tarvitse arvata.
 * Vaihtoehtoja on monta — elementtien määrä, suodattimet, ruudun
 * ulkopuolelle jäävä osa — ja ne vaativat eri korjaukset.
 */
import { avaaSelain } from './mittaa-selaimessa.mjs';
import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const laudat = process.argv.slice(2);
if (!laudat.length) laudat.push('vanhamaailma', 'europe');

const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
};

const palvelin = createServer((req, res) => {
  const polku = join(JUURI, decodeURIComponent(req.url.split('?')[0]).replace(/^\//, '') || 'pelaa.html');
  if (!existsSync(polku) || !polku.startsWith(JUURI)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'text/plain' });
  res.end(readFileSync(polku));
});
await new Promise((valmis) => palvelin.listen(0, valmis));
const osoite = `http://127.0.0.1:${palvelin.address().port}`;

const { sivu, sulje } = await avaaSelain();
await sivu.setViewportSize({ width: 420, height: 860 });

for (const lauta of laudat) {
  await sivu.goto(`${osoite}/?lauta=${lauta}`, { waitUntil: 'load' });
  // Peli alkaa valikosta; napautetaan yksinpeli käyntiin.
  await sivu.waitForTimeout(400);
  const aloita = sivu.locator('button', { hasText: /Aloita|Pelaa|Yksin/ }).first();
  if (await aloita.count()) { await aloita.click().catch(() => {}); }
  await sivu.waitForTimeout(2500);

  const tulos = await sivu.evaluate(() => {
    const svg = document.getElementById('board');
    if (!svg) return { virhe: 'karttaa ei löydy' };
    const kaikki = svg.querySelectorAll('*').length;
    const laske = (v) => svg.querySelectorAll(v).length;
    const suodatetut = [...svg.querySelectorAll('[filter]')].length;
    const laatikko = svg.getBoundingClientRect();
    return {
      elementteja: kaikki,
      polkuja: laske('path'),
      viivoja: laske('line'),
      ympyroita: laske('circle'),
      teksteja: laske('text'),
      suodatetut,
      leveysPx: Math.round(laatikko.width),
      korkeusPx: Math.round(laatikko.height),
      ruutuPx: window.innerWidth,
    };
  });

  // Panoroinnin sujuvuus: siirretään karttaa ja katsotaan paljonko
  // yksi siirto maksaa. Mitataan selaimen sisällä, jotta luku vastaa
  // sitä mitä sormi tuntee.
  const panorointi = await sivu.evaluate(async () => {
    const svg = document.getElementById('board');
    if (!svg) return null;
    const ajat = [];
    for (let i = 0; i < 30; i++) {
      const alku = performance.now();
      svg.style.transform = `translate3d(${-i * 12}px, 0, 0)`;
      await new Promise((r) => requestAnimationFrame(() => r()));
      ajat.push(performance.now() - alku);
    }
    ajat.sort((a, b) => a - b);
    return {
      mediaani: Math.round(ajat[Math.floor(ajat.length / 2)] * 10) / 10,
      pahin: Math.round(ajat[ajat.length - 1] * 10) / 10,
    };
  });

  console.log(`\n=== ${lauta} ===`);
  console.log(tulos);
  console.log('panorointi (ms/kehys):', panorointi);
}

await sulje();
palvelin.close();
