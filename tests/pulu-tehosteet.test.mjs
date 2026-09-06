/*
 * PULUN ÄÄNITEHOSTEET — listan muoto ja pelin kytkentä.
 *
 * Omistajan tilaus 6.9.2026 aamupäivä, sanatarkasti: *"Pululle ja
 * muuallekin tarvitaan ääniefektejä: linnun siivet lentäessä,
 * tömähdyksiä (pulu laskeutuu), hassuja täyteääniä kun pulu sekoilee
 * (doing vieteriääni yms), oven lämähdys kiinni ja auki (pulu tulee tai
 * lähtee), viuhahdusefektejä yms. NÄITÄ EI GENEROIDA."*
 *
 * Nämä testit vartioivat kolmea asiaa, joita ei huomaisi ennen kuin
 * joku ihmettelee hiljaisuutta:
 *
 *  1. LISENSSIRAJAUS. Jokaisella tehosteella on lisenssisuodatin, ja
 *     CC0 on ensimmäisenä. Ilman rajausta hakuun tulisi CC BY-NC
 *     -aineistoa, jota tässä pelissä ei voi käyttää lainkaan.
 *  2. HAKUSANAT ovat englanniksi. Freesoundin aineisto on merkitty
 *     englanniksi; suomenkielinen haku löytää muutaman kymmenen
 *     tiedostoa koko palvelusta ja näyttäisi siltä, ettei ääntä ole.
 *  3. KYTKENTÄ. Listan jokainen peliavain on js/sound.js:n taulukossa,
 *     ja Livian ohjelmat soittavat vain sellaisia tunnuksia. Ämpäriin
 *     viety ääni, jota peli ei tunne, on hukkaan mennyt ajo.
 *
 * Testi EI tuo tools/hae-freesound.mjs:ää: se lukee API-avaimen
 * moduulitasolla ja poistuu, jos sitä ei ole. Puhtaat funktiot asuvat
 * siksi omassa moduulissaan (tools/tehostelista.mjs), ja hakutyökalusta
 * luetaan vain lähdeteksti.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import {
  hakusuodatin, lisenssisuodatin, lueTehostelista, manifestirivi,
  pisteytaOsuma, tarkistaTehostelista, valitseParas, vaatiiAttribuution,
} from '../tools/tehostelista.mjs';

const LISTA = lueTehostelista();
const SOUND = readFileSync(new URL('../js/sound.js', import.meta.url), 'utf8');
const LIVIA = readFileSync(new URL('../js/livia.js', import.meta.url), 'utf8');
const HAKU = readFileSync(new URL('../tools/hae-freesound.mjs', import.meta.url), 'utf8');
const TYONKULKU = readFileSync(new URL('../.github/workflows/aanihaku.yml', import.meta.url), 'utf8');

/** Omistajan nimeämät tehosteet — lista ei saa kutistua niiden alle. */
const TILATUT = [
  'siivet-lento', 'siivet-laskeutuminen', 'tomahdys-laskeutuminen',
  'doing-vieteri', 'sekoilu-2', 'ovi-auki', 'ovi-lamahdys',
  'viuhahdus-tulo', 'viuhahdus-lahto', 'kujerrus',
];

test('tehostelista kelpaa muodoltaan', () => {
  assert.deepEqual(tarkistaTehostelista(LISTA), []);
  assert.equal(LISTA.amparinKansio, 'aanet/tehosteet/pulu');
  assert.equal(LISTA.manifesti, 'manifesti.json');
  assert.equal(LISTA.tavoiteLufs, -14);
});

test('omistajan tilaamat tehosteet ovat listassa, ja kaksi yleistä lisäksi', () => {
  const tunnukset = LISTA.tehosteet.map((t) => t.tunnus);
  for (const tunnus of TILATUT) {
    assert.ok(tunnukset.includes(tunnus), `tehoste ${tunnus} puuttuu listasta`);
  }
  // *"plus 2–3 yleistä (paperin kahina sähke, kellon kilahdus)"*
  assert.ok(tunnukset.includes('paperin-kahina'));
  assert.ok(tunnukset.includes('kellon-kilahdus'));
});

