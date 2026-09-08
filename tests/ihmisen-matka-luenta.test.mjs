/*
 * IHMISEN MATKA — KERTOJAN TEKSTI JA YKSI YHTENÄINEN LUENTA.
 *
 * Raamattu "IHMISEN MATKA: ETELA-AFRIKKA VAIN KERRAN, SELKEAT LAUSEET,
 * YKSI YHTENAINEN LUENTA" (omistaja 8.9.2026: *"nyt hyvä. laita peliin
 * ja generoi ääni"*, *"nyt jokainen kohtaus on generoitu erillisenä
 * kohtana, niin kertojan äänensävy hyppii liikaa"* ja *"muista generoida
 * teksti yhtenä pätkänä, jossa on luonnolliset lauseet ja kappaleet"*).
 *
 * Tässä mitataan se, mikä rikkoutuisi hiljaa:
 *
 *   1. KAANONIN SANAT. Jokaisen jakson teksti on sanatarkasti se, minkä
 *      omistaja hyväksyi (kopio alla), ja `luenta` on sama teksti
 *      pelkillä eleven_v3:n tageilla höystettynä — ei sanaakaan enempää.
 *   2. BLOMBOS EI OLE PYSÄKKI. Kertomus ei pysähdy Blombosiin, mutta
 *      nosto on yhä aineistossa ja syttyy kartalle hiljaisena pisteenä.
 *   3. YHTENÄINEN TEKSTI. Jaksot ovat kappaleita, väliin ei tule
 *      taukomerkkejä, ja jaksorajat osuvat merkilleen samaan tekstiin.
 *   4. AIKALEIMAT. Merkki-indekseistä lasketut jaksojen, lauseiden ja
 *      sanojen alkuhetket — tagit eivät ole puhetta eivätkä saa aikaa.
 *   5. PELIN PUOLI. Manifesti → soitin: yksi tiedosto, jakson väli,
 *      ja `jakso.aikaleimat` esityksen käyttöön.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { IHMISEN_MATKA_KERTOMUS } from '../js/linssit/ihmisen-matka-kertomus.js';
import { IHMISEN_MATKA } from '../js/linssit/ihmisen-matka-data.js';
import { LINSSI } from '../js/linssit/ihmisen-matka.js';
import { kertomuksenLuennat } from '../js/linssipuhe.js';
import {
  jaksojenAikaleimat, jaksonAikaleimat, luoKertomusluenta, tiedostonRunko,
  KERTOMUS_MANIFESTI as PELIN_MANIFESTI,
} from '../js/linssit/ihmisen-matka-luenta.js';
import {
  AIKALEIMAN_LAHTEET, AIKALEIMOJEN_MALLI, JAKSON_HANTA_MS, KAPPALEEN_VALI, KERTOMUS_MANIFESTI,
  MALLI, PAKOTETUN_OSOITE, YHTENAN_KESTO_MAX_S, aikaleimoiksi, aikaleimojenOsoite, karsiTagit,
  kertomuksenJasennys, kokoaYhtenaManifesti, kokoaYhtenainenTeksti, jaksonJasennys,
  leikkaaVainLoppuSuodatin, normalisoiAlignment, sovitaMerkit, tagienValit, tulkitseArgumentit,
  tunteeTagit,
} from '../tools/generoi-linssiluennat.mjs';

const OHJAAJA = readFileSync(new URL('../js/linssit/ihmisen-matka-esitys.js', import.meta.url), 'utf8');
const PUHE = readFileSync(new URL('../js/linssipuhe.js', import.meta.url), 'utf8');
const SW = readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const AJO = readFileSync(new URL('../.github/workflows/generoi-linssiluennat.yml', import.meta.url), 'utf8');

/* ==================== 1. KAANONIN SANAT ==================== */

/*
 * OMISTAJAN HYVÄKSYMÄ TEKSTI 8.9.2026, sanatarkasti. Tämä on kopio siitä
 * tiedostosta, jonka omistaja luki ja hyväksyi ("nyt hyvä. laita peliin
 * ja generoi ääni"); jos kaanoniin kirjoitetaan uusi sana ilman
 * päätoimittajaa, tämä testi kaatuu.
 */
