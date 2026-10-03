/**
 * VISA KORTTI-POHJALLA, versio B (omistaja 1.10.2026: "visa B"; Päätoimittajan välittämä).
 *
 * #quiz-dialogin kortti saa kerran luokat tk-kortti, tk-teema-paperi ja tk-visa; muu asu on css/pohjat/pinnat/visa.css:n
 * "KORTTI/visa" -osiossa vanhojen .quiz-*-luokkien päällä. Visan logiikka (js/visa.js, js/ui.js renderQuiz) ja sen
 * tilaluokat (correct, wrong, hidden-option, urgent) pysyvät ennallaan. Pohjan poikkeukset (tyylikirja.json
 * pohjat._poikkeukset): tiimalasi kulmassa ja 50:50-oljenkorren hinta (80 p). Oikein ja väärin näkyvät
 * tilaväreillä --tk-tila-onnistuminen ja --tk-tila-virhe. Peruttava: ?kortti=vanha tai localStorage
 * matkakirja-kortti=vanha (sama lippu kuin muissa KORTTI-siirroissa).
 */
import { pohjatLataaTyyli } from './pohjat/pohjat.js';

const VISA_POHJA = true;

/** Onko visa KORTTI-pohjalla (oletus kyllä). */
export function visaPohjalla() {
  try {
    const valinta = new URLSearchParams(globalThis.location?.search ?? '').get('kortti')
      ?? globalThis.localStorage?.getItem('matkakirja-kortti');
    if (valinta === 'vanha') return false;
    if (valinta === 'pohja') return true;
  } catch { /* yksityinen selaus */ }
  return VISA_POHJA;
}

/** Puetaan #quiz-dialogin kortti kerran (js/ui.js konstruktori). */
export function pueVisaKortiksi(dialogi) {
  const kortti = dialogi?.querySelector('.dialog-card');
  if (!kortti || kortti.classList.contains('tk-visa')) return false;
  pohjatLataaTyyli();
  kortti.classList.add('tk-kortti', 'tk-teema-paperi', 'tk-visa');
  return true;
}
