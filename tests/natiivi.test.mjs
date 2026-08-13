/*
 * iOS-kuoren kytkennät (js/natiivi.js).
 *
 * Kaksi asiaa on tässä tiedostossa tärkeintä, ja kumpikin on sellainen,
 * jonka rikkoutuminen näkyisi vasta pelaajan laitteella:
 *
 *   1. UUSIN VOITTAA, EIKÄ MIKÄÄN KORVAUDU HILJAA. Sääntö asuu pelin
 *      puolella (kuori vain välittää, ks. TalleSilta.swift), joten se on
 *      testattava täällä. Väärä vertailu tarkoittaisi joko sitä, että
 *      toisen laitteen vanha tallennus söisi tuoreen matkan, tai sitä,
 *      että laitteet tarjoaisivat toisilleen samaa tilaa ikuisesti.
 *
 *   2. HARVENNUS EI SAA HUKATA VIIMEISTÄ TILAA. Pilveen kirjoitetaan
 *      korkeintaan kerran kymmenessä sekunnissa, mutta juuri viimeinen
 *      siirto ennen sovelluksen sulkemista on se, jota synkkaa varten
 *      tarvitaan.
 *
 * Lisäksi varmistetaan, että moduuli on selaimessa täysin mykkä: ilman
 * window.matkakirjaNatiivi-siltaa jokainen kytkentä palaa tekemättä
 * mitään eikä heitä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import {
  NATIIVI_MARGINAALI_MS,
  NATIIVI_PUTKI,
  NATIIVI_SAAVUTUKSET,
  NATIIVI_SYNKKAVALI_MS,
  natiiviHarvennin,
  natiiviJaaTeksti,
  natiiviKuori,
  natiiviKuunteleSynkka,
  natiiviMatkaTeksti,
  natiiviPilviVoittaa,
  natiiviSaavutus,
  natiiviSeuraa,
  natiiviSynkkaa,
  natiiviTarise,
  natiiviTukee,
  natiiviVastaus,
  natiiviWidget,
  natiiviYhdistaLeimat,
} from '../js/natiivi.js';

/* ---------------------------------------------------------------- */
/* Konflikti: uusin voittaa                                          */
/* ---------------------------------------------------------------- */

test('uudempi pilvitila voittaa paikallisen', () => {
  const paikallinen = 1_000_000;
  assert.equal(natiiviPilviVoittaa(paikallinen, paikallinen + 60_000), true);
});

test('vanhempi pilvitila ei voita', () => {
  const paikallinen = 1_000_000;
  assert.equal(natiiviPilviVoittaa(paikallinen, paikallinen - 60_000), false);
});

test('tasapelissä voittaa paikallinen — pelaaja on sen äärellä', () => {
  assert.equal(natiiviPilviVoittaa(1_000_000, 1_000_000), false);
});

test('marginaalin sisällä oleva ero ei riitä (oma kaiku ja kellojen ero)', () => {
  const paikallinen = 1_000_000;
  assert.equal(
    natiiviPilviVoittaa(paikallinen, paikallinen + NATIIVI_MARGINAALI_MS),
    false,
    'täsmälleen marginaalin verran uudempi ei ole uudempi',
  );
  assert.equal(natiiviPilviVoittaa(paikallinen, paikallinen + NATIIVI_MARGINAALI_MS + 1), true);
});

test('puuttuva pilviaika ei koskaan voita', () => {
  assert.equal(natiiviPilviVoittaa(0, 0), false);
  assert.equal(natiiviPilviVoittaa(0, null), false);
  assert.equal(natiiviPilviVoittaa(0, undefined), false);
});

test('tyhjä paikallinen aika häviää millä tahansa pilvitilalla', () => {
  assert.equal(natiiviPilviVoittaa(0, Date.now()), true);
});

/* ---------------------------------------------------------------- */
/* Passin leimat yhdistetään, ei korvata                             */
/* ---------------------------------------------------------------- */

