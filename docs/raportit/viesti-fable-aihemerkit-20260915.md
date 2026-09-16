# Viesti Fablelle: saman aiheen nostot yhdeksi aihemerkiksi, viuhka klikattaessa

**Opus-sessio 15.9.2026. Pohja: haara `claude/bold-ride-vow4ki-kohdemaan-merkit`
(PR #2533, kohdemaan kaikki 62 merkkiä + kaupunkinimiö 11,5 px; sisältää
myös #2527 nimikylttien lukon) — tämä haara SISÄLTÄÄ molemmat. Ei
versionostoa, ei mergeä, ei Raamattu-muokkausta.**

Omistaja 15.9.2026 klo 20.00 UTC Pariisin rykelmästä, sanatarkasti:
*"Tee saman aiheen nostot yhdeksi ilman selitettyä. Klikattaessa
vaihtoehdot tulevat viuhkana näkyviin nimien kanssa"* (Raamattu haarassa
`claude/bold-ride-vow4ki`, KARTTAUUDISTUKSEN PAATOKSET 27). Päätös
vastaa edellisen erän mittaukseen: kun katto poistui kohdemaasta,
Ranskan saapumisnäkymässä limittyi 36 % nimiöistä.

---

## 1. Mitä tehtiin

**Uusi moduuli `js/pallolauta/aihemerkit.js`** (ryhmitys, viuhkan
geometria, merkin ja kohtien piirto) sekä sen kytkennät
`js/pallolauta/nostot.js`:ään ja `js/pallolauta/lauta.js`:ään.

1. **RYHMÄ SYNTYY KAHDESTA EHDOSTA, MOLEMMAT MITATTUJA.**
   - *Merkit ovat lähekkäin:* nimiölaatikot leikkaavat (sama kaava
     `nostonLaatikko`, jolla sovittelu ja osumapinta lasketaan) **tai**
     merkkien ruutuetäisyys on enintään **44 px** —
     `NAPAUTUKSEN_SADE_PX`, eli sormenpään oma säde. Tätä lähempänä
     olevia merkkejä sormi ei erota toisistaan, joten niiden
     pitäminen erillään ei anna pelaajalle mitään; se vie vain tilan
     naapurin nimeltä. Pelkkä laatikkoleikkaus ei riittänyt: nimiö on
     LEVEÄ ja MATALA kaista (puolikorkeus ~6 px saapumiszoomilla),
     joten silmälle yhtenäinen rykelmä jäi ryhmittymättä — mitattuna
     ryhmiä syntyi tuolloin 1 ja limitys pysyi 31,6 %:ssa.
   - *Zoomi on yhä saapumisen tuntumassa:* ryhmitys on kytketty samaan
     mitattuun portaaseen kuin merkkiportti (`lahizoomiAuki`,
     `LAHIZOOMIN_OSUUS_ULOIMMASTA` 0,7 = saapumisen 1,0 ja yhden
     portaan 0,5 geometrinen keskiväli). **Tämä ehto on pakollinen, ei
     makuasia:** nimiö on PAATOKSET 14:stä lähtien kartan mitta, joten
     zoomatessa teksti kasvaa samassa suhteessa kuin merkkien väli —
     limitysehto yksin ei purkautuisi koskaan, eikä kohta 3
     ("yhden zoomportaan sisään merkit hajoavat") toteutuisi.
2. **AIHEMERKKI on aiheen väripallo + ryhmän kärkisymboli + pieni
   lukumäärä, ei nimiötä.** Väri ja symboli tulevat samasta lähteestä
   kuin lisää-valikon (karttaselitteen) rivit: `karttavaloVari` lukee
   kärkisymbolin oman mustemuuttujan (`--sym-*`) ja
   `karttavaloKarkisymboli` antaa merkin — valikko ja kartta ovat
   samaa sävyä ilman omaa taulukkoa. Paperinvaalea pohja värin alla,
   jotta musteinen symboli erottuu (ilman sitä se hukkui palloon).
