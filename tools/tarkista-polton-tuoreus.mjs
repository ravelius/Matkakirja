/*
 * ONKO NOSTOTASON POLTTO AJAN TASALLA? (erä J, 19.9.2026; raportti
 * docs/raportit/viesti-fable-lehtinimiot-20260919.md)
 *
 *   node tools/tarkista-polton-tuoreus.mjs [ISO …]
 *
 * Peli pitää nostoa poltettuna vain, jos sen sisältötiiviste on sama
 * kuin luettelossa (js/laattapyramidi.js nostoOnPoltettu). Kun maahan
 * lisätään nostoja (hahmotelmat), ladonta muuttuu ja osa poltetuista
 * saa uuden tiivisteen: peli piirtää ne ELÄVINÄ, ja laatan vanha muste
 * jää alle — sama nimi kahdesti (Sonnet 1:n kierros 12, Tanska).
 * Tämä listaa maittain poltetut, joiden tiiviste ei enää täsmää, eli
 * maat, joiden nostotaso kannattaa polttaa uudelleen.
 *
 * HUOM: tiiviste ei sisällä nimiön kylkeä. Uudet naapurit voivat vaihtaa
 * poltetun nimiön kyljen ilman tiivisteen muutosta, jolloin elävä
 * nimiö väistää väärää laatikkoa (Tanska: Storebæltin silta, laatassa
 * vasen, pelin mallissa ylä). Se korjautuu samalla uudella poltolla.
 */
import { MAAILMANKARTTA } from '../js/packs/maailmankartta.js';
import { keraaNostot } from './fokuskartta/nostot.mjs';

const luettelo = await (await fetch('https://media.matkakirja.app/julisteet/pyramidi/pyramidi.json')).json();
const { merkit } = keraaNostot(MAAILMANKARTTA);
const valitut = process.argv.slice(2).map((m) => m.toUpperCase());
const maat = valitut.length ? valitut : Object.keys(luettelo.nostotasot ?? {}).sort();
let yhteensa = 0;
for (const iso of maat) {
  const kat = luettelo.nostotasot?.[iso]?.nostot ?? {};
  const omat = merkit.filter((m) => m.iso === iso);
  const vanhat = Object.entries(kat).filter(([t, h]) => omat.find((m) => m.tunnus === t)?.tiiviste !== h).map(([t]) => t);
  if (!vanhat.length && !valitut.length) continue;
  yhteensa += vanhat.length;
  console.log(`${iso}  poltettu ${Object.keys(kat).length}, vanhentunut ${vanhat.length}${vanhat.length ? `: ${vanhat.join(', ')}` : ''}`);
}
console.log(`\nvanhentuneita yhteensä ${yhteensa} (luettelo ${luettelo.versio})`);
