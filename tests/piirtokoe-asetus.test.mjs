/*
 * PIIRTOKOE JA KEHYSPROFIILI RATASVALIKOSTA (omistaja 22.9.2026 klo
 * 20.15: kokeet suoraan peliin, koska pitkän ?koe=-osoitteen naputtelu
 * puhelimella on se este, jonka takia koe jää ajamatta).
 *
 * Kaksi asiaa, jotka eivät näy diffistä:
 *   1. VALIKON VALINTA ON SAMA KUIN LIPPU. Moduulit lukevat koelippunsa
 *      kahdesta apurista; molempien on nähtävä valinta.
 *   2. OSOITE VOITTAA MITTAUKSESSA. Kun apurille annetaan hakumerkkijono
 *      (savuke, testi), laitteen muistia ei saa lukea lainkaan — muuten
 *      mittaus mittaisi väärää tilaa.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function valeMuisti() {
  const varasto = new Map();
  globalThis.localStorage = {
    getItem: (k) => (varasto.has(k) ? varasto.get(k) : null),
    setItem: (k, v) => { varasto.set(k, String(v)); },
    removeItem: (k) => { varasto.delete(k); },
  };
  globalThis.dispatchEvent = () => true;
  return () => { delete globalThis.localStorage; delete globalThis.dispatchEvent; delete globalThis.location; };
}

const {
  PIIRTOKOKEIDEN_VAIHTOEHDOT, asetaKehysprofiili, asetaPiirtokoe, kehysprofiiliPaalla,
  piirtokoeValinta, piirtokoeVaatiiLatauksen, tallennetutKokeet,
} = await import('../js/piirtokoe-asetus.js');
const { laattakerroksenKokeet } = await import('../js/pallolaatat.js');
const { piirtokokeet } = await import('../js/pallolauta/kerrokset.js');

test('vaihtoehdot: oletus normaali ilman lippua, muilla oma lippunsa', () => {
  assert.equal(PIIRTOKOKEIDEN_VAIHTOEHDOT[0].avain, 'normaali');
  assert.equal(PIIRTOKOKEIDEN_VAIHTOEHDOT[0].lippu, null, 'oletus ei lisää lippua');
  for (const koe of PIIRTOKOKEIDEN_VAIHTOEHDOT.slice(1)) {
    assert.ok(koe.lippu && koe.nimi && koe.seloste && koe.ikoni, `${koe.avain}: lippu, nimi, seloste, ikoni`);
  }
  assert.equal(piirtokoeVaatiiLatauksen('dpr15'), true, 'pikselisuhde on kontekstin luku');
  assert.equal(piirtokoeVaatiiLatauksen('eipuskuri'), false);
});

test('valinta muistetaan ja näkyy molemmissa lippuapureissa', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '' };
    assert.equal(piirtokoeValinta(), 'normaali');
    assert.deepEqual([...tallennetutKokeet()], []);

    asetaPiirtokoe('eipuskuri');
    assert.equal(piirtokoeValinta(), 'eipuskuri');
    assert.ok(laattakerroksenKokeet().has('eipuskuri'), 'pallolaatat näkee valinnan');
    assert.ok(piirtokokeet().has('eipuskuri'), 'kerrokset näkee valinnan');

    asetaKehysprofiili(true);
    assert.equal(kehysprofiiliPaalla(), true);
    assert.ok(piirtokokeet().has('profiili'), 'kytkin vastaa ?koe=profiili');
    assert.ok(piirtokokeet().has('eipuskuri'), 'koe ja profiili yhtä aikaa');

    assert.equal(asetaPiirtokoe('pöllö'), 'normaali', 'tuntematon arvo palautuu oletukseen');
    assert.ok(!piirtokokeet().has('eipuskuri'));
  } finally { pura(); }
});

test('osoitteen haku ohittaa muistin kokonaan (savukkeet ja mittaukset)', () => {
  const pura = valeMuisti();
  try {
    globalThis.location = { search: '?koe=eipuskuri' };
    asetaPiirtokoe('dpr15');
    asetaKehysprofiili(true);
    // Annettu haku: vain osoitteen liput, ei laitteen muistia.
    assert.deepEqual([...laattakerroksenKokeet('?koe=syoteloki')], ['syoteloki']);
    assert.deepEqual([...piirtokokeet('?koe=syoteloki')], ['syoteloki']);
    // Ilman hakua osoite ja muisti yhdistyvät.
    const yhdessa = piirtokokeet();
    assert.ok(yhdessa.has('eipuskuri') && yhdessa.has('dpr15') && yhdessa.has('profiili'));
  } finally { pura(); }
});

test('valikko on kytketty: rivit, radiogroup ja kytkin', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /id="piirtokoe-valikko"[\s\S]{0,120}role="radiogroup"/);
  assert.match(html, /id="kehysprofiili-valikko"/);
  const main = readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');
  assert.match(main, /asetaPiirtokoe\(koe\.avain\)/);
  assert.match(main, /asetaKehysprofiili\(!kehysprofiiliPaalla\(\)\)/);
  assert.match(readFileSync(new URL('../sw.js', import.meta.url), 'utf8'), /'\.\/js\/piirtokoe-asetus\.js'/);
});
