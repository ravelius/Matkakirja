#!/usr/bin/env node
/**
 * HAHMOJEN ÄÄNINÄYTTEET CI:ssä (Pelikoodari 30.9.2026; Päätoimittaja: pysyvä reitti hahmoäänien valintaan).
 * Avaimet ovat vain GitHub Actions -salaisuuksina (ELEVEN_API_KEY, OPENAI_API_KEY); työkalu ei tulosta niitä.
 * Ajetaan työnkululla .github/workflows/generoi-hahmonaytteet.yml; tulokset artefaktina (hahmonaytteet-output/).
 *
 *   TOIMINTO=haku     ILMAINEN: ElevenLabsin kirjastohaku (omat äänet + jaetut äänet hahmokohtaisilla suodattimilla).
 *                     SYOTE = [{ "hahmo": "Vouti", "gender": "male", "age": "middle_aged", "use_cases": "characters_animation",
 *                               "haku": "calm", "language": "fi" (valinnainen) }, …]
 *   TOIMINTO=kuiva    Syötteen tarkistus ja merkkimäärä, ei maksullisia kutsuja.
 *   TOIMINTO=generoi  MAKSULLINEN: yksi näytelause per rivi, eleven_v4, mp3 44,1 kHz 192 kbit/s (ei uudelleenkoodausta).
 *                     SYOTE = { "lupa": "…", "naytteet": [{ "hahmo", "ab": "A"|"B", "voice_id", "voice_nimi", "teksti" }] }
 *                     Valinnaiset rivikentät: "malli" (eleven_v4 oletus | eleven_v3: kertoja/isoisä, omistaja 30.9.2026 klo 23.5x)
 *                     ja "stability" (0–1, esim. 0.5 kuten matkakirjaluennoissa).
 *                     Tuottaa: naytteet/NN-hahmo-A.mp3 (alkuperäiset), kooste.mp3 (1 s tauot, luettelon järjestyksessä),
 *                     lista.md ja lista.json (hahmo, A/B, voice_id, voice_nimi, kesto, whisper-litterointi ja osuma %).
 *
 * Rajat: enintään 30 näytettä ja 4 000 merkkiä per ajo; maksullista ajoa ei uusita automaattisesti (GITHUB_RUN_ATTEMPT 1).
 * Whisper-tarkistus (OpenAI whisper-1, kieli fi) vain, jos OPENAI_API_KEY on asetettu; muuten lista kertoo "ei tarkistettu".
 */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

const exec = promisify(execFile);
const API = 'https://api.elevenlabs.io';
const ULOS = 'hahmonaytteet-output';
export const MALLI = 'eleven_v4';
/** Sallitut mallit: v4 hahmoille ja Pululle, v3 vain kertojalle (isoisän ääni toimii sillä paremmin). */
export const MALLIT = Object.freeze(['eleven_v4', 'eleven_v3']);
export const MUOTO = 'mp3_44100_192';
export const RAJAT = Object.freeze({ naytteita: 30, merkkeja: 4000, lause: 400 });

