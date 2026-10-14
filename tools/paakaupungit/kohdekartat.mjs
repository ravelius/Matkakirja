// Pääkaupunkien kohdekarttojen pohjat Codexin erälle (PILVIOHJE luku 12 kohta 3; Karttaseppä 11.10.2026).
//
//   node tools/paakaupungit/kohdekartat.mjs <paakaupungit-pilvi> <erä> [--piirra]
//
// Lukee erän <id>/sisalto.json:n kohdekartan (kohteet + Codexin rajat) ja päättää per kaupunki:
//   VANHA KUVA — kaupungilla on jo kohdekartta (Afrikan 42, #4405 + #4412), ja kaikki Codexin kohteet
//                mahtuvat sen rajoihin vähintään REUNA metrin päähän reunasta: kuva ja rajat säilyvät,
//                vain kohteet ja esittely vaihtuvat (nähtävyysjutut ovat Codexin kohteiden nimillä).
//   PIIRRÄ     — muuten. Rajat ovat Codexin rajat korjattuina: vähintään REUNA metriä kohteista,
//                leveys vähintään MIN_KM, sivusuhde 0,6–1,4 (laajennetaan lyhyempää sivua).
//   PALLOPISTE (PT 13.10.2026): rajat sisältävät AINA myös kaupungin pallopisteen (sisalto.kaupunki.pallo), myös
//                VANHA KUVA -päätöksessä — muuten keskusta voi jäädä pois (Canberra: kohteina vain kolme kukkulaa).
//   PIKSELIVARA (PT 13.10.2026, juna 189): REUNA-metrien lisäksi kohde ei saa jäädä iPhonella eikä iPadilla reunaan, opasteen,
//                Kokoruutu-vihjeen eikä mittajanan alle (karttavarat.mjs; Canberran Mount Majura oli opasteen alla 7 km:n kartalla).
// --vain id,id rajaa --piirra-vaiheen nimettyihin kaupunkeihin (kohdekartat-mac.json kirjoitetaan silti koko erälle).
// Tulos <data>/<erä>/kohdekartat-mac.json; kytke-pilvisisalto.mjs käyttää sen rajat ja polun.
// --piirra lisää PIIRRÄ-kaupungit tools/piirra-kaupunkikartta.mjs:n KAUPUNGIT-tauluun ja piirtää ne
// (Overpass, 6 s tauko välissä). Katso kuvat silmin ja aja tarkista-karttapisteet kytkennän jälkeen.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { KAUPUNKIKARTAT } from '../../js/packs/maakartat.js';
import { kaikkiRikkeet, korjaaVarat } from './karttavarat.mjs';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '../..');
const [data, era] = process.argv.slice(2);
const PIIRRA = process.argv.includes('--piirra');
const VAIN = process.argv.includes('--vain') ? process.argv[process.argv.indexOf('--vain') + 1].split(',') : null;
const REUNA = 150; // m
const MIN_KM = 1.2;
const PALLOVARA = 0.15; // pallopiste vähintään 15 % lyhyemmästä sivusta reunasta (PT 13.10.2026)
const mLat = 110574;
const mLon = (lat) => 111320 * Math.cos((lat * Math.PI) / 180);

function sopii(r, kohteet, laajennus = null) {
  const lat0 = (r.pohjoinen + r.etela) / 2;
  if (kaikkiRikkeet(r, kohteet, { laajennus }).length) return false;
  return kohteet.every((k) => (r.pohjoinen - k.lat) * mLat >= REUNA && (k.lat - r.etela) * mLat >= REUNA
    && (r.ita - k.lon) * mLon(lat0) >= REUNA && (k.lon - r.lansi) * mLon(lat0) >= REUNA);
}
function korjaa(r0, kohteet, pallo = null) {
  const lat = kohteet.map((k) => k.lat), lon = kohteet.map((k) => k.lon);
  const lat0 = (Math.max(...lat) + Math.min(...lat)) / 2;
  const dLat = REUNA * 2 / mLat, dLon = REUNA * 2 / mLon(lat0); // 300 m marginaali kuten PILVIOHJE
  const r = {
    pohjoinen: Math.max(r0?.pohjoinen ?? -90, Math.max(...lat) + dLat),
    etela: Math.min(r0?.etela ?? 90, Math.min(...lat) - dLat),
    ita: Math.max(r0?.ita ?? -180, Math.max(...lon) + dLon),
    lansi: Math.min(r0?.lansi ?? 180, Math.min(...lon) - dLon),
  };
  let w = (r.ita - r.lansi) * mLon(lat0), h = (r.pohjoinen - r.etela) * mLat;
  if (pallo) { // PALLOVARA: kaupunki ei reunaan (PT 13.10.: São Tomé 5 %, Yaoundé 3 % lyhyemmästä sivusta)
    const v = PALLOVARA * Math.min(w, h), vLat = v / mLat, vLon = v / mLon(lat0);
    r.pohjoinen = Math.max(r.pohjoinen, pallo.lat + vLat); r.etela = Math.min(r.etela, pallo.lat - vLat);
    r.ita = Math.max(r.ita, pallo.lon + vLon); r.lansi = Math.min(r.lansi, pallo.lon - vLon);
    w = (r.ita - r.lansi) * mLon(lat0); h = (r.pohjoinen - r.etela) * mLat;
  }
  const kasvata = (ak, km) => { // ak 'w' | 'h': kasvata keskeltä
    if (ak === 'w') { const d = (km - w) / 2 / mLon(lat0); r.ita += d; r.lansi -= d; w = km; }
    else { const d = (km - h) / 2 / mLat; r.pohjoinen += d; r.etela -= d; h = km; }
  };
  if (w < MIN_KM * 1000) kasvata('w', MIN_KM * 1000);
  if (h < MIN_KM * 800) kasvata('h', MIN_KM * 800);
  if (h / w > 1.4) kasvata('w', h / 1.4);
  if (h / w < 0.6) kasvata('h', w * 0.6);
  const p = (v) => Math.round(v * 1e4) / 1e4;
  const v = korjaaVarat({ pohjoinen: p(r.pohjoinen), etela: p(r.etela), lansi: p(r.lansi), ita: p(r.ita) }, kohteet).rajat;
  w = (v.ita - v.lansi) * mLon(lat0); h = (v.pohjoinen - v.etela) * mLat;
  return { ...v, leveys_km: Math.round(w / 100) / 10, korkeus_km: Math.round(h / 100) / 10 };
}

