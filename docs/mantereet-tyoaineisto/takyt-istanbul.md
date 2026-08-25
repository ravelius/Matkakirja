# Täkyehdokkaat: Istanbul

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten, samalla
mallilla kuin `takyt-ateena.md`. Kaikki täkyt on tarkistettu
en-Wikipediasta hakemalla artikkelin raakateksti curlilla 25.8.2026.
Ei mitään muistinvaraista.

Omistajan lupa 25.8.2026: Istanbul tehdään yhtä valmiiksi kuin
Kreikka (Raamattu, osio "Fokusmoodi", kohta SEURAAVAT FOKUSMAAT).

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä viedään peliin ja missä
sanamuodossa.

## Tarkistustapa

- Wikipedia-artikkelit haettu komennolla
  `curl -sS "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
  Rajapinta vastasi ajoittain tyhjää tai 429:llä (kiintiörajoitus);
  haut uusittiin kasvavalla viiveellä (3 s → 6 s → 12 s...) kunnes
  vastaus tuli läpi. Kaikki alla käytetyt haut onnistuivat lopulta.
- Jokainen täky perustuu suoraan lainattuun tai tiivistettyyn kohtaan
  haetusta artikkelista. Kohdat, joita ei saatu varmennettua, ovat
  Hylätyt-osiossa perusteluineen.
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi, tekijä ja Restrictions-kenttä on kysytty erikseen
  Commonsin `imageinfo`-rajapinnalla — ei arvattuja tiedostonimiä.
  Tiedostonimet on poimittu Commonsin hakurajapinnasta
  (`list=search`, `srnamespace=6`), ei arvattu. Kaikki ehdotetut ovat
  PD, CC0, CC BY tai CC BY-SA; Restrictions oli tyhjä kaikilla paitsi
  yhdellä, joka on merkitty erikseen ja jätetty pois.
- Kuvia EI ole katsottu silmin. Ennen julkaisua kuvat on käytävä läpi
  samalla silmätarkistuksella kuin herokuvat
  (`herokuvien-silmatarkistus-1.md` -käytäntö), erityisesti
  tunnistettavien etualan ihmisten varalta.

---

## Olemassa oleva Istanbul-sisältö repossa

`grep -ril "istanbul\|konstantinopoli\|hagia\|bospor"` -katsaus:

- **js/packs/istanbul.js** — kokonainen kaupunkilauta 17 kohteella
  (Rumelin linnoitus, Dolmabahçe, Taksim, Galata-torni, Pierre Loti,
  Balat, Maustebasaari, Suuri basaari, Topkapı, Hagia Sofia, Sininen
  moskeija, Üsküdar, Neitsyttorni, Kadıköy, Prinssisaaret).
- **js/packs/istanbul-questions.js** — n. 970 riviä tietovisaa
  näistä kohteista.
- **js/packs/nahtavyysjutut.js** (rivit n. 3525–3918) — kymmenen
  valmista nähtävyysjuttua: Suuri basaari (61 katua, 4000 kauppaa,
  1894 maanjäristys), Sininen moskeija (21 043 kaakelia, kuuden
  minareetin väärinkuulo), Hagia Sofia (532–537, Justinianuksen
  huudahdus, moskeija/museo/moskeija), Topkapı (haaremi, keittiöt,
  Lusikkamestarin timantti ja Topkapin tikari MAINITAAN NIMELTÄ mutta
  ilman tarinaa), Galatan torni (1348, Hezârfen 1638), Üsküdar,
  Süleymaniyen moskeija, **Sirkecin asema (mukaan lukien 1873
  "väliaikainen" asema ja Orient-pikajuna)**, Neitsyttorni, Galatan
  silta (Leonardo, tullimaksut, 1875 ponttonisilta).
- **js/packs/kulttuuri-kategoriat.js** (rivit n. 5984–6400) —
  "Matkailijan Istanbul": katukissat ja Gli-kissa, Yerebatanin
  vesisäiliö ja Medusan päät, Theodosiuksen obeliski, lautat,
  balık ekmek, tulppaanit, mehter-soittokunta.

**Johtopäätös:** Hagia Sofian perusjuttu, Topkapın perusjuttu,
Suuri basaari perusjuttuna, Galatan torni, Neitsyttorni, Sirkeci,
Orient-pikajunan avausvuosi 1883, Yerebatan/Medusa, obeliski, Gli
ja katukissojen perusidea OVAT JO PELISSÄ. Alla olevat täkyt on
valittu välttämään päällekkäisyys: ne ovat joko uusia paikkoja,
uusia henkilöitä tai selvästi eri kulma jo kerrottuun. Päällekkäisyys
on merkitty kohteittain.

---

## Täkyt

### 1. Pylväs, joka tuotiin Delfoista — ja jonka leuka lyötiin irti

Sultanahmetin aukiolla (entisellä hippodromilla) seisoo kiertyneistä
pronssikäärmeistä tehty pylväs. Se ei ole Istanbulista: se pystytettiin
alun perin **Delfoihin** vuonna 478 eaa. voitonlahjaksi Apollonille sen
jälkeen, kun kreikkalaiset kaupunkivaltiot olivat lyöneet persialaiset
Plataian taistelussa. Konstantinus Suuri siirsi sen uuteen
pääkaupunkiinsa vuonna 324. Kolme käärmeenpäätä pysyivät paikoillaan
1600-luvun loppuun asti; yleisin kertomus sanoo, että Mehmed II löi
yhden alaleuan irti nuijallaan valloitusretkellään voimannäytöksi.
Vuonna 1855 pylvään jalusta kaivettiin esiin, ja kierteistä paljastui
kaiverrus: 31 kreikkalaisen kaupungin nimeä.

- **Paikka:** Käärmepylväs (Yılanlı Sütun), Sultanahmetin aukio,
  hippodromin keskilinja. Yksi säilynyt käärmeenpää on Istanbulin
  arkeologisessa museossa.
- **Lähde:** en.wikipedia.org/wiki/Serpent_Column
- **Lainaus/perustelu:** "It is part of an ancient Greek sacrificial
  tripod, originally in Delphi and relocated to Constantinople by
  Constantine the Great in 324. It was built to commemorate the Greeks
  who fought and defeated the Persian Empire at the Battle of Plataea
  (479 BC)." · "The accepted version states that Mehmed II shattered
  it upon entering the city in triumph as its conqueror." · "The base
  of the column was excavated in 1855, under the supervision of
  Charles Thomas Newton... The 13th coil carries the Laconic
  inscription: 'Those who fought the war', followed on coils 12 to 3
  by the names of 31 city states."
- **Varmuus:** VARMA. HUOM lähde itse varaa leuka-tarinan: se on
  "accepted version", ja muut ottomaanikirjoittajat nimeävät tekijäksi
  Selim II:n, Suleiman II:n tai Murad IV:n. Kaikki kolme päätä
  putosivat lopulta 20.10.1700 (Silahdar Findiklili Mehmed Agan
  mukaan) — sanamuoto on siis "kerrotaan", ei "Mehmed löi".
- **Kuva:** Commons **Istanbul hippodrome Serpentine Column.JPG**
  (640×853, CC BY-SA 2.5, Medvedev, 2006) tai isompana **Snake column
  Hippodrome Constantinople 2007.jpg** (1521×3061, public domain,
  Gryffindor). Käärmeenpää museossa: **Head serpent Hippodrome
  Istanbul Museum.JPG** (640×480, CC BY-SA 4.0, Gryffindor).
- **KREIKKA-JATKUMO:** tämä on koko listan vahvin silta Ateenasta
  Istanbuliin — Delfoi on jo pelin fokuskohde (`delfoi`,
  fokuskohteet-grc.js), ja Plataia liittyy suoraan persialaissotiin,
  joista pelissä puhutaan Akropolis-jutussa (Persian tuho 480 eaa.).

### 2. Viikingin nimikirjoitus tuhatvuotisen kirkon kaiteessa

Hagia Sofian yläkerroksen marmorikaiteesta löytyy riimukirjoitus,
jonka uskotaan olevan varjagikaartin — keisarin skandinaavisen
henkivartioston — jäsenen tekemä. Kaiverrus on kulunut niin pahoin,
että siitä erottuu enää `-ftan`, eli pohjoismainen nimi **Halfdan**.
Loppuosa on lukukelvoton, mutta se noudatti todennäköisesti tavallista
kaavaa "NN kaiversi nämä riimut". Kukaan ei huomannut sitä ennen kuin
vuonna 1964.

- **Paikka:** Hagia Sofia, eteläisen gallerian ylin kerros. (Toinen
  riimukirjoitus löydettiin 1975 saman gallerian pohjoisosan syvennyksestä.)
- **Lähde:** en.wikipedia.org/wiki/Runic_inscriptions_in_Hagia_Sophia
  ja en.wikipedia.org/wiki/Hagia_Sophia
- **Lainaus/perustelu:** "The first runic inscription was discovered
  in 1964 on a parapet on the top floor of the southern gallery... The
  inscription is worn down so nowadays only -ftan, which is the Norse
  name Halfdan, is legible. The remainder of the inscription is
  considered to be illegible, but it is possible that it followed the
  common formula 'NN carved these runes'." · Hagia Sophia -artikkeli:
  "The northern first floor gallery contains runic graffiti believed
  to have been left by members of the Varangian Guard."
- **Varmuus:** VARMA löydöstä ja lukutavasta. EPÄVARMA toisen
  kaiverruksen tulkinta — lähde kertoo itse, että tutkijat kiistelevät,
  lukeeko siinä "Ári" vai "Árni", eikä sitä ole rekisteröity. Käytä
  vain Halfdan-kaiverrusta.
- **Kuva:** Commons **Hagia Sophia Halfdan inscription -
  Halvdan-Inschrift der Hagia Sophia.jpg** (500×170, public domain,
  tekijä tuntematon) — pieni mutta juuri oikea aihe; suurempi
  vaihtoehto **PXL 20241210 064800376.MP Hagia Sophia Grand Mosque
  Ayasofya-i Kebir Cami-i Şerifi Istanbul Turkey Halfdan inscription
  Viking runic inscription 21.jpg** (4080×3072, CC BY-SA 4.0,
  Sourabh.biswas003, 2024).
- **1873-HUOMIO:** isoisä EI olisi voinut nähdä tätä — kaiverrus
  löydettiin vasta 1964. Hyvä pöllön repliikki: "sinä tiedät jotain,
  mitä isoisäsi ei tiennyt".

### 3. Ristiretkeläisen hauta, joka ei ole hauta

Hagia Sofian yläparvella on kivilaatta, jossa lukee ENRICO DANDOLO.
Venetsian doge Dandolo johti neljättä ristiretkeä ja Konstantinopolin
ryöstöä 1204 — sokeana ja lähes satavuotiaana — ja hänet haudattiin
valloitettuun kirkkoon 1205. Hauta on tyhjä. Kun bysanttilaiset
valtasivat kaupungin takaisin 1261, keisari Mikael VIII käski heittää
jäännökset Bosporiin. Laatta, jonka turistit yhä kuvaavat, on
1800-luvulla italialaisen restaurointiryhmän paikalle asettama
muistokivi — ei keskiaikainen.

- **Paikka:** Hagia Sofia, itäinen yläparvi.
- **Lähde:** en.wikipedia.org/wiki/Enrico_Dandolo ja
  en.wikipedia.org/wiki/Hagia_Sophia
- **Lainaus/perustelu:** "Dandolo died in May or June 1205... and was
  buried in the Hagia Sophia in Constantinople. In 1261, upon retaking
  the city, the Byzantines desecrated the tomb to remove the remnants
  of their invader as Emperor Michael VIII Palaiologos ordered his
  remains to be thrown into the Bosporus... In the 19th century an
  Italian restoration team placed a cenotaph marker near the probable
  location, which is still visible today. The marker is frequently
  mistaken by tourists as being a medieval marker of the actual tomb
  of the doge."
- **Varmuus:** VARMA laatasta ja siitä, että se on 1800-luvun tekoa.
  Lähde ITSE toteaa jäännösten kohtalon epävarmaksi: "various legends
  attribute this destruction to the times of the Byzantine reconquest
  ... or shortly after the Ottoman conquest". Lisäksi TRT:n
  dokumentti 2021 väitti georadarilla löytäneensä luurangon noin
  50 cm laatan alta — tämä on YKSITTÄINEN TV-VÄITE, ei
  tutkimustulos; jos se mainitaan, se on kehystettävä sellaiseksi.
- **Sokeus:** Dandolon sokeuden syy on lähteessä kiistanalainen
  (bysanttilaiset sokaisivat / kallovamma 1174–76). Villehardouinin
  aikalaiskuvaus on turvallinen: "although his eyes appeared normal,
  he could not see a hand in front of his face."
- **Kuva:** Commons **Enrico Dandolo gravestone.jpg** (2855×1715,
  CC BY-SA 3.0, Myrabella, 2012) tai **DSC04057 Istanbul - Aya Sophia
  - Tomba del doge Enrico Dandolo - Foto G. Dall'Orto 24-5-2006.jpg**
  (1600×1200, CC BY-SA 2.5 it).
- **BYRON-KYTKÖS:** lordi Byron kirjoitti Dandolosta Childe Haroldiin
  ("Oh, for one hour of blind old Dandolo!"). Byron on jo pelin
  Kreikka-aineistossa (takyt-ateena.md täky 8 ja 18).

### 4. Kaksi veljestä paljasti mosaiikit — ja maalasi ne takaisin piiloon

Vuosina 1847–1849 sveitsiläis-italialaiset arkkitehtiveljekset Gaspare
ja Giuseppe Fossati kunnostivat Hagia Sofian sulttaani Abdülmecid I:n
käskystä, 800 työmiehen voimin. Työn aikana he löysivät seinien
rappauksen alta bysanttilaisia mosaiikkeja. Sulttaani antoi luvan
dokumentoida ne — mutta ei jättää niitä näkyviin: veljekset piirsivät
jokaisen löytämänsä kuvan ja **maalasivat sen sitten uudelleen
umpeen**. Piirrokset ovat yhä olemassa Ticinon kantonin arkistossa,
ja ne ovat nykyään ainoa jäljellä oleva todiste useista mosaiikeista,
jotka tuhoutuivat vuoden 1894 maanjäristyksessä.

- **Paikka:** Hagia Sofia, sisätila; kahdeksan jättimäistä
  kalligrafiakiekkoa (Allah, Muhammad, neljä ensimmäistä kalifia,
  Hasan ja Husayn) ovat samasta remontista.
- **Lähde:** en.wikipedia.org/wiki/Hagia_Sophia, osiot "Renovation of
  1847–1849" ja "Mosaics".
- **Lainaus/perustelu:** "This work did not include repairing the
  mosaics, and after recording the details about an image, the
  Fossatis painted it over again." · "The Fossati records are the
  primary sources about a number of mosaic images now believed to have
  been completely or partially destroyed in the 1894 Istanbul
  earthquake." · "Eight new gigantic circular-framed discs or
  medallions were hung from the cornice..." · Vihkiminen uudelleen
  13.7.1849.
- **Varmuus:** VARMA — suoraan lähteessä.
- **Kuva (ERINOMAINEN 1873-KUVA):** Fossatin piirrosten pohjalta
  julkaistiin Lontoossa 1852 litografiakokoelma. Commons:
  **Gaspare Fossati - Louis Haghe - Vue générale de la grande nef, en
  regardant l'occident (Hagia Sophia - Ayasofya Mosque nave).png**
  (2388×3128, public domain, 1852) tai **Hagia Sophia 1852.jpg**
  (2343×1650, public domain, Louis Haghe / Gaspard Fossati, 1852).
  Nämä näyttävät TÄSMÄLLEEN sen sisätilan, jonka isoisä olisi nähnyt
  1873 — 21 vuotta vanhemmasta kuvasta, remontin jäljiltä.

### 5. Pylväs, jota koko maailma on hieronut peukalollaan

Hagia Sofian luoteiskulmassa on pylväs, jonka keskellä on pronssilevyin
peitetty reikä. Sitä kutsutaan hikoilevaksi pylvääksi, itkeväksi
pylvääksi ja toivepylvääksi. Legendan mukaan se on ollut kostea siitä
asti, kun pyhä Gregorios Ihmeidentekijä ilmestyi sen luona vuonna 1200,
ja kosteuden koskettamisen uskotaan parantavan tauteja.

- **Paikka:** Hagia Sofia, luoteiskulma.
- **Lähde:** en.wikipedia.org/wiki/Hagia_Sophia
- **Lainaus/perustelu:** "At the northwest of the building, there is a
  column with a hole in the middle covered by bronze plates. This
  column goes by different names; the 'perspiring' or 'sweating
  column', the 'crying column', or the 'wishing column'. Legend states
  that it has been moist since the appearance of Gregory Thaumaturgus
  near the column in 1200. It is believed that touching the moisture
  cures many illnesses."
- **Varmuus:** VARMA legendan olemassaolosta — lähde kertoo sen
  legendana ("Legend states", "It is believed"), ei faktana.
  Kirjoitusasu on siis "kerrotaan" / "uskotaan", ei "pylväs hikoilee".
- **Kuva:** Commons **Istanbul.Hagia Sophia052.jpg** (1536×2048,
  CC BY-SA 3.0, Georges Jansoone JoJan, 2007). HUOM: kuvaa ei ole
  katsottu silmin — tarkista, että se todella esittää tätä pylvästä.
- **Varmuustaso alempi kuin muilla:** vain yksi kuvakandidaatti
  löytyi haulla, eikä sen aihetta ole vahvistettu tiedostonimestä.

### 6. Maanalainen rata, joka rakennettiin ennen kuin sitä uskallettiin käyttää — ja jonka isä ei tullut avajaisiin

Vuonna 1867 ranskalainen insinööri Eugène-Henri Gavand tuli
Konstantinopoliin turistina ja hämmästyi: Galatan pankkikorttelin ja
Peran hotellien välillä oli 24 prosentin rinne, jota kiipesi joka päivä
keskimäärin **40 000 ihmistä**. Hän suunnitteli tunnelivaunun.
Sulttaani Abdülaziz myönsi luvan 10.6.1869, mutta Preussin hyökkäys
Ranskaan kaatoi rahoituksen; Gavand perusti yhtiön Britanniaan.
Rakentaminen alkoi 30.7.1871 ja viivästyi maanomistajien riidoissa.
Tunneli valmistui joulukuussa 1874 ja avattiin liikenteelle
**17.1.1875** — maailman toiseksi vanhin maanalainen kaupunkirata
Lontoon metron (10.1.1863) jälkeen. Gavand oli avajaisista poissa.

- **Paikka:** Tünel, Karaköy–Beyoğlu, 554,8 m pitkä tunneli;
  yläasema on 61,55 m alempaa korkeammalla.
- **Lähde:** en.wikipedia.org/wiki/Tünel
- **Lainaus/perustelu:** "The Tünel was inaugurated on January 17,
  1875, making it the second-oldest underground urban railway in the
  world after the London Underground which opened on January 10,
  1863." · "Yüksek Kaldırım (High Pavement) Avenue, saw an average of
  40,000 people walking up and down it daily." · "On 10 June 1869
  Sultan Abdülaziz granted Gavand a concession... Construction began
  on 30 July 1871 but was delayed by conflicts between landowners and
  the company. The tunnel was not completed until December 1874, and
  finally opened for service on 17 January 1875. Gavand was notably
  absent at the opening ceremony."
- **Varmuus:** VARMA — suoraan lähteessä. **TEHTÄVÄNANNON TARKISTUS
  TEHTY: Tünel avattiin 17.1.1875, EI 1873.** Vuonna 1873 se oli
  keskeneräinen työmaa — isoisä olisi nähnyt kaivutyöt, ei junaa.
- **Bonus 1873-yleisölle:** alkuperäinen kalusto oli kaksi puista
  kaksivaunuista junaa, joita veti höyrykone. Toinen vaunu oli
  matkustajille (miehille ja naisille erilliset osastot), toinen
  tavaralle, eläimille ja kärryille.
- **Kuva:** Commons **Istanbul asv2020-02 img01 Tünel Karaköy
  station.jpg** (7364×4909, FAL, A.Savin, 2020) tai **Karaköy
  İstasyonunda bulunan maket (Tünel).jpg** (4032×3024, CC BY 4.0,
  Kayra, 2024 — pienoismalli asemalla). HUOM: FAL (Free Art License)
  on vapaa lisenssi mutta EI CC — jos pelin sääntö on tiukasti
  "PD/CC", käytä Kayran CC BY 4.0 -kuvaa.

### 7. Pankkiiri, joka kuoli isoisän matkavuonna — ja jonka portaat ovat yhä paikallaan

Kreivi Abraham Salomon Camondo oli Istanbulin juutalaisen yhteisön
patriarkka ja ottomaanihallituksen pankkiiri ennen kuin Ottoman Bank
oli olemassa. Hän perusti 1858 koulun Peri Paşan köyhimpään
kaupunginosaan — ja **osa rabbeista julisti hänet pannaan** siitä
hyvästä. Koulu toimi 32 vuotta ja koulutti valtaosan Ottomaanien
hallinnon juutalaisista virkamiehistä. Camondo kuoli 92-vuotiaana
Pariisissa **30.3.1873**, ja hänen toiveensa mukaan hänet haudattiin
Hasköyn juutalaiselle hautausmaalle Istanbuliin; hautajaiset pidettiin
**14.4.1873** ja ottomaanihallitus järjesti muistotilaisuuden.

- **Paikka:** Camondon portaat (Kamondo Merdivenleri), Bankalar
  Caddesi, Galata/Karaköy. Hauta: Hasköyn juutalainen hautausmaa.
- **Lähde:** en.wikipedia.org/wiki/Abraham_Salomon_Camondo ja
  en.wikipedia.org/wiki/Camondo_Stairs
- **Lainaus/perustelu:** "Count Abraham Salomon Camondo (1781,
  Istanbul – 30 March 1873, Paris)..." · "he founded in 1858 an
  educational institution, the Institution Camondo, at Peri Pasha, the
  poorest and most densely populated suburb of the capital... On
  account of this school, its benevolent founder was excommunicated by
  certain fanatical rabbis... yet it flourished for thirty-two years."
  · "buried according to his final wishes in his family's vault at the
  Jewish cemetery in Hasköy, Istanbul. His funeral took place on 14
  April 1873." · Camondo Stairs: "built circa 1870–1880 by the
  renowned Ottoman-Venetian Jewish banker Abraham Salomon Camondo...
  to provide an easy connection between Kart Çınar Sokak, where he
  lived, and Bankalar Caddesi, where he worked."
- **Varmuus:** VARMA kuolinpäivästä, hautajaispäivästä, koulusta ja
  pannaan julistamisesta. **EPÄVARMA portaiden ajoitus:** artikkeli
  antaa "circa 1870–1880", mutta Camondo asui Pariisissa vuodesta 1869
  ja kuoli 1873 — eli osa väitetystä rakennusajasta on hänen
  kuolemansa jälkeen. Älä väitä, että isoisä olisi nähnyt portaat
  1873; sano "1870-luvulla rakennetut". Tämä ristiriita on Wikipedian
  omassa tekstissä eikä ratkea tällä lähteellä.
- **Kuva:** portaat: Commons **KamondoMerdiveni1.jpg** (2592×1944,
  public domain, User:Danbury, 2008). Muotokuva: **Abraham Salomon
  Camondo.jpg** (298×481, public domain, Léon Joly de Saint François /
  Abdullah frères, n. 1868) tai isompana **Abraham Salomon de
  Camondo.jpg** (2565×2388, public domain, n. 1860). Aikalaiskuva
  portaista: **Istanbul- (Kamondo) Treppe in Galata - LABW -
  Staatsarchiv Freiburg W 134 Nr. 012564.jpg** (1322×1696, CC BY 4.0,
  Willy Pragher, 7.6.1937).
- **1873-KYTKÖS:** yksi koko listan tarkimmista. Isoisän matkavuonna
  Istanbulin varakkain pankkiiri kuoli, ja hänen ruumiinsa tuotiin
  Pariisista takaisin kaupunkiin haudattavaksi.

### 8. Yö, jolloin basaari avattiin — kerran viidessäsadassa vuodessa

Suuri basaari suljettiin joka ilta rautaportein, ja sisään pääsi
yöllä vain sulttaanin määräyksellä. Basaarin koko historian ainoa
virallinen yöavaus tapahtui **vuonna 1867**, kun juhlittiin sulttaani
Abdülazizin paluuta Egyptistä: hallitsija ratsasti hevosella
valaistun basaarin läpi riemuitsevan väkijoukon keskellä. Kauppiaiden
kiltojen palkkaamat vartijat kiertelivät käytäviä öisin, ja
Bedestenin holvikellareita käytettiin suoraan kassaholveina. Erään
englantilaisen matkaajan mukaan noin vuonna 1870 kierros
sisäbedestenissä olisi voinut "helposti tuhota muutaman
Rothschild-suvun".

- **Paikka:** Kapalıçarşı, sisäbedesten (Cevahir Bedesten).
- **Lähde:** en.wikipedia.org/wiki/Grand_Bazaar,_Istanbul
- **Lainaus/perustelu:** "Gates were always closed at night, and the
  bazaar was patrolled by guards paid by the merchants' guilds. In
  order to access the complex during night hours, an imperial edict
  was required. The only official night opening in the history of the
  Bazaar occurred in 1867 during the feast organized for the return of
  Sultan Abdülaziz from Egypt, when the sovereign crossed the
  illuminated market riding a horse among the rejoicing populace.
  Despite the immense wealth present in the Bazaar over the
  centuries—as an English traveller recorded as late as c. 1870, a
  tour of the inner Bedesten could easily ruin a few Rothschild
  families—theft occurred extremely rarely." · "the Bedesten's Mahzen
  were also used as safes."
- **Varmuus:** VARMA — suoraan lähteessä. Rothschild-lainaus on
  Wikipedian oma tiivistys nimeämättömästä englantilaisesta
  matkaajasta; käytä muodossa "erään englantilaisen matkaajan mukaan".
- **Kuva:** ei omaa kuvaa varmennettu tähän tarkkaan aiheeseen.
  Aikalaiskuva basaarialueesta: Commons **Yeni Cami mosque and
  Eminönü bazaar, Constantinople, Turkey LCCN2003653120.tif**
  (3612×2643, public domain, Library of Congress, 1890). Basaarin
  nykykuva on jo pelissä (`Grand Bazaar (Istanbul).jpg`,
  nahtavyysjutut.js).
- **PÄÄLLEKKÄISYYS:** Suuri basaari on jo pelissä, mutta nykyinen
  juttu kertoo katujen määrästä, paloista ja maanjäristyksistä — ei
  yöavauksesta eikä turvajärjestelyistä. Ei toistoa.

### 9. Kengän väristä näki uskonnon

Ennen vuoden 1894 maanjäristystä ja sitä seurannutta korjausta Suuressa
basaarissa ei ollut kauppoja länsimaisessa mielessä: kauppiaat istuivat
puisilla divaaneilla hyllyjensä edessä, kukin 1,8–2,4 metrin levyisessä
ja 0,9–1,2 metrin syvyisessä kojussa (*dolap*), joka illalla vedettiin
verhoilla kiinni. Mainoksia ei ollut lainkaan. Kenkäkujalla korkeilla
hyllyillä oli tuhansia kenkiä eri väreissä — ja väri oli
lainsäädäntöasia: ottomaanien pukeutumislait määräsivät muslimeille
keltaiset kengät, kreikkalaisortodokseille siniset, juutalaisille
mustat ja armenialaisille punaiset.

- **Paikka:** Kapalıçarşı, Pabuççular Pazarı (kenkämarkkinat).
- **Lähde:** en.wikipedia.org/wiki/Grand_Bazaar,_Istanbul
- **Lainaus/perustelu:** "Until the restoration following the quake of
  1894, the Grand Bazaar had no shops as found in the western world:
  along both sides of the roads merchants sat on wooden divans in
  front of their shelves. Each of them occupied a space 6 to 8 feet
  (1.8 to 2.4 m) in width, and 3 to 4 feet (0.91 to 1.22 m) in
  depth... At the end of the day, each stall was closed with drapes.
  Another peculiarity was the complete lack of advertising." · "the
  shoe market (Turkish: Pabuççular Pazarı), where thousands of shoes
  of different colors (Ottoman sumptuary laws prescribed yellow shoes
  for Muslims, blue for Greek Orthodox, black for Jews and red for
  Armenians) were on display on high shelves."
- **Varmuus:** VARMA — suoraan lähteessä.
- **1873-KYTKÖS:** tämä on tarkalleen se basaari, jonka isoisä näki.
  Nykyinen basaari on 1894 jälkeinen; vuonna 1873 kauppias istui
  divaanilla, mainoksia ei ollut, ja kenkien värit kertoivat, kuka
  kaupungissa oli kuka. Erinomainen matkakirjamerkinnän aihe.
- **Kuva:** ks. täky 8.

### 10. Timantti, jonka myyjä luuli lasinpalaksi — ja joka saattoi olla Kreikan Ali-pashan

Topkapın aarrekammiossa on Lusikkamestarin timantti, hopeaan kehystetty
ja 49 hiotun timantin kahden kehän ympäröimä. Legendan mukaan visiiri
osti sen basaarista mieheltä, joka luuli sitä arvottomaksi
kristallinpalaseksi. Wikipedian mukaan todennäköisempi selitys on
karumpi: kivi oli **Tepedelenli Ali-pashan** omaisuutta, ja sulttaani
takavarikoi sen tämän teloituksen jälkeen. Samassa salissa on
Topkapın tikari, jonka kultakahvassa on kolme suurta smaragdia ja
kannessa kello: sulttaani Mahmud I teetti sen vuonna 1747 lahjaksi
Persian Nader Shahille — mutta shaahi murhattiin kapinan yhteydessä
ennen kuin lähetti oli ehtinyt ottomaanien rajojen ulkopuolelle.
Lahja jäi kotiin.

- **Paikka:** Topkapın palatsi, aarrekammio (hazine), toinen ja kolmas
  huone.
- **Lähde:** en.wikipedia.org/wiki/Topkapı_Palace
- **Lainaus/perustelu:** "In 1747, the Sultan Mahmud I had this dagger
  made for Nader Shah of Persia, but the Shah was assassinated in
  connection with a revolt before the emissary had left the Ottoman
  Empire's boundaries." · "The most eye-catching jewel in the third
  room is the Spoonmaker's Diamond, set in silver and surrounded in
  two ranks with 49 cut diamonds. Legend has it that this diamond was
  bought by a vizier in a bazaar, the owner thinking it was a
  worthless piece of crystal. Another, perhaps more likely history for
  the gem places it among the possessions of Tepedeleni Ali Pasha,
  confiscated by the Sultan after his execution."
- **Varmuus:** VARMA tikarin tarinasta. Timantin alkuperä on lähteen
  itsensä mukaan kiistanalainen — kerro molemmat versiot, älä valitse.
- **KREIKKA-JATKUMO:** Tepedelenli Ali-pasha on sama Ioanninan
  Ali-pasha, joka on jo pelin fokuskohteessa `ioannina`
  (fokuskohteet-kreikka.md, kohde 3) ja jonka pää vietiin
  Konstantinopoliin (takynostot-kreikka.md, ehdokas 18). Timantti
  sulkee ympyrän: sekä pää että omaisuus päätyivät tähän kaupunkiin.
- **IKÄSOPIVUUSRAJAUS:** Ali-pashan teloitusta ei kuvailla, vain
  todetaan omaisuuden takavarikko. Sama rajaus kuin
  fokuskohteet-kreikka.md:ssä.
- **Kuva:** Commons **Spoonmaker's Diamond, Topkapi Palace, Istanbul
  2023.jpg** (3024×4032, CC BY 4.0, Karakalem, 2023) tai
  **Spoonmaker's Diamond Topkapi Palace (52505698169).jpg**
  (4608×3456, CC BY-SA 2.0, Joe Wallace, 2022). Tikari:
  **Topkapi Knife 04 1993.jpg** (1806×2709, CC BY-SA 3.0, Hajotthu,
  1993).
- **PÄÄLLEKKÄISYYS:** nahtavyysjutut.js mainitsee molemmat esineet
  NIMELTÄ mutta ei kerro kummankaan tarinaa. Tämä täky täydentää,
  ei toista.

### 11. Portti, jonka joku unohti sulkea — ja jota tutkijat epäilevät yhä

Konstantinopolin Theodosiuksen muurit kestivät piirityksiä lähes
tuhat vuotta. Historioitsija Doukasin mukaan aamulla **29.5.1453**
pieni sivuportti nimeltä Kerkoporta jäi vahingossa auki, ja siitä
pääsi sisään noin viisikymmentä ottomaanisotilasta. He nostivat
lippunsa sisemmän muurin harjalle, puolustajien rivit hajosivat
paniikissa, ja kaupunki kaatui. Vuonna **1864** kreikkalainen
tutkija A. G. Paspates löysi ulkomuurin päästä sivuportin jäänteet ja
tunnisti ne Kerkoportaksi. Myöhemmät kaivaukset eivät kuitenkaan ole
löytäneet vastaavaa porttia sisemmästä muurista — ja osa
historioitsijoista pitää koko tarinaa keksittynä tai vanhemman
legendan muunnelmana.

- **Paikka:** Theodosiuksen muurit, tornin 96 ja Porphyrogenituksen
  palatsin väli, muurien pohjoispää.
- **Lähde:** en.wikipedia.org/wiki/Walls_of_Constantinople
- **Lainaus/perustelu:** "According to the historian Doukas, on the
  morning of 29 May 1453, the small postern called Kerkoporta was left
  open by accident, allowing the first fifty or so Ottoman troops to
  enter the city... This spread panic, beginning the rout of the
  defenders and leading to the fall of the city. In 1864, the remains
  of a postern located on the outer wall... were discovered and
  identified with the Kerkoporta by the Greek scholar A.G. Paspates.
  Later historians, like van Millingen and Steven Runciman have
  accepted this theory as well. But excavations at the site have
  uncovered no evidence of a corresponding gate in the inner wall (now
  vanished) in that area, and it may be that Doukas' story is either
  invention or derived from an earlier legend."
- **Varmuus:** VARMA siitä, MITÄ lähteet sanovat — ja lähde itse
  toteaa tarinan kiistanalaiseksi. Tämä on täky, jonka koukku on
  nimenomaan epävarmuus: "kaatuiko tuhatvuotinen kaupunki yhteen
  unohdettuun oveen? Tutkijat eivät ole yksimielisiä." Älä kerro sitä
  varmana faktana.
- **1873-KYTKÖS:** tunnistus tehtiin 1864, yhdeksän vuotta ennen
  isoisän matkaa — eli 1873 se oli tuore ja kuuma arkeologinen uutinen
  juuri sellaiselle matkaajalle kuin isoisä.
- **Kuva:** Commons **Theodosian Walls of Constantinople, Istanbul
  (37905571151).jpg** (3277×2170, CC BY-SA 2.0, Carole Raddato, 2017)
  tai **Istanbul asv2021-11 img65 Walls of Constantinople.jpg**
  (7520×4230, FAL, A.Savin). HUOM: nämä ovat muureista yleensä, eivät
  väitetystä Kerkoportasta.

### 12. Linnoitus, jonne suurlähettiläs muutti — kun sota julistettiin

Yedikule ("Seitsemän tornin linnoitus") rakennettiin 1458 Mehmed II:n
käskystä valtakunnan aarrekammioksi: jokainen torni varastoi
kalleuksia, asiakirjoja, aseita ja kulta- ja hopeaharkkoja. Kun
aarteet siirrettiin 1500-luvulla Topkapıin, linnoituksesta tuli
arvovankila — ja tapa oli poikkeuksellinen: **sen valtion suurlähettiläs,
jonka kanssa ottomaanit olivat sodassa, teljettiin tavallisesti näiden
muurien sisälle.** Vuonna 1768 Venäjän suurlähettiläs Aleksei
Obreskov ja koko lähetystön henkilökunta suljettiin tänne — se oli
sodanjulistus Venäjälle.

- **Paikka:** Yedikule Hisarı, Fatih, vanhan Kultaisen portin
  (Altınkapı) ympärille rakennettu. Viimeinen vanki pidettiin siellä
  1837; museona vuodesta 1895.
- **Lähde:** en.wikipedia.org/wiki/Yedikule_Fortress
- **Lainaus/perustelu:** "Yedikule Fortress was frequently used as a
  state prison, and ambassadors of states currently at war with the
  Ottoman Porte were usually imprisoned within its walls." · "In 1768,
  the Russian ambassador Aleksei Mikhailovich Obreskov, and the entire
  Russian embassy's staff was imprisoned here, marking the Ottomans'
  declaration of war on Russia." · "Each tower of the Yedikule
  functioned as the storage of precious goods, documents, armoury,
  coins, and golden and silver ingots." · "The last prisoner was held
  in the Yedikule as late as 1837."
- **Varmuus:** VARMA — suoraan lähteessä.
- **KREIKKA-JATKUMO:** Napoleonin sotien aikana Yedikulessa istui yli
  kaksi vuotta (1799–1801) ranskalainen kirjailija ja diplomaatti
  **François Pouqueville**, joka kirjoitti linnoituksesta laajan
  kuvauksen. Pouqueville toimi myöhemmin Ranskan konsulina
  Ioanninassa Ali-pashan hovissa — sama hovi, joka on jo pelin
  fokuskohteessa `ioannina`.
- **IKÄSOPIVUUSRAJAUS:** artikkeli luettelee linnoituksessa
  teloitettuja (mm. sulttaani Osman II 1622). Nämä EI mukaan; tarina
  kantaa aarrekammiona ja diplomaattivankilana.
- **Kuva:** Commons **Yedikule 3390.jpg** (4928×3280, CC BY-SA 4.0,
  Dosseman, 2006) tai **Yedikule Fortress - The Castle of Seven Towers
  - panoramio.jpg** (3888×2592, CC BY-SA 3.0, Laima Gūtmane, 2011).
- **UUSI PAIKKA:** Yedikule EI ole pelin Istanbul-laudalla. Jos täky
  otetaan käyttöön, se on joko uusi laudan kohde tai fokuskohde.

### 13. Salmi, joka on nimetty lehmän mukaan

"Bosporos" on antiikin kreikkaa ja se on kansanetymologian mukaan
*boòs póros*, "karjan kulkupaikka" — aivan kuten Oxford on "härän
kahlaamo". Nimi liittyy taruun **Iosta**, jonka Zeus muutti lehmäksi
ja joka joutui vaeltamaan maailman ympäri, kunnes ylitti tämän salmen.
Vastarannalla, nykyisessä Üsküdarissa, sijainnutta paikkaa kutsuttiin
Boukseksi, "Lehmäksi" — ja myös Damalikseksi, "hiehoksi", koska
ateenalainen sotapäällikkö Chares pystytti sinne vaimonsa Damaliksen
muistoksi jättimäisen lehmäpatsaan.

- **Paikka:** Bosporinsalmi; Üsküdar (antiikin Khrysopolis).
- **Lähde:** en.wikipedia.org/wiki/Bosporus, osio "Name".
- **Lainaus/perustelu:** "The name of the strait comes from the
  Ancient Greek Βόσπορος (Bósporos), which was folk-etymologised as
  βοὸς πόρος, i.e. 'cattle strait' (like 'Ox-ford')... This is a
  reference to the Greek mythological story of Io, who was transformed
  into a cow and condemned to wander the Earth until she crossed the
  Bosporus." · "Io supposedly went ashore near Chrysopolis
  (present-day Üsküdar), which was named Bous 'the Cow'. The same site
  was also known as Damalis (Δάμαλις), as it was where the Athenian
  general Chares had erected a monument to his wife Damalis, which
  included a colossal statue of a cow."
- **Varmuus:** VARMA — suoraan lähteessä. Lähde itse kutsuu
  lehmäselitystä kansanetymologiaksi ("folk-etymologised"); kerro se
  siis tarinana nimestä, älä varmana kielitieteenä.
- **KREIKKA-JATKUMO:** sama Io kuin Joonianmeren nimiselityksessä
  (fokuskohteet-kreikka.md, kohde 11). Io ui Joonianmeren yli ja
  ylitti Bosporin — kaksi pelin merikohdetta samasta tarusta.
- **Kuva:** Commons **Istanbul and Bosporus big.jpg** (1000×1163,
  public domain, NASA/astronautin kuva ISS008-E-21752, 2004) —
  satelliittikuva, joka näyttää salmen kokonaisuutena. Üsküdar on jo
  pelissä omalla kuvallaan.

### 14. Bosporin pohjalla virtaa joki

Vuonna 2010 Leedsin yliopiston johtama tutkimusryhmä löysi Bosporin
pohjalta yhtenäisen vedenalaisen uoman: Marmaranmeren suolainen vesi
virtaa pohjaa pitkin Mustaanmereen omana "jokenaan", kun taas
kevyempi makea vesi virtaa pinnalla vastakkaiseen suuntaan. Uoma on
niin suuri, että jos se olisi maalla, se olisi maailman kuudenneksi
suurin joki. Tutkijat kuvasivat sen keltaisella robottisukellusveneellä
— ja huomasivat, että kaarteissa virtaus kiertyy päinvastaiseen
suuntaan kuin maanpäällisissä joissa.

- **Paikka:** Bosporinsalmi, pohja. Salmen syvyys vaihtelee 13–110
  metrin välillä (keskimäärin 65 m); syvin kohta on Kandillin ja
  Bebekin välissä.
- **Lähde:** en.wikipedia.org/wiki/Bosporus, osio "Newer explorations".
- **Lainaus/perustelu:** "Then in August 2010, a continuous
  'underwater channel' of suspension composition was discovered
  flowing along the floor of the Bosporus, which would be the sixth
  largest river on Earth if it were on land. The 2010 team of
  scientists, led by the University of Leeds, used a robotic 'yellow
  submarine' to observe detailed flows within this 'undersea river'...
  Specifically, as flow moves around a bend it spirals in the opposite
  direction in the deep sea compared to the spiral found in river
  channels on land." · "The southbound flow of water is 16 000 m3/s
  (fresh water at the surface) and the northbound flow is 11 000 m3/s
  (salt water near the bottom)."
- **Varmuus:** VARMA — suoraan lähteessä.
- **Kuva:** ei omaa kuvaa (vedenalainen ilmiö). Käytä salmen kuvaa,
  ks. täky 13.

### 15. Delfoin oraakkeli käski rakentaa "sokeiden kaupunkia vastapäätä"

Megaran kuningas Nisos lähetti poikansa **Byzasin** kysymään Delfoin
oraakkelilta, mihin uusi siirtokunta pitäisi perustaa. Vastaus oli
arvoitus: etsi maa "sokeiden kaupunkia vastapäätä". Kun Byzas saapui
Marmaranmeren ja Bosporin risteykseen, hän ymmärsi: vastarannalla oli
jo Khalkedon (nykyinen Kadıköy), joka oli perustettu 17 vuotta aiemmin
— ja jonka perustajat olivat sivuuttaneet Euroopan puolen aivan
ylivertaisen paikan. Herodotoksen mukaan persialainen kenraali
Megabazos oli sanonut samaa: Khalkedonin perustajien on täytynyt olla
sokeita. Niin syntyi Byzantion — myöhemmin Konstantinopoli, sitten
Istanbul.

- **Paikka:** Sarayburnu / vanhankaupungin niemi (Byzantion);
  Kadıköy = antiikin Khalkedon, "sokeiden kaupunki".
- **Lähde:** en.wikipedia.org/wiki/Byzas,
  en.wikipedia.org/wiki/Chalcedon ja en.wikipedia.org/wiki/Byzantium
- **Lainaus/perustelu:** Byzas: "After asking the oracle of Delphi,
  the Megarean king Nisos sent his son Byzas in search of 'the land
  opposite the city of the blind'... Byzas decided that Chalcedon was
  the prophesied 'city of the blind', as it had not taken advantage of
  the European shore." · Chalcedon: "According to Herodotus, Chalcedon
  (established by colonists from Megara c. 685 BC) became known as the
  'City of the Blind' because the site was so obviously inferior to
  that of Byzantium... the 6th-century BC Persian general Megabazus
  allegedly remarked that Chalcedon's founders must have been blind.
  Indeed, Strabo and Pliny relate that the oracle of Apollo told the
  Athenians and Megarians who founded Byzantium in 657 BC to build
  their city 'opposite to the blind'." · Byzantium: "Tradition says
  that Byzas of Megara (a city-state near Athens) founded the city...
  The date is usually given as 667 BC on the authority of Herodotus,
  who states the city was founded 17 years after Chalcedon."
- **Varmuus:** VARMA siitä, mitä antiikin lähteet kertovat.
  **HUOM PÄIVÄMÄÄRÄRISTIRIITA:** perustamisvuodeksi annetaan eri
  artikkeleissa 667 eaa. (Herodotos), 657 eaa. ja 656 eaa.
  (Eusebios). Sano "600-luvulla eaa.", älä valitse vuotta. Myös nimen
  alkuperä on epävarma: se voi olla traakialainen henkilönnimi Byzas,
  joka tarkoittaa "pukkia".
- **KREIKKA-JATKUMO:** Delfoi on jo pelin fokuskohde (`delfoi`), ja
  Megara on Ateenan naapurikaupunkivaltio. Tämä täky on suora silta
  Kreikan kartalta Turkin kartalle: sama oraakkeli, joka neuvoi
  kreikkalaisia, nimesi tämän kaupungin paikan.
- **Kuva:** Delfoista on kuva jo pelissä (fokuskohteet-grc.js).
  Istanbulin puolelle: ks. täky 13 (satelliittikuva näyttää tarkalleen
  sen asetelman, josta oraakkeli puhui — Kadıköy vastarannalla).

### 16. ELÄINTÄKY: kaupunki, jossa kissojen ruokkiminen oli ammatti

Istanbulin katukissoja arvioidaan olevan sadastatuhannesta yli
miljoonaan, eikä maassa saa ottaa niitä kiinni tai lopettaa niitä.
Kissat eivät ole tulleet kaupunkiin sattumalta: niitä tuotiin
kauppalaivoilla jo foinikialaisaikaan pitämään jyrsijäkanta kurissa,
ja ottomaanien aikaan lähes kaikki kaupungin talot olivat puuta, mikä
teki hiirten ja rottien torjumisesta välttämätöntä. Rakkaus kissoihin
synnytti kokonaisen ammatin: **mancacı**, kissanhoitaja, joka huolehti
kaupungin kissojen ruokkimisesta ja jolta asukkaat saattoivat ostaa
ruokaa syöttääkseen kissoja itse.

- **Paikka:** koko kaupunki. Nykyään jokaisella kunnalla on oma
  eläinlääkintäosasto kissoja varten ja ilmainen sterilointipalvelu;
  yksityisklinikat hoitavat katukissoja alennushinnoin ja asukkaat
  jakavat laskut keskenään.
- **Lähde:** en.wikipedia.org/wiki/Cats_in_Istanbul
- **Lainaus/perustelu:** "estimates ranging from a hundred thousand to
  over a million stray cats. Many Turkish citizens view street animals
  as communally owned pets rather than traditional strays, and the
  country has a blanket no-kill, no-capture policy." · "many cats
  arrived in the city on trading ships trading in Phoenician times,
  where they were used to keep the rodent populations down." · "during
  Ottoman times, the vast majority of Istanbul's houses were made of
  wood, which gave shelter and enabled the proliferation of the mouse
  and rat populations. This made cats' presence a necessity in the
  city." · "the love of the stray cats led to the creation of a
  full-time profession – that of the mancacı ('cat sitter'). Mancacıs
  ensured that the city's cats were fed, and residents could choose to
  purchase food from them and feed the cats themselves." · "Each local
  council has a veterinary department to serve the cats in their area,
  which also offers a free neutering service."
- **Varmuus:** VARMA siitä, mitä lähde sanoo. HUOM: kaikki nämä
  väitteet on Wikipediassa attribuoitu nimetyille henkilöille (Fatih
  Dağlı / Kissamuseo, Ayşe Sabuncu / Cats of Istanbul, Marcel Heijnen
  / City Cats of Istanbul) — eli ne ovat asiantuntijoiden kertomia,
  eivät akateemisesti todennettuja. Käytä muotoa "kerrotaan" /
  "Istanbulin kissamuseon mukaan".
- **1873-KYTKÖS:** mancacı-ammatti ja puutalot ovat ottomaaniajan
  ilmiöitä — eli isoisä olisi voinut nähdä kissanhoitajan työssään.
  Tämä on täkyn paras kulma.
- **IKÄSOPIVUUSRAJAUS (TÄRKEÄ):** sama artikkeli kertoo laajasti
  1830-luvun, 1920–40-luvun ja vuoden 1996 joukkotappokampanjoista
  kissoja ja koiria vastaan. **NÄITÄ EI mukaan.** Ne ovat tosia mutta
  aivan väärä sävy söpölle eläintäylle, ja Perustuslain
  ikäsopivuuskohta rajaa ne pois.
- **PÄÄLLEKKÄISYYS:** kulttuuri-kategoriat.js:ssä on jo nosto "Kadun
  kissat ovat kaikkien kissoja" (Gli, Obama, vesikuppi ja
  pahvilaatikko). **Mancacı, foinikialaislaivat, puutalot ja
  no-kill-laki EIVÄT ole siinä** — tämä täky laajentaa, ei toista.
  Gli-tarinaa ei saa toistaa.
- **Kuva:** Commons **Cats, Kadikoey, Istanbul (P1100168).jpg**
  (4000×3000, CC BY-SA 4.0, Matti Blume, 2019) — huomaa, että pelissä
  on jo saman kuvaajan sarjasta `Kadikoey, Istanbul (P1100156).jpg`,
  joten sarja on ennestään tuttu. Vaihtoehto: **Istanbul - cat of
  Sultanahmet.jpg** (5758×3239, CC BY 4.0, Jorge Franganillo, 2025)
  tai **Istanbul Stray Cat Food Vending Machine.jpg** (2304×4096,
  CC BY 4.0, Ultratweed, 2025 — katukissojen ruoka-automaatti,
  suora nykypäivän vastine mancacılle).

### 17. ELÄINTÄKY: haikarat kieltäytyvät lentämästä meren yli — siksi ne kulkevat Istanbulin kautta

Kattohaikara ei jaksa räpyttää siipiään pitkiä matkoja: se liitää
lämpimien nousuvirtausten varassa, ja lentäminen räpytellen kuluttaa
saman matkan kulkemiseen **23 kertaa enemmän rasvaa** kuin liitäminen.
Nousuvirtauksia ei synny meren yllä. Siksi Euroopasta Afrikkaan
muuttavat haikarat kieltäytyvät ylittämästä Välimerta ja kiertävät
sen joko lännestä Gibraltarin kautta tai idästä **Bosporin yli** —
ja koko itäisen Euroopan haikarakanta pakkautuu tuolle kapealle
maasillalle. Parvet kiertävät spiraalia ylöspäin lämpimässä ilmassa,
kunnes ovat 1 200–1 500 metrin korkeudessa, ja lähtevät sitten
liitämään.

- **Paikka:** Bosporinsalmi. Turkissa pesii noin 6 195 haikaraparia
  (2004/05-laskenta); Kreikassa 2 139.
- **Lähde:** en.wikipedia.org/wiki/White_stork ja
  en.wikipedia.org/wiki/Bird_migration
- **Lainaus/perustelu:** White stork, johdanto: "it avoids crossing
  the Mediterranean Sea and detours via the Levant in the east or the
  Strait of Gibraltar in the west, because the air thermals on which
  it depends for soaring do not form over water." · osio "Migration":
  "It has been estimated that flapping flight metabolises 23 times
  more body fat than soaring flight per distance travelled. Thus,
  flocks spiral upwards on rising warm air until they emerge at the
  top, up to 1,200–1,500 m (3,900–4,900 ft) above the ground." ·
  Bird migration: "birds from central Europe either follow an eastern
  migration route by crossing the Bosphorus in Turkey... These
  migration corridors maximise help from the thermals and thus save
  energy."
- **Varmuus:** VARMA — suoraan lähteissä.
- **EI VARMENNETTU:** en löytänyt Wikipediasta vahvistusta sille,
  että Çamlıcan kukkula (tai mikään muu nimetty paikka Istanbulissa)
  olisi klassinen haikaroiden tarkkailupaikka. **Älä nimeä
  katselupaikkaa** ilman uutta lähdettä; Çamlıca-artikkeli kertoo vain
  panoraamanäkymästä, ei linnuista.
- **Kuva:** Commons **Ciconia ciconia - White Stork 09.jpg**
  (4250×2833, CC BY-SA 4.0, Zeynel Cebeci, 2020 — turkkilaisen
  kuvaajan otos) tai muuttoparvi **Ciconia ciconia at Ain Sokhna by
  Hatem Moushir 1.JPG** (4928×3264, CC BY-SA 3.0, 2013).

### 18. ELÄINTÄKY: haikara, joka on palannut samalle kalastajalle joka kevät vuodesta 2010

Bursan maakunnassa, Uluabat-järven rannalla olevassa Eskikaraağaçin
kylässä (199 asukasta) asuu kalastaja Adem Yılmaz. Vuodesta 2010
lähtien sama kattohaikara — kylässä sitä kutsutaan nimellä **Yaren** —
on palannut Afrikan-muutolta joka maaliskuu samaan kylään ja laskeutuu
joka aamu Yılmazin pieneen veneeseen. Ne lähtevät kalaan yhdessä.
Paikallinen valokuvaaja Alper Tüydeş kuvasi ystävyyden ensimmäisen
kerran 2016, ja siitä tehtiin dokumentti, joka voitti parhaan
pitkän dokumentin palkinnon Prahan elokuvapalkinnoissa 2020. Kylän
keskusaukiolle on pystytetty patsas kalastajasta ja haikarasta.
Vuodesta 2020 Yaren on tuonut mukanaan puolisonsa, ja kesäkuussa 2021
suoralähetys näytti Yarenin suojelevan poikasiaan sateelta.

- **Paikka:** Eskikaraağaç, Karacabey, Bursan maakunta, Uluabat-järven
  rannalla. Kylä on Ramsar-kohde ja Euroopan haikarakylien verkoston
  jäsen vuodesta 2011; se on järjestänyt haikarafestivaalin vuosittain
  2005 alkaen.
- **Lähde:** en.wikipedia.org/wiki/Yaren_(stork) ja
  en.wikipedia.org/wiki/Eskikaraağaç,_Karacabey
- **Lainaus/perustelu:** "Since 2010, the bird leaves Africa each year
  during his annual migration, flies back in March to the same
  fisherman in the village on the shore of Uluabat Lake. Yaren, during
  the sixth months spent in Eskikaraağaç, a member of European Stork
  Villages Network, lands on the small boat of Adem Yılmaz every
  morning; they go fishing together." · "The extraordinary friendship
  with a human and a stork was first photographed by local
  photographer Alper Tüydeş in 2016... This unusual friendship was
  filmed as a documentary by Burak Doğansoysal in 2019. The film
  selected as the winner for 'Best Feature Documentary' at the 2020
  Prague Film Awards." · "In 2022, the municipality... installed a
  video camera next to Yaren's nest in the village for broadcasting a
  livestream from the spot."
- **Varmuus:** VARMA kaikesta yllä olevasta. **EPÄVARMA NYKYTILA:**
  Wikipedia-artikkelia ei ole päivitetty vuoden 2021 jälkeen, ja
  verkosta löytyi uutisotsikko haikaran "jäähyväisistä" 13 vuoden
  ystävyyden jälkeen. **Älä väitä, että ystävyys jatkuu vuonna 2026** —
  kirjoita menneessä aikamuodossa tai tarkista tilanne erikseen.
- **KREIKKA-JATKUMO:** kylän asukkaat ovat vuoden 1924 väestönvaihdon
  yhteydessä Kreikan Dramasta muuttaneiden jälkeläisiä (ja 1937
  Bulgariasta tulleita).
- **LIVE-KAMERA (omistajan pyyntö):** Karacabeyn kunta asensi 2022
  kameran pesän viereen 24/7-lähetystä varten.
  - `https://www.geocam.ru/en/online/yarenleylek/` — **vastasi
    HTTP 200** tarkistushetkellä 25.8.2026 (pelkkä vastauskoodi, ei
    varmennettu että kuva liikkuu).
  - `https://www.youtube.com/watch?v=ILEa3RogNEU` — YouTube-lähetys
    "Yaren Leylek Canlı Yayın". **EI voitu tarkistaa tästä
    ympäristöstä** (välityspalvelin palautti 429/captcha).
  - **TEKNINEN UPOTUS SELVITETÄÄN ERIKSEEN.** Tämä on pelkkä
    löydös, ei lupaus: kameran pysyvyyttä, upotusoikeuksia,
    tekijänoikeuksia, kausiluonteisuutta (haikara on kylässä vain
    n. 6 kk vuodesta) tai CSP-yhteensopivuutta ei ole selvitetty.
    Haikara on paikalla vain kevät–syksy, joten kamera on suuren osan
    vuodesta tyhjä pesä.