3. **VIUHKA** aukeaa napautuksesta: kohdat kaarelle merkin ympärille
   omilla nimillään, sama viivamerkki ja nimiö kuin kartalla.
   - *Kaari kääntyy, jotta se mahtuu:* `viuhkanAsemat` hakee puolen,
     kierron ja säteen pienestä päätellystä ruudukosta niin, että
     jokainen kohta nimineen on ruudulla. Ei satunnaisuutta: sama
     näkymä antaa aina saman viuhkan.
   - *Kohdat piirtyvät AIHEMERKIN OMAAN elementtiin* eivätkä omiksi
     CSS2D-merkeikseen. Syy on mitattu: omina merkkeinä niitä ei
     syntynyt DOMiin napautuksen jälkeen lainkaan
     (`.pallolauta-viuhka`-solmuja 0 vielä 900 ms kuluttua, vaikka
     kerroksen data sisälsi ne) — kirjasto rakentaa uudet elementit
     vasta omalla kehyksellään, eikä levossa oleva pallo sellaista
     tuota. Merkkirekisteri sen sijaan ajaa `asettele`n joka
     ladonnassa, joten viuhka ilmestyy samalla hetkellä kuin napautus.
   - *Napautus ei kulje elementin kautta* — sama sääntö kuin kaikilla
     pallon merkeillä (js/pallolauta/merkit.js: *"yksi osumatesti,
     yksi kutsu"*). Mitattu: pallon kangas on osumajärjestyksessä
     CSS2D-kerroksen PÄÄLLÄ, joten `pointer-events: auto` ei olisi
     tuonut kohdalle napautusta lainkaan. Kohdan laatikko on
     RUUTULAATIKKO, jota laudan oma napautus vertaa
     (`nostot.napautaViuhkasta`), ja sama kaava piirtää sen
     paperilautasen — sormi ja silmä mittaavat samaa.
   - *Sormen oma piste luetaan tapahtumasta.* Kirjaston napautuskutsut
     antavat lat/lng:n, ja se ei riitä: mitattuna viuhkan kohdan
     napautus meni `onPointClick`-polkuun (aihevalon täplä merkin
     alla) ja kutsui pintaa TÄPLÄN koordinaateilla, kymmeniä
     pikseleitä sivussa — viuhka vain sulkeutui. Nyt piste tulee itse
     pointerdownista ja vain tuoreena (1,5 s).
   - *Sulkeutuu* kartan napautuksesta, zoomista ja panoroinnista
     (kerros vertaa merkin ruutupistettä ja kameran osuutta
     avaushetkeen) sekä toisen viuhkan avauksesta. Toisen aihemerkin
     napautus avaa suoraan sen oman viuhkan, ei vaadi kahta napautusta.
   - *Avausliike on transform + opacity* (180 ms, kaari aukeaa merkin
     keskeltä ulos), ei suodatinta — iOS-sääntö pitää.
4. **Ryhmään sulautunut nosto ei sulje auki olevaa korttiaan.** Kerros
   sulkee kortin, jos sen merkki ei ole enää osumalistalla; viuhkasta
   avattu kortti olisi sulkeutunut heti samalla ladonnalla, joka sen
   avasi. Ryhmien jäsenet ovat siksi oma joukkonsa (`ryhmitetytIdt`).
5. **Selite laskee kappaleet, ei merkkejä:** aihemerkki tuo
   karttavalojen laskuriin oman jäsenmääränsä.
6. **Vastakoe yhdellä lipulla:** `?aihemerkit=0` sammuttaa ryhmityksen,
   jolloin kartta latoo nostot kuten ennen tätä erää — sama tapa kuin
   `?vektorit=0`. Savuke ja mitta ajavat molemmat.

Kaupunkien nimiöt 11,5 px (PAATOKSET 25) eivät muutu: kaupunkimerkki ei
ole ryhmiteltävä (kohta 5). Poltettu muste ei ryhmity eikä voisikaan —
sen nimiö on paistettu laattaan.

---

## 2. Mittaus — Ranskan saapumisnäkymä

Väline: `tools/savukkeet/mittaa-aihemerkit.mjs` (uusi; mitta, ei
savuke), Chromium, pelaaja Pariisissa, saapumisnäkymä ajettu loppuun.
"Ryhmitys pois" on sama ajo lipulla `?aihemerkit=0` — siis sama
aineisto, sama kamera, sama mittari. Nimiölaatikot ovat kerroksen omat
(`lappuLaatikot`), päällekkäisyys niiden leikkaus kartan kotelon
sisällä. Portti päästää molemmissa 62/62, piiloon 0 (PAATOKSET 25).

### 1400 × 900

| | ryhmitys pois | **ryhmitys päällä** |
|---|---|---|
| eläviä merkkielementtejä | 40 | 38 (29 nostoa/kaupunkia + **9 aihemerkkiä**) |
| nimiöitä näkyvissä | 39 | 28 |
| päällekkäisiä nimiöitä | 14 (**35,9 %**), 9 paria | 2 (**7,1 %**), **1 pari** |
| aihemerkeissä nostoja | 0 | **24** |

Ainoa jäljelle jäävä pari on **Chaîne des Puys + Michelin-opas**
(Clermont-Ferrandin seutu, ei Pariisi) — ne ovat ERI aiheita (luonto ja
kauppa), joita PAATOKSET 27 ei sääntönsä mukaan yhdistä.
**Pariisin kohdalla limittyviä nimiöitä on 0** eli tilattu luku.

Aihemerkit 1400 × 900 (aihe × kappaletta):
kulttuuri × 6 (patonki, Pariisi soi, impressionistit, Tour 1903,
Roland-Garros, peilisali), skandaalit × 3 (Vrain-Lucas, Mona Lisan
varkaus, Carmenin ensi-ilta), kauppa × 3 (Guimardin metro, Pariisin 72
nimeä, kyyhkyposti), ihmeet × 2 (Bastilji, Tuileries), skandaalit × 2
(kaulanauhajuttu, kirahvin kävelymatka), historia × 2 (Notre-Damen
kukko, Pasteur ja Meister), kauppa × 2 (Cinématographe, Montgolfier),
kulttuuri × 2 (Chandeleur, Mont-Saint-Michel), kulttuuri × 2 (Marseillen
ex-votot, petanque).

### 390 × 844

| | ryhmitys pois | **ryhmitys päällä** |
|---|---|---|
| eläviä merkkielementtejä | 40 | 30 (22 + **8 aihemerkkiä**) |
| nimiöitä näkyvissä | 39 | 21 |
| päällekkäisiä nimiöitä | 18 (**46,2 %**), 11 paria | 5 (**23,8 %**), **3 paria** |
| aihemerkeissä nostoja | 0 | **24** |

Kolme jäljelle jäävää paria — Lyon + Michelin-opas, Chaîne des Puys +
Michelin-opas, Millaun silta + Roquefort — ovat kaikki ERI aiheiden
välisiä (tai kaupunki vastaan nosto), eikä yksikään ole Pariisissa.
Puhelimen suurin ryhmä on skandaalit × 5.

`savuke-ranska-sisalto` mittaa eri joukon — osumalaatikot, joissa on
mukana myös POLTETTU muste — ja sen luku laski samaan suuntaan:
saapumisnäkymän leikkauksia 14 → **11** (1400 × 900) ja 15 → **12**
(390 × 844); vertailuluvut ovat edellisen erän raportista.

### Viuhka (molemmat ruudut)

Kokeiltu suurimmalla aihemerkillä (Pariisin kulttuuri × 6):

| | 1400 × 900 | 390 × 844 |
|---|---|---|
| kohtia | 6 / 6 | 6 / 6 |
| kohtia kokonaan ruudulla | **6 / 6** | **6 / 6** |
| kohtaa osuma­laatikon sisällä | **6 / 6** | **6 / 6** |
| oikea hiiren napautus kohtaan | **popup aukesi**, viuhka sulkeutui | **popup aukesi**, viuhka sulkeutui |
| viuhka uudestaan auki → sulku | sulkeutui | sulkeutui |

Puhelimella kaari aukeaa merkin oikealle puolelle ja mahtuu 390 px:n
leveyteen (kuva alla). `tests/aihemerkit.test.mjs` mittaa saman asian
ilman selainta myös ruudun neljästä nurkasta.

Sulku mitattiin kerroksen omasta sulkukutsusta ja kohdan napautuksesta
(kortti avautuu, viuhka sulkeutuu). Kartan tyhjän kohdan napautus,
zoomin ja panoroinnin sulku sekä toisen aihemerkin avaus ovat samassa
haarassa (`napautaPintaan` ja ladonnan sulkuehto) mutta niitä EI ole
mitattu selaimessa erikseen — ne jäävät seuraavan erän savukkeeseen,
jos Fable haluaa ne vartioiduiksi.

### Yksi zoomporras sisään (PAATOKSET 27 kohta 3)

| | 1400 × 900 | 390 × 844 |
|---|---|---|
| portin uloinOsuus | 0,500 | 0,500 |
| aihemerkkejä | **0** | **0** |

Merkit hajoavat siis omiksi nostoiksi nimiöineen, kuten omistaja tilasi.
Samalla zoomilla limitys on 50 % (1400) ja 66,7 % (390) — se on
päätöksen oma seuraus: lähizoomissa ryhmitystä ei ole, ja nimiö kasvaa
kartan mukana. Jos tämä halutaan myös lähizoomiin, ehto 2 on yksi rivi.

### Kreikka 1400 × 900 — ei heikkene

| | ennen | jälkeen |
|---|---|---|
| portti päästää / kaikkiaan | 33 / 33 | **33 / 33** |
| piiloon | 0 | **0** |
| eläviä merkkielementtejä | 9 | 9 |
| päällekkäisiä nimiöitä | 0 (0 %) | **0 (0 %)** |
| aihemerkkejä | – | 0 |

Kreikassa yksikään saman aiheen pari ei ole kynnyksen sisällä, joten
kartta on merkki merkiltä sama kuin ennen.

---

## 3. Yksi kohta, jossa jouduin valitsemaan — Fablen päätettäväksi

**Mont-Saint-Michel sulautuu Chandeleur-nostoon.** PAATOKSET 27 kohta 4
nimeää Mont-Saint-Michelin esimerkkinä nostosta, joka näkyy nimiöin
heti. Ne ovat 40 px:n päässä toisistaan ja samaa aihetta (kulttuuri),
joten 44 px:n kynnys yhdistää ne. Mittasin vaihtoehdot:

| kynnys | limittyviä nimiöitä 1400 px | Mont-Saint-Michel |
|---|---|---|
| 44 px (valittu) | 2 (7,1 %), 1 pari | aihemerkin sisällä |
| 38 px | 6 (18,8 %), 3 paria | oma nimiö — **mutta se limittyy** Couesnonin vuoroveden kanssa |
| 32 px | 12 (36,4 %), 6 paria | oma nimiö, limittyy |

Kynnyksen laskeminen ei siis palauta Mont-Saint-Michelin nimeä
"puhtaana", vaan tuo sen takaisin päällekkäisenä — ja maksaa muualla
kartalla moninkertaisesti. Valitsin siksi 44 px:n (sormen säde) ja
jätän tämän Fablen ratkaistavaksi: jos kohta 4 halutaan kirjaimellisesti,
luontevin tapa ei ole kynnys vaan sääntö *"maastokohde ei sulaudu
lehtinostoon"* — se on yksi ehto `ryhmitaNostot`-kutsussa, mutta se on
uusi linjaus, jota päätöksessä ei ole.

---

## 4. Vartiot ja testit

- **`tests/aihemerkit.test.mjs` (uusi, 8 testiä):** vain sama aihe
  yhdistyy (eri aihe jää omakseen KESKELLÄ rykelmää); ketju yhdistää
  rykelmän päät; **yksinäinen nosto ei koskaan katoa merkin sisään**
  (kohta 4); pitkä nimiö yhdistää myös kynnystä kauempana olevat;
  viuhka mahtuu 390 × 844 -ruudulle keskellä ja neljässä nurkassa sekä
  1400 × 900:lla; kohdat eivät kasaudu; kaari kääntyy ruudun keskeltä
  poispäin.
- **`tools/savukkeet/savuke-nimikyltti.mjs` vartio 9 (uusi, molemmat
  ruudut, ajettu selaimessa samasta sarjasta kuin vartiot 4–8):**
  9a saapumisnäkymässä syntyy aihemerkkejä; 9b limittyviä
  nimiöpareja enintään 4; 9c viuhka avautuu napautuksesta ja jokainen
  kohta on ruudulla ja DOMissa; 9d viuhka sulkeutuu; 9e yhden
  zoomportaan sisällä aihemerkkejä ei ole; **9f vastakoe ilman
  selainta:** kaukana toisistaan olevat saman aiheen nostot eivät
  ryhmity.
- **Mitta `tools/savukkeet/mittaa-aihemerkit.mjs` (uusi):** luvut tähän
  raporttiin, myös vastakoeajo `--ryhmitys=0`.

### Ajetut

- `node --test tests/rules.test.mjs tests/dokumentit.test.mjs
  tests/aihemerkit.test.mjs tests/nostopoltto-merkkiportti.test.mjs
  tests/nostoladonta.test.mjs tests/nimiolimitys.test.mjs
  tests/pallonimikyltti.test.mjs tests/karttamerkit.test.mjs` —
  **391/391 läpi**.
- `tools/tarkista-savukkeet.mjs` — kunnossa (1759 ui-viittausta).
- `tools/savukkeet/savuke-nimikyltti.mjs` — **62/62** (vartio 9 mukana).
- `tools/savukkeet/savuke-era12.mjs` — **27/27**.
- `tools/savukkeet/savuke-kaupunkikortit.mjs` — **121/121**.
- `tools/savukkeet/savuke-ranska-sisalto.mjs` — **28/30**. Kaksi
  punaista ovat POHJAHAARASSA ENNESTÄÄN ja ne on kirjattu myös
  edellisen erän raporttiin: *8a puhelimella Strasbourg, Nizza ja
  Nantes eivät ole osumalistalla* (pystyruudun rajaus, PAATOKSET 17) ja
  *9 minikysymyksen palkkio 390 px:llä*. Kumpikaan ei liity tähän
  erään. Vartiot 4, 6a ja 6b vihreinä molemmilla ruuduilla.
- `tools/tarkista-nimiolimitys.mjs` — sama tulos kuin pohjahaarassa
  (naapurimaat 9, sama maa 36, eläintäky 5): poltettu ladonta ei
  muuttunut.

---

## 5. Kuvat

- `docs/raportit/kuvat/aihemerkit-1400-20260915.jpg` — Ranskan
  saapumisnäkymä 1400 × 900: Pariisin rykelmä on yhdeksän väripalloa
  lukumäärineen, ja nimiöt ympärillä ovat luettavissa.
- `docs/raportit/kuvat/aihemerkit-390-20260915.jpg` — sama
  puhelinruudulla 390 × 844.
- `docs/raportit/kuvat/aihemerkit-viuhka-20260915.jpg` — viuhka auki
  puhelimella: kuusi kohtaa nimineen kaarella, kaikki ruudulla.

Työpöytäkuvassa saapumiskortti on auki (kertojan teksti kirjoittuu yhä),
puhelinkuvissa suljettu.

---

## 6. Maastokohdesääntö (16.9.)

Jatkoa lukuun 3: Fablen ratkaisu jätettyyn kysymykseen on juuri se, jota
tässä ehdotin — **"maastokohde ei sulaudu lehtinostoon"** on nyt oma
ehto `ryhmitaNostot`-kutsussa (`js/pallolauta/aihemerkit.js`), eikä
kynnystä (44 px) tarvinnut koskea.

**Kenttä.** `tyyppi`-arvot `vuori`, `meri`, `joki`, `saari` ja `jarvi`
(sama viisikko kuin `js/fokuskohteet.js` `KOHDE_TYYPPISYMBOLIT`:n
`'luonto'`-rivit) tunnistavat maastokohteen jo valmiiksi datassa, joten
niitä ei merkitty erikseen. Mont-Saint-Michel (`tyyppi: 'kulttuuri'`) ja
Millaun silta (`tyyppi: 'tekniikka'`) — juuri PAATOKSET 27 kohta 4:n
nimeämät esimerkit — saivat pienimmän mahdollisen merkinnän,
`maasto: true`, suoraan `js/packs/maastokohteet-fra.js`:n riville.
Pallon nostokerros lukee molemmat lähteet yhdellä funktiolla
(`js/pallolauta/nostot.js` `onMaastokohde`) ja siirtää tuloksen rivin
`maasto`-kenttään. Dokumentoitu `docs/moduulit/maalehti.md`:ssä.

**Ehto.** `ryhmitaNostot` ohittaa parin heti, jos kummalla tahansa on
`maasto: true` — merkki ei liity mihinkään ryhmään EIKÄ vedä muita
ryhmäänsä, ennen aihevertailua. Yksikkötestit
`tests/aihemerkit.test.mjs`:ssä: maastokohde 40 px:n päässä samaa
aihetta olevasta nostosta (nimiölaatikot leikkaavat, jotka
todellisuudessa Mont-Saint-Michel ja Chandeleur tekivät) ei sulaudu;
vastaväite samalla asetelmalla mutta ilman lippua sulautuu (koeasetelman
kontrolli). `node --test tests/aihemerkit.test.mjs tests/rules.test.mjs
tests/dokumentit.test.mjs` — 347/347 läpi.

**Mitattu vaikutus, Ranskan saapumisnäkymä** (`tools/savukkeet/
mittaa-aihemerkit.mjs`, pelaaja Pariisissa):

| | 1400 × 900 ennen | 1400 × 900 jälkeen | 390 × 844 ennen | 390 × 844 jälkeen |
|---|---|---|---|---|
| aihemerkkejä | 9 | **8** | 8 | 8 |
| nimiöitä näkyvissä | 28 | 30 | 21 | 21 |
| päällekkäisiä nimiöitä | 2 (1 pari) | 4 (**2 paria**) | 5 (3 paria) | 5 (3 paria) |
| Mont-Saint-Michel | Chandeleur-aihemerkin sisällä, ei omaa nimiötä | **oma nosto, oma nimiö** | oma nosto (ei koskenut) | oma nosto (muuttumaton) |

1400 × 900:lla Mont-Saint-Michel irtosi Chandeleur-ryhmästä ja sai oman
nimiönsä (kohta 4:n kirjaimellinen tulkinta); limittyvien parien määrä
nousi yhdestä kahteen, koska MSM:n nimiö osuu nyt naapuriin
(Couesnonin vuorovesi -nosto) — **2 paria on tilatun katon (≤ 3 paria
1400:lla) sisällä**, eikä uutta väistösääntöä tarvittu: olemassa oleva
nimiölimityksen laskenta ja sovittelu (`js/pallolauta/sovittelu.js`)
käsittelevät sen kuten mitä tahansa kahta vierekkäistä nimiötä. 390 ×
844:llä lukema ei muuttunut, koska Mont-Saint-Michel ei ollut
Chandeleurin kanssa samassa rykelmässä tälläkään ruudulla ennen
muutosta — kynnys 44 px ei riipu ruudun koosta, vain merkkien omasta
ruutuetäisyydestä, joka 390 px:llä oli eri.

**Savukkeet.**
`tools/savukkeet/savuke-ranska-sisalto.mjs`: **28/30**, samat kaksi
punaista kuin luvussa 4 (8a puhelimen kolme lisäkaupunkia, 9 minikysymyksen
palkkio 390 px:llä) — ei uusia punaisia.
`tools/savukkeet/savuke-nimikyltti.mjs`: puhelinpuoli (vartiot 1–9f, myös
9a–9f aihemerkkivartiot) läpi joka ajossa; työpöytäpuoli (1400 × 900) ei
saatu suoritettua asti tässä istunnossa — Chromium sulkeutuu
toistuvasti ("Target page, context or browser has been closed")
juuri puhelin- ja työpöytäajon välissä, SEITSEMÄSSÄ ajossa peräkkäin,
samassa kohdassa. Sama kaatuminen toistuu identtisesti myös
KOSKEMATTOMALLA pohjahaaralla (testattu `git stash`illa), riippumatta
rinnakkaisten sessioiden kuormasta (mitattu 25–53 chrome/node-prosessia
samaan aikaan) — kyse on tämän hetken ajoympäristöstä, ei tästä
muutoksesta. `node --check` kaikkiin muutettuihin tiedostoihin on
kunnossa, ja `savuke-ranska-sisalto` mittaa 1400 × 900 -ruudun samat
merkit ja nimiölaatikot omalla, päätökseen asti ajettavalla ajollaan —
kaatunut vartio 9b siinä (limittyviä nimiöpareja enintään 4) on
tarkistettu jo yllä olevassa mittataulussa.
