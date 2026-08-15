/*
 * Rakennustyön tilannetaulu työhuoneen etusivulle (omistajan toive
 * 8.8.2026: "yhteenveto, joka päivittyy, siitä missä tämänhetkinen
 * rakennustyö on menossa").
 *
 * TÄTÄ TIEDOSTOA PÄIVITTÄÄ FABLE aina, kun sessioilta saapuu
 * raportti tai työjono muuttuu — muut sessiot eivät kirjoita tähän.
 * Työhuone näyttää taulun etusivun kärjessä. Tilat: 'tyossa',
 * 'valmis', 'odottaa' (selväkielinen selite riville).
 */

export const TILANNE = {
  paivitetty: '15.8.2026 — v679–v699',
  tavoite: 'Kuvatekstiurakka valmis (569 → 0). Siperia valmis (8 '
    + 'kaupunkia). Reunuskartat + satelliitit 4 kaupungilla. Lukijan '
    + 'automoodi, otsikkotauot, väistö. Äänet tasattu. Esipuskurit. '
    + 'Raamattu ja Tilannelehti pelissä. Matkakirjatekstit odottavat '
    + 'Raamatun läpikäyntiä.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'päätoimittaja',
      tila: 'tyossa',
      tehtava: 'Koordinointi, merget pistokokein, omat lukija- ja '
        + 'äänityöt. Työsessiot vain perustamisprompteilla.',
      seuraavaksi: 'Värikartan kytkentä + miniatyyripilotti '
        + 'palettipäätöksen jälkeen.',
    },
  ],
  odottaaPaatosta: [
    'Värikarttapaletti (näyte toimitettu 15.8.)',
    'Kartta- ja zoomiskaalaus ~49 kaupunkiin',
    'Raamatun luonnososioiden läpikäynti',
    'Kainalon suuntateksti satelliittiin — vai ei',
    'v685: taustan aaltoliike sivunvaihdossa',
    'v692: ylikuumien raitojen vaihto',
    'Balladiääni ja lukunopeus — kuuntelu',
  ],
};

/**
 * Testattavaa juuri nyt. ÄÄRIMMÄISEN MINIMALISTINEN (omistajan
 * linjaus 15.8.2026: "tavuviiva ja muutama sana per kohta
 * korkeintaan — muistan itse kyllä suurimman osan"). Uusin ensin;
 * rivit siivotaan kun ne on katsottu.
 */
export const TESTATTAVAA = [
  'v699 — nähtävyysjutut: Panthéon, Luco, Kallio, Lintsi',
  'v697 — Kehittäjä-valikko: Raamattu- ja Tilannelehti',
  'v695/v696 — esipuskurit; reunuskartat 4 kaupunkia',
  'v694 — ElevenLabs-äänitteet takaisin merkintöihin',
  'v692 — taustaäänet tasattu; v691 Venäjän radio',
  'v683–v687 — lukijan automoodi, otsikkotauot, väistö',
];
