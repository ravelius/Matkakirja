/*
 * FOKUSKOHTEET — IRAK. Nostot, joissa huomio kääntyy pois
 * pelikaupungista.
 *
 * Sisartiedosto js/packs/fokuskohteet-grc.js:lle ja js/packs/
 * fokuskohteet-egy.js:lle. Kentät ja niiden perustelut on selitetty
 * Kreikan tiedoston alussa; tässä on vain se, mikä Irakissa on toisin.
 *
 * ── YKSI KOHDE, JA SE ON TIETOINEN VALINTA ─────────────────────────
 *
 * Omistajan tilaus 26.8.2026 (*"peliin voisi generoida kaikki antiikin
 * kadonneet ihmeet"*) toi tänne seitsemän ihmeen viimeisen: Babylonin
 * riippuvat puutarhat. Ne olisivat jääneet kokonaan pois, koska
 * Irakilla ei ollut yhtään fokuskohdetta — mutta maan fokuslehti on
 * olemassa (js/packs/fokus-grc.js FOKUS_POHJAT.IRQ, tiedosto
 * IRQ.webp), joten merkillä on lehti, jonka päälle asettua. Tiedosto
 * on siis tarkoituksella yhden kohteen mittainen ja odottaa
 * seuraavaa Irak-erää.
 *
 * ── KOORDINAATIT: VAIN MAAILMANKARTTA ──────────────────────────────
 *
 * IRQ-lehti on maailmankartan lauta, ja Babylon (44,4 E) on joka
 * tapauksessa Euroopan laudan kaavan itäpuolella (kaava kattaa
 * −11°…41°, js/packs/europe.js). Rivillä on siis vain
 * `maailmankartta`, samasta syystä kuin Turkin kahdella itäisimmällä
 * kohteella. Kaava on maailmankartan Millerin lieriö (LEVEYS 12000 /
 * LON0 −175 / POHJOINEN 76) ja se validoitiin ennen käyttöä kolmella
 * jo kirjatulla kohteella (Ateena, Efesos, Olympia: 0,1 yksikön
 * tarkkuus). Piste osuu IRQ-lehden rajaukseen (x 7067–7511,
 * y 1847–2269).
 *
 * ── SE, MITÄ TÄMÄ KOHDE EI VÄITÄ ───────────────────────────────────
 *
 * Riippuvat puutarhat ovat seitsemästä ihmeestä ainoa, jonka paikkaa
 * ei ole koskaan varmistettu, eikä Babylonista ole löytynyt niistä
 * arkeologista todistetta. Teksti sanoo sen suoraan eikä esitä
 * legendaa faktana — ja havainnekuvan selite toistaa saman. Merkki on
 * Babylonin raunioilla (32,5425 N / 44,42111 E — en-Wikipedia
 * "Babylon"), koska se on paikka, josta antiikin kirjoittajat
 * puhuivat; kartalla se on kohteen oma sijainti eikä väite kaivauksen
 * tuloksesta.
 *
 * ── KUVA ON PELIN OMA HAVAINNEKUVA ─────────────────────────────────
 *
 * Kuvakenttä on `osoite` eikä `tiedosto`: polku repoon
 * (assets/kartat/ihmeet/), ei Commonsiin, ja kuva syntyy
 * .github/workflows/generoi-ihmeet.yml -ajossa. Selite alkaa aina
 * sanalla "Havainnekuva" ja lähderivi on 'Matkakirjan havainnekuva' —
 * säännöt kokonaisuudessaan Kreikan tiedoston kadonneiden ihmeiden
 * lohkossa. Ennen kuvaerän ajoa tiedostoa ei ole, ja kohde toimii
 * silti.
 */
export const FOKUSKOHTEET_IRQ = [
  {
    id: 'babylonin-puutarhat',
    nimi: 'Babylonin riippuvat puutarhat',
    tyyppi: 'muu',
    symboli: 'historia',
    kysymykset: [
      'Miten vesi olisi saatu nostettua puutarhojen huipulle?',
      'Mitä Babylonin raunioilta on oikeasti löydetty?',
    ],
    korostukset: ['Nebukadnessar|Nebukadnessar toinen', 'Semiramis|Semiramikseen'],
    nappi: 'Ihme, jota ei ole koskaan löydetty',
    laudat: {
      maailmankartta: { x: 7314.0, y: 2087.4 },
    },
    teksti: 'Antiikin kirjoittajat kertoivat Babylonissa olleen '
      + 'porrastetut puutarhat: terassi toisensa päällä puita, pensaita '
      + 'ja köynnöksiä, kuin vihreä vuori savitiilistä. Kreikan sana '
      + 'kremastos ei tarkoita roikkumista vaan juuri sitä, että puut '
      + 'kasvoivat korotetulla rakenteella. Tarinan mukaan ne rakennutti '
      + 'Nebukadnessar toinen (605–562 eaa.) puolisolleen Amytikselle, '
      + 'joka ikävöi kotiseutunsa Meedian vihreitä kukkuloita; '
      + 'toinen perinne liittää ne kuningatar Semiramikseen. Puutarhat '
      + 'ovat seitsemästä ihmeestä ainoa, jonka paikkaa ei ole '
      + 'varmistettu: yksikään babylonialainen teksti ei mainitse niitä, '
      + 'eikä Babylonista ole löytynyt niistä jälkeäkään.',
    lahde: 'en-Wikipedia "Hanging Gardens of Babylon", johdanto-osa '
      + '(tarkistettu 26.8.2026); koordinaatit en-Wikipedia "Babylon".',
    kuva: {
      osoite: 'assets/kartat/ihmeet/babylonin-puutarhat.webp',
      selite: 'Havainnekuva: riippuvat puutarhat sellaisina kuin antiikin '
        + 'kirjoittajat ne kuvasivat. Mitään tämänkaltaista ei ole '
        + 'löydetty Babylonista — kuva esittää kertomusta, ei kaivausta.',
      lahde: 'Matkakirjan havainnekuva',
    },
  },
];
