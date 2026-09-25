# Addis Abeban faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä
faktapohjan omiin sitaatteihin luotettu. Kiistanalaiset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina.
Koordinaatit haettiin itse (`prop=coordinates&redirects=1`) ja
kohdeparien etäisyydet laskettiin haversinilla.

Luetut artikkelit: **Addis Ababa**, **History of Addis Ababa**,
**Timeline of Addis Ababa**, **Mount Entoto**, **Addis Mercato**,
**Taytu Betul**, **Menelik II**, **Ethio-Djibouti Railways**,
**Addis Ababa Light Rail**, **Ethio-jazz**, **Mulatu Astatke**,
**Injera**, **Ethiopian cuisine**, **St. George's Cathedral, Addis
Ababa**, **Holy Trinity Cathedral, Addis Ababa**, **National Museum
of Ethiopia**, **Ethnological Museum, Addis Ababa**, **Menelik II
School**, **Hager Fikir Theatre**, **Taitu Hotel**, **Abrehot
Library**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään ja kohdan G korjaus viedään teksteihin.**
Yksi selvä epätarkkuus löytyi (G: injeran käymisaika). Muut ovat
Wikipedian sisäisiä ristiriitoja tai kalenterieroja.

---

## A. RISTIRIITA — milloin pääkaupunki siirtyi Entotolta

**Lähde 1 ("Addis Ababa", johdanto), sanatarkasti:**
*"Menelik II then formed his imperial palace in 1887."* ja
*"Addis Ababa became the empire's capital in 1889"*.

**Lähde 2 ("Timeline of Addis Ababa"), sanatarkasti:**
*"1891 – Ethiopian Empire capital relocated to Addis Ababa from
Entoto (approximate date)."*

**Ratkaisu:** kirjoittaja käyttää **pääartikkelin** lukuja (palatsi
1887, pääkaupunki 1889) ja kertoo siirtymän **vähittäisenä**, koska
aikajana itse merkitsee lukunsa likiarvoksi. Aikajanan lukua ei
mainita lehdessä; ero kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — Pyhän Yrjön katedraalin ikä

**Lähde 1 ("Timeline of Addis Ababa"), sanatarkasti:**
*"1896 – St. George's Cathedral built"*.

**Lähde 2 ("St. George's Cathedral, Addis Ababa"), sanatarkasti:**
*"The building was designed and built by the Italian engineer
Sebastiano Castagna in 1911."*

**Ratkaisu:** molemmat pitävät paikkansa eri asiasta: kirkko
perustettiin 1896 (myös "Addis Ababa" -artikkelin Architecture-osio
sanoo "founded in 1896"), ja **nykyinen rakennus** on vuodelta 1911.
Nähtävyysjuttu sanoo tämän ääneen kahtena virkkeenä.

---

## C. RISTIRIITA — Menelik II:n koulun perustamisvuosi

**Lähde 1 ("Timeline of Addis Ababa"), sanatarkasti:**
*"1906 – Telegraph office and Menelik II school established"*.

**Lähde 2 ("Menelik II School"), sanatarkasti:**
*"The school eponymously founded by Emperor Menelik II in October
1908 as a modern school, under guidance of Egyptian educator Hana
Salib and a number of Coptic teachers."* Sama artikkeli kertoo, että
Menelik antoi **1906** julistuksen, joka teki modernista
koulutuksesta luvallista.

**Ratkaisu:** juttu käyttää kouluartikkelin lukua **lokakuu 1908**
ja kertoo vuoden **1906 julistuksen** erikseen — se selittää
aikajanan luvun. Molemmat vuodet mainitaan, eikä kumpaakaan
esitetä toisen virheenä.

---

## D. RISTIRIITA — Taitu-hotellin rakennusvuosi (kalenteriero)

**Lähde 1 ("Taitu Hotel"), sanatarkasti:**
*"Built in 1905, it was founded by Empress Taitu Betul"*.

**Lähde 2 ("Addis Ababa", Architecture), sanatarkasti:**
*"Itegue Taitu Hotel, built-in 1898 (Ethiopian Calendar) in the
middle of the city (Piazza), was the first hotel in Ethiopia."*

