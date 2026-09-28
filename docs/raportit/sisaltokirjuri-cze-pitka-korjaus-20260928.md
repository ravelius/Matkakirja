# CZE: 14 maakunnan pitka-tekstien korjaus (Sisältökirjuri, 28.9.2026)

Tausta: nykyiset `js/packs/maakunnat-luonnehdinnat.js`:n CZE-tekstit on kirjoitettu
niin, että lähes jokainen virke kiertyy "isoisän 1873 matkan aikaan" -kehyksen
ympärille. Korjaus vastaa samaa mallia kuin ROU (ks. Fablen korjauscommit
f89eef22693e55019251a5b5c8bb3c15c2b0faaf): pääpaino alueen nykytilassa,
1873/isoisä-kytkös vain jos se on alueen identiteetin ydinasia, ja silloinkin
enintään yhtenä virkkeenä.

Faktat säilytetty nykyisistä teksteistä (paikannimet, vuosiluvut, henkilöt,
ilmiöt). Muutamaan tekstiin lisätty täydentäviä nykyaikaisia faktoja tyhjäksi
jääneen isoisä-kehyksen tilalle — nämä on tarkistettu WebSearchilla (Grandhotel
Pupp v. 1701 + kuuluisat vieraat, Ještědin Perret-palkinto 1969, Jan Kašparin
lento 1911, Palackýn yliopisto 1573, Plzeňin perustaminen 1295, Kutná Horan
pražský groš -rahapaja, Budweiser Budvar -tavaramerkkikiista, Hradec Královén
"Salon republiky" -kaupunkisuunnitelma, Macochan kuilun syvyys). `lyhyt`-,
`kuva`- ja muita kenttiä ei ole muutettu.

Pistokoe (kohta 4): 14 tekstistä **0 mainitsee sanan "isoisä" tai vuosiluvun
"1873"**. Kahdessa tekstissä (Jihomoravský, Královéhradecký) on yksi virke
Austerlitzin/Königgrätzin taistelusta — nämä ovat tehtävänannossa nimetyt
esimerkit alueen identiteetin ydinasioista, mutta niitäkään ei ole kytketty
isoisän matkaan, vaan esitetty pelkkinä historiallisina faktoina.

---

### Jihočeský

```
pitka: `Hluboká nad Vltavou -linna kohoaa Vltavan mutkan yllä valkoisena satulinnana, joka näyttää lainatulta Englannista — eikä se ole sattumaa, sillä Schwarzenbergin ruhtinassuku muutti keskiaikaisen linnan perinpohjin uusgoottilaiseksi 1841–1871 esikuvanaan Windsorin linna. Nykyään linna on Tšekin suosituimpia nähtävyyksiä komeine sisätiloineen ja laajoine puistoineen. Etelä-Böömin lammikkoverkosto — 1500-luvulla kaivettu Rožmberkin lampi suurimpana — tuottaa yhä valtaosan maan joulukarpeista, ja lampien rannoilla pesii runsaasti vesilintuja. Läänin pääkaupungissa České Budějovicessa pannaan Budweiser Budvar -olutta, jonka nimestä amerikkalainen Anheuser-Busch on kiistellyt tšekkiläisten kanssa oikeussaleissa jo yli sata vuotta.`,
```

### Jihomoravský

```
pitka: `Slavkov u Brnan tasangolla Napoleon murskasi joulukuun toisena päivänä 1805 Venäjän ja Itävallan yhdistetyn armeijan taistelussa, jota historia muistaa Austerlitzin nimellä; taistelukentällä kohoaa nykyään Rauhan kumpu, pystytetty vasta 1900-luvun alussa. Etelä-Moravia tunnetaan nykyään ennen kaikkea viinistä — alueella kasvatetaan enemmän viiniä kuin missään muualla Tšekissä, ja syyskuiset viininkorjuujuhlat täyttävät kylien torit. Lednice-Valticen linnojen ja puistojen kokonaisuus on Euroopan suurin ihmisen muotoilema maisemapuisto ja Unescon maailmanperintöä. Pohjoisempana Moravský kras -karstialueella Macochan kuilu avautuu lähes 140 metrin syvyyteen keskellä metsää, ja sen pohjalta lähtee Punkva-joki uurtamiensa luolastojen läpi.`,
```

### Karlovarský

