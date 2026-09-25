/*
 * RAAMATTU MUOKATTAVAKSI PELISSÄ (js/tyohuone-raamattu-muokkaus.js).
 *
 * Omistaja 11.9.2026, sanatarkasti: *"pystyykö raamatun muuttamaan
 * niin että voisin itse editoida jokaisen sivun tekstejä ja painaa
 * lopuksi lähetä muutokset nappia?"*
 *
 * Neljä lupausta, joita ei näe ruutukaappauksesta:
 *
 *   1. RAAMATTU-OLIO EI MUUTU. Muokkaus elää luonnoksessa; Fable on
 *      ainoa, joka kirjoittaa js/tyohuone-raamattu.js:ään.
 *   2. VAIN MUUTTUNEET KOHDAT LÄHTEVÄT, osio ja kohdan numero
 *      mukanaan — myös johdanto, jonka "kohta" on 'johdanto'.
 *   3. LÄHETYSMUOTO on se, jonka Fable poimii Lukijoilta-lehdestä:
 *      tunniste ensin, sitten "OSIO » kohta j:" ja VANHA/UUSI.
 *   4. LUONNOS ON SESSIONSTORAGESSA eikä pysyvässä säilössä:
 *      sivunvaihto lehdessä ei hukkaa tekstiä, mutta mitään ei jää
 *      selaimeen pysyvästi.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const lue = (polku) => readFileSync(new URL(`../${polku}`, import.meta.url), 'utf8');

/* Tynkäsäilö: sama rajapinta kuin selaimen sessionStoragella. */
class TynkaSailio {
  constructor() { this.data = new Map(); }

  getItem(avain) { return this.data.has(avain) ? this.data.get(avain) : null; }

  setItem(avain, arvo) { this.data.set(avain, String(arvo)); }

  removeItem(avain) { this.data.delete(avain); }
}

const istunto = new TynkaSailio();
globalThis.sessionStorage = istunto;
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.document = {
  createElement: () => ({ style: {}, setAttribute() {}, addEventListener() {} }),
  getElementById: () => null,
  addEventListener() {},
};

const {
  JOHDANNON_OSIO, RAAMATUN_LAJI, RAAMATUN_LUONNOS_AVAIN, RAAMATUN_TUNNISTE,
  keraaRaamatunMuutokset, lahetaRaamatunMuutokset, luonnoksenAvain,
  lueRaamatunLuonnos, onRaamatunMuutos, raamatunMuutosTeksti,
  tallennaRaamatunKentta, tyhjennaRaamatunLuonnos,
} = await import('../js/tyohuone-raamattu-muokkaus.js');

/** Koeraamattu: sama muoto kuin oikealla (paivitetty, johdanto, osiot). */
const koeraamattu = () => ({
  paivitetty: '11.9.2026',
  johdanto: 'Tämä on pelin idea yhdessä paketissa.',
  osiot: [
    { otsikko: 'PERUSTUSLAKI', tila: 'hyväksytty', kohdat: ['Eka kohta.', 'Toka kohta.'] },
    { otsikko: 'AARTEET', tila: 'kesken', kohdat: ['Aarre on luettelossa.'] },
  ],
});

test.beforeEach(() => {
  istunto.data.clear();
  tyhjennaRaamatunLuonnos();
});

/* ---------------------------------------------------------------- */
/* 1. Muuttuneiden kohtien keruu                                     */
/* ---------------------------------------------------------------- */

test('muuttumaton kenttä ei ole muutos', () => {
  const raamattu = koeraamattu();
  tallennaRaamatunKentta('PERUSTUSLAKI', 0, 'Eka kohta.');
  // Pelkkä rivinvaihto lopussa ei ole muutos.
  tallennaRaamatunKentta('AARTEET', 0, 'Aarre on luettelossa.\n');
  assert.deepEqual(keraaRaamatunMuutokset(raamattu), []);
});

