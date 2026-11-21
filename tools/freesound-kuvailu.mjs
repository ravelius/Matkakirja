/*
 * SK 21.11.2026 (L3 erä 2a): Freesound-ehdokkaiden KUVAILUTIEDOT. Ei lataa ääntä, ei esikatseluja; vain
 * hakurajapinnan metatiedot (id, nimi, tekijä, lisenssi, kesto, näytetaajuus, kuvaus, tagit, osoite).
 * Avainta ei tulosteta. Lisenssirajaus palvelimen puolella: CC0 ja CC BY (ei NC, ei SA).
 *   node tools/freesound-kuvailu.mjs kyselyt.json ulos.json
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { lisenssisuodatin, lisenssiNimi } from './aanilahteet.mjs';

const NIMET = ['FREESOUND_API', 'FREESOUND_API_KEY', 'FREESOUND_AVAIN', 'FREESOUND_TOKEN', 'FREESOUND'];
const nimi = NIMET.find((n) => (process.env[n] ?? '').trim());
if (!nimi) { console.error('Freesoundin avainta ei löytynyt ympäristöstä.'); process.exit(2); }
const AVAIN = process.env[nimi].trim();
console.log(`Avain löytyi muuttujasta ${nimi} (arvoa ei tulosteta).`);
const kyselyt = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const KENTAT = 'id,name,username,license,duration,samplerate,bitdepth,channels,type,filesize,description,tags,url,avg_rating,num_ratings,num_downloads,created';
const odota = (ms) => new Promise((r) => setTimeout(r, ms));
const tulos = [];
for (const k of kyselyt) {
  const suodatin = `${lisenssisuodatin({})} duration:[${k.min} TO ${k.max}]`;
  const u = new URL('https://freesound.org/apiv2/search/text/');
  u.searchParams.set('query', k.haku);
  u.searchParams.set('filter', suodatin);
  u.searchParams.set('fields', KENTAT);
  u.searchParams.set('page_size', '12');
  u.searchParams.set('sort', 'score');
  let osumat = []; let virhe = null; let maara = null;
  for (let yritys = 0; yritys < 3; yritys += 1) {
    try {
      const r = await fetch(u, { headers: { Authorization: `Token ${AVAIN}`, 'User-Agent': 'matkakirja-sisaltokirjuri-kuvailu' } });
      if (r.status === 429) { await odota(20000); continue; }
      if (!r.ok) { virhe = `HTTP ${r.status}`; break; }
      const j = await r.json(); maara = j.count; osumat = j.results ?? []; virhe = null; break;
    } catch (e) { virhe = String(e).slice(0, 120); await odota(3000); }
  }
  const rajattu = osumat.filter((o) => !(k.musiikki ? false : (o.tags ?? []).some((t) => ['music', 'song', 'speech'].includes(String(t).toLowerCase()))));
  tulos.push({
    ...k, suodatin, osumia_yhteensa: maara, virhe,
    ehdokkaat: rajattu.map((o) => ({
      id: o.id, nimi: o.name, tekija: o.username, lisenssi_url: o.license, lisenssi: lisenssiNimi(o.license),
      kesto_s: o.duration, nayte_hz: o.samplerate, bitit: o.bitdepth, kanavia: o.channels, tyyppi: o.type, tavua: o.filesize,
      kuvaus: (o.description ?? '').slice(0, 600), tagit: (o.tags ?? []).slice(0, 25), sivu: o.url,
      arvio: o.num_ratings >= 3 ? o.avg_rating : null, lataukset: o.num_downloads, luotu: o.created,
    })),
  });
  console.log(`${k.id} rivit ${k.rivit.join(',')} "${k.haku}": ${maara ?? '-'} osumaa, ${rajattu.length} listassa${virhe ? `, VIRHE ${virhe}` : ''}`);
  await odota(1300);
}
writeFileSync(process.argv[3], `${JSON.stringify(tulos, null, 1)}\n`);
console.log(`Kirjoitettu ${process.argv[3]}`);
