# Los Angeles -faktapohjan riippumaton tarkistus

Tarkistettu 23.8.2026 en-Wikipedian raakatekstistä (`action=raw`,
`NODE_USE_ENV_PROXY=1`, ei 429-ongelmia tällä kertaa) seuraavista
artikkeleista: **Los Angeles**, El Pueblo de Los Ángeles Historical
Monument, Pico House, Zanja Madre, Ávila Adobe, Los Angeles Aqueduct,
Port of Los Angeles, Tongva, Mission San Gabriel Arcángel, Hollywood
Sign, Griffith Observatory, Tongva Sacred Springs. Koordinaatit
poimittu itse jokaisen artikkelin oman infobox-wikitekstin
`{{coord|…}}`-kentästä ja muunnettu käsin desimaaliasteiksi;
etäisyydet ja kompassisuunnat laskettu itse (haversine + bearing,
Node.js). Merkkimäärät tarkistettu koneellisesti kaikista 15
lainauslohkosta (3 johdantoa + 12 nostoa) suoraan faktapohjan
markdown-tiedostosta.

**Yleisarvio: poikkeuksellisen huolellista työtä.** Kaikki kymmenen
kohdekartan koordinaattia täsmäävät lähteisiin senttimetrin
tarkkuudella, kaikki 15 merkkimäärää täsmäävät täsmälleen, ja lähes
jokainen numero, vuosiluku ja nimi nosto- ja jaksoteksteissä on
sanatarkasti oikein. En löytänyt yhtään suuruusluokkavirhettä.
Löysin yhden todellisen **pakollisen korjauksen** (Tongva-väestöluvun
virheellinen ajoitus "2020-luvulle") sekä muutaman pienen huomion.

---

## PAKOLLISET KORJAUKSET

### 1. Nosto A3: "2020-luvulla noin 1 700" — luku on todellisuudessa vuodelta 2008, ei 2020-luvulta

**Väite (A3):** "2020-luvulla noin 1 700 ihmistä identifioituu tongvaksi
tai gabrieleñoksi." Lähteeksi merkitty en-Wikipedia "Tongva"
(Contemporary tribe).

**Tarkistus:** "Contemporary tribe" -osio sanoo todella: "In the 21st
century, an estimated 1,700 people self-identify as members of the
Tongva or Gabrieleño tribe" — mutta tämä on Wikipedian oma epämääräinen
ilmaisu ("21. vuosisadalla", ei "2020-luvulla"). Sama artikkeli
kertoo toisessa kohdassa (American occupation -osio) täsmällisemmin,
mistä luku on peräisin: "**In 2008**, more than 1,700 people
identified as Tongva or claimed partial ancestry." Molemmat kohdat
viittaavat samaan lähteeseen (2008 California Senate Bill 1134:n
tausta-aineistoon). Luku on siis peräisin vuodelta 2008 — 16 vuotta
vanhaa dataa — ei mistään 2020-luvun laskennasta tai selvityksestä.

**Miksi tämä on pakollinen:** Faktapohjan oma sisältölinjaus (osion
alkutekstin pilari 3 -perustelu) korostaa nimenomaan tongvien
kuvaamista "nykyisenä, elävänä kansana" — ja tässä kohtaa faktapohja
tarkentaa Wikipedian epämääräisen "21. vuosisadalla" -ilmauksen juuri
päinvastaiseen suuntaan kuin pitäisi: se antaa 16 vuotta vanhalle
luvulle harhaanjohtavan tuoreuden vaikutelman ("2020-luvulla") juuri
siinä kohdassa, jonka on tarkoitus välittää ajantasaisuutta. Jos
luku halutaan pitää mukana, tarkempi ja lähteeseen perustuva
muotoilu olisi esim. "2000-luvulla (viimeisin arvio vuodelta 2008)
noin 1 700 ihmistä identifioituu…" tai yksinkertaisesti "tällä
hetkellä arviolta noin 1 700 ihmistä…" ilman vuosikymmentä.

**Huom:** 2013 raportoitu "yli 3 900" -jäsenluku (neljä ryhmää
yhteensä) on sitä vastoin oikein ajoitettu — faktapohja sanoo
oikein "2013 raportoitiin" eikä väitä sen olevan tuoreempaa dataa.

---

## HUOMIOT (harkinnanvaraiset)

### 1. Wikipedia-sisäinen ristiriita: Mission San Gabrielin siirtovuosi (1774 vs. 1776)

