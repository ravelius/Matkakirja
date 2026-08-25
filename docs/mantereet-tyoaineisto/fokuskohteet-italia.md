# Italian fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 25.8.2026.
Sisarpaperi: docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md, jonka
rakennetta tämä noudattaa.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohdat
KOHDEKOROSTUS ja ETENEMINEN): pelilaattojen lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen kohteen
niukalla taustalla ja avaa pienen pop-up-tietoruudun. Tämä dokumentti
on faktapohja niille pop-up-teksteille — ei lopullista pelitekstiä
eikä UI-suunnitelmaa.

## Italian pelilaatat — mitä kartalla JO on

js/packs/europe.js: Italian pelattavat laatat ovat **Venetsia** (448,
698), **Firenze** (412, 746), **Rooma** (451, 792) ja **Sisilia** (468,
891). Kartalla on jo kaksi maastomerkkiä: Colosseum-merkki Rooman
kaakkoispuolella (494, 804) ja tulivuorimerkki Sisilian
kaakkoispuolella (498, 924 — eli Etna). Alla olevat kohteet on valittu
niin, ETTEIVÄT ne ole pelilaattoja: yksikään ei ole Venetsia, Firenze,
Rooma tai Sisilia. Etna on mukana omana kohteenaan, koska se on eri
asia kuin Sisilia-laatta ja sillä on kartalla jo oma merkkinsä.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 25.8.2026
  curlilla User-Agent-otsakkeen kanssa. Rajapinta vastasi ensin
  429:llä; haut uusittiin kasvavalla viiveellä. EI yhtään koordinaattia
  muistista. Kaksi artikkelia (Matera, Cinque Terre) ei antanut
  koordinaatteja ensimmäisellä yrityksellä — ks. kohteittain merkitty
  ratkaisu.
- **Popup-faktat:** en-Wikipedian artikkeleista
  (`prop=extracts&explaintext=1`, johdanto ja tarvittaessa nimetty
  alaotsikko). Jokaisen kohdan alla on artikkeli JA se osio, johon
  väite nojaa.
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`titles=...&redirects=1`) hakemalla ehdokasotsikko ja seuraamalla
  uudelleenohjaus perille. Kolme uudelleenohjausta löytyi
  (Pompeiji → Pompeji, Como-järvi → Comojärvi, Sininen luola →
  Grotta Azzurra) — merkitty kohteittain.
- **Kuvat:** tässä paperissa mennään Kreikkaa pidemmälle. Kreikan
  aineistossa tarkistettiin Commonsin KATEGORIA (`prop=categoryinfo`);
  tässä on tarkistettu suoraan jokaisen ehdotetun TIEDOSTON olemassaolo,
  koko, lisenssi ja tekijä Commonsin `imageinfo`-rajapinnalla. Ei
  arvattuja tiedostonimiä. Kaikki ehdotetut ovat PD, CC0 tai
  CC BY / CC BY-SA; tekijä on merkitty, koska CC BY vaatii maininnan.

---

## Kohteet

### 1. Vesuvius

