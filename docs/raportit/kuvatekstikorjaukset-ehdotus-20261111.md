# Saapumisintron kuvatekstien virheet: korjausehdotukset (Sisältökirjuri 11.11.2026 klo 22.xx)

Koneluettava: `kuvatekstikorjaukset-ehdotus-20261111.json` (kaupunki, nro, luokka, vika, nyt_lyhyt, nyt_selite, lyhyt, selite; `lyhyt`/`selite` = ehdotus, selite = nykyinen jos ei muutosta). Lähteet: erän 1 raportti (liitteet A–D, kohta 2) ja erän 2 `tulos-*.md` -osiot "KUVATEKSTIN RISTIRIIDAT" (2 lähdettä per väite). Nykyiset tekstit: js/packs/kulttuuri-kategoriat.js, avauskuvat; nro = kuvan järjestys sarjassa = saapumisintron rivin nro.

**66 ehdotusta**: A = väärä fakta tai kuva ≠ teksti (24), B = lähteetön tai liioiteltu väite (23), C = tarkennus (19). KK hyväksyy; A ja B ensin.

## Ääneen luettavat
Kuvatekstejä ei ole äänitetty: ne näytetään ruudulla ja lukija (js/lukija.js) lukee niitä laitteen puheella. Uutta äänitystä ei siksi tarvita yhdellekään ehdotukselle (en löytänyt kuvatekstien luentajonoa; PT/Äänittäjä korjaa, jos sellainen on). Pariisin isoisän ja pulun tekstit ovat oma, jo hoidettu asiansa.

## Ei ehdotusta, vain tieto KK:lle
- Wien #6 Kahlenberg: Tonavatornin ja Tapanin tuomiokirkon näkyminen vahvistamaton; katsottava kuvasta (en ole katsonut).
- Heikosti lähteistetty mutta ei ristiriitaa, jätetty ennalleen: Tukholma #7 Fjällgatan (30 m, 1700-luvun talot), #8 ("yli kaksi miljoonaa matkustajaa"), Edinburgh #10 Dean Village (800 v, 11 myllyä), Budapest #7 "vanhimmista", Rooma #6, Istanbul #2.
- Istanbul #12 (silta ja Neitsyttorni samassa kuvassa): katsottu, pitää.
- Lissabon #8: metro-kuvateksti (1959, 4 linjaa, 56 asemaa) on oikein mutta väärän kuvan alla; ehdotus kuvaa nykykuvan, metrofakta voi siirtyä uuteen kuvaan. Lissabon #5:n pombalinen puuhäkki sopisi Kauppatori-kuvan (#4) selitteeseen.
- Krakova #1: "1764" esiintyy todennäköisesti muuallakin (`git grep 1764` kulttuuri-kategoriat.js ja Krakovan fokusvirta); koodimuutoksia ei ole tehty, vain ehdotukset.
- Rivin (Nimi · vuosi) ja kuvatekstin pitää täsmätä: Dublin #2 1854, #3 n. 1220–1260, Marseille #2 1852–1893, Varsova #2 1619, uudelleen 1984; Granada #1–2, Edinburgh #2, Lissabon #1 ilman vuotta tai KK:n päätöksen mukaan.

## Ehdotukset

### Lontoo

**#8 [C]** 'kiitää' vs lähde 'lähestyy'.
- Nyt L: Thames Clippersin jokibussi Hurricane Clipper kiitää Tower Bridgen ohi Thamesilla Lontoossa.
- Nyt S: Thames Clippersin jokibussiliikenne alkoi toukokuussa 1999, ja Hurricane Clipper otettiin käyttöön vuonna 2001.
- Ehd. L: Thames Clippersin jokibussi Hurricane Clipper lähestyy Tower Bridgeä Thamesilla Lontoossa.
- Ehd. S: Thames Clippersin jokibussiliikenne alkoi toukokuussa 1999, ja Hurricane Clipper otettiin käyttöön vuonna 2001.

**#6 [B]** Thamesin, Tower Bridgen ja Towerin näkyminen terassilta ei vahvistunut lähteistä.
- Nyt L: Sky Gardenista Lontoossa näkyvät Thames, Tower Bridge ja Tower of London.
- Nyt S: Sky Garden on julkinen puutarha ja näköalapaikka 20 Fenchurch Street -pilvenpiirtäjän ylimmissä kerroksissa. Ulkoterassilta näkee Thamesin, Tower Bridgen ja Tower of Londonin.
- Ehd. L: Sky Gardenista Lontoossa avautuu näkymä Thamesin yli kaupunkiin.
- Ehd. S: Sky Garden on julkinen puutarha ja näköalapaikka 20 Fenchurch Street -pilvenpiirtäjän ylimmissä kerroksissa. Ulkoterassilta avautuu näkymä Thamesin yli Lontooseen.

**#7 [C]** kuva on yleinen asuinkatu (ei Pall Mall), teksti puhuu Pall Mallista.
- Nyt L: Lontoon ensimmäisiä kaasukatuvaloja sytytettiin Pall Mallilla vuonna 1807.
- Nyt S: Kaasuvalon edelläkävijä Frederick Albert Winsor valaisi katua Pall Mallilla, ja Westminster Bridge valaistiin kaasulla 31. joulukuuta 1813.
- Ehd. L: Lontoossa kaasukatuvalot yleistyivät 1800-luvun alussa; Pall Mall valaistiin kaasulla 1807.
- Ehd. S: Kaasuvalon edelläkävijä Frederick Albert Winsor valaisi katua Pall Mallilla, ja Westminster Bridge valaistiin kaasulla 31. joulukuuta 1813.

**#2 [C]** Big Ben 'on lyönyt tunteja vuodesta 1859' on yksinkertaistus (kello halkesi 1859, tunnit lyötiin pienemmällä kellolla n. kolme vuotta).
- Nyt L: Westminsterin palatsin kellotornin Big Ben on lyönyt tunteja vuodesta 1859.
- Nyt S: Westminsterin palatsi rakennettiin uudelleen vuoden 1834 palon jälkeen, ja sen kellotornin Big Ben on lyönyt tunteja vuodesta 1859.
- Ehd. L: Westminsterin palatsin kellotornin Big Ben soi ensi kerran 1859.
- Ehd. S: Westminsterin palatsi rakennettiin uudelleen vuoden 1834 palon jälkeen, ja sen kellotornin Big Ben soi ensi kerran 1859.

### Praha

**#1 [C]** peruskiven laski Johannes Luxemburgilainen; Kaarle IV oli hankkeen alullepanija.
- Nyt L: Pyhän Vituksen katedraalin rakentaminen alkoi 1344 Kaarle IV:n käskystä ja valmistui vasta 1929.
- Nyt S: Pyhän Vituksen katedraalin rakentaminen alkoi vuonna 1344 Kaarle IV:n käskystä Matias Arraslaisen ja Peter Parlerin johdolla, ja rakennus saatiin valmiiksi vasta vuonna 1929.
- Ehd. L: Pyhän Vituksen katedraalin rakentaminen alkoi 1344 Kaarle IV:n aloitteesta ja valmistui vasta 1929.
- Ehd. S: Pyhän Vituksen katedraalin rakentaminen alkoi vuonna 1344 Kaarle IV:n aloitteesta Matias Arraslaisen ja Peter Parlerin johdolla, ja rakennus saatiin valmiiksi vasta vuonna 1929.