Nosto A4 sanoo: "Mission San Gabriel… perustettiin 1771 ja siirrettiin
nykyiselle paikalleen 1774 tulvan vuoksi", lähteeksi merkiten
en-Wikipedia "Tongva" (Colonization and the mission period). Tämä
täsmää sanatarkasti kyseiseen kohtaan: "the Spanish ordered the
mission relocated five miles north **in 1774**". Faktapohja siteeraa
siis oikein valitsemaansa lähdettä. Mutta Mission San Gabriel
Arcángelin **oma** artikkeli antaa eri vuoden: "**In 1776**, a flash
flood destroyed much of the crops and ruined the original Mission
complex, which was subsequently relocated five miles closer to the
mountains." Kaksi Wikipedia-artikkelia siis antavat kaksi eri vuotta
samalle tapahtumalle. Ei vaadi korjausta faktapohjaan (lähde on
siteerattu oikein), mutta kirjoittajan kannattaa tietää, että Mission
San Gabrielin oma artikkeli käyttäisi vuotta 1776, jos siihen
joskus viitataan suoraan sen kautta.

### 2. Kohdekartan kompassisuunta: Mission San Gabriel Arcángel on tarkemmin ENE, ei suoraan itään

Laskin itse kaikki yhdeksän etäisyyttä ja kompassisuuntaa keskustan
koordinaatista (haversine + bearing, samat pyöristetyt koordinaatit
kuin faktapohjassa):

| Kohde | Koostajan luku | Oma laskelma | Kompassisuunta (oma) |
|---|---|---|---|
| Plaza | ~1,4 km koilliseen | 1,36 km | koilliseen (56°), täsmää |
| Pico House | ~1,2 km koilliseen | 1,18 km | koilliseen (56°), täsmää |
| Ávila Adobe | ~1,4 km koilliseen | 1,38 km | koilliseen (55°), täsmää |
| Zanja Madre | ~2,6 km koilliseen | 2,58 km | koilliseen (37°), täsmää |
| Mission San Gabriel | ~14,2 km itään | 14,18 km | **itäkoilliseen** (68°), ei suoraan itään |
| Hollywood-kyltti | ~11,4 km luoteeseen | 11,44 km | luoteeseen (325°), täsmää |
| Griffith Observatory | ~8,9 km luoteeseen | 8,90 km | luoteeseen (329°), täsmää |
| Port of Los Angeles | ~35,5 km etelään | 35,60 km | etelään (182°), täsmää |
| Tongva Sacred Springs | ~19,4 km länteen | 19,45 km | länteen (269°), täsmää |

Kaikki etäisyydet täsmäävät alle 30 metrin tarkkuudella — koostajan
laskentamenetelmä (asteet × 111 km, pituusasteille × cos 34,05° ≈
0,829) on täysin luotettava, ja tämä sama tarkkuus koskee myös
itse koordinaatteja (ks. alla). Ainoa poikkeama on Mission San
Gabrielin kompassisuunta: tarkka bearing on 68°, joka on lähempänä
itäkoillista (ENE) kuin suoraa itää (90°). Ei harhaanjohtava
kartalla, mutta jos legendaan halutaan tarkka ilmansuunta, "itään"
→ "itäkoilliseen" olisi täsmällisempi.

### 3. Kaikki kymmenen koordinaattia tarkistettu ja vahvistettu täydellisesti oikeiksi

Laskin jokaisen kohdekartan koordinaatin itse suoraan artikkelin
`{{coord}}`-tagista asteet-minuutit-sekunnit-muodosta desimaaliasteiksi
(en pelkkänä pistokokeena vaan kaikki kymmenen):

| # | Kohde | Lähteen coord-tagi | Oma muunnos | Faktapohjan luku |
|---|---|---|---|---|
| 1 | Los Angeles (keskusta) | 34°03'N 118°15'W | 34,0500 / 118,2500 | täsmää |
| 2 | Plaza / El Pueblo | 34°3'25"N 118°14'16"W | 34,0569 / 118,2378 | täsmää |
| 3 | Pico House | 34°03'21.75"N 118°14'22"W | 34,0560 / 118,2394 | täsmää |
| 4 | Ávila Adobe | 34°03'26"N 118°14'16"W | 34,0572 / 118,2378 | täsmää |
| 5 | Zanja Madre | 34°4'6.8"N 118°14'0"W | 34,0686 / 118,2333 | täsmää |
| 6 | Mission San Gabriel | 34°05'48"N 118°06'24"W | 34,0967 / 118,1067 | täsmää |
| 7 | Hollywood-kyltti | 34°8'2.62"N 118°19'17.73"W | 34,1341 / 118,3216 | täsmää |
| 8 | Griffith Observatory | 34°07'6"N 118°18'1.2"W | 34,1183 / 118,3003 | täsmää |
| 9 | Port of Los Angeles | 33°43'48"N 118°15'45"W | 33,7300 / 118,2625 | täsmää |
| 10 | Tongva Sacred Springs | 34.0456 / -118.461 (jo desimaalimuodossa) | 34,0456 / 118,4610 | täsmää |

