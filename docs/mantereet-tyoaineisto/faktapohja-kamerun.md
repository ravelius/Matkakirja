# Kamerun-maalehti (ISO-3: CMR) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 6.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`). Lyhyt faktapohja: vain ne luvut,
päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
CMR-lohkoon, sekä ristiriidat. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Ruoka, Kuvataide, Musiikki, Urheilu.**
Minitehtävä on Ruoka-sivulla.

**Rajaus.** Kamerunissa ei ole yhtään kaupunkilehteä (laudalla on
kaupunki `kamerun`, mutta `KULTTUURI_KATEGORIAT`-lohkoa sillä ei ole),
joten päällekkäisyyttä kaupunkitasolle ei ole. Karttanostot rajaavat sen
sijaan paljon: `js/packs/maastokohteet-cmr.js` kattaa Kamerunvuoren,
Guineanlahden, Sanagan, **Foumbanin palatsin ja sulttaani Njoyan
bamun-kirjaimiston**, Djan luonnonpuiston, **Bimbian isubu-sataman ja
orjakaupan**, Rhumsikin kapsiki-kylän, Wazan, Kribin, Korupin ja
Ngaoundéréen; `js/packs/skandaalit.js` Nyosjärven 1986 ja **Douala 1914
— Rudolf Duala Manga Bellin**; `js/packs/elaintakyt.js`
goliattisammakon. **Maalehti ei koske yhteenkään näistä.** Siksi:

- **Luonto jätettiin kokonaan pois aiheista** — kartta kattaa jo
  Kamerunin luonnon (Kamerunvuori, Dja, Korup, Waza, Sanaga,
  goliattisammakko), joten viides aihe on Kuvataide.
- Historiassa ei ole Njoyaa eikä bamun-kirjaimistoa, ei Bimbian
  orjakauppaa eikä Saksan siirtomaahallinnon väkivaltaa (Douala 1914 on
  skandaalikortti; en-Wikipedian "German Kamerun" -artikkelin
  Puttkammer-osion pakkotyö- ja rangaistuskuvaukset on jätetty pois
  tietoisesti — ne kuuluvat skandaalikortille, eivät matkalehteen).
- Kuvataiteessa ei ole Foumbania eikä bamounien palatsimuseota; tilalla
  ovat bamileke-naamiot, Bandjounin chefferie, grassfields-kankaat ja
  nykytaide.

**Herkät aiheet.** Nykypolitiikka on jätetty kokonaan pois (M3:n
Myanmar-linja): Kamerunin nykyinen presidentti mainitaan vain
virka-asemana ("maan presidentti") Roger Millan paluujutussa, ja
englanninkielisten alueiden nykytilanne jää lehden ulkopuolelle.
Historia päättyy vuoteen 1972.

## 1. Historia

- **Sao ja Kotoko** (en-Wikipedia "Sao civilisation", johdanto sekä osiot
  "Origins" ja "Culture"; "Kotoko people", osiot "History" ja "Culture"):
  Sao-sivilisaatio kukoisti **noin 2000 eaa. – 1500-luvulle** Charin
  jokialtaassa nykyisten Kamerunin ja Tšadin alueella; se on **varhaisin
  sivilisaatio, joka on jättänyt selvät jäljet** näiden maiden alueelle.
  Juuret ovat **Gajiganna-kulttuurissa** (n. 1800 eaa.), joka rakensi
  linnoitettuja kaupunkeja **noin 800 eaa.** alkaen. Kaupunkivaltioiden
  huippukausi oli **900–1400-luvuilla**. Löydöissä on **pronssia,
  kuparia ja rautaa**: veistoksia, terrakottahahmoja ihmisistä ja
  eläimistä, kolikoita, hauta-astioita, koruja ja keihäitä. G. T. Striden
  siteeratun kuvauksen mukaan jokaista kaupunkia ympäröi **vahva
  puolustusmuuri**, hallitsija oli **jumalallinen** ja pysyi
  seremonioita lukuun ottamatta **verhon takana näkymättömissä**, ja
  **kuningatar-äidillä ja hallitsijan vanhimmalla sisarella** oli
  huomattava poliittinen vaikutusvalta. **Kotokot** perustivat oman
  kuningaskuntansa **noin 1500** ja pitävät itseään Saon perillisinä;
  he kalastavat pitkillä ruuhillaan ja savustavat tai kuivaavat saaliin.
