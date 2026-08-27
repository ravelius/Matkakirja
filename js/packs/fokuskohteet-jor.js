/*
 * FOKUSKOHTEET — JORDANIA. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-egy.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Jordaniassa on
 * toisin.
 *
 * ── MIKSI TÄMÄ TIEDOSTO ON OLEMASSA ────────────────────────────────
 *
 * Matkakirjan ihmeiden MAAILMAN ERÄ (27.8.2026). Jordanialla ei ollut
 * vielä yhtään fokuskohdetta, mutta maan fokuslehti on jo olemassa
 * (js/packs/fokus-grc.js FOKUS_POHJAT.JOR, tiedosto JOR.webp), joten
 * merkillä on lehti, jonka päälle asettua. Se oli lisäyksen ainoa
 * tekninen ehto. Tiedosto on tarkoituksella yhden kohteen mittainen
 * ja odottaa ensimmäistä varsinaista Jordania-erää.
 *
 * ── PETRA ON PELILAATTA, AL-KHAZNEH EI OLE ─────────────────────────
 *
 * Tämä on erän tarkin pelilaattarajaus, joten se kirjoitetaan auki.
 * Petra on laudalla oma laattansa (7036,0 / 2188,8), eikä toista
 * Petraa saa syntyä. Al-Khazneh ei ole Petra vaan YKSI HAUTA sen
 * sisällä — sama suhde kuin Forum Romanumilla Roomaan tai Etnalla
 * Sisiliaan (js/packs/fokuskohteet-ita.js). Kohteen nimi, teksti ja
 * kysymykset koskevat hautaa; kaupunki on taustaa.
 *
 * MYÖS IHMEKUVA VAATII TÄMÄN RAJAUKSEN. Kuva näyttää Siqin suulta
 * avautuvan aukion ja yhden julkisivun, ei koko kaupunkia. Jos kohde
 * olisi "Petra", kuva lupaisi enemmän kuin näyttää.
 *
 * ── ESITYSTAPA ON "YHÄ OLEMASSA" ───────────────────────────────────
 *
 * `kadonnut: false`. Hauta on kallioon louhittu eikä pystytetty, joten
 * se on paikallaan lähes sellaisena kuin se tehtiin — Petran
 * parhaiten säilynyt rakennus. Kadonnut on siis KAUPUNKI sen ympäriltä:
 * ihmekuvassa aukio on täynnä ihmisiä, kameleja ja katoksia,
 * valokuvassa se on tyhjä hiekkakenttä. Kartalla säilyy kohteen oma
 * merkki, pääkuvana on Commons-valokuva nykytilasta ja ihmekuva aukeaa
 * sen alta "Koe ihme" -napista.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * Rivillä on vain `maailmankartta`; Euroopan lauta ei kata Jordaniaa.
 * Kaava on maailmankartan Millerin lieriö (LEVEYS 12000 / LON0 −175 /
 * POHJOINEN 76, tools/tee-fokuskartta.mjs laudanProjektio), validoitu
 * ennen käyttöä jo kirjatuilla kohteilla. Piste osuu JOR-lehden
 * rajaukseen (x 6972–7169, y 2028–2238).
 *
 * ── FAKTAPOHJA ─────────────────────────────────────────────────────
 *
 * en-Wikipedia raakatekstinä (index.php?action=raw) artikkelit
 * "Al-Khazneh" ja "Petra" 27.8.2026 — ei työaineistoa, joten
 * lähderivit osoittavat suoraan artikkeleihin.
 */