```
pitka: `Karlovy Vary elää yhä kylpyläkulttuuristaan: kaupungin vanhin suurhotelli, nykyinen Pupp, juontaa juurensa vuoteen 1701 ja on isännöinyt vuosisatojen varrella niin Pietari Suurta, Napoleonia kuin Beethovenia, Bachia ja Kafkaa. Nykyiset kivestä ja valuraudasta veistetyt lähdekäytävät korvasivat vaatimattomammat puiset katokset vasta 1800-luvun lopulla. Kaupunki tunnetaan myös Becherovka-yrttilikööristä, jonka apteekkari Josef Vitus Becher kehitti 1807 ja jonka tarkkaa reseptiä vartioidaan yhä salaisuutena. Heinäkuinen kansainvälinen elokuvajuhla, järjestetty vuodesta 1946, tuo nykyään kaupunkiin tähtiä ympäri maailmaa ja täyttää kylpyläkadut punaisilla matoilla.`,
```

### Královéhradecký

```
pitka: `Heinäkuussa 1866 Preussin ja Itävallan armeijat kohtasivat Hradec Královén pelloilla Königgrätzin taistelussa, yhdessä 1800-luvun Euroopan suurimmista yksipäiväisistä taisteluista, joka ratkaisi koko Saksan yhdistymisen suunnan preussilaisittain; alueella on yhä lukuisia muistomerkkejä ja hautausmaita. Linnoitusstatuksen purkamisen jälkeen arkkitehti Josef Gočár laati kaupungille 1920-luvulla kunnianhimoisen kaupunkisuunnitelman, jonka ansiosta siitä tuli tunnettu "tasavallan salonkina". Lähellä sijaitsevassa Kuksin kylässä barokkitaiteilija Matyáš Bernard Braun veisti 1700-luvulla kivestä hyveitä ja paheita esittävät patsaat, jotka seisovat siellä yhä. Krkonošen vuoristo tarjoaa kesäisin vaellusreittejä ja talvisin hiihtoa Sněžkan juurella, Tšekin korkeimman huipun kupeessa.`,
```

### Liberecký

```
pitka: `Liberecin seutua kutsuttiin 1800-luvulla Böömin Manchesteriksi, koska laakson täyttivät villa- ja pellavakehruumot savupiippuineen, ja alueesta kasvoi koko Habsburgien valtakunnan johtava tekstiiliteollisuuden keskus. Monet tehtaista ovat nykyään tyhjillään tai muutettu muuhun käyttöön, mutta niiden punatiiliset piiput hallitsevat yhä laakson maisemaa. Pohjoisempana Nový Bor jatkaa satojen vuosien mittaista lasinpuhaltajien perinnettään, joka tuottaa nykyään lasikoristeita ja taidelasia ympäri maailman. Ještědin huipun suppilomainen televisiotorni palkittiin 1969 arvostetulla kansainvälisellä Perret-arkkitehtuuripalkinnolla vielä ennen kuin se edes valmistui 1973, ja sen suunnittelija Karel Hubáček on yhä ainoa tšekkiläinen palkinnon saaja.`,
```

### Moravskoslezský

```
pitka: `Ostrava kasvoi lähes tyhjästä Vítkovicen rautatehtaan ja sitä ympäröivien hiilikaivosten ympärille: tehdas perustettiin 1828, ja 1843 sen ostivat itävaltalais-juutalaiseen Rothschildin sukuun kuuluneet pankkiirit, jotka rakensivat siitä yhden Habsburgien valtakunnan suurimmista rauta- ja teräslaitoksista. Savupiippujen ja kaivostornien maisema teki kaupungista aikanaan Keski-Euroopan oman pienen Ruhrin alueen. Masuunit sammutettiin lopullisesti 1998, ja nykyään Dolní Vítkovicen teollisuusalue on kulttuurikohde, jonka yhden masuunin huipulle pääsee kiipeämään näköalapaikalle. Entinen kaasukello on muutettu Gong-konserttisaliksi, joka isännöi kesäisin Colours of Ostrava -musiikkifestivaalia, yhtä Keski-Euroopan suurimmista.`,
```

### Olomoucký

