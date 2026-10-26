/*
 * POLTON LAPSIPROSESSIT JA XARGSIN KOODI 1 (27.9.2026).
 *
 * Syvä Z10 -ajo 26.–27.9. (507 shardia) päättyi "yksi tai useampi
 * shardi kaatui" -virheeseen ja koodiin 1, vaikka kaikki shardit olivat
 * valmiita. Luettelo ja eheystarkistus jäivät ajamatta. Lokissa oli
 * 12 × "echo: write error: Broken pipe" ja kerran "tr: Illegal byte
 * sequence", mutta ei riviäkään siitä, mikä lapsi päättyi millä koodilla.
 *
 *   1. lue_edistys lukee lokin tavuina: `tail -c` katkaisee ä-kirjaimen.
 *   2. tila_vahti ei kirjoita virheitä (kill kesken $(lue_edistys)).
 *   3. Lapsi kirjaa nollasta poikkeavan koodinsa ja vapauttaa paikkansa
 *      aina; epäonnistunut rmdir ei muuta koodia.
 *   4. Isäntä: xargsin koodi ≠ 0, mutta kaikki valmiita → varoitus.
 *
 * SIGPIPE ohitetaan kuten polttovahdin python-kääreessä (`trap '' PIPE`
 * periytyy lapsille), koska juuri se teki Broken pipe -rivit näkyviksi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const POLTTO = readFileSync(join(JUURI, 'tools', 'polta-paikallisesti.sh'), 'utf8');

/** Skriptin funktio tekstinä (nimi () { … } rivin alusta rivin alun }:iin). */
function funktio(nimi) {
  const m = POLTTO.match(new RegExp(`^${nimi} \\(\\) \\{[\\s\\S]*?^\\}$`, 'm'));
  assert.ok(m, `funktio ${nimi} löytyy`);
  return m[0];
}

/** Lapsen lohko: `if [ "$LAPSI" -eq 1 ] …` seuraavaan rivin alun fi:hin. */
function lapsenLohko() {
  const m = POLTTO.match(/^if \[ "\$LAPSI" -eq 1 \] && \[ -n "\$VAIN" \]; then[\s\S]*?^fi$/m);
  assert.ok(m, 'lapsen lohko löytyy');
  return m[0];
}

function bash(skripti, env = {}) {
  return spawnSync('bash', ['-c', `trap '' PIPE\nset -euo pipefail\n${skripti}`], {
    encoding: 'utf8',
    env: { ...process.env, LANG: 'en_US.UTF-8', LC_ALL: '', ...env },
  });
}

test('lue_edistys: kesken katkennut ä ei pysäytä lukua', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'poltto-lapsi-'));
  const loki = join(kansio, 'shardi.log');
  // tail -c 8000 alkaa ä:n toisesta tavusta (ä = 2 tavua UTF-8:na).
  const loppu = '\rlaattoja 7/9 ok\r';
  writeFileSync(loki, `laattoja 3/9 xä${'y'.repeat(7999 - loppu.length)}${loppu}`);
  const r = bash(`${funktio('lue_edistys')}\nlue_edistys "${loki}"`);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stderr, '');
  assert.equal(r.stdout.trim(), '7 9');
});

test('tila_vahti: virheet eivät päädy polton lokiin', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'poltto-lapsi-'));
  const r = bash([
    `ULOS="${kansio}"; TILAVALI=0`,
    'lue_edistys () { echo "vahdin virhe" >&2; echo "1 2"; }',
    'tila_kirjoita () { echo "kirjoitusvirhe" >&2; }',
    funktio('tila_vahti'),
    'tila_vahti s "" 0 1 "" "*.webp" & v=$!',
    'sleep 0.3; kill "$v"; wait "$v" 2>/dev/null || true',
  ].join('\n'));
  assert.equal(r.stderr, '');
});

/** Lapsen lohko stubatuilla funktioilla; palauttaa ajon tuloksen ja paikan. */
function ajaLapsi({ koodi, paikkaTaynna = false }) {
  const kansio = mkdtempSync(join(tmpdir(), 'poltto-lapsi-'));
  const paikka = join(kansio, 'paikat', '1');
  mkdirSync(paikka, { recursive: true });
  if (paikkaTaynna) writeFileSync(join(paikka, '.DS_Store'), '');
  const r = bash([
    'LAPSI=1; VAIN=syva-z10-001; PAIKKA=""',
    `odota_paikka () { PAIKKA="${paikka}"; }`,
    `aja_shardi () { return ${koodi}; }`,
    'aja_pallo_shardi () { return 99; }',
    lapsenLohko(),
    'echo "lohkon ohi" >&2; exit 42',
  ].join('\n'));
  return { r, paikka };
}

test('lapsi: kaatunut shardi kirjaa koodinsa ja vapauttaa paikan', () => {
  const { r, paikka } = ajaLapsi({ koodi: 3 });
  assert.equal(r.status, 3);
  assert.match(r.stderr, /VIRHE: lapsi syva-z10-001 päättyi koodilla 3/);
  assert.equal(existsSync(paikka), false, 'paikka vapautui');
});

test('lapsi: onnistunut shardi on 0, vaikka rmdir epäonnistuu', () => {
  const { r } = ajaLapsi({ koodi: 0, paikkaTaynna: true });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stderr, '');
});

test('isäntä: kaikki valmiita → varoitus ja jatko, muuten lista ja virhe', () => {
  const ulos = mkdtempSync(join(tmpdir(), 'poltto-lapsi-'));
  mkdirSync(join(ulos, 'lokit'));
  const lista = join(ulos, 'lokit', 'ajossa.txt');
  writeFileSync(lista, 'syva-z10-001\nsyva-z10-002\n');
  writeFileSync(join(ulos, 'lokit', 'syva-z10-001.valmis'), '1 1 x\n');
  const funktiot = ['kesken_loki', 'kesken_jaaneet', 'tarkista_kesken'].map(funktio).join('\n');
  const aja = () => bash(`ULOS="${ulos}"\n${funktiot}\n`
    + `if tarkista_kesken "${lista}" "VIRHE: otsikko"; then echo jatka; else echo seis; fi`);

  let r = aja();
  assert.equal(r.stdout.trim(), 'seis');
  assert.match(r.stderr, /VIRHE: otsikko\n {2}syva-z10-002 \(loki .*syva-z10-002\.log\)/);
  assert.doesNotMatch(r.stderr, /syva-z10-001/);

  writeFileSync(join(ulos, 'lokit', 'syva-z10-002.valmis'), '1 1 x\n');
  r = aja();
  assert.equal(r.stdout.trim(), 'jatka');
  assert.match(r.stderr, /VAROITUS: xargs palautti nollasta poikkeavan koodin/);
  assert.match(r.stderr, /2 shardia ovat valmiita/);
});
