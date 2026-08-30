/*
 * MAASTOKOHTEET — SLB. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs SLB --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/SLB.json. Työkalu laskee laudan
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
 * Salomonsaarten maastokohteet. Faktat en-Wikipediasta 30.8.2026. Ironbottom Sound on erisnimi eikä sitä ole suomennettu (fi-Wikipediassa ei artikkelia); merkki on salmen länsiosassa, jottei se osu Popomanaseun merkin päälle. Salomoninmeren oma keskipiste jää lehden rajauksen länsipuolelle, joten maan vesikohde on tämä salmi.
 */
export const MAASTOKOHTEET_SLB = [
  {
    id: 'mountpopomanaseu',
    nimi: 'Mount Popomanaseu',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on kotoperäinen laji?',
      'Millaista on nousta sademetsän läpi huipulle?',
    ],
    korostukset: ['Guadalcanal|Guadalcanalin'],
    nappi: 'Salomonsaarten korkein',
    // 160.0619 E / -9.7036 N — en-Wikipedia "Mount Popomanaseu" (9°42′13″S 160°03′43″E)
    laudat: {
      maailmankartta: { x: 11168.7, y: 3535.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Mount Popomanaseu on Salomonsaarten korkein kohta, 2 335 metriä. Se kohoaa '
      + 'Guadalcanalin saaren keskellä, naapurihuippu Mount Makarakomburusta itään. Vuori on '
      + 'tuliperäinen, ja sen laella on satulamainen tasanne, joka erottuu selvästi Honiaran '
      + 'lentokentän suunnalta katsottuna. Uutta-Guineaa ja sen lähisaaria lukuun ottamatta se '
      + 'on koko saaristoisen eteläisen Tyynenmeren korkein huippu. Rinteiden sademetsä on '
      + 'tärkeä elinympäristö monille kotoperäisille ja hyvin suppealla alueella eläville '
      + 'lajeille, ja saaren asukkaille vuori on kulttuurisesti merkittävä paikka.',
    lahde: 'en-Wikipedia "Mount Popomanaseu", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'ironbottomsound',
    nimi: 'Ironbottom Sound',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi salmi sai sodassa uuden nimen?',
      'Mitä sotahauta tarkoittaa?',
    ],
    korostukset: ['sotahauta|sotahauta'],
    nappi: 'Salmi, jonka pohja on rautaa',
    // 159.88 E / -9.22 N — salmen länsiosa Savon saaren eteläpuolella; en-Wikipedia "Ironbottom Sound" antaa keskipisteeksi 160 / −9,25
    laudat: {
      maailmankartta: { x: 11162.7, y: 3519.7 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Ironbottom Sound on merenselkä Guadalcanalin, Savon ja Nggelasaarten välissä. Ennen '
      + 'toista maailmansotaa se tunnettiin nimellä Savo Sound. Liittoutuneiden merimiehet '
      + 'antoivat sille uuden nimen, joka tarkoittaa rautapohjaista salmea, koska Guadalcanalin '
      + 'meritaisteluissa vuosina 1942–1943 sen pohjaan vajosi yli viisikymmentä alusta ja '
      + 'suuri joukko lentokoneita — sekä japanilaisia että liittoutuneiden. Nykyään salmi on '
      + 'suosittu sukelluskohde ja samalla sotahauta: joka vuosi taistelun vuosipäivänä '
      + 'yhdysvaltalainen alus ajaa vesille ja laskee seppeleen kaatuneiden muistoksi.',
    lahde: 'en-Wikipedia "Ironbottom Sound", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