```
pitka: `Olomoucin vanhakaupunki on Prahan jälkeen maan laajin historiallinen keskusta, ja sen laajuus juontuu pitkästä sotilashistoriasta: raskaat muurit ja bastionit pitivät kaupungin tiukasti linnoitettuna Itävallan sotalaitoksena, eikä siviilirakentaminen vapautunut ennen kuin linnoitusstatus purettiin 1886. Kaupunki tunnetaan myös nuoren Franz Josefin kruunauspaikkana — hänet julistettiin Itävallan keisariksi Olomoucissa 1848. Palackýn yliopisto, jonka juuret ulottuvat jesuiittakollegioon vuodelta 1573, on Prahan Kaarlen yliopiston jälkeen Tšekin toiseksi vanhin korkeakoulu ja tekee kaupungista nykyään vilkkaan opiskelijakaupungin. Alueella valmistetaan yhä ainoaa alkuperäistä tšekkiläistä juustolaatua, voimakastuoksuista tvarůžky-rahkajuustoa.`,
```

### Pardubický

```
pitka: `Pardubicen kuuluisin estelaukka, Velká pardubická, on juostu joka lokakuu vuodesta 1874, ja sen pelätyin este, syvä Taxis-oja, on niellyt jo lukuisia ratsastajia. Kaupunki on yhtä kuuluisa perinkeitostaan: paikalliset leipurit ovat valmistaneet mausteista Pardubicen perník-piparkakkua ainakin 1500-luvulta lähtien, ja perinne on säilynyt katkeamatta tähän päivään. Renessanssiaikainen Pernštejnin sukukartano hallitsee kaupungin toria, muistona suvusta, joka rakensi seudun vaurauden kalanviljelyllä ja kaupalla 1400–1500-luvuilla. Toukokuussa 1911 lentäjä Jan Kašpar nousi Pardubicesta ilmaan ja lensi 121 kilometrin matkan Prahaan asti — tuolloin pisin lento koko Itävalta-Unkarissa — ja tapaus muistetaan kaupungissa yhä ylpeänä osana sen ilmailuhistoriaa.`,
```

### Plzeňský

```
pitka: `Plzeňin vanhakaupunki perustettiin 1295 kuningas Václav II:n määräyksestä säännölliseksi ruutukaavaksi, joka on säilynyt sellaisenaan ja on yksi Euroopan parhaiten säilyneistä keskiaikaisista kaupunkisuunnitelmista. Insinööri Emil Škoda otti 1869 haltuunsa pienen konepajan kaupungissa — yrityksen, joka kasvoi yhdeksi Habsburgien valtakunnan ja sittemmin koko Euroopan suurimmista kone- ja asetehtaista, ja Škoda-nimi elää yhä sekä autoissa että raskaassa teollisuudessa. Kaupungin toinen kuuluisuus, vaalea pohjahiivaolut, keksittiin siellä 1842, ja nimitys "pils" on siitä lähtien tarkoittanut lähes mitä tahansa vaaleaa lageria ympäri maailman. Panimoalueella käy nykyään vuosittain satojatuhansia matkailijoita, jotka kiertävät historiallisia hiekkakivikellareita syvällä kaupungin alla.`,
```

### Prague

```
pitka: `Prahan ylpeys, Kansallisteatteri, valmistui vasta 1881 — peruskivi oli muurattu jo 1868 kymmenillä eri puolilta Böömiä tuoduilla kivilohkareilla — mutta rakennus paloi pian samana vuonna uudelleen ja avautui lopullisesti vasta 1883. Nykyään teatterissa esitetään oopperaa, balettia ja draamaa, ja sen kultainen katto kimaltelee Vltavan rannalla yhtenä kaupungin tunnetuimmista maamerkeistä. Vanhassakaupungissa Orloj-tähtitieteellinen kello on yli 600-vuotias, sen alkuperäiset osat ajalta 1410, ja se näyttää yhä aikaa, planeettojen asennot ja apostolien kulkueen joka tunti turistijoukkojen edessä. Praha säästyi suurelta osin toisen maailmansodan pommituksilta, minkä ansiosta sen keskiaikainen ja barokkiajan katutunnelma on säilynyt poikkeuksellisen ehyenä.`,
```

### Středočeský

