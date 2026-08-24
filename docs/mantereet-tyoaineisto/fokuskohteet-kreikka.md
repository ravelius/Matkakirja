# Kreikan fokusnäkymän karttakohteet — faktapohja

Tila: luonnos, ei viety koodiin. Kaikki tiedot koottu 24.8.2026.

Tausta (js/tyohuone-raamattu.js, osio "Fokusmoodi", kohta
KOHDEKOROSTUS/ETENEMINEN): pelilaatan (Ateena) lisäksi fokusnäkymän
kartalla näkyy muita kaupunkeja, jokia, järviä ja vuoria; aarteen
löydyttyä niitä voi klikata, jolloin kartta korostaa juuri sen
kohteen niukalla taustalla ja avaa pienen pop-up-tietoruudun.
Tämä dokumentti on faktapohja niille pop-up-teksteille — ei
lopullista pelitekstiä eikä UI-suunnitelmaa.

## Tarkistustapa

- **Koordinaatit:** en-Wikipedian MediaWiki-rajapinnasta
  (`action=query&prop=coordinates`, `redirects=1`), haettu 24.8.2026
  curlilla. Rajapinta vastasi toistuvasti 429:llä (Wikimedian
  kiintiörajoitus, jaettu tässä ympäristössä muunkin liikenteen
  kanssa) — kaikki koordinaatit saatiin lopulta läpi kasvavalla
  uusintaviiveellä (5 s → 10 s → 20 s...). EI yhtään koordinaattia
  muistista.
- **Popup-faktat:** en-Wikipedian artikkeleista, `action=query&
  prop=extracts&explaintext=1` (johdanto-osa ensin, tarvittaessa
  koko artikkelin tekstistä haettu tarkempi kohta samalla
  rajapinnalla, haettu erikseen per artikkeli koska `extracts`-
  ominaisuus palauttaa täyden tekstin vain yhdelle sivulle kerrallaan
  ilman generaattoria). Jokaisen nostetun faktan kohdalla alla on
  merkitty artikkeli JA mihin kohtaan artikkelia se nojaa (johdanto/
  Etymology/History/nimetty alaotsikko).
- **Suomenkieliset nimet:** tarkistettu fi-Wikipediasta
  (`action=query&titles=...&redirects=1`) hakemalla ehdokasotsikko
  ja seuraamalla uudelleenohjaus perille asti; kahdessa tapauksessa
  (Iraklion/Herakleion, Nafplio/Nauplia) sama kirjoitusasu osoitti
  fi-Wikipediassa KAHTEEN ERI artikkeliin (moniselite tai antiikin
  kaupunki vs. nykykaupunki) — tarkistettu erikseen johdannosta,
  ks. huomiot kohteittain.
- **Commons-kuvakategoriat:** tarkistettu `action=query&
  prop=categoryinfo` commons.wikimedia.orgista, EI arvattu. Kolmessa
  tapauksessa ilmeisin kategorianimi oli joko tyhjä tai olematon —
  merkitty selvästi kohteen kohdalle, ei peitelty.
- Kaikki lähteet en-Wikipediasta paitsi nimien vahvistus
  fi-Wikipediasta ja kuvakategoriat Commonsista. Ei muita hakuja.

---

## Kohteet

### 1. Thessaloniki