const HYVAKSYTTY = [
  ['avaus', 'Tiedätkö, mistä ihmiset lähtivät liikkeelle? Ei kukaan heistäkään tiennyt. He vain lähtivät. Afrikasta. Kaikki meistä.'],
  ['afrikka', 'Tämä on se maanosa, jossa ihminen oppi kävelemään, puhumaan ja tekemään tulta. Ja täältä, Marokon kukkulalta…'],
  ['jebel-irhoud', '…on löydetty vanhimmat luut ihmisistä, joilla oli jo samanlaiset kasvot kuin meillä. Jos yksi heistä kävelisi vastaan kadulla, et kääntyisi katsomaan. Kukaan täällä ei tiennyt olevansa ensimmäinen missään.'],
  ['siirtyma-afrikka', 'Mutta mennäänpä toiselle puolelle Afrikkaa. Sieltä varsinainen matka alkaa, vaikka kukaan ei ollut sitä suunnitellut.'],
  ['omo', 'Etiopian jokilaaksossa ihmisiä asui sukupolvi sukupolven perään. Kaksisataatuhatta vuotta samassa laaksossa. Meille se on ikuisuus. Heille se oli kotiseutu.'],
  ['ranta', 'Kului pitkä aika, ennen kuin joku käveli etelän rantaan asti. Rannasta löytyi ruokaa, joka ei juokse karkuun: simpukoita. Siitä lähtien meri on ollut ihmiselle tie, ei este.'],
  ['levantti', 'Ensimmäinen retki Afrikan ulkopuolelle ulottui Karmelvuorelle, nykyisen Israelin rannikolle. Siellä asuttiin jonkin aikaa, mutta asutus ei jäänyt pysyväksi. Syytä ei tiedetä. Ehkä ilmasto muuttui kuivemmaksi, ehkä tulijat väistyivät neandertalilaisten tieltä. Luut eivät kerro sitä.'],
  ['arabia', 'Sitten kului taas pitkä aika. Etelän rannikolla ehdittiin hioa okraa punaiseksi ja pujotella simpukankuoria helmiksi, ennen kuin ylitys Arabian niemimaalle onnistui. Silloin Arabia oli vihreä: autiomaan paikalla oli järviä ja ruohoa. Yhden järven rannalta on löydetty yksi ainoa sormiluu. Se riittää todisteeksi. Tästä ihmiset lähtivät kohti Aasiaa, eivätkä enää palanneet.'],
  ['intian-rannat', 'Reitti kulki rantoja pitkin itään, sukupolvi kerrallaan. Kukaan ei kiirehtinyt. Sumatran sademetsästä on löydetty kaksi hammasta. Se on vähän, mutta se riittää kertomaan, että ihmisiä oli täällä jo silloin.'],
  ['australia', 'Ja sitten tehtiin jotain, mitä kukaan ei ollut ennen tehnyt: lähdettiin meren yli, vaikka toista rantaa ei näkynyt. Perillä oli Sahul, nykyinen Australia. Se oli ihmisen ensimmäinen merimatka tuntemattomaan, ja se onnistui.'],
  ['denisova', 'Pohjoisessa, Altain vuorilla, on luola, jossa asui kolmenlaisia ihmisiä: denisovalaisia, neandertalilaisia ja heidän yhteisiä lapsiaan. Meidän esi-isiemme esineitä löytyy samasta luolasta melkein heti heidän jälkeensä. Luola on pieni. Kaikki mahtuivat siihen vuorollaan.'],
  ['napapiiri', 'Kylmä ei pysäyttänyt matkaa, se vain hidasti sitä. Kun mammutit vielä kävelivät, ihmisiä asui jo napapiirin pohjoispuolella Janajoen varrella. Talvi kesti yhdeksän kuukautta, ja silti he jäivät.'],
  ['beringia', 'Seuraavaksi ylitettiin meri, jota ei enää ollut. Jääkausi oli sitonut vettä jäätiköihin, ja meri oli laskenut niin alas, että Beringinsalmen tilalla oli kuivaa ruohomaata. Sitä pitkin käveltiin Amerikkaan. Kukaan ei huomannut vaihtavansa mannerta.'],
  ['white-sands', 'Uudessa-Meksikossa on järven mutaan painuneita jalanjälkiä, lapsen ja aikuisen. Ne ovat paljon vanhempia kuin tutkijat uskoivat mahdolliseksi, ja niiden takia Amerikan asuttamisen aikataulu piti kirjoittaa uusiksi.'],
  ['chile', 'Rannikkoa pitkin päästiin Etelä-Amerikan kärkeen asti muutamassa tuhannessa vuodessa. Chilessä Monte Verden leiri hautautui turpeen alle: nuotio, majat ja yksi lapsen jalanjälki. Siihen päättyi pisin kävelymatka, jonka ihminen on koskaan tehnyt.'],
  ['aikahyppy', 'Mutta palataan takaisin Aasiaan. Samaan aikaan, kun pääjoukko kulki itään, yksi haara kääntyi länteen, kohti Eurooppaa.'],
  ['eurooppa', 'Bulgarian luolasta on löydetty ensimmäiset merkit meikäläisistä Euroopassa. Manner oli kylmä, ja siellä asui jo neandertalilaisia. Tulijat jäivät, ja neandertalilaiset katosivat muutamassa tuhannessa vuodessa. Miksi niin kävi, siitä tutkijat kiistelevät yhä.'],
  ['chauvet', 'Ranskassa joku laskeutui luolan pimeyteen ja maalasi seinään hevosia, sarvikuonoja ja leijonia. Ne ovat siellä vieläkin, samassa asennossa. Kuka hän oli, sitä ei tiedä kukaan. Mutta hän oli taiteilija, ja se riittää.'],
  ['meri', 'Viimeisenä oli valtameri. Tyynellämerellä oli saaria, joille kukaan ei voinut kävellä. Sinne purjehdittiin kanooteilla tähtien avulla, ja saviastiat kulkivat mukana. Näin päästiin Tongalle asti.'],
  ['uusi-seelanti', 'Viimeinen suuri maa odotti pisimpään. Uuteen-Seelantiin tultiin vasta, kun Euroopassa rakennettiin jo katedraaleja. Silloin ihminen oli levittäytynyt koko maapallolle, eikä kukaan ollut huomannut lähteneensä matkalle.'],
  ['loppu', 'Kukaan matkalla ei tiennyt olevansa matkalla. Jokainen vain siirsi leirinsä seuraavan rannan taakse. Kolmesataatuhatta vuotta, ja tässä me olemme.'],
];

