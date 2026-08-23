# Sydney — faktakoostaja, uusi kaupunkilehti (Oseanian lauta, pilottikaupunki)

Lauta-id `oceania`, kaupunki-id `sydney`, maa AUS, en-Wikipedia "Sydney" (ellei
toisin mainita). Kaikki tiedot haettu en-Wikipediasta **23.8.2026** (`action=raw` +
`prop=coordinates`-API, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla viiveellä
429-vastauksiin — ei yhtään 429:ää tässä erässä). Malli ja mitat luettu
tiedostoista `docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/mantereet-tyoaineisto/spec-mantereet.md` (SITOVA, erityisesti Oseania-osio)
ja `docs/moduulit/kaupunkilehti.md`, esimerkkinä
`docs/mantereet-tyoaineisto/faktapohja-newyork.md` (rakenne ja tarkkuustaso).
Raamatun linjaukset: js/tyohuone-raamattu.js osiot Perustuslaki, Kuvat ja
lähteet, Kaupungit.

**Tehtävän erityispiirre:** Sydney on Oseanian laudan PILOTTIKAUPUNKI yhdessä
Aucklandin kanssa. En kirjoittanut lehtitekstejä, en ladannut kuvia enkä
koskenut js/packs-tiedostoihin — kaikki alla on raaka-ainetta kirjoittajalle ja
riippumattomalle tarkistajalle.

**Sisältölinjaus (spec-mantereet.md, Oseania):** Australian alkuperäiskansojen
historia kerrotaan suoraan mutta hienotunteisesti ja ilman yksityiskohtaista
kärsimyskuvausta. Paikka ennen lajia: kadigalien (myös kirjoitusasu Cadigal,
Gadigal) ja eoran oma nimi Sydney Cove -lahdelle (Warrane) tuodaan esiin ennen
siirtomaanimeä. Sukupolvien erottaminen (Stolen Generations) kuuluu
1900-luvulle eikä nouse tässä 1873-painotteisessa koosteessa — mainitsen sen
vain tässä huomiona (osio 8), en nostoehdotuksena, koska kirjoittaja saattaa
silti haluta viitata siihen maalehden puolella. Uluru ei ole Sydneyssä, ei
koske tätä koostetta. Ei nykysotaa, ei nykypolitiikkaa.

---

## 1. Sivuehdotukset

### Sivu A — id `kaupunki`, nimi "Sydney"

**Johdanto (317 merkkiä):**

> Sydney kohoaa jättimäisen Port Jacksonin sataman rannoille — eoran kansat
> tunsivat lahden nimeltä Warrane kauan ennen brittien rangaistussiirtokuntaa
> 1788. Isoisän saapuessa 1873 vankikuljetukset olivat päättyneet jo
> vuosikymmeniä sitten, ja kultaryntäyksen tuoma vauraus muutti kadut
> hiekkakivirakennusten työmaiksi.

*(Korjattu tarkistus-sydney.md:n huomion 1 mukaisesti: Kamay on Botany Bayn
nimi dharawalin kielellä — eri lahti, eri kieliryhmä — ei Sydney
Coven/Port Jacksonin eoran nimi. "ja Kamay" poistettu.)*

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Historia"

**Perustelu valinnalle:** Sydneyn 1873-kulma on poikkeuksellisen vahva —
kolme erillistä rakennushanketta (kuvernöörin talon vaunukatos/porte-cochère,
suursynagogan suunnittelu, rautatieaseman uudisrakennus) ovat kaikki juuri
isoisän matkavuodelta tai sen välittömästä läheisyydestä (ks. osio 8,
huomio 1; huomaa korjaus — 1873:n lisäys oli porte-cochère, ei koko
julkisivun pylväikkö, mutta vuosi 1873 itsessään pitää edelleen).
Muut vakioaiheet eivät nouse yhtä terävinä tässä vaiheessa: kuvataide ja
musiikki kytkeytyvät enemmän 1900-luvun alkuun (Heidelberg-koulukunnan
taiteilijaleirit alkoivat vasta 1880-luvulla), ruoka on vahva aihe mutta
sopisi paremmin maalehteen tai omaksi teemasivuksi myöhemmin, ja luonto/tiede
eivät erotu yhtä vahvasti kuin itse kaupungin muodonmuutos siirtokunnasta
Victorian-ajan kaupungiksi.

**Johdanto (287 merkkiä):**

> Sydney vaihtoi hahmoaan nopeasti: eoran kansojen satamasta brittien
> rangaistussiirtokunnaksi ja siitä kultaryntäyksen kunnianhimoiseksi
> siirtomaakaupungiksi. Vuonna 1873 kaupunkia rakennettiin monesta suunnasta
> yhtä aikaa — kuvernöörin talo, uusi synagoga ja rautatieasema kaikki
> kesken.

---

## 2. Kahdeksan nostoehdotusta (4 + 4)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Warrane, ennen kuin siitä tuli Sydney Cove" (584 merkkiä)**

> Ennen brittejä lahden tunsivat kadigalit, yksi eoran kansan seitsemästä
> rannikkoklaanista: heidän nimensä paikalle oli Warrane. Kapteeni Arthur
> Phillip nosti Ison-Britannian lipun rantaan 26. tammikuuta 1788 —
> ensimmäinen kohtaaminen kadigalien ja eurooppalaisten välillä juuri tässä
> lahdenpoukamassa. Kadigalit elivät kalastuksesta: miehet keihästivät kalaa
> rannalta, naiset onkivat kaarnaveneistään. Tautien tuhotessa väestön 1789
> vain kolme kadigalia selvisi alkuperäisestä
> viidestäkymmenestä-kahdeksastakymmenestä hengestä — silti kadigalien
> jälkeläisiä elää Sydneyssä yhä tänään.

Faktat ja lähteet:
- Kadigalit (myös Cadigal, Caddiegal) ovat yksi eoran kansan rannikkoklaaneista;
  heidän perinteinen alueensa käsitti nykyisen Sydneyn keskustan. — en-Wikipedia
  "Gadigal"
- Eoran nimi Sydney Covelle oli "Warrane" (myös kirjoitettu War-ran, Warrang,
  Wee-rong); paikka oli ensimmäinen kohtaamispaikka eoran kansan ja eurooppa-
  laisten välillä. — en-Wikipedia "Sydney Cove"
- Ensimmäinen laivasto nousi maihin Sydney Coveen ja Ison-Britannian lippu
  nostettiin 26.1.1788 — päivä joka tunnetaan nykyään Australia Daynä. —
  en-Wikipedia "Sydney Cove"
- Ennen siirtomaata eoran miehet keihästivät kalaa rannalta ja naiset
  onkivat kaarnaveneistään (nowie). — en-Wikipedia "Sydney Cove"
- Kuvernööri Arthur Phillip arvioi alueen alkuperäisväestöksi n. 1500
  (arviot vaihtelevat 200:sta 4000:een); kadigalien klaanin koko arvioitiin
  50–80 hengeksi. 1789 isorokkoepidemia tappoi arviolta puolet eoran
  väestöstä — kadigaleista selvisi vain kolme. Kadigal-vanhin Allen Madden
  arvioi useiden satojen Dharug-ihmisten, joukossa ainakin sata omaa
  sukuaan olevaa kadigalia, asuvan Sydneyssä nykyään. — en-Wikipedia "Gadigal"

