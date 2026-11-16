#!/usr/bin/env node
/*
 * ÄÄNITYSJONON TARKISTUS (Natiiviseppä 12.11.2026, KK 08.42 kohta 2).
 *
 *   node tools/aanitysjono/tarkista.mjs [--vienti <dist/vienti>] [--manifesti <url|polku>]
 *        [--lisaa] [--siivoa] [--kaikki-maanosat] [--tsv <ulos.tsv>] [--jono <data/aanitysjono.tsv>]
 *        [--aanitettavat <ulos.json>]   Äänittäjälle: jonon rivit + koko teksti, loppuTagi, ääni ja malli (sama avain kuin pelillä)
 *
 * Pysäyttää junan, kun luettava teksti on muuttunut (tai uusi) eikä sen kappaleen avainta ole
 * valmiiden luentojen manifestissa EIKÄ äänitysjonossa (data/aanitysjono.tsv).
 *
 * Jono = Äänittäjän työlista: yksi rivi per äänittämätön kappale (avain, kaupunki, paketti, kohde,
 * pala, päivä). Tekstin muuttaja lisää rivit SAMASSA commitissa: `--lisaa`. Vienti poistaa rivin,
 * kun avain on manifestissa: `--siivoa` (poistaa myös rivit, joiden tekstiä ei enää ole).
 *
 * Luettava sisältö (sama kuin pelin luenta): kohdekarttojen nähtävyysjutut (nimi + kappaleet + lainaus),
 * skandaalit, historian hetket, eläintäyt, täkynostot, fokusvirtojen täkyt ja täkynostot sekä
 * hahmotelma-, maastokohde- ja fokuskohdepaketit. Kappalejako ja avain = natiivin Puhe.cs /
 * Nahtavyysarkki / Valmisluennat.cs (avaimen testivektorit tools/natiivi-kultaiset/tee-valmisluennat-avaimet.mjs).
 * Oletuksena vain Eurooppa (ja maanosattomat: Arktis, Antarktis), koska vain Eurooppa äänitetään.
 *
 * Paluu: 0 = OK, 1 = HYLÄTTY (kappaleita ilman äänitettä ja jonoriviä), 2 = VIKA (vienti tai manifesti ei latautunut).
 * Kutsujat: natiivirepon tyokalut/ennen-junaa.sh vaihe 5 ja PR-CI (.github/workflows/testit.yml, askel Äänitysjono; paluu 2 = varoitus).
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const JONO = join(JUURI, 'data/aanitysjono.tsv');
// Manifesti = sama kuin pelillä: viennin asetus osoitteet.luennat-manifesti (data/asetukset.json, KK 12.11. 09.03: yksi lähde
// versiolle). Oletus vain, jos asetus puuttuu (= natiivin Valmisluennat.ManifestiOletus); tulosteessa näkyy, kumpi käytössä.
export const MANIFESTI = 'https://media.matkakirja.app/aanet/luennat/v11/manifest.json';
export function manifestiAsetuksista(vienti) {
  const p = join(vienti, 'kokoelmat/asetukset.json');
  if (!existsSync(p)) return null;
  const a = JSON.parse(readFileSync(p, 'utf8'));
  return a?.osoitteet?.['luennat-manifesti'] || a?.['osoitteet.luennat-manifesti'] || null;
}
export const NOPEUS = 1.15;
const SARAKKEET = ['avain', 'kaupunki', 'paketti', 'kohde', 'pala', 'paiva'];

// --- avain ja kappalejako (natiivin peili) -------------------------------------------------------------------------------
export function avain(teksti, malli, aani, nopeus, loppuTagi) {
  const s = `v1|${malli}|${aani}|${Number(nopeus).toFixed(2)}|${loppuTagi ?? ''}|${(teksti ?? '').normalize('NFC')}`;
  return createHash('sha256').update(s, 'utf8').digest('hex').slice(0, 32);
}
const norm = (t) => t.replace(/[”“„]/g, '"').replace(/[’‘]/g, "'");
const lopetus = (c) => '.!?:;…'.includes(c);
const onOtsikko = (t) => t.length <= 120 && !lopetus(t.at(-1));
const paate = (t) => (lopetus(t.at(-1)) ? t : t + '.');
const tyhja = (x) => x == null || !String(x).trim();

function kappaleenPalat(rivi, katto = 2400) {
  const out = []; let k = '';
  for (let v of rivi.trim().split(/(?<=[.!?…])\s+/)) {
    v = v.trim(); if (!v) continue;
    if (k && k.length + v.length + 1 > katto) { out.push(k); k = ''; }
    k = k ? k + ' ' + v : v;
  }
  if (k) out.push(k);
  return out;
}
/** Luettavat rivit → [palat, loppuTagit] (Puhe.cs). */
export function luenta(tekstit) {
  const raaka = tekstit.filter((t) => !tyhja(t)).map((t) => t.trim());
  if (raaka.reduce((s, t) => s + t.length, 0) < 80) return [[], []];
  const palat = [], ots = [], loppu = []; let od = null;
  for (const t of raaka) {
    if (onOtsikko(t)) { od = od == null ? paate(t) : od + ' ' + paate(t); continue; }
    const kohta = od == null ? t : od + ' ' + t; const al = od != null; od = null;
    const osat = kappaleenPalat(kohta);
    osat.forEach((o, i) => { palat.push(o); ots.push(al && i === 0); loppu.push(i === osat.length - 1); });
  }
  const tagit = palat.map((_, i) => (i === palat.length - 1 || !loppu[i] ? null : ots[i + 1] ? '[long-pause]' : '[pause]'));
  return [palat, tagit];
}
export function katkaise(t, katto = 2500) {
  if (t.length <= katto) return t;
  const r = Math.max(...['. ', '! ', '? '].map((m) => t.lastIndexOf(m, katto - 1)));
  return r > Math.floor(katto / 3) ? t.slice(0, r + 1) : t.slice(0, katto);
}
const kappaleetN = (t) => (tyhja(t) ? [] : t.trim().split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean));
function jutunLuettavat(nimi, teksti, lainaus) {
  const l = nimi ? [nimi] : []; const k = kappaleetN(teksti);
  const la = lainaus ? Math.floor((k.length + 1) / 2) : -1;
  k.forEach((x, i) => { l.push(x); if (i + 1 === la) l.push(lainaus); });
  return l;
}
function virkkeiksi(t) {
  t = t || ''; const out = []; let alku = 0;
  for (let i = 0; i < t.length; i++) {
    const m = t[i];
    if (!'.!?'.includes(m)) continue;
    if (m === '.' && i > 0 && /[0-9]/.test(t[i - 1])) continue;
    let j = i + 1;
    while (j < t.length && /\s/.test(t[j])) j++;
    if (j === i + 1 || j >= t.length) break;
    const c = t[j];
    if (/[0-9A-Z]/.test(c) || 'ÅÄÖÜÉ"“«'.includes(c)) { out.push(t.slice(alku, i + 1).trim()); alku = i + 1; }
  }
  if (alku < t.length) out.push(t.slice(alku).trim());
  return out.filter(Boolean);
}
function jaa(t) {
  const k = (t || '').trim();
  if (k.includes('\n\n')) return k.split(/\n{2,}/).map((x) => x.trim()).filter(Boolean);
  const v = virkkeiksi(k);
  if (v.length < 3) return k ? [k] : [];
  const p = Math.floor((v.length + 1) / 2);
  return [v.slice(0, p).join(' '), v.slice(p).join(' ')].filter(Boolean);
}
const ilmanB = (x) => x.replace(/<\/?b>/g, '').trim();
const nostoLuettavat = (otsikko, ingressi, teksti) => [otsikko, ingressi, ...jaa(teksti)].filter((x) => !tyhja(x)).map(ilmanB);
function takyTeksti(d) {
  if (d.teksti != null) return d.teksti;
  const l = d.lunastus; if (l == null) return null;
  return Array.isArray(l) ? l.map((k) => String(k).trim()).filter(Boolean).join('\n\n') : String(l);
}

