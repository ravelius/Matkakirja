# Viesti Fablelle: nimikyltti kiinni karttaan; isoisän ja pulun kuvat mitattuna

Karttauudistuksen PAATOKSET 12 kohdat 1–2 (omistaja 14.9.2026). Ei
versionostoa, ei muutoslokiriviä — molemmat jäävät Fablelle.

## 1. NIMIKYLTTI — juurisyy löytyi ja on korjattu

### Mitattu juurisyy

**Ankkuri ei liikkunut; SIJOITUS liikkui.** Nimen CSS2D-solmu on
kaupungin omassa pallopisteessä (`js/pallo.js` `pallonOmatPisteet`,
sama piste, jonka päällä merkki on), joten kirjasto pitää sen kiinni
kartassa. Liikkui se, mitä ladonta laskee pisteen ympärille: kylki ja
siirto (`dx`, `dy`, `ank`).

`js/pallolauta/lauta.js` ajaa ladonnan **myös panoroinnin aikana**
(kohta *LADONTA KULKEE MUKANA, EI ODOTA LIIKKEEN LOPPUA*, 12.9.2026),
enintään kerran `LADONNAN_TAHTI_MS = 200` ms:ssä eli **viisi kertaa
sekunnissa**. Joka ajolla `ladoRuutunimet` (`js/karttanimet.js`) valitsee
paikan uudestaan törmäyksenvältöllä, ja väistöpäätös riippuu siitä, mitä
muuta ruudulla sillä hetkellä on. Sama nimi vaihtoi siis kylkeä kesken
vedon — juuri omistajan *"nimikyltti liikkuu panoroitaessa"*.

Tämä on sama juuri kuin 12.9.2026:n *"tekstit hyppivät eri paikkoihin"*
-vika, johon tehtiin nimibudjetti. Budjetti harvensi ladontaa mutta ei
poistanut uudelleenlaskentaa; nyt poistuu sekin.

### Korjaus (pienin mahdollinen, vain `js/pallolauta/nimet.js`)

**Sijoitus lasketaan kerran ja lukitaan pisteen suhteen.** `luoNimet`
pitää muistissa kartan `id → { dx, dy, ank, koko, tyylitys, vali, rs }`,
jossa `rs` on ladottu laatikko pisteen suhteen. Seuraava ladonta ajetaan
entiseen tapaan, mutta lukitun nimen tulos **korvataan** lukolla, joten
kyltti pysyy täsmälleen samassa kohdassa kaupunkiin nähden.

Lukko vapautuu kolmesta syystä, kaikki mitattavia:

1. **Nimi putoaa ladonnasta** (budjetti, näkyvyys, ruudun reuna) —
   paluu on uusi saapuminen ja paikka lasketaan taas kerran.
2. **Zoomi muuttaa mitat** (`kokoKerroin`, `pisteSade` tulevat kameran
   korkeudesta) — nimi ladotaan uudelleen kuten ennenkin.
3. **RUUDUN REUNA PURKAA LUKON.** Jos lukittu kylki työntäisi laatikon
   ruudun ulkopuolelle, nimi PUTOAISI kokonaan (reunasääntö `mahtuu`).
   Mitattu 14.9.2026: ilman tätä ehtoa Pariisi katosi kesken vedon, kun
   sen laatikko osui ruudun laitaan. Reunalla kylki siis vaihtuu kuten
   ennenkin — vaihtuva kyltti on pienempi paha kuin katoava.

Ladonnan kustannus ei muutu: sama ajo, vain sen TULOS pysyy.

### Mittaustaulukko (selain)

Savuke `savuke-nimikyltti.mjs`: pelaaja Pariisissa, saapuminen ajettu
loppuun (42 s), sitten neljä aitoa hiirivetoa kankaaseen (−100, +200,
+200 alas, −200 ylös = 200 px kumpaankin suuntaan). Luku on nimen
ruutulaatikon keskipiste MIINUS kaupungin piirretty pallopiste (px).

