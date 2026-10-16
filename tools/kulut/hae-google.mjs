/*
 * Asemataulun Google-palkin lähtödata (omistaja 16.10.2026 klo 14.02, "pelkkä google"): kuluvan kuukauden kulut palveluittain
 * ja krediittien käyttö Googlen laskutusviennistä (BigQuery). Kirjoittaa google.json-dokumentin, jonka Päätoimittaja vie
 * Asemataulun tietokantaan (dokumentti google). Ei avaimia tulokseen. Haku kerran päivässä (.github/workflows/hae-google-kulut.yml).
 *
 *   GOOGLE_BILLING_TOKEN=… GOOGLE_BILLING_PROJECT=… GOOGLE_BILLING_TAULU=… node tools/kulut/hae-google.mjs <ulostiedosto>
 *   Valinnaiset (ei salaisia): GOOGLE_KREDIITTI_USD (krediitin koko), GOOGLE_KREDIITTI_NOLLAUTUU (ISO-päivä), GOOGLE_BUDJETTI_USD.
 * Laskutusviennistä ei selviä krediitin koko eikä nollautumispäivä, joten ne annetaan asetuksina; ilman niitä palkki näyttää dollarit.
 */
import { writeFileSync } from 'node:fs';

const ulos = process.argv[2] ?? 'google.json';
const { GOOGLE_BILLING_TOKEN: token, GOOGLE_BILLING_PROJECT: projekti, GOOGLE_BILLING_TAULU: taulu } = process.env;
if (!token || !projekti || !taulu) { console.error('GOOGLE_BILLING_* puuttuu'); process.exit(1); }
if (!/^[\w.-]+$/.test(taulu)) { console.error('taulun nimi kelpaamaton'); process.exit(1); }

const nyt = new Date();
const kk = `${nyt.getUTCFullYear()}-${String(nyt.getUTCMonth() + 1).padStart(2, '0')}`;
const kysely = 'SELECT service.description AS palvelu, SUM(cost) AS kulu,'
  + ' SUM((SELECT IFNULL(SUM(c.amount), 0) FROM UNNEST(credits) c)) AS krediitti'
  + ' FROM `' + taulu + '` WHERE DATE(usage_start_time) >= @alku GROUP BY palvelu ORDER BY kulu DESC';
const v = await fetch(`https://bigquery.googleapis.com/bigquery/v2/projects/${encodeURIComponent(projekti)}/queries`, {
  method: 'POST',
  headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
  body: JSON.stringify({
    query: kysely, useLegacySql: false, timeoutMs: 20000, parameterMode: 'NAMED',
    queryParameters: [{ name: 'alku', parameterType: { type: 'DATE' }, parameterValue: { value: `${kk}-01` } }],
  }),
});
if (!v.ok) { console.error('BigQuery HTTP', v.status); process.exit(1); }
const d = await v.json();
const rivit = (d.rows ?? []).map((r) => ({ nimi: r.f[0].v ?? 'Muu', usd: Number(r.f[1].v) || 0, kr: Number(r.f[2].v) || 0 }));
const kulut = rivit.reduce((a, r) => a + r.usd, 0);
const kaytetty = -rivit.reduce((a, r) => a + r.kr, 0);
const tulos = {
  ts: Date.now(), kk, kulut_usd: Math.round(kulut * 100) / 100,
  palvelut: rivit.filter((r) => r.usd > 0.005).map((r) => ({ nimi: r.nimi, usd: Math.round(r.usd * 100) / 100 })),
};
const kokoKr = Number(process.env.GOOGLE_KREDIITTI_USD);
if (kokoKr > 0) {
  tulos.krediitti = { summa_usd: kokoKr, kaytetty_usd: Math.round(kaytetty * 100) / 100 };
  if (process.env.GOOGLE_KREDIITTI_NOLLAUTUU) tulos.krediitti.nollautuu = process.env.GOOGLE_KREDIITTI_NOLLAUTUU;
}
if (Number(process.env.GOOGLE_BUDJETTI_USD) > 0) tulos.budjetti_usd = Number(process.env.GOOGLE_BUDJETTI_USD);
writeFileSync(ulos, JSON.stringify(tulos, null, 1));
console.log('google', kk, 'kulut', tulos.kulut_usd, 'palveluja', tulos.palvelut.length);
