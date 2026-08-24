# Bulgarian fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 24.8.2026.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohta
KOHDEKOROSTUS/ETENEMINEN): pelilaatan lisäksi fokusnäkymän kartalla
näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen löydyttyä
niitä voi klikata, jolloin kartta korostaa juuri sen kohteen niukalla
taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti on
faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä eikä
UI-suunnitelmaa. Malli ja taso: docs/mantereet-tyoaineisto/
fokuskohteet-kreikka.md.

Bulgaria on fokusmoodin seuraava maa Kreikan jälkeen (Sofia on
Ateenasta yksi askel jalan pelin maantieteessä). Peliaatta itse
(Sofia) EI ole oma kohde tässä listassa, samaan tapaan kuin Ateena
ei ollut Kreikka-tiedostossa.

**HUOM koko dokumentin kannalta keskeinen ajoitus:** vuonna 1873,
jolloin isoisä matkusti, Bulgaria oli yhä osmanivaltaa — itsenäisyys
(oikeastaan autonominen ruhtinaskunta) saavutettiin vasta
Venäjän–Turkin sodan 1877–1878 jälkeen Berliinin sopimuksella, ja
täysi itsenäisyys julistettiin 1908. Tämä koskee KAIKKIA
kaupunkikohteita: Plovdiv oli 1873 "Filibe", Veliko Tarnovo oli
osmanien maaseutukaupunki eikä vielä minkään sortin pääkaupunki, ja
Varnakin oli osmanivaltakunnan satama. Osmanikausi on käsitelty
kunnioittavasti ja ikäsopivasti (13+): ei julmuuksien listaamista,
mutta ei myöskään peittelyä siitä, että alue oli osmanivaltaa.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`, `coprop=type`),
  haettu 24.8.2026 curlilla. Rajapinta vastasi toistuvasti 429:llä
  (Wikimedian kiintiörajoitus, jaettu tässä ympäristössä muunkin
  liikenteen kanssa) — kaikki koordinaatit saatiin lopulta läpi
  kasvavalla uusintaviiveellä (5 s → 10 s → 20 s...). EI yhtään
  koordinaattia muistista.
- **Popup-faktat:** en-Wikipedian artikkeleista, `action=query&
  prop=extracts&explaintext=1` (johdanto-osa ensin, tarvittaessa koko
  artikkelin tekstistä haettu tarkempi kohta samalla rajapinnalla,
  haettu erikseen per artikkeli). Jokaisen nostetun faktan kohdalla
  alla on merkitty artikkeli JA mihin kohtaan artikkelia se nojaa.
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`action=query&titles=...&redirects=1`, tarvittaessa
  `list=search`). Bulgarian kohteista USEALLA EI OLE OMAA
  fi-Wikipedia-artikkelia lainkaan (Rila-vuoristo, Vitoša,
  Ruusulaakso) — merkitty selvästi kunkin kohdan yhteyteen; näissä
  suomenkielinen nimi on koostajan muodostama, ei fi-Wikipedian
  vahvistama.
- **Commons-kuvakategoriat:** tarkistettu `action=query&
  prop=categoryinfo` commons.wikimedia.orgista, EI arvattu. Yhdessä
  tapauksessa (Balkan Mountains) ilmeisin kategorianimi oli
  olemassa mutta täysin tyhjä — merkitty selvästi kohteen kohdalle.
- Kaikki lähteet en-Wikipediasta paitsi nimien vahvistus
  fi-Wikipediasta ja kuvakategoriat Commonsista. Ei muita hakuja.

---

## Kohteet

### 1. Plovdiv

- **Nimi:** Plovdiv (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Пловдив (Plovdiv); osmanikaudella Filibe, antiikissa Philippopolis.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 42,15°N, 24,75°E — en-Wikipedia "Plovdiv"
  (coordinates-rajapinta, coprop=type: city).
- **Popup-teksti (411 merkkiä) — 1873-kytkös keskeinen:**

  > Vuonna 1873 kaupunkia kutsuttiin Filibeksi, ja se kuului osmanien
  > Edirnen vilajettiin – Bulgaria vapautui vasta 1878. Silti Filibe
  > oli tuolloin bulgarialaisen kansallisen herätysliikkeen keskus:
  > bulgarialainen kirkko elpyi täällä 1870. Kaupunki on rakentunut
  > seitsemälle kukkulalle, minkä vuoksi sitä kutsutaan "seitsemän
  > kukkulan kaupungiksi", ja asutusta alueella on ollut
  > yhtäjaksoisesti jo 6000-luvulta eaa.

- **Lähde:** en-Wikipedia "Plovdiv", osio "History/Ottoman rule"
  (Plovdiv/Filibe oli Edirnen vilajetin sanjakkikeskus 1867–1878,
  siis myös 1873) ja sen alaotsikko "National revival" (Filibe
  bulgarialaisen kansallisen liikkeen keskus, bulgarialaisen kirkon
  elpyminen 1870) sekä johdanto-osa (toiseksi suurin kaupunki,
  "seitsemän kukkulan kaupunki" seitsemän syeniittikukkulan vuoksi,
  asutusta alueella 6000-luvulta eaa. lähtien). Itsenäistymisvuosi
  1878 johdannosta ja osiosta "Eastern Rumelia".
- **Commons:** Category:Plovdiv — tarkistettu, 111 tiedostoa,
  13 alikategoriaa. Kunnossa.

### 2. Varna

- **Nimi:** Varna (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Варна (Varna); antiikissa Odessos.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 43,21667°N, 27,91667°E — en-Wikipedia
  "Varna, Bulgaria" (coordinates-rajapinta).
- **Popup-teksti (400 merkkiä):**

  > Varna tunnettiin antiikissa nimellä Odessos ja on kehittynyt
  > kolmen vuosituhannen aikana merkittäväksi satamakaupungiksi
  > Mustallamerellä. Vuonna 1974 löydetystä Varnan nekropolista on
  > kaivettu esiin yli 3000 kultaesinettä – maailman vanhin tunnettu
  > kultaaarre, ajoitettu vuosille 4600–4200 eaa. Nykyään Varnaa
  > kutsutaan Bulgarian merelliseksi pääkaupungiksi, sillä siellä
  > sijaitsee laivaston päämaja.

- **Lähde:** en-Wikipedia "Varna, Bulgaria", johdanto-osa (kolmanneksi
  suurin kaupunki, historiallinen nimi Odessos, kehittynyt lähes
  kolmen vuosituhannen ajan merkittäväksi keskukseksi, "Bulgarian
  merellinen pääkaupunki", laivaston ja kauppalaivaston päämaja,
  maailman vanhin tunnettu kultaesineistö Varnan kulttuurista löytyi
  Varnan nekropolista, ajoitettu 4600–4200 eaa., nekropoli löydetty
  1974, yli 3000 kultaesinettä yli 294 hautauspaikasta).
- **Commons:** Category:Varna — tarkistettu, 130 tiedostoa,
  12 alikategoriaa. Kunnossa. **HUOM:** ilmeisin ehdokas
  "Category:Varna, Bulgaria" EI ole olemassa — käytä lyhyttä
  muotoa "Category:Varna".

### 3. Veliko Tarnovo

- **Nimi:** Veliko Tarnovo (fi-Wikipedia; "Veliko Tarnovo" ohjautuu
  kirjoitusasuun "Veliko Tărnovo"). Paikallinen: Велико Търново
  (Veliko Tǎrnovo), "Suuri Tarnovo".
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 43,07778°N, 25,61667°E — en-Wikipedia
  "Veliko Tarnovo" (coordinates-rajapinta).
- **Popup-teksti (377 merkkiä) — 1873-kytkös keskeinen:**

  > Veliko Tarnovo oli Toisen Bulgarian valtakunnan pääkaupunki
  > 1185–1393, kunnes osmanit valtasivat sen kolmen kuukauden
  > piirityksen jälkeen. Isoisän vieraillessa 1873 kaupunki oli yhä
  > osaa osmanivaltaa – kukaan ei vielä tiennyt, että vain kuusi
  > vuotta myöhemmin, huhtikuussa 1879, tänne kokoontuisi Bulgarian
  > ensimmäinen kansalliskokous hyväksymään maan ensimmäisen
  > perustuslain.

- **Lähde:** en-Wikipedia "Veliko Tarnovo", osiot "Medieval Bulgarian
  rule" (Tarnovgrad Toisen Bulgarian valtakunnan pääkaupunki
  1185–1393, Tsarevetsin linnoitus kuninkaallisena ja
  patriarkaattipalatsina), "Ottoman rule" (osmanit valtasivat
  kaupungin 17.7.1393 kolmen kuukauden piirityksen jälkeen,
  puolustusta johti patriarkka Evtimiy) ja "Third Bulgarian State"
  (Venäjän kenraali Gourko vapautti kaupungin 7.7.1877; Berliinin
  sopimus 1878 teki Veliko Tarnovosta ruhtinaskunnan väliaikaisen
  keskuksen; ensimmäinen kansalliskokous kokoontui 17.4.1879
  ratifioimaan Tarnovon perustuslain, minkä jälkeen parlamentti
  siirtyi Sofiaan). 1873-vertailu (osmanivaltaa, tapahtumat vielä
  edessä) oma laskelmani, ei suora Wikipedia-lainaus.
- **Commons:** Category:Veliko Tarnovo — tarkistettu, 539 tiedostoa,
  12 alikategoriaa. Kunnossa.

### 4. Rila-vuoristo

- **Nimi:** Rila-vuoristo. **HUOM: EI OMAA fi-Wikipedia-artikkelia**
  — haku "Rila-vuoristo" ja "Rila (vuoristo)" molemmat puuttuvat;
  termi "Rila-vuoristo" esiintyy vain muiden fi-artikkelien (esim.
  "Iskär", "Rilan kansallispuisto") sisällä. Suomenkielinen nimi on
  koostajan muodostama, ei fi-Wikipedian vahvistama. Paikallinen:
  Рила (Rila).
- **Tyyppi:** vuori (vuoristo).
- **Koordinaatit:** 42,1°N, 23,55°E — en-Wikipedia "Rila"
  (coordinates-rajapinta, coprop=type: mountain). **HUOM:** karkea
  koko vuoriston keskipiste, ei täsmäpiste — samaan tapaan kuin
  Kreikka-tiedoston merikohteet.
- **Popup-teksti (400 merkkiä):**

  > Rila on Bulgarian, koko Balkanin niemimaan ja koko
  > Kaakkois-Euroopan korkein vuoristo – sen huippu Musala kohoaa
  > 2925 metriin. Vuoristo kätkee lähes 200 jääkauden muovaamaa
  > järveä, joista tunnetuin ryhmä on seitsemän Rilan järveä. Täältä
  > saavat alkunsa monet Balkanin pisimmistä joista, ja Bulgarian
  > vedenjakaja Mustanmeren ja Egeanmeren valuma-alueiden välillä
  > kulkee juuri Rilan harjannetta pitkin.

- **Lähde:** en-Wikipedia "Rila", johdanto-osa (Bulgarian, Balkanin
  niemimaan ja Kaakkois-Euroopan korkein vuoristo, korkein huippu
  Musala 2925 m, Euroopan kuudenneksi korkein vuoristo, lähes 200
  jääkauden muovaamaa järveä mukaan lukien Seitsemän Rilan järveä,
  Bulgarian päävedenjakaja Mustanmeren ja Egeanmeren valuma-alueiden
  välillä kulkee Rilan pääharjannetta pitkin, Balkanin pisimmät ja
  syvimmät joet — Maritsa, Iskar, Mesta — saavat alkunsa täältä).
- **Commons:** Category:Rila — tarkistettu, 356 tiedostoa,
  13 alikategoriaa. Kunnossa.

### 5. Musala

- **Nimi:** Musala (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Мусала (Musala).
- **Tyyppi:** vuori (huippu).
- **Koordinaatit:** 42,17972°N, 23,58667°E — en-Wikipedia "Musala"
  (coordinates-rajapinta, coprop=type: mountain).
- **Popup-teksti (386 merkkiä):**

  > Musala on koko Balkanin niemimaan korkein kohta, 2925 metriä –
  > nimi juontuu arabiasta osmanin turkin kautta ja tarkoittaa
  > suunnilleen "rukouspaikkaa". Huipulta näkee kaikki Bulgarian
  > suuret vuoristot Vitošasta Piriniin. Huipulla toimi vuodesta
  > 1960 kosminen säteilyasema, kunnes tulipalo tuhosi sen 1983.
  > Musalan keskilämpötila on Bulgarian ja koko Balkanin kylmin,
  > keskimäärin -2,2 °C.

- **Lähde:** en-Wikipedia "Musala", johdanto-osa (nimi arabian sanasta
  "musalla" osmanin turkin kautta, merkitys "lähellä Jumalaa"/
  "rukouspaikka"; korkein huippu Rilassa, Bulgariassa ja koko
  Balkanin niemimaalla, 2925,42 m; huipulta näkyvät kaikki Bulgarian
  päävuoristot mukaan lukien Vitoša ja Pirin; kosminen säteilyasema
  rakennettiin 1960 Unkarin tiedeakatemian kanssa, tuhoutui
  tulipalossa 29.10.1983; keskilämpötila -2,2 °C tekee Musalasta
  Bulgarian ja koko Balkanin kylmimmän paikan).
- **Commons:** Category:Musala — tarkistettu, 57 tiedostoa,
  2 alikategoriaa. Kunnossa.

### 6. Rilan luostari

- **Nimi:** Rilan luostari (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Рилски манастир „Свети Иван Рилски" (virallisesti
  Pyhän Ivan Rilalaisen luostari).
- **Tyyppi:** muu (ortodoksiluostari, erikoiskohde).
- **Koordinaatit:** 42,13333°N, 23,34028°E — en-Wikipedia
  "Rila Monastery" (coordinates-rajapinta, coprop=type: landmark).
- **Popup-teksti (386 merkkiä):**

  > Rilan luostari on Bulgarian suurin ja kuuluisin
  > ortodoksiluostari, perustettu 900-luvulla erakko Pyhän Ivan
  > Rilalaisen (876–946) mukaan. Se sijaitsee syvässä Rilan-joen
  > laaksossa 1147 metrin korkeudessa, Rilan vuoriston sydämessä.
  > Luostarissa asuu noin 60 munkkia, ja se on kuvattu Bulgarian
  > yhden levin seteliin. Vuonna 2008 sitä kävi katsomassa 900 000
  > pyhiinvaeltajaa ja matkailijaa.

- **Lähde:** en-Wikipedia "Rila Monastery", johdanto-osa (Bulgarian
  suurin ja kuuluisin ortodoksinen luostari, sijaitsee lounaisessa
  Rilan vuoristossa 117 km Sofiasta, Rilan-joen syvässä laaksossa
  1147 m korkeudessa, nimetty perustajansa, erakko Pyhän Ivan
  Rilalaisen (876–946) mukaan, noin 60 munkkia, perustettu
  900-luvulla, kuvattu 1999 liikkeeseen lasketun 1 levin setelin
  kääntöpuolella, 900 000 kävijää vuonna 2008).
- **Commons:** Category:Rila Monastery — tarkistettu, 17 tiedostoa,
  12 alikategoriaa. Kunnossa.

### 7. Vitoša

- **Nimi:** Vitoša. **HUOM: EI OMAA fi-Wikipedia-artikkelia** — haku
  sekä "Vitoša" että "Vitosha-vuori" ei löytänyt artikkelia.
  Suomenkielinen nimi on koostajan muodostama kirjoitusasu
  paikallisesta nimestä, ei fi-Wikipedian vahvistama. Paikallinen:
  Витоша (Vitoša), antiikin nimi Scomius/Scombrus.
- **Tyyppi:** vuori.
- **Koordinaatit:** en-Wikipedian "Vitosha"-artikkelilla EI OLE
  coordinates-tietoa lainkaan (tarkistettu myös uudelleenohjaus
  "Vitosha Nature Park" → "Vitosha", ei sielläkään koordinaatteja).
  Käytetty **Cherni Vrahin** (Vitošan korkein huippu) koordinaatteja
  korvikkeena: 42,56361°N, 23,27833°E — en-Wikipedia "Cherni Vrah"
  (coordinates-rajapinta, coprop=type: mountain). Merkitty myös
  Hylätyt/epävarmat-osioon.
- **Popup-teksti (418 merkkiä):**

  > Vitoša kohoaa aivan Sofian kupeessa ja on kaupungin tunnetuin
  > maamerkki – lähin retkeily-, kiipeily- ja hiihtokohde, jonne
  > pääsee bussilla ja hissillä keskustasta. Vuori syntyi
  > tulivuoritoiminnasta ja on muotoutunut vuosimiljoonien
  > poimutuksissa neljäksi toisiinsa liittyväksi osaksi. Sen huippu
  > Cherni Vrah ("musta huippu") kohoaa 2290 metriin. Vitošan
  > luonnonpuisto perustettiin 1934 – Balkanin ensimmäinen laatuaan.

- **Lähde:** en-Wikipedia "Vitosha", johdanto-osa (Sofian kupeessa,
  yksi Sofian symboleista, lähin retkeily-, kiipeily- ja
  hiihtokohde, bussi- ja hissiyhteydet, syntynyt tulivuoritoiminnasta
  ja graniittikerrosten poimutuksesta, 19 x 17 km, neljä pääosaa
  joiden harjut kohtaavat Cherni Vrahilla, korkein kohta 2290 m,
  yksi Vitošan 12:sta yli 2000 metrin huipusta) ja osio
  "Conservation" (luonnonpuisto perustettu 1934, kun 66 km² Vitošaa
  julistettiin puistoksi — Balkanin ensimmäinen tämäntyyppinen
  puisto; alue laajentunut myöhemmin koko vuoreksi, 266,06 km²).
- **Commons:** Category:Vitosha — tarkistettu, 175 tiedostoa,
  10 alikategoriaa. Kunnossa.

### 8. Balkanvuoret (Stara planina)

- **Nimi:** Balkanvuoret (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Стара планина (Stara planina), "Vanha vuori" —
  bulgarian- ja serbiankielinen nimi, käytössä myös kansainvälisesti.
- **Tyyppi:** vuori (vuoristo). **HUOM: koko Balkanin niemimaa on
  saanut nimensä tästä vuoristosta** — hyvä tilaisuus selittää
  pelissä nimen alkuperä.
- **Koordinaatit:** 43,25°N, 25°E — en-Wikipedia "Balkan Mountains"
  (coordinates-rajapinta, coprop=type: mountain). Karkea koko
  vuoriston keskipiste, ei täsmäpiste.
- **Popup-teksti (413 merkkiä):**

  > Balkanin niemimaa on saanut nimensä juuri tästä vuoristosta,
  > jota bulgariaksi ja serbiaksi kutsutaan Stara planinaksi,
  > "Vanhaksi vuoreksi". Se kulkee noin 560 kilometriä Serbian
  > rajalta Mustallemerelle asti ja jakaa Bulgarian pohjois- ja
  > eteläosiin. Korkein huippu on Botev-huippu (2376 m). Vuoriston
  > karstimaastossa on lukuisia luolia, joista Maguran luola tunnetaan
  > Euroopan merkittävimmistä kalliomaalauksista.

- **Lähde:** en-Wikipedia "Balkan Mountains", johdanto-osa ja osio
  "Etymology" (vuoristo alkaa Vrashka Chukan huipulta Serbian
  rajalla, kulkee n. 560 km Mustallemerelle Cape Eminelle asti,
  jakaa Bulgarian pohjois- ja eteläosiin, korkein huippu Botev
  2376 m, karstimaastossa lukuisia luolia mukaan lukien Magura —
  merkittävin ja laajin eurooppalainen jälkipaleoliittinen
  luolamaalauskohde; vuoristo antaa nimen koko Balkanin
  niemimaalle/alueelle; bulgariaksi ja serbiaksi "Stara planina",
  kirjaimellisesti "vanha vuori").
- **Commons:** "Category:Balkan Mountains" ON OLEMASSA MUTTA
  KÄYTÄNNÖSSÄ TYHJÄ (categoryinfo: 0 tiedostoa, 0 alikategoriaa).
  Oikea sisältökategoria on **Category:Stara planina** —
  tarkistettu, 1038 tiedostoa, 50 alikategoriaa. Kunnossa, mutta
  käytä TÄTÄ nimeä äläkä "Category:Balkan Mountains":ia.

### 9. Tonava (Danube)

- **Nimi:** Tonava (fi-Wikipedia, ei uudelleenohjausta). Paikallinen
  (Bulgariassa): Дунав (Dunav).
- **Tyyppi:** joki (rajajoki — kytkeytyy kohdekorostuksen
  Tonava-esimerkkiin Raamatussa).
- **Koordinaatit:** 45,2175°N, 29,76139°E — en-Wikipedia "Danube"
  (coordinates-rajapinta). **HUOM: tämä on joen suun koordinaatti
  Romanian/Ukrainan puolella, EI Bulgarian osuudella** — sopii koko
  joen nimeämiseen kartalla samaan tapaan kuin Kreikka-tiedoston
  meret, mutta jos peli tarvitsee täsmäpisteen nimenomaan Bulgarian
  kohdalle, sellainen on valittava erikseen (esim. Rusen tai Vidinin
  kohdalta).
- **Popup-teksti (372 merkkiä):**

  > Tonava on Euroopan toiseksi pisin joki Volgan jälkeen ja oli
  > aikoinaan Rooman valtakunnan raja – latinalainen nimi Danubius
  > juontuu kelttiläisestä jumalattaresta Danusta. Suomen "Tonava"
  > on peräisin saksan Donau-nimestä. Bulgarian pohjoisrajalla joki
  > erottaa maan Romaniasta lähes koko matkan, ja sen varrella
  > sijaitsevat muun muassa Vidinin, Kozloduyn ja Rusen kaupungit.

- **Lähde:** en-Wikipedia "Danube", johdanto-osa (Euroopan
  toiseksi pisin joki Volgan jälkeen, virtaa mm. Bulgarian kautta/
  rajalla, kerran Rooman valtakunnan raja) ja osio "Etymology"
  (nimi juontuu kelttiläisestä "Danu"- tai "Don"-jumalattaresta,
  joka periytyy kantaindoeurooppalaisesta *deh₂nu-sanasta; suomen
  "Tonava" todennäköisesti peräisin saksan Donau-nimestä) sekä osio
  "Cities and towns" (Vidin, Kozloduy ja Ruse listattu Bulgarian
  Tonava-kaupunkeina).
- **Commons:** Category:Danube — tarkistettu, 131 tiedostoa,
  46 alikategoriaa. Kunnossa.

### 10. Mustameri (Musta meri)

- **Nimi:** Mustameri (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen (Bulgariassa): Черно море (Cherno more).
- **Tyyppi:** meri.
- **Koordinaatit:** 44°N, 35°E — en-Wikipedia "Black Sea"
  (coordinates-rajapinta, coprop=type: waterbody). **HUOM:** karkea
  koko meren keskipiste, ei tarkka paikannuspiste — sopii kartalla
  lähinnä alueen nimeämiseen, samaan tapaan kuin Kreikka-tiedoston
  meret. Ei erityisesti Bulgarian rannikolla.
- **Popup-teksti (402 merkkiä):**

  > Antiikin kreikkalaiset kutsuivat merta ensin nimellä Pontos
  > Axeinos, "epävieraanvarainen meri", koska purjehdus oli
  > vaarallista ja rannikon heimot vihamielisiä. Kreikkalaisten
  > perustettua siirtokuntia rannoille nimi käännettiin: Euxeinos
  > Pontos, "vieraanvarainen meri". Osmanit puolestaan kutsuivat
  > merta Karadenizeksi, "mustaksi mereksi"; Bulgarian rannikolla
  > avautuu muun muassa laaja Burgasin lahti.

- **Lähde:** en-Wikipedia "Black Sea", osio "Historical names and
  etymology" (Strabon Geographica: antiikissa meri tunnettiin
  usein pelkkänä "Merenä", eteläisen Pontos-alueen asukkaat
  kutsuivat sitä "epävieraanvaraiseksi mereksi" Pontos Axeinokseksi
  vaikean purjehduksen ja vihamielisten heimojen vuoksi, nimi
  muuttui "vieraanvaraiseksi" miletoslaisten siirtokuntien
  perustamisen jälkeen; osmanikaudella meri tunnettiin nimillä
  Bahr-i Siyah tai Karadeniz, molemmat tarkoittavat "mustaa merta")
  ja osio "Geography" (Burgasin lahti listattu Bulgarian suurimpana
  lahtena).
- **Commons:** Category:Black Sea — tarkistettu, 169 tiedostoa,
  35 alikategoriaa. Kunnossa.

### 11. Ruusulaakso

- **Nimi:** Ruusulaakso. **HUOM: EI OMAA fi-Wikipedia-artikkelia**
  — haku sekä suoralla nimellä että hakusanoilla ("ruusulaakso
  Bulgaria ruusuöljy") ei löytänyt osumia. Suomenkielinen nimi on
  koostajan käännös, ei fi-Wikipedian vahvistama. Paikallinen:
  Розова долина (Rozova dolina).
- **Tyyppi:** muu (maantieteellinen alue, erikoiskohde —
  ruusuöljyteollisuus).
- **Koordinaatit:** 42,61667°N, 25,4°E — en-Wikipedia
  "Rose Valley, Bulgaria" (coordinates-rajapinta, coprop=type: city
  — todennäköisesti pisteytetty Kazanlakin kaupungin kohdalle,
  laakson tunnetuimman keskuksen mukaan).
- **Popup-teksti (426 merkkiä):**

  > Ruusulaakso jakautuu kahteen osaan, Karlovon laaksoon lännessä
  > ja Kazanlakin laaksoon idässä, Balkanvuorten eteläpuolella.
  > Aluetta on viljelty ruusuöljyn vuoksi vuosisatoja, ja se tuottaa
  > yhä lähes puolet koko maailman ruusuöljystä – keskuksena toimii
  > Kazanlakin kaupunki. Kukat poimitaan käsin touko-kesäkuussa,
  > perinteisesti naisten työnä, ja EU myönsi bulgarialaiselle
  > ruusuöljylle suojatun maantieteellisen merkinnän 2014.

- **Lähde:** en-Wikipedia "Rose Valley, Bulgaria", johdanto-osa
  (alue Balkanvuorten eteläpuolella, jakautuu Karlovon laaksoon
  lännessä ja Kazanlakin laaksoon idässä, Euroopan komissio
  hyväksyi bulgarialaisen ruusuöljyn suojatuksi maantieteelliseksi
  merkinnäksi syyskuussa 2014) ja osio "Description" (viljelty
  vuosisatoja, tuottaa lähes puolet maailman ruusuöljystä [1,7
  tonnia], keskus Kazanlakissa, poimintakausi touko-kesäkuussa,
  perinteisesti naisten työtä, kukat poimitaan käsin paju­koreihin).
- **Commons:** Category:Rose Valley, Bulgaria — tarkistettu,
  19 tiedostoa, 1 alikategoria. Kunnossa. **HUOM:** ilmeisin
  vaihtoehto "Category:Kazanlak Valley" EI ole olemassa — käytä
  täsmälleen muotoa "Category:Rose Valley, Bulgaria" (pilkku ja
  maatunnus mukana).

---

## Yhteenveto: koordinaattitaulukko

| # | Kohde | Tyyppi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|---|
| 1 | Plovdiv | kaupunki | 42,15°N 24,75°E | Plovdiv |
| 2 | Varna | kaupunki | 43,21667°N 27,91667°E | Varna, Bulgaria |
| 3 | Veliko Tarnovo | kaupunki | 43,07778°N 25,61667°E | Veliko Tarnovo |
| 4 | Rila-vuoristo | vuori | 42,1°N 23,55°E (yleispiste) | Rila |
| 5 | Musala | vuori | 42,17972°N 23,58667°E | Musala |
| 6 | Rilan luostari | muu | 42,13333°N 23,34028°E | Rila Monastery |
| 7 | Vitoša | vuori | 42,56361°N 23,27833°E (Cherni Vrah -korvike) | Vitosha / Cherni Vrah |
| 8 | Balkanvuoret | vuori | 43,25°N 25°E (yleispiste) | Balkan Mountains |
| 9 | Tonava | joki | 45,2175°N 29,76139°E (joen suu) | Danube |
| 10 | Mustameri | meri | 44°N 35°E (yleispiste) | Black Sea |
| 11 | Ruusulaakso | muu | 42,61667°N 25,4°E | Rose Valley, Bulgaria |

(Vertailuksi: Sofia EI ole oma kohde tässä listassa, samaan tapaan
kuin Ateena ei ollut Kreikka-tiedostossa — se on pelilaatta itse.
Sofian koordinaatit sivuhuomiona: 42,7°N, 23,33°E — en-Wikipedia
"Sofia".)

---

## Hylätyt / epävarmat

1. **Vitošan koordinaatit ovat korvike, ei alkuperäiskohteen omat.**
   en-Wikipedian "Vitosha"-artikkelilla ei ole coordinates-tietoa
   lainkaan (tarkistettu myös "Vitosha Nature Park" -uudelleenohjaus
   — sama tulos). Käytetty Vitošan korkeimman huipun Cherni Vrahin
   koordinaatteja korvikkeena. Kirjoitusvaiheessa kannattaa harkita,
   sopiiko tämä täsmäpiste vai halutaanko koko massiivin karkeampi
   keskipiste (esim. laskettu manuaalisesti kartalta).

2. **Kolme kohdetta ilman fi-Wikipedia-artikkelia**, siis
   suomenkieliset nimet koostajan muodostamia eikä fi-Wikipedian
   vahvistamia: Rila-vuoristo, Vitoša, Ruusulaakso. Kaikki kolme
   ovat silti vakiintuneita, ymmärrettäviä suomennoksia (ei
   kiistanalaisia käännösvalintoja) — mutta jos peli haluaa täysin
   fi-Wikipedia-vahvistetun nimistön, nämä on syytä tarkistaa
   erikseen esim. maantieteen sanakirjoista.

3. **Balkanvuorten ja Tonavan sekä Mustanmeren koordinaatit ovat
   karkeita yleispisteitä**, eivät täsmäpisteitä (sama huomio kuin
   Kreikka-tiedoston merillä) — sopivat alueen nimeämiseen kartalla,
   mutta täsmäklikkauspiste on valittava pelisuunnittelullisin
   perustein tarvittaessa. Tonavan tapauksessa koordinaatti on
   erityisen harhaanjohtava sijaintimielessä, koska se osoittaa
   joen suulle Romanian/Ukrainan rajalle, ei Bulgarian osuudelle —
   MERKITTY SELVÄSTI kohdassa 9, ei piiloteltu.

4. **"Category:Balkan Mountains" on olemassa mutta tyhjä** — oikea
   Commons-kategoria on "Category:Stara planina". Merkitty selvästi
   kohdassa 8, jotta väärää kategorianimeä ei siirry koodiin.

5. **Sofia jätettiin pois omana kohteena**, koska se on fokusmoodin
   seuraava pelilaatta itse (vrt. Ateena Kreikka-tiedostossa) — ei
   siis oma kartan sivukohde. Sofian koordinaatit on kuitenkin
   merkitty koordinaattitaulukon alle vertailuksi.

6. **Pirin-vuoristo, Rodopit ja Nesebar (Unescon
   maailmanperintökohde Mustanmeren rannalla) olisivat kaikki olleet
   mahdollisia lisäkohteita**, jos runkoa olisi laajennettu yli
   11 kohteen — Pirin ja Rodopit olisivat toistaneet Rila-vuoriston
   "korkea etelän vuoristo" -teemaa ilman selvästi erillistä uutta
   tarinaa tässä työmäärässä, ja Nesebar ei ehditty tarkistaa tässä
   erässä. EI VARMENNETTU, ei siis mukana kohteina 1–11.

7. **Ruusulaakson Commons-kategorian "1,7 tonnia" -luku** (lähes
   puolet maailman ruusuöljystä) vaikuttaa pieneltä absoluuttisena
   määränä, mutta se on Wikipedia-artikkelin oma luku ruusuöljylle
   (erittäin väkevä ja kallis eteerinen öljy, tuotetaan tonnikaupalla
   ei satoja tonneja) — ei muutettu eikä tarkistettu ristiin muista
   lähteistä, koska tehtävänanto rajasi haut en-Wikipediaan.
