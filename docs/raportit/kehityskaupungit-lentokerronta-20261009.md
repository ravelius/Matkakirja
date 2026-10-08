# Kehityskaupunkien lentokerronta: Tukholman lähikohteet ja historiaosiot (Pelikoodari 9.10.2026, juna 170)

Omistajan palaute PT:n kautta: kohteita lähempää, historiaa tai muuta lentojen aikana, vähemmän pelkkiä siirtymiä ja
taukoja. **PT kuittasi tekstit kahdella korjauksella, ja ne on generoitu (9.10. klo 01.xx).** Tulos on lopussa.

## Yhteenveto

- **Uudet Tukholman kohteet:** 5 kpl, 4866 merkkiä (teksti ja lyhyt).
- **Historiaosiot:** Tukholma 8 ja Pariisi 8, yhteensä 7281 merkkiä. Jokainen on 26–39 s (arvio 13.8 merkkiä/s, mitattu Tukholman avauksesta).
- **Yhteensä noin 12 150 merkkiä, eli noin 810 krediittiä** (eleven_v4_turbo, mitattu 0,0667/merkki). Tukholmaan on käytetty
  855 krediittiä, joten kehityskaupunkien raja ~15 000 riittää reilusti.
- **Generointi tehdään vasta PT:n kuittauksen jälkeen** samoilla asetuksilla kuin nykyiset kertojat:
  - William, eleven_v4_turbo, style 0
  - yksi otto per kerronta, koko teksti yhtenä pyyntönä
  - 120 ms alkuvara, tasoitus −17,2 dB
  - tools/opas/tee-esittelyaanet-v2.mjs
- **Faktat** on tarkistettu Wikipediasta (en, sv, fr) kahdella Sonnet-agentilla, ja yksi luku vielä erikseen.
  - Väitteet, joille ei löytynyt lähdettä, poistettiin: siltojen määrä, maannousun millimäärä, puhelimia eniten asukasta kohden ja bouquinistien jonovuodet.
  - Kaksoskoe kerrotaan tarinana, koska sen aitoutta on epäilty.

## Tukholman kierros (ehdotus LS1:lle)

Pois lähtevät kaukaiset kohteet: Drottningholm (~11 km) ja Skogskyrkogården (~5 km).
Kierrokselle nousevat jo äänitetyt lähikohteet: Suurkirkko, Stortorget ja Skeppsholmen, sekä tarvittaessa Sergelin tori.
Uusina tulevat alla olevat viisi kohdetta. Ehdotettu järjestys:

Kuninkaanlinna → Suurkirkko → Stortorget → Gamla stan → Katarinan kirkko → Riddarholmenin kirkko → Ritarihuone → Kaupungintalo →
Valtiopäivätalo → Kuninkaanpuisto → Kansallismuseo → Skeppsholmen → Vasa-museo → Skansen

| kohde | Q | lat | lon | koko m | teksti s | lyhyt s |
|---|---|---|---|---|---|---|
| Ritarihuone (Riddarhuset) | Q1547268 | 59.32593 | 18.06573 | 60 | 53 | 23 |
| Valtiopäivätalo (Riksdagshuset) | Q1101073 | 59.3275 | 18.0675 | 140 | 50 | 24 |
| Kuninkaanpuisto (Kungsträdgården) | Q926316 | 59.33194 | 18.07111 | 330 | 50 | 21 |
| Kansallismuseo (Nationalmuseum) | Q842858 | 59.32861 | 18.07806 | 110 | 45 | 21 |
| Katarinan kirkko (Katarina kyrka) | Q1736102 | 59.31708 | 18.07806 | 45 | 45 | 20 |

Koordinaatit ovat Wikidatan P625-arvoja. Koot on arvioitu, koska lähteissä ei ole mittoja.

## Uudet kohdetekstit

### Ritarihuone (Riddarhuset) (Q1547268)

Ritarihuone Riddarhuset seisoo vanhankaupungin länsilaidalla Riddarholmenin sillan kupeessa, ja ylhäältä sen tunnistaa kaksiosaisesta, alaosastaan kaartuvasta katosta, jonka kulmissa kohoaa neljä savupiippuina toimivaa obeliskia. Valtakunnankansleri Axel Oxenstierna osti tontin vuonna 1641 aatelissäädyn komeaa taloa varten, ja palatsi valmistui vuonna 1674 usean arkkitehdin käsissä. Ensimmäinen heistä, Simon de la Vallée, sai surmansa jo seuraavana vuonna ruotsalaisen aatelismiehen kädestä. Jean de la Vallée'n suunnittelemasta katosta tuli malli kokonaiselle ruotsalaisten kartanoiden kattotyypille. Nykyään Ritarihuone on aatelissukujen yksityinen yhteisö, joka pitää kirjaa suvuista ja vuokraa salejaan konsertteihin ja juhliin.

