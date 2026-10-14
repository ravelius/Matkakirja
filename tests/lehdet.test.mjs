/*
 * Kaupunki- ja maalehtien rakenne.
 *
 * Lehdet kirjoitetaan käsin ja agenttien avulla, kymmenen kaupunkia
 * kerrallaan, joten yksittäisen sivun unohtunut kenttä ei näy diffiä
 * lukemalla. Nämä testit ovat se kohta, jossa unohdus näkyy.
 */
import test from 'node:test';
import assert from 'node:assert/strict';

import { Game } from '../js/game.js';
import { KULTTUURI_KATEGORIAT } from '../js/packs/kulttuuri-kategoriat.js';
import { MAA_KATEGORIAT } from '../js/packs/maa-kategoriat.js';
import {
  KAUPUNKILEHDEN_SIIRTYNEET, kaupunkilehdenSiirtyneetNostot, kaupunkilehdenSivuNostoineen,
} from '../js/lehtinostot.js';

/** Minitehtävän ja kulttuurivisan yhteiset muotovaatimukset. */
function tarkistaTehtava(t, missa) {
  assert.equal(t.vaihtoehdot?.length, 4, `${missa}: vaihtoehtoja pitää olla neljä`);
  assert.equal(new Set(t.vaihtoehdot).size, 4, `${missa}: vaihtoehdot toistavat toisiaan`);
  assert.ok(Number.isInteger(t.oikea) && t.oikea >= 0 && t.oikea <= 3,
    `${missa}: oikea on indeksi 0–3, ei ${t.oikea}`);
  assert.ok(t.kysymys?.length > 0, `${missa}: kysymys puuttuu`);
  assert.ok(t.fakta?.length > 0, `${missa}: fakta puuttuu`);
  // Palkkion suuruus tulee mekanismista ja on jo ehtinyt muuttua kahdesti
  // saman päivän aikana. Tekstiin kirjoitettuna luku vanhenisi.
  for (const teksti of [t.kysymys, t.fakta, ...t.vaihtoehdot]) {
    assert.doesNotMatch(teksti, /\b(punta|puntaa|pistettä|palkkio)/i,
      `${missa}: teksti ei saa mainita palkkiota — peli lisää sen itse`);
  }
}

test('kaupunkilehden jokaisella aihesivulla on minitehtävä', () => {
  for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    for (const sivu of sivut) {
      if (sivu.id === 'kaupunki') continue;
      assert.ok(sivu.tehtava, `${kaupunki}/${sivu.id}: aihesivulta puuttuu minitehtävä`);
      tarkistaTehtava(sivu.tehtava, `${kaupunki}/${sivu.id}`);
    }
  }
});

test('kannella ei ole minitehtävää — siellä on jo kulttuurivisa', () => {
  for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    const kansi = sivut.find((s) => s.id === 'kaupunki');
    assert.ok(kansi, `${kaupunki}: lehdeltä puuttuu kansi`);
    assert.equal(kansi.tehtava, undefined,
      `${kaupunki}: kannelle ei tule minitehtävää, siellä on kulttuurivisa`);
  }
});

test('sama nosto ei ole sekä lehdessä että vanhoissa litteissä nostoissa', async () => {
  const { EUROPE_KULTTUURI } = await import('../js/packs/europe-kulttuuri.js');
  for (const [kaupunki, sivut] of Object.entries(KULTTUURI_KATEGORIAT)) {
    const vanhat = EUROPE_KULTTUURI[kaupunki]?.nostot ?? [];
    // Kun kaupunki saa lehden, sen litteät nostot siirretään lehteen ja
    // poistetaan täältä. Jos poisto unohtuu, sama juttu näkyy pelissä
    // kahdesti — eikä se näy mistään muualta kuin pelaamalla.
    assert.equal(vanhat.length, 0,
      `${kaupunki}: lehti on olemassa, joten europe-kulttuuri.js:n `
      + `${vanhat.length} nostoa näkyisivät kahdesti`);
  }
});

