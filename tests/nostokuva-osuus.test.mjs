/*
 * NOSTOKUVAN ESIRAJAUS --osuus (KK 20.11.2026 11.47; K-4 erä 2: SK:n sharp-esirajauksen tilalle): tools/sisalto/nostokuva.mjs ottaa
 * lähteestä keskipisteen ympäriltä osuus × leveys × osuus × korkeus -alueen ennen 3:2-rajausta ja soikiota. Oletus 1 = entinen tulos
 * tavulleen. Kuvat syntyvät testissä; mitään ei haeta.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { rajaa, rajausLaatikko, SUHDE, OSUUS_MIN } from '../tools/sisalto/nostokuva.mjs';

const sharp = await import('sharp').then((m) => m.default).catch(() => null);
const ilmanSharpia = { skip: sharp ? false : 'sharp puuttuu' };
const TYOKALU = fileURLToPath(new URL('../tools/sisalto/nostokuva.mjs', import.meta.url));

const kansio = await mkdtemp(path.join(tmpdir(), 'nostokuva-osuus-'));
test.after(() => rm(kansio, { recursive: true, force: true }));

/** Entinen rajausLaatikko (ennen --osuutta), vertailuun. */
function entinen(leveys, korkeus, keskiX = 0.5, keskiY = 0.5) {
  let w, h;
  if (leveys / korkeus >= SUHDE) { h = korkeus; w = Math.min(leveys, Math.round(korkeus * SUHDE)); }
  else { w = leveys; h = Math.min(korkeus, Math.round(leveys / SUHDE)); }
  const left = Math.round(Math.max(0, Math.min(leveys - w, keskiX * leveys - w / 2)));
  const top = Math.round(Math.max(0, Math.min(korkeus - h, keskiY * korkeus - h / 2)));
  return { left, top, width: w, height: h };
}

test('osuus 1 (oletus) = entinen rajaus kaikilla mitoilla ja keskipisteillä', () => {
  for (const [w, h] of [[3000, 2000], [4000, 2000], [2000, 3000], [1201, 799], [5472, 3648], [1080, 1920]]) {
    for (const [x, y] of [[0.5, 0.5], [0.1, 0.9], [1, 0], [0.37, 0.62]]) {
      assert.deepEqual(rajausLaatikko(w, h, x, y), entinen(w, h, x, y), `${w}×${h} (${x}, ${y})`);
      assert.deepEqual(rajausLaatikko(w, h, x, y, 1), entinen(w, h, x, y), `${w}×${h} (${x}, ${y}) osuus 1`);
    }
  }
});

test('osuus 0,8 keskeltä: 3000 × 2000 → 2400 × 1600 kohdasta (300, 200)', () => {
  assert.deepEqual(rajausLaatikko(3000, 2000, 0.5, 0.5, 0.8), { left: 300, top: 200, width: 2400, height: 1600 });
  // Pysty lähde: 3:2 leveyden mukaan esirajauksesta (0,6 × 2000 = 1200 → 1200 × 800).
  assert.deepEqual(rajausLaatikko(2000, 3000, 0.5, 0.5, 0.6), { left: 400, top: 1100, width: 1200, height: 800 });
});

test('osuus keskipisteen ympäriltä ja kuvan sisällä; alaraja 0,5', () => {
  const r = rajausLaatikko(3000, 2000, 0.1, 0.5, 0.6);
  assert.deepEqual(r, { left: 0, top: 400, width: 1800, height: 1200 }, 'reunaa kohti pysähtyy reunaan');
  const k = rajausLaatikko(3000, 2000, 0.7, 0.3, 0.6);
  assert.equal(k.left, Math.round(0.7 * 3000 - 900));
  assert.equal(k.top, 0, 'yläreunaa kohti pysähtyy reunaan');
  assert.deepEqual(rajausLaatikko(3000, 2000, 0.5, 0.5, 0.3), rajausLaatikko(3000, 2000, 0.5, 0.5, OSUUS_MIN), 'alle 0,5 → 0,5');
});

test('rajaa: osuus 1 tuottaa tavulleen saman kuin ilman osuutta; osuus < 1 kirjataan jsoniin', ilmanSharpia, async () => {
  const lahde = path.join(kansio, 'lahde.png');
  await sharp({ create: { width: 3000, height: 2000, channels: 3, background: { r: 90, g: 120, b: 160 } } })
    .composite([{ input: { create: { width: 600, height: 400, channels: 3, background: { r: 230, g: 40, b: 30 } } }, left: 1200, top: 800 }])
    .png().toFile(lahde);
  const a = await rajaa(lahde, { ulos: path.join(kansio, 'a'), nimi: 'k', lahde: 'Kuva X, CC BY-SA 4.0' });
  const b = await rajaa(lahde, { ulos: path.join(kansio, 'b'), nimi: 'k', osuus: 1, lahde: 'Kuva X, CC BY-SA 4.0' });
  for (const k of ['kuva', 'suurennos', 'esikatselu', 'json'])
    assert.ok((await readFile(a.polut[k])).equals(await readFile(b.polut[k])), `${k} tavulleen sama`);
  assert.equal(a.json.rajaus.osuus, undefined, 'oletuksessa ei osuuskenttää');
  const c = await rajaa(lahde, { ulos: path.join(kansio, 'c'), nimi: 'k', osuus: 0.75 });
  assert.equal(c.ok, true);
  assert.equal(c.json.rajaus.osuus, 0.75);
  assert.deepEqual([c.json.rajaus.x, c.json.rajaus.y, c.json.rajaus.leveys, c.json.rajaus.korkeus], [375, 250, 2250, 1500]);
  assert.equal(c.json.suurennos.leveys, 2048);
  // Esirajaus liian pieneksi (sääntö 11): 0,5 × 2000 px:n lähde → 1000 px < 1200 → vain esikatselu.
  const pieni = path.join(kansio, 'pieni.png');
  await sharp({ create: { width: 2000, height: 1400, channels: 3, background: { r: 128, g: 128, b: 128 } } }).png().toFile(pieni);
  const d = await rajaa(pieni, { ulos: path.join(kansio, 'd'), nimi: 'p', osuus: 0.5 });
  assert.equal(d.ok, false);
});

test('komentorivi: --osuus 0.4 hylätään (paluukoodi 2)', () => {
  let koodi = 0;
  try { execFileSync(process.execPath, [TYOKALU, 'x.png', '--ulos', kansio, '--osuus', '0.4'], { stdio: 'pipe' }); }
  catch (e) { koodi = e.status; }
  assert.equal(koodi, 2);
});
