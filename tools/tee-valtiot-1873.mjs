/*
 * VALTIOIDEN NIMET 1873 — Isoisän linssin nimipaketti (Karttaseppä 21.9.2026).
 *
 *   node tools/tee-valtiot-1873.mjs [--raaka <valtiot-1878-raaka.json>]
 *
 * Lukee historical-basemaps world_1878:sta lasketut nimiöpaikat (suurimman
 * alueen saavuttamattomuusnapa; tools/tee-rajat-1873.mjs:n rinnalla ajettu
 * laskenta, tiedosto ~/pyramidi-poltto/rajat-1873/valtiot-1878-raaka.json)
 * ja kirjoittaa js/packs/valtiot-1873.js suomenkielisin 1873-nimin.
 * Suomennostaulu NIMET on tässä tiedostossa: nimi, huomautus ja luokka
 * (1 itsenäinen, 2 vasalli/autonominen, 3 siirtomaa/alusmaa). Ilman
 * suomennosta jääneet (pienet afrikkalaiset ja tyynenmeren yksiköt) listataan
 * ajon lopussa — Sisältökirjuri täydentää tarvittaessa.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const TAALLA = dirname(fileURLToPath(import.meta.url));
const argi = process.argv.indexOf('--raaka');
const RAAKA = argi > 0 ? process.argv[argi + 1] : `${homedir()}/pyramidi-poltto/rajat-1873/valtiot-1878-raaka.json`;
const raaka = JSON.parse(readFileSync(RAAKA));
// NAME → [suomenkielinen nimi 1873, huomautus|null, luokka: 1 = itsenäinen, 2 = vasalli/autonominen, 3 = siirtomaa/alusmaa]
const NIMET = {
  'Russian Empire': ['VENÄJÄN KEISARIKUNTA', null, 1], Canada: ['KANADA', 'Britannian dominio 1867', 3], 'Manchu Empire': ['KIINAN KEISARIKUNTA', 'Qing-dynastia', 1],
  'United States of America': ['YHDYSVALLAT', null, 1], 'Kingdom of Brazil': ['BRASILIAN KEISARIKUNTA', null, 1], Greenland: ['GRÖNLANTI', 'Tanska', 3],
  'British Raj': ['BRITTILÄINEN INTIA', null, 3], 'Western Australia (UK)': ['LÄNSI-AUSTRALIA', 'Britannia', 3], Arabia: ['ARABIA', null, 1],
  'Ottoman Empire': ['OSMANIEN VALTAKUNTA', null, 1], Egypt: ['EGYPTI', 'Osmanien khedivaatti', 2], Persia: ['PERSIA', null, 1], Mexico: ['MEKSIKO', null, 1],
  Argentina: ['ARGENTIINA', null, 1], 'Queensland (UK)': ['QUEENSLAND', 'Britannia', 3], 'Sweden–Norway': ['RUOTSI-NORJA', 'unioni', 1], Bolivia: ['BOLIVIA', null, 1],
  Colombia: ['KOLUMBIA', null, 1], 'Northern Territory (UK)': ['POHJOISTERRITORIO', 'Britannia', 3], 'South Australia (UK)': ['ETELÄ-AUSTRALIA', 'Britannia', 3],
  Venezuela: ['VENEZUELA', null, 1], Peru: ['PERU', null, 1], 'Sokoto Caliphate': ['SOKOTON KALIFAATTI', null, 1], 'New South Wales (UK)': ['UUSI ETELÄ-WALES', 'Britannia', 3],
  'Austria Hungary': ['ITÄVALTA-UNKARI', null, 1], 'Rattanakosin Kingdom': ['SIAM', null, 1], Germany: ['SAKSAN KEISARIKUNTA', null, 1], Afghanistan: ['AFGANISTAN', null, 1],
  France: ['RANSKA', 'tasavalta', 1], 'Cape Colony': ['KAPMAA', 'Britannia', 3], Spain: ['ESPANJA', null, 1], 'Netherlands Indies': ['ALANKOMAIDEN INTIA', null, 3],
  'Algeria (FR)': ['ALGERIA', 'Ranska', 3], Morocco: ['MAROKKO', null, 1], Ecuador: ['ECUADOR', null, 1], Chile: ['CHILE', null, 1], 'Papua New Guinea': ['UUSI-GUINEA', null, 1],
  'Tukular Caliphate': ['TUKULORIEN VALTAKUNTA', null, 1], Madagascar: ['MADAGASKAR', 'Merinan kuningaskunta', 1],
  'United Kingdom of Great Britain and Ireland': ['BRITANNIA', 'Ison-Britannian ja Irlannin yhdistynyt kuningaskunta', 1], Italy: ['ITALIA', 'kuningaskunta', 1],
  Mozambique: ['MOSAMBIK', 'Portugali', 3], Transvaal: ['TRANSVAAL', 'buuritasavalta', 1], 'Kanem-Bornu': ['KANEM-BORNU', null, 1], Annam: ['ANNAM', null, 1],
  'Sultinate of Zanzibar': ['SANSIBAR', 'sulttaanikunta', 1], Paraguay: ['PARAGUAY', null, 1], 'Victoria (UK)': ['VICTORIA', 'Britannia', 3], Korea: ['KOREA', 'Joseon', 1],
  'Imperial Japan': ['JAPANI', 'keisarikunta', 1], Ethiopia: ['ABESSINIA', null, 1], Romania: ['ROMANIA', 'Osmanien vasalli 1873', 2], 'Wadai Empire': ['WADAI', null, 1],
  Iceland: ['ISLANTI', 'Tanska', 3], 'Bokhara Khanate': ['BUHARAN EMIRAATTI', null, 2], 'French Indochina': ['KOTŠINKIINA', 'Ranska', 3], 'Mossi States': ['MOSSI', null, 1],
  Uruguay: ['URUGUAY', null, 1], 'M?ori': ['UUSI-SEELANTI', 'Britannia', 3], Nepal: ['NEPAL', null, 1], 'Dutch Guiana': ['ALANKOMAIDEN GUAYANA', null, 3],
  'Orange Free State': ['ORANJEN VAPAAVALTIO', null, 1], Greece: ['KREIKKA', null, 1], Nicaragua: ['NICARAGUA', null, 1], 'British Guiana': ['BRITTILÄINEN GUAYANA', null, 3],
  Portugal: ['PORTUGALI', null, 1], Honduras: ['HONDURAS', null, 1], 'Senegal (FR)': ['SENEGAL', 'Ranska', 3], Oman: ['OMAN', null, 1], Guatemala: ['GUATEMALA', null, 1],
  Philippines: ['FILIPPIINIT', 'Espanja', 3], 'French Guiana': ['RANSKAN GUAYANA', null, 3], 'central Asian khanates': ['KOKAND', 'kaanikunta', 1],
  'Angola (Portugal)': ['ANGOLA', 'Portugali', 3], Serbia: ['SERBIA', 'Osmanien vasalli 1873', 2], Ceylon: ['CEYLON', 'Britannia', 3], Natal: ['NATAL', 'Britannia', 3],
  Ndebele: ['MATABELE', null, 1], Switzerland: ['SVEITSI', null, 1], Buganda: ['BUGANDA', null, 1], Netherlands: ['ALANKOMAAT', null, 1], Denmark: ['TANSKA', null, 1],
  Asante: ['ASANTE', null, 1], 'Costa Rica': ['COSTA RICA', null, 1], Belgium: ['BELGIA', null, 1], 'Dominican Republic': ['DOMINIKAANINEN TASAVALTA', null, 1],
  Liberia: ['LIBERIA', null, 1], Bhutan: ['BHUTAN', null, 1], Luxembourg: ['LUXEMBURG', null, 1], Montenegro: ['MONTENEGRO', 'de facto itsenäinen 1873', 2],
  'El Salvador': ['EL SALVADOR', null, 1], Haiti: ['HAITI', null, 1], 'Kingdom of Hawaii': ['HAVAIJI', 'kuningaskunta', 1], Fiji: ['FIDŽI', null, 1], Brunei: ['BRUNEI', null, 1],
  Zululand: ['ZULUMAA', null, 1], 'Gold Coast (GB)': ['KULTARANNIKKO', 'Britannia', 3], Dahomey: ['DAHOMEY', null, 1], Belize: ['BRITTILÄINEN HONDURAS', null, 3],
  'Sierra Leone': ['SIERRA LEONE', 'Britannia', 3], Cuba: ['KUUBA', 'Espanja', 3], Tonga: ['TONGA', null, 1], Samoa: ['SAMOA', null, 1], Swaziland: ['SWAZIMAA', null, 1],
  Basutoland: ['BASUTOMAA', 'Britannia', 3], Gambia: ['GAMBIA', 'Britannia', 3], 'Portuguese Guinea': ['PORTUGALIN GUINEA', null, 3], Taiwan: null,
};
// Pois: 1878-piirteet, joita ei ollut 1873
const POIS = new Set(['Bulgaria', 'Bosnia-Herzegovina', 'Congo', 'Wassoulou Empire', 'Cotonou', 'Griqualand West']);
const koko = (a) => (a > 100 ? 'suuri' : a > 3.5 ? 'keski' : 'pieni');
const rivit = []; const ilman = [];
for (const r of raaka) {
  if (POIS.has(r.n)) continue;
  const n = NIMET[r.n];
  if (!n) { ilman.push(`${r.n} (${r.ala}°², ${r.lon}, ${r.lat})`); continue; }
  rivit.push({ teksti: n[0], lahde: r.n, huom: n[1], luokka: n[2], lon: r.lon, lat: r.lat, koko: koko(r.ala) });
}
// Käsin siirretyt nimiöpaikat (napa osui mereen tai väärään kolkkaan)
const SIIRROT = { 'VENÄJÄN KEISARIKUNTA': [45, 57], 'BRITANNIA': [-1.8, 53.2], 'OSMANIEN VALTAKUNTA': [33, 39.5], 'KANADA': [-100, 57], 'YHDYSVALLAT': [-99, 39.5], 'SAKSAN KEISARIKUNTA': [11, 51.5], 'ITÄVALTA-UNKARI': [18.5, 47.6], 'RANSKA': [2.3, 47], 'ESPANJA': [-3.7, 40], 'ITALIA': [12.4, 43], 'RUOTSI-NORJA': [15, 62], 'KIINAN KEISARIKUNTA': [104, 35], 'BRASILIAN KEISARIKUNTA': [-50, -12], 'BRITTILÄINEN INTIA': [78, 22], 'EGYPTI': [30.5, 26.5], 'ALGERIA': [2.5, 34], 'GRÖNLANTI': [-42, 72] };
for (const r of rivit) if (SIIRROT[r.teksti]) [r.lon, r.lat] = SIIRROT[r.teksti];
rivit.sort((a, b) => a.teksti.localeCompare(b.teksti, 'fi'));
let s = `// VALTIOT 1873 — Isoisän linssin valtioiden nimet (Karttaseppä 21.9.2026, Sisältökirjuri tarkistaa).
//
// Lähde: historical-basemaps world_1878 (GPL-3.0) NAME-kenttä, 1878 → 1873:
// Bulgaria ja Bosnia-Hertsegovina pois (Osmanien), Romania/Serbia/Montenegro
// vasalleiksi (luokka 2), Ranskan Kongo ja Wassoulou pois (syntyivät 1878).
// Nimiöpaikka (lon/lat) on suurimman alueen saavuttamattomuusnapa; suurille
// valtakunnille käsin siirretty (tools/tee-valtiot-1873.mjs SIIRROT).
// Nimet suomalaisittain vakiintuneina 1873-muodossa (Abessinia, Persia, Siam,
// Kotšinkiina, Osmanien valtakunta); kaanon docs/isoisan-raamattu.md voittaa.
//
// luokka: 1 = itsenäinen valtio, 2 = vasalli/autonominen, 3 = siirtomaa/alusmaa
// koko: 'suuri' (> 100°²) ja 'keski' (> 3,5°²) näkyvät laudan uloimmalla zoomilla, 'pieni' lähempänä.

export const VALTIOT_1873 = [
`;
for (const r of rivit) s += `  { teksti: '${r.teksti}', lon: ${r.lon}, lat: ${r.lat}, luokka: ${r.luokka}, koko: '${r.koko}'${r.huom ? `, huom: '${r.huom.replace(/'/g, "\\'")}'` : ''}, lahde: '${r.lahde.replace(/'/g, "\\'")}' },\n`;
s += '];\n';
writeFileSync(join(TAALLA, '../js/packs/valtiot-1873.js'), s);
console.log('nimiä', rivit.length); console.log('ILMAN SUOMENNOSTA (jätetty pois):'); console.log(ilman.join('\n'));
