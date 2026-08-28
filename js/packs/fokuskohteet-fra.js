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
 * MAAILMAN ERÄ (27.8.2026, neljätoista uutta ihmettä) toi listalle
 * toisen kohteen: Bastiljin. Se ei muuta yllä olevaa — lista on yhä
 * pelkkä ihme-erien jalusta, ja varsinainen Ranska-erä on tekemättä.
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
    // Kartalle lyhyt asu (js/fokuskohteet.js kohteenKarttanimi):
    // koko nimi ei mahdu nimiöön, ja lyhennys jättäisi siitä määritteen.
    nimio: 'Tuileries',
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
        + 'pitkä. Se oli Ranskan hallitsijoiden koti: täällä Ludvig XVI '
        + 'eli vallankumouksen vartioimana vuodesta 1789 ja täällä '
        + 'Napoleon III:n hovi tanssi talvikausien loistokkaimmat '
        + 'tanssiaiset. Kommuuni poltti sen toukokuussa 1871 ja viimeiset '
        + 'muurit purettiin 30. syyskuuta 1883 — isoisä ehti nähdä '
        + 'matkallaan 1873 juuri nuo mustuneet rauniot. Paikalla on nyt '
        + 'avoin terassi Tuileries\'n puutarhan ja Louvren pihan '
        + 'välissä.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
  /*
   * ── MATKAKIRJAN IHMEIDEN MAAILMAN ERÄ (27.8.2026) ────────────────
   *
   * BASTILJI, listan toinen kohde. Tuileries yllä on ennallaan; tämä
   * on sen perässä omana eränään samaan tapaan kuin Italian ja Kreikan
   * tiedostoissa.
   *
   * PARIISI ON PELILAATTA, BASTILJI EI OLE. Sama sääntö ja sama
   * ratkaisu kuin Forum Romanumilla Roomassa (js/packs/
   * fokuskohteet-ita.js): kohde on yksi nimetty paikka kaupungin
   * sisällä, ei toinen Pariisi. Merkki asettuu kaupunkimerkin viereen
   * niputuspassin sarakkeeseen (js/fokusniput.js), aivan kuten
   * Tuileries'n merkki jo tekee.
   *
   * ESITYSTAPA ON "KADONNUT" (`kadonnut: true`). Linnoitus purettiin
   * heti valtauksen jälkeen 1789–1790, eikä paikalla ole siitä enää
   * mitään pystyssä: kartalla siis tähti ja kortissa ihmekuva
   * ensimmäisenä ja ainoana. Aukiolla on nyt heinäkuun pylväs ja
   * Opéra Bastille — kummastakin voisi ottaa valokuvan, mutta kumpikaan
   * ei ole tämä kohde.
   *
   * 2,36917 E / 48,85333 N — en-Wikipedia "Bastille" (tietolaatikon
   * coordinates). Piste on Place de la Bastille, aukio joka kattaa
   * suurimman osan linnoituksen vanhasta paikasta. Laskettu samoilla
   * kaavoilla kuin Tuileries yllä; piste osuu FRA-lehden rajaukseen
   * (x 5574–6240, y 1265–1818).
   */
  {
    id: 'bastilji',
    nimi: 'Bastilji',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi juuri Bastiljista tuli vallankumouksen vertauskuva?',
      'Millaista elämä linnoituksen sisällä oli?',
    ],
    korostukset: ['Porte Saint-Antoine|Saint-Antoinea',
      'valtionvankila|valtionvankilaksi'],
    nappi: 'Linnoitus, jota ei enää ole — mutta jonka päivää juhlitaan',
    laudat: {
      maailmankartta: { x: 5912.3, y: 1439.7 },
      europe: { x: 256.7, y: 608.8 },
    },
    teksti: 'Bastille Saint-Antoine oli keskiaikainen linnoitus Pariisin '
      + 'itälaidalla. Se rakennettiin satavuotisen sodan aikana '
      + 'suojaamaan kaupungin itäistä sisääntuloa, Porte '
      + 'Saint-Antoinea: työt olivat käynnissä jo 1357 ja pääosa nousi '
      + 'vuodesta 1370 alkaen kahdeksantornisena kivimuurina. Vuonna '
      + '1417 se julistettiin valtionvankilaksi, ja vuodesta 1659 se '
      + 'toimi lähinnä siinä tehtävässä — vuoteen 1789 mennessä sen '
      + 'porteista oli kulkenut 5 279 vankia. Heinäkuun 14. päivänä '
      + '1789 väkijoukko valtasi linnoituksen, jonka selleissä oli '
      + 'tuolloin enää seitsemän vankia. Purkutyöt alkoivat heti, ja '
      + 'kivet myytiin muistoesineiksi.',
    lahde: 'en-Wikipedia "Bastille", johdanto, tietolaatikko ja osiot '
      + '"Storming of the Bastille" ja "Legacy" (tarkistettu '
      + '27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Linnoitusta ei ole, joten `kadonnut: true`
     * ja kortissa on vain tämä kuva.
     *
     * MITÄ SELITE EI VÄITÄ: aukiolla on yhä nähtävissä hitusen
     * alkuperäistä kiveä (artikkelin tietolaatikko: "limited stonework
     * survives"), mutta linnoitusta itseään ei ole. Selite sanoo, mitä
     * paikalla NYT on, eikä väitä paikkaa tyhjäksi.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-bastilji.webp',
      kadonnut: true,
      selite: 'Bastilji vartioi Pariisin itäistä porttia yli neljäsataa '
        + 'vuotta ja oli viimeiset puolitoista vuosisataansa '
        + 'valtionvankila: kuningas saattoi sulkea sinne kenet tahansa '
        + 'pelkällä kirjeellä, ja ylhäiset vangit toivat mukanaan omat '
        + 'huonekalunsa ja palvelijansa. Voltaire istui täällä kahdesti. '
        + 'Väkijoukko valtasi linnoituksen 14. heinäkuuta 1789, vaikka '
        + 'sisällä oli enää seitsemän vankia, '
        + 'ja purkutyöt alkoivat samana kesänä. Paikalla on nyt Place '
        + 'de la Bastille, jonka keskellä kohoaa vuoden 1830 '
        + 'vallankumouksen muistoksi pystytetty heinäkuun pylväs — '
        + 'sekin oli jo paikallaan, kun isoisä kulki Pariisin läpi '
        + '1873.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