test('leimojen yhdistäminen ei hukkaa kummankaan laitteen leimaa', () => {
  const oma = { africa: { label: 'Afrikka', date: '2026-08-01' } };
  const pilvesta = { europe: { label: 'Eurooppa', date: '2026-08-05' } };
  const yhdessa = natiiviYhdistaLeimat(oma, pilvesta);
  assert.deepEqual(Object.keys(yhdessa).sort(), ['africa', 'europe']);
});

test('saman laudan leimasta jää vanhempi päivä — ensimmäinen käynti', () => {
  const oma = { africa: { label: 'Afrikka', date: '2026-08-09' } };
  const pilvesta = { africa: { label: 'Afrikka', date: '2026-07-02' } };
  assert.equal(natiiviYhdistaLeimat(oma, pilvesta).africa.date, '2026-07-02');
  assert.equal(natiiviYhdistaLeimat(pilvesta, oma).africa.date, '2026-07-02');
});

test('yhdistäminen kestää puuttuvat puolet', () => {
  assert.deepEqual(natiiviYhdistaLeimat(null, null), {});
  assert.deepEqual(natiiviYhdistaLeimat(undefined, { a: { date: '2026-01-01' } }),
    { a: { date: '2026-01-01' } });
});

/* ---------------------------------------------------------------- */
/* Harvennus                                                         */
/* ---------------------------------------------------------------- */

/** Pieni valekello ja -ajastin: aika kulkee vain kun sitä siirretään. */
function testiKello() {
  let aika = 0;
  const jono = [];
  return {
    nyt: () => aika,
    ajasta: (tehtava, ms) => jono.push({ hetki: aika + ms, tehtava }),
    kelaa(ms) {
      aika += ms;
      // Ajastimet laukeavat siinä järjestyksessä kuin niiden hetki koittaa.
      for (const merkinta of jono.filter((m) => m.hetki <= aika).sort((a, b) => a.hetki - b.hetki)) {
        jono.splice(jono.indexOf(merkinta), 1);
        merkinta.tehtava();
      }
    },
  };
}

test('ensimmäinen kirjoitus menee heti läpi', () => {
  const kello = testiKello();
  const viedyt = [];
  const pyyda = natiiviHarvennin((arvo) => viedyt.push(arvo), { ...kello, vali: 10000 });
  assert.equal(pyyda('a'), true);
  assert.deepEqual(viedyt, ['a']);
});

test('tiheät kirjoitukset niputetaan yhdeksi', () => {
  const kello = testiKello();
  const viedyt = [];
  const pyyda = natiiviHarvennin((arvo) => viedyt.push(arvo), { ...kello, vali: 10000 });
  pyyda('a');
  kello.kelaa(1000);
  pyyda('b');
  kello.kelaa(1000);
  pyyda('c');
  kello.kelaa(1000);
  pyyda('d');
  assert.deepEqual(viedyt, ['a'], 'välissä ei kirjoiteta pilveen kertaakaan');
});

test('harvennus lähettää VIIMEISIMMÄN tilan kun väli täyttyy', () => {
  const kello = testiKello();
  const viedyt = [];
  const pyyda = natiiviHarvennin((arvo) => viedyt.push(arvo), { ...kello, vali: 10000 });
  pyyda('a');
  kello.kelaa(500);
  pyyda('b');
  pyyda('c');
  pyyda('viimeisin');
  kello.kelaa(10000);
  assert.deepEqual(viedyt, ['a', 'viimeisin'],
    'väliin jääneet tilat ovat vanhentuneita, mutta viimeinen ei saa kadota');
});

test('välin jälkeen seuraava kirjoitus menee taas heti', () => {
  const kello = testiKello();
  const viedyt = [];
  const pyyda = natiiviHarvennin((arvo) => viedyt.push(arvo), { ...kello, vali: 10000 });
  pyyda('a');
  kello.kelaa(10000);
  assert.equal(pyyda('b'), true);
  assert.deepEqual(viedyt, ['a', 'b']);
});

