# Mérida (Yucatán) — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `merida`, maa MEX, wiki-otsikko
`Mérida (Meksiko)` (js/packs/northamerica.js), en-Wikipedia
"Mérida, Yucatán". Kaikki tiedot haettu Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`, uusinnat
kasvavalla viiveellä) **7.9.2026**. Mitat ja malli luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/moduulit/kaupunkilehti.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md` ja
`docs/mantereet-tyoaineisto/spec-mantereet.md`. Malli: Guatemala Cityn
ja Lagosin lehdet (v1669–v1670).

Luetut lähdeartikkelit **en-Wikipedia 7.9.2026**:
**"Mérida, Yucatán"**, **"Yucatán"**, **"Yucatán Peninsula"**,
**"Caste War of Yucatán"**, **"Republic of Yucatán"**,
**"Cathedral of Mérida, Yucatán"**, **"Paseo de Montejo"**,
**"T'ho"**, **"Agave fourcroydes"**, **"Francisco de Montejo"**,
**"Dzibilchaltun"**, **"Uxmal"**, **"Progreso, Yucatán"**,
**"Celestún"**, **"Izamal"**, **"Cenote"**, **"Cochinita pibil"**,
**"Papadzules"**, **"Sopa de lima"**, **"Jarana yucateca"**,
**"Huipil"**, **"Yucatec Maya language"**, **"Maya peoples"**.

Luetut lähdeartikkelit **es-Wikipedia 7.9.2026** (englanninkielistä
artikkelia ei ole): **"Casa de los Montejo"**, **"Teatro Peón
Contreras"**, **"Ermita de Santa Isabel (Mérida, Yucatán)"**,
**"Museo de la Ciudad de Mérida"**, **"Parque de La Mejorada"**,
**"Museo de la Canción Yucateca"**, **"Barrio de San Juan (Mérida,
México)"**, **"Barrio de San Cristóbal (Mérida, Yucatán)"**,
**"Barrio de Santa Ana (Mérida, México)"**.

## 0. Rajaus tälle lehdelle

**Meksikon maalehteä (`js/packs/maa-kategoriat.js`, MEX) ei toisteta.**
Maalehden viisi sivua: *Historia* (Hidalgo 1810, Juárez, rautatie,
Manilan galleonit), *Muinaisuus* (Teotihuacán, Monte Albán, **Chichén
Itzán käärmevarjo**, El Tajín), *Ruoka* (nikstamalisointi, mole,
salsat, keittiö Unescon luettelossa), *Musiikki* (mariachi, tarima,
corrido, danzón) ja *Luonto* (monarkkiperhonen, **cenote-kehä ja
Chicxulub**, aksolotl, Copper Canyon).

**Kaksi aihetta on siis varattu maalehdelle eikä niitä käsitellä
täällä: Chichén Itzá ja Chicxulubin kraatterin cenote-kehä.**
Kohdekartan ja lehden kohteet on valittu tämän mukaan. Karttanostot
`js/packs/maastokohteet-mex.js` (mm. Chichén Itzá, Palenque,
Cozumel, Usumacinta) ja `js/packs/skandaalit.js` MEX on luettu.
Kaupungin visa `js/packs/northamerica-questions.js` (`merida`) kysyy
niemimaan nimeä ja **Chicxulubin asteroiditörmäystä** — minitehtävä
ei kysy kumpaakaan.

**Tämä lehti pysyy kaupungissa:** Tʼhó ja viisi kukkulaa, Valkoinen
kaupunki ja sen portit, kastisota ja Chan Santa Cruz, henekenin
vihreä kulta ja Paseo de Montejo; teemasivulla Yucatánin oma keittiö.

Olemassa olevat lohkot on luettu:
- `js/packs/northamerica-saapumiset.js` (`merida`): olemassa, ilman
  1873-kehystä. **Kuvaukseen lisätään 1873-virke**, nosto ennallaan.
  Nykyinen kuvaus mainitsee Chichén Itzán — se jää saapumistekstiin,
  mutta lehti ei jatka aiheesta (maalehden aihe).
- `js/packs/northamerica-valokuvat.js` (`merida`): vanha vedos
  **"Merida Yucatan Stereo 1901 cropped.jpg"** (Lucas de Gálvezin
  tori nähtynä San Beniton muureilta) ja nykykuva **"Mercado
  Municipal Lucas de Gálvez - Mérida, Yucatán.jpg"** (sama tori
  nykyään) — **valmis ennen–nyt-pari samasta paikasta**, käytetään
  sellaisenaan uusin selittein. Lisäkuvat (Paseo de Montejo,
  Sotuta de Peónin heneken, tori) ovat varattuja tiedostonimiä.
- `js/packs/northamerica-artikkelit.js`: Méridalla **ei ole
  merkintää** — kirjoitetaan uusi avaimella `Mérida (Meksiko)`.
- `js/packs/kulttuuri-kategoriat.js`, `maakartat.js`,
  `nahtavyysjutut.js`: Méridalla ei ole mitään.
- `js/packs/saatiedot.js`: ei riviä — **säärivi ei kuulu tähän
  erään**. Oppaan sääjakso nojaa en-Wikipedian Climate-osioon ja
  sanoo sen ääneen.

**1873-KEHYS:** isoisän matkavuonna Mérida oli 331-vuotias ja
**kastisota oli yhä käynnissä**. Niemimaan lounaisosaa hallitsi
Méridasta käsin osavaltion hallinto, kaakkoisosaa itsenäinen
mayavaltio **Chan Santa Cruz**, jonka Britannia oli tunnustanut
tosiasialliseksi valtioksi British Hondurasin kaupan takia.
Icaiche-mayojen johtaja **Marcus Canul** oli haavoittunut kuolettavasti
**1.9.1872** Orange Walkin taistelussa — vuosi ennen isoisän matkaa.
Kaupungin uusi satama **Progreso** oli perustettu **1872** (Juan
Miguel Castro), ja niemimaan **ensimmäinen rautatiekisko oli laskettu
1.4.1870** La Mejoradan puistoon. Heneken-buumi oli alkanut jo 1833,
mutta **Paseo de Montejota ei vielä ollut** — sen ajatus syntyi
1886–1889 ja rakentaminen alkoi tammikuussa 1888.

---

## 1. Tʼhó, viisi kukkulaa ja perustaminen 1542

