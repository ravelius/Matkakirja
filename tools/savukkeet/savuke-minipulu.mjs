import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

// Käynnistä ensin projektin HTTP-palvelin. Kaappaukset jäävät outputiin.
const base = process.env.BASE_URL || 'http://127.0.0.1:8000';
const out = resolve(process.env.OUTPUT_DIR || 'output/minipulu-savuke');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const [width, height] of [[390, 844], [1400, 900], [844, 390]]) {
    await page.setViewportSize({ width, height });
    await page.goto(`${base}/tools/savukkeet/minipulu.html`);
    await page.waitForFunction(() => window.koe?.mini);
    await page.waitForTimeout(80);
    const layout = await page.evaluate(() => {
      const el = window.koe.mini.elementti;
      const svg = el.querySelector('svg');
      const box = el.getBoundingClientRect();
      const rect = selector => document.querySelector(selector).getBoundingClientRect();
      const intersects = other => box.left < other.right && box.right > other.left && box.top < other.bottom && box.bottom > other.top;
      const ink = svg.getBBox();
      const vb = svg.viewBox.baseVal;
      return {
        box: box.toJSON(), paintedHeight: ink.height * box.height / vb.height,
        noOverlap: ['.satelliitti-ala', '.satelliitti-nauha', '.satelliitti-sulku', '.satelliitti-linssisulku'].every(s => !intersects(rect(s))),
        inside: box.left >= 0 && box.top >= 0 && box.right <= innerWidth && box.bottom <= innerHeight,
        pointerEvents: getComputedStyle(el).pointerEvents,
        hitPassesThrough: !el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)),
      };
    });
    assert.ok(layout.noOverlap && layout.inside && layout.hitPassesThrough);
    assert.equal(layout.pointerEvents, 'none');
    const small = width <= 620 || height <= 500;
    assert.ok(layout.paintedHeight >= (small ? 40 : 64));
    assert.ok(layout.paintedHeight <= (small ? 56 : 80));
    const uniqueIds = await page.evaluate(() => {
      const ids = [...document.querySelectorAll('.minipulu [id]')].map(e => e.id);
      return ids.length === new Set(ids).size;
    });
    assert.ok(uniqueIds, 'useampi Pulu ei saa jakaa SVG-clipPath-tunnuksia');
    await page.screenshot({ path: `${out}/minipulu-${width}.png` });
    results.push({ width, height, ...layout });
  }
  // Aktiivisen reaktion koko geometria mahtuu samaan vakiorajaukseen.
  await page.evaluate(() => window.koe.mini.reagoi());
  for (let i = 0; i < 28; i++) {
    await page.waitForTimeout(30);
    const fits = await page.evaluate(() => {
      const svg = window.koe.mini.elementti.querySelector('svg');
      const b = svg.getBBox(), v = svg.viewBox.baseVal;
      return b.x >= v.x && b.y >= v.y && b.x + b.width <= v.x + v.width && b.y + b.height <= v.y + v.height;
    });
    assert.ok(fits, 'pää tai jalat leikkautuvat reaktiossa');
  }
  assert.equal(await page.evaluate(() => window.koe.mini.elementti.dataset.tila), 'idle');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  assert.equal(await page.evaluate(() => window.koe.mini.reagoi()), false);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => window.koe.mini.reagoi());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(50);
  assert.equal(await page.evaluate(() => window.koe.mini.elementti.dataset.tila), 'idle');
  // Sama instanssi mukautuu ruudun leveyden muutokseen.
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(50);
  assert.equal(await page.evaluate(() => window.koe.mini.elementti.getBoundingClientRect().height), 56);
  await page.evaluate(() => window.koe.mini.asetaKoko(60));
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.waitForTimeout(50);
  assert.equal(await page.evaluate(() => window.koe.mini.elementti.getBoundingClientRect().height), 60);
  assert.equal(await page.evaluate(() => {
    try { window.koe.mini.asetaKoko(NaN); return false; } catch { return true; }
  }), true);
  await page.evaluate(() => { window.koe.mini.katso('oikea'); });
  assert.equal(await page.evaluate(() => window.koe.mini.elementti.querySelector('svg').style.transform), 'scaleX(-1)');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => { window.koe.mini.reagoi(); window.koe.mini.tuhoa(); window.koe.mini.tuhoa(); });
  await page.waitForTimeout(750);
  assert.equal(await page.evaluate(() => document.querySelector('.minipulu-paikka').childElementCount), 0);
  assert.equal(await page.evaluate(() => window.koe.mini.reagoi()), false);
  assert.deepEqual(errors, []);
  await writeFile(`${out}/mittaukset.json`, JSON.stringify({ passed: true, results, errors }, null, 2) + '\n');
  console.log(JSON.stringify({ passed: true, out, sizes: results.map(r => [r.width, r.paintedHeight]) }));
} finally {
  await browser.close();
}
