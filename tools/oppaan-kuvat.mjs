/*
 * ELÄVÄN OPPAAN KUVAHAKU (omistaja 6.10.2026: "matkaoppaassa ei näytettäisi mitään muita kuin valmiiksi speksattuja
 * kuvia"; Päätoimittajan urakka, Sisältökirjuri johtaa Sonnet-agenteilla). Per kaupunki lukittu 6–20 kohteen lista
 * (Wikidata Q, suomenkielinen nimi, P625-koordinaatit, merkittävyysperuste) ja kullekin 1–5 kuvaa. Tulos: data/oppaan-kuvat/kaupungit/<id>.json,
 * jonka `kokoa` yhdistää avaimella Q tiedostoon data/oppaan-kuvat/oppaan-kuvat.json (muoto: data/oppaan-kuvat/MUOTO.md).
 *
 *   node tools/oppaan-kuvat.mjs seed <kaupunki-id>       pelin omat ainekset: kartan kohteet, pelin kuvat tiedostonimin
 *   node tools/oppaan-kuvat.mjs q "<haku>" [kieli=fi]     Wikidata-haku: Q, nimi, kuvaus, P625
 *   node tools/oppaan-kuvat.mjs kuvat <Q> [--raja 40]     Commons-ehdokkaat kohteelle (P18 + P373-kategoria), suodatettuna
 *   node tools/oppaan-kuvat.mjs haku "<teksti>" [--raja 30]   Commons-vapaahaku samoilla suodattimilla (kun kategoria ei riitä)
 *   node tools/oppaan-kuvat.mjs tiedosto "<Nimi.jpg>" ...    yksittäisten tiedostojen tiedot ja suodatus
 *   node tools/oppaan-kuvat.mjs taulu <Q|haku:teksti|tiedosto:Nimi.jpg> ... --ulos <t.jpg> [--raja 30]   ehdokkaat numeroituna kuvatauluna
 *   node tools/oppaan-kuvat.mjs rakenna <spec.json>        spec -> kaupunkitiedosto (kuvakentät Commonsista, P625 Wikidatasta) + validointi
 *   node tools/oppaan-kuvat.mjs tarkista <kaupunki-id|--kaikki>   validointi (lisenssi, mitat, P625, selite) livenä
 *   node tools/oppaan-kuvat.mjs kokoa                    kaikki kaupungit -> data/oppaan-kuvat/oppaan-kuvat.json
 *
 * EHDOT: lisenssi PD / CC0 / CC BY / CC BY-SA (ei NC, ei ND), leveys >= 1 200 px, ei SVG, ei karttoja, logoja, lippuja,
 * vaakunoita, pohjapiirroksia eikä vesileimoja; vaakakuva ensin. Wikimedian käyttäjäagentti ja 429-odotus on mukana.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const JUURI = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(JUURI, 'data/oppaan-kuvat');
const KAUPUNGIT = join(DATA, 'kaupungit');
const UA = { 'User-Agent': 'MatkakirjaOpas/1.0 (https://github.com/ravelius/Matkakirja)' };
const WD = 'https://www.wikidata.org/w/api.php';
const CM = 'https://commons.wikimedia.org/w/api.php';

export const MIN_LEVEYS = 1200;
export const SALLITTU = /^(cc0|cc[- ]by(?![- ]?(nc|nd))([- ]sa)?[- ]?[\d.]*|pd([- ]|$)|public domain|pdm|attribution|no restrictions)/i;
export const KIELLETTY_NIMI = /(\bmap\b|\bkarta\b|\bkarte\b|\bplan\b|floor ?plan|\blogo\b|\bflag\b|coat of arms|wappen|blason|diagram|\bscheme\b|\bchart\b|locator|\.svg$|\.pdf$|\.tif?f?$|\.webm$|\.ogv$|stitch|panorama\s?\d|scan of|watermark|poster|brochure)/i;

const odota = (ms) => new Promise((r) => { setTimeout(r, ms); });

export async function hae(url, yrityksia = 5) {
  for (let i = 0; ; i += 1) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const v = await fetch(url, { headers: UA, signal: AbortSignal.timeout(60000) });
      if (v.status === 429 || v.status >= 500) throw new Error(`HTTP ${v.status}`);
      if (!v.ok) throw new Error(`HTTP ${v.status} ${url}`);
      return v;
    } catch (e) {
      if (i >= yrityksia) throw e;
      // eslint-disable-next-line no-await-in-loop
      await odota(1500 * (i + 1));
    }
  }
}
const json = async (url) => (await hae(url)).json();
const poista = (s) => String(s ?? '').replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();

// --- Wikidata -----------------------------------------------------------------------------------------------------

export async function entiteetit(idt) {
  const tulos = {};
  for (let i = 0; i < idt.length; i += 40) {
    const osa = idt.slice(i, i + 40);
    // eslint-disable-next-line no-await-in-loop
    const d = await json(`${WD}?action=wbgetentities&ids=${osa.join('|')}&props=labels|descriptions|claims|sitelinks&languages=fi|en&format=json`);
    for (const [id, e] of Object.entries(d.entities ?? {})) {
      const c = e.claims ?? {};
      const p = c.P625?.[0]?.mainsnak?.datavalue?.value;
      tulos[id] = {
        id,
        puuttuu: e.missing !== undefined,
        fi: e.labels?.fi?.value ?? null,
        en: e.labels?.en?.value ?? null,
        kuvaus: e.descriptions?.fi?.value ?? e.descriptions?.en?.value ?? null,
        lat: p ? p.latitude : null,
        lon: p ? p.longitude : null,
        p18: (c.P18 ?? []).map((x) => x.mainsnak?.datavalue?.value).filter(Boolean),
        p373: c.P373?.[0]?.mainsnak?.datavalue?.value ?? null,
        kielia: Object.keys(e.sitelinks ?? {}).filter((k) => /wiki$/.test(k) && !/^(commons|wikidata|species|meta|mediawiki)/.test(k)).length,
        unesco: (c.P757 ?? []).length > 0,
      };
    }
  }
  return tulos;
}

async function wdHaku(sana, kieli = 'fi') {
  const d = await json(`${WD}?action=wbsearchentities&search=${encodeURIComponent(sana)}&language=${kieli}&uselang=${kieli}&format=json&limit=7`);
  const idt = (d.search ?? []).map((x) => x.id);
  const e = idt.length ? await entiteetit(idt) : {};
  return idt.map((id) => ({ id, fi: e[id].fi, en: e[id].en, kuvaus: e[id].kuvaus, lat: e[id].lat, lon: e[id].lon, kuvia: e[id].p18.length, kielia: e[id].kielia, unesco: e[id].unesco }));
}

// --- Commons ------------------------------------------------------------------------------------------------------

/** Commons-tiedostojen metatiedot (lisenssi, tekijä, mitat) otsikoilla "File:X.jpg". */
export async function tiedot(otsikot) {
  const tulos = {};
  for (let i = 0; i < otsikot.length; i += 40) {
    const osa = otsikot.slice(i, i + 40);
    // eslint-disable-next-line no-await-in-loop
    const d = await json(`${CM}?action=query&format=json&titles=${encodeURIComponent(osa.join('|'))}&prop=imageinfo`
      + '&iiprop=extmetadata|url|size|mime&iiextmetadatafilter=LicenseShortName|LicenseUrl|Artist|ImageDescription|Credit|AttributionRequired|Restrictions');
    const nimet = new Map((d.query?.normalized ?? []).map((n) => [n.to, n.from]));
    for (const s of Object.values(d.query?.pages ?? {})) {
      const ii = s.imageinfo?.[0];
      const avain = nimet.get(s.title) ?? s.title;
      if (!ii) { tulos[avain] = null; continue; }
      const m = ii.extmetadata ?? {};
      tulos[avain] = tulos[s.title] = {
        tiedosto: s.title.replace(/^File:/, ''),
        leveys: ii.width, korkeus: ii.height, mime: ii.mime,
        lisenssi: poista(m.LicenseShortName?.value),
        lisenssiUrl: poista(m.LicenseUrl?.value) || null,
        tekija: poista(m.Artist?.value),
        kuvaus: poista(m.ImageDescription?.value).slice(0, 200),
        rajoitukset: poista(m.Restrictions?.value),
      };
    }
  }
  return tulos;
}

