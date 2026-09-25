# Monterrey — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `monterrey`, maa MEX,
en-Wikipedia "Monterrey". Kaikki tiedot haettu Wikipedian
raakatekstistä (`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`,
User-Agent `Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`,
uusinnat kasvavalla viiveellä) **7.9.2026**. Mitat ja malli luettu
tiedostoista `tools/parvi/kaupunkilehti-ohje.md`,
`tools/parvi/kohdekartta-ohje.md`, `docs/moduulit/kaupunkilehti.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Malli: Guatemala Cityn
ja Lagosin lehdet (v1669–v1670).

Luetut lähdeartikkelit **en-Wikipedia 7.9.2026**: **"Monterrey"**,
**"Cerro de la Silla"**, **"Macroplaza"**, **"Faro del Comercio"**,
**"Cerro del Obispado"**, **"Barrio Antiguo"**, **"Monterrey
Cathedral"**, **"Battle of Monterrey"**, **"Fundidora Park"**,
**"Grutas de García"**, **"Museo de Arte Contemporáneo de
Monterrey"**, **"Cabrito"**, **"Machaca"**, **"Cerro de Chipinque"**,
**"Cumbres de Monterrey National Park"**, **"Santiago Vidaurri"**,
**"Nuevo León"**, **"Cuauhtémoc Moctezuma Brewery"**.

Luetut lähdeartikkelit **es-Wikipedia 7.9.2026** (englanninkielistä
artikkelia ei ole): **"Museo del Obispado"**, **"Iglesia de la
Purísima (Monterrey)"**, **"Colegio Civil"**, **"Museo del Palacio de
Gobierno"**, **"Museo de Historia Mexicana"**, **"Capilla de los
Dulces Nombres"**, **"Catedral metropolitana de Monterrey"**,
**"Macroplaza"**, **"Museo Metropolitano de Monterrey"**.

## 0. Rajaus tälle lehdelle

**Meksikon maalehti (`js/packs/maa-kategoriat.js`, MEX) on jo tehty,
eikä sen aiheita toisteta.** Maalehden viisi sivua: *Historia*
(Hidalgon kapinahuuto 1810, Benito Juárez, uudenvuodenpäivän rautatie,
Manilan galleonit), *Muinaisuus* (Teotihuacán, Monte Albán, Chichén
Itzán käärmevarjo, El Tajín/Landa), *Ruoka* (nikstamalisointi, mole,
salsat, keittiö Unescon luettelossa), *Musiikki* (mariachi, tarima,
corrido, danzón) ja *Luonto* (monarkkiperhonen, cenote-kehä ja
Chicxulub, aksolotl, Copper Canyon). Karttanostot on luettu:
`js/packs/maastokohteet-mex.js` (Popocatépetl, Cozumel, Usumacinta,
Teotihuacán, Palenque, Chichén Itzá, Monte Albán, El Tajín,
Guanajuato, Chihuahuan rata), `js/packs/skandaalit.js` MEX
(Maximilianin keisarikunta, Cananean lakko 1906) ja
`js/packs/elaintakyt.js` MEX (aksolotl). **Yksikään näistä ei ole
tämän lehden aihe.**

**Tämä lehti pysyy kaupungissa:** kolme perustamisyritystä ja Santa
Lucían lähde, Vidaurrin vuodet ja puuvillan raja, Cerro de la Silla,
Fundidoran terästehtaasta puistoksi; teemasivulla vuoret, luolat ja
kuiva joki.

**Kaupungin visa** on luettu tiedostosta
`js/packs/northamerica-questions.js` (`monterrey`): kysymykset
koskevat maata (Meksiko) ja Sierra Madrea. **Minitehtävä ei kysy
kumpaakaan.**

Olemassa olevat lohkot on luettu:
- `js/packs/northamerica-saapumiset.js` (`monterrey`): olemassa,
  mutta ilman 1873-kehystä. **Kuvaukseen lisätään 1873-virke**
  (Guatemala Cityn malli), nosto jää ennalleen.
- `js/packs/northamerica-valokuvat.js` (`monterrey`): valokuvataulussa
  on vanha vedos (Guido Moebiuksen tehdas 1912), kolme lisäkuvaa
  (Horno 3, Cerro de la Silla, Paseo Santa Lucía) ja nykykuva
  (ilmakuva Macroplazalta). Näitä viittä tiedostonimeä **ei käytetä
  lehden nostoissa**; ennen–nyt-pari haetaan erikseen Commonsista,
  koska taulun vanha ja uusi kuva eivät esitä samaa paikkaa.
- `js/packs/northamerica-artikkelit.js`: Monterreylla **ei ole
  merkintää** — kirjoitetaan uusi (intro + kolmikappaleinen teksti).
- `js/packs/kulttuuri-kategoriat.js`: Monterreylla ei ole lehteä.
- `js/packs/maakartat.js` ja `js/packs/nahtavyysjutut.js`: ei
  kohdekarttaa.
- `js/packs/saatiedot.js`: ei riviä — **säärivi ei kuulu tähän
  erään** (Fablen ohje 7.9.2026). Oppaan sääjakso nojaa siksi
  en-Wikipedian Climate-osioon ja sanoo sen ääneen.

**1873-KEHYS:** isoisän matkavuonna Monterrey oli 277-vuotias
osavaltionpääkaupunki, jonka rikkaus oli juuri tullut rajan takaa.
Yhdysvaltain sisällissodan aikana (1861–65) kuvernööri **Santiago
Vidaurri** oli rakentanut kauppasuhteet Amerikan konfederaatioon, ja
puuvilla kulki Monterreyn kautta; hänen vävynsä, irlantilainen
kauppias **Patrick Milmo O'Dowd**, rikastui juuri tästä kaupasta.
Vidaurri itse oli teloitettu 1867. **Colegio Civilin** rakennus oli
vihitty lokakuussa **1870** — kolme vuotta ennen isoisän matkaa —
ja rautatie tuli kaupunkiin vasta 1800-luvun viimeisellä
vuosikymmenellä. Terästehdasta ei vielä ollut: *Fundidora* perustettiin
1900 ja maan ensimmäiset terästehtaat avattiin 1903.

---

## 1. Nimi, perustaminen ja kolme yritystä

- Kaupunki on nimetty **Gaspar de Zúñigan, Monterreyn 5. kreivin**
  mukaan; hän oli Uuden Espanjan varakuningas 1595–1603 ja hänen
  sukunsa oli kotoisin **Monterreistä Galiciasta**. ("Etymology")
- **Ristiriita samassa artikkelissa:** Geography-osio sanoo, että
  kansanetymologia johtaa nimen kaupunkia ympäröivistä vuorista
  ("King Mount"), mutta lisää suluissa, että kaupunki nimettiin
  *saman kreivin vaimon* mukaan. Etymology-osio sanoo, että nimi
  tulee kreivistä itsestään. **Ratkaisu:** lehti kertoo Etymology-
  osion version (kreivi ja Galician Monterrei) ja jättää vaimo-
  maininnan pois, koska se on toisen osion sivuhuomautus ilman
  lähdettä. Kansanetymologia "kuningasvuori" kerrotaan
  kansanetymologiana, ei totuutena.
- Ennen eurooppalaisten tuloa alueella ei ollut valtiota vaan
  paimentolaisryhmiä. Kalliopiirroksista ja luolamaalauksista on
  tunnistettu neljä ryhmää: **azalapat, huachichilit, coahuiltecot ja
  borradot**. ("Prehispanic history")
- **Kolme yritystä.** 1500-luvulla laaksoa kutsuttiin
  *Extremaduran laaksoksi*. Ensimmäiset retkikunnat johti
  **Alberto del Canto**, joka nimesi paikan **Santa Luciaksi**;
  yritys epäonnistui. **Luis Carvajal y de la Cueva** neuvotteli
  kuningas Filip II:n kanssa Nuevo Leónin alueesta ja perusti
  **1582** asutuksen **San Luis Rey de Francia**. Kahdeksan vuoden
  ajan Nuevo León oli autio, kunnes **Diego de Montemayor** perusti
  13 perheen retkikunnalla **20.9.1596** kaupungin *Ciudad
  Metropolitana de Nuestra Señora de Monterrey* — **Santa Lucían
  lähteen** (Ojos de Agua de Santa Lucia) viereen, siihen kohtaan
  jossa nyt ovat Meksikon historian museo ja Santa Lucían
  kanava. ("Foundation")
- Espanjan vallan aikana Monterrey pysyi pienenä; väkiluku vaihteli
  muutamasta sadasta muutamiin kymmeniin. Kaupunki välitti kauppaa
  San Antonion, Tampicon ja Saltillon välillä.

## 2. Itsenäisyyden jälkeen: raja, Vidaurri ja puuvilla

- 1800-luvulla Monterrey nousi uuden valtion talouskeskukseksi juuri
  tasapainoisen sijaintinsa takia: Eurooppa Tampicon kautta,
  Yhdysvallat San Antonion kautta, pääkaupunki Saltillon kautta.
  **1824** Nuevo Leónin kuningaskunnasta tuli osavaltio ja
  Monterreystä sen pääkaupunki. ("After Mexican Independence")
- **1846** kaupungissa käytiin Meksikon–Yhdysvaltain sodan
  ensimmäinen suuri taistelu, **Monterreyn taistelu**. Meksikolaiset
  joutuivat antautumaan torjuttuaan ensin useita hyökkäyksiä.
  ("After Mexican Independence"; erillinen artikkeli "Battle of
  Monterrey".)
- **Santiago Vidaurri** (1809–1867) oli Nuevo Leónin ja Coahuilan
  kuvernööri **1855–1864**. Hän valtasi Monterreyn toukokuussa 1855,
  liitti Coahuilan Nuevo Leóniin huhtikuussa **1856** ja keräsi rajan
  tullitulot itselleen sen sijaan että olisi tilittänyt ne
  liittovaltiolle; Benito Juárez tuomitsi tämän julkisesti.
- Yhdysvaltain sisällissodan aikana (**1861–65**) Vidaurri haki
  kauppasuhteita **Amerikan konfederaatioon**, joka rajautui
  Pohjois-Meksikoon; hän tapasi konfederaation asiamiehen **Juan A.
  Quinteron** kesäkuussa 1861. Hänen tyttärensä **Prudenciana** oli
  mennyt **23.4.1857** naimisiin irlantilaisen kauppiaan **Patrick
  Milmo O'Dowdin** kanssa, joka rikastui juuri konfederaation
  puuvillakaupalla; suku pysyi merkittävänä Monterreyssä koko
  1800-luvun lopun.
- Vidaurri erosi Juárezista maaliskuussa **1864**, ja hänen
  joukkonsa valtasivat Monterreyn **15.8.1864** — Juárez pääsi
  pakoon täpärästi. Vidaurri siirtyi keisari Maximilianin
  neuvonantajaksi ja oli keisarikunnan viimeinen pääministeri
  kevään 1867. Keisarikunnan kaaduttua hänet **teloitettiin ilman
  oikeudenkäyntiä 8.7.1867**. Nuevo Leónissa hän on yhä tärkeä
  historiallinen hahmo, vaikka meksikolaisessa historiankirjoituksessa
  hänet usein sivuutetaan.
- **Cervecería Cuauhtémoc** -panimo perustettiin **1890**.
  Rautatieyhteys tuli 1800-luvun viimeisellä vuosikymmenellä.
  **Antonio Basagoiti** ja muut perustivat *Fundidora de Fierro y
  Acero de Monterrey* -yhtiön; terästehdas perustettiin **1900**.
  Maan ensimmäiset terästehtaat avattiin Monterreyssä **1903**.

## 3. Cerro de la Silla ja kaupungin vuoret

- **Cerro de la Silla** ("satulavuori") on Sierra Madre Orientalin
  esivuoristoa. Se ulottuu kolmen kunnan alueelle: Juárez (55,15 %),
  Guadalupe (31,62 %) ja Monterrey (13,23 %). Pinta-ala **60,5 km²**.
- Huippuja on **neljä**: Pico Antena, Pico Norte, Pico Sur ja Pico la
  Virgen. Korkein on **Pico Norte, 1 820 m**; matalin **Pico la
  Virgen, 1 750 m**.
- Vuori julistettiin **luonnonmonumentiksi 1991**. Huipulle nousee
  **5,3 km** pituinen polku, ja nousu kestää noin **kolme tuntia**.
- **Köysirata** rakennettiin vuoren pohjoisrinteeseen 1900-luvun
  jälkipuoliskolla. **Vihkiäispäivänä 2.6.1961** onnettomuudessa
  kuoli **viisi ihmistä**, joukossa köysiradan suunnitellut insinööri
  **Jesús Fernández** — ja samana päivänä rata suljettiin lopullisesti.
  Jäljellä on vain yläasema.
- Muita kaupungin vuoria: **Cerro de las Mitras** lännessä (nimi
  tulee siitä, että harjanne muistuttaa piispanhiippoja),
  **Cerro del Topo** ja **Topo Chico** pohjoisessa, **Loma Larga**
  etelässä ja **Cerro del Obispado** joen pohjoispuolella.
- Kaupunki on **540 metrin** korkeudessa. **Santa Catarina -joki**
  halkoo sen idästä länteen ja jakaa sen pohjois- ja eteläpuoleen;
  joki on **pinnalta kuiva suurimman osan vuotta**, mutta vesi
  virtaa maan alla. Se laskee San Juan -joen kautta Rio Grandeen.

## 4. Fundidora: terästehtaasta puistoksi

- **Fundidora Monterrey** oli **Latinalaisen Amerikan ensimmäinen
  teräs- ja rautavalimo**. Yhtiö meni konkurssiin **1986**, alue
  pakkolunastettiin **1988** ja *Fideicomiso Fundidora* perustettiin
  hoitamaan sitä.
- Rakentaminen alkoi **1989** historiallisesti tärkeiden rakennusten
  suojelulla ja muiden purkamisella. Puisto avattiin **24.2.2001**
  pinta-alaltaan **114 hehtaaria** ja sai lisänimen *teollisen
  arkeologian museoalue*. **2010** siihen liitettiin **2,35 km**
  pituinen Paseo Santa Lucía -kanava, ja kokonaisala nousi
  **144 hehtaariin**, josta **80 ha** on viheraluetta. Alueella on
  2 järveä, 23 suihkulähdettä, 16 rakennusta, **27 suurta
  teollisuusrakennelmaa** ja **127 teräksentekokonetta ja -työkalua**.
  Vanhan osan ympäri kiertää **3,4 km** pituinen rata.
- **Ristiriita:** "Monterrey"-artikkelin Landmarks-osio sanoo puiston
  luonnonalueeksi **120 hehtaaria**, kun "Fundidora Park" -artikkeli
  antaa kokonaisalaksi 144 ha ja viheralaksi 80 ha. **Ratkaisu:**
  lehti käyttää kohdeartikkelin lukuja (114 → 144 ha, 80 ha vihreää)
  ja jättää yleisartikkelin pyöristetyn luvun pois. Ero kirjataan
  lohkokommenttiin.
- Alueella ovat Arena Monterrey, Cintermex-messukeskus, Auditorio
  Citibanamex (avattu 1994, 8 200 paikkaa) ja Parque Fiesta Aventuras
  (avattu 1995 nimellä Parque Plaza Sésamo, uudelleennimetty
  18.5.2022).

## 5. Talous ja teollisuus (tausta, ei omaa nostoa)

- Monterrey on Meksikon toiseksi suurimman metropolialueen keskus
  (5 347 000 asukasta vuonna 2026); kaupunki itse 1 142 194 (2020).
- Vahvat alat: **teräs, sementti, lasi, autonosat ja panimot**.
  Metallisektori (rauta ja teräs) oli 6 % teollisuuden BKT:sta 1994.
  Monterreyn terästehtaat yksityistettiin 1986 ja tuottivat 1990-luvun
  alussa noin puolet Meksikon teräksestä.
- Kaupungissa ovat **Cemex**, **FEMSA**, **Alfa**, **Vitro**,
  **Gruma** ja **Banorte**. **Cuauhtémoc Moctezuma** -panimo
  (Sol, Tecate, Indio, Dos Equis, Carta Blanca) myytiin Heinekenille.
- **Tecnológico de Monterrey** (ITESM) on Meksikon suurin yksityinen
  yliopisto; **UANL** on Meksikon kolmanneksi suurin yliopisto.

## 6. Ilmasto (Climate-osio, en-Wikipedia)

- **Puolikuiva ilmasto** (Köppen **BSh**): kosteus vaihtelee, mutta
  sadetta ei ole tarpeeksi kostean subtrooppisen tyyppiin. Sijainti
  Sierra Madre Orientalin itäpuolella tuo muokattuja Meksikonlahden
  ilmamassoja. Sisämaassa ja matalalla — **yksi Meksikon
  lämpimimmistä suurkaupungeista**.
- Elokuun keskiylin **36 °C**, keskialin **24 °C**; tammikuun
  keskiylin **22 °C**, keskialin **10 °C**. Sade on talvella niukkaa
  ja yleisintä **touko–syyskuussa**.
- Vuodenajat eivät ole selvärajaisia: lämmin kausi voi alkaa
  helmikuussa ja kestää syyskuuhun. Tammi–helmikuussa voi silti olla
  30 °C. Lumi on hyvin harvinaista; tammikuussa **1967** satoi
  kahdeksassa tunnissa noin **50 cm**, viimeksi lunta satoi
  helmikuussa 2021.
- **Hurrikaani Alex 30.6.–2.7.2010**: yli **584 mm** sadetta 72
  tunnissa, paikoin metri; noin **20 kuollutta**; kolmin- tai
  nelinkertainen määrä siihen nähden mitä hurrikaani **Gilbert**
  toi 15.9.1988. Gilbertin aikana kuiva Santa Catarina tulvi yli ja
  yli 100 ihmistä kuoli.

## 7. Ruoka (oppaan ruokajakso)

- Monterreyn perinteisin ruoka on **cabrito**, hiilloksella paistettu
  kilinpoika. Tunnetuin tapa on **cabrito al pastor**: ruho avataan
  litteäksi, pistetään vartaaseen ja paistetaan hitaasti hiilloksen
  vieressä ilman mausteita — maku tulee hitaasti palavasta hiilestä.
  Muut tavat: uunissa (*al horno*), tomaattikastikkeessa (*en salsa*)
  ja *en sangre*. ("Cabrito", Mexico-osio)
- **Machaca** on kuivattua ja maustettua lihaa, joka liotetaan ja
  murennetaan; kuivaus chilien ja paikallisten mausteiden kanssa
  kehittyi Pohjois-Meksikon karjatiloilla. Nykyään liha useimmiten
  kypsennetään, revitään ja haudutetaan omassa liemessään.
  Suosituin aamiainen on **machaca con huevo**. Tarjoillaan lähes
  aina isojen vehnätortillojen kanssa. ("Machaca")
- Muut paikalliset: **semita** (hapattamaton leipä), **capirotada**
  (leipä, juusto, rusinat, maapähkinät, kiteytetty ruokosokeri) ja
  sianlihan vähäisyys ruokalistoilla — "Monterrey"-artikkeli liittää
  nämä kaupungin perustajasukujen mahdolliseen kryptojuutalaisuuteen.
  Viikonlopun **carne asada** on perhetapa. **Glorias** ja **obleas**
  tehdään vuohenmaidosta.

## 8. Teemasivun aineisto: vuoret, luolat ja kuiva joki

- **Cumbres de Monterrey -kansallispuisto** on kaupungin eteläpuolella
  Sierra Madre Orientalissa ja kuuluu **Unescon MAB-ohjelman
  biosfäärialueisiin vuodesta 2006**. Puiston kohteita: Chipinquen
  ekologinen puisto, La Estanzuelan osavaltiopuisto (n. 7 km
  etelään), **La Huasteca** lännessä Santa Catarinan kunnassa,
  **Potrero Chico** koillisessa, **Grutas de García**, Matacanesin
  10 tunnin reitti (köysilaskuja, maanalaisia jokia, putouksia) ja
  **Cola de Caballo** -putous (n. 35 km etelään).
- **Cerro de Chipinque** on San Pedro Garza Garcían, Monterreyn ja
  Santa Catarinan kuntien alueella. Huippu **2 229 m**. Nimen
  arvellaan tulevan nahuatlin sanasta *chichipinqui*, "pieni sade",
  tai alkuperäiskansan päällikön nimestä. Alue on **1 625 hehtaaria**,
  josta yleisölle avoinna noin **300**; korkein huippu on **Copete de
  las Águilas**, "kotkien töyhtö", ja pääharjanne on noin **17 km**
  pitkä. Puisto on ollut ekologinen puisto vuodesta **1992**, avoinna
  joka päivä klo 6–20, ja siellä työskentelee **22 metsänvartijaa**.
  Eläimistössä on mm. mustakarhu, kojootti, nasua, valkohäntäpeura ja
  harmaasusi; lintuja punapyrstöhaukka, kalkkurikorppikotka,
  villikalkkuna ja sinipäämotmotti. Keskilämpötila 20 °C, sademäärä
  860 mm vuodessa; metsä on mäntyä ja tammea.
- **Grutas de García** on García'n kunnassa. Luolat syntyivät
  **50–60 miljoonaa vuotta sitten**; esihistoriallisella ajalla ne
  olivat **meren alla**, ja siksi seinistä löytyy simpukan- ja
  kotilonkuoria. Luolat pysyivät piilossa, kunnes **fray Juan
  Antonio de Sobrevilla** löysi ne satunnaisella vuoristoretkellä.
  ("Monterrey": luolat löydettiin **1843**.) Luolasto on **300
  metriä** pitkä ja **105 metriä** syvä; sisäänkäynniltä lähtee kaksi
  reittiä, toinen noin **2,5 km** ja **16 salia**, toinen **1 km** ja
  **11 salia**. Lämpötila noin **18 °C**. Nimettyjä muodostumia:
  *El salón de la luz* (valon sali — katon kiven luontainen kirkkaus
  päästää ulkovaloa läpi), *La octava maravilla* (kahdeksas ihme:
  tippukivi ja pisarakivi ovat kasvaneet yhteen pylvääksi),
  *El salón del aire* (40 metrin parveke) ja *El mirador de la mano*
  (ihmiskättä muistuttava pisarakivi).

## 9. Kohdekartan kohteet (8) — lähteet ja koordinaatit

Koordinaatit **7.9.2026**: en-Wikipedian coordinates-rajapinta
(katedraali), es-Wikipedian coordinates-rajapinta (Dulces Nombres) ja
Nominatim (muut). Kaikki 28 väliä on mitattu haversinilla; **pienin
väli on 287 metriä** (hallintopalatsi – Meksikon historian museo),
toiseksi pienin 302 metriä (katedraali – Barrio Antiguo) ja suurin
3 658 metriä (Museo del Obispado – Barrio Antiguo).

1. **Museo del Obispado** 25.673324 / −100.342248 — es-Wikipedia
   "Museo del Obispado". Rakentaminen alkoi **5.7.1790** Linaresin
   hiippakunnan piispan lepo- ja rukoustaloksi (*Palacio de Nuestra
   Señora de Guadalupe*). Talo oli vuorollaan **kasarmi, linnoitus,
   spitaalisairaala ja kabaree**, ennen kuin siitä tuli **1956**
   alueellinen museo INAH:n hallintaan. Julistettiin **kansalliseksi
   siirtomaamonumentiksi 8.12.1932**, siirtyi INAH:lle 1938,
   ensimmäinen restaurointi 1946, vihittiin museoksi **20.9.1956**
   kaupungin 360-vuotispäivänä. **10 näyttelysalia**, 1 500 m²,
   kokoelmassa **1 325 esinettä**. Esillä mm. Porfirio Díazin
   vaunut, 1800-luvun kastemalja ja Servando Teresa de Mierin
   kirjapaino; "Nuestros caudillos" -salissa on Santiago Vidaurrin
   muotokuva. Kukkulalla on myös näköalapaikka *Mirador del
   Obispado* ja monumenttilippu ("Cerro del Obispado", en).
2. **La Purísiman kirkko** 25.669728 / −100.326297 — es-Wikipedia
   "Iglesia de la Purísima (Monterrey)". Kultti sai alkunsa
   1600-luvun lopulla, kun tlaxcalteekkinainen **Antonia Teresa**
   toi Monterreyhin noin **42 cm** korkean Purísima-veistoksen
   ("Virgen Chiquita"); hän asettui kaupunkiin noin **1680** ja oli
   suutarin leski, siksi liikanimi *la Zapatera*. Perimätiedon mukaan
   noin **1700** neljänkymmenen sadepäivän jälkeen Santa Catarina
   uhkasi tulvia, ja Antonia vei kuvan kulkueessa joen rantaan, jolloin
   vedet vetäytyivät. Fray Servando Teresa de Mier kirjasi tarinan
   1700-luvulla **epäilevään sävyyn**; arkistot vahvistavat Antonia
   Teresan olemassaolon ja sen, että hän toi veistoksen. Testamentti
   **20.10.1719**, kappeli näkyy kaupungin kartassa **1791**,
   seurakunta perustettiin **19.12.1894**, uusklassinen kirkko
   purettiin ja **1939** aloitettiin nykyinen: **Meksikon ensimmäinen
   moderni kirkkorakennus**, arkkitehti **Enrique de la Mora**,
   tärkeä edeltäjä Félix Candelan betonikuorirakenteille.
   Kellotornissa on **6,5 metriä** korkea poltetusta savesta tehty
   Purísima, tekijä **Adolfo Laubner Mayer**.
3. **Colegio Civil** 25.674141 / −100.315768 — es-Wikipedia
   "Colegio Civil". Rakennus aloitettiin **1793–1794** arkkitehti
   **Juan Crousetin** piirustuksin köyhien sairaalaksi (*Real
   Hospital de Pobres de Nuestra Señora del Rosario*); työ keskeytyi
   1797 piispan ja kuvernöörin erimielisyyksiin. Rakennusta
   käytettiin **1798 isorokkoepidemiassa**, sitten
   itsenäisyystaistelujen aikana ratsuväen ja tykistön kasarmina.
   **Santiago Vidaurri** esitti kongressille **1857** Colegio Civilin
   perustamista; opetus alkoi **1859** piispantalossa väliaikaisesti,
   ensimmäinen johtaja oli tohtori **Ángel Martínez Villarreal** ja
   ensimmäinen oppilas **Antonio María Elizondo**, joka maksoi
   kirjoittautumisesta kaksi pesoa. Ranskan miehityksen aikana
   **Maximilian sulki koulun**, mutta tunteja pidettiin salaa
   opettajien kotona. Kaupungin vapautuksen jälkeen kuvernööri
   **Mariano Escobedo** määräsi rakennuksen tehtäväksi, ja se
   vihittiin juhlallisesti **lokakuussa 1870**; puhujana oli kolmas
   johtaja, lääkäri **José Eleuterio González**. Taloon tuli myöhemmin
   säähavaintoasema, kaukoputki ja luonnonhistoriallinen museo.
   Restauroitiin 2004–2006 yliopiston kulttuurikeskukseksi.
4. **Nuevo Leónin hallintopalatsi** 25.672615 / −100.308978 —
   es-Wikipedia "Museo del Palacio de Gobierno" (osio *El edificio y
   su arquitectura*) ja en-Wikipedia "Macroplaza". **Vanha
   hallintopalatsi** Morelosin ja Escobedon kulmassa toimi osavaltion
   hallintotalona **1817**–1900-luvun alkuun; se oli **Benito
   Juárezin työhuone** ja kärsi vaurioita Monterreyn taistelussa —
   siitä syntyi ajatus uudesta palatsista. Kuvernööri **Bernardo
   Reyes** valitsi tontiksi kaupungin alkuperäisen pääaukion. Työt
   alkoivat **8.8.1895**, insinööri **Francisco Beltrán**, työnjohto
   Martín Peña; rakennus on **51 × 88 metriä** ja päällystetty
   **vaaleanpunaisella cantera-kivellä**, joka tuotiin **San Luis
   Potosísta**. Kiveä ei osattu paikan päällä työstää, joten
   kivenveistäjät värvättiin sen lähtöpaikasta — ja heidän
   asuinalueestaan tuli **Barrio San Luisito**, nykyinen Colonia
   Independencia. Sisällä on **500–600 juoksumetriä** Fundidoran
   valmistamia kaiteita. Julkisivun huipulla on **Voiton patsas**;
   peristyylien päällä metalliveistoksia leijonasta ja lapsesta,
   joka pitää sitä ruusuköynnöksin. Rahoituksesta osa saatiin
   myymällä vanha palatsi **1897** 70 000 pesolla; arvioitu kulu oli
   100 000 pesoa ja rakentaminen kesti **13 vuotta** viiden sijaan.
5. **Meksikon historian museo** 25.671478 / −100.306412 —
   es-Wikipedia "Museo de Historia Mexicana". Ensimmäiset
   valmistelut marraskuussa **1992** kuvernööri Sócrates Rizzon
   johdolla; historiallinen käsikirjoitus tehtiin **1993**
   (mukana historioitsija **Israel Cavazos** ja Marcela Guerra,
   koordinaattorina Margarita Loera). Arkkitehdit **Óscar Bulnes** ja
   **Augusto Álvarez**. Rakentaminen alkoi lokakuussa **1993** ja
   museo vihittiin **30.11.1994** — noin **1 500 esinettä**
   asennettiin runsaassa vuodessa. Kuuluu *3 Museos* -kokonaisuuteen
   yhdessä Museo del Palacion ja Museo del Norestén kanssa.
   Museo sijaitsee Santa Lucían lähteen paikalla ("Monterrey",
   Foundation).
6. **Dulces Nombresin kappeli** 25.668333 / −100.308889 —
   es-Wikipedia "Capilla de los Dulces Nombres". Barrio Antiguossa.
   Rakentaminen ajoittuu noin vuoteen **1830**, ja sen määräsi
   **José Antonio de la Garza Saldívarin leski** miehensä
   testamentin ehdon täyttämiseksi. Vihitty **17.3.1866**.
   Materiaali **cantera**, mitat **13 × 8 metriä**. Luokiteltu
   historialliseksi monumentiksi (09334). Nimikkopyhimys: Jeesuksen
   ja Marian suloiset nimet.
7. **Monterreyn katedraali** 25.665600 / −100.309800 — en-Wikipedia
   "Monterrey Cathedral" ja es-Wikipedia "Catedral metropolitana de
   Monterrey". Rakennettu **1705–1791**, julistettiin katedraaliksi
   **1777**, kun paavi **Pius VI** perusti Linaresin hiippakunnan.
   Latinalaisen ristin muotoinen keskuslaiva, sivuilla
   syvennyskappeleita; ristiholvit ja kahdeksankulmainen kupoli.
   Sisustus on hillitty ja eklektinen, tyyliltään uusklassinen ja
   barokki — barokki erityisesti julkisivussa. Sakramenttikappelissa
   on **pakotettu hopeainen etuseinä**. Kuorissa on **vuoden 1893
   Merklin-urut**, jotka ovat vaurioituneet eivätkä ole käytössä.
8. **Barrio Antiguo** 25.665527 / −100.306786 — en-Wikipedia
   "Barrio Antiguo". Kaupungin historiallinen kortteliverkko;
   mukulakivikatuja ja siirtomaa-ajan arkkitehtuuria. Alue ulottui
   alun perin Santa Catarina -joelta 5 de Mayo -kadulle ja
   Mina-kadulta Roble-kadulle (nykyinen Avenida Benito Juárez).
   Säilyneet rakennukset ovat enimmäkseen **1700-luvulta ja
   1800-luvun lopulta**. Alue oli varakuninkaan ajan kaupallinen ja
   kulttuurinen keskus 1900-luvun alkupuolelle asti. Monta vanhaa
   taloa purettiin **Macroplazan** tieltä vuosisadan lopulla.
   Vuodesta **2013** alkoi kunnostushanke, jossa katuja on muutettu
   kävelykaduiksi (mm. Calle Morelos). Marraskuisen *Festival
   Cultural Barrio Antiguon* on korvannut syyskuinen *Festival
   Internacional de Santa Lucía*.

**Kohteet, jotka pudotettiin 200 metrin säännöllä:**
- **Faro del Comercio** (25.666194 / −100.310028) on **70 metrin**
  päässä katedraalista. Barragánin ja Raúl Ferreran monumentti
  vuodelta **1984**, 69,80 × 12,33 metriä, kauppakamarin
  100-vuotisjuhlaksi; vihreä lasersäde. Mainitaan matkaoppaassa.
- **Museo Metropolitano de Monterrey** (25.666470 / −100.311257) on
  **175 metrin** päässä katedraalista; vanha kaupungintalo Plaza
  Zaragozan laidalla. Mainitaan matkaoppaassa.
- **MARCO** (25.664613 / −100.309825) on **110 metrin** päässä
  katedraalista. Ricardo Legorretan minimalistinen postmoderni
  rakennus, avattu **1991**; 16 000 m², josta 5 000 m² näyttelytilaa
  11 salissa; sisäpiha vesipeileineen. Sisäänkäynnin edessä
  **Juan Sorianon** neljä tonnia painava ja 18 jalkaa korkea
  pronssiveistos **"La Paloma"**. Mainitaan matkaoppaassa.
- **Explanada de los Héroes** (25.671771 / −100.309386) on **102
  metrin** päässä hallintopalatsista ja on sen edusaukio (19 400 m²).

**Rajauksen ulkopuolella:** Fundidoran puisto on 2,5 km itään
(ja lehden noston aihe), Cerro de la Silla 6 km itään (noston aihe),
Grutas de García 40 km luoteeseen ja Chipinque 8 km etelään
(teemasivun aiheet).

## 10. Macroplaza (tausta oppaaseen)

- **Ristiriita:** "Monterrey"-artikkelin Landmarks-osio sanoo
  Macroplazan olevan **maailman 8. suurin** kaupunkiaukio;
  "Macroplaza"-artikkeli sanoo sen olevan **Meksikon suurin ja
  maailman viidenneksi suurin**. **Ratkaisu:** lehti ei väitä
  sijalukua vaan kertoo pinta-alan (**400 000 m²**) ja sanoo
  lähteiden antavan eri sijaluvut. Molemmat luvut kirjataan
  lohkokommenttiin.
- Rakennettiin **1980-luvun alussa** kuvernööri Alfonso Martínez
  Domínguezin kaudella; kehitystä johti **Ángela Alessio Robles**.
  Rakentaminen vaati vanhojen talojen purkamista.
- Aukiolla tai sen laidalla: hallintopalatsi, Faro del Comercio,
  Explanada de los Héroes, Jardín Hundido (jossa on Hyde Parkin
  tapaan puhujannurkka), Teatro de la Ciudad, Biblioteca Fray
  Servando Teresa de Mier, **Neptunuksen suihkulähde**, Dulces
  Nombresin kappeli, Plaza Zaragoza, kaupungintalo ("kristallipalatsi")
  ja **Rufino Tamayon** *Homenaje al Sol* eteläpäässä.
- Muut maamerkit ("Monterrey", Landmarks): **Santa Lucían
  keinojoki** (rakennettu 1996–2007, yhdistää Macroplazan
  Fundidoraan), **Alfa-planetaario** (Latinalaisen Amerikan
  ensimmäinen IMAX-kupoli ja maailman neljäs), **Puente de la
  Unidad** -riippusilta, ja **Monterreyn inukshuk** — yksi harvoista
  aidoista arktisista inukshukeista Kanadan ulkopuolella, jonka
  inuiittitaiteilija **Bill Nasogaluak** teki paikan päällä
  **2007** Kanadan hallituksen ja kauppakamarin lahjaksi Nuevo
  Leónille.

## 11. Sisältölinjaukset (spec-mantereet.md)

- **Ei nykyväkivaltaa.** "Monterrey"-artikkelin *Public safety*-osio,
  vuoden 2011 kasinoisku ja *Barrio Antiguo* -artikkelin maininta
  järjestäytyneestä rikollisuudesta **jätetään kokonaan pois**
  (spec: "Meksiko ja Keski-Amerikka: arkeologia, kulttuuri ja
  historia kantavat; nykyväkivaltaa ei käsitellä").
- **Ei nykypolitiikkaa.** Vuoden 2022 vesikriisi, Teslan tehdas ja
  nykyiset pormestarit jäävät pois.
- **Historiallinen väkivalta kerrotaan tapahtumana.** Monterreyn
  taistelu 1846 ja Vidaurrin teloitus 1867 mainitaan neutraalisti
  ilman yksityiskohtia (pilari 4).
- **Alkuperäiskansat.** Alueen paimentolaisryhmät nimetään omilla
  nimillään (azalapat, huachichilit, coahuiltecot, borradot), eikä
  heitä esitetä "kadonneena kansana"; Dulces Nombresin ja
  La Purísiman tarinoissa tlaxcalteekit ja mexicat ovat toimijoita.
