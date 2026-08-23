# Havanna — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `havanna`, en-Wikipedia "Havana". Kaikki
tiedot haettu en-Wikipediasta 23.8.2026 (action=raw, MediaWikin
coordinates-rajapinta vastasi ajoittain 429:llä "You are making too many
requests" — uusintayritys 3–90 s kasvavalla viiveellä korjasi jokaisen
haun). Malli ja mitat luettu tiedostoista `docs/aasia-tyoaineisto/
lehtityo-resepti.md` ja `docs/moduulit/kaupunkilehti.md` sekä esimerkkinä
`docs/mantereet-tyoaineisto/faktapohja-vancouver.md`. Kaupungin visa on
tarkistettu tiedostosta `js/packs/northamerica-questions.js` (kohta
`havanna`, viisi kysymystä: Kuuba pääkaupunkina, 1950-luvun amerikanautot,
Malecón rantabulevardina, kuubalainen son/salsa-musiikki, satamaa
vartioivat linnoitukset) — ks. osio 7 kohta 1 siitä, miten tämän
faktapohjan nostot väistävät suorat visavastaukset.

Sisältölinjaus (Raamattu, pilari 3 ja omistajan ohje 20.8.2026 —
docs/mantereet-tyoaineisto/spec-mantereet.md): Havanna kuuluu Venäjän
kaupunkien ja Kabulin kanssa samaan ryhmään, jolle EI tehdä uutisosiota
(valtiollinen media, ei riippumatonta korvaavaa lähdettä) — muuten lehti
tehdään normaalisti. Nykypolitiikka ja -sota jätetään kokonaan pois;
historia kerrotaan neutraalisti ilman osapuolikehystä. Orjuus (laillista
Kuubassa vuoteen 1886 asti, ks. osio 7 kohta 8) ja köyhyys/rappio eivät
ole tämän faktapohjan nostoissa — jälkimmäisestä ks. kuvasääntöjen erityis-
huomautus osiossa 6. Painotus on 1873-henkisessä aineistossa: kaupungin
muurit purettiin 1863, rautatie (Latinalaisen Amerikan ensimmäinen) avattiin
1837, ja isoisän matka-aikana Havanna oli jo neljä vuosisataa vanha,
vahvasti linnoitettu satamakaupunki — ei vielä kuitenkaan itsenäinen
(Espanjan valta päättyi vasta 1898, ks. osio 7 kohta 2).

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Havanna"

**Johdanto (233 merkkiä):**

> Kuuban pääkaupunki syntyi 1519 kapean satamansuun rannalle. Merirosvot
> tekivät siitä ryöstöjen kohteen, mutta Espanjan aarrelaivastoille se oli
> Uuden maailman portti, jota suojaamaan nousi Amerikan tiheimpiin kuuluva
> linnoitusrengas.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Vakioaihe `historia` (AIHE_IKONIT). Havannan
aineisto kantaa helposti oman sivunsa kronologisena jatkumona kaupunki-
sivun perustamistarinalle: merirosvojen hyökkäyksistä 1700-luvun
kukoistukseen, brittimiehitykseen 1762–63 ja lopulta Espanjan vallan
loppuun 1898.

**Johdanto (230 merkkiä):**

> Havannan 1500-luvulla alkanut historia on vuorotellen merirosvojen,
> kuninkaiden ja armeijoiden kirjoittamaa: kaupunki poltettiin, linnoitettiin,
> vallattiin ja lopulta menetettiin Espanjalta. Jokainen käänne näkyy yhä
> kadunkuvassa.

### Sivu C — teemasivu, ehdotettu id `linnoitukset`, nimi "Linnoitukset"

**Perustelu valinnalle:** Ei vakioaihe (AIHE_IKONIT-listalla ei ole
sopivaa valmista aihetta), mutta perusteltu poikkeus samaan tapaan kuin
Vancouverin `alkuperaiskansat`: Unesco kirjasi Vanhan Havannan maailman-
perintöluetteloon nimenomaan nimellä "Old Havana **and its Fortification
System**" (ks. osio 6, kuva-aiheet) — linnoitukset eivät ole vain
`historia`-sivun taustatapahtuma vaan kaupungin identiteetin ydin: ne
seisovat yhä satamansuulla, ne toistuvat kaupungin vaakunassa, ja visan
viides kysymys nostaa ne suoraan esiin. Aineisto (neljä eri linnaa,
vaakunan symboliikka, Unesco-status) on riittävän vahva ja erillinen
`historia`-sivusta kantamaan oman sivunsa.

**Johdanto (187 merkkiä):**

> Havannan vanhakaupunki sai Unescolta maailmanperintöaseman nimenomaan
> linnoitusjärjestelmänsä ansiosta. Kolme linnaa vartioi yhä satamansuuta,
> ja neljäs seisoo vaakunassa niiden muistona.

---

## 2. Kaksitoista nostoehdotusta (4 + 4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto HAV1 — "Kaupunki joka löysi paikkansa kolmannella yrityksellä" (507 merkkiä)**

> Diego Velázquez perusti Havannan alun perin 1514 Kuuban etelärannikolle,
> Mayabeque-joen suulle – paikka osoittautui liian matalaksi ja soiseksi
> asutukselle. Vuoteen 1519 mennessä espanjalaiset olivat kokeilleet myös
> Almendares-joen suuta pohjoisrannikolla, mutta lopulta kaupunki siirtyi
> nykyiselle paikalleen kapean, hyvin suojatun Puerto de Carenasin
> rannalle – juuri sataman laatu ratkaisi sijainnin. Pánfilo de Narváez
> antoi kuudenneksi Kuubaan perustetulle kaupungille nimen San Cristóbal
> de la Habana.

Faktat ja lähteet:
- Diego Velázquez perusti Havannan 1514 Kuuban etelärannikolle, 69 km
  nykyisestä sijainnista etelään, Mayabeque-joen (silloisen Onicajinal/
  Mayabeque-joen) suulle; asutus epäonnistui matalan ja soisen maaston
  vuoksi. — en-Wikipedia "Havana" (16th century, Beginnings)
- 1514–1519 espanjalaiset perustivat ensimmäiset siirtokunnat Kuuban
  pohjoisrannikolle, mm. La Chorreran Almendares-joen suulle (myöhemmin
  Vedado/Miramar); kaupunki siirtyi lopulta nykyiselle paikalleen Puerto
  de Carenasin rannalle 1519 sataman laadun ansiosta. — en-Wikipedia
  "Havana" (16th century, Beginnings)
