# Nairobin faktapohjan tarkistus

Tarkistettu **6.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä
faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina.
Koordinaatit haettiin itse (`prop=coordinates&redirects=1`) ja
kaikki 28 kohdeparin etäisyyttä laskettiin itse haversinilla.

Luetut artikkelit: **Nairobi**, **History of Nairobi**, **Nairobi
National Park**, **Uganda Railway**, **Matatu**, **Kenyatta
International Convention Centre**, **Kenya National Archives**,
**Nairobi Gallery**, **National Museums of Kenya**, **Nairobi
Arboretum**, **Jeevanjee Gardens**, **Alibhai Mulla Jeevanjee**,
**Nairobi Railway Museum**, **University of Nairobi**, Parliament
Buildings (Kenya), Nairobi River.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Asiavirheitä ei löytynyt. Viisi kohtaa on
Wikipedian sisäisiä ristiriitoja, ja yksi (kohta G) on repossa jo
oleva anakronismi, joka ei kuulu tämän erän korjattavaksi mutta on
raportoitava.

---

## A. RISTIRIITA — kaupungin nimen maasai-muoto

**Lähde 1 ("Nairobi", johdanto), sanatarkasti:**
*"Its name originates from the Maasai phrase Enkare Nyirobi, meaning
"place of cool waters"."*

**Lähde 2 ("History of Nairobi", Uganda Railway), sanatarkasti:**
*"a town grew up surrounding it, named after a watering hole known in
Maasai as Ewaso Nyirobi, meaning 'cool waters'."*

**Ratkaisu:** kirjoittaja kertoo **merkityksen** ('viileät vedet')
ja käyttää päälähteen muotoa **Enkare Nyirobi**, koska se on
kaupungin oman artikkelin johdannossa. Toista muotoa ei mainita.
Ratkaisu kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — Nairobin korkeus merenpinnasta

**Lähde 1 ("Nairobi", Climate), sanatarkasti:**
*"At 1795 m above sea level, evenings may be cool, especially in the
June/July season, when the temperature can drop to 9 C."*

**Lähde 2 ("History of Nairobi", Uganda Railway), sanatarkasti:**
*"Furthermore, at 1661 meters above the sea level, the temperatures
are too low for the mosquitoes carrying malaria to survive."*

**Ongelma:** ero on 134 metriä, eivätkä lähteet kerro, mitattaanko
sama piste. Nairobi on rinnekaupunki, jonka korkeus vaihtelee.
Lisäksi lähde 2 väittää samassa lauseessa malariahyttysten
puuttuvan — mutta lähde 1 kertoo, että kaupungin alkuvuosia vaivasi
juuri malaria ja että kaupunkia yritettiin siirtää sen takia. Väite
on siis myös sisäisesti ristiriitainen.

**Ratkaisu:** lehti käyttää **kaupungin oman artikkelin lukua
1 795 m** ja jättää luvun 1 661 m sekä hyttysväitteen kokonaan pois.
Malariaongelma kerrotaan sellaisena kuin lähde 1 sen kertoo:
kaupungin alkuvuosia vaivasi malaria. Laudan visa
(`africa-questions.js`) sanoo "noin 1 700 metrissä", mikä sopii
molempiin lukuihin eikä ole ristiriidassa. Ratkaisu kirjataan
lohkokommenttiin.

---

## C. RISTIRIITA — kaupungin lempinimi

**Lähde 1 ("Nairobi", johdanto):** *"Nicknamed the "Green City under
the Sun""*.
**Lähde 2 ("Nairobi", Culture):** *"The first is "The Green City in
the Sun""*.
**Lähde 3 ("History of Nairobi", johdanto):** *"Nairobi is popularly
known as the "Green City in the Sun""*.

**Ratkaisu:** kaksi kolmesta kohdasta sanoo **"in the Sun"**, ja
kulttuuriosion muotoilu on lähdeviitteineen tarkin. Lehti käyttää
muotoa **"Green City in the Sun"** eikä mainitse toista muotoa.

---

## D. RISTIRIITA — mikä ensimmäinen kansallispuisto

**Lähde 1 ("Nairobi National Park", History), sanatarkasti:**
*"Officially opened in 1946, Nairobi National Park was the first
national park established in Kenya."*

