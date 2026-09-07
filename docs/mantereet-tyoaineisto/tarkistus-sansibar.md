# Sansibarin faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset väitteet haettiin
`grep -o` -täsmähaulla sanatarkkoina merkkijonoina. Koordinaatit
haettiin itse (`list=geosearch`) ja kaikki 28 kohdeparin etäisyyttä
laskettiin itse haversinilla.

Luetut artikkelit: **Zanzibar**, **Zanzibar City**, **Stone Town**,
**History of Zanzibar**, **Sultanate of Zanzibar**, **Christ Church,
Zanzibar**, **Emily Ruete**, **Tippu Tip**, **Tippu Tip's House**,
**Changuu**, **Dhow**, **Unguja**, **Old Fort of Zanzibar**,
**House of Wonders**, **Sultan's Palace, Zanzibar**, **Old Dispensary
(Zanzibar)**, **St. Joseph's Cathedral, Zanzibar**, **Hamamni Persian
Baths**, **Darajani Market**, **Michenzani**, **State University of
Zanzibar**, **Zanzibar International Film Festival**, Sauti za Busara,
Seaweed farming, Said bin Sultan, Majid bin Said.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kolme kohtaa on
Wikipedian sisäisiä ristiriitoja, kaksi on linjauskysymystä ja yksi
on kaksoiskäytön este, joka ratkaisi kohdekartan kokoonpanon.

---

## A. RISTIRIITA — milloin pääkaupunki siirrettiin Muscatista

**Lähde 1 ("Zanzibar", Sultanate of Zanzibar), sanatarkasti:**
*"In 1832 or 1840 (the date varies among sources), Said bin Sultan,
Sultan of Muscat and Oman moved his capital from Muscat, Oman to Stone
Town."*

**Lähde 2 ("Stone Town", Omani dominion), sanatarkasti:**
*"In 1824, Sultan Said bin Sultan moved his seat from Muscat, Oman, to
Stone Town…"*

Kolme eri vuosilukua: 1824, 1832 ja 1840.

**Ratkaisu:** kirjoittaja **ei valitse vuotta** vaan käyttää
päälähteen omaa varausta: nosto S2 sanoo, että Said bin Sultan siirsi
hovinsa Muscatista Sansibariin **1800-luvun alkupuoliskolla** ja että
**lähteet antavat vuodeksi 1832 tai 1840**. Vuotta 1824 ei mainita,
koska se on kolmas ja vähiten tuettu luku. Ratkaisu kirjataan
lohkokommenttiin. Sama menettely kuin Nairobin kaupunginnimen kanssa.

---

## B. RISTIRIITA — kuka rakensi vanhan linnakkeen ja milloin

**Lähde 1 ("Old Fort of Zanzibar", History), sanatarkasti (artikkelin
lainaama suojelun teksti):**
*"Old Fort is one of the oldest buildings in Stone Town, originally
built by the Portuguese in the 17th century and later re-built by the
Omanis in the 18th century."*

**Lähde 2 ("Stone Town", Omani dominion), sanatarkasti:**
*"The Old Fort, the oldest building in Stone Town, was built in 1699
by the Omanis."*