- **Nimi:** Thessaloniki (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Θεσσαλονίκη (Thessaloníki).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 40,6403°N, 22,9356°E — en-Wikipedia "Thessaloniki"
  (coordinates-rajapinta).
- **Popup-teksti (430 merkkiä):**

  > Kaupungin perusti makedonialainen kuningas Kassandros vuonna 315
  > eaa. ja nimesi sen vaimonsa Thessaloniken mukaan – tämä oli
  > Aleksanteri Suuren sisarpuoli. Bysantin aikana kaupunkia
  > kutsuttiin "kanssapääkaupungiksi" (Symprotevousa) Konstantinopolin
  > rinnalla. Ottomaanivallan 1430–1912 aikana täällä asui rinnakkain
  > kristittyjä, muslimeja ja juutalaisia, ja 1500–1900-luvuilla se
  > oli Euroopan ainoa juutalaisenemmistöinen kaupunki.

- **Lähde:** en-Wikipedia "Thessaloniki", johdanto-osa (perustaminen
  315 eaa., nimi vaimon mukaan, "Symprotevousa"-lisänimi,
  ottomaanivalta 1430–1912, ainoa juutalaisenemmistöinen kaupunki
  Euroopassa 1500–1900-luvuilla).
- **Commons:** Category:Thessaloniki — tarkistettu, 104 tiedostoa,
  16 alikategoriaa. Kunnossa.

### 2. Patras

- **Nimi:** Patras (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Πάτρα (Pátra).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 38,25°N, 21,73333°E — en-Wikipedia "Patras".
- **Popup-teksti (400 merkkiä):**

  > Patras oli yksi ensimmäisistä kaupungeista, joissa Kreikan
  > itsenäisyyssota syttyi vuonna 1821 – ottomaanien varuskunta
  > linnoituksessa piti kuitenkin pintansa aina vuoteen 1828 asti.
  > Sodan jälkeen suuri osa kaupungista makasi raunioina, ja se
  > rakennettiin uudelleen ruutukaavan mukaan vuoden 1858
  > kaupunkisuunnitelmalla. Isoisän vieraillessa 1873 katukuva oli
  > siis vain reilun kymmenen vuoden ikäinen.

- **Lähde:** en-Wikipedia "Patras", osiot "Modern era" (kaupunki
  yksi ensimmäisistä joissa vallankumous 1821 syttyi, varuskunta
  piti kaupunkia 1828 asti, kaupunki tuhoutui suurelta osin sodassa)
  ja "Urban landscape" (alakaupunki rakennettu vuoden 1858
  kaupunkisuunnitelman mukaan). 1873-vertailu (n. 15 vuotta
  suunnitelmasta) oma laskelmani, ei Wikipedian väite.
- **Commons:** Category:Patras — tarkistettu, 38 tiedostoa,
  17 alikategoriaa. Kunnossa.

### 3. Ioannina

- **Nimi:** Ioánnina (fi-Wikipedia, "Ioannina" ohjautuu tänne).
  Paikallinen: Ιωάννινα (Ioánnina), puhekielessä Γιάννινα.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 39,66361°N, 20,85222°E — en-Wikipedia "Ioannina".
- **Popup-teksti (443 merkkiä):**

  > Vuosina 1788–1822 kaupunkia hallitsi ottomaani-albaanialainen
  > ruhtinas Ali-pasha, jonka hovi houkutteli aikansa
  > vaikutusvaltaisia hahmoja ja jonka kaudella kaupungissa
  > kukoisti sekä kauppa että kreikkalainen valistus. Kun hän
  > yritti irtautua sulttaanin vallasta, Istanbul julisti hänet
  > petturiksi: sulttaanin joukot piirittivät kaupunkia, ja
  > Ali-pasha salamurhattiin 1822 järven saaren luostarissa, jonne
  > hän oli paennut odottamaan armahdusta.

- **Lähde:** en-Wikipedia "Ioannina", osio "Ali Pasha's rule
  (1788–1822)" (hallituskauden vuodet, hovi houkutteli mm. Kreikan
  vallankumouksen tulevia johtohahmoja, kaupungin taloudellinen ja
  henkinen kukoistus samaan aikaan, petturuussyytös 1820, piiritys,
  pako Pyhän Panteleimonin luostariin järven saarella, salamurha
  1822 armahdusta odottaessa).
  **HUOM (ikäsopivuus, ks. Hylätyt/epävarmat):** artikkeli mainitsee
  myös Ali-pashan tekemiä julmuuksia kaupungin kreikkalaisväestöä
  kohtaan; niitä ei ole otettu popup-tekstiin Perustuslain
  ikäsopivuuskohdan mukaisesti.
- **Commons:** Category:Ioannina — tarkistettu, 51 tiedostoa,
  16 alikategoriaa. Kunnossa.

### 4. Nafplio

- **Nimi:** Náfplio (fi-Wikipedia). Paikallinen: Ναύπλιο (Náfplio).
  **HUOM:** fi-Wikipediassa on myös erillinen artikkeli "Nauplia" —
  se käsittelee ANTIIKIN kaupunkia samalla paikalla, ei nykyistä
  Nafpliota; tarkistettu molempien johdannoista.
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 37,56583°N, 22,8°E — en-Wikipedia "Nafplio".
- **Popup-teksti (420 merkkiä):**

  > Nafpliosta tuli itsenäistyneen Kreikan ensimmäinen virallinen
  > pääkaupunki vuonna 1829. Maan ensimmäinen valtionpäämies, kreivi
  > Ioannis Kapodistrias, astui Kreikan mantereelle juuri täällä
  > 1828 – ja hänet murhattiin Pyhän Spyridonin kirkon portailla
  > 1831. Pääkaupunki siirtyi Ateenaan 1834, kun kuningas Otto niin
  > päätti, mutta 1873 isoisä olisi yhä nähnyt kaupungin entisen
  > aseman jäljet sen linnoituksissa ja kirkoissa.

- **Lähde:** en-Wikipedia "Nafplio", osio "19th century: Independence
  and first capital" (Kapodistrias astui maihin Nafpliossa 7.1.1828,
  julisti sen pääkaupungiksi 1829, salamurhattiin 9.10.1831 Pyhän
  Spyridonin kirkon portailla, pääkaupunki siirtyi Ateenaan 1834
  kuningas Oton päätöksellä). Viimeinen virke (mitä isoisä 1873
  olisi nähnyt) oma päätelmäni ajoituksesta, ei suora lainaus.
