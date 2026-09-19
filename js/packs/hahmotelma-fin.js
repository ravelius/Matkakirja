/*
 * SUOMEN HAHMOTELMANOSTOT — EU-maiden karttanostot, Espanjan, Italian,
 * Saksan, Portugalin, Kreikan, Itävallan, Alankomaiden, Tanskan ja
 * Ruotsin jälkeen Suomi.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 48 ja 51) =
 *
 * EU-maiden karttanostot tehdään Sonnet-sisältösessiolla (omistaja
 * 19.9.2026). Malli on Ranskan hahmotelma (js/packs/hahmotelma-fra.js,
 * PAATOKSET 33 ja 44) sekä muut EU-maiden pakat, viimeisimpänä Ruotsi
 * (js/packs/hahmotelma-swe.js): jokaisella nostolla on valmis sisältö —
 * `teksti` 3–5 virkettä en-Wikipedian (tarvittaessa fi-Wikipedian
 * lisälähteenä, kun en-artikkeli on tynkä; Fablen lupa 19.9.2026)
 * artikkelista omin sanoin suomeksi (ei käännöskopiota, ei keksittyjä
 * faktoja, `lahde`-riville artikkeli ja tarkistuspäivä), 1873-
 * näkökulman `nappi`-alaotsikko, kaksi pulun kysymystä, `korostukset` ja
 * vähintään kaksi Commons-kuvaa (`kuva` + `kuvat`; vain public domain /
 * CC0 / CC BY / CC BY-SA, tekijä, lisenssi ja lähdesivu kirjattuna,
 * jokaisen kuvan tiedot luettu Commonsin extmetadata-rajapinnasta).
 * PAATOKSET 51: noin joka kolmannella nostolla on lisäksi `visa`-kenttä
 * (kysymys, neljä vaihtoehtoa, oikea indeksi, fakta) täsmälleen kuten
 * kaupunkien täkynostoilla (js/fokusnosto.js nostonVisa): vastaus
 * löytyy noston omasta tekstistä. Vuonna 1873 Suomi on Venäjän
 * suuriruhtinaskunta; vuoden 1873 jälkeiset kohteet (kansallispuistot,
 * Nokian myöhempi historia) ovat mukana: teksti on nykytietoa ja `nappi`
 * katsoo vuodesta 1873 eteenpäin tai sanoo rehellisesti, että kohde
 * tulee vasta myöhemmin.
 *
 * MIKSI NÄMÄ KOHTEET: Suomen pakeissa (js/packs/maastokohteet-fin.js ja
 * kaupunkien täkynostot) on jo Halti, Pohjanlahti, Suomenlahti,
 * Kemijoki, Olavinlinna, Turun linna, Vanha Rauma, Verla, Petäjäveden
 * vanha kirkko, Sammallahdenmäki, Kerimäen kirkko, Bomarsund, Saimaa,
 * Koli, Saimaan kanava, Hämeen linna, Ruotsinsalmi, Kultala ja Oulun
 * terva sekä Kirjasota. Tämän pakin kohteet eivät toista niitä (ei samoja
 * id:itä eikä nimiä). Lappeenranta (3,1 lautayksikköä Saimaan kanavasta)
 * ja Naantali (6,7 Turun linnasta) jätettiin pois, ja tilalle tulivat
 * Tornio ja Uusikaupunki.
 *
 * === KUVAT ===========================================================
 *
 * Kuvat ovat JPEG-tiedostoja (1800 px tai alkuperäinen, jos se on
 * pienempi), nimeltään `fin-nosto-<id>-<8 hex sha256>.jpg`, ja osoite on
 * kirjattu pakkaan etukäteen muotoon
 * `https://media.matkakirja.app/karttanostot/20260920/<tiedosto>`.
 * Kuvia EI ole viety ämpäriin eikä committoitu repoon (Fable vie);
 * siihen asti osoitteet vastaavat 404:llä ja puuttuva kuva pudotetaan
 * sarjasta. Tiedostot ovat kansiossa
 * /Users/samireivinen/Matkakirja-nostot-kuvat/fin/.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ==================================
 *
 * Sama reitti kuin muidenkin EU-maiden hahmotelmilla: nämä ovat kaikki
 * pelikaupunkien (Helsinki, Tampere, Lappi) ulkopuolella, lähin nosto
 * (Nokia) yli 8 lautayksikön päässä kaupungista (raja
 * KAUPUNGIN_KOHDALLA_SADE on 7), ja js/fokuskohteet.js liittää rivit
 * KOHDE_MAAT.FIN:iin. `lahi: true` on sama lähizoomiportti kuin
 * Ranskan hahmotelmalla (js/pallolauta/nostot.js PAAKARTAN_MERKKIKATTO).
 *
 * === KOORDINAATIT ====================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`, haettu 19.9.2026) ja artikkelin nimi
 * on kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, Millerin lieriö ja
 * europe-tasaväli). Jokainen rivi osuu Suomen fokuslehden rajaukseen
 * (`osuuLehteen`). Pelin karkea maailmankartta ei ulotu kaikkiin saariin
 * ja rannikkoon (Merenkurkku ja Maarianhamina ovat FIN-renkaan
 * ulkopuolella); niiden koordinaatit ovat silti Wikipedian todelliset.
 */

