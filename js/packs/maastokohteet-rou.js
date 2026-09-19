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
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/rou-nosto-negoiu-d84687ba.jpg',
        lyhyt: 'Negoiun huipun pylväs ja kyltti Fagarasvuorilla.',
        selite: 'Huipun kivipylvään kyltissä lukee Negoiu 2535, ja taustalla avautuvat vuoristolaaksot.',
        lahde: 'Valokuva: Krzysztof Dudzik-Górnicki, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'Krzysztof Dudzik-Górnicki',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gory_Fogaraskie_(Fagaras_Mountains)_59.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
      },
    ],
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
  },
];

