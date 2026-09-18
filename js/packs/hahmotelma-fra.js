/*
 * RANSKAN HAHMOTELMAPISTEET — ensimmäinen kierros, pelkät pisteet.
 *
 * === OMISTAJAN PÄÄTÖS (Raamattu, KARTTAUUDISTUKSEN PAATOKSET 33) ====
 *
 * Sanatarkasti: *"Miksi Ranskassa kaikki pisteet ovat niin lahella
 * Pariisi … nostoja siis saisi mielellaan olla ympäri Ranskaa, vuoret,
 * linnat, alueet, muut merkittavat kohteet. Voi aluksi vaikka vain
 * hahmotella ne pisteet ja lisata pelkat pisteet kartalle ja tehda
 * niille vain otsikko pop-upit. Lisataan sisalto sitten sen jälkeen,
 * kun on saatu oikea määrä nostoja kartalle, jotta se nayttaa
 * tasapainoiselta."*
 *
 * TARKENNUS (sama päätös, kortit): ensimmäinen kierros NOIN 40 nostoa
 * koko Ranskassa nykyiset mukaan lukien; Fable valitsee kohteet ja
 * kirjoittaa otsikot vuoden 1873 näkökulmasta, tämä erä lisää pisteet
 * ja otsikko-pop-upit, sisältötekstit tulevat myöhemmin.
 *
 * === MITÄ TÄMÄ TIEDOSTO ON JA MITÄ SE EI OLE =======================
 *
 * Jokaisella rivillä on VAIN otsikko (`nimi`) ja yhden rivin alaotsikko
 * (`nappi`). Kortin leipätekstinä on sama alaotsikko ja rivi "Sisältö
 * tulossa." — ei tyhjää tekstiä, ei keksittyjä faktoja. EI KUVIA, EI
 * VISOJA, EI PULU-KYSYMYKSIÄ: ne kuuluvat toiseen erään, kun määrä ja
 * sijoittelu on hyväksytty. Lippu `hahmotelma: true` merkitsee rivin,
 * jonka sisältö on vielä kirjoittamatta, jotta seuraava erä löytää ne
 * yhdellä haulla.
 *
 * === MIKSI TÄMÄ REITTI (KOHDE_MAAT) ================================
 *
 * Nämä ovat kaikki AIDOSTI kaupungin ulkopuolella, ja PAATOKSET 34
 * kohta 4 sanoo juuri niiden jäävän kartalle omina pisteinään poltetun
 * merkin kokoisina. Sama reitti kuin maastokohteilla ja kuratoiduilla
 * kohteilla (js/fokuskohteet.js KOHDE_MAAT): pallolauta lukee merkit
 * sieltä, joten koko, ladonta ja ankkurit tulevat olemassa olevasta
 * nostomekanismista eikä tässä erässä ole koskettu
 * js/pallolauta/nostot.js:ään lainkaan.
 *
 * `lahi: true` on sama lähizoomiportti kuin maalehtinostoilla
 * (js/packs/maalehtinostot-fra.js, js/pallolauta/nostot.js
 * PAAKARTAN_MERKKIKATTO): saapumisnäkymässä pääkartan 21 merkin katto
 * pysyy, ja kohdemaassa portti päästää nämä esiin. Ilman lippua
 * uudet merkit olisivat työntäneet vanhoja katon yli.
 *
 * === KOORDINAATIT ==================================================
 *
 * Jokaisen asteet on haettu en-Wikipedian rajapinnasta
 * (`action=query&prop=coordinates`) — ensimmäiset viisitoista
 * 17.9.2026, varaston kaksitoista 18.9.2026 — ja artikkelin nimi on
 * kirjattu rivin viereen. Laudan luvut on laskettu pelin omalla
 * kaavalla (tools/johda-maastokohteet.mjs `laudat`, sama Millerin
 * lieriö ja europe-tasaväli kuin maastokohteilla). Yhtäkään lukua ei
 * ole arvattu eikä luettu kartalta silmällä. Jokainen rivi osuu
 * Ranskan fokuslehden rajaukseen (`osuuLehteen`) eikä yksikään ole
 * minkään Ranskan kaupungin sisäpuolella
 * (js/pallolauta/kaupunkiliuska.js `onKaupunginSisainen`) — yksikään
 * ei siis valu kaupunkikartalle eikä kaupungin liuskaan.
 *
 * === MITÄ JÄI POIS ================================================
 *
 * Fablen kohdelistalla oli 32 nimeä. Viisi oli jo kartalla samalla
 * paikalla (Mont Blanc, Carcassonne, Avignonin paavinpalatsi,
 * Pont du Gard, Carnac — js/packs/maastokohteet-fra.js), eikä yhtäkään
 * toisteta tässä. Loput 27 ovat nyt kaikki tässä pakassa: ensimmäinen
 * erä 17.9.2026 otti viisitoista (peruste oli tyhjä alue kartalla —
 * Korsika, Burgundi, Pohjois-Ranska, Pyreneet ja Bretagne olivat
 * tyhjimmät) ja jätti kaksitoista varastoon raporttiin
 * docs/raportit/viesti-fable-ranska-hahmotelma-20260917.md; toinen erä
 * 18.9.2026 lisäsi nekin, jolloin Ranskan kaupungin ulkopuolisia
 * nostoja on 55 (17 maastokohdetta + 11 maalehtinostoa + 27 tässä).
 */

/** Kortin leipäteksti hahmotelmavaiheessa: alaotsikko + lupaus. */
const runko = (alaotsikko) => `${alaotsikko}. Sisältö tulossa.`;

/**
 * Lähderivi: koordinaatin alkuperä, ei sisällön. Hakupäivä on
 * parametri, koska pakka on kertynyt kahdessa erässä (ensimmäiset
 * viisitoista 17.9.2026, varaston kaksitoista 18.9.2026) eikä yhtään
 * lukua saa merkitä väärän ajon nimiin.
 */
const koordinaatinLahde = (artikkeli, haettu = '17.9.2026') => `en-Wikipedia "${artikkeli}", `
  + `prop=coordinates (haettu ${haettu}). Hahmotelmapiste: kortilla on `
  + 'toistaiseksi vain otsikko ja alaotsikko.';

