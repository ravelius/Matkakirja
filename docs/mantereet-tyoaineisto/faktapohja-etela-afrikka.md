# Etelä-Afrikka-maalehti (ISO-3: ZAF) — lyhyt faktapohja

*Koonnut Opus-lehtiagentti 7.9.2026. Kaikki faktat haettu samana päivänä
en-Wikipedian raakatekstistä (`api.php?action=query&prop=extracts&
explaintext=1`, `NODE_USE_ENV_PROXY=1`). Lyhyt faktapohja: vain ne luvut,
päiväykset ja nimet, jotka päätyivät `js/packs/maa-kategoriat.js`:n
ZAF-lohkoon, sekä ristiriidat ja rajaukset. Rakenteen sitova lähde
docs/moduulit/maalehti.md.*

Aiheet (5 × 4 nostoa): **Historia, Kielet, Musiikki, Ruoka, Kuvataide.**
Minitehtävä on Kielet-sivulla (kansallislaulun nimen merkitys).

## Rajaus: mitä maalehti EI kerro

Etelä-Afrikka on pelin kattavimmin katettuja maita jo ennen maalehteä,
joten aiheet valittiin täydentämään eikä toistamaan:

- **Kaupunkilehti Kapkaupunki** (`js/packs/kulttuuri-kategoriat.js`,
  avain `kapkaupunki`) kattaa Pöytävuoren geologian, fynbosin,
  pöytäliinapilven, Maclearin kivimerkin, Kirstenboschin, Yhtiön
  puutarhan, Bo-Kaapin ja arabialaisin kirjaimin kirjoitetun
  afrikaansin, vuoden 1873 sataman ja timanttirahan, bobotien,
  Robben Islandin lauttamatkan ja kaupungin oman juhlan.
  → maalehti ei koske yhteenkään näistä. **Erityisesti: Bo-Kaapin
  arabialaiskirjaiminen afrikaans jätettiin pois Kielet-osiosta**,
  vaikka se olisi luonteva nosto, koska kaupunkilehti kertoo sen jo.
- **Karttanostot.** `js/packs/maastokohteet-zaf.js`: Mafadi, Pöytävuori,
  Intian valtameri (latimeria), Oranjejoki, Sterkfonteinin luolat,
  Kruger, Isandlwana, Cape Agulhas, Stellenbosch, Pilgrim's Rest,
  Vredefortin kraatteri, iSimangaliso. `js/packs/skandaalit.js`:
  Etelä-Afrikan tähti (Hopetown 1869 → Kimberley) ja Mapungubwen
  kultasarvikuono. `js/packs/elaintakyt.js`: afrikanpingviini.
  → **Luonto ja tiede jätettiin aiheina kokonaan pois**, koska
  karttanostot kantavat ne jo (paleoantropologia, geologia,
  kansallispuistot, merieläimistö). Tilalle otettiin Kielet ja
  Kuvataide, joita ei kerro mikään muu moduuli.
- **Herkät aiheet.** Apartheid ja siirtomaahistoria kerrotaan
  tapahtumina ja päätöksinä. Nykypolitiikkaa ei ole. Sharpeville
  mainitaan vain siltä osin kuin Makeban passin mitätöinti vaatii
  (ei mainita erikseen tapahtumana), eikä käynnissä olevia
  selkkauksia käsitellä (M3:n Myanmar-linja).

## 1. Historia

- **Suuri vaellus** (en-Wikipedia "Great Trek", johdanto-osa):
  hollanninkielisten uudisasukkaiden eli buurien muutto Kapin
  siirtokunnasta sisämaahan **vuodesta 1836 alkaen**, härkävankkurein,
  brittihallinnon ulottumattomiin. Osallistujat kutsuivat itseään
  nimellä **voortrekker**, "edelläkulkija" tai "tienraivaaja".
  Seurauksena syntyivät buuritasavallat **Transvaal (Etelä-Afrikan
  tasavalta), Oranjen vapaavaltio ja Natalia**. Johdanto toteaa myös
  **pohjoisten ndebelien siirtymisen** ja **yhteenotot zulujen kanssa**,
  jotka myötävaikuttivat zulukuningaskunnan rappioon.
