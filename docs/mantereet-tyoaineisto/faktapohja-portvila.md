# Port Vila — faktakoostaja, uusi kaupunkilehti (Oseanian lauta)

Lauta-id `oceania`, kaupunki-id `portvila`, maa VUT (Vanuatu),
en-Wikipedia "Port Vila" ellei toisin mainita. Kaikki tiedot haettu
en-Wikipediasta **6.9.2026** (`action=raw`, `NODE_USE_ENV_PROXY=1`).
Jokainen haettu otsikko tarkistettu #REDIRECT-rivin varalta —
**"Chief Roi Mata's Domain" on ohjaus**, oikea artikkeli on
"Roi Mata"; **"Pentecost Island" on ohjaus**, oikea artikkeli on
"Pentecost (island)"; **"Mele Cascades" ei ole artikkelina
olemassa** (HTTP 404), joten Mele Cascadesista EI OLE
Wikipedia-lähdettä — se mainitaan vain "Efate"-artikkelin
yhdessä virkkeessä.

Luetut artikkelit: "Port Vila", "Vanuatu", "Efate", "New Hebrides",
"Franceville, New Hebrides", "Bislama", "Roi Mata", "Vanuatu
Cultural Centre", "National Museum of Vanuatu", "Sand drawing",
"Iririki", "Ifira", "Cathédrale du Sacré-Cœur, Port Vila",
"Independence Park, Port Vila", "Parliament of Vanuatu", "National
University of Vanuatu", "Bauerfield International Airport",
"Blackbirding", "Cyclone Pam", "Kava", "Land diving".

Luin ennen työtä `js/tyohuone-raamattu.js` (Perustuslaki),
`docs/aasia-tyoaineisto/lehtityo-resepti.md` (SITOVA),
`docs/moduulit/kaupunkilehti.md`, `docs/tyolista-opukselle.md`
(O9, ETUSIVUKUVAN KAAVA) ja
`docs/mantereet-tyoaineisto/spec-mantereet.md` (Oseania-osio).
Mallina `faktapohja-suva.md` ja `faktapohja-cairns.md`. Luin myös
`js/packs/oceania-questions.js`-kohdan `portvila` (viisi kysymystä:
maa/Vanuatu, tulirengas ja Yasur, Efaten sijainti, yli sata kieltä ja
bislama, Pentecosten maahyppy) sekä `OCEANIA_FACTS.portvila`-rivin
— ks. osio 8.

**Tehtävän erityispiirre:** En kirjoittanut lehtitekstejä enkä
ladannut kuvia — tämä on raaka-ainetta kirjoittajalle ja
riippumattomalle tarkistajalle.

## Sisältölinjaus (tehtävänanto + spec-mantereet.md + Raamattu)

- **Ni-vanuatulaiset ovat elävä nykykansa.** Kastom, sandroing,
  kulttuurikeskuksen kenttätyöntekijäverkosto ja Roi Matan perintö
  kerrotaan nykypäivän toimijoiden työnä, ei "kadonneen kansan"
  romantiikkana (pilari 1, spec-mantereet.md kohta 1).
- **Blackbirding kerrotaan suoraan mutta ilman julmuuksien
  yksityiskohtia.**
- **Siirtomaahistoria (kondominio) tapahtumina, ei sankarikehyksenä
  kummallekaan suunnalle** (spec-mantereet.md kohta 2). Se, että
  ni-vanuatulaisilta oli suljettu kummankin vallan kansalaisuus,
  kerrotaan suoraan.
- **EI NYKYPOLITIIKKAA.** Nykyiset puolueet, pormestarit,
  ministerit ja veroparatiisikeskustelu jätetään pois.
- **Syklonit ja maanjäristykset ovat luonnonmaantiedettä** ja
  kerrotaan neutraalisti (spec-mantereet.md: ilmastonmuutos ja
  merenpinta neutraalisti kuten arktisilla). Sykloni Pamin tuho
  kerrotaan tapahtumana ja jälleenrakennus näkyy kuvissa
  (Raamatun linjaus 20.8.2026 tuhoutuneen kaupungin nykykuvista).
- **1873-KEHYS — TÄSMENNYS TEHTÄVÄNANTOON.** Tehtävänanto sanoi:
  "Port Vila oli pieni ranskalais-brittiläinen kauppa-asema
  (Franceville)". **Tämä ei pidä paikkaansa vuoden 1873 osalta.**
  Franceville perustettiin vasta **1889** ja se hajosi **1890**;
  Uudet Hebridit julistettiin puolueettomaksi alueeksi vasta 1878 ja
  yhteishallinto alkoi 1887/1906. Vuonna 1873 Efatella oli kyliä,
  loppuun hakattu santelipuukauppa, valaanpyytäjiä, presbyteerisiä
  lähetyssaarnaajia ja työvoimaa hakevia aluksia — mutta EI kuntaa,
  EI hallintoa eikä ranskalais-brittiläistä kauppa-asemaa.
  Ensimmäinen kookosviljelmä istutettiin Efatelle 1877 ja ensimmäinen
  ranskalainen istuttaja Ferdinand Chevillard saapui 1880.
  **Saapumisteksti ja lehti kertovat tämän rehellisesti näin.**

---

## 1. Sivuehdotukset

Kaksi sivua kuten Dunedinissa ja Cairnsissa.

### Sivu A — id `kaupunki`, nimi "Port Vila"

**Johdanto (n. 200 merkkiä), ehdotus:**

> Port Vila on rakennettu suojaisan luonnonsataman ympärille Efaten
> länsirannikolle. Kaupungilla on ollut kaksi hallintoa, kaksi lakia
> ja kaksi tuomioistuinta yhtä aikaa — ja yhden kesän oma tasavalta.

### Sivu B — teemasivu, ehdotettu id `historia`, nimi "Kolmetuhatta vuotta ja kaksi lippua"

**Perustelu:** Efaten aineisto on poikkeuksellisen syvä juuri
historiassa: Teouman lapita-hautausmaa (1200-luku eaa.), Roi Matan
päällikködynastia (1000–1600-luku), Cookin nimet 1774 ja
kulttuurikeskuksen työ kastomin tallentajana. Vakioaihe `historia`
kantaa nämä, ja ne täydentävät kansisivun siirtomaa-aikaa sen sijaan
että toistaisivat sitä.

**Johdanto (n. 200 merkkiä), ehdotus:**

