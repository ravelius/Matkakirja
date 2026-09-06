/*
 * MAASTOKOHTEET — FRA. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs FRA --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/FRA.json. Työkalu laskee laudan
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
 * ── K2-ERÄ 4 6.9.2026: KOHTEITA MAASTON RINNALLE ───────────────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Ranskalla oli jo KAKSI kuratoitua kohdetta
 * (js/packs/fokuskohteet-fra.js: Tuileries'n palatsi ja Bastilji),
 * joten tavoitteesta puuttui kuusi
 * (docs/moduulit/karttanostot-kattavuus.md). Tässä ne ovat; yhdenkään
 * tyyppi ei ole maastoa, vaan historiaa, kulttuuria tai tekniikkaa.
 *
 * fokuskohteet-fra.js:ÄÄN EI OLE KOSKETTU eikä sen kumpaakaan kohdetta
 * ole toistettu täällä — molemmat ovat Pariisissa, ja tämän erän
 * kohteet ovat kaukana pelikaupungeista. Sama koskee
 * js/fokuskohteet.js:n KOHDE_MAAT-taulua, joka on rinnakkaisen erän
 * hallussa; maastokohteiden hakemisto (js/packs/maastokohteet.js)
 * liittää tämän listan peliin sellaisenaan.
 *
 * KAIKKI KUUSI OVAT KAUKANA PELIKAUPUNGISTA. Ranskassa on kaksi
 * pelikaupunkia (Pariisi ja Marseille), ja etäisyys mitattiin
 * jokaiseen js/packs/maailmankartta.js CITIES-listan kaupunkiin;
 * jokaisen kohteen lähin on kirjattu sen oman koordinaattirivin
 * viereen. Lähin koko erässä on Pont du Gard 25,7 lautayksikön päässä
 * Marseillesta — raja KAUPUNGIN_KOHDALLA_SADE on 7
 * (js/fokuskohteet.js). Versailles jätettiin pois juuri tästä syystä:
 * se on vain 7,3 yksikön päässä Pariisista eli käytännössä kiinni
 * rajassa, joten sen paikka olisi kohdekartalla eikä pääkartalla.
 *
 * KUVATON ERÄ. Kortti kantaa tekstin ja lähteen, ei kuvaa — sama linja
 * kuin erässä 1. Faktat on tarkistettu en-Wikipediasta kohde
 * kerrallaan 6.9.2026.
 *
 * Ranskan maastokohteet. Faktat en-Wikipediasta 29.8.2026; koordinaatit artikkelien omia paitsi merillä ja joilla, joilla piste on valittu käsin lehden ikkunan sisältä (ks. lahdeKoordinaatti).
 */