**Nosto K2 — "Kaupunki jota rakennettiin joka suunnasta" (552 merkkiä)**

> Vankikuljetukset New South Walesiin päättyivät 1840, ja kaupunki muuttui
> yhä enemmän vapaiden siirtolaisten kaupungiksi. Kullan löytyminen 1851
> kiihdytti kasvua entisestään: Sydneyn väkiluku lähes nelinkertaistui
> 95 600 asukkaasta 1861 lähes 387 000:een 1891, ja hallitus investoi
> rautateihin, raitioteihin ja katuihin. Isoisän vierailun aikoihin kaupunki
> oli täynnä keskeneräisiä hiekkakivirakennuksia: yliopisto oli valmistunut
> 1861, Australian Museum 1866, mutta sekä Town Hall (aloitettu 1868) että
> pääposti (aloitettu 1866) olivat vielä työn alla.

Faktat ja lähteet (en-Wikipedia "Sydney", osio historiasta 1840-luvulta
eteenpäin, ellei toisin mainita):
- Vankikuljetukset New South Walesiin päättyivät 1840. — en-Wikipedia
  "History of Sydney"
- Kullan löytyminen New South Walesissa ja Victoriassa 1851 häiritsi
  taloutta hetkellisesti (miehet siirtyivät kultakentille), mutta lisääntynyt
  siirtolaisuus ja kullasta saatu varallisuus kasvattivat asumisen, tavaroiden
  ja palvelujen kysyntää. Sydneyn ja sen esikaupunkien väkiluku kasvoi
  95 600:sta (1861) 386 900:aan (1891).
- Kaupunki sai lukuisia uusia hiekkakivirakennuksia: Sydneyn yliopisto
  (1854–1861), Australian Museum (1858–1866), Town Hall (1868–1888) ja
  pääposti eli General Post Office (1866–1892) — kolme jälkimmäistä olivat
  siis vielä rakenteilla isoisän vierailun aikaan 1873.
- New South Walesin lakiasäätävä neuvosto muuttui osin vaaleilla valituksi
  1842, ja Sydney julistettiin samana vuonna kaupungiksi omalla,
  rajoitettuun omaisuuskiintiöön perustuvalla äänioikeudella valitulla
  hallintoneuvostollaan.

**Nosto K3 — "Aikapallo joka putosi joka päivä samaan aikaan" (598 merkkiä)**

> Observatory Hillin torni pudotti aikapallon joka päivä täsmälleen kello
> yhdeltä — merkki, jonka näki koko satama, ja samalla ammuttiin tykki
> Dawes Pointilta. Tapa alkoi 5. kesäkuuta 1858 ja jatkui isoisän vierailun
> aikaan täsmälleen samalla koneistolla, jota käytetään yhä tänään. Tykki
> siirrettiin Fort Denisonin saarelle vasta 1906, kolmisenkymmentä vuotta
> isoisän matkan jälkeen. Fort Denison itse oli rakennettu 1857 Krimin
> sodan aikaisen venäläispelon vuoksi linnoittamaan satamaa: sen ainoa
> martello-torni on ainoa koskaan Australiaan rakennettu ja viimeinen koko
> Brittiläisessä imperiumissa.

Faktat ja lähteet:
- Sydney Observatory rakennettiin 1857–1859 Observatory Hillille; ensimmäinen
  aikapallo (time ball) pudotettiin keskipäivällä 5.6.1858, ja pudotusaika
  siirrettiin pian kello yhteen. Samalla ammuttiin kanuuna Dawes Pointilta.
  Aikapallo pudotetaan yhä päivittäin kello 1 samalla alkuperäisellä
  koneistolla (nykyään sähkömoottorin avulla). — en-Wikipedia "Sydney
  Observatory"