**Lähde 2 ("History of Nairobi", Growth), sanatarkasti:**
*"the Nairobi National Park was established by Britain in 1946, the
first national park in East Africa."*

**Ratkaisu:** lehti käyttää **puiston oman artikkelin** rajausta:
**Kenian ensimmäinen kansallispuisto**. Laajempaa väitettä
(Itä-Afrikan ensimmäinen) ei esitetä, koska sitä ei ole vahvistettu
puiston omassa artikkelissa. Ratkaisu kirjataan lohkokommenttiin.

---

## E. RISTIRIITA — KICC:n kerrosluku ja valmistumisvuosi

**Lähde 1 ("Nairobi", Post independence):** *"The 28-story building at
the time was designed by the Norwegian architect Karl Henrik Nøstvik
and Kenyan David Mutiso."*
**Lähde 2 ("Kenyatta International Convention Centre", johdanto):**
*"is a 32-story building located in Nairobi, Kenya."*
**Lähde 2, Structure:** *"The tower consists of 32 floors"*;
**History:** *"Construction was completed in 1973, with the opening
ceremony occurring in September 1973"*. Artikkelin luokitus sanoo
kuitenkin **"Buildings and structures completed in 1974"**.

**Ratkaisu:** kerrosluku otetaan **rakennuksen omasta artikkelista
(32)**, koska se toistaa luvun kahdesti eri kohdissa. Vuodeksi
kerrotaan **1973** (leipäteksti kahdesti); luokituksen 1974 ei
katsota kumoavan leipätekstiä eikä sitä mainita. Ratkaisu kirjataan
lohkokommenttiin.

---

## F. KOHDEKARTTA — etäisyydet mitattu uudelleen

Kaikki 28 paria laskettiin haversinilla. **Yksikään pari ei alita
200 metriä.** Viisi pienintä:

| väli | kohteet |
|------|---------|
| 216 m | arboretum – kansallismuseo |
| 344 m | yliopisto – Jeevanjeen puutarha |
| 520 m | kansallisarkisto – kongressikeskus |
| 577 m | kongressikeskus – rautatiemuseo |
| 615 m | Nairobi Gallery – kongressikeskus |

**216 metriä on niukka** ja se kirjataan sekä maakartan että
nähtävyysjuttujen lohkokommenttiin. Kohteet ovat Museum Hillin eri
puolilla ja eri juttujen aiheita (metsäkoeasema 1907 ja
luonnonhistoriallinen seura 1910–11), joten päällekkäisyyttä ei
synny.

**Pois jätetyt kohteet ja syyt:**

- **Uhuru Park** (−1,290278 / 36,817222) ja **Karuran metsä**
  (−1,240278 / 36,823611): molemmat ovat **lehden teemasivun noston
  L4 aihe** (Wangari Maathain kaksi kamppailua), eikä kohdekartta
  toista lehden juttuja (New Yorkin sääntö). Karura on lisäksi
  **5,5 km** ruudun pohjoisreunan yläpuolella.
- **Nairobin kansallispuisto** (−1,373333 / 36,858889): **noin 11 km**
  ruudun keskeltä kaakkoon; teemasivun pääaihe.
- **Nairobin rautatieasema** (−1,291664 / 36,828619): etäisyys
  rautatiemuseoon **751 m**, joten sääntö täyttyisi, mutta asema on
  lehden noston N2 aihe (rata ja kaupungin synty). Museo pidetään
  kartalla, koska sen juttu kertoo museon omista vetureista eikä radan
  rakentamisesta.
- **Parlamenttitalo** (−1,29 / 36,82): etäisyydet riittävät
  (374 m KICC:stä), mutta artikkelin ainoa laaja historiaosuus
  koskee **vuoden 2024 mielenosoituksia ja niiden uhreja**.
  Kohde pudotettiin, koska juttu ei mahtuisi lehden linjaukseen
  "ei nykypolitiikkaa" ilman että rakennuksen tarina jää tyhjäksi
  (1954, Amyas Connell, kellotorni). Tilalle otettiin rautatiemuseo.
- **Times Tower** (−1,290278 / 36,823889): **208 m** KICC:stä eli
  niukasti yli säännön, mutta verovirastorakennus ei kanna juttua.
