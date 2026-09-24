/*
 * Vedoskuva yhdestä pyramiditasosta paikallisista laatoista (Mac Studion
 * polttokansiot): pohja 2026-09-22 + ranta + viivat 2026-09-22 + maan nostot
 * + nimiötaso g → jpg. Käytetty CHE 26 kanttonin vedokseen (sveitsi-z6..z8.jpg).
 *
 *   node docs/raportit/kaappaukset/maakuntavedos-20260921/vedos4/kokoa-alue.mjs \
 *     <z> <lon0,lat0,lon1,lat1> <ulos.jpg> [ISO]
 *
 * Projektio on pelin Miller (js/geo.js): x = (lon − lon0)/360 · leveys,
 * y = sk · (yP − 1,25·ln tan(π/4 + 0,4φ)), laattapikselit arkin kulmasta
 * pikseliaPerYksikkö-kertoimella. Kokoaminen kahdessa vaiheessa, koska
 * sharpin extract ennen compositea tekisi kankaasta laattaa pienemmän.
 */
const sharp = (await import('../../../../../node_modules/sharp/dist/index.cjs')).default;
import { existsSync, readFileSync, readdirSync } from 'node:fs';
const [z, alue, ulos, iso = 'CHE'] = [Number(process.argv[2]), process.argv[3], process.argv[4], process.argv[5]];
const [lon0, lat0, lon1, lat1] = alue.split(',').map(Number);
const A22 = '/Users/koodaus/pyramidi-poltto/ajo-20260922';
const A21 = '/Users/samireivinen/pyramidi-poltto/ajo-20260921';
const luettelo = JSON.parse(readFileSync(`${A22}/luettelo/pyramidi.json`, 'utf8'));
const P = luettelo.projektio; const arkki = luettelo.arkki; const T = luettelo.laatta;
const taso = luettelo.tasot.find((t) => t.z === z); const ppu = taso.pikseliaPerYksikko;
const RAD = Math.PI / 180; const sk = P.leveys / (2 * Math.PI);
const yP = 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * P.pohjoinen * RAD));
const px = (lon, lat) => [
  ((((lon - P.lon0) % 360) + 360) % 360) / 360 * P.leveys,
  sk * (yP - 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RAD))),
].map((u, i) => (u - (i ? arkki.y : arkki.x)) * ppu);
const [x0, y0] = px(lon0, lat1).map(Math.round); const [x1, y1] = px(lon1, lat0).map(Math.round);
const W = x1 - x0; const H = y1 - y0;
const s0 = Math.floor(x0 / T); const s1 = Math.floor((x1 - 1) / T); const r0 = Math.floor(y0 / T); const r1 = Math.floor((y1 - 1) / T);
const rantaKansiot = z <= 7 ? [`${A21}/ranta-z0-z7/ranta`] : readdirSync(A21).filter((k) => k.startsWith('ranta-z8-')).map((k) => `${A21}/${k}/ranta`);
const nostoKansiot = readdirSync(A22).filter((k) => k.startsWith('nosto-') && k.endsWith(`-${iso}`)).map((k) => `${A22}/${k}/nostot/${iso}`);
const kerrokset = [
  `${A22}/lahde-levylta/2026-09-22-pohja`,
  ...rantaKansiot,
  `${A22}/lahde-levylta/2026-09-22-viivat/viivat`,
  ...nostoKansiot,
  `${A22}/nimio-2026-09-22g-nimiot/nimiot`,
];
const composites = []; let n = 0;
for (const k of kerrokset) {
  if (!existsSync(`${k}/z${z}`)) { console.log('puuttuu', `${k}/z${z}`); continue; }
  for (let x = s0; x <= s1; x += 1) for (let y = r0; y <= r1; y += 1) {
    const p = `${k}/z${z}/${x}/${y}.webp`;
    if (existsSync(p)) { composites.push({ input: p, left: x * T - s0 * T, top: y * T - r0 * T }); n += 1; }
  }
}
const kangas = sharp({ create: { width: (s1 - s0 + 1) * T, height: (r1 - r0 + 1) * T, channels: 4, background: { r: 230, g: 222, b: 205, alpha: 1 } } });
const koottu = await kangas.composite(composites).png().toBuffer();
await sharp(koottu).extract({ left: x0 - s0 * T, top: y0 - r0 * T, width: W, height: H }).jpeg({ quality: 88 }).toFile(ulos);
console.log('valmis', ulos, `${W}x${H}`, n, 'laattaa', `laatat x${s0}-${s1} y${r0}-${r1}`);