export const tiedostoUrl = (t, leveys = 1280) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(t.replace(/ /g, '_'))}?width=${leveys}`;
export const sivuUrl = (t) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(t.replace(/ /g, '_'))}`;
export const lisenssiUrlOletus = (l) => {
  const m = String(l).match(/^CC[ -]BY(?:[ -]SA)?[ -]([\d.]+)/i);
  if (m) return `https://creativecommons.org/licenses/${/sa/i.test(l) ? 'by-sa' : 'by'}/${m[1]}/`;
  if (/^CC0/i.test(l)) return 'https://creativecommons.org/publicdomain/zero/1.0/';
  if (/^(pd|public domain)/i.test(l)) return 'https://creativecommons.org/publicdomain/mark/1.0/';
  return null;
};

async function kategorianTiedostot(kategoria, raja) {
  const d = await json(`${CM}?action=query&format=json&list=categorymembers&cmtitle=${encodeURIComponent(`Category:${kategoria}`)}&cmtype=file&cmlimit=${raja}`);
  return (d.query?.categorymembers ?? []).map((x) => x.title);
}

/** Ehdokkaat kohteelle Q: P18 ensin, sitten P373-kategoria; suodatettu ehdoilla; leveys, lisenssi, tekijä mukana. */
export async function ehdokkaat(q, raja = 40) {
  const e = (await entiteetit([q]))[q];
  if (!e || e.puuttuu) throw new Error(`Tuntematon Q ${q}`);
  const otsikot = [...new Set([...e.p18.map((t) => `File:${t.replace(/_/g, ' ')}`),
    ...(e.p373 ? await kategorianTiedostot(e.p373, raja) : [])])];
  const t = await tiedot(otsikot);
  const lista = [];
  for (const o of otsikot) {
    const x = t[o];
    if (!x) continue;
    const syy = hylkaysSyy(x);
    lista.push({
      tiedosto: x.tiedosto, p18: e.p18.some((p) => p.replace(/_/g, ' ') === x.tiedosto),
      leveys: x.leveys, korkeus: x.korkeus, vaaka: x.leveys >= x.korkeus, lisenssi: x.lisenssi, tekija: x.tekija.slice(0, 80),
      kuvaus: x.kuvaus, hylatty: syy,
    });
  }
  lista.sort((a, b) => (a.hylatty ? 1 : 0) - (b.hylatty ? 1 : 0) || (b.p18 ? 1 : 0) - (a.p18 ? 1 : 0) || (b.vaaka ? 1 : 0) - (a.vaaka ? 1 : 0));
  return { kohde: { q, fi: e.fi, en: e.en, lat: e.lat, lon: e.lon, kategoria: e.p373 }, kuvat: lista };
}