- **Kenyatta National Hospital**, **Britam Tower**, **UAP Old Mutual
  Tower**: ruudun eteläpuolella Upper Hillissä; Britam Tower on
  lisäksi jo valokuvataulun ennen–nyt-parin nykykuvassa.

**Ruudun koko** laskettiin uudelleen annetuista rajoista
(−1,2700 / −1,2975 / 36,8080 / 36,8320): **3,06 × 2,67 km**.
Faktapohjan alkuperäinen luku "2,7 × 3,1 km" oli väärin päin ja on
korjattu.

---

## G. REPOSSA OLEVA ANAKRONISMI (ei korjata tässä erässä)

`js/packs/africa-saapumiset.js`, avain `nairobi`:

> *"Isoisän kirjassa lukee: 'Nairobi on leiri, joka päätti jäädä.'
> **Hän tuli junalla**; minä katselin sen kiskoja ja mietin, kuinka
> leiristä tuli kaupunki yhden eliniän aikana."*

`js/packs/africa-questions.js`, `HUOMIOT.nairobi`, `voice: 'isoisa'`:

> *"Ylängön ilma on viileää ja kirkasta, ja **rautatieasema
> muistuttaa** yhä siitä, että koko kaupunki syntyi radanrakentajien
> leiristä muutamassa vuosikymmenessä."*

**Ongelma:** isoisän matka on vuonna 1873. Ugandan radan rakentaminen
alkoi **1896** ja rata saapui Nairobiin **30.5.1899**; kaupunkia ei
ollut olemassa. Isoisä ei voinut tulla Nairobiin junalla eikä nähdä
rautatieasemaa.

**Ratkaisu tässä erässä:** näihin tiedostoihin **ei kosketa**
(matkakirjatekstit ja kohtaamiset ovat omistajan päätöksellä
tauolla). Asia raportoidaan Fablelle korjattavaksi. Lehti itse
rakentaa 1873-kulman oikein: paikka oli isoisän aikaan maasaiden
karjalaidun ja viileä puro, ja rata tuli vasta neljännesvuosisataa
myöhemmin.

---

## H. TARKISTETTU JA VAHVISTETTU (otos)

- Maasait, akamba ja kikujut paikan alkuperäisinä asukkaina; maa oli
  suomaata. **Pitää.**
- Whitehousen perustelut paikan valinnalle (korkeus, leuto ilmasto,
  riittävä vesi, sijainti ennen Limurun nousua) ja hallinnon
  arvostelu (liian tasainen, huonosti kuivatettu, karu). **Pitää.**
- Arthur Church 1898: kaksi katua (Victoria Street, Station Street),
  kymmenen puistokatua, henkilökunnan asunnot, intialainen
  kauppa-alue. **Pitää.**
- Rata saapui **30.5.1899**; Nairobi korvasi Machakosin Ukamban
  provinssin hallinnon päämajana. **Pitää.**
- Whitehousen sitaatti radan saapumisesta. **Pitää**, sanatarkasti.
- Rutto ja alkuperäisen kaupungin polttaminen; Bazaar Street →
  Biashara Street. **Pitää.**
- 1902–1910 väkiluku 5 000 → 16 000; 1907 pääkaupunki Mombasan
  tilalle; 1919 kunta; 1921 24 000 asukasta, joista n. 12 000
  afrikkalaisia. **Pitää.**
- Ugandan rata: 1896–1901, 660 mailia, metrin raideleveys, 200 000
  kiskoa, 1,2 milj. ratapölkkyä, yli 30 000 työntekijää Punjabista ja
  Gujaratista, värväys Karachista ja Lahoresta, 12 rupiaa kuussa,
  useita tuhansia kuolleita, jäljelle jäänyt intialaisyhteisö.
  **Pitää.**
- Nandi-vastarinta ja Koitalel Arap Samoei; "iron snake"
  -ennustus (orkoiyot Kimnyolei). **Pitää**, sanatarkasti.
- "Lunatic Line", Labouchèren "gigantic folly", kustannusarviot
  3 milj. £ (1894) / 5,5 milj. £. **Pitää.**
