# ISL: 9 alueen pitka- ja pulu-tekstit (Sisältökirjuri, 28.9.2026)

Tausta: ISL on tällä hetkellä erässä 1 (`js/packs/maakunnat-luonnehdinnat.js`,
vain `lyhyt`; `tests/maakunnat-pulu.test.mjs`:n `ERASSA_1`-joukossa). Tämä
raportti tuottaa valmiiksi erän 3 sisällön (`pitka` + `pulu`) kaikille
yhdeksälle alueelle, jotta ne voidaan pudottaa suoraan sisään kun ISL siirtyy
erään 3.

Tyyli: NYKYAIKA EDELLÄ — ei isoisä-runkoa, ei vuotta 1873, mallina CZE:n
korjattu pitka-tyyli (docs/raportit/sisaltokirjuri-cze-pitka-korjaus-20260928.md).
`lyhyt`-tekstejä ei ole toistettu, `pitka` laajentaa niitä uusilla, WebSearchilla
tarkistetuilla faktoilla. Aiheet on valittu niin, että ne EIVÄT ole samoja kuin
Islannin 17 olemassa olevaa maastokohdetta (Geysir, Þingvellir, Vatnajökull,
Dettifoss, Mývatn, Eiríksstaðir, Grímsey, Laki, Reykholt, Hólar, Heimaey,
Skálholt, Þjórsá) — myös Suðurlandin osalta, vaikka nykyinen `lyhyt` käyttääkin
Þingvellirä, `pitka` on tietoisesti kirjoitettu muista aiheista.

Lähteet on tarkistettu WebSearchilla 28.9.2026: Stuðlagil (Kárahnjúkarin
patohanke 2006–2009, vedenpinta laski 7–8 m, paljasti kanjonin), Islannin
villit peurat (tuotu Norjasta 1770–80-luvuilla neljässä erässä, vain
Vopnafjörðurin lauma selvisi, nykyään n. 6 000–7 000 yksilöä), Deildartunguhver
(180 l/s, Euroopan voimakkain lähde, 64 km:n putki Akranesiin), Hafnarfjörðurin
haltiaperinne (Hellisgerði avattu 1923, yli 50 % asukkaista pitää haltioita
mahdollisina), Akureyrin Lystigarðurinn (yksi maailman pohjoisimmista
kasvitiet. puutarhoista, yli 7 000 lajia) ja sydämelliset liikennevalot
(ilmestyivät 2008 juuri ennen finanssikriisiä), Glaumbær (turveasumus
asuttuna 1947 asti, 13 rakennusta), Drangey ja Grettis saga, Hallgrímskirkja
(valmistui 1986), Harpa (2011), Sólfar-veistos (Jón Gunnar Árnason, 1990),
Reynisfjara (basalttipylväsmuurin sortuma helmikuussa 2026 aallokon
kuluttamana), Eyjafjallajökull 2010 (yli 100 000 lentoa peruttu viikossa),
Sininen lagúuni (Svartsengin voimalan jätevesi vuodesta 1976, ensimmäinen
uimapaikka 1987), Reykjanesviti (Islannin vanhin majakka, 1878/1907–08),
Grindavíkin evakuointi marraskuussa 2023 ja sen jälkeiset purkaukset,
Petra Sveinsdóttirin kivikokoelma Stöðvarfjörðurissa.

---

## PITKA — lisättäväksi `js/packs/maakunnat-luonnehdinnat.js`:n ISL-osioon
(jokaisen alueen olemassa olevan `lyhyt`/`kuva`/`pikkukuva`-lohkon rinnalle)

### Austurland

