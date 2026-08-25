# Täkynostot: Turkki

Työaineisto omistajan 25.8.2026 ideaan (Raamattu, osio "Fokusmoodi",
kohta KEVYT KULKU -KOKEILU): kun maan aarre on löydetty, kartalta
nousee YKSI TÄKYNOSTO — lyhyt klikkiotsikkotasoinen lause +
miniatyyrikuva lauseen perässä, houkuttelemassa kohteen auki.

Omistajan tyylivaatimus sanatarkasti: *"Tämä saa olla puhtaasti
keltaisten lehtien klikkiotsikko tasoa! Joku henkilöön liittyvä
skandaali tai muu uskomaton juttu."*

Omistajan lisäys 25.8.2026: **vähintään yhden noston on oltava
eläinaiheinen** — eläimet ovat kohdeyleisölle tärkeitä.

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin. Fable valitsee, mitkä näistä viedään peliin ja missä
sanamuodossa.

---

## Kaksi sääntöä, jotka pitävät otsikon rehellisenä

1. **Otsikon lupaus lunastetaan.** Jokaisen alla olevan otsikon takana
   on lähteestä tarkistettu tositarina, joka nimenomaan vastaa siihen,
   mitä otsikko lupaa. Jos lunastus ei kanna, otsikko on klikkihuijaus
   eikä täky — ja Perustuslain totuudellisuuspilari kaatuu.
2. **13+ ja aikuiset, ei lapsellinen eikä mässäilevä.** Skandaali saa
   olla skandaali (petos, valhe, häpeä, vankeus), mutta väkivallan
   yksityiskohdat rajataan pois samalla periaatteella kuin
   `takynostot-kreikka.md`:ssä ja `fokuskohteet-turkki.md`:ssä.
   Rajaukset on merkitty kohteittain.

## Tarkistustapa

