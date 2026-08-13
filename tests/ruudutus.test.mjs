/*
 * Kartan ruudutus (v339): näkyvät ruudut ensin, puskurirengas
 * joutohetkinä.
 *
 * Omistaja: *"se vielä vähän tökkii, lähinnä kun joutuu lataamaan
 * zoomauksen jälkeen uutta karttamateriaalia scrollattaessa."*
 * Puskuroitu alue on yhdeksän ruudullista, mutta pelaaja katsoo
 * niistä yhtä; jako kahtia siirtää kahdeksan yhdeksäsosaa työstä
 * pois kriittiseltä polulta.
 *
 * Testit lukevat lähdetekstin, koska ui.js ei aukea Nodessa (DOM).
 * Ne vahtivat neljää asiaa, jotka kaikki voivat rikkoutua hiljaa —
 * ilman virheilmoitusta, pelkkänä tökkimisenä tai tyhjänä
 * pergamenttina:
 *
 *   1. jako näkyviin ja renkaaseen on olemassa;
 *   2. rengas väistää sormea (samat kiellot kuin täydennyksellä);
 *   3. rengas peruuntuu, kun peli tai mittakaava vaihtuu;
 *   4. vanhat ruudut poistetaan vasta renkaan valmistuttua.
 *
 * Mitattu selaimessa (tools/mittaa-ruudutus.mjs, 390x844):
 * näkyvä alue terävänä 1768 -> 890 ms, pisin purske sormen noustua
 * 1149 -> 247 ms, puskuri katettu kummallakin.
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const ui = readFileSync(new URL('../js/ui.js', import.meta.url), 'utf8');

/** Metodin runko nimellä: seuraavaan sarakkeeseen 2 asti. */
function metodi(nimi) {
  const alku = ui.indexOf(`\n  ${nimi}(`);
  assert.ok(alku > 0, `${nimi}: metodia ei löydy ui.js:stä`);
  const loppu = ui.indexOf('\n  }\n', alku);
  return ui.slice(alku, loppu);
}

test('täydennys jakaa ruudut näkyviin ja renkaaseen', () => {
  const runko = metodi('taydennaTaide');
  assert.match(runko, /const nakyvat = puuttuvat\.filter/, 'näkyvien erottelu puuttuu');
  assert.match(runko, /const rengas = puuttuvat\.filter/, 'renkaan erottelu puuttuu');
  // Heti piirtyvä silmukka saa käydä VAIN näkyvät läpi. Jos se palaisi
  // koko listaan, rengas piirtyisi taas kriittisellä polulla.
  assert.match(runko, /for \(const \{ avain, rx, ry \} of nakyvat\)/,
    'heti piirtyvä silmukka ei rajoitu näkyviin ruutuihin');
  assert.match(runko, /this\.taydennaRengas\(rengas, skaala\)/, 'rengasta ei ajasteta');
});

test('näkyvyys lasketaan kiertämättömästä sarakkeesta', () => {
  /*
   * Kiertävällä laudalla sama sarake voi olla yhtä aikaa näkyvissä ja
   * renkaassa. Jos osuvuus laskettaisiin kierretystä sarakkeesta,
   * sauman takainen ruutu joutuisi väärään koriin — näkyvä ruutu
   * jäisi odottamaan joutohetkeä ja kartalle jäisi terävöitymätön
   * kaistale.
   */
  const runko = metodi('taydennaTaide');
  assert.match(runko, /if \(nakyvissa\(rx, ry\)\) ruutu\.nakyy = true/,
    'näkyvyys pitää laskea kiertämättömästä rx:stä');
});

test('rengas väistää sormea, lentoa ja zoomiliukua', () => {
  const runko = metodi('taydennaRengas');
  // eleKesken kattaa raahauksen JA pelkän sormen kartalla: raahauslippu
  // syttyy vasta kuuden pikselin kynnyksen jälkeen, ja rengas ehti ennen
  // rasteroida juuri sillä hetkellä, kun ele oli alkamassa.
  for (const ehto of ['this.eleKesken()', 'this.taidePiirtyy',
    "flight-active", "zoom-kaynnissa"]) {
    assert.ok(runko.includes(ehto), `renkaalta puuttuu kielto: ${ehto}`);
  }
  // Yksi ruutu kerrallaan: pisin tukos on yhden ruudun mittainen.
  assert.match(runko, /jono\.shift\(\)/, 'rengas ei ota ruutuja yksitellen');
  assert.match(runko, /requestIdleCallback/, 'rengas ei odota joutohetkeä');
  // Aikakatkaisu: sivu, joka ei koskaan ole joutilas, saa silti
  // puskurinsa — muuten vieritys paljastaisi tyhjää pergamenttia.
  assert.match(runko, /timeout: \d+/, 'joutohetkeltä puuttuu aikakatkaisu');
  // Vanhempi Safari ei tunne requestIdleCallbackia.
  assert.match(runko, /setTimeout/, 'varareitti ilman requestIdleCallbackia puuttuu');
});

test('vanhentunut rengastyö ei piirrä', () => {
  const runko = metodi('taydennaRengas');
  /*
   * Kaksi tarkistusta, molemmat pakollisia: työn identiteetti
   * (this.taideRengas !== tyo) ja mittakaava. Jono elää joutohetkien
   * varassa, joten sen ja rasteroinnin välissä ehtii tapahtua mitä
   * tahansa — zoomaus, uusi peli, uusi täydennys.
   */
  const tarkistukset = runko.match(/this\.taideRengas !== tyo/g) ?? [];
  assert.ok(tarkistukset.length >= 2,
    'työn identiteetti on tarkistettava sekä ennen rasterointia että sen jälkeen');
  assert.match(runko, /skaala !== this\.taideSkaala/, 'mittakaavan tarkistus puuttuu');
});

test('rengas peruuntuu uudessa täydennyksessä ja pelin päättyessä', () => {
  assert.match(metodi('taydennaTaide'), /this\.peruutaRengas\(\)/,
    'uusi täydennys ei peru vanhaa rengasta');
  assert.match(metodi('destroy'), /this\.peruutaRengas\(\)/,
    'kuollut peli jättäisi renkaan piirtämään uuden kartan päälle');
  // Irrotettu window-metodi kaatuu "Illegal invocation" -virheeseen.
  assert.match(metodi('peruutaRengas'), /window\.cancelIdleCallback\(/,
    'peruutus on kutsuttava windowin kautta');
});

test('vanhat ruudut poistetaan vasta renkaan valmistuttua', () => {
  /*
   * Vanhan mittakaavan ruudut jäävät uusien alle ja peittävät juuri
   * sen alueen, jonne rengas on tulossa. Jos ne poistettaisiin heti
   * näkyvän osan valmistuttua, reunan yli vieritettäessä paljastuisi
   * tyhjä pergamentti — ennen siellä oli edes sumea kartta.
   */
  const rengas = metodi('taydennaRengas');
  assert.match(rengas, /this\.poistaVanhatRuudut\(\)/,
    'rengas ei siivoa vanhoja ruutuja lopuksi');
  // Tyhjä jono siivoaa heti: muuten vanhat jäisivät DOM:iin ikuisiksi.
  assert.match(rengas, /if \(!jono\?\.length\) \{ this\.poistaVanhatRuudut\(\); return; \}/,
    'tyhjä rengasjono ei siivoa vanhoja ruutuja');
});