*Lyhyt:* Ritarihuoneen salin seinillä riippuu kaksituhatta kolmesataakolmekymmentäneljä aatelissukujen vaakunakilpeä, mutta vain kuusisataaviisikymmentäkuusi suvuista lasketaan yhä eläviksi. Kadun puolella seisoo Kustaa Vaasan pronssipatsas, ja kuninkaallinen hovikapelli soitti talossa julkisia konsertteja jo vuodesta 1731.

*Syventävä:* Miksi aatelisto tarvitsi oman palatsin? · *Kysymykset:* Mikä oli aatelissäädyn tehtävä valtiopäivillä? / Kuka oli Axel Oxenstierna? / Mikä on säterikatto? / Mitä vaakunakilvet kertovat suvuista? / Mitä aatelisto tekee Ruotsissa nykyään?

*Lähteet:* https://en.wikipedia.org/wiki/House_of_Nobility_(Sweden) · https://sv.wikipedia.org/wiki/Riddarhuspalatset · https://en.wikipedia.org/wiki/House_of_Nobility_(Sweden)

### Valtiopäivätalo (Riksdagshuset) (Q1101073)

Valtiopäivätalo Riksdagshuset täyttää lähes puolet Helgeandsholmenin saaresta kuninkaanlinnan ja Norrmalmin välissä, ja ylhäältä sen pohjakaava näyttää vinolta nelikulmiolta, koska rakennus myötäilee saaren muotoa. Kuningas Oskar toinen muurasi peruskiven vuonna 1897, ja Aron Johanssonin piirtämä talo vihittiin tammikuussa 1905. Sen alla on yli yhdeksäntuhatta tammipaalua. Talon puoliympyrän muotoisessa osassa toimi alun perin Ruotsin valtionpankki. Kun valtiopäivistä tuli yksikamariset vuonna 1971 ja pankki muutti pois, entiseen pankkirakennukseen tehtiin uusi täysistuntosali, joka vihittiin vuonna 1983. Siellä kokoontuvat yhä Ruotsin kolmesataaneljäkymmentäyhdeksän kansanedustajaa.

*Lyhyt:* Valtiopäivätalon julkisivua koristavat punaisesta Kilaforsin graniitista veistetyt Äiti Svea -ryhmä ja neljän säädyn patsaat. Katto ei näy kadulle, vaan seinät päättyvät kaiteeseen samoin kuin kuninkaanlinnassa. Rakentaminen maksoi lopulta noin kaksitoista miljoonaa kruunua, lähes kaksi kertaa niin paljon kuin alkuperäinen arvio.

*Syventävä:* Miten Ruotsin valtiopäivät toimivat? · *Kysymykset:* Mitä olivat Ruotsin neljä säätyä? / Miksi valtiopäivät muuttuivat yksikamarisiksi? / Mikä on Helgeandsholmen? / Miksi talo seisoo tammipaalujen varassa? / Mitä Ruotsin valtionpankki tekee?

*Lähteet:* https://en.wikipedia.org/wiki/Riksdag_building · https://sv.wikipedia.org/wiki/Riksdagshuset,_Stockholm

### Kuninkaanpuisto (Kungsträdgården) (Q926316)

Kuninkaanpuisto Kungsträdgården on pitkä ja kapea aukio Norrmalmin rannassa, ja ylhäältä siinä erottuu kaksi suihkulähdettä, kaksi kuninkaan patsasta ja reunoja kehystävät puurivit. Paikka mainitaan ensimmäisen kerran vuonna 1430 kuninkaan kaalimaana, ja myöhemmin siitä tuli suljettu barokkipuutarha, jonne tavalliset kaupunkilaiset pääsivät vasta 1700-luvulla. Toukokuussa 1971 puistossa käytiin jalavakiista: noin tuhat ihmistä kokoontui yöllä estämään vanhojen jalavien kaatamisen metroaseman sisäänkäynnin tieltä. Sahaus keskeytyi muutamassa minuutissa, jalavat saivat jäädä, ja kiistaa pidetään käänteenä, jonka jälkeen keskustan vanhoja rakennuksia ei enää purettu entiseen tapaan.