test('kertomuksen jaksot ovat sanatarkasti omistajan hyväksymä teksti', () => {
  assert.deepEqual(IHMISEN_MATKA_KERTOMUS.map((j) => j.id), HYVAKSYTTY.map(([id]) => id));
  for (const [id, teksti] of HYVAKSYTTY) {
    const jakso = IHMISEN_MATKA_KERTOMUS.find((j) => j.id === id);
    assert.equal(jakso.teksti, teksti, `jakson ${id} teksti ei ole hyväksytty`);
  }
});

test('luenta on sama teksti tageilla — ei sanaakaan enempää', () => {
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    assert.equal(karsiTagit(jakso.luenta), jakso.teksti,
      `jakson ${jakso.id} luennassa on muutakin kuin tageja`);
    // Tagit ovat eleven_v3:n omia; break-merkintöjä ei kirjoiteta käsin
    // (tauko jaksojen väliin tehdään pelissä, omistaja 8.9.2026).
    assert.ok(!/<break/.test(jakso.luenta), `${jakso.id}: käsin kirjoitettu break-tagi`);
    for (const [tagi] of jakso.luenta.matchAll(/\[([^\]]*)\]/g)) {
      assert.match(tagi, /^\[(curious|softly|warmly|pause)\]$/, `${jakso.id}: outo tagi ${tagi}`);
    }
  }
});

/* ==================== 2. BLOMBOS EI OLE PYSÄKKI ==================== */

test('Blombos on kartalla ja kortissa, muttei kertomuksen pysäkkinä', () => {
  const tunnukset = new Set(IHMISEN_MATKA.map((t) => t.tunnus));
  // Nosto on yhä aineistossa: kartan piste, kortti ja gallerian kuva.
  assert.ok(tunnukset.has('blombos'), 'Blombosin nosto katosi aineistosta');
  // Mutta kertomus ei pysähdy siihen: ei jaksoa eikä kameran kohdetta.
  assert.ok(!IHMISEN_MATKA_KERTOMUS.some((j) => j.id === 'blombos'), 'blombos on yhä jakso');
  assert.ok(!IHMISEN_MATKA_KERTOMUS.some((j) => j.kohde === 'blombos'),
    'kamera ajaa yhä Blombosiin');
  // Se syttyy hiljaisena pisteenä sen jakson aikana, jossa etelän okra
  // ja helmet mainitaan (arabia).
  const arabia = IHMISEN_MATKA_KERTOMUS.find((j) => j.id === 'arabia');
  assert.deepEqual(arabia.hiljaiset, ['blombos']);
  assert.match(arabia.teksti, /okraa punaiseksi/);
  // Jokainen hiljainen nosto on löytöpaikka, jolla ei ole omaa jaksoa.
  for (const jakso of IHMISEN_MATKA_KERTOMUS) {
    for (const hiljainen of jakso.hiljaiset ?? []) {
      assert.ok(tunnukset.has(hiljainen), `${jakso.id}: tuntematon hiljainen ${hiljainen}`);
      assert.ok(!IHMISEN_MATKA_KERTOMUS.some((j) => j.kohde === hiljainen),
        `${hiljainen} on sekä hiljainen että jakson kohde`);
    }
  }
  // Ohjaaja sytyttää ne ilman kamera-ajoa ja ilman kuvaa.
  assert.match(OHJAAJA, /for \(const hiljainen of jakso\.hiljaiset \?\? \[\]\) sytytaKohde\(hiljainen\);/);
});

