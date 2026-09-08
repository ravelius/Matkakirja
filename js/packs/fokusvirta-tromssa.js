/*
 * TROMSSAN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-kreeta.js:ssä:
 * kevyt pakki kantaa vain isoisän merkinnän ja pulun kuplan, koska pelin
 * nykyinen kulku ei lue muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT ===
 * false). Kevyet pakit on nimetty rekisterissä (js/packs/fokusvirrat.js
 * KEVYET_FOKUSVIRRAT).
 *
 * Tromssa oli yksi kuudesta Euroopan kohteesta, joiden merkintä luettiin
 * yhä vanhasta saapumistaulusta (js/packs/europe-saapumiset.js,
 * arkistoitu docs/arkisto/europe-saapumiset-2026-09-08.js.txt). Tämän
 * paketin myötä Euroopan lauta kulkee kokonaan fokusvirtapakkien kautta.
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan. Luenta on sama teksti
 * tunnetagein; yksikään sana ei vaihdu.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice).
 */
export const FOKUSVIRTA_TROMSSA = {
  kaupunki: 'tromssa',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — toinen virke on kortin tunnelmarivi. */
    paikkarivi: 'Tromssa, heinäkuussa 1873. Aurinko ei laske; satamassa '
      + 'hylkeenpyytäjiä.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Nousin laiturille keskellä kirkasta yötä: kello oli yksi, ja '
      + 'aurinko roikkui vuorten yllä kuin joku olisi unohtanut sammuttaa '
      + 'sen. Satamassa purettiin hylkeennahkoja ja jääkarhuntaljoja '
      + 'laivoista, jotka olivat käyneet Huippuvuorilla. Puodissa kuulee '
      + 'norjaa, suomea ja venäjää samassa lauseessa. Tätä sanotaan Pohjolan '
      + 'Pariisiksi. Kysyin miksi, ja kauppias osoitti hattuaan.',
    /* LUENTA = RUUTUTEKSTI SANASTA SANAAN, vain kolme tunnetagia. */
    luenta: '[curious] Nousin laiturille keskellä kirkasta yötä: kello oli '
      + 'yksi, ja aurinko roikkui vuorten yllä kuin joku olisi unohtanut '
      + 'sammuttaa sen. [softly] Satamassa purettiin hylkeennahkoja ja '
      + 'jääkarhuntaljoja laivoista, jotka olivat käyneet Huippuvuorilla. '
      + 'Puodissa kuulee norjaa, suomea ja venäjää samassa lauseessa. '
      + '[warmly] Tätä sanotaan Pohjolan Pariisiksi. Kysyin miksi, ja '
      + 'kauppias osoitti hattuaan.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-tromssa.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa. */
    kommentti: [
      'Aurinko ei laske vieläkään kesällä. Ja lempinimi Pohjolan Pariisi on yhä käytössä.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, tromssa/kaupunki/avauskuvat): napamuseo 1840-luvun
     * tullimakasiineissa — samat makasiinit satamassa, jossa merkinnän
     * hylkeenpyytäjät purkavat lastiaan. Selite ja lähde ovat lehden
     * omat.
     */
    kuva: {
      ampari: 'herokoe/hero-tromssa-ilta.jpg',
      selite: 'Polarmuseet avattiin 18. kesäkuuta 1978 tasan viisikymmentä '
        + 'vuotta Roald Amundsenin viimeisen lennon jälkeen, ja se toimii '
        + '1840-luvun tullimakasiineissa Skansenin lähellä.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
