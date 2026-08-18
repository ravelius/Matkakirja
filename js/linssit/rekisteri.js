// Linssien rekisteri: yksi rivi per linssi, aakkosjärjestyksessä.
//
// Rivillä on vain kolme asiaa: tunnus, manner jonka laatan alta linssi
// löytyy, ja laiska tuonti. Kaikki muu (nimi, kuvake, kuvaus, lähde)
// asuu linssimoduulissa itsessään. Näin uuden linssin lisääminen on
// yhden rivin muutos yhteen tiedostoon, eivätkä kaksi samaan aikaan
// tehtyä linssiä osu samoihin riveihin.
//
// manner: null tarkoittaa, että linssi ansaitaan tietäjäpisteillä eikä
// laatan alta (ks. docs/moduulit/linssit.md luku 4).

/*
 * OHJE LINSSIN TEKIJÄLLE — LUE TÄMÄ ENNEN KUIN MUOKKAAT
 *
 * Kaikki yksitoista riviä ovat jo paikoillaan kommentoituna pois.
 * Kun oma linssisi on valmis, tee tähän tiedostoon TASAN YKSI muutos:
 *
 *     poista oman rivisi edestä kommenttimerkki `// `.
 *
 * ÄLÄ lisää rivejä, älä poista rivejä, älä järjestä uudelleen äläkä
 * koske taulukon alku- tai loppuriviin. Syy on käytännöllinen: noin
 * kymmenen tekijää muokkaa tätä tiedostoa yhtä aikaa, ja tämä on ainoa
 * tiedosto, johon he kaikki koskevat. Kun rivit ovat valmiiksi
 * paikoillaan omilla riveillään, kaksi rinnakkaista muutosta ei voi
 * osua samalle riville eikä yhdistämisristiriitaa synny.
 *
 * Kommentoitu rivi tarkoittaa "linssiä ei ole vielä olemassa". Moottori
 * (kerros.js) lukee vain tätä taulukkoa: se ei etsi tiedostoja levyltä,
 * joten kommentoitu rivi ei riko mitään eikä näy pelaajalle.
 *
 * Rivin avaamisen jälkeen tiedoston `js/linssit/<tunnus>.js` on
 * OLTAVA olemassa ja vietävä `LINSSI`-vakio, jossa on vähintään
 * tunnus, nimi, lyhyt, ikoni, laudat ja lahde — sekä piirra, jos
 * kerros ei ole false. Moottori tarkistaa sen ja heittää selkeän
 * virheen, jos jokin puuttuu.
 */
export const LINSSIT = [
  // { tunnus: 'historia',     manner: 'middleeast',    tuo: () => import('./historia.js') },
  // { tunnus: 'ilmasto',      manner: 'oceania',       tuo: () => import('./ilmasto.js') },
  // { tunnus: 'kielet',       manner: 'europe',        tuo: () => import('./kielet.js') },
  // { tunnus: 'leviaminen',   manner: 'africa',        tuo: () => import('./leviaminen.js') },
  // { tunnus: 'maaluvut',     manner: null,            tuo: () => import('./maaluvut.js') },
  // { tunnus: 'muuttoliike',  manner: null,            tuo: () => import('./muuttoliike.js') },
  { tunnus: 'radio',        manner: null,            tuo: () => import('./radio.js') },
  // { tunnus: 'tahdet',       manner: null,            tuo: () => import('./tahdet.js') },
  { tunnus: 'topografia',   manner: 'southamerica',  tuo: () => import('./topografia.js') },
  // { tunnus: 'tuulet',       manner: 'asia',          tuo: () => import('./tuulet.js') },
  { tunnus: 'vertailu',     manner: null,            tuo: () => import('./vertailu.js') },
  { tunnus: 'maatiedot',    manner: null,            tuo: () => import('./maatiedot.js') },
  { tunnus: 'vesistot',     manner: null,            tuo: () => import('./vesistot.js') },
  // { tunnus: 'yokartta',     manner: 'northamerica',  tuo: () => import('./yokartta.js') },
];
