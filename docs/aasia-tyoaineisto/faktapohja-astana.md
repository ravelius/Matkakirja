# Astana — faktakoostaja, uusi kaupunkilehti

Lauta-id `astana`, en-Wikipedia "Astana". Kaikki tiedot haettu
en-Wikipediasta 20.8.2026 (`action=raw`, NODE_USE_ENV_PROXY=1), ellei
toisin mainita (ks. osio 7). Malli ja mitat luettu tiedostosta
`docs/moduulit/kaupunkilehti.md` (osiot "Rakenne" ja "Mitat, jotka
pitävät") sekä rakenne-esimerkkinä `docs/arkisto/faktapohja-medina.md`.
Astanalla ei ole vielä riviä `js/packs/kulttuuri-kategoriat.js`:ssä
eikä `js/packs/saatiedot.js`:ssä — tämä on siis aidosti uusi
kaupunkilehti, ei täydennys. Litteä visa (`js/packs/asia-questions.js`,
avain `astana`) ja saapumiskortti (`js/packs/asia-saapumiset.js`) ovat
jo olemassa; niiden faktat (pääkaupunki 1997, Baikonur, aro, kylmyys)
on tarkistettu tätä koostetta vasten eivätkä ole ristiriidassa.

**KRIITTINEN HUOMIO ENNEN KÄYTTÖÄ:** en-Wikipedian "Astana"-artikkelin
alussa on tunnisteet `{{AI-generated|date=October 2025}}` ja
`{{More citations needed|date=November 2025}}` — Wikipedia-yhteisö
itse epäilee osan artikkelista olevan tekoälyn kirjoittamaa ja
puutteellisesti lähdetettyä. Ks. osio 7 kohta 1.

Sisältölinjaus huomioitu koko ajan: ei nykypolitiikkaa, ei
presidenttikulttia. Neitseellisten maiden kampanja (1954–1963) on
käsitelty vain neutraalina historiana (H3, J4) samalla periaatteella
kuin Venäjän kaupungeissa (kaupunkilehti.md, luku "Venäjän kaupungit ja
Kabul") — ei nykyisen Kazakstanin sisäpolitiikkaa, ei presidentin
persoonakulttia. Olen tietoisesti JÄTTÄNYT POIS Bajterek-tornin
kultaisen kämmenjäljen tarina (presidentin kädenjälki, "toivomus"-
rituaali) ja Ak Ordan rakennuttajan henkilökohtaisen luonnoksen
korostamisen, vaikka ne ovat Wikipediassa — ne ovat lähempänä
presidenttikulttia kuin arkkitehtuurifaktaa. Ks. myös osio 7 kohta 7
useista presidentin nimeä kantavista kohteista.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Astana"

**Johdanto (229 merkkiä):**

> Astana nousee tasaiselta arolta kuin scifi-elokuvan lavaste:
> lasipyramidi, valtava valkoinen teltta ja kultainen pallo tornin
> huipulla. Melkein koko kaupunki on rakennettu parissa
> vuosikymmenessä siitä, kun tuli pääkaupunki 1997.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Sama logiikka kuin Medinassa: Astanan
turvallisin ja rikkain aines on kaupungin historiallinen kaari — 1830
perustettu aron linnoitus, kuusi nimenvaihdosta (Guinness-ennätys),
Neuvostoliiton uudisviljelyskampanja ja lopulta pääkaupungin siirto
1997. Muut vakioaiheet eivät kanna: kuvataide/kirjallisuus/musiikki
eivät nouse lähteistä (ei kaupunkikohtaista kulttuuritietoa
Wikipediassa), luonto/tiede jäävät sivuseikoiksi, ruoka ei nouse edes
mainintana. `historia` on selvästi ainoa vakioaihe, joka kantaa koko
sivun — ja se myös erottaa uuden arkkitehtuurin (sivu `kaupunki`)
vanhasta linnoitushistoriasta (sivu `historia`) siististi kahtia.

**Johdanto (210 merkkiä):**

> Ennen lasitorneja täällä oli aron kauppareitin varrelle 1830
> perustettu Akmolyn linnoitus. Kaupunki on sittemmin vaihtanut
> nimeään kuusi kertaa – ennätys, jota mikään muu pääkaupunki
> maailmassa ei ole rikkonut.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa (uusi arkkitehtuuri ja maantiede)

**Nosto K1 — "Puu joka symboloi pääkaupunkia" (500 merkkiä)**

> Kaupungin tunnetuin maamerkki on Bajterek, 105 metriä korkea torni
> Nurjol-bulevardin varrella. Torni rakennettiin vuosina 1996–2002
> kazakstanilaisen arkkitehti Akmurza Rustembekovin suunnitelmien
> mukaan, ja sen huipulla kimmeltää 22 metriä leveä kullanvärinen
> pallo. Muoto viittaa kazakstanilaiseen taruun elämänpuusta, jonka
> oksien välissä taruolento Samruk-lintu muinoin muni kultaisen
> munansa. Näköalatasanteelta, 97 metrin korkeudesta, avautuu näkymä
> yli tasaisen aron ja uuden hallintokeskuksen.

Faktat ja lähteet:
- Bajterek, 105 m korkea torni Nurjol-bulevardilla, rakennettu
  25.10.1996–30.8.2002, arkkitehti Akmurza Rustembekov. —
  en-Wikipedia "Baiterek (monument)"
- Kultainen/kullanvärinen pallo halkaisijaltaan 22 m tornin huipulla;
  näköalatasanne 97 m korkeudessa. — en-Wikipedia "Baiterek (monument)"
- Symboliikka: elämänpuu-taru ja Samruk-lintu, joka muni kultaisen
  munan puun oksien väliin. — en-Wikipedia "Baiterek (monument)"
- **Tietoisesti pois jätetty:** presidentin kultainen kämmenjälki
  näköalatasanteella ja siihen liittyvä toivomusrituaali — ks. tämän
  tiedoston alkuhuomautus ja osio 7 kohta 7.

**Nosto K2 — "Maailman suurin teltta" (546 merkkiä)**

> Khan Shatyr on läpinäkyvä, telttamainen ostos- ja viihdekeskus,
> jonka brittiläinen arkkitehtitoimisto Foster and Partners suunnitteli
> ja joka avattiin vuonna 2010. Katto on 90 metriä korkea ja huippu
> mastoineen 150 metriä; ellipsin muotoinen pohja on 200 x 195 metriä.
> Kalvokatto päästää auringonvalon läpi, ja lämmitys- ja
> jäähdytysjärjestelmä pitää sisätilan 15–30 asteessa, vaikka ulkona
> lämpötila vaihtelee jopa -35:stä +35 asteeseen vuoden mittaan. Teltan
> alle mahtuu yli kymmenen jalkapallokentän verran puistoa, kauppoja ja
> jopa sisäranta.

Faktat ja lähteet:
- Khan Shatyr, Foster and Partners -toimiston suunnittelema
  telttamainen ostos-/viihdekeskus, avattu 5.7.2010. — en-Wikipedia
  "Khan Shatyr Entertainment Center"
- Katto 90 m, huippu mastoineen 150 m, elliptinen pohja 200 x 195 m,
  pinta-ala 140 000 m². — en-Wikipedia "Khan Shatyr Entertainment
  Center"
- ETFE-kalvokatto, sisälämpötila pidetään 15–30 °C:ssa (myyntitiloissa
  19–24 °C), vaikka ulkolämpötila vaihtelee -35…+35 °C. —
  en-Wikipedia "Khan Shatyr Entertainment Center"
- Sisällä yli 10 jalkapallokentän kokoinen puisto, kauppakeskus,
  minigolf ja sisäranta. — en-Wikipedia "Khan Shatyr Entertainment
  Center"

**Nosto K3 — "Toiseksi kylmin pääkaupunki maailmassa" (513 merkkiä)**

> Astana on maailman toiseksi kylmin pääkaupunki Ulaanbaatarin
> jälkeen – asema, joka ennen kuului Kanadan Ottawalle, kunnes
> Astanasta tuli pääkaupunki 1997. Talvet ovat pitkiä ja kuivia:
> tammikuun keskilämpötila on noin -14,5 astetta, ja alin koskaan
> mitattu lämpötila, -51,6 astetta, kirjattiin jo vuonna 1893. Kesällä
> lämpötila voi nousta 35 asteeseen. Kaupunki tunnetaan myös
> voimakkaista tuulista, jotka tuntuvat erityisesti avoimella
> Vasemmalla rannalla, missä suurin osa uudesta hallintokeskuksesta
> sijaitsee.

Faktat ja lähteet:
- Astana on maailman toiseksi kylmin pääkaupunki Ulaanbaatarin
  jälkeen; asema oli aiemmin Ottawalla ennen Astanan pääkaupunkiasemaa
  1997. — en-Wikipedia "Astana" (osio "Climate")
- Tammikuun keskilämpötila -14,5 °C; ennätysalin -51,6 °C
  (tammikuu 1893). — en-Wikipedia "Astana" (ilmastotaulukko)
- Kesälämpötilat voivat nousta 35 °C:seen. — en-Wikipedia "Astana"
- Kaupungilla "hyvin ansaittu maine" voimakkaista tuulista, korostuvat
  avoimella Vasemmalla rannalla. — en-Wikipedia "Astana" (osio
  "Climate")

**Nosto K4 — "Joki joka jakaa kaupungin kahtia" (572 merkkiä)**

> Kaupunki jakautuu Esil-joen (venäjäksi Ishim) mukaan kahtia:
> pohjoisella Oikealla rannalla ovat vanhemmat kaupunginosat,
> eteläisellä Vasemmalla rannalla nousee uusi hallintokeskus. Kun
> Kazakstanin hallitus järjesti 1998 kansainvälisen
> arkkitehtikilpailun uuden pääkaupungin suunnittelusta, voiton vei
> japanilainen Kisho Kurokawa, jonka periaatteena oli "historian ja
> tulevaisuuden symbioosi" – vanha kaupunki säilytettäisiin ja uusi
> nousisi joen eteläpuolelle. Jokea on vuodesta 1998 padottu ja
> syvennetty, jotta se pysyisi kauniina ja purjehduskelpoisena
> keskustan halki.

Faktat ja lähteet:
- Kaupunki jakautuu Esil/Ishim-joen mukaan Oikeaan (pohjoinen, vanhat
  kaupunginosat) ja Vasempaan (eteläinen, uusi hallintokeskus)
  rantaan. — en-Wikipedia "Astana" (osio "Topography") / "Ishim
  (river)"
- Huhtikuussa 1998 järjestettiin kansainvälinen arkkitehtikilpailu;
  6.10.1998 voiton vei Kisho Kurokawa periaatteenaan "historian ja
  tulevaisuuden symbioosi". — en-Wikipedia "Astana" (osio
  "Cityscape")
- Jokea on vuodesta 1998 padottu ja syvennetty tulvasuojeluun ja
  ulkonäön vuoksi; keskustassa on poljinvenevuokraus. — en-Wikipedia
  "Ishim (river)" (osio "In Astana")

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Linnoitus aron kauppareitin varrella" (545 merkkiä)**

> Kauan ennen Astanaa samalla paikalla oli Bozok, aron silkkitien
> haaran linnoitettu asutus 1200–1300-luvuilla. Nykyinen kaupunki
> syntyi kuitenkin vasta 18. kesäkuuta 1830, kun Fjodor Šubin perusti
> Esil-joen varrelle Akmolyn siirtokunnan piirikunnan keskukseksi
> Venäjän keisarikunnan rajaseudulle. Vuonna 1832 siirtokunta sai
> kaupunkioikeudet ja uuden nimen, Akmolinsk. Kenesary-kaanin johtama
> vapautusliike poltti linnoituksen vuonna 1838, mutta se rakennettiin
> pian uudelleen – ja jäi pysyväksi kauppa- ja hallintopaikaksi
> keskelle avointa aroa.

Faktat ja lähteet:
- Bozok: 1200–1300-lukujen linnoitettu asutus samalla alueella, osa
  aron silkkitien haaraa. — en-Wikipedia "Astana" (osio "History")
- Akmolyn siirtokunta perustettiin Esil-joelle 18.6.1830, perustaja
  Fjodor Šubin, piirikunnan keskukseksi. — en-Wikipedia "Astana"
  (osio "Early years (1830–1918)")
- 1832 kaupunkioikeudet ja nimi Akmolinsk. — en-Wikipedia "Astana"
- Kenesary-kaanin vapautusliikkeen aikana linnoitus poltettiin 1838,
  rakennettiin uudelleen. — en-Wikipedia "Astana"

**Nosto H2 — "Kaupunki jolla on kuusi nimeä" (553 merkkiä)**

> Harva kaupunki on vaihtanut nimeään yhtä usein kuin Astana. Aqmola
> ("valkoinen hauta") muuttui 1832 Akmolinskiksi, ja 1961 Nikita
> Hruštšov nimesi sen Tselinogradiksi, "Uudisviljelysten kaupungiksi",
> maanviljelyskampanjan kunniaksi. Itsenäistymisen jälkeen 1991
> nimeksi palasi Akmola, ja pääkaupunkistatuksen myötä 1998 se sai
> nimen Astana, "pääkaupunki". Vuonna 2019 nimi vaihtui hetkeksi
> Nur-Sultaniksi presidentin kunniaksi ja palasi Astanaksi 2022.
> Vuonna 2022 kaupunki sai Guinnessin ennätyksen useimmin
> uudelleennimetystä pääkaupungista nykyaikana.

Faktat ja lähteet:
- Aqmola ("valkoinen hauta", ei-yksimielinen tulkinta) → Akmolinsk
  1832 → Tselinograd 1961 (Hruštšov, Uudisviljelysten kampanjan
  kunniaksi) → Akmola 1991 (itsenäistyminen) → Astana 1998
  (pääkaupunki-nimitys) → Nur-Sultan 2019 → Astana 2022. —
  en-Wikipedia "Astana" (osio "Names")
- Guinness-ennätys eniten nimeään vaihtaneesta pääkaupungista
  nykyaikana, tila vuoden 2022 mukaan. — en-Wikipedia "Astana"
  (osio "Names", viittaa The Economist 1.10.2022)

**Nosto H3 — "Uudisviljelysten kaupunki" (543 merkkiä)**

> 1950-luvulla Neuvostoliitto käynnisti valtavan Uudisviljelysten
> kampanjan, jolla Pohjois-Kazakstanin aroista tehtiin uusi
> viljantuotantoalue. Kymmeniätuhansia nuoria vapaaehtoisia saapui
> junilla aroille peltoja kyntämään, ja kaupungin väkiluku ja etninen
> kokoonpano muuttuivat pysyvästi. Maaliskuussa 1961 Hruštšov ehdotti
> kaupungille kampanjan mukaista nimeä, ja Akmolinskista tuli
> Tselinograd. 1960-luvulla kaupunkiin nousi uusia kaupunginosia,
> oopperatalo ja lentokenttä – ensimmäinen suuri rakennusaalto ennen
> 1990-luvun pääkaupunkibuumia.

Faktat ja lähteet:
- Neuvostoliiton Uudisviljelysten kampanja alkoi 1953–1954, kohdisti
  Pohjois-Kazakstanin ja Länsi-Siperian aroja uudeksi
  viljantuotantoalueeksi; kesällä 1954 saapui 300 000 komsomol-
  vapaaehtoista. — en-Wikipedia "Virgin Lands campaign"
- 14.3.1961 Hruštšov ehdotti kampanjaan sopivaa nimeä; 20.3.1961
  Akmolinsk nimettiin Tselinogradiksi. — en-Wikipedia "Astana" (osio
  "Soviet era") / "Virgin Lands campaign"
- 1960-luvulla rakennettiin uusia asuinalueita, Uudisviljelysten
  palatsi, Nuorison palatsi, uusi lentokenttä ja urheilupaikkoja. —
  en-Wikipedia "Astana" (osio "Soviet era")
- 1989 Tselinogradin väestö n. 281 000, etninen jakauma tuolloin
  n. 17,7 % kazakkeja, 54,1 % venäläisiä. — en-Wikipedia "Astana"
  (osio "Demographics") — **taustatieto, ei käytetty suoraan
  nostossa muuten kuin väestön/etnisyyden yleismaininnalla**

**Nosto H4 — "Pääkaupunki siirtyy arolle" (444 merkkiä)**

> Heinäkuussa 1994 Kazakstanin ylin neuvosto päätti siirtää
> pääkaupungin. Joulukuussa 1997 hallinto muutti Almatysta pohjoiseen,
> entiseen Akmolaan, ja toukokuussa 1998 kaupunki sai uuden nimensä,
> Astana. Huhtikuussa 1998 hallitus kutsui kansainvälisiä
> arkkitehtejä kilpailemaan uuden pääkaupungin suunnittelusta, ja
> lokakuussa voiton vei japanilainen Kisho Kurokawa. Kesäkuussa 1999
> Unesco myönsi Astanalle Rauhan kaupungin -mitalin ja arvonimen.

Faktat ja lähteet:
- 6.7.1994 Kazakstanin ylin neuvosto ("Supreme Council") päätti siirtää
  pääkaupungin. — en-Wikipedia "Astana" (osio "Contemporary era")
- Pääkaupunki siirtyi Almatysta Akmolaan 10.12.1997; kaupunki
  nimettiin Astanaksi 1998. — en-Wikipedia "Astana"
- Huhtikuussa 1998 kansainvälinen arkkitehtikilpailu; 6.10.1998
  Kisho Kurokawa voitti. — en-Wikipedia "Astana" (osio "Cityscape")
- 16.7.1999 Unesco myönsi Astanalle Rauhan kaupungin -mitalin ja
  -arvonimen. — en-Wikipedia "Astana" (osio "Contemporary era")

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa Kairon `matkailijalle.artikkeli.jaksot`-mallia.
Faktat on valittu niin, etteivät ne toista osion 2 nostoja (huom.
kevyt temaattinen limittymä K3:n ja J5:n välillä on tietoisesti jätetty
— ks. osio 7 kohta 8).

**Jakso 1 — "Perille ja liikkeelle"**

Isoisän aikaan tänne ei ollut rautatietä: vuonna 1879 kenraalimajuri
Dubelt ehdotti Venäjän liikenneministeriölle rataa Tjumenistä
Akmolinskiin, mutta hanke ei silloin toteutunut. Nykyään kaupunkiin
lentää kansainvälinen lentokenttä noin 17 kilometrin päässä
keskustasta, ja Expo 2017 -maailmannäyttelyä varten rakennettu Nurly
Zholin rautatieasema palvelee jopa 12 000 matkustajaa. Kaupungin
sisällä liikutaan busseilla ja jaetuilla takseilla; yli 60 bussilinjaa
kuljettaa päivittäin yli 720 000 matkustajaa.

Faktat ja lähteet:
- 1879 kenraalimajuri Dubelt ehdotti Tjumen–Akmolinsk-rataa Venäjän
  liikenneministeriölle. — en-Wikipedia "Astana" (osio "Early years")
- Nykyinen kansainvälinen lentokenttä n. 17 km kaakkoon keskustasta. —
  en-Wikipedia "Astana" (osio "Air")
- Nurly Zhol -rautatieasema rakennettu Expo 2017:tä varten,
  kapasiteetti 12 000 matkustajaa. — en-Wikipedia "Astana" (osio
  "Railway and roads")
- Yli 60 bussilinjaa, yli 720 000 joukkoliikenteen käyttäjää
  päivässä. — en-Wikipedia "Astana" (osio "City transport")

**Jakso 2 — Alueen rakenne**

Astana sijaitsee keskisellä Kazakstanilla, tasaisella
puoliaroalueella Esil-joen varrella, 347 metrin korkeudessa
merenpinnasta. Kaupunki jakautuu neljään hallinnolliseen piiriin joen
molemmin puolin: pohjoisella Oikealla rannalla ovat vanhemmat
asuinalueet, eteläisellä Vasemmalla rannalla uusi hallintokeskus.
Lähimmät suuremmat kaupungit ovat Karaganda noin 200 kilometrin ja
Venäjän Omsk noin 450 kilometrin päässä. Kaupungin pinta-ala on noin
722 neliökilometriä.

Faktat ja lähteet:
- Sijainti keskisessä Kazakstanissa, tasainen puoliaroalue, korkeus
  347 m. — en-Wikipedia "Astana" (osio "Topography")
- Neljä hallinnollista piiriä (Almaty, Yesil, Saryarka, Baykonyr),
  jaettu joen mukaan. — en-Wikipedia "Astana" (osio "Cityscape")
- Karaganda n. 200 km, Omsk (Venäjä) n. 450 km. — en-Wikipedia
  "Astana" (osio "Geography")
- Pinta-ala 722,0 km² (osio "Topography"); **huom. infoboksissa
  ristiriitainen luku 810,2 km² — ks. osio 7 kohta 3**. —
  en-Wikipedia "Astana"

**Jakso 3 — Arjen ilmiö: joki ja äärilämpötilat**

Talvella Esil-joki jäätyy marraskuun toisesta viikosta huhtikuun
alkuun ja muuttuu suosituksi kulkureitiksi jään yli – kesällä samalla
kohdalla purjehditaan poljinveneillä, sillä jokea on vuodesta 2008
padottu ja syvennetty pysymään kauniina ympäri vuoden. Lämpötilan
äärivaihtelu näkyy myös rakentamisessa: Rauhan ja sovinnon palatsin
suunnittelijat varautuivat jopa 80 asteen lämpötilaeroon –40:stä yli
+40 asteeseen, minkä vuoksi pyramidin kolme kulmaa lepää
siltarakenteista tutuilla liikuntasaumoilla, vain yhden kulman ollessa
kiinteä.

Faktat ja lähteet:
- Esil-joki jäätyy marraskuun toisesta viikosta huhtikuun alkuun. —
  en-Wikipedia "Astana" (osio "Climate")
- Jokea padottu ja syvennetty vuodesta 2008 tulvasuojeluun ja
  ulkonäköön; kesällä poljinvenevuokraus. — en-Wikipedia
  "Ishim (river)" (osio "In Astana")
- Rauhan ja sovinnon palatsin (pyramidi) rakenteen piti kestää n. 80
  asteen lämpötilavaihtelu (-40…+40 °C); kolme kulmaa siltalaakereilla,
  yksi kiinteä. — en-Wikipedia "Palace of Peace and Reconciliation"
  (osio "Structure")

**Jakso 4 — Historian käännekohta: sillan sortuma 1959**

2. elokuuta 1959 Jesil-joen silta romahti Tselinogradissa, ja
onnettomuudessa kuoli 143 ihmistä. Ainoa paikalla ollut poliisi,
Nurmuhambet Kožahmetov, pelasti tuolloin 40 hengen henkiä. Tragedia
sijoittuu keskelle kaupungin nopeaa 1950–60-lukujen kasvua, kun
Uudisviljelysten kampanja toi tänne kymmeniä tuhansia uusia asukkaita
ja uusia kortteleita nousi kiireellä joen molemmin puolin.

Faktat ja lähteet:
- 2.8.1959 Yesil-Bridgen ("Akmola tragedy") sortuma, 143 kuollutta;
  ainoa paikalla ollut poliisi Nurmuhambet Kožahmetov pelasti 40
  ihmistä. — en-Wikipedia "Astana" (osio "Soviet era", viittaa
  wikilinkkiin "Akmola tragedy" — **artikkelia ei avattu erikseen,
  tieto on pääartikkelin tekstistä, ks. osio 7 kohta 6**)
- Konteksti: 1950–60-lukujen nopea kaupunkikasvu Uudisviljelysten
  kampanjan seurauksena. — en-Wikipedia "Astana" / "Virgin Lands
  campaign"

**Jakso 5 — Milloin kannattaa tulla**

Sateet painottuvat kesäkuukausille: heinäkuussa sataa Wikipedian
ilmastotaulukon mukaan noin 56 millimetriä, tammikuussa vain noin 18
millimetriä lumena. Aurinkoisimmat kuukaudet ovat kesä-heinäkuu,
pimeimmät marras-tammikuu. Paras matkustusaika riippuu siis siitä,
haluaako nähdä aron vihreänä kesällä vai kokea kaupungin toiseksi
kylmimpänä pääkaupunkina talvella.

Faktat ja lähteet:
- Heinäkuun sademäärä 55,8 mm, tammikuun 17,8 mm (talvella lumena). —
  en-Wikipedia "Astana" (ilmastotaulukko, osio "Climate")
- Auringonpaistetunnit kuukausittain: kesä-heinäkuu n. 336 h/kk,
  marras-joulukuu n. 94–100 h/kk. — en-Wikipedia "Astana"
  (ilmastotaulukko)
- **Nämä luvut ovat suoraan Wikipedian ilmastotaulukosta (lähdeviite
  pogodaiklimat.ru, jakso 1991–2020, auringonpaiste NOAA/DWD
  1961–1990) — EIVÄT pelin omasta `hae-saanormaalit.mjs`-työkalusta
  (Open-Meteo/ERA5). Ks. osio 5 ja osio 7 kohta 2.**

---

## 4. Yhdeksän kohdekartan kohdetta (+ keskipiste)

Kaikki koordinaatit en-Wikipedian infoboksista, haettu 20.8.2026.
Etäisyydet keskustasta ovat OMIA LASKELMIANI koordinaattieroista
(pallogeometria yksinkertaistettuna: asteet × 111 km, pituusasteille
kerrottu cos(51,13°) ≈ 0,627), eivät Wikipedian tekstiä — ks. osio 7
kohta 4. Kansallismuseota (National Museum of the Republic of
Kazakhstan) EI ole taulukossa, koska sen Wikipedia-artikkeli käyttää
`{{infobox museum/wikidata}}` -mallinetta eikä raakatekstissä ollut
koordinaatteja — ks. osio 7 kohta 5.

| # | Nimi suomeksi | Koordinaatit | Lähdeartikkeli | Etäisyys/suunta keskustasta (oma laskelma) |
|---|---|---|---|---|
| 1 | Astana, kaupungin keskipiste (infoboksin koordinaatti) | 51°08′N 71°26′E | "Astana" | (keskipiste) |
| 2 | Bajterek-torni | 51°07′42″N 71°25′50″E | "Baiterek (monument)" | ~0,6 km SW |
| 3 | Nurjol-bulevardi (keskikohta) | 51°07′37,95″N 71°26′13,01″E | "Nurjol Boulevard" | ~0,7 km S |
| 4 | Akorda (presidentin työpaikka) | 51°07′33″N 71°26′47″E | "Akorda" | ~1,2 km SE |
| 5 | Astana Opera | 51°08′08″N 71°24′39,3″E | "Astana Opera" | ~1,6 km W |
| 6 | Khan Shatyr -ostoskeskus | 51°07′56″N 71°24′14″E | "Khan Shatyr Entertainment Center" | ~2,1 km W |
| 7 | Rauhan ja sovinnon palatsi (pyramidi) | 51°07′23″N 71°27′49″E | "Palace of Peace and Reconciliation" | ~2,4 km SE |
| 8 | Hazrat Sultan -moskeija | 51,1250°N 71,4722°E | "Hazrat Sultan Mosque" | ~2,9 km E |
| 9 | Nur Alem (Expo 2017 -pallorakennus) | 51°05′28,5″N 71°24′46,1″E | "Expo 2017" | ~4,9 km SW |
| 10 | Suuri moskeija (nyk. Nursultan-moskeija) | 51,0730°N 71,4105°E | "Astana Grand Mosque" (uudelleenohjaa artikkeliin "Nursultan Mosque") | ~6,9 km S |

**Rajausehdotus — kolme löyhää klusteria, ei yhtä tiivistä
neliötä.** Kohteet eivät mahdu Medinan tapaiseen 2–4 km:n neliöön
vaan muodostavat kolme erillistä ryppäätä (sama ongelma kuin Medinan
Uhud-vuori, mutta kolminkertaisena):

- **A) Hallintoydin** (kohteet 1–3, 5–6): Bajterek, Nurjol-bulevardi,
  Astana Opera, Khan Shatyr — kaikki 0,6–2,1 km keskipisteestä,
  mahtuvat siististi n. 3 km × 2 km alueelle.