test('oletusväli on kymmenen sekuntia', () => {
  assert.equal(NATIIVI_SYNKKAVALI_MS, 10000);
});

/* ---------------------------------------------------------------- */
/* Selaimessa kaikki on mykkää                                       */
/* ---------------------------------------------------------------- */

/*
 * Nodessa ei ole window-oliota lainkaan, joten tämä on sama tilanne kuin
 * selaimessa ilman iOS-kuorta: yhdenkään kytkennän ei pidä heittää eikä
 * tehdä mitään. Sama tarkistetaan oikeassa selaimessa
 * tools/savuke-pollo.mjs:n osiossa 23.
 */
test('ilman siltaa peli ei tiedä kuoresta mitään', () => {
  assert.equal(natiiviKuori(), false);
  assert.equal(natiiviTukee('haptiikka'), false);
  assert.equal(natiiviTukee('talle'), false);
});

test('ilman siltaa yksikään kytkentä ei heitä', () => {
  assert.doesNotThrow(() => natiiviTarise('juhla'));
  assert.doesNotThrow(() => natiiviSaavutus(NATIIVI_SAAVUTUKSET.lapipeluu));
  assert.doesNotThrow(() => natiiviWidget({ kaupunki: 'Lontoo', paiva: 1 }));
  assert.doesNotThrow(() => natiiviJaaTeksti('Matkakirja'));
  for (let i = 0; i < NATIIVI_PUTKI + 2; i += 1) {
    assert.doesNotThrow(() => natiiviVastaus(true));
  }
});

test('ilman siltaa synkan kuuntelu palauttaa toimivan irrotuksen', () => {
  const irrota = natiiviKuunteleSynkka('matkakirja-save-v1', () => {
    assert.fail('kuulijaa ei saa kutsua ilman siltaa');
  });
  assert.equal(typeof irrota, 'function');
  assert.doesNotThrow(irrota);
});

/* ---------------------------------------------------------------- */
/* Kuoren kanssa: synkka ei korvaa mitään itse                       */
/* ---------------------------------------------------------------- */

/**
 * Pienin mahdollinen valesilta ja -varasto. Kuori ruiskuttaa oikean
 * sillan sivulle; tässä riittää se osa, jota synkka koskee.
 */
function asennaValesilta({ pilvi = {} } = {}) {
  const varasto = new Map();
  const viedyt = [];
  const kuulijat = new Map();
  globalThis.localStorage = {
    getItem: (a) => (varasto.has(a) ? varasto.get(a) : null),
    setItem: (a, v) => varasto.set(a, String(v)),
    removeItem: (a) => varasto.delete(a),
  };
  globalThis.window = {
    matkakirjaNatiivi: {
      onkoNatiivi: true,
      ominaisuudet: { talle: true, talleSynkka: true },
      talle: {
        vie: (avain, arvo, aika) => {
          viedyt.push({ avain, arvo, aika });
          return Promise.resolve({ avain, aika });
        },
        tuo: (avain) => Promise.resolve(pilvi[avain]
          ? { avain, loytyi: true, arvo: pilvi[avain].arvo, aika: pilvi[avain].aika }
          : { avain, loytyi: false, arvo: null, aika: 0 }),
      },
      kuuntele: (laji, kuulija) => {
        kuulijat.set(laji, kuulija);
        return () => kuulijat.delete(laji);
      },
    },
  };
  return {
    varasto,
    viedyt,
    pura: () => {
      delete globalThis.window;
      delete globalThis.localStorage;
    },
  };
}