**#3 [A]** Tyko Brahen hauta on keskilaivassa, ei kuorissa; nimi Týnin.
- Nyt L: Tynin kirkon kuoriin, 1300-luvulta rakennettuun, haudattiin tähtitieteilijä Tyko Brahe vuonna 1601.
- Nyt S: Tynin kirkkoa rakennettiin 1300-luvulta lähtien vanhankaupungin pääkirkoksi, ja sen kuoriin haudattiin tähtitieteilijä Tyko Brahe vuonna 1601.
- Ehd. L: Týnin kirkkoon, 1300-luvulta rakennettuun, haudattiin tähtitieteilijä Tyko Brahe vuonna 1601.
- Ehd. S: Týnin kirkkoa rakennettiin 1300-luvulta lähtien vanhankaupungin pääkirkoksi, ja sinne haudattiin tähtitieteilijä Tyko Brahe vuonna 1601.

**#5 [C]** kanava kulkee Kampan saaren ja Malá Stranan välissä, ei 'läpi'.
- Nyt L: Čertovka-kanava kulkee Prahan Malá Stranan läpi vesimyllyn ohi.
- Nyt S: Čertovka on keskiajalla rakennettu kanava, joka säätelee vettä joenvarren myllyille ja erottaa Kampan saaren mantereesta.
- Ehd. L: Čertovka-kanava kulkee Prahan Malá Stranassa vesimyllyn ohi.
- Ehd. S: Čertovka on keskiajalla rakennettu kanava, joka säätelee vettä joenvarren myllyille ja erottaa Kampan saaren mantereesta.

**#8 [B]** Mánesin sillan nimi vain Commons-luokasta pääteltyä, ei varmistettu.
- Nyt L: Tatra T3 -raitiovaunu ajaa Mánesin sillalla, taustalla Prahan linna.
- Nyt S: Mánesin silta avattiin 1914 ja valmistui kokonaan 1916. Tatra T3 -vaunuja valmistettiin Prahan Smíchovissa vuosina 1960–1997 lähes 14 000.
- Ehd. L: Tatra T3 -raitiovaunu ajaa Prahan linnan edessä.
- Ehd. S: Tatra T3 -vaunuja valmistettiin Prahan Smíchovissa vuosina 1960–1997 lähes 14 000.

### Wien

**#1 [B]** 'Euroopan korkeimpia' ei vahvistu lähteistä (136,4–136,7 m).
- Nyt L: Stephansdomin etelätorni (1433) oli vuosisatoja Euroopan korkeimpia; katossa on yli 230 000 laattaa.
- Nyt S: Stephansdomin etelätorni valmistui 1433 ja oli vuosisatoja Euroopan korkeimpia; kirkon kirjava tiilikatto on ladottu yli 230 000 laatasta.
- Ehd. L: Stephansdomin etelätorni (1433) kohoaa noin 136 metriin; katossa on yli 230 000 laattaa.
- Ehd. S: Stephansdomin etelätorni valmistui 1433 ja kohoaa noin 136 metriin; kirkon kirjava tiilikatto on ladottu yli 230 000 laatasta.

**#2 [B]** 'rakennettiin kilpailemaan Versailles'n kanssa' liioittelua: ensimmäinen suunnitelma jäi liian kalliiksi, rakennettu versio pienempi.
- Nyt L: Schönbrunnin 1441 huonetta ja puutarhat rakennettiin kilpailemaan Versailles'n kanssa.
- Nyt S: Schönbrunn oli Habsburgien kesäpalatsi, jonka 1441 huonetta ja puutarhat rakennettiin kilpailemaan Versailles'n kanssa.
- Ehd. L: Schönbrunnin 1441 huonetta ja puutarhat tekivät siitä Versailles'n itävaltalaisen vastineen.
- Ehd. S: Schönbrunn oli Habsburgien kesäpalatsi, jonka 1441 huonetta ja puutarhat tekivät siitä Versailles'n itävaltalaisen vastineen.

**#3 [B]** 'esiintynyt lähes joka ilta' löyhä, selitteen 'joka ilta … kymmenen vuoden tauolla' epäselvä.
- Nyt L: Valtionooppera avasi 1869 Ringstrassen loistorakennusten sarjan ja on esiintynyt lähes joka ilta.
- Nyt S: Valtionooppera avasi 1869 Ringstrassen loistorakennusten sarjan, ja sen lavalla on esiinnytty joka ilta pommituksista 1945 vain kymmenen vuoden tauolla.
- Ehd. L: Valtionooppera avasi 1869 Ringstrassen loistorakennusten sarjan ja esittää yli 350 esitystä vuodessa.
- Ehd. S: Valtionooppera avasi 1869 Ringstrassen loistorakennusten sarjan; pommitukset tuhosivat sen 1945, ja talo avattiin uudelleen 1955. Nykyään siellä on yli 350 esitystä vuodessa.

### Madrid

**#1 [B]** 'ainoa Espanjan katedraali, jonka paavi on vihkinyt' ei löydy yhdestäkään lähteestä.
- Nyt L: Almudenan katedraali (1883–1993) on ainoa Espanjan katedraali, jonka paavi on vihkinyt.
- Nyt S: Almudenan katedraalin rakentaminen alkoi 1883 markiisi Francisco de Cubasin suunnitelmilla ja valmistui vasta 1993; paavi Johannes Paavali II vihki sen 15. kesäkuuta 1993 ainoana Espanjan katedraalina, ja se on käännetty poikkeuksellisesti pohjois–eteläsuuntaan kuninkaanlinnaa vastapäätä.
- Ehd. L: Almudenan katedraalin (1883–1993) vihki paavi Johannes Paavali II 1993.
- Ehd. S: Almudenan katedraalin rakentaminen alkoi 1883 markiisi Francisco de Cubasin suunnitelmilla ja valmistui vasta 1993; paavi Johannes Paavali II vihki sen 15. kesäkuuta 1993, ja se on käännetty poikkeuksellisesti pohjois–eteläsuuntaan kuninkaanlinnaa vastapäätä.

**#9 [A]** kuva on otettu talon katolta, teksti kuvaa taloa.
- Nyt L: Círculo de Bellas Artes, vuonna 1880 perustetun kulttuurijärjestön talo, valmistui 1926.
- Nyt S: Círculo de Bellas Artes on vuonna 1880 perustettu kulttuurijärjestö, jonka Antonio Palaciosin suunnittelema talo valmistui 1926.
- Ehd. L: Círculo de Bellas Artesin katolta näkee Madridin keskustan; vuonna 1880 perustetun kulttuurijärjestön talo valmistui 1926.
- Ehd. S: Círculo de Bellas Artes on vuonna 1880 perustettu kulttuurijärjestö, jonka Antonio Palaciosin suunnittelema talo valmistui 1926. Talon katolta avautuu näkymä Madridin keskustaan.

**#11 [A]** Cerro del Tío Pío on tekokukkula (1980-luvun puisto slummin raunioiden päällä), ei luonnollinen laidan kukkula.
- Nyt L: Madrid on rakennettu Kastilian ylätasangolle, ja Cerro del Tío Pío on yksi laidan kukkuloista.
- Nyt S: Madrid on rakennettu keskelle Kastilian ylätasankoa noin 650 metrin korkeuteen, ja Cerro del Tío Pío on yksi kaupungin laidan kukkuloista.
- Ehd. L: Cerro del Tío Pío on 1980-luvulla slummin raunioille rakennettu puisto, jonka kukkuloilta näkee Madridin.
- Ehd. S: Cerro del Tío Pío eli Parque de las Siete Tetas rakennettiin 1980-luvulla entisen slummin raunioiden päälle, ja sen kukkuloilta näkee yli Madridin Kastilian ylätasangolle.