- **B) Itsenäisyysaukion alue** (kohteet 4, 7–8): Akorda, Rauhan ja
  sovinnon palatsi, Hazrat Sultan -moskeija — 1,2–2,9 km
  keskipisteestä, kaakkoon/itään päin omana ryppäänään.
- **C) Expo-alue** (kohteet 9–10): Nur Alem ja Suuri moskeija —
  4,9–6,9 km keskipisteestä etelään/lounaaseen, selvästi oma
  kaupunginosansa (rakennettu 2017 maailmannäyttelyä varten).

**Suositukseni:** käytä kohdekartassa klustereita A+B (kohteet 1–8,
mahtuvat n. 4 km × 3 km alueelle) ja jätä Expo-alue (9–10) pois tai
tee siitä oma erillinen kartta/linkki, samaan tapaan kuin Medinan
Uhud-vuori jätettiin tiiviin rajauksen ulkopuolelle. Kirjoittaja voi
myös valita laajemman rajauksen, jos Expo-alueen arkkitehtuuri
(Nur Alem, Suuri moskeija) halutaan mukaan yhtenä isona karttana.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 51,1333°N, 71,4333°E (51°08′N 71°26′E).
  — en-Wikipedia "Astana" (infoboksi)
- **Korkeus merenpinnasta:** 347 m. — en-Wikipedia "Astana"
- **Köppen-luokitus:** Dfb (lauhkea mantereinen ilmasto, kylmä
  talvi). — en-Wikipedia "Astana" (osio "Climate")
