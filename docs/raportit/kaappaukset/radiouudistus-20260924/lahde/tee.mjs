// Radiouudistuksen havainnekuvat → ULOS (JPEG). node tee.mjs <ulos>
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { teePaneeli, TYYLI, SUODIN, vuMittari } from './paneeli.js';
import { masto, KOOT, MAARITTEET } from './mastot.js';

const T = dirname(fileURLToPath(import.meta.url));
const ULOS = process.argv[2];
mkdirSync(ULOS, { recursive: true });
const b64 = (f) => 'data:image/png;base64,' + readFileSync(join(T, f)).toString('base64');

// Kaupungit kallistetussa kuvassa (40°, 47N 6E, 2600 km; 1024 × 1366 pt), koko = asukasluvun luokka.
const K = [
  ['Lontoo', 350, 455, 'iso'], ['Pariisi', 382, 588, 'iso'], ['Berliini', 720, 492, 'iso'],
  ['Madrid', 118, 952, 'iso'], ['Rooma', 802, 882, 'iso'],
  ['Amsterdam', 470, 482, 'keski'], ['Bryssel', 446, 532, 'keski'], ['Praha', 762, 562, 'keski'],
  ['Wien', 872, 618, 'keski'], ['Kööpenhamina', 662, 402, 'keski'], ['Tukholma', 808, 292, 'keski'],
  ['Oslo', 592, 272, 'keski'], ['Dublin', 152, 402, 'keski'], ['Varsova', 935, 472, 'keski'],
  ['Luxemburg', 502, 578, 'pieni'], ['Bern', 560, 662, 'pieni'], ['Ljubljana', 802, 722, 'pieni'], ['Zagreb', 868, 738, 'pieni'],
];
const VALITTU = 'Pariisi';
const mk = (y) => Math.max(0.55, Math.min(1.1, 0.55 + 0.55 * (y - 250) / 800));
// Satunnainen mutta toistettava vilkkutila
let siemen = 7; const arpa = () => (siemen = (siemen * 16807) % 2147483647) / 2147483647;

function yovalot(valittu) {
  // Black Marblen sijainen: himmeät pisteet kaupunkien ympärillä, valitun ympärillä kirkkaat.
  let s = '';
  for (const [n, x, y] of K) {
    const lahella = Math.hypot(x - valittu[1], (y - valittu[2]) / 0.77) < 230;
    const m = lahella ? 26 : 9;
    for (let i = 0; i < m; i++) {
      const a = arpa() * Math.PI * 2, r = Math.pow(arpa(), 1.6) * (lahella ? 60 : 34) * mk(y);
      const rr = (lahella ? 2.4 : 1.4) * (0.5 + arpa());
      s += `<circle cx="${x + Math.cos(a) * r}" cy="${y + Math.sin(a) * r * 0.77}" r="${rr * 3}" fill="url(#kaupunkivalo)" opacity="${lahella ? 0.9 : 0.35}"/>`;
    }
  }
  // lisäksi pieniä taajamia tasaisesti
  for (let i = 0; i < 160; i++) {
    const x = arpa() * 1024, y = 330 + arpa() * 820, r = 1 + arpa() * 1.5;
    const lahella = Math.hypot(x - valittu[1], (y - valittu[2]) / 0.77) < 230;
    s += `<circle cx="${x}" cy="${y}" r="${r * 3}" fill="url(#kaupunkivalo)" opacity="${lahella ? 0.75 : 0.18}"/>`;
  }
  return s;
}

function renkaat(x, y, sateet, suhde = 0.77) {
  return sateet.map(([r, a]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * suhde}" fill="none" stroke="#ff7a4a" stroke-width="2" opacity="${a}"/>
    <ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * suhde}" fill="none" stroke="#ffb08a" stroke-width="6" opacity="${a * 0.18}"/>`).join('');
}

