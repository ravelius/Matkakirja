/*
 * IHMISEN MATKAN ÄÄNIMAISEMAT — lista, kytkentä ja soittimen lupaukset.
 *
 * Omistajan tilaus 7.9.2026 ilta (Raamattu: LINSSIEN AIDOT
 * AANIMAISEMAT), sanatarkasti: *"olisi todella makeaa, jos saataisiin
 * myös joitain ääniefektejä, siis aitoja, jossain nauhoitettuja, missä
 * voisi olla eri paikkojen äänimaisemaa."*
 *
 * Neljä asiaa, joita ei huomaisi ennen kuin joku ihmettelee hiljaisuutta
 * — tai kuulee musiikkia siellä, missä pitäisi olla tuulta:
 *
 *  1. KYTKENTÄ MOLEMPIIN SUUNTIIN. Kertomuksen jokainen `maisema`-arvo
 *     on listassa, ja listan jokainen tunnus on jonkin jakson käytössä.
 *     Ämpäriin viety ääni, jota kukaan ei pyydä, on hukkaan mennyt ajo;
 *     jakso, joka pyytää tuntematonta tunnusta, on hiljainen jakso.
 *  2. LISENSSIRAJAUS. CC0 ensin, CC BY toisena, ei mitään muuta.
 *  3. EI MUSIIKKIA EIKÄ PUHETTA. Omistaja tilasi nauhoitettuja paikkoja,
 *     ja Freesoundin haku "ocean waves ambience" palauttaa myös
 *     meditaatiomusiikkia. Rajaus tehdään palvelimen puolella.
 *  4. TAUSTAÄÄNEN MITAT. 30–120 s ja −30 LUFS — ei iskun mittoja.
 *     Sama tarkistus estää listan luisumisen tehostelistaksi.
 *
 * Testi EI tuo js/linssit/ihmisen-matka-aanimaisema.js:ää: se
 * rekisteröityy äänipolkuun jo latautuessaan (lisaaVaistaja,
 * lisaaTaustaVaimennus) ja vetäisi mukanaan koko js/sound.js:n. Soitin
 * luetaan siksi lähdetekstinä, kuten pulun tehosteiden testissä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  hakusuodatin, lisenssisuodatin, listanKansiot, lueTehostelista, MAISEMALISTA,
  tarkistaTehostelista,
} from '../tools/tehostelista.mjs';
import { IHMISEN_MATKA_KERTOMUS } from '../js/linssit/ihmisen-matka-kertomus.js';

const LISTA = lueTehostelista(MAISEMALISTA);
const lue = (polku) => readFileSync(new URL(polku, import.meta.url), 'utf8');
const SOITIN = lue('../js/linssit/ihmisen-matka-aanimaisema.js');
const HAKU = lue('../tools/hae-freesound.mjs');
const TYONKULKU = lue('../.github/workflows/aanihaku.yml');
const SW = lue('../sw.js');

test('maisemalista kelpaa muodoltaan ja on taustaääntä eikä iskuja', () => {
  assert.deepEqual(tarkistaTehostelista(JSON.parse(readFileSync(MAISEMALISTA, 'utf8'))), []);
  assert.equal(LISTA.amparinKansio, 'aanet/tehosteet/ihmisen-matka');
  assert.equal(LISTA.manifesti, 'manifesti.json');
  // −30 LUFS: kertojan alla, ei pulun tehosteiden −14 LUFS.
  assert.equal(LISTA.tavoiteLufs, -30);
  // Hiljaisuuden leikkaus söisi tuulen hiljaisimman kohdan.
  assert.equal(LISTA.leikkaaHiljaisuus, false);
  for (const t of LISTA.tehosteet) {
    assert.equal(t.kestoMin, 30, `${t.tunnus}: silmukka lyhenisi kuuluvaksi kierrokseksi`);
    assert.equal(t.kestoMax, 120, `${t.tunnus}: yli kahden minuutin lataus on turha`);
    assert.equal(t.peliavain, `maisema.${t.tunnus}`);
  }
  // Levykansio on media/-puolella, joka on .gitignoressa — ei repoon.
  assert.match(listanKansiot(LISTA).kohdekansio, /^media\//);
  assert.match(listanKansiot(LISTA).raakakansio, /^media\//);
});

test('hakusanat ovat englanniksi ja niitä on kolme per tyyppi', () => {
  for (const t of LISTA.tehosteet) {
    assert.ok(t.hakusanat.length >= 3,
      `${t.tunnus}: vähintään kolme hakua, jottei yksi huono muotoilu kaada tunnusta`);
    for (const sanat of t.hakusanat) {
      assert.match(sanat, /^[a-z0-9 '-]+$/,
        `${t.tunnus}: hakusanan "${sanat}" pitää olla englantia pienaakkosin`);
    }
  }
});

test('rajaus: vain CC0 ja CC BY, ei musiikkia eikä puhetta', () => {
  for (const t of LISTA.tehosteet) {
    assert.equal(lisenssisuodatin(t), 'license:("Creative Commons 0" OR "Attribution")',
      `${t.tunnus}: lisenssisuodatin ei ole odotettu`);
    const suodatin = hakusuodatin(t);
    assert.ok(!/Noncommercial|Sampling/.test(suodatin));
    assert.match(suodatin, /duration:\[30 TO 120\]/);
    assert.match(suodatin, /-tag:music/, `${t.tunnus}: musiikki ei ole äänimaisema`);
    assert.match(suodatin, /-tag:speech/, `${t.tunnus}: puhe ei ole äänimaisema`);
  }
});

test('kertomuksen jokaisella jaksolla on maisematyyppi, avaus on hiljainen', () => {
  const tunnukset = new Set(LISTA.tehosteet.map((t) => t.tunnus));
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    assert.ok('maisema' in jakso, `jakso ${jakso.id}: maisema-kenttä puuttuu kokonaan`);
    if (jakso.maisema === null) continue;
    assert.ok(tunnukset.has(jakso.maisema),
      `jakso ${jakso.id}: maisema "${jakso.maisema}" ei ole `
      + 'tools/tehosteet/ihmisen-matka-maisemat.json:ssa — jakso jäisi hiljaiseksi');
  }
  // Musta ruutu, vain kertojan ääni (Raamattu: IHMISEN MATKA ALKAA
  // MUSTASTA RUUDUSTA). Hiljaisuus on tässä valinta eikä puute.
  const avaus = IHMISEN_MATKA_KERTOMUS.find((j) => j.id === 'avaus');
  assert.equal(avaus.maisema, null);
});

test('jokainen listan tunnus on jonkin jakson käytössä', () => {
  const kaytossa = new Set(IHMISEN_MATKA_KERTOMUS.map((j) => j.maisema).filter(Boolean));
  const turhat = LISTA.tehosteet.map((t) => t.tunnus).filter((t) => !kaytossa.has(t));
  assert.deepEqual(turhat, [],
    'nämä tunnukset haettaisiin ämpäriin, mutta yksikään jakso ei pyydä niitä');
});

test('soitin tarjoaa esitysmoottorille kaksi käskyä', () => {
  assert.match(SOITIN, /export function asetaAanimaisema\(tyyppi\)/);
  assert.match(SOITIN, /export function lopetaAanimaisema\(\)/);
  // Osoite luetaan manifestista, ei kovakoodata: huonon osuman
  // vaihtaminen vaihtaa tiedoston, tekijän ja lisenssin.
  assert.match(SOITIN, /aanet\/tehosteet\/ihmisen-matka\//);
  assert.match(SOITIN, /manifesti\.json/);
  for (const tunnus of LISTA.tehosteet.map((t) => t.tunnus)) {
    assert.ok(!SOITIN.includes(`${tunnus}.mp3`),
      `soitin kovakoodaa tiedoston ${tunnus}.mp3 — polun pitää tulla manifestista`);
  }
});

test('soitin ristihäivyttää 2–3 s ja kunnioittaa pelin hiljennyksiä', () => {
  const risti = Number(SOITIN.match(/const RISTI_MS = (\d+);/)?.[1]);
  assert.ok(risti >= 2000 && risti <= 3000,
    `ristihäivytys ${risti} ms ei ole omistajan pyytämällä välillä 2–3 s`);
  // Väistö (kertoja, pöllö, lukunäkymä), taustalle mennyt peli ja
  // äänivalikon mykistys — kolme eri hiljennystä, kolme rekisteröintiä.
  assert.match(SOITIN, /lisaaVaistaja\(/);
  assert.match(SOITIN, /lisaaTaustaVaimennus\(/);
  assert.match(SOITIN, /AANIVALINTA_TAPAHTUMA/);
  assert.match(SOITIN, /sfx\.enabled/);
  // Linssin oma hiljennys ei saa vaimentaa linssin omaa maisemaa.
  assert.match(SOITIN, /LINSSIN_HILJENNYS/);
  // Kehittäjän säädin koskee taustaa, ei musiikkia: maisema on taustaa.
  assert.match(SOITIN, /kehittajanKerroin\('tausta'\)/);
});

test('soitin ja kertomus ovat palvelutyöntekijän kuoressa', () => {
  for (const polku of [
    './js/linssit/ihmisen-matka-aanimaisema.js',
    './js/linssit/ihmisen-matka-kertomus.js',
  ]) {
    assert.ok(SW.includes(`'${polku}'`), `${polku} puuttuu sw.js:n SHELListä — offline hajoaisi`);
  }
});

test('hakutyökalu ja työnkulku osaavat ajaa maisemalistan', () => {
  assert.match(HAKU, /--maisemat/);
  assert.match(HAKU, /MAISEMALISTA/);
  // Levykansiot johdetaan listasta: ei kahta kovakoodattua vakioparia.
  assert.match(HAKU, /listanKansiot\(lista\)/);
  // Media ei mene repoon.
  assert.match(HAKU, /vaadiGitignore/);
  assert.match(TYONKULKU, /ihmisen-matka-maisemat/);
});