function muotoile(otsikot, t, p18 = []) {
  return otsikot.map((o) => t[o]).filter(Boolean).map((x) => ({
    tiedosto: x.tiedosto, p18: p18.some((p) => p.replace(/_/g, ' ') === x.tiedosto),
    leveys: x.leveys, korkeus: x.korkeus, vaaka: x.leveys >= x.korkeus, lisenssi: x.lisenssi, tekija: x.tekija.slice(0, 80),
    kuvaus: x.kuvaus, hylatty: hylkaysSyy(x),
  }));
}

/** Commons-haku vapaalla tekstillä (esim. "Louvre Pyramide exterior") samoilla suodattimilla kuin ehdokkaat(). */
export async function commonsHaku(kysely, raja = 30) {
  const d = await json(`${CM}?action=query&format=json&list=search&srsearch=${encodeURIComponent(kysely)}&srnamespace=6&srlimit=${raja}`);
  const otsikot = (d.query?.search ?? []).map((x) => x.title);
  const lista = muotoile(otsikot, await tiedot(otsikot));
  lista.sort((a, b) => (a.hylatty ? 1 : 0) - (b.hylatty ? 1 : 0) || (b.vaaka ? 1 : 0) - (a.vaaka ? 1 : 0));
  return { haku: kysely, kuvat: lista };
}

