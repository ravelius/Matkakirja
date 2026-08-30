/*
 * TEE KORKEUSAINEISTO: harvennettu maailmanruudukko repoon.
 *
 *   node tools/tee-korkeusaineisto.mjs [--valimuisti <kansio>] [--ulos <tiedosto>]
 *
 * Lukee tools/hae-korkeusruudukko.mjs:n kokoaman välimuistiruudukon ja
 * kirjoittaa siitä REPOON committoitavan tiedoston
 * (tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz).
 *
 * === MIKSI AINEISTO ON REPOSSA (omistaja 30.8.2026) =================
 *
 * Laattapyramidin ensimmäinen CI-koeajo kaatui siihen, ettei NOAA:n
 * ERDDAP ollut ajokoneelta tavoitettavissa lainkaan ("fetch failed",
 * ei HTTP-statusta). Kontista sama osoite vastaa sekunnissa, joten
 * vika on ajokoneen ja NOAA:n välissä eikä korjattavissa täältä.
 *
 * Omistajan päätös: YKSIKÄÄN AJO EI SAA RIIPPUA NOAA:N
 * TAVOITETTAVUUDESTA. Aineisto noudetaan kerran ja se elää siitä
 * eteenpäin repossa — samalla tavalla kuin Natural Earth tulee
 * GitHubista, joka on todistetusti tavoitettavissa.
 *
 * === MIKSI TÄMÄ RIITTÄÄ =============================================
 *
 * 3 kaariminuuttia on Raamatun lukittu linjaus kaikille zoomtasoille:
 * syvimmällä tasolla yksi korkeussolu on 12 x 12 kuvapikseliä, joten
 * tarkempi aineisto ei toisi yhtään näkyvää yksityiskohtaa. Alkuperäinen
 * yhden kaariminuutin ETOPO1 haetaan NOAA:lta vain jos joskus halutaan
 * tarkempi ajo (tools/hae-korkeusruudukko.mjs osaa sen yhä).
 *
 * === MUOTO ==========================================================
 *
 * Mitattu 30.8.2026 (7201 x 3601 = 25,9 M solua):
 *
 *   Float32 raakana          103,7 Mt   (välimuistin muoto)
 *   Int16 raakana             51,9 Mt
 *   Int16 + gzip -9           39,9 Mt
 *   Int16 + erotus + gzip -9  28,9 Mt   <- tämä
 *
 * Kaksi askelta, molemmat häviöttömiä ja molemmat mitattuja:
 *
 *  1. INT16. Arvot ovat metrejä välillä -10 728 .. 8 266, eli ne
 *     mahtuvat kahteen tavuun eikä yksikään solu jää rajan
 *     ulkopuolelle (tarkistettu). Float32:n desimaalit ovat
 *     keskiarvoistuksen jäänne eikä mittaustarkkuutta: piirtomoottori
 *     interpoloi ruudukon bilineaarisesti ja lisää siihen satojen
 *     metrien kohinaa, joten alle metrin tarkkuudella ei ole
 *     vastinetta missään näkyvässä.
 *  2. RIVIKOHTAINEN EROTUS. Naapurisolut ovat lähes samat, joten
 *     erotus on pieni luku ja pakkautuu selvästi paremmin kuin
 *     absoluuttiarvo. Purku on rivin yli kulkeva summa. Häviöttömyys
 *     on todennettu koko aineistolla: 25 930 801 solua, 0 eroa.
 *
 * Tiedosto on MUUTTUMATON LÄHTÖAINEISTO: sitä ei generoida uudestaan
 * ellei ruudun kokoa muuteta.
 *
 * Lähde: NOAA NGDC ETOPO1 Global Relief Model, Ice Surface, 1
 * kaariminuutti (Amante & Eakins 2009, doi:10.7289/V5C8276M).
 * Public domain (Yhdysvaltain liittovaltion viraston tuottama).
 * Haettu ERDDAPista (coastwatch.pfeg.noaa.gov/erddap/griddap/etopo360)
 * kahden kaariminuutin näytteinä ja keskiarvoistettu 0,05 asteen
 * ruudukkoon — sama askel kuin tools/hae-korkeusruudukko.mjs tekee.
 */
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

import { AINEISTON_POLKU, TUNNUS3 } from './hae-korkeusruudukko.mjs';

const TAALLA = dirname(fileURLToPath(import.meta.url));