- **Vuoden keskilämpötila:** 3,9 °C. — en-Wikipedia "Astana"

**Kuukausiluvut (Wikipedian ilmastotaulukko, 1991–2020, ääriarvot
1881–nykyhetki; lähde Pogoda.ru.net / pogodaiklimat.ru, auringonpaiste
NOAA 1961–1990 ja DWD):**

| Kuukausi | Keskilämpö °C | Ylin keskim. °C | Alin keskim. °C | Ennätysalin °C | Sademäärä mm |
|---|---|---|---|---|---|
| Tammi | -14,5 | -10,3 | -18,7 | -51,6 | 17,8 |
| Helmi | -13,6 | -8,8 | -18,0 | -48,9 | 16,7 |
| Maalis | -6,0 | -1,5 | -10,4 | -37,2 | 20,0 |
| Huhti | 6,5 | 12,2 | 1,2 | -27,8 | 21,7 |
| Touko | 14,5 | 20,9 | 8,2 | -10,8 | 33,4 |
| Kesä | 19,6 | 25,8 | 13,4 | -1,5 | 40,0 |
| Heinä | 20,6 | 26,6 | 14,9 | 2,3 | 55,8 |
| Elo | 19,1 | 25,5 | 13,0 | -2,2 | 31,3 |
| Syys | 12,6 | 18,9 | 6,8 | -8,2 | 20,8 |
| Loka | 5,0 | 10,4 | 0,5 | -25,3 | 26,0 |
| Marras | -5,2 | -1,3 | -8,7 | -39,2 | 29,0 |
| Joulu | -12,0 | -8,0 | -16,0 | -43,5 | 24,8 |
| **Vuosi** | **3,9** | **9,2** | **-1,2** | **-51,6** | **337,3** |