const kansio = join(data, era);
const tulos = {};
for (const id of readdirSync(kansio).filter((x) => existsSync(join(kansio, x, 'sisalto.json'))).sort()) {
  const sis = JSON.parse(readFileSync(join(kansio, id, 'sisalto.json'), 'utf8')), k = sis.kohdekartta;
  if (!k?.kohteet?.length) { tulos[id] = { paatos: 'EI KOHDEKARTTAA' }; continue; }
  const pallo = sis.kaupunki?.pallo;
  const pisteet = Number.isFinite(pallo?.lat) && Number.isFinite(pallo?.lon) ? [...k.kohteet, pallo] : k.kohteet;
  const vanha = KAUPUNKIKARTAT[id];
  if (vanha && existsSync(join(JUURI, vanha.polku)) && sopii(vanha.rajat, pisteet, vanha.piirtoRajat ? 1.6 : null)) {
    tulos[id] = { paatos: 'VANHA KUVA', polku: vanha.polku, rajat: vanha.rajat, ...(vanha.laajennus ? { laajennus: vanha.laajennus } : {}) };
    continue;
  }
  const { leveys_km, korkeus_km, ...rajat } = korjaa(k.rajat, pisteet, pisteet.length > k.kohteet.length ? pallo : null);
  tulos[id] = { paatos: 'PIIRRÄ', polku: `assets/kartat/${id}-keskusta.png`, rajat, koko: `${leveys_km} × ${korkeus_km} km`,
    ...(vanha ? { huom: 'vanha kuva ei kata kohteita: korvataan' } : {}) };
}
writeFileSync(join(kansio, 'kohdekartat-mac.json'), JSON.stringify(tulos, null, 1) + '\n');
for (const [id, t] of Object.entries(tulos)) console.log(`${id.padEnd(26)} ${t.paatos}${t.koko ? ` ${t.koko}` : ''}${t.huom ? ` (${t.huom})` : ''}`);

if (PIIRRA) {
  const polku = join(JUURI, 'tools/piirra-kaupunkikartta.mjs');
  for (const [id, t] of Object.entries(tulos)) {
    if (t.paatos !== 'PIIRRÄ' || (VAIN && !VAIN.includes(id))) continue;
    let s = readFileSync(polku, 'utf8');
    const a = s.indexOf('const KAUPUNGIT = {');
    const loppu = s.indexOf('\n};', a);
    const rivi = `  ${id}: {\n    rajat: { pohjoinen: ${t.rajat.pohjoinen}, etela: ${t.rajat.etela}, lansi: ${t.rajat.lansi}, ita: ${t.rajat.ita} },\n  },`;
    // Vanhalla rivillä voi olla lisäkenttiä (meri, meriHaku, kommentit): vaihdetaan vain rajat-rivi, muuten
    // taulun loppuun syntyisi samanniminen avain, joka voittaa ja pudottaa lisäkentät (13.10.2026: Conakry, Luanda… ilman merta).
    const vanha = new RegExp(`(\\n  ${id}: \\{\\n(?:    //[^\\n]*\\n|\\s*\\n)*)    rajat: \\{[^}]*\\},`);
    const taulu = s.slice(a, loppu);
    if (vanha.test(taulu)) s = s.slice(0, a) + taulu.replace(vanha, `$1    rajat: { pohjoinen: ${t.rajat.pohjoinen}, etela: ${t.rajat.etela}, lansi: ${t.rajat.lansi}, ita: ${t.rajat.ita} },`) + s.slice(loppu);
    else s = s.slice(0, loppu) + `\n  // PÄÄKAUPUNKI ${era} (Codex, kohdekartat.mjs)\n${rivi}` + s.slice(loppu);
    writeFileSync(polku, s);
    console.log(`\npiirretään ${id}…`);
    execFileSync('node', [polku, id], { cwd: JUURI, stdio: 'inherit' });
    await new Promise((r) => setTimeout(r, 6000));
  }
}
