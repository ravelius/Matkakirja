// Kartan tietokortit 2 (omistaja 27.10.2026 klo 13.23): kohdetyypit, johdanto ja Lue lisää väliotsikoin + kaksi kysymystä.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  KOHDETYYPIT, kohdeTyyppi, osaAvain, tekstiAvain, JOHDANTO_KEHOTE, LISAA_KEHOTE, jasennaLisaa, tarkistaJohdanto, tarkistaLisaa,
  KYSYMYKSET, EI_LAHDETTA, lisaaViesti,
} from '../tools/pollo/tietokortti.js';
import { LAJIT } from '../tools/pollo/tietokortti-kaava.js';

const syote = JSON.stringify({ kohde: 'Q1', nimi: 'Windsor', laji: 'Kaupunki', faktat: ['Alue: Berkshire'], wikipedia: { kieli: 'en', teksti:
  'Windsor is a town on the River Thames. Windsor Castle was built by William the Conqueror around 1070. The castle is a royal residence. '
  + 'Eton lies across the river. The bridge was first mentioned in 1191. Old Windsor is three kilometres south. The town was called New '
  + 'Windsor until 1974. A market was granted in 1277 and the Guildhall was completed in 1689 after designs by Christopher Wren.' } });

test('kohdetyypit: enintään 10, jokainen laji kuuluu yhteen tyyppiin, tuntematon on Alue', () => {
  assert.ok(KOHDETYYPIT.length <= 10);
  for (const [nimi] of LAJIT) assert.equal(KOHDETYYPIT.filter((k) => k.lajit.includes(nimi)).length, 1, nimi);
  assert.deepEqual(kohdeTyyppi('Linna'), { id: 'historia', nimi: 'Historia' });
  assert.equal(kohdeTyyppi('Joki').id, 'vesisto');
  assert.equal(kohdeTyyppi('Paikka').id, 'alue');
  assert.equal(kohdeTyyppi(undefined).id, 'alue');
  assert.ok(KOHDETYYPIT.every((k) => /^[a-z]+$/.test(k.id)));
});

test('osien avaimet eivät törmää vanhaan tekstiin', () => {
  const a = osaAvain('Q1', 'fi', 'johdanto'), b = osaAvain('Q1', 'fi', 'lisaa');
  assert.notEqual(a, b);
  assert.notEqual(a, tekstiAvain('Q1', 'fi'));
});

test('kehotteet: yhteiset ohjeet mukana, muoto osan mukaan', () => {
  for (const k of [JOHDANTO_KEHOTE, LISAA_KEHOTE]) {
    for (const o of ['LÄHDE.', 'SUUNNAT.', 'KORTIN FAKTAT EIVÄT TOISTU.', 'EI PUHUTTELUA', 'VIERAAT NIMET', 'TYYLI.']) assert.ok(k.includes(o), o);
    // Neutraali asiateksti (omistaja 13.52): ei Pulun ääntä.
    assert.ok(!k.includes('ÄÄNI.') && !k.includes('Pulun äänellä') && !k.includes('Pulun,'));
  }
  assert.ok(JOHDANTO_KEHOTE.includes('2–3 virkettä'));
  assert.ok(LISAA_KEHOTE.includes('## ') && LISAA_KEHOTE.includes(KYSYMYKSET));
  assert.equal(JSON.parse(lisaaViesti({ qid: 'Q1', nimi: 'W', rivit: [] }, null, 'Johdanto.')).johdanto, 'Johdanto.');
});