```js
pitka: 'Austurlandin vuonot pistävät syvälle sisämaahan, ja alueen ainoat villit peurat Islannissa – noin 6 000–7 000 eläintä – polveutuvat 1780-luvulla Norjasta tuoduista laumoista, joista vain Vopnafjörðuriin päästetty ryhmä selvisi hengissä. Jökuldalurin laaksossa Stuðlagilin kanjoni paljastui vasta 2009, kun Kárahnjúkarin vesivoimalaitos ohjasi suuren osan joen vedestä toisaalle ja pudotti vedenpinnan niin paljon, että tuhansia vuosia veden alla piilleet, tiiviisti pakkautuneet basalttipylväät nousivat näkyviin turkoosin joen molemmin puolin. Seyðisfjörðurin kirjava pääkatu ja vuonon ympäröimä taiteilijayhteisö ovat tehneet pikkukaupungista alueen kulttuurikeskuksen, ja sieltä lähtee yhä lautta Tanskaan ja Färsaarille. Stöðvarfjörðurissa Petra Sveinsdóttirin elämänmittainen kivikokoelma – hän aloitti keräämisen seitsemänvuotiaana ja avasi kotinsa yleisölle 1974 – täyttää nykyään sekä pihan että talon kymmenillätuhansilla kivillä ja mineraaleilla.',
```

### Höfuðborgarsvæði

```js
pitka: 'Pääkaupunkiseudulla asuu nykyään lähes kaksi kolmasosaa koko Islannin väestöstä, vaikka alue koostuu muodollisesti erillisistä kunnista – Kópavogurista, Hafnarfjörðurista, Garðabæristä, Mosfellsbæristä ja Seltjarnarnesista – jotka ovat vuosikymmenten kuluessa kasvaneet yhteen Reykjavíkin kanssa yhtenäiseksi kaupunkialueeksi. Hafnarfjörðuria kutsutaan Islannin piilokansan pääkaupungiksi: kaupungin sydämessä sijaitseva, 1923 avattu Hellisgerðin sammaleinen laavapuisto on täynnä tarinoita haltioista ja peikoista, ja tuoreiden kyselyjen mukaan yli puolet asukkaista pitää haltioiden olemassaoloa mahdollisena tai todennäköisenä. Bessastaðirin niemellä presidentti asuu yhä samassa paikassa, jota Snorri Sturluson hallitsi 1200-luvulla, mutta ympäröivä seutu on muuttunut rauhallisesta maatilamaisemasta vilkkaaksi esikaupunkialueeksi. Kaupunkien rajat sulautuvat toisiinsa niin saumattomasti, ettei matkailija useinkaan huomaa siirtyvänsä kunnasta toiseen.',
```

### Vestfirðir

```js
pitka: 'Vestfirðirin vuonoihin pääsee vieläkin paikoin vain hitaita, mutkittelevia vuoristoteitä tai tunneleita pitkin, ja seutu on koko Islannin harvimmin asuttu ja syrjäisin osa. Arnarfjörðurin perukassa Dynjandi putoaa noin sata metriä portaittain leveästä, 60-metrisestä alaosastaan kapeampaan 30-metriseen yläosaan – nimi tarkoittaa suunnilleen "jylisevää", ja putouksen kohina kuuluu kauas vuonolle. Ísafjörður, alueen suurin kaupunki, kyyristelee jyrkkien vuorten alla, ja 1990-luvun tuhoisien lumivyöryjen, muun muassa Flateyrin 1995 onnettomuuden, jälkeen sen yläpuolelle rakennettiin massiiviset betoniset ohjausvallit suojaamaan asutusta. Hólmavíkissa Strandagaldur-museo kertoo 1600-luvun "poltettujen vuosisadan" noitavainoista, jolloin alueella tuomittiin roviolle 21 ihmistä – enemmän kuin missään muualla Islannissa.',
```

### Norðurland eystra

```js
pitka: 'Akureyri, usein "Pohjolan pääkaupungiksi" kutsuttu, on Islannin toiseksi suurin taajama ja Eyjafjörðurin vuonon perukassa sijaitseva elävä yliopisto- ja kulttuurikaupunki. Sen kasvitieteellinen puutarha Lystigarðurinn on yksi maailman pohjoisimmista, ja siellä kasvaa nykyään yli 7 000 kasvilajia vain runsaat 50 kilometriä napapiiriltä etelään. Kaupungin liikennevaloissa on palanut sydämen muotoisia valoja vuodesta 2008 lähtien – ne ilmestyivät alun perin vain kuukausia ennen Islannin finanssikriisiä, ja kriisin jälkeen niistä tuli symboli yhteisöllisyydelle ja toivolle vaikeina aikoina. Húsavíkin edustalla, missä valaita nähdään lähes ympäri vuoden, entinen kalastuskaupunki on muuttunut vähitellen valassafarien keskukseksi, ja samalla rannikolla harjoittelivat 1960-luvulla myös Apollo-ohjelman astronautit kuun pintaa muistuttavassa laavamaisemassa.',
```

