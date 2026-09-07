# Monterreyn faktapohjan tarkistus

Tarkistettu **7.9.2026** Wikipedian raakateksteistä
(`index.php?action=raw`, `NODE_USE_ENV_PROXY=1`, User-Agent
`Matkakirja/1.0 (https://github.com/ravelius/Matkakirja)`). Tarkistus
on **menetelmällisesti erillinen vaihe**: lähteet luettiin uudelleen
alkuperäisistä latauksista eikä faktapohjan omiin sitaatteihin
luotettu. Kaikki riidanalaiset luvut haettiin `grep -o` -täsmähaulla
sanatarkkoina merkkijonoina. Koordinaatit haettiin itse (en- ja
es-Wikipedian `prop=coordinates` sekä Nominatim), ja **kaikki 28
kohdeparin etäisyyttä laskettiin itse haversinilla** omalla
skriptillä.

Luetut artikkelit **en**: Monterrey, Cerro de la Silla, Macroplaza,
Faro del Comercio, Cerro del Obispado, Barrio Antiguo, Monterrey
Cathedral, Battle of Monterrey, Fundidora Park, Grutas de García,
Museo de Arte Contemporáneo de Monterrey, Cabrito, Machaca, Cerro de
Chipinque, Cumbres de Monterrey National Park, Santiago Vidaurri,
Nuevo León, Cuauhtémoc Moctezuma Brewery.
Luetut artikkelit **es**: Museo del Obispado, Iglesia de la Purísima
(Monterrey), Colegio Civil, Museo del Palacio de Gobierno, Museo de
Historia Mexicana, Capilla de los Dulces Nombres, Catedral
metropolitana de Monterrey, Macroplaza, Museo Metropolitano de
Monterrey.

**Yleisarvio: faktapohja kelpaa kirjoituksen pohjaksi, kun kohtien
A–F ratkaisut tehdään.** Asiavirheitä ei löytynyt. Kolme kohtaa on
Wikipedian sisäisiä ristiriitoja, yksi on lähteen heikko kohta, yksi
etäisyystarkistuksen tulos ja yksi linjauskysymys.

---

## A. RISTIRIITA — mistä nimi Monterrey tulee

**Lähde 1 ("Monterrey", Etymology), sanatarkasti:** *"The city is
named after Gaspar de Zúñiga, 5th Count of Monterrey, who was viceroy
of New Spain from 1595 to 1603. His family originated in Monterrei,
Galicia, Spain."*

**Lähde 2 ("Monterrey", Geography), sanatarkasti:** *"Monterrey
translated literally from Spanish to English is 'King Mount' or 'King
Mountain', and folk etymology claims that this refers to the city's
topography and the large mountains that surround it (actually, the
city was named after the wife of Gaspar de Zúñiga, 5th Count of
Monterrey)."*

Sama artikkeli sanoo siis kahdessa osiossa, että kaupunki on nimetty
kreivin mukaan ja että se on nimetty kreivin **vaimon** mukaan.
Etymology-osiolla on lähdeviite (Longman Pronunciation Dictionary ja
sitä seuraavat viitteet); Geography-osion sulkuhuomautuksella ei ole
lähdettä.