test('uudempi pilvitallennus tarjotaan kuulijalle — eikä kirjoiteta itse', async () => {
  const avain = 'koe-tallennus-uudempi';
  const kello = { arvo: '{"peli":"pilvestä"}', aika: Date.now() + 600_000 };
  const vale = asennaValesilta({ pilvi: { [avain]: kello } });
  try {
    vale.varasto.set(avain, '{"peli":"paikallinen"}');
    let saatu = null;
    natiiviKuunteleSynkka(avain, (arvo) => { saatu = arvo; });
    // Sillan vastaus on lupaus: annetaan sen ratketa.
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(saatu, kello.arvo, 'kuulijan pitää saada pilven arvo');
    assert.equal(vale.varasto.get(avain), '{"peli":"paikallinen"}',
      'SYNKKA EI SAA KIRJOITTAA TALLENNUSTA ITSE — korvaus on kuulijan (ja pelaajan) päätös');
  } finally {
    vale.pura();
  }
});

test('vanhempi pilvitallennus ei häiritse pelaajaa lainkaan', async () => {
  const avain = 'koe-tallennus-vanhempi';
  const vale = asennaValesilta({
    pilvi: { [avain]: { arvo: '{"peli":"vanha"}', aika: 1000 } },
  });
  try {
    vale.varasto.set('matkakirja-synkka-ajat-v1', JSON.stringify({ [avain]: Date.now() }));
    let kutsuttu = false;
    natiiviKuunteleSynkka(avain, () => { kutsuttu = true; });
    await new Promise((r) => setTimeout(r, 0));
    assert.equal(kutsuttu, false);
  } finally {
    vale.pura();
  }
});

test('pelkkä avaaminen ei ole muutos eikä työnnä vanhaa tilaa pilveen', () => {
  const avain = 'koe-avaus';
  const vale = asennaValesilta();
  try {
    // Levyllä on eilinen tallennus, jonka pilvi on jo saanut.
    vale.varasto.set(avain, '{"peli":"eilinen"}');
    natiiviSeuraa(avain);
    // Peli avautuu ja tallentaa saman tilan uudelleen.
    assert.equal(natiiviSynkkaa(avain, '{"peli":"eilinen"}'), false);
    assert.deepEqual(vale.viedyt, [], 'muuttumatonta tilaa ei viedä pilveen');
    // Oikea muutos menee.
    assert.equal(natiiviSynkkaa(avain, '{"peli":"uusi"}'), true);
    assert.equal(vale.viedyt.length, 1);
    assert.equal(vale.viedyt[0].arvo, '{"peli":"uusi"}');
    assert.ok(vale.viedyt[0].aika > 0, 'aikaleima kulkee mukana');
  } finally {
    vale.pura();
  }
});

/* ---------------------------------------------------------------- */
/* Saavutustunnukset ja jaettava teksti                              */
/* ---------------------------------------------------------------- */

test('saavutustunnukset ovat sovitussa nimiavaruudessa', () => {
  for (const tunnus of Object.values(NATIIVI_SAAVUTUKSET)) {
    assert.match(tunnus, /^fi\.matkakirja\.peli\.saavutus\.[a-z0-9-]+$/);
  }
  // Neljä eri tunnusta, ei vahinkokopioita.
  assert.equal(new Set(Object.values(NATIIVI_SAAVUTUKSET)).size, 4);
});

test('jaettava yhteenveto taipuu yksikössä ja monikossa', () => {
  assert.equal(
    natiiviMatkaTeksti({ paivat: 1, kaupungit: 1, aarteet: 1 }),
    'Matkakirja: 1 päivä, 1 kaupunki, 1 unohdettu aarre löytyi.',
  );
  assert.equal(
    natiiviMatkaTeksti({ paivat: 24, kaupungit: 12, aarteet: 3 }),
    'Matkakirja: 24 päivää, 12 kaupunkia, 3 unohdettua aarretta löytyi.',
  );
});

test('yhteenveto kertoo rehellisesti myös tyhjän saaliin', () => {
  const teksti = natiiviMatkaTeksti({ paivat: 8, kaupungit: 4, aarteet: 0 });
  assert.match(teksti, /ei vielä löytynyt\.$/);
});