test('kahden maan samanniminen aihesivu palkitsee erikseen', () => {
  /*
   * Maan lehden saa auki kartalta mistä tahansa (v390), joten Prahassa
   * seisova pelaaja voi avata sekä Tšekin että Saksan lehden. Molemmilla
   * on Historia-sivu. Palkkioavain oli pakka:kaupunki:aihe, jolloin
   * jälkimmäinen näytti tekstin "Tämän sivun minitehtävä on jo
   * ratkaistu" eikä maksanut mitään. ui.js lisää nyt maatunnuksen
   * aiheen eteen; tämä testi pitää sopimuksen voimassa.
   */
  const game = new Game({
    players: [{ name: 'A', color: '#f00', start: 'tanger' }],
    seed: 7,
  });
  const raha = () => game.players[0].money;
  const alku = raha();

  const eka = game.actionMinitehtava('praha', 'CZE:historia', true);
  assert.equal(eka.ok, true, 'ensimmäinen vastaus menee läpi');
  assert.equal(raha(), alku + 10, 'ensimmäinen palkitsee');

  const toinen = game.actionMinitehtava('praha', 'DEU:historia', true);
  assert.equal(toinen.ok, true, 'toisen maan sama aihe on eri tehtävä');
  assert.equal(raha(), alku + 20, 'myös toinen palkitsee');

  const uudelleen = game.actionMinitehtava('praha', 'CZE:historia', true);
  assert.equal(uudelleen.ok, false, 'sama tehtävä ei palkitse kahdesti');
  assert.equal(raha(), alku + 20, 'raha ei kasva toistosta');
});

test('maalehden aihesivuilla on minitehtävä ja menovinkit on viimeisenä', () => {
  for (const [iso, sivut] of Object.entries(MAA_KATEGORIAT)) {
    if (sivut.length < 2) continue;
    const vinkki = sivut.findIndex((s) => s.id === 'menovinkit');
    if (vinkki >= 0) {
      assert.equal(vinkki, sivut.length - 1,
        `${iso}: menovinkit on linkkilista ja kuuluu viimeiseksi`);
    }
    for (const s of sivut) {
      if (s.id === 'menovinkit' || !s.tehtava) continue;
      tarkistaTehtava(s.tehtava, `${iso}/${s.id}`);
    }
  }
});

/*
 * VISAN LÄHDEJUTTU — YKSI JUTTU, EIKÄ KAUPUNGIN NIMI KELPAA.
 *
 * Vanha muoto tästä testistä luki vain KANSISIVUN jutut ja hyväksyi
 * osumaksi minkä tahansa visan sanan — myös kaupungin nimen vartalon.
 * Karttauudistuksen erän 10 raportti (avoin kohta 11.2) löysi, mitä se
 * tarkoitti: Rooman visa kysyy akvedukteista, ja testi läpäisi sanalla
 * `rooman` nostossa "Norsu kantaa obeliskia" — norsupatsas ei kerro
 * akvedukteista mitään. Testi oli vihreä väärästä syystä.
 *
 * TIUKENNUS 14.9.2026 (Fablen päätös). Kaksi muutosta:
 *
 *   1. KAUPUNGIN NIMEN VARTALO EI KELPAA OSUMAKSI. Sekä laudan
 *      kaupunki-id:n että kaupungin näkyvän nimen alku pudotetaan
 *      avainsanoista (Kööpenhamina/kobenhavn, Rovaniemi/lappi).
 *   2. KYTKÖS ON YHDESSÄ JUTUSSA, EI SIVUN SUMMASSA. Jonkin YKSITTÄISEN
 *      noston on kannettava kytkös — juuri sen jutun, jota pelaaja
 *      lukee. Sivun kaikkien juttujen unioni ei kelpaa.
 *
 * JUTTU SAA OLLA KOHDEKARTALLA. Erät 5 ja 10 siirsivät lehtien sivuja
 * kohdekartan nostoiksi, ja Fablen päätös 14.9.2026 on, että Rooman
 * "Vesi kulkee yhä" KUULUU kartalle: jutun siirto takaisin kannelle
 * purkaisi uudistusta. Lähdejuttu haetaan siksi sekä lehden sivuilta
 * että kaupungin täkynostoista (js/packs/fokusvirrat.js takynostot).
 *
 * MITATTU tiukennuksen hetkellä: 43 visasta **yksi** (Rooma) läpäisi
 * vanhan testin pelkällä kaupungin nimen vartalolla. Tiukennettuna
 * kaikki 43 läpäisevät oikeasta syystä; viisi (kreeta, sisilia,
 * dubrovnik, vilna, tukholma) läpäisee yhdellä avainsanalla, ja
 * jokaisessa se sana on juuri se erisnimi tai erikoissana, jota visa
 * kysyy (Knossos, abbanniata, tasavalta, perustuslaki, taidetta).
 * Yhtään ohitusta ei tarvittu.
 */
