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
 * AVATARIT: jokaisella tasolla on pöllömuotokuva nimellä
 * `assets/tietaja/taso-NN.jpg`, jossa NN on tämän taulukon `taso`
 * kaksinumeroisena. Polku JOHDETAAN tasonumerosta (tietajaAvatar), eikä
 * taulukossa ole kuvakenttää: yksi luku ei voi mennä eri tahtiin
 * tiedostonimen kanssa. Kuvat näkyvät kolmessa paikassa — matkalaukun
 * tietäjärivin pyöreä kuvake, tasonnousun onnittelukupla ja tasogallerian
 * ruudukko (js/tietajagalleria.js). Sama tyylikääre myös Viisaan Pöllön
 * omassa muotokuvassa (assets/tietaja/viisas-pollo.jpg), jonka
 * aarteenpaljastus näyttää (js/pollo.js POLLO_AARRE.kuva) — mutta eri
 * laji: emo on suuri huuhkaja, tasoavatarit lehtopöllöjä.
 *
 * VÄRSSYT: jokaisella tasolla on kalevalamittainen kaksisäkeinen värssy
 * (päätoimittajan kaanonteksti, omistaja hyväksyi 18.8.2026). Säkeet
 * erottaa kauttaviiva, ja näyttäjä jakaa ne kahdelle riville
 * (varssynSakeet). Teksti on runoa eikä ohjetta: sitä ei muuteta ilman
 * päätoimittajaa.
 *
 * OMA MODUULI: taulukko on sisältöä (päätoimittajan päätös
 * 18.8.2026), ja sekä js/game.js (nousun tunnistus) että js/ui.js
 * (matkalaukun nimikerivi) lukevat sitä. Ei riippuvuuksia — moduuli on
 * pelkkää dataa ja muutama pieni funktio, joten se voi olla
 * niputuslistalla ennen kaikkia lukijoitaan.
 */

/**
 * Tasot rajoineen. Rajat ovat nousevassa järjestyksessä, ja
 * ensimmäisen raja on 0: pelaaja on Untuvikko heti ensimmäisestä
 * pisteestään — itse asiassa jo ennen sitä.
 *
 * MITOITUS (omistaja 18.8.2026: "aivan liian helpot" — alkuperäiset
 * rajat 40…2400 ylittyivät tasoa/päivä). Aktiivinen pelipäivä tuottaa
 * noin 150–250 tp, ja nimikkeen on tarkoitus olla matkan mitta:
 * ensimmäinen nousu tulee vielä ensimmäisenä päivänä, mutta ylin
 * taso vaatii kymmeniä pelipäiviä. Rajaväli kasvaa joka tasolla
 * (150 → 2000), jotta loppupää tuntuu ansaitulta. Vanhat
 * tallennukset kestävät korotuksen: taso lasketaan aina pisteistä,
 * joten nimike voi pudota — pisteet eivät.
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
    varssy: 'Pieni on pesästä lähtö, / suuri siitä tie alkavi.',
    onnittelu: 'Matka alkaa, Untuvikko! Isoisä kirjoitti ensimmäiselle sivulleen, '
      + 'että jokainen maailmanmatka alkaa yhdestä ainoasta askeleesta.',
  },
  {
    taso: 2,
    nimi: 'Utelias kulkija',
    raja: 150,
    varssy: 'Kysyvä ei tiellä eksy, / utelias uran löytää.',
    onnittelu: 'Sinusta on tullut Utelias kulkija! Kysymykset ovat matkan paras '
      + 'eväs — isoisäsi täytti niillä kokonaisen vihkon ennen lähtöä.',
  },
  {
    taso: 3,
    nimi: 'Kartanlukija',
    raja: 400,
    varssy: 'Monta on polkua maalla, / kartta kaikki kertoelee.',
    onnittelu: 'Sinusta on tullut Kartanlukija! Isoisäsi hymyilisi — kartta '
      + 'aukeaa sille, joka on oppinut katsomaan.',
  },
  {
    taso: 4,
    nimi: 'Maailmanmatkaaja',
    raja: 800,
    varssy: 'Matka kulkijansa mittaa, / maailma sylin avavi.',
    onnittelu: 'Sinusta on tullut Maailmanmatkaaja! Sen nimen isoisäsi kirjoitti '
      + 'passiinsa ammatiksi — nyt se on sinunkin.',
  },
  {
    taso: 5,
    nimi: 'Löytöretkeilijä',
    raja: 1400,
    varssy: 'Rohkea rajoille astuu, / löytäjälle maat aukeevat.',
    onnittelu: 'Sinusta on tullut Löytöretkeilijä! Aarni olisi kohottanut '
      + 'hattuaan: löytäminen alkaa siitä, että uskaltaa lähteä.',
  },
  {
    taso: 6,
    nimi: 'Tarinankerääjä',
    raja: 2200,
    varssy: 'Sanat saappaissa kulkevat, / tarinat tulevat kotiin.',
    onnittelu: 'Sinusta on tullut Tarinankerääjä! Isoisä sanoi, että matkalta '
      + 'tuodaan kotiin vain kahta lajia tavaraa: pölyä saappaissa ja tarinoita.',
  },
  {
    taso: 7,
    nimi: 'Aarteentuntija',
    raja: 3200,
    varssy: 'Kiilto ei kultaa todista, / tuntija todeksi tietää.',
    onnittelu: 'Sinusta on tullut Aarteentuntija! Nyt erotat kiillosta sen, mikä '
      + 'on oikeasti unohdettua — juuri sitä Aarnin luettelo vaatii.',
  },
  {
    taso: 8,
    nimi: 'Maailmantuntija',
    raja: 4500,
    varssy: 'Nimet muuttuvat paikoiksi, / paikat muistoiksi muuttuvat.',
    onnittelu: 'Sinusta on tullut Maailmantuntija! Maailma ei ole enää nimiä '
      + 'kartalla vaan paikkoja, joissa olet ollut.',
  },
  {
    taso: 9,
    nimi: 'Isoisän perillinen',
    raja: 6000,
    varssy: 'Kirja kädestä käteen käy, / tieto suvussa syvenee.',
    onnittelu: 'Sinusta on tullut Isoisän perillinen! Vuoden 1873 matkapäiväkirja '
      + 'on nyt yhtä paljon sinun kuin hänen.',
  },
  {
    taso: 10,
    /*
     * TIETÄJÄ IÄNIKUINEN (päätoimittajan kaanonteksti, omistaja
     * hyväksyi 18.8.2026). Entinen "Suurtietäjä" oli oma keksintömme;
     * tämä on Kalevalan oma sanapari ja istuu kalevalaiseen kehykseen,
     * jossa Viisas Pöllö on tietäjien matkakumppani.
     */
    nimi: 'Tietäjä iänikuinen',
    raja: 8000,
    varssy: 'Sanat saatu, synnyt tietty, / tie vie tietäjän kotihin.',
    onnittelu: 'Sinusta on tullut Tietäjä iänikuinen! Aarni, isoisäsi ja sinä — kolme '
      + 'nimeä samassa luettelossa. Kauemmas tämä matka ei vie.',
  },
];

