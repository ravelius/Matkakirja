/*
 * OMAT KOHTEET (omistaja 7.10.2026 08.4x: "tehdään Egypti kokeeksi loppuun omilla Blender-malleilla"; LS1/Päätoimittaja):
 * kohde, jolla on pelin omat 3D-mallit (Linnanrakentaja) eikä Googlen 3D:tä. Kohdelista, kierroksen järjestys ja
 * esigeneroitu kerronta (Opus-kirjoittaja + -tarkistaja, tools/opas/tarkista-esittely.mjs) ovat tässä koodissa; worker
 * tarjoaa ne kuten lukitun kaupungin listan ja valmiin esittelyn (valmis: true).
 *   kohde = { id (Q), nimi, lat, lon, koko_m, korkeus_m?, luokka, kuvaus, teksti, lyhyt, syventava, puhe_teksti?, puhe_lyhyt? }
 */
export const OPAS_OMAT = Object.freeze({
  giza: {
    nimi: 'Gizan pyramidit',
    kokeilu: true,   // vain otsakkeella x-matkakirja-kokeilu: giza (Päätoimittaja 7.10. 08.5x)
    // LS1: Sfinksi → Khefren → Mykerinos → Kheops.
    kierros: ['Q130958', 'Q208358', 'Q238623', 'Q37200'],
    // Kerronta (teksti, lyhyt, syventava) lisätään Opus-kirjoittajan ja -tarkistajan jälkeen; ilman sitä live-malli kertoo.
    kohteet: [
      { id: 'Q130958', nimi: 'Gizan suuri sfinksi', lat: 29.97528, lon: 31.13778, koko_m: 80, korkeus_m: 20, luokka: 'muu', kuvaus: 'Kalkkikiveen veistetty sfinksi' },
      { id: 'Q208358', nimi: 'Khefrenin pyramidi', lat: 29.97611, lon: 31.13083, koko_m: 215, korkeus_m: 136, luokka: 'muu', kuvaus: 'Gizan toiseksi suurin pyramidi' },
      { id: 'Q238623', nimi: 'Mykerinoksen pyramidi', lat: 29.9725, lon: 31.12833, koko_m: 105, korkeus_m: 61, luokka: 'muu', kuvaus: 'Gizan pienin pääpyramidi' },
      { id: 'Q37200', nimi: 'Kheopsin pyramidi', lat: 29.97917, lon: 31.13417, koko_m: 230, korkeus_m: 139, luokka: 'muu', kuvaus: 'Gizan suuri pyramidi' },
    ],
  },
});