- **Kuva:** Commons **Adem Amca ve Yaren Leylek 2020.jpg** (5568×3480,
  CC BY-SA 4.0, Alpertuydes, 6.3.2020) — kuvaaja on sama Alper Tüydeş,
  joka nimetään Wikipedia-artikkelissa. **HUOM SILMÄTARKISTUS:** kuvassa
  on tunnistettava henkilö (Adem Yılmaz). Hän on julkisuuden henkilö
  tässä yhteydessä ja kuvaaja on julkaissut kuvan CC-lisenssillä, mutta
  pelin oma henkilökuvasääntö (herokuvien-silmatarkistus) on
  tarkistettava ennen käyttöä.

---

## Varapenkki (tarkistettuja, tiiviimmin)

### 19. Palatsi, joka oli vuoden vanha kun isoisä tuli — ja paloi 37 vuotta myöhemmin

Çırağanin palatsin rakennutti sulttaani Abdülaziz 1863–1867
armenialaisen hoviarkkitehti Nigoğayos Balyanin suunnitelmilla; hänen
poikansa Sarkis ja Hagop tekivät työn, ja sisustus valmistui vasta
**1872**. Ulkoseinät ovat värillistä marmoria, sisäseinät ja katto
puuta. Vuonna 1909 sulttaani Mehmed V antoi parlamentin kokoontua
siellä — ja kaksi kuukautta myöhemmin, 19.1.1910, suurpalo tuhosi
koko palatsin ulkomuureja lukuun ottamatta. Vuosikymmeniksi sen
puutarha toimi Beşiktaş-jalkapalloseuran kenttänä.