/** Yksittäiset tiedostot nimillä (tarkistus ja taulu). */
export async function yksittaiset(nimet) {
  const otsikot = nimet.map((n) => `File:${n.replace(/^File:/, '')}`);
  return { kuvat: muotoile(otsikot, await tiedot(otsikot)) };
}

export function hylkaysSyy(x) {
  if (!/^image\/(jpeg|png|webp)$/.test(x.mime ?? 'image/jpeg')) return 'tiedostotyyppi';
  if (KIELLETTY_NIMI.test(x.tiedosto)) return 'nimi (kartta/logo/lippu/pohjapiirros)';
  if (!x.leveys || x.leveys < MIN_LEVEYS) return `leveys ${x.leveys} < ${MIN_LEVEYS}`;
  if (!SALLITTU.test(x.lisenssi ?? '')) return `lisenssi "${x.lisenssi}"`;
  if (!x.tekija && !/^(pd|cc0|public domain)/i.test(x.lisenssi)) return 'tekijä puuttuu';
  if (/watermark|vesileima/i.test(`${x.kuvaus} ${x.rajoitukset}`)) return 'vesileima';
  return null;
}

// --- pelin omat ainekset ------------------------------------------------------------------------------------------

async function seed(id) {
  const kk = (await import(join(JUURI, 'js/packs/kulttuuri-kategoriat.js'))).KULTTUURI_KATEGORIAT;
  const kartat = (await import(join(JUURI, 'js/packs/maakartat.js'))).KAUPUNKIKARTAT;
  const lista = JSON.parse(readFileSync(join(DATA, 'kaupungit-vaihe1.json'), 'utf8'));
  const kaupunki = lista.find((k) => k.id === id);
  if (!kaupunki) throw new Error(`Tuntematon kaupunki-id ${id}`);
  const tiedostot = new Map();
  const kerää = (o, polku) => {
    if (Array.isArray(o)) o.forEach((x) => kerää(x, polku));
    else if (o && typeof o === 'object') {
      if (typeof o.tiedosto === 'string') tiedostot.set(o.tiedosto, { tiedosto: o.tiedosto, mihin: polku, selite: (o.lyhyt ?? o.otsikko ?? o.selite ?? '').slice(0, 100) });
      for (const [k, v] of Object.entries(o)) if (v && typeof v === 'object') kerää(v, polku || k);
    }
  };
  kerää(kk[id] ?? [], '');
  const k = kartat[id];
  return {
    kaupunki,
    kartanKohteet: (k?.kohteet ?? []).map((x) => ({ nimi: x.nimi, lat: x.lat, lon: x.lon })),
    nostoOtsikot: (kk[id] ?? []).flatMap((c) => (c.nostot ?? []).map((n) => n.otsikko)).slice(0, 40),
    pelinKuvia: tiedostot.size,
    pelinKuvat: [...tiedostot.values()].slice(0, 120),
  };
}

// --- kuvataulu (Pillow) -------------------------------------------------------------------------------------------

function taulu(qt, ulos, raja) {
  const haeYksi = async (arg) => {
    if (arg.startsWith('haku:')) { const t = await commonsHaku(arg.slice(5), raja); return { kohde: { q: 'haku', fi: arg.slice(5) }, kuvat: t.kuvat }; }
    if (arg.startsWith('tiedosto:')) { const t = await yksittaiset([arg.slice(9)]); return { kohde: { q: 'tiedosto', fi: arg.slice(9) }, kuvat: t.kuvat }; }
    return ehdokkaat(arg, raja);
  };
  return Promise.all(qt.map(haeYksi)).then((tulokset) => {
    const kuvat = [];
    tulokset.forEach((t) => t.kuvat.filter((k) => !k.hylatty).slice(0, 12).forEach((k) => kuvat.push({ q: t.kohde.q, nimi: t.kohde.fi ?? t.kohde.en, ...k })));
    if (!kuvat.length) { console.log('Ei kelvollisia ehdokkaita.'); return; }
    mkdirSync(dirname(ulos), { recursive: true });
    const syote = join(dirname(ulos), `.${Date.now()}.json`);
    writeFileSync(syote, JSON.stringify(kuvat.map((k) => ({ q: k.q, nimi: k.nimi, tiedosto: k.tiedosto, mitat: `${k.leveys}x${k.korkeus}`, lisenssi: k.lisenssi }))));
    execFileSync('python3', [join(JUURI, 'tools/oppaan-kuvat-taulu.py'), syote, ulos], { stdio: 'inherit' });
    console.log(`Taulu: ${ulos} (${kuvat.length} ruutua; numerointi vasemmalta oikealle, ylhäältä alas)`);
    kuvat.forEach((k, i) => console.log(`${i + 1}\t${k.q}\t${k.nimi}\t${k.tiedosto}`));
  });
}