> Efatella on asuttu kolmetuhatta vuotta, ja saaren omat tarinat
> osoittivat arkeologille haudan, jota kukaan ei ollut löytänyt.
> Nimet, jotka kartoilla lukevat, ovat sitä nuorempaa kerrostumaa.

---

## 2. Kahdeksan nostoehdotusta (4 × 2 sivua)

### Sivu `kaupunki` — 4 nostoa

**Nosto K1 — "Vuonna 1873 kuntaa ei ollut"**

- Efate kartoitettiin **1774**, kun James Cook nimesi sen Sandwich
  Islandiksi suojelijansa Sandwichin jaarlin mukaan. Retkikunta ei
  noussut maihin mutta pani merkille hyvät satamat ja
  eurooppalaiseen asutukseen sopivan maan. ("Port Vila", History;
  "Efate", History.)
- **Santelipuu:** puita löytyi Efatelta, Espiritu Santolta ja
  Aneityumilta, mikä synnytti nousu- ja laskukausien sarjan.
  **Varannot olivat käytännössä loppuun hakatut 1860-luvun
  puoliväliin mennessä ja kauppa loppui suurelta osin.**
  ("Vanuatu", Arrival of Europeans.)
- **Valaanpyyntialukset** olivat saariryhmän ensimmäisiä
  säännöllisiä vierailijoita: ensimmäinen kirjattu käynti oli
  *Rose* helmikuussa 1804, viimeinen tunnettu New Bedfordin laiva
  *John and Winthrop* 1887. (Sama.)
- **Lähetyssaarnaajia vuodesta 1839**, sekä katolisia että
  protestantteja. Aluksi vastassa oli vihamielisyyttä; Lontoon
  lähetysseuran John Williams ja James Harris surmattiin
  Erromangolla 1839. Presbyteerit menestyivät erityisesti
  Aneityumilla. Ni-vanuatulaiset yhdistivät kristinuskon
  perinteisiin **kastom**-uskomuksiin, mikä hämmensi eurooppalaisia.
  (Sama.)
- **Blackbirding:** 1860-luvulla Australian, Fidžin,
  Uuden-Kaledonian ja Samoan istuttajat tarvitsivat työvoimaa ja
  kannustivat pitkäaikaista sopimustyökauppaa. Uusi-Kaledonia otti
  1865–1930-luvulla noin 15 000 työntekijää, valtaosan Uusilta
  Hebrideiltä; vuoden 1873 kaivosbuumi lisäsi kysyntää voimakkaasti
  ja pelkästään 1874 värvättiin 900 saarelaista.
  ("Blackbirding", New Caledonia.) Australia kielsi uudet
  värväykset 1906, Fidži 1910 ja Samoa 1913. ("Vanuatu".)
- **Puuvillasta kookokseen:** ensimmäinen eurooppalainen
  puuvillanviljelijä oli Henry Ross Lewin Tannalla 1865 (hylkäsi
  tilan myöhemmin). Kun puuvillan maailmanmarkkinahinta romahti
  Yhdysvaltain sisällissodan jälkeen, siirryttiin kahviin, kaakaoon,
  banaaniin ja menestyksekkäimmin kookokseen. **Ensimmäinen
  kookosviljelmä istutettiin Efatelle 1877.** ("Vanuatu", Arrival of
  Europeans; "Efate", History.)
- **Ranskalaiset istuttajat alkoivat saapua Ferdinand Chevillardista
  Efatelle 1880**; John Higginsonin perustama CCNH 1882 käänsi
  väestösuhteen ranskalaisten eduksi, ja 1906 ranskalaisia
  uudisasukkaita oli 401 ja brittejä 228. ("Vanuatu".)
- **1873 ei ollut siis mitään hallintoa:** Britannia ja Ranska
  julistivat koko Uudet Hebridit puolueettomaksi alueeksi vasta
  **1878**. ("Franceville, New Hebrides", Background.)

**Nosto K2 — "Kunta, joka julistautui tasavallaksi"**

- Hallinnon puute synnytti tyytymättömyyttä uudisasukkaiden
  keskuudessa. Ranskalaisia haittasi erityisesti se, että Ranskan
  laki tunnusti avioliiton vain siviiliviranomaisen edessä
  solmittuna — lähin sellainen oli Uudessa-Kaledoniassa — kun
  brittilaki tunnusti paikallisen papin vihkimät avioliitot.
  ("Franceville, New Hebrides", Background.)
- **9. elokuuta 1889 Franceville julistautui itsenäiseksi
  kunnaksi.** Johtajaksi valittiin pormestari-presidentti
  **Ferdinand-Albert Chevillard**. Väkiluku 1889: **540**.
  Varajäsen (deputy) oli kreivi Maurice de Nolhac; toinen johtaja
  1890 oli R. D. Polk. ("Franceville, New Hebrides", infobox ja
  History.)
- **Yhteisöstä tuli yksi ensimmäisistä tunnetun historian
  itsehallinnollisista yksiköistä, joka toteutti yleisen ja
  yhtäläisen äänioikeuden sukupuoleen ja rotuun katsomatta.**
  (Sama.) → Tämä on koko lehden vahvin yksittäinen fakta.
- Uusi hallinto tukahdutettiin pian, ja kesäkuuhun 1890 mennessä
  Francevillen kunta oli raporttien mukaan "käytännössä hajonnut".
  (Sama.)