- **Lähde:** en.wikipedia.org/wiki/Çırağan_Palace
- **Varmuus:** VARMA — suoraan lähteessä.
- **1873-KYTKÖS:** ERINOMAINEN. Palatsi oli isoisän matkavuonna
  aivan uusi, juuri valmistunut.
- **Kuva:** Commons **Çırağan Palace, İstanbul (12967643005)
  (Colourised).jpg** (2037×2729, CC BY 4.0, Gargarapalvin, 2023 —
  väritetty vanha valokuva) tai nykykuva **Ciragan Palace 2014.JPG**
  (7360×4912, CC BY-SA 3.0, Wolfgang Moroder).
- **Ks. myös takynostot-turkki.md ehdokas 3** (Murad V:n kotiaresti
  samassa talossa) — tämä on saman paikan skandaalipuoli.

### 20. Sulttaani, joka sai Sukkanauhan ritarikunnan Victorialta

Abdülaziz oli ensimmäinen ottomaanisulttaani, joka matkusti
Länsi-Eurooppaan diplomaattisessa tarkoituksessa: 21.6.–7.8.1867 hän
kiersi Pariisin, **Lontoon**, Brysselin, Wienin ja Budapestin. Lontoossa
kuningatar Victoria teki hänestä Sukkanauhan ritarikunnan ritarin ja
hänelle näytettiin kuninkaallisen laivaston laivastokatselmus. Hän
matkusti omalla yksityisellä junavaunullaan, joka on nykyään Rahmi M.
Koç -museossa Istanbulissa. Pariisin, Lontoon ja Wienin museot
tekivät häneen niin suuren vaikutuksen, että hän määräsi perustettavaksi
Istanbuliin oman keisarillisen museon — nykyisen Istanbulin
arkeologisen museon.

