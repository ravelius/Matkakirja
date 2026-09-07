# Kanon faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet ladattiin ja luettiin uudelleen alkuperäisistä tiedostoista
eikä faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina.
**Kaikki 28 kohdeparin etäisyyttä laskettiin itse haversinilla.**

Luetut artikkelit: **Kano (city)**, **Kano Chronicle**,
**Kano Emirate**, **Dalla Hill**, **Kurmi Market**, **Gidan Rumfa**,
**Great Mosque of Kano**, **Gidan Makama Museum Kano**,
**Ancient Kano City Walls**, **Gates of Hausa kingdoms**,
**Kofar Mata Dye Pits**, **Muhammad Rumfa**, **Durbar festival**,
**Morocco leather**, **Hausa architecture**, **Trans-Saharan trade**,
**Sokoto Caliphate**, **Heinrich Barth**, **Sabon Gari**,
**Sabon Gari Market**, **Sani Abacha Stadium**, **Kano Pillars
F.C.**, **Fagge**, **Kano State**, **Bayero University Kano**,
**Hausa-language cinema**, **Harmattan**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–G ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kaksi kohtaa on
Wikipedian sisäisiä ristiriitoja, kaksi lähteen omia merkintöjä
(`citation needed` / `clarify`), yksi on koordinaattiristiriita, joka
pakottaa pudottamaan kohteen kartalta, ja kaksi on sisältölinjauksia.

---

## A. RISTIRIITA — milloin Kanon muuri valmistui

**Lähde 1 ("Kano (city)", Founding and Bagauda dynasty),
sanatarkasti:**
*"His grandson Gijimasu (1095–1134), the third king, began building
city walls (badala/ganuwa) at the foot of Dala Hill. His own son,
Tsaraki (1136–1194), the fifth king, completed them during his
reign."*

**Lähde 2 (SAMA ARTIKKELI, Fortifications), sanatarkasti:**
*"The Ancient Kano City Walls were built as a defensive wall with the
construction of the foundation laid by Sarki Gijimasu (r. 1095–1134)
… In the mid 14th century during the reign of Zamnagawa, the wall was
completed before it was further expanded during the 16th century."*

**Kanon kronikan kuningasluettelo:** Osumanu Zamnagawa 1343–1349 —
eli toinen valmistumisajankohta on **kaksisataa vuotta myöhempi**
kuin ensimmäinen.

**Ratkaisu:** **molemmat kerrotaan, kumpaakaan ei valita.** Nosto
sanoo, että perustuksen laski Gijimasu ja että valmistumisesta on
kaksi versiota — poika Tsaraki 1100-luvulla tai Zamnagawa
1300-luvun puolivälissä. Ratkaisu kirjataan lohkokommenttiin
(ennakkotapaus: Sansibarin pääkaupungin siirtovuosi).

---

## B. LÄHTEEN OMA MERKINTÄ — Dala-kukkulan korkeus

**Lähde ("Dalla Hill"), sanatarkasti:**
*"It is {{convert|1753|ft|order=flip}} high and contains a stairway
with 101 steps to the bottom to top.{{clarify|reason=Should be above
sea level if just 101 steps. So how high above whatever it stands on?
|date=August 2024}}"*

Eli **artikkeli itse merkitsee luvun epäselväksi**: 1 753 jalkaa
(534 m) ei voi olla korkeus maanpinnasta, jos portaita on 101.
OSM:n oma korkeusarvo samalle kohteelle on `ele=534` lähteellä
"Wikipedia" — sama luku, sama epäselvyys.

**Ratkaisu:** korkeuslukua **ei anneta metreinä nousuna**. Juttu
sanoo, että kukkula kohoaa **534 metriin merenpinnasta** ja että
**huipulle nousee 101 porrasta** — kaksi eri asiaa, kumpikin
lähteen sanoin. Epäselvyys kirjataan lohkokommenttiin.

---

## C. LÄHTEEN OMA MERKINTÄ — Barthin arvio orjuutettujen osuudesta

**Lähde ("Kano (city)", Kano under the Sokoto Caliphate),
sanatarkasti:**
*"He also called Kano the greatest emporium of central Africa and
estimated the percentage of slaves in Kano to be at least 50%, most
of whom lived in slave villages. This was one of the last major slave
societies, with high percentages of enslaved population long after
the Atlantic slave trade had been cut off.{{Citation needed
|date=June 2022}}"*