- **Katkaravun joki** (en-Wikipedia "Cameroon", osio "Etymology";
  "History of Cameroon", johdanto): maan nimi on **portugalilaisten
  antama eksonyymi Wouri-joelle**, jota he kutsuivat nimellä **Rio dos
  Camarões**, katkarapujen joki, koska joessa oli tuolloin runsaasti
  **Kamerunin haamukatkarapua**. Portugaliksi maa on yhä **Camarões**.
  Eurooppalaiset kauppiaat saapuivat **1400-luvulla**. Pohjois-Kamerun
  oli Tšad-altaan ja Sahelin islamilaisten kuningaskuntien
  vaikutuspiirissä, etelää hallitsivat **pienet kuninkaat, päälliköt ja
  fonit**.
- **Mandaran kuningaskunta** (en-Wikipedia "Mandara Kingdom", johdanto
  ja osio "History"): perinteen mukaan perustettu **hieman ennen vuotta
  1500**; perustajina **naishallitsija Soukda** ja **metsästäjä Gaya**.
  **Leo Africanus** kirjoitti siitä **1526** ja kehui hallitsijoita:
  asukkaat olivat "rikkaita ja ahkeria" ja **"suuria oikeuden ja
  kohtuuden ystäviä"**. Pääkaupunki **Dulo noin 1580**. Bornun keisari
  **Idris Alaoma asetti Aldawa Nandan kuninkaaksi 1614**.
  **Mai Bukar Aji teki kuningaskunnasta sulttaanikunnan noin 1715** ja
  kääntyi islamiin. **Noin 1781** Mandara voitti Bornun suuressa
  taistelussa, ja huipussaan se sai veroa **noin 15 päällikkökunnalta**.
  **1809 Modibo Adama**, Usman dan Fodion oppilas, valtasi Dulon
  hetkeksi, mutta vastahyökkäys ajoi hänet rajojen taakse. Englantilainen
  **Dixon Denham** matkasi alueelle **helmikuussa 1823** ja toi
  ensimmäisiä eurooppalaisia kuvauksia kuningaskunnasta.
  *(RISTIRIITA: artikkeli sanoo perustamisajaksi "hieman ennen 1500",
  mutta mainitsee myös Fra Mauron viittauksen vuodelta 1459. Samoin
  loppuvaiheen vuodet ovat ristiriitaiset: "tuhottiin 1895 tai 1896" ja
  "kaatui lopulta 1893". Lehteen on kirjoitettu vain ne kohdat, joissa
  ristiriitaa ei ole.)*