*Lyhyt:* Kuninkaanpuiston kirsikkapuut istutettiin 1990-luvun lopulla, ja niiden vaaleanpunainen kukinta on yksi Tukholman kevään merkeistä. Talvisin puistoon jäädytetään luistinrata, joka avattiin ensimmäisen kerran vuonna 1962, ja kesällä samalla paikalla järjestetään konsertteja ja kaupunkijuhlia.

*Syventävä:* Mitä jalavakiista muutti Tukholmassa? · *Kysymykset:* Mikä oli Tukholman keskustan saneeraus? / Kenen patsaat puistossa seisovat? / Mikä oli Makalösin palatsi? / Miksi kirsikkapuut ovat puistossa? / Miten kuninkaallisista puutarhoista tuli julkisia puistoja?

*Lähteet:* https://en.wikipedia.org/wiki/Kungstr%C3%A4dg%C3%A5rden · https://sv.wikipedia.org/wiki/Kungstr%C3%A4dg%C3%A5rden · https://sv.wikipedia.org/wiki/Almstriden

### Kansallismuseo (Nationalmuseum) (Q842858)

Kansallismuseo Nationalmuseum seisoo Blasieholmenin niemen kärjessä vastapäätä kuninkaanlinnaa, ja ylhäältä sen pitkä rakennusrunko erottuu rantakadun varrelta. Museon kokoelmat saivat alkunsa vuonna 1792 kuninkaallisena museona, ja nykyinen talo rakennettiin vuodesta 1844 vuoteen 1866 saksalaisen arkkitehdin Friedrich August Stülerin piirustusten mukaan pohjoisitalialaisen renessanssin hengessä. Se on Ruotsin suurin taidemuseo, ja kokoelmissa on noin seitsemänsataatuhatta esinettä, joista valtaosa on piirustuksia. Museo oli suljettuna viisi vuotta laajan peruskorjauksen ajan ja avautui uudelleen lokakuussa 2018.

*Lyhyt:* Kansallismuseon peruskorjauksessa sisäpiha katettiin veistossaliksi, ja seinät maalattiin taas alkuperäisen kaltaisiin voimakkaisiin väreihin. Kokoelmiin kuuluu myös yli viisituhatta muotokuvaminiatyyriä, pieniä käsin maalattuja kasvokuvia, joita kannettiin aikoinaan mukana kuin valokuvia.

*Syventävä:* Mitä Kansallismuseon kokoelmissa on? · *Kysymykset:* Kuka oli Friedrich August Stüler? / Mikä on muotokuvaminiatyyri? / Mitä peruskorjauksessa muutettiin? / Miten kuninkaan kokoelmista tuli kansallismuseo? / Mitä pohjoisitalialainen renessanssi tarkoittaa rakennuksessa?

*Lähteet:* https://en.wikipedia.org/wiki/Nationalmuseum · https://sv.wikipedia.org/wiki/Nationalmuseum,_Stockholm

### Katarinan kirkko (Katarina kyrka) (Q1736102)

Katarinan kirkko kohoaa Södermalmin rinteellä, ja ylhäältä sen pohjakaava näyttää tasavartiselta ristiltä, jonka keskeltä nousee kahdeksankulmainen kupolitorni. Kirkko rakennettiin vuodesta 1656 vuoteen 1695 Jean de la Vallée'n suunnitelmien mukaan, ja se oli Ruotsin ensimmäinen keskeiskirkko. Se on palanut kahdesti: ensin vuonna 1723 ja uudelleen toukokuussa 1990, jolloin torni romahti holvin läpi ja jäljelle jäivät lähes pelkät ulkoseinät. Palatsiarkkitehti Ove Hidemark johti jälleenrakennusta 1600-luvun menetelmin käsin taottuja nauloja ja vanhanmallista lasia myöten, ja kirkko vihittiin uudelleen vuonna 1995.

*Lyhyt:* Katarinan kirkon kellot valettiin palon jälkeen Ystadissa vanhojen kopioiksi, mutta suuren kellon kieli on sama kuin vuoden 1724 kellossa. Kirkko on nimetty prinsessa Katariinan mukaan, ja kirkkomaalle on haudattu muun muassa ulkoministeri Anna Lindh ja laulaja Cornelis Vreeswijk.