/** Pisteiden näyttömuoto: "145 tp". Yksi paikka, jottei lyhenne pääse eroon. */
export const TIETAJAPISTE_LYHENNE = 'tp';

/**
 * Tason avatarin polku. Johdetaan tasonumerosta, jotta kuvatiedosto ja
 * taulukko eivät voi mennä eri tahtiin. Polku on repon juuresta, koska
 * peli tarjoillaan aina juuresta (index.html, sw.js SHELL).
 */
export function tietajaAvatar(taso) {
  const numero = Number.isFinite(taso?.taso) ? taso.taso : Number(taso) || 1;
  return `assets/tietaja/taso-${String(numero).padStart(2, '0')}.jpg`;
}

/**
 * Värssyn kaksi säettä erillisinä riveinä. Kaanonteksti on yhtenä
 * merkkijonona kauttaviivalla erotettuna (helpompi lukea ja tarkistaa
 * yhdeltä riviltä), mutta näytöllä se on aina kaksi riviä — juuri se
 * tekee siitä värssyn eikä lauseen.
 */
export function varssynSakeet(varssy) {
  return String(varssy ?? '').split('/').map((s) => s.trim()).filter(Boolean);
}

/**
 * Kuinka pitkällä nykyisen tason sisällä ollaan, 0…1.
 *
 * Palkki täyttyy NYKYISEN tason alusta seuraavan tason rajaan ja
 * nollautuu noustessa, eli se mittaa matkaa seuraavaan nimikkeeseen —
 * ei koko matkaa ylimmälle tasolle. Ylimmällä tasolla ei ole seuraavaa
 * rajaa, joten osuus on täysi 1 ja näyttäjä piilottaa palkin.
 */
export function tietajatasonOsuus(pisteet) {
  const luku = Number.isFinite(pisteet) ? pisteet : 0;
  const nyt = tietajataso(luku);
  const seuraava = seuraavaTietajataso(luku);
  if (!seuraava) return 1;
  const matka = seuraava.raja - nyt.raja;
  if (matka <= 0) return 1;
  return Math.min(1, Math.max(0, (luku - nyt.raja) / matka));
}

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
