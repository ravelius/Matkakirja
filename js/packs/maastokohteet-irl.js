/*
 * MAASTOKOHTEET — IRL. Maan vuoret, meret ja joet napautettaviksi.
 *
 * Omistajan päätös 29.8.2026: *"Tee vuoret ja meret avattaviksi
 * kaikkiin maihin."* Tähän asti maasto on ollut fokuslehdellä pelkkää
 * kuvaa: Kreikan Ólympos on ollut napautettava, mutta useimpien maiden
 * huiput ja vesistöt eivät ole olleet mitään.
 *
 * KOORDINAATIT ON LASKETTU KONEELLA, TEKSTIT KIRJOITETTU KÄSIN.
 * Tiedoston runko on tuotettu työkalulla
 * `node tools/johda-maastokohteet.mjs IRL --runko`, jonka lähtöaineisto
 * on tools/maastoaineisto/IRL.json. Työkalu laskee laudan
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
 * Irlannin maastokohteet. Faktat en-Wikipediasta 29.8.2026. Pieni maa: kolme kohdetta.
 *
 * ── K2-ERÄ 2 6.9.2026: KAHDEKSAN KOHDETTA MAASTON RINNALLE ─────────
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Irlanti oli erän 2 heikoimpia: nolla kuratoitua kohdetta ja
 * kaksitoista karttamerkkiä (docs/moduulit/karttanostot-kattavuus.md).
 * Tavoite on kahdeksan KOHDETTA maastokohteiden lisäksi, ja tässä ne
 * ovat — sama malli kuin erässä 1 (js/packs/maastokohteet-isl.js).
 *
 * MIKSI NE OVAT TÄSSÄ TIEDOSTOSSA EIVÄTKÄ fokuskohteet-irl.js:ssä.
 * Kohdepakki tarvitsisi rivin js/fokuskohteet.js:n KOHDE_MAAT-tauluun
 * ja lehden poltettujen nimien lohkon (js/packs/fokus-grc.js
 * FOKUS_LISANIMET, tests/fokusnimet.test.mjs). Kumpaakaan ei tehdä
 * tässä erässä: KOHDE_MAAT on rinnakkaisen erän hallussa, ja
 * lisänimien lohko ladotaan ämpärin `<ISO>.json`-tiedostosta, jota
 * repossa ei ole. Tämän tiedoston lista sen sijaan liittyy peliin
 * hakemiston kautta (js/packs/maastokohteet.js), joten kohteet ovat
 * kartalla heti — ja kun KOHDE_MAAT vapautuu, lohko siirtyy omaan
 * pakkiinsa sellaisenaan.
 *
 * KAIKKI KAHDEKSAN OVAT KAUKANA PELIKAUPUNGISTA. Lähinkin (Tarán
 * kukkula) on 15,1 lautayksikön päässä Dublinista, eli reilusti yli
 * kaupungin kohdalla -säteen (KAUPUNGIN_KOHDALLA_SADE 7,
 * js/fokuskohteet.js). Yksikään ei siis kuulu kohdekartalle, vaan
 * kaikki ovat pääkartan merkkejä.
 *
 * KUVATON ERÄ. Sama linja kuin maastokohteilla muutenkin: kortti kantaa
 * tekstin ja lähteen, ei kuvaa. Tarkistamaton Commons-tiedosto olisi
 * huonompi kuin kuvaton kortti (Perustuslaki, faktakuri). Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_IRL = [
  {
    id: 'carrauntoohil',
    nimi: 'Carrauntoohil',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi Corrán Tuathail tarkoittaa?',
      'Mikä on Devil\'s Ladder?',
    ],
    korostukset: ['MacGillycuddy\'s Reeks|MacGillycuddy\'s Reeks'],
    nappi: 'Irlannin korkein vuori',
    // -9.7427 E / 51.9994 N — en-Wikipedia "Carrauntoohil"
    laudat: {
      maailmankartta: { x: 5508.6, y: 1302.1 },
      europe: { x: 24.1, y: 526 },
    },
    teksti: 'Carrauntoohil on Irlannin korkein vuori, 1 038,6 metriä. Se on Iveraghin niemimaalla '
      + 'Kerryn kreivikunnassa lähellä maan korkeimman vuorijonon MacGillycuddy\'s Reeksin '
      + 'keskustaa. Vuori on pääosin hiekkakiveä, jonka jäätiköityminen on veistänyt jyrkiksi '
      + 'rotkoiksi ja teräviksi harjanteiksi itä- ja koillisseinämiin. Irlanninkielinen nimi '
      + 'Corrán Tuathail tarkoittaa Tuathalin sirppiä.',
    lahde: 'en-Wikipedia "Carrauntoohil", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'irlanninmeri',
    nimi: 'Irlanninmeri',
    tyyppi: 'meri',
    kysymykset: [
      'Mikä Yrjönkanaali on?',
      'Miksi Mansaari on oma alueensa?',
    ],
    nappi: 'Kahden saaren välinen meri',
    // -5.6 E / 53.4 N — ulappa Irlannin itärannikon edustalla; artikkelin oma keskipiste on -5 / 53,5
    laudat: {
      maailmankartta: { x: 5646.7, y: 1239.1 },
      europe: { x: 103.7, y: 489.2 },
    },
    teksti: 'Irlanninmeri on 46 007 neliökilometrin vesialue, joka erottaa Irlannin saaren '
      + 'Isosta-Britanniasta. Etelässä se yhtyy Kelttienmereen Yrjönkanaalin kautta ja '
      + 'pohjoisessa Skotlannin länsipuolisiin sisämeriin Pohjoiskanaalin kautta. Sen suurin '
      + 'saari on Anglesey Pohjois-Walesissa ja toiseksi suurin Mansaari.',
    lahde: 'en-Wikipedia "Irish Sea", johdanto-osa (tarkistettu 29.8.2026).',
  },
  {
    id: 'shannon',
    nimi: 'Shannon',
    tyyppi: 'joki',
    kysymykset: [
      'Miksi Shannonin pituudesta ei päästä yksimielisyyteen?',
      'Mikä on Shannon Pot?',
    ],
    korostukset: ['Shannon Pot|Shannon Pot'],
    nappi: 'Brittein saarten pisin joki',
    // -8.66 E / 52.657 N — en-Wikipedia "River Shannon" (Limerickin seutu joen alajuoksulla)
    laudat: {
      maailmankartta: { x: 5544.7, y: 1272.7 },
      europe: { x: 44.9, y: 508.7 },
    },
    teksti: 'Kukaan ei tiedä varmasti, kuinka pitkä Irlannin pisin joki on. Perinteinen luku on 390 '
      + 'kilometriä, virallinen irlantilainen lähde sanoo 360,5, oppaat 344 ja osa tutkijoista '
      + '280 — ja moni kieltäytyy antamasta lukua lainkaan. Syy on yksinkertainen: suistoon '
      + 'laskevalla joella ei ole selvää loppua. Alku sen sijaan tunnetaan tarkasti. Shannon '
      + 'Pot on pieni lampi Cuilcagh-vuoren rinteellä Cavanin kreivikunnassa, ja siitä joki '
      + 'lähtee taimenpuron kokoisena — mutta mittaukset ovat osoittaneet, että sen vesi tulee '
      + 'nielukuiluista kilometrien päästä, osa jopa Pohjois-Irlannin puolelta. Shannon jakaa '
      + 'saaren idän ja lännen: Dowran ja Limerickin välillä sen yli pääsee alle '
      + 'kolmestakymmenestäviidestä kohdasta.',
    lahde: 'en-Wikipedia "River Shannon", johdanto-osa ja osio "Course" (tarkistettu 1.9.2026).',
  },
  /* ================================================================
   * K2-ERÄ 2, 6.9.2026 — KAHDEKSAN KOHDETTA. Perustelut tiedoston alussa.
   * ============================================================== */
  {
    id: 'newgrange',
    nimi: 'Newgrange',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä talvipäivänseisauksena tapahtuu?',
      'Kumpi on vanhempi, Newgrange vai Stonehenge?',
    ],
    korostukset: ['kattoaukko|kattoaukosta'],
    nappi: 'Vanhempi kuin pyramidit',
    // -6.4756 E / 53.6947 N — en-Wikipedia "Newgrange"
    laudat: {
      maailmankartta: { x: 5617.5, y: 1225.8 },
      europe: { x: 86.9, y: 481.4 },
    },
    teksti: 'Newgrange on esihistoriallinen monumentti Meathin kreivikunnassa kummulla, '
      + 'josta on näkymä Boyne-joelle, kahdeksan kilometriä Droghedasta länteen. Se on '
      + 'poikkeuksellisen suuri käytävähauta neoliittiselta kaudelta noin 3100 eaa. — '
      + 'vanhempi kuin Stonehenge ja Egyptin pyramidit.\n\n'
      + 'Newgrange on Brú na Bóinnen kokonaisuuden päämonumentti. Samaan '
      + 'maailmanperintökohteeseen kuuluvat myös Knowthin ja Dowthin käytävähaudat sekä '
      + 'muita hautakumpuja ja pystykiviä.\n\n'
      + 'Rakennelma on suuri pyöreä kumpu, jonka sisällä on kivikäytävä ja ristinmuotoinen '
      + 'kammio. Kammiosta on löytynyt sekä poltettuja että polttamattomia ihmisen luita ja '
      + 'mahdollisia hauta- tai uhrilahjoja. Julkisivu on tehty enimmäkseen valkoisista '
      + 'kvartsimukulakivistä, ja monet suurista kivistä on peitetty megaliittitaiteella.\n\n'
      + 'Tarkoituksesta ei ole yksimielisyyttä, mutta hauta on suunnattu tarkasti: '
      + 'talvipäivänseisauksena nouseva aurinko paistaa sisäänkäynnin yläpuolisesta '
      + 'kattoaukosta ja täyttää sisimmän kammion valolla. Ensimmäinen käyttöjakso kesti '
      + 'noin tuhat vuotta, minkä jälkeen kumpu rappeutui — mutta paikalla jatkui '
      + 'rituaalitoiminta, ja se säilyi irlantilaisessa mytologiassa Dagdan ja hänen '
      + 'poikansa Aenguksen asuinsijana.',
    lahde: 'en-Wikipedia "Newgrange", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'taran-kukkula',
    nimi: 'Tarán kukkula',
    tyyppi: 'sana',
    kysymykset: [
      'Mitä nimi Temair tarkoittaa?',
      'Mikä Lia Fáil on?',
    ],
    korostukset: ['Lia Fáil|Lia Fáilina'],
    nappi: 'Ylikuninkaiden kukkula',
    // -6.6119 E / 53.5775 N — en-Wikipedia "Hill of Tara"
    laudat: {
      maailmankartta: { x: 5612.9, y: 1231.1 },
      europe: { x: 84.3, y: 484.5 },
    },
    teksti: 'Tarán kukkula on muinainen seremonia- ja hautapaikka Skrynen lähellä Meathin '
      + 'kreivikunnassa. Perimätieto pitää kukkulaa Irlannin ylikuninkaiden '
      + 'virkaanasettamispaikkana ja istuimena, ja se esiintyy myös irlantilaisessa '
      + 'mytologiassa.\n\n'
      + 'Nimi Tara on englanninnos iirin sanasta Teamhair; muinaisiiriksi Temair. Sen '
      + 'uskotaan tulevan kantakelttiläisestä sanasta, joka tarkoittaa pyhäkköä tai '
      + 'seremoniaa varten erotettua pyhää tilaa — samaa juurta ovat kreikan temenos ja '
      + 'latinan templum. Toisen tulkinnan mukaan se tarkoittaa korkeaa paikkaa, jolta on '
      + 'näköala.\n\n'
      + 'Näkyvissä on kahdenkymmenen muinaisjäännöksen jäänteet, ja geofysikaaliset '
      + 'mittaukset ja ilmakuvat ovat paljastaneet ainakin kolme kertaa niin monta. '
      + 'Kukkulalla on käytävähauta, hautakumpuja, pyöreitä aitauksia, seremonia-avenue ja '
      + 'pystykivi, jota pidetään Lia Fáilina eli kohtalon kivenä. Kukkulalla on myös '
      + 'kirkko ja hautausmaa.\n\n'
      + 'Vanhin näkyvä muinaisjäännös on Dumha na nGiall, Panttivankien kumpu: noin 3200 '
      + 'eaa. rakennettu käytävähauta, jossa on satojen ihmisten jäänteet, enimmäkseen '
      + 'poltettuja luita. Sen viimeinen hautaus oli korkea-arvoisen nuoren miehen ruumis '
      + 'koristeellisine kaulakoruineen ja tikareineen.',
    lahde: 'en-Wikipedia "Hill of Tara", johdanto-osa sekä osiot "Name" ja "Ancient '
      + 'monuments" (tarkistettu 6.9.2026).',
  },
  {
    id: 'clonmacnoise',
    nimi: 'Clonmacnoise',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi luostari rakennettiin juuri tähän?',
      'Mikä Eiscir Riada on?',
    ],
    korostukset: ['Eiscir Riada|Eiscir Riadan'],
    nappi: 'Risteys soiden keskellä',
    // -7.9911 E / 53.3239 N — en-Wikipedia "Clonmacnoise"
    laudat: {
      maailmankartta: { x: 5567, y: 1242.6 },
      europe: { x: 57.8, y: 491.2 },
    },
    teksti: 'Clonmacnoise on luostarin rauniot Offalyn kreivikunnassa Shannon-joen varrella '
      + 'Athlonesta etelään. Pyhä Ciarán perusti sen vuonna 544, ja 800-luvulle asti '
      + 'luostarilla oli läheiset suhteet Connachtin kuninkaisiin.\n\n'
      + 'Paikka valittiin risteyksen takia. Irlannin suuri itä–länsisuuntainen maareitti '
      + 'Slighe Mhór ylittää Shannonin juuri tässä, kuljettuaan Keski-Irlannin soiden yli '
      + 'Eiscir Riadan harjua pitkin — harju on jääkauden vetäytyvien jäätiköiden jättämä. '
      + 'Sijainti teki luostarista 800-luvulle mennessä uskonnon, oppineisuuden, käsityön ja '
      + 'kaupan keskuksen.\n\n'
      + 'Yhdessä Clonardin kanssa Clonmacnoise oli Irlannin kuuluisimpia paikkoja, ja sinne '
      + 'tuli oppineita eri puolilta Eurooppaa. Monet Taran ylikuninkaista ja Connachtin '
      + 'kuninkaista haudattiin tänne.\n\n'
      + 'Luostari jäi suurelta osin autioksi 1200-luvun loppuun mennessä. Nykyään paikalla '
      + 'on yhdeksän kirkon rauniot, linna, kaksi pyöreää tornia sekä suuri joukko '
      + 'kaiverrettuja kivisiä ristejä ja ristilaattoja.',
    lahde: 'en-Wikipedia "Clonmacnoise", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'rock-of-cashel',
    nimi: 'Rock of Cashel',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka kruunattiin kalliolla vuonna 977?',
      'Mitä tarun mukaan tapahtui Devil’s Bitissä?',
    ],
    korostukset: ['Brian Boru|Brian Boru'],
    nappi: 'Munsterin kuninkaiden kallio',
    // -7.89 E / 52.52 N — en-Wikipedia "Rock of Cashel"
    laudat: {
      maailmankartta: { x: 5570.3, y: 1278.9 },
      europe: { x: 59.7, y: 512.3 },
    },
    teksti: 'Rock of Cashel on historiallinen paikka, joka kohoaa näyttävästi tasangon yllä '
      + 'Cashelissa Tipperaryn kreivikunnassa. Iiriksi se on Carraig Phádraig, Patrickin '
      + 'kallio.\n\n'
      + 'Paikallinen taru kertoo, että kallio sinkoutui tänne Devil’s Bit -vuoresta '
      + 'kolmenkymmenen kilometrin päästä pohjoisesta, kun pyhä Patrick karkotti Saatanan '
      + 'luolasta. Pyhän Patrickin kolmiosaisen elämäkerran mukaan Cashel on myös se paikka, '
      + 'jossa Patrick käännytti Munsterin kuninkaan 400-luvulla.\n\n'
      + 'Kallio oli Munsterin kuninkaiden perinteinen istuin jo 300-luvulla. 400-luvulla '
      + 'Eóganachta-suku rakensi sinne linnoituksen ja piti valtaa satojen vuosien ajan. '
      + 'Vuonna 977 Brian Boru kruunattiin kalliolla kuninkaaksi ja teki Cashelista '
      + 'pääkaupunkinsa. Vuonna 1101 Munsterin kuningas Muirchertach Ua Briain lahjoitti '
      + 'linnoituksensa kirkolle.\n\n'
      + 'Varhaisista rakennuksista on jäljellä vähän: valtaosa nykyisistä on 1100- ja '
      + '1200-luvuilta. Vuonna 1647 Irlannin konfederaatiosotien aikana Englannin '
      + 'parlamentin joukot ryöstivät Cashelin ja surmasivat sekä puolustajat että '
      + 'katolisen papiston.',
    lahde: 'en-Wikipedia "Rock of Cashel", johdanto-osa ja osio "History" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'skellig-michael',
    nimi: 'Skellig Michael',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä sana sceilig tarkoittaa?',
      'Miksi saarelle pääsee vain kesällä?',
    ],
    korostukset: ['sceilig|sceilig'],
    nappi: 'Luostari kallion huipulla',
    // -10.5406 E / 51.7711 N — en-Wikipedia "Skellig Michael"
    laudat: {
      maailmankartta: { x: 5482, y: 1312.3 },
      europe: { x: 8.8, y: 532 },
    },
    teksti: 'Skellig Michael on kaksihuippuinen kallioluoto 11,6 kilometriä Iveraghin '
      + 'niemimaasta länteen Kerryn kreivikunnassa. Saari on nimetty arkkienkeli Mikaelin '
      + 'mukaan, ja Skellig tulee iirin sanasta sceilig, kivensirpale. Sen kaksoissaari '
      + 'Little Skellig on pienempi eikä sinne pääse.\n\n'
      + 'Saarta on noin 22 hehtaaria pelkkää kalliota. Korkein kohta, nimeltään Spit, on '
      + '218 metriä merenpinnan yläpuolella, ja huippujen välissä on laakso nimeltä '
      + 'Kristuksen satula. Maisema on jyrkkä ja epävieraanvarainen.\n\n'
      + 'Saari tunnetaan parhaiten gaelilaisesta luostaristaan, joka perustettiin 500- ja '
      + '700-luvun välillä, sekä lajistostaan: suulia, lunneja, ruokkiyhdyskunta ja noin '
      + 'viidenkymmenen harmaahylkeen kanta. Luostarialue pohjoisella huipulla on '
      + 'arkeologisesti poikkeuksellisen hyvin säilynyt, ja sinne noustaan kapeita ja '
      + 'jyrkkiä kiviportaita kolmesta rantautumispaikasta.\n\n'
      + 'Eteläisen huipun erakkoluolalle johtaa vaarallinen reitti, ja se on suurimmaksi '
      + 'osaksi suljettu yleisöltä. Hankalan ylityksen ja avoimien rantautumispaikkojen '
      + 'takia saarelle pääsee vain kesäkuukausina. Maailmanperintökohde siitä tuli 1996.',
    lahde: 'en-Wikipedia "Skellig Michael", johdanto-osa ja osio "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'ceide-fields',
    nimi: 'Céide Fields',
    tyyppi: 'historia',
    kysymykset: [
      'Miten suon alla olevat muurit kartoitettiin?',
      'Kuka löydön teki?',
    ],
    korostukset: ['keidassuo|keidassuon'],
    nappi: 'Pellot turpeen alla',
    // -9.4578 E / 54.3069 N — en-Wikipedia "Céide Fields"
    laudat: {
      maailmankartta: { x: 5518.1, y: 1197.8 },
      europe: { x: 29.6, y: 465.3 },
    },
    teksti: 'Céide Fields on laaja esihistoriallinen arkeologinen maisema Mayon kreivikunnan '
      + 'pohjoisrannikolla. Iirinkielinen nimi Achaidh Chéide tarkoittaa litteähuippuisen '
      + 'kukkulan peltoja.\n\n'
      + 'Kokonaisuuteen kuuluu kivimuurien rajaamia peltojärjestelmiä, asumisen jälkiä, '
      + 'aitauksia ja megaliittimonumentteja, jotka ovat säilyneet keidassuon alla. '
      + 'Turpeen alle arvioidaan kätkeytyvän yli sata kilometriä peltoja rajaavaa '
      + 'kivimuuria. Perinteisesti maisemaa on tulkittu neoliittiseksi viljelymaisemaksi '
      + 'neljänneltä vuosituhannelta eaa., mutta osa tutkijoista on esittänyt myöhempää, '
      + 'pronssi- tai rautakautista ajoitusta.\n\n'
      + 'Löytö alkoi 1930-luvulla, kun opettaja Patrick Caulfield huomasi turvetta '
      + 'nostaessaan suoria kiviröykkiöitä. Hän päätteli, että kivet olivat ihmisen '
      + 'asettamia, koska niiden asetelma ei ollut luonnollinen — ja koska ne olivat suon '
      + 'alla, niiden oli oltava suota vanhempia.\n\n'
      + 'Löydön merkitys avautui vasta neljäkymmentä vuotta myöhemmin, kun Patrickin poika '
      + 'Seamus arkeologiaa opiskeltuaan alkoi tutkia paikkaa. Piilossa olevat muurit '
      + 'paikannettiin ja kartoitettiin yksinkertaisella keinolla: työntämällä maahan '
      + 'pitkiä T-kirjaimen muotoisia rautatankoja.',
    lahde: 'en-Wikipedia "Céide Fields", johdanto-osa sekä osiot "History" ja "Research and '
      + 'preservation" (tarkistettu 6.9.2026).',
  },
  {
    id: 'moherin-kalliot',
    nimi: 'Moherin kalliot',
    tyyppi: 'muu',
    kysymykset: [
      'Mistä kallioiden nimi tulee?',
      'Miksi vanha linnoitus purettiin?',
    ],
    korostukset: ['Mothar|Mothar-nimisestä'],
    nappi: 'Kaksisataa metriä pystysuoraan Atlanttiin',
    // -9.4263 E / 52.9718 N — en-Wikipedia "Cliffs of Moher"
    laudat: {
      maailmankartta: { x: 5519.1, y: 1258.5 },
      europe: { x: 30.2, y: 500.4 },
    },
    teksti: 'Moherin kalliot ovat merikallioita Burrenin alueen lounaisreunassa Claren '
      + 'kreivikunnassa. Ne jatkuvat noin neljäntoista kilometrin matkan.\n\n'
      + 'Eteläpäässä kalliot kohoavat 120 metriä Atlantin yllä Hag’s Headissa. Kahdeksan '
      + 'kilometriä pohjoisempana ne saavuttavat korkeimman kohtansa, 214 metriä, hieman '
      + 'O’Brienin tornin pohjoispuolella; tornin rakennutti 1835 Sir Cornelius O’Brien. '
      + 'Kallioilta näkyvät Aransaaret Galwaynlahdella sekä Maumturkin ja Twelve Pinsin '
      + 'vuoristot pohjoisessa.\n\n'
      + 'Nimi tulee vanhasta Mothar-nimisestä niemilinnoituksesta, joka seisoi Hag’s '
      + 'Headissa, kallioiden eteläisimmässä kärjessä. Linnoitus oli pystyssä vielä 1780, '
      + 'mutta se purettiin 1808, jotta sen kivistä saatiin rakennettua tähystys- ja '
      + 'lennätintorni varoittamaan ranskalaisten maihinnoususta Napoleonin sotien '
      + 'aikana.\n\n'
      + 'Kalliot ovat Irlannin käydyimpiä matkakohteita: vuonna 2006 ne nousivat '
      + 'nähtävyyksien kärkeen, ja nykyään niillä käy noin 1,5 miljoonaa vierailijaa '
      + 'vuodessa. Vuodesta 2011 alkaen ne ovat kuuluneet Burrenin ja Moherin kallioiden '
      + 'geopuistoon.',
    lahde: 'en-Wikipedia "Cliffs of Moher", johdanto-osa sekä osiot "Name" ja "Tourism" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'kilkennyn-linna',
    nimi: 'Kilkennyn linna',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Paljonko linnasta maksettiin vuonna 1967?',
      'Miksi linna rakennettiin juuri tähän?',
    ],
    korostukset: ['Strongbow|Strongbow'],
    nappi: 'Linna, joka myytiin viidelläkymmenellä punnalla',
    // -7.2492 E / 52.6503 N — en-Wikipedia "Kilkenny Castle"
    laudat: {
      maailmankartta: { x: 5591.7, y: 1273 },
      europe: { x: 72, y: 508.9 },
    },
    teksti: 'Kilkennyn linna rakennettiin vuonna 1260 valvomaan Nore-joen kahluupaikkaa ja '
      + 'useiden teiden risteystä. Se oli normannivallan näkyvä merkki, ja alkuperäisessä '
      + '1200-luvun asussaan se oli tärkeä osa kaupungin puolustusta: neljä suurta pyöreää '
      + 'kulmatornia ja valtava vallihauta, jonka osa näkyy yhä Paraden kohdalla.\n\n'
      + 'Ensimmäisen, todennäköisesti puisen linnan rakennutti 1100-luvulla Richard de '
      + 'Clare eli Strongbow. Anglonormannit olivat perustaneet paikalle linnan jo 1173, '
      + 'mahdollisesti Osraigen Mac Giolla Phádraig -kuninkaiden aiemman asuinpaikan '
      + 'päälle.\n\n'
      + 'Ensimmäinen kivilinna valmistui 1260. Se oli neliömäinen ja siinä oli torni '
      + 'jokaisessa kulmassa; neljästä alkuperäisestä tornista kolme on yhä pystyssä. '
      + 'Kruunu takavarikoi linnan ja myi sen Butlerin suvulle 1391.\n\n'
      + 'Vuonna 1967 Arthur Butler, kuudes Ormonden markiisi, myi linnan viidelläkymmenellä '
      + 'punnalla Kilkennyn asukkaiden perustamalle kunnostuskomitealle. Linnaa ja sen '
      + 'puistoja hoitaa nykyään Irlannin rakennusvirasto, ja puutarhat ovat yleisölle '
      + 'avoinna.',
    lahde: 'en-Wikipedia "Kilkenny Castle", johdanto-osa sekä osiot "Early history" ja '
      + '"Butlers of Ormonde" (tarkistettu 6.9.2026).',
  },
];