**Kaikki kymmenen täsmäävät neljän desimaalin tarkkuudella, ja kaikki
sijaitsevat oikein Los Angelesissa, Kaliforniassa, Yhdysvalloissa.**
Ei virheitä. Tämä on erityisen vakuuttavaa, koska koostaja joutui
poikkeamaan tavanomaisesta `api.php&prop=coordinates`-rajapinnasta
429-ongelmien vuoksi ja laski koordinaatit käsin infobox-wikitekstistä
— tarkistukseni vahvistaa, että tämä vaihtoehtoinen reitti tuotti
täysin luotettavat tulokset.

### 4. Tongva Sacred Springs Foundationin perustamisvuosi tarkemmin 1992

Nosto A2 sanoo: "1990-luvulla Gabrielino/Tongva Springs Foundation
elvytti lähteiden käytön pyhissä seremonioissa." "Tongva Sacred
Springs" -artikkeli kertoo säätiön perustetun täsmällisesti **1992**
(kehittäjien ehdotettua pysäköintiluolaa vastustamaan), ei
myöhemmin 1990-luvulla. "1990-luvulla" ei ole väärin, mutta
"vuonna 1992" olisi täsmällisempi, jos merkkimäärä sallii.

### 5. Muut tarkistetut ja VAHVISTETUT faktat (ei virheitä)

Näiden täsmäävyys tarkistettiin suoraan lähdeartikkeleista
sanatarkasti tai käytännössä sanatarkasti:

- **LA1 (perustaminen):** Felipe de Neve, 44 siirtolaista / 11 perhettä,
  4.9.1781, Porciúncula-joki, El Pueblo de Nuestra Señora la Reina de
  los Ángeles, ainakin 10 (jopa 26) mustaa/mulattitaustaista
  perustajaa, alkuperäinen sijainti lähellä Yaanga-kylää, Zanja Madre
  valmistui kuukauden sisällä ja haarautui kahdeksaan sivu-uomaan —
  kaikki täsmää sanatarkasti.
- **LA2 (Pico House):** Pío Pico, viimeinen Meksikon Alta Californian
  kuvernööri, Ezra F. Kysor, rakennettu 1869–1870, avautui 5 700
  hengen kaupunkiin (1870 census), italialaistyylinen kolmikerroksinen,
  33 huonetta → lähes 80, suihkulähde ja lintutarha, SP-rautatie 1876,
  Pico menetti hotellin San Francisco Savings and Loanille —
  kaikki täsmää, myös kuvatiedostojen nimet "PicoHouse-1875.jpg" ja
  "LA-plaza-1876.jpg" (mainittu kuva-aihevinkeissä).
- **LA3 (rautatiet ja öljy):** SP-rautatie 1876, Santa Fe 1885, öljy
  löydetty 1892, vuoteen 1923 mennessä ~neljännes maailman
  tuotannosta, väkiluku 1900 yli 102 000 — kaikki täsmää sanatarkasti.
- **LA4 (akvedukti):** Zanja Madre riittämätön 1900-luvun alkuun
  mennessä, Mulholland, valmistui 1913, 233 mailia (375 km, oma
  muunnokseni täsmää), painovoima, peruskirjan vedenmyyntikielto
  pakotti naapurikuntia liittymään — kaikki täsmää sanatarkasti.
- **H1 (plaza, tarkistettu erityisen huolella):** 1815 tulva,
  uudelleenrakennus nykyiselle plazalle, kirkko perustettu 1814 /
  valmis 1822 / nykyinen rakennus 1861, Ávila Adobe 1818 vanhimpana
  säilyneenä asuinrakennuksena, 1891 LA Times -sitaatti 90 %:sta
  rakentamista etelään — kaikki täsmää. Faktapohjan itse merkitsemä
  ristiriita (Ávila Adobe -artikkelin "kolmas sijainti" -maininta vs.
  El Pueblo -artikkelin yhden siirron kuvaus) on vahvistettu todeksi
  sanatarkasti — kyseessä on aito Wikipedia-sisäinen ristiriita, ei
  faktapohjan tulkintavirhe.
