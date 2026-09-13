/*
 * LUENTAKUVAN KERROS: ISO KUVA JÄÄ MATKAKIRJAKORTIN ALLE.
 *
 * Omistajan vikailmoitus 12.9.2026, sanatarkasti: *"kuva saisi jäädä
 * matkakirjan alle."* Kuvakaappauksessa isoisän iso luentakuva peitti
 * Lontoon matkakirjakortin niin, että kortista näkyi vain vasen reuna.
 *
 * MITTA (Chromium 12.9.2026, Venetsia, kolme ruutua):
 *
 *   390 × 844    ennen: ei leikkausta,      jälkeen: ei leikkausta
 *   834 × 1194   ennen: ei leikkausta,      jälkeen: ei leikkausta
 *   1280 × 800   ennen: kuva päällä, kortin tekstialasta näkyi 46 %
 *                jälkeen: KORTTI päällä, tekstialasta näkyy 100 %
 *
 * Kuvaa EI pienennetty eikä piilotettu: kotelon laatikko on jälkeenkin
 * 936 × 647 px eli täsmälleen sama kuin ennen. Vika oli PINOSSA.
 *
 * MIKSI TÄMÄ ON YKSIKKÖTESTI EIKÄ VAIN SILMÄMÄÄRÄ. `.app` on
 * `position: fixed` ja siis oma pinonsa, jonka sisällä kortin rail on
 * z-indexillä 4. Rungon tason luku 40 voitti kortin riippumatta siitä,
 * mitä kortille olisi annettu — ja juuri siksi sääntö on helppo
 * rikkoa uudestaan pelkällä z-index-luvulla. Testi lukee luvut
 * tyylitiedostoista, jotta kumpikin puoli muuttuu vain yhdessä.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const styles = readFileSync(new URL('../css/styles.css', import.meta.url), 'utf8');
const fokus = readFileSync(new URL('../css/fokusvirta.css', import.meta.url), 'utf8');

/**
 * Lukee valitsimen z-indexin. Samalla valitsimella voi olla useita
 * lohkoja (siirtymä yhdessä, asettelu toisessa), joten kaikki käydään
 * läpi ja otetaan se, jossa luku on.
 */
function zIndex(css, valitsin) {
  let i = css.indexOf(`${valitsin} {`);
  assert.ok(i >= 0, `sääntöä ${valitsin} ei löytynyt`);
  while (i >= 0) {
    const lohko = css.slice(i, css.indexOf('}', i));
    const osuma = /z-index:\s*(-?\d+)/.exec(lohko);
    if (osuma) return Number(osuma[1]);
    i = css.indexOf(`${valitsin} {`, i + 1);
  }
  throw new assert.AssertionError({ message: `${valitsin}: z-index puuttuu` });
}

test('iso luentakuva jää matkakirjakortin railin alle', () => {
  const kuva = zIndex(fokus, '.fokusvirta-isokuva');
  const rail = zIndex(styles, 'body[data-mode] .rail');
  assert.ok(kuva < rail,
    `luentakuvan z-index (${kuva}) on oltava pienempi kuin railin (${rail})`);
});

test('iso luentakuva pysyy kartan päällä', () => {
  // Kartta (.map-pane) on z-index: auto eli tasolla 0; päällyksen on
  // oltava sen yläpuolella tai kuva katoaisi kartan taakse.
  assert.ok(zIndex(fokus, '.fokusvirta-isokuva') > 0,
    'päällys ei saa pudota kartan taakse');
});

test('lentokalvo pysyy kaiken yllä', () => {
  assert.ok(zIndex(styles, '.flight-overlay') > zIndex(styles, 'body[data-mode] .rail'),
    'lennon kalvo on korttien päällä kuten ennenkin');
});

/*
 * LENNON TEKSTI YLÄREUNAAN (omistaja 12.9.2026, sanatarkasti: *"lennon
 * aikana teksti saisi olla yläreunassa"*). Alalaidassa rivi osui
 * reitin päähän ja peitti määränpääkaupungin.
 *
 * YLÄPALKIN KORKEUS ON MITATTU MUUTTUJA, EI PIKSELILUKU: js/aikajana.js
 * kirjoittaa palkin todellisen korkeuden bodylle
 * (--aikajana-palkki-korkeus), ja teksti varaa sen verran tilaa.
 */
test('lennon repliikki asettuu ylös yläpalkin alle', () => {
  const i = styles.indexOf('.flight-overlay.kartalla {');
  assert.ok(i >= 0);
  const lohko = styles.slice(i, styles.indexOf('}', i));
  assert.ok(/justify-content:\s*flex-start/.test(lohko),
    'pino alkaa ruudun yläreunasta');
  assert.ok(lohko.includes('--aikajana-palkki-korkeus'),
    'yläpalkin korkeus tulee mittausmuuttujasta eikä pikseliluvusta');
});