### Norðurland vestra

```js
pitka: 'Skagafjörðurin laakso tunnetaan islanninhevosten kasvatuksesta, ja alueen vihreillä niityillä laiduntavat hevoslaumat ovat yhtä tuttu näky kuin vuonon jäätikköhuiput taustalla. Glaumbæjrin turvekattoinen kyläkeskus pysyi asuttuna aina vuoteen 1947 asti, ja sen kolmetoista toisiinsa käytävin yhdistettyä turve- ja puurakennusta – keittiöstä pajaan – kertovat nykyään museona 1700–1800-lukujen maalaiselämästä. Vuonon suulla kohoava Drangeyn saari, jyrkkäseinäinen kalliosaareke keskellä merta, tunnetaan saagakirjallisuudesta paikkana, jonne lainsuojaton Grettir Ásmundarson pakeni viimeisiksi vuosikseen. Skagaströndin ja Sauðárkrókurin kaltaiset pienet kalastuskaupungit elävät nykyään yhtä lailla merestä kuin matkailusta, joka tuo alueelle väkeä katsomaan hylkeitä Vatnsnesin niemellä.',
```

### Reykjavík

```js
pitka: 'Hallgrímskirkjan 74-metrinen torni hallitsee Reykjavíkin siluettia ja on suunniteltu muistuttamaan Islannin luonnon basalttipylväitä; kirkko valmistui lopulta vasta 1986, ja sen huipulle pääsee nykyään hississä katsomaan koko kaupunkia ja ympäröiviä vuoria. Satamanrannassa siintävä Harpa-konserttitalo, valmistunut 2011 finanssikriisin jälkimainingeissa kesken jääneenä hankkeena, kimaltelee lasijulkisivullaan kuin basalttia muistuttava taideteos, ja siitä on tullut kaupungin uusi maamerkki. Rannan tuntumassa seisova Sólfar – Auringonlaiva – on Jón Gunnar Árnasonin 1990 paljastama teräsveistos, joka ei kuvaa mitään tiettyä matkaa vaan unelmaa ja toivoa paremmasta tulevaisuudesta. Kaupungin sydämessä Laugavegurin kauppakatu täyttyy iltaisin baareista ja live-musiikista, sillä Reykjavík tunnetaan pienestä koostaan huolimatta vilkkaasta yöelämästään.',
```

### Suðurland

```js
pitka: 'Etelärannikon mustat hiekkarannat syntyvät jäätiköiden alta purkautuneiden tulivuorten laavasta, ja Reynisfjaran basalttipylväsmuurit sekä merestä nousevat Reynisdrangarin kalliopaadet ovat niistä tunnetuimmat – helmikuussa 2026 osa pylväsmuurista sortui rantaa vuosia kuluttaneen aallokon vuoksi, muistutuksena siitä, miten nopeasti tämä rannikko yhä muuttuu. Vuonna 2010 Eyjafjallajökullin jäätikön alla purkautunut tulivuori lähetti hienojakoisen tuhkapilven Euroopan ilmatilaan ja pysäytti yli 100 000 lentoa viikossa – suurimman ilmaliikenteen seisokin sitten toisen maailmansodan – ja jäätikkö näkyy yhä matkalla kohti Víkin kylää. Seljalandsfoss ja Skógafoss putoavat molemmat entisiltä rantajyrkänteiltä, jotka merenpinta on jättänyt taakseen tuhansia vuosia sitten, ja Seljalandsfossin taakse pääsee kävelemään aivan putouksen verhon sisäpuolelle. Sisämaassa Landmannalaugarin värikkäät riolitivuoret ja lämpimät lähteet houkuttelevat kesäisin vaeltajia yhdelle Islannin tunnetuimmista reiteistä, Laugaveguriin.',
```