**Ratkaisu:** orjuus **kerrotaan**, koska pois jättäminen olisi
Perustuslain pilarin 4 vastaista kaunistelua — mutta **lähteen
varauksella ja ilman prosenttilukua**: nosto sanoo, että Barth
arvioi suuren osan kaupungin väestöstä olleen orjuutettuja ja että
Wikipedia merkitsee arvion lähteettömäksi. Yksityiskohtia ei
korosteta. Sama ratkaisu Kurmin torin orjatorimenneisyydelle
(yksi lause, lähteen sanoin).

---

## D. TARKISTETTU — värjäämökuoppien ikä

**Lähde ("Kofar Mata Dye Pits"), sanatarkasti:**
*"The origins of the Kofar Mata Dye Pits are commonly traced back
more than 500 years…"* — täsmähaku `more than 500 years` ✔.

**Pelin oma vanha teksti** (`js/packs/africa-kulttuuri.js`, `kano`)
ja **kulttuurivisa** sanovat **"1400-luvulta asti"** ja
**"yli viisisataa vuotta"**. Sanaa "1498" ei esiinny artikkelissa
lainkaan; se esiintyy vain erään Commons-kuvan tiedostonimessä
("Kofar Mata Dye Pit since 1498.jpg"), joka **ei ole lähde**.
"Sanusi Lamido Sanusi" -artikkeli puhuu **1300-luvun** kuopista.

**Ratkaisu:** lehti sanoo **"yli viisisataa vuotta"** ja
**"1400-luvulta"** — nämä ovat yhteensopivia keskenään ja pelin
oman visan kanssa. **Vuosilukua 1498 ei käytetä missään.**
1300-lukua ei käytetä, koska se on toisen artikkelin sivulause.

---

## E. TARKISTETUT LUVUT (ei huomautettavaa)

| Väite | Lähde | Täsmähaku |
| --- | --- | --- |
| Barth 1851: 10 mailin, 30 jalan muuri, 30 000 asukasta | Kano (city) | ✔ |
| "greatest emporium of central Africa" | Kano (city) | ✔ |
| Nälänhädät … 1863, 1873, 1884 … | Kano (city) | ✔ |
| "Manchester of Nigeria", 1903 | Kano (city) | ✔ |
| Muuri 30–50 jalkaa korkea, ~40 jalkaa paksu, 15 porttia | Ancient Kano City Walls | ✔ |
| Kanolla 15 porttia | Gates of Hausa kingdoms | ✔ |
| Lugard 1903: "never seen anything like it in Africa" | Kano (city) | ✔ |
| Leo Africanus: "wealthy merchants and skilled craftsmen" | Kano (city) | ✔ |
| Strutsinsulkakengät, kakaki, Auwa ensimmäisenä naispuolisena Madakina | Kano (city) | ✔ |
| Gidan Rumfa 33 eekkeriä, muurit jopa 15 jalkaa | Gidan Rumfa | ✔ |
| Kofar Kudun rakensi Abdullahi Maje Karofi 1800-luvun jälkipuoliskolla | Gidan Rumfa | ✔ |
| Gidan Makamassa 11 galleriaa | Gidan Makama Museum Kano | ✔ |
| Suurmoskeija Nigerian vanhin; siirretty 1582 (Muhammad Zaki) | Great Mosque of Kano | ✔ |
| Sabon Garin tori rakennettu 1914, avattu 1915, uusittu 1983 | Sabon Gari Market | ✔ |
| Cantonments Proclamation 1914 | Sabon Gari | ✔ |
| Sani Abachan stadion 16 000 paikkaa | Sani Abacha Stadium | ✔ |
| Durbar UNESCOn listalle joulukuussa 2024 | Durbar festival | ✔ |
| Marokkonahan paras laatu vuohennahkaa Kanosta, Katsinasta ja Zazzausta | Morocco leather | ✔ |

---

## F. KOORDINAATTIRISTIRIITA — Kurmin tori pudotetaan kartalta

**Havainto:** kolme en-Wikipedian artikkelia antaa Kanon vanhan
kaupungin kohteille pisteitä, jotka eivät voi kaikki olla oikein.

