// Vanhan maailman yhdistämisen tarkistukset.
//
// Työkalu kääntää nykyisten lautojen x/y takaisin oikeiksi sijainneiksi.
// Kaavat ovat kunkin pakettitiedoston alkukommentissa, ja jos paketin
// kaavaa joskus muutetaan, käänteinen on muutettava mukana. Muuten
// kaupungit valuisivat hiljaa väärille paikoille yhdistetyllä kartalla —
// eikä sitä huomaisi kuin katsomalla karttaa tarkkaan.

import test from 'node:test';
import assert from 'node:assert/strict';

import { miller, KAANTEISET, sovita, rannikot } from '../tools/vanha-maailma.mjs';
import { PACKS } from '../js/pack.js';

/** Karkea etäisyys kilometreinä. */
function km(lon1, lat1, lon2, lat2) {
  const keski = ((lat1 + lat2) / 2) * (Math.PI / 180);
  return Math.hypot((lon1 - lon2) * 111 * Math.cos(keski), (lat1 - lat2) * 111);
}

test('Miller-projektio kääntyy takaisin itsekseen', () => {
  for (const [lon, lat] of [[0, 0], [24.9, 60.2], [-9.1, 38.7], [139.7, 35.7], [18.4, -33.9]]) {
    const [x, y] = miller.eteen(lon, lat);
    const [lon2, lat2] = miller.taakse(x, y);
    assert.ok(Math.abs(lon - lon2) < 1e-9, `pituusaste ${lon} → ${lon2}`);
    assert.ok(Math.abs(lat - lat2) < 1e-9, `leveysaste ${lat} → ${lat2}`);
  }
});

test('Miller pitää pohjoisen kurissa toisin kuin Mercator', () => {
  // Juuri tämän takia Miller valittiin: Mercatorilla 70° venyy niin, että
  // Lappi ja Tromssa paisuisivat mahdottomiksi.
  const [, ekvaattori] = miller.eteen(0, 0);
  const [, pohjoinen] = miller.eteen(0, 70);
  const [, mercator70] = [0, -Math.log(Math.tan(Math.PI / 4 + 70 * (Math.PI / 180) / 2))];
  assert.ok(Math.abs(pohjoinen - ekvaattori) < Math.abs(mercator70),
    'Millerin pitäisi litistää pohjoista vähemmän kuin Mercatorin');
});

test('käänteiskaavat vievät kaupungit oikeille paikoilleen', () => {
  // Todelliset sijainnit (Wikipedia).
  //
  // Raja on lautakohtainen, koska osa kaupungeista on TARKOITUKSELLA
  // siirretty paikaltaan. Afrikan rannikko on pelkistetty (93 pistettä
  // koko mantereelle), ja kaupunkeja on siirretty osumaan siihen —
  // Kapkaupunki on 120 km ja Nairobi yli 400 km sivussa. Euroopassa ja
  // Lähi-idässä rannikko on tarkka, joten siellä siirrot ovat pieniä.
  //
  // Testi ei vartioi kaupunkien paikkoja vaan KAAVAA: rikkoutunut kaava
  // heittäisi tuhansia kilometrejä, ei satoja.
  const oikea = {
    europe: {
      raja: 100,
      lontoo: [-0.13, 51.51], rooma: [12.50, 41.90], ateena: [23.73, 37.98],
      moskova: [37.62, 55.75], lissabon: [-9.14, 38.72],
    },
    africa: {
      raja: 500,
      kairo: [31.24, 30.04], tanger: [-5.80, 35.77], kapkaupunki: [18.42, -33.93],
    },
    middleeast: {
      raja: 100,
      bagdad: [44.36, 33.31], mekka: [39.83, 21.42], jerusalem: [35.21, 31.78],
    },
  };
  for (const [lauta, { raja, ...kaupungit }] of Object.entries(oikea)) {
    const pack = PACKS.find((p) => p.id === lauta);
    for (const [id, [olon, olat]] of Object.entries(kaupungit)) {
      const c = pack.cities.find((x) => x.id === id);
      assert.ok(c, `${lauta}: kaupunkia ${id} ei löydy`);
      const [lon, lat] = KAANTEISET[lauta](c.x, c.y);
      const virhe = km(lon, lat, olon, olat);
      assert.ok(virhe < raja, `${lauta}/${id}: ${virhe.toFixed(0)} km sivussa (raja ${raja})`);
    }
  }
});

