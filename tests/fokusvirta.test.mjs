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
    /*
     * KADONNEELLA KOHTEELLA `kuva` PUUTTUU, ja se on oikein: kohteesta
     * ei ole valokuvaa, koska kohdetta ei ole, ja kortin ensimmäinen
     * kuva tulee `ihme`-kentästä (js/fokuskohteet.js piirraKohdeKuvat).
     * Kaikilla muilla kuva on pakollinen — ja 27.8.2026 alkaen se on
     * kohteen NYKYISTÄ kuntoa esittävä valokuva, ei havainnekuva
     * (omistajan täsmennys; generoitu ihmekuva aukeaa vain "Koe ihme"
     * -napista). `osoite` on yhä sallittu muoto muille repon omille
     * kuville — sillä ei ole Commons-nimeä.
     */
    const kuvatonKadonnut = Boolean(kohde.ihme?.kadonnut) && !kohde.kuva;
    if (!kuvatonKadonnut) {
      assert.ok(kohde.kuva?.tiedosto || kohde.kuva?.ampari || kohde.kuva?.osoite,
        `${kohde.id}: kuva puuttuu`);
      assert.ok(kohde.kuva.selite?.length > 20, `${kohde.id}: kuvaselite puuttuu`);
      assert.ok(kohde.kuva.lahde?.length > 10, `${kohde.id}: kuvan lähde puuttuu`);
    }
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

/*
 * LIVIAN MAADOITUS (Fablen kaanon 27.8.2026, TUURAAJA-KEHYS).
 *
 * Jokaisella fokuskaupungilla on Livian kommentti isoisän merkinnän
 * perään, ja se piirtyy kuplan ensimmäiseksi kappaleeksi
 * (js/fokusvirta.js piirraPollo). Testi vartioi kolmea asiaa:
 * kommentti on olemassa, se on oma tekstinsä eikä kopio vaiheen
 * huomiosta, ja vähintään yhdessä kuudesta ISOISÄ OSOITTAUTUU
 * OIKEAKSI — juuri se sääntö estää hahmoa muuttumasta
 * besserwisseriksi.
 */
test('jokaisella fokuskaupungilla on Livian maadoitus isoisän merkintään', () => {
  const kaupungit = Object.keys(FOKUSVIRRAT);
  assert.ok(kaupungit.length >= 6, 'fokuskaupunkeja pitäisi olla vähintään kuusi');
  for (const [kaupunki, virta] of Object.entries(FOKUSVIRRAT)) {
    const maadoitus = virta.pollo?.maadoitus;
    assert.ok(typeof maadoitus === 'string' && maadoitus.length > 120,
      `${kaupunki}: Livian maadoitus puuttuu tai on liian lyhyt`);
    assert.notEqual(maadoitus, virta.pollo?.teksti,
      `${kaupunki}: maadoitus ei saa olla sama teksti kuin vaiheen huomio`);
    // Huutomerkkejä Livia ei käytä (tools/pollo/worker.js KARAKTÄÄRI).
    assert.ok(!maadoitus.includes('!'), `${kaupunki}: Livia ei käytä huutomerkkejä`);
  }
});