- Kaikki faktat haettu en-Wikipediasta 25.8.2026 komennolla
  `curl -sS "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
  Ei mitään muistinvaraista; jokaisen kohdan alla on artikkeli ja
  kohta, johon väite nojaa.
- Rajapinta vastasi ajoittain tyhjää tai 429:llä (kiintiörajoitus) —
  haut uusittu kasvavalla viiveellä (4 s → 8 s → 12 s...) kunnes
  vastaus tuli läpi.
- **Kuvat:** tiedostonimet haettu Commonsin hakurajapinnasta
  (`list=search`, `srnamespace=6`) ja jokaisen olemassaolo, koko,
  lisenssi, tekijä ja Restrictions-kenttä varmennettu
  `imageinfo`-rajapinnalla — ei arvattuja tiedostonimiä. Kaikki
  ehdotetut ovat PD, CC0, CC BY tai CC BY-SA.
- **Kuvia ei ole katsottu silmin.** Silmätarkistus ennen julkaisua.
- "Kuva jo pelissä" tarkoittaa, että kohteella on kuva tiedostossa
  `js/packs/nahtavyysjutut.js` tai `js/packs/kulttuuri-kategoriat.js`
  (Istanbulin lehti).

---

## Ehdokkaat 1–10

### 1. "Sulttaanin äiti läimäytti Ranskan keisarinnaa palatsissa — ja melkein aloitti kansainvälisen selkkauksen"

- **Kohde:** Dolmabahçen palatsi (jo pelin Istanbul-laudalla,
  `js/packs/istanbul.js`) / sulttaani Abdülaziz ja hänen äitinsä
  Pertevniyal Sultan.
- **Lunastus:** Vuonna 1868 Abdülaziz otti vastaan Napoleon III:n
  puolison, keisarinna Eugénien, joka oli matkalla Suezin kanavan
  avajaisiin. Sulttaani vei vieraansa tapaamaan äitiään Dolmabahçen
  palatsiin. Pertevniyal Sultan piti vieraan naisen läsnäoloa
  seraljinsa yksityisissä huoneissa loukkauksena — ja kerrotaan
  läimäisseen keisarinnaa kasvoihin. Tilanne oli lähellä
  kansainvälistä selkkausta. Toisen kertomuksen mukaan Pertevniyal
  suuttui siitä, että Eugénie tarttui hänen poikansa käsivarteen
  puutarhakierroksella, ja läimäisi tätä vatsaan — muistutuksena, että
  he eivät olleet Ranskassa.
- **Lähde:** en-Wikipedia "Abdulaziz", osio "European tour"
  (viimeinen kappale): "In 1868, Abdulaziz received visits from
  Eugénie de Montijo... He took Eugénie to see his mother in
  Dolmabahçe Palace. However, his mother Pertevniyal Sultan considered
  the presence of a foreign woman within her private quarters of the
  seraglio to be an insult. She reportedly slapped Eugénie across the
  face, which almost caused an international incident. According to
  another account, Pertevniyal was outraged by the forwardness of
  Eugénie in taking the arm of one of her sons... and she gave the
  Empress a slap on the stomach as a possibly more subtly intended
  reminder that they were not in France."
- **Kuva:** ei pelissä. Commons: **Franz Xaver Winterhalter Empress
  Eugenie.jpg** (2481×3823, public domain, Winterhalter, 1852) —
  keisarinnan kuuluisin muotokuva; tai sulttaanista **Sultan Abdulaziz
  of the Ottoman Empire.jpg** (1325×2000, public domain,
  W. & D. Downey, 1867).
- **Varmuus:** VARMA siitä, mitä lähde kertoo — ja lähde ITSE
  varaa sanan "reportedly" ja antaa kaksi eri versiota tapahtuneesta.
  Otsikko ja lunastus on kirjoitettava tässä muodossa: "kerrotaan
  läimäisseen", ja molemmat versiot mainiten. Ilman varausta tämä
  olisi klikkihuijaus.
- **1873-KYTKÖS:** viisi vuotta ennen isoisän matkaa; molemmat
  osapuolet olivat vielä vallassa 1873.

### 2. "Hoitaja murtautui varastoon vasaralla — ja lehtimies keksi hänelle sievemmän lempinimen"

- **Kohde:** Florence Nightingale / Selimiyen kasarmi Üsküdarissa
  (Üsküdar on jo pelin laudalla ja sillä on oma nähtävyysjuttu).
  Kasarmin pohjoisin torni on nykyään Nightingale-museo. UUSI
  kohde-ehdotus, jos Selimiye halutaan omaksi karttapisteeksi.
- **Lunastus:** Krimin sodan aikana brittiarmeija otti Selimiyen
  kasarmin sotasairaalakseen. Florence Nightingale saapui sinne
  4.11.1854 mukanaan 37 vapaaehtoista hoitajaa. Lääkkeistä oli pula,
  hygienia oli laiminlyöty, eikä potilaille ollut ruoanvalmistus-
  välineitä. Nightingale otti vasaran ja murtautui lukittuun varastoon
  saadakseen lääkkeet haavoittuneille — ja joukot antoivat hänelle
  lempinimen **"the lady with the hammer"**, vasaraleidi. Timesin
  kirjeenvaihtaja William Russell piti tekoa epänaisellisena ja
  keksi tilalle toisen: *The Lady with the Lamp*. Se jäi historiaan.
- **Lähde:** en-Wikipedia "Florence Nightingale", osio "The Lady with
  the Lamp": "Nightingale was nicknamed 'the lady with the hammer' by
  the troops after using a hammer to break into locked storage to
  access medicine to treat the wounded. However, Russell thought the
  behaviour was unladylike, and invented an alternative, leading to
  'The Lady with the Lamp'." · osio "Crimean War" (saapuminen
  4.11.1854, 38 vapaaehtoista hoitajaa; olosuhteet) ·
  en-Wikipedia "Selimiye Barracks", osio "Crimean War" ("On 4 November
  1854, Florence Nightingale arrived in Scutari with 37 volunteer
  nurses... Today, the northernmost tower of the barracks houses a
  small museum partly in memory of Nightingale").
- **Kuva:** ei pelissä. Commons: **'One of the wards in the hospital
  at Scutari'. Wellcome M0007724 - restoration, cropped.jpg**
  (3970×2609, CC BY 4.0, William Simpson / E. Walker, julkaistu
  21.4.1856) — aikalaislitografia juuri siitä salista; tai
  **Hospital at Scutari 2a.jpg** (2879×1849, public domain, Day & Son,
  21.4.1856) — itse kasarmi.
- **Varmuus:** VARMA — suoraan lähteessä. HUOM pieni lukuero: eri
  osiot antavat hoitajien määräksi 37 ja 38 (jälkimmäisessä mukana
  ilmeisesti Nightingale itse). Käytä "lähes neljäkymmentä" tai
  jompaakumpaa lukua, mutta älä väitä molempia.
- **BRITTIKYTKÖS:** vahvin koko listalla. Isoisä matkusti 1873 —
  Nightingale oli tuolloin Britannian tunnetuin elävä nainen, ja
  hänen sairaalansa oli Bosporin toisella rannalla, kävelymatkan
  päässä siitä lautasta, jolla isoisä ylitti salmen.
- **IKÄSOPIVUUSRAJAUS:** samassa artikkelissa on kuolinlukuja
  (Selimiyessä kuoli noin 6 000 sotilasta, valtaosa koleraan;
  4 077 ensimmäisenä talvena) sekä Nightingalen ja Mary Seacolen
  kiistan käsittely. Kuolinluvut kestävät 13+, mutta ne EIVÄT kuulu
  otsikkoon — jos ne kerrotaan, ne kuuluvat lunastuksen loppupainoon
  ("ja siksi hän murtautui varastoon"). Seacole-kiista on liian
  monimutkainen ja arkaluontoinen täkynostoon; jos siitä puhutaan, se
  vaatii oman käsittelynsä eikä yhden lauseen otsikkoa.

### 3. "Sulttaani hallitsi 93 päivää — ja vietti seuraavat 28 vuotta vankina omassa palatsissaan"

- **Kohde:** Çırağanin palatsi / sulttaani Murad V. Ks.
  `takyt-istanbul.md` varapenkki 19 (palatsin rakennushistoria).
  UUSI kohde-ehdotus.
- **Lunastus:** Abdülaziz rakennutti Çırağanin palatsin 1863–1867, ja
  sisustus valmistui 1872. Hän ei ehtinyt asua siellä kauan: hänet
  syöstiin vallasta 30.5.1876 ja hänet löydettiin kuolleena
  palatsista. Seuraaja, hänen veljenpoikansa **Murad V**, muutti
  taloon — ja hallitsi **93 päivää**. Hänen veljensä Abdul Hamid II
  syrjäytti hänet väitetyn mielisairauden takia, ja Murad jäi asumaan
  samaan palatsiin kotiarestiin. Hän kuoli siellä 29.8.1904 —
  kaksikymmentäkahdeksan vuotta myöhemmin. Palatsi itse paloi
  19.1.1910, kaksi kuukautta sen jälkeen kun Ottomaanien parlamentti
  oli saanut luvan kokoontua siellä.
- **Lähde:** en-Wikipedia "Çırağan Palace", osio "History": "Sultan
  Abdulaziz did not live long in his magnificent palace - he was found
  dead inside on 30 May 1876, shortly after he was dethroned. His
  successor, his nephew Sultan Murad V, moved into Çırağan Palace, but
  reigned for only 93 days. He was deposed by his brother Abdul Hamid
  II due to alleged mental illness and lived there under house arrest
  until his death on 29 August 1904." · "On November 14, 1909... Sultan
  Mehmed V allowed the Ottoman Parliament to hold their meetings in
  this building. Only two months later, on January 19, 1910, a great
  fire destroyed the palace, leaving only the outer walls intact."
- **Kuva:** ei pelissä. Commons: **Sultan Murad V Khan-1.2 V01-1.1
  cropped Eastman Museum.jpg** (731×1009, public domain, Abdullah
  frères, n. 1869) — muotokuva SEITSEMÄN VUOTTA ennen valtaannousua,
  eli lähes tarkalleen isoisän matkavuoden ajalta. Palatsista:
  **Çırağan Palace, İstanbul (12967643005) (Colourised).jpg**
  (2037×2729, CC BY 4.0, Gargarapalvin, 2023 — väritetty vanha
  valokuva).
- **Varmuus:** VARMA — suoraan lähteessä. HUOM: "alleged mental
  illness" on lähteen oma varaus. Sano "väitetyn mielisairauden
  takia", älä "koska hän oli mielisairas".
- **IKÄSOPIVUUSRAJAUS (TÄRKEÄ):** Abdülazizin kuolema (en-Wikipedia
  "Abdulaziz" kirjoittaa itsemurhasta; kuolintapa on historiallisesti
  kiistelty) **EI mukaan otsikkoon eikä lunastukseen.** Sama rajaus
  kuin `takynostot-kreikka.md`:n Chalepas-kohdassa (ehdokas 9).
  Yllä oleva teksti sanoo vain "löydettiin kuolleena palatsista", mikä
  on lähteen oma sanamuoto — sekin voidaan jättää pois, jos Fable
  pitää sitä liian raskaana. Tarina kantaa Murad V:llä yksin: 93
  päivää valtaa, 28 vuotta kotiarestia samassa talossa, ja lopulta
  talo palaa.
- **1873-KYTKÖS:** palatsi oli isoisän matkavuonna vuoden vanha.

### 4. "ELÄINNOSTO: Kaupunki ei omista kissoja — kissat omistavat kaupungin, ja niiden ruokkiminen oli oma ammattinsa"

- **Kohde:** Istanbulin katukissat (kulttuuri-kategoriat.js:ssä on jo
  nosto "Kadun kissat ovat kaikkien kissoja", **kuva jo pelissä**:
  `Hagia Sophia Cat Gli.png`). Tämä on saman aiheen ERI KULMA —
  ottomaaniajan ammatti, ei Gli-kissa.
- **Lunastus:** Istanbulin katukissoja arvioidaan olevan sadasta
  tuhannesta yli miljoonaan, eikä maassa saa ottaa niitä kiinni tai
  lopettaa niitä — laki on kategorinen. Kissat eivät ole tulleet
  sattumalta: niitä tuotiin kauppalaivoilla jo foinikialaisaikaan
  pitämään jyrsijät kurissa, ja ottomaanien aikaan lähes kaikki
  kaupungin talot olivat puuta, mikä teki kissoista välttämättömiä.
  Rakkaus niihin synnytti kokonaisen ammatin: **mancacı**,
  kissanhoitaja, joka huolehti kaupungin kissojen ruokkimisesta ja
  jolta asukkaat saattoivat ostaa ruokaa syöttääkseen kissoja itse.
  Ammatti oli olemassa jo isoisän aikaan. Nykyään jokaisella kunnalla
  on kissoille oma eläinlääkintäosasto ja ilmainen sterilointipalvelu,
  ja yksityisklinikat hoitavat katukissoja alennushinnoin — laskut
  jaetaan naapureiden kesken.
- **Lähde:** en-Wikipedia "Cats in Istanbul", johdanto ja osio
  "History": "estimates ranging from a hundred thousand to over a
  million stray cats. Many Turkish citizens view street animals as
  communally owned pets rather than traditional strays, and the country
  has a blanket no-kill, no-capture policy." · "many cats arrived in
  the city on trading ships trading in Phoenician times, where they
  were used to keep the rodent populations down." · "during Ottoman
  times, the vast majority of Istanbul's houses were made of wood...
  This made cats' presence a necessity in the city." · "the love of the
  stray cats led to the creation of a full-time profession – that of
  the mancacı ('cat sitter'). Mancacıs ensured that the city's cats
  were fed, and residents could choose to purchase food from them and
  feed the cats themselves." · osio "Health": "Each local council has a
  veterinary department to serve the cats in their area, which also
  offers a free neutering service. Private clinics offer treatment for
  street cats at reduced fees, and residents often share the cost of
  the bills."
- **Kuva:** Gli-kuva on jo pelissä. Tälle nostolle Commons:
  **Cats, Kadikoey, Istanbul (P1100168).jpg** (4000×3000, CC BY-SA
  4.0, Matti Blume, 2019 — huomaa, että saman kuvaajan sarjasta on jo
  pelissä `Kadikoey, Istanbul (P1100156).jpg`), tai nykypäivän
  vastine mancacılle: **Istanbul Stray Cat Food Vending Machine.jpg**
  (2304×4096, CC BY 4.0, Ultratweed, 2025 — katukissojen
  ruoka-automaatti).
- **Varmuus:** VARMA siitä, mitä lähde sanoo. HUOM ATTRIBUUTIO: nämä
  väitteet on Wikipediassa liitetty nimettyihin henkilöihin (Fatih
  Dağlı / Istanbulin kissamuseo, Ayşe Sabuncu / Cats of Istanbul,
  Marcel Heijnen / *City Cats of Istanbul*) — ne ovat asiantuntijoiden
  kertomia, eivät akateemisesti todennettuja. Käytä muotoa
  "kissamuseon perustajan mukaan".
- **IKÄSOPIVUUSRAJAUS (TÄRKEÄ):** sama artikkeli kertoo laajasti
  1830-luvun, 1920–40-luvun ja vuoden 1996 joukkotappokampanjoista
  kissoja ja koiria vastaan. **NÄITÄ EI mukaan missään muodossa.**
  Ne ovat tosia mutta täysin väärä sävy tähän, ja Perustuslain
  ikäsopivuuskohta rajaa ne pois.
- **PÄÄLLEKKÄISYYSVAROITUS:** Gli-kissan tarinaa (Obama, Hagia Sofia,
  hauta pihalla) EI saa toistaa — se on jo pelissä.

### 5. "ELÄINNOSTO: Haikara on palannut samalle kalastajalle joka kevät vuodesta 2010 — ja nousee joka aamu hänen veneeseensä"

- **Kohde:** Eskikaraağaçin kylä, Karacabey, Bursan maakunta
  (fokuskohde `bursa`, `fokuskohteet-turkki.md` kohde 7). UUSI kohde,
  jos haikarakylä halutaan omaksi karttapisteeksi.
- **Lunastus:** Uluabat-järven rannalla, 199 asukkaan Eskikaraağaçin
  kylässä, asuu kalastaja Adem Yılmaz. Vuodesta 2010 lähtien sama
  kattohaikara — kylässä nimeltään **Yaren** — on palannut
  Afrikan-muutolta joka maaliskuu samaan kylään, ja niiden kuuden
  kuukauden aikana, jotka se viettää siellä, se laskeutuu joka aamu
  Yılmazin pieneen veneeseen. He lähtevät kalaan yhdessä.
  Paikallinen valokuvaaja Alper Tüydeş kuvasi ystävyyden ensimmäisen
  kerran 2016; siitä tehtiin dokumentti, joka voitti parhaan pitkän
  dokumentin palkinnon Prahan elokuvapalkinnoissa 2020. Kylän
  keskusaukiolla on nyt patsas kalastajasta ja haikarasta, ja talojen
  seiniin on maalattu Yarenin kuvia. Vuodesta 2020 Yaren on tuonut
  veneelle myös puolisonsa, ja kesäkuussa 2021 suoralähetys näytti
  sen suojelevan poikasiaan sateelta.
- **Lähde:** en-Wikipedia "Yaren (stork)" (koko artikkeli) ja
  en-Wikipedia "Eskikaraağaç, Karacabey" (kylän väkiluku 199 vuonna
  2022; Ramsar-kohde; Euroopan haikarakylien verkoston jäsen 2011;
  vuosittainen haikarafestivaali vuodesta 2005).
- **Kuva:** ei pelissä. Commons: **Adem Amca ve Yaren Leylek
  2020.jpg** (5568×3480, CC BY-SA 4.0, Alpertuydes, 6.3.2020) —
  kuvaaja on sama Alper Tüydeş, joka nimetään Wikipedia-artikkelissa,
  eli kuva on tarinan oma alkuperäiskuva. **SILMÄTARKISTUS PAKOLLINEN:**
  kuvassa on tunnistettava henkilö (Adem Yılmaz). Hän on tässä
  yhteydessä julkisuuden henkilö ja kuvaaja on julkaissut kuvan
  CC-lisenssillä, mutta pelin oma henkilökuvasääntö on käytävä läpi.
- **Varmuus:** VARMA kaikesta yllä olevasta. **EPÄVARMA NYKYTILA:**
  Wikipedia-artikkelia ei ole päivitetty vuoden 2021 jälkeen, ja
  verkosta löytyi uutisotsikko haikaran "jäähyväisistä" 13 vuoden
  ystävyyden jälkeen. **Otsikko on kirjoitettava niin, ettei se väitä
  ystävyyden jatkuvan vuonna 2026** — esim. "palasi joka kevät
  yli kymmenen vuoden ajan".
- **LIVE-KAMERA (omistajan pyyntö):** Karacabeyn kunta asensi 2022
  kameran pesän viereen 24/7-lähetystä varten (vahvistettu
  en-Wikipedia "Yaren (stork)": *"In 2022, the municipality... installed
  a video camera next to Yaren's nest in the village for broadcasting
  a livestream from the spot"*).
  - `https://www.geocam.ru/en/online/yarenleylek/` — **vastasi
    HTTP 200** tarkistushetkellä 25.8.2026. Vain vastauskoodi
    tarkistettu, kuvan liikkumista ei varmennettu.
  - `https://www.youtube.com/watch?v=ILEa3RogNEU` — YouTube-lähetys
    "Yaren Leylek Canlı Yayın". **EI voitu tarkistaa tästä
    ympäristöstä** (välityspalvelin palautti 429/captcha).
  - **TEKNINEN UPOTUS SELVITETÄÄN ERIKSEEN. Mitään ei luvata.**
    Selvittämättä ovat: kameran pysyvyys, upotusoikeudet,
    tekijänoikeudet, pelin CSP-yhteensopivuus ja se, että haikara on
    kylässä vain noin kuusi kuukautta vuodesta — suuren osan vuodesta
    kamera näyttää tyhjää pesää.