test('sovitus mahtuu laudalle eikä väännä mittasuhteita', () => {
  const ryhmat = [[[0, 0], [1, 0.5]], [[0.25, 0.25]]];
  const { muunna, korkeus, skaala } = sovita(ryhmat, { leveys: 1000, marginaali: 10 });
  const [x0, y0] = muunna([0, 0]);
  const [x1] = muunna([1, 0]);
  assert.equal(x0, 10, 'vasen reuna marginaalille');
  assert.equal(x1, 990, 'oikea reuna marginaalille');
  assert.ok(y0 >= 10, 'ylin piste marginaalin sisään');
  // Sama mittakaava molempiin suuntiin: puolet leveydestä = puolet korkeutta.
  const [, yPuoli] = muunna([0, 0.5]);
  assert.ok(Math.abs((yPuoli - y0) - 0.5 * skaala) < 0.2, 'pystymittakaava eroaa vaakamittakaavasta');
  assert.ok(korkeus > 0);
});

test('rannikkojen karsinta säilyttää muodon mutta pudottaa pisteitä', () => {
  // Suorakaide, jonka sivuilla on turhia välipisteitä: karsinnan pitää
  // pudottaa ne mutta säilyttää nurkat.
  const rengas = [];
  for (let i = 0; i <= 20; i++) rengas.push([i / 20 * 10, 0]);
  for (let i = 1; i <= 20; i++) rengas.push([10, i / 20 * 10]);
  for (let i = 1; i <= 20; i++) rengas.push([10 - i / 20 * 10, 10]);
  for (let i = 1; i <= 20; i++) rengas.push([0, 10 - i / 20 * 10]);
  const geo = { features: [{ geometry: { type: 'Polygon', coordinates: [rengas] } }] };
  // Alue kattaa muodon; toleranssi on projisoiduissa yksiköissä.
  // minPisteet alas, koska karsittu suorakaide on vain nurkkansa — oletus
  // (12) on saariin tarkoitettu roskasuodatin ja pudottaisi tämän.
  const ulos = rannikot(
    geo, { lon0: -1, lon1: 11, lat0: -1, lat1: 11 }, { toleranssi: 0.001, minPisteet: 4 },
  );
  assert.equal(ulos.length, 1);
  assert.ok(ulos[0].length < rengas.length, 'karsinta ei pudottanut yhtään pistettä');
  assert.ok(ulos[0].length >= 4, 'nurkat katosivat karsinnassa');
});

test('yhdistetty kartta löytää päällekkäiset porttikaupungit', async () => {
  const { kaupungit } = await import('../tools/vanha-maailma.mjs');
  const { kaupungit: lista, paallekkaiset } = await kaupungit();
  // Neljän laudan kaupungit yhtenä listana, ilman kaksoiskappaleita.
  const idt = lista.map((c) => c.id);
  assert.equal(new Set(idt).size, idt.length, 'sama kaupunki kahdesti listassa');
  // Istanbul, Kairo ja Teheran ovat kahdella laudalla — yhdistetyllä
  // kartalla niitä on yksi. Jos tämä luku muuttuu, joku on lisännyt tai
  // poistanut porttikaupungin ja sisältö pitää käydä läpi.
  const paallekkaisetIdt = paallekkaiset.map(([id]) => id).sort();
  assert.deepEqual(paallekkaisetIdt, ['istanbul', 'kairo', 'teheran']);
  assert.ok(lista.length > 130, `kaupunkeja pitäisi olla yli 130, nyt ${lista.length}`);
});

