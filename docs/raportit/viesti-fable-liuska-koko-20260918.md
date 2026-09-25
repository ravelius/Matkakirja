# Viesti Fablelle: liuskan koko, rivitys ja hiusviiva (18.9.2026)

Opus, haara `claude/bold-ride-vow4ki-julkaisu-v1936` (julkaisu-PR #2574,
ei versionostoa — haara on jo v1936, ei uutta PR:ää). Aloitus 18.9.2026
klo 08.00 Suomen aikaa, mittaukset Mac Studiolla (Chromium 1234, dpr 2).
Tehtävä: edellisen erän (`viesti-fable-paikallaan-20260918.md`) hylätty
liuska — *"Kadonneet i… (2)"*, lista ruudun laidan yli, Joseph Meister
-nimiön päällä, hiusviiva Turistiopas-rivin läpi.

## 1. Koko: 25 px syntyi mittauspaikasta, ei säännöstä

Kaava oli oikea mutta rajaton. Poltetun nimiön ruutukoko on
`KARTTANIMI_KOOT.kohde × nimenKarttakerroin`, ja kerroin on **zoomin
funktio**: samassa Pariisissa se on lähizoomissa 2,94 (→ 25 px) ja
syvimmillään 10,2 (→ **86,9 px**). Edellinen erä mittasi kertoimen
syvimmästä zoomista ja kirjasi sen liuskan kooksi — siksi rivit olivat
ruudun levyisiä. Omistajan omassa v1935:n kuvassa poltettu
*"Chartresin."* oli noin 16 px, eli tavoitetaso on tuo, ei kaavan
maksimi.

**Korjaus: kaava ennallaan, katto ja lattia pikseleinä.**
`liuskanKirjasinPx()` (js/pallolauta/nostot.js) leikkaa poltetun musteen
ruutukoon väliin **13…18 px**. Mitattu kummallakin ruudulla: kaava antoi
390 px:llä 24,96 px ja 1400 px:llä 86,86 px, **rivit ovat 18,0 px**
molemmissa (13 riviä, hajonta 0,0 px).

**Riviväli seuraa kirjasinta**, ei enää viuhkan vakioita: `1,45 ×
fontti` (26,1 px) ja tihein sallittu `1,25 × fontti`, jonka lista sallii
itselleen ennen kelausta. Rivin puolikorkeus on puolet tiheimmästä
välistä, joten rivilaatikot koskettavat toisiaan mutta eivät mene
päällekkäin — ennen puolikorkeus oli 11 px:n kirjasimelle mitoitettu
vakio 13 px ja **osumalaatikko oli tekstiä matalampi**.
`viuhkanAsemat`, `kohdanLaatikko`, `listanPohja` ja
`keskitettyMahtuvatRivit` saivat nämä valinnaisina parametreina, joten
aihemerkin viuhka latoo kuten ennenkin (oletukset ovat sen omat vakiot).

## 2. Ei katkaisua: leveys sisällöstä, loppu rivittyy

Katkaisu poistui kokonaan (`LIUSKAN_VAHIN_MERKKIA`, `…`). Rivin tila on
nyt suurempi kahdesta — merkin oikealle puolelle jäävä tila tai puoli
ruutua — **leikattuna 78 %:iin ruudun leveydestä**
(`LIUSKAN_LEVEYDEN_OSUUS`). Se, mikä ei mahdu, jaetaan sanoittain
useammalle riville; lukumäärä `(n)` liimataan edeltävään sanaan, jottei
se jää yksin omalle rivilleen, eikä sanaa koskaan katkaista.

**Rivitys on ladonnan asia, ei listan sisältöä.** Yksi mallirivi voi
piirtyä kahdelle riville, mutta osumatesti lukee saman rivin (kumpikin
puolisko avaa saman asian) ja `liuskanRivit()` palauttaa sen YHTENÄ
rivinä, jonka laatikko on osien yhteinen laatikko. Ilman tätä vartiot
8f/8g (*"kohteita = otsikon luku"*) olisivat laskeneet rivitetyn nimen
kahdesti.

