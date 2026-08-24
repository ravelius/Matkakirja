/*
 * FOKUSMOODIN ANNOSTELUVIRTA (js/fokusvirta.js).
 *
 * Vahdittavat asiat ovat Raamatun osiosta "Fokusmoodi":
 *   1. ANNOSTELU — kuusi vaihetta kuljetaan sovitussa järjestyksessä,
 *      eikä yksikään väliin jäävä nappi oikaise seuraavaan.
 *   2. ETENEMINEN — vähintään YKSI täky ennen aarrekysymystä. Portti
 *      on tämän paketin ainoa sääntö, jonka rikkoutuminen ei näkyisi
 *      ruudulla mitenkään: pelaaja vain pääsisi aarteelle liian
 *      aikaisin, eikä sitä huomaisi kukaan.
 *   3. Tallennus ja palautus — virta EI saa alkaa alusta joka kerta kun
 *      kortti avataan; tila kulkee pelitallenteessa (game.js
 *      toJSON/fromJSON) kuten julisteet ja minitehtävät.
 *
 * Lisäksi tarkistetaan Ateenan sisältöpaketti (js/packs/fokusvirrat.js)
 * rakenteeltaan: minivisan oikea vastaus on olemassa, jokaisella
 * kuvalla on lähde (PD/CC-vaatimus) ja täkytunnukset ovat uniikkeja.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  FOKUSVIRRAN_VAIHEET, asetaFokusvirtaTila, fokusvirtaAlkutila, fokusvirtaJaljella,
  fokusvirtaPorttiAuki, fokusvirtaSiirto, fokusvirtaSiivoa, fokusvirtaTila,
} from '../js/fokusvirta.js';
import { FOKUSVIRRAT, fokusvirtaKaupungille } from '../js/packs/fokusvirrat.js';
import { Game } from '../js/game.js';
import { packById } from '../js/pack.js';

const ATEENA = fokusvirtaKaupungille('ateena');

/** Lyhyt koesisältö: kaksi täkyä riittää portin ja paluun testaamiseen. */
const KOE = {
  matkakirja: { teksti: 'a' },
  pollo: { teksti: 'b' },
  valinta: { kysymys: 'c', vaadittuja: 1 },
  takyt: [
    { id: 'yksi', nappi: 'Yksi', teksti: 'x', visa: { kysymys: 'k', vaihtoehdot: ['a', 'b'], oikea: 0 } },
    { id: 'kaksi', nappi: 'Kaksi', teksti: 'y', visa: { kysymys: 'k', vaihtoehdot: ['a', 'b'], oikea: 1 } },
  ],
  oppitunti: { teksti: 'd' },
  kohtaaminen: { hahmo: 'Nikos', nappi: 'Tapaa Nikos', teksti: 'e' },
};

/* ---------- 1. vaihejärjestys ---------- */

test('virta kulkee kuusi vaihetta sovitussa järjestyksessä', () => {
  let tila = fokusvirtaAlkutila();
  assert.equal(tila.vaihe, 'matkakirja');

  tila = fokusvirtaSiirto(tila, 'jatka', KOE);
  assert.equal(tila.vaihe, 'pollo');

  tila = fokusvirtaSiirto(tila, 'jatka', KOE);
  assert.equal(tila.vaihe, 'valinta');

  tila = fokusvirtaSiirto(tila, { tyyppi: 'taky', id: 'yksi' }, KOE);
  assert.equal(tila.vaihe, 'taky');
  assert.equal(tila.taky, 'yksi');

  // Minivisan vastaus merkitsee täyn tehdyksi mutta EI siirrä vaihetta:
  // faktarivi jää luettavaksi, ja pelaaja palaa napista.
  tila = fokusvirtaSiirto(tila, 'visa', KOE);
  assert.equal(tila.vaihe, 'taky');
  assert.deepEqual(tila.tehdyt, ['yksi']);

  tila = fokusvirtaSiirto(tila, 'jatka', KOE);
  assert.equal(tila.vaihe, 'valinta');
  assert.equal(tila.taky, null);

  tila = fokusvirtaSiirto(tila, 'aarteelle', KOE);
  assert.equal(tila.vaihe, 'oppitunti');

  tila = fokusvirtaSiirto(tila, 'jatka', KOE);
  assert.equal(tila.vaihe, 'kohtaaminen');

  tila = fokusvirtaSiirto(tila, 'kysymys', KOE);
  assert.equal(tila.vaihe, 'valmis');
  assert.ok(FOKUSVIRRAN_VAIHEET.includes(tila.vaihe));
});

