/*
 * MAASTOKOHTEET — BGR. Maan nostot napautettaviksi.
 *
 * Päätoimittaja 30.9.2026: nostojen kattavuus Euroopassa
 * (docs/raportit/sisaltokirjuri-nostojen-kattavuus-eurooppa-20260930.md).
 * Maalla oli vain fokuslehden kaksi nostoa; tämä erä lisää kohteet,
 * joiden koordinaatit on luettu en-Wikipedian coordinates-tiedosta ja
 * laskettu koneella (tools/johda-maastokohteet.mjs laudat) ja joiden
 * tekstit on kirjoitettu käsin en-Wikipedian artikkeleista omin sanoin.
 * Lähderivi kertoo artikkelin ja osiot. Kuvaton erä: kortti kantaa
 * tekstin ja lähteen, kuva lisätään erikseen (Commons, lisenssi
 * tarkistettuna). Vain maailmankartan rivi (Euroopan erillislauta on
 * poistettu).
 */
export const MAASTOKOHTEET_BGR = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 3 ERÄ C, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'sveshtarin-hauta',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/bgr-nosto-sveshtarin-hauta-b4f7cad9.jpg',
      lyhyt: 'Sveshtarin haudan kivinen sisäänkäynti holvin alla.',
      selite: 'Kalkkikivilohkoista rakennettu sisäänkäynti ja valaistu kammio holvatun suojarakennuksen sisällä.',
      lahde: 'Valokuva: Interact-Bulgaria, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Interact-Bulgaria',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Thomb-Sveshtari.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Sveshtarin traakialaishauta',
    nimio: 'Sveshtari',
    tyyppi: 'historia',
    kysymykset: [
      'Milloin hauta löydettiin?',
      'Mitä keskuskammion seinillä on?',
    ],
    korostukset: ['kariatideiksi|kariatideiksi'],
    nappi: 'Kymmenen kariatidia kivikammion seinillä',
    // 26.7664 E / 43.745 N — en-Wikipedia "Thracian Tomb of Sveshtari"
    laudat: {
      maailmankartta: { x: 6725.5, y: 1653.2 },
    },
    teksti: 'Sveshtarin traakialaishauta sijaitsee Koillis-Bulgariassa Razgradin läänissä, noin '
      + '2,5 kilometriä Sveshtarin kylästä lounaaseen. Arkeologit löysivät ja kaivoivat '
      + 'haudan vuonna 1982, ja se on rakennettu 300-luvun eaa. ensimmäisellä neljänneksellä. '
      + 'Keskuskammion seinillä on kymmenen korkokuvana veistettyä naishahmoa, joita kuvataan '
      + 'väritetyiksi, puoliksi ihmisen ja puoliksi kasvin muotoisiksi kariatideiksi. Haudan '
      + 'uskotaan kuuluneen getalaiskuningas Dromichaetekselle. Kohde on ollut Unescon '
      + 'maailmanperintöluettelossa vuodesta 1985.',
    lahde: 'en-Wikipedia "Thracian Tomb of Sveshtari" (tarkistettu 30.9.2026).',
  },
];