function mastokerros(valittu, { vuValo = 1 } = {}) {
  let s = '';
  const jarj = [...K].sort((a, b) => a[2] - b[2]);
  for (const [n, x, y, koko] of jarj) {
    const v = n === valittu;
    const valot = KOOT[koko].valot.map(() => v || arpa() > 0.45);
    if (v) s += `<ellipse cx="${x}" cy="${y}" rx="${110 * vuValo}" ry="${85 * vuValo}" fill="url(#maavalo)"/>`;
    s += masto(x, y, koko, { mittakaava: mk(y) * (v ? 1.08 : 1), valot, valittu: v });
    if (v) s += `<text x="${x + 16}" y="${y + 18}" font-family="Georgia,serif" font-size="15" fill="#ffd9b0" letter-spacing="2" style="paint-order:stroke" stroke="#1a0f06" stroke-width="3">PARIISI</text>`;
  }
  return s;
}

const sivu = (runko, l, k, lisa = '') => `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{margin:0;background:#1b120a;width:${l}px;height:${k}px;overflow:hidden;font-family:Georgia,serif}
  ${TYYLI}${lisa}</style></head><body>${SUODIN}${runko}</body></html>`;

const kuvat = {};

// 1. PÄÄKUVA: iPad 1024 × 1366, hämärä, mastot, renkaat, paneeli
{
  const p = K.find((k) => k[0] === VALITTU);
  const paneeli = teePaneeli({ leveys: 640, vuL: 118, vuK: 84, lcdL: 408, lcdK: 84, lamppu: 30, asteikkoK: 42,
    rivit: ['RADIO FRANCE', 'PARIISI · RANSKA'], vuTaso: 0.72,
    kaupungit: ['LONTOO', 'MADRID', 'BRYSSEL', 'LUXEMBURG', 'PARIISI', 'BERN', 'AMSTERDAM', 'OSLO', 'ROOMA'], soiva: 'PARIISI' });
  kuvat['1-paakuva-ipad'] = sivu(`
    <div style="position:absolute;inset:0;background:url(${b64('kall-hamara-p.png')}) 0 0/1024px 1366px"></div>
    <svg width="1024" height="1366" style="position:absolute;inset:0"><defs>${MAARITTEET}</defs>
      <g style="mix-blend-mode:screen">${yovalot(p)}</g>
      ${renkaat(p[1], p[2], [[95, 0.55], [215, 0.34], [330, 0.16]])}
      ${mastokerros(VALITTU)}
    </svg>
    <div style="position:absolute;left:0;top:62px;width:370px;height:310px;box-sizing:border-box;padding:18px 18px;background:linear-gradient(180deg,rgba(20,12,5,.97),rgba(20,12,5,.97) 90%,rgba(20,12,5,.0));border-radius:0 0 14px 0;color:#f0d9b5;font:13px/1.45 Georgia,serif">
      <b style="letter-spacing:1px">HAVAINNEKUVA</b><br>Kartta on natiivin kuvakaappaus hämärän sävyllä (kerroin 0,30/0,29/0,36 lineaarisessa tilassa). Mastot, renkaat ja yövalot on piirretty päälle. Pinnat ovat proseduraalisia sijaisia kuvaputken tekstuureille.</div>
    <div style="position:absolute;left:${(1024 - 640) / 2}px;bottom:22px">${paneeli}</div>`, 1024, 1366);
}

