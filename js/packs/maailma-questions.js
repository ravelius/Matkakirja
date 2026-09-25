// Maailma-laudan tietovisakysymykset: mantereet, valtameret ja suuret
// kaupungit. `general` toimii varapakkana.
//
// Muoto: { q, options[4], correct, fact, hint, level? } — ks. CONTRIBUTING.md.

export const MAAILMA_QUESTIONS = {
  tanger: [
    {
      q: 'Minkä kapean salmen rannalla Tanger sijaitsee?',
      options: ['Gibraltarinsalmen', 'Bosporinsalmen', 'Malakansalmen', 'Öresundin'],
      correct: 0,
      level: 1,
      fact: 'Salmi on kapeimmillaan noin 14 kilometriä leveä — Afrikasta näkee Espanjan rannikon selvin silmin.',
      hint: 'Salmen pohjoispuolella kohoaa kuuluisa kallio, joka on antanut sille nimen.',
    },
    {
      q: 'Mihin maahan Tanger kuuluu?',
      options: ['Marokkoon', 'Algeriaan', 'Tunisiaan', 'Espanjaan'],
      correct: 0,
      level: 1,
      fact: 'Marokko on Afrikan luoteisin valtio, ja Tanger sen pohjoisin suuri satamakaupunki.',
      hint: 'Maan pääkaupunki on Rabat ja suurin kaupunki Casablanca.',
    },
    {
      q: 'Mitkä kaksi merta Gibraltarinsalmi yhdistää?',
      options: [
        'Atlantin valtameren ja Välimeren',
        'Välimeren ja Punaisenmeren',
        'Mustanmeren ja Välimeren',
        'Atlantin valtameren ja Pohjanmeren',
      ],
      correct: 0,
      fact: 'Salmi on ainoa luonnollinen väylä Välimerelle lännestä, joten sen läpi kulkee valtava osa laivaliikenteestä.',
      hint: 'Toinen niistä on valtameri, toinen sisämeri.',
    },
    {
      q: 'Mikä vuoristo kohoaa Tangerista etelään ja erottaa rannikon Saharasta?',
      options: ['Atlasvuoret', 'Pyreneet', 'Apenniinit', 'Draakonivuoret'],
      correct: 0,
      fact: 'Atlasvuorten huiput ovat lumipeitteisiä talvella, vaikka Sahara alkaa vuorten toiselta puolen.',
      hint: 'Vuoristo on saanut nimensä kreikkalaisesta jättiläisestä, joka kannatteli taivasta.',
    },
    {
      q: 'Mikä oli Tangerin erikoinen kansainvälinen asema vuosina 1923-1956?',
      options: [
        'Sitä hallitsi useiden maiden yhteinen kansainvälinen hallinto',
        'Se oli itsenäinen kuningaskunta',
        'Se kuului Yhdistyneisiin kansakuntiin suoraan',
        'Se oli miehittämätön vapaasatama ilman hallintoa',
      ],
      correct: 0,
      level: 3,
      fact: 'Kansainvälisen vyöhykkeen aikana kaupunkia hallitsivat yhdessä muun muassa Ranska, Espanja ja Britannia — se veti puoleensa kirjailijoita, vakoojia ja pankkiireja.',
      hint: 'Yksikään yksittäinen valtio ei hallinnut kaupunkia, vaan monta yhdessä.',
    },
  ],

  kairo: [
    {
      q: 'Millä mantereella Kairo sijaitsee?',
      options: ['Afrikassa', 'Aasiassa', 'Euroopassa', 'Etelä-Amerikassa'],
      correct: 0,
      level: 1,
      fact: 'Kairo on Afrikan suurimpia kaupunkeja Niilin varrella.',
      hint: 'Sama manner kuin Saharalla ja Kilimandžarolla.',
    },
    {
      q: 'Minkä kahden mantereen rajalla Egypti sijaitsee?',
      options: ['Afrikan ja Aasian', 'Afrikan ja Euroopan', 'Aasian ja Euroopan', 'Afrikan ja Etelä-Amerikan'],
      correct: 0,
      level: 3,
      fact: 'Siinain niemimaa on Aasiaa, muu Egypti Afrikkaa — Suezin kanava kulkee rajalla.',
      hint: 'Siinain niemimaa on rajan toisella puolella.',
    },
    {
      q: 'Mikä joki tekee Egyptin autiomaasta asuttavan?',
      options: ['Niili', 'Kongo', 'Tigris', 'Amazon'],
      correct: 0,
      level: 1,
      fact: 'Lähes kaikki egyptiläiset asuvat Niilin laakson ja suiston vihreällä kaistaleella.',
      hint: 'Maailman pisimpiä jokia — virtaa etelästä pohjoiseen.',
    },
    {
      q: 'Mikä vuonna 1869 avattu kanava lyhensi laivamatkan Euroopasta Aasiaan?',
      options: ['Suezin kanava', 'Panaman kanava', 'Kielin kanava', 'Korintin kanava'],
      correct: 0,
      fact: 'Kanava yhdistää Välimeren Punaiseenmereen — ilman sitä laivat kiertäisivät koko Afrikan.',
      hint: 'Kanava kaivettiin Egyptiin Välimeren ja Punaisenmeren välille.',
    },
    {
      q: 'Mikä Kairon oppilaitos on yksi maailman vanhimmista yhä toimivista korkeakouluista?',
      options: ['al-Azhar', 'Sorbonne', 'Bolognan yliopisto', 'Oxford'],
      correct: 0,
      level: 3,
      fact: 'Al-Azharin moskeija perustettiin 970-luvulla, ja opetus alkoi siellä pian sen jälkeen — se on yhä islamilaisen oppineisuuden keskus.',
      hint: 'Nimi tarkoittaa arabiaksi loistavaa, ja opetus alkoi moskeijassa.',
    },
  ],

  rio: [
    {
      q: 'Millä mantereella Rio de Janeiro on?',
      options: ['Etelä-Amerikassa', 'Pohjois-Amerikassa', 'Afrikassa', 'Australiassa'],
      correct: 0,
      level: 1,
      fact: 'Rio on Brasilian tunnetuin kaupunki Etelä-Amerikan itärannikolla.',
      hint: 'Mantereen halki virtaa Amazon.',
    },
    {
      q: 'Mikä kuuluisa patsas seisoo vuorella Rion yllä?',
      options: ['Kristus-patsas', 'Vapaudenpatsas', 'Pieni merenneito', 'Sfinksi'],
      correct: 0,
      fact: 'Corcovado-vuoren 38-metrinen patsas levittää kätensä koko kaupungin ylle.',
      hint: 'Patsas levittää kätensä kaupungin ylle.',
    },
    {
      q: 'Mitä kieltä Brasiliassa puhutaan?',
      options: ['portugalia', 'espanjaa', 'ranskaa', 'brasiliaa'],
      correct: 0,
      level: 3,
      fact: 'Brasilia oli Portugalin siirtomaa — muissa Etelä-Amerikan maissa puhutaan enimmäkseen espanjaa.',
      hint: 'Sama kieli kuin Lissabonissa.',
    },
    {
      q: 'Mikä on Brasilian pääkaupunki?',
      options: ['Brasília', 'Rio de Janeiro', 'São Paulo', 'Salvador'],
      correct: 0,
      fact: 'Pääkaupunki siirrettiin Riosta 1960 sisämaahan tyhjälle ylätasangolle rakennettuun uuteen kaupunkiin.',
      hint: 'Kaupunki rakennettiin 1950-luvulla tyhjään sisämaahan lentokoneen muotoon.',
    },
    {
      q: 'Mitä Rion sambakoulut tekevät karnevaalissa?',
      options: [
        'kilpailevat kulkueillaan tuomariston edessä',
        'opettavat turisteille portugalia',
        'järjestävät jalkapalloturnauksen',
        'purjehtivat kilpaa lahdella',
      ],
      correct: 0,
      level: 1,
      fact: 'Sambakoulut ovat kaupunginosien omia yhdistyksiä, jotka valmistelevat kulkuettaan koko vuoden ja saavat siitä pisteet kuin urheilussa.',
      hint: 'Karnevaalissa on voittaja ja häviäjä kuin sarjaottelussa.',
    },
  ],

  mumbai: [
    {
      q: 'Missä maassa Mumbai sijaitsee?',
      options: ['Intiassa', 'Kiinassa', 'Egyptissä', 'Indonesiassa'],
      correct: 0,
      level: 1,
      fact: 'Mumbai on Intian suurin kaupunki ja maan talouden sydän.',
      hint: 'Maan lipussa on oranssia, valkoista ja vihreää.',
    },
    {
      q: 'Mikä valtameri lainehtii Mumbain edustalla?',
      options: ['Intian valtameri', 'Atlantti', 'Tyynimeri', 'Jäämeri'],
      correct: 0,
      level: 1,
      fact: 'Monsuunituulet puhaltavat mereltä ja tuovat Mumbain rankkasateet.',
      hint: 'Valtameri on saanut nimensä samalta maalta kuin kaupunki.',
    },
    {
      q: 'Millä nimellä Mumbain elokuvateollisuus tunnetaan?',
      options: ['Bollywood', 'Hollywood', 'Nollywood', 'Mollywood'],
      correct: 0,
      level: 3,
      fact: 'Intiassa tehdään enemmän elokuvia kuin missään muussa maassa — laulua ja tanssia riittää.',
      hint: 'Nimi on väännös kaupungin vanhasta nimestä ja kuuluisasta elokuvakaupungista.',
    },
    {
      q: 'Minkä Intian osavaltion pääkaupunki Mumbai on?',
      options: ['Maharashtran', 'Gujaratin', 'Keralan', 'Punjabin'],
      correct: 0,
      level: 3,
      fact: 'Osavaltion kieli on marathi, mutta Mumbaissa kuulee kaduilla myös hindiä, gujaratia ja englantia.',
      hint: 'Osavaltion oma kieli on marathi.',
    },
    {
      q: 'Mikä oli Mumbain virallinen nimi ennen vuotta 1995?',
      options: ['Bombay', 'Madras', 'Kalkutta', 'Delhi'],
      correct: 0,
      fact: 'Nimi vaihdettiin paikalliseen muotoon Mumbai, joka juontuu Mumbadevi-jumalattaresta; vanha nimi periytyi siirtomaa-ajalta.',
      hint: 'Vanha nimi periytyi portugalilaisilta ja briteiltä.',
    },
  ],

  peking: [
    {
      q: 'Minkä maan pääkaupunki Peking on?',
      options: ['Kiina', 'Japani', 'Etelä-Korea', 'Thaimaa'],
      correct: 0,
      level: 1,
      fact: 'Peking on ollut Kiinan keisarien ja tasavallan pääkaupunki vuosisatoja.',
      hint: 'Maa on väkiluvultaan maailman suurimpia.',
    },
    {
      q: 'Mikä valtava rakennelma kiemurtelee Pekingin pohjoispuolen vuorilla?',
      options: ['Kiinan muuri', 'Eiffel-torni', 'Suuri kanava', 'Pyramidi'],
      correct: 0,
      level: 1,
      fact: 'Muuria rakennettiin yli kaksituhatta vuotta suojaksi pohjoisen ratsukansoja vastaan.',
      hint: 'Sitä rakennettiin suojaksi pohjoisen ratsukansoja vastaan.',
    },
    {
      q: 'Kuinka moni puhuu kiinaa äidinkielenään?',
      options: ['noin miljardi', 'noin miljoona', 'noin sata miljoonaa', 'noin kymmenen miljoonaa'],
      correct: 0,
      level: 3,
      fact: 'Mandariinikiina on maailman puhutuin äidinkieli.',
      hint: 'Enemmän kuin millään muulla kielellä maailmassa.',
    },
    {
      q: 'Mikä keisarien palatsialue on Pekingin keskustassa?',
      options: ['Kielletty kaupunki', 'Kreml', 'Alhambra', 'Versailles'],
      correct: 0,
      fact: 'Palatsialue valmistui 1420-luvulla, ja sen muurien sisällä hallitsi 24 keisaria. Nykyään se on museo, jossa käy miljoonia vieraita vuodessa.',
      hint: 'Tavallinen kansa ei päässyt muurien sisään — siitä nimi.',
    },
    {
      q: 'Mikä kaupunki on isännöinyt ensimmäisenä sekä kesä- että talviolympialaiset?',
      options: ['Peking', 'Tokio', 'Pariisi', 'Lontoo'],
      correct: 0,
      level: 3,
      fact: 'Kesäkisat pidettiin 2008 ja talvikisat 2022 — talvilajien lumi tuotiin pääosin lumitykeillä.',
      hint: 'Sama kaupunki sai kisat vuosina 2008 ja 2022.',
    },
  ],

  sydney: [
    {
      q: 'Millä mantereella Sydney sijaitsee?',
      options: ['Australiassa', 'Aasiassa', 'Afrikassa', 'Etelä-Amerikassa'],
      correct: 0,
      level: 1,
      fact: 'Australia on kokonainen manner ja valtio samassa paketissa.',
      hint: 'Pienin manner, joka on samalla yksi valtio.',
    },
    {
      q: 'Mikä kuuluisa rakennus seisoo Sydneyn satamassa?',
      options: ['oopperatalo', 'kuninkaanlinna', 'pyramidi', 'televisiotorni'],
      correct: 0,
      fact: 'Purjeita muistuttava Sydneyn oopperatalo on Australian tunnetuin rakennus.',
      hint: 'Sen valkoiset katot muistuttavat purjeita.',
    },
    {
      q: 'Mikä eläin loikkii luonnonvaraisena vain Australiassa?',
      options: ['kenguru', 'kirahvi', 'jääkarhu', 'laama'],
      correct: 0,
      level: 1,
      fact: 'Kenguruja on Australiassa enemmän kuin ihmisiä — poikanen kasvaa emon pussissa.',
      hint: 'Poikanen kasvaa emonsa pussissa.',
    },
    {
      q: 'Mikä on Australian pääkaupunki?',
      options: ['Canberra', 'Sydney', 'Melbourne', 'Perth'],
      correct: 0,
      level: 3,
      fact: 'Pääkaupunki rakennettiin kompromissina kahden suurimman kaupungin väliin, koska kumpikaan ei suostunut toisen johtoon.',
      hint: 'Kaupunki rakennettiin tyhjälle paikalle Sydneyn ja Melbournen väliin.',
    },
    {
      q: 'Mikä teräskaarisilta ylittää Sydneyn sataman oopperatalon vierellä?',
      options: ['Sydneyn satamasilta', 'Golden Gate', 'Tower Bridge', 'Bosporin silta'],
      correct: 0,
      fact: 'Vuonna 1932 valmistuneen sillan lempinimi on "henkari", ja sen kaarelle kiipeää päivittäin köysiin kytkettyjä kävijöitä.',
      hint: 'Paikalliset kutsuvat sitä henkariksi.',
    },
  ],

  moskova: [
    {
      q: 'Minkä maan pääkaupunki Moskova on?',
      options: ['Venäjä', 'Ukraina', 'Puola', 'Kazakstan'],
      correct: 0,
      level: 1,
      fact: 'Venäjä on maailman laajin valtio — se ulottuu Itämereltä Tyynellemerelle.',
      hint: 'Maa on pinta-alaltaan maailman suurin.',
    },
    {
      q: 'Mikä on maailman pisin rautatie, jonka itään lähtevä matka alkaa Moskovasta?',
      options: ['Siperian rata', 'Idän pikajuna', 'Kultainen rata', 'Aurinkorata'],
      correct: 0,
      level: 3,
      fact: 'Siperian rata kulkee yli 9 000 kilometriä Moskovasta Vladivostokiin — matka kestää viikon.',
      hint: 'Junamatka Tyynellemerelle kestää kokonaisen viikon.',
    },
    {
      q: 'Mikä värikäs, sipulikupolinen kirkko seisoo Moskovan Punaisella torilla?',
      options: ['Vasilin katedraali', 'Notre Dame', 'Hagia Sofia', 'Temppeliaukion kirkko'],
      correct: 0,
      level: 3,
      fact: 'Vasilin katedraalin kirjavat sipulikupolit ovat kuin satukirjasta — kirkko valmistui 1561.',
      hint: 'Kupolit näyttävät värikkäiltä sipuleilta.',
    },
    {
      q: 'Millä nimellä kutsutaan Moskovan muurien ympäröimää vallan keskusta?',
      options: ['Kreml', 'Kolosseum', 'Akropolis', 'Forum'],
      correct: 0,
      level: 1,
      fact: 'Sana tarkoittaa venäjäksi linnoitusta kaupungin sydämessä. Muurien sisällä on katedraaleja, palatseja ja presidentin virkahuoneet.',
      hint: 'Sana tarkoittaa linnoitusta kaupungin sydämessä.',
    },
    {
      q: 'Kuinka monen aikavyöhykkeen yli Venäjä ulottuu?',
      options: ['11', '3', '5', '24'],
      correct: 0,
      level: 3,
      fact: 'Kun Moskovassa on keskipäivä, Kamtšatkan niemimaalla on jo yhdeksän tuntia enemmän kelloa.',
      hint: 'Maa ulottuu Itämereltä Tyynellemerelle.',
    },
  ],

  tokio: [
    {
      q: 'Mikä Tokion seudusta tekee erityisen maailman kaupunkien joukossa?',
      options: [
        'se on maailman väkirikkain kaupunkiseutu',
        'se on maailman vanhin kaupunki',
        'se on maailman korkeimmalla sijaitseva pääkaupunki',
        'se on maailman eteläisin pääkaupunki',
      ],
      correct: 0,
      level: 1,
      fact: 'Tokion suurkaupunkialueella asuu lähes 40 miljoonaa ihmistä — enemmän kuin monessa valtiossa.',
      hint: 'Asia liittyy asukkaisiin.',
    },
    {
      q: 'Millä nimellä tunnetaan Japanin huippunopeat junat?',
      options: ['shinkansen', 'maglev-metro', 'samurai express', 'fuji-juna'],
      correct: 0,
      fact: 'Luotijunat ovat kulkeneet vuodesta 1964, ja niiden keskimyöhästyminen lasketaan sekunneissa.',
      hint: 'Nimi on japania ja tarkoittaa uutta runkolinjaa.',
    },
    {
      q: 'Mikä pyhänä pidetty vuori näkyy kirkkaalla säällä Tokioon?',
      options: ['Fuji', 'Aso', 'Tateyama', 'Ontake'],
      correct: 0,
      level: 3,
      fact: 'Fuji (3 776 m) on Japanin korkein vuori ja tulivuori, jonka huipulle vaeltaa kesäisin satojatuhansia.',
      hint: 'Vuori on kuvattu lukemattomiin puupiirroksiin.',
    },
    {
      q: 'Minkä maan pääkaupunki Tokio on?',
      options: ['Japanin', 'Kiinan', 'Etelä-Korean', 'Vietnamin'],
      correct: 0,
      level: 1,
      fact: 'Kaupunki oli aiemmin Edo; kun keisari siirtyi sinne Kiotosta 1868, nimeksi tuli Tokio eli "itäinen pääkaupunki".',
      hint: 'Saarivaltio Aasian itälaidalla, lipussa punainen ympyrä.',
    },
    {
      q: 'Miksi Tokion korkeat rakennukset suunnitellaan joustaviksi?',
      options: [
        'maanjäristysten takia',
        'hiekkamyrskyjen takia',
        'tulvien takia',
        'pakkasen takia',
      ],
      correct: 0,
      level: 3,
      fact: 'Kolme mannerlaattaa kohtaa Tokion seudun alla, joten talot rakennetaan huojumaan ja niihin asennetaan tärinänvaimentimia.',
      hint: 'Kolme mannerlaattaa kohtaa kaupungin alla.',
    },
  ],

  singapore: [
    {
      q: 'Mikä Singapore on?',
      options: [
        'saarella sijaitseva kaupunkivaltio',
        'Kiinan maakunta',
        'Intian pääkaupunki',
        'Australian osavaltio',
      ],
      correct: 0,
      level: 1,
      fact: 'Singapore on yksi maailman harvoista kaupunkivaltioista — koko maa on yhtä kaupunkia saarella.',
      hint: 'Koko maa mahtuu yhden kaupungin rajoihin.',
    },
    {
      q: 'Miksi Singaporen satama on maailmankaupalle tärkeä?',
      options: [
        'se vartioi Malakansalmen laivareittiä',
        'sieltä viedään maailman öljy',
        'se on ainoa satama Aasiassa',
        'sinne pääsee vain purjelaivalla',
      ],
      correct: 0,
      level: 3,
      fact: 'Merkittävä osa maailman konttiliikenteestä kulkee Malakansalmen kautta, ja Singapore on sen portti.',
      hint: 'Kapea salmi yhdistää kaksi valtamerta.',
    },
    {
      q: 'Mihin naapurimaahan Singapore on yhdistetty pengertiellä?',
      options: ['Malesiaan', 'Indonesiaan', 'Thaimaahan', 'Filippiineille'],
      correct: 0,
      fact: 'Johorin salmen ylittävä pengertie ja silta ovat yksi maailman vilkkaimmista rajanylityspaikoista — sadattuhannet käyvät töissä salmen toisella puolella.',
      hint: 'Naapuri on niemimaavaltio saaren pohjoispuolella.',
    },
    {
      q: 'Kuinka monta virallista kieltä Singaporessa on?',
      options: ['neljä', 'yksi', 'kaksi', 'seitsemän'],
      correct: 0,
      level: 3,
      fact: 'Viralliset kielet ovat malaiji, mandariinikiina, tamili ja englanti. Malaiji on kansalliskieli, englanti koulujen opetuskieli.',
      hint: 'Sama määrä kuin vuodenaikoja.',
    },
    {
      q: 'Mikä puoliksi leijonaa ja puoliksi kalaa esittävä patsas on Singaporen tunnus?',
      options: ['Merlion', 'Sfinksi', 'Griipi', 'Kentauri'],
      correct: 0,
      fact: 'Nimi yhdistää meren ja leijonan: Singapuran arvellaan tarkoittavan sanskritissa leijonakaupunkia. Patsas suihkuttaa vettä sataman rannassa.',
      hint: 'Nimen alkuosa tulee merestä, loppuosa kaupungin nimen leijonasta.',
    },
  ],

  kapkaupunki: [
    {
      q: 'Minkä muotoinen vuori kohoaa Kapkaupungin ylle?',
      options: ['pöytämäisen tasainen', 'teräväkärkinen', 'kaksihuippuinen', 'täysin pyöreä'],
      correct: 0,
      level: 1,
      fact: 'Pöytävuoren tasainen laki on yli kilometrin korkeudella, ja pilviverhoa kutsutaan pöytäliinaksi.',
      hint: 'Vuoren nimi kertoo saman kuin sen muoto.',
    },
    {
      q: 'Mitkä kaksi valtamerta kohtaavat Etelä-Afrikan kärjessä?',
      options: [
        'Atlantti ja Intian valtameri',
        'Atlantti ja Tyynimeri',
        'Intian valtameri ja Tyynimeri',
        'Atlantti ja Jäämeri',
      ],
      correct: 0,
      fact: 'Virallinen rajapiste on Kap Agulhas, Afrikan eteläisin kärki, hieman Hyväntoivonniemestä itään.',
      hint: 'Toinen niistä on Afrikan länsipuolella, toinen itäpuolella.',
    },
    {
      q: 'Mikä historian jakso päättyi Etelä-Afrikassa vuonna 1994?',
      options: ['apartheid eli rotuerottelu', 'siirtomaakausi', 'kultaryntäys', 'sisällissota'],
      correct: 0,
      level: 3,
      fact: 'Ensimmäisissä vapaissa vaaleissa 1994 presidentiksi valittiin Nelson Mandela, joka oli istunut vankilassa 27 vuotta.',
      hint: 'Sana on afrikaansia ja tarkoittaa erillisyyttä.',
    },
    {
      q: 'Mikä lintu pesii Kapkaupungin lähirannoilla Simon’s Townissa?',
      options: ['pingviini', 'flamingo', 'lokki', 'kolibri'],
      correct: 0,
      level: 1,
      fact: 'Afrikanpingviinien siirtokunta viihtyy Boulders Beachin lohkareilla, koska kylmä Benguelanvirta tuo mukanaan kalaa.',
      hint: 'Lintu ei osaa lentää mutta uii nopeasti kylmässä vedessä.',
    },
    {
      q: 'Kuinka monta pääkaupunkia Etelä-Afrikassa on?',
      options: ['kolme', 'yksi', 'kaksi', 'yhdeksän'],
      correct: 0,
      level: 3,
      fact: 'Hallitus istuu Pretoriassa, parlamentti Kapkaupungissa ja korkein oikeus Bloemfonteinissa — vallan kolmijako jaettiin myös maantieteellisesti.',
      hint: 'Vallan kolmijako jaettiin myös maantieteellisesti.',
    },
  ],

  losangeles: [
    {
      q: 'Mistä Los Angeles tunnetaan erityisesti?',
      options: ['elokuvateollisuudesta', 'autotehtaista', 'öljynporauksesta', 'kalastuksesta'],
      correct: 0,
      level: 1,
      fact: 'Hollywoodin kukkuloilla tehdään elokuvia yli sadan vuoden perinteellä — kyltti pystytettiin 1923.',
      hint: 'Kaupunginosan valkoiset kirjaimet näkyvät kauas.',
    },
    {
      q: 'Mikä kuvaa Los Angelesin kaupunkirakennetta?',
      options: [
        'kaupunki on levinnyt satojen kilometrien matkalle',
        'kaupunki on rakennettu veden alle',
        'kaupungissa ei ole yhtään autoa',
        'kaupunki on yhä pieni kalastajakylä',
      ],
      correct: 0,
      fact: 'Los Angelesin seutu on kasvanut moottoriteiden varsille niin laajaksi, että sitä kutsutaan sadan lähiön kaupungiksi.',
      hint: 'Autoilu muovasi kaupungin muodon.',
    },
    {
      q: 'Mikä mannerlaattojen raja tekee Kaliforniasta maanjäristysaluetta?',
      options: [
        'San Andreasin siirros',
        'Atlantin keskiselänne',
        'Mariaanien hauta',
        'Alppien poimuvuoristo',
      ],
      correct: 0,
      level: 3,
      fact: 'San Andreasin siirroksessa Tyynenmeren laatta liukuu Pohjois-Amerikan laattaa vasten noin 5 cm vuodessa.',
      hint: 'Kahden mannerlaatan raja kulkee osavaltion halki.',
    },
    {
      q: 'Minkä Yhdysvaltain osavaltion suurin kaupunki Los Angeles on?',
      options: ['Kalifornian', 'Texasin', 'Floridan', 'Nevadan'],
      correct: 0,
      level: 1,
      fact: 'Osavaltio on Yhdysvaltain väkirikkain, ja sen talous olisi yksinään yksi maailman suurimmista.',
      hint: 'Osavaltiota kutsutaan kultaiseksi osavaltioksi.',
    },
    {
      q: 'Miksi Los Angelesin yllä leijuu usein ruskeahko savusumu?',
      options: [
        'auringonvalo muuttaa pakokaasut savusumuksi vuorten sulkemassa altaassa',
        'kaupungissa poltetaan hiiltä lämmitykseen',
        'aavikon hiekka nousee ilmaan pilviksi',
        'meri höyryää lämpimänä pilveksi kaupungin ylle',
      ],
      correct: 0,
      level: 3,
      fact: 'Vuorten reunustama allas pidättää ilman paikallaan, ja auringonvalo muodostaa pakokaasuista otsonia. Siksi Kaliforniassa on maan tiukimmat pakokaasunormit.',
      hint: 'Vuoret estävät ilman vaihtumisen, ja aurinko tekee loput.',
    },
  ],

  /*
   * SAN FRANCISCO JA ISTANBUL tulivat aloitusnäytön laudalle 7.9.2026
   * (omistajan päätös: Los Angeles vaihtui San Franciscoksi ja
   * Istanbul lisättiin lähtövalinnan kohteisiin, js/ui-apurit.js
   * ETUSIVUN_KOHTEET). Tämän laudan kysymyksiä ei kysytä pelissä —
   * lähtövalinnasta lennetään heti maailmankartalle — mutta laudan
   * eheyssääntö vaatii jokaiselle kaupungille viisi kysymystä
   * (tests/rules.test.mjs), joten ne on kirjoitettu samalla kaavalla
   * kuin muillekin: helppo, keskitaso ja vaikea, selitys ja vihje.
   */
  sanfrancisco: [
    {
      q: 'Minkä salmen yli San Franciscon kuuluisin silta kulkee?',
      options: ['Kultaisen portin', 'Bosporin', 'Doverin', 'Gibraltarin'],
      correct: 0,
      level: 1,
      fact: 'Golden Gate Bridge valmistui 1937 ja oli silloin maailman pisin riippusilta — 1 280 metriä pylväiden välissä.',
      hint: 'Salmi on nimetty portiksi, ja silta on sen väriltä oranssinpunainen.',
    },
    {
      q: 'Mikä ajoneuvo kiipeää San Franciscon jyrkille kukkuloille vaijerin varassa?',
      options: ['kaapelivaunu', 'ilmalaiva', 'hevosraitiovaunu', 'köysihissi'],
      correct: 0,
      level: 2,
      fact: 'Ensimmäinen linja avattiin Clay Streetillä 1873, ja kadun alla kulkeva teräsvaijeri liikkuu yhä samaa vauhtia — noin 15 km/h.',
      hint: 'Kadun alla kulkee jatkuvasti liikkuva teräsvaijeri.',
    },
    {
      q: 'Mikä tuhosi suurimman osan San Franciscosta vuonna 1906?',
      options: [
        'maanjäristys ja sitä seurannut tulipalo',
        'hyökyaalto',
        'pyörremyrsky',
        'tulivuorenpurkaus',
      ],
      correct: 0,
      level: 3,
      fact: 'Järistys katkaisi vesijohdot, joten palo sai jatkua kolme vuorokautta. Kaupunki rakennettiin uudelleen kymmenessä vuodessa.',
      hint: 'Kaksi onnettomuutta peräkkäin: ensin maa liikkui, sitten vesijohdot olivat poikki.',
    },
    {
      q: 'Mikä ilmiö peittää San Franciscon lahden usein kesäaamuina?',
      options: ['sumu', 'hiekkamyrsky', 'lumipyry', 'tulvavesi'],
      correct: 0,
      level: 1,
      fact: 'Kylmä Kalifornianvirta ja kuuma sisämaa tekevät lahdesta yhden maailman sumuisimmista satamista — paksuimmillaan kesäkuussa.',
      hint: 'Se syntyy, kun kylmä meri kohtaa lämpimän maan.',
    },
    {
      q: 'Mikä kasvatti San Franciscon kylästä kaupungiksi vuoden 1849 tienoilla?',
      options: ['kultaryntäys', 'öljylöytö', 'timanttikaivos', 'viljakauppa'],
      correct: 0,
      level: 3,
      fact: 'Kalifornian löydön jälkeen kaupungin väkiluku kasvoi noin tuhannesta 25 000:een kahdessa vuodessa.',
      hint: 'Vuosiluku 49 jäi kaupungin tunnukseksi.',
    },
  ],

  istanbul: [
    {
      q: 'Minkä kahden maanosan rajalla Istanbul sijaitsee?',
      options: [
        'Euroopan ja Aasian',
        'Afrikan ja Aasian',
        'Euroopan ja Afrikan',
        'Aasian ja Australian',
      ],
      correct: 0,
      level: 1,
      fact: 'Se on maailman ainoa suurkaupunki, jonka keskusta jakautuu kahdelle mantereelle.',
      hint: 'Salmi jakaa kaupungin kahtia, ja lautta vie puolelta toiselle.',
    },
    {
      q: 'Mikä salmi kulkee Istanbulin läpi?',
      options: ['Bosporinsalmi', 'Malakansalmi', 'Beringinsalmi', 'Messinansalmi'],
      correct: 0,
      level: 2,
      fact: 'Salmi on kapeimmillaan noin 700 metriä, ja sen kautta kulkee Mustanmeren koko laivaliikenne Välimerelle.',
      hint: 'Sen kautta pääsee Mustaltamereltä Marmaranmerelle.',
    },
    {
      q: 'Millä nimellä Istanbul tunnettiin Itä-Rooman ja Bysantin aikaan?',
      options: ['Konstantinopoli', 'Aleksandria', 'Antiokia', 'Trapezus'],
      correct: 0,
      level: 3,
      fact: 'Kaupunki oli valtakunnan pääkaupunki vuodesta 330, ja nykyinen nimi vakiintui viralliseksi vasta 1930.',
      hint: 'Nimi tuli keisarilta, joka perusti kaupungin uudelleen vuonna 330.',
    },
    {
      q: 'Mikä Istanbulin rakennus on ollut sekä kirkkona että moskeijana?',
      options: ['Hagia Sofia', 'Notre Dame', 'Pietarinkirkko', 'Westminster Abbey'],
      correct: 0,
      level: 1,
      fact: 'Hagia Sofia valmistui 537 kirkkona, muutettiin moskeijaksi 1453, museoksi 1935 ja takaisin moskeijaksi 2020.',
      hint: 'Sen kupoli oli lähes tuhat vuotta maailman suurin.',
    },
    {
      q: 'Mikä kaupunki oli Osmanien valtakunnan pääkaupunki vuonna 1873?',
      options: ['Istanbul', 'Wien', 'Kairo', 'Bagdad'],
      correct: 0,
      level: 3,
      fact: 'Sulttaanin hovi asui tuolloin Dolmabahçen palatsissa salmen rannalla; valtakunta ulottui Balkanilta Arabiaan.',
      hint: 'Hovi asui palatsissa salmen rannalla, samassa kaupungissa jossa nyt seisot.',
    },
  ],

  ateena: [
    {
      q: 'Mikä kuuluisa temppelikukkula kohoaa Ateenan keskellä?',
      options: ['Akropolis', 'Kapitolium', 'Palatinus', 'Olympos'],
      correct: 0,
      level: 1,
      fact: 'Akropoliin Parthenon rakennettiin lähes 2 500 vuotta sitten Athene-jumalattaren kunniaksi.',
      hint: 'Nimi tarkoittaa yläkaupunkia.',
    },
    {
      q: 'Mikä hallitustapa syntyi antiikin Ateenassa?',
      options: ['demokratia', 'keisarikunta', 'sulttaanikunta', 'ritarilaitos'],
      correct: 0,
      fact: 'Ateenan kansalaiset kokoontuivat äänestämään suoraan — sana tarkoittaa kansanvaltaa.',
      hint: 'Sana on kreikkaa ja käytössä yhä lähes kaikkialla.',
    },
    {
      q: 'Missä pidettiin nykyajan ensimmäiset olympialaiset vuonna 1896?',
      options: ['Ateenassa', 'Pariisissa', 'Lontoossa', 'Roomassa'],
      correct: 0,
      level: 3,
      fact: 'Kisat palasivat antiikin juurilleen: ensimmäiset uuden ajan olympialaiset juostiin Ateenan marmoristadionilla.',
      hint: 'Kisat palasivat sinne, mistä ne olivat alun perin kotoisin.',
    },
    {
      q: 'Minkä maan pääkaupunki Ateena on?',
      options: ['Kreikan', 'Italian', 'Turkin', 'Kyproksen'],
      correct: 0,
      level: 1,
      fact: 'Maassa on yli 6 000 saarta, joista vain parisataa on asuttuja — lautta on siellä yhtä tavallinen kulkuneuvo kuin juna.',
      hint: 'Maan lippu on sinivalkoinen ja siinä on risti nurkassa.',
    },
    {
      q: 'Mikä Ateenan vieressä sijaitseva satama on Kreikan vilkkain?',
      options: ['Pireus', 'Thessaloniki', 'Patras', 'Rodos'],
      correct: 0,
      level: 3,
      fact: 'Satama on palvellut samaa kaupunkia antiikin ajoista asti, ja sieltä lähtevät lautat saarille sekä valtaosa Kreikan konttiliikenteestä.',
      hint: 'Satama on palvellut samaa kaupunkia jo antiikin sotalaivojen aikaan.',
    },
  ],

  general: [
    {
      q: 'Kuinka monta mannerta maapallolla yleensä lasketaan olevan?',
      options: ['seitsemän', 'viisi', 'kuusi', 'yhdeksän'],
      correct: 0,
      level: 3,
      fact: 'Suomalaisessa opetuksessa mantereet lasketaan yleensä seitsemäksi: Eurooppa, Aasia, Afrikka, Pohjois- ja Etelä-Amerikka, Australia ja Etelämanner.',
      hint: 'Sama määrä kuin viikonpäiviä.',
    },
    {
      q: 'Mikä on maailman suurin valtameri?',
      options: ['Tyynimeri', 'Atlantti', 'Intian valtameri', 'Jäämeri'],
      correct: 0,
      level: 1,
      fact: 'Tyynimeri peittää kolmanneksen koko maapallon pinnasta.',
      hint: 'Se peittää kolmanneksen koko maapallosta.',
    },
    {
      q: 'Mikä on maailman suurin manner?',
      options: ['Aasia', 'Afrikka', 'Eurooppa', 'Pohjois-Amerikka'],
      correct: 0,
      level: 1,
      fact: 'Aasiassa on myös eniten asukkaita — yli puolet koko ihmiskunnasta.',
      hint: 'Siellä sijaitsevat sekä Kiina että Intia.',
    },
    {
      q: 'Kuinka suuri osa maapallon pinnasta on vettä?',
      options: ['noin 70 %', 'noin 30 %', 'noin 50 %', 'noin 90 %'],
      correct: 0,
      level: 3,
      fact: 'Siksi Maata kutsutaan siniseksi planeetaksi.',
      hint: 'Avaruudesta Maa näyttää siniseltä planeetalta.',
    },
    {
      q: 'Mikä on maailman väkirikkain maa?',
      options: ['Intia', 'Kiina', 'Yhdysvallat', 'Indonesia'],
      correct: 0,
      level: 3,
      fact: 'Intia ohitti Kiinan väkiluvussa 2020-luvulla — molemmissa on yli 1,4 miljardia asukasta.',
      hint: 'Kärkipaikka vaihtui 2020-luvulla.',
    },
    {
      q: 'Mikä on maailman pisin vuoristo?',
      options: ['Andit', 'Alpit', 'Himalaja', 'Kalliovuoret'],
      correct: 0,
      level: 3,
      fact: 'Andit kulkevat yli 7 000 kilometriä pitkin Etelä-Amerikan länsireunaa.',
      hint: 'Se kulkee pitkin Etelä-Amerikan länsireunaa.',
    },
    {
      q: 'Millä mantereella ei ole yhtään pysyvää asukasta?',
      options: ['Etelämantereella', 'Australiassa', 'Afrikassa', 'Etelä-Amerikassa'],
      correct: 0,
      level: 1,
      fact: 'Etelämantereella asuu vain tutkimusasemien väkeä — ja miljoonia pingviinejä.',
      hint: 'Siellä asuu enemmän pingviinejä kuin ihmisiä.',
    },
    {
      q: 'Mikä viiva jakaa maapallon pohjoiseen ja eteläiseen puoliskoon?',
      options: ['päiväntasaaja', 'nollameridiaani', 'napapiiri', 'horisontti'],
      correct: 0,
      level: 1,
      fact: 'Viivan kohdalla päivä ja yö ovat suunnilleen yhtä pitkät ympäri vuoden.',
      hint: 'Sen kohdalla päivä ja yö ovat yhtä pitkät.',
    },
    {
      q: 'Kuinka kauan Maalta kestää kiertää Aurinko?',
      options: ['vuosi', 'vuorokausi', 'kuukausi', 'viikko'],
      correct: 0,
      level: 1,
      fact: 'Yksi kierros Auringon ympäri on yksi vuosi; pyörähdys oman akselin ympäri on vuorokausi.',
      hint: 'Sinä aikana ehtivät kaikki neljä vuodenaikaa.',
    },
    {
      q: 'Mikä valtameri erottaa Euroopan ja Pohjois-Amerikan?',
      options: ['Atlantti', 'Tyynimeri', 'Intian valtameri', 'Jäämeri'],
      correct: 0,
      level: 1,
      fact: 'Atlantin yli lensi ensimmäisenä yksin Charles Lindbergh vuonna 1927.',
      hint: 'Sen yli purjehtivat sekä viikingit että Kolumbus.',
    },
    {
      q: 'Mikä on maailman korkein vuori?',
      options: ['Mount Everest', 'Mont Blanc', 'Kilimandžaro', 'Fuji'],
      correct: 0,
      level: 1,
      fact: 'Everestin huippu on 8 849 metrissä Himalajalla, Nepalin ja Kiinan rajalla.',
      hint: 'Se sijaitsee Himalajalla.',
    },
    {
      q: 'Millä mantereella asuu eniten ihmisiä?',
      options: ['Aasiassa', 'Afrikassa', 'Euroopassa', 'Pohjois-Amerikassa'],
      correct: 0,
      fact: 'Yli puolet maailman ihmisistä asuu Aasiassa.',
      hint: 'Yli puolet ihmiskunnasta.',
    },
    {
      q: 'Mikä on maailman suurin saari?',
      options: ['Grönlanti', 'Uusi-Guinea', 'Borneo', 'Madagaskar'],
      correct: 0,
      fact: 'Saari on itsehallintoalue Tanskan kuningaskunnassa, ja yli 80 % sen pinnasta on jäätikön peitossa.',
      hint: 'Saari kuuluu Tanskan kuningaskuntaan.',
    },
    {
      q: 'Mikä on maailman laajin kuuma autiomaa?',
      options: ['Sahara', 'Gobi', 'Kalahari', 'Atacama'],
      correct: 0,
      level: 1,
      fact: 'Autiomaa peittää suurimman osan Pohjois-Afrikkaa ja on lähes Yhdysvaltain kokoinen. Kaikkein laajin autiomaa on silti kylmä Etelämanner.',
      hint: 'Se peittää suurimman osan Pohjois-Afrikkaa.',
    },
    {
      q: 'Kuinka monta jäsenvaltiota Yhdistyneissä kansakunnissa on?',
      options: ['193', '51', '128', '250'],
      correct: 0,
      level: 3,
      fact: 'Perustajajäseniä oli 51 vuonna 1945; nykyään jäseniä on 193, ja lisäksi Vatikaani ja Palestiina ovat tarkkailijoita.',
      hint: 'Vähän alle kaksisataa.',
    },
  ],
};