// --- tarkistus ----------------------------------------------------------------------------------------------------

const YKSI_VIRKE = /^[^.!?]+[.!?]$/;

export async function tarkistaKaupunki(id) {
  const poluk = join(KAUPUNGIT, `${id}.json`);
  const virheet = [];
  if (!existsSync(poluk)) return [`${id}: tiedostoa ei ole (${poluk})`];
  const d = JSON.parse(readFileSync(poluk, 'utf8'));
  const kohteet = d.kohteet ?? [];
  const eiKuvaa = d.eiKuvaa ?? [];
  if (d.kaupunki !== id) virheet.push(`${id}: kaupunki-kenttä ${d.kaupunki}`);
  if (!/^Q\d+$/.test(d.kaupunkiQ ?? '')) virheet.push(`${id}: kaupunkiQ puuttuu tai on virheellinen`);
  const yht = kohteet.length + eiKuvaa.length;
  if (yht < 6 || yht > 20) virheet.push(`${id}: kohteita ${kohteet.length} + eiKuvaa ${eiKuvaa.length} = ${yht}, pitää olla 6–20`);
  if (kohteet.length < 6) virheet.push(`${id}: kuvallisia kohteita ${kohteet.length} < 6 (etsi korvaavia kohteita)`);
  const qt = [...kohteet, ...eiKuvaa].map((k) => k.q);
  if (new Set(qt).size !== qt.length) virheet.push(`${id}: kaksoiskappale-Q`);
  const ent = await entiteetit([...new Set([...qt, d.kaupunkiQ].filter((x) => /^Q\d+$/.test(x ?? '')))]);
  const kaikkiTiedostot = [];
  for (const k of [...kohteet, ...eiKuvaa]) {
    const e = ent[k.q];
    if (!e || e.puuttuu) { virheet.push(`${id}/${k.q}: Q ei ole Wikidatassa`); continue; }
    if (e.lat == null) virheet.push(`${id}/${k.q}: Wikidatassa ei P625-koordinaattia`);
    else if (Math.abs(e.lat - k.lat) > 0.002 || Math.abs(e.lon - k.lon) > 0.002) virheet.push(`${id}/${k.q}: koordinaatit eivät täsmää P625:een (${e.lat},${e.lon})`);
    if (!k.nimi) virheet.push(`${id}/${k.q}: suomenkielinen nimi puuttuu`);
    if (!/^(pelin nosto|UNESCO|sitelinks)/.test(k.peruste ?? '')) virheet.push(`${id}/${k.q}: peruste puuttuu (pelin nosto | UNESCO | sitelinks ...)`);
    else if (/^UNESCO/.test(k.peruste) && !e.unesco) virheet.push(`${id}/${k.q}: peruste UNESCO mutta Wikidatassa ei P757-tunnusta`);
    else if (/^sitelinks/.test(k.peruste) && e.kielia < 15) virheet.push(`${id}/${k.q}: peruste sitelinks mutta kieliversioita vain ${e.kielia} (< 15)`);
  }
  for (const k of eiKuvaa) if (!k.syy) virheet.push(`${id}/${k.q}: eiKuvaa ilman syytä`);
  for (const k of [...kohteet, ...eiKuvaa]) {
    if (k.koko_m !== undefined && !(typeof k.koko_m === 'number' && k.koko_m >= 5 && k.koko_m <= 50000)) virheet.push(`${id}/${k.q}: koko_m ei ole 5–50 000`);
    if (k.aliakset !== undefined && !(Array.isArray(k.aliakset) && k.aliakset.every((x) => /^Q\d+$/.test(x)))) virheet.push(`${id}/${k.q}: aliakset ei ole Q-lista`);
  }
  const kk = d.kaupunginKuvat ?? [];
  if (kk.length < 1 || kk.length > 2) virheet.push(`${id}: kaupunginKuvat ${kk.length}, pitää olla 1–2`);
  kk.forEach((x, i) => {
    if (x.jarjestys !== i + 1) virheet.push(`${id}/kaupunki: järjestys ${x.jarjestys} paikalla ${i + 1}`);
    if (x.tarkistettu !== true) virheet.push(`${id}/kaupunki/${x.tiedosto}: tarkistettu ei ole true`);
    if (!YKSI_VIRKE.test(String(x.selite ?? '').trim())) virheet.push(`${id}/kaupunki/${x.tiedosto}: selite ei ole yksi virke`);
    kaikkiTiedostot.push({ q: 'kaupunki', x });
  });
  for (const k of kohteet) {
    const kuvat = k.kuvat ?? [];
    if (kuvat.length < 1 || kuvat.length > 5) virheet.push(`${id}/${k.q}: kuvia ${kuvat.length}, pitää olla 1–5`);
    kuvat.forEach((x, i) => {
      if (x.jarjestys !== i + 1) virheet.push(`${id}/${k.q}: järjestys ${x.jarjestys} paikalla ${i + 1}`);
      if (x.tarkistettu !== true) virheet.push(`${id}/${k.q}/${x.tiedosto}: tarkistettu ei ole true`);
      if (!YKSI_VIRKE.test(String(x.selite ?? '').trim())) virheet.push(`${id}/${k.q}/${x.tiedosto}: selite ei ole yksi virke`);
      kaikkiTiedostot.push({ q: k.q, x });
    });
  }
  const nimet = kaikkiTiedostot.map((t) => t.x.tiedosto);
  if (new Set(nimet).size !== nimet.length) virheet.push(`${id}: sama tiedosto useammassa kohteessa tai kahdesti`);
  const t = await tiedot(nimet.map((n) => `File:${n}`));
  for (const { q, x } of kaikkiTiedostot) {
    const c = t[`File:${x.tiedosto}`];
    const p = `${id}/${q}/${x.tiedosto}`;
    if (!c) { virheet.push(`${p}: tiedostoa ei ole Commonsissa`); continue; }
    const syy = hylkaysSyy(c);
    if (syy) virheet.push(`${p}: ${syy}`);
    if (x.leveys !== c.leveys || x.korkeus !== c.korkeus) virheet.push(`${p}: mitat ${x.leveys}x${x.korkeus} != ${c.leveys}x${c.korkeus}`);
    if (x.lisenssi !== c.lisenssi) virheet.push(`${p}: lisenssi "${x.lisenssi}" != "${c.lisenssi}"`);
    if (!x.tekija) virheet.push(`${p}: tekijä puuttuu`);
    if (!x.lisenssiUrl) virheet.push(`${p}: lisenssiUrl puuttuu`);
    if (x.lahdeUrl !== sivuUrl(x.tiedosto)) virheet.push(`${p}: lahdeUrl ei ole Commons-sivu`);
    if (x.url !== tiedostoUrl(x.tiedosto)) virheet.push(`${p}: url ei ole Special:FilePath?width=1280`);
  }
  return virheet;
}

