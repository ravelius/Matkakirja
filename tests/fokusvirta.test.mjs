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
  fokusvirtaKohteetJaljella, fokusvirtaMatkakirja, fokusvirtaNahdytKohteet,
  fokusvirtaPorttiAuki, fokusvirtaSiirto, fokusvirtaSiivoa, fokusvirtaTila,
} from '../js/fokusvirta.js';
import { EUROPE_SAAPUMISET } from '../js/packs/europe-saapumiset.js';
import { FOKUSVIRRAT, fokusvirtaKaupungille } from '../js/packs/fokusvirrat.js';
import { FOKUSKOHTEET_GRC, fokuskohteet } from '../js/packs/fokuskohteet-grc.js';
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
  kohteet: [
    { id: 'kanava', nimi: 'Kanava', nappi: 'Kanava', teksti: 'z', laudat: { europe: { x: 1, y: 2 } } },
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

/* ---------- 2b. kohdenosto ---------- */

test('kohdenosto on valinnan sivupolku, ei uusi vaihe jonoon', () => {
  let tila = { vaihe: 'valinta', taky: null, tehdyt: [], kohde: null, kohteet: [] };
  tila = fokusvirtaSiirto(tila, { tyyppi: 'kohde', id: 'kanava' }, KOE);
  assert.equal(tila.vaihe, 'kohde');
  assert.equal(tila.kohde, 'kanava');
  assert.deepEqual(tila.kohteet, ['kanava'], 'kohde merkitään nähdyksi heti avattaessa');

  tila = fokusvirtaSiirto(tila, 'jatka', KOE);
  assert.equal(tila.vaihe, 'valinta', 'kohteesta palataan valintaan');
  assert.equal(tila.kohde, null);
  assert.deepEqual(tila.kohteet, ['kanava'], 'vinjetti jää kartalle paluun jälkeenkin');
  assert.deepEqual(fokusvirtaKohteetJaljella(tila, KOE), [], 'nähtyä ei tarjota uudelleen');
  assert.deepEqual(fokusvirtaNahdytKohteet(tila, KOE).map((k) => k.id), ['kanava']);
});

test('kohdenosto EI avaa aarreporttia — portin mitta on täky', () => {
  const tila = fokusvirtaSiirto(
    { vaihe: 'valinta', taky: null, tehdyt: [], kohde: null, kohteet: [] },
    { tyyppi: 'kohde', id: 'kanava' }, KOE,
  );
  const palattu = fokusvirtaSiirto(tila, 'jatka', KOE);
  assert.equal(fokusvirtaPorttiAuki(palattu, KOE), false);
  assert.equal(fokusvirtaSiirto(palattu, 'aarteelle', KOE).vaihe, 'valinta');
});

test('tuntematonta kohdetta ei voi avata', () => {
  const tila = { vaihe: 'valinta', taky: null, tehdyt: [], kohde: null, kohteet: [] };
  assert.equal(fokusvirtaSiirto(tila, { tyyppi: 'kohde', id: 'ei-ole' }, KOE).vaihe, 'valinta');
});

/* ---------- 3. siivous ---------- */

test('kelvoton tallennettu tila siivotaan turvalliseksi', () => {
  assert.deepEqual(fokusvirtaSiivoa(null, KOE), fokusvirtaAlkutila());
  assert.deepEqual(
    fokusvirtaSiivoa({ vaihe: 'olematon', taky: 'poistettu', tehdyt: ['yksi', 'poistettu'] }, KOE),
    { vaihe: 'matkakirja', taky: null, tehdyt: ['yksi'], kohde: null, kohteet: [] },
  );
  // Avoin täky, jonka sisältö on poistettu: palataan valintaan eikä
  // jäädä vaiheeseen, jolle ei ole mitään piirrettävää.
  assert.deepEqual(
    fokusvirtaSiivoa({ vaihe: 'taky', taky: 'poistettu', tehdyt: [] }, KOE),
    { vaihe: 'valinta', taky: null, tehdyt: [], kohde: null, kohteet: [] },
  );
  // Sama sääntö kohdenostolle: poistettu kohde ei jätä virtaa roikkumaan.
  assert.deepEqual(
    fokusvirtaSiivoa({ vaihe: 'kohde', kohde: 'poistettu', kohteet: ['poistettu'] }, KOE),
    { vaihe: 'valinta', taky: null, tehdyt: [], kohde: null, kohteet: [] },
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

  const kesken = {
    vaihe: 'valinta', taky: null, tehdyt: ['diogenes'], kohde: null, kohteet: ['korintin-kanava'],
  };
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

/* ---------- 6. kohdenostojen sisältö ---------- */

test('Kreikan fokuskohteet ovat rakenteeltaan ehjiä', () => {
  assert.ok(FOKUSKOHTEET_GRC.length >= 1, 'pilottikohde puuttuu');
  const tunnukset = FOKUSKOHTEET_GRC.map((k) => k.id);
  assert.equal(new Set(tunnukset).size, tunnukset.length, 'kohdetunnusten on oltava uniikkeja');
  for (const kohde of FOKUSKOHTEET_GRC) {
    assert.ok(kohde.nimi && kohde.nappi, `${kohde.id}: nimi tai painike puuttuu`);
    assert.ok(kohde.teksti?.length > 120, `${kohde.id}: pop-up-teksti puuttuu`);
    // Kohdenostossa EI ole visaa: se on tarjouksen ydin (ks. tilaus).
    assert.equal(kohde.visa, undefined, `${kohde.id}: kohdenostoon ei kuulu minivisaa`);
    // Koordinaatit molemmille laudoille, joilla Ateena on pelattavissa.
    for (const lauta of ['maailmankartta', 'europe']) {
      const paikka = kohde.laudat?.[lauta];
      assert.ok(Number.isFinite(paikka?.x) && Number.isFinite(paikka?.y),
        `${kohde.id}: ${lauta}-koordinaatit puuttuvat`);
    }
    // `osoite` on pelin oma generoitu havainnekuva repossa
    // (assets/kartat/ihmeet/) — sillä ei ole Commons-nimeä.
    assert.ok(kohde.kuva?.tiedosto || kohde.kuva?.ampari || kohde.kuva?.osoite,
      `${kohde.id}: kuva puuttuu`);
    assert.ok(kohde.kuva.selite?.length > 20, `${kohde.id}: kuvaselite puuttuu`);
    assert.ok(kohde.kuva.lahde?.length > 10, `${kohde.id}: kuvan lähde puuttuu`);
    // Lisäkuvat (`kuvat`) ovat pääkuvan jatke, ja niitä koskee sama
    // selite- ja lähdevaatimus: kuvateksti kertoo aina, mitä katsotaan.
    for (const lisa of kohde.kuvat ?? []) {
      assert.ok(lisa.tiedosto || lisa.ampari || lisa.osoite,
        `${kohde.id}: lisäkuvalta puuttuu tiedosto`);
      assert.ok(lisa.selite?.length > 20, `${kohde.id}: lisäkuvan selite puuttuu`);
      assert.ok(lisa.lahde?.length > 10, `${kohde.id}: lisäkuvan lähde puuttuu`);
    }
  }
});

test('kaupungin virta poimii kohteet tunnuksilla eikä kaadu kirjoitusvirheeseen', () => {
  assert.deepEqual(fokuskohteet(['korintin-kanava']).map((k) => k.id), ['korintin-kanava']);
  assert.deepEqual(fokuskohteet(['ei-tallaista']), []);
  assert.deepEqual(fokuskohteet(undefined), []);
  assert.ok((ATEENA.kohteet ?? []).some((k) => k.id === 'korintin-kanava'),
    'Ateenan virrassa on oltava Korintin kanavan kohdenosto');
});

test('jokaisella fokusvirran kuvalla on selite ja lähde', () => {
  for (const [kaupunki, virta] of Object.entries(FOKUSVIRRAT)) {
    const kuvat = [
      virta.matkakirja?.kuva, virta.pollo?.kuva, virta.oppitunti?.kuva,
      ...(virta.takyt ?? []).map((t) => t.kuva),
      ...(virta.kohteet ?? []).map((k) => k.kuva),
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

/* ---------- 7. matkakirjakortti ei vaihdu laatan ratkettua ---------- */

/*
 * OMISTAJAN BUGI 27.8.2026 (Kreikka): kaupungin laatan pulman ratkettua
 * ylävasen matkakirjakortti vaihtoi tekstin VANHAAN saapumismerkintään
 * ("oliiveja kolmesta ruukusta", js/packs/europe-saapumiset.js). Syy oli
 * fokusvirtaMatkakirjan lehtilukkoehdossa: laatta poistuu ratkettuaan
 * (js/game.js revealToken), lukko aukesi, funktio alkoi palauttaa
 * nullia ja js/ui.js:n varapolku kirjoitti kortille vanhan tekstin.
 *
 * Vartioitava sääntö on ui.js:n oma lupaus — *"sama teksti pysyy koko
 * käynnin ajan"*. Ansa koskee KAIKKIA fokusvirtakaupunkeja, joten
 * tarkistus ajetaan koko rekisterin yli eikä vain Ateenalle.
 */

/** Kevyt ui-tynkä: fokusvirta tarvitsee korttiin vain pelin. */
const uiTynka = (game) => ({ game });

/** Kaupunki "löydettyyn" tilaan — täsmälleen kuten revealToken jättää sen. */
function laattaRatkaistu(game, cityId, tyyppi = 'topaz') {
  game.tokens.delete(cityId);
  game.revealed.set(cityId, tyyppi);
}

test('fokusvirtakaupungin matkakirjateksti ei vaihdu laatan ratkettua', () => {
  for (const [cityId, virta] of Object.entries(FOKUSVIRRAT)) {
    const game = ateenaPeli();
    const city = game.board.cityById.get(cityId);
    assert.ok(city, `${cityId}: kaupunkia ei ole Euroopan laudalla`);
    const ui = uiTynka(game);

    // Laatta paikallaan: merkintä on virran oma.
    game.tokens.set(cityId, 'topaz');
    const ennen = fokusvirtaMatkakirja(ui, city);
    assert.equal(ennen?.teksti, virta.matkakirja.teksti,
      `${cityId}: virran merkintä ei tule korttiin ennen laatan ratkaisua`);

    // Laatta ratkaistu: sama avain, sama teksti, sama kuva. Avain on
    // yhtä tärkeä kuin teksti — sen vaihtuminen kirjoittaisi kortin
    // uusiksi kirjoituskoneella keskellä peliä.
    laattaRatkaistu(game, cityId);
    const jalkeen = fokusvirtaMatkakirja(ui, city);
    assert.deepEqual(jalkeen, ennen,
      `${cityId}: matkakirjakortti vaihtui laatan ratkettua`);

    // Ja nimenomaan: vanha saapumisteksti ei saa kummitella kortissa.
    const vanha = EUROPE_SAAPUMISET[cityId];
    if (vanha) {
      assert.notEqual(jalkeen.teksti, vanha.kuvaus,
        `${cityId}: kortissa on vanha saapumismerkintä`);
    }
  }
});

test('aarremerkintä voittaa saapumismerkinnän myös laatan ratkettua', () => {
  const game = ateenaPeli();
  const city = game.board.cityById.get('ateena');
  laattaRatkaistu(game, 'ateena');
  const ui = uiTynka(game);
  // Lipun nostaa js/fokusvirta.js avaaAarremerkinta aarteen löytyessä.
  ui.fokusaarreMerkinta = { avain: 'europe:ateena', kuitattu: false };
  const merkinta = fokusvirtaMatkakirja(ui, city);
  assert.equal(merkinta.teksti, ATEENA.aarremerkinta,
    'aarteen jälkeen kortissa on isoisän myöhempi sivu');
  assert.ok(merkinta.avain.startsWith('fokusaarre:'),
    'aarremerkinnällä on oma korttiavain (ui.js tunnistaa siitä äänitesäännön)');
});

test('kaupunki ilman fokusvirtaa jää vanhan saapumispolun varaan', () => {
  const game = ateenaPeli();
  const city = game.board.cityById.get('lontoo');
  assert.equal(fokusvirtaKaupungille('lontoo'), null, 'Lontoolla ei ole virtaa');
  // Sekä kääntämättömänä että ratkaistuna: null tarkoittaa ui.js:lle
  // "jatka tavalliseen tapaan" (SAAPUMISTEKSTIT / TARINAKAARI).
  game.tokens.set('lontoo', 'topaz');
  assert.equal(fokusvirtaMatkakirja(uiTynka(game), city), null);
  laattaRatkaistu(game, 'lontoo');
  assert.equal(fokusvirtaMatkakirja(uiTynka(game), city), null);
});

test('botti ei saa fokusvirran merkintää', () => {
  const game = ateenaPeli();
  const city = game.board.cityById.get('ateena');
  game.tokens.set('ateena', 'topaz');
  game.player.isBot = true;
  assert.equal(fokusvirtaMatkakirja(uiTynka(game), city), null);
});

/* ---------- 9. Matkakirjan ihmeet ---------- */

/*
 * Raamattu, osio "Matkakirjan ihmeet": kohteen `ihme`-kenttä nostaa
 * kadonneen suuruuden fotorealistisena keskelle nykymaailmaa. Kaksi
 * asiaa, jotka eivät näkyisi rikkoutuessaan ruudulla mitenkään:
 *
 *   1. LUPAUS ILMAN KUVAA. Väärä polku jättäisi kortista vain tyhjän
 *      paikan (piirraKohdeKuva poistaa kehyksen) tai "Koe ihme"
 *      -napin, joka avaa tyhjän suurennoksen. Siksi tiedosto
 *      tarkistetaan levyltä.
 *   2. HAVAINNEKUVAMERKINTÄ. Kuva näyttää valokuvalta, joten sen on
 *      sanottava itse olevansa havainnekuva. Nauhan piirtää peli;
 *      lähderivin on oltava datassa.
 *
 * Lisäksi kuvan on oltava sw.js:n esilatauslistassa: ilman sitä pelin
 * kohokohta jäisi lentokoneessa harmaaksi laatikoksi.
 */
test('Matkakirjan ihmeillä on kuva, selite ja havainnekuvamerkintä', async () => {
  const { readFileSync, existsSync } = await import('node:fs');
  const { dirname, join } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
  const sw = readFileSync(join(juuri, 'sw.js'), 'utf8');

  const paketit = Object.entries({
    GRC: (await import('../js/packs/fokuskohteet-grc.js')).FOKUSKOHTEET_GRC,
    TUR: (await import('../js/packs/fokuskohteet-tur.js')).FOKUSKOHTEET_TUR,
    EGY: (await import('../js/packs/fokuskohteet-egy.js')).FOKUSKOHTEET_EGY,
    IRQ: (await import('../js/packs/fokuskohteet-irq.js')).FOKUSKOHTEET_IRQ,
  });

  let ihmeita = 0;
  for (const [maa, kohteet] of paketit) {
    for (const kohde of kohteet) {
      if (!kohde.ihme) continue;
      ihmeita += 1;
      const tunnus = `${maa}/${kohde.id}`;
      const { osoite, selite, lahde, kadonnut } = kohde.ihme;
      assert.ok(osoite?.startsWith('assets/kartat/ihmeet/ihme-'),
        `${tunnus}: ihmekuvan polku on assets/kartat/ihmeet/ihme-*`);
      assert.ok(existsSync(join(juuri, osoite)), `${tunnus}: ${osoite} puuttuu levyltä`);
      assert.equal(typeof kadonnut, 'boolean',
        `${tunnus}: esitystapa (kadonnut) on kerrottava kumpaankin suuntaan`);
      assert.ok(selite?.length > 60, `${tunnus}: ihmekuvan selite puuttuu tai on liian lyhyt`);
      // Selite kertoo KOHTEESTA eikä kuvasta — havainnekuvamerkintä on
      // lähderivillä, jonka peli näyttää aina selitteen vieressä.
      assert.ok(!/^Havainnekuva/i.test(selite),
        `${tunnus}: ihmekuvan selite kertoo kohteesta, ei kuvasta`);
      assert.ok(/^Matkakirjan havainnekuva:/.test(lahde ?? ''),
        `${tunnus}: lähderivin on merkittävä kuva havainnekuvaksi`);
      assert.ok(sw.includes(`'./${osoite}'`), `${tunnus}: ${osoite} puuttuu sw.js:n listasta`);
    }
  }
  assert.equal(ihmeita, 10, 'ensimmäisessä erässä on kymmenen Matkakirjan ihmettä');
});

test('kadonnut ihme saa kartalle tähden, olemassa oleva pitää oman merkkinsä', async () => {
  const { NOSTOSYM_LUOKAT, NOSTOSYM_TYYPIT } = await import('../js/fokusnosto-symbolit.js');
  assert.ok(NOSTOSYM_TYYPIT.has('ihme'), 'tähti on symbolikirjastossa');
  assert.ok(NOSTOSYM_LUOKAT.ihme, 'tähdellä on kortin ylärivin luokkanimi');
  const kolossi = FOKUSKOHTEET_GRC.find((k) => k.id === 'rodoksen-kolossi');
  const knossos = FOKUSKOHTEET_GRC.find((k) => k.id === 'knossos');
  assert.equal(kolossi.ihme.kadonnut, true, 'kolossia ei ole enää olemassa');
  assert.equal(knossos.ihme.kadonnut, false, 'Knossoksen rauniot ovat tallella');
});