test('yhdistetty reittiverkko on yhtenäinen', async () => {
  // Tämä on koko yhdistämisen tärkein rakenteellinen tulos: reittejä ei
  // tarvitse keksiä uusiksi. Samat kaupunkiparit ovat yhä naapureita, ja
  // koska porttikaupungit (Istanbul, Kairo, Teheran) sulautuvat yhdeksi,
  // neljä erillistä verkkoa liittyy niiden kohdalla itsestään.
  //
  // Jos tämä testi punastuu, joku on poistanut porttikaupungin tai sen
  // reitin, ja kartta on hajonnut osiin — pelaaja jäisi jumiin
  // mantereelle, josta ei pääse pois.
  const { reitit, kaupungit } = await import('../tools/vanha-maailma.mjs');
  const { kaupungit: kaup } = await kaupungit();
  const tiet = await reitit();

  const naapurit = new Map(kaup.map((c) => [c.id, []]));
  for (const t of tiet) {
    naapurit.get(t.a)?.push(t.b);
    naapurit.get(t.b)?.push(t.a);
  }

  const nahty = new Set([kaup[0].id]);
  const jono = [kaup[0].id];
  while (jono.length) {
    const x = jono.pop();
    for (const n of naapurit.get(x) ?? []) {
      if (!nahty.has(n)) { nahty.add(n); jono.push(n); }
    }
  }

  const saavuttamattomat = kaup.filter((c) => !nahty.has(c.id)).map((c) => c.id);
  assert.deepEqual(saavuttamattomat, [],
    `kartta hajosi osiin — näihin ei pääse: ${saavuttamattomat.join(', ')}`);
  assert.ok(tiet.length > 200, `reittejä pitäisi olla yli 200, nyt ${tiet.length}`);
});

test('porttikaupungit yhdistävät mantereet', async () => {
  const { reitit } = await import('../tools/vanha-maailma.mjs');
  const tiet = await reitit();
  // Jokaisella portilla pitää olla reittejä molemmilta puolilta: ilman
  // niitä sauma aukeaisi ja verkko hajoaisi osiin.
  for (const portti of ['istanbul', 'kairo', 'teheran']) {
    const naapureita = tiet.filter((t) => t.a === portti || t.b === portti).length;
    assert.ok(naapureita >= 2, `${portti}: vain ${naapureita} reittiä — sauma ei kanna`);
  }
});

test('nimien sijoitus välttää päällekkäisyydet', async () => {
  const { sijoita, laatikko } = await import('../tools/nimien-paikat.mjs');
  // Kolme kaupunkia lähes päällekkäin: sijoittajan on löydettävä
  // kullekin oma suunta, muuten nimet menevät lukukelvottomiksi.
  const kaupungit = [
    { id: 'a', nimi: 'Ankara', x: 500, y: 500 },
    { id: 'b', nimi: 'Bagdad', x: 530, y: 510 },
    { id: 'c', nimi: 'Kairo', x: 505, y: 545 },
  ];
  const leveydet = new Map([['a', 70], ['b', 70], ['c', 60]]);
  const { paikat, pulmat } = sijoita(kaupungit, leveydet, []);
  assert.equal(paikat.size, 3);

  // Tarkistetaan tulos itse: yksikään laatikko ei saa leikata toista.
  const laatikot = kaupungit.map((c) => laatikko(c, paikat.get(c.id), leveydet.get(c.id)));
  for (let i = 0; i < laatikot.length; i++) {
    for (let j = i + 1; j < laatikot.length; j++) {
      const [a, b] = [laatikot[i], laatikot[j]];
      const leikkaa = a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1;
      assert.ok(!leikkaa,
        `${kaupungit[i].nimi} ja ${kaupungit[j].nimi} menevät päällekkäin`);
    }
  }
  assert.deepEqual(pulmat, [], 'kolmen kaupungin pitäisi mahtua');
});

