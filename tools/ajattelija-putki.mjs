/*
 * AJATTELIJAPUTKI YHDELLÄ KOMENNOLLA (Päätoimittaja 3.10.2026; omistaja 19.00: "Ei webiä lainkaan" — ajattelijat suoraan
 * natiiviin). Uusi ajattelija (esim. Platon) syntyy ilman käsityötä, kun syötteet ovat paikoillaan:
 *
 *   node tools/ajattelija-putki.mjs <tunnus> [--natiivi <proto/…/Resources/Ajattelijat>] [--pvm VVVVKKPP] [--tarkista]
 *
 * VAIHEET
 *   1. Syötteiden tarkistus. Puuttuvat listataan roolin mukaan (kuka toimittaa mitä), eikä mitään arvata; ajo pysähtyy.
 *   2. Ääniraita: tools/ajattelija-aaniraita.mjs --v12 (kertoja Linnanrakentajan lukujen kertoja_alkaa_s:stä, efektit
 *      lukujen v13.efektit-ajoista, oma musiikki koko pituudeltaan, vaimennus putki.vaimennusDb puheen alla).
 *   3. Syke: tools/ajattelija-syke.py musiikkiraidasta (kaiun voima 1 ± 0,15).
 *   4. Natiivi (vain --natiivi): tools/ajattelija-natiivi.mjs → <tunnus>.json ja <tunnus>-atlas.bytes; aikajana
 *      generoidaan siellä Linnanrakentajan luvuista (data/ajattelijat/<tunnus>.json aikajana.luvut).
 *   5. Vientipaketti: _valmiit/ajattelijat-vienti-<pvm>-<tunnus>/ (polut datan aikajana.aani/syke-kentistä, kaiut
 *      lukujen kaiku-kansioon), LAHTEET.md syötteistä ja SHA256SUMS; Julkaisijan vie-paketti.sh --kuiva, jos saatavilla.
 *      Ämpärissä jo olevat samannimiset tiedostot jätetään pois (ämpäri on muuttumaton), kun AMPARI ja PAATE ovat ympäristössä
 *      (`source ~/.zshrc`); muuten tarkistus ohitetaan ja siitä kerrotaan.
 *
 * SYÖTTEET (kuka toimittaa)
 *   data/ajattelijat/<tunnus>.json          Päätoimittaja ja Sisältökirjuri (lainaukset, elämä, kysymykset), Linnanrakentaja
 *                                           (malli, kartta, kipsi, otokset, prologi, taustavirran projektorit); aikajana.luvut
 *                                           osoittaa Linnanrakentajan luvut (git-versio:tiedosto). Mallina sokrates.json.
 *   data/ajattelijat/putki/<tunnus>.json    tämän putken syötteet: kertoja {tiedosto, ajat}, musiikki {tiedosto},
 *                                           efektit {kansio}, valinnainen kaiut {kansio}, vaimennusDb; polut lähdejuuresta
 *                                           (AJATTELIJA_LAHTEET, oletus /Users/Shared/Claude/proto-3d/_lahteet).
 *   Linnanrakentajan luvut                  <tunnus>-luvut-v14.json (kamera, valot, lainaukset, kaiut, efektit, kertojan alku).
 *   Kertoja (Sisältökirjuri)                William-otto mp3 + ajat.json (yksi otto, Raamattu).
 *   Musiikki (Linssiseppä)                  oma sävellys iskuineen lukujen intro-aikoihin.
 *   Kaikukuvat (Codex / Sisältökirjuri)     lukujen v13.kaiut[].kuva-nimillä putki.kaiut.kansiossa (tai jo ämpärissä).
 *   Fontit                                  FONTIT-kansio (OFL), ks. tools/ajattelija-natiivi.mjs.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, copyFileSync, readdirSync } from 'node:fs';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';

const JUURI = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const A = process.argv.slice(2);
const arvo = (lippu) => (A.includes(lippu) ? A[A.indexOf(lippu) + 1] : null);
const TUNNUS = A.find((x, i) => !x.startsWith('--') && !['--natiivi', '--pvm'].includes(A[i - 1]));
if (!TUNNUS) { console.error('käyttö: node tools/ajattelija-putki.mjs <tunnus> [--natiivi <kansio>] [--pvm VVVVKKPP] [--tarkista]'); process.exit(2); }
const LAHTEET = process.env.AJATTELIJA_LAHTEET ?? '/Users/Shared/Claude/proto-3d/_lahteet';
const VALMIIT = process.env.AJATTELIJA_VALMIIT ?? '/Users/Shared/Claude/proto-3d/_valmiit';
const PVM = arvo('--pvm') ?? new Date().toISOString().slice(0, 10).replace(/-/g, '');
const NATIIVI = arvo('--natiivi');

// ── 1. syötteet ─────────────────────────────────────────────────────────────────────────────────────────────────────
const puuttuu = [];   // [rooli, mitä]
const lue = (p) => JSON.parse(readFileSync(p, 'utf8'));
const dataPolku = join(JUURI, 'data/ajattelijat', `${TUNNUS}.json`);
const putkiPolku = join(JUURI, 'data/ajattelijat/putki', `${TUNNUS}.json`);
const data = existsSync(dataPolku) ? lue(dataPolku) : null;
const putki = existsSync(putkiPolku) ? lue(putkiPolku) : null;
if (!data) puuttuu.push(['Päätoimittaja / Sisältökirjuri / Linnanrakentaja', `sisältö ${dataPolku} (mallina data/ajattelijat/sokrates.json)`]);
if (!putki) {
  puuttuu.push(['Pelikoodari', `putken syötteet ${putkiPolku} (mallina data/ajattelijat/putki/sokrates.json)`]);
  // Putken syötetiedosto kokoaa nämä; listataan heti, jotta jokainen rooli näkee osuutensa jo ennen tiedostoa.
  puuttuu.push(['Sisältökirjuri', 'kertojan William-otto (mp3) ja ajat.json lähdejuureen']);
  puuttuu.push(['Linssiseppä', 'oma musiikki (mp3) iskuineen lukujen intro-aikoihin']);
  puuttuu.push(['Codex / Sisältökirjuri', 'kaikukuvat lukujen v13.kaiut[].kuva-nimillä']);
}
if (!data) puuttuu.push(['Linnanrakentaja', `luvut ${TUNNUS}-luvut-v14.json (kamera, valot, lainaukset, kaiut, efektit, kertojan alku)`]);

let luvut = null;
const L = data?.aikajana?.luvut;
if (data && !L) puuttuu.push(['Linnanrakentaja', `${TUNNUS}.json: aikajana.luvut (versio, tiedosto, kaiut, savu)`]);
if (L) {
  try {
    luvut = JSON.parse(execFileSync('git', ['show', `${L.versio}:${L.tiedosto}`], { cwd: JUURI, encoding: 'utf8', maxBuffer: 64 << 20, stdio: ['ignore', 'pipe', 'ignore'] }));
  } catch {
    puuttuu.push(['Linnanrakentaja', `luvut ${L.versio}:${L.tiedosto} (git fetch origin ${L.haara ?? ''})`]);
  }
}
const v = luvut?.v13;
if (luvut && !(v?.kertoja_alkaa_s > 0)) puuttuu.push(['Linnanrakentaja', 'luvut: v13.kertoja_alkaa_s']);
const lahde = (p) => join(LAHTEET, p);
const vaadi = (ehto, rooli, mita) => { if (!ehto) puuttuu.push([rooli, mita]); };
if (putki) {
  vaadi(putki.kertoja?.tiedosto && existsSync(lahde(putki.kertoja.tiedosto)), putki.kertoja?.toimittaa ?? 'Sisältökirjuri',
    `kertojan otto ${putki.kertoja?.tiedosto ?? '(putki.kertoja.tiedosto)'}`);
  vaadi(putki.kertoja?.ajat && existsSync(lahde(putki.kertoja.ajat)), putki.kertoja?.toimittaa ?? 'Sisältökirjuri',
    `kertojan ajat ${putki.kertoja?.ajat ?? '(putki.kertoja.ajat)'}`);
  vaadi(putki.musiikki?.tiedosto && existsSync(lahde(putki.musiikki.tiedosto)), putki.musiikki?.toimittaa ?? 'Linssiseppä',
    `musiikki ${putki.musiikki?.tiedosto ?? '(putki.musiikki.tiedosto)'}`);
  vaadi(Number.isFinite(putki.vaimennusDb), 'Päätoimittaja', 'putki.vaimennusDb (musiikin vaimennus puheen alla, dB)');
  for (const e of v?.efektit ?? []) {
    vaadi(putki.efektit?.kansio && existsSync(lahde(join(putki.efektit.kansio, `${e.efekti}.mp3`))), putki.efektit?.toimittaa ?? 'Linnanrakentaja',
      `efekti ${join(putki.efektit?.kansio ?? '(putki.efektit.kansio)', `${e.efekti}.mp3`)}`);
  }
}
if (data) {
  vaadi(data.aikajana?.aani?.puhe && data.aikajana?.aani?.musiikki && data.aikajana?.syke, 'Pelikoodari',
    `${TUNNUS}.json: aikajana.aani.puhe, aikajana.aani.musiikki ja aikajana.syke (ämpäripolut)`);
  for (const k of ['tunnus', 'nimi', 'paalauseet', 'taustavirta', 'fontit', 'prologi', 'malli']) vaadi(data[k], 'Päätoimittaja', `${TUNNUS}.json: ${k}`);
}

// Ämpäri: mitkä kohteet ovat jo siellä (muuttumaton; samannimistä ei viedä uudelleen).
const AMPARI = process.env.AMPARI, PAATE = process.env.PAATE;
const ampariListat = new Map();
function ampariSisaltaa(avain) {
  if (!AMPARI || !PAATE) return null;
  const kansio = `${dirname(avain)}/`;
  if (!ampariListat.has(kansio)) {
    const r = spawnSync('aws', ['s3', 'ls', `s3://${AMPARI}/${kansio}`, '--endpoint-url', PAATE], { encoding: 'utf8' });
    ampariListat.set(kansio, new Set((r.stdout ?? '').split('\n').map((x) => x.trim().split(/\s+/).at(-1)).filter(Boolean)));
  }
  return ampariListat.get(kansio).has(basename(avain));
}

// Kaikukuvat: ämpärissä tai putken kaikukansiossa.
const kaiut = (v?.kaiut ?? []).map((k) => ({ avain: `${L.kaiut}/${k.kuva}`, kuva: k.kuva }));
for (const k of kaiut) {
  const amparissa = ampariSisaltaa(k.avain);
  const paikallinen = putki?.kaiut?.kansio && existsSync(lahde(join(putki.kaiut.kansio, k.kuva)));
  if (amparissa === false && !paikallinen) puuttuu.push([putki?.kaiut?.toimittaa ?? 'Codex / Sisältökirjuri', `kaikukuva ${k.kuva} (putki.kaiut.kansio tai ämpäri ${k.avain})`]);
  if (amparissa === null && !paikallinen) puuttuu.push([putki?.kaiut?.toimittaa ?? 'Codex / Sisältökirjuri', `kaikukuva ${k.kuva}: ei paikallisena (ämpäritarkistus ohitettu, AMPARI/PAATE puuttuu)`]);
}

if (puuttuu.length) {
  console.error(`\n${TUNNUS}: PUUTTUVAT SYÖTTEET (${puuttuu.length}) — putki pysähtyy, mitään ei arvata:`);
  const roolit = [...new Set(puuttuu.map(([r]) => r))];
  for (const r of roolit) {
    console.error(`  ${r}:`);
    for (const [, mita] of puuttuu.filter(([rr]) => rr === r)) console.error(`    - ${mita}`);
  }
  process.exit(1);
}
console.log(`${TUNNUS}: syötteet kunnossa (luvut ${L.versio}, kertoja ${v.kertoja_alkaa_s} s, ${v.efektit.length} efektiä, ${kaiut.length} kaikua).`);
if (A.includes('--tarkista')) process.exit(0);

// ── 2–3. ääniraita ja syke ───────────────────────────────────────────────────────────────────────────────────────────
const TYO = join(tmpdir(), `ajattelija-putki-${TUNNUS}-${process.pid}`);
rmSync(TYO, { recursive: true, force: true });
mkdirSync(TYO, { recursive: true });
const musiikki = lahde(putki.musiikki.tiedosto);
const kesto = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', musiikki]).toString().trim();
const efektit = join(TYO, 'efektit.json');
writeFileSync(efektit, JSON.stringify(v.efektit.map((e) => [lahde(join(putki.efektit.kansio, `${e.efekti}.mp3`)), e.s, 0])));
execFileSync('node', [join(JUURI, 'tools/ajattelija-aaniraita.mjs'), '--ajattelija', TUNNUS, '--ulos', TYO, '--v12', '--kesto', kesto,
  '--puhe', lahde(putki.kertoja.tiedosto), '--puhe-alku', String(v.kertoja_alkaa_s), '--musiikki', musiikki,
  '--vaimennus-db', String(putki.vaimennusDb), '--efektit', efektit], { stdio: 'inherit' });
const syke = join(TYO, 'syke.json');
execFileSync('python3', [join(JUURI, 'tools/ajattelija-syke.py'), join(TYO, 'v12-musiikki.mp3'), '0', kesto, syke], { stdio: 'inherit' });

// ── 4. natiivi ───────────────────────────────────────────────────────────────────────────────────────────────────────
if (NATIIVI) execFileSync('node', [join(JUURI, 'tools/ajattelija-natiivi.mjs'), '--ulos', NATIIVI, TUNNUS], { stdio: 'inherit', cwd: JUURI });

// ── 5. vientipaketti ─────────────────────────────────────────────────────────────────────────────────────────────────
const PAKETTI = join(VALMIIT, `ajattelijat-vienti-${PVM}-${TUNNUS}`);
rmSync(PAKETTI, { recursive: true, force: true });
const tiedostot = [   // [ämpäriavain, lähde, LAHTEET-rivi]
  [data.aikajana.aani.puhe, join(TYO, 'v12-puhe.mp3'), `${putki.kertoja.lahde ?? 'Kertoja'} ${v.kertoja_alkaa_s} s:sta + efektit (${putki.efektit.lahde ?? putki.efektit.kansio})`, `${putki.kertoja.lisenssi ?? 'oma'}; efektit ${putki.efektit.lisenssi ?? ''}`],
  [data.aikajana.aani.musiikki, join(TYO, 'v12-musiikki.mp3'), `${putki.musiikki.lahde ?? putki.musiikki.tiedosto}, vaimennus ${putki.vaimennusDb} dB puheen alla`, putki.musiikki.lisenssi ?? 'oma'],
  [data.aikajana.syke, syke, 'Kaiun syke musiikkiraidan verhokäyrästä (tools/ajattelija-syke.py)', 'oma'],
  ...kaiut.filter((k) => putki.kaiut?.kansio && existsSync(lahde(join(putki.kaiut.kansio, k.kuva))))
    .map((k) => [k.avain, lahde(join(putki.kaiut.kansio, k.kuva)), `Kaikukuva ${k.kuva}: ${putki.kaiut.lahde ?? putki.kaiut.kansio}`, putki.kaiut.lisenssi ?? '']),
];
const viedaan = [], ohitetaan = [];
for (const t of tiedostot) (ampariSisaltaa(t[0]) ? ohitetaan : viedaan).push(t);
for (const [avain, mista] of viedaan) {
  mkdirSync(join(PAKETTI, dirname(avain)), { recursive: true });
  copyFileSync(mista, join(PAKETTI, avain));
}
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
if (viedaan.length) {
  writeFileSync(join(PAKETTI, 'LAHTEET.md'), `# ${data.nimi}: ajattelijan aineistot (tools/ajattelija-putki.mjs, ${PVM})\n\n`
    + `Luvut: ${L.haara ?? ''} ${L.versio} ${L.tiedosto}. Lähdejuuri: ${LAHTEET}.\n\n`
    + '| Tiedosto | Lähde | Lisenssi |\n|---|---|---|\n'
    + viedaan.map(([avain, , lahdeRivi, lisenssi]) => `| ${avain} | ${lahdeRivi} | ${lisenssi} |`).join('\n') + '\n');
  writeFileSync(join(PAKETTI, 'SHA256SUMS'), viedaan.map(([avain]) => `${sha(join(PAKETTI, avain))}  ${avain}`).sort((a, b) => a.slice(66).localeCompare(b.slice(66))).join('\n') + '\n');
}
console.log(`\nVientipaketti: ${viedaan.length ? PAKETTI : '(ei vietävää)'}`);
for (const [avain, mista] of viedaan) console.log(`  vie  ${avain}  sha256 ${sha(mista).slice(0, 16)}`);
for (const [avain, mista] of ohitetaan) console.log(`  ämpärissä jo  ${avain}  (paikallinen sha256 ${sha(mista).slice(0, 16)})`);
if (!AMPARI || !PAATE) console.log('  Huom: ämpäritarkistus ohitettu (AMPARI/PAATE puuttuu: source ~/.zshrc).');
const VIE = '/Users/Shared/Claude/julkaisija-tyokalut/vie-paketti.sh';
if (viedaan.length && existsSync(VIE)) spawnSync(VIE, ['--kuiva', PAKETTI], { stdio: 'inherit' });
rmSync(TYO, { recursive: true, force: true });
