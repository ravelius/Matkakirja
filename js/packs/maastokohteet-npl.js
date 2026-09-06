/*
 * MAASTOKOHTEET JA KOHTEET — NPL (Nepal). Erä M8, Aasia 2, 6.9.2026.
 *
 * Omistaja 6.9.2026: *"Jatka kartta nostojen tekoa koko maailmaan."*
 * Nepalilla oli ennen tätä erää yksi ainoa karttamerkki, eläintäky
 * (docs/moduulit/karttanostot-kattavuus.md, Aasian taulukko). Tavoite
 * maata kohti on kahdeksan KOHDETTA ja kolme MAASTOKOHDETTA.
 *
 * MIKSI TÄSSÄ TIEDOSTOSSA EIKÄ fokuskohteet-npl.js:ssä — sama syy kuin
 * K2-erissä 1–4 ja maailman erissä M1–M4: kohdepakki vaatisi rivin
 * js/fokuskohteet.js:n KOHDE_MAAT-tauluun ja FOKUS_LISANIMET-lohkon
 * (js/packs/fokus-grc.js), jonka lähtöaineisto on ämpärissä eikä repossa.
 *
 * VAIN MAAILMANKARTAN RIVI (Euroopan erillislaudasta luovuttu,
 * Raamattu 30.8.2026). Koordinaatit on laskettu koneella
 * `tools/johda-maastokohteet.mjs`:n vientifunktiolla `laudat(lon, lat)`
 * en-Wikipedian coordinates-propin lon/lat-parista.
 *
 * MAASTOKOHTEET ON VALITTU KÄSIN (tools/maastoaineisto/NPL.json-tiedostoa
 * ei ole): Dhaulagiri, Koshi ja Rara-järvi — vuori, joki ja järvi. Merta
 * ei ole, koska Nepal on sisämaavaltio. Kaikki kolme osuvat maan
 * fokuslehden rajaukseen (tools/savukkeet/savuke-maastokohteet.mjs
 * vartio 7a), joka on Nepalilla x 8452,2…8821,1 ja y 2138,8…2339,0.
 *
 * NIMISÄÄNTÖ N3 KARSI KAKSI EHDOKASTA. Kartalla on jo nimiöt Himalaja
 * ja Ganges (js/packs/maailmankartta-nimet.js), joten Nepalin vuoreksi
 * valittiin Dhaulagiri ja joeksi Koshi. Annapurna ja Kali Gandaki
 * jäivät pois toisesta syystä: molemmat ovat Muktinathin nimiön
 * päällä (7–9 lautayksikköä), ja Mustangin laaksoon mahtuu vain kaksi
 * merkkiä, Muktinath ja Lo Manthang.
 *
 * EI PELIKAUPUNGIN KOHDALLA. Etäisyys mitattiin jokaiseen
 * js/packs/maailmankartta.js CITIES-kaupunkiin: lähin uusi merkki on
 * Nuwakot 29,6 lautayksikön päässä Kathmandu-laatasta, ja raja
 * KAUPUNGIN_KOHDALLA_SADE on 7. KATHMANDUN LAAKSOON MAHTUU VAIN YKSI
 * MERKKI: Bhaktapur, Changu Narayan, Kirtipur, Pharpingin voimalaitos
 * ja Kathmandun Durbar-aukio ovat kaikki 1–7 lautayksikön päässä
 * toisistaan, eikä nimiölaatikoita saa siihen mahtumaan. Lisäksi
 * Kathmandun kohdekartta (js/packs/maakartat.js kathmandu, lat
 * 27,667–27,7315 ja lon 85,2835–85,3725) kattaa laakson ytimen, ja sen
 * ruutuun osuva nosto kuuluu kohdekartan pisteelle eikä pääkartalle
 * (tests/nostot-kartalla.test.mjs) — sinne jäävät siis Patanin
 * Durbar-aukio, Pashupatinath, Boudhanath, Swayambhunath ja Pharping.
 *
 * KUVATON ERÄ (Perustuslaki, faktakuri). Faktat on luettu
 * en-Wikipedian raakatekstistä kohde kerrallaan 6.9.2026.
 */
