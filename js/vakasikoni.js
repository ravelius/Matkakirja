/*
 * VÄKÄSIKONI — KOLME LEVEÄÄ V:TÄ PÄÄLLEKKÄIN.
 *
 * OMISTAJAN TILAUS 13.9.2026, sanatarkasti: *"Se kuvake voisi olla
 * muunnos hampurilaisesta niin että viivat ovat kuin kolme leveää v
 * kirjainta päällekkäin. Käytä samaa myös kaikissa linsseissä joissa
 * on oma yläpalkkinsa."*
 *
 * MIKSI OMA MODUULI. Sama kuvake piirretään kolmessa paikassa:
 * pelin päävalikossa (index.html #menu-btn), vaakapuhelimen
 * yläpalkkinapissa (js/ylapalkki-vaaka.js) ja linssien omassa
 * valikossa (js/aikajana-valikko.js). Kolme kopiota samasta
 * polkumerkkijonosta eriytyisi ensimmäisessä hienosäädössä; nyt
 * muutos tehdään kerran. index.html on staattista HTML:ää eikä voi
 * tuoda tätä, joten sen kopio vartioidaan testillä
 * (tests/vakasikoni.test.mjs).
 *
 * TÄMÄ MODUULI EI TUO MITÄÄN, jotta se kelpaa niputuksen pohjalle
 * kaikkien kolmen käyttäjänsä edelle.
 *
 * MITAT. Kärjet ovat x = 4…20 eli leveämmät kuin entisen
 * hampurilaisen 4,5…19,5 — omistaja pyysi nimenomaan LEVEITÄ
 * v-kirjaimia. Rivit ovat 5,5 px:n välein ja jokainen laskeutuu 4 px,
 * jolloin pysty­ulottuma on 4,5…19,5 ja kuvake istuu 24 × 24 -ruudun
 * keskellä samassa optisessa painossa kuin kolme suoraa viivaa.
 */

/** Yksi V riviä kohden, ylhäältä alas. */
export const VAKASIKONIN_POLUT = Object.freeze([
  'M4 4.5 L12 8.5 L20 4.5',
  'M4 10 L12 14 L20 10',
  'M4 15.5 L12 19.5 L20 15.5',
]);

/**
 * Kuvakkeen sisus valmiina merkkijonona (innerHTML-käyttöön).
 *
 * `stroke-linejoin: round` on tässä pakollinen eikä koriste: ilman
 * sitä v:n kärki piirtyy teräväksi piikiksi, joka näyttää eri
 * paksuiselta kuin viivan muu osa.
 */
export function vakasikoninSvg({ koko = 20 } = {}) {
  return `<svg viewBox="0 0 24 24" width="${koko}" height="${koko}" aria-hidden="true" `
    + 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" '
    + `stroke-linejoin="round">${
      VAKASIKONIN_POLUT.map((d) => `<path d="${d}"/>`).join('')}</svg>`;
}