- Jeevanjee: syntynyt 1856 Karachissa, kuoli 2.5.1936; urakka 1895;
  ensimmäinen ryhmä 350 miestä, kuudessa vuodessa 31 895; suurin
  kiinteistönomistaja Nairobissa ja puolet Mombasasta; osti
  intialaisen basaarin 1901 ja rakensi markkinapaikan 1904;
  perusti African Standardin, myi 1905, nimi East African Standard.
  **Pitää.**
- Jeevanjeen puutarha: ainoa kansan suoraan omistama puisto,
  lahjoitettu ja pidetään Nairobin asukkaiden hyväksi. **Pitää.**
- Kansallispuisto: 1946, 7 km keskustasta, 117,21 km², aidattu
  kolmelta sivulta, Mbagathi eteläraja, jopa 500 lintulajia,
  Kifaru Ark, Sheldrick 1963, Mervyn Cowie johtajana 1946–1966,
  norsunluun poltto 1989 (12 tonnia), Lion Conservation Unit 2005,
  1948 asukasluku 188 976 ja 1997 1,5 miljoonaa, sopimukset 1904 ja
  1911, Kitengela Landowners Association. **Pitää.**
- **"Maasai pastoralists were removed from their lands when the park
  was created"** — sanatarkasti lähteessä. **Pitää**, ja se on
  kerrottava suoraan (pilari 1, spec-mantereet.md linjaus 1).
- Maathai: Uhuru Park ja KANU:n 62-kerroksinen päämaja; Karuran
  metsä. **Pitää.**
- Matatu: yli 70 % työmatkoista, nimen kaksi selitystä, juuret
  1960-luvulla, kasvu 1980–90-luvulla, hiphop-vaikutus, keltainen
  raita ja reittinumero, makanga/manamba/donda, nganya-kulttuuri,
  laillistus 1973, luvitus 1984, maalauskielto poistettiin 2015,
  yli 600 SACCOa. **Pitää.**
- KICC: Kenyatta tilasi 1967, Nøstvik ja Mutiso, Solel Boneh &
  Factah, kolme vaihetta, avajaiset syyskuussa 1973, runsaat 105 m,
  pyörivä ravintola 76 minuuttia ja 148 paikkaa, terrakottajulkisivu,
  kuutiot/lieriö/kartiot, ainoa yleisölle avoin helikopterikenttä,
  amfiteatteri 800, Tsavo-sali 5 000, nimenmuutos syyskuussa 2013,
  Butlerin Kenyatta-patsas 1971. **Pitää.**
- Kansallismuseo: seura 1910–11, museo ja kirjasto 1911, Aladina
  Visramin rahoittama kaksihuoneinen rakennus, Loveridge 1914,
  Coryndon kuoli 1925, rakentaminen 1928, valmis 1929, avattiin
  22.9.1930 Coryndon Museumina; laki 2006, yli 22 aluemuseota,
  East African Herbarium yli 7,5 milj. näytettä, Leakeyt. **Pitää.**
- Kansallisarkisto: perustettu 1965, entinen Kenya Commercial Bankin
  talo, 40 000 nidettä, Murumbi-galleria Afrikan suurin
  panafrikkalainen taidegalleria, Kagomben asetusilmoitus
  maaliskuussa 1976. **Pitää.**
- Nairobi Gallery: C. Rand Ovary, valmistui 1913 Ministry of Native
  Affairsille (avioliitot, syntymät, kuolemat), 1963–1984
  maakuntakomissaarin toimisto, 1997 asti KANUn piiritoimisto,
  kansallismonumentti 1995, NMK 1997, peruskorjaus 1999–2005,
  Google-digitointi 2019, kokoelmat. **Pitää.**
- Arboretum: 1907, Batiscombe, metsäpuulajien kokeilu, suojeltu 1932,
  omistuskirja 1996, 30 ha, yli 350 puulajia, State Housen lähellä.
  **Pitää.**
- Rautatiemuseo: avattu 1971, East African Railwaysin esineistö,
  Kenya Railways ylläpitää, oma raideyhteys, kolme toimintakuntoista
  höyryveturia konepajassa, veturi 301 (2301) elokuvassa *Out of
  Africa* 1985, pienoisrautatie tammikuussa 2011. **Pitää.**
