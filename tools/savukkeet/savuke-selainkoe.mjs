// SELAINKOE — väliaikainen luotain: mitkä selaimen käynnistystavat toimivat
// savukeajurilla (SamiMacStudio2), kun ajurin istunnolla ei ole näyttöä.
// Ei kuulu mihinkään sarjaan; ajetaan workflow_dispatchilla nimellä.
const pw = await import(process.env.PLAYWRIGHT_JS || 'playwright').then((m) => m.default ?? m);
const CFT = process.env.CHROMIUM;
const kokeet = [
  ['webkit', {}],
  ['chromium', { executablePath: CFT }],
  ['chromium', { executablePath: CFT, args: ['--use-angle=metal', '--ignore-gpu-blocklist'] }],
  ['chromium', { executablePath: CFT, args: ['--headless=old'] }],
  ['chromium', {}],
  ['chromium', { args: ['--use-angle=metal', '--ignore-gpu-blocklist'] }],
  ['chromium', { args: ['--use-gl=angle', '--use-angle=swiftshader'] }],
];
for (const [laji, lisa] of kokeet) {
  const nimi = `${laji} ${lisa.executablePath ? 'CfT' : 'oletus'} ${(lisa.args ?? []).join(' ')}`.trim();
  const t = Date.now();
  let b;
  try {
    b = await pw[laji].launch({ headless: true, timeout: 40000, ...lisa });
    const p = await b.newPage();
    await p.setContent('<canvas id=c></canvas>');
    const r = await p.evaluate(() => { const g = document.getElementById('c').getContext('webgl'); if (!g) return 'ei webgl'; const d = g.getExtension('WEBGL_debug_renderer_info'); return d ? g.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'webgl'; });
    const raf = await p.evaluate(() => new Promise((res) => { let n = 0; const t0 = performance.now(); const f = () => { if (++n === 30) res(`${(performance.now() - t0).toFixed(0)} ms/30 rAF`); else requestAnimationFrame(f); }; requestAnimationFrame(f); setTimeout(() => res(`rAF jumissa n=${n}`), 5000); }));
    const kuva = await p.screenshot().then((x) => `kuva ${x.length} t`).catch((e) => `kuva VIRHE ${e.message.split('\n')[0]}`);
    console.log(`OK    ${nimi} — ${Date.now() - t} ms, ${r}, ${raf}, ${kuva}`);
  } catch (e) {
    console.log(`FAIL  ${nimi} — ${Date.now() - t} ms, ${String(e.message).split('\n')[0]}`);
  } finally {
    await b?.close().catch(() => {});
  }
}
