// AJATTELIJAT NATIIVIIN (Linssiseppä 2, 2.10.2026; Päätoimittaja: "tee natiivista samalla tavalla datapohjainen").
// Webin ajattelijadata (js/linssit/ajattelija-<tunnus>.js, Blender-koordinaatit sellaisinaan) → natiivin
// Assets/Matkakirja/Linssit/Resources/Ajattelijat/<tunnus>.json ja tekstiatlas <tunnus>-atlas.bytes (harmaasävy-PNG).
// Atlas piirretään Chromiumissa webin omalla piirraAtlas-funktiolla (js/linssit/ajattelija-projektori.js) samoilla
// järjestelmäfonteilla (Iowan Old Style, Baskerville, Times; iOS:llä samat), joten natiivin teksti on sama kuva kuin webin.
// Uusi ajattelija natiiviin = aja tämä uudelleen (ei koodimuutosta): moottori lukee kaikki Ajattelijat/*.json.
//
//   PLAYWRIGHT_JS=… node tyokalut/ajattelijat-natiiviin.mjs <webin juuri> [tunnus…]
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { deflateSync, crc32 } from 'node:zlib';
import { randomUUID } from 'node:crypto';

const [WEB0, ...valitut] = process.argv.slice(2);
if (!WEB0) { console.error('käyttö: node tyokalut/ajattelijat-natiiviin.mjs <webin juuri> [tunnus…]'); process.exit(2); }
const WEB = resolve(WEB0);
const PROTO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ULOS = join(PROTO, 'Assets/Matkakirja/Linssit/Resources/Ajattelijat');
mkdirSync(ULOS, { recursive: true });

// Ajattelijat webin datamoduuleista (ei projektori/moottori).
const LINSSIT = join(WEB, 'js/linssit');
const tiedostot = readdirSync(LINSSIT).filter((f) => /^ajattelija-[a-z0-9-]+\.js$/.test(f) && f !== 'ajattelija-projektori.js');
const ajattelijat = [];
for (const f of tiedostot) {
  const m = await import(pathToFileURL(join(LINSSIT, f)).href);
  for (const v of Object.values(m)) if (v && typeof v === 'object' && typeof v.tunnus === 'string' && v.paalauseet) ajattelijat.push(v);
}
const kohteet = ajattelijat.filter((a) => !valitut.length || valitut.includes(a.tunnus));
if (!kohteet.length) { console.error('ei ajattelijoita', valitut); process.exit(1); }

// Atlaksen rivit kuten webin avaaAjattelija (päälause 192 px sumealla parilla + taustavirran rivit 96 px toistona).
function atlasRivit(a) {
  const fontti = (n) => a.fontit[n] ?? a.fontit.iowan;
  const lause = a.paalauseet[a.kierros.paalause];
  return [
    { teksti: lause.fi, fontti: fontti('iowan').perhe, paino: fontti('iowan').paino, korkeus: 192, sumea: true, emOsuus: 1.15 },
    ...a.taustavirta.rivit.map(([, f, teksti]) => ({ teksti, fontti: fontti(f).perhe, paino: fontti(f).paino, korkeus: 96, toisto: true })),
  ];
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript' };
const palvelin = createServer((q, s) => {
  const polku = decodeURIComponent(q.url.split('?')[0]);
  if (polku === '/') { s.writeHead(200, { 'content-type': MIME['.html'] }); s.end('<!doctype html><meta charset="utf-8"><body></body>'); return; }
  const p = join(WEB, polku.replace(/^\/+/, ''));
  if (!p.startsWith(WEB) || !existsSync(p)) { s.writeHead(404); s.end(); return; }
  s.writeHead(200, { 'content-type': MIME[extname(p)] ?? 'application/octet-stream' });
  s.end(readFileSync(p));
});
await new Promise((r) => palvelin.listen(8772, r));
const pw = await import(process.env.PLAYWRIGHT_JS);
const selain = await (pw.chromium ?? pw.default.chromium).launch();
const sivu = await selain.newPage();
await sivu.goto('http://127.0.0.1:8772/');

/** 8-bittinen harmaasävy-PNG (värityyppi 0) R-kanavasta. */
function harmaaPng(lev, kork, r) {
  const rivi = lev + 1;
  const raaka = Buffer.alloc(rivi * kork);
  for (let y = 0; y < kork; y += 1) { raaka[y * rivi] = 0; r.copy(raaka, y * rivi + 1, y * lev, (y + 1) * lev); }
  const pala = (tyyppi, data) => {
    const p = Buffer.alloc(4); p.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(tyyppi, 'ascii'), data]);
    const c = Buffer.alloc(4); c.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([p, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(lev, 0); ihdr.writeUInt32BE(kork, 4); ihdr[8] = 8; ihdr[9] = 0; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), pala('IHDR', ihdr), pala('IDAT', deflateSync(raaka, { level: 9 })), pala('IEND', Buffer.alloc(0))]);
}

function varmistaMeta(tiedosto) {
  const meta = `${tiedosto}.meta`;
  if (existsSync(meta)) return;
  writeFileSync(meta, `fileFormatVersion: 2\nguid: ${randomUUID().replace(/-/g, '')}\nTextScriptImporter:\n  externalObjects: {}\n  userData: \n  assetBundleName: \n  assetBundleVariant: \n`);
}

for (const a of kohteet) {
  const tulos = await sivu.evaluate(async (rivit) => {
    const { piirraAtlas } = await import('/js/linssit/ajattelija-projektori.js');
    await document.fonts.ready;
    const { kangas, paikat } = piirraAtlas(rivit);
    const d = kangas.getContext('2d').getImageData(0, 0, kangas.width, kangas.height).data;
    const r = new Uint8Array(kangas.width * kangas.height);
    for (let i = 0; i < r.length; i += 1) r[i] = d[i * 4];
    let b = '';
    for (let i = 0; i < r.length; i += 0x8000) b += String.fromCharCode(...r.subarray(i, i + 0x8000));
    return { leveys: kangas.width, korkeus: kangas.height, paikat: paikat.map(({ y, korkeus, lev, uMax, sumea, toistoja }) => ({ y, korkeus, lev, uMax, sumea: !!sumea, toistoja: toistoja ?? 1 })), r: btoa(b) };
  }, atlasRivit(a));
  const png = harmaaPng(tulos.leveys, tulos.korkeus, Buffer.from(tulos.r, 'base64'));
  const atlasNimi = `${a.tunnus}-atlas.bytes`;
  writeFileSync(join(ULOS, atlasNimi), png);
  varmistaMeta(join(ULOS, atlasNimi));
  const data = { ...JSON.parse(JSON.stringify(a)), atlas: { tiedosto: `Ajattelijat/${a.tunnus}-atlas`, leveys: tulos.leveys, korkeus: tulos.korkeus, paikat: tulos.paikat } };
  const json = join(ULOS, `${a.tunnus}.json`);
  writeFileSync(json, `${JSON.stringify(data, null, 1)}\n`);
  varmistaMeta(json);
  console.log(`${a.tunnus}: ${json.replace(PROTO + '/', '')}, atlas ${tulos.leveys}×${tulos.korkeus} (${(png.length / 1024).toFixed(0)} kt, ${tulos.paikat.length} riviä)`);
}
await selain.close();
palvelin.close();