test('vähintään yhdessä maadoituksessa isoisä osoittautuu oikeaksi', () => {
  const myonnytys = Object.values(FOKUSVIRRAT)
    .map((virta) => virta.pollo?.maadoitus ?? '')
    .filter((teksti) => /myönnä|osui|piti paikkansa|oli oikeassa/i.test(teksti));
  assert.ok(myonnytys.length >= 1,
    'ainakin yhdessä kaupungissa Livian on myönnettävä isoisän olleen oikeassa');
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
  // Aarremerkintä on olio (`{ teksti }`) jokaisessa kaupungissa v1301:stä
  // lähtien; moottori kelpuuttaa yhä myös vanhan merkkijonomuodon.
  assert.equal(merkinta.teksti, ATEENA.aarremerkinta.teksti,
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
    // Euroopan erä 27.8.2026: Forum Romanum, Tuileries ja vanha St Paul.
    ITA: (await import('../js/packs/fokuskohteet-ita.js')).FOKUSKOHTEET_ITA,
    FRA: (await import('../js/packs/fokuskohteet-fra.js')).FOKUSKOHTEET_FRA,
    GBR: (await import('../js/packs/fokuskohteet-gbr.js')).FOKUSKOHTEET_GBR,
    // Maailman erä 27.8.2026: seitsemän uutta maata, joilla on
    // fokuslehti mutta ei vielä omaa fokusvirtaa.
    SYR: (await import('../js/packs/fokuskohteet-syr.js')).FOKUSKOHTEET_SYR,
    CHN: (await import('../js/packs/fokuskohteet-chn.js')).FOKUSKOHTEET_CHN,
    MEX: (await import('../js/packs/fokuskohteet-mex.js')).FOKUSKOHTEET_MEX,
    JOR: (await import('../js/packs/fokuskohteet-jor.js')).FOKUSKOHTEET_JOR,
    IRN: (await import('../js/packs/fokuskohteet-irn.js')).FOKUSKOHTEET_IRN,
    AFG: (await import('../js/packs/fokuskohteet-afg.js')).FOKUSKOHTEET_AFG,
    ZWE: (await import('../js/packs/fokuskohteet-zwe.js')).FOKUSKOHTEET_ZWE,
    // Välimeren erä 27.8.2026: kaksi uutta maata, joilla on fokuslehti
    // mutta ei vielä omaa fokusvirtaa.
    LBY: (await import('../js/packs/fokuskohteet-lby.js')).FOKUSKOHTEET_LBY,
    TUN: (await import('../js/packs/fokuskohteet-tun.js')).FOKUSKOHTEET_TUN,
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

      /*
       * YKSI REKONSTRUKTIO KOHDETTA KOHTI (omistajan tilaus 27.8.2026
       * ilta). Erän ensimmäiset, piirrosmaiset loistoaikakuvat
       * (assets/kartat/ihmeet/<tunnus>.webp ilman ihme-etuliitettä)
       * poistettiin, koska fotorealistinen ihmekuva korvaa ne. Vartio
       * on tässä, koska paluu näkyisi ruudulla vain kahtena melkein
       * samana kuvana peräkkäin — ei virheenä.
       */
      const kuvalista = [kohde.kuva, ...(kohde.kuvat ?? [])].filter(Boolean);
      for (const k of kuvalista) {
        assert.ok(!/^assets\/kartat\/ihmeet\/(?!ihme-)/.test(k.osoite ?? ''),
          `${tunnus}: vanha loistoaikarekonstruktio ${k.osoite} on yhä kuvalistassa`);
      }

      if (kadonnut) {
        /*
         * KADONNEELLA EI OLE VALOKUVAA, koska kohdetta ei ole: ihmekuva
         * on kortin ensimmäinen ja ainoa kuva (piirraKohdeKuvat).
         */
        assert.equal(kuvalista.length, 0,
          `${tunnus}: kadonneen kohteen ainoa kuva on ihmekuva`);
      } else {
        /*
         * OLEMASSA OLEVAN PÄÄKUVA ON VALOKUVA KOHTEEN NYKYISESTÄ
         * KUNNOSTA (omistajan täsmennys 27.8.2026 ilta) — Commons-nimi,
         * ei repon oma generoitu kuva. Generoitu ihmekuva aukeaa vain
         * "Koe ihme" -napista, joka piirtyy tämän kuvan ALLE.
         */
        assert.ok(kohde.kuva?.tiedosto,
          `${tunnus}: olemassa olevan kohteen pääkuvan on oltava Commons-valokuva`);
        assert.ok(/\(CC|\(PD|PD\)/.test(kohde.kuva.lahde ?? ''),
          `${tunnus}: pääkuvan lähderivillä on oltava lisenssi ja tekijä`);
      }
    }
  }
  /*
   * KYMMENEN + KOLME + NELJÄTOISTA + KAHDEKSAN. Ensimmäinen erä
   * (26.–27.8.2026) oli antiikin kadonneet ihmeet, Euroopan erä
   * (27.8.2026) toi kolme lisää (Forum Romanum, Tuileries, vanha
   * St Paul), MAAILMAN erä samana päivänä neljätoista viideltä
   * mantereelta ja VÄLIMEREN erä vielä kahdeksan antiikin Välimereltä
   * ja Mesopotamiasta.
   */
  assert.equal(ihmeita, 35, 'Matkakirjan ihmeitä on kolmekymmentäviisi');
});

/*
 * VANHAT LOISTOAIKAKUVAT ON POISTETTU MYÖS LEVYLTÄ JA sw.js:STÄ
 * (omistajan tilaus 27.8.2026 ilta). Jäänyt tiedosto ei näkyisi
 * pelissä mitenkään, mutta esilatauslistaan jäänyt rivi kaataisi
 * palvelutyöntekijän asennuksen kokonaan — addAll hylkää koko erän
 * yhdestä 404:stä.
 */