**TÄRKEÄ VAROITUS:** yllä oleva taulukko on suoraan en-Wikipedian
`{{Weather box}}`-mallineesta, EI pelin omasta
`tools/hae-saanormaalit.mjs`-työkalusta (Open-Meteo/ERA5, 1991–2020),
jota muut lehtikaupungit käyttävät `js/packs/saatiedot.js`:n
kuukausinormaaleina. Luvut ovat todennäköisesti samaa suuruusluokkaa
(sama jakso, sama kaupunki), mutta ERA5-arvot pitää silti hakea
erikseen ennen kuin `saatiedot.js`-riviä kirjoitetaan, koska
lähdeaineisto ja laskentatapa eroavat toisistaan — sääntö koskee
kaikkia lehtikaupunkeja, ei vain Astanaa.

- **Sanallinen vuodenkierto (varovainen, ei-numeerinen kuvaus):**
  Astana on aron kaupunki keskisessä Kazakstanissa, ja sen ilmasto on
  äärimmäisen mannermainen: pitkä, kuiva ja hyvin kylmä talvi
  (Astana on maailman toiseksi kylmin pääkaupunki) ja lyhyt, lämmin
  kesä. Suurin osa sateesta tulee kesäkuukausina, ja avoin, tasainen
  maasto tekee tuulista voimakkaita erityisesti kaupungin uudemmalla
  Vasemmalla rannalla. Tarkka kuukausikohtainen luonnehdinta kannattaa
  kirjoittaa vasta ERA5-lukujen pohjalta, jotta väitteet nousevat
  samasta lähteestä kuin muidenkin lehtikaupunkien `luonnehdinta`-kentät.

