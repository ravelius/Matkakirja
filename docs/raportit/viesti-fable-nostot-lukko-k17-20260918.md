# Viesti Fablelle: nostot lukkoon ja näkyviin (PAATOKSET 34 kohta 17 a–c)

Opus-erä 18.9.2026, haara `claude/bold-ride-vow4ki-nostot-lukko-k17`, base v1941
(`origin/main` 7f03a934).

## Tila lyhyesti

| Kohta | Tila |
| --- | --- |
| a) nostot eivät liiku eivätkä ole merellä | **Pääosin tehty** — ankkurit lukittu kaikille 50:lle, meressä 0; yksi liikkuja jäi 390 px:lle (juurisyy alla, ei tämän erän korjattavissa) |
| b) Ranskan nostot näkyviin saapumisnäkymässä | **Tehty** — 390 px 36 → **43**, 1400 px 42 → **42** (molemmat ≥ 40) |
| c) tärkeimmät kaupungit omina nostoina | **1400 px tehty (7)**, 390 px 5 — ristiriita omistajan aiemman päätöksen kanssa, päätös Fablelle (alla) |

Mittari on uusi savuke `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs`
(390 × 844 ja 1400 × 900, dpr 2, yksi ajo molemmat ruudut).

## Mittaus ennen / jälkeen

```
                              ENNEN (v1941)        JÄLKEEN
Ranskan eläviä karttanostoja  48                   48
  joilla lukittu ankkuri      34  (14 puuttui)     48  (0 puuttuu)
Lukittuja ankkureita taulussa 37                   50
  niistä merellä              3                    0
390 px nostopisteitä          36  (aihemerkkejä 3, 43  (aihemerkkejä 0)
                               jäseniä 10)
390 px DOM-merkkejä           33                   40
390 px kaupunkimerkkejä       5                    5
1400 px nostopisteitä         42  (aihemerkkejä 3) 42  (aihemerkkejä 0)
1400 px kaupunkimerkkejä      7                    7
Vedossa liikkuvia (390 px)    1                    1   (sama nosto)
Vedossa liikkuvia (1400 px)   0                    0
Nimiön ruutuvektori merkistä  sama ±1 px           sama ±1 px (molemmat ruudut)
```

Savuke: **9/10 vartiota läpi** (kaatuu vartio 4 390 px, ks. jäljelle jäänyt vika).

## Juurisyyt

### 1. Ankkuri puuttui — ja siksi merkki latoi itsensä uudelleen

`tools/vie-nostoankkurit.mjs` lukee ankkurit PELISTÄ, ja peli näyttää vain ne rivit,
jotka kamera näyttää (`ruudulla` on null pallon takana ja ruudun ulkopuolella) ja
jotka zoomiportti päästää läpi (`lahi`-nostot vasta lähizoomissa; aihemerkin jäsen
ei ole omana rivinään osumalistalla). Taulusta puuttui siksi 14 Ranskan elävää
karttanostoa.

Ilman lukittua ankkuria rivi menee `esteenAlla`-haaraan
(`js/pallolauta/nostot.js`): ankkuri, joka on kiinteän esteen (pelinappula,
kaupunkimerkki) laatikon alla, ladotaan uudelleen. Esteiden ruutupaikat muuttuvat
panoroidessa, joten ladonta ajautui uudelleen vedon aikana — täsmälleen omistajan
havainto.

**Korjaus:** puuttuvan noston ankkuri on sen OMA datapaikka (uusi työkalu
`tools/lukitse-nostoankkurit-maalle.mjs`). Levitystä ei tarvita: nämä nostot ovat
hajallaan ympäri Ranskaa eivätkä rykelmässä, ja PAATOKSET 32 kohta 2 antaa siirtää
merkkejä muttei vaadi sitä.

### 2. Ankkuri oli meressä

Levitys (`levitaMerkit`) ei tunne rantaa: se työnsi kolme ankkuria veden päälle.
Uusi `tools/maamaski.mjs` lukee `ne50.geojson`:n (sama Natural Earth -aineisto,
josta pelin rantaviiva piirtyy), ratkaisee piste-monikulmiossa-testillä onko piste
maalla (polygonin reikä = järvi ⇒ ei maata) ja etsii lähimmän maapisteen
rengashaulla alkuperäisen pisteen ympäriltä.

