/*
 * VÄRIAJO EI SAA VAIHTAA POHJAN VERSIOTA (karttauudistus, erä 1c).
 *
 * === MITÄ TÄMÄ VARTIOI, JA MIKSI SE ON KOKO KARTAN KOKOINEN ASIA ====
 *
 * js/pallolaatat.js `lepokerroksenKerrokset` on portti, joka vaatii
 * pallon sarjalta (laatat.json) ja pyramidilta (pyramidi.json) SAMAN
 * version — sekä pohjalta että viiva- ja nostotasolta. Jos ne eroavat,
 * KOKO laattakerros sammuu, ei vain väri: kartta muuttuu sumeaksi
 * Mercator-sarjaksi, ja se näyttää päällä olevalta kartalta. Juuri sen
 * omistaja näki v1650:ssa.
 *
 * Väriajo (`--vari <ISO>`) ei polta yhtään pohja-, nosto-, viiva- tai
 * rantalaattaa. Sillä ei siis ole mitään sanottavaa niiden versioista,
 * ja .github/workflows/generoi-varitaso.yml pohjustaa ajokansion
 * ämpärin omalla luettelolla juuri siksi ("LUETTELO TÄYDENTYY").
 *
 * VASTAKOE ON MITATTU, EI OLETETTU. Actions-ajo 34767567776 (FRA
 * tasoitus, 13.9.2026) generoi 1195 laattaa onnistuneesti ja pysähtyi
 * vasta versioporttiin:
 *
 *     pallon sarja  versio 2026-09-07a · viivat 2026-09-08a-viivat
 *                   · nostot 2026-09-08a-nostot
 *     pyramidi      versio 2026-09-13 · viivataso 2026-09-13
 *                   · nostotaso 2026-09-13 · rantataso 2026-09-07a-ranta
 *     VERSIOPORTTI SAMMUTTAISI KOKO LAATTAKERROKSEN
 *
 * Kolme kenttää neljästä oli vaihtunut ajopäivän päiväykseksi, ja
 * `rantataso` säilyi vain siksi, että väriajon oma luettelo ei rakenna
 * rantataso-oliota lainkaan (`?? vanha.rantataso` osui). Nosto- ja
 * viivataso-oliot sen sijaan syntyvät pelkästä geometriasta myös
 * väriajossa, ja juuritason `versio` tulee `--versio`-valitsimen
 * oletuksesta eli tämän päivän päiväyksestä.
 *
 * Testi ajaa saman kolmen kentän asetelman ja lisäksi portin itsensä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { yhdistaLuettelo } from '../tools/pyramidiluettelo.mjs';

const JUURI = fileURLToPath(new URL('..', import.meta.url));
const GENERAATTORI = join(JUURI, 'tools/generoi-laattapyramidi.mjs');
const PORTTI = join(JUURI, 'tools/tarkista-varitason-portti.mjs');

/* Ämpärin luettelo sellaisena kuin se oli ajossa 34767567776. */
const POHJA = () => ({
  versio: '2026-09-07a',
  lauta: 'maailma',
  laatta: 512,
  muoto: 'webp',
  laatu: 82,
  patina: 'kevyt',
  nimiot: false,
  nostotaso: { versio: '2026-09-08a-nostot', tasot: [4, 5, 6, 7, 8], nostot: {}, laatastot: {} },
  viivataso: { versio: '2026-09-08a-viivat', tasot: [4, 5, 6, 7, 8], rajat: 'eurooppa', laatastot: {} },
  rantataso: { versio: '2026-09-07a-ranta', tasot: [4, 5, 6, 7, 8], laatastot: {} },
  varitasot: { DEU: { versio: 'saksa-koe', maa: 'DEU', tasot: [4, 5] } },
  meriSavy: '#d9cbaa',
  alue: { lon0: -180, lon1: 180, lat0: -60, lat1: 76 },
  pohja: { rantaviiva: false },
  korkeus: { kaariminuutit: { 4: 3, 5: 1 }, aineisto: 'ETOPO1' },
  tasot: [4, 5, 6, 7, 8].map((z) => ({ z, leveys: 100 * z, korkeus: 50 * z, sarakkeita: z, riveja: z })),
  erat: [{ tasot: '0-8', alue: null }],
});