```
pitka: `Karlštejnin linna, jonka keisari Kaarle IV rakennutti 1348 säilyttääkseen siellä valtakunnan kruununjalokivet, on nykyään yksi Tšekin suosituimmista linnoista ja sai nykyisen jyrkkäharjaisen ilmeensä vasta arkkitehti Josef Mockerin kunnostuksessa 1887 alkaen. Lähempänä Prahaa sijaitseva Křivoklátin metsästyslinna oli vuosisatoja kuningasten yksityistä metsästysmaata, ja sen laajat metsät ovat säilyneet suojeltuina biosfäärialueena. Kutná Horan keskiaikaiset hopeakaivokset tekivät kaupungista 1300-luvun alussa Euroopan johtavan hopeantuottajan, ja sen omalla rahapajalla lyötiin vuodesta 1300 pražský groš -hopearahaa, joka hallitsi Keski-Euroopan kauppaa vuosisadan ajan. Nykyään kaivoskaupunki on Unescon maailmanperintöä, ja sen Pyhän Barbaran kirkko kaivostyöläisten suojeluspyhimykselle on yksi Böömin komeimmista gotiikan rakennuksista.`,
```

### Ústecký

```
pitka: `Pohjois-Böömin ruskohiiliallas kasvoi 1800-luvulla nopeasti valtakunnan tärkeimmäksi teollisuusalueeksi, kun kaivokset syvenivät ja rautatiet uudistuivat vuosikymmen toisensa jälkeen. Vuonna 1975 Mostin kaupungin keskiaikainen tiilinen kirkko siirrettiin kokonaisena 841 metrin matkan raiteilla syrjään, kun avolouhos uhkasi niellä sen alleen — insinöörityö, joka ylitti aikanaan maailmanennätyksen siirretyn rakennuksen painossa. Nykyään monet vanhat avolouhokset on täytetty vedellä ja muutettu virkistysjärviksi, joiden rannoilla uidaan ja purjehditaan entisen kaivosmaiseman keskellä. Etelämpänä hiekkakivimaisemat Böömin Sveitsin kansallispuistossa ovat sen sijaan pysyneet lähes koskemattomina ja suosittuina vaellusreitteinä.`,
```

### Vysočina

```
pitka: `Žďár nad Sázavoun lähellä kohoaa Zelená horan pyhiinvaelluskirkko, jonka arkkitehti Jan Blažej Santini-Aichel suunnitteli 1719–1722 tähdenmuotoiseksi kunnianosoitukseksi Pyhälle Johannes Nepomukille, ja kirkko on nykyään Unescon maailmanperintöä. Vysočinan ylängöllä eletään harvaan asutulla, karulla seudulla, jossa perunat ja hapankaali ovat perinteisesti korvanneet vehnän, koska vuoristoinen maaperä ei ole antanut viljaa yhtä helposti kuin muualla Böömissä. Nykyään ylängön kylmät talvet ja kukkulat tekevät siitä maan johtavan hiihtoseudun: Nové Město na Moravěn stadion isännöi säännöllisesti ampumahiihdon ja maastohiihdon maailmancupin osakilpailuja. Telč sai keskiaikaisen muotonsa kahden keinotekoisen lammikon välisellä kapealla kannaksella, joka suojasi kaupunkia tulipaloilta ja hyökkääjiltä ja selittää yhä sen poikkeuksellisen ehjänä säilyneen renessanssitorin.`,
```

### Zlínský

```
pitka: `Zlín oli 1800-luvulla vain vaatimaton maalaispitäjä muutaman tuhannen asukkaan kylineen, kunnes paikallisen suutariperheen poika Tomáš Baťa perusti kenkätehtaansa 1894 — tehdas kasvoi nopeasti maailman suurimpien kenkävalmistajien joukkoon, ja koko kaupunki rakennettiin 1920–30-luvuilla uudelleen funktionalistiseksi "puutarhakaupungiksi" tehtaan ympärille. Nykyään Baťan tehdaskompleksi on osittain museona ja osittain yliopiston ja yritysten käytössä, ja sen punatiiliset tehdashallit ovat harvinainen esimerkki 1900-luvun alun teollisuusarkkitehtuurista. Vuoristoisella Valašskon alueella on sen sijaan pitkät perinteet paimentolaiskarjataloudessa ja hirsirakentamisessa, joita Rožnov pod Radhoštěmin ulkoilmamuseo — Keski-Euroopan vanhin, perustettu 1925 — esittelee alkuperäisissä hirsirakennuksissa.`,
```
