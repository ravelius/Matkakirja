/*
 * PULMAGENERAATTORIT TUNNISTEELLA (Siirtoseppä 23.9.2026, sisältöpaketin
 * osa 2: funktiot tunnisteiksi).
 *
 * Pulmadata (EUROPE_PUZZLES, AFRICA_PUZZLES → MAAILMANKARTTA.puzzles) on
 * puhdasta dataa: pulma nimeää generaattorinsa kentässä `generaattori`,
 * ja funktio haetaan tästä rekisteristä. Natiivi peli lukee saman
 * tunnisteen sisältöpaketista ja toteuttaa generaattorin omalla koodillaan
 * (docs/raportit/sisallon-siirtoputki-20260923.md osa 5.4).
 *
 * Generaattori: (rng) => { sketch, options, correct, ... }, deterministinen
 * annetulla rng:llä.
 */
import { EUROPE_GENERATORS } from './packs/europe-puzzles.js';
import { GENERATORS } from './packs/africa-puzzles.js';

// Ei aliasta tuonnissa: tools/build-standalone.mjs ei tue sitä.
export const PULMAGENERAATTORIT = { ...EUROPE_GENERATORS, ...GENERATORS };

/** Pulman generaattorifunktio tai null (kiinteä pulma). Tuntematon tunniste heittää. */
export function pulmanGeneraattori(pulma) {
  if (!pulma?.generaattori) return null;
  const f = PULMAGENERAATTORIT[pulma.generaattori];
  if (!f) throw new Error(`pulman ${pulma.id} generaattoria "${pulma.generaattori}" ei ole (js/pulmageneraattorit.js)`);
  return f;
}
