# Whitehorsen faktapohjan tarkistus

Tarkistettu **7.9.2026** en-Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, uusinnat kasvavalla
viiveellä). Tarkistus on **menetelmällisesti erillinen vaihe**:
lähteet luettiin uudelleen alkuperäisistä latauksista eikä faktapohjan
omiin sitaatteihin luotettu. Kiistanalaiset ja numeeriset väitteet
haettiin `grep -o` -täsmähaulla sanatarkkoina merkkijonoina.
Koordinaatit haettiin itse (`list=geosearch`) ja kaikki 28 kohdeparin
etäisyyttä laskettiin itse haversinilla.

Luetut artikkelit: **Whitehorse**, **Yukon**, **Canyon City, Yukon**,
**White Horse Rapids**, **Miles Canyon Basalts**, **Schwatka Lake**,
**White Pass and Yukon Route**, **SS Klondike**, **Klondike Gold
Rush**, **Yukon Quest**, **Kwanlin Dün First Nation**, **Ta'an
Kwach'an Council**, **MacBride Museum of Yukon History**, **Diocese of
Yukon**, **Christ Church Cathedral (Whitehorse)**, **Yukon Legislative
Building**, **Riverdale, Whitehorse**, **Downtown Whitehorse**, **Erik
Nielsen Whitehorse International Airport**, **Whitehorse Waterfront
Trolley**, **Yukon Transportation Museum**, **Yukon Beringia
Interpretive Centre**, **Alaska Highway**, **The Cremation of Sam
McGee**, **Chinook salmon**, **Yukon River**.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Asiavirheitä ei löytynyt. Yksi kohta on
Wikipedian sisäinen ristiriita, yksi on kahden artikkelin
tarkkuusero, yksi on linjauskysymys, yksi on infolaatikon ja
leipätekstin ero, ja kaksi ovat kohdekartan omia sääntöjä.

## Täsmähaut, jotka menivät läpi sanatarkasti

Kaikki alla olevat merkkijonot löytyivät haetusta raakatekstistä
sellaisenaan (artikkeli suluissa):

- `driest city`, `warmest place in the Yukon`, `141.8|cm`,
  `160.9|mm`, `-56.2|C`, `35.6|C`, `20.6|C`, `-19.2|C`, `0.2|C`,
  `kilometre 1426`, `28,201`, `April 1, 1953`, `March 21, 1957`,
  `Closeleigh`, `May 23, 1905`, `$300,000` (Whitehorse)
- `Nearly 300 boats`, `three [[Canadian dollar|cents]] per pound`,
  `eight kilometers (five miles)` (Canyon City, Yukon)
- `~8.4 million years old` (Miles Canyon Basalts)
- `three bulldozers`, `eight tons of [[Colgate-Palmolive|Palmolive]]
  soap`, `24 June 1967` (SS Klondike)
- `longest freshwater migration route of any salmon`,
  `over {{convert|3000|km` (Chinook salmon — sama väite kuin
  Schwatka Lake -artikkelissa, eli kaksi riippumatonta osumaa)
- `1,000-mile`, `1016|mi`, `February 25, 1984`, `Sonny Lindner`
  (Yukon Quest)
- `running water through canyon`, `February 19, 2005`,
  `1042&nbsp;km` (Kwanlin Dün First Nation), `in 2002`
  (Ta'an Kwach'an Council)

---

## A. RISTIRIITA — Closeleigh

**Lähde 1 ("Whitehorse", History), sanatarkasti:** *"…there was an
attempt by the railway people to change the name to Closeleigh
(British Close brothers provided funding for the railway), this was
refused by [[William Ogilvie (surveyor)|William Ogilvie]], the
territory's Commissioner."*

**Lähde 2 ("Miles Canyon Basalts", johdanto), sanatarkasti:** *"Thus,
the Miles Canyon Basalts are the reason for the establishment of the
townsite of Closeleigh, eventually the City of Whitehorse."*

**Ratkaisu:** kirjoittaja seuraa **Whitehorse-artikkelia**, joka on
aiheessa tarkempi ja nimeää sekä rahoittajat että kieltäytyneen
komissaarin. Geologia-artikkelin muotoilu on ohimennen kirjoitettu
eikä se kiistä nimen torjumista. Nosto W4 kertoo yrityksen ja sen
torjumisen; Closeleighia ei esitetä kaupungin nimenä.

---

## B. TARKKUUSERO — kuinka moni vene tuhoutui koskissa

**Lähde 1 ("Whitehorse", History):** *"By June 1898, there was a
bottleneck of prospectors at Canyon City, and many boats had been lost
to the rapids as well as five people."*

**Lähde 2 ("Canyon City, Yukon", 1898 The Gold Rush):** *"By June
1898, a huge bottleneck had developed at Canyon City. Nearly 300 boats
had been wrecked in the rapids, and five people had drowned."*

