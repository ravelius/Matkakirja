// KV-OPERAATIOT PÄIVÄLTÄ (Päätoimittaja 6.10.2026: Cloudflaren hälytys "KV daily operation limit 50% reached").
// Lukee Cloudflaren GraphQL:stä (kvOperationsAdaptiveGroups) tämän UTC-päivän operaatiot lajeittain (read/write/delete/
// list) ja tulostaa ne. Ajetaan julkaisuajossa (CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID); jos tunnuksella ei ole
// Analytics-lukuoikeutta, kertoo sen eikä kaada ajoa. Ei tulosta salaisuuksia.
//   node tools/pollo/kv-kaytto.mjs [YYYY-MM-DD]
const tunnus = process.env.CLOUDFLARE_API_TOKEN, tili = process.env.CLOUDFLARE_ACCOUNT_ID;
const paiva = process.argv[2] || new Date().toISOString().slice(0, 10);
if (!tunnus || !tili) { console.log('kv-käyttö: tunnus tai tili puuttuu, ohitetaan'); process.exit(0); }
const kysely = `query($tili: String!, $paiva: Date!) { viewer { accounts(filter: { accountTag: $tili }) {
  kvOperationsAdaptiveGroups(limit: 1000, filter: { date: $paiva }) { sum { requests } dimensions { actionType namespaceId } } } } }`;
try {
  const v = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST', headers: { authorization: `Bearer ${tunnus}`, 'content-type': 'application/json' },
    body: JSON.stringify({ query: kysely, variables: { tili, paiva } }),
  });
  const d = await v.json();
  if (d.errors?.length) { console.log(`kv-käyttö: GraphQL-virhe (${d.errors.map((e) => e.message).join('; ').slice(0, 200)})`); process.exit(0); }
  const rivit = d.data?.viewer?.accounts?.[0]?.kvOperationsAdaptiveGroups ?? [];
  const lajit = {};
  for (const r of rivit) lajit[r.dimensions.actionType] = (lajit[r.dimensions.actionType] ?? 0) + (r.sum?.requests ?? 0);
  console.log(`kv-käyttö ${paiva} (UTC): ${Object.entries(lajit).map(([k, n]) => `${k} ${n}`).join(', ') || 'ei operaatioita'}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    const fs = await import('node:fs');
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n### KV-operaatiot ${paiva} (UTC)\n\n${Object.entries(lajit)
      .map(([k, n]) => `- ${k}: ${n}`).join('\n') || '- ei operaatioita'}\n\nIlmaistason päiväraja: 100 000 lukua, 1 000 kirjoitusta, 1 000 poistoa, 1 000 listausta.\n`);
  }
} catch (virhe) {
  console.log(`kv-käyttö: haku epäonnistui (${virhe?.message ?? virhe})`);
}
