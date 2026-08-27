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
 * SAMASTA SYYSTÄ NIMEÄMISEN VOI LUOVUTTAA PELILLE LAJEITTAIN
 * (`poltetutNimet`, omistaja 27.8.2026): fokuskohteiden nimiöt
 * (js/fokusnosto-symbolit.js) latovat vuorten, merten ja jokien nimet
 * kartalle merkkiensä perään, ja Kreikan lehdellä ne osuivat kuvaan
 * poltettujen nimien viereen. Lajeja on kolme — `meret`, `vuoret` ja
 * `joet` — ja ilman merkintää lehti syntyy täsmälleen kuten ennen.
 *
 * KYTKIN ON PÄÄLLÄ KAHDELLA MAALLA: Kreikalla, jolle se tehtiin
 * jälkikäteen, ja Kroatialla, jonka lehti on suunniteltu se sääntö
 * edellä (ks. HRV-osio). Muiden maiden lehdet ovat ämpärissä
 * sellaisina kuin ne on renderöity.
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

    /*
     * VUORTEN JA MERTEN NIMET JÄÄVÄT POLTTAMATTA (omistaja 27.8.2026).
     *
     * Peli latoo v1207:stä alkaen jokaisen fokuskohteen perään oman
     * nimiönsä (js/fokusnosto-symbolit.js NIMIÖ), ja kohdemerkit
     * istuvat täsmälleen niissä pisteissä, joihin tämä taulu latoo
     * omat nimensä: Ólympos, Parnassós, Taÿgetos ja Psilorítis saivat
     * nimensä kahdesti vierekkäin, samoin Egeanmeri ja Joonianmeri.
     * Nimiö on kahdesta kerroksesta se, joka LIIKKUU KOHTEEN MUKANA ja
     * jonka pelaaja voi napauttaa auki, joten kuvaan poltettu toisinto
     * väistyy — ei toisin päin.
     *
     * KYTKIN ON MAAKOHTAINEN eikä moottorin oletus: muiden maiden
     * lehdet ovat ämpärissä sellaisina kuin ne on renderöity, eikä
     * niitä ajeta tässä erässä uudelleen. Puuttuva `poltetutNimet`
     * tarkoittaa siis yhä "polta kaikki", ja tämän maan lehti on
     * ainoa, joka on renderöity uusiksi.
     *
     * MITÄ KUVAAN JÄÄ: vuoren hachure-kolmio ja sen korkeuslukema.
     * Kolmio on kartan omaa merkintää eikä nimeämistä — se kertoo
     * MISSÄ vuori on silloinkin, kun kohdemerkit eivät ole päällä — ja
     * "2918 m" ei toista nimiötä vaan täydentää sitä. Merillä ei ole
     * kuvassa muuta merkintää kuin nimi, joten niistä katoaa koko
     * merkintä; Kreetanmeri, Traakianmeri ja Smólikas jäivät siis
     * nimeämättä, mikä oli tämän linjauksen tietoinen hinta.
     *
     * HINTA ON SITTEMMIN MAKSETTU TOISIN PÄIN (omistaja 27.8.2026,
     * kolmikkoerä): nimipolttoa ei palautettu, vaan noista kolmesta
     * tehtiin omat fokuskohteensa (js/packs/fokuskohteet-grc.js:
     * `smolikas`, `kreetanmeri`, `traakianmeri`) täsmälleen näihin
     * koordinaatteihin. Nimi tulee siis nyt nimiöstä, ja napautus avaa
     * lisäksi kortin. ÄLÄ SIIS KÄYTÄ tätä listaa perusteena polton
     * palauttamiselle — kohteet ovat kartalla juuri näissä pisteissä.
     *
     * JOET TULIVAT KOLMANTENA LAJINA (omistaja 27.8.2026): *"Aliákmonas-
     * joen karttaan poltettua nimeä ei voi klikata."* Sama linjaus
     * kolmatta kertaa, joten se tehtiin kerralla loppuun: kaikki kolme
     * jokea, joiden nimi tähän lehteen poltettiin (`jokinimet` alempana:
     * Aliákmonas, Strymónas ja Évros), ovat nyt fokuskohteita
     * TÄSMÄLLEEN NIISSÄ PISTEISSÄ, joihin piirto.js latoi niiden nimen —
     * eli pisimmän uomanpätkän kohdassa 55 % (piirto.js kohta 8d).
     * Luvut on laskettu aineistosta eikä arvattu, ja ne ovat
     * js/packs/fokuskohteet-grc.js:n kohteiden kommenteissa asteina.
     *
     * `jokinimet` JÄÄ PAIKALLEEN eikä sitä tyhjennetä. Se on yhä ainoa
     * paikka, joka kertoo, missä asussa nämä kolme uomaa Kreikan
     * lehdellä nimetään, ja jos jokin toinen lauta joskus tarvitsee
     * poltetut nimet takaisin, kytkin riittää.
     */
    poltetutNimet: { meret: false, vuoret: false, joet: false },

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

    /*
     * Aineiston jokien nimet siinä asussa, jossa ne kartalle
     * kirjoitetaan. KREIKAN LEHDELLE NIITÄ EI ENÄÄ POLTETA
     * (`poltetutNimet.joet` yllä) — nämä kolme ovat pelin omia
     * fokuskohteita. Taulu jää silti tänne: se on aineiston englanti-
     * ja translitterointinimien (Haliacmon, Strymnas, Evros) ainoa
     * silta suomalaiseen kirjoitusasuun.
     */
    jokinimet: {
      Haliacmon: 'Aliákmonas',
      Strymnas: 'Strymónas',
      Evros: 'Évros',
    },
  },

  /* ================================================================
   * UNKARI — TOINEN KURATOITU LEHTI, KREIKAN KAAVALLA
   *
   * Unkari oli tähän asti yleisen reitin kuva (HUN.webp), ja se on
   * hyvä kartta mutta ei lehti: ikkuna on maan oma laatikko, nimiä ei
   * ole yhtään ja kaupunkipisteet poimitaan aineistosta. Budapest on
   * pelilauta-kaupunki, jonka fokusnäkymässä lehti täyttää ruudun,
   * joten se ansaitsee saman käsityön kuin Ateena.
   *
   * KAIKKI TÄMÄN LEHDEN NIMET OVAT NAPAUTETTAVIA. Se on koko rajauksen
   * lähtökohta eikä jälkikäteen tehty siivous: kuvaan poltetaan vain
   * ne viisi kaupunginnimeä, joilla on oma fokuskohde samassa
   * pisteessä (js/packs/fokuskohteet-hun.js + js/packs/fokus-grc.js
   * FOKUS_LISANIMET.HUN), ja vuorten, jokien ja merten nimeäminen on
   * luovutettu pelille (`poltetutNimet` alla) kuten Kreikassa v1210:n
   * jälkeen. Naapurimaiden nimet jäävät — ne eivät ole fokuskohteita
   * vaan lehden reunaorientaatio, täsmälleen kuten omistajan
   * hyväksymällä Kreikan lehdellä.
   * ================================================================ */
  HUN: {
    /*
     * Lehden ikkuna.
     *
     * KUVASUHDE ON KREIKAN 1,6, koska Unkari mahtuu siihen ilman
     * väkivaltaa: maa on 16,11..22,90 eli 6,79 astetta leveä ja
     * 45,74..48,59 eli 2,85 astetta korkea. Lat 45,2..49,1 antaa
     * Millerin lieriössä 1,6:lla pituusasteet 15,55..23,45, eli
     * marginaali on joka reunalla noin puoli astetta — sama
     * tasapaino kuin Kreikan lehdellä, ja 1,6 on ainoa kuvasuhde,
     * jolla 15 %:n vuoto kattaa kaikki vaakaruudut (1,23–2,08).
     *
     * KESKIMERIDIAANI 19,5 on MAAN keskikohta (16,11+22,90)/2, ei
     * Budapestin 19,04: pääkaupunki on Unkarissa selvästi lännessä, ja
     * jos ikkuna keskitettäisiin siihen, itäraja kulkisi Nyírségin
     * poikki. Budapest jää silti hyvin lähelle lehden keskustaa.
     */
    ikkuna: { lonKeski: 19.5, lat0: 45.2, lat1: 49.1, kuvasuhde: 1.6 },
    vuoto: 0.15,

    /* Jatkuva pinta kuten kaikilla muillakin lehdillä. */
    jatkuva: true,

    /*
     * Vedet jatkuvat rajan yli (toisin kuin Kreikan pilottikuvassa).
     * Unkarissa se on välttämättömyys eikä tyyliseikka: Tonava tulee
     * Wienin suunnasta ja jatkaa Belgradiin, ja rajaan katkaistu uoma
     * näyttäisi siltä kuin joki alkaisi ja loppuisi Unkarissa.
     */
    jatkuvatVedet: true,

    /* Kartuutsin teksti — jatkuvassa pinnassa vain lehtiasun varalle. */
    otsikko: 'UNKARI',
    alaotsikko: 'isoisän matkakirjan mukaan · 1873',

    /*
     * Maan oma nimi unkariksi, haalea vesileima. Paikka on
     * Kiskunságissa Tonavan ja Tiszan välissä — lehden tyhjin kohta.
     * Koko on Kreikan 31:tä pienempi ja harvennus 11:tä tiiviimpi,
     * koska MAGYARORSZÁG on kaksitoista merkkiä ja ΕΛΛΑΣ viisi.
     */
    vesileima: {
      teksti: 'MAGYARORSZÁG', lon: 19.75, lat: 46.72, koko: 25, vali: 7,
    },

    /*
     * Naapurit: seitsemän maata, joista jokainen näkyy lehdellä.
     * Nimen paikka on aseteltu silmällä naapurin omalle puolelle
     * rajaa niin, ettei se jää kuvan reunan alle.
     */
    naapurit: [
      { iso: 'AUT', nimi: 'Itävalta', lon: 16.15, lat: 47.75 },
      { iso: 'SVK', nimi: 'Slovakia', lon: 19.35, lat: 48.75 },
      { iso: 'UKR', nimi: 'Ukraina', lon: 22.85, lat: 48.55 },
      { iso: 'ROU', nimi: 'Romania', lon: 22.6, lat: 46.35 },
      { iso: 'SRB', nimi: 'Serbia', lon: 20.15, lat: 45.6 },
      { iso: 'HRV', nimi: 'Kroatia', lon: 17.1, lat: 45.5 },
      { iso: 'SVN', nimi: 'Slovenia', lon: 15.95, lat: 46.15 },
    ],

    /*
     * NIMEÄMINEN LUOVUTETAAN PELILLE KAIKISSA KOLMESSA LAJISSA.
     *
     * Sama linjaus kuin Kreikalla (omistaja 27.8.2026): kuvaan
     * poltettu nimi on pikseleitä, eikä sen päällä ole mitään
     * napautettavaa, kun taas fokuskohteen nimiö liikkuu merkin mukana
     * ja avaa kortin. Unkarissa kytkin on päällä alusta asti, joten
     * kaksoisnimiä ei synny kertaakaan:
     *
     *   vuoret  Kuvaan jää hachure-kolmio ja korkeuslukema — kartan
     *           omaa merkintää, ei nimeämistä. Nimen antaa kohde
     *           (`kekes`, `istallos-ko`, `irottko`) täsmälleen samassa
     *           pisteessä kuin kolmio.
     *   joet    Tonavalla, Tiszalla ja Drávalla on omat kohteensa.
     *           Aineiston nimet ovat saksalais-serbialaisessa asussa
     *           (Donau, Tisa, Drau), ja Tiszan unkarilainen jakso on
     *           aineistossa kokonaan nimetön — poltettu nimi olisi
     *           osunut vain Tonavaan ja Drávaan, mikä olisi ollut
     *           sattumanvarainen kolmesta kahden nimeäminen.
     *   meret   Unkari on sisämaavaltio: `meret` on tyhjä, ja kytkin
     *           on tässä vain siksi, ettei lajia unohdeta, jos joku
     *           joskus lisää Adrianmeren nurkkaan.
     */
    poltetutNimet: { meret: false, vuoret: false, joet: false },

    /* Sisämaavaltio — ei yhtään ulappaa nimettäväksi. */
    meret: [],

    /*
     * Vuoret: kolme, ja ne ovat Unkarin kolme eri ylänköä eivätkä
     * saman harjun huippuja — Mátra, Bükk ja Kőszegi-hegység. Kékes
     * on maan korkein piste ja saa siksi `iso`-merkinnän, aivan kuten
     * Ólympos Kreikan lehdellä.
     */
    vuoret: [
      { nimi: 'Kékes', lon: 20.01, lat: 47.8714, m: 1014, iso: true },
      { nimi: 'Istállós-kő', lon: 20.4439, lat: 48.0831, m: 959 },
      { nimi: 'Írott-kő', lon: 16.4261, lat: 47.3522, m: 882 },
    ],

    /*
     * Kaupungit — EI PELILAATTOJA. Budapest on pelin oma laatta, ja
     * kuvaan poltettu toisinto olisi tupla, joka ei liikkuisi laatan
     * mukana (ks. tiedoston alun sääntö).
     *
     * Nämä viisi ovat samat viisi, joilla on oma fokuskohde
     * (js/packs/fokuskohteet-hun.js): Debrecen, Szeged, Pécs, Eger ja
     * Győr. Kirjoitusasu, `dx`/`dy` ja ankkuri on peilattava
     * sellaisenaan FOKUS_LISANIMET.HUN-tauluun, koska peli laskee
     * poltetun nimen napautuslaatikon juuri näistä luvuista
     * (js/fokuskohteet.js kaupunginNimiLaatikko).
     *
     * Siirrot on valittu niin, ettei nimi mene päällekkäin naapurin
     * eikä vuorikolmion kanssa: Eger on Mátran ja Bükin välissä ja
     * saa nimensä ylös, Szeged Tiszan haarassa ja saa sen oikealle.
     */
    kaupungit: [
      { nimi: 'Debrecen', lon: 21.6273, lat: 47.5316, dx: 10, dy: -8 },
      { nimi: 'Szeged', lon: 20.1414, lat: 46.253, dx: 10, dy: 10 },
      { nimi: 'Pécs', lon: 18.2323, lat: 46.0727, dx: -10, dy: 8, ank: 'right' },
      { nimi: 'Eger', lon: 20.3772, lat: 47.9025, dx: 9, dy: -10 },
      { nimi: 'Győr', lon: 17.6504, lat: 47.6875, dx: -10, dy: -8, ank: 'right' },
    ],

    /*
     * Aineiston jokien nimet suomalaisessa asussa. TÄTÄ TAULUA EI
     * KÄYTETÄ tällä lehdellä (`poltetutNimet.joet` on false), vaan se
     * on sama silta kuin Kreikassa: ainoa paikka, joka kertoo, missä
     * asussa nämä uomat Unkarin lehdellä nimettäisiin, jos poltto
     * joskus palautetaan. Aineistossa Tonava on kahtena piirteenä
     * (Danube alavirtaan, Donau ylävirtaan Wienistä).
     */
    jokinimet: {
      Danube: 'Tonava',
      Donau: 'Tonava',
      Tisa: 'Tisza',
      Drau: 'Dráva',
    },
  },

  /*
   * KROATIA — TOINEN KURATOITU LEHTI, JA ENSIMMÄINEN JOKA SYNTYY
   * KLIKATTAVUUSLINJA EDELLÄ.
   *
   * Kreikka sai kytkimet (`poltetutNimet`) jälkikäteen, kun omistaja
   * huomasi kartalta nimen, jota ei voinut napauttaa. Kroatian lehti
   * on ensimmäinen, joka on suunniteltu se sääntö edellä: KAIKKI
   * KARTALLA NIMETTY ON NAPAUTETTAVISSA. Käytännössä se tarkoittaa
   * kolmea päätöstä, jotka on tehty tässä oliossa eikä jälkikäteen:
   *
   *   1. MERIÄ, VUORIA EIKÄ JOKIA EI NIMETÄ KUVAAN. Kaikki kolme
   *      lajia on luovutettu pelille (`poltetutNimet` alempana), ja
   *      jokaiselle on js/packs/fokuskohteet-hrv.js:ssä kohde
   *      TÄSMÄLLEEN samassa pisteessä. Nimi tulee siis nimiöstä, joka
   *      liikkuu kohteen mukana ja avaa napautuksesta kortin.
   *   2. KAUPUNGIT NIMETÄÄN KUVAAN, ja jokaisella niistä on kohde
   *      samassa pisteessä. Poltettu nimi on kartalla se iso kohde,
   *      johon sormi osuu, ja peli laskee sille näkymättömän
   *      osuma-alueen (js/fokuskohteet.js kaupunginNimiLaatikko) tämän
   *      listan peilikuvasta js/packs/fokus-grc.js:n FOKUS_LISANIMET-
   *      taulussa. Kohde on tyypiltään `kaupunki`, joten se ei lado
   *      omaa nimiötään poltetun nimen viereen — ei kaksoisnimiä.
   *   3. DUBROVNIK EI OLE TÄSSÄ LISTASSA. Se on pelilaatta, jonka
   *      nimen peli piirtää itse (sama sääntö kuin Ateenalla
   *      Kreikassa); kuvaan poltettu toisinto olisi tupla, joka ei
   *      liikkuisi laatan mukana.
   *
   * === IKKUNA ===
   *
   * Kroatia on kuunsirpin muotoinen: Istrian niemestä (13,50 E)
   * Slavonian itärajalle (19,38 E) ja Dubrovnikin eteläkärjestä
   * (42,44 N) Unkarin rajalle (46,54 N). Ikkuna 11,73…21,17 E ja
   * 42,05…46,85 N jättää maalle noin 1,8 asteen marginaalin idässä ja
   * lännessä ja reilun kolmasosa-asteen etelässä ja pohjoisessa.
   *
   * KUVASUHDE ON KREIKAN 1,6 eikä maan oma 1,17. Perustelu on sama
   * kuin Kanadalla: 1,6 on ainoa suhde, jolla 15 %:n vuoto kattaa
   * kaikki vaakaruudut (1,23–2,08) ilman häivytystä. Ylimääräinen
   * leveys ei ole tyhjää vaan Adrianmerta lännessä — juuri se ulappa,
   * jonka takia rannikkomaan lehti ylipäätään tehdään.
   * ================================================================ */
  HRV: {
    ikkuna: { lonKeski: 16.45, lat0: 42.05, lat1: 46.85, kuvasuhde: 1.6 },
    vuoto: 0.15,
    jatkuva: true,

    otsikko: 'KROATIA',
    alaotsikko: 'isoisän matkakirjan mukaan · 1873',

    /*
     * Maan oma nimi kroatiaksi, haalea vesileima maan päällä.
     * Slavoniassa lon 17,55 / lat 45,50 on lehden tyhjin kohta:
     * Zagreb on 1,6 astetta lännessä, Osijek 1,1 astetta idässä eikä
     * väliin jää yhtään merkintää.
     */
    vesileima: {
      teksti: 'HRVATSKA', lon: 17.55, lat: 45.5, koko: 26, vali: 9,
    },

    /*
     * NAAPUREITA EI PIIRRETÄ LAINKAAN — ei ääriviivaa eikä nimeä.
     *
     * Kreikan pilotti piirtää naapureilleen haalean ääriviivan ja
     * latoo niiden nimet kuvaan (kohdat 8c ja 2c piirto.js:ssä).
     * Kroatiassa kumpikin jää pois kahdesta syystä:
     *
     *   1. RAJAVIIVA ON JUURI SE SAUMA, jonka omistaja halusi pois
     *      (26.8.2026: *"Tee koko Euroopan kartta uudella systeemillä
     *      jotta rajat häviää"*). Jatkuvassa pinnassa naapurilla on jo
     *      oma maastonsa, eikä viivaa tarvita. Kroatian rajoista viisi
     *      kuudesta on maarajaa, joten viiva olisi tällä lehdellä
     *      hallitsevampi kuin Kreikan lehdellä.
     *   2. POLTETTU NAAPURIN NIMI EI OLE NAPAUTETTAVISSA, ja tämä
     *      lehti tehdään klikattavuuslinja edellä (ks. yllä).
     */
    naapurit: [],

    /*
     * Vedet jatkuvat rajan yli haaleina, kuten yleisellä reitillä.
     * Sava ja Drava eivät ala eivätkä lopu Kroatian rajalle, ja
     * katkeava uoma kertoisi kartalla valheen.
     */
    jatkuvatVedet: true,

    /*
     * KOLME LAJIA PELILLE (ks. tämän osion alku). Ilman merkintää
     * oletus olisi yhä "polta kaikki"; tässä kaikki kolme lajia
     * annetaan nimiölle, ja jokaisella on kohde samassa pisteessä
     * (js/packs/fokuskohteet-hrv.js).
     *
     * KUVAAN JÄÄ VUOREN HACHURE-KOLMIO JA SEN KORKEUSLUKEMA. Kolmio
     * on kartan omaa merkintää eikä nimeämistä — se kertoo MISSÄ
     * vuori on silloinkin, kun kohdemerkit eivät ole päällä — ja
     * "1831 m" täydentää nimiötä eikä toista sitä.
     */
    poltetutNimet: { meret: false, vuoret: false, joet: false },

    /*
     * Merten nimet. EI POLTETA (`poltetutNimet.meret`), mutta luvut
     * jäävät tänne kahdesta syystä: ne kertovat, missä asussa ulappa
     * tällä lehdellä nimetään, ja ne ovat fokuskohteen `adrianmeri`
     * koordinaatin lähde. Piste on avomerellä Zadarin ja Italian
     * puolivälissä, missä lehdellä on eniten yhtenäistä vettä.
     */
    meret: [
      { nimi: 'ADRIANMERI', lon: 14.6, lat: 43.4, kulma: -38, koko: 20 },
    ],

    /*
     * Vuoret: hachure-kolmio ja korkeus metreinä, nimi nimiöstä.
     *
     * Viisi huippua piirtää Dinaaristen alppien kaaren sellaisena
     * kuin se Kroatiassa kulkee: Učka Istrian yllä, Risnjak Gorski
     * kotarissa, Velebitin Vaganski vrh rannikkomuurina, Dinara maan
     * korkeimpana sisämaassa ja Biokovon Sveti Jure suoraan Makarskan
     * rannan yläpuolella. Korkeudet ja koordinaatit en-Wikipediasta.
     */
    vuoret: [
      { nimi: 'Dinara', lon: 16.3853, lat: 44.0575, m: 1831, iso: true },
      { nimi: 'Sveti Jure', lon: 17.0578, lat: 43.3306, m: 1762 },
      { nimi: 'Vaganski vrh', lon: 15.5153, lat: 44.3506, m: 1757 },
      { nimi: 'Risnjak', lon: 14.7539, lat: 45.4239, m: 1528 },
      { nimi: 'Vojak', lon: 14.2019, lat: 45.2894, m: 1401 },
    ],

    /*
     * Muut kaupungit — EI PELILAATTOJA. Dubrovnik puuttuu listasta
     * tarkoituksella (ks. osion alku, kohta 3).
     *
     * Viisi nimeä 9,4 asteen levyisellä lehdellä on samaa harvuutta
     * kuin Kreikan neljä 15,7 asteella. Siirrot on aseteltu niin,
     * ettei nimi mene vuoren kolmion, toisen nimen tai rantaviivan
     * päälle: Rijeka ja Zadar latovat nimensä vasemmalle (Risnjakin
     * kolmio ja Kvarnerin saaristo ovat oikealla), Split ja Osijek
     * alaviistoon, Zagreb yläviistoon.
     *
     * SAMAT LUVUT OVAT js/packs/fokus-grc.js:n FOKUS_LISANIMET.HRV-
     * rivillä laudan koordinaateiksi muutettuina. Jos näitä muutetaan,
     * sekin taulu on ajettava uusiksi — muuten napautettava laatikko
     * jää eri kohtaan kuin kuvaan poltettu nimi.
     */
    kaupungit: [
      { nimi: 'Zagreb', lon: 15.9772, lat: 45.8144, dx: 10, dy: -8 },
      { nimi: 'Split', lon: 16.4402, lat: 43.5081, dx: 9, dy: 12 },
      /*
       * Rijeka nousee muita ylemmäs (dy −16 eikä −8): Učkan Vojak on
       * vain 0,24 astetta lounaassa, ja sen kolmio yltää −8:lla
       * kirjainten alapidennyksiin. Kahdeksan prototyyppipikseliä
       * lisää jättää kolmiolle ja sen nimiölle oman kaistansa.
       */
      { nimi: 'Rijeka', lon: 14.4422, lat: 45.3271, dx: -10, dy: -16, ank: 'right' },
      { nimi: 'Zadar', lon: 15.2314, lat: 44.1194, dx: -10, dy: -6, ank: 'right' },
      { nimi: 'Osijek', lon: 18.6955, lat: 45.555, dx: 9, dy: 12 },
    ],

    /*
     * JOKINIMIÄ EI ANNETA LAINKAAN. Taulu on aineiston englanninkielisen
     * nimen ja suomalaisen kirjoitusasun silta, ja koska joet on
     * luovutettu pelille (`poltetutNimet.joet`), silta jäisi
     * käyttämättä. Sava ja Drava ovat fokuskohteita
     * (js/packs/fokuskohteet-hrv.js), ja niiden pisteet on laskettu
     * samasta aineistosta kuin uomat piirretään.
     */
  },

  /*
   * SAKSA — KOLMAS KURATOITU LEHTI SAMANA PÄIVÄNÄ, JA SEKIN SYNTYY
   * SUORAAN KLIKATTAVUUSLINJAN MUKAISENA
   *
   * Kreikka joutui luopumaan poltetuista nimistä jälkikäteen, laji
   * kerrallaan (ks. GRC.poltetutNimet yllä): ensin vuoret ja meret,
   * sitten joet, ja joka kerta pudonneet nimet piti palauttaa omina
   * fokuskohteinaan. Saksan lehti tehdään heti perille asti —
   * KUVAAN EI POLTETA YHTÄKÄÄN NIMEÄ, jota ei voi napauttaa.
   *
   * Omistajan sitova linjaus (Raamattu, KARTTAMERKIT MINIMALISTISIKSI):
   * *"Nimipoltto poistetaan lehdistä joilla kohteet hoitavat
   * nimeämisen (GRC ensimmäinen); pudonneet nimet palautetaan
   * kohteina, ei polttoa palauttamalla."* Saksa on toinen.
   *
   * KÄYTÄNNÖSSÄ SE TARKOITTAA NELJÄÄ RATKAISUA:
   *   1. `poltetutNimet` on kaikilta kolmelta lajilta pois — meret,
   *      vuoret ja joet nimeää peli kohdemerkkien nimiöillä
   *      (js/packs/fokuskohteet-deu.js).
   *   2. `kaupungit` on TYHJÄ. Kreikan neljä kaupunkinimeä ovat
   *      kuvassa, ja siksi peli joutuu laskemaan niille erikseen
   *      näkymättömän osuma-alueen (js/fokuskohteet.js
   *      kaupunginNimiLaatikko) ja vaientamaan oman nimiönsä. Saksassa
   *      kaupungit ovat pelkkiä fokuskohteita: nimi tulee nimiöstä,
   *      napautus osuu merkkiin, eikä FOKUS_LISANIMET-tauluun tarvita
   *      Saksaa lainkaan.
   *   3. `naapurit` on tyhjä kuten yleisellä reitillä. Jatkuvassa
   *      pinnassa naapurilla on jo oma maastonsa, ja maan nimi
   *      ulapan yli olisi juuri sellainen poltettu nimi, jota ei voi
   *      napauttaa.
   *   4. `vuoret` JÄÄ — mutta vain kolmiona ja korkeuslukemana, koska
   *      nimeäminen on pois päältä. Kolmio kertoo missä vuori on
   *      silloinkin kun kohdemerkit eivät ole päällä, ja "2962 m"
   *      täydentää nimiötä toistamatta sitä (piirto.js kohta 8e).
   *
   * VESILEIMA ON AINOA POIKKEUS, ja se on sama poikkeus kuin
   * Kreikassa: DEUTSCHLAND ei ole paikannimi vaan paperin oma
   * vesileima, eikä peli tarjoa siitä korttia sen paremmin kuin
   * ΕΛΛΑΣ:sta. Se on aseteltu Hessenin ylängölle, jossa lähin
   * kohdemerkki (Brocken, Wartburg, Köln) on toista astetta kaukana.
   *
   * IKKUNA. Leveysasteet 46,6..55,7 ovat koko maa reunavaroineen:
   * etelässä Zugspitzen harjanne (47,27) ja pohjoisessa Sylt ja
   * Flensburgin vuono (55,07). Pituusasteita ei anneta, vaan ne
   * seuraavat kuvasuhteesta laudan Millerin lieriössä — 1,25 antaa
   * keskimeridiaanilta 10,45 välin 2,91..17,99, eli maan molemmin
   * puolin noin kolme astetta jatkuvaa pintaa: lännessä Alankomaat ja
   * Belgia, idässä Puolan länsiosa, etelässä Alpit ja pohjoisessa
   * Tanska. Berliini (13,4) jää reilusti ikkunan sisään eikä lähelle
   * reunaa, jotta kaupungin oma fokusajo ei näytä kuvan laitaa.
   *
   * MIKSI 1,25 EIKÄ KREIKAN 1,6: Saksa on pystysuuntainen maa (oma
   * laatikko 306 x 344 lautayksikköä eli kuvasuhde 0,89), ja 1,6
   * venyttäisi ikkunan Pariisista Varsovaan — maa jäisi lehden
   * keskelle nauhaksi. 1,25 on kompromissi, joka pitää maan lehden
   * kokoisena mutta antaa merten nimiöille ulappaa. Leveällä
   * vaakaruudulla kuvan reuna häivytetään läpinäkyväksi (piirto.js
   * REUNAHÄIVYTYS) kuten yleisen reitin 93 muulla maalla.
   * ================================================================ */
  DEU: {
    ikkuna: {
      lonKeski: 10.45, lat0: 46.6, lat1: 55.7, kuvasuhde: 1.25,
    },
    vuoto: 0.15,
    jatkuva: true,
    otsikko: 'SAKSA',
    alaotsikko: 'isoisän matkakirjan mukaan · 1873',

    /* Maan oma nimi saksaksi, haalea vesileima Hessenin ylängölle. */
    vesileima: {
      teksti: 'DEUTSCHLAND', lon: 9.3, lat: 51.5, koko: 22, vali: 7,
    },

    /* Ks. ratkaisu 3 yllä: jatkuva pinta, ei naapurien nimiä. */
    naapurit: [],

    /*
     * Vedet jatkuvat rajan yli kuten yleisellä reitillä: Rein tulee
     * Sveitsistä ja jatkuu Alankomaihin, Tonava lähtee Schwarzwaldista
     * ja jatkuu Itävaltaan. Katkaisu rajaan olisi juuri se sauma,
     * jonka takia rajaviivat lehdiltä poistettiin.
     */
    jatkuvatVedet: true,

    /* Ks. ratkaisu 1 yllä — kaikki nimeäminen on pelin kohdemerkeillä. */
    poltetutNimet: { meret: false, vuoret: false, joet: false },

    /*
     * MERTEN NIMET JÄÄVÄT TÄNNE VAIKKA NIITÄ EI POLTETA, samasta
     * syystä kuin Kreikan `jokinimet`: tämä on ainoa paikka, joka
     * kertoo missä asussa ja missä kohtaa ulappaa Saksan lehti nämä
     * kaksi merta nimeäisi, jos kytkin joskus käännetään. Pelin omat
     * kohteet (`itameri`, `pohjanmeri`) ovat täsmälleen näissä
     * pisteissä.
     */
    meret: [
      { nimi: 'POHJANMERI', lon: 6.4, lat: 54.4, kulma: 0, koko: 15 },
      { nimi: 'ITÄMERI', lon: 12.6, lat: 54.9, kulma: 0, koko: 15 },
    ],

    /*
     * Vuoret: hachure-kolmio ja korkeus metreinä, EI nimeä (ratkaisu 4
     * yllä). Viisi huippua on Saksan selkäranka pohjoisesta etelään:
     * Brocken on Harzin ja koko Pohjois-Saksan korkein, Fichtelberg
     * Ore-vuorten, Großer Arber Baijerin metsän, Feldberg
     * Schwarzwaldin ja Zugspitze koko maan. Jokaisella on oma
     * fokuskohde samoissa koordinaateissa.
     */
    vuoret: [
      { nimi: 'Zugspitze', lon: 10.9853, lat: 47.4211, m: 2962, iso: true },
      { nimi: 'Watzmann', lon: 12.9231, lat: 47.5553, m: 2713 },
      { nimi: 'Feldberg', lon: 8.0047, lat: 47.8739, m: 1494 },
      { nimi: 'Großer Arber', lon: 13.1361, lat: 49.1131, m: 1456 },
      { nimi: 'Brocken', lon: 10.6156, lat: 51.7994, m: 1141 },
    ],

    /* Ks. ratkaisu 2 yllä: kaupunkien nimet tulevat pelistä. */
    kaupungit: [],

    /*
     * Aineiston jokien nimet suomalaisessa asussaan. SAKSAN LEHDELLE
     * NIITÄ EI POLTETA (`poltetutNimet.joet`) — taulu on tässä samasta
     * syystä kuin Kreikassa: se on ainoa silta Natural Earthin
     * saksan- ja englanninkielisten uomanimien ja pelin suomalaisten
     * nimien välillä, ja jos jokin toinen lauta joskus tarvitsee
     * poltetut nimet takaisin, kytkin riittää. Rein esiintyy
     * aineistossa kolmella kielellä (Rhein / Rhine / Rhin) ja Tonava
     * kahdella (Donau / Danube), koska uoma on pilkottu maittain.
     */
    jokinimet: {
      Rhein: 'Rein',
      Rhine: 'Rein',
      Rhin: 'Rein',
      Elbe: 'Elbe',
      Donau: 'Tonava',
      Danube: 'Tonava',
      Oder: 'Oder',
      Weser: 'Weser',
      Spree: 'Spree',
      Main: 'Main',
      Mosel: 'Mosel',
    },
  },

  /* ================================================================
   * KAKSI JÄTTILÄISTÄ, JOILLE YLEINEN REITTI EI KELPAA
   *
   * Venäjä ja Kanada ovat ainoat maat, joiden lehti EI SYNNY yleisellä
   * reitillä lainkaan — eivät siksi, että ne olisivat rumia, vaan
   * siksi, että yleisen reitin KUVAN kaava räjähtää niillä.
   *
   * Kaava on tools/tee-fokuskartta.mjs:ssä: kuvan on katettava
   * `ikkunanKorkeus * 2,08` leveydeltä ja `ikkunanLeveys / 1,23`
   * korkeudelta, jotta kamera ei näe kuvan reunaa millään
   * vaakaruudulla. Se on hyvä sääntö niin kauan kuin ikkuna on maan
   * kokoinen. Kanadalla ikkuna on 4010 x 3270 lautayksikköä, ja sääntö
   * vaatii kuvalta 6801 yksikön leveyttä — 204 pituusastetta eli
   * ylitse puolen maapallon, ja pystysuunnassa navan yli leveysasteelle
   * 94,5, jota ei ole olemassa. Venäjällä sama tapahtuu toisin päin:
   * ikkuna on niin leveä, että korkeusehto venyttää kuvan päiväntasaajan
   * tuolle puolen. Kumpaakaan kuvaa ei voi renderöidä eikä sille voi
   * hakea korkeusaineistoa.
   *
   * KURATOITU IKKUNA ON VASTAUS. Kun ikkuna annetaan käsin, kuvaan
   * riittää sama 15 %:n vuoto kuin Kreikan hyväksytyllä lehdellä, ja
   * kuvasta tulee ikkunan kokoinen eikä puolen pallon kokoinen. Vuoto
   * kattaa ruudun kuvasuhteet välillä `kuvasuhde/1,3 … kuvasuhde*1,3`;
   * sen ulkopuolella kuvan reuna häivytetään läpinäkyväksi (piirto.js
   * REUNAHÄIVYTYS) ja sulaa laudan pergamenttiin. Venäjän 2,54:llä
   * yksikään vaakaruutu ei ole niin leveä, että vuotoa tarvittaisiin
   * sivuilla; ylä- ja alareunassa häivytys tekee työnsä.
   *
   * KUMPIKAAN EI OLE LEHTIASU VAAN JATKUVA PINTA (`jatkuva: true`)
   * kuten yleisen reitin 93 muuta maata: kalusteet piirtää peli,
   * naapureilla on oma maastonsa eikä rajaviivaa, kaupunkipisteet
   * poimitaan aineistosta (`paikat`) ja vedet jatkuvat rajan yli
   * (`jatkuvatVedet`). Käsityötä on siis vain ikkuna ja kourallinen
   * merten nimiä — ei omaa tyyliä.
   * ================================================================ */

  RUS: {
    /*
     * VENÄJÄ KALININGRADISTA BERINGINSALMELLE.
     *
     * Ikkuna on lon 18,42..191,58 eli 173,2 astetta: läntisin piste on
     * Kaliningradin Baltijsk (19,6) ja itäisin Dežnjovin niemi
     * (−169,65 = 190,35), ja molemmille jää reilun asteen reuna.
     * PITUUSASTE JATKUU YLI 180:N TAHALLAAN — se ei ole laskuvirhe vaan
     * ainoa tapa esittää Tšukotka kokonaisena. Aineisto ja korkeuslevy
     * on haettava samalla jatkuvalla akselilla (aineisto.mjs `kierrot`,
     * etopo.mjs raa'at lon-rajat), ja piirtomoottori palauttaa
     * yli-180-asteiset pituusasteet oikealle kohdalle kuvaa (piirto.js
     * `kuvaX`) — maailmankartan oma sauma on lon −175, ei 180.
     *
     * LEVEYSASTEET 40,4..82,5 ovat koko maa: etelässä Dagestanin
     * Bazardüzü (41,19) ja pohjoisessa Frans Joosefin maa (81,86).
     * Arktiset saaret ovat mukana tarkoituksella — ilman niitä ikkuna
     * olisi vielä litteämpi (kuvasuhde 3,0 eikä 2,54), ja Severnaja
     * Zemlja ja Frans Joosefin maa jäisivät lehdeltä pois, vaikka ne
     * ovat isoisän atlaksen Venäjää siinä missä Kamtšatkakin.
     *
     * KUVASUHDE 2,54 EI OLE VALINTA VAAN SEURAUS: se on tuon
     * lon-välin ja tuon lat-välin suhde laudan Millerin lieriössä.
     * Maailman levein maa ei mahdu 1,6:n lehdelle millään — 1,6 vaatisi
     * ikkunan ulottuvan päiväntasaajalle asti.
     */
    ikkuna: {
      lonKeski: 105, lat0: 40.4, lat1: 82.5, kuvasuhde: 2.54,
    },
    vuoto: 0.15,
    jatkuva: true,
    otsikko: 'VENÄJÄ',
    alaotsikko: 'isoisän matkakirjan mukaan · 1873',
    naapurit: [],
    jatkuvatVedet: true,
    /*
     * Kaupunkipisteet aineistosta, mutta HARVEMMASSA kuin oletuksena.
     * Nimen leveys on lehden leveydestä kiinni: tällä lehdellä
     * "Nizhny Novgorod" vie kaksitoista pituusastetta, joten oletuksen
     * 0,55 asteen väli kasaisi Volgan varren kaupungit yhdeksi
     * mustepuuroksi. Kuuden asteen väli levittää merkinnät koko maahan
     * — Murmanskista Anadyriin — ja kahdellatoista nimellä 173 asteen
     * lehti on yhä harvempi kuin Kreikan neljällä 18 asteella.
     */
    paikat: { enintaan: 12, vahinVali: 6 },

    /*
     * Merten nimet. Neljä nimeä 173 asteen levyisellä lehdellä on
     * harvempaa merkintää kuin Kreikan neljä 18 asteella — juuri niin
     * kuin isoisän atlaksessa. Koot on mitoitettu niin, että nimi
     * mahtuu omalle ulapalleen: Ohotanmeri on vain kolmetoista astetta
     * leveä, Jäämeri sata.
     */
    meret: [
      { nimi: 'JÄÄMERI', lon: 120, lat: 81, koko: 26 },
      { nimi: 'BARENTSINMERI', lon: 38, lat: 74.5, koko: 14 },
      { nimi: 'OHOTANMERI', lon: 150, lat: 54.3, koko: 11 },
      // Beringinmeri jää antimeridiaanin molemmin puolin (172..188):
      // sen paikka on samalla todiste siitä, että rajan ylitys pitää.
      { nimi: 'BERINGINMERI', lon: 180, lat: 58.5, koko: 13 },
    ],
  },

  CAN: {
    /*
     * KANADA.
     *
     * LEVEYSASTEET 41..83,6 ovat koko maa: etelässä Erie-järven Middle
     * Island (41,67) ja pohjoisessa Ellesmeren Kap Columbia (83,12).
     * Pituusasteita ei anneta, vaan ne seuraavat kuvasuhteesta kuten
     * Kreikalla — ja KUVASUHDE ON KREIKAN 1,6, koska Kanada mahtuu
     * siihen: maa itse on 89 astetta leveä (−141..−52,6) ja 1,6 antaa
     * 112,3 astetta keskimeridiaanilta −96,5, eli lon −152,7..−40,3.
     * Ylimääräinen tila ei ole tyhjää vaan Alaskaa lännessä ja
     * Grönlantia idässä — juuri sitä jatkuvaa pintaa, jonka takia
     * rajaviivat katosivat lehdiltä.
     *
     * 1,6 on tässä arvokas myös siksi, että se on ainoa kuvasuhde,
     * jolla 15 %:n vuoto kattaa kaikki vaakaruudut (1,23–2,08) ilman
     * häivytystä. Maan oma muoto antaisi 1,29, ja silloin leveä ruutu
     * näkisi kuvan reunan.
     */
    ikkuna: {
      lonKeski: -96.5, lat0: 41, lat1: 83.6, kuvasuhde: 1.6,
    },
    vuoto: 0.15,
    jatkuva: true,
    otsikko: 'KANADA',
    alaotsikko: 'isoisän matkakirjan mukaan · 1873',
    naapurit: [],
    jatkuvatVedet: true,
    /*
     * Sama peruste kuin Venäjällä, lievempänä: 112 asteen lehdellä
     * "Charlottetown" vie yhdeksän astetta, ja Pyhän Laurentiuksen
     * varrella kaupunkeja on tiheässä. 1,8 asteen väli pitää Ottawan ja
     * Québecin mutta siirtää loput nimet sinne, missä lehti on tyhjä —
     * Labradoriin, Nunavutiin ja Mackenzien varrelle.
     */
    paikat: { enintaan: 12, vahinVali: 1.8 },

    /*
     * Merten nimet. Hudsoninlahti on pitkä sana ahtaassa altaassa: nimi
     * on aseteltu lahden leveimmälle kohdalle (lat 60,3) ja sen läntinen
     * puoli painottuen, koska idässä Ungavan niemi tulee vastaan.
     */
    meret: [
      { nimi: 'JÄÄMERI', lon: -105, lat: 82, koko: 24 },
      { nimi: 'HUDSONINLAHTI', lon: -87.3, lat: 60.3, koko: 13 },
      { nimi: 'ATLANTTI', lon: -50, lat: 45, koko: 20 },
    ],
  },
};

