/*
 * LUE_EDISTYS EI SAA KAATUA SULJETTUUN PUTKEEN (Z10-ketju osa 2, 29.9.2026).
 *
 * Havainto 27.9.2026: lokissa 13 × "echo: write error: Broken pipe", vaikka
 * yhtään shardia ei kaatunut — silti ajo päättyi koodiin 1. `tila_vahti`
 * kutsuu `$(lue_edistys …)` taustalla (ks. tools/polta-paikallisesti.sh);
 * kun `kill` osuu juuri tähän kutsuun, lukijan puoli voi hävitä kesken
 * lopun `echo "$tehty $kaikki"`-rivin kirjoituksen. Polttovahdin
 * python-kääre (os.execvp) jättää SIGPIPE:n ohitetuksi peritysti, joten
 * `set -euo pipefail` -tilassa tämä joko (a) tappaa funktion suorittavan
 * alikuoren heti SIGPIPE:hen (jos SIGPIPE ei olekaan ohitettu — esim.
 * eksplisiittisessä putkessa `f | head`) tai (b) saa pelkän `echo`-rivin
 * palauttamaan koodin 1 EPIPE:n takia (jos SIGPIPE ON ohitettu), ja
 * kumpikin nousee `$(lue_edistys …)`-kutsun paluuarvoksi ja sitä kautta
 * mahdollisesti xargs-lapsen koodiksi, vaikka mikään shardi ei kaatunut.
 *
 * Korjaus (tools/polta-paikallisesti.sh, lue_edistys): funktio ohittaa
 * SIGPIPE:n itse (`trap '' PIPE`, koskee vain sen alikuorta) ja lopun
 * echo on suojattu `|| true`:lla, joten katkennut putki ei enää koskaan
 * ole funktion paluuarvo — vaikka SIGPIPE EI olisikaan valmiiksi
 * ohitettu perityn asetuksen kautta (esim. tässä testissä, jossa
 * `lue_edistys` pistetään suoraan putkeen `head -c1`:iin).
 *
 * Testi ei riipu tila_vahdin kill-kilpa-ajosta (satunnainen ja hidas
 * toistaa) vaan toistaa saman EPIPE-mekanismin suoraan: funktio, jonka
 * viimeinen tuloste on isompi kuin lukija ehtii lukea ennen sulkemista.
 */
import test from 'node:test';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const POLTTO = readFileSync(new URL('../tools/polta-paikallisesti.sh', import.meta.url), 'utf8');

/** Skriptin funktio tekstinä (nimi () { … } rivin alusta rivin alun }:iin). */
function funktio(nimi) {
  const m = POLTTO.match(new RegExp(`^${nimi} \\(\\) \\{[\\s\\S]*?^\\}$`, 'm'));
  assert.ok(m, `funktio ${nimi} löytyy`);
  return m[0];
}

function bash(skripti, { ignoroiSigpipe = false } = {}) {
  const alku = ignoroiSigpipe ? "trap '' PIPE\n" : '';
  return spawnSync('bash', ['-c', `${alku}set -euo pipefail\n${skripti}`], {
    encoding: 'utf8',
  });
}

// Riittävän iso tuloste (> putken puskuri) pakottaa `echo`-kirjoituksen
// jäämään kesken, jos lukija (head -c1) on jo sulkenut putken.
const ISO_PARIT = '1000000 2000000'; // pieni pariskunta — koko tulee täytteestä
const ISO_TAYTE = "$(printf 'x%.0s' $(seq 1 1000000))";

test('mekanismi: iso echo joka putkitetaan head -c1:een kaatuu ilman suojausta', () => {
  const vanha = `
    vanha_lue_edistys () {
      local parit="${ISO_PARIT}"
      local tehty="\${parit%% *}" kaikki="\${parit##* }"
      local tayte="${ISO_TAYTE}"
      echo "$tehty $kaikki $tayte"
    }
    vanha_lue_edistys | head -c1 >/dev/null
    echo "jatkui"
  `;
  const r = bash(vanha);
  // Oletusarvoinen SIGPIPE eksplisiittisessä putkessa tappaa alikuoren heti:
  // pipefail nostaa sen koko lausekkeen koodiksi, ja set -e pysäyttää skriptin
  // ennen "jatkui"-riviä.
  assert.notEqual(r.status, 0, r.stderr);
  assert.doesNotMatch(r.stdout, /jatkui/);
});

test('korjattu muoto: trap PIPE + || true selviää samasta putkesta koodilla 0', () => {
  const korjattu = `
    korjattu_lue_edistys () {
      trap '' PIPE
      local parit="${ISO_PARIT}"
      local tehty="\${parit%% *}" kaikki="\${parit##* }"
      local tayte="${ISO_TAYTE}"
      echo "$tehty $kaikki $tayte" || true
    }
    korjattu_lue_edistys | head -c1 >/dev/null
    echo "jatkui"
  `;
  const r = bash(korjattu);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /jatkui/);
});

test('lue_edistys: toimii normaalisti (ei-katkaistu putki, todellinen kutsumuoto)', () => {
  // lue_edistys itse tulostaa aina vain kaksi pientä lukua — liian pieni
  // tuloste EPIPE:n luotettavaan pakottamiseen `head -c1`:llä (yllä olevat
  // kaksi testiä toistavat mekanismin isommalla täytteellä). Tämä testi
  // varmistaa vain, ettei suojaus (trap/`|| true`) ole rikkonut normaalia
  // paluuarvoa — käytetään samaa `$(lue_edistys …)`-kutsumuotoa kuin
  // tools/polta-paikallisesti.sh.
  // Oma tyhjä kansio: CI:n /tmp:ssä on lukukelvottomia alikansioita (systemd-private-*), jolloin
  // find palaa koodilla 1 ja pipefail kaataisi kutsun — polttoskripti antaa aina oman kansionsa.
  const kansio = mkdtempSync(join(tmpdir(), 'edistys-'));
  const r = bash(`${funktio('lue_edistys')}\nlue_edistys "/ei/ole/olemassa" "${kansio}" '*.ei-osu-mihinkaan'`);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), '0 0');
});

test('lue_edistys: sisältää SIGPIPE-suojauksen (trap ja || true lopun echossa)', () => {
  const f = funktio('lue_edistys');
  assert.match(f, /^lue_edistys \(\) \{\n\s*trap '' PIPE\n/,
    'trap \'\' PIPE on funktion ensimmäinen rivi (koskee vain sen alikuorta)');
  assert.match(f, /echo "\$tehty \$kaikki" \|\| true\n\}$/,
    'viimeinen echo on suojattu || true:lla EPIPE:n varalta');
});

test('polta_nostot_ja_pallo: nostotason xargs käyttää tarkista_kesken-vahtia', () => {
  const m = POLTTO.match(/^polta_nostot_ja_pallo \(\) \{[\s\S]*?\n\}$/m);
  assert.ok(m, 'polta_nostot_ja_pallo löytyy');
  const lohko = m[0];
  // Sama vahti kuin pallon ja pääpolton xargs-ajoissa: pelkkä xargsin
  // nollasta poikkeava koodi ei enää riitä kaatamaan ajoa, jos kaikki
  // shardit ovat silti valmiita.
  assert.match(
    lohko,
    /if \[ "\$virhe" -ne 0 \] && ! tarkista_kesken "\$lista" \\\n\s*"VIRHE: nostotason shardi kaatui/,
  );
});