**#12 [A]** köysirata suljettu vuodesta 2022/2023 (uusitaan), teksti preesensissä.
- Nyt L: Madridin köysiradan siniset gondolit kulkevat puiden ja kattojen yllä Casa de Campon suuntaan.
- Nyt S: Madridin teleférico avattiin 1969, ja sen noin 2,5 kilometrin rata yhdisti Parque del Oesten Casa de Campon puistoon. Gondolit kulkevat noin 40 metrin korkeudessa.
- Ehd. L: Madridin köysiradan siniset gondolit kulkivat puiden ja kattojen yllä Casa de Campon suuntaan.
- Ehd. S: Madridin teleférico avattiin 1969, ja sen noin 2,5 kilometrin rata yhdisti Parque del Oesten Casa de Campon puistoon. Gondolit kulkivat noin 40 metrin korkeudessa; rata on suljettu uusittavaksi.

### Berliini

**#7 [C]** 'kääntöympyrä' epätarkka: vähimmäispiha 5,34 × 5,34 m, jotta paloruisku mahtui kääntymään.
- Nyt L: Berliinin vuokrakasarmien sisäpihojen kokoon vaikutti paloruiskun kääntöympyrä.
- Nyt S: Vuoden 1853 rakennusmääräykset vaativat pihalle vähintään noin 5,3 × 5,3 metrin tilan, jotta paloruisku mahtui kääntymään.
- Ehd. L: Berliinin vuokrakasarmien sisäpihojen kokoon vaikutti paloruiskun kääntötila.
- Ehd. S: Vuoden 1853 rakennusmääräykset vaativat pihalle vähintään noin 5,3 × 5,3 metrin tilan, jotta paloruisku mahtui kääntymään.

**#8 [A]** kuva (Berlin Panorama von der Siegessäule) on näkymä pylväältä, teksti kuvaa pylvästä.
- Nyt L: Voitonpylväs vihittiin 1873 muistona voitosta Tanskasta, Itävallasta ja Ranskasta.
- Nyt S: Voitonpylväs vihittiin 2. syyskuuta 1873, jolloin sen alkuperäinen aihe eli voitto Tanskasta oli jo täydentynyt voitoilla Itävallasta ja Ranskasta.
- Ehd. L: Siegessäulen tasanteelta otetussa panoraamassa näkyy kaupunki; pylväs vihittiin 1873 voitoista Tanskasta, Itävallasta ja Ranskasta.
- Ehd. S: Voitonpylväs vihittiin 2. syyskuuta 1873, jolloin sen alkuperäinen aihe eli voitto Tanskasta oli jo täydentynyt voitoilla Itävallasta ja Ranskasta. Kuva on otettu pylvään näköalatasolta.

**#9 [C]** kuvassa Humboldt Forum; julkisivun uudelleenrakennus voi tulla esiin.
- Nyt L: Berliinin kaupunkilinna, hallitsijoiden asunto 1443–1918, purettiin 1950 ja rakennettiin uudelleen.
- Nyt S: Berliinin kaupunkilinna oli hallitsijoiden pääasunto 1443–1918, Itä-Saksa purki sen maan tasalle 1950, ja julkisivu rakennettiin uudelleen Humboldt Forumia varten.
- Ehd. L: Humboldt Forumin julkisivu on 2020 valmistunut jäljennös Berliinin kaupunkilinnasta, joka purettiin 1950.
- Ehd. S: Berliinin kaupunkilinna oli hallitsijoiden pääasunto 1443–1918, Itä-Saksa purki sen maan tasalle 1950, ja julkisivu rakennettiin uudelleen 2013–2020 Humboldt Forumia varten.

**#10 [A]** kuvassa Berliinin tuomiokirkko (Berliner Dom), teksti Vanhasta kansallisgalleriasta.
- Nyt L: Vanha kansallisgalleria (1862–1876) kuuluu Museosaareen, Unescon maailmanperintöön vuodesta 1999.
- Nyt S: Vanha kansallisgalleria rakennettiin 1862–1876, ja koko Museosaari on ollut Unescon maailmanperintökohde vuodesta 1999.
- Ehd. L: Berliinin tuomiokirkko (1905) kuuluu Museosaareen, Unescon maailmanperintöön vuodesta 1999.
- Ehd. S: Berliinin tuomiokirkko valmistui 1905, ja koko Museosaari on ollut Unescon maailmanperintökohde vuodesta 1999.

### Venetsia

**#1 [B]** julkisivun hevoset ovat kopioita (alkuperäiset sisällä vuodesta 1974).
- Nyt L: Markuksenkirkon neljä pronssihevosta tuotiin Konstantinopolista 1204.
- Nyt S: Markuksenkirkon pääportaalin yllä seisovat neljä pronssihevosta tuotiin Konstantinopolista 1204, ja kampanilen nykyinen torni on vuoden 1902 sortuman jälkeinen jälleenrakennus.
- Ehd. L: Markuksenkirkon pronssihevoset tuotiin Konstantinopolista, ja julkisivulla ovat nykyään kopiot.
- Ehd. S: Markuksenkirkon pääportaalin yllä seisovat hevoset ovat kopioita; Konstantinopolista 1204 tuodut alkuperäiset ovat sisällä vuodesta 1974. Kampanilen nykyinen torni on vuoden 1902 sortuman jälkeinen jälleenrakennus.

**#2 [A]** Rialton silta on Istrian kiveä, ei marmoria.
- Nyt L: Rialton silta valmistui 1591 yhtenä marmorikaarena, ja sen päällä kulkee kaksi myymäläriviä.
- Nyt S: Rialton silta valmistui 1591 Antonio da Ponten suunnittelemana yhtenä marmorikaarena, ja sen päällä kulkee kaksi myymäläriviä.
- Ehd. L: Rialton silta valmistui 1591 yhtenä kivikaarena, ja sen päällä kulkee kaksi myymäläriviä.
- Ehd. S: Rialton silta valmistui 1591 Antonio da Ponten suunnittelemana yhtenä kivikaarena, ja sen päällä kulkee kaksi myymäläriviä.

**#3 [B]** 'yli miljoona puupaalua' epävarma (it.wikipedia: n. 100 000).
- Nyt L: Santa Maria della Saluten kahdeksankulmainen runko lepää yli miljoonan puupaalun varassa.
- Nyt S: Santa Maria della Salute rakennettiin kiitokseksi vuoden 1630 ruton päättymisestä, ja sen kahdeksankulmainen runko lepää yli miljoonan puupaalun varassa.
- Ehd. L: Santa Maria della Saluten kahdeksankulmainen runko lepää puupaalujen varassa.
- Ehd. S: Santa Maria della Salute rakennettiin kiitokseksi vuoden 1630 ruton päättymisestä, ja sen kahdeksankulmainen runko lepää puupaalujen varassa.

**#4 [C]** 'maailman ensimmäinen ghetto' lähteistä vain 'ghetto-sanan lähtöpaikka'.
- Nyt L: Cannaregioon perustettiin 1516 Venetsian ghetto, jota pidetään maailman ensimmäisenä.
- Nyt S: Venetsian tasavalta määräsi 1516 kaupungin juutalaiset asumaan pienelle alueelle Cannaregiossa. Rajoitus kumottiin 1797.
- Ehd. L: Cannaregioon perustettiin 1516 Venetsian ghetto, josta sana ghetto on lähtöisin.
- Ehd. S: Venetsian tasavalta määräsi 1516 kaupungin juutalaiset asumaan pienelle alueelle Cannaregiossa. Rajoitus kumottiin 1797.

