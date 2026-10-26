// Valmiiden luentojen avaimen testivektorit (Assets/Matkakirja/Peli/Valmisluennat.cs Avain). Sama funktio on esigeneroijan
// viite: jos natiivin avain ja tämä eroavat, valmiit tiedostot eivät osu (ajautumissuoja, Natiiviseppä 6.10.2026).
//   node tee-valmisluennat-avaimet.mjs > valmisluennat-avaimet.json
import { createHash } from 'node:crypto';
export function avain(teksti, malli, aani, nopeus, loppuTagi = '') {
  const s = `v1|${malli}|${aani}|${Number(nopeus).toFixed(2)}|${loppuTagi ?? ''}|${(teksti ?? '').normalize('NFC')}`;
  return createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 32);
}
const W = 'oae6GCCzwoEbfc5FHdEu';
const tapaukset = [
  { teksti: 'Pompeji. Vesuviuksen tuhka hautasi kaupungin vuonna 79.', malli: 'eleven_v4', aani: W, nopeus: 1.15, loppuTagi: '[pause]' },
  { teksti: 'Pompeji. Vesuviuksen tuhka hautasi kaupungin vuonna 79.', malli: 'eleven_v4', aani: W, nopeus: 1.15, loppuTagi: '' },
  { teksti: 'Pompeji. Vesuviuksen tuhka hautasi kaupungin vuonna 79.', malli: 'eleven_v4_turbo', aani: W, nopeus: 1.15, loppuTagi: '' },
  { teksti: 'Äiti söi öljyä — “lainaus” ja 1 200 m.', malli: 'eleven_v4', aani: W, nopeus: 1, loppuTagi: '[long-pause]' },
  { teksti: 'Äiti söi öljyä — “lainaus” ja 1 200 m.', malli: 'eleven_v4', aani: W, nopeus: 1, loppuTagi: '[long-pause]',
    huom: 'hajotettu ä (NFD) → sama avain kuin edellä' },
  { teksti: 'Rooma', malli: 'eleven_v3', aani: 'Sz0tRTEpybtDJ9ru2kgD', nopeus: 0.9, loppuTagi: '' },
];
console.log(JSON.stringify({ versio: 1, tapaukset: tapaukset.map((t) => ({ ...t, avain: avain(t.teksti, t.malli, t.aani, t.nopeus, t.loppuTagi) })) }, null, 1));
