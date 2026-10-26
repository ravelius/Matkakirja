#!/usr/bin/env node
/*
 * Suomalaiset lainausmerkit näyttöteksteihin (omistaja/PT 18.10.2026):
 * suorat "…" ja '…' → ”…” ja ’…’ merkkijonoliteraaleissa, joiden avain on
 * näyttöteksti. Ei koodia, ei avaimia, ei lähde-/tekijä-/tiedostokenttiä.
 *
 *   node tools/suomalaiset-lainausmerkit.mjs            kuivaajo (raportti, ei muutoksia)
 *   node tools/suomalaiset-lainausmerkit.mjs --kirjoita muuttaa tiedostot
 *   --tiedosto <polku>   vain yksi tiedosto   --esimerkit <n>  näytä n esimerkkiä/tiedosto
 *
 * Vain pariutuvat lainaukset muutetaan: avaava merkki sanarajalla (alku, väli,
 * sulku, ajatusviiva) ja sulkeva ennen väliä/välimerkkiä/loppua. Sanan sisäinen
 * heittomerkki (Chang'an, Dracula's) ei koske. Parittomat jäävät raporttiin.
 */
import fs from 'fs';
import { execSync } from 'child_process';

const arg = (n) => { const i = process.argv.indexOf(n); return i < 0 ? null : process.argv[i + 1]; };
const KIRJOITA = process.argv.includes('--kirjoita');
const YKSI = arg('--tiedosto');
const ESIM = Number(arg('--esimerkit') ?? 1);

/* Mukana: pakettien ja linssien sisältö, data-JSONit, katalogit. Pois: koodi, museot (LS), lähdesivut. */
const MUKANA = [/^tools\/astronaut\/qa-.+\.json$/, /^js\/packs\/.+\.js$/, /^js\/linssit\/.+\.js$/, /^data\/.+\.json$/];
const POIS = [/^js\/linssit\/astronaut-kysymykset\.js$/, /museo|ranska|alankomaat|louvre|orsay|rodin/i, /^js\/lahteet\.js$/, /^js\/packs\/commons-tekijat\.js$/, /^data\/aanilahteet\.json$/, /^data\/oppaan-kuvat\/oppaan-kuvat\.json$/];
/* Vain näyttötekstien avaimet (valkolista); lähde-, tiedosto-, tekijä-, luokka- ja koodikentät eivät ole mukana. */
const NAYTTO_AVAIMET = /^(teksti|selite|pitka|a|lyhyt|q|kysymys|kysymykset|fact|diaries|fakta|saanto|vaihtoehdot|options|vastaus|otsikko|nosto|kortti|text|kappaleet|kappale|selitys|juttu|intro|johdanto|esittely|loyto|hint|henkilojuttu|artikkeli|lunastus|kuvaus|valtiomuoto|paikka|vaarin|lehtiJohdanto|nappi|ateena|kamerun|lagos|nairobi|kioto|kanton|vilna|kadikoy|suomi|lontoo|newyork|mumbai|peking|singapore|niah|beringia)$/;

/* ---------- lekseri: merkkijonoliteraalit + niitä edeltävä avain ---------- */
export function lekseroi(src) {
  const lit = []; let i = 0; const n = src.length; let avain = '(muu)';
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { while (i < n && src[i] !== '\n') i++; continue; }
    if (c === '/' && d === '*') { const e = src.indexOf('*/', i + 2); if (e < 0) break; i = e + 2; continue; }
    if (c === '"' || c === "'" || c === '`') {
      const q = c; let j = i + 1;
      while (j < n) {
        if (src[j] === '\\') { j += 2; continue; }
        if (q === '`' && src[j] === '$' && src[j + 1] === '{') { let b = 1; j += 2; while (j < n && b > 0) { if (src[j] === '{') b++; else if (src[j] === '}') b--; j++; } continue; }
        if (src[j] === q) break;
        if (q !== '`' && src[j] === '\n') break;
        j++;
      }
      const rest = src.slice(j + 1, j + 40);
      const onAvain = /^\s*:/.test(rest) && !/^\s*::/.test(rest);
      if (onAvain) avain = src.slice(i + 1, j);
      else lit.push({ q, alku: i + 1, loppu: j, avain });
      i = j + 1; continue;
    }
    if (/[A-Za-z_$]/.test(c) && !/[\w$.]/.test(src[i - 1] ?? ' ')) {
      let j = i; while (j < n && /[\w$]/.test(src[j])) j++;
      if (/^\s*:(?!:)/.test(src.slice(j, j + 6)) && src[j] !== '?') avain = src.slice(i, j);
      i = j; continue;
    }
    i++;
  }
  return lit;
}

/* ---------- muunnos: `+`-yhdistetyt literaalit käsitellään yhtenä tekstinä ---------- */
const D = '\u0001', S = '\u0002'; // paikanvaraajat: pituus säilyy, joten palaset voi jakaa takaisin
const ALKU = String.raw`(?<=^|[\s(\[—–\-])`;
const LOPPU = String.raw`(?=$|[\s.,;:!?)\]—–\-])`;
const ph = (raaka, q) => raaka
  .replaceAll(q === '"' ? '\\"' : '"', D)
  .replaceAll(q === "'" ? "\\'" : "'", S);
