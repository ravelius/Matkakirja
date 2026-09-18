# Fablelle: liuskan läpikuultava pohja, marginaalit ja puhelimen zoomiraja

18.9.2026 klo 10.25 Suomen aikaa · Opus-agentti · haara
`claude/bold-ride-vow4ki-liuska-pohja` (origin/mainin päältä, v1937)

Tehtävä: Raamattu, KARTTAUUDISTUKSEN PAATOKSET 34 kohta 15 a–c ja
kohdan 14 velka. Ei PR:ää (AGENTIT TARKENNUS 8). Vaatii versionoston.

## Mitä tehtiin

**a) Pohja on läpikuultava (kohta 15 a).** Pohjan vyöt ladotaan
päällekkäin, joten näkyvä peitto on niiden yhteispeitto
`1 − Π(1 − peitto)`. Vanhat luvut (0,14 / 0,34 / 0,62 / 0,94) antoivat
keskellä **0,987** — pohja oli käytännössä umpinainen paperi, ja juuri
sen omistaja näki. Uudet luvut (0,11 / 0,24 / 0,38 / 0,58) antavat
**0,824**. Pehmennetyt reunat säilyvät (samat vyöt, sama kasvu
sisäänpäin), reunaviivaa ei ole eikä `backdrop-filter`iä tullut
(iOS-sääntö). `js/pallolauta/aihemerkit.js` VIUHKAN_POHJAN_VYOT,
VIUHKAN_POHJAN_PEITTO.

**a2) Liuskan alle jäävät muiden nostojen nimiöt ja merkit piiloon
(kohdan 14 velka, omistajan Reims).** Juurisyy: viuhkan haara keräsi
`nostomuste`n ja piilotti sen listan alta, mutta **kaupunkiliuskan
haara ei kerännyt sitä lainkaan** — sen esteinä olivat vain kovat
(kaupungin nimi, nappula) ja laudan omat laatikot. Läpikuultava pohja
teki viasta näkyvän. Nyt liuskan haara kerää saman musteen, antaa sen
ladonnalle pehmeäksi esteeksi ja piilottaa listan alle jääneen
(nimiö ensin, merkki vasta jos liuska peittää senkin) — sama koodi ja
sama sääntö kuin viuhkalla. `js/pallolauta/nostot.js`.

**b) Pohja kohdistettu tekstiin (kohta 15 b).** Juurisyy: pohja
laskettiin ladonnan TÖRMÄYSlaatikosta (`kohdanLaatikko`: merkin
puolella 12 px, ulkona 16 px + nimiön leveys). Ne ovat kiinteitä
pikseleitä eivätkä kasva liuskan kirjasimen mukana (kohta 13 a), joten
18 px:n rivillä vasen marginaali oli ~19,5 px ja oikea ~1,4 px. Nyt
`piirraViuhka` latoo ensin rivit omaan ryhmäänsä, mittaa niiden
**todellisen laatikon** (`getBBox`, symbolipallot ja hiusviiva mukaan)
ja työntää pohjan sen eteen marginaalilla **0,8 × kirjasin joka
puolella**. Mittaus tehdään animaatiot sammutettuna
(`.pallolauta-viuhka-mittaus`), koska haitarin kohderivi alkaa
`translateY(-6px)`:stä ja olisi vetänyt pohjan 6 px vinoon. Jos
elementti ei vielä ole piirtopuussa, varapolku on entinen ladonnan
laatikko eikä reseptiä tallenneta — seuraava ladonta piirtää uudelleen.

**c) Puhelimen zoomiraja syvemmälle (kohta 15 c).** `lahinLeveys` saa
`syvennys`-kertoimen (oletus 1 = raja ennallaan), ja kamera antaa sille
laitteen oman kertoimen: kapea ruutu (≤ 480 css-px) JA dpr ≥ 2 → **1,5**,
eli 60 → 40 lautayksikköä. Pohjalaatta saa venyä (venytys 390 × dpr 3:
1,35 → 0,90); rantaviiva ja rajat ovat vektoria. `js/pallolauta/kamera.js`
`lahizoominSyvennys`, `PUHELIMEN_LAHIZOOMIN_KERROIN`.

## Mittaus (Chromium, 390 × 844, dpr 2)

`tools/savukkeet/mittaa-liuskan-pohja.mjs` — yksi kohdemittaus per
väite, ei koko sarjaa. **10/10 vartiota läpi.**