// 2. PANEELI: iPad ja iPhone rinnakkain, mitat
{
  const ipad = teePaneeli({ leveys: 640, vuL: 118, vuK: 84, lcdL: 408, lcdK: 84, lamppu: 30, asteikkoK: 42,
    rivit: ['RADIO FRANCE', 'PARIISI · RANSKA'], vuTaso: 0.72,
    kaupungit: ['LONTOO', 'MADRID', 'BRYSSEL', 'LUXEMBURG', 'PARIISI', 'BERN', 'AMSTERDAM', 'OSLO', 'ROOMA'], soiva: 'PARIISI' });
  const iphone = teePaneeli({ leveys: 393, vuL: 76, vuK: 56, lcdL: 244, lcdK: 58, lamppu: 20, asteikkoK: 36,
    rivit: ['RADIO FRANCE', 'PARIISI · RANSKA'], vuTaso: 0.72, pyoristys: '14px 14px 0 0',
    kaupungit: ['BRYSSEL', 'LUXEMBURG', 'PARIISI', 'BERN', 'AMSTERDAM'], soiva: 'PARIISI' });
  const mitta = (t) => `<div style="color:#e9d2a8;font:12px/1.4 Menlo,monospace;margin:8px 0 18px">${t}</div>`;
  kuvat['2-paneeli-mitat'] = sivu(`<div style="padding:28px 32px;background:#2a2016;height:100%;box-sizing:border-box">
    <div style="color:#f4e2c0;font:bold 17px Georgia;margin-bottom:12px;letter-spacing:1px">iPad (1024 pt): kotelo 640 × 172 pt, alareunasta 22 pt</div>
    ${ipad}
    ${mitta('rivi 1: VU 118 × 84 · väli 10 · LCD-lasi 424 × 84 (16 × 2 merkkiä, piste 4,25 pt) · väli 10 · lamppu ⌀ 30<br>rivi 2: viivain 612 × 42 (9 nimeä, viisari keskellä) · kehykset messinkiä 4 pt · kotelon reunus 12–14 pt')}
    <div style="color:#f4e2c0;font:bold 17px Georgia;margin:6px 0 12px;letter-spacing:1px">iPhone (393 pt): kotelo koko leveys × 150 pt + turva-alue puun sisään</div>
    ${iphone}
    ${mitta('rivi 1: VU 76 × 56 · LCD-lasi 260 × 58 (piste 2,54 pt) · lamppu ⌀ 20<br>rivi 2: viivain 365 × 36 (5 nimeä) · sama rakenne, samat tekstuurit')}
    <div style="color:#cdb58c;font:12px/1.5 Georgia;max-width:900px">Tekstuurit (kuvaputken tilaus d5928ae06): puu → kotelo, messinki → kehykset ja lampun rengas, lasi (naarmut) → LCD:n ja VU:n kansi, asteikkopaperi → VU-levy ja viivain. Kangasta ei tarvita: kaiutinverkolle ei jää tilaa kummallakaan laitteella. Normal- ja roughness-kartat leivotaan värikuvaan kiinteällä valolla vasemmalta ylhäältä, koska UI Toolkit ei valaise kuvia.</div>
  </div>`, 1024, 580);
}

// 3. MASTOT: kolme kokoa, sivukuva ja mitat
{
  let svg = `<svg width="1024" height="436"><defs>${MAARITTEET}</defs>
    <rect width="1024" height="436" fill="#2b2a2f"/><rect y="330" width="1024" height="106" fill="#3b3226"/>`;
  const rivit = [['iso', 200, 'asukkaita ≥ 3 milj.', 'harustettu ristikkomasto, 3 valotasoa', '64 pt', '900 km'],
    ['keski', 512, '0,5–3 milj.', 'itsekantava ristikkotorni, 2 valotasoa', '46 pt', '600 km'],
    ['pieni', 824, '< 0,5 milj.', 'putkimasto, 1 valo', '30 pt', '350 km']];
  for (const [k, x, raja, kuvaus, kork, sade] of rivit) {
    svg += masto(x, 330, k, { mittakaava: 3.4 });
    svg += `<text x="${x}" y="360" fill="#f4e2c0" font-family="Georgia" font-size="18" text-anchor="middle" font-weight="bold">${KOOT[k].nimi.toUpperCase()} · ${raja}</text>`;
    svg += `<text x="${x}" y="382" fill="#d8c29a" font-family="Georgia" font-size="13" text-anchor="middle">${kuvaus}</text>`;
    svg += `<text x="${x}" y="402" fill="#d8c29a" font-family="Menlo" font-size="11.5" text-anchor="middle">${kork} ruudulla (2 600 km)</text>`;
    svg += `<text x="${x}" y="420" fill="#d8c29a" font-family="Menlo" font-size="11.5" text-anchor="middle">kuuluvuus ${sade}</text>`;
  }
  svg += `<text x="20" y="28" fill="#f4e2c0" font-family="Georgia" font-size="15">Mittakaava 3,4 × (valittu masto: sama muoto, valot VU:n tahdissa ja voimakkaampi hehku, ks. pääkuva). Kaikki valot punaisia kuten lentoestevaloissa.</text></svg>`;
  kuvat['3-mastot-kolme-kokoa'] = sivu(svg, 1024, 436);
}