- **Lähde:** en.wikipedia.org/wiki/Abdulaziz, osio "European tour".
- **Varmuus:** VARMA — suoraan lähteessä.
- **BRITTIKYTKÖS:** vahvin koko listalla brittiläiselle
  päähenkilölle. Isoisä matkusti 1873 maahan, jonka hallitsija oli
  kuusi vuotta aiemmin ollut Victorian vieras Lontoossa.
- **Kuva:** Commons **Sultan Abdulaziz of the Ottoman Empire.jpg**
  (1325×2000, public domain, W. & D. Downey, 1867) — lontoolaisen
  hovivalokuvaamon otos juuri siltä vuodelta. Vaihtoehto:
  **Sultan Abdül Aziz on horse back.jpg** (1292×1256, public domain,
  Stanisław Chlebowski, 1867).
- **IKÄSOPIVUUSRAJAUS:** Abdülaziz syöstiin vallasta 30.5.1876 ja
  löydettiin kuolleena kuusi päivää myöhemmin; Wikipedia kirjoittaa
  itsemurhasta. **TÄTÄ EI mukaan** — sama rajaus kuin
  takynostot-kreikka.md:ssä (Chalepas). Täky kantaa Lontoon-matkalla.

### 21. Konstantinuksen pylvään juurella oli Troijan Athene