/** Kuvakentät työkalun omista tiedoista: spec = [{tiedosto, selite}] -> täysi kuvaluettelo (järjestys = listan järjestys). */
export async function rakennaKuvat(spec) {
  const t = await tiedot(spec.map((x) => `File:${x.tiedosto.replace(/^File:/, '')}`));
  return spec.map((x, i) => {
    const nimi = x.tiedosto.replace(/^File:/, '').replace(/_/g, ' ');
    const c = t[`File:${nimi}`];
    if (!c) throw new Error(`Tiedostoa ei ole Commonsissa: ${nimi}`);
    const syy = hylkaysSyy(c);
    if (syy) throw new Error(`${nimi}: ${syy}`);
    return { jarjestys: i + 1, tiedosto: c.tiedosto, url: tiedostoUrl(c.tiedosto), tekija: c.tekija, lisenssi: c.lisenssi,
      lisenssiUrl: c.lisenssiUrl || lisenssiUrlOletus(c.lisenssi), lahdeUrl: sivuUrl(c.tiedosto), selite: x.selite.trim(),
      leveys: c.leveys, korkeus: c.korkeus, tarkistettu: x.tarkistettu !== false };
  });
}

/**
 * rakenna <spec.json>: spec = { kaupunki, kaupunkiQ, jarjestys?, kohteet:[{q, nimi, peruste, koko_m?, aliakset?, kuvat:[{tiedosto, selite}]}],
 * kaupunginKuvat:[{tiedosto, selite}], eiKuvaa:[{q, nimi, peruste, syy}] }. Koordinaatit Wikidatan P625:stä, kuvakentät Commonsista;
 * kirjoittaa data/oppaan-kuvat/kaupungit/<id>.json ja ajaa validoinnin. `tarkistettu` = true: vain silmätarkistuksen jälkeen.
 */
