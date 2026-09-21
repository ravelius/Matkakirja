/*
 * LUXEMBURGIN FOKUSVIRTA — KEVYT PAKKI (Sonnet-sisältösessio 21.9.2026,
 * omistajan päätös 21.9.2026: kolme maata ilman pelikaupunkia — Kypros,
 * Luxemburg, Malta — saavat pelikaupungin; tämä on Luxemburgin osuus).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-bryssel.js:ssä
 * ja muissa KEVYET_FOKUSVIRRAT-pakeissa: kevyt pakki kantaa vain
 * isoisän merkinnän ja pulun kuplan, koska pelin nykyinen kulku ei lue
 * muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT === false). Kevyet pakit on
 * nimetty rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT).
 *
 * MATKAKIRJAN TEKSTI on kirjoitettu js/packs/europe-artikkelit.js
 * 'Luxemburg (kaupunki)' -artikkelin faktojen pohjalta (Bock-kallio 963,
 * Lontoon sopimus 1867, linnoituksen purku kesken vuonna 1873).
 *
 * KUVA: Bockin kasemattien näkymä Commonsista (tiedosto-kenttä, sama
 * kolmiportainen kuvaosoite kuin muualla fokusvirrassa — ks.
 * js/fokusvirta.js kuvanOsoite). Lisenssi tarkistettu Commonsin
 * imageinfo/extmetadata-rajapinnasta 21.9.2026: P. Hughes, CC BY-SA 4.0.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice), samoin kuin muilla kevyillä pakeilla.
 */
export const FOKUSVIRTA_LUXEMBURG = {
  kaupunki: 'luxemburg',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    paikkarivi: 'Luxemburg, kesäkuussa 1873. Kivipölyä ilmassa; kaupunki '
      + 'puree itseään auki kalliostaan.',
    /*
     * Isoisän matkakirja, Sonnet-sisältösessio 21.9.2026 (kaanon-tyylinen
     * luonnos, alle 450 merkkiä). Faktat: Bock-kallio ja Lucilinburhuc
     * 963, Lontoon sopimus 1867, linnoituksen purku kesken (kestää
     * kuusitoista vuotta), suurherttua Vilhelm III asuu Haagissa
     * (EUROPE_ARTIKKELIT.'Luxemburg (kaupunki)').
     */
    teksti: 'Luxemburg, kesäkuussa 1873. Koko kaupunki on yhtä '
      + 'louhostyömaata: kuusi vuotta sitten Lontoon herrat päättivät '
      + 'pöydän ääressä, että tämä kallio, jota kukaan valloittaja ei '
      + 'ole koskaan saanut auki, on purettava kivi kiveltä. Bockin '
      + 'käytävissä kaikuu iskuvasaroita siellä, missä kreivi Siegfried '
      + 'aikoinaan rakensi ensimmäisen linnansa. Suurherttua hallitsee '
      + 'täältä käsin, mutta asuu Haagissa — en ole vielä tavannut '
      + 'ketään, joka olisi nähnyt hänet täällä.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* KUPLAT: Sonnetin kirjoittamat, ei kaanonia — Livian nykypäivän ääni. */
    kommentti: [
      'Se sama kallio on yhä täynnä käytäviä — nykyään niissä käy turisteja lippu kädessä, ei enää vartiomiehiä.',
      'Isoisäsi näki purkutyömaan. Minä näen kansallissymbolin, jota kukaan ei enää halua purkaa mistään hinnasta.',
    ],
    tunne: { tunne: 'hammastys', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Luxembourg City from the Bock Casements.jpg',
      lyhyt: 'Luxemburgin alakaupunki Bockin kasemattien kalliolta nykyään.',
      selite: 'Bock-kallion kasematit ja alakaupungin näkymä nykyään. '
        + 'Käytävät, joita 1873 vielä purettiin, ovat säilyneet '
        + 'nähtävyytenä loppuun asti.',
      lahde: 'P. Hughes, Commons (CC BY-SA 4.0)',
    },
  },
};
