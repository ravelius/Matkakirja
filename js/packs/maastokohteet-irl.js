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
 * KUVAT LISÄTTY 20.9.2026 (ent. kuvaton erä): kortti kantaa nyt kaksi tarkistettua
 * Commons-kuvaa. Faktat on
 * tarkistettu en-Wikipediasta kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_IRL = [
  {
    id: 'carrauntoohil',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-carrauntoohil-d9254197.jpg',
      lyhyt: 'Carrauntoohil kohoaa Hag\'s Glenin laakson perukalla.',
      selite: 'Polku kulkee Hag\'s Glenin laaksossa kohti MacGillycuddy\'s Reeksin vuoria. Taustalla häämöttää Carrauntoohil, Irlannin korkein vuori.',
      lahde: 'Valokuva: Mariusz Z, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Mariusz Z',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carrauntoohil_from_the_Hag\'s_Glen,_Ireland.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-carrauntoohil-bb3decb3.jpg',
        lyhyt: 'Carrauntoohil ja Caherin harju Beenkeraghin huipulta nähtynä.',
        selite: 'Karuja kallioita ja jyrkkiä harjanteita MacGillycuddy\'s Reeksin vuoristossa Kerryn kreivikunnassa. Vasemmalla Carrauntoohil, oikealla Caherin harju.',
        lahde: 'Valokuva: Reeks District, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Reeks District',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Carrauntoohil,_Beenkeragh_Ridge,_Caher.jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-irlanninmeri-f84ead63.jpg',
      lyhyt: 'Baily-majakka Howth Headin kärjessä Irlanninmeren rannalla.',
      selite: 'Majakka seisoo jyrkän kallioniemen päässä Dublinin kreivikunnassa. Taustalla näkyvät Irlanninmeri ja Wicklowin vuoret.',
      lahde: 'Valokuva: Christian David, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Christian David',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Baily_Lighthouse,_Howth_Head,_Dublin,_Ireland.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-irlanninmeri-fb3301ad.jpg',
        lyhyt: 'Tyyni Irlanninmeri Howthin kalliopolulta katsottuna.',
        selite: 'Näkymä avautuu Howthin rannikkopolulta Irlanninmeren tyyneen vesipintaan.',
        lahde: 'Valokuva: Lizardolson, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Lizardolson',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Irish_Sea_Off_Howth.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-shannon-ddb14def.jpg',
      lyhyt: 'Shannon virtaa Limerickin kaupungin halki.',
      selite: 'Joki levenee kaupungin kohdalla, ja rannoilla näkyy kaupungin rakennuksia sekä keskiaikaisen linnan muureja.',
      lahde: 'Valokuva: Santiperez, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Santiperez',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Limerick_-_Shannon_River_cropped.jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-shannon-87670722.jpg',
        lyhyt: 'Shannon-joen rauhallinen vesi Athlonessa aamun valossa.',
        selite: 'Jokea reunustavat Athlonen rakennukset ja pienvenesatama. Shannon virtaa kaupungin läpi Irlannin keskiosassa.',
        lahde: 'Valokuva: Photogoddle, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Photogoddle',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Shannon_River_at_Athlone.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260912/irl-kohde-newgrange-f3c1aafbd742.jpg',
      lyhyt: 'Newgrangen sisäänkäynti ja koristeltu reunakivi.',
      selite: 'Newgrangen valkokivinen julkisivu ja koristeltu sisäänkäyntikivi johtavat yli viisituhatta vuotta vanhaan käytävähautaan.',
      lahde: 'Valokuva: CooKeeN, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'CooKeeN',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Newgrange_entrance.JPG',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-taran-kukkula-bee93deb.jpg',
      lyhyt: 'Lia Fáil -kivipylväs Tarán kukkulalla.',
      selite: 'Pystyyn nostettu kivipylväs seisoo pyöreän kiveyksen keskellä Tarán kukkulan nurmella. Vanhan tarinan mukaan kivi huusi oikean ylikuninkaan kohdalla.',
      lahde: 'Valokuva: Ianfhunter, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Ianfhunter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Stone_Of_Destiny_-_Hill_of_Tara.JPG',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-taran-kukkula-4cae96f6.jpg',
        lyhyt: 'Panttivankien kumpu Tarán kukkulalla Meathin kreivikunnassa.',
        selite: 'Nurmen peittämä hautakumpu, jonka sisäänkäynti avautuu kivellä vuorattuun käytävään. Kumpu on Tarán esihistoriallisia monumentteja.',
        lahde: 'Valokuva: Nigel Thompson, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Nigel Thompson',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:%22The_Mound_of_the_hostages%22_burial_chamber,_Hill_of_Tara,_Co._Meath_-_geograph.org.uk_-_7779755.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-clonmacnoise-cf495da4.jpg',
      lyhyt: 'Clonmacnoisen pyöreä torni kohoaa nurmen keskeltä Shannonin varrella.',
      selite: 'Kivinen pyöreä torni seisoo luostarialueen nurmikolla, ja taustalla siintää Shannon-joen tasainen lakeus.',
      lahde: 'Valokuva: Martin Kerans, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Martin Kerans',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:O\'Rourke\'s_Tower_Clonmacnoise_-_geograph.org.uk_-_5625459.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-clonmacnoise-3d6d2d84.jpg',
        lyhyt: 'Clonmacnoisen luostarin rauniot Shannonin niittyjen takaa katsottuna.',
        selite: 'Matalat kirkonrauniot ja pyöreä torni näkyvät kaukaa joen tulva-alueen laidalta.',
        lahde: 'Valokuva: Eric Jones, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Eric Jones',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:The_Clonmacnoise_Monastic_Site_from_the_Shannon_Callows_-_geograph.org.uk_-_3802559.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-rock-of-cashel-4449044f.jpg',
      lyhyt: 'Rock of Cashelin rauniolinnake kohoaa kalliolla sinisen taivaan alla.',
      selite: 'Kalliokukkulan huipulla seisovat kivitornit ja kirkon muurit kohoavat nurmikentän ja muurin yllä.',
      lahde: 'Valokuva: Michael Deligan, Wikimedia Commons (CC BY-SA 4.0).',
      tekija: 'Michael Deligan',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rock_of_Cashel_Co._Tipperary_4.jpg',
      lisenssi: 'CC BY-SA 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-rock-of-cashel-293adc22.jpg',
        lyhyt: 'Cashelin katedraalin rauniot ja niiden korkeat ikkunat.',
        selite: 'Kivinen katedraalin kuori on vailla kattoa. Sen korkeat kapeat ikkuna-aukot ovat Cashelin kallion näkyvimpiä rakennuksia.',
        lahde: 'Valokuva: Michael Deligan, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Michael Deligan',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Rock_of_Cashel_Co._Tipperary_5.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-skellig-michael-a831b0c3.jpg',
      lyhyt: 'Skellig Michael kohoaa merestä kaksihuippuisena kalliona.',
      selite: 'Jyrkkä kallioluoto nousee Atlantin aalloista Kerryn rannikon edustalla.',
      lahde: 'Valokuva: Jerzy Strzelecki, Wikimedia Commons (CC BY-SA 3.0).',
      tekija: 'Jerzy Strzelecki',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skellig_Michael03(js).jpg',
      lisenssi: 'CC BY-SA 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-skellig-michael-a05e6588.jpg',
        lyhyt: 'Mehiläispesämäisten kivimajojen alue Skellig Michaelilla ja näkymä Pikku Skelligille.',
        selite: 'Luostariyhdyskunnan kuivamuurattuja rakennuksia on saaren rinteellä, ja etäällä merellä erottuu Skellig Beag.',
        lahde: 'Valokuva: NoNameIsLeft, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'NoNameIsLeft',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Skellig_Michael_Views.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-ceide-fields-29fbccf0.jpg',
      lyhyt: 'Céide Fieldsin kävijäkeskus, pyramidin muotoinen rakennus nummella.',
      selite: 'Ruohon peittämä kävijäkeskus kohoaa avarassa suomaisemassa Mayon pohjoisrannikolla.',
      lahde: 'Valokuva: Michael Dibb, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Michael Dibb',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ceide_Fields_(1)_-_geograph.org.uk_-_5521483.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-ceide-fields-69d190ca.jpg',
        lyhyt: 'Merikallioita Céide Fieldsin lähellä Mayon pohjoisrannikolla.',
        selite: 'Jyrkät kerroksiset kalliot laskeutuvat suoraan Atlantin aaltoihin.',
        lahde: 'Valokuva: Michael Dibb, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Michael Dibb',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Ceide_Fields_(4)_-_geograph.org.uk_-_5521486.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-moherin-kalliot-0748a859.jpg',
      lyhyt: 'O\'Brienin torni Moherin kallioiden reunalla.',
      selite: 'Pieni kivitorni seisoo ruohoisen kalliojyrkänteen päällä Atlantin ääressä Claren kreivikunnassa.',
      lahde: 'Valokuva: Joseph Mischyshyn, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Joseph Mischyshyn',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cliffs_of_Moher_-_O\'Brien\'s_Tower_-_Horizontal_Orientation_-_geograph.org.uk_-_3775427.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-moherin-kalliot-ea0b412c.jpg',
        lyhyt: 'Moherin kallioiden jyrkät seinämät ja aallot kallion juurella.',
        selite: 'Kerroksiset merikalliot kohoavat suoraan Atlantista, ja irrallinen kalliopylväs nousee vedestä.',
        lahde: 'Valokuva: Colin Park, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Colin Park',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cliffs_of_Moher_-_Cliffs_N_of_O\'Brien\'s_Tower_-_geograph.org.uk_-_5610739.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Moherin kalliot',
    tyyppi: 'vuori',
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
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-kilkennyn-linna-27c88ed2.jpg',
      lyhyt: 'Kilkennyn linnan pohjoissivu ja Nore-joki.',
      selite: 'Linnan tornit kohoavat kiviseinän ja puiden takaa, ja joen tyyni vesi heijastaa rantaa.',
      lahde: 'Valokuva: Zairon, Wikimedia Commons (CC BY 4.0).',
      tekija: 'Zairon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kilkenny_Kilkenny_Castle_Exterior_North_Side_%26_River_Nore_1.jpg',
      lisenssi: 'CC BY 4.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/4.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-kilkennyn-linna-0a6727bd.jpg',
        lyhyt: 'Kilkennyn linnan puutarha ja linna taustalla.',
        selite: 'Siistit nurmikot ja kukkapenkit ympäröivät linnaa Kilkennyn keskustassa.',
        lahde: 'Valokuva: Elena Tatiana Chis, Wikimedia Commons (CC BY-SA 4.0).',
        tekija: 'Elena Tatiana Chis',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Kilkenny_Castle_-_Garden_view.jpg',
        lisenssi: 'CC BY-SA 4.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
      },
    ],
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
  /* ================================================================
   * K2-ERÄ 3, 11.9.2026 — KOLME KOHDETTA LISÄÄ.
   *
   * Omistaja 11.9.2026: *"Agentit voisivat tarkastaa myös muut
   * Euroopan maat että kaikissa tarpeeksi nostoja."* Irlanti oli
   * pääkartan inventaariossa Euroopan heikoimpia (17 merkkiä), ja
   * päätoimittajan tavoite on vähintään kaksikymmentä. Kolme uutta
   * kohdetta ovat kaikki yli yhdentoista lautayksikön päässä
   * Dublinista, joten ne ovat pääkartan merkkejä eivätkä kuulu
   * kohdekartalle. Kuvat lisätty 20.9.2026 (ent. kuvaton erä), kuten tiedoston muutkin kohteet.
   * ============================================================== */
  {
    id: 'croagh-patrick',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-croagh-patrick-d8df07a5.jpg',
      lyhyt: 'Croagh Patrick Clew Baylta katsottuna.',
      selite: 'Pyhä vuori kohoaa Mayon kreivikunnassa, ja sen edessä leviää Clew Bayn rantaseutu.',
      lahde: 'Valokuva: Gary Miotla, Wikimedia Commons (CC BY 3.0).',
      tekija: 'Gary Miotla',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Croagh_Patrick,_Irelands\'_Holy_Mountain_viewed_from_Clew_Bay._December_2007_-_panoramio.jpg',
      lisenssi: 'CC BY 3.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by/3.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-croagh-patrick-931b3379.jpg',
        lyhyt: 'Croagh Patrickin kartiomainen huippu meren ja matalan rannan takana.',
        selite: 'Vuoren rinteet laskeutuvat rantaviivaan, jossa vuoroveden paljastama ranta reunustaa Clew Bayta.',
        lahde: 'Valokuva: Robert Ashby, Wikimedia Commons (CC BY-SA 2.0).',
        tekija: 'Robert Ashby',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Croagh_Patrick_-_geograph.org.uk_-_3980321.jpg',
        lisenssi: 'CC BY-SA 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
      },
    ],
    nimi: 'Croagh Patrick',
    tyyppi: 'vuori',
    kysymykset: [
      'Miksi vuorelle noustaan paljain jaloin?',
      'Miksi vuoren kultaa ei kaivettu?',
    ],
    nappi: 'Pyhiinvaeltajien vuori',
    // -9.6583 E / 53.7594 N — en-Wikipedia "Croagh Patrick"
    laudat: {
      maailmankartta: { x: 5511.4, y: 1222.8 },
      europe: { x: 25.8, y: 479.7 },
    },
    teksti: 'Croagh Patrick on 764 metriä korkea vuori Mayon kreivikunnassa Murriskin kylän '
      + 'takana, ja sen laelta avautuu näkymä Clew Baylle. Perimätiedon mukaan pyhä Patrick '
      + 'paastosi huipulla neljäkymmentä päivää, ja vuori on siitä asti ollut Irlannin '
      + 'tunnetuin pyhiinvaelluskohde.\n\n'
      + 'Heinäkuun viimeisenä sunnuntaina eli Reek Sundayna huipulle nousee jopa '
      + 'neljäkymmentätuhatta ihmistä vuodessa. Osa kiipeää paljain jaloin katumusharjoituksena, '
      + 'ja huipun kappelissa pidetään messuja. Nykyinen pieni kappeli vihittiin 20. heinäkuuta '
      + '1905, mutta kivinen rukoushuone on ollut laella jo 400-luvulta.\n\n'
      + 'Arkeologinen kartoitus on löytänyt laen ympäriltä aitauksen jäänteet ja sen kylkeen '
      + 'liittyviä pyöreitä majanpohjia, jotka ajoittuvat pronssikaudelle. Vuori on siis ollut '
      + 'kokoontumispaikka kauan ennen kristinuskoa.\n\n'
      + 'Vuoren ytimestä löytyi 1980-luvulla kultaa. Mayon kreivikunnanvaltuusto päätti olla '
      + 'sallimatta kaivostoimintaa, kun Mayo Environmental Group vastusti hanketta Paddy '
      + 'Hopkinsin johdolla.',
    lahde: 'en-Wikipedia "Croagh Patrick" (tarkistettu 11.9.2026).',
  },
  {
    id: 'dun-aonghasa',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-dun-aonghasa-9ee14f68.jpg',
      lyhyt: 'Dún Aonghasan kiviaitaa linnakkeen sisäpuolella.',
      selite: 'Kuivamuurattu kivimuuri kiertää linnakkeen kalliota Inis Mórilla, ja taustalla siintää meri.',
      lahde: 'Valokuva: Marathon, Wikimedia Commons (CC BY-SA 2.0).',
      tekija: 'Marathon',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Inside_the_fort_of_Dun_Aonghasa_on_the_Aran_Islands_-_geograph.org.uk_-_7861966.jpg',
      lisenssi: 'CC BY-SA 2.0',
      lisenssiUrl: 'https://creativecommons.org/licenses/by-sa/2.0',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-dun-aonghasa-9afc8aea.jpg',
        lyhyt: 'Dún Aonghasan jyrkkä merikallio Atlantin ääressä.',
        selite: 'Kalliojyrkänne putoaa suoraan Atlantin aaltoihin Aransaarten Inis Mórilla.',
        lahde: 'Valokuva: Sonse, Wikimedia Commons (CC BY 2.0).',
        tekija: 'Sonse',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Cliffs_at_D%C3%BAn_Aonghasa_%E2%80%A2_Dun_Aengus_(40324982390).jpg',
        lisenssi: 'CC BY 2.0',
        lisenssiUrl: 'https://creativecommons.org/licenses/by/2.0',
      },
    ],
    nimi: 'Dún Aonghasa',
    tyyppi: 'historia',
    kysymykset: [
      'Mikä chevaux de frise on?',
      'Miksi linnake on kallion reunalla?',
    ],
    nappi: 'Linnake jyrkänteen reunalla',
    // -9.7681 E / 53.1258 N — en-Wikipedia "Dún Aonghasa"
    laudat: {
      maailmankartta: { x: 5507.7, y: 1251.6 },
      europe: { x: 23.7, y: 496.4 },
    },
    teksti: 'Dún Aonghasa seisoo sadan metrin korkuisen jyrkänteen reunalla Inis Mórilla, '
      + 'Aransaarten suurimmalla saarella Galwayn kreivikunnassa. Linnake on neljä '
      + 'sisäkkäistä kuivamuurattua kivikehää, ja uloin niistä rajaa noin kuuden hehtaarin '
      + 'alueen.\n\n'
      + 'Kehien ulkopuolella on puolustusvyöhyke, jota kutsutaan nimellä chevaux de frise: '
      + 'kalkkikiven rakoihin on pystytetty teräviä kivipaaluja pystyyn ja ulospäin '
      + 'kallistuneina niin tiheään, ettei hyökkääjä pääse juoksemaan.\n\n'
      + 'Paikkaa ei rakennettu kerralla. Ensimmäinen vaihe ajoittuu noin vuoteen 1100 eaa., '
      + 'jolloin suurten pystykivien viereen kasattiin kiviaines ensimmäiseksi aitaukseksi. '
      + 'Pronssin työstöstä on jälkiä noin vuodelta 900 eaa., ja kolminkertainen muuri '
      + 'linnakkeen länsisivulla rakennettiin todennäköisesti noin 500 eaa.\n\n'
      + 'Vuoden 1839 kaivauksissa löytyi varhaiselle rautakaudelle ajoittuva linnunpääsolki, '
      + 'joka vahvistaa paikan olleen käytössä pronssikaudelta varhaiskeskiajalle asti.',
    lahde: 'en-Wikipedia "Dún Aonghasa" (tarkistettu 11.9.2026).',
  },
  {
    id: 'glendalough',
    kuva: {
      osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-glendalough-5d59e27b.jpg',
      lyhyt: 'Glendaloughin yläjärvi syksyn väreissä Wicklowin vuorten keskellä.',
      selite: 'Tyyni järvi ja sitä ympäröivät metsäiset rinteet Glendaloughin laaksossa.',
      lahde: 'Valokuva: Bananenfalter, Wikimedia Commons (CC0).',
      tekija: 'Bananenfalter',
      lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Glendalough_upper_lake_autumn.jpg',
      lisenssi: 'CC0',
      lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
    },
    kuvat: [
      {
        osoite: 'https://media.matkakirja.app/karttanostot/20260920/irl-nosto-glendalough-052aabc1.jpg',
        lyhyt: 'Glendaloughin pyöreä torni luostarialueella.',
        selite: 'Ohut kivinen pyöreä torni kohoaa Glendaloughin muinaisen luostarin alueella.',
        lahde: 'Valokuva: Karlunun, Wikimedia Commons (CC0).',
        tekija: 'Karlunun',
        lahdeUrl: 'https://commons.wikimedia.org/wiki/File:Glendalough_RoundTower_SE_330_IMG_20250805_0957.jpg',
        lisenssi: 'CC0',
        lisenssiUrl: 'http://creativecommons.org/publicdomain/zero/1.0/deed.en',
      },
    ],
    nimi: 'Glendalough',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mitä nimi Gleann Dá Loch tarkoittaa?',
      'Miksi pyöreä torni rakennettiin uudelleen?',
    ],
    nappi: 'Kahden järven laakso',
    // -6.3275 E / 53.0103 N — en-Wikipedia "Glendalough"
    laudat: {
      maailmankartta: { x: 5622.4, y: 1256.8 },
      europe: { x: 89.7, y: 499.4 },
    },
    teksti: 'Glendalough on luostarilaakso Wicklowin kreivikunnassa. Nimi tulee iirin sanoista '
      + 'Gleann Dá Loch, kahden järven laakso: laakson pohjalla on kaksi järveä, jotka '
      + 'Poulanass-joen tuoma suistokerrostuma erottaa toisistaan. Ympärillä kohoavat vuoret, '
      + 'niiden joukossa 699-metrinen Camaderry.\n\n'
      + 'Luostarin perusti 500-luvulla pyhä Kevin, joka kuoli noin vuonna 618 — perimätiedon '
      + 'mukaan 3. kesäkuuta. Yhteisö kukoisti kuusi vuosisataa, kunnes sen hiippakunta '
      + 'yhdistettiin Dublinin kanssa vuonna 1214 ja laakson asema alkoi heiketä.\n\n'
      + 'Alueen tunnetuin rakennus on noin kolmekymmenmetrinen pyöreä torni. Se oli '
      + 'romahtanut, ja vuonna 1876 se muurattiin uudelleen pystyyn sen omista, paikalta '
      + 'kerätyistä kivistä.\n\n'
      + 'Englantilaiset joukot tuhosivat luostariasutuksen vuonna 1398. Sen jälkeenkin '
      + 'paikalla toimi paikallinen kirkko ja sinne tultiin pyhiinvaellukselle. Nykyään '
      + 'laakso on suosittu retkeilykohde, jonka yhdeksän merkittyä polkua kulkevat '
      + 'luostariraunioiden ohi.',
    lahde: 'en-Wikipedia "Glendalough" (tarkistettu 11.9.2026).',
  },
];
