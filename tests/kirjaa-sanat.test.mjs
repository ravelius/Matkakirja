// Omistajan pysyvät sanat (kirjaa.mjs pala 1, suunnitelma 20261117-muisti-ilman-uudelleenkertomista.md luvut 4 ja 9):
// sanat --rooli KK tulostaa S-01…S-10 sanatarkasti; muokattu (ei-sanatarkka) sana hylätään kirjoittaessa ja tulosteessa.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const REPO = process.cwd();
const ajo = (juuri, ...a) => spawnSync('node', [join(REPO, 'tools/kirjaa.mjs'), ...a, '--juuri', juuri],
  { encoding: 'utf8', env: { ...process.env, KIRJAA_LUKULOKI: '/dev/null', KIRJAA_MUISTI: '/dev/null' } });

test('sanat --rooli KK: S-01…S-10 sanatarkasti, P-lähteet täsmäävät päätöslokiin', () => {
  const r = ajo(REPO, 'sanat', '--rooli', 'KK');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  const ytimet = r.stdout.split('\n').filter((x) => /^S-\d\d /.test(x)).map((x) => x.slice(0, 4));
  // Ytimiä vain lisätään (S-11 17.11.2026 →): S-01…S-10 alussa järjestyksessä, uudet perässä juoksevin numeroin.
  assert.deepEqual(ytimet.slice(0, 10), ['S-01', 'S-02', 'S-03', 'S-04', 'S-05', 'S-06', 'S-07', 'S-08', 'S-09', 'S-10']);
  ytimet.forEach((y, i) => assert.equal(y, `S-${String(i + 1).padStart(2, '0')}`));
  assert.ok(r.stdout.includes('  "ei koskaan odoteta mittausta vaan lisätään kaikki aina heti peliin ilman mittausta. yöllä vain mitataan paljonko muutokset aiheuttivat kuormaa jne. ja sen jälkeen reagoidaan tarpeen mukaan. mutta aina tehdään muutos ja tuodaan se heti peliin ilman että jäädään odottamaan mittausta. mielestäni sanoin tämän jo aiemminkin"'));
  assert.match(r.stdout, /^S-02 PELIIN ILMAN KOETTA/m);  // S-01 ja S-02 erikseen (KK, luku 11 kohta 1)
  assert.doesNotMatch(r.stdout, /KK:n toimeenpano|→ SÄÄNTÖ|🔴/);
  const aa = ajo(REPO, 'sanat', '--rooli', 'ÄÄ').stdout;  // roolisuodatus: ÄÄ ei saa S-04/S-06/S-08
  assert.match(aa, /^S-07 /m);
  assert.doesNotMatch(aa, /^S-0[468] /m);
});