- **Nimi:** Vesuvius (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Vesuvio.
- **Tyyppi:** tulivuori.
- **Koordinaatit:** 40,8214°N, 14,4261°E — en-Wikipedia "Mount Vesuvius".
- **Popup-teksti (n. 400 merkkiä):**

  > Vesuvius on purkautunut monta kertaa vuoden 79 jaa. tuhon jälkeen:
  > vuonna 1631 laava hautasi kyliä ja tappoi noin 3 000 ihmistä, ja
  > 1800-luvulla purkauksia oli kahdeksan. Niistä viimeinen ennen isoisän
  > matkaa oli vuonna 1872 — vuosi ennen kuin hän tuli katsomaan vuorta.
  > Huipulle rakennettiin vuonna 1880 köysirata, jonka avajaisiksi
  > sepitettiin laulu "Funiculì, Funiculà". Viimeksi vuori purkautui
  > 1944.

- **Lähde:** en-Wikipedia "Mount Vesuvius", johdanto ja osiot
  purkaushistoriasta ("The volcano erupted again in 1631, six times in
  the 18th century..., eight times in the 19th century (notably in
  1872), and in 1906, 1929 and 1944"; "a major eruption buried many
  villages under lava flows, killing around 3,000 people") sekä osio
  "Funicular" (köysirata 1880, laulu). Virke isoisän matkavuodesta on
  oma ajoituspäätelmäni.
- **Kuva:** Commons **Crater rim volcano Vesuvius - Campania - Italy -
  July 9th 2013 - 08.jpg** (4329×3004, CC BY-SA 3.0, Norbert Nagel,
  2013) — kraaterin reuna.

### 2. Pompeji

- **Nimi:** Pompeji (fi-Wikipedia; "Pompeiji" ohjautuu tänne).
  Paikallinen: Pompei.
- **Tyyppi:** rauniokaupunki.
- **Koordinaatit:** 40,75°N, 14,4861°E — en-Wikipedia "Pompeii".
- **Popup-teksti (n. 420 merkkiä):**

  > Tuhkan alle jäänyt kaupunki alkoi puhua vasta 1800-luvulla. Kun
  > Giuseppe Fiorelli otti kaivaukset johtoonsa 1863, hän tajusi, mitä
  > tuhkakerroksen tyhjät onkalot olivat: hajonneiden ruumiiden jättämiä
  > muotteja. Hän kehitti tavan valaa niihin kipsiä, ja niin uhrit
  > saivat jälleen hahmon. Fiorelli myös numeroi korttelit ja ovet ja
  > rakensi kaivauksen oman museon vuosina 1873–1874 — juuri isoisän
  > matkavuonna.

- **Lähde:** en-Wikipedia "Pompeii", osio kaivaushistoriasta
  ("Giuseppe Fiorelli took charge of the excavations in 1863... Fiorelli
  realised these were spaces left by the decomposed bodies, and so
  devised the technique of injecting plaster into them"; "Fiorelli also
  introduced scientific documentation. He divided the city into today's
  nine areas (regiones) and blocks (insulae) and numbered the entrances")
  ja osio museosta ("Originally built by Giuseppe Fiorelli between 1873
  and 1874, the Antiquarium of Pompeii").
- **Kuva:** Commons **Forum (Pompeii) and the Vesuvio.jpg** (8308×5486,
  CC BY-SA 4.0, Commonists, 2021) — Forum ja Vesuvius samassa kuvassa,
  eli kohteet 1 ja 2 yhdellä silmäyksellä.
- **IKÄSOPIVUUS:** kipsivalut ovat kuolleiden kuvia. Popup-teksti
  kertoo menetelmästä ja tutkijasta, ei kuolinhetkistä; pidä se niin.
  Kuvaksi EI uhrivalua vaan Forum (yllä).

### 3. Napoli

- **Nimi:** Napoli (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Napoli, napolin kielellä Napule.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 40,8358°N, 14,2486°E — en-Wikipedia "Naples".
- **Popup-teksti (n. 430 merkkiä):**

  > Napolin perustivat kreikkalaiset: ensin Parthenope 700-luvulla eaa.,
  > sitten uudelleen nimellä Neápolis, "uusi kaupunki". Se oli oman
  > valtakuntansa pääkaupunki lähes yhtäjaksoisesti 1200-luvulta vuoteen
  > 1861 asti, jolloin Kahden Sisilian kuningaskunta liitettiin
  > Italiaan — isoisän matkasta vain kaksitoista vuotta taaksepäin.
  > Teatro di San Carlo vuodelta 1737 on Euroopan vanhin yhä toimiva
  > oopperatalo, ja kaupunkia pidetään pizzan kotina.

- **Lähde:** en-Wikipedia "Naples", johdanto ("Founded by the Greeks...
  a colony known as Parthenope... In the sixth century BC, it was
  refounded as Neápolis"; "capital of the Kingdom of Naples (1282–1816),
  and finally as the capital of the Kingdom of the Two Sicilies — until
  the unification of Italy in 1861"), osio nähtävyyksistä ("the Teatro
  di San Carlo, which is the oldest opera house in Italy" / "The Teatro
  di San Carlo, built in 1737, is the oldest working theatre in Europe")
  ja osio ruoasta ("Naples is traditionally credited as the home of
  pizza").
- **Kuva:** Commons **Naples from the Castello Sant Elmo with Abbazia
  San Martino the port and the Vesuv.jpg** (7360×4912, CC BY-SA 3.0,
  Wolfgang Moroder, 2016).
- **HUOM (sanamuoto):** artikkeli sanoo kahdessa kohdassa hieman eri
  asian — "oldest opera house in Italy" ja "oldest working theatre in
  Europe". Turvallisin muoto pelitekstiin on "Euroopan vanhin yhä
  toimiva oopperatalo", joka vastaa jälkimmäistä.

### 4. Pisa

- **Nimi:** Pisa (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 43,7167°N, 10,4°E — en-Wikipedia "Pisa".
- **Popup-teksti (n. 430 merkkiä):**

  > Pisan tuomiokirkon kellotorni alkoi kallistua jo rakennusaikana
  > 1100-luvulla, koska maaperä ei kantanut sen painoa, ja kallistuma
  > paheni 1300-luvulle asti. Vuonna 1990 se oli 5,5 astetta, ja torni
  > suljettiin. Pelastustyö kesti vuodesta 1993 vuoteen 2001: alta
  > kaivettiin pois 38 kuutiometriä maata korkeammalta puolelta, ja
  > torni palautui vuoden 1838 asentoonsa, 3,97 asteeseen. Sen sanotaan
  > kestävän nyt ainakin 300 vuotta.

- **Lähde:** en-Wikipedia "Leaning Tower of Pisa", johdanto ja osio
  vakauttamisesta ("The tower began to lean during construction in the
  12th century, due to soft ground... By 1990, the tilt had reached 5.5
  degrees"; "removing 38 cubic metres of soil from underneath the raised
  end. The tower's tilt was reduced by 45 centimetres, returning to its
  1838 position"; "reopened to the public on 15 December 2001, and was
  declared stable for at least another 300 years").
- **Kuva:** Commons **Piazza dei Miracoli (Pisa) 2023.jpg**
  (10153×6087, CC BY 4.0, PaestumPaestum, 2023).
- **HUOM:** Galileon kanuunankuulakoe tornista on lähteen mukaan vain
  perimätietoa ("is said to have"), joka on peräisin hänen oppilaansa
  Vincenzo Vivianin elämäkerrasta 1654. Jos se otetaan mukaan, se on
  sanottava tarinana. Ks. myös takynostot-italia.md (Galileon sormi).

### 5. Capri ja Sininen luola

- **Nimi:** Capri (fi-Wikipedia). Luolan fi-nimi: **Grotta Azzurra**
  — "Sininen luola" ohjautuu fi-Wikipediassa tähän artikkeliin.
- **Tyyppi:** saari (ja merenalainen luola).
- **Koordinaatit:** Capri 40,55°N, 14,2333°E; Sininen luola
  40,561°N, 14,2057°E — en-Wikipedia "Capri" ja "Blue Grotto (Capri)".
- **Popup-teksti (n. 440 merkkiä):**

  > Keisari Tiberius muutti Caprille pysyvästi vuonna 27 jaa. ja
  > hallitsi Rooman valtakuntaa saarelta kuolemaansa asti; Villa Jovis
  > on yhä Italian parhaiten säilyneitä keisariajan huviloita. Saaren
  > kuuluisin nähtävyys on kuitenkin merenalainen: Sininen luola, jonka
  > vedenalaisesta aukosta tuleva valo heijastuu ylöspäin ja saa veden
  > hehkumaan siniseltä. Saksalainen August Kopisch löysi luolan
  > uudelleen 1826, ja siitä tuli saaren maine.

- **Lähde:** en-Wikipedia "Capri", osio antiikin historiasta ("In AD 27,
  Tiberius moved permanently to Capri, governing the Roman Empire from
  the island until his death in AD 37. The most famous, Villa Jovis, is
  one of the best-preserved Roman villas in Italy") ja osio 1800-luvusta
  ("August Kopisch's account of his 1826 rediscovery of the Blue Grotto
  significantly boosted the island's profile"); en-Wikipedia "Blue
  Grotto (Capri)", johdanto ("Sunlight shining through an underwater
  cavity is reflected back upward through the seawater below the cavern,
  giving the water a blue glow").
- **Kuva:** Commons **Albert Bierstadt - The Blue Grotto, Capri -
  Walters 371565.jpg** (1800×1436, public domain, Albert Bierstadt,
  maalattu 1857–1860) — **aikalaiskuva luolasta, maalattu noin
  viisitoista vuotta ennen isoisän matkaa.** Vahvin ajoituksellinen
  kuvaosuma koko listalla.
- **IKÄSOPIVUUS:** artikkeli mainitsee myös Tiberiukseen liitetyt
  antiikin huhut ja Commoduksen sisaren teloituksen saarella. Ne EIVÄT
  kuulu popup-tekstiin.

### 6. Cinque Terre

- **Nimi:** Cinque Terre (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** rannikkoalue / viisi kylää.
- **Koordinaatit:** 44,1194°N, 9,7167°E — en-Wikipedia "Cinque Terre".
  (Ensimmäinen haku ei palauttanut koordinaatteja; toinen yritys
  onnistui. Tarkistuspiste: Vernazza 44,1333°N, 9,6833°E ja Monterosso
  al Mare 44,1458°N, 9,6542°E ovat samalla rannikolla, eli luku on
  oikealla alueella.)
- **Popup-teksti (n. 380 merkkiä):**

  > "Viisi maata" on viisi kylää Ligurian jyrkällä rannikolla:
  > Monterosso al Mare, Vernazza, Corniglia, Manarola ja Riomaggiore.
  > Vuosisatojen ajan ihmiset ovat rakentaneet rinteisiin terasseja
  > aivan merenrannan kallioille asti. Kyliin pääsee polkuja, junalla ja
  > veneellä — autolla vain vaivoin, kapeita ja huteria vuoristoteitä
  > pitkin. Alue on Unescon maailmanperintökohde ja kansallispuisto.

- **Lähde:** en-Wikipedia "Cinque Terre", johdanto (kylien nimet, "part
  of the Cinque Terre National Park, a UNESCO World Heritage Site";
  "Over the centuries, people have built terraces on the rugged, steep
  landscape right up to the cliffs"; "Paths, trains, and boats connect
  the villages as cars can only reach them with great difficulty").
- **Kuva:** Commons **Vernazza dal Sentiero Azzurro.jpg** (4500×2676,
  CC BY-SA 2.5 ca, tekijänimi Commonsissa "СССР", 2016).

### 7. Matera

- **Nimi:** Matera (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki (kallioasumukset).
- **Koordinaatit:** 40,6667°N, 16,6083°E — en-Wikipedia "Sassi di
  Matera". **HUOM:** en-Wikipedian "Matera"-artikkeli EI palauta
  koordinaatteja koordinaattirajapinnasta (kokeiltu kahdesti);
  koordinaatit on siksi otettu Sassi-artikkelista, joka on saman
  kaupungin vanha ydin.
- **Popup-teksti (n. 430 merkkiä):**

  > Materan vanhin osa on kaiverrettu kallioon: Sassit ovat noin
  > kahdellatoista tasolla kiemurtelevia luolakoteja, portaita ja
  > pihoja rotkon reunalla. Asutus jatkuu esihistoriasta asti, ja
  > 1700-luvun lopulla kaupunki oli jakautunut kahtia — köyhät Sassien
  > luolissa, varakkaat ylätasangolla. 1950-luvulla luolat julistettiin
  > kelvottomiksi asua ja asukkaat siirrettiin pois; 1993 Sassit
  > nimettiin maailmanperintökohteeksi.

- **Lähde:** en-Wikipedia "Matera", johdanto ("With a history of
  continuous occupation dating back to prehistory (the eighth millennium
  BC), it is renowned for its rock-cut urban core"; "The Sassi consist of
  approximately twelve levels... connected by a network of paths,
  stairways, and courtyards"; "a physical class boundary separated the
  overcrowded Sassi of the peasants from the new spatial order of their
  social superiors in the Piano"; "the Sassi were declared unfit for
  modern habitation, and the government relocation of all their
  inhabitants... between 1952 and the 1970s"; UNESCO "in December 1993").
- **Kuva:** Commons **View of Sassi di Matera, Matera, Italy
  (PPL2-Enhanced) julesvernex2.jpg** (6637×3238, CC BY-SA 4.0, Jules
  Verne Times Two, 2019).

### 8. Dolomiitit

- **Nimi:** Dolomiitit (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Dolomiti.
- **Tyyppi:** vuoristo.
- **Koordinaatit:** 46,4333°N, 11,85°E — en-Wikipedia "Dolomites".
- **Popup-teksti (n. 390 merkkiä):**

  > Koillis-Italian vuorijono on saanut nimensä kivilajistaan, ja
  > kivilaji puolestaan ranskalaiselta mineralogilta: Déodat Gratet de
  > Dolomieu (1750–1801) kuvasi mineraalin ensimmäisenä. Sitä ennen
  > paikalliset kutsuivat vuoria nimellä Monti Pallidi, "kalpeat
  > vuoret", koska karbonaattikallio heijastaa auringonlaskussa
  > punertavan ja purppuraisen hehkun. Dolomiitit ovat olleet Unescon
  > maailmanperintökohde vuodesta 2009.

- **Lähde:** en-Wikipedia "Dolomites", johdanto ja osio "Etymology"
  ("The Dolomites take their name from the carbonate rock dolomite. This
  was named after the 18th-century French mineralogist Déodat Gratet de
  Dolomieu (1750–1801), who was the first to describe the mineral. The
  prior local vernacular name of Monti Pallidi came from the mountains'
  reddish to purple hues viewed at sunset"; "On 26 June 2009, the
  Dolomites were declared a UNESCO World Heritage Site").
- **Kuva:** Commons **Drei Zinnen Tre Cime di Lavaredo Dolomites.jpg**
  (8256×5504, CC BY-SA 3.0, Wolfgang Moroder, 2018).

### 9. Etna

- **Nimi:** Etna (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** tulivuori.
- **Koordinaatit:** 37,755°N, 14,995°E — en-Wikipedia "Mount Etna".
- **Popup-teksti (n. 400 merkkiä):**

  > Etna on Italian neljästä aktiivisesta tulivuoresta ylivoimaisesti
  > suurin: noin kaksi ja puoli kertaa Vesuviuksen korkuinen ja lähes
  > 1 200 neliökilometrin laajuinen. Se on lähes jatkuvasti liikkeessä,
  > ja sen korkeus muuttuu purkausten mukana — syyskuussa 2024 huippu
  > oli 3 403 metriä. Tuhkasta syntyy hedelmällistä multaa, ja rinteet
  > ovat täynnä viinitarhoja ja hedelmätarhoja.

- **Lähde:** en-Wikipedia "Mount Etna", johdanto ("a current height
  (September 2024) of 3,403 m... though this varies with summit
  eruptions"; "Etna covers an area of 1,190 km2... This makes it by far
  the largest of the four active volcanoes in Italy, being about two and
  a half times the height of the next largest, Mount Vesuvius"; "in an
  almost constant state of activity. The fertile volcanic soils produced
  from this activity support extensive agriculture, with vineyards and
  orchards spread across the lower slopes").
- **Kuva:** Commons **Mount Etna snow-toppd.jpg** (1542×1330, public
  domain, lataaja Jeanne boleyn, 2009) — lumihuippuinen Etna.
  Vaihtoehto isommaksi: Copernicus/ESA-satelliittikuvat samasta
  hausta, jos halutaan purkausnäkymä.
- **HUOM:** kartalla on jo tulivuorimerkki kohdassa (498, 924)
  (europe.js) — tämä kohde osuu siihen. Kartan merkki ja kohde on
  syytä sitoa yhteen, ettei synny kahta eri Etnaa.

### 10. Milano

- **Nimi:** Milano (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 45,4669°N, 9,19°E — en-Wikipedia "Milan".
- **Popup-teksti (n. 380 merkkiä):**

  > Milanon perusti kelttiheimo noin 590 eaa., ja roomalaiset
  > valloittivat sen 222 eaa. ja latinalaistivat nimen muotoon
  > Mediolanum. Vuosina 284–402 jaa. kaupunki oli Rooman valtakunnan
  > läntisen puoliskon pääkaupunki. Keskiajan lopulla Milanon
  > herttuakunta oli yksi renessanssin suurista rahoittajista, ja
  > 1800-luvulta lähtien kaupunki on vetänyt Italian teollisuutta ja
  > rahaa.

- **Lähde:** en-Wikipedia "Milan", johdanto ("Founded around 590 BC by a
  Celtic tribe, Milan was conquered by the Romans in 222 BC, who
  Latinized the name of the city into Mediolanum. From 284 to 402 AD, it
  served as capital of the western part of the Roman Empire. In the Late
  Medieval period, the wealthy Duchy of Milan was one of the greatest
  forces behind the Renaissance... From the 19th century onwards, Milan
  led the industrial and financial development of Italy").
- **Kuva:** Commons **Milano, Duomo with Milan Cathedral and Galleria
  Vittorio Emanuele II, 2016.jpg** (3048×1786, CC BY-SA 4.0, Steffen
  Schmitz, 2016).
- **HUOM:** pelissä on jo Milano-kysymys (europe.js: "Milano ei ole
  koskaan ollut Italian pääkaupunki"). Tämä popup ei toista sitä eikä
  ole ristiriidassa sen kanssa — läntisen Rooman valtakunnan pääkaupunki
  on eri asia kuin Italian pääkaupunki, mutta jos ne esiintyvät lähekkäin,
  ero kannattaa sanoa ääneen.

### 11. Torino

- **Nimi:** Torino (fi-Wikipedia, ei uudelleenohjausta).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 45,0792°N, 7,6761°E — en-Wikipedia "Turin".
- **Popup-teksti (n. 420 merkkiä):**

  > Torino oli yhdistyneen Italian ensimmäinen pääkaupunki vuosina
  > 1861–1865 — sitä ennen Savoijin herttuakunnan ja Sardinian
  > kuningaskunnan keskus, ja siksi sitä on kutsuttu Italian vapauden
  > kehdoksi. Kaupungin tunnus, Mole Antonelliana, oli isoisän
  > matkavuonna vasta työmaa: se aloitettiin 1863 synagogaksi ja
  > valmistui vasta 1889, arkkitehtinsa kuoltua. Nykyään siinä toimii
  > elokuvamuseo.

- **Lähde:** en-Wikipedia "Turin", johdanto ("From 1861 to 1865, it was
  the first capital of the Kingdom of Italy"; "From 1563, it was the
  capital of the Duchy of Savoy, then of the Kingdom of Sardinia";
  "sometimes called 'the cradle of Italian liberty'"); en-Wikipedia
  "Mole Antonelliana", johdanto ("Construction began in 1863, soon after
  Italian unification, and was completed in 1889, after the architect's
  death. Originally conceived of as a synagogue, it now houses the Museo
  Nazionale del Cinema").
- **Kuva:** Commons **Mole Antonelliana in Turin.jpg** (5202×6135,
  CC BY-SA 4.0, Wikibusters, 2022).
- **1873-KYTKÖS:** vahva. Isoisä olisi nähnyt Molen keskeneräisenä
  telineissä — kaupunki, joka oli juuri menettänyt pääkaupunkiasemansa
  Firenzelle ja sitten Roomalle, rakensi silti Euroopan korkeinta
  rakennustaan.

### 12. Comojärvi

- **Nimi:** Comojärvi (fi-Wikipedia; "Como-järvi" ohjautuu tänne).
  Paikallinen: Lago di Como, myös Lario.
- **Tyyppi:** järvi.
- **Koordinaatit:** 46°N, 9,2667°E — en-Wikipedia "Lake Como".
- **Popup-teksti (n. 400 merkkiä):**

  > Comojärvi on jääkauden työtä: Adda-jäätikkö törmäsi vuoristoon,
  > haarautui ja kaiversi järvelle sen tunnusomaisen Y-muodon. Se on
  > Italian kolmanneksi suurin järvi ja yli 400 metriä syvä, siis
  > Euroopan syvimpiä. Rannat ovat olleet varakkaiden lepopaikka
  > roomalaisajoista asti, ja huviloita reunustaa yhä. 1800-luvulla
  > seutu rikastui silkkiteollisuudesta.

- **Lähde:** en-Wikipedia "Lake Como", johdanto ("a lake of glacial
  origin"; "It has an area of 146 km2, making it the third-largest lake
  in Italy"; "At over 400 metres deep, it is one of the deepest lakes in
  Europe. Its characteristic 'Y' shape resulted from the movement of the
  ancient Adda glacier"; "a popular retreat for aristocracy and the
  wealthy since Roman times"; "The area became renowned for its silk
  industry in the 19th and 20th centuries").
- **Kuva:** Commons **Town of Bellagio (Lake Como) seen from the lake
  (36722979021).jpg** (5760×3840, CC BY-SA 2.0, Ray Swi-hymn, 2017) —
  Bellagio on juuri siinä kohdassa, jossa Y haarautuu.

### 13. Po

- **Nimi:** Po (fi-Wikipedia: "Po (lat. Padus) on joki
  Pohjois-Italiassa").
- **Tyyppi:** joki.
- **Koordinaatit:** 44,9525°N, 12,4319°E — en-Wikipedia "Po (river)".
  **HUOM:** tämä on joen SUU (suisto Adrianmerellä), ei koko joen
  keskipiste; kartalla merkki kannattaa sijoittaa suistoon tai
  nimikilpi vetää jokea pitkin.
- **Popup-teksti (n. 400 merkkiä):**

  > Po on Italian pisin joki, 652 kilometriä. Se alkaa Cottian
  > Alpeilla kivisestä rinteestä pulppuavana lähteenä Monviso-vuoren
  > alta ja päätyy leveään suistoon Adrianmerellä. Vesimäärältään se on
  > Rhônen ja Niilin ohella Välimeren suurimpia jokia — ja siksi myös
  > tulvii, minkä takia yli puolet uomasta on penkereiden välissä.
  > Milanoon Po on yhdistetty kanavaverkolla, jonka suunnittelussa
  > Leonardo da Vinci oli mukana.

- **Lähde:** en-Wikipedia "Po (river)", johdanto ("The Po is the longest
  river in Italy... The river's length is 652 km"; "The headwaters of
  the Po are formed by a spring seeping from a stony hillside at Pian
  del Re... under the northwest face of Monviso"; "with the Rhône and
  Nile, one of the three Mediterranean rivers with the largest water
  discharge... the river is subject to heavy flooding. Consequently,
  over half its length is controlled with embankments"; "It is connected
  to Milan through a net of channels called navigli, which Leonardo da
  Vinci helped design").
- **Kuva:** Commons **Po River Delta aerial 1.jpg** (4284×5712,
  CC BY-SA 4.0, kallerna, 2025).

### 14. Sardinia

- **Nimi:** Sardinia (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Sardegna, sardin kielellä Sardigna.
- **Tyyppi:** saari.
- **Koordinaatit:** 40°N, 9°E — en-Wikipedia "Sardinia". (Pyöreä
  astekoordinaatti eli saaren likimääräinen keskipiste, ei täsmäpaikka
  — sama varaus kuin Kreikan aineiston merikohteissa.)
- **Popup-teksti (n. 400 merkkiä):**

  > Sardinia on Sisilian jälkeen Välimeren toiseksi suurin saari, ja
  > sitä on kuvattu mikromantereeksi: vuoria, metsiä, tasankoja,
  > kallioisia rantoja ja pitkiä hiekkarantoja samassa paikassa.
  > Saarella puhutaan omaa kieltä, sardia, joka on Italian lain
  > tunnustama vähemmistökieli. Maisemassa seisoo yhä esihistoriallisen
  > nuraghe-kulttuurin kivitorneja — tuhansia, ympäri saarta.

- **Lähde:** en-Wikipedia "Sardinia", johdanto ("the second largest
  island in the Mediterranean Sea after Sicily"; "Sardinia's indigenous
  language... recognized by both regional and national law as two of
  Italy's twelve official linguistic minorities"; "Owing to its varied
  ecosystems, which include mountains, woods, plains, streams, rocky
  coasts, and long sandy beaches, Sardinia has been metaphorically
  described as a micro-continent... which retain vestiges of the
  prehistoric Nuragic civilization").
- **Kuva:** Commons **Nuraghe Su Nuraxi - Barumini - Sardinia - Italy -
  07.jpg** (6760×4512, CC BY-SA 3.0, Norbert Nagel, 2013).
- **HUOM:** "tuhansia" nuragheja on yleistieto; en-artikkelin johdanto
  puhuu vain jäänteistä. Jos tarkka luku halutaan peliin, se on haettava
  erikseen artikkelista "Nuraghe" — tässä erässä sitä EI tarkistettu,
  joten pelitekstiin riittää "kivitorneja ympäri saarta".

---

## Hylätyt / harkintaan jätetyt

- **Amalfin rannikko** (40,65°N, 14,6°E — koordinaatit tarkistettu):
  kaunis ja tunnettu, mutta menee sisällöllisesti päällekkäin
  kohteiden Capri (5) ja Napoli (3) kanssa samalla lahdella. Jätetty
  varapenkille, jos kohteita halutaan enemmän kuin neljätoista.
- **Bologna** (44,4939°N, 11,3428°E) ja **Genova** (44,4072°N,
  8,9339°E): koordinaatit tarkistettu ja tallessa, mutta kummallekaan
  ei löytynyt tässä erässä popup-tekstin arvoista yhden asian koukkua,
  joka ei olisi oppikirjafaktaa. Ei mukaan tähän erään.
- **Assisi, Verona, Siena, Gardajärvi:** ei haettu tässä erässä.
  Jos kartta kaipaa lisää pisteitä Keski-Italiaan, ne ovat ilmeisimmät
  seuraavat.

## Yhteenveto

**14 kohdetta, kaikki koordinaatit ja kaikki kuvat tarkistettu
rajapinnasta.** Kaksi koordinaattia vaati kiertotien (Matera → Sassi
di Matera; Cinque Terre → toinen yritys, ristiintarkistettu kahdella
kylällä), ja kaksi on tarkoituksella likiarvoja (Sardinia = saaren
keskipiste, Po = joen suu) — molemmat merkitty kohteen kohdalle.

**Kolme parasta ehdotustani:**

1. **#5 Capri ja Sininen luola.** Ainoa kohde, jonka kuva on
   *isoisän aikakaudelta*: Albert Bierstadtin maalaus luolasta
   vuosilta 1857–1860, public domain, eli pelaaja näkee tasan sen
   näkymän, joka 1873 oli muodissa. Sisältö on kaksitasoinen —
   keisari, joka hallitsi valtakuntaa saarelta, ja luola, joka
   "löydettiin uudelleen" vasta 1826 — eli sekä antiikkia että isoisän
   omaa vuosisataa samassa ruudussa. Fokusmoodin kohdekorostukseen
   täydellinen: yksi piste, kaksi aikakautta.

2. **#11 Torino.** Vahvin puhtaasti 1873-kytköksinen kohde koko
   listalla. Kaupunki oli juuri (1865) menettänyt pääkaupunkiasemansa,
   ja sen tunnusrakennus oli isoisän käydessä keskeneräinen työmaa,
   joka oli aloitettu synagogana ja josta tuli lopulta elokuvamuseo.
   Tämä on juuri sitä 13+ -aineistoa, joka tekee kartasta ajassa
   elävän eikä museon: kohde, joka oli tekeillä silloin kun päiväkirja
   kirjoitettiin.

3. **#1 Vesuvius yhdessä #2 Pompejin kanssa.** Suosittelen näitä
   parina, ei erikseen: Vesuvius purkautui **1872**, vuosi ennen
   isoisän matkaa, ja Pompejin oma museo rakennettiin **1873–1874**,
   tasan matkavuonna. Kaksi kohdetta, kaksi tarkistettua
   päivämäärää, jotka molemmat osuvat päiväkirjan vuoteen — ja
   valittu kuva (Forum ja Vesuvius samassa kehyksessä) näyttää ne
   yhtenä maisemana. Aarrepeliin sopii lisäksi se, että Fiorellin
   keksintö oli tapa saada tyhjästä onkalosta esiin se, mikä siellä
   oli ollut: sama teko kuin aarteenetsinnässä.