- Mérida perustettiin **1542**; perustajien joukossa olivat
  **Francisco de Montejo nuorempi** ja **Juan de la Cámara**. Nimi
  tulee **Méridasta Extremadurassa**, koska Tʼhón rauniot
  muistuttivat valloittajia Rooman **Augusta Emeritasta**.
- Kaupunki rakennettiin mayakaupungin **Tʼho** paikalle
  (ääntämys /tʼχoʼ/). Kaupunkia kutsuttiin myös nimillä
  **Ichkanzihó** tai **Ichcaanzihó** (/iʃkanˈsiχo/), "viiden kukkulan
  kaupunki", viitaten sen **pyramideihin**. Monet Tʼhón veistetyistä
  kivistä käytettiin espanjalaisten ensimmäisiin rakennuksiin, ja ne
  näkyvät yhä esimerkiksi **katedraalin seinissä**.
- Espanjan kruunu antoi Francisco de Montejolle **1526** *adelantado*-
  arvon Yucatánia varten; hän oli ollut mukana Hernán Cortésin
  retkellä. Montejot siirsivät tukikohtansa Campechesta sisämaahan
  juuri mayojen sitkeän vastarinnan takia ja valitsivat Tʼhón.
  (es-Wikipedia "Casa de los Montejo")
- Kolonialismin ajasta 1800-luvun puoliväliin Mérida oli
  **muurattu kaupunki**, joka suojasi *peninsulareja* ja
  *criolloja* mayojen toistuvilta kapinoilta.

## 2. Valkoinen kaupunki — kaksi selitystä, jotka kirjoitetaan auki

- **en-Wikipedia ("Nickname"):** liikanimi *La Ciudad Blanca*
  "saattaa johtua" rakennusten kalkkikivestä; kaupunki näkyy
  avaruudesta valkeahkona läikkänä vihreän metsän keskellä. Sama
  liikanimi on Arequipalla ja Popayánilla. **Kansanperinne** sanoo,
  että nimi tulee siitä, että perustamisen aikaan kaupunkiin sai
  asua vain valkoihoisia eurooppalaisia ja sisääntuloportit
  rakennettiin sitä varten — **mutta artikkeli kumoaa tämän
  ajoituksella**: ensimmäiset kaaret tilattiin vasta **1690**,
  lähes 150 vuotta perustamisen jälkeen. **San Juanin kaari** ja
  59. kadun kaari merkitsivät Campechen ja Izamalin teiden alkua;
  osa kaarista oli pelkkää koristetta, kuten se, jonka Juan Quijano
  pystytytti talonsa eteen **1760** (sittemmin purettu).
  Montejon joukoissa olleet **nahua-sotilaat** asettuivat San
  Cristóbalin, Santiagon ja San Románin kaupunginosiin ja saivat
  verovapauden sotilaallisesta avustaan.
- **es-Wikipedia** ("Barrio de San Juan", "Barrio de San Cristóbal")
  kertoo historioitsija **Michel Antochiw Kolpan** tutkimuksiin
  nojaten päinvastaista: nimi ei tule kalkituksesta vaan
  perustamisajan aikeesta tehdä "valkoinen" eli valkoisten kaupunki
  — siitä myös portit, joiden takana olivat *barrios de indios*.
  Sama lähde toteaa, että aie kaatui käytäntöön: työvoimaa tarvittiin
  lähelle.
- **Ratkaisu:** lehden nosto kertoo **molemmat selitykset ja
  ajoitusristiriidan** sellaisenaan eikä valitse puolta. Sävy on
  kunnioittava eikä syyttävä (pilari 3), ja kaupunginosat esitetään
  elävinä nykypäivän kaupunginosina.
- **San Cristóbal** oli alun perin *mexica*- ja *tlaxcalteekki*-
  väestön kaupunginosa, ja heille kuului verovapaus osallistumisesta
  valloitukseen. Kuvernööri **Diego Quijada** otti oikeuden pois,
  eivätkä asukkaat saaneet sitä protestoimalla takaisin. Viiden
  korttelin päässä pääaukiolta, **Tʼhón kukkulan päälle**, rakennettiin
  suuri fransiskaaniluostari; **1669** kuvernööri **Rodrigo Flores de
  Aldanan** aikana sen ympärille rakennettiin **San Beniton
  linnoitus**. Kolme porttia muutettiin sotilassyistä yhdeksi, ja
  tilanne jatkui pitkälle 1700-luvulle. 1800-luvun lopulla
  kaupunginosaan asettui merkittävä osa niemimaan **syyrialais-
  libanonilaisesta** siirtolaisuudesta. Kadut kivettiin ja puisto
  kunnostettiin, ja se vihittiin **5.5.1910**.
- **Santa Anan** kaupunginosan muutti kuvernööri **Antonio de
  Figueroa y Silva**, joka **1726** määräsi suoran kadun
  piispantalolta pohjoiseen ja kaksi kivikaarta sen varrelle; hän
  rakennutti myös **Santa Anan kirkon esikolumbiaanisen
  mayaperustuksen päälle** vanhan avokappelin paikalle. Kokonaisuus
  valmistui **1733**, mutta Figueroa y Silva kuoli hieman ennen sitä;
  hänen jäännöksensä lepäävät kirkon julkisivun laatan takana.
  Hanke siirsi criollo-asutuksen rajaa pohjoiseen. **Vuonna 1867**
  Santa Anan puistossa käytiin Yucatánin ratkaissut taistelu
  keisarikunnan ja tasavaltalaisten välillä; **Manuel Cepeda
  Peraza** voitti ja palautti tasavaltalaisen hallinnon
  **15.6.1867**. 1900-luvun alussa kaupunginosaan perustettiin
  leipomo, jonka *pan francés* on Yucatánissa yhä tunnettu; sen
  pitivät katalonialaiset veljekset **Llano** 1940-luvulle asti.

## 3. Katedraali — kolme eri väitettä, jotka kirjoitetaan auki

- **en-Wikipedia "Mérida, Yucatán", johdanto:** katedraali
  "rakennettiin 1500-luvun lopulla" ja on **"Amerikan mantereen
  vanhin katedraali"**.
- **Sama artikkeli, "Historic sites":** katedraali "vuodelta 1598"
  oli **"Pohjois-Amerikan mantereen ensimmäinen katedraali"**.
