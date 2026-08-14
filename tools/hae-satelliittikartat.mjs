/*
 * Kaupunkikartan satelliittiversio (omistajan tilaus 14.8.2026:
 * kaupunkikartalle vipu, joka vaihtaa piirretyn kartan
 * satelliittinäkymäksi).
 *
 *   node tools/hae-satelliittikartat.mjs berliini [kaupunki ...]
 *
 * Hakee EOX:n Sentinel-2 cloudless -WMS:stä pilvettömän satelliitti-
 * kuvan TÄSMÄLLEEN samasta rajauksesta kuin piirretty kartta ja
 * tallentaa sen tiedostoon assets/kartat/<kaupunki>-satelliitti.jpg.
 *
 * --- miksi sama rajaus ja sama kuvasuhde ---
 *
 * Lehti asemoi kohdepisteet prosentteina rajauksesta (maakartat.js:n
 * karttapiste), ei kuvan sisällöstä. Kun satelliittikuva pyydetään
 * samalla rajauksella JA samassa kuvasuhteessa kuin piirretty PNG,
 * numeroympyrät, selitteet ja mittajana osuvat molemmissa näkymissä
 * samaan paikkaan — vipu vaihtaa vain taustan. Kuvasuhde luetaan
 * siksi suoraan piirretystä PNG:stä (IHDR-lohko) eikä lasketa
 * asteista: piirtäjä tekee leveysasteen mukaisen cos-korjauksen, ja
 * pelkistä asteista laskettu suhde venyttäisi satelliittikuvan
 * pystysuunnassa puolitoistakertaiseksi.
 *
 * Leveys on 1600 pikseliä kuten piirretyissä kartoissa. Enempää ei
 * kannata: kuva näytetään palstan levyisenä, ja JPEG kasvaa nopeasti
 * — Berliini on tällä koolla noin puoli megatavua.
 *
 * --- lähde ja lisenssi ---
 *
 * Sentinel-2 cloudless 2024 (s2maps.eu, EOX): muokattua Copernicus
 * Sentinel -dataa, ilmainen ei-kaupalliseen käyttöön nimeämisellä.
 * Lähderivi peliin on LAHDERIVI-vakiossa alla — se kuuluu kirjata
 * maakartat.js:n satelliittiLahde-kenttään. Avaimia ei tarvita.
 *
 * KATSO TUOTETTU KUVA SILMIN (Read) ennen kuin otat sen käyttöön.
 * WMS palauttaa toisinaan pilvisen tai värivääristyneen ruudun, eikä
 * työkalu näe sitä. Vertaa myös piirrettyyn karttaan: joen mutkien ja
 * ratapihan pitää osua samaan kohtaan.
 *
 * Verkko: Noden fetch ei lue HTTPS_PROXYa ilman NODE_USE_ENV_PROXY=1
 * (ks. tools/hae-yonkartta.mjs). Skripti käynnistää itsensä
 * uudelleen, jos muuttuja puuttuu.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const ajo = spawnSync(process.execPath, [fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1', NODE_NO_WARNINGS: '1' },
  });
  process.exit(ajo.status ?? 1);
}

const { KAUPUNKIKARTAT } = await import('../js/packs/maakartat.js');

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const PALVELIN = 'https://tiles.maps.eox.at/wms';
const TASO = 's2cloudless-2024';
const LEVEYS = 1600;
// Kohtelias tauko peräkkäisten hakujen välissä: yksi kaupunki on yksi
// pyyntö, mutta skaalatessa niitä tulee kymmeniä samalta palvelimelta.
const TAUKO_MS = 3000;
const LAHDERIVI = 'Sentinel-2 cloudless 2024 — s2maps.eu, EOX '
  + '(muokattua Copernicus Sentinel -dataa)';

/** Piirretyn PNG:n mitat IHDR-lohkosta ilman kirjastoja. */
function pngMitat(polku) {
  const tavut = readFileSync(polku);
  if (tavut.readUInt32BE(0) !== 0x89504e47) throw new Error(`${polku} ei ole PNG`);
  return { leveys: tavut.readUInt32BE(16), korkeus: tavut.readUInt32BE(20) };
}

/**
 * WMS 1.1.1 + EPSG:4326: bbox on lon,lat-järjestyksessä
 * (länsi,etelä,itä,pohjoinen).
 */
function wmsOsoite(rajat, leveys, korkeus) {
  const p = new URLSearchParams({
    service: 'WMS',
    request: 'GetMap',
    version: '1.1.1',
    layers: TASO,
    bbox: [rajat.lansi, rajat.etela, rajat.ita, rajat.pohjoinen].join(','),
    srs: 'EPSG:4326',
    width: String(leveys),
    height: String(korkeus),
    format: 'image/jpeg',
  });
  return `${PALVELIN}?${p}`;
}

async function haeKaupunki(id) {
  const kartta = KAUPUNKIKARTAT[id];
  if (!kartta) throw new Error(`tuntematon kaupunki: ${id}`);
  if (!kartta.rajat) throw new Error(`${id}: rajat puuttuvat (laea tai kainalokartta?)`);
  if (!kartta.polku) throw new Error(`${id}: ei piirrettyä PNG:tä (polku puuttuu)`);

  const piirretty = pngMitat(join(JUURI, kartta.polku));
  const korkeus = Math.round((LEVEYS * piirretty.korkeus) / piirretty.leveys);
  const osoite = wmsOsoite(kartta.rajat, LEVEYS, korkeus);

  const vastaus = await fetch(osoite);
  if (!vastaus.ok) throw new Error(`${id}: WMS vastasi ${vastaus.status}`);
  const tavut = Buffer.from(await vastaus.arrayBuffer());
  /*
   * WMS palauttaa virheensä XML:nä statuksella 200, joten pelkkä ok
   * ei riitä — tarkistetaan JPEGin taikatavut. Muuten repoon
   * tallentuisi virheilmoitus .jpg-päätteellä.
   */
  if (tavut[0] !== 0xff || tavut[1] !== 0xd8) {
    throw new Error(`${id}: vastaus ei ole JPEG — ${tavut.subarray(0, 200)}`);
  }

  const kohde = join(JUURI, 'assets', 'kartat', `${id}-satelliitti.jpg`);
  writeFileSync(kohde, tavut);
  console.log(`${id}: ${LEVEYS} x ${korkeus} px, ${Math.round(tavut.length / 1024)} kt -> ${kohde}`);
  console.log(`  satelliitti: 'assets/kartat/${id}-satelliitti.jpg',`);
  console.log(`  satelliittiLahde: '${LAHDERIVI}',`);
}

const kaupungit = process.argv.slice(2);
if (kaupungit.length === 0) {
  console.error('Käyttö: node tools/hae-satelliittikartat.mjs <kaupunki> [kaupunki ...]');
  process.exit(1);
}

let virheita = 0;
for (const [i, id] of kaupungit.entries()) {
  if (i > 0) await new Promise((r) => setTimeout(r, TAUKO_MS));
  try {
    await haeKaupunki(id);
  } catch (virhe) {
    virheita += 1;
    console.error(`VIRHE ${virhe.message}`);
  }
}
console.log('\nLisää kentät KÄSIN js/packs/maakartat.js:ään ja KATSO kuva silmin.');
process.exit(virheita ? 1 : 0);
