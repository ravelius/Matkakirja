/*
 * GPU-väistö (omistaja 28.9.2026 "GPU-VÄISTÖ AUTOMAATTISEKSI", täsmennys
 * 12.3x: vain lippu /tmp/matkakirja-kevyt): tools/gpu-vapaa.sh ja
 * tools/savukkeet/gpu-vaisto.mjs:n rivipäätökset ilman selaimia.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { gpuTila, gpuVaisto, webkitRivi, savukkeenLahde, SWIFTSHADER } from '../tools/savukkeet/gpu-vaisto.mjs';
import { rakennaMatriisi } from '../tools/savukkeet/rakenna-matriisi.mjs';

const SKRIPTI = fileURLToPath(new URL('../tools/gpu-vapaa.sh', import.meta.url));
const kansio = mkdtempSync(join(tmpdir(), 'gpu-vapaa-'));
const LIPPU = join(kansio, 'matkakirja-kevyt');
test.after(() => rmSync(kansio, { recursive: true, force: true }));

function aja(env) {
  return spawnSync(SKRIPTI, [], { encoding: 'utf8', env: { ...process.env, GPU_VAPAA_LIPPU: LIPPU, ...env } });
}

test('gpu-vapaa.sh: lippu ratkaisee, GPU_VAPAA_PAKOTA ohittaa', () => {
  rmSync(LIPPU, { force: true });
  let r = aja({ GPU_VAPAA_PAKOTA: '' });
  assert.equal(r.status, 0);
  assert.equal(r.stdout, '');
  writeFileSync(LIPPU, '');
  r = aja({ GPU_VAPAA_PAKOTA: '' });
  assert.equal(r.status, 1);
  assert.equal(r.stdout.trim(), 'kevyt tila (omistaja tarvitsee konetta)');
  r = aja({ GPU_VAPAA_PAKOTA: '1' });
  assert.equal(r.status, 0);
  rmSync(LIPPU, { force: true });
  r = aja({ GPU_VAPAA_PAKOTA: '0' });
  assert.equal(r.status, 1);
  assert.equal(r.stdout.trim(), 'pakotettu');
});

test('gpuTila: SAVUKE_GPU ohittaa, lippu antaa syyn "kevyt tila"', () => {
  assert.equal(gpuTila({ SAVUKE_GPU: 'vapaa' }).varattu, false);
  assert.equal(gpuTila({ SAVUKE_GPU: 'varattu' }).varattu, true);
  writeFileSync(LIPPU, '');
  const t = gpuTila({ ...process.env, SAVUKE_GPU: '', GPU_VAPAA_PAKOTA: '', GPU_VAPAA_LIPPU: LIPPU });
  assert.deepEqual(t, { varattu: true, syy: 'kevyt tila', kuvaus: 'kevyt tila (omistaja tarvitsee konetta)' });
  rmSync(LIPPU, { force: true });
  assert.equal(gpuTila({ ...process.env, SAVUKE_GPU: '', GPU_VAPAA_PAKOTA: '', GPU_VAPAA_LIPPU: LIPPU }).varattu, false);
});

const VARATTU = { varattu: true, syy: 'kevyt tila', kuvaus: 'kevyt tila (omistaja tarvitsee konetta)' };

test('gpuVaisto: GPU vapaa → ei muutoksia', () => {
  for (const rivi of rakennaMatriisi('taysi')) {
    assert.deepEqual(gpuVaisto(rivi, { varattu: false }, savukkeenLahde(rivi.tiedosto), undefined), { env: {} });
  }
});

test('gpuVaisto: WebKit- ja suorituskykyrivit ohitetaan, muut Chromiumilla SwiftShaderilla', () => {
  const rivit = rakennaMatriisi('taysi');
  const paatos = (r) => gpuVaisto(r, VARATTU, savukkeenLahde(r.tiedosto), undefined);
  let ohitettu = 0;
  let ajettu = 0;
  for (const rivi of rivit) {
    const p = paatos(rivi);
    const pitaaOhittaa = rivi.env?.SAVUKE_SUORITUSKYKY === '1' || /-webkit$/.test(rivi.nimiTunniste)
      || rivi.env?.SAVUKE_MOOTTORI === 'webkit';
    if (pitaaOhittaa) assert.equal(p.ohita, 'GPU varattu (kevyt tila)', rivi.nimiTunniste);
    if (p.ohita) { ohitettu++; continue; }
    ajettu++;
    assert.ok(!webkitRivi(rivi, savukkeenLahde(rivi.tiedosto)), rivi.nimiTunniste);
    const liput = p.env.SAVUKE_CHROMIUM_LIPUT ?? rivi.env?.SAVUKE_CHROMIUM_LIPUT ?? '';
    assert.match(liput, /--use-(gl|angle)=/, `${rivi.nimiTunniste}: ei GL-taustaa`);
  }
  // Toiminnallinen sarja ajetaan pääosin: ohitettuja on vähemmistö.
  assert.ok(ajettu > ohitettu * 2, `ajettu ${ajettu}, ohitettu ${ohitettu}`);
});

test('gpuVaisto: rivin omat liput säilyvät ja swiftshader lisätään perään', () => {
  const aani = rakennaMatriisi('savuke-astro-aani.mjs')[0];
  const p = gpuVaisto(aani, VARATTU, '', undefined);
  assert.equal(p.env.SAVUKE_CHROMIUM_LIPUT, `--disable-features=AudioServiceOutOfProcess ${SWIFTSHADER}`);
  // Oma GL-valinta voittaa.
  const oma = { nimiTunniste: 'x', env: { SAVUKE_CHROMIUM_LIPUT: '--use-angle=metal' } };
  assert.deepEqual(gpuVaisto(oma, VARATTU, '', undefined), { env: {} });
  // Kahden selaimen savuke (Chromium-osa toiminnallinen) ei ole WebKit-rivi.
  assert.equal(webkitRivi({ nimiTunniste: 'savuke-laivamatka-tanger', env: {} },
    savukkeenLahde('savuke-laivamatka-tanger.mjs')), false);
  // Oletuksena WebKit ilman env-valintaa on WebKit-rivi; chromium-valinta ei.
  const lahde = "const MOOTTORI = process.env.SAVUKE_MOOTTORI ?? 'webkit';";
  assert.equal(webkitRivi({ nimiTunniste: 'x', env: {} }, lahde), true);
  assert.equal(webkitRivi({ nimiTunniste: 'x', env: { SAVUKE_MOOTTORI: 'chromium' } }, lahde), false);
});

test('yhteenveto näyttää ohitetun rivin OHITETTU-tilana eikä OK:na', () => {
  const tulokset = mkdtempSync(join(kansio, 'tulokset-'));
  writeFileSync(join(tulokset, 'tulos-a.json'), JSON.stringify({
    tiedosto: 'savuke-a.mjs#webkit', kesto: 0, tulosJson: { lapi: 0, yhteensa: 0, uusiaPunaisia: 0 }, ohitettu: 'GPU varattu (kevyt tila)',
  }));
  writeFileSync(join(tulokset, 'tulos-b.json'), JSON.stringify({
    tiedosto: 'savuke-b.mjs', kesto: 3, tulosJson: { lapi: 2, yhteensa: 2, uusiaPunaisia: 0 },
  }));
  const r = spawnSync(process.execPath, [fileURLToPath(new URL('../tools/savukkeet/kirjoita-yhteenveto.mjs', import.meta.url)), tulokset], { encoding: 'utf8' });
  assert.equal(r.status, 0);
  assert.match(r.stdout, /\| savuke-a\.mjs#webkit \| — \(OHITETTU: GPU varattu \(kevyt tila\)\) \|/);
  assert.match(r.stdout, /0 uutta punaista, 1 savuketta \(\+ 1 ohitettu\)/);
});