| Kohde | artikkelin `{{coord}}` | Wikidatan `P625` |
| --- | --- | --- |
| Gidan Rumfa | 11.99472 / 8.51750 | 11.99230 / 8.51600 |
| Great Mosque of Kano | 11.99472 / 8.51750 | 11.99486 / 8.51764 |
| Kurmi Market | 11.99230 / 8.51600 | 12.00000 / 8.51667 |

Eli **palatsin ja suurmoskeijan artikkelikoordinaatit ovat
täsmälleen samat**, ja **Kurmin torin artikkelikoordinaatti on
täsmälleen sama kuin Wikidatan Gidan Rumfa**. Wikidatan Kurmi-arvo
(12.0 / 8.516667) taas on kaupungin oma karkea keskipiste, jonka
jakaa yhdeksän muuta kohdetta (mm. "Kano", "Kano Emirate",
"Kingdom of Kano").

**Overpassista tarkistettu (OSM, 7.9.2026):** vanhassa kaupungissa
**ei ole yhtään nimettyä Kurmi-kohdetta**; sen sijaan
suurmoskeijalle löytyy piste 11.994855 / 8.517640 (sama kuin
Wikidatalla, 2 metrin päässä), Dala-kukkulalle 12.009305 / 8.506974
(3 metrin päässä Wikidatasta), Kofar Matan portille 12.000829 /
8.526376 (31 metrin päässä värjäämökuoppien Wikidata-pisteestä) ja
emiirin palatsin viisi rakennussolmua välillä 11.98868–11.99467 /
8.5167–8.5208, joiden keskellä Wikidatan 11.9923 / 8.5160 on.

**Ratkaisu:**
1. **Suurmoskeija ja Gidan Rumfa otetaan kartalle Wikidatan
   arvoilla**, koska ne ovat keskenään erilliset (335 metriä) ja
   OSM vahvistaa moskeijan pisteen kahden metrin tarkkuudella.
   Artikkelien identtinen pistepari hylätään.
2. **Kurmin tori pudotetaan kartalta kokonaan**, koska sille ei ole
   yhtään luotettavaa koordinaattia. Se kerrotaan **teemasivun
   nostona**, jolloin koordinaattia ei tarvita.
3. **Kofar Nassarawan portin koordinaatti otetaan OSM:stä**
   (11.990889 / 8.530678). Portilla ei ole omaa
   en-Wikipedia-artikkelia eikä koordinaattia; sen tiedot tulevat
   artikkeleista "Gates of Hausa kingdoms" ja "Ancient Kano City
   Walls", ja OSM antaa paikan. Ennakkotapaus: Persepoliksen
   Kaikkien kansojen portti ja Kabulin Chihil Sutun, joissa
   koordinaatti haettiin Overpassista, kun artikkelin oma arvo ei
   kelvannut (`tools/piirra-kaupunkikartta.mjs`).

---

## G. KARTTAMITTAUS — kahdeksan kohdetta ja 28 väliä

| Kohde | lat | lon | lähde |
| --- | --- | --- | --- |
| Sabon Garin tori | 12.015400 | 8.539900 | artikkeli |
| Dala-kukkula | 12.009280 | 8.506980 | Wikidata (OSM vahvistaa) |
| Kofar Matan värjäämökuopat | 12.000853 | 8.526099 | Wikidata |
| Sani Abachan stadion | 11.999722 | 8.529167 | artikkeli |
| Kanon suurmoskeija | 11.994855 | 8.517640 | Wikidata (OSM vahvistaa) |
| Gidan Rumfa | 11.992300 | 8.516000 | Wikidata |
| Kofar Nassarawan portti | 11.990889 | 8.530678 | OSM |
| Gidan Makaman museo | 11.988802 | 8.521058 | Wikidata |

**Mittaustulos:** 28 väliä, **pienin 335 metriä** (suurmoskeija –
Gidan Rumfa). Toiseksi pienin 357 m (Kofar Mata – stadion).
**Kaikki ylittävät 200 metrin vähimmäisvälin.** Kohteiden ala on
2,96 × 3,58 km — pelin väljempiä kohdekarttoja, ja syy on
kaupungin oma mittakaava: Barthin mukaan muuri oli noin kymmenen
mailia pitkä, joten vanhakaupunki yksinään on kilometrejä leveä.