async function rakenna(tiedosto) {
  const sp = JSON.parse(readFileSync(tiedosto, 'utf8'));
  const qt = [...sp.kohteet, ...(sp.eiKuvaa ?? [])].map((k) => k.q);
  const ent = await entiteetit(qt);
  const sij = (k) => { const e = ent[k.q]; if (!e || e.lat == null) throw new Error(`${k.q} ${k.nimi}: ei P625-koordinaattia`); return { lat: +e.lat.toFixed(5), lon: +e.lon.toFixed(5) }; };
  const ulos = { kaupunki: sp.kaupunki, kaupunkiQ: sp.kaupunkiQ, ...(sp.jarjestys ? { jarjestys: sp.jarjestys } : {}), kohteet: [], kaupunginKuvat: await rakennaKuvat(sp.kaupunginKuvat), eiKuvaa: [] };
  for (const k of sp.kohteet) {
    ulos.kohteet.push({ q: k.q, nimi: k.nimi, peruste: k.peruste, ...(k.koko_m ? { koko_m: k.koko_m } : {}), ...(k.aliakset?.length ? { aliakset: k.aliakset } : {}), ...sij(k), kuvat: await rakennaKuvat(k.kuvat) });
  }
  for (const k of sp.eiKuvaa ?? []) ulos.eiKuvaa.push({ q: k.q, nimi: k.nimi, peruste: k.peruste, ...sij(k), syy: k.syy });
  mkdirSync(KAUPUNGIT, { recursive: true });
  writeFileSync(join(KAUPUNGIT, `${sp.kaupunki}.json`), `${JSON.stringify(ulos, null, 1)}\n`);
  const v = await tarkistaKaupunki(sp.kaupunki);
  console.log(v.length ? `EI KELPAA ${sp.kaupunki}:\n  ${v.join('\n  ')}` : `ok ${sp.kaupunki}`);
  process.exitCode = v.length ? 1 : 0;
}

