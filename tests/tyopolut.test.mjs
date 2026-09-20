/*
 * TYÖAINEISTO EI SAA NÄKYÄ PELAAJALLE — VARTIO.
 *
 * Sonnet 1, kierros 17D: Istanbulin ja Eskikaraağaçin nostokorttien
 * lähderiveillä luki työaineiston polku ja täkyraportin numero
 * (*"docs/mantereet-tyoaineisto/takynostot-turkki.md, ehdokas 5, ja
 * takyt-istanbul.md, täky 18"*). Nosto- ja kohdekorttien `lahde` on
 * pelaajalle näkyvä rivi (js/fokusnosto.js: `.fokusnosto-lahde`,
 * js/fokuskohteet.js: `kortinKuvalahde`), joten siinä kuuluu lukea
 * mistä tieto on tarkistettu — ei se, mihin muistiinpanotiedostoon
 * kirjoittaja sen aikanaan kokosi.
 *
 * Vuotoja oli 19 lähderivillä yhdeksässä maassa; ne siivottiin
 * 20.9.2026 niin, että todellinen lähde ja tarkistuspäivä jäivät.
 *
 * TÄMÄ TESTI LUKEE VAIN MERKKIJONOJA, EI KOMMENTTEJA. Kommenteissa
 * työaineistoon viittaaminen on oikein ja toivottavaa: se kertoo
 * seuraavalle kirjoittajalle, mistä faktat tulivat. Ero on siinä,
 * näkeekö rivin pelaaja.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

/** Mistä pelaaja lukee tekstiä: pakat ja muutosloki. */
const PAKAT = new URL('../js/packs/', import.meta.url);
const MUUT = ['../js/muutokset.js'];

/*
 * Työhuoneen Raamattu (js/tyohuone-raamattu.js) ja kehittäjälehdet
 * (js/lehti.js avaaKehittajaLehti) EIVÄT ole tässä: ne ovat
 * nimenomaan kehittäjän tekstiä, ja niissä dokumenttipolku on ohje
 * eikä vuoto.
 */

const VUODOT = [
  [/docs\//, 'työaineiston polku'],
  [/[a-zäöå-]+\.md\b/i, 'muistiinpanotiedosto'],
  [/\btäky\s*\d+|\behdokas\s*\d+|täkyraport/i, 'täkyraportin numero'],
  [/faktapohja-|spec-[a-z]+\.md/i, 'faktapohjan tiedostonimi'],
];

/** Kommentit pois, rivinumerot säilyttäen. */
const ilmanKommentteja = (lahde) => lahde
  .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
  .replace(/\/\/[^\n]*/g, '');

const JONO = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g;

function etsiVuodot(nimi, lahde) {
  const osumat = [];
  ilmanKommentteja(lahde).split('\n').forEach((rivi, i) => {
    for (const jono of rivi.match(JONO) ?? []) {
      const laji = VUODOT.find(([re]) => re.test(jono))?.[1];
      if (laji) osumat.push(`${nimi}:${i + 1} (${laji}) ${jono.slice(0, 120)}`);
    }
  });
  return osumat;
}

test('pakkojen teksteissä ei ole työaineiston polkuja eikä täkynumeroita', () => {
  const osumat = [];
  for (const tiedosto of readdirSync(PAKAT).filter((f) => f.endsWith('.js'))) {
    osumat.push(...etsiVuodot(
      `js/packs/${tiedosto}`,
      readFileSync(new URL(tiedosto, PAKAT), 'utf8'),
    ));
  }
  assert.deepEqual(osumat, [],
    `pelaajalle näkyvässä tekstissä on työaineistoa:\n${osumat.join('\n')}`);
});

test('muutoslokissa ei ole dokumenttipolkuja', () => {
  const osumat = [];
  for (const suht of MUUT) {
    osumat.push(...etsiVuodot(suht.replace('../', ''),
      readFileSync(new URL(suht, import.meta.url), 'utf8')));
  }
  assert.deepEqual(osumat, [],
    `muutoslokissa on dokumenttipolku:\n${osumat.join('\n')}`);
});

/*
 * VARTION VASTAKOE: mittari tunnistaa vuodon, jos sellainen kirjoitetaan.
 * Ilman tätä testi menisi läpi myös silloin, kun säännöt on vahingossa
 * rikottu — esimerkiksi jos kommenttien poisto söisi koko tiedoston.
 */
test('vastakoe: mittari löytää istutetun vuodon mutta ei kommenttia', () => {
  const vuoto = "const a = { lahde: 'en-Wikipedia \"Troy\" (tarkistettu 25.8.2026 "
    + "työaineistoon docs/mantereet-tyoaineisto/takynostot-turkki.md, ehdokas 6).' };";
  assert.equal(etsiVuodot('koe.js', vuoto).length, 1);
  const kommentti = "/* Faktat: docs/mantereet-tyoaineisto/takyt-sofia.md, täky 7. */\n"
    + "const b = { lahde: 'en-Wikipedia \"Sofia\" (tarkistettu 25.8.2026).' };";
  assert.deepEqual(etsiVuodot('koe.js', kommentti), []);
});
