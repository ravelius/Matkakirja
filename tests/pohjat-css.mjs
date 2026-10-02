// Apu testeille: kaikki UI-pohjien tyylitiedostot latausjärjestyksessä yhtenä tekstinä (js/pohjat/tyylit.js).
import { readFileSync } from 'node:fs';
import { POHJAT_TYYLIT } from '../js/pohjat/tyylit.js';

export function pohjatCss() {
  return POHJAT_TYYLIT.map((p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')).join('\n');
}