**#7 [C]** lähteet: 'yli 400' siltaa.
- Nyt L: Venetsia rakentuu noin 118 saarelle, joita yhdistää noin 400 siltaa.
- Nyt S: Saaret sijaitsevat matalassa laguunissa kanavien erottamina. Venetsia ja sen laguuni on Unescon maailmanperintökohde vuodesta 1987.
- Ehd. L: Venetsia rakentuu noin 118 saarelle, joita yhdistää yli 400 siltaa.
- Ehd. S: Saaret sijaitsevat matalassa laguunissa kanavien erottamina. Venetsia ja sen laguuni on Unescon maailmanperintökohde vuodesta 1987.

### Tukholma

**#1 [B]** 1754 = käyttöönotto (virallisesti valmis 1771); 'suurimpia yhä virkakäytössä olevia' ei löydy sanatarkasti.
- Nyt L: Tukholman kuninkaanlinna (1754) on yli 600 huoneellaan Euroopan suurimpia yhä virkakäytössä olevia.
- Nyt S: Tukholman kuninkaanlinna valmistui 1754 palaneen Tre Kronorin paikalle, ja yli 600 huoneellaan se on Euroopan suurimpia yhä virkakäytössä olevia kuninkaanlinnoja.
- Ehd. L: Tukholman kuninkaanlinna (1754) on yli 600 huoneellaan yksi Euroopan suurimmista.
- Ehd. S: Tukholman kuninkaanlinna otettiin käyttöön 1754 palaneen Tre Kronorin paikalle, ja yli 600 huoneellaan se on yksi Euroopan suurimmista kuninkaanlinnoista.

**#2 [A]** Nobel-illallinen syödään Sinisessä salissa, ei tanssita juhlasalissa; 'lähes' kahdeksan miljoonaa tiiltä.
- Nyt L: Tukholman kaupungintalo (1923) tornin huipulla kimaltaa kolme kruunua Nobel-illallisten yllä.
- Nyt S: Tukholman kaupungintalo valmistui 1923 kahdeksasta miljoonasta tiilestä, ja sen 106-metrisen tornin huipulla kimaltavat kolme kruunua — juhlasalissa tanssitaan Nobel-illalliset.
- Ehd. L: Tukholman kaupungintalo (1923) tornin huipulla kimaltaa kolme kruunua; Sinisessä salissa syödään Nobel-illallinen.
- Ehd. S: Tukholman kaupungintalo valmistui 1923 lähes kahdeksasta miljoonasta tiilestä, ja sen 106-metrisen tornin huipulla kimaltavat kolme kruunua — Sinisessä salissa syödään Nobel-illallinen.

### Ateena

**#6 [C]** 3,6 milj. on pääkaupunkiseutu, ei kaupunkialue (urban area 3,06 milj.).
- Nyt L: Ateenan kaupunkialueella asuu yli 3,6 miljoonaa, vaikka varsinaisessa kunnassa vain runsaat 640 000.
- Nyt S: Ateenan kaupunkialueella asuu yli 3,6 miljoonaa ihmistä, vaikka varsinaisessa Ateenan kunnassa vain runsaat 640 000.
- Ehd. L: Ateenan pääkaupunkiseudulla asuu yli 3,6 miljoonaa, vaikka varsinaisessa kunnassa vain runsaat 640 000.
- Ehd. S: Ateenan pääkaupunkiseudulla asuu yli 3,6 miljoonaa ihmistä, vaikka varsinaisessa Ateenan kunnassa vain runsaat 640 000.

**#7 [B]** 'Manner-Euroopan kuumin kaupunki' ei löydy mistään lähteestä.
- Nyt L: Ateena, Manner-Euroopan kuumin kaupunki, nimitti ensimmäisenä eurooppalaisena virkamiehen helteille.
- Nyt S: Ateenaa on sanottu Manner-Euroopan kuumimmaksi kaupungiksi, ja se nimitti ensimmäisenä eurooppalaisena kaupunkina erillisen virkamiehen hoitamaan hellejaksoja.
- Ehd. L: Ateena nimitti ensimmäisenä eurooppalaisena kaupunkina virkamiehen hoitamaan hellejaksoja.
- Ehd. S: Ateena nimitti 2021 ensimmäisenä eurooppalaisena kaupunkina erillisen virkamiehen hoitamaan hellejaksoja.

### Amsterdam

**#2 [B]** lähteet ristiriidassa: mforamsterdam: kruunu ei ole Maximilianin; 'lahjoittama' ei kestä.
- Nyt L: Westerkerkin torni (1638), Amsterdamin korkein, kantaa keisari Maximilianin lahjoittamaa kruunua.
- Nyt S: Westerkerkin torni valmistui 1638 ja on Amsterdamin korkein kirkontorni — sen huipulla kimaltaa keisari Maximilianin kaupungille myöntämä kruunu.
- Ehd. L: Westerkerkin torni (1638), Amsterdamin korkein, kantaa keisarillista kruunua.
- Ehd. S: Westerkerkin torni valmistui 1638 ja on Amsterdamin korkein kirkontorni — sen huipulla kimaltaa keisarillinen kruunu.

**#8 [B]** nimeäminen Maksimilian I:n mukaan varmistamaton (en-wiki merkitsee lähteen epäluotettavaksi).
- Nyt L: Keizersgracht, keskustan levein kanava, nimettiin keisari Maksimilian I:n mukaan.
- Nyt S: Keizersgracht nimettiin keisari Maksimilian I:n mukaan ja on keskustan levein kanava; sen risteävä Reguliersgracht kaivettiin vuonna 1658.
- Ehd. L: Keizersgracht eli keisarinkanava on keskustan levein kanava.
- Ehd. S: Keizersgracht eli keisarinkanava on keskustan levein kanava; sen risteävä Reguliersgracht kaivettiin vuonna 1658.

**#9 [B]** 'vierailluin valtakunnanmonumentti' vain en-wikissä ilman viitettä.
- Nyt L: Cuypersin Amsterdam Centraal (1889) on Alankomaiden vierailluin valtakunnanmonumentti.
- Nyt S: Pierre Cuypersin suunnittelema Amsterdam Centraal avattiin vuonna 1889, ja se on Alankomaiden vierailluin valtakunnanmonumentti.
- Ehd. L: Cuypersin johdolla suunniteltu Amsterdam Centraal (1889) on Alankomaiden toiseksi vilkkain asema.
- Ehd. S: Pierre Cuypersin johdolla suunniteltu Amsterdam Centraal avattiin vuonna 1889, ja se on Alankomaiden toiseksi vilkkain rautatieasema Utrechtin jälkeen.

### Istanbul

**#3 [C]** torni oli Galatan linnoituksen pääkohde, vartiotorni toissijainen.
- Nyt L: Genovalaiset rakensivat Galatan tornin 1348 vartiotorniksi Kultaisen sarven pohjoisrannalle.
- Nyt S: Genovalaiset rakensivat Galatan tornin 1348 siirtokuntansa vartiotorniksi, ja se hallitsi Kultaisen sarven pohjoisrantaa vuosisatoja.
- Ehd. L: Genovalaiset rakensivat Galatan tornin 1348 siirtokuntansa linnoituksen kärkeen Kultaisen sarven pohjoisrannalle.
- Ehd. S: Genovalaiset rakensivat Galatan tornin 1348 siirtokuntansa linnoituksen pääkohteeksi, ja se hallitsi Kultaisen sarven pohjoisrantaa vuosisatoja.

