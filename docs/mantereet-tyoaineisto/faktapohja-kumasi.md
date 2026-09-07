# Kumasi — faktakoostaja, uusi kaupunkilehti

Lauta-id `africa`, kaupunki-id `kumasi`, maa GHA, en-Wikipedia
"Kumasi". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/moduulit/kaupunkilehti.md`, `docs/aasia-tyoaineisto/
lehtityo-resepti.md` ja `docs/mantereet-tyoaineisto/spec-mantereet.md`.
Malli: Lagosin ja Fèsin lehdet (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Kumasi"**,
**"Asante Empire"**, **"Golden Stool"**, **"Okomfo Anokye"**,
**"Osei Kofi Tutu I"**, **"Anglo-Ashanti wars"**,
**"Kejetia Market"**, **"Manhyia Palace"**, **"Lake Bosumtwi"**,
**"Owabi Wildlife Sanctuary"**, **"Kumasi Zoo"**,
**"Prempeh II Jubilee Museum"**, **"Centre for National Culture
(Kumasi)"**, **"Asante Traditional Buildings"**, **"Rattray Park"**,
**"Armed Forces Museum (Ghana)"**, **"Komfo Anokye Teaching
Hospital"**, **"Ramseyer Memorial Presbyterian Church"**,
**"Baba Yara Stadium"**, **"Kumawood"**, **"Bonwire"**,
**"List of rulers of Asante"**, **"Kwame Nkrumah University of
Science and Technology"**, **"Adum"**, **"Bantama"**,
**"Wesley Methodist Cathedral (Kumasi)"**,
**"St Peter's Cathedral Basilica, Kumasi"**.

## 0. Rajaus tälle lehdelle

**Ghanan maalehti (js/packs/maa-kategoriat.js, GHA) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: Ghanan nimi lainattuna
tuhannen kilometrin päästä; **Bowdichin 1817 näkemä asantien
kuninkaanpalatsi, Winwood Reade 1874 ja Timesin numero 17.10.1843,
palatsin poltto 1874 sekä Manhyian palatsi 1925**; Tetteh Quarshie
ja kaakao 1876; itsenäisyys 6.3.1957 ja musta tähti; jollof, kenkey,
kalapippuri, kelewele; **kente ja Anansi-hämähäkki Bonwiressa**;
**adinkra-symbolit ja Bowdichin 1817 tuoma kangas**; **kultapunnukset
abrammuo**; ga-kansan fantasia-arkut; highlife, E. T. Mensah, gyil,
azonto; akan-päivänimet, Homowo, neljänkymmenen päivän suru, perintö
äidin kautta.

**Karttanostot on luettu eikä niitä toisteta:**
`js/packs/maastokohteet-gha.js` (Afadja, Guineanlahti, Voltajärvi,
Elminan linna, Kakumin puisto, Larabangan moskeija, Molen puisto,
Nzulezo, Osun linna, Pagan krokotiilit, Prinzensteinin linnake) ja
`js/packs/skandaalit.js` GHA (**"Jakkara, jolle kukaan ei istu" —
kultajakkaran sota 1900, kuvernööri Hodgson, Yaa Asantewaa,
Prempeh I:n maanpako, Fomenan 160 000 punnan korvaus**; Salagan
orjatori). `js/packs/elaintakyt.js` GHA: valkokaulakalliovaris.

**Tämä lehti pysyy kaupungissa:** nimen synty kum-puun alla, Osei
Tutu ja kultajakkaran synty 1695–1701, **vuosi 1873 ja kolmas
brittiläis-asantilainen sota**, kaupungin jälleenrakennus ja
väkilukukiista, Kumawood; teemasivulla Bosumtwe-järvi, kaksi
sadekautta, puutarhakaupungin kaava 1945, Owabin lintusuo ja
metsätalous.

**Kultajakkaran sota 1900 EI OLE tämän lehden aihe** — se on
GHA-skandaalin aihe kokonaisuudessaan (Hodgson, Yaa Asantewaa,
maanpako, jakkaran piilotus). Kultajakkaran **synty** vuonna 1695–1701
on eri asia ja se kerrotaan tässä lehdessä; skandaalikortti ei kerro
syntyä lainkaan, ja lehti ei kerro vuoden 1900 sotaa.

Kaupungin visa on luettu tiedostosta `js/packs/africa-questions.js`
(avain `kumasi`, viisi kysymystä: **ashantien pääkaupunki**,
**maa Ghana**, **Kultarannikko siirtomaanimenä**, **kaakao
vientikasvina**, **kente**). **Minitehtävä ei saa kysyä yhtään
näistä viidestä.** Litteän taulun `js/packs/africa-kulttuuri.js`
(`kumasi`) kulttuurivisa kysyy **kentestä** — vastauksen on siis
näyttävä kategorioissa, ja se näkyy matkaoppaan käsityöjaksossa.

**Litteää taulua `africa-kulttuuri.js` EI muuteta** (sama ratkaisu
kuin Lagosissa, Nairobissa ja Kapkaupungissa): sen kente-kuva,
adinkra- ja highlife-nostot jäävät peliin, ja lehden nostot eivät
käytä samaa kuvatiedostoa.

Olemassa olevat lohkot on luettu:
- `js/packs/africa-saapumiset.js` (`kumasi`): **valmis, ei kosketa**
  (tori ilman reunoja, isoisän lainaus hovin järjestyksestä).
- `js/packs/africa-valokuvat.js` (`kumasi`): valokuvataulu on
  olemassa; sen tiedostonimiä ei käytetä lehden nostoissa muuten
  kuin ennen–nyt-parissa.
- `js/packs/africa-artikkelit.js` (`Kumasi`): intro on **neljä
  virkettä** eli reseptin alle (7–10 virkettä). **Intro
  kirjoitetaan uusiksi**; `artikkeli`-kenttä jää ennalleen
  (Kapkaupunki-malli 6.9.2026).
- `js/packs/africa-questions.js` `AFRICA_FACTS` (`kumasi`): Kejetian
  tori, Manhyian palatsimuseon palautetut 32 esinettä 2024, isoisän
  huomio hovista. Lehti ei toista näitä kolmea sähkettä; Kejetian
  tori on **kohdekartan kohde**, ja sen juttu kertoo torin oman
  historian (1924, uudisrakennus 2015–), ei sähkeen lukua.

**1873-KEHYS:** isoisän matkavuonna Kumasi oli **Asanten
kuningaskunnan pääkaupunki** ja itsenäinen — brittihallinto tuli
vasta 1896 ja 1901. Vuonna 1873 alkoi kolmas brittiläis-asantilainen
sota: Britannia oli ostanut Alankomaiden Kultarannikon 1872 mukaan
lukien Elminan, jota asantit pitivät ominaan, ja asantit hyökkäsivät
uuteen protektoraattiin. Kenraali **Garnet Wolseley nimitettiin
13. elokuuta 1873**, ja retkikunta rakensi tien ja **237 siltaa**
rannikolta sisämaahan. Sotatoimet ratkesivat vasta 1874. Kumasista
kirjoitettiin juuri 1873: **Brackenbury** kuvasi kadut "yleensä
hyvin leveiksi ja puhtaiksi" ja banyan-puiden varjostamiksi.

---

## 1. Nimi ja perustaminen

**Lähde: "Kumasi", Etymology & Early settlement.**

- Nimi tulee twin sanasta *Kumase*, "kum-puun alla": *kum* on puu ja
  *ase* "alla". Sana oli Kwamanissa kasvaneen *okum*-puun nimi, jonka
  oli istuttanut Okomfo Anokye.
- Kumasin perusti 1680-luvulla asantehene **Osei Kofi Tutu I**
  Asanten pääkaupungiksi.
- **Perustamisesta on useita suullisia versioita**, ja artikkeli
  luettelee ne itse: (1) Osei Tutu neuvotteli maasta kum-puun alla;
  (2) **Nana Oti Akenten** neuvotteli Tafon päällikön kanssa
  tontista kum-puun alla; (3) Oti rakensi Kwamanin ja hänen poikansa
  **Nana Obiri Yeboa** loi Kumasin; (4) **suurin osa suullisista
  lähteistä** panee paikanvalinnan **Okomfo Anokyen** nimiin: hän
  istutti kaksi kum-siementä, toisen Kwamaniin ja toisen Kumawuun,
  ja julisti, että se joista kasvaa puu, on Osei Tutun valtakunnan
  pääkaupunki.
- Kumasi rakennettiin harjanteen itärinteille, jotka nousevat
  Nsubenin jokien soilta.
- Infoboksi: perustettu **1680**, korkeus 250 m, pinta-ala 299 km²,
  lempinimet **"The Garden City"** ja **"Oseikrom"**.

## 2. Kultajakkara ja liitto

**Lähteet: "Okomfo Anokye"; "Asante Empire"; "Golden Stool";
"Kumasi", Ashanti Empire & Colonial era.**

- Okomfo Anokye (n. 1655 – n. 1717/1719) oli Asanten ensimmäinen
  pappi (*okomfo*) ja Osei Tutun neuvonantaja ja ylipappi.
- **Anokyen sanotaan kutsuneen taivaalta alas kultajakkaran
  "Sika Dwa Kofi"** kansankokouksessa (*durbar*); jakkaran kerrotaan
  laskeutuneen Osei Tutu I:n syliin.
- Täysi nimi **Sika Dwa Kofi** tarkoittaa "perjantaina syntynyt
  kultajakkara". Se on asantien kuninkaiden kuninkaallinen ja
  jumalallinen istuin ja Asanten vallan perimmäinen vertauskuva —
  elävien, kuolleiden ja vielä syntymättömien kansan.
- **Jokainen jakkara ymmärretään omistajansa sielun istuimeksi**, ja
  kun sitä ei käytetä, se asetetaan seinää vasten, jotta ohikulkevat
  sielut voivat levätä sillä. **Kultajakkara ei saa koskaan koskettaa
  maata**, vaan se asetetaan huovan päälle.
- Mitat: istuin on 46 cm korkea, alusta 61 cm leveä ja 30 cm syvä.
  Istuinosa veistetään yhdestä *Alstonia boonei* -puun kappaleesta.
- Anokye muutti löyhän asantiliiton "kansalliseksi" liitoksi
  **1695**; hän ja Tutu nimesivät Kumasin pääkaupungiksi ja
  perustivat liittoon otettujen valtioiden päälliköiden
  valtioneuvoston sekä järjestivät armeijan uudelleen.
- Sota Denkyiraa vastaan 1699–1701 päättyi **Feyiasen taisteluun
  1701**; asantit mursivat Denkyiran ylivallan ja saivat haltuunsa
  **hollantilaisten Elminan linnan vuokrakirjan**, mikä avasi
  rannikkokaupan. Sodan jälkeen liittoutuneet hallitsijat
  tunnustivat Kumasin liiton keskukseksi ja Osei Tutun asantehenen.
- Kaupunki nousi merkittäväksi 1695, kun siitä tuli Asanten
  pääkaupunki. Kumasin hallitsija, asantehene, oli myös valtakunnan
  hallitsija.
- **Kumasi on yhä asantehenen istuinkaupunki.**
- Anokyen kerrotaan lyöneen Kumasin maahan miekan, jota kukaan ei ole
  saanut irti; miekka on **Komfo Anokye Teaching Hospitalin**
  alueella.

## 3. Vuosi 1873 ja kolmas sota

**Lähteet: "Anglo-Ashanti wars", Third Anglo-Ashanti War
(1873–1874); "Kumasi", Ashanti Empire.**

- Sota kesti 1873–1875 ja tunnetaan myös nimellä "ensimmäinen
  Ashanti-retkikunta".
- **Syy:** Britannian Kultarannikko perustettiin muodollisesti 1867,
  ja 1872 Britannia osti **Alankomaiden Kultarannikon**, mukaan
  lukien **Elminan, jota asantit pitivät ominaan**. Asantit
  hyökkäsivät uuteen brittiprotektoraattiin.
- Taustalla: 1869 saksalainen lähetyssaarnaajaperhe ja sveitsiläinen
  lähetyssaarnaaja oli viety Togosta Kumasiin; heitä pidettiin yhä
  vankeina 1873. (**Tämä yksityiskohta on varattu kohdekartan
  Ramseyer-jutulle** eikä sitä kerrota lehden nostossa.)
- **Kenraali Garnet Wolseley nimitettiin 13. elokuuta 1873.**
  Mukana 2 500 brittisotilasta ja useita tuhansia länsi-intialaisia
  ja afrikkalaisia joukkoja.
- Tienrakennus: siltoja tehtiin puista, bambusta ja köynnöksistä;
  **63 jaardia leveän Pra-joen yli** rakennettiin silta Chathamista
  tuoduista valmisosista. **Siltoja rakennettiin kaikkiaan 237.**
  Prahsuen leirissä oli sairastupa, torni kummulla, varastot, paja,
  lennätinkonttori ja postitoimisto.
- Ensimmäiset joukot saapuivat joulukuun lopussa; **1. tammikuuta
  1874** marssi kohti rintamaa alkoi, puoli pataljoonaa kerrallaan.
- **Amoafulin taistelu 31. tammikuuta 1874**; kaksi päivää myöhemmin
  Ordashun taistelu. Tie Kumasiin oli auki.
- **Asantit jättivät pääkaupungin, ja britit saapuivat 4. helmikuuta
  1874** ja miehittivät sen lyhyesti. Kuninkaanpalatsi tuhottiin
  räjähteillä. (**Palatsi ja sen esineistö ovat Ghanan maalehden
  aihe** — lehti kertoo sodan kulun, ei palatsin sisältöä.)
- **Fomenan rauhansopimus heinäkuussa 1874**: "Asanten kuningas
  lupaa maksaa 50 000 unssia hyväksyttyä kultaa korvauksena
  kuluista, jotka hän on aiheuttanut Hänen Majesteetilleen…"
  Sopimus vaati myös ihmisuhrien lopettamisen.
- Britannian tappiot: 18 kaatunutta taistelussa ja 55 tautiin
  (70 %), 185 haavoittunutta.
- Brittiläisissä kuvauksissa kiitetään asantien komentajaa
  **Amankwatiaa**, joka kaatui Amoafulissa: "Amankwatian valitsemassa
  asemassa näkyi ihailtava taito…"
- Sotaretki oli **ensimmäinen tunnettu kerta, kun höyryveturia
  (traction engine) käytettiin sotapalveluksessa** — Aveling and
  Porterin "steam sapper number 8" koottiin Cape Coast Castlessa.

### Kumasi 1873 eurooppalaisten silmin

**Lähde: "Kumasi", Ashanti Empire (Maier 1979 -sitaatit).**

- **Brackenbury noin 1873**, sanatarkasti: *"the streets are
  generally very broad and clean, and ornamented with many beautiful
  banyan-trees affording grateful shade from the powerful rays of
  the sun."*
- **F. Boyle 1874**: kaupungin hajut "eivät ole koskaan viemärin
  hajuja".
- **Vastakkainen kuvaus, William Butler:** *"a filthier and far more
  blood-stained collection of mud and wattle hovels than any other
  village in the forest."* — **ristiriita kirjoitetaan auki**
  (ks. tarkistusraportti, kohta B).

## 4. Jälleenrakennus ja väkiluku

**Lähde: "Kumasi", Ashanti Empire & Demographics.**

- **R. Austin Freeman 1888** pettyi Kumasin raunioihin vuoden 1874
  tuhon ja sitä edeltäneen asantien sisällissodan jäljiltä.
  Sanatarkasti mm.: *"the town was nothing more than a large
  clearing in the forest… since the destruction of the city in 1874
  the natives do not seem to have had heart to rebuild them. Yet
  there remained some few vestiges to show what Kumasi had been in
  its palmy days… A few broad, well-kept streets still existed…"*
- **Väkiluku Asanten aikaan vaihtelee lähteittäin:** asantilaiset
  lähteet arvioivat 1800-luvun alussa **100 000**, eurooppalaiset
  **12 000–15 000**; historioitsija **Ivor Wilks** arvioi
  **40 000 1860-luvulla**. (Ristiriita kirjoitetaan auki.)
- Prempeh I palasi 30 vuoden maanpaosta Seychelleiltä, ja **1926**
  Kumasille annettiin seremoniallinen valta Asanten alavaltioihin;
  täysi kuninkuus palautettiin **1935**.
- Kumasi siirtyi brittihallintoon **1896**; historialliset
  kuuluvuudet infoboksissa: Asanten kuningaskunta 1701–1901,
  Kultarannikko 1901–1957, Ghana 1957–.
- Nykyluvut (2021): kaupungin väkiluku **443 981**, metropolialueen
  **3 490 030**. Ghanan **toiseksi suurin kaupunki**. Suurimmat
  kansat: asante, mole-dagbon, ewe. **Suurin osa asukkaista on
  syntynyt kunnan ulkopuolella, noin puolet alueen ulkopuolella.**
- Kumasi on noin **200 km** pääkaupungista Accrasta.

## 5. Kumawood

**Lähteet: "Kumasi", Culture › Film; "Kumawood".**

- Kumasin elokuvateollisuus on **Kumawood**, nopeasti kasvava ala,
  joka vetoaa niihin, joilla ei ole pääsyä koulutukseen mutta on
  intohimo näyttelemiseen.
- Elokuvat keskittyvät paikallisiin juoniin, sijoittuvat yleensä
  kyläympäristöön ja tehdään pienellä budjetilla, **6 860–11 440
  dollaria**. Kieli on **twi**.
- **Ensimmäinen dokumentoitu elokuvateatteri Kumasissa oli Rex
  Cinema, rakennettu 1938.** Se sijaitsi Prempeh Assembly Hallissa,
  joka oli tuolloin kaupungin suurimpia kokoontumispaikkoja.
  **Toinen teatteri rakennettiin 1951**, ja siinä oli noin
  **1 500 paikkaa**.
- Teattereita omisti **West African Picture Company**, libanonilainen
  yritys, joka toimi Kultarannikolla, Nigeriassa ja Lontoossa.
  **Hindielokuvat olivat suosittuja** asukkaiden, erityisesti
  muslimiväestön, keskuudessa.
- Kumasissa on 36 mediataloa: neljä televisioyhtiötä, 20 FM-asemaa
  ja 13 painetun median taloa.

## 6. Teemasivun aineisto: metsä, järvi ja puutarhakaupunki

### 6.1 Bosumtwe-järvi ("Lake Bosumtwi")

- Asantit pitävät Bosumtwea **pyhänä järvenä**. Perinteisen uskomuksen
  mukaan **kuolleiden sielut tulevat tänne jättämään jäähyväiset
  jumalatar Asase Yalle**. Siksi järvellä saa kalastaa **vain
  puulankuilta**.
- Kaloissa on **kotoperäinen kirjoahven *Hemichromis frempongi***
  sekä lähes kotoperäiset *Tilapia busumana* ja *T. discolor*.
- Järvi on **törmäyskraatterijärvi**: kraatteri on halkaisijaltaan
  **10,5 km**, järvi noin **8 km**, ja kraatteri on **1,07 miljoonaa
  vuotta vanha** (pleistoseeni). Kraatterin syvyys on noin 380 m,
  sedimentit mukaan luettuna 750 m.
- Norsunluurannikolta löytyy **tektiittejä**, joiden uskotaan olevan
  tästä törmäyksestä, ja mikrotektiittejä on syvänmeren
  sedimenteissä Afrikan länsipuolella.
- Infoboksi: pituus 8,6 km, leveys 8,1 km, pinta-ala 49 km²,
  keskisyvyys 45 m, suurin syvyys 81 m, korkeus 150 m, **ei
  laskujokea** (endoreeinen), valuma-alue 400 km².
- Ennen törmäystä alue oli rehevää sademetsää. Rankkasadekausina
  vesi on noussut kraatterin reunan matalimpien kohtien yli — todiste
  ovat **kukkuloiden huipuilta löytyneet kalanfossiilit**. Toisina
  aikoina vesi on ollut niin matalalla, että sademetsä on levinnyt
  altaaseen ja järvestä on jäänyt vain lampi; tällainen jakso kesti
  **noin 300 vuotta sitten asti**.
- Kumasin metropolialue rajautuu **etelässä Bosomtwen
  piirikuntaan**; Kumasi sijaitsee sademetsäalueella lähellä
  Bosumtwe-järveä.

### 6.2 Ilmasto ("Kumasi", Climate)

- **Trooppinen savanni-ilmasto (Köppen Aw)**, kaksi erillistä
  sadekautta, suuri ja pieni.
- **Suuri sadekausi maalis–heinäkuussa, pieni syys–marraskuussa.**
- Vuosisade noin **1 200 mm**; suhteellinen kosteus **53–93 %**.
- Kuukausien keskimääräiset ylimmät lämpötilat noin **31 °C**,
  alimmat noin **22 °C**.
- Sääruudun (1991–2020) kuukausikeskiarvot: helmikuu ylin 34,5 °C
  (vuoden korkein kuukausikeskiarvo), elokuu ylin 28,4 °C (matalin);
  vuoden ylimpien keskiarvo 31,6 °C. Ennätyslämpö 38,9 °C
  (helmikuu).

### 6.3 Puutarhakaupunki ("Kumasi", Recreational parks and gardens)

- Kumasi on **yksi harvoista Afrikan kaupungeista, jotka omaksuivat
  Howardin puutarhakaupunkimallin**: **1945 Maxwell Fry ja Jane
  Drew** laativat kaupungin ensimmäisen kehityssuunnitelman Howardin
  ihanteiden pohjalta.
- Suunnitelma keskittyi **viherkehiin kaupungin ympärille** sekä
  puistojen ja kaupunkivihreän lisäämiseen, jotta hajaantuminen
  pysähtyisi ja ilmansaasteet vähenisivät.
- Lempinimi **"The Garden City"** tulee Maxwell Fryn 1945
  julkaisemasta suunnitelmasta "Garden City of West Africa" sekä
  puutarhojen ja metsän runsaudesta.
- **Tutkimukset osoittivat, että vuoteen 2003 mennessä suuri osa
  luodusta viheralasta oli muutettu asuinkäyttöön** kaupungistumisen
  ja heikon maankäytön ohjauksen takia. Viheralaa on noin
  **4,7 m² asukasta kohti**. Puistoja: Abbey's Park, Jackson's Park,
  Hero's Park (Baba Yaran stadionin alueella) ja Rattray Park.
  Artikkeli toteaa useimpien puistojen kunnon heikoksi.
- 2014 tutkimus (B. B. Amasa): noin **34 % asukkaista ei käy
  puistoissa lainkaan**, ja **39 % piti puistoja tarpeettomina**.

### 6.4 Owabin lintusuo ("Owabi Wildlife Sanctuary")

- Alueella on runsaasti kotoperäisiä lintuja ja muuttajia: **noin
  161 lintulajia**.
- **Ghanan ainoa sisämaan Ramsar-kohde** (Ramsar-nimeäminen
  **22. helmikuuta 1988**, kohde numero 393).
- Alue sopii retkeilyyn ja lintujen tarkkailuun.

### 6.5 Metsä ja talous ("Kumasi", Economy; Environmental issues)

- **Puolet maan puunjalostuksesta tapahtuu Kumasissa.**
- Ashantin alue tuotti **21 % Ghanan kokonaistuotannosta 2014**, ja
  siitä **48 % syntyi Kumasissa**.
- Kaupungin varallisuus tulee suurelta osin siitä, että se on
  Ghanan pääteiden risteyskohta, sekä **kaakaonviljelystä
  takamaastossa**.
- Ympäristö: **Wiwi- ja Subin-joet ovat uhattuina** rakentamisen
  levitessä rannoille; 2024 raportin mukaan jokien varsilla oli
  enemmän teollisuus-, asuin- ja liikekäyttöä kuin viheralaa, ja
  tutkijat suosittivat **100 jalan (30 metrin) suojavyöhykettä**.

### 6.6 Kumasin eläintarha ("Kumasi Zoo")

- Perustettu **1951**, avattu virallisesti **1957** Asantemanin
  neuvoston toimesta.
- Pinta-ala **1,5 km²**, sijaitsee Kejetian linja-autoaseman, vanhan
  laukkaradan ja kansallisen kulttuurikeskuksen välissä.
- Noin **40 lajia** ja yli **135 yksilöä**; erityispiirre ovat
  **tuhannet lepakot**, jotka lepäävät puissa.

## 7. Matkaoppaan aineisto

- **Lentokenttä:** Prempeh I International Airport; toukokuussa 2020
  kaksi lentoyhtiötä (Africa World Airlines, Passion Air) lensi
  säännöllisesti Accraan. Laajennus valmistui **lokakuussa 2022**.
- **Kaupunkiliikenne:** *tro-tro* eli yksityisomisteinen
  pikkubussi vakioreiteillä, taksit (osa myös vakioreiteillä,
  kalliimpia mutta mukavampia) ja linja-autot. **MetroMass-
  pikabussipalvelu aloitettiin 2002.** Kaukoliikennettä mm. Accraan,
  Tamaleen, Cape Coastiin, Takoradiin ja Bolgatangaan.
- **Rautatie:** Kumasista on radat Sekondi-Takoradiin ja Accraan,
  mutta **junaliikenne on ollut keskeytyksissä vuosia** vaurioituneen
  radan, siltojen ja vetureiden takia; artikkeli sanoo, ettei juuri
  nyt kulje junia lainkaan.
- **Boankran sisämaasatama** on lähellä Ejisun kunnassa;
  ensimmäinen vaihe oli määrä valmistua 2024, ja sen odotetaan
  työllistävän yli 7 000 ihmistä.
- **Asuminen:** yleisin talotyyppi on **compound-talo** (54,9 %
  talouksista 2010), yksikerroksinen rakennus, jossa yhden hengen
  huoneet kiertävät neliömäistä sisäpihaa; siinä asuu keskimäärin
  **8–15 taloutta**. Muut: erillistalo 16,4 %, kerrostalo 12,9 %,
  paritalo 8,7 %.
- **Urheilu:** Asante Kotoko, Baba Yaran stadion (1959, kunnostukset
  1978 ja 2007, katsomo 40 000 — ks. myös kohdekartan juttu).
- **Koulutus:** KNUST on Ashantin suurin yliopisto ja Ghanan suurin;
  **Kofi Annan opiskeli siellä**. Se avattiin 1952 nimellä College
  of Technology, arkkitehtuurin osasto otti ensimmäiset
  opiskelijansa **1958**, ja korkeakoulusta tuli yliopisto **1961**.
- **Käsityö:** Kumasi tunnetaan perinteisestä **kente**-kankaastaan,
  joka tehdään lähes aina perinteisin menetelmin (**tämä on
  kulttuurivisan vastaus**). Bonwiren kylä on kentekutojien kylä.
- **Uskonto:** enemmistö rukoushuoneista on kristillisiä kirkkoja;
  luettelossa mm. metodistit, Ghanan presbyteerikirkko,
  anglikaanit, adventistit, baptistit, helluntailaiset ja Kumasin
  katolinen arkkihiippakunta.

## 8. Kohdekartan kahdeksan kohdetta

Koordinaatit haettu **7.9.2026**. Lähdejärjestys: (1) artikkelin oma
`{{coord}}` raakatekstistä, (2) Wikidatan `P625` samasta kohteesta
silloin kun artikkelissa ei ole koordinaattia. **Kaikki 28 väliä on
mitattu haversinilla**; ks. tarkistusraportti, kohta G.

| # | Kohde | lat | lon | lähde |
| --- | --- | --- | --- | --- |
| 1 | Prempeh II:n museo / kansallinen kulttuurikeskus | 6.700639 | −1.629194 | Wikidata |
| 2 | Kumasin eläintarha | 6.701000 | −1.626000 | artikkeli |
| 3 | Kejetian tori | 6.698639 | −1.619139 | artikkeli |
| 4 | Komfo Anokyen sairaala (miekka) | 6.697479 | −1.631690 | artikkeli |
| 5 | Kumasin linnake (Armed Forces Museum) | 6.691367 | −1.624872 | artikkeli |
| 6 | Ramseyerin muistokirkko | 6.689400 | −1.621600 | Wikidata |
| 7 | Rattrayn puisto | 6.681781 | −1.626117 | Wikidata |
| 8 | Baba Yaran stadion | 6.682681 | −1.605111 | artikkeli |

**Manhyian palatsi (6.70348 / −1.61579) jätettiin tarkoituksella
pois**, vaikka se mahtuisi ruutuun: se on **Ghanan maalehden nosto**
("Palatsi, jossa oli Timesin numero vuodelta 1843") ja lisäksi
`AFRICA_FACTS`-sähkeen aihe (palautetut 32 esinettä 2024).
Kohdekartta ei toista maalehteä (Fèsin ennakkotapaus: al-Qarawiyyin
ja Chouara jätettiin pois samasta syystä).

### 8.1 Prempeh II:n museo ja kansallinen kulttuurikeskus

- Kulttuurikeskus (aiemmin National Cultural Centre) perustettiin
  **1956**. Se on **Prempeh II Jubilee Museumin sijaintipaikka**.
- Ennen Ghanan itsenäisyyttä **Alex A. Y. Kyerematen** alkoi
  asantehene **Prempeh II:n** ja Asantemanin neuvoston tuella
  suunnitella "Asante Cultural Centreä" asantien kulttuurin
  säilyttämiseksi ja esittelemiseksi. Suunnitelmassa oli kirjasto,
  perinteinen kappeli, näyttelyhalli, teatteri, tanssiareena ja
  museo — **ulkoilmamuseo ja kulttuurikeskus**.
- Keskus avattiin 1956; avajaisissa Prempeh II laski peruskiven
  keskuksen pääkohteelle, "Traditional House for the Ashanti Museum
  and Art Gallery".
- Keskus **joutui ristiriitaan presidentti Kwame Nkrumahin
  kansallisen politiikan kanssa ja nimettiin 1963** uudelleen
  "National Cultural Centreksi".
- Prempeh II Jubilee Museum perustettiin **1954**; se on nimetty
  Prempeh II:n mukaan ja esittelee häneen liittyvää esineistöä.

### 8.2 Kumasin eläintarha

Ks. 6.6.

### 8.3 Kejetian tori ("Kejetia Market")

- Virallisesti **Kumasi Central Market**, tunnetaan nimellä Kejetia.
  **Yli 8 000 myymälää ja kojua** — **Länsi-Afrikan suurin yksittäinen
  tori**. Noin **50 000 kävijää päivässä**, **20 000 myyjää**.
- Perustettiin **1924** yhdessä Accran Makolan torin kanssa
  brittiläisten torien mallin mukaan, jotta suuri määrä myyjiä
  saataisiin katon alle. Samalla rakennettiin **kuorma-autoasema**.
- Investointien puutteessa infrastruktuuri ja hygienia olivat
  huonoja; siirtomaahallinto yritti edistää suurteollisuutta
  pysäyttääkseen myyjien kasvavan määrän. Itsenäisyyden jälkeenkin
  suuri osa työvoimasta jäi pienimuotoiseen kaupankäyntiin.
- **Uudistushanke:** elokuussa 2015 hallitus ilmoitti koko torin
  uudistamisesta. **Ensimmäinen vaihe 2015–2018**, arvo
  259 425 000 dollaria, tuotti **noin 8 420 myymälää**. **Toinen
  vaihe** aloitettiin 2. toukokuuta 2019, arvio noin 248 miljoonaa
  dollaria, rahoitus Deutsche Bankilta; artikkelin mukaan **yhä
  kesken**.
- **Tulipalot** ovat toistuva ongelma: tammi- ja maaliskuussa 2016
  palot tuhosivat yli 200 myymälää; uusi palo tammikuussa 2025.

### 8.4 Komfo Anokye Teaching Hospital ja miekka

- Sairaala **rakennettiin 1954**; se oli Ashantin, Brong Ahafon ja
  pohjoisten alueiden pääsairaala. Muutettiin **opetussairaalaksi
  1975**. Nykyisin noin **1 000 vuodepaikkaa**, alun 500:sta.
  Uusin rakennus on kansallinen tapaturma- ja päivystyskeskus.
- Lisänimi **GEE** tulee urakoitsijoiden nimestä (Messrs. GEE Walter
  & Slater).
- **Okomfo Anokyen miekka:** "Okomfo Anokye" -artikkelin mukaan
  hänen uskotaan lyöneen maahan miekan, jota kukaan ei ole saanut
  irti, ja **miekka on Komfo Anokye Teaching Hospitalissa**.
  Bantaman artikkeli nimeää paikan **Komfo Anokye Sword Museumiksi**.
  (Anokyen sanotaan myös panneen tikarin keskelle Ashantin aluetta;
  **artikkeli itse merkitsee tämän väitteen lähdettä vailla olevaksi**
  — ks. tarkistusraportti, kohta D.)

### 8.5 Kumasin linnake / Armed Forces Museum

- **Armed Forces Museum**, tunnetaan myös nimellä **Kumasi Fort**,
  sotahistoriallinen museo; **perustettu 1953**.
- Kolmannessa brittiläis-asantilaisessa sodassa **Aban-palatsi
  tuhottiin**, ja britit käyttivät **raunioaineksen linnakkeen
  rakentamiseen Kumasiin 1896**. Linnake tuhoutui samana vuonna
  aseellisessa kapinassa, ja **korvaava rakennettiin 1897** — se on
  säilynyt Kumasin linnakkeena.
- **Maaliskuussa 1900 Yaa Asantewaa ja muut pitivät linnakkeessa
  29 brittiä vangittuina useiden viikkojen ajan.** Naiset ja lapset
  vapautettiin, ja he hälyttivät siirtomaajoukot nykyisen Nigerian
  alueelta pelastamaan loput. (Vuoden 1900 sota kokonaisuutena on
  **GHA-skandaalin aihe**; tässä jutussa se on rakennuksen historiaa
  yhtenä kappaleena.)
- **1952–1953** puolustusvoimat ottivat linnakkeen haltuunsa ja
  muuttivat sen museoksi.
- Näyttelyt: sotilasmitaleja, panssariautoja, ilmatorjuntatykkejä,
  valokuvia ja muotokuvia. Ensimmäinen sali: Kultarannikon armeijan
  toisen maailmansodan aseet ja 4. (Gold Coast) jalkaväkiprikaatin
  mitalit. Toinen sali takatornissa. Kolmas sali: Royal West African
  Frontier Forcen ja Kultarannikon joukkojen muotokuvat.
  Toiseksi viimeisessä salissa **Prempeh I:n, Prempeh II:n ja Yaa
  Asantewaan muotokuvat**; viimeisessä lippuja.

### 8.6 Ramseyerin muistokirkko

- Alkujaan **Basel Mission Church, Kumasi**, myöhemmin **Ebenezer
  Presbyterian Church**; historiallinen protestanttinen kirkko
  **Adumin kaupunginosassa**. Jumalanpalvelus englanniksi ja
  asante-twiksi.
- Perustaminen juontuu **kesäkuuhun 1869**, jolloin Baselin
  lähetyssaarnaaja **Fritz Augustus Ramseyer**, hänen vaimonsa
  **Rosa**, veljensä **Johannes** ja akan-kristitty **Thomas Owusu**
  joutuivat Asanten armeijan (Adubofourin johdolla) vangiksi.
- **Puolen vuosikymmenen epäonnistuneiden neuvottelujen jälkeen**
  britit valtasivat Kumasin ja vapauttivat neljä vankia.
- Ramseyer palasi Kumasiin lähetyssaarnaajana **1896**,
  **kaksikymmentäkaksi vuotta vapautumisensa jälkeen**, ja osti
  Thomas Owusun avulla maata **Bantamasta lähellä nykyistä Komfo
  Anokye Teaching Hospitalia**. Vuodessa syntyi kaksi
  lähetysasemaa ja kaksi koulua.
- Sotilaallinen valloitus teki hankkeesta epäsuositun: kristinuskoa
  pidettiin "voittajan uskontona" ja lähetyssaarnaajia
  siirtomaavallan asiamiehinä.
- **Vuoteen 1900 mennessä** Ramseyer ja Baselin lähetys olivat
  perustaneet **16 koulua Kumasiin, joissa oli 311 oppilasta**;
  kastettuja oli 33 ja kristityssä kylässä asui 160 kääntynyttä.
- **Kappeli rakennettiin 1907** seurakunnan talkootyönä ja nimettiin
  Ebenezer Presbyterian Churchiksi. Ramseyerin kuoltua
  **6. elokuuta 1914** kirkko nimettiin hänen muistokseen.
- Nykyään kirkolla on uusi **3 000 hengen katedraali** ja
  18 yksikön kaksikerroksinen alakoulurakennus.

### 8.7 Rattrayn puisto

- Virkistys- ja huvipuisto, jonka **Kumasi Metropolitan Assembly
  rakensi** palauttaakseen Kumasille Länsi-Afrikan puutarhakaupungin
  aseman.
- **Vihittiin 20. kesäkuuta 2015**; vihkijöinä presidentti John
  Dramani Mahama, asantehene Otumfuo Nana Osei Tutu II ja Kumasin
  pormestari Kojo Bonsu.
- Nimi kunnioittaa kapteeni **Robert Sutherland Rattraya**,
  skotlantilaista, joka oli Kultarannikon apulaissiirtomaasihteeri
  ja Accran lakiasäätävän kokouksen sihteeri 1919.
- Varusteet: **tekojärvi**, golfkärry, WiFi, lasten leikkipaikka,
  kuntosali ja **6 neliömetrin tanssiva suihkulähde, ensimmäinen
  laatuaan maassa**; lisäksi ravintoloita ja kahviloita.

### 8.8 Baba Yaran stadion

- **Baba Yara Sports Stadium** (myös Kumasi Sports Stadium),
  monitoimistadion; **Ghanan suurin, 40 528 katsojapaikkaa**.
- Kotistadion **Asante Kotokolle** ja King Faisalille.
- **United African Company (UAC) rakensi sen 1957**, ja se vihittiin
  jalkapallokentäksi **1959**. Ensimmäiset katsomot 1971, uusittu
  1977. **Nimettiin kumasilaisen jalkapalloilijan Baba Yaran
  (1936–1969, Asante Kotokossa 1955–1961) mukaan 2004.**
- Kolmas suuri remontti valmistui 2008: länsikatsomo purettiin ja
  korvattiin kaksikerroksisella katsomolla, johon tuli lehdistö-,
  yritys- ja VIP-tilat; läpinäkyvät paneelit erottavat katsomon
  kentästä kenttäryntäysten estämiseksi.
- Stadion isännöi **Afrikan cupin otteluita 1978** (kuusi
  alkulohko-ottelua ja välierä), **2000** (seitsemän ottelua) ja
  **2008**.

## 9. Avoimet kysymykset päätoimittajalle

1. **Väkilukukiista 1800-luvulla** (100 000 / 12 000–15 000 /
   40 000): kirjoittaja esittää kaikki kolme lukua lähteineen eikä
   valitse yhtä. Hyväksytäänkö?
2. **Butlerin sitaatti** on aikakautensa halventavaa kieltä. Ehdotus:
   sitä ei siteerata sanatarkasti, vaan todetaan, että samasta
   kaupungista kirjoitettiin myös päinvastaisia kuvauksia, ja
   annetaan Brackenburyn 1873 sitaatti sellaisenaan. Perustuslain
   Kunnioitus-pilari puoltaa tätä; pilari 4 (ei kaunistelua) täyttyy,
   koska ristiriita kerrotaan.
3. **Orjakauppa** on Asanten talouden osa lähteessä ("Asante
   Empire", johdanto: kulta, maatalousvienti, orjakauppa, käsityö).
   Ehdotus: mainitaan kerran neutraalina tosiasiana Feyiasen jälkeen
   avautuneen rannikkokaupan yhteydessä, ilman yksityiskohtia.