**Kohdekartta ei toista lehden juttuja.** Lehti kertoo Kanon
kronikasta, islamin tulosta ja sultanaatista, Rumfan vuosisadasta,
vuodesta 1873 ja durbarista; teemasivu Kurmin torista,
marokkonahasta, maapähkinästä ja rautatiestä sekä hausasta
kauppakielenä. Rajapinnat on hoidettu näin:
- **Rumfan nosto ei kerro palatsista eikä torista rakennuksina** —
  ne ovat kartan ja teemasivun aiheita.
- **Durbar-nosto mainitsee Kofar Kudun ja Babban Dakin reittinä**,
  mutta palatsin oma juttu kertoo rakennuksen.
- **Kronikkanosto kertoo käsikirjoituksesta, kääntäjistä ja
  kuningasluettelosta**; **yhdentoista klaanin ennustus ja Barbushe
  ovat Dala-kukkulan jutun aihe**, ei noston.
- **Teemasivun kauppanosto mainitsee indigokankaan kauppatavarana**;
  **värjäämökuoppien menetelmä ja historia ovat kartan juttu.**

---

## H. SISÄLTÖLINJAUKSET

1. **Nykykonfliktit jätetään pois kokonaan.** Lähteissä on Boko
   Haramin iskuja, vuoden 1980 Maitatsine-mellakka (yli 4 000
   kuollutta), 1953 ja 1966 väkivalta sekä sharia-lain käyttöönotto
   2000-luvulla. **Mitään näistä ei kerrota** — sama linjaus kuin
   Aleppossa ja Bagdadissa (Raamattu: ei nykysotaa, ei
   nykypolitiikkaa). Suurmoskeijan juttu päättyy 1950-luvun
   jälleenrakennukseen; durbar-nosto kertoo vuoden 2012 perumisen
   syyksi vain emiirin terveyden, kuten lähde ensin sanoo, eikä
   toista analyytikkojen arviota.
2. **Emiirikunnan jakaminen neljäksi 2019 ja siihen liittyvä
   oikeuskiista jätetään pois** — nykypolitiikkaa.
3. **Sabon Garin juttu päättyy vuoden 1983 uudisrakennukseen** eikä
   käsittele vuoden 1966 väkivaltaa tai nykyisiä jännitteitä.
   Siirtomaa-ajan asuinaluejako kerrotaan tapahtumana neutraalisti
   (Cantonments Proclamation 1914, kaupungin neljä osaa), ei
   kaunisteltuna eikä osapuolikehyksellä.
4. **Uutisosio:** Nigerialla on uutislähde `uutislahteet.js`:ssä
   eikä sitä muuteta; Kano ei kuulu Venäjä-tyyppisen poikkeuksen
   piiriin.

---

## I. PIENET HUOMIOT

1. **Artikkelin nimi on "Kano (city)"**, ja pelin `city.wiki` on
   `Kano`. Suora haku `Kano` ohjautuu täsmennyssivulle, joten
   `africa-artikkelit.js`:n avain on **`Kano`** kuten ennenkin —
   avainta ei muuteta.
2. **Dala vai Dalla:** artikkelin otsikko on **"Dalla Hill"**,
   mutta Kanon oma artikkeli linkittää muodolla **"Dala Hill"**, ja
   OSM:n nimi on **Dala Hill**. Suomeksi käytetään muotoa
   **Dala-kukkula** ja mainitaan, että kaupunki tunnettiin
   aiemmin nimellä **Dala**.
3. **Kurmin torin perustamisvuosi:** artikkeli sanoo vain
   "1400-luvulla", mutta sen lähdeteoksen nimi on *"A History of
   Kurmi Market, Kano **1463**–1999"*. Lehti sanoo **"1400-luvulla,
   ja lähdeteos ajoittaa alun vuoteen 1463"** — ei pyöristetä
   kumpaakaan pois.
4. **Muhammad Rumfan nimen kirjoitusasu vaihtelee** lähteissä
   (Rumfa / Rimfa / Rumfa dan Yakubu). Käytetään muotoa **Rumfa**,
   joka on sekä artikkelin otsikko että palatsin nimi.
5. **Kano State -artikkelia ei käytetä lehden väitteisiin**: se on
   osavaltion artikkeli ja sisältää runsaasti nykypolitiikkaa.
