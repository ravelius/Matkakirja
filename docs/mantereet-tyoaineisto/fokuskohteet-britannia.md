PANKISSA: käytetään kun matka etenee Britanniaan.

# Britannian fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 24.8.2026.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohta
KOHDEKOROSTUS/ETENEMINEN): pelilaatan (Lontoo) lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen
kohteen niukalla taustalla ja avaa pienen pop-up-tietoruudun.
Tämä dokumentti on faktapohja niille pop-up-teksteille — ei
lopullista pelitekstiä eikä UI-suunnitelmaa. Malli ja taso:
docs/mantereet-tyoaineisto/fokuskohteet-kreikka.md.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 24.8.2026
  curlilla, kaikki 14 kohdetta (plus vertailuksi Lontoo) yhdessä
  eräajossa. Rajapinta ei tällä kertaa palauttanut yhtään 429:ää
  koordinaattihaussa — kaikki koordinaatit saatiin kerralla läpi.
  EI yhtään koordinaattia muistista.
- **Popup-faktat:** en-Wikipedian artikkeleista, `action=query&
  prop=extracts&explaintext=1` (johdanto-osa ensin, tarvittaessa
  koko artikkelin tekstistä haettu tarkempi kohta samalla
  rajapinnalla, haettu erikseen per artikkeli). Rajapinta antoi
  ajoittain "too many requests" -vastauksia täyteen tekstiin
  haettaessa — kaikki saatiin läpi kasvavalla uusintaviiveellä
  (5 s → 10 s → 20 s...). Jokaisen nostetun faktan kohdalla alla on
  merkitty artikkeli JA mihin kohtaan artikkelia se nojaa (johdanto/
  History/nimetty alaotsikko).
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`action=query&titles=...&redirects=1`) hakemalla ehdokasotsikko
  ja seuraamalla uudelleenohjaus perille asti. Yhdessä tapauksessa
  ehdokasnimi ohjautui toiselle sanamuodolle kuin oletettiin
  (Hadrianuksen muuri → Hadrianuksen valli) — ks. huomio kohteessa.
- **Commons-kuvakategoriat:** tarkistettu `action=query&
  prop=categoryinfo` commons.wikimedia.orgista, EI arvattu. Yhdessä
  tapauksessa ilmeisin kategorianimi osoittautui käytännössä
  sisällöttömäksi kokoomakategoriaksi — merkitty selvästi kohteen
  yhteyteen, ei peitelty.
- Kaikki lähteet en-Wikipediasta paitsi nimien vahvistus
  fi-Wikipediasta ja kuvakategoriat Commonsista. Ei muita hakuja.
- **Runko:** koordinaattorin ehdottama 14 kohteen runko (Edinburgh,
  Manchester, Liverpool, Oxford, Cambridge, Bath, Thames, Ben Nevis,
  Loch Ness, Snowdon, Englannin kanaali, Doverin valkoiset kalliot,
  Hadrianuksen valli, Stonehenge) pidettiin sellaisenaan — se antoi
  jo hyvän tyyppijakauman (6 kaupunkia, 2 vuorta, joki, järvi,
  kanaali/salmi, 3 erikoiskohdetta) ja jokaiselle löytyi vahva,
  lähteistetty 1873-kytkentä tai muu täkymäinen tarina, joten
  perusteltua muokkaustarvetta ei syntynyt.

---

## Kohteet

### 1. Edinburgh