**Ratkaisu:** nosto S5 kertoo **molemmat kerrokset** eikä valitse:
portugalilaiset aloittivat Kivikaupungin ensimmäisen kivirakennuksen
ja omanilaiset viimeistelivät sen — tämän sanoo myös "Stone Town"
itse muualla (*"began constructing Stone Town's first stone structure,
the Old Fort… the Sultanate of Oman took over the island and completed
the fort"*). Vuosilukua **1699 käytetään vain siinä muodossa, jossa
lähde sen antaa** ("omanilaiset saivat linnakkeen valmiiksi
1600-luvun lopulla"). Sisäpihan portugalilaisen kirkon jäänteet
todistavat molemmat vaiheet, ja se kerrotaan.

---

## C. RISTIRIITA — Pyhän Joosefin katedraalin valmistumisvuosi

**Lähde 1 ("St. Joseph's Cathedral, Zanzibar"), sanatarkasti:**
*"The church was built by French missionaries between 1893 and 1898."*

**Lähde 2 ("Stone Town", Landmarks), sanatarkasti:**
*"…built by French missionaries between 1893 and 1897."*

**Ratkaisu:** käytetään **kohteen oman artikkelin** lukua
**1893–1898**, koska se on aiheen päälähde. Vuoden 1897 vaihtoehtoa ei
mainita. Ratkaisu kirjataan lohkokommenttiin.

---

## D. KAKSOISKÄYTÖN ESTE — Ihmeiden talo ja vanha linnake

Mitatut välit (haversine, geosearchin koordinaateista):
- Vanha linnake – Ihmeiden talo: **71 m**
- Ihmeiden talo – sulttaanin palatsi: **151 m**
- Vanha linnake – Pyhän Joosefin katedraali: **157 m**

Kivikaupungin rantakadun kohteet ovat niin lähellä toisiaan, ettei
niistä voi ottaa kartalle kuin osan. **Ratkaisu:** vanha linnake on
**lehden oma nosto** (S5, elokuvajuhla ja amfiteatteri), joten se on
joka tapauksessa pois kartalta New Yorkin säännön nojalla; sen
naapuri Ihmeiden talo putoaa 71 metrin takia, ja kartalle otetaan
**sulttaanin palatsi**, joka on 222 metriä linnakkeesta ja jonka oma
artikkeli kantaa nähtävyysjutun. Pyhän Joosefin katedraali mahtuu
mukaan, koska linnake ei ole kartalla. Ihmeiden talo mainitaan
matkaoppaassa.

---

## E. LINJAUS — Michenzani ja vuoden 1964 vallankumous

"Michenzani"-artikkeli kertoo, että korttelit rakennettiin
vallankumoushallituksen kaupunkiuudistuksessa Itä-Saksan avulla, ja
"Zanzibar"- ja "Stone Town" -artikkelit kertovat vuoden 1964
vallankumouksesta, jossa kuoli yli 20 000 ihmistä.

**Ratkaisu:** nähtävyysjuttu kertoo **rakennuksista**: elementtitalot,
kerrosluvut 4–7, sama talo eri korkuinen eri osista, hissittömyys,
vedenpaine toisesta kerroksesta ylöspäin, kunnostus 2010, Itä-Saksan
avustus ja 1960–70-luvun ajoitus. Vallankumouksen kulkua, uhrilukuja
tai väestön pakoa **ei kerrota** — sama linja kuin Miamin lehdessä
1980-luvun levottomuuksien kanssa. Sanaa "vallankumoushallitus"
käytetään vain, kun se on rakennushankkeen tilaaja, ja silloinkin
neutraalisti ("Sansibarin silloinen hallitus").

Samasta syystä pois jäävät: vuoden 1964 vallankumous omana aiheenaan,
vanhan apteekin ja Tippu Tipin talon kohdalla asukkaiden pako
1964 (mainitaan vain, että talo muuttui kerrostaloksi ja apteekki
otettiin hallinnon haltuun), lauttaonnettomuudet 2009–2012 ja
nykypolitiikka.

---

## F. LINJAUS — orjakauppa ja Tippu Tip

**Lähde ("Zanzibar", Sultanate of Zanzibar), sanatarkasti:**
*"…as many as 50,000 slaves passed annually through the port."*
**Lähde ("Tippu Tip's House"), sanatarkasti:**
*"It is the house where the powerful merchant and slave trader Tippu
Tip (1837–1905) lived."*

**Ratkaisu:** orjakauppa kerrotaan **suoraan ja lähteen sanoin**, koska
se on tämän kaupungin historian ydin ja koska vuoden 1873 sopimus on
lehden 1873-kehys. Se kerrotaan **tapahtumina ja lukuina, ei
yksityiskohtia korostaen**: satama, luku, sopimus, torin sulkeminen ja
katedraalin peruskivi. Tippu Tip nimetään lähteen sanoin
orjakauppiaaksi. Kunnioitus-pilarin mukaisesti kerronta ei ole
seikkailullista eikä kaunistelevaa.

**Nostojen työnjako, jotta orjakauppa ei toistu kahdesti:** nosto S3
kertoo vuoden 1873 sopimuksesta, Malindin satamasta ja Kristuksen
katedraalista; kohdekartan Tippu Tipin talo kertoo yhdestä ihmisestä
ja hänen talostaan. Eri asia, sama historia.

---

## G. TARKISTETUT LUVUT (kaikki löytyivät sanatarkasti)

| Väite | Lähde | Sanatarkka osuma |
| --- | --- | --- |
| Kirk uhkasi saarrolla ja Barghash allekirjoitti 1873 | Zanzibar | *"…in 1873, British consul Sir John Kirk threatened Majid's successor, Sultan Barghash, with a total blockade of Zanzibar, forcing Barghash to reluctantly sign the Anglo-Zanzibari treaty."* |
| Sopimus lakkautti orjakaupan ja sulki kaikki torit | Zanzibar | *"This abolished the slave trade, closed all slave markets, and protected liberated slaves in the Sultan's territories."* |
| Katedraalin peruskivi jouluna 1873, avattu jouluna 1879 | Christ Church, Zanzibar | *"…the foundation stone being laid on Christmas Day 1873 until the opening on Christmas 1879…"* |
| Alttari ruoskimispaalun paikalla | Christ Church, Zanzibar | *"The altar is said to be in the exact place where the main 'whipping post' of the market used to be."* — varaus **"sanotaan olevan"** säilytetään |
| Malindin sataman kautta jopa 50 000 vuodessa | Zanzibar | *"as many as 50,000 slaves passed annually through the port."* |
| Changuu: vankila valmis 1894, ei yhtään vankia | Changuu | *"Despite the prison buildings being completed in 1894… the facility never housed prisoners."* |
| Changuu nimettiin Quarantine Islandiksi 1923 | Changuu | *"…in 1923 the island was officially renamed Quarantine Island."* |
| Neljä kilpikonnaa 1919, 200 vuonna 1955 | Changuu | *"In 1919 the British governor of Seychelles sent a gift of four Aldabra giant tortoises…"*, *"…by 1955 they numbered around 200 animals."* |
| Kanta 100 (1988), 50 (1990), 7 (1996) | Changuu | *"By 1988 there were around 100 tortoises, fifty in 1990 and just seven by 1996."* |
| Salme syntyi 30.8.1844, 36 lapsen nuorin | Emily Ruete | *"…the youngest of the 36 children of Said bin Sultan…"* |
| Salme opetti itse itsensä kirjoittamaan | Emily Ruete | *"She secretly taught herself to write, a skill which was unusual for women in her culture at the time."* |
| Muistelmat 1886, ensimmäinen tunnettu arabinaisen omaelämäkerta | Emily Ruete | *"The book provides the first known autobiography of an Arab woman."* |
| Dhow: suuret ~30, pienet ~12 miehistön jäsentä | Dhow | *"Larger dhows have crews of approximately thirty and smaller ones typically around twelve."* |
| Sulivanin 1873 kirja, neljä rannikkodhow'ta | Dhow | *"In his 1873 book, Captain G. L. Sulivan described 'four different kinds of coasting dhows…'"* |
| Kiunguja on standardiswahili | Zanzibar, Languages | *"Kiunguja… has the status of Standard Swahili not only in Tanzania but also in other countries, where Swahili is spoken."* |
| Kivitalojen arkkitehtuuri paikallista kehitystä | Stone Town | *"According to Tom Middleton and Mark Horton, the architectural style of these stone houses have no Arab or Persian elements, and should be viewed as an entirely indigenous development…"* |
| Shangani perustettiin 1000-luvulla, oli vähäpätöinen | Stone Town | *"Shangani, the original fishing town that developed into Stone Town, was a small, largely unimportant Swahili site founded in the 11th century."* |
| Hamamni 1870–1888 Barghashille, käytössä 1920 asti | Hamamni Persian Baths | *"The Baths were built between 1870 and 1888 for sultan Barghash bin Said… and maintained this function until 1920."* |
| Vanha apteekki: tilattu 1887, valmis 1894 | Old Dispensary | *"The construction of the Old Dispensary was commissioned in 1887 by Tharia Topan…"*, *"…finally brought it to completion in 1894."* |
| Darajanin tori 1904, Bomanjee Maneckjee | Darajani Market | *"The main structure of the market was built in 1904 by Bomanjee Maneckjee, for Sultan Ali bin Hamud."* |

---

## H. KOORDINAATIT JA VÄLIT

Koordinaatit haettiin `list=geosearch`-rajapinnasta (keskipisteet
−6,1620 / 39,1885 ja −6,1620 / 39,1920, säteet 1 800 ja 3 500 m)
**7.9.2026**, ja kaikki **28 väliä** laskettiin haversinilla.

**Pienin väli 239 metriä** (Hamamnin kylpylä – Pyhän Joosefin
katedraali). Kaikki 28 väliä ovat yli 200 metrin.

**Kolme ehdokasta pudotettiin 200 metrin säännöllä:**
- Malindin moskeija — **155 m** vanhasta apteekista.
- Ijumaan moskeija — **95 m** vanhasta apteekista.
- Ihmeiden talo — **151 m** sulttaanin palatsista (ks. kohta D).

**Aihesyistä kartan ulkopuolelle:** Kristuksen katedraali (nosto S3),
vanha linnake (nosto S5), Forodhanin puisto (Tansanian maalehden
ruoka-aiheen nosto), Freddie Mercuryn syntymätalo
(`africa-questions.js`:n huomio).

**Rajaus:** lat −6,1665…−6,1575, lon 39,1855…39,2000 eli noin
**1,6 × 1,0 kilometriä**. Ruutu ulottuu Kivikaupungin rantakadulta
Creek Roadin yli Ngʼamboon.