- **KREIKKA-JATKUMO:** kylän asukkaat ovat vuoden 1924 väestönvaihdon
  yhteydessä Kreikan Dramasta muuttaneiden jälkeläisiä (ja 1937
  Bulgariasta tulleita) — lähde: "Eskikaraağaç, Karacabey".

### 6. "Troijan löytäjä tuhosi Troijan"

- **Kohde:** Troija (fokuskohde `troija`,
  `fokuskohteet-turkki.md` kohde 1) / Heinrich Schliemann.
- **Lunastus:** Schliemann kaivoi Hisarlıkin kummulla vuodesta 1870
  ja päätti, että toinen kerros alhaalta — Troija II — oli Homeroksen
  Troija. Kaivaakseen sen kokonaan esiin hän **tuhosi valtaosan
  vuosien 2300–1750 eaa. jäänteistä dokumentoimatta niitä lainkaan**.
  Häntä arvosteltiin siitä jo hänen omana aikanaan: hän poisti
  kohteita, joita piti merkityksettöminä, tutkimatta ja kirjaamatta
  niitä. Ja hän oli väärässä: myöhemmät kaivaukset osoittivat, että
  Troija II oli tuhat vuotta liian vanha ollakseen myykeneläisajan
  Troija. Wilhelm Dörpfeld löysi Troija VI:n muurista heikon kohdan
  — aivan kuten Homeroksen kaupungissa — ja vakuuttui, että se oli
  oikea kerros. Schliemann oli yksityisesti samaa mieltä. Hän ei
  koskaan julkaissut sitä.
