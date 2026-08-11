/*
 * Kaaritekstien tagit työhuoneen Euroopan tekstit -sivulle.
 *
 * Fable max tuottaa nämä hiontaerien mukana; tässä on toistaiseksi vain
 * Ateenan mallirivi (omistajan tilaus 11.8.2026). Kohde, jolla ei ole
 * tageja, näkyy sivulla haalealla "tagit tulossa" -merkillä — sivu ei
 * siis odota tätä tiedostoa valmiiksi, vaan kasvaa erä kerrallaan.
 *
 * --- LUOKAT OVAT AVOIMIA ---
 *
 * Omistajan linjaus: "voi olla muitakin tageja tarpeen mukaan". Sivu
 * renderöi MINKÄ TAHANSA luokka-avaimen — tänne voi lisätä uuden
 * luokan koskematta sivun koodiin, ja se saa oman värinsä
 * automaattisesti. Väri on sidottu luokan NIMEEN, joten sama luokka on
 * samanvärinen joka kaupungissa (ks. tyohuone.html: tagiVari).
 *
 * Arvo on aina taulukko merkkijonoja. Tyhjä taulukko tarkoittaa "tämä
 * luokka ei koske tätä kohdetta" ja jätetään mieluummin kokonaan pois.
 *
 * Muoto:
 *
 *   export const KAARI_TAGIT = {
 *     ateena: {
 *       puhuja: ['Horatio 1873', 'Nikos'],
 *       teemat: ['legenda', 'mittaus'],
 *       tunnetilat: ['arvoitus'],
 *     },
 *   };
 *
 * Avain on sama kohdetunnus kuin js/tyohuone-kehitys-data.js:ssä
 * (KAARI_PAKETIT.kohteet[].id).
 */
export const KAARI_TAGIT = {
  ateena: {
    puhuja: ['Horatio 1873', 'Nikos'],
    teemat: ['legenda', 'mittaus'],
    tunnetilat: ['arvoitus'],
  },
};