/** Väriajon tuore luettelo oikeasta generaattorista (`--vain-luettelo`). */
function variAjonLuettelo() {
  const kansio = mkdtempSync(join(tmpdir(), 'varitaso-'));
  execFileSync(process.execPath, [
    GENERAATTORI, kansio,
    '--tasot', '4-5',
    '--vari', 'FRA',
    '--variversio', '2026-09-13-tasoitus',
    '--paletti', 'tasoitus',
    '--vain-luettelo',
  ], { stdio: 'pipe' });
  return JSON.parse(readFileSync(join(kansio, 'pyramidi.json'), 'utf8'));
}

const yhdista = (uusi, vanha) => yhdistaLuettelo(uusi, vanha, {
  merkkitaso: true,
  varitaso: true,
  era: { tasot: '4-8', alue: null, varitaso: 'FRA', varipaletti: 'tasoitus' },
});

test('väriajo säilyttää pohjan, viivatason, nostotason ja rantatason versiot', () => {
  const vanha = POHJA();
  const uusi = variAjonLuettelo();
  /* Lähtötilanne: tuore luettelo TODELLA väittää tämän päivän versiota. */
  assert.notEqual(uusi.versio, vanha.versio,
    'testin lähtökohta petti: tuoreen luettelon versio on jo sama kuin pohjan');

  const tulos = yhdista(uusi, vanha);

  assert.equal(tulos.versio, '2026-09-07a',
    'pohjan versio vaihtui — versioportti sammuttaisi koko laattakerroksen');
  assert.equal(tulos.viivataso.versio, '2026-09-08a-viivat', 'viivatason versio vaihtui');
  assert.equal(tulos.nostotaso.versio, '2026-09-08a-nostot', 'nostotason versio vaihtui');
  assert.equal(tulos.rantataso.versio, '2026-09-07a-ranta', 'rantatason versio vaihtui');
  assert.ok(tulos.varitasot?.FRA?.tasot?.length, 'varitasot.FRA puuttuu — väri ei näkyisi');
  assert.equal(tulos.varitasot.FRA.paletti, 'tasoitus');
  assert.ok(tulos.varitasot.DEU, 'toisen maan kirjaus katosi');
});

test('väriajo ei kirjoita pohjan muita kenttiä', () => {
  const vanha = POHJA();
  const tulos = yhdista(variAjonLuettelo(), vanha);
  for (const avain of ['tasot', 'korkeus', 'meriSavy', 'alue', 'pohja', 'lauta', 'laatu', 'patina', 'nimiot']) {
    assert.deepEqual(tulos[avain], vanha[avain], `väriajo muutti pohjan kenttää \`${avain}\``);
  }
  /* Vain varitasot ja eräkirjanpito saavat muuttua. */
  const muuttuneet = [...new Set([...Object.keys(vanha), ...Object.keys(tulos)])]
    .filter((k) => JSON.stringify(vanha[k]) !== JSON.stringify(tulos[k]));
  assert.deepEqual(muuttuneet.sort(), ['erat', 'varitasot']);
  assert.equal(tulos.erat.length, vanha.erat.length + 1, 'eräkirjaus jäi tekemättä');
});

test('versioportti aukeaa yhdistetyllä luettelolla', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'portti-'));
  const pallo = join(kansio, 'laatat.json');
  const pyramidi = join(kansio, 'pyramidi.json');
  writeFileSync(pallo, JSON.stringify({
    versio: '2026-09-07a',
    viivat: '2026-09-08a-viivat',
    nostot: '2026-09-08a-nostot',
    ranta: '2026-09-07a-ranta',
  }));
  writeFileSync(pyramidi, JSON.stringify(yhdista(variAjonLuettelo(), POHJA())));
  const tuloste = execFileSync(process.execPath, [
    PORTTI, '--pallo', pallo, '--pyramidi', pyramidi, '--maa', 'FRA',
  ], { encoding: 'utf8' });
  assert.match(tuloste, /"vari":true/, `portti ei avannut väriä:\n${tuloste}`);
  assert.match(tuloste, /väritaso näkyy/);
});