**#6 [C]** sama 'vartiotorni' kuin #3.
- Nyt L: Galatan tornin tasanteelta näkyvät Kultainen sarvi, Hagia Sofia ja Sininen moskeija.
- Nyt S: Genovalaiset rakensivat Galatan tornin vartiotorniksi vuonna 1348. Sen huipulta avautuu näkymä Kultaiselle sarvelle, Bosporille ja Istanbulin historialliselle niemimaalle.
- Ehd. L: Galatan tornin tasanteelta näkyvät Kultainen sarvi, Hagia Sofia ja Sininen moskeija.
- Ehd. S: Genovalaiset rakensivat Galatan tornin 1348 siirtokuntansa linnoituksen torniksi. Sen huipulta avautuu näkymä Kultaiselle sarvelle, Bosporille ja Istanbulin historialliselle niemimaalle.

**#9 [A]** lyhyt kuvateksti puuttuu.
- Nyt L: undefined
- Nyt S: Süleymaniyen moskeija seisoo vanhankaupungin kolmannen kukkulan laella Kultaisen sarven yllä.
- Ehd. L: Süleymaniyen moskeija kohoaa vanhankaupungin kolmannella kukkulalla Kultaisen sarven yllä.
- Ehd. S: Süleymaniyen moskeija seisoo vanhankaupungin kolmannen kukkulan laella Kultaisen sarven yllä.

**#10 [B]** 'halvin näköalapaikka' todentamaton.
- Nyt L: Lautta on Istanbulissa tavallinen kulkuneuvo ja kaupungin halvin näköalapaikka.
- Nyt S: Lautta on Istanbulissa yhtä tavallinen kulkuneuvo kuin raitiovaunu ja samalla halvin näköalapaikka, jonka kaupunki tarjoaa.
- Ehd. L: Lautta on Istanbulissa tavallinen kulkuneuvo ja edullinen tapa nähdä kaupunki mereltä.
- Ehd. S: Lautta on Istanbulissa yhtä tavallinen kulkuneuvo kuin raitiovaunu, ja matka tarjoaa edullisen näkymän kaupunkiin mereltä.

**#11 [A]** kuvassa Uusi moskeija ja Galatan silta, teksti balık ekmek -veneistä (todennäköisesti vanhentunut).
- Nyt L: Eminönün rantatorilla myydään balık ekmekiä veneistä, joissa kala kypsennetään laiturin kupeessa.
- Nyt S: Eminönün rantatorilla myydään balık ekmekiä suoraan veneistä, joissa kala kypsennetään laiturin kupeessa.
- Ehd. L: Eminönün rannalta näkyvät Uusi moskeija ja Galatan silta.
- Ehd. S: Eminönün rannassa kohoaa Uusi moskeija eli Yeni Cami, ja Galatan silta yhdistää rannan Kultaisen sarven toiselle puolelle.

### Dublin

**#1 [B]** 'ensimmäisenä jalankulkusiltana' ei vahvistu (Liffeyn ainoa jalankulkusilta 2000 asti).
- Nyt L: Ha'penny Bridge avattiin 1816 Liffeyn ensimmäisenä jalankulkusiltana puolen pennyn tiemaksulla.
- Nyt S: Ha’penny Bridge avattiin 1816 Liffeyn ensimmäisenä jalankulkusiltana, sen valurautainen 43 metrin kaari valettiin Coalbrookdalessa, ja nimensä silta sai puolen pennyn tiemaksusta, jota perittiin vuoteen 1919.
- Ehd. L: Ha'penny Bridge avattiin 1816 jalankulkusiltana, ja nimensä silta sai puolen pennyn tiemaksusta.
- Ehd. S: Ha’penny Bridge avattiin 1816, sen valurautainen 43 metrin kaari valettiin Coalbrookdalessa, ja nimensä silta sai puolen pennyn tiemaksusta, jota perittiin vuoteen 1919.

**#2 [A]** valmistumisvuosi 1854 (kaksi lähdettä), ei 1853.
- Nyt L: Trinity Collegen kellotorni (1853) on graniittia ja Portlandin kiveä, juurellaan neljä veistosta.
- Nyt S: Trinity Collegen kellotorni valmistui 1853 Charles Lanyonin suunnitelmien mukaan: 30,5 metriä korkean tornin alaosa on Wicklowin sinertävää graniittia ja kupoli Portlandin kiveä, ja kellohuoneen juurella istuu neljä veistosta — jumaluusoppi, tiede, lääketiede ja laki.
- Ehd. L: Trinity Collegen kellotorni (1854) on graniittia ja Portlandin kiveä, juurellaan neljä veistosta.
- Ehd. S: Trinity Collegen kellotorni valmistui 1854 Charles Lanyonin suunnitelmien mukaan: 30,5 metriä korkean tornin alaosa on Wicklowin sinertävää graniittia ja kupoli Portlandin kiveä, ja kellohuoneen juurella istuu neljä veistosta — jumaluusoppi, tiede, lääketiede ja laki.

**#3 [A]** 1191 on perustamisvuosi, ei nykyrakennuksen; 'suurin kirkko' → 'suurin katedraali'.
- Nyt L: Pyhän Patrickin katedraali (1191) on Irlannin suurin kirkko, torninhuippu nostettiin vasta 1749.
- Nyt S: Pyhän Patrickin katedraali perustettiin 1191, ja ulkoa 91 metriä pitkänä se on Irlannin suurin kirkko — graniittinen torninhuippu nostettiin tornin päälle vasta 1749 George Semplen suunnitelmien mukaan.
- Ehd. L: Pyhän Patrickin katedraali (n. 1220–1260) on Irlannin suurin katedraali, torninhuippu nostettiin vasta 1749.
- Ehd. S: Pyhän Patrickin katedraali perustettiin 1191, nykyinen rakennus on n. 1220–1260, ja ulkoa 91 metriä pitkänä se on Irlannin suurin katedraali — graniittinen torninhuippu nostettiin tornin päälle vasta 1749 George Semplen suunnitelmien mukaan.

**#9 [A]** 1902 on aloitusvuosi (valmis 1904/05); 'ensimmäinen' → 'ensimmäisiä'; kuva on näköalakuva Guinness-tornista.
- Nyt L: Guinnessin panimon käymislaitos (1902) oli Irlannin ensimmäinen teräsrunkoinen kerrostalo.
- Nyt S: Guinnessin panimon käymislaitos rakennettiin vuonna 1902 ja oli Irlannin ensimmäinen monikerroksinen teräsrunkoinen rakennus.
- Ehd. L: Guinness Storehousen käymislaitos oli Irlannin ensimmäisiä monikerroksisia teräsrunkoisia rakennuksia.
- Ehd. S: Guinnessin panimon käymislaitos rakennettiin 1902–1904 ja oli yksi Irlannin ensimmäisistä monikerroksisista teräsrunkoisista rakennuksista. Kuva on otettu Guinness Storehousen näköalatasanteelta.

**#10 [C]** 'nyt korkeimman oikeuden talo' yksinkertaistus (talossa myös High Court, Court of Appeal ym.).
- Nyt L: Four Courts sai nimensä neljästä alkuperäisestä oikeusistuimestaan, nyt korkeimman oikeuden talo.
- Nyt S: Four Courts sai nimensä neljästä alkuperäisestä ylimmästä oikeusistuimestaan, ja se on yhä Irlannin korkeimman oikeuden istuntopaikka.
- Ehd. L: Four Courts sai nimensä neljästä alkuperäisestä oikeusistuimestaan, ja talossa toimii yhä Irlannin tuomioistuimia.
- Ehd. S: Four Courts sai nimensä neljästä alkuperäisestä ylimmästä oikeusistuimestaan, ja talossa toimii yhä Irlannin tuomioistuimia.