test('johdanto: 2–3 virkettä hyväksytään, neljä ja yksi hylätään', () => {
  const hyva = 'Windsor on kaupunki Thamesin rannalla. Windsorin linnan rakennutti Vilhelm Valloittaja noin vuonna 1070, ja se on yhä kuninkaallinen asunto.';
  assert.equal(tarkistaJohdanto(hyva, syote, 'Windsor').ok, true, JSON.stringify(tarkistaJohdanto(hyva, syote, 'Windsor')));
  assert.equal(tarkistaJohdanto('Windsor on kaupunki Thamesin rannalla, ja linnan rakennutti Vilhelm Valloittaja noin vuonna 1070 kuninkaalliseksi asunnoksi.', syote, 'Windsor').syy, 'virkkeet 1');
  assert.match(tarkistaJohdanto(`${hyva} Eton on joen toisella puolella. Silta mainitaan vuonna 1191.`, syote, 'Windsor').syy, /virkkeet/);
  assert.equal(tarkistaJohdanto(EI_LAHDETTA, syote).ok, true);
});

test('kysymys, johon teksti jo vastaa, hylätään (NUI t4: Etonin nimi)', async () => {
  const { vastattuTekstissa } = await import('../tools/pollo/tietokortti.js');
  const teksti = 'Eton on pieni kaupunki. Nimi tulee vanhan englannin sanasta Ēa-tūn, joka tarkoittaa jokikaupunkia. Vilhelm Valloittaja rakennutti linnan joen yläpuolelle.';
  assert.equal(vastattuTekstissa('Mistä Etonin nimi tulee?', teksti, 'Eton'), true);
  assert.equal(vastattuTekstissa('Kuka rakennutti ensimmäisen linnan?', teksti, 'Eton'), true);
  assert.equal(vastattuTekstissa('Miksi koulun oppilaat käyttävät frakkia?', teksti, 'Eton'), false);
  // KK 27.10.: Etonin toinen kysymys oli myös jo vastattu.
  const sota = 'Englannin sisällissodan aikana kuninkaalliset joukot miehittivät kolledžin, mutta Windsorin valtaus epäonnistui.';
  assert.equal(vastattuTekstissa('Mitä Etonissa tapahtui Englannin sisällissodan aikana?', sota, 'Eton'), true);
  assert.equal(vastattuTekstissa('Mistä Etonin nimi tulee?', 'Eton on pieni kaupunki Thamesin varrella.', 'Eton'), false);
});

test('kysymykset erikseen: tarkistus ja vaihto (KK 27.10., Eton)', async () => {
  const { tarkistaKysymykset, vaihdaKysymykset, jasennaLisaa } = await import('../tools/pollo/tietokortti.js');
  const lisaa = '## Eton Collegen perustaminen\nHenrik VI perusti koulun, mikä pysäytti kylän kasvun.\n## Sisällissota\nKuninkaalliset miehittivät kylän.\n###KYSYMYKSET###\nMiksi Eton Collegen perustaminen pysäytti kylän kasvun?\nMitä sisällissodassa tapahtui?';
  assert.equal(tarkistaKysymykset('Miksi Eton Collegen perustaminen pysäytti kylän kasvun?\nMitä koulu opettaa nykyään?', 'Eton on kaupunki.', lisaa, 'Eton'), null);
  // Ehdokkaista kaksi kelvollista; alkuperäinen kelvollinen ensin.
  assert.deepEqual(tarkistaKysymykset(['Mitä koulu opettaa nykyään?', 'Mitä sisällissodassa tapahtui?', 'Keitä kuuluisia oppilaita koulussa on ollut?'], 'Eton on kaupunki.', lisaa, 'Eton'),
    ['Mitä koulu opettaa nykyään?', 'Keitä kuuluisia oppilaita koulussa on ollut?']);
  const ok = tarkistaKysymykset('1. Keitä kuuluisia oppilaita koulussa on ollut?\n2. Miten koulun oppilaat pukeutuvat?', 'Eton on kaupunki.', lisaa, 'Eton');
  assert.deepEqual(ok, ['Keitä kuuluisia oppilaita koulussa on ollut?', 'Miten koulun oppilaat pukeutuvat?']);
  assert.deepEqual(jasennaLisaa(vaihdaKysymykset(lisaa, ok)).kysymykset, ok);
  const { kelvollisetKysymykset } = await import('../tools/pollo/tietokortti.js');
  assert.deepEqual(kelvollisetKysymykset(['Mitä sisällissodassa tapahtui?', 'Mitä koulu opettaa nykyään?'], 'Eton on kaupunki.', lisaa, 'Eton'), ['Mitä koulu opettaa nykyään?']);
});

