/*
 * KREETAN FOKUSVIRTA — KEVYT PAKKI (omistaja 8.9.2026).
 *
 * Sisartiedosto js/packs/fokusvirta-riika.js:lle ja -vilna.js:lle, mutta
 * KEVYT: siinä on vain ne kaksi lohkoa, jotka pelin nykyinen kulku
 * lukee — isoisän matkakirjamerkintä ja pulun kupla sen perään.
 * Kortteja ei ole (js/fokusvirta.js FOKUSVIRTA_KORTIT === false), joten
 * täkyjä, oppituntia, kohtaamista eikä lehtitehtäviä ei ole tehty:
 * ne olisivat dataa, jota mikään ei piirrä. Kevyet pakit on nimetty
 * rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT), jottei
 * täydestä pakista voi kadota lohkoja huomaamatta.
 *
 * MIKSI TÄMÄ PAKKI ON OLEMASSA. Omistajan linjaus 8.9.2026 (Raamattu:
 * KOKO EUROOPPA KULKEE FOKUSVIRTAPAKKIEN KAUTTA), sanatarkasti: *"joo
 * kirjoita niille omat ja arkistoi europe-saapumiset tiedosto ja
 * kirjoita sen alkuun EI ENÄÄ KÄYTÖSSÄ tms tai miten vain parhaiten
 * saadaan pelistä pois että ei vahingossa palaa"*. Kreeta oli yksi
 * kuudesta Euroopan kohteesta, joiden merkintä luettiin yhä vanhasta
 * saapumistaulusta (js/packs/europe-saapumiset.js, arkistoitu
 * docs/arkisto/europe-saapumiset-2026-09-08.js.txt). Nyt manner kulkee
 * kokonaan fokusvirtapakkien kautta.
 *
 * KAANON (päätoimittaja-Fable 8.9.2026): paikkarivi, teksti ja pulun
 * kupla ovat SANATARKASTI hänen kirjoittamiaan — niitä ei ole
 * lyhennetty, täydennetty eikä sanajärjestystä muutettu. Luenta on sama
 * teksti tunnetagein; yksikään sana ei vaihdu.
 *
 * TUNNELMARIVI SYNTYY PAIKKARIVISTÄ. Kortin otsikko on paikkarivin
 * ensimmäinen virke ("Kreeta, huhtikuussa 1873") ja tunnelmarivi sen
 * toinen virke (js/ui-apurit.js matkakirjanOtsikko) — kenttiä ei siis
 * ole kahta.
 *
 * ÄÄNITETTÄ EI VIELÄ OLE. `aanite` osoittaa samalla kaavalla kuin
 * muissa paketeissa (assets/audio/puhe-fokus-matkakirja-<id>.mp3), ja
 * tiedosto generoidaan vasta kun omistaja hyväksyy luennan. Puuttuva
 * äänite on hiljainen eikä kaada mitään: js/luenta.js playDiaryVoice
 * kokeilee varareitin kerran ja vaikenee.
 */
export const FOKUSVIRTA_KREETA = {
  kaupunki: 'kreeta',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    /* KAANON (Fable) — paikkarivi sellaisenaan; toinen virke on kortin
       tunnelmarivi. */
    paikkarivi: 'Kreeta, huhtikuussa 1873. Lämmintä; vuorilla vielä lunta.',
    /* KAANON (Fable) — teksti sellaisenaan, sanaakaan muuttamatta. */
    teksti: 'Hanian satamassa venetsialainen majakka vartioi turkkilaista '
      + 'kaupunkia, ja kummankin liput ovat haalistuneet samaan väriin. '
      + 'Ratsastin sisämaahan kukkulalle, jonka alla sanotaan olevan vanhan '
      + 'kuninkaan palatsi. Sanotaan, että täällä asui hirviö labyrintissa. '
      + 'Minä näin vain palatsin, jossa on liikaa käytäviä — sen verran kuin '
      + 'kiviä maasta pilkotti. Paimen sanoi, että koko kukkula on onttoa. '
      + 'Uskon häntä enemmän kuin tarua.',
    /*
     * LUENTA = RUUTUTEKSTI SANASTA SANAAN (docs/moduulit/tarinakaari.md,
     * luku 7). Vain tunnetagit on lisätty: kolme tagia, sama maltillinen
     * tyyli kuin muissa paketeissa. Yksikään sana, välimerkki tai
     * sanajärjestys ei muutu.
     */
    luenta: '[curious] Hanian satamassa venetsialainen majakka vartioi '
      + 'turkkilaista kaupunkia, ja kummankin liput ovat haalistuneet samaan '
      + 'väriin. Ratsastin sisämaahan kukkulalle, jonka alla sanotaan olevan '
      + 'vanhan kuninkaan palatsi. [whispers] Sanotaan, että täällä asui '
      + 'hirviö labyrintissa. Minä näin vain palatsin, jossa on liikaa '
      + 'käytäviä — sen verran kuin kiviä maasta pilkotti. [softly] Paimen '
      + 'sanoi, että koko kukkula on onttoa. Uskon häntä enemmän kuin tarua.',
    aanite: 'assets/audio/puhe-fokus-matkakirja-kreeta.mp3',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /*
     * KAUPUNGIN KULKU: LUENTA — PULU (Raamattu, omistaja 7.9.2026 ja sen
     * kavennus 8.9.2026: *"ota kaikki pulun alustukset pois."*).
     *
     * Yksi kupla luennan jälkeen, ei alustusta eikä välihuutoa —
     * välihuudahdus jäi 8.9.2026 vain noin puoleen kaupungeista. Kupla
     * on Fablen kaanonteksti sellaisenaan: se on puheen mittainen (alle
     * 95 merkkiä), joten sitä ei jaeta kahdeksi.
     */
    kommentti: [
      'Se palatsi kaivettiin esiin isoisän jälkeen. Ja vuorilla on yhä lunta keväällä.',
    ],
    /*
     * HERO on kaupunkilehden oma avauskuva (js/packs/kulttuuri-
     * kategoriat.js, kreeta/kaupunki/avauskuvat): venetsialainen
     * satamalinnoitus Heraklionissa — juuri se venetsialainen vartio
     * turkkilaisen kaupungin edessä, josta merkintä puhuu. Selite ja
     * lähde ovat lehden omat, eikä uutta kuvaa ole haettu mistään.
     */
    kuva: {
      ampari: 'herokoe/hero-kreeta-keskipaiva.jpg',
      selite: 'Koulesin linnoitus valmistui Heraklionin satamansuulle 1540 '
        + 'venetsialaisten Rocca a Marena, ja sen muurissa on yhä Pyhän '
        + 'Markuksen leijona.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
};
