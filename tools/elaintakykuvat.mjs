/*
 * ELÄINTÄKYJEN KUVAT REPOON — pienennys ja pakkaus yhdellä ajolla.
 *
 * Lähde on omistajan itse generoimat 29 eläinkuvaa (1536 x 1024 JPEG),
 * ja kortissa kuva näkyy enintään noin 34 remin levyisenä
 * (css/fokusnosto.css .fokusnosto-kortti), eli retinallakin reilusti
 * alle tuhat pikseliä. Kuvat viedään siksi 960 pikselin levyisinä —
 * sama luokka kuin kohtaamiskuvilla (512) ja aarrekuvilla (640), mutta
 * leveämpi, koska eläinkuva on vaakakuva kortin koko leveydeltä.
 *
 * PAKKAUS TEHDÄÄN CHROMIUMIN CANVASILLA (sama kaava kuin
 * tools/leikkaa-miniatyyrit.mjs): repossa ei ole sharpia eikä
 * natiivikoodattua kuvakirjastoa, ja selain on joka tapauksessa
 * asennettuna savukkeita varten.
 *
 * Käyttö:
 *   node tools/elaintakykuvat.mjs <lähdekansio> [--laatu 0.82]
 *
 * Lähdekansiossa tiedostot ovat muotoa *elain-<maatunnus>-<elain>.jpg;
 * ulos kirjoitetaan assets/elaimet/elain-<maatunnus>.jpg.
 *
 * TEKIJÄNOIKEUS: kuvat ovat omistajan omia generoituja kuvia, joten
 * niillä ei ole Commons-lähderiviä eikä CC-attribuutiota (vrt.
 * js/packs/africa-valokuvat.js valokuvat, joilla on).
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const KOHDE = resolve(JUURI, 'assets/elaimet');

const argv = process.argv.slice(2);
const lahde = argv.find((a) => !a.startsWith('--'));
const laatuArg = argv.indexOf('--laatu');
const LAATU = laatuArg >= 0 ? Number(argv[laatuArg + 1]) : 0.82;
const LEVEYS = 960;

if (!lahde || !existsSync(lahde)) {
  console.error('Käyttö: node tools/elaintakykuvat.mjs <lähdekansio> [--laatu 0.82]');
  process.exit(1);
}

const tiedostot = readdirSync(lahde).filter((n) => /\.jpe?g$/i.test(n)).sort();
if (!tiedostot.length) {
  console.error(`Ei .jpg-kuvia kansiossa ${lahde}`);
  process.exit(1);
}

mkdirSync(KOHDE, { recursive: true });

// Playwright repon node_modulesista, muuten kontin globaalista
// (tools/savukkeet/README.md).
const paketti = await import('playwright')
  .catch(() => import('/opt/node22/lib/node_modules/playwright/index.js'));
const chromium = paketti.chromium ?? paketti.default?.chromium;
const selain = await chromium.launch({
  executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium',
});
const sivu = await selain.newPage();

let yhteensa = 0;
for (const nimi of tiedostot) {
  const tunnus = basename(nimi).match(/elain-([a-z]{3})-/i)?.[1]?.toLowerCase();
  if (!tunnus) {
    console.warn(`ohitetaan (ei maatunnusta nimessä): ${nimi}`);
    continue;
  }
  const b64 = readFileSync(resolve(lahde, nimi)).toString('base64');
  const ulos = await sivu.evaluate(async ({ data, leveys, laatu }) => {
    const kuva = new Image();
    kuva.src = `data:image/jpeg;base64,${data}`;
    await kuva.decode();
    const w = Math.min(leveys, kuva.width);
    const h = Math.round((kuva.height / kuva.width) * w);
    const kanvaasi = document.createElement('canvas');
    kanvaasi.width = w;
    kanvaasi.height = h;
    const piirto = kanvaasi.getContext('2d');
    piirto.imageSmoothingEnabled = true;
    piirto.imageSmoothingQuality = 'high';
    piirto.drawImage(kuva, 0, 0, w, h);
    return { b64: kanvaasi.toDataURL('image/jpeg', laatu).split(',')[1], w, h };
  }, { data: b64, leveys: LEVEYS, laatu: LAATU });
  const puskuri = Buffer.from(ulos.b64, 'base64');
  writeFileSync(resolve(KOHDE, `elain-${tunnus}.jpg`), puskuri);
  yhteensa += puskuri.length;
  console.log(`elain-${tunnus}.jpg  ${ulos.w}x${ulos.h}  ${(puskuri.length / 1024).toFixed(0)} kt`);
}
console.log(`\nYhteensä ${(yhteensa / 1024 / 1024).toFixed(2)} Mt kansioon assets/elaimet/`);

await selain.close();