/* ==================================================================
 *                        YLEINEN REITTI
 *
 * KOKO EUROOPPA ILMAN KÄSITYÖTÄ (omistaja 26.8.2026: *"Tee koko
 * Euroopan kartta uudella systeemillä jotta rajat häviää"*).
 *
 * Yllä oleva FOKUSMAAT-taulu on ATLAKSEN TYPOGRAFIAA: merten nimet,
 * vuoret ja vesileima aseteltuna silmällä. Se on hyvä Kreikalle, mutta
 * neljällekymmenelle maalle sitä ei kirjoiteta käsin — eikä tarvitse.
 * Jatkuvassa pinnassa kuvassa on maastoa, vettä ja kaupunkipisteitä;
 * kalusteet piirtää peli, ja maan nimen se ottaa laudan omasta
 * taulusta. Ilman yhtään kuratoitua riviä kuva on siis valmis kartta,
 * ei vajaa lehti.
 *
 * Kuratoidut lisät ovat tämän jälkeen VALINNAISIA: jos maalle
 * kirjoitetaan FOKUSMAAT-osio, se voittaa yleisen reitin kokonaan.
 *
 * === MIKSI IKKUNAA EI JOHDETA LAUDAN OMASTA MAAMUODOSTA ===
 *
 * Laudan `countryShapes` on piirrettyä grafiikkaa, ei mittausta:
 * esimerkiksi maailmankartan Islanti on piirretty parikymmentä astetta
 * väärään paikkaan (laudalla lon −9,9…−5,5, todellisuudessa
 * −24,5…−13,5), vaikka Reykjavíkin laatta on oikein. Ikkuna johdetaan
 * siksi Natural Earthin 10m-geometriasta, joka on samaa aineistoa kuin
 * kuvan rantaviiva — kuva ja sen rajaus kertovat aina samaa.
 */

