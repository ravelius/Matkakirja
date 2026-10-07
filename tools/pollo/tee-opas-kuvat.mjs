#!/usr/bin/env node
/*
 * ELÄVÄN OPPAAN KUVALISTA (omistaja 6.10.2026 20.0x, Päätoimittaja): opas näyttää VAIN valmiiksi speksattuja kuvia, jotka
 * tulevat tästä listasta (media.matkakirja.app/opas/kuvat-v1/kuvat.json). Avain on Wikidatan Q, joten nimiongelmat
 * (Tokyo ≠ Tokio) eivät vaikuta.
 *
 * Versio 1 kootaan pelin nykyisistä kuvista (tee-opas-aineisto.mjs: kulttuuriluokat, nostot, kansi- ja avauskuvat):
 *  - Kaupungin kaikki kuvat → kaupungit[<id>].kuvat (kaupungin pysähdys ja varakuva).
 *  - Kohteen Q saadaan Commonsin rakenteisesta "esittää"-tiedosta (P180). Mukaan vain Q, jolla on koordinaatti (P625)
 *    enintään KOHDE_KM kaupungista ja jolla ei ole väkilukua (P1082: kaupungit, maat ja alueet eivät ole kohteita).
 *  - Sisältökirjurin kohdelistat (data/oppaan-kuvat/oppaan-kuvat.json, jos on) yhdistetään: hänen kuvansa ensin,
 *    kaupungin lukittu kohdelista (12, tärkeysjärjestys) kaupungit[<id>].kohteet-kenttään.
 * Kuvien url on aina peilistä (media.matkakirja.app/kuvat/…; pelin kuvat on jo peilattu). Peilistä puuttuva kuva jätetään
 * pois. Sisältökirjurin uudet kuvat ladataan pakettiin (opas/kuvat-v1/kuvat/…) ja url osoittaa sinne.
 *
 * Käyttö: node tools/pollo/tee-opas-kuvat.mjs [--ulos <vientipaketin kansio>] [--sisalto <oppaan-kuvat.json>]
 * Tulos: <ulos>/opas/kuvat-v1/kuvat.json + LAHTEET.md (vie-paketti.sh, Julkaisija).
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { kokoaAineisto } from './tee-opas-aineisto.mjs';
import { PALLON_KAUPUNKIPISTEET } from '../../js/packs/maailmankartta-pallopisteet.js';
import { OPAS_SALLITUT, sallittuId } from './sallitut.js';

const TAMA = dirname(fileURLToPath(import.meta.url));
const JUURI = join(TAMA, '..', '..');
const UA = 'Matkakirja-opas/1.0 (https://matkakirja.app; peli@matkakirja.app)';
const PEILI = 'https://media.matkakirja.app/';
// Lista uuteen polkuun joka erällä (--versio v3 …; ämpäri ei ylikirjoita). Kuvat pysyvät kansiossa kuvat-v1/kuvat/.
export const KUVALISTA_POLKU = `opas/kuvat-${process.argv.includes('--versio') ? process.argv[process.argv.indexOf('--versio') + 1] : 'v2'}/kuvat.json`;
const KUVAKANSIO = 'opas/kuvat-v1/kuvat';
const KOHDE_KM = 40;
const KUVIA_KOHTEELLE = 5;   // Päätoimittaja 6.10. 20.1x: kohteella 1–5 kuvaa

const arg = (n) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : null; };
const siivoa = (t) => String(t ?? '').replace(/\s+/g, ' ').trim();
const odota = (ms) => new Promise((r) => setTimeout(r, ms));

async function hae(url, { json = true, tapa = 'GET' } = {}) {
  for (let yritys = 0; yritys < 4; yritys += 1) {
    try {
      const v = await fetch(url, { method: tapa, headers: { 'user-agent': UA } });
      if (v.status === 429 || v.status >= 500) { await odota(1500 * (yritys + 1)); continue; }
      if (!json) return v;
      if (!v.ok) throw new Error(`${v.status} ${url.slice(0, 120)}`);
      return await v.json();
    } catch (virhe) {
      if (yritys === 3) throw virhe;
      await odota(1000 * (yritys + 1));
    }
  }
  throw new Error(`ei vastausta ${url.slice(0, 120)}`);
}
const palat = (lista, n = 50) => Array.from({ length: Math.ceil(lista.length / n) }, (_, i) => lista.slice(i * n, i * n + n));
async function rinnakkain(lista, n, fn) {
  const tulos = new Array(lista.length); let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < lista.length) { const j = i++; tulos[j] = await fn(lista[j], j); } }));
  return tulos;
}
function etaisyysKm(a, b) {
  const r = Math.PI / 180;
  const s = Math.sin(((b.lat - a.lat) * r) / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(((b.lon - a.lon) * r) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.min(1, Math.sqrt(s)));
}
const lisenssiUrl = (l) => {
  const m = /^cc by(-sa)? (\d\.\d)/i.exec(l ?? '');
  if (m) return `https://creativecommons.org/licenses/by${m[1] ? '-sa' : ''}/${m[2]}/`;
  if (/^cc0/i.test(l ?? '')) return 'https://creativecommons.org/publicdomain/zero/1.0/';
  return null;
};

/** Pelin kaupungit (id, nimi, wiki) laudoilta. */
function pelinKaupungit() {
  const tulos = new Map();
  for (const f of ['europe', 'asia', 'africa', 'middleeast', 'northamerica', 'southamerica', 'oceania']) {
    const s = readFileSync(join(JUURI, 'js/packs', `${f}.js`), 'utf8');
    for (const m of s.matchAll(/\{\s*id:\s*'([a-z0-9-]+)',\s*name:\s*'([^']+)',\s*wiki:\s*'([^']+)'/g)) {
      if (!tulos.has(m[1])) tulos.set(m[1], { id: m[1], nimi: m[2], wiki: m[3] });
    }
  }
  return tulos;
}

async function kaupunkienPisteet(kaupungit) {
  const lista = [...kaupungit.values()];
  for (const pala of palat(lista)) {
    const d = await hae('https://fi.wikipedia.org/w/api.php?action=query&format=json&redirects=1&prop=coordinates%7Cpageprops'
      + `&colimit=max&ppprop=wikibase_item&titles=${encodeURIComponent(pala.map((k) => k.wiki).join('|'))}`);
    const nimet = new Map(pala.map((k) => [k.wiki, k.wiki]));
    for (const n of [...(d?.query?.normalized ?? []), ...(d?.query?.redirects ?? [])]) for (const [a, b] of nimet) if (b === n.from) nimet.set(a, n.to);
    const sivut = new Map(Object.values(d?.query?.pages ?? {}).map((x) => [x.title, x]));
    for (const k of pala) {
      const x = sivut.get(nimet.get(k.wiki)); const c = x?.coordinates?.[0];
      if (c) Object.assign(k, { lat: c.lat, lon: c.lon });
      if (x?.pageprops?.wikibase_item) k.Q = x.pageprops.wikibase_item;
    }
  }
}

/** Commons: esittää (P180) ja alkuperäiset mitat tiedostoille. */
async function commonsTiedot(tiedostot) {
  const tulos = new Map(tiedostot.map((t) => [t, { esittaa: [], leveys: null, korkeus: null }]));
  await rinnakkain(palat(tiedostot), 4, async (pala) => {
    const otsikot = encodeURIComponent(pala.map((t) => `File:${t}`).join('|'));
    const [m, i] = await Promise.all([
      hae(`https://commons.wikimedia.org/w/api.php?action=wbgetentities&format=json&sites=commonswiki&props=claims&titles=${otsikot}`),
      hae(`https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=size&titles=${otsikot}`)]);
    const avain = (otsikko) => String(otsikko ?? '').replace(/^File:/, '').replace(/_/g, ' ');
    const normaali = new Map(pala.map((t) => [avain(`File:${t}`), t]));
    for (const n of i?.query?.normalized ?? []) normaali.set(avain(n.to), normaali.get(avain(n.from)) ?? avain(n.from));
    // MediaInfo-entiteetin tunnus on "M" + sivun pageid (vastauksessa ei ole tiedostonimeä).
    const sivulle = new Map();
    for (const x of Object.values(i?.query?.pages ?? {})) {
      const t = normaali.get(avain(x.title)); const ii = x?.imageinfo?.[0];
      if (t && x.pageid) sivulle.set(`M${x.pageid}`, t);
      if (t && ii) Object.assign(tulos.get(t), { leveys: ii.width ?? null, korkeus: ii.height ?? null });
    }
    for (const [mid, e] of Object.entries(m?.entities ?? {})) {
      const t = sivulle.get(e?.id ?? mid); if (!t) continue;
      tulos.get(t).esittaa = (e.statements?.P180 ?? e.claims?.P180 ?? []).map((c) => c?.mainsnak?.datavalue?.value?.id).filter(Boolean);
    }
  });
  return tulos;
}

/** Wikidata: koordinaatti, väkiluku, suomenkielinen nimi (fi-Wikipedia, nimiö, en). */
async function wikidataKohteet(tunnukset) {
  const tulos = new Map();
  await rinnakkain(palat(tunnukset), 4, async (pala) => {
    const d = await hae('https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=claims%7Clabels%7Csitelinks'
      + `&languages=fi%7Cen&sitefilter=fiwiki&ids=${pala.join('|')}`);
    for (const [q, e] of Object.entries(d?.entities ?? {})) {
      const c = e?.claims?.P625?.[0]?.mainsnak?.datavalue?.value;
      const otsikko = String(e?.sitelinks?.fiwiki?.title ?? ''); const ilman = otsikko.replace(/\s*\([^)]*\)\s*$/, '');
      const nimi = (ilman !== otsikko ? e?.labels?.fi?.value || ilman : ilman || e?.labels?.fi?.value) || e?.labels?.en?.value || null;
      tulos.set(q, { lat: c?.latitude ?? null, lon: c?.longitude ?? null, vakiluku: Boolean(e?.claims?.P1082), nimi });
    }
  });
  return tulos;
}

