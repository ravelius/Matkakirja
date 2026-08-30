/* Väliaikainen: koko artikkelin plain-teksti niille, joiden johdanto on ohut. */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const CACHE = join(process.env.CACHE_DIR, 'full');
mkdirSync(CACHE, { recursive: true });
const UA = 'MatkakirjaBot/1.0 (https://github.com/ravelius/Matkakirja; sami.reivinen@vvi.fi)';
const nukku = (ms) => new Promise((r) => setTimeout(r, ms));

for (const t of process.argv.slice(2)) {
  const tiedosto = join(CACHE, `${t.replace(/[^A-Za-z0-9]+/g, '_')}.txt`);
  if (existsSync(tiedosto)) { console.log('CACHE', t); continue; }
  const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=1'
    + '&redirects=1&format=json&formatversion=2&titles=' + encodeURIComponent(t);
  for (let y = 0; y < 8; y += 1) {
    const v = await fetch(url, { headers: { 'User-Agent': UA } });
    if (v.status === 429 || v.status >= 500) { await nukku(5000 * (y + 1)); continue; }
    const p = (await v.json())?.query?.pages?.[0];
    if (!p || p.missing) { console.log('PUUTTUU', t); break; }
    writeFileSync(tiedosto, p.extract ?? '');
    console.log('OK', t, (p.extract ?? '').length);
    break;
  }
  await nukku(2500);
}
