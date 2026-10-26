/*
 * KARTAN TIETOKORTIT (Raamattu 2.203, omistaja 26.10.2026 klo 22.13: "Faktat heti, pulun teksti striimataan. Kohteita liikaa.
 * Mietitään myöhemmin generoimista etukäteen."). Syvän kartan nimi (OpenMapTiles: nimi, luokka, piste) → Wikidata-kohde ja
 * kortin faktat kiinteällä suomenkielisellä kaavalla. Pulun teksti (lyhyt ja Lue lisää) syntyy workerissa vain lähteen
 * (Wikidata, Wikipedia) faktoista, ja kaikki tuotettu tallennetaan R2:een kaikille pelaajille (ei generoida kahdesti).
 *
 * Haut vain MediaWikin ja Wikidatan /w/api.php:llä kuvaavalla User-Agentilla (robots.txt: api.php sallittu, ei SPARQLia).
 * Linkitys: nimihaku (wbsearchentities en/fi/de/fr) → kohteet, joiden P625 on säteen sisällä → paras: Wikipedia-artikkelin
 * otsikko täsmää nimeen, sitten laji sopii OSM-luokkaan (asutus / luonto), sitten lähin.
 *
 * Suomenkielinen kaava on LUONNOS (Sisältökirjuri tekee lopullisen, PT 26.10. 22.13).
 */
import { haeJson } from './opas.js';

export const TIETOKORTTI_VERSIO = 'v1';
/** Tietokortit pysyvät; uusi versio = uusi avain. */
export const TIETOKORTTI_TTL_S = 365 * 24 * 3600;

/** OSM-luokan hakusäde metreinä (piste on paikan keskellä; vesistöjen ja vuorten piste voi olla kaukana nimen kohdasta). */
const SADE = {
  city: 15000, town: 8000, village: 4000, hamlet: 3000, suburb: 4000, quarter: 3000, neighbourhood: 2000, isolated_dwelling: 2000,
  peak: 4000, volcano: 6000, lake: 30000, water: 30000, river: 400000, sea: 800000, bay: 60000,
};
const ASUTUS = new Set(['Q515', 'Q3957', 'Q532', 'Q5084', 'Q123705', 'Q486972', 'Q1549591', 'Q1180262', 'Q1115575', 'Q2755753',
  'Q211690', 'Q1637706', 'Q15284', 'Q747074', 'Q3184121', 'Q1907114', 'Q1093829', 'Q7930989', 'Q2989398', 'Q15078955', 'Q188509',
  'Q1266818', 'Q667509', 'Q484170', 'Q262166', 'Q2039348', 'Q856076', 'Q5119']);
const LUONTO = new Set(['Q8502', 'Q54050', 'Q207326', 'Q23397', 'Q4022', 'Q165', 'Q39594', 'Q131681', 'Q12323', 'Q1437299', 'Q23442',
  'Q46831', 'Q34763', 'Q45776', 'Q133056', 'Q35666', 'Q47521', 'Q8072', 'Q6017969']);
const ASUTUSLUOKAT = new Set(['city', 'town', 'village', 'hamlet', 'suburb', 'quarter', 'neighbourhood', 'isolated_dwelling']);

/** Välimuistin avain: luokka, nimi ja piste 0,01°:n tarkkuudella (sama paikka eri palasta = sama kortti). */
export function korttiAvain({ nimi, lat, lon, luokka }) {
  const n = String(nimi ?? '').trim().toLowerCase().normalize('NFC');
  return `tietokortti:${TIETOKORTTI_VERSIO}:${luokka}:${n}:${Number(lat).toFixed(2)}:${Number(lon).toFixed(2)}`;
}
export const tekstiAvain = (qid, laji) => `tietokortti:${TIETOKORTTI_VERSIO}:teksti:${laji}:${qid}`;

function etaisyysM(e, lat, lon) {
  const v = e?.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
  if (!Number.isFinite(v?.latitude)) return Infinity;
  const r = Math.PI / 180;
  const dl = (v.latitude - lat) * r, dp = (v.longitude - lon) * r * Math.cos(lat * r);
  return 6371000 * Math.hypot(dl, dp);
}
const p31 = (e) => new Set((e?.claims?.P31 ?? []).map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean));
/** 2 = Wikipedia-artikkelin otsikko on nimi, 1 = vain nimiö, 0 = ei kumpaakaan. */
function otsikkoTasmaa(e, nimi) {
  const n = nimi.toLowerCase();
  if (['fiwiki', 'enwiki'].some((k) => {
    const t = e?.sitelinks?.[k]?.title;
    return t && t.split(',')[0].split(' (')[0].trim().toLowerCase() === n;
  })) return 2;
  return Object.values(e?.labels ?? {}).some((l) => l?.value?.toLowerCase() === n) ? 1 : 0;
}

