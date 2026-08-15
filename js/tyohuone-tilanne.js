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
  paivitetty: '15.8.2026 — v679–v704',
  tavoite: 'Kuvatekstiurakka valmis (569 → 0). Siperia valmis (8 '
    + 'kaupunkia). Reunuskartat + satelliitit 4 kaupungilla. Lukijan '
    + 'automoodi, otsikkotauot, väistö. Äänet tasattu. Esipuskurit. '
    + 'Raamattu (tiivis + tagit) ja Tilannelehti pelissä. Pöllön '
    + 'vastauskuvat. Matkakirjatekstit odottavat Raamatun läpikäyntiä.',
  rivit: [
    {
      tekija: 'Fable',
      rooli: 'päätoimittaja',
      tila: 'tyossa',
      tehtava: 'Koordinointi, merget pistokokein, omat lukija- ja '
        + 'äänityöt. Työsessiot vain perustamisprompteilla.',
      seuraavaksi: 'Värikartat muihin karttakaupunkeihin + '
        + 'miniatyyripilotti (paletti hyväksytty 15.8.).',
    },
  ],
  odottaaPaatosta: [
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
  'v718 — piirrokset pienempinä, nuolet pois',
  'v717 — piirrokset yksivärisinä luonnoksina',
  'v716 — lippuikkuna: 2/3-korkeus, symboliikka, vaakunat',
  'v715 — piirrokset hajallaan + nuolet; klikkaus: kyltti → juttu',
  'v714 — kartan piirrokset leikattuina, numerot pois',
  'v713 — pöllön kuvalle paikanpitäjä + animaatio',
  'v712 — pöllön kuva löytyy myös hakusanalla',
  'v711 — lipusta lipun tarina (Saksa, Suomi)',
  'v710 — piirrokset pisteinä + kortit 4 kaupungissa',
  'v709 — värikartat: Helsinki, Pariisi, Lontoo',
  'v708 — Berliinin pisteet: piirroskortti + juttuun',
  'v707 — Berliinin värikartta (vipu kartalla)',
  'v706 — Raamatun taitto: kappaleet, ei palstoja',
  'v704 — radio hiljenee pöllön/lukijan puhuessa',
  'v703 — pöllön vastauskuva; klikkaus isoksi',
  'v702 — oletusprompti näkyvissä; vuosiluvut ei lueta',
  'v701 — Raamattu tiiviinä + valmis/kesken-tagit',
  'v699 — nähtävyysjutut: Panthéon, Luco, Kallio, Lintsi',
  'v697 — Kehittäjä-valikko: Raamattu- ja Tilannelehti',
  'v695/v696 — esipuskurit; reunuskartat 4 kaupunkia',
  'v694 — ElevenLabs-äänitteet takaisin merkintöihin',
  'v692 — taustaäänet tasattu; v691 Venäjän radio',
  'v683–v687 — lukijan automoodi, otsikkotauot, väistö',
];
