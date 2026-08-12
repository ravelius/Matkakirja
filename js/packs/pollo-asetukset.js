/*
 * Viisaan Pöllön rajapintaosoite.
 *
 * Sama käytäntö kuin uutisvälityksellä (js/packs/uutislahteet.js): peli
 * ei puhu maksulliseen tekoälyrajapintaan suoraan, vaan oman pienen
 * Cloudflare Workerin kautta. Workerin lähdekoodi ja omistajan
 * käyttöönotto-ohje: tools/pollo/.
 *
 * Kun osoite on tyhjä, pöllönappi näkyy pelissä mutta napautus avaa
 * siistin "Pöllö ei ole vielä hereillä" -tilan. Peli ei tee yhtään
 * verkkopyyntöä eikä kirjoita mitään konsoliin.
 *
 * HUOM: https://-alku on pakollinen — ilman sitä selain tulkitsisi
 * osoitteen suhteelliseksi poluksi pelin omalle sivustolle.
 *
 * API-avainta EI kirjoiteta tänne eikä mihinkään muualle repoon. Avain
 * elää vain Cloudflaren salaisuussäilössä (ks. tools/pollo/OHJE.md).
 */
export const POLLOPALVELIN = '';
