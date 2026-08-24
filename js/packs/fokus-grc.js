/*
 * FOKUSNÄKYMÄN LISÄNIMET — KREIKKA (pilotti, omistaja 24.8.2026).
 *
 * Raamatun osio "Fokusmoodi": *"Laatan lisäksi maan muita kaupunkeja
 * (ei pelattavia), jokia, järviä, vuoria."*
 *
 * === NÄMÄ NIMET OVAT NYT POIS KÄYTÖSTÄ (FOKUS_SVG_NIMET) ===
 *
 * Omistajan pelitestipalaute v1095:stä oli, että fokusnäkymän on
 * näytettävä TÄSMÄLLEEN hyväksytyltä prototyyppikuvalta. Prototyypissä
 * nimet ovat osa lehteä — samaa mustetta, samassa harvennuksessa, meren
 * nimi kaartuvana kursiivina ulapalla — eikä sitä saa SVG-tekstillä
 * laudan päällä. Siksi nimet POLTETAAN NYT KUVAAN
 * (tools/fokuskartta/maat.mjs), ja tämä taulu jää lipun taakse.
 *
 * Koodia ei poistettu: jos kuvaan poltetut nimet osoittautuvat
 * lähizoomissa liian epätarkoiksi, lippu käännetään takaisin ja nimet
 * palaavat SVG:nä. Silloin on muistettava karsia samat nimet kuvasta,
 * tai ne tulevat kahteen kertaan.
 *
 * KURATOITU KÄSIN, EI POIMITTU AINEISTOSTA. Nämä ovat isoisän atlaksen
 * harvoja merkintöjä eivätkä täydellinen luettelo: neljä kaupunkia,
 * kolme vuorta ja kolme merta. Vähemmän on tässä tarkoitus — fokusmoodi
 * on annostelua.
 *
 * KOORDINAATIT OVAT PELILAUDAN OMIA (maailmankartta, Millerin lieriö
 * LEVEYS 12000 / LON0 -175 / POHJOINEN 76). Ne on laskettu kerran
 * asteista laudan kaavalla — sama kaava, jolla fokuskartan kuva
 * renderöidään (tools/fokuskartta/piirto.js laudanProjektio) — eikä
 * pelissä ole projektiokoodia lainkaan. Asteet ovat mukana
 * kommentissa, jotta luvut voi laskea uudelleen jos lauta joskus
 * vaihtaa projektiota.
 *
 * Sijainnit: Wikipedia / Natural Earth 10m. Merten nimien paikat ovat
 * karttatypografiaa eivätkä paikkatietoa — ne on aseteltu silmällä
 * sinne, missä nimi mahtuu ulapalle.
 */

/*
 * ESIRENDERÖITYJEN POHJIEN RAJAUKSET — repossa eikä ämpärissä.
 *
 * Ämpärin julkinen r2.dev-osoite EI lähetä CORS-otsakkeita, joten
 * selaimen fetch() kaataa JSON-haun vaikka itse kuva latautuu
 * <img>-elementillä ongelmitta (mitattu 24.8.2026: Kreikan pohja jäi
 * tuotannossa näkymättä juuri tästä syystä). Rajaus on pieni ja
 * muuttumaton, joten se asuu tässä — kuva pysyy ämpärissä. Luvut ovat
 * suoraan tools/tee-fokuskartta.mjs:n kirjoittamasta
 * GRC.json-tiedostosta (tasaus todennettu: Ateena 0,7 lautayksikköä).
 * Uusi maa = uusi rivi tähän samalla kun kuva viedään ämpäriin.
 *
 * === KAKSI LAATIKKOA (v2, omistajan pelitestipalaute v1095:stä) ===
 *
 *   bbox    Mihin KUVA asetetaan. Kuva on kokonainen atlaksen lehti ja
 *           OPAAKKI: se peittää laudan oman grafiikan alueellaan.
 *
 *   rajaus  LEHDEN IKKUNA eli se, mitä kehysviiva rajaa — tähän peli
 *           ajaa kameran. Kuvan ja ikkunan väliin jää vuotoa (15 % joka
 *           reunalla), koska ruudun kuvasuhde ei ole koskaan lehden
 *           kuvasuhde: kamera-ajo sovittaa ikkunan ruutuun ja näyttää
 *           yli menevässä suunnassa aina hitusen enemmän. Vuoto estää
 *           sauman laudan grafiikkaan kaikissa vaakakuvasuhteissa
 *           (1,23–2,08); pystyssä kuvan häivytetty uloin reuna sulattaa
 *           sauman lautaan.
 *
 * Kuva on 6400 x 4000 eli lähes neljä kertaa entistä useampi pikseli
 * (omistaja: *"taustakartan resoluutio ylös — kuva pikselöityy
 * fokuszoomilla"*). Fokusrajauksessa lehti näkyy kokonaan eikä sitä
 * suurenneta lainkaan: iPadin verkkokalvonäytöllä kuvaa on noin
 * kaksinkertaisesti yli tarpeen. Ylärajan asettaa iOS:n purettu kuva
 * eikä tiedostokoko — ks. tools/tee-fokuskartta.mjs.
 */
