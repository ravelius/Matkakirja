/*
 * MAASTOKOHTEET — CHE. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs CHE --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/CHE.json. Työkalu laskee laudan
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
 * näiden karttanostojen osalta."* Sveitsi oli yksi laudan tyhjimmistä
 * maista: kahdeksan karttamerkkiä ja nolla kuratoitua kohdetta
 * (docs/moduulit/karttanostot-kattavuus.md). Tavoite on kahdeksan
 * KOHDETTA maastokohteiden lisäksi, ja tässä ne ovat.
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-che.js:ssä.
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
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (La Chaux-de-Fonds)
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
 * Sveitsin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Sisämaavaltio: ei meriä.
 */
export const MAASTOKOHTEET_CHE = [
  {
    id: 'dufourspitze',
    nimi: 'Dufourspitze',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka Guillaume-Henri Dufour oli?',
      'Kuinka monta neljäntuhannen metrin huippua Monte Rosassa on?',
    ],
    korostukset: ['Monte Rosa|Monte Rosa'],
    nappi: 'Sveitsin korkein huippu',
    // 7.8667 E / 45.9369 N — en-Wikipedia "Monte Rosa" (massiivin koordinaatti)
    laudat: {
      maailmankartta: { x: 6095.6, y: 1563 },
      europe: { x: 362.2, y: 685.5 },
    },
    teksti: 'Dufourspitze on 4 634 metriä korkea ja Alppien sekä Länsi-Euroopan toiseksi korkein '
      + 'vuori heti Mont Blancin jälkeen. Se on Monte Rosa -massiivin korkein huippu '
      + 'Pennialpeilla ja kokonaan Sveitsin puolella, ja se on nimetty maanmittari '
      + 'Guillaume-Henri Dufourin mukaan. Massiivissa on useita muitakin yli neljäntuhannen '
      + 'metrin huippuja, ja se on vedenjakaja Rhônen ja Pon vesistöjen välillä.',
    lahde: 'en-Wikipedia "Monte Rosa", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'matterhorn',
    nimi: 'Matterhorn',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka nousi Matterhornille ensimmäisenä?',
      'Miksi Matterhorn on niin tarkan pyramidin muotoinen?',
    ],
    korostukset: ['Pennialpit|Pennialpeilla'],
    nappi: 'Maailman kuvatuin vuori',
    // 7.6586 E / 45.9764 N — en-Wikipedia "Matterhorn"
    laudat: {
      maailmankartta: { x: 6088.6, y: 1561.3 },
      europe: { x: 358.2, y: 684.4 },
    },
    teksti: 'Matterhorn seisoo Sveitsin ja Italian rajalla päävedenjakajalla, ja sen 4 478 metrin '
      + 'huippu on lähes symmetrinen pyramidi Pennialpeilla Monte Rosan alueella. Sitä on '
      + 'kutsuttu vuorten vuoreksi ja Sveitsin sekä koko Alppien tunnukseksi. Sitä on myös '
      + 'kuvattu maailman kauneimmaksi vuoreksi ja väitetty maailman valokuvatuimmaksi.',
    lahde: 'en-Wikipedia "Matterhorn", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'jungfrau',
    nimi: 'Jungfrau',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitkä ovat Eiger ja Mönch?',
      'Miten Jungfraulle päästään nykyään?',
    ],
    nappi: 'Kolmen vuoren muurista korkein',
    // 7.9626 E / 46.5368 N — en-Wikipedia "Jungfrau"
    laudat: {
      maailmankartta: { x: 6098.8, y: 1538 },
      europe: { x: 364.1, y: 669.7 },
    },
    teksti: 'Jungfrau kohoaa 4 158 metriin ja on yksi Bernin Alppien päähuipuista Bernin ja '
      + 'Valais\'n kantonien välissä, puolimatkassa Interlakenista Fieschiin. Yhdessä Eigerin ja '
      + 'Mönchin kanssa se muodostaa valtavan vuorimuurin, joka kohoaa Bernin Oberlandin ja '
      + 'Sveitsin ylätasangon yllä. Muuri on Sveitsin Alppien tunnistettavimpia näkyjä.',
    lahde: 'en-Wikipedia "Jungfrau", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rein',
    nimi: 'Rein',
    tyyppi: 'joki',
    kysymykset: [
      'Missä Reinin varsinainen lähde on?',
      'Kuinka monen maan rajaa Rein muodostaa?',
    ],
    nappi: 'Joki, joka alkaa Sveitsistä',
    // 9.53 E / 46.85 N — Chur Alppien Reinin varrella; artikkelin koordinaatti 4,081 / 51,982 on suistossa Alankomaissa
    laudat: {
      maailmankartta: { x: 6151, y: 1524.8 },
      europe: { x: 394.2, y: 661.4 },
    },
    teksti: 'Rein on yksi Euroopan suurista joista, ja se alkaa Graubündenin kantonista '
      + 'Kaakkois-Sveitsin Alpeilta. Se muodostaa osan Sveitsin ja Liechtensteinin sekä '
      + 'Sveitsin ja Itävallan rajasta, ja Bodenjärvestä alaspäin osan Sveitsin ja Saksan '
      + 'rajasta. Sieltä se jatkaa Ranskan ja Saksan rajaa, kääntyy pohjoiseen Saksan halki ja '
      + 'laskee lopulta Alankomaissa Pohjanmereen.',
    lahde: 'en-Wikipedia "Rhine", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rhone',
    nimi: 'Rhône',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Rhône-jäätikkö on?',
      'Miksi Genevenjärvi on niin kirkas?',
    ],
    nappi: 'Joki, joka syntyy jäätiköllä',
    // 7.36 E / 46.23 N — Sion Valais'n Rhône-laaksossa; artikkelin koordinaatti 4,846 / 43,331 on suistossa Ranskassa
    laudat: {
      maailmankartta: { x: 6078.7, y: 1550.8 },
      europe: { x: 352.5, y: 677.8 },
    },
    teksti: 'Rhône saa alkunsa Alpeilta Sveitsin Valais\'n kantonista, virtaa Genevenjärven läpi ja '
      + 'jatkaa siitä Kaakkois-Ranskaan ja Välimereen. Sveitsin puolella se kulkee koko '
      + 'Valais\'n laakson pituudelta. Arles\'n kohdalla lähellä suistoa se jakautuu Suureksi ja '
      + 'Pieneksi Rhôneksi.',
    lahde: 'en-Wikipedia "Rhône", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   *
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'kapellbrucke',
    nimi: 'Kapellbrücke',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi sillan kolmiokehykset ovat ainutlaatuisia?',
      'Mihin Wasserturmia on käytetty?',
    ],
    korostukset: ['Wasserturm|Wasserturm'],
    nappi: 'Euroopan vanhin katettu puusilta',
    // 8.3075 E / 47.0517 N — en-Wikipedia "Kapellbrücke"
    laudat: {
      maailmankartta: { x: 6110.3, y: 1516.3 },
    },
    teksti: 'Kapellbrücke on katettu puinen kävelysilta, joka ylittää Reussin '
      + 'vinottain keskellä Luzernia. Nimensä se on saanut viereisestä Pyhän '
      + 'Pietarin kappelista. Silta rakennettiin noin vuonna 1365 osaksi kaupungin '
      + 'linnoituksia: se yhdisti vanhankaupungin oikealla rannalla uuteen '
      + 'kaupunkiin vasemmalla ja suojasi kaupunkia järven suunnasta tulevalta '
      + 'hyökkäykseltä. Alun perin se oli yli 270 metriä pitkä; lyhennysten ja '
      + 'rantatäyttöjen jälkeen pituus on 204,7 metriä.\n\n'
      + 'Siltakokonaisuuteen kuuluu kahdeksankulmainen, maasta mitattuna 34,5 metriä '
      + 'korkea Wasserturm eli vesitorni — torni, joka seisoo vedessä. Se on noin '
      + 'kolmekymmentä vuotta siltaa vanhempi, ja sitä on vuosisatojen mittaan '
      + 'käytetty vankilana, kidutuskammiona ja myöhemmin kaupungin arkistona ja '
      + 'rahastona.\n\n'
      + 'Sillan sisäkatossa on kolmion muotoisia maalauksia 1600-luvulta. Luzern on '
      + 'siinä ainutlaatuinen: kaupungin kolmessa puisessa kävelysillassa oli '
      + 'kaikissa maalatut kolmiokehykset, eikä yhdessäkään muussa Euroopan '
      + 'puusillassa ole tätä piirrettä. Maalaukset teki paikallinen maalari Hans '
      + 'Heinrich Wägmann. Elokuun 18. päivänä 1993 silta paloi lähes kokonaan ja '
      + 'kaksi kolmasosaa maalauksista tuhoutui; silta avattiin uudelleen '
      + '14. huhtikuuta 1994.',
    lahde: 'en-Wikipedia "Kapellbrücke", johdanto-osa sekä osiot "History" ja '
      + '"Paintings" (tarkistettu 2.9.2026).',
  },
  {
    id: 'stiftsbibliothek',
    nimi: 'Stiftsbibliothek',
    tyyppi: 'sana',
    kysymykset: [
      'Mitä oven yllä oleva kreikankielinen kirjoitus tarkoittaa?',
      'Mistä näkee, mitä kirjakaapissa on?',
    ],
    korostukset: ['inkunaabeli|inkunaabelia'],
    nappi: 'Sielun parantola',
    // 9.3764 E / 47.4228 N — en-Wikipedia "Abbey library of Saint Gall"
    laudat: {
      maailmankartta: { x: 6145.9, y: 1500.7 },
    },
    teksti: 'St. Gallenin luostarikirjasto on yksi maailman vanhimmista '
      + 'luostarikirjastoista. Sen perusti Pyhä Othmar, luostarin perustaja. Kun '
      + 'luostari paloi vuonna 937, kirjasto säilyi ehjänä. Nykyinen kirjastosali '
      + 'rakennettiin vuosina 1758–1767 arkkitehti Peter Thumbin rokokoopiirustusten '
      + 'mukaan. Oven yllä lukee kreikaksi ΨΥΧΗΣ ΙΑΤΡΕΙΟΝ, "sielun parantola" — '
      + 'kirjoitus on lainattu Ramses II:n kirjaston kaiverruksesta.\n\n'
      + 'Kokoelma on Sveitsin vanhin: lähes 160 000 nidettä, joista 1 650 on '
      + 'inkunaabelia eli ennen vuotta 1500 painettua kirjaa, ja 2 100 käsikirjoitusta '
      + '700-luvulta 1400-luvulle. Käsikirjoitukset ovat lasikaapeissa, ja jokaisen '
      + 'kaapin päällä on veistetty kerubi, joka kertoo katseella mitä hyllyssä on: '
      + 'tähtitieteen kaapin kerubi tähyilee kirjoja kaukoputkella.\n\n'
      + 'Talossa on kaksi kuuluisaa vierasta. Nibelungenliedin käsikirjoitus B '
      + 'säilytetään täällä, ja kirjastossa asuu myös muumio, Shep-en-Isis. '
      + 'Kirjasto ja luostari otettiin maailmanperintöluetteloon 1983 esimerkkinä '
      + 'suuresta karolingisesta luostarista, joka oli 700-luvulta vuoden 1805 '
      + 'sekularisaatioon asti yksi Euroopan tärkeimmistä kulttuurikeskuksista.',
    lahde: 'en-Wikipedia "Abbey library of Saint Gall", johdanto-osa sekä osiot '
      + '"History and architecture" ja "Collections" (tarkistettu 2.9.2026).',
  },
  {
    id: 'chillon',
    nimi: 'Chillonin linna',
    nimio: 'Chillon',
    tyyppi: 'historia',
    kysymykset: [
      'Miksi linna rakennettiin juuri tähän kohtaan?',
      'Mitä nimi Chillon tarkoittaa?',
    ],
    korostukset: ['tulli|tullia'],
    nappi: 'Linna kalliolautalla Genevenjärvessä',
    // 6.9275 E / 46.4142 N — en-Wikipedia "Chillon Castle"
    laudat: {
      maailmankartta: { x: 6064.3, y: 1543.1 },
    },
    teksti: 'Chillonin linna seisoo pienellä jyrkkäreunaisella kalkkikivisaarella '
      + 'Genevenjärvessä, Montreux’n ja Villeneuven välisellä kapealla rannalla. '
      + 'Sveitsiläisen kansatieteilijän Albert Samuel Gatschet’n mukaan nimi tulee '
      + 'valdolaismurteen sanasta, joka tarkoittaa litteää kiveä tai lavaa: vuodesta '
      + '1195 tunnettu Castrum Quilonis olisi siis "kalliolavalle rakennettu linna".\n\n'
      + 'Paikka on valittu tarkasti. Linna vartioi kulkua Vaud’n rivieran — reitin '
      + 'pohjoiseen Saksaan ja Ranskaan — ja Rhônen laakson välillä, joka on nopea tie '
      + 'Italiaan. Varuskunta pystyi siis valvomaan Italian-tietä sekä sotilaallisesti '
      + 'että kaupallisesti ja perimään tullia ohikulkijoilta.\n\n'
      + 'Neliömäinen päätorni rakennettiin saarelle 1000-luvulla valvomaan '
      + 'Burgundista Suuren Pyhän Bernhardin solaan johtavaa tietä. Vuoden 1150 '
      + 'asiakirja osoittaa linnan kuuluneen Savoijin suvulle, ja 1100-luvun '
      + 'puolivälistä se oli Savoijin kreivien kesäasunto; heillä oli järvellä oma '
      + 'laivasto. Kreivi Pietari II laajensi linnaa 1248 ja 1266–67, ja sen '
      + 'omaleimaiset ikkunat teki mestari Jaakko Saint Georgelainen. Bernin '
      + 'kaupunki hallitsi linnaa vuodesta 1536 vuoteen 1798; nyt se kuuluu Vaud’n '
      + 'kantonille.',
    lahde: 'en-Wikipedia "Chillon Castle", johdanto-osa sekä osiot "Etymology", '
      + '"Introduction" ja "History/Savoy period" (tarkistettu 2.9.2026).',
  },
  {
    id: 'gotthardin-tunneli',
    nimi: 'Gotthardin tunneli',
    nimio: 'Gotthard',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Miksi Louis Favre ei nähnyt tunnelin valmistuvan?',
      'Mikä uusi keksintö otettiin täällä ensi kertaa suureen käyttöön?',
    ],
    korostukset: ['dynamiitti|dynamiittia'],
    nappi: 'Viisitoista kilometriä vuoren läpi',
    // 8.5956 E / 46.5956 N — en-Wikipedia "Gotthard Tunnel"
    laudat: {
      maailmankartta: { x: 6119.9, y: 1535.5 },
    },
    teksti: 'Gotthardin tunneli on viisitoista kilometriä pitkä rautatietunneli, '
      + 'joka yhdistää Göschenenin ja Airolon Saint-Gotthardin vuorimassiivin läpi. '
      + 'Se oli ensimmäinen tunneli massiivin läpi ja kiersi vanhan Gotthardin solan. '
      + 'Kun se avattiin 1882, se oli maailman pisin tunneli.\n\n'
      + 'Varsinainen louhinta alkoi vuonna 1871 ja kesti kymmenen vuotta. Tunnelia '
      + 'kaivettiin molemmista päistä yhtä aikaa, mikä vaati tarkkaa maanmittausta. '
      + 'Työmaa oli ensimmäinen paikka, jossa vasta 1867 patentoitua dynamiittia '
      + 'käytettiin suuressa mitassa, ja urakoitsija Louis Favre ajoi läpi myös '
      + 'koneellisten poravaunujen käytön. Energia siirrettiin työmaalle '
      + 'paineilmana genevalaisen insinööri Colladonin ehdotuksesta, ja kalliopintaa '
      + 'jäähdytettiin vesisuihkuilla.\n\n'
      + 'Hinta oli kova. Yhdessä ainoassa onnettomuudessa kuoli noin 200 työmiestä, '
      + 'suurin osa paineilmaveturien alle; muita kuoli kivivyöryissä ja '
      + 'räjähdyksissä. Selvinneistä moni sairastui koukkumatoepidemiassa, jonka '
      + 'tutkiminen vei loisoppia eteenpäin. Vuonna 1875 työläiset menivät lakkoon, '
      + 'ja Altdorfin poliisit tukahduttivat sen väkivaltaisesti: neljä työmiestä '
      + 'kuoli. Favre itse sai sydänkohtauksen tunnelissa 19. heinäkuuta 1879, '
      + 'puoli vuotta ennen läpimurtoa.\n\n'
      + 'Läpimurto tapahtui 29. helmikuuta 1880, ja mittaustarkkuus osoittautui '
      + 'erinomaiseksi. Insinööri Adolphe Gautier kutsui työtä aikanaan "suurimmaksi '
      + 'teoksi, mihin ihminen on tähän mennessä ryhtynyt".',
    lahde: 'en-Wikipedia "Gotthard Tunnel", johdanto-osa ja osio '
      + '"History/Construction" (tarkistettu 2.9.2026).',
  },
  {
    id: 'grand-st-bernard',
    nimi: 'Suuren Pyhän Bernhardin hospitaali',
    nimio: 'Pyhä Bernhard',
    tyyppi: 'elain',
    kysymykset: [
      'Miksi juuri nämä koirat kelpasivat pelastustyöhön?',
      'Onko konjakkitynnyri koiran kaulassa totta?',
    ],
    korostukset: ['bernhardilainen|bernhardilaiset'],
    nappi: 'Majatalo solassa ja sen koirat',
    // 7.1706 E / 45.8689 N — en-Wikipedia "Great St Bernard Hospice"
    laudat: {
      maailmankartta: { x: 6072.4, y: 1565.8 },
    },
    teksti: 'Suuren Pyhän Bernhardin hospitaali on matkalaisten majatalo Suuren '
      + 'Pyhän Bernhardin solassa 2 469 metrin korkeudessa Pennialpeilla, muutaman '
      + 'sadan metrin päässä Italian rajasta. Sitä on hoitanut sama sääntökuntaisten '
      + 'kanonikkien yhteisö perustamisesta asti.\n\n'
      + 'Ensimmäinen hospitaali rakennettiin 800-luvulla Bourg-Saint-Pierreen, mutta '
      + 'saraseenien ryöstöretket tuhosivat sen 900-luvun puolivälissä. Noin vuonna '
      + '1050 Aostan arkkidiakoni Bernhard Menthonilainen näki solassa jatkuvasti '
      + 'kauhistuneita ja hädänalaisia matkalaisia ja päätti tehdä lopun alueen '
      + 'rosvoudesta. Niin syntyi hospitaali, joka sai myöhemmin hänen nimensä.\n\n'
      + 'Bernhardilaiset koirat jalostettiin juuri täällä, todennäköisesti '
      + 'Valais’n perheiden lahjoittamista koirista 1660- ja 1670-luvuilla; ensimmäinen '
      + 'varma maininta rodusta on vuodelta 1709. Alun perin ne olivat vahtikoiria ja '
      + 'vasta myöhemmin pelastuskoiria: ne olivat kyllin vahvoja kahlaamaan syvien '
      + 'kinosten läpi ja pystyivät jäljittämään eksyneen hajun perusteella. '
      + 'Vanhimmat todisteet koirista ovat Salvator Rosan kaksi maalausta vuodelta '
      + '1690. Kaulassa roikkuva konjakkitynnyri sen sijaan näyttää olleen enimmäkseen '
      + '1800-luvun myytti — vaikka ainakin yksi koira sellaista kantoikin.',
    lahde: 'en-Wikipedia "Great St Bernard Hospice", johdanto-osa sekä osiot '
      + '"History" ja "St. Bernard dog" (tarkistettu 2.9.2026).',
  },
  {
    id: 'zytglogge',
    nimi: 'Zytglogge',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Mistä torni sai nimensä?',
      'Mihin tornia käytettiin ennen kelloa?',
    ],
    korostukset: ['astronominen kello|astronominen kello'],
    nappi: 'Aikakello Bernin vanhassa portissa',
    // 7.4478 E / 46.9481 N — en-Wikipedia "Zytglogge"
    laudat: {
      maailmankartta: { x: 6081.6, y: 1520.7 },
    },
    teksti: 'Zytglogge on keskiaikainen torni Bernin vanhassakaupungissa ja '
      + 'kaupungin vanhin muistomerkki. Kahdeksansadan vuoden aikana se on ollut '
      + 'vartiotorni, vankila, kellotorni, kaupunkielämän keskus ja muistomerkki.\n\n'
      + 'Torni rakennettiin noin 1218–1220 Bernin läntisten linnoitusten '
      + 'porttitorniksi, ja se oli silloin vain kuusitoista metriä korkea. Kun '
      + 'kaupunki kasvoi ja muurit siirtyivät kauemmas noin 1270–1275, tornia '
      + 'korotettiin seitsemällä metrillä, jotta se yhä näkisi talojen yli. Kun '
      + 'länsipuolustus laajeni jälleen 1344–1346, tornista tehtiin naisvankila.\n\n'
      + 'Vuoden 1405 suurpalossa torni paloi sisältä kokonaan. Vankisellit jätettiin '
      + 'pois, ja portin ylle asennettiin 1400-luvun alussa kello, luultavasti jo '
      + 'yksinkertainen astronominen kello ja soittokoneisto. Juuri tämä kello ja '
      + 'samana vuonna valettu suuri kirkonkello antoivat tornille nimen: Zytglogge '
      + 'tarkoittaa Bernin murteella aikakelloa. 1400-luvun lopulla torni sai uuden '
      + 'lyhdyn kellonlyöjineen, neljä kulmatornia ja vaakunakoristeet, ja '
      + 'astronominen kello laajennettiin nykyiseen asuunsa.',
    lahde: 'en-Wikipedia "Zytglogge", johdanto-osa ja osio "History" '
      + '(tarkistettu 2.9.2026).',
  },
  {
    id: 'la-chaux-de-fonds',
    nimi: 'La Chaux-de-Fonds',
    tyyppi: 'kauppa',
    kysymykset: [
      'Miksi kaupunki elää kellosepäntyöstä eikä maanviljelystä?',
      'Miksi kadut kulkevat suorassa ruudukossa?',
    ],
    korostukset: ['ruudukkokaava|ruudukkokaavan'],
    nappi: 'Kaupunki, joka rakennettiin kellojen ehdoilla',
    // 6.83 E / 47.1028 N — en-Wikipedia "La Chaux-de-Fonds"
    laudat: {
      maailmankartta: { x: 6061, y: 1514.2 },
    },
    teksti: 'La Chaux-de-Fonds on kaupunki Neuchâtelin kantonissa Juravuorilla '
      + '992 metrin korkeudessa, muutaman kilometrin päässä Ranskan rajasta. Se '
      + 'perustettiin 1656, ja sen kasvu ja vauraus ovat kiinni kellonvalmistuksessa: '
      + 'kaupunki on Watch Valley -alueen tärkein kellosepänteollisuuden keskus.\n\n'
      + 'Syy on maaperässä. Korkeus ja veden puute — kallioperä on huokoista '
      + 'hiekkakiveä — tekevät maasta huonoa viljelyyn, ja kaupunki jäi elämään '
      + 'kellojen valmistuksesta ja viennistä. Kaavoitus ja rakennukset noudattavat '
      + 'kellosepän työn vaatimaa järjestystä: asuintalot ja verstaat lomittuvat '
      + 'rinnakkaisiksi nauhoiksi.\n\n'
      + 'Vuoden 1794 tulipalo tuhosi osan kaupungista, ja se rakennettiin uudelleen '
      + 'ruudukkokaavan mukaan — ainutlaatuisesti Sveitsin kaupunkien joukossa. Vain '
      + 'itäisin osa säästyi palolta, ja siellä kadut ovat yhä kapeita ja mutkaisia. '
      + 'Kaupungissa syntyivät muun muassa arkkitehti Le Corbusier, kirjailija Blaise '
      + 'Cendrars ja autonrakentaja Louis Chevrolet. Vuonna 2009 La Chaux-de-Fonds ja '
      + 'sen sisarkaupunki Le Locle otettiin yhdessä maailmanperintöluetteloon.',
    lahde: 'en-Wikipedia "La Chaux-de-Fonds", johdanto-osa ja osio "UNESCO World '
      + 'Heritage Sites" (tarkistettu 2.9.2026).',
  },
  {
    id: 'gruyeres',
    nimi: 'Gruyères',
    tyyppi: 'ruoka',
    kysymykset: [
      'Mistä gruyère-juusto sai nimensä?',
      'Kuinka suuri osa pitäjän maasta on alppilaidunta?',
    ],
    korostukset: ['alppilaidun|alppilaidunta'],
    nappi: 'Kukkulakaupunki, joka nimesi juuston',
    // 7.0833 E / 46.5833 N — en-Wikipedia "Gruyères"
    laudat: {
      maailmankartta: { x: 6069.4, y: 1536 },
    },
    teksti: 'Gruyères on pikkukaupunki Gruyèren piirikunnassa Fribourgin kantonissa. '
      + 'Keskiaikainen kaupunki seisoo 82 metriä korkean kukkulan laella Saanen '
      + 'laakson ja Gruyèren järven yllä, ja se on antanut nimensä gruyère-juustolle.\n\n'
      + 'Kaupunki on 810 metrin korkeudessa, 4,5 kilometriä piirikunnan pääkaupungista '
      + 'Bullesta kaakkoon. Kukkula nousee yksinään Alppien pohjoispuolella, Moléson-vuoren '
      + 'juurella, siinä kohdassa jossa Saane jättää Fribourgin alpit.\n\n'
      + 'Pitäjän maasta 40,5 prosenttia on maatalouskäytössä ja puolet metsää. '
      + 'Maatalousmaasta vain 4,6 prosenttia on peltoa: 12,9 prosenttia on laidunta ja '
      + '22,9 prosenttia alppilaidunta. Juuri se suhde kertoo, mihin seudun elanto '
      + 'perustuu.',
    lahde: 'en-Wikipedia "Gruyères", johdanto-osa ja osio "Geography" '
      + '(tarkistettu 2.9.2026).',
  },
];