test('faktarivi vastaa kysymykseen (KK 27.10.: "Kuka Etonia hallinnoi?" ja "Alue: Windsor ja Maidenhead")', async () => {
  const { faktaVastaa } = await import('../tools/pollo/tietokortti.js');
  const faktat = ['noin 5 100 asukasta (2021)', 'Alue: Windsor ja Maidenhead'];
  assert.equal(faktaVastaa('Kuka Etonia hallinnoi?', faktat, 'Eton'), true);
  assert.equal(faktaVastaa('Kuinka monta ihmistä Etonissa asuu?', faktat, 'Eton'), true);
  assert.equal(faktaVastaa('Miten Eton College vaikuttaa kaupungin elämään?', faktat, 'Eton'), false);
});

test('siistiLisaa: otsikoton alkukappale pois, kun perässä on kaksi otsikollista jaksoa', async () => {
  const { siistiLisaa, jasennaLisaa } = await import('../tools/pollo/tietokortti.js');
  const raaka = 'Eton on kaupunki.\n\n## Koulu\nKoulu perustettiin.\n\n## Silta\nSilta suljettiin.\n\n###KYSYMYKSET###\nMiksi?\nMiten?';
  const s = jasennaLisaa(siistiLisaa(raaka));
  assert.deepEqual(s.jaksot.map((j) => j.otsikko), ['Koulu', 'Silta']);
  assert.equal(s.kysymykset.length, 2);
  assert.equal(siistiLisaa('Vain kappale.\n\n## Yksi\nTeksti.'), 'Vain kappale.\n\n## Yksi\nTeksti.');
});

test('lievin hylkäys valitaan, kun kaikki yritykset hylätään', async () => {
  const { hylkayksenVakavuus } = await import('../tools/pollo/tietokortti.js');
  assert.ok(hylkayksenVakavuus('vastattu') < hylkayksenVakavuus('toisto 1440'));
  assert.ok(hylkayksenVakavuus('toisto 1440') < hylkayksenVakavuus('otsikot 3'));
});

test('kysymys väliotsikon aiheesta hylätään (NUI t5: Etonin sisällissota)', async () => {
  const { otsikonAihe } = await import('../tools/pollo/tietokortti.js');
  assert.equal(otsikonAihe('Mitä Etonissa tapahtui Englannin sisällissodan aikana?', ['Nimi ja varhaiset vuosisadat', 'Sisällissota ja nykyiset yhteydet'], 'Eton'), true);
  assert.equal(otsikonAihe('Miksi koulun oppilaat käyttävät frakkia?', ['Nimi ja varhaiset vuosisadat', 'Sisällissota ja nykyiset yhteydet'], 'Eton'), false);
  assert.equal(otsikonAihe('Mistä Etonin nimi tulee?', ['Etonin vaiheet'], 'Eton'), false);
  // Vedos t6: erisnimi otsikossa ei hylkää nykypäivään vievää kysymystä.
  assert.equal(otsikonAihe('Miten Eton College toimii nykyään?', ['Eton College ja sen historia', 'Silta ja liikenne'], 'Eton'), false);
});