### 3. Aihemerkki niputti pisteet piiloon — ja siirsi niitä

Ryhmitys (PAATOKSET 27) syntyi, kun KAUPUNGIN nostot olivat kartalla rykelmänä.
PAATOKSET 34 kohta 3 vei ne liuskaan, joten kartalle jäi vain kaupunkien
ulkopuolisia nostoja — ja ryhmitys söi niistä 390 px:llä kymmenen nostoa kolmeksi
pisteeksi ja 1400 px:llä yhdeksän kolmeksi.

Ryhmitys myös SIIRSI niitä: ryhmän jäsen ei saa ankkuria (`ankkuroi` saa vain
ryhmittymättömät rivit ja aiherivit), joten kun veto pudotti yhden jäsenen ruudulta
ja ryhmä hajosi, loput hyppäsivät lukittuihin ankkureihinsa.

**Korjaus:** `ryhmitysSallittu()` käännettiin toisin päin — ryhmitys on POIS ja
`?aihemerkit=1` on vastakoe, joka palauttaa sen. Yksikkötestit ja
`tarkista-savukkeet` menevät läpi muuttumattomina.

## Muutetut ankkurit (uusi poltto tarvitaan)

Nostotaso on poltettu `2026-09-19-nostot` lukituista ankkureista, joten
**uusi poltto tarvitaan** (Fable tekee; en polttanut).

**Siirretty merestä maalle (3 — nämä OVAT poltettuja, muste on nyt väärässä
paikassa kunnes poltetaan uudelleen):**

| Avain | Ennen | Jälkeen | Siirto |
| --- | --- | --- | --- |
| `nosto:nosto-maalehti-camarguen-hevoset` | 43.198032, 4.383113 | 43.432470, 4.502218 | 28 km |
| `nosto:nosto-maalehti-petanque` | 42.969934, 5.620013 | 43.106843, 5.819263 | 22 km |
| `nosto:valimeri` | 42.576336, 5.500204 | 43.108058, 5.877698 | 67 km |