- **en-Wikipedia "Cathedral of Mérida, Yucatán":** rakentaminen alkoi
  **1561** ja valmistui **1598**; se oli **"Amerikan toinen
  valmistunut katedraali"** — ensimmäinen oli **Santo Domingon
  katedraali (1550)**. Sama artikkeli sanoo myöhemmin
  Construction-osiossa, että "vasta **1562** rakentaminen alkoi".
- **Ratkaisu:** lehti käyttää **kohdeartikkelin** lukuja (aloitus
  1561/1562, valmis 1598, Amerikan toinen Santo Domingon jälkeen) ja
  sanoo lukijalle, että yleisartikkeli väittää sitä ensimmäiseksi.
  Ero kirjataan myös lohkokommenttiin. Ennakkotapaus: v925/v932/v937
  (tarkempi lähde voittaa, ja ero selitetään).
- Yucatánin hiippakunnan ("Yucatán ja Cozumel") perusti **Pius IV
  1561**, suojelupyhimys **Toledon pyhä Ildefonsus**. Kaksi
  ehdokasta ei päässyt vihkimykseen asti; kolmas, **fray Francisco
  Toral**, otti viran vastaan **14.8.1562**. Holvausjärjestelmä
  perustuu **Andrés de Vandelviran** ajatuksiin (ensin Jaénin
  katedraalissa) — Toral oli kotoisin Úbedasta Jaénin maakunnasta.
  Työvoima oli mayoja, joista **Francisco Pool** ja **Diego Can**
  tunnetaan nimeltä; kiviä otettiin mayatemppelistä **Yajam Cumu**.
  Arkkitehti oli **Juan Miguel de Agüero**, ensimmäinen työnjohtaja
  **Don Pedro de Aulestia**.
- Julkisivun vaakuna oli alun perin Espanjan kuninkaallinen (kastelit
  ja kruunatut leijonat). Itsenäistymisen jälkeen keskiosa hakattiin
  pois; **1824** tyhjään kilpeen laitettiin Meksikon kotka
  Iturbiden keisarikruunun kanssa, ja toisen Espanja-vastaisen
  aallon aikana koko vaakuna haudattiin sementtilaatan alle. Sementti
  poistettiin myöhemmin. Julkisivulla ovat **Pietarin ja Paavalin**
  patsaat: Paavalilla miekka ja kirja, Pietarilla avaimet.

## 4. Kastisota 1847–1901/1915 ja Chan Santa Cruz

*(Kirjoitetaan spec-mantereet.md:n mukaan: alkuperäiskansa toimijana
ja nykypäivän kansana, väkivalta tapahtumina ilman julmuuksien
yksityiskohtia.)*

- Sota alkoi **1847** Yucatánin niemimaan mayojen kapinana
  *yucatecoja* vastaan. Infoboxin ajanjakso on **1847–1915**
  (kahakoita 1933 asti); tulos "1847–1883 mayojen voitto, Chan Santa
  Cruzin valtio perustettiin; 1884–1915 Meksikon voitto".
- **Juuret maanomistuksessa:** heneken- ja sokeriruokoviljelmien
  laajeneminen söi mayojen yhteismaita. Rikkaat yucatecot alkoivat
  kasvattaa henekeniä suuressa mitassa **1833** alkaen. Yucatánin
  kongressi sääti itsenäistymisen jälkeen lakeja, jotka helpottivat
  tätä; 1840-luvulla maan menetys kiihtyi ja suuri osa mayoista
  joutui työskentelemään haciendoilla velkatyöläisinä.
- Mayajohtajat itse nimesivät syyksi **verot**: **Jacinto Pat**
  kirjoitti 1848 haluavansa "vapautta eikä sortoa, koska ennen meidät
  alistettiin monilla maksuilla ja veroilla". **Cecilio Chi** lisäsi
  1849, että Santiago Imánin lupaus vapauttaa intiaanit maksuista oli
  syy vastarintaan — Imán jatkoi silti verottamista.
- **1839** federalistiliike **Santiago Imánin** johdolla perusti
  vastahallinnon Tizimíniin, otti Valladolidin, Espitan, Izamalin ja
  lopulta **Méridan**; Imán aseisti mayat ja lupasi maata ilman
  veroja. **1841** Yucatán julistautui itsenäiseksi tasavallaksi;
  Santa Anna ei hyväksynyt sitä ja hyökkäsi 1842, mutta ei saanut
  Campecheä eikä Méridaa. Tasavalta jakautui kahteen leiriin:
  **Miguel Barbachano** Méridassa (takaisin Meksikoon) ja
  **Santiago Méndez** Campechessa. Molemmat olivat ottaneet mayoja
  joukkoihinsa — ja aseet jäivät.
- Kesäkuussa **1847** Méndez sai tiedon aseistetusta mayajoukosta
  Jacinto Patin maatilalla; hän vangitutti **Manuel Antonio Ayn** ja
  teloitutti tämän Valladolidin torilla, minkä jälkeen useita
  mayakyliä poltettiin. **30.7.1847** Cecilio Chi ja Jacinto Pat
  hyökkäsivät Tepichiin. Keväällä **1848** mayajoukot hallitsivat
  suurinta osaa Yucatánia lukuun ottamatta **muurattuja Campecheä ja
  Méridaa** sekä lounaisrannikkoa.
- Piiritys purkautui yhtäkkiä. **Historioitsijat ovat eri mieltä
  syystä:** toisten mukaan mayajoukot lähtivät kylvämään peltojaan
  (perinteinen merkki oli lentävien muurahaisten parveilu rankkojen
  sateiden jälkeen), toisten mukaan muona loppui. **Lehti kertoo
  molemmat selitykset eikä valitse.**
- Kuvernööri **Barbachano** haki apua Kuubasta, Jamaikalta ja
  Yhdysvalloista; kukaan ei tullut. Hän kääntyi Méxicoon, ja
  **Yucatán yhdistettiin Meksikoon 17.8.1848**.
- **1850** kaakon mayat saivat uuden alkusysäyksen **Puhuvasta
  rististä**: ilmestys kehotti jatkamaan. **Chan Santa Cruz**
  ("pieni pyhä risti") oli sekä valtion että sen pääkaupungin nimi
  (nykyinen Felipe Carrillo Puerto, Quintana Roo), ja ristin
  seuraajia kutsuttiin **cruzobeiksi**. Yucatánin hallitus julisti
  sodan päättyneeksi ensi kerran **1855**.
