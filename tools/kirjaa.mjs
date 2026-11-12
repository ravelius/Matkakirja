#!/usr/bin/env node
/*
 * KIRJAA — Raamatun ainoa ovi (omistaja 12.11.2026 klo 09.12: "raamatun ja fiksumman työtavan voi laittaa nyt
 * ykkösprioriteetiksi"; KK:n suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261112-raamattu-uusiksi.md osat 2–5, 9).
 *
 *   node tools/kirjaa.mjs hae "<sanat>"                       aina ensin: kortit, perusta ja loki + aihe-ehdotus
 *   node tools/kirjaa.mjs aiheet                              aiheluettelo (koko/raja, luettu, tarkistettu)
 *   node tools/kirjaa.mjs lue <aihe>                          kortti + lukukerta lukulokiin
 *   node tools/kirjaa.mjs paatos <aihe> --klo HH.MM --kuka KK|PT "<omistajan sanat>" [--pvm P.K.VVVV]
 *   node tools/kirjaa.mjs kortti <aihe|A|B|C|KIRJASTOT> <tiedosto> [--ei-commit]   korvaa koko kortin (portti)
 *   node tools/kirjaa.mjs uusi-aihe <tunnus> "<nimi>" --perustelu "…"          pyyntö KK:lle
 *   node tools/kirjaa.mjs hyvaksy-aihe <tunnus> "<nimi>" <vastuu>               vain KK
 *   node tools/kirjaa.mjs alusta                             kerran: rakenteen rekisteröinti (vain ilman rekisteriä)
 *   node tools/kirjaa.mjs tila [--json]                       mittarit (myös kuntotarkastus, luku 13)
 *
 * Kodit: docs/raamattu/{A-peli.md, B-linjaukset.md, C-talo.md, KIRJASTOT.md, aiheet/<tunnus>.md, AIHEET.md (generoitu),
 * aiheet.json (luettelo), paatokset/<VVVV-KK>.md (loki), .kirjattu.json (oven tarkiste)}. Lukuloki ei ole gitissä.
 * Juuri: --juuri <kansio> tai KIRJAA_JUURI, muuten git-juuri. Lukuloki: KIRJAA_LUKULOKI.
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const argv = process.argv.slice(2);
const lippu = (n) => { const i = argv.indexOf(n); if (i < 0) return null; const v = argv[i + 1]; argv.splice(i, 2); return v; };
const kytkin = (n) => { const i = argv.indexOf(n); if (i < 0) return false; argv.splice(i, 1); return true; };
const JUURI = lippu('--juuri') || process.env.KIRJAA_JUURI ||
  execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
const R = join(JUURI, 'docs/raamattu');
const LUKULOKI = process.env.KIRJAA_LUKULOKI || '/Users/Shared/Claude/Matkakirja-fable/scratchpad/raamattu/lukuloki.tsv';
const MUISTI = process.env.KIRJAA_MUISTI ||
  '/Users/koodaus/.claude/projects/-Users-Shared-Claude-Matkakirja-fable/memory/MEMORY.md';
const PERUSTA = { A: ['A-peli.md', 2048], B: ['B-linjaukset.md', 4096], C: ['C-talo.md', 4096], KIRJASTOT: ['KIRJASTOT.md', 8192] };
const KORTTI_RAJA = 3072, AIHEITA_RAJA = 50, KOKO_RAJA = 150 * 1024, SAMA = 0.8, PAIVAA = 30;
const POHJA = ['TAVOITE:', 'SÄÄNNÖT:', 'EI VIKA:', 'TEKOTAPA:'];
const TUNNUS = /\[(P-\d{6}-[a-zäö0-9]+|R-\d+\.\d+)\]/g;  // P-VVKKPP-<sana> = paikanpitäjä, kunnes kirjaa paatos antaa numeron

const lue = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '');
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const git = (...a) => execFileSync('git', ['-C', JUURI, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const nyt = new Date();
const pvm = (d) => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
const kuolema = (viesti) => { console.error(viesti); process.exit(2); };

function luettelo() {
  const j = JSON.parse(lue(join(R, 'aiheet.json')) || '{"aiheet":[]}');
  return j;
}
const aiheet = () => luettelo().aiheet.map(([tunnus, nimi, vastuu]) => ({ tunnus, nimi, vastuu }));
const korttiPolku = (a) => (PERUSTA[a] ? join(R, PERUSTA[a][0]) : join(R, 'aiheet', `${a}.md`));
const korttiRaja = (a) => (PERUSTA[a] ? PERUSTA[a][1] : KORTTI_RAJA);

function rekisteri() { return JSON.parse(lue(join(R, '.kirjattu.json')) || '{}'); }
function kirjaaRekisteriin(polut) {
  const r = rekisteri();
  for (const p of polut) if (existsSync(p)) r[relative(R, p)] = { sha: sha(readFileSync(p, 'utf8')), aika: nyt.toISOString() };
  writeFileSync(join(R, '.kirjattu.json'), JSON.stringify(r, null, 1) + '\n');
}
function valvotut() {
  const out = [];
  for (const [, [n]] of Object.entries(PERUSTA)) if (existsSync(join(R, n))) out.push(join(R, n));
  for (const d of ['aiheet', 'paatokset']) {
    const k = join(R, d);
    if (existsSync(k)) for (const f of readdirSync(k)) if (f.endsWith('.md')) out.push(join(k, f));
  }
  for (const f of ['aiheet.json', 'aihepyynnot.md']) if (existsSync(join(R, f))) out.push(join(R, f));
  return out;
}

// --- samankaltaisuus (Ratcliff–Obershelp, sama kuin Pythonin difflib.ratio) ---
function lcs(a, b) {
  let best = 0, ai = 0, bi = 0; const prev = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    let diag = 0;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = a[i - 1] === b[j - 1] ? diag + 1 : 0;
      if (prev[j] > best) { best = prev[j]; ai = i - best; bi = j - best; }
      diag = tmp;
    }
  }
  return [best, ai, bi];
}
function osumat(a, b) {
  if (!a.length || !b.length) return 0;
  const [n, i, j] = lcs(a, b);
  if (!n) return 0;
  return n + osumat(a.slice(0, i), b.slice(0, j)) + osumat(a.slice(i + n), b.slice(j + n));
}
function suhde(a, b) {
  const sa = new Set(a.split(/\s+/)), sb = new Set(b.split(/\s+/));
  const yht = [...sa].filter((w) => sb.has(w)).length;
  if (yht / Math.max(sa.size, sb.size) < 0.4) return 0;  // esisuodatin: nopea, ei vaikuta ≥ 0,8 -tuloksiin käytännössä
  return (2 * osumat(a, b)) / (a.length + b.length);
}
function virkkeet(teksti) {
  return teksti.split('\n').filter((r) => !r.startsWith('#')).join('\n')
    .replace(TUNNUS, '').replace(/^\s*(\d+\.|-)\s+/gm, '').replace(/^(TAVOITE|SÄÄNNÖT|EI VIKA|TEKOTAPA):/gm, '')
    .split(/(?<=[.!?])\s+|\n/).map((s) => s.trim().toLowerCase()).filter((s) => s.length >= 30);
}
function korttienVirkkeet(ohita) {
  const out = [];
  for (const a of aiheet()) {
    if (a.tunnus === ohita) continue;
    for (const v of virkkeet(lue(korttiPolku(a.tunnus)))) out.push([a.tunnus, v]);
  }
  return out;
}

// --- portti ---
function tarkistaKortti(aihe, teksti) {
  const viat = [];
  const tavut = Buffer.byteLength(teksti);
  if (tavut > korttiRaja(aihe)) viat.push(`KOKO ${(tavut / 1024).toFixed(1)} kt > raja ${korttiRaja(aihe) / 1024} kt`);
  if (PERUSTA[aihe]) return viat;
  const rivit = teksti.split('\n');
  const m = rivit[0].match(/^# (\S+) · vastuu (\S+) · tarkistettu (\d{1,2}\.\d{1,2}\.\d{4})\s*$/);
  if (!m) viat.push('POHJA: ensimmäinen rivi ei ole "# <aihe> · vastuu <rooli> · tarkistettu <p.k.vvvv>"');
  else if (m[1] !== aihe) viat.push(`POHJA: otsikon aihe ${m[1]} ≠ ${aihe}`);
  let edel = -1;
  for (const o of POHJA) {
    const i = rivit.findIndex((r) => r.startsWith(o));
    if (i < 0) viat.push(`POHJA: osa ${o} puuttuu`);
    else if (i < edel) viat.push(`POHJA: osa ${o} väärässä järjestyksessä`);
    else edel = i;
  }
  const runko = rivit.slice(1).join('\n').replace(TUNNUS, '');
  const klo = runko.match(/\bklo\b|\b(?:[01]?\d|2[0-3])[.:][0-5]\d\b(?![.:]?\d)/i);
  if (klo) viat.push(`KELLONAIKA: "${klo[0]}" (päätökset kellonaikoineen kuuluvat lokiin: kirjaa paatos)`);
  const sit = runko.match(/["“”„«»][^"“”„«»\n]*\s[^"“”„«»\n]*["“”„«»]/);
  if (sit) viat.push(`SITAATTI: ${sit[0].slice(0, 60)} (sanatarkat sanat lokiin, korttiin sääntö omin sanoin)`);
  const s = rivit.findIndex((r) => r.startsWith('SÄÄNNÖT:')), e = rivit.findIndex((r) => r.startsWith('EI VIKA:'));
  if (s >= 0 && e > s) {
    const saannot = rivit.slice(s + 1, e).filter((r) => /^\s*\d+\.\s/.test(r));
    if (!saannot.length) viat.push('SÄÄNNÖT: ei yhtään numeroitua sääntöä');
    for (const r of saannot) if (!r.match(TUNNUS)) viat.push(`TUNNUS PUUTTUU: "${r.trim().slice(0, 70)}" (lisää [P-…] tai siirrossa [R-<kohta>])`);
  }
  const muut = korttienVirkkeet(aihe);
  for (const v of virkkeet(teksti)) {
    for (const [toinen, w] of muut) {
      const r = suhde(v, w);
      if (r >= SAMA) { viat.push(`PÄÄLLEKKÄIN kortin ${toinen} kanssa (${r.toFixed(2)}): "${v.slice(0, 60)}" → yhdistä tai osoita`); break; }
    }
  }
  return viat;
}

function generoiAiheet() {
  const rivit = ['# AIHEET (generoitu: node tools/kirjaa.mjs; älä muokkaa käsin)', '',
    `Aiheita ${aiheet().length} / ${AIHEITA_RAJA}. Kortti ≤ ${KORTTI_RAJA / 1024} kt. Ovi: node tools/kirjaa.mjs hae "<sanat>".`, '',
    '| Tunnus | Nimi | Vastuu | Koko | Tarkistettu |', '|---|---|---|---|---|'];
  for (const a of aiheet()) {
    const t = lue(korttiPolku(a.tunnus));
    const tark = (t.split('\n')[0].match(/tarkistettu (\S+)/) || [])[1] || '–';
    rivit.push(`| ${a.tunnus} | ${a.nimi} | ${a.vastuu} | ${t ? (Buffer.byteLength(t) / 1024).toFixed(1) + ' kt' : '–'} | ${tark} |`);
  }
  writeFileSync(join(R, 'AIHEET.md'), rivit.join('\n') + '\n');
}

function commit(viesti, polut) {
  git('add', '--', ...polut.map((p) => relative(JUURI, p)));
  git('commit', '-q', '-m', viesti);
  return git('log', '-1', '--format=%h').trim();
}

function lukuloki() {
  const out = {};
  for (const r of lue(LUKULOKI).split('\n')) {
    const [aika, aihe] = r.split('\t');
    if (aihe && (!out[aihe] || aika > out[aihe])) out[aihe] = aika;
  }
  return out;
}

function paatokset() {
  const k = join(R, 'paatokset'), out = [];
  if (!existsSync(k)) return out;
  for (const f of readdirSync(k).sort()) {
    for (const r of readFileSync(join(k, f), 'utf8').split('\n')) {
      const m = r.match(/^- \[(P-\d{6}-\d+)\] .*?· (\S+) ·/);
      if (m) out.push({ tunnus: m[1], aihe: m[2], rivi: r });
    }
  }
  return out;
}

// --- komennot ---
const [komento, ...loput] = argv;
const vaadiAihe = (a) => {
  if (!a) kuolema('aihe puuttuu');
  if (!PERUSTA[a] && !aiheet().some((x) => x.tunnus === a)) kuolema(`HYLÄTTY: aihetta "${a}" ei ole luettelossa (kirjaa aiheet; uusi: kirjaa uusi-aihe)`);
};

if (komento === 'hae') {
  const sanat = loput.join(' ').toLowerCase().split(/\s+/).filter(Boolean);
  if (!sanat.length) kuolema('anna hakusanat');
  const pisteet = {};
  const tulosta = (otsikko, polut) => {
    const rivit = [];
    for (const p of polut) {
      lue(p).split('\n').forEach((r, i) => {
        const l = r.toLowerCase();
        if (sanat.every((s) => l.includes(s))) rivit.push(`  ${relative(JUURI, p)}:${i + 1}  ${r.trim().slice(0, 180)}`);
      });
    }
    console.log(`${otsikko} (${rivit.length})`);
    rivit.slice(0, 15).forEach((r) => console.log(r));
    if (rivit.length > 15) console.log(`  … ${rivit.length - 15} lisää`);
  };
  const kortit = [...Object.keys(PERUSTA).map(korttiPolku), ...aiheet().map((a) => korttiPolku(a.tunnus))].filter(existsSync);
  tulosta('KORTIT JA PERUSTA', kortit);
  const k = join(R, 'paatokset');
  tulosta('PÄÄTÖSLOKI', existsSync(k) ? readdirSync(k).map((f) => join(k, f)) : []);
  for (const a of aiheet()) {
    const t = `${a.tunnus} ${a.nimi} ${lue(korttiPolku(a.tunnus))}`.toLowerCase();
    pisteet[a.tunnus] = sanat.reduce((n, s) => n + t.split(s).length - 1 + (a.tunnus.includes(s) ? 10 : 0), 0);
  }
  const par = Object.entries(pisteet).filter(([, n]) => n > 0).sort((x, y) => y[1] - x[1]).slice(0, 3);
  console.log(par.length ? `AIHE: ${par.map(([a, n]) => `${a} (${n})`).join(', ')} → kirjaa lue ${par[0][0]}` : 'AIHE: ei osumaa → kirjaa aiheet');
} else if (komento === 'aiheet') {
  const luettu = lukuloki();
  for (const a of aiheet()) {
    const t = lue(korttiPolku(a.tunnus));
    const tark = (t.split('\n')[0].match(/tarkistettu (\S+)/) || [])[1] || '–';
    console.log(`${a.tunnus.padEnd(28)} ${a.nimi.padEnd(28)} ${a.vastuu.padEnd(4)} ${t ? (Buffer.byteLength(t) / 1024).toFixed(1) : '–'}/3 kt  luettu ${(luettu[a.tunnus] || '–').slice(0, 10)}  tarkistettu ${tark}`);
  }
  console.log(`aiheita ${aiheet().length}/${AIHEITA_RAJA}`);
} else if (komento === 'lue') {
  const [a] = loput; vaadiAihe(a);
  const t = lue(korttiPolku(a));
  console.log(t || `(kortti ${a} on vielä kirjoittamatta)`);
  mkdirSync(join(LUKULOKI, '..'), { recursive: true });
  appendFileSync(LUKULOKI, `${nyt.toISOString()}\t${a}\t${process.env.KIRJAA_KUKA || '-'}\n`);
} else if (komento === 'paatos') {
  const klo = lippu('--klo'), kuka = lippu('--kuka'), p = lippu('--pvm');
  const [a, ...sanat] = argv.slice(1); vaadiAihe(a);
  if (PERUSTA[a] && a !== 'B') kuolema('päätös kirjataan aiheelle tai B:lle');
  if (!klo || !/^\d{1,2}\.\d{2}x?$/.test(klo)) kuolema('--klo HH.MM puuttuu');
  if (!['KK', 'PT'].includes(kuka)) kuolema('omistajan päätökset kirjaa vain KK tai PT (--kuka KK|PT)');
  if (!sanat.length) kuolema('omistajan sanat puuttuvat');
  const d = p ? new Date(p.split('.').reverse().join('-')) : nyt;
  const vvkkpp = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const n = paatokset().filter((x) => x.tunnus.startsWith(`P-${vvkkpp}-`)).length + 1;
  const tunnus = `P-${vvkkpp}-${n}`;
  mkdirSync(join(R, 'paatokset'), { recursive: true });
  const f = join(R, 'paatokset', `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}.md`);
  if (!existsSync(f)) writeFileSync(f, `# Päätösloki ${d.getMonth() + 1}/${d.getFullYear()} (vain lisätään: node tools/kirjaa.mjs paatos)\n\n`);
  appendFileSync(f, `- [${tunnus}] ${pvm(d)} klo ${klo} · ${a} · kirjasi ${kuka}: "${sanat.join(' ')}"\n`);
  kirjaaRekisteriin([f]);
  console.log(`KIRJATTU ${tunnus} → ${relative(JUURI, f)}`);
  console.log(`PÄIVITÄ KORTTI ${a} SAMASSA VUOROSSA (sääntöön [${tunnus}]); muuten kirjaa tila näyttää punaista.\n`);
  console.log(lue(korttiPolku(a)) || `(kortti ${a} on vielä kirjoittamatta)`);
} else if (komento === 'kortti') {
  const eiCommit = kytkin('--ei-commit');
  const [a, tiedosto] = argv.slice(1); vaadiAihe(a);
  if (!tiedosto || !existsSync(tiedosto)) kuolema('anna kortin tiedosto');
  const teksti = readFileSync(tiedosto, 'utf8');
  const viat = tarkistaKortti(a, teksti);
  if (viat.length) { console.log(`HYLÄTTY ${a}:`); viat.forEach((v) => console.log(`  - ${v}`)); process.exit(1); }
  const p = korttiPolku(a);
  mkdirSync(join(p, '..'), { recursive: true });
  writeFileSync(p, teksti.endsWith('\n') ? teksti : teksti + '\n');
  generoiAiheet();
  const k = join(R, 'paatokset');
  const polut = [p, join(R, 'AIHEET.md'), join(R, '.kirjattu.json'), ...(existsSync(k) ? readdirSync(k).map((x) => join(k, x)) : [])];
  kirjaaRekisteriin([p, join(R, 'AIHEET.md')]);
  console.log(`HYVÄKSYTTY ${a} (${(Buffer.byteLength(teksti) / 1024).toFixed(1)} / ${korttiRaja(a) / 1024} kt)`);
  if (!eiCommit) console.log(`commit ${commit(`Kirjaus: ${a}`, polut)}`);
} else if (komento === 'uusi-aihe') {
  const perustelu = lippu('--perustelu');
  const [tunnus, nimi] = argv.slice(1);
  if (!tunnus || !nimi || !perustelu) kuolema('kirjaa uusi-aihe <tunnus> "<nimi>" --perustelu "…"');
  const f = join(R, 'aihepyynnot.md');
  if (!existsSync(f)) writeFileSync(f, '# Aihepyynnöt (KK hyväksyy: kirjaa hyvaksy-aihe)\n\n');
  appendFileSync(f, `- ${pvm(nyt)} ${tunnus} "${nimi}": ${perustelu}\n`);
  kirjaaRekisteriin([f]);
  console.log(`PYYNTÖ kirjattu (${relative(JUURI, f)}); aiheluettelo on suljettu, KK hyväksyy tai hylkää. Kirjaa siihen asti lähimpään aiheeseen.`);
} else if (komento === 'hyvaksy-aihe') {
  const [tunnus, nimi, vastuu] = loput;
  if (process.env.KIRJAA_KUKA !== 'KK') kuolema('vain KK (KIRJAA_KUKA=KK)');
  const j = luettelo();
  if (j.aiheet.length >= AIHEITA_RAJA) kuolema(`HYLÄTTY: aiheita jo ${AIHEITA_RAJA}; yhdistä ensin`);
  j.aiheet.push([tunnus, nimi, vastuu]);
  writeFileSync(join(R, 'aiheet.json'), JSON.stringify(j, null, 2) + '\n');
  generoiAiheet(); kirjaaRekisteriin([join(R, 'aiheet.json'), join(R, 'AIHEET.md')]);
  console.log(`LISÄTTY ${tunnus}`);
} else if (komento === 'alusta') {
  // kertaluonteinen: rakenteen ensimmäinen rekisteröinti (vain kun .kirjattu.json puuttuu; muuten ovi on jo käytössä)
  if (existsSync(join(R, '.kirjattu.json'))) kuolema('HYLÄTTY: rekisteri on jo olemassa; muutokset vain komennoilla');
  mkdirSync(join(R, 'aiheet'), { recursive: true });
  generoiAiheet();
  kirjaaRekisteriin([...valvotut(), join(R, 'AIHEET.md')]);
  console.log(`ALUSTETTU: ${Object.keys(rekisteri()).length} tiedostoa rekisterissä`);
} else if (komento === 'tila') {
  const json = kytkin('--json');
  const L = [];
  const rivi = (nimi, arvo, raja, pun, lisa = '') => L.push({ nimi, arvo, raja, punainen: !!pun, lisa });
  const yli = [];
  for (const a of [...Object.keys(PERUSTA), ...aiheet().map((x) => x.tunnus)]) {
    const t = lue(korttiPolku(a));
    if (t && Buffer.byteLength(t) > korttiRaja(a)) yli.push(`${a} ${(Buffer.byteLength(t) / 1024).toFixed(1)} kt`);
  }
  rivi('kortit yli rajan', yli.length, 0, yli.length, yli.join(', '));
  let koko = 0;
  for (const p of valvotut()) if (!p.includes('/paatokset/')) koko += statSync(p).size;
  rivi('Raamattu kt (ilman lokia)', +(koko / 1024).toFixed(1), KOKO_RAJA / 1024, koko > KOKO_RAJA);
  let muutokset = 0;
  try { muutokset = git('log', '--since=24.hours', '--format=%h', '--', 'docs/raamattu').split('\n').filter(Boolean).length; } catch { /* ei gitiä */ }
  rivi('muutoksia 24 h', muutokset, null, false);
  const kaikki = korttienVirkkeet(null), parit = [];
  for (let i = 0; i < kaikki.length; i++) for (let j = i + 1; j < kaikki.length; j++)
    if (kaikki[i][0] !== kaikki[j][0] && suhde(kaikki[i][1], kaikki[j][1]) >= SAMA) parit.push(`${kaikki[i][0]}≈${kaikki[j][0]}`);
  rivi('lähes samat virkkeet korttien välillä', parit.length, 0, parit.length, parit.slice(0, 3).join(', '));
  const muisti = lue(MUISTI).split('\n').filter((r) => r.startsWith('- ')).map((r) => r.replace(/\(.*?\.md\)/, '').toLowerCase());
  const mp = [];
  for (const m of muisti) for (const [a, v] of kaikki) if (suhde(m, v) >= SAMA) { mp.push(a); break; }
  rivi('muistissa sama kuin kortissa', mp.length, 0, mp.length, mp.slice(0, 3).join(', '));
  const reg = rekisteri(), ohi = [];
  for (const p of valvotut()) {
    const k = relative(R, p);
    if (!reg[k] || reg[k].sha !== sha(readFileSync(p, 'utf8'))) ohi.push(k);
  }
  rivi('kirjauksia ohi oven', ohi.length, 0, ohi.length, ohi.slice(0, 4).join(', '));
  const luettu = lukuloki(), raja = nyt.getTime() - PAIVAA * 864e5, lukematta = [], vanhat = [];
  for (const a of aiheet()) {
    const p = korttiPolku(a.tunnus);
    if (!existsSync(p)) continue;
    const kirjattu = reg[relative(R, p)] ? Date.parse(reg[relative(R, p)].aika) : nyt.getTime();
    if (kirjattu < raja && !(luettu[a.tunnus] && Date.parse(luettu[a.tunnus]) >= raja)) lukematta.push(a.tunnus);
    const m = lue(p).split('\n')[0].match(/tarkistettu (\d+)\.(\d+)\.(\d{4})/);
    if (m && new Date(+m[3], m[2] - 1, +m[1]).getTime() < raja) vanhat.push(a.tunnus);
  }
  rivi(`kortit lukematta ${PAIVAA} vrk`, lukematta.length, 0, lukematta.length, lukematta.slice(0, 4).join(', '));
  rivi(`kortit tarkistamatta ${PAIVAA} vrk`, vanhat.length, 0, vanhat.length, vanhat.slice(0, 4).join(', '));
  rivi('aiheita', aiheet().length, AIHEITA_RAJA, aiheet().length > AIHEITA_RAJA);
  const ilman = paatokset().filter((x) => !lue(korttiPolku(x.aihe)).includes(`[${x.tunnus}]`)).map((x) => `${x.tunnus} ${x.aihe}`);
  rivi('päätöksiä ilman korttipäivitystä', ilman.length, 0, ilman.length, ilman.slice(0, 3).join(', '));
  const paikka = new Set();
  for (const a of aiheet()) for (const m of lue(korttiPolku(a.tunnus)).matchAll(/\[(P-\d{6}-[a-zäö][a-zäö0-9]*)\]/g)) paikka.add(`${a.tunnus} ${m[1]}`);
  rivi('paikanpitäjätunnuksia (odottaa kirjaa paatos)', paikka.size, null, false, [...paikka].slice(0, 3).join(', '));
  const pyynnot = lue(join(R, 'aihepyynnot.md')).split('\n').filter((r) => r.startsWith('- ')).length;
  rivi('aihepyyntöjä', pyynnot, null, false);
  rivi('rinnakkaiset toteutukset kirjastoluettelon ohi', 'ei v1:ssä', null, false, 'mittari tulee KIRJASTOT.md:n rivien mukana');
  if (json) console.log(JSON.stringify({ punaisia: L.filter((x) => x.punainen).length, rivit: L }));
  else {
    console.log(`KIRJAA TILA: ${L.filter((x) => x.punainen).length} punaista`);
    for (const x of L.sort((a, b) => b.punainen - a.punainen))
      console.log(`${x.punainen ? '🔴' : '·'} ${x.nimi}: ${x.arvo}${x.raja != null ? ` [raja ${x.raja}]` : ''}${x.lisa ? ` – ${x.lisa}` : ''}`);
  }
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('\n').slice(1, 20).join('\n'));
  process.exit(komento ? 2 : 0);
}