*Syventävä:* Miten palanut kirkko rakennettiin uudelleen? · *Kysymykset:* Mikä on keskeiskirkko? / Miksi kirkko paloi vuonna 1990? / Kuka oli Jean de la Vallée? / Kuka oli prinsessa Katariina? / Mitä 1600-luvun rakennusmenetelmät tarkoittivat jälleenrakennuksessa?

*Lähteet:* https://en.wikipedia.org/wiki/Katarina_Church · https://sv.wikipedia.org/wiki/Katarina_kyrka

## Historiaosiot: Tukholma (lentojen ajaksi, ei toistoa kohdeteksteistä)

### Saarten kaupunki (`tukholma-historia-vesi`, 510 mrk, ~37 s)

Tukholma on rakennettu neljälletoista saarelle kohtaan, jossa Mälarenin järvi laskee Itämereen. Viikinkiajalla Mälaren oli vielä meren lahti, mutta jääkauden jälkeen kohoava maa sulki sen vähitellen järveksi, ja maa nousee yhä muutamia millimetrejä vuodessa. Järven pinta on nykyään alle metrin merta korkeammalla, ja korkeuseroa säädellään Slussenissa, jossa ensimmäinen sulku rakennettiin jo vuonna 1642. Rantoja on täytetty 1200-luvulta lähtien, ja keskiaikainen kaupunki oli paljon nykyistä pienempi saari.

*Lähteet:* https://en.wikipedia.org/wiki/Geography_of_Stockholm · https://en.wikipedia.org/wiki/Lake_M%C3%A4laren · https://sv.wikipedia.org/wiki/M%C3%A4laren · https://en.wikipedia.org/wiki/Slussen · https://en.wikipedia.org/wiki/Gamla_stan

### Saksalaiset kauppiaat (`tukholma-historia-hansa`, 496 mrk, ~36 s)

Keskiajalla Tukholma eli Itämeren kaupasta, ja sen tärkeimmät kauppakumppanit tulivat saksalaisista hansakaupungeista, etenkin Lyypekistä. Saksalaisia kauppiaita asui kaupungissa niin paljon, että myöhäiskeskiajalla puolet kaupunginraadista piti olla saksalaisia ja puolet ruotsalaisia. Saksalaiset jäivät kaupunkiin omaksi seurakunnakseen, ja heidän kirkkonsa korkea torni näkyy yhä vanhankaupungin kattojen yllä. Saksalaisessa kirkossa pidetään edelleen joka sunnuntai jumalanpalvelus saksaksi.

*Lähteet:* https://sv.wikipedia.org/wiki/Stockholms_historia · https://en.wikipedia.org/wiki/German_Church,_Stockholm

### Suurvallan pääkaupunki (`tukholma-historia-suurvalta`, 461 mrk, ~34 s)

1600-luvulla Ruotsista tuli suurvalta, ja Tukholma vahvistettiin sen pääkaupungiksi vuonna 1634. Kaupungin väkiluku kasvoi vuosisadan aikana noin kymmenestätuhannesta noin kuuteenkymmeneentuhanteen. Uudet kaupunginosat, Norrmalm pohjoisessa ja Södermalm etelässä, kaavoitettiin 1630- ja 1640-luvuilla suorakulmaisiksi kortteleiksi, ja ruutukaava näkyy ylhäältä yhä katujen suorina linjoina. Samaan aikaan aateliset rakennuttivat palatsejaan kaupungin rannoille.

*Lähteet:* https://en.wikipedia.org/wiki/Stockholm · https://en.wikipedia.org/wiki/History_of_Stockholm · https://sv.wikipedia.org/wiki/Stockholms_historia

### Rutto vuonna 1710 (`tukholma-historia-rutto`, 398 mrk, ~29 s)

Kesäkuussa 1710 Tukholmaan saapui rutto, todennäköisimmin laivalla Pärnusta. Suuri Pohjan sota oli kesken, ja tauti levisi ahtaassa kaupungissa nopeasti. Ruttoon kuoli noin kaksikymmentäkaksituhatta ihmistä, enemmän kuin kolmasosa kaupungin noin viidestäkymmenestäviidestätuhannesta asukkaasta. Kaupunki toipui vasta vuosikymmenten kuluessa, ja samoina vuosina Ruotsin suurvalta-aika alkoi päättyä.