**#11 [A]** kuva on Liffeyn ranta auringonlaskussa, tullitaloa ei näy (sama aihe kuin #8).
- Nyt L: Gandonin tullitalo rakennettiin 1700-luvun lopulla suolle, jota kauppiaat pitivät kelvottomana.
- Nyt S: James Gandonin suunnittelema tullitalo rakennettiin 1700-luvun lopulla suolle, jota kaupungin kauppiaat pitivät kelvottomana paikkana.
- Ehd. L: Liffey virtaa Dublinin halki Dublin Bayhin ja jakaa kaupungin pohjois- ja eteläpuoleen.
- Ehd. S: Liffey-joki virtaa Dublinin halki Dublin Bayhin ja jakaa kaupungin pohjois- ja eteläpuoleen.

### Edinburgh

**#3 [C]** 'rakastettiin rauniona' on tulkinta, lempinimi 'Edinburghin häpeä' lähteistetty.
- Nyt L: Calton Hillin kansallismonumentti jäi kesken 1829 ja rakastettiin rauniona nimestään huolimatta.
- Nyt S: Calton Hillin kansallismonumentti jäi kesken 1829, kun rahat loppuivat kahdentoista pylvään jälkeen — ”Edinburghin häpeäksi” ristitystä raunioista tuli rakastettu maamerkki.
- Ehd. L: Calton Hillin kansallismonumentti jäi kesken 1829, ja keskeneräinen maamerkki tunnetaan lempinimellä Edinburghin häpeä.
- Ehd. S: Calton Hillin kansallismonumentti jäi kesken 1829, kun rahat loppuivat kahdentoista pylvään jälkeen — ”Edinburghin häpeäksi” kutsutusta raunioista tuli tunnettu maamerkki.

**#9 [A]** lyhyt kuvateksti puuttuu.
- Nyt L: undefined
- Nyt S: Uusikaupunki rakennettiin vuodesta 1767 noin 1850-luvulle asti James Craigin ruutukaavan mukaan.
- Ehd. L: Edinburghin linnan muureilta näkyy uusikaupunki, jonka rakentaminen alkoi 1767.
- Ehd. S: Uusikaupunki rakennettiin vuodesta 1767 noin 1850-luvulle asti James Craigin ruutukaavan mukaan.

### Marseille

**#2 [A]** valmistumisvuosi: työt päättyivät 1893 (1896 = basilikaksi korotus); peruskiven laski Louis-Napoléon, ei vielä keisari.
- Nyt L: Marseillen La Majorin katedraalin peruskiven laski Napoleon III 1852, valmistuen 1896.
- Nyt S: Marseillen La Majorin katedraalin peruskiven laski keisari Napoleon III vuonna 1852; bysanttilaista ja romaanista tyyliä yhdistelevä kirkko otettiin käyttöön 1893 ja valmistui 1896.
- Ehd. L: Marseillen La Majorin katedraalin peruskiven laski Louis-Napoléon 1852, ja työt päättyivät 1893.
- Ehd. S: Marseillen La Majorin katedraalin peruskiven laski 26.9.1852 prinssi-presidentti Louis-Napoléon, myöhempi Napoleon III; bysanttilaista ja romaanista tyyliä yhdistelevä kirkko otettiin käyttöön 1893 ja korotettiin basilikaksi 1896.

### Lissabon

**#1 [B]** 'korkeimmalla kukkulalla' ei vahvistu lähteistä.
- Nyt L: São Jorgen linna on seisonut Lissabonin korkeimmalla kukkulalla maurien ajoista, valloitettu 1147.
- Nyt S: São Jorgen linna on seisonut Lissabonin korkeimmalla kukkulalla maurien 1000-luvulta asti, Afonso Henriques valtasi kaupungin 1147, ja linna oli kuninkaan asuntona 1500-luvun alkuun saakka; sen juurella levittäytyy Alfama, jonka kujia kiipeää raitiolinja 28.
- Ehd. L: São Jorgen linna on seisonut Lissabonin kukkulalla maurien ajoista, valloitettu 1147.
- Ehd. S: São Jorgen linna on seisonut Lissabonin kukkulalla maurien 1000-luvulta asti, Afonso Henriques valtasi kaupungin 1147, ja linna oli kuninkaan asuntona 1500-luvun alkuun saakka; sen juurella levittäytyy Alfama, jonka kujia kiipeää raitiolinja 28.

**#2 [C]** tykkien määrä: en-wiki 17, pt-wiki 16 reikää.
- Nyt L: Belémin torni (1519) vartioi Tejon suuta, ja sen bastioniin mahtui seitsemäntoista tykkiä.
- Nyt S: Belémin torni valmistui 1519 vartioimaan Tejon suuta: nelikerroksinen torni nousee 30 metriin, ja sen bastionin ampuma-aukoista mahtui tulittamaan seitsemäntoista tykkiä.
- Ehd. L: Belémin torni (1519) vartioi Tejon suuta, ja sen bastioniin mahtui noin seitsemäntoista tykkiä.
- Ehd. S: Belémin torni valmistui 1519 vartioimaan Tejon suuta: nelikerroksinen torni nousee 30 metriin, ja sen bastionin ampuma-aukoista mahtui tulittamaan noin seitsemäntoista tykkiä.

**#5 [A]** kuvateksti (pombalinen puuhäkki) ei vastaa kuvaa (katot, linna, silta); häkkifakta sopii Kauppatori-kuvaan #4.
- Nyt L: Alakaupungin taloihin rakennettiin joustava puuhäkki, joka tärisee muttei kaadu maanjäristyksessä.
- Nyt S: Alakaupungin talojen seiniin, lattioihin ja kattoihin rakennettiin joustava puuhäkki, joka tärisee muttei kaadu, ja epävakaan maan alle lyötiin metsällinen paaluja.
- Ehd. L: Lissabonin terrakottakattojen yllä kohoaa São Jorgen linnan kukkula, ja kaukana siintää 25 de Abril -silta.
- Ehd. S: Kuvassa näkyvät Lissabonin terrakottakatot, vasemmalla São Jorgen linnan kukkula ja kaukana Tejon yli kulkeva 25 de Abril -silta.

**#8 [A]** kuvateksti (metro) ei vastaa kuvaa (keskustan katukuva, silta kaukana); metrofakta ok mutta väärä kuva.
- Nyt L: Lissabonin metro avattiin 1959 Portugalin ensimmäisenä, nyt neljä linjaa ja 56 asemaa.
- Nyt S: Lissabonin metro avattiin joulukuussa 1959 Portugalin ensimmäisenä, ja siinä on neljä linjaa ja 56 asemaa.
- Ehd. L: Lissabonin keskustan kadut laskeutuvat kohti Tejoa, ja kaukana vasemmalla näkyy 25 de Abril -silta.
- Ehd. S: Lissabonin keskustan kadut laskeutuvat kohti Tejoa; kaukana vasemmalla erottuu 25 de Abril -silta.

**#9 [B]** kuva on yönäkymä keskustan ja sillan yli (Alfama ei erotu); 'tiheässä fado-baareja' tarkistamatta.
- Nyt L: São Jorgen linnan ja Tejon väliin leviää Alfama, jonka kujilla on tiheässä fado-baareja.
- Nyt S: São Jorgen linnan kukkulan ja Tejo-joen väliin leviää Alfama, jonka kujilla on poikkeuksellisen tiheässä fado-baareja ja ravintoloita.
- Ehd. L: Linnan kukkulalta näkee Lissabonin keskustan valot ja Tejon sinisenä hetkenä.
- Ehd. S: Näkymä São Jorgen linnan kukkulalta Lissabonin keskustan ja Tejon yli sinisenä hetkenä.

