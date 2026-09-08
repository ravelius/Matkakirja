/*
 * SISILIAN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Sisilia oli yksi kuudesta Euroopan kohteesta, joiden merkintä luettiin
 * yhä vanhasta saapumistaulusta (js/packs/europe-saapumiset.js,
 * arkistoitu docs/arkisto/europe-saapumiset-2026-09-08.js.txt).
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice).
 */
export const FOKUSVIRTA_SISILIA = {
  kaupunki: 'sisilia',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Palermo, toukokuussa 1873. Kuumaa; Etna savuaa horisontissa.',
    /* KAANON UUSIKSI (Fable, omistaja katsoo koosteesta 9.9.2026). 378 merkkiä (yläraja 400). */
    teksti: 'Torilla kala myydään laulaen, ja kauppias suuttui, kun en osannut '
      + 'laulaa vastaan. Tähän saareen ovat tulleet kreikkalaiset, '
      + 'roomalaiset, arabit, normannit ja espanjalaiset, ja jokainen on '
      + 'jättänyt jotain lautaselle. Sisilia on ollut kaikkien maa eikä '
      + 'kenenkään. Siksi sen keittiö on paras Välimerellä. Sitruunatarhat '
      + 'kasvavat mustassa laavamullassa, ja vuori savuaa niiden yllä.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /* ÄÄNITE VANHENTUNUT (8.9.2026): generoitava uudelleen tästä. */
    luenta: '[curious] Torilla kala myydään laulaen, ja kauppias suuttui, kun '
      + 'en osannut laulaa vastaan. Tähän saareen ovat tulleet kreikkalaiset, '
      + 'roomalaiset, arabit, normannit ja espanjalaiset, ja jokainen on '
      + 'jättänyt jotain lautaselle. Sisilia on ollut kaikkien maa eikä '
      + 'kenenkään. Siksi sen keittiö on paras Välimerellä. [softly] '
      + 'Sitruunatarhat kasvavat mustassa laavamullassa, ja vuori savuaa '
      + 'niiden yllä.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-sisilia.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    kommentti: [
      'Etna savuaa yhä, ja sen rinteillä asutaan silti. Torilla lauletaan edelleen.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, sisilia/kaupunki/avauskuvat): Monrealen katedraali,
     * jonka rakensivat normannit, arabit ja bysanttilaiset yhdessä —
     * juuri se merkinnän "kaikkien maa eikä kenenkään". Selite ja lähde
     * ovat lehden omat.
     */
    kuva: {
      ampari: 'herokoe/hero-sisilia-ilta.jpg',
      selite: 'Monrealen katedraali rakennettiin 1170-luvulla normannien, '
        + 'arabien ja bysanttilaisten käsityönä; vieressä avautuu '
        + 'ristikäytävän puutarha.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