- **Rivonian oikeudenkäynti** (en-Wikipedia "Rivonia Trial",
  johdanto-osa sekä osiot "Origins" ja "Sentencing"): Mandela muutti
  **lokakuussa 1961** Liliesleafin maatilalle Rivoniaan ja esiintyi
  puutarhurina ja kokkina nimellä **David Motsamayi**. Poliisi ratsasi
  tilan **11.7.1963**. Oikeudenkäynti **9.10.1963–12.6.1964**
  Pretoriassa. Mandelan puheen loppusanat ("if needs be, it is an ideal
  for which I am prepared to die") **puolustusasianajajat vastustivat**
  kuolemantuomion pelossa, ja myönnytyksenä Mandela lisäsi sanat "if
  needs be". **Kahdeksan tuomittiin elinkautiseen 12.6.1964**, Lionel
  Bernstein vapautettiin. Käsittely nauhoitettiin **591
  Dictabelt-nauhalle** (lähes 250 tuntia), ja **Unesco lisäsi
  asiakirjat Maailman muisti -rekisteriin 2007**.
  *(Lehteen ei kirjoitettu suoraa lainausta vaan asiasisältö.)*
- **Vuoden 1994 vaalit** (en-Wikipedia "1994 South African general
  election", johdanto-osa ja osio "Conduct"): **26.–29.4.1994**,
  ensimmäiset vaalit yleisellä äänioikeudella. **19 726 579 ääntä
  laskettiin**, 193 081 hylättiin. **Inkatha-vapauspuolue** perui
  boikottinsa **19.4.** eli päiviä ennen vaaleja, ja se lisättiin jo
  painettuihin äänestyslippuihin **tarralla**. Maaseudulla jonotettiin
  artikkelin sanoin "päiviä". **ANC 62 %**. Uuden kansalliskokouksen
  ensimmäinen teko oli valita **Mandela presidentiksi**. **27.4.** on
  nyt vapaudenpäivä.
- **Totuus- ja sovintokomissio** (en-Wikipedia "Truth and
  Reconciliation Commission (South Africa)", johdanto-osa sekä osiot
  "Creation and mandate", "Process" ja "Numbers"): perustettu lailla
  **34/1995**, kuulemiset alkoivat **1996**, toimipaikka Kapkaupunki,
  puheenjohtaja **Desmond Tutu**. Armahduksen ehdot: teko poliittinen,
  suhteellinen ja **täysi tunnustus**. **Hakemuksia 7 111, armahduksia
  849**, hylkäyksiä 5 392. Voittajan oikeudenkäytön välttämiseksi
  **kumpaakaan puolta ei vapautettu** komission edestä. Tutu kytki
  mandaatin **ubuntuun**.

## 2. Kielet

- **Kaksitoista virallista kieltä** (en-Wikipedia "Languages of South
  Africa", johdanto-osa ja osio "Language demographics"): **yksitoista
  puhuttua kieltä virallistettiin vuoden 1996 perustuslaissa**, ja
  **eteläafrikkalainen viittomakieli hyväksyttiin kahdenneksitoista
  3.5.2023** kansalliskokouksen päätöksellä. Äidinkielten osuudet:
  **zulu 23 %, xhosa 16 %, afrikaans 14 %, englanti 9,6 %** (neljäs).
  Englanti on hallinnon ja median kieli. Bantukielet jakautuvat
  **nguni-** (itä, Intian valtameren rannikko) ja **sotho–tswana-**
  haaraan (pohjoinen sisämaa).
- **Naksahdukset** (en-Wikipedia "Xhosa language", johdanto-osa sekä
  osiot "Phonology" ja "History"): xhosassa on **15
  naksahduskonsonanttia** (18, jos prenasalisoidut lasketaan), ja
  erään laskennan mukaan **10 % perussanastosta** sisältää
  naksahduksen. Kirjaimet **c, x ja q** merkitsevät kolmea
  ääntämispaikkaa. Bantukielinen kantamuoto **ei sisältänyt
  naksahduksia**, vaan ne ovat **khoisanlainaa**; arviolta **15 %
  xhosan sanastosta on khoisanperäistä**.
  *(Vertailuluvut Juǀʼhoan 48 ja Taa 83 jätettiin pois tilan takia.
  Makeban "Click Song" eli Qongqothwane on samassa artikkelissa, mutta
  se jätettiin pois, jottei Makeba-nosto toistuisi Musiikki-sivulla.)*
- **Fanagalo** (en-Wikipedia "Fanagalo", johdanto-osa sekä osiot
  "Etymology" ja "Bhrosha"): pidgin, jonka **sanasto on pääosin zulua**
  ja jossa on englantia ja vähän afrikaansia. Käytössä **kullan,
  timanttien, hiilen ja kuparin kaivoksissa**. Nimi ngunimuodoista
  **fana-ga-lo = "kuin + tuo" eli "tee näin"** — opetuskielen nimi.
  Syntyi **1800-luvun lopun kaivostyössä** monikielisten työmiesten
  välille. Puhujia arvioitiin **1975** olevan "useita satojatuhansia";
  käyttö väheni, kun englannista tuli yleinen apukieli.
- **Kansallislaulu** (en-Wikipedia "National anthem of South Africa",
  johdanto-osa ja osio "Structure", sekä "Nkosi Sikelel' iAfrika",
  johdanto-osa ja osio "History"): **Enoch Sontonga**, metodistisen
  lähetyskoulun opettaja Johannesburgin lähellä, sävelsi virren
  **1897**; nimi tarkoittaa **"Jumala siunatkoon Afrikkaa"**. Sävelmä
  on yhä **Tansanian ja Sambian kansallislaulu** (Zimbabwe ja Namibia
  ovat vaihtaneet). Nykyinen hybridilaulu **otettiin käyttöön 1997**:
  ensimmäinen säkeistö xhosaksi ja zuluksi, toinen sesothoksi, kolmas
  afrikaansiksi (Die Stem) ja viimeinen englanniksi — **viisi kieltä**.
  Sävellys on **progressiivisesti sävellajia vaihtava**: alkaa
  **G-duurista**, päättyy **D-duuriin**.

## 3. Musiikki

- **Solomon Linda ja Mbube** (en-Wikipedia "Solomon Linda",
  johdanto-osa sekä osiot "Early life and career", "Mbube" ja
  "Royalties"): Linda **(1909–1962)** muutti **1931** Msingan
  maaseudulta Johannesburgiin, lauloi **Evening Birds** -kuorossa,
  työskenteli **1939** Gallon tehtaalla levynpakkaajana ja
  **improvisoi studiossa laulun "Mbube"** ("leijona"). Levyä myytiin
  **yli 100 000 kappaletta yhdeksässä vuodessa**. Linda **myi
  oikeutensa Eric Gallolle kymmenellä shillingillä** heti istunnon
  jälkeen; tuomioistuin katsoi kaupan myöhemmin kohtuuttomaksi.
  **Pete Seeger** kuuli levyn (Alan Lomaxin kautta) ja Weavers
  julkaisi **"Wimoweh" joulukuussa 1951**; **The Tokens** julkaisi
  **"The Lion Sleeps Tonight" lokakuussa 1961** — kummassakaan Lindaa
  ei mainittu. **2004** jälkeläiset haastoivat Disneyn; asia
  **sovittiin ennen käsittelyä**, ja Linda sai **tekijämerkinnän**.
  *(Sovintovuotta ei kirjoitettu lehteen, koska artikkeli ei nimeä
  sitä; lehdessä lukee "vasta 2004 nostettu kanne".)*
- **Miriam Makeba** (en-Wikipedia "Miriam Makeba", johdanto-osa sekä
  osiot "South Africa: 1932–1959", "Exile" ja "Return"): **1959**
  neljän minuutin esiintyminen elokuvassa **Come Back, Africa**
  (ohjaaja Lionel Rogosin) toi kansainvälisen huomion. **1960** äidin
  kuoltua **passi oli mitätöity**, eikä hän päässyt hautajaisiin.
  **1962** todisti YK:n apartheid-erityiskomitealle; sen jälkeen
  **kansalaisuus ja paluuoikeus vietiin** ja levyt kiellettiin.
  Valtiottomana hän sai passit **Algerialta, Guinealta, Belgialta ja
  Ghanalta**; elämänsä aikana **yhdeksän passia** ja kymmenen maan
  kunniakansalaisuus. **Grammy 15.3.1966** (albumi *An Evening with
  Belafonte/Makeba*) **ensimmäisenä afrikkalaisena artistina**.
  Palasi Etelä-Afrikkaan **10.6.1990 ranskalaisella passilla**.
- **Isicathamiya ja Ladysmith Black Mambazo** (en-Wikipedia
  "Isicathamiya", johdanto-osa; "Ladysmith Black Mambazo", johdanto-osa
  ja osio "1960–1986"): nimi verbistä **-cathama, "astua varovasti"**;
  vanhempi nimi **mbube, "leijona"**, tarkoitti voimakkaasti
  laulettua tyyliä, kun isicathamiyassa tavoitellaan **äänten
  sulautumista** ja varpailla liikkuvaa koreografiaa. Kilpailut
  **Johannesburgissa ja Durbanissa lauantaiöisin**, jopa **30 kuoroa,
  klo 20–08**. **Joseph Shabalala perusti ryhmän joulukuussa 1960**
  (ensin nimellä Ezimnyama) ja **1964 toistuvat unet** kuorosta
  täydellisessä harmoniassa saivat hänet kokoamaan ryhmän uudelleen.
  Nimi: kotikaupunki **Ladysmith**, musta härkä ja **mambazo = "kirves"**.
  *(Graceland 1986 ja Grammyt jätettiin pois tilan takia; ryhmän
  jäsenten kuolemat jätettiin pois väkivaltalinjauksen takia.)*
- **Amapiano** (en-Wikipedia "Amapiano", johdanto-osa sekä osiot
  "Origins" ja "Description"): **2020-luvun alun** Etelä-Afrikan
  tanssimusiikkia; nimi on **zulua ja tarkoittaa "pianoja"**. Aineksia
  **kwaitosta, deep housesta, gqomista, jazzista ja soulista**.
  **Yhtä perustajaa ei ole**, ja osa jäljittää synnyn **Pretoriaan**.
  Tunnusmerkki on **log drum -bassolinja**, sähköinen versio
  länsiafrikkalaisesta onttorummusta. Lauletaan **yhdellätoista maan
  kahdestatoista virallisesta kielestä**.

## 4. Ruoka

- **Braai** (en-Wikipedia "Regional variations of barbecue", osio
  "South Africa" alaosioineen "Shisa nyama" ja "National Braai Day";
  "Heritage Day (South Africa)", johdanto-osa): **braai** on
  afrikaansia; **braaivleis**, jossa *vleis* = liha, on **sukua
  englannin sanalle flesh**. Sana on levinnyt afrikaanereilta kaikkiin
  väestöryhmiin. Lisukkeena **pap** (hienoksi jauhettu maissipuuro) ja
  **chakalaka**. **Shisa nyama** on zulua "polta lihaa": lihakauppias
  antaa grillipaikan ilmaiseksi niille, jotka ostavat lihan häneltä.
  **Kansallinen braai-päivä alkoi 2005** (Mzansi Braai Institute) ja
  on **24.9.** eli sama päivä kuin **perintöpäivä**; **Desmond Tutu
  nimitettiin suojelijaksi 5.9.2007**.
- **Bunny chow** (en-Wikipedia "Bunny chow", johdanto-osa ja osio
  "History"): **Durbanin** intialaisperäisen väestön ruoka, ajoitettu
  **1940-luvulle**. Onteloksi kaiverrettu vaalea limppu täytetään
  curryllä; **neljännesannosta** kutsutaan nimillä **kota ("quarter"),
  skhambane tai shibobo**. **Alkuperä on kiistanalainen**; yhden
  kertomuksen mukaan sokeriruokoviljelmien intialaiset työmiehet
  levittivät ruokansa ensin suurille lehdille, mutta lyhyt tauko
  johti nopeampaan leipäastiaan.
- **Biltong** (en-Wikipedia "Biltong", johdanto-osa ja osio "Origins
  and history"): ilmakuivattua lihaa naudasta, **strutsista tai
  kudusta**. Nimi afrikaansin sanoista **bil ("takapuoli") ja tong
  ("suikale")**. Ero jerkyyn: **jerky kuumennetaan vähintään 71
  asteeseen**, biltong kuivuu ilmassa. Hollantilaisten tuomat mausteet
  **pippuri, korianteri ja mausteneilikka** ovat itsessään
  antimikrobisia. **Paikallisen kertomuksen mukaan** 1600-luvun
  uudisasukkaat kuivattivat lihaa **satulan alla hevosen hiessä**
  — artikkeli esittää tämän perimätietona ("according to local lore"),
  ja lehden teksti sanoo saman.
- **Rooibos** (en-Wikipedia "Rooibos", johdanto-osa sekä osiot
  "Production and processing", "Cultivation", "History" ja "Protected
  designation"): *Aspalathus linearis* kasvaa **vain Cederbergissä**,
  noin **249 km (155 mailia) Kapkaupungista pohjoiseen**, noin
  **60 000 hehtaarin alueella**. Lehdet **hapetetaan**, jolloin väri
  muuttuu punaruskeaksi; juoma on **kofeiiniton**. **1930-luvulla**
  piirilääkäri **Pieter le Fras Nortier** ratkaisi itämisongelman
  (siemenet vaativat **skarifioinnin**); **iäkäs khoinainen** löysi
  siemenvaraston seuraamalla muurahaisia pesään ja murtamalla sen.
  **EU myönsi alkuperäsuojan (PDO) toukokuussa 2021.**
  *(Lehteen kirjoitettiin "noin 250 kilometriä" pyöristettynä.)*

## 5. Kuvataide

- **Sanien kalliomaalaukset** (en-Wikipedia "Drakensberg", osiot
  "Etymology", "Conservation" ja "San cave paintings"): Clarensin
  hiekkakivimuodostuman luolissa on **35 000–40 000 sanien maalausta**
  — artikkelin mukaan **maailman suurin tällainen kokoelma**.
  Noin **20 000 yksittäistä maalausta on kirjattu 500 kohteesta**
  Royal Natalin kansallispuiston ja Bushman's Nekin väliltä; yksin
  **Sebaayenin luolassa 1 146**. Maalauksia on **vaikea ajoittaa**
  käytettyjen aineiden takia, mutta **sanit ovat asuneet alueella
  vähintään 40 000 vuotta**. **uKhahlamba Drakensbergin puisto
  maailmanperintöluettelossa 2000**. Zulunkielinen **uKhahlamba** ja
  sothon **Maloti** käännetään "ylöspäin osoittavien keihäiden
  valliksi".
  *(Artikkelin osa numeroista on peräisin sivustoilta mountainsides.co.za
  ja southafrica.info; lehteen otettiin vain ne luvut, jotka artikkeli
  esittää omassa tekstissään tai selvästi lähteineen — 1 146 ja 20 000
  on merkitty artikkeliin sivustolainauksina, ja siksi lehden teksti
  sanoo "on kirjattu" eikä väitä täsmällistä kokonaislukua.)*
- **Vaakuna** (en-Wikipedia "Coat of arms of South Africa",
  johdanto-osa sekä osiot "Blazon", "Symbolism" ja "Motto"):
  otettiin käyttöön **vapaudenpäivänä 27.4.2000**, suunnittelija
  **Iaan Bekker**, korvasi **vuoden 1910 vaakunan** (latinankielinen
  tunnuslause *Ex Unitate Vires*). Kilven **kaksi ihmishahmoa on
  johdettu khoisanien kalliotaiteesta, Linton-kivestä**, joka on
  **Iziko South African Museumissa Kapkaupungissa**; hahmot on
  kuvattu **toisiaan tervehtien**. Tunnuslause **ǃke e꞉ ǀxarra ǁke**
  on **sammuneen ǀxam-kielen** (khoisankieli) ja tarkoittaa
  kirjaimellisesti **"erilaiset ihmiset yhdistyvät"**.
- **Ndebelen seinämaalaus ja Esther Mahlangu** (en-Wikipedia "Ndebele
  house painting", johdanto-osa ja osio "History"; "Esther Mahlangu",
  johdanto-osa sekä osiot "Early life", "Career" ja "Style"):
  maalaus on **naisten työtä**, ja **tytöt oppivat sen äidiltään ja
  isoäidiltään** valmistautuessaan koristelemaan oman kotinsa
  ulkoseinät avioiduttuaan. **Mahlangu s. 11.11.1935** Middelburgin
  lähellä; **aloitti 10-vuotiaana**. **1991 BMW tilasi häneltä
  taideauton** — aiempia tekijöitä olivat **Andy Warhol, David
  Hockney ja Frank Stella** — ja hän oli **ensimmäinen
  ei-länsimainen taiteilija ja ensimmäinen nainen** tehtävässä.
  Auto oli **BMW 525i**, ja se oli **hänen ensimmäinen työnsä muulle
  pinnalle kuin seinälle**. Sivellin on tehty **kananhöyhenistä**.
- **Gerard Sekoto** (en-Wikipedia "Gerard Sekoto", johdanto-osa sekä
  osiot "Early life" ja "Paris"): **s. 9.12.1913, k. 20.3.1993**.
  Jätti opettajan työn ja muutti **1938 Johannesburgin Sophiatowniin**;
  ensimmäinen yksityisnäyttely **1939**. **1940 Johannesburg Art
  Gallery osti häneltä maalauksen — ensimmäinen mustan taiteilijan
  teos museokokoelmaan.** Asui **1942 District Sixissä**
  Kapkaupungissa ja **1945 Eastwoodissa Pretoriassa**. **1947 lähti
  Pariisiin omaehtoiseen maanpakoon**; elätti itsensä **pianistina
  yökerhossa l'Échelle de Jacob** ja **sävelsi 29 laulua**, joista
  moni käsittelee maanpaon yksinäisyyttä.
  *(William Kentridge luettiin ja hylättiin viidenneksi nostoksi:
  aihe on vahva, mutta kiintiö on neljä nostoa. Ehdotus kuvaputkelle
  ja mahdolliselle jatkoerälle.)*

## Uutislähde

**Daily Maverick** (kapkaupunkilainen riippumaton uutissivusto,
perustettu 2009), syöte `https://www.dailymaverick.co.za/dmrss/`,
kieli `en`. Testattu 7.9.2026 molemmilla resepti-testeillä: syötteessä
53 juttua; artikkelisivun `<article>`-lohkosta jäsentyy 12 yli 60
merkin kappaletta ja sivulla on `og:image`.

Testattu ja hylätty: IOL (syöte 403), EWN ja SowetanLIVE (301 ja
uudelleenohjauksen päässä 404 — worker ei seuraa ohjauksia), TimesLIVE
(404), News24 / feeds.24.com (yhteys ei aukea tästä ympäristöstä).
**SABC News läpäisi molemmat testit** (syötteessä 10 juttua,
artikkelisivulla 6 pitkää kappaletta ja og:image) ja on varalla, mutta
se on valtion yleisradioyhtiö — sama valinta kuin Keniassa, jossa
yksityinen Capital FM valittiin KBC:n ohi.

## Kuvat (14/20 nostoa) ja kuvattomat

Kaikki kuvat haettu Commonsin hakurajapinnasta, lisenssi ja tekijä
luettu `extmetadata`-kentistä, ja **jokainen katsottu silmin** 480 px:n
esikatselusta ennen käyttöä.

| Nosto | Tiedosto | Lisenssi |
| --- | --- | --- |
| Suuri vaellus | G.S. Smithard; J.S. Skelton (1909) - The Voortrekkers.jpg | PD |
| Rivonia | Liliesleaf hut1.jpg | PD |
| Totuuskomissio | Desmond Tutu - Kirchentag Cologne 2007 (7137).jpg | CC BY-SA 4.0 |
| Kaksitoista kieltä | ConstitutionalCourtofSouthAfrica-entrance-20070622.jpg | CC BY 2.0 |
| Kansallislaulu | Enoch Sontonga Braamfontein.jpg | CC BY-SA 3.0 |
| Makeba | Miriam Makeba 1986 (cropped).jpg | PD |
| Isicathamiya | Ladysmith Black Mambazo 2018.jpg | CC BY 2.0 |
| Braai | Braai Fire, Cape Town, South Africa-3629.jpg | CC BY-SA 3.0 |
| Bunny chow | Chicken Curry Bunny Chow.JPG | CC BY-SA 4.0 |
| Biltong | Sliced Biltong.jpg | CC BY-SA 3.0 |
| Rooibos | Rooibos (Aspalathus linearis)PICT2813.JPG | CC BY-SA 2.5 |
| Kalliomaalaukset | ELANDS - San rock-art panel at Eland Cave… .jpg | CC BY-SA 4.0 |
| Vaakuna | Linton Panel IZIKO, Capetown DSC00228 (16091324620).jpg | CC BY-SA 2.0 |
| Mahlangu | BMWArtCar-Mahlangu.jpg | CC BY-SA 3.0 |

**Katsottu ja hylätty:** *Braai Meat, Cape Town…-3627.jpg* (kuvassa
kaupan pakkaus tuotemerkkeineen), *A Real Braai…-3619.jpg* (kaksi
tunnistettavaa yksityishenkilöä), *Braai Fire 2.jpg* (lähes musta),
*Braai, HOK, 2009 1.jpg* ja *Braai Parys, street vendor.jpg*
(parkkipaikkanäkymiä autoineen ja kauppaketjun kylttiä), *Biltong and
Droëwors, South Africa.jpg* (myymälähylly tuotemerkkeineen),
*Aspalathus linearis 2797.jpg* (paljasta peltomaata, aihe ei erotu),
*Gold Reef City 005.jpg* (huvipuistonäkymä, ei kaivostyötä),
*Solomon Linda and the Tokens.png* (valokuvamontaasi),
*Mbube.jpg* (nykytaiteilijan juliste, jonka lukija erehtyisi
pitämään vuoden 1939 alkuperäisenä), *1994 Events montage…* (kollaasi).

**Kuvattomat kuusi nostoa** ovat kuvaputken tilauslista; jokaisesta on
haettu Commonsista eikä kelvollista löytynyt:

1. *Neljä päivää jonoa ja tarra äänestyslipussa* (historia) — kuvan
   pitää esittää vuoden 1994 äänestysjonoa tai äänestyslippua, jossa
   Inkathan tarra.
2. *Kolme naksausta, jotka lainattiin naapurilta* (kielet) — xhosan
   kirjoitettua kieltä, jossa c-, x- ja q-kirjaimet erottuvat
   (kirjan sivu, kyltti tai sanakirja).
3. *Kaivosten oma kieli syntyi käskyistä* (kielet) — Witwatersrandin
   kultakaivoksen nostotorni tai kaivosmiehiä työvuorossa.
4. *Kymmenellä shillingillä myyty maailmanhitti* (musiikki) —
   Solomon Linda tai Evening Birds, tai vuoden 1939 savikiekko.
5. *Rumpu, joka vei lähiöiden soundin maailmalle* (musiikki) —
   amapiano-tuottaja tai lähiöklubin tanssilattia Johannesburgissa.
6. *Museon ensimmäinen maalaus mustalta taiteilijalta* (kuvataide) —
   Sophiatownin katunäkymä 1940-luvulta (Sekoton omat teokset eivät
   ole vapaita: hän kuoli 1993).

## Tunnusluvut ja muut taulut

`MAATIEDOT.africa.ZAF` oli jo olemassa (`js/packs/africa-maatiedot.js`),
samoin `RADIOT.ZAF` (Ukhozi FM, SABC) ja maan genetiivi
`MAAN_GENETIIVIT['Etelä-Afrikka'] = 'Etelä-Afrikan'`. Tv-kanavaa ei
lisätty. Maaintro (`js/packs/africa-artikkelit.js`, avain
`'Etelä-Afrikka'`) pidennettiin kuuteen virkkeeseen, ja samalla
korjattiin virallisten kielten määrä yhdestätoista kahteentoista.