// --- sisältö viennistä ---------------------------------------------------------------------------------------------------
/** Kaikki luettavat kappaleet: [{kaupunki, maa, manner, paketti, kohde, pala, tagi, teksti}] */
export function kappaleet(vienti) {
  const J = (p) => JSON.parse(readFileSync(join(vienti, p), 'utf8'));
  const kaup = new Map(J('kokoelmat/kaupungit.json').alkiot.map((x) => [x.id, x]));
  const maanosa = (k, maa) => {
    if (kaup.has(k)) return kaup.get(k).manner;
    for (const c of kaup.values()) if (c.maa === maa) return c.manner;
    return '?';
  };
  const lukuja = []; // [kaupunki, maa, paketti, kohde, luettavat]
  const nah = new Map(J('kokoelmat/nahtavyydet.json').alkiot.map((a) => [`${a.kaupunki}\u0000${a.nimi}`, a]));
  for (const kk of J('kokoelmat/kohdekartat.json').alkiot) {
    const c = kk.kaupunki || kk.id;
    for (const o of kk.kohteet || []) {
      let d = o, teksti = o.teksti;
      if (!teksti) {
        const a = nah.get(`${c}\u0000${o.nimi}`); if (!a) continue;
        d = { ...a }; const raw = a.data || {};
        for (const f of ['teksti', 'lainaus']) if (d[f] == null && raw[f] != null) d[f] = raw[f];
        teksti = d.teksti;
      }
      if (!teksti) continue;
      const la = d.lainaus; const lt = la && typeof la === 'object' && !Array.isArray(la) ? la.teksti : null;
      lukuja.push([c, kaup.get(c)?.maa, 'nahtavyysjutut', o.nimi, jutunLuettavat(o.nimi, teksti, lt)]);
    }
  }
  const dataTai = (x) => (x.data && typeof x.data === 'object' && !Array.isArray(x.data) ? x.data : x);
  for (const pak of ['skandaalit', 'historianHetket', 'elaintayt'])
    for (const x of J(`kokoelmat/${pak}.json`).alkiot) {
      const d = dataTai(x);
      lukuja.push([null, x.maa, pak, x.id, nostoLuettavat(d.otsikko, pak === 'skandaalit' ? d.kortti : null, d.teksti)]);
    }
  for (const x of J('kokoelmat/takynostot.json').alkiot)
    lukuja.push([(x.kaupungit || [])[0] ?? null, x.maa, 'takynostot', x.id,
      nostoLuettavat(x.otsikko, x.taitto === 'lehti' ? x.ingressi : null, takyTeksti(x))]);
  for (const fv of J('kokoelmat/fokusvirrat.json').alkiot) {
    const d = dataTai(fv);
    for (const pool of ['takyt', 'takynostot'])
      for (const t of d[pool] || []) {
        if (!t || typeof t !== 'object' || !t.id) continue;
        lukuja.push([fv.id, kaup.get(fv.id)?.maa, 'fokusvirta-' + pool, t.id,
          nostoLuettavat(t.otsikko, t.taitto === 'lehti' ? t.ingressi : null, takyTeksti(t))]);
      }
  }
  const packs = join(vienti, 'moduulit/js/packs');
  for (const f of readdirSync(packs).filter((f) => /^(hahmotelma|maastokohteet|fokuskohteet)-[a-z]+\.json$/.test(f)).sort()) {
    const pak = f.split('-')[0];
    for (const [ex, lst] of Object.entries(J(`moduulit/js/packs/${f}`).exportit)) {
      if (!Array.isArray(lst)) continue;
      const iso = ex.split('_').at(-1);
      for (const x of lst) if (x && typeof x === 'object' && x.teksti) lukuja.push([null, iso, pak, x.id, nostoLuettavat(x.nimi, null, x.teksti)]);
    }
  }
  const out = [];
  for (const [c, maa, pak, kohde, luet] of lukuja) {
    const [p, t] = luenta(luet);
    p.forEach((pala, i) => out.push({ kaupunki: c || maa || '', maa: maa || '', manner: maanosa(c, maa), paketti: pak, kohde, pala: i + 1, tagi: t[i], teksti: katkaise(pala.trim()) }));
  }
  return out;
}

