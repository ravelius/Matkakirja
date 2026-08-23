/*
 * PÖLLÖPOIMINNAT — kuratoidut kysymys–vastaus-parit artikkeleiden
 * loppuun (omistajan tilaus 23.8.2026).
 *
 * Kun pöllö vastaa jutun aiheesta hyvin, vastaus on liian hyvä
 * kadotettavaksi keskusteluun: kehittäjätilassa pari tallennetaan
 * (js/pollopoiminnat.js), Fable kuratoi sen ja committoi TÄHÄN
 * tiedostoon. Vasta täällä oleva pari näkyy pelaajille — pillerinä
 * artikkelin lopussa, ja pilleristä aukeaa minipopup vastauksineen.
 *
 * MIKÄÄN MUU EI NÄY PELAAJILLE. Laitteen omat (localStorage) ja
 * pelaajien ehdottamat parit ovat kuratoimatonta ainesta: edelliset
 * näkyvät vain kehittäjätilassa omalla laitteella, jälkimmäiset
 * kulkevat ehdotuskanavan kautta omistajan Lukijoilta-kuratointiin.
 *
 * AVAIMEN MUOTO (sitova):
 *   nähtävyysjuttu  'juttu:<kaupunkiId>:<kohteen nimi>'
 *                   esim. 'juttu:praha:Vanhauusi synagoga'
 *   aihesivu        'aihe:<kaupunkiId tai ISO3>:<kategoriaId>'
 *                   esim. 'aihe:praha:historia' tai 'aihe:CZE:historia'
 *
 * Kaupunkilehden aihesivu tunnistetaan kaupungin id:llä, maalehden
 * sivu maan ISO3-koodilla — sama erottelu kuin lehden minitehtävän
 * avaimessa (js/ui.js piirraMinitehtava), jottei saman aiheen sivu
 * kahdessa julkaisussa jakaisi samoja poimintoja.
 *
 * Arvo on lista pareja { kysymys, vastaus }. Kysymys on pillerin
 * teksti, vastaus popupin leipäteksti (tyhjä rivi erottaa kappaleet).
 * Malli:
 *
 *   'juttu:praha:Vanhauusi synagoga': [
 *     {
 *       kysymys: 'Miksi synagogan ullakolle ei nousta?',
 *       vastaus: 'Tarinan mukaan ullakolla lepää Golem…',
 *     },
 *   ],
 */

export const POLLO_POIMINNAT = {};
