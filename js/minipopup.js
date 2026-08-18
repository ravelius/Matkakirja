/*
 * MINIPOPUP — pelin pieni tietoikkuna (omistajan tilaus 18.8.2026).
 *
 * Yksi paikka, josta koko peli saa saman kevyen ikkunan: otsikko,
 * ruksi, sisältö ja sumea tausta. Ensimmäinen käyttäjä on tietäjän
 * tasogalleria (js/tietajagalleria.js, matkalaukun i-nappi), mutta
 * palikka on tarkoituksella yleinen — seuraava "mikä tämä on?"
 * -selitys ei saa synnyttää toista ikkunatoteutusta.
 *
 * OMA <dialog> SELAIMEN YLIMMÄSSÄ KERROKSESSA. Sama syy kuin
 * lippuikkunassa (js/liput.js) ja pöllön kuvapopupissa: minipopup
 * avataan usein toisen modaalin päältä (matkalaukku on <dialog>), eikä
 * tavallinen z-index-kerros nousisi modaalin yläpuolelle. showModal
 * antaa lisäksi ilmaiseksi Esc-sulun ja kohdistusansan.
 *
 * KEHYS JA KORTTI ERI ELEMENTTEINÄ, kuten lippuikkunassa: kehys maalaa
 * paperin, reunan ja varjon, kortti vierittää ja leikkaa sisällön
 * pyöristetyn reunan sisään. Yhdessä elementissä iOS päästi sisällön
 * vuotamaan pyöristyksen yli, kun sisältö nousi omalle
 * piirtokerrokselleen (omistajan iPad-havainto 18.8.2026).
 *
 * YKSI KERRALLAAN: uusi avaus poistaa edellisen. Popup on selitys, ei
 * näkymä, eikä selityksiä ole mieltä pinota päällekkäin.
 */

import { html } from './ui-apurit.js';

/**
 * Avaa minipopupin.
 *
 * @param {object} p
 * @param {string} p.otsikko ikkunan otsikko (myös ruudunlukijan nimi).
 * @param {Node|Node[]|string} p.sisalto valmis solmu, solmuja tai tekstiä.
 * @param {string} [p.luokka] lisäluokka kortille omaa asettelua varten.
 * @returns {HTMLDialogElement|null} auennut ikkuna, tai null ilman DOMia.
 */
export function avaaMinipopup({ otsikko = '', sisalto = null, luokka = '' } = {}) {
  if (typeof document === 'undefined') return null;
  document.querySelector('.minipopup')?.remove();

  const dialogi = document.createElement('dialog');
  dialogi.className = 'minipopup';
  // Napautus taustaan sulkee: osuma dialogiin itseensä tulee vain
  // kehyksen ulkopuolelta, koska kortti täyttää kehyksen kokonaan.
  dialogi.addEventListener('click', (e) => {
    if (e.target === dialogi) dialogi.close();
  });
  dialogi.addEventListener('close', () => dialogi.remove());

  const kehys = html('div', 'minipopup-kehys');
  const kortti = html('div', `minipopup-kortti${luokka ? ` ${luokka}` : ''}`);

  const yla = html('div', 'minipopup-ylarivi');
  const nimio = html('h2', 'minipopup-otsikko', otsikko);
  /*
   * Ruudunlukija saa ikkunan nimen otsikosta. Tunniste on juokseva,
   * jottei kahdesti avattu popup jätä jälkeensä kaksoistunnistetta —
   * vanha ikkuna poistetaan kyllä, mutta poisto tapahtuu vasta close-
   * tapahtumassa, ja sulkeutumisanimaation aikana molemmat voivat olla
   * hetken puussa.
   */
  nimio.id = `minipopup-otsikko-${Math.random().toString(36).slice(2, 8)}`;
  dialogi.setAttribute('aria-labelledby', nimio.id);
  yla.appendChild(nimio);

  const x = html('button', 'minipopup-sulje', '×');
  x.type = 'button';
  x.title = 'Sulje';
  x.setAttribute('aria-label', 'Sulje');
  x.addEventListener('click', () => dialogi.close());
  yla.appendChild(x);
  kortti.appendChild(yla);

  const runko = html('div', 'minipopup-sisalto');
  if (typeof sisalto === 'string') runko.appendChild(html('p', 'minipopup-teksti', sisalto));
  else if (Array.isArray(sisalto)) for (const osa of sisalto) { if (osa) runko.appendChild(osa); }
  else if (sisalto) runko.appendChild(sisalto);
  kortti.appendChild(runko);

  kehys.appendChild(kortti);
  dialogi.appendChild(kehys);
  document.body.appendChild(dialogi);
  try {
    dialogi.showModal();
  } catch {
    // Vanha selain tai irrallinen dokumentti (testit): ikkuna jää
    // tavalliseksi kerrokseksi, mutta sisältö näkyy ja ruksi toimii.
    dialogi.setAttribute('open', '');
  }
  return dialogi;
}

/** Sulkee auki olevan minipopupin, jos sellainen on. */
export function suljeMinipopup() {
  const auki = typeof document === 'undefined' ? null : document.querySelector('.minipopup');
  if (!auki) return;
  if (typeof auki.close === 'function') auki.close();
  else auki.remove();
}
