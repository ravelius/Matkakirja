/*
 * Tarkistaa maapillerin: jokaisen maan nimi renderöityy kartan
 * kehyksen pilleriin ja kosketuskohde on täydet 44 px — myös kapealla
 * puhelinruudulla. Lisäksi vartioi, ettei mikään piirrä kylttiä
 * takaisin kartalle.
 *
 * HISTORIA. Työkalu syntyi mittaamaan kartalle piirretyn maakyltin
 * ("KREIKKA ⓘ") törmäyksiä kaupunkien nimiin: Euroopan 29 maasta
 * 15:llä nimi peitti kylttiä (9.8.2026). Fable maxin analyysi
 * (10.8.2026) osoitti, ettei asettelu voi koskaan riittää — kyltin
 * geometria on kiinteä laudan yksiköissä, joten peitto on
 * zoom-invarianttia — ja kyltti muutti kartan kehykselle HTML-
 * pilleriksi (ui.js paivitaMaaPilleri). Vanha törmäysmittaus poistui
 * sen mukana; maiden keskus-ankkurit JÄÄVÄT datana maatiedot- ja
 * vertailukäyttöön, eikä niitä pidä poistaa.
 *
 * Mitä tarkistetaan (virhe → exit 1):
 *   a) joka maalle: pilleri renderöityy, nimi täsmää ja
 *      napin korkeus on ≥ 44 px — sekä 1280 px:n että 390 px:n
 *      viewportilla (kapein tuettu puhelin);
 *   b) regressiovahti: countryNameLayer pysyy perustilassa tyhjänä —
 *      mikään ei piirrä kylttiä takaisin kartalle.
 *
 * Käyttö:
 *   node tools/tarkista-maakyltit.mjs            # europe + middleeast
 *   node tools/tarkista-maakyltit.mjs africa     # yksi lauta
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TYYPIT = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg', '.webmanifest': 'application/manifest+json',
};

const argumentit = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const LAUDAT = argumentit.length ? argumentit : ['europe', 'middleeast'];
const VIEWPORTIT = [
  { width: 1280, height: 900 },
  { width: 390, height: 740 },
];

const palvelin = createServer(async (pyynto, vastaus) => {
  try {
    const polku = decodeURIComponent((pyynto.url ?? '/').split('?')[0]);
    const tiedosto = resolve(JUURI, `.${normalize(polku === '/' ? '/index.html' : polku)}`);
    if (!tiedosto.startsWith(JUURI)) { vastaus.writeHead(403).end(); return; }
    const data = await readFile(tiedosto);
    vastaus.writeHead(200, { 'content-type': TYYPIT[extname(tiedosto)] ?? 'application/octet-stream' });
    vastaus.end(data);
  } catch {
    vastaus.writeHead(404).end();
  }
});
await new Promise((valmis) => palvelin.listen(0, '127.0.0.1', valmis));
const portti = palvelin.address().port;

const paketti = await import('/opt/node22/lib/node_modules/playwright/index.js');
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

let virheita = 0;
for (const lauta of LAUDAT) {
  for (const viewport of VIEWPORTIT) {
    const konteksti = await selain.newContext({ viewport });
    const sivu = await konteksti.newPage();
    await sivu.goto(`http://127.0.0.1:${portti}/?lauta=${lauta}`, { waitUntil: 'load' });
    await sivu.waitForFunction(() => window.matkakirja?.ui);
    await sivu.waitForTimeout(1000);

    const tulos = await sivu.evaluate(() => {
      const { ui, game } = window.matkakirja;
      const map = game.pack.map;
      /*
       * Maat luetaan countryShapesista, EI cityCountrysta: kaupungiton
       * maa (Bahrain) jäisi muuten tarkistamatta sanomatta mitään.
       */
      const isot = Object.keys(map.countryShapes ?? {});
      const viat = [];
      // b) perustila: kartalla ei saa olla kylttiä.
      const kartalla = ui.countryNameLayer?.childElementCount ?? 0;
      if (kartalla > 0) viat.push(`countryNameLayer ei ole tyhjä perustilassa (${kartalla} elementtiä)`);
      for (const iso of isot) {
        const maa = map.countryShapes?.[iso];
        ui.paivitaMaaPilleri(maa, iso);
        const nappi = document.querySelector('.maa-pilleri');
        if (!nappi || nappi.hidden) { viat.push(`${iso} ${maa.nimi}: pilleri ei renderöidy`); continue; }
        const nimi = nappi.querySelector('.maa-pilleri-nimi')?.textContent;
        if (nimi !== maa.nimi) viat.push(`${iso}: nimi "${nimi}" ≠ "${maa.nimi}"`);
        const r = nappi.getBoundingClientRect();
        if (r.height < 44) viat.push(`${iso} ${maa.nimi}: korkeus ${r.height.toFixed(1)} px < 44 px`);
        if (r.width > document.documentElement.clientWidth) {
          viat.push(`${iso} ${maa.nimi}: pilleri ei mahdu ruutuun (${r.width.toFixed(0)} px)`);
        }
      }
      ui.paivitaMaaPilleri(null, null);
      return { maita: isot.length, viat };
    });

    console.log(`=== ${lauta} @ ${viewport.width}px: ${tulos.maita} maata, ${tulos.viat.length ? 'VIKOJA:' : 'kunnossa'}`);
    for (const vika of tulos.viat) console.log(`  ${vika}`);
    virheita += tulos.viat.length;
    await konteksti.close();
  }
}

await selain.close();
palvelin.close();
if (virheita) console.log(`\n${virheita} vikaa — korjaa ennen julkaisua.`);
process.exitCode = virheita ? 1 : 0;