test('kulttuurivisan vastaus löytyy kaupungin omasta lähdejutusta', async () => {
  const { EUROPE_KULTTUURI } = await import('../js/packs/europe-kulttuuri.js');
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  const { MAAILMANKARTTA } = await import('../js/packs/maailmankartta.js');
  const NIMET = new Map(MAAILMANKARTTA.cities.map((c) => [c.id, c.name]));

  const ytimet = (s) => s.toLowerCase()
    .split(/[^a-zåäöáéíóúüñ0-9]+/)
    .filter((w) => w.length >= 6)
    .map((w) => w.slice(0, 7));
  // Vertailu tehdään aksentittomasta alusta, jotta Kööpenhamina ja
  // kobenhavn tunnistetaan samaksi nimeksi.
  const alku = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').slice(0, 4);
  const juttuTeksti = (n) => [
    n.otsikko ?? '', n.teksti ?? '',
    Array.isArray(n.lunastus) ? n.lunastus.join(' ') : (n.lunastus ?? ''),
  ].join(' ').toLowerCase();

  for (const [kaupunki, tiedot] of Object.entries(EUROPE_KULTTUURI)) {
    const visa = tiedot.kysymys;
    if (!visa) continue;
    const sivut = KULTTUURI_KATEGORIAT[kaupunki];
    const lehdenJutut = sivut
      ? sivut.flatMap((s) => (s.nostot ?? []).map((n) => [s.id, n]))
      : (tiedot.nostot ?? []).map((n) => ['(litteä)', n]);
    const kartanJutut = (FOKUSVIRRAT[kaupunki]?.takynostot ?? [])
      .map((n) => ['kohdekartta', n]);

    const avain = [...new Set([...ytimet(visa.q), ...ytimet(visa.options[visa.correct])])];
    const nimet = [alku(kaupunki), alku(NIMET.get(kaupunki) ?? kaupunki)];
    const ilmanNimea = avain
      .filter((w) => !nimet.some((p) => alku(w).startsWith(p) || p.startsWith(alku(w))));
    assert.ok(ilmanNimea.length > 0,
      `${kaupunki}: visasta ei jää yhtään avainsanaa, kun kaupungin nimi `
      + `pudotetaan — "${visa.q}"`);

    let paras = { osumat: 0, mista: null, otsikko: null };
    for (const [mista, nosto] of [...lehdenJutut, ...kartanJutut]) {
      const teksti = juttuTeksti(nosto);
      const osumat = ilmanNimea.filter((w) => teksti.includes(w)).length;
      if (osumat > paras.osumat) {
        paras = { osumat, mista, otsikko: nosto.otsikko ?? nosto.id ?? '' };
      }
    }
    assert.ok(paras.osumat > 0,
      `${kaupunki}: kulttuurivisalla ei ole lähdejuttua — yksikään lehden `
      + `tai kohdekartan nosto ei käsittele aihetta ilman kaupungin nimeä. `
      + `Visa: "${visa.q}" · avainsanat: ${ilmanNimea.join(', ')}`);
  }
});

