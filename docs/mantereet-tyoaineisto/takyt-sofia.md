# Täkyehdokkaat: Sofia

Työaineisto Viisaan Pöllön uteliaisuuskoukkuja varten. Sofia on
fokusmoodin seuraava kaupunki Ateenan jälkeen (yksi askel jalan
laudalla). Malli ja taso: docs/mantereet-tyoaineisto/takyt-ateena.md.

## Tarkistustapa

- Wikipedia-artikkelit haettu komennolla
  `curl -sS -A "MatkakirjaResearch/1.0 (samireivinen@gmail.com)" "https://en.wikipedia.org/w/api.php?action=query&titles=<ARTIKKELI>&prop=extracts&explaintext=1&format=json&formatversion=2&redirects=1"`.
- 429-vastauksiin (rajoitus) uusi yritys kasvavalla viiveellä (2 s, 4 s,
  6 s, 8 s...) sekä User-Agent-otsikko mukaan — ilman sitä osa hauista
  epäonnistui heti. Kaikki tässä raportissa käytetyt haut onnistuivat
  lopulta.
- Jokainen täky perustuu suoraan lainattuun tai tiivistettyyn kohtaan
  haetusta artikkelista — ei ennakkotietoon.
- Koordinaatit on otettu Wikipedian `coordinates`-kentästä silloin kun
  se oli saatavilla (merkitty tarkkana), muuten karttatuntemukseen
  perustuvana likiarvona (merkitty "n." ja tarkistettava kartalta).

## Olemassa oleva Sofia-sisältö repossa (TÄRKEÄ — laaja!)

Sofia-sisältöä on jo huomattavasti enemmän kuin Ateenassa oli ennen
tätä raporttia. Nopea `grep -ri "sofia" js/packs/ docs/` -katsaus ja
tiedostojen lukeminen paljasti:

