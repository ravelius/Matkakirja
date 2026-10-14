# Kaupunkikarttojen lyhyet esittelyt: lista ja 3 mallia (Sisältökirjuri 14.10.2026, LUONNOS)

Tilaus: PT (omistaja 06.5x: iPadilla kahdessa palstassa lyhyiden esittelyjen perään jää tyhjää → kirjoita pidemmät, 2 kappaletta ~500–700 merkkiä, faktat kahdesta lähteestä, kuten pitkissä). Ensin lista + 3 mallia; loput vasta PT:n hyväksynnän jälkeen.

## Missä esittelyt ovat (kaksi dataa)

1. **js/packs/maakartat.js** (KAUPUNKIKARTAT, main): 261 karttaa; **89 alle 350 merkkiä** (lyhin vaduz 101, pisin ennen rajaa nuuk 343), 43 ilman esittelyä (pääosin Afrikan pääkaupungit, jotka tulevat pilvi-sisällön kautta, sekä vatikaanivaltio). 350–499: 58, 500–699: 50, 700+: 21.

2. **Pääkaupunkipaketit e04–e14** (Codexin pilvi-sisalto, `kohdekartta.esittely`, haarat paakaupungit-eNN-codex, korjauskierros 2 täsmäcommitit): **kaikki 93 alle 350 merkkiä** (7 tyhjää: bamako, yamoussoukro, bangui, ciudaddelapaz, gitega, dodoma, lusaka; muut 68–176; Canberra 139). Kytkentä kytke-pilvisisalto.mjs (PK).

Päällekkäisiä (sama kaupunki molemmissa): 0.

## Kolme mallia (merkkimäärät ja lähteet)

### monaco (667 merkkiä, 2 kappaletta; kenttä: js/packs/maakartat.js (monaco, 193 merkkiä))

Kartan alue on Monacon ruhtinaskunta, jonka vanha kaupunki on kalliolla meren rannalla. Kalliolle rakennettiin 1200-luvun alussa linnoitus, ja vuonna 1297 François Grimaldi valtasi sen; ruhtinaanlinna on suvun virallinen asuinpaikka yhä. Linnan vieressä on katedraali, jonne monet ruhtinassuvun jäsenet on haudattu.

Kallion juurella on Port Hercule, Monacon ainoa syvänveden satama, jonka nimi tulee Herkules-sankarin palvonnasta. Satamasta itään rinne nousee Monte Carloon, jossa sijaitsevat kasino ja oopperasali. Rannikon jyrkänteellä seisoo Valtamerimuseo, jonka ruhtinas Albert I vihki käyttöön vuonna 1910. Kartan kohteista pääsee lukemaan lisää napauttamalla.

