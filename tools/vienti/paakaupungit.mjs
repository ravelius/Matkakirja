/*
 * PELIN MAA (ISO3) → LAUDAN KAUPUNKI, JOKA ON SEN PÄÄKAUPUNKI
 * (Siirtoseppä 23.9.2026, skeema 1.2).
 *
 * Natiivi 3D-proto harventaa nimiöitä kaupungin tärkeyden mukaan
 * (3D-selvittäjä 23.9.2026); pääkaupunki saa tärkeyden 3
 * (tools/vienti/kokoelmat.mjs). Pelidatassa ei ole pääkaupunkitaulua
 * (js/karttanimet.js käyttää lähtökaupunkia ja lentokenttää), joten
 * lista on staattinen.
 *
 * Lähde: määritelmä on Wikidatan P36 (pääkaupunki) nykytilassa, laadittu
 * käsin 23.9.2026 laudan 266 kaupungista. Wikidatan kyselyä ei ajeta
 * viennissä: koko laudan erä aikakatkaistiin kahdesti, eikä vienti saa
 * riippua verkosta.
 *
 * Periaatteet:
 *   - avain on pelin maakoodi (cityCountry), joten Grönlannin (GRL) Nuuk
 *     on pääkaupunki mutta Ranskan merentakaiset (Cayenne, Nouméa) ja
 *     Yhdysvaltojen San Juan eivät ole.
 *   - maa, jonka pääkaupunki ei ole laudalla, puuttuu (USA, CAN, AUS,
 *     BRA, CHL, MMR, LKA…). Maata edustava solmu (Islanti, Kongo,
 *     Angola…) ei ole pääkaupunki.
 *   - usean pääkaupungin maa: Etelä-Afrikan Kapkaupunki on yksi kolmesta
 *     (P36: Pretoria, Kapkaupunki, Bloemfontein). Jemenin P36 on Sana.
 *     Taiwanin Taipei on tosiasiallinen pääkaupunki.
 * tests/sisaltopaketti.test.mjs vaatii, että jokainen arvo on laudan
 * kaupunki ja kuuluu avaimen maahan.
 */
export { PAAKAUPUNGIT } from '../../js/packs/laudan-paakaupungit.js';