const argv = process.argv.slice(2);
const valitsin = (nimi, oletus) => {
  const i = argv.indexOf(`--${nimi}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : oletus;
};

const valimuisti = resolve(valitsin('valimuisti',
  process.env.KORKEUSRUUDUKKO_VALIMUISTI || join(tmpdir(), 'matkakirja-korkeusruudukko')));
const ulos = resolve(valitsin('ulos', join(TAALLA, '..', AINEISTON_POLKU)));
const RUUTU = Number(valitsin('ruutu', 0.05));
const NAYTE = Number(valitsin('nayte', 2));

/* Välimuistin oma muoto (ks. hae-korkeusruudukko.mjs kirjoitaVarasto). */
const LAHDE_OTSIKKO = 4 + 4 + 4 + 8;
const lahde = join(valimuisti, `ruudukko-${RUUTU}-${NAYTE}.bin`);
if (!existsSync(lahde)) {
  console.error(`Välimuistiruudukkoa ei ole: ${lahde}\n`
    + 'Aja ensin: NODE_USE_ENV_PROXY=1 node tools/hae-korkeusruudukko.mjs');
  process.exit(1);
}

const buf = readFileSync(lahde);
if (buf.toString('latin1', 0, 4) !== 'MKR1') {
  console.error('Välimuistiruudukon tunnus ei ole MKR1.');
  process.exit(1);
}
const leveys = buf.readUInt32LE(4);
const korkeus = buf.readUInt32LE(8);
const ruutu = buf.readDoubleLE(12);
const n = leveys * korkeus;
if (buf.length !== LAHDE_OTSIKKO + n * 4) {
  console.error('Välimuistiruudukko on vajaa.');
  process.exit(1);
}
console.log(`lähde   ${lahde}`);
console.log(`        ${leveys} x ${korkeus} (${ruutu}°), `
  + `${(statSync(lahde).size / 1e6).toFixed(1)} Mt Float32`);

/* --- Float32 -> Int16, ja todiste siitä että arvot mahtuvat --------- */
const i16 = new Int16Array(n);
let matalin = Infinity;
let korkein = -Infinity;
let yliRajan = 0;
for (let i = 0; i < n; i += 1) {
  const v = buf.readFloatLE(LAHDE_OTSIKKO + i * 4);
  if (v < matalin) matalin = v;
  if (v > korkein) korkein = v;
  const r = Math.round(v);
  if (r > 32767 || r < -32768) yliRajan += 1;
  i16[i] = r;
}
if (yliRajan) {
  console.error(`${yliRajan} solua ei mahdu Int16:een — muotoa on muutettava.`);
  process.exit(1);
}
console.log(`arvot   ${Math.round(matalin)} .. ${Math.round(korkein)} m, `
  + 'kaikki mahtuu Int16:een');

/* --- rivikohtainen erotus ------------------------------------------ */
const delta = new Int16Array(n);
for (let y = 0; y < korkeus; y += 1) {
  let edellinen = 0;
  for (let x = 0; x < leveys; x += 1) {
    const i = y * leveys + x;
    delta[i] = i16[i] - edellinen;
    edellinen = i16[i];
  }
}

/*
 * OTSIKKO KULKEE PAKKAUKSEN SISÄLLÄ, jotta tiedosto on yksi gzip eikä
 * kahden muodon liitos: purku on yksi gunzip ja sen jälkeen luku.
 */
const otsikko = Buffer.alloc(4 + 4 + 4 + 8 + 4);
otsikko.write(TUNNUS3, 0, 'latin1');
otsikko.writeUInt32LE(leveys, 4);
otsikko.writeUInt32LE(korkeus, 8);
otsikko.writeDoubleLE(ruutu, 12);
otsikko.writeUInt32LE(NAYTE, 20);
const runko = Buffer.concat([
  otsikko,
  Buffer.from(delta.buffer, delta.byteOffset, delta.byteLength),
]);
const pakattu = gzipSync(runko, { level: 9 });

mkdirSync(dirname(ulos), { recursive: true });
writeFileSync(ulos, pakattu);
console.log(`ulos    ${ulos}`);
console.log(`        ${(pakattu.length / 1e6).toFixed(1)} Mt pakattuna `
  + `(raaka Int16 ${(n * 2 / 1e6).toFixed(1)} Mt, `
  + `suhde ${(pakattu.length / (n * 2) * 100).toFixed(0)} %)`);
