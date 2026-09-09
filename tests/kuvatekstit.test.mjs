/*
 * LYHYT SIVULLA, PITKÄ AVATUSSA KUVASSA — koko pelin yhteinen sääntö.
 *
 * Omistaja 9.9.2026 (Raamattu, "LYHYT KUVATEKSTI SIVULLA, PITKA VASTA
 * AVATUSSA KUVASSA"): sivulla, kortilla ja kartan päällä näkyy lyhyt
 * kuvateksti; pitkä versio ja lähderivi näkyvät vasta kun kuvan avaa
 * suurennokseksi. Sääntö on js/kuvatekstit.js:ssä ja tämä testi vartioi,
 * että piirtopaikat kysyvät sitä sieltä eivätkä lue kenttää suoraan.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { kuvatekstiLyhyt, kuvatekstiPitka } from '../js/kuvatekstit.js';
import { lyhytKuvateksti } from '../js/tiedeliite.js';
import {
  etsiPuuttuvat, heittomerkkijono, jasennaOliot, lueLiteraali, tarkistaLyhyt,
} from '../tools/kuvatekstit-lyhyet.mjs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');
const TYOKALU = new URL('../tools/kuvatekstit-lyhyet.mjs', import.meta.url).pathname;

/* ==================== APURI ==================== */

test('lyhyt on sivun teksti: lyhyt voittaa, muuten entinen kenttä', () => {
  assert.equal(kuvatekstiLyhyt({ lyhyt: 'L.', selite: 'Pitkä.' }), 'L.');
  assert.equal(kuvatekstiLyhyt({ lyhyt: 'L.', kuvateksti: 'Pitkä.' }), 'L.');
  assert.equal(kuvatekstiLyhyt({ selite: 'Pitkä.' }), 'Pitkä.',
    'ilman lyhyttä sivulla on entinen selite — valmiiksi lyhyt kelpaa sellaisenaan');
  assert.equal(kuvatekstiLyhyt({ kuvateksti: 'Pitkä.' }), 'Pitkä.');
  assert.equal(kuvatekstiLyhyt({ selite: 'S.', kuvateksti: 'K.' }), 'S.',
    'selite on ensisijainen nimi, kuvateksti sen vanha kaksonen');
});

test('pitkä on avatun kuvan teksti: selite tai kuvateksti, lyhyt vasta varana', () => {
  assert.equal(kuvatekstiPitka({ lyhyt: 'L.', selite: 'Pitkä.' }), 'Pitkä.');
  assert.equal(kuvatekstiPitka({ lyhyt: 'L.', kuvateksti: 'Pitkä.' }), 'Pitkä.');
  assert.equal(kuvatekstiPitka({ lyhyt: 'L.' }), 'L.',
    'pelkkä lyhyt on parempi suurennos kuin tyhjä');
  assert.equal(kuvatekstiPitka({ selite: 'S.', kuvateksti: 'K.' }), 'S.');
});

test('puuttuva kuva ei kaada piirtopaikkaa', () => {
  for (const tyhja of [null, undefined, {}]) {
    assert.equal(kuvatekstiLyhyt(tyhja), '');
    assert.equal(kuvatekstiPitka(tyhja), '');
  }
});

/* ==================== PIIRTOPAIKAT ==================== */

/*
 * Piirtopaikkojen inventaario 9.9.2026. Jokainen näistä latoo kuvatekstin
 * pelaajan nähtäväksi, ja jokaisen on kysyttävä pituus yhteisestä
 * apurista. Vartio on kaksisuuntainen: tuonti + käyttö on oltava, ja
 * vanha suora kentänluku kuvatekstiin ei saa palata.
 */
const PIIRTOPAIKAT = [
  'js/ui.js',
  'js/lehti.js',
  'js/maalehti.js',
  'js/nahtavyydet.js',
  'js/fokuskohteet.js',
  'js/fokusvirta.js',
  'js/fokusnosto.js',
  'js/elaintaky.js',
  'js/historian-hetket.js',
  'js/skandaalit.js',
  'js/kohtaamiskuvat.js',
  'js/aikajana.js',
  'js/pollo.js',
  'js/tiedeliite.js',
  'js/linssit/ihmisen-matka-kortti.js',
];

test('jokainen piirtopaikka tuo yhteisen apurin ja käyttää sitä', () => {
  for (const polku of PIIRTOPAIKAT) {
    const js = lue(polku);
    assert.match(js, /import \{[^}]*kuvateksti(?:Lyhyt|Pitka)[^}]*\} from '\.\.?\/kuvatekstit\.js';/,
      `${polku}: kuvatekstin pituussääntö on tuotava js/kuvatekstit.js:stä`);
    assert.match(js, /kuvateksti(?:Lyhyt|Pitka)\(/,
      `${polku}: tuotu apuri on myös otettava käyttöön`);
  }
});

