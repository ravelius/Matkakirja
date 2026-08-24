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
   * Venäjä ulottuu laudalla Kaliningradista Tyynellemerelle. Yhden
   * lehden ikkuna sen yli olisi 160 astetta leveä eikä esittäisi
   * mitään; Euroopan lehdellä Venäjä on Euroopan puoleinen Venäjä,
   * Moskovasta ja Pietarista Uralille. Aasian puoli on oman lautansa
   * ja oman lehtensä asia, jos sellainen joskus tehdään.
   */
  RUS: {
    laatikko: {
      lon0: 19.6, lon1: 60.5, lat0: 43.2, lat1: 69.5,
    },
  },
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
