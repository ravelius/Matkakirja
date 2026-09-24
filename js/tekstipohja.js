/*
 * TEKSTIPOHJAT (Siirtoseppä 23.9.2026, sisältöpaketin osa 2).
 *
 * Packien tekstit ovat merkkijonoja, joissa paikkamerkit ovat muotoa
 * {nimi}: esim. texts.starFound = '◈ {name} löysi … kaupungista {city}!'.
 * Aiemmin ne olivat nuolifunktioita, joita natiivi peli ei voi lukea
 * sisältöpaketista. Tuntematon paikkamerkki jää näkyviin sellaisenaan.
 */
export function taytaPohja(pohja, arvot = {}) {
  return String(pohja ?? '').replace(/\{(\w+)\}/g, (koko, avain) => (
    Object.hasOwn(arvot, avain) ? String(arvot[avain]) : koko));
}