/*
 * VANHA SUORA KENTÄNLUKU EI SAA PALATA KUVATEKSTIIN. Nämä hahmot ovat
 * juuri ne, joilla teksti ennen ladottiin: selite-span, kuvatekstisolmun
 * kolmas argumentti ja selite-elementin textContent. Paikallinen muuttuja
 * (`const lyhyt = kuvatekstiLyhyt(kuva)`) läpäisee, joten vartio ei
 * kaadu taiton siistimisestä — vain kentän suorasta luvusta.
 */
const KIELLETYT = [
  // selite.textContent = kuva.selite
  /(?:selite|kuvaselite|kuvateksti)\.textContent\s*=\s*[A-Za-z_$][\w$]*\.(?:selite|kuvateksti)\b/,
  // html('span', '…-kuvaselite', kuva.selite ?? '')
  /html\('span',\s*'[\w-]*(?:kuvaselite|selite)',\s*[A-Za-z_$][\w$]*\.(?:selite|kuvateksti)\b/,
  // html('figcaption', 'kuvateksti', tiedot.kuva.selite)
  /html\('figcaption',\s*'[\w -]*kuvateksti[\w -]*',\s*[A-Za-z_$][\w$.]*\.(?:selite|kuvateksti)\b/,
];

test('piirtopaikoissa ei enää lueta selitettä suoraan kuvatekstiin', () => {
  for (const polku of PIIRTOPAIKAT) {
    const js = lue(polku);
    for (const kielletty of KIELLETYT) {
      const osuma = js.match(kielletty);
      assert.equal(osuma, null,
        `${polku}: kuvateksti luetaan yhä suoraan kentästä — käytä kuvatekstiLyhyt/-Pitka: ${osuma?.[0]}`);
    }
  }
});

test('avattu kuva näyttää pitkän tekstin JA lähderivin', () => {
  // Kartan kohteet ja täkynostot (js/fokuskohteet.js avaaKohdeSuurennos).
  const F = lue('js/fokuskohteet.js');
  assert.match(F, /html\('span', 'fokuskohde-zoomselite', kuvatekstiPitka\(kuva\)\)/);
  assert.match(F, /taytaLahderivi\(html\('span', 'fokuskohde-zoomlahde'\), kuva\.lahde \?\? '', kuva\)/);
  // Fokusvirran kuvat (js/fokusvirta.js avaaSuurennos).
  const V = lue('js/fokusvirta.js');
  assert.match(V, /selite\.textContent = kuvatekstiPitka\(kuva\)/);
  assert.match(V, /taytaLahderivi\(lahde, kuva\.lahde \?\? '', kuva\)/);
  // Lehden ja nostojen katselin (js/ui.js naytaKulttuuriKuva, openLightbox).
  const U = lue('js/ui.js');
  assert.match(U, /kuvaselite\.textContent = kuvatekstiPitka\(teos\)/);
  assert.match(U, /kuvateksti\.textContent = kuvatekstiPitka\(kohde\)/);
});

test('sivulla ja kortilla näkyy lyhyt', () => {
  // Kaupunkilehden etusivun kuvat.
  assert.match(lue('js/lehti.js'), /const lyhytTeksti = kuvatekstiLyhyt\(teos\);/);
  // Fokusvirran kortin kuva ja kartan päälle nouseva luentakuva.
  assert.equal(
    (lue('js/fokusvirta.js').match(/html\('span', 'fokusvirta-kuvaselite', kuvatekstiLyhyt\(kuva\)\)/g) ?? []).length,
    2, 'kortin kuva ja luentakuva latovat kumpikin lyhyen tekstin');
  // Täkynoston kuva ja isoisän karttaliite.
  assert.equal(
    (lue('js/fokusnosto.js').match(/html\('span', 'fokusnosto-kuvaselite', kuvatekstiLyhyt\(/g) ?? []).length,
    2, 'noston kuva ja karttaliite latovat lyhyen tekstin');
  // Nähtävyysjutun yksittäiskuva ja karuselli.
  assert.match(lue('js/nahtavyydet.js'), /const lyhytSelite = kuvatekstiLyhyt\(kuva\);/);
  // Kartan kohdekortti.
  assert.match(lue('js/fokuskohteet.js'), /const kortinTeksti = kuvatekstiLyhyt\(kuva\);/);
});

/* ==================== ENNALLAAN ==================== */

test('Tiedeliite on ennallaan: sama nimi, sama tulos, yhteinen sääntö', () => {
  assert.equal(lyhytKuvateksti({ lyhyt: 'L', selite: 'P' }), 'L');
  assert.equal(lyhytKuvateksti({ selite: 'P' }), 'P', 'ilman lyhyttä entinen selite');
  assert.equal(lyhytKuvateksti(null), '');
  const T = lue('js/tiedeliite.js');
  assert.match(T, /export const lyhytKuvateksti = \(kuva\) => kuvatekstiLyhyt\(kuva\);/,
    'Tiedeliitteen oma nimi jää, mutta sääntö tulee yhteisestä apurista');
  assert.match(T, /html\('span', 'fokusnosto-kuvaselite', lyhytKuvateksti\(kuva\)\)/);
});

test('Ihmisen matka on ennallaan: siellä lyhyt on kuvateksti ja pitkä selite', () => {
  const K = lue('js/linssit/ihmisen-matka-kortti.js');
  // Ilmiökuvan nimet ovat toisin päin kuin muualla, joten kentät
  // normalisoidaan apurille: kuvateksti pysyy lyhyenä, uusi lyhyt voittaa.
  assert.match(K,
    /const ilmionLyhyt = \(kuva\) => kuvatekstiLyhyt\(\{ lyhyt: kuva\?\.lyhyt \?\? kuva\?\.kuvateksti \}\);/);
  assert.match(K, /kuvaSelite: ilmionLyhyt\(t\.ilmio\) \|\| t\.otsikko \|\| null,/);
  assert.match(K, /kuvaSelite: ilmionLyhyt\(l\.kuva\) \|\| l\.otsikko \|\| null,/);
  // Sama järjestys kuin ennen: kuvateksti ensin, sitten otsikko.
  assert.equal(kuvatekstiLyhyt({ lyhyt: undefined ?? 'Kortin teksti.' }), 'Kortin teksti.');
});

/* ==================== TYÖKALU ==================== */

test('jäsennin lukee monirivisen literaaliketjun ja olion avaimet', () => {
  const lahde = `export const A = [
  {
    tiedosto: 'a.jpg',
    selite: 'Alku, '
      + 'ja jatko\\'kin.',
    lahde: 'Commons',
  },
];`;
  const oliot = jasennaOliot(lahde);
  const olio = oliot.find((o) => o.avaimet.some((a) => a.nimi === 'selite'));
  assert.ok(olio, 'olio löytyy');
  assert.deepEqual(olio.avaimet.map((a) => a.nimi), ['tiedosto', 'selite', 'lahde']);
  const selite = olio.avaimet.find((a) => a.nimi === 'selite');
  assert.equal(lueLiteraali(lahde.slice(selite.arvoAlku, selite.arvoLoppu)), 'Alku, ja jatko\'kin.');
});

test('jäsennin ohittaa sen mitä ei voi lukea tekstinä', () => {
  assert.equal(lueLiteraali('`sapluuna ${x}`'), null);
  assert.equal(lueLiteraali('muuttuja'), null);
  assert.equal(lueLiteraali("'a' + muuttuja"), null);
  assert.equal(lueLiteraali("'a' + 'b'"), 'ab');
});

test('lyhyen säännöt: yksi virke, enintään 100 merkkiä, päättyy pisteeseen', () => {
  assert.equal(tarkistaLyhyt('Kupoli valmistui 1436.'), null);
  assert.match(tarkistaLyhyt(`${'a'.repeat(100)}.`), /101 merkkiä/);
  assert.match(tarkistaLyhyt('Ilman pistettä'), /ei pääty pisteeseen/);
  assert.match(tarkistaLyhyt('Kaksi\nriviä.'), /rivinvaihto/);
  assert.match(tarkistaLyhyt(''), /tyhjä/);
  assert.match(tarkistaLyhyt(' Väli edessä.'), /välilyönti/);
});

test('heittomerkki suojataan JS-literaaliin', () => {
  assert.equal(heittomerkkijono("Glasgow'n paja."), "'Glasgow\\'n paja.'");
  assert.equal(heittomerkkijono('Kenoviiva \\ mukaan.'), "'Kenoviiva \\\\ mukaan.'");
});

test('työkalun pyöreä matka: --lista löytää, --vie lisää, toinen ajo ei lisää', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'kuvatekstit-'));
  try {
    const tiedosto = join(kansio, 'data.js');
    const pitka = `Tämä kuvateksti on tarkoituksella yli sadan merkin mittainen, `
      + `jotta työkalu poimii sen listalle ja Glasgow'n paja mainitaan lopussa.`;
    const suojaa = (teksti) => teksti.replace(/'/g, "\\'");
    writeFileSync(tiedosto, `export const DATA = [
  {
    tiedosto: 'yksi.jpg',
    selite: '${suojaa(pitka.slice(0, 60))}'
      + '${suojaa(pitka.slice(60))}',
    lahde: 'Commons',
  },
  {
    tiedosto: 'kaksi.jpg',
    kuvateksti: 'Lyhyt teksti, jota ei tarvitse lyhentää.',
  },
  {
    tiedosto: 'kolme.jpg',
    lyhyt: 'Tällä on jo lyhyt.',
    selite: '${suojaa(pitka.slice(0, 120))}',
  },
];
`, 'utf8');

    const jsonPolku = join(kansio, 'lista.json');
    const tuloste = execFileSync(process.execPath,
      [TYOKALU, '--lista', tiedosto, '--ulos', jsonPolku], { encoding: 'utf8' });
    assert.match(tuloste, /1 kuvatekstiä yli 100 merkkiä ilman lyhyttä/,
      'valmiiksi lyhyt ja jo lyhennetty jäävät listan ulkopuolelle');
    assert.match(tuloste, /Alue 0–0 \(1 kpl\)/);

    const lista = JSON.parse(readFileSync(jsonPolku, 'utf8'));
    assert.equal(lista.length, 1);
    assert.equal(lista[0].kentta, 'selite');
    assert.equal(lista[0].teksti, pitka, 'monirivinen ketju luetaan yhdeksi tekstiksi');
    assert.equal(lista[0].tiedosto, tiedosto);

    // Sama alkio myös suoraan kirjastorajapinnasta.
    assert.equal(etsiPuuttuvat(tiedosto).length, 1);

    const valmis = join(kansio, 'valmis.json');
    writeFileSync(valmis, JSON.stringify([{
      id: lista[0].id,
      tiedosto,
      tiiviste: lista[0].tiiviste,
      lyhyt: "Glasgow'n paja 1769.",
    }]), 'utf8');

    const vienti = execFileSync(process.execPath, [TYOKALU, '--vie', valmis], { encoding: 'utf8' });
    assert.match(vienti, /Lisätty 1 lyhyttä/);
    assert.match(vienti, /node --check ok/);

    const jalkeen = readFileSync(tiedosto, 'utf8');
    assert.match(jalkeen, /^ {4}lyhyt: 'Glasgow\\'n paja 1769\.',$/m,
      'lyhyt tulee kentän yläpuolelle samalla sisennyksellä ja heittomerkki suojattuna');
    assert.ok(jalkeen.includes(pitka.slice(0, 60)), 'pitkä teksti jää koskematta');

    // Idempotentti: toinen ajo ei lisää toista lyhyttä.
    const toinen = execFileSync(process.execPath, [TYOKALU, '--vie', valmis], { encoding: 'utf8' });
    assert.match(toinen, /Lisätty 0 lyhyttä/);
    assert.equal(readFileSync(tiedosto, 'utf8'), jalkeen);
    assert.equal(etsiPuuttuvat(tiedosto).length, 0);

    // --tarkista on nyt tyytyväinen, ja poistumiskoodi on 0.
    const tarkistus = execFileSync(process.execPath, [TYOKALU, '--tarkista', tiedosto], { encoding: 'utf8' });
    assert.match(tarkistus, /Ei puutteita/);
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
});

test('--vie kieltäytyy kelvottomasta lyhyestä eikä koske tiedostoon', () => {
  const kansio = mkdtempSync(join(tmpdir(), 'kuvatekstit-'));
  try {
    const tiedosto = join(kansio, 'data.js');
    const pitka = 'x'.repeat(140);
    const alku = `export const DATA = [{ selite: '${pitka}' }];\n`;
    writeFileSync(tiedosto, alku, 'utf8');
    const valmis = join(kansio, 'valmis.json');
    writeFileSync(valmis, JSON.stringify([
      { id: `${tiedosto}:1`, tiedosto, lyhyt: `${'y'.repeat(120)}.` },
    ]), 'utf8');
    assert.throws(() => execFileSync(process.execPath, [TYOKALU, '--vie', valmis], { stdio: 'pipe' }),
      /Command failed/);
    assert.equal(readFileSync(tiedosto, 'utf8'), alku, 'kelvoton erä ei muuta mitään');
  } finally {
    rmSync(kansio, { recursive: true, force: true });
  }
});
