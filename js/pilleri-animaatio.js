/*
 * PILLERIVALIKON AVAUS- JA SULKUANIMAATIO (omistaja 29.9.2026).
 *
 * Linja: avaus 220 ms napin suunnasta (kasvu + opacity,
 * cubic-bezier(0.22,0.9,0.24,1)), sulku 200 ms
 * (cubic-bezier(0.4,0,1,1)). prefers-reduced-motion poistaa liikkeen
 * kokonaan.
 *
 * TÄMÄ ON VÄLIAIKAINEN KEVYT TOTEUTUS Web Animations -rajapinnalla.
 * Siirtosepän js/avausanimaatio.js (PR ravelius/Matkakirja#3605,
 * haara origin/siirtoseppa-avausanimaatiot) EI ole vielä mainissa
 * tätä työtä tehtäessä, eikä sitä yhdistetä tähän haaraan kesken
 * arvioinnin. Kun #3605 on mainissa, näiden kahden funktion sisältö
 * korvataan kutsuilla js/avausanimaatio.js:n animoiAvaus/haamuSulku
 * -funktioihin — kutsupaikat (js/ui.js) eivät silloin muutu, koska
 * rajapinta (elementti + lähde) on jo sama.
 */

const AVAUS_MS = 220;
const AVAUS_KAYRA = 'cubic-bezier(0.22, 0.9, 0.24, 1)';
const SULKU_MS = 200;
const SULKU_KAYRA = 'cubic-bezier(0.4, 0, 1, 1)';

function vahennettyLiike() {
  try {
    return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
  } catch {
    return false;
  }
}

/**
 * Kasvattaa elementin näkyviin annetun lähtökulman suunnasta.
 *
 * @param {HTMLElement} el animoitava elementti (esim. pillerivalikon paneeli)
 * @param {'oikea'|'vasen'} [lahde] kummasta reunasta liike lähtee (napin puoli)
 */
export function avaaAnimoiden(el, lahde = 'oikea') {
  if (!el || typeof el.animate !== 'function' || vahennettyLiike()) return;
  const x = lahde === 'vasen' ? -8 : 8;
  el.animate(
    [
      { opacity: 0, transform: `translate(${x}px, -6px) scale(0.96)` },
      { opacity: 1, transform: 'translate(0, 0) scale(1)' },
    ],
    { duration: AVAUS_MS, easing: AVAUS_KAYRA, fill: 'backwards' },
  );
}

/**
 * Häivyttää elementin ennen sulkua. Kutsuja vastaa itse siitä, että
 * elementti oikeasti piilotetaan vasta `finished`-lupauksen jälkeen —
 * tämä funktio vain palauttaa animaation valmistumisen.
 *
 * @param {HTMLElement} el animoitava elementti
 * @returns {Promise<void>} valmistuu kun sulkuliike on ohi (heti, jos
 *   liike on vähennetty tai elementtiä ei animoida)
 */
export async function suljeAnimoiden(el) {
  if (!el || typeof el.animate !== 'function' || vahennettyLiike()) return;
  const animaatio = el.animate(
    [
      { opacity: 1, transform: 'translate(0, 0) scale(1)' },
      { opacity: 0, transform: 'translate(0, -4px) scale(0.98)' },
    ],
    { duration: SULKU_MS, easing: SULKU_KAYRA, fill: 'forwards' },
  );
  try {
    await animaatio.finished;
  } catch {
    /* keskeytynyt animaatio (esim. nopea uudelleenavaus) ei ole virhe */
  }
}