---

## 6. Kuva-aiheet (sanoin, ei tiedostonimiä)

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa.** Tämä
korostuu erityisesti moskeija- ja Itsenäisyysaukio-kuvissa (Hazrat
Sultan -moskeija, Rauhan ja sovinnon palatsi) sekä Expo-alueella,
joissa Commons-kuvissa on usein suuria ihmisjoukkoja tai valtiovierailu-
tilanteita (esim. Akorda-artikkelin galleriakuva presidentistä ja
Intian pääministeristä kunniavartion tarkastuksessa — EI käytettävä).

**Avauskuvat (3):**
1. Kaupungin yleisnäkymä, jossa Bajterek-torni ja Khan Shatyrin
   telttamuoto erottuvat siluetteina auringonlaskussa tai -nousussa —
   ei ihmisiä lähikuvassa.
2. Tasainen aro kaupungin laidalla, ruohomeri horisonttiin asti —
   symboloi isoisän matkapäiväkirjan "ratsastaja näkyy tuntia ennen
   saapumista" -kuvaa.
3. Talvinen katunäkymä lumisena ja huurteisena — symboloi kaupungin
   asemaa maailman toiseksi kylmimpänä pääkaupunkina.

**Kansikuvat (3):**
1. Vasemman rannan hallintokeskuksen laaja panoraama (Bajterek,
   Nurjol-bulevardi, hallintorakennukset) päivänvalossa.
