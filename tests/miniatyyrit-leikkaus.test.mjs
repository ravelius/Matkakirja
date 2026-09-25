/*
 * MINIATYYRIT OVAT LEIKATTUJA KOHTEITA, EIVÄT KOHTAUKSIA (omistajan
 * löydös 95, build 13, 25.9.2026: "piirretty tausta on väärin";
 * alkuperäinen tilaus 15.8.2026: "tee piirroksista leikattuja. Poista
 * siis ylimääräinen tausta niistä"; Fablen linjaus 25.9.: karttanostojen
 * kuvat ovat leikattuja kohteita).
 *
 * Leikattu miniatyyri on läpinäkyvä webp: yksittäinen kohde, jonka
 * ympärillä on läpinäkyvää pohjaa (esim. ateena-akropolis.webp).
 * Kohtauskuva on koko maalattu näkymä taustoineen. Kaksi mittaa
 * (256×256:ksi skaalatusta alfasta, alfa > 200 = läpinäkymätön):
 *   - TÄYTTÖ: läpinäkymättömien pikselien osuus koko kuvasta.
 *     Leikatuilla yleensä 0,1–0,5; kohtauskuvilla 0,6–0,9.
 *   - REUNA: läpinäkymättömien pikselien osuus kuvan kehästä.
 *     Leikatuilla 0–0,29, kohtauksilla, joiden tausta ulottuu
 *     reunaan, 0,37–0,53.
 * Rajat: täyttö < 0,6 ja reuna <= 0,35. Mitattu 25.9.2026, 423 kuvaa,
 * katsottu silmin; luettelo docs/raportit/miniatyyrit-kohtauskuvat-
 * 20260925.md.
 *
 * TUNNETUT KOHTAUSKUVAT: 70 kuvaa odottaa kuvaputken (Codexin) leikattua
 * versiota. Ateenan 6 on pilotti build 14:ssä; loput tilataan, kun
 * omistaja on hyväksynyt pilotin. Kun kuva on korvattu, se PITÄÄ
 * poistaa alta — toinen testi kaatuu, jos lista kuvaa jo leikattua.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const KANSIO = new URL('../assets/kartat/miniatyyrit/', import.meta.url);
const TAYTTO_RAJA = 0.6;
const REUNA_RAJA = 0.35;

const TUNNETUT_KOHTAUSKUVAT = new Set([
  'amsterdam-herengracht-537.webp',
  'amsterdam-kapein-talo.webp',
  'amsterdam-kissalaiva.webp',
  'amsterdam-maitotytto.webp',
  'amsterdam-yovartio.webp',
  'ateena-akropolis-museo.webp',
  'ateena-diogeneen-astia.webp',
  'ateena-elginin-marmorit.webp',
  'ateena-iliou-melathron.webp',
  'ateena-maratonhuijaus.webp',
  'ateena-niken-temppeli.webp',
  'berliini-gaertnerin-berliini.webp',
  'berliini-marlene-dietrich.webp',
  'berliini-muuri-1961.webp',
  'bryssel-galeries-royales-saint-hubert.webp',
  'helsinki-suomi-heraa-1899.webp',
  'ljubljana-keskustori.webp',
  'ljubljana-kri-anke.webp',
  'ljubljana-ljubljanan-linna.webp',
  'ljubljana-lohikaarmesilta.webp',
  'ljubljana-pre-ernin-aukio.webp',
  'ljubljana-tivoli-puisto.webp',
  'ljubljana-tromostovje.webp',
  'lontoo-abbey-roadin-suojatie.webp',
  'lontoo-canaletto-lontoossa.webp',
  'lontoo-dickensin-pubi.webp',
  'lontoo-exchange-alley.webp',
  'lontoo-fleming-1928.webp',
  'lontoo-globe-1599.webp',
  'lontoo-leake-streetin-tunneli.webp',
  'lontoo-metron-hoyryveturi.webp',
  'lontoo-palo-1666.webp',
  'lontoo-turbiinihalli.webp',
  'luxemburg-bockin-kasematit.webp',
  'luxemburg-chemin-de-la-corniche.webp',
  'luxemburg-suurherttuallinen-palatsi.webp',
  'madrid-chotis.webp',
  'madrid-goyan-kansankuvat.webp',
  'madrid-gran-v-a.webp',
  'madrid-kaksi-joukkuetta.webp',
  'madrid-tapaskierros.webp',
  'newyork-metropolitan-museo.webp',
  'nikosia-leventis-museo.webp',
  'pariisi-72-nimea.webp',
  'pariisi-bastilji-1789.webp',
  'pariisi-carmenin-ensi-ilta.webp',
  'pariisi-curie-1898.webp',
  'pariisi-impressionistit.webp',
  'pariisi-kirahvin-kavelymatka.webp',
  'pariisi-lumiere-1895.webp',
  'pariisi-paras-patonki.webp',
  'pariisi-pariisi-soi.webp',
  'pariisi-pasteur-1862.webp',
  'pariisi-torni-romuraudaksi.webp',
  'pariisi-tuileriain-rauniot.webp',
  'pariisi-vrain-lucas.webp',
  'pietari-janissaari-1703.webp',
  'rooma-aqua-virgo.webp',
  'rooma-areenan-kellari.webp',
  'rooma-kolikko-olan-yli.webp',
  'rooma-sikstus-1510.webp',
  'valletta-auberge-de-castille.webp',
  'valletta-pyhan-elmon-linnake.webp',
  'valletta-suurmestarin-palatsi.webp',
  'valletta-ylabarrakka-puutarhat.webp',
  'wien-figaro-1786.webp',
  'wien-lipizzanit.webp',
  'wien-taikahuilu.webp',
  'wien-vuoristovesijohto.webp',
  'wien-yhdeksas-1824.webp',
]);

/** {taytto, reuna}: läpinäkymättömien pikselien osuus kuvasta ja sen kehästä (0–1). */
async function mittaa(nimi) {
  const { data, info } = await sharp(fileURLToPath(new URL(nimi, KANSIO))).ensureAlpha()
    .resize(256, 256, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;
  const alfa = (x, y) => data[(y * w + x) * c + (c - 1)];
  let taytto = 0;
  for (let y = 0; y < h; y += 1) for (let x = 0; x < w; x += 1) if (alfa(x, y) > 200) taytto += 1;
  let reunaYlla = 0; let reunaYht = 0;
  const lue = (x, y) => { reunaYht += 1; if (alfa(x, y) > 200) reunaYlla += 1; };
  for (let x = 0; x < w; x += 1) { lue(x, 0); lue(x, h - 1); }
  for (let y = 0; y < h; y += 1) { lue(0, y); lue(w - 1, y); }
  return { taytto: taytto / (w * h), reuna: reunaYlla / reunaYht };
}

const onKohtaus = (m) => m.taytto >= TAYTTO_RAJA || m.reuna > REUNA_RAJA;
const KUVAT = readdirSync(KANSIO).filter((n) => n.endsWith('.webp'));

test('miniatyyrit ovat leikattuja kohteita: ei maalattua taustaa', async () => {
  assert.ok(KUVAT.length > 100, 'miniatyyrejä pitäisi olla satoja');
  const huonot = [];
  for (const nimi of KUVAT) {
    if (TUNNETUT_KOHTAUSKUVAT.has(nimi)) continue;
    const m = await mittaa(nimi);
    if (onKohtaus(m)) huonot.push(`${nimi}: täyttö ${m.taytto.toFixed(2)}, reuna ${m.reuna.toFixed(2)}`);
  }
  assert.deepEqual(huonot, [], 'kuva on kohtaus — tilaa leikattu versio kuvaputkelta');
});

test('tunnettujen kohtauskuvien lista ei sisällä jo korjattuja kuvia', async () => {
  const vanhentuneet = [];
  for (const nimi of TUNNETUT_KOHTAUSKUVAT) {
    assert.ok(KUVAT.includes(nimi), `${nimi}: tiedostoa ei ole — poista listalta`);
    if (!onKohtaus(await mittaa(nimi))) vanhentuneet.push(nimi);
  }
  assert.deepEqual(vanhentuneet, [], 'kuva on jo leikattu — poista se TUNNETUT_KOHTAUSKUVAT-listalta');
});
