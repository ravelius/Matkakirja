/*
 * NORJAN HAHMOTELMANOSTOT — 18 uutta karttanostoa Norjan olemassa olevien
 * 12 maastokohteen (js/packs/maastokohteet-nor.js) rinnalle.
 *
 * Malli on sama kuin muiden maiden hahmotelmapakeilla, esimerkiksi
 * js/packs/hahmotelma-svn.js: jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian artikkelista omin sanoin suomeksi
 * (ei käännöskopiota, ei keksittyjä faktoja, `lahde`-riville artikkeli
 * ja tarkistuspäivä), 1873-näkökulman `nappi`-alaotsikko, kaksi pulun
 * kysymystä, `korostukset` ja vähintään kaksi Commons-kuvaa (`kuva` +
 * `kuvat`; vain public domain / CC0 / CC BY / CC BY-SA, tekijä, lisenssi
 * ja lähdesivu kirjattuna). Noin joka kolmannella nostolla on lisäksi
 * `visa`-kenttä (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta)
 * täsmälleen kuten kaupunkien täkynostoilla (js/fokusnosto.js
 * nostonVisa): vastaus löytyy noston omasta tekstistä.
 *
 * VUONNA 1873 Norja on osa Ruotsi-Norjan unionia: maalla on omat lait ja
 * oma perustuslaki vuodesta 1814, mutta yhteinen kuningas Ruotsin kanssa
 * aina vuoteen 1905 asti. `nappi`-rivit katsovat vuodesta 1873 käsin ja
 * sanovat rehellisesti, kun kohde tai tapahtuma on vielä tulevaisuutta.
 *
 * MIKSI TÄMÄ TIEDOSTO EIKÄ maastokohteet-nor.js. Jälkimmäinen on
 * koneellisesti johdettu (tools/johda-maastokohteet.mjs) ja sisältää
 * Norjan vuoret, meret ja joet; sitä EI koskettu tässä erässä. Tämä
 * tiedosto on käsin kirjoitettu, kuratoitu lisäerä samalla `laudat`-
 * kaavalla, ja se liittyy peliin samaa hakemistoreittiä pitkin
 * (js/packs/maastokohteet.js → js/fokuskohteet.js KOHDE_MAAT). Rivin
 * lisäämistä KOHDE_MAAT-tauluun ei tehty tässä erässä, kuten ei tehty
 * K2-erässä 3 (maastokohteet-nor.js:n oma huomautus) — sitä vaatii
 * rinnakkainen työ.
 *
 * MITÄ 12 VANHAA KOHDETTA KATTOIVAT JA MITÄ TÄMÄ ERÄ TÄYDENTÄÄ. Vanha
 * lista: korkein huippu (Galdhøpiggen), kaksi merta (Norjanmeri,
 * Barentsinmeri), joki (Glomma), sauvakirkko (Urnes), kaivoskaupunki
 * (Røros), kalliopiirrokset (Alta), Nordkapp, tuomiokirkko (Nidaros),
 * raskasvesitehdas (Vemork), vuoristorata (Flåmsbana) ja
 * perustuslakikaupunki (Eidsvoll). Puuttuivat kokonaan: vuonot,
 * saaristo, saamelaiskulttuuri, viikinkilaivat, ruoka ja moderni
 * tekniikka/teollisuus — juuri näihin tämä erä keskittyy. `ruoka`- ja
 * `tekniikka`-tyyppisiä nostoja ei ollut yhtään; nyt niitä on kolme ja
 * neljä.
 *
 * MITÄ JÄTETTIIN POIS JA MIKSI. Bergenin Bryggen, Oslon Oseberg-laiva
 * (museon sijainti, ei löytöpaikka) ja Holmenkollen jäisivät pääkartalla
 * pelikaupungin kohdalle (js/fokuskohteet.js KAUPUNGIN_KOHDALLA_SADE 7
 * laudan yksikköä Oslosta/Bergenistä/Tromssasta) — sama havainto, jonka
 * maastokohteet-nor.js:n K2-erä 3 teki Bryggenille ja Osebergille.
 * Kaikki tämän tiedoston 18 kohdetta on tarkistettu koneellisesti
 * `tools/johda-maastokohteet.mjs`:n `laudat`- ja `osuuLehteen`-
 * funktioilla: yksikään ei osu kolmen pelikaupungin 7 yksikön säteelle
 * eikä mikään pari ole toisiaan lähempänä kuin Barentsinmeri ja
 * Nordkapp olemassa olevassa listassa (10,6 yksikköä).
 *
 * Viikinkilaiva-nosto on nimetty Sandefjordin mukaan, koska Gokstadin
 * laivan oma Wikipedia-artikkeli antaa koordinaatit laivan nykyiselle
 * näyttelypaikalle Oslon viikinkilaivamuseossa — täsmälleen Oslon
 * laudalla, kuten Osebergillakin. Koordinaatti on siksi laivan oikea
 * löytöpaikka Sandefjordin Sandarissa (Gokstadhaugen), joka on 42
 * laudan yksikköä Oslosta.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `nor-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260921/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ja niiden JSON-metadata (osoite, lyhyt, selite,
 * lahde, tekija, lahdeUrl, lisenssi, lisenssiUrl) ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/nor/ (kuvat) ja
 * /Users/samireivinen/Matkakirja-nostot-kuvat/nor/_json/<slug>.json
 * (metadata, slug = id ilman `hahmotelma-`-etuliitettä).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 21.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Norjan fokuslehden rajaukseen
 * (`osuuLehteen`).
 *
 * Norjan maastokohteet. Faktat en-Wikipediasta 21.9.2026.
 */

