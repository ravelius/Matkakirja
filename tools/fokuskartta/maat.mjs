/*
 * FOKUSKARTAN MAAKOHTAINEN TYYLITIEDOSTO.
 *
 * Esirenderöity fokuspohja ei ole pelkkä maastorasteri vaan 1873-atlaksen
 * karttapinta: meri syvyysporrastettuna, akvarellihypsometria, merten ja
 * vuorten nimet, naapurimaat haaleina. Omistaja hyväksyi ulkoasun
 * prototyypistä 24.8.2026.
 *
 * JATKUVA PINTA (omistaja 25.8.2026): lehden KALUSTEET — kehys,
 * kartuutsi, mittajana ja asteverkon reunalukemat — eivät ole enää
 * kuvassa. Ne ovat sivua eivätkä karttaa, ja peli piirtää tarvittavat
 * ruutuun ankkuroituina (js/fokusmitat.js). Kytkin on `jatkuva`.
 *
 * Kaikki lehden käsin aseteltavat asiat asuvat tässä tiedostossa yhtenä
 * oliona maata kohti, koska ne EIVÄT OLE PAIKKATIETOA vaan
 * karttatypografiaa: meren nimi menee sinne mihin se mahtuu ulapalle,
 * vesileima maan tyhjimpään kohtaan. Aineistosta niitä ei saa.
 *
 * KAKSI LAATIKKOA, JOTKA ON PIDETTÄVÄ ERILLÄÄN:
 *
 *   ikkuna   Se, mitä LEHTI esittää: kehysviiva, asteverkon lukemat,
 *            kartuutsi ja mittajana asetellaan tähän laatikkoon. Peli
 *            ajaa kameran juuri tähän (js/packs/fokus-grc.js rajaus),
 *            joten pelaaja näkee lehden kokonaan.
 *
 *   vuoto    Kuinka paljon PAPERIA jatkuu ikkunan ulkopuolelle osuutena
 *            ikkunan koosta. Ruudun kuvasuhde ei ole koskaan sama kuin
 *            lehden, joten kamera näyttää aina hitusen ikkunaa enemmän
 *            joko leveys- tai korkeussuunnassa; vuoto täyttää sen, eikä
 *            kuvan reuna eli sauma laudan omaan grafiikkaan pääse
 *            näkyviin. 0,15 kattaa kuvasuhteet 1,23–2,08 (kaikki
 *            vaakanäkymät); pystynäkymässä reuna tulee vastaan, ja sitä
 *            varten kuvan uloin reuna häivytetään läpinäkyväksi
 *            (piirto.js reunahaivytys) — sauma sulaa lautaan.
 *
 * NIMET OVAT SUOMEKSI (omistaja 24.8.2026: EGEANMERI, JOONIANMERI,
 * KREETANMERI, TRAAKIANMERI) paitsi paikannimet, jotka ovat
 * kansainvälisessä latinalaisessa asussaan kuten isoisän atlaksessa.
 *
 * PELILAATTOJEN KAUPUNKEJA EI OLE TÄSSÄ LISTASSA. Peli piirtää Ateenan
 * ja Kreetan laatat nimineen itse, ja kuvaan poltettu toisinto olisi
 * tupla, joka ei liikkuisi laatan mukana.
 *
 * Lähteet: Natural Earth 10m ja Wikipedia (sijainnit, korkeudet).
 */