- **Vuoden 1905 kartassa Franceville näkyi yhä Port Vilan
  vaihtoehtoisena nimenä.** ("Franceville, New Hebrides",
  infobox image_map_caption: *Neue Hebriden 140543a.jpg*, "1905 map
  of New Hebrides, still showing Franceville as alternative name for
  Port Vila".)
- Chevillard oli alun perin ostanut ja raivannut maata Port Vilan
  ympäriltä saaren suurinta ranskalaista viljelmää varten; siitä
  tulikin kunta. ("Port Vila", History — HUOM. tässä on
  lähdemerkintäpuute, ks. osio 7 huomio 1.)
- **1906** merikomissio korvattiin jäsennellymmällä
  brittiläis-ranskalaisella kondominiolla. ("Franceville, New
  Hebrides"; "Efate".)

**Nosto K3 — "Kaksi hallintoa yhdessä kaupungissa"**

- Vuoden **1887** jälkeen aluetta hallitsivat Ranska ja Britannia
  yhdessä; järjestely virallistettiin **1906** brittiläis-
  ranskalaiseksi **kondominioksi**. ("Port Vila", History.)
- Kondominio oli ainutlaatuinen hallintomuoto: **kaksi erillistä
  hallinto-, laki-, tuomioistuin- ja finanssijärjestelmää**, jotka
  kohtasivat vain yhteisessä tuomioistuimessa (Joint Court).
  ("Vanuatu", Early period.)
- **Ni-vanuatulaisilta oli suljettu kummankin vallan kansalaisuus,
  ja he olivat virallisesti kansalaisuudettomia.** Alirahoitettu
  kondominiohallinto osoittautui toimimattomaksi, koska hallintojen
  päällekkäisyys teki hallitsemisesta vaikeaa ja hidasta. Koulutus,
  terveydenhuolto ja muut palvelut jäivät lähetysseurojen käsiin.
  (Sama.)
- Anglo-French Protocol **1914** laajensi kondominion valtuuksia
  pahimpien väärinkäytösten hillitsemiseksi; se ratifioitiin
  muodollisesti vasta **1922**. (Sama.)
- **1920–1930-luvuilla viljelmille tuli sopimustyöläisiä
  Vietnamista** (silloista Ranskan Indokiinaa). (Sama.)
- Port Vilan **postitalo** merkitsi aikoinaan epävirallista rajaa
  kaupungin kahden sektorin välillä: **British Paddock etelässä ja
  Quartier français pohjoisessa**. ("Port Vila", Highlights of the
  city, kuvateksti.)
- **Toisen maailmansodan aikana Port Vila oli amerikkalaisten ja
  australialaisten lentotukikohta.** ("Port Vila", History.)
  Efate palveli sodan aikana tärkeänä Yhdysvaltain sotilastukikohtana.
  ("Efate", History.)
- Vanuatu itsenäistyi **1980**. ("Vanuatu".)

**Nosto K4 — "Kieli, joka on nimetty merimakkaran mukaan"**

- **Bislama** on englantipohjainen kreolikieli ja Vanuatun
  kansalliskieli sekä yksi kolmesta virallisesta kielestä
  (muut englanti ja ranska). Se on monien "kaupunkilais-
  ni-vanuatulaisten" eli Port Vilan ja Luganvillen asukkaiden
  äidinkieli ja suuren osan muusta maasta toinen kieli.
  ("Bislama".)
- **Yli 95 prosenttia bislaman sanoista on englannista**; loput ovat
  muutamia kymmeniä ranskan sanoja sekä Vanuatun omista kielistä
  perittyä sanastoa, joka rajoittuu käytännössä kasvi- ja
  eläinnimistöön. (Sama.)
- **Nimi tulee 1800-luvun alun sanasta *Beach-la-Mar***, joka tulee
  pseudoranskan sanasta *bêche de mer* eli merimakkara
  (portugalin *bicho do mar*, "meren eläin"). 1840-luvun alussa
  merimakkaroita kerättiin ja kuivattiin samaan aikaan kuin
  santelipuuta hakattiin, ja nimet *biche-la-mar* ja
  *Sandalwood English* alkoivat tarkoittaa työntekijöiden ja
  englanninkielisten työnjohtajien välistä pidginiä. (Sama.)
- Kansallislaulun **"Yumi, Yumi, Yumi"** sanat ovat bislamaksi.
  (Sama.)
- Vanuatu on maailman kielitihein maa: erään laskun mukaan **113
  kieltä 225 000 asukkaalle**. ("Bislama", History.) Port Vila
  -artikkeli puhuu **138 alkuperäiskielestä** ("Port Vila",
  Languages) — ks. osio 7 huomio 3.
- **Vuoden 2020 väestönlaskennassa** Port Vilan asukkaista
  **90,0 prosenttia oli lukutaitoisia englanniksi ja 47,0
  prosenttia ranskaksi**; **79,1 prosenttia osasi lukea ja 76,9
  prosenttia kirjoittaa jotakin alkuperäiskieltä**. ("Port Vila",
  Languages.)
- Väkiluku 2020: **49 034**. Pinta-ala 23,6 km². ("Port Vila",
  infobox.)

### Teemasivu `historia` — 4 nostoa

**Nosto H1 — "Hautausmaa, joka löytyi vuonna 2004"**

- Melanesialaiset ovat asuneet Port Vilan seudulla tuhansia vuosia.
  **Syksyllä 2004 arkeologinen retkikunta löysi Teoumasta
  hautausmaan: 25 hautaa, joissa oli kolmisenkymmentä lapita-
  kulttuurin edustajan luurankoa.** Löytöpaikan keramiikka on
  ajoitettu **1200-luvulle eaa.** ("Port Vila", History.)
- Vanuatun saaret asutettiin arkeologisen aineiston mukaan noin
  3 000 vuotta sitten, karkeasti 1100–700 eaa., ja tulijat olivat
  lähes varmasti **lapita-kulttuurin** ihmisiä. Teouman
  hautausmaassa on 94 yksilön jäänteet. ("Vanuatu", Prehistory.)
  → HUOM. lukuero 2004 löytöuutisen ja koko hautausmaan välillä,
  ks. osio 7 huomio 4.
- Lapita toi mukanaan jamssin, taaron ja banaanin sekä kesytetyt
  siat ja kanat. Tulo osui yhteen useiden lajien häviämisen kanssa
  (maakrokotiili *Mekosuchus kalpokasi*, maakilpikonna *Meiolania
  damelipi*, lentokyvyttömiä lintuja). (Sama.)
- Vanuatun kaikki yli sata alkuperäiskieltä kuuluvat austronesialaisen
  kielikunnan oseaanisen haaraan. Kielitiheyden syitä ovat
  jatkuvat muuttoaallot, lukuisat hajautuneet ja omavaraiset
  yhteisöt sekä vaikea maasto. (Sama.)

**Nosto H2 — "Roi Matan valtakunta"**

- **Roi Mata** oli päällikkyyden arvonimi Vanuatun keskisaarilla, ja
  sitä kantoi pitkä päällikködynastia **1000-luvulta 1600-luvulle**.
  Tunnetuin on viimeinen, jonka uskotaan eläneen noin vuonna
  **1600**. ("Roi Mata".)
- Hänen hallintokautensa maine on rauhanomainen. Hänet myrkytettiin
  kuoliaaksi; myrkyttäjä oli hänen veljensä. Ruumista ei haudattu
  kotiseudulle eikä nimeä käytetty myöhemmissä sukupolvissa, koska
  ihmiset pelkäsivät hänen henkeään. (Sama.)
- **Ranskalainen arkeologi José Garanger löysi haudan Eretokan
  saarelta 1967 analysoimalla paikallista suullista perinnettä.**
  Haudassa oli yli 25 hänen seurueensa jäsentä. (Sama.) → Tämä on
  pilarin 1 mukainen nosto: paikallinen tieto osoitti tutkijalle
  paikan, ei päinvastoin.
- **Kolme Roi Mataan liittyvää kohdetta Efatella, Lelepassa ja
  Eretokalla merkittiin UNESCOn maailmanperintöluetteloon 2008**
  nimellä *Chief Roi Mata's Domain*: hänen asuinpaikkansa,
  kuolinpaikkansa ja joukkohautansa. Alue on 886,31 hehtaaria ja
  suojavyöhyke 1 275,42 hehtaaria; kriteerit (iii)(v)(vi). (Sama.)
- Eretokan saari näyttää kaukaa lerpalta hatulta, ja siksi sitä
  kutsutaan Hat Islandiksi. Roi Mata haudattiin sinne. ("Efate",
  Small islands off Efate.)

**Nosto H3 — "Nimet, jotka kartat toivat"**

- Ensimmäinen eurooppalainen kosketus oli **huhtikuussa 1606**,
  kun portugalilainen **Pedro Fernandes de Queirós** purjehti
  Espanjan kruunun palveluksessa Callaosta. Espanjalaiset
  perustivat Espiritu Santon pohjoisrannalle Big Baylle
  asutuksen nimeltä **Nueva Jerusalén**, mutta se jäi lyhytikäiseksi
  ja hylättiin kuukauden jälkeen. ("Vanuatu", Arrival of Europeans.)
- **1768** ranskalainen **Louis Antoine de Bougainville** purjehti
  saarten ohi 22. toukokuuta ja nimesi ne Suuriksi Kykladeiksi;
  hänen antamistaan nimistä on säilynyt vain **Pentecost**.
  (Sama.)
- **Heinä–syyskuussa 1774** brittiläinen **James Cook** tutki saaret
  laajasti ja nimesi ne **Uusiksi Hebrideiksi** Skotlannin
  länsipuolisten Hebridien mukaan. Nimi säilyi itsenäistymiseen
  1980 asti. Cook piti suhteet ni-vanuatulaisiin yleisesti
  sydämellisinä antamalla lahjoja ja pidättymällä väkivallasta.
  (Sama.)
- **Paikan omat nimet ovat vanhempia:** alueen nimi on *Efil*
  eteläefaten kielellä ja *Ifira* naapurikielellä mele-fila.
  **Vila on muunnos näistä nimistä.** Ifira on pieni saari Vilan
  satamassa, jossa asuu monia perinteisiä maanomistajia.
  ("Port Vila", Name.) Ifiran väkiluku oli 2015 virallisesti 721
  henkeä 146 taloudessa, ja siellä puhutaan polynesialaista
  mele-ifiran kieltä. ("Ifira".)
- Vanuatun oma nimi otettiin käyttöön itsenäistyessä 1980.

**Nosto H4 — "Talo, jossa osa esineistä on tabu"**

- **Vanuatun kulttuurikeskus** (bislamaksi *Vanuatu Kaljoral
  Senta*) on maan kansallinen kulttuurilaitos Port Vilassa. Se on
  kattojärjestö, johon kuuluvat kansallismuseo, kansallinen
  elokuva- ja ääniyksikkö, kulttuuri- ja historiakohteiden
  kartoitus, kansallisarkisto, kansalliskirjasto, yleinen kirjasto,
  kenttätyöntekijäyksikkö sekä Tafean (Lenakel, Tanna) ja Malekulan
  kulttuurikeskukset. ("Vanuatu Cultural Centre".)
- Keskus sijaitsee **Saralana Parkissa parlamentin edessä**, lähellä
  kansalliskirjastoa ja **Malvatumauria** eli Vanuatun päälliköiden
  kansallisneuvostoa. ("Port Vila", Vanuatu Cultural Centre.)
- **Suullisen perinteen keruuprojekti alkoi 1976**, ja sitä on
  kuvattu "epäilemättä Tyynenmeren menestyksekkäimmäksi
  ruohonjuuritason kulttuuridokumentointiohjelmaksi".
  ("Vanuatu Cultural Centre".) Projekti koulutti ni-vanuatulaisia
  miehiä tallentamaan suullista perinnettä; **1990 ohjelma
  laajennettiin naisten perinteeseen Jean Tarissein johdolla**, ja
  1994 siitä oli kehittynyt kulttuurikeskuksen naiskenttätyöntekijöiden
  verkosto. ("National Museum of Vanuatu".)
- **Vuoteen 1996 mennessä kokoelmassa oli** noin 2 500 tuntia
  äänitallennetta, 2 300 tuntia videota, 23 tuntia 16 mm:n filmiä,
  30 tuntia 8 mm:n filmiä, 3 000 varhaista (1950-luvulle asti)
  mustavalkovalokuvaa ja noin 4 000 värikuvaa, -negatiivia ja
  -diaa. **Osa aineistosta on tabu: joihinkin pääsevät vain miehet,
  joihinkin vain naiset ja joihinkin vain tiettyjen
  kulttuuriryhmien jäsenet.** ("Vanuatu Cultural Centre".)
- Museossa on **Tabu Room** -niminen arkistotila, johon omistajat
  voivat tallettaa kastom-esineitä säilytettäväksi ja jonne pääsyä
  säädellään kastom-perinteen mukaan. **1989 johto siirtyi
  ulkomaiselta antropologilta Kirk Huffmanilta ni-vanuatulaiselle
  Jack Keitadille.** Museossa toimii **Kastom-koulu**, jossa
  perinteisiä taitoja ja tarinoita siirretään nuorille.
  ("National Museum of Vanuatu".)
- **Nykyinen rakennus avattiin 17.11.1995 kello 9.30**, ja avajaisia
  edelsi neljä päivää rituaalia ja kulttuuritoimintaa.
  Avajaisiin kuului lahjojen antaminen ja rakennuksen
  **kastom-vihkiminen**. Päivästä 17. marraskuuta tehtiin
  **kansallinen kulttuuripäivä**. (Sama.)
- **Sandroing eli hiekkapiirros** on UNESCOn tunnustama suullisen ja
  aineettoman perinnön mestariteos. Se on "yhtäjaksoinen
  kiemurteleva viiva kuvitellulla ruudukolla", jolla syntyy usein
  symmetrinen geometrinen sommitelma; työkaluna on **yksi sormi** ja
  alustana hiekka, vulkaaninen tuhka tai savi. Perinne toimii
  viestintänä noin **80 eri kielikunnan** välillä Vanuatun keski- ja
  pohjoissaarilla ja muistivälineenä rituaaleille, myyteille,
  paikallishistorialle, sukulaisuusjärjestelmille, laulusarjoille,
  viljelytekniikoille sekä rakennus-, käsityö- ja tanssikuvioille.
  ("Sand drawing".) Kulttuurikeskus käynnisti kansallisen
  suojeluohjelman ja **kansallisen hiekkapiirrosfestivaalin vuonna
  2004**. Pentecostin **turaga**-liike kirjoittaa **avoiuli**-
  aakkosilla, jotka on johdettu hiekkapiirrosten kuvioista. (Sama.)

---

## 3. Viisi jaksoehdotusta matkaoppaaseen

**Jakso 1 — "Perille ja liikkeelle"**
- **Bauerfield International (VLI)** on kaupungissa. Air Vanuatun
  pääkonttori on Vanuatu Housessa Port Vilassa. ("Port Vila",
  Economy and transport.)
- Port Vila on Vanuatun tärkein satama ja maan kaupan keskus.
  **35,7 prosenttia viennistä lähtee Port Vilasta ja 86,9
  prosenttia tuonnista saapuu sinne.** (Sama — huomaa lähteen oma
  "citation needed" -merkintä, ks. osio 7 huomio 5.)
- Saarten välinen liikenne: Air Vanuatu lentää ulkosaarille, ja
  suositut kohteet **Tanna ja Santo** on saavutettavissa päivittäin
  Port Vilasta; syrjäisemmät kohteet harvemmin. ("Efate", Economy
  and tourism.)
- Turismi kasvaa erityisesti Australiasta ja Uudesta-Seelannista;
  **yli 80 000 kävijää 1997**. ("Port Vila", Economy and transport.)

**Jakso 2 — "Satama, saari ja kaksi kaupunginosaa"**
- Port Vila on Efaten länsirannikolla (artikkelin johdanto sanoo
  myös "lounaisrannikolla", ks. osio 7 huomio 6), Shefan
  provinssissa. Korkeus 59 m.
- **Iririki** on pieni saari Vilan satamassa kahden minuutin
  venematkan päässä keskustasta. Historiallisesti se oli
  **Britannian ylikomissaarin residenssi**: **1910 saarelle
  perustettiin Uusien Hebridien ensimmäinen brittiläinen sairaala**
  presbyteerilähetyssaarnaaja **John G. Patonin muistoksi**, ja
  **1913 saarella toimi brittiresidenssi**, joka vuokrasi saaren
  lähetysseuralta 99 vuodeksi. Residenssi oli Iririkin laella,
  jonne noustiin **179 porrasta**. Itsenäistyessä 1980 residenssi
  hylättiin, ja **1983 Ifiran saarelaiset vuokrasivat saaren**
  lomakeskukseksi. ("Iririki".) — HUOM. artikkeli on selvästi
  mainoshenkinen, ks. osio 7 huomio 7: käytä VAIN yllä olevia
  päivämäärätietoja, älä artikkelin arvottavia väitteitä.
- Nähtävää kaupungissa: parlamenttia vastapäätä on muistomerkkejä,
  mm. **kaksi perinteistä totemipaalua ja sian syöksyhammasta
  esittävä monumentti**; presbyteerikirkko on Independence Parkia
  vastapäätä; värikäs seinämaalaus on kauppahallia vastapäätä
  olevassa hallintorakennuksessa ja toinen postitalon julkisivussa;
  **kaupungintalo on pitkulainen rakennus keskustan kukkulalla**.
  ("Port Vila", Highlights of the city.)
- **Cathédrale du Sacré-Cœur** on moderni katolinen katedraali ja
  Port Vilan hiippakunnan istuin. ("Cathédrale du Sacré-Cœur, Port
  Vila".)
- Uskonto: kristinusko yli 90 prosentilla; suurin kirkkokunta on
  **Vanuatun presbyteerikirkko** (kolmasosa väestöstä), katolinen
  kirkko ja Melanesian kirkko kumpikin noin 15 prosenttia.
  ("Port Vila", Religion.)

**Jakso 3 — "Arjen ilmiö: kauppahalli"** (KUVA)
- Kauppahalli on rannan tuntumassa; sen edessä oleva
  hallintorakennus kantaa seinämaalausta. ("Port Vila", Highlights.)
- Pelin oma valokuvataulu kertoo jo hallin aukioloista ja siitä,
  että kaukaa tulevat myyjät nukkuvat kojunsa vieressä koko viikon
  — **tätä EI toisteta lehdessä** (osio 8).
- Vanuatun talous nojaa suurelta osin **omavaraisviljelyyn** ja
  turismiin; Port Vilan ulkopuolella useimmat elävät perinteistä
  elämää ja syövät *aelan kakae* -saariruokaa. ("Efate", Economy and
  tourism.)

**Jakso 4 — "Historian käännekohta: kastom talteen"** (voi olla kuvaton)
- Tiivistelmä nostosta H4 oppaan mitassa: kulttuurikeskus,
  kenttätyöntekijäverkosto, sandroing.
- Kulttuurikeskuksen työ liittyi itsenäisyysliikkeeseen: **Vanua'aku
  Pati perustettiin 1971**, ja puolue korosti kastomia keinona
  yhdistää ni-vanuatulaiset kondominiohallintoa vastaan, jolloin
  kastomin merkityksestä tuli osa kansallista keskustelua.
  ("National Museum of Vanuatu".) → Tämä on historiaa, ei
  nykypolitiikkaa; kirjoita neutraalisti.
- **Lengnangulong-pyhä kivi** Pohjois-Ambrymin Magamin kylästä on
  Louvressa; alkuperäiset omistajat ovat vuodesta 1997 pyytäneet
  joko palautusta tai muodollista tunnustusta omistuksesta.
  Jean Guiart maksoi kivestä 1949 pienen summan mutta ei
  kastom-omistajille, joten ni-vanuatulaisen kulttuurin mukaan teko
  vastaa varkautta. Kopio on esillä kansallismuseossa.
  ("National Museum of Vanuatu".) → Kerrotaan tapahtumana, ilman
  syytöksiä nykytoimijoita kohtaan.
- **Yliopisto:** Port Vilassa on yksi Etelä-Tyynenmeren yliopiston
  kampuksista; se on yliopiston ainoa oikeustieteellinen tiedekunta
  ja opettaa kieliä. Yliopisto on kahdentoista Tyynenmeren maan
  yhteisomistuksessa. ("Port Vila", Education.) — HUOM. Suvan lehti
  kertoo jo USP:n omistuspohjasta; älä toista sitä samoin sanoin.

**Jakso 5 — "Milloin kannattaa tulla"** (KUVA)
- Ilmasto on trooppinen sademetsäilmasto, jossa on **selvästi
  sateisempia ja kuivempia kuukausia**. Koska pasaatituulet ovat
  lähes pysyviä ja syklonit eivät ole harvinaisia, ilmastoa ei
  luokitella ekvatoriaaliseksi vaan meritrooppiseksi
  pasaatituulityypiksi. ("Port Vila", Climate.)
- **Sadetta noin 2 338,9 mm vuodessa**; sateisin kuukausi
  **maaliskuu**, kuivin **syyskuu**; **153 sadepäivää** vuodessa.
  Lämpötilat vaihtelevat vähän: ennätyskorkein 35,6 °C ja
  ennätysmatalin 8,5 °C. Viilein kuukausi heinäkuu, kuumin
  helmikuu. Ilmankosteus on usein korkea. (Sama; sääruudun luvut
  osiossa 6.)
- **Syklonit:** 1987 **Cyclone Uma** vaurioitti kaupunkia pahoin.
  **13.3.2015 luokan 5 sykloni Pam** aiheutti kaupungille valtavat
  vahingot; myrskyn silmänseinämä kulki juuri Port Vilan itäpuolelta.
  ("Port Vila", History.) Pamin jälkeen Port Vilassa oli toiminnassa
  enää yksi matkapuhelinmasto ja sähköverkko oli tuhoutunut.
  ("Cyclone Pam", Impact.)

**Matkailijalle-kainalo (parasta / hyvä tietää)**
- Parasta: Vanuatun kulttuurikeskus ja kansallismuseo; kauppahalli;
  Vilan satama ja Iririki; Independence Park ja presbyteerikirkko;
  Sacré-Cœurin katedraali.
- Hyvä tietää: syklonikausi; bislama kannattaa opetella tervehdyksinä;
  osa museon aineistosta on tabu eikä kaikkea näytetä (ja se on
  tarkoituksellista); saariliikenne kulkee lentäen ja lautoilla.

---

## 4. Kohdekartan kohteet + vertailupiste

**Vertailupiste:** Vilan sataman itäranta keskustassa. Wikipedian
Port Vila -piste on 17°44′S 168°19′E (−17,7333, 168,3167), joka osuu
keskustaan; spec-mantereet.md:n kohta 4 ei vaadi siirtoa.

**Koordinaatit en-Wikipedian geosearch-rajapinnasta 6.9.2026.**

| # | Kohde | lat | lon |
| --- | --- | --- | --- |
| 1 | National University of Vanuatu | −17.728000 | 168.315000 |
| 2 | Cathédrale du Sacré-Cœur | −17.734722 | 168.315278 |
| 3 | Independence Park | −17.740000 | 168.317000 |
| 4 | Vanuatu Cultural Centre (kansallismuseo) | −17.745200 | 168.317500 |
| 5 | Parliament of Vanuatu | −17.745556 | 168.315556 |

**Mitatut välit:** yliopisto–katedraali 748 m, katedraali–
Independence Park 615 m, Independence Park–kulttuurikeskus 581 m,
kulttuurikeskus–parlamentti **210 m**. Viimeinen on 200 metrin
säännön rajalla mutta sen yli; kohteet ovat saman puiston (Saralana
Park) kahdella laidalla ja ne ovat eri juttujen aiheita.

**HYLÄTYT kohteet ja syyt:**
- **Franceville, New Hebrides** (−17.7375, 168.313889): kunta oli
  nykyinen Port Vila, ja koordinaatti on artikkelin yleinen
  `type:country`-piste eikä käyntikohde. Aihe on lehden noston K2
  aihe. Pois kartalta.
- **Port Vila Central Hospital** (−17.74227, 168.321099): sairaala
  ei ole nähtävyys.
- **Diocese of Port-Vila** (−17.734722, 168.321944): hiippakunta on
  hallinnollinen yksikkö, ei kohde.
- **Vanuatu National Library** ja **National Museum of Vanuatu**:
  molemmat jakavat kulttuurikeskuksen koordinaatin; kartalla vain
  kulttuurikeskus.
- **Iririki** (−17.766667, 168.283333) ja **Ifira** (−17.75,
  168.283333): en-Wikipedian koordinaatit ovat karkeita ja
  osoittavat Mele Bayn suuntaan, kun saaret ovat Vilan satamassa
  aivan keskustan edessä. Koordinaatteihin EI luoteta (ks. osio 7
  huomio 8). Ne mainitaan oppaassa, eivät kartalla.
- **Bauerfield International Airport** (−17.699167, 168.319722):
  3,8 km pohjoiseen, kartan ulkopuolella.
- **Korman Stadium, Freshwater Stadium, Vanuatu Cricket Ground,
  Malapoa College**: urheilupaikkoja ja koulu, joilla ei ole omaa
  juttukelpoista sisältöä en-Wikipediassa.

**Rajausehdotus** (tools/piirra-kaupunkikartta.mjs):
`{ pohjoinen: -17.7240, etela: -17.7500, lansi: 168.3050, ita: 168.3300 }`
eli noin 2,9 × 2,7 km. `meri: true` (Vilan satama ja Mele Bay ovat
OSM:ssä rantaviivaa).

---

## 5. Kuva-aiheet (Commons-kategoriat)

Kategoriat tarkistettu Commonsin rajapinnasta 6.9.2026.
**Port Vilan kuvapooli on Honiaran pooliin verrattuna vahva.**

| Kategoria | tiedostoja | ≥1200 px | mihin |
| --- | --- | --- | --- |
| Category:Port Vila | 288 | 209 | yleiskuvat |
| Category:Vila Bay | 234 | 129 | kansikuvat, satama |
| Category:Buildings in Port Vila | 170 | 93 | kirkot, kaupungintalo, PD 1897–99 |
| Category:Culture of Port Vila | 81 | 76 | käsityötori, tanssijat |
| Category:Nature of Port Vila | 79 | 34 | puut, lintu |
| Category:Port Vila Market | 56 | 34 | kauppahalli |
| Category:Parks in Port Vila | 51 | 33 | Independence Park |
| Category:Port Vila harbour | 49 | 38 | satama, PD-laituri 1897 |
| Category:Iririki | 32 | 19 | saari |
| Category:Vanuatu Parliament | 13 | 5 | parlamentti |
| Category:Cathédrale du Sacré-Cœur de Port-Vila | 4 | 2 | katedraali |
| Category:Vanuatu Cultural Centre | 0 | 0 | TYHJÄ |

**ENNEN–NYT-PARI: Port Vilalla ON isoisän aikaa lähellä oleva
PD-aineisto.** Category:Buildings in Port Vila ja Category:Port Vila
harbour sisältävät **W. A. Lucasin noin 1897–1899 otetut
PD-valokuvat** Australasian New Hebrides Companyn kaupasta ja
laiturista sekä Burns Philpin kaupasta (3 638–3 710 px leveitä).
Nämä ovat 24–26 vuotta isoisän matkan jälkeen ja ovat kaupungin
varhaisimmat tunnetut valokuvat Commonsissa. Suositus:
ennen = ANHC:n laituri tai kauppa (n. 1897), nyt = sataman tai
rantakadun nykykuva.

**Etusivukuvan (matkailijalle) kaava:** Port Vilan oma erikoisuus on
suojaisa luonnonsatama Iririkin saarineen. Pystykuvaa etsittävä
Category:Iririki- ja Category:Vila Bay -kategorioista.

**HUOM. kuvatyössä:** Category:Culture of Port Vila on täynnä
yhden tapahtuman (USP Open Day 2012) sarjakuvia tunnistettavista
opiskelijoista ja tanssijoista — **kasvot ovat luettavissa, joten ne
on hylättävä** kuvasäännön mukaan. Sama koskee AusAID-sarjojen
lähikuvia. Käyttökelpoisia ovat maisemat, rakennukset ja etäältä
otetut torikuvat.

---

## 6. Säätiedot

**Open-Meteon arkisto vastasi 6.9.2026 pyyntöön
`{"reason":"Daily API request limit exceeded"}` (HTTP 429).**
Säärivi (`js/packs/saatiedot.js`) JÄTETÄÄN SIKSI POIS
Samarkand-mallin (v965) mukaisesti; oppaan sääjakso kirjoitetaan
en-Wikipedian sääruudun varaan ja se sanotaan ääneen.

**Sääruutu: Port Vila, Vanuatu (Bauerfield International Airport),
lähde Deutscher Wetterdienst.**

Keskilämpötila (°C): tammi 26,4 · helmi 26,5 · maalis 26,3 ·
huhti 25,3 · touko 24,1 · kesä 23,0 · heinä 22,1 · elo 22,0 ·
syys 22,7 · loka 23,4 · marras 24,6 · joulu 25,7 · **vuosi 24,3**

Ylin päivälämpö (°C): tammi 31,3 · helmi 31,2 · maalis 30,8 ·
huhti 29,9 · touko 28,8 · kesä 27,4 · heinä 26,4 · elo 27,0 ·
syys 27,7 · loka 28,5 · marras 29,2 · joulu 30,7 · **vuosi 29,1**

Alin päivälämpö (°C): tammi 22,5 · helmi 23,0 · maalis 22,6 ·
huhti 22,0 · touko 20,2 · kesä 19,8 · heinä 18,2 · elo 18,0 ·
syys 18,4 · loka 19,6 · marras 20,7 · joulu 21,7 · **vuosi 20,5**

Sade (mm): tammi 316,1 · helmi 273,7 · maalis 320,9 · huhti 255,2 ·
touko 210,3 · kesä 180,0 · heinä 94,4 · elo 87,4 · syys 87,3 ·
loka 134,1 · marras 192,3 · joulu 187,2 · **vuosi 2 338,9**
(summa tarkistettu laskemalla: 2 338,9 — täsmää artikkelin
leipätekstiin.)

Sadepäivät (≥1,0 mm): tammi 15,4 · helmi 16,6 · maalis 18,5 ·
huhti 17,1 · touko 12,9 · kesä 11,3 · heinä 10,3 · elo 9,8 ·
syys 8,1 · loka 8,4 · marras 12,1 · joulu 13,2 · **yhteensä 153,7**
(artikkelin leipäteksti pyöristää 153:een.)

Ennätykset: korkein 35,6 °C (joulukuu), matalin 8,5 °C (heinäkuu).
Ilmankosteus 80–87 %, vuosikeskiarvo 84 %.

Koordinaatit mahdollista tulevaa säärivilä varten:
lat −17.7333, lon 168.3167.

---

## 7. Ristiriidat, epävarmuudet ja huomiot

1. **Francevillen synty on lähteessä merkitty epävarmaksi.**
   "Port Vila" -artikkelin virke Chevillardin maanostoista ja
   Francevillen synnystä päättyy merkintään
   `{{Citation needed|date=December 2024}}`. Erillinen artikkeli
   "Franceville, New Hebrides" antaa samat päivämäärät ilman
   merkintää. → Käytä Franceville-artikkelia päälähteenä ja jätä
   Chevillardin viljelmäaikeet pois tai kerro ne varauksella.
2. **Chevillardin saapumisvuosi Efatelle.** "Vanuatu" sanoo, että
   ranskalaiset istuttajat alkoivat saapua **Ferdinand
   Chevillardista Efatelle 1880**. "Port Vila" antaa ymmärtää, että
   Chevillard osti maata Port Vilan ympäriltä vasta 1890-luvulla
   ("by the 1890s, the economic balance had begun favouring the
   French"). → Käytä vuotta 1880 ("Vanuatu" on tarkempi ja
   lähteistetty) ja jätä 1890-luvun kehys pois.
3. **Kielten lukumäärä.** "Port Vila": 138 alkuperäiskieltä.
   "Bislama": erään laskun mukaan 113 kieltä 225 000 asukkaalle.
   "Vanuatu": "yli sata". → Käytä muotoa "yli sata kieltä" ja
   mainitse molemmat luvut vain, jos ero selitetään.
4. **Teouman luvut.** "Port Vila": 25 hautaa ja kolmisenkymmentä
   luurankoa, keramiikka 1200-luvulta eaa. "Vanuatu": Teouman
   hautausmaassa on 94 yksilön jäänteet. → Ei ristiriita vaan eri
   vaihe (vuoden 2004 löytö vs. koko kaivauksen tulos). Kirjoita
   auki, jos molempia käytetään.
5. **Vienti- ja tuontiosuudet** (35,7 % / 86,9 %) on merkitty
   lähteessä `{{citation needed|date=March 2014}}`. → ÄLÄ KÄYTÄ
   näitä lukuja lehdessä.
6. **Länsi- vai lounaisrannikko.** "Port Vila" -artikkelin johdanto
   sanoo "on the west coast of the island of Efate"; "Efate"
   -artikkeli sanoo "lies on the southwest coast". → Käytä muotoa
   "Efaten lounaisrannikolla" tai "läntisellä rannikolla" — älä
   väitä yhtä kahdesta ainoaksi.
7. **"Iririki"-artikkeli on mainoshenkinen.** Se sisältää lauseita
   kuten "the resort is Vanuatu's most famous and known throughout
   the world for also being the country's best" ja "Port Vila's
   best beach". Nämä eivät ole faktoja vaan markkinointia.
   → Käytä VAIN artikkelin historiaosion päivämäärätietoja
   (1910, 1913, 1980, 1983, 1987, 2015, 2016).
8. **Iririkin ja Ifiran koordinaatit ovat karkeita.**
   en-Wikipedian geosearch antoi Iririkille −17,766667/168,283333 ja
   Ifiralle −17,75/168,283333, mikä on 3–5 km keskustasta lounaaseen
   Mele Bayn suuntaan, vaikka molemmat saaret ovat Vilan satamassa
   aivan keskustan edessä ("Iririki": "2 minutes boat ride from the
   centre of Port Vila"). → EI KARTALLE.
9. **Kulttuurikeskuksen perustamisvuosi.** "National Museum of
   Vanuatu" sanoo, että kulttuurikeskus perustettiin **1959**.
   "Vanuatu Cultural Centre" -artikkelin luokitus on "Museums
   established in 1955" ja "1955 establishments in the New
   Hebrides", mutta artikkelin leipätekstissä ei ole vuotta.
   → Käytä vuotta 1959 (leipätekstin väite) tai jätä
   perustamisvuosi kokonaan pois. ÄLÄ käytä luokkatietoa lähteenä.
10. **Sääruudun ja leipätekstin ero.** Leipäteksti sanoo, että
    viilein kuukausi heinäkuu on keskiylin 27 °C ja keskialin
    18 °C; sääruutu antaa 26,4 ja 18,2. Sama koskee helmikuuta
    (31,2/23,0 sekä ruudussa että tekstissä). → Käytä sääruudun
    lukuja ja pyöristä itse.
11. **Cook nimesi Efaten Sandwich Islandiksi 1774**, mutta
    "Port Vila" sanoo "Efate Island was charted in 1774 by James
    Cook, who named it Sandwich Island" ja "Efate" sanoo saman
    tarkemmin (HMS Resolution, Sandwichin jaarli). Ei ristiriitaa.
12. **Franceville-lippu ja "tasavalta".** Infobox antaa
    government_type = Republic ja status = unrecognized state,
    mutta leipäteksti puhuu itsenäisestä kunnasta (commune).
    → Käytä sanaa **kunta** ja kerro, että se julistautui
    itsenäiseksi; älä sano "tasavalta" ilman varausta.

---

## 8. Päällekkäisyyksien välttäminen

**Laudan visa (`js/packs/oceania-questions.js`, avain `portvila`)
kysyy:** (1) minkä maan pääkaupunki Port Vila on, (2) miksi
Vanuatussa on tulivuoria ja järistyksiä (tulirengas), (3) missä
Port Vila sijaitsee, (4) kuinka monta kieltä Vanuatussa puhutaan
(yli sata), (5) mikä perinne on säilynyt Pentecostin saarella
(maahyppy).

→ **Minitehtävä EI SAA kysyä mitään näistä** eikä varsinkaan kielten
määrää, koska nosto K4 kertoo sen. Ehdotus minitehtäväksi:
Francevillen vuosi 1889, Roi Matan haudan löytövuosi 1967 tai
kansallisen kulttuuripäivän päivämäärä 17. marraskuuta. Vastaus on
löydyttävä SAMALTA sivulta.

**`OCEANIA_FACTS.portvila`** kertoo jo: yli 80 saarta ja aktiivisia
tulivuoria; yhteishallinto ennen itsenäistymistä 1980; Yasur;
isoisän maahyppymuisto. → Lehti saa kertoa yhteishallinnosta
paljon syvemmin (K3), mutta Yasuria ja maahyppyä EI nosteta
lehteen: ne ovat muiden saarten aiheita ja kuuluvat VUT:n
maalehteen.

**Saapumisteksti (`js/packs/oceania-saapumiset.js`, portvila) on jo
olemassa** ja kertoo torin hedelmistä, maanjäristyksistä ja
onnellisuuskyselyistä. → Lehden torinosto ja opas eivät toista
näitä samoin sanoin.

**Valokuvataulu (`js/packs/oceania-valokuvat.js`, portvila) käyttää
jo näitä tiedostoja:**
`Nouvelles Hebrides - Debarquement d' assassins à Port Vila - Campagne 'Kersaint'.jpg`,
`PortVilaMarketHall.jpg`,
`Port Vila vegetable market, Vanuatu 2007. Photo- Rob Maccoll - AusAID (10714150144).jpg`,
`Vanuatu Inter-island ferry, Port Vila, 2 June 2006 - Flickr - PhillipC.jpg`,
`Port Vila waterfront, Vanuatu, 2 June 2006 - Flickr - PhillipC.jpg`.
→ Lehti EI saa käyttää näitä samoja tiedostoja. Valokuvataulu
kertoo myös hallin aukioloista ja myyjien yöpymisestä — sitä ei
toisteta.

**Suvan lehti kertoo jo Etelä-Tyynenmeren yliopiston kahdentoista
maan omistuspohjasta** (kulttuuri-kategoriat.js, suva). Port Vilan
oppaassa USP mainitaan vain kampuksena ja oikeustieteellisenä
tiedekuntana.

**Nähtävyysjutut eivät saa toistaa lehden nostoja.** Lehden nostot
ovat: 1873 ja santelipuu, Franceville 1889, kondominio, bislama,
Teouma, Roi Mata, Cookin nimet, kulttuurikeskus ja sandroing.
→ Kartan viidestä kohteesta kulttuurikeskus on noston H4 aihe;
sen jutun on kerrottava ERI ASIA (rakennus, sijainti Saralana
Parkissa, mitä kokoelmissa on) — sama ratkaisu kuin Suvassa.