/*
 * Yleisen ikkunan mittasuhteet. Luvut on johdettu Kreikan hyväksytystä
 * lehdestä, jotta jokainen maa näyttää samalta perheeltä.
 */
export const YLEINEN = {
  /* Marginaali maan ympärille osuutena maan omasta koosta... */
  marginaali: 0.18,
  /* ...mutta vähintään näin monta astetta, ettei pikkumaa jää kiinni reunaan. */
  vahinMarginaali: 0.6,
  /*
   * IKKUNAN KUVASUHTEEN RAJAT — VÄLJÄT TARKOITUKSELLA.
   *
   * Ikkuna saa olla maan muotoinen: Norja pystyssä, Turkki makuullaan.
   * Se on parempi rajaus kuin kaikille pakotettu 1,6, koska kamera
   * sovittaa juuri ikkunan ruutuun — pakotettu leveä kehys jättäisi
   * Albanian ruudun keskelle nauhaksi.
   *
   * KUVAN kokoon ikkunan muodolla ei ole vaikutusta, ja se on syytä
   * ymmärtää ennen näiden lukujen muuttamista: kuvan on katettava
   * `ikkunanKorkeus * 2,08` leveydeltä ja `ikkunanLeveys / 1,23`
   * korkeudelta (ks. tee-fokuskartta.mjs), ja se laatikko on sama
   * riippumatta siitä, kuinka ikkunan sivut on jaettu. Rajat ovat siis
   * vain varmistin täysin rappeutuneita muotoja vastaan.
   */
  kuvasuhdeAlin: 0.55,
  kuvasuhdeYlin: 2.6,
  /* Vuoto kuten Kreikalla: 15 % ikkunan koosta joka reunalle. */
  vuoto: 0.15,
  /*
   * RUUDUN KUVASUHTEEN ÄÄRIPÄÄT vaakanäkymässä. Kamera sovittaa ikkunan
   * ruutuun, joten leveällä ruudulla näkyy ikkunaa leveämmältä ja
   * kapealla korkeammalta. Kuvan on katettava molemmat päät; Kreikan
   * 1,6-lehdellä nämä luvut antavat täsmälleen sen 15 % vuodon, joka
   * omistajan hyväksymässä kuvassa on.
   */
  ruutuLevein: 2.08,
  ruutuKapein: 1.23,
  /*
   * Kuinka kaukana maan pääosasta oleva saari otetaan vielä ikkunaan.
   * 2,5 astetta pitää Kreikan saaret, Tanskan Bornholmin ja Ranskan
   * Korsikan mukana mutta jättää pois Kanariansaaret, Azorit,
   * Ranskan Guayanan ja Huippuvuoret — ne ovat toisella pallonpuoliskolla
   * eivätkä kuulu Euroopan lehdelle.
   */
  saarenEtaisyys: 2.5,
  /*
   * KUVAN TARKKUUS. Kolme kattoa, joista pienin voittaa:
   *
   *  1. 6400 pikseliä leveä — Kreikan hyväksytty koko, ja iOS:n purettu
   *     kuva on se raja, jota ei ylitetä (ks. tee-fokuskartta.mjs).
   *  2. 25,6 megapikseliä yhteensä — sama muistibudjetti myös silloin,
   *     kun kuva on Kreikan lehteä korkeampi.
   *  3. 12 pikseliä kaariminuuttia kohti — korkeusaineisto on ETOPO1,
   *     jonka ruutu on yksi kaariminuutti. Tätä tiheämpi kuva ei enää
   *     näytä maastoa vaan bilineaarista puuroa, ja pikkumaiden
   *     tiedostot jäävät turhan isoiksi.
   */
  maksimiLeveys: 6400,
  pikselibudjetti: 25.6e6,
  pikseliaKaariminuutissa: 12,
};