/*
 * TYHJENTYNEEN SIVUN JOHDANTO — LUPAUS ON PIDETTÄVÄ.
 *
 * Erät 5 ja 10 tyhjensivät 14 aihesivua nostoista siirtämällä ne
 * kartalle, EIKÄ YHDENKÄÄN sivun johdantoa muutettu (mitattu
 * 14.9.2026: 14 tyhjentynyttä osastoa, 0 muutettua johdantoa; erän 10
 * raportin avoin kohta 11.7.2 jätti asian Fablen kaanonityöksi).
 * Wienin Musiikki-sivu oli ensimmäinen, jossa MOLEMMAT jutut lähtivät
 * ja johdanto jäi lupaamaan valssia ja satuoopperaa, joita sivulla ei
 * enää ole. Loput 13 kirjoitettiin samalla mallilla 14.9.2026.
 *
 * Fablen päätös 14.9.2026: johdanto ohjasi lukijan kartalle. OMISTAJA
 * PALAUTTI 12.10.2026 alkuperäiset johdannot (nostot takaisin aihesivulle
 * natiivissa; ne löytyvät myös kartalta): tämä vartio vaatii nyt, että
 * johdanto on alkuperäinen vanha virke, ja pitää edelleen voimassa, että
 * johdannon lupaamat jutut ovat oikeasti kohdekartalla.
 *
 * LISTA ON TÄYSI: kaikki 14 tyhjentynyttä sivua ovat mukana. Lista
 * mitattiin koneellisesti vertaamalla eraa 5 edeltävää versiota
 * (09b1c625) nykyiseen: sivut, joilla oli nostoja ennen ja nolla nyt.
 * Jos uusi sivu tyhjenee, se lisätään tähän — muuten sen johdanto voi
 * jäädä lupaamaan sisältöä, jota sivulla ei ole.
 *
 * KAKSI PAIKKAA, JOISSA JUTTU VOI OLLA. Osa siirtyi kaupunkilehden
 * KOHDEKARTAN pisteeksi, osa jäi PÄÄKARTAN merkiksi (`kattoVapaa`),
 * koska paikka on kohdekartan rajauksen ulkopuolella (Richmond Park,
 * Wienin keskushautausmaa ja Prater, Köpenick, Aventinus). Molemmat
 * ovat "kartalla", mutta ne tarkistetaan eri taulusta — siksi jokainen
 * juttu on listassa nimenomaan sillä paikalla, jonka johdanto lupaa.
 */
