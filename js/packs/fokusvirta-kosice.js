/*
 * KOŠICEN FOKUSVIRTA — KEVYT PAKKI (Sonnet-sisältösessio 20.9.2026,
 * omistajan päätös 19.9.2026: Slovakia saa pelikaupungin Košice, koska
 * Bratislava ei mahtunut lautaan).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-bryssel.js:ssä
 * ja js/packs/fokusvirta-ljubljana.js:ssä: kevyt pakki kantaa vain
 * isoisän merkinnän ja pulun kuplan, koska pelin nykyinen kulku ei lue
 * muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT === false). Kevyet pakit on
 * nimetty rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT).
 *
 * MATKAKIRJAN TEKSTI ON LUONNOS — Fable kirjoittaa kaanonin
 * (isoisän matkakirjan sävy, päivämäärä ja reitti). Livian kupla on
 * Sonnetin kirjoittama, koska se on nykypäivän ääni eikä kaanonia.
 *
 * KUVA: Pyhän Elisabetin tuomiokirkon sisätila Commonsista
 * (tiedosto-kenttä, sama kolmiportainen kuvaosoite kuin muualla
 * fokusvirrassa — ks. js/fokusvirta.js kuvanOsoite). Lisenssi
 * tarkistettu Commonsin imageinfo/extmetadata-rajapinnasta 20.9.2026:
 * Maros M r a z, CC BY-SA 3.0.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice), samoin kuin muilla kevyillä pakeilla.
 */
export const FOKUSVIRTA_KOSICE = {
  kaupunki: 'kosice',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    paikkarivi: 'Kassa (Košice), 1873. Tuomiokirkon torni kohoaa '
      + 'kaupungin yllä.',
    /*
     * Fablen kaanon 20.9.2026 klo 00.55 (424 merkkiä; korvasi Sonnet 3:n
     * LUONNOKSEN). Lokakuu 1873, tulo Krakovasta Kassa-Oderberg-radan
     * kautta; tuomiokirkko, Immaculata-ruttopylväs, tokaji, kolme kieltä.
     */
    teksti: 'Kassa (Košice), lokakuussa 1873. Juna toi minut Krakovasta vuorten '
      + 'läpi, ja Karpaatit jäivät taakse kuin kynnys. Pyhän Elisabetin '
      + 'tuomiokirkko on niin suuri, että kaupunki tuntuu rakennetun sen '
      + 'ympärille; kivi on kulunut, mutta tornit seisovat. Pääkatu on leveä '
      + 'kuin tori, ja sen keskellä kultainen Immaculata muistuttaa rutosta, '
      + 'jonka kaupunki selätti. Kapakassa juodaan tokajia ja puhutaan kolmea '
      + 'kieltä samassa lauseessa.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* KUPLAT: Sonnetin kirjoittamat, ei kaanonia — Livian nykypäivän ääni. */
    kommentti: [
      'Tuo tuomiokirkko on yhä Slovakian suurin kirkko. Isoisäsi aikana se kuului Unkarin kuningaskuntaan, ja kaupunki oli Kassa.',
      'Košice on nykyään Slovakian toiseksi suurin kaupunki, ja Hlavná-kadun kiviä kuljetaan yhä samaa linssinmuotoista rengasta.',
    ],
    tunne: { tunne: 'utelias', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Kosice - St. Elisabeth Cathedral inside.JPG',
      lyhyt: 'Pyhän Elisabetin tuomiokirkon sisätila Košicessa.',
      selite: 'Goottilaisen tuomiokirkon holvit, lasimaalausikkunat ja '
        + 'kultainen pääalttari. Kirkon rakentaminen alkoi 1300-luvun '
        + 'lopulla, ja se oli aikanaan Unkarin kuningaskunnan suurin.',
      lahde: 'Maros M r a z, Commons (CC BY-SA 3.0)',
    },
  },

  /*
   * ---------- KEVYT KULKU ----------
   * Samat kaksi kenttää kuin täysissä pakeissa (esim. fokusvirta-
   * tampere.js, fokusvirta-riika.js). Fable vahvisti 22.9.2026, ettei
   * kevyt pakki estä kohtaamisen kirjoittamista: vihreä piste avaa
   * kohtaamisen suoraan laattakysymyksenä (js/fokusvirta.js
   * avaaFokusKohtaaminen), joten hahmo/teksti alla ovat varalla
   * mahdollista raskaan virran korttia varten (FOKUSVIRTA_KORTIT),
   * eikä vihjeOsiota ole — Košicella ei ole kaupunkilehden osioita
   * (kevyt pakki). Kohtaamiskortin todellinen sisältö (js/packs/
   * kohtaamiset.js, avain 'kosice') on lennätinvirkailija Zuzana.
   */
  kohtaaminen: {
    hahmo: 'Lennätinvirkailija Zuzana',
    nappi: 'Tapaa lennätinvirkailija',
    varmistus: 'Haluatko varmasti tavata Zuzanan juuri nyt?',
    teksti: 'Zuzana istuu asemarakennuksen pienessä lennätinhuoneessa, '
      + 'sormi valmiina avaimella. Rata pohjoiseen Krakovan suuntaan '
      + 'valmistui vasta viime vuonna — ennen sitä Kassaan ei tullut '
      + 'yhtään junaa, ja kaikki viestit kulkivat hitaammin. Nyt hän '
      + 'näpäyttää sanoman minuutissa sinne, minne ennen kului päiviä. '
      + 'Hän katsoo saapuvaa junaa ikkunasta ja haluaa tietää, tunteeko '
      + 'tulija maailman muutenkin kuin junan aikataulusta.',
  },

  /*
   * KOHTAAMISPAIKKA: KOŠICEN RAUTATIEASEMA (Zuzanan lennätinhuone).
   * Koordinaatit ovat kaupungin oma laattapaikka (sama perusteltu
   * poikkeus kuin Tallinnassa/Riiassa): js/packs/europe.js 619/612,
   * js/packs/maailmankartta.js 6542/1445.6.
   */
  kohtaamispiste: {
    nimi: 'Rautatieasema',
    laudat: {
      maailmankartta: { x: 6542, y: 1445.6 },
      europe: { x: 619, y: 612 },
    },
  },
};
