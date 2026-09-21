/*
 * VALLETTAN FOKUSVIRTA — KEVYT PAKKI (Sisältökirjuri-sessio 21.9.2026,
 * omistajan päätös 19.9.2026: Malta saa pelikaupungin Valletta).
 *
 * Sama muoto ja samat perustelut kuin js/packs/fokusvirta-bryssel.js:ssä
 * ja muissa KEVYET_FOKUSVIRRAT-pakeissa: kevyt pakki kantaa vain
 * isoisän merkinnän ja pulun kuplan, koska pelin nykyinen kulku ei lue
 * muuta (js/fokusvirta.js FOKUSVIRTA_KORTIT === false). Kevyet pakit on
 * nimetty rekisterissä (js/packs/fokusvirrat.js KEVYET_FOKUSVIRRAT).
 *
 * MATKAKIRJAN TEKSTI noudattaa docs/tarina.md ja docs/isoisan-raamattu.md
 * kaanonia: isoisän ääni (1873, matkakirja) ja Livia (nykyaika, pöllö) —
 * nuori Fogg ei puhu. Faktapohja EUROPE_ARTIKKELIT.Valletta-artikkelista
 * (en-Wikipedia "Valletta" ja "Great Siege of Malta", luettu 21.9.2026):
 * kalkkikivi, Grand Harbour, ritarikunnan muurit, linnoitusten
 * purkamisehdotukset 1870-luvulla.
 *
 * KUVA: Grand Harbour Ylä-Barrakan puutarhasta nykyään, Commonsista
 * (tiedosto-kenttä, sama kolmiportainen kuvaosoite kuin muualla
 * fokusvirrassa — ks. js/fokusvirta.js kuvanOsoite). Lisenssi
 * tarkistettu Commonsin imageinfo/extmetadata-rajapinnasta 21.9.2026:
 * Trajcinema, CC BY 4.0. Ei tunnistettavia yksityishenkilöitä (satama-
 * ja puutarhamaisema).
 *
 * ÄÄNITETTÄ EI VIELÄ OLE — puuttuva tiedosto on hiljainen (js/luenta.js
 * playDiaryVoice), samoin kuin muilla kevyillä pakeilla.
 */
export const FOKUSVIRTA_VALLETTA = {
  kaupunki: 'valletta',

  /* ---------- 1. Matkakirja (isoisän ääni) ---------- */
  matkakirja: {
    paikkarivi: 'Valletta, Malta, syyskuussa 1873. Kalkkikivi hehkuu '
      + 'iltapäivän auringossa; satamassa laivaston harmaat rungot '
      + 'kylpevät kuumuudessa.',
    teksti: 'Valletta, syyskuussa 1873. Koko kaupunki on veistetty '
      + 'samasta vaaleasta kalkkikivestä, ja iltarusko polttaa muurit '
      + 'melkein kullankeltaisiksi. Grand Harbourissa kyljettäin makaa '
      + 'laivaston harmaita runkoja kuin tikkuja laatikossa. '
      + 'Ritarikunnan paksut muurit ovat yhä pystyssä, vaikka niiden '
      + 'purkamisesta on puhuttu täällä useaan otteeseen — paikallinen '
      + 'upseeri vannoi, ettei kivi anna periksi ennen tuomiopäivää.',
  },

  /* ---------- 2. Livian nykypäivän huomio (+ lehden herokuva) ------ */
  pollo: {
    /* KUPLAT: nykypäivän ääni, ei kaanonia. */
    kommentti: [
      'Nuo muurit ovat yhä pystyssä. Niiden purkamisesta on puhuttu monta kertaa, mutta linnoitus on säilynyt.',
      'Isoisäsi näki laivaston harmaita runkoja satamassa. Nykyään sama satama täyttyy risteilijöistä ja turisteista.',
    ],
    tunne: { tunne: 'utelias', voimakkuus: 0.5 },
    kuva: {
      tiedosto: 'Valletta Grand Harbour from Upper Barrakka Gardens.jpg',
      lyhyt: 'Grand Harbour Ylä-Barrakan puutarhasta nykyään.',
      selite: 'Näkymä Ylä-Barrakan puutarhasta Grand Harbourin yli. '
        + 'Ritarikunnan aikaiset laivastotelakat ja linnoitukset reunustavat '
        + 'satamaa yhä samalla tavalla kuin isoisän aikana.',
      lahde: 'Trajcinema, Commons (CC BY 4.0)',
    },
  },
};
