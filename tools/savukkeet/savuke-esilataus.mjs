/*
 * Savuke: kuvakarusellin kuvat esiladataan taustalla heti (omistajan
 * tilaus 14.8.2026). Vartiot:
 *  1. Nähtävyysjutun karuselli: kaikki sarjan kuvat pyydetään
 *     verkosta heti, ilman että nuolia painetaan.
 *  2. Kulttuurikuvien katselin (teokset-sarja): kaikkien teosten
 *     suurennokset pyydetään heti.
 *  3. Sama sarja uudelleen ei aiheuta uusia esilatauspyyntöjä
 *     (kirjanpito muistaa jo pyydetyt).
 */
import { chromium } from '../../node_modules/playwright/index.mjs';
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const JUURI = new URL('../..', import.meta.url).pathname;
const TYYPIT = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const palvelin = http.createServer((req, res) => {
  const polku = join(JUURI, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
  if (!existsSync(polku)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYYPIT[extname(polku)] ?? 'application/octet-stream' });
  res.end(readFileSync(polku));
});
await new Promise((ok) => palvelin.listen(0, ok));

let lapi = 0; let kaikki = 0;
const vaadi = (nimi, ehto, lisa = '') => { kaikki += 1; if (ehto) { lapi += 1; console.log(`OK    ${nimi}`); } else console.log(`FAIL  ${nimi} — ${lisa}`); };

const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const sivu = await (await selain.newContext({ viewport: { width: 834, height: 1194 } })).newPage();
const pyynnot = [];
sivu.on('request', (r) => pyynnot.push(r.url()));
await sivu.goto(`http://localhost:${palvelin.address().port}/`, { waitUntil: 'load' });
await sivu.waitForTimeout(1500);

// 1. Nähtävyyskaruselli synteettisillä kuvilla: rakennetaan kehys ja
// tarkistetaan, että jokainen sarjan kuva pyydettiin ilman selausta.
const merkki = 'ESILATAUSKOE';
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  const kuvat = [1, 2, 3].map((i) => ({ tiedosto: `${m}-nahtavyys-${i}.jpg`, selite: `koe ${i}` }));
  document.body.appendChild(ui.nahtavyydenKaruselli(kuvat));
}, merkki);
await sivu.waitForTimeout(800);
// Peiliputki (R2) kirjoittaa tiedostonimen pienellä — vertailu
// kirjainkoosta riippumatta.
const pyydettiin = (pala) => pyynnot.some((u) => u.toLowerCase().includes(pala.toLowerCase()));
const nahtavyysPyynnot = [1, 2, 3].map((i) => pyydettiin(`${merkki}-nahtavyys-${i}`));
vaadi('nähtävyyskarusellin kaikki kuvat pyydetään heti ilman selausta',
  nahtavyysPyynnot.every(Boolean), JSON.stringify(nahtavyysPyynnot));

// 1b. LEHDEN SIVULLA pyörivä nostogalleria (omistajan tarkennus:
// "jos kuvakalleria pyörii suoraan lehden sivulla") — koko sarja
// pyydetään heti ilman nuolia.
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  const kuva = document.createElement('img');
  document.body.appendChild(kuva);
  ui.kaariNostoGalleria(kuva, {
    otsikko: 'Koe',
    tiedosto: `${m}-nosto-1.jpg`,
    galleria: [2, 3].map((i) => ({ otsikko: `Koe ${i}`, tiedosto: `${m}-nosto-${i}.jpg` })),
  });
}, merkki);
await sivu.waitForTimeout(800);
const nostoPyynnot = [1, 2, 3].map((i) => pyydettiin(`${merkki}-nosto-${i}`));
vaadi('lehtisivun nostogallerian kaikki kuvat pyydetään heti',
  nostoPyynnot.every(Boolean), JSON.stringify(nostoPyynnot));

// 2. Kulttuurikatselimen sarja: kaikkien teosten suurennokset heti.
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  const teokset = [1, 2, 3].map((i) => ({ tiedosto: `${m}-teos-${i}.jpg`, otsikko: `Teos ${i}` }));
  ui.naytaKulttuuriKuva(teokset[0], { teokset, kohdalla: 0 });
}, merkki);
await sivu.waitForTimeout(800);
const teosPyynnot = [1, 2, 3].map((i) => pyydettiin(`${merkki}-teos-${i}`));
vaadi('katselimen kaikkien teosten suurennokset pyydetään heti',
  teosPyynnot.every(Boolean), JSON.stringify(teosPyynnot));

// 3. Sama sarja uudelleen: esilatauskirjanpito ei pyydä samoja osoitteita
// toista kertaa. (Näytettävän kuvan oma pyyntö sallitaan — vain
// esilatausten tuplat lasketaan: pyyntöjä per osoite enintään 2.)
const ennen = pyynnot.length;
await sivu.evaluate((m) => {
  const { ui } = window.matkakirja;
  ui.suljeKulttuuriKuva();
  const kuvat = [1, 2, 3].map((i) => ({ tiedosto: `${m}-nahtavyys-${i}.jpg`, selite: `koe ${i}` }));
  document.body.appendChild(ui.nahtavyydenKaruselli(kuvat));
}, merkki);
await sivu.waitForTimeout(600);
const uudet = pyynnot.slice(ennen)
  .filter((u) => u.toLowerCase().includes(`${merkki.toLowerCase()}-nahtavyys`));
// Uusi karuselli näyttää ensimmäisen kuvan (oma pyyntö sallittu), mutta
// esilatauksia ei toisteta — uusia pyyntöjä siis alle kolme.
vaadi('esilatauksia ei toisteta samalle sarjalle', uudet.length < 3,
  JSON.stringify(uudet));

// 4. Lightbox mitoittuu MITATUSTA näkymästä pikseleinä, ei vw:stä
// (iPadin jumiutunut viewportti rajasi wikin kuvat iPhonen kokoon).
const lightbox = await sivu.evaluate(async () => {
  const { ui } = window.matkakirja;
  await ui.openLightbox(null, '', 'assets/logo.png');
  const img = document.querySelector('.lightbox-img');
  const tulos = {
    maxWidth: img?.style.maxWidth ?? '',
    odotus: Math.round((ui.nakymanLeveys || ui.mittaaNakyma()) * 0.94),
  };
  document.querySelector('.lightbox')?.remove();
  return tulos;
});
vaadi('lightbox mitoittuu mitatusta näkymästä pikseleinä',
  lightbox.maxWidth === `${lightbox.odotus}px`, JSON.stringify(lightbox));

await selain.close();
palvelin.close();
console.log(`\n${lapi}/${kaikki} läpi.`);
process.exit(lapi === kaikki ? 0 : 1);
