/*
 * FOKUSKOHTEET — MEKSIKO. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-chn.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Meksikossa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026). Meksikolla ei ollut
 * vielä yhtään fokuskohdetta, joten Templo Mayor olisi jäänyt
 * kokonaan pois — mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.MEX, tiedosto MEX.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto. Tiedosto on tarkoituksella yhden kohteen mittainen
 * ja odottaa ensimmäistä varsinaista Meksiko-erää.
 *
 * TÄMÄ ON ERÄN AINOA KOHDE AMERIKOISSA, ja se on tietoinen valinta
 * eikä sattuma: ihme-erä katsoo koko maailmaa, ei vain Vanhaa
 * maailmaa. Pohjois- ja Etelä-Amerikan muut kadonneet odottavat omia
 * fokuslehtiään ja omaa erää.
 *
 * ── MEXICO CITY ON PELILAATTA, TEMPLO MAYOR EI OLE ─────────────────
 *
 * Sama sääntö ja sama ratkaisu kuin Forum Romanumilla Roomassa
 * (js/packs/fokuskohteet-ita.js): kohde on yksi nimetty paikka
 * kaupungin sisällä, ei toinen Mexico City. Laudalla merkki on 5,9
 * yksikköä kaupunkilaatasta (2530,0 / 2549,8), joten merkit erottuvat
 * toisistaan.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Rivillä on vain `maailmankartta`, koska Euroopan lauta ei kata
 * Amerikkaa. Kaava on maailmankartan Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76, tools/tee-fokuskartta.mjs
 * laudanProjektio). Piste osuu MEX-lehden rajaukseen (x 1698–3133,
 * y 1958–2834).
 *
 * HUOM LAUDAN OMASTA LAATASTA: Mexico Cityn laatta on laudalla
 * kohdassa 2530,0 / 2549,8, mutta kaupungin omista asteista laskettu
 * piste on 2528,9 / 2555,6 — pystysuunnassa lähes kuuden yksikön ero.
 * Laattojen paikat on aseteltu laudalle sommittelun ehdoilla, ja
 * KOHTEEN PISTE ON LASKETTU ASTEISTA eikä siirretty laatan mukaan:
 * lehden kuva on piirretty samalla kaavalla, joten laskettu piste on
 * se, joka osuu oikeaan kohtaan MAASTOA. Sama sääntö kuin muillakin
 * tämän erän kohteilla.
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli "Templo
 * Mayor" 27.8.2026 — ei työaineistoa, joten lähderivi osoittaa
 * suoraan artikkeliin.
 */
export const FOKUSKOHTEET_MEX = [
  {
    /*
     * TEMPLO MAYOR. −99,13278 E / 19,4333 N — en-Wikipedia "Templo
     * Mayor" (19°25′59,88″N 99°7′58,008″W). Piste on temppelin oma
     * paikka Seminario- ja Justo Sierra -katujen välisessä korttelissa,
     * Zócalon koillispuolella.
     *
     * ESITYSTAPA ON "KADONNUT" (`kadonnut: true`). Pyramidi purettiin
     * vuonna 1521 ja sen kivet käytettiin siirtomaakaupungin
     * rakennusaineeksi; paikan tarkka sijaintikin unohtui. Kaivauksissa
     * vuodesta 1978 on paljastunut perustuksia ja aiempien
     * rakennusvaiheiden kerroksia, ja niiden vieressä on museo — mutta
     * itse temppeliä ei ole. Kartalla siis tähti ja kortissa vain
     * ihmekuva; selite kertoo, mitä paikalla nyt on.
     */
    id: 'templo-mayor',
    nimi: 'Templo Mayor',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi temppeli rakennettiin seitsemän kertaa päällekkäin?',
      'Mistä temppelin paikka lopulta löytyi?',
    ],
    korostukset: ['Tenochtitlán|Tenochtitlánissa', 'Huitzilopochtli'],
    nappi: 'Kaksoistemppeli järvikaupungin keskellä',
    laudat: {
      maailmankartta: { x: 2528.9, y: 2555.6 },
    },
    teksti: 'Templo Mayor oli mexica-kansan pääpyhäkkö heidän '
      + 'pääkaupungissaan Tenochtitlánissa, joka seisoi saarella '
      + 'keskellä järveä nykyisen Mexico Cityn kohdalla. Nahuatliksi '
      + 'se oli Huēyi Teōcalli, "suuri jumalanhuone". Portaikkoja oli '
      + 'kaksi, koska pyramidin päällä oli kaksi pyhäkköä: '
      + 'sodanjumala Huitzilopochtlin ja sateen ja maanviljelyn '
      + 'jumalan Tlálocin. Pohjaltaan rakennus oli noin 100 × 80 '
      + 'metriä ja hallitsi koko pyhää piiriä. Ensimmäinen temppeli '
      + 'aloitettiin pian vuoden 1325 jälkeen, ja sen päälle '
      + 'rakennettiin kuusi uutta kerrosta — suurin laajennus tehtiin '
      + '1454. Espanjalaiset purkivat rakennuksen 1521, ja sen kivistä '
      + 'nousi siirtomaakaupunki.',
    lahde: 'en-Wikipedia "Templo Mayor", johdanto sekä osiot "Early '
      + 'history" ja "Discovery and excavation" (tarkistettu '
      + '27.8.2026).',
    /*
     * MATKAKIRJAN IHME (kadonnut) — säännöt js/packs/fokuskohteet-grc.js:n
     * samannimisessä lohkossa. Kortissa on vain tämä kuva.
     *
     * LÖYTÖTARINA ON SELITTEEN LOPPU, koska se on kohteen paras
     * nykypäivä: 21.2.1978 sähkölaitoksen kaivuumiehet osuivat runsaan
     * kahden metrin syvyydessä 3,25-metriseen kivikiekkoon, jonka
     * reliefi esittää Coyolxauhquia — ja se käynnisti koko kaivauksen.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-templo-mayor.webp',
      kadonnut: true,
      selite: 'Templo Mayor oli Tenochtitlánin kaksoispyhäkkö: yksi '
        + 'pyramidi, kaksi portaikkoa ja huipulla kaksi temppeliä, '
        + 'Huitzilopochtlin ja Tlálocin. Juhlissa portaita nousivat '
        + 'kulkueet, ja huipulla uhrattiin jumalille myös sotavankeja. '
        + 'Pyramidin perustusten sisään haudattiin uhrikätköjä, joihin '
        + 'ladottiin verolahjoja valtakunnan joka kolkasta: koralleja, '
        + 'simpukoita sekä jaguaarien ja kotkien luita. '
        + 'Espanjalaiset purkivat temppelin '
        + 'vuonna 1521, ja paikan sijainti unohtui vuosisadoiksi. '
        + 'Vuonna 1978 sähkötyömiehet osuivat kaivaessaan valtavaan '
        + 'kivikiekkoon, ja siitä alkaneissa kaivauksissa löytyi yli '
        + 'kaksisataa kätköä ja temppelin perustukset: ne ovat nyt '
        + 'nähtävissä '
        + 'katutason alapuolella Zócalon kulmassa katedraalin vieressä.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