test('nimi ei jää kaupunkiympyrän alle', async () => {
  const { sijoita, laatikko } = await import('../tools/nimien-paikat.mjs');
  // Yksinäinen kaupunki: nimi ei saa peittää omaa ympyräänsä, muuten
  // nappulaa ei näe eikä laattaa voi napauttaa.
  const kaupungit = [{ id: 'a', nimi: 'Timbuktu', x: 300, y: 300 }];
  const { paikat } = sijoita(kaupungit, new Map([['a', 80]]), []);
  const l = laatikko(kaupungit[0], paikat.get('a'), 80);
  const ympyra = { x0: 300 - 16, x1: 300 + 16, y0: 300 - 16, y1: 300 + 16 };
  const leikkaa = l.x0 < ympyra.x1 && ympyra.x0 < l.x1 && l.y0 < ympyra.y1 && ympyra.y0 < l.y1;
  assert.ok(!leikkaa, 'nimi peittää oman kaupunkinsa ympyrän');
});

/*
 * Vanhan maailman kaupungit maailmankartalla.
 *
 * Maailmankartta korvasi vanhan maailman ja toi mukanaan Amerikat ja
 * Oseanian. Näiden testien tehtävä on yhä sama kuin ennen: vartioida
 * ettei yhdistäminen vie sisältöä pois niiltä kaupungeilta, joilla se
 * oli. Uusilta kaupungeilta sisältö puuttuu tieten tahtoen, eikä tämä
 * ole se paikka, joka siitä huomauttaa.
 */
/*
 * KAARETTOMAT KAUPUNGIT — tietoinen poikkeus, EI löysennys.
 *
 * Omistajan linjaus (Raamattu, Kaupunkilehdet-osio, 17.8.2026 / v811):
 * "UUSIIN KAUPUNKEIHIN JA MAIHIN EI VIELÄ TARINAKAARTA — ei
 * matkakirjatekstejä, ei kohtaamisia; kaari kirjoitetaan myöhemmin
 * uuden mallin mukaan." Näiltä kahdeksalta 17.8.2026 lisätyltä
 * kaupungilta vaaditaan siksi toistaiseksi vain tiesitkö-tiedot ja
 * kysymykset (rules.test.mjs vartioi ne) — EI saapumistekstiä eikä
 * omaa artikkelia. Kun kaupungin kaari kirjoitetaan, se POISTETAAN
 * tästä listasta, jolloin alla olevat testit alkavat taas vaatia
 * siltä kaiken. Listaan ei lisätä kaupunkeja ilman omistajan
 * linjausta.
 */
const KAARETTOMAT = new Set([
  'kioto', 'varanasi', 'mandalay', 'kanton', // asia
  'sevilla', 'bergen', // europe
  'fes', 'lalibela', // africa
]);

async function vanhanMaailmanKaupungit() {
  const { PACKS } = await import('../js/pack.js');
  const lahteet = ['europe', 'africa', 'middleeast', 'asia'];
  const omat = new Set();
  for (const id of lahteet) {
    for (const c of PACKS.find((p) => p.id === id).cities) omat.add(c.id);
  }
  const pack = PACKS.find((p) => p.id === 'maailmankartta');
  return { pack, kaupungit: pack.cities.filter((c) => omat.has(c.id)) };
}