test('kello ei enää kulje taaksepäin muualla kuin aikahypyssä', () => {
  for (let i = 1; i < IHMISEN_MATKA_KERTOMUS.length; i += 1) {
    if (IHMISEN_MATKA_KERTOMUS[i].vaihe === 'hyppy') continue;
    assert.ok(IHMISEN_MATKA_KERTOMUS[i].vuosia <= IHMISEN_MATKA_KERTOMUS[i - 1].vuosia,
      `${IHMISEN_MATKA_KERTOMUS[i - 1].id} → ${IHMISEN_MATKA_KERTOMUS[i].id} kulkee taaksepäin`);
  }
  // Etelä-Afrikassa käydään enää kerran (omistaja 8.9.2026).
  const etela = IHMISEN_MATKA_KERTOMUS.filter((j) => ['pinnacle-point', 'blombos'].includes(j.kohde));
  assert.equal(etela.length, 1, 'Etelä-Afrikan rannikolla pysähdytään useammin kuin kerran');
});

/* ==================== 3. YHTENÄINEN TEKSTI ==================== */

test('kertomus kootaan kappaleiksi ilman taukomerkkejä', () => {
  const rivit = kertomuksenLuennat(LINSSI.aikajana);
  const { teksti, jaksot } = kokoaYhtenainenTeksti(rivit, { tagit: false });
  assert.equal(jaksot.length, IHMISEN_MATKA_KERTOMUS.length);
  assert.equal(KAPPALEEN_VALI, '\n\n');
  // Kappaleiden väli on tyhjä rivi eikä mitään muuta.
  assert.equal(teksti.split(KAPPALEEN_VALI).length, jaksot.length);
  assert.ok(!/<break/.test(teksti), 'koottuun tekstiin jäi break-tagi');
  assert.ok(!/\[/.test(teksti), 'koottuun tekstiin jäi eleven_v3-tagi');
  // Jaksoraja osuu merkilleen jakson omaan tekstiin.
  for (const jakso of jaksot) {
    const kaanon = IHMISEN_MATKA_KERTOMUS.find((j) => j.id === jakso.tunnus);
    assert.equal(teksti.slice(jakso.alku, jakso.loppu), kaanon.teksti, jakso.tunnus);
  }
  // Tagit mukana (v3-malli): sama teksti, mutta tagit tallella.
  const tagillinen = kokoaYhtenainenTeksti(rivit, { tagit: true });
  assert.ok(tagillinen.teksti.includes('[curious]'));
  assert.equal(tagillinen.jaksot.length, jaksot.length);
});

test('jaksosta löytyvät lauseet ja sanat, tagit ohitetaan', () => {
  const rivit = [
    { avain: 'a', teksti: 'Yksi kaksi. Kolme!', puhe: '[curious] Yksi kaksi. Kolme!' },
    { avain: 'b', teksti: 'Neljä viisi.', puhe: 'Neljä viisi.' },
  ];
  const jasennys = kertomuksenJasennys(rivit, { tagit: true });
  const a = jasennys.jaksot[0];
  assert.equal(jasennys.teksti.slice(a.alku, a.loppu), '[curious] Yksi kaksi. Kolme!');
  assert.deepEqual(a.sanat.map((s) => s.sana), ['Yksi', 'kaksi', 'Kolme']);
  assert.equal(a.lauseet.length, 2, 'kaksi lausetta');
  // Ensimmäinen lause alkaa sanasta, ei tagista.
  assert.equal(jasennys.teksti[a.lauseet[0]], 'Y');
  assert.equal(jasennys.teksti[a.lauseet[1]], 'K');
  assert.deepEqual(tagienValit('[a] b <break time="1s" />'), [[0, 3], [6, 25]]);
  // Kaanonin jaksot: jokaisessa on lauseita ja sanoja, ja ensimmäinen
  // lause alkaa jakson ensimmäisestä sanasta.
  const koko = kertomuksenJasennys(kertomuksenLuennat(LINSSI.aikajana), { tagit: false });
  for (const jakso of koko.jaksot) {
    assert.ok(jakso.lauseet.length >= 2, `${jakso.tunnus}: ${jakso.lauseet.length} lausetta`);
    assert.ok(jakso.sanat.length >= 10, `${jakso.tunnus}: ${jakso.sanat.length} sanaa`);
    assert.equal(jakso.lauseet[0], jakso.sanat[0].merkki);
    assert.ok(jakso.lauseet.every((i) => i >= jakso.alku && i < jakso.loppu));
  }
  // Jaksonjäsennys on puhdas funktio: sama tulos samasta syötteestä.
  assert.deepEqual(jaksonJasennys('Ai. Bee.', { alku: 0, loppu: 8 }).lauseet, [0, 4]);
});

/* ==================== 4. AIKALEIMAT ==================== */

/** Tekemällä jokaisesta merkistä 100 ms saa laskettavan alignmentin. */
function tekoAlignment(teksti, askel = 0.1) {
  const merkit = [...teksti];
  return {
    characters: merkit,
    character_start_times_seconds: merkit.map((_, i) => Number((i * askel).toFixed(4))),
    character_end_times_seconds: merkit.map((_, i) => Number(((i + 1) * askel).toFixed(4))),
  };
}

test('kumpikin vastausmuoto kelpaa: kohdistus ja aikaleimapääte', () => {
  // Pakotettu kohdistus: lista olioita (text, start, end sekunteina).
  const pakotettu = normalisoiAlignment({
    characters: [{ text: 'a', start: 0, end: 0.1 }, { text: 'b', start: 0.1, end: 0.2 }],
    words: [{ text: 'ab', start: 0, end: 0.2, loss: 0.1 }],
    loss: 0.1,
  });
  assert.deepEqual(pakotettu.characters, ['a', 'b']);
  assert.deepEqual(pakotettu.character_start_times_seconds, [0, 0.1]);
  // Aikaleimapääte: kolme rinnakkaista listaa, myös alignment-lohkon alla.
  const leimattu = normalisoiAlignment({
    alignment: {
      characters: ['a', 'b'],
      character_start_times_seconds: [0, 0.1],
      character_end_times_seconds: [0.1, 0.2],
    },
  });
  assert.deepEqual(leimattu.characters, ['a', 'b']);
  assert.equal(normalisoiAlignment({}), null);
  assert.equal(normalisoiAlignment({ characters: [] }), null);
  // Sama laskenta kummallekin muodolle.
  const jasennys = kertomuksenJasennys([{ avain: 'a', teksti: 'Ai bee.', puhe: 'Ai bee.' }], {});
  const merkit = [...jasennys.teksti].map((text, i) => ({ text, start: i * 0.1, end: (i + 1) * 0.1 }));
  const jaksot = aikaleimoiksi(jasennys, { characters: merkit }, { kesto: 5 });
  assert.equal(jaksot[0].alku, 0);
  assert.deepEqual(jaksot[0].sanat.map((s) => s.sana), ['Ai', 'bee']);
});

test('merkkien sovitus kestää mallin ylimääräiset merkit', () => {
  assert.deepEqual(sovitaMerkit('abc', ['a', 'b', 'c']), [0, 1, 2]);
  // Malli lisäsi välilyönnin: teksti osuu silti oikeisiin merkkeihin.
  assert.deepEqual(sovitaMerkit('abc', ['a', ' ', 'b', 'c']), [0, 2, 3]);
  // Merkki puuttuu vastauksesta: se jää nulliksi eikä siirrä muita.
  const paikat = sovitaMerkit('abc', ['a', 'c']);
  assert.equal(paikat[0], 0);
  assert.equal(paikat[2], 1);
});

test('aikaleimat: jakson alku ja loppu, lauseet ja sanat millisekunteina', () => {
  const rivit = [
    { avain: 'a', teksti: 'Yksi kaksi. Kolme!', puhe: '[curious] Yksi kaksi. Kolme!' },
    { avain: 'b', teksti: 'Neljä viisi.', puhe: 'Neljä viisi.' },
  ];
  const jasennys = kertomuksenJasennys(rivit, { tagit: true });
  const jaksot = aikaleimoiksi(jasennys, tekoAlignment(jasennys.teksti), { kesto: 60 });
  const [a, b] = jaksot;
  assert.equal(a.tunnus, 'a');
  // '[curious] ' on kymmenen merkkiä eikä puhetta: jakso alkaa vasta
  // yhdennestätoista merkistä eli 1 000 ms:stä.
  assert.equal(a.alku, 1000);
  assert.deepEqual(a.lauseet, [1000, 2200]);
  assert.deepEqual(a.sanat[0], { sana: 'Yksi', alku: 1000 });
  assert.ok(!a.sanat.some((s) => s.sana === 'curious'), 'tagi päätyi sanaksi');
  // Häntä jakson perään, muttei seuraavan jakson päälle.
  assert.ok(a.loppu > 2600 && a.loppu <= b.alku, `a.loppu ${a.loppu}, b.alku ${b.alku}`);
  assert.equal(JAKSON_HANTA_MS, 250);
  // Viimeisen jakson häntä rajautuu äänitteen kestoon.
  const lyhyt = aikaleimoiksi(jasennys, tekoAlignment(jasennys.teksti), { kesto: 4.0 });
  assert.ok(lyhyt.at(-1).loppu <= 4000);
  // Rikkinäinen alignment ei mene läpi hiljaisena.
  assert.throws(() => aikaleimoiksi(jasennys, { characters: [] }), /alignment/);
});

test('koko kaanoni saa aikaleimat ja jaksot ovat järjestyksessä', () => {
  const jasennys = kertomuksenJasennys(kertomuksenLuennat(LINSSI.aikajana), { tagit: false });
  const jaksot = aikaleimoiksi(jasennys, tekoAlignment(jasennys.teksti, 0.05));
  assert.equal(jaksot.length, IHMISEN_MATKA_KERTOMUS.length);
  let edellinen = -1;
  for (const jakso of jaksot) {
    assert.ok(jakso.alku > edellinen, `${jakso.tunnus} alkaa ennen edellistä`);
    assert.ok(jakso.loppu > jakso.alku, `${jakso.tunnus}: tyhjä väli`);
    assert.ok(jakso.lauseet.length >= 2 && jakso.sanat.length >= 10, jakso.tunnus);
    edellinen = jakso.alku;
  }
});

test('yhtenäisen luennan manifesti kertoo tilan, tiedoston ja jaksot', () => {
  const jasennys = kertomuksenJasennys(kertomuksenLuennat(LINSSI.aikajana), { tagit: false });
  const jaksot = aikaleimoiksi(jasennys, tekoAlignment(jasennys.teksti, 0.05));
  const manifesti = kokoaYhtenaManifesti({
    kaari: LINSSI.aikajana,
    jasennys,
    jaksot,
    tiedosto: 'ihmisen-matka-kertomus.mp3',
    kesto: 302.456,
  });
  assert.equal(manifesti.yhtena, true);
  assert.equal(manifesti.tiedosto, 'ihmisen-matka-kertomus.mp3');
  assert.equal(manifesti.kesto, 302.46);
  // Ääni on kertojan oma malli (v3), ja manifesti kertoo mistä
  // aikaleimat tulivat — varareitti ei saa jäädä huomaamatta.
  assert.equal(manifesti.malli, MALLI);
  assert.equal(manifesti.aikaleimalahde, AIKALEIMAN_LAHTEET.pakotettu);
  const varalla = kokoaYhtenaManifesti({
    kaari: LINSSI.aikajana,
    jasennys,
    jaksot,
    tiedosto: 'ihmisen-matka-kertomus.mp3',
    kesto: 10,
    malli: AIKALEIMOJEN_MALLI,
    aikaleimalahde: AIKALEIMAN_LAHTEET.leimattu,
  });
  assert.equal(varalla.aikaleimalahde, 'with-timestamps');
  assert.equal(varalla.malli, AIKALEIMOJEN_MALLI);
  assert.equal(manifesti.jaksoja, IHMISEN_MATKA_KERTOMUS.length);
  assert.match(manifesti.kansio, /ihmisen-matka\/puhe$/);
  assert.deepEqual(Object.keys(manifesti.jaksot[0]).sort(),
    ['alku', 'lauseet', 'loppu', 'sanat', 'tunnus']);
  // Peli ja työkalu lukevat saman manifestitiedoston.
  assert.equal(KERTOMUS_MANIFESTI, PELIN_MANIFESTI);
});

test('työkalun liput: --yhtena vaatii kertomuksen eikä siedä jaksovalintaa', () => {
  const yhtena = tulkitseArgumentit(['--linssi', 'ihmisen-matka', '--kertomus', '--yhtena']);
  assert.equal(yhtena.virhe, undefined);
  assert.equal(yhtena.yhtena, true);
  assert.equal(yhtena.malli, MALLI, 'yhtenäisen luennan ääni ei ole enää v3');
  assert.match(tulkitseArgumentit(['--yhtena']).virhe, /--kertomus/);
  assert.match(tulkitseArgumentit(['--kertomus', '--yhtena', '--pysakit', 'avaus']).virhe, /--pysakit/);
  assert.match(tulkitseArgumentit(['--kertomus', '--malli', 'x']).virhe, /--yhtena/);
  // Mallia ei vaihdeta hiljaa: --malli on käsivalinta, ja varareitin
  // oma malli on erikseen nimetty vakio.
  assert.equal(tulkitseArgumentit(['--kertomus', '--yhtena', '--malli', 'x']).malli, 'x');
  assert.equal(MALLI, 'eleven_v3');
  assert.equal(tunteeTagit(MALLI), true);
  assert.equal(tunteeTagit(AIKALEIMOJEN_MALLI), false);
  assert.equal(PAKOTETUN_OSOITE, 'https://api.elevenlabs.io/v1/forced-alignment');
  assert.match(aikaleimojenOsoite('AANI'), /\/v1\/text-to-speech\/AANI\/with-timestamps/);
  // Entinen jakso kerrallaan -tila on yhä olemassa.
  const jaksoittain = tulkitseArgumentit(['--kertomus']);
  assert.equal(jaksoittain.yhtena, false);
  assert.equal(jaksoittain.virhe, undefined);
  // Yhtenäinen luenta on pitkä: oma kestokattonsa.
  assert.ok(YHTENAN_KESTO_MAX_S > 300 && YHTENAN_KESTO_MAX_S <= 1800);
  // Alun hiljaisuutta ei leikata: aikaleimat lasketaan nollasta.
  const suodatin = leikkaaVainLoppuSuodatin();
  assert.equal(suodatin.split(',').length, 3, suodatin);
  assert.ok(suodatin.startsWith('areverse,') && suodatin.endsWith(',areverse'));
});

/* ==================== 5. PELIN PUOLI ==================== */

const TEKOMANIFESTI = {
  versio: 2,
  yhtena: true,
  tiedosto: 'ihmisen-matka-kertomus.mp3',
  kesto: 300,
  jaksot: [
    {
      tunnus: 'avaus',
      alku: 0,
      loppu: 8200,
      lauseet: [0, 3100],
      sanat: [{ sana: 'Tiedätkö', alku: 0 }, { sana: 'mistä', alku: 900 }],
    },
    {
      tunnus: 'afrikka',
      alku: 8500,
      loppu: 15000,
      lauseet: [8500, 12000],
      sanat: [{ sana: 'Tämä', alku: 8500 }],
    },
    // Kelvoton rivi ei saa vaientaa koko kertomusta.
    { tunnus: 'rikki', alku: 20000, loppu: 20000 },
  ],
};

test('manifestin jaksot luetaan hakurakenteeksi ja suhteutetaan jakson alkuun', () => {
  const kartta = jaksojenAikaleimat(TEKOMANIFESTI);
  assert.equal(kartta.size, 2, 'kelvoton rivi tuli mukaan');
  assert.equal(kartta.get('avaus').loppu, 8200);
  // Aikaleimat esitykselle: nolla on jakson ensimmäinen ääni.
  const afrikka = jaksonAikaleimat(kartta.get('afrikka'));
  assert.deepEqual(afrikka.lauseet, [0, 3500]);
  assert.deepEqual(afrikka.sanat, [{ sana: 'Tämä', alku: 0 }]);
  // Jakso kerrallaan -manifesti (versio 1) ei ole yhtenäinen luenta.
  assert.equal(jaksojenAikaleimat({ jaksot: TEKOMANIFESTI.jaksot }).size, 0);
  assert.equal(tiedostonRunko('ihmisen-matka-kertomus.mp3'), 'ihmisen-matka-kertomus');
  assert.equal(tiedostonRunko(''), null);
});

test('soitin lukee manifestin ja antaa jaksolle aikaleimat', async () => {
  const ajo = { ui: {}, luentajuuri: 'https://esimerkki/aikajana/ihmisen-matka/puhe' };
  const haetut = [];
  const luenta = luoKertomusluenta({
    ajo,
    etuliite: 'ihmisen-matka-kertomus',
    hae: async (url) => {
      haetut.push(url);
      return { ok: true, json: async () => TEKOMANIFESTI };
    },
  });
  await luenta.valmis;
  assert.deepEqual(haetut, [`${ajo.luentajuuri}/${PELIN_MANIFESTI}`]);
  assert.equal(luenta.yhtena(), true);
  assert.equal(luenta.leimat('avaus').loppu, 8200);

  const jakso = { id: 'afrikka', teksti: 'Tämä on se maanosa…' };
  let kesto = null;
  // Selaimeton ympäristö: soitinta ei synny, mutta kesto ja aikaleimat
  // menevät esitykselle — juuri niiden varassa kello ja kamera kulkevat.
  luenta.aloita(jakso, { onKesto: (ms) => { kesto = ms; } });
  assert.equal(kesto, 6500);
  assert.deepEqual(jakso.aikaleimat.lauseet, [0, 3500]);
  assert.deepEqual(jakso.aikaleimat.sanat, [{ sana: 'Tämä', alku: 0 }]);
  luenta.pura();
});

test('ilman manifestia soitin putoaa jakso kerrallaan -tilaan', async () => {
  const ajo = { ui: {}, luentajuuri: 'https://esimerkki/puhe' };
  const luenta = luoKertomusluenta({ ajo, hae: async () => ({ ok: false, status: 404 }) });
  await luenta.valmis;
  assert.equal(luenta.yhtena(), false);
  const jakso = { id: 'avaus', teksti: 'Tiedätkö…' };
  assert.equal(luenta.aloita(jakso, {}), null);
  assert.equal(jakso.aikaleimat, undefined, 'aikaleimoja ei saa keksiä ilman manifestia');
  luenta.pura();
});

test('esitys soittaa luennan oman moduulinsa kautta', () => {
  // Ohjaaja ei enää tunne tiedostonimiä eikä soittimia: se pyytää
  // moduulilta soittimen ja keston (ja saa aikaleimat jaksolle).
  assert.match(OHJAAJA, /import \{ luoKertomusluenta \} from '\.\/ihmisen-matka-luenta\.js';/);
  assert.match(OHJAAJA, /const luenta = luoKertomusluenta\(\{ ajo, etuliite \}\);/);
  assert.match(OHJAAJA, /tila\.aani = luenta\.aloita\(jakso, \{/);
  assert.match(OHJAAJA, /luenta\.pura\(\);/);
  assert.ok(!/soitaLinssiluenta/.test(OHJAAJA), 'ohjaaja soittaa yhä itse');
  // Tauko, jatko ja aikaselain käyttävät yhä samaa kahvaa.
  assert.match(OHJAAJA, /tila\.aani\?\.pause\(\)/);
  assert.match(OHJAAJA, /tila\.aani\.play\(\)/);
  // Kelaus jakson alkuun tehdään ENNEN soittoa (linssipuheen koukku).
  assert.match(PUHE, /juuri = LINSSILUENTA_JUURI, valmistele = null,/);
  assert.match(PUHE, /if \(typeof valmistele === 'function'\) valmistele\(audio\);/);
  // Uusi moduuli kuuluu palvelutyöntekijän kuoreen (offline-peli).
  assert.match(SW, /'\.\/js\/linssit\/ihmisen-matka-luenta\.js'/);
});

test('ajo tarjoaa yhtenäisen luennan omana syötteenään', () => {
  assert.match(AJO, /^ {6}yhtena:$/m, 'workflowista puuttuu yhtena-syöte');
  assert.match(AJO, /--yhtena --kuiva/, 'kuiva ajo ei tulosta yhtenäistä tekstiä');
  assert.match(AJO, /\$LIPPU --yhtena \$PAKOTALIPPU/, 'ajo ei generoi yhtenäistä luentaa');
  // Yhtenäinen luenta ei käy yhteen jaksovalinnan kanssa.
  assert.match(AJO, /jätä pysakit tyhjäksi/);
  // Ajo kertoo, että ääni on v3 ja aikaleimat tulevat kohdistuksesta.
  assert.match(AJO, /forced-alignment/);
});

test('ääni on v3 tageineen, aikaleimat pakotetusta kohdistuksesta', () => {
  const TYOKALU = readFileSync(new URL('../tools/generoi-linssiluennat.mjs', import.meta.url), 'utf8');
  // 1) Ääni: sama pääte, malli ja asetukset kuin jakso kerrallaan.
  assert.match(TYOKALU, /const tavut = await haeApista\(lahetetty\.teksti, avain, lahde, \{ malli \}\);/);
  // 2) Aikaleimat: valmis mp3 + tagiton teksti kohdistuspäätteeseen.
  assert.match(TYOKALU, /kohdistus = await haeKohdistus\(kohde, puhuttu\.teksti, avain\);/);
  assert.match(TYOKALU, /lomake\.append\('file'/);
  assert.match(TYOKALU, /lomake\.append\('text', teksti\);/);
  // 3) Varareitti kirjataan, ei vaihdeta hiljaa.
  assert.match(TYOKALU, /aikaleimalahde = AIKALEIMAN_LAHTEET\.leimattu;/);
  assert.match(TYOKALU, /aaniMalli = AIKALEIMOJEN_MALLI;/);
  assert.match(TYOKALU, /VARAREITTI/);
  assert.deepEqual(AIKALEIMAN_LAHTEET, {
    pakotettu: 'forced-alignment', leimattu: 'with-timestamps',
  });
  // Aikaleimat lasketaan TAGITTOMASTA tekstistä (se on se, mikä kuuluu).
  assert.match(TYOKALU, /const jaksot = aikaleimoiksi\(puhuttu, kohdistus, \{ kesto: tulos\.pituus \}\);/);
});
