/*
 * VALKO-VENÄJÄN HAHMOTELMANOSTOT — ensimmäinen karttanosto tälle
 * maalle.
 *
 * Fablen tilaus 28.9.2026: Matkakirjan ihme -kohde (js/packs/
 * monumentit-eurooppa.js EUROOPAN_KADONNEET.BLR), jotta pelin
 * "historian hetket" -kohtaus saa maalle karttapaikan ja maalehden.
 * Maalla ei ollut ennestään yhtään karttanostoa (VAIN EUROOPPA
 * -karttatyö on vielä kesken tälle maalle) — loput kohteet lisätään
 * myöhemmissä erissä samalla mallilla kuin muiden Euroopan maiden
 * hahmotelmapakit.
 */
import { EUROOPAN_KADONNEET } from './monumentit-eurooppa.js';

export const HAHMOTELMA_BLR = [...EUROOPAN_KADONNEET.BLR];