test('jokaisella vanhan maailman kaupungilla on saapumisteksti', async () => {
  const { PACKS } = await import('../js/pack.js');
  const { AFRICA_SAAPUMISET } = await import('../js/packs/africa-saapumiset.js');
  const { EUROPE_SAAPUMISET } = await import('../js/packs/europe-saapumiset.js');
  const { ASIA_SAAPUMISET } = await import('../js/packs/asia-saapumiset.js');
  const tekstit = { ...AFRICA_SAAPUMISET, ...EUROPE_SAAPUMISET, ...ASIA_SAAPUMISET };
  const { kaupungit } = await vanhanMaailmanKaupungit();
  const ilman = kaupungit
    .filter((c) => !KAARETTOMAT.has(c.id))
    .filter((c) => !tekstit[c.id]).map((c) => c.id);
  assert.deepEqual(ilman, [], 'näiltä kaupungeilta puuttuu matkakirjan merkintä');
  // Kaarettomalle EI myöskään saa kirjoittaa merkintää listaa
  // purkamatta: teksti ilman listan siivousta ohittaisi vartioinnin.
  const salaa = kaupungit.filter((c) => KAARETTOMAT.has(c.id) && tekstit[c.id]).map((c) => c.id);
  assert.deepEqual(salaa, [], 'kaupungilla on merkintä mutta se on yhä KAARETTOMAT-listalla');
});

test('saapumistekstissä on molemmat äänet', async () => {
  const { ASIA_SAAPUMISET } = await import('../js/packs/asia-saapumiset.js');
  // Merkintä on kahden äänen vuoropuhelu: nuoren herran tuore havainto
  // ja isoisän kirjan lainaus. Ilman jälkimmäistä kortti on pelkkä
  // matkaopas, ja koko kehyskertomus katoaa.
  for (const [id, t] of Object.entries(ASIA_SAAPUMISET)) {
    assert.ok(t.kuvaus?.length > 80, `${id}: kuvaus liian lyhyt`);
    assert.ok(t.nosto?.length > 50, `${id}: nosto liian lyhyt`);
    assert.match(t.nosto, /[Ii]soisä/, `${id}: nostosta puuttuu isoisän ääni`);
  }
});

