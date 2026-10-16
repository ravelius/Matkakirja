/*
 * Asemataulun Google-rivi (omistaja 16.10.2026 klo 14.18, "Pelkkä kuun summa"): kuluvan kuun todellinen veloitus Googlen
 * laskutusviennistä (BigQuery). Ajetaan Macilla kerran päivässä (ei GitHub Actionsissa); tulos on dokumentti google, jonka
 * Asemataulun hoitaja vie tauluun. Toteutuslinja: scratchpad/keskustelukanava/google-palkki-20261016.md.
 *
 *   node tools/kulut/hae-google.mjs <ulostiedosto>
 *
 * Avain: palvelutilin JSON-avain ~/.config/matkakirja/google-laskutus.json (ei repoon, lokiin eikä tulosteisiin). Skripti tekee
 * joka ajolla uuden pääsytunnuksen (JWT RS256, scope bigquery.readonly) ja etsii laskutustaulun itse: project_id → tietojoukot →
 * taulu gcp_billing_export_v1_*. Jos avainta tai taulua ei ole: dokumentti {odottaa:true} ja poistumiskoodi 0.
 */
import { createSign } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const ulos = process.argv[2] ?? 'google.json';
const odottaa = (syy) => {
  writeFileSync(ulos, JSON.stringify({ ts: Date.now(), odottaa: true }));
  console.log('odottaa laskutusvientiä:', syy);
  process.exit(0);
};

let avain;
try { avain = JSON.parse(readFileSync(join(homedir(), '.config/matkakirja/google-laskutus.json'), 'utf8')); }
catch { odottaa('avainta ei ole'); }
if (!avain?.private_key || !avain?.client_email || !avain?.project_id) odottaa('avain puutteellinen');

const b64 = (x) => Buffer.from(typeof x === 'string' ? x : JSON.stringify(x)).toString('base64url');
const nyt = Math.floor(Date.now() / 1000);
const aihe = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
  iss: avain.client_email, scope: 'https://www.googleapis.com/auth/bigquery.readonly',
  aud: 'https://oauth2.googleapis.com/token', iat: nyt, exp: nyt + 3000,
})}`;
const jwt = `${aihe}.${createSign('RSA-SHA256').update(aihe).sign(avain.private_key, 'base64url')}`;
const tv = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
});
if (!tv.ok) odottaa(`tunnus HTTP ${tv.status}`);
const token = (await tv.json()).access_token;
const H = { authorization: `Bearer ${token}`, 'content-type': 'application/json' };
const P = encodeURIComponent(avain.project_id);

// Taulun haku: tietojoukot, sitten gcp_billing_export_v1_*-taulu.
let taulu = null;
const ds = await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${P}/datasets`, { headers: H });
if (!ds.ok) odottaa(`tietojoukot HTTP ${ds.status}`);
for (const d of (await ds.json()).datasets ?? []) {
  const id = d.datasetReference.datasetId;
  const t = await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${P}/datasets/${encodeURIComponent(id)}/tables?maxResults=200`, { headers: H });
  const nimi = t.ok ? ((await t.json()).tables ?? []).map((x) => x.tableReference.tableId).find((x) => x.startsWith('gcp_billing_export_v1_')) : null;
  if (nimi) { taulu = `${avain.project_id}.${id}.${nimi}`; break; }
}
if (!taulu) odottaa('laskutustaulua ei löydy');

const kk = new Date().toISOString().slice(0, 7).replace('-', '');
const kysely = 'SELECT ANY_VALUE(currency) AS valuutta, SUM(cost) + SUM((SELECT IFNULL(SUM(c.amount), 0) FROM UNNEST(credits) c)) AS summa'
  + ' FROM `' + taulu + '` WHERE invoice.month = @kk';
const v = await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${P}/queries`, {
  method: 'POST', headers: H,
  body: JSON.stringify({
    query: kysely, useLegacySql: false, timeoutMs: 20000, parameterMode: 'NAMED',
    queryParameters: [{ name: 'kk', parameterType: { type: 'STRING' }, parameterValue: { value: kk } }],
  }),
});
if (!v.ok) odottaa(`kysely HTTP ${v.status}`);
const rivi = (await v.json()).rows?.[0]?.f;
const summa = Math.round((Number(rivi?.[1]?.v) || 0) * 100) / 100;
writeFileSync(ulos, JSON.stringify({ ts: Date.now(), kk: `${kk.slice(0, 4)}-${kk.slice(4)}`, summa, valuutta: rivi?.[0]?.v || 'EUR' }));
console.log('google', kk, summa, rivi?.[0]?.v);