*Huom. `nosto:valimeri` on tyypiltään meri; sääntö (*"yksikään ankkuri ei ole
merimaskin päällä"*) on ehdoton, joten se siirtyi Provencen rannikolle. Jos haluat
luonnonkohteille poikkeuksen, se on Raamattuun kirjattava tarkennus — en tehnyt
sitä omin päin.*

**Uudet ankkurit (14 — nämä EIVÄT olleet poltettuja, koska taulullisen maan merkki
ilman ankkuria ei pala; uuden poltton jälkeen ne palavat mukaan, mikä on juuri
kohdan 17 b tarkoitus):**

`nosto:biskajanlahti` (161 km merestä maalle), `nosto:carnacin-kivirivit` (6 km),
`nosto:chambord`, `nosto:hahmotelma-chenonceau`, `nosto:hahmotelma-saint-malo`
(6 km), `nosto:hahmotelma-pointe-du-raz` (6 km), `nosto:hahmotelma-amiens`,
`nosto:hahmotelma-bonifacio` (6 km), `nosto:syvennys-marseille-exvotot`,
`nosto:nosto-maalehti-peilisali`, `nosto:nosto-maalehti-chandeleur`,
`nosto:nosto-maalehti-montgolfier`, `nosto:nosto-maalehti-le-mans`,
`nosto:nosto-maalehti-marseillen-saippua`.

Taulussa on nyt 50 ankkuria (oli 37).

## Kaksi asiaa, jotka vaativat sinun päätöksesi

### A) 390 px:llä kaupunkimerkkejä on 5, ei 7 — ja syy on omistajan oma päätös

Puhelimen pystyruudulla saapumisnäkymä sovitetaan KORKEUTEEN (Raamattu
KARTTAUUDISTUKSEN PÄÄTÖKSET 17, `js/pallolauta/kamera.js korkeuteenSovitus`):
*"maa täyttää ruudun pystysuunnassa … ja maan itä- ja länsireuna jäävät aluksi
ruudun ulkopuolelle. Pelaaja panoroi niihin."* Ranskan itäisimmät lisäkaupungit
**Strasbourg ja Nizza** ovat siis 390 px:llä kuvan ulkopuolella nimenomaan tämän
päätöksen nojalla; 1400 px:llä kaikki seitsemän näkyvät.

En kumonnut PÄÄTÖKSET 17:ää omin päin. Savukkeen vartio 6 on siksi 390 px:llä
INFO ja 1400 px:llä vaatimus. Vaihtoehdot sinulle: (1) kohta 17 c koskee vain
leveää ruutua ja puhelimella kaupungit löytyvät panoroimalla, tai (2) PÄÄTÖKSET 17
puretaan Ranskan osalta (maa sovitetaan leveyteen, jolloin pystyyn jää tyhjää ja
naapurimaat tulevat kuvaan — juuri se, mitä PÄÄTÖKSET 17 välttää).

### B) Yksi nosto liikkuu yhä 390 px:llä — `nosto-maalehti-pasteur-meister`

Vika ei ole ankkurissa vaan KAUPUNKIJÄSENYYDESSÄ. Noston oma datapaikka on
48.840 N / 2.312 E eli Pariisin ydin: sen KUULUU olla kaupunkiliuskassa eikä
kartalla (PAATOKSET 34 kohta 3), ja Nodessa pelin oma sääntö
(`onKaupunginSisainen`) luokittelee sen sisäiseksi. Selaimessa se kuitenkin on
390 px:llä kartalla ja vaihtaa paikkaa vedossa.

Sisäisten suodatus (`js/pallolauta/nostot.js`, `sisaisetAvaimet`) ajetaan
kaupunkiriveille, jotka ovat `omatKaupunkirivit` (ruudulla olevat pakan kaupungit)
+ `laudanRivit` (laudan omat kaupungit). Jos Pariisin rivi puuttuu 390 px:n
näkymästä, Pariisin sisäiset nostot vuotavat kartalle — ja koska ne ovat
vuorotellen sisäisiä ja eivät, ankkuri astuu voimaan vasta toisessa ladonnassa ja
merkki hyppää (mitattu 0,18° yhdellä 200 px:n vedolla).

Tämä on oma eränsä (kaupunkijäsenyyden lähde ei saa riippua ruudusta) enkä
koskenut siihen, koska se on samassa koodissa kuin rinnakkaisen erän kerma- ja
Nähtävyydet-työ. Suositus: yksi lyhyt Opus-erä, jossa `kaupunkirivit` kootaan
DATASTA (laudan kaupungit + pakan näkyvät kaupungit) eikä ruudulla olevista
riveistä — sama korjaus kuin `liuskanLahde`lle jo tehtiin 18.9.2026.

## Muutetut tiedostot

| Tiedosto | Muutos |
| --- | --- |
| `js/packs/nostoankkurit-fra.js` | 37 → 50 ankkuria, 3 siirretty merestä maalle |
| `js/pallolauta/nostot.js` | `ryhmitysSallittu()` toisin päin (ryhmitys pois, `?aihemerkit=1` vastakoe) + perustelu |
| `tools/maamaski.mjs` | **uusi** — onko piste maalla (ne50.geojson), lähin maapiste |
| `tools/lukitse-nostoankkurit-maalle.mjs` | **uusi** — täydentää taulun ja nostaa ankkurit merestä |
| `tools/savukkeet/savuke-ranskan-nostot-lukossa.mjs` | **uusi** — kohdan 17 a–c mittari, 10 vartiota |
| `docs/raportit/viesti-fable-nostot-lukko-k17-20260918.md` | tämä raportti |

## Tarkistukset

```
node --test tests/*.test.mjs        # pass 3623, # fail 0 (13 skipped)
node tools/tarkista-savukkeet.mjs   savukkeet kunnossa
node tools/tarkista-niputus.mjs     niputus kunnossa, ei törmäyksiä
node tools/build-standalone.mjs     dist/matkakirja.html 32 627 kt
```

En avannut PR:ää, en nostanut versiota, en koskenut Raamattuun enkä
`sarjat.json`iin.