Lähteet: [Wikipedia: Monaco-Ville](https://en.wikipedia.org/wiki/Monaco-Ville); [Bespoke Yacht Charter: Le Rocher](https://bespokeyachtcharter.com/the-regal-serenity-of-le-rocher-in-monaco/); [Wikipedia: Port Hercule](https://en.wikipedia.org/wiki/Port_Hercule); [Wikipedia: Oceanographic Museum of Monaco](https://en.wikipedia.org/wiki/Oceanographic_Museum_of_Monaco); [CS Monitor 1986](https://www.csmonitor.com/1986/0711/qmonte.html); [Wikipedia: Monte Carlo Casino](https://en.wikipedia.org/wiki/Monte_Carlo_Casino)

### canberra (608 merkkiä, 2 kappaletta; kenttä: pilvi-sisalto e04–e14: canberra kohdekartta.esittely (139 merkkiä))

Kartan alue on Canberran pohjoispuoli, jossa kolme kukkulaa kohoaa kaupungin yläpuolelle. Ne kuuluvat Canberra Nature Parkiin, ja Ainslie ja Black Mountain ovat luonnonsuojelualueita, joilla kasvaa uudelleen metsää ja lintuja on paljon.

Mount Ainslie on 843 metriä korkea ja Walter Burley Griffinin suunnitteleman maa-akselin pohjoispää: akseli yhdistää kukkulat Parlamenttitaloon asti. Black Mountain, 812 metriä, on ngunnawal-kansan pyhä kokoontumispaikka nimeltä Galambary. Mount Majura on 890 metriä korkea ja Canberran kaupunkialueen korkein kohta. Kartan kohteista pääsee lukemaan lisää napauttamalla.

Lähteet: [Wikipedia: Mount Ainslie](https://en.wikipedia.org/wiki/Mount_Ainslie); [Canberra Tracks: Mt Ainslie Lookout](https://www.canberratracks.act.gov.au/heritage-trails/track-3-looking-at-canberra/mt-ainslie-lookout); [Wikipedia: Black Mountain (ACT)](https://en.wikipedia.org/wiki/Black_Mountain_(Australian_Capital_Territory)); [Canberra Tracks: Black Mountain](https://www.canberratracks.act.gov.au/heritage-trails/track-3-looking-at-canberra/black-mountain); [Wikipedia: Mount Majura](https://en.wikipedia.org/wiki/Mount_Majura); [ACT Parks: Canberra Nature Park](https://parks.act.gov.au/find-a-park/canberra-nature-park)

### vaduz (671 merkkiä, 2 kappaletta; kenttä: js/packs/maakartat.js (vaduz, 101 merkkiä))

Kartan alue on Vaduzin keskusta, pienen Liechtensteinin pääkaupungin ydin, jossa asuu alle kuusi tuhatta ihmistä. Kukkulan rinteellä seisoo linna, joka mainitaan ensimmäisen kerran vuonna 1322; Liechtensteinin ruhtinaat ostivat sen vuonna 1712, ja ruhtinasperhe asuu siellä yhä.

Linnan alapuolella on uusgoottilainen St. Florinin kirkko, jonka arkkitehti Friedrich von Schmidt suunnitteli ja joka valmistui 1870-luvulla; katedraaliksi se tuli vasta vuonna 1997, kun Vaduzin arkkihiippakunta perustettiin. Kunstmuseum Liechtenstein, betonista ja mustasta basaltista rakennettu laatikko, avattiin 12. marraskuuta 2000. Kartan kohteista pääsee lukemaan lisää napauttamalla.

Lähteet: [Vaduz (kaupunki): Schloss Vaduz](https://www.vaduz.li/en/living-environment/living-building/listed-buildings/schloss-vaduz); [Wikipedia: Vaduz](https://en.wikipedia.org/wiki/Vaduz); [Wikipedia: Vaduz Cathedral](https://en.wikipedia.org/wiki/Vaduz_Cathedral); [Unofficial Royalty: Vaduz Cathedral](https://unofficialroyalty.com/vaduz-cathedral-cathedral-of-st-florin-in-vaduz-liechtenstein); [Wikipedia: Kunstmuseum Liechtenstein](https://en.wikipedia.org/wiki/Kunstmuseum_Liechtenstein); [Architectura.nl: Kunstmuseum Liechtenstein](https://www.architectura.nl/architecture/kunstmuseum-liechtenstein.html)

Huom: jokaisen faktan tukena kaksi lähdettä, paitsi Port Hercule (vain Wikipedia), Mount Majuran korkeus (vain Wikipedia) ja Kansallismuseo/linnan 1322 (Wikipedia + kaupungin oma sivu). Pitkien tyyliin kuuluva loppulause "Kartan kohteista pääsee lukemaan lisää napauttamalla." mukana. Ensimmäinen kappale kertoo mitä alue on, toinen kohteet.

## Alle 350 merkkiä: lista (maakartat.js, lyhimmästä)
vaduz:101 andorralavella:124 manama:137 karachi:147 colombo:152 bern:164 belgrad:176 mumbai:177 sanmarino:179 reykjavik:185 islanti:185 abudhabi:188 zagreb:192 monaco:193 podgorica:200 tbilisi:204 jerevan:223 joaopessoa:225 chisinau:228 gao:229 kashgar:231 macapa:232 kabul:232 portovelho:241 lhasa:241 skopje:245 iquitos:247 manila:249 hanoi:250 yangon:253 chennai:254 beirut:258 townsville:259 buenosaires:261 cayenne:262 kolkata:264 suva:264 amman:265 geraldton:266 mandalay:267 santarem:268 antofagasta:268 mountisa:274 minsk:277 iqaluit:279 ramallah:279 portvila:282 addisabeba:282 guatemala:285 salta:285 broome:286 losangeles:288 tirana:288 marrakech:289 honiara:291 santafe:293 kalgoorlie:296 baku:296 halifax:297 kanton:305 kano:306 tanger:307 bratislava:307 asuncion:308 neworleans:311 hobart:311 lappi:312 portoalegre:314 christchurch:314 chicago:317 quito:317 miami:318 wellington:318 montevideo:319 puntaarenas:321 lima:323 alicesprings:323 merida:324 havanna:325 sydney:328 cairns:332 sisilia:332 hongkong:335 houston:335 darwin:338 monterrey:338 mexico:340 anchorage:341 nuuk:343

## Pilvi-sisalto e04–e14 (kaikki alle 350)
bamako:0 yamoussoukro:0 bangui:0 ciudaddelapaz:0 gitega:0 dodoma:0 lusaka:0 brazzaville:68 mbabane:75 yaren:77 asgabat:78 thimphu:78 victoria:85 belmopan:85 kingston:87 ngerulmud:87 djibouti:89 juba:89 portauprince:92 lome:98 maseru:105 ottawa:107 nukualofa:110 asmara:112 khartum:114 stgeorges:114 portlouis:115 islamabad:115 bandarseribegawan:118 niamey:120 saotome:120 apia:120 antananarivo:121 phnompenh:121 sansalvador:122 alger:124 ndjamena:125 bridgetown:125 basseterre:126 funafuti:126 pjongjang:129 kampala:130 saintjohns:130 gaborone:132 kualalumpur:132 palikir:132 praia:133 portonovo:133 mogadishu:133 southtarawa:133 libreville:137 windhoek:137 abuja:138 kigali:138 tegucigalpa:138 canberra:139 kinshasa:141 dusanbe:141 yaounde:144 lilongwe:144 taskent:149 lapaz:149 santiagodechile:149 majuro:149 naypyidaw:152 brasilia:152 harare:157 moroni:157 santodomingo:159 rabat:161 paramaribo:164 banjul:165 male:166 roseau:166 maputo:167 dhaka:167 kingstown:169 tunis:173 biskek:173 bissau:175 nassau:176 sanjose:177 castries:182 portofspain:183 vientiane:184 georgetown:188 conakry:197 monrovia:203 luanda:214 ouagadougou:219 nouakchott:238 washington:244 accra:264

## Ehdotus toteutukseksi (PT päättää)
- maakartat.js: SK kirjoittaa 89 pidempää (≈ 4 erää/Sonnet-kirjoittajaa + tarkistus), PR mainista (KS/PK kytkee tai SK suoraan, koska pelkkää tekstidataa).
- e04–e14: Codexin korjauslistaan tai SK kirjoittaa ja PK kytkee (93 kpl); 7 tyhjää kaipaa omat tekstinsä.
- Tiedostot: proto-3d/_tyo/sisaltokirjuri/kaupunkikartat-esittelyt-20261014/ (mallit.json, maakartat-listat.json).