test('kartalle ohjaava johdanto pitää lupauksensa', async () => {
  const { KAUPUNKIKARTAT } = await import('../js/packs/maakartat.js');
  const { FOKUSVIRRAT } = await import('../js/packs/fokusvirrat.js');
  const { SYVENNYSPAIKAT } = await import('../js/packs/syvennyspaikat.js');

  /*
   * Sivut, joiden nostot siirtyivät kartalle, ja jutut, jotka johdanto
   * lupaa. Lista asuu js/lehtinostot.js:ssä (KAUPUNKILEHDEN_SIIRTYNEET),
   * koska sama lista tuo jutut takaisin sivulle webissä ja natiivissa
   * (omistaja 12.10.2026). Kenttien merkitys on kuvattu siellä.
   */
  const OHJAAVAT = KAUPUNKILEHDEN_SIIRTYNEET;

  // Erien 5 ja 10 tyhjentämät sivut mitattiin koneellisesti (ks. yllä).
  // Jos luku muuttuu, listaa on täydennettävä — muuten uusi tyhjentynyt
  // sivu jää lupaamaan sisältöä, jota sillä ei ole.
  const tyhjat = Object.entries(KULTTUURI_KATEGORIAT)
    .flatMap(([kaupunki, sivut]) => sivut
      .filter((s) => s.id !== 'kaupunki' && Array.isArray(s.nostot) && s.nostot.length === 0)
      .map((s) => `${kaupunki}/${s.id}`));
  const katetut = new Set(OHJAAVAT.map((o) => `${o.kaupunki}/${o.sivu}`));
  for (const avain of tyhjat) {
    assert.ok(katetut.has(avain),
      `${avain}: sivulla ei ole yhtään omaa juttua, mutta se ei ole tämän `
      + 'vartion listassa — tarkista, lupaako johdanto yhä jotain, mitä '
      + 'sivulla ei ole, ja lisää sivu OHJAAVAT-listaan.');
  }

  for (const kohta of OHJAAVAT) {
    const { kaupunki, sivu, vanhaVirke } = kohta;
    const kohdekartta = kohta.kohdekartta ?? [];
    const pooli = kohta.pooli ?? [];
    const paakartta = kohta.paakartta ?? [];
    const missa = `${kaupunki}/${sivu}`;

    const osasto = (KULTTUURI_KATEGORIAT[kaupunki] ?? []).find((s) => s.id === sivu);
    assert.ok(osasto, `${missa}: osastoa ei löydy`);
    assert.equal((osasto.nostot ?? []).length, 0,
      `${missa}: sivulla on taas omia juttuja — johdanto kannattaa tarkistaa`);
    assert.ok(osasto.johdanto?.includes(vanhaVirke),
      `${missa}: johdannon vanha virke ei ole enää sanatarkasti tallella`);
    // Omistaja 12.10.2026: johdannot on palautettu alkuperäisiksi (nostot
    // näytetään sivulla ja löytyvät myös kartalta), joten kartalle ohjaavaa
    // jatketta ei enää vaadita eikä sallita: johdanto on vanha virke.
    assert.equal(osasto.johdanto.replace(/[.\s]+$/, ''), vanhaVirke.replace(/[.\s]+$/, ''),
      `${missa}: johdanto ei ole alkuperäinen (vanha virke ilman lisäyksiä)`);
    assert.ok(kohdekartta.length + paakartta.length > 0,
      `${missa}: vartio ei nimeä yhtäkään juttua, jonka johdanto lupaa`);

    // Lupaus on pidettävä: jutut ovat oikeasti siellä, minne johdanto ohjaa.
    const pisteet = new Set((KAUPUNKIKARTAT[kaupunki]?.kohteet ?? [])
      .flatMap((k) => (Array.isArray(k.nosto) ? k.nosto : [k.nosto]))
      .filter(Boolean));
    const takyt = new Map((FOKUSVIRRAT[kaupunki]?.takynostot ?? []).map((n) => [n.id, n]));
    for (const tunnus of kohdekartta) {
      assert.ok(pisteet.has(tunnus),
        `${missa}: johdanto lupaa kartan, mutta ${tunnus} ei ole kohdekartalla`);
    }
    for (const tunnus of pooli) {
      assert.ok(takyt.has(tunnus.replace(/^nosto-/, '')),
        `${missa}: ${tunnus} ei ole kaupungin täkynostoissa`);
    }
    for (const tunnus of paakartta) {
      const merkki = SYVENNYSPAIKAT[kaupunki]?.[tunnus] ?? takyt.get(tunnus);
      assert.ok(merkki,
        `${missa}: johdanto lupaa kartan, mutta ${tunnus} ei ole syvennys- `
        + 'eikä täkynostotaulussa');
      assert.equal(merkki.kattoVapaa, true,
        `${missa}: ${tunnus} on pääkartan merkkinä vain kattoVapaa-lipulla — `
        + 'ilman sitä juttu ei näy kartalla lainkaan');
    }
  }
});

/*
 * KARTALLE SIIRTYNEET JUTUT OVAT TAAS SIVULLA (omistaja 12.10.2026).
 *
 * Jokainen yllä olevan listan sivu saa nostonsa kartan lähteistä
 * (js/lehtinostot.js) vanhassa nostomuodossa: otsikko, teksti ja kuva.
 * Webin lehti (js/lehti.js rakennaSivut) ja natiivin vienti
 * (tools/vienti/lehdet.mjs) lukevat saman funktion, joten jos tunnus
 * katoaa lähteestä, juttu putoaa molemmista — ja tämä vartio kaatuu.
 */