test('johdanto on yksi kappale ilman nimen alkuperää (omistaja 14.39)', () => {
  const s2 = JSON.stringify({ nimi: 'Eton', faktat: [], wikipedia: { kieli: 'en', teksti: 'Eton is a town on the Thames. Eton College was founded in 1440. The name comes from Old English.' } });
  const ok = 'Eton on pieni kaupunki Thamesin varrella, ja sen tunnetuin paikka on vuonna 1440 perustettu Eton College. Koulu leimaa yhä kaupungin katuja.';
  assert.equal(tarkistaJohdanto(ok, s2, 'Eton').ok, true, JSON.stringify(tarkistaJohdanto(ok, s2, 'Eton')));
  assert.equal(tarkistaJohdanto(`${ok}\n\nKaupunki on joen rannalla.`, s2, 'Eton').syy, 'kappaleet');
  assert.equal(tarkistaJohdanto('Eton on pieni kaupunki Thamesin varrella, ja sen tunnetuin paikka on Eton College. Nimi tulee vanhan englannin sanasta, joka tarkoittaa jokikaupunkia.', s2, 'Eton').syy, 'nimen alkuperä');
});

const lisaa = (k = 'Kuka suunnitteli kaupungintalon?\nMilloin kaupunki sai torioikeudet?') => `## Vanha ja uusi Windsor
Old Windsor on kolme kilometriä etelämpänä, ja nykyistä kaupunkia kutsuttiin New Windsoriksi vuoteen 1974 asti. Nimi erotti kaksi
paikkaa toisistaan, ja vanhempi asutus jäi pienemmäksi kyläksi joen varrelle. Siirtyminen uuteen paikkaan tapahtui vähitellen,
kun linna houkutteli ympärilleen kauppiaita ja käsityöläisiä.
## Silta ja Eton
Thamesin ylittävä silta mainitaan ensimmäisen kerran vuonna 1191. Joen toisella puolella on Eton, johon silta yhdistää kaupungin.
Silta oli pitkään alueen tärkein ylityspaikka, ja sen kautta kulki liikenne kaupunkien välillä. Myöhemmin sillalle tuli
uusi rakenne, mutta paikka on pysynyt samana.
${KYSYMYKSET}
${k}`;

test('Lue lisää: jäsennys ja tarkistus (otsikot, sanat, kaksi kysymystä)', () => {
  const j = jasennaLisaa(lisaa());
  assert.deepEqual(j.jaksot.map((x) => x.otsikko), ['Vanha ja uusi Windsor', 'Silta ja Eton']);
  assert.equal(j.kysymykset.length, 2);
  const r = tarkistaLisaa(lisaa(), syote, 'Windsor', 'Windsor on kaupunki Thamesin rannalla.');
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(tarkistaLisaa(lisaa('Kuka suunnitteli kaupungintalon?'), syote, 'Windsor').syy, 'kysymykset');
  assert.equal(tarkistaLisaa(lisaa().replace(KYSYMYKSET, ''), syote, 'Windsor').syy, 'kysymysrivi');
  assert.match(tarkistaLisaa(lisaa().replace('## Silta ja Eton\n', ''), syote, 'Windsor').syy, /otsikot/);
  // Pelikysymys on kysymysvirhe (kysymykset kirjoitetaan erikseen, t7), ei tekstivirhe.
  assert.equal(tarkistaLisaa(lisaa('Mihin isoisä piilotti aarteen?\nMilloin kaupunki sai torioikeudet?'), syote, 'Windsor').syy, 'vastattu');
  // vainTeksti: teksti kelpaa ilman kysymyksiä (näytetään heti, KK 27.10.).
  assert.equal(tarkistaLisaa(lisaa().replace(KYSYMYKSET, '').split('\n').filter((r) => !r.endsWith('?')).join('\n'), syote, 'Windsor', '', { vainTeksti: true }).ok, true);
  // Johdannon vuosi toistuu Lue lisää -tekstissä → hylkäys.
  // Johdannon vuosiluku saa toistua kerran aikaviitteenä (KK 27.10.); muu johdannon luku ei.
  const vuosi = tarkistaLisaa(lisaa(), syote, 'Windsor', 'Windsor sai nykyisen asemansa vuonna 1974.');
  assert.equal(vuosi.ok, true, JSON.stringify(vuosi));
});