// 4. AIKAJANA: aseman vaihto ja linssin avaus
{
  const L = 1024, x0 = 190, s = 200; // 200 px / s
  const X = (t) => x0 + t * s;
  const palkki = (y, a, b, v, t, kayra = '') => `<rect x="${X(a)}" y="${y}" width="${X(b) - X(a)}" height="20" rx="4" fill="${v}"/><text x="${X(a) + 6}" y="${y + 14}" font-size="11.5" fill="#1a1208" font-family="Menlo">${t}</text>${kayra ? `<text x="${X(b) + 6}" y="${y + 14}" font-size="11" fill="#bfa77e" font-family="Menlo">${kayra}</text>` : ''}`;
  const nimi = (y, t) => `<text x="${x0 - 12}" y="${y + 14}" font-size="13" fill="#f4e2c0" font-family="Georgia" text-anchor="end">${t}</text>`;
  let svg = `<svg width="${L}" height="490"><rect width="${L}" height="490" fill="#231a12"/>
    <text x="20" y="30" font-family="Georgia" font-size="17" fill="#f4e2c0" font-weight="bold">A. Aseman vaihto (napautus hetkellä 0; viritysvaiheet ovat webin kaava, radio.js)</text>`;
  const akseli = (ya, yb) => { for (let t = 0; t <= 4; t += 0.5) svg += `<line x1="${X(t)}" y1="${ya}" x2="${X(t)}" y2="${yb}" stroke="#4a3b2a" stroke-width="${t % 1 ? 0.5 : 1}"/><text x="${X(t)}" y="${ya - 4}" fill="#bfa77e" font-size="11" font-family="Menlo" text-anchor="middle">${t.toFixed(1)} s</text>`; };
  akseli(58, 300);
  let y = 64;
  const r = (n, ...p) => { svg += nimi(y, n) + p.map((q) => palkki(y, ...q)).join(''); y += 26; };
  r('viivain', [0, 1.25, '#d9b86a', 'siirtymä 1,25 nykäyksin'], [1.25, 2.28, '#b99a62', 'haku ≥ 1,03'], [2.28, 2.6, '#f2c05e', 'lukko']);
  r('kohina / lähetys', [0, 0.6, '#9c8a70', 'kohina ↑ 0,6 sin'], [2.28, 3.18, '#e0a060', '→ lähetys 0,9']);
  r('rahina (uusi)', [0, 2.28, '#7e7466', 'taso = f(asteikkoetäisyys), ks. kaava']);
  r('kamera-ajo', [0, 2.28, '#8fb0c8', 'kaari, Kuminauha (ylitys 0,25)', 'saapuu lukkoon']);
  r('vanha masto', [0, 1.2, '#c86a50', 'vilkkuun 0,4 · renkaat pois 1,2']);
  r('uusi masto', [2.6, 2.9, '#ff7a4a', 'VU-tahtiin 0,3'], [2.6, 3.4, '#ffb08a', 'maavalo 0 → 1, 0,8']);
  r('renkaat', [2.6, 4.0, '#ff9a6a', '1. rengas; uusi 1,6 s välein']);
  r('kaupunkien valot', [2.6, 3.8, '#ffd480', 'säde 0 → 230 km, 1,2 Pehmeä']);
  r('LCD', [0, 2.6, '#6a5a44', 'VIRITTÄÄ / aseman nimi rullaa'], [2.6, 2.9, '#f2c05e', 'nimi']);
  y += 34;
  svg += `<text x="20" y="${y}" font-family="Georgia" font-size="17" fill="#f4e2c0" font-weight="bold">B. Linssin avaus ja sulku</text>`;
  y += 30; akseli(y - 6, y + 4 * 26);
  const s2 = 200;
  r('hämärä', [0, 1.5, '#6b7a99', 'pergamentti → hämärä 1,5 Pehmeä']);
  r('mastot nousevat', [0.3, 1.5, '#b9a88e', 'kukin 0,6 Nousu, porras ≤ 0,6']);
  r('valot + vilkku', [1.2, 1.8, '#ff5a3a', 'syttyvät 0,6']);
  r('sulku', [0, 0.8, '#6b7a99', 'käänteisesti 0,8']);
  svg += `</svg>`;
  kuvat['4-aikajana'] = sivu(svg, L, 490);
}

