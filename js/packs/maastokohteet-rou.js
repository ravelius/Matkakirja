/*
 * MAASTOKOHTEET — ROU. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs ROU --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/ROU.json. Työkalu laskee laudan
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
 * Romanian maastokohteet — TÄYDENNYS. Maalla on jo fokuskohteet-rou.js, jossa on Moldoveanu; tässä ovat puuttuvat. Faktat en-Wikipediasta 29.8.2026.
 */
export const MAASTOKOHTEET_ROU = [
  {
    id: 'negoiu',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-negoiu-b0a2ec06.jpg',
      lyhyt: 'Negoiun terävä huippu Fagarasvuorilla.',
      selite: 'Tumma kallioinen huippu kohoaa vihreiden rinteiden ja lumilaikkujen yläpuolelle Fagarasvuoristossa.',
      lahde: 'Valokuva: Civilistul at English Wikipedia, Wikimedia Commons (public domain).',
      tekija: 'Civilistul at English Wikipedia',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Negoiu.jpg',
      lisenssi: 'Public domain',
      lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
    },
    nimi: 'Negoiu',
    tyyppi: 'vuori',
    kysymykset: [
      'Mikä Transfăgărășan on?',
      'Miksi Negoiuta sanotaan säänvaihtelun navaksi?',
    ],
    korostukset: ['Făgăraș|Făgărașin'],
    nappi: 'Romanian toiseksi korkein',
    // 24.5557 E / 45.587 N — en-Wikipedia "Negoiu"
    laudat: {
      maailmankartta: { x: 6651.9, y: 1577.5 },
      europe: { x: 682.7, y: 694.7 },
    },
    teksti: 'Ennen maailmansotien välistä aikaa Negoiuta pidettiin koko Karpaattien korkeimpana '
      + 'huippuna Tatroja lukuun ottamatta. Uudet mittaukset siirsivät sen toiseksi: 2 535 '
      + 'metriä, yhdeksän metriä matalampi kuin Moldoveanu. Romaniassa se tunnetaan yhä maan '
      + 'säänvaihtelun napana — sää kääntyy siellä nopeammin kuin missään muualla. Făgărașin '
      + 'vuoret sen ympärillä ovat Etelä-Karpaattien korkeimmat eikä niissä ole yhtään suurta '
      + 'asutusta; ainoa kunnollinen tie yli, Transfăgărășan, on auki vain kesä—syyskuussa. '
      + 'Negoiun lähellä harjannepolku muuttuu jyrkäksi ja avoimeksi, ja yhtä sen pahinta '
      + 'kohtaa kutsutaan nimellä Kolme askelta kuolemasta.',
    lahde: 'ro-Wikipedia "Vârful Negoiu, Munții Făgăraș" ja en-Wikipedia "Făgăraș Mountains", '
      + 'osiot "Geography" ja "Access and tourism" (tarkistettu 1.9.2026).',
  },
  {
    id: 'mustameri',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-mustameri-503342f9.jpg',
      lyhyt: 'Mustanmeren aallot iskeytyvät Constanţan kasinon rantapromenadin kiviin.',
      selite: 'Aallot murtuvat rantakiviin, ja vanha kasinorakennus kohoaa merenrantabulevardin päässä sinisen taivaan alla.',
      lahde: 'Valokuva: Julian Nyča, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Julian Nyča',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Constanta_Casino.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-mustameri-4d6d6856.jpg',
        lyhyt: 'Mustanmeren rannikko ja hiekkaranta Constanţassa ylhäältä katsottuna.',
        selite: 'Hiekkaranta ja aallonmurtajat kaartuvat sinisen meren äärellä, etualalla on puiden varjo.',
        lahde: 'Valokuva: Trecătorul răcit, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Trecătorul răcit',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Constanța_5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
    nimi: 'Mustameri',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Mustanmeren syvyys on hapeton?',
      'Mistä meri sai nimensä?',
    ],
    korostukset: ['valuma-alue|valuma-alue'],
    nappi: 'Meri, jonka valuma-alue on 24 maassa',
    // 29.8 E / 44.2 N — ulappa Constanțan edustalla; artikkelin oma keskipiste on 35 / 44
    laudat: {
      maailmankartta: { x: 6826.7, y: 1634.6 },
      europe: { x: 783.4, y: 731.1 },
    },
    teksti: 'Mustameri on Euroopan ja Aasian välinen reunameri Balkanin itäpuolella, Kaukasuksen '
      + 'länsipuolella ja Anatolian pohjoispuolella. Sen rannoilla on kuusi maata — Bulgaria, '
      + 'Georgia, Romania, Venäjä, Turkki ja Ukraina — mutta valuma-alue ulottuu 24 Euroopan '
      + 'maahan, koska meren suurimmat tulojoet ovat Tonava, Dnepr ja Dnestr.',
    lahde: 'en-Wikipedia "Black Sea", johdanto-osa (tarkistettu 29.8.2026).',
    visa: {
      kysymys: 'Kuinka moneen maahan Mustanmeren valuma-alue ulottuu?',
      vaihtoehdot: [
        '24 maahan',
        '6 maahan',
        '10 maahan',
        '3 maahan',
      ],
      oikea: 0,
      fakta: 'Mustanmeren suurimmat tulojoet ovat Tonava, Dnepr ja Dnestr.',
    },
  },
  {
    id: 'tonava',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-tonava-b3d2d724.jpg',
      lyhyt: 'Tonavan suiston vesiväylä syksyn värittämien pajujen välissä.',
      selite: 'Kapea vesiväylä kulkee keltaisenruskeiden puiden ja kaislojen keskellä Tonavan suistossa.',
      lahde: 'Valokuva: Raff, Wikimedia Commons (CC BY 2.0).',
      tekija: 'Raff',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Danube_Delta,_autumn.jpg',
      lisenssi: 'CC BY 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-tonava-06c68dcb.jpg',
        lyhyt: 'Aurinko laskee Tonavan suiston tyynen vesialueen taakse.',
        selite: 'Iltataivas heijastuu rauhallisesta vedestä, ja puiden siluetit reunustavat rantaa Tonavan suistossa.',
        lahde: 'Valokuva: Pyretus, Wikimedia Commons (public domain).',
        tekija: 'Pyretus',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Danube_Delta_oct_2006_120.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Tonava',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Tonavan suisto on?',
      'Kuinka monen pääkaupungin läpi Tonava virtaa?',
    ],
    korostukset: ['Rooman valtakunta|Rooman valtakunnan'],
    nappi: 'Euroopan toiseksi pisin joki',
    // 25.97 E / 43.9 N — Giurgiun kohta Romanian ja Bulgarian rajalla; artikkelin koordinaatti 29,761 / 45,218 on suistossa, liian lähellä Mustanmeren merkkiä
    laudat: {
      maailmankartta: { x: 6699, y: 1646.9 },
      europe: { x: 709.8, y: 739 },
    },
    teksti: 'Tonava on Volgan jälkeen Euroopan toiseksi pisin joki: 2 850 kilometriä Saksan '
      + 'Schwarzwaldista Romanian suiston kautta Mustallemerelle. Se yhdistää nykyisin kymmenen '
      + 'Euroopan maata ja oli aikoinaan Rooman valtakunnan rajajoki. Romaniassa se muodostaa '
      + 'pitkän pätkän Bulgarian vastaista rajaa ja päättyy suistoon, joka on koko matkan '
      + 'viimeinen ja laajin osa.',
    lahde: 'en-Wikipedia "Danube", johdanto-osa (tarkistettu 29.8.2026).',
    visa: {
      kysymys: 'Mistä Tonava saa alkunsa?',
      vaihtoehdot: [
        'Ranskan Alpeilta',
        'Saksan Schwarzwaldista',
        'Sveitsin Juralta',
        'Itävallan metsästä',
      ],
      oikea: 1,
      fakta: 'Joki virtaa 2 850 kilometriä Saksasta Mustallemerelle.',
    },
  },
  /* ================================================================
   * SISÄLTÖKIRJURI NOSTOT KIERROS 2 ERÄ A, 30.9.2026 — 9 KOHDETTA.
   * ============================================================== */
  {
    id: 'oradean-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-oradean-linnoitus-4086a6f7.jpg',
      lyhyt: 'Tiilinen bastioni ja muuri ruohoisen vallihaudan reunalla.',
      selite: 'Linnoituksen tiilinen kulmabastioni ja sen viereinen muuri, jonka ampuma-aukoista työntyy tykinpiippuja.',
      lahde: 'Valokuva: Szilas, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Szilas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:2025-05-04_Fortress_of_Oradea_05.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    nimi: 'Oradean linnoitus',
    nimio: 'Oradea',
    tyyppi: 'historia',
    kysymykset: [
      'Minä vuonna linnan tiedetään mainitun ensimmäisen kerran?',
      'Kuinka monta päivää ottomaanien piiritys kesti vuonna 1660?',
    ],
    korostukset: ['viisikulmainen|viisikulmainen'],
    nappi: 'Piiritys, joka kesti 46 päivää',
    // 21.9429 E / 47.0516 N — en-Wikipedia "Oradea", osiot "History" ja "Tourist attractions"; "History of Oradea"
    laudat: {
      maailmankartta: { x: 6564.8, y: 1516.3 },
    },
    teksti: 'Oradean linnoitus on viisikulmainen linnoitus Oradean kaupungin sisällä, ja sen '
      + 'alkuperä ulottuu 1000-luvun piispanresidenssiin. Linna mainitaan lähteissä '
      + 'ensimmäisen kerran vuonna 1241 mongolien hyökkäyksen aikana. Vuonna 1660 noin 850 '
      + 'puolustajaa piti kaupunkia ottomaanien piirityksessä 46 päivää, kunnes se antautui '
      + '27. elokuuta. Habsburgit valtasivat kaupungin vuonna 1692, ja linnoituksen '
      + 'sotilaskäyttö päättyi 1792. Nykyisin sen tiloissa toimii kaupunginmuseo.',
    lahde: 'en-Wikipedia "Oradea", osiot "History" ja "Tourist attractions"; "History of Oradea" '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'targu-jiun-brancusi-kokonaisuus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-targu-jiun-brancusi-kokonaisuus-f5a2d8af.jpg',
      lyhyt: 'Päättymätön pylväs nousee nurmikkoisen puiston yllä.',
      selite: 'Kultaisenruskea Päättymätön pylväs kohoaa laajan nurmialueen takaa.',
      lahde: 'Valokuva: Korinna, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Korinna',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Parcul_coloanei_infinitului.jpg',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    nimi: 'Târgu Jiun Brâncuși-kokonaisuus',
    nimio: 'Târgu Jiu',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka tilasi muistomerkkisarjan Brâncușilta?',
      'Kuinka korkea Päättymätön pylväs on?',
    ],
    korostukset: ['Päättymätön pylväs|Päättymätön pylväs'],
    nappi: 'Pylväs, portti ja pöytä puistossa',
    // 23.2687 E / 45.0394 N — en-Wikipedia "Sculptural Ensemble of Constantin Brâncuși at Târgu Jiu", osiot "History", "The Endless Column" ja "Ensemble"
    laudat: {
      maailmankartta: { x: 6609, y: 1600.2 },
    },
    teksti: 'Târgu Jiun Brâncuși-kokonaisuus on kuvanveistäjä Constantin Brâncușin vuosina '
      + '1937–1938 tekemä muistomerkkisarja niille sotilaille, jotka puolustivat kaupunkia '
      + 'ensimmäisessä maailmansodassa. Tilauksen teki Gorjin naisten kansallisliitto. Kolme '
      + 'teosta, Pöytä hiljaisuudelle, Suudelman portti ja Päättymätön pylväs, sijaitsee noin '
      + '1,3 kilometrin pituisella länsi–itä-akselilla kahdessa puistossa. Pylväs on 29,3 '
      + 'metriä korkea, ja pöytää ympäröi kaksitoista tiimalasin muotoista istuinta.',
    lahde: 'en-Wikipedia "Sculptural Ensemble of Constantin Brâncuși at Târgu Jiu", osiot '
      + '"History", "The Endless Column" ja "Ensemble" (tarkistettu 30.9.2026).',
  },
  {
    id: 'tismanan-luostari',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-tismanan-luostari-05bcc161.jpg',
      lyhyt: 'Luostarikirkon kupoli ja seinät täynnä värikkäitä freskoja.',
      selite: 'Kirkon sisäkatto, jonka kupolissa ja holveissa on tiheästi maalattuja freskoja.',
      lahde: 'Valokuva: Valyemil81, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Valyemil81',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biserica_%E2%80%9EAdormirea_Maicii_Domnului%E2%80%9D,_M%C4%83n%C4%83stirea_Tismana.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Tismanan luostari',
    nimio: 'Tismana',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Kuka perusti Tismanan luostarin?',
      'Kuinka monta vuotta Ierusalima Gligor johti yhteisöä?',
    ],
    korostukset: ['Valakian vanhimpia luostareita|Valakian vanhimpia luostareita'],
    nappi: 'Vuoren kupeessa toimiva luostari',
    // 22.927 E / 45.0806 N — en-Wikipedia "Nicodemus of Tismana", "Tismana" ja "Ierusalima Gligor"
    laudat: {
      maailmankartta: { x: 6597.6, y: 1598.5 },
    },
    teksti: 'Tismanan luostari sijaitsee Gorjin läänissä Oltenian alueella, ja sitä pidetään '
      + 'yhtenä Valakian vanhimpia luostareita. Sen perusti 1300-luvulla munkki Nikodim '
      + 'Tismanalainen (noin 1320–1406), joka toi seudulle hesykastisen luostarielämän, ja '
      + 'luostari on omistettu Neitsyt Marialle. Luostarin tukijoihin kuuluivat useat '
      + 'hallitsijat, muun muassa Mircea I ja Radu I. Kommunismin aikana abbedissa Ierusalima '
      + 'Gligor johti yhteisöä 51 vuotta; liturgia vietiin koko ajan, ja nunnat pitivät '
      + 'maatilaa ja mattopajaa. Romanian ortodoksinen kirkko julisti Nikodimin pyhimykseksi '
      + 'vuonna 1955.',
    lahde: 'en-Wikipedia "Nicodemus of Tismana", "Tismana" ja "Ierusalima Gligor" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'ipotestin-muistomuseo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-ipotestin-muistomuseo-d5be1f20.jpg',
      lyhyt: 'Valkoinen maalaistalo puiden varjossa kivipihan takana.',
      selite: 'Matala valkoinen talo, jossa on katettu kuisti ja tumma katto. Talon edessä on kivilaatoitettu piha.',
      lahde: 'Valokuva: Curcan ionel, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Curcan ionel',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Casa_Memorial%C4%83_Mihai_Eminescu_din_Ipote%C8%99ti,_foto_Ionel_Curcan_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Ipoteștin muistomuseo',
    nimio: 'Ipotești',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Missä Mihai Eminescu vietti lapsuutensa?',
      'Missä runoilijan syntymäpaikasta on kiistelty?',
    ],
    korostukset: ['Mihai Eminescu|Mihai Eminescu'],
    nappi: 'Runoilijan lapsuudenkoti maaseudulla',
    // 26.55 E / 47.767 N — en-Wikipedia "Mihai Eminescu" ja "Mihai Eminescu, Botoșani", osio "Early life"
    laudat: {
      maailmankartta: { x: 6718.3, y: 1486.1 },
    },
    teksti: 'Ipotești on Botoșanin läänin kylä, jossa runoilija Mihai Eminescu (1850–1889) vietti '
      + 'varhaislapsuuttaan vanhempiensa kotona. Hänen isänsä Gheorghe Eminovici asettui '
      + 'Moldovaan Botoșanin lähelle. Runoilijan sisar väitti myöhemmin, että Eminescu syntyi '
      + 'nimenomaan Ipoteștissa, vaikka virallisten tietojen mukaan syntymäpaikka on '
      + 'Botoșani. Kylän muistotalo toimii museona, ja siellä on myös Eminescu-tutkimuksen '
      + 'kansallinen keskus.',
    lahde: 'en-Wikipedia "Mihai Eminescu" ja "Mihai Eminescu, Botoșani", osio "Early life" '
      + '(tarkistettu 30.9.2026).',
  },
  {
    id: 'timisoaran-vanhakaupunki',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-timisoaran-vanhakaupunki-06be751d.jpg',
      lyhyt: 'Piața Victoriei ylhäältä, aukion päässä katedraali.',
      selite: 'Ilmakuva puistomaisesta Piața Victoriei -aukiosta, jota reunustavat koristeelliset kerrostalot. Aukion päässä kohoaa tiilinen katedraali.',
      lahde: 'Valokuva: Marius Catalin Boldeanu, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Marius Catalin Boldeanu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pia%C8%9Ba_Victoriei_Timi%C8%99oara.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Timișoaran vanhakaupunki ja Piața Victoriei',
    nimio: 'Timișoara',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Minä vuonna Timișoarassa otettiin käyttöön sähköinen katuvalaistus?',
      'Mikä rakennus kohoaa Piața Victoriei -aukion päässä?',
    ],
    korostukset: ['sähköinen katuvalaistus (1884)|sähköinen katuvalaistus (1884)'],
    nappi: 'Sähkövalot ja katedraali aukion päässä',
    // 21.23 E / 45.7597 N — en-Wikipedia "Timișoara", osiot johdanto, "History" ja "Geography"
    laudat: {
      maailmankartta: { x: 6541, y: 1570.4 },
    },
    teksti: 'Timișoara on Romanian viidenneksi väkirikkain kaupunki, ja vuoden 2021 '
      + 'väestönlaskennassa siellä oli 250 849 asukasta. Kaupunki kuuluu Euroopan ensimmäisiä '
      + 'kaupunkeja, joissa oli sähköinen katuvalaistus (1884). Sen keskustassa Piața '
      + 'Victoriei -aukion päässä kohoaa ortodoksinen metropoliittakatedraali, ja aukio '
      + 'tunnettiin aiemmin kuningas Ferdinandin bulevardina. Joulukuussa 1989 Timișoarassa '
      + 'alkoivat joukkomielenosoitukset, jotka johtivat Romanian vallankumoukseen.',
    lahde: 'en-Wikipedia "Timișoara", osiot johdanto, "History" ja "Geography" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'porolissum',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-porolissum-21541141.jpg',
      lyhyt: 'Rekonstruoitu kivinen porttirakennus Porolissumin linnakkeella.',
      selite: 'Kuvassa on kaksitorninen kivinen porttirakennus ruohoisella rinteellä ja sen vieressä kiviaita.',
      lahde: 'Valokuva: Daria Raducanu, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Daria Raducanu',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Castrul_roman_Porolissum.jpg',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    nimi: 'Porolissum',
    nimio: 'Porolissum',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka perusti Porolissumin ja milloin?',
      'Kuinka monta katsojaa amfiteatteriin mahtui?',
    ],
    korostukset: ['amfiteatteriin|amfiteatteriin'],
    nappi: 'Rooman rajalinnoitus Dacian pohjoisrajalla',
    // 23.1573 E / 47.1793 N — en-Wikipedia "Porolissum", osiot "History" ja "Structure and layout"
    laudat: {
      maailmankartta: { x: 6605.2, y: 1511 },
    },
    teksti: 'Porolissum on Rooman Dacian pohjoisrajalla sijainnut linnoitus- ja kaupunkialue '
      + 'Sălajin läänissä, noin kahdeksan kilometrin päässä Zalăusta. Trajanus perusti paikan '
      + 'vuonna 106 toisen Dacian sodan aikana, ja Hadrianus teki siitä vuonna 124 Dacia '
      + 'Porolissensis -provinssin pääkaupungin. Alue toimi myös tulliasemana kauppareitillä '
      + 'Tonavalta barbaarien maille. Pomet-kukkulan leiri oli 226 × 294 metrin kokoinen, ja '
      + 'amfiteatteriin mahtui 5000–5500 katsojaa; se rakennettiin ensin puusta ja uusittiin '
      + 'kivestä vuonna 157. Raunioalue on osin rekonstruoitu, ja kaivauksia on tehty '
      + 'vuodesta 2009.',
    lahde: 'en-Wikipedia "Porolissum", osiot "History" ja "Structure and layout" (tarkistettu '
      + '30.9.2026).',
  },
  {
    id: 'carein-linna',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-carein-linna-8c09cff6.jpg',
      lyhyt: 'Károlyin linnan uusgoottilaista julkisivua sisäpihalla.',
      selite: 'Kuvassa on vaalea, uusgoottilainen julkisivu, jossa on kolme korkeaa suippokaari-ikkunaa ja koristeellinen huippukoriste.',
      lahde: 'Valokuva: Ghișa Ștefania-Maria, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Ghișa Ștefania-Maria',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ansamblul_castelului_K%C3%A1roly,_exterior.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    nimi: 'Carein Károlyin linna',
    nimio: 'Carein linna',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka suunnitteli linnan nykyisen uusgoottilaisen ilmeen?',
      'Mitä linnassa on nykyään?',
    ],
    korostukset: ['arboretum|arboretum'],
    nappi: 'Seitsemän tornin ritarilinna puiston keskellä',
    // 22.4672 E / 47.6839 N — en-Wikipedia "Károlyi Castle (Carei)"
    laudat: {
      maailmankartta: { x: 6582.2, y: 1489.6 },
    },
    teksti: 'Károlyin linna sijaitsee Careissa Satu Maren piirikunnassa. László Károlyi Lancz '
      + 'aloitti paikalla linnoituksen rakentamisen vuonna 1482, ja nykyisen ilmeensä '
      + 'rakennus sai vuosina 1893–1896 saksilaisen arkkitehti Arthur Meinigin suunnitelmien '
      + 'mukaan uusgoottilaisena, vallihaudan ympäröimänä seitsemän tornin ritarilinnana. '
      + 'Linnaa ympäröi 12 hehtaarin arboretum, jonka vanhin puu on vuonna 1810 istutettu '
      + 'plataani. Nykyään rakennuksessa toimivat kaupunginmuseo, näyttelysali, kirjasto ja '
      + 'kulttuurikeskus.',
    lahde: 'en-Wikipedia "Károlyi Castle (Carei)" (tarkistettu 30.9.2026).',
  },
  {
    id: 'aradin-linnoitus',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-aradin-linnoitus-5f769fc4.jpg',
      lyhyt: 'Linnoituksen sisällä oleva fransiskaanikirkko kahdella tornilla.',
      selite: 'Kuvassa on linnoituksen alueella seisova fransiskaanikirkko, jonka kahdesta tornista toisen katolla kasvaa puita.',
      lahde: 'Valokuva: Vasile Topac, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Vasile Topac',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biserica_franciscana_din_cetatea_Aradului.jpg',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    nimi: 'Aradin linnoitus',
    nimio: 'Aradin linnake',
    tyyppi: 'historia',
    kysymykset: [
      'Minkä muotoinen Aradin linnoitus on?',
      'Milloin linnoitus rakennettiin?',
    ],
    korostukset: ['kuusi bastionia|kuusi bastionia'],
    nappi: 'Tähtilinnoitus Mureșin rannalla',
    // 21.3319 E / 46.1711 N — en-Wikipedia "Fortress of Arad"
    laudat: {
      maailmankartta: { x: 6544.4, y: 1553.2 },
    },
    teksti: 'Aradin linnoitus on Mureș-joen vasemmalla rannalla sijaitseva Vauban-tyylinen '
      + 'bastionilinnoitus. Se rakennettiin vuosina 1763–1783, ja sen suunnitteli '
      + 'sotilasarkkitehti Ferdinand Philipp von Harsch. Kuusikärkisen tähden muotoisessa '
      + 'linnoituksessa on kuusi bastionia ja 296 tykkiaukkoa, ja sen muurien ympärysmitta on '
      + '3180 metriä. Kasarmeihin mahtui tavallisesti 2940 sotilasta, enimmillään 4030. '
      + 'Linnoituksessa teloitettiin 6. lokakuuta 1849 kolmetoista unkarilaista kenraalia. '
      + 'Nykyään alue on Romanian maavoimien käytössä.',
    lahde: 'en-Wikipedia "Fortress of Arad" (tarkistettu 30.9.2026).',
  },
  {
    id: 'bistritan-evankelinen-kirkko',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260930/rou-nosto-bistritan-evankelinen-kirkko-ab1065e3.jpg',
      lyhyt: 'Evankelisen kirkon torni ja valkoinen päätyjulkisivu.',
      selite: 'Kuvassa on korkea kellotorni, jonka yläosassa on kello ja teräväkärkinen huippu, sekä valkoinen porrastettu päätyjulkisivu.',
      lahde: 'Valokuva: Cătălin Vârgă, Wikimedia Commons (CC BY-SA 3.0 ro).',
      tekija: 'Cătălin Vârgă',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Biserica_Evanghelic%C4%83_din_Bistri%C8%9Ba.jpg',
      lisenssi: 'CC BY-SA 3.0 ro',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/ro/deed.en',
    },
    nimi: 'Bistrițan evankelinen kirkko',
    nimio: 'Bistrița',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Ketkä rakensivat Bistrițan evankelisen kirkon?',
      'Mikä sytytti kirkon tornin tuleen vuonna 2008?',
    ],
    korostukset: ['2008|2008'],
    nappi: 'Keskusaukion kirkko, joka selvisi tulipalosta',
    // 24.4958 E / 47.1323 N — en-Wikipedia "Bistrița", osiot "Main sights" ja "Recent events"
    laudat: {
      maailmankartta: { x: 6649.9, y: 1512.9 },
    },
    teksti: 'Bistrițan evankelinen kirkko on kaupungin keskusaukion päänähtävyys '
      + 'Bistrița-Năsăudin piirikunnassa. Transilvanian saksalaiset rakensivat sen alun perin '
      + '1300-luvulla goottilaiseen tyyliin, ja vuosina 1559–1563 Petrus Italus antoi '
      + 'kirkolle renessanssipiirteitä. Kesäkuun 11. päivänä 2008 kolme kuparia varastamaan '
      + 'mennyttä lasta sytytti leikkiessään tornin ja katon tuleen. Pääkirkkotilan vauriot '
      + 'jäivät vähäisiksi ja sisätilat säilyivät. Kirkko on sittemmin korjattu mittavasti.',
    lahde: 'en-Wikipedia "Bistrița", osiot "Main sights" ja "Recent events" (tarkistettu '
      + '30.9.2026).',
  },
];