// --- jono ----------------------------------------------------------------------------------------------------------------
export function lueJono(polku = JONO) {
  if (!existsSync(polku)) return [];
  return readFileSync(polku, 'utf8').split('\n').slice(1).filter((r) => r.trim())
    .map((r) => Object.fromEntries(r.split('\t').map((v, i) => [SARAKKEET[i], v])));
}
function kirjoitaJono(rivit, polku = JONO) {
  writeFileSync(polku, [SARAKKEET.join('\t'), ...rivit.map((r) => SARAKKEET.map((s) => String(r[s] ?? '').replace(/[\t\n]/g, ' ')).join('\t'))].join('\n') + '\n');
}
const paiva = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

async function lueManifesti(lahde) {
  const teksti = /^https?:/.test(lahde) ? await (await fetch(lahde).then((r) => { if (!r.ok) throw new Error(`${lahde}: HTTP ${r.status}`); return r; })).text() : readFileSync(lahde, 'utf8');
  const m = JSON.parse(teksti); const aanet = Object.entries(m.aanet || {});
  if (aanet.length !== 1 || !m.palat) throw new Error(`manifesti: odotettiin yksi ääni ja palat (${lahde})`);
  return { aani: aanet[0][0], malli: aanet[0][1], palat: m.palat };
}

