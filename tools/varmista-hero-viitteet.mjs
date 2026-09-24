#!/usr/bin/env node
/*
 * HEROJEN VIITTEIDEN VARMISTUS AJONAIKAISTA COMMONSIA VASTEN.
 *
 *   node tools/varmista-hero-viitteet.mjs [T=2026-08-22T21:00:00Z] [tiedosto,tiedosto]
 *
 * 23.–24.8.2026 hero-ajon viiteloki katosi, ja 60 heron viitteet
 * rekonstruoitiin ajamalla tools/hae-viitekuvat.mjs uudelleen nykyistä
 * Commonsia vasten (docs/raportit/herokuvien-viitteet-20260923.md). Tämä
 * työkalu ajaa saman muuttamattoman valinnan uudelleen niin kuin Commons
 * oli hetkellä T, ja vertaa tulosta rekonstruktioon
 * (tools/hero-viiteloki.tsv ja pakan `viitteet`-kentät).
 *
 * MITEN AIKA KÄÄNNETÄÄN: fetch korvataan kääreellä, joka vastaa
 * hae-viitekuvat.mjs:n kategoriakyselyihin itse:
 *   - kategorian jäsenet ovat ne, joiden liitosaika (cl_timestamp) on <= T,
 *     samassa lajittelujärjestyksessä kuin Commons antaa ne;
 *   - ajon jälkeen kategoriasta POISTETUT (Commonsin muutosloki,
 *     rctype=categorize) lisätään takaisin (POISTETUT alla);
 *   - uudelleen nimetyt tiedostot ja kategoriat palautetaan ajonaikaiselle
 *     nimelle (VANHA_NIMI, SIIRRETTY_KATEGORIA), koska järjestys vertaa
 *     tiedostonimeä kategorian sanoihin.
 *
 * COMMONSIN 50 KUVAN RAJA: alkuperäinen kysely (generator=categorymembers,
 * gcmlimit=60, iiurlwidth) saa imageinfon vain 50 sivulle, tiedostonimen
 * tietokanta-avaimen järjestyksessä; loput jäävät iicontinue-jatkoon, jota
 * hae-viitekuvat.mjs ei seuraa. Kääre toistaa tämän täsmälleen — ilman sitä
 * valinta erosi 26 herolla 60:stä. Kalibrointi: T = nykyhetki toistaa
 * rekonstruktion 60/60.
 *
 * Tulos 23.9.2026: T = 23.8. 00.00 ja T = 24.8. 14.00 (EEST) → 60/60 sama.
 * docs/raportit/herokuvien-viitteet-20260923-varmistus.md.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const T = process.argv[2] ?? '2026-08-22T21:00:00Z';
const VAIN = process.argv[3] ? new Set(process.argv[3].split(',')) : null;
const UA = { 'User-Agent': 'Matkakirja-lisenssitarkistus/1 (https://github.com/ravelius/Matkakirja)' };
const COMMONS = 'https://commons.wikimedia.org/w/api.php';

/** Ajon jälkeen kategoriasta poistetut (muutosloki 24.8.–23.9.2026). */
const POISTETUT = {
  'Category:San Francisco de Asis (Lima)': ['File:Iglesia San Francisco,Lima.jpg'],
  'Category:Carondelet Palace, Quito': [
    'File:CARTA DE JAMAICA (33174965622).jpg', 'File:CARTA DE JAMAICA (33174968202).jpg',
    'File:CARTA DE JAMAICA (33202394261).jpg', 'File:CARTA DE JAMAICA (33174969572).jpg',
    'File:CARTA DE JAMAICA (33330315885).jpg',
  ],
};
/** Kategoria siirrettiin 11.9.2026; ajon aikana jäsenet olivat vanhalla nimellä. */
const SIIRRETTY_KATEGORIA = { 'Category:Fannie Bay Goal': 'Category:Fannie Bay Gaol' };
/** Siirron jälkeen lisätty jäsen (ei ollut vanhassa kategoriassa, tarkistettu wikitekstistä). */
const SIIRRON_JALKEEN = new Set(['File:Nemarluk.tif']);
/** Nykyinen nimi → ajonaikainen nimi. */
const VANHA_NIMI = { 'File:Fannie Bay Gaol P6200008.jpg': 'File:Fannie Bay Goal P6200008.JPG' };

const nuku = (ms) => new Promise((r) => setTimeout(r, ms));
const oikeaFetch = globalThis.fetch;
async function hae(url) {
  for (let y = 0; y < 6; y += 1) {
    await nuku(1100);
    const v = await oikeaFetch(url, { headers: UA });
    if (v.status === 429) { await nuku(5000 * (y + 1)); continue; }
    return v.json();
  }
  throw new Error(`Commons vastasi 429 toistuvasti: ${url}`);
}

