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
];