*Lähteet:* https://en.wikipedia.org/wiki/The_plague_during_the_Great_Northern_War

### Kielletty kahvi (`tukholma-historia-kahvi`, 527 mrk, ~38 s)

Ruotsissa juodaan kahvia maailman kärkimäärin, mutta 1700- ja 1800-luvuilla juoma kiellettiin maassa viisi kertaa. Kuningas Kustaa kolmannen kerrotaan teettäneen kokeen, jossa kaksi kuolemaan tuomittua kaksosta armahdettiin: toinen joi joka päivä kahvia ja toinen teetä. Tarinan mukaan valvovat lääkärit kuolivat ensin, sitten kuningas, ja teetä juonut kaksonen kuoli ennen kahvin juojaa kahdeksankymmenenkolmen vuoden iässä. Tarinan aitoutta on epäilty, mutta nykyään ruotsalaiseen työpäivään kuuluu fika, yhteinen kahvitauko.

*Lähteet:* https://en.wikipedia.org/wiki/Coffee_in_Sweden · https://en.wikipedia.org/wiki/Gustav_III_of_Sweden%27s_coffee_experiment

### Lankojen torni (`tukholma-historia-puhelin`, 419 mrk, ~30 s)

1880-luvulla puhelin yleistyi Tukholmassa nopeasti, ja linjat kulkivat vielä ilmajohtoina kattojen yllä. Vuonna 1887 Norrmalmille valmistui teräksinen puhelintorni, josta lähti avajaisissa neljätuhatta lankaa joka suuntaan kuin hämähäkinseitti. Kaupungissa oli silloin noin viisituhatta viisisataa puhelinta. Kun kaapelit siirrettiin maan alle, torni jäi koristeeksi, ja tulipalon heikentämänä se purettiin vuonna 1953.

*Lähteet:* https://en.wikipedia.org/wiki/Telefontornet · https://sv.wikipedia.org/wiki/Telefontornet

### Maanalainen taidegalleria (`tukholma-historia-metro`, 399 mrk, ~29 s)

Tukholman metroa kutsutaan maailman pisimmäksi taidegalleriaksi. Ensimmäinen osuus avattiin lokakuussa 1950, ja nyt yhdeksälläkymmenelläneljällä asemalla sadasta on taidetta, yli sadanviidenkymmenen taiteilijan tekemänä. Monella asemalla katto on jätetty paljaaksi louhituksi kallioksi ja maalattu: Stadionin asemalla kallion yli kaartuu sateenkaari. Näyttelyn voi siis kiertää yhdellä matkalipulla.

*Lähteet:* https://en.wikipedia.org/wiki/Stockholm_Metro

### Saaristo kaupungin edustalla (`tukholma-historia-saaristo`, 365 mrk, ~26 s)

Tukholman edustalla alkaa saaristo, jossa on yli kaksikymmentäneljätuhatta saarta, luotoa ja karia. Valkoiset saaristolaivat lähtevät Strömkajenin laiturilta vastapäätä kuninkaanlinnaa, ja kesällä moni tukholmalainen asuu mökillään jollakin saarella. Keskustan virrasta Strömmenistä, aivan kuninkaanlinnan edustalta, saadaan joka vuosi satoja lohia ja meritaimenia.

*Lähteet:* https://sv.wikipedia.org/wiki/Stockholms_sk%C3%A4rg%C3%A5rd · https://sv.wikipedia.org/wiki/Str%C3%B6mkajen · https://sv.wikipedia.org/wiki/Norrstr%C3%B6m

## Historiaosiot: Pariisi (lentojen ajaksi, ei toistoa kohdeteksteistä)

### Lutetia (`pariisi-historia-lutetia`, 430 mrk, ~31 s)

Ennen kuin Pariisi oli Pariisi, Seinen rannoilla asui kelttiläinen parisiiheimo. Roomalaiset kukistivat sen vuonna 52 ennen ajanlaskun alkua, ja heidän Lutetia-kaupunkinsa kasvoi pääosin joen vasemmalle rannalle. Ensimmäisen vuosisadan lopulla rakennetun areenan kivipenkit ovat yhä näkyvissä Latinalaiskorttelissa, ja Cluny-museon pihalla seisovat roomalaisten kylpylöiden rauniot. Kaupungin nimi Pariisi juontuu parisiiheimosta.