export const FOKUSKOHTEET_JOR = [
  {
    /*
     * AL-KHAZNEH. 35,451617 E / 30,32245 N — en-Wikipedia "Al-Khazneh"
     * (artikkelin oma koordinaatti). Piste on haudan oma paikka Siqin
     * itäpäässä; Petran laatta on 28 lautayksikköä koillisessa, joten
     * merkit erottuvat selvästi toisistaan.
     */
    id: 'al-khazneh',
    nimi: 'Al-Khazneh',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miksi hautaa kutsutaan aarrekammioksi?',
      'Miten nabatealaiset saivat vettä keskelle aavikkoa?',
    ],
    korostukset: ['nabatealaiset|nabatealaisten', 'Siq|Siq'],
    nappi: 'Julkisivu, joka louhittiin kalliosta ylhäältä alas',
    laudat: {
      maailmankartta: { x: 7015.1, y: 2169.1 },
    },
    teksti: 'Petran kuuluisin rakennus ei ole rakennus vaan kalliosta '
      + 'louhittu hauta. Al-Khazneh tehtiin 100-luvun alussa jaa. '
      + 'nabatealaisten kuninkaan Aretas neljännen aikana '
      + 'mausoleumiksi ja hautakammioksi, ja sen julkisivu on 24 metriä '
      + 'leveä ja 37 metriä korkea. Muodot lainaavat Aleksandrian '
      + 'hellenististä arkkitehtuuria: rikottu päätykolmio, sen sisällä '
      + 'pyöreä tholos ja huipulla kotkia. Alaosassa portin molemmin '
      + 'puolin ovat matkaajia suojelevat kaksoset Kastor ja Polydeukes. '
      + 'Nimi tulee tholoksen päällä olevasta kiviuurnasta, jonka '
      + 'beduiinit uskoivat kätkevän aarteen — uurna on umpinaista '
      + 'hiekkakiveä, ja siinä on satoja luodinjälkiä. Sisällä on '
      + 'koruton pääkammio ja kolme eteiskammiota. Ainoa tie perille käy '
      + 'Siq-rotkosta, joka on paikoin vain kolme metriä leveä.',
    lahde: 'en-Wikipedia "Al-Khazneh", johdanto sekä osiot "Name" ja '
      + '"Description"; mitat ja Siqin leveys en-Wikipedia "Petra", '
      + 'osiot "Architecture" ja "Site" (tarkistettu 27.8.2026).',
    /*
     * NYKYTILAN VALOKUVA. Tarkistettu Commonsin imageinfo-rajapinnalla
     * 27.8.2026 (2048×3072, CC BY 4.0, Vyacheslav Argenberg) ja
     * katsottu silmin: julkisivu suoraan edestä, samasta suunnasta kuin
     * ihmekuvassa, ja aukiolla vain muutama kaukainen kävijä.
     * Sama tiedosto on jo käytössä nähtävyysjutuissa.
     */
    kuva: {
      tiedosto: 'Al-Khazneh, Petra, Jordan.jpg',
      selite: 'Al-Khaznen julkisivu Siqin päässä. Se on louhittu '
        + 'kokonaan hiekkakalliosta, ei muurattu.',
      lahde: 'Vyacheslav Argenberg, Wikimedia Commons (CC BY 4.0)',
    },
    /*
     * MATKAKIRJAN IHME (yhä olemassa) — säännöt js/packs/
     * fokuskohteet-grc.js:n samannimisessä lohkossa. `kadonnut: false`,
     * joten "Koe ihme" -nappi tulee yllä olevan valokuvan alle.
     *
     * SELITE KERTOO, MIKÄ KUVASSA ON MUUTTUNUT — hauta ei, vaan sen
     * ympäristö. Ilman tuota lausetta pelaaja etsisi kuvasta eroa
     * julkisivusta eikä löytäisi sitä.
     */
    ihme: {
      osoite: 'assets/kartat/ihmeet/ihme-petra.webp',
      kadonnut: false,
      selite: 'Al-Khazneh on säilynyt lähes sellaisena kuin se '
        + 'louhittiin, mutta kaupunki sen ympäriltä on kadonnut: '
        + 'Petrassa asui parhaimmillaan arviolta 20 000 ihmistä, ja '
        + 'karavaanitietä kulkeva suitsuke- ja mausteliikenne teki '
        + 'nabatealaisista rikkaita. Meriteiden yleistyminen ja vuoden '
        + '363 maanjäristys ajoivat kaupungin alamäkeen, ja lopulta '
        + 'paikalla asui vain muutamia paimentolaisia. Aukiolla haudan '
        + 'edessä käy nyt lähes miljoona matkailijaa vuodessa.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa '
        + 'nykymaailmassa',
    },
  },
];