test('pysyvät sanat väliaikaisessa repossa: --pysyva, --toisto, toimeenpano erikseen, muokattu sana hylätään, pois ja korvaa', () => {
  const T = mkdtempSync(join(tmpdir(), 'kirjaa-sanat-'));
  const g = (...a) => execFileSync('git', ['-C', T, ...a], { encoding: 'utf8' });
  g('init', '-q'); g('config', 'user.email', 'koe@example.invalid'); g('config', 'user.name', 'koe');
  mkdirSync(join(T, 'docs/raamattu'), { recursive: true });
  copyFileSync(join(REPO, 'docs/raamattu/aiheet.json'), join(T, 'docs/raamattu/aiheet.json'));
  const tallenne = join(T, 'tallenne.md');
  writeFileSync(tallenne, '**Omistaja (12.26):**\n\nei koskaan odoteta mittausta vaan lisätään\nkaikki aina heti peliin\n');
  const k = (...a) => ajo(T, ...a);
  const d = new Date(), kk = String(d.getMonth() + 1).padStart(2, '0');
  const P = (n) => `P-${String(d.getFullYear()).slice(2)}${kk}${String(d.getDate()).padStart(2, '0')}-${n}`;
  const pv = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

  let r = k('paatos', 'juna-ja-julkaisu', '--klo', '12.26', '--kuka', 'KK', '--pysyva', 'Mittausta ei odoteta',
    '--roolit', 'kaikki', '--vartija', 'mittausehto-vahti', '--toimeenpano', 'KK: junasana ilman mittausta', '--lahde', tallenne,
    'ei koskaan odoteta mittausta vaan lisätään kaikki aina heti peliin');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /UUSI YDIN S-01/);
  const loki = readFileSync(join(T, `docs/raamattu/paatokset/${d.getFullYear()}-${kk}.md`), 'utf8');
  assert.ok(loki.includes(`- [${P(1)}] ${pv} klo 12.26 · juna-ja-julkaisu · kirjasi KK · PYSYVÄ S-01: "ei koskaan odoteta mittausta vaan lisätään kaikki aina heti peliin" · toimeenpano: "KK: junasana ilman mittausta"`), loki);

  // muokattu sana (yksi sana vaihdettu) hylätään tallennetta vasten
  r = k('paatos', 'juna-ja-julkaisu', '--klo', '13.00', '--kuka', 'KK', '--toisto', 'S-01', '--lahde', tallenne,
    'ei koskaan odoteta mittausta vaan lisätään kaikki aina nopeasti peliin');
  assert.equal(r.status, 2); assert.match(r.stderr, /HYLÄTTY \(ei sanatarkka\)/);
  // toimeenpano omistajan sanoissa hylätään
  r = k('paatos', 'juna-ja-julkaisu', '--klo', '13.00', '--kuka', 'KK', '--toisto', 'S-01', 'ei odoteta [KK 13.01: junaan heti]');
  assert.equal(r.status, 2); assert.match(r.stderr, /toimeenpanoa/);
  // P-lähteestä liitetty muokattu sana hylätään; tarkka kelpaa
  r = k('pysyva-liita', 'S-01', '--lahde', P(1), 'ei koskaan odoteta mittausta vaan lisätään kaikki aina peliin');
  assert.equal(r.status, 2); assert.match(r.stderr, /ei sanatarkka/);
  r = k('pysyva-liita', 'S-01', '--lahde', P(1), 'junasana ilman mittausta');  // toimeenpanon teksti ei ole omistajan sana
  assert.equal(r.status, 2);
  // toisto oikein: kerta ytimeen ja toistolaskuri
  r = k('paatos', 'juna-ja-julkaisu', '--klo', '13.05', '--kuka', 'KK', '--toisto', 'S-01', 'mittausta ei odoteta, sanoin jo');
  assert.equal(r.status, 0, r.stdout + r.stderr); assert.match(r.stdout, /TOISTO S-01 .*kertoja 2, toistoja 1/);
  assert.match(k('sanat', '--toistot', '--viikko').stdout, /TOISTOT 7 vrk: 1/);
  r = k('sanat', '--rooli', 'KK');
  assert.equal(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /S-01 MITTAUSTA EI ODOTETA · sanottu 2 kertaa/);
  assert.doesNotMatch(r.stdout, /junasana ilman mittausta/);  // tuloste näyttää vain omistajan sanat

  // käsin muokattu sana pysyvat.json:ssa hylätään tulosteessa (ja tila näyttää ohi oven)
  const p = join(T, 'docs/raamattu/pysyvat.json'), alkup = readFileSync(p, 'utf8');
  writeFileSync(p, alkup.replace('vaan lisätään kaikki aina heti peliin', 'vaan lisätään kaikki heti peliin'));
  r = k('sanat', '--rooli', 'KK');
  assert.equal(r.status, 1); assert.match(r.stdout, /🔴 HYLÄTTY .*MUOKATTU/); assert.doesNotMatch(r.stdout, /kaikki heti peliin/);
  assert.match(k('tila').stdout, /🔴 kirjauksia ohi oven: .*pysyvat\.json/);
  writeFileSync(p, alkup);

  // korvaus ja poisto vain omistajan sanalla
  assert.equal(k('pysyva-korvaa', 'S-01').status, 2);
  assert.equal(k('pysyva-pois', 'S-01', '--omistajan-sana', P(99)).status, 2);
  k('paatos', 'juna-ja-julkaisu', '--klo', '14.00', '--kuka', 'KK', 'mittaus saa odottaa vain yöllä');
  r = k('pysyva-korvaa', 'S-01', '--omistajan-sana', P(3));
  assert.equal(r.status, 0, r.stdout + r.stderr);
  r = k('sanat');
  assert.ok(r.stdout.includes(`viimeksi ${pv} klo 14.00 [${P(3)}]`) && /\n  "mittaus saa odottaa vain yöllä"\n(?!  aiemmin)/.test(r.stdout), r.stdout);
  assert.match(k('sanat', '--kaikki', 'S-01').stdout, new RegExp(`KORVATTU ${P(3)}`));
  assert.equal(k('pysyva-pois', 'S-01', '--omistajan-sana', P(3)).status, 0);
  assert.match(k('sanat').stdout, /: 0 ydintä/);
  assert.match(k('sanat', '--kaikki', 'S-01').stdout, new RegExp(`POIS: ${P(3)}`));
});
