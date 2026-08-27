/*
 * FOKUSKOHTEET — RANSKA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-irq.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Ranskassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden EUROOPAN ERÄ (27.8.2026) toi peliin kolme
 * kadonnutta eurooppalaista, ja yksi niistä on Tuileries'n palatsi.
 * Ranskalla ei ollut vielä yhtään fokuskohdetta, joten palatsi olisi
 * jäänyt kokonaan pois — mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.FRA, tiedosto FRA.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto, sama kuin Egyptillä ja Irakilla edellisessä erässä.
 * Tiedosto on siis tarkoituksella yhden kohteen mittainen ja odottaa
 * ensimmäistä varsinaista Ranska-erää.
 *
 * ── MIKSI OMA KOHDEPISTE EIKÄ IHME LOUVREN KYLKEEN ─────────────────
 *
 * Raamatun sääntö on, että KOKONAAN KADONNUT kohde saa kartalle oman
 * tähtimerkkinsä ja sen kortin kuva aukeaa suoraan ihmekuvaan. Louvre
 * on olemassa, Tuileries ei ole. Jos ihme ripustettaisiin Louvreen,
 * kartalla ei olisi tähteä lainkaan ja "Koe ihme" lupaisi Louvren
 * loistoaikaa mutta näyttäisi toisen rakennuksen. Sitä paitsi
 * Louvre-kohdetta ei ole olemassa: Ranskan lista alkaa tästä
 * tiedostosta. Palatsi saa siis oman pisteensä omalla paikallaan,
 * Louvren pihan länsipäässä, missä se seisoi.
 *
 * ── KOORDINAATIT: MOLEMMAT LAUDAT ──────────────────────────────────
 *
 * Toisin kuin Egyptillä ja Irakilla, Pariisi on Euroopan laudan kaavan
 * sisällä (kaava kattaa −11°…41°, js/packs/europe.js), joten rivillä
 * on molemmat laudat samaan tapaan kuin Kreikassa ja Italiassa:
 *
 *   maailmankartta — Millerin lieriö, LEVEYS 12000 / LON0 −175 /
 *     POHJOINEN 76 (tools/tee-fokuskartta.mjs laudanProjektio).
 *   europe — tasaväli, x = (lon + 11) × 19,2 ja y = (72 − lat) × 26,3.
 *
 * Kummatkin kaavat validoitiin ennen käyttöä jo kirjatulla kohteella
 * (Ateena: laskettu 6624,2 / 1881,9 ja 666,7 / 894,9 vastasi
 * kirjattuja 0,1 yksikön tarkkuudella). Piste osuu FRA-lehden
 * rajaukseen (x 5574–6240, y 1265–1818).
 *
 * ── KUVA ON PELIN OMA HAVAINNEKUVA ─────────────────────────────────
 *
 * Kohteella on VAIN `ihme`-kenttä eikä lainkaan `kuva`-kenttää, koska
 * palatsia ei ole: viimeiset muurit purettiin 1880-luvulla. Kuvakenttä
 * on `osoite` eikä `tiedosto` — polku repoon (assets/kartat/ihmeet/),
 * ei Commonsiin. Selite kertoo KOHTEESTA, lähderivi merkitsee kuvan
 * havainnekuvaksi ja peli piirtää kuvan kulmaan nauhan "Matkakirjan
 * ihme" — säännöt kokonaisuudessaan Kreikan tiedoston lohkossa
 * "MATKAKIRJAN IHME".
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli
 * "Tuileries Palace" 27.8.2026 — ei työaineistoa, joten lähderivi
 * osoittaa suoraan artikkeliin.
 */
export const FOKUSKOHTEET_FRA = [
  {
    /*
     * TUILERIES'N PALATSI. 2,3325 E / 48,86222 N — en-Wikipedia
     * "Tuileries Palace" (48°51′44″N 2°19′57″E). Piste on palatsin oma
     * paikka Louvren pihan länsipäässä, nykyisen Tuileries'n puutarhan
     * itälaidan terassilla.
     */
    id: 'tuileries',
    nimi: 'Tuileries\'n palatsi',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi palatsia ei rakennettu uudelleen, vaikka muurit jäivät pystyyn?',
      'Mitä palatsin paikalla on nykyään?',
    ],
    korostukset: ['Katariina de Medici|Katariina de Medicin',
      'Pariisin kommuuni|Pariisin kommuunin'],
    nappi: 'Palatsi, jonka isoisä näki raunioina',
    laudat: {
      maailmankartta: { x: 5911.1, y: 1439.4 },
      europe: { x: 256.0, y: 608.5 },
    },
    teksti: 'Tuileries\'n palatsi seisoi Seinen oikealla rannalla '
      + 'suoraan Louvren länsipuolella ja sulki sen suuren pihan '
      + 'lännestä. Rakennustyöt alkoivat 1564 kuningatar Katariina de '
      + 'Medicin asunnoksi, ja vuosisatojen mittaan kasvanut julkisivu '
      + 'venyi 266 metrin pituiseksi. Palatsi oli useimpien Ranskan '
      + 'hallitsijoiden pariisilainen koti Henrik neljännestä Napoleon '
      + 'kolmanteen. Pariisin kommuunin kukistamisen aikaan 23. '
      + 'toukokuuta 1871 kaksitoista miestä sytytti sen palamaan '
      + 'petrolilla, tervalla ja tärpätillä; tuli paloi 48 tuntia ja '
      + 'poltti rakennuksen sisältä tyhjäksi. Kivimuurit jäivät '
      + 'kuitenkin pystyyn, ja rauniot seisoivat paikallaan yksitoista '
      + 'vuotta ennen kuin ne 1882 päätettiin purkaa.',
    lahde: 'en-Wikipedia "Tuileries Palace", johdanto, tietolaatikko ja '
      + 'osio "Destruction during the Paris Commune" (tarkistettu '
      + '27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Palatsia ei ole, joten `kadonnut: true`:
     * kartalla tähti ja kortissa tämä kuva ensimmäisenä — ja ainoana.
     *
     * TÄMÄ KOHDE KOSKETTAA PÄIVÄKIRJAA SUORAAN: palatsi paloi 1871 ja
     * viimeiset muurit purettiin 30.9.1883, joten isoisä näki matkallaan
     * 1873 täsmälleen sen välitilan, jota ei ole enää kummassakaan
     * päässä — mustuneet muurit keskellä Pariisia. Selite sanoo sen
     * ääneen.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-tuileries.webp',
      kadonnut: true,
      selite: 'Tuileries\'n palatsi sulki Louvren pihan lännestä yli '
        + 'kolmensadan vuoden ajan, ja sen julkisivu oli 266 metriä '
        + 'pitkä. Kommuuni poltti sen toukokuussa 1871 ja viimeiset '
        + 'muurit purettiin 30. syyskuuta 1883 — isoisä ehti nähdä '
        + 'matkallaan 1873 juuri nuo mustuneet rauniot. Paikalla on nyt '
        + 'avoin terassi Tuileries\'n puutarhan ja Louvren pihan '
        + 'välissä.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
