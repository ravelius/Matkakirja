# Täkyehdokkaat: Sarajevo

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten (Raamattu, osio
"Fokusmoodi", kohta TÄKY). Malli: docs/mantereet-tyoaineisto/takyt-ateena.md.
Omistajan lupa Sarajevon/Bosnian pakettiin 25.8.2026 (Raamattu:
"SEURAAVAT FOKUSMAAT ... Sofia, Istanbul, Sarajevo ja Bukarest tehdään
YHTÄ VALMIIKSI KUIN KREIKKA").

**Tila:** kartoitus. EI koodia, EI muutoksia olemassa oleviin
tiedostoihin, EI committia. Fable valitsee, mitkä viedään peliin.

## Tarkistustapa

- Wikipedia-artikkelit haettu 25.8.2026 komennolla
  `curl -sS -A "<botnimi>" "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
- Rajapinta vastasi toistuvasti "You are making too many requests"
  (Wikimedian kiintiö, jaettu tässä ympäristössä); haut uusittu
  kasvavalla viiveellä (8 s → 16 s → 24 s) ja User-Agent lisätty,
  minkä jälkeen kaikki läpi. **Ei yhtään muistinvaraista faktaa.**
- **Kuvat:** jokaisen ehdotetun Commons-tiedoston olemassaolo, koko,
  lisenssi ja tekijä kysytty erikseen Commonsin `imageinfo`-
  rajapinnalla (`iiprop=size|mime|extmetadata|user`). Ei arvattuja
  tiedostonimiä. Kaikki ehdotetut ovat PD, CC0 tai CC BY / CC BY-SA.
- Koordinaatteja ei ole tässä dokumentissa kuin muutama; ne on haettu
  `prop=coordinates`-rajapinnasta (ks. fokuskohteet-bosnia.md).
  Kaupungin sisäiset sijainnit on kuvattu sanallisesti, koska
  yksittäisillä kaduilla/rakennuksilla ei ole koordinaatteja
  Wikipediassa.

## Olemassa oleva Sarajevo-sisältö repossa

Nopea `grep -ri "sarajevo\|bosnia\|mostar" js/packs/ docs/` -katsaus:

- **js/packs/nahtavyysjutut.js** (rivit n. 6567–6790): viisi valmista
  nähtävyysjuttua — Sarajevon katedraali (1884–1889, Vancaš, Dijonin
  Notre-Dame esikuvana, vaakuna), Gazi Husrev-begin moskeija
  (1530–1531), Baščaršija (1462), Vijećnica (1892–1896,
  kansalliskirjasto, 1992), Latinalaissilta (1541 puusilta, 1565
  kivisilta, 1791 tulva, 1798–99 jälleenrakennus, "silmät",
  Principin silta, 1914), Keltainen linnake / Žuta tabija (1727–1739).
- **js/packs/kulttuuri-kategoriat.js** (rivit n. 13868–14130): laaja
  "Matkailijan Sarajevo" — 518 m korkeus ja viisi vuorta, Ferhadijan
  "Sarajevo Meeting of Cultures" -messinkiviiva, Sahat-kula
  (1500-luvun puoliväli, 28 m, maan korkein kellotorni,
  auringonlaskun aika), 1 425 päivän piiritys, sää ja vuodenajat,
  Vrelo Bosne, Festina lente -silta, nostot "Silta, jolta maailma
  muuttui" ja "Sevdalinka — kaupunkilaulu kaipuusta".
- **js/packs/europe-artikkelit.js** (rivit n. 476–560): Sarajevo- ja
  "Bosnia ja Hertsegovina" -artikkelit (kolme valtaväestöä, kaksi
  entiteettiä, Mostarin silta mainittu, Sarajevon ruusut, 1984,
  bosnialainen kahvi).
- **js/packs/europe-questions.js** (rivit n. 1151–1190) ja
  **js/packs/pollo-kysymykset.js** (rivi 527): kysymyspatterit —
  pääkaupunki, 1914, 1984, Baščaršija, "Euroopan Jerusalem",
  jokilaakso, haggada (!), Sarajevon suomalainen kolmoisvoittaja.
- **js/packs/europe-kulttuuri.js** (rivi 92): sevdalinka-kysymys.

**Johtopäätös:** katedraali, Gazi Husrev-begin moskeija, Baščaršija,
Vijećnica, Latinalaissillan perusrakennushistoria + 1914,
Žuta tabija, Sahat-kula, Ferhadijan viiva, Vrelo Bosne, sevdalinka,
Sarajevon ruusut, 1984 ja piiritys ovat JO KÄYTÖSSÄ. Alla olevat
täkyt on valittu välttämään päällekkäisyyttä: ne joko täydentävät
olemassa olevaa kohdetta uudella, varmennetulla yksityiskohdalla
(esim. Latinalaissilta → nimen numeroarvo) tai avaavat kokonaan uuden
paikan.

## Kerrostumaperiaate (1873 vs. nykypäivä)

Isoisä matkusti 1873. Tuolloin Sarajevo oli **ottomaanien**
hallinnossa: Itävalta-Unkarin miehitys alkoi vasta 1878 (Berliinin
kongressi) ja liittäminen 1908. Vuoden 1914 salamurha on isoisälle
tulevaisuutta, mutta nykypäivän pöllölle historiaa. Alla olevissa
täyissä kerros on merkitty:

- **[1873]** = isoisä olisi voinut nähdä tämän itse.
- **[1878+]** = tapahtui isoisän matkan jälkeen; vain pöllö voi
  kertoa.
- **[molemmat]** = paikka oli olemassa 1873, mutta tarinan käänne
  tuli myöhemmin.

---

## Täkyt

### 1. Talo, joka siirrettiin joen yli kivi kiveltä pelkästä uhmasta [1878+]

Kun Itävalta-Unkarin virkamiehet halusivat Miljackan rannalta tontin
uudelle kaupungintalolle ja kirjastolle, tontilla oli talo. Omistaja
kieltäytyi rahasta. Hän kieltäytyi silloinkin, kun hänelle sanottiin
että hänen on pakko muuttaa. Kun virkamiehet uhkailivat, hän purki
talonsa, siirsi sen ja rakensi sen uudelleen pala palalta joen
vastarannalle — kiusatakseen virkamiehiä. Talo seisoo yhä siellä ja
toimii ravintolana nimeltä **Inat kuća**, "Uhmatalo".

- **Paikka:** Inat kuća, Miljackan pohjoisrannalla Vijećnicaa
  vastapäätä, Stari Grad.
- **Lähde:** en.wikipedia.org/wiki/Spite_house, osio "Sarajevo Spite
  House, Sarajevo".
- **Lainaus/perustelu:** "Before 1914, the Austro-Hungarians who ruled
  Sarajevo ... wanted land in the Sarajevo Old Town district to build
  a city hall and library. The land had a house on it and, despite the
  offering of money to the owner, he refused ... he moved the house
  and rebuilt it, piece by piece, on the other side of the Miljacka
  river, as a way of spiting the officials."
- **Kuva (tarkistettu):** `Sarajevo - Inat kuća (49104054186).jpg`
  (5184×3456, **CC BY 2.0**, Fred Romero, 20.8.2019). Vaihtoehto:
  `2023.01.22 Inat kuća.jpg` (4032×3024, CC BY-SA 4.0, Niegodzisie).
- **Varmuus:** VARMA talon siirrosta ja syystä — suoraan lähteessä.
  **EPÄVARMA:** laajalti kerrottu lisäys, jonka mukaan omistaja vaati
  korvaukseksi kultarahan jokaista tiiltä kohti, EI löydy tästä
  artikkelista. Sitä ei saa väittää.
- **Kytkös peliin:** Vijećnica on jo pelissä (nahtavyysjutut.js) —
  tämä on sen tarinan toinen puoli, eikä toista mitään olemassa
  olevaa tekstiä.

### 2. Kirja, joka pakeni inkvisitiota, natseja ja piiritystä [molemmat]

Sarajevon haggada on noin vuonna 1350 Pohjois-Espanjassa (luultavasti
Barcelonassa) tehty kuvitettu käsikirjoitus vasikannahalle. Sen sivut
ovat viinitahroissa — merkki siitä, että sitä on oikeasti käytetty
pääsiäisaterioilla. Kirja lähti Iberian niemimaalta 1492
karkotettujen juutalaisten mukana, ilmestyi 1500-luvulla Italiaan ja
myytiin Sarajevon kansallismuseolle 1894 mieheltä nimeltä Joseph
Kohen. Toisen maailmansodan aikana museon pääkirjastonhoitaja
**Derviš Korkut** salakuljetti sen ulos kaupungista ja antoi sen
muslimipapille vuoristokylään Bjelašnican rinteille, missä se
piilotettiin moskeijaan. Vuonna 1992 se selvisi museomurrosta ja
kellarin tulvimisesta, siirrettiin keskuspankin holviin ja säilyi
piirityksen läpi.

- **Paikka:** Bosnia ja Hertsegovinan kansallismuseo (Zemaljski
  muzej), Marijin Dvor, Sarajevo.
- **Lähde:** en.wikipedia.org/wiki/Sarajevo_Haggadah, osiot
  "Description" ja "History".
- **Lainaus/perustelu:** "Its pages are stained with wine, evidence
  that it was used at many Passover Seders." — "During World War II,
  the manuscript was hidden from the Nazis and Ustashe by the
  Museum's chief librarian, Derviš Korkut, who risked his life to
  smuggle the Haggadah out of Sarajevo. Korkut gave it to a Muslim
  cleric in a village on a mountain of Bjelasnica, where it was
  hidden in a mosque."
- **Kuva (tarkistettu):** `Sarajevska hagada.jpg` (723×1000,
  **Public domain**, tekijä tuntematon, ajoitus 1350) — itse
  käsikirjoituksen sivu. Vaihtoehto: `Sarajevo Haggadah.jpg`
  (3072×2304, CC BY-SA 4.0, Smooth_O, 2009).
- **Varmuus:** VARMA — kaikki edellä suoraan lähteessä.
- **1873-huomio:** kirja oli 1873 vielä yksityisomistuksessa; museo
  osti sen vasta 1894. Isoisä ei siis olisi voinut nähdä sitä
  vitriinissä — mutta se oli kaupungissa.
- **Pelissä jo:** pöllön kysymyspatterissa on kysymys "Miten
  Sarajevon haggada päätyi Espanjasta Bosniaan?"
  (js/packs/pollo-kysymykset.js rivi 537) — täky syventää tätä, ei
  toista sitä.

### 3. Hautausmaa, jossa on oma hauta kirjoille [molemmat]

Trebevićin rinteillä on Kaakkois-Euroopan suurin juutalainen
hautausmaa ja Euroopan toiseksi suurin hautamonumenttikokonaisuus
Prahan vanhan juutalaisen hautausmaan jälkeen: yli 3 850 hautakiveä
31 160 neliömetrillä. Se perustettiin 1630 ja oli käytössä vuoteen
1966. Hautausmaan kaakkoisosassa on erillinen holvi, **geniza** —
hauta vahingoittuneille pyhille kirjoille. Ensimmäinen "hautaus"
tehtiin 3. heinäkuuta 1916, ja toisessa toimituksessa maahan
laskettiin oletettavasti neljätoista arkullista kirjoja.

- **Paikka:** Vanha juutalainen hautausmaa, Kovačići–Debelo Brdo,
  Trebevićin rinne, Sarajevon lounaisosa.
- **Lähde:** en.wikipedia.org/wiki/Old_Jewish_Cemetery,_Sarajevo,
  johdanto, osiot "History" ja "Genizah".
- **Lainaus/perustelu:** "It is the largest Jewish cemetery in
  Southeast Europe, and second largest sepulchral complex in Europe
  after the Old Jewish Cemetery in Prague." — "Separate vault or
  'grave' for damaged books known as a Genizah, is located in the
  southeastern part of the cemetery, with the first burial taking
  place on 3 July 1916. Assumption is that some 14 chests of holy
  books were buried in the second burial ceremony."
- **Kuva (tarkistettu):** `Sarajevo Jewish Cemetery 1900.jpg`
  (2722×1743, **Public domain**, Rudolf Bernt, 1900) — aikalaiskuva,
  lähellä isoisän aikaa. Nykykuva: `Jewish Cemetery, Jevrejsko
  groblje Sarajevo.jpg` (1612×990, CC BY-SA 4.0, Tarik Alimanović,
  2020).
- **Varmuus:** VARMA — suoraan lähteessä. Genizan sisällön määrä on
  lähteen oma arvio ("Assumption is that some 14 chests") — kirjoita
  "arvion mukaan", älä "tasan neljätoista".
- **Ikäsopivuusrajaus:** sama artikkeli kertoo, että hautausmaa oli
  1990-luvulla rintamalinjalla ja tykistöasemana ja että se
  miinoitettiin (raivattu 1996). Tämä voidaan mainita yhdellä
  neutraalilla lauseella tai jättää pois; yksityiskohtia ei mukaan.

### 4. Sillan valmistumisvuosi on piilotettu maksajan nimeen [1873]

Marraskuun 15. päivänä 1791 tulva vaurioitti Latinalaissiltaa pahoin,
ja sarajevolainen kauppias **Abdulah-aga Briga** maksoi
jälleenrakennuksen. Joku laski aikanaan yhteen sanan "Briga"
kirjainten numeroarvot — summaksi tuli 1213, ja hidžra-kalenterin
vuosi 1213 on juuri se vuosi (1798/99), jona silta valmistui. Nimi on
siis samalla päivämääräleima.

- **Paikka:** Latinalaissilta (Latinska ćuprija), Miljacka, Stari
  Grad. Sillan nimi tulee siitä, että se yhdisti oikean rannan
  kaupungin katoliseen kortteliin, jota ottomaaniaikana kutsuttiin
  nimellä "Latinluk".
- **Lähde:** en.wikipedia.org/wiki/Latin_Bridge, osio "History".
- **Lainaus/perustelu:** "A terrible flood on 15 November 1791 badly
  damaged the bridge and its reconstruction was financed by the
  Sarajevo merchant Abdulah-aga Briga. Someone worked out that the
  year when it was rebuilt can be obtained from the numerical values
  in the word 'Briga' – it is 1213, which by Islamic calendar equals
  the year of the reconstruction 1798/99."
- **Kuva (tarkistettu):** `Sarajevo – Latinska ćuprija (2007).jpg`
  (1843×1382, **CC BY-SA 3.0**, Julian Nyča, 2007). Pelissä on jo
  kolme muuta Latinalaissilta-kuvaa (nahtavyysjutut.js) — tälle
  täylle sopii uusi kuvakulma tai vanha maalaus, joka on jo mukana.
- **Varmuus:** VARMA — suoraan lähteessä (lähde itse muotoilee
  "Someone worked out", eli kyseessä on perinteinen laskelma, ei
  rakennuttajan dokumentoitu aikomus; sano "joku laski aikanaan").
- **Kytkös peliin:** täydentää olemassa olevaa
  Latinalaissilta-nähtävyysjuttua ilman että toistaa siitä mitään.
  **[1873]** — isoisä olisi kävellyt tasan tämän sillan yli.

### 5. Kuuluisin yksityiskohta koko salamurhasta ei koskaan tapahtunut [1878+]

Yksi maailman toistetuimmista historiatarinoista kertoo, että Gavrilo
Princip oli syömässä voileipää Schillerin herkkukaupassa juuri ennen
laukauksia. Tarinaa ei ole missään aikalaislähteessä. Se on
todennäköisesti peräisin vuoden **2001 romaanista** *Twelve Fingers*,
jossa salamurhan tapahtumat on kaunokirjallistettu — ja josta
voileipä on karannut tietokirjoihin, dokumentteihin ja
tietovisakysymyksiin asti. Se, mikä on totta: Princip todella seisoi
Schillerin herkkukaupan edessä, ja siinä rakennuksessa toimii nykyään
museo "Sarajevo 1878–1918".

- **Paikka:** Latinalaissillan pohjoispää, kadunkulma; museo
  "Sarajevo 1878–1918" on juuri siinä rakennuksessa.
- **Lähde:** en.wikipedia.org/wiki/Assassination_of_Archduke_Franz_
  Ferdinand, osio "Assassination" (kaksi peräkkäistä kappaletta).
- **Lainaus/perustelu:** "...decided to move to a position near the
  Latin Bridge, in front of Schiller's Delicatessen (this building
  now houses the Museum of Sarajevo 1878–1918)." — "There is a myth
  which states that Princip had eaten a sandwich at Schiller's
  delicatessen just prior to the shooting, but there are no primary
  sources from the time which mention this. This myth likely
  originated from the 2001 novel Twelve Fingers..."
- **Kuva (tarkistettu):** `Muzej Sarajevo 1878-1918.jpg` (3072×2304,
  **CC BY-SA 4.0**, Smooth_O, 21.11.2009) — juuri se rakennus.
- **Varmuus:** VARMA — lähde itse toteaa sekä myytin että sen
  todennäköisen alkuperän.
- **Miksi tämä toimii täkynä:** se on "myytinmurtaja"-täky, ei
  väkivaltatarina. Pöllö voi kertoa sen kokonaan koskematta itse
  murhan yksityiskohtiin: *"Sinä olet varmaan kuullut sen
  voileivästä. Se ei ole totta, ja tiedän kuka sen keksi."*
  Perustuslain totuudellisuuspilari saa tästä hyvän hetken.
- **Ikäsopivuusrajaus:** itse salamurhan kuvaus (laukaukset,
  haavat, aseen sarjanumerot) EI mukaan. Pelissä on jo neutraali
  nosto "Silta, jolta maailma muuttui".

### 6. Sarajevo oli Wienin koekenttä — raitiovaunu tuli tänne ensin [1878+]

Sarajevon raitiotie avattiin **uudenvuodenpäivänä 1885**, ja se oli
Wienin ja koko Itävalta-Unkarin raitiovaunujen koelinja. Vaunut
vedettiin hevosilla. Rata rakennettiin 760 millimetrin
"bosnialaiselle" raideleveydelle, ja normaaliraiteelle se muutettiin
vasta 1960.

- **Paikka:** nykyinen linja kulkee Baščaršijasta länteen Ilidžaan;
  keskustan silmukka kiertää Miljackan rantaa.
- **Lähde:** en.wikipedia.org/wiki/Trams_in_Sarajevo, osio "History";
  vahvistus myös en.wikipedia.org/wiki/Sarajevo, osio
  "Austria-Hungary": "...used the city as a testing area for new
  inventions such as tramways, which were established in 1885 before
  they were later installed in Vienna."
- **Lainaus/perustelu:** "Opened on New Year's Day in 1885, the
  Sarajevo tramway was the testing line for the tram in Vienna and
  the Austro-Hungarian Empire, and operated by horses. Originally
  built to 760 mm ... Bosnian gauge, the present system was upgraded
  to 1,435 mm ... standard gauge in 1960."
- **Kuva (tarkistettu):** `Sarajevo Horse Tram (1885 - 1895).jpg`
  (750×465, **Public domain**, kaupungin arkistosta, 1885) — hevosten
  vetämä raitiovaunu itse. Pieni tiedosto, riittää miniatyyriksi ja
  keskikokoiseen nostoon, ei koko ruudun kuvaksi.
- **Varmuus:** VARMA — kaksi eri artikkelia sanovat saman.
- **1873-huomio:** isoisän matkan aikaan raitiotietä ei ollut.
  Pöllön repliikki voi olla juuri tämä: *"Kaksitoista vuotta sen
  jälkeen kun isoisäsi käveli tämän kadun, sitä pitkin kulki
  Euroopan ensimmäinen koeraitiovaunu — ja Wien sai omansa vasta
  Sarajevon jälkeen."*

### 7. Bosnialainen raideleveys, josta tuli koko keisarikunnan mitta [1878+]

Vuoden 1878 Berliinin kongressi antoi Itävalta-Unkarille luvan
miehittää ja hallita Bosnia ja Hertsegovinaa — brittiläisen
ehdotuksen pohjalta. Heti perään rakennettiin 190 kilometrin mittainen
sotilasrautatie Brodista Zenicaan, ja siihen käytettiin 760
millimetrin väliaikaisia kiskoja, jotka olivat jääneet yli toiselta
työmaalta. Kahdessa vuosikymmenessä tästä hätäratkaisusta kasvoi yli
1 000 kilometrin verkko — aikanaan Euroopan suurin yhtenäinen
kapearaideverkko — ja **760 mm sai nimen "bosnialainen raideleveys"**,
jota alettiin rakentaa muuallekin keisarikuntaan. Bosnian omat
pikaveturit vuosilta 1894–96 olivat Euroopan nopeimmat kapearaiteiset
veturit: sallittu huippunopeus 60 km/h.

- **Paikka:** Sarajevon rautatieasema ja koko maan vanha rataverkko;
  Zenica–Sarajevo-osuus avattiin 1882.
- **Lähde:** en.wikipedia.org/wiki/Bosnian_gauge, osio "History".
- **Lainaus/perustelu:** "After a British proposal the 1878 Berlin
  Congress permitted Austria-Hungary to occupy and govern
  Bosnia-Herzegovina instead of Turkey, the 190 km ... long
  Brod–Zenica military railway was built ... using the 760 mm ...
  temporary tracks and rolling stock used during the construction of
  the recently finished Timisoara–Oršava line." — "...whose length by
  the start of the 20th centuries exceeded 1,000 km ... making it the
  once largest interconnected narrow gauge network in Europe" —
  "...the Bosnia-Herzegovian National Railways' 2-4-2 express
  locomotives of 1894-96 were the fastest narrow gauge locomotives in
  Europe, with a 60 km/h ... permitted top speed."
- **Kuva:** EI TARKISTETTUA EHDOKASTA tässä erässä. Commons-haussa
  osui useita `Narrow-Gauge-Railway Bosnabahn ...` -nimisiä
  tiedostoja (esim. `Narrow-Gauge-Railway Bosnabahn
  Station-Sarajevo (3).jpg`), mutta niiden lisenssiä ja kokoa EI
  ehditty vahvistaa — **tarkistettava ennen käyttöä.**
- **Varmuus:** VARMA rautatiefaktoista. **TARKKUUSHUOMIO:**
  brittiehdotus koski *miehityslupaa*, EI raideleveyttä. Älä
  kirjoita "britit valitsivat Bosnian raideleveyden".
- **Miksi mukaan:** brittiläiselle päähenkilölle tämä on suora
  kytkös — hänen oma maansa esitti Berliinissä sen, mikä muutti
  isoisän näkemän kaupungin.

### 8. Ainoa jäljellä oleva karavaanimaja — ja siellä perustettiin vastarintahallitus [1873]

Morića Han rakennettiin 1551 ja nykyiseen muotoonsa vuoden 1697 palon
jälkeen. Se on Sarajevon **ainoa säilynyt han**, ja se oli aito
karavaaniseráji: toimiessaan siihen mahtui noin 300 matkustajaa ja 70
hevosta. Ottomaanimatkaaja Evliya Çelebi kirjoitti siitä käytyään
Sarajevossa 1659. Vain viisi vuotta isoisän matkan jälkeen, **29.
heinäkuuta 1878**, sarajevolaiset kokoontuivat juuri tähän pihaan,
perustivat Narodni Odbor -kansanneuvoston ja vastustivat
Itävalta-Unkarin miehitystä.

- **Paikka:** Morića Han, Sarači-katu, Baščaršija, Stari Grad. Osa
  Gazi Husrev-begin vakufia.
- **Lähde:** en.wikipedia.org/wiki/Morića_Han (koko artikkeli).
- **Lainaus/perustelu:** "It is the only surviving han in Sarajevo."
  — "...when operational, it could accommodate about 300 passengers
  and 70 horses. Evliya Çelebi, an Ottoman traveller, wrote about his
  visit to Sarajevo in 1659..." — "The citizens of Sarajevo gathered
  in Morića Han on 29 July 1878, established Narodni Odbor (English:
  Peoples Council) and protested against the occupation of Bosnia and
  Herzegovina by Austria-Hungary."
- **Kuva (tarkistettu):** `Morica Han.jpg` (4288×2848, **CC BY 2.0**,
  Jennifer Boyer, 9.6.2011) — hanin sisäpiha.
- **Varmuus:** VARMA — suoraan lähteessä. Nimen alkuperä on lähteessä
  itse kaksijakoinen (vuokralaissuku Morić vs. Morićin veljekset,
  jotka osallistuivat kapinoihin 1747–57) — kerro molemmat tai jätä
  nimikysymys pois.
- **1873-kytkös on täydellinen:** isoisä olisi voinut yöpyä siellä.
  Kaksitoista kuukautta ja muutama viikko myöhemmin samassa pihassa
  julistettiin vastarinta.

### 9. Kaupungin nimi tarkoittaa palatsia — ja perustaja oli panttivanki [1873]

Sarajevon perusti 1460-luvulla ottomaanikenraali **Isa-beg
Ishaković**, joka oli itse bosnialaista aatelissukua ja joutunut
ottomaanien haltuun panttivankina. Hän rakensi kylärypäälle
moskeijan, katetun kauppatorin, hamamin, karavaaniserájin, sillan — ja
kuvernöörin palatsin, **saray**, josta kaupunki sai nimensä. Moskeija
nimettiin Careva džamijaksi, Keisarin moskeijaksi, sulttaani Mehmed
Valloittajan kunniaksi; se valmistui 1457 ja oli ensimmäinen moskeija,
joka rakennettiin Bosnian valloituksen jälkeen. Nykyinen rakennus on
vuodelta 1565 ja on maan suurin yhden kupolin moskeija.

- **Paikka:** Careva džamija, Miljackan eteläpuoli, Bistrik; sillan
  toisella puolella Baščaršija.
- **Lähde:** en.wikipedia.org/wiki/Isa-Beg_Isaković, osiot "Origin"
  ja "Career"; en.wikipedia.org/wiki/Emperor%27s_Mosque (johdanto ja
  "History"); en.wikipedia.org/wiki/Sarajevo, osio "Ottoman era".
- **Lainaus/perustelu:** "Of Bosnian noble origin, he was recruited
  after being held hostage by the Ottomans." — "...the governor's
  palace ('Saray'), which gave the city its present name in
  conjunction with 'evo'." — "Completed in 1457 CE, it was the first
  mosque built after the Ottoman conquest of Bosnia ... it is the
  largest single-subdome mosque in the country."
- **Kuva (tarkistettu):** `Sarajevo - Careva džamija
  (49099921128).jpg` (5184×3456, **CC BY 2.0**, Fred Romero,
  20.8.2019).
- **Varmuus:** VARMA nimen alkuperästä, panttivankitaustasta ja
  moskeijasta. **HUOM ristiriita lähteiden välillä:** Sarajevo-
  artikkeli antaa perustamisvuodeksi 1461, Isa-beg-artikkeli 1463.
  Käytä muotoa "1460-luvulla" tai mainitse molemmat.
- **Pelissä jo:** Baščaršijan nähtävyysjutussa lukee "1462" —
  kolmas luku. Fablen kannattaa yhtenäistää tai käyttää
  vuosikymmentä.

### 10. Kirjasto, jonka perustaja määräsi ylijäämärahat kirjoihin [1873]

Bosnian kuvernööri Gazi Husrev-beg perusti 1537 medresan ja kirjoitti
perustamiskirjaan määräyksen: *"mitä rahaa medresan rakentamisesta jää
yli, käytettäköön hyvien kirjojen ostamiseen, joita lukijat käyttävät
medresassa ja joista tieteen harjoittajat jäljentävät."* Kirjasto ja
koulu toimivat samana yksikkönä yli kolmesataa vuotta, kunnes
kirjasto sai 1863 oman huoneen. Nyt kokoelmassa on yli 100 000
nidettä ja 10 500 käsikirjoituskoodeksia, joissa on noin 20 000
tekstiä. Piirityksen aikana käsikirjoitukset siirrettiin **kahdeksan
kertaa**, ja 500 arvokkainta piilotettiin pankin holviin.

- **Paikka:** Gazi Husrev-begin kirjasto ja medresa (Kuršumlija),
  Baščaršija.
- **Lähde:** en.wikipedia.org/wiki/Gazi_Husrev-beg_Library, osiot
  "Foundation", "Destruction and safekeeping" ja "Holdings".
- **Lainaus/perustelu:** "In the charter for its creation, the
  governor stipulated that 'whatever money remains from the
  construction of the madrasa shall be used for purchasing good
  books...'" — "...the library was moved to its own room [in 1863]"
  — "The manuscripts were moved eight times during the nearly
  four-year siege of the city. The 500 most valuable manuscripts were
  placed inside the vaults of the Privredna Banka."
- **Kuva (tarkistettu):** `Husein Rakim Islamovic, Ijazah Gazi Husrev
  Beg Library.jpg` (620×462, **Public domain**, Dr. Meliha Teparić) —
  kokoelman opetuslupakirja, kaunis kalligrafia. Rakennuskuvaksi:
  `Sarajevo gazi husrev bey Library qatar IMG 1088.JPG` (3264×2448,
  CC BY-SA 4.0, Bjoertvedt, 2015).
- **Varmuus:** VARMA — suoraan lähteessä.
- **1873-huomio:** kirjasto oli isoisän matkan aikaan ollut omassa
  huoneessaan tasan kymmenen vuotta.
- **Karvas lisä (varmennettu, valinnainen):** vuonna 1697 Eugen
  Savoyalaisen joukot ryöstivät kirjaston, ja mukana tuhoutuivat
  Sarajevon oikeusrekisterit — maanomistukset, avioliitot,
  oikeustapaukset. Sama lähde, sama osio.

### 11. Kaupungin suurin hyväntekijä oli sulttaanin oma pojanpoika [1873]

Gazi Husrev-beg (1484–1541) oli Bosnian sanjakbeg, joka rakennutti
suuren osan siitä, mikä on yhä Sarajevon vanhaakaupunkia, ja jätti
testamentissaan koko omaisuutensa vakufiin eli säätiöön. Yllättävä
osa: hänen isänsä oli bosnialainen aatelismies Humista, mutta hänen
**äitinsä Selçuk Sultan oli sulttaani Bajezid II:n tytär** — Gazi
Husrev-beg oli siis sulttaanin pojanpoika. Vakuf on yhä olemassa: sen
omistuksessa ovat muun muassa moskeija, medresa, kirjasto, bezistan,
hamam, Morića Han ja suuri joukko Baščaršijan kauppapaikkoja.

- **Paikka:** Gazi Husrev-begin moskeija ja sen pihan türbe
  (hautamausoleumi), Baščaršija.
- **Lähde:** en.wikipedia.org/wiki/Gazi_Husrev-beg, osiot "Origin",
  "Death" ja "Endowment".
- **Lainaus/perustelu:** "His mother, Selçuk Sultan, was the daughter
  of the Sultan Bayezid II, making Gazi Husrev-beg Beyazid II's
  grandson." — "His corpse was returned to Sarajevo, where it remains
  in a tomb in the courtyard of his mosque (türbe), next to the
  smaller one of Murat Bey Tardić, a former Christian prisoner
  converted to Islam and made his duke and deputy."
- **Kuva (tarkistettu):** `Sarajevo gazi husrev bey mausoleum IMG
  1278.JPG` (3264×2448, **CC BY-SA 4.0**, Bjoertvedt, 21.4.2015) —
  türbe moskeijan pihalla. Pienempi vaihtoehto: `Turbe Gazi
  Husrev-bega.jpg` (800×534, CC BY 2.0, N_Creatures, 2006).
- **Varmuus:** VARMA sukulaisuudesta, vakufista ja haudasta.
- **IKÄSOPIVUUSRAJAUS:** sama artikkeli kertoo legendan siitä, mitä
  hänen ruumiilleen tehtiin kaatumispaikalla Drobnjacissa. **EI
  mukaan** — lähde itse toteaa legendan yhteyden epäselväksi, ja
  aihe on tarpeettoman raaka. Käytä vain: ruumis tuotiin Sarajevoon
  ja haudattiin moskeijan pihaan.
- **Kytkös peliin:** moskeija on jo pelissä (nahtavyysjutut.js) —
  tämä on henkilön tarina, ei rakennuksen, joten päällekkäisyyttä ei
  synny.

### 12. Kivenhakkaaja nousi keisarikuntaa vastaan — ja kuoli Mekassa [1873]

Salih Vilajetović, tunnettu nimellä **Hadži Lojo** (1834–1887), oli
Sarajevossa louhostyöläinen, rahdinajaja ja medresan alkeisopettaja.
Hän nousi kaupungin tunnetuksi hahmoksi vastustaessaan ottomaanien
uudistuksia — ja **erityisesti kun hän vuonna 1872 johti vastustusta
uuden ortodoksisen kirkon rakentamiselle**. Vuonna 1878 hän kokosi
kaupungin muslimit, ortodoksit, juutalaiset ja osan katolisistakin
vastustamaan Itävalta-Unkarin miehitystä. Hänet tuomittiin ensin
kuolemaan, sitten viideksi vuodeksi vankeuteen, jonka hän istui
Theresienstadtissa Böömissä. Bosniaan häntä ei päästetty takaisin. Hän
lähti Turkkiin ja kuoli Mekassa.

- **Paikka:** Sarajevon vanhakaupunki; vuoden 1878 vastarintahallitus
  perustettiin Morića Haniin (ks. täky 8).
- **Lähde:** en.wikipedia.org/wiki/Hadži_Lojo (koko artikkeli).
- **Lainaus/perustelu:** "A quarry worker, transporter for hire,
  primary madrasa teacher, and bashi-bazouk, Lojo became noted in the
  city after joining the resistance to Ottoman reforms, and
  especially when he in 1872 led the opposition to the building of a
  new Orthodox church." — "Lojo rallied the Muslim, Orthodox, Jewish
  and even some Catholic citizens to fight." — "He was at first
  sentenced to death, then had his sentence reduced to five years in
  prison, which he then served in Terezín in Bohemia. As he was not
  allowed to return to Bosnia, Lojo went to Turkey after serving his
  sentence. He died in Mecca."
- **Kuva (tarkistettu):** `Salih Vilajetovic (Hadzi Lojo) preaches
  insurrection in the front of the gates of Sarajevo.jpg` (1080×771,
  **Public domain**, tekijä tuntematon, **1878**) — aikalaiskuva
  puheesta. Muotokuva: `Photo - Hadschi Loja.jpg` (1235×1881,
  Public domain, tekijä tuntematon).
- **Varmuus:** VARMA elämänvaiheista ja tuomiosta.
  **RAJAUS:** lähde kertoo myös, että hän teki 1870-luvulla
  "väkivaltaisia purkauksia ja ryöstöjä", että muut kapinajohtajat
  yrittivät murhata hänet 14.8.1879 ja että hän haavoitti itseään
  ennen pakoaan. Näitä ei tarvitse eikä kannata ottaa täkytekstiin;
  käytä vain yllä olevaa varmennettua kaarta.
- **1873-kytkös:** Hadži Lojo oli tasan isoisän matkavuonna
  Sarajevon puhutuin mies — edellisenä vuonna hän oli johtanut
  kirkkokiistaa. Erinomainen kohtaamishenkilön esikuva.

### 13. Maatalouskoulun perustustyöt paljastivat 7 000 vuotta vanhan kylän [1878+]

Vuonna 1893 Itävalta-Unkarin viranomaiset alkoivat rakentaa
maatalousoppilaitosta Ilidžan lähelle Butmiriin. Kaivinten alta tuli
esiin kivikautinen asuinpaikka. Kaivaukset kestivät 1896 asti ja
löydöt — omalaatuinen, runsaasti koristeltu keramiikka ja
ihmishahmoiset pikkupatsaat — herättivät niin paljon huomiota, että
kansainvälinen arkeologien ja antropologien kongressi pidettiin
**Sarajevossa elokuussa 1894**. Butmirin kulttuuri ajoittuu vuosiin
5100–4500 eaa., ja se on Bosnia ja Hertsegovinan vanhin
neoliittinen kohde.

- **Paikka:** Butmir, Ilidžan kupeessa Sarajevon länsipuolella; löydöt
  ovat Bosnia ja Hertsegovinan kansallismuseossa (sama museo kuin
  haggada, täky 2).
- **Lähde:** en.wikipedia.org/wiki/Butmir_culture, johdanto ja osiot
  "History" ja "Settlements".
- **Lainaus/perustelu:** "It was discovered in 1893, at the site
  located in Butmir, in the vicinity of Ilidža ... The Butmir culture
  was discovered in 1893, when Austro-Hungarian authorities began
  construction on the agricultural college of the University of
  Sarajevo ... The finds caused interest among archaeologists
  worldwide. They were largely responsible for the International
  Congress of Archaeology and Anthropology being held in Sarajevo in
  August 1894."
- **Kuva (tarkistettu):** `Butmir culture pottery fragments.png`
  (473×248, **Public domain**, Parkyn, Ernest Albert, 1915) —
  keramiikan palasia. Pieni; riittää miniatyyriin, ei suurennokseen.
- **Varmuus:** VARMA — suoraan lähteessä.
- **Kytkös peliin:** Vrelo Bosne ja Ilidža ovat jo pelissä
  (kulttuuri-kategoriat.js) — tämä on sama seutu, uusi tarina.
  Isoisä kävi Ilidžassa 1873, kaksikymmentä vuotta ennen kuin
  kukaan tiesi mitä maan alla oli.

### 14. Kaupunki, joka oli suurempi kuin Zagreb — ja jonka yksi päivä lähes pyyhki pois [1873]

Vuonna 1660 Sarajevossa arvioidaan olleen yli **80 000 asukasta**.
Vertailuksi: Belgradissa oli 1683 noin 100 000 ja Zagrebissa vielä
1851 vain 14 000. Sarajevo oli Istanbulin jälkeen valtakunnan suurin
ja tärkein ottomaanikaupunki Balkanilla, ja 1500-luvun puolivälissä
siellä oli yli sata moskeijaa. Sitten tuli vuosi 1697: Eugen
Savoyalaisen retkikunta valtasi kaupungin, ryösti sen perusteellisesti
ja poltti sen **yhdessä päivässä**. Pystyyn jäi kourallinen
kortteleita, muutama moskeija ja yksi ortodoksinen kirkko. Vuonna 1807
asukkaita oli enää noin 60 000 — yli sata vuotta myöhemmin.

- **Paikka:** koko vanhakaupunki; Vratnikin linnoitusvyö (Žuta ja
  Bijela tabija) rakennettiin nimenomaan vuoden 1697 jälkeen.
- **Lähde:** en.wikipedia.org/wiki/Sarajevo, osio "Ottoman era".
- **Lainaus/perustelu:** "By 1660, the population of Sarajevo was
  estimated to be over 80,000. By contrast, Belgrade in 1683 had
  100,000, and Zagreb as late as 1851 had 14,000 people." — "...a
  raid was led by Prince Eugene of Savoy ... which conquered Sarajevo
  and left it plague-infected and burned to the ground. After his men
  had looted thoroughly, they set the city on fire and destroyed
  nearly all of it in one day ... By 1807, it had only some 60,000
  residents."
- **Kuva (tarkistettu):** `Franz Leo Ruben, View of Bascarsija,
  Sarajevo.jpg` (512×726, **Public domain**, Franz Leo Ruben,
  n. 1900) — maalaus Baščaršijasta. Pieni; miniatyyriin ja
  keskikokoon.
- **Varmuus:** VARMA — luvut ja tapahtuma suoraan lähteessä
  (asukasluku on lähteen oma arvio, "estimated").
- **Kytkös peliin:** Keltainen linnake (Žuta tabija) on jo pelissä ja
  sen juttu mainitsee jo Eugen Savoyalaisen polttaneen kaupungin.
  Tämä täky tuo siihen **mittakaavan** — 80 000 vs. Zagrebin 14 000 —
  joka on täysin uusi tieto pelissä. Jos päällekkäisyys arveluttaa,
  käytä pelkkää asukaslukuvertailua ilman 1697-osaa.

### 15. Suihkulähde, jota isoisä EI voinut nähdä [molemmat]

Baščaršijan aukion tunnusmerkki, puinen Sebilj-lähde, on kaikkien
Sarajevo-kuvien keskipiste. Mutta alkuperäinen, Mehmed-pasha Kukavican
1753 rakennuttama Sebilj **paloi vuonna 1852**, ja nykyinen
rakennettiin vasta 1891 — itävaltalaisen arkkitehdin **Alexander
Wittekin** suunnittelemana, muutaman metrin päähän vanhasta paikasta.
Vuonna 1873 aukio oli siis tyhjä. Paikallinen tarina lupaa, että se
joka juo lähteen vettä, palaa vielä Sarajevoon. Kopioita on
lahjoitettu ympäri maailmaa: **Birminghamiin 2008**, Belgradiin 1989,
Novi Pazariin 2010, St. Louisiin 2014, Bursaan, Rožajeen 2018 ja
Uticaan 2025.

- **Paikka:** Sebilj, Baščaršijan aukion keskellä.
- **Lähde:** en.wikipedia.org/wiki/Sebilj (koko artikkeli;
  hakusana "Sebilj (Sarajevo)" ei ole olemassa, oikea otsikko on
  pelkkä "Sebilj").
- **Lainaus/perustelu:** "The original Sebilj was built by Mehmed
  Pasha Kukavica in 1753, but it was destroyed in a fire in 1852. It
  was reconstructed by the Austrian architect Alexander Wittek in
  1891, and was relocated to its present site several metres away
  from the position of the earlier structure. According to local
  legend, visitors who drink water from the fountain will return to
  Sarajevo someday."
- **Kuva (tarkistettu):** `Sebilj fountain, Sarajevo.jpg`
  (1632×2262, **CC BY-SA 3.0**, Pudelek / Marcin Szala, 8/2012).
- **Varmuus:** VARMA — suoraan lähteessä.
- **Miksi tämä on hyvä täky juuri tähän peliin:** se on
  matkakirjatäky. Pöllö voi näyttää nykykuvan ja kysyä, miksi
  isoisän päiväkirjassa ei lue siitä mitään — vastaus on, ettei sitä
  ollut. Ja **Birminghamin kopio** on suora silta brittiläiseen
  päähenkilöön.
- **EI VARMENNETTU:** Baščaršijan kuuluisat kyyhkyparvet, joita
  aukiolla ruokitaan, EIVÄT esiinny en-Wikipedian Sebilj- eikä
  Sarajevo-artikkelissa. Älä väitä niistä mitään ennen erillistä
  lähdettä (ks. Hylätyt).

---

## Eläintäkyt (omistajan lisäys 25.8.2026)

Omistajan linjaus kesken tämän työn: *"täkyihin pitää saada myös
SÖPÖJÄ ELÄINJUTTUJA — eläimet ovat tärkeitä kohdeyleisölle."*
Alla kolme, kaikki samalla lähdetarkkuudella kuin muut.

### 16. Sokea "ihmiskala", jota pidettiin lohikäärmeen poikasena [molemmat]

Dinaarisen karstin maanalaisissa vesissä — myös Bosnia ja
Hertsegovinassa — elää **olmi** (*Proteus anguinus*), Euroopan ainoa
kokonaan luolissa elävä selkärankainen. Se on sokea, väritön ja
säilyttää aikuisenakin toukkamaiset ulkokidukset. Paikalliset
kutsuvat sitä nimellä *čovječija ribica*, "ihmiskala", sen ihonvärin
takia. Vuonna 1689 luonnontutkija Valvasor kirjoitti, että rankkojen
sateiden jälkeen olmeja huuhtoutui maan alta pintaan ja että kansa
uskoi niiden olevan **maan alla asuvan lohikäärmeen poikasia**.
Kokeissa olmi on selvinnyt jopa **kymmenen vuotta ilman ruokaa**, ja
sen elinikä on arvioitu yli sadaksi vuodeksi (keskimääräinen aikuinen
noin 68,5 vuotta).

- **Paikka:** Vjetrenican luola, Popovo polje, Ravno,
  Itä-Hertsegovina (fokuskohde `vjetrenica`, ks.
  fokuskohteet-bosnia.md kohta 11). Vjetrenica on maailman
  lajirikkain luola: yli 200 lajia, joista noin 37 kuvattiin
  tieteelle ensimmäisen kerran juuri siellä.
- **Lähde:** en.wikipedia.org/wiki/Olm, johdanto ja osiot "Common
  names", "Breeding and longevity" sekä "First written mention";
  en.wikipedia.org/wiki/Vjetrenica_Cave, johdanto.
- **Lainaus/perustelu:** "...the only exclusively cave-dwelling
  chordate species found in Europe ... endemic to the waters that
  flow underground through the extensive limestone bedrock of the
  karst of Central and Southeastern Europe ... and Bosnia and
  Herzegovina." — "It was first mentioned in 1689 by the local
  naturalist Valvasor ... who reported that, after heavy rains, the
  olms were washed up from the underground waters and were believed
  by local people to be a cave dragon's offspring." — "It is also
  called the 'human fish' by locals because of its fleshy skin color
  ... Bosnian: čovječija ribica..." — "Controlled experiments have
  shown that an olm can survive up to 10 years without food." — "A
  study published in Biology Letters estimated that they have a
  maximum lifespan of over 100 years and that the lifespan of an
  average adult is around 68.5 years."
- **Kuva (tarkistettu):** `P anguinus1.jpg` (1920×1279,
  **CC BY-SA 3.0**, Arne Hodalič) — olmi vedessä, kidukset näkyvissä.
  Luolakuva: `Vjetrenica Cave Inside 2024.jpg` (4032×3024, **CC0**,
  Bdx, 29.8.2024).
- **Varmuus:** VARMA olmin biologiasta, nimestä ja lohikäärmeuskosta
  sekä siitä, että lajia esiintyy Bosnia ja Hertsegovinassa.
  **EPÄVARMA:** en-Wikipedian **Vjetrenica-artikkeli EI itse mainitse
  olmia** — se puhuu vain yli 200 lajista ja korkeasta
  endeemisyydestä. Älä siis kirjoita "Vjetrenicassa asuu olmi"
  ilman lisälähdettä; turvallinen muoto on "Hertsegovinan karstin
  maanalaisissa vesissä". Valvasorin 1689-havainto on kirjattu
  Kranjista (nyk. Slovenia), ei Bosniasta — sano "Dinaarisen karstin
  alueella", älä "sarajevolaiset uskoivat".

### 17. Seitsemänsataa hevosta jätettiin ylängölle — ja ne jäivät sinne [1878+]

Cincar-vuoren juurella Livnon ja Kupresin välillä laukkaa yli **700
villiintynyttä hevosta** noin 145 neliökilometrin alueella. Ne eivät
ole muinaista alkuperää: ne polveutuvat hevosista, jotka omistajat
päästivät vapaaksi **1950-luvulla**, kun koneet korvasivat ne. Lauma
jäi ylängölle, lisääntyi ja on saanut **suojellun aseman vuodesta
2010**.

- **Paikka:** Cincar-vuoren rinteet, Livnon ja Kupresin välissä,
  Lounais-Bosnia. Livno n. 43,82694°N 17,0075°E, Cincar n.
  43,90222°N 17,06278°E (en-Wikipedian coordinates-rajapinta).
  Ympärillä Livanjsko polje, maailman suurin karstikenttä
  (458,7 km²) ja Ramsar-kohde vuodesta 2008.
- **Lähde:** en.wikipedia.org/wiki/Feral_horse, osio "Europe";
  ympäristö: en.wikipedia.org/wiki/Livanjsko_Polje, johdanto ja osio
  "Ramsar wetland site".
- **Lainaus/perustelu:** "More than 700 feral wild horses live in the
  foothills of Cincar Mountain, between Livno and Kupres, Bosnia and
  Herzegovina, in an area of roughly 145 km2 (56 sq mi). These
  animals, which descend from horses set free by their owners in the
  1950s, enjoy a protected status since 2010."
- **Kuva (tarkistettu):** `Livno wild horses (1).jpg` (1600×1200,
  **CC BY 2.0**, Brian Eager, 19.7.2012). Vaihtoehto samasta
  sarjasta: `Livno Wild horses (13) (7608971292).jpg` (1600×1200,
  CC BY 2.0, sama tekijä ja päivä).
- **Varmuus:** VARMA — suoraan lähteessä.
  **HUOM:** en-Wikipedian omat **Livno-** ja **Livanjsko
  Polje** -artikkelit EIVÄT mainitse hevosia lainkaan; ainoa
  varmennettu lähde tässä erässä on "Feral horse". Se riittää, mutta
  jos halutaan tarkempia lukuja tai vuosilukuja, tarvitaan uusi
  lähde.
- **Miksi tämä on paras eläintäky:** se on tosi, söpö, visuaalinen
  ja siinä on käänne (ei muinaisia villihevosia vaan hylättyjä
  työhevosia, jotka pärjäsivät). Sopii myös omaksi karttakohteeksi
  (ks. fokuskohteet-bosnia.md, varapenkki).

### 18. Metsä, jota ei ole koskaan hakattu — ja sen asukkaat [1878+]

Sutjeskan kansallispuistossa on **Perućica**, aarniometsä, jota ei ole
koskaan hakattu. Pyökit kasvavat siellä yli 60 metriä korkeiksi ja
noin 150 senttimetrin ympärysmittaan, ja osa puista on 300 vuotta
vanhoja. Puistossa on nähty **karhuja, gemssejä, susia, näätiä,
villikissoja, kettuja ja villivuohia** — erityisesti juuri
Perućicassa — ja siellä elää yli 300 lintulajia, muun muassa
maakotka, metso ja muuttohaukka. Balkanin gemssi on menestynyt niin
hyvin, että puistosta siirrettiin vuosina 1963–1987 yhteensä **256
gemssiä** kolmelletoista muulle alueelle Bosniassa ja Kroatiassa.

- **Paikka:** Sutjeskan kansallispuisto, Kaakkois-Bosnia (fokuskohde
  `sutjeska`, ks. fokuskohteet-bosnia.md kohta 7). Puisto n.
  43,33333°N 18,68333°E; Maglić-vuori (2 386 m) n. 43,28111°N
  18,73694°E.
- **Lähde:** en.wikipedia.org/wiki/Sutjeska_National_Park, osiot
  "Flora" ja "Fauna".
- **Lainaus/perustelu:** "Perućica forest consists of large beech
  trees as high as 60 metres (200 ft) or more, with girth of about
  150 centimetres ... The trees in the Perućica primeval forest have
  never been logged and some of them are as old as 300 years." —
  "Bear, chamois, boar, wolf, pine marten and mink marten, wildcat,
  fox, and wild goats have been sighted in the park, particularly in
  the Perućica forests. The park has more than 300 species of birds
  ... During 1963–1987, 256 chamois were successfully introduced in
  13 other areas in Bosnia and Herzegovina, Croatia."
- **Kuva (tarkistettu, metsä):** `Perućica primeval forest
  (7901927430).jpg` (3648×2736, **CC BY 2.0**, Erwan Martin,
  17.8.2012).
- **Kuva (karhu) — HUOM:** Commonsista EI löytynyt tässä erässä
  yhtään varmennettua **Bosniassa kuvattua** karhuvalokuvaa
  (hakusanat "brown bear Bosnia", "Ursus arctos arctos forest"
  palauttivat vain PDF-kirjoja). Yleiskuva on olemassa ja
  tarkistettu: `Ursus arctos arctos.jpg` (1600×1200, **Public
  domain**, Joshua Lutz, 16.3.2005) — mutta **kuvauspaikka ei ole
  Bosnia**, joten kuvatekstissä on sanottava "euroopanruskeakarhu",
  ei "Sutjeskan karhu". Vaihtoehto: käytä metsäkuvaa ja anna
  eläinten olla tekstissä.
- **Varmuus:** VARMA metsästä, lajilistasta ja gemssiluvuista.
  **TARKKUUSHUOMIO:** lähde sanoo "have been sighted" — kirjoita
  "puistossa on nähty", ei "puistossa asuu X karhua". Karhukantojen
  kokoa EI ole tässä lähteessä.

---

## Hylätyt ehdokkaat

1. **Baščaršijan kyyhkyt.** Kaupungin tunnetuin eläinaihe (aukion
   kyyhkyparvet ja niiden ruokkiminen) EI löydy en-Wikipedian
   "Sebilj"- eikä "Sarajevo"-artikkelista. Hakuja ei jatkettu muihin
   lähteisiin. Ei käyttöön ennen varmennusta — sääli, koska se olisi
   ollut paras "söpö eläin + jo olemassa oleva kohde" -osuma.
2. **Gavrilo Principin jalanjäljet jalkakäytävässä.** Fakta on
   varmennettu (en-Wikipedia "Gavrilo Princip": "During the Bosnian
   War, embossed footprints marking where Princip fired the fatal
   shots were torn out"), samoin se, että vuoden 1930 muistolaatta
   annettiin **Hitlerille syntymäpäivälahjaksi** 1941 ja katosi
   1945. Molemmat ovat vahvaa täkyainesta, mutta ne kiinnittyvät
   suoraan salamurhaan ja toiseen maailmansotaan; peli käsittelee
   1914:ää jo yhdellä neutraalilla nostolla. Jätetty pois — Fable
   päättäköön, mahtuuko sävyyn.
3. **Sarajevon tunneli (1993).** Erittäin vahva tarina, mutta se on
   sota-aihe ja peli käsittelee piiritystä jo olemassa olevassa
   sisällössä. Tehtävänannon ohje ("ei skandaalisointia sodasta")
   pätee: jos tämä otetaan, se kuuluu matkakirjan vakavaan kehykseen,
   ei täkyyn.
4. **Sarajevon synagogat.** Varmennettu hyvin
   (en.wikipedia.org/wiki/Sarajevo_Synagogue): juutalaiset saapuivat
   1541 Thessalonikin kautta, oma kortteli El Cortijo 1577,
   ensimmäinen synagoga 1580, aškenasit vasta 1878 miehityksen
   jälkeen, nykyinen synagoga 1902 (Wilhelm Stiassnyn luonnos, jonka
   maakuntahallitus hylkäsi, lopullinen suunnitelma Karel Pařík).
   Sisältö on hyvää mutta enemmän oppikirjamaista kuin
   "lukonreikä"-koukkua — jätetty pois tilan takia, kelpaa
   varapelaajaksi.
5. **Svrzon talo.** en-Wikipedian artikkeli on niin lyhyt (636
   merkkiä), ettei siitä irronnut tarkistettua koukkua. Hylätty
   toistaiseksi.
6. **Sahat-kula ja kuukalenterin mukaan käyvä kello.** JO PELISSÄ
   (kulttuuri-kategoriat.js, "Kello, joka seuraa aurinkoa"). Ei
   uutena täkynä.
7. **Vrelo Bosne.** JO PELISSÄ (kulttuuri-kategoriat.js,
   matkailijalle-kuva). Butmirin täky (13) sijoittuu samalle
   seudulle mutta on eri asia.
8. **"Euroopan Jerusalem" ja Ferhadijan messinkiviiva.** JO PELISSÄ
   kahdessa paikassa (europe-questions.js, kulttuuri-kategoriat.js).
9. **Bosnian pyramidit (Visoko).** Erinomaista aineistoa, mutta se
   on selvästi klikkiotsikko eikä paikkatäky — siirretty
   kokonaisuudessaan tiedostoon takynostot-bosnia.md (ehdokas 1).
10. **Gazi Husrev-begin kuoleman legenda Drobnjacissa.** Lähteessä,
    mutta rajattu pois ikäsopivuuden vuoksi (ks. täky 11).

---

## Yhteenveto

**18 täkyä, kaikki tarkistettu; 15 kaupunkitäkyä + 3 eläintäkyä.**
Yksikään ei jäänyt kokonaan vahvistamatta. Neljässä kohdassa on
merkitty erikseen osaväite, jota lähde ei kanna (Inat kućan
kultarahat, olmin esiintyminen nimenomaan Vjetrenicassa, Livnon
hevoset vain yhdessä artikkelissa, brittiehdotuksen sisältö
Berliinissä 1878) — ne on kirjoitettu näkyviin, ei piiloon.
Kuvista **17/18 on tarkistettu Commonsin imageinfo-rajapinnalla**;
yksi (täky 7, kapearaiderautatie) jäi ilman vahvistettua tiedostoa
ja on merkitty selvästi.

**Kolme parasta ehdotustani:**

1. **#1 — Talo, joka siirrettiin joen yli kivi kiveltä pelkästä
   uhmasta.** Tämä on Sarajevon "Zappeionin pää seinässä": yhden
   lauseen koukku, konkreettinen paikka, käänne joka nostaa hymyn, ja
   se kiinnittyy suoraan rakennukseen (Vijećnica), joka on jo
   pelissä — eli halpa toteuttaa ilman uutta kohdetta. Kuva on
   suurikokoinen ja vapaasti käytettävä. Ja se kertoo Bosniasta
   jotain olennaista *inat*-sanan kautta ilman että kukaan pitää
   luentoa.

2. **#5 — Kuuluisin yksityiskohta koko salamurhasta ei koskaan
   tapahtunut.** Ainoa täky listalla, joka **poistaa** pelaajan
   päästä väärän tiedon sen sijaan että lisäisi uutta. Pöllölle
   täydellinen repliikki (se on lukenut lähteet), Perustuslain
   totuudellisuuspilarille näyteikkuna, ja se antaa tavan koskettaa
   vuotta 1914 kaupungin tunnetuimmassa kohdassa **ilman** että
   pitää kertoa itse murhasta. Lähde nimeää myytin alkuperän
   (2001-romaani) — lunastus on siis poikkeuksellisen tiukka.

3. **#17 — Seitsemänsataa hevosta jätettiin ylängölle.** Paras
   eläintäky: söpö, visuaalinen, ja siinä on aito käänne — nämä
   eivät ole muinaisia villihevosia vaan traktorien tieltä
   vapautettuja työhevosia, jotka jäivät vuorille ja saivat lopulta
   suojelun. Toimii yhtä hyvin täkynä, karttakohteena ja
   klikkiotsikkona, ja tarkistettuja CC-kuvia on koko sarja samalta
   kuvaajalta.

Kunniamaininnat: **#8 (Morića Han, 29.7.1878)** on paras
1873-kytkös — isoisä olisi voinut yöpyä siinä pihassa, jossa viisi
vuotta myöhemmin julistettiin vastarinta. **#15 (Sebilj, jota ei
vielä ollut)** on hienoin matkakirjatäky: pöllö näyttää kuvan ja
kysyy, miksi päiväkirja vaikenee. **#16 (olmi)** on lajina niin
outo, että se kantaa yksinään — mutta lue sen varmuusrajaus ennen
kirjoittamista.
