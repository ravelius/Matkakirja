# Noston vuosirivit: Lontoo (SK 17.11.2026)

Tehtävä: sama menetelmä kuin Pariisi (`noston-vuodet-pariisi-20261117.md`, PR 7044 data). **Vain luonnos: ei dataa, ei ääntä.** Seuraavaksi KK lukee → data-PR (kenttä `vuodet`).

Koneluettava lähde: `docs/raportit/noston-vuodet-lontoo-20261117.json` (jokainen rivi: kohta, vuosi, selite). Kohta on sanatarkka pätkä luettavasta tekstistä (main c3bd9fa839), esiintyy tekstissä tasan kerran ja sisältää vuoden. Ruudulla rivi on "– selite vuosi".

## Säännöt
Samat kuin Pariisissa: selite 1–3 sanaa, ≤ 20 merkkiä, sama asia kuin virke, ei uutta tietoa; ≤ 5 riviä per nosto (vuosi, joka kantaa tarinaa); ei vuosisatoja eikä vuosikymmeniä; järjestys = tekstin järjestys; ei vuosia kuvateksteistä. Skriptivalidointi (`vuosiVirheet`): **51 nostoa, 145 riviä, 0 virhettä** (Lontoon silmässä ei vuosia: ei kenttää).

## Tarkistukset (17.11.2026)
- **Riippumaton tarkistaja** (Sonnet, sai vain tekstit ja rivit): 150 riviä, 16 korjattavaa → selitteet korjattu (esim. "viimeinen julkinen", "Queen's Hallin tuho", "merimiehet vuoteen", "myynti uudelleen", "uusi kello halkesi", "vanha London Bridge", "metro avattiin"). Newgaten 1780 vaihdettu 1807:ään ja Westminster Abbeyn 1996 1065:een (tarinaa kantavampia).
- **Vuosien lähdetarkistus** (kaksi Sonnet-hakijaa + yksi lisätarkistus; Wikipedia = yksi lähde): lähes kaikki OK 2 lähdettä. **Poistettu rivit, joita lähteet eivät tue:** Greenwich 1498–1504 (alkuvuosi vain Wikipediassa; ORNC "noin 1500", Historic England 1500–05), Greenwich 1660 (vain Wikipedia; Webb tilattiin 1661), British Museum 1997 (lukusali suljettiin 1997, muutto valmis 1998), Victoria Memorial 1924 (lähteet 1911 / 1906–1924, ristiriita), Albert Memorial 1998 (yksi heikko lähde), Vanha London Bridge 1758–1761 (alku 1757/58, loppu 1761/62). Greenwichiin lisätty 1516 (2 lähdettä).
- **Vain yksi lähde, rivi jätetty (KK päättää):** Euston Arch 1870 (nimi kultakirjaimin; Wikipedia ja sen kopio), Vanha Westminsterin palatsi 1045–1050 (Wikipedia).
- **Lähteissä ajoitus vaihtelee, rivi jätetty:** Euston Arch "portti suunniteltiin 1837" (suunnittelu/rakennus 1837, valmistuminen usein 1838); Newgate 1807 "väkijoukon ryntäys" (vuosi ja ~40 000 OK 2+ lähdettä; kuolleita 27–34 lähteestä riippuen: virheen "kymmeniä" sijaan "yli kolmekymmentä" olisi varmempi).
- **Tarinan oma vuosi, ei historiaväite:** "isoisän matka/käynti/vuosi 1873" (Crystal Palace, Newgate, Euston, Old St Paul's, Savusumu, Händel, Johnson, Punch, Baird, Sähkötin).
- **"Noin" katoaa ruudulla:** rivit "noin 1078" (Tower), "noin 1045–1050" (Westminster-vanha) ja Cheapsiden 1600 ("noin vuoden 1600") näyttävät vuoden sellaisenaan. Jos halutaan "noin", se on KK:n/PK:n päätös (kenttä `vuosi` sallii tekstin).

### Lähteissä eroaa tekstistä (vaikuttaa tekstiin, ei riveihin; KK:lle)
- Westminster Abbey: "munkit asuivat vielä lähes kolmesataa vuotta" epätarkka (munkit luostarissa vuoteen 1540 noin 580 v; 295 vain 1245:stä); "Henrik III purki Edvardin kirkon" yksinkertaistus (osa jäi pystyyn); "Chaucer ensimmäisenä runoilijoiden nurkkaan" ei vahvistu (Abbey: perinne alkoi Spenserin hautauksesta, Chaucer haudattiin työnsä vuoksi); kruunajaistuoli "noin 1300" (Edvard I tilasi 1296).
- Newgate: kuolleiden määrä 27–34 (teksti "kymmeniä").
- Natural History Museum: Owenin "luonnon katedraali" -lainaus ei vahvistunut.
- Metron höyryveturi: laatta on seinässä Marylebone Roadilla, ei "kadun pinnassa"; "pronssi" vahvistamatta.
- Exchange Alley: yhtiön yksinoikeus oli orjakauppa (asiento), teksti "kauppaan Espanjan Etelä-Amerikan kanssa" pelkistetty.
- Cheapsiden kätkö: "sveitsiläinen" kellokoneisto vain Wikipediassa (London Museum: smaragdikuorinen kello 1600–1610).
- Liukumäkiveistos: "maailman pisin tunneliliukumäki" on operaattorin väite (Dezeen: "Europe's tallest and longest").
- Johnsonin Gough Square -talo vuokrattu n. 1748–49 (teksti ei väitä vuotta).
- Nollalöydös: yksi hakutulossivu (cavac.at) sisälsi tekoälylle osoitetun upotetun komennon; tarkistaja ei noudattanut, eikä se vaikuttanut tuloksiin.

## KK:n päätökset 17.34 (PR 7048 luettu; toteutettu tässä)
1. Yhden lähteen rivit (Euston 1870, Vanha Westminster 1045–1050) ja isoisän 1873-rivit jäävät; toinen lähde tekstikierroksen listaan.
2. "Noin" näkyy ruudulla: vuosi-kenttä "n. 1078", "n. 1045–1050", "n. 1600".
3. Selitteet: Cheapside "smaragdikello", Metro "muistolaatta".
4. Selitteet, jotka kortilla voi lukea väärin: Victoria Memorial "palatsin julkisivu", Albert Memorial "paloi Sydenhamissa", Vanha Westminster "uusi palatsi alkoi", Tower Bridge "London Bridge myyty", Greenwich "Henrik VIII:n häät", Lontoon palo "suurpalo alkoi", Old St Paul's "suurpalo".
5. Hendrix: KK pyysi ruudulle "1968–1969"; testin sääntö (kaikkien vuosilukujen oltava kohdassa) ei salli, koska tekstissä on "1968–69". Rivi on "1968–69" (SK, KK:lle tiedoksi).
6. Tekstihuomiot kaikki tekstikorjauslistaan (`tekstikorjauslista-vuosirivit-20261117.md`), lisäksi Newgate "kymmeniä" → "noin kolmekymmentä" ja palon syy yhdellä sanalla (lovipuut / kuittikepit / veropuikot).

## Rivit nostoittain

### Greenwichin palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Henrik VIII syntyi 1491 | (1491 | Täällä syntyivät Henrik VIII (1491), Maria I (1516) ja Elisabet I (1533), ja Henrik VIII meni täällä naimisiin Anna Clevesiläisen kanssa 1540. |
| – Maria I syntyi 1516 | (1516 | Täällä syntyivät Henrik VIII (1491), Maria I (1516) ja Elisabet I (1533), ja Henrik VIII meni täällä naimisiin Anna Clevesiläisen kanssa 1540. |
| – Elisabet I syntyi 1533 | (1533 | Täällä syntyivät Henrik VIII (1491), Maria I (1516) ja Elisabet I (1533), ja Henrik VIII meni täällä naimisiin Anna Clevesiläisen kanssa 1540. |
| – Henrik VIII:n häät 1540 | kanssa 1540 | Täällä syntyivät Henrik VIII (1491), Maria I (1516) ja Elisabet I (1533), ja Henrik VIII meni täällä naimisiin Anna Clevesiläisen kanssa 1540. |

### Newgaten vankila

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – perustettiin 1188 | perustettiin 1188 | Newgaten vankila oli Lontoon vankila, joka perustettiin 1188 Henrik II:n aikana ja toimi vuoteen 1902. |
| – väkijoukon ryntäys 1807 | vuonna 1807 | Hirttolava siirrettiin Tyburnista Newgateen 1783, ja vuonna 1807 noin 40 000 hengen yleisö kerääntyi seuraamaan hirtystä; väkijoukon ryntäys tappoi kymmeniä. |
| – viimeinen julkinen 1868 | toukokuuta 1868 | Viimeinen julkinen hirtys Britanniassa tehtiin täällä 26. toukokuuta 1868, minkä jälkeen teloitukset siirtyivät muurien sisälle. |
| – isoisän käynti 1873 | käydessä 1873 | Vankila oli käytössä isoisän käydessä 1873, ja Dickens sijoitti sen useisiin romaaneihinsa. |
| – purettiin 1902–1904 | purettiin 1902–1904 | Se purettiin 1902–1904, ja Old Bailey -oikeustalo on rakennettu suureen osaan sen paikkaa. |

### Euston Arch

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – portti suunniteltiin 1837 | rautatieyhtiölle 1837 | Euston Arch oli Lontoon Euston-aseman 21 metriä korkea doorilainen portti, jonka Philip Hardwick suunnitteli Lontoon ja Birminghamin rautatieyhtiölle 1837. |
| – nimi lisättiin 1870 | siihen 1870 | Yhtiö lisäsi siihen 1870 kultakirjaimin nimen Euston, joten isoisä näki sen 1873. |
| – isoisä näki 1873 | sen 1873 | Yhtiö lisäsi siihen 1870 kultakirjaimin nimen Euston, joten isoisä näki sen 1873. |
| – purku alkoi 1961 | Vuonna 1961 | Vuonna 1961 liikenneministeri Ernest Marples arvioi purkamisen maksavan 12 000 ja siirtämisen 190 000 puntaa, ja pääministeri Harold Macmillan hylkäsi pelastajien esityksen. |
| – kiviä löytyi 1994 | niistä 1994 | Kivet päätyivät Lea-joen pohjaan, ja Dan Cruickshank löysi vähintään 60 prosenttia niistä 1994. |

### Vanha Westminsterin palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Edvard rakennutti n. 1045–1050 | noin 1045–1050 | Edvard Tunnustaja rakennutti sen noin 1045–1050, ja vanhin säilynyt osa, Westminster Hall, on Vilhelm II:n ajalta. |
| – palatsi paloi 1834 | päivänä 1834 | Lokakuun 16. päivänä 1834 ylikuumentunut uuni, jolla poltettiin valtiokonttorin lovipuiden eli kuittikeppien kasaa, sytytti Ylähuoneen salin. |
| – uusi palatsi alkoi 1840 | alkoivat 1840 | Tilalle nousi Charles Barryn suunnittelema uusi palatsi, jonka rakennustyöt alkoivat 1840 ja kestivät noin 30 vuotta; sen kellotornia kutsutaan Big Beniksi. |

### Old St Paul's

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakentaminen alkoi 1087 | vuonna 1087 | Sen rakentaminen alkoi vuonna 1087 edellisen kirkon palon jälkeen, ja se valmistui vuonna 1314. |
| – torni paloi 1561 | vuonna 1561 | Katedraalin torni paloi vuonna 1561. |
| – suurpalo 1666 | vuonna 1666 | Lontoon suuri palo tuhosi koko rakennuksen vuonna 1666. |
| – nykyinen valmistui 1710 | vuonna 1710 | Sen tilalle rakennettiin Christopher Wrenin suunnittelema nykyinen St Paulin katedraali, joka valmistui vuonna 1710. |
| – isoisän vuosi 1873 | vuonna 1873 | Isoisäsi vuonna 1873 vanhaa katedraalia ei ollut ollut enää yli kahteensataan vuoteen. |

### Crystal Palace 1851

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – näyttely avattiin 1851 | toukokuuta 1851 | Se pystytettiin vuoden 1851 suurta maailmannäyttelyä varten, ja kuningatar Victoria avasi näyttelyn 1. toukokuuta 1851. |
| – paloi 1936 | vuonna 1936 | Siellä se paloi vuonna 1936. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 paikka Hyde Parkissa oli ollut tyhjänä yli kaksikymmentä vuotta, ja halli seisoi jo Sydenhamissa. |

### Whitehallin palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Henrik otti haltuun 1530 | haltuunsa 1530 | Henrik VIII otti paikan haltuunsa 1530, kun kardinaali Wolsey oli menettänyt asemansa. |
| – juhlasali valmis 1622 | valmistui 1622 | Juhlasali Banqueting House valmistui 1622 Inigo Jonesin suunnittelemana, ja sen edessä mestattiin Kaarle I vuonna 1649. |
| – Kaarle I mestattiin 1649 | vuonna 1649 | Juhlasali Banqueting House valmistui 1622 Inigo Jonesin suunnittelemana, ja sen edessä mestattiin Kaarle I vuonna 1649. |
| – palatsi paloi 1698 | päivänä 1698 | Tammikuun 4. päivänä 1698 palvelija ripusti märkää pyykkiä hiilipannun viereen, ja syttynyt tuli tuhosi lähes kaikki asuin- ja hallintorakennukset. |

### Westminster Abbey

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – kirkko vihittiin 1065 | joulukuussa 1065 | Kirkon paikalla oli ensin benediktiiniluostari, ja kuningas Edvard Tunnustaja rakennutti sille suuren kivikirkon, joka vihittiin joulukuussa 1065. |
| – Vilhelm kruunattiin 1066 | jouluna 1066 | Seuraavana jouluna 1066 Vilhelm Valloittaja kruunattiin samassa kirkossa, ja siitä lähtien lähes kaikki Englannin hallitsijat on kruunattu täällä. |
| – uusi kirkko alkoi 1245 | nousta 1245 | Nykyinen goottilainen kirkko alkoi nousta 1245, kun Henrik III purki Edvardin kirkon. |
| – luostarien lakkautus 1540 | luostarit 1540 | Munkit asuivat luostarissa vielä lähes kolmesataa vuotta, kunnes Henrik VIII lakkautti luostarit 1540. |
| – Chaucer haudattiin 1400 | vuonna 1400 | Runoilijoiden nurkkaan haudattiin ensimmäisenä Geoffrey Chaucer vuonna 1400. |

### Westminsterin palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Hall valmistui 1099 | valmistui 1099 | Kuninkaat asuivat Westminsterissä jo ennen normannien valloitusta, ja palatsin vanhin osa, Westminster Hall, valmistui 1099. |
| – palatsi paloi 1834 | Lokakuussa 1834 | Lokakuussa 1834 palatsin uuneissa poltettiin vanhoja puisia veropuikkoja, joihin oli vuosisatojen ajan veistetty lovia kirjanpidoksi. |

### Westminster Bridge

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – silta avattiin 1750 | silti 1750 | Ensimmäinen Westminster Bridge avattiin silti 1750. |
| – Wordsworthin sonetti 1802 | sillalla 1802 | William Wordsworth kirjoitti sillalla 1802 sonetin aamun hiljaisesta Lontoosta. |
| – nykyinen avattiin 1862 | avattiin 1862 | Nykyinen valurautainen silta avattiin 1862, ja se on maalattu vihreäksi kuten alahuoneen penkit, sillä se on palatsin alahuoneen päässä. |

### Cutty Sark

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – laiva rakennettiin 1869 | rakennettiin 1869 | Cutty Sark rakennettiin 1869 Dumbartonissa Skotlannissa nopeaksi teeklipperiksi. |
| – myytiin Portugaliin 1895 | Portugaliin 1895 | Laiva myytiin Portugaliin 1895, ja se purjehti vuosikymmeniä toisella nimellä. |
| – ostettiin takaisin 1922 | takaisin 1922 | Brittiläinen kapteeni osti sen takaisin 1922, ja Greenwichin kuivatelakalle se nostettiin 1954. |
| – kuivatelakalle 1954 | nostettiin 1954 | Brittiläinen kapteeni osti sen takaisin 1922, ja Greenwichin kuivatelakalle se nostettiin 1954. |
| – tulipalo 2007 | Vuonna 2007 | Vuonna 2007 korjaustöiden aikana laivassa syttyi tulipalo, mutta monet alkuperäiset osat oli jo irrotettu turvaan. |

### Lontoon Tower

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – tornin rakennus n. 1078 | noin 1078 | Vilhelm Valloittaja alkoi rakentaa Valkoista tornia noin 1078 pitämään juuri valloitettua Lontoota kurissa. |
| – Boleyn mestattiin 1536 | Boleyn 1536 | Tower Greenillä mestattiin kolme kuningatarta, ensimmäisenä Anne Boleyn 1536. |

### British Museum

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – museo perustettiin 1753 | ja 1753 | Hän testamenttasi ne kansakunnalle, ja 1753 perustettiin British Museum, maailman ensimmäinen kaikille avoin kansallismuseo. |
| – museo avattiin 1759 | avattiin 1759 | Se avattiin 1759 vanhassa Montagu Housen kartanossa. |
| – pylväsjulkisivu 1823–1852 | pylväsjulkisivun 1823–1852 | Kokoelmat kasvoivat niin, että vanha kartano purettiin, ja Robert Smirke rakensi tilalle nykyisen kreikkalaistyylisen pylväsjulkisivun 1823–1852. |
| – pyöreä lukusali 1857 | rakennettiin 1857 | Sisäpihalle rakennettiin 1857 pyöreä lukusali kupolin alle. |

### Natural History Museum

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – museo avattiin 1881 | avattiin 1881 | Luonnontieteilijä Richard Owen halusi niille oman "luonnon katedraalin", ja Alfred Waterhousen suunnittelema museo avattiin 1881. |
| – Dippy päähalliin 1979 | siirrettiin 1979 | Museossa oli yli sata vuotta diplodokuksen luurangon kipsivalos, jota kävijät kutsuivat Dippyksi; päähalliin se siirrettiin 1979. |
| – sinivalas tilalle 2017 | vaihdettiin 2017 | Se vaihdettiin 2017 sinivalaan luurankoon, joka roikkuu nyt päähallin katosta. |

### Victoria Memorial

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Viktoria kuoli 1901 | tammikuussa 1901 | Kuningatar Viktoria kuoli tammikuussa 1901 hallittuaan 63 vuotta. |
| – paljastus 1911 | paljastettiin 1911 | Muistomerkki paljastettiin 1911. |
| – palatsin julkisivu 1913 | uudelleen 1913 | Se muurattiin uudelleen 1913 vaaleasta Portlandin kivestä, jotta palatsi sopisi muistomerkin taustaksi. |

### Royal Albert Hall

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – maailmannäyttely 1851 | Vuoden 1851 | Vuoden 1851 maailmannäyttely Hyde Parkissa tuotti voittoa, ja sillä ostettiin prinssi Albertin aloitteesta maata Kensingtonista museoille ja oppilaitoksille. |
| – Albert kuoli 1861 | kuoli 1861 | Albert kuoli 1861, ja konserttisali nimettiin hänen mukaansa. |
| – sali avattiin 1871 | salin 1871 | Kuningatar Viktoria avasi salin 1871, mutta oli niin liikuttunut, ettei pystynyt puhumaan, joten puheen piti Walesin prinssi. |
| – kaikua vaimennettiin 1969 | vaimennettiin 1969 | Kaikua vaimennettiin 1969 katosta riippuvilla sienen muotoisilla levyillä. |
| – Queen's Hallin tuho 1941 | toukokuussa 1941 | Promenadikonsertit soitettiin ennen Queen's Hallissa, kunnes pommi tuhosi salin toukokuussa 1941. |

### Albert Memorial

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Albert kuoli 1861 | kuoli 1861 | Prinssi Albert kuoli 1861 vain 42-vuotiaana. |
| – Kristallipalatsi 1851 | Parkissa 1851 | Näyttelyn Kristallipalatsi seisoi lähellä Hyde Parkissa 1851. |
| – paloi Sydenhamissa 1936 | paloi 1936 | Se purettiin ja koottiin uudelleen Sydenhamiin Etelä-Lontooseen, missä se paloi 1936. |

### Kensingtonin palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Vilhelm osti talon 1689 | osti 1689 | Hän osti 1689 Kensingtonin kylästä maalaistalon, ja Christopher Wren laajensi sen palatsiksi. |
| – Whitehall paloi 1698 | paloi 1698 | Whitehallin valtava palatsi paloi 1698, eikä sitä rakennettu uudelleen. |
| – Viktoria syntyi 1819 | palatsissa 1819 | Prinsessa Viktoria syntyi Kensingtonin palatsissa 1819 ja kasvoi siellä tiukan valvonnan alla. |
| – tuli kuningattareksi 1837 | aamuna 1837 | Kesäkuun 20. päivän aamuna 1837 hänet herätettiin kertomalla, että hänestä oli tullut kuningatar. |
| – Diana asui vuoteen 1997 | vuoteen 1997 | Prinsessa Diana asui palatsissa vuoteen 1997, ja osa siitä on yhä kuninkaallisen perheen asuntona. |

### Royal Observatory

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Kaarle II perusti 1675 | perusti 1675 | Kaarle II perusti 1675 Greenwichin observatorion ratkaisemaan ongelman tähtien avulla, ja Christopher Wren suunnitteli sen. |
| – aikapallo alkoi 1833 | Vuodesta 1833 | Vuodesta 1833 observatorion katolla on pudotettu punainen aikapallo joka päivä kello 13, jotta Thamesin laivat voivat asettaa kellonsa. |
| – nollameridiaani 1884 | Vuonna 1884 | Vuonna 1884 Greenwichin nollameridiaani hyväksyttiin koko maailman pituusasteiden lähtöviivaksi. |

### Old Royal Naval College

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Nelson nähtävillä 1806 | tammikuussa 1806 | Amiraali Nelsonin ruumis oli Maalatussa salissa julkisesti nähtävillä tammikuussa 1806. |
| – merimiehet vuoteen 1869 | vuoteen 1869 | Vanhat merimiehet asuivat sairaalassa vuoteen 1869. |
| – upseerikoulu vuoteen 1998 | vuoteen 1998 | Sen jälkeen rakennuksissa toimi laivaston upseerikoulu vuoteen 1998. |

### Queen's House

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Jones suunnitteli 1616 | Housen 1616 | Inigo Jones suunnitteli Queen's Housen 1616 kuningas Jaakko I:n puolisolle Anna Tanskalaiselle. |
| – Anna kuoli 1619 | kuoli 1619 | Anna kuoli 1619, ja talo jäi kesken. |
| – talo valmistui 1635 | valmistui 1635 | Talo valmistui 1635 Kaarle I:n puolisolle Henrietta Marialle. |

### Buckinghamin palatsi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – talo rakennettiin 1703 | rakensi 1703 | Palatsi ei ollut alun perin palatsi vaan tavallinen kaupunkitalo, jonka herttua rakensi 1703. |
| – Yrjö III osti 1761 | sen 1761 | Kuningas Yrjö III osti sen 1761 vaimolleen, ja ensimmäinen hallitsija, joka todella muutti sisään, oli kuningatar Viktoria vasta 1837. |
| – Viktoria muutti 1837 | vasta 1837 | Kuningas Yrjö III osti sen 1761 vaimolleen, ja ensimmäinen hallitsija, joka todella muutti sisään, oli kuningatar Viktoria vasta 1837. |
| – Jones murtautui 1838–1841 | kertaa 1838–1841 | Sisään pääsi silti kuka tahansa sitkeä: nelitoistavuotias Edward Jones murtautui palatsiin kolme kertaa 1838–1841, kerran häntä etsittiin sohvan alta. |

### Trafalgar Square

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – aukio avattiin 1844 | yleisölle 1844 | Kun ne siirrettiin pois, tontti vapautui ja aukio avattiin yleisölle 1844. |
| – Nelsonin taistelu 1805 | meritaistelun 1805 | Keskellä seisova pylväs muistaa Horatio Nelsonia, joka voitti meritaistelun 1805 ja kuoli siinä. |
| – leijonat tulivat 1867 | vasta 1867 | Pronssileijonat tulivat vasta 1867. |
| – ruokinta kiellettiin 2003 | kiellettiin 2003 | Ruokinta kiellettiin 2003, ja tilalle tuotiin haukka partioimaan. |

### Big Ben

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – uusi kello halkesi 1859 | syyskuussa 1859 | Ensimmäinen kello halkesi jo koekäytössä, ja uusikin halkesi syyskuussa 1859, koska lyömävasara painoi liikaa. |

### Lontoon silmä

Ei rivejä (tekstissä ei vuosia).

### Pyhän Paavalin katedraali

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – suurpalo 1666 | suurpalossa 1666 | Nykyinen kirkko on jo viides samalla kukkulalla — edellinen tuhoutui suurpalossa 1666. |
| – kuuluisa valokuva 1940 | joulukuun 1940 | Pommitusten aikana kirkosta tuli koko maan symboli: joulukuun 1940 yönä otettu valokuva savun keskellä seisovasta kupolista kiersi maailman. |

### Tower Bridge

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – London Bridge myyty 1968 | myytiin 1968 | Kun vanha London Bridge myytiin 1968 amerikkalaiselle liikemiehelle ja koottiin uudelleen Arizonaan, syntyi tarina, että ostaja luuli saavansa juuri tämän sillan. |

### Etelämeren kupla

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – oppi sanan kupla 1720 | vuonna 1720 | Lontoo oppi vuonna 1720 sanan ’kupla’ kalleimmalla mahdollisella tavalla. |

### Cheapsiden kätkö

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – laatikko esiin 1912 | Vuonna 1912 | Vuonna 1912 työmiehet hakkasivat hakulla kellarin lattiaa osoitteessa 30–32 Cheapside, Friday Streetin kulmassa, ja lattian alta tuli puinen laatikko. |
| – smaragdikello n. 1600 | vuoden 1600 | Oudoin esine on kellonkuori, joka oli koverrettu yhdestä suuresta kolumbialaisesta smaragdista ja jonka sisään oli sovitettu noin vuoden 1600 sveitsiläinen kellokoneisto. |
| – arvonimi saatiin 1640 | marraskuussa 1640 | Yksi pieni sinettikivi kertoo, milloin laatikko pantiin maahan: siinä on Staffordin viscountin vaakuna, ja arvonimen hän sai vasta marraskuussa 1640. |
| – talo paloi 1666 | syyskuussa 1666 | Kellarin päällä ollut talo paloi Lontoon suurpalossa syyskuussa 1666. |

### Millennium Bridgen portaat

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – myynti keskeytettiin 2022 | vuonna 2022 | Ranta ei silti ole vapaata riistaa: lupa on ostettava satamaviranomaiselta, ja kun lupia oli kertynyt noin 5 000, myynti keskeytettiin vuonna 2022. |
| – myynti uudelleen 2024 | uudelleen 2024 | Se avattiin uudelleen 2024, mutta lupia jaetaan enintään 4 000. |

### Vanha London Bridge

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – rakentaminen alkoi 1176 | rakennettiin 1176 | Thamesin ylitse rakennettiin 1176 alkaen kivisilta, joka valmistui 1209. |
| – silta valmistui 1209 | valmistui 1209 | Thamesin ylitse rakennettiin 1176 alkaen kivisilta, joka valmistui 1209. |
| – Nonsuch House 1577–1579 | Vuosina 1577–1579 | Vuosina 1577–1579 nostosillan torni korvattiin Nonsuch Housella, kaksoistalolla, joka oli aikanaan Lontoon toinen klassisin julkisivu. |
| – silta purettiin 1831 | silta 1831 | Talot purettiin 1758–1761 ja koko silta 1831. |

### Faraday 1831

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Faradayn koe 1831 | elokuuta 1831 | Royal Institutionin kellarilaboratoriossa on 29. elokuuta 1831, ja 39-vuotias entinen kirjansitojan oppipoika on juuri nähnyt, että muutos — ei magneetti sinänsä — synnyttää sähköä. |

### Fleming 1928

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – homepilkku maljassa 1928 | syyskuuta 1928 | St Mary'sin sairaalan bakteriologian laboratoriossa Paddingtonissa on 3. syyskuuta 1928, ja Fleming on juuri palannut perheensä kanssa vietetyltä lomalta. |
| – nimi penisilliini 1929 | maaliskuuta 1929 | Homeen hän tunnistaa Penicillium-sukuun, ja seuraavat kuukaudet hän kutsuu sen erittämää ainetta homemehuksi, kunnes antaa sille 7. maaliskuuta 1929 nimen penisilliini. |
| – lääketieteen Nobel 1945 | Nobelin 1945 | Vasta Howard Floreyn ja Ernst Chainin ryhmä Oxfordissa tekee siitä lääkkeen 1940-luvun alussa, ja kolmikko jakaa lääketieteen Nobelin 1945. |

### Brunel 1827

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – tunnelikilpi työssä 1827 | toukokuussa 1827 | Rotherhithen kuilussa toukokuussa 1827 työskentelee Marc Brunelin keksimä tunnelikilpi: kaksitoista valurautaista kehystä kolmessa kerroksessa, 36 lokeroa, joissa kukin mies kaivaa oman tukilautansa takaa. |
| – tulva tappoi kuusi 1828 | Tammikuussa 1828 | Tammikuussa 1828 tulva tappaa kuusi miestä. |
| – tunneli avattiin 1843 | maaliskuuta 1843 | Tunneli avataan vasta 25. maaliskuuta 1843, ensimmäisenä purjehduskelpoisen joen alittajana. |

### Lontoon palo 1666

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – suurpalo alkoi 1666 | syyskuuta 1666 | Thamesilla on sunnuntai 2. syyskuuta 1666. |

### Shakespeare 1599

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Globe rakennettu 1599 | syyskuu 1599 | Southwarkissa Thamesin etelärannalla on syyskuu 1599. |
| – Globe paloi 1613 | kesäkuuta 1613 | Teatteri palaa 29. kesäkuuta 1613, kun tykki sytyttää olkikaton kesken Henrik kahdeksannen -näytelmän; ainoa vahinko on mies, jonka palavat housut sammutetaan oluella. |

### Metron höyryveturi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – metro avattiin 1863 | tammikuuta 1863 | Lontoon metro avattiin 10. tammikuuta 1863 maailman ensimmäisenä maanalaisena matkustajaratana. |
| – muistolaatta 1963 | vuonna 1963 | Kadun pinnassa muistuttaa yhä pronssilaatta, jonka London Transport pystytti sadan vuoden kunniaksi vuonna 1963. |

### Exchange Alley

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – yhtiö perustettiin 1711 | perustettiin 1711 | Etelämeren yhtiö perustettiin 1711, ja se sai yksinoikeuden kauppaan Espanjan Etelä-Amerikan kanssa vastineeksi siitä, että se otti kantaakseen osan valtionvelasta. |
| – velkasopimus 1720 | vuonna 1720 | Kauppaa ei juuri syntynyt, mutta vuonna 1720 yhtiö sopi ottavansa haltuunsa lähes koko velan ja vaihtavansa sen omiin osakkeisiinsa. |
| – tutkinta paljasti 1721 | paljasti 1721 | Parlamentin tutkinta paljasti 1721 ministerien lahjonnan, ja valtiovarainministeri John Aislabie erotettiin alahuoneesta ja suljettiin Toweriin. |

### Canaletto Lontoossa

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – muutti Lontooseen 1746 | vuonna 1746 | Sama venetsialainen Canaletto, jonka vedutoja selailit Venetsian lehdessä, muutti Lontooseen vuonna 1746 ja maalasi kaupunkia yhdeksän vuoden ajan. |

### Dickensin pubi

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Southwarkin palo 1676 | vuoden 1676 | Nykyinen rakennus on rakennettu Southwarkin vuoden 1676 palon jälkeen, ja sen penkeillä istui aikanaan Charles Dickens, joka mainitsee pubin romaanissaan Pikku Dorrit. |

### Abbey Roadin suojatie

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – suojatien ylitys 1969 | päivänä 1969 | Elokuun 8. päivänä 1969 neljä miestä käveli suojatien yli kuusi kertaa, kunnes valokuvaaja sai kuvansa. |

### Leake Streetin tunneli

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Cans Festival 2008 | toukokuussa 2008 | Tunneli avautui taiteelle toukokuussa 2008, kun Banksy järjesti siellä kolmipäiväisen Cans Festivalin. |

### Neljäs jalusta

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – jalusta jäi tyhjäksi 1841 | vuonna 1841 | Kolmelle nousi patsas, mutta luoteiskulman jalusta jäi vuonna 1841 tyhjäksi, koska rahat loppuivat kesken. |
| – ihmiset jalustalla 2009 | Kesällä 2009 | Kesällä 2009 teoksena olivat ihmiset itse. |

### Turbiinihalli

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Ai Weiwein siemenet 2010 | Vuonna 2010 | Vuonna 2010 kiinalainen Ai Weiwei levitti hallin lattialle sata miljoonaa auringonkukansiementä. |

### Savusumu 1952

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – savusumu 1952 | Joulukuussa 1952 | Joulukuussa 1952 Lontoon kadut katosivat viideksi päiväksi. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 tämä rantakatu oli kolmen vuoden ikäinen. |
| – laki säädettiin 1956 | vuonna 1956 | Neljä vuotta savusumun jälkeen, vuonna 1956, säädettiin laki, joka puuttui siihen, mistä savu tuli: piipusta ei enää saanut päästää tummaa savua, ja kunnat saivat oikeuden määrätä kokonaisia alueita savuttomiksi, jolloin kodin tulisijassa sai polttaa vain savutonta polttoainetta. |

### Händel ja Hendrix

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Händel muutti 1723 | vuonna 1723 | Säveltäjä Georg Friedrich Händel muutti numeroon 25 vuonna 1723 ja asui siellä kuolemaansa saakka 14. huhtikuuta 1759. |
| – Händel kuoli 1759 | huhtikuuta 1759 | Säveltäjä Georg Friedrich Händel muutti numeroon 25 vuonna 1723 ja asui siellä kuolemaansa saakka 14. huhtikuuta 1759. |
| – Messias sävelletty 1741 | välillä 1741 | Elokuun 22. ja syyskuun 14. päivän välillä 1741 hän sävelsi 24 päivässä Messias-oratorion, joka syntyi todennäköisesti juuri tässä talossa. |
| – Hendrix asui 1968–69 | vuosina 1968–69 | Reilut kaksisataa vuotta myöhemmin viereisessä talossa, numerossa 23, asui vuosina 1968–69 kitaristi Jimi Hendrix. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Händel oli ollut kuolleena jo yli sata vuotta. |

### Johnson 1755

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – sanakirja ilmestyi 1755 | vuonna 1755 | Työ kesti lähes vuosikymmenen, ja kirja ilmestyi vuonna 1755. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Johnson oli ollut kuolleena lähes 90 vuotta, mutta hänen vuokraamansa talo seisoi yhä Gough Squarella. |

### Punch 1662

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – Pepysin merkintä 1662 | päivänä 1662 | Toukokuun 9. päivänä 1662 Samuel Pepys kirjasi päiväkirjaansa käyneensä Covent Gardenissa katsomassa italialaista nukketeatteria, jota esitettiin aitauksen sisällä. |
| – toinen merkintä 1669 | Vuonna 1669 | Vuonna 1669 Pepys kirjasi toisen merkinnän: kujalla hän kuuli köyhien kutsuvan lihavaa lastaan Punchiksi, ja se ilahdutti häntä, koska sana oli tullut yleiseen käyttöön kaikesta paksusta ja lyhyestä. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Pepysin merkinnästä oli kulunut yli 200 vuotta. |

### Baird 1926

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – television esitys 1926 | Tammikuussa 1926 | Tammikuussa 1926 keksijä John Logie Baird esitteli Royal Institutionin jäsenille laitettaan laboratoriossa, joka oli yläkerran huoneessa Frith Streetillä Sohossa. |
| – Nipkow'n kiekko 1884 | vuonna 1884 | Bairdin televisio oli mekaaninen, ja sen ytimessä oli pyörivä kiekko, jonka saksalainen Paul Nipkow oli keksinyt jo vuonna 1884. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 televisiota ei vielä ollut, eikä Baird ollut edes syntynyt. |

### Sähkötin 1837

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – koe Eustonilla 1837 | Heinäkuussa 1837 | Heinäkuussa 1837 laitetta kokeiltiin London and Birmingham -radalla Euston-aseman ja Camden Townin välillä. |
| – isoisän matka 1873 | matkavuonna 1873 | Isoisäsi matkavuonna 1873 Eustonin kokeesta oli kulunut 36 vuotta. |
| – Wheatstone kuoli 1875 | kuoli 1875 | Molemmat keksijät olivat vielä elossa: Wheatstone kuoli 1875 ja Cooke 1879. |
| – Cooke kuoli 1879 | Cooke 1879 | Molemmat keksijät olivat vielä elossa: Wheatstone kuoli 1875 ja Cooke 1879. |

### Liukumäkiveistos

| Ruudulla | kohta | Virke tekstissä |
|---|---|---|
| – olympialaiset 2012 | vuoden 2012 | Sen suunnittelivat kuvanveistäjä Anish Kapoor ja insinööri Cecil Balmond vuoden 2012 olympialaisia varten. |
| – liukumäki kiedottiin 2016 | Vuonna 2016 | Vuonna 2016 veistokseen kiedottiin toinen taideteos: Carsten Höllerin 178 metriä pitkä liukumäki, maailman pisin tunneliliukumäki. |