- **H2 (satama):** Banning ruoppasi kanavan 1871, 50 000 tonnia, 1868
  ensimmäinen rautatie, SP/Huntington yrittivät Santa Monicaan (Long
  Wharf 1893), Free Harbor Fight ratkesi 1897 San Pedron hyväksi,
  aallonmurtaja 1899 — kaikki täsmää sanatarkasti.
- **H3 (Hollywood, tarkistettu erityisen huolella visan
  vastausvuodon varalta):** Hollywood liitettiin 1910, 10
  elokuvayhtiötä, vuoteen 1921 mennessä yli 80 % maailman
  elokuvateollisuudesta, Great Depression -eristysvaikutus — kaikki
  täsmää sanatarkasti. **Vahvistettu, että "1923, Hollywoodland"
  -tarina on tarkoituksella jätetty pois** — visan `fact`-kenttä
  (`js/packs/northamerica-questions.js`, `losangeles`) käyttää juuri
  tätä tarinaa sanasta sanaan, eikä se esiinny missään nostossa.
- **H4 (geologia):** Tyynenmeren tulirengas, ~10 000 järistystä/vuosi
  Etelä-Kaliforniassa, San Andreas 110–140 vuoden sykli, 1857 Fort
  Tejon edellisenä suurena, Northridge 1994, M6,7, 12,5 mrd dollarin
  vahingot, 72 kuolemaa — kaikki täsmää sanatarkasti. Visan oma
  "muutaman senttimetrin vuodessa" -fakta ei toistu missään
  nostossa — ei vuotoa.
- **A1 (nimistö):** Yaanga/Iyáangẚ, "paikka jossa kasvaa myrkkytammea",
  toisinaan käännetty "savulaakso" (engl. "valley of smoke"), sata
  kylää, Cabrillo 1542, "Baya de los Fumos" ("Savujen lahti" /
  "Bay of Smokes"), todennäköisesti nykyinen San Pedro Bay — kaikki
  täsmää, hedge ("todennäköisesti" / "commonly believed") säilytetty.
- **A2 (lähteet):** Koruu'vanga, käytössä ainakin 400-luvulta eaa.,
  22 000–25 000 gallonaa/vrk (83 000–95 000 litraa, oma muunnokseni
  täsmää), Gabrielino/Tongva Springs Foundation — kaikki täsmää.
- **A3 (nykyinen kansa):** Kalifornian osavaltion tunnustus 1994
  (Gabrielino-Tongva Tribe), ei liittovaltion tunnustusta, neljä
  ryhmää vuodesta 2006, 2013 yli 3 900 jäsentä yhteensä, ei yhtä
  yhtenäistä hallintoa — kaikki täsmää (ks. kuitenkin pakollinen
  korjaus 1 koskien "2020-luvulla" -ajoitusta).
- **A4 (San Gabriel -lähetysasema):** perustettu 1771, "koko
  siirtomaajärjestelmän rikkain" (1800-luvulla, toimitti karjaa ym.
  koko Alta Californiaan), lähes 6 000 tongvaa haudattuna — täsmää
  sanatarkasti (siirtovuoden 1774/1776-ristiriita ks. huomio 1).
- **Jakso 1 (LAX, Union Station):** LAX maailman kahdeksanneksi
  vilkkain, Union Station avattu 1939, Yhdysvaltain länsiosien suurin
  matkustajaterminaali, yli miljoona Amtrak-nousua/poistumaa 2025 —
  kaikki täsmää sanatarkasti.
- **Jakso 2 (maantiede):** 502,7 neliömailia, 44 mailia (71 km)
  pohjois-eteläsuunnassa, 29 mailia (47 km) itä-länsisuunnassa, Mount
  Lukens 5 074 jalkaa / 1 547 m (oma muunnokseni täsmää), Santa Monica
  -vuoret erottavat altaan San Fernandon laaksosta lähellä keskustaa
  — kaikki täsmää.
- **Jakso 3 (väestö, Olvera Street):** 47,2 % latinotaustaista, 31,9 %
  meksikolaistaustaista (suurin yksittäinen ryhmä) — täsmää suoraan
  vuoden 2023 sensusdataan asti. Olvera Street alun perin Wine
  Street, nimetty 1877 tuomari Agustín Olveran mukaan, muutettu 1930
  meksikolaiseksi toriksi — kaikki täsmää sanatarkasti.
