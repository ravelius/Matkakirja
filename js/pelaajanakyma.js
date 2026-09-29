/*
 * PELAAJAN NÄKYMÄ -APUNAPPI KEHITTÄJÄN MAAILMATILASSA.
 *
 * Omistaja 29.9.2026 klo 08.5x: *"Maailmatilaan voisi tehdä apunapin, joka näyttäisi kartan samalla lailla, kuin
 * että maailmatila ei olisi päällä. Ainoastaan kohdekaupungit näkyisivät himmeänä ja pystyisin edelleen klikkaamalla
 * siirtymään myös niihin, mutta muuten näkisin pelinäkymän samalla lailla, kuin normaali pelaaja."*
 *
 * Nappi asui ensin karttaselitenapin alla (.karttaselite); omistaja 29.9.2026 (pillerivalikon palaute) siirsi sen
 * Asetukset-näkymän "Näytä huntu" -riviksi (index.html #asetukset-huntu-btn, js/ui.js naytaPilleriNakyma). Nappi näkyy vain kun
 * kehittäjätila ja maailmatila ovat päällä (ei katselutilassa). Painallus kääntää pelaajan näkymän
 * (js/ui-apurit.js asetaKehittajaPelaajanakyma) ja ajaa saman päivityksen kuin maailmanappi
 * (ui.paivitaKehittajaMaailma): zoomi- ja panorointirajat, maan rajaus ja pisteet palaavat pelaajan sääntöihin, ja
 * pallolauta piirtää pelaajalta piilossa olevat kohdekaupungit himmeinä, napautettavina (hyppy kuten maailmatilassa).
 * Natiivi tekee saman (Natiivi-UI 29.9.: sama paikka, 40 % peitto, sama koko, ei nimeä).
 */

import {
  asetaKehittajaPelaajanakyma, kehittajaMaailmaValittu, kehittajaPelaajanakymaValittu, kehittajaTilaPaalla,
} from './ui-apurit.js';

/** Rivi Asetukset-näkymässä (staattinen, index.html) ja sen näkyvyys ja tila ajan tasalle. */
export function paivitaPelaajanakymaNappi(ui) {
  if (typeof document === 'undefined') return null;
  const nappi = document.getElementById('asetukset-huntu-btn');
  if (!nappi) return null;
  if (!nappi.dataset.kytketty) {
    nappi.dataset.kytketty = '1';
    nappi.addEventListener('click', () => {
      asetaKehittajaPelaajanakyma(!kehittajaPelaajanakymaValittu());
      ui.paivitaKehittajaMaailma?.();
      paivitaPelaajanakymaNappi(ui);
    });
  }
  const nakyy = kehittajaTilaPaalla() && kehittajaMaailmaValittu() && !ui.katselu;
  nappi.hidden = !nakyy;
  const paalla = kehittajaPelaajanakymaValittu();
  nappi.classList.toggle('valittu', paalla);
  nappi.setAttribute('aria-checked', String(paalla));
  const tila = nappi.querySelector('.aanikytkin-tila');
  if (tila) tila.textContent = paalla ? 'päällä' : 'pois';
  nappi.title = paalla
    ? 'Pelaajan näkymä PÄÄLLÄ: kartta kuten pelaajalla, piilossa olevat kaupungit himmeinä — napauta himmeää '
      + 'kaupunkia siirtyäksesi sinne; napauta tätä palataksesi maailmatilaan'
    : 'Pelaajan näkymä: näytä kartta kuten pelaajalla (piilossa olevat kaupungit himmeinä ja napautettavina)';
  return nappi;
}
