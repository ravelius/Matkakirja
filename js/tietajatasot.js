/*
 * TIETÄJÄTASOT — matkan arvonimet tietäjäpisteillä.
 *
 * Pelaajalle näkyvä nimi pisteille on TIETÄJÄPISTE (lyhenne "tp");
 * koodin sisällä ne ovat yhä xp (player.xp, awardXp, XP_*), koska nimi
 * on käyttöliittymän asia eikä pelilogiikan. Nimenmuutos 18.8.2026.
 *
 * Kymmenen tasoa, kymmenen nimikettä. Nousu ei anna mitään muuta kuin
 * uuden nimikkeen — ei rahaa, ei laattaa, ei linssiä. Se on
 * tarkoituksellista: linsseillä on jo oma kokemuspistereittinsä
 * (js/linssit/omistus.js), eikä tason pidä kilpailla sen kanssa.
 * Nimike on matkan mitta, ei palkinto.
 *
 * PORTTI ON YKSI: js/game.js awardXp. Sama malli kuin
 * linssikynnyksellä — jokainen piste kulkee sen läpi, joten yksi
 * tarkistus riittää eikä yksikään pistelähde voi unohtaa nousua.
 *
 * Onnittelun sanoo PÖLLÖ minipuhekuplalla (js/ui.js playEvents ->
 * naytaTietajaNousut). Kupla tulee VASTA tapahtumakuplien jälkeen,
 * jottei se osu päällekkäin samasta pisteiden lisäyksestä syntyneen
 * linssilöydön kuplan kanssa.
 *
 * OMA MODUULI: taulukko on sisältöä (päätoimittajan päätös
 * 18.8.2026), ja sekä js/game.js (nousun tunnistus) että js/ui.js
 * (matkalaukun nimikerivi) lukevat sitä. Ei riippuvuuksia — moduuli on
 * pelkkää dataa ja kolme funktiota, joten se voi olla niputuslistalla
 * ennen kumpaakin lukijaansa.
 */

/**
 * Tasot rajoineen. Rajat ovat nousevassa järjestyksessä, ja
 * ensimmäisen raja on 0: pelaaja on Untuvikko heti ensimmäisestä
 * pisteestään — itse asiassa jo ennen sitä.
 *
 * Onnittelu on matkapäiväkirjan ääntä: juhlava mutta lyhyt, ja se
 * puhuu isoisästä tai Aarnista. Kohderyhmä on 13 vuotta täyttäneet ja
 * aikuiset, joten sävy on kunnioittava eikä lapsekas.
 */
export const TIETAJATASOT = [
  {
    taso: 1,
    nimi: 'Untuvikko',
    raja: 0,
    onnittelu: 'Matka alkaa, Untuvikko! Isoisä kirjoitti ensimmäiselle sivulleen, '
      + 'että jokainen maailmanmatka alkaa yhdestä ainoasta askeleesta.',
  },
  {
    taso: 2,
    nimi: 'Utelias kulkija',
    raja: 40,
    onnittelu: 'Sinusta on tullut Utelias kulkija! Kysymykset ovat matkan paras '
      + 'eväs — isoisäsi täytti niillä kokonaisen vihkon ennen lähtöä.',
  },
  {
    taso: 3,
    nimi: 'Kartanlukija',
    raja: 100,
    onnittelu: 'Sinusta on tullut Kartanlukija! Isoisäsi hymyilisi — kartta '
      + 'aukeaa sille, joka on oppinut katsomaan.',
  },
  {
    taso: 4,
    nimi: 'Maailmanmatkaaja',
    raja: 200,
    onnittelu: 'Sinusta on tullut Maailmanmatkaaja! Sen nimen isoisäsi kirjoitti '
      + 'passiinsa ammatiksi — nyt se on sinunkin.',
  },
  {
    taso: 5,
    nimi: 'Löytöretkeilijä',
    raja: 350,
    onnittelu: 'Sinusta on tullut Löytöretkeilijä! Aarni olisi kohottanut '
      + 'hattuaan: löytäminen alkaa siitä, että uskaltaa lähteä.',
  },
  {
    taso: 6,
    nimi: 'Tarinankerääjä',
    raja: 550,
    onnittelu: 'Sinusta on tullut Tarinankerääjä! Isoisä sanoi, että matkalta '
      + 'tuodaan kotiin vain kahta lajia tavaraa: pölyä saappaissa ja tarinoita.',
  },
  {
    taso: 7,
    nimi: 'Aarteentuntija',
    raja: 800,
    onnittelu: 'Sinusta on tullut Aarteentuntija! Nyt erotat kiillosta sen, mikä '
      + 'on oikeasti unohdettua — juuri sitä Aarnin luettelo vaatii.',
  },
  {
    taso: 8,
    nimi: 'Maailmantuntija',
    raja: 1200,
    onnittelu: 'Sinusta on tullut Maailmantuntija! Maailma ei ole enää nimiä '
      + 'kartalla vaan paikkoja, joissa olet ollut.',
  },
  {
    taso: 9,
    nimi: 'Isoisän perillinen',
    raja: 1700,
    onnittelu: 'Sinusta on tullut Isoisän perillinen! Vuoden 1873 matkapäiväkirja '
      + 'on nyt yhtä paljon sinun kuin hänen.',
  },
  {
    taso: 10,
    nimi: 'Suurtietäjä',
    raja: 2400,
    onnittelu: 'Sinusta on tullut Suurtietäjä! Aarni, isoisäsi ja sinä — kolme '
      + 'nimeä samassa luettelossa. Kauemmas tämä matka ei vie.',
  },
];

/** Pisteiden näyttömuoto: "145 tp". Yksi paikka, jottei lyhenne pääse eroon. */
export const TIETAJAPISTE_LYHENNE = 'tp';

/**
 * Pelaajan nykyinen taso pisteillä. Palauttaa aina tason — myös
 * nollalla ja negatiivisella (Untuvikko), koska nimikkeetön pelaaja
 * olisi laukussa tyhjä rivi.
 */
export function tietajataso(pisteet) {
  const luku = Number.isFinite(pisteet) ? pisteet : 0;
  let osuma = TIETAJATASOT[0];
  for (const taso of TIETAJATASOT) {
    if (luku >= taso.raja) osuma = taso;
    else break;
  }
  return osuma;
}

/** Seuraava taso, tai null jos ylin on jo saavutettu. */
export function seuraavaTietajataso(pisteet) {
  const luku = Number.isFinite(pisteet) ? pisteet : 0;
  return TIETAJATASOT.find((taso) => luku < taso.raja) ?? null;
}

/**
 * Tasot, jotka ylitettiin kun pisteet nousivat ennen -> jalkeen.
 *
 * Lista eikä yksi taso: yksi pisteiden lisäys voi ylittää kaksikin
 * rajaa (unohdettu aarre 100 + ennätysbonus 200 = 300 kerralla), ja
 * jokainen nousu ansaitsee oman onnittelunsa.
 */
export function tietajatasonNousut(ennen, jalkeen) {
  const alku = Number.isFinite(ennen) ? ennen : 0;
  const loppu = Number.isFinite(jalkeen) ? jalkeen : 0;
  if (loppu <= alku) return [];
  // Ensimmäinen taso (raja 0) ei ole nousu vaan lähtötilanne.
  return TIETAJATASOT.filter((taso) => taso.raja > 0 && taso.raja > alku && taso.raja <= loppu);
}
