/*
 * FOKUSKOHTEET — IRAN. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-jor.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Iranissa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026). Iranilla ei ollut
 * vielä yhtään fokuskohdetta, mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.IRN, tiedosto IRN.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto. Tiedosto on tarkoituksella yhden kohteen mittainen
 * ja odottaa ensimmäistä varsinaista Iran-erää.
 *
 * ── PERSEPOLIS ON PELILAATTA, APADANA EI OLE ───────────────────────
 *
 * Persepolis on laudalla oma laattansa (7596,0 / 2183,9) ja sillä on
 * jo oma lehtensä pelissä (v932). Kohde tässä listassa ei siis ole
 * Persepolis vaan APADANA: yksi rakennus terassilla, Dareios suuren
 * suunnitteleman kaupungin suurin sali. Sama suhde kuin Forum
 * Romanumilla Roomaan (js/packs/fokuskohteet-ita.js) — nimetty paikka
 * kohteen sisällä, ei toinen kopio kohteesta itsestään.
 *
 * MERKKI OSUU LAATAN VIEREEN alle yhden lautayksikön päähän, koska
 * terassi on pieni ja lauta suuri. Niputuspassi (js/fokusniput.js)
 * kasaa merkin kaupungin oikealle puolelle sarakkeeseen katkoviivan
 * kanssa — täsmälleen niin kuin Tuileries'n merkki tekee Pariisissa
 * (js/packs/fokuskohteet-fra.js).
 *
 * ── ESITYSTAPA ON "YHÄ OLEMASSA" ───────────────────────────────────
 *
 * `kadonnut: false`. Apadanan portaikot reliefeineen, sen perustus ja
 * neljätoista pylvästä ovat paikallaan, ja terassilla käy matkailijoita
 * päivittäin. Kadonnut on KATTO ja 58 pylvästä 72:sta. Kartalla säilyy
 * siis kohteen oma merkki, pääkuvana on Commons-valokuva nykytilasta
 * ja ihmekuva aukeaa sen alta "Koe ihme" -napista.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Rivillä on vain `maailmankartta`; Euroopan lauta ei kata Irania.
 * Kaava on maailmankartan Millerin lieriö (LEVEYS 12000 / LON0 −175 /
 * POHJOINEN 76, tools/tee-fokuskartta.mjs laudanProjektio). Kaava
 * validoitiin ennen käyttöä nimenomaan tällä laatalla: Persepoliksen
 * asteista laskettu piste (7596,4 / 2183,2) vastaa laudalle kirjattua
 * laattaa (7596,0 / 2183,9) alle yhden yksikön tarkkuudella. Piste
 * osuu IRN-lehden rajaukseen (x 7185–8060, y 1707–2452).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkelit
 * "Apadana" ja "Persepolis" 27.8.2026 — ei työaineistoa, joten
 * lähderivit osoittavat suoraan artikkeleihin.
 */
export const FOKUSKOHTEET_IRN = [
  {
    /*
     * APADANA. 52,890 E / 29,935 N — en-Wikipedia "Persepolis"
     * (tietolaatikon coordinates); Apadana-artikkelilla itsellään ei
     * ole koordinaattia, ja sali on terassin länsireunalla eli
     * käytännössä samassa pisteessä laudan mittakaavassa.
     */
    id: 'apadana',
    nimi: 'Apadana',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Ketä salin portaiden reliefit esittävät?',
      'Miksi Persepolis paloi?',
    ],
    korostukset: ['Dareios|Dareios suuren', 'reliefi|reliefit'],
    nappi: 'Sali, jossa suurkuningas otti vastaan koko valtakunnan',
    laudat: {
      maailmankartta: { x: 7596.3, y: 2183.3 },
    },
    teksti: 'Apadana oli Persepoliksen terassin suurin rakennus ja '
      + 'akhaimenidien valtakunnan virallinen audienssisali. Se kuului '
      + 'Dareios suuren alkuperäiseen suunnitelmaan 400-luvun eaa. '
      + 'alkupuolelta, ja sen rakensi valmiiksi hänen poikansa Kserkses '
      + 'ensimmäinen. Katon kannatti 72 pylvästä, joista jokainen oli '
      + 'kaksikymmentäneljä metriä korkea. Saliin nousi kaksi leveää '
      + 'portaikkoa, joiden kylkiin on kaiverrettu reliefit '
      + 'valtakunnan kansojen lähetystöistä: kukin tuo kuninkaalle '
      + 'omaa tuotettaan, lyydialaiset ja armenialaiset viiniä, toiset '
      + 'kankaita, aseita tai eläimiä. Sali tuhoutui vuonna 331 eaa. '
      + 'Aleksanteri Suuren sotajoukon tulipalossa, ja pylväiden kiviä '
      + 'käytettiin myöhemmin lähikylien rakennusaineeksi.',
    lahde: 'en-Wikipedia "Apadana", johdanto ja osiot "Description" ja '
      + '"Measurements"; portaiden reliefit ja terassin rakennukset '
      + 'en-Wikipedia "Persepolis" (tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (4403×2936, CC BY-SA 4.0, Bernard Gagnon) ja katsottu
     * silmin: Apadanan säilyneet pylväät terassilla, taustalla laakso
     * ja vuoret, ei tunnistettavia ihmisiä. Sama terassi ja sama
     * suunta kuin ihmekuvassa.
     */
    kuva: {
      tiedosto: 'Persepolis - Apadana 01.jpg',
      selite: 'Apadanan säilyneitä pylväitä Persepoliksen terassilla. '
        + 'Katon palon jälkeen ne ovat kannatelleet vain taivasta.',
      lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 4.0)',
    },
    /* MATKAKIRJAN IHME (yhä olemassa) — säännöt fokuskohteet-grc.js:ssä.
       `kadonnut: false`, joten "Koe ihme" -nappi tulee valokuvan alle. */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-persepolis.webp',
      kadonnut: false,
      selite: 'Apadanan kattoa kannatti 72 pylvästä, jokainen '
        + 'kaksikymmentäneljä metriä korkea, ja saliin noustiin kahta '
        + 'leveää portaikkoa, joiden reliefeissä valtakunnan kansojen '
        + 'lähetystöt tuovat lahjojaan suurkuninkaalle. Katto paloi '
        + 'vuonna 331 eaa., ja pylväitä alettiin purkaa rakennusaineeksi. '
        + '1900-luvun alkuun mennessä niitä oli pystyssä enää '
        + 'kolmetoista; yksi kaatunut mutta ehjä pylväs nostettiin '
        + 'takaisin 1970-luvulla, joten terassilla seisoo nyt neljätoista.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
