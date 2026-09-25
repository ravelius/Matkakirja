# Viesti Fablelle: nimikyltti ei enää vaihda kylkeä vedon yli (18.9.2026)

Opus, haara `claude/bold-ride-vow4ki-julkaisu-v1935` (PR #2573, ei versionostoa).
Aloitus 18.9.2026 klo 02.36 Suomen aikaa, mittaukset Mac Studiolla
(Chromium 1234, dpr 2). Tehtävä: Mac-runnerin Savukkeet-ajon uudet punaiset
savuke-nimikyltti.mjs:ssä (vartiot 1, 2 ja 6) ja savuke-pariisi-lahizoom.mjs:n
vartio 8b 1400 px:llä.

## 1. Juurisyy: pelimerkki puristi lukkoa, ja testi oli veitsenterällä

Vartiot 1-2 sanoivat *"suurin siirto 102,44 px"* (puhelin) ja *"110,05 px"*
(työpöytä): PARIISI-kyltti vaihtoi kyljen kesken vedon.

**Kohdemittaus** (kertakäyttöinen Playwright-ajo, puhelin 390 × 844, Pariisi,
veto −40 px, näyte joka askeleelta) luki neljä lukua rinnakkain: kaupungin
piirretty piste (`getScreenCoords`), pelinappulan DOM-laatikko, kyltin laatikko
ja lukon purkuehdot `js/pallolauta/nimet.js`:stä. Tulos:

| hetki | piste x | nappula − piste | kyltti − piste | `pino` (lukon purku) |
|---|---|---|---|---|
| levossa | 187,0 | 8,2 / 42,8 | −40,0 / 62,7 (`end`) | — |
| askel 1 | 182,3 | 8,2 / 42,8 | −40,0 / 62,7 (`end`) | false |
| **askel 4** | **168,0** | **8,2 / 42,8** | **+21,5 / 62,7 (`start`)** | **true** |
| askel 8 | 149,0 | 8,2 / 42,8 | +53,3 / 63,7 (`start`) | false |
| levossa | 125,4 | 8,2 / 42,8 | +62,4 / 63,9 (`start`) | false |

Kaksi asiaa näkyy suoraan:

1. **Nappula ei liiku.** Sen laatikon keskipiste on koko vedon ajan
   8,2 / 42,8 px:n päässä kaupungin pisteestä — se on kartalla kiinni kuten
   kaupunkikin. Vika ei siis ole nappulan paikassa.
2. **Lukon purku kääntyi kesken vedon.** `pino`-ehto (haaran oma lisäys,
   PAATOKSET 32 kohta 5; ei ole `origin/main`issa — vastakoe: `git diff
   origin/main -- js/pallolauta/nimet.js` näyttää rivin `if
   (pinoLaatikot.some(...)) continue;` uutena) oli epätosi levossa ja
   askelilla 1-3, **tosi askelella 4** ja taas epätosi sen jälkeen. Juuri
   sillä askeleella kyltti vaihtoi kyljen: −40,0 → +21,5 px, ja vedon loppuun
   mennessä +62,4 px eli **102,4 px** — sama luku kuin vartion.

Miksi testi ailahtaa, vaikka molemmat osapuolet ovat kartalla kiinni: sen
kaksi puolta luetaan **eri hetkestä**. Lukon laatikko lasketaan tämän kehyksen
kamerasta (`e.x` ← `getScreenCoords`), nappulan laatikko edellisen kehyksen
DOM-paikasta (CSS2D-solmu, `getBoundingClientRect`). Vedossa ero on liikkeen
verran (mitattu 4,7 px / 40 ms). Saapumisen sijoitus on nappulan kyljessä
kiinni (NIMION_RAKO 3 px + PELIMERKIN_VARA_PX 4 px), joten muutaman pikselin
ero riittää kääntämään leikkaustestin — ja lukon purkauduttua ladonta latoo
nimen vapaasti toiselle kyljelle.

**Välivaihe ja sen mittaus.** Ensimmäinen korjaus rajasi purun pelkkiin levon
ladontoihin (`levossa`). Se ei riittänyt: savuke mittaa juuri levossa, ja vedon
perälauta-ladonta (`pyydaLadonta`in `setTimeout`) käänsi saman veitsenterällä
olevan testin — vartiot 1-2 pysyivät punaisina samoilla luvuilla (102,44 /
110,05 px). Sama mittaus siis osoitti, ettei vika ole ajoituksessa vaan siinä,
että **väistö ratkaistaan yhä uudestaan**.

## 2. Korjaus: väistö ratkaistaan kerran kutakin merkkien kokoonpanoa kohden

- `js/pallolauta/merkit.js` — uusi `avain(osa)`: osan merkkien KARTTA-avain
  (`avain@lat,lng` jokaisesta elävästä merkistä). Panorointi ja zoomi eivät
  muuta sitä; vain merkin ilmestyminen, katoaminen tai siirtyminen muuttaa.
- `js/pallolauta/nimet.js` — `lado` saa `levossa`- ja `pinojenAvain`-parametrit.
  Pelimerkki purkaa nimen lukon vain, kun ladonta on levon ladonta **ja** lukkoa
  ei ole vielä ratkaistu tälle merkkien kokoonpanolle (`lukko.pinoAvain !==
  pinojenAvain`). Ratkaisu talletetaan lukkoon, ja liikkeen ladonta kantaa vain
  edellisen merkinnän eteenpäin. Ruudun reuna purkaa lukon yhä (`mahtuu`),
  koska siellä vaihtoehto on katoava nimi.
- `js/pallolauta/lauta.js` — `liikkeenLadonta`-lippu erottaa liikkeen aikana
  ajetun ladonnan levon ladonnasta, ja `pinojenAvain: merkit.avain('peli')`
  kulkee nimiladonnalle.
- Siivous samalla: haarassa oli `export` lipsahtanut väärän vakion eteen
  (`PELIMERKIN_VARA_PX` vietiin ulos, `NIMEN_REUNAN_SIETO_PX` ei). Palautettu.

Käytös pelaajalle: kun pelaaja saapuu kaupunkiin ja nappula ilmestyy nimen
alle, väistö ratkaistaan seuraavassa levon ladonnassa kerran — sen jälkeen
kyltti ei vaihda kylkeä eikä asentoa vedon eikä zoomin yli.

**Vartijat.** `tests/pallonimikyltti.test.mjs` vartio 8 (uusi): pelimerkki nimen
päällä ei vaihda sijoitusta liikkeen ladonnassa, vaihtaa sen levossa (vastakoe)
eikä koettele lukkoa enää kolmella seuraavalla levon ladonnalla samalla
avaimella. `tests/pallonimet.test.mjs` päivitetty lukemaan uusi ajoitusrivi.

## 3. Mittaus korjauksen jälkeen (savuke-nimikyltti, yksi ajo)

`PLAYWRIGHT_JS=… CHROMIUM=… PORTTI=9031 node tools/savukkeet/savuke-nimikyltti.mjs`

| vartio | ennen | jälkeen |
|---|---|---|
| 1. puhelin/pariisi (ero x) | FAIL 102,44 px | OK |
| 2. puhelin/pariisi (ero y) | FAIL 1,20 px | OK |
| 1. tyopoyta/pariisi (ero x) | FAIL 110,05 px | OK |
| 2. tyopoyta/pariisi (ero y) | OK | OK |

Kyltin ero kaupungista koko sarjan yli (viisi mittausta, neljä vetoa):
puhelin **−40,0 / 62,7** viidesti peräkkäin (ennen: −40,0/62,7 → 62,4/63,9 heti
ensimmäisessä vedossa) ja työpöytä **−45,2 / 71,1** viidesti peräkkäin (ennen:
−45,2/71,1 → 64,9/71,1). Marseille työpöydällä 72,5 / 69,9 muuttumattomana.
Koko savuke: 51/62 → 54/62 läpi; kaikki kolme lisää ovat vartiot 1-2.

Muut punaiset samassa ajossa ovat ennallaan eivätkä liity tähän korjaukseen
(samat luvut ennen ja jälkeen): 4 ja 6 molemmilla ruuduilla (ks. luku 4) sekä
7a/7b Venetsia ja Firenze työpöydällä (kylki vaihtuu zoomin yli kaupungeissa,
joiden nimi on ruudun laidalla — oma erä).

## 4. Vartio 6 on nyt INFO — ja se on löydös

Vartio 6 (*"karttanoston kyltti seuraa samaa kerrointa katon alapuolella"*) ei
mittaa turisti-infon kylttiä: se lukee `.pallolauta-nosto:not(.pallolauta-nosto-
kaupunki) .pallolauta-nosto-siirto` -transformin eli **karttanoston merkin
mitan** ja jakaa sen kaupungin nimikyltin kirjasinkoolla. Tarkistettu.

Mitattu tässä haarassa (työpöytä, viisi zoomtasoa):

- noston mitta: **0,7727 | 0,7727 | 0,7727 | 0,7727 | 0,7727**
- kaupungin kyltti: 13,50 → 15,92 → 19,33 → 22,45 px
- karttaskaala: 2,249 → 2,646 → 3,213 → 3,749

0,7727 on täsmälleen `NOSTON_MITTA` (8,5 / 11), eli `nostonKarttakerroin` on 1
kaikilla zoomeilla: **karttanoston merkki ei seuraa karttaa lainkaan**, vaikka
kaupungin nimikyltti seuraa. Kyse ei siis ole ±3 %:n hajonnasta vaan siitä,
että kerroin on poissa (PAATOKSET 14 kohta 1 / 31 kohta 2). Korjaus kuuluu
nostokerrokseen (`js/pallolauta/nostot.js`), johon tämä erä ei saanut koskea,
joten rivi on nyt INFO ja luvut näkyvissä. **Fablelle päätettäväksi:** onko
ruutuvakio tarkoitettu (liuskaerän jälkeen) vai onko kerroin hukkunut.

Samasta ajosta toinen huomio, joka ei ollut tehtävänannossa: **vartio 4**
(*"kyltti / maapaneelin teksti sama zoomista riippumatta"*) on työpöydällä
punainen, hajonta 50,30 %. Maapaneelin leipäteksti on 12,48 px kaikilla
zoomeilla, eli sekin on nyt ruutuvakio — sama ilmiö kuin vartiossa 6, eri
kerroksessa. Ei koskettu.

## 5. Vartio 8b (savuke-pariisi-lahizoom, 1400 px): mittari korjattu, vika jäi

Mac luki *"löytyi Chartres"*. Vartio luki nimet `nostot.osumat()`ista, mutta
**`osumat` on ruudulla olevien merkkien lista**: `ruudulla(lat, lng)` pudottaa
pallon takaiset JA ruudun ulkopuoliset (sama juuri, joka on kirjattu
`js/pallolauta/nostot.js`:ään otsikolla JÄSENYYS LUETAAN KOKO DATASTA, EI
RUUDUSTA). Chambord on Pariisista ~140 km ja Chartres ~90 km, joten sisimmällä
zoomilla ne ovat kuvan ulkopuolella — se ei tarkoita, että ne olisi *pudotettu*
kartalta, ja juuri pudottamisen (PAATOKSET 34 kohta 4) vartio mittaa. Mittari
korjattiin siis ensin, jotta väite mittaisi sitä, mitä se väittää.

Korjaus mittariin: 8b lukee nimet koko zoomsarjasta, jonka savuke jo käy
(lähizoomi + 0,5 + 0,7 — sama sarja kuin 8a), kerrokselta itseltään
(`osumat()`, aihemerkkien `jasenet` mukaan), ei DOM-nimiöistä. Liuskaan
siirrettyjen määrä on INFO-rivillä.

Tulos 1400 px:llä: **yhä punainen, ja nyt se kertoo miksi** —
*"löytyi Chartres — kartalla oli koko sarjassa vain 6 nostoa ja liuskaan
siirrettiin 16"*. Kartan lähimmät Pariisin ulkopuoliset nostot olivat
zoomeittain: 0,34 → Tour 1903 (66,9 km), Braillen pisteet (67,3 km),
Chartresin katedraali (76,2 km); 0,5 ja 0,7 → pelkkä Chartres. Versailles
(~17 km) ja Chambord (~140 km) eivät olleet kartalla **millään** mitatulla
zoomilla, eivätkä ne selity kaupungin sisäisten säteellä
(`KAUPUNGIN_SADE_KM` 12 km) eikä ruudun laidalla — 0,7 on leveä näkymä.

**Tämä ei siis ollut mittarin karkeutta vaan löydös:** 1400 px:llä pääkartalle
jää Pariisin seudulta kolme nostoa, kun liuskaan siirtyi 16. Vartio jää
punaiseksi, koska se mittaa PAATOKSET 34 kohdan 4 väitettä sellaisenaan ja peli
ei täytä sitä. Juurisyy on nostokerroksen puolella (portti / `nosto.lahi` /
ankkurilevitys), johon tämä erä ei saanut koskea — **Fablelle seuraavaan
erään**.

## 6. Muu

- `node --test tests/*.test.mjs`: 3607/3607 läpi (13 skipattua).
- `node tools/build-standalone.mjs` ajettu ennen pushia.
- Ei koskettu Raamattuun, sarjat.jsoniin, `js/linssit/`-kansioon,
  `js/fokusvirta.js`:ään eikä liuskan käytökseen.