/**
 * "Tiesitkö että…" -tiedot paikoista. Peli näyttää yhden pelaajan nykyisestä
 * sijainnista, joten jokaisella kaupungilla on useampi vaihtoehto.
 */
export const MAAILMA_FACTS = {
  tokio: [
    'Tokiossa on enemmän ravintoloita kuin missään muussa maailman kaupungissa — myös eniten Michelin-tähtiä.',
    'Shibuyan risteyksessä voi ylittää kadun jopa 3 000 ihmistä yhdellä vihreällä valolla.',
    {
      text: 'Edo on nimetty uudelleen Tokioksi, ja keisari on siirtynyt sinne Kiotosta. Maa aikoo ilmeisesti oppia meiltä kaiken kahdessakymmenessä vuodessa. Toivotan onnea.',
      voice: 'isoisa',
    },
  ],
  singapore: [
    'Singaporen lentokentällä on maailman korkein sisävesiputous.',
    'Purukumin myynti on Singaporessa kielletty ilman reseptiä — katujen siisteys on kansallisylpeys.',
    {
      text: 'Salmen suussa on saari, jossa laivat ottavat hiiltä ja jossa kuulee kymmentä kieltä yhden korttelin matkalla. Sen koko rikkaus perustuu siihen, että kaikkien on kulkettava tästä.',
      voice: 'isoisa',
    },
  ],
  kapkaupunki: [
    'Pöytävuoren kansallispuistossa kasvaa enemmän kasvilajeja kuin koko Britanniassa.',
    'Kapkaupungin edustan Robben Islandin vankilasaari, jossa Nelson Mandela istui 18 vuotta, on nykyään museo.',
    {
      text: 'Pöytävuoren laella on valkoinen pilviliina aina kun tuuli kääntyy kaakkoon. Täytämme vesitynnyrit ja jatkamme Intiaan, kuten kaikki ennen meitä ovat tehneet.',
      voice: 'isoisa',
    },
  ],
  losangeles: [
    'Los Angelesin seudulla puhutaan yli 200 kieltä — se on maailman monikulttuurisimpia kaupunkeja.',
    'Kaupungin nimi oli alun perin espanjaa ja paljon pidempi: El Pueblo de la Reina de los Ángeles.',
    {
      text: 'Kalifornian eteläosassa on tomuinen pikkukaupunki appelsiinilehtojen keskellä, asukkaita tuskin kymmentä tuhatta. Rautatien sanotaan tulevan tänne asti. En usko sen muuttavan paikkaa miksikään.',
      voice: 'isoisa',
    },
  ],
  /*
   * SAN FRANCISCO JA ISTANBUL (7.9.2026, ks. MAAILMA_QUESTIONS yllä).
   * Isoisän merkinnät ovat 1873:n matkan sävyyn kirjoitettuja mutta
   * OPUKSEN käsialaa — päätoimittaja tarkistaa ne kaanonia vasten
   * (docs/roolitus.md: tarinateksti kuuluu Fablelle). Tämän laudan
   * tietoruutuja ei näytetä pelissä, joten muutos ei näy pelaajalle.
   */
  sanfrancisco: [
    'San Franciscon kaapelivaunut ovat maailman viimeinen liikenteessä oleva vaijerivetoinen katujärjestelmä — ensimmäinen linja avattiin 1873.',
    'Kaupunki rakennettiin uudelleen kymmenessä vuodessa vuoden 1906 maanjäristyksen ja tulipalon jälkeen.',
    {
      text: 'Kukkulat ovat niin jyrkät, että vaunut vedetään ylös kadun alla kulkevalla vaijerilla — kone jyskyttää maan sisällä eikä hevosia tarvita. Sumu tulee lahdelta iltapäivällä ja peittää sataman tunnissa.',
      voice: 'isoisa',
    },
  ],
  istanbul: [
    'Istanbul on ainoa suurkaupunki, joka sijaitsee kahdella mantereella: Bosporinsalmi erottaa Euroopan puolen Aasian puolesta.',
    'Kaupungin katettu basaari on yksi maailman vanhimmista ostoskaduista — käytäviä on yli kuusikymmentä.',
    {
      text: 'Salmen yli mennään höyrylautalla, ja kannelta katsottuna rannoilla on enemmän kupoleja ja minareetteja kuin ehdin laskea. Toinen ranta on jo Aasiaa, vaikka matka kestää neljännestunnin.',
      voice: 'isoisa',
    },
  ],
  ateena: [
    'Ateenan metroa kaivettaessa löytyi niin paljon muinaisjäännöksiä, että asemista tehtiin samalla pieniä museoita.',
    'Akropoliilla on käynyt enemmän ihmisiä kuin antiikin Ateenassa asui koko sen historian aikana.',
    {
      text: 'Kaupunki on pieni ja tomuinen, mutta kukkulalla seisoo temppeli, jonka marmori on kestänyt kaksituhatta vuotta ja kestää yhä. Sikäli kuin sitä ei kuljeteta pois — mistä en syytä ketään muuta kuin omaa maatani.',
      voice: 'isoisa',
    },
  ],
  lontoo: [
    'Lontoossa puhutaan yli 300 kieltä — se on yksi maailman monikulttuurisimmista kaupungeista.',
    'Lontoon metro eli "the Tube" on maailman vanhin — se avattiin jo 1863 höyryvetureilla.',
    {
      text: 'Kotikaupungissani kulkee juna maan alla, kaasulyhdyt palavat aamuun ja sumu on niin paksua, että vaunut kulkevat käyden. Enempää ei ihminen voi rakentaa; tähän maailma pysähtyy.',
      voice: 'isoisa',
    },
  ],
  newyork: [
    'Vapaudenpatsas oli Ranskan lahja Yhdysvalloille — se koottiin paikalleen 1886.',
    'New Yorkia kutsutaan Isoksi omenaksi, ja sen metro kulkee vuorokauden ympäri.',
    {
      text: 'Satamassa nousee laivasta enemmän ihmisiä päivässä kuin kotikylässäni asuu. Brooklyniin rakennetaan siltaa ja väitetään sen valmistuvan vuosikymmenessä; uskoin puoleen siitä.',
      voice: 'isoisa',
    },
  ],
  tanger: [
    'Gibraltarinsalmen kapeimmalla kohdalla Afrikan ja Euroopan väliä on noin 14 kilometriä — selkeällä säällä mantereet näkevät toisensa.',
    'Tangerin sataman kautta kulkee nykyään yksi Välimeren vilkkaimmista konttiterminaaleista, Tanger Med.',
    {
      text: 'Salmessa on niin kapeaa, että kannelta erottaa molemmat maanosat yhtä aikaa. Kaupungin torilla kuulin kolmea kieltä yhdessä keskustelussa, eikä kukaan pitänyt sitä merkillisenä. Meillä siitä olisi kirjoitettu tutkielma.',
      voice: 'isoisa',
    },
  ],

  kairo: [
    'Gizan suuri pyramidi on ainoa antiikin seitsemästä ihmeestä, joka on yhä pystyssä.',
    'Kairon halki virtaava Niili on koko Egyptin elämänlanka — sen varrella asuu lähes koko kansa.',
    {
      text: 'Kanava Suezissa on ollut auki neljä vuotta ja lyhentänyt Intian-matkani kuukausilla. Pyramidit ovat seisoneet neljätuhatta vuotta ja tulevat seisomaan senkin jälkeen, kun kanavamme on hiekan alla.',
      voice: 'isoisa',
    },
  ],
  rio: [
    'Rion karnevaaleilla sambakoulut tanssivat läpi yön — katsomoissa on kymmeniätuhansia ihmisiä.',
    'Sokeritopan vuorelle noustaan köysiradalla, ja huipulta näkyy koko lahti.',
    {
      text: 'Täällä hallitsee keisari ja hallinnon kieli on portugali. Lahti vuorten välissä on kauneinta mitä olen matkoillani nähnyt, ja sen sanon vasten kotimaani rantoja.',
      voice: 'isoisa',
    },
  ],
  mumbai: [
    'Mumbain dabbawalat kuljettavat joka päivä yli sata tuhatta kotona keitettyä lounasta työpaikoille — lähes virheettä.',
    'Mumbai oli aikoinaan seitsemän erillistä saarta, jotka yhdistettiin täyttömaalla.',
    {
      text: 'Bombayssa on puuvillaa, kuumuutta ja monsuuni, joka saapuu kesäkuussa täsmällisemmin kuin postivaunu Doverista. Luonto pitää täällä aikataulunsa; me emme pitäneet omaamme.',
      voice: 'isoisa',
    },
  ],
  peking: [
    'Kielletyssä kaupungissa on tarun mukaan 9 999 huonetta — se oli keisarien koti 500 vuotta.',
    'Pekingin vanhat hutong-kujat ovat kapeimmillaan alle metrin levyisiä.',
    {
      text: 'Keisari asuu muurien sisällä kaupungissa, jonne minua ei päästetty, eikä minun mielipidettäni kysytty. Pohjoisen vuorilla kiemurtelee muuri, jota on rakennettu kauemmin kuin koko valtakuntani on ollut olemassa.',
      voice: 'isoisa',
    },
  ],
  sydney: [
    'Sydneyn oopperatalon katto on päällystetty yli miljoonalla valkoisella laatalla.',
    'Sydneyn satama on yksi maailman suurimmista luonnonsatamista — lautat ovat osa arkiliikennettä.',
    {
      text: 'Siirtokunta, jonne lähetimme vankeja, on kasvanut satamakaupungiksi, jonka lahti on maailman parhaita. Villalaivat purjehtivat täältä Lontooseen sadassa päivässä, eikä kukaan täällä kaipaa meitä.',
      voice: 'isoisa',
    },
  ],
  moskova: [
    'Moskovan metroasemat rakennettiin kuin maanalaisiksi palatseiksi kristallikruunuineen ja mosaiikkeineen.',
    'Kremlin muurien sisällä on katedraaleja, palatseja ja maailman suurin kello, joka ei ole koskaan soinut.',
    {
      text: 'Tsaarin vanha kaupunki on puuta ja kupolia, ja talvi kestää täällä puolet vuodesta. Sanovat rakentavansa rautatien Tyynellemerelle asti — kuulin sen kolmelta mieheltä ja pidin kaikkia kolmea hupsuina.',
      voice: 'isoisa',
    },
  ],
};