- **Britannia tunnusti Chan Santa Cruzin tosiasialliseksi valtioksi**
  British Hondurasin (nyk. Belize) kaupan takia. Sotavankeja
  myytiin orjiksi Kuubaan (mainitaan yhtenä lauseena, ilman
  yksityiskohtia).
- **1867** mennessä mayat pitivät osia läntisestäkin Yucatánista ja
  Peténiä. Muita itsenäisiä ryhmiä: **Ixcanhá** (n. 1 000 asukasta,
  sopi Meksikon kanssa nimellisestä tunnustuksesta ja sai
  itsehallinnon 1894 asti) ja **Icaiché**, joka hallitsi niemimaan
  keskiosan viidakoita. Icaichén johtaja **Marcus Canul** löi
  brittijoukot **21.12.1866** San Pedro Yalbacissa; mayat ottivat
  Corozalin hetkeksi **1870**, ja viimeinen suuri hyökkäys oli
  **1.9.1872**, jolloin Canul haavoittui kuolettavasti Orange
  Walkissa.
- Neuvottelut 1883 johtivat **11.1.1884 Belize Cityssä** allekirjoi-
  tettuun sopimukseen, jossa Meksiko sai suvereniteetin ja
  **Crescencio Poot** tunnustettiin Chan Santa Cruzin kuvernööriksi;
  seuraavana vuonna vallankaappaus kumosi sopimuksen. **1893**
  Britannia tunnusti Meksikon suvereniteetin ja sulki rajakaupan.
  **1901** kenraali Ignacio Bravo miehitti Chan Santa Cruzin ja
  sähkötti sodan päättyneeksi **5.5.1901**. Sota julistettiin
  lopullisesti päättyneeksi **syyskuussa 1915** (Salvador Alvarado).
  Viimeinen kahakka oli **huhtikuussa 1933** Dzulan kylässä.
- Kokonaisuudessaan **noin 40 000–50 000** ihmistä kuoli
  vihollisuuksissa (artikkelin loppuosa). Infobox antaa aivan toisen
  luvun (~364 000 yhteensä). **Ratkaisu:** lehti kertoo leipätekstin
  luvun ja sanoo, että arviot vaihtelevat suuresti; infoboxin lukua
  ei käytetä yksin, koska leipäteksti on eksplisiittinen.

## 5. Heneken — vihreä kulta

- **Agave fourcroydes**, heneken, on Etelä-Meksikon ja Guatemalan
  kotoperäinen laji. Se on **steriili hybridi**, jota ei lisätä
  siemenistä vaan **juurivesoista** ja itusilmuista.
- Runko voi olla **1,7 m**, lehdet **1,2–1,8 m** pitkiä ja
  **8–13 cm** leveitä, harmaanvihreitä, reunoissa harvassa hampaita
  ja kärjessä **2–2,5 cm** tummanruskea piikki. Kukinto on
  **5–6 metriä** korkea haarova röyhy. Koska laji on steriili,
  siemeniä ei synny, mutta kukinnan jälkeen ilmestyy runsaasti
  itusilmuja.
- Kuitu sopii **köyteen ja narulle**, mutta se ei ole yhtä laadukasta
  kuin sisal. Sitä on viljelty Itä-Meksikossa pitkään, yleisimmin
  Yucatánissa, Veracruzissa ja Tamaulipasissa. Siitä tehdään myös
  *licor del henequén*.
- Ensimmäinen espanjalaisperäinen henkilö, joka dokumentoi kasvin
  hyödyn köysiin ja laivatarvikkeisiin, oli meksikolaissyntyinen
  Espanjan laivaston insinööri **José María Lanz**, joka tutki
  henekeniä Yucatánissa **1783**.
- Méridan ympäristö vaurastui 1800-luvun lopulla henekenistä
  ("Mérida, Yucatán", History). 1900-luvun alussa teollisuus siirtyi
  tupakkaan, melassiin, rommiin, saippuaan ja nahkatuotteisiin.
  **Korealainen siirtolaisuus Meksikoon alkoi 1905**, kun yli tuhat
  ihmistä saapui Yucatániin **Jemulpon** (nyk. Incheon) kaupungista;
  ensimmäiset korealaiset asettuivat Méridan ympäristöön
  **henekenviljelmien työläisiksi**.
- **Paseo de Montejo:** 1800-luvun viimeisinä vuosikymmeninä
  Yucatán eli henekenin ("vihreän kullan") nousukautta, ja
  varakkaiden asuinrakentaminen kasvoi. Méridassa **ei ollut yhtään
  bulevardia**; ainoat kokoontumispaikat olivat *La Alameda*
  (eli *Paseo de las Bonitas*), *El Camposanto*, *La Cruz de Gálvez*
  ja *el Limonar*. Kuvernööri **Guillermo Palominon** kaudella
  (**1886–1889**) syntyi ajatus laajentaa kaupunkia, ja
  **tammikuussa 1888** maanviljelijöiden, teollisuudenharjoittajien
  ja kauppiaiden tuella perustettiin bulevardi **Paseo de Montejo**,
  esikuvana ranskalainen bulevardi. Katu on yli **6 km** pitkä,
  puiden reunustama ja siinä on useita liikenneympyröitä; se on
  nimetty kaupungin perustaneen **Francisco de Montejon** mukaan.
- Paseo de Montejon varrella ovat mm. **"Las Casas Gemelas"**
  (kaksoistalot), kaksi ranskalais-espanjalaistyylistä kartanoa,
  jotka **Camilo ja Ernesto Cámara Zavala** saivat valmiiksi
  **1911**; Barbachanon ja Molina Méndezin sukujen omistamina ne ovat
  harvoja ajan taloja, joissa yhä asutaan. ("Historic sites")

## 6. Kieli, kulttuuri ja arki

- Méridan espanja on selvästi erilaista kuin muualla Meksikossa: se
  on voimakkaasti **yucatekin mayan** vaikuttamaa, ja mayaa puhuu
  **kolmasosa Yucatánin osavaltion väestöstä**. Mayan kieli on
  melodinen, siinä on ejektiivisiä konsonantteja (pʼ, kʼ, tʼ) ja
  suhuäänteitä, joita merkitään kirjaimella x. Artikkeli kertoo
  myös **kielen leimasta**: vanhemmilla puhujilla mayan taito
  yhdistyi arvostukseen, nuoremmilla asenteet ovat kielteisempiä, ja
  tämä kytkeytyy sosioekonomiseen asemaan. **Yucatánin espanja on
  säilyttänyt sanoja**, joita muualla ei enää käytetä.