Konstantinuksen pylväs (Çemberlitaş) on Istanbulin vanhin säilynyt
Konstantinuksen aikainen muistomerkki, vihitty 11.5.330. Sen huipulla
oli keisarin pronssipatsas, jonka kädessä olevan pallon kerrottiin
sisältävän palan tosi ristiä. Pylvään juurella oli pyhäkkö, johon oli
kerätty muun muassa Rooman *palladium* — puinen Pallas Athenen patsas
**Troijasta**. Vuonna 1106 myrsky kaatoi patsaan ja pylvään kolme
ylintä lohkoa; noin 1515 ottomaanit vahvistivat sen rautavantein,
mistä turkkilainen nimi Çemberlitaş, "vannekivi", on peräisin.

- **Lähde:** en.wikipedia.org/wiki/Column_of_Constantine
- **Varmuus:** VARMA siitä, mitä lähde kertoo. HUOM sanamuoto:
  "At the foot of the column was a sanctuary which contained relics
  allegedly from..." — lähde käyttää sanaa *allegedly*, eli kyse on
  siitä, mitä paikasta kerrottiin, ei siitä, mitä siellä todistetusti
  oli. Kirjoita "kerrottiin sisältävän".
- **TROIJA-KYTKÖS:** Troija on fokuskohteet-turkki.md:n kohde 1.
- **Kuva:** Commons **The Column of Constantine in Çemberlitaş
  (14666011491).jpg** (3881×2556, "No restrictions", SALTOnline) —
  huomaa, että lisenssi näkyy muodossa "No restrictions" eikä
  nimettynä CC-lisenssinä; tarkista Commonsin sivulta tarkka
  lisenssimerkintä ennen käyttöä. Vaihtoehto **Çemberlitaş Sütunu
  (89989).jpg** (1836×4080, CC BY-SA 4.0, Özgür Arda Bayram, 2026).

