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
    paikkarivi: 'Palermo, toukokuussa 1873. Kuumaa; Etna savuaa horisontissa; '
      + 'puntari korkealla.',
    /* KAANON UUSIKSI v6 (Fable 8.9.2026 ilta: yksi kohtaus, Horation oma kieli; omistaja katsoo koosteesta). 400 merkkiä (yläraja 400). */
    teksti: 'Kysyin torilla kalakauppiaalta, milloin vuori viimeksi '
      + 'purkautui. Hän sanoi boh. Kysyin, onko se vaarallinen. Boh. Kysyin, '
      + 'mitä boh tarkoittaa. Hän levitti kätensä ja lauloi seuraavan hinnan. '
      + 'Tähän saareen ovat tulleet kreikkalaiset, arabit, normannit ja '
      + 'espanjalaiset, ja jokainen on jättänyt jotain lautaselle. Sitruunat '
      + 'kasvavat mustassa laavamullassa, ja vuori savuaa. K3 vuoresta: boh, '
      + 'boh, boh.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    /* ÄÄNITE VANHENTUNUT (8.9.2026): generoitava uudelleen tästä. */
    luenta: '[curious] Kysyin torilla kalakauppiaalta, milloin vuori viimeksi '
      + 'purkautui. Hän sanoi boh. Kysyin, onko se vaarallinen. Boh. Kysyin, '
      + 'mitä boh tarkoittaa. Hän levitti kätensä ja lauloi seuraavan hinnan. '
      + 'Tähän saareen ovat tulleet kreikkalaiset, arabit, normannit ja '
      + 'espanjalaiset, ja jokainen on jättänyt jotain lautaselle. Sitruunat '
      + 'kasvavat mustassa laavamullassa, ja vuori savuaa. [softly] K3 '
      + 'vuoresta: boh, boh, boh.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-sisilia.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    /* KUPLAT UUSIKSI v6 (Fable 8.9.2026 ilta; omistaja katsoo koosteesta). */
    kommentti: [
      'Boh tarkoittaa: kuka tietää, ja miksi kysyt. Etna savuaa yhä, rinteillä asutaan silti. Kalatiskin alla on paras paikka.',
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