2. Aro-/preeriamaisema ilman rakennuksia, puuton ja tasainen, kuvaa
   kaupunkia ympäröivä maasto ennen 1990-lukua.
3. Jäätynyt Esil-joki talvella, mahdollisesti ihmisiä käyttämässä sitä
   kulkureittinä kaukaa kuvattuna (ei tunnistettavia kasvoja).

**Nosto-/jaksokuvat (8):**
1. Bajterek-torni kokonaisuudessaan, mieluiten iltavalossa.
2. Khan Shatyrin telttarakennus ulkoa, koko muoto näkyvissä.
3. Rauhan ja sovinnon palatsin pyramidimuoto ulkoa.
4. Historiallinen kartta tai piirros 1800-luvun Akmolinskista, jos
   Commonsista löytyy — **epävarma, ks. osio 7 kohta 9**.
5. Esil-joki kesällä (veneily/ranta) TAI talvella jäätyneenä —
   kahtena eri kuvana kesän ja talven ääripäille.
6. Nur Alem, Expo 2017:n pallorakennus, ulkoa kuvattuna.
7. Aron laajuutta korostava maisemakuva (puuton tasanko, taivas
   hallitsee kuva-alaa) — Uudisviljelysten jakson (H3/J4) kuvitukseksi.
8. Akorda tai Rauhan ja sovinnon palatsi kaukaa, ilman ihmisiä tai
   valtiovierailutilannetta — arkkitehtuuri etualalla.

