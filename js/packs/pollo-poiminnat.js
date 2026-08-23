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

export const POLLO_POIMINNAT = {
  /*
   * Ensimmäinen kuratoitu poiminta (omistajan tallennus 23.8.2026,
   * saapui ehdotuskanavan kautta — v1052:n autolähetysputken
   * ensiesiintyminen). Vastaus tukee kaupunki-sivun Gaertner-nostoa.
   */
  'aihe:berliini:kaupunki': [
    {
      kysymys: 'Mitä tarkoittaa "Eduard Gaertner"?',
      vastaus: 'Eduard Gaertner oli 1800-luvun saksalainen '
        + 'taidemaalari, joka aloitti uransa posliininmaalarina ennen '
        + 'kuin siirtyi kaupunkinäkymien maalaamiseen. Hän kiersi '
        + 'Berliinin katuja ja kuvasi ne niin tarkasti — ikkunaruutuja '
        + 'ja kylttien tekstejä myöten — että häntä on kutsuttu '
        + 'kaupungin "kameraksi" ajalta ennen valokuvausta.'
        + '\n\n'
        + 'Hänen taulunsa eivät olleet pelkkiä juhlallisia näkymiä, '
        + 'vaan niissä näkyy arkinen elämä: kiveystä korjataan, koirat '
        + 'nuuskivat toisiaan ja pyykki kuivuu ikkunoissa. Juuri tämän '
        + 'tarkkuuden vuoksi hänen teoksensa ovat nykyään tutkijoille '
        + 'arvokas lähde siitä, miltä kadonnut Berliini todella '
        + 'näytti.',
    },
  ],
};
