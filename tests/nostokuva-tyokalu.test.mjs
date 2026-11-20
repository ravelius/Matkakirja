/*
 * NOSTOKUVAN RAJAUSTYÖKALU (K-3 M3; KK:N PÄÄTÖS 20.11.2026 klo 09.18, aiempi: P-261120-5): tools/sisalto/nostokuva.mjs rajaa 3:2:een
 * annetulla keskipisteellä, pienentää 1200 × 800:aan ja 2048 px:n suurennokseen, kirjoittaa mitat ja "rajattu" lähderiviin ja tekee
 * esikatselun soikealla reunalla (n ja h: tools/sisalto/soikio.mjs). Kuvat syntyvät testissä; mitään ei haeta.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { rajaa, rajausLaatikko, lahdeRajattu, LEVEYS, KORKEUS } from '../tools/sisalto/nostokuva.mjs';
import { SOIKIO_N, SOIKIO_H, soikioAlfa } from '../tools/sisalto/soikio.mjs';

const kansio = await mkdtemp(path.join(tmpdir(), 'nostokuva-'));
test.after(() => rm(kansio, { recursive: true, force: true }));

/** Testikuva: harmaa pohja, punainen merkki pisteessä (mx, my) osuuksina. */
async function testikuva(nimi, w, h, mx = 0.5, my = 0.5) {
  const p = path.join(kansio, nimi);
  const r = 20;
  await sharp({ create: { width: w, height: h, channels: 3, background: { r: 128, g: 128, b: 128 } } })
    .composite([{ input: { create: { width: r * 2, height: r * 2, channels: 3, background: { r: 255, g: 0, b: 0 } } },
      left: Math.round(mx * w) - r, top: Math.round(my * h) - r }])
    .png().toFile(p);
  return p;
}

test('vakiot yhdessä paikassa: n = 3, h = 0,25; alfa 1 keskellä, 0 nurkassa ja reunan keskellä', () => {
  assert.equal(SOIKIO_N, 3);
  assert.equal(SOIKIO_H, 0.25);
  assert.equal(soikioAlfa(0, 0), 1);
  assert.equal(soikioAlfa(0.75, 0), 1, 'keskilinja 75 %:iin asti täysi');
  assert.ok(soikioAlfa(0.6, 0.6) > 0.995, '60 % × 60 %:n nurkka');
  assert.equal(soikioAlfa(1, 1), 0);
  assert.equal(soikioAlfa(1, 0), 0);
});

test('rajauslaatikko: suurin 3:2 keskipisteen ympäriltä, pysyy kuvan sisällä', () => {
  assert.deepEqual(rajausLaatikko(3000, 1000, 0.5, 0.5), { left: 750, top: 0, width: 1500, height: 1000 });
  assert.deepEqual(rajausLaatikko(3000, 1000, 0, 0.5), { left: 0, top: 0, width: 1500, height: 1000 }, 'reunaan');
  assert.deepEqual(rajausLaatikko(1200, 2000, 0.5, 0.3), { left: 0, top: 200, width: 1200, height: 800 }, 'pystykuva');
  assert.deepEqual(rajausLaatikko(1200, 2000, 0.5, 1), { left: 0, top: 1200, width: 1200, height: 800 });
});

test('lähderivi: "rajattu" kerran', () => {
  assert.equal(lahdeRajattu('Tekijä, Wikimedia Commons (CC BY-SA 4.0)'), 'Tekijä, Wikimedia Commons (CC BY-SA 4.0), rajattu');
  assert.equal(lahdeRajattu('Tekijä (CC0), rajattu'), 'Tekijä (CC0), rajattu');
});

for (const [nimi, w, h, kx, ky] of [['vaaka', 3000, 1600, 0.6, 0.5], ['pysty', 1600, 2600, 0.5, 0.35]]) {
  test(`${nimi}kuva ${w} × ${h}: 1200 × 800, suurennos 2048 px, mitat ja esikatselun alfa`, async () => {
    const lahde = await testikuva(`${nimi}.png`, w, h, kx, ky);
    const t = await rajaa(lahde, { ulos: kansio, nimi, keskiX: kx, keskiY: ky, lahde: 'Tekijä, Wikimedia Commons (CC BY-SA 4.0)' });
    assert.equal(t.ok, true, t.viesti);
    const m = await sharp(t.polut.kuva).metadata();
    assert.deepEqual([m.width, m.height], [LEVEYS, KORKEUS]);
    const s = await sharp(t.polut.suurennos).metadata();
    const laatikko = rajausLaatikko(w, h, kx, ky);
    assert.equal(s.width, Math.min(2048, laatikko.width));
    assert.equal(s.height, Math.round(s.width / 1.5));
    const json = JSON.parse(await readFile(t.polut.json, 'utf8'));
    assert.equal(json.leveys, 1200);
    assert.equal(json.korkeus, 800);
    assert.equal(json.lahde, 'Tekijä, Wikimedia Commons (CC BY-SA 4.0), rajattu');
    assert.deepEqual(json.suurennos, { tiedosto: `${nimi}-2048.jpg`, leveys: s.width, korkeus: s.height });
    // Esikatselu: alfa 1 (255) keskimmäisessä 60 % × 60 %:ssa ja 0 nurkissa; pääaihe (punainen) keskellä.
    const { data, info } = await sharp(t.polut.esikatselu).raw().toBuffer({ resolveWithObject: true });
    assert.deepEqual([info.width, info.height, info.channels], [LEVEYS, KORKEUS, 4]);
    const a = (x, y) => data[(y * info.width + x) * 4 + 3];
    let pienin = 255;
    for (let y = Math.ceil(0.2 * KORKEUS); y < Math.floor(0.8 * KORKEUS); y++) {
      for (let x = Math.ceil(0.2 * LEVEYS); x < Math.floor(0.8 * LEVEYS); x++) pienin = Math.min(pienin, a(x, y));
    }
    assert.equal(pienin, 255, 'keskimmäinen 60 % × 60 % täysi');
    for (const [x, y] of [[0, 0], [LEVEYS - 1, 0], [0, KORKEUS - 1], [LEVEYS - 1, KORKEUS - 1]]) assert.equal(a(x, y), 0, `nurkka ${x},${y}`);
    const i = (KORKEUS / 2 * info.width + LEVEYS / 2) * 4;
    assert.ok(data[i] > 200 && data[i + 1] < 60, 'pääaihe keskellä');
  });
}

test('liian pieni lähde (rajaus alle 1200 px): ei suurenneta, vain esikatselu, ok = false', async () => {
  const lahde = await testikuva('pieni.png', 853, 1280, 0.5, 0.4);
  const t = await rajaa(lahde, { ulos: kansio, nimi: 'pieni', keskiY: 0.4 });
  assert.equal(t.ok, false);
  assert.equal(t.polut.kuva, undefined);
  const e = await sharp(t.polut.esikatselu).metadata();
  assert.deepEqual([e.width, e.height], [853, 569]);
  assert.match(t.viesti, /LIIAN PIENI/);
});
