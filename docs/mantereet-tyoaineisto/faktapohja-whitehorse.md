# Whitehorse — faktakoostaja, uusi kaupunkilehti

Lauta-id `northamerica`, kaupunki-id `whitehorse`, maa CAN, en-Wikipedia
"Whitehorse". Kaikki tiedot haettu en-Wikipedian raakatekstistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä) **7.9.2026**. Malli ja mitat luettu tiedostoista
`tools/parvi/kaupunkilehti-ohje.md`, `tools/parvi/kohdekartta-ohje.md`,
`docs/moduulit/kaupunkilehti.md`, `docs/aasia-tyoaineisto/lehtityo-resepti.md`
ja `docs/mantereet-tyoaineisto/spec-mantereet.md`. Malli: Lagosin ja
Sansibarin lehdet (v1670).

Luetut lähdeartikkelit (en-Wikipedia, 7.9.2026): **"Whitehorse"**
(ohjaus "Whitehorse, Yukon" → "Whitehorse"), **"Yukon"**,
**"Miles Canyon Basalts"**, **"White Horse Rapids"**,
**"Schwatka Lake"**, **"Canyon City, Yukon"**,
**"White Pass and Yukon Route"**, **"SS Klondike"**,
**"Klondike Gold Rush"**, **"Yukon Quest"**,
**"Kwanlin Dün First Nation"**, **"Ta'an Kwach'an Council"**
(ohjaus "Ta'an Kwäch'än Council"), **"MacBride Museum of Yukon
History"**, **"Yukon Beringia Interpretive Centre"**,
**"Yukon Transportation Museum"**, **"Yukon Legislative Building"**,
**"Christ Church Cathedral (Whitehorse)"**, **"Riverdale, Whitehorse"**,
**"Downtown Whitehorse"**, **"Erik Nielsen Whitehorse International
Airport"**, **"Whitehorse Waterfront Trolley"**, **"Alaska Highway"**,
**"The Cremation of Sam McGee"**, **"Chinook salmon"**,
**"Yukon River"**.

## 0. Rajaus tälle lehdelle

**Kanadan maalehti (js/packs/maa-kategoriat.js, CAN) on jo tehty, eikä
sen aiheita toisteta.** Maalehti kertoo: L'Anse aux Meadows ja
viikingit, Hudson's Bay Company, Kanadan konfederaatio, punatakit
länteen; métis-kansan synty, totem-paalu, inuksuk, sisäoppilaitokset;
Banffin kuumat lähteet, Fundynlahden vuorovesi, majavapato
satelliittikuvassa, Wood Buffalo; vaahterasiirappi, poutine,
Nanaimo-pala, ketsuppisipsiriita; jääkiekko, koripallo, curling.
Yksikään näistä ei ole tämän lehden aihe.

Karttanostot on luettu: `js/packs/maastokohteet-can.js` (Mount Logan,
Naha Dehé, Baffininsaari, L'Anse aux Meadows, Craigellachie, Rideaun
kanava, Head-Smashed-In, Dinosaur Provincial Park, vanha Québec,
Louisbourgin linnoitus, **Dawson City ja Klondiken kultaryntäys**),
`js/packs/skandaalit.js` (CAN: Tyynenmeren skandaali 1873, rata ja
pääministerin ero) ja `js/packs/elaintakyt.js` (CAN: jääkarhu
Churchillissä). **Klondiken kultaryntäys itsessään on Dawson Cityn
karttanosto**, joten tämä lehti kertoo siitä vain sen verran kuin
Whitehorsen synty vaatii: kaupunki on kosken ja kanjonin lapsi, ja
kertomuksen painopiste on siinä kohdassa reittiä, ei kultakentillä.
Chilkootin sola ja vuoden ruokavarat ovat karttanostossa ja kaupungin
kysymyspakassa — ne jätetään pois.

Kanadan valmiit kaupunkilehdet on luettu (Vancouver, Toronto, Montreal,
Halifax) eikä niiden aiheita toisteta.