test('kartalle siirtyneet jutut palaavat aihesivulle', () => {
  for (const kohta of KAUPUNKILEHDEN_SIIRTYNEET) {
    const missa = `${kohta.kaupunki}/${kohta.sivu}`;
    const tunnukset = [...(kohta.kohdekartta ?? []), ...(kohta.paakartta ?? [])];
    if (kohta.jarjestys) {
      assert.deepEqual([...kohta.jarjestys].sort(), [...tunnukset].sort(),
        `${missa}: jarjestys-listassa on oltava täsmälleen kohdekartan ja pääkartan jutut`);
    }
    const nostot = kaupunkilehdenSiirtyneetNostot(kohta.kaupunki, kohta.sivu);
    assert.equal(nostot.length, tunnukset.length,
      `${missa}: kaikki jutut eivät ratkenneet lähteestään (${nostot.length}/${tunnukset.length})`);
    for (const n of nostot) {
      assert.ok(n.otsikko, `${missa}: nostolta puuttuu otsikko`);
      assert.ok(n.teksti?.length > 100, `${missa}/${n.otsikko}: nostolta puuttuu teksti`);
      assert.ok(n.tiedosto || n.osoite || n.ampari, `${missa}/${n.otsikko}: nostolta puuttuu kuva`);
      assert.ok(n.lahde, `${missa}/${n.otsikko}: kuvan lähderivi puuttuu`);
      const kohde = n.karttaKohde ?? n.paakartta;
      assert.ok(tunnukset.includes(kohde), `${missa}/${n.otsikko}: karttatunnus ${kohde} ei ole sivun listalla`);
      assert.equal(Boolean(n.paakartta), (kohta.paakartta ?? []).includes(kohde),
        `${missa}/${n.otsikko}: pääkartan jutulla paakartta, kohdekartan jutulla karttaKohde`);
    }
  }

  // Amsterdamin taidesivu sanatarkasti kuten ennen 13.9.2026.
  const [yovartio, maitotytto] = kaupunkilehdenSiirtyneetNostot('amsterdam', 'taide');
  assert.equal(yovartio.otsikko, 'Yövartiosta sahattiin palat pois');
  assert.equal(yovartio.karttaKohde, 'nosto-amsterdamin-yovartio');
  assert.equal(yovartio.tiedosto, 'The Night Watch - cropped.jpg');
  assert.equal(yovartio.galleria?.[0]?.tiedosto, 'Lundens - Nachtwache-Kopie.jpg');
  assert.match(yovartio.teksti, /^Rembrandt maalasi vuonna 1642 /);
  assert.equal(maitotytto.otsikko, 'Vermeer peitti omat esineensä maalilla');
  assert.equal(maitotytto.karttaKohde, 'nosto-amsterdamin-maitotytto');
  assert.equal(maitotytto.tiedosto, 'Johannes Vermeer - Het melkmeisje - Google Art Project.jpg');
  assert.match(maitotytto.teksti, /^Maitotyttö on pienempi kuin useimmat kuvittelevat/);

  // Sisältöpakettiin ei kosketa: sivun omat nostot pysyvät tyhjinä, ja
  // täytetty sivu on vakaa kopio.
  const sivu = KULTTUURI_KATEGORIAT.amsterdam.find((s) => s.id === 'taide');
  assert.equal(sivu.nostot.length, 0);
  const taytetty = kaupunkilehdenSivuNostoineen('amsterdam', sivu);
  assert.notEqual(taytetty, sivu);
  assert.equal(taytetty, kaupunkilehdenSivuNostoineen('amsterdam', sivu));
  assert.equal(taytetty.nostot.length, 2);
  assert.equal(taytetty.tehtava, sivu.tehtava, 'aarteen avaus / tehtävä pysyy sivun lopussa ennallaan');
  // Sivu, jolla on omat nostot, palautuu sellaisenaan.
  const oma = KULTTUURI_KATEGORIAT.amsterdam.find((s) => (s.nostot ?? []).length);
  assert.equal(kaupunkilehdenSivuNostoineen('amsterdam', oma), oma);
});

