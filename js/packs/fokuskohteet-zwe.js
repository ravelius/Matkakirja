/*
 * FOKUSKOHTEET — ZIMBABWE. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-afg.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Zimbabwessa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026). Zimbabwella ei ollut
 * vielä yhtään fokuskohdetta, mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.ZWE, tiedosto ZWE.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto. Tiedosto on tarkoituksella yhden kohteen mittainen
 * ja odottaa ensimmäistä varsinaista Zimbabwe-erää.
 *
 * TÄMÄ ON ERÄN AINOA KOHDE SAHARAN ETELÄPUOLELLA, ja se on tietoinen
 * valinta: ihme-erä katsoo koko maailmaa. Suuri Zimbabwe on lisäksi
 * pelille jo tuttu — laudan afrikkalainen aarre on Suuren Zimbabwen
 * kivilintu (js/muutokset.js v203) — joten kohde sitoo ihme-erän
 * pelin omaan tarinaan.
 *
 * ── ESITYSTAPA ON "YHÄ OLEMASSA" ───────────────────────────────────
 *
 * `kadonnut: false`. Kivimuurit ovat pystyssä: suuren aitauksen muuri
 * on yhä yksitoista metriä korkea ja kartiotorni seisoo sen sisällä.
 * Kadonnut on KAUPUNKI muurien sisältä ja ympäriltä — savimajat,
 * olkikatot ja niissä asuneet ihmiset. Ihmekuva näyttää aitauksen
 * asuttuna, valokuva tyhjänä. Kartalla säilyy siis kohteen oma merkki,
 * pääkuvana on Commons-valokuva nykytilasta ja ihmekuva aukeaa sen
 * alta "Koe ihme" -napista.
 *
 * ── YKSI RAJAUS, JOKA ON KIRJOITETTAVA AUKI ────────────────────────
 *
 * Lähdeartikkeli kertoo, että Rhodesian valkoinen hallinto painosti
 * arkeologeja kiistämään paikan afrikkalaisen alkuperän ja että
 * afrikkalainen alkuperä oli tutkijoiden yhteinen kanta vasta
 * 1950-luvulla. Tämä EI ole sivuseikka vaan osa kohteen historiaa, ja
 * teksti sanoo sen — mutta yhtenä virkkeenä ja tapahtumana, ilman
 * aikakauden muun politiikan kuvausta. Sama rajaus kuin Syyrian ja
 * Afganistanin tiedostoissa.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Rivillä on vain `maailmankartta`. Kaava on maailmankartan Millerin
 * lieriö (LEVEYS 12000 / LON0 −175 / POHJOINEN 76,
 * tools/tee-fokuskartta.mjs laudanProjektio). Kaava toimii yhtä hyvin
 * eteläisellä pallonpuoliskolla kuin pohjoisella — se on sama kaava,
 * jolla ZWE-lehden kuva on piirretty — ja piste osuu lehden rajaukseen
 * (x 6627–6982, y 3695–4013).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkeli "Great
 * Zimbabwe" 27.8.2026 — ei työaineistoa, joten lähderivi osoittaa
 * suoraan artikkeliin.
 */
export const FOKUSKOHTEET_ZWE = [
  {
    /*
     * SUURI ZIMBABWE. 30,93333 E / −20,26667 N — en-Wikipedia "Great
     * Zimbabwe" (20°16′S 30°56′E). Piste on raunioalue Masvingon
     * lähellä maan kaakkoisilla kukkuloilla.
     */
    id: 'suuri-zimbabwe',
    nimi: 'Suuri Zimbabwe',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miten muurit pysyvät pystyssä ilman laastia?',
      'Miksi kaupunki lopulta hylättiin?',
    ],
    korostukset: ['shona|shonojen', 'kuivamuuraus|kuivamuurattu'],
    nappi: 'Kivikaupunki, joka antoi nimen koko maalle',
    laudat: {
      maailmankartta: { x: 6864.4, y: 3896.3 },
    },
    teksti: 'Suuri Zimbabwe oli kaupunki nykyisen Zimbabwen '
      + 'kaakkoisilla kukkuloilla Masvingon lähellä. Paikalla on '
      + 'asuttu noin vuodesta 1000, ja 1200-luvulta lähtien se oli '
      + 'Suuren Zimbabwen kuningaskunnan pääkaupunki. Kivikaupunki '
      + 'kattaa 7,22 neliökilometriä, ja se on suurin esikoloniaalinen '
      + 'kivirakennelma eteläisessä Afrikassa. Rakentajat olivat '
      + 'shonojen esi-isiä. Alue jakautuu kolmeen osaan: kukkulalinnaan, '
      + 'laaksoraunioihin ja suureen aitaukseen, jonka noin 250 metriä '
      + 'kiertävä muuri on paikoin yksitoista metriä korkea ja '
      + 'kokonaan kuivamuurattu ilman laastia. Muurien välissä seisoo '
      + 'kartion muotoinen torni. Väkiluvusta on kaksi arviota: '
      + 'perinteinen 18 000 ja uudempi tutkimus, jonka mukaan asukkaita '
      + 'ei ollut yli 10 000. Kaupunki hylättiin 1500- tai 1600-luvulla. '
      + 'Rhodesian valkoinen hallinto painosti 1900-luvulla arkeologeja '
      + 'kiistämään paikan afrikkalaisen alkuperän, ja tutkijoiden '
      + 'yhteinen kanta siitä syntyi vasta 1950-luvulla.',
    lahde: 'en-Wikipedia "Great Zimbabwe", johdanto sekä osiot '
      + '"Description" ja "Layout" (tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (4672×3104, CC BY-SA 4.0, Janice Bell) ja katsottu
     * silmin: ilmakuva suuresta aitauksesta ja sen viereisistä
     * raunioista kukkulalinnasta katsottuna, ei ihmisiä. Sama aitaus
     * ja lähes sama katselusuunta kuin ihmekuvassa, joten pari toimii.
     */
    kuva: {
      tiedosto: 'Great-zim-aerial-looking-West.JPG',
      selite: 'Suuren Zimbabwen suuri aitaus ja sen viereiset '
        + 'laaksorauniot kukkulalinnasta katsottuna.',
      lahde: 'Janice Bell, Wikimedia Commons (CC BY-SA 4.0)',
    },
    /* MATKAKIRJAN IHME (yhä olemassa) — säännöt fokuskohteet-grc.js:ssä.
       `kadonnut: false`, joten "Koe ihme" -nappi tulee valokuvan alle. */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-suuri-zimbabwe.webp',
      kadonnut: false,
      selite: 'Suuren Zimbabwen suuri aitaus rakennettiin 1200- ja '
        + '1300-luvuilla kuningashuoneen asunnoksi, ja muurien sisällä '
        + 'seisoi savimajoja olkikattoineen. Kaupunki eli kaukokaupasta: '
        + 'sen kulta ja norsunluu kulkivat Intian valtameren rannikolle, '
        + 'ja raunioista on kaivettu kiinalaista selaadonia, '
        + 'persialaista lasia ja Kilwan sulttaanikunnan kolikoita. '
        + 'Kivityö tehtiin ilman '
        + 'laastia: lohkot ladottiin niin tarkasti, että muuri on '
        + 'seissyt seitsemän vuosisataa. Majat ovat maatuneet pois ja '
        + 'kaupunki hylättiin 1500- tai 1600-luvulla, mutta muuri ja '
        + 'sen sisällä oleva kartiotorni ovat paikallaan — ja koko maa '
        + 'sai itsenäistyessään nimensä tämän paikan mukaan.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