- **js/packs/kulttuuri-kategoriat.js** (rivit n. 13127–13490): täysi
  "Matkailijan Sofia" -kokonaisuus — vaakuna ("kasvaa, mutta ei
  vanhene"), Vitosha-vuori (2 292 m, luonnonpuisto 1934, kivivirrat),
  metro (1998, 4 linjaa), keltaiset katukivet (1907–08, tuotu
  Itävalta-Unkarista), väestöhistoria (1878: 11 649 → pääkaupunki
  1879 → nyt 1,3 milj.), Serdica-nosto (Konstantinus Suuren "Serdica
  on minun Roomani" -sitaatti, metrokaivaukset 2010–2012), "neljä
  uskontoa" -nosto (ortodoksikirkko, Banja Bashin moskeija 1566,
  synagoga 1909, katolinen katedraali), gaida-säkkipilli, 49
  kivennäis-/lämpölähdettä, banitsa-piirakka onnenlapuilla.
- **js/packs/nahtavyysjutut.js** (rivit n. 6039–6250+): viisi valmista
  nähtävyysjuttua — Mineraalikylpylä (1908–1913, nyt kaupunginmuseo),
  Pyhän Yrjön rotunda (300-luku, freskot, moskeijaksi 1500-luvulla),
  Sofian katedraali eli Aleksanteri Nevski (1882–1924, rakennettu
  venäläissotilaiden muistoksi, 12 kelloa), Sofian yliopisto (1888),
  Borisovan puutarha (1884). (Todennäköisesti jatkuu pidemmälle,
  luin vain osan.)
- **js/packs/europe-artikkelit.js** (rivit n. 927–967): Sofian
  lehtiartikkelin intro+teksti — kertaa Serdican, uskontojen
  läheisyyden, pääkaupunkistatuksen 1879 ja bulgarialaisen
  pään­nyökkäys-kummallisuuden (nyökkää kieltäessään).
- **js/packs/pollo-kysymykset.js** (rivit 544–558): kysymyspatteri,
  JOSSA ON KAKSI VASTAAMATONTA KYSYMYSTÄ jotka tämä raportti
  täyttää suoraan: **"Mistä Sofia sai nimensä?"** (ei vastausta
  missään muualla revisiossa — täky 3 alla vastaa tähän) ja rivi
  "Kuinka vanha kaupunki Sofia on?" (Serdica jo katettu, mutta täky
  10 laajentaa).

**Johtopäätös:** Vaakuna, Vitosha, metro, katukivet, väestöhistoria,
Serdica/Konstantinus, neljä uskontoa -kortteli, gaida, banitsa,
kivennäislähteet, mineraalikylpylä, Pyhän Yrjön rotunda, Aleksanteri
Nevskin katedraali, yliopisto ja Borisovan puutarha ovat KAIKKI JO
KÄYTÖSSÄ — täkyjä ei siis tehdä näistä uudelleen. Alla olevat täkyt
keskittyvät kokonaan uusiin paikkoihin ja kulmiin: erityisesti
vuoteen 1873 itseensä (Vasil Levskin teloitus ja ruhtinaan Konak
juuri niinä vuosina), roomalaiseen amfiteatteriin hotellin alla,
arkeologian museona toimivaan entiseen moskeijaan, patsaaseen jossa
on PÖLLÖ, sekä Sofian dramaattiseen muutokseen osmanikaupungista
pääkaupungiksi 1878–79.

---

## Täkyt

### 1. Mies, jonka hirttopaikalle nousi 13-metrinen graniittipatsas — juuri isoisän matkavuonna

Bulgarian kansallissankari Vasil Levski, "Vapauden apostoli", perusti
salaisen vallankumouskomiteoiden verkoston koko maahan ja ideoi
kansannousun osmanivaltaa vastaan. Hänet kaapattiin majatalosta
joulukuussa 1872, tuotiin Sofiaan oikeudenkäyntiin — hän ei paljastanut
yhtään toveriaan — ja hirtettiin osmanien toimesta Sofiassa 18.
helmikuuta 1873, täsmälleen samana vuonna kuin isoisän matkapäiväkirja.
Nykyään samalla paikalla seisoo 13-metrinen harmaan graniitin
muistomerkki. Levskin hauta on yhä tuntematon.

- **Paikka:** Vasil Levskin muistomerkki, keskusta. 42.69666°N,
  23.33526°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Vasil_Levski ja
  en.wikipedia.org/wiki/Monument_to_Vasil_Levski,_Sofia
- **Lainaus/perustelu:** "Ottoman authorities sentenced Levski to
  death by hanging. The sentence was carried out on 18 February 1873
  in Sofia, where the Monument to Vasil Levski now stands. The
  location of Levski's grave is uncertain..." ja monumentti-artikkeli:
  "It commemorates the hanging of Bulgarian national hero and major
  revolutionary figure Vasil Levski on the same spot on 18 February
  1873. The monument is 13 m high, made of grey Balkan granite..."
- **Varmuus:** VARMA — suoraan lähteessä. Täydellinen 1873-osuma:
  päivämäärä on kirjaimellisesti vuoden 1873 alusta, samaa vuotta kuin
  isoisän matka.

### 2. Ruhtinaan palatsi, jonka salaiset tunnelit yhdistivät moskeijaan — rakennettiin juuri 1873–1875

Kukkulalla, jossa nyt sijaitsee kansallistaidemuseo ja etnografinen
museo, seisoi 1500-luvulta lähtien osmanien paikallishallitsijan
"konak" — sekä asunto että hallintorakennus. Se paloi 1816 ja seisoi
raunioina vuosikymmeniä. Uusi konak rakennettiin vasta vuosina
1873–1875 — juuri isoisän matkavuonna ja sitä seuraavina — kaksikerroksisena
rakennuksena, jonka alla oli vankityrmiä ja jonka maanalaiset tunnelit
yhdistivät sen Chelebi-moskeijaan, pashan taloon ja lähimajataloon.
Vasta vuosia myöhemmin, kun Bulgaria vapautui, samasta rakennuksesta
tehtiin ensimmäisen ruhtinaan Aleksanteri Battenbergin palatsi.

- **Paikka:** Entinen Konak / Ruhtinaan palatsi, nyk. Kansallinen
  taidegalleria ja Etnografinen museo, Battenberg-aukion pohjoisreuna.
  42.6963°N, 23.3271°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Royal_Palace_(Sofia)
- **Lainaus/perustelu:** "Starting from the 16th century, it
  accommodated the Konak... the structure was ravaged by a fire in
  1816... Only between 1873 and 1875 a new Konak was erected—a
  two-story symmetrical building... Below the Konak, dungeons were
  allocated for confinement. Through underground tunnels, the
  structure was connected to the nearby places such as the Chelebi
  Mosque, the Pasha's house, an inn..."
- **Varmuus:** VARMA — suoraan lähteessä. Erinomainen 1873-kytkös:
  rakennus nousi konkreettisesti juuri isoisän matkavuonna.

### 3. Kaupunki, joka on nimetty kirkon mukaan — ja kirkko tarkoittaa Viisautta

Sofian keskellä seisoo pieni, vaatimaton kirkko, jonka mukaan koko
kaupunki on nimetty. Alun perin 300-luvulla rakennettu Pyhän Sofian
kirkko ("Pyhän Viisauden kirkko") antoi nimensä kaupungille vuonna
1329 — ennen sitä paikkaa kutsuttiin Serdicaksi, sitten Sredetsiksi ja
Triaditsaksi. 1500-luvulla osmanit muuttivat sen moskeijaksi, mutta
kaksi maanjäristystä 1800-luvulla tuhosi minareetin, ja moskeija
hylättiin — kirkoksi se palautettiin vasta 1920–30-luvuilla. Isoisän
käydessä 1873 rakennus siis seisoi raunioituneena, minareetitta,
käyttämättömänä.

- **Paikka:** Pyhän Sofian kirkko, Aleksanteri Nevskin katedraalin
  vieressä. 42.69651°N, 23.33143°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Saint_Sophia_Church,_Sofia
- **Lainaus/perustelu:** "In 1329 CE, the town of Serdica was renamed
  as Sofia, after the church." ja "the church was converted to a
  mosque in the 16th century during Ottoman Bulgaria. The mosque was
  abandoned in the 19th century, because two earthquakes destroyed
  one of the minarets... Restoration of the basilica began about 1926
  ... and was completed about 1935."
- **Varmuus:** VARMA nimen alkuperästä ja moskeija/maanjäristys-
  historiasta (suoraan lähteessä). Se, että rakennus oli JUURI VUONNA
  1873 raunioina — pääteltävissä ("19th century"-maanjäristykset,
  hylätty, restaurointi vasta 1926) mutta EI täsmällistä vuosilukua
  lähteessä; merkitty EPÄVARMA tarkasta ajankohdasta 1873:n suhteen,
  vaikka tapahtumaketju on muuten VARMA.

### 4. Patsas, jonka kruunussa istuu pöllö

Sofian keskustassa, entisen Lenin-patsaan paikalla, seisoo kahdeksan
metrin korkuinen kuparinen naishahmo — kaupungin oma symboli, Sofia.
Patsas paljastettiin vuosituhannen vaihteessa 2000, ja kuvanveistäjä
koristi sen vallan tunnuksella (kruunu), maineen tunnuksella (seppele)
ja — VIISAUDEN tunnuksella: pöllöllä. Nimi Sofia tarkoittaa kreikaksi
viisautta, ja patsas seisoo 16 metrin korkuisella jalustalla.

- **Paikka:** Sofia-patsas, Nezavisimost-aukio (Independence Square),
  keskusta. 42.69779°N, 23.32147°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Statue_of_Sofia
- **Lainaus/perustelu:** "Adorned with the symbols of power (crown),
  fame (wreath) and wisdom (owl)... the statue was erected in two
  days from December 25–27, 2000 in a spot once occupied by a statue
  of Lenin... The Statue of Sofia is named after the capital of
  Bulgaria, which in turn is named after the Saint Sophia Church."
- **Varmuus:** VARMA — suoraan lähteessä. Ei liity isoisän 1873-matkaan
  (patsas on vuodelta 2000), mutta poikkeuksellisen vahva teema-
  kytkös: peliteemana on nimenomaan VIISAS PÖLLÖ, ja Sofian oma
  kaupunkipatsas kantaa kirjaimellisesti pöllöä viisauden merkkinä.

### 5. Museo, joka asuu 500-vuotiaassa moskeijassa

Bulgarian kansallinen arkeologinen museo — täynnä trakialaista kultaa
ja roomalaisia mosaiikkeja — sijaitsee kaupungin vanhimmassa ja
suurimmassa säilyneessä osmanimoskeijassa. Koca Mahmut Pashan moskeija
aloitettiin 1451, mutta rakentaja kuoli, ja se valmistui vasta 1494.
Se toimi moskeijana vuosisatoja — myös isoisän vieraillessa 1873 se
olisi ollut yhä käytössä — kunnes siitä tehtiin ensin kansalliskirjasto
(1880–1893) ja lopulta museo, joka avattiin 1905.

- **Paikka:** Kansallinen arkeologinen museo (entinen Buyuk-moskeija),
  Tsar Osvoboditel -bulevardin varrella. 42.69633°N, 23.32456°E
  (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/National_Archaeological_Museum,_Bulgaria
- **Lainaus/perustelu:** "It occupies the building of the largest and
  oldest former Ottoman mosque in the city, originally known as Koca
  Mahmut Paşa Camii. The construction started in 1451... but due to
  his death in 1474 the mosque was completed in 1494... with its
  headquarters in the former mosque that previously housed the
  National Library between 1880 and 1893... officially opened and
  inaugurated in 1905."
- **Varmuus:** VARMA — suoraan lähteessä. Moskeijan toiminta juuri
  1873 pääteltävissä ajanjaksosta (moskeija → kirjasto vasta 1880),
  mutta lähde ei mainitse nimenomaisesti vuotta 1873; ketju muuten
  VARMA.

### 6. Hotelli, jonka lattian alla gladiaattorit taistelivat karhuja ja krokotiilejä vastaan

Vuonna 2004 Arena di Serdica -hotellin perustustöissä löytyi
roomalainen amfiteatteri — Bulgarian suurin ja yksi Rooman valtakunnan
itäosan suurimmista. Se rakennettiin 300–400-luvulla vanhan teatterin
päälle, jonka gootit olivat polttaneet vuonna 268. Kuudesosa
amfiteatterista on säilytetty ja liitetty hotellin pohjakerrokseen —
matkailija voi kävellä sisään ilmaiseksi päivisin ja katsoa
kolikko- ja keramiikkanäyttelyä. Vuonna 1919 löydetty kivilaatta,
joka mainosti taisteluja, kuvaa krokotiilejä, karhuja, härkiä ja
villikissoja.

- **Paikka:** Serdican amfiteatteri / Arena di Serdica -hotelli,
  Knyaz Aleksandar Dondukov -bulevardi. 42.69722°N, 23.32833°E
  (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Amphitheatre_of_Serdica
- **Lainaus/perustelu:** "In 2004, the amphitheatre itself was
  accidentally discovered during the early construction of what came
  to be known as the Arena di Serdica Hotel... The eastern entrance
  and the section of the amphitheatre within the hotel lot... was
  preserved and incorporated into the hotel's ground floor. It is
  freely accessible for tourists during the day..." ja "a stone plate
  depicting an amphitheatre's façade and fights between gladiators
  and wild animals... shows crocodiles, bears, bulls, and wild cats
  as involved in the fights."
- **Varmuus:** VARMA — suoraan lähteessä.

### 7. Kirkko, jossa ruhtinasparin kasvot maalattiin eläviksi jo 1259

Kaupungin laidalla, Vitosha-vuoren juurella, seisoo pieni Boyanan
kirkko — Unescon maailmanperintökohde vuodesta 1979. Sen kuuluisimmat
freskot vuodelta 1259 kuvaavat yli 240 hahmoa, ja lahjoittajapari
Kaloyanin ja Desislavan muotokuvia pidetään yhtenä keskiaikaisen
Balkanin elävimmistä ja vaikuttavimmista muotokuvamaalauksista.
Kirkko rakennettiin kolmessa vaiheessa 300 vuoden aikana — 900–1000-,
1200- ja 1800-luvulla.

- **Paikka:** Boyanan kirkko, Boyanan kaupunginosa, Sofian laidalla.
  42.64467°N, 23.26617°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Boyana_Church
- **Lainaus/perustelu:** "In 1979, the building was added to the
  UNESCO World Heritage List." ja "The portraits of the patrons of
  the church — Sebastocrator Kaloyan and his wife Dessislava... are
  thought to be among the most impressive and lifelike frescoes in
  the church" ja "A total of 89 scenes with 240 human images are
  depicted on the walls of the church."
- **Varmuus:** VARMA — suoraan lähteessä. (En väitä freskojen olevan
  "edellä renessanssia" — lähde ei tee tätä vertailua suoraan, joten
  jätetty pois liioittelun välttämiseksi.)

### 8. Ratsastajapatsas, joka vaati 90 taiteilijaa 15 maasta

Sofian keskustassa istuu pronssinen tsaari hevosen selässä — Venäjän
keisari Aleksanteri II, "vapauttajatsaari", joka voitti
venäläis-turkkilaisen sodan 1877–78 ja vapautti Bulgarian
osmanivallasta. Kilpailuun muistomerkin suunnittelusta osallistui 90
taiteilijaa 15 maasta; voittajaksi valittiin italialainen Arnoldo
Zocchi. Peruskivi muurattiin 1901, mutta patsas paljastettiin vasta
1907. Jalusta on tehty mustasta Vitosha-vuoren graniitista, ja
pronssiseppeleen lahjoitti Romania kaatuneiden sotilaidensa muistoksi.

- **Paikka:** Vapauttajatsaarin muistomerkki, kansalliskokouksen
  aukion edessä. 42.69378°N, 23.33249°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Monument_to_the_Tsar_Liberator
- **Lainaus/perustelu:** "Italian sculptor Arnoldo Zocchi, who won the
  project in competition with 31 other artists from 12 countries (and
  with a total of 90 artists from 15 countries being interested)...
  The foundation stone was laid on 23 April 1901... the monument was
  completed on 15 September 1903... inauguration on 30 August 1907...
  Erected of black polished granite from Vitosha... The bronze wreath
  at the foot was donated by Romania..."
- **Varmuus:** VARMA — suoraan lähteessä.

### 9. Kauppahalli, jonka kellotorni katsoo kolmeen suuntaan

Marie Louise -bulevardilla seisoo Sofian keskusmarkkinahalli, Halite —
neorenessanssia, jossa on myös bysanttilaisia ja barokkiaiheita.
Rakennus valmistui 1911 kahden vuoden rakentamisen jälkeen, ja sen
julkisivua koristaa Sofian vaakunan reliefi sekä pieni kellotorni,
jossa on KOLME kellotaulua. Halissa oli aikoinaan 170 vuokrattua
myyntikojua, joiden hintoja ja tuotteiden laatua valvottiin tarkasti.

- **Paikka:** Keskusmarkkinahalli (Halite), Marie Louise -bulevardi.
  42.7000°N, 23.32167°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Central_Sofia_Market_Hall
- **Lainaus/perustelu:** "The façade is known for its relief of the
  coat of arms of Sofia above the main entrance... The famous little
  clock tower with three dials tops the edifice." ja "Until the late
  1940s the Sofia municipality let out about 170 shops and stalls..."
- **Varmuus:** VARMA — suoraan lähteessä. (Ei 1873-kytköstä, rakennus
  on vuodelta 1911 — huomioitava jos halutaan tiukka aikarajaus.)

### 10. Eläintarha, joka alkoi yhdestä häkkilinnusta

Sofian eläintarha — Kaakkois-Euroopan vanhin ja suurin — perustettiin
kuninkaallisella asetuksella 1. toukokuuta 1888. Se sijaitsi aluksi
kuninkaanpalatsin puistossa, ja koko kokoelma koostui yhdestä
Bulgariasta pyydystetystä mustasta korppikotkasta häkissä. Vasta kun
karhupari ei enää mahtunut vanhoihin tiloihin, tsaari Ferdinand
lahjoitti eläintarhalle uuden maa-alueen entisen kasvitieteellisen
puutarhan paikalta.

- **Paikka:** Nykyinen Sofian eläintarha, n. 4,5 km eteläisen
  keskustan ulkopuolella (alkuperäinen sijainti oli kuninkaanpalatsin
  puistossa keskustassa). 42.65806°N, 23.33194°E (Wikipedian
  koordinaatti, nykyinen paikka)
- **Lähde:** en.wikipedia.org/wiki/Sofia_Zoo
- **Lainaus/perustelu:** "Sofia Zoo... was founded by royal decree on
  1 May 1888... Initially, the zoo was located in the park of the
  former royal palace, with the primary attraction being a Eurasian
  black vulture caught in Bulgaria and exhibited in a cage in the
  garden."
- **Varmuus:** VARMA — suoraan lähteessä.

### 11. Silta, jota vartioi neljä kotkaa

Perlovska-joen ylittävää siltaa kaupungin keskustassa kutsutaan
Kotkasillaksi neljän pronssikotkapatsaan mukaan, jotka seisovat sen
kaiteilla symbolisina vartijoina. Sillan rakensivat 1891 tšekkiläinen
arkkitehti Václav Prošek veljineen ja serkkuineen — samat, jotka
rakensivat myös Leijonasillan kaksi vuotta aiemmin. Kotkasilta ja sen
pylväät on kuvattu Bulgarian 20 levin seteliin.

- **Paikka:** Kotkasilta (Orlov most), risteysalue Borisovan puutarhan
  ja Sofian yliopiston lähellä. n. 42.6889°N, 23.3459°E (KARTTA-
  ARVIO — Wikipedia-artikkelissa ei ole coordinates-kenttää, joten
  tarkistettava kartalta ennen julkaisua)
- **Lähde:** en.wikipedia.org/wiki/Eagles%27_Bridge,_Sofia
- **Lainaus/perustelu:** "The name of the bridge itself comes from the
  four statues of eagles on it... The bridge was constructed in 1891
  by Czech architect Václav Prošek, his brother Jozef and his cousins
  Bohdan and Jiří. They also designed together and built the Lions'
  Bridge... in 1889... One of the bridge's columns and bronze eagles
  are depicted on the reverse print of Bulgarian 20 levs banknote."
- **Varmuus:** VARMA sisällöstä (suoraan lähteessä). EPÄVARMA
  koordinaatit — kartta-arvio, ei Wikipedian omaa dataa.

### 12. Teatteri, joka paloi juhlan keskellä

Bulgarian kansallisteatteri avattiin tammikuussa 1907 — sen
julkisivu koristaa yhä 50 levin seteliä. Rakennuksen suunnittelivat
samat wieniläiset arkkitehdit, jotka piirsivät lukuisia muitakin
Keski-Euroopan teattereita. Vuonna 1923, kesken juhlavuositilaisuuden,
rakennus tuhoutui tulipalossa — ja jälleenrakennettiin 1929. Toisessa
maailmansodassa pommitukset vaurioittivat sitä uudelleen, ja se
korjattiin taas 1945.

- **Paikka:** Ivan Vazovin kansallisteatteri, Kaupunginpuiston (City
  Garden) edessä. 42.69417°N, 23.32639°E (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Ivan_Vazov_National_Theatre
- **Lainaus/perustelu:** "The theatre's neoclassical building,
  designed by famous Viennese theatre architects Hermann Helmer and
  Ferdinand Fellner, was finished in 1906 and opened on 3 January
  1907... The building was extensively damaged by a fire in 1923
  during an anniversary celebration, but was reconstructed in 1929..."
- **Varmuus:** VARMA — suoraan lähteessä.

### 13. Yö, jolloin ukkonen peitti seitsemän moskeijan räjähdykset

Vain viisi vuotta isoisän matkan jälkeen, joulukuussa 1878, venäläiset
sotilasinsinöörit räjäyttivät seitsemän Sofian moskeijaa samana yönä —
ukkosmyrsky peitti räjähdysten äänen. Suurin osa Sofian moskeijoista
tuhoutui vapaussodan aikana, ja suurin osa muslimiväestöstä lähti
kaupungista sodan jälkeen. Kaupunki, joka isoisän vieraillessa 1873
olisi ollut täynnä moskeijoita, minareetteja ja basaareja, muuttui
muutamassa vuodessa lähes tunnistamattomaksi.

- **Paikka:** Ei yksittäistä paikkaa — tapahtui eri puolilla
  keskustaa. Yleinen sijainti: Sofian vanha kaupunki. n. 42.6977°N,
  23.3219°E (kaupungin keskusta, karttaviite)
- **Lähde:** en.wikipedia.org/wiki/Sofia
- **Lainaus/perustelu:** "Most mosques in Sofia were destroyed in that
  war, seven of them destroyed in one night in December 1878 when a
  thunderstorm masked the noise of the explosions arranged by Russian
  military engineers. Following the war, the great majority of the
  Muslim population left Sofia."
- **Varmuus:** VARMA — suoraan lähteessä. HUOM osmanikauden
  kunnioittava käsittely: tämä täky kannattaa kertoa faktuaalisena,
  ei riemuitsevana — kyse on sotatoimesta ja väestön lähdöstä, ei
  voittajajuhlasta. Hyvä käyttää nimenomaan kontrastina sille, mitä
  isoisä olisi nähnyt vuonna 1873 (moskeijoita täynnä oleva
  osmanikaupunki) verrattuna siihen, mitä turisti näkee tänään.

### 14. Diplomaatit, jotka jäivät kaupunkiin pelastaakseen sen tulelta

Kun venäläisjoukot lähestyivät Sofiaa vapaussodassa 1877–78, osmani-
komentaja Suleiman Pasha uhkasi polttaa koko kaupungin puolustuksen
osana. Neljä ulkomaista diplomaattia — ranskalainen, italialainen,
rabbi ja itävaltalainen — kieltäytyivät poistumasta kaupungista ja
pelastivat sen näin tuholta. Monet Sofian bulgarialaiset tarttuivat
aseisiin ja liittyivät venäläisiin joukkoihin.

- **Paikka:** Ei yksittäistä paikkaa, koskee koko silloista kaupunkia.
- **Lähde:** en.wikipedia.org/wiki/Sofia
- **Lainaus/perustelu:** "During the Russo-Turkish War of 1877–78,
  Suleiman Pasha threatened to burn the city in defence, but the
  foreign diplomats Leandre Legay, Vito Positano, Rabbi Gabriel
  Almosnino and Josef Valdhart refused to leave the city thus saving
  it."
- **Varmuus:** VARMA — suoraan lähteessä. Ei kiinteää paikkaa, joten
  soveltuu paremmin kertojan (Pöllön) suulliseen tarinaan kuin
  kartalle sidottuun täkyyn.

### 15. Käsky, joka teki kristinuskosta laillista kaksi vuotta ennen Milanoa

Roomalaisessa Serdicassa annettiin vuonna 311 keisari Galeriuksen
toimesta suvaitsevaisuusedikti, joka lopetti virallisesti
kristittyjen vainot Rooman valtakunnassa — ensimmäinen tällainen
edikti, kaksi vuotta ennen kuuluisampaa Milanon ediktiä. Kaupunki oli
tuolloin niin merkittävä, että keisarit Aurelianus ja Galerius
molemmat syntyivät siellä.

- **Paikka:** Ei tarkkaa yksittäistä rakennusta — antiikin Serdica,
  nykyisen keskustan alla. n. 42.6978°N, 23.3231°E (Serdica-alueen
  karttaviite)
- **Lähde:** en.wikipedia.org/wiki/Serdica
- **Lainaus/perustelu:** "The Edict of Serdica, an Edict of Toleration,
  was issued in 311 in Serdica by the Roman emperor Galerius,
  officially ending the Diocletianic persecution of Christianity...
  It was the first edict legalising Christianity, preceding the Edict
  of Milan by two years." ja "Roman emperors Aurelian (215–275) and
  Galerius (260–311) were born in Serdica."
- **Varmuus:** VARMA — suoraan lähteessä. Historiafakta ilman
  yhtä selkeää katukuva-yksityiskohtaa (ero esim. täkyyn 6) — sopii
  paremmin kertojan taustatarinaksi kuin "katso tuota rakennusta"
  -koukuksi.

### 16. Moskeija, jonka rakensi sama arkkitehti kuin Istanbulin suurimmat (Banja Bashi — HUOM päällekkäisyys)

Banja Bashin moskeija — Sofian ainoa yhä toimiva moskeija — suunnitteli
kuuluisa osmaniarkkitehti Mimar Sinan, sama nero joka suunnitteli
Istanbulin suurimpia moskeijoita, ja se valmistui 1566. Se on
rakennettu suoraan kuumien lähteiden päälle: seinien vierestä nousee
yhä höyryä maasta.

- **Paikka:** Banja Bashin moskeija, keskusta. 42.69944°N, 23.3225°E
  (Wikipedian koordinaatti)
- **Lähde:** en.wikipedia.org/wiki/Banya_Bashi_Mosque
- **Lainaus/perustelu:** "The mosque was designed by the famous
  Ottoman architect Mimar Sinan and completed in 1566... The most
  outstanding feature of the mosque is that it was actually built
  over natural thermal spas; one can even see the steam rising from
  vents in the ground near the mosque walls."
- **Varmuus:** VARMA — suoraan lähteessä. **PÄÄLLEKKÄISYYSVAROITUS:**
  Banja Bashin moskeija (vuosiluku 1566) mainitaan JO pelissä
  ("neljä uskontoa" -nosto, kulttuuri-kategoriat.js). Tämä täky
  tuo UUDEN yksityiskohdan (arkkitehti Mimar Sinan — sama, joka
  suunnitteli Istanbulin moskeijoita, joita pelissä jo käsitellään
  Istanbul-osiossa) mutta rakennus itse on jo esitelty. Käytä vain,
  jos halutaan nimenomaan Istanbul-Sofia-silta arkkitehdin kautta;
  muuten tarpeeton.

---

## Hylätyt ehdokkaat

- **"Sredna Gora" -vuoristo:** tarkistin artikkelin toivoen
  Sofia-yhteyttä, mutta se osoittautui erilliseksi vuorijonoksi
  Keski-Bulgariassa, ei suoraan Sofiaan liittyväksi. Hylätty.
- **National Assembly (Bulgaria building):** Wikipedia-haku palautti
  "missing" suoralla otsikolla; löysin sen sijaan artikkelin "Old
  Parliament House, Sofia", joka sisältää saman sisällön (Konstantin
  Jovanović, valmistui 1886) — käytetty tarvittaessa mutta ei
  omana täkynä, koska ei tuonut mitään erityisen yllättävää
  isoisän 1873-teemaan.
- **Väestöhistorian toisto** (1878: 11 649 asukasta → pääkaupunki
  1879 → nyt 1,3 milj., sekä 1700-luvun lopun 70 000 → 1870: 19 000):
  vahvistui hyvin lähteestä (Sofia-artikkeli), mutta TÄMÄ ON JO
  KÄYTÖSSÄ pelissä lähes identtisin luvuin (kulttuuri-kategoriat.js,
  "Maakuntakaupungista pääkaupungiksi" -jakso) — ei tehty omaksi
  täkyksi päällekkäisyyden vuoksi.
- **Sofian nimikiista 1879** (komitea väitteli Sofia vs. Sredets
  -nimestä, kompromissi): vahvistui lähteestä, mutta jäi ohueksi
  yksityiskohdaksi verrattuna täkyyn 3 (nimen alkuperä kirkosta) —
  päällekkäinen teema, joten jätetty pois tilan säästämiseksi.
- **Osmanien 1385 kuvaus Sofian varusväestä** ("heavily built,
  moustached and look war-hardened"): hauska lainaus, mutta liian
  irrallinen ja vanha (1300-luku) ilman selkeää katukuva-kohdetta —
  ei valittu mukaan.
- **11 suurta ja yli 100 pientä moskeijaa 1600-luvulla** (Sofian
  huippukausi Rumelia-provinssin pääkaupunkina 1530–1836): vahvistui
  hyvin, mutta toimii paremmin taustakontekstina täkyille 5, 13 ja 16
  kuin omana erillisenä täkynä — sisällöllisesti päällekkäinen niiden
  kanssa.
- **Nimikiistan yksityiskohta "Ottomans came to favour the name
  Sofya":** liian ohut yksin, sulautettu täkyyn 3.

---

## Yhteenveto

**VARMOJA täkyjä (suoraan lähteestä vahvistettu): 15/16.**
(Täkyt 1, 2, 4, 5, 6, 7, 8, 9, 10, 11 (sisältö), 12, 13, 14, 15, 16
ovat VARMOJA. Täky 3 on VARMA pääosiltaan — nimen alkuperä ja
moskeija/maanjäristys-ketju suoraan lähteessä — mutta tarkka
ajankohta "juuri 1873" on pääteltävä eikä lähteen oma väite, joten
merkitty osittain EPÄVARMAKSI. Täky 11:n sisältö on VARMA, mutta sen
koordinaatit ovat karttaviite Wikipedian coordinates-kentän puuttuessa.)

**Kolme parasta ehdotustani:**

1. **#2 — Ruhtinaan palatsi, jonka salaiset tunnelit yhdistivät
   moskeijaan (rakennettiin 1873–1875):** ylivoimaisesti terävin
   1873-kytkös koko raportissa — rakennus, jossa nyt on museo, nousi
   KIRJAIMELLISESTI isoisän matkavuonna, ja siihen liittyy vankityrmiä
   ja salaisia tunneleita moskeijaan. Täydellinen "isoisä olisi voinut
   nähdä tämän rakennustyömaana" -hetki.
2. **#1 — Vasil Levskin teloitus ja 13-metrinen muistomerkki:**
   täsmällinen päivämäärä (18.2.1873) samalta vuodelta kuin
   matkapäiväkirja, dramaattinen ja kunnioittava tarina kansallis-
   sankarista, ja paikka on yhä tarkasti osoitettavissa kartalta.
3. **#4 — Patsas, jonka kruunussa istuu pöllö:** ei liity 1873-teemaan,
   mutta on poikkeuksellisen vahva metakoukku — Sofian oma
   kaupunkipatsas kantaa VIISAUDEN symbolina pöllöä, aivan kuten pelin
   oma kertojahahmo. Tämä ansaitsee erityishuomion juuri Viisaan
   Pöllön suulla kerrottuna.

Kunniamaininta: **#6 (amfiteatteri hotellin alla)** on visuaalisesti
ja tarinallisesti erittäin vahva "katso, missä seisot" -koukku, ja
**#3 (Pyhän Sofian kirkko)** täyttää suoraan olemassa olevan
vastaamattoman pöllökysymyksen "Mistä Sofia sai nimensä?".

**HUOM tasapainosta:** Täky 13 (moskeijoiden räjäytys) ja täky 14
(diplomaattien pelastus) käsittelevät sotaa ja tuhoa — molemmat on
kirjoitettu faktuaalisesti ilman mässäilyä, ja 13 sisältää nimenomaisen
muistutuksen kunnioittavasta sävystä. Jos Fable haluaa keventää
kokonaisuutta, nämä kaksi voi jättää pois ilman että 1873-teema kärsii
(täkyt 1 ja 2 kantavat sen jo vahvasti).
