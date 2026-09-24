// Radiopaneelin havainnekuva (Linssiseppä 24.9.2026): proseduraaliset pinnat kuvaputken tekstuurien sijaisina.
// teePaneeli(el, { leveys, vu, lcd, lamppu, asteikko, rivit, vuTaso, kaupungit, soiva })
export function pisteRivi(teksti, merkit, pist, vali, vari, himmea) {
  // 5×7-pistematriisi (Pistenaytto: 16 merkkiä, 6 pistettä merkkiä kohti)
  const F = {
    ' ': [0,0,0,0,0,0,0], A:[14,17,17,31,17,17,17], B:[30,17,17,30,17,17,30], C:[14,17,16,16,16,17,14],
    D:[30,17,17,17,17,17,30], E:[31,16,16,30,16,16,31], F:[31,16,16,30,16,16,16], G:[14,17,16,23,17,17,15],
    H:[17,17,17,31,17,17,17], I:[14,4,4,4,4,4,14], J:[7,2,2,2,2,18,12], K:[17,18,20,24,20,18,17],
    L:[16,16,16,16,16,16,31], M:[17,27,21,21,17,17,17], N:[17,17,25,21,19,17,17], O:[14,17,17,17,17,17,14],
    P:[30,17,17,30,16,16,16], R:[30,17,17,30,20,18,17], S:[15,16,16,14,1,1,30], T:[31,4,4,4,4,4,4],
    U:[17,17,17,17,17,17,14], V:[17,17,17,17,17,10,4], Y:[17,17,10,4,4,4,4], Z:[31,1,2,4,8,16,31],
    Ö:[10,0,14,17,17,17,14], Ä:[10,0,14,17,31,17,17], '.':[0,0,0,0,0,12,12], '·':[0,0,0,4,0,0,0],
    '0':[14,17,19,21,25,17,14], '1':[4,12,4,4,4,4,14], '4':[2,6,10,18,31,2,2], '-':[0,0,0,31,0,0,0],
  };
  const t = teksti.toUpperCase().padEnd(merkit).slice(0, merkit);
  let s = '';
  [...t].forEach((c, i) => {
    const g = F[c] ?? F[' '];
    for (let y = 0; y < 7; y++) for (let x = 0; x < 5; x++) {
      const on = (g[y] >> (4 - x)) & 1;
      const cx = (i * 6 + x) * vali + vali / 2, cy = y * vali + vali / 2;
      s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${pist}" fill="${on ? vari : himmea}"/>`;
    }
  });
  return s;
}

export function vuMittari(l, k, taso) {
  const nx = l / 2, ny = k * 0.95, r = k * 0.72;
  const kulma = (-48 + 96 * taso) * Math.PI / 180;
  let jaot = '';
  for (let i = 0; i <= 10; i++) {
    const a = (-48 + 9.6 * i) * Math.PI / 180, r1 = r - (i % 5 === 0 ? 9 : 5);
    jaot += `<line x1="${nx + Math.sin(a) * r1}" y1="${ny - Math.cos(a) * r1}" x2="${nx + Math.sin(a) * r}" y2="${ny - Math.cos(a) * r}" stroke="${i >= 7 ? '#a8321f' : '#3b2a17'}" stroke-width="${i % 5 === 0 ? 1.6 : 1}"/>`;
  }
  const kaari = (a0, a1, v, w) => {
    const p = (a) => [nx + Math.sin(a * Math.PI / 180) * r, ny - Math.cos(a * Math.PI / 180) * r];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `<path d="M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}" fill="none" stroke="${v}" stroke-width="${w}"/>`;
  };
  return `<svg width="${l}" height="${k}" viewBox="0 0 ${l} ${k}">
    <defs>
      <radialGradient id="paperi" cx="50%" cy="85%" r="90%"><stop offset="0" stop-color="#f4e6bf"/><stop offset=".7" stop-color="#e2cf9c"/><stop offset="1" stop-color="#b99a62"/></radialGradient>
      <linearGradient id="lasi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".35" stop-color="#fff" stop-opacity=".06"/><stop offset=".36" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".04"/></linearGradient>
    </defs>
    <rect width="${l}" height="${k}" rx="4" fill="url(#paperi)"/>
    ${kaari(-48, 19.2, '#3b2a17', 1.2)}${kaari(19.2, 48, '#a8321f', 3)}
    ${jaot}
    <text x="${nx}" y="${ny - r * 0.42}" font-family="Georgia" font-size="${k * 0.13}" text-anchor="middle" fill="#3b2a17" letter-spacing="1">VU</text>
    <line x1="${nx}" y1="${ny}" x2="${nx + Math.sin(kulma) * r * 1.05}" y2="${ny - Math.cos(kulma) * r * 1.05}" stroke="#1f140a" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="${nx}" cy="${ny}" r="${k * 0.07}" fill="#2a1c0e"/>
    <rect width="${l}" height="${k}" rx="4" fill="url(#lasi)"/>
    <rect x=".5" y=".5" width="${l - 1}" height="${k - 1}" rx="4" fill="none" stroke="#000" stroke-opacity=".35"/>
  </svg>`;
}