test('tuntematon teko ei siirrä vaihetta eikä muokkaa annettua tilaa', () => {
  const tila = fokusvirtaAlkutila();
  const kopio = { ...tila, tehdyt: [...tila.tehdyt] };
  const jalkeen = fokusvirtaSiirto(tila, 'aarteelle', KOE);
  assert.equal(jalkeen.vaihe, 'matkakirja');
  assert.deepEqual(tila, kopio, 'siirto ei saa muokata annettua oliota');
});

test('jo tehtyä täkyä ei tarjota eikä voi avata uudelleen', () => {
  let tila = { vaihe: 'valinta', taky: null, tehdyt: ['yksi'] };
  assert.deepEqual(fokusvirtaJaljella(tila, KOE).map((t) => t.id), ['kaksi']);
  tila = fokusvirtaSiirto(tila, { tyyppi: 'taky', id: 'yksi' }, KOE);
  assert.equal(tila.vaihe, 'valinta', 'tehty täky ei avaudu toista kertaa');
  tila = fokusvirtaSiirto(tila, { tyyppi: 'taky', id: 'ei-ole' }, KOE);
  assert.equal(tila.vaihe, 'valinta', 'tuntematon täkytunnus ei avaa mitään');
});

/* ---------- 2. portti: vähintään yksi täky ---------- */

test('aarteelle ei pääse ennen kuin yksi täky on tehty', () => {
  const alku = { vaihe: 'valinta', taky: null, tehdyt: [] };
  assert.equal(fokusvirtaPorttiAuki(alku, KOE), false);
  assert.equal(fokusvirtaSiirto(alku, 'aarteelle', KOE).vaihe, 'valinta');

  const yksi = { vaihe: 'valinta', taky: null, tehdyt: ['yksi'] };
  assert.equal(fokusvirtaPorttiAuki(yksi, KOE), true);
  assert.equal(fokusvirtaSiirto(yksi, 'aarteelle', KOE).vaihe, 'oppitunti');
});

test('portin korkeus luetaan sisällöstä, ei koodista', () => {
  const tiukka = { ...KOE, valinta: { ...KOE.valinta, vaadittuja: 2 } };
  const yksi = { vaihe: 'valinta', taky: null, tehdyt: ['yksi'] };
  assert.equal(fokusvirtaPorttiAuki(yksi, tiukka), false);
  const kaksi = { vaihe: 'valinta', taky: null, tehdyt: ['yksi', 'kaksi'] };
  assert.equal(fokusvirtaPorttiAuki(kaksi, tiukka), true);
});

test('vapaaehtoiset täyt ovat yhä valittavissa portin auettua', () => {
  const tila = { vaihe: 'valinta', taky: null, tehdyt: ['yksi'] };
  const jalkeen = fokusvirtaSiirto(tila, { tyyppi: 'taky', id: 'kaksi' }, KOE);
  assert.equal(jalkeen.vaihe, 'taky');
  assert.equal(jalkeen.taky, 'kaksi');
});

/* ---------- 3. siivous ---------- */

test('kelvoton tallennettu tila siivotaan turvalliseksi', () => {
  assert.deepEqual(fokusvirtaSiivoa(null, KOE), { vaihe: 'matkakirja', taky: null, tehdyt: [] });
  assert.deepEqual(
    fokusvirtaSiivoa({ vaihe: 'olematon', taky: 'poistettu', tehdyt: ['yksi', 'poistettu'] }, KOE),
    { vaihe: 'matkakirja', taky: null, tehdyt: ['yksi'] },
  );
  // Avoin täky, jonka sisältö on poistettu: palataan valintaan eikä
  // jäädä vaiheeseen, jolle ei ole mitään piirrettävää.
  assert.deepEqual(
    fokusvirtaSiivoa({ vaihe: 'taky', taky: 'poistettu', tehdyt: [] }, KOE),
    { vaihe: 'valinta', taky: null, tehdyt: [] },
  );
});

/* ---------- 4. tallennus ja palautus ---------- */

/** Kahden pelaajan Eurooppa-peli, jossa toinen aloittaa Ateenasta. */
function ateenaPeli() {
  return new Game({
    pack: packById('europe'),
    players: [
      { name: 'A', color: '#f00', start: 'ateena' },
      { name: 'B', color: '#00f', start: 'lontoo' },
    ],
    seed: 7,
  });
}