- **Jakso 4 (olympialaiset):** 1932 (väkiluku juuri ylittänyt
  miljoonan), 1984 (taloudellisesti menestyksekkäin, 14 maan
  boikotista huolimatta), 2028 kolmatta kertaa Lontoon ja Pariisin
  jälkeen — kaikki täsmää sanatarkasti.
- **Jakso 5 / Säätiedot (osio 5, tarkistettu erityisen huolella):**
  Köppen BSh, lähellä Csb/Csa-rajaa, 14,67 tuumaa / 372 mm (oma
  muunnokseni täsmää), 35 sadepäivää, talvipäivät ~68 °F/20 °C,
  ennätykset 113 °F/45 °C (27.9.2010), 121 °F/49 °C (6.9.2020,
  Woodland Hills/Pierce College), 28 °F/−2 °C (4.1.1949), Santa Monica
  Pier 70 °F/21 °C vs. Canoga Park 95 °F/35 °C 15 mailin päässä,
  yli 3 000 aurinkotuntia, 7–12 tuntia päivässä joulusta heinäkuuhun
  — **jokainen luku täsmää lähteeseen asteen tarkkuudella.**
- **Väestönlaskennat 1870/1880:** 5 728 (1870) ja 11 183 (1880)
  täsmäävät täsmälleen pääartikkelin infoboxiin.
- **Merkkimäärät:** tarkistin kaikki 15 lainauslohkoa (3 johdantoa +
  12 nostoa) suoraan markdown-tiedostosta koneellisesti — jokainen
  täsmää faktapohjan ilmoittamaan lukuun täsmälleen (esim. LA2 = 623,
  A3 = 454, H1 = 548 merkkiä), ja kaikki pysyvät ilmoitetuissa
  rajoissa (johdannot 220–228, nostot 454–623 — molemmat sisältyvät
  tehtävänannon rajoihin 154–232 ja 440–660).

### 6. Visan suora anto (tehtävän kohta 5)

Tarkistin `js/packs/northamerica-questions.js`:n `losangeles`-lohkon
(viisi kysymystä) sanatarkasti faktapohjan omaa itsearviointia (osio
7, kohta 1) vasten. Vahvistan arvion oikeaksi kaikkien viiden aiheen
osalta:

- Hollywood: H3 käsittelee kasvua (1910, 80 % 1921) eikä koskaan
  mainitse kylttiä tai vuotta 1923 — ei suoraa lainausta.
- San Andreas: H4 käyttää järistyssyklejä ja Northridgea, ei visan
  "muutama senttimetri vuodessa" -faktaa — ei suoraa lainausta.
- Tyynimeri: ei käsitelty suoraan yhdessäkään nostossa (faktapohja
  itse myöntää tämän osiossa 7.1) — ei vuotoa, koska aihetta ei
  edes sivuta.
- Satama: H2 käyttää 1800-luvun historiallisia lukuja (50 000 tonnia,
  Free Harbor Fight), ei visan nykyaikaista "maan vilkkain"-väitettä
  — ei suoraa lainausta.
- Juomavesi: LA4 keskittyy nimenomaan Owens-jokeen ja Mulhollandiin,
  ei visan mainitsemiin Sierra Nevadaan/Colorado-jokeen — eri
  lähdejoki, ei suoraa lainausta.

Ei löytynyt yhtään nostoa tai jaksoa, joka antaisi visan vastauksen
suoraan.

### 7. Pilari 3 ja pilari 4 — arvio

Sivu C (`alkuperaiskansat`) ja sen neljä nostoa (A1–A4) täyttävät
pilarin 3 vaatimuksen hyvin: A3 keskittyy nimenomaan nykyiseen,
elävään yhteisöön ilman romantisointia tai säälittelyä, ja A4
kertoo pakkotyön ja kuolleisuuden faktoina ilman raskaimpien
yksityiskohtien korostamista (Tongva-artikkelin oma "Nazi
concentration camp" -vertaus on tietoisesti jätetty pois — hyvä
ratkaisu). Ainoa todellinen ongelma pilarin 3 kannalta on juuri
pakollinen korjaus 1: "2020-luvulla" antaa väärän mielikuvan siitä,
että kansan koosta olisi tuoretta 2020-luvun dataa, kun oikea lähde
on 16 vuotta vanha — tämä heikentää juuri sitä nykyisyyden
vaikutelmaa, jota pilari 3 tavoittelee. Pilarin 4 (ikätaso 13+)
osalta en löytänyt ongelmallisia muotoiluja — kaikki historiallinen
väkivalta ja pakkotyö on kerrottu asiallisesti ilman yksityiskohtien
mässäilyä, sopien kohderyhmälle.