// 5. RAHINA: taso asteikon etäisyyden mukaan
{
  const L = 1024, K = 380, x0 = 70, y0 = 300, lev = 880, kor = 240;
  let polkuK = '', polkuL = '';
  for (let i = 0; i <= 200; i++) {
    const d = i / 200 * 1.0; // asemaväleinä 0…1 (0 = asemalla, 0,5 = puolivälissä)
    const e = Math.min(d, 1 - d); // lähimpään asemaan
    const sig = Math.max(0, 1 - e / 0.18); const u = Math.pow(sig, 2);
    const lah = Math.sin(u * Math.PI / 2), koh = Math.cos(u * Math.PI / 2);
    const x = x0 + d * lev;
    polkuK += `${i ? 'L' : 'M'}${x} ${y0 - koh * kor}`; polkuL += `${i ? 'L' : 'M'}${x} ${y0 - lah * kor}`;
  }
  const svg = `<svg width="${L}" height="${K}"><rect width="${L}" height="${K}" fill="#231a12"/>
    <text x="20" y="28" font-family="Georgia" font-size="17" fill="#f4e2c0" font-weight="bold">C. Rahina, kun viivainta vedetään sormella kahden aseman välillä</text>
    <line x1="${x0}" y1="${y0}" x2="${x0 + lev}" y2="${y0}" stroke="#6a5a44"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 - kor}" stroke="#6a5a44"/>
    <path d="${polkuK}" fill="none" stroke="#9c8a70" stroke-width="3"/><path d="${polkuL}" fill="none" stroke="#f2c05e" stroke-width="3"/>
    <text x="${x0 + 6}" y="${y0 + 22}" fill="#f4e2c0" font-size="13" font-family="Georgia">asema A</text>
    <text x="${x0 + lev - 60}" y="${y0 + 22}" fill="#f4e2c0" font-size="13" font-family="Georgia">asema B</text>
    <text x="${x0 + lev / 2}" y="${y0 + 22}" fill="#bfa77e" font-size="12" font-family="Menlo" text-anchor="middle">puoliväli: pelkkää rahinaa</text>
    <text x="${x0 + 300}" y="${y0 - kor - 8}" fill="#9c8a70" font-size="13" font-family="Menlo">rahina = cos(u·π/2)</text>
    <text x="${x0 + 300}" y="${y0 + 40}" fill="#f2c05e" font-size="13" font-family="Menlo">lähetys = sin(u·π/2)</text>
    <text x="${x0 + 250}" y="${y0 - 140}" fill="#d8c29a" font-size="12.5" font-family="Menlo">u = (1 − e / 0,18)², e = etäisyys lähimpään asemaan asemaväleinä</text>
    <text x="${x0 + 250}" y="${y0 - 118}" fill="#d8c29a" font-size="12.5" font-family="Menlo">tasatehoinen pari kuten webin RISTIHAIVYTYS</text>
    <text x="${x0 + 250}" y="${y0 - 96}" fill="#d8c29a" font-size="12.5" font-family="Menlo">irrotus → lähin asema: webin lukko 0,32 s + 0,9 s</text>
  </svg>`;
  kuvat['5-rahina'] = sivu(svg, L, K);
}

const pw = await import(process.env.PLAYWRIGHT_JS ?? '/Users/Shared/Claude/Matkakirja-fable/node_modules/playwright/index.js');
const chromium = pw.chromium ?? pw.default?.chromium;
const selain = await chromium.launch();
for (const [nimi, html] of Object.entries(kuvat)) {
  const m = html.match(/width:(\d+)px;height:(\d+)px/);
  const sivuO = await selain.newPage({ viewport: { width: +m[1], height: +m[2] }, deviceScaleFactor: 1 });
  await sivuO.setContent(html);
  await sivuO.waitForTimeout(200);
  await sivuO.screenshot({ path: join(ULOS, nimi + '.jpg'), type: 'jpeg', quality: 84 });
  await sivuO.close();
  console.log('kuva', nimi);
}
await selain.close();
