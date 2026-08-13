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

const UI = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

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

test('Astu mantereelle odottaa, että rivi on oikeasti valmis', () => {
  /*
   * Mitattu 12.8.2026 (Chromium, kontti): kuormitettu pääsäie venytti
   * 25 sanan rivin 8 sekunnin arviosta 28 sekuntiin, kun kone lensi
   * selaimen omana animaationa perille 14 sekunnissa. Pelkkä arvio ei
   * siis riitä takeeksi — kalvo odottaa kirjoituksen kuittausta.
   */
  assert.match(UI, /this\.flightLineValmis = new Promise\(/,
    'kirjoituksen valmistumisesta ei synny kuittausta');
  assert.match(UI, /await Promise\.race\(\[\s*this\.flightLineValmis \?\? Promise\.resolve\(\),\s*this\.wait\(LENNON_TEKSTI_ODOTUS_MS\),\s*\]\);/,
    'lento ei odota kirjoituksen kuittausta ennen Astu mantereelle -nappia');
  // Varoventtiili ei saa katketa juuri ennen kuin rivi on valmis:
  // mitattu hitain tapaus tarvitsi 15,2 s odotusta.
  assert.ok(luku('LENNON_TEKSTI_ODOTUS_MS') >= 25000,
    'kirjoituksen odotus katkeaa liian aikaisin');
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
});
