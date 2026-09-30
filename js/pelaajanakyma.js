/*
 * PELAAJAN NÄKYMÄ -APUNAPPI KEHITTÄJÄN MAAILMATILASSA.
 *
 * Omistaja 29.9.2026 klo 08.5x: *"Maailmatilaan voisi tehdä apunapin, joka näyttäisi kartan samalla lailla, kuin
 * että maailmatila ei olisi päällä. Ainoastaan kohdekaupungit näkyisivät himmeänä ja pystyisin edelleen klikkaamalla
 * siirtymään myös niihin, mutta muuten näkisin pelinäkymän samalla lailla, kuin normaali pelaaja."*
 *
 * Nappi on karttaselitenapin alla samassa kotelossa (.karttaselite), samankokoisena laattana, ja näkyy vain kun
 * kehittäjätila ja maailmatila ovat päällä (ei katselutilassa). Painallus kääntää pelaajan näkymän
 * (js/ui-apurit.js asetaKehittajaPelaajanakyma) ja ajaa saman päivityksen kuin maailmanappi
 * (ui.paivitaKehittajaMaailma): zoomi- ja panorointirajat, maan rajaus ja pisteet palaavat pelaajan sääntöihin, ja
 * pallolauta piirtää pelaajalta piilossa olevat kohdekaupungit himmeinä, napautettavina (hyppy kuten maailmatilassa).
 * Natiivi tekee saman (Natiivi-UI 29.9.: sama paikka, 40 % peitto, sama koko, ei nimeä).
 */

import {
  asetaKehittajaPelaajanakyma, html, kehittajaMaailmaValittu, kehittajaPelaajanakymaValittu, kehittajaTilaPaalla,
} from './ui-apurit.js';

const SILMA = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" '
  + 'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
  + '<path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/>'
  + '<circle cx="12" cy="12" r="2.8"/></svg>';

/** Nappi karttaselitteen koteloon (luodaan kerran) ja sen näkyvyys ja tila ajan tasalle. */
export function paivitaPelaajanakymaNappi(ui) {
  if (typeof document === 'undefined') return null;
  const kotelo = ui?.mapPane?.querySelector?.('.karttaselite');
  if (!kotelo) return null;
  let nappi = kotelo.querySelector(':scope > .pelaajanakyma-nappi');
  if (!nappi) {
    nappi = html('button', 'pelaajanakyma-nappi');
    nappi.type = 'button';
    nappi.innerHTML = SILMA;
    nappi.addEventListener('click', () => {
      asetaKehittajaPelaajanakyma(!kehittajaPelaajanakymaValittu());
      ui.paivitaKehittajaMaailma?.();
      paivitaPelaajanakymaNappi(ui);
    });
    kotelo.appendChild(nappi);
  }
  const nakyy = kehittajaTilaPaalla() && kehittajaMaailmaValittu() && !ui.katselu;
  nappi.hidden = !nakyy;
  const paalla = kehittajaPelaajanakymaValittu();
  nappi.setAttribute('aria-pressed', String(paalla));
  nappi.title = paalla
    ? 'Pelaajan näkymä PÄÄLLÄ: kartta kuten pelaajalla, piilossa olevat kaupungit himmeinä — napauta himmeää '
      + 'kaupunkia siirtyäksesi sinne; napauta tätä palataksesi maailmatilaan'
    : 'Pelaajan näkymä: näytä kartta kuten pelaajalla (piilossa olevat kaupungit himmeinä ja napautettavina)';
  nappi.setAttribute('aria-label', paalla ? 'Pelaajan näkymä päällä' : 'Pelaajan näkymä');
  return nappi;
}
