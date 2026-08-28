/*
 * MAAKOHTAISET PAIKALLISAARTEET (Raamattu, osio "Aarteet ja
 * eteneminen": *"Paikallisaarteet: joka maalle oma pari (pieni + iso),
 * paikkaan sopivia, osa hauskan yllättäviä. ~220 paria."*).
 *
 * TAULU TÄYTETÄÄN MANNER KERRALLAAN. Sisältöparit kirjoitetaan käsin —
 * pelilogiikka ei keksi maakohtaisia nimiä eikä faktoja itse. Euroopan
 * 29 maata on kirjoitettu (28.8.2026, omistajan hyväksymä lista); muut
 * mantereet odottavat vuoroaan ja käyttävät siihen asti laudan omaa
 * paria. Mekaniikka on ollut valmis alusta asti, joten sisältötyö ei
 * vaadi muutosta pelin koodiin.
 *
 * AVAIN ON ISO3-MAAKOODI (sama kuin pack.map.cityCountry), koska pari
 * kuuluu MAALLE eikä mantereelle tai kaupungille: yksi pari kattaa maan
 * kaikki kaupungit. Rivin muoto:
 *
 *   FIN: {
 *     pieniAarre: { name: 'Tervatynnyrin pohjalta löytynyt …',
 *                   fakta: 'Lyhyt tosi fakta aarteesta.' },
 *     isoAarre:   { name: '…', fakta: '…' },
 *   },
 *
 * `name` korvaa laudan oman nimen ja `fakta` on löytötekstin tosi
 * puolisko (Raamattu: *"Löytöteksti: lyhyt tosi fakta aarteesta +
 * onnentoivotus"*). Rivi saa antaa myös `kuva`-kentän samassa muodossa
 * kuin laudan omat aarrekuvat. Puuttuva kenttä jää laudan omaksi, joten
 * taulun saa täyttää maa kerrallaan ilman että peli hajoaa välissä.
 *
 * NIMEN JÄRJESTYS ON NIMENOMAAN TÄMÄ (omistajan päätös 28.8.2026,
 * kysymyskortti "hopeakolikot vai meripihka"): maan oma pari → laudan
 * oma teema (nimi JA kuva samasta rivistä, js/packs/*.js
 * themedTokenTypes) → js/tokens.js yleinen varanimi. Yleinen varanimi
 * ei saa mennä laudan oman nimen edelle, koska AARREKUVA TULEE
 * LAUDALTA: jos varanimi voittaisi, Euroopan meripihkakuvan päällä
 * lukisi "Kourallinen hopeakolikoita" ja Afrikan kaurikotiloiden
 * päällä sama. Laudoilla, jotka eivät nimeä pariaan (maailma,
 * maailmankartta), ei ole kuvaakaan, joten yleisnimi on siellä
 * turvallinen.
 */

/*
 * FAKTA ON TOSI, TARU ON MERKITTY TARUKSI. Jokainen fakta on lyhyt
 * tietoisku aarteesta (2–4 virkettä, Itämeren meripihkan mitta ja
 * tyyli, js/packs/europe.js). Kun aarre itse on legenda — Sampo,
 * Nibelungein kulta, Wilhelm Tellin jousi, Attilan hauta, Egillin
 * hopea, Polubotokin talletus — se sanotaan tekstissä suoraan
 * ("tarun mukaan", "saagan mukaan", "legendan mukaan"), eikä tarua
 * koskaan esitetä löytönä. Epävarma yksityiskohta jätetään pois
 * mieluummin kuin kirjoitetaan varmaksi.
 *
 * Järjestys on omistajan listan järjestys (Pohjola → Baltia →
 * Keski-Eurooppa → Britteinsaaret → Etelä-Eurooppa → Balkan → itä),
 * ei aakkosjärjestys: pari löytyy naapureidensa vierestä.
 */
