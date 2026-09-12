#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { FOKUSVIRRAT } from '../js/packs/fokusvirrat.js';

const ROOT = new URL('../', import.meta.url);
const REPORTS = new URL('docs/raportit/', ROOT);
const BASELINE = '079284e1cf09f650ed7e5f3d54f54c4e3da933b1';
const REVISION = 'eu-hl-europe-20260913-r1-approved1';
const names = {
  marseille: 'Marseille', ateena: 'Ateena', sarajevo: 'Sarajevo', venetsia: 'Venetsia',
  tukholma: 'Tukholma', helsinki: 'Helsinki', tampere: 'Tampere', tallinna: 'Tallinna',
  riika: 'Riika', vilna: 'Vilna', tromssa: 'Tromssa', lappi: 'Lappi',
  lontoo: 'Lontoo', dublin: 'Dublin', edinburgh: 'Edinburgh', amsterdam: 'Amsterdam', pariisi: 'Pariisi',
  madrid: 'Madrid', barcelona: 'Barcelona', sevilla: 'Sevilla', granada: 'Granada', lissabon: 'Lissabon',
  rooma: 'Rooma', firenze: 'Firenze', sisilia: 'Sisilia', alpit: 'Alpit', wien: 'Wien', praha: 'Praha', berliini: 'Berliini',
  bergen: 'Bergen', oslo: 'Oslo', kobenhavn: 'Kööpenhamina', islanti: 'Islanti',
  sofia: 'Sofia', bukarest: 'Bukarest', budapest: 'Budapest', istanbul: 'Istanbul', dubrovnik: 'Dubrovnik', kreeta: 'Kreeta',
  kiova: 'Kiova', odessa: 'Odessa', krakova: 'Krakova', varsova: 'Varsova', moskova: 'Moskova', pietari: 'Pietari',
};
const sha = (text) => createHash('sha256').update(text).digest('hex');
const strip = (text) => text.replace(/\[[^\]]+\]\s*/g, '').trim();
const words = (text) => text.trim().split(/\s+/u).filter(Boolean).length;
const readReport = (name) => readFileSync(new URL(name, REPORTS), 'utf8');