- Pánfilo de Narváez antoi Havannalle — kuudenneksi Kuubaan perustetulle
  kaupungille — nimen San Cristóbal de la Habana; San Cristóbal on
  Havannan suojeluspyhimys. — en-Wikipedia "Havana" (16th century,
  Beginnings)

**Nosto HAV2 — "Portti Uuteen maailmaan" (505 merkkiä)**

> Espanjan kuningas Filip II myönsi Havannalle kaupungin arvonimen 20.
> joulukuuta 1592, ja Espanjan kruunu nimitti sen myöhemmin viralliseksi
> "Uuden maailman avaimeksi ja Länsi-Intian muuriksi". Nimitys ei ollut
> liioittelua: kaikkialta Uudesta maailmasta tulevat laivat kokoontuivat
> ensin Havannan lahdelle, josta Espanjan laivasto vei lastin edelleen
> Espanjaan. Tuhannet lahdella odottaneet alukset tarvitsivat ruokaa,
> vettä ja muita matkatarvikkeita, mikä ruokki kaupungin maataloutta ja
> käsiteollisuutta.

Faktat ja lähteet:
- Kuningas Filip II myönsi Havannalle kaupungin arvonimen 20.12.1592;
  myöhemmin Espanjan kruunu nimesi sen virallisesti "Key to the New World
  and Rampart of the West Indies" ("Uuden maailman avain ja Länsi-Intian
  muuri"). — en-Wikipedia "Havana" (16th century, Attacks)
- Kaikkialta Uudesta maailmasta tulevat laivat kokosivat lastinsa
  Havannaan ennen laivaston (fleet) matkaa Espanjaan; lahdella odottaneet
  tuhannet alukset tarvitsivat ruokaa, vettä ja muita matkatarvikkeita,
  mikä ruokki kaupungin maataloutta ja käsiteollisuutta. — en-Wikipedia
  "Havana" (16th century, Attacks)

**Nosto HAV3 — "Muurit jotka murrettiin kasvun tieltä" (546 merkkiä)**

> Havannan puolustusmuurin rakentaminen alkoi 1674 osana Espanjan
> linnoitusohjelmaa, ja Historia-artikkelin mukaan se valmistui 1740
> mennessä (Arkkitehtuuri-artikkeli antaa myöhemmän vuoden, ks. osio 7).
> Muuri oli kuitenkin käynyt kaupungille ahtaaksi jo ennen kuin sitä
> ehdittiin edes kutsua valmiiksi, ja vuonna 1863 se purettiin kokonaan
> Havannan laajenemisen tieltä. Muurin paikalle jäänyt leveä maakaistale
> täyttyi pian uusilla rakennuksilla ja synnytti uuden kaupunginosan,
> Centro Habanan – yksi sen ensimmäisistä rakennuksista nousi jo 1875.

Faktat ja lähteet:
- Havannan kaupunginmuurin rakentaminen alkoi 1674 osana linnoitus-
  ohjelmaa; Historia-osion mukaan se valmistui 1740 mennessä. —
  en-Wikipedia "Havana" (17th century)
- 1863 kaupunginmuurit purettiin, jotta Havanna pääsi laajenemaan. —
  en-Wikipedia "Havana" (19th century)
- Muurin paikalle jäänyt leveä maakaistale ("Reparto de las Murallas")
  täyttyi uusilla rakennuksilla ja synnytti Centro Habanan kaupungin-
  osan; yksi alueen rakennuksista (arkkitehti Eugenio Rayneri y
  Sorrentino) valmistui jo 1875. — en-Wikipedia "Havana" (Architecture,
  Neoclassical)

**Nosto HAV4 — "Rautatie joka teki Kuubasta edelläkävijän" (559 merkkiä)**

> Havannan ja Bejucalin välille valmistui 19. marraskuuta 1837 Kuuban ja
> samalla koko Latinalaisen Amerikan ensimmäinen höyryrautatie – sinä
> päivänä Espanjalla itsellään ei ollut vielä yhtään rautatietä. Rata
> kuljetti sokeria Güinesin viljelyalueelta satamaan vietäväksi (Havannan
> artikkeli antaa radan pituudeksi 51 km, rautatieyhtiön oma artikkeli
> 27,5 km + myöhemmän 17 km:n jatkeen Güinesiin 1839, ks. osio 7).
> Kuubasta tuli maailman seitsemäs rautatiemaa. Isoisän matka-aikaan 1873
> rautatie oli jo neljä vuosikymmentä vanha, vakiintunut osa Havannan
> arkea.

Faktat ja lähteet:
- Havannan ja Bejucalin välinen 51 km:n rautatie valmistui 1837
  kuljettamaan sokeria Güinesin laaksosta satamaan; Kuubasta tuli
  maailman seitsemäs ja Latinalaisen Amerikan/espanjankielisen maailman
  ensimmäinen rautatiemaa. — en-Wikipedia "Havana" (19th century)
- Kuuban rautatiehistoria alkoi virallisesti 12.10.1834 Espanjan
  kuningatar-regentin luvalla; Compañía de Caminos de Hierro de la
  Habana avasi 27,5 km:n Havanna–Bejucal-linjan 19.11.1837, Latinalaisen
  Amerikan ensimmäisen höyryrautatien — sinä päivänä Espanjalla itsellään
  ei ollut yhtään rautatietä. Linjaa jatkettiin 17 km Güinesiin
  19.11.1839. — en-Wikipedia "National Railway Company of Cuba" (History)
- **RISTIRIITA:** "Havana"-artikkeli antaa radan pituudeksi 51 km,
  "National Railway Company of Cuba" -artikkeli 27,5 km (+ 17 km:n
  jatke Güinesiin 1839, yhteensä 44,5 km) — ks. osio 7 kohta 4.

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Merirosvot jotka pakottivat rakentamaan linnoituksia" (474 merkkiä)**

> Havanna kärsi säännöllisistä merirosvojen ja ranskalaisten kaappareiden
> hyökkäyksistä jo kauppasatamansa alkuvuosina. Ranskalainen kaapparikapteeni
> Jacques de Sores ryösti ja poltti kaupungin 1555 – ensimmäinen tällainen
> isku. Toistuvat hyökkäykset saivat Espanjan kruunun rahoittamaan
> ensimmäiset linnoitukset suuriin kaupunkeihin: paitsi merirosvoja
> vastaan, myös hillitäkseen Sevillan Casa de Contratación -kauppahuoneen
> kauppamonopolin synnyttämää laajaa salakuljetusta.