**Lähde 3 ("Timeline of Addis Ababa"):** *"1907 … Itegue Taitu Hotel
in business"*.

**Ratkaisu:** ristiriita on näennäinen. Etiopian kalenteri on
7–8 vuotta jäljessä, joten **1898 EC = 1905/06**; aikajanan 1907 on
liiketoiminnan aloitus. Nähtävyysjuttu kertoo rakennusvuodeksi 1905
ja **selittää kalenterieron yhdellä virkkeellä** — se on samalla
lehden luonteva paikka kertoa 13 kuukauden kalenterista ilman että
minitehtävä koskee siihen (kalenteri on visassa).

---

## E. RISTIRIITA — uuden radan valmistuminen 2016 vai 2017

**Lähde 1 ("Addis Ababa", Railway), sanatarkasti:**
*"The new Addis Ababa-Djibouti Railway started operation in
September 2016, running parallel to the route of the original
railway line."*

**Lähde 2 ("Ethio-Djibouti Railways", johdanto):** uusi
sähköistetty normaaliraiteinen rata *"was completed in 2017"*.

**Ratkaisu:** lehti sanoo **liikenteen alkaneen 2016 ja radan
valmistuneen 2017** — molemmat luvut samassa virkkeessä. Kirjattu
lohkokommenttiin.

---

## F. TARKISTETTU JA OIKEIN — luvut, jotka on helppo kirjoittaa väärin

Nämä luettiin uudestaan lähteestä, koska ne ovat lehdessä
näkyvillä numeroina:

- **Korkeus 2 355 m**: `elevation_m = 2355` infolaatikossa ja
  Geography-osiossa `{{convert|2355|m}}`. Bolen lentoasema
  **2 326 m**, Entoton suunta **yli 3 000 m**. Entoto-artikkeli
  antaa huipuksi **3 200 m**.
- **Väkiluku 6 287 000 (2025)** infolaatikosta; aikajanan mukaan
  **15 000 (1889)** ja **80 000 (1930)**.
- **Merkato: 13 000 työntekijää, 7 100 yritystä**, "largest
  open-air market in Africa" — "Addis Mercato", Overview.
- **Rata: 784 km, rakennettu 1897–1917, kansallistettu 1909,
  kuusi viikkoa karavaanilla** — "Ethio-Djibouti Railways",
  Overview.
- **Pikaraitiotie: avattu 20.9.2015, 31,6 km, 39 asemaa, lippu
  2–6 birriä, oranssit kioskit, 475 M USD, 113 500 matkustajaa
  tammikuussa 2016** — "Addis Ababa Light Rail", johdanto ja
  Overview.
- **Mulatu Astatke: s. 19.12.1943 Jimma, Britanniaan 1959
  16-vuotiaana, Berkleeen 1963 koulun ensimmäisenä afrikkalaisena
  opiskelijana, paluu Addis Abebaan 1969, Éthiopiques-sarja alkoi
  1998 ja 29 osaa vuoteen 2014 mennessä** — "Mulatu Astatke".
- **Sää: yksikään kuukausi ei ylitä 22 °C:n keskilämpötilaa;
  kuivan kauden päivälämpötila enintään 23 °C ja yöt 5–10 °C;
  helmi–toukokuun yöt 10–15 °C; ennätykset 30,6 °C (26.2.2019) ja
  0 °C** — "Addis Ababa", Climate (luvut `convert`-mallineista,
  jotka tarkistettiin raakatekstistä erikseen).
- **Abrehot: avattu tammikuussa 2022, 19 000 m², 1,5 km hyllyä,
  1,4 miljoonaa kirjaa, yli 2 000 kävijää, yli 1,1 miljardia
  birriä, auki ympäri vuorokauden** — "Abrehot Library".

---

## G. KORJAUS — injeran käymisaika oli faktapohjassa epätarkka

**Faktapohjan luonnos sanoi:** taikina käy "useita päiviä".