export const FOKUS_POHJAT = {
  GRC: {
    lauta: 'maailmankartta',
    bbox: { x: 6329.2, y: 1681.71, w: 608.26, h: 380.16 },
    rajaus: { x: 6399.39, y: 1725.58, w: 467.89, h: 292.43 },
    tiedosto: 'GRC.webp',
  },
};

/*
 * LAUTOJEN PROJEKTIOT — vain mittajanaa varten (js/fokusmitat.js).
 *
 * Fokusnäkymän mittajana on RUUTUUN ankkuroitu ja laskee pituutensa
 * siitä, mitä ruudulla oikeasti näkyy. Siihen tarvitaan kaksi asiaa,
 * joita pelissä ei muuten ole: montako lautayksikköä pituusaste on, ja
 * mikä leveysaste on laudan y-koordinaatilla — Millerin lieriössä
 * kilometri on eri määrä yksiköitä Kreetalla kuin Thessalonikissa.
 *
 * LUVUT OVAT SAMAT KUIN KUVAN RENDERÖINNISSÄ
 * (tools/tee-fokuskartta.mjs LAUDAT). Maailmankartan omat vakiot ovat
 * tools/tee-maailmankartta.mjs:ssä (LEVEYS 12000, LON0 -175, POHJOINEN
 * 76) ja kaava tools/vanha-maailma.mjs sovitaMaailma; Eurooppa on
 * mukana katselutilaa varten (x = (lon + 11) · 19,2).
 *
 * Jos lauta joskus vaihtaa projektiota, tämän ja työkalun on
 * muututtava yhdessä — muuten jana väittäisi eri kilometrejä kuin se
 * kuva, jonka päällä se piirretään.
 */
export const FOKUS_LAUTAPROJEKTIOT = {
  maailmankartta: {
    tyyppi: 'miller', leveys: 12000, lon0: -175, pohjoinen: 76,
  },
  europe: {
    tyyppi: 'tasavali', lonA: 19.2, lonB: 11 * 19.2, latA: -26.3, latB: 72 * 26.3,
  },
};