| Väite | Mitattu |
| --- | --- |
| 15a1 pohjan alfa 0,80–0,85 | vyöt 0,11 / 0,24 / 0,38 / 0,58 → **0,824** |
| 15a1b kartta kuultaa läpi | pohjan sävy kaappauksesta rgb(242, 222, 182), paperi on rgb(239, 220, 180) |
| 15a2 kontrasti ≥ 4,5:1 | **7,23:1** (pohja L 0,745, muste L 0,060; 110 856 pikseliä pohjan laatikosta) |
| 15a3 ei suodatinta | `filter: none`, `backdrop-filter: none` |
| 14v liuskan alla 0 näkyvää nimiötä | **0** (ennen: Reims kuulsi läpi) |
| 15b neljä marginaalia ±1 px | vasen 10,40 · oikea 10,44 · **ylä 9,61** · ala 10,46 → ero 0,85 px |
| 15b marginaali 0,8 × kirjasin | keskiarvo 10,43 px, tavoite 10,40 px (kirjasin 13,00 px) |
| 15c syvin zoomi ennen | korkeus 0,06980 · näkyvä leveys **60,00** lautayksikköä |
| 15c syvin zoomi jälkeen | korkeus 0,04654 · näkyvä leveys **40,00** lautayksikköä (kerroin 1,50) |
| 15c laudan raja seuraa | OrbitControlsin `minDistance`-korkeus 0,04654 = sama luku |
| 15c nimiön ruutukatto | 8,50 px ≤ 16 px (katto pitää) |

Ylämarginaalin 0,79 px:n ero muihin tulee tekstin `getBBox`ista: se on
kirjasimen nousun korkuinen laatikko, ja ylimmällä rivillä mustetta on
vähemmän kuin laatikkoa. Vaatimus ±1 px täyttyy.

Kaappaukset:
`docs/raportit/kuvat/liuska-pohja-20260918/liuska-pohja-jalkeen-saapuen-390.png`
(liuska auki saapumisnäkymässä) ja
`docs/raportit/kuvat/liuska-pohja-20260918/liuska-pohja-jalkeen-syvin-390.png`
(syvin zoomi Pariisissa).

`node --test tests/*.test.mjs`: 3595 läpi, 0 kaatunutta, 13 ohitettua.
`node tools/build-standalone.mjs` ajettu ennen pushia.

## RISTIRIITA FABLELLE: nostot eivät kasva kartan mukana

