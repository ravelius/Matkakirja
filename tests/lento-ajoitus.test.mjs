// Avauslennon ajoitus ja kirjoituskoneen ääni.
//
// Omistajan palaute 12.8.2026: kertojan luennan pitää alkaa aavistuksen
// aiemmin ja ruututekstin aavistuksen myöhemmin — ääni edellä, teksti
// perässä — ja lennon tekstin taustalle sama naputus kuin etusivun
// avaustekstissä. Kumpikaan ei näkyisi virheenä jos se katoaisi: lento
// vain tuntuisi taas väärältä. Siksi luvut ja kytkennät vartioidaan
// lähdekoodista, kuten muutkin ajoitukset.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { kirjoituksenKesto } from '../js/ui.js';
import { maahanMuoto, paikassaMuoto } from '../js/ui-apurit.js';

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');
const FOKUSKARTTA = readFileSync(new URL('../js/fokuskartta.js', import.meta.url), 'utf8');
const POLLO = readFileSync(new URL('../js/pollo.js', import.meta.url), 'utf8');
const CSS = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');

const luku = (nimi) => Number(UI.match(new RegExp(`const ${nimi} = (\\d+)`))[1]);

test('kertojan luenta alkaa aiemmin kuin ennen, mutta moottorin noustua', () => {
  const puhe = luku('LENNON_PUHE_MS');
  /*
   * Ajoituksen historia: 4200 → 3800 (12.8. "aavistus aiemmin") →
   * 2300 (13.8. omistaja: "aikaista ensimmäisen lennon luentaa
   * puolella toista sekunnilla"). Alaraja pitää huolen, ettei kertoja
   * silti ala ennen kuin moottori on ehtinyt kuuluviin.
   */
  assert.ok(puhe >= 2100 && puhe <= 2500,
    `luennan viive ${puhe} ms ei ole noin 1,5 s entistä 3800:aa aiemmin`);
  assert.match(UI, /\}, LENNON_PUHE_MS\);/, 'luennan ajastin käyttää yhä kovakoodattua lukua');
});

