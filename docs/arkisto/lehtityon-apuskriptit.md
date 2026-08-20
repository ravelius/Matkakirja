> **ARKISTOITU 19.8.2026 (Opus).** Tämä ei ole ohje vaan APUSKRIPTIEN
> TALLE: session väliaikaiskansiossa syntyneet kertakäyttöiset työkalut,
> jotka olisivat kadonneet kontin mukana. Ne EIVÄT ole osa pelin
> työkalupakkia eikä niitä ole viety tools/-kansioon — kopioi tarvittaessa
> omaan väliaikaiskansioon. Repon oma kuvaputki on tools/hae-commons.mjs
> ja tools/hae-flickr.mjs; nämä ovat kevyempiä apureita lehtityöhön.

# Lehtityön apuskriptit (Opus, elokuu 2026)

Kaikki ajetaan `NODE_USE_ENV_PROXY=1 node <skripti>` konttiympäristössä.
Jokaisessa on **uusintalogiikka**, ja se on tärkein yksityiskohta: ilman
sitä yksi 429 tai katkennut yhteys kaataa koko erän kesken. Tämä oli
suurin yksittäinen virhelähde ennen kuin se korjattiin 19.8.2026.

## hae-kuvia.mjs — Commons-haku

Hakee hakusanalla kuvaehdokkaat ja tulostaa koon, kuvasuhteen,
lisenssin ja tekijän. Suodattaa pois NC/ND-lisenssit ja alle 1200 px
leveät. Kaytto: `node hae-kuvia.mjs "hakusana" 14`

```js
/* Hakee Commonsista kuvaehdokkaita ja tulostaa lisenssin, tekijän ja koon. */
const haku = process.argv[2];
const raja = Number(process.argv[3] ?? 20);
const ua = { 'User-Agent': 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)' };
/* Commons kuristaa (429) ja kontin yhteys katkeaa ajoittain. Kymmenen
 * yritystä kasvavalla odotuksella riitti kaikkiin tässä kohdattuihin
 * katkoihin; kuudella erä katkesi kesken. */
async function api(params) {
  const url = 'https://commons.wikimedia.org/w/api.php?format=json&' + params;
  for (let t = 0; t < 10; t++) {
    try {
      const r = await fetch(url, { headers: ua, signal: AbortSignal.timeout(90000) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return JSON.parse(await r.text());
    } catch (v) {
      process.stderr.write(`  ${v.message}\n`);
      await new Promise(s => setTimeout(s, Math.min(60000, (t + 1) * 9000)));
    }
  }
  throw new Error('ei vastausta');
}
const h = await api('action=query&list=search&srnamespace=6&srlimit=' + raja
  + '&srsearch=' + encodeURIComponent(haku));
const nimet = (h.query?.search ?? []).map(o => o.title);
if (!nimet.length) { console.log('ei osumia'); process.exit(0); }
for (let i = 0; i < nimet.length; i += 10) {
  const pala = nimet.slice(i, i + 10);
  const j = await api('action=query&prop=imageinfo&iiprop=url|size|extmetadata'
    + '&iiextmetadatafilter=LicenseShortName|Artist|Restrictions&titles='
    + pala.map(encodeURIComponent).join('%7C'));
  for (const s of Object.values(j.query?.pages ?? {})) {
    const ii = s.imageinfo?.[0]; if (!ii) continue;
    const e = ii.extmetadata ?? {};
    const p = v => (v?.value ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const lis = p(e.LicenseShortName);
    if (/NC|ND|Fair|non-free/i.test(lis)) continue;
    if (ii.width < 1200) continue;
    console.log(`${s.title}\n  ${ii.width}x${ii.height} (${(ii.width / ii.height).toFixed(2)}:1)  ${lis}  |  ${p(e.Artist)}`);
  }
}
```

## jono.mjs — YKSI peräkkäinen kuvajono

Ajaa hae-kuvia.mjs:n usealle aiheelle peräkkäin tauon kanssa.
docs/tuotantosuunnitelma.md §4 kieltää rinnakkaisen kuvaparven —
tämä on se yksi jono.

```js
/* Yksi peräkkäinen kuvajono: aiheet argumentteina, 8 s väli. */
import { spawnSync } from 'node:child_process';
const aiheet = process.argv.slice(2);
for (let i = 0; i < aiheet.length; i++) {
  console.log('\n##### ' + aiheet[i]);
  const r = spawnSync(process.execPath, ['hae-kuvia.mjs', aiheet[i], '14'],
    { encoding: 'utf8', env: { ...process.env, NODE_USE_ENV_PROXY: '1' } });
  console.log(r.stdout || r.stderr);
  if (i < aiheet.length - 1) await new Promise(s => setTimeout(s, 20000));
}
```

## lataa.mjs — esikatselukuvien lataus silmämääräistä tarkistusta varten

Lataa 900 px esikatselut kansioon kuvat/. Jokainen kuva on
KATSOTTAVA ennen käyttöä.

