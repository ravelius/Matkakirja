#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { TAGIT, puhemuoto } from './generoi-pulu.mjs';

const ROOT = new URL('../', import.meta.url);
const BASELINE = '079284e1cf09f650ed7e5f3d54f54c4e3da933b1';
const configs = {
  e1: [['lontoo', 'Lontoo'], ['dublin', 'Dublin'], ['edinburgh', 'Edinburgh'], ['amsterdam', 'Amsterdam'], ['pariisi', 'Pariisi']],
  e2: [['madrid', 'Madrid'], ['barcelona', 'Barcelona'], ['sevilla', 'Sevilla'], ['granada', 'Granada'], ['lissabon', 'Lissabon']],
  e3: [['rooma', 'Rooma'], ['firenze', 'Firenze'], ['sisilia', 'Sisilia — Palermo'], ['alpit', 'Alpit — Grindelwald'], ['wien', 'Wien'], ['praha', 'Praha'], ['berliini', 'Berliini']],
  e4b: [['bergen', 'Bergen'], ['oslo', 'Oslo'], ['kobenhavn', 'Kööpenhamina'], ['islanti', 'Islanti']],
  e5: [['sofia', 'Sofia'], ['bukarest', 'Bukarest'], ['budapest', 'Budapest'], ['istanbul', 'Istanbul'], ['dubrovnik', 'Dubrovnik'], ['kreeta', 'Kreeta']],
  e6: [['kiova', 'Kiova'], ['odessa', 'Odessa'], ['krakova', 'Krakova'], ['varsova', 'Varsova'], ['moskova', 'Moskova'], ['pietari', 'Pietari']],
};

const batch = process.argv[2];
if (!configs[batch]) throw new Error(`Tuntematon erä: ${batch}`);
const correctionBatches = new Set(['e2', 'e3', 'e4b', 'e5']);
const revision = `eu-hl-${batch}-20260913-${correctionBatches.has(batch) ? 'r2' : 'r1'}-approved1`;
const reportDir = new URL('docs/raportit/', ROOT);
const read = (name) => readFileSync(new URL(name, reportDir), 'utf8');
const copyPath = `horatio-livia-${batch}-r1-lukukopio-20260913.md`;
const metricsPath = `horatio-livia-${batch}-r1-mittaraportti-20260913.md`;
let copy = read(copyPath);
let metrics = read(metricsPath);

