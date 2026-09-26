#!/usr/bin/env node
// LAATTAPAKETTI ILMAN EDITORIA (Natiiviseppä 25.9.2026, löydös 80 / esilatauspolitiikan kohta 1).
//
// Lataa pallon kaukonäkymän sarjat ämpäristä yhdeksi tiedostoksi (muoto: Assets/Matkakirja/Kartta/Laattapaketti.cs).
// Sama sisältö kuin editorin työkalulla (Assets/Matkakirja/Editor/LaattapakettiRakennus.cs, -executeMethod
// Matkakirja.Editori.LaattapakettiRakennus.Luo). Sarjojen versiot luetaan pelin lähdekoodista, jotta paketti vastaa
// käännettävää peliä:
//   pohja        Rakennus.LaattaUrl                        Z0–Z5   (Web Mercator, jpg)
//   maasto       Rakennus.MaastoUrl (layer.json)           Z0–Z5   (quantized-mesh, layer.jsonin available-alueet)
//   bmng         KarttaKerrokset.SatelliittiVersio/Meri    Z0–Z5   (lennon Blue Marble: valintanäkymä ja musta verho)
//   vektorit     Vektorikerros.OletusVersio                luettelo + l0–l2 (rannikko, rajat)
//   napakalotit  NapaKannet.KalottiVersio/KalottiPaate     pohjoinen, etela
//
// Käyttö:
//   node tyokalut/laattapaketti.mjs [--ulos <polku>] [--rinnakkain 24] [--mittaa]
//   oletus --ulos: Build/laattapaketti/laattapaketti.bin (Rakennus.Kaanna kopioi sen Xcode-projektin Data/Raw/:iin)
//   --mittaa: vain laattamäärät ja koot (lataa silti kaiken, ei kirjoita tiedostoa)
// Paketti EI kuulu gitiin (ei LFS:ää, .gitignore: /Build/).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AMPARI = 'https://media.matkakirja.app/';
const JUURI = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TASOT = { pohja: [0, 5], maasto: [0, 5], bmng: [0, 5], vektorit: 2 };

const arg = (nimi, oletus) => {
  const i = process.argv.indexOf(nimi);
  return i >= 0 ? process.argv[i + 1] : oletus;
};
const ULOS = path.resolve(arg('--ulos', path.join(JUURI, 'Build/laattapaketti/laattapaketti.bin')));
const RINNAKKAIN = Number(arg('--rinnakkain', 24));
const MITTAA = process.argv.includes('--mittaa');

// ---- Vakiot pelin lähteistä ----
const lahde = (p) => fs.readFileSync(path.join(JUURI, 'Assets/Matkakirja', p), 'utf8');
function vakio(teksti, nimi, tiedosto) {
  const m = teksti.match(new RegExp(nimi + '\\s*=\\s*("([^"]*)"|([A-Za-z_]\\w*))'));
  if (!m) throw new Error(`vakio ${nimi} puuttuu tiedostosta ${tiedosto}`);
  return m[2] !== undefined ? m[2] : vakio(teksti, m[3], tiedosto);
}
const rakennus = lahde('Editor/Rakennus.cs');
const kerrokset = lahde('Kartta/KarttaKerrokset.cs');
const vektorit = lahde('Kartta/Vektorikerros.cs');
const navat = lahde('Kartta/NapaKannet.cs');
const pois = (u) => { if (!u.startsWith(AMPARI)) throw new Error('ei ämpärissä: ' + u); return u.slice(AMPARI.length); };
const pohjaMalli = pois(vakio(rakennus, 'LaattaUrl', 'Rakennus.cs'));
const maastoLayer = pois(vakio(rakennus, 'MaastoUrl', 'Rakennus.cs'));
const satJuuri = pois(vakio(kerrokset, 'SatelliittiJuuri', 'KarttaKerrokset.cs'));
const satVersio = vakio(kerrokset, 'SatelliittiVersio', 'KarttaKerrokset.cs');
const satMeri = vakio(kerrokset, 'SatelliittiMeri', 'KarttaKerrokset.cs');
const vektoriVersio = vakio(vektorit, 'OletusVersio', 'Vektorikerros.cs');
const kalottiVersio = vakio(navat, 'KalottiVersio', 'NapaKannet.cs');
const kalottiPaate = vakio(navat, 'KalottiPaate', 'NapaKannet.cs');