### 22. ELÄINTÄKY (varapenkki): Mustanmeren delfiini on oma alalajinsa — ja sen ainoa ovi maailmaan kulkee Istanbulin läpi

Mustanmeren pullokuonodelfiini (*Tursiops truncatus ponticus*) on oma
alalajinsa, ja se eroaa muista pullokuonodelfiineistä kallon
rakenteessa ja perimässä. Mustameri on yhteydessä muuhun maailmanmereen
vain Bosporinsalmen kautta — eli tämän delfiinin koko kotimeren ainoa
ovi kulkee suoraan Istanbulin keskustan halki. Delfiinit elävät
2–10 yksilön ryhmissä.

- **Lähde:** en.wikipedia.org/wiki/Black_Sea_bottlenose_dolphin
- **Varmuus:** VARMA alalajista, erosta ja ryhmäkoosta.
  **EI VARMENNETTU:** en löytänyt Wikipediasta vahvistusta sille, että
  delfiineitä näkisi säännöllisesti Bosporinsalmessa Istanbulin
  kohdalla. Se on laajalti kerrottu asia, mutta tässä haussa
  varmentamaton — **älä lupaa pelaajalle delfiinihavaintoja
  salmessa**, vaan kerro alalajista ja siitä, että Bosporinsalmi on
  sen kotimeren ainoa ovi (tämä osa on varmennettu).