export const PAIKALLISAARTEET = {
  FIN: {
    pieniAarre: {
      name: 'Korillinen mustikoita',
      fakta: 'Metsämustikka on mustikkaa läpikotaisin: mehu värjää sekä sormet '
        + 'että kielen, toisin kuin puutarhojen pensasmustikassa, jonka malto on '
        + 'vaalea. Marjaa saa poimia jokamiehenoikeudella kenen tahansa metsästä, '
        + 'ja valtaosa vuotuisesta sadosta jää silti korjaamatta.',
    },
    isoAarre: {
      name: 'Sammon siru',
      fakta: 'Kalevalan mukaan seppä Ilmarinen takoi Sammon, joka jauhoi viljaa, '
        + 'suolaa ja rahaa. Runoissa se särkyy meritaistelussa, ja Väinämöinen '
        + 'kerää rantaan huuhtoutuneet sirut Suomen onneksi. Sampo on myytti eikä '
        + 'löytö: tutkijat ovat arvelleet sen tarkoittaneen milloin myllyä, '
        + 'milloin maailmanpatsasta tai taivaankantta.',
    },
  },
  SWE: {
    pieniAarre: {
      name: 'Kori kanelipullia',
      fakta: 'Ruotsissa vietetään kanelipullan päivää 4. lokakuuta; leipomisen '
        + 'edistämisyhdistys keksi päivän vuonna 1999, ja siitä tuli pysyvä tapa. '
        + 'Pulla kuuluu fikaan, kahvitaukoon, joka on Ruotsissa sekä sana että '
        + 'instituutio. Taikinaan tulee kanelin lisäksi usein kardemummaa.',
    },
    isoAarre: {
      name: 'Kronan-laivan kultakolikot',
      fakta: 'Ruotsin laivaston lippulaiva Kronan räjähti ja upposi Öölannin '
        + 'edustalle 1. kesäkuuta 1676, ja mukana meni satoja miehiä. Hylky '
        + 'löytyi vasta 1980 samalta tutkijalta, joka oli aikanaan löytänyt '
        + 'Vasan, ja siitä on nostettu satoja kultakolikoita ja tuhansia '
        + 'esineitä. Kaivauksia on tehty kesä kerrallaan vuosikymmenten ajan.',
    },
  },
  NOR: {
    pieniAarre: {
      name: 'Tuubi ruskeaa mesostia',
      fakta: 'Ruskea juusto ei ole varsinaista juustoa vaan heraa, jota keitetään '
        + 'tuntikausia, kunnes maitosokeri karamellisoituu makeaksi ja ruskeaksi. '
        + 'Rasva ja sokeri tekevät siitä myös palavaa: vuonna 2013 lastillinen '
        + 'mesostia sytytti Pohjois-Norjassa tunnelipalon, joka kyti päiviä.',
    },
    isoAarre: {
      name: 'Viikinkien hopeakätkö',
      fakta: 'Viikinkiajalla hopea oli painotavaraa: koruja ja kolikoita hakattiin '
        + 'paloiksi ja punnittiin vaa\'alla, mistä nimi hakkohopea. Kätköistä '
        + 'löytyy usein arabialaisia dirhameja, jotka olivat kulkeneet idän '
        + 'jokireittejä pohjoiseen. Suurin osa kätköistä on tullut esiin '
        + 'pellonkynnössä tai metallinetsimellä, eikä kukaan tiedä, montako on '
        + 'yhä maassa.',
    },
  },
  DNK: {
    pieniAarre: {
      name: 'Pussi wienerleipiä',
      fakta: 'Tanskassa wienerleipä on wienerbrød, koska tekniikka tuli Wienistä: '
        + 'vuoden 1850 leipurilakon aikana kööpenhaminalaiset palkkasivat '
        + 'itävaltalaisia leipureita, ja voitaikina jäi taloon. Wienissä sama '
        + 'leivos tunnetaan nimellä Kopenhagener. Kerrokset syntyvät '
        + 'taittelemalla — voi voidellaan taikinan väliin yhä uudelleen.',
    },
    isoAarre: {
      name: 'Gallehusin kultasarvet',
      fakta: 'Kaksi kultaista sarvea löytyi Etelä-Jyllannin pelloilta 1639 ja '
        + '1734, ja ne oli tehty rautakaudella. Vuonna 1802 kultaseppä varasti '
        + 'ne kuninkaan kokoelmasta ja sulatti kullan rahaksi. Jäljellä ovat vain '
        + 'piirustusten mukaan tehdyt jäljennökset ja toisen sarven riimukirjoitus, '
        + 'yksi vanhimmista tunnetuista pohjoismaisista lauseista.',
    },
  },
  ISL: {
    pieniAarre: {
      name: 'Purkki hákarl-haita',
      fakta: 'Grönlanninhain liha on tuoreena myrkyllistä, koska siinä on runsaasti '
        + 'ureaa ja trimetyyliamiinioksidia. Siksi liha käytetään ensin viikkoja ja '
        + 'kuivataan sitten kuukausia, ennen kuin sen voi syödä. Sama hai on '
        + 'maailman pitkäikäisimpiä selkärankaisia: vanhimpien yksilöiden on '
        + 'arvioitu eläneen satoja vuosia.',
    },
    isoAarre: {
      name: 'Egillin hopea-arkku',
      fakta: 'Egilin saagan mukaan vanha Egill Skallagrímsson vei kaksi hopea-arkkua '
        + 'yön selkään, kätki ne ja tappoi mukanaan olleet orjat, jottei kukaan '
        + 'tietäisi paikkaa. Saaga kertoo hopean tulleen palkkiona Englannin '
        + 'kuninkaalta. Mosfellin seudulta on etsitty kätköä vuosisatoja '
        + 'löytämättä mitään — tarina on saagaa, ei asiakirjaa.',
    },
  },
  EST: {
    pieniAarre: {
      name: 'Kimppu savusilakoita',
      fakta: 'Itämeren silakka on Atlantin sillin murtoveteen sopeutunut alalaji ja '
        + 'jää selvästi valtamerten sukulaisiaan pienemmäksi. Virossa se '
        + 'savustetaan tavallisesti lepän savussa, ja kaloja myydään yhä '
        + 'rannikkokylissä kimppuina suoraan savustamon ovelta.',
    },
    isoAarre: {
      name: 'Hansakauppiaan hopeakätkö',
      fakta: 'Hansa-aikaan hopea oli kauppiaan pankki: kolikot ja astiat olivat '
        + 'säästöjä, jotka kaivettiin kellarin lattian alle heti kun sota uhkasi. '
        + 'Viron pelloista ja vanhoista taloista on löytynyt useita keskiaikaisia '
        + 'kätköjä, joissa on saksalaisia, ruotsalaisia ja venäläisiä rahoja '
        + 'samassa ruukussa. Omistaja aikoi aina palata; kätkö jäi, koska hän ei '
        + 'palannut.',
    },
  },
  LVA: {
    pieniAarre: {
      name: 'Pullo Riian mustaa balsamia',
      fakta: 'Riian musta balsami on väkevä yrttiuute, jonka reseptin laati '
        + 'apteekkari Abraham Kunze 1700-luvun puolivälissä. Sitä myydään yhä '
        + 'läpinäkymättömässä keramiikkapullossa, joka suojaa juomaa valolta ja '
        + 'lämmöltä. Tarina Katariina Suuren parantumisesta balsamilla on '
        + 'legenda, ei todistettu tapaus.',
    },
    isoAarre: {
      name: 'Kuramaan herttuan aarre',
      fakta: 'Kuramaan pienestä herttuakunnasta tuli 1600-luvulla merivalta: '
        + 'herttua Jaakobilla oli oma laivasto, telakat ja siirtokunnat Tobagossa '
        + 'ja Gambiajoella. Ruotsalaiset valtasivat maan 1658 ja veivät herttuan '
        + 'vangiksi, ja tarina kätketystä herttuan kassasta on elänyt siitä asti. '
        + 'Kassasta ei ole löytynyt jälkeäkään.',
    },
  },
  LTU: {
    pieniAarre: {
      name: 'Šakotis-kakku',
      fakta: 'Šakotis paistetaan avotulen päällä pyörivän vartaan ympärille: '
        + 'taikinaa valellaan ohuina kerroksina, ja valuva taikina jähmettyy '
        + 'piikeiksi. Yhteen kakkuun menee kymmeniä munia, ja se on häiden ja '
        + 'juhlien kakku. Sama leivos tunnetaan Puolassa nimellä sękacz ja '
        + 'Saksassa Baumkuchen.',
    },
    isoAarre: {
      name: 'Vilnan katedraalin kätkö',
      fakta: 'Vilnan katedraalin kirkkoaarteet muurattiin 1939 piiloon seinän '
        + 'onkaloon, kun sota lähestyi. Kätkö löytyi vasta 1985 korjaustöissä, ja '
        + 'neuvostoaikana löydöstä vaiettiin. Kalkit, monstranssit ja '
        + 'reliikkirasiat tulivat yleisön nähtäville vasta itsenäistymisen jälkeen.',
    },
  },
  POL: {
    pieniAarre: {
      name: 'Krakovan obwarzanek-rinkeli',
      fakta: 'Obwarzanek keitetään ennen paistamista, ja siitä tulee nimikin: '
        + 'obwarzać tarkoittaa keittämistä. Rinkeli mainitaan Krakovan hovin '
        + 'tileissä jo 1300-luvulla, ja EU on suojannut nimen '
        + 'alkuperämerkinnällä. Kaupungin sinisistä kärryistä niitä myydään '
        + 'kymmeniätuhansia joka päivä.',
    },
    isoAarre: {
      name: 'Rafaelin kadonnut muotokuva',
      fakta: 'Rafaelin Nuoren miehen muotokuva kuului Krakovassa Czartoryskien '
        + 'kokoelmaan, kunnes miehittäjät veivät sen 1939. Teos nähtiin viimeksi '
        + 'kenraalikuvernööri Hans Frankin hallussa, ja jälki katkeaa sodan '
        + 'loppuun 1945. Maalausta pidetään merkittävimpänä kadonneena '
        + 'taideteoksena, ja se on yhä Puolan etsintälistan kärjessä.',
    },
  },
  CZE: {
    pieniAarre: {
      name: 'Korillinen humalankäpyjä',
      fakta: 'Žatecin eli Saazin humala on yksi maailman arvostetuimmista jaloista '
        + 'humalalajikkeista, ja se antaa tšekkiläiselle vaalealle oluelle sen '
        + 'yrttisen tuoksun. Plzeňissä pantiin 1842 ensimmäinen kirkas pilsner, ja '
        + 'tyyli levisi sieltä koko maailmaan. Tšekit juovat yhä henkeä kohti '
        + 'enemmän olutta kuin mikään muu kansa.',
    },
    isoAarre: {
      name: 'Rudolf II:n kabinetin helmi',
      fakta: 'Keisari Rudolf II kokosi Prahan linnaan Euroopan kuuluisimman '
        + 'kuriositeettikabinetin: taidetta, koneita, kiviä ja luonnonihmeitä '
        + 'samoissa saleissa. Kolmikymmenvuotisen sodan viimeisenä syksynä 1648 '
        + 'ruotsalaiset joukot valtasivat linnan ja veivät kokoelman laivoilla '
        + 'Tukholmaan. Osa esineistä on yhä Ruotsissa, muun muassa jättimäinen '
        + 'Codex Gigas; suuri osa katosi jäljettömiin.',
    },
  },
  DEU: {
    pieniAarre: {
      name: 'Pussi pretzeleitä',
      fakta: 'Saksalainen laugenbrezel kastetaan ennen paistamista laimeaan '
        + 'lipeäliuokseen, ja juuri se antaa kuoren tumman värin ja oman makunsa. '
        + 'Solmun sanotaan esittävän ristissä olevia rukoilevia käsivarsia, mutta '
        + 'selitys on tarina eikä todistettu. Rinkeli on yhä leipurin '
        + 'ammattikunnan tunnus ja roikkuu monen leipomon kyltissä.',
    },
    isoAarre: {
      name: 'Nibelungein aarre',
      fakta: 'Nibelungenlaulun mukaan Hagen upotti Siegfriedin perinnön, koko '
        + 'Nibelungein kulta-aarteen, Reiniin lähelle Wormsia eikä kertonut '
        + 'paikkaa kenellekään. Runoelma kirjoitettiin noin vuonna 1200, ja '
        + 'Wagner teki siitä myöhemmin oopperasarjansa. Aarretta on etsitty '
        + 'Reinistä yhä uudelleen, mutta se on runon aarre eikä arkistojen.',
    },
  },
  AUT: {
    pieniAarre: {
      name: 'Sacher-kakku puulaatikossa',
      fakta: 'Sacherkakun keksi vuonna 1832 kuusitoistavuotias oppipoika Franz '
        + 'Sacher, kun ruhtinas Metternichin keittiömestari sairastui. Hotel '
        + 'Sacher ja konditoria Demel riitelivät nimestä oikeudessa seitsemän '
        + 'vuotta, ja Wienissä puhutaan yhä makeasta oikeusjutusta. Aito kakku '
        + 'lähetetään puulaatikossa, ja aprikoosihillo on sen salaisuus.',
    },
    isoAarre: {
      name: 'Florentiner-timantti',
      fakta: 'Florentiner oli 137 karaatin keltainen timantti ja Habsburgien '
        + 'kruununjalokivi. Keisariperhe otti sen mukaan maanpakoon 1918, ja '
        + 'Sveitsissä kivi katosi; sen uskotaan päätyneen varkaan mukana '
        + 'valtameren taakse ja mahdollisesti hiotun uudelleen tunnistamattomaksi. '
        + 'Julkisesti sitä ei ole nähty sadan vuoden aikana.',
    },
  },
  CHE: {
    pieniAarre: {
      name: 'Kiekko alppijuustoa',
      fakta: 'Yhteen emmentalkiekkoon menee toistatuhatta litraa maitoa, ja valmis '
        + 'kiekko painaa lähes sata kiloa. Reiät syntyvät bakteereista, jotka '
        + 'tuottavat kypsymisen aikana hiilidioksidia; tutkijoiden mukaan maidon '
        + 'pienet heinähiukkaset toimivat reikien alkuina, ja siksi entistä '
        + 'puhtaampi koneellinen lypsy on kutistanut reikiä.',
    },
    isoAarre: {
      name: 'Wilhelm Tellin varsijousi',
      fakta: 'Legendan mukaan Wilhelm Tell ampui varsijousella omenan poikansa '
        + 'päästä ja piti toista nuolta takkinsa alla vouti Gessleriä varten. '
        + 'Tarina kirjattiin ensi kerran noin 1470 Sarnenin valkoiseen kirjaan, ja '
        + 'Schiller teki siitä näytelmän 1804. Historiallista Telliä ei ole '
        + 'löytynyt yhdestäkään asiakirjasta: jousi on tarun esine.',
    },
  },
  NLD: {
    pieniAarre: {
      name: 'Kori tulppaanisipuleita',
      fakta: 'Tulppaani ei ole alkujaan hollantilainen vaan tuotiin 1500-luvulla '
        + 'Osmanien valtakunnasta. Vuosien 1636–37 huippuhinnoilla harvinaisimmasta '
        + 'sipulista maksettiin saman verran kuin kanaalitalosta, ja helmikuussa '
        + '1637 markkina romahti päivissä. Halutuimpien tulppaanien liekkikuviot '
        + 'olivat itse asiassa viruksen aiheuttamia.',
    },
    isoAarre: {
      name: 'VOC-kauppalaivan hopealasti',
      fakta: 'Hollannin Itä-Intian kauppakomppania VOC oli 1600-luvulla maailman '
        + 'suurin yhtiö ja lähetti Aasiaan tuhansia laivalasteja hopeaa, jolla '
        + 'mausteet maksettiin. Osa laivoista ei koskaan palannut, ja hylkyjä on '
        + 'löydetty niin Australian länsirannikolta kuin Atlantiltakin. '
        + 'Kolikkolastit ovat yhä tarkkaan kirjattuina yhtiön säilyneissä '
        + 'tilikirjoissa.',
    },
  },
  GBR: {
    pieniAarre: {
      name: 'Purkki marmeladia',
      fakta: 'Marmeladi tarvitsee katkeraa sevillanappelsiinia, joka kypsyy vain '
        + 'talvella, ja valtaosa Sevillan sadosta viedään Britanniaan '
        + 'keitettäväksi. Sana tulee portugalin kvittenihilloa tarkoittavasta '
        + 'sanasta marmelada; tarina Maria Stuartista ja sanoista "Marie est '
        + 'malade" on pelkkä kansanselitys. Dundeessa marmeladia on tehty '
        + 'kaupaksi 1700-luvun lopulta asti.',
    },
    isoAarre: {
      name: 'Kuningas Juhanan jalokivet',
      fakta: 'Kuningas Juhana menetti lokakuussa 1216 kuormastonsa ylittäessään '
        + 'Washin matalaa lahtea nousuveden aikaan, ja mukana meni kruunun '
        + 'aarteisto. Kuningas kuoli muutamaa päivää myöhemmin. Aarretta ei ole '
        + 'löytynyt, ja etsintää mutkistaa se, että lahti on sittemmin liettynyt: '
        + 'onnettomuuspaikka on nykyään kuivaa peltoa. Kronikat ovat ainoa lähde, '
        + 'ja historioitsijat kiistelevät menetyksen laajuudesta.',
    },
  },
  IRL: {
    pieniAarre: {
      name: 'Korillinen turvetta',
      fakta: 'Turvetta on nostettu soista polttoaineeksi vuosisatoja, ja palat '
        + 'kuivataan pystyyn ladottuina tuulessa. Suo säilöö, mitä sinne joutuu: '
        + 'irlantilaisista soista on löytynyt puuastioissa niin sanottua suovoita, '
        + 'jonka vanhimmat löydöt ovat tuhansia vuosia vanhoja ja yhä '
        + 'tunnistettavaa rasvaa. Samasta syystä soista on noussut esiin myös '
        + 'rautakautisia ihmisruumiita.',
    },
    isoAarre: {
      name: 'Irlannin kruununjalokivet',
      fakta: 'Pyhän Patrickin ritarikunnan tähti ja solki varastettiin Dublinin '
        + 'linnasta heinäkuussa 1907 juuri ennen kuninkaan vierailua. '
        + 'Kassakaappia ei murrettu vaan avattiin avaimella, eikä syyllistä '
        + 'koskaan saatu selville; vaakunaviraston päällikkö menetti virkansa. '
        + 'Jalokiviä ei ole nähty sen jälkeen, ja tapaus on Irlannin tunnetuin '
        + 'ratkaisematon varkaus.',
    },
  },
  FRA: {
    pieniAarre: {
      name: 'Kori tuoreita croissanteja',
      fakta: 'Croissant ei ole alkuperältään ranskalainen vaan itävaltalaisen '
        + 'kipferlin jälkeläinen: wieniläinen leipuri avasi Pariisiin leipomonsa '
        + '1839, ja siitä lähtien lehtitaikinaleivonnaisia sanotaan Ranskassa '
        + 'nimellä viennoiserie. Muoto kertoo raaka-aineen: pelkällä voilla tehty '
        + 'croissant leivotaan tavallisesti suoraksi, margariinilla tehty kaarelle.',
    },
    isoAarre: {
      name: 'Kruununjalokivien safiiri',
      fakta: 'Ranskan kruununjalokivet varastettiin Garde-Meublen varastosta '
        + 'syyskuussa 1792 useana yönä peräkkäin, ennen kuin kukaan huomasi mitään. '
        + 'Osa kivistä saatiin takaisin, mutta moni katosi jäljettömiin: kuninkaan '
        + 'suuri sininen timantti ilmestyi kaksikymmentä vuotta myöhemmin Lontooseen '
        + 'uudelleen hiottuna ja tunnetaan nykyään Hope-timanttina. Monen muun '
        + 'kiven kohtaloa ei tiedetä yhä tänäkään päivänä.',
    },
  },
  ESP: {
    pieniAarre: {
      name: 'Verkkokassi appelsiineja',
      fakta: 'Espanja on maailman suurimpia tuoreen appelsiinin viejiä, ja suuri osa '
        + 'hedelmistä kasvaa Valencian kastelluilla huerta-mailla. Kastelusta on '
        + 'kiistelty niin kauan, että Valenciassa kokoontuu yhä joka torstai '
        + 'keskipäivällä vesituomioistuin, joka ratkoo riidat suullisesti '
        + 'katedraalin ovella. Se on Euroopan vanhimpia yhä toimivia '
        + 'tuomioistuimia.',
    },
    isoAarre: {
      name: 'Vigon lahden hopealasti',
      fakta: 'Espanjan hopealaivasto tuhoutui Vigon lahdella lokakuussa 1702, kun '
        + 'englantilais-hollantilainen laivasto murtautui sataman puomin läpi. '
        + 'Suuri osa hopeasta oli kuitenkin purettu maihin jo ennen taistelua, mikä '
        + 'ei ole estänyt nostoyrityksiä kolmen vuosisadan ajan. Jules Verne pani '
        + 'kapteeni Nemon rahoittamaan Nautiluksensa juuri Vigon lahden aarteella.',
    },
  },
  PRT: {
    pieniAarre: {
      name: 'Rasia pastel de nata -leivoksia',
      fakta: 'Portugalin munakeltuaisleivonnaisten synty selitetään luostareilla: '
        + 'valkuaista kului muun muassa vaatteiden tärkkäykseen ja viinin '
        + 'kirkastamiseen, ja keltuaiset piti käyttää johonkin. Belémin luostarin '
        + 'resepti siirtyi 1830-luvulla viereiseen kauppaan, kun luostarit '
        + 'lakkautettiin, ja samassa paikassa leivotaan yhä. Nimeä pastel de Belém '
        + 'saa käyttää vain siellä tehdyistä leivoksista.',
    },
    isoAarre: {
      name: 'Kuninkaan kirjaston nide',
      fakta: 'Lissabonin maanjäristys 1. marraskuuta 1755 kaatoi kaupungin, ja mitä '
        + 'järistys ja hyökyaalto jättivät, sen vei tulipalo. Kuninkaallinen '
        + 'kirjasto — arviolta 70 000 nidettä — paloi, ja mukana meni arkistoja, '
        + 'karttoja ja maalauksia. Säilyneet niteet ovat niitä, jotka sattuivat '
        + 'olemaan muualla.',
    },
  },
  ITA: {
    pieniAarre: {
      name: 'Parmesaanitahko',
      fakta: 'Yhteen parmigiano reggiano -tahkoon menee noin 550 litraa maitoa, ja '
        + 'se kypsyy vähintään vuoden ennen kuin kuoreen lyödään leima. Kypsyys '
        + 'tarkistetaan koputtelemalla kuorta pienellä vasaralla. '
        + 'Emilia-Romagnassa toimii pankki, joka ottaa tahkoja lainan vakuudeksi '
        + 'ja säilyttää holveissaan satojatuhansia kiekkoja.',
    },
    isoAarre: {
      name: 'Caravaggion kadonnut maalaus',
      fakta: 'Caravaggion Kristuksen syntymä varastettiin Palermon Pyhän '
        + 'Laurentiuksen rukoushuoneesta lokakuun yönä 1969 leikkaamalla kangas '
        + 'irti kehyksestään. Mafiakäännynnäiset ovat kertoneet teoksen '
        + 'kohtalosta useita eri versioita, eikä yhdenkään mukaan maalausta ole '
        + 'nähty ehjänä vuosikymmeniin. Rukoushuoneessa on nykyään tarkka '
        + 'jäljennös alkuperäisen paikalla.',
    },
  },
  GRC: {
    pieniAarre: {
      name: 'Ruukku Hymettoksen hunajaa',
      fakta: 'Hymettoksen vuoren timjamihunaja oli kuuluisaa jo antiikin aikana, ja '
        + 'sitä kehuttiin sekä kreikkalaisissa että roomalaisissa teksteissä. '
        + 'Timjami kukkii kuivalla rinteellä keskikesällä, ja siitä tulee hunajan '
        + 'tumma väri ja yrttinen maku. Attikasta on kaivettu esiin antiikin '
        + 'aikaisia savisia mehiläispesiä, eli tapa on vanha.',
    },
    isoAarre: {
      name: 'Antikytheran koneen osa',
      fakta: 'Sukeltajat löysivät 1901 Antikytheran saaren edustalta hylyn, josta '
        + 'nousi vihreä pronssimöhkäle: se osoittautui yli kahdentuhannen vuoden '
        + 'ikäiseksi hammasrataskoneeksi, joka ennusti auringon- ja '
        + 'kuunpimennyksiä. Koneesta on jäljellä 82 sirpaletta ja kolmisenkymmentä '
        + 'ratasta, mutta osa pyöristä puuttuu yhä ja niiden hampaat on jouduttu '
        + 'päättelemään laskemalla. Hylkyyn on palattu sukelluksin yhä uudelleen.',
    },
  },
  BGR: {
    pieniAarre: {
      name: 'Pullo Ruusulaakson ruusuöljyä',
      fakta: 'Kilo ruusuöljyä vaatii tonnittain terälehtiä, ja siksi se on painonsa '
        + 'arvoisena maailman kalleimpia raaka-aineita. Terälehdet poimitaan '
        + 'Kazanlakin Ruusulaaksossa käsin aamuyöllä ennen auringonnousua, koska '
        + 'päivän lämmössä tuoksuöljy haihtuu. Sato kestää vain muutaman viikon '
        + 'touko-kesäkuussa.',
    },
    isoAarre: {
      name: 'Traakialaiskuninkaan kulta',
      fakta: 'Vuonna 1949 kolme veljestä kaivoi savea tiilitehtaalle Panagjuriŝten '
        + 'lähellä ja löysi yhdeksän puhtaasta kullasta tehtyä juoma-astiaa, '
        + 'yhteensä yli kuusi kiloa, 300-luvulta eaa. Traakialaiset hautasivat '
        + 'kultansa maahan, ja Bulgarian pelloista on noussut kymmeniä muitakin '
        + 'kätköjä. Omaa kirjallisuutta traakialaisilta ei jäänyt, joten esineet '
        + 'ovat lähes ainoa lähde heidän maailmaansa.',
    },
  },
  ROU: {
    pieniAarre: {
      name: 'Purkki Karpaattien hunajaa',
      fakta: 'Romania on Euroopan suurimpia hunajantuottajia, ja tunnetuin laatu on '
        + 'vaalea akaasiahunaja. Pesiä kuljetetaan kesällä kuorma-autolla kukinnan '
        + 'perässä laaksosta toiseen. Karpaateilla tarhaajan naapurina on Euroopan '
        + 'suurin ruskeakarhukanta Venäjän ulkopuolella, joten pesät joudutaan '
        + 'usein suojaamaan sähköaidalla.',
    },
    isoAarre: {
      name: 'Daakialainen kultarannekas',
      fakta: 'Sarmizegetusa Regian raunioista ryöstettiin 1990-luvulla kilon '
        + 'painoisia daakialaisia kultarannekkeita, jotka päätyivät salakauppaan '
        + 'ulkomaille. Romania on saanut toistakymmentä niistä takaisin '
        + 'kansainvälisissä takavarikoissa, ja osa on yhä kateissa. Antiikin '
        + 'kirjoittajien mukaan kuningas Decebalus kätki aarteensa jokeen, jonka '
        + 'uoma käännettiin työn ajaksi.',
    },
  },
  HUN: {
    pieniAarre: {
      name: 'Pussi paprikajauhetta',
      fakta: 'Paprika tuli Unkariin osmanien mukana 1500-luvulla, ja Szeged ja '
        + 'Kalocsa ovat yhä sen kaksi kotikaupunkia. Szegediläinen Albert '
        + 'Szent-Györgyi eristi C-vitamiinin juuri paprikasta ja sai työstään '
        + 'Nobelin palkinnon 1937. Mieto jauhe on jalostustyön tulos: vanha '
        + 'unkarilainen paprika oli tulista.',
    },
    isoAarre: {
      name: 'Attilan hauta-aarre',
      fakta: 'Gootti Jordanes kertoo 500-luvulla kirjoittamassaan historiassa, että '
        + 'Attila haudattiin kolmeen sisäkkäiseen arkkuun — kultaan, hopeaan ja '
        + 'rautaan — ja että haudan tekijät surmattiin, jottei paikka paljastuisi. '
        + 'Myöhemmät tarinat lisäävät kertomukseen joen, jonka uoma käännettiin '
        + 'haudan päälle. Hautaa ei ole löydetty, eikä kukaan tiedä edes '
        + 'suunnilleen, missä se olisi.',
    },
  },
  HRV: {
    pieniAarre: {
      name: 'Pussi Pagin saaren suolaa',
      fakta: 'Pagin saarella on tehty merisuolaa haihduttamalla antiikin ajoista '
        + 'asti, ja suola-altaat ovat Adrianmeren vanhimpia. Bura-tuuli kantaa '
        + 'suolaa myös laitumille, joten saaren lampaat syövät suolan maustamia '
        + 'yrttejä — siitä tulee paški sir -juuston maku. Karu puuton maisema on '
        + 'saman tuulen ja saman suolan työtä.',
    },
    isoAarre: {
      name: 'Ragusan laivaston kulta',
      fakta: 'Ragusa eli Dubrovnik oli itsenäinen merenkulkutasavalta, jonka '
        + 'kauppalaivasto oli 1500-luvulla Välimeren suurimpia; englannin suurta '
        + 'kauppalaivaa tarkoittava sana argosy tulee kaupungin nimestä. '
        + 'Maanjäristys 1667 tuhosi kaupungin ja tappoi tuhansia, ja Napoleon '
        + 'lakkautti tasavallan 1808. Kaupungin arkisto säilyi silti lähes ehjänä '
        + 'ja on yhä Välimeren parhaita keskiaikaisia kauppa-arkistoja.',
    },
  },
  BIH: {
    pieniAarre: {
      name: 'Säkki bosnialaista kahvia',
      fakta: 'Bosnialainen kahvi jauhetaan lähes jauhoksi ja keitetään kuparisessa '
        + 'džezvassa: vesi kiehautetaan ensin, jauhe lisätään sitten ja astia '
        + 'nostetaan vielä kerran tulelle. Kahvi tuli Sarajevoon osmanien mukana '
        + '1500-luvulla, kauan ennen kuin siitä tiedettiin Wienissä tai '
        + 'Pariisissa. Se tarjoillaan pienessä kupissa rahat lokumin kanssa, eikä '
        + 'sitä ole tarkoitus juoda kiireessä.',
    },
    isoAarre: {
      name: 'Bosnian kuninkaan kruunu',
      fakta: 'Bosnian viimeinen kuningas Stjepan Tomašević kruunattiin 1461 '
        + 'kruunulla, jonka paavi lähetti Roomasta. Kaksi vuotta myöhemmin '
        + 'osmanit valtasivat maan ja kuningas mestattiin. Kruunua ei ole nähty '
        + 'sen jälkeen, eikä tiedetä, vietiinkö se sotasaaliina vai '
        + 'kätkettiinkö se.',
    },
  },
  UKR: {
    pieniAarre: {
      name: 'Purkki hunajaa',
      fakta: 'Ukraina on Euroopan suurimpia hunajan tuottajia ja maailman '
        + 'suurimpia viejiä. Nykyaikaisen kehyspesän kehitti ukrainalainen Petro '
        + 'Prokopovytš vuonna 1814, ja hän perusti myös ensimmäisen '
        + 'mehiläishoidon koulun. Auringonkukkapelloilta saatu vaalea hunaja on '
        + 'maan tunnetuin laatu.',
    },
    isoAarre: {
      name: 'Hetmani Polubotokin kultakätkö',
      fakta: 'Legendan mukaan hetmani Pavlo Polubotok lähetti ennen vangitsemistaan '
        + 'tynnyrillisen kultaa Englannin pankkiin ja määräsi, että talletus '
        + 'korkoineen kuuluu itsenäiselle Ukrainalle. Polubotok oli todellinen '
        + 'henkilö ja kuoli Pietari Suuren vankilassa 1724, mutta talletuksesta ei '
        + 'ole löytynyt jälkeäkään pankin arkistoista. Tarina heräsi henkiin '
        + '1990-luvulla, ja siihen uskottiin niin lujasti, että asiaa '
        + 'selvitettiin virallisesti.',
    },
  },
  RUS: {
    pieniAarre: {
      name: 'Tuohikori puolukoita',
      fakta: 'Puolukka säilyy vedessä pilaantumatta läpi talven, koska marjassa on '
        + 'luonnostaan bentsoehappoa. Sama happo hillitsee käymistä, joten hilloa '
        + 'saattoi ennen tehdä keittämättä. Metsästä marjat kannettiin '
        + 'tuohikopassa, jonka kaksinkertainen tuohiseinä piti sisällön viileänä.',
    },
    isoAarre: {
      name: 'Tsaarin kadonnut pääsiäismuna',
      fakta: 'Fabergén verstas teki keisariperheelle viisikymmentä pääsiäismunaa '
        + 'vuosina 1885–1916, ja jokaisessa oli sisällä yllätys. Vallankumouksen '
        + 'jälkeen munia myytiin ulkomaille, ja osa katosi matkalla; muutama on '
        + 'yhä kateissa. Yksi kadonneista löytyi 2010-luvulla Yhdysvalloista '
        + 'romukauppiaalta, joka oli ostanut sen kullan painon takia ja aikonut '
        + 'sulattaa sen.',
    },
  },
  TUR: {
    pieniAarre: {
      name: 'Rasia lokumia',
      fakta: 'Lokum on tärkkelyksestä ja sokerista keitettyä hyytelöä, jota '
        + 'maustetaan ruusuvedellä tai mastiksilla ja tomutetaan tomusokerilla. '
        + 'Istanbulissa toimii yhä 1700-luvun lopulla perustettu makeiskauppa, '
        + 'jonka suvussa lokumia on tehty sukupolvesta toiseen. Englanninkielinen '
        + 'nimi Turkish delight syntyi 1800-luvulla brittimatkailijoiden '
        + 'tuliaisista.',
    },
    isoAarre: {
      name: 'Priamoksen aarteen korut',
      fakta: 'Heinrich Schliemann kaivoi aarteen esiin Hisarlıkin kummulta 1873 ja '
        + 'vei sen salaa pois maasta; osmanit haastoivat hänet oikeuteen. Kokoelma '
        + 'katosi Berliinistä sodan lopussa 1945 ja ilmestyi vasta 1993 Moskovaan, '
        + 'eivätkä kaikki esineet ole tulleet esiin. Aarre on lisäksi noin tuhat '
        + 'vuotta vanhempi kuin Homeroksen Troija, joten se ei voi olla '
        + 'Priamoksen.',
    },
  },
};

/**
 * Maan oma paikallisaarre tai null, jos maalle ei ole vielä kirjoitettu
 * paria — silloin näytetään laudan oma nimi ja kuva. Palauttaa null myös
 * muille kuin paikallisaarteille (pääaarre ja mantereen aarre ovat
 * laudan omia).
 */
export function paikallisaarre(type, maaIso) {
  if (type !== 'pieniAarre' && type !== 'isoAarre') return null;
  return PAIKALLISAARTEET[maaIso]?.[type] ?? null;
}