test('radiolähetykset ovat salattuja', async () => {
  const { RADIOT, radioMaalle } = await import('../js/packs/radiot.js');
  // Peli tarjoillaan https:llä, ja selain estää salaamattoman
  // äänivirran kokonaan. Yksikin http-osoite tarkoittaa napin, joka
  // ei koskaan soi.
  for (const [maa, r] of Object.entries(RADIOT)) {
    assert.match(r.url, /^https:\/\//, `${maa}: ${r.asema} ei ole https`);
    assert.ok(r.asema?.length, `${maa}: asemalta puuttuu nimi`);
  }
  assert.equal(radioMaalle('EI_OLE'), null);
  assert.equal(radioMaalle(undefined), null);
});

test('jokaisella omalla artikkelilla on luettava teksti', async () => {
  const { OMAT_ARTIKKELIT } = await import('../js/packs/africa-artikkelit.js');
  const { EUROPE_ARTIKKELIT } = await import('../js/packs/europe-artikkelit.js');
  const kaikki = { ...OMAT_ARTIKKELIT, ...EUROPE_ARTIKKELIT };
  /*
   * Kenttä on kahdella nimellä: vanhemmissa `artikkeli`, uudemmissa
   * `teksti`. Renderöinti luki vain ensimmäistä, ja 69 paikan kohdalla
   * "Lue lisää" kaatui undefinediin. Tämä testi vahtii, että kentän
   * nimi on toinen kahdesta — kumpi tahansa, mutta ei kumpikaan
   * puuttuen.
   */
  for (const [nimi, a] of Object.entries(kaikki)) {
    const teksti = a.artikkeli ?? a.teksti ?? null;
    assert.ok(typeof teksti === 'string' && teksti.length > 200,
      `${nimi}: artikkelin teksti puuttuu (kentät: ${Object.keys(a).join(', ')})`);
    assert.ok(a.intro?.length > 60, `${nimi}: introa ei ole`);
  }
});

test('radioaseman nimi mahtuu napin otsikoksi', async () => {
  const { RADIOT } = await import('../js/packs/radiot.js');
  /*
   * Nimi näkyy napin title-tekstinä, joten se ei saa olla lause.
   * Tutkitut ehdotukset tulivat muodossa "Radio 9090 (Kairo) – puhe
   * ja ajankohtaisohjelmat", ja katkaisu jätti aluksi puolikkaan
   * sulun perään.
   */
  for (const [maa, r] of Object.entries(RADIOT)) {
    assert.ok(r.asema.length <= 52, `${maa}: nimi liian pitkä (${r.asema.length})`);
    const auki = (r.asema.match(/\(/g) ?? []).length;
    const kiinni = (r.asema.match(/\)/g) ?? []).length;
    assert.equal(auki, kiinni, `${maa}: sulut eivät täsmää — ${r.asema}`);
  }
});

test('jokaisella vanhan maailman maalla on radiolähetys', async () => {
  const { PACKS } = await import('../js/pack.js');
  const { RADIOT } = await import('../js/packs/radiot.js');
  const { pack, kaupungit } = await vanhanMaailmanKaupungit();
  const maat = [...new Set(kaupungit.map((c) => pack.map.cityCountry?.[c.id]).filter(Boolean))];
  /*
   * RUS on ILMAN radiota tarkoituksella (omistajan linjaus 13.8.2026:
   * valtiollista tai sensuroitua mediaa ei oteta lähteeksi; Fable
   * poisti Vesti FM:n 14.8.2026 — ks. js/packs/radiot.js). Muille
   * maille puuttuva lähetys on yhä virhe.
   */
  const tarkoituksella = new Set(['RUS']);
  const ilman = maat.filter((m) => !RADIOT[m] && !tarkoituksella.has(m)).sort();
  assert.deepEqual(ilman, [], 'näiltä mailta puuttuu suora lähetys');
});

test('jokaisella vanhan maailman kaupungilla on oma artikkeli', async () => {
  const { PACKS } = await import('../js/pack.js');
  const { OMAT_ARTIKKELIT } = await import('../js/packs/africa-artikkelit.js');
  const { EUROPE_ARTIKKELIT } = await import('../js/packs/europe-artikkelit.js');
  const { ASIA_ARTIKKELIT } = await import('../js/packs/asia-artikkelit.js');
  const kaikki = { ...OMAT_ARTIKKELIT, ...EUROPE_ARTIKKELIT, ...ASIA_ARTIKKELIT };
  const { kaupungit } = await vanhanMaailmanKaupungit();
  const ilman = kaupungit
    .filter((c) => !KAARETTOMAT.has(c.id))
    .filter((c) => !kaikki[c.wiki ?? c.name]).map((c) => c.id);
  assert.deepEqual(ilman, [], 'näiltä kaupungeilta puuttuu oma artikkeli');
});

test('Aasian artikkelit noudattavat talon mittaa', async () => {
  const { ASIA_ARTIKKELIT } = await import('../js/packs/asia-artikkelit.js');
  /*
   * Omistajan huomio Wikipedian teksteistä: "Ovat yleensä liian pitkiä
   * ja tyyli vaihtelee." Siksi mitta on osa muotoa eikä makuasia:
   * kolme kappaletta ja alle tuhat merkkiä, jotta kortti pysyy
   * luettavana ja kaupungit keskenään samanmittaisina.
   */
  for (const [nimi, a] of Object.entries(ASIA_ARTIKKELIT)) {
    assert.equal(a.teksti.split('\n\n').length, 3, `${nimi}: ei kolmea kappaletta`);
    assert.ok(a.teksti.length > 600 && a.teksti.length < 1100,
      `${nimi}: teksti ${a.teksti.length} merkkiä (600–1100)`);
    /*
     * Intron mitta muuttui 20.8.2026 (Raamattu, "TEKSTIEN
     * PAINOPISTE"): etusivun leipäteksti on 7–10 virkkeen johdatus
     * (~700–1200 mrk). Vanhat lyhyet introt (100–280) sallitaan
     * kunnes tekstiremontti on käynyt kaikki kaupungit läpi — sen
     * jälkeen alaraja nostetaan 600:aan.
     */
    assert.ok(a.intro.length > 100 && a.intro.length < 1200,
      `${nimi}: intro ${a.intro.length} merkkiä (100–1200)`);
    assert.ok(!/[!]/.test(a.teksti + a.intro), `${nimi}: huutomerkki ei kuulu artikkeliin`);
  }
});

test('kaupunki on oman maansa rajojen sisällä', async () => {
  const { PACKS } = await import('../js/pack.js');
  const pack = PACKS.find((p) => p.id === 'maailmankartta');
  const { cityCountry: maat = {}, countryShapes: rajat = {} } = pack.map;

  const sisalla = (piste, rengas) => {
    let osuu = false;
    for (let i = 0, j = rengas.length - 1; i < rengas.length; j = i++) {
      const [xi, yi] = rengas[i];
      const [xj, yj] = rengas[j];
      if ((yi > piste[1]) !== (yj > piste[1])
        && piste[0] < ((xj - xi) * (piste[1] - yi)) / (yj - yi) + xi) osuu = !osuu;
    }
    return osuu;
  };

  /*
   * Kumpikaan ehto ei yksin riitä.
   *
   * Pelkkä etäisyys hylkäisi Riian: rannikkokaupungit on siirretty
   * lähimpään maakohtaan, ja Riika jää 40 yksikköä yksinkertaistetun
   * Latvian ulkopuolelle täysin oikein merkittynä.
   *
   * Pelkkä "piste on toisessa maassa" hylkäisi Tallinnan, Dubrovnikin
   * ja Kilimanjaron: ne ovat rajan tuntumassa, ja 50m-aineiston
   * harvennettu raja kulkee paikoin väärältä puolelta. Niiden
   * maamerkintä on silti oikea.
   *
   * Merkintävirhe on se, jossa MOLEMMAT pätevät: piste on toisen maan
   * sisällä eikä ole oman maansa rajan tuntumassa. Rub al-Khali oli
   * kirjattu Arabiemiirikuntiin 84 yksikön päähän sen rajasta, ja
   * piste oli keskellä Saudi-Arabiaa.
   */
  const REUNA = 60;
  const vaarat = [];
  for (const c of pack.cities) {
    const oma = maat[c.id];
    if (!rajat[oma]) continue;
    if (rajat[oma].renkaat.some((r) => sisalla([c.x, c.y], r))) continue;
    const etaisyys = Math.min(...rajat[oma].renkaat.flat()
      .map(([x, y]) => Math.hypot(x - c.x, y - c.y)));
    if (etaisyys <= REUNA) continue;
    const toinen = Object.entries(rajat)
      .find(([iso, maa]) => iso !== oma && maa.renkaat.some((r) => sisalla([c.x, c.y], r)));
    if (toinen) vaarat.push(`${c.id}: merkitty ${oma}, mutta piste on keskellä maata ${toinen[0]}`);
  }
  assert.deepEqual(vaarat, [], 'nämä kaupungit on merkitty väärään maahan');
});

test('suomenkielisistä teksteistä ei puutu ä- ja ö-kirjaimia', async () => {
  const { readFileSync, readdirSync } = await import('node:fs');
  const { join } = await import('node:path');
  /*
   * Apurien kirjoittamista teksteistä jäi kerran neljännes ä- ja
   * ö-kirjaimista pois ("lahtee", "paiva", "Vahan-Aasia"). Syy oli
   * ohjeessa: kirjoitin sen itse ilman niitä, ja esimerkki voitti
   * käskyn. Virhettä ei näe silmäilemällä — teksti näyttää suomelta.
   *
   * KAKSI VÄÄRÄÄ YRITYSTÄ ennen tätä:
   *  1. Osuus tiedoston merkeistä. Maatiedot putosivat läpi: ne ovat
   *     enimmäkseen numeroita ja verkko-osoitteita.
   *  2. Osuus proosasta. Kulttuurinostot putosivat läpi: niissä on
   *     paljon vieraskielisiä nimiä ja lisenssitekstiä.
   * Kummassakin mittari mittasi kieltä keskiarvona, ja keskiarvo
   * vaihtelee tiedostosta toiseen ilman että mikään on vialla.
   *
   * Tämä versio ei mittaa keskiarvoa vaan etsii NIMETTYJÄ SANOJA,
   * jotka eivät voi olla oikein ilman umlauttia. Lista on
   * tarkoituksella lyhyt ja yksiselitteinen: mukana ei ole sanoja,
   * joilla on umlautiton merkitys (lahti, vaha, jaa, kasi, tuli).
   */
  const EPASANAT = [
    'paiva', 'paivan', 'paivaa', 'paivat', 'paivina',
    'kaytto', 'kayttaa', 'kaytetaan', 'kaytti', 'kaytossa',
    'nakyy', 'nakee', 'naki', 'nahda', 'nakyvat',
    // 'aani' ei ole listalla: se on kenttänimi (aani: '<osoite>') ja
    // tiedostonimi (js/aani-ehdokkaat.js). Koodin tunnukset ovat
    // tarkoituksella umlautittomia, eikä niitä pidä korjata.
    'aanen', 'aania', 'aanet',
    'tarkea', 'tarkein', 'tarkeaa',
    'taynna', 'tayttaa', 'taydellinen',
    'lahtee', 'lahtevat', 'lahdossa',
    'maara', 'maaran', 'maaraa',
    'jalkeen', 'jaljella', 'jaljelle',
    'vahintaan', 'enintaan', 'vahemman',
    'elama', 'elaman', 'elamaa',
    'ymparilla', 'ymparille', 'ympari',
    'sailyy', 'paattyy', 'kaantyy', 'kasitys',
    'lampo', 'lammin', 'tyontaa', 'myohemmin', 'loytyy', 'loysi',
  ];
  const hahmo = new RegExp(`\\b(${EPASANAT.join('|')})\\b`, 'gi');

  /*
   * YKSI VIERASKIELINEN POIKKEUS: arabian nahda.
   *
   * Salalahin kohdekartalla on Burj an-Nahda, kaupungin kellotorni, ja
   * sen Commons-tiedosto on nimeltään "Salalah, torre al nahda 01.jpg".
   * Sana on arabiaa ja tarkoittaa heräämistä; Omanissa se on vuonna
   * 1970 alkaneen kehityskauden nimi. Se osuu tähän testiin, koska se
   * kirjoitetaan täsmälleen kuten väärin kirjoitettu "nähdä".
   *
   * Poikkeus on TAHALLAAN KAPEA: se koskee vain muotoja "al-nahda",
   * "an-nahda" ja "al nahda" eli sanaa osana arabialaista nimeä.
   * Paljas "nahda" jää yhä kiinni, eli suomalainen kirjoitusvirhe
   * löytyy edelleen. Suomenkielisissä teksteissä sana taivutetaan
   * ("nahdaksi", "nahdan"), jolloin se ei osu hahmoon lainkaan.
   */
  const VIERASSANAT = /\b(a[ln][- ])nahda\b/gi;

  const kansio = new URL('../js/packs/', import.meta.url).pathname;
  const osumat = [];
  for (const nimi of readdirSync(kansio)) {
    if (!nimi.endsWith('.js')) continue;
    const s = readFileSync(join(kansio, nimi), 'utf8').replace(VIERASSANAT, '$1—');
    const loydot = [...new Set((s.match(hahmo) ?? []).map((x) => x.toLowerCase()))];
    if (loydot.length) osumat.push(`${nimi}: ${loydot.slice(0, 6).join(', ')}`);
  }
  assert.deepEqual(osumat, [],
    'näistä puuttuu ä tai ö — sanat on kirjoitettu ilman umlauttia');
});