test('jokainen kohdekartta on avaimistettu laudan kaupunki-id:llä', async () => {
  /*
   * MIKSI TÄMÄ ON OLEMASSA. ui.js hakee kohdekartan
   * KAUPUNKIKARTAT[this.lehtitila.arrivalShownFor] eli laudan kaupunki-id:llä.
   * Jos kartta on avaimistettu jollain muulla nimellä, se ei
   * renderöidy lainkaan — eikä mikään kerro siitä: ei virhettä, ei
   * testiä, ei tyhjää laatikkoa. Sivu näyttää samalta kuin
   * kaupungilla, jolle ei ole karttaa tehty.
   *
   * Aleppo (13.8.2026) meni juuri näin: kartta piirrettiin, kohteet
   * tarkistettiin ja kaikki oli kunnossa, mutta avain oli `aleppo`
   * kun laudan id on `halab`. Vika löytyi vasta selaintarkistuksesta,
   * joka sattui ilmoittamaan "aleppo ei laudalla". Ilman sitä
   * kaupunkilehti olisi julkaistu kartattomana.
   */
  const { KAUPUNKIKARTAT } = await import('../js/packs/maakartat.js');
  const { PACKS } = await import('../js/pack.js');
  const { PAAKAUPUNKIPISTEET } = await import('../js/packs/paakaupungit.js');
  const idt = new Set(PACKS.flatMap((p) => (p.cities ?? []).map((c) => c.id)));
  // Pääkaupunkipisteen kartta avaimistetaan pisteen id:llä (PT 11.10.2026); se ei ole pysäkki.
  for (const p of PAAKAUPUNKIPISTEET) idt.add(p.id);
  // Juna 193 (KS cfb95e0b8): Reykjavíkin kevyt piste poistui, koska laudan islanti ON Reykjavík; piirtäjän avain reykjavik on
  // saman kartan alias (KAUPUNKIKARTAT.islanti = KAUPUNKIKARTAT.reykjavik), joten se renderöityy laudan islannille.
  for (const [avain, kartta] of Object.entries(KAUPUNKIKARTAT)) if ([...idt].some((id) => KAUPUNKIKARTAT[id] === kartta)) idt.add(avain);
  for (const avain of Object.keys(KAUPUNKIKARTAT)) {
    assert.ok(idt.has(avain),
      `kohdekartta "${avain}" ei vastaa yhdenkään laudan kaupunki-id:tä — `
      + 'kartta ei renderöidy pelissä. Tarkista js/packs/<lauta>.js:n id.');
  }
});

test('tehtäväkohtainen juliste voittaa kaupungin oletuksen', async () => {
  /*
   * Omistajan tilaus v1119 (kohta 21): *"tehtävä voi kantaa oman
   * juliste-avaimen (esim. tehtava.juliste = 'ateena-nike'), joka
   * voittaa kaupungin oletuksen — pelaaja voi näin saada samasta
   * kaupungista USEAMMAN eri julisteen eri tehtävistä"*.
   *
   * Kolme asiaa vartioidaan: avaimet ovat olemassa julistetaulussa,
   * Ateenan Athena Nike -tehtävä on kytketty omaansa, ja kytkentä
   * oikeasti kulkee koodin läpi (js/fokustehtavat.js julisteAvain)
   * eikä jää dataan.
   */
  const { readFileSync } = await import('node:fs');
  const { JULISTEET, juliste } = await import('../js/packs/julisteet.js');
  for (const avain of ['ateena-nike', 'ateena-nike-temppeli']) {
    assert.ok(JULISTEET[avain], `julistetta ${avain} ei ole taulussa`);
    assert.equal(juliste(avain)?.kaupunki, 'Ateena');
    assert.match(JULISTEET[avain].tiedosto, /^tuotanto\//,
      `${avain}: tiedosto ei ole tuotanto-kansiossa`);
  }
  // Kaupungin oma oletusjuliste säilyy niille tehtäville, joilla ei ole
  // omaa avainta.
  assert.ok(JULISTEET.ateena, 'Ateenan oletusjuliste katosi');
  assert.notEqual(JULISTEET.ateena.tiedosto, JULISTEET['ateena-nike'].tiedosto);

  const { FOKUSVIRTA_ATEENA } = await import('../js/packs/fokusvirta-ateena.js');
  const tehtava = (FOKUSVIRTA_ATEENA.lehtitehtavat ?? [])
    .find((t) => t.palkinto === 'juliste');
  assert.ok(tehtava, 'Ateenalla ei ole julistepalkintoista tehtävää');
  assert.equal(tehtava.juliste, 'ateena-nike',
    'Athena Nike -tehtävä ei kanna omaa juliste-avaintaan');

  const tehtavat = readFileSync(new URL('../js/fokustehtavat.js', import.meta.url), 'utf8');
  assert.match(tehtavat, /const julisteAvain = tehtava\.juliste/,
    'tehtäväkohtaista avainta ei lueta tehtävästä');
  assert.match(tehtavat, /myonnaJuliste\(julisteAvain\)/,
    'kokoelmaan myönnetään yhä kaupungin tunnus eikä tehtävän avainta');
  assert.match(tehtavat, /naytaJuliste\(julisteAvain\)/,
    'lunastus näyttää yhä kaupungin oletusjulisteen');
});