Kohta 15 c sanoo, että syvemmässä zoomissa *"nostojen pallot ja nimiöt
kasvavat kartan mukana (helpompi nahda)"*. **Ne eivät kasva, eikä syy
ole 16 px:n katto.** Syy on **PAATOKSET 32 kohta 4** (omistaja
17.9.2026: *"Kaikki nostoPallot ja tekstit saisi olla saman kokoisia
kuin poltetussa kartassa"*), joka lukitsi kartan kertoimen ykköseen:
`js/pallolauta/nostot.js` `nostonKarttakerroin = yksiKokoSallittu() ? 1 : …`.
Nosto on siis RUUTUVAKIO, nimiö 8,5 px joka zoomilla — mitattu sekä
vanhalla että uudella rajalla: **8,50 px molemmissa**. PAATOKSET 31:n
16 px:n katto ei siis pure lainkaan (8,5 < 16); se pysyy ennallaan,
kuten ohje vaatii.

Mitä syvennys silti antaa: kartta on 1,5-kertainen, joten nostojen
**välit** kasvavat samassa suhteessa (rykelmä harvenee, useampi nimiö
mahtuu näkyviin) ja liuskan oma teksti seuraa karttaa 13 → 18 px:n
kattoon asti. Se ei ole sama asia kuin isompi pallo.

Päätös on sinun, en koskenut kumpaankaan Raamatun kohtaan:

1. **Jätetään näin** — nostot ovat poltetun musteen kokoisia (32 k. 4),
   ja 15 c:n hyöty on isompi kartta ja harvempi rykelmä.
2. **Pallo ja nimiö seuraavat karttaa 16 px:n kattoon** — kumoaa 32
   kohta 4:n. Vipu on valmiina (`yksiKokoSallittu`, vastakoe
   `?nostokoko=0`), mutta se muuttaa kaikkien nostojen koon joka
   zoomilla, ei vain syvimmässä, ja koskee savukkeiden 8,5 px:n
   vartioita.
3. **Pallo kasvaa, nimiö ei** — vaatii merkin ja nimiön eriyttämisen:
   ne ovat nyt YKSI rasteroitu `<image>` (`piirraNostosymKartalle`),
   joten tämä on oma eränsä eikä mahdu tähän aikakattoon.

## Kosketut tiedostot

- `js/pallolauta/aihemerkit.js` — pohjan vyöt, marginaali, `piirraViuhka`, `musteenLaatikko`
- `js/pallolauta/nostot.js` — liuskan alle jäävän musteen keruu ja piilotus, reseptin tallennus
- `js/pallolauta/kamera.js` — `lahizoominSyvennys`, `lahinLeveys({ syvennys })`, `korkeusMin`
- `css/styles.css` — `.pallolauta-viuhka-mittaus`
- `tests/pallolauta.test.mjs` — vartio `korkeusMin`in uuteen muotoon
- `tools/savukkeet/mittaa-liuskan-pohja.mjs` — uusi kohdemittari (10 vartiota)

## Skaalaus

18.9.2026 klo 10.45 Suomen aikaa · Opus-agentti · sama haara
`claude/bold-ride-vow4ki-liuska-pohja`

Fablen päätös yllä olevaan ristiriitaan: **vaihtoehto 2, kerroin-1-lukko
puretaan** (Raamattu KARTTAUUDISTUKSEN PAATOKSET 34 kohta 15 TILA).
Elävä nosto — pallo JA nimiö — skaalautuu kartan mukana kuten laattaan
poltettu muste: saapumisnäkymässä poltetun merkin koko, lähemmäs
zoomattaessa isompana, kunnes nimiö osuu 16 px:n ruutukattoon
(PAATOKSET 31), jolloin molemmat seisovat.

**Vipu käännettiin, uutta mekanismia ei tullut.**
`js/pallolauta/nostot.js` `nostonKarttakerroin` on nyt
`nimenKarttakerroin(karttaskaala, vertailuskaala)` eli PAATOKSET 14:n
kerroin, ja vastakoe `?nostokoko=0` palauttaa ruutuvakion. Lipun
funktio nimettiin sen mukaan: `yksiKokoSallittu` → `kartanMittaSallittu`
(`js/pallolauta/nostoankkurit.js`). Pallo ja nimiö ovat samassa
rasterissa, joten pallo kasvaa täsmälleen siihen asti, kun nimiö osuu
kattoon — *"pallo noudattaa samaa kattoa suhteessa"*. Kaupunkimerkit ja
turisti-infon kyltti lukevat saman `nostonMitta`n
(`js/kaupunkinosto.js`), joten ne seuraavat samaa kaavaa ilman omaa
koodia.

**Ankkurit ja ryhmitys mittaavat nyt saapumisen mitalla.** Tämä oli
ainoa kohta, jota vivun kääntö ei olisi hoitanut itsestään: ankkurit ja
ryhmitys lasketaan KERRAN saapumiskehyksessä (`p × uloinOsuus`,
PAATOKSET 32 kohdat 1–2), mutta laatikon koko tuli `nostonMitta`sta eli
NYKYISESTÄ zoomista. Ruutuvakiolla se oli sama luku; kartan mitalla se
olisi ollut sitä isompi, mitä syvemmällä kamera sattui olemaan
ankkurointihetkellä — sama ladonta olisi antanut eri tuloksen eri
hetkellä. Nyt kehyksessä ladottaessa laatikko lasketaan
`saapumisMitta(d)`:llä (uusi vienti, kerroin 1). Kehykseen palautettuna
nykyinen mitta on katon alapuolella täsmälleen saapumisen mitta ja
katon yläpuolella sitä PIENEMPI, joten **katto tekee lähizoomista
väljemmän, ei ahtaamman** — kasvu ei voi synnyttää uutta limitystä.

### Mittaus (Chromium 390 × 844, dpr 2, Ranska-tallenne, Pariisi)

`tools/savukkeet/mittaa-liuskan-pohja.mjs` — **13/13 vartiota läpi**
(kaksi uutta vartiota tälle päätökselle):

| Väite | Mitattu |
| --- | --- |
| 34k15 saapumisnäkymä = poltettu muste | nimiö **8,50 px**, pallo **5,25 px** (22 merkkiä) |
| 34k15 nosto kasvaa kartan mukana | saapuen 8,50 px → syvin zoomi **16,00 px** |
| 34k15 syvimmässä zoomissa nimiö katossa | **16,00 px** = katto; pallo 9,89 px samassa suhteessa |
| 15c syvin zoomi (ennallaan) | 40,00 lautayksikköä, syvennys 1,50 × |
| 15a–15b, 14v (ennallaan) | pohjan peitto 0,824 · kontrasti 7,23:1 · marginaalit ±0,8 px · liuskan alla 0 |

`tools/savukkeet/mittaa-nostoankkurit.mjs` (Pariisi 390 px, kolme
zoomia), **10/19 vartiota läpi**. Mitan vartiot 3, 4 ja 6 lukitsivat
ruutuvakion (PAATOKSET 32 kohta 4 ja 33 kohta 3), joten ne
päivitettiin uuteen sääntöön: odotettu mitta on
`min(NOSTON_MITTA / zoomin osuus, katto)`. Vartiot 3 ja 6 ovat sen
jälkeen vihreitä kaikilla kolmella zoomilla:

| Zoomi | noston mitta (odotus) | pallon halkaisija (odotus) | limittyviä pareja |
| --- | --- | --- | --- |
| saapuminen (1,00) | 0,773 (0,773 = poltettu) | 5,25 px (5,25) | 3 |
| välizoomi (0,60) | 1,285 (1,288) | 8,74 px (8,76) | 1 |
| lähizoomi (0,34) | **1,455 (1,455 = katto)** | 9,89 px (9,89) | 1 |

Ankkurivartio 1 (*sama nosto samassa lat/lng-pisteessä kaikilla
zoomeilla*) on vihreä — kasvu ei liikuttanut ankkureita.

**Limityksistä, rehellisesti: lähizoomissa jää yksi pari, eikä se tule
kasvusta.** Pari on `Pariisi × nappula` — kaupungin NIMIKERROKSEN
teksti ja pelinappula samassa karttapisteessä, koska pelaaja seisoo
Pariisissa. Sama pari on ruudulla myös saapumisnäkymässä, jossa tämän
erän muutos on todistettavasti tyhjä (mitta 0,773 = entinen ruutuvakio
ja ankkurit lasketaan samassa kehyksessä samoilla laatikoilla), joten
pari on tätä erää vanhempi. Saapumisen kaksi muuta paria ovat
poltettua mustetta (`Camarguen hevoset × Camarguenvarsa` on laatan oma
pari, jota ei voi siirtää ilman uutta polttoa; `Cosquerin luola ×
Pétanque`). **Kasvu ei lisännyt limityksiä yhtään: 3 → 1 → 1
sisäänpäin zoomatessa.** Vartiot 2, 4 ja 5 ovat siis punaisia samoista
syistä kuin ennen tätä erää (vartio 4:n kyltti ei ollut ruudulla
lainkaan, mitta `—`); ne kuuluvat nappulan ja nimikerroksen omaan
erään, en koskenut niihin tässä aikakatossa.

`node --test tests/*.test.mjs`: **3595 läpi, 0 kaatunutta, 13
ohitettua** — yhtään lukkoa ei tarvinnut päivittää.
`node tools/build-standalone.mjs` ajettu ennen pushia.

Kaappaus 390 px syvin zoomi Pariisi (uusi, kasvaneilla merkeillä):
`docs/raportit/kuvat/liuska-pohja-20260918/liuska-pohja-jalkeen-syvin-390.png`
(ja saapumisnäkymä `…-saapuen-390.png`).

### Kosketut tiedostot (tämä osio)

- `js/pallolauta/nostoankkurit.js` — `yksiKokoSallittu` → `kartanMittaSallittu`, vivun suunta
- `js/pallolauta/nostot.js` — `nostonKarttakerroin` kartan mitaksi, `saapumisMitta`, ankkuroinnin ja ryhmityksen laatikot kehyksen mitalla
- `tools/savukkeet/mittaa-liuskan-pohja.mjs` — saapumisnäkymän mittaus ja kaksi uutta vartiota
- `tools/savukkeet/mittaa-nostoankkurit.mjs` — mitan vartiot 3/4/6 uuteen sääntöön, `?nostokoko=0`:n uusi merkitys