- **Nimi:** Edinburgh (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Edinburgh (englanniksi), skotlanninkielinen Gaeli: Dùn Èideann.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 55,95333°N, -3,18917°E — en-Wikipedia "Edinburgh"
  (coordinates-rajapinta, coprop=type: adm2nd).
- **Popup-teksti (439 merkkiä):**

  > Edinburghia on 1800-luvun alusta kutsuttu "Pohjolan Ateenaksi" –
  > vertaus syntyi paluumatkalaisten huomiosta, että linnavuori
  > muistutti Akropolista. Vuonna 1822 maalari Hugh William Williams
  > ripusti näyttelyyn Ateenan- ja Edinburgh-maisemia rinnakkain, ja
  > idea löi läpi: Calton Hillille suunniteltu Kansallismonumentti
  > kopioitiin suoraan Parthenonista. Isoisä, joka oli juuri
  > matkannut oikeassa Ateenassa, olisi tunnistanut vertauksen heti.

- **Lähde:** en-Wikipedia "Edinburgh", osio "Nicknames" (lempinimi
  "Athens of the North" yleistynyt 1800-luvun alusta, varhaisempia
  viittauksia "Athens of Britain" jo 1760-luvulta, vertaus nähtiin
  sekä topografisena että henkisenä, Linnavuori muistutti
  paluumatkalaisia Akropoliista, Hugh William Williamsin 1822
  näyttely rinnasti Ateenan- ja Edinburgh-maisemat, Calton Hillin
  Kansallismonumentin suunnittelu kopioi suoraan Parthenonin).
  Viimeinen virke (mitä isoisä olisi tunnistanut) oma päätelmäni
  pelin Kreikka-kaaren jatkumosta, ei Wikipedian väite.
- **Commons:** Category:Edinburgh — tarkistettu, 909 tiedostoa,
  33 alikategoriaa. Kunnossa.

### 2. Manchester

- **Nimi:** Manchester (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Manchester.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 53,48°N, -2,25°E — en-Wikipedia "Manchester"
  (coprop=type: adm2nd).
- **Popup-teksti (411 merkkiä):**

  > Manchester oli maailman ensimmäinen teollistunut kaupunki ja
  > tunnettiin lempinimellä "Cottonopolis" – puuvillan
  > maailmanmarkkinapaikka, jonka tehtaista Friedrich Engels
  > kirjoitti kuuluisan kuvauksensa työväenluokan oloista. Vain
  > viisi vuotta ennen isoisän matkaa, 1868, kaupungin mekaanikkojen
  > instituutissa pidettiin ensimmäinen ammattiyhdistysten
  > yleiskokous (Trades Union Congress) – ay-liikkeen syntyhetki.

- **Lähde:** en-Wikipedia "Manchester", johdanto-osa ("maailman
  ensimmäinen teollistunut kaupunki") ja osio "History" (lempinimet
  "Cottonopolis" ja "Warehouse City" viktoriaanisella kaudella,
  Friedrich Engelsin teos "The Condition of the Working Class in
  England" 1844 perustuu osin Manchesteriin, ensimmäinen Trades
  Union Congress pidettiin Manchesterin Mechanics' Institutessa
  1868).
- **Commons:** Category:Manchester — tarkistettu, 103 tiedostoa,
  18 alikategoriaa. Kunnossa.

### 3. Liverpool

- **Nimi:** Liverpool (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Liverpool.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 53,4072°N, -2,9917°E — en-Wikipedia "Liverpool"
  (coprop=type: adm2nd).
- **Popup-teksti (400 merkkiä):**

  > Liverpool oli 1873 maailman vilkkaimpia satamia ja Britannian
  > tärkeä siirtolaisten lähtöportti Pohjois-Amerikkaan. Vuonna 1830
  > kaupungista avattiin maailman ensimmäinen kaupunkien välinen
  > rautatie, Liverpool–Manchester-rata. Satamaa oli aiemmin
  > rikastuttanut myös Atlantin orjakauppa, jossa Liverpool oli
  > 1700-luvun lopulla Euroopan vilkkain kauppapaikka – synkkä puoli
  > samasta kaupallisesta noususta.

- **Lähde:** en-Wikipedia "Liverpool", johdanto-osa (satama oli
  merkittävä lähtöpiste englantilaisille ja irlantilaisille
  siirtolaisille Pohjois-Amerikkaan, kaupunki nousi maailman
  taloudellisesti merkittäväksi teollisen vallankumouksen
  eturintamassa 1800-luvulla, koti maailman ensimmäiselle
  kaupunkien väliselle rautatielle) ja osio "History" (Liverpool
  oli 1700-luvun lopulla Atlantin orjakaupan suhteen Euroopan
  vilkkain satamakaupunki).
- **Commons:** Category:Liverpool — tarkistettu, 1272 tiedostoa,
  37 alikategoriaa. Kunnossa.

### 4. Oxford

- **Nimi:** Oxford (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Oxford.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 51,75194°N, -1,25778°E — en-Wikipedia "Oxford"
  (coprop=type: city).
- **Popup-teksti (374 merkkiä):**

  > Oxfordin yliopisto on englanninkielisen maailman vanhin. Vuonna
  > 1209 riita paikallisten kanssa sai osan opiskelijoista ja
  > opettajista pakenemaan kaupungista – he perustivat kilpailevan
  > yliopiston Cambridgeen. Kaupunki sijaitsee Thamesin
  > (paikallisesti Isis) ja Cherwellin yhtymäkohdassa, ja siitä tuli
  > virallisesti kaupunki vasta 1542, vaikka se perustettiin jo
  > 700-luvulla.

- **Lähde:** en-Wikipedia "Oxford", johdanto-osa (Oxfordin yliopisto
  on englanninkielisen maailman vanhin, kaupunki Thamesin —
  paikallisesti Isis — ja Cherwellin yhtymäkohdassa, kaupunki
  perustettu 700-luvulla, kaupunkioikeudet 1542) ja en-Wikipedia
  "University of Cambridge", johdanto-osa (Cambridgen yliopiston
  perustaminen seurasi kiistaa, jonka jäljiltä oxfordilaisia
  opiskelijoita muutti Cambridgeen 1209).
- **Commons: KATEGORIANIMI ONGELMALLINEN.** "Category:Oxford" on
  olemassa mutta käytännössä TYHJÄ suoraan (0 tiedostoa, 25
  alikategoriaa — pelkkä kokoomakategoria). Todellinen
  sisältökategoria on **Category:City of Oxford** — tarkistettu,
  63 tiedostoa, 6 alikategoriaa. Kunnossa, mutta käytä TÄTÄ nimeä
  äläkä paljasta "Category:Oxford":ia. (Vaihtoehto, jos halutaan
  keskittyä yliopistorakennuksiin: Category:University of Oxford,
  202 tiedostoa, 34 alikategoriaa — myös tarkistettu, kunnossa.)

### 5. Cambridge

- **Nimi:** Cambridge (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Cambridge.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 52,205°N, 0,1225°E — en-Wikipedia "Cambridge"
  (coprop=type: adm3rd).
- **Popup-teksti (362 merkkiä):**

  > Cambridgen yliopisto syntyi vuonna 1209, kun joukko
  > oxfordilaisia opiskelijoita ja opettajia pakeni kaupunkilaisten
  > kanssa syttyneen riidan jäljiltä Cambridgeen ja perusti sinne
  > uuden oppilaitoksen. Kuninkaallisen peruskirjan yliopisto sai
  > 1231. Nykyään Cambridge ja Oxford tunnetaan yhteisnimellä
  > Oxbridge, vaikka niitä pidetään myös perinteisinä kilpailijoina.

- **Lähde:** en-Wikipedia "University of Cambridge", johdanto-osa
  (perustaminen 1209 seurasi oxfordilaisten opiskelijoiden pakoa
  kaupunkilaisten kanssa syttyneen kiistan jäljiltä, kuninkaallinen
  peruskirja 1231, yliopistot tunnetaan yhdessä nimellä Oxbridge ja
  niitä kuvataan toisinaan kilpailijoiksi) ja en-Wikipedia
  "Cambridge", johdanto-osa (kaupungin sijainti River Camin
  varrella, ensimmäiset kaupunkioikeudet 1100-luvulla).
- **Commons:** Category:Cambridge — tarkistettu, 286 tiedostoa,
  36 alikategoriaa. Kunnossa.

### 6. Bath

- **Nimi:** Bath (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Bath.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 51,3814°N, -2,3597°E — en-Wikipedia
  "Bath, Somerset".
- **Popup-teksti (372 merkkiä):**

  > Roomalaiset rakensivat kylpylän ja temppelin Bathiin noin
  > vuonna 60 jaa. ja nimesivät paikan Aquae Sulikseksi paikallisen
  > jumalattaren mukaan. 1600-luvulla veden uskottiin parantavan
  > sairauksia, ja kaupungista tuli georgiaanisen ajan
  > muotispakylä – Beau Nash hallitsi sen seuraelämää 1705–1761.
  > Jane Austen asui kaupungissa 1800-luvun alussa, muttei koskaan
  > pitänyt siitä.

- **Lähde:** en-Wikipedia "Bath, Somerset", johdanto-osa (kylpylä
  nimeltä Aquae Sulis n. 60 jaa., roomalaiset rakensivat kylvyt ja
  temppelin River Avonin laaksoon) ja osio "History" (1600-luvulla
  esitettiin väitteitä lähdeveden parantavista ominaisuuksista,
  Bathista tuli suosittu kylpyläkaupunki georgiaanisella kaudella,
  Beau Nash hallitsi kaupungin seuraelämää 1705–1761, Jane Austen
  asui Bathissa 1800-luvun alussa eikä koskaan pitänyt kaupungista
  — sitaatti kirjeestä Cassandralle).
- **Commons:** Category:Bath, Somerset — tarkistettu, 44 tiedostoa,
  28 alikategoriaa. Kunnossa, mutta huomaa pilkullinen nimimuoto
  (ei paljas "Category:Bath").

### 7. Thames (Thames-joki)

- **Nimi:** Thames (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  River Thames, paikoin myös "Isis".
- **Tyyppi:** joki.
- **Koordinaatit:** 51,5°N, 0,61°E — en-Wikipedia "River Thames"
  (coordinates-rajapinta). **HUOM:** tämä on artikkelin
  yleiskoordinaatti (suistoalueella), ei tarkka piste millään
  yksittäisellä jokiosuudella — samantyyppinen karkeus kuin
  Kreikka-tiedoston merillä.
- **Popup-teksti (448 merkkiä):**

  > Thames on Englannin pisin joki, 346 kilometriä, ja virtaa
  > Oxfordin (missä sitä kutsutaan nimellä Isis), Lontoon ja
  > Themsin suiston kautta Pohjanmereen. Vuoden 1858 "Suuren
  > löyhkän" aikana joen saastuminen ajoi parlamentin istunnot
  > tauolle. Seurauksena insinööri Joseph Bazalgette rakensi
  > Lontoon rannoille valtavat viemäriverkostot – juuri sellaista
  > viktoriaanisen ajan suurinsinöörityötä, jota isoisä olisi
  > nähnyt rakenteilla 1870-luvun Lontoossa.

- **Lähde:** en-Wikipedia "River Thames", johdanto-osa (pituus
  346 km/215 mailia, Englannin pisin joki kokonaan Englannin
  alueella, kulkee Oxfordin — missä sitä toisinaan kutsutaan
  Isikseksi —, Readingin, Henley-on-Thamesin ja Windsorin kautta,
  laskee Pohjanmereen Themsin suiston kautta) ja osio "History"
  ("Great Stink" 1858 pysäytti parlamentin istunnot Westminsterissä
  joen saastumisen vuoksi, minkä seurauksena insinööri Joseph
  Bazalgetten johdolla rakennettiin massiiviset viemäriverkostot
  joen pohjois- ja etelärannoille).
  **HUOM (lähdetarkkuus):** artikkeli ei mainitse tarkkaa
  valmistumisvuotta viemäriverkostolle — siksi tekstissä puhutaan
  vain "rakenteilla 1870-luvulla" eikä väitetä hanketta valmiiksi
  isoisän matkan aikaan. Tarkkaa vuotta ei ole tässä varmennettu.
- **Commons:** Category:River Thames — tarkistettu, 2 tiedostoa
  suoraan, 24 alikategoriaa (esim. maantieteellisesti osuuksittain
  jaoteltuja alikategorioita). Kunnossa jäsennellyn
  pääkategoriarakenteen mielessä, mutta sisältö on alikategorioissa
  eikä suoraan tässä kategoriassa — kuvitusvaiheessa kannattaa
  valita tarkempi alikategoria (esim. tietty jokiosuus tai
  kaupunki).

### 8. Ben Nevis

- **Nimi:** Ben Nevis (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Ben Nevis, skotlanninkielinen Gaeli: Beinn Nibheis.
- **Tyyppi:** vuori.
- **Koordinaatit:** 56,79685°N, -5,003508°E — en-Wikipedia
  "Ben Nevis" (coprop=type: mountain).
- **Popup-teksti (378 merkkiä):**

  > Ben Nevis on Britannian korkein vuori, minkä brittiläinen
  > maanmittauslaitos vahvisti vasta 1847. Ensimmäinen tunnettu
  > nousu tehtiin 1771, ja runsas vuosikymmen isoisän matkan
  > jälkeen, 1883, huipulle avattiin sääasema, jota miehitettiin
  > ympäri vuoden vuoteen 1904 asti. Isoisän vieraillessa 1873
  > huipulle ei vielä johtanut polkuakaan – se rakennettiin vasta
  > observatorion mukana.

- **Lähde:** en-Wikipedia "Ben Nevis", johdanto-osa (korkein vuori
  Skotlannissa, Britanniassa ja Brittein saarilla) ja osio
  "History" (ensimmäinen kirjattu nousu 17.8.1771, Ordnance Survey
  vahvisti Ben Nevisin korkeimmaksi vuoreksi vasta 1847,
  sääasema avattiin 17.10.1883 ja oli miehitetty jatkuvasti vuoteen
  1904 asti, ensimmäinen polku huipulle rakennettiin samaan aikaan
  observatorion kanssa).
- **Commons:** Category:Ben Nevis — tarkistettu, 348 tiedostoa,
  14 alikategoriaa. Kunnossa.

### 9. Loch Ness

- **Nimi:** Loch Ness (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Loch Ness, skotlanninkielinen Gaeli: Loch Nis.
- **Tyyppi:** järvi.
- **Koordinaatit:** 57,3°N, -4,45°E — en-Wikipedia "Loch Ness"
  (coordinates-rajapinta, coprop=type: waterbody). **HUOM:** karkea
  yleispiste, ei tarkka klikkauspiste.
- **Popup-teksti (356 merkkiä):**

  > Loch Ness on tilavuudeltaan Britannian suurin järvi – sen
  > vesimäärä ylittää kaikkien Englannin ja Walesin järvien
  > yhteismäärän. Se on osa insinööri Thomas Telfordin 1800-luvun
  > alussa rakentamaa Caledonian-kanavaa. Kuuluisa hirviölegenda
  > "Nessie" syntyi vasta 1933, kuusikymmentä vuotta isoisän matkan
  > jälkeen – 1873 kukaan ei vielä ollut kuullutkaan siitä.

- **Lähde:** en-Wikipedia "Loch Ness", johdanto-osa (suurin järvi
  vesitilavuudeltaan koko Brittein saarilla, sisältää enemmän vettä
  kuin kaikki Englannin ja Walesin järvet yhteensä, osa Caledonian
  Canalia joka rakennettiin 1800-luvun alussa insinööri Thomas
  Telfordin toimesta) ja osio "Loch Ness Monster" (hirviölegenda
  tuli maailman tietoisuuteen vasta 1933).
- **Commons:** Category:Loch Ness — tarkistettu, 602 tiedostoa,
  11 alikategoriaa. Kunnossa.

### 10. Snowdon

- **Nimi:** Snowdon (fi-Wikipedia, ei uudelleenohjausta). Paikallinen
  (kymri): Yr Wyddfa.
- **Tyyppi:** vuori.
- **Koordinaatit:** 53,06850°N, -4,07623°E — en-Wikipedia "Snowdon"
  (coprop=type: mountain).
- **Popup-teksti (320 merkkiä):**

  > Snowdon eli walesiksi Yr Wyddfa on Walesin ja Englannin korkein
  > vuori Skotlannin ylämaiden eteläpuolella. Isoisän vieraillessa
  > 1873 huipulle pääsi vain kävellen – hammasratasrautatie avattiin
  > vasta 1896. Vuorella toimi tuolloin yhä liuskekivilouhos Cwm
  > Llanin laaksossa, joka suljettiin 1882 kuljetuskustannusten
  > vuoksi.

- **Lähde:** en-Wikipedia "Snowdon", johdanto-osa (Yr Wyddfa on
  walesinkielinen nimi, korkein vuori Walesissa ja Brittein
  saarilla Skotlannin ylämaiden eteläpuolella, Snowdon Mountain
  Railway avattu 1896) ja osio "South ridge — Rhyd Ddu Path/Cwm
  Llan" (South Snowdon Slate Works -louhos Cwm Llanin laaksossa
  avattiin 1840 ja suljettiin 1882 kuljetuskustannusten vuoksi).
- **Commons:** Category:Snowdon — tarkistettu, 585 tiedostoa,
  20 alikategoriaa. Kunnossa.

### 11. Englannin kanaali

- **Nimi:** Englannin kanaali (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: English Channel / la Manche (ranskaksi).
- **Tyyppi:** salmi/meri (kapea merisalmi, ei kanava — nimestä
  huolimatta luonnonmuodostuma).
- **Koordinaatit:** 50,2°N, -2°E — en-Wikipedia "English Channel"
  (coordinates-rajapinta, coprop=type: waterbody). **HUOM:** karkea
  yleispiste kuten Kreikka-tiedoston merillä.
- **Popup-teksti (379 merkkiä):**

  > Englannin kanaali erottaa Etelä-Englannin Ranskasta ja on
  > maailman vilkkain laivaväylä. Kapein kohta, Doverinsalmi, on
  > vain 34 kilometriä leveä. Kaksi vuotta isoisän matkan jälkeen,
  > elokuussa 1875, kapteeni Matthew Webb ui ensimmäisenä
  > historiassa kanaalin yli ilman apuvälineitä – 21 tuntia ja 45
  > minuuttia Doverista Ranskaan. Vuonna 1873 kukaan ei vielä ollut
  > onnistunut siinä.

- **Lähde:** en-Wikipedia "English Channel", johdanto-osa (Atlantin
  valtameren haara Etelä-Englannin ja Pohjois-Ranskan välissä,
  maailman vilkkain laivaväylä, kapeimmillaan 34 km Doverinsalmessa)
  ja osio "By swimming" (Matthew Webb teki ensimmäisen havaitun ja
  ilman apuvälineitä tehdyn uinnin Doverinsalmen yli 24.–25.8.1875,
  kesto 21 h 45 min).
- **Commons:** Category:English Channel — tarkistettu, 194
  tiedostoa, 33 alikategoriaa. Kunnossa.

### 12. Doverin valkoiset kalliot

- **Nimi:** Doverin valkoiset kalliot (fi-Wikipedia, ei
  uudelleenohjausta). Paikallinen: White Cliffs of Dover.
- **Tyyppi:** muu (rannikon kalliomuodostuma/maamerkki).
- **Koordinaatit:** 51,10778°N, 1,27861°E — en-Wikipedia
  "White Cliffs of Dover" (coprop=type: landmark).
- **Popup-teksti (398 merkkiä):**

  > Doverin valkoiset kalliot kohoavat 110 metrin korkeuteen
  > liitukalliona, jota mustat piikivijuovat koristavat. Ne
  > merkitsevät kohtaa, jossa Britannia on lähimpänä mannermaata –
  > kirkkaalla säällä Ranska näkyy 32 kilometrin päähän. Julius
  > Caesar mainitsi niiden vaikuttavan ulkonäön hyökätessään
  > Britanniaan 55 eaa., ja Dover Castle rakennettiin 1000-luvulla
  > vahvistamaan luonnollista puolustuslinjaa.

- **Lähde:** en-Wikipedia "White Cliffs of Dover", johdanto-osa
  (kalliot kohoavat 350 jalan/110 metrin korkeuteen, liitukiveä
  mustin piikivijuovin, merkitsevät Britannian lähintä kohtaa
  mannermaahan, kirkkaalla säällä Ranska näkyy n. 20 mailin/32 km
  päähän, Julius Caesar mainitsi kallioiden ulkonäön 55 eaa.
  hyökätessään Britanniaan, Dover Castle rakennettiin 1000-luvulla
  vahvistamaan luonnollista puolustuslinjaa).
- **Commons:** Category:White Cliffs of Dover — tarkistettu, 574
  tiedostoa, 10 alikategoriaa. Kunnossa.

### 13. Hadrianuksen valli

- **Nimi:** Hadrianuksen valli (fi-Wikipedia). **HUOM:**
  ehdokasnimi "Hadrianuksen muuri" OHJAUTUU fi-Wikipediassa
  artikkeliin "Hadrianuksen valli" — oikea kirjoitusasu on siis
  "valli", ei "muuri". Paikallinen: Hadrian's Wall.
- **Tyyppi:** muu (roomalainen raja-/puolustusrakennelma).
- **Koordinaatit:** 55,01667°N, -2,28333°E — en-Wikipedia
  "Hadrian's Wall" (coprop=type: landmark). **HUOM:** vallin
  pituus on 73 mailia/117,5 km, joten piste on yleispiste jollain
  kohtaa vallin linjaa, ei tarkka yksittäinen kohde — samantyyppinen
  karkeus kuin Kreikka-tiedoston merillä.
- **Popup-teksti (434 merkkiä):**

  > Keisari Hadrianuksen käskystä alettiin 122 jaa. rakentaa 117,5
  > kilometrin pituista kivimuuria Rooman Britannian
  > pohjoisrajalle. Suurin osa kivistä purettiin myöhemmin teiden ja
  > talojen rakennusaineeksi. Isoisän aikaan vallia ehostettiin
  > parhaillaan: newcastlelainen asianajaja John Clayton oli
  > 1830-luvulta lähtien ostanut maita vallin ympäriltä ja
  > kaivattanut sekä kunnostuttanut sitä omalla kustannuksellaan –
  > työ jatkui vielä 1873.

- **Lähde:** en-Wikipedia "Hadrian's Wall", johdanto-osa (rakennus
  alkoi 122 jaa. keisari Hadrianuksen aikana, pituus 73 mailia/
  117,5 km, kiveä käytettiin myöhemmin uudelleen paikallisissa
  rakennuksissa) ja osio "Preservation by John Clayton" (John
  Clayton, koulutukseltaan lakimies ja Newcastlen kaupunginlakimies
  1830-luvulta, alkoi 1834 ostaa maata Steel Riggin seudulta
  estääkseen maanviljelijöitä viemästä vallin kiviä, kaivautti
  Cilurnumin linnoituksen ja Housesteadsin kohteita, käytti
  tilojensa tuloja vallin kunnostustyöhön, työntekijät kunnostivat
  osia vallista tyypillisesti seitsemän kivikerroksen korkeuteen).
  **HUOM (ajoitus):** artikkeli ei anna tarkkaa päättymisvuotta
  Claytonin työlle (hän kuoli 1890) — "työ jatkui vielä 1873" on
  looginen päätelmä aikajanasta (työ alkoi 1834, jatkui pitkälle
  1800-luvun loppupuolelle), ei suora Wikipedia-lainaus tarkasta
  vuodesta 1873.
- **Commons:** Category:Hadrian's Wall — tarkistettu, 867 tiedostoa,
  28 alikategoriaa. Kunnossa.

### 14. Stonehenge

- **Nimi:** Stonehenge (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Stonehenge.
- **Tyyppi:** muu (esihistoriallinen kivimonumentti).
- **Koordinaatit:** 51,17889°N, -1,82611°E — en-Wikipedia
  "Stonehenge" (coprop=type: landmark).
- **Popup-teksti (388 merkkiä):**

  > Stonehenge rakennettiin vaiheittain noin 3100–1600 eaa., ja sen
  > kuuluisa suurten kivien kehä on peräisin ajalta 2600–2400 eaa.
  > Isoisän vieraillessa 1873 monumentti oli yhä yksityisomistuksessa
  > Antrobus-suvulla eikä sitä ollut aidattu eikä laillisesti
  > suojeltu – suojelulaki säädettiin vasta 1882. 1800-luvulla
  > matkailijat hakkasivat kivistä sirpaleita muistoksi taltoilla,
  > aivan vapaasti.

- **Lähde:** en-Wikipedia "Stonehenge", johdanto-osa (rakennettu
  vaiheittain n. 3100 eaa.–1600 eaa., suurten sarsenikivien kehä
  asetettu 2600–2400 eaa. välillä, lailliseksi suojelluksi
  monumentiksi tuli vasta Ancient Monuments Protection Act
  1882 -lain myötä) ja osio "Sixteenth century to present" (Antrobus-
  suku Cheshiresta osti tilan 1824; se pysyi suvun omistuksessa
  vuoteen 1915 asti, jolloin se myytiin huutokaupalla) sekä osio
  "Vandalism" (1800-luvulla matkailijat hakkasivat taltoilla
  kivistä palasia muistoiksi; aitaus pystytettiin vasta 1978
  alkaen).
- **Commons:** Category:Stonehenge — tarkistettu, 1029 tiedostoa,
  14 alikategoriaa. Kunnossa.

---

## Yhteenveto: koordinaattitaulukko

| # | Kohde | Tyyppi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|---|
| 1 | Edinburgh | kaupunki | 55,95333°N -3,18917°E | Edinburgh |
| 2 | Manchester | kaupunki | 53,48°N -2,25°E | Manchester |
| 3 | Liverpool | kaupunki | 53,4072°N -2,9917°E | Liverpool |
| 4 | Oxford | kaupunki | 51,75194°N -1,25778°E | Oxford |
| 5 | Cambridge | kaupunki | 52,205°N 0,1225°E | Cambridge |
| 6 | Bath | kaupunki | 51,3814°N -2,3597°E | Bath, Somerset |
| 7 | Thames | joki | 51,5°N 0,61°E (yleispiste) | River Thames |
| 8 | Ben Nevis | vuori | 56,79685°N -5,003508°E | Ben Nevis |
| 9 | Loch Ness | järvi | 57,3°N -4,45°E (yleispiste) | Loch Ness |
| 10 | Snowdon | vuori | 53,06850°N -4,07623°E | Snowdon |
| 11 | Englannin kanaali | salmi/meri | 50,2°N -2°E (yleispiste) | English Channel |
| 12 | Doverin valkoiset kalliot | muu | 51,10778°N 1,27861°E | White Cliffs of Dover |
| 13 | Hadrianuksen valli | muu | 55,01667°N -2,28333°E (yleispiste) | Hadrian's Wall |
| 14 | Stonehenge | muu | 51,17889°N -1,82611°E | Stonehenge |

(Vertailuksi peliaatta Lontoo: 51,50722°N -0,1275°E —
en-Wikipedia "London", ei oma kohde tässä listassa vaan pelilaatta
itse.)

---

## Hylätyt / epävarmat

1. **Thames-joen popup-tekstin viemäriverkoston valmistumisvuosi
   jätettiin tarkoituksella avoimeksi.** En-Wikipedian "River
   Thames" -artikkeli kuvaa Bazalgetten viemärihanketta yleisesti
   "Great Stinkin" (1858) seurauksena, muttei anna tarkkaa
   valmistumisvuotta. Tekstissä puhutaan siksi vain "rakenteilla
   1870-luvulla" eikä väitetä hanketta valmiiksi juuri 1873 —
   jos kirjoitusvaiheessa halutaan tarkempi vuosiluku (esim.
   pääjärjestelmän valmistuminen), se on varmennettava erikseen
   toisesta lähteestä, ei tästä faktapohjasta.

2. **Hadrianuksen vallin popup-tekstin väite "työ jatkui vielä
   1873" on looginen päätelmä**, ei suora Wikipedia-lainaus.
   Artikkeli kertoo John Claytonin aloittaneen maanostot 1834 ja
   kunnostustyöt sen jälkeen, mutta ei anna tarkkaa päättymisvuotta
   (Clayton kuoli vasta 1890). Päättely on todennäköinen mutta
   ei suoraan lähteistetty vuodelle 1873 asti.

3. **Thamesin ja Hadrianuksen vallin koordinaatit ovat karkeita
   yleispisteitä**, eivät täsmäpisteitä — samaan tapaan kuin
   Kreikka-tiedoston Egeanmeri/Joonianmeri. Jos peli tarvitsee
   tarkan klikkauspisteen, sellainen on valittava
   pelisuunnittelullisin perustein (esim. Thamesille Lontoon kohta,
   Hadrianuksen vallille tunnetuin osuus kuten Housesteads), ei
   tästä faktapohjasta.

4. **Oxfordin Commons-kuvakategoria oli käytännössä tyhjä
   kokoomakategoria** (ks. kohta 4) — "Category:Oxford" on olemassa
   mutta ilman suoria tiedostoja. Käytä sen sijaan
   "Category:City of Oxford" (tai tarvittaessa
   "Category:University of Oxford"), molemmat tarkistettu ja
   kunnossa.

5. **Thames-joen Commons-kuvakategoria on rakenteeltaan
   kokoomakategoria** (2 tiedostoa suoraan, 24 alikategoriaa) —
   ei virhe kuten Oxfordin tapauksessa, mutta kuvitusvaiheessa
   kannattaa poimia tarkempi alikategoria (esim. tietty
   jokiosuus tai kaupunki) suoran kategorian sijaan.

6. **Greenwichin nollameridiaani jätettiin pois omana kohteena**,
   vaikka koordinaattori nosti sen esiin hyvänä 1873-tarinana
   (meridiaani virallistettiin kansainvälisesti vasta 1884,
   yksitoista vuotta isoisän matkan jälkeen). EI VARMENNETTU tässä
   erässä — ei ehditty tarkistaa en-Wikipediasta Greenwichin
   observatorion artikkelia erikseen, koska annettu 14 kohteen
   runko täyttyi jo muilla kohteilla vahvoin 1873-kytkennöin.
   Vahva ehdokas tulevaan laajennukseen tai Lontoo-pelilaatan
   omaan popup-tekstiin (ei fokusnäkymän erilliseksi kartta-
   kohteeksi, koska sijaitsee Lontoossa/pelilaatalla).

7. **Lontoon maanalainen (avattiin 1863) jätettiin pois omana
   kohteena** samasta syystä kuin Greenwich — vahva 1873-hetkeen
   sopiva "kymmenen vuotta sitten avattu" -tarina, mutta kuuluisi
   luontevammin Lontoo-pelilaatan omaan sisältöön kuin
   fokusnäkymän erilliseksi karttakohteeksi, eikä sitä ehditty
   varmentaa tässä erässä. EI VARMENNETTU, ei mukana kohteina
   1–14.

8. **Roomalaisten Bathin kylpylän (Roman Baths) tarkkaa
   uudelleenlöytymis-/kaivausvuotta ei löytynyt käytetystä
   "Bath, Somerset" -artikkelista.** Yleistiedossa liikkuu tieto
   kaivausten alkamisesta 1870-luvun lopulla, mikä olisi ollut
   erinomainen 1873-läheinen "Corinth Canal -tyylinen" tarina,
   mutta koska en-Wikipedian artikkeli ei tätä vuosilukua maininnut
   haetussa tekstissä, väitettä EI otettu popup-tekstiin. Jos
   kirjoitusvaiheessa halutaan tämä yksityiskohta, se on
   varmennettava erikseen (esim. artikkelista "Roman Baths (Bath)").

9. **Sparta-tyylistä päällekkäisyyttä ei syntynyt** — toisin kuin
   Kreikka-tiedoston Taygetos/Sparta-tapauksessa, tämän listan 14
   kohdetta eivät toistaneet toistensa ydintarinoita (Oxford ja
   Cambridge jakavat saman 1209-perustamistarinan, mutta kummankin
   kaupungin popup-teksti painottaa eri näkökulmaa: Oxford lähtöä,
   Cambridge saapumista/uutta oppilaitosta) — ei siis hylätty
   päällekkäisyyden vuoksi, mutta merkitty tähän läpinäkyvyyden
   vuoksi, koska sama pohjatosite (1209) esiintyy kahdesti.