test('ihmeiden kuvakansiossa on vain uudet ihme-kuvat', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const { dirname, join } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const juuri = join(dirname(fileURLToPath(import.meta.url)), '..');
  const kansio = join(juuri, 'assets/kartat/ihmeet');
  const tiedostot = readdirSync(kansio);
  assert.equal(tiedostot.length, 35,
    'kansiossa on kolmekymmentäviisi ihmekuvaa');
  for (const nimi of tiedostot) {
    assert.ok(nimi.startsWith('ihme-'), `${nimi}: vanha loistoaikakuva on yhä levyllä`);
  }
  const sw = readFileSync(join(juuri, 'sw.js'), 'utf8');
  for (const rivi of sw.split('\n')) {
    const osuma = rivi.match(/assets\/kartat\/ihmeet\/([^']+)/);
    if (!osuma) continue;
    assert.ok(osuma[1].startsWith('ihme-'),
      `sw.js esilataa poistetun kuvan ${osuma[1]}`);
  }
});

test('kadonnut ihme saa kartalle tähden, olemassa oleva pitää oman merkkinsä', async () => {
  const { NOSTOSYM_LUOKAT, NOSTOSYM_TYYPIT } = await import('../js/fokusnosto-symbolit.js');
  assert.ok(NOSTOSYM_TYYPIT.has('ihme'), 'tähti on symbolikirjastossa');
  assert.ok(NOSTOSYM_LUOKAT.ihme, 'tähdellä on kortin ylärivin luokkanimi');
  const kolossi = FOKUSKOHTEET_GRC.find((k) => k.id === 'rodoksen-kolossi');
  const knossos = FOKUSKOHTEET_GRC.find((k) => k.id === 'knossos');
  assert.equal(kolossi.ihme.kadonnut, true, 'kolossia ei ole enää olemassa');
  assert.equal(knossos.ihme.kadonnut, false, 'Knossoksen rauniot ovat tallella');
  assert.equal(kolossi.kuva, undefined, 'kadonneella ei ole valokuvaa');
  assert.ok(knossos.kuva?.tiedosto, 'olemassa olevalla on valokuva nykytilasta');

  /*
   * EUROOPAN ERÄ 27.8.2026, kumpikin esitystapa kerran. Tuileries on
   * purettu 1883 → tähti ja pelkkä ihmekuva. St Paulin katedraali on
   * paikallaan, mutta ihmekuvassa on sen EDELTÄJÄ — siksi selitteen on
   * sanottava se, tai kuva väittäisi väärää rakennusta.
   */
  const { FOKUSKOHTEET_FRA } = await import('../js/packs/fokuskohteet-fra.js');
  const { FOKUSKOHTEET_GBR } = await import('../js/packs/fokuskohteet-gbr.js');
  const tuileries = FOKUSKOHTEET_FRA.find((k) => k.id === 'tuileries');
  const stPaul = FOKUSKOHTEET_GBR.find((k) => k.id === 'st-paulin-katedraali');
  assert.equal(tuileries.ihme.kadonnut, true, 'Tuileries purettiin 1883');
  assert.equal(tuileries.kuva, undefined, 'puretusta palatsista ei ole valokuvaa');
  assert.equal(stPaul.ihme.kadonnut, false, 'Ludgate Hillin katedraali on paikallaan');
  assert.ok(/EDELTÄJÄ/.test(stPaul.ihme.selite),
    'vanhan St Paulin selite kertoo kuvan olevan nykyisen edeltäjä');

  /*
   * MAAILMAN ERÄ 27.8.2026. Kolme vartiota, jotka kaikki koskevat
   * esitystavan valintaa — sitä, mitä pelaaja näkee kartalla ja
   * kortissa. Väärä valinta ei kaataisi mitään, mutta valehtelisi.
   *
   *   1. BAMIYAN ON TÄHTI, VAIKKA PAIKKA ON OLEMASSA. Kallio ja
   *      syvennykset ovat pystyssä, mutta KOHDE on patsaat, ja ne
   *      tuhottiin 2001. Perustelu kokonaisuudessaan
   *      js/packs/fokuskohteet-afg.js:n alussa. Selitteen on silti
   *      sanottava, että kallio ja syvennykset ovat paikallaan, tai
   *      pelaaja luulisi koko laakson kadonneen.
   *   2. AL-KHAZNEH JA SUURI ZIMBABWE OVAT "KOE IHME" -KOHTEITA,
   *      koska kivi on paikallaan; kadonnut on kaupunki niiden
   *      ympäriltä. Kummallakin on siis oltava nykytilan valokuva.
   *   3. KHEOPSIN PYRAMIDI ON "KOE IHME", vaikka ihmekuvassa on
   *      kadonnut kalkkikivikuori. Pyramidi itse on antiikin
   *      seitsemästä ihmeestä ainoa pystyssä oleva, joten tähti olisi
   *      suoranainen virhe.
   */
  const { FOKUSKOHTEET_AFG } = await import('../js/packs/fokuskohteet-afg.js');
  const { FOKUSKOHTEET_JOR } = await import('../js/packs/fokuskohteet-jor.js');
  const { FOKUSKOHTEET_ZWE } = await import('../js/packs/fokuskohteet-zwe.js');
  const { FOKUSKOHTEET_EGY } = await import('../js/packs/fokuskohteet-egy.js');
  const buddhat = FOKUSKOHTEET_AFG.find((k) => k.id === 'bamiyanin-buddhat');
  const khazneh = FOKUSKOHTEET_JOR.find((k) => k.id === 'al-khazneh');
  const zimbabwe = FOKUSKOHTEET_ZWE.find((k) => k.id === 'suuri-zimbabwe');
  const pyramidi = FOKUSKOHTEET_EGY.find((k) => k.id === 'gizan-suuri-pyramidi');
  assert.equal(buddhat.ihme.kadonnut, true, 'Bamiyanin patsaat tuhottiin 2001');
  assert.equal(buddhat.kuva, undefined, 'tuhotuista patsaista ei ole valokuvaa');
  assert.ok(/syvennykse/i.test(buddhat.ihme.selite),
    'Bamiyanin selite kertoo kallion ja syvennysten olevan yhä paikallaan');
  assert.equal(khazneh.ihme.kadonnut, false, 'Al-Khazneh on kalliossa tallella');
  assert.ok(khazneh.kuva?.tiedosto, 'Al-Khaznesta on valokuva nykytilasta');
  assert.equal(zimbabwe.ihme.kadonnut, false, 'Suuren Zimbabwen muurit ovat pystyssä');
  assert.ok(zimbabwe.kuva?.tiedosto, 'Suuresta Zimbabwesta on valokuva nykytilasta');
  assert.equal(pyramidi.ihme.kadonnut, false,
    'Kheopsin pyramidi on antiikin ihmeistä ainoa pystyssä oleva');
  assert.ok(pyramidi.kuva?.tiedosto, 'pyramidista on valokuva nykytilasta');

  /*
   * VÄLIMEREN ERÄ 27.8.2026. Neljä vartiota, jotka kaikki koskevat
   * esitystapaa — sitä, mitä pelaaja näkee kartalla ja kortissa.
   * Väärä valinta ei kaataisi mitään, mutta valehtelisi.
   *
   *   1. SIIRRETTY ON KADONNUT, MUTTA SELITTEEN ON KERROTTAVA MINNE.
   *      Ishtarin porttia ja Pergamonin alttaria ei tuhottu: ne ovat
   *      Berliinin Pergamonmuseumissa, ja paikalla on jäljennös tai
   *      pelkkä perustus. Kohde itse ei ole paikallaan, joten tähti
   *      on oikein — mutta ilman Berliini-mainintaa tähti väittäisi
   *      kohteen hävinneen (omistajan linjaus 27.8.2026). Vartio
   *      vaatii sanan "Berliini" kummankin selitteestä.
   *   2. KARTHAGON SATAMA ON TÄHTI, VAIKKA ALLAS ON YHÄ MAASTOSSA.
   *      Kohde on sotasatama rakennelmana — vajat, pylväikkö ja
   *      amiraalin paviljonki — eikä sitä ole. Selitteen on silti
   *      sanottava, että allas on paikallaan, tai pelaaja luulisi
   *      koko paikan kadonneen. Sama muotoilun sääntö kuin
   *      Bamiyanilla yllä.
   *   3. COLOSSEUM JA THEODOSIUKSEN MUURIT OVAT "KOE IHME"
   *      -KOHTEITA. Molemmat seisovat, joten kummallakin on oltava
   *      nykytilan valokuva. Tähti olisi suoranainen virhe.
   *   4. LEPTIS MAGNA ON "KOE IHME" JA SEN SELITE VIITTAA VUOTEEN
   *      1873. Kaupunki oli isoisän matkan aikaan dyynien alla, ja
   *      juuri se on kohteen ihme — sitä ei saa pudottaa pois
   *      selitettä lyhennettäessä.
   */
  const { FOKUSKOHTEET_IRQ } = await import('../js/packs/fokuskohteet-irq.js');
  const { FOKUSKOHTEET_TUR } = await import('../js/packs/fokuskohteet-tur.js');
  const { FOKUSKOHTEET_TUN } = await import('../js/packs/fokuskohteet-tun.js');
  const { FOKUSKOHTEET_LBY } = await import('../js/packs/fokuskohteet-lby.js');
  const { FOKUSKOHTEET_ITA } = await import('../js/packs/fokuskohteet-ita.js');
  const portti = FOKUSKOHTEET_IRQ.find((k) => k.id === 'ishtarin-portti');
  const alttari = FOKUSKOHTEET_TUR.find((k) => k.id === 'pergamonin-alttari');
  const satama = FOKUSKOHTEET_TUN.find((k) => k.id === 'karthagon-sotasatama');
  const leptis = FOKUSKOHTEET_LBY.find((k) => k.id === 'leptis-magna');
  const colosseum = FOKUSKOHTEET_ITA.find((k) => k.id === 'colosseum');
  const muurit = FOKUSKOHTEET_TUR.find((k) => k.id === 'theodosiuksen-muurit');
  for (const siirretty of [portti, alttari]) {
    assert.equal(siirretty.ihme.kadonnut, true,
      `${siirretty.id}: kohde ei ole enää paikallaan`);
    assert.equal(siirretty.kuva, undefined,
      `${siirretty.id}: siirretystä kohteesta ei ole paikan päällä valokuvaa`);
    assert.ok(/Berliini/.test(siirretty.ihme.selite),
      `${siirretty.id}: selitteen on kerrottava, että kohde on Berliinissä`);
  }
  assert.equal(satama.ihme.kadonnut, true, 'sotasataman rakennelmat ovat poissa');
  assert.ok(/allas/i.test(satama.ihme.selite),
    'Karthagon selite kertoo altaan olevan yhä maastossa');
  assert.equal(colosseum.ihme.kadonnut, false, 'Colosseum on pystyssä');
  assert.ok(colosseum.kuva?.tiedosto, 'Colosseumista on valokuva nykytilasta');
  assert.equal(muurit.ihme.kadonnut, false, 'Theodosiuksen muurit ovat pystyssä');
  assert.ok(muurit.kuva?.tiedosto, 'muureista on valokuva nykytilasta');
  assert.equal(leptis.ihme.kadonnut, false, 'Leptis Magnan rauniot ovat pystyssä');
  assert.ok(leptis.kuva?.tiedosto, 'Leptis Magnasta on valokuva nykytilasta');
  assert.ok(/1873/.test(leptis.ihme.selite),
    'Leptis Magnan selite kertoo kaupungin nukkuneen dyynien alla isoisän aikaan');
});

/*
 * JOKAISELLA KATEGORIALLA ON OMA VIIVAMERKKI KARTALLA (27.8.2026 ilta, omistajan
 * palaute laitteelta v1211: raskaat mustepiirrokset vaihtuivat
 * poltetun vuorikolmion tyylisiin viivamerkkeihin).
 *
 * Tuntematon kategoria putoaa huutomerkkiin (nostosymMiniTunnus), ja
 * se on kartalla täysin äänetön virhe: merkki piirtyy, kortti kertoo
 * oikean luokan eikä mikään kaadu — vain skandaalin merkki lupaa
 * väärää. Uuden kategorian lisääjä huomaa puutteen tästä.
 */
test('jokaisella symbolikategorialla on oma viivamerkki kartalla', async () => {
  const { NOSTOSYM_TYYPIT, nostosymMiniTunnus } = await import('../js/fokusnosto-symbolit.js');
  for (const tyyppi of NOSTOSYM_TYYPIT) {
    const tunnus = nostosymMiniTunnus(tyyppi);
    if (tyyppi === 'huuto') {
      assert.equal(tunnus, 'huuto');
      continue;
    }
    assert.notEqual(tunnus, 'huuto', `kategorialta ${tyyppi} puuttuu viivamerkki`);
  }
  /*
   * LUONNOLLA ON KAKSI MUOTOA: kallio ja vesi. Kortin ylärivi puhuu
   * yhdestä Luonto-luokasta, mutta kartalla vuori on kolmio ja meri
   * aaltoviiva — juuri se pari, jonka omistaja nimesi.
   */
  assert.equal(nostosymMiniTunnus('luonto', 'vuori'), 'vuori');
  assert.equal(nostosymMiniTunnus('luonto', 'saari'), 'vuori');
  assert.equal(nostosymMiniTunnus('luonto', 'meri'), 'meri');
  assert.equal(nostosymMiniTunnus('luonto', 'joki'), 'meri');
});