/** Tiedostonimen osa hahmon nimestä (ä → a, välilyönnit viivoiksi). */
export function tunnus(hahmo) {
  return hahmo.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function tarkistaGeneroi(syote) {
  const d = typeof syote === 'string' ? JSON.parse(syote) : syote;
  assert.ok(d && typeof d.lupa === 'string' && d.lupa.trim().length >= 5, 'lupa-kenttä (omistajan lupa, lokiviite) puuttuu');
  assert.ok(Array.isArray(d.naytteet) && d.naytteet.length > 0, 'naytteet puuttuu');
  assert.ok(d.naytteet.length <= RAJAT.naytteita, `enintään ${RAJAT.naytteita} näytettä`);
  let merkkeja = 0;
  const nahdyt = new Set();
  const naytteet = d.naytteet.map((n, i) => {
    assert.ok(typeof n.hahmo === 'string' && n.hahmo.trim(), `rivi ${i + 1}: hahmo`);
    assert.ok(['A', 'B', 'C'].includes(n.ab), `rivi ${i + 1}: ab on A, B tai C`);
    assert.match(String(n.voice_id), /^[A-Za-z0-9]{20}$/, `rivi ${i + 1}: voice_id`);
    assert.ok(typeof n.teksti === 'string' && n.teksti.trim().length > 0 && n.teksti.length <= RAJAT.lause, `rivi ${i + 1}: teksti`);
    assert.ok(n.malli == null || MALLIT.includes(n.malli), `rivi ${i + 1}: malli ${MALLIT.join(' | ')}`);
    assert.ok(n.stability == null || (typeof n.stability === 'number' && n.stability >= 0 && n.stability <= 1), `rivi ${i + 1}: stability 0–1`);
    const avain = `${tunnus(n.hahmo)}-${n.ab}`;
    assert.ok(!nahdyt.has(avain), `rivi ${i + 1}: ${avain} kahdesti`);
    nahdyt.add(avain);
    merkkeja += n.teksti.length;
    return { hahmo: n.hahmo.trim(), ab: n.ab, voice_id: n.voice_id, voice_nimi: String(n.voice_nimi ?? ''), teksti: n.teksti.trim(),
      malli: n.malli ?? MALLI, ...(n.stability != null ? { stability: n.stability } : {}),
      tiedosto: `naytteet/${String(i + 1).padStart(2, '0')}-${avain}.mp3` };
  });
  assert.ok(merkkeja <= RAJAT.merkkeja, `enintään ${RAJAT.merkkeja} merkkiä (nyt ${merkkeja})`);
  return { lupa: d.lupa.trim(), naytteet, merkkeja };
}

/** Litteroinnin ja lauseen samankaltaisuus 0–100 (sanatason osuma, välimerkit ja kirjainkoko pois). */
export function osuma(odotettu, saatu) {
  const sanat = (t) => String(t ?? '').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
  const a = sanat(odotettu);
  const b = sanat(saatu);
  if (!a.length) return 0;
  const jaljella = [...b];
  let osui = 0;
  for (const s of a) {
    const i = jaljella.indexOf(s);
    if (i >= 0) { osui += 1; jaljella.splice(i, 1); }
  }
  return Math.round((100 * osui) / Math.max(a.length, b.length));
}

async function haeJson(url, avain) {
  const v = await fetch(url, { headers: { 'xi-api-key': avain, accept: 'application/json' }, signal: AbortSignal.timeout(30000) });
  assert.ok(v.ok, `HTTP ${v.status} ${url.replace(API, '')}`);
  return v.json();
}

function aaniRivi(a) {
  const l = a.labels ?? {};
  const kuvaus = String(a.description ?? l.description ?? '').replace(/\s+/g, ' ').slice(0, 90);
  return { voice_id: a.voice_id, nimi: a.name, gender: a.gender ?? l.gender ?? '', age: a.age ?? l.age ?? '', accent: a.accent ?? l.accent ?? '',
    language: a.language ?? l.language ?? '', kaytto: a.use_case ?? l.use_case ?? '', kuvaus, esikuuntelu: a.preview_url ?? '' };
}

export async function haku(syote, avain) {
  const kyselyt = syote ? (typeof syote === 'string' ? JSON.parse(syote) : syote) : [];
  assert.ok(Array.isArray(kyselyt) && kyselyt.length <= 20, 'haku: taulukko, enintään 20 kyselyä');
  const tulos = { omat: [], hahmot: [] };
  const omat = await haeJson(`${API}/v1/voices`, avain);
  tulos.omat = (omat.voices ?? []).map(aaniRivi);
  for (const k of kyselyt) {
    // Kieli vain pyydettäessä: omistaja 30.9. suosii hahmoäänikategoriaa (use_cases characters_animation), v4 ääntää suomea hyvin.
    const p = new URLSearchParams({ page_size: String(Math.min(40, Number(k.maara ?? 25))) });
    for (const kentta of ['language', 'gender', 'age', 'accent', 'use_cases', 'category', 'sort']) if (k[kentta]) p.set(kentta, k[kentta]);
    if (k.haku) p.set('search', k.haku);
    let aanet = [];
    try { aanet = ((await haeJson(`${API}/v1/shared-voices?${p}`, avain)).voices ?? []).map(aaniRivi); } catch (e) { aanet = [{ virhe: e.message }]; }
    tulos.hahmot.push({ hahmo: k.hahmo, kysely: p.toString(), aanet });
  }
  await fs.mkdir(ULOS, { recursive: true });
  await fs.writeFile(path.join(ULOS, 'haku.json'), JSON.stringify(tulos, null, 2) + '\n');
  const md = ['# Ääniehdokkaat', '', '## Omat äänet', '', ...tulos.omat.map((a) => `- ${a.nimi} \`${a.voice_id}\` ${a.gender} ${a.age} ${a.accent} — ${a.kuvaus}`)];
  for (const h of tulos.hahmot) {
    md.push('', `## ${h.hahmo} (${h.kysely})`, '');
    for (const a of h.aanet) md.push(a.virhe ? `- virhe: ${a.virhe}` : `- ${a.nimi} \`${a.voice_id}\` ${a.gender} ${a.age} ${a.accent} ${a.language} ${a.kaytto} — ${a.kuvaus}`);
  }
  await fs.writeFile(path.join(ULOS, 'haku.md'), md.join('\n') + '\n');
  console.log(md.join('\n'));
}

async function whisper(tiedosto, avain) {
  const lomake = new FormData();
  lomake.set('file', new Blob([await fs.readFile(tiedosto)], { type: 'audio/mpeg' }), path.basename(tiedosto));
  lomake.set('model', 'whisper-1');
  lomake.set('language', 'fi');
  const v = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST', headers: { Authorization: `Bearer ${avain}` }, body: lomake, signal: AbortSignal.timeout(120000),
  });
  if (!v.ok) return { teksti: null, virhe: `HTTP ${v.status}` };
  return { teksti: (await v.json()).text ?? '' };
}