### Barcelona

**#1 [A]** 'nousee' vanhentunut: Jeesuksen torni valmis 2026; Gaudí tuli vetäjäksi 1883, ei 1882.
- Nyt L: Sagrada Famílian rakentaminen alkoi 1882, Gaudín johtaman työn Jeesuksen torni nousee 172,5 metriin.
- Nyt S: Sagrada Famílian rakentaminen alkoi 19. maaliskuuta 1882 ja Gaudí johti työtä 1883 kuolemaansa 1926 asti — kahdeksastatoista tornista korkein eli Jeesuksen torni nousee 172,5 metriin, ja kirkko vihittiin käyttöön 2010.
- Ehd. L: Sagrada Famílian rakentaminen alkoi 1882; Jeesuksen torni valmistui 2026 ja on 172,5 metriä korkea.
- Ehd. S: Sagrada Famílian rakentaminen alkoi 19. maaliskuuta 1882, ja Gaudí otti työn johtoonsa 1883 ja johti sitä kuolemaansa 1926 asti — kahdeksastatoista tornista korkein eli Jeesuksen torni valmistui 2026 ja on 172,5 metriä korkea; kirkko vihittiin käyttöön 2010.

**#8 [A]** kuva on Eixamplesta (Rambla de Catalunya), teksti Ciutat Vellasta.
- Nyt L: Barcelona pysyi 1850-luvulle asti muurien sisällä, ja Ciutat Vella on yhä sen alkuperäinen ydin.
- Nyt S: Barcelona pysyi 1850-luvulle asti kaupunginmuurien sisällä, ja Ciutat Vella on yhä sen alkuperäinen tiiviisti rakennettu ydin.
- Ehd. L: Barcelonan muurit purettiin 1850-luvulla, ja Eixamplen ruudukko kasvoi vanhan kaupungin ympärille.
- Ehd. S: Barcelona pysyi 1850-luvulle asti kaupunginmuurien sisällä; muurien purku määrättiin 1854, ja Eixamplen ruudukko rakennettiin vanhan kaupungin ympärille.

### Granada

**#2 [A]** 'valmistui 1727–1764' väärä muoto (välillä rakennettiin); 'perustettiin 1506' vs rakentaminen 1516 lähteet eri mieltä.
- Nyt L: Granadan kartusiaaniluostari La Cartuja perustettiin 1506, sakaristo valmistui 1727–1764.
- Nyt S: Granadan kartusiaaniluostari La Cartuja perustettiin 1506 ja rakentaminen alkoi kymmenen vuotta myöhemmin jatkuen kolmisensataa vuotta; sakaristo tehtiin 1727–1764 ja on espanjalaisen churriguerismin mestariteoksia.
- Ehd. L: Granadan kartusiaaniluostari La Cartuja rakennettiin 1500-luvulta kolmisensataa vuotta; sakaristo tehtiin 1727–1764.
- Ehd. S: Granadan kartusiaaniluostarin rakentaminen alkoi 1500-luvun alussa ja jatkui kolmisensataa vuotta; sakaristo rakennettiin 1727–1764 ja on espanjalaisen churriguerismin mestariteoksia.

**#3 [B]** 'ainoa nasridiajalta säilynyt' liian laaja; vain ainoa säilynyt nasridiajan funduq/majatalo.
- Nyt L: Corral del Carbón on 1300-luvun funduq eli kauppiaiden majatalo, ainoa nasridiajalta säilynyt.
- Nyt S: Corral del Carbón on 1300-luvun alkupuolelta säilynyt funduq eli kauppiaiden majatalo ja viljavarasto — ainoa nasridiajalta säilynyt lajissaan koko Iberian niemimaalla.
- Ehd. L: Corral del Carbón on 1300-luvun funduq eli kauppiaiden majatalo, Granadan ainoa säilynyt nasridiajan majatalo.
- Ehd. S: Corral del Carbón on 1300-luvun alkupuolelta säilynyt funduq eli kauppiaiden majatalo ja viljavarasto — ainoa nasridiajalta säilynyt lajissaan.

### Budapest

**#1 [B]** 96 m on koko rakennuksen korkeus (en-wiki), ei kupolin (hu-wiki leipäteksti 93 m).
- Nyt L: Unkarin parlamenttitalo valmistui 1904, sen kupoli nousee 96 metriin viitaten vuoteen 896.
- Nyt S: Unkarin parlamenttitalo valmistui 1904 Imre Steindlin piirustuksin: uusgoottilainen palatsi on 268 metriä pitkä, ja sen kupoli nousee tasan 96 metriin — luku muistuttaa vuoden 896 maahantulosta.
- Ehd. L: Unkarin parlamenttitalo valmistui 1904, ja se on 96 metriä korkea viitaten vuoteen 896.
- Ehd. S: Unkarin parlamenttitalo valmistui 1904 Imre Steindlin piirustuksin: uusgoottilainen palatsi on 268 metriä pitkä ja 96 metriä korkea — luku viittaa vuoden 896 maahantuloon.

**#2 [C]** 'ensimmäinen pysyvä silta Tonavan yli' → Budapestissa/Unkarissa.
- Nyt L: Széchenyin ketjusilta valmistui 1849 ensimmäisenä pysyvänä siltana Tonavan yli.
- Nyt S: Széchenyin ketjusilta valmistui 1849 ensimmäisenä pysyvänä siltana Tonavan yli Budan ja Pestin välillä — kivileijonat ovat vartioineet sen päitä vuodesta 1852.
- Ehd. L: Széchenyin ketjusilta valmistui 1849 Budapestin ensimmäisenä pysyvänä siltana Tonavan yli.
- Ehd. S: Széchenyin ketjusilta valmistui 1849 ensimmäisenä pysyvänä siltana Tonavan yli Budan ja Pestin välillä — kivileijonat ovat vartioineet sen päitä vuodesta 1852.

**#3 [C]** seitsemän tornia = seitsemän heimon päämiestä.
- Nyt L: Kalastajanlinnakkeen seitsemän tornia muistuttaa heimoista; terassi valmistui 1902 kirkon viereen.
- Nyt S: Kalastajanlinnakkeen seitsemän suippotornia muistuttavat unkarilaisten seitsemästä heimosta — näköalaterassi valmistui 1902 Matthias-kirkon viereen, eikä se ole koskaan ollut puolustusrakennelma.
- Ehd. L: Kalastajanlinnakkeen seitsemän tornia muistuttaa unkarilaisheimojen päämiehistä; terassi valmistui 1902 kirkon viereen.
- Ehd. S: Kalastajanlinnakkeen seitsemän suippotornia muistuttavat unkarilaisten seitsemästä heimopäämiehestä — näköalaterassi valmistui 1902 Matthias-kirkon viereen, eikä se ole koskaan ollut puolustusrakennelma.

### Rooma

**#3 [B]** 'Rooman korkein rakennelma' ei vahvistu (basilika 'toiseksi korkein', kupoli 136,6 m).
- Nyt L: Pietarinkirkkoa rakennettiin 1506–1626, ja Michelangelon kupoli on yhä Rooman korkein rakennelma.
- Nyt S: Pietarinkirkkoa rakennettiin yli sata vuotta (1506–1626), ja Michelangelon kupoli on yhä Rooman korkein rakennelma.
- Ehd. L: Pietarinkirkkoa rakennettiin 1506–1626, ja Michelangelon kupoli nousee 136 metriin.
- Ehd. S: Pietarinkirkkoa rakennettiin yli sata vuotta (1506–1626), ja Michelangelon kupoli nousee 136 metriin.

