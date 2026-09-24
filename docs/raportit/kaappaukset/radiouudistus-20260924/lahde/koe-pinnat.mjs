// Pintojen koekuva: paneeli leivotuilla tekstuureilla (radiopinnat.py), iPad 2× ja iPhone 2×.
import { readFileSync } from 'node:fs';
import { pisteRivi, vuMittari } from './paneeli.js';
const [, , KANSIO, ULOS] = process.argv;
const u = (n) => 'data:image/png;base64,' + readFileSync(`${KANSIO}/${n}.png`).toString('base64');
function paneeli({ leveys, vuL, vuK, lcdL, lcdK, lamppu, asteikkoK, nimet, soiva }) {
  const vali = lcdL / 96, pist = vali * 0.36;
  const lcd = `<svg width="${lcdL}" height="${vali * 17}"><g>${pisteRivi('RADIO FRANCE', 16, pist, vali, '#f2c05e', 'rgba(242,192,94,.07)')}</g><g transform="translate(0 ${vali * 9})">${pisteRivi('PARIISI · RANSKA', 16, pist, vali, '#f2c05e', 'rgba(242,192,94,.07)')}</g></svg>`;
  const vu = vuMittari(vuL - 8, vuK - 8, 0.7).replace(/<radialGradient id="paperi"[\s\S]*?<\/radialGradient>/, '').replace('fill="url(#paperi)"', 'fill="transparent"');
  return `<div class="kotelo" style="width:${leveys}px">
    <div class="rivi">
      <div class="kehys" style="width:${vuL}px;height:${vuK}px"><div class="vu">${vu}<div class="lasi"></div></div></div>
      <div class="kehys" style="width:${lcdL + 16}px;height:${lcdK}px"><div class="lcd">${lcd}<div class="lasi"></div></div></div>
      <div class="lamppualue"><div class="lamppu" style="width:${lamppu}px;height:${lamppu}px"></div></div>
    </div>
    <div class="kehys asteikko" style="height:${asteikkoK}px"><div class="paperi"><div class="viivat"></div><div class="nimet">${nimet.map((n) => `<span${n === soiva ? ' class="s"' : ''}>${n}</span>`).join('')}</div><div class="viisari"></div></div></div>
  </div>`;
}
const html = `<!doctype html><meta charset="utf-8"><style>
body{margin:0;background:#1d1812;width:1024px;height:560px;font-family:Georgia}
.kotelo{box-sizing:border-box;padding:14px 16px;border:22px solid transparent;border-image:url(${u('radio-kotelo')}) 40 fill / 22px;margin:0 0 8px;filter:drop-shadow(0 10px 18px rgba(0,0,0,.6))}
.kotelo{padding:0;border-width:16px}
.rivi{display:flex;align-items:center;gap:10px}
.kehys{box-sizing:border-box;border:5px solid transparent;border-image:url(${u('radio-kehys')}) 16 / 5px;border-radius:6px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.6))}
.vu{position:relative;width:100%;height:100%;background:url(${u('radio-vu-levy')}) center/cover}
.vu svg{display:block;width:100%;height:100%}
.lcd{position:relative;height:100%;display:flex;align-items:center;justify-content:center;background:radial-gradient(120% 90% at 50% 40%,#2c1806,#140902);box-shadow:0 3px 10px rgba(0,0,0,.8) inset}
.lasi{position:absolute;inset:0;background:url(${u('radio-lasi')}) center/100% 100%;pointer-events:none}
.lamppualue{flex:1;align-self:stretch;display:flex;align-items:center;justify-content:center}
.lamppu{flex:none;border-radius:50%;background:radial-gradient(circle at 38% 32%,#ffd6c8 0,#ff5a3a 22%,#b0180a 55%,#4a0602 100%);box-shadow:0 0 0 3px #d9b36a,0 0 0 4px #6d5a3a,0 0 14px 4px rgba(255,60,30,.55)}
.asteikko{margin-top:10px}
.paperi{position:relative;height:100%;background:url(${u('radio-viivain')}) left/auto 100% repeat-x;overflow:hidden}
.viivat{position:absolute;left:0;right:0;top:0;height:9px;background:repeating-linear-gradient(90deg,#3b2a17 0 1px,transparent 1px 8px),repeating-linear-gradient(90deg,#3b2a17 0 1.4px,transparent 1.4px 40px);opacity:.8}
.nimet{position:absolute;left:0;right:0;bottom:4px;display:flex;justify-content:space-around;font:600 9px Georgia;letter-spacing:.8px;color:#4a3620}.nimet .s{color:#1f140a;font-weight:800}
.viisari{position:absolute;left:50%;top:0;bottom:0;width:2px;background:#c2452f;box-shadow:0 0 4px rgba(194,69,47,.7)}
h2{color:#f4e2c0;font:bold 15px Georgia;margin:18px 30px 8px}
.w{padding:0 30px}
p{color:#cdb58c;font:12px/1.5 Georgia;margin:6px 30px}
</style>
<h2>iPad 640 × 172 pt, pinnat leivottu kuvaputken tekstuureista (radiopinnat.py)</h2>
<div class="w">${paneeli({ leveys: 640, vuL: 118, vuK: 84, lcdL: 408, lcdK: 84, lamppu: 30, asteikkoK: 42, nimet: ['LONTOO', 'MADRID', 'BRYSSEL', 'LUXEMBURG', 'PARIISI', 'BERN', 'AMSTERDAM', 'OSLO', 'ROOMA'], soiva: 'PARIISI' })}</div>
<h2>iPhone 393 pt</h2>
<div class="w">${paneeli({ leveys: 393, vuL: 76, vuK: 56, lcdL: 224, lcdK: 58, lamppu: 20, asteikkoK: 36, nimet: ['BRYSSEL', 'LUXEMBURG', 'PARIISI', 'BERN', 'AMSTERDAM'], soiva: 'PARIISI' })}</div>
<p>Puu ambientCG Wood027, kehykset Metal009 messingin sävyllä, lasi Plastic013B, paperi Paper006 (kaikki CC0). Valo on leivottu vasemmalta ylhäältä. Selaimen havainnekuva 2×:lla, natiivissa samat kuvat UI Toolkitin 9-slicenä.</p>`;
const pw = await import('/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js');
const b = await (pw.chromium ?? pw.default.chromium).launch();
const s = await b.newPage({ viewport: { width: 1024, height: 560 }, deviceScaleFactor: 2 });
await s.setContent(html); await s.waitForTimeout(300);
await s.screenshot({ path: ULOS, type: 'jpeg', quality: 85 }); await b.close();