export const MAASTOKOHTEET_FRA = [
  {
    id: 'montblanc',
    nimi: 'Mont Blanc',
    tyyppi: 'vuori',
    kysymykset: [
      'Kuka nousi Mont Blancille ensimmäisenä?',
      'Kummalle maalle huippu oikeastaan kuuluu?',
    ],
    korostukset: ['Alpit|Alpeilla'],
    nappi: 'Alppien korkein huippu',
    // 6.865 E / 45.8328 N — en-Wikipedia "Mont Blanc"
    laudat: {
      maailmankartta: { x: 6062.2, y: 1567.3 },
      europe: { x: 343, y: 688.2 },
    },
    teksti: 'Mont Blanc kohoaa Alpeilla 4 807 metriin ja on Kaukasuksen ulkopuolisen Euroopan '
      + 'korkein vuori. Huippu on täsmälleen Ranskan ja Italian rajalla, ja se on myös maailman '
      + 'yhdenneksitoista topografisesti hallitsevin vuori. Isoisän matkan aikaan huipulle '
      + 'nousu oli jo vakiintunut urheilulaji: alppikiipeily oli syntynyt Chamonix\'n laaksossa '
      + 'vuoren juurella.',
    lahde: 'en-Wikipedia "Mont Blanc", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'vignemale',
    nimi: 'Vignemale',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi huippu on jaettu kahden maan kesken?',
      'Millaista on Pyreneiden jäätikkö nykyään?',
    ],
    nappi: 'Pyreneiden korkein Ranskan puolella',
    // -0.1431 E / 42.7767 N — en-Wikipedia "Vignemale"
    laudat: {
      maailmankartta: { x: 5828.6, y: 1692.4 },
      europe: { x: 208.5, y: 768.6 },
    },
    teksti: 'Vignemale on 3 298 metriä korkea ja Ranskan puolen Pyreneiden korkein huippu. Se '
      + 'seisoo suoraan rajalla: läntinen puoli kuuluu Hautes-Pyrénées\'n departementtiin '
      + 'Ranskassa ja itäinen Huescan maakuntaan Aragoniassa Espanjassa, ja itse huippu on '
      + 'jaettu kahtia maiden kesken.',
    lahde: 'en-Wikipedia "Vignemale", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'valimeri',
    nimi: 'Välimeri',
    tyyppi: 'meri',
    kysymykset: [
      'Kuinka kapea Gibraltarinsalmi todella on?',
      'Miksi Välimeri on niin suolainen?',
    ],
    korostukset: ['Gibraltarinsalmi|Gibraltarinsalmen'],
    nappi: 'Meri kolmen maanosan välissä',
    // 5.5 E / 42.6 N — Lioninlahden ulappa Ranskan rannikon edustalla — nimikilven paikka lehdellä, ei täsmäpiste
    laudat: {
      maailmankartta: { x: 6016.7, y: 1699.5 },
      europe: { x: 316.8, y: 773.2 },
    },
    teksti: 'Välimeri on maanosien välinen meri Euroopan, Aasian ja Afrikan keskellä, ja maa '
      + 'ympäröi sen lähes kokonaan. Lännessä se yhtyy Atlanttiin Gibraltarinsalmen kautta, '
      + 'joka erottaa Iberian niemimaan Marokosta vain neljäntoista kilometrin levyisenä. '
      + 'Idässä Bosporinsalmi vie Mustallemerelle ja kaakossa Suezin kanava Punaisellemerelle — '
      + 'jälkimmäinen oli isoisän matkan aikaan aivan uusi, avattu 1869.',
    lahde: 'en-Wikipedia "Mediterranean Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'biskajanlahti',
    nimi: 'Biskajanlahti',
    tyyppi: 'meri',
    kysymykset: [
      'Miksi Biskajanlahti on niin pahamaineinen merenkulkijoille?',
      'Mitä eläimiä lahdella tapaa?',
    ],
    nappi: 'Atlantin myrskyisä poukama',
    // -3.2 E / 45.3 N — lahden ulappa Ranskan ja Espanjan rannikoiden välissä; artikkelin oma keskipiste on -4,4 / 45,5
    laudat: {
      maailmankartta: { x: 5726.7, y: 1589.4 },
      europe: { x: 149.8, y: 702.2 },
    },
    teksti: 'Biskajanlahti on Koillis-Atlantin lahti Kelttienmeren eteläpuolella. Se ulottuu '
      + 'Espanjan pohjoisrannikkoa pitkin Ranskan rajalta Ortegalinniemelle ja Ranskan '
      + 'länsirannikkoa pitkin Penmarc\'hinniemeltä etelään Espanjan rajalle asti. Purjelaivojen '
      + 'aikaan lahti oli merimiesten pelätyimpiä paikkoja Euroopassa.',
    lahde: 'en-Wikipedia "Bay of Biscay", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'loire',
    nimi: 'Loire',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Loiren varrella on niin paljon linnoja?',
      'Miksi Loire on niin matala kesäisin?',
    ],
    nappi: 'Ranskan pisin joki',
    // 1.909 E / 47.902 N — Orléans, joen suuren mutkan pohjoisin kohta — piste valittu uoman keskijuoksulta, jotta nimiö saa tilaa
    laudat: {
      maailmankartta: { x: 5897, y: 1480.4 },
      europe: { x: 247.9, y: 633.8 },
    },
    teksti: 'Loire on Ranskan pisin joki: 1 006 kilometriä ja maailman jokien pituusjärjestyksessä '
      + 'sadaskahdeksaskymmenesensimmäinen. Sen valuma-alue on 117 054 neliökilometriä eli yli '
      + 'viidennes koko Ranskasta, mutta virtaama on silti vain puolet Rhônen vastaavasta. Joki '
      + 'kaartaa Keskiylängöltä pohjoiseen Orléansiin asti ja kääntyy siellä länteen kohti '
      + 'Atlanttia.',
    lahde: 'en-Wikipedia "Loire", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'rhone',
    nimi: 'Rhône',
    tyyppi: 'joki',
    kysymykset: [
      'Mikä Camargue on?',
      'Miten Rhône muuttuu Genevenjärvessä?',
    ],
    korostukset: ['Camargue|Camargue-alueen'],
    nappi: 'Joki, joka tulee jäätiköltä',
    // 4.83 E / 44.93 N — Rhônen laakso Valencen kohdalla; artikkelin koordinaatti 4,846 / 43,331 on suistossa Arles'n luona
    laudat: {
      maailmankartta: { x: 5994.3, y: 1604.7 },
      europe: { x: 303.9, y: 711.9 },
    },
    teksti: 'Rhône saa alkunsa Alpeilta, virtaa Genevenjärven läpi ja kääntyy Kaakkois-Ranskan '
      + 'halki etelään Välimerelle. Arles\'n kohdalla lähellä suistoa joki jakautuu kahdeksi '
      + 'haaraksi, Suureksi ja Pieneksi Rhôneksi, ja niiden väliin jäävä suistomaa on '
      + 'Camargue-alueen kosteikko. Se on Ranskan ja Sveitsin yhteinen joki: alkulähde on '
      + 'Sveitsin puolella.',
    lahde: 'en-Wikipedia "Rhône", johdanto-osa (tarkistettu 29.8.2026).',
  },
  /* ================================================================
   * K2-ERÄ 4 6.9.2026 — KUUSI KOHDETTA. Perustelut tiedoston alussa.
   * Uusilla kohteilla on vain maailmankartan rivi: Euroopan
   * erillislaudasta on luovuttu (Raamattu 30.8.2026), eikä uutta
   * `europe`-koordinaattia siksi lasketa. Yllä olevien maastokohteiden
   * vanhoihin riveihin ei ole koskettu.
   * ============================================================== */
  {
    id: 'mont-saint-michel',
    nimi: 'Mont-Saint-Michel',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi saarta ei koskaan vallattu?',
      'Mihin luostaria käytettiin Ancien régimen aikana?',
    ],
    korostukset: ['vuorovesi|nouseva vuorovesi'],
    nappi: 'Saari, jonka vuorovesi puolusti',
    // -1.511 E / 48.636 N — en-Wikipedia "Mont-Saint-Michel";
    // lähin pelikaupunki Pariisi 128,4 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5783, y: 1449.1 },
    },
    teksti: 'Mont-Saint-Michel on vuorovesisaari ja kunta Normandiassa. Saari on noin '
      + 'kilometrin päässä Ranskan luoteisrannikosta Couesnon-joen suulla lähellä '
      + 'Avranchesia, ja sen pinta-ala on seitsemän hehtaaria. Vuonna 2023 saarella '
      + 'asui 23 ihmistä.\n\n'
      + 'Sijainti teki saaresta sekä helposti tavoitettavan että vaikeasti '
      + 'valloitettavan. Luostariin pyrkivät pyhiinvaeltajat pääsivät perille '
      + 'laskuveden aikaan, mutta nouseva vuorovesi jätti jalan liikkuvan hyökkääjän '
      + 'loukkuun, ajoi hänet takaisin tai hukutti hänet. Saari säilyi valtaamattomana '
      + 'koko satavuotisen sodan ajan: pieni varuskunta torjui englantilaisten '
      + 'täysimittaisen hyökkäyksen 1433.\n\n'
      + 'Ludvig XI ymmärsi luonnonpuolustuksen hyödyn ja teki saaresta vankilan, ja '
      + 'luostaria käytettiin vankilana säännöllisesti koko Ancien régimen ajan. '
      + 'Mont-Saint-Michel ja sitä ympäröivä lahti otettiin maailmanperintöluetteloon '
      + '1979. Kävijöitä on yli kolme miljoonaa vuodessa, mikä tekee siitä Pariisin '
      + 'ulkopuolisen Ranskan käydyimmän nähtävyyden; yli kuusikymmentä kunnan '
      + 'rakennusta on suojeltu historiallisina monumentteina.',
    lahde: 'en-Wikipedia "Mont-Saint-Michel", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'carcassonnen-linnoituskaupunki',
    nimi: 'Carcassonnen linnoituskaupunki',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka ennallisti kaupungin 1800-luvulla?',
      'Kuinka pitkä kaksoismuuri on?',
    ],
    korostukset: ['Eugène Viollet-le-Duc|Eugène Viollet-le-Duc'],
    nappi: 'Kolme kilometriä kaksoismuuria',
    // 2.364 E / 43.2066 N — en-Wikipedia "Cité de Carcassonne";
    // lähin pelikaupunki Barcelona 68,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5912.1, y: 1675 },
    },
    teksti: 'Carcassonnen linnoituskaupunki on keskiaikainen linnoitettu kaupunki '
      + 'Auden departementissa Etelä-Ranskassa. Se kohoaa kukkulalla Aude-joen '
      + 'oikealla rannalla nykyisen Carcassonnen kaakkoisosassa. Maineensa se saa '
      + 'kolme kilometriä pitkästä kaksoismuurista, jota rytmittää 52 tornia.\n\n'
      + 'Paikalla on noin 2 500 vuoden historia. Ensin siinä oli gallialainen '
      + 'asuinpaikka; 200-luvulla jaa. roomalaiset päättivät tehdä siitä linnoitetun '
      + 'kaupungin, ja puolustuslaitteet olivat valmiit vuoteen 333 mennessä, jolloin '
      + 'paikkaa kuvattiin sanalla castellum. Alkuperäistä muuria tuki 34–40 tornia, '
      + 'joiden väli oli 18–30 metriä; kukin torni oli puoliympyrän muotoinen ja noin '
      + 'neljätoista metriä korkea. Visigootit rakensivat muurit uudelleen 400- ja '
      + '500-luvuilla, mutta alkuperäinen rakenne säilyi.\n\n'
      + '1800-luvun lopulla arkkitehti ja teoreetikko Eugène Viollet-le-Duc ennallisti '
      + 'linnoituksen. Vuonna 1997 se otettiin maailmanperintöluetteloon '
      + 'poikkeuksellisena todisteena keskiaikaisen linnoituskaupungin arkkitehtuurista '
      + 'ja kaavoituksesta.',
    lahde: 'en-Wikipedia "Cité de Carcassonne", johdanto-osa sekä osiot "Early '
      + 'history" ja "Middle Ages" (tarkistettu 6.9.2026).',
  },
  {
    id: 'lascaux',
    nimi: 'Lascaux',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka löysi luolan ja miten?',
      'Miksi luola suljettiin yleisöltä?',
    ],
    korostukset: ['magdalénien|magdalénien-kautta'],
    nappi: 'Koira, joka löysi kuusisataa maalausta',
    // 1.17 E / 45.0536 N — en-Wikipedia "Lascaux";
    // lähin pelikaupunki Barcelona 141,8 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5872.3, y: 1599.6 },
    },
    teksti: 'Lascaux on luolasto lähellä Montignacin kylää Dordognen departementissa '
      + 'Lounais-Ranskassa. Sen seiniä ja kattoja peittää yli kuusisataa maalausta, '
      + 'enimmäkseen suuria eläimiä — juuri niitä lajeja, joita seudun fossiiliaineisto '
      + 'ylemmältä paleoliittiselta kaudelta tuntee. Maalaukset ovat monen sukupolven '
      + 'yhteinen työ, ja niiden iäksi arvioidaan tavallisesti 17 000–22 000 vuotta eli '
      + 'varhaista magdalénien-kautta.\n\n'
      + 'Luolan suuaukko löytyi 12. syyskuuta 1940, kun 18-vuotiaan Marcel Ravidat\'n '
      + 'koira tutki kaatuneen puun jättämää kuoppaa. Ravidat palasi paikalle kolmen '
      + 'ystävänsä kanssa, ja he laskeutuivat viidentoista metrin syvyiseen kuiluun '
      + 'uskoen sen olevan tarunomainen salakäytävä läheiseen kartanoon. Käytäville '
      + 'annettiin omat nimensä: Härkien sali, Käytävä, Kuilu, Laiva, Apsis ja '
      + 'Kissaeläinten kammio.\n\n'
      + 'Lascaux otettiin maailmanperintöluetteloon 1979 osana Vézèren laakson '
      + 'esihistoriallisia kohteita. Alkuperäiset luolat on suljettu yleisöltä '
      + 'vuodesta 1963, koska niiden kunto heikkeni nopeasti; nykyään nähtävillä on '
      + 'jäljennöksiä.',
    lahde: 'en-Wikipedia "Lascaux", johdanto-osa ja osio "History since rediscovery" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'chartresin-katedraali',
    nimi: 'Chartresin katedraali',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi katedraalin ikkunat ovat niin suuria?',
      'Mikä Sancta Camisa on?',
    ],
    korostukset: ['tukikaari|tukikaaret'],
    nappi: 'Lasit, jotka selvisivät kahdeksansataa vuotta',
    // 1.4878 E / 48.4478 N — en-Wikipedia "Chartres Cathedral";
    // lähin pelikaupunki Pariisi 32,9 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5882.9, y: 1457.1 },
    },
    teksti: 'Chartresin katedraali on katolinen katedraali Chartresissa, noin '
      + 'kahdeksankymmentä kilometriä Pariisista lounaaseen. Se on omistettu Neitsyt '
      + 'Marialle ja rakennettiin pääosin vuosina 1194–1220. Paikalla on ollut ainakin '
      + 'viisi katedraalia siitä lähtien, kun Chartresin hiippakunta perustettiin '
      + '300-luvulla. Rakennusta pidetään korkeagotiikan tunnetuimpana ja '
      + 'vaikutusvaltaisimpana esimerkkinä, ja Unesco kutsui sitä 1979 ranskalaisen '
      + 'gotiikan huippukohdaksi.\n\n'
      + 'Ulkoa katedraalia hallitsevat raskaat tukikaaret, jotka siirtävät holvien '
      + 'painon seinien ulkopuolelle. Juuri siksi ikkunat voitiin tehdä paljon '
      + 'suuremmiksi kuin ennen — ja suurin osa alkuperäisistä lasimaalauksista on '
      + 'säilynyt ehjänä. Arkkitehtuuriin on tehty vain vähäisiä muutoksia 1200-luvun '
      + 'alun jälkeen.\n\n'
      + 'Länsipäädyn kaksi tornia ovat keskenään erilaiset: toinen on noin 1160 '
      + 'valmistunut 105-metrinen sileä pyramidi, toinen 113-metrinen liekkigotiikan '
      + 'huippu vuosilta 1507–1513 vanhemman tornin päällä. Kolmea suurta julkisivua '
      + 'koristavat sadat veistetyt hahmot. Katedraali on ollut matkakohde ainakin '
      + '1100-luvulta lähtien; pyhiinvaeltajat tulevat kunnioittamaan Sancta Camisa '
      + '-reliikkiä, jonka kerrotaan olevan Neitsyt Marian yllään pitämä paita '
      + 'Kristuksen syntymän hetkellä.',
    lahde: 'en-Wikipedia "Chartres Cathedral", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'pont-du-gard',
    nimi: 'Pont du Gard',
    tyyppi: 'tekniikka',
    kysymykset: [
      'Kuinka loivasti akvedukti laskee?',
      'Miksi silta säilyi Rooman jälkeen?',
    ],
    korostukset: ['Nemausus|Nemausukseen'],
    nappi: 'Sentti kahdessasadassa metrissä',
    // 4.5356 E / 43.9472 N — en-Wikipedia "Pont du Gard";
    // lähin pelikaupunki Marseille 25,7 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5984.5, y: 1644.9 },
    },
    teksti: 'Pont du Gard on roomalainen akveduktisilta, joka rakennettiin '
      + 'ensimmäisellä vuosisadalla jaa. viemään vettä yli viidenkymmenen kilometrin '
      + 'matkan Nemausukseen eli nykyiseen Nîmesiin. Se ylittää Gardon-joen '
      + 'Vers-Pont-du-Gardin kylän lähellä Etelä-Ranskassa ja on yksi parhaiten '
      + 'säilyneistä roomalaisista akveduktisilloista. Unesco otti sen luetteloonsa '
      + '1985.\n\n'
      + 'Sillassa on kolme kaarikerrosta simpukkakalkkikivestä, ja se on 48,8 metriä '
      + 'korkea. Akvedukti kuljetti arviolta 40 000 kuutiometriä vettä vuorokaudessa. '
      + 'Rakennustyön tarkkuus näkyy kaltevuudessa: vesi laskee keskimäärin '
      + 'senttimetrin 182,4 metriä kohti. Vesi kulki mahdollisesti vielä 500-luvulla, '
      + 'mutta kun huolto loppui 300-luvun jälkeen, kivettymät ja roskat tukkivat '
      + 'uoman.\n\n'
      + 'Rooman valtakunnan hajottua silta säilyi lähes ehjänä, koska sille löytyi uusi '
      + 'tehtävä: siitä tuli tullisilta. Paikalliset herrat ja piispat vastasivat '
      + 'kunnossapidosta ja saivat vastineeksi oikeuden periä maksua ylittäjiltä. '
      + 'Kivilohkareita silti vietiin, ja 1600-luvulla silta vaurioitui pahoin. '
      + 'Korjauksia tehtiin 1700-luvulta 2000-luvulle, ja vuonna 2000 avattiin uusi '
      + 'vierailukeskus ja liikenne siirrettiin pois sillalta.',
    lahde: 'en-Wikipedia "Pont du Gard", johdanto-osa ja osio "Description" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'carnacin-kivirivit',
    nimi: 'Carnacin kivirivit',
    tyyppi: 'historia',
    kysymykset: [
      'Kuinka monta pystykiveä alueella on?',
      'Mitä tarut kertovat kivistä?',
    ],
    korostukset: ['menhiri|menhirejä'],
    nappi: 'Kolmetuhatta kiveä riveissä',
    // -3.0639 E / 47.5972 N — en-Wikipedia "Carnac stones";
    // lähin pelikaupunki Pariisi 187,6 lautayksikön päässä.
    laudat: {
      maailmankartta: { x: 5731.2, y: 1493.3 },
    },
    teksti: 'Carnacin kivirivit ovat poikkeuksellisen tiheä megaliittikeskittymä '
      + 'Bretagnen etelärannikon tuntumassa Luoteis-Ranskassa. Kokonaisuuteen kuuluu '
      + 'kivirivistöjä, dolmeneja eli kivihautoja, hautakumpuja ja yksittäisiä '
      + 'menhirejä. Paikallisesta graniitista veistettyjä pystykiviä on yli '
      + 'kolmetuhatta, ja ne pystytti Bretagnen esikelttiläinen väestö; suurempaa '
      + 'keskittymää ei tunneta maailmasta.\n\n'
      + 'Suurin osa kivistä on Carnacin kunnan alueella, osa idempänä La '
      + 'Trinité-sur-Merissä. Ne pystytettiin neoliittisella kaudella, todennäköisesti '
      + 'noin 3300 eaa., mutta jotkin saattavat olla peräisin jo ajalta 4500 eaa.\n\n'
      + 'Kivet ovat synnyttäneet omat tarunsa. Kristillisen legendan mukaan ne olivat '
      + 'pakanasotilaita, jotka ajoivat takaa paavi Corneliusta, kunnes tämä muutti '
      + 'heidät kiveksi. Bretagnessa on myös oma versionsa Arthur-taruista, ja '
      + 'paikallinen perimätieto selittää kivirivien suoruuden sillä, että kyseessä on '
      + 'velho Merlinin kivettämä roomalainen legioona. Viime vuosisatoina kohteita on '
      + 'kohdeltu huonosti: dolmeneja on käytetty lammassuojina, kanaloina ja jopa '
      + 'uuneina, ja kiviä on viety teiden ja rakennusten aineeksi.',
    lahde: 'en-Wikipedia "Carnac stones", johdanto-osa (tarkistettu 6.9.2026).',
  },
];