// --- ajo -----------------------------------------------------------------------------------------------------------------
async function main(argv) {
  const a = { vienti: null, manifesti: null, lisaa: false, siivoa: false, kaikki: false, tsv: null, jono: JONO, aanitettavat: null };
  for (let i = 0; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--vienti') a.vienti = argv[++i]; else if (v === '--manifesti') a.manifesti = argv[++i];
    else if (v === '--tsv') a.tsv = argv[++i]; else if (v === '--lisaa') a.lisaa = true; else if (v === '--siivoa') a.siivoa = true;
    else if (v === '--kaikki-maanosat') a.kaikki = true; else if (v === '--jono') a.jono = resolve(argv[++i]);
    else if (v === '--aanitettavat') a.aanitettavat = argv[++i];
    else { console.error(`tuntematon valinta ${v} (ks. tiedoston alku)`); return 2; }
  }
  let tmp = null, man, kaikki, lahde;
  try {
    if (!a.vienti) {
      tmp = mkdtempSync(join(tmpdir(), 'aanitysjono-'));
      execFileSync(process.execPath, [join(JUURI, 'tools/vienti/vie-sisalto.mjs'), '--ulos', tmp], { cwd: JUURI, stdio: 'ignore' });
    }
    const asetus = manifestiAsetuksista(a.vienti || tmp);
    lahde = a.manifesti ? `${a.manifesti} (--manifesti)` : asetus ? `${asetus} (asetus)` : `${MANIFESTI} (oletus: asetus osoitteet.luennat-manifesti puuttuu)`;
    man = await lueManifesti(a.manifesti || asetus || MANIFESTI);
    kaikki = kappaleet(a.vienti || tmp);
  } catch (e) { console.log(`ÄÄNITYSJONO: VIKA (${String(e.message || e).slice(0, 200)})`); return 2; }
  finally { if (tmp) rmSync(tmp, { recursive: true, force: true }); }

  // Haku kuten natiivin Valmisluennat.Url: ensin suorilla lainausmerkeillä, sitten sellaisenaan. Uusi avain (jono, äänitys)
  // ALKUPERÄISESTÄ tekstistä kuten Äänittäjän vienti (KK 09.05); peli löytää sen raakatekstin haulla.
  const uusiAvain = (r) => avain(r.teksti, man.malli, man.aani, NOPEUS, r.tagi);
  const osuu = (r) => [norm(r.teksti), r.teksti].some((t) => avain(t, man.malli, man.aani, NOPEUS, r.tagi) in man.palat);
  const alue = kaikki.filter((r) => a.kaikki || r.manner === 'europe' || r.manner === '?');
  const puuttuvat = new Map(); // avain → rivi (sama teksti voi olla kahdessa paketissa)
  for (const r of alue) if (!osuu(r)) { const k = uusiAvain(r); if (!puuttuvat.has(k)) puuttuvat.set(k, { ...r, avain: k }); }

  let jono = lueJono(a.jono);
  if (a.siivoa) {
    const ennen = jono.length;
    // Jonoon jää vain sisällössä oleva ja yhä äänittämätön (osuma myös normalisoimattomalla tekstillä = äänitetty).
    const kaikkiAvaimet = new Set(kaikki.map((r) => uusiAvain(r)));
    const yhaPuuttuu = new Set(kaikki.filter((r) => !osuu(r)).map((r) => uusiAvain(r)));
    const aanitetty = jono.filter((r) => kaikkiAvaimet.has(r.avain) && !yhaPuuttuu.has(r.avain)).length;
    jono = jono.filter((r) => yhaPuuttuu.has(r.avain));
    kirjoitaJono(jono, a.jono);
    console.log(`siivous: ${ennen} → ${jono.length} riviä (äänitetty ${aanitetty}, teksti ei enää sisällössä ${ennen - jono.length - aanitetty})`);
  }
  const jonossa = new Set(jono.map((r) => r.avain));
  const vailla = [...puuttuvat.values()].filter((r) => !jonossa.has(r.avain));
  if (a.lisaa && vailla.length) {
    const p = paiva();
    jono.push(...vailla.map((r) => ({ ...r, paiva: p })));
    kirjoitaJono(jono, a.jono);
    console.log(`lisätty jonoon ${vailla.length} riviä (${a.jono})`);
    vailla.length = 0;
  }
  if (a.aanitettavat) {
    const teksti = new Map(kaikki.map((r) => [uusiAvain(r), r]));
    const out = jono.filter((r) => teksti.has(r.avain)).map((r) => { const k = teksti.get(r.avain);
      return { avain: r.avain, kaupunki: r.kaupunki, paketti: r.paketti, kohde: r.kohde, pala: Number(r.pala), paiva: r.paiva, teksti: k.teksti, loppuTagi: k.tagi ?? '' }; });
    writeFileSync(a.aanitettavat, JSON.stringify({ manifesti: lahde, aani: man.aani, malli: man.malli, nopeus: NOPEUS, rivit: out }, null, 1) + '\n');
    console.log(`äänitettävät ${out.length} → ${a.aanitettavat}`);
  }
  if (a.tsv) writeFileSync(a.tsv, ['kaupunki\tpaketti\tkohde\tpala\tavain\tjonossa\ttekstin_alku',
    ...[...puuttuvat.values()].map((r) => [r.kaupunki, r.paketti, r.kohde, r.pala, r.avain, jonossa.has(r.avain) ? 'k' : 'e', r.teksti.slice(0, 80).replace(/\s+/g, ' ')].join('\t'))].join('\n') + '\n');

  const laske = (rivit) => { const m = new Map(); for (const r of rivit) m.set(r.kaupunki, (m.get(r.kaupunki) || 0) + 1); return [...m].sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])); };
  console.log(`manifesti ${lahde}`);
  console.log(`kappaleita ${alue.length}${a.kaikki ? '' : ' (Eurooppa)'}, valmiina ${alue.length - [...alue].filter((r) => !osuu(r)).length}, puuttuu ${puuttuvat.size} (jonossa ${puuttuvat.size - vailla.length})`);
  console.log(`puuttuvat kaupungeittain: ${laske([...puuttuvat.values()]).map(([k, n]) => `${k} ${n}`).join(', ') || '–'}`);
  if (vailla.length) {
    console.log(`ILMAN JONORIVIÄ kaupungeittain: ${laske(vailla).map(([k, n]) => `${k} ${n}`).join(', ')}`);
    for (const r of vailla.slice(0, 20)) console.log(`  ${r.kaupunki} ${r.paketti} ${r.kohde} pala ${r.pala}: ${r.teksti.slice(0, 60).replace(/\s+/g, ' ')}`);
    console.log(`ÄÄNITYSJONO: HYLÄTTY (${vailla.length} kappaletta ilman äänitettä ja jonoriviä; lisää samaan committiin: node tools/aanitysjono/tarkista.mjs --lisaa)`);
    return 1;
  }
  console.log(`ÄÄNITYSJONO: OK (puuttuvat ${puuttuvat.size} kaikki jonossa)`);
  return 0;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2));