Kaupungin kysymyspakka `js/packs/northamerica-questions.js`
(`whitehorse`, viisi kysymystä): Yukonin pääkaupunki, Klondiken kulta,
Yukonjoki, Chilkootin sola ja jokireitti, Yukonjoen pituus noin
3 200 km. **Minitehtävä ei saa kysyä yhtään näistä viidestä.**
Kaupungilla ei ole erillistä kulttuurivisan `kysymys`-kenttää
Pohjois-Amerikan laudalla (`js/packs/northamerica.js` on paljas
kaupunkitaulu).

Olemassa olevat lohkot on luettu:
- `js/packs/northamerica-saapumiset.js` (`whitehorse`): **valmis, ei
  kosketa.** Siinä on Yukonjoki, siipiratashöyry museona ja revontulet.
- `js/packs/northamerica-valokuvat.js` (`whitehorse`): **ennen–nyt-pari
  on valmiiksi tarkistettu** (Sternwheelers at Whitehorse noin 1899 /
  Downtown Whitehorse 2011), lisäkuvina SS Klondike, Miles Canyon ja
  Yukon Questin lähtö. Nämä viisi tiedostonimeä ovat varattuja.
- `js/packs/northamerica-artikkelit.js`: avainta `Whitehorse` EI ole →
  intro ja teksti kirjoitetaan.
- `js/packs/saatiedot.js`: riviä ei ole eikä sitä tehdä tässä erässä
  (Fablen ohje 7.9.2026).

## 1. Perustiedot (en-Wikipedia "Whitehorse", johdanto ja Geography)

- Yukonin pääkaupunki ja **Pohjois-Kanadan suurin kaupunki**.
  Kaupungiksi 1950.
- Sijaitsee **Alaska Highwayn kilometrillä 1426** (Historic Mile 918)
  eteläisessä Yukonissa. Keskusta ja Riverdale ovat Yukonjoen
  kummallakin rannalla; joki alkaa Brittiläisestä Kolumbiasta ja
  laskee Beringinmereen Alaskassa.
- Nimi tulee **White Horse Rapids -koskista**, joiden sanottiin
  muistuttavan valkoisen hevosen harjaa.
- Väkiluku 2021: **28 201** kaupungin rajojen sisällä, 31 913
  taajamassa — noin 70 ja 79 prosenttia koko Yukonin väestöstä.
- Lempinimi "The Wilderness City". Pinta-ala 413,94 km², metropolialue
  8 465,21 km²; Kanadan 64. suurin kaupunki pinta-alaltaan.
- Kolme vuorta kehystää: **Grey Mountain** idässä, **Mount Sumanik**
  luoteessa ja **Golden Horn Mountain** etelässä.
- Kaupungin määräys nro 426 (1975) rajoittaa moottoriajoneuvot
  merkityille teille "suojelluilla alueilla" ympäristön laadun takia.

## 2. Alkuperäiskansat (Kwanlin Dün, Ta'an Kwäch'än, Canyon City)