async function kesto(tiedosto) {
  const { stdout } = await exec('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', tiedosto]);
  return Number(stdout.trim());
}

export async function generoi(syote, { ymp = process.env } = {}) {
  const t = tarkistaGeneroi(syote);
  assert.ok(ymp.ELEVEN_API_KEY, 'ELEVEN_API_KEY puuttuu');
  assert.equal(ymp.GITHUB_RUN_ATTEMPT ?? '1', '1', 'maksullista ajoa ei uusita');
  await fs.mkdir(path.join(ULOS, 'naytteet'), { recursive: true });
  const rivit = [];
  for (const n of t.naytteet) {
    const v = await fetch(`${API}/v1/text-to-speech/${n.voice_id}?output_format=${MUOTO}`, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(180000),
      headers: { 'xi-api-key': ymp.ELEVEN_API_KEY, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({ text: n.teksti, model_id: n.malli ?? MALLI,
        ...(n.stability != null ? { voice_settings: { stability: n.stability } } : {}) }),
    });
    if (!v.ok) { rivit.push({ ...n, virhe: `HTTP ${v.status}` }); console.log(`${n.hahmo} ${n.ab}: HTTP ${v.status}`); continue; }
    const tavut = Buffer.from(await v.arrayBuffer());
    const polku = path.join(ULOS, n.tiedosto);
    await fs.writeFile(polku, tavut); // alkuperäiset tavut, ei uudelleenkoodausta
    const k = await kesto(polku);
    const w = ymp.OPENAI_API_KEY ? await whisper(polku, ymp.OPENAI_API_KEY) : { teksti: null, virhe: 'ei tarkistettu' };
    const rivi = { ...n, kesto: Math.round(k * 10) / 10, whisper: w.teksti, whisper_virhe: w.virhe ?? null, osuma: w.teksti != null ? osuma(n.teksti, w.teksti) : null };
    rivit.push(rivi);
    console.log(`${n.hahmo} ${n.ab}: ${rivi.kesto} s, whisper ${rivi.osuma ?? '–'} %`);
  }
  // Kooste: näytteet luettelon järjestyksessä, 1 s tauot (vain kuuntelua varten koodattu 192 kbit/s).
  const ok = rivit.filter((r) => !r.virhe);
  if (ok.length) {
    const lista = [];
    await exec('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-t', '1', '-q:a', '2', path.join(ULOS, 'tauko.mp3')]);
    for (const r of ok) lista.push(`file '${path.resolve(ULOS, r.tiedosto)}'`, `file '${path.resolve(ULOS, 'tauko.mp3')}'`);
    await fs.writeFile(path.join(ULOS, 'kooste.txt'), lista.join('\n') + '\n');
    await exec('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', path.join(ULOS, 'kooste.txt'),
      '-ac', '2', '-ar', '44100', '-b:a', '192k', path.join(ULOS, 'kooste.mp3')]);
  }
  let alku = 0;
  const md = [`# Hahmojen ääninäytteet (${MALLI}, ${MUOTO})`, '', `Lupa: ${t.lupa}`, '',
    '| # | Hahmo | A/B | voice_id | Ääni | Kooste alkaa | Kesto | Whisper | Osuma |', '|---|---|---|---|---|---|---|---|---|'];
  rivit.forEach((r, i) => {
    const kohta = r.virhe ? '–' : `${Math.floor(alku / 60)}:${String(Math.round(alku % 60)).padStart(2, '0')}`;
    if (!r.virhe) alku += r.kesto + 1;
    md.push(`| ${i + 1} | ${r.hahmo} | ${r.ab} | \`${r.voice_id}\` | ${r.voice_nimi} | ${kohta} | ${r.virhe ?? `${r.kesto} s`} | ${r.whisper ?? r.whisper_virhe ?? ''} | ${r.osuma ?? '–'} |`);
  });
  await fs.writeFile(path.join(ULOS, 'lista.md'), md.join('\n') + '\n');
  await fs.writeFile(path.join(ULOS, 'lista.json'), JSON.stringify({ malli: MALLI, muoto: MUOTO, lupa: t.lupa, rivit }, null, 2) + '\n');
  console.log(md.join('\n'));
  assert.ok(ok.length === rivit.length, `${rivit.length - ok.length} näytettä epäonnistui (ei uusita automaattisesti)`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const toiminto = process.env.TOIMINTO;
  const syote = process.env.SYOTE ?? '';
  if (toiminto === 'haku') await haku(syote, process.env.ELEVEN_API_KEY ?? assert.fail('ELEVEN_API_KEY puuttuu'));
  else if (toiminto === 'kuiva') { const t = tarkistaGeneroi(syote); console.log(JSON.stringify({ naytteita: t.naytteet.length, merkkeja: t.merkkeja, maksullisia: 0 })); }
  else if (toiminto === 'generoi') await generoi(syote);
  else { console.error('TOIMINTO = haku | kuiva | generoi'); process.exit(2); }
}