/** Paras Wikidata-kohde nimelle ja pisteelle, tai null. */
export async function linkitaWikidata(haku, { nimi, lat, lon, luokka }) {
  const sade = SADE[luokka] ?? 5000;
  const ids = [];
  for (const kieli of ['en', 'fi', 'de', 'fr']) {
    try {
      const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&type=item&limit=10'
        + `&language=${kieli}&uselang=${kieli}&search=${encodeURIComponent(nimi)}`);
      for (const h of d?.search ?? []) if (!ids.includes(h.id)) ids.push(h.id);
    } catch { /* seuraava kieli */ }
    if (ids.length >= 12) break;
  }
  if (!ids.length) return null;
  const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json'
    + '&props=labels%7Cclaims%7Csitelinks%7Cdescriptions&languages=fi%7Cen&sitefilter=fiwiki%7Cenwiki'
    + `&ids=${ids.slice(0, 50).join('%7C')}`);
  const toive = ASUTUSLUOKAT.has(luokka) ? ASUTUS : LUONTO;
  const ehdokkaat = Object.values(d?.entities ?? {})
    .map((e) => ({ e, m: etaisyysM(e, lat, lon) }))
    .filter((x) => x.m <= sade)
    .sort((a, b) => (otsikkoTasmaa(b.e, nimi) - otsikkoTasmaa(a.e, nimi))
      || ([...p31(b.e)].some((q) => toive.has(q)) - [...p31(a.e)].some((q) => toive.has(q)))
      || (a.m - b.m));
  return ehdokkaat[0]?.e ?? null;
}

async function nimiot(haku, qids) {
  if (!qids.length) return {};
  try {
    const d = await haeJson(haku, 'https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=labels'
      + `&languages=fi%7Cen&ids=${qids.join('%7C')}`);
    return Object.fromEntries(Object.entries(d?.entities ?? {})
      .map(([q, e]) => [q, { fi: e?.labels?.fi?.value ?? null, en: e?.labels?.en?.value ?? null }]));
  } catch {
    return {};
  }
}

const arvot = (e, p) => (e?.claims?.[p] ?? []).map((c) => c?.mainsnak?.datavalue?.value).filter((v) => v != null);

/** Väkiluku ja vuosi: preferred-rankin arvo, muuten uusin (P585). */
export function vakiluku(e) {
  let paras = null;
  for (const c of e?.claims?.P1082 ?? []) {
    const m = Number(c?.mainsnak?.datavalue?.value?.amount);
    if (!Number.isFinite(m)) continue;
    const aika = c?.qualifiers?.P585?.[0]?.datavalue?.value?.time ?? '';
    const v = { maara: Math.round(m), vuosi: /^\+(\d{4})/.exec(aika)?.[1] ?? null, ensisijainen: c.rank === 'preferred' };
    if (!paras || (v.ensisijainen && !paras.ensisijainen)
      || (v.ensisijainen === paras.ensisijainen && (v.vuosi ?? '') > (paras.vuosi ?? ''))) paras = v;
  }
  return paras;
}

