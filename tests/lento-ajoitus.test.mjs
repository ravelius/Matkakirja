// Etusivun avauksen ja avauslennon ajoitus sekä kirjoituskoneen ääni.
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
  assert.match(UI, /setTimeout\(\(\) => this\.lueLennonRepliikki\(\),\s*LENNON_PUHE_MS\)/,
    'vanhan kalvolennon luennan ajastin ei käytä enää LENNON_PUHE_MS:ää');
});

/*
 * KARTTALENTO OTTAA HETKENSÄ KOHTAUKSESTA EIKÄ KELLOSTA (omistaja
 * 3.9.2026: *"kertojan ääni jäi kuulumattomiin"*). Ajastin osui
 * täsmälleen siihen ikkunaan, jossa lauta vaihtuu ja sata laattaa
 * noudetaan, ja lennon finally perui myöhässä olevan ajastimen. Nyt
 * karttalento perii ajastimen itse ja lukee repliikin siinä kohdassa,
 * jossa kartta on valmis ja arkki alkaa väistyä. Ilman tätä vartiota
 * vika palaisi hiljaa: peli näyttäisi samalta, kertoja vain vaikenisi.
 */
test('karttalento lukee repliikin kohtauksesta, ei ajastimesta', () => {
  const lento = UI.match(/async aloituslentoSisalla\([\s\S]*?\n  \}\n/)[0];
  assert.match(lento, /clearTimeout\(this\.lentoPuheAjastin\)/,
    'karttalento ei peri ajastinta itselleen');
  assert.match(lento, /await odotaPyramidi\(this[\s\S]*?this\.lueLennonRepliikki\(\);[\s\S]*?await this\.piilotaAloitusverho\(\);/,
    'luenta ei ala laattojen valmistuttua juuri ennen arkin väistymistä');
  // Sama ääni ei saa lähteä kahdesti: lippu on luennan ainoa portti.
  const luenta = UI.match(/ {2}lueLennonRepliikki\(\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(luenta, /this\.lennonLuentaAlkoi/, 'luennan kertalippu puuttuu');
  assert.match(luenta, /puhe-lento-alku\.mp3/, 'luenta ei soita avauslennon äänitettä');
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

/*
 * OHITUS PÄTEE MYÖS ARKIN TAKANA (v1493).
 *
 * v1492 siirsi avauslennon taakse laattojen odotuksen (odotaPyramidi,
 * katto kuusi sekuntia), ja se odotus tapahtuu pergamenttiarkin takana.
 * Arkki on kartan kerrosten yläpuolella ja nielee napautukset
 * tarkoituksella (css .aloitusverho z-index 50 vastaan lentokalvon 7),
 * joten pelaajan kiire ei tavoittanut ohituskuuntelijaa lainkaan:
 * mitattuna (tools/savuke-etusivun-animaatio.mjs) välikortti tuli vasta
 * 8 s napautuksesta, kun sääntö on *"pääsee siirtymään mantereelle
 * välittömästi"* (omistaja 26.8.2026).
 *
 * Kolme kytkentää pitää vian poissa, eikä yksikään niistä näy pelissä
 * virheenä jos se katoaa — lento vain lakkaa tottelemasta sormea.
 */
test('napautus arkin takana katkaisee lennon ennen kuin se alkaa', () => {
  const lento = UI.match(/async aloituslentoSisalla\([\s\S]*?\n {2}\}\n/)[0];
  assert.match(lento, /this\.aloitusverho\?\.addEventListener\('pointerdown', ohitaLento, \{ once: true \}\)/,
    'arkki ei välitä napautusta ohitukselle, joten kiire ei tavoita lentoa');
  assert.match(lento, /await odotaPyramidi\(this, \{[\s\S]*?keskeytys: \(\) => ohitettu,[\s\S]*?\}\)/,
    'laattojen odotus ei katkea ohituksesta');
  assert.match(lento, /if \(!ohitettu\) await this\.piilotaAloitusverho\(\);/,
    'ohitettu lento paljastaa kartan hetkeksi ennen välikorttia');
  assert.match(lento, /if \(!ohitettu\) \{\s*await new Promise\(\(valmis\) => requestAnimationFrame/,
    'kone lähtee lentoon vielä ohituksen jälkeenkin');
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

/*
 * SAAPUMISEN KAMERA-AJO POISTUI LEHTIPURUSSA (30.8.2026). Ajo asui
 * js/fokuskartta.js:ssä ja vei näkymän maalehden ikkunaan; nyt kartta on
 * yksi laattapyramidi eikä maakohtaisia ikkunoita ole. Saapumisessa
 * kartta on siinä rajauksessa, johon lento sen jätti, eikä erillistä
 * "asettuu eikä aja" -lippua enää ole vartioitavana.
 */

test('pöllön kaksi kuplaa: kaanonin sanamuoto ja pari allekkain', () => {
  assert.match(UI, /const SAAPUMISEN_KUPLA_TOINEN = 'Klikkaa kaupungin kultaista merkkiä kartalla\.';/,
    'toisen kuplan kaanonlause muuttui');
  assert.match(UI, /`Tervetuloa \$\{maahanMuoto\(maa\)\}\. Sinun on ratkaistava tehtävä \$\{paikka\} `/,
    'ensimmäisen kuplan kaanonlause muuttui');
  // Toinen kupla EI saa hävittää ensimmäistä: molemmat ruudulla yhtä
  // aikaa. Kuplapinon myötä (3.9.2026) pinoaminen on pinon työtä ja
  // kärki CSS:n: vain pinon viimeinen kupla osoittaa pöllöön.
  assert.match(POLLO, /naytaLisavihje\(teksti\) \{/, 'toista kuplaa ei ole');
  assert.match(POLLO, /this\.lisaaPinoon\(kupla\);/, 'toinen kupla ei mene pinoon');
  assert.match(CSS, /\.pollo-kuplapino \.pollo-vihje:not\(:last-child\)::after \{ display: none; \}/,
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
   * tests/sw.test.mjs). Kohtauksen osat — katkojälki, vanavesi,
   * laivareitit, vinjetti ja harsopilvet — eivät siksi saa käyttää
   * yhtäkään suodatinta, ja niiden pehmeys on liu'uissa.
   *
   * SAAPUMISLEIMA (.lento-leima) OLI TÄSSÄ LISTASSA. Se poistettiin
   * v1119:ssä omistajan pelitestipalautteesta (*"näkyy vain lopussa,
   * turha"*), ja sen tilalle tulivat laivareitit.
   */
  const osiot = [
    '.lento-katko', '.lento-vana', '.lento-laivareitti', '.lento-laivapiste',
    '.lento-vinjetti', '.lento-pilvi',
  ];
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
  // Leima ei saa palata: se on poistettu sekä koodista että tyyleistä.
  assert.doesNotMatch(UI, /lennonLeima\(/, 'saapumisleima on palannut js/ui.js:ään');
  assert.doesNotMatch(CSS, /\.lento-leima\b/, 'saapumisleiman tyylit ovat palanneet');
});

/*
 * KARTTA NÄKYY LENNOLLA ILMAN SUMENNUSTA (omistaja 5.9.2026 klo 00.35:
 * *"lentokonekohtauksessa kartta voi näkyä ilman sumennusta"*).
 *
 * Kalvo oli PALLOLAUDAN oma (.pallolauta-harso) ja se on poistettu;
 * tasokartan lentokerros pitää omansa. Tämä vartio katsoo kohtauksen
 * yhteistä osaa js/ui.js:ssä: lentokalvo on läpinäkyvä eikä yksikään
 * sen päälle nostettu kerros — vinjetti, valokuvakortti, ohitusnuoli —
 * saa tuoda sumennusta takaisin.
 */
test('lentokohtaus ei sumenna karttaa', () => {
  const kalvo = CSS.match(/\.flight-overlay\.kartalla \{[^}]*\}/)[0];
  assert.match(kalvo, /backdrop-filter: none;/, 'lentokalvo sumentaa taustan');
  assert.match(kalvo, /background: none;/);
  // Pallolaudan harso on poistettu kokonaan (js/pallolauta/lauta.js).
  assert.doesNotMatch(CSS, /^\.pallolauta-harso[\s.,{]/m, 'pallon lentoharso on palannut');
  // Kortti, vinjetti ja nuoli ovat peittävyyttä ja maskia, eivät suodatinta.
  for (const valitsin of ['.lento-valokuva \{', '.lento-valokuva img \{', '.flight-eteen \{']) {
    const saanto = CSS.match(new RegExp(`${valitsin}[^}]*\\}`))[0];
    assert.doesNotMatch(saanto, /filter:/, `${valitsin} käyttää suodatinta`);
  }
});

test('laivareitit merellä ovat laudan omia merireittejä', () => {
  /*
   * Omistajan pelitestipalaute v1119 (leiman tilalle): *"piirrä
   * lentonäkymän mereen muutama himmeä laivareittiviiva (katkoviiva,
   * vanhan merikartan tyyli) ja niihin HYVIN himmeät pisteet jotka
   * liikkuvat hitaasti ja välkkyvät kevyesti (transform/opacity, ei
   * filtereitä; poistuvat laskeutuessa)."*
   */
  const metodi = UI.match(/lennonLaivareitit\(\{ kerros, skaala = 1 \}\) \{[\s\S]*?\n  \}/)[0];
  assert.match(metodi, /reitti\?\.type !== 'sea'/,
    'laivareitit eivät tule laudan merireiteistä');
  assert.match(metodi, /iterations: Infinity/, 'laivan piste ei liiku');
  // Liike on transformia ja välke peittävyyttä — ei suodattimia.
  assert.match(metodi, /transform: `translate\(/, 'pisteen liike ei ole transform');
  assert.match(metodi, /opacity: 0\.\d+ \}, \{ opacity: 0\.\d+ \}/, 'välke ei ole peittävyyttä');
  // Suodatin tyylinä (Array.prototype.filter on eri asia).
  assert.doesNotMatch(metodi, /filter\s*[:=]/, 'laivareitit käyttävät suodatinta');
  // Reitit ovat lentoreitin ALLA: ne ovat taustaa eivätkä tapahtuma.
  assert.match(UI, /this\.lennonLaivareitit\(\{ kerros, skaala \}\);[\s\S]{0,700}class: 'flight-trail'/,
    'laivareitit piirtyvät lentoreitin päälle');
});

test('pöllön kuplat odottavat matkapäiväkirjan luennan loppumista', () => {
  /*
   * Omistajan pelitestipalaute v1119: kuplat ponnahtivat kertojan
   * päälle kesken merkinnän. Ensimmäinen kupla on nyt kiinni luennan
   * loppumisessa, ja kiinteä viive on varapolku mykistetylle pelille.
   */
  const luenta = readFileSync(new URL('../js/luenta.js', import.meta.url), 'utf8');
  assert.match(luenta, /export function luennanLoppuun\(/,
    'luennan loppumisesta ei saa kahvaa');
  // Lyhyt kertojatila pysäyttää äänen lauserajalla ilman ended-tapahtumaa.
  assert.match(luenta, /audio\.paused && audio\.currentTime > 0/,
    'lauserajalla pysäytetty luenta ei koskaan päättyisi');
  const kuplat = UI.match(/saapumisenKuplat\(kohde\) \{[\s\S]*?\n  \}/)[0];
  assert.match(kuplat, /const luenta = luennanLoppuun\(this\);/,
    'kuplat eivät kuuntele luentaa');
  assert.match(kuplat, /naytaKuplat\(SAAPUMISEN_KUPLA_LUENNAN_JALKEEN_MS\)/,
    'luennan jälkeinen hengähdys puuttuu');
  assert.match(kuplat, /naytaKuplat\(SAAPUMISEN_KUPLA_MS\)/,
    'varapolun kiinteä viive puuttuu');
  // Toinen kupla sai pidemmän tauon: 1,6 s → ~2,5 s.
  assert.ok(luku('SAAPUMISEN_KUPLA_VALI_MS') >= 2300,
    `toisen kuplan tauko ${luku('SAAPUMISEN_KUPLA_VALI_MS')} ms on yhä lyhyt`);
});


/* ==================== ETUSIVUN AVAUKSEN JÄRJESTYS ================== */

/*
 * OMISTAJAN TILAUS 6.9.2026 aamu, sanatarkasti: *"ota taustalta pois
 * pelin otsikko ja keskitä aloita seikkailu nappi ihan keskelle ruutua.
 * Kun nappia painetaan niin sitten tulee pienellä viiveellä yläviiva ja
 * otsikko sitten pienen hetken päästä osa 2 teksti. se saisi tulla
 * animoidusti niin että kirjainkoko ja kirkkaus välähtää isompana ja
 * feidautuu nykyiseen, kuin pieni salaman isku. sitten tulisi alaviiva
 * otsikkoon ja pienen hetken päästä alkaisi konekirjoitusteksti."*
 *
 * Järjestys ei näkyisi virheenä jos se katoaisi — etusivu vain
 * aukeaisi taas kaikki kerralla — joten luvut ja ketju vartioidaan
 * lähdekoodista niin kuin muutkin ajoitukset.
 */

test('avauksen viisi vaihetta ovat vakioina ja oikeassa järjestyksessä', () => {
  const ylaviiva = luku('AVAUS_YLAVIIVA_MS');
  const otsikko = luku('AVAUS_OTSIKKO_MS');
  const osa = luku('AVAUS_OSA_MS');
  const alaviiva = luku('AVAUS_ALAVIIVA_MS');
  const kertomus = luku('AVAUS_KERTOMUS_MS');
  // Kaikki ajat ovat napin painalluksesta, joten järjestys on suoraan
  // lukujen järjestys.
  assert.ok(ylaviiva < otsikko && otsikko < osa && osa < alaviiva && alaviiva < kertomus,
    `vaiheet eivät ole järjestyksessä: ${[ylaviiva, otsikko, osa, alaviiva, kertomus]}`);
  // "pienellä viiveellä yläviiva" — noin puoli sekuntia napista.
  assert.ok(ylaviiva >= 400 && ylaviiva <= 800, `yläviivan viive ${ylaviiva} ms ei ole noin 600 ms`);
  // "pienen hetken päästä osa 2 teksti" — otsikon salamasta ~0,7 s.
  assert.ok(osa - otsikko >= 550 && osa - otsikko <= 900,
    `osa II tulee ${osa - otsikko} ms otsikon jälkeen, ei noin 700 ms`);
  // "sitten tulisi alaviiva" — osasta ~0,5 s.
  assert.ok(alaviiva - osa >= 350 && alaviiva - osa <= 700,
    `alaviiva tulee ${alaviiva - osa} ms osan jälkeen, ei noin 500 ms`);
  // "pienen hetken päästä alkaisi konekirjoitusteksti" — alaviivasta ~0,6 s.
  assert.ok(kertomus - alaviiva >= 400 && kertomus - alaviiva <= 900,
    `kirjoituskone alkaa ${kertomus - alaviiva} ms alaviivan jälkeen, ei noin 600 ms`);
  // Salama feidaa nykyiseen kokoon puolessa sekunnissa vajaan sekunnin sijaan.
  const salama = luku('SALAMAN_KESTO_MS');
  assert.ok(salama >= 450 && salama <= 750, `salaman häivytys ${salama} ms ei ole 500-700 ms`);
  const kerroin = Number(UI.match(/const SALAMAN_KERROIN = ([\d.]+)/)[1]);
  assert.ok(kerroin > 1.1 && kerroin <= 1.4,
    `salaman lähtökoko ${kerroin} ei ole noin 1,25-kertainen`);
  // Kestot kulkevat css:ään muuttujina: luvut ovat vain js/ui.js:ssä.
  for (const [muuttuja, vakio] of [
    ['--viivan-piirto', 'VIIVAN_PIIRTO_MS'],
    ['--salaman-kesto', 'SALAMAN_KESTO_MS'],
  ]) {
    assert.ok(UI.includes(`setProperty('${muuttuja}', \`\${${vakio}}ms\`)`),
      `${muuttuja} ei tule css:ään vakiosta ${vakio}`);
  }
  assert.match(UI, /setProperty\('--salaman-kerroin', String\(SALAMAN_KERROIN\)\)/,
    'salaman lähtökoko ei kulje css:ään vakiosta');
});

test('juliste on kokonaan piilossa aloitusportin takana', () => {
  /*
   * Omistaja 6.9.2026 aamu: *"ota taustalta pois pelin otsikko"*.
   * Piilossa ovat rivit, viivat JA otsikon oma pergamenttiharso —
   * harso jäisi muuten vaaleaksi soikioksi tyhjän otsikon paikalle.
   */
  assert.match(CSS, /\.intro-juliste\.avaus-kesken \.juliste-rivi,\n\.intro-juliste\.avaus-kesken \.juliste-viiva \{ opacity: 0; \}/,
    'julisteen rivit ja viivat eivät ole piilossa portin takana');
  assert.match(CSS, /\.intro\.intro-pallolla \.intro-juliste\.avaus-kesken::before \{\n  opacity: 0;/,
    'julisteen pergamenttiharso jäisi portille näkyviin');
  assert.match(CSS, /\.intro\.intro-pallolla \.intro-palsta\.avaus-kesken::before \{\n  opacity: 0;/,
    'tekstipalstan harso odottaisi tekstiään näkyvänä koko avauksen ajan');
  // Piilotus on peittävyyttä ja transformia: mikään ei saa hypätä.
  assert.doesNotMatch(CSS, /\.intro-juliste\.avaus-kesken [^{]*\{[^}]*display: none/,
    'julisteen piilotus siirtäisi rivejä');
  const piilota = UI.match(/ {2}piilotaAvausjuliste\(\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(piilota, /this\.introOtsikko\.classList\.add\('avaus-kesken'\)/,
    'juliste ei mene piiloon portin takana');
  assert.match(piilota, /this\.introPalsta\?\.classList\.add\('avaus-kesken'\)/,
    'tekstipalstan harso ei mene piiloon portin takana');
});

test('otsikko ja osa II välähtävät isompina ja feidaavat nykyiseen', () => {
  /*
   * Omistaja 6.9.2026 aamu: *"kirjainkoko ja kirkkaus välähtää isompana
   * ja feidautuu nykyiseen, kuin pieni salaman isku"*. Koko muuttuu
   * TRANSFORMILLA eikä kirjasinkoolla, jottei fitIntron mitoitus
   * rikkoudu (ks. seuraava testi ja savuke E11f).
   */
  const salama = CSS.match(/\.intro-juliste\.avaus-kesken \.juliste-rivi\.avaus-salama \{[\s\S]*?\n\}/)[0];
  assert.match(salama, /transform: scale\(var\(--salaman-kerroin/,
    'salaman lähtöasento ei ole suurempi transformilla');
  assert.match(salama, /filter: brightness\(1\.[0-9]+\)/, 'salama ei ole kirkkaampi');
  assert.match(salama, /transition: none;/,
    'ilman siirtymän katkaisua lähtöasento ei ehdi ruudulle omaksi kehyksekseen');
  assert.doesNotMatch(salama, /font-size/,
    'salama muuttaisi kirjasinkokoa — asettelu hyppäisi ja fitIntro menisi sekaisin');
  const nakyy = CSS.match(/\.intro-juliste\.avaus-kesken \.juliste-rivi\.avaus-nakyy \{[\s\S]*?\n\}/)[0];
  assert.match(nakyy, /transform: scale\(1\);/, 'salama ei palaa lopulliseen kokoon');
  assert.match(nakyy, /transition: opacity var\(--salaman-kesto[\s\S]*?transform var\(--salaman-kesto[\s\S]*?filter var\(--salaman-kesto/,
    'koko, kirkkaus ja peittävyys eivät feidaa samalla kestolla');
  // Kaksi kehystä: lähtöasento ensin, siirtymä vasta sitten.
  const paljasta = UI.match(/ {2}paljastaJulisteenOsa\(valitsin, salamalla = false\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(paljasta, /classList\.add\('avaus-salama'\)[\s\S]*requestAnimationFrame\([\s\S]*requestAnimationFrame\([\s\S]*classList\.add\('avaus-nakyy'\)/,
    'salama ei odota lähtöasennon kehystä ennen siirtymää');
});

/*
 * OTSIKKO EI HYPPÄÄ AVAUKSEN AIKANA (omistajan havainto 5.9.2026 klo
 * 00.20, sanatarkasti: *"etusivun otsikko hyppää alussa eri kokoon kun
 * kirjoituskone teksti alkaa"*).
 *
 * JUURISYY oli kaksi eri lukua samasta koosta: css:n lähtökoko
 * (.intro-juliste 1,44rem) ja js/ui.js fitIntron mittauksen lähtökoko
 * (INTRO_FONT_MAX × JULISTEEN_KERROIN = 1,71rem). fitIntro ajettiin
 * vasta kertomuksen alkaessa, joten julisteotsikko kasvoi 19 % ja
 * nousi 27 px täsmälleen kirjoituskoneen ensimmäisellä naksahduksella
 * (mitattu Chromiumilla 1400 × 900 ja 1000 × 700).
 *
 * Kaksi vartiota: luvut ovat samat, ja mittaus tehdään jo portin
 * takana — ei vasta kirjoituskoneen kanssa.
 */
test('avausotsikon koko on css:ssä ja fitIntrossa sama luku', () => {
  // Oma lukija: `luku` lukee kokonaislukuja, nämä ovat desimaaleja.
  const desimaali = (nimi) => Number(UI.match(new RegExp(`const ${nimi} = ([\\d.]+)`))[1]);
  const max = desimaali('INTRO_FONT_MAX');
  const kerroin = desimaali('JULISTEEN_KERROIN');
  assert.equal(kerroin, 1.5, 'julisteen kerroin on selaimen oma h2-koko');
  const juliste = CSS.match(/\.intro-juliste \{[\s\S]*?\n\}/)[0];
  const palsta = CSS.match(/\.intro-palsta \{[\s\S]*?\n\}/)[0];
  const koko = (lohko) => Number(lohko.match(/font-size: ([\d.]+)rem;/)[1]);
  assert.equal(koko(juliste), Number((max * kerroin).toFixed(4)),
    'julisteotsikon lähtökoko ei ole INTRO_FONT_MAX × JULISTEEN_KERROIN — otsikko hyppäisi');
  assert.equal(koko(palsta), max,
    'tekstipalstan lähtökoko ei ole INTRO_FONT_MAX — palsta ja sen em-mittaiset lapset hyppäisivät');
  // Kerroin luetaan vakiosta eikä kirjoiteta lukuna sovitukseen.
  assert.match(UI, /this\.sovitaIntroLohko\(this\.introKartta, this\.introOtsikko, JULISTEEN_KERROIN\);/,
    'fitIntro käyttää yhä irrallista lukua julisteen kertoimena');
});

test('kirjasinkoko mitataan jo portin takana, ei kirjoituskoneen kanssa', () => {
  const render = UI.match(/ {2}renderIntro\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  // Portin haara: piilota juliste, mittaa koko, näytä portti.
  assert.match(render, /this\.piilotaAvausjuliste\(\);\n[\s\S]{0,900}?this\.fitIntro\(\);\n\s*this\.showAloitusportti\(\);/,
    'fitIntro ei aja portin takana — otsikko saisi kokonsa vasta kirjoituskoneen alkaessa');
  // Portin ohittava haara (pelin reset) mittaa myös ennen ajastimia.
  assert.match(render, /this\.introShown = true;[\s\S]*?this\.fitIntro\(\);[\s\S]*?this\.naytaAvausjuliste\(/,
    'resetistä palattaessa koko mitattaisiin vasta kertomuksen alkaessa');
});

/*
 * KIRJOITUSKONETEKSTI EI HYPPÄÄ (omistaja 6.9.2026 klo 11.11, iPhone,
 * sanatarkasti: *"Konekirjoitusteksti hyppää kun tekstiä tulee"*).
 *
 * JUURISYY: paikkarivi ja runko olivat TYHJIÄ siihen asti, kunnes
 * kumpikin oma typeText alkoi (paikkarivi AVAUS_KERTOMUS_MS:n kohdalla,
 * runko vasta rivin jälkeen). typeTextin varjoteksti varaa tilan vasta
 * kirjoituksen alkaessa, joten keskitetty palsta kasvoi kahdessa
 * askeleessa ja liukui ylöspäin kummallakin: mitattu Chromiumilla
 * palstan yläreuna 558 → 535 → 439 px (390 × 844) ja 532 → 519 → 461 px
 * (1280 × 800). Korjauksen jälkeen vakio molemmilla.
 *
 * Vartiot: tila varataan MOLEMMILLE ennen mittausta ja ennen julisteen
 * ajastinketjua, eikä kirjoituksen alkuun jää yhtään fitIntroa.
 */
test('avaustekstin tila varataan ennen kirjoitusta eikä lohko kasva', () => {
  const render = UI.match(/ {2}renderIntro\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  const varaus = render.indexOf('this.varaaKirjoitustila(this.introRunko, INTRO_TEXT)');
  const paikka = render.indexOf('this.varaaKirjoitustila(this.introPaikka, this.introPaikkaTeksti)');
  const mittaus = render.indexOf('this.fitIntro();', render.indexOf('this.introShown = true;'));
  const juliste = render.indexOf('this.naytaAvausjuliste(');
  assert.ok(paikka > 0 && varaus > 0, 'avaustekstin tilaa ei varata ennen kirjoitusta');
  assert.ok(paikka < mittaus && varaus < mittaus,
    'fitIntro mittaisi tyhjän palstan — kirjasinkoko muuttuisi kirjoituskoneen alkaessa');
  assert.ok(mittaus < juliste, 'mittaus jäisi julisteen ajastinketjun jälkeen');
  // Sama merkkijono varataan ja kirjoitetaan: rivi ei saa vaihtua välissä.
  assert.match(render, /this\.introPaikkaTeksti = `\$\{this\.introPaikkarivi\(\)\}:`;/,
    'paikkarivin teksti ei ole talletettu — varaus ja kirjoitus voisivat erota');
  assert.match(render, /this\.typeText\(this\.introPaikka, this\.introPaikkaTeksti, 'intro',/,
    'paikkarivi kirjoitetaan eri merkkijonosta kuin varaus tehtiin');
  // Kirjoituksen alussa ei mitata: juuri se sai asettelun hyppäämään.
  const kertomus = render.slice(render.indexOf('const aloitaRunko'));
  assert.doesNotMatch(kertomus, /this\.fitIntro\(\)/,
    'fitIntro kirjoituskoneen alussa — mittaus hyppäisi taas ensimmäisellä naksahduksella');
  // Varaus on typeTextin lähtötila: tyhjä typed + koko teksti pendingissä.
  const varaaja = UI.match(/ {2}varaaKirjoitustila\(target, text\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(varaaja, /html\('span', 'typed'\)/, 'varaus ei tee typed-osaa');
  assert.match(varaaja, /html\('span', 'pending'\)[\s\S]*?textContent = String\(text\)/,
    'varaus ei pane koko tekstiä näkymättömään pending-osaan');
  assert.match(CSS, /\.pending \{ visibility: hidden; \}/,
    'varjoteksti ei ole näkymätön — varattu teksti näkyisi ruudulla');
});

/*
 * PAIKKARIVI SAMALLA MUSTEELLA, PIENEMPÄNÄ JA LIHAVOITUNA (omistaja
 * 6.9.2026 klo 11.11: *"Heathrow saisi olla samalla värillä kuin muut.
 * Mutta vaikka vähän pienemmällä ja boldattuna?"*).
 */
test('avauksen paikkarivi on leipätekstin muste, pienempi ja lihava', () => {
  const rivi = CSS.match(/\.intro-paikka \{[\s\S]*?\n\}/)[0];
  assert.match(rivi, /color: var\(--map-ink\);/, 'paikkarivi ei ole leipätekstin muste');
  assert.doesNotMatch(rivi, /--map-ink-soft|opacity:/,
    'paikkarivi on yhä himmennetty — omistaja pyysi saman värin kuin muualla');
  const koko = Number(rivi.match(/font-size: ([\d.]+)em;/)[1]);
  assert.ok(koko > 0 && koko < 1, `paikkarivin koko ${koko}em ei ole leipätekstiä pienempi`);
  assert.match(rivi, /font-weight: 700;/, 'paikkarivi ei ole lihavoitu');
  const harvennus = Number(rivi.match(/letter-spacing: ([\d.]+)em;/)[1]);
  assert.ok(harvennus <= 0.08,
    `harvennus ${harvennus}em levittäisi lihavoidun rivin yli palstan`);
});

test('kirjoituskone ja luenta alkavat vasta alaviivan jälkeen', () => {
  const nayta = UI.match(/ {2}naytaAvausjuliste\(valmis\) \{[\s\S]*?\n {2}\}/)[0];
  // Viisi vaihetta, jokainen omana ajastimenaan napin painalluksesta.
  const vaiheet = [
    ['AVAUS_YLAVIIVA_MS', "juliste-viiva:first-child"],
    ['AVAUS_OTSIKKO_MS', "juliste-nimi"],
    ['AVAUS_OSA_MS', "juliste-osa"],
    ['AVAUS_ALAVIIVA_MS', "juliste-viiva:last-child"],
  ];
  for (const [vakio, valitsin] of vaiheet) {
    assert.ok(new RegExp(`vaihe\\(${vakio},[\\s\\S]{0,200}?${valitsin}`).test(nayta),
      `vaihe ${vakio} ei paljasta osaa ${valitsin}`);
  }
  // Kertomus on ketjun VIIMEINEN vaihe: kirjoituskone ei saa alkaa
  // ennen alaviivaa.
  assert.match(nayta, /vaihe\(AVAUS_KERTOMUS_MS, \(\) => \{[\s\S]*?valmis\(\);/,
    'kirjoituskone ei odota julisteen valmistumista');
  assert.ok(nayta.indexOf('AVAUS_KERTOMUS_MS') > nayta.indexOf('AVAUS_ALAVIIVA_MS'),
    'kertomus on ketjussa ennen alaviivaa');
  const render = UI.match(/ {2}renderIntro\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  assert.match(render, /this\.naytaAvausjuliste\(aloitaKertomus\);/,
    'kertomus ei odota julistetta');
  // Paikkarivi ja runko säilyttävät keskinäisen järjestyksensä: rivi
  // naputetaan ensin ja luenta alkaa vasta rungon kanssa.
  assert.match(render, /const aloitaKertomus = \(\) => \{[\s\S]*?this\.typeText\(this\.introPaikka[\s\S]*?aloitaRunko, INTRO_TYPE_MS\)/,
    'paikkarivin kirjoituskone ei ole enää kertomuksen ensimmäinen askel');
  assert.match(render, /const aloitaRunko = \(\) => \{[\s\S]*?playIntroVoice\(this\);[\s\S]*?this\.typeText\(this\.introRunko, INTRO_TEXT/,
    'luenta ei ala enää rungon kirjoituksen kanssa');
});

test('vähennetty liike pitää järjestyksen mutta jättää salaman pois', () => {
  /*
   * Raamattu (arkkikirjasto): *"prefers-reduced-motion kunnioitetaan
   * (pelkkä häivytys)"* — omistajan tarkennus 6.9.2026 aamu: *"ei
   * skaalausta eikä välähdystä, pelkät häivytykset samassa
   * järjestyksessä"*.
   */
  const paljasta = UI.match(/ {2}paljastaJulisteenOsa\(valitsin, salamalla = false\) \{[\s\S]*?\n {2}\}/)[0];
  assert.match(paljasta, /if \(!salamalla \|\| this\.reducedMotion\) \{[\s\S]*?avaus-nakyy[\s\S]*?return;/,
    'vähennetyllä liikkeellä otsikko välähtäisi silti');
  assert.match(CSS, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\.juliste-rivi\.avaus-nakyy \{\n\s*transform: none;\n\s*filter: none;/,
    'css ei sammuta skaalausta ja kirkkautta vähennetyllä liikkeellä');
});

test('avausanimaatio ei toistu joka piirrossa', () => {
  const render = UI.match(/ {2}renderIntro\(\) \{[\s\S]*?\n {2}\}\n/)[0];
  // Sama kertalippu kuin kirjoituskoneella: uudelleen renderöinti
  // (kieli, koko) palaa tästä ennen ajastimien asettamista.
  assert.match(render, /if \(this\.introShown\) return;[\s\S]*?this\.naytaAvausjuliste\(/,
    'introShown-kertalippu ei enää suojaa avausanimaatiota');
  assert.match(render, /this\.introShown = false;[\s\S]{0,120}this\.peruAvausjuliste\(\);/,
    'etusivulta poistuttaessa julisteen vaiheajastimia ei peruta');
  assert.match(UI, / {2}peruAvausjuliste\(\) \{[\s\S]*?for \(const ajastin of this\.julisteAjastimet\) clearTimeout\(ajastin\)/,
    'vaiheajastimien peruutus puuttuu');
  // Peruutus palauttaa myös julisteen kokonaan näkyviin (pelin reset).
  assert.match(UI, / {2}peruAvausjuliste\(\) \{[\s\S]*?classList\.remove\('avaus-kesken', 'avaus-harso'\)/,
    'peruutus jättäisi julisteen piiloon');
});