export const MAASTOKOHTEET_NPL = [
  /* ─────────────────────────── KOHTEET (8) ─────────────────────── */
  {
    id: 'lumbini',
    nimi: 'Lumbini',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka pystytti pylvään ja milloin?',
      'Mitä vuoden 2013 kaivaus paljasti?',
    ],
    korostukset: ['pylväs|pylväs'],
    nappi: 'Puutarha, jossa Buddha syntyi',
    // 83.27583 E / 27.48139 N — en-Wikipedia "Lumbini"
    laudat: {
      maailmankartta: { x: 8609.2, y: 2272.1 },
    },
    teksti: 'Lumbini on buddhalainen pyhiinvaelluspaikka Rupandehin '
      + 'piirikunnassa Etelä-Nepalissa, ja pyhien tekstien mukaan kuningatar '
      + 'Maya synnytti siellä Siddhartha Gautaman eli Buddhan. Vuonna 1896 '
      + 'nepalilainen kenraali Khadga Shamsher Jang Bahadur Rana ja Alois Anton '
      + 'Führer löysivät paikalta suuren kivipylvään kiinalaisten '
      + 'munkkipyhiinvaeltajien Faxianin ja Xuanzangin matkakertomusten avulla. '
      + 'Pylväs kantaa brahmi-kirjoitusta, jonka mukaan Mauryan keisari Ashoka '
      + 'kävi Lumbinissa 200-luvulla eaa. ja tunnisti sen Buddhan '
      + 'syntymäpaikaksi. Mayadevin temppelin alta kaivettiin 2013 esiin '
      + 'puurakenne, joka on Ashokan aikaista tiilipyhäkköä vanhempi ja '
      + 'näyttää olleen puun ympärille rakennettu pyhäkkö. Lumbini otettiin '
      + 'maailmanperintöluetteloon 1997.',
    lahde: 'en-Wikipedia "Lumbini", johdanto sekä osiot "Pillar of Ashoka" ja '
      + '"Excavation at the Mayadevi Temple in 2013" (tarkistettu 6.9.2026).',
  },
  {
    id: 'bhaktapur',
    nimi: 'Bhaktapur',
    tyyppi: 'kaupunki',
    kysymykset: [
      'Miksi kaupunki säilyi yhtenäisenä newar-kaupunkina?',
      'Mikä Nepalin kolmesta kuningaskunnasta se oli?',
    ],
    korostukset: ['newar|newar'],
    nappi: 'Palvojien kaupunki',
    // 85.42778 E / 27.67222 N — en-Wikipedia "Bhaktapur"
    laudat: {
      maailmankartta: { x: 8680.9, y: 2265.2 },
    },
    teksti: 'Bhaktapur eli paikallisittain Khwopa on Kathmandun laakson '
      + 'itäkulman kaupunki, Nepalin pinta-alaltaan pienin ja väentiheydeltään '
      + 'suurin kunta. Nimi tarkoittaa palvojien kaupunkia, ja se oli Nepalin '
      + 'pääkaupunki Malla-kauden alkupuoliskolla 1100-luvulta vuoteen 1482, '
      + 'jolloin maa jakautui kolmeen kuningaskuntaan. Vaurautensa kaupunki sai '
      + 'asemastaan vanhalla Intian ja Tiibetin välisellä kauppatiellä. Gorkhan '
      + 'kuningaskunta valtasi sen 1769, minkä jälkeen se jäi syrjään muusta '
      + 'maasta — juuri eristyneisyys säilytti sen yhtenäisenä newar-kaupunkina, '
      + 'jolla on oma Nepal Bhasan murteensa. Talous ja rakennukset alkoivat '
      + 'kohentua vasta 1980-luvulla matkailun ja Länsi-Saksan '
      + 'kehitysavun myötä.',
    lahde: 'en-Wikipedia "Bhaktapur", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'gorkha',
    nimi: 'Gorkha',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka syntyi Gorkhassa?',
      'Miksi kunnan nimi vaihtui 2009?',
    ],
    korostukset: ['Durbar|Durbar'],
    nappi: 'Nykyisen Nepalin lähtöruutu',
    // 84.63333 E / 28.0 N — en-Wikipedia "Gorkha Municipality"
    laudat: {
      maailmankartta: { x: 8654.4, y: 2253.4 },
    },
    teksti: 'Gorkha on kunta Gandakin maakunnassa, ja sen kukkulalla seisoo '
      + 'vanha kuninkaanlinna Gorkha Durbar. Siellä syntyi Prithvi Narayan '
      + 'Shah, joka yhdisti nykyisen Nepalin ja perusti sen kuningashuoneen. '
      + 'Kunta perustettiin 1996 nimellä Prithvinarayan juuri hänen mukaansa, '
      + 'mutta nimi vaihdettiin Gorkhaksi 2009, kun monarkia oli lakkautettu. '
      + 'Itse palatsi tuhoutui vuoden 2015 maanjäristyksessä, mutta '
      + 'Gorakhnathin pyhäkkö ja Kalika-temppeli ovat auki eikä niihin ole '
      + 'pääsymaksua. Gorkha on myös Manaslun ja Ganesh Himalin '
      + 'vaellusreittien lähtöpiste.',
    lahde: 'en-Wikipedia "Gorkha Municipality", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'janakpur',
    nimi: 'Janakpur',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Mistä temppelin lisänimi Nau Lakha tulee?',
      'Kuka temppelin rakennutti?',
    ],
    korostukset: ['Janaki Mandir|Janaki Mandir'],
    nappi: 'Sitan kaupunki',
    // 85.925 E / 26.72861 N — en-Wikipedia "Janakpur"
    laudat: {
      maailmankartta: { x: 8697.5, y: 2299.1 },
    },
    teksti: 'Janakpur on Madheshin maakunnan pääkaupunki ja maithilin kielen '
      + 'keskus Nepalin eteläisellä tasangolla. Kaupunki perustettiin '
      + '1700-luvun alussa, mutta se on jälkikäteen tunnistettu muinaisen '
      + 'Videhan kuningaskunnan pääkaupungiksi ja jumalatar Sitan '
      + 'syntymäpaikaksi. Sen keskustassa on Janaki Mandir, yksi Nepalin '
      + 'suurimmista temppeleistä, jonka rakennutti 1898 Tikamgarhin '
      + 'kuningatar Brisabhanu Kunwari. Temppeliä kutsutaan myös nimellä Nau '
      + 'Lakha, koska rakennuskustannusten kerrotaan olleen yhdeksän lakhia eli '
      + '900 000 kultakolikkoa. Pyhiinvaeltajat käyvät myös kaupungin yli '
      + 'kahdellasadalla pyhällä lammella, joista tärkeimmät ovat Dhanush Sagar '
      + 'ja Ganga Sagar.',
    lahde: 'en-Wikipedia "Janakpur", johdanto sekä osio "Religious sites" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'muktinath',
    nimi: 'Muktinath',
    tyyppi: 'kulttuuri',
    kysymykset: [
      'Miksi temppeli on pyhä kahdelle uskonnolle?',
      'Mitä mukti dharat ovat?',
    ],
    korostukset: ['mukti dharaa|mukti dharaa'],
    nappi: 'Sata ja kahdeksan vesisuihkua',
    // 83.87169 E / 28.81708 N — en-Wikipedia "Muktinath"
    laudat: {
      maailmankartta: { x: 8629.1, y: 2223.9 },
    },
    teksti: 'Muktinath on vanha Vishnu-temppeli Mustangissa Thorong Lan '
      + 'solan juurella 3 800 metrin korkeudessa, mikä tekee siitä yhden '
      + 'maailman korkeimmalla sijaitsevista temppeleistä. Nimi tarkoittaa '
      + 'vapautuksen herraa, ja paikka on pyhä sekä hinduille että '
      + 'buddhalaisille: hinduille se on Vishnun ja Shaktin itsestään '
      + 'ilmestymispaikka, buddhalaisille dakinien asuinsija ja yksi '
      + 'kahdestakymmenestäneljästä tantrisesta paikasta. Tiibetiksi se on '
      + 'Chumig Gyatsa, sata vettä. Ulkopihaa kiertää 108 häränpäätä, joiden '
      + 'suusta valuu vettä — jokainen mukti dharaa vastaa yhtä '
      + 'Sri Vaishnava -perinteen 108 pyhästä paikasta. Temppeliä pidetään '
      + 'Nepalissa uskontojen sovun vertauskuvana, koska molemmat yhteisöt ovat '
      + 'palvoneet samalla paikalla rinnakkain.',
    lahde: 'en-Wikipedia "Muktinath", johdanto ja osio "Architecture" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'lo-manthang',
    nimi: 'Lo Manthang',
    tyyppi: 'historia',
    kysymykset: [
      'Kuka perusti kaupungin ja milloin?',
      'Mitä kallioluolista löytyi 2007?',
    ],
    korostukset: ['muurien|muurien'],
    nappi: 'Lon kuningaskunnan muuriportti',
    // 83.95667 E / 29.18306 N — en-Wikipedia "Lomanthang Rural Municipality"
    laudat: {
      maailmankartta: { x: 8631.9, y: 2210.6 },
    },
    teksti: 'Lo Manthang oli Lon kuningaskunnan muurien ympäröimä pääkaupunki '
      + 'Mustangin pohjoisosassa Tiibetin rajalla. Ame Pal perusti sen 1380 ja '
      + 'rakennutti kaupunginmuurin sekä useimmat yhä pystyssä olevista '
      + 'rakennuksista. Kun Gorkhan shahit yhdistivät Nepalin 1700-luvulla, Lo '
      + 'jäi alusmaaksi mutta sai pitää perinnölliset hallitsijansa, ja '
      + 'viimeinen heistä oli suvun kahdeskymmenesviides — hän menetti '
      + 'arvonimensä vasta 2008, kun Nepalista tuli tasavalta. Vuonna 2007 '
      + 'kylän lähistöltä löytyi ainakin kaksitoista jyrkänteeseen kaiverrettua '
      + 'luolaa, joissa on 1200-luvulle ajoittuvia buddhalaisia maalauksia sekä '
      + 'hopealla ja kullalla kirjoitettuja tiibetinkielisiä tekstejä.',
    lahde: 'en-Wikipedia "Lomanthang Rural Municipality", johdanto ja osio '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'nuwakot',
    nimi: 'Nuwakot',
    tyyppi: 'historia',
    kysymykset: [
      'Mitä nimi Nuwakot tarkoittaa?',
      'Missä Prithvi Narayan Shah kuoli?',
    ],
    korostukset: ['Devighat|Devighat'],
    nappi: 'Yhdeksän kukkulan piiri',
    // 85.14528 E / 27.91083 N — en-Wikipedia "Nuwakot District"
    laudat: {
      maailmankartta: { x: 8671.5, y: 2256.6 },
    },
    teksti: 'Nuwakotin piirikunta on osa Bagmatin maakuntaa, ja sen '
      + 'hallintokeskus on Bidur. Piiri kattaa 1 121 neliökilometriä, ja '
      + 'väkiluku oli vuonna 2011 hieman alle 280 000. Nimi on kahden sanan '
      + 'yhdistelmä: nawa tarkoittaa nepaliksi yhdeksää ja kot linnoitettua '
      + 'tai pyhää kukkulaa, ja perimätiedon mukaan yhdeksällä kukkulalla asuu '
      + 'seudun suojelusjumalia. Gorkhan kuningas Prithvi Narayan Shah valtasi '
      + 'Nuwakotin Jaya Prakash Mallalta ja teki siitä laajenevan '
      + 'kuningaskuntansa pääkaupungin. Piirissä on myös Devighatin kylä Tadi- '
      + 'ja Trishuli-jokien yhtymäkohdassa: siellä sama kuningas kuoli.',
    lahde: 'en-Wikipedia "Nuwakot District", johdanto ja osio "Etymology" '
      + '(tarkistettu 6.9.2026).',
  },
  {
    id: 'bardiya',
    nimi: 'Bardiyan kansallispuisto',
    tyyppi: 'muu',
    kysymykset: [
      'Miksi puisto on Nepalin koskemattomin?',
      'Mikä joki rajaa puistoa idässä?',
    ],
    korostukset: ['Karnali|Karnali'],
    nappi: 'Teraijen koskematon kolkka',
    // 81.5 E / 28.38333 N — en-Wikipedia "Bardiya National Park"
    laudat: {
      maailmankartta: { x: 8550, y: 2239.6 },
    },
    teksti: 'Bardiyan kansallispuisto perustettiin 1988 nimellä Royal Bardia '
      + 'National Park, ja se on 968 neliökilometrillään Nepalin Teraijen '
      + 'suurin ja koskemattomin suojelualue. Puisto nojaa idässä Karnali-joen '
      + 'itärantaan, ja Babai-joki halkoo sen keskeltä. Pohjoisessa rajana on '
      + 'Siwalik-kukkuloiden harjanne ja etelässä osin Nepalgunjin ja Surkhetin '
      + 'välinen valtatie, joka katkaisee suojelualueen. Yhdessä naapurina '
      + 'olevan Banken kansallispuiston kanssa alue muodostaa 1 437 '
      + 'neliökilometrin tiikerinsuojeluyksikön, joka ulottuu tulvatasankojen '
      + 'ruohikoille ja subtrooppisiin lehtimetsiin.',
    lahde: 'en-Wikipedia "Bardiya National Park", johdanto-osa '
      + '(tarkistettu 6.9.2026).',
  },
  /* ────────────────────── MAASTOKOHTEET (3) ────────────────────── */
  {
    id: 'dhaulagiri',
    nimi: 'Dhaulagiri',
    tyyppi: 'vuori',
    kysymykset: [
      'Mitä nimi tarkoittaa?',
      'Milloin huipulle noustiin ensi kertaa?',
    ],
    korostukset: ['Kali Gandaki|Kali Gandaki'],
    nappi: 'Häikäisevän valkoinen vuori',
    // 83.49528 E / 28.69611 N — en-Wikipedia "Dhaulagiri"
    laudat: {
      maailmankartta: { x: 8616.5, y: 2228.3 },
    },
    teksti: 'Dhaulagiri on 8 167 metrillään maailman seitsemänneksi korkein '
      + 'vuori ja korkein kokonaan yhden valtion rajojen sisällä oleva huippu. '
      + 'Nimi tulee sanskritista: dhawala tarkoittaa häikäisevää ja valkoista, '
      + 'giri vuorta. Se on myös Gandakin vesistöalueen korkein kohta. '
      + 'Annapurna I kohoaa 8 091 metriin 34 kilometriä idempänä, ja niiden '
      + 'välissä virtaa Kali Gandaki maailman syvimmässä rotkossa. Vuoren '
      + 'korkeuden laski kapteeni William Webb vuonna 1809, ja huipulle nousi '
      + '13. toukokuuta 1960 sveitsiläis-itävaltalais-nepalilainen retkikunta.',
    lahde: 'en-Wikipedia "Dhaulagiri", johdanto sekä osiot "Toponymy" ja '
      + '"History" (tarkistettu 6.9.2026).',
  },
  {
    id: 'koshi',
    nimi: 'Koshi',
    tyyppi: 'joki',
    kysymykset: [
      'Mistä nimi Saptakoshi tulee?',
      'Miksi joki on niin arvaamaton?',
    ],
    korostukset: ['Chatran rotkon|Chatran rotkon'],
    nappi: 'Seitsemän latvahaaran joki',
    // 87.16 E / 26.87 N — en-Wikipedia "Kosi River"
    laudat: {
      maailmankartta: { x: 8738.7, y: 2294 },
    },
    teksti: 'Koshi on rajat ylittävä joki, joka valuttaa Himalajan pohjoisia '
      + 'rinteitä Tiibetissä ja eteläisiä Nepalissa. Chatran rotkon '
      + 'pohjoispuolella olevan suuren yhtymäkohdan jälkeen sitä kutsutaan '
      + 'nimellä Saptakoshi eli seitsemän Koshia, koska siihen yhtyy seitsemän '
      + 'latvahaaraa — muun muassa Kanchenjungan seudulta tuleva Tamur, Arun ja '
      + 'Sun Koshi. Joki on 720 kilometriä pitkä ja sen valuma-alue noin 74 500 '
      + 'neliökilometriä, ja se on virtaamaltaan Gangesin kolmanneksi suurin '
      + 'sivujoki. Arvaamattomuutensa se saa voimasta, jonka se kerää kapeassa '
      + 'ja jyrkässä Chatran rotkossa: alajuoksulla se on rakentanut noin 15 000 '
      + 'neliökilometrin suistokeilan ja haarautuu yli kahteentoista uomaan, '
      + 'jotka vaihtavat paikkaa tulvien mukana.',
    lahde: 'en-Wikipedia "Kosi River", johdanto-osa (tarkistettu 6.9.2026).',
  },
  {
    id: 'rara',
    nimi: 'Rara-järvi',
    tyyppi: 'jarvi',
    kysymykset: [
      'Kuinka syvä järvi on?',
      'Mihin jokeen järvi laskee?',
    ],
    korostukset: ['Ramsar|Ramsar'],
    nappi: 'Viisi väriä päivässä',
    // 82.09306 E / 29.52917 N — en-Wikipedia "Rara Lake"
    laudat: {
      maailmankartta: { x: 8569.8, y: 2198.1 },
    },
    teksti: 'Rara on Nepalin Himalajan suurin makean veden järvi, ja se on '
      + 'Raran kansallispuiston tärkein kohde Jumlan ja Mugun piirikunnissa '
      + 'Karnalin maakunnassa. Järvi on 2 975 metrin korkeudessa, 5,1 '
      + 'kilometriä pitkä ja 2,7 leveä, vesipinta-alaltaan 10,8 '
      + 'neliökilometriä ja syvimmillään 167 metriä. Sen vedet laskevat '
      + 'Nijar-jokea pitkin Mugu Karnaliin, ja järveä ympäröivät tiheästi '
      + 'metsäiset kukkulat Chuchemara Danda ja Murma. Järven väri vaihtuu '
      + 'säästä riippuen jopa viisi kertaa päivässä. Alue liitettiin 1976 '
      + 'perustettuun kansallispuistoon, jonka tieltä Chapran ja Raran '
      + 'kylien asukkaat siirrettiin Nepalgunjiin, ja syyskuussa 2007 se '
      + 'julistettiin Ramsar-kosteikoksi.',
    lahde: 'en-Wikipedia "Rara Lake", johdanto sekä osiot "History" ja '
      + '"Geography" (tarkistettu 6.9.2026).',
  },
];
