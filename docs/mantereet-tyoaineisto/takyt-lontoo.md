# Täkyehdokkaat: Lontoo

PANKISSA: käytetään kun Lontoon fokusvirta tehdään; KESKEN — vain
tähän mennessä varmistetut. Prioriteetti siirtyi Ateenasta itään
kesken tämän työn, joten tätä ei ole viety loppuun (kts. lopun
"Kesken jäänyt" -huomautus) eikä uusia varmistuksia ole tehty sen
jälkeen. Kaikki alla olevat 15 täkyä ON kuitenkin täysin varmistettu
en-Wikipediasta samalla tarkkuudella kuin Ateena-työaineistossa.

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten. Kaikki täkyt on
tarkistettu en-Wikipediasta hakemalla artikkelin raakateksti curlilla.
Ei mitään muistinvaraista.

## Tarkistustapa

- Wikipedia-artikkelit haettu komennolla
  `curl -sS "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
- 429-vastauksiin (rajoitus) uusi yritys kasvavalla viiveellä (3 s, 6 s,
  9 s...). Kaikki tässä raportissa käytetyt haut onnistuivat lopulta.
- Jokainen täky perustuu suoraan lainattuun tai tiivistettyyn kohtaan
  haetusta artikkelista — ei ennakkotietoon.
- Koordinaatit ovat karttatuntemukseen perustuvia likiarvoja
  (paikkojen yleistä sijaintia), EIVÄT peräisin viitatusta
  Wikipedia-tekstistä — merkitty "n." ja tarkistettava kartalta ennen
  julkaisua, jos tarkkuus on tärkeä.

## Olemassa oleva Lontoo-sisältö repossa

Nopea `grep -ri "lontoo\|london" js/packs/` -katsaus ennen työn
aloitusta:

- **js/packs/nahtavyysjutut.js** (`lontoo:`-lohko, rivit n. 1439–1652):
  kuusi valmista nähtävyysjuttua — Buckinghamin palatsi (14-vuotias
  murtautuja Edward Jones, 775 huonetta, lipputanko), Trafalgar Square
  (Nelsonin pylväs, mätänevän leijonan malli 1867, kyyhkyskielto 2003),
  Big Ben (haljennut kello 1859, pennit heilurilla, latinalainen
  rukous), Lontoon silmä (epäsymmetrinen tuki, kapselit ilman
  numeroa 13), Pyhän Paavalin katedraali (Kuiskausgalleria, Wren,
  "circumspice"-hautakirjoitus, 1940-valokuva), Tower Bridge
  (teräsluuranko kiviverhoiltuna, sekaannus vanhan London Bridgen
  kanssa joka myytiin Arizonaan 1968).
- **js/packs/kulttuuri-kategoriat.js** (`lontoo:`-lohko, rivit n.
  49–689): laaja "Matkailijan Lontoo" -kokonaisuus (kylien rykelmä,
  liikenne, kuninkaalliset puistot, ilmaismuseot, pubikulttuuri,
  ilta, hintataso, metron sulkeutuminen); Canaletto maalasi myös
  Lontoon (Thames/Pyhän Paavalin, City sillan kaaren läpi,
  Northumberland House, Ranelaghin rotunda); pubi jossa Dickens istui
  (The George, Southwark, viimeinen parvekekäytävällinen majatalo);
  suojatie jota jonotetaan (Abbey Road); metron tunnelissa savusi
  höyryveturi (Lontoon metro avattiin 10.1.1863, toiseksi vanhin
  kaupunkirata); Leake Streetin graffititunneli; tyhjä jalusta ja
  2 400 ihmistä (Fourth Plinth); voimalasta tuli taidesali (Tate
  Modern); veistos jonka sisällä on liukumäki.
- **js/packs/europe-artikkelit.js**: Lontoo-artikkeli (satama,
  City of London 2,9 km², 33 hallintoaluetta, metrokartan
  vaikutusvalta, jalkapallon säännöt kirjoitettiin Lontoossa).
- **js/packs/pollo-kysymykset.js** (rivi 136 alkaen): kysymyspatteri
  — miksi Lontoo syntyi Thamesin mutkaan, suuri palo 1666, miksi
  Canaletto maalasi Lontoota, lontoolainen lehti helmenpyynnistä
  (tämä koskee Ceylonia, ei itse Lontoon paikkaa).
- **js/packs/europe.js**: Lontoo kartalla lähtöpisteenä/lentokenttänä,
  reitit muihin kaupunkeihin.

**Johtopäätös:** Buckinghamin palatsi, Trafalgar Square, Big Ben,
Lontoon silmä, Pyhän Paavalin katedraali, Tower Bridge, Lontoon metro
(1863), Canaletto, Dickensin pubi (The George), Abbey Road, Leake
Street, Fourth Plinth, Tate Modern ja suuri palo 1666 (yleistasolla)
ovat KAIKKI JO KÄYTÖSSÄ. Alla olevat täkyt on valittu välttämään
päällekkäisyys näiden kanssa — uusia paikkoja ja yksityiskohtia.

---

## Täkyt

### 1. Klubi, jossa herra Foggin nimikkosukulainen löi vetoa maailmanympärimatkasta — samana vuonna 1873

Reform Club Pall Mallilla ei ole vain historiallinen herrasmiesklubi:
se on paikka, jossa Jules Vernen kuvitteellinen Phileas Fogg lyö
vetoa pystyvänsä kiertämään maailman 80 päivässä — matka alkaa ja
päättyy juuri tämän klubin ovilta. Romaani ilmestyi kirjana täsmälleen
vuonna 1873, saman vuoden, jona isoisä Horatio Fogg kirjoitti oman
matkapäiväkirjansa.

- **Paikka:** Reform Club, 104 Pall Mall, Lontoo. n. 51.5074°N,
  0.1332°W
- **Lähde:** en.wikipedia.org/wiki/Reform_Club
- **Lainaus/perustelu:** "The club appears in Jules Verne's Around the
  World in Eighty Days, published in 1872, as a novel in 1873. The
  protagonist, Phileas Fogg, is a member of the Reform Club. He sets
  out to circumnavigate the world on a bet from his fellow members,
  beginning and ending at the club."
- **Varmuus:** VARMA — suoraan lähteessä. Erinomainen 1873-kytkös ja
  suora yhteys pelin oman "herra Foggin" nimeen — kannattaa harkita
  tämän nostamista erityisen näkyväksi.

### 2. Teeklipperi, joka sai uuden kapteenin juuri vuonna 1873

Cutty Sark rakennettiin 1869 yhdeksi viimeisistä ja nopeimmista
teeklippereistä. Vuonna 1873 laivan komentoon astui kapteeni
W. E. Tiptaft, joka teki ensimmäisellä paluumatkallaan Kiinasta
118 päivässä — vaikka joutui tekemään 600 mailin lisälenkin Jangtse-
jokea ylös rahtia etsiessään. Nykyään laiva on kuivatelakalla
Greenwichissä nähtävissä.

- **Paikka:** Cutty Sark, Greenwich (nykyinen sijainti). n. 51.4826°N,
  0.0077°W
- **Lähde:** en.wikipedia.org/wiki/Cutty_Sark
- **Lainaus/perustelu:** "Captain W. E. Tiptaft assumed command in
  1873 achieving 118 days on his first return trip, but after the
  ship had to travel 600 nautical miles (1,100 km) up the Yangtze
  River in search of a cargo."
- **Varmuus:** VARMA — suoraan lähteessä. Täsmällinen 1873-kytkös.

### 3. Konserttisali, jossa säveltäjä kuuli oman teoksensa kahdesti

Royal Albert Hallin avasi kuningatar Viktoria itse vuonna 1871 —
kaksi vuotta ennen isoisän matkaa. Avajaiskonsertissa paljastui heti
salin kaikuongelma: kaiun poistamiseksi kupolin alle ripustettiin
purjekangaskatos, mutta ongelma ei kadonnut. Sali sai pian liikanimen:
ainoa paikka, jossa brittisäveltäjä voi olla varma kuulevansa teoksensa
kahdesti.

- **Paikka:** Royal Albert Hall, Kensington Gore. n. 51.5009°N,
  0.1774°W
- **Lähde:** en.wikipedia.org/wiki/Royal_Albert_Hall
- **Lainaus/perustelu:** "In the concert that followed, the hall's
  acoustic problems immediately became apparent... it used to be
  jokingly said the hall was 'the only place where a British composer
  could be sure of hearing his work twice.'"
- **Varmuus:** VARMA — suoraan lähteessä. Sali oli täsmälleen tässä
  tilassa (kangaskatos, ei vielä "sieniä") vuonna 1873.

### 4. Lasipalatsi, joka seisoi vielä pystyssä isoisän matkan aikaan

Vuoden 1851 suuren näyttelyn valtava lasi- ja rautarakennus purettiin
Hyde Parkista ja pystytettiin uudelleen Etelä-Lontoon Sydenhamiin
1854 — ja seisoi siellä aina vuoteen 1936 asti, jolloin se tuhoutui
tulipalossa. Vuonna 1873 rakennus oli siis yhä täydessä käytössä ja
katsottavissa.

- **Paikka:** Crystal Palace Park, Sydenham. n. 51.4227°N, 0.0703°W
- **Lähde:** en.wikipedia.org/wiki/The_Crystal_Palace
- **Lainaus/perustelu:** "It stood there from June 1854 until its
  destruction by fire in November 1936."
- **Varmuus:** VARMA — suoraan lähteessä.

### 5. Päivällinen dinosauruksen sisällä

Crystal Palace -puistoon rakennettiin 1850-luvulla maailman
ensimmäiset elämänkokoiset dinosaurusveistokset. Kun mallit
paljastettiin, kuvanveistäjä Hawkins järjesti uudenvuoden aatoksi
1853 päivällisen — pöytäseurueineen kaikkineen — suoraan yhden
Iguanodon-mallin valumuotin sisällä.

- **Paikka:** Crystal Palace Park, dinosauruspuisto. n. 51.4213°N,
  0.0678°W
- **Lähde:** en.wikipedia.org/wiki/Crystal_Palace_Dinosaurs
- **Lainaus/perustelu:** "To mark the launch of the models, Hawkins
  held a dinner on New Year's Eve 1853 inside the mould of one of the
  Iguanodon models."
- **Varmuus:** VARMA — suoraan lähteessä. Veistokset olivat yhä
  paikoillaan vuonna 1873 (ja ovat yhä nähtävissä nykyään).

### 6. Rautatie, joka kuljetti vain vainajia ja suruväkeä — ja jaotteli molemmat luokkiin

Lontoon Necropolis Railway avattiin 1854 kuljettamaan ruumiita ja
saattoväkeä omalta asemaltaan Waterloolta 37 kilometrin päähän
Brookwoodin hautausmaalle. Sekä matkustajat että ruumiit jaettiin
juniin ja odotushuoneisiin uskonnon JA yhteiskuntaluokan mukaan, jottei
eri taustaa olevia — eläviä tai kuolleita — tarvinnut sekoittaa
keskenään.

- **Paikka:** Alkuperäisen Necropolis-aseman paikka, Westminster
  Bridge Road, lähellä Waterloota. n. 51.4989°N, 0.1097°W
- **Lähde:** en.wikipedia.org/wiki/London_Necropolis_Railway
- **Lainaus/perustelu:** "The station waiting rooms and the
  compartments of the train, both for living and for dead passengers,
  were partitioned by both religion and class to prevent both mourners
  and cadavers from different social backgrounds from mixing."
- **Varmuus:** VARMA — suoraan lähteessä. Rautatie oli täydessä
  toiminnassa vuonna 1873 (liikennöi vuoteen 1941 asti).

### 7. Pylväs, joka on salaa jättimäinen tiedelaite

Suuren palon 1666 muistomerkki näyttää tavalliselta pylväältä, mutta
sen suunnitteli tiedemies Robert Hooke kaksoiskäyttöön: sen korkeus
mittaa täsmälleen etäisyyden paikkaan, josta palo sai alkunsa, ja
pylvään sisällä oleva kuilu toimi alun perin teleskooppina ja
heiluri-/painovoimakokeiden laitteena, joka yhdistyi maanalaiseen
laboratorioon.

- **Paikka:** The Monument, Monument Street / Fish Street Hill.
  n. 51.5101°N, 0.0858°W
- **Lähde:** en.wikipedia.org/wiki/Monument_to_the_Great_Fire_of_London
- **Lainaus/perustelu:** "Its height marks its distance from the site
  of the shop of Thomas Farriner... where the blaze began." ja
  "[Hooke] built the monument to double-up as a scientific
  instrument. It has a central shaft meant for use as a zenith
  telescope and for use in gravity and pendulum experiments that
  connects to an underground laboratory."
- **Varmuus:** VARMA — suoraan lähteessä. (Häkki hyppäämistä vastaan
  lisättiin "1800-luvun puolivälissä" kuuden itsemurhan jälkeen
  1788–1842 — oli siis jo paikallaan 1873.)

### 8. Uusi rantakatu 318 miljoonan tiilen viemärin päällä

Kun Lontoon Thames oli 1850-luvulla avoviemäri ja "suuri löyhkä" 1858
pakotti parlamentin toimimaan, insinööri Joseph Bazalgette rakensi
maanalaisen viemäriverkoston, joka piiloutui uuden Victoria
Embankment -rantakadun alle. Katu avattiin virallisesti 13.7.1870 —
vain kolme vuotta ennen isoisän matkaa — ja itse tunnelijärjestelmä
vaati 318 miljoonaa tiiltä.

- **Paikka:** Victoria Embankment, Thamesin pohjoisranta. n. 51.5097°N,
  0.1189°W
- **Lähde:** en.wikipedia.org/wiki/London_sewerage_system
- **Lainaus/perustelu:** "Victoria Embankment was finally officially
  opened on 13 July 1870." ja "Construction of the interceptor system
  required 318 million bricks, 2.7×10⁶ cubic metres of excavated earth
  and 670,000 cubic metres of concrete."
- **Varmuus:** VARMA — suoraan lähteessä.

### 9. Seitsemän hautausmaan sarja, joka pelasti kaupungin ruumiskriisiltä

Highgate Cemetery avattiin 1839 osana "Suurenmoista seitsikkoa" —
seitsemää uutta suurta hautausmaata Lontoon kehälle, koska
kaupunginsisäiset kirkkomaat eivät enää mahduttaneet vainajia ja niitä
pidettiin terveysriskinä. Egyptiläistyylinen "Egyptian Avenue" ja
pyöreä "Circle of Lebanon" olivat jo tuolloin paikallaan.

- **Paikka:** Highgate Cemetery, Pohjois-Lontoo. n. 51.5674°N,
  0.1462°W
- **Lähde:** en.wikipedia.org/wiki/Highgate_Cemetery
- **Lainaus/perustelu:** "The cemetery in its original form... opened
  in 1839 by the London Cemetery Company, as part of a plan to provide
  seven large, modern cemeteries, now known as the 'Magnificent
  Seven'... The inner-city cemeteries... had long been unable to cope
  with the number of burials and were seen as a hazard to health."
- **Varmuus:** VARMA — suoraan lähteessä.

### 10. Hotelli, jossa suihkusta tuli ensin vettä eikä savua

The Langham valmistui 1865 kustannuksella 300 000 puntaa ja oli
avatessaan Lontoon suurin ja nykyaikaisin hotelli: 100 vesikäymälää,
36 kylpyhuonetta ja Englannin ensimmäiset hydrauliset hissit. Vuonna
1867 hotellin johtoon tuli entinen yhdysvaltalainen everstiluutnantti,
mikä toi hotellille runsaasti amerikkalaisia vieraita.

- **Paikka:** The Langham, Langham Place / Portland Place, Marylebone.
  n. 51.5178°N, 0.1436°W
- **Lähde:** en.wikipedia.org/wiki/The_Langham,_London
- **Lainaus/perustelu:** "It was, at the time, the largest and most
  modern hotel in the city, featuring 100 water closets, 36 bathrooms
  and the first hydraulic lifts in England."
- **Varmuus:** VARMA — suoraan lähteessä. Hotelli oli täydessä
  toiminnassa vuonna 1873.

### 11. Naisten leikkaussali, joka unohtui vinttiin vuosikymmeniksi

Kun St Thomasin sairaala muutti pois Southwarkista 1862, sen vanha
leikkaussali — jossa hoidettiin vain naispotilaita ilman nukutusta,
veri valuen pöydän alla olevaan sahanpurulaatikkoon — suljettiin ja
unohdettiin kirkon vintille. Sitä ei löydetty uudelleen ennen kuin
vuonna 1957 — se oli siis ollut piilossa aivan Lontoon keskustassa,
kirkon katon alla, koko isoisän matkan ajan ja vielä 84 vuotta
sen jälkeen.

- **Paikka:** Old Operating Theatre Museum, 9a St Thomas Street,
  Southwark. n. 51.5035°N, 0.0899°W
- **Lähde:** en.wikipedia.org/wiki/Old_Operating_Theatre_Museum
- **Lainaus/perustelu:** "In 1862, the hospital began the move to its
  present site at Lambeth, and the operating theatre was closed,
  lying undiscovered until 1957." ja "Beneath the table was a sawdust
  box for collecting blood."
- **Varmuus:** VARMA — suoraan lähteessä. (Artikkeli mainitsee myös
  ristiriitaisesti "100 vuoden käyttämättömyyden jälkeen" museona
  avaamisen 1962 — pieni sisäinen epätarkkuus lähteessä, mutta
  ydinväite, sulkeminen 1862 ja uudelleenlöytö vasta myöhemmin,
  on selvä.)

### 12. Kolmipäiväiset kynttiläjuhlat sarkofagin kunniaksi

Arkkitehti John Soanen talo on museona säilytetty täsmälleen siinä
tilassa kuin se oli hänen kuollessaan 1837 — lain määräyksestä.
Talon kellarissa on egyptiläisen faarao Seti I:n sarkofagi, jonka
saapumista Soane juhli 1825 kolmipäiväisillä juhlilla: kellari
valaistiin yli sadalla lampulla ja kynttelikölla, ja vieraslistalla
oli mm. pääministeri ja J. M. W. Turner.

- **Paikka:** Sir John Soane's Museum, Lincoln's Inn Fields, Holborn.
  n. 51.5170°N, 0.1167°W
- **Lähde:** en.wikipedia.org/wiki/Sir_John_Soane%27s_Museum
- **Lainaus/perustelu:** "After the Seti sarcophagus arrived at his
  house in March 1825, Soane held a three-day party, to which 890
  people were invited, the basement... was lit by over one hundred
  lamps and candelabra... Among the guests were the then Prime
  Minister... and J.M.W. Turner." ja laki-info: talo säilytetään
  "as nearly as possible exactly in the state they were at his death"
  (1837).
- **Varmuus:** VARMA — suoraan lähteessä. Talo oli vuonna 1873
  täsmälleen samannäköinen kuin nykyään.

### 13. Kasvihuone, joka on maailman tärkein säilynyt viktoriaaninen lasirakennus

Kew Gardensin Palm House rakennettiin 1844–1848 arkkitehti Decimus
Burtonin ja rautamestari Richard Turnerin yhteistyönä — ensimmäinen
laajamittainen taottu rauta -rakennelma. Kaikki lasiruudut on
puhallettu käsin.

- **Paikka:** Kew Gardens, Palm House. n. 51.4788°N, 0.2925°W
- **Lähde:** en.wikipedia.org/wiki/Kew_Gardens
- **Lainaus/perustelu:** "The Palm House was built by the architect
  Decimus Burton and iron-maker Richard Turner between 1844 and 1848,
  and was the first large-scale structural use of wrought iron. It is
  considered 'the world's most important surviving Victorian glass
  and iron structure.' The structure's panes of glass are all
  hand-blown."
- **Varmuus:** VARMA — suoraan lähteessä.

### 14. Aikakapseli obeliskin jalustassa — ja kuusi hukkunutta pelastajaa

Kleopatran neula pystytettiin Lontooseen vasta 1878 (isoisän matkan
jälkeen), mutta kuljetustarina on omanlaisensa täky: matkalla Lontooseen
1877 myrsky Biskajanlahdella teki obeliskia kuljettaneesta pontonista
hallitsemattoman, ja kuusi pelastusveneen miehistön jäsentä hukkui
yrittäessään auttaa. Jalustaan kätkettiin myöhemmin aikakapseli, jossa
oli mm. 12 valokuvaa "päivän kauneimmista englantilaisnaisista",
partaveitsi ja lasten leluja.

- **Paikka:** Cleopatra's Needle, Victoria Embankment. n. 51.5097°N,
  0.1211°W
- **Lähde:** en.wikipedia.org/wiki/Cleopatra%27s_Needle,_London
- **Lainaus/perustelu:** "a storm in the Bay of Biscay caused the ship
  Cleopatra to roll violently... The Olga launched a rescue boat with
  six volunteers... but the boat capsized, and all six crew members
  died." ja "a time capsule was concealed in the front part of the
  pedestal, containing 12 photographs of the best-looking English
  women of the day..."
- **Varmuus:** VARMA tapahtumista (suoraan lähteessä). HUOM:
  tapahtuu vasta 1877–78, isoisän matkan JÄLKEEN — ei 1873-kytköstä,
  vain paikkakytkös.

### 15. Musiikkisali, jonka aurinkopoltin paloi 300 kaasuliekillä

Wilton's Music Hall rakennettiin 1859 "jättipubisaliksi": yhden
gallerian ympäröimä sali, jonka kattoa valaisi 300 kaasuliekin ja
27 000 hiotun kristallin "aurinkopoltin"-kattokruunu. Nokijäljet
näkyvät kattoparruissa yhä siitä, miten piippu johti laitteen lämmön
pois. Sali toimi läpi 1870-luvun alun, kunnes tuhoutui tulipalossa
1877.

- **Paikka:** Wilton's Music Hall, Graces Alley, Shadwell. n.
  51.5099°N, 0.0639°W
- **Lähde:** en.wikipedia.org/wiki/Wilton%27s_Music_Hall
- **Lainaus/perustelu:** "In its heyday, a 'sun-burner' chandelier of
  300 gas jets and 27,000 cut crystals, illuminated a mirrored hall.
  Today, charring is still visible in the rafters, where the chimney
  exhausted the heat of this massive device." ja "Wilton's passed into
  several ownerships during the 1870s before being destroyed by fire
  in 1877."
- **Varmuus:** VARMA — suoraan lähteessä. Sali oli toiminnassa vuonna
  1873.

---

## Hylätyt ehdokkaat (tähän mennessä)

- **Speakers' Corner (Hyde Park):** artikkelista ei löytynyt tarkkaa
  perustamisvuotta (esim. muistikuva "1872" ei löytynyt tekstistä
  lainkaan) — vain yleinen historia mellakoista (1855, 1866–67).
  Hylätty toistaiseksi tarkan vuosiluvun puuttuessa.
- **Tower of Londonin korpit** ("valtakunta kaatuu jos korpit
  lähtevät"): artikkelissa legenda mainitaan, mutta ilman
  alkuperävuotta tai -lähdettä — laajalti tiedetään, että legendan
  ikä on kiistanalainen. Hylätty, koska ei tarkkaa varmennettua
  ajoitusta.
- **Leadenhall Market:** sisältö vahvistui (1300-luvulta, roomalaisen
  Lontoon keskus), mutta yksityiskohta ei noussut riittävän
  yllättäväksi verrattuna muihin ehdokkaisiin lyhyessä
  tarkastuksessa. Hylätty tilan/ajan säästämiseksi, ei sisällöllisen
  virheen takia.
- **Postman's Park:** puisto avattiin vasta 1880 ja kuuluisat
  keraamiset muistolaatat vasta 1900 — molemmat isoisän matkan
  JÄLKEEN. Hylätty ajoitusepäsopivuuden takia, vaikkei sisällöllisesti
  huono.
- **Temple Church:** sisältö (temppeliritarien pyöreä kirkko,
  hautaveistokset) vahvistui, mutta ei löytynyt yhtä terävää,
  yllättävää yksityiskohtaa lyhyessä tarkastuksessa — jätetty pois
  tilan säästämiseksi.
- **Lloyd's Coffee House:** haettu artikkeli ei sisältänyt
  muistikuvassa ollutta "Lutine-kelloa" koskevaa mainintaa — se on
  ilmeisesti eri artikkelissa (Lloyd's of London). Hylätty tästä
  raportista ajan puutteessa, ei tarkastettu loppuun.
- **Berry Bros. & Rudd** (viinikauppa, jonka jättivaa'alla muka
  punnittiin mm. Lord Byron): artikkeli löytyi ja Byron mainitaan
  asiakkaana, mutta itse vaaka-anekdoottia EI löytynyt haetusta
  tekstistä. KESKEN — tarkastus keskeytyi tähän ennen varmistusta,
  koska prioriteetti siirtyi pois Lontoosta. Ei pidä käyttää
  ilman lisätarkistusta.

---

## Kesken jäänyt

Työ keskeytyi omistajan priorisointimuutokseen (fokus siirtyi
Ateenasta itään; Lontoo on lähtöpiste, ei vielä fokuskaupunki).
Yllä olevat 15 täkyä ovat kaikki loppuun asti varmistettuja ja
käyttövalmiita. Tutkimatta jäi ainakin: Berry Bros & Rudd (vaaka-
anekdootti), Fortnum & Mason, Guildhall, Bethlem Royal Hospital,
Foundling Hospital, Grant Museum of Zoology, sekä laajempi haku
1873-spesifisistä Lontoon tapahtumista (esim. mitä täsmälleen
tapahtui Lontoossa juuri 1873). Jos työtä jatketaan, kannattaa
aloittaa juuri 1873-spesifisistä hauista, koska löytö #1 (Reform
Club) osoittaa, että ne ovat erityisen antoisia tälle pelille.

---

## Yhteenveto (tähänastinen)

**VARMOJA täkyjä: 15/15** tähän mennessä käsitellystä joukosta.
Yksikään ei jäänyt osittain vahvistamatta (Cleopatran neula on VARMA
tapahtumista, mutta HUOM-merkitty ajoituksesta, koska tapahtuu
1873 jälkeen).

**Kolme parasta (tähän mennessä):**

1. **#1 — Reform Club:** suora, todennettu yhteys Jules Vernen Phileas
   Foggiin ja vuoteen 1873 — ainutlaatuinen osuma koko pelin omaan
   nimeen ja teemaan. Ehdottomasti harkittava erityisen näkyväksi.
2. **#2 — Cutty Sark 1873:** täsmällinen vuosiluku ja jännittävä,
   konkreettinen yksityiskohta (600 mailin lisälenkki Jangtsea ylös).
3. **#11 — Unohdettu leikkaussali:** karmiva mutta ikäsopiva (13+)
   koukku — paikka oli kirjaimellisesti piilossa aivan katsojien
   yläpuolella koko isoisän matkan ajan eikä sitä löydetty vielä
   84 vuoteen.