| ruutu / kaupunki | ero alussa | veto 1 | veto 2 | veto 3 | veto 4 | suurin siirto vedon yli |
|---|---|---|---|---|---|---|
| 1400 × 900 / **Pariisi** | 10,1 / 20,5 | 10,1 / 20,5 | 10,1 / 20,5 | 10,1 / 20,5 | 10,1 / 20,5 | **0,00 px** |
| 1400 × 900 / Marseille | 10,1 / 94,0 | 10,1 / 94,0 | 10,1 / 94,0 | (pudonnut) | 10,1 / 94,0 | **0,00 px** |
| 390 × 844 / **Pariisi** | 7,7 / 48,9 | (pudonnut) | −15,9 / 52,6 | −15,9 / 52,6 | −15,9 / 52,6 | **0,00 px** |
| 390 × 844 / Marseille | 35,4 / 70,8 | (pudonnut) | (pudonnut) | (pudonnut) | (pudonnut) | — |

**Työpöydällä kyltti on täsmälleen paikallaan (0,00 px neljän vedon
yli).** Ennen korjausta sama sarja siirsi kylttiä kymmeniä pikseleitä
(vastakoe alla).

PUHELIMEN JÄÄNNÖS ON ERI VIKA, ja se on kirjattu tähän eikä piilotettu:
kyltti ei LIIKU vedon yli (0,00 px myös siellä), mutta se voi PUDOTA
yhdeksi ladonnaksi ja palata toiselle kyljelle. Syy on mitattu:
puhelimen saapumisnäkymässä nimibudjetti on vain kourallinen nimiä
(`NIMIBUDJETTI ZOOMTASON MUKAAN`) ja muu muste on tiheimmillään ruudun
alakolmanneksessa — sinne vedetty kaupunki menettää nimensä yhdeksi
ajoksi. Savukkeen vartio 3 sallii puhelimella tasan yhden pudotuksen ja
työpöydällä pelaajan omalle kaupungille ei yhtään.

### Vastakoe (pakollinen, tehty)

Korjaus kumottiin väliaikaisesti (lukko pois, ladonnan tulos
sellaisenaan) ja sama savuke ajettiin uudelleen:

Korjaus kumottiin väliaikaisesti (`js/pallolauta/nimet.js`: lukkoa ei
talleteta, ladonnan tuore tulos menee sellaisenaan läpi). Muuta ei
muutettu, ja sama savuke ja samat testit ajettiin uudelleen.

| | korjattuna | korjaus kumottuna |
|---|---|---|
| savuke `savuke-nimikyltti.mjs` | **14/14 läpi** | **11/14 läpi** |
| 1400 × 900 / Pariisi, suurin siirto vedon yli | **0,00 px (x), 0,00 px (y)** | **16,92 px (x), 49,75 px (y)** |
| 1400 × 900 / Pariisi, sarja | 10,1/20,5 × 5 | 10,1/20,5 → −6,8/70,3 → −8,2/76,4 → −6,8/70,3 → −9,9/71,5 |
| 390 × 844 / Pariisi, suurin siirto vedon yli | **0,00 px** | **30,17 px (y)** |
| `tests/pallonimikyltti.test.mjs` | **# pass 8, # fail 0** | **# pass 6, # fail 2** |

Punaisiksi kääntyivät täsmälleen ne vartiot, jotka mittaavat lukkoa;
geometriavartiot (karttakerroin, vastakoe 2) pysyivät vihreinä, kuten
pitääkin. Korjaus palautettiin ja kaikki on jälleen vihreää.

Kumotun ajon rivi `tyopoyta/pariisi: 10,1/20,5 → −6,8/70,3` on
sanatarkasti se ilmiö, jonka omistaja näki: kyltti oli kaupungin
yläpuolella ja siirtyi vedon jälkeen sen alle toiselle kyljelle.

Node-vastakoe on lisäksi savukkeesta riippumaton ja pysyvä: vartio 2
yksikkötestissä ajaa saman panorointisarjan SUORAAN `ladoRuutunimet`in
läpi ilman lukkoa ja vaatii, että sijoitus vaihtuu. Jos se joskus
lakkaa vaihtumasta, vartio 1 ei enää mittaa mitään ja testi sanoo sen.

### Testit

- **Uusi yksikkötesti `tests/pallonimikyltti.test.mjs`** (6 vartiota):
  lukko pitää kolmella mittakaavalla (saapuminen, Eurooppa, maanosa),
  **vastakoe** (sama panorointisarja ilman lukkoa ailahtelee — jos se ei
  ailahtaisi, vartio 1 ei mittaisi mitään), zoomi latoo uudelleen ja
  pudonnut nimi ei kanna vanhaa lukkoa mukanaan.
