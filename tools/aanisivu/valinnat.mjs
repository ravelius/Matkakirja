#!/usr/bin/env node
/*
 * ÄÄNISIVUN VALINNAT — omistajan "Lähetä Claudelle" -lähetykset (Pelikoodari 11.10.2026, omistajan toive 09.3x).
 *
 *   node tools/aanisivu/valinnat.mjs              uudet lähetykset, merkitsee ne luetuiksi
 *   node tools/aanisivu/valinnat.mjs --kuiva      uudet lähetykset, ei merkitse
 *   node tools/aanisivu/valinnat.mjs --nyt        valitut näytteet tällä hetkellä (ei lähetystä)
 *   node tools/aanisivu/valinnat.mjs --json       sama koneluettavana (yhdistettävissä edellisiin)
 *
 * Äänisivu https://matkakirja-aanet.pages.dev/ (Cloudflare Pages + Access, sivusto /Users/Shared/Claude/aanisivu-sivusto,
 * julkaisu julkaisija-tyokalut/aanisivu-julkaise.zsh). Sivun _worker.js tallentaa jokaisen "Hyvä"-ruudun D1-tietokantaan
 * aanisivu-valinnat (taulu valinnat) ja Lähetä-napin painalluksen tauluun lahetykset (aika, viesti, kuka, valinnat JSON:
 * [{ src, osio, nimi, valittu, uusi }]; uusi = valittu edellisen lähetyksen jälkeen). Tämä työkalu lukee D1:tä
 * Cloudflaren REST-rajapinnalla, joten Access-kirjautumista ei tarvita. Avaimet ympäristöstä (CLOUDFLARE_ACCOUNT_ID,
 * CLOUDFLARE_API_TOKEN; Mac: ~/.zshrc), ei koskaan argumentteina.
 *
 * PT ajaa tämän jonokierroksella ja reitittää valinnat (src = sivuston polku, esim. kippi/musa-….mp3).
 */
const TIETOKANTA = 'aanisivu-valinnat';
const { CLOUDFLARE_ACCOUNT_ID: TILI, CLOUDFLARE_API_TOKEN: AVAIN } = process.env;
const liput = new Set(process.argv.slice(2));
if (!TILI || !AVAIN) {
  console.error('CLOUDFLARE_ACCOUNT_ID ja CLOUDFLARE_API_TOKEN puuttuvat ympäristöstä (source ~/.zshrc)');
  process.exit(2);
}
const JUURI = `https://api.cloudflare.com/client/v4/accounts/${TILI}/d1/database`;
const OTSAKKEET = { Authorization: `Bearer ${AVAIN}`, 'Content-Type': 'application/json' };

async function api(polku, runko) {
  const v = await fetch(`${JUURI}${polku}`, runko ? { method: 'POST', headers: OTSAKKEET, body: JSON.stringify(runko) } : { headers: OTSAKKEET });
  const j = await v.json();
  if (!j.success) throw new Error(`D1 ${polku}: ${JSON.stringify(j.errors)}`);
  return j.result;
}
const kysely = async (id, sql, params = []) => (await api(`/${id}/query`, { sql, params }))[0].results;

const kanta = (await api(`?name=${TIETOKANTA}`)).find((d) => d.name === TIETOKANTA);
if (!kanta) { console.error(`D1-tietokantaa ${TIETOKANTA} ei ole`); process.exit(3); }
const id = kanta.uuid;
const klo = (iso) => new Date(iso).toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki', dateStyle: 'short', timeStyle: 'short' });

if (liput.has('--nyt')) {
  const rivit = await kysely(id, 'SELECT src, osio, nimi, aika FROM valinnat ORDER BY osio, aika');
  if (liput.has('--json')) { console.log(JSON.stringify(rivit, null, 1)); process.exit(0); }
  console.log(`Valittuna nyt ${rivit.length} näytettä:`);
  for (const r of rivit) console.log(`  ${r.osio} · ${r.nimi} (${r.src}) — ${klo(r.aika)}`);
  process.exit(0);
}

const uudet = await kysely(id, 'SELECT aika, viesti, kuka, valinnat FROM lahetykset WHERE luettu IS NULL ORDER BY aika');
const lahetykset = uudet.map((l) => ({ ...l, valinnat: JSON.parse(l.valinnat) }));
if (liput.has('--json')) console.log(JSON.stringify(lahetykset, null, 1));
else if (!lahetykset.length) console.log('Ei uusia lähetyksiä.');
else {
  for (const l of lahetykset) {
    const uusia = l.valinnat.filter((v) => v.uusi).length;
    console.log(`Lähetys ${klo(l.aika)}${l.kuka ? ` (${l.kuka})` : ''}: ${l.valinnat.length} valittua, ${uusia} uutta edellisen jälkeen`);
    if (l.viesti) console.log(`  Viesti: ${l.viesti}`);
    for (const v of l.valinnat) console.log(`  ${v.uusi ? '+' : ' '} ${v.osio} · ${v.nimi} (${v.src})`);
  }
}
if (lahetykset.length && !liput.has('--kuiva')) {
  const nyt = new Date().toISOString();
  for (const l of lahetykset) await kysely(id, 'UPDATE lahetykset SET luettu = ?1 WHERE aika = ?2', [nyt, l.aika]);
  if (!liput.has('--json')) console.log(`Merkitty luetuiksi: ${lahetykset.length}.`);
}
