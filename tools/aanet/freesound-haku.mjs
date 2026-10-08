// FREESOUND-HAKU API:LLA (Pelikoodari 8.10.2026; omistaja: Freesound vain virallisella API:lla, robots.txt kieltää sivut).
// Hakee CC0-äänet hakusanoilla ja lataa HQ-esikuuntelut (mp3) + metatiedot. Alkuperäistiedostot vaativat OAuth2:n
// (proto-3d/tyokalut/pelikoodari-ajot/freesound-oauth.mjs), esikuuntelut riittävät lyhyisiin tehosteisiin.
//   FREESOUND_API_KEY=… node tools/aanet/freesound-haku.mjs <kansio> "tunnus|hakusanat|min_s|max_s" | "tunnus|id:123,456" …
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const [kansio, ...haut] = process.argv.slice(2);
const avain = process.env.FREESOUND_API_KEY;
if (!avain) throw new Error('FREESOUND_API_KEY puuttuu');
mkdirSync(kansio, { recursive: true });
const KENTAT = 'id,name,username,license,duration,previews,description,tags,avg_rating,num_ratings,url';
const kaikki = [];
// Vahti: jumiutunut lataus ei saa kaataa koko ajoa (8.10.: esikuuntelun lataus jäi roikkumaan); JSON kirjoitetaan joka äänen jälkeen.
setTimeout(() => { console.log("vahti: aika loppui, lopetetaan"); process.exit(0); }, 8 * 60e3).unref();

const api = (url) => fetch(url, { headers: { authorization: `Token ${avain}` }, signal: AbortSignal.timeout(30000) })
  .catch((e) => ({ ok: false, status: e.name }));

async function tallenna(tunnus, i, s) {
  const nimi = `${tunnus}-fs${i + 1}-${s.id}.mp3`;
  // tunnus "lisenssi": vain metatiedot (maisemakorin lisenssitarkistus 8.10.), ei esikuuntelua
  const a = tunnus === 'lisenssi' ? { ok: false } : await fetch(s.previews['preview-hq-mp3'], { signal: AbortSignal.timeout(60000) }).catch(() => ({ ok: false }));
  if (a.ok) try { writeFileSync(join(kansio, nimi), Buffer.from(await a.arrayBuffer())); } catch { console.log(nimi, 'lataus katkesi'); }
  kaikki.push({ tiedosto: nimi, tunnus, id: s.id, nimi: s.name, tekija: s.username, lisenssi: s.license, kesto_s: s.duration, arvio: s.avg_rating,
    arvioita: s.num_ratings, url: s.url, tagit: s.tags?.slice(0, 12), kuvaus: String(s.description ?? '').slice(0, 300) });
  console.log(tunnus, s.id, s.name, s.username, s.duration, s.license);
  writeFileSync(join(kansio, 'freesound.json'), JSON.stringify(kaikki, null, 1));
}

for (const h of haut) {
  const [tunnus, sanat, min = '1', max = '60', lis = 'cc0'] = h.split('|');
  // 5. kenttä "by": CC0 tai CC BY (nimeäminen Lähteisiin; PT 8.10. pallon äänimaisema), oletus vain CC0
  const lisenssi = lis === 'by' ? '("Creative Commons 0" OR "Attribution")' : '"Creative Commons 0"';
  if (sanat.startsWith('id:')) {   // suoraan nimetyt äänet (aiemman haun ehdokkaat)
    for (const [i, id] of sanat.slice(3).split(',').entries()) {
      const v = await api(`https://freesound.org/apiv2/sounds/${id}/?fields=${KENTAT}`);
      if (!v.ok) { console.log(tunnus, id, 'haku', v.status); continue; }
      await tallenna(tunnus, i, await v.json());
    }
    continue;
  }
  const v = await api(`https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(sanat)}&filter=${encodeURIComponent(`license:${lisenssi} duration:[${min} TO ${max}]`)}`
    + `&sort=rating_desc&page_size=8&fields=${KENTAT}`);
  if (!v.ok) { console.log(tunnus, 'haku', v.status); continue; }
  const d = await v.json();
  console.log(tunnus, sanat, 'osumia', d.count);
  for (const [i, s] of (d.results ?? []).slice(0, 4).entries()) await tallenna(tunnus, i, s);
}
writeFileSync(join(kansio, 'freesound.json'), JSON.stringify(kaikki, null, 1));
