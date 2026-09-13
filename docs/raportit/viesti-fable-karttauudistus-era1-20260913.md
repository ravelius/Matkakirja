# Karttauudistus, erä 1 — Ranskan värillinen topografia (pilotti)

*(Opus-työsessio Fablelle 13.9.2026. Haara
`claude/karttauudistus-era1-topografia`. Ei versionostoa, ei dist/:iä,
ei laattoja repossa. Jokainen luku tässä raportissa on MITATTU; arvioiksi
merkityt on merkitty sanalla "arvio".)*

## 0. Lyhyesti

Suunnitelman (docs/raportit/karttauudistus-suunnitelma-20260913.md)
**erä 1 on tehty vaihtoehdon (c) mukaan**: kohdemaalle ajetaan toinen
laattajoukko samalle laattaruudukolle (`vari/z…`), peli piirtää sen
omana kerroksenaan pohjan päälle ja rajaa sen kohdemaan aluevesirajaan
(`clipPath`). Punainen rajaviiva on palautettu (`--mark` #b03a2b,
2,5 px). Uloszoomaukseen ei koskettu.

Savuke `savuke-varilaatat` on **6/6 vihreä**, ja sen **vastakoe**
(leikkuri riisuttu) kaataa kaksi väitettä neljästä mittauspisteestä —
luvut luvussa 4.

**YKSI ISO LÖYDÖS, JOKA EI OLE SUUNNITELMASSA (luku 7.1):** tasokartta
on pelistä pois käytöstä (`js/ui-apurit.js VANHA_KARTTA_KAYTOSSA =
false`, omistaja 7.9.2026), eli peli avautuu pallolle. Väritaso on
tasokartan kerros. **Omistaja ei siis näe tämän erän värejä pelatessaan**
ennen kuin joko tasokartta palaa tai värit tehdään myös pallon
laattakerrokseen (js/pallolaatat.js). Se on oma eränsä, ja se on
päätettävä ennen kuin erät 2–5 ajetaan, koska nekin ovat tasokartan
eriä (zoomirajat, maapaneeli, kaupungin pop-up).

## 1. Mitä tehtiin

