# Nuuk — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `nuuk`, maa GRL, en-Wikipedia "Nuuk".
Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä, User-Agent `Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`)
**7.9.2026**. Mitat ja malli luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/aasia-tyoaineisto/lehtityo-resepti.md`, `docs/moduulit/kaupunkilehti.md`
ja `docs/tyolista-opukselle.md`. Mallilehdet: Fès ja Dakar (v1670),
Halifax ja Vancouver samalta laudalta.

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Nuuk"**,
**"Old Nuuk"**, **"Hans Egede House"**, **"Nuuk Cathedral"**,
**"Greenland National Museum"**, **"Qilakitsoq"**,
**"Kalaaliaraq Market"**, **"Inatsisartut"**, **"Katuaq"**,
**"Nuuk Art Museum"**, **"Public and National Library of Greenland"**,
**"University of Greenland"**, **"Isua Greenstone Belt"**,
**"Ameralik Span"**, **"Buksefjord hydroelectric power plant"**,
**"Blok P"**, **"Nuup Kangerlua"**, **"Moravian Brethren Mission House"**,
**"Hans Egede"**, **"Nuuk Airport"**, **"Greenland ice sheet"**, **"Ice core"**.

## 0. Rajaus tälle lehdelle

**Grönlannin maalehti (js/packs/maa-kategoriat.js, GRL) on jo tehty, ja
sen aiheita EI toisteta.** Maalehti kertoo: Cantinon planisfääri 1502,
Hans Egeden vuoden 1721 matka ja kielenoppiminen, Atuagagdliutit 1861,
Knud Rasmussen ja Luoteisväylä; sarvivalas ja yksisarvinen,
grönlanninhai, maan ainoa metsä, ilmestyvät ja katoavat saaret;
suaasat, kiviak, kuivattu ruoka, kahvi ja jäätikköolut; Aron Kangeqilainen,
Ammassalikin puukartat, lipun äänestys 14–11; qilaat-rumpulaulu,
kalattuut-polkka, Sumen levy, euroviisukarsinta.

Karttanostot on luettu: `js/packs/maastokohteet-grl.js` (Gunnbjørn Fjeld,
Ilulissatin jäävuono, Diskonsaari, Hvalsey, Ivittuut, Kangerlussuaq,
Grönlannin jäätikkö, Sisimiut, Uummannaq, Ittoqqortoormiit,
Koillis-Grönlannin kansallispuisto), `js/packs/skandaalit.js` (GRL:
Kuannersuit, Eirik Punaisen "vihreä maa") ja `js/packs/elaintakyt.js`
(grönlanninkoira). **Yksikään näistä ei ole tämän lehden aihe.**

**Tämä lehti pysyy kaupungissa:** niemen asuttajat, vuoden 1728
siirtokunnan siirto mantereelle, kaksi rinnakkaista lähetysasemaa
(Godthåb ja Uusi Herrnhut) vuonna 1873, pohjoisin pääkaupunki ja sen
tieverkko, sekä teemasivulla Nuukin oma tiede: jääkairaukset, Isuan
kivet, Ameralikin ylitys ja Ilisimatusarfik.

Laudan visa (`js/packs/northamerica-questions.js`, avain `nuuk`) kysyy
viisi asiaa: minkä saaren pääkaupunki, kuinka suuri osa jäätikön alla,
missä Nuuk sijaitsee, Grönlannin asema, mitä jäänäytteistä saa selville.
**Vastausten pitää löytyä lehden teksteistä** — ne ovat introssa
(sijainti, asema, jäätikön osuus) ja teemasivun nostossa T1
(jääkairaukset). **Minitehtävä ei saa kysyä yhtäkään näistä viidestä.**

Olemassa olevat lohkot luettu:
- `js/packs/northamerica-saapumiset.js` (`nuuk`): **valmis, ei kosketa.**
  Kertoo värikkäistä puutaloista, jäävuorista ja kajakista.
- `js/packs/northamerica-valokuvat.js` (`nuuk`): **ennen–nyt-pari on
  valmiiksi tarkistettu** (Nansenin Godthåb 1888–89 / Nuup Kangerlua
  2022), ja lisäkuvina Hans Egeden patsas talvella, satama keväällä ja
  Katuaq. Nämä viisi tiedostonimeä ovat varattuja.
- `js/packs/northamerica-artikkelit.js`: avaimella `Grönlanti` on
  maan intro (jäätikkö, Egede, metsästys) — kaupungin oma merkintä
  puuttuu ja kirjoitetaan avaimella `Nuuk`.
- `js/packs/saatiedot.js`: **säärivi ei kuulu tähän erään** (Fablen
  poikkeama 7.9.2026, kohta 2).

## 1. Perustiedot

- Nuuk (tanskaksi Godthåb) on Grönlannin pääkaupunki ja väkirikkain
  kaupunki; Grönlanti on Tanskan valtakunnan itsehallintoalue.
  Kaupunki on Sermersooqin kunnan keskus ja Grönlannin hallituksen
  (Naalakkersuisut) istuin sekä alueen suurin kulttuurin ja talouden
  keskus. — "Nuuk", johdanto.
- Väkiluku tammikuussa 2025 oli **20 113**, eli yli kolmasosa koko
  alueen väestöstä; se tekee Nuukista yhden maailman pienimmistä
  pääkaupungeista. — "Nuuk", johdanto. (Artikkelin infolaatikossa
  lukee 20 298 vuodelle 2026; ks. tarkistus.)
- Nimi: `Nuuk` on grönlanniksi 'niemi' ja esiintyy usein
  grönlantilaisissa paikannimissä. Kaupunki on Nuup Kangerlua -vuonon
  suussa. — "Nuuk", johdanto.
- Sijainti: noin 64°10′36″ N, 51°44′10″ W; vuonon suulla **10 km**
  Labradorinmereltä Grönlannin **lounaisrannikolla** ja noin **240 km**
  napapiiristä etelään. Leveysaste 64°11′ N tekee siitä **maailman
  pohjoisimman pääkaupungin**, muutaman kilometrin Reykjavíkia
  pohjoisempana. — "Nuuk", johdanto ja Geography.
- Vuono virtaa luoteeseen, kääntyy lounaaseen ja jakautuu alajuoksullaan
  kolmeen haaraan; haarojen välissä on kolme suurta saarta
  (Sermitsiaq, Qeqertarsuaq, Qoornuup Qeqertarsua). Vuono levenee
  suullaan luodikkoiseksi lahdeksi. — "Nuuk", Geography.
- **Sermitsiaq-vuori** on 1 210 m korkea ja 20 km koilliseen; se näkyy
  lähes kaikkialta Nuukista, ja valtakunnallinen sanomalehti Sermitsiaq
  on nimetty sen mukaan. Lähempänä ovat **Store Malene** (790 m,
  grönlanniksi Ukkusissaq = 'vuolukivi') ja **Lille Malene** (420 m).
  — "Nuuk", Geography.
- Magneettinen deklinaatio Nuukissa on äärimmäinen. — "Nuuk", Geography.
- Asukkaan nimitys: Nuummioq. — "Nuuk", infolaatikko.

## 2. Historia

### Varhainen asutus
- Nuukin seudun asutti ensin **Saqqaq-kulttuurin** paleoeskimoväestö
  jo **2200 eaa.**; he asuivat nykyisin hylätyn **Qoornoqin** ympäristössä.
- Pitkään aluetta asutti **Dorset-kulttuuri** entisen **Kangeqin**
  ympäristössä, mutta se katosi Nuukin piiristä ennen vuotta 1000 jaa.
- Sen jälkeen seudulla asui **norjalaisia (Norse)** noin vuodesta 1000
  siihen asti, kun asutus katosi epäselvistä syistä 1400-luvulla.
— "Nuuk", History › Early settlement.

### Perustaminen 1728
- Varsinainen kaupunki perustettiin **linnakkeena Godt-Haab vuonna 1728**,
  kun kuninkaallinen kuvernööri **Claus Paarss** siirsi lähetyssaarnaaja
  ja kauppias Hans Egeden aiemman **Toivon siirtokunnan** (Haabets
  Koloni) **Kangeqin saarelta mantereelle**. Uusi siirtokunta sijoitettiin
  inuiittiasutuksen Nûkin kohdalle ja nimettiin Godthaab, 'hyvä toivo'.
- Grönlanti oli tuolloin muodollisesti yhä Norjan siirtomaa
  Tanska-Norjan kruunun alla, eikä siirtomaahan ollut ollut yhteyttä
  yli kolmeensataan vuoteen.
- **Paarssin siirtolaiset olivat kapinoineita sotilaita ja tuomittuja;
  ensimmäisen vuoden aikana useimmat kuolivat keripukkiin ja muihin
  sairauksiin.**
- **1733–1734 isorokkoepidemia tappoi suurimman osan paikallisväestöstä
  sekä Egeden vaimon.** Hans Egede palasi Tanskaan 1736 viidentoista
  Grönlannin-vuoden jälkeen ja jätti työn pojalleen Poulille.
- Godthaabista tuli **Etelä-Grönlannin** siirtomaan hallintopaikka,
  kun taas **Godhavn** (nyk. Qeqertarsuaq) oli **Pohjois-Grönlannin**
  pääkaupunki vuoteen **1940**, jolloin hallinto yhdistettiin Godthaabiin.
— "Nuuk", History › Founding and early colonial period.

### Kaksi lähetysasemaa
- **1733** herrnhutilaiset (Moravian) lähetyssaarnaajat saivat luvan
  aloittaa lähetystyön saarella; **1747** käännynnäisiä oli tarpeeksi,
  ja rakennettiin **Moravian Brethren Mission House** ja perustettiin
  virallisesti **Uusi Herrnhut** (Nye-Hernhut).
- Tästä tuli nykyisen Nuukin ydin, kun monet kaakkoisrannikon
  grönlantilaiset muuttivat lähetysasemalle asumaan. Täältä käsin
  perustettiin lisää asemia: Lichtenfels 1748, Lichtenau 1774,
  Friedrichsthal 1824, Umanak 1861, Idlorpait 1864.
- Lähetysasemat lakkautettiin **1900** ja liitettiin Tanskan
  luterilaiseen kirkkoon.
— "Nuuk", History › Missionary settlements.
- Tarkennus: Uuden Herrnhutin alueen nimi on **Noorliit**; lähetyssaarnaajat
  **Matthaeus Stach, Christian Stach ja Christian David** saapuivat 1733,
  ja asema nimettiin Zinzendorfin kreivin Saksin Berthelsdorfiin
  perustaman yhteisön mukaan. **Moravian Brethren Mission House oli
  ensimmäinen Grönlantiin rakennettu kirkko** — siihen asti Godthaabin
  luterilainen lähetys käytti päärakennuksen sisällä ollutta kappelia.
  **Kaksi lähetystä toimivat eri tavoin ja olivat kaksi erillistä
  asutusta, kunnes herrnhutilaiset lähtivät Grönlannista 1900.**
  Queen Ingrid's Hospital erottaa Nuuk Centrumin ja Noorliitin.
— "Old Nuuk".
- **1873-kehys:** isoisän matkavuonna Godthåb oli Etelä-Grönlannin
  siirtomaan hallintopaikka (pohjoisella oli oma pääkaupunkinsa
  Godhavnissa vuoteen 1940), ja sen vieressä toimi erillisenä
  asutuksena vuonna 1747 perustettu Uusi Herrnhut. Kirkko oli
  vihitty 1849 (ks. kohdekartta).

### 1900-luku ja nimenmuutos
- 1853 **Hinrich Johannes Rink** tuli Grönlantiin. *(Rinkin lehti
  Atuagagdliutit 1861 on Grönlannin MAALEHDEN aihe eikä kuulu tähän.)*
- Toisen maailmansodan aikana grönlantilainen kansallinen identiteetti
  heräsi, kirjoitetun grönlannin käyttö kasvoi, ja Nuukiin koottiin
  neuvosto **Eske Brunin** johdolla. **1940** Nuukiin perustettiin
  Yhdysvaltain ja Kanadan konsulaatit.
- 1950 kaksi neuvostoa yhdistettiin yhdeksi. Tämä maaseutuneuvosto
  lakkautettiin **1. toukokuuta 1979**, kun Grönlannin kotihallinto
  **nimesi Godthåbin uudelleen Nuukiksi**.
- Kaupunki kasvoi rajusti 1950-luvulla, kun Tanska alkoi modernisoida
  Grönlantia. Yli kolmasosa Grönlannin väestöstä asuu Nuukin
  metropolialueella.
— "Nuuk", History › Cultural and political developments; World War II
and postwar changes.
- The Guardianin 2016 artikkeli maailman alkuperäiskansaisimmista
  kaupungeista: *"One city ... stands out. Nuuk ... has probably the
  highest percentage of aboriginal people of any city: almost 90% of
  Greenland's population of 58,000 is Inuit … it may well be tiny Nuuk
  that is the most indigenous city in the world."* — "Nuuk", History
  (blockquote, lähde The Guardian 29.6.2016).

## 3. Nykykaupunki

- **Hallinto:** Nuuk on Grönlannin hallinnollinen keskus, jossa ovat
  kaikki tärkeät hallintorakennukset ja laitokset; julkinen sektori on
  myös kaupungin suurin työnantaja. — "Nuuk", Government.
- **Parlamentti Inatsisartut** ('ne jotka tekevät lain') on Grönlannin
  yksikamarinen parlamentti; **31 jäsentä, nelivuotinen kausi,
  suhteellinen vaalitapa**. Se seurasi maaneuvostoa (Landsråd)
  **1. toukokuuta 1979** ja kokoontuu Inatsisartut-rakennuksessa
  **luodolla Nuuk Centrumissa**. Parlamentti valitsee pääministerin,
  joka nimittää hallituksen (Naalakkersuisut) parlamentin hyväksynnällä.
  — "Inatsisartut", johdanto ja History of the parliament.
- **Talous:** Nuuk alkoi pienenä kalastajasatamana; talouden nopean
  kasvun myötä 1970- ja 1980-luvulla kalastusteollisuus taantui, mutta
  kaupungissa on yhä lähes puolet Grönlannin kalastuslaivastosta.
  Royal Greenlandin jalostuslaitos ottaa vastaan yli 50 miljoonan
  Tanskan kruunun (7 milj. USD) vuosisaaliin, josta 80 % on katkarapua;
  lisäksi turskaa, rasvakalaa ja pallasta. — "Nuuk", Economy.
- **Sähkö:** kaiken Grönlannin sähkön toimittaa valtion Nukissiorfiit.
  Vuodesta **1993** Nuuk saa sähkönsä pääosin **Buksefjordin
  vesivoimalasta** 132 kV:n linjaa pitkin, joka ylittää Ameralikin
  vuonon **5 376 metrin** jännevälillä — maailman pisin vapaa jänneväli.
  — "Nuuk", Economy › Energy.
- **Koulutus:** Nuukissa on **Grönlannin yliopisto (Ilisimatusarfik)**,
  maan ainoa yliopisto, perustettu **1987**; se laajeni uuteen
  Ilimmarfik-rakennukseen, jossa ovat journalistiikan, hallinnon ja
  talouden, kielen, kirjallisuuden ja median, kulttuuri- ja
  sosiaalihistorian, teologian ja sosiaalityön laitokset. Nuukissa on
  myös **Ilinniarfissuaq** (opettajanvalmistus), **Grönlannin vanhin
  oppilaitos**, vanhassa siirtomaakaupunginosassa (Nuutoqaq, Vanha
  Nuuk), sekä sairaanhoidon ja terveystieteen laitos, tekninen koulu
  ja rauta- ja metallikoulu. — "Nuuk", Economy › Education.
- **Terveydenhuolto:** Queen Ingrid's Health Center ja
  Queen Ingrid's Hospital, Grönlannin keskussairaala. — "Nuuk", Healthcare.
- **Kaupat:** Grönlannin ensimmäinen kauppakeskus **Nuuk Center**
  avattiin **2012**; siinä on maan ensimmäinen maanalainen pysäköinti.
  — "Nuuk", Shopping.
- **Lentoasema:** kansainvälinen lentoasema **4 km** keskustasta
  koilliseen, rakennettu **1979**, rakennettu perusteellisesti uudelleen
  ja laajennettu **2024**; nyt Air Greenlandin kansainvälinen ja
  kotimaan solmukohta. Ympärivuotiset suorat lennot Kööpenhaminaan ja
  Reykjavík-Keflavíkiin sekä lähes kaikille Grönlannin lentoasemille;
  kausireitit New York-Newarkiin, Billundiin, Aalborgiin ja Iqaluitiin.
  — "Nuuk", Transportation › Airport.
- **Meri:** Royal Arctic Line (yhdessä Eimskipin kanssa) liikennöi
  konttialuksia Aalborgista Islannin kautta; ne tuovat vaatteita,
  jauhoja, lääkkeitä, puuta, koneita ja säilyviä tavaroita ja palaavat
  pakastetulla katkaravulla ja kalalla. Suurin osa Grönlannin muusta
  merirahdista uudelleenlastataan Nuukissa. Arctic Umiaq Line -rannikkolautta
  käy kahdesti viikossa suurimman osan vuodesta. — "Nuuk", Sea.
- **Tiet:** vuonna 2017 Nuukissa oli **80 km** paikallisteitä.
  **Yksikään tie ei yhdistä Nuukia muihin Grönlannin osiin.** Suurin
  osa Grönlannin busseista ja autoista liikkuu Nuukissa. Nuukissa on
  **kolme liikennevaloa, 12 liikenneympyrää ja yksi tietunneli** —
  Grönlannin ainoat sellaiset. Kaupungin pääkatu on Aqqusinersuaq.
  Bussiyhtiö **Nuup Bussii** on hoitanut joukkoliikennettä vuodesta
  **1980**; vuonna 2012 bussit kuljettivat yli 2 miljoonaa matkustajaa.
  Bussit yhdistävät keskustan lentoasemaan ja Nuussuaqin, Qinngorputin
  ja Qernertunnguitin kaupunginosiin. — "Nuuk", Roads.
- **Urheilu:** seurat Nuuk IL (1934), B-67 ja GSS Nuuk. **Nuuk Stadium**
  on monitoimistadion, jota käytetään enimmäkseen jalkapalloon,
  yleisömäärä 2 000; sillä on esiintynyt skotlantilainen rockyhtye
  Nazareth. **Godthåbhallen** on käsipallohalli (1 000 katsojaa),
  Grönlannin miesten maajoukkueen kotihalli. **Lille Malenen** rinteessä
  on laskettelumäki, jonka korkeusero on noin 300 metriä ja jonka
  ala-asema on lähellä lentoaseman terminaalia. Nuukissa on myös
  **maailman ainoa arktinen golfkenttä**. Sisäliikuntakeskus
  **Inussivik** avattiin **2002**. — "Nuuk", Sports.
- **Väestö:** Nuukissa on suhteellisesti eniten tanskalaisia mistään
  Grönlannin kaupungista; puolet Grönlannin maahanmuuttajista asuu
  Nuukissa, ja siellä on neljäsosa maan syntyperäisestä väestöstä.
  Väkiluku on kaksinkertaistunut vuodesta 1977. — "Nuuk", Demographics.

## 4. Ilmasto ja valo (matkaoppaan sääjakso)

Lähde: "Nuuk", Climate ja sääruutu (1991–2020 normaalit, ääriarvot
1866–).
- Merellinen tundrailmasto: pitkät, kylmät ja lumiset talvet, lyhyet ja
  viileät kesät. Talvet ovat silti leudompia kuin muissa saman
  leveysasteen tundrailmastoissa, esimerkiksi Alaskassa tai osissa
  Itä-Siperiaa; huipputalvi vastaa Pohjoismaiden samoja leveysasteita.
- Kuukausikeskiarvot liikkuvat noin −9 ja +7 asteen välillä
  (tammikuu −8,6 °C, heinäkuu +7,4 °C).
- Kaikkien aikojen ääriarvot: **−32,5 °C 14. tammikuuta 1984** ja
  **+26,3 °C 6. heinäkuuta 2008**. Tuuliennätys 68 km/h.
- **21. joulukuuta** aurinko nousee 11.22 ja laskee 15.28.
  **21. kesäkuuta** aurinko laskee 1.03 ja nousee 3.53, joten yö on
  jatkuvaa hämärää.
- Lämpimimmän kuukauden keskiarvo 7,4 °C on **alle metsänrajan
  10 asteen** — istutettuja puita on muutamia, mutta ne eivät menesty.
- Sademäärä 852,6 mm vuodessa, sateisin kuukausi syyskuu (104,6 mm).

## 5. Kohdekartan kahdeksan kohdetta

Kaikki koordinaatit haettu en-Wikipedian `list=geosearch`-rajapinnasta
7.9.2026 ja ristiintarkistettu artikkelien coord-malleista.

1. **Grönlannin kansallismuseo** 64,17720 / −51,74620.
   Nunatta Katersugaasivia Allagaateqarfialu. Yksi Grönlannin
   ensimmäisistä museoista, vihitty 1960-luvun puolivälissä; toimii
   vuonna 1936 rakennetussa varastorakennuksessa. Ensimmäinen näyttely
   avattiin **1965** herrnhutilaisessa lähetystalossa; museo muutti
   nykyiselle paikalleen vanhaan siirtomaasatamaan 1970-luvulla, kun
   kokoelma kasvoi Tanskan kansallismuseosta palautetuilla inuiitti-
   esineillä. 1991 museo ja kansallisarkisto järjestettiin uudelleen
   Grönlannin kansallismuseoksi ja -arkistoksi; arkisto on nykyään
   Ilimmarfikissa. Päänäyttely on **Qilakitsoqin muumiot**: kolme
   naista ja kuusikuukautinen lapsi 1400-luvun puolivälistä. Museo
   suojelee myös lähirakennuksia, muun muassa tynnyrintekijän verstasta
   ja traaniastioiden ja -puristimien näyttelyä. — "Greenland National
   Museum".
   Qilakitsoq-tausta: hylätty asutus Uummannaqin lähellä Nuussuaqin
   niemimaan pohjoisrannalla; nimi tarkoittaa 'se, jolla on hyvin vähän
   taivasta'. **9. lokakuuta 1972** metsästäjät Hans ja Jokum Grønvold
   löysivät riekkojahdissa haudan, jossa oli useita muumioita; he
   peittivät haudat ja ilmoittivat viranomaisille. Tieteelliset
   tutkimukset alkoivat vasta 1978, ja muumiot vietiin Kööpenhaminaan.
   **1982 ne palautettiin Grönlantiin** osana kulttuuriomaisuuden
   palautusta. Kahdeksan muumiota, neljä parhaiten säilynyttä
   näytteillä. Radiohiiliajoitus antaa kuolinajaksi noin **1475
   (±50 vuotta)**. Hauta oli 200 metrin päässä asutuksesta
   kalliokielekkeen alla kiviröykkiön alla; kylmä, kuiva ja hyvin
   tuulettuva paikka mumifioi ruumiit luonnostaan. Mitokondrio-DNA
   osoitti sukulaisuuden kahden hautaryhmän välillä. Neljää parhaiten
   säilynyttä ei riisuttu eikä avattu. — "Qilakitsoq".
2. **Hans Egeden talo** 64,17820 / −51,74480. Grönlannin vanhin talo,
   **rakennettu 1728**; alun perin Hans Egeden asunto, myöhemmin
   Grönlannin pääministerin asunto, nykyään hallituksen virallisten
   vastaanottojen tila. — "Hans Egede House". (Ristiriita: "Nuuk"
   sanoo 1721; ks. tarkistus.)
3. **Nuukin katedraali** 64,17972 / −51,74417. Vapahtajan kirkko
   (Annaassisitta Oqaluffia), puinen luterilainen katedraali Vanhassa
   Nuukissa. Rakennettiin **1848–1849** ja vihittiin **6. huhtikuuta
   1849**; Karen Ørstedin rahasto maksoi sen kokonaan. Se korvasi monen
   vanhemman Nuukin kirkon tehtävät — vanhin niistä oli vuodelta 1758.
   Rakenne oli alun perin puurunko vuolukivelle ja talkille; myöhemmin
   ulkopuoli paneloitiin punaisin puupanelein ja sisäpuoli valkoiseksi
   maalatuin. **Puinen kellotorni on myöhempi lisäys** (kirkon oma
   artikkeli: pystytetty 1928; kaupungin artikkeli: torni lisättiin
   1884 — ks. tarkistus). Sähkö tuli 1949. Vuonna 2008 tornikellon
   mekaaninen koneisto korvattiin digitaalisella 14 päivän
   kunnostuksessa. Alttarin kaksi suurta messinkikynttelikköä ovat
   Norjan kirkon lahja. Urut ovat Marcussen & Sønin 11-äänikertaiset
   vuodelta 1970. Kirkko sai katedraalin aseman **1994** (Grönlannin
   kirkko- ja koululaki voimaan 6.5.1993); ensimmäinen piispa 616
   vuoteen oli Kristian Mørk, ja 1995 hänen jälkeensä tuli
   grönlantilaissyntyinen **Sofie Petersen**, Tanskan kirkon toinen
   naispiispa. Kansallispäivänä kirkon ympärille kokoontuu väkeä.
   Kirkon edessä on urkuri ja psalmien kirjoittaja **Jonathan Petersenin**
   pronssirintakuva; kukkulalla kirkon yllä on Hans Egeden patsas,
   vuoden 1921 kopio Kööpenhaminan Marmorikirkon patsaasta.
   — "Nuuk Cathedral".
4. **Kalaaliaraq-tori** 64,17861 / −51,74250. Tuoretorin nimi
   tarkoittaa grönlanniksi 'pieni grönlantilainen'; tanskaksi Brædtet.
   Vanhassa Nuukissa noin **150 metriä katedraalista kaakkoon**.
   **Grönlannin suurin tuoretori.** Myynnissä on tuoretta kalaa sekä
   valaan, poron ja hylkeen lihaa suoraan pyytäjiltä. Tori on monelle
   asukkaalle tärkeä kohtaamispaikka — artikkeli vertaa sitä
   kylän kaivolle. Jääkarhut ovat Nuup Kangerluassa ja koko
   lounaisrannikolla harvinaisia, mutta epätodennäköisen saaliin
   viimeinen matka päättyy Kalaaliaraqille, ja se on juhlan ja
   sosiaalisen tapahtuman aihe. Kunta on rakentanut keskustaan uuden
   rakennuksen kylmiöineen ja pakastimineen. Torilla ei myydä eläviä
   eläimiä, ja liha on tuoretta ja vastateurastettua; vasta **2018**
   Grönlannin hallitus salli kuivatun ja suolatun lihan myynnin.
   — "Kalaaliaraq Market".
5. **Inatsisartut** 64,17830 / −51,74060. Ks. kohta 3.
6. **Katuaq** 64,17722 / −51,73889. Grønlands Kulturhus, Grönlannin
   kulttuuritalo: konsertteja, näyttelyitä, konferensseja ja elokuvia.
   Suunnittelija **Schmidt Hammer Lassen**; rakennettiin Grönlannin
   kotihallituksen, Nuukin kunnanvaltuuston ja Pohjoismaiden
   ministerineuvoston yhteishankkeena ja **vihittiin 15. helmikuuta
   1997**. L-kirjaimen muotoinen rakennus, jonka aaltoileva,
   taaksepäin nojaava julkisivuseinä on **revontulten inspiroima**;
   se on nostettu irti maasta ja verhottu kullanväriseen
   lehtikuuseen sekä sisältä että ulkoa. Seinän ja varsinaisen
   rakennuksen väliin jää suuri lämpiö, jossa on kolme valkoista
   vapaasti seisovaa elementtiä: kolmio, neliö ja ympyrä. Kaksi salia:
   suurempi **Hans Lynge -sali 508 paikkaa**, pienempi 80 (ristiriita
   "Nuuk"-artikkelin kanssa, ks. tarkistus). Talossa on myös
   kokoustiloja, toimistoja ja kahvila sekä NAPA – Pohjoismainen
   instituutti Grönlannissa. Nuuk Center on aivan naapurissa.
   — "Katuaq".
7. **Grönlannin kansalliskirjasto** 64,17556 / −51,73917.
   Nunatta Atuagaateqarfia, Grönlannin yleinen kirjasto ja
   kansalliskirjasto, **maan suurin käsikirjasto**, omistettu
   kansallisen kulttuuriperinnön ja historian säilyttämiseen.
   Kokoelma on jaettu keskustan yleisen kirjaston ja Ilimmarfikin
   välillä; Ilimmarfikissa on **Groenlandica**, Grönlantiin liittyvän
   historiallisen aineiston kokoelma. Vuonna 2018 Ilimmarfikin
   tietokannassa oli **101 824 nimekettä**. — "Public and National
   Library of Greenland". ("Nuuk", Educational: 83 324 nimekettä
   1.1.2008 — eri ajankohta, ei ristiriita.)
8. **Nuukin taidemuseo** 64,17786 / −51,72922. Nuuk Kunstmuseum,
   paikallismuseo. Perustettiin **22. toukokuuta 2005** entiseen
   adventtikirkon rakennukseen Kissarneqqortuunnguaqissa; liikemies
   **Svend Junge ja Helene Junge** lahjoittivat museon Sermersooqin
   kunnan asukkaille, ja se vihittiin **21. kesäkuuta 2007,
   Grönlannin kansallispäivänä**. Esillä on noin 250 maalausta,
   akvarellia, valokuvaa, piirustusta ja grafiikan lehteä sekä noin
   50 veistosta luusta, syöksyhampaasta, puusta ja vuolukivestä; pinta-ala
   noin 600 m². Kokoelmassa on **yli 150 Emanuel A. Petersenin
   maalausta**. Vanhempaa eurooppalaista taidetta: Christine Deichmann
   (1869–1945), J.E.C. Rasmussen (1841–1893), Harald Moltke (1871–1960),
   Emanuel A. Petersen (1894–1948). Grönlantilaisia: Simon Kristoffersen
   (1933–1990), Miki Jacobsen (s. 1965), Buuti Pedersen (s. 1955),
   Hans Lynge (1906–1988), Anne-Birthe Hove (1951–2012), Pia Arke
   (1958–2007). Kokoelmaa kuratoidaan sen mukaan, miten ulkopuoliset
   ovat nähneet Grönlannin ja miten paikalliset näkevät sen.
   — "Nuuk Art Museum". (Andy Warhol -väite on vain "Nuuk"-artikkelissa,
   ei museon omassa; ks. tarkistus — sitä EI käytetä.)

**Kohteet eivät toista lehden juttuja:** lehden nostot kertovat niemen
asuttajista, vuoden 1728 siirrosta, kahdesta lähetysasemasta 1873 ja
kaupungin tieverkosta; teemasivu kertoo jääkairauksista, Isuan kivistä,
Ameralikin ylityksestä ja yliopistosta. Hans Egeden patsas, Herrnhutin
lähetystalo ja Blok P jäävät numeroimatta (patsas ja lähetystalo
liittyvät suoraan nostoihin, Blok P on purettu 2012).

## 6. Teemasivun aineisto (tiede ja tekniikka)

### T1 Jääkairaukset
- Grönlannin jäätiköstä poratut **jääkairasydämet** ovat maapallon
  ilmastohistorian tärkeimpiä arkistoja: jäähän jää ilmakuplia ja
  isotooppisuhteita, joista voidaan lukea menneiden aikojen lämpötila
  ja ilmakehän koostumus. — "Ice core" ja "Greenland ice sheet".
- **Grönlannin jäätikkö** peittää noin **1 710 000 km²** eli noin
  80 % Grönlannin pinta-alasta; se on Etelämantereen jälkeen maailman
  toiseksi suurin jäämassa, ja paksuimmillaan jää on yli 3 km.
  — "Greenland ice sheet", johdanto.

### T2 Isuan viherkivivyöhyke
- **Isua Greenstone Belt** on arkeeinen viherkivivyöhyke Lounais-Grönlannissa
  **Nuukin pääkaupunkiseudun lähellä** Isukasian terraanissa; ikä
  **3,7–3,8 miljardia vuotta**. Se on maailman **laajin eoarkeeinen
  supracrustal-kivien paljastuma**. — "Isua Greenstone Belt", johdanto
  ja Overview.
- Vyöhyke on ollut varhaisen elämän etsinnän keskiössä: 1996 geologi
  **Steve Mojzsis** työtovereineen esitti, että hiilirikkaiden kerrosten
  isotooppisesti kevyt hiili viittaa biologiseen toimintaan.
- Elokuussa **2016** australialaisryhmä esitti, että vyöhykkeessä on
  **noin 3,7 miljardia vuotta vanhoja stromatoliitteja** eli mikrobien
  muodostamia rakenteita. Jos ne ovat stromatoliitteja, ne ovat
  **220 miljoonaa vuotta vanhempia** kuin siihenastiset vanhimmat
  Länsi-Australian Dresserin muodostumasta.
- Fossiilit ovat aaltoilevia ja kupumaisia, tyypillisesti **1–4 cm**
  korkeita, ja ne löydettiin rauta- ja magnesiumpitoisesta dolomiitista,
  jonka lumen sulaminen oli juuri paljastanut.
- **Tulkinta on kiistanalainen.** Osa geologeista tulkitsee rakenteet
  alkuperäisen kiven muodonmuutoksen ja muuttumisen tulokseksi. Abigail
  Allwood sanoi 2016 löydön tekevän elämän synnystä muilla planeetoilla
  todennäköisempää, mutta julkaisi 2018 työtovereineen artikkelin, joka
  kyseenalaistaa rakenteiden alkuperän ja tulkitsee ne
  muodonmuutoksesta syntyneiksi. Asia on yhä auki.
— "Isua Greenstone Belt", Possible signs of very early life.

### T3 Ameralikin ylitys
- **Ameralik Span** on maailman pisin sähkölinjan jänneväli: se ylittää
  Ameralikin vuonon Nuukin lähellä **5 376 metrin** jännevälillä.
  Rakennettu **1993**, rakentaja norjalainen NTE Entreprise
  (Nord-Trøndelag Elektrisitetsverk). Osa yksipiirista 132 kV:n linjaa
  Buksefjordin vesivoimalasta Nuukiin.
- Jänne koostuu **neljästä 40 mm:n teräsjohtimesta, joista yksi on
  varalla**. Jänteen leveys on 190 metriä ja pienin korkeus vedestä
  **128 metriä**. Kummankin puolen pylväät kantavat vain yhden johtimen,
  ja ne seisovat **444 metriä** korkealla vuorella pohjoisrannalla ja
  **1 013 metriä** korkealla etelärannalla. Rakenne on suunniteltu
  kestämään Grönlannin talvet.
— "Ameralik Span".

### T4 Ilisimatusarfik
- **Grönlannin yliopisto (Ilisimatusarfik)** on maan ainoa yliopisto ja
  sijaitsee Nuukissa. Perustettu **1987** antamaan Grönlannissa
  korkeakoulutusta. Se toimi alun perin **entisellä herrnhutilaisella
  lähetysasemalla Uudessa Herrnhutissa** ja muutti omaan
  tutkimuskompleksiin **Ilimmarfikiin** (lähde antaa vuodeksi 2009,
  "Nuuk"-artikkeli 2007 — ks. tarkistus).
- Useimmat kurssit opetetaan **tanskaksi**, muutama grönlanniksi, ja
  vaihtoluennoitsijoiden kurssit usein englanniksi. Opiskelijamäärä on
  vaatimaton osin siksi, että useimmat grönlantilaiset opiskelijat
  menevät Tanskan yliopistoihin. Lähteet antavat eri lukuja
  (infolaatikko 600, leipäteksti 205 vuonna 2018, "Nuuk"-artikkeli noin
  150 vuonna 2007) — ks. tarkistus.
- Ilimmarfikin kampuksella ovat myös **Grönlannin tilastokeskus** ja
  kansalliskirjaston pääkokoelmat.
— "University of Greenland"; "Nuuk", Educational.

## 7. Matkaoppaan lisäaineisto

- **Blok P** oli Grönlannin suurin asuinrakennus: noin **320 asuntoa**,
  ja siinä asui noin **1 % koko saaren väestöstä**. Purettiin
  **19. lokakuuta 2012**. Rakennettu 1965–1966 osana Tanskan
  valtiopäivien vuoden 1953 ohjelmaa, jolla grönlantilaisia siirrettiin
  pois rannikkokylistä. Valmistuessaan se oli Tanskan kuningaskunnan
  suurin rakennushanke. Asuntojen koko ja pohjakaava eivät sopineet
  inuiittielämään: kapeista oviaukoista oli vaikea tai mahdoton kulkea
  paksuissa talvivaatteissa, eikä eurooppalaisiin vaatekomeroihin
  mahtunut kalastusvälineitä — ne säilytettiin parvekkeilla, mikä
  tukki poistumistiet. Ensimmäisinä vuosina viemärit tukkeutuivat
  hyytyneestä verestä, kun kalastajat perkasivat saalista kylpyammeissa.
  Viisikerroksinen rakennus oli 64 asuntoa pitkä eli yli 200 metriä ja
  halkoi Nuukin idästä länteen. Rakennuksen pohjoispäätyyn tehtiin
  **suurin tunnettu Grönlannin lippu**, jonka taiteilija Julie Edel
  Hardenberg ompeli koululaisten avulla poisheitetyistä vaatteista.
  Asukkaille tarjottiin korvaavaa asuntoa pääosin Qinngorputista;
  purku tehtiin viidessä vaiheessa 2011 alkaen, ja maan tasaus ja
  luovutus olivat 2014. — "Blok P".
- Kaupunginosat: Nuussuaq, Qinngorput, Qernertunnguit (Quassussuup
  Tungaassa). — "Nuuk", Roads.

## 8. Mitä lehteen EI oteta

- Nykypolitiikka: puolueet, istuva pääministeri, pormestari,
  itsenäisyyskeskustelu, ulkovaltojen kiinnostus Grönlantiin.
  (Perustuslain rajaus; "Nuuk" Government -osion puoluelista jätetään
  kokonaan pois.)
- Kalaaliaraqin hygienia- ja trikiiniosio: se on nykyinen
  viranomaisongelma eikä kulttuurijuttu.
- Grönlannin maalehden aiheet (ks. kohta 0).
- Andy Warhol Nuukin taidemuseossa (ei katetta museon omassa artikkelissa).
