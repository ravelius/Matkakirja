/*
 * MAASTOKOHTEET — GRL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs GRL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/GRL.json. Työkalu laskee laudan
 * projektiot (maailmankartta = Millerin lieriö, europe = tasaväli),
 * jättää pois laudan, jonka kaavan ulkopuolelle kohde jää, ja
 * tarkistaa että jokainen kohde osuu maan fokuslehden rajaukseen —
 * ikkunan ulkopuolinen merkki olisi olemassa mutta pelaajan
 * ulottumattomissa. Faktat on tarkistettu en-Wikipediasta lähde
 * kerrallaan, ja jokaisen kohteen `lahde`-rivi kertoo mistä artikkelin
 * osasta se on.
 *
 * Maa on YLEISELLÄ reitillä: lehdellä ei ole poltettuja
 * maastonimiä lainkaan, joten merkin nimiö on maastonimen ainoa
 * esiintymä kartalla. Kaksoisnimen vaaraa ei siis ole.
 *
 * Lista yhdistyy maan muihin kohteisiin js/packs/maastokohteet.js
 * -hakemiston kautta (js/fokuskohteet.js KOHDE_MAAT), joten maan
 * mahdollista olemassa olevaa fokuskohteet-pakkia EI ole tarvinnut
 * koskea eikä yhtään sen kohdetta ole toistettu täällä.
 *
 * Grönlannin maastokohteet. Faktat en-Wikipediasta 30.8.2026; jäätikön nimiasu Grönlannin mannerjäätikkö on fi-Wikipedian artikkelinimi. Mannerjäätikkö on aineistossa vuoret-listalla vain siksi, että työkalu poimisi sen mukaan; valmiissa pakissa sen tyyppi on 'muu' ja symboli 'luonto' Rub al-Khalin mallin mukaan, koska jäätikkö ei ole vuori eikä vesistö. Kiintiön vesistön täyttää Baffininlahti.
 */
export const MAASTOKOHTEET_GRL = [
  {
    id: 'gunnbjrnfjeld',
    nimi: 'Gunnbjørn Fjeld',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on nunatak?',
      'Miksi vuorelle noustiin ensimmäisen kerran vasta 1935?',
    ],
    korostukset: ['nunatak|nunatak'],
    nappi: 'Napapiirin pohjoispuolen korkein huippu',
    // -29.8985 E / 68.9195 N — en-Wikipedia "Gunnbjørn Fjeld", infolaatikko 68°55′10″N 29°53′55″W
    laudat: {
      maailmankartta: { x: 4836.7, y: 446.1 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Gunnbjørn Fjeld on Grönlannin korkein vuori, 3 694 metriä, ja samalla koko napapiirin '
      + 'pohjoispuolen korkein huippu. Se on nunatak eli mannerjäätikön läpi työntyvä '
      + 'kalliohuippu, ja se kuuluu Watkinsin vuoristoon saaren itärannikolla. Vuori on myös '
      + 'Pohjois-Amerikan korkein kohta varsinaisen mantereen ulkopuolella. Huipulle noustiin '
      + 'ensimmäisen kerran 16. elokuuta 1935, kun Augustine Courtauld, Jack Longland, Ebbe '
      + 'Munck ja Lawrence Wager pääsivät perille. Eristyneisyydeltään vuori on maailman '
      + 'yhdeksäs: lähin sitä korkeampi maasto on yli 500 kilometrin päässä Islannissa.',
    lahde: 'en-Wikipedia "Gunnbjørn Fjeld", johdanto-osa ja infolaatikko (tarkistettu 30.8.2026).',
  },
  {
    id: 'gronlanninmannerjaatikko',
    nimi: 'Grönlannin mannerjäätikkö',
    // Mannerjäätikkö ei ole vuori eikä meri: tyyppi 'muu' + symboli
    // 'luonto' Vanjärven mallin mukaan (js/packs/fokuskohteet-tur.js),
    // kuten ARE:n ja SAU:n Rub al-Khalissa — kortin ylärivi näyttää
    // silloin luokan Luonto eikä väärää otsaketta. Aineistossa kohde on
    // vuoret-listalla vain siksi, että työkalu poimisi sen mukaan.
    symboli: 'luonto',
    tyyppi: 'muu',
    kysymykset: [
      'Kuinka vanhaa Grönlannin jää on syvimmillään?',
      'Mitä merenpinnan nousu tarkoittaisi rannikoille?',
    ],
    korostukset: ['Antarktis|Antarktiksen'],
    nappi: 'Maailman toiseksi suurin jäämassa',
    // -42 E / 72 N — jäätikön keskiosa, lähellä sen paksuinta kohtaa; en-Wikipedia "Greenland ice sheet" antaa keskipisteeksi -42 / 72
    laudat: {
      maailmankartta: { x: 4433.3, y: 260.6 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Grönlannin mannerjäätikkö peittää noin 80 prosenttia saaren pinnasta: 1 710 000 '
      + 'neliökilometriä jäätä, keskimäärin 1 673 metriä paksuna ja paksuimmillaan 3 488 '
      + 'metriä. Se on Antarktiksen jäätikön jälkeen maailman toiseksi suurin jäämassa, mutta '
      + 'pinta-alaltaan vain noin kahdestoistaosa siitä. Jos jää sulaisi kokonaan, merenpinta '
      + 'nousisi noin 7,4 metriä. Jäätikkö menettää massaa nopeammin kuin kertaakaan ainakaan '
      + '12 000 vuoteen: keskimäärin 266 miljardia tonnia vuodessa vuodesta 2002 alkaen.',
    lahde: 'en-Wikipedia "Greenland ice sheet", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'baffininlahti',
    nimi: 'Baffininlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kauas etelään Grönlannin jäävuoret ajautuvat?',
      'Mitä William Baffin oikeastaan etsi vuonna 1616?',
    ],
    korostukset: ['jäävuori|jäävuoria'],
    nappi: 'Jäävuorten synnyinlahti',
    // -68 E / 73.5 N — lahden keskiosa Grönlannin ja Baffininsaaren välissä; en-Wikipedia "Baffin Bay" antaa keskipisteeksi -68 / 73
    laudat: {
      maailmankartta: { x: 3566.7, y: 165.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Baffininlahti erottaa Grönlannin lännestä Kanadan Baffininsaaresta. Pinta-alaa on 689 '
      + '000 neliökilometriä ja syvimmillään vettä 2 136 metriä. Talvella noin 80 prosenttia '
      + 'lahdesta on kiintojään ja ajojään peitossa. Grönlannin jäätiköistä irtoaa lahteen '
      + 'runsaasti jäävuoria, jotka ajautuvat jäiden mukana Atlantille Newfoundlandin '
      + 'tienoille. Etelässä Davisinsalmi yhdistää lahden Labradorinmereen ja Atlanttiin, '
      + 'pohjoisessa kapea Naresinsalmi Jäämereen. William Baffin kartoitti alueen vuonna 1616 '
      + 'ja nimesi sen salmet retkikuntansa jäsenten mukaan.',
    lahde: 'en-Wikipedia "Baffin Bay", johdanto-osa ja osio History (tarkistettu 30.8.2026).',
  },
];