function esc(value) {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
}
function section(text, heading, nextPattern = '^## ') {
  const start = text.indexOf(`## ${heading}`);
  if (start < 0) throw new Error(`${heading}: osio puuttuu`);
  const tail = text.slice(start + (`## ${heading}`).length);
  const match = tail.match(new RegExp(`\\n${nextPattern}`, 'm'));
  return match ? tail.slice(0, match.index) : tail;
}
function visiblePair(name) {
  const part = section(copy, name);
  const m = part.match(/\*\*Horatio\*\*\n\n> ([^\n]+)[\s\S]*?\*\*Livia\*\*\n\n> ([^\n]+)/);
  if (!m) throw new Error(`${name}: lukukopion pari puuttuu`);
  return { horatio: m[1], livia: m[2] };
}
function ttsPair(name) {
  const part = section(metrics, name, '^### ');
  const quotes = [...part.matchAll(/^> (\[[^\n]+)$/gm)].map((m) => m[1]);
  if (quotes.length < 2) throw new Error(`${name}: TTS-pari puuttuu`);
  return { horatio: quotes[0], livia: quotes[1] };
}
function cueRows(id, name) {
  const result = { horatio: [], livia: [] };
  for (const line of metrics.split('\n')) {
    let m = line.match(new RegExp('\\| [^|]+ \\| (Horatio|Livia) \\| `'
      + id + '\\.(r\\d+|livia\\.c\\d+)` \\| `([^`]+)` \\| `?([^|` ]+)`? \\| ([0-9.,]+)'));
    if (m) {
      const cue = { cueId: `${id}.${m[2]}`, anchor: m[3], intent: m[4], strength: Number(m[5].replace(',', '.')) };
      result[m[1] === 'Horatio' ? 'horatio' : 'livia'].push(cue);
      continue;
    }
    m = line.match(new RegExp('\\| `'
      + id + '\\.(r\\d+|livia\\.c\\d+)` \\| (H|L) \\| `([^`]+)` \\| ([^| ]+) \\| ([0-9.]+)'));
    if (m) {
      const cue = { cueId: `${id}.${m[1]}`, anchor: m[3], intent: m[4], strength: Number(m[5]) };
      result[m[2] === 'H' ? 'horatio' : 'livia'].push(cue);
    }
  }
  if (!result.horatio.length) {
    const cueName = name.split(' — ')[0];
    const row = metrics.split('\n').find((line) => line.startsWith(`| ${cueName} |`) && line.includes(' r1 `'));
    if (!row) throw new Error(`${name}: cue-rivi puuttuu`);
    const cells = row.split('|').map((v) => v.trim()).filter(Boolean);
    for (const [kind, cell] of [['horatio', cells[1]], ['livia', cells[2]]]) {
      const regex = kind === 'horatio'
        ? /(?:^|; )r(\d+) `([^`]+)` ([a-z]+) ([0-9.]+)/g
        : /(?:^|; )c(\d+) `([^`]+)` ([a-z]+) ([0-9.]+)/g;
      for (const m of cell.matchAll(regex)) result[kind].push({
        cueId: kind === 'horatio' ? `${id}.r${m[1]}` : `${id}.livia.c${m[1]}`,
        anchor: m[2], intent: m[3], strength: Number(m[4]),
      });
    }
  }
  if (!result.horatio.length || !result.livia.length) throw new Error(`${name}: cueja puuttuu`);
  return result;
}
function replaceExpression(source, from, key, rendered) {
  const at = source.indexOf(`${key}:`, from);
  if (at < 0) throw new Error(`${key}: kenttä puuttuu`);
  let i = at + key.length + 1;
  while (/\s/.test(source[i])) i++;
  const start = i;
  let depth = 0, quote = null, escaped = false;
  for (; i < source.length; i++) {
    const ch = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue; }
    if ('([{'.includes(ch)) depth++;
    else if (')]}'.includes(ch)) depth--;
    else if (ch === ',' && depth === 0) break;
  }
  if (i >= source.length) throw new Error(`${key}: lausekkeen loppu puuttuu`);
  return source.slice(0, start) + rendered + source.slice(i);
}
function runtimeCues(cues) {
  return `[\n${cues.map((cue) => `      { id: ${esc(cue.cueId)}, ankkuri: ${esc(cue.anchor)}, tarkoitus: ${esc(cue.intent)}, voimakkuus: ${cue.strength}, siirtyma: 0,\n        perustelu: 'Toimituksellisen Eurooppa-revision hyväksytty reaktio.' }`).join(',\n')},\n    ]`;
}
const sha = (text) => createHash('sha256').update(text).digest('hex');
const cities = [];
for (const [id, name] of configs[batch]) {
  const visible = visiblePair(name);
  const tts = ttsPair(name);
  const cues = cueRows(id, name);
  const strip = (text) => text.replace(/\[[^\]]+\]\s*/g, '').trim();
  if (strip(tts.horatio) !== visible.horatio || strip(tts.livia) !== visible.livia) throw new Error(`${id}: TTS ei vastaa näkyvää tekstiä`);
  for (const cue of [...cues.horatio, ...cues.livia]) {
    const haystack = cue.cueId.includes('.livia.') ? visible.livia : visible.horatio;
    if (haystack.split(cue.anchor).length - 1 !== 1) throw new Error(`${cue.cueId}: ankkuri ei ole yksikäsitteinen`);
  }
  const packUrl = new URL(`js/packs/fokusvirta-${id}.js`, ROOT);
  let source = readFileSync(packUrl, 'utf8');
  const mk = source.indexOf('matkakirja:');
  const po = source.indexOf('pollo:', mk);
  source = replaceExpression(source, mk, 'teksti', esc(visible.horatio));
  source = replaceExpression(source, mk, 'reaktiot', runtimeCues(cues.horatio));
  source = replaceExpression(source, mk, 'luenta', esc(tts.horatio));
  source = replaceExpression(source, po, 'kommentti', `[\n      ${esc(visible.livia)},\n    ]`);
  writeFileSync(packUrl, source);
  const mapCue = (cue, livia = false) => ({
    cueId: cue.cueId, anchor: cue.anchor, ...(livia ? { occurrence: 1 } : {}),
    intent: cue.intent, strength: cue.strength, ...(livia ? {} : { offsetMs: 0 }),
  });
  cities.push({ city: id,
    horatio: { visibleText: visible.horatio, visibleTextSha256: sha(visible.horatio), ttsText: tts.horatio, ttsTextSha256: sha(tts.horatio), cues: cues.horatio.map((c) => mapCue(c)) },
    livia: { audioId: `${id}-3`, visibleText: visible.livia, visibleTextSha256: sha(visible.livia), ttsText: tts.livia, ttsTextSha256: sha(tts.livia), cues: cues.livia.map((c) => mapCue(c, true)) },
  });
}
copy = copy.replaceAll(`eu-hl-${batch}-20260913-r1-candidate1`, revision)
  .replace(/(?:- )?Tila: toimituksellinen ehdokas; ei viety packeihin eikä julkaistu/, 'Tila: hyväksytty ja sisältöjäädytetty; packit vastaavat tätä lukukopiota.');
