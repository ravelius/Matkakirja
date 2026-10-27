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
    for (const o of ['LÄHDE.', 'SUUNNAT.', 'KORTIN FAKTAT EIVÄT TOISTU.', 'EI PUHUTTELUA', 'VIERAAT NIMET', 'ÄÄNI.']) assert.ok(k.includes(o), o);
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
  assert.equal(tarkistaLisaa(lisaa('Mihin isoisä piilotti aarteen?\nMilloin kaupunki sai torioikeudet?'), syote, 'Windsor').syy, 'kysymykset');
  // Johdannon vuosi toistuu Lue lisää -tekstissä → hylkäys.
  assert.match(tarkistaLisaa(lisaa(), syote, 'Windsor', 'Windsoria kutsuttiin uudella nimellä vuoteen 1974 asti.').syy, /toisto/);
});