/*
 * SÄÄRIVIN LÄHDE (7.9.2026).
 *
 * Vuosigraafin alle kirjoitettiin ennen kaikille kaupungeille sama
 * lause "Open-Meteo (ERA5), 1991–2020". Neljällätoista kaupungilla se
 * ei pitänyt paikkaansa: niiden rivit
 * laskettiin 6.9.2026 en-Wikipedian ilmastotaulukoista, koska
 * Open-Meteon vuorokausikiintiö oli täynnä, eivätkä ne ole kaikki
 * edes samalta normaalikaudelta (Port Vila 1961–1990, Halifax
 * 1981–2010). Nyt rivi voi kertoa oman lähteensä lahde-kentässä.
 *
 * Testi vartioi kahta asiaa, joita silmä ei diffistä huomaa:
 * kenttä ei saa olla vajaa, eikä se saa kadota näiltä neljältätoista
 * riviltä (esimerkiksi kun rivi joskus uusitaan Open-Meteolla —
 * silloin poistetaan sekä kenttä että kaupunki tästä listasta).
 */
test('säärivin lähde on joko Open-Meteo-oletus tai kunnollinen lahde-kenttä', async () => {
  const { SAATIEDOT } = await import('../js/packs/saatiedot.js');
  const { vuosiSaaSelite } = await import('../js/saa.js');
  const WIKI_RIVIT = [
    'dunedin', 'suva', 'portoalegre', 'asuncion', 'cairns', 'panama',
    'honiara', 'portvila', 'denver', 'houston', 'miami', 'halifax',
    'kapkaupunki', 'nairobi',
  ];
  for (const [kaupunki, tiedot] of Object.entries(SAATIEDOT)) {
    const selite = vuosiSaaSelite(tiedot);
    if (tiedot.lahde === undefined) {
      assert.match(selite, /Open-Meteo \(ERA5\), 1991–2020$/,
        `${kaupunki}: ilman lahde-kenttää lähderivin on oltava Open-Meteon oletus`);
      continue;
    }
    assert.ok(typeof tiedot.lahde.nimi === 'string' && tiedot.lahde.nimi.length > 0,
      `${kaupunki}: lahde.nimi puuttuu`);
    assert.match(tiedot.lahde.kausi ?? '', /^\d{4}–\d{4}$/,
      `${kaupunki}: lahde.kausi ei ole muotoa 1991–2020`);
    assert.ok(selite.endsWith(`${tiedot.lahde.nimi}, ${tiedot.lahde.kausi}`),
      `${kaupunki}: graafin lähderivi ei kerro rivin omaa lähdettä`);
    assert.doesNotMatch(selite, /Open-Meteo/,
      `${kaupunki}: lähderivi väittää yhä Open-Meteota`);
  }
  for (const kaupunki of WIKI_RIVIT) {
    assert.ok(SAATIEDOT[kaupunki]?.lahde?.nimi,
      `${kaupunki}: en-Wikipedian ilmastotaulukosta laskettu rivi ilman lahde-kenttää`);
  }
});
