/*
 * MAASTOKOHTEET — BIH. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs BIH --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/BIH.json. Työkalu laskee laudan
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
 * Bosnia ja Hertsegovinan maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-bih.js (Una, Neretva, Sutjeskan kansallispuisto); tässä ovat puuttuvat korkein huippu ja rantameri. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_BIH = [
  {
    id: 'maglic',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-maglic-8037ea00.jpg',
      lyhyt: 'Maglićin jyrkkä kallioinen massiivi kohoaa vihreiden laidunten yllä.',
      selite: 'Bosnian korkein vuori kohoaa paljaana kalkkikivimassiivina alppiniittyjen takana. Rinteillä kasvaa vain matalaa pensasta ja yksittäisiä puita.',
      lahde: 'Valokuva: Martin Brož, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Martin Brož',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Maglic_(2386_m)_od_Prijevoru.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-maglic-3ccb594d.jpg',
        lyhyt: 'Ylhäältä katsottuna Trnovačko-järvi lepää Maglićin vuorten juurella.',
        selite: 'Sydämenmuotoinen vuorijärvi on metsän ympäröimä, ja sen takana kohoaa harmaa kalliomassiivi.',
        lahde: 'Valokuva: Dingoa, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Dingoa',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Magli%C4%87,_Trnova%C4%8Dko_jezero.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Maglić',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Dinaridit?',
      'Miksi kaksoishuipuista käytetympi on matalampi?',
    ],
    korostukset: ['Dinaridit|Dinaridien'],
    nappi: 'Maan korkein huippu',
    // 18.7369 E / 43.2811 N — en-Wikipedia "Maglić (mountain)"
    laudat: {
      maailmankartta: { x: 6457.9, y: 1672 },
      europe: { x: 570.9, y: 755.3 },
    },
    teksti: 'Maglić on rajan ylittävä vuori Dinaridien alueella Bosnia ja Hertsegovinan sekä '
      + 'Montenegron rajalla. Sen korkein huippu on 2 388 metriä ja Montenegron puolella; '
      + 'kaksoishuippu 2 386 metrissä on Bosnia ja Hertsegovinan puolella ja siten maan korkein '
      + 'kohta — ja samalla se kahdesta huipusta, jolla käydään useammin. Vuori kulkee '
      + 'luoteesta kaakkoon.',
    lahde: 'en-Wikipedia "Maglić (mountain)", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'adrianmeri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-adrianmeri-64f539c3.jpg',
      lyhyt: 'Kirkasvetinen Adrianmeren ranta ja vuoristoinen rannikko.',
      selite: 'Turkoosi meri huuhtoo hiekkaista rantaa, ja rannikon takana kohoavat kalkkikivivuoret. Rannalla näkyy pieniä uimareita kaukana.',
      lahde: 'Valokuva: tomkennedyastro, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'tomkennedyastro',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Adriatic_Sea_Croatia.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-adrianmeri-3b9cc988.jpg',
        lyhyt: 'Aallot iskeytyvät kallioiselle Adrianmeren rannikolle maalauksessa.',
        selite: 'Vanha öljymaalaus, jossa vaahtopäiset aallot murtuvat rannikon kallioihin ja taustalla näkyy vuorinen niemi.',
        lahde: 'Maalaus: Alfred Zoff, Wikimedia Commons (public domain).',
        tekija: 'Alfred Zoff',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Alfred_Zoff_-_Campo_Maria_near_the_Adriatic_Coast.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Adrianmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi maan rannikko on niin lyhyt?',
      'Mikä Otranton salmi on?',
    ],
    korostukset: ['Otranton salmi|Otranton salmesta'],
    nappi: 'Kahdenkymmenen kilometrin rantakaistale',
    // 17.3 E / 42.85 N — ulappa Neumin edustalla, maan ainoan rannikkokaistaleen kohdalla; artikkelin oma keskipiste on 15 / 43
    laudat: {
      maailmankartta: { x: 6410, y: 1689.4 },
      europe: { x: 543.4, y: 766.6 },
    },
    teksti: 'Adrianmeri erottaa Apenniinien niemimaan Balkanin niemimaasta. Se on Välimeren '
      + 'pohjoisin haara ja ulottuu Otranton salmesta luoteeseen Pon laaksoon asti. Rantaa '
      + 'sillä on kuudella maalla, ja Bosnia ja Hertsegovina on niistä se, jolla rantaa on '
      + 'kaikkein vähiten — kapea kaistale Neumin kohdalla.',
    lahde: 'en-Wikipedia "Adriatic Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * ERÄ 11.9.2026 — KAKSI KOHDETTA LISÄÄ.
   *
   * Omistaja 11.9.2026: *"Agentit voisivat tarkastaa myös muut
   * Euroopan maat että kaikissa tarpeeksi nostoja."* Bosnia ja
   * Hertsegovinalla oli pääkartalla 18 merkkiä, ja tavoite on
   * vähintään kaksikymmentä. Blidinje on 42,2 ja Bobovac 35,5
   * lautayksikön päässä lähimmästä pelikaupungista, joten kumpikin on
   * pääkartan merkki. Aiheiksi valittiin keskiajan rakennusperintö ja
   * ylängön luonto: kumpikaan ei ota kantaa 1990-luvun sodan
   * kysymyksiin eikä kuvaa väkivaltaa. Počitelj oli ensin erän
   * kolmas ehdokas, mutta sen nimiö olisi työntänyt Neumin nimiön
   * Stonin muurien päälle (tools/tarkista-nimiolimitys.mjs), joten
   * tilalle valittiin Blidinje. Kuvat lisätty 20.9.2026 (ent. kuvaton erä), kuten pakin muutkin
   * kohteet.
   * ============================================================== */
  {
    id: 'blidinje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-blidinje-cdc9134d.jpg',
      lyhyt: 'Ylhäältä katsottuna Blidinje-järvi lepää karstiylängön laaksossa.',
      selite: 'Karstiylängön keskellä on matala järvi, jota ympäröivät laidunmaat ja tummat vuoret. Etualalla on kivikkoista rinnettä.',
      lahde: 'Valokuva: Martin Brož, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Martin Brož',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blidinjsko_jezero_(23_ha,_hl._max._3,5_m)_z_Maleho_Vranu.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-blidinje-8785fe58.jpg',
        lyhyt: 'Lumihuippuiset vuoret kohoavat Blidinjen ylängön yllä.',
        selite: 'Talvinen maisema Blidinjen luonnonpuistossa: ruskeaa ruohikkoa, järven vesi ja lumipeitteiset Dinaaristen vuorten rinteet.',
        lahde: 'Valokuva: Hienstorfer, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Hienstorfer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Blidinje_national_park.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Blidinjen puisto',
    tyyppi: 'vuori',
    symboli: 'luonto',
    kysymykset: [
      'Mikä stećak on?',
      'Miksi munika kasvaa juuri täällä?',
    ],
    nappi: 'Ylängön luonnonpuisto',
    // 17,6167 E / 43,6167 N — en-Wikipedia "Blidinje Nature Park"
    // (43°37'N 17°37'E), ylängön keskivaiheilta.
    laudat: {
      maailmankartta: { x: 6420.6, y: 1658.4 },
      europe: { x: 549.4, y: 746.5 },
    },
    teksti: 'Blidinje on karstiylänkö Dinaarisilla vuorilla Čvrsnican, Čabuljan ja Vranin '
      + 'välissä. Ylänkö on noin 513 neliökilometriä, se ulottuu 22 kilometriä pohjois-'
      + 'eteläsuunnassa ja 17 kilometriä itä-länsisuunnassa, ja korkeus vaihtelee 1 150 '
      + 'metristä 2 228 metriin.\n\n'
      + 'Luonnonpuisto perustettiin 30. huhtikuuta 1995, ja sen pinta-ala on 364 '
      + 'neliökilometriä.\n\n'
      + 'Ylängön keskellä on Blidinjen järvi 1 184 metrin korkeudessa. Sen pinta-ala ei ole '
      + 'vakio vaan vaihtelee vuodenajan mukaan kahden ja puolen ja kuuden neliökilometrin '
      + 'välillä.\n\n'
      + 'Dugo Poljen kalmistossa seisoo keskiaikaisia stećak-hautakiviä, ja ne kuuluvat '
      + 'Unescon maailmanperintöluetteloon otettuun stećak-kokonaisuuteen. Masna Lukan '
      + 'rinteillä kasvaa munikaa eli valkorunkoista Balkanin vuoristomäntyä, ja '
      + 'Čvrsnican rinteellä toimii Risovacin hiihtokeskus.',
    lahde: 'en-Wikipedia "Blidinje Nature Park" (tarkistettu 11.9.2026).',
  },
  {
    id: 'bobovac',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-bobovac-f3f75204.jpg',
      lyhyt: 'Bobovacin linnan raunioilla kohoaa kivinen rakennus paanukattoineen.',
      selite: 'Keskiaikaisen linnan alueella seisova kivirakennus, jonka katto on peitetty puupaanuilla. Rakennuksen takana nousee metsäinen rinne.',
      lahde: 'Valokuva: Badener, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Badener',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bobovac_0343.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/bih-nosto-bobovac-2c329585.jpg',
        lyhyt: 'Bobovacin linnoituksen rauniot kalliolla jyrkän rotkolaakson yllä.',
        selite: 'Linnanraunio kohoaa kapean harjanteen päässä. Ympärillä jyrkät metsäiset rinteet laskeutuvat laaksoon.',
        lahde: 'Valokuva: Branimir Mlakić, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Branimir Mlakić',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Bobovac_Fortress_-_panoramio.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Bobovac',
    tyyppi: 'historia',
    kysymykset: [
      'Ketä mausoleumiin haudattiin?',
      'Miksi kuninkaan istuin siirtyi Jajceen?',
    ],
    nappi: 'Bosnian kuninkaiden linna',
    // 18,2388 E / 44,1379 N — en-Wikipedia "Bobovac" (Varešin lähellä)
    laudat: {
      maailmankartta: { x: 6441.3, y: 1637.1 },
      europe: { x: 561.4, y: 732.8 },
    },
    teksti: 'Bobovac on keskiaikaisen linnan raunio Varešin lähellä Keski-Bosniassa. Linna '
      + 'rakennettiin Bosnian paanin Stjepan II:n hallituskaudella, ja ensimmäinen kirjallinen '
      + 'maininta siitä on vuodelta 1349.\n\n'
      + 'Se oli 1300- ja 1400-luvuilla Bosnian hallitsijoiden linnoitettu pääpaikka. Hallintoa '
      + 'hoidettiin myös Sutjeskan kuninkaankartanossa, mutta Bobovac oli niistä kahdesta se, '
      + 'jota pystyi puolustamaan.\n\n'
      + 'Kaivauksissa on erotettu kolme palatsia — suuri palatsi, ylempi palatsi ja '
      + 'sivupalatsi — kolmella eri terassitasolla. Rakennustyyli on goottilainen, ja osassa '
      + 'on romaanis-goottilaisia piirteitä. Mausoleumin viidestä haudasta on löytynyt '
      + 'yhdeksän vainajaa: kuninkaat Dabiša, Ostoja, Ostojić, Tvrtko II ja Tomaš sekä '
      + 'naisen luuranko, jonka arvellaan olevan Tvrtko II:n puoliso kuningatar Dorothea.\n\n'
      + 'Kuningas Stjepan Tomašević siirsi istuimensa Jajceen osmanien painostaessa, ja '
      + 'osmanit valtasivat Bobovacin vuonna 1463. Raunio on Bosnia ja Hertsegovinan '
      + 'kansallinen muistomerkki.',
    lahde: 'en-Wikipedia "Bobovac" (tarkistettu 11.9.2026).',
  },
];