---

## 7. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

1. **En-Wikipedian "Astana"-pääartikkeli kantaa itse
   `{{AI-generated|date=October 2025}}`- ja
   `{{More citations needed|date=November 2025}}`-tunnisteita.**
   Tämä on poikkeuksellista — Medinan tai muiden aiemmin koostettujen
   kaupunkien artikkeleissa ei ollut vastaavaa. Wikipedia-yhteisö itse
   epäilee, että osa artikkelista on tekoälyn kirjoittamaa ja
   puutteellisesti lähdetettyä. Olen silti käyttänyt artikkelia
   lähteenä (tehtävänannon mukaisesti), mutta suosittelen VAHVASTI
   ristiintarkistamaan erityisesti tuoreimmat/tarkimmat luvut (esim.
   väkiluku 1 622 245, GDP-luvut, LRT-tiedot) ennen julkaisua toisesta
   lähteestä. Vanhemmat, hyvin lähdetetyt kohdat (nimihistoria,
   rakennusten infoboksit, ilmastotaulukko) vaikuttavat luotettavilta,
   koska niillä on omat viitteensä.

2. **Säätaulukko (osio 5) on Wikipedian omasta `{{Weather box}}`-
   mallineesta, ei pelin ERA5-putkesta.** Ks. osio 5 varoitus. Tämä
   eroaa Medinan tapauksesta, jossa ilmasto-osio ei avautunut
   lainkaan — Astanan kohdalla luvut LÖYTYIVÄT, mutta niitä ei pidä
   käyttää suoraan `saatiedot.js`:ään ilman `hae-saanormaalit.mjs`-
   ajoa, koska lähde ja laskentatapa (pogodaiklimat.ru vs.
   Open-Meteo/ERA5) ovat eri.

3. **Pinta-alaristiriita samassa artikkelissa.** Infoboksi antaa
   `area_total_km2 = 810.2`, mutta leipäteksti (osio "Topography")
   sanoo "The city encompasses 722.0 sqkm". En ole ratkaissut
   ristiriitaa — käytin jaksossa 2 tekstin lukua (722 km²), koska se on
   tarkempi ja kontekstoitu, mutta kirjoittajan kannattaa tarkistaa
   kumpi on ajantasaisempi ennen julkaisua.