- **Uusi savuke `tools/savukkeet/savuke-nimikyltti.mjs`**: oikea peli
  pallolaudalla, aidot hiirivedot kankaaseen, kaksi ruutua
  (390 × 844 ja 1400 × 900) ja kaksi kaupunkia (Pariisi, Marseille).
  Mitta on nimen ruutulaatikon keskipiste MIINUS kaupungin piirretty
  pallopiste (`getScreenCoords`) — sama lähde, jota osumatesti lukee.

### Kuvat

- `docs/raportit/kuvat/nimikyltti-puhelin.jpg` (390 × 844)
- `docs/raportit/kuvat/nimikyltti-tyopoyta.jpg` (1400 × 900)

Molemmat ovat samasta 14/14-ajosta, vetojen jälkeen: kyltti on
kaupunkimerkin kyljessä siinä, mihin se saapuessa ladottiin.

## 2. ISOISÄN JA PULUN KUVAT — mitattu, EI korjattu tässä erässä

### Mitattu: kumpikaan ei ole merkkikerroksessa

Tehtävänanto oletti, että isoisän ja pulun kuvat ovat pallolaudan
merkkejä (`js/pallolauta/merkit.js`). **Ne eivät ole.** Koko
`.pallolauta-merkki`-kerros lueteltiin selaimesta Pariisin
saapumisnäkymässä, ja siinä on täsmälleen nämä lajit: `nappula`,
`kohde`, `nimi`, `nosto`, `turisti-info`, `maapaneeli`, `linssi`,
`helmi`. Isoisän ja pulun kuvia ei ole joukossa.

Omistajan kaappauksesta löytyvät kuvat ovat nämä kaksi, mitattuna
Chromiumilla 14.9.2026 (390 × 844, dpr 2, Pariisi, saapumisnäkymä
alt 0,694; luvut ovat karttaruudun pikseleitä ja Pariisin piirretty
piste on (202,3 / 395,7)):

| omistajan sana | mikä se oikeasti on | koko px | paikka | ankkuri |
|---|---|---|---|---|
| *"isoisän kuva"* | `.fokusvirta-luentakuva.pieni.ankkuroitu` — isoisän luentakuvan pino luennan jälkeen (`js/fokusvirta.js`, `js/saapumisasento.js`, `css/fokusvirta.css`) | **17,0 × 31,0** | (250 / 403) eli **+48 px oikealle ja +7 px alas** Pariisista | kartan piste (skaalautuu zoomin mukana) |
| *"pulun kuva"* | `.pollo-nappi.pollo-kelluu.pollo-kelluu-kartalla` — pulun kelluva nappi (`js/pollo.js`, `css/styles.css`) | **48 × 48** | (300 / 735) eli karttaruudun **oikea alanurkka** | RUUTU, ei kartta |

Vertailuluvut samasta kuvasta: kaupunkimerkki (nappula) on 32 × 36 px,
kaupungin nimikyltti 47,3 × 15,0 px ja kohdemerkki
`KOHDEMERKIN_PX` = 24 px. Isoisän kuva on siis **puolet kaupunkimerkin
korkeudesta** ja pulun nappi kaukana kaupungista — täsmälleen se, mistä
omistaja kirjoitti.

### Miksi isoisän kuva on juuri nyt niin pieni — ja miksi se ei ole tämän erän korjaus