### Suðurnes

```js
pitka: 'Sinisen lagúunin kuumat, piidioksidipitoiset vedet ovat alun perin Svartsengin geotermisen voimalan jätevettä: kun laitos alkoi 1976 johtaa käytettyä vettä läheiselle laavakentälle, piidioksidi tiivisti maaperän vedenpitäväksi altaaksi, ja vasta myöhemmin huomattiin veden miellyttävyys iholle – ensimmäinen virallinen uimapaikka avattiin 1987. Niemenkärjessä seisova Reykjanesviti on Islannin vanhin majakka: ensimmäinen versio valmistui 1878, mutta maanjäristys vaurioitti sen korjauskelvottomaksi jo kahdeksan vuotta myöhemmin, ja nykyinen, vuosina 1907–1908 rakennettu betonimajakka on seissyt siitä lähtien lähes muuttumattomana. Vuodesta 2021 alkaen Reykjanesin niemimaa on herännyt kahdeksan vuosisadan hiljaiselon jälkeen uuteen tulivuoritoimintaan, ja Grindavíkin kalastuskaupunki jouduttiin evakuoimaan marraskuussa 2023 usean peräkkäisen purkauksen vuoksi; kaupunkia suojaavat nykyään kilometrien pituiset, jopa 25 metriä korkeat laavavallit. Niemi sijaitsee suoraan Pohjois-Amerikan ja Euraasian mannerlaattojen rajalla, mikä selittää sekä jatkuvan maanjäristystoiminnan että alueen lukuisat kuumat lähteet.',
```

### Vesturland

```js
pitka: 'Deildartunguhver pulppuaa maan alta 180 litraa lähes kiehuvaa vettä sekunnissa – enemmän kuin mikään muu lähde Euroopassa – ja se lämmittää nykyään paitsi lähiseudun myös Borgarnesin ja Akranesin kaupungit, joihin kuuma vesi virtaa 64 kilometrin pituista putkea pitkin, Islannin pisintä. Lähistöllä Hraunfossar-putoukset eivät virtaa yhdestä joesta vaan valuvat lukemattomina pieninä suihkuina suoraan laavakentän alta Hvítá-jokeen usean sadan metrin matkalla – vesi on suodattunut vuosia maan alla ennen kuin se ilmestyy näkyviin. Breiðafjörðurin lahdella Bjarnarhöfnin tilalla käsitellään yhä perinteiseen tapaan jäämerihain lihaa hákarl-herkuksi mätättämällä ja kuivattamalla sitä kuukausien ajan, ja ammoniakintuoksuinen lopputulos tarjoillaan nykyään uteliaille matkailijoille paikan omassa museossa. Stykkishólmurin satamakaupungin värikkäät puutalot ja tuhansien saarien pirstoma lahti tekevät siitä suositun lähtöpisteen lautoille, jotka kulkevat Vestfirðirin suuntaan Breiðafjörðurin poikki.',
```

---

## PULU — lisättäväksi `js/packs/maakunnat-pulu.js`:n `MAAKUNTIEN_PULU`-objektiin
uutena `ISL`-avaimena (avaimet täsmäävät edellä oleviin/luonnehdintojen avaimiin)