- **Hanal Pixán** on maya-katolinen kuolleiden juhla 1.–2.11.
  (toinen päivä aikuisille, toinen lapsille); alttarit tehdään
  kuolleille sukulaisille, ja krusifiksit sekoittuvat kallokoristeisiin
  ja ruokauhreihin. **Múkbil pollo** on kuolleille tarjottava
  mayapiirakka, jonka kanssa juodaan kuumaa suklaata; *muk-bil*
  tarkoittaa kirjaimellisesti "panna maahan" eli kypsentää
  **píib**-maakuopassa.
- **Mérida oli ensimmäinen Amerikan kulttuuripääkaupunki** ja
  ainoa kaupunki, joka on saanut arvon kahdesti (2000 ja 2017).
- **MACAY-museo** pystyttää joka vuosi Paseo de Montejolle uuden
  veistosnäyttelyn, jossa on töitä Meksikosta ja yhdestä toisesta
  maasta; näyttely on esillä 10 kuukautta. 2007 mukana oli Japani.
- **Yucatánin sinfoniaorkesteri** soittaa José Peón Contrerasin
  teatterissa.
- **Jarana yucateca** on niemimaan tunnusomainen tanssi ja
  musiikkimuoto. Tahtilajeja on kaksi: **6/8** ja **3/4**. Tanssitaan
  pareittain, ja askelkuvio on naisilla ja miehillä sama; säestää
  puhallinyhtye. Tanssijat asettavat päänsä päälle pulloja, joista ei
  saa läikkyä. Naisilla on **terno**, jossa on kolme osaa (*jubón*,
  *hipil*, *fustán*); miehillä valkoinen asu, guayabera, hattu ja
  polveen ulottuva liina (*paliacate*) sekä nahkasandaalit
  (*chillonas*). Tanssi kuuluu **vaquería**-juhlaan, joka syntyi
  siitä, että espanjalaiset karjatilalliset kutsuivat mayat
  laskemaan ja merkitsemään karjan ja sallivat sitten juhlan.
  **Huom.** en-Wikipedian "Jarana yucateca" -artikkeli nojaa osin
  matkailusivustoon; lehti käyttää siitä vain edellä luetellut
  yksinkertaiset piirteet eikä esitä sen tulkintoja historiasta
  faktana.

## 7. Ruoka — teemasivun aineisto

("Mérida, Yucatán" > Food, sekä kohdeartikkelit.)

- Yucatánin ruoka on **oma tyylinsä** ja poikkeaa siitä, mitä
  useimmat pitävät meksikolaisena ruokana. Siinä on vaikutteita
  paikallisesta mayakeittiöstä sekä karibialaisesta, meksikolaisesta,
  eurooppalaisesta ja Lähi-idän ruoasta. Trooppisia hedelmiä
  (kookos, ananas, luumu, tamarindi, mamey) käytetään paljon.
- **Achiote** eli annattosiemen on alueen tunnusmauste. Kova siemen
  jauhetaan muiden mausteiden kanssa punertavaksi tahnaksi,
  **recado rojo**. Muut ainekset: kaneli, maustepippurin marjat,
  neilikka, meksikonoregano, juustokumina, merisuola, mieto
  mustapippuri, omenaviinietikka ja valkosipuli.
- **Cochinita pibil** on hitaasti paahdettu sianliha, jonka liotus
  tehdään **happamaan sitrusmehuun** (yucatekilaisissa resepteissä
  aina sevillan- eli katkeraappelsiini), johon lisätään **annatto**,
  joka antaa kirkkaan **poltetun oranssin värin**. Liha kääritään
  **banaaninlehteen** ja paahdetaan **píib**-kuopassa. *Cochinita*
  tarkoittaa porsasta, joten aito cochinita pibil on kokonainen
  maitoporsas. Hapan marinadi ja pitkä kypsennys mureuttavat myös
  sitkeän lihan. Tarjotaan keltaisten maissitortillojen, punaisten
  etikkasipulien, papujen ja habanerojen kanssa. Perinteisesti
  paistetaan **maakuopassa, jonka pohjalla on tuli**.
- **Papadzules**: maissitortilloja kastetaan **kurpitsansiemen-
  kastikkeeseen** ja täytetään kovaksi keitetyllä kananmunalla;
  päälle tomaatti-chilikastike. Nimestä on **kaksi selitystä**:
  Diana Kennedyn mukaan se tarkoittaa "herrojen ruokaa", koska
  ruokaa kerrotaan tarjotun espanjalaisille; toisen mukaan se tulee
  mayan sanoista *papakʼ* (voidella) ja *sul* (liottaa) eli
  "voideltu ja liotettu". Ruokaa sanotaan hyvin vanhaksi, mutta
  **arkeologisessa aineistossa ei ole comaleja**, joten ohuita
  täytettäviä tortilloja tuskin tehtiin — mayojen tortilla (*pim*)
  oli paksu ja kypsennettiin tuhkassa. Kaikki perusaineet olivat
  silti olemassa; kananmunia ei ollut, mutta kalkkunoita ja
  myskisorsia oli kesytetty, ja myös iguaanin munia käytettiin.
  Kastike tehdään paahtamalla ja jauhamalla kurpitsansiemenet ja
  sekoittamalla ne epazote-liemeen; öljy puristetaan ensin erikseen
  ja ripotellaan lopuksi päälle. Käytetty siemen on **xtʼop**
  (*pepita gruesa*), joka tulee **xkaʼal**-kurpitsasta.
- **Sopa de lima** on kana- tai muusta lihasta ja limetinmehusta
  tehty keitto, jonka kanssa tarjotaan tortillasiruja. Se
  **luotiin 1946**, ja tekijänä mainitaan mestari nimeltä **Katún**
  (mayaksi "soturi"). Limetti ei ole pääaines vaan se, mikä antaa
  maun. Meksiko on ollut **ainakin 1950-luvulta** maailman suurin
  limetin tuottaja ja viejä.
