// Kaupungin elämää: taide-, ruoka- ja musiikkinostot Tutki-kortille.
// Pilotit Tanger ja Tripoli; laajennettu kymmeneen kaupunkiin omistajan
// hyväksyttyä mallin (30.7.). Jokainen väite on tarkistettavissa; kuvat
// ovat Wikimedia Commonsista ja niiden lisenssi on varmistettu
// tiedostokohtaisesti.
//
// `kysymys` on tutustu ja vastaa -kokeilu: nostoihin tutustumalla
// kysymykseen osaa vastata, ja oikeasta vastauksesta saa pienen
// palkkion kerran per kaupunki (game.actionKulttuuri).
export const KULTTUURI_PALKKIO = 25;

export const AFRICA_KULTTUURI = {
  tanger: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Matisse maalasi Tangerissa',
        tiedosto: 'Henri Matisse, 1911-12, La Fenêtre à Tanger (Paysage vu d\'une fenêtre Landscape viewed from a window, Tangiers), oil on canvas, 115 x 80 cm, Pushkin Museum.jpg',
        teksti: 'Ranskalainen taidemaalari Henri Matisse asui Tangerissa talvina '
          + '1912–1913 ja maalasi hotellihuoneensa ikkunasta näkymän yli '
          + 'kaupungin — sininen "Ikkuna Tangerissa" kuuluu nykyään Moskovan '
          + 'Pushkin-museon aarteisiin.',
        // Suurennoksen alle kirjoitettava parin lauseen kuvaus itse
        // teoksesta (omistajan toive).
        selite: 'La Fenêtre à Tanger (1912): näkymä hotellihuoneen ikkunasta '
          + 'yli medinan kohti englantilaista kirkkoa. Matisse maalasi koko '
          + 'näkymän sinisen sävyillä — ikkunalaudalla on maljakko, ja '
          + 'sateisen talven kaupunki hehkuu kuin iltahämärässä.',
        lahde: 'Wikimedia Commons (PD)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Minttutee',
        teksti: 'Vieraalle kaadetaan Marokossa lähes aina lasillinen makeaa '
          + 'minttuteetä. Tee kaadetaan korkealta, jotta pintaan syntyy '
          + 'vaahto — ja kieltäytymistä pidetään epäkohteliaana.',
      },
      {
        tyyppi: 'linkki',
        otsikko: 'Gnawa-musiikki',
        teksti: 'Marokon gnawa-perinteessä rautakastanjetit ja kolmikielinen '
          + 'guembri-luuttu vievät kuulijan transsiin asti — perinne on '
          + 'Unescon aineettoman kulttuuriperinnön listalla.',
        wiki: 'Gnawa',
        musiikki: 'https://music.apple.com/fi/artist/maalem-mahmoud-guinia/981105724',
        musiikkiNimi: 'Maalem Mahmoud Guinia Apple Musicissa',
        // Kenttä-äänitys gnawa-soittajista Marrakechin torilta; lisenssi
        // varmistettu archive.orgin metatiedoista (CC BY 3.0).
        aani: 'https://archive.org/download/aporee_21876_25420/marrakeshCafeEpicesGnawa270214a.mp3',
        aaniLahde: '"Rahba Kedima, Marrakech — Gnawa" — udo noll, radio aporee (CC BY 3.0)',
      },
    ],
    kysymys: {
      q: 'Kuka kuuluisa taidemaalari työskenteli Tangerissa talvina 1912–1913?',
      options: ['Henri Matisse', 'Claude Monet', 'Pablo Picasso', 'Vincent van Gogh'],
      correct: 0,
      fact: 'Matisse maalasi Tangerissa kahtena talvena. Hotelli-ikkunan näkymä '
        + '"La Fenêtre à Tanger" on nähtävissä nostossa yllä.',
    },
  },
  tripoli: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Malouf-musiikki',
        tiedosto: 'Libyan Malouf.jpg',
        teksti: 'Malouf on Libyan perinnemusiikkia, jonka juuret ovat keskiajan '
          + 'Andalusiassa. Häissä ja juhlissa sitä esittää kokonainen yhtye '
          + 'lauluineen, luuttuineen ja rumpuineen.',
        selite: 'Libyalainen malouf-yhtye soittimineen: laulajien rinnalla '
          + 'soivat oud-luuttu, viulu ja darbuka-rumpu. Sama kokoonpano on '
          + 'soittanut häissä ja juhlissa sukupolvien ajan.',
        lahde: 'Bizain, Wikimedia Commons (CC BY 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Tee ja paahdetut pähkinät',
        teksti: 'Libyalainen tee keitetään vahvaksi ja vaahtoavaksi ja juodaan '
          + 'pienistä laseista useampi kierros — viimeiseen lasiin lisätään '
          + 'usein paahdettuja maapähkinöitä tai manteleita.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Bazin-pata',
        teksti: 'Juhlapöydän kunniaruoka on bazin: ohrataikinasta keitetty '
          + 'kiinteä kakku, jonka ympärille kaadetaan tulista lammas- ja '
          + 'tomaattikastiketta ja jota syödään yhdessä isolta vadilta.',
      },
    ],
    kysymys: {
      q: 'Mikä on malouf?',
      options: ['Libyan perinnemusiikkia', 'Aavikkotuulen nimi', 'Libyalainen teelaatu', 'Vanha karavaanireitti'],
      correct: 0,
      fact: 'Malouf kulkeutui Libyaan Andalusiasta ja soi yhä häissä ja '
        + 'juhlissa — kuva yhtyeestä on nostossa yllä.',
    },
  },
  kairo: {
    /*
     * Kairo sai kategoriat (kulttuuri-kategoriat.js + maa-kategoriat
     * EGY, 5.8.2026), jotka korvaavat litteät nostot Tutki-ikkunassa.
     * Ainutlaatuinen sisältö siirrettiin sinne: Umm Kulthum
     * musiikkilinkkeineen kaupungin kanteen, ahwa ja Mahfouz maan ja
     * kaupungin nostoihin. Tänne jää vain visa (docs/tutki-aiheet.md).
     */
    kysymys: {
      q: 'Kenen laulajan radiokonsertit hiljensivät Kairon kadut kerran kuussa?',
      options: ['Umm Kulthumin', 'Edith Piafin', 'Maria Callasin', 'Miriam Makeban'],
      correct: 0,
      fact: 'Umm Kulthumin konsertit kokosivat koko arabimaailman radion '
        + 'ääreen — hänen kuvansa on nostossa yllä.',
    },
  },
  marrakech: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Jemaa el-Fnan tori',
        tiedosto: 'ElFnarMarrakech2014.jpg',
        teksti: 'Marrakechin suurtori Jemaa el-Fna muuttuu joka ilta '
          + 'ulkoilmateatteriksi: tarinankertojat kokoavat yleisön piiriin, '
          + 'ruokakojut savuavat ja gnawa-rummut jyskyttävät pimeään asti. '
          + 'Unesco on ottanut torin perinteet suojeltavien listalleen.',
        selite: 'Ilta Jemaa el-Fnalla: ruokakojujen savu nousee valojen '
          + 'läpi ja väkijoukko kiertää kojulta toiselle. Taustalla kohoaa '
          + 'Koutoubian moskeijan torni, jonka mukaan koko kaupunki '
          + 'suunnistaa.',
        lahde: 'Elgaard, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Halqa eli tarinapiiri',
        teksti: 'Tarinankertojan ympärille syntyvää yleisörinkiä kutsutaan '
          + 'nimellä halqa. Sama suullinen perinne on kulkenut torilla '
          + 'sukupolvelta toiselle vuosisatojen ajan — hyvä kertoja '
          + 'lopettaa aina jännittävään kohtaan, jotta yleisö palaa '
          + 'huomenna.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Tajine-pata',
        teksti: 'Marokkolainen tajine on keraaminen pata, jonka '
          + 'kartiomainen kansi kierrättää höyryn takaisin ruokaan. '
          + 'Padassa haudutetaan lihaa, kasviksia, oliiveja ja '
          + 'säilöttyä sitruunaa hiilloksella tuntikausia.',
      },
    ],
    kysymys: {
      q: 'Ketkä kokoavat yleisön piiriin Jemaa el-Fnan torilla iltaisin?',
      options: ['tarinankertojat', 'postinkantajat', 'kellosepät', 'karttapiirtäjät'],
      correct: 0,
      fact: 'Tarinankertojien halqa-piirit ovat torin vanhin perinne — '
        + 'kuva torin illasta on nostossa yllä.',
    },
  },
  lagos: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Eyo-kulkue',
        tiedosto: 'Eyo masquerades. Lagos State, Nigeria.jpg',
        teksti: 'Lagosin oma juhla on Eyo: valkoisiin kaapuihin ja '
          + 'leveälierisiin hattuihin pukeutuneet hahmot kulkevat kaupungin '
          + 'halki sauvoineen. Kulkue järjestetään vain erityisinä päivinä, '
          + 'ja sen sanotaan olevan Lagosin saaren henkien tervehdys.',
        selite: 'Eyo-hahmoja Lagosin kaduilla: valkoinen kaapu peittää '
          + 'kantajansa kokonaan, ja opa-sauva kohotetaan tervehdykseksi. '
          + 'Jokainen hattu kertoo, mitä sukua hahmo edustaa.',
        lahde: 'Gogeafrica, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'linkki',
        otsikko: 'Afrobeat',
        teksti: 'Fela Kuti loi Lagosissa afrobeatin: jazzin, funkin ja '
          + 'länsiafrikkalaisten rytmien seoksen, jossa yksi kappale voi '
          + 'kestää puoli tuntia. Hänen klubinsa Afrika Shrine oli '
          + 'kaupungin kuumin näyttämö, ja sama liike jatkuu yhä.',
        wiki: 'Fela Kuti',
        musiikki: 'https://music.apple.com/fi/artist/fela-kuti/55088',
        musiikkiNimi: 'Fela Kuti Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Jollof-riisi',
        teksti: 'Tomaatissa ja chilissä haudutettu jollof-riisi on koko '
          + 'Länsi-Afrikan juhlaruoka — ja ikuisen leikkimielisen kiistan '
          + 'aihe: Nigeria ja Ghana väittävät kumpikin tekevänsä sen '
          + 'paremmin.',
      },
    ],
    kysymys: {
      q: 'Mikä musiikkityyli syntyi Lagosissa Fela Kutin johdolla?',
      options: ['afrobeat', 'flamenco', 'reggae', 'samba'],
      correct: 0,
      fact: 'Afrobeat syntyi Lagosissa 1960–70-luvuilla ja soi nykyään '
        + 'kaikkialla maailmassa.',
    },
  },
  dakar: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Goréen saari',
        tiedosto: 'Island of Gorée, Senegal.jpg',
        teksti: 'Dakarin edustalla on pieni Goréen saari, jonka kautta '
          + 'orjakauppa kulki vuosisatojen ajan. Nykyään saari on Unescon '
          + 'maailmanperintökohde ja muistopaikka, jossa "paluuttoman '
          + 'oven" talo muistuttaa miljoonien kohtalosta.',
        selite: 'Goréen satama ja punakattoiset talot mereltä nähtynä. '
          + 'Rauhallinen saari on hiljainen muistomerkki: täältä laivat '
          + 'veivät ihmisiä Atlantin yli, eikä kukaan heistä palannut.',
        lahde: 'Nextdrop, Wikimedia Commons (CC BY-SA 2.0)',
      },
      {
        tyyppi: 'linkki',
        otsikko: 'Youssou N\'Dour ja mbalax',
        teksti: 'Senegalin oma tanssimusiikki on mbalax, jossa '
          + 'sabar-rummut vievät tahtia. Sen tunnetuin ääni on Youssou '
          + 'N\'Dour, dakarilainen laulaja, jonka äänen sanotaan '
          + 'kantavan yli valtamerten.',
        wiki: 'Youssou N\'Dour',
        musiikki: 'https://music.apple.com/fi/artist/youssou-ndour/153580',
        musiikkiNimi: 'Youssou N\'Dour Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Teranga',
        teksti: 'Senegalilaiset kutsuvat maataan terangan maaksi — sana '
          + 'tarkoittaa vieraanvaraisuutta. Vieras istutetaan aina '
          + 'ruokavadin ääreen: kansallisruoka thiéboudienne on kalaa ja '
          + 'riisiä, jota syödään yhdessä isolta vadilta.',
      },
    ],
    kysymys: {
      q: 'Mistä Dakarin edustalla oleva Goréen saari tunnetaan?',
      options: ['Orjakaupan muistopaikkana', 'Timanttikaivoksista', 'Majakastaan', 'Karavaanien satamana'],
      correct: 0,
      fact: 'Gorée on Unescon maailmanperintökohde ja muistuttaa '
        + 'orjakaupan uhreista — kuva saaresta on nostossa yllä.',
    },
  },
  timbuktu: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Timbuktun käsikirjoitukset',
        tiedosto: 'Timbuktu-manuscripts-astronomy-mathematics.jpg',
        teksti: 'Timbuktu oli 1500-luvulla oppineiden kaupunki, jonka '
          + 'kirjastoihin koottiin satojatuhansia käsikirjoituksia: '
          + 'tähtitiedettä, matematiikkaa, lakia ja runoutta. Suvut ovat '
          + 'varjelleet kirjoja aavikon hiekalta ja sodilta tähän päivään '
          + 'asti.',
        selite: 'Aukeama Timbuktun käsikirjoituksesta: tähtitiedettä ja '
          + 'matematiikkaa arabiankielisin selityksin ja kaavioin. '
          + 'Muste ja paperi ovat kestäneet aavikon kuivuudessa satoja '
          + 'vuosia.',
        lahde: 'Wikimedia Commons (PD)',
      },
      {
        tyyppi: 'linkki',
        otsikko: 'Aavikkoblues',
        teksti: 'Malin suuren joen varrelta nousi 1900-luvun lopulla '
          + 'aavikkoblues: kitara soi kuin ndjarka-viulu ja rytmi kulkee '
          + 'kamelin askelissa. Tyylin isä Ali Farka Touré oli kotoisin '
          + 'Niafunkésta, Timbuktun naapurista.',
        wiki: 'Ali Farka Touré',
        musiikki: 'https://music.apple.com/fi/artist/ali-farka-tour%C3%A9/7420807',
        musiikkiNimi: 'Ali Farka Touré Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Suolakaravaanit',
        teksti: 'Timbuktuun tuodaan yhä suolaa aavikon kaivoksilta kuten '
          + 'tuhat vuotta sitten: laatat kulkevat kamelien selässä '
          + 'satojen kilometrien matkan. Suola oli aikanaan niin '
          + 'arvokasta, että sitä vaihdettiin kultaan.',
      },
    ],
    kysymys: {
      q: 'Mistä Timbuktun kirjastot ovat kuuluisia?',
      options: ['Vanhoista käsikirjoituksista', 'Kultaharkoista', 'Maailman kartoista', 'Norsunluusta'],
      correct: 0,
      fact: 'Sadattuhannet käsikirjoitukset tekivät Timbuktusta oppineiden '
        + 'kaupungin — aukeama yhdestä on nostossa yllä.',
    },
  },
  kumasi: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Kente-kangas',
        tiedosto: 'Kente cloth.jpg',
        teksti: 'Asantejen juhlakangas kente kudotaan kapeista '
          + 'silkkisuikaleista, jotka ommellaan yhteen leveäksi vaatteeksi. '
          + 'Jokaisella kuviolla ja värillä on nimi ja merkitys — kangas '
          + 'on viesti, jonka voi lukea.',
        selite: 'Kente-kankaan kuvioita: kulta, vihreä ja punainen '
          + 'vuorottelevat tarkkoina geometrisina raitoina. Kultainen väri '
          + 'kertoo kuninkaallisuudesta ja vauraudesta — kente kuului '
          + 'alkujaan vain Asanten hoville.',
        lahde: '1000 thoughts, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Adinkra-symbolit',
        teksti: 'Ghanalaiset painavat kankaisiin adinkra-symboleja, joilla '
          + 'jokaisella on oma sanomansa: Gye Nyame kertoo Jumalan '
          + 'kaikkivaltiudesta ja sankofa-lintu muistuttaa, että '
          + 'menneestä saa hakea opin mukaansa.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Highlife',
        teksti: 'Ghanan oma musiikki on highlife: kitarat soivat kuin '
          + 'palmuviinin äärellä ennen vanhaan, ja puhaltimet tulivat '
          + 'mukaan tanssiorkesterien kaudella. Nimi syntyi, kun tavallinen '
          + 'väki kuunteli aidan takaa hienoston "korkeaa elämää".',
      },
    ],
    kysymys: {
      q: 'Mikä on kente?',
      options: ['Asantejen juhlakangas', 'Ghanalainen keitto', 'Rumpujen tanssi', 'Kuninkaan valtaistuin'],
      correct: 0,
      fact: 'Kente kudotaan suikaleista ja sen kuviot kantavat '
        + 'merkityksiä — kuva kankaasta on nostossa yllä.',
    },
  },
  kapkaupunki: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Bo-Kaapin värit',
        tiedosto: 'Bo-Kaap colourful houses (30114819980).jpg',
        teksti: 'Bo-Kaapin kaupunginosassa talot hehkuvat kaikissa '
          + 'sateenkaaren väreissä. Korttelit rakensivat Kap-malaijit, '
          + 'joiden esivanhemmat tuotiin Kaapille Kaakkois-Aasiasta — '
          + 'värit olivat vapauden ja oman kodin merkki.',
        selite: 'Bo-Kaapin jyrkkä katu: limetinvihreä, pinkki ja '
          + 'turkoosi talo vierekkäin Signal-kukkulan rinteessä. '
          + 'Kaupunginosa on yksi Kapkaupungin vanhimmista, ja sen '
          + 'mukulakivet ovat alkuperäiset.',
        lahde: 'Bernard DUPONT, Wikimedia Commons (CC BY-SA 2.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Cape jazz',
        teksti: 'Kapkaupungilla on oma jazzinsa: pianisti Abdullah '
          + 'Ibrahimin "Mannenberg" soi 1970-luvulla niin, että siitä '
          + 'tuli hiljainen vastarintalaulu — ja kaupungin jazzklubit '
          + 'soivat yhä viikon jokaisena iltana.',
        musiikki: 'https://music.apple.com/fi/artist/abdullah-ibrahim/3924942',
        musiikkiNimi: 'Abdullah Ibrahim Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Braai',
        teksti: 'Eteläafrikkalainen grillijuhla braai on enemmän kuin '
          + 'ateria: tuli sytytetään ajoissa, makkarat ja maissipuuro '
          + 'jaetaan kaikkien kesken ja tulen ääressä istutaan pitkään. '
          + 'Sana on afrikaansia ja tapa yhteinen koko maalle.',
      },
    ],
    kysymys: {
      q: 'Mistä Bo-Kaapin kaupunginosa tunnetaan?',
      options: ['Värikkäistä taloistaan', 'Pilvenpiirtäjistään', 'Kultakaivoksistaan', 'Kanaaleistaan'],
      correct: 0,
      fact: 'Bo-Kaapin värikkäät talot ovat Kap-malaijien perintöä — '
        + 'kuva kadulta on nostossa yllä.',
    },
  },
  sansibar: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Taarab-musiikki',
        tiedosto: 'Zanzibar Taarab Kidumbak Ensemble.jpg',
        teksti: 'Sansibarin juhlissa soi taarab: orkesterissa viulut, '
          + 'oud-luuttu ja qanun-kannel säestävät laulua, jossa '
          + 'swahilinkieliset säkeet kiertävät kohteliaina '
          + 'vihjailuina. Tyylissä kuuluu koko valtameren kauppareitti — '
          + 'Arabiaa, Intiaa ja Afrikkaa samassa sävelessä.',
        selite: 'Taarab-yhtye soittimineen Sansibarissa: viulut ja '
          + 'käsirummut rinnakkain. Pienempää kokoonpanoa kutsutaan '
          + 'kidumbakiksi — sama musiikki, mutta tanssittavampi.',
        lahde: 'Nicholas Calvin, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Siti binti Saad',
        teksti: 'Taarabin suuri ääni oli Siti binti Saad, joka lauloi '
          + '1920-luvulla ensimmäisenä itäafrikkalaisena levylle — ja '
          + 'ensimmäisenä swahiliksi. Kylänsä köyhistä lähtenyt laulaja '
          + 'esiintyi sulttaanien hoveissa asti.',
        musiikki: 'https://music.apple.com/fi/artist/siti-binti-saad/257420112',
        musiikkiNimi: 'Siti binti Saad Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Neilikkasaaret',
        teksti: 'Sansibaria kutsuttiin maustesaariksi: neilikan tuoksu '
          + 'leijui koko saaren yllä, kun sato kuivui auringossa. '
          + 'Maustetorilla myydään yhä neilikkaa, kanelia, muskottia ja '
          + 'pippuria kasoittain.',
      },
    ],
    kysymys: {
      q: 'Mikä musiikki soi Sansibarin häissä ja juhlissa?',
      options: ['taarab', 'tango', 'polkka', 'ooppera'],
      correct: 0,
      fact: 'Taarab yhdistää valtameren kauppareitin kulttuurit — kuva '
        + 'yhtyeestä on nostossa yllä.',
    },
  },
  addisabeba: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Kahviseremonia',
        tiedosto: 'Ethiopian coffee ceremony.jpg',
        teksti: 'Kahvi on kotoisin Etiopiasta, ja siellä sen juominen on '
          + 'seremonia: pavut paahdetaan hiilloksella vieraiden edessä, '
          + 'jauhetaan huhmareessa ja keitetään jebena-savipannussa. '
          + 'Kolme kierrosta kuuluu tapaan — lähteä ei sovi ennen '
          + 'kolmatta kuppia.',
        selite: 'Kahviseremonian välineet: pyöreäpohjainen jebena-pannu, '
          + 'pienet kupit ja suitsuke. Lattialle levitetään tuoretta '
          + 'ruohoa ja paahtuvien papujen savu kutsuu naapuritkin '
          + 'paikalle.',
        lahde: 'Adanech Mamo, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Ethio-jazz',
        teksti: 'Addis Abebassa syntyi 1960-luvulla ethio-jazz, kun '
          + 'Mulatu Astatke yhdisti etiopialaiset viisisäveliset '
          + 'asteikot jazziin ja latinalaisrytmeihin. Tulos ei kuulosta '
          + 'miltään muulta maailmassa — ja sitä soitetaan taas '
          + 'kaupungin klubeilla.',
        musiikki: 'https://music.apple.com/fi/artist/mulatu-astatke/76533627',
        musiikkiNimi: 'Mulatu Astatke Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Injera',
        teksti: 'Etiopialainen ateria katetaan injeran päälle: suuren, '
          + 'happaman lettuleivän, joka on lautanen, lusikka ja leipä '
          + 'samassa. Padat kaadetaan sen päälle ja syödään käsin '
          + 'yhdessä — oma pala revitään aina samasta leivästä.',
      },
    ],
    kysymys: {
      q: 'Mistä maasta kahvi on alun perin kotoisin?',
      options: ['Etiopiasta', 'Brasiliasta', 'Kolumbiasta', 'Intiasta'],
      correct: 0,
      fact: 'Kahvipensas kasvaa villinä Etiopian ylängöillä, ja '
        + 'kahviseremonia on maan vieraanvaraisuuden sydän.',
    },
  },
  kongo: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Sanza, peukalopiano',
        tiedosto: 'Sanza Boa-Zaïre-Musée royal de l\'Afrique centrale.jpg',
        teksti: 'Kongon omiin soittimiin kuuluu sanza: puulaatikkoon '
          + 'kiinnitetyt metallikielet, joita näppäillään peukaloilla. '
          + 'Pieni soitin kulkee taskussa, ja sen helähtelevä ääni '
          + 'säestää tarinoita ja pitkiä matkoja.',
        selite: 'Sanza Keski-Afrikasta: metalliset kielet on taottu eri '
          + 'mittaisiksi, jotta jokainen soi omalla korkeudellaan. '
          + 'Soittimen sukulaisia tunnetaan eri nimillä ympäri '
          + 'Afrikkaa.',
        lahde: 'Ji-Elle, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Kongolainen rumba',
        teksti: 'Kinshasan ja Brazzavillen tanssisalit synnyttivät '
          + 'kongolaisen rumban, jonka kitarat helisevät kuin vesi. '
          + 'Unesco otti rumban aineettoman kulttuuriperinnön listalle '
          + '2021 — kahden Kongon yhteisenä aarteena.',
        musiikki: 'https://music.apple.com/fi/artist/franco-luambo/387922243',
        musiikkiNimi: 'Franco Luambo Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Sapeurit',
        teksti: 'Kongon kaduilla kävelee sapeureita: tyylin mestareita, '
          + 'jotka pukeutuvat räätälöityihin pukuihin kuin juhlaan '
          + 'keskellä arkea. La Sape on leikki ja elämäntapa — '
          + 'eleganssi on heille kansalaistaito.',
      },
    ],
    kysymys: {
      q: 'Mikä kongolainen tanssimusiikki pääsi Unescon perintölistalle?',
      options: ['rumba', 'valssi', 'sirtaki', 'kalinka'],
      correct: 0,
      fact: 'Kongolainen rumba soi molemmin puolin Kongojokea ja sai '
        + 'Unescon tunnustuksen 2021.',
    },
  },

  // --- Loput kaupungit (omistajan pyyntö: koko lauta valmiiksi) --------
  karthago: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Karthagon mosaiikit',
        tiedosto: 'Lady of Carthage Mosaic (Bardo).jpg',
        teksti: 'Karthagon huviloiden lattiat päällystettiin mosaiikeilla: '
          + 'tuhansista kivenpaloista ladottiin metsästyskohtauksia, '
          + 'jumalia ja arkea. Parhaat niistä ovat nykyään Bardon museossa '
          + 'Tunisissa — yksi maailman hienoimmista mosaiikkikokoelmista.',
        selite: 'Karthagon rouva -mosaiikki 500-luvulta: kasvot on ladottu '
          + 'niin pienistä paloista, että ilme elää kuin maalauksessa. '
          + 'Teosta pidetään yhtenä myöhäisantiikin taidokkaimmista '
          + 'muotokuvista.',
        lahde: 'G41rn8, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Purppuraväri',
        teksti: 'Foinikialaisten kallein kauppatavara oli purppura, jota '
          + 'keitettiin merikotiloista. Yhden viitan värjäykseen tarvittiin '
          + 'tuhansia kotiloita — siksi purppura oli kuninkaiden väri, ja '
          + 'siksi foinikialaisia kutsuttiin purppuranpunaisen kansaksi.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Sotanorsut',
        teksti: 'Karthago koulutti pohjoisafrikkalaisia norsuja sotaan, ja '
          + 'Hannibal vei ne kuuluisasti Alppien yli Roomaa vastaan. '
          + 'Norsuilla oli omat nimensä ja hoitajansa, ja parhaat niistä '
          + 'tunnettiin koko valtakunnassa.',
      },
    ],
    kysymys: {
      q: 'Mistä Karthagon kuuluisa purppuraväri saatiin?',
      options: ['Merikotiloista', 'Hiekasta', 'Norsunluusta', 'Taatelinkivistä'],
      correct: 0,
      fact: 'Purppura keitettiin merikotiloista, ja se oli antiikin '
        + 'kallein väri — kuninkaiden ja keisarien tunnus.',
    },
  },
  murzuk: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Aavikon kalliokuvat',
        tiedosto: 'Libya 4924 Pictograms Tadrart Acacus Luca Galuzzi 2007.jpg',
        teksti: 'Murzukin aavikon länsipuolella, Tadrart Acacusin vuorilla, '
          + 'kallioihin on maalattu ja kaiverrettu kuvia tuhansien vuosien '
          + 'ajan: virtahepoja, kirahveja ja karjapaimenia. Ne todistavat, '
          + 'että Sahara oli kerran vihreä.',
        selite: 'Tadrart Acacusin kalliomaalauksia Fezzanissa: ihmishahmoja '
          + 'ja karjaa ajalta, jolloin aavikon paikalla oli järviä ja '
          + 'laidunmaita. Alue on Unescon maailmanperintökohde.',
        lahde: 'Luca Galuzzi (Lucag), Wikimedia Commons (CC BY-SA 2.5)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Taatelipalmun kaikki osat',
        teksti: 'Keitaalla taatelipalmusta käytetään kaikki: hedelmät '
          + 'syödään, lehdistä punotaan mattoja ja koreja, rungosta tehdään '
          + 'kattopalkit ja kuidusta köyttä. Sanotaan, että palmulla on '
          + 'yhtä monta käyttöä kuin vuodessa on päiviä.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Karavaanien kieli',
        teksti: 'Karavaanimatkalla vesipaikkojen nimet opeteltiin ulkoa '
          + 'kuin runo, ja oppaat lukivat reittiä tähdistä, dyynien '
          + 'muodoista ja hiekan väristä. Kartta kulki päässä, ei '
          + 'taskussa.',
      },
    ],
    kysymys: {
      q: 'Mitä Saharan kalliomaalaukset virtahepoineen todistavat?',
      options: ['Sahara oli kerran vihreä', 'Maalarit liioittelivat', 'Virtahevot elivät hiekassa', 'Kuvat ovat väärennöksiä'],
      correct: 0,
      fact: 'Tuhansia vuosia sitten Saharassa oli järviä ja laitumia — '
        + 'kalliokuvien eläimet elivät täällä oikeasti.',
    },
  },
  alkufra: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Keidas hiekkameressä',
        tiedosto: 'Kufra Oasis.jpg',
        teksti: 'Al Kufran keitaat ovat vihreitä saaria keskellä maailman '
          + 'karuinta hiekkaa — pohjavesi nousee täällä lähelle pintaa, ja '
          + 'sen varassa kasvavat taatelitarhat ja pellot.',
        selite: 'Kufran keidasta ilmasta: tumma palmuvyöhyke ja pellot '
          + 'erottuvat hiekasta jyrkkärajaisena kuin piirretty. Raja '
          + 'kulkee täsmälleen siinä, mihin vesi ylettyy.',
        lahde: 'Wikimedia Commons (PD)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Vieraanvaraisuuden laki',
        teksti: 'Aavikolla vieraanvaraisuus ei ole kohteliaisuutta vaan '
          + 'laki: matkalaiselle annetaan vettä, ruokaa ja yösija '
          + 'kysymättä, sillä jokainen tietää olevansa itse joskus '
          + 'matkalainen. Vieras on suojeluksessa kolme päivää.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Vihreä tee hiilillä',
        teksti: 'Beduiinien tee keitetään hiilloksella pienessä kannussa '
          + 'vahvaksi ja makeaksi. Kolme lasillista kuuluu tapaan: '
          + 'ensimmäinen on karvas kuin elämä, toinen makea kuin '
          + 'rakkaus ja kolmas lempeä kuin kuolema, sanotaan.',
      },
    ],
    kysymys: {
      q: 'Minkä varassa Al Kufran keitaat kukoistavat keskellä aavikkoa?',
      options: ['Pohjaveden', 'Sadekauden', 'Joen', 'Meriveden'],
      correct: 0,
      fact: 'Keitaan alla on muinaista pohjavettä, joka nousee lähelle '
        + 'pintaa — vihreys loppuu täsmälleen siihen, mihin vesi ylettyy.',
    },
  },
  sahara: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Tuaregit, aavikon siniset miehet',
        tiedosto: 'Tuareg z wielbłądem – widać miecz TAKOUBA - Sahara - 001165s.jpg',
        teksti: 'Tuaregit ovat kuljettaneet karavaaneja Saharan halki '
          + 'vuosisatojen ajan. Heitä kutsutaan sinisiksi miehiksi, koska '
          + 'indigolla värjätty kangas päästää väriään ihoon — ja miehet, '
          + 'eivät naiset, peittävät kasvonsa hunnulla.',
        selite: 'Tuareg kamelinsa kanssa: vyöllä takoba-miekka ja kasvoilla '
          + 'tagelmust-huntu, joka suojaa hiekalta ja auringolta. Kamelin '
          + 'satula on tuaregien oma malli, jossa istutaan sään edessä.',
        lahde: 'Ryszard Vorbrich, Wikimedia Commons (CC BY-SA 3.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Tifinagh-kirjaimisto',
        teksti: 'Tuaregeilla on oma ikivanha kirjaimistonsa, tifinagh, '
          + 'jonka merkkejä on kaiverrettu kallioihin parituhatta vuotta. '
          + 'Perinteisesti äidit opettivat kirjaimet lapsilleen '
          + 'piirtämällä niitä hiekkaan.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Suola painonsa arvosta',
        teksti: 'Saharan suolakaravaanit kuljettivat suolalaattoja '
          + 'etelään, missä suola vaihdettiin parhaimmillaan painonsa '
          + 'arvosta kultaan. Suola säilöi ruoan ja piti ihmisen '
          + 'hengissä helteessä — se oli aavikon valuutta.',
      },
    ],
    kysymys: {
      q: 'Miksi tuaregeja kutsutaan aavikon sinisiksi miehiksi?',
      options: [
        'Indigokangas värjää ihon siniseksi',
        'He maalaavat kasvonsa',
        'Heidän telttansa ovat siniset',
        'He purjehtivat merellä',
      ],
      correct: 0,
      fact: 'Indigolla värjätty tagelmust-huntu päästää väriä ihoon — '
        + 'siitä nimi siniset miehet.',
    },
  },
  ahaggar: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Assekremin huiput',
        tiedosto: 'Assekrem Peaks at Sunset — Hoggar Mountains, Tamanrasset.jpg',
        teksti: 'Ahaggarin vuoristo on jäätyneen tulivuorimaan sokkelo, '
          + 'jonka huiput hehkuvat auringonlaskussa kuparinpunaisina. '
          + 'Assekremin näköalapaikkaa pidetään yhtenä Saharan '
          + 'kauneimmista — nimi tarkoittaa maailman loppua.',
        selite: 'Assekremin basalttihuiput iltavalossa: vanhan tulivuoren '
          + 'jäänteet nousevat aavikosta kuin kivinen kaupunki. Yöllä '
          + 'lämpötila voi pudota pakkasen puolelle.',
        lahde: 'Rachid Hamatou, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Imzad, naisten viulu',
        teksti: 'Tuaregien imzad on yksikielinen viulu, jota soittavat vain '
          + 'naiset. Sen surumielinen ääni säestää runonlausuntaa '
          + 'leiritulilla, ja perinne on Unescon suojeluksessa — soittajia '
          + 'koulutetaan taas nuorille.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Tin Hinan, tuaregien kantaäiti',
        teksti: 'Tarun mukaan tuaregien kantaäiti oli kuningatar Tin '
          + 'Hinan, joka saapui Ahaggariin kamelilla lännestä. Hänen '
          + 'hautansa löytyi vuorilta oikeasti — sisällä oli ruhtinaallisin '
          + 'koruin haudattu nainen 300-luvulta.',
      },
    ],
    kysymys: {
      q: 'Kuka saa soittaa tuaregien imzad-viulua?',
      options: ['Vain naiset', 'Vain miehet', 'Vain lapset', 'Vain päällikkö'],
      correct: 0,
      fact: 'Imzad on naisten soitin: yksikielinen viulu, jonka ääni '
        + 'säestää runoja leiritulilla.',
    },
  },
  gao: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Askian hauta',
        tiedosto: 'Tombeau askia.jpg',
        teksti: 'Gaossa kohoaa Askian hauta: Songhain keisarin '
          + 'pyramidimainen savimonumentti 1400-luvulta, jonka seinistä '
          + 'törröttävät puupalkit toimivat rappaajien tikkaina. Se on '
          + 'Unescon maailmanperintökohde.',
        selite: 'Askian hauta Gaossa: savipyramidi, jonka palkit '
          + 'mahdollistavat vuosittaisen uudelleenrappauksen. Keisari '
          + 'Askia Muhammad teki pyhiinvaellusmatkan Mekkaan ja toi '
          + 'mukanaan rakennustaidon.',
        lahde: 'Gio53, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Griotit, elävät kirjastot',
        teksti: 'Länsi-Afrikan historian muistavat griotit: laulavat '
          + 'tarinankertojat, joiden suvut ovat säilyttäneet kuningasten '
          + 'ja kylien vaiheet ulkomuistissa sukupolvien ketjuna. Kun '
          + 'griot kuolee, sanotaan kokonaisen kirjaston palavan.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Nigerjoen kalastajat',
        teksti: 'Sorko-kalastajat ovat kulkeneet Nigerjokea pitkillä '
          + 'puuveneillään vuosisatoja. Joki antaa kapteenikalaa ja '
          + 'ahventa, ja kuivalla kaudella koko kylä nuottaa yhdessä — '
          + 'saalis jaetaan vanhan tavan mukaan.',
      },
    ],
    kysymys: {
      q: 'Keitä kutsutaan Länsi-Afrikan eläviksi kirjastoiksi?',
      options: ['Griotteja', 'Kalastajia', 'Kultaseppiä', 'Karavaanikauppiaita'],
      correct: 0,
      fact: 'Griotit muistavat historian laulaen — suvut ovat siirtäneet '
        + 'tarinat sukupolvelta toiselle satojen vuosien ajan.',
    },
  },
  sierraleone: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Freetownin puuvillapuu',
        tiedosto: 'Cotton Tree (Sierra Leone).jpg',
        teksti: 'Freetownin keskellä kasvoi valtava puuvillapuu, jonka '
          + 'alle vapautetut orjat kokoontuivat kiittämään saavuttuaan '
          + 'vapauteen 1792. Puusta tuli koko maan symboli — kaupunki '
          + 'kasvoi kirjaimellisesti sen ympärille.',
        selite: 'Cotton Tree Freetownin keskustassa: satoja vuosia vanha '
          + 'kapokkipuu, jonka juurella kaupungin historia alkoi. Myrsky '
          + 'kaatoi puun 2023, mutta sen taimia kasvatetaan jatkoksi.',
        lahde: 'Christian Trede, Wikimedia Commons (CC BY-SA 2.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Krio-kieli',
        teksti: 'Sierra Leonen yhteinen kieli on krio, joka syntyi '
          + 'vapautettujen orjien tuomista kielistä ja englannista. '
          + '"Aw di bodi?" — mitä kuuluu — ymmärretään koko maassa, '
          + 'vaikka äidinkieliä on parikymmentä.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Riisi on ruoka',
        teksti: 'Sierra Leonessa sanotaan, ettei ihminen ole syönyt, jos '
          + 'hän ei ole syönyt riisiä — muu on välipalaa. Riisin kanssa '
          + 'syödään cassavanlehtikastiketta ja maapähkinäpataa, ja '
          + 'tulisuus on kunnia-asia.',
      },
    ],
    kysymys: {
      q: 'Ketkä kokoontuivat Freetownin puuvillapuun alle vuonna 1792?',
      options: ['Vapautetut orjat', 'Kullankaivajat', 'Merirosvot', 'Karavaanikauppiaat'],
      correct: 0,
      fact: 'Vapautetut orjat kiittivät puun alla vapaudestaan — siitä '
        + 'alkoi Freetown, vapaiden kaupunki.',
    },
  },
  kappalmas: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Dan-naamiot',
        tiedosto: 'Liberia, dan, maschera, xx sec. 01.JPG',
        teksti: 'Liberian metsäseutujen dan-kansan naamiot ovat '
          + 'Länsi-Afrikan taiteen kuuluisimpia: sileäksi hiottu puu, '
          + 'kapeat silmät ja tyyni ilme. Naamio ei ole esine vaan '
          + 'henkilö — sillä on oma nimi, tehtävä ja arvo.',
        selite: 'Dan-naamio 1900-luvulta: tumma, sileä pinta ja '
          + 'suljetut kasvot. Naamiot tanssivat juhlissa, sovittelevat '
          + 'riitoja ja valvovat tapoja — jokaisella on oma roolinsa '
          + 'kylän elämässä.',
        lahde: 'Sailko, Wikimedia Commons (CC BY 3.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Pippurirannikko',
        teksti: 'Eurooppalaiset kutsuivat tätä rannikkoa '
          + 'Pippurirannikoksi: täältä ostettiin melegueta-pippuria, '
          + '"paratiisin jyviä", joka oli 1400-luvun Euroopassa mustaa '
          + 'pippuria kalliimpaa herkkua.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Palmuviini',
        teksti: 'Öljypalmun mahlasta käytetty palmuviini on '
          + 'rannikkokylien juhlajuoma, joka jaetaan kalebassikupista '
          + 'kiertäen. Ensimmäiset pisarat kaadetaan aina maahan '
          + 'esivanhemmille — vasta sitten juovat elävät.',
      },
    ],
    kysymys: {
      q: 'Millä nimellä eurooppalaiset tunsivat Liberian rannikon?',
      options: ['Pippurirannikkona', 'Kultarannikkona', 'Norsunluurannikkona', 'Helmirannikkona'],
      correct: 0,
      fact: 'Melegueta-pippuri eli paratiisin jyvät teki rannikosta '
        + 'Pippurirannikon — mauste oli kulta-arvoista.',
    },
  },
  orjarannikko: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Paluuttoman portti',
        tiedosto: 'Porte du non-retour au Benin.jpg',
        teksti: 'Ouidahin rannalla seisoo Paluuttoman portti: muistomerkki '
          + 'sillä kohdalla, josta orjalaivat lähtivät Atlantin yli. '
          + 'Rantatietä pitkin kulkee muistopolku, jonka jokainen '
          + 'pysähdys kertoo yhden vaiheen tarinasta.',
        selite: 'Paluuttoman portti Ouidahissa: pronssireliefit kuvaavat '
          + 'lähtijöitä, jotka eivät koskaan palanneet. Portti pystytettiin '
          + '1995 muistuttamaan siitä, mitä täällä tapahtui.',
        lahde: 'Wikimedia Commons (CC0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Vodun-perinne',
        teksti: 'Ouidah on vodun-uskonnon pyhä kaupunki: henkiä '
          + 'kunnioitetaan rummuin, tanssein ja uhrilahjoin, ja joka '
          + 'tammikuussa vietetään suurta vodun-juhlaa. Orjien mukana '
          + 'perinne kulki Atlantin yli ja elää Amerikoissa yhä.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Pyhät pytonit',
        teksti: 'Ouidahin pytontemppelissä käärmeet ovat kunniavieraita: '
          + 'pyton on kaupungin suojelushenki, eikä sitä saa vahingoittaa. '
          + 'Temppelin käärmeet kiertelevät öisin vapaasti, ja aamulla '
          + 'naapurit kantavat ne kohteliaasti takaisin.',
      },
    ],
    kysymys: {
      q: 'Minkä uskonnon pyhä kaupunki Ouidah on?',
      options: ['Vodunin', 'Buddhalaisuuden', 'Shintolaisuuden', 'Hindulaisuuden'],
      correct: 0,
      fact: 'Vodun kunnioittaa henkiä rummuin ja tanssein — ja kulki '
        + 'orjien mukana Atlantin yli, missä se elää yhä.',
    },
  },
  kano: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Indigovärjäyskuopat',
        tiedosto: 'Kofar Mata Dye Pit, Kano.jpg',
        teksti: 'Kanon Kofar Matan värjäyskuopat ovat toimineet '
          + 'yhtäjaksoisesti 1400-luvulta asti: kankaat upotetaan '
          + 'indigoliemeen maakuoppiin, ja sävy syvenee kaste kasteelta. '
          + 'Samat suvut ovat värjänneet täällä viisisataa vuotta.',
        selite: 'Kofar Matan kuoppia Kanossa: indigoliemi kypsyy '
          + 'maakuopissa viikkokausia ennen kuin väri on valmis. '
          + 'Tummimmat kankaat kastetaan kymmeniä kertoja — ne olivat '
          + 'aikanaan tuaregien himotuinta kauppatavaraa.',
        lahde: 'Solasly, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Durbar-juhlaratsastus',
        teksti: 'Suurina juhlapäivinä Kanon emiiri ratsastaa kaupungin '
          + 'halki tuhansien ratsumiesten saattueessa: hevoset ja '
          + 'ratsastajat on puettu kirjaviin samettiasuihin, ja juhla '
          + 'päättyy täyslaukkatervehdykseen emiirin edessä.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Vanhan kaupungin muurit',
        teksti: 'Kanoa ympäröivät aikanaan lähes 20 kilometrin pituiset '
          + 'savimuurit portteineen. Muurien sisällä kaupunki jakautui '
          + 'kortteleihin ammattien mukaan — sepät, värjärit, satulasepät '
          + 'ja kauppiaat omissaan, kuten osin yhä.',
      },
    ],
    kysymys: {
      q: 'Kuinka kauan Kanon indigokuopat ovat olleet käytössä?',
      options: ['1400-luvulta asti', 'Sata vuotta', 'Kaksikymmentä vuotta', 'Vuodesta 1960'],
      correct: 0,
      fact: 'Kofar Matan kuopat ovat värjänneet kankaita yhtäjaksoisesti '
        + 'yli viisisataa vuotta — samojen sukujen voimin.',
    },
  },
  tshadjarvi: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Järven kalastajat',
        tiedosto: 'Waving fisherman on Lake Chad (detilt).jpg',
        teksti: 'Tšad-järven buduma-kalastajat kulkevat matalaa vettä '
          + 'papyruksesta sidotuilla veneillä, joiden malli on tuhansia '
          + 'vuosia vanha. Kevyt kaislavene ei uppoa, vaikka se '
          + 'täyttyisi vedellä.',
        selite: 'Kalastaja Tšad-järvellä: matala vesi, kaislikot ja '
          + 'kelluvat saaret ovat neljän maan kalastajien yhteistä '
          + 'työmaata. Saalis kuivataan auringossa ja kulkee '
          + 'markkinoille satojen kilometrien päähän.',
        lahde: 'Coolthoom1 Removed tilt: Hike395, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Kanem-Bornun valtakunta',
        teksti: 'Järven rannoilla hallitsi tuhat vuotta Kanem-Bornun '
          + 'valtakunta, yksi Afrikan pitkäikäisimmistä: sen mai eli '
          + 'kuningas hallitsi karavaanireittejä Saharan yli, ja '
          + 'valtakunnan kirjeenvaihtoa on säilynyt Kairoon ja '
          + 'Istanbuliin asti.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Spirulina, järven leipä',
        teksti: 'Kanembu-naiset ovat keränneet järvestä spirulina-levää '
          + 'muinaisista ajoista: se kuivataan auringossa kakuiksi nimeltä '
          + 'dihé. Sama levä myydään nykyään maailmalla '
          + 'superfoodina — täällä se on ollut arkiruokaa aina.',
      },
    ],
    kysymys: {
      q: 'Mistä buduma-kalastajien veneet on tehty?',
      options: ['Papyruskaislasta', 'Teräksestä', 'Bambusta', 'Norsunluusta'],
      correct: 0,
      fact: 'Papyruksesta sidottu vene on kevyt ja uppoamaton — malli on '
        + 'pysynyt samana tuhansia vuosia.',
    },
  },
  kamerun: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Manu Dibango ja makossa',
        tiedosto: 'LesEscales2019ManuDibango 03 (cropped).jpg',
        teksti: 'Kamerunin oma sointi on makossa, jonka saksofonisti Manu '
          + 'Dibango vei maailmalle: hänen "Soul Makossa" -kappaleensa '
          + 'rytmiä on lainattu maailmanhiteissä vuosikymmenten ajan. '
          + 'Douala tanssii makossaa yhä.',
        selite: 'Manu Dibango lavalla saksofoneineen: tumma puku, '
          + 'tummat lasit ja leveä hymy olivat tavaramerkki. Hän soitti '
          + 'yli kuusikymmentä vuotta ja yhdisti jazzin, funkin ja '
          + 'Kamerunin rytmit.',
        lahde: 'Selbymay, Wikimedia Commons (CC BY-SA 4.0)',
        musiikki: 'https://music.apple.com/fi/artist/manu-dibango/5361622',
        musiikkiNimi: 'Manu Dibango Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Ndolé-pata',
        teksti: 'Kamerunin kansallisruoka on ndolé: karvaslehdistä, '
          + 'maapähkinöistä ja lihasta tai katkaravuista haudutettu pata. '
          + 'Juhlissa sen valmistus kestää koko päivän, ja lehtien '
          + 'karvaus keitetään pois monessa vedessä.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Tulivuori meren äärellä',
        teksti: 'Kamerunvuori on Länsi-Afrikan korkein huippu ja yhä '
          + 'toimiva tulivuori, joka nousee suoraan merestä yli neljään '
          + 'kilometriin. Paikalliset kutsuvat sitä nimellä Mongo ma '
          + 'Ndemi, suuruuden vuori.',
      },
    ],
    kysymys: {
      q: 'Kuka vei Kamerunin makossa-rytmin maailmalle?',
      options: ['Manu Dibango', 'Louis Armstrong', 'Fela Kuti', 'Miriam Makeba'],
      correct: 0,
      fact: 'Saksofonisti Manu Dibangon "Soul Makossa" (1972) teki '
        + 'makossasta maailmankuulun.',
    },
  },
  angola: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Tšokwe-naamiot',
        tiedosto: 'Masks of Africa of Chokwe people freigestellt.jpg',
        teksti: 'Angolan tšokwe-kansan naamiot ja veistokset kuuluvat '
          + 'Afrikan taiteen arvostetuimpiin: pwo-naamio kuvaa '
          + 'ihannenaista, ja sen tanssii — yllättäen — aina mies, '
          + 'joka kunnioittaa esityksellä naisten voimaa.',
        selite: 'Tšokwe-naamioita: hienopiirteiset kasvot, arpikuvioinnit '
          + 'ja punottu tukka. Naamiot esiintyvät mukanda-juhlissa, '
          + 'joissa pojat kasvavat miehiksi.',
        lahde: 'Wikimedia Commons (CC0)',
        musiikki: 'https://music.apple.com/fi/artist/bonga/2413242',
        musiikkiNimi: 'Bonga Apple Musicissa',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Semba, kizomban emo',
        teksti: 'Luandan tanssisaleissa syntyi semba, jonka jälkeläisiä '
          + 'ovat sekä maailmalle levinnyt kizomba että Brasiliaan '
          + 'purjehtinut samba. Laulaja Bonga teki sembasta myös '
          + 'vastarinnan äänen maanpaossa 1970-luvulla.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Sona-hiekkapiirrokset',
        teksti: 'Tšokwe-tarinankertoja piirtää hiekkaan sona-kuvion '
          + 'yhdellä katkeamattomalla viivalla samalla kun tarina etenee. '
          + 'Kuviot ovat niin loogisia, että matemaatikot tutkivat niitä '
          + 'yhä — tarina ja geometria samassa viivassa.',
      },
    ],
    kysymys: {
      q: 'Mitkä kaksi tunnettua tanssia polveutuvat Angolan sembasta?',
      options: ['Kizomba ja samba', 'Valssi ja polkka', 'Tango ja flamenco', 'Disko ja tekno'],
      correct: 0,
      fact: 'Semba kulki orjalaivojen mukana Brasiliaan sambaksi, ja '
        + 'kotimaassa siitä kasvoi kizomba.',
    },
  },
  namib: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Maailman vanhin aavikko',
        tiedosto: '006 Dune 45 in Sossusvlei at sunrise Photo by Giles Laurent.jpg',
        teksti: 'Namib on maailman vanhin aavikko — kuivana ainakin 55 '
          + 'miljoonaa vuotta. Sossusvlein dyynit ovat maailman '
          + 'korkeimpia, ja aamuvalossa niiden punainen hiekka hehkuu '
          + 'kuin hiillos.',
        selite: 'Dyyni 45 auringonnousussa: rautapitoinen hiekka värjää '
          + 'dyynit punaisiksi, ja harjanne piirtää veitsenterävän rajan '
          + 'valon ja varjon välille. Dyyni on satoja metrejä korkea.',
        lahde: 'Giles Laurent, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Welwitschia, kahden lehden vanhus',
        teksti: 'Namibissa kasvaa welwitschia, joka kasvattaa koko '
          + 'elämänsä aikana vain kaksi lehteä — ja elää yli tuhat '
          + 'vuotta. Kasvi juo sumun, jonka kylmä merivirta työntää '
          + 'aamuisin aavikon ylle.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Himbojen punamulta',
        teksti: 'Himba-paimentolaiset voitelevat ihonsa ja hiuksensa '
          + 'okrasta ja voista sekoitetulla punamullalla, joka suojaa '
          + 'auringolta ja kuivuudelta. Punainen sävy on myös kauneuden '
          + 'ja maan väri — himbat kantavat aavikkoa ihollaan.',
      },
    ],
    kysymys: {
      q: 'Mistä welwitschia-kasvi saa vetensä Namibin aavikolla?',
      options: ['Meren sumusta', 'Sateista', 'Pohjavedestä', 'Kastelusta'],
      correct: 0,
      fact: 'Kylmä Benguelan merivirta työntää sumun aavikolle, ja '
        + 'welwitschia juo sen lehdillään — yli tuhat vuotta.',
    },
  },
  sthelena: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Longwood House',
        tiedosto: 'Longwood House le 12 janvier 2008.jpg',
        teksti: 'Napoleon eli viimeiset vuotensa Longwood Housessa, '
          + 'tuulisella ylängöllä keskellä Atlanttia. Talo on nykyään '
          + 'museo, jota Ranska hoitaa — keisarin huoneet ovat kuin hän '
          + 'olisi juuri poistunut.',
        selite: 'Longwood House St. Helenalla: matala keltainen talo '
          + 'sumuisella ylängöllä. Täällä keisari saneli muistelmansa, '
          + 'kitkeri vartijoilleen ja kuoli toukokuussa 1821.',
        lahde: 'Wikimedia Commons (CC0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Jonathan, maailman vanhin eläin',
        teksti: 'Saarella asustaa Jonathan-kilpikonna, joka kuoriutui '
          + 'arviolta 1832 — se on vanhin tunnettu elävä maaeläin. '
          + 'Jonathan on nähnyt kahdeksan Britannian hallitsijaa ja '
          + 'kymmeniä kuvernöörejä, eikä pidä kiirettä vieläkään.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Saaren oma kahvi',
        teksti: 'St. Helenalla kasvatetaan pienissä tarhoissa kahvia, '
          + 'jonka pensaat polveutuvat 1730-luvulla tuoduista taimista. '
          + 'Napoleon kehui sitä saaren ainoaksi hyväksi asiaksi — '
          + 'nykyään se on maailman harvinaisimpia kahveja.',
      },
    ],
    kysymys: {
      q: 'Kuka on Jonathan, St. Helenan kuuluisin asukas?',
      options: ['Maailman vanhin kilpikonna', 'Majakanvartija', 'Napoleonin kokki', 'Laivan papukaija'],
      correct: 0,
      fact: 'Jättiläiskilpikonna Jonathan kuoriutui arviolta 1832 ja on '
        + 'vanhin tunnettu elävä maaeläin.',
    },
  },
  viktorianputoukset: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Kuunvalosateenkaari',
        tiedosto: 'Lunar rainbow graces Victoria Falls (8366306).jpg',
        teksti: 'Täydenkuun öinä putousten vesisumuun syttyy '
          + 'kuunvalosateenkaari — haalea kaari keskellä yötä. Ilmiö on '
          + 'niin harvinainen, että sitä tullaan katsomaan toiselta '
          + 'puolelta maapalloa.',
        selite: 'Kuunvalosateenkaari kaartuu yöllä putousten rotkon yli. '
          + 'Kuu valaisee vesisumun, tähdet näkyvät taivaalla, ja '
          + 'kaukana vasemmalla palavat kaupungin valot. Väri on '
          + 'silmälle hento, mutta valokuvassa se hehkuu kuin päivällä.',
        lahde: 'Staff Sgt. Luke Wilson, Wikimedia Commons (Public domain)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Mosi-oa-Tunya',
        teksti: 'Paikallinen nimi Mosi-oa-Tunya tarkoittaa jylisevää '
          + 'savua: putousten vesisumu nousee satojen metrien korkeuteen '
          + 'ja näkyy kymmenien kilometrien päähän kuin savupatsas. '
          + 'Jylinä kuuluu kauas ennen kuin vettä näkee.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Nyaminyami, joen henki',
        teksti: 'Zambezin henki on Nyaminyami, käärmeenvartaloinen ja '
          + 'kalanpäinen joenjumala. Tonga-kansan tarinoissa se hallitsee '
          + 'joen vesiä, ja sen puinen riipus kulkee yhä monen '
          + 'joenkulkijan kaulassa suojana.',
      },
    ],
    kysymys: {
      q: 'Mitä putousten paikallinen nimi Mosi-oa-Tunya tarkoittaa?',
      options: ['Jylisevää savua', 'Suurta vettä', 'Sateenkaarta', 'Krokotiilien kotia'],
      correct: 0,
      fact: 'Vesisumu nousee kuin savupatsas ja jylinä kuuluu kauas — '
        + 'siitä nimi jylisevä savu.',
    },
  },
  kimberley: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Big Hole, käsin kaivettu kuilu',
        tiedosto: 'Big Hole Kimberley.jpg',
        teksti: 'Kimberleyn Big Hole on suurin ihmisten käsin kaivama '
          + 'kuoppa maailmassa: kymmenettuhannet kaivajat upottivat sen '
          + 'lapioin ja hakuin yli kahdensadan metrin syvyyteen '
          + 'timanttikuumeen vuosina.',
        selite: 'Big Hole nykyään: kuilun pohjalle on noussut '
          + 'vihreä järvi, ja reunalla vanha kaivoskaupunki on '
          + 'museona. Kuopasta nostettiin lähes kolme tonnia '
          + 'timantteja.',
        lahde: 'Rudolph Botha, Wikimedia Commons (CC BY-SA 3.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Timanttikuume 1871',
        teksti: 'Kun Colesbergin kukkulalta löytyi timantteja, paikalle '
          + 'ryntäsi kuukausissa kymmeniätuhansia onnenonkijoita '
          + 'teltteineen. Kukkula katosi kirjaimellisesti — sen paikalle '
          + 'kaivettiin kuoppa.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Katuvalojen kaupunki',
        teksti: 'Timanttirahalla Kimberley sai sähkökatuvalot ensimmäisenä '
          + 'koko eteläisellä pallonpuoliskolla vuonna 1882 — ennen '
          + 'Lontoota. Kaivoskaupunki halusi näyttää, ettei se ollut '
          + 'mikään syrjäkylä.',
      },
    ],
    kysymys: {
      q: 'Miten Kimberleyn Big Hole kaivettiin?',
      options: ['Käsin lapioin ja hakuin', 'Dynamiitilla', 'Kaivinkonein', 'Vesisuihkuin'],
      correct: 0,
      fact: 'Kymmenettuhannet kaivajat upottivat kuopan käsivoimin — se '
        + 'on suurin käsin kaivettu kuoppa maailmassa.',
    },
  },
  mosambik: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Mosambikin saaren kivikaupunki',
        tiedosto: 'Ilha de Mocambique.jpg',
        teksti: 'Mosambikin saari antoi nimensä koko maalle: pieni '
          + 'korallisaari oli vuosisatoja Intian valtameren kaupan '
          + 'keskus, jonka kivitalot, linnoitus ja kappeli ovat Unescon '
          + 'maailmanperintöä.',
        selite: 'Ilha de Moçambique mereltä: matala korallisaari '
          + 'kivitaloineen. Saaren pohjoispää on rakennettu kivestä ja '
          + 'eteläpää makuti-palmunlehväkatoista — kaksi maailmaa '
          + 'samalla saarella.',
        lahde: 'Stig Nygaard, Wikimedia Commons (CC BY 2.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Marrabenta',
        teksti: 'Mosambikin oma tanssimusiikki on marrabenta, joka '
          + 'syntyi Maputon esikaupungeissa kitaroista ja paikallisista '
          + 'rytmeistä. Nimi tulee sanasta rebentar, revetä — kitaroita '
          + 'soitettiin niin, että kielet katkesivat.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Piripiri',
        teksti: 'Mosambikilainen keittiö tunnetaan piripiristä: pienestä '
          + 'tulisesta chilistä, jota haudutetaan sitruunan ja '
          + 'valkosipulin kanssa kastikkeeksi. Piripiri-katkaravut ovat '
          + 'rannikon juhlaruoka, johon meri ja mauste kohtaavat.',
      },
    ],
    kysymys: {
      q: 'Mistä marrabenta-musiikki sai nimensä?',
      options: ['Katkeavista kitarankielistä', 'Meren aalloista', 'Rummun äänestä', 'Tanssin askelista'],
      correct: 0,
      fact: 'Rebentar tarkoittaa repeämistä — kitaroita soitettiin niin '
        + 'rajusti, että kielet katkesivat.',
    },
  },
  madagaskar: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Baobabien kuja',
        tiedosto: 'Adansonia grandidieri04.jpg',
        teksti: 'Madagaskarin baobabit ovat saaren omia lajeja, joita ei '
          + 'kasva missään muualla: jättiläisrungot varastoivat vettä '
          + 'kuivan kauden varalle. Kuuluisin näky on baobabien kuja, '
          + 'jonka puut ovat satoja vuosia vanhoja.',
        selite: 'Grandidierin baobabeja iltavalossa: sileät rungot '
          + 'nousevat kuin pylväät ja latvat levittäytyvät vasta '
          + 'huipulla. Tarun mukaan jumalat istuttivat puun väärinpäin, '
          + 'juuret taivasta kohti.',
        lahde: 'Bernard Gagnon, Wikimedia Commons (CC BY-SA 3.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Valiha-putkisitra',
        teksti: 'Madagaskarin kansallissoitin on valiha: bambuputki, '
          + 'jonka ympärille on viritetty kielet kehäksi. Sen helinä '
          + 'kuuluu juhlissa ja seremonioissa — soitin kertoo saaren '
          + 'juurista, sillä sen esikuva purjehti Kaakkois-Aasiasta.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Fady eli kunnioituksen säännöt',
        teksti: 'Malagassien elämää ohjaavat fadyt, esivanhempien '
          + 'asettamat kiellot ja tavat: jokin metsä voi olla pyhä, '
          + 'jokin päivä sopimaton työlle. Fady ei ole taikauskoa vaan '
          + 'tapa pitää yhteys esivanhempiin ja luontoon.',
      },
    ],
    kysymys: {
      q: 'Miksi baobabia sanotaan väärinpäin istutetuksi puuksi?',
      options: [
        'Latva näyttää juurilta taivasta vasten',
        'Se kasvaa alaspäin',
        'Juuret ovat maan päällä',
        'Se kukkii talvella',
      ],
      correct: 0,
      fact: 'Tarun mukaan jumalat istuttivat baobabin väärinpäin — '
        + 'lehdetön latva harottaa kuin juuristo taivasta kohti.',
    },
  },
  kilimandzaro: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Afrikan katto',
        tiedosto: 'Kilimanjaro, Tanzania, 2024-05-22, DD 109.jpg',
        teksti: 'Kilimandžaro on Afrikan korkein vuori ja maailman '
          + 'korkein yksinäinen vuori: se ei kuulu mihinkään '
          + 'vuoristoon vaan nousee savannilta yksin lähes kuuteen '
          + 'kilometriin, lumihuippu päiväntasaajan auringossa.',
        selite: 'Kilimandžaron leveä lumihuippu kohoaa pilvivyön '
          + 'yläpuolelle, ja etualalla on matalaa akasiapensaikkoa. '
          + 'Vuorella kiivetään viiden ilmastovyöhykkeen läpi — '
          + 'viidakosta jäätikölle kuin matkalla päiväntasaajalta '
          + 'navalle.',
        lahde: 'Diego Delso, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Chaggojen kahvitarhat',
        teksti: 'Vuoren rinteillä chagga-kansa viljelee kahvia ja '
          + 'banaania samoissa puutarhoissa, joissa banaani varjostaa '
          + 'kahvipensaita. Kihamba-tarhojen viljelytapa on satoja '
          + 'vuosia vanha ja YK:n palkitsema.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Vuori jolla on monta nimeä',
        teksti: 'Nimen alkuperästä kiistellään yhä: swahilin kilima '
          + 'tarkoittaa vuorta, ja njaro voi olla loistava, valkoinen '
          + 'tai karavaanien vesipaikka. Chaggat kutsuvat huippua '
          + 'nimellä Kipoo — sekin tarkoittaa loistavaa.',
      },
    ],
    kysymys: {
      q: 'Miksi Kilimandžaroa sanotaan maailman korkeimmaksi yksinäiseksi vuoreksi?',
      options: [
        'Se ei kuulu mihinkään vuoristoon',
        'Sinne ei pääse kukaan',
        'Se on aina pilvessä',
        'Se siirtyy paikaltaan',
      ],
      correct: 0,
      fact: 'Kilimandžaro nousee savannilta yksin lähes kuuteen '
        + 'kilometriin — ympärillä ei ole muita vuoria.',
    },
  },
  viktoria: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Järven kalastajat',
        tiedosto: 'Fishermen on the shores of Lake Victoria.jpg',
        teksti: 'Viktorianjärvi on Afrikan suurin järvi, ja sen rannoilla '
          + 'elää kalastuksesta miljoonia ihmisiä. Aamuisin rannat '
          + 'täyttyvät veneistä ja toreista, joilla kaupataan yön '
          + 'saalis — kapeasta dagaa-kalasta suureen niilinahveneen.',
        selite: 'Kalastajia Viktorianjärven rannalla: puuveneet '
          + 'työnnetään vesille käsin, ja saalis lajitellaan rannassa. '
          + 'Järvellä on omat säänsä ja aallokkonsa kuin merellä.',
        lahde: 'Africraigs, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Bugandan rummut',
        teksti: 'Järven luoteisrannalla hallitsee Bugandan kuningaskunta, '
          + 'jonka kuninkaalliset rummut ovat vallan pyhin merkki: '
          + 'jokaisella rummulla on nimi ja tehtävä, ja niiden rytmit '
          + 'kertoivat aikanaan viestit kylästä kylään.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Nimien järvi',
        teksti: 'Jokainen rantakansa kutsuu järveä omalla nimellään: '
          + 'lugandaksi se on Nalubaale, henkien koti, ja luoksi Nam '
          + 'Lolwe, loputon vesi. Eurooppalainen nimi tuli kuningatar '
          + 'Viktorian mukaan 1858 — järvi itse on miljoonia vuosia '
          + 'vanhempi.',
      },
    ],
    kysymys: {
      q: 'Mitä Bugandan kuninkaalliset rummut merkitsivät?',
      options: ['Valtaa ja viestejä', 'Sadetta', 'Kalansaalista', 'Satoa'],
      correct: 0,
      fact: 'Rummut olivat vallan pyhin merkki, ja niiden rytmit '
        + 'kuljettivat viestejä kylästä kylään.',
    },
  },
  tanganjika: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Liemba, järven vanha laiva',
        tiedosto: 'MV.Liemba.jpg',
        teksti: 'Tanganjikajärvellä liikennöi Liemba, joka rakennettiin '
          + 'Saksassa 1913 ja koottiin järvelle osina kannettuna. Laiva '
          + 'upotettiin sodassa, nostettiin ja palasi reitilleen — se on '
          + 'maailman vanhimpia yhä liikennöiviä matkustajalaivoja.',
        selite: 'MV Liemba laiturissa: satavuotias runko kantaa yhä '
          + 'matkustajia, säkkejä ja pyöriä järven kylien välillä. '
          + 'Monelle rantakylälle laiva on ainoa yhteys maailmalle.',
        lahde: 'Erasmus Kamugisha, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Maailman pisin järvi',
        teksti: 'Tanganjika on maailman pisin järvi — lähes 700 '
          + 'kilometriä — ja toiseksi syvin: pohja on yli puolentoista '
          + 'kilometrin syvyydessä. Järvessä elää satoja kalalajeja, '
          + 'joita ei tapaa missään muualla.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Yökalastuksen valot',
        teksti: 'Öisin järvellä välkkyy lyhtyjen ketju: kalastajat '
          + 'houkuttelevat valolla dagaa-parvia pintaan. Rannalta näky '
          + 'on kuin tähtitaivas olisi laskeutunut veteen — ja aamulla '
          + 'torit täyttyvät hopeisesta saaliista.',
      },
    ],
    kysymys: {
      q: 'Miten Liemba-laiva päätyi Tanganjikajärvelle?',
      options: [
        'Se koottiin järvellä osista',
        'Se purjehti jokea pitkin',
        'Se rakennettiin rannalla puusta',
        'Se nostettiin merestä',
      ],
      correct: 0,
      fact: 'Laiva rakennettiin Saksassa 1913, purettiin osiin ja '
        + 'koottiin järven rannalla uudelleen.',
    },
  },
  bahrelghazal: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Dinkojen karjaleirit',
        tiedosto: 'Cattle of the Dinka people, Juba, South Sudan - 20101230-05.jpg',
        teksti: 'Dinka-kansalle karja on kaikki: varallisuus, runous ja '
          + 'suku. Pitkäsarviset ankole-härät elävät leireissä perheiden '
          + 'kanssa, ja jokainen eläin tunnetaan nimeltä ja väriltään — '
          + 'niistä sepitetään lauluja kuin rakkaista.',
        selite: 'Dinkojen karjaa leirissä: valtavat sarvet ja vaaleat '
          + 'kyljet. Nuoret hoitavat leiriä kuukausia laidunten mukaan '
          + 'siirtyen, ja iltaisin savu suojaa laumaa hyönteisiltä.',
        lahde: 'Ranjit Bhaskar, via Al Jazeera English, Wikimedia Commons (CC BY-SA 2.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Suddin kaislameri',
        teksti: 'Bahr el Ghazalin vedet laskevat Suddiin, maailman '
          + 'suurimpiin kuuluvaan suoalueeseen, jossa Niili hajoaa '
          + 'kaislikkojen sokkeloksi. Sudd pysäytti vuosisatojen ajan '
          + 'jokaisen tutkimusmatkailijan — vesi katosi kaislameren '
          + 'sisään.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Gasellien joki',
        teksti: 'Nimi Bahr el Ghazal tarkoittaa gasellien jokea: kuivalla '
          + 'kaudella joen laitumet keräävät valtavat antilooppilaumat. '
          + 'Alueen halki vaeltaa yhä yksi maailman suurimmista '
          + 'eläinvaelluksista — miljoona antilooppia.',
      },
    ],
    kysymys: {
      q: 'Mikä on dinka-kansalle tärkeintä?',
      options: ['Karja', 'Kulta', 'Kalastus', 'Kauppa'],
      correct: 0,
      fact: 'Karja on dinkojen varallisuus ja runous: jokainen eläin '
        + 'tunnetaan nimeltä, ja niistä sepitetään lauluja.',
    },
  },
  darfur: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Jebel Marran kraatterijärvet',
        tiedosto: 'Sudan Jebel Marra Deriba Lakes edited.jpg',
        teksti: 'Darfurin ylängöllä kohoaa Jebel Marra, sammunut '
          + 'tulivuori, jonka kraatterissa lepää kaksi järveä. Vuoristo '
          + 'saa sateet, jotka tekevät siitä vihreän saaren kuivan '
          + 'savannin keskellä — hedelmätarhoja myöten.',
        selite: 'Deriban kraatterijärvet Jebel Marralla: vaalea ja '
          + 'tumma järvi sisäkkäisissä kraattereissa. Vuori on Sudanin '
          + 'korkein, ja sen rinteillä viljellään appelsiineja keskellä '
          + 'Saharan reunaa.',
        lahde: 'J Williams, Wikimedia Commons (CC BY-SA 3.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Furien maa',
        teksti: 'Darfur tarkoittaa furien kotia: Furin sulttaanikunta '
          + 'hallitsi näitä ylänköjä ja karavaanireittejä satoja vuosia, '
          + 'ja sen pääkaupungista El Fasherista lähti kuuluisa '
          + 'neljänkymmenen päivän karavaanitie Egyptiin.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Kamelipaimenten savanni',
        teksti: 'Darfurin tasangoilla karja ja kamelit vaeltavat '
          + 'laitumelta toiselle sadekausien tahdissa. Paimenperheen '
          + 'koko omaisuus kulkee mukana: teltta, padat ja laulut, '
          + 'joissa kamelin väriä ylistetään kuin runoissa.',
      },
    ],
    kysymys: {
      q: 'Mitä nimi Darfur tarkoittaa?',
      options: ['Furien kotia', 'Kuumaa tuulta', 'Kultaista hiekkaa', 'Suurta jokea'],
      correct: 0,
      fact: 'Dar on koti ja fur on alueen kansa — Darfur on furien '
        + 'koti, vanhan sulttaanikunnan maa.',
    },
  },
  suakin: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Korallista rakennettu kaupunki',
        tiedosto: 'Suakin,el-Geyf mosque.jpg',
        teksti: 'Suakinin talot ja moskeijat rakennettiin '
          + 'korallikivestä, jota sahattiin lohkareina merestä. '
          + 'Huokoinen kivi viilensi huoneet helteellä — mutta kun '
          + 'kaupunki hiljeni, korallitalot alkoivat sulaa sateisiin '
          + 'kuin sokeri.',
        selite: 'El-Geyfin moskeija Suakinissa: korallikiviset seinät '
          + 'ja veistetyt puuparvekkeet kertovat ajasta, jolloin saaren '
          + 'kaupunki oli Punaisenmeren tärkeimpiä satamia.',
        lahde: 'Bertramz, Wikimedia Commons (CC BY 3.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Pyhiinvaeltajien satama',
        teksti: 'Suakinista purjehdittiin vuosisatojen ajan Mekkaan: '
          + 'pyhiinvaeltajat kokoontuivat saarelle koko Afrikan '
          + 'sisämaasta ja odottivat monsuunituulta, joka kantaisi '
          + 'dhow-veneet Punaisenmeren yli.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Kahvia ja helmiä',
        teksti: 'Suakinin basaarissa vaihtoivat omistajaa Jemenin kahvi, '
          + 'Intian kankaat, norsunluu ja helmet, joita sukeltajat '
          + 'nostivat riutoilta vapaasukelluksella. Helmenkalastajien '
          + 'laulut tahdittivat sukelluksia kuin airot soutua.',
      },
    ],
    kysymys: {
      q: 'Mistä Suakinin talot rakennettiin?',
      options: ['Korallikivestä', 'Marmorista', 'Tiilestä', 'Puusta'],
      correct: 0,
      fact: 'Korallia sahattiin merestä lohkareina — huokoinen kivi '
        + 'viilensi talot, mutta suli hoitamattomana sateisiin.',
    },
  },
  rashafun: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Suitsukkeen maa',
        tiedosto: 'Frankincense 2005-12-31.jpg',
        teksti: 'Somalian rannikon kuivilla rinteillä kasvaa '
          + 'suitsukepuu, jonka pihka on ollut vientitavaraa neljä '
          + 'tuhatta vuotta: faaraot polttivat sitä temppeleissä, ja '
          + 'antiikin purjehtijat kutsuivat seutua Suitsukemaaksi.',
        selite: 'Suitsukepihkaa eli olibaania: puun kuoreen tehdään '
          + 'viilto, ja kirkas pihka kovettuu kyyneliksi. Parhaat '
          + 'laadut kerätään käsin samoilta puilta sukupolvesta '
          + 'toiseen.',
        lahde: 'Wikimedia Commons (PD)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Puntin maa',
        teksti: 'Egyptiläiset purjehtivat jo 3 500 vuotta sitten '
          + 'Puntin maahan hakemaan suitsuketta, mirhaa ja kultaa — '
          + 'ja monen tutkijan mielestä Punt oli juuri tämä rannikko. '
          + 'Kuningatar Hatšepsutin retki on kuvattu temppelin '
          + 'seinään asti.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Monsuunin kauppiaat',
        teksti: 'Somalirannikon purjehtijat ovat aina eläneet monsuunin '
          + 'tahdissa: puoli vuotta tuuli puhaltaa Intiaan, puoli '
          + 'vuotta takaisin. Dhow-veneet kuljettivat suitsuketta ja '
          + 'toivat kankaita ja riisiä — kello kävi tuulen mukaan.',
      },
    ],
    kysymys: {
      q: 'Mitä arvokasta Somalian rannikolta on viety neljä tuhatta vuotta?',
      options: ['Suitsuketta', 'Timantteja', 'Silkkiä', 'Teetä'],
      correct: 0,
      fact: 'Suitsukepuun pihka oli faaraoiden temppelien tuoksu — ja '
        + 'sitä kerätään samoilta rinteiltä yhä.',
    },
  },
  nairobi: {
    nostot: [
      {
        tyyppi: 'kuva',
        otsikko: 'Savanni kaupungin rajalla',
        tiedosto: 'A giraffe with a beautiful background of Nairobi City Skyline.jpg',
        teksti: 'Nairobi on ainoa pääkaupunki maailmassa, jonka rajalla '
          + 'on kansallispuisto: kirahvit, seeprat ja leijonat elävät '
          + 'savannilla, jonka taustalla kohoavat keskustan tornit. '
          + 'Aidan puolelta toiselle on vain muutama kilometri.',
        selite: 'Kirahvi Nairobin kansallispuistossa, taustalla '
          + 'kaupungin siluetti. Puisto perustettiin 1946, ja se on '
          + 'ollut kaupunkilaisten ylpeys siitä asti — safari alkaa '
          + 'bussipysäkiltä.',
        lahde: 'Alexmbogo, Wikimedia Commons (CC BY-SA 4.0)',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Matatu-taide',
        teksti: 'Nairobin matatu-pikkubussit ovat liikkuvia taideteoksia: '
          + 'jokainen on maalattu ja valaistu omaan tyyliinsä, ja '
          + 'parhaista maalauksista kilpaillaan tosissaan. Matkustaja '
          + 'valitsee bussinsa myös musiikin mukaan.',
      },
      {
        tyyppi: 'teksti',
        otsikko: 'Ngũgĩ wa Thiong\'o',
        teksti: 'Kenian suuri kirjailija Ngũgĩ wa Thiong\'o kirjoitti '
          + 'ensin englanniksi, mutta siirtyi kirjoittamaan omalla '
          + 'gikuju-kielellään — hänelle kieli oli vapauden mitta. '
          + 'Hänen romaanejaan luetaan kymmenillä kielillä.',
      },
    ],
    kysymys: {
      q: 'Mikä tekee Nairobista ainutlaatuisen pääkaupungin?',
      options: [
        'Kansallispuisto kaupungin rajalla',
        'Maailman korkein torni',
        'Kaupungin halki virtaava suurjoki',
        'Maanalainen vanhakaupunki',
      ],
      correct: 0,
      fact: 'Nairobin kansallispuiston leijonat ja kirahvit elävät '
        + 'muutaman kilometrin päässä keskustan torneista.',
    },
  },
};