test('jokaisella tunnuksella on hakusanat englanniksi ja kestorajat', () => {
  for (const tehoste of LISTA.tehosteet) {
    assert.ok(tehoste.hakusanat.length >= 2,
      `${tehoste.tunnus}: vähintään kaksi hakusanaa, jotta yksi huono ei kaada hakua`);
    for (const sanat of tehoste.hakusanat) {
      assert.match(sanat, /^[a-z0-9 '-]+$/,
        `${tehoste.tunnus}: hakusanan "${sanat}" pitää olla englantia pienaakkosin`);
    }
    assert.ok(tehoste.kestoMax > tehoste.kestoMin, `${tehoste.tunnus}: kestorajat väärin päin`);
    assert.ok(tehoste.kestoMax <= 3.5,
      `${tehoste.tunnus}: tehoste on isku eikä taustaääni — yli 3,5 s on liikaa`);
  }
});

test('lisenssisuodatin rajaa CC0:aan ja CC BY:hyn, CC0 ensin', () => {
  for (const tehoste of LISTA.tehosteet) {
    const suodatin = lisenssisuodatin(tehoste);
    assert.equal(suodatin, 'license:("Creative Commons 0" OR "Attribution")',
      `${tehoste.tunnus}: lisenssisuodatin ei ole odotettu`);
    assert.ok(!/Noncommercial|Sampling/.test(suodatin));
    assert.equal(hakusuodatin(tehoste),
      `${suodatin} duration:[${tehoste.kestoMin} TO ${tehoste.kestoMax}]`);
  }
});

test('lisenssilista, josta CC0 puuttuu ensimmäisenä, kaatuu tarkistuksessa', () => {
  const rikki = structuredClone(LISTA);
  rikki.tehosteet[0].lisenssit = ['Attribution'];
  assert.match(tarkistaTehostelista(rikki).join('\n'), /CC0 pitää olla ensimmäisenä/);

  const nc = structuredClone(LISTA);
  nc.tehosteet[0].lisenssit = ['Creative Commons 0', 'Attribution Noncommercial'];
  assert.match(tarkistaTehostelista(nc).join('\n'), /ei ole CC0 eikä CC BY/);

  const suomeksi = structuredClone(LISTA);
  suomeksi.tehosteet[0].hakusanat = ['siipien räpytys'];
  assert.match(tarkistaTehostelista(suomeksi).join('\n'), /englanniksi/);
});

test('js/sound.js tuntee listan jokaisen peliavaimen', () => {
  for (const tehoste of LISTA.tehosteet) {
    assert.ok(SOUND.includes(`'${tehoste.peliavain}'`),
      `js/sound.js ei tunne tunnusta ${tehoste.peliavain} (${tehoste.tunnus})`);
    assert.ok(SOUND.includes(`tunnus: '${tehoste.tunnus}'`),
      `js/sound.js:n PULUN_TEHOSTEET ei viittaa tunnukseen ${tehoste.tunnus}`);
  }
  // Omistajan nimeämät pelitunnukset (tilaus 6.9.2026).
  for (const avain of ['pulu.siivet', 'pulu.tomahdys', 'pulu.doing',
    'pulu.ovi-auki', 'pulu.ovi-kiinni', 'pulu.viuhahdus']) {
    assert.ok(SOUND.includes(`'${avain}'`), `js/sound.js: tunnus ${avain} puuttuu`);
  }
});

test('äänet haetaan manifestista eikä kovakoodatusta osoitteesta', () => {
  assert.match(SOUND, /PULUN_TEHOSTEJUURI = `\$\{AANI_JUURI\}aanet\/tehosteet\/pulu\//);
  assert.match(SOUND, /PULUN_MANIFESTI = `\$\{PULUN_TEHOSTEJUURI\}manifesti\.json`/);
  assert.match(SOUND, /lataaPulunTehosteet\(\)/);
  // −8 dB luentaan nähden (omistajan tilaus): 10^(−8/20) ≈ 0,40.
  assert.match(SOUND, /const PULUN_TASO = 0\.4;/);
});

test('Livia soittaa vain tunnuksia, jotka sound.js tuntee', () => {
  assert.match(LIVIA, /export function soitaLivianTehoste\(laji\)/);
  const avaimet = new Set(LISTA.tehosteet.map((t) => t.peliavain));
  const ohjelmat = LIVIA.slice(LIVIA.indexOf('const LIVIAN_TEHOSTEET'), LIVIA.indexOf('SEKOILUN_MERKIT'));
  const soitetut = [...ohjelmat.matchAll(/'(pulu\.[a-z0-9-]+)'/g)].map((m) => m[1]);
  assert.ok(soitetut.length >= 5, `Livian ohjelmista löytyi vain ${soitetut.length} tunnusta`);
  for (const avain of soitetut) {
    assert.ok(avaimet.has(avain), `js/livia.js soittaa tuntematonta tunnusta ${avain}`);
  }
  // Saapuminen = viuhahdus + siivet → tömähdys; lähtö = siivet + viuhahdus.
  assert.match(ohjelmat, /saapuu: \[\['pulu\.viuhahdus', 0\], \['pulu\.siivet'/);
  assert.match(ohjelmat, /'pulu\.tomahdys'/);
  assert.match(ohjelmat, /lahtee: \[\['pulu\.siivet', 0\], \['pulu\.viuhahdus-lahto'/);
  assert.match(ohjelmat, /sekoilee: \[\['pulu\.doing', 0\]\]/);
});

test('paras osuma valitaan arvosanasta, latauksista ja kestosta', () => {
  const tehoste = { tunnus: 'koe', kestoMin: 1, kestoMax: 3 };
  const perus = { previews: { 'preview-hq-mp3': 'x' }, duration: 2 };
  const heikko = {
    ...perus, id: 1, avg_rating: 2, num_ratings: 20, num_downloads: 10,
  };
  const vahva = {
    ...perus, id: 2, avg_rating: 4.8, num_ratings: 40, num_downloads: 9000,
  };
  assert.equal(valitseParas([heikko, vahva], tehoste).osuma.id, 2);
  assert.ok(pisteytaOsuma(vahva, tehoste).pisteet > pisteytaOsuma(heikko, tehoste).pisteet);

  // Alle kolme arviota on kohinaa: silloin käytetään neutraalia 3/5
  // eikä nollaa, jottei tuore mutta hyvä ääni putoa arvioimattomuuteen.
  const arvioimaton = {
    ...perus, id: 3, avg_rating: 0, num_ratings: 1, num_downloads: 10,
  };
  assert.ok(pisteytaOsuma(arvioimaton, tehoste).osat.arvio
    > pisteytaOsuma(heikko, tehoste).osat.arvio);

  // Ilman esikatselu-mp3:a osuma on hyödytön, ja kestorajojen
  // ulkopuolinen karsitaan vielä täällä.
  assert.equal(valitseParas([{ ...vahva, previews: {} }], tehoste), null);
  assert.equal(valitseParas([{ ...vahva, duration: 20 }], tehoste), null);
  assert.equal(valitseParas([], tehoste), null);
});

test('manifestirivi kirjaa lisenssin ja CC BY:n attribuution', () => {
  const tehoste = LISTA.tehosteet[0];
  const cc0 = manifestirivi(tehoste, {
    pisteet: 4.2,
    osuma: {
      id: 42,
      name: 'Wings',
      username: 'joku',
      license: 'http://creativecommons.org/publicdomain/zero/1.0/',
      url: 'https://freesound.org/s/42/',
    },
  }, { kesto: 1.234 });
  assert.equal(cc0.lisenssi, 'CC0');
  assert.equal(cc0.attribuutio, null, 'CC0 ei vaadi nimeämistä');
  assert.equal(cc0.tiedosto, `${tehoste.tunnus}.mp3`);
  assert.equal(cc0.freesoundId, 42);
  assert.equal(cc0.kesto, 1.23);

  const by = manifestirivi(tehoste, {
    pisteet: 4.2,
    osuma: {
      id: 43,
      name: 'Wings',
      username: 'joku',
      license: 'https://creativecommons.org/licenses/by/4.0/',
      url: 'https://freesound.org/s/43/',
    },
  }, { kesto: 1 });
  assert.equal(by.lisenssi, 'CC BY 4.0');
  assert.equal(by.attribuutio, '"Wings" — joku, Freesound (CC BY 4.0)');
  assert.ok(vaatiiAttribuution('CC BY 4.0'));
  assert.ok(!vaatiiAttribuution('CC0'));
});

test('hakutyökalu ja työnkulku osaavat ajaa listan', () => {
  assert.match(HAKU, /--lista/);
  assert.match(HAKU, /--pulu/);
  assert.match(HAKU, /--tunnus/);
  // Vienti menee tasan siihen kansioon, josta peli hakee.
  assert.match(HAKU, /\$\{lista\.amparinKansio\}\/\$\{tehoste\.tunnus\}\.mp3/);
  assert.match(HAKU, /audio\/mpeg/);
  assert.match(HAKU, /application\/json/);
  // Media ei mene repoon.
  assert.match(HAKU, /vaadiGitignore/);

  assert.match(TYONKULKU, /pulu-tehosteet/);
  assert.match(TYONKULKU, /R2_ACCOUNT_ID/);
  assert.match(TYONKULKU, /R2_BUCKET/);
  assert.match(TYONKULKU, /apt-get install -y --no-install-recommends ffmpeg/);
});