test('vain muuttuneet kohdat kerätään, osio ja kohdan numero mukana', () => {
  const raamattu = koeraamattu();
  tallennaRaamatunKentta('PERUSTUSLAKI', 1, 'Toka kohta, korjattuna.');
  tallennaRaamatunKentta('AARTEET', 0, 'Aarre on luettelossa.');
  const muutokset = keraaRaamatunMuutokset(raamattu);
  assert.deepEqual(muutokset, [{
    osio: 'PERUSTUSLAKI',
    kohta: 1,
    vanha: 'Toka kohta.',
    uusi: 'Toka kohta, korjattuna.',
  }]);
});

test('johdanto kulkee omana kohtanaan', () => {
  const raamattu = koeraamattu();
  tallennaRaamatunKentta(JOHDANNON_OSIO, 'johdanto', 'Uusi johdanto.');
  const muutokset = keraaRaamatunMuutokset(raamattu);
  assert.equal(muutokset.length, 1);
  assert.equal(muutokset[0].kohta, 'johdanto');
  assert.equal(muutokset[0].osio, JOHDANNON_OSIO);
  assert.equal(muutokset[0].vanha, 'Tämä on pelin idea yhdessä paketissa.');
});

test('RAAMATTU-olio ei muutu muokkauksesta', async () => {
  const { RAAMATTU } = await import('../js/tyohuone-raamattu.js');
  const ennen = JSON.stringify(RAAMATTU);
  const eka = RAAMATTU.osiot[0];
  tallennaRaamatunKentta(eka.otsikko, 0, 'TÄYSIN ERI TEKSTI');
  tallennaRaamatunKentta(JOHDANNON_OSIO, 'johdanto', 'TÄYSIN ERI JOHDANTO');
  const muutokset = keraaRaamatunMuutokset(RAAMATTU);
  assert.equal(muutokset.length, 2, 'kaksi muutosta pitäisi löytyä');
  assert.equal(JSON.stringify(RAAMATTU), ennen,
    'muokkaus kirjoitti RAAMATTU-olioon — vain Fable kirjoittaa Raamattuun');
});

/* ---------------------------------------------------------------- */
/* 2. Lähetysmuoto                                                   */
/* ---------------------------------------------------------------- */

test('lähetysteksti on Fablen luettavissa: tunniste, osio, kohta, vanha ja uusi', () => {
  const teksti = raamatunMuutosTeksti([
    {
      osio: 'PERUSTUSLAKI', kohta: 3, vanha: 'vanha teksti', uusi: 'uusi teksti',
    },
    {
      osio: JOHDANNON_OSIO, kohta: 'johdanto', vanha: 'a', uusi: 'b',
    },
  ]);
  assert.ok(teksti.startsWith(`${RAAMATUN_TUNNISTE} 2 kpl`));
  assert.ok(teksti.includes('PERUSTUSLAKI » kohta 3:\nVANHA: vanha teksti\nUUSI: uusi teksti'));
  assert.ok(teksti.includes(`${JOHDANNON_OSIO} » johdanto:\nVANHA: a\nUUSI: b`));
});

test('lähetys menee ehdotusreitille laji-kenttä mukanaan', async () => {
  const lahetetyt = [];
  await lahetaRaamatunMuutokset(
    [{
      osio: 'AARTEET', kohta: 0, vanha: 'a', uusi: 'b',
    }],
    (ehdotus) => { lahetetyt.push(ehdotus); return Promise.resolve({ ok: true }); },
  );
  assert.equal(lahetetyt.length, 1);
  const e = lahetetyt[0];
  assert.equal(e.laji, RAAMATUN_LAJI);
  assert.equal(e.sivu, 'Raamattu');
  assert.ok(e.teksti.startsWith(RAAMATUN_TUNNISTE));
  assert.ok(e.tarkenne.includes('1'));
  // Ei kuvia, ei avaimia, ei sähköpostia — lähetys on pelkkää tekstiä.
  assert.equal(e.kuvat, undefined);
  assert.equal(e.sahkoposti, undefined);
});