async function peilissa(urlit) {
  const tulos = new Map();
  await rinnakkain(urlit, 16, async (u) => {
    const v = await hae(u, { json: false, tapa: 'HEAD' }).catch(() => null);
    tulos.set(u, Boolean(v?.ok && /^image\//.test(v.headers.get('content-type') ?? '')));
  });
  return tulos;
}

export async function kokoaKuvalista({ sisalto = null, ulos = null, loki = console.log } = {}) {
  const { peiliKuvaPolku } = await import(pathToFileURL(join(JUURI, 'js/media.js')).href);
  const { COMMONS_TEKIJAT } = await import(pathToFileURL(join(JUURI, 'js/packs/commons-tekijat.js')).href);
  const aineisto = await kokoaAineisto(JUURI);
  const kaupungit = pelinKaupungit();
  await kaupunkienPisteet(kaupungit);

  // Pelin kuvat kaupungeittain (järjestys = pelin järjestys).
  const pelinKuvat = [];
  for (const [id, a] of Object.entries(aineisto)) {
    (a.kuvat ?? []).forEach((k, i) => {
      const tiedosto = /File:(.+)$/.exec(decodeURIComponent(k.lahde ?? ''))?.[1]?.replace(/_/g, ' ') ?? null;
      pelinKuvat.push({ kaupunki: id, jarjestys: i + 1, tiedosto, k });
    });
  }
  const tiedostot = [...new Set(pelinKuvat.map((x) => x.tiedosto).filter(Boolean))];
  loki(`pelin kuvia ${pelinKuvat.length}, Commons-tiedostoja ${tiedostot.length}, kaupunkeja ${Object.keys(aineisto).length}`);
  const commons = await commonsTiedot(tiedostot);
  const urlit = new Map(tiedostot.map((t) => [t, PEILI + peiliKuvaPolku(t, 'kuvat')]));
  const peilattu = await peilissa([...urlit.values()]);
  loki(`peilissä ${[...peilattu.values()].filter(Boolean).length}/${peilattu.size}`);

  const kuvaksi = ({ tiedosto, k, jarjestys }) => {
    if (k.tyyppi === 'havainnekuva') {
      return { url: k.url, tyyppi: 'havainnekuva', tekija: null, lisenssi: 'HAVAINNEKUVA', lisenssiUrl: null, lahdeUrl: null,
        selite: k.selite ?? null, leveys: null, korkeus: null, jarjestys, tarkistettu: true };
    }
    const url = tiedosto ? urlit.get(tiedosto) : null;
    if (!url || !peilattu.get(url)) return null;
    const ct = COMMONS_TEKIJAT[tiedosto];
    const c = commons.get(tiedosto) ?? {};
    return { url, tyyppi: 'valokuva', tekija: k.tekija ?? (ct?.[0] || null), lisenssi: k.lisenssi, lisenssiUrl: ct?.[2] || lisenssiUrl(k.lisenssi),
      lahdeUrl: k.lahde, selite: k.selite ?? null, leveys: c.leveys ?? null, korkeus: c.korkeus ?? null, jarjestys, tarkistettu: true };
  };

  const tulos = { skeema: 1, versio: new Date().toISOString().slice(0, 10), kohteet: {}, kaupungit: {}, aliakset: {} };
  for (const [id, a] of Object.entries(aineisto)) {
    const p = kaupungit.get(id);
    // Ilman Wikidata-koordinaattia (Venetsia, Kreeta, Islanti ym., Päätoimittaja 7.10.): ensin sallitun 3D-alueen keskus
    // (LS2: hyvän 3D:n painopiste, sama kuin oppaan ja yövalojen), sitten pelin oma pallopiste.
    const sp = OPAS_SALLITUT.sallitut.find((x) => x.id === id || x.id === sallittuId(a.nimi ?? '')) ?? null;
    const pp = sp ?? PALLON_KAUPUNKIPISTEET[id] ?? null;
    tulos.kaupungit[id] = { nimi: a.nimi ?? p?.nimi ?? id, Q: p?.Q ?? null, lat: p?.lat ?? pp?.lat ?? null, lon: p?.lon ?? pp?.lon ?? null,
      kohteet: [], kuvat: [] };
  }
  for (const x of pelinKuvat) {
    const kuva = kuvaksi(x);
    if (kuva) tulos.kaupungit[x.kaupunki].kuvat.push(kuva);
  }

  // Kohteet Commonsin esittää-tiedosta.
  const ehdokasQ = [...new Set([...commons.values()].flatMap((c) => c.esittaa))];
  const wd = await wikidataKohteet(ehdokasQ);
  const kaupunkiQt = new Set([...kaupungit.values()].map((k) => k.Q).filter(Boolean));
  let liitetty = 0;
  for (const x of pelinKuvat) {
    if (!x.tiedosto) continue;
    const kp = kaupungit.get(x.kaupunki);
    for (const q of commons.get(x.tiedosto)?.esittaa ?? []) {
      const w = wd.get(q);
      if (!w || w.lat == null || w.vakiluku || kaupunkiQt.has(q) || !w.nimi) continue;
      if (kp?.lat != null && etaisyysKm(kp, w) > KOHDE_KM) continue;
      const kuva = kuvaksi(x); if (!kuva) continue;
      const kohde = (tulos.kohteet[q] ??= { nimi: w.nimi, kaupunki: x.kaupunki, kaupunkiQ: kp?.Q ?? null, lat: w.lat, lon: w.lon, kuvat: [] });
      if (kohde.kuvat.length < KUVIA_KOHTEELLE && !kohde.kuvat.some((k) => k.url === kuva.url)) {
        kohde.kuvat.push({ ...kuva, jarjestys: kohde.kuvat.length + 1 }); liitetty += 1;
      }
    }
  }
  loki(`kohteita ${Object.keys(tulos.kohteet).length} (kuvia liitetty ${liitetty})`);

  // Sisältökirjurin kohdelistat: hänen kuvansa ensin, kaupungin lukittu kohdelista.
  if (sisalto && existsSync(sisalto)) {
    const s = JSON.parse(readFileSync(sisalto, 'utf8'));
    const kansio = ulos ? join(ulos, KUVAKANSIO) : null;
    if (kansio) mkdirSync(kansio, { recursive: true });
    let ladattu = 0;
    for (const [q, k] of Object.entries(s.kohteet ?? {})) {
      const omat = [];
      for (const kuva of k.kuvat ?? []) {
        if (!kuva.tiedosto || !kansio) continue;
        const nimi = `${createHash('sha1').update(kuva.tiedosto).digest('hex').slice(0, 16)}.jpg`;
        const polku = join(kansio, nimi);
        if (!existsSync(polku)) {
          const v = await hae(`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(kuva.tiedosto)}?width=1280`, { json: false });
          if (!v?.ok) continue;
          writeFileSync(polku, Buffer.from(await v.arrayBuffer())); ladattu += 1;
        }
        const { tiedosto, ...loput } = kuva;
        omat.push({ ...loput, url: `${PEILI}${KUVAKANSIO}/${nimi}`, tyyppi: 'valokuva' });
      }
      const vanha = tulos.kohteet[q];
      const kuvat = [...omat, ...(vanha?.kuvat ?? []).filter((x) => !omat.some((o) => o.lahdeUrl === x.lahdeUrl))]
        .slice(0, KUVIA_KOHTEELLE).map((x, i) => ({ ...x, jarjestys: i + 1 }));
      tulos.kohteet[q] = { ...(vanha ?? {}), nimi: k.nimi ?? vanha?.nimi, kaupunki: k.kaupunki ?? vanha?.kaupunki, kaupunkiQ: k.kaupunkiQ ?? vanha?.kaupunkiQ ?? null,
        lat: k.lat ?? vanha?.lat, lon: k.lon ?? vanha?.lon, ...(k.koko_m ? { koko_m: k.koko_m } : {}), kuvat };
      for (const a of k.aliakset ?? []) tulos.aliakset[a] = q;
    }
    for (const [id, kk] of Object.entries(s.kaupungit ?? {})) {
      const t = (tulos.kaupungit[id] ??= { nimi: kk.nimi ?? id, Q: kk.Q ?? null, lat: kk.lat ?? null, lon: kk.lon ?? null, kohteet: [], kuvat: [] });
      if (Array.isArray(kk.kohteet)) t.kohteet = kk.kohteet;
    }
    loki(`Sisältökirjurin kohteita ${Object.keys(s.kohteet ?? {}).length}, ladattu ${ladattu} kuvaa`);
  }
  return tulos;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const ulos = arg('--ulos');
  const tulos = await kokoaKuvalista({ sisalto: arg('--sisalto'), ulos });
  const polku = join(ulos ?? '.', KUVALISTA_POLKU);
  mkdirSync(dirname(polku), { recursive: true });
  writeFileSync(polku, JSON.stringify(tulos));
  if (ulos) {
    const kohteita = Object.keys(tulos.kohteet).length;
    const kuvia = Object.values(tulos.kohteet).reduce((s, k) => s + k.kuvat.length, 0) + Object.values(tulos.kaupungit).reduce((s, k) => s + k.kuvat.length, 0);
    writeFileSync(join(ulos, 'LAHTEET.md'), `# Elävän oppaan kuvalista v1 (${tulos.versio})\n\nTuotettu: node tools/pollo/tee-opas-kuvat.mjs (Pelikoodari).\n`
      + `Pelin nykyiset kuvat (Wikimedia Commons, vapaat lisenssit; tekijä, lisenssi ja lähde kuvakohtaisesti listassa) sekä `
      + `Matkakirjan omat havainnekuvat. Kohteen Wikidata-tunnus Commonsin "esittää"-tiedosta (P180, CC0).\n\n`
      + `- ${KUVALISTA_POLKU}: ${kohteita} kohdetta ja ${Object.keys(tulos.kaupungit).length} kaupunkia, ${kuvia} kuvaa. Pelin kuvat ovat peilissä (media.matkakirja.app/kuvat/…).\n`
      + `- ${KUVAKANSIO}/: Sisältökirjurin kohdelistojen kuvat (Wikimedia Commons, 1 280 px), tekijä, lisenssi ja `
      + `lähde kuvakohtaisesti listassa. Lukitut kaupungit: ${Object.entries(tulos.kaupungit).filter(([, k]) => (k.kohteet?.length ?? 0) >= 6).map(([id]) => id).join(', ') || '–'}.\n`);
  }
  if (ulos) {
    // vie-paketti.sh vaatii SHA256SUMS:n (suhteelliset polut, kaikki paitsi LAHTEET.md).
    const rivit = [];
    const kay = (kansio) => {
      for (const n of readdirSync(join(ulos, kansio), { withFileTypes: true })) {
        const suht = kansio ? `${kansio}/${n.name}` : n.name;
        if (n.isDirectory()) kay(suht);
        else if (!['LAHTEET.md', 'SHA256SUMS', '.DS_Store'].includes(n.name)) rivit.push(`${createHash('sha256').update(readFileSync(join(ulos, suht))).digest('hex')}  ${suht}`);
      }
    };
    kay('');
    writeFileSync(join(ulos, 'SHA256SUMS'), `${rivit.sort((a, b) => a.split('  ')[1].localeCompare(b.split('  ')[1])).join('\n')}\n`);
  }
  console.log(`kirjoitettu ${polku} (${(JSON.stringify(tulos).length / 1e6).toFixed(2)} Mt)`);
}