- **Kaksi Kamerunia, yksi maa** (en-Wikipedia "History of Cameroon",
  osiot "British Cameroons (1918–1961)" ja "Independence and presidency
  of Ahmadou Ahidjo (1960–1982)"; "German Kamerun", osio "World War I
  and aftermath"): Versailles'n rauha jakoi Saksan Kamerunin **kahdeksi
  Kansainliiton mandaatiksi** Britannian ja Ranskan hallintaan. Ranskan
  Kamerun itsenäistyi **1. tammikuuta 1960** — Guinean jälkeen
  **toisena Ranskan Saharan eteläpuolisena siirtomaana**;
  perustuslakiäänestys **21.2.1960**, **Ahmadou Ahidjo** presidentiksi
  **5.5.1960**. Britannian Kamerunissa järjestettiin kansanäänestys
  **11.2.1961**: **pohjoinen valitsi liittymisen Nigeriaan, eteläinen
  Kameruniin**; tulos julkistettiin **12.2.1961**. Ehdoista neuvoteltiin
  **Foumbanin konferenssissa 16.–21. heinäkuuta 1961** (Etelä-Kamerunia
  edusti **John Ngu Foncha**, Kamerunia Ahidjo). **Liittovaltion
  perustuslaki hyväksyttiin 14.8.1961**: **Buea** oli Länsi-Kamerunin
  pääkaupunki, **Yaoundé** liittovaltion ja Itä-Kamerunin. **1972**
  kansanäänestys korvasi liittovaltion **yhtenäisvaltiolla**.

## 2. Ruoka

- **Ndolé** (en-Wikipedia "Ndolé", johdanto ja osio "Preparation"):
  pata, jossa on **jauhettuja maapähkinöitä, rapuja, valkosipulia,
  sipulia ja ndoleh-lehtiä**. **Syntyi Doualassa** Littoralin alueella
  ja on **laajalti pidetty Kamerunin kansallisruokana**. Yleensä kalaa
  tai naudanlihaa; **katkarapuversiota kutsutaan kuninkaalliseksi**
  ("regal"). Lisukkeena **paistettuja tai keitettyjä
  plantaanibanaaneja** sekä **bobolo tai miondo** — hapatettua
  maniokkitahnaa, joka höyrytetään **marantalehdissä** ja kierretään
  usein **spiraaleiksi**. Lehdet **keitetään kaksi tai kolme kertaa
  suolatussa vedessä vuorisuolan kanssa** kitkeryyden vähentämiseksi;
  ruoka on **työläs ja hidas** valmistaa, mutta raaka-aineet edullisia.
  **Riisi ei ole perinteinen lisuke**, koska se ei ole Kamerunin
  perusruokaa.
- **Achu eli keltainen keitto** (en-Wikipedia "Achu (soup)", johdanto ja
  osio "Preparation"; "Cameroonian cuisine", osio "Specialties"):
  **tikarien ja ngembojen** perusruoka **luoteis- ja länsialueilla**;
  nimi on **luoteessa achu, lännessä taro**. **Kokojamssi ja raakoja
  banaaneja** keitetään, kuoritaan ja **survotaan huhmaressa taikinaksi**.
  Keitto tehdään erikseen **palmuöljystä, "niki"- eli kanwa-vedestä
  (kalkkikivi), mausteista, suolasta, pippurista ja lihaliemestä** —
  naudasta, naudannahasta tai sisäelimistä. **Juuri kalkkikivi muuttaa
  palmuöljyn keltaiseksi**, ja siitä ruoka on saanut nimen keltainen
  keitto. Tarjoillaan kuumana perhejuhlissa ja kulttuuritapahtumissa.
  *(Tästä on lehden minitehtävä.)*
- **Penjan pippuri** (en-Wikipedia "Penja pepper", johdanto ja osio
  "History"): **Piper nigrum** kasvatettuna **Penjan laakson
  vulkaanisessa maaperässä**; saatavana **vihreänä, valkoisena, mustana
  ja punaisena**. Suojattu maantieteellisenä merkintänä **OAPI:n 17
  Afrikan maassa** Banguin sopimuksen nojalla sekä **EU:n suojattuna
  maantieteellisenä merkintänä**. Pippuriviljelyn toi Kameruniin
  **Antoine Decré**, jolla oli Penjassa **banaaniviljelmä**. Ensimmäinen
  vienti oli **40 kilon säkki valkopippuria maaliskuussa 1958**.
  Michelin-kokkien suosiossa; **toukokuussa 2016 hinta oli jopa 321
  euroa kilolta**.
- **Eru** (en-Wikipedia "Gnetum africanum", johdanto sekä osiot
  "Description", "Distribution and habitat", "Uses" ja "Culture";
  "Cameroonian cuisine", osio "Specialties"): trooppisen Afrikan oma
  köynnös, joka on lehdistään huolimatta **paljassiemeninen — mäntyjen
  ja muiden havupuiden sukulainen**. Kasvaa **noin 10 metriä pitkäksi**,
  **paksut paperimaiset lehdet kolmen ryhmissä**, lehti noin **8 cm**;
  siemenet **10–15 mm** ja kypsinä **punaoranssit**. Kamerunissa nimet
  **eru, okok, m'fumbua, fumbua**. **Varjoa suosiva** köynnös kiipeää
  ali- ja välikerroksen puihin **merenpinnasta 1 200 metriin**. Lehdet
  **silputaan hyvin ohuiksi** ja keitetään **vesilehden tai pinaatin,
  palmuöljyn, rapujen ja savustetun kalan, naudannahan (kanda) tai
  naudanlihan** kanssa; syödään **water fufun** (maniokki) kanssa. Ruoka
  on **Manyu-kansan** oma lounaisalueella. Lehtiä myydään toreilla
  **ympäri vuoden** ja ne ovat **verottomia**; kauppaa käyvät
  **pääosin maaseudun naiset, noin 80 prosenttia** koko kaupasta.
  **Limben kasvitieteelliseen puutarhaan** on istutettu **noin 19
  lajiketta** geenipankin aluksi; kannan hupeneminen liittyy metsien
  hakkuisiin.

## 3. Kuvataide

- **Norsunaamio** (en-Wikipedia "Bamileke people", osio "Royal tradition
  and the arts"; helmityön taustaksi myös osiot "Beadwork" ja "Sculpture
  and pottery", joista lehteen päätyi vain helmityön kuvaus): naamiaiskulkueet ovat olennainen osa
  bamileke-kulttuuria; **värikkäät helmillä koristellut naamiot**
  puetaan hautajaisissa, palatsijuhlissa ja kuninkaallisissa
  seremonioissa, **esiintyjät ovat miehiä**, ja tarkoitus on **tukea ja
  vahvistaa kuninkaan valtaa**. Kuninkaan eli **fonin** valtaa edustavat
  **norsu, puhveli ja leopardi**; suullisen perinteen mukaan **fon voi
  muuttua norsuksi tai leopardiksi milloin haluaa**. Norsunaamiossa
  (**mbap mteng**) on **ulkonevat pyöreät korvat**, ihmismäiset kasvot
  ja **edessä ja takana polviin asti ulottuvat paneelit**, jotka on
  peitetty **geometrisella helmityöllä**. **Tasakylkinen kolmio on
  leopardin tunnus**. Fon voi antaa luvan esiintyä norsunaamiossa
  **leopardintaljan kanssa**, mikä on osoitus varallisuudesta ja
  asemasta. Myös **puhvelinaamiot** ovat yleisiä ja kuvaavat voimaa,
  vahvuutta ja rohkeutta.
- *(Taustaksi, ei omaa nostoa.)* **Helmityö ja veistos** (en-Wikipedia
  "Bamileke people", osiot "Beadwork" ja "Sculpture and pottery"): helmityö erottaa
  bamileke-taiteen muusta Afrikasta, **kaksi samanlaista työtä ei ole**,
  ja käytetyt helmet kertovat asemasta. **Helmityö puuveistoksen päällä
  on tekniikka, joka on ainutlaatuisesti Kamerunin ruohikkomaiden oma.**
  Ennen siirtomaa-aikaa helmiä saatiin **Saharan eteläpuolisista maista,
  mm. Nigeriasta**, ja ne tehtiin **simpukoista, pähkinöistä, puusta,
  siemenistä, keramiikasta, norsunluusta, luusta ja metallista**;
  siirtomaakauppa toi **kirkkaanväriset lasihelmet, helmiäisen, korallin
  ja jalokiviä**. Bamileke-veistäjää **ei pidetä tuottajana vaan
  luojana**: veistokset, reliefit ja maalaukset ovat elämänvoimia, ja
  veistäjä on **välittäjä**, jonka tehtävä on toteuttaa jumalan näkymä
  merkeillä ja symboleilla.
- **Bandjounin chefferie** (en-Wikipedia "Bandjoun", osio "The Chefferie
  or Chiefdom of Bandjoun"): **20 km Bafoussamista kaakkoon** N4-tien
  varrella. Suuri maja on **17 metriä korkea**, ja sen rakennutti
  **kuningas Notouom I noin neljäsataa vuotta sitten**; sitä on
  kunnostettu säännöllisesti. **Ullakko on viljavarasto** (puuta,
  maapähkinöitä, maissia). Majassa on kolme huonetta ja kokoushuone,
  jonka seinillä on **leijonantaljat (päällikön tunnus)** ja
  **pantterintaljat (suurten arvohenkilöiden)**; oviin on veistetty
  **liskoja (alempien arvohenkilöiden tunnus)**. **Keskimmäiset
  kantopilarit ovat vanhimmat ja selvinneet kolmesta tulipalosta.**
  Kattoharjan **piikkien lukumäärä kertoo hierarkiasta**. Julkisivut
  ovat **bambua ja kasvikuitua** geometrisin kuvioin, ja ovet on
  **nostettu 50 senttiä maasta**, jottei valumavesi eikä eläin pääse
  sisään; **paksu kartiokatto ei päästä sadetta läpi**. Olkikatto on
  ulkopuolelta korvattu peltikatolla, mutta sisällä kaikki on ennallaan:
  tulisija keskellä, **kolme kiveä kannattelee pataa**, ja kalusteet
  ovat bambua. Museossa on helmillä peitettyjä kalebasseja ja patsaita,
  norsunluuveistoksia, naamioita, valtaistuimia ja **tanssihattuja —
  suurin painaa 25 kiloa** ja sen käyttää vain päällikkö vuosijuhlassa
  kiertäessään noin kaksi kierrosta Dzemton torin ympäri.
- **Toghu-kangas ja tikarien käsi** sekä **Barthélémy Toguo** (kaksi
  erillistä nostoa; en-Wikipedia "Tikar people", osiot "Culture" ja
  "Artistry"; "Barthélémy Toguo", osiot "Biography" ja "Artwork"): **toghu- ja ndop-kankaan kuviosta** tuli tikarien ja
  ruohikkomaiden kansojen tuntomerkki, ja sitä käytetään yhä
  **vaatteissa, rakennuksissa, taiteessa ja kuninkaallisten tilojen
  rajaamisessa**. Tikarit tunnetaan **hyvin yksityiskohtaisista
  naamioistaan** (**voimakkaat nenät ja suuret silmät**) ja
  **koristelluista messinkipiipuistaan**; heitä pidetään **seudun
  ainoana raudantaitajakansana**. Ruohikkomaiden palatseissa on
  **käsin veistetyt kattoa kannattavat pilarit**, ovenpielet, kamanat ja
  kynnykset. **Barthélémy Toguo** (s. **1967**) opiskeli Abidjanissa,
  Grenoblessa ja **Düsseldorfin Kunstakademiessa**; hän rakennutti
  kotiseudulleen **Bandjoun Stationin 2005–2007**: näyttelytila,
  kirjasto, **taiteilijaresidenssi ja luomutila**. Päärakennuksessa on
  **viisi haaraista betonipilaria** ja **kymmenen metrin korkuinen
  harjakatto**, joka noudattaa seudun perinteistä rakennustapaa; tilaan
  kutsutaan väkeä pitämään omia juhliaan — **hautajaisia, syntymiä,
  häitä**. Toguo nimitettiin **Unescon rauhantaiteilijaksi lokakuussa
  2021**; hänen työnsä käsittelevät **muuttoliikettä, siirtomaa-aikaa,
  maanpakoa ja siirtymää**, ja vesivärisarjat lähtivät liikkeelle
  **passeista ja niiden leimoista**.

## 4. Musiikki

- **Makossan synty** (en-Wikipedia "Makossa", johdanto sekä osiot
  "Etymology", "Origins", "Early development" ja "Ethnogenesis"):
  makossa syntyi **Doualassa** ja pohjaa dualojen **kossa**-tanssiin.
  **Nelle Eyoum** otti käyttöön kertosäkeen **"kossa kossa"** yhtyeessään
  Los Calvinos huutaessaan sitä lapsille, jotka alkoivat siitä tanssia.
  **m'a kossa** tarkoittaa dualaksi **"kiemurat"**, ja sana on
  **kehotushuudon ja kirosanan välimaastossa** — kiihoke, joka vaatii
  reaktion. Tyyli alkoi muotoutua **1950-luvulla**, mutta ensimmäiset
  levytykset tulivat **vasta vuosikymmen myöhemmin**. Makossaa on
  kuvattu **"hidastetuksi assikoksi"**: bassa-assikossa **pullo on
  lyömäsoitin** (viulisti **Jean-Luc Ponty** kutsui sitä nimellä
  "Bottle-bop"). Vaikutteita tulivat **highlifesta, merenguesta,
  kongolaisesta rumbasta** sekä 1970-luvulla **funkista ja discosta**
  (puhaltimet, basson soittotapa). Lauletaan **ranskaksi, dualaksi tai
  pidginenglanniksi**, tempo **130–170 iskua minuutissa**.
- **Soul Makossa** (en-Wikipedia "Soul Makossa", johdanto; "Manu
  Dibango", johdanto sekä osiot "Early life" ja "Career"): **Manu
  Dibango** (**12.12.1933 Douala – 24.3.2020**) julkaisi singlen
  **1972**. Se oli alun perin **B-puoli** kappaleelle "Hymne de la 8e
  Coupe d'Afrique des Nations", joka juhli **Kamerunin pääsyä Afrikan
  cupin puolivälieriin** ja sitä, että maa isännöi turnausta
  ensimmäistä kertaa; sanat kirjoitti **S. M. Eno Belinga**.
  **David Mancuso** löysi levyn **brooklynilaisesta länsi-intialaisesta
  levykaupasta** ja soitti sitä The Loft -juhlissaan; **Frankie Crocker**
  soitti sitä New Yorkin suosituimmalla mustan musiikin asemalla
  **WBLS**:llä. Koska alkuperäistä oli vaikea saada, **vähintään 23
  yhtyettä levytti siitä coverin**. Atlantic lisensoi alkuperäisen, ja
  single nousi **sijalle 35 Billboardin Hot 100 -listalla 1973**.
  Kertosäettä **"ma-ma-ko, ma-ma-sa, ma-ko ma-ko-sa"** käyttivät
  **Michael Jackson** kappaleessa "Wanna Be Startin' Somethin'"
  (**Thriller, 1982**) ja **Rihanna** kappaleessa "Don't Stop the Music"
  (**2007**). Se on **historian sampletuin afrikkalainen kappale**;
  Rolling Stone sijoitti sen **sijalle 35** listallaan "200 Greatest
  Dance Songs of All Time" (**2022**). Dibango nimitettiin **Unescon
  rauhantaiteilijaksi 2004**. *(Jacksonin luvattomasta lainasta sovittiin
  aikanaan oikeuden ulkopuolella; myöhempi oikeusjuttu 2009 on jätetty
  lehden ulkopuolelle, koska se on riita eikä musiikkia.)*
- **Bikutsi** (en-Wikipedia "Bikutsi", johdanto sekä osiot "Etymology",
  "Description" ja "History"; "Les Têtes Brulées", osio "About"):
  nimi tarkoittaa **"lyö maata"** (**bi-** monikko, **-kut-** lyödä,
  **-chi** maa) — tanssia säestää **jalkojen polkeminen maahan**. Tyyli
  kehittyi **betien eli ewondojen** perinteestä **Yaoundén ympäristössä**
  ja on **6/8-rytminen**. Beti-juhlissa on kaksi vaihetta: **ekang**,
  jossa puhutaan myyteistä ja hengellisistä asioista, ja **bikutsi**,
  jossa puhutaan tämän elämän asioista; **naiset laulavat ja tanssivat
  balafonin kanssa**, ja aiheina ovat ihmissuhteet ja kuuluisien
  ihmisten elämä. Ensimmäiset levytykset teki **Anne-Marie Nzié
  1940-luvulla**. **Messi Me Nkonda Martin**, Los Camaroesin keulahahmo
  ja "modernin bikutsin isä", **sitoi sähkökitaran kielet yhteen
  puuvillanaruilla**, jolloin kitara alkoi kuulostaa **balafonilta**.
  Kansainvälinen huomio alkoi **1987**, kun **Jean-Marie Ahanda** perusti
  yhtyeen **Les Têtes Brûlées**; kitaristi **Zanzibar** keksi vaimentaa
  kielet **vaahtomuovisuikaleella** tallan kohdalta samaan tarkoitukseen.
  Yhtye tunnettiin **ajelluista päistä ja kirkkaista kehomaalauksista**,
  jotka viittasivat betien perinteisiin arpikuvioihin. Bikutsi vaikutti
  **Paul Simonin levyyn The Rhythm of the Saints (1990)**.
- **Mvet** (en-Wikipedia "Mvet", johdanto sekä osiot "Origin" ja
  "Legend"): **fangien kielisoitin**, tikkusitra, jota soitetaan
  Gabonissa, Kamerunissa, Kongon demokraattisessa tasavallassa, São
  Tomessa ja Päiväntasaajan Guineassa. Runkona on **1–2 metrin
  raffiapalmun tai bambun varsi**, jossa on tavallisesti **kolme
  kalebassikaikupohjaa**; **pystysuora keskitalla** jakaa **neljä tai
  viisi jänne- tai metallikieltä**, ja niitä soitetaan **tallan
  molemmilta puolilta**. Soitin pidetään **vaakasuorassa rintaa vasten**,
  ja keskimmäistä kaikupohjaa **avataan ja suljetaan käsivarren
  liikkeellä**. Mvet tarkoittaa myös **eeposlaulajien perinnettä**, joka
  kertoo fangien ja lähikansojen myyttejä ja historiaa. Legendan mukaan
  soittimen sai **soturi ja muusikko Oyono Ada Ngone**, joka pakomatkalla
  **menetti tajuntansa** ja jonka **elotonta ruumista kannettiin viikko**;
  herättyään hän kertoi tavanneensa **Eyo-nimisen hengen**, joka antoi
  hänelle soittimen ja **Ekangin urotöiden tarinat**. **1900-luvun
  lopulla mvetistä tuli bikutsin avainsoitin.**

## 5. Urheilu

- **Italia 1990** (en-Wikipedia "Cameroon national football team",
  johdanto ja osio "1956–2000: early years"; "Roger Milla", osio "1990
  World Cup"): Kamerun voitti avausottelussa **hallitsevan
  maailmanmestarin Argentiinan 1–0**, maalintekijänä **François
  Omam-Biyik**. Sitten **Romania 2–1** ja tappio **Neuvostoliitolle
  0–4** — Kamerunista tuli **ensimmäinen joukkue, joka voitti MM-lohkon
  negatiivisella maalierolla**. Kahdeksannesvälierässä **Kolumbia 2–1**
  jatkoajalla, ja Kamerun oli **ensimmäinen afrikkalainen joukkue
  puolivälierissä**. Englantia vastaan **Emmanuel Kundé** teki
  rangaistuspotkumaalin **61. minuutilla** ja **Eugène Ekéké** johtomaalin
  **65.**, mutta **Gary Lineker** tasoitti pilkulta **83.** ja ratkaisi
  toisella pilkulla **105.**; **3–2 Englannille jatkoajalla**.
  Valmentaja oli venäläinen **Valeri Nepomnjaštši**.
- **Roger Milla** (en-Wikipedia "Roger Milla", johdanto sekä osiot
  "Biography", "International career", "1990 World Cup", "1994 World Cup"
  ja "Style of play"): synt. **20.5.1952**; passissa lukee virheen
  vuoksi **Roger Miller**. Hän **lopetti maajoukkueuransa 1988** 36-
  vuotiaana, mutta **maan presidentti soitti hänelle 1990** ja pyysi
  palaamaan; paluu julkistettiin **toukokuussa 1990**. Milla teki
  turnauksessa **neljä maalia — kaikki vaihtomiehenä** — ja juhli
  jokaista **kulmalipulla lambadaa muistuttavalla tanssilla**. Hän
  **riisti pallon kolumbialaismaalivahti René Higuitalta** rangaistus-
  alueen ulkopuolella ja teki maalin. **1994 hän palasi 42-vuotiaana** ja
  teki maalin Venäjää vastaan — **MM-kisojen vanhin maalintekijä**, oma
  ennätys parannettuna. **Pelé valitsi hänet FIFA 100 -listalle 2004**,
  ja **CAF nimesi hänet 2007 viidenkymmenen vuoden parhaaksi
  afrikkalaispelaajaksi**.
- **Vuosi 2000** (en-Wikipedia "Football at the 2000 Summer Olympics –
  Men's tournament", johdanto; "Cameroon at the 2000 Summer Olympics",
  johdanto ja osio "Football"; "2000 African Cup of Nations", johdanto):
  Kamerun voitti **Afrikan cupin 2000** — turnauksen isännöivät
  yhdessä **Ghana ja Nigeria**, ja finaalissa kaadettiin **Nigeria
  rangaistuspotkuin 4–3**. Samana vuonna **Sydneyn olympiaturnauksen
  jalkapallofinaali** pelattiin **13.–30. syyskuuta** järjestetyn
  turnauksen päätteeksi, ja Kamerun voitti **Espanjan** — **maan
  ensimmäinen olympiakulta**. Finaali keräsi **104 098 katsojaa**, mikä
  on **olympiajalkapallon yleisöennätys** (edellinen 101 799 Rose
  Bowlissa 1984). Valmentaja oli **Jean-Paul Akono**. Jatkoajat
  pelattiin **golden goal -säännöllä**.
- **Françoise Mbango Etone** (en-Wikipedia "Françoise Mbango Etone",
  johdanto): synt. **14.4.1976 Yaoundéssa**. **Kolmiloikan
  olympiavoittaja Ateenassa 2004 ja Pekingissä 2008**; Pekingin tulos
  **15,39 m** oli **olympiaennätys** ja on **kaikkien aikojen kolmanneksi
  pisin naisten kolmiloikka missä tahansa olosuhteissa**. **Vain 25
  naista on ylittänyt 15 metriä**, ja Mbango Etone ylitti sen **seitsemän
  kertaa viimeisellä yhdellätoista yrityksellään** pelkästään Pekingin
  finaalissa. Hän oli **ensimmäinen Kamerunia edustanut naisurheilija,
  joka voitti mitalin Kansainyhteisön kisoissa, MM-kisoissa ja
  olympialaisissa**. Hän oli myös pituushyppääjä ja sijoittui **toiseksi
  Afrikan mestaruuskisoissa 1999**. **Vuodesta 2010 hän on kilpaillut
  Ranskan väreissä.**

## Uutislähde

**DataCameroon** (datacameroon.com), ranska. Testattu 6.9.2026:
syötteessä `https://datacameroon.com/feed/` kymmenen juttua, ja
artikkelisivun ainoasta `<article>`-lohkosta jäsentyy **7–8 yli 60
merkin kappaletta** sekä `og:image` (testattu kaksi eri artikkelia).
Hylätyt lähteet on lueteltu `js/packs/uutislahteet.js`:n
CMR-kommentissa.

## Kuvat

13 nostoa sai kuvan Commonsista (lisenssi ja tekijä extmetadatasta,
leveys ≥ 1200 px, jokainen katsottu silmin 480 px:n pikkukuvana),
**seitsemän jäi kuvattomaksi**: Sao ja Kotoko, katkaravun joki,
Mandaran kuningaskunta, makossan synty, Italia 1990, vuosi 2000 ja
Mbango Etone. Hylätyt: "Achu de Bafut" (tunnistettavia kasvoja pöydän
ympärillä), "Masque royal éléphant, Musée du quai Branly"
(museovitriini ja opastekyltti kuvassa, eikä naamio ole helmikoristeltu
norsunaamio), "Case initiatique du laakam à bandjoun" (tunnistettava
henkilö, joka ei ole jutun aihe), "Plage de sable du Wouri" (rannalla
roskia — ei anna maasta rehellistä yleiskuvaa), "Mandara Mountains -
panoramio" (extmetadatan tekijä on katkaistu sähköpostiosoite, ei
nimi), "Mont Mandara" (kuvattu tien varren muurin yli),
"Mangrove-Wouri 02" (autosta otettu kaistale), "Monument Reunification
4" (kuvattu monumentilta poispäin, itse monumentti ei näy).
Tunnistettavia kasvoja on vain kuvissa, joissa henkilö **on** jutun
aihe (Manu Dibango, Roger Milla, Barthélémy Toguo) — sama linja kuin
Keniassa.

Käytetyt kuvat nostoittain:

| Nosto | Commons-tiedosto | Tekijä ja lisenssi |
| --- | --- | --- |
| Kansanäänestys, joka teki kahdesta yhden | Reunification monument in Buea.jpg | A.R. Etoyiva, CC BY-SA 4.0 |
| Kansallisruoka, jonka lehdet keitetään kolmesti | Le Ndolé.JPG | Jessica Sagou, CC BY-SA 4.0 |
| Keitto, jonka värin tekee kalkkikivi | Taro sauce jaune avec peau de boeuf.jpg | Minette Lontsie, CC BY-SA 4.0 |
| Neljäkymmentä kiloa pippuria banaaniviljelmältä | Piper nigrum Dried fruits with and without pericarp - Penja Cameroun.jpg | Didier Descouens, CC BY-SA 4.0 |
| Havupuun sukulainen, joka silputaan keitoksi | Gnetum africanum Leaves (Eru ou Okok).jpg | Minette Lontsie, CC BY-SA 4.0 |
| Naamio, jossa kuningas muuttuu norsuksi | Masque d'éléphant.jpg | Prosper Pérez, CC BY-SA 4.0 |
| Kylä, jossa katonharja kertoo arvon | Esplanade de la chefferie bandjoun.jpg | Franco237, CC BY-SA 4.0 |
| Kangas, joka kertoo mistä olet kotoisin | Toghu cloth, north west region cameroon.jpg | serieminou, CC BY-SA 4.0 |
| Taiteilija, joka rakensi galleriansa kotikylään | Barthélémy TOGUO.jpg | KAG1LP2MDIAKITE, CC BY-SA 4.0 |
| B-puoli, joka valloitti New Yorkin | DIBANGO.jpg | Emmanuel Dautant, CC BY-SA 2.0 |
| Kitara, joka sidottiin kuulostamaan balafonilta | BalafonOuest2.jpg | Happiraphael, CC BY-SA 4.0 |
| Soitin, jonka mukaan hengen antoi | Mvet (MDMB 679).jpg | Sguastevi, CC BY-SA 4.0 |
| Kolmekymmentäkahdeksanvuotias vaihtomies | Milla2008.JPG | Jmex60, CC BY-SA 3.0 |