/** "noin 180 000 asukasta (2021)": kaksi merkitsevää numeroa, välilyönti tuhaterottimena; alle 1 000 tarkkana. */
export function asukkaatTeksti(v) {
  if (!v?.maara) return null;
  let n = v.maara;
  if (n >= 1000) { const k = 10 ** (String(n).length - 2); n = Math.round(n / k) * k; }
  const luku = String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${v.maara >= 1000 ? 'noin ' : ''}${luku} asukas${v.maara === 1 ? '' : 'ta'}${v.vuosi ? ` (${v.vuosi})` : ''}`;
}

/** Commonsin kuva (P18) vapaalla lisenssillä: { url, tekija, lisenssi, lahde } tai null. */
async function commonsKuva(haku, tiedosto) {
  if (!tiedosto) return null;
  try {
    const c = await haeJson(haku, 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo'
      + `&iiprop=url%7Cextmetadata&iiurlwidth=800&titles=${encodeURIComponent(`File:${tiedosto}`)}`);
    const tieto = Object.values(c?.query?.pages ?? {})[0]?.imageinfo?.[0];
    const meta = tieto?.extmetadata ?? {};
    const pois = (t) => String(t ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const lisenssi = pois(meta.LicenseShortName?.value);
    if (!tieto?.thumburl || /\b(nc|nd)\b/i.test(lisenssi) || !/^(pd\b|public domain|cc0|cc by(-sa)? \d)/i.test(lisenssi)) return null;
    return { url: tieto.thumburl, tekija: pois(meta.Artist?.value) || null, lisenssi: /^public domain$/i.test(lisenssi) ? 'PD' : lisenssi,
      lahde: tieto.descriptionurl ?? null };
  } catch {
    return null;
  }
}

/** Kortin faktat Wikidata-kohteesta (kaava: nimi; laji ja sijainti; asukkaat tai korkeus; kuva). Puuttuva kenttä jää pois. */
export async function korttiFaktat(haku, e, osmNimi) {
  const lajit = arvot(e, 'P31').map((v) => v.id).slice(0, 2);
  const paikka = [...arvot(e, 'P131').map((v) => v.id).slice(0, 1), ...arvot(e, 'P17').map((v) => v.id).slice(0, 1)];
  const L = await nimiot(haku, [...new Set([...lajit, ...paikka])]);
  const fi = (q) => L[q]?.fi ?? null;
  const laji = lajit.map(fi).find(Boolean) ?? null;
  const sijainti = [...new Set(paikka.map((q) => fi(q) ?? L[q]?.en).filter(Boolean))].join(', ') || null;
  const korkeus = arvot(e, 'P2044').map((v) => Math.round(Number(v.amount))).find(Number.isFinite) ?? null;
  const v = vakiluku(e);
  return {
    qid: e.id,
    nimi: e?.labels?.fi?.value ?? osmNimi,
    laji,
    sijainti,
    // Kaava (luonnos): "Kylä Etelä-Cambridgeshiressä, Yhdistynyt kuningaskunta" → kortti rakentaa rivin laji + sijainti.
    rivit: [
      laji && sijainti ? `${laji[0].toUpperCase()}${laji.slice(1)} – ${sijainti}` : (laji ?? sijainti),
      asukkaatTeksti(v),
      korkeus != null && !v ? `${korkeus} metriä merenpinnan yläpuolella` : null,
    ].filter(Boolean),
    asukkaat: v,
    korkeusM: korkeus,
    kuva: await commonsKuva(haku, arvot(e, 'P18')[0]),
    wiki: { fi: e?.sitelinks?.fiwiki?.title ?? null, en: e?.sitelinks?.enwiki?.title ?? null },
  };
}

/** Wikipedian johdanto (fi, muuten en) tekstiksi Pululle: { kieli, otsikko, teksti } tai null. pitka = koko artikkelin alku. */
export async function wikiLahde(haku, wiki, pitka) {
  for (const [kieli, otsikko] of [['fi', wiki?.fi], ['en', wiki?.en]]) {
    if (!otsikko) continue;
    try {
      const d = await haeJson(haku, `https://${kieli}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&explaintext=1`
        + `${pitka ? '' : '&exintro=1'}&redirects=1&titles=${encodeURIComponent(otsikko)}`);
      const t = Object.values(d?.query?.pages ?? {})[0]?.extract;
      if (t && t.trim().length > 80) return { kieli, otsikko, teksti: t.trim().slice(0, pitka ? 12000 : 4000) };
    } catch { /* seuraava kieli */ }
  }
  return null;
}

/** Pulun ohje (LUONNOS; Sisältökirjuri tekee lopullisen): vain lähteen faktat, suomeksi, Pulun äänellä. */
export function pulunOhje(pitka) {
  return [
    'Olet Pulu, Matkakirja-pelin viisas pöllö. Kerrot pelaajalle kartalla napautetusta paikasta suomeksi.',
    'Käytä VAIN alla annetun lähdetekstin ja faktojen tietoja. Älä keksi mitään, älä arvaa vuosilukuja, nimiä tai lukuja.',
    'Jos lähde ei kerro jostakin, älä mainitse sitä. Älä viittaa lähteeseen äläkä sano "Wikipedian mukaan".',
    pitka
      ? 'Kirjoita 3–4 lyhyttä kappaletta (yhteensä 150–220 sanaa): mitä paikka on, sen historiaa ja mikä siinä on erityistä.'
      : 'Kirjoita 2–3 virkettä (enintään 60 sanaa): mikä paikka on ja yksi kiinnostava fakta siitä.',
    'Ei otsikoita, ei luetteloita, ei markdownia. Kohderyhmä 13+ ja aikuiset; lämmin, selkeä ja tarkka sävy.',
  ].join('\n');
}

export function pulunViesti(faktat, lahde) {
  return `Paikka: ${faktat.nimi}\nFaktat: ${faktat.rivit.join('; ')}\n\nLähdeteksti (${lahde?.kieli ?? '-'}): ${lahde?.teksti ?? '(ei lähdetekstiä)'}`;
}