- Tykki siirrettiin Dawes Pointilta Fort Denisonin saarelle vasta 1906 —
  isoisän vierailun (1873) aikaan tykki ammuttiin siis yhä Dawes
  Pointilta, ei Fort Denisonilta. Fort Denisonin oma artikkeli kuvaa
  vuodesta 1906 alkaen vakiintunutta, nimenomaan siihen paikkaan
  liitettyä käytäntöä ("the custom of firing a gun daily at 1pm began in
  1906" laivojen kronometrien tarkistamiseksi, jatkui toiseen
  maailmansotaan asti ja elvytettiin 1986) — tämä ei sinänsä kiistä Sydney
  Observatory -artikkelin tietoa aiemmasta, Dawes Pointilta ammutusta
  tykistä vuodesta 1858, vaan täsmentää, milloin käytäntö siirtyi ja
  vakiintui juuri Fort Denisonille. — en-Wikipedia "Fort Denison"
  (*"In 1906, a saluting gun ... was transferred from Dawes Point to Fort
  Denison."*; *"The custom of firing a gun daily at 1pm began in
  1906..."*)
- Fort Denison rakennettiin uudelleen (aiempi 1841 aloitettu linnoitustyö jäi
  kesken) 1855–1857 Krimin sodan aikaisen Venäjän-laivastopelon vuoksi;
  valmistui 14.11.1857. Sen martello-torni on ainoa koskaan Australiaan
  rakennettu ja viimeinen koko Brittiläisessä imperiumissa rakennettu. —
  en-Wikipedia "Fort Denison"

**Nosto K4 — "Rahapaja joka löi puolen imperiumin kolikot" (583 merkkiä)**

> Sydneyn rahapaja avattiin 1855 vanhan Rum Hospitalin tiloihin —
> ensimmäinen Kuninkaallisen rahapajan sivukonttori Englannin ulkopuolella.
> Ensimmäisinä viitenä toimintavuotenaan se lyö vuosittain yli miljoonan
> punnan arvosta kultaa sovereign- ja half sovereign -kolikoiksi, ja
> kultaryntäyksen tuoma raakakulta virtasi juuri tänne. Vuonna 1868 Sydneyn
> kolikot hyväksyttiin lailliseksi maksuvälineeksi kaikissa Britannian
> siirtokunnissa — mutta Britanniassa itsessään vasta 1886. Isoisän
> vierailun aikaan rahapaja oli siis täydessä käynnissä ja kolikot kelpasivat
> jo puoleen imperiumia.

Faktat ja lähteet (en-Wikipedia "Sydney Mint"):
- Sydney Mint perustettiin 1854 entisen Rum Hospitalin (rakennettu
  1811–1816) eteläsiipeen; toiminta alkoi 14.5.1855 nimellä Royal Mint,
  Sydney Branch — ensimmäinen Kuninkaallisen rahapajan sivukonttori
  Englannin ulkopuolella.
- Ensimmäisten viiden toimintavuoden aikana yli miljoonan punnan arvosta
  kultaa vuodessa muutettiin sovereign- ja half sovereign -kolikoiksi.
- Vuonna 1868 Sydneyn kolikot tunnustettiin lailliseksi maksuvälineeksi
  kaikissa brittiläisissä siirtokunnissa, mutta vasta helmikuussa 1886
  Britanniassa itsessään. Kolikot olivat identtisiä Britanniassa lyötyjen
  kanssa lukuun ottamatta pientä rahapajamerkkiä.

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Satama jonka Cook merkitsi kartalle näkemättä sitä" (608 merkkiä)**

> James Cook purjehti Endeavour-aluksellaan Botany Bayn ohi huhtikuussa 1770
> ja nimesi sisemmän lahden Sir George Jacksonin mukaan Port Jacksoniksi —
> hän ei koskaan käynyt itse lahdella, vain merkitsi sen kartalle laivan
> kannelta. Kun kuvernööri Arthur Phillip saapui ensimmäisellä laivastolla
> 1788, Botany Bay osoittautui liian avoimeksi ja vedettömäksi
> siirtokunnalle — Phillip purjehti pohjoiseen ja löysi Port Jacksonista
> suojaisan lahdenpoukaman, jonka hän nimesi kotimaan ministerinsä mukaan
> Sydneyksi. Näin maailman parhaaksi kutsuttu satama valittiin vahingossa,
> kartantekijän ohimenevästä merkinnästä.

Faktat ja lähteet:
- James Cook havaitsi Sydneyn sataman ensimmäisenä eurooppalaisena 1770 ja
  nimesi sen Sir George Jacksonin (Lordien komissaarien jäsenen) mukaan Port
  Jacksoniksi kirjoittaen päiväkirjaansa nähneensä "a bay or harbour" jossa
  näytti olevan turvallinen ankkuripaikka — hän ei purjehtinut lahteen
  sisään. — en-Wikipedia "Port Jackson"
- Ensimmäinen laivasto saapui Botany Bayhin 1788, mutta kuvernööri Arthur
  Phillip totesi paikan sopimattomaksi ja purjehti pohjoiseen tutkimaan
  Cookin merkitsemää Port Jacksonia; hän ankkuroitui ensin Camp Coveen,
  sitten löysi Sydney Coven ja perusti siirtokunnan sinne 26.1.1788. —
  en-Wikipedia "Port Jackson"; "Botany Bay"
- Botany Bay oli alun perin suunniteltu rangaistussiirtokunnan paikaksi, ja
  ilmaisu "Botany Bay" jäi Britanniassa pitkäksi aikaa yleisnimitykseksi
  Australian rangaistussiirtokunnille, vaikka itse siirtokunta perustettiin
  Sydney Coveen. — en-Wikipedia "Botany Bay"

**Nosto H2 — "Kansa joka ei kadonnut" (585 merkkiä)**

> Kadigalien elämä lahden rannalla muuttui peruuttamattomasti
> eurooppalaisten mukanaan tuomien tautien myötä: isorokkoepidemia 1789
> tappoi arviolta puolet koko eoran väestöstä, ja kadigaleista selvisi vain
> kolme alkuperäisestä viidestäkymmenestä-kahdeksastakymmenestä. Selviytyjien
> jälkeläiset asuttivat aluetta edelleen, vaikka suurin osa kadigaleista
> siirtyi pois perinteisiltä mailtaan siirtokunnan laajetessa. Vuonna 2023
> uusi metroasema Sydneyn keskustassa sai nimen Gadigal aiemman Pitt
> Streetin sijaan — kunnianosoitus kansalle, joka elää kaupungissa yhä, ei
> vain sen historiassa.

Faktat ja lähteet (en-Wikipedia "Gadigal", ellei toisin mainita):
- 1789 isorokkoepidemia tappoi arviolta puolet eoran väestöstä; kadigaleista
  (arvioitu 50–80 henkeä ennen epidemiaa) selvisi vain kolme.
- Arkeologinen näyttö viittaa siihen, että osa kadigaleista pakeni nykyisen
  Concordin alueelle ja asettui sinne. Siirtomaan laajetessa suurin osa
  kadigaleista kuitenkin siirtyi pois perinteisiltä mailtaan.
- Kadigal-vanhin Allen Madden arvioi useiden satojen Dharug-ihmisten,
  joukossa ainakin sata omaa sukuaan olevaa kadigalia, asuvan Sydneyssä
  nykyään.
- Lokakuussa 2023 uuden Sydney Metron keskustan asema nimettiin uudelleen
  Gadigal-asemaksi rakennusvaiheessa; asema oli aiemmin nimetty Pitt Street
  -asemaksi.

**Nosto H3 — "Vapaa kaupunki syntyy" (511 merkkiä)**

> Kuvernööri Lachlan Macquarie ajoi 1810-luvulta lähtien vapaiden
> siirtolaisten muuttoa New South Walesiin, ja vapaiden asukkaiden enemmistö
> alkoi vaatia vankikuljetusten lopettamista. Ne päättyivät 1840. Vapautuneet
> vangit, vapaana syntyneet ja uudet siirtolaiset muodostivat pian kaupungin
> enemmistön, ja 1842 Sydney julistettiin viralliseksi kaupungiksi omalla,
> rajoitetulla äänioikeudella valitulla hallintoneuvostollaan. Perusta oli
> valmis sille, mitä kultaryntäys seuraavalla vuosikymmenellä
> moninkertaisti.

Faktat ja lähteet (en-Wikipedia "History of Sydney"):
- Vapaiden brittiläisten siirtolaisten määrä kasvoi 900:sta (1826–30)
  29 000:een (1836–40); moni asettui Sydneyyn. 1840-luvulla kaupungissa oli
  jo selvä maantieteellinen jako köyhän, työväenluokkaisen väestön (mm. The
  Rocksissa) ja varakkaamman väestön välillä.
- Vapaat siirtolaiset, vapaana syntyneet ja entiset vangit muodostivat pian
  Sydneyn väestön valtaenemmistön, mikä ruokki julkista vaatimusta
  vastuunalaisesta hallinnosta ja vankikuljetusten lopettamisesta.
  Vankikuljetukset New South Walesiin päättyivät 1840.
- New South Walesin lakiasäätävä neuvosto muuttui osin vaaleilla valituksi
  1842, ja Sydney julistettiin samana vuonna kaupungiksi rajoitettuun
  omaisuuskiintiöön perustuvalla äänioikeudella valitulla
  hallintoneuvostolla.

**Nosto H4 — "Vuosi jolloin kaikki oli kesken" (585 merkkiä)**

> Vuonna 1873 kuvernöörin talon eteen valmistui uusi vaunukatos,
> porte-cochère — yksi harvoista rakennushankkeista, joka valmistui juuri
> sinä vuonna, kun kaikki muu oli vielä kesken. Samana vuonna arkkitehti
> Thomas Rowe valittiin suunnittelemaan uutta suursynagogaa yhdistämään
> kaupungin kaksi juutalaisyhteisöä — rakennus valmistui vasta 1878.
> Rautatieasema sai uuden tiilirakennuksen, jonka piirustukset olivat
> vuodelta 1871 mutta viralliset avajaiset vasta 1874. Isoisä käveli siis
> kaupungissa, joka rakensi itseään joka kadulla yhtä aikaa, mutta ei ollut
> vielä missään kohtaa valmis.

Faktat ja lähteet:
- Government House -kuvernöörintalon lisärakennukset: eteinen vaunukatos
  (porte-cochère) valmistui 1873, pylväikkö (Colonnade) ja itäinen arkadi
  1879–80. Talo itse rakennettiin 1837–1843/1847, ja kuvernööri asui siinä
  vuodesta 1845. — en-Wikipedia "Government House, Sydney", osio
  "Modifications and dates" (*"1873 - A porte cochere added"*, *"1879-80 -
  Construction of Colonnade and eastern arcade"*)
- Kahden Sydneyn juutalaisyhteisön yhdistämiseksi rakennettavan uuden
  suursynagogan tontti ostettiin 1871, ja arkkitehti Thomas Rowe valittiin
  rajoitetun kilpailun kautta 1872. Peruskivi muurattiin 26.1.1875, ja
  synagoga vihittiin käyttöön 4.3.1878 — sisustus valmistui vasta 1883. —
  en-Wikipedia "Great Synagogue (Sydney)"
- Toinen Sydneyn rautatieasema (Sydney Terminal) rakennettiin nykyisen
  Central-aseman paikalle vanhan, riittämättömäksi käyneen aseman tilalle:
  piirustukset ovat vuodelta 1871, mutta virallinen avajaispäivä oli 1874.
  — en-Wikipedia "Central railway station, Sydney"

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

Rakenne noudattaa New Yorkin/Manilan `matkailijalle.artikkeli.jaksot`-mallia.
Faktat eivät toista osion 2 nostoja.

**Jakso 1 — "Perille ja liikkeelle"**

> Sydney kohoaa saarilta ja niemekkeiltä valtavan luonnonsataman ympärille,
> siellä missä Port Jackson avautuu Tasmaninmereen — sijainti, jonka Arthur
> Phillip löysi vasta kun Botany Bay osoittautui riittämättömäksi.
> Vuosikymmenten ajan kaupunki oli ennen kaikkea satama: ensin
> rangaistussiirtokunnan ja vankilaivojen päätepiste, sitten kultaryntäyksen
> ja höyrylaivojen portti maailmalle. Nykyinen kaupunkialue levittäytyy
> sataman molemmin puolin kymmenien lahdenpoukamien ja niemekkeiden väliin.

Faktat ja lähteet:
- Ensimmäinen eurooppalainen havainto Sydneyn satamasta oli James Cookin
  1770; hän ei purjehtinut sisään. Arthur Phillip löysi ja tutki lahden
  1788 Botany Bayn osoittauduttua sopimattomaksi. — en-Wikipedia "Port
  Jackson"
- Port Jackson avautuu Tasmaninmereen, ja Sydneyn kaupunkialue on
  levittäytynyt sen molemmin puolin lukuisten lahdenpoukamien ja
  niemekkeiden ympärille. — en-Wikipedia "Port Jackson"

**Jakso 2 — Alueen rakenne**

> Sydneyn keskusta lepää paksun hiekkakivikallion päällä, josta koko
> varhainen kaupunki louhittiin: hiekkakivi näkyy yhä kirkoissa,
> varastorakennuksissa ja katujen reunakivissä. The Rocks, kaupungin
> vanhin kortteli aivan Sydney Coven länsipuolella, sai nimensä juuri
> tästä kalliosta. Satama-alue oli 1800-luvulla täynnä laivavarustamoja ja
> villavarastoja, ja monet nykyiset lahdenpoukamat ovat osittain täytettyä
> maata.

Faktat ja lähteet:
- The Rocksin alkuperäiset rakennukset olivat ensin risuseinäisiä
  olkikattoisia mökkejä, myöhemmin paikallisesta hiekkakivestä (Sydney
  sandstone) rakennettuja — alue sai nimensä tästä kalliosta. Kadigalit
  kutsuivat aluetta Tallawoladahiksi. — en-Wikipedia "The Rocks, New South
  Wales"
- Fort Denisonin saaren rakennuksiin louhittiin kiveä myös Circular Quayn
  rakentamiseen; saaren korkeutta madallettiin louhinnan yhteydessä. —
  en-Wikipedia "Fort Denison"

**Jakso 3 — Arjen ilmiö: satamakortteli jengeineen ja merimiehineen**

> The Rocksin kapeat kujat olivat 1870-luvulla yhä köyhän väen aluetta:
> seutu tunnettiin jengistä nimeltä Rocks Push, ja maine säilyi rosoisena
> suunnilleen 1870-luvulle asti — isoisä siis näki aluetta juuri sen
> rosoisimpana kautena. Rannassa, alueen vanhimpien rakennusten
> joukossa, seisoi vuonna 1816 valmistunut Cadmans Cottage — 1870-luvulla
> se toimi merimiesten kotina, paikkana jonne vasta maihin astuneet
> purjehtijat saattoivat majoittua. Alue oli täynnä kapakoita,
> laivaustoimistoja ja väkeä, joka eli suoraan sataman tahdissa.

Faktat ja lähteet:
- The Rocksilla oli koko siirtokunnan alkuajoista lähtien slummin ja
  vasta maihin tulleiden vankien puoli maine, jota myöhemmin 1800-luvulla
  ylläpiti Rocks Push -jengi; rosoinen maine säilyi suunnilleen 1870-luvulle
  asti. — en-Wikipedia "The Rocks, New South Wales"
- Cadmans Cottage valmistui 1816 (Sydneyn toiseksi vanhin säilynyt
  asuinrakennus); se toimi hallituksen ruorimiesten asuntona 1816–1845,
  Sydneyn vesipoliisin päämajana 1845–1864 ja merimiesten kotina (Sailor's
  Home) 1865–1970 — vuonna 1873 se oli siis merimiesten koti. —
  en-Wikipedia "Cadmans Cottage"

**Jakso 4 — Historian käännekohta: puro joka peittyi ja lahti joka kaventui**

> Sydney Cove kaventui 1837–1844 huomattavasti nykyistä muotoaan kohti, kun
> sen eteläreuna muurattiin uudeksi, keinotekoiseksi rantaviivaksi ja lahden
> pohjukkaan laskenut Tank Stream -puro peitettiin maan alle. Uutta rantaa
> alettiin kutsua puoliympyrän muotonsa mukaan Semi-Circular Quayksi, josta
> nimi lyheni ajan myötä Circular Quayksi. Rannalle nousi tullitalo
> 1844–1845, ja 1860-luvulle tultaessa koko ranta-alue oli laitureiden ja
> villavarastojen peitossa — juuri sellaisena isoisä sen näki.

Faktat ja lähteet (en-Wikipedia "Circular Quay"):
- Circular Quay rakennettiin 1837–1844 muuraamalla Sydney Coven
  eteläosaan keinotekoinen rantaviiva; Tank Stream -puron suu, joka laski
  lahteen quayn länsipäässä, täytettiin umpeen. Satama tunnettiin alun
  perin nimellä "Semi-Circular Quay" muotonsa mukaan, ja nimi lyhentyi
  myöhemmin käytännöllisyyden vuoksi.
- Tullitalo (Customs House) rakennettiin rannalle 1844–1845. 1860-luvulle
  tultaessa Circular Quayn kaikki kolme sivua olivat laitureiden ja
  varastojen — erityisesti villakaupan — hallitsemia.

**Jakso 5 — Milloin kannattaa tulla**

> Sydneyssä on lauhkea, kostea subtrooppinen ilmasto (Köppenin luokitus
> Cfa): kesät ovat lämpimiä ja talvet leutoja, eikä selvää kuivaa kautta
> ole, vaikka sade painottuu kesään ja syksyyn. Kaupungin virallinen
> sääasema on toiminut Observatory Hillillä vuodesta 1858 — siis jo
> viisitoista vuotta ennen isoisän vierailua — samalla paikalla, jossa
> aikapallo pudotettiin joka päivä kello yhdeltä.

Faktat ja lähteet:
- Köppenin ilmastoluokka Cfa (kostea subtrooppinen); ei selvää kuivaa tai
  sadekautta, vaikka sadanta painottuu kesä-syksyyn ja vähenee vuoden
  puolivälissä. — en-Wikipedia "Climate of Sydney"
- Sydneyn virallinen ensisijainen sääasema on Observatory Hill; havainnot
  ulottuvat 1800-luvulle (asema perustettu observatorion yhteyteen
  1857–1859, toiminnassa 1858 lähtien). Ääriarvot: kuumin mitattu 45,8 °C
  (18.1.2013), kylmin 2,1 °C (22.6.1932). — en-Wikipedia "Sydney" (osio
  "Climate"); "Sydney Observatory"

**Huomio kirjoittajalle (sanallinen vuodenkierto, ei-numeerinen, koska
ERA5-normaaleja ei ajettu — ks. osio 5):** Sydneyssä on lämpimät, kosteat
kesät (joulu–helmikuu) ja leudot talvet (kesä–elokuu); sademäärä jakautuu
läpi vuoden, painottuen hieman kesä-syksyyn.

---

## 4. Yhdeksän kohdekartan kohdetta

Koordinaatit MediaWiki-APIn `action=query&prop=coordinates`-kutsulla (haettu
23.8.2026, `redirects=1`-parametrilla). Etäisyydet ja suunnat laskettu
koneellisesti haversine-kaavalla (Python-skripti, R=6371 km, ei käsin).

**Vertailupiste on Sydney Cove, ei Wikipedian hallinnollinen kaupunkipiste**
(spec-mantereet.md sääntö 4: kartan keskusta valitaan historiallisen ytimen
mukaan). Sydney Cove on paikka, jossa siirtokunta perustettiin 1788 ja jonka
ympärille koko 1873-kauden ydin (The Rocks, Circular Quay, Government House,
Sydney Mint) rakentuu. Wikipedian oma kaupunkipiste (40 km² CBD-alueen
keskiarvopiste) osuu n. 1 km etelään tästä ytimestä — samantyyppinen ero kuin
San Franciscon ja New Yorkin ennakkotapauksissa.

| # | Nimi | Koordinaatit | Lähdeartikkeli | Etäisyys Sydney Covesta | Suunta |
|---|---|---|---|---|---|
| 1 | Sydney Cove, vertailupiste | 33,85861°S 151,21167°I | "Sydney Cove" (API) | (vertailupiste) | — |
| 2 | Sydney (Wikipedian hallinnollinen piste) | 33,86778°S 151,21°I | "Sydney" (API) | 1,03 km | E |
| 3 | Cadmans Cottage | 33,8589°S 151,2092°I | "Cadmans Cottage" (API) | 0,23 km | L |
| 4 | The Rocks (alueen piste) | 33,85985°S 151,20901°I | "The Rocks, New South Wales" (API) | 0,28 km | LO |
| 5 | Circular Quay | 33,861°S 151,211°I | "Circular Quay" (API) | 0,27 km | E |
| 6 | Sydney Observatory | 33,8596°S 151,2047°I | "Sydney Observatory" (API) | 0,65 km | L |
| 7 | Government House | 33,859919°S 151,215008°I | "Government House, Sydney" (API) | 0,34 km | KA |
| 8 | Sydney Mint | 33,8689°S 151,2125°I | "Sydney Mint" (API) | 1,15 km | E |
| 9 | Fort Denison | 33,8549°S 151,2255°I | "Fort Denison" (API) | 1,34 km | I |

(P = pohjoinen, KO = koillinen, I = itä, KA = kaakko, E = etelä, LO = lounas,
L = länsi, LU = luode.)

**Huomio:** kaikki yhdeksän kohdetta mahtuvat n. 1,4 km säteelle Sydney
Covesta — tiiviimpi rypäs kuin New Yorkissa, koska isoisän ajan Sydney oli
vielä hyvin kompakti satamakaupunki. Great Synagogue (koordinaatit
33,87265°S 151,20947°I, n. 1,57 km E Sydney Covesta) olisi kymmenes ehdokas,
mutta jätin sen yhdeksän kohteen ulkopuolelle rakennuksen ollessa 1873
vasta suunnitteluvaiheessa (arkkitehti valittiin juuri sinä vuonna, itse
rakennus valmistui vasta 1878) — kartantekijän harkinnassa, kannattaako
"tulevaa" kohdetta silti näyttää historiallisena merkintänä, koska tontti
oli jo ostettu 1871.

**Sydney Harbour Bridge on TIETOISESTI JÄTETTY POIS** — se on selkein
Sydneyn anakronismi: siltaa ei ollut edes suunniteltu 1873, se avattiin
vasta 1932 (ks. osio 8, huomio 2). Samaan tapaan **Sydney Opera House ei
kuulu tähän koosteeseen lainkaan** — sitä ei ollut vielä ideanakaan 1870-
luvulla (avattiin 1973, tasan sata vuotta isoisän matkan jälkeen) ja se
kuuluu nykykohteiden puolelle, ei tähän 1873-painotteiseen faktapohjaan.

**Elizabeth Farm** (John Macarthurin tila, Australian merinovillatalouden
kehto, Parramattassa) laskettiin mutta jätettiin yhdeksän kohteen ulkopuolelle
etäisyyden vuoksi: 18,4 km Sydney Covesta, L. Liian kaukana Sydneyn
kaupunkikartalle, mutta hyvä ehdokas maalehden (AUS) villa-aiheeseen, jos
sellainen tehdään.

---

## 5. Säätiedot

- **Sydney Coven koordinaatit:** 33,85861°S, 151,21167°I — haettu Wikidatan
  kautta MediaWiki APIlla. — en-Wikipedia "Sydney Cove"
- **ERA5-normaalit puuttuvat tästä koosteesta:** en ajanut
  `tools/hae-saanormaalit.mjs`-työkalua (rajauksen mukaan en koske
  js/packs-tiedostoihin). Kirjoittajan/Fablen kannattaa ajaa
  `node tools/hae-saanormaalit.mjs --vain sydney` ennen lehden viimeistelyä.
  Jos Open-Meteon arkisto antaa 429:n (vuorokausikiintiö), säärivi jätetään
  pois lohkokommentilla Samarkand-mallin mukaisesti (resepti, LISÄYS
  21.8.2026) ja oppaan sääjakso nojaa alla oleviin Wikipedia-lukuihin.
- **En-Wikipedian "Sydney" -artikkelin säälaatikko (varalähde):** antaa
  kuukausikeskiarvot Observatory Hill -asemalta. Tähän koosteeseen ei
  poimittu tarkkoja kuukausilukuja taulukkomuodossa (raakateksti käyttää
  `{{Weather box}}`-mallinetta, jonka arvot pitää lukea erikseen, jos
  kirjoittaja tarvitsee ne ERA5:n sijasta) — vain ääriarvot ja
  ilmastoluokka on poimittu alle.
- **Sanallinen vuodenkierto (varovainen, ei-numeerinen kuvaus, perustuu
  Wikipedian ilmasto-osioon):** Köppenin luokka Cfa, kostea subtrooppinen
  ilmasto ilman selvää kuivaa kautta; kesät (joulu–helmikuu) lämpimiä,
  talvet (kesä–elokuu) leutoja; sadanta painottuu hieman kesä-syksyyn ja on
  alimmillaan vuoden puolivälissä; n. 15 sumupäivää vuodessa, tyypillisesti
  talviaamuisin.
- **Ääriarvot Observatory Hillin asemalta:** kuumin mitattu 45,8 °C
  (18.1.2013), kylmin 2,1 °C (22.6.1932). Nämä ovat moderneja ennätyksiä,
  ei 1873-ajalta — Observatory Hillin havaintosarja kuitenkin ulottuu jo
  1858:aan, joten asema oli toiminnassa isoisän vierailun aikaan.

---

## 6. Kuva-aiheet

Erityishuomio: **ei tunnistettavia ihmisiä missään kuvassa** (kaukaiset
pisteet ja selin olevat kelpaavat). Erityishuomio alkuperäiskansakuvissa
(spec-mantereet.md): sama arki- ja ylpeyskuvasto kuin muuallakin — ei
kurjuuskuvastoa eikä pelkkiä seremoniaklišeitä; jos kadigal/eora-aiheisia
kuvia haetaan, suositaan nykyaikaisia, elävän kulttuurin kuvia yksityis-
kohtien tai muotokuvien sijaan (esim. Gadigal-rautatieaseman kylttikuva,
kulttuuritapahtumat), ei 1800-luvun etnografisia "tyyppikuvia".

### 6.1 Avauskuvat (3, teemasivun `historia` avaukseen)

1. Sydney Observatoryn aikapallotorni (Observatory Hill) lähikuvassa — koko
   teemasivun vahvin 1873-ankkuri (K3/J5).
2. Fort Denisonin martello-torni ulkoa kuvattuna, ei ihmisiä.
3. Government Housen vaunukatos (porte-cochère) — 1873-lisäys —
   julkisivukuvassa (ei pylväikkö/Colonnade, joka valmistui vasta 1879–80).

### 6.2 Kansikuvaehdokkaiden KATEGORIALISTAUS — 3 laajaa yleiskuvaa

Raamatun KANSIKARUSELLI-linjauksen (21.8.2026) mukaisesti: kolme LAAJAA
yleiskuvaa kaupungin ERI puolilta, ei yhtään yksityiskohtaa, sisäkuvaa,
reliefiä, ruokaa tai esinettä. **Huomio: koska Sydney Harbour Bridge ja
Opera House ovat molemmat 1873-anakronismeja (ks. osio 4 ja 8), niitä ei
pidä käyttää siluettikuvissa ellei kuva rajataan tarkoituksella niin, että
nämä maamerkit eivät näy** — tämä on merkittävä poikkeus tavanomaisesta
Sydney-kuvastosta, jossa juuri nämä kaksi hallitsevat lähes kaikkia
nykyaikaisia laajoja yleiskuvia. Kirjoittajan kannattaa harkita, käytetäänkö
kansikuvissa mieluummin 1800-luvun PD-kuvitusta (esim. "Sydney 1888.jpg",
mainittu en-Wikipedia "History of Sydney" -artikkelissa) tai nykyistä kuvaa,
jossa silta/oopperatalo eivät näy tai jossa lehti selkeästi merkitsee ne
myöhemmiksi lisäyksiksi kuvatekstissä samaan tapaan kuin NY:n Vapaudenpatsas-
huomio.

1. **Siluetti kaukaa (HUOM anakronismi yllä):** `Category:Aerial views of
   Sydney` tai 1800-luvun litografia `Category:Historical images of Sydney`
   — jos nykykuva, rajaus jonka ottaa The Rocksin/Circular Quayn suunnasta
   niin, ettei silta hallitse kuvaa.
2. **Ranta/satama:** `Category:Sydney Harbour` tai `Category:Circular Quay`
   — laaja näkymä satamasta, esim. Circular Quay veneineen.
3. **Maamerkki ympäristössään:** `Category:The Rocks, Sydney` tai
   `Category:Fort Denison` — esim. Fort Denison ympäröivän sataman keskellä,
   tai The Rocksin hiekkakivikorttelit kokonaisuutena.

### 6.3 Nosto-/jaksokuvat (9 ehdotusta)

1. Sydney Observatoryn aikapallotorni ja/tai itse aikapallomekanismi
   lähikuvassa (K3).
2. Fort Denisonin martello-torni kokonaiskuvassa merestä käsin (K3).
3. Sydney Mintin (entinen Rum Hospital) hiekkakivijulkisivu (K4) — Commonsissa
   1870 vuodelta oleva historiallinen kuva "Sydney Mint 1870 SLNSW
   FL1229069.jpg" mainittu artikkelissa, tarkistettava lisenssi.
4. Government Housen vaunukatos (porte-cochère) -julkisivu, 1873-lisäys
   (H4) — ei pylväikkö/Colonnade (1879–80).
5. Great Synagoguen julkisivu tai sen 1870-luvun rakennuspiirustus/-kuva
   (H4) — huom: rakennus valmistui vasta 1878, joten kuva on ajallisesti
   "tulevaisuudesta" isoisän näkökulmasta, kuvatekstissä syytä mainita.
6. Central-aseman (Sydney Terminal, 2. rakennus) 1870-luvun historiallinen
   kuva — Commonsissa mainittu "Second Sydney terminal railway station.png"
   (n. 1874) ja "The second Sydney station platforms, 1874-1906.jpg"
   (H4/K2).
7. The Rocksin hiekkakivikujat, esim. Argyle Cut tai kadigalien Tallawoladah
   -alueen nykyiset kadut (J2/J3).
8. Cadmans Cottagen julkisivu Georgen kadulta (J3).
9. Circular Quayn/Sydney Coven varhainen kartta tai 1800-luvun litografia,
   joka näyttää lahden ennen 1837–1844 muutostöitä (J4) — hyvä pari
   nykykuvalle samasta paikasta.

### 6.4 Ennen ja nyt -kuvaparin ehdokkaat

En löytänyt Sydneylle valmista, peliin jo tarkistettua paria (toisin kuin
New Yorkin Mulberry Street -tapauksessa) — `js/packs/northamerica-valokuvat.js`
-tyyppistä `oceania-valokuvat.js`-tiedostoa ei vielä ole. Kirjoittajan
kannattaa hakea Commonsista erikseen, esim.:

- **Circular Quay / Sydney Cove ennen ja nyt** (J4): 1800-luvun litografia
  Semi-Circular Quaystä rakennustöiden aikaan tai pian sen jälkeen
  vs. nykyinen Circular Quay. Paras teemakuva 1873-kulman kannalta, koska
  fyysinen muutos (puron peittäminen, uusi rantaviiva) on konkreettinen ja
  hyvin dokumentoitu.
- **The Rocks ennen ja nyt** (J3): 1870-luvun katunäkymä
  (esim. Argyle Cut -louhinnan aikaisia kuvia on Commonsissa) vs. nykyinen
  turistinähtävyyskatu — kontrasti "köyhän väen kortteli" → "suosituin
  historiallinen turistikohde" on vahva tarina.

Kumpaakaan ei ole vielä katsottu silmin eikä lisenssiä tarkistettu — tämä on
kirjoittajan tehtävä.

### 6.5 Kuvien lähdehuomio

En hakenut, katsonut enkä valinnut yksittäisiä Commons-tiedostoja tässä
koosteessa (rajauksen mukaisesti) — yllä on vain kategoria- ja
aihetasoisia ehdotuksia. Kirjoittaja tekee varsinaisen kuvahaun,
silmätarkistuksen ja lisenssivarmistuksen lehtityö-reseptin kuvasääntöjen
mukaisesti.

---

## 7. Vanhan äänitteen ehdokkaat (PD, n. 1900–1925)

**En löytänyt vahvaa ehdokasta tässä ajassa.** Haku kohdistui archive.orgin
georgeblood-kokoelmaan ja Commonsiin hakusanoilla "Sydney", "Waltzing
Matilda" (Australian tunnetuin 1800-luvun laulu, kirjoitettu 1895 — siis
kaksi vuotta isoisän matkan jälkeen, ei sovi ajallisesti ilman selittelyä) ja
"Botany Bay" (englantilainen kansanlaulu Australian rangaistussiirtokunnasta,
mutta en löytänyt tarkistettua PD-äänitettä 1900–1925-ajalta hakuajan
puitteissa). Tämä osio jää auki — kirjoittajan/Fablen kannattaa tehdä oma
hakukierros ennen lehden viimeistelyä, tai jättää Sydneyn ääniparivalikko
tyhjäksi Raamatun "Dubai/Doha/Salalah/Astana"-ennakkotapauksen mukaisesti
(kaupunkilehti.md: "näistä ei löytynyt kuvasäännöt täyttävää vanhaa
vedosta").

---

## 8. Ristiriidat, epävarmuudet ja ei-Wikipedia-lähteet

1. **Kolme rakennushanketta osuu poikkeuksellisen tarkasti vuoteen 1873 —
   perustelu korjattu, mutta pitää edelleen.** Government Housen 1873-lisäys
   oli vaunukatos (porte-cochère), EI pylväikkö — varsinainen pylväikkö
   (Colonnade) ja itäinen arkadi valmistuivat vasta 1879–80 (en-Wikipedia
   "Government House, Sydney", osio "Modifications and dates": *"1873 - A
   porte cochere added"*, *"1879-80 - Construction of Colonnade and eastern
   arcade"*). Tämä on korjattu kaikkialla koosteessa (H4, Sivu B:n
   perustelu, kuva-aiheet). Itse 1873-ankkuri kuitenkin pitää: porte-cochère
   valmistui juuri 1873, joten Government House -hanke osuu edelleen tarkasti
   isoisän matkavuoteen — vain sanavalinta ja rakennusosan mittakaava
   (pieni vaunukatos, ei koko julkisivun pylväikkö) muuttuu, ei vuosi.
   Kaksi muuta ankkuria pitävät ennallaan: arkkitehti Thomas Rowe valittiin
   suursynagogan suunnittelijaksi 1872 ja peruskivi muurattiin tammikuussa
   1875 (en-Wikipedia "Great Synagogue (Sydney)"), ja Central-aseman toisen
   rakennuksen piirustukset ovat 1871 mutta avajaiset 1874 (en-Wikipedia
   "Central railway station, Sydney") — kaikki kolme olivat siis
   kirjaimellisesti "kesken" tai juuri valmistumassa/valmistuneet isoisän
   matkavuoden tienoilla. Perustelu ei siis romahda, mutta on syytä
   kuvatekstissä ja leipätekstissä käyttää pientä, tarkkaa rakennusosaa
   (vaunukatos) eikä antaa mielikuvaa suuresta, koko julkisivun
   pylväshankkeesta. Tämä on huomionarvoinen löydös Fablelle/kaaren
   kirjoittajalle, ei oma päätökseni. (Korjattu tarkistus-sydney.md:n
   huomion 2 mukaisesti.)

2. **Sydney Harbour Bridge ja Sydney Opera House EIVÄT olleet olemassa
   1873** — tärkeä anakronismivaroitus, samantyyppinen kuin New Yorkin
   Vapaudenpatsas. Silta avattiin 1932 (Bradfieldin suunnitelma alkoi vasta
   1900-luvun alussa), Opera House 1973. Molemmat hallitsevat lähes kaikkea
   nykyaikaista Sydney-kuvastoa, joten kansikuvien ja siluettikuvien
   valinnassa pitää olla erityisen tarkka (ks. osio 6.2). — en-Wikipedia
   "Sydney Harbour Bridge"

3. **Elizabeth Farm ja villakauppa jätettiin kaupunkikartan ulkopuolelle**
   etäisyyden vuoksi (18,4 km Sydney Covesta, ks. osio 4), mutta aihe
   (John Macarthur, merinovillan alku Australiassa) on vahva ehdokas
   maalehden (AUS) puolelle, jos/kun sellainen tehdään — en ole tehnyt tätä
   päätöstä puolesta.

4. **Sukupolvien erottaminen (Stolen Generations) ei nouse tässä
   koosteessa** — spec-mantereet.md mainitsee sen Australia-linjauksessa,
   mutta ilmiö on 1900-luvun (erityisesti 1910–1970) historiaa, joka ei
   luontevasti kytkeydy tämän kaupunkilehden 1873-painotteiseen sisältöön.
   Jätän sen mainitsematta nostoehdotuksissa; jos kirjoittaja haluaa silti
   viitata siihen (esim. maalehden puolella), se vaatii oman, erikseen
   harkitun sisältöpäätöksen ikäsopivuuslinjauksen mukaisesti.

5. **Sydneyn väkiluku 1873:lle ei löytynyt suoraa lukua** — en-Wikipedia
   antaa vain kymmenvuotispisteet (95 600 vuonna 1861, 386 900 vuonna 1891).
   1873 sijoittuu näiden väliin, karkeasti arvioiden ehkä 150 000–200 000
   asukasta, mutta tätä ei ole vahvistettu tarkalla lähteellä — **oma
   päättely, ei suoraan lähteestä**. Jos kirjoittaja tarvitsee tarkemman
   luvun, kannattaa etsiä New South Walesin siirtomaa-aikaisia väestö-
   laskentoja (esim. 1871 census) erikseen.

6. **Great Synagogue jätettiin pois yhdeksän kohteen kartasta mutta on
   mukana nostoissa** (H4) — ks. osio 4 perustelu. Tämä on kartantekijän
   päätettävissä, ei tässä ratkaistavissa lopullisesti.

7. **Sää-ERA5-normaalit puuttuvat kokonaan** (ks. osio 5) — en ajanut
   `tools/hae-saanormaalit.mjs`-työkalua rajauksen mukaisesti. Vain
   Wikipedian ilmastoluokka ja ääriarvot on koottu; kuukausikeskiarvot
   puuttuvat.

8. **Etäisyydet ja suunnat osiossa 4 on laskettu koneellisesti**
   (Python-skripti, haversine-kaava pallogeometrialla, R=6371 km) — ei
   käsin.

9. **Kaikki nostot ja jaksot on kirjoitettu valmiiksi suomenkieliseksi
   tekstiksi** merkkimäärätavoitteiden mukaan, ja merkkimäärät on laskettu
   KONEELLISESTI Python-skriptillä (`len()`). Nostot K1–K4, H1–H4 ovat
   kaikki 440–660 merkin sisällä (kaupunkilehti.md:n mitta); tarkat luvut
   lukevat otsikoissa. Sivujen johdannot (326 ja 287 merkkiä) noudattavat
   New Yorkin ennakkotapauksen linjaa (Raamatun 20.8.2026-linjaus kumosi
   vanhan tarkan normin sivun johdannolle).

10. **Vanhan äänitteen haku jäi tuloksettomaksi** (ks. osio 7) — tämä
    poikkeaa New Yorkin koosteesta, jossa löytyi ainakin yksi vahva ehdokas.
    Kirjoittajan kannattaa tehdä oma hakukierros ennen julkaisua, tai
    hyväksyä että Sydney jää toistaiseksi "ilman paria" -listalle
    (kaupunkilehti.md-ennakkotapaukset: Dubai, Doha, Salalah, Astana).

11. **Sydney Observatory ja Fort Denisonin aikapallo/tykki-yhteys on
    kaksi eri artikkelia yhdistävä väite — korjattu tarkistus-sydney.md:n
    huomion 3 mukaisesti.** Molemmat artikkelit ("Sydney Observatory" ja
    "Fort Denison") vahvistavat saman tarinan omista näkökulmistaan
    (observatorio pudottaa pallon kello yhdeltä vuodesta 1858, tykki
    ammutaan samaan aikaan Dawes Pointilta), mutta tykki siirrettiin Fort
    Denisonille vasta 1906 — Fort Denisonin oma artikkeli vahvistaa
    suoraan: *"In 1906, a saluting gun ... was transferred from Dawes
    Point to Fort Denison"* ja *"The custom of firing a gun daily at 1pm
    began in 1906"*. Koosteen aiempi versio yhdisti nämä virheellisesti
    niin, että tykki ammuttiin jo 1873 Fort Denisonilta — Nosto K3 on
    korjattu käyttämään Dawes Pointia isoisän vierailun (1873) yhteydessä
    ja mainitsemaan 1906-siirto erikseen.

---

## Korjaushistoria

**23.8.2026 — neljä faktavirhettä korjattu docs/mantereet-tyoaineisto/
tarkistus-sydney.md:n löydösten perusteella.** Korjaukset tarkistettu
uudelleen suoraan en-Wikipediasta (`action=raw`, `NODE_USE_ENV_PROXY=1`;
ei 429-vastauksia tässä erässä). Kaikkien kahdeksan noston (K1–K4, H1–H4)
merkkimäärät mitattu uudelleen Nodella (`[...s].length`) korjausten
jälkeen — kaikki edelleen 440–660 merkin sisällä (ks. tarkat luvut
otsikoissa).

1. **Sivu A:n johdanto (osio 1, tarkistuksen huomio 1):** poistettiin
   virheellinen "ja Kamay" — Kamay on Botany Bayn nimi dharawalin
   kielellä, ei Sydney Coven/Port Jacksonin nimi eoran kielellä. Johdanto
   kertoo nyt vain Warranesta (Sydney Cove, eora). Vahvistettu:
   en-Wikipedia "Sydney Cove" (*"The Eora name for Sydney Cove was
   recorded ... Warrane..."*), "Botany Bay" (*"Botany Bay (Dharawal:
   Kamay)"*, *"Botany Bay is named Kamay in the Dharawal language"*).

2. **Government Housen 1873-lisäys (osio 2, tarkistuksen huomio 2):**
   "pylväikkö" korvattiin "vaunukatoksella (porte-cochère)" Nostossa H4,
   Sivu B:n perustelussa ja kuva-aiheissa (6.1, 6.3); 1879–80-lisäys
   nimettiin uudelleen "pylväikkö (Colonnade) ja itäinen arkadi" -muotoon.
   Vahvistettu: en-Wikipedia "Government House, Sydney", osio
   "Modifications and dates" (*"1873 - A porte cochere added"*, *"1879-80
   - Construction of Colonnade and eastern arcade"*). "Kolme
   rakennushanketta 1873" -perustelu (osio 8, huomio 1) arvioitiin
   uudelleen: se EI romahda, koska porte-cochère todella valmistui juuri
   1873 — vuosiankkuri pitää, vain rakennusosan nimi ja mittakaava
   muuttuivat (pieni vaunukatos, ei koko julkisivun pylväshanke). Kaksi
   muuta ankkuria (Great Synagogue: arkkitehti valittu 1872; Central-asema:
   piirustukset 1871, avajaiset 1874) pitävät ennallaan, kuten
   tarkistusraportti totesi.

3. **Fort Denisonin tykinlaukaus (osio 3, tarkistuksen huomio 3):**
   Nosto K3:sta poistettiin anakronistinen kytkös "tykki Fort Denisonin
   saarelta" isoisän 1873-vierailun yhteydessä. Tykki ammuttiin 1873
   yhä Dawes Pointilta; siirto Fort Denisonille ja päivittäisen
   klo 13 -laukauksen käytäntö vahvistuivat vasta 1906. Vahvistettu:
   en-Wikipedia "Fort Denison" (*"In 1906, a saluting gun ... was
   transferred from Dawes Point to Fort Denison"*, *"The custom of
   firing a gun daily at 1pm began in 1906"*).

4. **The Rocks Push -jengin maineen kesto (osio 4, tarkistuksen huomio
   4):** Jakso 3:n leipäteksti muutettiin vastaamaan omaa
   Faktat-lähteet-riviään — "vuosisadan loppuun asti" korvattiin
   "suunnilleen 1870-luvulle asti". Vahvistettu: en-Wikipedia "The
   Rocks, New South Wales" (*"It maintained this rough reputation until
   approximately the 1870s."*).

**Ei korjattu (tarkistuksen "varoitukset", eivät pakollisia):**
Cadmans Cottagen vaihepäivämäärien pieni pyöristysero, "n. 15
sumupäivää" -väitteen erillinen tarkistamattomuus, Elizabeth Farmin
etäisyyden pisteellinen vahvistamattomuus ja Commons-kuvien
lisenssitarkistus jäivät tarkoituksella koskematta — ne ovat
tarkistusraportin mukaan tarkennuksia, eivät esteitä, ja niiden
korjaaminen ei kuulunut tämän kierroksen neljän pakollisen kohdan
rajaukseen.