/*
 * YLEISEN REITIN POIKKEUKSET. Vain sellaista, mitä geometriasta ei voi
 * päätellä — ei tyyliä vaan rajausta.
 */
export const YLEISET_POIKKEUKSET = {
  /*
   * Turkki on laudan levein maa (lähes 19 astetta), ja suhteellinen
   * marginaali venyttäisi ikkunan Kaukasuksen taakse. Omistajan ohje:
   * koko maa mukaan, mutta marginaali idässä pienempi. Lännessä tilaa
   * on jätettävä enemmän, koska siellä on Egeanmeri ja Kreikan raja —
   * juuri se sauma, jonka on kadottava.
   */
  TUR: {
    marginaaliAsteina: {
      lon0: 1.4, lon1: 0.7, lat0: 0.9, lat1: 0.9,
    },
  },
  /*
   * VENÄJÄLLÄ OLI TÄSSÄ RAJAUS EUROOPAN PUOLEISEEN VENÄJÄÄN
   * (lon 19,6..60,5), koska koko maan ikkuna olisi 160 astetta leveä
   * "eikä esittäisi mitään". Se poistettiin, kun Venäjä sai kuratoidun
   * osion FOKUSMAAT-taulusta: kuratoitu reitti voittaa aina yleisen,
   * joten rivi oli kuollutta koodia — ja väärä lupaus, koska lehti
   * esittää nyt koko maan Kaliningradista Beringinsalmelle. Jos
   * FOKUSMAAT.RUS joskus poistetaan, tämä rajaus on palautettava.
   */
};