test('ruututeksti alkaa myöhemmin kuin kalvo', () => {
  const viive = luku('LENNON_TEKSTI_VIIVE_MS');
  assert.ok(viive >= 300 && viive <= 500,
    `tekstin aloitusviive ${viive} ms ei ole 300–500 ms`);
  // Viive on oikeasti kirjoituksen edessä eikä pelkkä vakio.
  const naytto = UI.match(/showFlightLine\(line, kotelo\) \{[\s\S]*?\n  \}/)[0];
  assert.match(naytto, /setTimeout\(\(\) => \{[\s\S]*?typeText\([\s\S]*?\}, LENNON_TEKSTI_VIIVE_MS\)/,
    'lennon repliikki alkaa yhä heti kalvon auettua');
  // Ohitettu lento ei saa jättää ajastinta naputtamaan irronneeseen riviin.
  assert.match(UI, /clearTimeout\(this\.lentoTekstiAjastin\)/,
    'kirjoituksen ajastinta ei siivota');
});

test('ääni on tekstin edellä', () => {
  assert.ok(luku('LENNON_PUHE_MS') > luku('LENNON_TEKSTI_VIIVE_MS'),
    'kertoja aloittaisi vasta tekstin jälkeen');
});

test('kone ei laskeudu kesken kirjoituksen', () => {
  /*
   * Lennon kesto lasketaan kirjoituksen kestosta. Kun kirjoitus alkaa
   * viiveellä, viiveen on oltava summassa mukana — muuten se söisi
   * juuri saman verran siitä lukuajasta, jonka takia mitoitus tehtiin.
   */
  assert.match(UI, /LENNON_TEKSTI_VIIVE_MS \+ kirjoituksenKesto\(line\) \+ LENNON_LUKUAIKA_MS/,
    'lennon kesto ei huomioi tekstin aloitusviivettä');
  // Pisin oikeasti esiintyvä rivi ei saa ylittää lennon ylärajaa niin,
  // että kirjoitus jäisi kesken.
  const viive = luku('LENNON_TEKSTI_VIIVE_MS');
  const lukuaika = luku('LENNON_LUKUAIKA_MS');
  const enintaan = luku('LENNON_ENINTAAN_MS');
  const rivi = 'Lontoo katosi sumuun… ja edessä on koko maailma, isoisän '
    + 'muistiinpanot kädessä; nyt se alkaa, tämä matka, jota olen odottanut.';
  assert.ok(viive + kirjoituksenKesto(rivi) + lukuaika < enintaan,
    'tavanomainen repliikki ei ehdi kirjoittua lennon ylärajan sisällä');
});

test('automaattinen jatko odottaa, että rivi on oikeasti valmis', () => {
  /*
   * Mitattu 12.8.2026 (Chromium, kontti): kuormitettu pääsäie venytti
   * 25 sanan rivin 8 sekunnin arviosta 28 sekuntiin, kun kone lensi
   * selaimen omana animaationa perille 14 sekunnissa. Pelkkä arvio ei
   * siis riitä takeeksi — lento odottaa kirjoituksen kuittausta.
   *
   * Astu mantereelle -nappi poistui 26.8.2026 (omistajan tilaus), ja
   * sääntö on nyt automaattisen jatkon ehto: jatko lähtee vasta kun
   * rivi on valmis. Ohituslupaus on kolmantena kilvassa, koska
   * napauttamalla pääsee myös tämän odotuksen ohi.
   */
  assert.match(UI, /this\.flightLineValmis = new Promise\(/,
    'kirjoituksen valmistumisesta ei synny kuittausta');
  assert.match(UI, /await Promise\.race\(\[\s*this\.flightLineValmis \?\? Promise\.resolve\(\),\s*this\.wait\(LENNON_TEKSTI_ODOTUS_MS\),\s*ohitusLupaus,\s*\]\);/,
    'lento ei odota kirjoituksen kuittausta ennen automaattista jatkoa');
  // Varoventtiili ei saa katketa juuri ennen kuin rivi on valmis:
  // mitattu hitain tapaus tarvitsi 15,2 s odotusta.
  assert.ok(luku('LENNON_TEKSTI_ODOTUS_MS') >= 25000,
    'kirjoituksen odotus katkeaa liian aikaisin');
});

test('lennon jälkeen ei ole nappia vaan automaattinen jatko', () => {
  /*
   * Omistajan tilaus 26.8.2026: *"Peli voisi lennon jälkeen
   * automaattisesti jatkaa mantereelle, eli ota siitä pois astu
   * mantereelle -nappi. Muuten tulee liikaa nappeja heti alkuun."*
   *
   * Nappi oli molemmilla lentopoluilla (kalvolento ja avauslento
   * kartalla), joten sen paluu on estettävä molemmista.
   */
  assert.doesNotMatch(UI, /flight-exit/,
    'Astu mantereelle -nappi on palannut js/ui.js:ään');
  // Napin teksti merkkijonona (proosa kommenteissa saa kertoa napista,
  // joka joskus oli).
  assert.doesNotMatch(UI, /'Astu mantereelle'/,
    'Astu mantereelle -napin teksti on palannut js/ui.js:ään');
  // Jatko on oikeasti odotus eikä välitön leikkaus: laskeutuminen
  // pitää ehtiä nähdä.
  const jatko = luku('LENNON_JATKO_MS');
  assert.ok(jatko >= 700 && jatko <= 2000,
    `automaattisen jatkon viive ${jatko} ms ei ole noin sekunti`);
  const odotus = /if \(!ohitettu\) await Promise\.race\(\[this\.wait\(LENNON_JATKO_MS\), ohitusLupaus\]\);/g;
  assert.equal(UI.match(odotus)?.length, 2,
    'automaattinen jatko puuttuu jommaltakummalta lentopolulta');
});

test('napautus vie lennon läpi eikä vuoda alla oleviin elementteihin', () => {
  // Ohitus on nyt koko lennon loppu: se päättää animaatiot ja tekstin,
  // vapauttaa odotukset ja nielaisee napautuksen jälkipuolen, ettei
  // sama kosketus osu kartalle, joka juuri paljastui.
  for (const kasittelija of UI.match(/const ohita(Lento)? = \(\) => \{[\s\S]*?\n    \};/g) ?? []) {
    assert.match(kasittelija, /finish\(\);/, 'ohitus ei vie animaatioita loppuun');
    assert.match(kasittelija, /this\.paataLennonTeksti\(line\);/, 'ohitus ei päätä repliikkiä');
    assert.match(kasittelija, /this\.nielaiseNapautus\(\);/, 'ohitus ei nielaise napautusta');
    assert.match(kasittelija, /ohitusKuittaus\(\);/, 'ohitus ei vapauta odotusta');
  }
  assert.equal((UI.match(/this\.nielaiseNapautus\(\)/g) ?? []).length, 2,
    'nielu puuttuu jommaltakummalta lentopolulta');
  // Nielu kattaa saman napautuksen loppuosan muttei seuraavaa.
  const nielu = luku('LENNON_NIELU_MS');
  assert.ok(nielu >= 250 && nielu <= 900, `nielun kesto ${nielu} ms on väärää luokkaa`);
  assert.match(UI, /addEventListener\(laji, nielaise, true\)/,
    'nielu ei ole kaappausvaiheessa, joten se ei ehdi alla olevien edelle');
});

test('ohitus vie myös repliikin loppuun', () => {
  // Muuten napautus hypäyttäisi koneen perille ja jäisi sitten
  // odottamaan juuri sitä kirjoitusta, jonka pelaaja ohitti.
  const kasittelija = UI.match(/const ohita = \(\) => \{[\s\S]*?\};/)[0];
  assert.match(kasittelija, /for \(const a of lentoAnimaatiot\) a\.finish\(\);/);
  assert.match(kasittelija, /this\.paataLennonTeksti\(line\);/);
  assert.match(UI, /overlay\.addEventListener\('pointerdown', ohita, \{ once: true \}\)/);
  assert.match(UI, /nuoli\.addEventListener\('click', ohita\)/);
});

test('lennon teksti naputtaa samalla äänellä kuin etusivun avaus', () => {
  /*
   * Aiempi poisjättö (naputus jätettiin lennolta pois matkustamon
   * äänimaiseman takia) on omistajan päätöksellä kumottu. Sama
   * sfx.play('pen') tarkoittaa myös, että äänet pois -asetus vaientaa
   * sen: SoundKit.play palaa heti, jos enabled on epätosi.
   */
  assert.match(UI, /if \(KIRJOITUSRYTMI\.has\(slot\)\) sfx\.play\('pen'\);/,
    'naputus ei seuraa kirjoitusrytmin paikkoja');
  const rytmi = UI.match(/const KIRJOITUSRYTMI = new Set\(\[([^\]]*)\]\)/)[1];
  assert.match(rytmi, /'intro'/, 'avausteksti ei enää naputa');
  assert.match(rytmi, /'flight'/, 'lennon repliikki ei naputa');
  // Naputus soitetaan vain kirjoitushetkellä, joten se loppuu itsestään
  // viimeiseen sanaan — silmukkaa ei ole eikä sitä tarvitse pysäyttää.
  assert.ok(!/sfx\.play\('pen'[^)]*loop/.test(UI), 'naputus soi silmukkana');
  // Saapumisen välikortti kirjoittuu samalla kädellä (tilaus 26.8.2026).
  assert.match(rytmi, /'saapuminen'/, 'saapumisen välikortti ei naputa');
});

/*
 * ====================================================================
 * SAAPUMISSEKVENSSI (omistajan tilaus 26.8.2026)
 * ====================================================================
 *
 * Lento → feidi tyhjään paperiin → välikortti (kaupunki +
 * päivälaskuri) → kartta suoraan oikeassa zoomitilassa → pöllön kaksi
 * kuplaa allekkain. Sekvenssi on kokonaisuudessaan selainsavukkeen
 * (tools/savuke-etusivun-animaatio.mjs) mitattavana; tässä vartioidaan
 * ne kohdat, jotka katoaisivat huomaamatta: kaanoniksi sovitut
 * sanamuodot, taivutus ja se, ettei kamera ala ajaa.
 */

test('välikortti kertoo kaupungin ja päivälaskurin', () => {
  const teksti = UI.match(/saapumisKortinTeksti\(kohde\) \{[\s\S]*?\n  \}/)[0];
  assert.match(teksti, /toUpperCase\(\)/, 'kaupungin nimi ei ole versaalilla');
  assert.match(teksti, /dayCount/, 'päivä ei tule pelin omasta kellosta');
  assert.match(teksti, /PÄIVÄ \$\{paiva\}\/\$\{RECORD_DAYS\}/, 'päivälaskurin muoto muuttui');
});

test('kartta ilmestyy saapumisessa ilman kamera-ajoa', () => {
  // Ajo alkaisi näkymästä, jota kukaan ei nähnyt (arkki peittää sen).
  assert.match(FOKUSKARTTA, /ui\.saapumisAsettuu \? \{ kesto: 0 \} : \{\}/,
    'saapumisen kamera-ajoa ei enää ohiteta kestolla 0');
  assert.match(UI, /this\.saapumisAsettuu = true;[\s\S]{0,200}this\.render\(\);/,
    'lippua ei nosteta ennen saapumisen renderiä');
  assert.match(UI, /this\.saapumisAsettuu = false;/, 'lippu jää pystyyn renderin jälkeen');
});

test('pöllön kaksi kuplaa: kaanonin sanamuoto ja pari allekkain', () => {
  assert.match(UI, /const SAAPUMISEN_KUPLA_TOINEN = 'Klikkaa vihreää pistettä kartalla\.';/,
    'toisen kuplan kaanonlause muuttui');
  assert.match(UI, /`Tervetuloa \$\{maahanMuoto\(maa\)\}\. Sinun on ratkaistava tehtävä \$\{paikka\} `/,
    'ensimmäisen kuplan kaanonlause muuttui');
  // Toinen kupla EI saa hävittää ensimmäistä: molemmat ruudulla yhtä aikaa.
  assert.match(POLLO, /naytaLisavihje\(teksti\) \{/, 'toista kuplaa ei ole');
  assert.match(POLLO, /this\.vihje\.classList\.add\('pollo-vihje-parina'\);/,
    'ylempi kupla ei luovu kärjestään');
  assert.match(POLLO, /export function polloLisavihje/, 'toista kuplaa ei voi näyttää ui.js:stä');
});

test('paikannimet taipuvat kuplaan oikein', () => {
  // Sääntö hoitaa säännölliset…
  assert.equal(maahanMuoto('Kreikka'), 'Kreikkaan');
  assert.equal(maahanMuoto('Algeria'), 'Algeriaan');
  assert.equal(maahanMuoto('Turkki'), 'Turkkiin');
  assert.equal(maahanMuoto('Marokko'), 'Marokkoon');
  assert.equal(maahanMuoto('Iran'), 'Iraniin');
  assert.equal(maahanMuoto('Thaimaa'), 'Thaimaahan');
  // …taulukko poikkeukset (monikot, saaret, astevaihtelu).
  assert.equal(maahanMuoto('Yhdysvallat'), 'Yhdysvaltoihin');
  assert.equal(maahanMuoto('Filippiinit'), 'Filippiineille');
  assert.equal(maahanMuoto('Kypros'), 'Kyprokselle');
  assert.equal(paikassaMuoto('Ateena'), 'Ateenassa');
  assert.equal(paikassaMuoto('Istanbul'), 'Istanbulissa');
  assert.equal(paikassaMuoto('New York'), 'New Yorkissa');
  assert.equal(paikassaMuoto('Kööpenhamina'), 'Kööpenhaminassa');
  assert.equal(paikassaMuoto('Wien'), 'Wienissä');
  assert.equal(paikassaMuoto('Helsinki'), 'Helsingissä');
  assert.equal(paikassaMuoto('Kreeta'), 'Kreetalla');
  // Tyhjä nimi ei saa tuottaa roskaa: kupla jää silloin pois.
  assert.equal(maahanMuoto(''), '');
  assert.equal(paikassaMuoto(null), '');
});

test('lentokohtauksen koristeet ovat transformia ja peittävyyttä', () => {
  /*
   * iOS:n webapp-tila palauttaa suodatetun kerroksen tyhjänä (ks.
   * tests/sw.test.mjs). Kohtauksen uudet osat — katkojälki, vanavesi,
   * leima, vinjetti ja harsopilvet — eivät siksi saa käyttää yhtäkään
   * suodatinta, ja niiden pehmeys on liu'uissa.
   */
  const osiot = ['.lento-katko', '.lento-vana', '.lento-leima', '.lento-vinjetti', '.lento-pilvi'];
  for (const valitsin of osiot) {
    const saanto = CSS.match(new RegExp(`\\${valitsin}[^{]*\\{[^}]*\\}`))?.[0] ?? '';
    assert.ok(saanto, `${valitsin} puuttuu tyyleistä`);
    assert.doesNotMatch(saanto, /filter:/, `${valitsin} käyttää suodatinta`);
  }
  // Pilvet ovat kartan päällä koko lennon: liike on transformia omalla
  // kerroksellaan, muuten kartta piirtyisi uudelleen joka kehyksellä.
  const pilvi = CSS.match(/\.lento-pilvi \{[^}]*\}/)[0];
  assert.match(pilvi, /will-change: transform/, 'pilvi ei nouse omalle kerrokselleen');
  assert.match(CSS, /@keyframes lento-pilvi-ajelehdi \{[^}]*translate3d/,
    'pilven ajelehdinta ei ole transform-animaatio');
  // Leiman avainruudut ovat CSS-muunnoksia: yksikötön translate on
  // kelvoton ja pudottaisi koko muunnoksen (mitattu 26.8.2026).
  assert.match(UI, /const perus = `translate\(\$\{x\.toFixed\(2\)\}px, \$\{y\.toFixed\(2\)\}px\) rotate\(\$\{kallistus\}deg\)`/,
    'leiman muunnos ei ole yksiköllistä CSS:ää');
});
