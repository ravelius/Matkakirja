/**
 * GALLERIOIDEN SELAUSKAISTAT — YKSI SÄÄNTÖ KOKO PELIIN.
 *
 * Omistajan tilaus 9.9.2026 klo 14.15, sanatarkasti: *"kaupunkilehden
 * herokuvissa ja muissa vastaavissa gallerioissa on liian leveä alue
 * mistä kuva siirtyy seuraavaan tai edelliseen kuvaan. kavenna sitä,
 * jotta kuvan klikkaaminen ja suurentaminen keskeltä on helpompaa"*
 * (js/tyohuone-raamattu.js "GALLERIOIDEN SELAUSALUEET KAPEAMMIKSI,
 * KESKELTA KLIKKI SUURENTAA").
 *
 * MITATTU LÄHTÖTILANNE: karusellinuolet olivat 32 % kuvan leveydestä
 * kummallakin puolella (css/styles.css `.arrival-kuva-nuoli`) ja
 * historian hetken sekä skandaalin nuolet 30 % (css/fokusnosto.css).
 * Keskelle jäi siis 36–40 % — ja koska nuoli on koko kuvan korkuinen,
 * kuvan ylä- ja alalaidasta EI päässyt suurennokseen lainkaan muualta
 * kuin tuosta kapeasta keskikaistasta. Juuri se tuntui vaikealta.
 *
 * UUSI JAKO on tässä yhtenä lukuna: reunakaista kummallakin puolella,
 * loput keskelle. 0,24 jättää keskiosalle 52 % eli enemmän kuin
 * puolet, ja pitää silti reunakaistan sormenpään levyisenä (esim.
 * 666 px leveällä lehtikuvalla 160 px).
 *
 * MIKSI YKSI LUKU KAHDESSA MAAILMASSA: osa gallerioista selataan
 * päällekkäisillä nuolinapeilla (niiden osuma-alue on CSS-leveys) ja
 * osa laskee vyöhykkeen osoittimen paikasta (postikorttipino, jolla ei
 * ole nuolia). Molemmat lukevat saman luvun: JS tämän vakion, CSS
 * muuttujan `--gallerian-reunakaista`. tests/galleria.test.mjs vartioi,
 * etteivät ne pääse erkanemaan.
 *
 * PYYHKÄISY EI MUUTU: vaakaveto vaihtaa kuvaa kuten ennenkin, ja
 * kynnys erottaa vedon napautuksesta. Tämä moduuli koskee vain
 * napautuksen osumakohtaa.
 */

/**
 * Edellinen/seuraava-kaistan osuus kuvan leveydestä KUMMALLAKIN
 * puolella. Keskiosa on `1 - 2 * GALLERIAN_REUNAKAISTA` eli 52 %.
 *
 * Raja on omistajan tilauksessa "enintään noin neljännes": arvo ei saa
 * nousta yli 0,25:n, koska silloin keskiosa putoaisi puolikkaan alle.
 * @type {number}
 */
export const GALLERIAN_REUNAKAISTA = 0.24;

/**
 * Sama luku CSS:n muodossa (`'24%'`). Tyylitiedostoissa arvo asuu
 * muuttujassa `--gallerian-reunakaista`, ja testi vertaa sitä tähän.
 * @type {string}
 */
export const GALLERIAN_REUNAKAISTA_CSS = `${Math.round(GALLERIAN_REUNAKAISTA * 100)}%`;

/** Keskiosan osuus — vartijoita ja dokumentointia varten. */
export const GALLERIAN_KESKIKAISTA = 1 - 2 * GALLERIAN_REUNAKAISTA;

/**
 * Napautuksen vyöhyke kuvan leveydellä.
 *
 * VARMA OLETUS ON KESKUSTA: jos elementtiä ei voi mitata (irrallinen
 * solmu, nollan levyinen kehys) tai tapahtumalla ei ole koordinaattia
 * (näppäimistön Enter), palautetaan `'suurenna'`. Näin epävarmuus ei
 * koskaan vie pelaajaa pois kuvasta — juuri se oli tilauksen vaiva.
 *
 * @param {{clientX?:number}} tapahtuma osoitin- tai hiiritapahtuma.
 * @param {{getBoundingClientRect?:Function}} elementti kuva-alue,
 *   jonka leveydeltä vyöhyke lasketaan.
 * @param {object} [valinnat]
 * @param {number} [valinnat.reunakaista] osuus 0…0,5; oletus
 *   GALLERIAN_REUNAKAISTA.
 * @returns {'edellinen'|'suurenna'|'seuraava'}
 */
export function gallerianVyohyke(tapahtuma, elementti, { reunakaista = GALLERIAN_REUNAKAISTA } = {}) {
  const x = Number(tapahtuma?.clientX);
  if (!Number.isFinite(x)) return 'suurenna';
  const mitat = elementti?.getBoundingClientRect?.();
  const leveys = Number(mitat?.width);
  if (!Number.isFinite(leveys) || leveys <= 0) return 'suurenna';
  // Kaista kuritetaan välille 0…0,5: negatiivinen tai puolikasta
  // suurempi arvo tekisi keskiosasta mahdottoman.
  const kaista = Math.min(0.5, Math.max(0, Number(reunakaista) || 0));
  const osuus = (x - Number(mitat.left ?? 0)) / leveys;
  // Rajapiste kuuluu KESKUSTALLE (< eikä <=): keskiosa on aina
  // vähintään luvattu 52 %, myös pyöristysten kanssa.
  if (osuus < kaista) return 'edellinen';
  if (osuus > 1 - kaista) return 'seuraava';
  return 'suurenna';
}

/**
 * Vyöhykkeen askel sarjassa: -1 taakse, +1 eteen, 0 keskeltä.
 * Kutsuja päättää itse, mitä keskusta tekee (suurennos, paikallaan
 * pysyminen), joten tämä on vain lyhyt kirjanpitoapu.
 *
 * @param {'edellinen'|'suurenna'|'seuraava'} vyohyke
 * @returns {-1|0|1}
 */
export function vyohykkeenAskel(vyohyke) {
  if (vyohyke === 'edellinen') return -1;
  if (vyohyke === 'seuraava') return 1;
  return 0;
}
