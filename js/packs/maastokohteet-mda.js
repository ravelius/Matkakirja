/*
 * MAASTOKOHTEET — MDA. Maan nostot napautettaviksi.
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
export const MAASTOKOHTEET_MDA = [
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT ERÄ 1, 30.9.2026 — 1 KOHDETTA.
   * ============================================================== */
  {
    id: 'sorokan-linnoitus',
    nimi: 'Sorokan linnoitus',
    nimio: 'Soroca',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka rakennutti linnoituksen ensimmäisen, puisen version?',
      'Kuinka monta bastionia kivilinnoituksessa on?',
    ],
    korostukset: ['viisi bastionia|viisi bastionia'],
    nappi: 'Pyöreä linna Dnestrin rannalla',
    // 28.3055 E / 48.1612 N — en-Wikipedia "Soroca Fort", osiot "History" ja "Architecture"
    laudat: {
      maailmankartta: { x: 6776.8, y: 1469.4 },
    },
    teksti: 'Sorokan linnoitus on Moldovan Dnestr-joen rannalla sijaitseva pyöreä linnake, jonka '
      + 'alkuperäisen puisen varustuksen Tapani Suuri rakennutti vuonna 1499 suojaamaan joen '
      + 'kahlaamoa. Kivilinnoituksen Petru Rareș rakennutti vuosina 1543–1546, ja siinä on '
      + 'viisi bastionia tasaisin välein. Halkaisijaltaan linnoitus on noin 30 metriä, muurit '
      + 'ovat kolme metriä paksut ja tornit nelikerroksisia, joista alimmat kerrokset oli '
      + 'tarkoitettu tykeille. Restaurointi on valmis, ja linnoitus on Moldovan kansallisesti '
      + 'merkittävä historiallinen ja arkkitehtoninen muistomerkki.',
    lahde: 'en-Wikipedia "Soroca Fort", osiot "History" ja "Architecture" (tarkistettu '
      + '30.9.2026).',
  },
];