| Tiedosto | Muutos |
| --- | --- |
| `tools/fokuskartta/piirto.js` | Toinen väriasteikkopari: `VARI_ASTEIKKO` (hypsometria) ja `VARI_SYVYYS` (meren syvyys). Luvut sanasta sanaan `tools/tee-reliefikartta.mjs`:n MAA- ja MERI-asteikoista. `lerpSyvyys` yleistettiin `lerpSyvyysAsteikolla`ksi (entinen rajapinta säilyi). Seepia-asteikot EIVÄT muuttuneet. |
| `tools/fokuskartta/maailmapiirto.js` | Asetus `variPaletti`: valitsee asteikkoparin ja meren peittävyyden (0,5 → 0,9). Muu piirto on bitilleen sama koodi. |
| `tools/generoi-laattapyramidi.mjs` | Ajotila `--vari <ISO>` (+ `--variversio`, `--aluevesi`). Alue luetaan kohdemaan polygonista, laatat menevät polkuun `vari/z…`, ja luetteloon tulee `varitaso`-olio. Uusi vakio `MERKKITASO` kokoaa neljä pohjan rinnalla ajettavaa tilaa yhdeksi säännöksi. |
| `js/maanaariviivat.js` | `ALUEVESI_YKSIKKOA = 6.7` (12 mpk) ja `maanAluevesiPolku()`: maan renkaat työnnettynä ulospäin pyörein kulmin, muistissa maittain. |
| `js/laattapyramidi.js` | Väritason kerros (`varitasonTasot`, `paivitaVaritaso`), leikkuri `clipPath`ina, osoite `<variversio>/vari/z…`, mittarit `varillisia` ja `variMaa`. |
| `js/maatummennus.js` | `TUMMENNUS_VIIVA` 2 → **2,5** px. |
| `css/styles.css` | `.maatummennus-viiva` stroke `rgba(70,51,31,0.6)` → **`var(--mark)`** (#b03a2b, täysi peitto). |
| `tools/savukkeet/savuke-varilaatat.mjs` | Uusi savuke (luku 4). Löytyy automaattisesti `tools/tarkista-savukkeet.mjs`:n sarjaan (se lukee koko kansion). |
| `tools/savukkeet/README.md` | Savuke luetteloon ja taulukkoon, ohitusluvun täsmennys. |

**EI koskettu:** nostoihin, lehtiin, kulkutapoihin, aarteeseen,
korkeusaineistoon, versionumeroon, uloszoomauskertoimeen eikä muiden
maiden ulkoasuun. Seepiakartta on pikselilleen entisensä, kun väritasoa
ei ole (todistus: luvun 5 vertailuajo `--ilman-varia`).

## 2. Kaksi ratkaisua, jotka poikkeavat suunnitelman kirjaimesta

**2.1 Aluevesipuskuri lasketaan AJOSSA, ei erilliseen tiedostoon.**
Suunnitelma (luku 2.6) ehdotti, että `tools/generoi-maapolygonit.mjs`
kirjoittaa toisen tiedoston `assets/data/maapolygonit-aluevesi.json`.
Ehto — *"ajossa on yhä yksi tavallinen clipPath yhdellä polulla, ei
mask, ei suodatin"* — täyttyy myös näin, ja kaksi syytä puhui laskennan
puolesta: toinen tiedosto olisi 1,4 Mt lisää repoon ja **toinen totuus
samasta rajasta** (juuri se, minkä omistaja korjautti 1.9.2026), ja
`generoi-maapolygonit.mjs` vaatii Natural Earthin lähdeaineiston
latauksen, jota pelkkä puskurin lisäys ei tarvitse. **Mitattu hinta:
Ranskan polku 36 ms ja 6 323 pistettä, kerran maanvaihtoa kohti,
muistissa** (js/maanaariviivat.js, sama muistimalli kuin
maatummennuksen polkumuistilla). Tiedosto on yhä helppo tehdä, jos
Fable haluaa sen — funktio on valmis.

**2.2 Punainen viiva on `js/maatummennus.js`:ssä, ei tehtävänannon
tiedostolistalla.** Kehän piirtää tuo moduuli (tehtävänannossa oli
`js/maanaariviivat.js`, joka on PALLON ääriviiva). Muutin sen, koska
omistajan päätös koski nimenomaan tasokartan kehää; suunnitelman luku
3.4 nimeää saman rivin.

## 3. Laatat: määrä, koko, polut

Ajettu kontin scratchpadiin, **ei repoon**:
`/tmp/claude-0/-home-user-Matkakirja/2aae744d-0307-51b2-bbc0-4cdbb6a77322/scratchpad/vari-fra/`

```
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 4-7 --kaariminuutit 3 --alue -5.34,41.19,9.77,51.24   # pohja
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 4-7 --kaariminuutit 3 --vari FRA                      # värit
```

| | laattoja | tavuja | tavua/px | aika |
| --- | ---: | ---: | ---: | ---: |
| pohja (seepia, patina täysi) | 84 | 5,42 Mt | 0,243–0,257 | 157 s |
| **väri (FRA, ei patinaa)** | **84** | **2,54 Mt** | **0,108–0,161** | **61 s** |

Väritaso tasoittain: z4 2 laattaa / 0,08 Mt · z5 6 / 0,22 Mt ·
z6 20 / 0,64 Mt · **z7 56 / 1,59 Mt**. Polku ämpärissä:
`pyramidi/<variversio>/vari/z<taso>/<sarake>/<rivi>.webp`.

**Patina on väritasolla oletuksena pois.** Sen sävykäyrä,
pastellihaalennus ja meren litistys globaaliin seepiasävyyn vetäisivät
sinisen ja vihreän takaisin ruskeaan; paperin rae, kuitu ja pigmentti
tulevat silti moottorin omasta pikselisilmukasta, joten laatta on yhä
samaa painettua karttaa kuin naapurinsa (ks. kuvat luvussa 6).
`--patina taysi` pakottaa passin takaisin vertailukuvia varten.

**Korkeusaineisto on 3 kaariminuuttia** (repon oma
`tools/korkeusaineisto/etopo-3kaariminuuttia.bin.gz`, ETOPO1, PD).
Tuotannon z7 ajetaan 1′:llä R2:n paloista; se on `--kaariminuutit 1`
eikä vaadi koodimuutosta. Pilotissa 3′ valittiin, koska se ei tarvitse
verkkoa — tämä on kirjattava, jos laatat joskus julkaistaan tästä
ajosta (ks. luku 7.4).

## 4. Savuke ja sen vastakoe

`tools/savukkeet/savuke-varilaatat.mjs` avaa pelin, siirtää nappulan
Pariisiin, ajaa kameran mittauslaatikkoon ja lukee neljä pikseliä
kuvakaappauksesta (mediaani 9 × 9 ruudusta). Luokittelu on kolme
toisensa poissulkevaa ehtoa: sininen suurin = `vari-vesi`, vihreä
suurin = `vari-maa`, punainen suurin ja r > b + 12 = `seepia`.
Seepia-asteikot ovat joka portaallaan r > g > b, joten seepiapikseli ei
voi lukeutua värilliseksi.

### 4.1 VIHREÄ AJO

```
PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers \
  node tools/savukkeet/savuke-varilaatat.mjs --laatat <kansio>
```

| piste | rgb | luokka | odotus |
| --- | --- | --- | --- |
| Keski-Ranska (2,0 E 47,3 N) | **112,157,79** | vari-maa | vari-maa |
| Belgia, Namur (4,6 E 50,6 N) | **230,222,181** | seepia | seepia |
| Välimeri ~8 mpk (5,3 E 43,15 N) | **168,204,230** | vari-vesi | vari-vesi |
| Välimeri ~40 mpk (5,3 E 42,5 N) | **192,186,168** | seepia | seepia |

Mittarit: taso z6 · pohjalaattoja 32 · värilaattoja 16 · väritaso
rajattu maahan FRA. **6/6 väitettä läpi.**

### 4.2 PUNAINEN AJO (vastakoe, `--ilman-rajausta`)

Leikkuri riisutaan kerrokselta (`clip-path`-attribuutti pois) eikä
mitään muuta muuteta.

| piste | rgb | luokka | odotus |
| --- | --- | --- | --- |
| Keski-Ranska | 112,157,79 | vari-maa | vari-maa |
| **Belgia, Namur** | **97,145,71** | **vari-maa** | seepia → **FAIL** |
| Välimeri ~8 mpk | 168,204,230 | vari-vesi | vari-vesi |
| **Välimeri ~40 mpk** | **84,130,183** | **vari-vesi** | seepia → **FAIL** |

**4/6 väitettä läpi.** Belgia värittyy vihreäksi ja avomeri siniseksi
heti kun leikkuri poistetaan — eli leikkuri on se ja ainoa asia, joka
pitää värit Ranskassa, ja savuke mittaa sitä eikä jotain muuta.

### 4.3 Savukkeen kaksi ansaa, jotka löytyivät matkalla

Kirjaan nämä, koska ne olisivat tehneet mittarista valehtelijan:

1. **Mittauspiste osui saapumiskorttiin.** Belgian piste oli
   `section.intro`-kortin pergamentin päällä, ja V2 meni läpi myös
   leikkuri riisuttuna. Korjaus: tekstikortit piilotetaan mittauksen
   ajaksi (`visibility`, ei `display` — asettelu ei saa muuttua) JA
   jokainen piste tarkistetaan `elementFromPoint`illa: jos ruudun se
   kohta ei kuulu karttapaneeliin, väite kaatuu näkyvästi.
2. **Luokittelija luki sinisen vedeksi väärässä järjestyksessä.**
   Matala rannikkovesi on 176,214,240 — myös sen vihreä on punaista
   suurempi. Sininen on siksi testattava ensin.

## 5. Suorituskyky ja laattamäärä

Mitattu kontissa, Chromium `/opt/pw-browsers/chromium`, iPhone-profiili
390 × 844 dpr 3, nappula Pariisissa. Vertailu on sama ajo kahdesti:
"ilman väriä" tarjoilee luettelon, josta `varitaso` on poistettu — eli
peli on täsmälleen se, mikä se oli ennen tätä erää.

| näkymä | taso | pohjalaattoja | värilaattoja | yhteensä vs. ennen |
| --- | --- | ---: | ---: | ---: |
| leveys 1150 yks | z4 | 70 | 2 | **+2,9 %** |
| leveys 300 yks | z6 | 84 | 20 | **+23,8 %** |
| leveys 150 yks | z7 | 78 | 42 | **+53,8 %** |

**Valmis-kriteeri "ei yli kaksinkertaista laattamäärää" täyttyy
selvästi**: pahin tapaus on +54 %, ei +100 %.

FPS (5 s kamera-ajo, rAF-kehykset laskettuna):

| | kehyksiä | kesto | fps |
| --- | ---: | ---: | ---: |
| ilman väriä | 315 | 5 285 ms | **59,6** |
| värillä | 314 | 5 312 ms | **59,1** |

**Tulkinta rehellisesti:** molemmat osuvat ruudunpäivityksen kattoon
(60 Hz), eli kartan liike on yhä kompositorilla eikä kerros nosta
kehysaikaa mitattavasti — mutta tämä mittaus EI erota pientä eroa,
koska kumpikin on katossa. Tehtävänannon odotus "kontti renderöi 2–3
fps" ei toteutunut: kamera-ajo on CSS-muunnos eikä uudelleenmaalaus,
joten kontti pysyy vsyncissä. Oikea rasitusmittaus (jatkuva
uudelleenmaalaus) ja laitetodennus iPadilla ovat yhä tekemättä —
erityisesti `clipPath` iOS:n webapp-tilassa (suunnitelman riski 2.5).

## 6. Kuvakaappaukset — mitä NÄIN

Kuvat ovat scratchpadissa
(`…/scratchpad/kuvat/`), eivät repossa:
`z4-varilla.png`, `z6-varilla.png`, `z7-varilla.png` ja niiden
`-ilman-varia`-parit, sekä `varilaatat.png` ja
`varilaatat-ilman-rajausta.png`.

- **z6 (koko Ranska ruudussa).** Ranska on yhtenäinen värillinen alue:
  alangot vihreitä, Massif Central ja Alpit keltaisen kautta ruskeaan,
  Pyreneet ruskeat. **Punainen kehä kulkee koko maan ympäri** ja on
  selvästi luettava ilman että siitä tulee tolppa. Englanti, Belgia,
  Saksa, Sveitsi, Italia ja Espanja ovat seepiaa. **Rannikolla on ohut
  sininen kaistale** — Atlantilla, Kanaalissa ja Välimerellä — ja sen
  ulkopuolella meri on entistä lämmintä paperia. Sininen kaistale
  seuraa rantaa myös Gironden suistossa ja Bretagnen niemien ympäri.
- **z7 (Pariisi ja Keski-Ranska).** Maaston muoto on selvästi
  tarkempi kuin topografialinssissä: Loiren laakso, Massif Centralin
  reuna ja Vogeesit erottuvat. Aluevesikaistale on täällä noin 48 px
  leveä ja siinä näkyy syvyysporrastus (vaaleampi aivan rannassa).
  Saumaa värilaatan ja seepian välillä ei näy missään — leikkuri
  kulkee rantaviivan päällä.
- **z4 (Eurooppa).** Ranska on pieni värillinen läiskä ruskean keskellä
  ja kehä lukee yhä. **HUOM:** kuvassa on paljon tyhjää pergamenttia,
  koska pilottilaatasto kattaa vain Ranskan laatikon — se on pilotin
  rajaus eikä vika.
- **Vastakoekuva** (`varilaatat-ilman-rajausta.png`): väri vuotaa
  suorakaiteena yli Belgian, Sveitsin ja Välimeren. Juuri sen
  suorakaiteen leikkuri kaataa.

## 7. Avoimet asiat (Fablelle ja omistajalle)

**7.1 TASOKARTTA ON POIS KÄYTÖSTÄ — tämä on erän tärkein löydös.**
`js/ui-apurit.js VANHA_KARTTA_KAYTOSSA = false` (omistaja 7.9.2026:
*"Voisiko vanhan kartan ottaa pelistä ainakin väliaikaisesti kokonaan
pois"*). Peli avautuu pallolle, ja pallon laattakerros
(`js/pallolaatat.js`) piirtää pyramidin laatat pallon pinnalle omalla
koneistollaan. Väritaso on tasokartan kerros, joten se ei näy pallolla.
Suunnitelma ei mainitse tätä sanallakaan, vaikka sen luvut 3, 4 ja 6
(saapumiszoomi, maapaneeli, Liiku-nappi) ovat kaikki tasokartan
koodia. **Tämä on päätettävä ennen erien 2–5 aloittamista.** Kaksi
tietä:
- *(a)* Tasokartta palaa käyttöön — yksi vakio, mutta omistajan päätös.
- *(b)* Värit tehdään myös pallon laattakerrokseen. **Arvio:** oma
  erä, kokoluokka M–L. Pallo piirtää laatat pinnalle laatta kerrallaan,
  joten leikkuri ei voi olla yksi `clipPath` vaan se on poltettava
  laattaan tai tehtävä kankaalla laatta kerrallaan
  (`globalCompositeOperation = 'destination-in'`, ei suodatinta).
  Suositus: jos pallo on pelin kartta, värit kuuluvat sinne — mutta se
  on eri toteutus kuin tämä erä, ei monistus.

**7.2 Toisen maan monistaminen — komento ja arvio.** Peli EI tarvitse
koodimuutosta: `varitaso.maa` kertoo, kenen laatat ämpärissä ovat, ja
kerros piirretään vain kun pelaaja on siinä maassa. Komento on yksi:

```
node tools/generoi-laattapyramidi.mjs <kohde> --data <ne-kansio> \
     --tasot 4-7 --kaariminuutit 3 --vari <ISO A3>
```

Mitattu Ranskasta johdettu arvio (0,12 tavua/px, 0,81 Mpx/s, laatikko
`maanLautalaatikko` + 6,7 yksikköä):

| maa | laatikko (yks) | laattoja z4–z7 (arvio) | tavuja (arvio) | aika (arvio) |
| --- | --- | ---: | ---: | ---: |
| FRA | 503 × 420 | **84 (mitattu)** | **2,54 Mt (mitattu)** | **61 s (mitattu)** |
| GRC | 468 × 292 | ~60 | ~1,8 Mt | ~45 s |
| ESP | ~430 × 330 | ~62 | ~1,9 Mt | ~45 s |
| ITA | ~330 × 470 | ~60 | ~1,8 Mt | ~45 s |
| DEU | ~300 × 330 | ~45 | ~1,4 Mt | ~35 s |

**RAJOITE, JOKA ON RATKAISTAVA ENNEN SUURIA MAITA:** luettelon
`varitaso` on YKSI olio, eli pyramidissa voi olla kerrallaan yhden maan
värilaatat. Kun maita on useampi, kentästä on tehtävä maittain
avaimellinen taulu (`varitasot: { FRA: {...}, GRC: {...} }`). Se on
pieni muutos (arvio S) sekä generaattoriin että
`js/laattapyramidi.js`:n `varitasonTasot`iin, mutta se on tehtävä
ENNEN toista maata — muuten toinen ajo pyyhkii ensimmäisen.

Suurissa maissa (RUS 5 772 × 2 273) z7 on suunnitelman luvun 2.3
mukaan mahdoton yhtenä kuvana mutta laattoina kelpaa; arvio on
~3 450 laattaa ja ~13 min. Sitä ei ole mitattu.

**7.3 Merentakaiset osat.** Laattojen laatikko tulee
`maanLautalaatikko`sta, joka jättää Guayanan ja Réunionin pois
(SAARIVARA) — oikein, muuten Ranskan ajo olisi puolen maailman
kokoinen. **Leikkuri sen sijaan sisältää ne** (se kääntää kaikki
renkaat). Tämä ei näy pelissä, koska niillä alueilla ei ole
värilaattoja, mutta se tarkoittaa, että leikkurin polku on turhan
pitkä (6 323 pistettä, joista osa Etelä-Amerikassa). Jos tästä joskus
tulee hidaste, leikkuri kannattaa rajata samaan laatikkoon.

**7.4 Pilottilaatat ovat 3′-aineistosta.** Jos nämä laatat viedään
ämpäriin sellaisenaan, luetteloon on merkittävä, mistä aineistosta
väritaso on poltettu — nyt `korkeus`-kenttä kuvaa vain pohjaa
(väritasoajo ei kirjoita sitä, koska se on merkkitaso). Tuotantoajo
tehtäneen 1′:llä samalla komennolla.

**7.5 Yksi viereinen korjaus, jonka tein.** Merkkitasoajo (nosto,
viiva, ranta, väri) ei enää pyyhi luettelosta `meriSavy`- ja
`alue`-kenttiä. Ennen tätä erää nosto-, viiva- ja rantatasoajo
nollasivat `meriSavy`n, jolloin peli olisi jättänyt karsitun
umpimeren laatan paikan maalaamatta. Korjaus oli oman ajotilani
välitön edellytys (sama koodipolku), joten tein sen samalla — mutta se
koskee myös kolmea vanhaa ajotilaa, ja siksi se on tässä kirjattuna.

**7.6 Mitä EI vielä ole todennettu.** `clipPath` oikealla iPadilla
(suunnitelman riski: iOS:n webapp-tila pudotti suodattimelliset
kerrokset; `clipPath` on geometriaa eikä pikselipassia, mutta se on
todennettava). Myöskään jatkuvan uudelleenmaalauksen rasitusta ei ole
mitattu (luku 5).

## 8. Portit

| portti | tulos |
| --- | --- |
| `npm test` | **3305 testiä, 3292 pass, 0 fail** |
| `node tools/tarkista-kaksoisavaimet.mjs` | ei kaksoisavaimia |
| `node tools/tarkista-niputus.mjs` | 388 moduulia, 4166 julistusta, ei törmäyksiä |
| `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers node tools/tarkista-savukkeet.mjs` | savukkeet kunnossa: 1495 ui-viittausta |
| `node tools/build-standalone.mjs` | dist/matkakirja.html 31 756 kt (EI committiin) |
| `grep -rn '^<<<<<<<' js css tests tools` | tyhjä |
| `savuke-varilaatat` | **6/6** |
| `savuke-varilaatat --ilman-rajausta` | **4/6 (vastakoe punainen, kuten pitää)** |