4. **Kohdekartan etäisyydet (osio 4) ovat omia laskelmiani**
   koordinaattieroista (yksinkertaistettu pallogeometria: asteet ×
   111 km, pituusasteille kerrottu vielä cos(51,13°) ≈ 0,627), en
   Wikipedian tekstiä. Ne kannattaa tarkistaa oikealla
   karttatyökalulla ennen rajauksen lyömistä lukkoon, aivan kuten
   Medinan koosteessa.

5. **Kansallismuseon koordinaatit puuttuvat.** "National Museum of the
   Republic of Kazakhstan" -artikkeli käyttää mallinetta
   `{{infobox museum/wikidata}}`, joka hakee koordinaatit Wikidatasta
   renderöintihetkellä eikä sisällä niitä raakatekstissä. En hakenut
   Wikidataa erikseen (tehtävänanto rajasi lähteeksi en-Wikipedian
   raakatekstin), joten museo puuttuu kohdekartan taulukosta
   kokonaan. Jos museo halutaan mukaan, koordinaatit pitää hakea
   erikseen (esim. Wikidata-kyselyllä tai visuaalisesti kartalta).

6. **"Akmola tragedy" (sillan sortuma 1959, jakso 4) on pääartikkelin
   sisäinen wikilinkki, jota en avannut erikseen.** Kaikki jaksossa 4
   käytetyt yksityiskohdat (143 kuollutta, poliisi Nurmuhambet
   Kožahmetov, 40 pelastettua) ovat suoraan "Astana"-pääartikkelin
   leipätekstistä, en erillisestä "Akmola tragedy" -artikkelista, jota
   ei haettu. Jos erillinen artikkeli sisältää tarkempia tai
   ristiriitaisia yksityiskohtia, niitä ei ole tässä huomioitu.

7. **Useat kohteet kantavat presidentin nimeä tai häneen liittyvää
   historiaa — sisältölinjauksen kannalta herkkä alue.** En-Wikipedia
   mainitsee mm. että Bajterek-tornin näköalatasanteella on presidentin
   kultainen kämmenjälki, että Ak Ordan muotoilu perustui presidentin
   omaan luonnokseen, että Suuri moskeija nimettiin heinäkuussa 2026
   presidentin mukaan "Nursultan-moskeijaksi", ja että lentokentän
   virallinen nimi sisältää presidentin nimen. Olen TIETOISESTI
   jättänyt nämä yksityiskohdat pois nostoista ja jaksoista (ks. tämän
   tiedoston alkuhuomautus) ja käyttänyt kohdekartassa (osio 4)
   neutraaleja kuvauksia ("Akorda (presidentin työpaikka)", "Suuri
   moskeija") virallisten nimien sijaan silloin kun se oli luontevaa.
   Suosittelen, että kirjoittaja harkitsee tarkkaan, missä määrin
   virallisia, presidentin nimeä kantavia paikannimiä käytetään
   lopullisessa lehdessä — tämä on juuri se harmaa alue, jota
   "ei presidenttikulttia" -linjaus koskee, eikä sitä voi ratkaista
   pelkällä faktantarkistuksella.

8. **K3-noston ja Jakso 5:n välillä on kevyt temaattinen limittymä**
   (molemmat käsittelevät ilmastoa/kylmyyttä), mutta olen varmistanut,
   etteivät ne toista samoja YKSITTÄISIÄ lukuja: K3 käyttää
   tammikuun keskiarvoa ja ennätysalinta, Jakso 5 käyttää sademäärä-
   ja auringonpaistelukuja. "Toiseksi kylmin pääkaupunki" -väite
   mainitaan molemmissa yleisluontoisena kontekstina, mikä on sama
   ratkaisu kuin Medinan koosteessa hyväksyttiin toistuvien teemojen
   kohdalla (ei sama sanamuoto, ei sama yksittäinen fakta).

9. **Historiallisen Akmolinskin kuvamateriaali on epävarmaa.**
   En hakenut Commonsia tai muita kuvapankkeja tässä koosteessa
   (tehtävänanto rajasi kuva-aiheet sanallisiksi ehdotuksiksi), mutta
   1800-luvun Akmolinskista on todennäköisesti niukasti vapaasti
   lisensoitua kuvamateriaalia verrattuna esim. Medinan Hidžaz-rata-
   aineistoon. Nosto-/jaksokuva 4 (osio 6) on siksi merkitty
   epävarmaksi jo tässä vaiheessa.

10. **Ei-Wikipedia-hakuja ei käytetty lainkaan tässä koosteessa.**
    Kaikki artikkelinimet (Baiterek (monument), Khan Shatyr
    Entertainment Center, Palace of Peace and Reconciliation, Akorda,
    Astana Grand Mosque → Nursultan Mosque, Nurjol Boulevard, Hazrat
    Sultan Mosque, Astana Opera, National Museum of the Republic of
    Kazakhstan, Ishim (river), Virgin Lands campaign, Expo 2017)
    löytyivät suoraan pääartikkelin sisäisistä wikilinkeistä, ja
    jokainen haettiin ja tarkistettiin suoraan en.wikipedia.orgista.
    Ulkoisia linkkejä (esim. qazaqlens.org-selittäjäartikkeli, joka
    näkyy "Astana"-artikkelin External links -osiossa) EI ole
    käytetty lähteenä.

11. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi merkkimäärävaatimusten mukaan** (nostot 444–572,
    johdannot 210–229) ja tarkistettu koneellisesti Node-skriptillä
    merkkimäärien osalta — tarkat luvut on merkitty jokaisen noston
    otsikkoon.