function section(text, name) {
  const start = text.indexOf(`### ${name}`);
  if (start < 0) throw new Error(`${name}: pilotin TTS-osio puuttuu`);
  const tail = text.slice(start + name.length + 4);
  const next = tail.match(/\n### /);
  return next ? tail.slice(0, next.index) : tail;
}
function pilotCities() {
  const report = readReport('horatio-livia-pilotti-r2-mittaraportti-20260912.md');
  const ids = ['marseille', 'ateena', 'sarajevo', 'venetsia'];
  return ids.map((city) => {
    const quotes = [...section(report, names[city]).matchAll(/^> (\[[^\n]+)$/gm)].map((m) => m[1]);
    const liviaCues = [];
    for (const line of report.split('\n')) {
      const m = line.match(new RegExp('\\| `'
        + city + '\\.livia\\.c(\\d+)` \\| `([^`]+)` \\| 1 \\| `([^`]+)` \\| ([0-9,]+)'));
      if (m) liviaCues.push({ cueId: `${city}.livia.c${m[1]}`, anchor: m[2], occurrence: 1, intent: m[3], strength: Number(m[4].replace(',', '.')) });
    }
    const pack = FOKUSVIRRAT[city];
    const visibleLivia = pack.pollo.kommentti[0];
    if (quotes.length !== 2 || strip(quotes[0]) !== pack.matkakirja.teksti || strip(quotes[1]) !== visibleLivia) throw new Error(`${city}: pilotin TTS ei täsmää`);
    return { city,
      horatio: { visibleText: pack.matkakirja.teksti, visibleTextSha256: sha(pack.matkakirja.teksti), ttsText: quotes[0], ttsTextSha256: sha(quotes[0]), cues: pack.matkakirja.reaktiot.map((c) => ({ cueId: c.id, anchor: c.ankkuri, intent: c.tarkoitus, strength: c.voimakkuus, offsetMs: c.siirtyma })) },
      livia: { audioId: `${city}-3`, visibleText: visibleLivia, visibleTextSha256: sha(visibleLivia), ttsText: quotes[1], ttsTextSha256: sha(quotes[1]), cues: liviaCues },
    };
  });
}

const manifests = [];
manifests.push({ batch: 'pilot', cities: pilotCities(), metrics: 'horatio-livia-pilotti-r2-mittaraportti-20260912.md', baselineIndex: 2 });
const e4 = JSON.parse(readReport('horatio-livia-e4-luentamanifesti-20260913.json'));
for (const city of e4.cities) city.livia.audioId = `${city.city}-3`;
manifests.push({ batch: 'e4', cities: e4.cities, metrics: 'horatio-livia-e4-r1-mittaraportti-20260913.md', baselineIndex: 2 });
for (const batch of ['e1', 'e2', 'e3', 'e4b', 'e5', 'e6']) {
  const data = JSON.parse(readReport(`horatio-livia-${batch}-luentamanifesti-20260913.json`));
  manifests.push({ batch, cities: data.cities, metrics: `horatio-livia-${batch}-r1-mittaraportti-20260913.md`, baselineIndex: ['e4b', 'e5', 'e6'].includes(batch) ? 4 : 2, extras: data.sofiaSupplementalLiviaUtterances ?? [] });
}
const byCity = new Map();
for (const group of manifests) for (const city of group.cities) {
  if (byCity.has(city.city)) throw new Error(`${city.city}: duplikaatti`);
  city.batch = group.batch;
  city.sourcePackPath = `js/packs/fokusvirta-${city.city}.js`;
  city.sourcePackBlobSha = execFileSync('git', ['rev-parse', `${BASELINE}:${city.sourcePackPath}`], { cwd: new URL('.', ROOT), encoding: 'utf8' }).trim();
  byCity.set(city.city, city);
}
const order = Object.keys(FOKUSVIRRAT);
if (order.length !== 45 || byCity.size !== 45 || order.some((id) => !byCity.has(id))) throw new Error(`Kattavuus ei ole 45/45: runtime ${order.length}, manifesti ${byCity.size}`);
const cities = order.map((id) => byCity.get(id));
const extras = manifests.flatMap((m) => m.extras ?? []);
if (extras.length !== 10) throw new Error(`Sofian lisäutteransseja ${extras.length}, odotettiin 10`);

const combined = {
  schemaVersion: 1, contentRevision: REVISION, state: 'content-frozen-audio-authorized-rc-only',
  publishedBaselineCommit: BASELINE, cityCount: 45, liviaCityUtteranceCount: 55,
  invariants: { visibleAndSpokenWordsMustMatch: true, finalTimingsFromForcedAlignmentOnly: true, audioRunOwner: 'RC/animaatiovetäjä', imageGenerationAuthorized: false, publishAuthorized: false, sofiaOnlyCityPairChange: 'sofia-3', sofiaPreservedUtterances: ['sofia-5','sofia-6','sofia-7','sofia-8','sofia-9','sofia-10','sofia-11','sofia-12','sofia-13','sofia-14'] },
  voices: { horatio: { name: 'Viisas Kertoja', model: 'eleven_v3' }, livia: { name: 'Flicker — cheerful fairy & sparkly sweetness', id: 'piI8Kku0DcvcL6TTSeQt', model: 'eleven_v3', stability: 0.5 } },
  cities, sofiaSupplementalLiviaUtterances: extras,
};
writeFileSync(new URL('horatio-livia-eurooppa-luentamanifesti-20260913.json', REPORTS), `${JSON.stringify(combined, null, 2)}\n`);

let compilation = `# Eurooppa 1873 — Horatio ja Livia, koko lukukopio\n\nSisältörevisio: \`${REVISION}\`  \nJulkaistu lähtörevisio: \`${BASELINE}\`  \nTila: 45 kaupunkiparia sisältöjäädytetty; audioajo vain RC/animaatiovetäjälle.\n\n`;
for (const city of cities) compilation += `## ${names[city.city]}\n\n**Horatio**\n\n> ${city.horatio.visibleText}\n\n**Livia**\n\n> ${city.livia.visibleText}\n\n`;
compilation += `## Sofia — muut 10 kaupunkiutteranssia\n\nNämä säilyvät julkaistusta baselinesta sanatarkasti; vain yllä oleva \`sofia-3\` muuttuu.\n\n`;
for (const extra of extras) compilation += `- \`${extra.audioId}\` (\`${extra.context}\`, indeksi ${extra.index}): ${extra.visibleText}\n`;
writeFileSync(new URL('horatio-livia-eurooppa-lukukopio-20260913.md', REPORTS), compilation);

function baselineFor(city) {
  const group = manifests.find((m) => m.cities.some((x) => x.city === city));
  const row = readReport(group.metrics).split('\n').find((line) => line.startsWith(`| ${names[city]} |`));
  if (!row) throw new Error(`${city}: mittarivi puuttuu tiedostosta ${group.metrics}`);
  const measures = [...row.matchAll(/(\d+)\s*(?:m\s*)?\/\s*(\d+)/g)].map((m) => ({ chars: Number(m[1]), words: Number(m[2]) }));
  if (!measures[group.baselineIndex]) throw new Error(`${city}: baseline-parimitta puuttuu`);
  return measures[group.baselineIndex];
}
let totalBaseChars = 0, totalBaseWords = 0, totalChars = 0, totalWords = 0;
let coverage = `# Eurooppa 1873 — kattavuus- ja mittaraportti\n\n- Sisältörevisio: \`${REVISION}\`\n- Julkaistu vertailu: \`${BASELINE}\`\n- Kaupungit: 45/45, ei aukkoja eikä duplikaatteja\n- Livian kaupunkiutteranssit: 55/55 (45 city-pair-kuplaa + Sofian 10 muuta kontekstipuhetta)\n- Tila: teksti, TTS-syöte, SHA:t ja cue-ankkurit jäädytetty; lopullinen audio ja forced alignment odottavat RC-ajoa\n- Kuvat: olemassa olevat kuvat säilytetty; tässä revisiossa ei generoitu kuvia\n\n| Erä | Kaupunki | Baseline pari | Uusi H | Uusi L | Uusi pari | Pulu-kuvia | H I1/I2 | Tulos |\n|---|---|---:|---:|---:|---:|---:|---:|---|\n`;
for (const city of cities) {
  const base = baselineFor(city.city);
  const hc = city.horatio.visibleText.length, hw = words(city.horatio.visibleText);
  const lc = city.livia.visibleText.length, lw = words(city.livia.visibleText);
  const pair = { chars: hc + lc, words: hw + lw };
  if (pair.chars > base.chars || pair.words > base.words) throw new Error(`${city.city}: pari ylittää baselinen`);
  const pack = FOKUSVIRRAT[city.city];
  const puluImages = pack.pollo?.kuvat?.length ?? 0;
  const hImages = `${pack.matkakirja?.luentakuva ? 'I1' : '–'}/${pack.matkakirja?.luentakuva2 ? 'I2' : '–'}`;
  coverage += `| ${city.batch} | ${names[city.city]} | ${base.chars}/${base.words} | ${hc}/${hw} | ${lc}/${lw} | ${pair.chars}/${pair.words} | ${puluImages} | ${hImages} | PASS |\n`;
  totalBaseChars += base.chars; totalBaseWords += base.words; totalChars += pair.chars; totalWords += pair.words;
}
coverage += `\n## Koonti\n\n- Baseline: ${totalBaseChars} merkkiä / ${totalBaseWords} sanaa.\n- Uusi 45 parin kokonaisuus: ${totalChars} merkkiä / ${totalWords} sanaa.\n- Muutos: ${totalChars - totalBaseChars} merkkiä / ${totalWords - totalBaseWords} sanaa.\n- Pulu-cam-kuvien määrä ja Horation I1/I2-sarakkeet ovat nykyisen pack-datan readback; puuttuva toinen Pulu-kuva ei ole puuttuva Horation I2-kuva.\n- Kuvien tekijä- tai lisenssitietoja ei päätellä tutkimuslähteistä.\n`;
writeFileSync(new URL('horatio-livia-eurooppa-kattavuus-ja-mitat-20260913.md', REPORTS), coverage);
console.log(`Eurooppa: ${cities.length} kaupunkia, ${cities.length + extras.length} Livian utteranssia, ${totalChars}/${totalWords} <= ${totalBaseChars}/${totalBaseWords}`);