Faktat ja lähteet:
- Havanna kärsi säännöllisistä merirosvojen, aavemerimiesten
  (buccaneer) ja ranskalaisten kaappareiden hyökkäyksistä kauppasatamana
  toimimisensa alkuvuosina; ranskalainen kaapparikapteeni Jacques de
  Sores ryösti ja poltti kaupungin ensimmäisenä 1555. — en-Wikipedia
  "Havana" (16th century, Attacks)
- Toistuvat hyökkäykset saivat Espanjan kruunun rahoittamaan ensimmäiset
  linnoitukset suuriin kaupunkeihin sekä merirosvoja vastaan että
  hillitäkseen Sevillan Casa de Contratación -kauppahuoneen kauppa-
  rajoitusten synnyttämää laajaa salakuljetusta (contrabando). —
  en-Wikipedia "Havana" (16th century, Attacks)

**Nosto H2 — "Kolmanneksi suurin kaupunki Amerikassa" (579 merkkiä)**

> 1700-luvun puolivälissä Havannassa asui yli 70 000 ihmistä, mikä teki
> siitä koko Amerikan mantereen kolmanneksi suurimman kaupungin – Liman
> ja Meksikon kaupungin jälkeen, mutta Bostonia ja New Yorkia
> suurempana. Havanna oli tuolloin myös Espanjan Länsi-Intian tärkein
> satama, jossa laivat huollettiin ennen jatkomatkaa. Vuoteen 1740
> mennessä siitä oli tullut Espanjan suurin ja vilkkain telakka-alue ja
> Uuden maailman ainoa kuivatelakka, ja 1700-luvun kuluessa Havannan
> telakalla rakennettiin lähes 50 prosenttia enemmän linjalaivoja kuin
> yhdelläkään toisella Espanjan telakalla.

Faktat ja lähteet:
- 1700-luvun puolivälissä Havannassa oli yli 70 000 asukasta, mikä teki
  siitä Amerikan mantereen kolmanneksi suurimman kaupungin Liman ja
  Meksikon kaupungin jälkeen, Bostonia ja New Yorkia suurempana. —
  en-Wikipedia "Havana" (18th century), lähdeviite Hugh Thomas: Cuba, A
  pursuit of freedom
- Havanna oli Espanjan Länsi-Intian tärkein satama, jossa laivat
  huollettiin ennen jatkomatkaa; vuoteen 1740 mennessä siitä oli tullut
  Espanjan suurin ja vilkkain telakka ja Uuden maailman ainoa
  kuivatelakka. — en-Wikipedia "Havana" (18th century)
- Havannan telakalla rakennettiin 1700-luvulla lähes 50 % enemmän
  linjalaivoja (Ships of the Line) kuin yhdelläkään muulla Espanjan
  telakalla. — en-Wikipedia "Havana" (18th century), lähdeviite Harbron:
  Trafalgar and the Spanish navy

**Nosto H3 — "Britit valtasivat Havannan – ja Espanja sai sen takaisin Floridalla" (532 merkkiä)**

> Brittiläinen laivasto – yli 50 alusta ja yli 11 000 laivaston ja
> armeijan miestä – nousi maihin Havannan itäpuolelle 6. kesäkuuta 1762
> ja valtasi kaupungin piirityksellä. Miehityksen aikana britit avasivat
> Havannan kaupalle Pohjois-Amerikan ja Karibian siirtokuntiensa kanssa,
> mikä mullisti Kuuban taloutta hetkessä. Alle vuotta myöhemmin, 1763
> solmitussa Pariisin rauhassa, Espanja sai Havannan takaisin – vastineeksi
> se luovutti Floridan briteille. Havannasta tehtiin sen jälkeen Amerikan
> mantereen vahvimmin linnoitettu kaupunki.