**#9 [C]** kuva on näköala Castel Sant'Angelolta; teksti ei mainitse sitä.
- Nyt L: Rooma on kasattu kerroksittain: samassa korttelissa voi olla antiikin pylväs ja barokkikirkko.
- Nyt S: Rooma on kasattu kerroksittain, ja saman korttelin sisällä voi olla antiikin pylväs, keskiaikainen torni ja barokkikirkko.
- Ehd. L: Castel Sant'Angelon terassilta näkee Rooman katot ja kupolit.
- Ehd. S: Rooma on kasattu kerroksittain, ja saman korttelin sisällä voi olla antiikin pylväs, keskiaikainen torni ja barokkikirkko. Kuva on otettu Castel Sant'Angelolta.

### Krakova

**#1 [A]** viimeinen kruunajaiset Wawelissa 1734 (August III); 1764 pidettiin Varsovassa.
- Nyt L: Wawelin kukkulan katedraali vihittiin 1364, siellä kruunattiin kuninkaat vuoteen 1764 asti.
- Nyt S: Wawelin kukkula on jurakautista kalkkikiveä, ja sen päällä seisova katedraali vihittiin 1364 — siellä kruunattiin Puolan kuninkaat vuoteen 1764 asti.
- Ehd. L: Wawelin kukkulan katedraali vihittiin 1364, siellä kruunattiin kuninkaat vuoteen 1734 asti.
- Ehd. S: Wawelin kukkula on jurakautista kalkkikiveä, ja sen päällä seisova katedraali vihittiin 1364 — siellä kruunattiin Puolan kuninkaat vuoteen 1734 asti.

**#3 [C]** palo 1555, renessanssikunnostus 1556–1559.
- Nyt L: Sukiennice sai renessanssiasunsa 1555 palon jälkeen, irvinaamat reunustavat sen räystäslistaa.
- Nyt S: Sukiennice seisoo lähes neljän hehtaarin keskiaikaisen torin keskellä; renessanssiasunsa se sai 1555 palon jälkeen, ja kiviset irvinaamat reunustavat sen räystäslistaa.
- Ehd. L: Sukiennice sai renessanssiasunsa 1555 palon jälkeen vuosina 1556–1559, irvinaamat reunustavat sen räystäslistaa.
- Ehd. S: Sukiennice seisoo lähes neljän hehtaarin keskiaikaisen torin keskellä; renessanssiasunsa se sai 1555 palon jälkeen vuosina 1556–1559, ja kiviset irvinaamat reunustavat sen räystäslistaa.

**#9 [A]** kiellon antoi Pikku-Puolan aluevaltuusto (voimaan 1.9.2019), ei kaupunki.
- Nyt L: Krakovan laaksossa kivihiilen poltto pilasi talvi-ilmaa, kunnes kaupunki kielsi sen 2019.
- Nyt S: Krakova sijaitsee laaksossa, ja kivihiilen poltto teki talvi-ilmasta ajoittain Euroopan huonointa — kaupunki kielsi sen kotitalouksien lämmityksessä 2019.
- Ehd. L: Krakovan laaksossa kivihiilen poltto pilasi talvi-ilmaa, kunnes alueen kielto tuli voimaan 2019.
- Ehd. S: Krakova sijaitsee laaksossa, ja kivihiilen poltto teki talvi-ilmasta ajoittain Euroopan huonointa — Pikku-Puolan aluevaltuuston kielto kotitalouksien kivihiililämmitykselle tuli voimaan 2019.

### Varsova

**#2 [A]** KK 20.4x päätös: kuvateksti kertoo tuhon ja jälleenrakennuksen; rivi '1619, uudelleen 1984'.
- Nyt L: Varsovan kuninkaanlinna sai barokkiasunsa 1598–1619 ja koottiin uudelleen 1971–1984 tuhon jälkeen.
- Nyt S: Varsovan kuninkaanlinna sai barokkiasunsa 1598–1619, se tuhoutui syyskuussa 1944 ja koottiin uudelleen 1971–1984 vanhojen piirustusten mukaan — Sigismundin torni nousee 60 metriin ja tiilijulkisivu on 90 metriä pitkä.
- Ehd. L: Varsovan kuninkaanlinna valmistui 1619, tuhoutui 1944 ja rakennettiin uudelleen 1971–1984.
- Ehd. S: Varsovan kuninkaanlinnan barokkiasu valmistui 1619, saksalaiset tuhosivat sen syyskuussa 1944, ja se rakennettiin uudelleen 1971–1984 vanhojen piirustusten mukaan — Sigismundin torni nousee 60 metriin ja tiilijulkisivu on 90 metriä pitkä.

**#7 [B]** 1791 on Sejmin päätös; varsinainen liittäminen 1794.
- Nyt L: Praga oli Varsovan vastarannalla erillinen kaupunki ennen kuin se liitettiin Varsovaan 1791.
- Nyt S: Praga sai kaupunkioikeudet 1600-luvun puolivälissä ja liitettiin Varsovaan kaupunginosaksi vuonna 1791.
- Ehd. L: Praga oli Varsovan vastarannalla erillinen kaupunki, ennen kuin sen liittäminen Varsovaan päätettiin 1791.
- Ehd. S: Praga sai kaupunkioikeudet 1600-luvun puolivälissä, ja sen liittäminen Varsovaan päätettiin vuonna 1791.

**#8 [B]** 1764–1795 ei tue lähteitä (1764 = ostovuosi, lähteet 1772/1784–1795).
- Nyt L: Saaripalatsi valmistui 1689 kylpypaviljongiksi, muutettiin 1764–1795 uusklassiseksi kesäpalatsiksi.
- Nyt S: Saaripalatsi rakennettiin kylpypaviljongiksi ennen vuotta 1683 ja valmistui 1689, ja Domenico Merlini muutti sen 1764–1795 uusklassiseksi kesäpalatsiksi 76 hehtaarin Łazienki-puistoon.
- Ehd. L: Saaripalatsi rakennettiin kylpypaviljongiksi ja muutettiin 1700-luvun lopulla uusklassiseksi kesäpalatsiksi.
- Ehd. S: Saaripalatsi rakennettiin kylpypaviljongiksi ennen vuotta 1683 ja valmistui 1689, ja Domenico Merlini muutti sen 1700-luvun lopulla uusklassiseksi kesäpalatsiksi 76 hehtaarin Łazienki-puistoon.

**#9 [B]** 'tyhjästä' ja Prahan 'ehjänä' liioittelua.
- Nyt L: Veikselin länsipuoli rakennettiin sodan jälkeen uudelleen tyhjästä, itäpuolen Praga säilyi ehjänä.
- Nyt S: Veikselin länsipuoli rakennettiin sodan jälkeen uudelleen tyhjästä, ja itäpuolen Praga säilyi lähes ehjänä.
- Ehd. L: Veikselin länsipuoli rakennettiin sodan jälkeen suurelta osin uudelleen, itäpuolen Praga säilyi paljon vähemmän tuhoutuneena.
- Ehd. S: Veikselin länsipuoli rakennettiin sodan jälkeen suurelta osin uudelleen, ja itäpuolen Praga säilyi paljon vähemmän tuhoutuneena.