- Muut alueen ruoat ("Mérida, Yucatán" > Food): **poc chuc**,
  **salbutes** (pehmeät tortillat, päällä salaattia, tomaattia,
  kalkkunaa ja avokadoa) ja **panuchos** (paistetut tortillat,
  täytteenä mustapapuja, päällä kalkkunaa tai kanaa, salaattia,
  avokadoa ja etikkasipulia); **queso relleno** (jauhettua sianlihaa
  koverretun **edam**-juustopallon sisällä, tomaattikastikkeessa);
  **pavo en relleno negro** eli *chimole* (kalkkunapata mustasta
  paahdettujen chilien tahnasta); **bul keken** (mayaksi "papuja ja
  sianlihaa", tarjotaan kodeissa maanantaisin); **brazo de reina**
  (pitkä litteä tamaali kurpitsansiemenillä, kääritään ja
  leikataan viipaleiksi); **tamales colados**. Habanero seuraa
  useimpia ruokia. Paikalliset chilit: **xcatik**, **seco de
  Yucatán** ja **habanero**.

## 8. Maantiede ja ilmasto

- Mérida on Yucatánin osavaltion luoteisosassa, noin **35 km**
  Meksikonlahden rannikolta. Pohjoisessa on **Progreso**, idässä
  Valladolid ja Tizimín, lännessä Celestún ja lounaassa Campeche.
  Väkiluku **921 770** (2020), metropolialue **1 316 090**.
- Kaupunki on lähellä **Chicxulubin kraatterin keskustaa** (tämä
  mainitaan vain taustana; kraatteri on maalehden aihe). Maasto on
  hyvin tasainen ja korkeus **noin 9 metriä** merenpinnasta.
  Kaupungin ulkopuolella on matalaa pensaikkoa ja vanhoja
  henekenpeltoja. **Pintavettä ei juuri ole**, mutta alueella on
  useita **cenotea** eli vajoamia, joista pääsee maanalaisiin
  lähteisiin ja jokiin.
- **Katuruudukko:** parittomat kadut kulkevat itä–länsi ja parilliset
  pohjois–etelä. **Calle 60** ja **Calle 61** rajaavat pääaukiota
  **Plaza Grandea**. Varakkaammat alueet ovat pohjoisessa, tiheimmin
  asutut etelässä. Kaupungin *centro histórico* on **Amerikan
  suurimpia**; "Mérida, Yucatán" -johdanto sanoo sen **kolmanneksi
  suurimmaksi maanosassa**.
- **Ilmasto:** trooppinen savanni (Köppen **Aw**). Kaupunki on
  pasaativyöhykkeessä lähellä Kravun kääntöpiiriä, ja vallitseva
  tuuli on idästä. Ilmasto on kuuma, kosteus kohtalaisesta korkeaan.
  Vuoden **keskiylin 33,5 °C**: joulukuun **30,6 °C**:sta toukokuun
  **36,3 °C**:seen, ja iltapäivällä lämpötila nousee usein yli
  **38 °C**. Alimmat vaihtelevat tammikuun **17,2 °C**:sta toukokuun
  **21,7 °C**:seen. Sisämaan sijainnin ja matalan korkeuden takia
  Méridassa on tavallisesti pari astetta kuumempaa kuin rannikolla.
  **Sadekausi kesäkuusta lokakuuhun** (Meksikon monsuuni); myös
  itäiset aallot ja trooppiset myrskyt vaikuttavat.

## 9. Kohdekartan kohteet (8) — lähteet ja koordinaatit

Koordinaatit **7.9.2026**: es-Wikipedian coordinates-rajapinta
(Casa de los Montejo, Teatro Peón Contreras), es-Wikipedian
artikkelin koordinaattimalline (Santa Anan puisto) ja Nominatim
(muut). Kaikki 28 väliä on mitattu haversinilla; **pienin väli on
368 metriä** (Casa de los Montejo – kaupunginmuseo), toiseksi pienin
417 metriä (Teatro Peón Contreras – Casa de los Montejo) ja suurin
2 245 metriä (Santa Anan kirkko – Santa Isabelin ermita).

1. **Santa Anan kirkko ja tori** 20.975846 / −89.621209 —
   es-Wikipedia "Barrio de Santa Ana (Mérida, México)". Ks. kohta 2.
2. **Teatro Peón Contreras** 20.969489 / −89.622476 — es-Wikipedia
   "Teatro Peón Contreras". Méridan **vanhin näyttämö**: kolme nimeä
   ja kolme rakennusta samalla paikalla. Ensimmäisen, **Teatro San
   Carlosin**, valinta alkoi **1806**; **1877** Antonino Bolio
   Guzmán osti sen ja nimesi *Teatro Bolioksi*; **27.12.1878** se
   sai nykyisen nimensä yucatánilaisen näytelmäkirjailijan ja
   lääkärin **José Peón Contrerasin** (1847–1907) mukaan
   sanomalehtien *Semanario Yucateco* ja *Revista de Mérida*
   aloitteesta. Avajaisnäytelmä oli Peón Contrerasin *El sacrificio
   de la vida*. **1897** saliin asennettiin **Lumièren veljesten
   tekniikka** elokuvien esittämiseen. **1899** perustettu Empresa
   Teatral de Mérida osti tontin, ja vanha rakennus purettiin.
   Nykyinen talo rakennettiin **1900–1908**: italialainen urakoitsija
   **Enrico Deserti**, arkkitehtuuri italialaisen **Pío Pialentinin**;
   vihittiin **21.12.1908**. Tyyli on **akateeminen eklektismi**, ja
   se sovitettiin kuumaan ilmastoon leveillä tuulettavilla
   käytävillä; marmoriportaikko, viisi aitiokerrosta, **700–750
   paikkaa**, kupolissa kreikkalaisia muusia. **Alkuvuodesta 1916
   siellä pidettiin Yucatánin ensimmäinen naisten kongressi, joka
   oli myös Meksikon ensimmäinen.** **1940** teatteri muutettiin
   elokuvateatteriksi (*Cinema Peón Contreras*), **1974** suljettiin
   huonokuntoisena, **1977** julistettiin historialliseksi
   monumentiksi, **1979** pakkolunastettiin, **1981**
   uudelleenvihittiin ja restaurointi valmistui **syksyllä 1984**.
   Vuodesta **2004** Yucatánin sinfoniaorkesterin kotinäyttämö.
3. **La Mejoradan puisto** 20.968346 / −89.616398 — es-Wikipedia
   "Parque de La Mejorada". Aukio Calle 50:llä katujen 59 ja 57
   välissä, entisen fransiskaaniluostarin edessä (nykyään Yucatánin
   yliopiston arkkitehtuurin tiedekunta). **Niemimaan ensimmäinen
   rautatiekisko laskettiin tähän puistoon 1.4.1870.** Nimi tulee
   kirkosta ja luostarista, jotka on nimetty *La Mejoradaksi*;
   todennäköisesti Espanjan **Mejoradan** mukaan, jonka
   samanaikaisen seurakuntakirkon piirustukset muistuttavat näitä.
   Kirkkoa (nyk. **Nuestra Señora del Carmen**) alettiin rakentaa
   **1621** encomendero **Diego Montalvo Garcían** varoilla; hän
   luovutti keskeneräisen rakennuksen fransiskaaneille, ja se
   valmistui **1640**. Luostari rakennettiin **1688–1694**, ja se oli
   tarkoitettu ankarimman sääntökunnan noudattajille; perustajien
   joukossa oli **Juan de Acevedo**. Munkit asuivat siellä, kunnes
   Yucatánin viimeinen siirtomaakuvernööri **Juan María Echeverri**
   otti rakennuksen **1820** sotaväen majoitukseen, kun
   kerjäläisveljeskunnat lakkautettiin kuninkaallisella asetuksella.
4. **Casa de los Montejo** 20.966195 / −89.624388 — es-Wikipedia
   "Casa de los Montejo". Rakennettu **1542–1549** valloittajien
   **Francisco de Montejo el adelantadon**, hänen poikansa
   *el mozon* ja veljenpoikansa asuintaloksi Plaza Granden laidalle.
   **Mahdollisesti Meksikon ainoa 1500-luvulla rakennettu
   siviilitalo plateresco-tyylissä.** Julkisivun kalkkikivessä on
   kirjoitus: *"Esta obra mando hacer el Adelantado, Don Francisco de
   Montejo el año de MDXLIX…"* — siitä päätellään valmistumisvuosi
   **1549**. Adelantadon kuoltua talo siirtyi pojalle ja tämän
   leskelle **Andrea del Castillolle**, joka määräsi, ettei taloa saa
   myydä vaan ainoastaan periä — näin syntyi Montejojen
   **majoraatti**. Suvun hallussa talo oli noin vuoteen **1832**.
   Tontti pieneni vähitellen myyntien myötä. **1839** talon osti
   Simón Peón y Peón; **1896** sisätilat muutettiin muodinmukaiseen
   ranskalaistyyliin ja ikkunoihin lisättiin **karyatidit**.
   **1981** Banamex osti talon, ja **2.12.2010** siihen avattiin
   INAH:n valvonnassa kulttuuritalo ja **Museo Casa Montejo**.
5. **Kaupunginmuseo (vanha postipalatsi)** 20.964452 / −89.621377 —
   es-Wikipedia "Museo de la Ciudad de Mérida". Rakennus on
   porfiriaton ajalta ja toimi **liittovaltion postipalatsina**:
   vihittiin **5.5.1908** kuvernööri **Enrique Muñoz Arísteguin**
   kaudella, ja siihen tuli lennätin-, posti- ja
   tuomioistuintoimistoja. Suunnitteli ja rakensi sotilasinsinööri
   **Salvador Echegaray**; tyyli **uusklassinen** ranskalaisin ja
   modernein sävyin lattioissa, seinissä ja ikkunapuitteissa.
   Museo muutti tänne **29.6.2007**. Pysyvästi esillä noin **150
   esinettä** neljässä salissa: esikolumbiaaninen Mérida, siirtomaa-
   aika, 1800-luku ja 1900-luvun alku sekä 1900-luku; ensimmäisessä
   kerroksessa kuusi vaihtuvan näyttelyn salia.
6. **San Cristóbalin kirkko ja kaupunginosa** 20.961151 /
   −89.617410 — es-Wikipedia "Barrio de San Cristóbal (Mérida,
   Yucatán)". Ks. kohta 2. Nykyään keskustan **suurin ja
   asutuin** kaupunginosa, ja sen seurakuntakirkko on Guadalupen
   Neitsyen juhlien keskus.