**Lähde ("Injera", Fermentation), sanatarkasti:**
*"The dough undergoes a primary fermentation for 24 to 72 hours."*
Toisen vaiheen käyminen absitin lisäämisen jälkeen kestää
*"30–120 minutes"*.

**Ratkaisu:** lehti sanoo **24–72 tuntia**, ei "useita päiviä".
Samalla lisätään lähteen tarkat yksityiskohdat, jotka tekevät
nostosta konkreettisen: hapate **ersho**, sidosaine **absit**,
savinen paistolevy **mitad** kuumennettuna **90–95 °C**:seen,
taikina kaadetaan **spiraalina ulkoa sisäänpäin**, paistoaika
**2–4 minuuttia**, leipää **ei käännetä**, ja höyry tekee pintaan
kuplat eli **"silmät"**. Injera säilytetään **mesob**-korissa.

---

## H. TARKISTETTU — kahviseremonian sanasto

**Lähde ("Ethiopian cuisine", Coffee), sanatarkasti:**
*"A complete ceremony has three rounds of coffee (abol, tona and
bereka) and is accompanied by the burning of frankincense."* Pannu on
**jebena**, kupit **si'ni**, ja paahtaja kiertää huoneen savun
kanssa. Kolo eli paahdettu ohra tai popcorn tarjotaan kahvin kanssa.

**Huomio kirjoittajalle:** kierrosten nimissä kolmas on **bereka**
(ei "baraka"). Kirjoita lähteen muoto.

---

## I. KOORDINAATIT JA ETÄISYYDET — laskettu uudelleen

Kaikki kahdeksan koordinaattia haettiin `prop=coordinates`
-rajapinnasta 7.9.2026, ja kaikki 28 kohdeparin etäisyyttä
laskettiin haversinilla. **Pienin väli on 360 m** (Hager Fikir –
Pyhän Yrjön katedraali), seuraavat **388 m** (kansallismuseo –
Menelik II:n koulu) ja **460 m** (Kolminaisuuden katedraali –
Abrehot-kirjasto). **Kaikki selvästi yli 200 metrin säännön.** Rajaus (pohjoinen 9,0500 /
etelä 9,0270 / länsi 38,7460 / itä 38,7690) kattaa kaikki
kahdeksan reunoihin osumatta.

**Kartalta jätettiin pois** Africa Hall (9,0147) ja Meskel-aukio
(9,0103): ne olisivat venyttäneet ruudun 4,5 kilometriä korkeaksi ja
alle kolmen kilometrin levyiseksi. Molemmat kerrotaan matkaoppaassa.
Merkato (9,0306 / 38,7389) on lehden noston aihe eikä siksi
numeroitu kohde; se jää myös ruudun länsipuolelle.

---

## J. SISÄLTÖRAJAUS — tarkistettu erikseen

Luin ETH-maalehden faktapohjan ja `maa-kategoriat.js`:n ETH-lohkon
otsikkotasolla: kaupunkilehden aiheista **yksikään ei toistu**
maalehdessä. Kahvi, injera leipänä, ethio-jazz, Merkato, eukalyptus,
rata ja pikaraitiotie ovat kaikki maalehden ulkopuolella; maalehti
kertoo tefistä viljana ja watista pataruokana, ei injerasta
ateriatapana.

**Nykypolitiikka:** kaupunkiartikkelin osiot "2014 Addis Ababa
Master Plan", "Recent history", "The Derg administration",
"Federal Democratic Republic" ja "Relation with Oromia Regional
State" sekä miehityksen kaasusodankäynti ja teloitukset **jäävät
kokonaan pois**. Tämä tarkistettiin kohta kohdalta.

**Pilari 4 (ei kaunistelua):** kaupungin perustamisen yhteydessä
kerrotaan suoraan, että paikallisilta oromoheimoilta takavarikoitiin
maat ja monet joutuivat siirtymään ("The local Oromo tribes had
their lands confiscated and many were displaced"), ja että Merkato
syntyi miehityshallinnon erottelupolitiikasta ("the present Addis
Merkato was founded by the segregationist policies of the Italian
occupational government"). Kumpaakaan ei pehmennetä.