function kokoa() {
  const kohteet = {};
  const kaupungit = {};
  const pohja = JSON.parse(readFileSync(join(DATA, 'kaupungit-vaihe1.json'), 'utf8'));
  let kuvia = 0;
  const eiKuvaa = [];
  for (const f of readdirSync(KAUPUNGIT).filter((x) => x.endsWith('.json')).sort()) {
    const d = JSON.parse(readFileSync(join(KAUPUNGIT, f), 'utf8'));
    const kuva = (x) => ({ jarjestys: x.jarjestys, tiedosto: x.tiedosto, url: x.url, tekija: x.tekija, lisenssi: x.lisenssi, lisenssiUrl: x.lisenssiUrl,
      lahdeUrl: x.lahdeUrl, selite: x.selite, leveys: x.leveys, korkeus: x.korkeus, tarkistettu: x.tarkistettu });
    const p = pohja.find((x) => x.id === d.kaupunki);
    // kohteet: tärkeysjärjestyksessä (kuvalliset ja kuvattomat samassa järjestyksessä kuin tiedostossa: järjestys-kenttä tai kohteet + eiKuvaa)
    const jarj = d.jarjestys ?? [...(d.kohteet ?? []), ...(d.eiKuvaa ?? [])].map((k) => k.q);
    kaupungit[d.kaupunki] = { nimi: p?.nimi ?? d.kaupunki, Q: d.kaupunkiQ, lat: p?.lat ?? null, lon: p?.lon ?? null, kohteet: jarj, kuvat: (d.kaupunginKuvat ?? []).map(kuva) };
    for (const k of d.kohteet ?? []) {
      kohteet[k.q] = { nimi: k.nimi, peruste: k.peruste, kaupunki: d.kaupunki, kaupunkiQ: d.kaupunkiQ, lat: k.lat, lon: k.lon,
        ...(k.aliakset?.length ? { aliakset: k.aliakset } : {}), ...(k.koko_m ? { koko_m: k.koko_m } : {}), kuvat: k.kuvat.map(kuva) };
      kuvia += k.kuvat.length;
    }
    // Kuvattomat kohteet mukaan kohteet-osioon (kuvat: []), jotta koordinaatit ja järjestys säilyvät oppaan listassa ja kierroksella.
    for (const k of d.eiKuvaa ?? []) {
      kohteet[k.q] = { nimi: k.nimi, peruste: k.peruste, kaupunki: d.kaupunki, kaupunkiQ: d.kaupunkiQ, lat: k.lat, lon: k.lon, kuvat: [] };
    }
    for (const k of d.eiKuvaa ?? []) eiKuvaa.push({ q: k.q, nimi: k.nimi, kaupunki: d.kaupunki, syy: k.syy });
  }
  const ulos = join(DATA, 'oppaan-kuvat.json');
  writeFileSync(ulos, `${JSON.stringify({ skeema: 1, versio: new Date().toISOString().slice(0, 10), kaupungit, kohteet }, null, 1)}\n`);
  writeFileSync(join(DATA, 'ei-kuvaa.json'), `${JSON.stringify(eiKuvaa, null, 1)}\n`);
  console.log(`Kirjoitettu ${ulos}: ${Object.keys(kohteet).length} kohdetta, ${kuvia} kuvaa; ei kuvaa ${eiKuvaa.length}`);
}

// --- komentorivi --------------------------------------------------------------------------------------------------

async function main() {
  const [komento, ...a] = process.argv.slice(2);
  const lippu = (n, o) => { const i = a.indexOf(n); return i >= 0 ? a.splice(i, 2)[1] : o; };
  if (komento === 'seed') console.log(JSON.stringify(await seed(a[0]), null, 1));
  else if (komento === 'q') console.log(JSON.stringify(await wdHaku(a[0], a[1] ?? 'fi'), null, 1));
  else if (komento === 'haku') {
    const raja = Number(lippu('--raja', 30));
    console.log(JSON.stringify(await commonsHaku(a[0], raja), null, 1));
  } else if (komento === 'tiedosto') console.log(JSON.stringify(await yksittaiset(a), null, 1));
  else if (komento === 'kuvat') {
    const raja = Number(lippu('--raja', 40));
    console.log(JSON.stringify(await ehdokkaat(a[0], raja), null, 1));
  } else if (komento === 'taulu') {
    const ulos = lippu('--ulos', 'taulu.jpg');
    const raja = Number(lippu('--raja', 40));
    await taulu(a, ulos, raja);
  } else if (komento === 'tarkista') {
    mkdirSync(KAUPUNGIT, { recursive: true });
    const idt = a[0] === '--kaikki' ? readdirSync(KAUPUNGIT).filter((x) => x.endsWith('.json')).map((x) => x.replace(/\.json$/, '')) : a;
    let vikoja = 0;
    for (const id of idt) {
      // eslint-disable-next-line no-await-in-loop
      const v = await tarkistaKaupunki(id);
      vikoja += v.length;
      console.log(v.length ? `EI KELPAA ${id}:\n  ${v.join('\n  ')}` : `ok ${id}`);
    }
    process.exitCode = vikoja ? 1 : 0;
  } else if (komento === 'rakenna') await rakenna(a[0]);
  else if (komento === 'kokoa') kokoa();
  else console.log('käyttö: seed | q | kuvat | taulu | tarkista | kokoa (ks. tiedoston alku)');
}

if (process.argv[1] && process.argv[1].endsWith('oppaan-kuvat.mjs')) await main();
