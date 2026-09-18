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