test('virran tila kulkee pelitallenteen mukana', () => {
  const game = ateenaPeli();
  const city = game.board.cityById.get('ateena');
  assert.deepEqual(fokusvirtaTila(game, city, ATEENA), fokusvirtaAlkutila(),
    'tuntematon kaupunki alkaa alusta');

  const kesken = { vaihe: 'valinta', taky: null, tehdyt: ['diogenes'] };
  asetaFokusvirtaTila(game, city, kesken);
  assert.deepEqual(game.fokusvirrat['europe:ateena'], kesken);

  const palautettu = Game.fromJSON(JSON.parse(JSON.stringify(game.toJSON())));
  const city2 = palautettu.board.cityById.get('ateena');
  assert.deepEqual(fokusvirtaTila(palautettu, city2, ATEENA), kesken,
    'virta ei saa alkaa alusta tallennuksen jälkeen');
  assert.equal(fokusvirtaPorttiAuki(fokusvirtaTila(palautettu, city2, ATEENA), ATEENA), true);
});

test('vanha tallennus ilman fokusvirtakenttää kelpaa yhä', () => {
  const game = ateenaPeli();
  const data = JSON.parse(JSON.stringify(game.toJSON()));
  delete data.fokusvirrat;
  const palautettu = Game.fromJSON(data);
  assert.ok(palautettu, 'vanha tallennus ei saa hylätä itseään');
  assert.deepEqual(palautettu.fokusvirrat, {});
  assert.deepEqual(
    fokusvirtaTila(palautettu, palautettu.board.cityById.get('ateena'), ATEENA),
    fokusvirtaAlkutila(),
  );
});

test('sama kaupunki eri laudalla on eri matka', () => {
  const game = ateenaPeli();
  const city = game.board.cityById.get('ateena');
  asetaFokusvirtaTila(game, city, { vaihe: 'oppitunti', taky: null, tehdyt: ['nike'] });
  assert.deepEqual(Object.keys(game.fokusvirrat), ['europe:ateena'],
    'avaimessa on oltava laudan tunnus');
});

/* ---------- 5. Ateenan sisältöpaketti ---------- */

test('Ateenan fokusvirta on rakenteeltaan ehjä', () => {
  assert.ok(ATEENA, 'Ateenalle ei löydy fokusvirtaa');
  assert.equal(ATEENA.kaupunki, 'ateena');
  assert.equal(fokusvirtaKaupungille('lontoo'), null, 'muut kaupungit jäävät ennalleen');

  for (const kohta of ['matkakirja', 'pollo', 'oppitunti']) {
    assert.ok(ATEENA[kohta]?.teksti?.length > 80, `${kohta}: teksti puuttuu tai on liian lyhyt`);
  }
  assert.ok(ATEENA.kohtaaminen.nappi.includes('Nikos'), 'kohtaamisnappi nimeää henkilön');

  // Raamattu: 2–3 valintapainiketta.
  assert.ok(ATEENA.takyt.length >= 2 && ATEENA.takyt.length <= 3);
  const tunnukset = ATEENA.takyt.map((t) => t.id);
  assert.equal(new Set(tunnukset).size, tunnukset.length, 'täkytunnusten on oltava uniikkeja');

  for (const taky of ATEENA.takyt) {
    assert.ok(taky.nappi && taky.teksti?.length > 80, `${taky.id}: sisältö puuttuu`);
    const visa = taky.visa;
    assert.ok(visa, `${taky.id}: minivisa puuttuu`);
    assert.ok(visa.vaihtoehdot.length >= 2, `${taky.id}: liian vähän vaihtoehtoja`);
    assert.ok(visa.vaihtoehdot[visa.oikea], `${taky.id}: oikea vastaus ei osu vaihtoehtoon`);
    assert.equal(new Set(visa.vaihtoehdot).size, visa.vaihtoehdot.length,
      `${taky.id}: sama vaihtoehto kahdesti`);
    assert.ok(visa.fakta?.length > 20, `${taky.id}: faktarivi puuttuu`);
  }
});

test('jokaisella fokusvirran kuvalla on selite ja lähde', () => {
  for (const [kaupunki, virta] of Object.entries(FOKUSVIRRAT)) {
    const kuvat = [
      virta.matkakirja?.kuva, virta.pollo?.kuva, virta.oppitunti?.kuva,
      ...(virta.takyt ?? []).map((t) => t.kuva),
    ].filter(Boolean);
    assert.ok(kuvat.length >= 4, `${kaupunki}: kuvia on liian vähän`);
    for (const kuva of kuvat) {
      assert.ok(kuva.tiedosto || kuva.ampari,
        `${kaupunki}: kuvalla ei ole tiedostoa eikä ämpäripolkua`);
      assert.ok(kuva.selite?.length > 20, `${kaupunki}: kuvaselite puuttuu`);
      // Lisenssi ja tekijä ovat pakolliset: PD/CC-sääntö (CLAUDE.md).
      assert.ok(kuva.lahde?.length > 10, `${kaupunki}: kuvan lähde puuttuu`);
    }
  }
});
