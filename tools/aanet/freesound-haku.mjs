// FREESOUND-HAKU API:LLA (Pelikoodari 8.10.2026; omistaja: Freesound vain virallisella API:lla, robots.txt kieltää sivut).
// Hakee CC0-äänet hakusanoilla ja lataa HQ-esikuuntelut (mp3) + metatiedot. Alkuperäistiedostot vaativat OAuth2:n
// (proto-3d/tyokalut/pelikoodari-ajot/freesound-oauth.mjs), esikuuntelut riittävät lyhyisiin tehosteisiin.
//   FREESOUND_API_KEY=… node tools/aanet/freesound-haku.mjs <kansio> "tunnus|hakusanat|min_s|max_s" …
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const [kansio, ...haut] = process.argv.slice(2);
const avain = process.env.FREESOUND_API_KEY;
if (!avain) throw new Error('FREESOUND_API_KEY puuttuu');
mkdirSync(kansio, { recursive: true });
const kaikki = [];
for (const h of haut) {
  const [tunnus, sanat, min = '1', max = '60'] = h.split('|');
  const url = `https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(sanat)}&filter=${encodeURIComponent(`license:"Creative Commons 0" duration:[${min} TO ${max}]`)}`
    + '&sort=rating_desc&page_size=8&fields=id,name,username,license,duration,previews,description,tags,avg_rating,num_ratings,url';
  const v = await fetch(url, { headers: { authorization: `Token ${avain}` } });
  if (!v.ok) { console.log(tunnus, 'haku', v.status); continue; }
  const d = await v.json();
  for (const [i, s] of (d.results ?? []).slice(0, 6).entries()) {
    const nimi = `${tunnus}-fs${i + 1}-${s.id}.mp3`;
    const a = await fetch(s.previews['preview-hq-mp3']);
    if (a.ok) writeFileSync(join(kansio, nimi), Buffer.from(await a.arrayBuffer()));
    kaikki.push({ tiedosto: nimi, tunnus, id: s.id, nimi: s.name, tekija: s.username, lisenssi: s.license, kesto_s: s.duration, arvio: s.avg_rating,
      arvioita: s.num_ratings, url: s.url, tagit: s.tags?.slice(0, 12), kuvaus: String(s.description ?? '').slice(0, 300) });
    console.log(tunnus, s.id, s.name, s.username, s.duration, s.license);
  }
}
writeFileSync(join(kansio, 'freesound.json'), JSON.stringify(kaikki, null, 1));
