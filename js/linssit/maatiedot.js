/*
 * MAIDEN TIEDOT — varuste, joka avaa minkä tahansa maan oman lehden
 * suoraan kartalta.
 *
 * Omistajan tilaus 8.8.2026: *"tee lisäksi uusi varuste: 'maiden
 * tiedot' millä pystyy avaamaan minkä tahansa maan tiedot suoraan
 * kartalta ilman että sinne pitää ensin mennä nopalla. Kaupungin
 * tiedot aukeavat edelleen pelkästään siinä paikassa missä pelaaja
 * on."*
 *
 * Tämä on se raja, joka varusteen on tarkoitus siirtää: KAUPUNKI on
 * paikka, jonne matkustetaan, mutta MAA on tietoa, jota saa lukea
 * mistä tahansa. Kaupunkilehti pysyy siis matkan palkintona ja
 * maalehti muuttuu hakuteokseksi.
 *
 * Linssi EI piirrä karttakerrosta (kerros: false, kuten vertailu ja
 * radio) vaan ottaa karttanäkymän TILAKSI (js/ui.js
 * tahdistaMaatiedot): kaupungit väistyvät, maiden rajat tulevat
 * näkyviin ja jokainen maa on napautettava. Napautus näyttää maan
 * rajat ja nimen, jonka perässä on "i" — siitä aukeaa maan lehti.
 *
 * Miksi oma linssi eikä vertailun laajennus: vertailu VALITSEE maita
 * listalle ja vertaa niitä keskenään, tämä AVAA yhden maan kerrallaan
 * luettavaksi. Sama ele tarkoittaisi kahta eri asiaa, ja alapalkki
 * olisi kahden tilan sekasikiö.
 *
 * Löytyminen noudattaa varusteiden yleistä mallia: manner: null
 * rekisterissä tarkoittaa, että linssi ansaitaan tietäjäpisteillä
 * (js/linssit/omistus.js, LINSSIKYNNYKSET).
 */

export const LINSSI = {
  tunnus: 'maatiedot',
  jarjestys: 95,
  kerros: false,

  nimi: 'Maiden tiedot',
  lyhyt: 'Napauta kartalta mitä tahansa maata ja lue sen oma lehti — ei tarvitse matkustaa perille.',
  // Avoin kirja ja i-kirjain: hakuteos, ei karttakerros.
  ikoni: '<path d="M4 6.2c2.6-1.1 5.2-1.1 8 0v12c-2.8-1.1-5.4-1.1-8 0Z"/>'
    + '<path d="M20 6.2c-2.6-1.1-5.2-1.1-8 0v12c2.8-1.1 5.4-1.1 8 0Z"/>'
    + '<path d="M16.2 10.4v4.2"/><path d="M16.2 8.6v.1"/>',
  valokuva: false,

  // Maalehti syntyy maatunnuksesta, joka on jokaisella laudalla.
  laudat: ['*'],

  lahde: {
    aineisto: 'Maiden rajat: Natural Earth. Maiden sisältö: pelin oma aineisto ja Wikimedia Commons.',
    lisenssi: 'Public domain (Natural Earth)',
    osoite: 'https://www.naturalearthdata.com/',
    haettu: '2026-08-08',
  },
};