- **Kwanlin Dün First Nation** (Kwänlin Dän kwächʼǟn, "Whitehorsen
  väki") on Yukonin suurin First Nation. Jäsenistössä on Southern
  Tutchone-, Tagish Ḵwáan- ja tlingit-taustaisia ihmisiä.
- **Nimi Kwanlin** viittaa Yukonjoen osuuteen Miles Canyonista White
  Horse Rapidsille: Southern Tutchonen sana tarkoittaa "virtaavaa
  vettä kanjonin läpi". `Dän`/`Dün` = "väki".
- Perinteinen alue ulottuu Marsh Lakelta Lake Labergelle (Tàa'an Mǟn,
  "järven pää") Yukonjokea myöten; joen nimi on Southern Tutchoneksi
  Tágà Shäw ja tagishiksi Tahgàh Cho, molemmat "iso joki".
- Maaoikeus- ja itsehallintosopimus **19.2.2005**; sopimuksessa 1 042
  km² sopimusmaata, josta yli 30 km² kaupungin rajojen sisällä. Omat
  perustuslait. **Kwanlin Dün Cultural Centre** avattiin joen rannalla
  keskustassa kesäkuussa 2012.
- **Ta'an Kwäch'än Council** on erillinen itsehallintoyhteisö Lake
  Labergen ympärillä; se irtautui Kwanlin Dünistä neuvotellakseen oman
  maaoikeutensa ja allekirjoitti sopimuksen **2002**. Nimi tulee
  Tàa'an Mänistä, "Labergen järven väki". Noin puolet jäsenistä asuu
  Whitehorsessa.
- **Canyon City** (en-Wikipedia "Canyon City, Yukon"): arkeologia
  osoittaa alueen olleen käytössä tuhansia vuosia. Kanjonin ylä- ja
  alapuolella oli kausittaisia kalastusleirejä. **Frederick Schwatka
  pani 1883 merkille First Nationsin kantoreitin**, joka kiersi Miles
  Canyonin, ja **George Mercer Dawson pani 1887 merkille kanjonin
  yläpuolisen suuren lohimäärän**.

## 3. Vuosi 1873 ja kultaryntäys

- **Vuonna 1873 paikalla ei ollut kaupunkia.** Ennen kultaryntäystä
  alueen läpi kulki kausittain useita kansoja, joiden alueet menivät
  päällekkäin (en-Wikipedia "Whitehorse", History).
- Kulta löytyi Klondikelta **elokuussa 1896**; löytäjät **Skookum Jim,
  Tagish Charlie ja George Washington Carmack**. Varhaiset etsijät
  käyttivät Chilkootin solaa, mutta **heinäkuuhun 1897 mennessä**
  höyrylaivoilla saapuneet noviisit leiriytyivät paikkaan nimeltä
  "White Horse".
- **Kesäkuuhun 1898 mennessä** Canyon Cityyn oli syntynyt pullonkaula.
  Canyon City -artikkeli: **lähes 300 venettä oli tuhoutunut koskissa
  ja viisi ihmistä hukkunut**; North-West Mounted Policen tarkastaja
  **Samuel Steele**: *"why more casualties have not occurred is a
  mystery to me."* Steele määräsi, että veneet oli vietävä koskien läpi
  palkatuilla ammattiluotseilla.
- **Kaksi köysi- ja kiskorataa** rakennettiin koskien ohi: itärannalle
  8 kilometriä Canyon Citystä koskien juurelle vastapäätä nykyistä
  keskustaa, ja toinen länsirannalle. Itärannan rata veti tavaraa
  hevosvetoisilla vaunuilla **kolmella sentillä naulaa (454 g)
  kohti**.
- **Kupari**: matkalla löytyi kuparia "kuparivyöhykkeeltä"
  Whitehorsesta länteen. Ensimmäiset valtaukset **Jack McIntyre
  6.7.1898** ja **Sam McGee 16.7.1899**.

## 4. Rautatie, nimi ja tulipalo

- **White Pass and Yukon Route**, kapearaiteinen rata Skagwaysta
  Whitehorseen: rakentaminen alkoi toukokuussa 1898, toukokuussa 1899
  oltiin Bennett Laken eteläpäässä, ja **koko reitti valmistui
  kesä—heinäkuussa 1900**.
- **Nimi Closeleigh torjuttiin.** Rautatieväki yritti vaihtaa
  kaupungin nimen Closeleighiksi (rahoittajina brittiläiset Close
  Brothers), mutta territorion komissaari **William Ogilvie** kieltäytyi.
  Kauppiaat ja kullanetsijät kutsuivat paikkaa jo Whitehorseksi.
  (Huom. ristiriita: "Miles Canyon Basalts" -artikkeli sanoo koskien
  olevan "syy Closeleighin ja lopulta Whitehorsen kaupungin
  perustamiseen" — Whitehorse-artikkeli on tarkempi ja kertoo, että
  nimi torjuttiin. Lehti seuraa Whitehorse-artikkelia.)
- **1901**: Whitehorse Star raportoi jo päivittäisistä
  rahtimääristä.
- **23.5.1905**: pieni tulipalo Windsor-hotellin parturiliikkeessä
  karkasi käsistä, kun paloauton vesi loppui. Vahingot **300 000
  dollaria**, mutta **kuolonuhreja ei tullut**. **Robert Service** oli
  tuolloin pankkivirkailijana ja osallistui sammutukseen.
- **Nimen muoto**: "White Horse" muuttui virallisesti muotoon
  "Whitehorse" **21.3.1957**.

## 5. Robert Service ja Sam McGee

(en-Wikipedia "The Cremation of Sam McGee")

- Runo julkaistiin **1907** kokoelmassa *Songs of a Sourdough*. Se
  kertoo kullanetsijästä, joka paleltuu kuoliaaksi Lake Labergen
  luona, ja miehestä joka polttaa hänet.
- **William Samuel McGee** oli ensisijaisesti tienrakentaja, joka
  harrasti myös malminetsintää. Hän oli kultaryntäyksen aikaan San
  Franciscossa ja lähti Klondikeen 1898.
- **Vuonna 1904** Service, joka työskenteli Canadian Bank of Commercen
  Whitehorsen konttorissa, **näki McGeen nimen lomakkeella** ja otti
  sen runoonsa, koska se rimmasi sanan "Tennessee" kanssa.

## 6. Kosket, pato ja lohi

- **Miles Canyon Basalts**: basalttilaavavirtoja, jotka purkautuivat
  esijääkautiselle maisemalle. Yukonjoki leikkaa niiden läpi
  Whitehorsen eteläpuolella. **Tyyppivirrat ovat noin 8,4 miljoonaa
  vuotta vanhoja (mioseeni)**; Alligator Laken virrat noin 3,2
  miljoonaa (plioseeni). Aiemmin niitä pidettiin pleistoseenisinä.
- Kanjoni ja kosket olivat **siipiratasalusten ylin
  purjehduskelpoinen piste** Yukonjoella.
- **Whitehorsen pato rakennettiin 1957—1958**, ja kosket jäivät
  syntyneen **Schwatka-järven** alle. Järvi on nimetty **Frederick
  Schwatkan** mukaan, joka ensimmäisenä tutki Yukonjoen koko
  pituudelta. Pinta-ala noin 15 hehtaaria, syvyys 6—8 metriä.
  Vesivoimalaa hoitaa Yukon Energy Corporation.
- **Kalaporras** rakennettiin padon ohi kuninkuuslohta varten.
  **Yukonjoen kuninkuuslohella on kaikista lohista pisin
  makeanveden vaellusreitti: yli 3 000 kilometriä** Beringinmeren
  suulta Whitehorsen yläpuolisille kutupaikoille. (Sama väite on
  itsenäisesti myös artikkelissa "Chinook salmon", osio Range.)

## 7. Ilmasto (en-Wikipedia "Whitehorse", Climate)

- Subarktinen ilmasto (Köppen Dfc). Kaupunki on **Rannikkovuorten
  sadevarjossa**, joten sademäärät ovat pieniä ympäri vuoden.
- Laakson sijainti tekee ilmastosta leudomman kuin muissa vastaavissa
  pohjoisissa yhdyskunnissa, esimerkiksi **Yellowknifessä**; kylmillä
  jaksoilla alle −40 °C ei silti ole harvinaista.
- **Vuoden keskilämpötila 0,2 °C — Yukonin lämpimin paikka.**
  Mittaukset tehdään lentoasemalla.
- Heinäkuun keskiylin **20,6 °C**, tammikuun keskialin **−19,2 °C**.
  Korkein mitattu **35,6 °C (14.6.1969)**, matalin **−56,2 °C
  (21.1.1906)**.
- **Lumisade 141,8 cm ja vesisade 160,9 mm vuodessa. Meteorological
  Service of Canadan mukaan Whitehorse on Kanadan kuivin kaupunki.**
- Talvipäivät ovat lyhyitä ja kesäpäivissä on **runsaat 19 tuntia
  valoa**.

## 8. Yukon Quest (en-Wikipedia "Yukon Quest")

- Virallinen nimi **Yukon Quest 1,000-mile International Sled Dog
  Race**. Ajetaan **helmikuussa vuodesta 1984** Fairbanksin (Alaska)
  ja Whitehorsen välillä, **suunta vaihtuu vuosittain**.
- Pidetään "maailman vaikeimpana koiravaljakkokilpailuna"; reitti
  seuraa 1890-luvun kultaryntäyksen posti- ja kuljetusreittejä
  Fairbanksin, Dawson Cityn ja Whitehorsen välillä.
- Valjakossa **6—14 koiraa**, matka kestää **10—20 vuorokautta**.
  Ajaja pakkaa mukaansa jopa **250 naulaa** varusteita ja muonaa, ja
  **koko matka ajetaan yhdellä reellä** (Iditarodissa kolme).
- Reitti kulkee jäätyneillä joilla, **neljän vuoriston yli** ja
  syrjäisten kylien läpi; matkaa **1 016 mailia tai enemmän**.
  Lämpötila laskee usein −60 °F:een ja tuuli yltää ylhäällä
  50 mailiin tunnissa.
- Ensimmäinen kilpailu **25.2.1984**: 26 valjakkoa lähti Fairbanksista,
  voittaja **Sonny Lindner**. Nopein aika **Hans Gatt 2010**, 9
  vuorokautta ja 26 minuuttia. Tiukin kaksoisratkaisu 2012: Hugh Neff
  voitti Allen Mooren 26 sekunnilla.
- Ensimmäisessä kilpailussa moottorikelkka hajosi, joten kärkiajajat
  joutuivat itse aukomaan latua; Lindner muisteli myöhemmin, että
  "90 prosenttia oli retkeilyä ja ehkä vähän kilpailua".

## 9. Alaska Highway ja pääkaupungiksi tulo

- **Vuoteen 1942 asti Whitehorseen pääsi vain rautateitse, jokea
  pitkin tai lentäen.** Ensimmäiset koneet laskeutuivat 1920,
  ensimmäinen lentoposti lähti marraskuussa 1927.
- Yhdysvaltain armeija aloitti **Alaska Highwayn** rakentamisen 1942;
  **koko 1 600 mailin urakka tehtiin maaliskuun ja marraskuun 1942
  välillä**. Kanadan puoleinen osuus palautui Kanadan hallintaan vasta
  sodan jälkeen. Samaan aikaan rakennettiin **Canol-putki** ja
  Whitehorseen jalostamo.
- **1950 kaupungiksi**, ja vuoteen 1951 väkiluku oli kaksinkertaistunut
  vuoden 1941 luvusta.
- **1.4.1953 Whitehorsesta tuli Yukonin pääkaupunki**, kun istuin
  siirrettiin Dawson Citystä Klondike Highwayn valmistuttua.

## 10. Kohdekartan kahdeksan kohdetta

Koordinaatit en-Wikipedian geosearch-rajapinnasta 7.9.2026. Kohteet
eivät toista lehden juttuja (New Yorkin sääntö).

1. **MacBride Museum of Yukon History** 60.72111 / −135.05167 —
   perustettu 1950 Yukon Historical Societyn toimesta, avattu 1952,
   **Yukonin vanhin museo**; kolme toimipistettä (museo, veturitalli
   ja MacBride Copperbelt Mining Museum). Laajennukseen myönnettiin
   rahoitus 2016. Rakennus sisältää alkuperäisen Whitehorsen
   lennätinkonttorin.
2. **Christ Church Cathedral** 60.71807 / −135.05512 — Yukonin
   hiippakunnan anglikaaninen katedraali.
3. **Yukon Legislative Building** 60.7169 / −135.0488 — Yukonin
   lakiasäätävän kokouksen rakennus.
4. **SS Klondike** 60.71333 / −135.04750 — kaksi siipiratasalusta.
   *Klondike I* rakennettiin 1929 British Yukon Navigation Companylle
   (White Pass and Yukon Routen tytäryhtiö); sillä oli **50 prosenttia
   tavallista suurempi kapasiteetti**, 270 tonnia ilman proomua.
   Ajoi karille kesäkuussa 1936 Thirty Mile -osuuden pohjoispuolella;
   kattila, koneet ja varusteet siirrettiin **Klondike II**:een 1937.
   Rahtia 1950-luvun alkuun; muutettiin risteilyalukseksi, jota
   Edinburghin herttua kävi katsomassa 1954, ja toiminta lopetettiin
   1955. Lahjoitettiin Parks Canadalle ja siirrettiin nykypaikalleen
   1966: **kolme puskutraktoria, kahdeksan tonnia Palmolive-saippuaa,
   kahdentoista miehen ryhmä ja kolme viikkoa**, rasvatuilla
   tukkirullilla. Kansallinen historiallinen paikka 24.6.1967.
5. **Riverdale** 60.70694 / −135.02358 — kaupunginosa joen itärannalla,
   yhteys keskustaan Lewes Boulevardia pitkin. Kaupungin vanhimpia
   kaupunginosia; suuret vuoret kolmella sivulla ja Yukonjoki
   neljäntenä. Matalia kerrostaloja, mikä on Pohjois-Kanadassa
   harvinaista. Grey Mountainin länsipää ja näköalapaikka ovat täällä.
6. **Erik Nielsen Whitehorse International Airport** 60.70944 /
   −135.06722 — kaupungin lentoasema keskustan yläpuolisella
   penkereellä.
7. **Yukon Transportation Museum** 60.7119 / −135.0792 — perustettu
   1990, Ta'an Kwäch'änin ja Kwanlin Dünin perinteisillä alueilla.
   Näyttelyissä First Nationsin vesikulkuneuvot, pensaslentäjät,
   koiravaljakot ja Yukon Quest, lumikengät ja sukset. Esineistössä
   **R. G. LeTourneaun LCC-1 Sno-Train**, **Douglas DC-3 (CF-CPY),
   jota kutsutaan yhdeksi maailman suurimmista tuuliviireistä**,
   1920-luvun rantamaiseman pienoisrautatie ja White Pass and Yukon
   Routen kalustoa.
8. **Yukon Beringia Interpretive Centre** 60.70861 / −135.07889 —
   jääkauden Beringian tulkintakeskus.

Pienin väli kahdeksan kohteen välillä on **366 metriä** (Yukon
Transportation Museum – Yukon Beringia Interpretive Centre), eli 200
metrin sääntö ei ole lähelläkään rajaa.

**Pois jätetyt, vaikka ruudussa:** *Downtown Whitehorse* (105 m
MacBride-museosta) ja *Whitehorse Waterfront Trolley* (75 m samasta)
ovat liian lähellä; molemmat kerrotaan matkaoppaassa. *Miles Canyon*
(6,4 km) ja *Canyon City* (7,2 km) ovat ruudun ulkopuolella ja ovat
lehden omia juttuja. *MacBride Copperbelt Mining Museum* on 5,2
kilometrin päässä luoteessa.

## 11. Avoimet kysymykset päätoimittajalle

- **A.** Closeleigh-ristiriita (kohta 4): Whitehorse-artikkeli sanoo
  nimen torjutun, Miles Canyon Basalts -artikkeli puhuu "Closeleighin
  kaupungista". Ehdotus: kerrotaan yritys ja sen torjuminen, koska
  kaupunkiartikkeli on aiheessa tarkempi ja nimeää komissaarin.
- **B.** Uponneiden veneiden määrä: Whitehorse-artikkeli sanoo "many
  boats"; Canyon City -artikkeli "nearly 300 boats ... five people".
  Ehdotus: käytetään Canyon Cityn tarkempaa lukua ja mainitaan
  molemmat luvut samassa virkkeessä.
- **C.** Whitehorse-artikkeli mainitsee vuoden 1905 palon yhteydessä
  erään yhdysvaltalaisen liikemiessuvun. **Jätetään pois**:
  nykypolitiikkaan kytkeytyvä henkilöviite ei kuulu peliin.
- **D.** SS Klondike II:n palvelusaika: infolaatikko sanoo 1937—1955,
  leipäteksti "rahtia 1950-luvun alkuun" ja risteilykauden loppu 1955.
  Ehdotus: kerrotaan leipätekstin mukaan (rahti 1950-luvun alkuun,
  risteilyt 1955 asti).
- **E.** Yukonjoen pituus on kaupungin kysymyspakan aihe, joten
  minitehtävä ei saa koskea sitä.