Molemmat antavat viisi hukkunutta; vain jälkimmäinen antaa veneiden
määrän. **Ratkaisu:** käytetään Canyon Cityn tarkempaa lukua
("lähes 300 venettä ja viisi hukkunutta") samassa virkkeessä, ja
Steelen sitaatti — joka on molemmissa artikkeleissa sanatarkasti sama
— kerrotaan epäsuorasti eikä lainausmerkeissä, koska se on
englanninkielinen.

---

## C. LINJAUSKYSYMYS — vuoden 1905 palon sivuhenkilö

**Lähde ("Whitehorse", History):** palon tuhoamista rakennuksista
mainitaan yksi, jonka toinen perustaja oli myöhemmin tunnetuksi
tulleen yhdysvaltalaisen liikemiessuvun jäsen.

**Ratkaisu:** **jätetään kokonaan pois.** Maininta veisi lehden
nykypolitiikkaan, joka on kielletty (spec-mantereet, kohta 3), eikä
se lisää mitään Whitehorsen tarinaan. Palo itsessään on tavallista
kaupunkihistoriaa ja kerrotaan: päivämäärä, alkukohta, veden
loppuminen, vahingot ja se, ettei kuolonuhreja tullut.

---

## D. INFOLAATIKON JA LEIPÄTEKSTIN ERO — SS Klondike II

**Infolaatikko:** *in service … 1937–1955 (Klondike II)*.
**Leipäteksti:** *"They ran freight between Whitehorse and Dawson
City … the second … from 1937 to 1950"* ja *"The venture shut down in
1955"* (risteilykäyttö).

**Ratkaisu:** kerrotaan **leipätekstin mukaan**: rahtia 1950-luvun
alkuun, sitten risteilyalus, ja toiminta loppui 1955. Näin molemmat
luvut ovat mukana ilman ristiriitaa. Kohde on kohdekartan juttu, ei
lehden nosto.

---

## E. KOHDEKARTAN SÄÄNTÖ — minitehtävä ja kysymyspakka

Kaupungin viisi kysymystä (`js/packs/northamerica-questions.js`,
`whitehorse`) luettiin: Yukonin pääkaupunki, Klondiken kulta,
Yukonjoki, Chilkootin sola ja jokireitti, Yukonjoen pituus.

**Minitehtävä kysyy, miksi Whitehorse on Kanadan kuivin kaupunki**
(vastaus: Rannikkovuorten sadevarjo). Aihe ei ole yhdessäkään
kysymyksessä, ja vastaus löytyy **saman sivun** nostosta
"Kanadan kuivin kaupunki". Molemmat vaatimukset täyttyvät.

---

## F. KOHDEKARTAN SÄÄNTÖ — etäisyydet ja aihepäällekkäisyys

Kaikki 28 väliä laskettiin haversinilla itse. **Pienin on 366 metriä**
(Yukonin liikennemuseo – Beringia-keskus), seuraavat 368 m ja 387 m.
Kahdensadan metrin sääntö ei siis ole lähelläkään rajaa, eikä
`tools/tarkista-karttapisteet.mjs` löydä päällekkäisiä
numeroympyröitä.

**Pudotetut:**
- *Downtown Whitehorse* (60.7203 / −135.0527) on 105 metriä
  MacBride-museosta.
- *Whitehorse Waterfront Trolley* (60.7217 / −135.051) on 75 metriä
  samasta.
Molemmat kerrotaan matkaoppaan ensimmäisessä ja toisessa jaksossa.

**Aihepäällekkäisyys tarkistettiin ristiin:** lehden viisi nostoa
(Kwanlin Dün, vuosi 1873, kosket ja kanjoni, rautatie ja Closeleigh,
Robert Service) ja teemasivun viisi nostoa (kalaporras, ilmasto,
Yukon Quest, kolme vuorta, Alaska Highway) eivät koske yhtäkään
kartan kahdeksasta kohteesta. Miles Canyon ja Canyon City ovat
lehden aiheita ja siksi kartan ulkopuolella myös maantieteellisesti
(6,4 ja 7,2 km).

---

## Huomio lähteen tasosta: MacBride-museo

Väite siitä, että museo sisältää kaupungin alkuperäisen
lennätinkonttorin, on artikkelissa **kuvatekstissä**, ei
leipätekstissä (`[[File:The_MacBride_Museum_of_Yukon_History_
incorporates_the_original_Whitehorse_telegraph_office…]]`). Se on
kirjattu tähän, koska kuvateksti on heikompi lähde kuin leipäteksti.
Väite kerrotaan silti, koska se on Wikipedian omassa aineistossa ja
sen sisältö on tarkistettavissa tiedostosivulta; jos päätoimittaja
haluaa, virke voidaan poistaa kohdekartan jutusta ilman että juttu
muuttuu.

## Huomio lähteen tasosta: Kanadan kuivin kaupunki

Väite on Whitehorse-artikkelin Climate-osiossa muodossa *"According to
the [[Meteorological Service of Canada]], Whitehorse has the
distinction of being Canada's driest city."* — eli **lähde on nimetty
artikkelissa itsessään**, ja lehti nimeää sen samalla tavalla eikä
esitä väitettä omanaan.