export function teePaneeli({ leveys, vuL, vuK, lcdL, lcdK, lamppu, asteikkoK, rivit, vuTaso, kaupungit, soiva, pyoristys = '16px 16px 10px 10px' }) {
  const merkit = 16, vali = lcdL / (merkit * 6), pist = vali * 0.36;
  const lcdSvg = `<svg width="${lcdL}" height="${vali * 17}" viewBox="0 0 ${lcdL} ${vali * 17}">
      <g>${pisteRivi(rivit[0], merkit, pist, vali, '#f2c05e', 'rgba(242,192,94,.07)')}</g>
      <g transform="translate(0 ${vali * 9})">${pisteRivi(rivit[1], merkit, pist, vali, '#f2c05e', 'rgba(242,192,94,.07)')}</g></svg>`;
  const nimet = kaupungit.map((n) => `<span class="${n === soiva ? 'soiva' : ''}">${n}</span>`).join('');
  return `
  <div class="kotelo" style="width:${leveys}px;border-radius:${pyoristys}">
    <div class="puu"></div>
    <div class="rivi">
      <div class="kehys vu" style="width:${vuL}px;height:${vuK}px">${vuMittari(vuL, vuK, vuTaso)}</div>
      <div class="kehys lcd" style="width:${lcdL + 16}px;height:${lcdK}px"><div class="lasi">${lcdSvg}</div></div>
      <div class="lamppualue"><div class="lamppu" style="width:${lamppu}px;height:${lamppu}px"></div></div>
    </div>
    <div class="kehys asteikko" style="height:${asteikkoK}px">
      <div class="paperi"><div class="viivat"></div><div class="nimet">${nimet}</div><div class="viisari"></div></div>
    </div>
  </div>`;
}

export const TYYLI = `
.kotelo{position:relative;padding:12px 14px 12px;box-sizing:border-box;overflow:hidden;
  box-shadow:0 10px 28px rgba(0,0,0,.55),0 2px 0 rgba(255,220,160,.18) inset,0 -3px 0 rgba(0,0,0,.4) inset;
  background:#5a3518}
.puu{position:absolute;inset:0;
  background:
   radial-gradient(120% 70% at 30% 0%,rgba(255,200,130,.22),transparent 60%),
   repeating-linear-gradient(92deg,rgba(0,0,0,.0) 0 5px,rgba(0,0,0,.10) 5px 6px,rgba(0,0,0,0) 6px 13px,rgba(40,15,0,.14) 13px 15px),
   repeating-linear-gradient(88deg,rgba(255,190,120,.05) 0 23px,rgba(0,0,0,.08) 23px 31px,rgba(0,0,0,0) 31px 61px),
   linear-gradient(180deg,#8f5f2f,#6b4423 42%,#3a2410);
  filter:url(#syy)}
.rivi{position:relative;display:flex;align-items:center;gap:10px}
.kehys{position:relative;box-sizing:border-box;padding:4px;border-radius:7px;
  background:linear-gradient(160deg,#f0d898 0%,#b8924a 22%,#7a5a22 48%,#d9b86a 70%,#8a6428 100%);
  box-shadow:0 1px 0 rgba(255,240,200,.5) inset,0 2px 5px rgba(0,0,0,.55)}
.kehys.vu svg{display:block;width:100%;height:100%}
.kehys.lcd{padding:6px}
.lasi{height:100%;border-radius:4px;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(120% 90% at 50% 40%,#2c1806,#170b02);
  box-shadow:0 0 0 1px #000 inset,0 3px 10px rgba(0,0,0,.8) inset;position:relative;overflow:hidden}
.lasi::after{content:"";position:absolute;inset:0;background:linear-gradient(170deg,rgba(255,255,255,.16),rgba(255,255,255,.02) 38%,transparent 39%)}
.lamppualue{flex:1;align-self:stretch;display:flex;align-items:center;justify-content:center}
.lamppu{flex:none;border-radius:50%;
  background:radial-gradient(circle at 38% 32%,#ffd6c8 0,#ff5a3a 22%,#b0180a 55%,#4a0602 100%);
  box-shadow:0 0 0 3px #c9c3b6,0 0 0 4px #6d665a,0 0 14px 4px rgba(255,60,30,.55)}
.asteikko{margin-top:10px;padding:3px}
.paperi{position:relative;height:100%;border-radius:4px;overflow:hidden;
  background:linear-gradient(180deg,#f3e3bb,#e2cc95);box-shadow:0 2px 4px rgba(0,0,0,.35) inset}
.viivat{position:absolute;left:0;right:0;top:0;height:9px;
  background:repeating-linear-gradient(90deg,#3b2a17 0 1px,transparent 1px 8px),repeating-linear-gradient(90deg,#3b2a17 0 1.4px,transparent 1.4px 40px);
  -webkit-mask:linear-gradient(#000,#000);opacity:.8}
.nimet{position:absolute;left:0;right:0;bottom:4px;display:flex;justify-content:space-around;
  font:600 9px/1 Georgia,serif;letter-spacing:.8px;color:#4a3620}
.nimet .soiva{color:#1f140a;font-weight:800}
.viisari{position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:#c2452f;box-shadow:0 0 4px rgba(194,69,47,.7)}
`;

export const SUODIN = `<svg width="0" height="0" style="position:absolute"><filter id="syy"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.9" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .13  0 0 0 0 .04  0 0 0 .35 0"/><feBlend in="SourceGraphic" mode="multiply"/></filter></svg>`;
