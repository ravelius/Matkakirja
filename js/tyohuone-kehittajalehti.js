/*
 * KEHITTÄJÄLEHTI — työhuoneen toinen nappi.
 *
 * Omistajan tilaus 11.9.2026 (Raamattu, "RAAMATTU MUOKATTAVAKSI
 * PELISSA JA TYOHUONEEN VALIKKO KAHTEEN NAPPIIN", sanatarkasti):
 * *"saisiko kuvan otsikot yhdistettyä niin että jäljelle jäisi vain
 * raamattu sekä kehittäjä lehti, minkä alle tulisi nuo kaikki muut
 * jutut mitkä jäävät raamatun ulkopuolelle"* — ja samana päivänä
 * tarkennus: *"samalla raamatun ja kehittäjälehden voisi siirtää
 * hammasratas valikon alle. näin hampurilainen pysyisi
 * muuttumattomana riippumatta siitä onko kehittäjä tila päällä vai
 * ei."*
 *
 * Työhuoneen seitsemän erillistä nappia (Tilannelehti, Poiminnat,
 * Tilastot, Grafiikka, Lukijoilta, Musiikki, Lukijaääni) olivat
 * hampurilaisvalikon #kehittaja-kotelossa 15.8.–11.9.2026. Nyt ne
 * ovat TÄMÄN LEHDEN ETUSIVUN RIVEJÄ: sama ikoni, sama nimi ja sama
 * kohde kuin ennen — vain paikka vaihtui. Logiikkaa ei ole kahdennettu
 * mihinkään: rivi kutsuu täsmälleen samaa avausfunktiota kuin
 * poistettu nappi (js/lehti.js avaa*-funktiot, Lukijaääni main.js:n
 * säädindialogin kautta).
 *
 * Rivien tyyli on työhuoneen entinen nappityyli (.tyohuone-nappi),
 * jotta valikosta lehteen siirtynyt rivi näyttää samalta kuin ennen.
 */

import { html } from './ui-apurit.js';

/**
 * Ikonin muodot datana, ei merkkijono-HTML:nä.
 *
 * Työhuoneen napeissa ikonit olivat index.html:n <svg>-elementteinä.
 * Lehden rivit rakennetaan JS:stä, ja koska innerHTML ei ole talon
 * tapa, muodot kulkevat pieninä olioina ja SVG kootaan alla
 * createElementNS:llä. Polut ovat SAMAT kuin poistetuissa napeissa.
 */
const RIVIN_SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * KEHITTÄJÄLEHDEN RIVIT — yksi rivi per entinen työhuoneen nappi.
 *
 * `tunnus` on sekä rivin id-pääte että se avain, jolla avausfunktio
 * haetaan (js/lehti.js antaa taulun). Järjestys on sama kuin
 * omistajan tilauksessa: Tilannelehti, Poiminnat, Tilastot,
 * Grafiikka, Lukijoilta, Musiikki ja Lukijaääni.
 */