**Ratkaisu:** lehti käyttää **Etymology-osiota** (kreivi ja Galician
Monterrei). Kansanetymologia "kuningasvuori" saa jäädä nostoon, mutta
**nimenomaan kansanetymologiana** ("nimi näyttää tarkoittavan
kuningasvuorta, mutta…"). Vaimo-versio jätetään pois, ja ero
kirjataan lohkokommenttiin.

---

## B. RISTIRIITA — Macroplazan koko maailman aukioiden joukossa

**Lähde 1 ("Monterrey", Landmarks), sanatarkasti:** *"The Macroplaza,
the 8th largest city square in the world…"*

**Lähde 2 ("Macroplaza"), sanatarkasti:** *"The Macroplaza is the
largest Plaza in Mexico and the fifth-largest plaza in the world. It
has an extension of 400,000 square metres…"*

Kahdeksas vai viides — kumpikaan ei perustele. **Ratkaisu:** lehti ei
väitä sijalukua lainkaan. Se kertoo **pinta-alan 400 000 m²** (joka on
molempien artikkelien kanssa yhteensopiva, ja vain toinen antaa sen)
ja toteaa oppaassa, että kyse on yhdestä maailman suurimmista
aukioista. Molemmat sijaluvut kirjataan lohkokommenttiin. Macroplaza
ei ole numeroitu kohdekartan kohde, joten asia ei toistu jutussa.

---

## C. RISTIRIITA — Fundidoran puiston pinta-ala

**Lähde 1 ("Monterrey", Landmarks), sanatarkasti:** *"Fundidora Park
is a large urban park that contains old foundry buildings, 120&nbsp;
hectares of natural ambiance…"*

**Lähde 2 ("Fundidora Park"), sanatarkasti:** *"The park opened on
February 24, 2001, with an area of {{convert|114|ha|acre}}"* ja
*"…bringing it into its current state, with a total area of
{{convert|144|ha|acre}}, {{convert|80|ha|acre}} of which are green
space, 2 lakes, 23 fountains, 16 buildings, 27 large scale industrial
structures and 127 pieces of steel-making machinery…"*

**Ratkaisu:** lehti käyttää **kohdeartikkelin** lukuja (114 ha
avattaessa 2001 → 144 ha vuodesta 2010, josta 80 ha viheralaa).
Yleisartikkelin pyöristetty 120 ha jätetään pois ja ero kirjataan
lohkokommenttiin. Ennakkotapaus: v925/v932/v937 — tarkempi lähde
voittaa, ja ero selitetään.

---

## D. LÄHTEEN HEIKKO KOHTA — Grutas de García ja löytövuosi

**Lähde 1 ("Grutas de García", History), sanatarkasti:** *"Grutas de
García remained hidden for thousands of years until Fray Juan Antonio
de Sobrevilla discovered the caves during a casual excursion through
the mountains."* — **ilman vuosilukua.**

**Lähde 2 ("Monterrey", Natural areas), sanatarkasti:**
*"[[Grutas de García|Garcia Caves]] – discovered in 1843 in Garcia,
Nuevo León."* — vuosiluku on, mutta ainoa lähdeviite on kaupallinen
matkailusivusto (bestday.com), joka on arkistolinkkinä merkitty
kuolleeksi.

**Ratkaisu:** vuosiluku **1843 saa olla mukana**, koska se on
en-Wikipedian oma väite, mutta se kirjoitetaan **lähteen tasolla**
("en-Wikipedia ajoittaa löydön vuoteen 1843") eikä sitä sidota
Sobrevillan nimeen samassa lauseessa kuin kiistaton fakta. Löytäjän
nimi ja tapa (satunnainen vuoristoretki) tulevat kohdeartikkelista,
joka ei anna vuotta. Ratkaisu kirjataan lohkokommenttiin.

---

## E. ETÄISYYSTARKISTUS — neljä kohdetta pudotettiin

Kaikki 28 väliä laskettiin haversinilla (R = 6 371 008,8 m).
**Kaikki kahdeksan valittua kohdetta täyttävät 200 metrin säännön.**

| väli | metriä |
| --- | --- |
| hallintopalatsi – Meksikon historian museo | **287** |
| katedraali – Barrio Antiguo | 302 |
| Dulces Nombresin kappeli – katedraali | 317 |
| Dulces Nombresin kappeli – Barrio Antiguo | 377 |
| Meksikon historian museo – Dulces Nombresin kappeli | 429 |
| Museo del Obispado – Barrio Antiguo (suurin) | 3 658 |

Pudotetut, mitattuna lähimpään valittuun kohteeseen:

| pudotettu | metriä | lähin |
| --- | --- | --- |
| Faro del Comercio | **70** | katedraali |
| MARCO | **110** | katedraali |
| Museo Metropolitano de Monterrey | **175** | katedraali |
| Explanada de los Héroes | **102** | hallintopalatsi |

Kaikki neljä mainitaan matkaoppaassa, joten ne eivät katoa lehdestä.
Ennakkotapaus: Guatemala City v1669 pudotti katedraalin 191 metrillä
ja kertoi sen tässä samassa muodossa.

---

## F. LINJAUS — mitä jätetään pois (spec-mantereet.md)

Faktapohja rajaa oikein, mutta tarkistuksessa käytiin läpi, ettei
mikään seuraavista päädy tekstiin:

1. **"Monterrey", Public safety** ja **2011 Monterrey casino attack**
   — pois kokonaan (ei nykyväkivaltaa).
2. **"Barrio Antiguo"**, virke *"In the past, the nightlife area was
   prone to incidents of violence and organised crime attacks."* —
   pois; kohdekartan juttu kertoo korttelin arkkitehtuurin,
   purkamisen Macroplazan tieltä ja kunnostuksen.
3. **Vuoden 2022 vesikriisi**, **Teslan gigatehdas** ja nykyiset
   pormestarit — pois (ei nykypolitiikkaa eikä yritysuutisia).
4. **"richest city in Latin America"** ja muut varallisuusvertailut —
   pois; kaupungin teollinen luonne kerrotaan tekemisen kautta
   (teräs, lasi, sementti, panimo), ei paremmuusjärjestyksinä.
5. **Vidaurrin teloitus 1867** ja **Monterreyn taistelu 1846**
   säilyvät tapahtumina, ilman yksityiskohtia ja ilman
   sankarikehystä kummallekaan osapuolelle (pilari 4).
6. **Cabrito en sangre** (veressä haudutettu) mainitaan
   valmistustapojen listassa lähteen sanoin mutta ilman
   teurastuksen kuvausta.

---

## G. PISTOKOKEET — sanatarkat osumat

Nämä haettiin uudelleen raakateksteistä tarkistuksen aikana:

| väite | osuma |
| --- | --- |
| Cerro de la Silla, neljä huippua, Pico Norte 1 820 m | `"Pico Antena, Pico Norte, Pico Sur and Pico la Virgen; Pico Norte (North Peak) is the highest at {{convert|1820|m|ft|abbr=on}}"` |
| Köysirata avattiin ja suljettiin 2.6.1961, viisi kuollutta | `"June 2, 1961, was also the day of its closure, as an accident killed five people, including the engineer Jesús Fernández, its designer."` |
| Vuoren pinta-ala 60,5 km² | `"60.5&nbsp;square kilometres (23&nbsp;mi<sup>2</sup>)"` |
| Chipinquen huippu 2 229 m, 1 625 ha, 300 ha avoinna, 22 metsänvartijaa | `"2,229"`, `"1625 hectares"`, `"300 of these"`, `"22 [[Park ranger"` |
| Chipinquen nimi nahuatlin sanasta *chichipinqui* | `"chichipinqui"` |
| Grutas de García 50–60 milj. vuotta, 300 m / 105 m, 16 ja 11 salia, 18 °C | `"50 and 60 million"`, `"300 meters and 105 meters deep"`, `"2.5 kilometers and has 16 different chambers; the other is 1 kilometer long with 11 chambers."`, `"18&nbsp;°C"` |
| Cumbres de Monterrey MAB-alue 2006 | `"Man and the Biosphere"`, `"designation the park received in 2006"` |
| Vidaurrin joukot valtasivat Monterreyn 15.8.1864 | `"15 August 1864"` |
| Vidaurri teloitettiin ilman oikeudenkäyntiä | `"executed without a trial"` |
| Prudenciana Vidaurri – Patrick Milmo O'Dowd 23.4.1857 | `"April 23, 1857"`, `"Patrick Milmo O'Dowd"` |
| Colegio Civilin rakennus vihittiin lokakuussa 1870 | `"octubre de 1870"` |
| Colegio Civilin rakennus aloitettiin 1793–1794 | `"1793 y 1794"` |
| Ensimmäinen oppilas Antonio María Elizondo maksoi kaksi pesoa | `"Antonio María Elizondo"`, `"dos pesos"` |
| Obispadon rakentaminen alkoi 5.7.1790 | `"5 de julio de 1790"` |
| Obispado museoksi 20.9.1956, 10 salia, 1 325 esinettä | `"20 de septiembre de1956"`, `"10 salas"`, `"mil 325 piezas"` |

**Huom. lähteen kirjoitusasusta:** es-Wikipedian Obispado-artikkelissa
lukee `20 de septiembre de1956` (välilyönti puuttuu) ja
en-Wikipedian Chipinque-artikkelissa huipun nimi on kirjoitettu
`Copete de las Aguillas` (oikea espanja olisi *Águilas*). Lehti
käyttää lähteen antamaa nimeä ja kertoo käännöksen, jonka artikkeli
itse antaa ("crest of the eagles").