async function jasenet(kategoria, tyyppi) {
  const lahde = SIIRRETTY_KATEGORIA[kategoria] ?? kategoria;
  const kaikki = [];
  let jatko = '';
  do {
    const d = await hae(`${COMMONS}?format=json&action=query&list=categorymembers`
      + `&cmtitle=${encodeURIComponent(lahde)}&cmtype=${tyyppi}&cmprop=title|timestamp&cmlimit=500${jatko}`);
    kaikki.push(...(d.query?.categorymembers ?? []));
    jatko = d.continue?.cmcontinue ? `&cmcontinue=${encodeURIComponent(d.continue.cmcontinue)}` : '';
  } while (jatko && kaikki.length < 3000);
  // Siirretyn kategorian liitosaika on siirron hetki, joten aikasuodatus ei päde.
  const ajossa = SIIRRETTY_KATEGORIA[kategoria]
    ? kaikki.filter((x) => !SIIRRON_JALKEEN.has(x.title))
    : kaikki.filter((x) => x.timestamp <= T);
  let nimet = ajossa.map((x) => x.title);
  if (tyyppi === 'file' && POISTETUT[kategoria]) {
    // Oletuslajitteluavain on otsikko isoin kirjaimin (tarkistettu naapureista).
    const avain = (t) => t.replace(/^File:/, '').toUpperCase();
    nimet = [...nimet, ...POISTETUT[kategoria]]
      .sort((a, b) => (avain(a) < avain(b) ? -1 : avain(a) > avain(b) ? 1 : 0));
  }
  return nimet;
}

globalThis.fetch = async (url, asetukset) => {
  const u = new URL(String(url));
  const p = u.searchParams;
  if (u.hostname === 'commons.wikimedia.org' && p.get('generator') === 'categorymembers') {
    const ikkuna = (await jasenet(p.get('gcmtitle'), 'file')).slice(0, Number(p.get('gcmlimit')));
    const dbAvain = (t) => Buffer.from((VANHA_NIMI[t] ?? t).replace(/^File:/, '').replace(/ /g, '_'));
    const nimet = [...ikkuna].sort((a, b) => Buffer.compare(dbAvain(a), dbAvain(b))).slice(0, 50);
    for (const k of ['generator', 'gcmtitle', 'gcmtype', 'gcmlimit']) p.delete(k);
    p.set('titles', nimet.join('|'));
    const d = await hae(u.toString());
    const sivut = d.query?.pages ?? {};
    for (const s of Object.values(sivut)) if (VANHA_NIMI[s.title]) s.title = VANHA_NIMI[s.title];
    return new Response(JSON.stringify({ query: { pages: sivut } }));
  }
  if (u.hostname === 'commons.wikimedia.org' && p.get('list') === 'categorymembers' && p.get('cmtype') === 'subcat') {
    const nimet = (await jasenet(p.get('cmtitle'), 'subcat')).slice(0, Number(p.get('cmlimit')));
    return new Response(JSON.stringify({ query: { categorymembers: nimet.map((title) => ({ title })) } }));
  }
  await nuku(1100);
  return oikeaFetch(url, { ...asetukset, headers: { ...(asetukset?.headers ?? {}), ...UA } });
};

const { haeViitekuvat } = await import('./hae-viitekuvat.mjs');
const loki = new Map();
for (const rivi of readFileSync(join(JUURI, 'tools/hero-viiteloki.tsv'), 'utf8').split('\n')) {
  if (!rivi || rivi.startsWith('#')) continue;
  const [hero, nimi] = rivi.split('\t');
  if (!loki.has(hero)) loki.set(hero, []);
  loki.get(hero).push(nimi);
}
const nykyinen = Object.fromEntries(Object.entries(VANHA_NIMI).map(([n, v]) => [v, n]));
const tyolistat = readFileSync(join(JUURI, 'docs/raportit/herokuvien-viitteet-20260923-rekonstruktio.json'), 'utf8');
let erot = 0;
for (const h of JSON.parse(tyolistat)) {
  const tiedosto = h.ampari.split('/').pop();
  if (VAIN && !VAIN.has(tiedosto)) continue;
  const { TYOLISTA } = await import(`./hero-tyolista-${h.lista}.mjs`);
  const t = TYOLISTA.find((x) => x.tiedosto === tiedosto);
  const v = await haeViitekuvat(t.viitehaku ?? t.wiki ?? '', t.kaupunki ?? '', {
    wiki: t.wiki, kategoria: t.kategoria, suosi: t.viitesuosi, maara: 4, lataa: false,
  });
  const ajossa = v.kuvat.map((k) => nykyinen[k.nimi] ?? k.nimi).sort();
  const lokissa = [...(loki.get(tiedosto) ?? [])].sort();
  const sama = JSON.stringify(ajossa) === JSON.stringify(lokissa);
  if (!sama) erot += 1;
  console.log(`${sama ? 'SAMA' : 'ERO '} ${tiedosto}${sama ? '' : `\n  ajossa: ${ajossa.join(' | ')}\n  lokissa: ${lokissa.join(' | ')}`}`);
}
console.log(`\nT = ${T}: ${erot ? `${erot} eroa` : 'kaikki samat'}`);
process.exitCode = erot ? 1 : 0;