/**
 * Maan asteikkolaatikosta lehden ikkuna laudan omalla kaavalla.
 *
 * Palauttaa saman muotoisen `ikkuna`-olion kuin FOKUSMAAT-taulun
 * käsityörivit: { lonKeski, lat0, lat1, kuvasuhde }. Näin
 * tee-fokuskartta.mjs käsittelee molemmat reitit yhdellä koodilla.
 */
export function yleinenIkkuna(iso, maanLaatikko, kaava, asetukset = YLEINEN) {
  const poikkeus = YLEISET_POIKKEUKSET[iso] ?? {};
  const maa = poikkeus.laatikko ?? maanLaatikko;
  const m = poikkeus.marginaaliAsteina ?? {};
  const oletusLon = Math.max(asetukset.vahinMarginaali,
    (maa.lon1 - maa.lon0) * asetukset.marginaali);
  const oletusLat = Math.max(asetukset.vahinMarginaali,
    (maa.lat1 - maa.lat0) * asetukset.marginaali);
  let lon0 = maa.lon0 - (m.lon0 ?? oletusLon);
  let lon1 = maa.lon1 + (m.lon1 ?? oletusLon);
  let lat0 = maa.lat0 - (m.lat0 ?? oletusLat);
  let lat1 = maa.lat1 + (m.lat1 ?? oletusLat);

  // Mitat laudan yksiköissä: vain lauta tietää, montako yksikköä
  // leveysaste on — Millerin lieriössä se kasvaa pohjoista kohti.
  let x0 = kaava.lautaX(lon0); let x1 = kaava.lautaX(lon1);
  let y0 = kaava.lautaY(lat1); let y1 = kaava.lautaY(lat0);
  const suhde = (x1 - x0) / (y1 - y0);
  if (suhde < asetukset.kuvasuhdeAlin) {
    const leveys = (y1 - y0) * asetukset.kuvasuhdeAlin;
    const keski = (x0 + x1) / 2;
    x0 = keski - leveys / 2; x1 = keski + leveys / 2;
    lon0 = kaava.lautaLon(x0); lon1 = kaava.lautaLon(x1);
  } else if (suhde > asetukset.kuvasuhdeYlin) {
    const korkeus = (x1 - x0) / asetukset.kuvasuhdeYlin;
    const keski = (y0 + y1) / 2;
    y0 = keski - korkeus / 2; y1 = keski + korkeus / 2;
    lat1 = kaava.lautaLat(y0); lat0 = kaava.lautaLat(y1);
  }
  return {
    lonKeski: kaava.lautaLon((x0 + x1) / 2),
    lat0,
    lat1,
    kuvasuhde: (x1 - x0) / (y1 - y0),
  };
}