/** Suomen hahmotelmanostot: sisällölliset kohteet kaupunkien (Helsinki, Tampere, Lappi) ulkopuolella. */
export const HAHMOTELMA_FIN = [
  {
    id: 'hahmotelma-punkaharju',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-punkaharju-83a29eb2.jpg',
      lyhyt: 'Ilmakuva kapeasta Punkaharjun harjusta, jonka molemmin puolin on vettä.',
      selite: 'Ilmakuva Punkaharjun harjusta Savonlinnassa, Syvälahden ja Laukanlahden välillä '
        + 'kesäkuussa 2022. Kapea metsäinen harju kohoaa järvien keskellä.',
      lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ximonic (Simo Räsänen)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Punkaharju_esker_between_Syv%C3%A4lahti_and_Laukanlahti_in_Savonlinna,_Southern_Savonia,_Finland,_2022_June.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-punkaharju-801e2a8b.jpg',
        lyhyt: 'Harjutie Punkaharjulla mäntyjen ja järvinäkymien keskellä.',
        selite: 'Tie 4792 (entinen valtatie 14) kulkee harjun päällä Punkaharjulla. Commonsin '
          + 'kuvauksen mukaan tämä on yksi harjun tunnetuimmista kohdista.',
        lahde: 'Valokuva: SeppVei, Wikimedia Commons (Public domain).',
        tekija: 'SeppVei',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Punkaharju_landscape.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-punkaharju-e0c6683f.jpg',
        lyhyt: 'Harjutie näkyy mäntyjen lomasta harjun päältä katsottuna.',
        selite: 'Punkaharjun tie kuvattuna harjun päältä mäntyjen lomasta. Harju on suurelta '
          + 'osin mäntyvaltaista harjumetsää.',
        lahde: 'Valokuva: Jan Ainali, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Jan Ainali',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Punkaharju_ridge.JPG',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Punkaharju',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Mikä jääkaudella sai aikaan Punkaharjun kapean harjun?',
      'Mitä suppa on ja miten se syntyy?',
    ],
    korostukset: ['suppa|suppia', 'Aleksanteri I|Aleksanteri I'],
    nappi: 'Suosittu nähtävyys: harjun metsät suojeltiin jo 1803, ja kruununpuisto '
      + 'perustettiin 1843',
    // 29.4 E / 61.75 N — en-Wikipedia "Punkaharju"
    laudat: {
      maailmankartta: { x: 6813.3, y: 837.3 },
      europe: { x: 775.7, y: 269.6 },
    },
    teksti: 'Punkaharju on kapea, noin seitsemän kilometriä pitkä harju Etelä-Savossa, Saimaan '
      + 'Pihlajaveden ja Puruveden välissä. Se syntyi viimeisen jääkauden aikana, kun '
      + 'mannerjäätikkö vetäytyi, ja harjun korkein kohta nousee 31 metriä Saimaan pinnan '
      + 'yläpuolelle. Jäätiköstä irronneiden jäälohkareiden sulaessa maahan painui '
      + 'kymmeniä suppia, joista osa on täyttynyt vedellä. Harjun yli rakennettiin tie jo '
      + '1700-luvulla, ja se oli osa Savonlinnasta Viipuriin johtavaa reittiä. Keisari '
      + 'Aleksanteri I määräsi vuonna 1803 säästämään harjumetsät kaadolta, ja '
      + '1800-luvulla Punkaharjusta tuli suosittu nähtävyys. Nykyään se on yksi Suomen '
      + 'kansallismaisemista.',
    lahde: 'en-Wikipedia "Punkaharju" ja fi-Wikipedia "Punkaharju (harju)", johdanto-osat ja '
      + 'fi-artikkelin osiot "Historia" ja "Luonto" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-merenkurkku',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-merenkurkku-14c06352.jpg',
      lyhyt: 'Näkymä Merenkurkun saaristoon ja mereen tornin ikkunasta Raippaluodossa.',
      selite: 'Kuva on otettu näkötornista Raippaluodossa Vaasassa. Matala ruohoinen saaristo '
        + 'ja avoin meri kuvaavat aluetta, jossa maa kohoaa yhä merestä.',
      lahde: 'Valokuva: Osmo Lundell, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Osmo Lundell',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vaasa-Kvarken-Watchtover.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-merenkurkku-e84e3df5.jpg',
        lyhyt: 'Valsörarnan punainen majakka Merenkurkussa.',
        selite: 'Valsörarnan (Valassaarten) majakka Merenkurkussa suunniteltiin vuonna 1885 '
          + 'Gustave Eiffelin ranskalaisen toimiston piirissä. Suunnittelija oli Henry '
          + 'Lepaute.',
        lahde: 'Valokuva: Erik Wannee, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Erik Wannee',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vals%C3%B6rarnas_fyr.JPG',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-merenkurkku-548b562d.jpg',
        lyhyt: 'Uusi kivinen saari Merenkurkussa, jonka maankohoaminen on nostanut esiin.',
        selite: 'Kuvassa on Merenkurkun vastasyntynyt saari, joka on syntynyt jääkauden '
          + 'jälkeisen maankohoamisen tuloksena. Kuvaajan mukaan taustalla näkyvä vihreä '
          + 'kuuluu toiseen saareen muutaman kilometrin päässä.',
        lahde: 'Valokuva: Erik Wannee, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Erik Wannee',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ny_%C3%B6_i_Kvarken.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Merenkurkun saaristo',
    tyyppi: 'saari',
    lahi: true,
    kysymykset: [
      'Miksi maa nousee Merenkurkussa yhä edelleen ylös vedestä?',
      'Mitä Merenkurkun alueelle tapahtuu noin 2 000 vuoden kuluttua?',
    ],
    korostukset: ['maankohoaminen|maankohoaminen', 'De Geer -moreeni|De Geer -moreeneja'],
    nappi: 'Kohoava saaristo: Valsörarnan majakka valmistuu vasta 1885, ja '
      + 'maailmanperintökohteeksi alue nimetään vasta 2006',
    // 21 E / 63.5 N — en-Wikipedia "Kvarken"
    laudat: {
      maailmankartta: { x: 6533.3, y: 746.4 },
      europe: { x: 614.4, y: 223.6 },
    },
    teksti: 'Merenkurkku on Pohjanlahden kapea osa, joka erottaa Perämeren Selkämerestä. '
      + 'Uloimpien saarten väli on vain noin 25 kilometriä, ja vesi on vain noin 25 metriä '
      + 'syvää. Jääkauden päättyessä noin 9 600 vuotta sitten paksu jäätikkö vetäytyi, ja '
      + 'sen painama maankuori alkoi kohota. Maankohoaminen ei ole vieläkään loppunut: maa '
      + 'nousee lähes 10 millimetriä vuodessa. Merenkurkun saaristossa on yli 5 600 pientä '
      + 'saarta ja säännöllisiä De Geer -moreeneja, ja osia siitä liitettiin Unescon '
      + 'maailmanperintökohteeseen vuonna 2006. Arvion mukaan noin 2 000 vuoden kuluttua '
      + 'merenpohja kohoaa alueella vedestä ja Pohjanlahti jakautuu kahtia.',
    lahde: 'en-Wikipedia "Kvarken", johdanto-osa ja osio "Kvarken Archipelago" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuinka nopeasti maa kohoaa Merenkurkun alueella?',
      vaihtoehdot: [
        'Noin 1 millimetrin vuodessa',
        'Noin 3 senttimetriä vuodessa',
        'Lähes 10 millimetriä vuodessa',
        'Noin metrin vuodessa',
      ],
      oikea: 2,
      fakta: 'Valsörarnan majakka valmistui vuonna 1885, ja se muistuttaa rakenteeltaan '
        + 'Eiffel-tornia. Sen suunnitteli Henry Lepaute, joka työskenteli Gustave Eiffelin '
        + 'insinööritoimistossa.',
    },
  },
  {
    id: 'hahmotelma-pallas',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-pallas-56f96b2b.jpg',
      lyhyt: 'Ilmakuva Pallastunturista ja Hanhijärven suolammesta Muoniossa.',
      selite: 'Etualalla on Hanhijärvi-niminen suolampi ja taustalla Pallastunturien pyöreitä '
        + 'huippuja Pallas-Yllästunturin kansallispuistossa kesäkuussa 2021.',
      lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ximonic (Simo Räsänen)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pallastunturi_and_Hanhij%C3%A4rvi_in_Muonio,_Lapland,_Finland,_2021_June.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-pallas-934cbac9.jpg',
        lyhyt: 'Syksyinen Pallastunturi ja Pallasjärvi Punainenhiekan rannalta katsottuna.',
        selite: 'Kuvassa näkyvät Pallastunturi ja Pallasjärvi syyskuussa 2021. Tunturit ovat '
          + 'Muonion alueella, mutta järvi jakautuu Muonion ja Kittilän kesken.',
        lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ximonic (Simo Räsänen)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pallastunturi_and_Pallasj%C3%A4rvi_lake,_Kittil%C3%A4,_Lapland,_Finland,_2021_September.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-pallas-5ace7d3a.jpg',
        lyhyt: 'Poroja Taivaskerolla avoimessa tunturimaisemassa.',
        selite: 'Poroja Taivaskerolla, joka on Pallas-Yllästunturin kansallispuiston korkein '
          + 'kohta. Kuvassa katsotaan länteen.',
        lahde: 'Valokuva: Fanny Schertzer, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Fanny Schertzer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Reindeers_on_the_Taivaskero.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Pallas-Yllästunturin kansallispuisto',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Pallaksen tunturit ovat pyöreitä eivätkä teräviä vuorenhuippuja?',
      'Mitä sana kero tarkoittaa ja mistä sen tunnistaa tunturilla?',
    ],
    korostukset: ['poimuvuoristo|poimuvuoriston', 'kero|kero'],
    nappi: 'Kansallispuistoa ei vielä ole: ajatus nousee 1910 ja ensimmäinen Pallaksen puisto '
      + 'perustetaan 1938',
    // 24.0403 E / 68.1589 N — en-Wikipedia "Pallas-Yllästunturi National Park"
    laudat: {
      maailmankartta: { x: 6634.7, y: 490.1 },
      europe: { x: 672.8, y: 101 },
    },
    teksti: 'Pallas-Yllästunturin kansallispuisto on Suomen kolmanneksi suurin, noin 1 020 '
      + 'neliökilometrin laajuinen kansallispuisto Länsi-Lapissa. Maisemaa hallitsee noin '
      + '100 kilometrin pituinen tunturijono, joka on muinaisen poimuvuoriston kuluneet '
      + 'juuret, sekä havumetsävyöhyke. Sana kero tarkoittaa tunturin pyöreää, puutonta '
      + 'huippua, ja puiston korkein kohta on Pallastunturien Taivaskero, 809 metriä '
      + 'merenpinnan yläpuolella. Hetta–Pallas-reitti on puiston tunnetuin vaellusreitti '
      + 'ja Suomen vanhin merkitty vaellusreitti vuodelta 1934. Nykyisessä muodossaan '
      + 'puisto perustettiin vuonna 2005, ja vierailijamäärillä mitattuna se on Suomen '
      + 'suosituin kansallispuisto.',
    lahde: 'en-Wikipedia "Pallas-Yllästunturi National Park", johdanto-osa sekä osiot "Hiking '
      + 'opportunities", "Geography and nature" ja "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-oulanka',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-oulanka-b4a0a02c.jpg',
      lyhyt: 'Kiutaköngäs-koski Oulankajoella kallioiden ja metsän keskellä.',
      selite: 'Kiutaköngäs on koski Oulankajoessa Oulangan kansallispuistossa Kuusamossa. '
        + 'Kuvassa vaahtoava vesi virtaa punertavien kalliojyrkänteiden ja havumetsän '
        + 'välissä.',
      lahde: 'Valokuva: Jochen.wurster, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Jochen.wurster',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karhunkierros_-_Kiutakongas2.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-oulanka-0483deed.jpg',
        lyhyt: 'Oulangan kanjoni ylhäältä: joki virtaa kallioseinämien välissä havumetsän '
          + 'halki.',
        selite: 'Ilmakuva Oulangan kanjonista kesäkuussa 2021. Oulankajoki kuohuu kallioisen '
          + 'rotkon pohjalla, ja ympärillä on havumetsää.',
        lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Ximonic (Simo Räsänen)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Oulanka_Canyon_in_Oulanka_National_Park,_Salla,_Lapland,_Finland,_2021_June.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-oulanka-e9a36b98.jpg',
        lyhyt: 'Portaita Karhunkierroksen vaellusreitillä havumetsässä.',
        selite: 'Karhunkierros on 80 kilometrin vaellusreitti Oulangan kansallispuiston halki '
          + 'Kuusamossa. Commonsin kuvauksen mukaan sen kulkeminen kestää 4–7 päivää.',
        lahde: 'Valokuva: Heather Sunderland, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Heather Sunderland',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:80km_Karhunkierros_Hiking_Trail.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Oulangan kansallispuisto',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Miksi Oulangan luonnossa kohtaavat pohjoiset, eteläiset ja itäiset lajit?',
      'Mitä Karhunkierrokselta voi nähdä ja kokea vuoden ympäri?',
    ],
    korostukset: ['Karhunkierros|Karhunkierros', 'putkilokasvi|putkilokasvilajia'],
    nappi: 'Puisto perustetaan vasta 1956; suomalaiset asukkaat ovat tulleet seudulle '
      + '1600-luvun lopulla',
    // 29.3386 E / 66.3756 N — en-Wikipedia "Oulanka National Park"
    laudat: {
      maailmankartta: { x: 6811.3, y: 590.8 },
      europe: { x: 774.5, y: 147.9 },
    },
    teksti: 'Oulangan kansallispuisto on noin 270 neliökilometrin laajuinen alue '
      + 'Pohjois-Pohjanmaalla ja Lapissa, ja se rajautuu Venäjän Paanajärven '
      + 'kansallispuistoon. Puisto perustettiin vuonna 1956, ja sen luonnossa yhdistyvät '
      + 'pohjoinen, eteläinen ja itäinen luonto: laajoja soita, koskia ja hiekkarantaisia '
      + 'jokilaaksoja sekä koskematonta havumetsää. Ravinteikas maaperä on tehnyt alueesta '
      + 'harvinaisten kasvien kotia, ja siellä kasvaa yli 500 putkilokasvilajia. Tunnetuin '
      + 'vaellusreitti on 80 kilometrin Karhunkierros, joka on kuljettavissa ympäri '
      + 'vuoden. Alueen ensimmäiset asukkaat olivat saamelaisia, ja 1600-luvun lopulla '
      + 'seudulle saapui suomalaisia uudisasukkaita.',
    lahde: 'en-Wikipedia "Oulanka National Park", johdanto-osa sekä osiot "History", "Nature" '
      + 'ja "Hiking" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-aavasaksa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-aavasaksa-992296fc.jpg',
      lyhyt: 'Aavasaksan vaara nähtynä Ruotsin Ylitornion keskustasta.',
      selite: 'Kuvassa Aavasaksa nähtynä Ruotsin Ylitornion (Övertorneån) keskustasta '
        + 'Matarengista. Vaara kohoaa selvästi ympäristöään korkeammalle.',
      lahde: 'Valokuva: Swevixen, Wikimedia Commons (CC0).',
      tekija: 'Swevixen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aavasaksa_3.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-aavasaksa-51163982.jpg',
        lyhyt: 'Keisarinmaja, koristeellinen hirsirakennus Aavasaksan huipulla.',
        selite: 'Keisarinmaja on koristeellinen, metsästysmajaa muistuttava hirsirakennus '
          + 'Aavasaksan huipulla. Sen rakentaminen aloitettiin Aleksanteri II:n vierailua '
          + 'ajatellen, mutta vierailu ei toteutunut.',
        lahde: 'Valokuva: Htm, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Htm',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Aavasaksa_imperial_lodge_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-aavasaksa-8618e0ae.jpg',
        lyhyt: 'Näkymä Aavasaksan huipulta pohjoiseen Tengeliönjoen mutkan yli.',
        selite: 'Commonsin kuvauksen mukaan tämä on Aavasaksan tunnetuin näkymä, erityisesti '
          + 'juhannuksena, kun keskiyön aurinko kulkee lähellä kukkuloiden muodostamaa '
          + 'horisonttia. Etualalla on Tengeliönjoen mutka.',
        lahde: 'Valokuva: Clem23, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Clem23',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:AavasaksaNorth.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Aavasaksa',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi Ranskan tiedeakatemia lähetti tutkijoita mittaamaan juuri Aavasaksalla?',
      'Miksi Aavasaksalle rakennettiin Keisarinmaja, vaikka keisari ei koskaan tullut käymään?',
    ],
    korostukset: ['Struven ketju|Struven ketjun', 'keskiyön aurinko|keskiyön aurinko'],
    nappi: 'Vanhastaan tunnettu näköalapaikka ja Struven ketjun mittauspiste; Keisarinmaja '
      + 'valmistuu vasta 1883',
    // 23.725 E / 66.3978 N — en-Wikipedia "Aavasaksa"
    laudat: {
      maailmankartta: { x: 6624.2, y: 589.6 },
      europe: { x: 666.7, y: 147.3 },
    },
    teksti: 'Aavasaksa on 242 metriä korkea vaara Ylitorniolla Lapissa Tornionjoen varrella. '
      + 'Se kohoaa selvästi ympäristön vaaroja korkeammalle, ja siltä avautuu näkymiä sekä '
      + 'Suomeen että Ruotsiin. Ranskan tiedeakatemia teki vaaralla mittauksia vuosina '
      + '1736–1737 Pierre Louis Maupertuis\'n johdolla, ja 1800-luvun alkupuoliskolla se '
      + 'oli yksi Struven ketjun mittauspisteistä, minkä vuoksi se on Unescon '
      + 'maailmanperintökohde. Huipulla on koristeellinen Keisarinmaja, jonka rakentaminen '
      + 'aloitettiin keisari Aleksanteri II:n vierailua ajatellen, mutta vierailu ei '
      + 'koskaan toteutunut. Aavasaksaa pidetään Suomen eteläisimpänä paikkana, jossa '
      + 'keskiyön aurinko näkyy.',
    lahde: 'en-Wikipedia "Aavasaksa" ja fi-Wikipedia "Aavasaksa", johdanto-osat (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-imatra',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-imatra-a534ab38.jpg',
      lyhyt: 'Fotokromikuva Imatrankosken kuohuvasta vedestä 1890-luvun tienoilta.',
      selite: 'Värillinen fotokromikuva Imatrankoskesta vuosien 1890 ja 1900 väliltä. Koski '
        + 'kuohuu vapaana, ennen kuin se padottiin vuonna 1929.',
      lahde: 'Valokuva: Photochrom Print Collection, Wikimedia Commons (Public domain).',
      tekija: 'Photochrom Print Collection',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_rapids_from_the_bridge,_Imatra,_Russia,_(i.e.,_Finland)-LCCN2001697419.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-imatra-b7a87611.jpg',
        lyhyt: 'Toinen fotokromi Imatrankoskesta: virta kuohuu metsäisten rantojen välissä.',
        selite: 'Värillinen fotokromikuva kosken virrasta vuosien 1890 ja 1900 väliltä; '
          + 'keskellä näkyy pieni metsäinen saari.',
        lahde: 'Valokuva: Photochrom Print Collection, Wikimedia Commons (Public domain).',
        tekija: 'Photochrom Print Collection',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_rapids_toward_the_pavillion,_Imatra,_Russia,(i.e.,_Finland)-LCCN2001697418.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-imatra-a49eaa19.jpg',
        lyhyt: 'Imatrankoski nykyään: kuohuva vesi virtaa kallioisten rantojen välissä.',
        selite: 'Imatrankoski Vuoksessa heinäkuussa 2013. Kuvassa vesi kuohuu kallioisen uoman '
          + 'ja metsäisten rantojen välissä.',
        lahde: 'Valokuva: Ninaraas, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Ninaraas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Imatra_Rapids_River_Vuoksi.jpg',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Imatrankoski',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Mitä Imatrankoskelle tapahtui vuonna 1929, ja miksi se kuohuu nykyään vain tiettyinä hetkinä?',
      'Miksi Imatrankoskella vieraili niin arvovaltaisia matkailijoita?',
    ],
    korostukset: ['Kruununpuisto|Kruununpuisto', 'Katariina Suuri|Katariina Suuri'],
    nappi: 'Jo Katariina Suuren vierailusta 1772 tunnettu matkailukohde; voimalaitos padottaa '
      + 'kosken vasta 1929',
    // 28.7736 E / 61.1695 N — en-Wikipedia "Imatrankoski"
    laudat: {
      maailmankartta: { x: 6792.5, y: 866.9 },
      europe: { x: 763.7, y: 284.8 },
    },
    teksti: 'Imatrankoski on Vuoksen koski Imatralla, ja siitä tuli kuuluisa matkailukohde jo '
      + '1700-luvun lopulla. Vuoksi ja koski syntyivät noin 5 000 vuotta sitten, kun '
      + 'Saimaan vedet murtautuivat Salpausselän reunamuodostuman läpi jääkauden jälkeisen '
      + 'maankohoamisen vuoksi. Matkailun katsotaan alkaneen vuonna 1772, kun Venäjän '
      + 'keisarinna Katariina Suuri vieraili koskella, ja Suomen vanhin luonnonpuisto '
      + 'Kruununpuisto perustettiin vuonna 1842 keisari Nikolai I:n aikana. 1800-luvun '
      + 'lopulla Imatrankoski oli yksi Euroopan tunnetuimmista luontonähtävyyksistä. '
      + 'Vuodesta 1929 koski on ollut padottu, kun Imatran voimalaitos aloitti '
      + 'toimintansa, mutta pato avataan kesäisin ja koski kuohuu jälleen.',
    lahde: 'en-Wikipedia "Imatrankoski", johdanto-osa ja osiot "Geological history" ja '
      + '"Tourism" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Imatrankosken matkailun katsotaan alkaneen Katariina Suuren '
        + 'vierailusta?',
      vaihtoehdot: [
        '1672',
        '1772',
        '1842',
        '1929',
      ],
      oikea: 1,
      fakta: 'Brasilian keisari Pedro II vieraili Imatrankoskella vuonna 1876, ja koskelle '
        + 'rakennettu Valtionhotelli avattiin vasta vuonna 1903.',
    },
  },
  {
    id: 'hahmotelma-paijanne',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-paijanne-677917b4.jpg',
      lyhyt: 'Thorsten Waenerbergin maalaus kesäpäivästä Päijänteellä, vuodelta 1902.',
      selite: 'Maalaus on Kansallisgallerian kokoelmassa, ja sen päiväys Commonsissa on 1902. '
        + 'Se esittää kesäistä järvimaisemaa, jossa metsäisiä saaria ja niemiä on '
        + 'runsaasti.',
      lahde: 'Valokuva: Thorsten Waenerberg, Wikimedia Commons (Public domain).',
      tekija: 'Thorsten Waenerberg',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Thorsten_Waenerberg_-_A_Summer%27s_Day_on_Lake_P%C3%A4ij%C3%A4nne_-_A_I_729_-_Finnish_National_Gallery.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-paijanne-6a137338.jpg',
        lyhyt: 'Näkymä Haukkavuorelta Päijänteen selälle Korpilahdella.',
        selite: 'Kuva on otettu Haukkavuorelta Korpilahdelta, joka kuuluu nykyään Jyväskylään. '
          + 'Näkymässä on järven selkä, saaria ja metsäisiä rantoja.',
        lahde: 'Valokuva: Tiia Monto, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Tiia Monto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P%C3%A4ij%C3%A4nne.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-paijanne-3636a5ff.jpg',
        lyhyt: 'Auringonlasku Päijänteellä Sysmässä, oikealla Päijätsalon saari.',
        selite: 'Kuvan oikealla puolella näkyy Päijätsalon saari, joka on Commonsin kuvauksen '
          + 'mukaan osa Päijätsalon luonnonpuistoa. Kuva on otettu Sysmässä.',
        lahde: 'Valokuva: Joonas Lyytinen, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Joonas Lyytinen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:P%C3%A4ij%C3%A4nne_and_p%C3%A4ij%C3%A4tsalo.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Päijänne',
    tyyppi: 'jarvi',
    lahi: true,
    kysymykset: [
      'Mistä Päijänteen nimi voisi olla peräisin, kun kukaan ei tiedä sen merkitystä varmasti?',
      'Miksi laivat olivat pitkään tärkein tapa kulkea Päijänteen rantakylien ja -kaupunkien välillä?',
    ],
    korostukset: ['Kymijoki|Kymijokea', 'Päijänteen kansallispuisto|Päijänteen kansallispuisto'],
    nappi: 'Keski-Suomen kulkuväylä, jota pitkin laivat kuljettivat väkeä ja tavaraa vielä '
      + '1940-luvulle asti',
    // 25.5 E / 61.5833 N — en-Wikipedia "Päijänne"
    laudat: {
      maailmankartta: { x: 6683.3, y: 845.8 },
      europe: { x: 700.8, y: 274 },
    },
    teksti: 'Päijänne on Suomen toiseksi suurin järvi, jonka vedet virtaavat Kymijokea pitkin '
      + 'Suomenlahteen. Järvi on yli sata kilometriä pitkä, ja sen syvin kohta, 95,3 '
      + 'metriä, on Suomen järvistä syvin. Päijänteen nimen alkuperää ei tiedetä varmasti, '
      + 'mutta sen on arveltu periytyvän jostakin suomalais-ugrilaista kantakieltä '
      + 'vanhemmasta kielestä. Aina 1940-luvulle asti järvi oli Keski-Suomen tärkeä '
      + 'kulkuväylä, jolla laivat kuljettivat matkustajia ja tavaraa rantojen välillä. '
      + 'Eteläosassa on nykyään Päijänteen kansallispuisto, jonka vesillä on noin '
      + 'viisikymmentä rakentamatonta saarta, ja järven alta kulkee vesitunneli Helsingin '
      + 'seudulle.',
    lahde: 'en-Wikipedia "Päijänne" ja fi-Wikipedia "Päijänne", johdanto-osat (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Minkä joen kautta Päijänteen vedet virtaavat Suomenlahteen?',
      vaihtoehdot: [
        'Kokemäenjoki',
        'Oulujoki',
        'Kymijoki',
        'Vuoksi',
      ],
      oikea: 2,
      fakta: 'Päijänteen rannoilla on noin 16 000 mökkiä. Järven eteläosan puhtaan veden '
        + 'hyväksi työtä tehnyt yhdistys sai vuonna 1995 Euroopan komission matkailu- ja '
        + 'ympäristöpalkinnon.',
    },
  },
  {
    id: 'hahmotelma-lemmenjoki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-lemmenjoki-581dc73d.jpg',
      lyhyt: 'Syksyn värit heijastuvat Lemmenjoen tyyneen veteen.',
      selite: 'Rinne hehkuu syksyn väreissä Lemmenjoen rannalla, ja tyyni vesi peilaa värit. '
        + 'Kuva on otettu Lemmenjoen kansallispuistossa.',
      lahde: 'Valokuva: Ilona Simomaa, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Ilona Simomaa',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lemmenjoki_Autumn.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-lemmenjoki-cfc1f85e.jpg',
        lyhyt: 'Vaeltaja polulla kohti Karhu-Korhosen kirjastoa Lemmenjoen '
          + 'kansallispuistossa.',
        selite: 'Punakeltainen mökki on Commonsin sivun mukaan Karhu-Korhosen kirjasto, joka '
          + 'sijaitsee Lemmenjoen kansallispuistossa Inarissa. Avoin tunturimaasto ja '
          + 'polku antavat käsityksen puiston laajuudesta.',
        lahde: 'Valokuva: Markus Säynevirta, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Markus Säynevirta',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karhu-Korhosen_kirjasto,_Lemmenjoki_National_Park,_Inari_(August_2019,_1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-lemmenjoki-a3aa2cd0.jpg',
        lyhyt: 'Kivikkoinen joenranta ja mäntyjä Lemmenjoen kansallispuistossa.',
        selite: 'Kuvassa virtaa kirkas vesi kivikkoisen rannan vieressä, ja rinteellä kasvaa '
          + 'mäntyjä. Commonsin sivun mukaan kuva on otettu Lemmenjoen kansallispuistossa '
          + 'Lapissa.',
        lahde: 'Valokuva: Nemo bis, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Nemo bis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lapland_-_Lemmenjoki_National_Park_-_20180727170023.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Lemmenjoen kansallispuisto',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Miksi koneellinen kullanhuuhdonta kiellettiin Lemmenjoen kansallispuistossa?',
      'Mitä Kultareitin varrella voi oppia kullankaivusta ja alueen tarinoista?',
    ],
    korostukset: ['Lemmenjoki|Lemmenjoesta', 'Kultareitti|Kultareitti'],
    nappi: 'Kansallispuisto perustetaan vasta vuonna 1956; vuonna 1873 sitä ei vielä ole '
      + 'olemassa',
    // 25.5 E / 68.5 N — en-Wikipedia "Lemmenjoki National Park"
    laudat: {
      maailmankartta: { x: 6683.3, y: 470.5 },
      europe: { x: 700.8, y: 92.1 },
    },
    teksti: 'Lemmenjoen kansallispuisto sijaitsee Lapissa Inarin ja Kittilän kuntien alueella, '
      + 'ja se on perustettu vuonna 1956. Noin 2 850 neliökilometrin laajuisena se on '
      + 'Suomen suurin kansallispuisto ja yksi Euroopan suurimmista. Puisto on saanut '
      + 'nimensä sen halki virtaavasta, noin 80 kilometriä pitkästä Lemmenjoesta, ja '
      + 'osaksi se rajoittuu Norjan Anárjohkan kansallispuistoon. Kullankaivun historiaan '
      + 'voi tutustua Kultareitti-nimisellä vaellusreitillä, jonka varrella on vanhoja '
      + 'kulta-alueita ja mökkejä. Koneellinen kullanhuuhdonta kiellettiin puistossa '
      + 'vuonna 2020 ympäristöhaittojen vuoksi, ja nykyään kultaa etsitään vain käsityönä, '
      + 'esimerkiksi pannulla ja lapiolla.',
    lahde: 'en-Wikipedia "Lemmenjoki National Park" ja fi-Wikipedia "Lemmenjoen '
      + 'kansallispuisto", johdanto-osat ja en-osio "Gold Prospecting" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-porvoo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-porvoo-10b7278d.jpg',
      lyhyt: 'Porvoon tuomiokirkko ja vanhakaupunki vastarannalta talvisena päivänä.',
      selite: 'Keskiaikainen tuomiokirkko kohoaa värikkäiden puutalojen yläpuolelle. Kuva on '
        + 'otettu vastarannalta, ja rannalla on lunta.',
      lahde: 'Valokuva: Zache, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Zache',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Porvoon_tuomiokirkko_ja_Vanha_Porvoo_vastarannalta.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-porvoo-574c9f55.jpg',
        lyhyt: 'Punaisia puutaloja ja varastoja veden äärellä Porvoon vanhassa kaupungissa.',
        selite: 'Vanha kaupunki on tunnettu hyvin säilyneistä 1700- ja 1800-luvun '
          + 'rakennuksistaan. Kuvassa on värikkäitä puutaloja ja punaisia rantavarastoja '
          + 'veden äärellä.',
        lahde: 'Valokuva: Richard Mortel from Riyadh, Saudi Arabia, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Richard Mortel from Riyadh, Saudi Arabia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Porvoo_Old_Town_(59)_(36291141740).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-porvoo-af8792f0.jpg',
        lyhyt: 'Porvoon keskiaikainen tuomiokirkko valkoisine seinineen ja tiilikoristeisine '
          + 'päätyineen.',
        selite: 'Kirkon vaalea rappaus ja koristeltu punatiilinen päätykolmio erottuvat '
          + 'tummasta kattopinnasta. Kuva on otettu syyskuussa 2024.',
        lahde: 'Valokuva: Christian David, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Christian David',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Porvoo_Cathedral_in_September_2024.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Porvoo',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Porvoon vanha kaupunki on säilynyt niin hyvin, vaikka sen purkamista suunniteltiin?',
      'Mitä Porvoossa tapahtui vuonna 1809, ja miksi se muutti Suomen aseman?',
    ],
    korostukset: ['Porvoon valtiopäivät|Porvoon valtiopäivillä', 'tuomiokirkko|tuomiokirkko'],
    nappi: 'Vuoden 1809 valtiopäivien kaupunki; vanha kaupunki on rakennettu vuoden 1760 '
      + 'palon jälkeen entiselle kaupunkisuunnitelmalle',
    // 25.6639 E / 60.3944 N — en-Wikipedia "Porvoo"
    laudat: {
      maailmankartta: { x: 6688.8, y: 906 },
      europe: { x: 703.9, y: 305.2 },
    },
    teksti: 'Porvoo on Suomenlahden rannikolla Uudellamaalla sijaitseva kaupunki, joka kuului '
      + 'Suomen kuuteen keskiaikaiseen kaupunkiin. Sen vanha kaupunki on tunnettu '
      + 'tiiviistä, keskiaikaisesta katuverkostaan ja pääosin puisista 1600- ja 1700-luvun '
      + 'taloistaan. Vanhan kaupungin keskipisteenä on 1400-luvulla rakennettu '
      + 'tuomiokirkko. Vuoden 1760 tulipalossa tuhoutui noin kaksi kolmasosaa '
      + 'rakennuksista, mutta uudet talot rakennettiin vanhoille perustuksille '
      + 'kaupunkisuunnitelmaa muuttamatta. Vuonna 1809 Porvoon valtiopäivillä tsaari '
      + 'Aleksanteri I teki Suomesta autonomisen suuriruhtinaskunnan.',
    lahde: 'en-Wikipedia "Porvoo", johdanto-osa ja osiot "History" ja "Urban development" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuinka suuri osa Porvoon rakennuksista tuhoutui vuoden 1760 tulipalossa?',
      vaihtoehdot: [
        'Noin kaksi kolmasosaa',
        'Noin kymmenesosa',
        'Noin neljäsosa',
        'Lähes jokainen talo',
      ],
      oikea: 0,
      fakta: 'Vanha kaupunki oli 1800-luvulla lähellä purkamista uuden kaupunkisuunnitelman '
        + 'vuoksi, mutta kansalaisvastarinta, jota johti kreivi Louis Sparre, pysäytti '
        + 'hankkeen. Tuomiokirkko on palanut viisi kertaa, viimeksi vuonna 2006.',
    },
  },
  {
    id: 'hahmotelma-hamina',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-hamina-32918e46.jpg',
      lyhyt: 'Haminan raatihuone keltaisine kellotorneineen.',
      selite: 'Raatihuone rakennettiin vuonna 1798, ja Carl Ludvig Engel uudisti sen vuonna '
        + '1840. Kuva on otettu Haminassa syyskuussa 2014.',
      lahde: 'Valokuva: Olga1969, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Olga1969',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hamina_Town_Hall_September_2014.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-hamina-a7cf10fc.jpg',
        lyhyt: 'Haminan linnoituksen Keskusbastionin tiiliseinä ja holvikaarien puiset ovet.',
        selite: 'Keskusbastioni lisättiin linnoitukseen 1700-luvun lopulla, ja nykyään sitä '
          + 'käytetään kulttuuritapahtumiin. Kuvassa näkyy sen punatiilinen seinä ja '
          + 'holvikaarien ovet.',
        lahde: 'Valokuva: Niera, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Niera',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Hamina_Central_bastion_(1).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-hamina-5054c8ae.jpg',
        lyhyt: 'Reserviupseerikoulun keltainen klassistinen päärakennus Haminassa.',
        selite: 'Kuvan rakennus on Commonsin sivun mukaan Haminan Reserviupseerikoulu. '
          + 'Artikkelin mukaan koulu aloitti vuonna 1920 kadettikoulun entisissä tiloissa.',
        lahde: 'Valokuva: Teuvo Salmenjoki, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Teuvo Salmenjoki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vanha_Hamina_Reserviupseerikoulu.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Hamina',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Haminan linnoitus ja kaupunki on rakennettu tähden ja ympyrän muotoon?',
      'Mitä vuonna 1809 Haminassa sovittiin, ja miksi se oli Suomelle niin tärkeää?',
    ],
    korostukset: ['Axel Löwen|Axel Löwen', 'tähtimäinen linnoitus|tähtimäisen linnoituksen'],
    nappi: 'Venäjän suuriruhtinaskunnan linnoituskaupunki, jossa kadettikoulu toimii jo '
      + 'vuodesta 1819',
    // 27.2 E / 60.5667 N — en-Wikipedia "Hamina"
    laudat: {
      maailmankartta: { x: 6740, y: 897.4 },
      europe: { x: 733.4, y: 300.7 },
    },
    teksti: 'Hamina on Kymenlaakson kaupunki Suomenlahden rannalla, noin 145 kilometriä '
      + 'Helsingistä itään. Kun Viipuri joutui Venäjälle vuonna 1721, Haminasta tehtiin '
      + 'sen korvaaja: kaupunki sai laajat ulkomaankaupan oikeudet ja rakennettiin '
      + 'uudelleen vuosina 1722–1724. Kaupungin tähtimäisen linnoituksen ja '
      + 'ympyränmuotoisen katuverkon suunnitteli Axel Löwen keskieurooppalaisten ja '
      + 'italialaisten renessanssimallien mukaan, ja sellaiset kaupungit ovat harvinaisia. '
      + 'Vuonna 1809 Haminassa allekirjoitettiin rauhansopimus, jolla Ruotsi luovutti '
      + 'Suomen Venäjälle, ja Suomesta tuli autonominen suuriruhtinaskunta. Haminan '
      + 'kadettikoulu perustettiin vuonna 1819, ja samoissa tiloissa aloitti vuonna 1920 '
      + 'reserviupseerikoulu.',
    lahde: 'en-Wikipedia "Hamina", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka suunnitteli Haminan tähtimäisen linnoituksen ja ympyränmuotoisen '
        + 'katuverkon?',
      vaihtoehdot: [
        'Carl Ludvig Engel',
        'Per Brahe',
        'Louis Visconti',
        'Axel Löwen',
      ],
      oikea: 3,
      fakta: 'Linnoituksen kuusi bastionia on nimetty suomalaisten kaupunkien mukaan. '
        + '1700-luvun lopulla lisätty Keskusbastioni on nykyään kulttuuritapahtumien '
        + 'käytössä.',
    },
  },
  {
    id: 'hahmotelma-tornio',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-tornio-cbdd57f6.jpg',
      lyhyt: 'Tornion puukirkko ja sen erillinen kellotapuli.',
      selite: 'Valkoinen puukirkko teräväkärkisine torneineen ja ruskea kellotapuli. '
        + 'Artikkelin mukaan Tornion kirkon torni oli yksi Maupertuis\'n pituuspiirin '
        + 'mittauksen kiintopisteistä.',
      lahde: 'Valokuva: Santeri Viinamäki, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Santeri Viinamäki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tornio_Church_and_bell_tower_20190801.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-tornio-9e175454.jpg',
        lyhyt: 'Tornionjoen rautatiesilta Tornion ja Haaparannan välillä.',
        selite: 'Silta yhdistää Tornion ja Haaparannan. Ensimmäisen maailmansodan aikana '
          + 'kaksoiskaupungin kautta kulki ainoa rautatieyhteys venäläisten ja heidän '
          + 'länsiliittolaistensa välillä.',
        lahde: 'Valokuva: Estormiz, Wikimedia Commons (CC0).',
        tekija: 'Estormiz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Torne_River_railway_bridge_20140503.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-tornio-79e31eac.jpg',
        lyhyt: 'Postia kuljettanut kaapelirata Tornion ja Haaparannan välillä 1910-luvulla.',
        selite: 'Kaapelirata rakennettiin ensimmäisen maailmansodan aikana postia varten ja '
          + 'purettiin vuonna 1919, kun rautatiesilta valmistui. Taustalla näkyy '
          + 'Alatornion kirkko.',
        lahde: 'Valokuva: Tuntematon, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Tornio-Haparanda-ilmarata.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Tornio',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä ranskalaiset tutkijat mittasivat Tornionlaaksossa 1730-luvulla, ja mitä he halusivat sillä todistaa?',
      'Miksi Tornion satamaa piti siirtää joen varrella alavirtaan kahdesti?',
    ],
    korostukset: ['Maupertuis|Maupertuis\'n', 'Haaparanta|Haaparannan'],
    nappi: 'Rajakaupunki: Tornio kuuluu Venäjän suuriruhtinaskuntaan, joen toisella puolella '
      + 'on Ruotsin Haaparanta',
    // 24.15 E / 65.85 N — en-Wikipedia "Tornio"
    laudat: {
      maailmankartta: { x: 6638.3, y: 619.8 },
      europe: { x: 674.9, y: 161.7 },
    },
    teksti: 'Tornio on Lapin kaupunki Tornionjoen suulla, ja se muodostaa Ruotsin puolella '
      + 'olevan Haaparannan kanssa rajat ylittävän kaksoiskaupungin. Kaupunki sai '
      + 'kaupunkioikeudet kuningas Kustaa II Aadolfilta vuonna 1621, ja silloin se oli '
      + 'maailman pohjoisin kaupunki. Ranskalaisen Maupertuis\'n retkikunta mittasi '
      + '1730-luvulla Tornionlaaksossa pituuspiirin kaarta, ja Tornion kirkon torni oli '
      + 'yksi mittauksen kiintopisteistä. Vuoden 1808 sodan jälkeen raja vedettiin jokien '
      + 'syvimmän uoman mukaan, ja Tornio jäi tsaarin erityisestä toiveesta Venäjän '
      + 'puolelle. Ruotsi rakensi vastapainoksi Haaparannan, ja Tornion vuonna 1686 '
      + 'rakennettu puukirkko on säilynyt nykypäivään.',
    lahde: 'en-Wikipedia "Tornio", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-uusikaupunki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-uusikaupunki-4526445c.jpg',
      lyhyt: 'Uudenkaupungin aittarannan laituri ja venesatama kesäiltana.',
      selite: 'Kuva on otettu 29.7.2021 Uudenkaupungin kanavan varrella, jossa on puutaloja ja '
        + 'veneitä laiturien vieressä.',
      lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'kallerna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Uudenkaupungin_aittaranta_2.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-uusikaupunki-abc1338e.jpg',
        lyhyt: 'Muistomitali Uudenkaupungin rauhasta vuodelta 1721 Kansallismuseossa.',
        selite: 'Venäläinen mitali Uudenkaupungin rauhasta on esillä Suomen kansallismuseossa. '
          + 'Toisella puolella on kyyhkynen, sateenkaari ja vesillä kelluva alus, toisella '
          + 'kirjoitusta.',
        lahde: 'Valokuva: Daderot, Wikimedia Commons (CC0).',
        tekija: 'Daderot',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Peace_of_Uusikaupunki_(Nystad),_1721,_Russia,_by_an_unknown_artist_-_National_Museum_of_Finland_-_DSC04118.JPG',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-uusikaupunki-c919766f.jpg',
        lyhyt: 'Vanha valokuva Uudenkaupungin puutaloista ja satamasta 1870-luvulla.',
        selite: 'Historiallinen kuva esittää kaupungin puutaloja, satamaa ja purjealuksia '
          + '1870-luvulla.',
        lahde: 'Valokuva: Tuntematon, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Uusikaupunki_1870.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Uusikaupunki',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Mitä Uudenkaupungin rauhalla vuonna 1721 lopetettiin, ja keiden kesken?',
      'Miksi kaupunki perustettiin, vaikka alueella käytiin jo kauppaa?',
    ],
    korostukset: ['Uudenkaupungin rauha|Uudenkaupungin rauha', 'Nystad|Nystad'],
    nappi: 'Vuoden 1721 rauhan Nystad; ranskalais-brittilaivastot olivat hyökänneet sinne 18 '
      + 'vuotta aiemmin',
    // 21.4167 E / 60.8 N — en-Wikipedia "Uusikaupunki"
    laudat: {
      maailmankartta: { x: 6547.2, y: 885.6 },
      europe: { x: 622.4, y: 294.6 },
    },
    teksti: 'Uusikaupunki on Varsinais-Suomessa Pohjanlahden rannalla sijaitseva kaupunki, '
      + 'jonka nimi tarkoittaa sekä suomeksi että ruotsiksi (Nystad) uutta kaupunkia. '
      + 'Alueella käytiin kauppaa puuesineillä ja suolalla jo varhaiskeskiajalla, ja '
      + 'kaupunki perustettiin laillistamaan tätä kauppaa; kuningas Kustaa II Aadolf antoi '
      + 'sille kaupunkioikeudet vuonna 1617. Keskusta on rakennettu ruutukaavaan, ja '
      + 'siellä on yksi maan parhaiten säilyneistä empiretyylisistä puutalokortteleista. '
      + 'Vuonna 1721 Uudessakaupungissa solmittiin Uudenkaupungin rauha, joka päätti '
      + 'Suuren Pohjan sodan Ruotsin ja Venäjän välillä. Vuonna 1855 brittiläinen ja '
      + 'ranskalainen laivasto hyökkäsivät kaupunkiin Ahvenanmaan sodan aikana.',
    lahde: 'en-Wikipedia "Uusikaupunki", johdanto-osa ja osiot "Cityscape" ja "History" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-loviisa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-loviisa-29cc9cca.jpg',
      lyhyt: 'Loviisan vaaleanpunainen raatihuone aukion laidalla.',
      selite: 'Loviisan raatihuone kuvattuna aukion puolelta. Kaupunki rakennettiin vuoden '
        + '1855 palon jälkeen uudelleen entiselle paikalleen.',
      lahde: 'Valokuva: Thomas Gartz, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Thomas Gartz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Loviisan_raatihuone.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-loviisa-bf1a1320.jpg',
        lyhyt: 'Svartholman linnoitussaari Loviisan edustalla.',
        selite: 'Svartholman merilinnoitus rakennettiin Loviisan linnoituksen kanssa samoihin '
          + 'aikoihin suojaamaan kaupunkia mereltä. Kuvassa linnoituksen muurit näkyvät '
          + 'saaren rannalla.',
        lahde: 'Valokuva: Thomas Gartz, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Thomas Gartz',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Svartholm_Fortress_Island.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-loviisa-243766c1.jpg',
        lyhyt: 'Näkymä Loviisaan kukkulan päältä vuonna 1890.',
        selite: 'Daniel Nyblinin valokuva kaupungista noin 35 vuotta vuoden 1855 palon '
          + 'jälkeen. Vasemmalla näkyy kirkko ja etualalla kalliorinne.',
        lahde: 'Valokuva: Daniel Nyblin, Wikimedia Commons (CC BY 4.0).',
        tekija: 'Daniel Nyblin',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:View_of_Loviisa_(Lovisa)_in_1890.tif',
        lisenssi: 'CC BY 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
      },
    ],
    nimi: 'Loviisa',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi kaupungin nimi vaihtui Degerbystä Loviisaksi?',
      'Mitä Loviisassa tapahtui Krimin sodan aikana kesällä 1855?',
    ],
    korostukset: ['Svartholma|Svartholman', 'Degerby|Degerby'],
    nappi: 'Krimin sodan palon jälkeen uudelleen rakennettu kaupunki, joka kehittyi '
      + 'kylpyläkaupungiksi',
    // 26.2333 E / 60.4583 N — en-Wikipedia "Loviisa"
    laudat: {
      maailmankartta: { x: 6707.8, y: 902.8 },
      europe: { x: 714.9, y: 303.5 },
    },
    teksti: 'Loviisa perustettiin vuonna 1745 nimellä Degerby raja- ja linnoituskaupungiksi, '
      + 'sillä Turun rauhan 1743 jälkeen Itä-Suomen ainoa kauppakaupunki Hamina jäi rajan '
      + 'taakse. Kuningas Aadolf Fredrik antoi kaupungille uuden nimen vuonna 1752 '
      + 'kuningattarensa Lovisa Ulrikan mukaan. Kaupungin eteläpuolelle rakennettiin '
      + 'Svartholman merilinnoitus, joka antautui venäläisille lähes taistelematta vuonna '
      + '1808. Krimin sodan aikana heinäkuussa 1855 englantilaiset laivat ampuivat '
      + 'Svartholmaa, ja linnoitus räjähti raunioiksi; samoihin aikoihin kaupungissa '
      + 'syttyi tulipalo, joka tuhosi suuren osan vanhasta keskustasta ja puisen kirkon. '
      + 'Palon syy on jäänyt arvoitukseksi, mutta senaatti päätti rakentaa Loviisan '
      + 'uudelleen entiselle paikalleen, ja 1860-luvun alussa kaupunki alkoi kehittyä '
      + 'kylpyläkaupungiksi.',
    lahde: 'en-Wikipedia "Loviisa", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-vaasa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-vaasa-826178f8.jpg',
      lyhyt: 'Pyhän Marian kirkon rauniot Vaasassa.',
      selite: 'Pyhän Marian kirkko rakennettiin artikkelin mukaan 1300-luvun puolivälissä '
        + 'seudulle, jossa Vaasan varhainen historia alkoi. Kuvassa kirkon kiviset '
        + 'rauniot.',
      lahde: 'Valokuva: Jouni Jurmu, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Jouni Jurmu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Vaasa_-_Ruins_of_Saint_Mary_Church.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-vaasa-4909bb34.jpg',
        lyhyt: 'Kirkkopuistikko ja Hotel Ernst postikortissa 1890-luvun alusta.',
        selite: 'Vanha postikortti uuden Vaasan Kirkkopuistikolta: oikealla Hotel Ernst, '
          + 'taustalla kirkon torni. Kirkkopuistikko on yksi kaupungin viidestä leveästä '
          + 'puistokadusta.',
        lahde: 'Valokuva: Tuntematon (postikortin julkaisija Conrad Freese; Museovirasto), Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon (postikortin julkaisija Conrad Freese; Museovirasto)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kyrkoesplanaden_i_Vasa_med_Hotell_Ernst.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-vaasa-d07a33ed.jpg',
        lyhyt: 'Kauppapuistikon puukujanne Vaasan keskustassa.',
        selite: 'Kauppapuistikko on yksi viidestä leveästä puistokadusta, jotka jakavat vuoden '
          + '1852 palon jälkeen rakennetun uuden kaupungin osiin.',
        lahde: 'Valokuva: Santtu37, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Santtu37',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kauppapuistikko_Vaasa.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Vaasa',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Vaasa rakennettiin palon jälkeen aivan uuteen paikkaan?',
      'Miksi kaupunkia kutsuttiin Nikolainkaupungiksi, vaikka asukkaat käyttivät vanhaa nimeä?',
    ],
    korostukset: ['Nikolainkaupunki|Nikolainkaupunki', 'Setterberg|Setterberg'],
    nappi: 'Nikolainkaupunki, joka oli noussut vuoden 1852 palon tuhoaman kaupungin tilalle '
      + 'vasta 1862',
    // 21.6167 E / 63.1 N — en-Wikipedia "Vaasa"
    laudat: {
      maailmankartta: { x: 6553.9, y: 767.4 },
      europe: { x: 626.2, y: 234.1 },
    },
    teksti: 'Vaasan edeltäjän, Mustasaaren kaupungin, perusti kuningas Kaarle IX vuonna 1606, '
      + 'ja vuonna 1611 kaupunki sai kaupunkioikeudet sekä nimen Vaasa-suvun mukaan. '
      + 'Meriyhteydet, laivanrakennus ja tervakauppa toivat kaupungille vaurautta '
      + '1600-luvulla. Elokuussa 1852 tiheään rakennettu puukaupunki paloi lähes kokonaan, '
      + 'ja 379 rakennuksesta vain 24 yksityistä taloa säilyi. Kaupungin nimeksi '
      + 'muutettiin vuonna 1855 tsaari Nikolai I:n muistoksi Nikolainkaupunki, mutta '
      + 'asukkaat käyttivät edelleen vanhaa nimeä. Uusi kaupunki nousi vuonna 1862 noin '
      + 'seitsemän kilometriä luoteeseen meren rannalle, ja Carl Axel Setterbergin '
      + 'empiretyylisessä asemakaavassa viisi leveää katua jakoi korttelit osiin.',
    lahde: 'en-Wikipedia "Vaasa", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kajaani',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kajaani-f38a4195.jpg',
      lyhyt: 'Kajaanin linnan raunioiden pyöreän tornin jäänteet.',
      selite: 'Tornin jäänteet ja graniittimuurit. Linnan alkuperäiset muurit nousivat suoraan '
        + 'joen koskesta.',
      lahde: 'Valokuva: Janne Peräaho, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Janne Peräaho',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kajaani_Castle_ruins_-_tower_remains.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kajaani-1d555b9e.jpg',
        lyhyt: 'Kajaanin linnan rauniot ja koski I. K. Inhan vanhassa valokuvassa.',
        selite: 'Sillalta kuvattu koskimaisema alavirtaan, etualalla ruohon peittämät '
          + 'linnanrauniot. Kuvan on ottanut I. K. Inha, ja tiedoston nimessä on vuosiluku '
          + '1890.',
        lahde: 'Valokuva: I. K. Inha, Wikimedia Commons (CC0).',
        tekija: 'I. K. Inha',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kajaanin_linnan_rauniot_Sarjasta_K_E_St%C3%A5hlberg_N_o_460_1890_(D2005-132_21).jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kajaani-832b4b08.jpg',
        lyhyt: 'Kajaanin linnan raunioita kesällä.',
        selite: 'Rauniota on korjattu useaan otteeseen 1890-luvulta alkaen, viimeksi '
          + '2000-luvun alussa. Muurit ovat nykyisin korjattuja.',
        lahde: 'Valokuva: Tomisti, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tomisti',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kajaani_Castle_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kajaanin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi Kajaanin linna rakennettiin kaukaiseen Kainuuseen?',
      'Miksi vankeja lähetettiin juuri Kajaanin linnaan?',
    ],
    korostukset: ['Messenius|Messenius', 'Scondia illustrata|Scondia illustrata'],
    nappi: 'Rauniona vuodesta 1716, puusilta sen yli vuodesta 1845; ensimmäinen korjaus alkaa '
      + 'vasta 1890',
    // 27.7328 E / 64.2292 N — en-Wikipedia "Kajaani Castle"
    laudat: {
      maailmankartta: { x: 6757.8, y: 707.7 },
      europe: { x: 743.7, y: 204.4 },
    },
    teksti: 'Kajaanin linna on graniitista rakennettu linnanrauniot Kajaaninjoen saarella '
      + 'Ämmäkosken ja Koivukosken välissä. Kuningas Kaarle IX aloitti sen rakentamisen '
      + 'vuonna 1604 suojaamaan Teusinan rauhassa 1595 Ruotsille siirtynyttä Kainuuta, ja '
      + 'se oli Ruotsissa viimeinen keskiaikaiseen tyyliin rakennettu kivilinna. '
      + 'Keskeneräistä linnaa käytettiin aluksi vankilana, ja sen tunnetuin vanki oli '
      + 'historioitsija Johannes Messenius, joka kirjoitti vankeutensa aikana Skandinavian '
      + 'historiaa käsittelevän teoksen Scondia illustrata. Linnan viereen perustettiin '
      + 'vuonna 1651 Kajaanin kaupunki. Suuren Pohjan sodan aikana venäläiset joukot '
      + 'valtasivat linnan ja räjäyttivät sen vuonna 1716, ja jäljelle jäivät vain '
      + 'katottomat rauniot.',
    lahde: 'en-Wikipedia "Kajaani Castle", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
  },
  {
    id: 'hahmotelma-raseborg',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-raseborg-5f584c69.jpg',
      lyhyt: 'Raaseporin linnan kiviseinät ja pyöreä torni kallion päällä.',
      selite: 'Linnan ensimmäinen vaihe valmistui Commonsin kuvauksen mukaan 1300-luvun '
        + 'lopulla. Muurit nousevat paljaalta kalliolta.',
      lahde: 'Valokuva: Pöllö, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Pöllö',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castle_of_Raseborg_(Raaseporin_linna)_in_Tammisaari_Finland.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-raseborg-24226672.jpg',
        lyhyt: 'Raaseporin linna lännestä kuvattuna, kallion päällä.',
        selite: 'Paksut kivimuurit on rakennettu paljaan kallion päälle. Linna sijaitsee '
          + 'Raaseporissa.',
        lahde: 'Valokuva: Rubenandthejets, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Rubenandthejets',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Raseborg_Castle_from_the_west.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-raseborg-072fdd67.jpg',
        lyhyt: 'Raaseporin linnan sisäpiha ja vierailijoiden kulkusillat.',
        selite: 'Linnan sisäosien rauniot, joiden yllä kulkee vierailijoita varten '
          + 'rakennettuja kävelysiltoja ja katoksia. Rauniot ovat kesäisin avoinna '
          + 'yleisölle.',
        lahde: 'Valokuva: Pöllö, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Pöllö',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_inner_structures_of_Raseborg_Castle_(in_Finnish-_Raaseporin_linna).jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
    ],
    nimi: 'Raaseporin linna',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Miksi veneillä oli yhä vaikeampi päästä saarelle rakennetulle Raaseporin linnalle?',
      'Miksi Helsingin perustaminen vaikutti Raaseporin linnan kohtaloon?',
    ],
    korostukset: ['maankohoaminen|maankohoamisen', 'hansakaupunki|hansakaupunkia'],
    nappi: 'Yli 300 vuotta autiona ollut raunio; kunnostus alkaa vasta 1880–1890-luvuilla',
    // 23.6511 E / 59.9917 N — en-Wikipedia "Raseborg Castle"
    laudat: {
      maailmankartta: { x: 6621.7, y: 926.1 },
      europe: { x: 665.3, y: 315.8 },
    },
    teksti: 'Raaseporin linna on keskiaikainen linna Raaseporissa, jonka ensimmäinen vaihe '
      + 'valmistui arviolta 1370-luvun lopulla ja josta on ensimmäinen kirjallinen '
      + 'maininta vuodelta 1378. Se rakennettiin pienelle saarelle merenlahden pohjukkaan '
      + 'turvaamaan Ruotsin etuja Etelä-Suomessa Tallinnan hansakaupunkia vastaan. Linnan '
      + 'pohjapiirros muistuttaa suurta D-kirjainta, jonka yhdessä kulmassa on pyöreä, '
      + 'paksuseinäinen torni. Maankohoamisen vuoksi meren puolelta oli yhä vaikeampi '
      + 'lähestyä linnaa, ja kun Helsinki perustettiin vuonna 1550, Raasepori menetti '
      + 'asemansa: linna hylättiin vuonna 1553. Rauniot ovat nykyisin kesäisin avoinna '
      + 'yleisölle, ja niiden vieressä esitetään ruotsinkielistä kesäteatteria.',
    lahde: 'en-Wikipedia "Raseborg Castle" ja fi-Wikipedia "Raaseporin linna", johdanto-osat '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kuhmo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kuhmo-86243456.jpg',
      lyhyt: 'Pajakkakoski, virtaava koski Kuhmon metsien keskellä.',
      selite: 'Kuhmon alueella on yli 600 järveä ja laajoja metsiä, ja vesireitit '
        + 'houkuttelivat alueelle metsästäjiä ja kauppiaita jo varhain. Kuvassa '
        + 'Pajakkakoski.',
      lahde: 'Valokuva: Ninara, Wikimedia Commons (Public domain).',
      tekija: 'Ninara',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pajakkakoski.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kuhmo-5de9d8c0.jpg',
        lyhyt: 'Gallen-Kallelan maalaus Kuhmon maisemasta vuodelta 1890.',
        selite: 'Akseli Gallen-Kallelan maalaus Kuhmon maisemasta. Taiteilija vietti '
          + 'häämatkansa Kuhmossa ja maalasi siellä muun muassa Lentua-järven rannalla.',
        lahde: 'Valokuva: Akseli Gallen-Kallela, Wikimedia Commons (Public domain).',
        tekija: 'Akseli Gallen-Kallela',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Akseli_Gallen-Kallela_-_Landscape_in_Kuhmo_-_G%C3%B6sta_Serlachius_Fine_Arts_Foundation.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kuhmo-80a2e340.jpg',
        lyhyt: 'Gallen-Kallelan maalaus Marie Gallénista Kuhmoniemen sillalla.',
        selite: 'Maalauksen nimen mukaan kuvassa on Marie Gallén Kuhmoniemen sillalla '
          + 'auringonlaskun aikaan. Kuhmoniemi oli Kuhmon nimi vuoteen 1937.',
        lahde: 'Valokuva: Akseli Gallen-Kallela, Wikimedia Commons (Public domain).',
        tekija: 'Akseli Gallen-Kallela',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gall%C3%A9n-Kallela_-_Marie_Gall%C3%A9n_auf_der_Kuhmoniemi-Br%C3%BCcke_-_1890.jpeg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Kuhmo',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Elias Lönnrot kulki Kuhmon kautta Karjalaan?',
      'Mikä on karelianismi, ja miten Kuhmo liittyy siihen?',
    ],
    korostukset: ['karelianismi|karelianismin', 'Kalevalakylä|Kalevalakylässä'],
    nappi: 'Kuhmoniemi: erämaapitäjä, jonka kautta Lönnrot oli kulkenut keräämään runoja '
      + 'Karjalaan',
    // 29.5167 E / 64.125 N — en-Wikipedia "Kuhmo"
    laudat: {
      maailmankartta: { x: 6817.2, y: 713.2 },
      europe: { x: 777.9, y: 207.1 },
    },
    teksti: 'Kuhmo on laaja, harvaan asuttu erämaakunta Kainuun kaakkoiskulmassa, ja sen '
      + 'nimenä oli vuoteen 1937 asti Kuhmoniemi. Elias Lönnrot kulki 1800-luvulla Kuhmon '
      + 'kautta keräämään runoja Karjalaan ja muokkasi osan Kalevalasta Kuhmossa; hänen '
      + 'majapaikkansa jäljennös on nykyisin Kalevalakylässä. Kalevalan ilmestyminen '
      + 'vuonna 1835 vauhditti karelianismin syntyä, ja sen tunnetuimpiin edustajiin '
      + 'kuuluva Akseli Gallen-Kallela vietti häämatkansa Kuhmossa. Hän maalasi töitään '
      + 'Lentua-järven Lapinsalmella, ja Lentuan maisema on Aino-triptyykin keskimmäisen '
      + 'taulun taustana. Kuhmon tervantuotanto oli vuonna 1900 Suomen suurin.',
    lahde: 'en-Wikipedia "Kuhmo", johdanto-osa ja osio "History" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Kuka keräsi runoja Karjalasta kulkien Kuhmon kautta ja muokkasi osan '
        + 'Kalevalasta Kuhmossa?',
      vaihtoehdot: [
        'Zacharias Topelius',
        'J. L. Runeberg',
        'Elias Lönnrot',
        'Aleksis Kivi',
      ],
      oikea: 2,
      fakta: 'Kuhmossa järjestetään joka vuosi kamarimusiikkifestivaali, jonka perustivat '
        + 'vuonna 1970 sellisti Seppo Kimanen ja pieni ystäväjoukko. Kunta on '
        + 'pinta-alaltaan Suomen kahdestoista suurin, ja sen erämaissa elää karhuja, susia '
        + 'ja metsäpeuroja.',
    },
  },
  {
    id: 'hahmotelma-kaustinen',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kaustinen-2a85f8ed.jpg',
      lyhyt: 'Kaustisen keltainen puukirkko kesällä 2024.',
      selite: 'Kaustisen kirkko kuvattuna kesällä 2024. Seurakunta sai luvan oman kirkon '
        + 'rakentamiseen kuninkaalta vuonna 1776, ja ensimmäinen kirkko valmistui vuonna '
        + '1777.',
      lahde: 'Valokuva: MKFI, Wikimedia Commons (Public domain).',
      tekija: 'MKFI',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaustisen_kirkko_2024_1.JPG',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kaustinen-bae49fbd.jpg',
        lyhyt: 'Kansantaiteenkeskus Kaustisella.',
        selite: 'Kansantaiteenkeskus on Kaustisen tapahtuma- ja kulttuurikeskus sekä '
          + 'konserttitalo, jossa toimivat myös Kansanmusiikki-instituutti ja Suomen '
          + 'Kansansoitinmuseo.',
        lahde: 'Valokuva: Alexius Manfelt, Wikimedia Commons (Public domain).',
        tekija: 'Alexius Manfelt',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kaustinen_CAP.JPG',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Kaustinen',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi kaustislaiset matkustivat Tukholmaan kuningas Kustaa III:n puheille?',
      'Mitä yhteistä Kaustisella ja Peanuts-sarjan Woodstock-linnulla on?',
    ],
    korostukset: ['pelimanniperinne|pelimanniperinteestä', 'kansanmusiikkijuhlat|kansanmusiikkijuhlat'],
    nappi: 'Vuonna 1868 kunnaksi tullut pitäjä, jossa terva oli talonpojan tärkein tulonlähde',
    // 23.6917 E / 63.55 N — en-Wikipedia "Kaustinen"
    laudat: {
      maailmankartta: { x: 6623.1, y: 743.7 },
      europe: { x: 666.1, y: 222.2 },
    },
    teksti: 'Kaustinen on Keski-Pohjanmaan maaseutukunta, joka tunnetaan vanhasta '
      + 'pelimanniperinteestä. Kaustislaiset lähettivät valtuuskunnan Tukholmaan, ja '
      + 'kuningas Kustaa III antoi kesäkuussa 1776 luvan oman kirkon rakentamiseen, jotta '
      + 'pitkät kirkkomatkat jäisivät pois; kirkko valmistui syksyllä 1777. Terva oli '
      + '1600-luvun alusta 1800-luvun loppuun asti talonpojan tärkein tulonlähde. Kunnan '
      + 'vaakunassa on viulu, joka viittaa yhä elävään kansanmusiikkiperinteeseen, ja joka '
      + 'heinäkuu paikkakunnalla järjestetään Kaustisen kansanmusiikkijuhlat. Vuonna 2021 '
      + 'kaustislainen viulunsoitto hyväksyttiin Unescon aineettoman kulttuuriperinnön '
      + 'luetteloon.',
    lahde: 'en-Wikipedia "Kaustinen" ja fi-Wikipedia "Kaustinen", johdanto-osat ja fi-osiot '
      + '"Historia" ja "Kulttuuri" (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minkä soittimen kuva on Kaustisen kunnan vaakunassa?',
      vaihtoehdot: [
        'Kantele',
        'Viulu',
        'Harmonikka',
        'Jouhikko',
      ],
      oikea: 1,
      fakta: 'Peanuts-sarjakuvan pieni keltainen lintu Woodstock on suomeksi nimeltään '
        + 'Kaustinen, viittauksena Kaustisen kansanmusiikkijuhliin. Kunnan tunnettuihin '
        + 'asukkaisiin kuuluu myös kanteleensoittaja ja laulunkirjoittaja Kreeta Haapasalo '
        + '(1813–1893).',
    },
  },
  {
    id: 'hahmotelma-inari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-inari-6951640f.jpg',
      lyhyt: 'Näkymä Inarijärvelle läheiseltä kukkulalta.',
      selite: 'Commonsin kuvauksen mukaan kuva on otettu Inarijärven lähellä olevalta '
        + 'kukkulalta. Inarijärvi on artikkelin mukaan Suomen kolmanneksi suurin järvi.',
      lahde: 'Valokuva: Karlis Strazdins, Wikimedia Commons (Public domain).',
      tekija: 'Karlis Strazdins',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Lake_Inari.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-inari-20cc01a2.jpg',
        lyhyt: 'Korotettu hirsivarasto Siida-museon ulkomuseoalueella.',
        selite: 'Kuva on Siida-museon ulkomuseoalueelta Inarin kylästä. Siida on '
          + 'saamelaiskulttuuriin ja Pohjois-Lapin luontoon keskittyvä museo.',
        lahde: 'Valokuva: Richard Mortel from Riyadh, Saudi Arabia, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Richard Mortel from Riyadh, Saudi Arabia',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Elevated_storage,_Siida_Museum,_Inari,_Finland_(1)_(36515471282).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-inari-2b2dc260.jpg',
        lyhyt: 'Saamelaiskulttuurikeskus Sajos Inarin kylässä.',
        selite: 'Sajos on Inarin kylässä sijaitseva saamelaiskulttuurikeskus. Kuva on otettu '
          + 'talvella maaliskuussa 2015.',
        lahde: 'Valokuva: Kimberli Mäkäräinen, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kimberli Mäkäräinen',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:S%C3%A1mi_Cultural_Centre_Sajos,_Inari,_Finland_2015.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Inari',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Inaria kutsutaan saamelaiskulttuurin pääkaupungiksi?',
      'Mitä kieliä Inarissa puhutaan, ja mitä ne kertovat alueen asukkaista?',
    ],
    korostukset: ['Siida|Siida', 'inarinsaame|inarinsaame'],
    nappi: 'Inarin kunta perustetaan vasta kolme vuotta myöhemmin, vuonna 1876',
    // 27.0303 E / 68.905 N — en-Wikipedia "Inari, Finland"
    laudat: {
      maailmankartta: { x: 6734.3, y: 446.9 },
      europe: { x: 730.2, y: 81.4 },
    },
    teksti: 'Inari on pinta-alaltaan Suomen suurin kunta, mutta samalla yksi harvimmin '
      + 'asutuista. Sen alueella on osia Lemmenjoen ja Urho Kekkosen kansallispuistoista, '
      + 'ja Inarijärvi on maan kolmanneksi suurin järvi. Inaria kutsutaan '
      + 'saamelaiskulttuurin pääkaupungiksi: Inarin kylässä ovat Siida, Saamelaismuseo ja '
      + 'Pohjois-Lapin luontokeskus, sekä saamelaiskulttuurikeskus Sajos. Kunnalla on '
      + 'neljä virallista kieltä, suomi sekä inarinsaame, koltansaame ja pohjoissaame, '
      + 'mikä on enemmän kuin missään muussa Suomen kunnassa. Tärkeitä elinkeinoja ovat '
      + 'matkailu, palvelut ja kylmänkestotestaus.',
    lahde: 'en-Wikipedia "Inari, Finland", johdanto-osa ja osiot "Geography", "Languages" ja '
      + '"Sites of interest" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kuopio',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kuopio-6c45ea75.jpg',
      lyhyt: 'Kuopion keskusta ja Kallavesi Puijon tornista nähtynä.',
      selite: 'Kuva on otettu Puijon tornista huhtikuussa 2023. Kaupunkia ympäröi Kallavesi, '
        + 'jonka jäinen selkä ja saaret näkyvät taustalla.',
      lahde: 'Valokuva: Ximonic (Simo Räsänen), Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ximonic (Simo Räsänen)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Downtown_Kuopio_and_Kallavesi_as_seen_from_Puijo_tower,_Kuopio,_North_Savo,_Finland,_2023_April.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kuopio-381d3148.jpg',
        lyhyt: 'Kuopion tuomiokirkko.',
        selite: 'Tuomiokirkko valmistui vuonna 1816. Se on kuvattuna Kuopion vaakunassa, ja '
          + 'sitä luullaan usein kaupungintaloksi.',
        lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'kallerna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kuopio_Cathedral.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kuopio-e7b8cf62.jpg',
        lyhyt: 'Avattu kalakukko, jonka täytteenä on kalaa.',
        selite: 'Commonsin kuvauksen mukaan itäsuomalainen kalakukko on tehty ahvenesta ja '
          + 'läskistä. Kalakukko on savolainen perinneruoka.',
        lahde: 'Valokuva: Rst2000, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Rst2000',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kalakukko_(opened).jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Kuopio',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Kuopion katuverkossa on joka toinen katu varattu jalankulkijoille ja pyöräilijöille?',
      'Mitä kalakukko on, ja miksi Kuopiota sanotaan sen luvatuksi maaksi?',
    ],
    korostukset: ['kalakukko|kalakukosta', 'rännikatu|rännikatu'],
    nappi: 'Kaupunki on vajaat sata vuotta vanha: virallinen perustamisvuosi on 1775',
    // 27.6783 E / 62.8925 N — en-Wikipedia "Kuopio"
    laudat: {
      maailmankartta: { x: 6755.9, y: 778.2 },
      europe: { x: 742.6, y: 239.5 },
    },
    teksti: 'Kuopio on Pohjois-Savon maakuntakeskus, jota ympäröi Kallavesi ja jonka osat '
      + 'sijaitsevat saarilla. Kaupungin virallinen perustamispäivä on 17. marraskuuta '
      + '1775, jolloin Ruotsin kuningas Kustaa III määräsi sen Savo-Karjalan läänin '
      + 'hallintokaupungiksi, vaikka asutus oli perustettu jo vuonna 1653. Kuopion '
      + 'ensimmäinen asemakaava on vuodelta 1776, ja sen perintönä katuverkossa on '
      + 'rännikatu: joka toinen katu on varattu jalankulkijoille ja pyöräilijöille. Se '
      + 'tehtiin alun perin palokatkoksi pääosin puisessa kaupungissa. Kuopio tunnetaan '
      + 'myös savolaisesta kalakukosta, minkä vuoksi sitä kutsutaan kalakukon luvatuksi '
      + 'maaksi, sekä Puijon mäestä ja sen tornista.',
    lahde: 'en-Wikipedia "Kuopio", johdanto-osa ja osiot "History", "Culture" ja "Transport" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kristinestad',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kristinestad-ccd9f5cc.jpg',
      lyhyt: 'Läntinen Pitkäkatu ja matalat puutalot Kristiinankaupungin vanhassa '
        + 'kaupungissa.',
      selite: 'Katunäkymä Läntiseltä Pitkäkadulta. Commons liittää kuvan Kristiinankaupungin '
        + 'ruutukaava-alueeseen, joka on valtakunnallisesti merkittävä rakennettu '
        + 'kulttuuriympäristö (RKY).',
      lahde: 'Valokuva: Mikkoau, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Mikkoau',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kristiinankaupunki_L%C3%A4ntinen_Pitk%C3%A4katu.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kristinestad-22b32f7e.jpg',
        lyhyt: 'Punaisia puurakennuksia Lebellin kauppiaantalon pihassa.',
        selite: 'Kuvan nimen mukaan piha kuuluu Lebellin kauppiaantaloon. Commons liittää '
          + 'kuvan Kristiinankaupungin ruutukaava-alueeseen.',
        lahde: 'Valokuva: Mikkoau, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Mikkoau',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kristiinankaupunki_Lebellin_kauppiaantalon_piha.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kristinestad-80f92887.jpg',
        lyhyt: 'Puutalojen reunustama katu Kristiinankaupungin ruutukaava-alueella.',
        selite: 'Kuva esittää Kristiinankaupungin ruutukaava-aluetta, jossa matalat puutalot '
          + 'reunustavat katua. Kadun päässä näkyy torni.',
        lahde: 'Valokuva: Kaj Höglund, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Kaj Höglund',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kristiinankaupunki,_ruutukaava-alue.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kristiinankaupunki',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi kaupunki on nimetty Ruotsin kuningattaren mukaan?',
      'Mitä Cittaslow tarkoittaa, ja miksi Kristiinankaupungista tuli Suomen ensimmäinen Cittaslow-kaupunki?',
    ],
    korostukset: ['Cittaslow|Cittaslow', 'Per Brahe nuoremman|Per Brahe nuoremman'],
    nappi: 'Vuonna 1649 perustettu kaupunki oli 1873 jo yli 220 vuotta vanha',
    // 21.35 E / 62.2667 N — en-Wikipedia "Kristinestad"
    laudat: {
      maailmankartta: { x: 6545, y: 810.7 },
      europe: { x: 621.1, y: 256 },
    },
    teksti: 'Kristiinankaupunki sijaitsee Pohjanmaalla Selkämeren rannalla Suomen '
      + 'länsirannikolla. Kaupunki sai kaupunkioikeudet vuonna 1649 Per Brahe nuoremman '
      + 'toimesta Koppön saarella, ja se on nimetty Ruotsin kuningatar Kristiinan mukaan. '
      + 'Kristiinankaupunki tunnetaan vanhasta kaupunginosastaan, jossa on matalia '
      + 'puutaloja ja kapeita kujia. Se on kaksikielinen: runsas puolet asukkaista puhuu '
      + 'ruotsia ja noin 39 prosenttia suomea. Suomenkielinen nimi on Suomen pisin '
      + 'käytössä oleva kunnan nimi, ja paikallisesti kaupunkia kutsutaan usein pelkäksi '
      + 'Kristiinaksi. Vuonna 2011 siitä tuli Suomen ensimmäinen Cittaslow-kaupunki.',
    lahde: 'en-Wikipedia "Kristinestad", johdanto-osa ja osio "History" ja fi-Wikipedia '
      + '"Kristiinankaupunki", johdanto-osa (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-mariehamn',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-mariehamn-822bf3bd.jpg',
      lyhyt: 'Nelimastoparkki Pommern Ahvenanmaan merenkulkumuseon laiturissa.',
      selite: 'Pommern on säilytetty purjelaiva, jota esitellään Ahvenanmaan '
        + 'merenkulkumuseossa Maarianhaminassa.',
      lahde: 'Valokuva: Bahnfrend, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Bahnfrend',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pommern,_%C3%85land_Maritime_Museum,_2019_(01).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-mariehamn-4163c3e1.jpg',
        lyhyt: 'Puutaloja ja puurivi Södragatanilla Maarianhaminassa.',
        selite: 'Kuva on otettu Södragatania itään päin; oikealla on Commonsin mukaan '
          + 'Södragatan 9. Katu kuuluu kaupungin vanhimpiin, ja sillä on säilynyt '
          + '1800-luvun puutaloja.',
        lahde: 'Valokuva: Håkan Skogsjö, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Håkan Skogsjö',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:S%C3%B6dragatan_Mariehamn_2014-09-17.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-mariehamn-f344d442.jpg',
        lyhyt: 'Satamanäkymä Maarianhaminasta.',
        selite: 'Commonsin kuvauksen mukaan kuva esittää Maarianhaminan Länsisatamaa '
          + '(Västerhamn). Kaupungin molemmat satamat pysyvät artikkelin mukaan suurimman '
          + 'osan vuodesta jäättöminä.',
        lahde: 'Valokuva: Fanny Schertzer, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Fanny Schertzer',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:V%C3%A4sterhamn_in_Mariehamn,_%C3%85land.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
    nimi: 'Maarianhamina',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Miksi Maarianhamina on nimetty Venäjän keisarinnan mukaan?',
      'Mitä nelimastoparkki Pommern kertoo Maarianhaminan merenkulusta?',
    ],
    korostukset: ['Pommern|Pommern', 'Södragatan|Södragatan'],
    nappi: 'Vasta 12-vuotias satamakaupunki, nimetty keisarinna Maria Aleksandrovnan mukaan',
    // 19.9333 E / 60.1 N — en-Wikipedia "Mariehamn"
    laudat: {
      maailmankartta: { x: 6497.8, y: 920.7 },
      europe: { x: 593.9, y: 313 },
    },
    teksti: 'Maarianhamina on Ahvenanmaan autonomisen maakunnan pääkaupunki, jossa sijaitsevat '
      + 'maakunnan hallitus ja parlamentti. Kaupunki perustettiin 21. helmikuuta 1861 '
      + 'Övernäsin kylän maille, ja se nimettiin Venäjän keisarinnan Maria Aleksandrovnan '
      + 'mukaan. Kaupunki kasvoi suunnitellun asemakaavan pohjalta, joka on säilynyt '
      + 'pääosin ehjänä, ja vanhimpiin katuihin kuuluvalla Södragatanilla on yhä '
      + '1800-luvun puutaloja. 1800-luvun lopulla merenkulusta tuli paikallisen '
      + 'elinkeinoelämän keskus, ja laivanvarustajat sekä telakat asettuivat kaupunkiin. '
      + 'Länsisatamassa on kiinnitettynä nelimastoparkki Pommern, joka kuuluu Ahvenanmaan '
      + 'merenkulkumuseoon.',
    lahde: 'en-Wikipedia "Mariehamn", johdanto-osa ja osiot "History" ja "Transport" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-ilomantsi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-ilomantsi-205c132f.jpg',
      lyhyt: 'Ilomantsin ortodoksinen kirkko talvella.',
      selite: 'Ilomantsin ortodoksinen kirkko tammikuussa 2015. Artikkelin mukaan puukirkko on '
        + 'Suomen suurin ortodoksinen kirkko ja omistettu profeetta Elialle.',
      lahde: 'Valokuva: Niera, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Niera',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ilomantsi_Orthodox_Church,_January_2015_(2).JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-ilomantsi-8a74074e.jpg',
        lyhyt: 'Hirsitalo Parppeinvaaran runokylän ulkomuseoalueella.',
        selite: 'Commonsin kuvauksen mukaan kuva esittää Parppeinvaaran runokylän '
          + 'ulkomuseoalueella olevaa runolaulajan majaa. Runokylä on artikkelin mukaan '
          + 'Ilomantsin nähtävyys.',
        lahde: 'Valokuva: Hedi Witter, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Hedi Witter',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:ParppeinvaaraBardsHouse0.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-ilomantsi-228e0ea2.jpg',
        lyhyt: 'Koitajoki Ilomantsissa.',
        selite: 'Koitajoki on artikkelin mukaan yksi Ilomantsin tärkeimmistä vesistöistä. '
          + 'Kuvassa joen tyyni pinta heijastaa rannoilla kasvavaa metsää.',
        lahde: 'Valokuva: Saruwine, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Saruwine',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Koitajoki1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Ilomantsi',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi Ilomantsissa on niin paljon ortodokseja muuhun Suomeen verrattuna?',
      'Mikä tekee Parppeinvaaran runokylästä erityisen?',
    ],
    korostukset: ['tsasounaa|tsasounaa', 'Parppeinvaaran|Parppeinvaaran'],
    nappi: 'Ortodoksinen seurakunta on vanha, mutta nykyinen puukirkko rakennetaan vasta 1892',
    // 30.9333 E / 62.6667 N — en-Wikipedia "Ilomantsi"
    laudat: {
      maailmankartta: { x: 6864.4, y: 790 },
      europe: { x: 805.1, y: 245.5 },
    },
    teksti: 'Ilomantsi on Pohjois-Karjalan kunta, jossa Suomen itäisin piste sijaitsee '
      + 'Hattuvaaran kylän lähellä. Kunnan maisemaa hallitsevat metsät ja suot, ja '
      + 'alueella ovat esimerkiksi Petkeljärven ja Patvinsuon kansallispuistot. '
      + 'Ilomantsissa on Suomen kunnista suurin ortodoksinen vähemmistö, 17,4 prosenttia '
      + 'asukkaista, ja paikallinen ortodoksiyhteisö on yli 500 vuotta vanha. Profeetta '
      + 'Elialle omistettu puinen ortodoksinen kirkko on Suomen suurin, ja kunnassa on '
      + 'lisäksi viisi tsasounaa. Nähtävyyksiin kuuluu myös Parppeinvaaran runokylä, ja '
      + 'tunnettuihin ilomantsilaisiin lukeutuu kansanlaulaja Mateli Kuivalatar '
      + '(1771–1846).',
    lahde: 'en-Wikipedia "Ilomantsi", johdanto-osa ja osiot "Sights" ja "Notable" '
      + '(tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-fiskars',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-fiskars-aa12e8b9.jpg',
      lyhyt: 'Tumma ruukkirakennus kosken rannalla Fiskarsissa.',
      selite: 'Kivijalan päällä seisova tummaseinäinen rakennus kohoaa virtaavan veden '
        + 'äärellä, ikkunoita reunustavat punatiiliset kehykset. Commonsissa kuva on '
        + 'merkitty osaksi Pohjan ruukkiympäristöä.',
      lahde: 'Valokuva: Teuvo Salmenjoki, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Teuvo Salmenjoki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fiskarsin_mylly.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-fiskars-1ed75376.jpg',
        lyhyt: 'Fiskarsin kylämaisema: tyyni vesi, vanhat puut ja rakennus rannalla.',
        selite: 'Kuvaaja kertoo kuvan esittävän Fiskarsin kylän maisemaa. Kylä on kasvanut '
          + 'vuonna 1649 perustetun ruukin ympärille.',
        lahde: 'Valokuva: Pöllö, Wikimedia Commons (CC BY 3.0).',
        tekija: 'Pöllö',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Scenary_of_the_Fiskars.jpg',
        lisenssi: 'CC BY 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-fiskars-e772c467.jpg',
        lyhyt: 'Fiskarsin kartano vuonna 1910 otetussa mustavalkokuvassa.',
        selite: 'Vanha valokuva vaaleasta, kolmikerroksisesta kartanorakennuksesta puiden ja '
          + 'pensaiden ympäröimänä. Artikkelin mukaan Fiskarsin tunnetuimman rakennuksen, '
          + 'kartanon, suunnitteli vuonna 1818 Charles Bassi.',
        lahde: 'Valokuva: Signe Brander, Wikimedia Commons (Public domain).',
        tekija: 'Signe Brander',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fiskarsin_kartano.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
    ],
    nimi: 'Fiskars',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Fiskarsin tuotteille tarvittiin kapearaiteinen rautatie Pohjankurun satamaan?',
      'Mitä kaikkea ruukissa ja sen pajoissa osattiin valmistaa?',
    ],
    korostukset: ['Petter Thorwöste|Petter Thorwöste', 'puukko|puukoista'],
    nappi: 'Ruukki oli toiminut vuodesta 1649; kapearaiteinen rata satamaan avataan vasta '
      + 'vuonna 1891',
    // 23.5422 E / 60.1297 N — en-Wikipedia "Fiskars, Finland"
    laudat: {
      maailmankartta: { x: 6618.1, y: 919.2 },
      europe: { x: 663.2, y: 312.2 },
    },
    teksti: 'Fiskars on kylä Raaseporin kaupungin Pohjan alueella Etelä-Suomessa. Kylä kasvoi '
      + 'rautaruukin ympärille, jonka saksalaissyntyinen Petter Thorwöste perusti vuonna '
      + '1649; ruukissa valmistettiin myös kuparia. Vuonna 1822 ruukin osti John Jacob von '
      + 'Julin, ja hänen aikanaan Fiskarsiin perustettiin vuonna 1836 Suomen ensimmäinen '
      + 'työpaja. Tehtaissa ja pajoissa tehtiin arjen tarvekaluja saksista ja puukoista '
      + 'auroihin ja voimansiirtolaitteisiin, ja tuotteet kuljetettiin Pohjankurun '
      + 'satamaan kapearaiteista rautatietä pitkin vuosina 1891–1952. Nykyään alle '
      + 'tuhannen asukkaan kylä on suosittu matkailukohde, jossa asuu ja työskentelee '
      + 'taiteilijoita ja käsityöläisiä.',
    lahde: 'en-Wikipedia "Fiskars, Finland", johdanto-osa ja osio "History" (tarkistettu '
      + '19.9.2026).',
    visa: {
      kysymys: 'Kuka perusti Fiskarsin rautaruukin vuonna 1649?',
      vaihtoehdot: [
        'John Jacob von Julin',
        'Antti Ahlström',
        'Petter Thorwöste',
        'Charles Bassi',
      ],
      oikea: 2,
      fakta: 'Kylän tunnetuimman rakennuksen, kartanon, suunnitteli vuonna 1818 '
        + 'italialaissyntyinen arkkitehti Charles Bassi. Fiskarsissa ratkaistiin myös '
        + 'ensimmäiset suunnistuksen maailmanmestaruuskilpailut vuonna 1966.',
    },
  },
  {
    id: 'hahmotelma-noormarkku',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-noormarkku-c156418b.jpg',
      lyhyt: 'Makkarakosken voimalaitos Noormarkun ruukin alueella.',
      selite: 'Voimalaitos ja muita ruukin rakennuksia seisovat tyynen joen rannalla '
        + 'Noormarkun ruukin alueella Porissa. Ruukkialue on Noormarkun suosituin '
        + 'nähtävyys.',
      lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'kallerna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Noormarkun_ruukki_4.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-noormarkku-b4986fce.jpg',
        lyhyt: 'Pitkä punainen ruukkirakennus jokivarressa Noormarkussa.',
        selite: 'Punamullattu rakennus seisoo kivijalan päällä ruskeavetisen joen partaalla. '
          + 'Kuva on Noormarkun ruukin alueelta Porista.',
        lahde: 'Valokuva: Pihamies, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pihamies',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Noormarkku_Ironworks_(03).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-noormarkku-004b9942.jpg',
        lyhyt: 'Punaisia ruukkirakennuksia ja hiekkatie Noormarkun ruukin alueella.',
        selite: 'Ruukkialueen puistomaisessa ympäristössä on vanhoja puurakennuksia. Kuva on '
          + 'otettu toukokuussa 2021.',
        lahde: 'Valokuva: Pihamies, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pihamies',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Noormarkku_Ironworks_(01).jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Noormarkku',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi Noormarkusta tuli Ahlström-yhtiön syntysija?',
      'Miksi suomenkielinen koulu oli erityinen asia 1800-luvun Suomessa?',
    ],
    korostukset: ['Antti Ahlström|Antti Ahlström', 'rautaruukki|rautaruukin'],
    nappi: 'Antti Ahlström oli ostanut sahan, ruukin ja kartanon vasta kolme vuotta aiemmin, '
      + 'vuonna 1870',
    // 21.8667 E / 61.5917 N — en-Wikipedia "Noormarkku"
    laudat: {
      maailmankartta: { x: 6562.2, y: 845.4 },
      europe: { x: 631, y: 273.7 },
    },
    teksti: 'Noormarkku on Satakunnassa sijaitseva entinen kunta, joka liitettiin Poriin '
      + 'vuoden 2010 alussa. Paikka on Ahlström-yhtiön syntysija: Antti Ahlström osti '
      + 'Noormarkusta sahan, rautaruukin ja kartanon vuonna 1870, ja liiketoiminta lähti '
      + 'nopeaan kasvuun. Ahlström kehitti kylää laajasti: hän rakennutti tieverkkoa ja '
      + 'perusti yhden Suomen ensimmäisistä suomenkielisistä kouluista. Ruukin '
      + 'puistoalueella on paljon kulttuurihistoriallisesti arvokkaita rakennuksia, ja se '
      + 'on Noormarkun suosituin nähtävyys. Nykyisin ruukkialueen omistaa A. Ahlström '
      + 'Osakeyhtiö.',
    lahde: 'en-Wikipedia "Noormarkku" ja fi-Wikipedia "Noormarkku", johdanto-osat ja fi-osio '
      + '"Historia" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-varkaus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-varkaus-6697aaac.jpg',
      lyhyt: 'Warkaus 1800-luvun puolivälissä Kruskopfin litografiassa.',
      selite: 'Pehr Adolf Kruskopfin litografia Warkauden maisemasta, julkaistu Zacharias '
        + 'Topeliuksen toimittamassa teoksessa Finland framställdt i teckningar '
        + '(1845-1852). Kuvassa näkyy hirsirakennus, silta ja vesistön saaria.',
      lahde: 'Valokuva: Pehr Adolf Kruskopf, Wikimedia Commons (Public domain).',
      tekija: 'Pehr Adolf Kruskopf',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Warkaus_-_Pehr_Adolf_Kruskopf_-_Finland_framställdt_i_teckningar_-_82.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-varkaus-12ef229a.jpg',
        lyhyt: 'Vanha Taipaleen kanava: kiviseinämät ja silta kanavan päässä.',
        selite: 'Kiviseinämien reunustama kapea sulkukanava heijastaa taivasta ja syksyn '
          + 'värejä. Taipaleen kanavan alue on yksi Varkauden merkittävistä '
          + 'nähtävyyksistä.',
        lahde: 'Valokuva: Tiia Monto, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tiia Monto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Old_Taipale_Canal.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-varkaus-51463788.jpg',
        lyhyt: 'Varkauden tehdasalue vesiväylän rannalla: punatiilirakennuksia ja piippuja.',
        selite: 'Panoraamakuva Varkauden paperitehtaiden alueelta. Commonsissa alue on '
          + 'merkitty valtakunnallisesti merkittäväksi rakennetuksi kulttuuriympäristöksi, '
          + '\'Varkauden paperitehtaat\'.',
        lahde: 'Valokuva: Tiia Monto, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Tiia Monto',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Varkaus_factory_-_canal.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Varkaus',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Miksi tehtaat rakennettiin juuri Varkauteen, salmien ja koskien äärelle?',
      'Mitä sulkukanava tekee, ja miksi Taipaleen kanava oli tärkeä?',
    ],
    korostukset: ['Taipaleen kanava|Taipaleen kanava', 'sulkukanava|sulkukanava'],
    nappi: 'Kuului vielä Leppävirran ja Joroisten kuntiin; kauppalaksi Varkaus tulee vasta '
      + 'vuonna 1929',
    // 27.8917 E / 62.3167 N — en-Wikipedia "Varkaus"
    laudat: {
      maailmankartta: { x: 6763.1, y: 808.2 },
      europe: { x: 746.7, y: 254.7 },
    },
    teksti: 'Varkaus on Pohjois-Savon teollisuuskaupunki Saimaan kahden osan välisillä '
      + 'salmilla; vanhassa suomessa sana varkaus tarkoitti salmea. Paikka kehittyi '
      + '1800-luvun aikana merkittäväksi teollisuuskeskukseksi vesivoiman ja hyvän '
      + 'vesireittisijainnin ansiosta: siellä oli puu- ja paperiteollisuutta sekä '
      + 'laivanrakennusta. Taipaleen kanava oli ensimmäinen Suomessa rakennettu '
      + 'sulkukanava, ja se yhdisti Leppävirran reitin Saimaan vesiteihin. Ruukki siirtyi '
      + '1900-luvun alussa A. Ahlström Osakeyhtiölle, ja Walter Ahlström halusi rakentaa '
      + 'tehtaiden ympärille kokonaisen teollisuuskaupungin. Varkaus tuli itsenäiseksi '
      + 'kauppalaksi vuonna 1929 ja kaupungiksi vuonna 1962.',
    lahde: 'en-Wikipedia "Varkaus" ja fi-Wikipedia "Varkaus (kaupunki)", johdanto-osat ja '
      + 'fi-osio "Historia" (tarkistettu 19.9.2026).',
  },
  {
    id: 'hahmotelma-kemi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kemi-9a535174.jpg',
      lyhyt: 'Kemin vanha satama: laituri ja keltaisia rakennuksia rannalla.',
      selite: 'Näkymä Kemin vanhan sataman rantaan. Kaupunki perustettiin keisarin asetuksella '
        + 'vuonna 1869 syvänmerisataman läheisyyden vuoksi.',
      lahde: 'Valokuva: Estormiz, Wikimedia Commons (CC0).',
      tekija: 'Estormiz',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kemi_Old_Harbour_20140908.JPG',
      lisenssi: 'CC0',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kemi-4c0faaa5.jpg',
        lyhyt: 'Karihaaran saha Kemissä, rakennettu vuosina 1935-1937.',
        selite: 'Vanha mustavalkoinen valokuva Karihaaran sahan rakennuksesta, jonka '
          + 'suunnitteli arkkitehti Wäinö G. Palmqvist. Saha valmistui vasta 1930-luvulla '
          + 'eli paljon vuoden 1873 jälkeen; kuva on otettu 1937-1957.',
        lahde: 'Valokuva: Tuntematon tekijä, Wikimedia Commons (Public domain).',
        tekija: 'Tuntematon tekijä',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Karihaara_Sawmill_Kemi.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-kemi-8161a210.jpg',
        lyhyt: 'Kemin kirkko: korkea torni ja kaarevat ikkunat.',
        selite: 'Kemin kirkko valmistui fi-Wikipedian mukaan vuonna 1902. Kuva on otettu '
          + 'kesäkuussa 2022.',
        lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'kallerna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kemi_Church_1.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Kemi',
    tyyppi: 'kauppa',
    lahi: true,
    kysymykset: [
      'Miksi kaupunki perustettiin juuri Kemijoen suulle?',
      'Miksi Kemin satama saattoi talvella olla jäiden saartama?',
    ],
    korostukset: ['lumilinna|lumilinnasta', 'Aleksanteri II|Aleksanteri II'],
    nappi: 'Kaupunki oli aivan uusi: keisarillinen asetus antoi sille kaupunkioikeudet vuonna '
      + '1869',
    // 24.5636 E / 65.7361 N — en-Wikipedia "Kemi"
    laudat: {
      maailmankartta: { x: 6652.1, y: 626.1 },
      europe: { x: 682.8, y: 164.7 },
    },
    teksti: 'Kemi on Perämeren rannalla Kemijoen suulla sijaitseva kaupunki, jonka perusti '
      + 'keisari Aleksanteri II:n asetus vuonna 1869. Paikka valittiin syvänmerisataman '
      + 'läheisyyden vuoksi, ja ensimmäinen asemakaava oli tehty jo kymmenen vuotta '
      + 'aiemmin. Kaupungin rakennusperintöön ovat vaikuttaneet meren läheisyyden lisäksi '
      + 'saha- ja paperiteollisuuden kehitys. Ennen vuonna 1975 käyttöön otettua '
      + 'jäänmurtaja Urhoa Kemin satama saattoi olla jäiden saartama joulukuun alusta '
      + 'huhtikuuhun. Nykyään Kemi tunnetaan myös maailman suurimmasta lumilinnasta, joka '
      + 'rakennetaan sataman läheisyyteen joka vuosi uudelleen.',
    lahde: 'en-Wikipedia "Kemi" ja fi-Wikipedia "Kemi", johdanto-osat sekä historia-, '
      + 'nähtävyys- ja rakennusperintöosiot (tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Kemin kaupunki perustettiin keisarillisella asetuksella?',
      vaihtoehdot: [
        '1869',
        '1859',
        '1879',
        '1889',
      ],
      oikea: 0,
      fakta: 'Kemin jalokivigalleriassa on Suomen kruunun malli, vaikka alkuperäistä kruunua '
        + 'ei koskaan tehty. Kaupungin nähtävyyksiin kuuluu myös jäänmurtaja Sampo.',
    },
  },
  {
    id: 'hahmotelma-nokia',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-nokia-8d91dfb5.jpg',
      lyhyt: 'Nokiankoski 1890-luvulla: vaahtoava koski ja silta.',
      selite: 'Vanha valokuva vaahtoavasta Nokiankoskesta ja sen yli johtavasta sillasta '
        + 'metsäisessä maisemassa. Kuva on otettu noin vuosina 1890-1899, kuvaaja I. K. '
        + 'Inha.',
      lahde: 'Valokuva: I. K. Inha, Wikimedia Commons (Public domain).',
      tekija: 'I. K. Inha',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nokiankoski.jpeg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://creativecommons.org/publicdomain/mark/1.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/fin-nosto-nokia-353f4aea.jpg',
        lyhyt: 'Nokianvirta ja Tehdassaari lähellä kaupungin keskustaa syksyllä.',
        selite: 'Panoraamakuva Nokianvirrasta ja Tehdassaaren saaresta lokakuussa 2021. '
          + 'Artikkelin mukaan Idestamin puuhiomo perustettiin juuri Nokianvirran '
          + 'rannalle.',
        lahde: 'Valokuva: kallerna, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'kallerna',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Nokianvirta_4.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Nokia',
    tyyppi: 'tekniikka',
    lahi: true,
    kysymykset: [
      'Mistä kaupungin nimi Nokia voi olla peräisin?',
      'Miksi puuhiomo rakennettiin juuri Nokianvirran rannalle?',
    ],
    korostukset: ['Fredrik Idestam|Fredrik Idestam', 'nuijasota|nuijasodan'],
    nappi: 'Idestamin yritys oli saanut nimekseen Nokia Ab vasta 1871; puhelimet tulevat '
      + 'vasta paljon myöhemmin',
    // 23.5053 E / 61.4767 N — en-Wikipedia "Nokia, Finland"
    laudat: {
      maailmankartta: { x: 6616.8, y: 851.3 },
      europe: { x: 662.5, y: 276.8 },
    },
    teksti: 'Nokia on kaupunki Pirkanmaalla Nokianvirran rannalla, noin 15 kilometrin päässä '
      + 'Tampereelta länteen. Nimen alkuperä on epäselvä, mutta yleisimmän teorian mukaan '
      + 'se juontuu vanhasta sanasta, joka tarkoitti soopelia. Nimi mainitaan '
      + 'kirjallisesti ensimmäisen kerran vuonna 1505, ja Nokian kartanon ympärillä '
      + 'käytiin vuosina 1596-1597 yksi nuijasodan suurimmista taisteluista. Vuonna 1868 '
      + 'kaivosinsinööri Fredrik Idestam perusti toisen puuhiomonsa Nokianvirran rannalle, '
      + 'ja hänen yrityksensä nimettiin Nokia Aktiebolagiksi vuonna 1871. Yhtiön myöhempi '
      + 'matkapuhelinliiketoiminta alkoi vasta 1960-luvulla, eikä puhelimia koskaan '
      + 'valmistettu Nokian kaupungissa.',
    lahde: 'en-Wikipedia "Nokia, Finland", johdanto-osa ja osio "Industrial history" '
      + '(tarkistettu 19.9.2026).',
    visa: {
      kysymys: 'Minä vuonna Idestamin yritys nimettiin Nokia Aktiebolagiksi?',
      vaihtoehdot: [
        '1868',
        '1897',
        '1904',
        '1871',
      ],
      oikea: 3,
      fakta: 'Suomen Gummitehdas perusti Nokiaan tehtaan vuonna 1904, ja sen jatkaja Nokian '
        + 'Renkaat toimii kaupungissa yhä. Nokian nykyiset suurimmat yritykset toimivat '
        + 'aivan muilla aloilla kuin puhelimissa.',
    },
  },
];
