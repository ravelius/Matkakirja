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
     * LUONNOS, Fable kirjoittaa kaanonin (≤450 merkkiä). Tilapäisteksti,
     * jotta fokusvirtapakki ja saapumisteksti-testi
     * (tests/vanha-maailma.test.mjs) läpäisevät ennen sitä. Perustuu
     * artikkelin (EUROPE_ARTIKKELIT.Košice) faktoihin: Kassa Unkarin
     * kuningaskunnassa, Pyhän Elisabetin tuomiokirkko, Hlavná-katu,
     * vanhojen muurien purku 1856 mennessä, rautatie Miskolciin 1860.
     * Päivämäärä ja reitin järjestys on jätetty auki (paikkarivissä vain
     * vuosi).
     */
    teksti: 'Kassa, 1873. Unkarilaiset sanovat kaupunkia Kassaksi, saksalaiset '
      + 'Kaschauksi. Leveän pääkadun keskellä kohoaa tuomiokirkko, joka on '
      + 'ollut vuosisatoja Unkarin kuningaskunnan suurin, ja vanhojen '
      + 'kaupunginmuurien paikalle on jäänyt vain yksi bastioni. Juna '
      + 'Miskolcista toi minut perille ennen iltaa; isoisäni olisi '
      + 'kulkenut tämän matkan viikon.',
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
};