/** Ranskan hahmotelmapisteet — otsikko-pop-up, ei sisältöä. */
export const HAHMOTELMA_FRA = [
  {
    id: 'hahmotelma-pic-du-midi',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-pic-du-midi-vuori-85944887.jpg',
      lyhyt: 'Observatorion kupolit Pic du Midin huipulla pilvien yläpuolella.',
      selite: 'Pic du Midin laki: observatorion kupolit ja terassit kiinni kalliossa, pilvet ja Pyreneiden harjat alapuolella.',
      lahde: 'Valokuva: Benh LIEU SONG, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Benh LIEU SONG',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pic_du_Midi_de_Bigorre.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-pic-du-midi-1878-5dd1557d.jpg',
        lyhyt: 'Kaiverrus observatorion peruskiven laskemisesta huipulla vuonna 1878.',
        selite: 'Kaiverrus vuodelta 1878: Ramond-seuran väki laskee Pic du Midin observatorion peruskiveä vuoren laella.',
        lahde: 'Kuva: tekijä tuntematon, Wikimedia Commons (public domain).',
        tekija: 'Tekijä tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pic_du_Midi_de_Bigorre_observatory_1879.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-pic-du-midi-observatorio-f3812f4d.jpg',
        lyhyt: 'Observatorion kaukoputkikupoli lähikuvassa vuoren laella.',
        selite: 'Pic du Midin observatorion kaukoputkikupoli betonitornin päällä, taustalla Pyreneiden harjanteita.',
        lahde: 'Valokuva: Le Commissaire, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Le Commissaire',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Observatoire_du_Pic_du_Midi.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Pic du Midi de Bigorre',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi tähtitorni rakennettiin juuri tälle huipulle?',
      'Mitä huipulla mitataan säästä?',
    ],
    nappi: 'Pyreneiden huippu, jonne rakennetaan observatoriota',
    // 0,14277778 E / 42,93638889 N — en-Wikipedia "Pic du Midi de Bigorre"
    laudat: {
      maailmankartta: { x: 5838.1, y: 1685.9 },
      europe: { x: 213.9, y: 764.4 },
    },
    teksti: 'Pic du Midi de Bigorre eli lyhyesti Pic du Midi on 2 877 metriä korkea vuori '
      + 'Ranskan Pyreneillä Hautes-Pyrénées\'n departementissa. Sen huipulla on Pic du Midin '
      + 'observatorio, jossa tehdään sekä tähtitieteellisiä että säähavaintoja. Samalla '
      + 'huipulla seisoo myös televiestintämasto.',
    lahde: 'en-Wikipedia "Pic du Midi de Bigorre" ja fr-Wikipedia "Pic du Midi de Bigorre", '
      + 'johdanto-osat (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-lourdes',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-lourdes-luola-875fe06a.jpg',
      lyhyt: 'Massabiellen luola Lourdesissa, jonne pyhiinvaeltajat kokoontuvat.',
      selite: 'Massabiellen luola Lourdesissa: kallioseinämä, jonka koloon on asetettu Neitsyt Marian patsas.',
      lahde: 'Valokuva: Emmanuel Brunner (Manu25), Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Emmanuel Brunner (Manu25)',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grotte_Massabielle.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-lourdes-kaiverrus-aa3a306c.jpg',
        lyhyt: '1800-luvun kaiverrus Lourdesin luolasta joen rannalla.',
        selite: 'Charles Mercereaun kaiverrus Lourdesin luolasta: kallio, joki ja yksinäinen kulkija rantakivillä.',
        lahde: 'Kuva: Charles Mercereau (1822–1864), Wikimedia Commons (public domain).',
        tekija: 'Charles Mercereau',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grotte_miraculeuse_%C3%A0_Lourdes_Charles_Mercereau.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Lourdes',
    tyyppi: 'historia',
    lahi: true,
    kysymykset: [
      'Kuka Bernadette Soubirous oli?',
      'Miten pienestä kaupungista tuli pyhiinvaelluskohde?',
    ],
    nappi: 'Luola, jonne pyhiinvaeltajat virtaavat',
    // -0,04694444 E / 43,09416667 N — en-Wikipedia "Lourdes"
    laudat: {
      maailmankartta: { x: 5831.8, y: 1679.6 },
      europe: { x: 210.3, y: 760.2 },
    },
    teksti: 'Lourdes on markkinakaupunki Pyreneillä Hautes-Pyrénées\'n departementissa '
      + 'Lounais-Ranskassa. Ennen 1800-luvun puoliväliä se tunnettiin lähinnä keskellä '
      + 'kaupunkia kohoavasta kalliolinnastaan. Vuonna 1858 talonpoikaistyttö Bernadette '
      + 'Soubirous kertoi Marian ilmestyksistä, ja kaupungista ja sen Lourdesin Neitsyt '
      + 'Marian pyhäköstä tuli pian yksi maailman tärkeimmistä pyhiinvaelluskohteista. '
      + 'Kaupungin keskusta on noin 410 metrin korkeudella merenpinnasta.',
    lahde: 'en-Wikipedia "Lourdes" ja fi-Wikipedia "Lourdes", johdanto-osat '
      + '(tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-canigou',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-canigou-garces-0788be3c.jpg',
      lyhyt: 'Lumipeitteinen Canigón massiivi Pic de Garcesilta katsottuna.',
      selite: 'Canigón massiivi talvella Pic de Garcesilta Céretin yläpuolelta: lumihuiput kohoavat metsäisten laaksojen takaa.',
      lahde: 'Valokuva: Fabricio Cardenas, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Fabricio Cardenas',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:20210111_-_Canigou_depuis_Pic_de_Garces.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-canigou-huippu-03b4c489.jpg',
        lyhyt: 'Canigón huippu ja kivinen harjanne, jota pitkin nousu käy.',
        selite: 'Canigón huippu kesällä: kivinen harjanne, jota pitkin kulkijat nousevat laelle.',
        lahde: 'Valokuva: Jordi Gili, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Jordi Gili',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pic_del_Canig%C3%B3_05.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    nimi: 'Canigou',
    tyyppi: 'vuori',
    lahi: true,
    kysymykset: [
      'Miksi vuorta luultiin Pyreneiden korkeimmaksi?',
      'Mitä vuori merkitsee katalaaneille?',
    ],
    nappi: 'Katalonian pyhä vuori',
    // 2,45666667 E / 42,51888889 N — en-Wikipedia "Canigó"
    // (haku "Canigou" ohjautuu tähän artikkeliin)
    laudat: {
      maailmankartta: { x: 5915.2, y: 1702.8 },
      europe: { x: 258.4, y: 775.4 },
    },
    teksti: 'Canigó eli ranskaksi Canigou on 2 784 metriä korkea vuori Etelä-Ranskan '
      + 'Pyreneillä, alle 50 kilometrin päässä merestä. Jyrkkien rinteidensä ja '
      + 'rannikonläheisen sijaintinsa takia sitä pidettiin 1700-luvulle asti Pyreneiden '
      + 'korkeimpana vuorena. Vuori on Pohjois-Kataloniassa ja näkyy Etelä-Kataloniaan asti, '
      + 'ja katalaaneille sillä on historiallinen vertauskuvallinen merkitys.',
    lahde: 'en-Wikipedia "Canigó", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-verdon',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-verdon-sainte-croix-aa347532.jpg',
      lyhyt: 'Verdonin kanjonin suu ja turkoosi vesi Sainte-Croix-järven puolelta.',
      selite: 'Verdonin kanjonin suu Galetas\'n sillalta nähtynä: turkoosi vesi virtaa kalkkikiviseinien välistä Sainte-Croix-järveen.',
      lahde: 'Valokuva: Benh LIEU SONG, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Benh LIEU SONG',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gorges_Verdon_Barrage_Sainte_Croix.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-verdon-trescaire-57009376.jpg',
        lyhyt: 'Kanjonin seinämät Trescairen näköalapaikalta katsottuna.',
        selite: 'Verdonin kanjoni Trescairen näköalapaikalta: satojen metrien kalkkikiviseinämät laskeutuvat joen uomaan.',
        lahde: 'Valokuva: Benh LIEU SONG, Wikimedia Commons (CC BY 2.5).',
        tekija: 'Benh LIEU SONG',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Verdon_Trescaire.jpg',
        lisenssi: 'CC BY 2.5',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.5/',
      },
    ],
    nimi: 'Gorges du Verdon',
    tyyppi: 'joki',
    lahi: true,
    kysymykset: [
      'Miten joki jaksoi leikata näin syvän rotkon?',
      'Mistä veden turkoosi väri tulee?',
    ],
    nappi: 'Euroopan syvin kanjoni',
    // 6,36388889 E / 43,73777778 N — en-Wikipedia "Verdon Gorge"
    laudat: {
      maailmankartta: { x: 6045.5, y: 1653.5 },
      europe: { x: 333.4, y: 743.3 },
    },
    teksti: 'Gorges du Verdon on jokikanjoni Provence-Alpes-Côte d\'Azurin alueella '
      + 'Kaakkois-Ranskassa. Se on noin 25 kilometriä pitkä ja enimmillään 700 metriä syvä. '
      + 'Rotkon on uurtanut Verdon-joki, joka on saanut nimensä turkoosinvihreästä '
      + 'väristään. Castellanen ja Moustiers-Sainte-Marien välillä joki on leikannut '
      + 'kalkkikivimassiiviin 700 metrin syvyisen uran, ja kanjonin päässä se laskee '
      + 'tekojärveen Lac de Sainte-Croixiin.',
    lahde: 'en-Wikipedia "Verdon Gorge", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-chenonceau',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-chenonceau-ita-a3123d4b.jpg',
      lyhyt: 'Chenonceaun linnan galleria kaartuu holvikaarilla Cher-joen yli.',
      selite: 'Chenonceaun linna idästä: gallerian siipi lepää holvikaarilla keskellä Cher-jokea.',
      lahde: 'Valokuva: Gzen92, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Gzen92',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ch%C3%A2teau_de_Chenonceau_-_est_(Chenonceaux)_(1).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-chenonceau-mieusement-b900bba0.jpg',
        lyhyt: '1800-luvun valokuva Chenonceaun linnasta jokitorneineen.',
        selite: 'Séraphin-Médéric Mieusement\'n 1800-luvun valokuva Chenonceausta: linnan torninkulmat ja sillan kaaret joen päällä.',
        lahde: 'Valokuva: Séraphin-Médéric Mieusement, Wikimedia Commons (CC0).',
        tekija: 'Séraphin-Médéric Mieusement',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Chateau_de_Chenonceaux,_by_S%C3%A9raphin-M%C3%A9d%C3%A9ric_Mieusement_(Getty_107GGH).jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    nimi: 'Chenonceau',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miksi linna rakennettiin joen päälle?',
      'Kuka suunnitteli sillan päällä olevan gallerian?',
    ],
    nappi: 'Linna, joka seisoo joen päällä',
    // 1,0704 E / 47,3247 N — en-Wikipedia "Château de Chenonceau"
    laudat: {
      maailmankartta: { x: 5869, y: 1504.8 },
      europe: { x: 231.8, y: 649 },
    },
    teksti: 'Château de Chenonceau on linna, joka kaartuu Cher-joen yli lähellä '
      + 'Chenonceaux\'n kylää Indre-et-Loiren departementissa. Se on Loiren laakson '
      + 'tunnetuimpia linnoja. Chenonceaun kartano mainitaan kirjallisessa lähteessä '
      + 'ensimmäisen kerran 1000-luvulla, ja nykyinen linna rakennettiin vuosina 1514–1522 '
      + 'vanhan myllyn perustuksille. Joen ylittävä silta rakennettiin vuosina 1556–1559 '
      + 'renessanssiarkkitehti Philibert de l\'Ormen piirustusten mukaan ja sillan päällä '
      + 'oleva galleria vuosina 1570–1576 Jean Bullantin suunnitelmista.',
    lahde: 'en-Wikipedia "Château de Chenonceau", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-saint-malo',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-saint-malo-muurit-dad8f358.jpg',
      lyhyt: 'Saint-Malon muurinpäällinen kävelytie ja linnan päätorni.',
      selite: 'Saint-Malon kaupunginmuurin päällä kulkeva kävelytie; taustalla linnan pyöreä torni ja päätorni.',
      lahde: 'Valokuva: Pierre André Leclercq, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Pierre André Leclercq',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Saint-Malo_les_remparts_de_la_cit%C3%A9_(25).jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-saint-malo-photochrom-eb927847.jpg',
        lyhyt: '1800-luvun lopun värivalokuva Saint-Malosta merelle päin.',
        selite: 'Photochrom-värivalokuva 1800-luvun lopulta: muurikaupunki ja sen aallonmurtajat nousevat matalana kaistaleena merestä.',
        lahde: 'Valokuva: Photochrom Print Collection, Wikimedia Commons (public domain).',
        tekija: 'Photochrom Print Collection (Library of Congress)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:General_view_from_the_fort,_St._Malo,_France-LCCN2001698701.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Saint-Malo',
    tyyppi: 'merenkulku',
    lahi: true,
    kysymykset: [
      'Keitä Saint-Malon kaapparit olivat?',
      'Miksi vanhakaupunki rakennettiin muurien sisään?',
    ],
    nappi: 'Merirosvojen muurikaupunki',
    // -2,0261 E / 48,6494 N — en-Wikipedia "Saint-Malo"
    laudat: {
      maailmankartta: { x: 5765.8, y: 1448.5 },
      europe: { x: 172.3, y: 614.1 },
    },
    teksti: 'Saint-Malo on historiallinen satamakunta Ille-et-Vilainen departementissa '
      + 'Bretagnessa. Muurien ympäröimä vanhakaupunki rakennettiin kalliolle graniittisaarelle, '
      + 'jonka yhdisti mantereeseen vain kapea hiekkakannas ja vuoroveden paljastama '
      + 'liejupohja. Kannakselle tehtiin kivetty tie jo vuonna 1509, ja sitä levennettiin ja '
      + 'korotettiin vuosisatojen kuluessa, erityisesti 1800-luvulla. Kanaalin rannalla '
      + 'sijaitsevalla kaupungilla on pitkä kaapparihistoria: vaurautta kertyi sekä '
      + 'lähivesien kiristyksestä että merentakaisista retkistä.',
    lahde: 'en-Wikipedia "Saint-Malo" ja fi-Wikipedia "Saint-Malo", johdanto-osat '
      + '(tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-pointe-du-raz',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-pointe-du-raz-vieille-0d90a4d0.jpg',
      lyhyt: 'Pointe du Raz, La Vieillen majakka ja Seinin saari taustalla.',
      selite: 'Pointe du Raz vasemmalla, edessä La Vieillen majakka ja Platen tunnusmerkki, horisontissa Seinin saari.',
      lahde: 'Valokuva: Foudebassans, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Foudebassans',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pointe_du_Raz,_La_Vieille,_Sein.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-pointe-du-raz-photochrom-6e2d59b2.jpg',
        lyhyt: '1800-luvun lopun värivalokuva niemen kallioista ja majakasta.',
        selite: 'Photochrom-värivalokuva 1800-luvun lopulta: Pointe du Raz\'n graniittikalliot laskeutuvat mereen, majakka siintää kaukana.',
        lahde: 'Valokuva: Photochrom Print Collection, Wikimedia Commons (public domain).',
        tekija: 'Photochrom Print Collection (Library of Congress)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Pointe_du_Raz,_Douarnenez,_France-LCCN2001698116.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Pointe du Raz',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Miksi Raz de Sein on merenkulkijalle vaarallinen?',
      'Mikä majakka näkyy kärjestä merelle?',
    ],
    nappi: 'Bretagnen läntisin kärki',
    // -4,74111111 E / 48,04027778 N — en-Wikipedia "Pointe du Raz"
    laudat: {
      maailmankartta: { x: 5675.3, y: 1474.5 },
      europe: { x: 120.2, y: 630.1 },
    },
    teksti: 'Pointe du Raz on kallioinen niemenkärki, joka työntyy Atlanttiin Länsi-Bretagnessa. '
      + 'Se on Plogoffin kunnan läntisin kohta Finistèressä ja kohoaa keulan tavoin noin 72 '
      + 'metriä Raz de Sein -salmen yläpuolelle. Nimi tulee juuri tuosta salmesta, joka '
      + 'erottaa niemen Seinin saaresta ja on vaarallista vettä; sana raz on lainattu '
      + 'normannista ja tarkoittaa voimakasta virtaa. Niemeltä erottuu selvästi La Vieillen '
      + 'majakka. Manner-Ranskan läntisin kohta on kuitenkin hieman pohjoisempana oleva '
      + 'Pointe de Corsen.',
    lahde: 'en-Wikipedia "Pointe du Raz" ja fr-Wikipedia "Pointe du Raz", johdanto-osat '
      + '(tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-etretat',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-etretat-aiguille-a0e9982a.jpg',
      lyhyt: 'Étretat\'n kiviportti ja sen takana kohoava Aiguille-neula.',
      selite: 'Étretat\'n Porte d\'Aval -kiviportti ja sen takana merestä nouseva Aiguille-kallioneula.',
      lahde: 'Valokuva: Yeuzio, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Yeuzio',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:L%27Arche_et_lAiguille_creuse_%C3%A0_Etretat.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-etretat-monet-91236112.jpg',
        lyhyt: 'Claude Monet maalasi Étretat\'n kiviportin vuonna 1864.',
        selite: 'Claude Monet\'n maalaus "Étretat, porte et falaise d\'Aval" vuodelta 1864: kiviportti, kallio ja ranta.',
        lahde: 'Kuva: Claude Monet, Wikimedia Commons (public domain).',
        tekija: 'Claude Monet',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%C3%89tretat,_porte_et_falaise_d%27Aval_(1864)_Claude_Monet_(W_22b).jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
    ],
    nimi: 'Étretat',
    tyyppi: 'meri',
    lahi: true,
    kysymykset: [
      'Miksi maalarit tulivat juuri Étretat\'hen?',
      'Miten kiviportit syntyivät kallioon?',
    ],
    nappi: 'Liitukalliot ja kiviportit',
    // 0,21 E / 49,71 N — en-Wikipedia "Étretat"
    laudat: {
      maailmankartta: { x: 5840.3, y: 1402.8 },
      europe: { x: 215.2, y: 586.2 },
    },
    teksti: 'Étretat on kunta Seine-Maritimen departementissa Normandiassa '
      + 'Luoteis-Ranskassa, noin 32 kilometriä Le Havresta koilliseen Pays de Caux\'n '
      + 'rannikolla. Vaatimattomasta kalastajakylästä tuli 1800-luvulla muodikas '
      + 'kylpyläpaikka ja porvariston kesänviettopaikka. Paikka veti puoleensa taiteilijoita: '
      + 'siellä viihtyivät muun muassa Flaubert ja Maupassant, ja Courbet, Boudin ja Monet '
      + 'maalasivat sen rantoja. Yli 90 metriä korkeat liitukalliot, kolme kiviporttia ja '
      + 'harmaat kivirannat tekivät Étretat\'sta yhden Ranskan tunnetuimmista '
      + 'rannikkomaisemista.',
    lahde: 'en-Wikipedia "Étretat" ja fr-Wikipedia "Étretat", johdanto-osat '
      + '(tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-amiens',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-amiens-lansijulkisivu-f1ce66d9.jpg',
      lyhyt: 'Amiensin tuomiokirkon länsijulkisivu portaaleineen ja ruusuikkunoineen.',
      selite: 'Amiensin Notre-Damen länsijulkisivu: kolme veistoksin koristeltua portaalia, kuningasgalleria ja ruusuikkuna.',
      lahde: 'Valokuva: Chabe01, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Chabe01',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Fa%C3%A7ade_Ouest_Cath%C3%A9drale_Notre_Dame_-_Amiens_(FR80)_-_2021-05-30_-_1.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-amiens-photochrom-7a3a4117.jpg',
        lyhyt: '1800-luvun lopun värivalokuva tuomiokirkon kuorista.',
        selite: 'Photochrom-värivalokuva 1800-luvun lopulta: Amiensin kuoriaitaus, korkeat holvit ja ruusuikkuna.',
        lahde: 'Valokuva: Photochrom Print Collection, Wikimedia Commons (public domain).',
        tekija: 'Photochrom Print Collection (Library of Congress)',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Cathedral_choir,_Amiens,_France-LCCN2001697552.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Commons:Licensing',
      },
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-amiens-julkisivu-6ed2cc6f.jpg',
        lyhyt: 'Enkelipatsas ja kiviverkko tuomiokirkon julkisivun yksityiskohdassa.',
        selite: 'Amiensin tuomiokirkon julkisivun yksityiskohta: torvea soittava enkeli pylväiden ja kivisen verkkokoristelun keskellä.',
        lahde: 'Valokuva: CEphoto, Uwe Aranas, Wikimedia Commons (CC BY-SA 3.0).',
        tekija: 'CEphoto, Uwe Aranas',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Amiens_France_Cath%C3%A9drale-Notre-Dame-d-Amiens-02.jpg',
        lisenssi: 'CC BY-SA 3.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      },
    ],
    nimi: 'Amiensin tuomiokirkko',
    tyyppi: 'kulttuuri',
    lahi: true,
    kysymykset: [
      'Miten katedraali valmistui näin nopeasti?',
      'Mitä länsijulkisivun kuvanveisto esittää?',
    ],
    nappi: 'Ranskan suurin goottilainen kirkko',
    // 2,30222222 E / 49,895 N — en-Wikipedia "Amiens Cathedral"
    laudat: {
      maailmankartta: { x: 5910.1, y: 1394.7 },
      europe: { x: 255.4, y: 581.4 },
    },
    teksti: 'Amiensin Notre-Dame on katolinen tuomiokirkko, joka seisoo loivalla harjanteella '
      + 'Somme-joen yllä Amiensissa noin 120 kilometriä Pariisista pohjoiseen. Se '
      + 'rakennettiin lähes kokonaan vuosien 1220 ja noin 1270 välillä, goottilaiseksi '
      + 'katedraaliksi hyvin lyhyessä ajassa, ja siksi sen tyyli on poikkeuksellisen '
      + 'yhtenäinen. Tilavuudeltaan 200 000 kuutiometriä se on Ranskan suurin katedraali, yli '
      + 'kaksi kertaa Pariisin Notre-Damen kokoinen. Kirkko on ollut Unescon '
      + 'maailmanperintökohde vuodesta 1981, ja se tunnetaan erityisesti 1200-luvun alun '
      + 'goottilaisesta kuvanveistosta länsijulkisivullaan ja eteläisen ristivarren '
      + 'portaalissa.',
    lahde: 'en-Wikipedia "Amiens Cathedral", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-reims',
    nimi: 'Reims',
    tyyppi: 'historia',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-reims-76ae34f7.jpg',
      lyhyt: 'Reimsin tuomiokirkko ja sen viereinen Tau\'n palatsi idästä kuvattuina.',
      selite: 'Reimsin tuomiokirkko ja sen viereinen Tau\'n palatsi idästä kuvattuina; molemmat kuuluvat samaan maailmanperintökohteeseen.',
      lahde: 'Valokuva: DXR, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'DXR',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Palais_du_Tau_and_Cathédrale_Notre-Dame_de_Reims,_East_View_20140306.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-reims-dcec114e.jpg',
        lyhyt: 'Kabinettivalokuva Reimsin kattojen yllä kohoavasta tuomiokirkosta.',
        selite: 'Kabinettivalokuva Reimsistä: tuomiokirkko kohoaa kaupungin kattojen yllä. Kuva on otettu vuosien 1870 ja 1900 välillä.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_Reims_met_de_Kathedraal_La_Cathédrale_(titel_op_object)_Reims_(serietitel_op_object),_RP-F-F19894.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Miksi kuninkaat kruunattiin juuri Reimsissä?',
      'Mikä oli se pyhä ampulla?',
    ],
    nappi: 'Kuninkaiden kruunauskirkko ja samppanjakellarit',
    // 4,0347 E / 49,2628 N — en-Wikipedia "Reims"
    laudat: {
      maailmankartta: { x: 5967.8, y: 1422.1 },
      europe: { x: 288.7, y: 598 },
    },
    teksti: 'Reims on Marnen departementin suurin kaupunki ja Ranskan kahdenneksitoista '
      + 'suurin; se sijaitsee 129 kilometriä Pariisista koilliseen Vesle-joen varrella. '
      + 'Gallialaisten perustamasta paikasta kasvoi Rooman valtakunnan aikana merkittävä '
      + 'kaupunki, ja myöhemmin siitä tuli Ranskan kuninkaiden perinteinen kruunauspaikka. '
      + 'Kuninkaan voitelu tehtiin Reimsin tuomiokirkossa, jossa säilytettiin pyhää '
      + 'ampullia, ja siksi kaupunkia kutsutaan ranskaksi nimellä la cité des sacres. '
      + 'Tuomiokirkko, sen viereinen Tau\'n palatsi ja Saint-Remin luostari liitettiin '
      + 'yhdessä Unescon maailmanperintöluetteloon vuonna 1991. Reims on myös Champagnen '
      + 'viinialueen pohjoislaidalla ja kytkeytyy samppanjan tuotantoon ja vientiin.',
    lahde: 'en-Wikipedia "Reims", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-vezelay',
    nimi: 'Vézelay',
    tyyppi: 'historia',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-vezelay-63dd721d.jpg',
      lyhyt: 'Sainte-Marie-Madeleinen basilika Vézelayn kylän kukkulan laella.',
      selite: 'Sainte-Marie-Madeleinen basilika kohoaa Vézelayn kylän talojen yllä kukkulan laella Burgundissa.',
      lahde: 'Valokuva: Nikater, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Nikater',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Basilika_Ste_Madeleine_in_Vezelay01.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-vezelay-b1378444.jpg',
        lyhyt: 'Basilikan keskiportaali ja sen veistetty timpanoni 1800-luvun valokuvassa.',
        selite: 'Luostarikirkon keskiportaali veistettyine timpanoneineen ja kapiteeleineen. Albumiinivedos vuosilta 1860–1879.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_het_portaal_van_de_kathedraal_van_Vezelay_Vezeley._Abbey_Church._20._Portal_Centre_Doorway_(titel_op_object),_RP-F-00-5420.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Miksi pyhiinvaeltajat kerääntyivät juuri tänne?',
      'Mitä portaalin kiviveistokset esittävät?',
    ],
    nappi: 'Pyhiinvaelluksen lähtökirkko kukkulalla',
    // 3,74861111 E / 47,46638889 N — en-Wikipedia "Vézelay Abbey"
    // (kylän oma artikkeli antaa 3,7467 / 47,4667; piste on luostarin)
    laudat: {
      maailmankartta: { x: 5958.3, y: 1498.8 },
      europe: { x: 283.2, y: 645.2 },
    },
    teksti: 'Vézelayn luostari on benediktiini- ja cluniacensiluostari Vézelayn kylässä '
      + 'Yonnen departementissa Itä-Keski-Ranskassa. Se rakennettiin vuosina 1120–1150. '
      + 'Luostarikirkko, nykyinen Sainte-Marie-Madeleinen basilika, on veistettyine '
      + 'kapiteeleineen ja portaaleineen yksi burgundilaisen romaanisen taiteen ja '
      + 'arkkitehtuurin mestariteoksista. Hugenotit ryöstivät rakennuksen vuonna 1569, '
      + 'sitä laiminlyötiin 1600- ja 1700-luvuilla ja se vaurioitui vielä Ranskan '
      + 'vallankumouksen aikana. Kirkko ja Vézelayn kukkula otettiin Unescon '
      + 'maailmanperintöluetteloon vuonna 1979.',
    lahde: 'en-Wikipedia "Vézelay Abbey", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-beaune',
    nimi: 'Beaunen Hôtel-Dieu',
    tyyppi: 'kulttuuri',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-beaune-8f26f045.jpg',
      lyhyt: 'Hôtel-Dieun lasitetut kattotiilet kuvioivat sisäpihan katon.',
      selite: 'Hôtel-Dieun sisäpihan katto: lasitetut tiilet ladottu monivärisiksi kuvioiksi, alla kattoikkunat ja puinen parveke.',
      lahde: 'Valokuva: Benjamin Smith, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Benjamin Smith',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Beaune_-_Hôtel-Dieu_-_Cour_-_01.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-beaune-c5856d54.jpg',
        lyhyt: 'Hôtel-Dieun sisäpiha ja hoitosisaria 1800-luvun lopun valokuvassa.',
        selite: 'Hôtel-Dieun sisäpiha hoitosisarineen. Albumiinivedos noin vuosilta 1875–1900, jolloin talo oli yhä sairaalana.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Binnenplaats_van_het_Hospices_de_Beaune_met_nonnen_Hopital_á_Beaune._(titel_op_object),_RP-F-00-4073.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Kuka maksoi köyhien sairaalan?',
      'Miten talo elättää itsensä nykyään?',
    ],
    nappi: 'Sairaala, jonka katto hohtaa väreissä',
    // 4,83666667 E / 47,02194444 N — en-Wikipedia "Hospices de Beaune"
    laudat: {
      maailmankartta: { x: 5994.6, y: 1517.6 },
      europe: { x: 304.1, y: 656.9 },
    },
    teksti: 'Hospices de Beaune eli Hôtel-Dieu de Beaune on entinen hyväntekeväisyyden '
      + 'varassa toiminut vaivaistalo Beaunen kaupungissa. Sen perusti vuonna 1443 '
      + 'Burgundin kansleri Nicolas Rolin köyhien sairaalaksi. Alkuperäinen '
      + 'sairaalarakennus Hôtel-Dieu on yksi 1400-luvun burgundilaisen arkkitehtuurin '
      + 'hienoimmista esimerkeistä ja toimii nykyään museona; potilaita hoidetaan '
      + 'uudemmissa sairaalarakennuksissa. Talon nimissä järjestetään joka marraskuu '
      + 'merkittävä hyväntekeväisyysviinihuutokauppa.',
    lahde: 'en-Wikipedia "Hospices de Beaune", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-ajaccio',
    nimi: 'Ajaccio',
    tyyppi: 'historia',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-ajaccio-40da9824.jpg',
      lyhyt: 'Kalastusveneitä Ajaccion Tino Rossin satamassa.',
      selite: 'Kalastusveneitä Ajaccion Tino Rossin satamassa Korsikan länsirannikolla.',
      lahde: 'Valokuva: Jean-Pol GRANDMONT, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Jean-Pol GRANDMONT',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ajaccio_Port_JPG2.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-ajaccio-e41d8022.jpg',
        lyhyt: 'Napoleonin syntymätalo Ajacciossa 1800-luvun lopun valokuvassa.',
        selite: 'Maison Bonaparte, talo jossa Napoleon syntyi. Albumiinivedos noin vuosilta 1886–1896.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Napoleon_Bonaparte%27s_geboortehuis_in_Ajaccio_Huis_waarin_Napoleon_geboren_werd,_Ajaccio_(titel_op_object),_RP-F-2007-359-63.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Kuka hallitsi Korsikaa ennen ranskalaisia?',
      'Kuinka kaukana manner-Ranska on täältä?',
    ],
    nappi: 'Napoleonin syntymäkaupunki',
    // 8,7369 E / 41,9267 N — en-Wikipedia "Ajaccio"
    laudat: {
      maailmankartta: { x: 6124.6, y: 1726.5 },
      europe: { x: 378.9, y: 790.9 },
    },
    teksti: 'Ajaccio on Korsikan pääkaupunki ja saaren suurin kaupunki. Se on '
      + 'Corse-du-Sudin departementin prefektuuri ja sijaitsee saaren länsirannikolla, '
      + '390 kilometriä Marseillesta kaakkoon. Kaupunki taantui keskiajalla, mutta alkoi '
      + 'kukoistaa uudelleen sen jälkeen, kun genovalaiset rakensivat vuonna 1492 '
      + 'sitadellin vanhan asutuksen eteläpuolelle. Vuonna 1755 julistettiin Korsikan '
      + 'tasavalta, mutta genovalaiset pitivät Ajaccion ja muutaman muun linnoituksen '
      + 'hallussaan siihen asti, kunnes ranskalaiset ottivat saaren haltuunsa. '
      + 'Ajaccion tunnetuin asukas on Napoleon Bonaparte, joka syntyi kaupungissa '
      + 'vuonna 1769; hänen sukutalonsa Maison Bonaparte on nykyään museo.',
    lahde: 'en-Wikipedia "Ajaccio", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-bonifacio',
    nimi: 'Bonifacio',
    tyyppi: 'merenkulku',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-bonifacio-e6bfcc16.jpg',
      lyhyt: 'Bonifacion yläkaupunki kalkkikivijyrkänteen reunalla mereltä katsottuna.',
      selite: 'Bonifacion yläkaupunki seisoo kalkki- ja hiekkakiviylängöllä jyrkän merikallion päällä; kallioon on hakattu Aragonian kuninkaan portaat.',
      lahde: 'Valokuva: Isiwal, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Isiwal',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Corsica_Bonifacio_Ville_haute.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-bonifacio-b2afc271.jpg',
        lyhyt: 'Bonifacion kalliot ja kaupunki varhaisessa valokuvassa.',
        selite: 'Bonifacion kerroksiset kalkkikivikalliot ja niiden päällä häämöttävä kaupunki. Valokuva noin vuosilta 1905–1910 erään ranskalaisen harrastajakuvaajan albumista.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_de_kliffen_bij_Bonifacio_op_Corsica,_RP-F-F01162-EE.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Mikä salmi erottaa Korsikan Sardiniasta?',
      'Miksi kaupunki rakennettiin kallion päälle?',
    ],
    nappi: 'Kaupunki kalkkikiven reunalla',
    // 9,156876 E / 41,386814 N — en-Wikipedia "Bonifacio, Corse-du-Sud"
    laudat: {
      maailmankartta: { x: 6138.6, y: 1748 },
      europe: { x: 387, y: 805.1 },
    },
    teksti: 'Bonifacio on kaupunki Korsikan saaren eteläosassa, Corse-du-Sudin '
      + 'departementissa. Kaupunki ja sitä suojaava linnoitus on rakennettu korkealle '
      + 'kalkkikivitörmälle, joka antaa suojan myös kaupungin luonnonsatamalle. '
      + 'Bonifacio sijaitsee strategisesti hyvällä paikalla, ja sieltä pystyttiin '
      + 'valvomaan sotilaallisesti tärkeitä laivareittejä. Kaupungin mukaan on nimetty '
      + 'Korsikan ja Sardinian erottava Bonifacionsalmi.',
    lahde: 'fi-Wikipedia "Bonifacio", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-place-stanislas',
    nimi: 'Nancy, Place Stanislas',
    tyyppi: 'kulttuuri',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-place-stanislas-5fc36b97.jpg',
      lyhyt: 'Jean Lamourin kullatut takorautaportit Place Stanislas -aukion kulmassa.',
      selite: 'Kullatut takorautaportit ja niiden lyhdyt avautuvat Place Stanislas -aukiolle Nancyssä.',
      lahde: 'Valokuva: Krzysztof Golik, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Krzysztof Golik',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Grids_of_Place_Stanislas_in_Nancy.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-place-stanislas-272c4be2.jpg',
        lyhyt: 'Place Stanislas porttien välistä nähtynä 1800-luvun lopun valokuvassa.',
        selite: 'Kabinettivalokuva Place Stanislas -aukiosta porttien välistä: taustalla kaupungintalo ja Stanislauksen patsas. Kuva on otettu vuosien 1870 ja 1900 välillä.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Gezicht_op_La_Place_Stanislas_te_Nancy_La_Place_Stanislas_(titel_op_object)_Nancy_(serietitel_op_object),_RP-F-F19859.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Kuka oli Stanislaus, jonka mukaan aukio on nimetty?',
      'Miksi aukio näyttää yhdestä puusta veistetyltä?',
    ],
    nappi: 'Kuninkaan aukio kullatuin portein',
    // 6,18305556 E / 48,69361111 N — en-Wikipedia "Place Stanislas"
    laudat: {
      maailmankartta: { x: 6039.4, y: 1446.6 },
      europe: { x: 329.9, y: 613 },
    },
    teksti: 'Place Stanislas on suuri kävelyaukio Nancyn kaupungissa Lorrainen '
      + 'historiallisella alueella. Se rakennettiin vuosina 1752–1756 Stanislaus I:n '
      + 'käskystä; hän oli Puolan entinen kuningas ja Liettuan suuriruhtinas ja '
      + 'sittemmin Lorrainen herttua. Aukio on yksi vanhimmista esimerkeistä '
      + 'arkkitehtuuriltaan yhtenäisestä monumentaalisesta julkisesta aukiosta ja '
      + 'erinomainen näyte 1700-luvun kaupunkirakentamisesta. Vuodesta 1983 aukio '
      + 'yhdessä akselinsa jatkeiden Place de la Carrièren ja Place d\'Alliancen kanssa '
      + 'on ollut Unescon maailmanperintökohde.',
    lahde: 'en-Wikipedia "Place Stanislas", johdanto-osa (tarkistettu 18.9.2026).',
  },
  /* ================= VARASTON KAKSITOISTA (18.9.2026) ==============
   *
   * Nämä ovat täsmälleen ne kohteet, jotka ensimmäinen erä jätti pois
   * määrän vuoksi (docs/raportit/viesti-fable-ranska-hahmotelma-
   * 20260917.md, osio 4). Raamattu KARTTAUUDISTUKSEN PAATOKSET 33
   * TARKENNUS + PAATOKSET 34 TARKENNUS 2: varasto otetaan käyttöön,
   * kun kartta kaipaa lisää pisteitä — summa 43 → 55 kaupungin
   * ulkopuolisia nostoja (maastokohteet 17 + maalehtinostot 11 +
   * hahmotelma 27).
   *
   * Sama sääntö kuin yllä: vain otsikko ja yhden rivin alaotsikko, ei
   * kuvia, ei visoja, ei sisältötekstiä, ei keksittyjä faktoja.
   * Asteet en-Wikipedian rajapinnasta 18.9.2026, laudan luvut pelin
   * omalla kaavalla (tools/johda-maastokohteet.mjs `laudat`).
   * Jokainen osuu Ranskan lehden rajaukseen (`osuuLehteen`), on
   * maamaskin mukaan maalla (tools/maamaski.mjs) eikä yksikään ole
   * minkään Ranskan kaupungin sisäpuolella (`onKaupunginSisainen`);
   * lähin on Saint-Émilion 35,2 km Bordeaux'sta.
   */
  {
    id: 'hahmotelma-mont-ventoux',
    nimi: 'Mont Ventoux',
    tyyppi: 'vuori',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-mont-ventoux-ad5bff71.jpg',
      lyhyt: 'Mont Ventoux\'n paljas kalkkikivihuippu ja sen torni.',
      selite: 'Mont Ventoux\'n huippu: valkoinen kalkkikivirinne ilman puustoa, laella tutkatorni ja huipulle kiemurteleva maantie.',
      lahde: 'Valokuva: BlueBreezeWiki, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'BlueBreezeWiki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:140608_Mont-Ventoux-04.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-mont-ventoux-43491989.jpg',
        lyhyt: 'Huipun observatorio 1900-luvun alun postikortissa.',
        selite: 'Mont Ventoux\'n observatorio huipulla. Postikortin oma teksti ilmoittaa korkeudeksi 1 908 metriä; kuva on 1900-luvun alusta.',
        lahde: 'Valokuva: tuntematon kuvaaja, Wikimedia Commons (public domain).',
        tekija: 'tuntematon',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:01_Mont_Ventoux_Observatoire_alt_1908m.jpg',
        lisenssi: 'Public domain',
        lisenssiUrl: 'https://commons.wikimedia.org/wiki/Template:PD-old',
      },
    ],
    kysymykset: [
      'Miksi huippu on puuton ja valkoinen?',
      'Kuinka kovaa siellä tuulee?',
    ],
    nappi: 'Provencen tuulinen huippu, 1 910 m',
    // 5,27888889 E / 44,17444444 N — en-Wikipedia "Mont Ventoux"
    laudat: {
      maailmankartta: { x: 6009.3, y: 1635.7 },
      europe: { x: 312.6, y: 731.8 },
    },
    teksti: 'Mont Ventoux on vuori Provencessa Etelä-Ranskassa, noin 20 kilometriä '
      + 'Carpentras\'sta koilliseen Vauclusen departementissa. Pohjoisessa vuori rajautuu '
      + 'Drômen departementtiin. Se kohoaa 1 910 metriin ja on alueensa korkein vuori; '
      + 'lisänimiä ovat "Provencen peto", "Provencen jättiläinen" ja "Kalju vuori". '
      + 'Tunnetuksi vuori on tullut Ranskan ympäriajon etappina, ja vuonna 2009 siellä '
      + 'ratkaistiin kilpailun ensimmäinen toiseksi viimeisen päivän vuoristomaali.',
    lahde: 'en-Wikipedia "Mont Ventoux", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-puy-de-sancy',
    nimi: 'Puy de Sancy',
    tyyppi: 'vuori',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-puy-de-sancy-755bbff9.jpg',
      lyhyt: 'Puy de Sancyn huippu ja Aiguilles du Diable -kalliot.',
      selite: 'Puy de Sancyn huippu ja sen vasemmalla puolella kohoavat Aiguilles du Diable -kalliot; portaita nousevat vaeltajat kertovat mittakaavan.',
      lahde: 'Valokuva: Marie-Lan Nguyen, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Marie-Lan Nguyen',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Puy_de_Sancy_2016-08-23_n18.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-puy-de-sancy-c17a5081.jpg',
        lyhyt: 'Luminen Puy de Sancy Mont-Doren hiihtokeskuksesta katsottuna.',
        selite: 'Lumen peittämä Puy de Sancy Mont-Doren hiihtokeskuksen rinteiltä kuvattuna.',
        lahde: 'Valokuva: Pymouss, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Pymouss',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Mont-Dore_station_-_puy_de_Sancy_20220309-01.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
      },
    ],
    kysymykset: [
      'Milloin tämä tulivuori purkautui viimeksi?',
      'Mikä Massif Central oikein on?',
    ],
    nappi: 'Massif Centralin korkein huippu',
    // 2,81416667 E / 45,52833333 N — en-Wikipedia "Puy de Sancy"
    laudat: {
      maailmankartta: { x: 5927.1, y: 1580 },
      europe: { x: 265.2, y: 696.2 },
    },
    teksti: 'Puy de Sancy on Ranskan keskiylängön eli Massif Centralin korkein vuori, ja '
      + 'sen huippu on 1 886 metrin korkeudessa. Vuori sijaitsee Puy-de-Dômen '
      + 'departementissa Etelä-Keski-Ranskassa. Se on osa vanhaa kerrostulivuorta, joka '
      + 'on purkautunut viimeksi yli 220 000 vuotta sitten. Pohjoisia ja eteläisiä '
      + 'rinteitä käytetään nykyään lasketteluun, ja rinteille on asennettu muutama '
      + 'hiihtohissi.',
    lahde: 'fi-Wikipedia "Puy de Sancy", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-amboise',
    nimi: 'Amboisen linna',
    tyyppi: 'kulttuuri',
    lahi: true,
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-amboise-2f0daf4b.jpg',
      lyhyt: 'Amboisen linna muureineen alhaalta Loiren puolelta kuvattuna.',
      selite: 'Amboisen linna kohoaa muurineen ja torneineen Loiren rannan yläpuolelle.',
      lahde: 'Valokuva: Martin Falbisoner, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Martin Falbisoner',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Château_d%27Amboise_from_below.JPG',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260918/fra-hahmotelma-amboise-0f8d3316.jpg',
        lyhyt: 'Linna ja kaupunki joen takaa 1800-luvun valokuvassa.',
        selite: 'Amboisen linna, Minimes-torni ja kaupungin talot Loiren takaa kuvattuina. Albumiinivedos vuosilta 1860–1880.',
        lahde: 'Valokuva: Rijksmuseum, Wikimedia Commons (CC0).',
        tekija: 'Rijksmuseum',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Het_kasteel_van_Amboise_218_Château_d%27Amboise_-_Vue_d%27Ensemble_(titel_op_object),_RP-F-00-202.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
    kysymykset: [
      'Miten kuningas Kaarle VIII kuoli täällä?',
      'Miksi linnasta purettiin suurin osa?',
    ],
    nappi: 'Kuninkaiden linna Loiren yllä',
    // 0,98603 E / 47,41368 N — en-Wikipedia "Château d'Amboise"
    laudat: {
      maailmankartta: { x: 5866.2, y: 1501.1 },
      europe: { x: 230.1, y: 646.6 },
    },
    teksti: 'Amboisen linna on linna Amboisen kaupungissa Indre-et-Loiren departementissa '
      + 'Loiren laaksossa. Kruunu takavarikoi sen 1400-luvulla, minkä jälkeen siitä tuli '
      + 'suosittu kuninkaallinen asuinpaikka ja se rakennettiin laajasti uudelleen. '
      + 'Kuningas Kaarle VIII kuoli linnassa vuonna 1498 lyötyään päänsä oven kamanaan. '
      + 'Linna rappeutui 1500-luvun jälkipuoliskolta alkaen ja suurin osa sen sisemmistä '
      + 'rakennuksista purettiin myöhemmin, mutta osa säilyi ja on sittemmin kunnostettu '
      + 'yhdessä ulomman torni- ja muurikehän kanssa. Ranskan kulttuuriministeriö on '
      + 'luokitellut linnan historialliseksi monumentiksi vuodesta 1840.',
    lahde: 'en-Wikipedia "Château d\'Amboise", johdanto-osa (tarkistettu 18.9.2026).',
  },
  {
    id: 'hahmotelma-nimesin-areena',
    nimi: 'Nîmesin areena',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Roomalainen amfiteatteri yhä pystyssä',
    // 4,36 E / 43,835 N — en-Wikipedia "Arena of Nîmes"
    laudat: {
      maailmankartta: { x: 5978.7, y: 1649.5 },
      europe: { x: 294.9, y: 740.7 },
    },
    teksti: runko('Roomalainen amfiteatteri yhä pystyssä'),
    lahde: koordinaatinLahde('Arena of Nîmes', '18.9.2026'),
  },
  {
    id: 'hahmotelma-rouen',
    nimi: 'Rouenin tuomiokirkko',
    tyyppi: 'kulttuuri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Normandian goottilainen katedraali',
    // 1,095 E / 49,4402 N — en-Wikipedia "Rouen Cathedral"
    laudat: {
      maailmankartta: { x: 5869.8, y: 1414.5 },
      europe: { x: 232.2, y: 593.3 },
    },
    teksti: runko('Normandian goottilainen katedraali'),
    lahde: koordinaatinLahde('Rouen Cathedral', '18.9.2026'),
  },
  {
    id: 'hahmotelma-rocamadour',
    nimi: 'Rocamadour',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Pyhiinvaelluskylä kallioseinämässä',
    // 1,6186 E / 44,8003 N — en-Wikipedia "Rocamadour"
    laudat: {
      maailmankartta: { x: 5887.3, y: 1610 },
      europe: { x: 242.3, y: 715.4 },
    },
    teksti: runko('Pyhiinvaelluskylä kallioseinämässä'),
    lahde: koordinaatinLahde('Rocamadour', '18.9.2026'),
  },
  {
    id: 'hahmotelma-saint-emilion',
    nimi: 'Saint-Émilion',
    tyyppi: 'ruoka',
    hahmotelma: true,
    lahi: true,
    nappi: 'Viinikylä ja kallioon hakattu kirkko',
    // -0,1547 E / 44,8936 N — en-Wikipedia "Saint-Émilion"
    laudat: {
      maailmankartta: { x: 5828.2, y: 1606.2 },
      europe: { x: 208.2, y: 712.9 },
    },
    teksti: runko('Viinikylä ja kallioon hakattu kirkko'),
    lahde: koordinaatinLahde('Saint-Émilion', '18.9.2026'),
  },
  {
    id: 'hahmotelma-cognac',
    nimi: 'Cognac',
    tyyppi: 'ruoka',
    hahmotelma: true,
    lahi: true,
    nappi: 'Charenten kaupunki, joka antoi nimen polttoviinille',
    // -0,33 E / 45,7 N — en-Wikipedia "Cognac, France"
    // (haku "Cognac, Charente" ohjautuu tähän artikkeliin)
    laudat: {
      maailmankartta: { x: 5822.3, y: 1572.8 },
      europe: { x: 204.9, y: 691.7 },
    },
    teksti: runko('Charenten kaupunki, joka antoi nimen polttoviinille'),
    lahde: koordinaatinLahde('Cognac, France', '18.9.2026'),
  },
  {
    id: 'hahmotelma-vichy',
    nimi: 'Vichy',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kylpyläkaupunki kivennäislähteiden äärellä',
    // 3,4267 E / 46,1278 N — en-Wikipedia "Vichy"
    laudat: {
      maailmankartta: { x: 5947.6, y: 1555 },
      europe: { x: 277, y: 680.4 },
    },
    teksti: runko('Kylpyläkaupunki kivennäislähteiden äärellä'),
    lahde: koordinaatinLahde('Vichy', '18.9.2026'),
  },
  {
    id: 'hahmotelma-biarritz',
    nimi: 'Biarritz',
    tyyppi: 'meri',
    hahmotelma: true,
    lahi: true,
    nappi: 'Merikylpylä Biskajanlahden rannalla',
    // -1,56 E / 43,48 N — en-Wikipedia "Biarritz"
    laudat: {
      maailmankartta: { x: 5781.3, y: 1663.9 },
      europe: { x: 181.2, y: 750.1 },
    },
    teksti: runko('Merikylpylä Biskajanlahden rannalla'),
    lahde: koordinaatinLahde('Biarritz', '18.9.2026'),
  },
  {
    /*
     * CANAL DU MIDI — PISTE KANAVAN VARRELLA, EI TOULOUSESSA.
     * Kanavan omalla en-artikkelilla ei ole `prop=coordinates`-
     * lukua, ja kanavan päätepiste Toulousessa osuisi Toulousen oman
     * kaupunkimerkin päälle (pakka näkyvistä kaupungeista).
     * Piste on siksi kanavan vedenjakajalla Seuil de Naurouzessa,
     * Toulousen ja Carcassonnen välissä: 42,4 km Toulousesta ja
     * 47 km Carcassonnen linnoituskaupungista, eli kumpikaan merkki
     * ei jää alle.
     */
    id: 'hahmotelma-canal-du-midi',
    nimi: 'Canal du Midi',
    tyyppi: 'tekniikka',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kanava, joka yhdistää kaksi merta',
    // 1,81862 E / 43,35071 N — en-Wikipedia "Seuil de Naurouze"
    laudat: {
      maailmankartta: { x: 5894, y: 1669.2 },
      europe: { x: 246.1, y: 753.5 },
    },
    teksti: runko('Kanava, joka yhdistää kaksi merta'),
    lahde: koordinaatinLahde('Seuil de Naurouze', '18.9.2026'),
  },
  {
    id: 'hahmotelma-le-puy-en-velay',
    nimi: 'Le Puy-en-Velay',
    tyyppi: 'historia',
    hahmotelma: true,
    lahi: true,
    nappi: 'Kaupunki tulivuorenneulojen keskellä',
    // 3,88472222 E / 45,04444444 N — en-Wikipedia "Le Puy-en-Velay"
    laudat: {
      maailmankartta: { x: 5962.8, y: 1599.9 },
      europe: { x: 285.8, y: 708.9 },
    },
    teksti: runko('Kaupunki tulivuorenneulojen keskellä'),
    lahde: koordinaatinLahde('Le Puy-en-Velay', '18.9.2026'),
  },
];