test('js/ehdotukset.js vie laji-kentän lomakkeeseen', () => {
  assert.match(lue('js/ehdotukset.js'), /lomake\.append\('laji', ehdotus\.laji \?\? ''\);/);
});

test('worker hyväksyy lajin raamattu ja antaa sille pidemmän tekstikaton', () => {
  const kasittelija = lue('worker/ehdotukset/kasittelija.js');
  assert.match(kasittelija, /export const RAAMATUN_LAJI = 'raamattu';/);
  assert.match(kasittelija, /RAAMATUN_TEKSTIN_KATTO = (\d+)/);
  const katto = Number(kasittelija.match(/RAAMATUN_TEKSTIN_KATTO = (\d+)/)[1]);
  // Raamatun kohta voi olla 2000 merkkiä ja lähetyksessä on vanha JA
  // uusi teksti useasta kohdasta — 4000 merkin oletuskatto ei riitä.
  assert.ok(katto >= 40000, `raamatun tekstikatto ${katto} on liian pieni`);
  assert.match(kasittelija,
    /laji === RAAMATUN_LAJI \? RAAMATUN_TEKSTIN_KATTO : TEKSTIN_KATTO/);
  // Laji kirjautuu metaan, jotta Lukijoilta-lehti osaa ryhmitellä.
  assert.match(kasittelija, /\n {4}laji,\n/);
});

test('Lukijoilta tunnistaa Raamatun muutokset myös vanhalta workerilta', () => {
  assert.ok(onRaamatunMuutos({ laji: 'raamattu', teksti: 'mitä vain' }));
  assert.ok(onRaamatunMuutos({ teksti: `${RAAMATUN_TUNNISTE} 2 kpl\n\nOSIO » kohta 0:` }));
  assert.ok(!onRaamatunMuutos({ teksti: 'Tavallinen lukijan juttuidea.' }));
  assert.ok(!onRaamatunMuutos({}));
  // Lehti näyttää ne omana ryhmänään otsikolla "Raamatun muutokset".
  const lehti = lue('js/lehti.js');
  assert.match(lehti, /nimi: 'Raamatun muutokset'/);
  assert.match(lehti, /raamatunMuutosSivut\(raamatut\)/);
});

/* ---------------------------------------------------------------- */
/* 3. Luonnos sessionStorageen                                       */
/* ---------------------------------------------------------------- */

test('luonnos tallentuu sessionStorageen ja lähtee sieltä tyhjennettäessä', () => {
  tallennaRaamatunKentta('AARTEET', 0, 'Kesken jäänyt lause');
  const raaka = istunto.getItem(RAAMATUN_LUONNOS_AVAIN);
  assert.ok(raaka, 'luonnosta ei tallennettu istuntosäilöön');
  assert.equal(JSON.parse(raaka)[luonnoksenAvain('AARTEET', 0)], 'Kesken jäänyt lause');
  // Sivunvaihto lehdessä lukee saman luonnoksen takaisin.
  assert.equal(lueRaamatunLuonnos()[luonnoksenAvain('AARTEET', 0)], 'Kesken jäänyt lause');

  tyhjennaRaamatunLuonnos();
  assert.equal(istunto.getItem(RAAMATUN_LUONNOS_AVAIN), null);
  assert.deepEqual(lueRaamatunLuonnos(), {});
});

test('luonnos ei mene pysyvään säilöön', () => {
  const lahde = lue('js/tyohuone-raamattu-muokkaus.js');
  assert.ok(!/localStorage/.test(lahde),
    'muokkaus ei saa tallentaa mitään pysyvästi selaimeen');
  assert.ok(/sessionStorage/.test(lahde));
});

test('rikkinäinen luonnos ei kaada lehteä', () => {
  istunto.setItem(RAAMATUN_LUONNOS_AVAIN, '{ ei kelpaa');
  assert.doesNotThrow(() => lueRaamatunLuonnos());
});