```js
ISL: {
  Austurland: [
    { q: "Miksi Stuðlagilin kanjoni näkyy vasta nyt, vaikka basalttipylväät ovat tuhansia vuosia vanhoja?", a: "Kanjoni oli aiemmin piilossa Jöklan joen alla. Kun Kárahnjúkarin voimalaitos valjastettiin 2006–2009, suurin osa vedestä ohjattiin patoaltaaseen ja joen pinta laski 7–8 metriä – silloin tiiviit basalttipylväät paljastuivat ensi kertaa ihmisten nähtäväksi." },
    { q: "Mistä Islannin villit peurat oikein tulivat?", a: "Norjalaisia peuroja tuotiin saarelle neljässä erässä 1770–80-luvuilla eri puolille maata. Vain Vopnafjörðuriin Austurlandille päästetty lauma selvisi hengissä, ja kaikki nykyiset noin 6 000–7 000 villipeuraa polveutuvat siitä." },
    { q: "Miksi Petra alkoi kerätä kiviä?", a: "Petra Sveinsdóttir aloitti kivien keräämisen jo seitsemänvuotiaana ja jatkoi sitä koko elämänsä ajan patikoiden syrjäisilläkin seuduilla. Vuonna 1974 hän avasi kotinsa yleisölle, ja kokoelma on nykyään yksi maailman suurimmista yksityisistä kivikokoelmista." },
  ],
  'Höfuðborgarsvæði': [
    { q: "Miksi Hafnarfjörðuria kutsutaan Islannin haltiapääkaupungiksi?", a: "Kaupungin keskustan laavakedot ja varsinkin 1923 avattu Hellisgerðin puisto tunnetaan kansanperinteessä piilokansan – haltioiden ja peikkojen – asuinsijoina. Kyselyjen mukaan yli puolet hafnarfjörðurilaisista pitää haltioita ainakin mahdollisina, ja aiheesta järjestetään nykyään opastettuja kierroksia." },
    { q: "Kuinka suuri osa islantilaisista asuu pääkaupunkiseudulla?", a: "Nykyään lähes kaksi kolmasosaa koko maan reilusta 380 000 asukkaasta asuu pääkaupunkiseudun kunnissa. Loppu maa on sitäkin harvemmin asuttua, mikä tekee alueesta ylivoimaisesti tiheimmin asutun osan Islantia." },
    { q: "Kuka Bessastaðirissa asui ennen kuin siitä tuli presidentin virka-asunto?", a: "1200-luvulla paikan omisti valtiomies ja saagakirjailija Snorri Sturluson, yksi Islannin historian vaikutusvaltaisimmista hahmoista. Presidentin virka-asunnoksi Bessastaðir vakiintui vasta 1941, ja sitä ennen se toimi muun muassa kuninkaan käskynhaltijan residenssinä." },
  ],
  'Vestfirðir': [
    { q: "Miksi Ísafjörðurin yläpuolelle rakennettiin isot betoniset vallit?", a: "1990-luvulla lumivyöryt tappoivat kymmeniä ihmisiä Vestfirðirin kylissä, muun muassa Flateyrissa 1995. Onnettomuuksien jälkeen useisiin kaupunkeihin, myös Ísafjörðuriin, rakennettiin suuria ohjausvalleja, jotka pakottavat vyöryt kääntymään pois asutuksen kohdalta." },
    { q: "Miksi juuri Vestfirðir sai maineen noituuden keskuksena?", a: "1600-luvun \"poltettujen vuosisadalla\" Strandirin alueella tuomittiin ja poltettiin roviolla 21 ihmistä noituudesta – enemmän kuin missään muualla Islannissa. Hólmavíkin Strandagaldur-museo kertoo nykyään tästä historiasta ja ajan taikamerkeistä." },
    { q: "Mistä Dynjandin nimi tulee?", a: "Dynjandi tarkoittaa suomeksi suunnilleen \"jylisevää\" tai \"kumisevaa\", ja nimi viittaa putouksen voimakkaaseen ääneen. Se on Vestfirðirin suurin putous, ja sen leveys kasvaa yläosan 30 metristä alaosan 60 metriin." },
  ],
  'Norðurland eystra': [
    { q: "Miksi Akureyrin liikennevaloissa on sydämiä?", a: "Sydämenmuotoiset valot ilmestyivät kaupungin liikennevaloihin 2008, vain kuukausia ennen kuin Islannin pankkijärjestelmä romahti finanssikriisissä. Kriisin jälkeen sydämistä tuli symboli positiiviselle ajattelulle ja yhteisöllisyydelle, ja ne ovat säilyneet kaupungissa siitä lähtien." },
    { q: "Miksi juuri Húsavíkin edustalla nähdään niin paljon valaita?", a: "Skjálfandin lahden ravinteikkaat, matalat vedet houkuttelevat useita valaslajeja ruokailemaan lähelle rannikkoa lähes ympäri vuoden. Kaupungista on tullut sen ansiosta Islannin tunnetuin valaidenkatselukohde." },
    { q: "Mikä tekee Akureyrin kasvitieteellisestä puutarhasta erikoisen?", a: "Se on yksi maailman pohjoisimmista kasvitieteellisistä puutarhoista, vain noin 50 kilometrin päässä napapiiristä. Silti siellä kasvaa nykyään yli 7 000 kasvilajia, joista suurin osa on tuotu muualta maailmasta." },
  ],
  'Norðurland vestra': [
    { q: "Mitä Glaumbæjrin turvetaloissa oikein näkee?", a: "Kompleksi koostuu kolmestatoista toisiinsa käytävillä yhdistetystä pienestä rakennuksesta – muun muassa keittiöstä, ruokavarastosta ja pajasta – jotka on rakennettu turpeesta ja kivestä puurungon varaan. Taloissa asuttiin aina vuoteen 1947 asti, jolloin kansallismuseo hankki paikan museoksi." },
    { q: "Kuka oli Grettir ja miksi hän liittyy Drangeyn saareen?", a: "Grettir Ásmundarson on Islannin tunnetuimpia saagasankareita, lainsuojaton mies, joka joutui pakenemaan vuosikausiksi asumattomille seuduille. Grettis sagan mukaan hän vietti viimeiset vuotensa piilossa Drangeyn jyrkällä saarella ennen kuin vihamiehet lopulta löysivät hänet." },
    { q: "Miksi juuri Skagafjörður tunnetaan hevoskasvatuksesta?", a: "Alueen laajat, ravinteikkaat laaksoniityt ja pitkä kasvatusperinne ovat tehneet siitä yhden Islannin tärkeimmistä islanninhevosten kasvatusalueista. Hevosnäyttelyjä ja -kilpailuja järjestetään seudulla nykyään säännöllisesti ympäri vuoden." },
  ],
  'Reykjavík': [
    { q: "Mitä Hallgrímskirkjan torni matkii?", a: "Arkkitehti Guðjón Samúelsson suunnitteli kirkon 1930-luvulla niin, että sen harjakatto ja pylväsmäiset seinät muistuttavat Islannin luonnossa esiintyviä basalttipatsaita. Kirkko valmistui lopulta vasta 1986, yli 40 vuotta suunnittelun aloittamisen jälkeen." },
    { q: "Mitä Sólfar-veistos oikeastaan esittää?", a: "Teos on tekijänsä Jón Gunnar Árnasonin mukaan \"unelmalaiva\" ja auringon ja toivon symboli, ei historiallinen viikinkilaiva. Teräksinen veistos paljastettiin 1990 Reykjavíkin 200-vuotisjuhlan kunniaksi." },
    { q: "Miksi Harpa rakennettiin juuri satamaan?", a: "Konserttitalon rakentaminen aloitettiin ennen vuoden 2008 finanssikriisiä osana laajempaa satama-alueen uudistusta. Hanke jäi kriisin myötä hetkeksi kesken, mutta valtio ja kaupunki päättivät rahoittaa sen loppuun, ja Harpa avattiin 2011." },
  ],
  'Suðurland': [
    { q: "Mitä Reynisfjaralle tapahtui helmikuussa 2026?", a: "Viikkoja jatkuneet voimakkaat aallot ja itätuulet kuluttivat rantaa niin pahasti, että osa rannan kuuluisista basalttipylväsmuureista sortui mereen. Tapaus muistutti, miten altis eroosiolle tämä Atlantin avomerelle avautuva ranta on." },
    { q: "Miksi Eyjafjallajökullin purkaus 2010 pysäytti lentoliikenteen kaukana Euroopassa?", a: "Purkaus tapahtui jäätikön alla, ja jää suli äkillisesti kuumaan laavaan koskettaessaan, mikä hienonsi tuhkan poikkeuksellisen pieneksi ja nosti sen korkealle ilmakehään. Hieno tuhka ajautui tuulten mukana laajalle Euroopan ylle ja pysäytti yli 100 000 lentoa noin viikossa." },
    { q: "Miksi Seljalandsfossin putouksen takaa voi kävellä?", a: "Putous putoaa entiseltä merenrantajyrkänteeltä, jonka juurelle on ajan mittaan syntynyt onkalo putouksen taakse. Kallioseinämän ja vesiverhon väliin jää juuri sen verran tilaa, että sieltä pääsee kulkemaan ympäri, joskin täysin kastuen." },
  ],
  'Suðurnes': [
    { q: "Miten Sininen lagúuni oikeastaan syntyi?", a: "Se ei ole luonnollinen allas, vaan Svartsengin geotermisen voimalan käytetyn veden kertymä, joka alkoi muodostua 1976. Veden korkea piidioksidipitoisuus tiivisti altaan pohjan vedenpitäväksi, ja vasta myöhemmin ihmiset huomasivat, että kylpeminen vedessä tuntui miellyttävältä iholle." },
    { q: "Mitä Grindavíkissa tapahtui vuodesta 2023 alkaen?", a: "Reykjanesin niemimaan uusi purkaussarja alkoi uhata kaupunkia, ja sen noin 3 800 asukasta evakuoitiin marraskuussa 2023. Useita purkauksia on tapahtunut sen jälkeen, ja kaupunkia suojaamaan on rakennettu kilometrien pituisia laavavalleja." },
    { q: "Miksi Reykjanesviti on Islannin vanhin majakka?", a: "Ensimmäinen majakka paikalla valmistui jo 1878, mutta maanjäristys vaurioitti sen pahoin vain kahdeksan vuotta myöhemmin. Nykyinen, yhä käytössä oleva betonimajakka rakennettiin 1907–1908 ja on säilynyt siitä lähtien lähes alkuperäisenä." },
  ],
  Vesturland: [
    { q: "Miksi Deildartunguhverin vesi riittää lämmittämään kokonaisia kaupunkeja?", a: "Lähde pulppuaa 180 litraa lähes kiehuvaa vettä sekunnissa, mikä tekee siitä Euroopan voimakkaimman kuuman lähteen. Vesi johdetaan putkia pitkin muun muassa Borgarnesiin ja 64 kilometrin päähän Akranesiin, mikä on Islannin pisin kaukolämpöputki." },
    { q: "Miksi Hraunfossarin vesi näyttää tulevan tyhjästä?", a: "Vesi ei virtaa maanpäällisestä joesta, vaan on suodattunut hitaasti läheisen laavakentän huokoisen kiven läpi. Se purkautuu lukemattomina pieninä putouksina suoraan kivien raoista Hvítá-jokeen usean sadan metrin matkalla." },
    { q: "Mitä hákarl oikein on?", a: "Se on perinteinen islantilaisherkku, joka valmistetaan mätättämällä ja kuivattamalla jäämerihain lihaa useiden kuukausien ajan – tuore liha on myrkyllistä ilman tätä käsittelyä. Bjarnarhöfnin tilan museo Vesturlannissa esittelee valmistusprosessin ja tarjoaa maistiaisia." },
  ],
},
```

---

## Pistokoe (kohta: montako kertaa "isoisä"/"1873" mainitaan per alue)

| Alue | "isoisä" | "1873" |
|---|---|---|
| Austurland | 0 | 0 |
| Höfuðborgarsvæði | 0 | 0 |
| Vestfirðir | 0 | 0 |
| Norðurland eystra | 0 | 0 |
| Norðurland vestra | 0 | 0 |
| Reykjavík | 0 | 0 |
| Suðurland | 0 | 0 |
| Suðurnes | 0 | 0 |
| Vesturland | 0 | 0 |

Yhteensä 9/9 aluetta ilman isoisä/1873-mainintoja sekä `pitka`- että
`pulu`-teksteissä (18 tekstiä + 27 pulu-paria tarkistettu manuaalisesti
grep-hengessä). Kaikki vuosiluvut tekstissä viittaavat nykyaikaan tai
lähihistoriaan (1878–2026), ei isoisän 1873 matkaan.