const kansio = (malli) => malli.slice(0, malli.indexOf('{z}'));
const tayta = (m, z, x, y) => m.replace('{z}', z).replace('{x}', x).replace('{reverseY}', y).replace('{y}', y);
// Sama kuin Laattapaketti.Avain / Laattapalvelin.Tiedosto.
function avain(polku) {
  const q = polku.indexOf('?');
  if (q < 0) return polku;
  const osat = polku.slice(q + 1).split('&').filter((o) => o.length > 0 && !o.startsWith('extensions='));
  return polku.slice(0, q) + (osat.length ? '__' + osat.join('_').replaceAll('/', '_').replaceAll('=', '-') : '');
}

// ---- Lataus ----
// Sama kuin Laattapalvelin.KuvaEhja: JPEG alkaa FF D8 ja päättyy FF D9 (enintään 16 täytetavun päässä).
function kuvaEhja(polku, d) {
  if (!polku.toLowerCase().endsWith('.jpg')) return true;
  if (d.length < 4 || d[0] !== 0xff || d[1] !== 0xd8) return false;
  for (let i = d.length - 2; i >= Math.max(2, d.length - 18); i--) if (d[i] === 0xff && d[i + 1] === 0xd9) return true;
  return false;
}
async function hae(polku, yritykset = 4) {
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(AMPARI + polku);
      if (r.status === 404 || r.status === 403) return null;
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const b = Buffer.from(await r.arrayBuffer());
      if (!kuvaEhja(polku, b)) throw new Error('katkennut JPEG');
      return b;
    } catch (e) {
      if (i + 1 >= yritykset) throw new Error(`${polku}: ${e.message}`);
      await new Promise((ok) => setTimeout(ok, 500 * (i + 1) ** 2));
    }
  }
}
async function haeKaikki(polut) {
  const tulos = new Array(polut.length);
  let seuraava = 0;
  await Promise.all(Array.from({ length: RINNAKKAIN }, async () => {
    while (seuraava < polut.length) { const i = seuraava++; tulos[i] = await hae(polut[i]); }
  }));
  return tulos;
}

// ---- Sarjat ----
const sarjat = [];
function sarja(nimi, etuliite, polut) { sarjat.push({ nimi, etuliite, polut }); }

{
  const m = pohjaMalli, p = [];
  for (let z = TASOT.pohja[0]; z <= TASOT.pohja[1]; z++)
    for (let x = 0; x < 1 << z; x++) for (let y = 0; y < 1 << z; y++) p.push(tayta(m, z, x, y));
  sarja('pohja', kansio(m), p);
}
{
  const et = maastoLayer.slice(0, maastoLayer.lastIndexOf('/') + 1);
  const layer = JSON.parse((await hae(maastoLayer)).toString('utf8'));
  const malli = layer.tiles[0];
  const p = [maastoLayer];
  for (let z = TASOT.maasto[0]; z <= TASOT.maasto[1]; z++)
    for (const a of layer.available?.[z] ?? [])
      for (let x = a.startX; x <= a.endX; x++) for (let y = a.startY; y <= a.endY; y++) p.push(et + tayta(malli, z, x, y));
  sarja('maasto', et, p);
}
{
  const m = satJuuri + satVersio + '/' + satMeri + '/{z}/{x}/{y}.jpg', p = [];
  for (let z = TASOT.bmng[0]; z <= TASOT.bmng[1]; z++)
    for (let x = 0; x < 1 << z; x++) for (let y = 0; y < 1 << z; y++) p.push(tayta(m, z, x, y));
  sarja(satMeri, kansio(m), p);
}
{
  const et = 'julisteet/pallo/vektorit/' + vektoriVersio + '/';
  const luettelo = JSON.parse((await hae(et + 'luettelo.json')).toString('utf8'));
  const p = [et + 'luettelo.json'];
  for (const [laji, d] of Object.entries(luettelo.lajit))
    for (const t of d.tasot) if (t.k <= TASOT.vektorit)
      for (const s of Object.keys(t.tiedostot)) p.push(`${et}${laji}/l${t.k}/${s}.bin`);
  sarja('vektorit', et, p);
}
{
  const et = `julisteet/pallo/napakalotit/${kalottiVersio}/`;
  sarja('napakalotit', et, ['pohjoinen', 'etela'].map((n) => `${et}${n}.${kalottiPaate}`));
}