const pura = (t, q) => t.replaceAll(D, q === '"' ? '\\"' : '"').replaceAll(S, q === "'" ? "\\'" : "'");

function ryhmat(src, lit) {
  const r = []; let nyt = null;
  for (const L of lit) {
    if (nyt && /^\s*\+\s*$/.test(src.slice(nyt.at(-1).loppu + 1, L.alku - 1))) nyt.push(L);
    else { nyt = [L]; r.push(nyt); }
  }
  return r;
}

function muunnaRyhma(src, ryhma) {
  const osat = ryhma.map((L) => ph(src.slice(L.alku, L.loppu), L.q));
  let t = osat.join(''), muutoksia = 0;
  t = t.replace(new RegExp(`${ALKU}${D}((?:(?!${D}).)+?)${D}${LOPPU}`, 'gs'), (m, x) => { muutoksia++; return `”${x}”`; });
  t = t.replace(new RegExp(`${ALKU}${S}(?=\\S)((?:(?!${S}(?=$|[\\s.,;:!?)\\]—–\\-])).)+?)(?<=\\S)${S}${LOPPU}`, 'gs'), (m, x) => { muutoksia++; return `’${x}’`; });
  let i = 0; const ulos = ryhma.map((L, k) => { const palanen = t.slice(i, i + osat[k].length); i += osat[k].length; return pura(palanen, L.q); });
  const jaljella = {
    d: (t.match(new RegExp(D, 'g')) ?? []).length,
    s: (t.match(new RegExp(`(?<![\\p{L}\\p{N}])${S}|${S}(?![\\p{L}\\p{N}])`, 'gu')) ?? []).length,
  };
  return { ulos, muutoksia, jaljella, kokoTeksti: t };
}

/* ---------- ajo ---------- */
const tiedostot = (YKSI ? [YKSI] : execSync("git ls-files", { maxBuffer: 1e9 }).toString().trim().split('\n')
  .filter((f) => MUKANA.some((r) => r.test(f)) && !POIS.some((r) => r.test(f))));

let yhteensa = 0, tiedostoja = 0, koodimaiset = 0; const avaimet = {}, parittomat = [], esim = [], yksittaiset = [];
for (const f of tiedostot) {
  const src = fs.readFileSync(f, 'utf8'); const lit = lekseroi(src);
  const muutokset = [];
  for (const ryhma of ryhmat(src, lit)) {
    if (!NAYTTO_AVAIMET.test(ryhma[0].avain)) continue;
    if (ryhma.some((L) => L.q === '`' && src.slice(L.alku, L.loppu).includes('${'))) { koodimaiset++; continue; }
    if (!ryhma.some((L) => /["']/.test(src.slice(L.alku, L.loppu)))) continue;
    const r = muunnaRyhma(src, ryhma);
    if (r.muutoksia) {
      for (const m of r.kokoTeksti.matchAll(/.{0,25}’[^’]{0,70}’.{0,15}/gs)) yksittaiset.push(`${f}: ${m[0].replace(/\n/g, ' ')}`);
      ryhma.forEach((L, k) => { const vanha = src.slice(L.alku, L.loppu); if (vanha !== r.ulos[k]) muutokset.push({ L, t: r.ulos[k], vanha }); });
      avaimet[ryhma[0].avain] = (avaimet[ryhma[0].avain] ?? 0) + r.muutoksia; yhteensa += r.muutoksia;
    }
    if (r.jaljella.d || r.jaljella.s) parittomat.push(`${f} [${ryhma[0].avain}] ${r.jaljella.d ? `"×${r.jaljella.d}` : ''}${r.jaljella.s ? ` '×${r.jaljella.s}` : ''}: ${r.kokoTeksti.replace(/\n/g, ' ').slice(0, 130)}`);
  }
  if (!muutokset.length) continue;
  tiedostoja++;
  esim.push(...muutokset.slice(0, ESIM).map((m) => `${f} [${m.L.avain}]\n   - ${m.vanha.slice(0, 140)}\n   + ${m.t.slice(0, 140)}`));
  if (KIRJOITA) {
    let ulos = src;
    for (const m of muutokset.sort((a, b) => b.L.alku - a.L.alku)) ulos = ulos.slice(0, m.L.alku) + m.t + ulos.slice(m.L.loppu);
    fs.writeFileSync(f, ulos);
  }
}
console.log(`${KIRJOITA ? 'MUUTETTU' : 'KUIVAAJO'}: ${yhteensa} lainausta, ${tiedostoja} tiedostoa (${tiedostot.length} tarkistettu)`);
console.log(`Ohitettu ${koodimaiset} mallikirjaimistoa (\${…}).`);
console.log('AVAIMET: ' + Object.entries(avaimet).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join('  '));
if (esim.length) console.log('\nESIMERKIT:\n' + esim.slice(0, 40).join('\n'));
if (process.argv.includes('--yksittaiset')) console.log(`\nYKSITTÄISET ’…’ (${yksittaiset.length}):\n` + yksittaiset.join('\n'));
console.log(`\nPARITTOMIA/EPÄSELVIÄ JÄLJELLÄ (${parittomat.length}):\n` + parittomat.slice(0, 120).join('\n'));
