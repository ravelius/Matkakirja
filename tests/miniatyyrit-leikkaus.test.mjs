/*
 * MINIATYYRIT OVAT LEIKATTUJA (omistajan löydös 95, build 13, 25.9.2026:
 * "Ateenan nähtävyyksistä osa ei ole leikattuja: piirretty tausta
 * näkyy"; alkuperäinen tilaus 15.8.2026: "tee piirroksista leikattuja.
 * Poista siis ylimääräinen tausta niistä").
 *
 * Leikattu miniatyyri on läpinäkyvä webp, jonka reuna on repaleinen
 * tai tyhjä: piirretty tausta ei yllä kuvan neljälle reunalle asti.
 * Mitta on läpinäkymättömien reunapikselien osuus (alfa > 200) kuvan
 * koko kehästä. Leikatuilla se on 0–0,29, leikkaamattomilla 0,37–0,53
 * (mitattu 25.9.2026, 423 kuvaa, katsottu silmin). Raja 0,35 on
 * niiden välissä.
 *
 * TUNNETUT LEIKKAAMATTOMAT: viisi kuvaa, jotka odottavat kuvaputken
 * (Codexin) leikattua versiota (posti/sisaltokirjuri-kuvaputki-
 * miniatyyrien-leikkaus-20260925.md). Kun kuva on korvattu, se PITÄÄ
 * poistaa alta — toinen testi kaatuu, jos lista kuvaa jo leikattua.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const KANSIO = new URL('../assets/kartat/miniatyyrit/', import.meta.url);
const RAJA = 0.35;

const TUNNETUT_LEIKKAAMATTOMAT = new Set([
  'ateena-elginin-marmorit.webp',
  'madrid-goyan-kansankuvat.webp',
  'pariisi-tuileriain-rauniot.webp',
  'rooma-kolikko-olan-yli.webp',
  'wien-vuoristovesijohto.webp',
]);

/** Läpinäkymättömien reunapikselien osuus kuvan kehästä (0–1). */
async function reunaOsuus(nimi) {
  const { data, info } = await sharp(fileURLToPath(new URL(nimi, KANSIO))).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const alfa = (x, y) => data[(y * w + x) * c + (c - 1)];
  let ylla = 0; let yht = 0;
  const lue = (x, y) => { yht += 1; if (alfa(x, y) > 200) ylla += 1; };
  for (let x = 0; x < w; x += 1) { lue(x, 0); lue(x, h - 1); }
  for (let y = 0; y < h; y += 1) { lue(0, y); lue(w - 1, y); }
  return ylla / yht;
}

const KUVAT = readdirSync(KANSIO).filter((n) => n.endsWith('.webp'));

test('miniatyyrit ovat leikattuja: piirretty tausta ei yllä kuvan reunaan', async () => {
  assert.ok(KUVAT.length > 100, 'miniatyyrejä pitäisi olla satoja');
  const huonot = [];
  for (const nimi of KUVAT) {
    if (TUNNETUT_LEIKKAAMATTOMAT.has(nimi)) continue;
    const osuus = await reunaOsuus(nimi);
    if (osuus > RAJA) huonot.push(`${nimi}: ${osuus.toFixed(2)} reunasta läpinäkymätöntä`);
  }
  assert.deepEqual(huonot, [], 'kuva ei ole leikattu — tilaa leikattu versio kuvaputkelta');
});

test('tunnettujen leikkaamattomien lista ei sisällä jo korjattuja kuvia', async () => {
  const vanhentuneet = [];
  for (const nimi of TUNNETUT_LEIKKAAMATTOMAT) {
    assert.ok(KUVAT.includes(nimi), `${nimi}: tiedostoa ei ole — poista listalta`);
    if ((await reunaOsuus(nimi)) <= RAJA) vanhentuneet.push(nimi);
  }
  assert.deepEqual(vanhentuneet, [], 'kuva on jo leikattu — poista se TUNNETUT_LEIKKAAMATTOMAT-listalta');
});