test('kysymysrivi myös poikkeavissa muodoissa; tuhaterotin pilkkuna lähteessä', () => {
  for (const r of ['Kysymyksiä:', 'KYSYMYKSET', '### Kysymykset ###']) {
    assert.equal(jasennaLisaa(lisaa().replace(KYSYMYKSET, r)).kysymykset.length, 2, r);
    assert.equal(tarkistaLisaa(lisaa().replace(KYSYMYKSET, r), syote, 'Windsor').ok, true, r);
  }
  const s2 = JSON.stringify({ nimi: 'Box Hill', faktat: [], wikipedia: { kieli: 'en', teksti: 'Box Hill attracts 850,000 visitors a year and is part of the Surrey Hills.' } });
  assert.equal(tarkistaJohdanto('Box Hill on kukkula Surreyssa, ja se kuuluu Surrey Hillsin maisema-alueeseen. Kukkulalla käy vuosittain noin 850 000 ihmistä.', s2, 'Box Hill').ok, true);
});

test('asukasluku muodossa "asuu noin N ihmistä" ja johdannon luvun toisto hylätään; turha EI-LÄHDETTÄ pitkästä lähteestä', () => {
  const s2 = JSON.stringify({ nimi: 'Eton', faktat: [], wikipedia: { kieli: 'en', teksti: 'Eton is a town with a population of 5,100 people. Eton College was founded in 1440.' } });
  assert.equal(tarkistaJohdanto('Eton on pieni kaupunki Thamesin varrella Windsorin vastarannalla, ja Eton College perustettiin vuonna 1440. Kaupungissa asuu nykyään noin 5 100 ihmistä.', s2, 'Eton').syy, 'faktatoisto asukasluku');
  assert.match(tarkistaLisaa(lisaa(), syote, 'Windsor', 'Windsor on 1191 metrin päässä.').syy, /toisto 1191/);
  const pitka = JSON.stringify({ nimi: 'W', wikipedia: { teksti: 'x'.repeat(2500) } });
  assert.equal(tarkistaLisaa(EI_LAHDETTA, pitka).ok, false);
  assert.equal(tarkistaLisaa(EI_LAHDETTA, syote).ok, true);
});

test('neutraali asiateksti: minä- ja me-muoto hylätään', () => {
  assert.equal(tarkistaJohdanto('Windsor on kaupunki Thamesin rannalla, ja minä kerron siitä mielelläni vähän lisää. Windsorin linnan rakennutti Vilhelm Valloittaja noin vuonna 1070.', syote, 'Windsor').syy, 'kertoja');
});

test('maailmanperintö: oma kortin avain tunnuksella; vesilähde ei ole kielletty sana', async () => {
  const { korttiAvain, tarkistaTeksti } = await import('../tools/pollo/tietokortti.js');
  assert.equal(korttiAvain({ nimi: 'Akropolis', lat: 37.97, lon: 23.72, luokka: 'perinto', qid: 'Q131013' }), 'tietokortti:v5:perinto:Q131013');
  const s2 = JSON.stringify({ nimi: 'Akropolis', faktat: [], wikipedia: { kieli: 'fi', teksti: 'Akropolis on Ateenan linnavuori. Rinteillä oli lähteitä, joiden ansiosta linnoitus kesti piirityksen. Parthenon valmistui.' } });
  assert.equal(tarkistaJohdanto('Akropolis on Ateenan linnavuori, ja sen rinteillä oli lähteitä. Niiden ansiosta linnoitus kesti pitkänkin piirityksen, ja kukkula pysyi asuttuna.', s2, 'Akropolis').ok, true);
  assert.match(tarkistaJohdanto('Akropolis on Ateenan linnavuori, ja lähteen mukaan se kesti piirityksen. Kukkula pysyi asuttuna pitkään, ja sinne rakennettiin temppeleitä.', s2, 'Akropolis').syy, /sana/);
});