export const KEHITTAJALEHDEN_RIVIT = [
  {
    tunnus: 'tilanne',
    nimi: 'Tilannelehti',
    kuvaus: 'Kolmen session työnjako, testattavaa ja pöllöpoimintojen vienti.',
    ikoni: [
      { muoto: 'path', d: 'M4.5 5.5h15v13h-15z' },
      { muoto: 'path', d: 'M7.5 9h5.5M7.5 12h9M7.5 15h9' },
      { muoto: 'path', d: 'M16 9h.5' },
    ],
  },
  {
    tunnus: 'poiminnat',
    nimi: 'Poiminnat',
    kuvaus: 'Oikotie Tilannelehden Pöllöpoiminnat-sivulle.',
    ikoni: [
      {
        muoto: 'rect', x: 4.5, y: 9, width: 15, height: 6, rx: 3,
      },
      { muoto: 'path', d: 'M12 9v6' },
    ],
  },
  {
    tunnus: 'tilastot',
    nimi: 'Tilastot',
    kuvaus: 'Rakennustyön tilanne mantereittain, maittain ja kaupungeittain.',
    ikoni: [
      { muoto: 'path', d: 'M4.5 19.5h15' },
      { muoto: 'path', d: 'M7 19.5v-7' },
      { muoto: 'path', d: 'M12 19.5v-11' },
      { muoto: 'path', d: 'M17 19.5v-4.5' },
    ],
  },
  {
    tunnus: 'grafiikka',
    nimi: 'Grafiikka',
    kuvaus: 'Julistesuunnan luonnokset yksi juliste sivua kohti.',
    ikoni: [
      { muoto: 'path', d: 'M4.5 4.5h15v15h-15z' },
      { muoto: 'path', d: 'm4.5 15.5 4.5-4.5 3.5 3.5 3-3 4 4' },
      { muoto: 'path', d: 'M9.5 8.7a.9.9 0 1 1 0 .2' },
    ],
  },
  {
    tunnus: 'lukijoilta',
    nimi: 'Lukijoilta',
    kuvaus: 'Lukijoiden ehdotukset, kuvavinkit ja Raamatun muutokset.',
    ikoni: [
      { muoto: 'path', d: 'M3.8 6.5h16.4v11H3.8z' },
      { muoto: 'path', d: 'm3.8 6.5 8.2 6 8.2-6' },
    ],
  },
  {
    tunnus: 'musiikki',
    nimi: 'Musiikki',
    kuvaus: 'Siirtymä-, linssi- ja palettiraidat sekä tehosteet kuunneltavina.',
    ikoni: [
      { muoto: 'path', d: 'M9.5 17.5V6.2l9-1.7v11' },
      { muoto: 'path', d: 'M9.5 9.7l9-1.7' },
      { muoto: 'path', d: 'M9.5 17.5a2.2 2.2 0 1 1-2.2-2.2 2.2 2.2 0 0 1 2.2 2.2z' },
      { muoto: 'path', d: 'M18.5 15.5a2.2 2.2 0 1 1-2.2-2.2 2.2 2.2 0 0 1 2.2 2.2z' },
    ],
  },
  {
    tunnus: 'lukijaaani',
    nimi: 'Lukijaääni',
    kuvaus: 'Lukijan ääni, ohje, nopeus ja voimakkuus persoonittain.',
    ikoni: [
      { muoto: 'path', d: 'M5 10v4h3.5l4 3.5v-11L8.5 10z' },
      { muoto: 'path', d: 'M15.5 9.5a3.6 3.6 0 0 1 0 5' },
      { muoto: 'path', d: 'M17.5 7.5a6.4 6.4 0 0 1 0 9' },
    ],
  },
];

/** Yksi viivaikoni rivin alkuun (sama kuorielementti kuin valikossa). */
function ikoni(muodot) {
  const kuori = html('span', 'viiva-ikoni');
  kuori.setAttribute('aria-hidden', 'true');
  const svg = document.createElementNS(RIVIN_SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  for (const m of muodot) {
    const solmu = document.createElementNS(RIVIN_SVG_NS, m.muoto);
    for (const [nimi, arvo] of Object.entries(m)) {
      if (nimi === 'muoto') continue;
      solmu.setAttribute(nimi, String(arvo));
    }
    svg.appendChild(solmu);
  }
  kuori.appendChild(svg);
  return kuori;
}

/**
 * Etusivun rivit koteloon.
 *
 * @param {Element} kohde sivun kotelo
 * @param {object} avaa tunnus → avausfunktio (js/lehti.js)
 * @param {object} valinnat `piilota`: tunnukset, jotka jätetään pois
 *   (Lukijaääni piiloutuu samalla ehdolla kuin entinen nappi)
 */
export function piirraKehittajalehdenRivit(kohde, avaa = {}, { piilota = [] } = {}) {
  const kotelo = html('div', 'kehittajalehti-rivit');
  for (const rivi of KEHITTAJALEHDEN_RIVIT) {
    if (piilota.includes(rivi.tunnus)) continue;
    const nappi = html('button', 'ghost tyohuone-nappi kehittajalehti-rivi');
    nappi.type = 'button';
    nappi.id = `kehittajalehti-rivi-${rivi.tunnus}`;
    nappi.appendChild(ikoni(rivi.ikoni));
    const teksti = html('span', 'kehittajalehti-teksti');
    teksti.appendChild(html('span', 'kehittajalehti-nimi', rivi.nimi));
    teksti.appendChild(html('span', 'kehittajalehti-selite', rivi.kuvaus));
    nappi.appendChild(teksti);
    nappi.addEventListener('click', () => avaa[rivi.tunnus]?.());
    kotelo.appendChild(nappi);
  }
  kohde.appendChild(kotelo);
  return kotelo;
}

/**
 * Kehittäjälehden sivut: yksi etusivu, jolla on kaikki rivit.
 *
 * Lehti on tarkoituksella YHDEN SIVUN lehti: se on valikko, ei
 * luettava liite, ja jokainen rivi avaa oman lehtensä entiseen
 * tapaan.
 */
export function kehittajalehdenSivut(avaa = {}, valinnat = {}) {
  return [{
    id: 'kehittajalehti-etusivu',
    nimi: 'Kehittäjälehti',
    yksipalsta: true,
    rakenna: (kohde) => piirraKehittajalehdenRivit(kohde, avaa, valinnat),
  }];
}
