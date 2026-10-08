/*
 * Kustannussuunnitelman lähtödata (Pelikoodari 8.10.2026): hakee
 * Anthropicin kulu- ja käyttöraportit admin-avaimella ja kirjoittaa
 * ne JSONina (ei avaimia, vain summat ja avainten nimet/tunnukset).
 * Ajetaan Actionsissa, koska ANTHROPIC_ADMIN_KEY on vain secreteissä.
 *
 *   ANTHROPIC_ADMIN_KEY=… OPENAI_ADMIN_KEY=… node tools/kulut/hae-kulut.mjs <kansio> [alku-ISO]
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const kansio = process.argv[2] ?? 'kulut-ulos';
const alku = process.argv[3] ?? '2026-08-01T00:00:00Z';
mkdirSync(kansio, { recursive: true });
const A = { 'x-api-key': process.env.ANTHROPIC_ADMIN_KEY, 'anthropic-version': '2023-06-01' };

async function sivut(perus, otsakkeet) {
  const kaikki = [];
  let sivu = null;
  for (let i = 0; i < 60; i++) {
    const url = perus + (sivu ? `&page=${encodeURIComponent(sivu)}` : '');
    const v = await fetch(url, { headers: otsakkeet });
    if (!v.ok) { kaikki.push({ virhe: v.status, teksti: (await v.text()).slice(0, 300) }); break; }
    const d = await v.json();
    kaikki.push(...(d.data ?? []));
    if (!d.has_more) break;
    sivu = d.next_page;
  }
  return kaikki;
}

const tulos = {};
const aB = 'https://api.anthropic.com/v1/organizations';
tulos.api_keys = (await sivut(`${aB}/api_keys?limit=100`, A)).map((k) => ({
  id: k.id, name: k.name, status: k.status, workspace_id: k.workspace_id, created_at: k.created_at, hint: k.partial_key_hint,
}));
tulos.workspaces = (await sivut(`${aB}/workspaces?limit=100`, A)).map((w) => ({ id: w.id, name: w.name }));
tulos.cost = await sivut(`${aB}/cost_report?starting_at=${alku}&limit=31&group_by[]=description&group_by[]=workspace_id`, A);
tulos.usage = await sivut(
  `${aB}/usage_report/messages?starting_at=${alku}&bucket_width=1d&limit=31&group_by[]=api_key_id&group_by[]=model`, A);
if (process.env.OPENAI_ADMIN_KEY) {
  const s = Math.floor(Date.parse(alku) / 1000);
  const v = await fetch(`https://api.openai.com/v1/organization/costs?start_time=${s}&bucket_width=1d&limit=180&group_by=line_item`,
    { headers: { authorization: `Bearer ${process.env.OPENAI_ADMIN_KEY}` } });
  tulos.openai = v.ok ? await v.json() : { virhe: v.status };
}
writeFileSync(join(kansio, 'kulut.json'), JSON.stringify(tulos, null, 1));
console.log('avaimia', tulos.api_keys.length, 'kulurivejä', tulos.cost.length, 'käyttörivejä', tulos.usage.length);
