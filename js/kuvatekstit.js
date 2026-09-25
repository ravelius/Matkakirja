/*
 * ================== LYHYT SIVULLA, PITKÄ AVATUSSA KUVASSA ==================
 *
 * Omistajan linjaus 9.9.2026 klo 11.40 (js/tyohuone-raamattu.js, merkintä
 * "LYHYT KUVATEKSTI SIVULLA, PITKA VASTA AVATUSSA KUVASSA", sanatarkasti):
 *
 *   "Ja saman säännön voisi itse asiassa ajaa kaikkiin kuvateksteihin koko
 *   pelissä. Jos kuvateksti on valmiiksi jo lyhyt, niin pidempää versiota ei
 *   tarvitse tehdä, mutta on todella paljon kuvatekstejä, joissa on aivan
 *   liian pitkä sepustus, niin ne voisi sitten lyhentää."
 *
 * Sääntö on yksi ja sama joka puolella peliä:
 *
 *   SIVULLA, KORTILLA JA KARTAN PÄÄLLÄ  →  kuvatekstiLyhyt()
 *   AVATUSSA KUVASSA (suurennos)        →  kuvatekstiPitka() + lähderivi
 *
 * Sääntö syntyi Tiedeliitteessä (omistaja 8.9.2026: *"kuvateksti voisi olla
 * lyhyempi, ja sitten voisi näkyä pidempi versio, kun sen kuvan avaa
 * näkyviin"*), ja js/tiedeliite.js on sen alkuperäinen toteutus. Tämä paketti
 * on saman säännön yhteinen muoto, jotta jokainen piirtopaikka kysyy sitä
 * samasta paikasta eikä jokainen kirjoita omaa `?? `-ketjuaan.
 *
 * KOLME KENTTÄÄ, KAKSI PITUUTTA. Pelin aineistossa on historiallisista
 * syistä kaksi nimeä samalle asialle: `selite` (lehdet, nostot, fokuskuvat,
 * nähtävyysjutut) ja `kuvateksti` (kohtaamiskuvat, eläintäyt, Ihmisen matkan
 * ilmiökuvat). Kumpikin on PITKÄ versio. Uusi `lyhyt` on yhden virkkeen
 * versio, jonka Sonnet-parvi kirjoittaa yli 100 merkin teksteille
 * (tools/kuvatekstit-lyhyet.mjs).
 *
 * VARAPOLKU MOLEMPIIN SUUNTIIN on tarkoituksellinen. Ilman `lyhyt`-kenttää
 * sivu näyttää entisen tekstin sellaisenaan — valmiiksi lyhyt kuvateksti
 * kelpaa omistajan mukaan sellaisenaan eikä vaadi mitään lisättävää. Ja jos
 * kuvalla on VAIN `lyhyt`, suurennos näyttää sen: tyhjä suurennos olisi
 * huonompi kuin lyhyt.
 */

/**
 * Sivulla, kortilla ja kartan päällä näkyvä kuvateksti.
 *
 * @param {?{lyhyt?: string, selite?: string, kuvateksti?: string}} kuva
 *   kuvaolio (null ja undefined kelpaavat: piirtopaikka voi kysyä
 *   kuvatekstiä ennen kuin tietää onko kuvaa).
 * @returns {string} lyhyt versio, tai entinen pitkä teksti jos lyhyttä ei
 *   ole; koskaan ei null eikä undefined, jotta textContent-sijoitus on
 *   turvallinen.
 */
export function kuvatekstiLyhyt(kuva) {
  return kuva?.lyhyt ?? kuva?.selite ?? kuva?.kuvateksti ?? '';
}

/**
 * Avatussa kuvassa (suurennoksessa) näkyvä kuvateksti. Suurennoksen
 * seurana kulkee aina myös lähderivi (`lahde`) — CC BY vaatii tekijän
 * maininnan siellä, missä kuva on isoimmillaan.
 *
 * @param {?{lyhyt?: string, selite?: string, kuvateksti?: string}} kuva
 * @returns {string} pitkä versio, tai lyhyt jos pitkää ei ole; koskaan ei
 *   null eikä undefined.
 */
export function kuvatekstiPitka(kuva) {
  return kuva?.selite ?? kuva?.kuvateksti ?? kuva?.lyhyt ?? '';
}