/** Norjan hahmotelmanostot: sisällölliset kohteet. */
export const HAHMOTELMA_NOR = [
  {
    id: 'hahmotelma-geirangerfjord',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-geirangerfjord-f11b4b00.jpg',
      lyhyt: 'Näkymä Geirangerin kylään vuonon perukassa, taustalla lumihuippuisia vuoria.',
      selite: 'Kuva on otettu korkealta kalliolta Geirangerin kylän ja vuonon yli. Taustalla kohoavat lumen '
        + 'peittämät vuorenhuiput.',
      lahde: 'Valokuva: Jörg Hempel, Wikimedia Commons (CC BY-SA 2.0 de).',
      tekija: 'Jörg Hempel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Geirangerfjord_LC0188.jpg',
      lisenssi: 'CC BY-SA 2.0 de',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/de',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-geirangerfjord-d6c9f67d.jpg',
        lyhyt: 'Geirangervuono Flydalsjuvetin näköalapaikalta, risteilyalus vuonon pohjukassa.',
        selite: 'Kuvassa avautuu koko vuonon näkymä jyrkkien vuorten välissä, ja pohjukassa näkyy pieni '
          + 'Geirangerin kylä laivoineen.',
        lahde: 'Valokuva: Diego Delso, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Diego Delso',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fiordo_de_Geiranger_desde_Flydalsjuvet,_Noruega,_2019-09-07,_DD_59.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Geirangervuono',
    tyyppi: 'meri',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Miksi Åkernesetin epävakaa vuorenrinne on Geirangervuonon suurin uhka?',
      'Mitkä kaksi vesiputousta ovat kuuluisia siitä, että Kosija yrittää kosia sisaruksia vastapäätä?',
    ],
    korostukset: ['Åkerneset|Åkernesetin', 'Skageflå|Skageflå'],
    nappi: 'Ensimmäiset matkailijalaivat löytävät vuonon pian, mutta Unescon maailmanperintöstatus odottaa '
      + 'vielä 132 vuotta',
    // 7.129 E / 62.121 N — en-Wikipedia "Geirangerfjord"
    laudat: {
      maailmankartta: { x: 6071, y: 818.3 },
      europe: { x: 348.1, y: 259.8 },
    },
    teksti: 'Geirangervuono on 15 kilometrin pituinen sivuhaara Sunnylvsvuonosta Länsi-Norjan Sunnmøressä, '
      + 'ja sen perukassa on pieni Geirangerin kylä. Vuonon jyrkät vuorenseinämät nousevat lähes suoraan '
      + 'vedestä, ja niiltä putoaa useita vesiputouksia, joista tunnetuimmat ovat Seitsemän sisarta ja niitä '
      + 'vastapäätä oleva Kosija. Rinteillä on useita nykyään autioituneita vuoristotiloja, kuten Skageflå '
      + 'ja Knivsflå, joihin pääsi ennen vain jyrkkiä polkuja tai venettä pitkin. Vuonna 2005 Geirangervuono '
      + 'liitettiin yhdessä Nærøyvuonon kanssa Unescon maailmanperintölistalle nimellä Länsi-Norjan vuonot. '
      + 'Vuonoa uhkaa myös Åkernesetin epävakaa vuorenrinne, jonka romahtaminen voisi aiheuttaa hyökyaallon.',
    lahde: 'en-Wikipedia "Geirangerfjord", johdanto-osa ja osiot "The fjord", "Rock slides" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-naeroyfjord',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-naeroyfjord-ad18ca55.jpg',
      lyhyt: 'Vanha öljymaalaus Nærøyvuonosta, pieni höyrylaiva savuttaa kapean vuonon keskellä.',
      selite: 'Maalauksessa höyrylaiva kulkee kapean, jyrkkärinteisen vuonon halki vuonna 1902. Rannalla '
        + 'erottuu pieni kirkko ja muutama talo.',
      lahde: 'Valokuva: Henry Enfield, Wikimedia Commons (Public domain).',
      tekija: 'Henry Enfield',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Henry_Enfield_(1849-1911)_-_N%C3%A6r%C3%B8yfjord,_Norway_-_NCM_1902-31_-_Nottingham_Museums.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-naeroyfjord-2fe4d04b.jpg',
        lyhyt: 'Kapea vesiputous syöksyy Nærøyvuonon jyrkän vuorenrinteen halki.',
        selite: 'Kaksihaarainen vesiputous putoaa kalliojyrkänteeltä vihreiden rinteiden keskellä. Ylempänä '
          + 'taustalla erottuu vuoren huippu.',
        lahde: 'Valokuva: sergei.gussev, Wikimedia Commons (CC BY 2.0).',
        tekija: 'sergei.gussev',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:N%C3%A6r%C3%B8yfjord_-_49522634012.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Nærøyvuono',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Miksi Nærøyvuono on joskus jäätynyt talvisin niin pahasti, ettei sillä ole voinut liikennöidä?',
      'Mihin isompaan vuonoon Nærøyvuono ja sen kautta Aurlandsvuono lopulta liittyvät?',
    ],
    korostukset: ['Gudvangen|Gudvangenin', 'Bakka|Bakkan'],
    nappi: 'Postiveneet kulkevat vuonolla jo nyt, mutta Unescon maailmanperintötunnustus odottaa vielä 132 '
      + 'vuotta',
    // 6.93139 E / 60.94361 N — en-Wikipedia "Nærøyfjord"
    laudat: {
      maailmankartta: { x: 6064.4, y: 878.4 },
      europe: { x: 344.3, y: 290.8 },
    },
    teksti: 'Nærøyvuono on Aurlandsvuonon sivuhaara, joka puolestaan haarautuu Sognevuonosta, ja se on vain '
      + 'noin 17 kilometrin pituinen mutta kapeimmillaan vain noin 250 metriä leveä. Jyrkät vuorenrinteet '
      + 'nousevat lähes suoraan vedestä yli 1 700 metrin korkeuteen, ja Bakkan kylän eteläpuolella vuono '
      + 'kapenee alle 500 metriin, vaikka vastakkaisten huippujen väli on vain noin kolme kilometriä. '
      + 'Vuonon perukassa on Gudvangenin kylä, jonne Nærøydalselva-joki laskee. Poikkeuksellisen kylminä '
      + 'talvina, kuten 1920-luvulla ja vuonna 1962, vuono on jäätynyt niin pahasti, että laivaliikenne on '
      + 'jouduttu ohjaamaan jäänreunaa pitkin. Vuonna 2005 Nærøyvuono liitettiin yhdessä Geirangervuonon '
      + 'kanssa Unescon maailmanperintölistalle Länsi-Norjan vuonoina.',
    lahde: 'en-Wikipedia "Nærøyfjord", johdanto-osa ja osiot "Geography and physical characteristics", '
      + '"World Heritage status" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-lofoten',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-lofoten-f10e6665.jpg',
      lyhyt: 'Reinen kalastajakylä punaisine rorbu-mökkeineen jyrkkien vuorten juurella.',
      selite: 'Kuvassa on Reinen kylä Moskenesøyn saarella heijastumassa tyyneen veteen. Jyrkät '
        + 'kalliohuiput kohoavat kylän takana.',
      lahde: 'Valokuva: Jörg Hempel, Wikimedia Commons (CC BY-SA 2.0 de).',
      tekija: 'Jörg Hempel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Reine_i_Lofoten_LC0148.jpg',
      lisenssi: 'CC BY-SA 2.0 de',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/de',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-lofoten-e815c8a4.jpg',
        lyhyt: 'Turskaa kuivumassa pitkillä telineillä lumisessa Reinen kylässä.',
        selite: 'Satoja turskia riippuu puisilla kuivaustelineillä lumen keskellä, taustalla jyrkkä '
          + 'lumihuippuinen vuori.',
        lahde: 'Valokuva: Christoph Strässler, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Christoph Strässler',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Loaded_Drying_Racks_for_Stockfish_at_Reine,_Lofoten,_Norway.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Lofootit',
    tyyppi: 'saari',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Miksi Lofoottien turska kuivataan telineillä ilman suolaa toisin kuin Kristiansundin klippfisk?',
      'Mikä Vágar oli, ja miksi sitä pidetään merkittävänä löytönä Pohjois-Norjan historiassa?',
    ],
    korostukset: ['tørrfisk|tørrfisk', 'Vágar|Vágar'],
    nappi: 'Vágar on jo vuosisatoja sitten hylätty, mutta turskan kuivaus telineillä jatkuu täsmälleen '
      + 'kuten sata vuotta aiemmin',
    // 14.66667 E / 68.33333 N — en-Wikipedia "Lofoten"
    laudat: {
      maailmankartta: { x: 6322.2, y: 480.1 },
      europe: { x: 492.8, y: 96.4 },
    },
    teksti: 'Lofootit on saaristo ja perinteinen maakunta Pohjois-Norjan Nordlandissa, tunnettu jylhistä '
      + 'vuorihuipuistaan, jotka kohoavat lähes suoraan merestä. Alueella on asuttu ainakin 11 000 vuotta, '
      + 'ja rautakauden maanviljelyn ja karjanpidon jäljet ulottuvat noin vuoteen 250 eaa. Vágar, nykyisen '
      + 'Kabelvågin tienoilla sijainnut kauppapaikka, oli Pohjois-Norjan ensimmäinen tunnettu kaupunkimainen '
      + 'asutus jo viikinkiajalla. Lofoottien talous on vuosisatoja nojannut talviseen turskanpyyntiin: '
      + 'kalat puhdistetaan ja ripustetaan telineisiin kuivumaan suolaamattomina, jolloin niistä tulee '
      + 'tørrfisk-nimistä kalkkikuivattua kalaa. Nimen Lofoten alkuperä on kiistanalainen: sen on arveltu '
      + 'tarkoittavan ilveksen jalkaa tai liittyvän revontuliin, sillä saaristo on nykyään myös talvisen '
      + 'revontulimatkailun kohde.',
    lahde: 'en-Wikipedia "Lofoten", johdanto-osa ja osiot "Etymology", "History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Mihin kahteen asiaan Lofoten-nimen alkuperän on arveltu liittyvän?',
      vaihtoehdot: [
        'Karhun tassuun tai revontuliin',
        'Susien ulvontaan tai merenkäyntiin',
        'Ilveksen jalkaan tai vuorenhuippuihin',
        'Ilveksen jalkaan tai revontuliin',
      ],
      oikea: 3,
      fakta: 'Lofoottien nimen alkuperä on kiistanalainen; saaristo on nykyään myös talvisen revontulimatkailun kohde.',
    },
  },
  {
    id: 'hahmotelma-saamelaiset',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-saamelaiset-9671d293.jpg',
      lyhyt: 'Saamelaisperhe poropoikineen lavvu-telttojen edessä Pohjois-Norjassa.',
      selite: 'Vanha valokuva näyttää saamelaisperheen poronnahkaisissa vaatteissa kahden lavvu-teltan '
        + 'edessä. Etualalla makaa koira.',
      lahde: 'Valokuva: Detroit Photographic Company, Wikimedia Commons (Public domain).',
      tekija: 'Detroit Photographic Company (tuntematon valokuvaaja)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:A_Sami_Family,_Norway_WDL2626.png',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-saamelaiset-c9d0aa44.jpg',
        lyhyt: 'Norjan saamelaiskäräjien puurakenteinen rakennus Karasjoessa.',
        selite: 'Matala, puupaneloitu rakennus seisoo mäntyjen ympäröimänä. Katolla on teräviä piikkejä '
          + 'muistuttavia koristeita.',
        lahde: 'Valokuva: Astrid Carlsen (WMNO), Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Astrid Carlsen (WMNO)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sami_parliament_in_the_city_of_Karasjok.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Saamelaiskäräjät',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Mikä oli Altan kiista, ja miten se johti saamelaiskäräjien perustamiseen?',
      'Miksi poronhoito on yhä laissa varattu vain saamelaisille monilla alueilla?',
    ],
    korostukset: ['Sámediggi|Sámediggi', 'Altan kiista|Altan kiistan'],
    nappi: 'Norjan norjalaistamispolitiikka koventuu saamelaisia kohtaan vuosikymmen vuosikymmeneltä; '
      + 'saamelaiskäräjät perustetaan vasta 116 vuoden päästä',
    // 25.49611 E / 69.47083 N — en-Wikipedia "Sámi Parliament of Norway"
    laudat: {
      maailmankartta: { x: 6683.2, y: 413.8 },
      europe: { x: 700.7, y: 66.5 },
    },
    teksti: 'Saamelaiset ovat alkuperäiskansa, joka asuu perinteisesti Sápmin alueella Pohjois-Norjassa, '
      + 'Ruotsissa, Suomessa ja Venäjän Kuolan niemimaalla. Heidän elinkeinojaan ovat olleet muun muassa '
      + 'rannikkokalastus, turkismetsästys ja lampaanhoito, mutta tunnetuin niistä on puolipaimentolainen '
      + 'poronhoito, joka on yhä laillisesti varattu vain saamelaisille useilla Pohjoismaiden alueilla. '
      + 'Norjan saamelaiskäräjät eli Sámediggi perustettiin vasta vuonna 1989, kun kuningas Olav V avasi '
      + 'sen ensimmäisen istunnon Karasjoessa; sitä ennen saamelaisasioita hoiti vuodesta 1964 valtion '
      + 'nimittämä Norjan saamelaisneuvosto. Käräjien perustamista edelsi 1970–80-lukujen Altan kiista, '
      + 'jossa saamelaiset vastustivat voimalaitospadon rakentamista Mázen kylän tulva-alueelle. Nykyinen '
      + 'käräjätalo Karasjoessa valmistui vuonna 2000, ja kaupungin asukkaista noin 80 prosenttia puhuu '
      + 'saamea.',
    lahde: 'en-Wikipedia "Sámi people" ja "Sámi Parliament of Norway", johdanto-osat ja osiot "History", '
      + '"Location" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-gokstad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-gokstad-13b98a74.jpg',
      lyhyt: 'Gokstadin laiva esillä Oslon viikinkilaivamuseon holvatussa salissa.',
      selite: 'Tumma, pitkä puulaiva täyttää museosalin lattian. Ikkunoista tuleva valo korostaa laivan '
        + 'runkoa.',
      lahde: 'Valokuva: Bjørn Christian Tørrissen, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Bjørn Christian Tørrissen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gokstad_Ship_Side_View.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-gokstad-d77e7e88.jpg',
        lyhyt: 'Mustavalkoinen kuva Gokstadin laivan kaivauksesta vuonna 1880.',
        selite: 'Kaivantoon jäänyt laivan hajonnut runko näkyy kaivajien ympäröimänä. Kuvan reunalla '
          + 'seisoo katsojia hautakummun laella.',
        lahde: 'Valokuva: Kulturhistorisk museum UiO, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kulturhistorisk museum, UiO',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:CfL02219_014_museum_no._C10384_Utgravning_av_Gokstadskipet_(Gokstad_ship_excavation_1880._Kulturhistorisk_museum_UiO_Oslo,_Norway._License_CC_BY-SA_4.0).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Gokstadin laiva',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka johti Gokstadin laivan kaivauksen, ja mihin yhdistykseen hän kuului?',
      'Mihin kolmeen tarkoitukseen Gokstadin laivaa käytettiin?',
    ],
    korostukset: ['Nicolay Nicolaysen|Nicolay Nicolaysen', 'Gokstadhaugen|Gokstadhaugenista'],
    nappi: 'Laiva makaa yhä hautakummussa Sandefjordin lähellä; löytöön on vielä 7 vuotta',
    // 10.2167 E / 59.1306 N — en-Wikipedia "Gokstad ship" (löytöpaikka Sandefjordin Sandarissa)
    laudat: {
      maailmankartta: { x: 6173.9, y: 968.7 },
      europe: { x: 407.4, y: 338.5 },
    },
    teksti: 'Gokstadin laiva on 800-luvulta peräisin oleva viikinkiajan pitkälaiva, joka löytyi '
      + 'Gokstadhaugen-hautakummusta Sandefjordin Sandarista vuonna 1880. Tilan omistajan pojat kaivoivat '
      + 'sattumalta esiin laivan keulan, ja Muinaismuistoyhdistyksen puheenjohtaja Nicolay Nicolaysen '
      + 'johti varsinaisen kaivauksen samana vuonna. Laiva on 23,8 metriä pitkä ja 5,1 metriä leveä, '
      + 'rakennettu limisaumaisesti tammesta, ja se on Norjan suurin säilynyt viikinkilaiva. Laiva oli '
      + 'tarkoitettu sekä sotaan, kauppaan että ihmisten ja tavaran kuljetukseen, ja sitä ohjattiin '
      + 'perässä olevalla sivuperäsimellä. Nykyään laiva on esillä Oslon viikinkilaivamuseossa, jonne se '
      + 'siirrettiin löytöpaikaltaan Sandefjordin lähistöltä.',
    lahde: 'en-Wikipedia "Gokstad ship", johdanto-osa ja osiot "Discovery", "Construction" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Gokstadin laiva löytyi hautakummusta Sandefjordin lähellä?',
      vaihtoehdot: [
        '1867',
        '1880',
        '1897',
        '1905',
      ],
      oikea: 1,
      fakta: 'Laiva on esillä Oslon viikinkilaivamuseossa yhdessä Osebergin laivan kanssa, ja se on '
        + 'museon suurin näytteillä oleva laiva.',
    },
  },
  {
    id: 'hahmotelma-borgund',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-borgund-1117f633.jpg',
      lyhyt: 'Borgundin sauvakirkon lohikäärmepäiset katot ja tapuli vuorten edessä.',
      selite: 'Kirkon monikerroksiset, tummat vuoraukset ja lohikäärmeenpäät kohoavat hautausmaan '
        + 'keskellä. Taustalla näkyy vihreä vuorenrinne.',
      lahde: 'Valokuva: Henny Stokseth, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Henny Stokseth',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Borgund_Stavkyrkje_2016.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-borgund-e6d3c0eb.jpg',
        lyhyt: 'Borgundin sauvakirkon sisäkatto pyöreine ikkunanaukkoineen.',
        selite: 'Kirkon sisältä ylös kuvattu katto näyttää kerroksittaisen puurakenteen ja pienet pyöreät '
          + 'valoaukot.',
        lahde: 'Valokuva: Stevan Nicholas, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Stevan Nicholas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Borgund_Stave_Church_interior.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Borgundin sauvakirkko',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Borgundin sauvakirkon räystäillä on lohikäärmeenpäitä?',
      'Mitä kirkolle tapahtui vuonna 1868, ja miksi se silti säilyi purkamatta?',
    ],
    korostukset: ['Fortidsminneforeningen|Muinaismuistoyhdistys', 'Christian Christie|Christian Christien'],
    nappi: 'Vanha kirkko on juuri menettänyt seurakuntansa uudelle naapurikirkolle 1868; '
      + 'Muinaismuistoyhdistys ostaa sen vasta 1877',
    // 7.8122 E / 61.0472 N — en-Wikipedia "Borgund Stave Church"
    laudat: {
      maailmankartta: { x: 6093.7, y: 873.1 },
      europe: { x: 361.2, y: 288.1 },
    },
    teksti: 'Borgundin sauvakirkko Lærdalissa rakennettiin noin vuosina 1180–1250, ja se toimi Borgundin '
      + 'kylän seurakuntakirkkona lähes 700 vuotta. Vuonna 1868 sen kirkolliset tehtävät siirrettiin '
      + 'viereen rakennettuun uuteen Borgundin kirkkoon, ja vanha sauvakirkko muutettiin museoksi. Se on '
      + 'ainoa Norjan sauvakirkoista, jonka yhteydessä on säilynyt erillinen sauvarakenteinen kellotapuli. '
      + 'Räystäillä kohoaa neljä veistettyä lohikäärmeenpäätä, joiden on arveltu karkottavan pahoja '
      + 'henkiä. Muinaismuistoyhdistys osti kirkon vuonna 1877, ja arkkitehti Christian Christie johti '
      + '1870-luvun alun kunnostuksen, jossa myöhemmät lisäykset poistettiin kirkon palauttamiseksi '
      + 'lähemmäs keskiaikaista asuaan.',
    lahde: 'en-Wikipedia "Borgund Stave Church", johdanto-osa ja osiot "Construction", "Dragons", '
      + '"Management" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-klippfisk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-klippfisk-12623355.jpg',
      lyhyt: 'Kristiansundin satama purjelaivoineen 1880–1890-luvulla.',
      selite: 'Vanha valokuva näyttää Kristiansundin sataman täynnä purjelaivoja ja rantaan kokoontunutta '
        + 'väkeä. Taustalla erottuu kaupungin ääriviiva.',
      lahde: 'Valokuva: Axel Lindahl, Wikimedia Commons (Public domain).',
      tekija: 'Axel Lindahl',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kristiansund,_Christiansund_Bryggerne,_1880-1890,_Axel_Lindahl,_NF.WL_02620.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-klippfisk-9dba1232.jpg',
        lyhyt: 'Kaksi suolattua, kuivattua klippfisk-turskaa vierekkäin.',
        selite: 'Kuvassa on kaksi litteäksi avattua, kuivattua ja suolattua turskaa, joiden pinta on '
          + 'vaalea ja rosoinen.',
        lahde: 'Valokuva: Karl Ragnar Gjertsen, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Karl Ragnar Gjertsen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Klippfisk.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Klippfisk',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Mistä nimi klippfisk juontuu, ja miten se liittyy kalan kuivaustapaan?',
      'Miksi suolakalasta tuli tärkeä ruoka nimenomaan katolisissa maissa?',
    ],
    korostukset: ['terranova-kala|terranova-kalaksi', 'Kristiansund|Kristiansundista'],
    nappi: 'Kristiansundin satamassa purjelaivat lastaavat klippfisk-kaappeja Etelä-Eurooppaan juuri tähän '
      + 'aikaan',
    // 7.72778 E / 63.11028 N — en-Wikipedia "Dried and salted cod" (Kristiansund, Norjan klippfisk-kaupunki)
    laudat: {
      maailmankartta: { x: 6090.9, y: 766.9 },
      europe: { x: 359.6, y: 233.8 },
    },
    teksti: 'Klippfisk eli suomeksi kalliokala on suolattua ja kuivattua turskaa, jota on Norjassa '
      + 'valmistettu satoja vuosia erityisesti Kristiansundissa. Perinteisesti kala levitettiin kuivumaan '
      + 'ulkoilmaan paljaille kallioille ja rannikon kiville, mistä nimi klippfisk juontuu; nykyään '
      + 'kuivaus tapahtuu enimmäkseen sähkölämmittimillä sisätiloissa, mutta Länsi- ja Pohjois-Norjassa '
      + 'kalaa kuivataan yhä ulkona vientiin Etelä-Eurooppaan. Suolaaminen yleistyi 1600-luvulla, kun '
      + 'halpaa suolaa alkoi tulla saataville Etelä-Euroopasta, ja tuotteesta tuli perusruokaa katolisten '
      + 'maiden paastopäivinä. Norjassa kalaa kutsuttiin aluksi terranova-kalaksi Newfoundlandin mukaan, '
      + 'ennen kuin nimi klippfisk vakiintui kuvaamaan kallioilla kuivattua kalaa. Kristiansundista '
      + 'kehittyi Norjan tärkein klippfisk-kaupunki, jonka satamassa on ollut purjelaivoja lastaamassa '
      + 'kalaa vientiin.',
    lahde: 'en-Wikipedia "Dried and salted cod", johdanto-osa ja osiot "History", "Names" (tarkistettu '
      + '21.9.2026).',
    visa: {
      kysymys: 'Mitä sana klippfisk kirjaimellisesti tarkoittaa?',
      vaihtoehdot: [
        'Merikalaa',
        'Kalliokalaa',
        'Kylmäkalaa',
        'Talvikalaa',
      ],
      oikea: 1,
      fakta: 'Saman kalan suolaamatonta, pelkästään tuulessa kuivattua versiota kutsutaan stokkikalaksi '
        + '(stockfish); sitä valmistetaan erityisesti Lofoteilla.',
    },
  },
  {
    id: 'hahmotelma-brunost',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-brunost-e851ab53.jpg',
      lyhyt: 'Gudbrandsdalenin laakso ja järvi Trettenin kylän kohdalta talvella.',
      selite: 'Lumipeitteinen laakso ja jäätynyt järvi avautuvat männyn takaa. Taustalla kohoavat matalat, '
        + 'lumiset vuoret.',
      lahde: 'Valokuva: Orland, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Orland',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gudbrandsdalen_fra_Tretten.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-brunost-48444f7f.jpg',
        lyhyt: 'Lähikuva ruskeasta brunost-juustopalasta.',
        selite: 'Kuvassa on karamellinvärinen, kiinteä brunost-juustopala läheltä kuvattuna, veitsi '
          + 'vierellä.',
        lahde: 'Valokuva: color line, Wikimedia Commons (CC BY 2.0).',
        tekija: 'color line',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Brunost_-_Brown_cheese.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Brunost',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi Anne Hovin keksimä juusto ei ole tarkkaan ottaen juustoa lainkaan?',
      'Miten juuston vienti Christianiaan alkoi, ja kuka sen aloitti?',
    ],
    korostukset: ['Anne Hov|Anne Hovin', 'gudbrandsdalsost|gudbrandsdalsostin'],
    nappi: 'Anne Hovin keksintö on vain kymmenen vuotta vanha, ja gudbrandsdalsost-nimi alkaa juuri nyt '
      + 'tunkeutua Christianian kauppoihin',
    // 9.6 E / 61.6 N — en-Wikipedia "Brunost" (Gudbrandsdalen, brunostin syntyseutu)
    laudat: {
      maailmankartta: { x: 6153.3, y: 845 },
      europe: { x: 395.5, y: 273.5 },
    },
    teksti: 'Brunost eli ruskea juusto on norjalainen myöhäisjuustoperhe, jota valmistetaan keittämällä '
      + 'herasta, maidosta ja kermasta ruskeaa, makeaa massaa. Nykyisen kiinteän ja rasvaisen brunostin '
      + 'katsotaan syntyneen vuonna 1863, kun karjapiika Anne Hov keksi Gålän lähellä Valseterin '
      + 'vuoristotilalla lisätä kermaa herakeittoon ja keittää sitä, kunnes seos suli kiinteäksi '
      + 'juustomaiseksi massaksi. Hän kutsui keksintöään aluksi feitostiksi eli rasvajuustoksi, mutta '
      + 'nimi muuttui pian fløtemysostiksi. Muutettuaan Nord-Fronin Rusthågå-tilalle Hov alkoi lisätä '
      + 'seokseen myös vuohenmaitoa voimakkaamman gudbrandsdalsost-juuston valmistamiseksi, ja '
      + 'paikallinen kauppias Ole Kongsli alkoi viedä sitä Christianiaan asti. Keksintö auttoi '
      + 'merkittävästi Gudbrandsdalenin laaksoa, jonka talous oli kärsinyt viljan ja voin hintojen '
      + 'laskusta.',
    lahde: 'en-Wikipedia "Brunost", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-ekofisk',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-ekofisk-b430a299.jpg',
      lyhyt: 'Ekofisk 2/4 B -öljynporauslautta keskellä avomerta.',
      selite: 'Keltainen ja valkoinen porauslautta seisoo jalkojensa varassa aavan meren keskellä '
        + 'pilvisen taivaan alla.',
      lahde: 'Valokuva: Knudsens Fotosenter / DEXTRA Photo, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Knudsens Fotosenter / DEXTRA Photo',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ekofisk_2-4_B_oljeplatform_(DEX_KF_000632).jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-ekofisk-033e3376.jpg',
        lyhyt: 'Kaksi Ekofiskin öljynporauslauttaa ja huoltoalus niiden välissä.',
        selite: 'Kaksi suurta porauslauttaa kohoaa meren yllä, ja niiden välissä kulkee pieni huoltoalus '
          + 'myrskyisellä säällä.',
        lahde: 'Valokuva: Knudsens Fotosenter / DEXTRA Photo, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Knudsens Fotosenter / DEXTRA Photo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ekofisk_2-4_K_(DEX_KF_000635).jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Ekofisk',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mikä aiheutti Ekofisk Bravo -laitan öljyvuodon vuonna 1977?',
      'Miksi Ekofiskin öljylautat piti nostaa kuusi metriä ylemmäs 1980-luvulla?',
    ],
    korostukset: ['Red Adair|Red Adair', 'Phillips Petroleum|Phillips Petroleumin'],
    nappi: 'Pohjanmeren pohjassa lepää öljyä, jota kukaan ei vielä osaa etsiä; löytöön on 96 vuotta',
    // 3.20999 E / 56.5492 N — en-Wikipedia "Ekofisk oil field"
    laudat: {
      maailmankartta: { x: 5940.3, y: 1093.2 },
      europe: { x: 272.8, y: 406.4 },
    },
    teksti: 'Ekofisk on öljykenttä Norjan puoleisella Pohjanmerellä noin 320 kilometriä lounaaseen '
      + 'Stavangerista, ja Phillips Petroleum -yhtiö löysi sen vuonna 1969 yli 200 koeporauksen jälkeen. '
      + 'Se oli ensimmäinen öljylöytö Pohjanmerellä, ja tuotanto suoraan tankkereihin alkoi jo vuonna 1971 '
      + 'neljästä merenalaisesta kaivosta. Huhtikuussa 1977 Ekofisk Bravo -lautalla tapahtui Pohjanmeren '
      + 'suurin öljyvuoto, kun pohjaventtiili oli asennettu väärin, ja legendaarinen sammutusmies Red '
      + 'Adair osallistui vuodon tukkimiseen. 1980-luvulla huomattiin, että öljyntuotanto sai '
      + 'kalkkikivipohjaisen kentän vajoamaan odottamattoman paljon, ja elokuussa 1987 viisi toisiinsa '
      + 'liitettyä lauttaa nostettiin samanaikaisesti kuusi metriä ylemmäs hydraulisylintereillä, mikä '
      + 'kirjattiin Guinnessin ennätyskirjaan suurimpana nostoprojektina. Ekofiskin tuotannon arvioidaan '
      + 'jatkuvan ainakin vuoteen 2048 saakka.',
    lahde: 'en-Wikipedia "Ekofisk oil field", johdanto-osa ja osiot "Subsidence", "Bravo blowout" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Phillips Petroleum löysi Ekofiskin öljykentän?',
      vaihtoehdot: [
        '1959',
        '1969',
        '1977',
        '1987',
      ],
      oikea: 1,
      fakta: 'Elokuussa 1987 tehty lauttojen samanaikainen nosto käytti 108 hydraulisylinteriä, joiden '
        + 'asento pysyi synkronoituna alle kolmen millimetrin tarkkuudella 38 tunnin ajan.',
    },
  },
  {
    id: 'hahmotelma-trollstigen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-trollstigen-15114205.jpg',
      lyhyt: 'Trollstigenin mutkatie laaksossa vesiputousten välissä ylhäältä kuvattuna.',
      selite: 'Tie kiemurtelee jyrkkiä hiuspinnemutkia laakson pohjalle. Molemmilla puolilla putoaa '
        + 'korkeita vesiputouksia kallioseinämiltä.',
      lahde: 'Valokuva: Stefan Krause, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Stefan Krause',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trollstigen_HochPanno.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-trollstigen-95becca7.jpg',
        lyhyt: 'Autoja Trollstigenin jyrkissä mutkissa pilvisenä kesäpäivänä.',
        selite: 'Kuvassa näkyy useita mutkia päällekkäin vihreän vuorenrinteen halki, ja teillä kulkee '
          + 'muutama auto.',
        lahde: 'Valokuva: Edoderoo, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Edoderoo',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Trollstigen_(11).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Trollstigen',
    tyyppi: 'tekniikka',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Kuka avasi Trollstigenin virallisesti, ja minä vuonna?',
      'Miksi Trollstigen on suljettuna talvisin?',
    ],
    korostukset: ['Haakon VII|Haakon VII', 'Stigfossen|Stigfossenin'],
    nappi: 'Tätä vuoristotietä ei ole vielä edes suunniteltu; rakentaminen alkaa vasta 1928 ja avajaisiin '
      + 'on 63 vuotta',
    // 7.66667 E / 62.46667 N — en-Wikipedia "Trollstigen"
    laudat: {
      maailmankartta: { x: 6088.9, y: 800.4 },
      europe: { x: 358.4, y: 250.7 },
    },
    teksti: 'Trollstigen on mutkitteleva vuoristotie ja sola Raumassa, Møre og Romsdalin läänissä, osa '
      + 'maantietä 63 Åndalsnesin ja Valldalin välillä. Tie nousee noin 850 metrin korkeuteen '
      + 'yhdellätoista jyrkällä hiuspinnemutkalla, ja sen keskimääräinen nousuprosentti on 10. Kahdeksan '
      + 'vuoden rakennustyön jälkeen kuningas Haakon VII avasi tien virallisesti 31. heinäkuuta 1936. '
      + 'Solan huipulla olevalta 700 metrin tasanteelta avautuu näkymä Stigfossenin 320 metriä putoavaan '
      + 'vesiputoukseen, ja tie on edelleen suljettuna talvisin lumen vuoksi. Vilkkaimpina kesäpäivinä '
      + 'tietä käyttää nykyään noin 2 500 ajoneuvoa vuorokaudessa.',
    lahde: 'en-Wikipedia "Trollstigen", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-hardangervidda',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-hardangervidda-0ab81c98.jpg',
      lyhyt: 'Hardangervidda-tunturin karu maisema mökkeineen ja lampineen.',
      selite: 'Kivikkoinen tunturimaasto avautuu pienen lammen ja muutaman punaisen mökin ympärillä. '
        + 'Taustalla kohoaa lumijuovainen tunturi.',
      lahde: 'Valokuva: Sergey Ashmarin, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Sergey Ashmarin',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hardangervidda_plateau_-_Norway_-_panoramio.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-hardangervidda-3c908f64.jpg',
        lyhyt: 'Vanha stereovalokuva villipeuralaumasta Hardangervidda-tunturilla.',
        selite: 'Sarvipäinen peuralauma seisoo lumisella rinteellä laajan tunturilaakson yllä vuoden 1905 '
          + 'valokuvassa.',
        lahde: 'Valokuva: Underwood & Underwood, Wikimedia Commons (Public domain).',
        tekija: 'Underwood & Underwood',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:(45)_-_743_-_Herd_of_reindeer,_hardy_creatures_of_the_northern_wilds,_and_snow_heights_of_Hardanger_glacier,_Norway_stereofotografi_-_no-nb_digifoto_20160630_00007_bldsa_stereo_0199.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Hardangervidda',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Hardangervidda oli kivikaudella metsäisempi kuin nykyään?',
      'Miten villipeurat käyttävät tasangon itä- ja länsiosia vuodenajan mukaan?',
    ],
    korostukset: ['Sandfloegga|Sandfloegga', 'Hardangerjøkulen|Hardangerjøkulenin'],
    nappi: 'Villipeuralaumat vaeltavat tasangolla täsmälleen kuten tuhansia vuosia aiemmin; '
      + 'kansallispuistoksi tasanko julistetaan vasta 1981',
    // 7.41667 E / 60.05 N — en-Wikipedia "Hardangervidda"
    laudat: {
      maailmankartta: { x: 6080.6, y: 923.2 },
      europe: { x: 353.6, y: 314.3 },
    },
    teksti: 'Hardangervidda on Etelä-Norjan keskiosassa sijaitseva ylätasanko, Euroopan laajin laatuaan '
      + 'noin 6 500 neliökilometrin alalla ja keskimäärin 1 100 metrin korkeudessa. Sen korkein kohta on '
      + 'Sandfloegga, 1 721 metriä, ja alueella sijaitsee myös Hardangerjøkulenin jäätikkö. Ylänkö on '
      + 'puuton, karu tunturikangas, jolla laiduntaa yksi maailman suurimmista villipeuralaumoista; '
      + 'laumassa oli vielä vuonna 1996 noin 15 000 eläintä. Kivikaudella, noin 9 000–5 000 vuotta sitten, '
      + 'ilmasto oli lämpimämpi ja suuri osa tasangosta oli metsäistä, mistä muistuttavat suohon säilyneet '
      + 'männynrungot nykyisen puurajan yläpuolella. Peurat vaeltavat vuodenaikojen mukaan tasangon '
      + 'itäisiltä talvilaitumilta läntisille, rehevämmille vasomisalueille.',
    lahde: 'en-Wikipedia "Hardangervidda", johdanto-osa ja osiot "Geography and geology", "Flora and '
      + 'fauna" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-preikestolen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-preikestolen-edb96e67.jpg',
      lyhyt: 'Preikestolen-kallio Lysevuonon yllä, ihmisiä lakitasanteella.',
      selite: 'Kalliotasanne kohoaa jyrkkänä vuonon yläpuolella, ja sen laella istuu ja seisoo useita '
        + 'retkeilijöitä.',
      lahde: 'Valokuva: Stefan Krause, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Stefan Krause',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Preikestolen_Norge.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-preikestolen-f82664de.jpg',
        lyhyt: 'Vaeltajia Preikestolenin polulla sumun keskellä.',
        selite: 'Retkeilijät kulkevat kapealla polulla kalliojyrkänteen reunalla, ja tiheä sumu peittää '
          + 'näkymän alas vuonolle.',
        lahde: 'Valokuva: Åsmund Heimark, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Åsmund Heimark',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Preikestolen_-_Pulpit_Rock_fog.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Preikestolen',
    tyyppi: 'vuori',
    taso: 1,
    lahi: true,
    kysymykset: [
      'Mikä oli Preikestolenin vanha paikallinen nimi, ja mitä se tarkoittaa?',
      'Miksi kalliolle ei ole asennettu turva-aitoja?',
    ],
    korostukset: ['Hyvlatonnå|Hyvlatonnå', 'Lysevuono|Lysevuonon'],
    nappi: 'Paikkaa kutsutaan yhä vanhalla nimellä Hyvlatonnå; Prekestolen-nimi ja retkeilymatkailu '
      + 'keksitään vasta parikymmentä vuotta myöhemmin',
    // 6.18748 E / 58.98666 N — en-Wikipedia "Preikestolen"
    laudat: {
      maailmankartta: { x: 6039.6, y: 975.8 },
      europe: { x: 330, y: 342.3 },
    },
    teksti: 'Preikestolen on jyrkkä kalliotasanne Rogalannin Strandin kunnassa, joka kohoaa 604 metriä '
      + 'Lysevuonon yläpuolelle ja jonka lakitasanne on vain noin 25 kertaa 25 metriä. Paikan vanha '
      + 'paikallinen nimi oli Hyvlatonnå eli höylän hammas, ja nimi Prekestolen otettiin käyttöön vasta '
      + 'noin vuonna 1900, kun Stavangerin retkeilyseura halusi markkinoida paikkaa vaelluskohteena. '
      + 'Kalliolle ei ole koskaan asennettu aitoja tai muita turvalaitteita, koska viranomaiset ovat '
      + 'katsoneet niiden pilaavan maiseman. Vuonna 2024 kohteessa kävi jo 300 000 matkailijaa, ja polkua '
      + 'parannettiin vuonna 2013 nepalilaisten sherpojen voimin. Nykyään Preikestolen on myös suosittu '
      + 'BASE-hyppääjien pudotuspaikka.',
    lahde: 'en-Wikipedia "Preikestolen", johdanto-osa ja osiot "Name", "Access" (tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-sognefjord',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-sognefjord-2efab59b.jpg',
      lyhyt: 'Sognevuono Balestrandista kuvattuna, laituri ja penkit rannalla.',
      selite: 'Puinen laituri ja penkit ovat vuonon rannalla, ja taustalla vuono jatkuu vuorten välissä '
        + 'kauas silmänkantamattomiin.',
      lahde: 'Valokuva: Aqwis, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Aqwis',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:SognefjordenPano1.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-sognefjord-a70e8133.jpg',
        lyhyt: 'Sateenkaari Sognevuonon yllä myrskyn jälkeen.',
        selite: 'Vaalea sateenkaari kohoaa vuonon rannalta pilvisen taivaan alla, ja vuoret erottuvat '
          + 'vuonon molemmin puolin.',
        lahde: 'Valokuva: Lukas Braun, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Lukas Braun',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Regenbogen_am_Sognefjord.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Sognevuono',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Mistä Sognevuonon nimen arvellaan juontuvan?',
      'Mikä jäätikkö kohoaa Sognevuonon sisäosan yläpuolella, ja miksi se on merkittävä?',
    ],
    korostukset: ['Jostedalsbreen|Jostedalsbreen', 'Hurrungane|Hurrungane'],
    nappi: 'Sognevuono on jo tunnetusti Norjan syvin ja pisin vuono, mutta Jostedalsbreen-jäätikön '
      + 'matkailu on vasta alkamassa',
    // 5.16667 E / 61.1 N — en-Wikipedia "Sognefjord"
    laudat: {
      maailmankartta: { x: 6005.6, y: 870.4 },
      europe: { x: 310.4, y: 286.7 },
    },
    teksti: 'Sognevuono eli vuonojen kuningas on Norjan pisin ja syvin vuono, joka ulottuu 205 kilometriä '
      + 'sisämaahan Skjoldenin kylään Lusterin kunnassa. Sen syvin kohta on 1 308 metriä merenpinnan '
      + 'alapuolella, ja nimen on arveltu juontuvan vanhasta sanasta, joka viittaa vuonon suulla '
      + 'tuntuvaan voimakkaaseen vuorovesivirtaukseen. Vuono kulkee kymmenien kuntien halki, ja sen '
      + 'sisäosan yläpuolella kohoaa Jostedalsbreen, mannereurooppalaisen alueen suurin jäätikkö. Idässä '
      + 'sijaitseva Hurrungane-vuoristo nousee jopa 2 400 metriin. Kapea Nærøyvuono on yksi Sognevuonon '
      + 'lukuisista sivuhaaroista, ja koko järjestelmän tilavuus on noin 500 kuutiokilometriä.',
    lahde: 'en-Wikipedia "Sognefjord", johdanto-osa ja osiot "Geography", "Branches" (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-oljemuseo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-oljemuseo-dce457de.jpg',
      lyhyt: 'Norjan öljymuseon porauslauttaa muistuttava rakennus Stavangerin satamassa.',
      selite: 'Rakennuksen keskellä kohoaa porauslautan tornia muistuttava rakenne, ja alla roikkuu '
        + 'oranssi pelastusvene.',
      lahde: 'Valokuva: Carlos Delgado, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Carlos Delgado',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Norsk_Oljemuseum.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-oljemuseo-f95c00e0.jpg',
        lyhyt: 'Näkymä ylöspäin Norjan öljymuseon lasikattoisen julkisivun läpi.',
        selite: 'Mustat teräspalkit ja lasipinnat heijastavat pilvistä taivasta museon '
          + 'kattorakenteessa.',
        lahde: 'Valokuva: Jules Verne Times Two, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jules Verne Times Two',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Interior_view_of_the_glass_fa%C3%A7ade_of_the_Norwegian_Petroleum_Museum,_Stavanger,_Norway_julesvernex2.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Norjan öljymuseo',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Norjan öljymuseon rakennus muistuttaa merenpuolelta katsottuna porauslauttaa?',
      'Mikä teki Stavangerista Norjan öljypääkaupungin?',
    ],
    korostukset: ['Norsk Oljemuseum|Norsk Oljemuseumin', 'Ekofisk|Ekofiskin'],
    nappi: 'Stavanger on vielä puhdas kalastus- ja purjelaivakaupunki; öljyaikaan on 96 vuotta ja '
      + 'museoon 126 vuotta',
    // 5.7331 E / 58.97 N — en-Wikipedia "Norwegian Petroleum Museum"
    laudat: {
      maailmankartta: { x: 6024.4, y: 976.6 },
      europe: { x: 321.3, y: 342.7 },
    },
    teksti: 'Norjan öljymuseo eli Norsk Oljemuseum Stavangerissa avattiin vuonna 1999, ja sen '
      + 'arkkitehtuuri jäljittelee merenpuolelta katsottuna pientä öljynporauslauttaa. Museo esittelee '
      + 'Norjan öljyhistoriaa 1960-luvun puolivälistä alkaen: ensimmäisistä Pohjanmeren porauslautoista '
      + 'teräs- ja betonilauttojen kautta nykyaikaisiin tuotantolaivoihin ja merenpohjan '
      + 'järjestelmiin. Stavangerista tuli Norjan öljypääkaupunki, kun Phillips Petroleum löysi läheltä '
      + 'Ekofiskin kentän vuonna 1969 ja öljy alkoi virrata suoraan tankkereihin jo 1971. '
      + 'Museorakennus on noin 5 000 neliömetrin kokoinen ja sijaitsee näyttävällä paikalla Stavangerin '
      + 'satamassa. Se on tehnyt harvinaisesta teollisuushistoriasta suositun matkailukohteen keskellä '
      + 'vanhaa kalastuskaupunkia.',
    lahde: 'en-Wikipedia "Norwegian Petroleum Museum" ja "Ekofisk oil field", johdanto-osat (tarkistettu '
      + '21.9.2026).',
  },
  {
    id: 'hahmotelma-voss',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-voss-2f26ba3c.jpg',
      lyhyt: 'Vangsvatnet-järvi Vossissa, lumihuippuiset vuoret peilautuvat veteen.',
      selite: 'Tyyni järvi heijastaa pilviä ja lumisia vuoria. Etualalla vedestä nousee vanhoja '
        + 'puupaaluja.',
      lahde: 'Valokuva: Bene Riobó, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bene Riobó',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vangsvatnet,_Voss.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-voss-a1e57334.jpg',
        lyhyt: 'Smalahove-lampaanpää tarjolla perunoiden ja juomien kanssa.',
        selite: 'Poltettu, savustettu lampaanpää on aterialla lautasella perunoiden vierellä, pöydässä '
          + 'myös viinilaseja.',
        lahde: 'Valokuva: PerPlex, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'PerPlex',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Smalahove01.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Voss ja smalahove',
    tyyppi: 'ruoka',
    lahi: true,
    kysymykset: [
      'Miksi smalahovea sai vuoden 1998 jälkeen valmistaa vain karitsanpäistä?',
      'Mihin kahteen kuntaan Voss jaettiin vuonna 1868?',
    ],
    korostukset: ['smalahove|smalahove', 'Vangsvatnet|Vangsvatnet'],
    nappi: 'Voss on juuri viisi vuotta sitten jaettu kahtia; smalahove on yhä köyhän kansan ruokaa, ei '
      + 'matkailunähtävyys',
    // 6.41474 E / 60.62869 N — en-Wikipedia "Voss Municipality" ja "Smalahove"
    laudat: {
      maailmankartta: { x: 6047.2, y: 894.2 },
      europe: { x: 334.4, y: 299.1 },
    },
    teksti: 'Voss on kunta ja perinteinen maakunta Länsi-Norjassa Vangsvatnet-järven rannalla, ja sen '
      + 'hallintokeskus on Vossevangenin kylä. Vossin seutu tunnetaan smalahove-ruoasta, poltetusta, '
      + 'suolatusta ja savustetusta lampaanpäästä, jota keitetään tai höyrytetään kolmisen tuntia ja '
      + 'tarjoillaan lanttumuusin, perunoiden ja akvaviitin kanssa. Ruoka oli alun perin köyhien joulua '
      + 'edeltävää ruokaa, mutta nykyään se houkuttelee matkailijoita kokeilemaan sitä nimenomaan '
      + 'erikoisena ja rohkeana elämyksenä. Voss-kunta jaettiin vuonna 1868 pohjoiseen Vossestrandiin ja '
      + 'eteläiseen, pienempään Vossiin, ja vuonna 1885 sen läntinen osa erosi vielä omaksi Evangerin '
      + 'kunnakseen. Kunnan nimi juontuu todennäköisesti muinaisesta sanasta, joka viittaa veteen, ja '
      + 'liittyy alun perin Vangsvatnet-järven nimeen.',
    lahde: 'en-Wikipedia "Smalahove" ja "Voss Municipality", johdanto-osat ja osio "Municipal history" '
      + '(tarkistettu 21.9.2026).',
  },
  {
    id: 'hahmotelma-notodden',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-notodden-c74688ae.jpg',
      lyhyt: 'Norsk Hydron vanha tehdasrakennus Notoddenilla, edessä turbiini.',
      selite: 'Punainen tiilirakennus kohoaa nurmikentän takana, ja sen edessä on sininen '
        + 'näyttelyturbiini.',
      lahde: 'Valokuva: David Aasen Sandved, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'David Aasen Sandved',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Den_provisoriske_ammoniumnitratfabrikk_1915_1917.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-notodden-1b4117f6.jpg',
        lyhyt: 'Svelgfossin voimalaitoksen portti ja vuodet 1905–1907 kertova kivi.',
        selite: 'Metalliportin vierellä on kivi, jossa lukee "Svælgfos Kraftan 1905–1907". Taustalla '
          + 'erottuu voimajohtopylväitä.',
        lahde: 'Valokuva: PeltonMan, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'PeltonMan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Svelgfoss_kraftverk.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Norsk Hydro',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mihin keksintöön Norsk Hydron ensimmäinen tehdas Notoddenilla perustui, ja kuka sen kehitti?',
      'Miksi tehdas piti rakentaa juuri kosken äärelle?',
    ],
    korostukset: ['Sam Eyde|Sam Eyde', 'Kristian Birkeland|Kristian Birkelandin'],
    nappi: 'Svelgfossenin koski pauhaa vielä koskemattomana; Sam Eyden ja Birkelandin tehdas syntyy '
      + 'vasta 32 vuoden päästä',
    // 9.19139 E / 59.62944 N — en-Wikipedia "Norsk Hydro" ja "Notodden"
    laudat: {
      maailmankartta: { x: 6139.7, y: 944.1 },
      europe: { x: 387.7, y: 325.3 },
    },
    teksti: 'Norsk Hydro perustettiin 2. joulukuuta 1905 nimellä Norsk hydro-elektrisk '
      + 'Kvælstofaktieselskab, kun insinööri Sam Eyde hyödynsi norjalaisen tiedemiehen Kristian '
      + 'Birkelandin kehittämää menetelmää typen sitomiseksi ilmasta keinolannoitteeksi. Menetelmä vaati '
      + 'valtavasti sähköenergiaa, joten yhtiö rakensi voimalaitoksen Notoddenin lähellä sijaitsevaan '
      + 'Svelgfossenin koskeen, ja sen ensimmäinen tehdas Notoddenissa aloitti tuotannon vuonna 1907. '
      + 'Toinen, vielä suurempi tehdas avattiin vuonna 1911 Rjukanissa, jonka voimalle rakennettiin oma '
      + 'rautatiekin. Yhtiön rahoittajina olivat ruotsalainen Wallenberg-suku ja ranskalaiset pankit. '
      + '1920-luvulla Hydron menetelmä ei enää pystynyt kilpailemaan uuden Haber–Bosch-prosessin kanssa, '
      + 'joten yhtiö solmi vuonna 1927 kumppanuuden saksalaisen IG Farbenin kanssa.',
    lahde: 'en-Wikipedia "Norsk Hydro" ja "Notodden", johdanto-osat ja osio "First steps with fertiliser" '
      + '(tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Norsk Hydro perustettiin?',
      vaihtoehdot: [
        '1895',
        '1905',
        '1911',
        '1927',
      ],
      oikea: 1,
      fakta: 'Vuonna 1911 avattu Rjukanin tehdas tuli myöhemmin maailmankuuluksi, kun siellä alettiin '
        + '1930-luvulla tuottaa raskasta vettä, jonka tuotantoa liittoutuneet yrittivät toisessa '
        + 'maailmansodassa sabotoida ydinpommipelossa.',
    },
  },
  {
    id: 'hahmotelma-lindesnes',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-lindesnes-8977a9cc.jpg',
      lyhyt: 'Lindesnesin punavalkoinen majakka kirkkaan sinistä taivasta vasten.',
      selite: 'Valkoinen, punalyhtyinen majakka kohoaa matalan majakkamestarin talon takana kirkkaana '
        + 'päivänä.',
      lahde: 'Valokuva: Andreas Rümpel, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Andreas Rümpel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lighthouse_Lindesnes.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-lindesnes-e65a5f4d.jpg',
        lyhyt: 'Vanha postikortti Lindesnesin majakasta noin vuodelta 1960.',
        selite: 'Väripostikortissa majakka kohoaa kalliorannalla, ja sen juurella näkyy muutama '
          + 'kesäasuinen kävijä.',
        lahde: 'Valokuva: Norjan kansalliskirjasto, Wikimedia Commons (No known copyright '
          + 'restrictions).',
        tekija: 'Tuntematon valokuvaaja / Knut Aune Kunstforlag',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Norge._Lindesnes_fyr_(9912085303).jpg',
        // "No known copyright restrictions" on Flickr Commons -ohjelman
        // vakiomerkintä (kansalliskirjastot): käytännössä PD, ei NC/ND-
        // ehtoja. Rakenteinen lisenssi normalisoitu tunnistettavaksi
        // (Julkaisijan lisenssiportti js/lisenssi.js, 23.9.2026);
        // vapaamuotoinen selite lahde-rivillä säilyy ennallaan.
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://www.flickr.com/commons/usage/',
      },
    ],
    nimi: 'Lindesnesin majakka',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Minä vuonna Lindesnesiin pystytettiin ensimmäinen majakka, ja mitä se osoitti laivoille?',
      'Mitä Lindesnesin majakalle tapahtui toisen maailmansodan aikana?',
    ],
    korostukset: ['Fresnel-linssi|Fresnel-linssiä', 'Skagerrak|Skagerrakin'],
    nappi: 'Majakassa palaa vuonna 1854 asennettu linssi vanhassa tornissa; nykyinen valurautatorni '
      + 'rakennetaan vasta 1915',
    // 7.0453 E / 57.9828 N — en-Wikipedia "Lindesnes Lighthouse"
    laudat: {
      maailmankartta: { x: 6068.2, y: 1024.7 },
      europe: { x: 346.5, y: 368.7 },
    },
    teksti: 'Lindesnesin majakka Norjan eteläisimmässä kärjessä on maan vanhin majakkapaikka: '
      + 'ensimmäinen majakka pystytettiin jo vuonna 1656 osoittamaan laivoille reittiä Pohjanmereltä '
      + 'Skagerrakin ja Itämeren suuntaan. Sitä uusittiin useaan otteeseen, muun muassa vuonna 1822 '
      + 'hiilivalolla ja 1854 uudella linssillä, ja nykyinen valurautainen torni valmistui vasta vuonna '
      + '1915 vanhaa Fresnel-linssiä käyttäen. Vuonna 1920 majakalle asennettiin ensimmäinen '
      + 'sumumerkinantolaite, sireeni. Toisen maailmansodan aikana saksalaiset valtasivat majakan ja '
      + 'rakensivat sen ympärille pienen linnoituksen neljine tykkeineen; linnoituksen jäänteet, kuten '
      + 'juoksuhaudat ja tunnelit, näkyvät alueella yhä. Majakka on yhä toiminnassa ja toimii lisäksi '
      + 'museona.',
    lahde: 'en-Wikipedia "Lindesnes Lighthouse", johdanto-osa ja osio "History" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Lindesnesiin rakennettiin ensimmäinen majakka?',
      vaihtoehdot: [
        '1656',
        '1822',
        '1854',
        '1915',
      ],
      oikea: 0,
      fakta: 'Nykyinen valurautatorni on 16,1 metriä korkea, ja sen valo näkyy jopa 32,8 kilometrin '
        + 'päähän merelle.',
    },
  },
  {
    id: 'hahmotelma-dovrefjell',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-dovrefjell-39500673.jpg',
      lyhyt: 'Myskihärkä laiduntaa Dovrefjellin tunturilaaksossa.',
      selite: 'Paksuturkkinen myskihärkä seisoo vihreässä laaksossa, taustalla vesiputous ja jyrkät '
        + 'tunturinrinteet.',
      lahde: 'Valokuva: Charles J. Sharp, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Charles J. Sharp',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Muskox_(Ovibos_moschatus)_male_Dovrefjell_5.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-dovrefjell-6e59c401.jpg',
        lyhyt: 'Snøhettan lumihuippu ja jäätynyt tunturijärvi Dovrefjellillä.',
        selite: 'Louhikkoinen tunturi kohoaa jäätyneen järven yllä, ja rinteillä on lunta ja '
          + 'jääkielekkeitä.',
        lahde: 'Valokuva: Frankemann, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Frankemann',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Sn%C3%B8hetta_with_Large-,_Central_and_West_Summit.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Dovrefjell ja myskihärkä',
    tyyppi: 'elain',
    lahi: true,
    kysymykset: [
      'Miksi Dovrefjellin villipeurakanta on erityisen arvokas verrattuna Norjan muihin villipeuroihin?',
      'Milloin ja miksi myskihärät tuotiin Dovrefjellille?',
    ],
    korostukset: ['Snøhetta|Snøhetta', 'myskihärkä|myskihärkiä'],
    nappi: 'Naali vaeltaa vielä tunturissa yleisenä eläimenä; myskihärkiin on 74 vuotta ja '
      + 'kansallispuistoon 109 vuotta',
    // 9.17306 E / 62.39667 N — en-Wikipedia "Dovrefjell–Sunndalsfjella National Park"
    laudat: {
      maailmankartta: { x: 6139.1, y: 804 },
      europe: { x: 387.3, y: 252.6 },
    },
    teksti: 'Dovrefjell–Sunndalsfjellan kansallispuisto perustettiin vuonna 2002 aiemman, vuodesta 1974 '
      + 'olleen Dovrefjellin kansallispuiston pohjalta, ja se ulottuu kolmen läänin alueelle. Puiston '
      + 'korkein huippu on 2 286 metriä kohoava Snøhetta, ja alueella elää muun muassa ahmoja, maakotkia '
      + 'ja tunturihaukkoja. Dovrefjellillä ja naapurissa sijaitsevalla Rondanella elää yksi viimeisistä '
      + 'alkuperäisistä villipeurakannoista koko Fennoskandiassa, mahdollisesti peräisin muinaisesta '
      + 'Beringian väestöstä, toisin kuin muut Norjan villipeurat, jotka ovat risteytyneet '
      + 'kotieläinporojen kanssa. Alueelle tuotiin vuonna 1947 myskihärkiä, jotka olivat kadonneet '
      + 'Euroopasta sukupuuttoon jo tuhansia vuosia aiemmin, ja ne muodostavat nykyään mantereen ainoan '
      + 'pysyvän myskihärkäkannan. Naali eli tunturikettu oli alueella yleinen vielä sata vuotta sitten, '
      + 'mutta katosi kannan taantumisen myötä noin vuonna 1990, ja sitä on yritetty palauttaa alueelle '
      + 'vuodesta 2010.',
    lahde: 'en-Wikipedia "Dovrefjell–Sunndalsfjella National Park" ja "Muskox", johdanto-osat ja osio '
      + '"Ecology" (tarkistettu 21.9.2026).',
    visa: {
      kysymys: 'Minä vuonna myskihärkiä tuotiin Dovrefjellille?',
      vaihtoehdot: [
        '1905',
        '1930',
        '1947',
        '1974',
      ],
      oikea: 2,
      fakta: 'Myskihärät olivat kadonneet Euroopasta sukupuuttoon jo noin 2 700 vuotta sitten, ja osa '
        + 'Dovrefjellin kannasta on sittemmin vaeltanut myös Ruotsin puolelle.',
    },
  },
  {
    id: 'hahmotelma-steinvikholm',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-steinvikholm-add11131.jpg',
      lyhyt: 'Ilmakuva Steinvikholm linnan raunioista pienellä saarella Trondheimsfjordissa.',
      selite: 'Kuvassa nähdään linnan muurien ja tornien rauniot ilmasta kuvattuna, ympärillä avautuu '
        + 'vuonon vesi ja saaren vihreä ranta.',
      lahde: 'Valokuva: MariusVa, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'MariusVa',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Steinvikholm_Slott_Fugleperspektiv.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Steinvikholm linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka rakennutti Steinvikholm linnan ja miksi?',
      'Mitä linnalle tapahtui, kun arkkipiispa pakeni uskonpuhdistuksen myötä?',
    ],
    korostukset: ['Olav Engelbrektsson|Olav Engelbrektsson', 'uskonpuhdistus|uskonpuhdistus'],
    nappi: 'Arkkipiispan linnoitus, joka jätettiin rappeutumaan uskonpuhdistuksen jälkeen',
    // 10.81306 E / 63.54361 N — en-Wikipedia "Steinvikholm Castle" (coord-malline)
    laudat: {
      maailmankartta: { x: 6193.8, y: 744.1 },
      europe: { x: 418.8, y: 222.4 },
    },
    teksti: 'Norjan viimeinen katolinen arkkipiispa Olav Engelbrektsson rakennutti Steinvikholm linnan '
      + 'vuosina 1525–1532 pienelle saarelle Trondheimsfjordissa lähellä Trondheimia. Linnasta tuli '
      + 'keskiajan Norjan suurin linnoitus, ja se toimi arkkipiispan tukikohtana tämän vastustaessa '
      + 'Tanskan kuninkaiden Fredrik I:n ja Kristian III:n valtaa. Huhtikuussa 1537 uskonpuhdistus '
      + 'kukisti arkkipiispan vallan, ja Engelbrektsson pakeni maanpakoon Alankomaihin, jossa hän kuoli '
      + 'seuraavana vuonna. Sen jälkeen linna jätettiin autioksi, ja 1600-luvulta 1800-luvulle sen '
      + 'kivimuureja louhittiin ja myytiin rakennusaineeksi, kun Tanska-Norjan viranomaiset sallivat '
      + 'katolisen vastarinnan symbolin hajoamisen. Nykyään rauniolinnan hoidosta vastaa '
      + 'muinaismuistoyhdistys, ja saarella järjestetään joka elokuu ooppera arkkipiispan tarinasta.',
    lahde: 'en-Wikipedia "Steinvikholm Castle", johdanto-osa ja osiot "History", "Present day" '
      + '(tarkistettu 21.9.2026).',
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-steinvikholm-loistoaika.jpg',
      kadonnut: false,
      selite: 'Loistokaudellaan 1530-luvulla Steinvikholm oli arkkipiispa Olav Engelbrektssonin '
        + 'linnoitettu residenssi, jonka muurien sisällä käytiin katolisen kirkon viimeistä '
        + 'valtataistelua Norjassa.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. Faktat: '
        + 'en-Wikipedia "Steinvikholm Castle", tarkistettu 21.9.2026.',
      url: 'https://en.wikipedia.org/wiki/Steinvikholm_Castle',
    },
  },
  {
    id: 'hahmotelma-selje',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260921/nor-nosto-selje-07b74766.jpg',
      lyhyt: 'Seljan luostarin kivirauniot Seljan saarella Norjan länsirannikolla.',
      selite: 'Kuvassa on luostarikirkon ja -rakennusten harmaakivimuurien rauniot ruohoisella '
        + 'saarella, taustalla vuoria ja merta.',
      lahde: 'Valokuva: Svein-Magne Tunli, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Svein-Magne Tunli',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Selje_kloster_Abbey_Selja.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Seljan luostari',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kenen legendaan Seljan luostarisaari liittyy?',
      'Mikä tapahtuma heikensi luostaria vuonna 1305?',
    ],
    korostukset: ['Sunniva|Sunniva', 'Finnboge|Finnboge'],
    nappi: 'Pyhän Sunnivan luostarisaari, joka autioitui keskiajan lopulla',
    // 5.29694 E / 62.05111 N — en-Wikipedia "Selja Abbey" (coord-malline)
    laudat: {
      maailmankartta: { x: 6009.9, y: 821.9 },
      europe: { x: 312.9, y: 261.7 },
    },
    teksti: 'Seljan saarelle liittyy yksi Norjan vanhimmista kristillisistä legendoista: perimätiedon '
      + 'mukaan irlantilainen kuninkaantytär Sunniva pakeni pakkoavioliittoa laivalla ja haaksirikkoutui '
      + 'saarelle 900-luvulla, jossa hän kuoli piileskellessään luolassa vainoojiaan. Hänen '
      + 'pyhäinjäännöstensä ympärille syntyi suosittu pyhiinvaelluskohde, ja benediktiiniluostari '
      + 'perustettiin saarelle noin vuonna 1100, puoliväliin Bergenin ja Nidarosin merireittiä. Luostari '
      + 'koki takaiskun tuhoisassa tulipalossa vuonna 1305, ja mahdollisesti musta surma vuonna 1349 '
      + 'heikensi yhteisöä entisestään, vaikka luostarielämä saattoi jatkua vielä 1400-luvun puoliväliin '
      + 'asti. Piispa Finnboge erotti viimeisen apotin virastaan 1460–1470-luvuilla ja siirsi luostarin '
      + 'maaomaisuuden Bergenin hiippakunnalle, mikä lopetti luostaritoiminnan saarella. Koska saarelle '
      + 'ei myöhemmin asetuttu asumaan, kivirauniot ovat säilyneet hyvin nykypäivään.',
    lahde: 'en-Wikipedia "Selja Abbey", johdanto-osa ja osiot "History", "Legend of Saint Sunniva" '
      + '(tarkistettu 21.9.2026).',
    ihme: {
      osoite: 'https://media.matkakirja.app/kohtaamiset/ihmeet/ihme-selje-loistoaika.jpg',
      kadonnut: false,
      selite: 'Kukoistuskaudellaan 1100–1200-luvuilla Seljan luostarisaari oli vilkas pyhiinvaelluskohde, '
        + 'jonne matkalaiset saapuivat kunnioittamaan pyhän Sunnivan pyhäinjäännöksiä ennen niiden '
        + 'siirtoa Bergeniin.',
      lahde: 'Matkakirjan havainnekuva: kohde loistoaikansa asussa omana aikanaan. Faktat: '
        + 'en-Wikipedia "Selja Abbey", tarkistettu 21.9.2026.',
      url: 'https://en.wikipedia.org/wiki/Selja_Abbey',
    },
  },
];
