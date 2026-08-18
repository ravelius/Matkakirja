/*
 * TIETÄJÄN TASOGALLERIA — matkalaukun i-napin minipopup (omistajan
 * tilaus 18.8.2026).
 *
 * Laukun tietäjärivi kertoo nimikkeen ja pisteet, mutta ei sitä, mistä
 * koko asiassa on kyse. Rivin perässä oleva i-nappi avaa tämän
 * ikkunan: lyhyt selitys pöllöstä ja pisteistä, ja sen alla kaikki
 * kymmenen tasoa ruudukkona — kuva, nimi ja raja.
 *
 * SAAVUTTAMATTOMAT HIMMENNETÄÄN KEVYESTI, ei piiloteta: matkan pituus
 * saa näkyä, ja nimikkeet ovat osa tarinaa eivätkä yllätys. Nykyinen
 * taso on korostettu, jotta oman kohdan löytää yhdellä silmäyksellä.
 *
 * MINIPOPUP ON OMA PALIKKANSA (js/minipopup.js). Tämä moduuli vain
 * rakentaa sisällön — ikkunan kuoresta, sumennuksesta ja sulkemisesta
 * huolehtii palikka, jota muutkin selitykset voivat käyttää.
 */

import { avaaMinipopup } from './minipopup.js';
import {
  TIETAJAPISTE_LYHENNE, TIETAJATASOT, tietajaAvatar, tietajataso,
} from './tietajatasot.js';
import { html } from './ui-apurit.js';

/*
 * SELITYS ON PÄÄTOIMITTAJAN KAANONTEKSTI (omistaja hyväksyi
 * 18.8.2026). Se sitoo kalevalaisen kehyksen yhteen kappaleeseen:
 * pöllö on tietäjien matkakumppani ja pisteet kasvattavat
 * tietäjätasoa (etulause poistettu omistajan pyynnöstä 18.8.2026).
 * Tekstiä ei muuteta ilman päätoimittajaa.
 */
export const TIETAJASELITYS = 'Viisas Pöllö — tietäjien ikivanha matkakumppani — kulkee '
  + 'mukanasi ja kasvattaa sinua tiedon tiellä. Jokainen uusi kaupunki, lauta ja oikea '
  + 'vastaus kartuttaa tietäjäpisteitä, ja pisteet nostavat tietäjätasoa: untuvikosta aina '
  + 'Tietäjäksi iänikuiseksi asti.';

/**
 * Avaa tasogallerian.
 *
 * @param {number} pisteet pelaajan tietäjäpisteet (nykyisen tason korostus).
 * @returns {HTMLDialogElement|null} avattu ikkuna.
 */
export function avaaTietajagalleria(pisteet = 0) {
  const nyt = tietajataso(pisteet);

  const selitys = html('p', 'tietaja-galleria-selitys', TIETAJASELITYS);

  /*
   * NYKYINEN TASO ISONA selitystekstin oikealla puolella (omistajan
   * tilaus 18.8.2026). Sama pöllö näkyy alempana ruudukossa toiseen
   * kertaan — se on tarkoitus: ylhäällä "kuka olen nyt", alhaalla
   * koko matka.
   */
  const isoKuva = document.createElement('img');
  isoKuva.className = 'tietaja-nykyinen-kuva';
  isoKuva.src = tietajaAvatar(nyt);
  isoKuva.alt = '';
  isoKuva.decoding = 'async';
  isoKuva.draggable = false;
  const nykyinen = html('div', 'tietaja-nykyinen');
  nykyinen.appendChild(isoKuva);
  nykyinen.appendChild(html('span', 'tietaja-nykyinen-nimi', nyt.nimi));
  const ylarivi = html('div', 'tietaja-galleria-yla');
  ylarivi.appendChild(selitys);
  ylarivi.appendChild(nykyinen);

  const ruudukko = html('ul', 'tietaja-galleria');
  for (const taso of TIETAJATASOT) {
    const kohta = html('li', 'tietaja-galleria-kohta');
    // Saavuttamaton = raja vielä edessä. Ensimmäinen taso (raja 0) on
    // aina saavutettu, joten kukaan ei katso pelkkää harmaata listaa.
    if (pisteet < taso.raja) kohta.classList.add('saavuttamaton');
    if (taso.taso === nyt.taso) {
      kohta.classList.add('nykyinen');
      kohta.setAttribute('aria-current', 'true');
    }

    const kuva = document.createElement('img');
    kuva.className = 'tietaja-galleria-kuva';
    kuva.src = tietajaAvatar(taso);
    // Tyhjä alt: nimi on heti kuvan alla, joten ruudunlukija toistaisi
    // sen muuten kahdesti.
    kuva.alt = '';
    kuva.decoding = 'async';
    kuva.loading = 'lazy';
    kuva.draggable = false;
    kohta.appendChild(kuva);

    kohta.appendChild(html('span', 'tietaja-galleria-nimi', taso.nimi));
    kohta.appendChild(html(
      'span',
      'tietaja-galleria-raja',
      `${taso.raja} ${TIETAJAPISTE_LYHENNE}`,
    ));
    ruudukko.appendChild(kohta);
  }

  return avaaMinipopup({
    otsikko: 'Tietäjän tie',
    sisalto: [ylarivi, ruudukko],
    luokka: 'tietaja-popup',
  });
}