export const FOKUSMAAT = {
  GRC: {
    /*
     * Lehden ikkuna.
     *
     * LEVEYSASTEET ovat sommittelun kiinnityspiste: Kreeta alareunassa
     * (34,4) ja pohjoisraja yläreunassa (41,95), aivan kuten
     * prototyypissä. Pituusasteita EI anneta, vaan ne lasketaan
     * kuvasuhteesta — pelilaudan Millerin lieriö puristaa leveysastetta
     * noin yhdeksän prosenttia enemmän kuin prototyypin Mercator, joten
     * prototyypin lon-väli antaisi tässä matalamman ja tyhjemmän
     * lehden. Keskimeridiaani on prototyypin oma.
     *
     * KUVASUHDE 1,6 on prototyypin suhde eikä vain sen canvasin koko:
     * sitä leveämpi lehti vaatisi vaakaruudulla enemmän pystyvuotoa
     * kuin on järkevää (1,745 ei enää mahtuisi iPadin 4:3-ruutuun
     * ilman saumaa).
     */
    ikkuna: { lonKeski: 24.0, lat0: 34.4, lat1: 41.95, kuvasuhde: 1.6 },
    vuoto: 0.15,

    /*
     * JATKUVA PINTA (omistaja 25.8.2026). Kuvaan ei polteta kehystä,
     * kartuutsia, mittajanaa eikä reunalukemia, ja naapurit saavat
     * oman haalean topografiansa — ks. tools/fokuskartta/piirto.js.
     * Kytkin on maakohtainen, jotta vanha lehtiasu on yhden rivin
     * päässä, jos jatkuva pinta joskus osoittautuu vääräksi.
     */
    jatkuva: true,

    /*
     * Kartuutsin teksti. Jatkuvassa pinnassa TÄTÄ EI KÄYTETÄ: peli
     * piirtää kartuutsin itse ruutuun ankkuroituna (js/fokusmitat.js)
     * ja ottaa maan nimen laudan omasta taulusta. Luvut jäävät tänne
     * lehtiasua varten.
     */
    otsikko: 'KREIKKA',
    alaotsikko: 'isoisän matkakirjan mukaan · 1873',

    /* Maan oma nimi kreikaksi, haalea vesileima maan päällä. */
    vesileima: { teksti: 'ΕΛΛΑΣ', lon: 22.15, lat: 39.45, koko: 31, vali: 11 },

    /*
     * Naapurit: ääriviiva, joka himmenee ja sumenee rajasta poispäin.
     * Nimen paikka on aseteltu silmällä sinne, missä se mahtuu maan
     * päälle jäämättä kehysviivan alle.
     */
    naapurit: [
      { iso: 'ALB', nimi: 'Albania', lon: 20.1, lat: 40.85 },
      { iso: 'MKD', nimi: 'Pohjois-Makedonia', lon: 21.9, lat: 41.55 },
      { iso: 'BGR', nimi: 'Bulgaria', lon: 25.4, lat: 41.6 },
      { iso: 'TUR', nimi: 'Turkki', lon: 29.6, lat: 38.9 },
      { iso: 'ITA', nimi: 'Italia', lon: 18.0, lat: 40.55 },
    ],

    /* Merten nimet: harvaa kursiivia ulapalle, kulma seuraa merta. */
    meret: [
      { nimi: 'JOONIANMERI', lon: 19.6, lat: 37.6, kulma: -18, koko: 21 },
      { nimi: 'EGEANMERI', lon: 25.15, lat: 39.05, kulma: -7, koko: 22 },
      { nimi: 'KREETANMERI', lon: 24.6, lat: 35.9, kulma: 0, koko: 15 },
      /*
       * Traakianmeri on suomeksi yhdyssana eikä kaksisanainen kuten
       * prototyypin THRAKIAN MERI, joten harvennettuna se on leveämpi
       * kuin sen ulappa: nimi on siirretty idemmäs Limnoksen pohjoisen
       * avoveden päälle, jottei se jää Athoksen niemen tummalle
       * maastolle (merten nimissä ei ole haloa).
       */
      { nimi: 'TRAAKIANMERI', lon: 25.05, lat: 40.4, kulma: 0, koko: 12 },
    ],

    /* Vuoret: hachure-kolmio, kursiivinimi ja korkeus metreinä. */
    vuoret: [
      { nimi: 'Ólympos', lon: 22.3586, lat: 40.0853, m: 2918, iso: true },
      { nimi: 'Smólikas', lon: 20.9142, lat: 40.0894, m: 2637 },
      { nimi: 'Parnassós', lon: 22.6231, lat: 38.5367, m: 2457 },
      { nimi: 'Taÿgetos', lon: 22.3528, lat: 36.9564, m: 2404 },
      { nimi: 'Psilorítis', lon: 24.7756, lat: 35.2281, m: 2456 },
    ],

    /*
     * Muut kaupungit — EI pelilaattoja. Náfplio ei ole Natural Earthin
     * 10m-aineistossa, mutta se on 1873-tarinalle tärkeä (Kreikan
     * ensimmäinen pääkaupunki 1829–1834), joten piste on käsin.
     */
    kaupungit: [
      { nimi: 'Thessaloníki', lon: 22.9444, lat: 40.6401, dx: 10, dy: -8 },
      { nimi: 'Pátra', lon: 21.7346, lat: 38.2466, dx: -10, dy: -8, ank: 'right' },
      { nimi: 'Ioánnina', lon: 20.8537, lat: 39.665, dx: -10, dy: -6, ank: 'right' },
      { nimi: 'Náfplio', lon: 22.8069, lat: 37.5675, dx: 9, dy: 12 },
    ],

    /* Aineiston jokien nimet siinä asussa, jossa ne kartalle kirjoitetaan. */
    jokinimet: {
      Haliacmon: 'Aliákmonas',
      Strymnas: 'Strymónas',
      Evros: 'Évros',
    },
  },
};