7. **San Juanin puisto ja kaari** 20.962616 / −89.626035 —
   es-Wikipedia "Barrio de San Juan (Mérida, México)".
   Kaupunginosa on Calle 61:llä katujen 58 ja 69 välissä. Kirkon
   vieressä seisoo yhä **kaari**, joka merkitsi valkoisten kaupungin
   loppua ja *barrios de indios* -alueiden alkua. Yhdessä Santa
   Isabelin ermitan, Santiagon, Santa Anan, San Sebastiánin, San
   Cristóbalin ja Mejoradan kanssa se merkitsi **siirtomaa-ajan
   Méridan rajoja**. Kaupunginosan juhlapäivä on **24. kesäkuuta**.
8. **Santa Isabelin ermita** 20.957247 / −89.629632 — es-Wikipedia
   "Ermita de Santa Isabel (Mérida, Yucatán)". Kappeli Calle 66
   surilla San Sebastiánin kaupunginosassa, siinä missä alkoi
   **camino real Méridasta Campecheen**. Tunnettiin aikoinaan nimellä
   *Nuestra señora del buen viaje* juuri tienvarsisijaintinsa takia;
   Santa Isabel viittaa **Johannes Kastajan äitiin**. Perustamisvuotta
   ei tiedetä tarkasti, mutta pääoven yllä on kaiverrus, jossa on
   vuosi **1748**. Rakennuttaja oli **Gaspar González de Ledezma**
   (1600-luku), jonka näkemys oli, että temppelin rakentaminen
   ansaitsi taivaspaikan paremmin kuin hurskaus tai pyhimysten
   palvonta.

**Kohteet, jotka jätettiin kartalta pois aihesyistä (New Yorkin
sääntö):** katedraali (lehden noston 1 loppuhuipennus), koko
**Paseo de Montejo** kartanoineen (noston 4 aihe), kaupungin
**kaaret** yleisenä aiheena (noston 2 aihe) ja **Lucas de Gálvezin
tori** (etusivun ennen–nyt-parin aihe).

**Pudotetut:** kaupungintalo (20.967120 / −89.624484) on **103
metrin** päässä Casa de los Montejosta ja Santa Lucían puisto
(20.971176 / −89.622580) **188 metrin** päässä Peón Contrerasin
teatterista — molemmat alle 200 metrin säännön. **Yucatánin
hallintopalatsi** (20.967833 / −89.623361) mahtuisi juuri ja juuri
(206 m teatterista, 211 m Casa de los Montejosta), mutta se
pudotettiin silti: Plaza Grandelta otetaan kartalle vain yksi kohde,
ja se on Casa de los Montejo. Kaikki kolme mainitaan matkaoppaassa.