- **Commons:** kategorianimi EI ole "Category:Nafplio" (tarkistettu,
  puuttuu) vaan **Category:Nafplion** (huomaa n-kirjain lopussa) —
  tarkistettu, 99 tiedostoa, 20 alikategoriaa. Kunnossa, mutta
  kategorianimi on eri kuin fi-Wikipedian tai artikkelin otsikko.

### 5. Iraklion (Heraklion)

- **Nimi:** Iraklion (fi-Wikipedia). **HUOM:** fi-Wikipediassa
  "Herakleion" on erillinen MONISELITESIVU ("voi viitata seuraaviin
  paikkoihin") — ei sama kuin Kreetan kaupunki. Oikea artikkeli on
  "Iraklion". Paikallinen: Ηράκλειο (Iráklio).
- **Tyyppi:** kaupunki.
- **Koordinaatit:** 35,3403°N, 25,1344°E — en-Wikipedia "Heraklion".
- **Popup-teksti (363 merkkiä):**

  > Iraklionin seutua on asutettu yhtäjaksoisesti ainakin vuodesta
  > 7000 eaa., mikä tekee siitä yhden Euroopan pisimpään asuttuja
  > alueita. Kaupungin kupeessa sijaitsee Knossoksen palatsi,
  > minolaisen kulttuurin keskus noin vuosilta 2000–1350 eaa. ja
  > usein Euroopan vanhimpana kaupunkina pidetty paikka – nykyään
  > Kreikan toiseksi suosituin nähtävyys Parthenonin jälkeen.

- **Lähde:** en-Wikipedia "Heraklion", johdanto-osa (yhtäjaksoinen
  asutus vähintään 7000 eaa. asti, Knossoksen palatsi minolaisen
  kulttuurin keskuksena n. 2000–1350 eaa., usein pidetty Euroopan
  vanhimpana kaupunkina, toiseksi eniten kävijöitä Kreikan
  nähtävyyksistä Parthenonin jälkeen).
- **Commons: EI LÖYTYNYT KUNNOLLISTA OMAA KATEGORIAA.**
  Tarkistettu neljä ehdokasta: "Category:Heraklion" (olemassa mutta
  0 tiedostoa/0 alikategoriaa — käytännössä tyhjä), "Category:
  Iraklion" (sama tilanne, 0/0), "Category:Old town of Heraklion"
  (ei olemassa), "Category:Heraklion (city)" ja "Category:Heraklion,
  Greece" (ei olemassa). Kirjoitusvaiheessa kuvakategoria on
  tarkistettava uudelleen Commonsista käsin (esim. Knossoksen tai
  Iraklion satamalinnoituksen Koules-kategorian kautta), koska
  suoraa "Iraklion-kaupunki"-kategoriaa ei löytynyt tällä haulla.

### 6. Olympos

- **Nimi:** Ólympos (fi-Wikipedia, "Olympos-vuori" ohjautuu tänne).
  Paikallinen: Όλυμπος (Ólympos).
- **Tyyppi:** vuori (vuoristomassiivi, 52 huippua).
- **Koordinaatit:** 40,08556°N, 22,35861°E — en-Wikipedia
  "Mount Olympus" (coprop=type: mountain).
- **Popup-teksti (387 merkkiä):**

  > Kreikkalaisessa mytologiassa Olympos oli jumalten koti, ja
  > 52-huippuinen vuoristo kohoaa yhä Kreikan korkeimpaan
  > pisteeseensä, Mytikakseen (2 917,7 m). Vuoresta tuli maan
  > ensimmäinen kansallispuisto 1938, ja heinäkuussa 2026 koko
  > alue otettiin Unescon maailmanperintölistalle sekä luonnostaan
  > että kulttuuriperinnöstään. Suosituin nousureitti alkaa yhä
  > Litohoron kylästä vuoren juurelta.

- **Lähde:** en-Wikipedia "Mount Olympus", johdanto-osa (52 huippua,
  korkein huippu Mytikas 2 917,727 m eli Kreikan korkein kohta,
  jumalten koti kreikkalaisessa mytologiassa, ensimmäinen
  kansallispuisto 1938, Unescon maailmanperintökohde heinäkuussa
  2026, suosituin nousureitti Litohorosta).
  **HUOM:** Unesco-merkintä heinäkuulta 2026 on hyvin tuore tieto —
  tarkistettu artikkelin nykyisestä tilasta 24.8.2026, ei
  1873-ajan faktana vaan nykypäivän kontekstitietona.
- **Commons:** Category:Mount Olympus — tarkistettu, 194 tiedostoa,
  16 alikategoriaa. Kunnossa.

### 7. Parnassos

- **Nimi:** Parnassós (fi-Wikipedia, "Parnassos" ohjautuu tänne).
  Paikallinen: Παρνασσός (Parnassós).
- **Tyyppi:** vuori.
- **Koordinaatit:** 38,53583°N, 22,62417°E — en-Wikipedia
  "Mount Parnassus".
- **Popup-teksti (397 merkkiä):**

  > Muinaiset kreikkalaiset pyhittivät Parnassoksen kahdelle
  > jumalalle kerralla: Apollonille, jonka oraakkeli sijaitsi vuoren
  > eteläisellä rinteellä Delfoissa, ja Dionysokselle, jonka
  > riemujuhlia vietettiin vuoren huipuilla. Homeroksen Iliaassa
  > mainitaan useita vuoren kylistä, ja sen kalkkikivessä on myös
  > bauksiittia – alumiinimalmia, jota louhitaan yhä. Talvella
  > samat rinteet täyttyvät hiihtäjistä.

- **Lähde:** en-Wikipedia "Mount Parnassus", johdanto-osa (Delfoi
  vuoren eteläisellä rinteellä, pyhitetty Dionysokselle ja
  Apollonille, useita yhteisöjä mainittu Homeroksen Iliaassa,
  kalkkikiveä ja louhittavaa bauksiittia, hiihtokeskukset
  Arachovan lähellä).
- **Commons:** Category:Mount Parnassus — tarkistettu, 79 tiedostoa,
  10 alikategoriaa. Kunnossa.

### 8. Taygetos

- **Nimi:** Taÿ́getos (fi-Wikipedia; sekä "Taygetos" että "Taygetus"
  ohjautuvat tänne). Paikallinen: Ταΰγετος (Taÿgetos).
- **Tyyppi:** vuori (vuoristo).
- **Koordinaatit:** 36,95389°N, 22,35222°E — en-Wikipedia
  "Taygetus" (coprop=type: mountain; haettu "Mount Taygetus" -
  hausta uudelleenohjautuen artikkeliin "Taygetus").
- **Popup-teksti (428 merkkiä):**

  > Taygetos on yksi Euroopan vanhimmista muistiin merkityistä
  > paikannimistä – se mainitaan jo Homeroksen Odysseiassa, ja
  > kreikkalaisen taruston mukaan vuori on nimetty Taygete-nymfin
  > mukaan. Bysantin ajalta 1800-luvulle asti sitä kutsuttiin myös
  > nimellä Pentadaktylos, "viisisormi". Korkein huippu, Profitis
  > Ilias (2 405 m), on koko Peloponnesoksen korkein kohta, ja vuori
  > hallitsee yhä Spartan ja Kalamatan kaupunkien taivasrajaa.

- **Lähde:** en-Wikipedia "Taygetus", johdanto-osa (nimi mainittu jo
  Odysseiassa, nimetty nymfi Taygeten mukaan, bysanttilainen
  vaihtoehtonimi Pentadaktylos aina 1800-luvulle asti) ja osio
  "Geography/Physical" (korkein huippu Profitis Ilias 2 405 m,
  Peloponnesoksen korkein kohta) sekä "Political" (vuori hallitsee
  Spartan ja Kalamatan taivasrajaa).
  **HUOM (ikäsopivuus, ks. Hylätyt/epävarmat):** artikkeli mainitsee
  myös antiikin legendan, jonka mukaan vuorelta pudotettiin
  vastasyntyneitä lapsia — TÄTÄ EI ole otettu popup-tekstiin.
- **Commons:** kategorianimi EI ole "Category:Taygetus" (tarkistettu,
  puuttuu) vaan **Category:Taygetos** — tarkistettu, 91 tiedostoa,
  5 alikategoriaa. Kunnossa, mutta kategorianimi eroaa
  artikkeliotsikosta.

### 9. Pindos

- **Nimi:** Píndos (fi-Wikipedia; sekä "Pindos" että "Pindus"
  ohjautuvat tänne). Paikallinen: Πίνδος (Píndos).
- **Tyyppi:** vuori (vuoristo).
- **Koordinaatit:** 40,08889°N, 20,92528°E — en-Wikipedia "Pindus"
  (coprop=type: mountain; haettu "Pindus Mountains" -hausta
  uudelleenohjautuen artikkeliin "Pindus").
- **Popup-teksti (373 merkkiä):**

  > Noin 160 kilometrin pituinen Pindos kulkee pohjoisesta etelään
  > pitkin Kreikan mannerta ja tunnetaan puhekielessä "Kreikan
  > selkärankana". Vuoristo on geologisesti Dinaaristen Alppien
  > jatke ja ulottuu Albanian rajalta aina Peloponnesoksen
  > pohjoisosiin asti. Korkein huippu on Smolikas (2 637 m), ja
  > vuoristo erottaa perinteisesti Epeiroksen alueen muusta Kreikan
  > mantereesta.

- **Lähde:** en-Wikipedia "Pindus", johdanto-osa (pituus n. 160 km,
  korkein huippu Smolikas 2 637 m, puhekielinen nimitys "Kreikan
  selkäranka", Dinaaristen Alppien geologinen jatke, ulottuu
  Albanian rajalta Peloponnesoksen pohjoisosiin, erottaa Epeiroksen
  ja Makedonian alueet).
- **Commons:** kategorianimi on **Category:Pindus** (ei "Pindos") —
  tarkistettu, 55 tiedostoa, 11 alikategoriaa. Kunnossa, mutta
  kategorianimi eroaa fi-nimestä.

### 10. Egeanmeri

- **Nimi:** Egeanmeri (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Αιγαίο Πέλαγος (Aigaío Pélagos).
- **Tyyppi:** meri.
- **Koordinaatit:** 39°N, 25°E — en-Wikipedia "Aegean Sea"
  (coordinates-rajapinta). **HUOM:** tämä on koko meren karkea
  keskipiste, ei tarkka paikannuspiste — sopii kartalla lähinnä
  alueen nimeämiseen, ei täsmäklikkaukseen.
- **Popup-teksti (378 merkkiä):**

  > Vanhan tarun mukaan Egeanmeri sai nimensä kuningas Aigeuksesta,
  > Theseuksen isästä. Theseus lähti tappamaan Minotaurosta ja
  > lupasi nostaa valkoiset purjeet onnistuessaan – mutta unohti
  > sen. Kun Aigeus näki laivan palaavan mustin purjein, hän uskoi
  > poikansa kuolleen ja heittäytyi mereen. Legenda selittää yhä,
  > miksi tämä Kreikan ja Vähän-Aasian välinen meri kantaa hänen
  > nimeään.

- **Lähde:** en-Wikipedia "Aegean Sea", osio "Etymology" ("Figure-
  Based Origins" -kohta: Aigeus, Theseuksen isä, jonka kerrotaan
  hukuttaneen itsensä mereen; Theseus lupasi nostaa valkoiset
  purjeet tapettuaan Minotauroksen, unohti sen, ja Aigeus uskoi
  poikansa kuolleen ja hyppäsi mereen). Yksi useista artikkelin
  listaamista nimiselityksistä — valittu tähän koska tarina on
  täydellisin ja parhaiten lähteistetty.
- **Commons:** Category:Aegean Sea — tarkistettu, 112 tiedostoa,
  29 alikategoriaa. Kunnossa.

### 11. Joonianmeri

- **Nimi:** Joonianmeri (fi-Wikipedia, ei uudelleenohjausta).
  Paikallinen: Ιόνιο Πέλαγος (Iónio Pélagos).
- **Tyyppi:** meri.
- **Koordinaatit:** 38°N, 19°E — en-Wikipedia "Ionian Sea"
  (coordinates-rajapinta). **HUOM:** sama karkeus kuin
  Egeanmerellä — koko meren likimääräinen keskipiste.
- **Popup-teksti (380 merkkiä):**

  > Joonianmeren nimen alkuperä on hämärän peitossa, mutta antiikin
  > kirjailijat, etenkin Aiskhylos, yhdistivät sen Io-nymfin
  > taruun: Zeus muutti rakastettunsa Ion lehmäksi Heran
  > mustasukkaisuuden vuoksi, ja lehmä ui tämän meren yli
  > paetessaan. Meri on yksi Välimeren seismisesti aktiivisimmista
  > alueista, ja sen syvin kohta, Kalypson syvänne (5 109 m), on
  > koko Välimeren syvin paikka.

- **Lähde:** en-Wikipedia "Ionian Sea", osio "Etymology" (antiikin
  kirjailijat, etenkin Aiskhylos, yhdistivät nimen Io-tarustoon;
  adjektiivia "Ionios" käytettiin koska Io ui meren yli) ja
  johdanto-osa (Kalypson syvänne 5 109 m, koko Välimeren syvin
  kohta; meri yksi seismisesti aktiivisimmista alueista).
  **HUOM (lähdetarkkuus):** itse Io-myytin yksityiskohdat (Zeus
  muutti Ion lehmäksi Heran mustasukkaisuuden vuoksi) ovat
  yleistunnettua kreikkalaista mytologiaa, EI suoraan tämän
  artikkelin tekstiä — artikkeli itse vain toteaa kirjailijoiden
  yhdistäneen nimen Ion tarinaan ja että Io ui meren yli. Jos
  tarkkuutta halutaan tiukemmaksi, popup-teksti kannattaa muotoilla
  viittaamaan vain artikkelin toteamaan ydinasiaan (nimi ↔ Io ui
  meren yli) ilman Zeus/Hera-taustaa.
- **Commons:** Category:Ionian Sea — tarkistettu, 125 tiedostoa,
  18 alikategoriaa. Kunnossa.

### 12. Korintin kanava

- **Nimi:** Korintin kanava (fi-Wikipedia). Paikallinen: Διώρυγα
  της Κορίνθου (Dioryga tis Korinthou).
- **Tyyppi:** muu (ihmisen rakentama kanava).
- **Koordinaatit:** 37,93472°N, 22,98389°E — en-Wikipedia
  "Corinth Canal".
- **Popup-teksti (422 merkkiä) — HUOM 1873-NÄKÖKULMA KESKEINEN:**

  > HUOM 1873: kanavaa EI vielä ollut. Tyranni Periandros harkitsi
  > kanavaa jo 600-luvulla eaa., mutta rakensi sen sijaan kivetyn
  > vetotien laivoille. Kolme roomalaishallitsijaa halusi kanavan
  > ja kuoli kaikki väkivaltaisesti: Caesar ja Caligula ennen kuin
  > pääsivät edes alkuun, keisari Nero taas pian sen jälkeen, kun
  > oli 67 jaa. itse lyönyt kuokalla ensimmäisen kuopan. Kanava
  > valmistui vasta 1881–1893, isoisän matkan jälkeen.

  ("HUOM 1873:" on peliteksti/tunniste itse pop-upissa, ei
  koostajan merkintä — voi muotoilla uudelleen kirjoitusvaiheessa,
  esim. omaksi ensimmäiseksi lauseeksi ilman "HUOM"-sanaa.)

- **Lähde:** en-Wikipedia "Corinth Canal", johdanto-osa (valmistui
  1893) ja osio "History/Ancient attempts" (Periandros 600-luvulla
  eaa. harkitsi kanavaa, rakensi sen sijaan Diolkos-vetotien; kolme
  roomalaishallitsijaa — Caesar, Caligula, Nero — halusivat kanavan
  ja kaikki kuolivat väkivaltaisesti; Caesar ja Caligula
  salamurhattiin ennen työn aloittamista; Nero aloitti kaivuun
  67 jaa. juutalaisvangeilla mutta kuoli pian sen jälkeen, jolloin
  työ keskeytyi) sekä johdannon toteamus rakentamisen
  uudelleenkäynnistymisestä 1881 ja valmistumisesta 1893.
- **Commons:** Category:Corinth Canal — tarkistettu, 60 tiedostoa,
  9 alikategoriaa. Kunnossa.

### 13. Santorini

- **Nimi:** Santoríni (fi-Wikipedia). Paikallinen: Σαντορίνη
  (Santoríni), virallisesti Θήρα (Thíra, "Thira/Thera").
- **Tyyppi:** saari (tulivuorisaari).
- **Koordinaatit:** 36,415°N, 25,4325°E — en-Wikipedia "Santorini".
- **Popup-teksti (424 merkkiä):**

  > Noin 3 600 vuotta sitten Santorini räjähti yhdessä historian
  > suurimmista tulivuorenpurkauksista, joka hautasi minolaisen
  > kaupungin Akrotirin tuhkaan – ja loi saaren keskelle avautuvan,
  > yhä näkyvän kalderan. Purkausta on esitetty myös kadonneen
  > Atlantiksen tarun innoittajaksi. Akrotirin kaivauksissa 1967
  > alkaen on löytynyt kolmikerroksisia taloja ja hyvin säilyneitä
  > freskoja, jotka paljastavat yllättävän vauraan yhteisön.

- **Lähde:** en-Wikipedia "Santorini", osio "History/Minoan
  Akrotiri" (Minolainen purkaus n. 3 600 vuotta sitten, yksi
  historian suurimmista, jätti kalderan; purkausta on esitetty
  Atlantis-tarun lähteeksi; Akrotirin kaivaukset alkoivat 1967
  Spyridon Marinatoksen johdolla, kolmikerroksisia rakennuksia,
  hyvin säilyneitä freskoja).
- **Commons:** Category:Santorini — tarkistettu, 53 tiedostoa,
  23 alikategoriaa. Kunnossa.

### 14. Delfoi

- **Nimi:** Delfoi (fi-Wikipedia, ei uudelleenohjausta). Paikallinen:
  Δελφοί (Delfí).
- **Tyyppi:** muu (antiikin pyhäkkö/kaupunki, ei nykyinen
  asutuskeskus vaan arkeologinen kohde).
- **Koordinaatit:** 38,4823°N, 22,5013°E — en-Wikipedia "Delphi".
- **Popup-teksti (399 merkkiä):**

  > Muinaiset kreikkalaiset pitivät Delfoita koko maailman
  > keskipisteenä – paikkaa merkitsi Omfalos-kivi, "maailman napa".
  > Täällä toimi Pythia, oraakkeli, jota kysyttiin tärkeistä
  > päätöksistä kaikkialta antiikin maailmasta. Legendan mukaan nimi
  > juontuu käärmeolento Delfynestä, jonka jumala Apollon surmasi.
  > Pyhäkkö sijaitsee Parnassos-vuoren lounaisrinteellä ja on
  > nykyään Unescon maailmanperintökohde.

- **Lähde:** en-Wikipedia "Delphi", johdanto-osa (pidettiin
  maailman keskipisteenä, merkitty Omfalos-kivellä, Pythia-
  oraakkeli jota kysyttiin tärkeistä päätöksistä koko antiikin
  maailmasta, nimi Suidan mukaan käärmeolento Delfynestä jonka
  Apollon surmasi, sijainti Parnassos-vuoren lounaisrinteellä,
  Unescon maailmanperintökohde).
- **Commons:** "Category:Delphi" on OLEMASSA MUTTA KÄYTÄNNÖSSÄ
  TYHJÄ (categoryinfo: 0 tiedostoa, 0 alikategoriaa) —
  todennäköisesti pelkkä yläkategoria. Oikea sisältökategoria on
  **Category:Ancient Delphi** — tarkistettu, 80 tiedostoa,
  17 alikategoriaa. Kunnossa, mutta käytä TÄTÄ nimeä äläkä
  "Category:Delphi":tä.

---

## Yhteenveto: koordinaattitaulukko

| # | Kohde | Tyyppi | Koordinaatit | Lähdeartikkeli |
|---|---|---|---|---|
| 1 | Thessaloniki | kaupunki | 40,6403°N 22,9356°E | Thessaloniki |
| 2 | Patras | kaupunki | 38,25°N 21,73333°E | Patras |
| 3 | Ioannina | kaupunki | 39,66361°N 20,85222°E | Ioannina |
| 4 | Nafplio | kaupunki | 37,56583°N 22,8°E | Nafplio |
| 5 | Iraklion | kaupunki | 35,3403°N 25,1344°E | Heraklion |
| 6 | Olympos | vuori | 40,08556°N 22,35861°E | Mount Olympus |
| 7 | Parnassos | vuori | 38,53583°N 22,62417°E | Mount Parnassus |
| 8 | Taygetos | vuori | 36,95389°N 22,35222°E | Taygetus |
| 9 | Pindos | vuori | 40,08889°N 20,92528°E | Pindus |
| 10 | Egeanmeri | meri | 39°N 25°E (yleispiste) | Aegean Sea |
| 11 | Joonianmeri | meri | 38°N 19°E (yleispiste) | Ionian Sea |
| 12 | Korintin kanava | muu | 37,93472°N 22,98389°E | Corinth Canal |
| 13 | Santorini | saari | 36,415°N 25,4325°E | Santorini |
| 14 | Delfoi | muu | 38,4823°N 22,5013°E | Delphi |

(Vertailuksi peliaatta Ateena: 37,98417°N 23,72806°E —
en-Wikipedia "Athens", ei oma kohde tässä listassa vaan pelilaatta
itse.)

---

## Hylätyt / epävarmat

1. **Ali-pashan ja Taygetoksen ikäsopivuusrajaukset.** Molempien
   artikkeleista löytyi yksityiskohtia, jotka jätettiin popup-
   teksteistä pois Perustuslain ikäsopivuuskohdan mukaisesti:
   Ali-pashan julmuudet Ioanninan kreikkalaisväestöä kohtaan, ja
   antiikin legenda vastasyntyneiden hylkäämisestä Taygetokselta.
   Kummankaan kohteen ydintarina ei kärsi näiden poistosta.

2. **Egeanmeren ja Joonianmeren koordinaatit ovat karkeita
   keskipisteitä**, eivät täsmäpisteitä (Wikipedian coordinates-
   rajapinta antaa molemmille merille vain pyöreät asteluvut,
   39°N/25°E ja 38°N/19°E) — sopivat alueen nimeämiseen kartalla,
   mutta jos peli tarvitsee tarkan klikkauspisteen, sellainen on
   valittava pelisuunnittelullisin perustein (esim. saariryhmän
   keskelle tai rannikon näkyvään kohtaan), ei tästä faktapohjasta.

3. **Iraklionin Commons-kuvakategoria jäi auki** (ks. kohta 5) —
   ei oikeaa suoraa kategoriaa löytynyt neljästä yritetystä
   ehdokkaasta. Tarkistettava uudelleen kuvitusvaiheessa, esimerkiksi
   Knossoksen tai Iraklion Koules-linnoituksen kategorioiden kautta.

4. **Kolme kohdetta joutuivat sisäisesti eri kategorianimelle
   kuin artikkeliotsikko/fi-nimi antaisi olettaa** — merkitty
   selvästi kunkin kohdan yhteyteen, jotta väärää kategorianimeä
   ei siirry koodiin: Nafplio → Category:Nafplion (n-pääte),
   Taygetos → Category:Taygetos (ei "Taygetus"), Pindos →
   Category:Pindus (ei "Pindos"). Delfoi → Category:Ancient Delphi
   (ei paljas "Category:Delphi", joka on tyhjä).

5. **Joonianmeren popup-tekstin mytologinen tausta (Zeus/Hera/
   lehmäksi muuttaminen) ei ole suoraan artikkelin tekstiä** vaan
   yleistunnettua kreikkalaista mytologiaa täydentämässä artikkelin
   toteamaa ydinasiaa (nimi ↔ Io ui meren yli). Merkitty erikseen
   kohdassa 11 — kirjoittaja voi halutessaan tiukentaa tekstin
   nojaamaan vain artikkelin sanomaan.

6. **Meteora jäi pois listalta**, vaikka olisi vahva ehdokas
   tulevaan laajennukseen (luostarit pylväsmäisillä
   kalkkikivimuodostumilla, hyvin kuvallinen ja tarinallinen
   kohde) — ei ehditty tarkistaa tässä erässä, koska annettu
   14 kohteen runko täyttyi jo muilla kohteilla. EI VARMENNETTU,
   ei siis mukana kohteina 1–14.

7. **Sparta kaupunkina jätettiin pois** päällekkäisyyden vuoksi:
   Taygetos-kohde (8) mainitsee jo Spartan kaupungin sen
   taivasrajan hallitsijana, ja erillinen Sparta-kaupunkikohde
   olisi nojannut osin samaan maantieteelliseen kontekstiin ilman
   selvästi erillistä uutta tarinaa tässä työmäärässä.

8. **Rodos, Korfu, Kreeta kokonaisuutena ja Meteora** olisivat
   kaikki olleet mahdollisia lisäkohteita 10–14 kohteen haarukassa,
   mutta annettu ehdotettu runko (14 kohdetta) täytettiin sellaisenaan
   perustellusti muokattuna (Iraklio edustaa jo Kreetaa).