/*
 * MAAN NIMI MAAN OMALLA KIELELLÄ — fokusnäkymän kartuutsin alarivi
 * (omistaja 25.8.2026).
 *
 * Kartuutsissa on suomenkielinen nimi (KREIKKA, laudan omasta
 * countryShapes-taulusta) ja sen alla viivan takana maan oma nimi.
 * Kreikan muoto on ΕΛΛΑΣ eikä nykykreikan Ελλάδα: se on
 * katharevousa-asu, jota 1873-atlakset käyttivät — ja täsmälleen sama
 * kuin kuvan vesileima (tools/fokuskartta/maat.mjs `vesileima`).
 * Latinalainen rinnakkaismuoto on perässä, koska kreikkalaiset
 * kirjaimet eivät kerro kaikille pelaajille miltä nimi kuulostaa.
 *
 * `valtiomuoto` on aikakauden hallintomuoto isoisän matkan aikaan
 * (Kreikka oli 1832–1924 ja 1935–1973 kuningaskunta). Se on
 * VAPAAEHTOINEN lisä: se ladotaan samalle riville pienenä kursiivina,
 * ja jos rivi ei mahdu, kenttä jätetään pois maasta eikä katkaista
 * CSS:llä.
 *
 * EI MUISTINVARAISIA KÄÄNNÖKSIÄ. Taulussa on vain Kreikka; uusi maa on
 * yksi rivi lisää, ja sen nimimuoto on tarkistettava samasta
 * lähteestä kuin muukin sisältö.
 */
export const FOKUS_MAANIMET = {
  GRC: { paikallinen: 'ΕΛΛΑΣ · Hellas', valtiomuoto: 'kuningaskunta v. 1873' },
};

/*
 * Piirtääkö peli lisänimet SVG:nä kuvan päälle?
 *
 * EI PIIRRÄ. Nimet ovat nyt kuvassa (ks. tiedoston alku), ja SVG-nimet
 * olisivat niiden päällä tuplana. Lippu on olemassa, jotta paluu on
 * yhden rivin mittainen, jos kuvaan poltetut nimet eivät kestä
 * lähizoomia.
 */
export const FOKUS_SVG_NIMET = false;

export const FOKUS_LISANIMET = {
  GRC: {
    lauta: 'maailmankartta',
    /*
     * Muut kaupungit: EI pelattavia laattoja vaan pieniä pisteitä.
     * Nafplio on mukana tarinan takia (Kreikan ensimmäinen pääkaupunki,
     * 1829–1834 — isoisän matkan aikaan tuore muisto), vaikka se on
     * näistä pienin.
     */
    kaupungit: [
      // 22,9444 E / 40,6401 N
      { nimi: 'Thessaloniki', x: 6598.1, y: 1777.7 },
      // 21,7346 E / 38,2466 N
      { nimi: 'Patras', x: 6557.8, y: 1871.3, ank: 'end' },
      // 20,8537 E / 39,6650 N
      { nimi: 'Ioannina', x: 6528.5, y: 1816, ank: 'end' },
      // 22,8069 E / 37,5675 N
      { nimi: 'Nafplio', x: 6593.6, y: 1897.5 },
    ],
    /*
     * Vuoret: kolmio ja korkeus metreinä. Olympos on ainoa, jonka
     * kaikki tuntevat, mutta Parnassos on Delfoin vuori ja Taÿgetos
     * Spartan — kolmella saa Kreikan selkärangan näkyviin.
     */
    vuoret: [
      // 22,3586 E / 40,0853 N
      { nimi: 'Olympos', x: 6578.6, y: 1799.5, m: 2918, iso: true },
      // 22,6231 E / 38,5367 N
      { nimi: 'Parnassos', x: 6587.4, y: 1860.1, m: 2457 },
      // 22,3528 E / 36,9564 N
      { nimi: 'Taÿgetos', x: 6578.4, y: 1921, m: 2404 },
    ],
    /*
     * Meret: harvaan harvennettua kursiivia ulapalle, 1873-atlaksen
     * tapaan. Kulma seuraa meren muotoa.
     */
    meret: [
      // 25,15 E / 39,05 N
      { nimi: 'Egeanmeri', x: 6671.7, y: 1840.1, kulma: -7 },
      // 19,7 E / 37,9 N
      { nimi: 'Joonianmeri', x: 6490, y: 1884.7, kulma: -18 },
      // 24,6 E / 35,9 N
      { nimi: 'Kreetanmeri', x: 6653.3, y: 1961.3, koko: 0.8 },
    ],
  },
};
