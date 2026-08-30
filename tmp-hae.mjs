/* Väliaikainen hakuskripti: en-Wikipedian johdanto-osat + koordinaatit. */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CACHE = process.env.CACHE_DIR;
mkdirSync(CACHE, { recursive: true });

const UA = 'MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja; sami.reivinen@vvi.fi)';
const titles = process.argv.slice(2);
const nukku = (ms) => new Promise((r) => setTimeout(r, ms));

for (const t of titles) {
  const tiedosto = join(CACHE, `${t.replace(/[^A-Za-z0-9]+/g, '_')}.json`);
  if (existsSync(tiedosto)) { console.log('CACHE', t); continue; }
  const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts%7Ccoordinates'
    + '&exintro=1&explaintext=1&redirects=1&format=json&formatversion=2&titles='
    + encodeURIComponent(t);
  let ok = false;
  for (let yritys = 0; yritys < 8 && !ok; yritys += 1) {
    try {
      const v = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
      if (v.status === 429 || v.status >= 500) { await nukku(5000 * (yritys + 1)); continue; }
      const j = await v.json();
      const p = j?.query?.pages?.[0];
      if (!p || p.missing) { console.log('PUUTTUU', t); ok = true; break; }
      writeFileSync(tiedosto, JSON.stringify({
        title: p.title, coordinates: p.coordinates ?? null, extract: p.extract ?? '',
      }, null, 1));
      console.log('OK', t, '->', p.title, JSON.stringify(p.coordinates ?? null));
      ok = true;
    } catch (e) { await nukku(5000 * (yritys + 1)); }
  }
  if (!ok) console.log('EPÄONNISTUI', t);
  await nukku(2500);
}