Faktat ja lähteet:
- Havannan piiritys alkoi 6.6.1762 aamunkoitteessa, kun yli 50 aluksen ja
  yli 11 000 Kuninkaallisen laivaston ja armeijan miehen brittijoukko
  nousi maihin Havannan itäpuolelle. — en-Wikipedia "Havana" (18th
  century, Seven Years' War)
- Piirityksen jälkeen britit avasivat Havannan kaupalle Pohjois-Amerikan
  ja Karibian siirtokuntiensa kanssa, mikä mullisti Kuuban yhteiskuntaa
  nopeasti; 1763 solmittu Pariisin rauha luovutti Espanjan Floridan
  briteille vastineeksi Havannan palautuksesta. — en-Wikipedia "Havana"
  (18th century, Seven Years' War)
- Havannan takaisin saatuaan Espanja teki siitä Amerikan mantereen
  vahvimmin linnoitetun kaupungin. — en-Wikipedia "Havana" (18th
  century, Seven Years' War)

**Nosto H4 — "USS Mainen tuho ja Espanjan vallan loppu" (490 merkkiä)**

> Yhdysvaltain taistelulaiva USS Mainen räjähdys ja uppoaminen Havannan
> satamassa vuonna 1898 oli Espanjan ja Yhdysvaltain välisen sodan
> välitön laukaiseva syy. Kuubassa sota oli huipennus jo kolme vuotta
> aiemmin, 1895, alkaneelle itsenäisyyssodalle Espanjaa vastaan. Espanja
> luopui virallisesti Kuuban ylivallasta 12. elokuuta 1898, ja sen neljä
> vuosisataa kestänyt läsnäolo Amerikan mantereella päättyi. Kuubasta
> tuli itsenäinen tasavalta ja Havannasta sen pääkaupunki kuitenkin
> vasta 1902.

Faktat ja lähteet:
- USS Mainen uppoaminen Havannan satamassa oli Espanjan ja Yhdysvaltain
  välisen sodan välitön laukaiseva syy; Kuubassa sota oli huipennus jo
  kolme vuotta käynnissä olleelle itsenäisyyssodalle Espanjaa vastaan
  (sota alkoi siis 1895). 12.8.1898 Espanja luopui Kuuban ylivallasta,
  ja sen läsnäolo Amerikan mantereella päättyi. — en-Wikipedia "Havana"
  (19th century, Cuban independence)
- Havannasta tuli itsenäisen Kuuban tasavallan pääkaupunki 1902; kaupunki
  isännöi maan ensimmäisen presidentin Tomás Estrada Palman
  virkaanastujaisia. — en-Wikipedia "Havana" (Administration, Republic
  of Cuba 1901–1959)

### Teemasivu `linnoitukset` — 4 nostoa

**Nosto L1 — "Vaakunan kolme linnaa" (473 merkkiä)**

> Havannan vaakunassa on kolme linnaa: Real Fuerzan, Morron ja Puntan
> linnoitukset, jotka kaikki puolustivat kaupunkia sen espanjalaisaikana
> – samat kolme linnaa, jotka seisovat yhä satamansuulla tänäänkin.
> Avain vaakunan keskellä kertoo, että Havanna oli Uuden maailman
> portti. Kilpeä kannattelevat toisella puolella tammenoksa, joka
> symboloi voimaa, ja toisella laakeriseppele, joka symboloi kunniaa ja
> mainetta – yhdessä symbolien on selitetty edustavan ihmisen oikeuksia.

Faktat ja lähteet:
- Havannan vaakuna koostuu kolmesta linnasta, jotka edustavat kaupunkia
  puolustaneita kolmea linnoitusta: Real Fuerzan, Morron ja Puntan
  linnoja. Avain kuvastaa Havannaa Uuden maailman porttina. Kilpeä
  kannattelevat tammenoksa (voima) ja laakeriseppele (kunnia ja
  maine); symbolien on selitetty edustavan ihmisen oikeuksia. —
  en-Wikipedia "Havana" (Culture, Symbols)

**Nosto L2 — "Morro vartioi satamansuuta" (526 merkkiä)**

> El Morron linna nousi Havannan sataman itäiselle rannalle vuosina
> 1589–1630 suojaamaan satamansuuta merirosvojen uhalta, ja sen
> suunnitteli italialainen sotilasinsinööri Battista Antonelli, joka
> rakensi tuohon aikaan Espanjan kruunulle linnoituksia laajasti
> Karibialla. Linna sijaitsee kalliorinteellä lahden suulla, ja sen
> luona espanjalaiset laivastot valmistautuivat ennen paluumatkaa
> Espanjaan. Linnan valo opastaa yhä laivoja satamaan, ja sen
> muureilta avautuu näkymä koko Havannan lahdelle ja vanhankaupungin
> siluetille.

Faktat ja lähteet:
- Castillo del Morro (Castillo de los Tres Reyes Magos del Morro)
  vartioi Havannan sataman suuaukkoa; se rakennettiin merirosvouhan
  vuoksi. — en-Wikipedia "Havana" (Landmarks and historical centers)
- Varhaisin linnoitusarkkitehtuuri näkyy mm. Castillo del Morrossa
  (1589–1630); Arkkitehtuuri-osio yhdistää Battista Antonellin
  nimen samaan kappaleeseen 1500–1600-luvun linnoitusten kanssa
  (ks. osio 7 kohta 4, sama kappale sisältää ristiriitaisen
  vuosiluvun La Cabañalle). — en-Wikipedia "Havana" (Culture,
  Architecture, Spanish)
- Linna sijaitsee kalliorinteellä lahden suulla; sieltä avautuu näkymä
  itäiselle Havannan lahdelle. — en-Wikipedia "Havana" (Geography,
  Location)

**Nosto L3 — "La Cabaña – tappion jälkeen rakennettu jättiläinen" (540 merkkiä)**

> Kun Espanja sai Havannan takaisin briteiltä 1763, se päätti ettei
> kaupunki koskaan enää kaatuisi yhtä helposti. Lahden itärannalle
> alettiin rakentaa San Carlos de la Cabañan linnoitusta, josta tuli
> Uuden maailman kolmanneksi suurin espanjalainen linnoitus – suurempia
> olivat vain Castillo San Cristóbal ja Castillo San Felipe del Morro,
> molemmat San Juanissa Puerto Ricossa. Espanjan ajan linnoituksista La
> Cabañaa pidetään vaikuttavimpana, ja erityisesti sen 1700-luvun
> lopulla valmistuneet muurit tekevät siitä yhä komean näyn lahden yli.

Faktat ja lähteet:
- Espanja alkoi Havannan takaisin saatuaan (1763) rakentaa San Carlos de
  la Cabañan linnoitusta lahden itärannalle; siitä tuli Uuden maailman
  kolmanneksi suurin espanjalainen linnoitus Castillo San Cristóbalin ja
  Castillo San Felipe del Morron (molemmat San Juanissa, Puerto Ricossa)
  jälkeen. — en-Wikipedia "Havana" (18th century, Seven Years' War)
- La Cabañaa pidetään Espanjan ajan vaikuttavimpana linnoituksena,
  erityisesti 1700-luvun lopulla valmistuneiden muuriensa ansiosta. —
  en-Wikipedia "Havana" (Landmarks and historical centers)

**Nosto L4 — "Vanhakaupunki maailmanperintönä" (497 merkkiä)**

> Unesco lisäsi Vanhan Havannan ja sen linnoitusjärjestelmän maailman-
> perintöluetteloon 1982 ainutlaatuisen barokki- ja uusklassisen
> arkkitehtuurinsa, linnoitustensa ja Uuden maailman reitin pysäkkinä
> toimineen historiansa vuoksi. Vuotta myöhemmin käynnistyi laaja
> pelastusohjelma, joka on sittemmin korjannut satoja rakennuksia
> alkuperäiseen asuunsa. Ohjelmaa johti vuosikymmenten ajan
> kaupunginhistorioitsija Eusebio Leal, josta tuli restauroinnin
> ansiosta Vanhan Havannan epävirallinen pormestari.

Faktat ja lähteet:
- Unesco lisäsi "Old Havana and its Fortification System" -kohteen
  maailmanperintöluetteloon 1982 (6. istunto, kohdenumero 204)
  ainutlaatuisen barokki- ja uusklassisen arkkitehtuurin, linnoitusten
  ja Uuden maailman reitin pysäkkinä toimineen historian vuoksi. —
  en-Wikipedia "Old Havana" (infobox; leipäteksti)
- Vuotta myöhemmin (1983) käynnistyi pelastusohjelma rakennusten
  alkuperäisen luonteen palauttamiseksi. Kaupunginhistorioitsijan
  virastoa johtanut Eusebio Leal onnistui muuttamaan Vanhan Havannan
  matkailukohteeksi, ja hänestä tuli tunnustetusti alueen epävirallinen
  pormestari. — en-Wikipedia "Old Havana" (leipäteksti)
- Havanna perustettiin espanjalaisten toimesta 16.11.1519 luonnonsatamaan
  Havannan lahdella. — en-Wikipedia "Old Havana" (leipäteksti);
  vahvistaa El Templeten (kohdekartan kohde 2) perustamispäivämäärän

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Faktat on valittu niin, etteivät ne toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

Nykyään Havannaan saavutaan yleensä José Martín kansainvälisen
lentokentän kautta, joka sijaitsee noin 11 kilometriä keskustasta
etelään Boyerosin kaupunginosassa. Kuuban valtionrautatiet FFCC
yhdistävät Havannan kaikkiin maakuntiin, ja vuonna 2004 junilla
matkusti noin 11 miljoonaa ihmistä vuodessa – kysyntä on tutkimusten
mukaan ollut jopa kaksi ja puoli kertaa tätä suurempi.

Faktat ja lähteet:
- José Martín kansainvälinen lentokenttä sijaitsee n. 11 km keskustasta
  etelään Boyerosin kunnassa; se on Kuuban pääkansallislentoyhtiö
  Cubana de Aviaciónin tukikohta ja maan pääasiallinen kansainvälinen ja
  kotimainen portti. — en-Wikipedia "Havana" (Transport, Airports)
- FFCC (Ferrocarriles de Cuba) yhdistää Havannan kaikkiin Kuuban
  maakuntiin; vuonna 2004 vuotuinen matkustajamäärä oli n. 11 miljoonaa,
  mutta kysynnän on arvioitu olleen 2,5–3 kertaa suurempi. —
  en-Wikipedia "Havana" (Transport, Rail)

**Jakso 2 — Kolme kaupunkia yhdessä**

Nykyinen Havanna on käytännössä kolme kaupunkia yhdessä. Vanhakaupunki
kapeine katuineen ja parvekkeineen on edelleen kaupan ja viihteen sydän.
Lännempänä Vedado kilpailee sen kanssa yökerhoista ja liike-elämästä, ja
niiden välissä El Capitolion kupoli merkitsee työläiskaupunginosa
Centro Habanan alkua.

Faktat ja lähteet:
- Nykyinen Havanna voidaan kuvata kolmena kaupunkina yhdessä: Vanha
  Havanna, Vedado ja uudemmat esikaupunkialueet. Vanha Havanna kapeine
  katuineen ja ulkonevine parvekkeineen on kaupan, teollisuuden ja
  viihteen keskus sekä asuinalue. — en-Wikipedia "Havana" (Culture,
  Cityscape)
- Vedadosta on tullut Vanhan Havannan kilpailija kaupallisessa
  toiminnassa ja yöelämässä; El Capitolio-rakennus merkitsee Vedadon ja
  Vanhan Havannan välissä sijaitsevan työläiskaupunginosan Centro
  Habanan alkua. — en-Wikipedia "Havana" (Culture, Cityscape)

**Jakso 3 — El Capitolion kupoli**

El Capitolio valmistui 1929 senaatin ja edustajainhuoneen
istuntosaliksi, ja sen kupoli hallitsee yhä kaupungin siluettia.
Rakennuksen sisällä seisoo maailman kolmanneksi suurin sisätiloihin
sijoitettu patsas, Tasavallan patsas. Nykyään rakennuksessa toimivat
Kuuban tiedeakatemia ja maan suurimman luonnontieteellisen kokoelman
omaava museo.

Faktat ja lähteet:
- El Capitolio Nacional valmistui 1929 senaatin ja edustajainhuoneen
  käyttöön; jättimäinen rakennus tunnetaan kupolistaan, joka hallitsee
  kaupungin siluettia. Sisällä seisoo maailman kolmanneksi suurin
  sisätiloihin sijoitettu patsas, "La Estatua de la República". —
  en-Wikipedia "Havana" (Landmarks and historical centers)
- Nykyään rakennuksessa toimivat Kuuban tiedeakatemian päämaja ja
  Museo Nacional de Historia Natural, jonka luonnontieteellinen
  kokoelma on maan suurin. — en-Wikipedia "Havana" (Landmarks and
  historical centers)

**Jakso 4 — Historian käännekohta: Vanhankaupungin pelastus**

1980-luvulla käynnistyi vanhankaupungin 35-vuotinen, miljoonia dollareita
maksanut kunnostushanke, jonka tarkoitus oli antaa kuubalaisille
mahdollisuus nähdä oma menneisyytensä ja houkutella matkailijoita.
Kaupunginhistorioitsija Eusebio Leal Spenglerin johdolla suuret osat
Vanhaa Havannaa – Plaza Vieja, Plaza de la Catedral, Plaza de San
Francisco ja Plaza de Armas – on sittemmin kunnostettu lähes valmiiksi.

Faktat ja lähteet:
- 1980-luvulla käynnistyi Vanhan Havannan (mm. Plaza de Armas) 35-vuotinen,
  miljoonien dollarien kunnostushanke, jonka tavoitteena oli antaa
  kuubalaisille mahdollisuus arvostaa omaa menneisyyttään ja houkutella
  matkailua; hankkeen taustalla oli mm. kaupunginhistorioitsija Eusebio
  Leal Spengler. — en-Wikipedia "Havana" (Culture, Architecture,
  Cityscape)
- Suurin osa pääaukioista (Plaza Vieja, Plaza de la Catedral, Plaza de
  San Francisco, Plaza de Armas) ja tärkeimmistä matkailukaduista
  (Obispo, Mercaderes) on lähes valmiiksi kunnostettu. — en-Wikipedia
  "Havana" (Culture, Architecture, Cityscape)

**Jakso 5 — Milloin kannattaa tulla**

Havannan ilmasto on trooppinen savanni-ilmasto (Köppen: Aw), joka
rajautuu lähes sademetsäilmastoon. Keskilämpötila vaihtelee tammikuun 22
asteesta elokuun 28 asteeseen, eikä lämpötila juuri koskaan laske alle
10 asteen. Sadetta tulee eniten kesä- ja lokakuussa ja vähiten
joulu–huhtikuussa, vuosittain keskimäärin noin 1200 millimetriä.
Hirmumyrskyt osuvat tavallisesti saaren etelärannikolle, ja Havanna on
säästynyt niiltä muuta maata paremmin.

Faktat ja lähteet: ks. osio 5 (Säätiedot) — samat luvut, samat lähteet.

---

## 4. Yhdeksän kohdekartan kohdetta (+ keskipiste = 10 riviä)

Koordinaatit haettu en-Wikipedian MediaWiki-rajapinnasta
(`action=query&prop=coordinates`, redirects=1) 23.8.2026 — rajapinta
vastasi ensimmäisillä yrityksillä "You are making too many requests"
(429), ja uusintayritys 90 s viiveellä korjasi haun kokonaan; kahdelle
kohteelle (Havana Cathedral, Castillo de la Real Fuerza) rajapinta ei
palauttanut koordinaatteja lainkaan (artikkeleissa ei ole
infobox-koordinaatteja) — ne on jätetty pois kartasta. Etäisyydet ovat
OMIA LASKELMIANI koordinaattieroista (asteet × 111 km, pituusasteille
kerrottu cos(23,14°) ≈ 0,9195), tarkistettu Node-skriptillä. Keskipisteeksi
on valittu "Havana"-artikkelin oma infobox-koordinaatti, joka osuu
lähelle El Capitolioa/Parque Centralia — ei geometrista keskipistettä
vaan Wikipedian oma valinta (ks. osio 7 kohta 5).

| # | Nimi suomeksi | Koordinaatit (desimaali) | Lähdeartikkeli | Etäisyys/suunta keskustasta (oma laskelma) |
|---|---|---|---|---|
| 1 | Havanna, kaupungin keskipiste (Wikipedian infobox-piste) | 23,1367°N 82,3589°W | "Havana" | (keskipiste) |
| 2 | El Templete (perustamispaikka, 1519) | 23,1405°N 82,3490°W | "El Templete" | ~1,1 km koilliseen |
| 3 | Castillo del Morro | 23,1505°N 82,3567°W | "Castillo de los Tres Reyes Del Morro" | ~1,6 km pohjoiseen |
| 4 | La Cabaña (linnoitus) | 23,1472°N 82,3500°W | "La Cabaña" | ~1,5 km koilliseen |
| 5 | Castillo San Salvador de la Punta | 23,1463°N 82,3577°W | "Castillo San Salvador de la Punta" | ~1,1 km pohjoiseen |
| 6 | Malecón (rantabulevardin piste) | 23,1417°N 82,3681°W | "Malecón, Havana" | ~1,1 km luoteeseen |
| 7 | El Capitolio Nacional | 23,1353°N 82,3594°W | "National Capitol of Cuba" | ~0,2 km etelään |
| 8 | Plaza Vieja | 23,1361°N 82,3501°W | "Plaza Vieja, Havana" | ~0,9 km itään |
| 9 | Colón-hautausmaa | 23,1231°N 82,3986°W | "Colon Cemetery, Havana" | ~4,3 km länteen |
| 10 | Hotel Nacional de Cuba | 23,1431°N 82,3806°W | "Hotel Nacional de Cuba" | ~2,3 km länteen |

**Rajausehdotus:** Kahdeksan ensimmäistä kohdetta (Templete, Morro,
Cabaña, Punta, Malecón, Capitolio, Plaza Vieja mukaan lukien keskipiste)
mahtuvat n. 2 km × 2 km alueeseen Vanhan Havannan ja satamansuun
ympärillä — poikkeuksellisen tiivis kartta. Colón-hautausmaa ja Hotel
Nacional (Vedado) ovat 2–4,5 km länteen; ne kannattaa näyttää joko
omalla zoomaustasollaan tai hyväksyä hieman Vancouvero-mallia väljempi
rajaus, koska molemmat ovat matkaoppaan (jakso 2 ja 4) ja L4-noston
kannalta olennaisia eivätkä siksi ole hyviä pudotettavia.

---

## 5. Säätiedot

- **Keskustan koordinaatit:** 23,1367°N, 82,3589°W (sama piste kuin
  kohdekartan rivi 1). — en-Wikipedia "Havana"
- **Köppen-luokka:** Aw (trooppinen savanni-ilmasto), rajautuen lähes
  sademetsäilmastoon (Af) ja trooppiseen monsuuni-ilmastoon (Am). —
  en-Wikipedia "Havana" (Climate)
- **Lämpötila:** keskiarvo vaihtelee tammikuun/helmikuun 22 °C:sta
  elokuun 28 °C:een; lämpötila laskee harvoin alle 10 °C:n. —
  en-Wikipedia "Havana" (Climate)
- **Sademäärä:** keskimäärin n. 1200 mm/vuosi, sateisimmat kuukaudet
  kesäkuu ja lokakuu, kuivin jakso joulukuusta huhtikuuhun. —
  en-Wikipedia "Havana" (Climate)
- **Ennätykset (1991–2020 normaalit, ennätykset 1859–nykyhetki, Casa
  Blanca -asema):** korkein mitattu vuosiennätys 39,6 °C (lokakuu);
  vuoden keskiarvo (mean) 25,2 °C; alin vuosiennätys 6,0 °C
  (tammikuu). — en-Wikipedia "Havana" (Climate, Weather box)
- **Hirmumyrskyt:** osuvat tavallisesti saaren etelärannikolle, ja
  Havannan vahingot ovat olleet muuta maata pienempiä; lähimpänä
  hirmumyrsky-voimakkuudella kulki Ian 2022. — en-Wikipedia "Havana"
  (Climate)
- **EPÄVARMA/HUOM — tornado 2019:** 28.1.2019 Havannaa kohtasi
  poikkeuksellisen harvinainen EF4-tornado. Artikkelin kaksi kohtaa
  antavat eri uhriluvut: History-osio sanoo 8 kuollutta ja yli 190
  loukkaantunutta, Climate-osio sanoo aluksi 4 kuollutta ja 195
  loukkaantunutta, tarkennettuna 4.2.2019 mennessä 6 kuolleeseen. Tätä
  ei ole käytetty säärivillä eikä nostoissa — liian tuore ja sisäisesti
  ristiriitainen tapahtuma tähän faktapohjaan (ks. myös osio 7 kohta 6).
- **HUOM:** samoin kuin muissa mantereet-erän kaupungeissa, yllä olevat
  luvut ovat en-Wikipedian Climate-osiosta EIVÄTKÄ ole sama asia kuin
  pelin `saatiedot.js`-riville tarvittava ERA5 1991–2020 -normaali.
  Tarkat kuukausinormaalit haetaan kirjoitusvaiheessa
  `tools/hae-saanormaalit.mjs`-työkalulla.

---

## 6. Kuva-aiheet ja Commons-kategoriavinkit

**Erityishuomio (Ei köyhyyden estetisointia -linjaus):** Havanna on yksi
maailman valokuvatuimmista "rapistuneen kauniin" kaupungeista, ja
Commonsissa on runsaasti kuvia sortuneista julkisivuista ja rappeutuneista
kortteleista (ks. en-Wikipedian "Poverty and slums" -osio, EI käytetty
tässä faktapohjassa sisältölinjauksen vuoksi). Kuvavalinnassa vältetään
kuvia, joiden pääsanoma on rappio tai köyhyys itsessään — arkkitehtuuria,
katuelämää ja linnoituksia saa toki kuvata sellaisina kuin ne ovat,
mutta kuvakulma ei saa tehdä köyhyydestä tai rapistumisesta kuvan
pointtia. 1950-luvun amerikanautot (visan aihe) ovat kaduilla lähes
kaikkialla — jos niitä käytetään kuvissa, valitaan kuva jossa ne ovat
sivuroolissa eivätkä ainoa aihe, jottei toisteta visan vastausta kuvateksti
mukaan lukien.

**Avauskuvat (3), ehdotus:**
1. Vanhankaupungin kapea katu parvekkeineen ja pylväineen (Habana Vieja).
2. El Morron linna kalliolla, meri ja taivas taustalla.
3. El Capitolion kupoli Havannan siluetissa.

**Kansikuvat (3), ehdotus:**
1. Havannan lahden suu ja linnoitusketju (Morro/Punta) merenrannalta.
2. Malecón laajana yleiskuvana auringonlaskun aikaan.
3. Vanhankaupungin kattonäkymä tai aukio (esim. Plaza Vieja) laajana
   yleiskuvana.

**Commons-kategoriat kuvahakuun (ei hakusanoja, kategorioiden sisältö
pitää silti aina tarkistaa silmin lisenssisääntöjen mukaisesti):**
- `Category:Old Havana` — vanhankaupungin yleiskuvasto
- `Category:Castillo de los Tres Reyes del Morro` — El Morron linna
- `Category:La Cabaña (fortress)` — La Cabañan linnoitus (HUOM:
  tarkista tarkka kategorianimi kirjoitushetkellä — Commonsin
  nimeämiskäytäntö linnoitukselle vaihteli hakuhetkellä lähteiden
  välillä)
- `Category:Castillo San Salvador de la Punta` — Puntan linnoitus
- `Category:Coat of arms of Havana` — vaakuna (L1-nosto)
- `Category:Malecón, Havana` — rantabulevardi
- `Category:National Capitol of Cuba` — El Capitolio
- `Category:Plaza Vieja` ja `Category:Plaza de Armas, Havana` —
  vanhankaupungin aukiot
- `Category:El Templete` — perustamispaikka
- `Category:History of Havana` — yleinen historiallinen aineisto, laaja
  yläkategoria; hyvä lähde 1800-luvun litografioille ja vanhoille
  kartoille (isoisän ajan tunnelmaan)
- `Category:Havana Harbor` — satama ja laivaliikenne, nykyinen ja
  historiallinen

**Nosto-/jaksokuvat, aihe-ehdotuksia (ei tiedostonimiä):**
1. Historiallinen litografia tai kaiverrus Havannan satamasta 1800-luvulta
   (esim. "Havana Harbor entrance in 1841 by Bibliographisches Institut"
   -tyylinen kuva, ks. en-Wikipedia "Havana" 19th century -osion kuva).
2. La Cabañan tai El Morron muurit läheltä kuvattuna, kivirakenteen
   yksityiskohta näkyvissä.
3. El Capitolion sisätila (kupoli tai Tasavallan patsas).
4. Vanhankaupungin restauroitu aukio (Plaza Vieja tai Plaza de la
   Catedral) nykyaikaisena, ihmisiä mukana mutta ei yksilöityjä kasvoja
   lähikuvassa.
5. Rautatieaiheinen historiallinen kuva (juna-asema tai vanha veturi) —
   HAV4-noston tueksi; ei löytynyt vielä varmennettua Commons-kategoriaa
   tässä faktapohjassa, tarkistettava kirjoitusvaiheessa.
6. Havannan lahti kokonaisuudessaan ilmakuvana tai korkealta otettuna
   (linnoitusten sijainti suhteessa vanhaankaupunkiin näkyy hyvin).

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Kaikki viisi nostoa liikkuvat lähellä visan aiheita, mutta eivät
   anna vastausta suoraan.** Visa kysyy (a) Kuubasta pääkaupunkina, (b)
   1950-luvun amerikanautoista, (c) Malecónista rantabulevardina, (d)
   son/salsa-musiikista, (e) linnoituksista sataman vartijoina. (a) on
   perustieto, jota mikään kaupunkilehti ei voi välttää (sama tilanne
   oli Vancouverin Kanada-kysymyksellä) — se mainitaan johdannossa
   kuten mikä tahansa maan nimi. (b) amerikanautoista EI ole yhtään
   nostoa eikä jaksoa tässä faktapohjassa — en löytänyt aiheelle
   erillistä en-Wikipedia-artikkelia ("Cars in Cuba" ei ole olemassa),
   joten se on jätetty kokonaan käsittelemättä (ks. myös osio 6). (c)
   Malecón esiintyy vain kohdekartan rivinä ilman selittävää tekstiä —
   yhdessäkään nostossa tai jaksossa ei sanota suoraan "Malecón on
   rantabulevardi". (d) son/salsa-musiikkia ei ole käsitelty
   yhdessäkään nostossa tai jaksossa lainkaan — jos kirjoittaja haluaa
   käsitellä sitä, aihe on tarkistamatta tässä faktapohjassa. (e)
   `linnoitukset`-teemasivu käsittelee juuri satamaa vartioivia
   linnoituksia, mutta jokainen nosto käyttää tarkkoja nimiä,
   vuosilukuja ja rakentajien nimiä (Real Fuerza/Morro/Punta yhdessä
   vaakunassa, Morron rakennusvuodet ja arkkitehti, La Cabañan synty
   tappion jälkeen, Unesco-status) sen sijaan että toistaisi visan
   ympäripyöreän "linnoituksia"-vastauksen sellaisenaan — sama
   strategia kuin Vancouverin VC4-nostossa satamalle.
2. **Havanna ei ollut vuonna 1873 itsenäinen eikä osa itsenäistä
   Kuubaa** — Espanjan valta jatkui vuoteen 1898 asti, ja Kuuban
   tasavalta (Havanna pääkaupunkina) syntyi vasta 1902 (H4-nosto).
   Isoisän matka-aikana 1873 kaupunki oli siis yhä Espanjan siirtomaan
   pääkaupunki, jonka muurit oli juuri (1863) purettu ja jonka
   rautatie (1837) oli jo vakiintunut osa arkea — hyvä tarinallinen
   kiinnekohta, joka on kerrottu suoraan HAV3- ja HAV4-nostoissa sekä
   H4:ssä, jottei pelaaja luule Havannan olleen isoisän aikaan jo
   itsenäisen Kuuban pääkaupunki.
3. **Kaupunginmuurin valmistumisvuosi ristiriitainen Havana-artikkelin
   sisällä.** Historia-osio (17th century) sanoo muurin valmistuneen
   1740 mennessä; Arkkitehtuuri-osio sanoo muurin "jo ylittäneen
   rajansa, kun se valmistui 1767". HAV3-nosto käyttää Historia-osion
   lukua (1740) päätekstinä ja mainitsee ristiriidan suoraan lohko-
   kommentissa nostotekstin sisällä — molemmat osiot ovat samaa
   artikkelia, eikä kumpaakaan voi pitää selvästi tarkempana ilman
   kolmatta lähdettä.
4. **Rautatien pituus ristiriitainen kahden artikkelin välillä.**
   "Havana"-artikkeli antaa Havanna–Bejucal-radan pituudeksi 51 km;
   "National Railway Company of Cuba" -artikkeli antaa 27,5 km (+
   myöhemmän 17 km:n jatkeen Güinesiin 1839, yhteensä 44,5 km, ei
   täsmälleen 51 km). HAV4-nosto mainitsee molemmat luvut ja pitää ne
   erillään; tarkempi lähde (esim. Kuuban rautatiemuseo tai
   akateeminen historia Zanetti & García: "Sugar and Railroads: A
   Cuban History, 1837–1959") kannattaisi hakea, jos kirjoittaja
   tarvitsee yhden täsmällisen luvun.
5. **"Havana"-artikkelin infobox-koordinaatti (23,1367°N 82,3589°W) ei
   ole kaupungin maantieteellinen keskipiste** vaan osuu lähelle El
   Capitoliota/Parque Centralia (Havannan alue on 728 km², ulottuen
   paljon laajemmalle). Käytetty silti kohdekartan ankkuripisteenä
   samaan tapaan kuin Vancouverin mallissa käytettiin "Vancouver"-
   artikkelin omaa pistettä.
6. **Coordinates-rajapinta vastasi ajoittain 429:llä** ("You are making
   too many requests") — ensimmäiset yritykset epäonnistuivat lyhyillä
   (1,5–8 s) viiveillä, ja vasta 90 sekunnin viive korjasi haun.
   Kahdelle kohteelle (Havana Cathedral, Castillo de la Real Fuerza)
   rajapinta ei koskaan palauttanut koordinaatteja — artikkeleissa ei
   ole infobox-koordinaatteja lainkaan, ei kyse hakuvirheestä. Nämä on
   jätetty kokonaan kohdekartan ulkopuolelle sen sijaan että
   arvattaisiin koordinaatit.
7. **2019 tornado -tapahtuman uhriluvut ovat sisäisesti ristiriitaiset**
   Havana-artikkelin kahden eri osion (History vs. Climate) välillä —
   ks. osio 5. Tapahtuma on myös liian tuore ja yksityiskohtainen
   ("Nykypolitiikka jätetään pois" -linjauksen henkeen sopimaton
   luonnononnettomuusuutinen) tähän faktapohjaan, joten sitä ei ole
   käytetty missään nostossa.
8. **Orjuus mainittu vain sivuhuomautuksena, ei nostona.** En-Wikipedian
   "Havana" (19th century) -osio kertoo orjuuden olleen laillista
   Kuubassa vuoteen 1886 asti, ja mainitsee "Knights of the Golden
   Circle" -järjestön 1800-luvun puolivälin suunnitelman, jossa Havanna
   olisi ollut orjuuden sallivan "Golden Circlen" keskus, sekä
   Yhdysvaltain sisällissodan (1861–65) hävinneiden etelävaltioiden
   entisten orjanomistajien (mm. Judah P. Benjamin, John C.
   Breckinridge) pakenemisen Havannaan 1865–1868. Aihe olisi
   sisällöllisesti käsiteltävissä toteavasti (Raamatun ja tämän
   toimeksiannon linjauksen mukaan, ilman julmuuksien yksityiskohtia),
   mutta sitä EI ole nostettu omaksi nostokseen tässä faktapohjassa —
   12 nostopaikkaa täyttyivät muulla, suoremmin 1873-teemaan ja
   linnoitus/rautatie-painotukseen osuvalla aineistolla. Jos
   kirjoittaja haluaa käsitellä aihetta, se on olemassa mutta
   tarkistamatta yksityiskohtaisemmin tätä faktapohjaa varten.
9. **1950-luvun amerikanautot (visan kysymys 2) eivät esiinny lainkaan
   tässä faktapohjassa.** En löytänyt aiheelle omaa, tarkistettavaa
   en-Wikipedia-artikkelia (haku "Cars in Cuba" palautti virhesivun).
   Jos kirjoittaja haluaa käsitellä aihetta esim. matkaoppaassa, se
   vaatii erillisen haun toisesta tarkistettavasta lähteestä.
10. **Son/salsa-musiikki (visan kysymys 4) ei esiinny lainkaan tässä
    faktapohjassa** — aihetta ei ole tarkistettu, koska 12 nostopaikkaa
    täyttyivät muulla aineistolla eikä musiikki-teemasivua valittu
    kolmanneksi teemaksi (valittiin `linnoitukset`, ks. osio 1
    perustelu). Jos kirjoittaja haluaa käsitellä aihetta, se on
    tarkistamatta tässä faktapohjassa.
11. **Vain en-Wikipediaa ja sen MediaWiki-rajapintaa on käytetty tämän
    faktapohjan sisältöön** (artikkelit "Havana", "El Templete", "Old
    Havana", "National Railway Company of Cuba" sekä coordinates-
    rajapinta). Ei ulkopuolisia hakuja.
12. **Ei nykysotaa eikä nykypolitiikkaa käsitelty**, ja spec-
    mantereet.md:n Havanna-kohdan mukaisesti uutisosiota ei tehdä
    lainkaan (valtiollinen media). Väestömäärän viimeaikaisesta
    laskusta (2021: n. 2,14 miljoonaa → 2024: n. 1,75 miljoonaa,
    en-Wikipedian infobox) EI ole nostettu erillistä faktaa tähän
    dokumenttiin, koska luvun taustalla olevat syyt liittyvät
    ajankohtaiseen talous- ja muuttoliiketilanteeseen eivätkä sovi
    "ei nykypolitiikkaa" -linjaukseen ilman tarkempaa, neutraalia
    harkintaa; 2021-luku (n. 2,14 miljoonaa) mainitaan tarvittaessa
    pelkkänä väestömääränä ilman trendiä.
13. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
    tekstiksi** merkkimäärävaatimusten mukaan (johdannot 187–233 mrk,
    nostot 473–579 mrk) ja tarkistettu koneellisesti Node-skriptillä.