Pienen kuvan koko on `--luentakuva-pienennys` (0,16) **kertaa kartan
mittakaava** `--luentakuva-karttaskaala` (`js/fokusvirta.js`
`kartanMittakaava`): omistajan 11.9.2026 linjaus *"pienenevät jos
zoomataan ulos kartalla"*. Kuva siis kutistui, koska **Ranskan
saapumisnäkymä zoomattiin ulos koko maan mittaan** — sama vika, jonka
omistaja kirjasi PAATOKSET 12 kohtaan 5 (*"kartta zoomautuu liian
kauas"*). Kun saapumiskorkeus korjataan (kamera-agentin erä), tämä kuva
kasvaa itsestään samassa suhteessa. Jos sitä suurennetaan nyt
erikseen, korjaus tulee kahteen kertaan.

Mitattu todiste samasta ajosta: kun kamera oli lähempänä
(alt 0,445 saman kaupungin päällä), sama pino oli **30,4 × 31,9 px**
eli lähes kaksinkertainen — pelkästä zoomista.

### Mitä ehdotan Fablelle (ei tehty, koska ei ole tämän agentin aluetta)

1. **Isoisän kuva.** Odota kamera-erän saapumiskorkeus ja mittaa
   uudestaan. Jos kuva on silloen yhä alle kaupunkimerkin korkuinen,
   nosto on yhden vakion mittainen: `--luentakuva-pienennys`
   0,16 → 0,26 antaa 1,6 × kaupunkimerkin (mitattu suhde) ja
   0,32 → 2,0 ×. Paikka siirtyy kaupungin yläpuolelle
   `js/saapumisasento.js` `LUENTAKUVAN_SIVUSIIRTO` = 0 ja
   `luentakuvanSijainti`in jo valmiina olevalla `laatta`/`vali`-varalla
   (kuvan alareuna on jo nyt tarkoitettu kaupungin laatan yläpuolelle).
2. **Pulun kuva.** Nappi on RUUDUN kaluste, ei kartan. Sen tuominen
   kaupungin yläpuolelle on käyttöliittymäpäätös (chat-napin paikka
   vaihtuu), ei pikselinsiirto — se kuuluu Fablelle, ja koodi on
   `js/pollo.js` `pollo-kelluu-kartalla` + `css/styles.css` rivi 20278.

**Kumpikaan tiedosto ei ole tämän agentin alueella** (`nimet.js`,
`merkit.js`), eikä kumpaakaan koskettu. Sivuhavainto on tässä, jotta
työ osataan reitittää oikealle agentille ilman toista mittausta.

## 3. NIMIKYLTIT KARTTAAN (omistajan päätös 14.9.2026 klo 15.05 UTC)

### Sääntö

Kyltin koko on nyt KARTAN mitta, ei ruudun. Kerroin on täsmälleen sama
muoto kuin maapaneelilla (`js/pallolauta/maapaneeli.js` `skaala`):

```
kerroin = kamera.nakyvaAlue().skaala / NIMEN_VERTAILUSKAALA
```

`nakyvaAlue().skaala` on css-pikseliä lautayksikköä kohden — sama luku,
jolla maapaneeli skaalautuu, joten kaksi kartan kalustetta kasvaa
samassa tahdissa. Vertailunäkymä on **työpöydän saapuminen
(1400 × 900, Ranska)**, jotta työpöydän saapumisnäkymä ei muutu
lainkaan. Kerroin on kytketty ladonnan omaan `kokoKerroin`iin, joten se
kertautuu kohdekaupungin lattian kanssa eikä korvaa sitä.

Muutos on kaksi kohtaa: `js/pallolauta/nimet.js` (`nimenKarttakerroin`,
`NIMEN_VERTAILUSKAALA`, `lado`in uusi `karttaskaala`) ja yksi rivi
`js/pallolauta/lauta.js`:ssä, joka antaa jo lasketun `nakyva.skaala`n
ladonnalle.

### Mitattu mitoitus (Chromium, dpr 2, tallenne Pariisissa, saapumisnäkymä)

| ruutu | korkeus | skaala px/yks | kerroin | kyltti ENNEN | kyltti JÄLKEEN |
|---|---|---|---|---|---|
| 390 × 844 | 0,664 | 0,655 | **0,357** | 15,0 px | **5,4 px** |
| 1400 × 900 | 0,251 | 1,837 | **1,000** | 13,5 px | **13,5 px** |
| 2560 × 1352 | 0,251 | 2,848 | **1,551** | 13,5 px | **20,9 px** |

Yksi zoomiporras sisään puhelimella (mitattu selaimesta savukkeella):

| korkeus | karttaskaala | kyltti | maapaneelin teksti | suhde |
|---|---|---|---|---|
| 0,694 (saapuminen) | 0,627 | **5,12 px** | 2,69 px | 1,904 |
| 0,417 | 1,045 | **8,53 px** | 4,48 px | 1,904 |
| 0,146 | 2,984 | **24,37 px** | 12,79 px | 1,905 |

Suhde maapaneelin leipätekstiin on **sama kolmella zoomilla
(hajonta 0,1 %, raja 3 %)** — se on savukkeen vartio 4, ja se on
samalla todiste siitä, että kyltti on nyt kartassa kiinni eikä ruudussa.

### PÄÄTÖSTÄ VAATIVA SEURAUS: puhelimen kyltti on 5,1 px

Tämä on se luku, jonka pyysit mitattavaksi. Työpöydän saapumisnäkymä ei
muutu lainkaan ja 2560 px:n ruudulla kyltti kasvaa 20,9 pikseliin,
mutta **puhelimen saapumisnäkymässä kyltti kutistuu 15 pikselistä
5,1 pikseliin** — se on lukukelvoton. Syy on puhtaasti geometrinen:
sama maa sovitetaan 373 px:n ja 1400 px:n levyiseen ruutuun, joten
puhelimella yksi lautayksikkö on 0,655 px ja työpöydällä 1,837 px eli
2,8-kertainen.

Tämä törmää Raamatun PAATOKSET 2:n toiseen lauseeseen: *"tekstin
luettavuus mitoitetaan uloimmalle zoomille"*. Yhteinen vertailunäkymä ei
voi täyttää molempia ehtoja yhtä aikaa.

**Ehdotus (yhden rivin muutos, en tehnyt ilman päätöstäsi):** vertailu
LAITEKOHTAISEKSI, eli `NIMEN_VERTAILUSKAALA` = sen laitteen oman
saapumisnäkymän skaala. Silloin
* työpöydän saapuminen on yhä tasan 13,5 px (ehtosi täyttyy),
* puhelimen saapuminen pysyy nykyisessä 15 pikselissä,
* ja kyltti kasvaa zoomatessa sisään täsmälleen samassa suhteessa
  kartan kanssa molemmilla — eli *"suurenee zoomatessa ja toisinpäin"*
  toteutuu, mutta uloin zoomi on mitoitettu luettavaksi.

Jos valitset tämän, muutos on `NIMEN_VERTAILUSKAALA`-vakion
korvaaminen laudan saapumisskaalalla; mittaukset ja savuke ovat
valmiina eivätkä muutu.

### Karttanostojen kyltit EIVÄT ole tässä

Noston nimiö (8,50 px) syntyy `js/pallolauta/nostot.js`:ssä, joka on
tässä erässä **toisen agentin alue** (tehtävänannon kielto). Sääntö on
valmiina vietäväksi sinne sellaisenaan: `nimenKarttakerroin` on
exportattu `js/pallolauta/nimet.js`:stä juuri sitä varten, ja nostojen
kutsu saa saman `nakyva.skaala`n samasta paikasta.

## Portit

- `npm test` → **# pass 3363, # fail 0**
- `node tools/tarkista-kaksoisavaimet.mjs` → ei kaksoisavaimia
- `node tools/tarkista-niputus.mjs` → 387 moduulia, ei törmäyksiä
- `node tools/tarkista-savukkeet.mjs` → savukkeet kunnossa
  (1639 ui-viittausta, 405 metodia, 534 kenttää)
- `tools/savukkeet/savuke-nimikyltti.mjs` → **14/14 läpi**
- `grep -rn '^<<<<<<<' js css tests tools` → tyhjä
- `node tools/uusi-versio.mjs` **ei ajettu** (tehtävänannon mukaisesti);
  versionoston ja muutoslokirivin tekee Fable.

HUOMIO AJOYMPÄRISTÖSTÄ: kun kaksi agenttia ajoi `npm test`iä ja
Playwright-savukkeita yhtä aikaa, `tests/pollo.test.mjs`:n aikaraja-
vartio *"indeksi rakentuu ja on kokoluokaltaan järkevä"* punastui
(2644,7 ms, raja 2000 ms). Yksinään ajettuna sama tiedosto on
**124/124 vihreä**. Kyse on koneen kuormasta, ei tästä muutoksesta —
kirjattu siltä varalta, että sama näkyy toisellakin agentilla.

## Muutetut tiedostot

| tiedosto | muutos |
|---|---|
| `js/pallolauta/nimet.js` | sijoituslukko (NIMIKYLTTI ON KIINNI KAUPUNGISSA) ja karttaan sidottu kyltin koko (NIMIKYLTIT KARTTAAN) |
| `js/pallolauta/lauta.js` | yksi rivi: `karttaskaala: nakyva?.skaala` ladonnalle |
| `tests/pallonimikyltti.test.mjs` | uusi, 8 vartiota (sis. vastakoe) |
| `tools/savukkeet/savuke-nimikyltti.mjs` | uusi savuke, 14 vartiota |
| `docs/raportit/kuvat/nimikyltti-*.jpg` | kaksi kuvaa (38 kt + 50 kt) |

`js/pallolauta/merkit.js` jäi koskematta: mittaus osoitti, ettei siellä
ole niitä kuvia, joita tehtävänanto sinne oletti (luku 2).