**Rajauksen ulkopuolella:** Gran Museo del Mundo Maya on 8 km
pohjoiseen, Dzibilchaltún 16 km pohjoiseen, Uxmal 62 km etelään ja
Progreso 35 km pohjoiseen. Nämä ovat oppaan retkijaksossa.

## 10. Retkikohteet (oppaan retkijakso)

- **Dzibilchaltún** (yucatekiksi *Tsʼíibil Cháaltun*) on
  arkeologinen alue noin **10 mailia** (16 km) Méridasta pohjoiseen;
  alkuperäinen nimi saattoi olla *Chʼiy Chan TiʼHo*. Paikka on ollut
  asuttu tuhansia vuosia, ja se on vuoroin kasvanut keskikokoiseksi
  kaupungiksi ja kutistunut pikkukaupungiksi. Rakentajat valitsivat
  paikan mahdollisimman läheltä **rannikon suolantuotantoaluetta**
  (n. 22 km) mutta yhä viljelykelpoiselta maalta. Tunnetuin rakennus
  on **Seitsemän nuken temppeli**, joka sai nimensä seitsemästä
  pienestä kuvasta, jotka löytyivät 1950-luvulla myöhemmän
  temppelipyramidin alta. **Kevätpäiväntasauksena** paikalle
  kokoontuu väkeä katsomaan auringonnousua temppelin oviaukkojen
  läpi — **artikkeli huomauttaa, ettei mikään arkeologinen
  rakennepiirre merkitse katselupaikkaa, joten yhteys temppelin
  suuntauksen ja päiväntasausten välillä on hyvin epätodennäköinen.**
  **Lehti kertoo tämän varauksen ääneen.** Temppeli yhdistyy muuhun
  alueeseen **sacbe**-tiellä ("valkoinen tie", alun perin
  kalkkikivipintainen). Alueen toinen keskeinen piirre on cenote
  **Xlakah**, josta sukeltajat ovat löytäneet uhriesineitä; alue on
  nykyisin suljettu. Paikalla on myös 1500-luvun espanjalaisen
  kirkon raunio. Yksi paikan kuninkaista tunnetaan nimeltä:
  **Kʼaloʼmteʼ Ukʼuuw Chan Chaahk** (stela 10).
- **Uxmal** (yucatekiksi *Óoxmáal*) on **62 km** Méridasta etelään
  Puuc-alueella ja Unescon maailmanperintökohde (yhdessä Kabahin,
  Sayilin ja Labnán kanssa). Puuc-tyylille ovat ominaisia sileät
  matalat seinät, jotka avautuvat koristeellisiin friiseihin;
  friisien pylväät kuvaavat mayamajan ruokoseiniä ja trapetsit
  olkikattoja. Kietoutuvat käärmeet ja kaksipäiset käärmeet
  muodostavat sadejumala **Chaacin** naamioita, joiden isot nenät
  esittävät myrskyn säteitä. Rakennuksista tunnetuimmat ovat
  **Taikurin pyramidi** (viisi tasoa) ja **kuvernöörin palatsi**
  (yli 1 200 m²). Nimen arvellaan tulevan muodosta *Oxmal*,
  "kolmesti rakennettu"; toinen mahdollisuus on *Uchmal*, "se mikä
  on tuleva". Perimätiedon mukaan se oli "näkymätön kaupunki", jonka
  kääpiökuningas rakensi taialla yhdessä yössä.
- **Progreso** on satamakaupunki **noin puolen tunnin ajomatkan**
  päässä Méridasta pohjoiseen. Sen perusti **1872 Juan Miguel
  Castro**, jotta Méridalla olisi lähempi satama kuin vanha
  **Sisal**. Nykyään siellä on kalastus- ja konttisatama sekä yksi
  uusimmista risteilijäsatamista: laituri **Terminal Remota**
  avattiin **1989** ja työntyy **6,5 km** Meksikonlahdelle.
  Heinä- ja elokuussa méridalaiset muuttavat rannikolle viileämpään.
- **Celestún** on osavaltion luoteiskulmassa. Kaupungin ympärillä on
  **Ría Celestúnin biosfäärialue**, **600 km²** kosteikkosuojelualue,
  joka on **amerikanflamingojen talvikoti**; siellä on myös haikaroita
  ja yli **200 muuttavaa tai paikallista lintulajia**. Ekosysteemi on
  ainutlaatuinen, koska siinä sekoittuvat estuaarin makea vesi ja
  Meksikonlahden suolainen vesi. Alue on myös uhanalaisten
  merikilpikonnien kuoriutumispaikka. Kaupungissa on 1800-luvun
  majakka, ja se tuottaa kalan lisäksi **suolaa**, kuten
  esikolumbiaanisista ajoista asti. Väkiluku oli vuonna 2000 vajaat
  6 000, mutta **mustekalakauden** aikana se nousee 10 000:een.

## 11. Sisältölinjaukset (spec-mantereet.md)

- **Alkuperäiskansat kunnioittavasti ja elävinä.** Mayat ovat
  Méridassa nykypäivän toimijoita: kolmasosa osavaltion väestöstä
  puhuu yucatekia, Hanal Pixán ja jarana ovat elävää arkea, eikä
  "kadonneen kansan" kehystä käytetä. Kastisota kerrotaan
  **mayajohtajien omin sanoin** (Pat 1848, Chi 1849) eikä pelkästään
  hallinnon näkökulmasta.
- **Väkivalta tapahtumina, ilman julmuuksien yksityiskohtia.**
  Teloitukset, poltetut kylät ja orjakauppa mainitaan tapahtumina
  yhdellä lauseella; verilukuja ei toisteta eikä osapuolia
  sankarilliseta kumpaankaan suuntaan.
- **Ei nykypolitiikkaa eikä nykyrikollisuutta.** Mérida-aloite 2007,
  presidenttitapaamiset ja turvallisuusvertailut jäävät pois; myös
  "yksi Meksikon turvallisimmista kaupungeista" -tyyppinen
  vertailu jätetään pois, koska se on nykypolitiikan reunalla.
- **Maya-nimet ensin.** Tʼhó/Ichcaanzihó ennen Méridaa, *pib* ennen
  maakuoppaa, *xtʼop* ennen pepita gruesaa.