- **Kuva:** ei etsitty tälle varapenkin kohteelle.

---

## Hylätyt / tarkistuksessa kaatuneet

1. **"Göbekli Tepe haudattiin tarkoituksella."** Erittäin laajalle
   levinnyt väite, joka EI enää päde: en-Wikipedian Göbekli
   Tepe -artikkeli kertoo, että hypoteesi rakenteiden täytemaasta
   muualta tuotuna on **hylätty** ("the abandonment of the hypothesis
   that the fill of the structures was brought from elsewhere"). Ei
   käyttöön missään muodossa.
2. **Hezârfen Ahmed Çelebin lento Galatan tornista 1638.** Täydellinen
   täkyaines — mutta se on JO PELISSÄ (nahtavyysjutut.js, Galatan
   torni -juttu). Ei uutena täkynä.
3. **Yerebatanin Medusan päät.** Sama syy: jo pelissä
   (kulttuuri-kategoriat.js). Uutena kulmana olisi ollut se, että
   Medusan päät paljastuivat vasta vuosien 1985–87 kunnostuksessa, kun
   säiliöstä poistettiin yli 50 000 tonnia lietettä — eli isoisä ei
   olisi voinut nähdä niitä. Tämä yksityiskohta on varmennettu
   (en.wikipedia.org/wiki/Basilica_Cistern) ja se voidaan haluttaessa
   lisätä olemassa olevaan juttuun yhtenä lauseena, mutta se ei
   riitä omaksi täyksi.
4. **Teloittajan suihkulähde Topkapıssa** (Cellat Çeşmesi, jossa
   teloittajan kerrotaan pesseen kätensä ja miekkansa). Varmennettu
   lähteestä — mutta lähde itse toteaa, että sen todellisesta
   käytöstä ollaan eri mieltä, ja aihe on Perustuslain
   ikäsopivuuskohdan mukaan rajattava pois. Ei käyttöön.
5. **Basaarin suurin varkaus 1591** (30 000 kultakolikkoa, basaari
   suljettuna kaksi viikkoa). Varmennettu — mutta artikkeli kertoo
   kidutuksesta ja hirttämisestä, ja ilman loppua tarina jää kesken.
   Rajattu pois ikäsopivuuden vuoksi; täky 8 kertoo saman asian
   (basaari oli kaupungin kassaholvi) ilman raskasta loppua.
6. **Istanbulin kissojen ja koirien joukkotapot** 1830-luvulla,
   1920–40-luvulla ja 1996. Kaikki varmennettu
   (en.wikipedia.org/wiki/Cats_in_Istanbul) — ja kaikki rajattu pois.
   Ks. täky 16.
7. **Sokrateen tyylinen "kaupungin perustaja"-tarina Byzasista
   yhdellä vuosiluvulla.** Perustamisvuosi vaihtelee lähteittäin
   (667 / 657 / 656 eaa.); yhtä vuotta ei saa väittää. Ks. täky 15.
8. **Orient-pikajunan ensimmäinen matka 1883.** JO PELISSÄ
   (nahtavyysjutut.js, Sirkecin asema). Tarkistin silti
   en.wikipedia.org/wiki/Orient_Express: ensimmäisillä vuosilla matka
   Konstantinopoliin EI ollut yhtenäinen junamatka — 4.10.1883
   alkaen matkustajat kuljetettiin lautalla Tonavan yli Giurgiusta
   Rusen kautta Varnaan ja loppumatka laivalla. Ensimmäinen suora juna
   lähti Pariisista vasta 1.6.1889. Tämä tarkennus voidaan haluttaessa
   lisätä olemassa olevaan Sirkeci-juttuun; ei omaksi täyksi.
9. **Pera Palace -hotelli** (rakennettu Orient-pikajunan matkustajille).
   Artikkeli haettu ja luettu, mutta hotelli on vuodelta 1892 — 19
   vuotta isoisän matkan jälkeen — eikä siitä löytynyt tästä
   artikkelista yhtä vahvaa koukkua kuin muista ehdokkaista. Jätetty
   pois tilan säästämiseksi, ei kaatunut tarkistuksessa.
10. **Robert College** (perustettu 16.9.1863 Bebekissä, vanhin
    yhtäjaksoisesti toiminut amerikkalainen koulu Yhdysvaltain
    ulkopuolella, perustajat Christopher Robert ja Cyrus Hamlin;
    ensimmäinen kampus rakennettiin sulttaanin luvalla kuusi vuotta
    perustamisen jälkeen Rumelin linnoituksen harjanteelle).
    Kaikki varmennettu — mutta se on enemmän oppikirjafakta kuin
    "täky". Rumelin linnoitus on jo pelin laudalla, joten tämä sopisi
    hyvin sen jutun laajennukseksi. Ei omana täkynä.
11. **Süleymaniyen ja Sinisen moskeijan tarinat.** Jo pelissä.
12. **Mimar Sinan.** Artikkeli haettu, mutta Sinan mainitaan jo sekä
    Süleymaniye-jutussa että Üsküdar-jutussa. Ei uutta täkyä ilman
    päällekkäisyyttä.

---

## Yhteenveto

**22 ehdokasta, kaikki tarkistettu; 18 varsinaista + 4 varapenkillä.**
Yksikään ei jäänyt kokonaan vahvistamatta. Seitsemässä kohdassa lähde
itse toteaa asian epävarmaksi tai kiistanalaiseksi (Käärmepylvään
leuka, Dandolon jäännökset, toinen riimukirjoitus, hikoileva pylväs,
Kerkoporta, Camondon portaiden ajoitus, Lusikkamestarin timantin
alkuperä) — merkitty kohdittain. Kaksi kohtaa on rajattu
ikäsopivuuden vuoksi (Ali-pashan teloitus, kissojen joukkotapot) ja
yksi väite hylätty kokonaan uusimman tutkimuksen perusteella
(Göbekli Tepen tarkoituksellinen hautaus).

**Eläintäkyjä: 3** (16 kissat/mancacı, 17 haikaramuutto Bosporin yli,
18 Yaren-haikara ja kalastaja) **+ 1 varapenkillä** (22 Mustanmeren
delfiini). Omistajan 25.8.2026 lisäys täytetty.

**Kolme parasta ehdotustani:**

1. **#1 — Pylväs, joka tuotiin Delfoista.** Tämä on koko paketin
   tärkein löytö. Se on yhtä aikaa (a) fyysinen esine, jota voi mennä
   koskettamaan Sultanahmetin aukiolla, (b) suora ja kirjaimellinen
   jatkumo Kreikan laudalta — Delfoi on jo pelin fokuskohde, ja tämä
   pylväs seisoi siellä ennen kuin keisari kantoi sen tänne, (c)
   koukku, jossa on kolme kerrosta: voitonlahja, irtilyöty leuka ja
   1855 esiin kaivettu 31 kaupungin nimilista. Pelaaja, joka on juuri
   löytänyt Kreikan aarteen, näkee Istanbulissa kirjaimellisesti
   saman esineen uudessa maassa. Aarrepelin kannalta tämä on täydellinen:
   aarteita on siirretty maasta toiseen kauan ennen Schliemannia.

2. **#7 — Pankkiiri, joka kuoli isoisän matkavuonna.** Tarkin
   1873-osuma koko listalla: Abraham Salomon Camondo kuoli 30.3.1873
   ja haudattiin Istanbuliin 14.4.1873 — eli isoisän matkan aikaan
   kaupungissa oli tuoreena uutisena rikkaimman pankkiirin paluu
   arkussa. Henkilö on aidosti kiinnostava (perusti köyhien koulun,
   joutui siitä pannaan, koulutti valtakunnan virkamiehet), ja
   Galatassa on yhä hänen mukaansa nimetyt portaat, joita voi kävellä.
   Sopii myös suoraan matkakirjan äänelle: isoisä olisi lukenut
   uutisen lehdestä.

3. **#18 — Yaren-haikara ja kalastaja.** Vahvin uusista eläintäyistä.
   Se lunastaa omistajan tilauksen (söpö, tosi, henkilövetoinen),
   sillä on Commonsissa juuri oikea CC-kuva juuri siltä kuvaajalta,
   joka mainitaan lähteessä, ja se kytkeytyy suoraan täkyyn 17
   (miksi haikarat ylipäätään tulevat Turkin kautta) ja
   fokuskohteeseen Bursa. Lisäksi se on ainoa kohde koko paketissa,
   jolla on olemassa oleva julkinen live-kamera — pesäkamera, jonka
   Karacabeyn kunta asensi 2022. Tekninen upotus on selvitettävä
   erikseen, eikä kameran toiminnasta luvata mitään.

Kunniamaininnat: **#9 (kengän väri kertoi uskonnon)** on paras puhtaasti
1873-kerroksen täky — se kuvaa juuri sen basaarin, jonka isoisä näki,
ja on poissa nykyisestä pelistä; **#6 (Tünel)** on paras "tarkista
vuosiluku" -täky, koska tehtävänannon oletus 1875:stä osui oikeaan ja
1873 oli työmaa; **#16 (mancacı)** on halvin toteuttaa, koska
kissasisältöä on jo pelissä ja tämä vain syventää sitä ottomaaniajan
ammatilla.
