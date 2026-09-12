/*
 * MAASTOKOHTEET — CZE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CZE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CZE.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 2.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ───────────
 *
 * Omistaja 2.9.2026: *"pitäisi jatkaa kaikki Euroopan maat loppuun
 * näiden karttanostojen osalta."* Tšekki oli yksi laudan tyhjimmistä
 * maista: kymmenen karttamerkkiä ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-cze.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei voitu
 * tehdä tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Kutná Hora)
 * on 29,1 lautayksikön päässä lähimmästä pelikaupungista, eli
 * reilusti yli kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä — omistajan sääntö kohdekaupunkien
 * nostoista ei koske näitä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti
 * kantaa tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto
 * olisi huonompi kuin kuvaton kortti (Perustuslaki, faktakuri).
 * Faktat on tarkistettu en-Wikipediasta kohde kerrallaan 2.9.2026.
 *
 * Tšekin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 */
export const MAASTOKOHTEET_CZE = [
  {
    id: 'snezka',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-maasto-snezka-d4df56329dd5.jpg',
      lyhyt: 'Sněžkan 1 603 metrin huippu kohoaa Tšekin ja Puolan rajalla ja on Tšekin korkein piste.',
      selite: 'Sněžkan 1 603 metrin huippu kohoaa Tšekin ja Puolan rajalla ja on Tšekin korkein piste.',
      lahde: 'Matkakirjan havainnekuva — AI-generoitu johdannainen. Referenssi: Honza Groh (Jagro), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'OpenAI; referenssikuva Honza Groh (Jagro)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sněžka,_pohled_na_cestu_česko-polského_přátelství.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      muokkaus: 'AI-generoitu johdannainen: sää, rajaus ja yksityiskohdat muutettu. Ei alkuperäinen valokuva.',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-maasto-snezka-fd8fdae69415.jpg',
        lyhyt: 'Näkymä Sněžkan rinteeltä kohti Pomezní Boudya.',
        selite: 'Näkymä Sněžkalta Tšekin ja Puolan ystävyyspolkua kohti Pomezní Boudya.',
        lahde: 'Valokuva: Honza Groh (Jagro), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Honza Groh (Jagro)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sněžka,_pohled_na_cestu_česko-polského_přátelství.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Sněžka',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorella on kaksi nimeä?',
      'Mitä huipulla on nykyään?',
    ],
    korostukset: ['Sudeetit|Sudeettien'],
    nappi: 'Tšekin korkein piste',
    // 15.7403 E / 50.7361 N — en-Wikipedia "Sněžka"
    laudat: {
      maailmankartta: { x: 6358, y: 1358 },
      europe: { x: 513.4, y: 559.2 },
    },
    teksti: 'Sněžka eli puolaksi Śnieżka on Tšekin ja Puolan rajalla ja Jättiläisvuorten Sleesian '
      + 'harjanteen hallitsevin kohta. Sen 1 603 metrin huippu on samalla Tšekin korkein piste, '
      + 'Ala-Sleesian voivodikunnan korkein kohta ja koko Sudeettien katto. Sama huippu on siis '
      + 'kahden maan korkein vuori omalla puolellaan rajaa.',
    lahde: 'en-Wikipedia "Sněžka", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'labe',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-maasto-labe-0bc730ebdf0a.jpg',
      lyhyt: 'Labe virtaa Jättiläisvuorilta Böömin halki Saksaan, missä se tunnetaan Elbenä.',
      selite: 'Labe virtaa Jättiläisvuorilta Böömin halki Saksaan, missä se tunnetaan Elbenä.',
      lahde: 'Matkakirjan havainnekuva — AI-generoitu johdannainen. Referenssi: Pavel Hrdlička, Wikipedia, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'OpenAI; referenssikuva Pavel Hrdlička, Wikipedia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poděbrady,_Velké_Zboží,_Elbe_river.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      muokkaus: 'Generoidun havainnekuvan sommittelu ja paikkailme perustuvat yllä nimettyyn CC BY-SA 3.0 -valokuvaan; kyseessä on muokattu johdannainen, ei alkuperäinen valokuva.',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-maasto-labe-787fd7b9f6a7.jpg',
        lyhyt: 'Labe-joki Velké Zbožíssä Tšekissä.',
        selite: 'Labe Velké Zbožíssä, Poděbradyn kaupunginosassa Tšekissä.',
        lahde: 'Valokuva: Pavel Hrdlička (Packa), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pavel Hrdlička, Wikipedia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Poděbrady,_Velké_Zboží,_Elbe_river.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Labe',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Elben lähde tarkalleen on?',
      'Miksi joella on kaksi nimeä?',
    ],
    nappi: 'Joki, joka on Saksassa Elbe',
    // 14.13 E / 50.53 N — Litoměřice Böömin puolella; artikkelin koordinaatti 8,722 / 53,922 on suistossa Cuxhavenissa
    laudat: {
      maailmankartta: { x: 6304.3, y: 1367 },
      europe: { x: 482.5, y: 564.7 },
    },
    teksti: 'Labe eli saksaksi Elbe on yksi Keski-Euroopan suurista joista. Se saa alkunsa '
      + 'Jättiläisvuorilta Pohjois-Tšekistä, virtaa suuren osan Böömiä ja jatkaa Saksaan, missä '
      + 'se laskee Pohjanmereen Cuxhavenissa 110 kilometriä Hampurista luoteeseen. '
      + 'Kokonaispituutta sillä on 1 094 kilometriä.',
    lahde: 'en-Wikipedia "Elbe", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'vltava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-maasto-vltava-dcdde8f4e527.jpg',
      lyhyt: 'Vltava virtaa Český Krumlovin läpi; joen nimi juontuu villiä vettä tarkoittavasta vanhasta sanaparista.',
      selite: 'Vltava virtaa Český Krumlovin läpi; joen nimi juontuu villiä vettä tarkoittavasta vanhasta sanaparista.',
      lahde: 'Matkakirjan havainnekuva — AI-generoitu johdannainen. Referenssi: Mark Ahsmann, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'OpenAI; referenssikuva Mark Ahsmann',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vltava_at_Český_Krumlov.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      muokkaus: 'AI-generoitu johdannainen: sää, rajaus ja yksityiskohdat muutettu. Ei alkuperäinen valokuva.',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-maasto-vltava-8f6ff00782e2.jpg',
        lyhyt: 'Vltava ja pato Český Krumlovissa.',
        selite: 'Vltava ja Mrázkův mlýnin pato Český Krumlovissa.',
        lahde: 'Valokuva: Mark Ahsmann, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Mark Ahsmann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vltava_at_Český_Krumlov.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Vltava',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Vltavaa sanotaan kansallisjoeksi?',
      'Mikä oli Pyhän Johanneksen koski?',
    ],
    korostukset: ['Kaarlensilta|Kaarlensiltaa'],
    nappi: 'Tšekin kansallisjoki',
    // 14.32 E / 48.81 N — Český Krumlov joen yläjuoksulla; artikkelin koordinaatti 14,475 / 50,341 on yhtymäkohdassa Elbeen
    laudat: {
      maailmankartta: { x: 6310.7, y: 1441.6 },
      europe: { x: 486.1, y: 609.9 },
    },
    teksti: 'Vltavan nimi tarkoittaa villiä vettä. Sekä tšekin Vltava että saksan Moldau juontuvat '
      + 'vanhasta germaanisesta sanaparista wilt ahwa, ja 1100-luvun Böömin kronikassa joki '
      + 'esiintyy muodossa Wlitaua. Villiys on sittemmin kesytetty: 1930-luvulta alkaen Prahan '
      + 'eteläpuolelle on rakennettu yhdeksän vesivoimapatoa, ja niiden altaiden alle jäi muun '
      + 'muassa Pyhän Johanneksen koski. Kansallisjoeksi Vltavaa kutsutaan syystä: Bedřich '
      + 'Smetana hahmotteli samannimistä sinfonista runoaan vuosina 1872—1874, ja se on Má '
      + 'vlast -sarjan ainoa osa, joka ehti lähes valmiiksi ennen kuin säveltäjä kesällä 1874 '
      + 'menetti kuulonsa. Elokuussa 2002 tulva vei ihmishenkiä ja heikensi Kaarlensiltaa niin '
      + 'pahoin, että korjaukset kestivät vuosia.',
    lahde: 'en-Wikipedia "Vltava", osiot "Etymology", "Dams", "Floods" ja "References in culture '
      + 'and science", sekä en-Wikipedia "Má vlast" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026). Yllä olevien
   * maastokohteiden vanhoihin riveihin ei ole koskettu.
   *
   * PRAHA ON JÄTETTY KOKONAAN RAUHAAN. Kaupungin nostot asuvat
   * kohdekartalla (js/packs/maakartat.js), ja omistajan sääntö
   * kieltää kohdekaupungin kohdalla olevat merkit pääkartalta.
   * Lähin uusi kohde on Kutná Hora 29,1 lautayksikön päässä.
   * ============================================================== */
  {
    id: 'kutna-hora',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-kohde-kutna-hora-27d638bbe487.jpg',
      lyhyt: 'Hopeakaivosten vaurastuttama Kutná Hora kuuluu maailmanperintöön.',
      selite: 'Hopeakaivokset vaurastuttivat Kutná Horan, jonka historiallinen keskusta ja Pyhän Barbaran kirkko kuuluvat maailmanperintöön.',
      lahde: 'Matkakirjan havainnekuva — AI-generoitu johdannainen. Referenssi: Pere prlpz, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'OpenAI; referenssikuva Pere prlpz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kutná_Hora-_Historical_Town_Centre_with_the_Church_of_St._Barbara.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      muokkaus: 'AI-generoitu johdannainen: sää, rajaus ja yksityiskohdat muutettu. Ei alkuperäinen valokuva.',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260912/cze-kohde-kutna-hora-02c6c8b4acda.jpg',
        lyhyt: 'Kutná Horan historiallinen keskusta ja Pyhän Barbaran kirkko.',
        selite: 'Kutná Horan historiallinen keskusta, Pyhän Barbaran kirkko ja entinen jesuiittakollegio.',
        lahde: 'Valokuva: Pere prlpz, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Pere prlpz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kutná_Hora-_Historical_Town_Centre_with_the_Church_of_St._Barbara.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Kutná Hora',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaupungin rikkaus tuli?',
      'Mitä nimi Kutná Hora tarkoittaa?',
    ],
    korostukset: ['hopeakaivos|hopeakaivoksiin'],
    nappi: 'Kaupunki, jonka hopea kesti vuosisatoja',
    // 15.2683 E / 49.9483 N — en-Wikipedia "Kutná Hora"
    laudat: {
      maailmankartta: { x: 6342.3, y: 1392.4 },
    },
    teksti: 'Kutná Hora on kaupunki Keski-Böömissä, noin 52 kilometriä Prahasta '
      + 'itään, ja siellä asuu noin 22 000 ihmistä. Sen koko historia on sidottu '
      + 'hopeakaivoksiin: ne tekivät siitä rikkaan ja nopeasti kasvavan kaupungin.\n\n'
      + 'Nimi tulee samannimisestä vuoresta — hora tarkoittaa vuorta. Tarujen mukaan '
      + 'vuori sai nimensä munkkien kaavuista (saksaksi Kutten, tšekiksi kutny), '
      + 'mutta todennäköisemmin taustalla on keskiyläsaksan sana kutte, kuoppa. '
      + 'Nimi voi juontua myös tšekin sanoista kutit, tehdä työtä, tai kutat, '
      + 'kaivaa malmia.\n\n'
      + 'Kaupungin keskusta, Sedlecin luostari ja Sedlecin luukappeli otettiin '
      + 'maailmanperintöluetteloon 1995 arkkitehtuurinsa ja sen vaikutuksen takia, '
      + 'joka niillä oli muiden Keski-Euroopan kaupunkikeskustojen rakentamiseen. '
      + 'Vanha keskusta on lisäksi suojeltu kaupunkimuistomerkkialueena, Tšekin '
      + 'neljänneksi laajimpana.',
    lahde: 'en-Wikipedia "Kutná Hora", johdanto-osa sekä osiot "Etymology" ja '
      + '"Geography" (tarkistettu 2.9.2026).',
  },
  {
    id: 'cesky-krumlov',
    kuva: {
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-cesky-krumlov-0855c1b7e53b.jpg",
      lyhyt: "Český Krumlovin linna kohoaa kallioiselta rinteeltä Vltavan mutkan yllä.",
      selite: "Český Krumlovin linna kohoaa kallioiselta rinteeltä Vltavan mutkan yllä.",
      lahde: "Matkakirjan havainnekuva — lähdeperusteinen johdannainen",
      tekija: "OpenAI, Matkakirjan toimitus; alkuperäisvalokuva: Vincent de Groot",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Cesky_krumlov_castle.JPG",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    kuvat: [{
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-cesky-krumlov-0504b4128cac.jpg",
      lyhyt: "Český Krumlovin linna kohoaa kallioiselta rinteeltä Vltavan mutkan yllä.",
      selite: "Český Krumlovin linna kohoaa kallioiselta rinteeltä Vltavan mutkan yllä.",
      lahde: "Valokuva: Vincent de Groot, Wikimedia Commons (CC BY-SA 4.0).",
      tekija: "Vincent de Groot",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Cesky_krumlov_castle.JPG",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    }],
    nimi: 'Český Krumlov',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaupungin nimi tulee?',
      'Miksi nimen eteen lisättiin sana Český?',
    ],
    korostukset: ['Vltava|Vltavan'],
    nappi: 'Kaupunki joen mutkassa',
    // 14.3153 E / 48.8111 N — en-Wikipedia "Český Krumlov"
    laudat: {
      maailmankartta: { x: 6310.5, y: 1441.6 },
    },
    teksti: 'Český Krumlov on noin 13 000 asukkaan kaupunki Etelä-Böömissä, '
      + 'Vltavan varrella Böömin metsän kukkuloilla. Nimi Krumlov tulee '
      + 'keskiyläsaksan sanoista Krumme Aue, vino niitty: kaupunki on nimetty '
      + 'Vltavan mutkan mukaan. Määre Český eli böömiläinen lisättiin 1400-luvulla, '
      + 'jotta kaupunki erottuisi Moravský Krumlovista Etelä-Määrissä.\n\n'
      + 'Joen mutka on ollut asuttu kauan. Vanhimmat jäljet ovat vanhemmalta '
      + 'kivikaudelta, laajempi asutus pronssikaudelta, kelttiläiset asuinpaikat '
      + 'nuoremmalta rautakaudelta ja ensimmäinen slaavilainen asutus 500-luvulta. '
      + 'Varhaiskeskiajalla alueen läpi kulki kauppateitä Vltavaa myöten.\n\n'
      + 'Krumlovin linnan perusti hieman ennen vuotta 1250 aatelisen Vítkovci-suvun '
      + 'haara. Kaupunki mainitaan ensi kerran vuoden 1253 asiakirjassa nimellä '
      + 'Chrumbenowe. Se rakentui kahdessa vaiheessa: ensin linnan alle syntyi '
      + 'itsestään Latrán-niminen osa. Historiallinen keskusta linnoineen on '
      + 'suojeltu kaupunkimuistomerkkialueena ja on ollut vuodesta 1992 '
      + 'maailmanperintökohde hyvin säilyneen gotiikkansa, renessanssinsa ja '
      + 'barokkinsa takia.',
    lahde: 'en-Wikipedia "Český Krumlov", johdanto-osa sekä osiot "Etymology", '
      + '"Geography" ja "History" (tarkistettu 2.9.2026).',
  },
  {
    id: 'plzensky-prazdroj',
    kuva: {
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-plzensky-prazdroj-5711ddfee90f.jpg",
      lyhyt: "Plzeňský Prazdroj -panimon historiallinen pääportti avautuu Plzeňin panimoalueelle.",
      selite: "Plzeňský Prazdroj -panimon historiallinen pääportti avautuu Plzeňin panimoalueelle.",
      lahde: "Matkakirjan havainnekuva — lähdeperusteinen johdannainen",
      tekija: "OpenAI, Matkakirjan toimitus; alkuperäisvalokuva: David J. Fred (Dfred)",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Pilsner-Urquell-Main-Gate.jpg",
      lisenssi: "CC BY-SA 3.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    kuvat: [{
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-plzensky-prazdroj-3fa635c8f728.jpg",
      lyhyt: "Plzeňský Prazdroj -panimon historiallinen pääportti avautuu Plzeňin panimoalueelle.",
      selite: "Plzeňský Prazdroj -panimon historiallinen pääportti avautuu Plzeňin panimoalueelle.",
      lahde: "Valokuva: David J. Fred (Dfred), Wikimedia Commons (CC BY-SA 3.0).",
      tekija: "David J. Fred (Dfred)",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Pilsner-Urquell-Main-Gate.jpg",
      lisenssi: "CC BY-SA 3.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    }],
    nimi: 'Plzeňský Prazdroj',
    nimio: 'Prazdroj',
    tyyppi: 'ruoka',
    kysymykset: [
      'Miksi kaksi kolmasosaa maailman oluesta on vaaleaa lageria?',
      'Mitä nimi Urquell tarkoittaa?',
    ],
    korostukset: ['vaalea lager|vaaleaa lageria'],
    nappi: 'Panimo, joka muutti maailman oluen',
    // 13.3872 E / 49.7467 N — en-Wikipedia "Pilsner Urquell Brewery"
    laudat: {
      maailmankartta: { x: 6279.6, y: 1401.2 },
    },
    teksti: 'Plzeňský Prazdroj on panimo, joka avattiin Plzeňissä vuonna 1842. '
      + 'Se oli ensimmäinen panimo, joka valmisti vaaleaa lageria. Olut tuli niin '
      + 'suosituksi ja sitä jäljiteltiin niin paljon, että yli kaksi kolmasosaa '
      + 'nykyään maailmassa valmistettavasta oluesta on vaaleaa lageria — usein '
      + 'nimellä pils, pilsner tai pilsener juuri tämän panimon mukaan.\n\n'
      + 'Panimon perustivat 1839 Plzeňin tšekin- ja saksankieliset asukkaat yhdessä '
      + 'nimellä Bürgerbrauerei, porvarien panimo. Ensimmäisen oluen pani täällä '
      + 'vuonna 1842 baijerilainen panimomestari Josef Groll. Vuonna 1859 '
      + '"Pilsner Bier" rekisteröitiin tuotenimeksi paikallisessa kauppakamarissa.\n\n'
      + 'Kun kilpailija perustettiin 1869, alkuperäisyydestä tuli tärkeää. Vuonna '
      + '1898 luotiin saksankielinen tavaramerkki Urquell ja tšekinkielinen '
      + 'Prazdroj: molemmat tarkoittavat alkulähdettä, ja nimi Pilsner Urquell '
      + 'kääntyy suunnilleen "Plzeňin alkuperäinen lähde".',
    lahde: 'en-Wikipedia "Pilsner Urquell Brewery", johdanto-osa ja osio "History" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'mendelin-luostari',
    kuva: {
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-mendelin-luostari-56a42eb73e55.jpg",
      lyhyt: "Havainnekuva Gregor Mendelistä tutkimassa herneitä Brnon luostarin puutarhassa noin vuonna 1860.",
      selite: "Havainnekuva Gregor Mendelistä tutkimassa herneitä Brnon luostarin puutarhassa noin vuonna 1860.",
      lahde: "Matkakirjan havainnekuva — lähdeperusteinen johdannainen",
      tekija: "OpenAI, Matkakirjan toimitus; alkuperäisvalokuva: Billsofer",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:MendelStatue.jpg",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    kuvat: [{
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-mendelin-luostari-59300d2a69c1.jpg",
      lyhyt: "Gregor Mendelin patsas seisoo Brnon Pyhän Tuomaan luostarin edustalla.",
      selite: "Gregor Mendelin patsas seisoo Brnon Pyhän Tuomaan luostarin edustalla.",
      lahde: "Valokuva: Billsofer, Wikimedia Commons (CC BY-SA 4.0).",
      tekija: "Billsofer",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:MendelStatue.jpg",
      lisenssi: "CC BY-SA 4.0",
      lisenssiUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    }],
    nimi: 'Mendelin luostari',
    nimio: 'Mendel',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä Mendel tarkoitti sanoilla vallitseva ja väistyvä?',
      'Miksi työn merkitys ymmärrettiin vasta vuosikymmeniä myöhemmin?',
    ],
    korostukset: ['väistyvä|väistyvä'],
    nappi: 'Herneet, jotka paljastivat perimän säännöt',
    // 16.5947 E / 49.1919 N — Pyhän Tuomaan luostari Brnossa;
    // en-Wikipedia "Gregor Mendel" (artikkelilla ei ole omaa koordinaattia).
    laudat: {
      maailmankartta: { x: 6386.5, y: 1425.2 },
    },
    teksti: 'Gregor Johann Mendel (1822–1884) oli biologi, meteorologi, matemaatikko '
      + 'ja augustinolaismunkki, joka toimi Pyhän Tuomaan luostarin apottina Brnossa. '
      + 'Hänet tunnetaan jälkikäteen modernin perinnöllisyystieteen perustajana.\n\n'
      + 'Viljelijät olivat tienneet vuosituhansia, että risteyttämällä saa esiin '
      + 'haluttuja ominaisuuksia. Mendelin hernekokeet vuosina 1856–1863 tekivät '
      + 'siitä sääntöjä. Hän seurasi seitsemää herneen ominaisuutta: kasvin '
      + 'korkeutta, palon muotoa ja väriä, siemenen muotoa ja väriä sekä kukan '
      + 'paikkaa ja väriä. Kun puhdasta keltasiemenistä hernettä risteytettiin '
      + 'puhtaan vihersiemenisen kanssa, jälkeläiset olivat aina keltaisia — mutta '
      + 'seuraavassa sukupolvessa vihreät palasivat suhteessa yksi vihreä kolmea '
      + 'keltaista kohti. Ilmiön selittämiseksi Mendel otti käyttöön sanat '
      + 'vallitseva ja väistyvä.\n\n'
      + 'Hän julkaisi työnsä 1866 ja osoitti, että näkymättömät "tekijät" — nykyään '
      + 'geenit — määräävät ominaisuudet ennustettavasti. Työn merkitystä ei '
      + 'ymmärretty ennen vuosisadan vaihdetta: vasta 1900 Erich von Tschermak, '
      + 'Hugo de Vries ja Carl Correns vahvistivat toisistaan riippumatta useita '
      + 'Mendelin havainnoista, ja perinnöllisyystieteen aika alkoi.',
    lahde: 'en-Wikipedia "Gregor Mendel", johdanto-osa (tarkistettu 2.9.2026).',
  },
  {
    id: 'litomysl',
    kuva: {
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-litomysl-91c788e7564e.jpg",
      lyhyt: "Litomyšlin renessanssilinnan julkisivua peittää vaalea sgraffitokoristelu.",
      selite: "Litomyšlin renessanssilinnan julkisivua peittää vaalea sgraffitokoristelu.",
      lahde: "Matkakirjan havainnekuva — lähdeperusteinen johdannainen",
      tekija: "OpenAI, Matkakirjan toimitus; alkuperäisvalokuva: Twisp",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Litomysl_castle.jpg",
      lisenssi: "Public domain",
      lisenssiUrl: null,
    },
    kuvat: [{
      osoite: "https://media.matkakirja.app/karttanostot/20260912/cze-kohde-litomysl-3bc6ed892381.jpg",
      lyhyt: "Litomyšlin renessanssilinnan julkisivua peittää vaalea sgraffitokoristelu.",
      selite: "Litomyšlin renessanssilinnan julkisivua peittää vaalea sgraffitokoristelu.",
      lahde: "Valokuva: Twisp, Wikimedia Commons (Public domain).",
      tekija: "Twisp",
      lahdeUrl: "https://commons.wikimedia.org/wiki/File:Litomysl_castle.jpg",
      lisenssi: "Public domain",
      lisenssiUrl: null,
    }],
    nimi: 'Litomyšl',
    tyyppi: 'sana',
    kysymykset: [
      'Ketkä perustivat kaupunkiin kirjapainon?',
      'Mistä kaupungin nimi tulee?',
    ],
    korostukset: ['Veljesseurakunta|Veljesseurakunta'],
    nappi: 'Kauppatien varteen jäänyt kirjakaupunki',
    // 16.3106 E / 49.8719 N — en-Wikipedia "Litomyšl"
    laudat: {
      maailmankartta: { x: 6377, y: 1395.7 },
    },
    teksti: 'Litomyšl on noin 10 000 asukkaan kaupunki Loučná-joen varrella '
      + 'Svitavyn ylängöllä Itä-Böömissä. Nimi tulee henkilönnimestä Litomysl ja '
      + 'tarkoittaa Litomyslin linnaa.\n\n'
      + 'Ensimmäinen maininta on vuodelta 981, kun Chronica Boemorum kertoo ruhtinas '
      + 'Slavníkin kuolemasta. Litomyšl oli alun perin Slavník-suvun linnoitettu '
      + 'asuinpaikka merkittävän Böömistä Määriin johtavan kauppatien varrella. '
      + 'Kuningas Ottokar II korotti sen kaupungiksi 1259. Sen jälkeen kaupunkia '
      + 'omistivat vuorollaan useat aatelissuvut, ja Pernštejnit rakensivat linnan '
      + 'vuosina 1568–1581. Vuodesta 1344 vuoteen 1474 kaupunki oli myös oman '
      + 'hiippakuntansa istuin.\n\n'
      + 'Kaupungin kirjallinen maine syntyi toisaalta. Uskonpuhdistusta edeltänyt '
      + 'Veljesseurakunta on kirjattu Litomyšliin jo 1490, ja Kostkan suvun '
      + 'suojeluksessa se kukoisti — ja perusti kaupunkiin kirjapainon. Nykyään '
      + 'Litomyšl tunnetaan linnastaan, joka on maailmanperintökohde.',
    lahde: 'en-Wikipedia "Litomyšl", johdanto-osa sekä osiot "Etymology", '
      + '"Geography" ja "History" (tarkistettu 2.9.2026).',
  },
  {
    id: 'konesprezna-draha',
    nimi: 'Hevosrautatie',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mitä rataa pitkin kuljetettiin?',
      'Miksi hevosista ei voitu luopua koko matkalla kerralla?',
    ],
    korostukset: ['hevosrautatie|hevosrautatie'],
    nappi: 'Manner-Euroopan toinen yleinen rautatie',
    // 14.4747 E / 48.9747 N — radan pohjoinen pääte České Budějovicessa;
    // en-Wikipedia "Budweis–Linz–Gmunden Horse-Drawn Railway" (radalla ei ole
    // yhtä koordinaattia, joten merkki on päätepisteessä).
    laudat: {
      maailmankartta: { x: 6315.8, y: 1434.5 },
    },
    teksti: 'České Budějovicesta Linziin ja edelleen Gmundeniin kulkenut '
      + 'hevosrautatie oli Manner-Euroopan toinen yleiselle liikenteelle avattu '
      + 'rautatie — ensimmäinen oli Saint-Étiennen ja Andrézieux’n välinen rata. '
      + 'Se avattiin vaiheittain vuosina 1827–1836, ja sen päätehtävä oli kuljettaa '
      + 'suolaa Ylä-Itävallan Salzkammergutista Böömiin.\n\n'
      + 'Suolakauppa alueiden välillä oli vanhaa perua: sitä oli kannettu selässä ja '
      + 'kuljetettu hevosilla kapeita vuoripolkuja jo pronssikaudelta lähtien. '
      + '1700-luvun lopulla vuotuinen kuljetusmäärä oli 17 000 tonnia ja teillä '
      + 'liikkui noin 350 ajoneuvoa päivässä. České Budějovicen varastolta suola '
      + 'jatkoi edullista vesireittiä Vltavaa ja Elbeä pitkin Prahaan ja sen ohi.\n\n'
      + 'Höyry syrjäytti hevoset vaiheittain. Linzin ja Gmundenin väli muutettiin '
      + 'höyrykäyttöiseksi 1855–1856, mutta vuoristoisella Linzin ja České '
      + 'Budějovicen välillä se ei onnistunut: kaarteet olivat liian tiukkoja ja '
      + 'nousut liian jyrkkiä. Hevosliikenne loppui joulukuussa 1872, ja vuoteen '
      + '1873 mennessä pääosin uutta reittiä kulkeva korvaava rata oli valmis '
      + 'höyryjunille.',
    lahde: 'en-Wikipedia "Budweis–Linz–Gmunden Horse-Drawn Railway", johdanto-osa '
      + 'ja osio "Early history" (tarkistettu 2.9.2026).',
  },
  {
    id: 'jablonec',
    nimi: 'Jablonec nad Nisou',
    nimio: 'Jablonec',
    tyyppi: 'kauppa',
    kysymykset: [
      'Mistä kaupunki on tunnettu 1700-luvulta lähtien?',
      'Mitä kaupungin nimi tarkoittaa?',
    ],
    korostukset: ['muotikoru|muotikoruistaan'],
    nappi: 'Lasihelmien pääkaupunki',
    // 15.1681 E / 50.7244 N — en-Wikipedia "Jablonec nad Nisou"
    laudat: {
      maailmankartta: { x: 6338.9, y: 1358.5 },
    },
    teksti: 'Jablonec nad Nisou on noin 46 000 asukkaan kaupunki Liberecin alueella '
      + 'Lužická Nisa -joen varrella, Jizeravuorten ympäröimässä altaassa. Kylä '
      + 'perustettiin 1300-luvulla, mutta kaupungiksi se tuli vasta 1866.\n\n'
      + 'Kaupunki on 1700-luvulta lähtien tunnettu lasistaan ja muotikoruistaan — '
      + 'erityisesti bijou-koruista. Historiallinen keskusta on hyvin säilynyt ja '
      + 'suojeltu kaupunkimuistomerkkivyöhykkeenä, ja sen arkkitehtonisesti arvokkain '
      + 'rakennus on uusi kaupungintalo.\n\n'
      + 'Nimi Jablonec on tšekkiä ja tarkoittaa pientä omenapuuta: kylä perustettiin '
      + 'paikkaan, jossa kasvoi omenapuu. Saksankieliset uudisasukkaat muokkasivat '
      + 'nimen 1500-luvulla muotoon Gablonz. Vuonna 1904 nimeen liitettiin '
      + 'kummallakin kielellä lisäys "Nisan varrella".',
    lahde: 'en-Wikipedia "Jablonec nad Nisou", johdanto-osa sekä osiot "Etymology" '
      + 'ja "Geography" (tarkistettu 2.9.2026).',
  },
  {
    id: 'decin',
    nimi: 'Děčín',
    tyyppi: 'merenkulku',
    kysymykset: [
      'Miksi juuri tähän kohtaan syntyi kaupunki?',
      'Mikä on Tšekin matalin kaupunki?',
    ],
    korostukset: ['Elbe|Elben'],
    nappi: 'Böömin portti merelle',
    // 14.1961 E / 50.7736 N — en-Wikipedia "Děčín"
    laudat: {
      maailmankartta: { x: 6306.5, y: 1356.4 },
    },
    teksti: 'Děčín on noin 46 000 asukkaan kaupunki Ústí nad Labemin alueella, '
      + 'lähellä Saksan rajaa, siinä kohdassa jossa Ploučnice laskee Elbeen. Se on '
      + 'pinta-alaltaan maan seitsemänneksi suurin kunta.\n\n'
      + 'Kaupunki syntyi Elben takia. Joki oli kuljetusreitti, ja se teki paikasta '
      + 'sisämaavaltion portin merelle; 1800-luvun puolivälistä alkaen merkitystä '
      + 'lisäsi Prahan ja Saksan välinen rautatie. Děčín on yhä maa-, rautatie- ja '
      + 'vesiliikenteen solmu, ja kaupungin toisen ja korkean asteen koulutus on '
      + 'keskittynyt liikenteeseen.\n\n'
      + 'Kaupungin ydin on jokilaaksossa 135 metrin korkeudessa, mikä tekee siitä '
      + 'Tšekin matalimman kaupungin. Koko alue kuuluu kahteen suojeltuun '
      + 'maisema-alueeseen, Elben hiekkakivivuorten ja Keski-Böömin ylänköjen '
      + 'vaihettumisvyöhykkeeseen. Nimi tulee slaavilaisesta henkilönnimestä Děk.',
    lahde: 'en-Wikipedia "Děčín", johdanto-osa sekä osiot "Etymology" ja '
      + '"Geography" (tarkistettu 2.9.2026).',
  },
  /* ================================================================
   * NOSTOERÄ 11.9.2026 — KUUSI KOHDETTA LISÄÄ.
   *
   * Omistaja 11.9.2026: *"Suomesta puuttuu lisäksi myös nostoja …
   * Agentit voisivat tarkastaa myös muut Euroopan maat että kaikissa
   * tarpeeksi nostoja."* Päätoimittajan tavoite on 20 pääkartan nostoa
   * per Euroopan maa; Tšekki oli neljässätoista.
   *
   * TŠEKISSÄ ON YKSI PELIKAUPUNKI (Praha). Lähin uusi merkki on Tábor
   * 31 lautayksikön päässä siitä, joten yksikään näistä ei jää
   * kaupunkikaton alle (js/fokuskohteet.js) — kaikki kuusi ovat
   * pääkartan merkkejä. Prahan omat nähtävyydet jätettiin siksi pois:
   * ne kuuluvat kaupunkilehden kohdekartalle.
   *
   * KUVATON ERÄ. Faktat en-Wikipediasta kohde kerrallaan 11.9.2026.
   * ============================================================== */
  {
    id: 'tabor',
    nimi: 'Tábor',
    tyyppi: 'historia',
    kysymykset: [
      'Mistä kaupunki sai nimensä?',
      'Mikä Jordán on?',
    ],
    korostukset: ['taboriitti|taboriiteiksi'],
    nappi: 'Hussilaisten oma kaupunki',
    // 14.6578 E / 49.4144 N — en-Wikipedia "Tábor"
    laudat: {
      maailmankartta: { x: 6321.9, y: 1415.6 },
    },
    teksti: 'Tábor on Etelä-Böömissä Lužnice-joen varrella, noin seitsemänkymmentä kilometriä '
      + 'Prahasta etelään. Sen perustivat keväällä 1420 hussilaisliikkeen jyrkimmät kannattajat '
      + '— luultavasti Petr Hromádka Jistebnicestä ja hänen toverinsa — ja he nimesivät '
      + 'paikkansa Raamatun Taborinvuoren mukaan. Alkuperäinen nimi oli Hradiště hory Tábor. '
      + 'Kaupunki antoi nimen myös liikkeelle itselleen: hussilaisten radikaalia siipeä alettiin '
      + 'kutsua taboriiteiksi. Vanhakaupunki nousi joen yläpuoliselle kukkulalle, koska sitä oli '
      + 'helppo puolustaa, ja linnoitetusta asutuksesta tuli tukikohta, josta hussilaiset '
      + 'lähtivät voittoisille retkilleen. Tšekin sana tábor, leiri, on lainattu kaupungin '
      + 'nimestä eikä toisin päin. Keskellä kaupunkia on Jordánin tekojärvi, joka padottiin '
      + 'vuonna 1492 ja nimettiin Jordan-joen mukaan; se on Keski-Euroopan vanhin tekoallas.',
    lahde: 'en-Wikipedia "Tábor", johdanto-osa sekä osiot "Etymology", "Geography" ja '
      + '"History" (tarkistettu 11.9.2026).',
  },
  {
    id: 'olomouc',
    nimi: 'Olomoucin Kolminaisuus',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi patsas pystytettiin?',
      'Mitä sen tekijöille tapahtui?',
    ],
    korostukset: ['elohopea|elohopeayhdisteitä'],
    nappi: 'Patsas, joka vei tekijänsä',
    // 17.2508 E / 49.5939 N — en-Wikipedia "Holy Trinity Column, Olomouc"
    laudat: {
      maailmankartta: { x: 6408.4, y: 1407.8 },
    },
    teksti: 'Olomoucin Pyhän Kolminaisuuden pylväs rakennettiin vuosina 1716–1754. Se on '
      + 'kiitos ruttoepidemian päättymisestä — tauti vaivasi Määriä vuosina 1713–1715 — ja '
      + 'samalla kaupungin ylpeyden osoitus: jokainen taiteilija ja mestari oli Olomoucin '
      + 'asukas, ja lähes kaikki kuvatut pyhimykset liittyvät kaupunkiin jollain tavalla. Se on '
      + 'Tšekin suurin barokin veistosryhmä ja pääsi maailmanperintöluetteloon vuonna 2000. '
      + 'Työmaa oli tekijöilleen kova. Ensimmäisenä kuoli Wenzel Render, joka oli keksinyt koko '
      + 'ajatuksen, suunnitellut pylvään, rakentanut sen ensimmäisen vaiheen ja osallistunut '
      + 'sen rahoittamiseen; eivätkä hänen seuraajansa Franz Thoneck, Johann Wenzel Rokický ja '
      + 'Augustin Scholtz eläneet näkemään työn valmiina. Veistokset aloitti Phillip Sattler, ja '
      + 'hänen kuoltuaan Andreas Zahner teki seitsemässä vuodessa 18 veistosta ja 9 reliefiä '
      + 'ennen kuin kuoli itsekin. Kultaseppä Simon Forstner sai työnsä valmiiksi mutta menetti '
      + 'terveytensä käyttäessään kullauksessa myrkyllisiä elohopeayhdisteitä. Vihkiäisissä '
      + 'vuonna 1754 olivat läsnä keisarinna Maria Teresia ja hänen puolisonsa Frans I.',
    lahde: 'en-Wikipedia "Holy Trinity Column, Olomouc", johdanto-osa ja osio "History" '
      + '(tarkistettu 11.9.2026).',
  },
  {
    id: 'jachymov',
    nimi: 'Jáchymov',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miten dollari sai nimensä?',
      'Mitä muuta laaksosta on kaivettu?',
    ],
    korostukset: ['tolari|tolari'],
    nappi: 'Laakso, joka antoi dollarille nimen',
    // 12.9294 E / 50.3736 N — en-Wikipedia "Jáchymov"
    laudat: {
      maailmankartta: { x: 6264.3, y: 1373.9 },
    },
    teksti: 'Malmivuorten laaksossa löydettiin hopeaa vuonna 1512, ja Steffan Schlick perusti '
      + 'sinne 1516 kaivoskylän nimeltä Joachimsthal, Pyhän Joakimin laakso. Väkeä tuli niin '
      + 'paljon, että vuonna 1534 se oli Böömin kuningaskunnan toiseksi suurin kaupunki, ja '
      + 'Schlickin suvusta tuli yksi maan rikkaimmista — kunnes Ferdinand I otti '
      + 'kaivosoikeuden itselleen 1528. Vuodesta 1520 Schlickit löivät laaksossa suuria '
      + 'hopearahoja, joita kutsuttiin nimellä joachimsthaler. Nimi lyheni saksassa muotoon '
      + 'Thaler ja tšekissä muotoon tolari, ja hollannin daalderin ja dalerin kautta siitä tuli '
      + 'lopulta sana dollari. Kaivostyö ei loppunut hopeaan: Jáchymov oli maailman '
      + 'ensimmäinen ja pitkään ainoa paikka, josta louhittiin radiumia, ja vuonna 1525 avattu '
      + 'Svornostin kaivos on Euroopan vanhin yhä käytössä oleva kaivos. Alue kuuluu '
      + 'maailmanperintöluetteloon osana Malmivuorten kaivosaluetta.',
    lahde: 'en-Wikipedia "Jáchymov", johdanto-osa ja osio "History" (tarkistettu 11.9.2026).',
  },
  {
    id: 'moravskykras',
    nimi: 'Moravský kras',
    tyyppi: 'vuori',
    kysymykset: [
      'Miten Macochan kuilu syntyi?',
      'Mihin Punkva-joki katoaa?',
    ],
    korostukset: ['Macocha|Macochan'],
    nappi: 'Tuhat luolaa ja 138 metrin kuilu',
    // 16.7283 E / 49.3719 N — en-Wikipedia "Moravian Karst"
    laudat: {
      maailmankartta: { x: 6390.9, y: 1417.4 },
    },
    teksti: 'Brnon pohjoispuolella on karstimaisema, jonka alla on noin 1 100 luolaa ja '
      + 'rotkoa noin 92 neliökilometrin alueella. Tunnetuin kohta ei ole luola vaan reikä: '
      + 'Macochan kuilu on 138 metriä syvä ja syntyi, kun luolasalin katto romahti. Kuilun '
      + 'pohjalla Punkva-joki painuu maan alle ja jatkaa matkaansa Punkvan luolaston läpi; '
      + 'pinnalla siitä näkyy vain kaksi pientä lampea. Luolastoja on avattu yleisölle viisi, '
      + 'ja niistä Punkvan luolat löysi Karel Absolon. Muut ovat Balcarka, Kateřinská, '
      + 'Výpustek sekä Sloupsko-šošůvské ja siihen liittyvä Kůlna. Osaa luolista ei ole avattu '
      + 'matkailijoille lainkaan vaan ainoastaan tutkimuskäyttöön.',
    lahde: 'en-Wikipedia "Moravian Karst", johdanto-osa (tarkistettu 11.9.2026).',
  },
  {
    id: 'boubin',
    nimi: 'Boubín',
    tyyppi: 'vuori',
    kysymykset: [
      'Milloin metsä rauhoitettiin?',
      'Kuinka korkea vuori on?',
    ],
    korostukset: ['aarniometsä|aarniometsä'],
    nappi: 'Aarniometsä, joka rauhoitettiin 1858',
    // 13.8161 E / 48.9781 N — en-Wikipedia "Boubín"
    laudat: {
      maailmankartta: { x: 6293.9, y: 1434.4 },
    },
    teksti: 'Boubín on 1 362 metriä korkea vaara Etelä-Böömissä, noin kolme ja puoli '
      + 'kilometriä Kubova Hutʹin kylästä itään. Suurin osa sen rinteistä on aarniometsä, '
      + 'Boubínský prales, joka rauhoitettiin luonnonsuojelualueeksi jo vuonna 1858 — siis '
      + 'viisitoista vuotta ennen isoisäsi matkaa ja aikana, jolloin koskematonta metsää '
      + 'pidettiin useimmiten vain hakkaamattomana puutavarana. Se on siksi yksi Euroopan '
      + 'vanhimmista suojelualueista.',
    lahde: 'en-Wikipedia "Boubín", johdanto-osa (tarkistettu 11.9.2026).',
  },
  {
    id: 'lednice',
    nimi: 'Lednice ja Valtice',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka suunnitteli koko maiseman?',
      'Mikä yhdistää linnoja toisiinsa?',
    ],
    korostukset: ['maisemapuisto|maisemapuiston'],
    nappi: 'Yhden suvun suunnittelema maisema',
    // 16.8022 E / 48.8017 N — Lednicen ja Valticen välinen alue
    // Etelä-Määrissä; en-Wikipedia "Lednice–Valtice Cultural Landscape"
    laudat: {
      maailmankartta: { x: 6393.4, y: 1442.0 },
    },
    teksti: 'Etelä-Määrissä on 283 neliökilometrin alue, jonka yksi suku muotoili '
      + 'tarkoituksella maisemaksi. Liechtensteinin ruhtinaat yhdistivät 1600-luvulta '
      + '1900-luvulle omistamansa Valticen ja Lednicen yhdeksi valtavaksi puistoksi, ja '
      + '1800-luvulla he jatkoivat työtä englantilaisen maisemapuiston malliin. Valticen linna '
      + 'laajennettiin myöhäisromaanisena 1200-luvun alkupuoliskolla, vaurioitui pahoin '
      + 'hussilaissodissa ja rakennettiin barokkiin Kaarle I Liechtensteinilaisen aikana; '
      + 'Lednice oli 1300-luvulta Valticen tilaan kuulunut linnoitettu kartano, laajeni '
      + 'palatsiksi vuodesta 1680 ja sai vuosina 1846–1858 ruhtinas Alois II:n teettämän '
      + 'uusgoottilaisen asun. Vuonna 1715 linnat yhdistettiin seitsemän kilometrin pituisella '
      + 'puistotiellä, ja suuri osa siitä on yhä käytössä. Raja kulki keskellä puistoa: '
      + 'Valtice kuului Itävaltaan ja Lednice Böömin kuningaskuntaan, ja vasta Saint-Germainin '
      + 'sopimus vuonna 1919 siirsi Valticen Tšekkoslovakialle. Alue liitettiin '
      + 'maailmanperintöluetteloon 1996.',
    lahde: 'en-Wikipedia "Lednice–Valtice Cultural Landscape", johdanto-osa ja osio '
      + '"17th–19th centuries" (tarkistettu 11.9.2026).',
  },
];