*Lähteet:* https://en.wikipedia.org/wiki/Lutetia · https://en.wikipedia.org/wiki/Paris

### Laiva vaakunassa (`pariisi-historia-vaakuna`, 432 mrk, ~31 s)

Pariisin vaakunassa purjehtii laiva, ja sen alla lukee latinaksi Fluctuat nec mergitur: aallot heittelevät, mutta se ei uppoa. Laiva on peräisin jokikauppiaiden mahtavalta killalta, joka sai Seinen kaupan oikeudet vuonna 1170. Vaakunana laiva mainitaan ensimmäisen kerran vuonna 1358, ja tunnuslause vahvistettiin virallisesti vuonna 1853. Vaikeina aikoina pariisilaiset ovat kirjoittaneet sen kylteihin ja seiniin.

*Lähteet:* https://en.wikipedia.org/wiki/Coat_of_arms_of_Paris · https://en.wikipedia.org/wiki/Fluctuat_nec_mergitur

### Ensimmäinen lento (`pariisi-historia-montgolfier`, 453 mrk, ~33 s)

Ihmisen ensimmäinen vapaa lento kuumailmapallolla tehtiin Pariisissa. Marraskuussa 1783 Jean-François Pilâtre de Rozier ja markiisi d'Arlandes nousivat Montgolfierin veljesten pallolla La Muetten linnan puutarhasta Boulognen metsän laidalta. He kohosivat noin yhdeksänsadan metrin korkeuteen, ja tulen kipinät kärvensivät kangasta matkan aikana. Noin kahdenkymmenenviiden minuutin lento päättyi yhdeksän kilometrin päähän Butte-aux-Cailles'n kukkulalle.

*Lähteet:* https://en.wikipedia.org/wiki/Montgolfier_brothers

### Ilmapallot piirityksen yli (`pariisi-historia-piiritys`, 535 mrk, ~39 s)

Syksyllä 1870 Preussin armeija piiritti Pariisin, eikä kaupungista päässyt ulos maitse. Pariisilaiset ratkaisivat ongelman ilmapalloilla: rautatieasemille perustetuissa työpajoissa ommeltiin kuusikymmentäseitsemän palloa, jotka kuljettivat piiritysrenkaan yli satakuusikymmentäneljä matkustajaa, yli kaksi miljoonaa kirjettä ja kolmesataakahdeksankymmentäyksi kirjekyyhkyä. Yhdellä palloista pakeni ministeri Léon Gambetta järjestämään vastarintaa. Kyyhkyt lensivät takaisin kaupunkiin, ja niiden viestit oli pienennetty mikrofilmille.

*Lähteet:* https://fr.wikipedia.org/wiki/Ballon_mont%C3%A9 · https://en.wikipedia.org/wiki/Siege_of_Paris_(1870%E2%80%931871)

### Haussmannin Pariisi (`pariisi-historia-haussmann`, 537 mrk, ~39 s)

Nykyisen Pariisin ilme syntyi 1850- ja 1860-luvuilla, kun keisari Napoleon kolmas antoi prefekti Georges-Eugène Haussmannille tehtäväksi uudistaa ahtaan keskiaikaisen kaupungin. Lähes kaksikymmentätuhatta rakennusta purettiin, ja tilalle rakennettiin yli kolmekymmentätuhatta uutta leveiden bulevardien varsille. Vuoden 1859 määräys sitoi talojen enimmäiskorkeuden kadun leveyteen, ja julkisivujen piti olla samaa korkeutta, väriä ja kiveä. Siksi ylhäältä katsoen vaaleat julkisivut ja harmaat mansardikatot muodostavat yhtenäisen meren.

*Lähteet:* https://en.wikipedia.org/wiki/Haussmann%27s_renovation_of_Paris · https://fr.wikipedia.org/wiki/Transformations_de_Paris_sous_le_Second_Empire

### Metro vuodelta 1900 (`pariisi-historia-metro`, 405 mrk, ~29 s)

Pariisin metron ensimmäinen linja avattiin heinäkuussa 1900 kesken maailmannäyttelyn Porte Maillot'n ja Porte de Vincennesin välille. Arkkitehti Hector Guimard suunnitteli asemien sisäänkäynnit valuraudasta kuin kasvien varsista, ja niistä kahdeksankymmentäkuusi on yhä paikoillaan. Nykyään asemia on yli kolmesataa, ja kaupungin sisällä lähin asema on melkein mistä tahansa alle puolen kilometrin päässä.