metrics = metrics.replaceAll(`eu-hl-${batch}-20260913-r1-candidate1`, revision)
  .replace(/(?:- )?Tila: ehdokas; ei pack-, testi-, audio-, kuva- eikä julkaisumuutoksia/, 'Tila: hyväksytty ja sisältöjäädytetty; audioajo vain RC/animaatiovetäjälle.');
writeFileSync(new URL(copyPath, reportDir), copy);
writeFileSync(new URL(metricsPath, reportDir), metrics);
const manifest = {
  schemaVersion: 1, contentRevision: revision, state: 'content-frozen-audio-authorized-rc-only',
  publishedBaselineCommit: BASELINE,
  invariants: { visibleAndSpokenWordsMustMatch: true, finalTimingsFromForcedAlignmentOnly: true, audioRunOwner: 'RC/animaatiovetäjä', imageGenerationAuthorized: false, publishAuthorized: false },
  voices: { horatio: { name: 'Viisas Kertoja', model: 'eleven_v3' }, livia: { name: 'Flicker — cheerful fairy & sparkly sweetness', id: 'piI8Kku0DcvcL6TTSeQt', model: 'eleven_v3', stability: 0.5 } },
  cities,
};
if (batch === 'e5') {
  const extras = [];
  for (const line of metrics.split('\n')) {
    const m = line.match(/^\| `(sofia-(?:5|6|7|8|9|10|11|12|13|14))` \| `([^`]+)` \| ([^|]+) \| (.+) \|$/);
    if (!m) continue;
    const text = m[4].trim();
    const ttsText = puhemuoto(text, TAGIT[m[1]]);
    extras.push({ audioId: m[1], context: m[2], index: m[3].trim(), visibleText: text,
      visibleTextSha256: sha(text), ttsText, ttsTextSha256: sha(ttsText), unchangedFromBaseline: true,
      generationAction: 'reuse-existing',
      ttsRecipeSource: { path: 'tools/generoi-pulu.mjs', export: 'TAGIT', verifiedAtCommit: BASELINE } });
  }
  if (extras.length !== 10) throw new Error(`Sofia: odotettiin 10 city-pairin ulkopuolista utteranssia, saatiin ${extras.length}`);
  manifest.sofiaSupplementalLiviaUtterances = extras;
}
writeFileSync(new URL(`horatio-livia-${batch}-luentamanifesti-20260913.json`, reportDir), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${batch}: ${cities.length} kaupunkia viety packeihin ja manifestiin`);