```js
/* Lataa Commonsista 900 px esikatselut kansioon kuvat/.
 * Kaikki verkkokutsut ovat try/catchin sisällä: kontin ulosmenevä
 * yhteys katkeaa ajoittain (ConnectTimeoutError), ja ilman kiinniottoa
 * yksi katkos kaataa koko erän kesken. */
import fs from 'node:fs';
const ua = { 'User-Agent': 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja; sami.reivinen@vvi.fi)' };
const nimet = process.argv.slice(2);
const odota = (ms) => new Promise((s) => setTimeout(s, ms));
async function sitkeasti(url, tyyppi) {
  for (let t = 0; t < 6; t += 1) {
    try {
      const r = await fetch(url, { headers: ua, signal: AbortSignal.timeout(90000) });
      if (r.ok) return tyyppi === 'json' ? await r.json() : Buffer.from(await r.arrayBuffer());
      process.stderr.write(`  HTTP ${r.status}\n`);
    } catch (e) { process.stderr.write(`  ${e.message}\n`); }
    await odota((t + 1) * 8000);
  }
  return null;
}
for (let i = 0; i < nimet.length; i += 1) {
  const j = await sitkeasti('https://commons.wikimedia.org/w/api.php?format=json&action=query'
    + '&prop=imageinfo&iiprop=url&iiurlwidth=900&titles=' + encodeURIComponent('File:' + nimet[i]), 'json');
  const url = Object.values(j?.query?.pages ?? {})[0]?.imageinfo?.[0]?.thumburl;
  if (!url) { console.log('EI URLIA ' + nimet[i]); continue; }
  const b = await sitkeasti(url, 'bin');
  if (!b) { console.log('FAIL ' + nimet[i]); continue; }
  const kohde = 'kuvat/' + String(i).padStart(2, '0') + '.jpg';
  fs.writeFileSync(kohde, b);
  console.log(`${kohde}  ${b.length}  ${nimet[i]}`);
  await odota(5000);
}
```

## meta.mjs — lisenssin ja tekijän varmistus rajapinnasta

Tulostaa koon, lisenssin, tekijän ja mahdolliset rajoitukset.
Ajetaan aina ennen kuin kuva kirjoitetaan lehteen.

```js
const nimet = process.argv.slice(2);
const url = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo'
  + '&iiprop=url|size|extmetadata&iiextmetadatafilter=LicenseShortName|Artist|Restrictions|Credit'
  + '&titles=' + nimet.map(n => encodeURIComponent('File:' + n)).join('%7C');
for (let t = 0; t < 5; t++) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)' } });
    const j = await r.json();
    const sivut = Object.values(j.query?.pages ?? {});
    if (!sivut.length) throw new Error('tyhjä');
    for (const s of sivut) {
      const ii = s.imageinfo?.[0];
      if (!ii) { console.log(`PUUTTUU: ${s.title}`); continue; }
      const e = ii.extmetadata ?? {};
      const puhdas = v => (v?.value ?? '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
      console.log(`${s.title}\n  ${ii.width}x${ii.height}  lisenssi=${puhdas(e.LicenseShortName)}`
        + `\n  tekijä=${puhdas(e.Artist)}\n  rajoitus=${puhdas(e.Restrictions) || '-'}\n`);
    }
    process.exit(0);
  } catch (v) { console.error('yritys', t + 1, v.message); await new Promise(s => setTimeout(s, (t + 1) * 8000)); }
}
process.exit(1);
```

## saanormaalit.mjs — keskilämpö ja sade uudelle sääriville

Open-Meteon arkisto (ERA5), jakso 1991-2020, paketin oma menetelmä.
Kaytto: `node saanormaalit.mjs <id> <lat> <lon>`

```js
// Hakee Open-Meteon ERA5-arkistosta kuukausikeskilämmöt ja sademäärät
// jaksolta 1991-2020 ja tulostaa saatiedot.js:n rivin muodossa.
const [,, id, lat, lon] = process.argv;
const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}`
  + `&start_date=1991-01-01&end_date=2020-12-31`
  + `&daily=temperature_2m_mean,precipitation_sum&timezone=UTC`;
/* Kontin yhteys arkistopalvelimeen katkeaa ajoittain; ilman uusintaa
 * yksi katkos kaataa koko ajon. */