- **Lähde:** en-Wikipedia "Troy", osio "Heinrich Schliemann" ("Even in
  his own time Schliemann was controversial because of his excavation
  methods which included removing features he considered insignificant
  without first studying and documenting them"; "He proposed that the
  second layer, Troy II, corresponded to the city of legend, though
  later research has shown that it predated the Mycenaean era by
  several hundred years") · osio "Troy III–V" ("little is known about
  these several layers due to Schliemann's careless excavation
  practices. In order to fully excavate the citadel of Troy II, he
  destroyed most remains from this period without first documenting
  them") · osio "Wilhelm Dörpfeld" ("Dörpfeld came across a section of
  the Troy VI wall which was weaker than the rest. Since the mythic
  city had likewise had a weak section of its walls, Dörpfeld became
  convinced that this layer corresponded to Homeric Troy. Schliemann
  himself privately agreed that Troy VI was more likely to be the
  Homeric city, but he never published anything stating so").
- **Kuva:** ei pelissä. Commons: **Heinrich Schliemann, half-length
  portrait, facing front LCCN96516246.tif** (3226×4096, public domain,
  Library of Congress, **1870** — juuri kaivausten alkuvuodelta) tai
  kohteesta **Legendary walls of Troy (8708672267).jpg** (4288×2848,
  CC BY 2.0, Jorge Láscar, 2012).
- **Varmuus:** VARMA — suoraan lähteessä, useassa eri osiossa.
- **KREIKKA-JATKUMO:** Schliemann-nostoja on jo kolme Kreikan
  listalla (`takynostot-kreikka.md` ehdokkaat 1–4). Tämä on niiden
  luonteva neljäs käänne toisessa maassa — ja se on ainoa, joka
  koskee itse kaivausta. Jos Kreikassa on käytetty Sofian korukuvaa,
  Turkissa tämä sulkee tarinan: sama mies, sama vuosi, ja lopputulos
  oli että aarre löytyi mutta kaupunki tuhoutui.
- **1873-KYTKÖS:** kaivauskausi 1871–1873 ja aarteen löytö kesäkuussa
  1873 osuvat tasan isoisän matkavuoteen.

### 7. "Papit myivät turisteille lintuja, jotta nämä näkisivät kuinka nopeasti helvetin portti tappaa"

- **Kohde:** Hierapolis / Pamukkale (fokuskohde `pamukkale`,
  `fokuskohteet-turkki.md` kohde 4).
- **Lunastus:** Hierapoliksen vanhin pyhäkkö oli **Plutonium**,
  Pluton portti: pieni luola, johon mahtui yksi ihminen kerrallaan ja
  josta nousi tukahduttavaa hiilidioksidia maanalaisesta
  geologisesta aktiivisuudesta. Hiilidioksidi on ilmaa raskaampaa ja
  painuu koloihin, joten luolan edessä oleva 2 000 neliömetrin
  aidattu alue oli kaasun peitossa. Kybelen kastroidut papit
  laskeutuivat luolaan ryömien lattiaa pitkin happitaskuja etsien tai
  hengitystään pidättäen — ja nousivat sitten ylös näyttääkseen,
  että he olivat ihmeen tavoin immuuneja ja jumalan suojeluksessa.
  Kävijöille papit myivät lintuja ja muita eläimiä, jotta nämä
  voisivat kokeilla, kuinka tappava alue oli. Maksusta sai myös
  kysyä kysymyksen Pluton oraakkelilta. Se oli temppelille
  huomattava tulonlähde.
- **Lähde:** en-Wikipedia "Hierapolis", osio "Ploutonion": "During the
  early years of the town, castrated priests of Cybele descended into
  the plutonion, crawling over the floor to pockets of oxygen or
  holding their breath. Carbon dioxide is heavier than air and so tends
  to settle in hollows. The priests would then come up to show that they
  were miraculously immune to the gas and infused with divine
  protection. An enclosed area of 2,000 square metres stood in front of
  the entrance. It was covered by a thick layer of suffocating gas,
  killing anyone who dared to enter it. The priests sold birds and
  other animals to the visitors, so that they could try out how deadly
  this enclosed area was. Visitors could (for a fee) ask questions of
  Pluto's oracle. This provided a considerable source of income for the
  temple. The entrance to the plutonion was walled off during the
  Christian times and has just been recently unearthed."
- **Kuva:** ei pelissä. Commons — **PARAS 1873-OSUMA KOKO LISTALLA
  KUVANA: Ruïne van het Ploutonion te Hiërapolis,
  RP-F-2001-7-440-12.jpg** (4480×3462, **CC0, Rijksmuseum**,
  kuvattu n. 1859–1869) — valokuva Pluton portin raunioista
  muutamaa vuotta ennen isoisän matkaa. Nykykuva: **Plutonium (Pluto's
  Gate) in Hierapolis 01.jpg** (3264×4928, CC BY-SA 2.0,
  Carole Raddato, 2015).
- **Varmuus:** VARMA — suoraan lähteessä.
- **IKÄSOPIVUUS:** tämä on listan raain nosto. Eläinten myyminen
  kuoltavaksi on 13+ -yleisölle kestettävä mutta ei mässäiltävä
  asia — **ja se on suoraan ristiriidassa muiden eläinnostojen
  (4 ja 5) lämpimän sävyn kanssa.** Suositukseni: jos eläinnostot 4
  ja 5 otetaan peliin, tämä kannattaa muotoilla uudelleen niin, että
  otsikko koskee pappeja, ei lintuja — esim. *"Papit kävelivät
  helvetin portin läpi ja palasivat elävinä — temppelin paras
  bisnesidea 2 000 vuoteen"* — ja jättää eläinkoe lunastuksen
  loppuun yhtenä lauseena. Fablen päätettäväksi.
- **KREIKKA-JATKUMO:** artikkeli huomauttaa itse, että Apollonin
  temppeleitä rakennettiin usein geologisesti aktiivisille paikoille
  — "including his most famous, the temple at Delphi". Delfoi on jo
  pelin fokuskohde.

### 8. "Basaari suljettiin joka yö rautaportein — viidessäsadassa vuodessa se avattiin yöllä kerran, ja silloin sulttaani ratsasti sen läpi"

- **Kohde:** Suuri basaari (jo pelissä, nahtavyysjutut.js — kuva jo
  pelissä: `Grand Bazaar (Istanbul).jpg`). Nykyinen juttu kertoo
  katujen määrästä ja tulipaloista, EI turvajärjestelyistä; ei siis
  toistoa.
- **Lunastus:** Kaupankäynti keskitettiin yhteen paikkaan nimenomaan
  turvallisuuden vuoksi: Bedestenissä olevat tavarat oli taattu
  kaikkea vastaan paitsi kapinaa. Portit suljettiin joka yö,
  kauppiaskiltojen palkkaamat vartijat kiersivät käytäviä, ja sisään
  pääsi yöllä vain keisarillisella määräyksellä. Holvikellareita
  käytettiin suoraan kassaholveina. Basaarin koko historian ainoa
  virallinen yöavaus oli **vuonna 1867**, kun juhlittiin sulttaani
  Abdülazizin paluuta Egyptistä: hallitsija ratsasti hevosella
  valaistun basaarin läpi riemuitsevan väkijoukon keskellä. Erään
  englantilaisen matkaajan mukaan noin vuonna 1870 kierros
  sisäbedestenissä olisi voinut "helposti tuhota muutaman
  Rothschild-suvun" — ja silti varkaudet olivat äärimmäisen
  harvinaisia.
- **Lähde:** en-Wikipedia "Grand Bazaar, Istanbul", osio "Security"
  (koko yllä oleva ketju sanatarkasti; ks. `takyt-istanbul.md` täky 8,
  jossa lainaus on kokonaan).
- **Kuva:** basaarin nykykuva on jo pelissä. Tälle nostolle
  aikalaiskuva: Commons **Yeni Cami mosque and Eminönü bazaar,
  Constantinople, Turkey LCCN2003653120.tif** (3612×2643, public
  domain, Library of Congress, 1890). Vaihtoehtoisesti sulttaanista
  ratsain: **Sultan Abdül Aziz on horse back.jpg** (1292×1256,
  public domain, Stanisław Chlebowski, **1867** — tasan sen vuoden
  kuva, jolloin ratsastus tapahtui). Jälkimmäinen on
  miniatyyrikuvaksi selvästi parempi, koska se lunastaa otsikon
  kuvallisesti.
- **Varmuus:** VARMA — suoraan lähteessä. Rothschild-lainaus on
  Wikipedian tiivistys nimeämättömästä englantilaisesta matkaajasta;
  käytä muodossa "erään englantilaisen matkaajan mukaan".
- **1873-KYTKÖS:** kuusi vuotta ennen isoisän matkaa; ja
  Rothschild-huomio on kirjattu "as late as c. 1870", eli isoisän
  aikalaisen sanoma.
- **IKÄSOPIVUUSRAJAUS:** artikkelin kertoma vuoden 1591 varkaus
  (30 000 kultakolikkoa) päättyy kidutukseen ja hirttämiseen —
  **EI mukaan.**

### 9. "Sokea, lähes satavuotias mies valloitti Konstantinopolin — ja hänen hautansa kirkossa on väärennös"

- **Kohde:** Hagia Sofia (jo pelissä, kuva jo pelissä:
  `Hagia Sophia Mars 2013.jpg`) / Enrico Dandolo. Ks.
  `takyt-istanbul.md` täky 3.
- **Lunastus:** Venetsian doge Enrico Dandolo oli valittu virkaansa
  1192 jo vanhana ja sokeana. Villehardouinin aikalaiskuvauksen mukaan
  "vaikka hänen silmänsä näyttivät normaaleilta, hän ei nähnyt kättä
  kasvojensa edessä". Silti hän johti neljättä ristiretkeä ja vuoden
  1204 Konstantinopolin valtausta, sai Latinalaiselta keisarikunnalta
  arvonimen despootti ja kuoli kaupungissa 1205. Hänet haudattiin
  Hagia Sofiaan. Kun bysanttilaiset valtasivat kaupungin takaisin
  1261, keisari Mikael VIII käski heittää jäännökset Bosporiin.
  Se kivilaatta, jonka turistit yhä kuvaavat kirkon yläparvella, on
  1800-luvulla italialaisen restaurointiryhmän paikalle asettama
  muistokivi — ei keskiaikainen hauta, vaikka sitä siksi jatkuvasti
  luullaan.
- **Lähde:** en-Wikipedia "Enrico Dandolo", johdanto, osiot
  "Death and burial" ja "Blindness"; en-Wikipedia "Hagia Sophia"
  (sama tieto muistokivestä). Täydet lainaukset:
  `takyt-istanbul.md` täky 3.
- **Kuva:** Hagia Sofian yleiskuva on jo pelissä. Tälle nostolle
  Commons: **Enrico Dandolo gravestone.jpg** (2855×1715, CC BY-SA
  3.0, Myrabella, 2012) — itse laatta, joka on nimenomaan tarinan
  kohde.
- **Varmuus:** VARMA laatan luonteesta ja Dandolon sokeudesta.
  **EPÄVARMA jäännösten kohtalo** — lähde ITSE toteaa: "various
  legends attribute this destruction to the times of the Byzantine
  reconquest of the city or shortly after the Ottoman conquest".
  Otsikko sanoo "väärennös", mikä on liian vahva sana — parempi
  muoto lunastuksessa on lähteen oma: laatta on 1800-luvun
  muistokivi, jota luullaan usein keskiaikaiseksi. **Otsikko on
  muotoiltava niin, ettei se väitä petosta.** Ehdotus:
  *"Sokea, lähes satavuotias mies valloitti Konstantinopolin — ja
  hauta, jota turistit kuvaavat, on 600 vuotta liian nuori."*
- **Ikä:** Dandolon syntymävuosi c. 1107 nojaa Marino Sanuto
  nuorempaan, joka kirjoitti kolme vuosisataa myöhemmin; lähde
  toteaa, että osa tutkijoista arvioi hänen olleen virkaan
  astuessaan 70-luvun puolivälissä. **Sano "hyvin vanha" tai
  "kahdeksankymppinen", älä "97-vuotias".**
- **BYRON-KYTKÖS:** lordi Byron kirjoitti Dandolosta *Childe Haroldin*
  säkeen "Oh, for one hour of blind old Dandolo!" — Byron on jo
  pelin Kreikka-aineistossa kahdessa kohdassa.

### 10. "Insinööri suunnitteli maailman toiseksi vanhimman metron — eikä tullut sen avajaisiin"

- **Kohde:** Tünel, Karaköy–Beyoğlu. Ks. `takyt-istanbul.md` täky 6.
  UUSI kohde-ehdotus (Tünel ei ole pelin laudalla).
- **Lunastus:** Ranskalainen insinööri Eugène-Henri Gavand tuli
  Konstantinopoliin turistina 1867 ja järkyttyi näystä: Galatan
  pankkikorttelin ja Peran hotellien välillä oli 24 prosentin rinne,
  jota kiipesi joka päivä keskimäärin 40 000 ihmistä. Hän suunnitteli
  tunnelivaunun ja sai luvan sulttaani Abdülazizilta 10.6.1869.
  Sitten kaikki meni pieleen: Preussin hyökkäys Ranskaan kaatoi
  ranskalaisen yhtiön perustamisen, joten Gavand meni Britanniaan ja
  perusti sinne Metropolitan Railway of Constantinoplen. Rakentaminen
  alkoi 30.7.1871 ja viivästyi maanomistajien riidoissa. Tunneli
  valmistui joulukuussa 1874 ja avattiin liikenteelle 17.1.1875 —
  maailman toiseksi vanhin maanalainen kaupunkirata Lontoon metron
  jälkeen (10.1.1863). **Gavand oli avajaisista poissa.**
- **Lähde:** en-Wikipedia "Tünel", johdanto ja osio "History"
  (täydet lainaukset `takyt-istanbul.md` täky 6).
- **Kuva:** ei pelissä. Commons: **Karaköy İstasyonunda bulunan maket
  (Tünel).jpg** (4032×3024, CC BY 4.0, Kayra, 2024 — asemalla oleva
  pienoismalli, joka näyttää alkuperäisen puisen junan) tai
  **Istanbul Tuenel station Karakoey.jpg** (1280×960, CC BY-SA 2.0,
  Justinbb, 2005). VÄLTÄ A.Savinin kuvia, jos pelin sääntö on tiukka
  PD/CC — ne ovat FAL-lisenssillä.
- **Varmuus:** VARMA — suoraan lähteessä. Lähde ei kerro, MIKSI
  Gavand jäi pois; älä keksi syytä. "Gavand was notably absent at
  the opening ceremony" on koko tieto.
- **1873-KYTKÖS:** isoisä olisi nähnyt vuonna 1873 työmaan, ei
  junaa. Erinomainen matkakirjamerkinnän aihe: hän seisoi kuopan
  reunalla eikä tiennyt, mitä siitä tulisi.

---

## Varapenkki 11–13 (tarkistettuja, tiiviimmin)

### 11. "Suurlähettiläs muutti linnoitukseen koko henkilökuntansa kanssa — se oli sodanjulistus"

- **Kohde:** Yedikulen linnoitus. Ks. `takyt-istanbul.md` täky 12.
- **Lunastus:** Yedikuleen suljettiin tavan mukaan niiden valtioiden
  suurlähettiläät, joiden kanssa ottomaanit olivat sodassa. Vuonna
  1768 Venäjän suurlähettiläs Aleksei Obreskov ja koko lähetystön
  henkilökunta teljettiin sinne — se oli sodanjulistus Venäjälle.
  Linnoitus oli alun perin rakennettu valtakunnan aarrekammioksi:
  jokainen torni varastoi kalleuksia, asiakirjoja, aseita ja
  kulta- ja hopeaharkkoja.
- **Lähde:** en-Wikipedia "Yedikule Fortress".
- **Kuva:** Commons **Yedikule 3390.jpg** (4928×3280, CC BY-SA 4.0,
  Dosseman, 2006).
- **Varmuus:** VARMA. **IKÄSOPIVUUSRAJAUS:** artikkelin luettelo
  linnoituksessa teloitetuista (mm. sulttaani Osman II 1622,
  Trapezuntin viimeinen keisari) EI mukaan.

### 12. "Kaupungin perustaja kysyi Delfoin oraakkelilta, mihin rakentaa — ja sai vastaukseksi: sokeiden kaupunkia vastapäätä"

- **Kohde:** vanhankaupungin niemi / Kadıköy (jo pelin
  Istanbul-laudalla!). Ks. `takyt-istanbul.md` täky 15.
- **Lunastus:** Megaran kuningas Nisos lähetti poikansa Byzasin
  etsimään "maata sokeiden kaupunkia vastapäätä". Byzas ymmärsi
  vastauksen saapuessaan Bosporin suulle: vastarannalla oli jo
  Khalkedon, joka oli sivuuttanut Euroopan puolen ylivertaisen
  paikan. Herodotoksen mukaan persialainen kenraali Megabazos oli
  sanonut samaa — Khalkedonin perustajien on täytynyt olla sokeita.
  Khalkedon on nykyinen **Kadıköy**, joka on jo pelin kartalla.
- **Lähde:** en-Wikipedia "Byzas", "Chalcedon", "Byzantium".
- **Kuva:** Commons **Istanbul and Bosporus big.jpg** (1000×1163,
  public domain, NASA, ISS008-E-21752, 2004) — satelliittikuva näyttää
  tasan sen asetelman, josta oraakkeli puhui.
- **Varmuus:** VARMA siitä, mitä antiikin lähteet kertovat. Vuosiluku
  vaihtelee lähteittäin (667 / 657 / 656 eaa.) — sano "600-luvulla
  eaa.". **KREIKKA-JATKUMO:** Delfoi on jo pelin fokuskohde.

### 13. "Yksi unohtunut ovi kaatoi kaupungin, joka oli kestänyt tuhat vuotta — ja tutkijat epäilevät tarinaa yhä"

- **Kohde:** Theodosiuksen muurit / Kerkoporta. Ks.
  `takyt-istanbul.md` täky 11. UUSI kohde-ehdotus.
- **Lunastus:** Historioitsija Doukasin mukaan 29.5.1453 pieni
  sivuportti Kerkoporta jäi vahingossa auki, ja siitä pääsi sisään
  noin viisikymmentä ottomaanisotilasta, mikä johti kaupungin
  kaatumiseen. Vuonna 1864 kreikkalainen tutkija A. G. Paspates
  tunnisti muurin päästä löytyneet portin jäänteet Kerkoportaksi, ja
  van Millingen ja Steven Runciman hyväksyivät tulkinnan. Kaivaukset
  eivät kuitenkaan ole löytäneet vastaavaa porttia sisemmästä
  muurista — ja osa historioitsijoista pitää koko tarinaa keksittynä
  tai vanhemman legendan muunnelmana.
- **Lähde:** en-Wikipedia "Walls of Constantinople", osio
  "Kerkoporta".
- **Kuva:** Commons **Theodosian Walls of Constantinople, Istanbul
  (37905571151).jpg** (3277×2170, CC BY-SA 2.0, Carole Raddato, 2017).
- **Varmuus:** VARMA siitä, mitä lähteet sanovat — ja lähde ITSE
  toteaa tarinan kiistanalaiseksi. **Otsikon toinen puolisko on
  pakollinen**, ei koriste: ilman sitä tämä olisi legendan
  myyminen faktana. Näin muotoiltuna se on kuitenkin harvinaisen
  hyvä täky, koska koukku on juuri epävarmuus.
- **1873-KYTKÖS:** tunnistus tehtiin 1864, yhdeksän vuotta ennen
  isoisän matkaa — tuoretta arkeologiaa juuri sellaiselle
  matkaajalle.

---

## Hylätyt / tarkistuksessa kaatuneet

1. **"Göbekli Tepe haudattiin tarkoituksella."** Klikkiotsikoksi
   täydellinen, ja täysin vanhentunut: en-Wikipedia toteaa hypoteesin
   **hylätyksi**. Ei käyttöön missään muodossa.
2. **Thales ennusti pimennyksen ja pysäytti sodan Halysilla.**
   Yksi maailman parhaista tositarinoista — mutta en-Wikipedian
   "Kızılırmak River" -artikkeli EI kerro Thaleen ennustaneen
   pimennystä (se mainitsee hänet vain joenylityksen insinöörinä).
   Sama koskee Delfoin oraakkelin lausetta Kroisokselle ("jos ylität
   Halysin, tuhoat suuren valtakunnan"). Kumpaakaan ei saa käyttää
   ilman uutta lähdettä toisesta artikkelista. **Harmi, koska
   oraakkelilause olisi sitonut tämän suoraan Delfoihin.**
3. **Hezârfen Ahmed Çelebin lento Galatan tornista 1638.** JO PELISSÄ
   (nahtavyysjutut.js). Ei uutena nostona.
4. **Gli-kissa Hagia Sofiassa ja Obaman vierailu.** JO PELISSÄ
   (kulttuuri-kategoriat.js). Ehdokas 4 on tarkoituksella eri kulma
   (mancacı-ammatti); Gli-tarinaa ei saa toistaa.
5. **Yerebatanin Medusan päät.** JO PELISSÄ. Uusi, varmennettu
   yksityiskohta olisi se, että päät paljastuivat vasta vuosien
   1985–87 kunnostuksessa, kun säiliöstä poistettiin yli 50 000 tonnia
   lietettä — eli isoisä ei voinut nähdä niitä. Yhden lauseen
   lisäys olemassa olevaan juttuun, ei oma nosto.
6. **Tombili-kissa ja varastettu patsas.** Ehdokkaana harkittu ja
   varmennettu (en-Wikipedia "Tombili"): Kadıköyn Ziverbeyssä asunut
   katukissa, josta tuli maailmankuulu nojailevan asentonsa kuvasta;
   kuoltuaan 1.8.2016 se sai muistopatsaan 17 000 nimen adressin
   jälkeen; kuukautta myöhemmin patsas varastettiin ja palautettiin
   10.11.2016 kohun jälkeen. Commons: **Tombili the cat n1.jpg**
   (5312×2988, CC BY-SA 3.0, Nevit, 6.10.2016). **Miksi hylätty
   päälistalta:** tarina on hyvä ja söpö, mutta se on
   internet-ilmiö vuodelta 2016 ilman mitään kosketusta 1873-kerrokseen
   tai Kreikka-jatkumoon, ja kissa-aihe on jo katettu ehdokkaassa 4.
   **Nostetaan takaisin, jos halutaan kolmas eläinnosto tai kevyt,
   nykyaikainen nosto** — patsaan varkaus ja palautus on aitoa
   keltaisen lehden ainesta ("Kaupunki pystytti patsaan
   katukissalle — kuukautta myöhemmin patsas katosi").
7. **Mustanmeren delfiini Bosporinsalmessa.** Alalaji ja sen
   eristyneisyys ovat varmennettuja, mutta väitettä säännöllisistä
   delfiinihavainnoista Istanbulin kohdalla EI saatu varmennettua.
   Ei nostoa ilman sitä. Ks. `takyt-istanbul.md` varapenkki 22.
8. **Abdülazizin kuolema 1876.** Vahva klikkiotsikkoaines
   (syrjäytetty sulttaani löytyi kuolleena kuusi päivää myöhemmin;
   kuolintapa on historiallisesti kiistelty). **Rajattu pois
   ikäsopivuuden vuoksi**, samalla periaatteella kuin
   `takynostot-kreikka.md`:n Chalepas-kohta. Sulttaanista on kaksi
   muuta hyvää nostoa (1 ja 8) ilman tätä.
9. **Basaarin vuoden 1591 varkaus.** Varmennettu, mutta päättyy
   kidutukseen ja hirttämiseen. Ei käyttöön; ehdokas 8 kertoo saman
   asian ilman raskasta loppua.
10. **Topkapın teloittajan suihkulähde.** Varmennettu, mutta lähde
    toteaa itse käyttötarkoituksen kiistanalaiseksi ja aihe on
    ikäsopivuusrajauksen ulkopuolella.
11. **Kissojen ja koirien joukkotapot Istanbulissa** (1830-luku,
    1920–40-luku, 1996). Kaikki varmennettu, kaikki rajattu pois.
    Ks. ehdokas 4.

---

## Yhteenveto ja kolme parasta

**13 ehdokasta, kaikki tarkistettu; 10 varsinaista + 3 varapenkillä.**
Yksikään ei jäänyt kokonaan vahvistamatta. Neljässä kohdassa lähde
itse toteaa asian epävarmaksi tai kiistanalaiseksi (Eugénien
läimäys, Murad V:n "väitetty" mielisairaus, Dandolon jäännökset,
Kerkoporta) — merkitty kohdittain, ja kahdessa tapauksessa (9 ja 13)
epävarmuus on kirjoitettava OTSIKKOON, ei vain lunastukseen.
Neljä aihetta on rajattu ikäsopivuuden vuoksi kokonaan pois.

**Eläinnostoja: 2 päälistalla** (4 kissat/mancacı, 5 Yaren-haikara)
**+ 1 hylätyissä nostettavissa takaisin** (6 Tombili). Omistajan
25.8.2026 lisäys täytetty.

**Kolme parasta ehdotustani:**

1. **#5 — "Haikara on palannut samalle kalastajalle joka kevät
   vuodesta 2010."** Tämä on koko listan täydellisin osuma
   omistajan tilaukseen sen jälkeen, kun eläinvaatimus lisättiin:
   henkilö (Adem Yılmaz), uskomaton tositarina (villilintu palaa
   Afrikasta samaan veneeseen vuosi toisensa jälkeen), ja lunastus
   on lyhyt ja täysin faktapohjainen. Miniatyyrikuva on itsessään
   koukku — vanha kalastaja ja haikara samassa veneessä — ja se on
   tarinan OMA alkuperäiskuva, sen valokuvaajan ottama, joka
   nimetään lähteessä. Lisäksi tämä on ainoa kohde koko Turkin
   paketissa, jolla on olemassa oleva julkinen live-kamera
   (Karacabeyn kunnan pesäkamera 2022). Kamerasta ei luvata mitään
   ennen kuin tekninen upotus on selvitetty erikseen. Ehdotettu
   otsikkomuoto ilman nykytilaväitettä: *"Haikara lensi Afrikasta
   takaisin samaan veneeseen joka kevät yli kymmenen vuoden ajan —
   ja kalastaja odotti sitä joka maaliskuu."*

2. **#6 — "Troijan löytäjä tuhosi Troijan."** Lyhin ja iskevin
   otsikko koko listalla, ja se lunastaa lupauksensa täydellisesti:
   Schliemann kaivoi Troija II:n esiin tuhoamalla dokumentoimatta
   valtaosan sen päällä olleista kerroksista, ja hän oli vielä
   väärässä siitä, mikä kerros oli Homeroksen Troija — minkä hän
   yksityisesti myönsi mutta ei koskaan julkaissut. Pelillisesti tämä
   on paras mahdollinen jatko Kreikan Schliemann-nostoille: sama
   mies, sama vuosi 1873, uusi maa — ja käänne, joka opettaa jotain
   olennaista aarteenetsinnästä itsestään. Kuva on Library of
   Congressin PD-muotokuva vuodelta 1870.

3. **#1 — "Sulttaanin äiti läimäytti Ranskan keisarinnaa."**
   Puhtain "henkilöskandaali" omistajan sanatarkassa merkityksessä:
   kaksi maailmankuulua nimeä, palatsi, läimäys ja lähes syttynyt
   kansainvälinen selkkaus — ja tapahtuma-aika on viisi vuotta ennen
   isoisän matkaa, molempien osapuolten vielä ollessa vallassa.
   Kohde (Dolmabahçe) on jo pelin laudalla, joten toteutus on halpa.
   Lähde varaa asian sanalla "reportedly" ja antaa kaksi eri
   versiota — se on kerrottava, ja se itse asiassa parantaa tarinaa:
   hovista vuoti kaksi eri huhua siitä, mihin sulttaanin äiti löi.

Kunniamaininnat: **#2 (Nightingalen vasara)** on ehdottomasti paras
brittiläiselle päähenkilölle ja tuo peliin harvinaisen naishahmon,
jonka tarina on samalla hauska ja terävä (lempinimi vaihdettiin,
koska vasara oli "epänaisellinen") — se olisi kärjessä, jos Turkin
pakettiin haluttaisiin vain kolme nostoa ilman eläinvaatimusta;
**#10 (Gavand ei tullut avajaisiin)** on halvin ja hiljaisin, mutta
sen 1873-kerros on tarkin koko listalla — isoisä näki työmaan;
**#13 (Kerkoporta)** on rehellisin, koska se tekee epävarmuudesta
itse koukun.