*Lähteet:* https://en.wikipedia.org/wiki/Paris_M%C3%A9tro · https://fr.wikipedia.org/wiki/Liste_des_stations_du_m%C3%A9tro_de_Paris

### Kirjakaupat joen varrella (`pariisi-historia-bouquinistit`, 461 mrk, ~34 s)

Seinen rantamuureilla on lähes tuhat tummanvihreää puulaatikkoa, jotka aukeavat päivisin pieniksi kirjakaupoiksi. Antikvaariset kirjakauppiaat, bouquinistit, ovat myyneet joen varrella vanhoja kirjoja ja julisteita jo 1500-luvulta lähtien, ja nykyään heitä on noin kaksisataakolmekymmentä yli kolmen kilometrin matkalla. Laatikoiden mitat on määrätty tarkasti, kaksi metriä pitkiksi ja kolme neljäsosaa metriä leveiksi, ja niiden väri on nimeltään vaununvihreä.

*Lähteet:* https://fr.wikipedia.org/wiki/Bouquinistes_de_Paris · https://en.wikipedia.org/wiki/Bouquiniste

### Wallacen kaivot (`pariisi-historia-wallace`, 453 mrk, ~33 s)

Pariisin kaduilla seisoo noin sata tummanvihreää valurautaista juomavesikaivoa, joiden kupolia kannattelee neljä naishahmoa. Ne kuvaavat ystävällisyyttä, yksinkertaisuutta, hyväntekeväisyyttä ja kohtuullisuutta. Kaivot lahjoitti englantilainen Richard Wallace vuodesta 1872 lähtien, kun piiritys ja Pariisin kommuuni olivat tuhonneet vesijohtoja ja vesi oli kallistunut. Niistä saa yhä ilmaista juomavettä maaliskuun puolivälistä marraskuun puoliväliin.

*Lähteet:* https://fr.wikipedia.org/wiki/Fontaine_Wallace · https://en.wikipedia.org/wiki/Wallace_fountains

## Toimitus generoinnin jälkeen

- Kohteet: R2 opas/<sha>.mp3|pcm|ajat.json kuten nyt. Uusi esittely opas/esittely-v3/tukholma.json, jossa kohteet ja kierros.
- Historiaosiot: uusi tiedosto opas/historia-v1/<kaupunki>.json (tunnus, otsikko, teksti, ääni, ajat, kesto_s) ja äänet R2:een.
- Kytkentä on LS1:n tehtävä: osio soi lennon aikana, jos lento on pidempi kuin osio, eikä sama osio toistu kierroksella.

## Tulos (9.10.)

- **PT:n korjaukset:**
  - Pariisin vaakunan viimeinen lause on nyt "Vaikeina aikoina…".
  - Vreeswijkin hauta Katarinan kirkkomaalla varmistui (sv.wikipedia), joten nimi pysyy ja lähde lisättiin.
  - Lisäksi vuosivälit ja päivämäärä kirjoitettiin puheeseen sopiviksi.
- **Generointi:** 26 ääntä, 13 447 puhuttua merkkiä (vuosiluvut sanoina). **Toteutui 764 krediittiä** (saldo 102 850 → 103 614).
  - Kohdetekstit 55–60 s ja lyhyet 22–25 s.
  - Historiaosiot 28–46 s, yhteensä Tukholma 290 s ja Pariisi 295 s.
- **R2:** opas/<sha>.mp3|pcm|ajat.json, eli sana-ajat on tehty kaikille 26 äänelle.
- **Vientipaketti** `_valmiit/kehityskaupungit-170-vienti-20261009`:
  - opas/esittely-v3/tukholma.json, jossa kierros 14 kohdetta lyhimpänä reittinä (6,3 km):
    Kuninkaanlinna → Suurkirkko → Stortorget → Gamla stan → Ritarihuone → Riddarholmenin kirkko → Kaupungintalo → Valtiopäivätalo →
    Kuninkaanpuisto → Kansallismuseo → Skeppsholmen → Vasa-museo → Skansen → Katarinan kirkko
  - opas/historia-v1/{tukholma,pariisi}.json
- **Worker-indeksi:** PR ravelius/Matkakirja#4244. Siinä esittely_polut.tukholma vaihtuu v3:een ja lisätään uusi historia_polut. PR mergetään viennin jälkeen.