**Kamera saa siirtää enemmän** (ohjeen kohta 4): kaupunkimerkki ajetaan
nyt ruudun **neljännekseen** kolmanneksen sijaan
(`LIUSKAN_MERKIN_OSUUS_X`, js/pallolauta/lauta.js), jolloin leveämpi
lista mahtuu merkin oikealle puolelle ilman turhaa rivitystä. Mitattu
390 px:llä: levein rivi **177,5 px** (kotelo 374 px), rivityksiä ei
syntynyt yhtään — eli tila riitti kaikille nimille sellaisenaan.

## 3. Hiusviiva omalle rivilleen

Viiva oli ensimmäisen kategoriarivin SISÄLLÄ 11 yksikköä sen yläpuolella
— yksiköt kasvavat kirjasimen mukana, joten isommalla rivillä se nousi
Turistiopas-rivin tekstin läpi. Nyt se on **oma rivinsä** listassa
(`laji: 'hiusviiva'`), joten sen molemmin puolin on riviväli eli
`1,45 × fontti`; rivin puolikorkeus on `0,625 × fontti`, jolloin ilmaa
jää `0,825 × fontti` — yli vaaditun puolikkaan myös tiheimmällä välillä
(silloin tasan 0,5 × fontti). Viiva ei ota napautusta (sormi menee
läpi), ja kamera-ajo varaa sille yhden rivin verran korkeutta.

## 4. Mittaukset (yksi ajo per ruutu, ei vastakoetta)

`savuke-pariisi-lahizoom.mjs`, molemmat ruudut **täysin vihreitä**:
**390 px: 37/37**, **1400 px: 36/36**. Vanhat vartiot 8j (avattu
kategoria ruudussa eikä nimen tai nappulan päällä) ja 8k (keskitys +
oikea puoli) pysyivät vihreinä, samoin 8m ja 8n (paikallaan vedossa ja
zoomissa).

| vartio | väite | 390 px | 1400 px |
|---|---|---|---|
| 8l (uusittu) | rivin fonttikoko 13–18 px | 18,0 px | 18,0 px |
| 8l2 | levein rivi mahtuu koteloon | 177,5 / 374 | 177,5 / 1379 |
| **8l3 (uusi)** | yksikään rivi ei katkea kolmeen pisteeseen | 0 katkaistua | 0 |
| **8l4 (uusi)** | liuska ruudussa eikä leikkaa nimeä, nimiötä, nappulaa tai pulua | 0 leikkausta (7 estettä) | 0 (2 estettä) |

8l4 lukee esteet DOMista eikä mallista: kartan nimet
(`.pallolauta-nimi .karttanimi`), muiden nostojen nimiöt (listan alle
piilotetut ja liuskan oma merkki pois), pelinappula ja kelluvat napit.

**Kaappaukset** (Skandaalit auki, liuska auki):
`docs/raportit/kuvat/liuska-koko-20260918/liuska-auki-390.png` ja
`…/liuska-auki-1400.png` (lisäksi `pariisi-liuska-kategoria-*.png` ja
`pariisi-liuska-auki-*.png` molemmilta ruuduilta).

**INFO, ei tämän erän väite:** 1400 px:n kaappauksessa liuska on
kartan laattaan POLTETUN *"Kaulanauhajuttu"*-tekstin päällä. Poltettu
muste ei ole DOM-laatikko eikä sitä voi piilottaa (Raamattu: POLTETTUA
MUSTETTA EI PIILOTETA), joten yksikään vartio ei näe sitä eikä ladonta
voi väistää sitä. Jos tämä on korjattava, se on oma päätöksensä
(esim. liuskan pohjan peitto tai poltetun rivin jäsenyys) — Fablelle.

## 5. Muu

- `node --test tests/*.test.mjs`: **3608/3608 läpi** (13 skipattua).
- `node tools/build-standalone.mjs` ajettu ennen pushia.
- Ei koskettu Raamattuun, `sarjat.json`iin, `js/linssit/`-kansioon,
  `js/fokusvirta.js`:ään eikä nimen/nostojen lukkosääntöihin (kohdat
  13 b–c ennallaan).
- Ei versionostoa, ei uutta PR:ää; push päivittää PR:n #2574.