// ---- Ajo ----
const rivit = [];
let kaikki = 0;
for (let si = 0; si < sarjat.length; si++) {
  const s = sarjat[si];
  const alku = Date.now();
  const data = await haeKaikki(s.polut);
  let n = 0, tavut = 0, puuttuu = 0;
  data.forEach((d, i) => {
    if (!d) { puuttuu++; return; }
    const a = avain(s.polut[i]);
    if (!a.startsWith(s.etuliite)) throw new Error('avain ei sarjassa: ' + a);
    rivit.push({ sarja: si, loppu: a.slice(s.etuliite.length), data: d });
    n++; tavut += d.length;
  });
  kaikki += tavut;
  s.laattoja = n; s.tavuja = tavut;
  console.log(`${s.nimi.padEnd(12)} ${s.etuliite}\n             ${n} tiedostoa, ${(tavut / 1048576).toFixed(2)} Mt` +
    `${puuttuu ? `, ${puuttuu} puuttuu ämpäristä (404)` : ''}, ${((Date.now() - alku) / 1000).toFixed(0)} s`);
}
console.log(`yhteensä ${rivit.length} tiedostoa, ${(kaikki / 1048576).toFixed(2)} Mt`);
if (MITTAA) process.exit(0);

// ---- Kirjoitus (Laattapaketti.Kirjoita) ----
const kokoavain = (r) => sarjat[r.sarja].etuliite + r.loppu;
rivit.sort((a, b) => (kokoavain(a) < kokoavain(b) ? -1 : kokoavain(a) > kokoavain(b) ? 1 : 0));
const osat = [];
const mj = (t) => { const b = Buffer.from(t, 'utf8'); const l = Buffer.alloc(2); l.writeUInt16LE(b.length); osat.push(l, b); };
for (const s of sarjat) { mj(s.etuliite); mj(s.nimi); }
let a0 = 0n;
for (const r of rivit) {
  const i = Buffer.alloc(4); i.writeInt32LE(r.sarja); osat.push(i);
  mj(r.loppu);
  const t = Buffer.alloc(12); t.writeBigInt64LE(a0, 0); t.writeInt32LE(r.data.length, 8); osat.push(t);
  a0 += BigInt(r.data.length);
}
const hakemisto = Buffer.concat(osat);
const otsake = Buffer.alloc(28);
otsake.write('MKLAATT1', 0, 'ascii');
otsake.writeInt32LE(1, 8);
otsake.writeInt32LE(sarjat.length, 12);
otsake.writeInt32LE(rivit.length, 16);
otsake.writeBigInt64LE(BigInt(28 + hakemisto.length), 20);
fs.mkdirSync(path.dirname(ULOS), { recursive: true });
const tmp = ULOS + '.tmp';
const fd = fs.openSync(tmp, 'w');
fs.writeSync(fd, otsake);
fs.writeSync(fd, hakemisto);
for (const r of rivit) fs.writeSync(fd, r.data);
fs.closeSync(fd);
fs.renameSync(tmp, ULOS);
console.log(`kirjoitettu ${ULOS} (${(fs.statSync(ULOS).size / 1048576).toFixed(2)} Mt, hakemisto ${(hakemisto.length / 1024).toFixed(0)} kt)`);
