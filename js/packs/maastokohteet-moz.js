/*
 * MAASTOKOHTEET — MOZ. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs MOZ --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/MOZ.json. Työkalu laskee laudan
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
 * Mosambikin maastokohteet. Faktat en-Wikipediasta 30.8.2026. Monte Binga ja Sambesi ovat fi-Wikipedian asuja.
 */
export const MAASTOKOHTEET_MOZ = [
  {
    id: 'montebinga',
    nimi: 'Monte Binga',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä on Chimanimanin rajat ylittävä puisto?',
      'Miksi vuorella on useita valehuippuja?',
    ],
    korostukset: ['Chimanimani|Chimanimanin'],
    nappi: 'Kahden maan rajahuippu',
    // 33.0619 E / -19.7767 N — en-Wikipedia "Monte Binga"
    laudat: {
      maailmankartta: { x: 6935.4, y: 3879.3 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Monte Bingan huipulle nousevan polun löytää siitä, mistä se haarautuu salakuljettajien '
      + 'vanhalta reitiltä. Bundin laaksosta lännestä lähtevä epämääräinen ura erkanee '
      + 'pääpolusta, joka vie Skeleton Passille rajan yli; itse nousu vie parhaan osan '
      + 'päivästä, ja matkalla tulee vastaan useita valehuippuja ennen kuin oikea löytyy. '
      + 'Vuori, 2 440 metriä, on Mosambikin korkein ja Zimbabwen toiseksi korkein ja seisoo '
      + 'tasan maiden rajalla Chimanimanin rajat ylittävässä puistossa. Kivi on kovaa '
      + 'vaaleanharmaata prekambrista kvartsiittia, joka tekee koko ylätasangosta '
      + 'autiontuntuisen ja paljaan: itäpuolelta nousu on loiva, mutta länsi- ja '
      + 'pohjoisseinämät ovat paikoin pystysuoria.',
    lahde: 'en-Wikipedia "Monte Binga", johdanto-osa sekä osiot "Geology" ja "Climbing" '
      + '(tarkistettu 1.9.2026).',
  },
  {
    id: 'intianvaltameri',
    nimi: 'Intian valtameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Intian valtameri on valtameristä nuorin?',
      'Mikä oli Tethysmeri?',
    ],
    nappi: 'Nuorin ja lämpimin valtameri',
    // 35.6 E / -20.2 N — ulappa Beiran edustalla; en-Wikipedia "Indian Ocean" antaa keskipisteeksi 80 / -20
    laudat: {
      maailmankartta: { x: 7020, y: 3893.9 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Intian valtameri on maailman kolmanneksi suurin valtameri, ja Mosambikin koko pitkä '
      + 'rannikko on sen rantaa. Se on valtameristä geologisesti nuorin — syntynyt vasta '
      + 'muinaisen Tethysmeren hajottua — ja samalla lämpimin, mikä tekee siitä maapallon '
      + 'ilmastolle erityisen tärkeän. Keskisyvyyttä valtamerellä on 3 741 metriä.',
    lahde: 'en-Wikipedia "Indian Ocean", johdanto-osa (tarkistettu 30.8.2026).',
  },
  {
    id: 'sambesi',
    nimi: 'Sambesi',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Victorian putoukset ovat?',
      'Mitä Cahora Bassan pato tuottaa?',
    ],
    korostukset: ['Victorian putoukset|Victorian putoukset'],
    nappi: 'Afrikan suuri itäjoki',
    // 33.6 E / -16.15 N — alajuoksu Teten seudulla Mosambikissa; en-Wikipedia "Zambezi" antaa suistolle 36,47 / -18,57
    laudat: {
      maailmankartta: { x: 6953.3, y: 3754.4 },
      // Euroopan laudan kaavan ulkopuolella (lon −11…41, lat 34…72):
      // rivi jätetään pois, jottei merkki päädy laudan reunan taakse.
    },
    teksti: 'Sambesi on Afrikan neljänneksi pisin joki, pisin itään virtaavista ja suurin Intian '
      + 'valtamereen laskevista. Se alkaa Sambiasta, kiertää 2 574 kilometrin matkan kuuden '
      + 'maan kautta ja ylittää lopulta koko Mosambikin ennen kuin laskee mereen. Joen '
      + 'kuuluisin kohta on Victorian putoukset Sambian ja Zimbabwen rajalla, ja Mosambikin '
      + 'puolella sen vettä patoaa Cahora Bassa, joka tuottaa sähköä sekä Mosambikille että '
      + 'Etelä-Afrikalle.',
    lahde: 'en-Wikipedia "Zambezi", johdanto-osa (tarkistettu 30.8.2026).',
  },
];