/**
 * Yleisen reitin tyyli: jatkuva pinta, ei kuratoituja merkintöjä.
 *
 * `otsikko` jää vain lehtiasun varalle — jatkuvassa pinnassa peli
 * piirtää kartuutsin itse ja ottaa nimen laudan omasta taulusta.
 */
export function yleinenTyyli(iso, ikkuna, asetukset = YLEINEN) {
  return {
    yleinen: true,
    ikkuna,
    vuoto: asetukset.vuoto,
    jatkuva: true,
    otsikko: iso,
    /*
     * Naapurien ÄÄRIVIIVOJA ei piirretä lainkaan: jatkuvassa pinnassa
     * naapurilla on jo oma maastonsa, ja rajaviiva on juuri se sauma,
     * jonka omistaja halusi pois. Kohdemaan rantaviiva jää — se ei ole
     * raja vaan meren reuna.
     */
    naapurit: [],
    /*
     * Joet ja järvet jatkuvat myös kohdemaan ulkopuolelle haaleina
     * (piirto.js osio 6a). Kreikan hyväksytyssä lehdessä ne katkeavat
     * rajaan; kytkin on siksi erillinen eikä `jatkuva`-lipun osa, jotta
     * pilottikuvaa ei tarvitse renderöidä uusiksi.
     */
    jatkuvatVedet: true,
    /* Kaupunkipisteet poimitaan aineistosta (aineisto.mjs paikat). */
    paikat: true,
  };
}

/**
 * Kuvan leveys pikseleinä yleisellä reitillä.
 *
 * `kuva` on kuvan laatikko laudan yksikköinä ja `asteleveys` sen leveys
 * asteina. Ks. YLEINEN.maksimiLeveys — kolme kattoa, pienin voittaa.
 */
export function yleinenLeveys(kuva, asteleveys, asetukset = YLEINEN) {
  const suhde = kuva.w / kuva.h;
  const budjetti = Math.sqrt(asetukset.pikselibudjetti * suhde);
  const aineisto = asteleveys * 60 * asetukset.pikseliaKaariminuutissa;
  return Math.max(1200, Math.round(
    Math.min(asetukset.maksimiLeveys, budjetti, aineisto) / 8,
  ) * 8);
}