let d = null;
for (let t = 0; t < 8 && !d; t += 1) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Matkakirja/1.0' }, signal: AbortSignal.timeout(180000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    d = await r.json();
  } catch (e) { process.stderr.write(`  ${e.message}\n`); await new Promise((s2) => setTimeout(s2, (t + 1) * 10000)); }
}
if (!d) { console.error('ei vastausta'); process.exit(1); }
const paivat = d.daily.time, lampo = d.daily.temperature_2m_mean, sade = d.daily.precipitation_sum;
const lsumma = Array(12).fill(0), lkpl = Array(12).fill(0);
const ssumma = Array(12).fill(0); const vuodet = new Set();
for (let i = 0; i < paivat.length; i++) {
  const kk = Number(paivat[i].slice(5, 7)) - 1;
  vuodet.add(paivat[i].slice(0, 4));
  if (lampo[i] != null) { lsumma[kk] += lampo[i]; lkpl[kk]++; }
  if (sade[i] != null) ssumma[kk] += sade[i];
}
const n = vuodet.size;
const keskilampo = lsumma.map((s, i) => Number((s / lkpl[i]).toFixed(1)));
const sademm = ssumma.map((s) => Math.round(s / n));
console.log(`  ${id}: {`);
console.log(`    lat: ${lat},`);
console.log(`    lon: ${lon},`);
console.log(`    keskilampo: [${keskilampo.join(', ')}],`);
console.log(`    sade: [${sademm.join(', ')}],`);
console.log(`  },  // vuosisade ${sademm.reduce((a,b)=>a+b,0)} mm, vuosia ${n}`);
```

## kaista.mjs — ylin ja alin samalle riville

Sama kaava kuin tools/hae-saanormaalit.mjs:ssä mutta koko jaksolta
eikä otoksesta. Kaytto: `node kaista.mjs <id> <lat> <lon> "<12 keskilampoa pilkuilla>"`

```js
/*
 * Vaihteluvyöhyke (ylin/alin) yksittäiselle uudelle kaupungille samalla
 * menetelmällä kuin tools/hae-saanormaalit.mjs, mutta koko jaksolta
 * 1991-2020 (kolme kaupunkia kerrallaan mahtuu tuntikiintioon).
 *   node kaista.mjs <id> <lat> <lon> <keskilampo pilkuilla>
 */
const [,, id, lat, lon, keskiRaw] = process.argv;
const keski = keskiRaw.split(',').map(Number);
const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}`
  + '&start_date=1991-01-01&end_date=2020-12-31'
  + '&daily=temperature_2m_max,temperature_2m_min&timezone=UTC';
let r = null;
for (let t = 0; t < 8 && !r; t += 1) {
  try {
    const v = await fetch(url, { signal: AbortSignal.timeout(180000) });
    if (!v.ok) throw new Error('HTTP ' + v.status);
    r = v;
  } catch (e) { process.stderr.write(`  ${e.message}\n`); await new Promise((s2) => setTimeout(s2, (t + 1) * 10000)); }
}
if (!r) { console.error('ei vastausta'); process.exit(1); }
if (!r.ok) { console.error('HTTP', r.status, await r.text()); process.exit(1); }
const d = (await r.json()).daily;
const smax = Array(12).fill(0), smin = Array(12).fill(0), n = Array(12).fill(0);
d.time.forEach((t, i) => {
  const kk = Number(t.slice(5, 7)) - 1;
  if (!Number.isFinite(d.temperature_2m_max[i])) return;
  smax[kk] += d.temperature_2m_max[i];
  smin[kk] += d.temperature_2m_min[i];
  n[kk] += 1;
});
const ylin = [], alin = [];
for (let k = 0; k < 12; k += 1) {
  const puoli = (smax[k] / n[k] - smin[k] / n[k]) / 2;
  ylin.push(Math.round(keski[k] + puoli));
  alin.push(Math.round(keski[k] - puoli));
}
console.log(`${id}\n    ylin: [${ylin.join(', ')}],\n    alin: [${alin.join(', ')}],`);
```

## osm3.mjs — Overpass-kysely repon omalla pyyntömuodolla

TÄRKEÄ YKSITYISKOHTA: kysely on pakattava yhdelle riville ja
lähetettävä URLSearchParamsilla User-Agentin kanssa. Monirivinen
kysely saa Overpassilta 406/429.

```js
const q = process.argv[2].replace(/\s+/g, ' ');
const palvelimet = ['https://overpass-api.de/api/interpreter', 'https://overpass.kumi.systems/api/interpreter'];
let data = null;
for (let i = 0; i < 10 && !data; i += 1) {
  try {
    const r = await fetch(palvelimet[i % 2], {
      method: 'POST',
      headers: { 'User-Agent': 'matkakirja/1.0 (opetuspeli)' },
      body: new URLSearchParams({ data: q }),
      signal: AbortSignal.timeout(180000),
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    data = await r.json();
  } catch (e) { process.stderr.write(`yritys ${i + 1}: ${e.message}\n`); await new Promise((s) => setTimeout(s, Math.min(60000, 15000 * (i + 1)))); }
}
for (const e of data.elements) {
  const t = e.tags || {};
  const nimi = t['name:en'] || t.name;
  if (!nimi) continue;
  const lat = e.lat ?? e.center?.lat; const lon = e.lon ?? e.center?.lon;
  console.log(`${lat?.toFixed(5)} ${lon?.toFixed(5)}  ${nimi}  [${t.historic || t.tourism || t.man_made || t.amenity || ''}]`);
}
```