- Yliopisto: juuret 1956 (Royal Technical College), Royal College
  Nairobi 25.6.1961, University College Nairobi 20.5.1964,
  itsenäinen yliopisto 1.7.1970 Itä-Afrikan yliopiston hajotessa
  kolmeksi, Gandhi Memorial Academy liitettiin huhtikuussa 1954,
  perustuskivi huhtikuussa 1952, kuninkaallinen peruskirja syyskuussa
  1951, 49 047 opiskelijaa lukuvuonna 2023. **Pitää.**
  **EI KÄYTETÄ:** väite Afrikan ensimmäisestä Konfutse-instituutista
  vuonna 2001 — Konfutse-instituutteja ei ollut olemassa ennen vuotta
  2004, joten vuosiluku on lähteessä ilmeisen virheellinen eikä sitä
  toisteta.
- Ilmasto: Cwb, 1 795 m, kesä–heinäkuussa jopa 9 °C, joulu–maaliskuu
  lämpimin, keskimääräinen ylin 28 °C, kaksi sadekautta, pilvisin
  jakso ensimmäisen sadekauden jälkeen syyskuuhun asti. **Pitää.**
- Benga (jazzin ja luo-musiikin yhdistelmä, kehittyi Nairobissa),
  soukous-keskus 1970-luvulla, Orchestra Super Mazembe, Virgin
  Records. **Pitää.**
- Karen Blixen 1917–1931, kaupunginosa Karen, *Out of Africa* 1985
  (Sydney Pollack), museo. **Pitää.**
- Kwani?, Ngũgĩ wa Thiong'o, Meja Mwangi, Lupita Nyong'o. **Pitää.**
- UNEP ja UNON Gigirissä; Nairobin arvopaperipörssi mantereen
  toiseksi vanhin ja neljänneksi suurin volyymiltaan; Beta World
  City 2024. **Pitää.**
- JKIA-terminaali valmistui 14.3.1978, Kenyatta avasi sen alle viisi
  kuukautta ennen kuolemaansa; SGR toukokuussa 2017; Thika
  Superhighway marraskuussa 2012, 50,4 km. **Pitää.**

---

## I. SISÄLTÖLINJAUKSET, JOTKA KIRJOITTAJAN ON NOUDATETTAVA

1. **Rajaus maalehteen nähden (Fablen ohje):** Nairobin lehti ei saa
   toistaa Kenian yleisiä aiheita. Pois jätetään: Kenian juoksijat,
   Suuri hautavajoama laajana ilmiönä, Masai Mara, tee ja kahvi,
   swahili maan kielenä, itsenäistyminen valtiollisena tapahtumana,
   Mau Mau kansallisena liikkeenä, mobiiliraha. Nämä kuuluvat
   KEN-maalehteen.
2. **Pilari 1:** maasait, akamba ja kikujut tulevat ensimmäisenä
   nostona ja elävinä toimijoina. Pakkosiirto kerrotaan suoraan sekä
   kaupungin että kansallispuiston kohdalla. Kitengelan
   maanomistajayhdistys näytetään nykypäivän toimijana, ei
   "kadonneena kansana".
3. **Radan rakentajat:** intialaisten työntekijöiden olot ja
   kuolleisuus kerrotaan suoraan lukuina ja lähteen omilla sanoilla,
   ilman julmuuksien yksityiskohtia. Tsavon leijonien tarina
   kerrotaan vain, jos se mahtuu — se kuuluu Tsavoon, ei Nairobiin,
   ja se on jätetty tästä lehdestä pois.
4. **Ei nykypolitiikkaa eikä nykyrikollisuutta:** parlamentin
   valtaus 2024, kuvernöörikiistat, matatualan väkivalta ja
   korruptio, Kiberan slummikuvaus ja Yhdysvaltain suurlähetystön
   pommi-isku 1998 jätetään kaikki pois. Matatuista kerrotaan
   liikennemuotona ja katutaiteena.
5. **Kuvat:** matatukuvassa saa näkyä ohikulkijoita vain kaukaisina;
   Kiberan tai muun epävirallisen asutuksen kuvia ei käytetä
   (ei kurjuuskuvastoa).
6. **Ilmastonmuutos ja ympäristö** saa näkyä neutraalina
   luonnontieteellisenä tosiasiana (puiston saastekuormitus,
   viheralueiden kaventuminen) ilman poliittista kehystä.
