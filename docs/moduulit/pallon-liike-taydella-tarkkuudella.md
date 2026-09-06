# Pallon liike ja zoom täydellä tarkkuudella — mittaukset, kirjastovertailu ja toteutussuunnitelma

*(Moduuli: karttapallo pelilautana (js/pallo.js, js/pallolauta/).
Linjaukset: Raamattu › "PALLO LEVOSSA YHTA TERAVA KUIN TASOKARTTA" ja sen
lisäys "PALAUTE v1642:STA, LIIKKEEN AIKAINEN TARKKUUS" (omistaja
6.9.2026 ilta), "KAIKKI LIIKE ANIMOIDAAN PEHMEASTI", "KARTTAPALLO ON
PELILAUTA". Tämä dokumentti kertoo MITEN — ristiriidassa Raamattu
voittaa. Laatija Fablemax 6.9.2026. SUUNNITELMA JA TEHTÄVÄNANNOT:
omistajan tarkennus 6.9.2026 ilta: *"Sitten kun toteutussuunnitelma on
valmis, niin se kannattaa siirtää opukselle työn alle, tai ei ainakaan
Fablemaksen kannata itse toteuttaa. Riittää, että se arvioi ja
suunnittelee."* — pelikoodia ei ole muutettu; mittarit ja kokeilusivut
ovat repossa (luku 9). Kaikki luvut on mitattu, ei arvattu; mittausten
rajoitukset luvussa 2.0.)*

## 0. Omistajan linjaus 6.9.2026 ilta, sanatarkasti

> "Saisiko tuota siirron aikaista matalampaa resoluutiota mitenkään
> parannettua? Siinä ei oikeastaan ole mikään muu häiritsevää kuin
> rannan ääriviiva, koska se kasvaa niin paljon paksummaksi. Ja silloin
> näyttää, että kartta muuttuu jotenkin liikaa."

> "Tai keksikö kartan liikuttamiselle mitään muuta optimointikeinoa,
> niin että siirron ajaksi ei tarvitsisi edes pudottaa resoluutiota. Se
> vanha karttahan pyörii hienosti täydelläkin tarkkuudella."

> "Google Earthissä myös sisäänpäin zoomaus näyttää portaattomalta. Sen
> voisin myös samalla tutkia, miten sen saisi toteutettua. Tämä on pelin
> ehkä yksi keskeisimmistä tekniikoista, niin käytetään siihen nyt
> kaikki resurssit, että saadaan toimimaan."

> "Tai löytyisikö netistä tähän jo valmista koodiratkaisua?"

> "Työn kestolla ei ole väliä, kunhan saadaan paras mahdollinen
> lopputulos." … "Opukset voivat sitten käyttää agenttiparvia, niin
> saadaan nopeammin toteutettua, kun suunnitelma on valmis."

Tavoite yhdessä lauseessa: **puhelimella pallo panoroi ja zoomaa kuten
Google Earth — rantaviiva ei paksune liikkeessä, tason vaihto ei
poksahda eikä jätä tyhjää, kehysajat pysyvät tasaisina.**

## 1. Tiivistelmä ja suositus

1. **Juurisyy paksuun rantaviivaan:** liikkeessä laattamoottori
   putoaa kirjaston omalle tasolle (Ateenan lähikuvassa Z5), ja
   pyramidin karkeat tasot on *piirretty* paksulla rantaviivalla —
   kyse ei ole vain sumeudesta vaan toisesta kartasta. Mitattu Ateenan
   lähikuvassa puhelimella: reunan leveys levossa **2 px** (Z8), liikkeessä
   **5 px** (Z5); musteviivan paksuus **1 → 8 px** (luku 2.1).
2. **Miksi "tarkkuus aina" (?laatu=aina) on raskas:** ei piirtämisen
   takia vaan laattamoottorin takia. Tasolla 8 moottori luetteloi joka
   kameranliikkeellä tuhansia laattaehdokkaita (±90 · korkeus astetta),
   ei koskaan pura niitä (227 → 500 → 975 laattaa kahdella
   panoroinnilla), lataa ~70 laattaa sekunnissa ja käyttää yhden
   piirtokutsun laattaa kohti (215–420 kutsua/kehys). updatePov maksoi
   Z8:lla keskimäärin **33 ms** ja pahimmillaan **558 ms** (4×
   hidastettuna) — se on nykivä liike (luku 2.2).
3. **Valmiit kirjastot** (luku 3): MapLibre GL JS ja CesiumJS
   pitävät tarkkuuden liikkeessä ja häivyttävät laatat, mutta
   MapLibre vaatisi koko pallolaudan (8 100 riviä Globe.gl:n päällä)
   uudelleenkirjoituksen eikä pidä karkeaa varapyramidia (tummia
   aukkoja hitaalla verkolla); Cesium on 6,6 Mt. NASA:n
   3d-tiles-renderer toimii omilla laatoillamme ja häivyttää laatat,
   mutta tuo toisen three.js-kopion (2,6 Mt) Globe.gl:n viereen ja
   käyttää vain Mercator-sarjaa, joka on pyramidia epätarkempi. Mikään
   ei täytä vaatimuksia kohtuullisella siirrolla.
4. **Suositus: oma laattakerros Globe.gl:n sisään** (luku 4) —
   sama tekniikka, jolla lepokerros jo nyt kokoaa pyramidin laatat
   pallon pinnalle, mutta pysyvänä, laatta kerrallaan, joka korkeudella
   ja joka hetki: taso valitaan ruudun pikseleistä, uudet laatat
   häipyvät vanhojen päälle (Google Earthin ristihäive), vanhat
   pysyvät kunnes uudet peittävät ne, näkymän ulkopuoliset puretaan
   LRU-kiintiöllä, ja kirjaston oma moottori jää karkeaksi pohjaksi
   (taso ≤ 5) napojen ja latauksen ajaksi. Lepokerros ja liike/lepo-
   laatutilat käyvät tarpeettomiksi ja poistetaan. Lähde on
   tasokartan oma pyramidi (240 px/aste, webp, kolme kerrosta) — sama
   kartta kuin vanhalla kartalla, joka "pyörii hienosti täydelläkin
   tarkkuudella".
5. **Työ jaetaan viiteen erään** (luku 6): E0 runko (siirto, ei
   käytöstä), E1 laattakerros (isoin), E2 mittarin vartiot, E3
   siivous (vanhat laatutilat, vipu, lepokerros, testit), E4
   avauslennon esilataus pyramidilaatoille, E5 nostojen
   poltettu-päätös pyramidista. E0 ensin; E1 ja E2 rinnakkain; E3
   vasta kun omistaja on hyväksynyt E1:n puhelimella; E4 ja E5 E3:n
   jälkeen rinnakkain.

## 2. Mittaukset ennen muutoksia

### 2.0 Miten mitattiin ja mitä luvut tarkoittavat

Mittari: `tools/savukkeet/mittaa-pallon-liike.mjs` (Playwright,
Chromium `/opt/pw-browsers/chromium`, ämpäri Noden fetchillä,
palvelutyöntekijä estetty). Puhelinkoko 390 × 844 dpr 3 (iPhone-luokka),
työpöytä 1440 × 900 dpr 2. Tallenne: Fogg Ateenassa. Kamera asetetaan
Ateenan ylle korkeuteen 0,35 (omistajan kuvien näkymä), panoroidaan
kaksi ruudunleveyttä (302 lautayksikköä ≈ 9,1°) itään 4 s:ssa ja
takaisin 8 s:ssa; zoom ajetaan 2,5 → 0,05 logaritmisesti 8 s:ssa.
CPU-hidastus 4× (CDP `Emulation.setCPUThrottlingRate`) on päällä
mittausjaksoilla, ei kuvakaappauksissa.

Mitat:

- **Reunan leveys** (px): jokaisella keskialueen (60 % × 50 % kotelosta)
  rivillä ja sarakkeella luminanssigradientin huippujen leveys puolen
  huipun korkeudella (FWHM); mediaani ja p90. Terävä reuna on 1–2 px,
  6× venytetty laatta 5–10 px. Tämä on omistajan "rannan ääriviiva".
- **Musteviivan paksuus** (px): tummien pikselien (luminanssi < 150)
  lyhyemmän vaaka/pystyjuoksun mediaani. Rantaviivan musteviiva ja
  poltettu teksti ovat samaa mustetta.
- **updatePov**: kirjaston laattamoottorin päivityskutsun kesto (JS),
  n = kutsuja mittausjaksolla.
- **Laattoja / takana**: laattaverkkoja scenessä ja niistä pallon
  takapuolella (kameran vastakkaisella puolella). **dc** = three.js:n
  piirtokutsut kehyksessä, **tex** = tekstuurit näytönohjaimessa.
- **Laattapyyntöjä**: verkkopyynnöt `julisteet/`-polkuun jakson
  aikana (selaimen muistivälimuistista tulevat eivät näy).
- **Kehysajat**: rAF-välit. HUOM: kontin Chromium piirtää
  ohjelmistorasteroijalla (swiftshader), joten dpr 3:n kehys kestää
  1–2 s eikä vastaa laitetta. Kehysajat kelpaavat vain tilojen väliseen
  vertailuun; laitteelle pätevät JS-osuudet (updatePov, laattamäärät,
  pyynnöt, tekstuurit) ja kuvamitat.

### 2.1 Rantaviivan paksuus levossa ja liikkeessä (puhelin, Ateena 0,35)

| Tila | Laattataso | Reuna mediaani / p90 | Muste mediaani / p75 | Laattoja | dc | tex |
| --- | --- | --- | --- | --- | --- | --- |
| Lepo (nykyinen) | Z8 | **2 / 4 px** | **1 / 2 px** | 227–312 | 215–218 | 201–204 |
| Liike (nykyinen, kirjaston taso) | Z5 | **5 / 8 px** | **8 / 12 px** | 49–59 | 29–33 | 27 |
| Liike, ?laatu=aina | Z8 | 2 / 4 px | 1 / 2 px | 500 (kertyy) | 225 | 442 |
| Liike, välitaso √ (proto A) | Z6 | 3 / 5 px | 4 px | 65 | 44 | 39 |
| Liike, lepotaso − 1 (proto A7) | Z7 | 3 / 4 px | 2 px | 145 | 91 | 91 |
| Tasokartta (?lauta=kartta), lepo | z6–z7 | 2 / 5 px | — | — | — | — |
| Tasokartta, kesken ajon 25 % / 55 % | | 7 / 9 px → 2 / 4 px | — | — | — | — |

Kuvat: `scratchpad/pallon-liike/kuvat/puhelin-ennen-1-lepo.png`,
`puhelin-ennen-2-liike.png` (montaasi `montaasi-ennen.png`: lepo Z8 |
liike Z5 | laatu=aina Z8 | proto A Z6 | proto A7 Z7). Havainto, joka
näkyy kuvista lukujakin selvemmin: **pyramidin Z5-laatoissa rantaviiva
on piirretty paksulla musteella** (karttatyyli karkeille tasoille),
joten liikkeessä kartta todella vaihtuu toiseksi — omistajan "kartta
muuttuu jotenkin liikaa". Z7 liikkeessä on silmin sama kartta kuin Z8
levossa; Z6 on välimuoto. Tasokartta ei ole liikkeessäkään virheetön:
kamera-ajon alussa se skaalaa edellisen tason laattoja (25 %:n kohdalla
7 px), mutta laatat vaihtuvat lennossa eikä kartan piirtotyyli vaihdu.

### 2.2 Panoroinnin hinta (puhelin, 4× hidastus, 4 s:n ajo)

| Tila | updatePov n / ms per kutsu / max | Laattapyyntöjä (per s) | Laattoja ennen → liikkeessä → levossa | tex levossa uudestaan | Kehys p50 / p95 (vain suhteet) |
| --- | --- | --- | --- | --- | --- |
| Nykyinen (LIIKE Z5 / LEPO Z8) | 9 / 6,8 / 15 ms | 188 (30/s) | 290 → 57 → 232 | 27 → 210 | 1 650 / 1 717 ms |
| ?laatu=aina (Z8 aina) | 8 / **33** / 89 ms | 273 (68/s) | 227 → 500 → 505 | 442 | 1 867 / 1 983 ms |
| proto A (Z6 liikkeessä) | 8 / 28 / 74 ms ¹ | 268 (30/s) | 312 → 65 → 248 | 39 → 222 | 2 433 / 2 483 ms |
| proto A7 (Z7 liikkeessä) | 10 / 52 / 237 ms ¹ | 523 (67/s) ² | 227 → 145 → 347 | 91 → 264 | 1 533 / 2 050 ms |
| proto B1 (aina + updatePov ≤ 8/s) | 5 / 35 / 62 ms | 249 (38/s) | 227 → 477 → 476 | 454 | 1 483 / 1 933 ms |
| Tasokartta (?lauta=kartta) | — (ei JS-työtä liikkeessä: CSS-muunnos) | 131–206 (29–46/s) | — | — | **16,7 / 50 ms** (177 kehystä 4,5 s:ssa, max 400 ms) — sama rasteroija, sama hidastus |
| Työpöytä 1440 × 900, nykyinen | 7 / 5,0 / 14 ms | 252 (43/s) | 218 → 67 → 267 | 57 → 247 | 1 533 / 1 700 ms |
| Työpöytä, ?laatu=aina | 3 / 24 / 58 ms | 421 (38/s) | 218 → 639 → **975** (takana 72) | 601 | 4 217 / 5 050 ms |

¹ Prototyyppi asensi kynnykset laskevana ominaisuutena, joka luo 30
luvun taulukon joka luvulla — sen oma kustannus näkyy updatePov-ajassa.
² Prototyypin kynnys heilahti tasojen 7 ja 8 välillä (leveysasteen
liukuma), joten pyyntömäärä on yliarvio; laattamäärä 145 on oikea Z7:n
luku.

Zoom 2,5 → 0,05 (puhelin, 8 s, 4×): nykyinen tila vaihtoi tasoa
**10 kertaa** (3 → 4 → 7 → 8 → 6 → 7 → 6 → 7 → 6 → 7), updatePov 17
kutsua, 22 ms / kutsu, max 174 ms, 335 laattapyyntöä. Tasojen
edestakainen vaihtelu 6 ↔ 7 on liike/lepo-koneen oma takaisinkytkentä:
jokainen yli 260 ms:n kehys tulkitaan levoksi (lepotaso ja sadan laatan
haku), seuraava liikekehys pudottaa tason ja purkaa ne. ?laatu=aina:
tasot 5 → 7 → 8, mutta updatePov **94 ms / kutsu, max 558 ms**, 963
laattapyyntöä ja lopussa 319 laattaa scenessä, joista **134 pallon
takapuolella** (frustum-testi ei tunne peittoa: kameran kartio jatkuu
pallon läpi). Sama zoom dpr 1:llä (kuvasarja 6 kuvaa 10 s:ssa,
`puhelin-ennen-dpr1-4-zoom-*.png`): nykytila 8 tasonvaihtoa (3 → 4 → 5
→ 6 → 5 → 6 → 8 → 7), lopussa 111 laattaa, joista 45 takana; aina-tila
5 vaihtoa monotonisesti (3 → 4 → 6 → 7 → 8), 254 laattaa, joista 139
takana. Tyhjää (mustaa pohjapalloa) ei kuvasarjassa näkynyt kummassakaan
(tyhjä 0,000 joka kuvassa): kirjasto pitää karkeammat tasot pohjalla.
Poksahdukset eivät näy 2 s:n välein otetusta sarjasta (ohjelmisto-
rasteroija ei ehdi tiheämpään) — ne näkyvät tasonvaihtolokista: joka
vaihto luo tai purkaa kymmeniä laattoja yhdessä kehyksessä, ja
edestakainen 5 ↔ 6 on liike/lepo-koneen takaisinkytkentä.

### 2.3 Mistä hinta tulee — erittely

Luettu kirjaston lähteestä (three-globe TileEngine, Globe.gl 2.46.2
UMD; jäsennelty kopio `scratchpad/pallon-liike/tile-engine-pretty.txt`)
ja mitattu yllä.

| Osuus | Mitä tapahtuu | Mitattu | Merkitys |
| --- | --- | --- | --- |
| (a) Laattavalinta | Tasoilla ≤ 7 oktree-haku säteellä 3 · korkeus · R kameran ympäriltä; **tasolla 8 luetteloidaan leveys-pituus-laatikko ±90 · korkeus astetta** (korkeudella 0,35: ±31° × ±40° ≈ 2 500 laattatietuetta) ja jokaiselle tehdään 5 pisteen frustum-testi. Testi ei tunne pallon takapuolta: frustumissa olevat takapuolen laatat luodaan ja haetaan. Valinta ajetaan JOKA kameranliikkeellä. | updatePov Z5 6,8 ms → Z8 33 ms (lähikuva) … 94–558 ms (zoomissa); takana 8 laattaa Ateenassa, 72 työpöydän Z7:llä | Suurin yksittäinen JS-kustannus liikkeessä täydellä tarkkuudella. |
| (b) Tekstuurien luonti ja purku | Tason NOUSU luo kaikki näkyvät laatat (verkko + kuva + vienti näytönohjaimelle) kerralla; tason LASKU purkaa kaikki tarkemmat laatat kerralla (`level`-asettaja). Tasolla pysyttäessä laattoja ei pureta koskaan. | lepo→liike 204 → 27 tekstuuria, liike→lepo 210 uudestaan (selaimen välimuistista, mutta dekoodaus ja vienti uudestaan); aina-tilassa 227 → 500 → 975 laattaa ilman purkua | Nykivä "pysähtymishetki" ja muistin kasvu. |
| (c) Pikselisuhde 3 vs 2 | Levossa piirtopuskuri 1170 × 2532, liikkeessä 780 × 1688 (44 %). Vaihto muuttaa puskurin koon (yksi raskas kehys) ja kuvan tarkkuuden silmin. | Ohjelmistorasteroija, sama näkymä (226 laattaa): dpr 3 **1 042 ms**, dpr 2 **413 ms**, dpr 1 163 ms — täsmälleen pikselimäärän suhteessa (`scratchpad/pallon-liike/mittaa-taytto.mjs`) | Näytönohjaimen täyttökustannus; iPhonen GPU:lle 3 Mpx × ~40 piirtokutsua on kevyt työ, ohjelmistorasteroijalle ei. Kontin luku EI ennusta laitetta. |
| (d) Anisotrooppinen suodatus | Levossa 16×, liikkeessä kirjaston oletus 1. | 1× 1 022 ms vs 16× 1 029 ms (ei eroa rasteroijassa) | Vähäinen; pidetään 16 aina. |
| (e) Piirtokutsut | Yksi verkko ja materiaali laattaa kohti: Z8 lähikuva 215–240 kutsua, Z5 29–33. Takapuolen laatat piirretään myös (syvyystesti hylkää ne vasta pikseleinä). | Samasta näkymästä 226 → 60 → 20 laattaa näkyvissä: 1 006 → 732 → 477 ms | Lasku kuvaa 30–60:een, kun laatat ovat 512 px:n pyramidilaattoja eikä takapuolta haeta (luku 4). |

Vertailukohta: tasokartta panoroi CSS-muunnoksella (js/kartta.js
`translate3d`), jolloin selain siirtää valmiiksi rasteroidun kerroksen
näytönohjaimessa eikä JS tee liikkeessä mitään — siksi se "pyörii
hienosti täydellä tarkkuudella". Pallolla joka kehys on uusi
perspektiivipiirto; sekin on GPU:lle kevyt, kun laattavalinta ja
tekstuurikäsittely eivät tuki pääsäiettä.

### 2.4 Vaihtoehdot A–D mittausten valossa

| Vaihtoehto | Paksuus liikkeessä | Kehys / JS | Laattoja | Toteutus | Riskit ja arvio |
| --- | --- | --- | --- | --- | --- |
| A) Välitaso liikkeessä (√: Z6; taso − 1: Z7) | Z6 3/5 px (muste 4), Z7 3/4 px (muste 2 — silmin sama kuin lepo) | Z6: 65 laattaa, updatePov ~kirjaston Z6-hinta; Z7: 145 laattaa, ~4× Z5:n haku | 65 / 145 | 1 vakio + 3 riviä js/pallo.js (`asetaTila`: kerroin liikkeessä `lepokerroin / 2`) | Halvin. Poistaa "kartta muuttuu" -vaikutelman Z7:llä, mutta tason vaihto levossa (7 → 8) purkaa ja hakee yhä kaikki laatat, zoom poksahtaa yhä, ja Z7:n haku on 2,5× Z5:n. Hyvä VÄLIASKEL, ei ratkaisu. |
| B) Tarkkojen laattojen pito liikkeessä | 2/4 px | Kirjaston `level`-asettaja purkaa tarkat laatat aina laskiessaan — pitoa ei voi tehdä ilman kirjaston sisäosia (privaatit WeakMap-kentät). B1 (aina + harvennettu updatePov) osoitti, että harvennus ei poista kertymää (477 laattaa) eikä 35 ms:n kutsua. | 477 → ∞ | Ei toteutettavissa siististi kirjaston päällä | Hylätään: vaatisi kirjaston laattamoottorin haaroituksen. |
| C) Lepokerros marginaalilla liikkuvana pintana | 2/4 px alueella, karkea reunan takana | Yksi 4096²–8192² kangas (50–130 Mt) koottava aina, kun kamera lähestyy reunaa; kokoaminen on kymmenien laattojen purku ja piirto (mitattu v1641: 1 117 ms:n kehys) | 1 iso | luoLepokerros + reunavahti + Worker | Kokoaminen kesken liikkeen on juuri se nykäys, joka v1641:ssä poistettiin; iso kangas ei mahdu puhelimen muistiin varmasti. Hylätään — mutta sen laatta kerrallaan tehty muoto on vaihtoehto D. |
| D) Oma laattakerros: pyramidin laatat laatta kerrallaan, ruutupohjainen taso, ristihäive, LRU, ei kirjaston tasonvaihtoja | 2/4 px (sama kartta kuin tasokartalla) | Valinta O(näkyvät laatat) 7 × 7 säteenjäljityksellä (~1 ms), tekstuurin luonti ≤ 2 laattaa/kehys, ei purkuryöppyjä | 30–60 | uusi moduuli ~700 riviä + siivous | Suositus, luku 4. |

## 3. Valmiit kirjastot

Omistajan kysymys: *"löytyisikö netistä tähän jo valmista
koodiratkaisua?"* Jokaisesta kirjastosta tehtiin minimaalinen
kokeilusivu (`tools/kokeilut/pallon-liike/*.html`), jossa pelin omat
Web Mercator -laatat (tools/tee-pallolaatat.mjs, sarja
2026-09-03a-nostot-c) pyörivät ja zoomaavat puhelinkoossa, ja sama
mittari kuin pelille (`tools/savukkeet/mittaa-kirjastokokeilu.mjs`).
Versiot, lisenssit ja koot luettiin npm-rekisteristä ja jsDelivr-
tiedostoluetteloista 6.9.2026 (ei muistista). Vaatimukset: ES-moduulit
ilman build-vaihetta, iPhonen Safari, PD/CC-yhteensopiva lisenssi, ei
avaimia.

| Kirjasto | Versio · lisenssi · koko selaimeen | Toimii laatoillamme? | Reuna liikkeessä | Zoom | Käynnistys | Siirron koko | Arvio |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **MapLibre GL JS**, globe-projektio, rasterilähde | 6.7.0 · BSD-3-Clause · 1 626 kt (ESM: maplibre-gl.mjs 565 kt + shared 481 kt + worker + css) | Kyllä (`tileSize: 64` antaa Z8:n zoomilla 5 = pelin lepotarkkuus) | **2 / 4 px = lepo** | Laattojen ristihäive sisäänrakennettu (`raster-fade-duration`), vanhat laatat säilyvät välimuistissa | 126–142 s kontissa (globe-varjostimien käännös ohjelmistorasteroijalla — ei vertailukelpoinen laitteeseen; kirjaston oma ilmoitus n. 1 s) | KOKO pallolauta uusiksi: js/pallo.js + js/pallolauta/ (8 100 riviä: eleet, liuku, kamera, pisteet, reitit, CSS2D-nimet, nostot, linssit, avauslento, napakannet) + 2 600 riviä testejä; Mercator-laatat vain (ei pyramidin tarkkuutta, ei Milleriä) | Ei: siirto on viikkojen työ ja hävittää omistajan kanssa hiotut eleet; lisäksi puuttuvien laattojen kohdalla näkyy tumma aukko (kuva `puhelin-koe-maplibre-2-liike.png`): MapLibre ei hae karkeaa varalaattaa, jos sitä ei ole välimuistissa. |
| **3d-tiles-renderer** (NASA-AMMOS), GeneratedSurfacePlugin + XYZTilesOverlay + TilesFadePlugin | 0.5.2 · Apache-2.0 · 2 637 kt (three.module.js 635 kt + addons 153 kt + renderer/plugins ~430 kt; loput sivun tuomat) | Kyllä ellipsoidilla itsenäisessä three-scenessä (kuva `montaasi-tri.png`); 0.5.x:ssä XYZ on "overlay", ei enää plugin | 5 / 9 px — kokeilussa tarkentuminen jäi karkeaksi (≤ Z5) sekä errorTarget 2:lla että 0,5:llä 15 s:n levossa; runko toimii, LOD-säätö vaatisi lisäpäivän | TilesFadePlugin häivyttää laatat tason vaihtuessa (tyhjää 0 kuvasarjassa); tarkentuminen ruutuvirhepohjainen (errorTarget) | 2,6–3,4 s | Globe.gl:n sisään: toinen three.js-kopio (Globe.gl ei vie omaansa), WGS84-ellipsoidi metreinä → skaalaus säteeseen 100, materiaalien varjostinpaikkaukset vieraalle rendererille; laatat vain Mercator-sarjasta → lepokerros jäisi rinnalle | Ei: kaksi three.js:ää samassa scenessä on ankkatyypitystä, joka toimii sattumalta; ei pyramidin tarkkuutta; 2,6 Mt lisää. Toimiva kokeilurunko jää repoon (`kolmiulotteiset-laatat.html`). |
| **CesiumJS** | 1.145.0 · Apache-2.0 · 6 589 kt (Cesium.js 6 019 kt + 27 tiedostoa; Build/Cesium yhteensä 12 Mt) | Kyllä (UrlTemplateImageryProvider, ilman Ion-avainta) | 2 / 2 px, mutta Cesium valitsi korkeudella 0,35 tason 4 (7 laattaa): paksu rantaviiva myös levossa (kuva `montaasi-cesium.png`) | Sisäänrakennettu; kuvasarjassa tyhjää 0, tasot 2 → 7 monotonisesti | 2,6–4,4 s ilman hidastusta | Kuten MapLibre + 6,6 Mt + workerit + assets | Ei: painavin, eikä ratkaise tarkkuutta ilman omaa LOD-säätöä. |
| **OpenGlobus** | 0.28.7 · MIT · 972 kt (og.es.js + css) + fonttiresurssit | Sivu käynnistyy ja XYZ-taso latautuu, mutta kameran asemointi (`planet.viewLonLat`) ei asettunut kokeilun näkymään 15 s:ssa — mittaus jäi kesken, ei jatkettu | — | — | 5,0 s | Kuten MapLibre (oma WebGL-moottori, kaikki kerrokset uusiksi) | Ei: pieni yhteisö, dokumentaatio ohut, siirto yhtä suuri kuin MapLibreen ilman sen kypsyyttä. |
| iTowns | 2.46.0 · CECILL-B tai MIT · 28 Mt purettuna, three.js-pohjainen GIS-kehys | ei kokeiltu | — | — | — | Kuten 3d-tiles-renderer, raskaampi | Ei. |
| deck.gl GlobeView + TileLayer | 9.4.0 · MIT · 6,5 Mt purettuna | ei kokeiltu: GlobeView on kokeellinen eikä TileLayer häivytä laattoja | — | — | — | Kuten MapLibre | Ei. |
| Globe.gl / three-globe (nykyinen) | 2.46.2 / 2.45.2 · MIT · 700 kt (jo käytössä) | Kyllä | 5 / 8 px | poksahtaa | — | 0 | Laattamoottori vaihdetaan, muu pysyy (luku 4). |

Johtopäätös: **mikään valmis kirjasto ei täytä vaatimuksia kohtuullisella
siirrolla.** MapLibre olisi laatumielessä kelvollinen, mutta se on koko
pelilaudan uudelleenkirjoitus Mercator-laatoille; lopputulos olisi
liikkeessä sama kuin oma kerros (2 / 4 px) mutta levossa epätarkempi
kuin nykyinen lepokerros ja alttiimpi aukoille. Oma laattakerros on
~700 riviä samaa koodia, jota lepokerros jo on, ja sillä jokainen
nykyinen kerros (pisteet, reitit, nimet, nostot, linssit, napakannet,
avauslento) pysyy koskemattomana.

## 4. Valittu ratkaisu: laattakerros (oma moottori Globe.gl:n sisällä)

### 4.1 Idea yhdellä sivulla

Pallon pinta on kaksi kerrosta:

1. **Pohja** — Globe.gl:n oma laattamoottori kuten nyt, mutta
   naulattuna karkeaksi: `globeTileEngineMaxLevel(5)` ja kirjaston
   oletuskynnykset (taso ≤ 5 aina, ei liike/lepo-vaihtoa, ei
   pikselisuhteen vaihtoa). Se näkyy vain napojen yli (pyramidin
   rajaus 84° N … 66° S) ja sen ajan, kun laattakerroksen laatta ei
   ole vielä saapunut. Sen tasonvaihdot (0–5) tapahtuvat kerroksen
   alla näkymättömissä.
2. **Laattakerros** (uusi `js/pallolaatat.js`) — pyramidin laatat
   (pohja + viiva + nosto samassa järjestyksessä kuin tasokartalla,
   512 px webp, 240 px/aste z7:llä) yksi kerrallaan omina verkkoina
   pallon pinnalle täsmälleen pinnan säteellä, UV Millerin
   koordinaateissa — sama geometria, sama materiaaliluokka, sama
   syvyyssiirto (−8 askelta) ja sama versiovahti kuin lepokerroksella
   nyt (js/pallo.js luoLepokerros). Ero lepokerrokseen: kerros on
   **aina päällä**, joka korkeudella (myös yleiskuvassa), laatat ovat
   pysyviä olioita, joita häivytetään sisään ja ulos yksitellen, ja
   taso vaihtuu hystereesillä ilman että mitään puretaan kerralla.

Lopputulos pelaajalle: liikkeessä ja levossa sama kartta (tasokartan
pyramidi, ei Mercator-sarjan kaksoisnäytteistystä), tarkin taso, jonka
ruutu tarvitsee; zoomatessa uusi taso häipyy vanhan päälle laatta
kerrallaan, vanha taso pysyy kunnes uusi peittää sen; panoroidessa
reunan uudet laatat häipyvät pohjan Z5:n päälle 100–300 ms:ssä.

### 4.2 Algoritmi (pseudokoodi, vakiot)

```
paivita(pov)                              // kutsutaan updatePov-koukusta
  jos liikkeessä ja edellisestä < PAIVITYSVALI_LIIKE_MS (100): palaa   // ≤ 10 kertaa/s
  tarvePxAste = laitepikseliä/aste ruudun keskellä (toGlobeCoords keskeltä ja 40 px alempaa, × pikselisuhde)
  zTarve     = matalin pyramidin taso, jolla leveys/360 ≥ tarvePxAste × TERAVYYS (1,0)
  z          = nykyinen taso, jos sen leveys/360 ≥ tarvePxAste × HYSTEREESI_ALAS (0,7), muuten zTarve
  alue       = lepokerroksenAlue(9 × 9 säteenjäljitysnäytettä, vara max(0,5°, 3 % laatikosta), rajaus 84° N…66° S ja napakannet)
  W          = lepokerroksenLaatat(taso z, alue).laatat; jos |W| > LAATTAKATTO_NAKYVA (48): z -= 1 ja uudestaan
  jokaiselle laatalle W:ssä:
      jos ei muistissa: luo tietue, jonoon lataus (etäisyysjärjestys ruudun keskeltä, RINNAKKAIN ≤ 6)
      jos valmis eikä scenessä: lisää sceneen, häivytä sisään HAIVE_MS (260)
  jokaiselle scenen laatalle, joka EI ole W:ssä ("ylimääräinen"):
      jos hienommat W-laatat peittävät sen alueen kokonaan ja ovat läpinäkymättömiä: poista heti (ei näy)
      muuten jos karkeampi W-laatta peittää sen ja on valmis: häivytä ulos HAIVE_MS, poista sitten
      muuten: pidä (se on ainoa peitto — kohta saapuvan laatan takana)
  LRU: muistissa enintään LAATTAKATTO_MUISTI (24) ylimääräistä valmista laattaa; vanhimmat puretaan (geometria, tekstuuri)
```

Peittotesti on geometrinen (Millerin pyramidissa tasot eivät sisäkkäisty
2 × 2:na: sarakkeita on 675 · 2^z / 512, ei potenssia kahdesta):
laatan alue projisoidaan tasolle z + 1 samalla `lepokerroksenLaatat`-
funktiolla ja kaikkien osuvien laattojen on oltava valmiita ja
läpinäkymättömiä.

Laatan luonti: kolme kuvaa (pohja, viiva, nosto — `pyramidinKerrostasot`,
`pyramidinLaattaUrl`, `pyramidinLaattaOlemassa`) `createImageBitmap`-
dekoodauksella (pääsäikeen ulkopuolella; vara `Image` + `decode()`),
piirto yhdelle 512 × 512 kankaalle (OffscreenCanvas jos on), tekstuuri
kirjaston omalla `Texture`-luokalla (`kolmiulotteinen(pallo)`),
väriavaruus laatoilta, mipmapit WebGL2:ssa, anisotropia 16, vienti
`renderer.initTexture` heti — **enintään TEKSTUUREJA_PER_KEHYS (2)**
tekstuuria kehystä kohti, loput odottavat seuraavaa kehystä. Verkko:
`lepokerroksenVerkko` laatan alueella, silmiä
`clamp(ceil(asteet / 0,25°), 16, 160)` — hienoilla laatoilla (z7 2,1°)
16 × 16, karkeilla (z2 68°) 160 × 160. Kärkien jänteen painuma on
silloin pienempi kuin karkeammalla laatalla ja pohjan laatoilla, joten
hienompi laatta on aina kameraa lähempänä ja voittaa syvyystestin
(LessEqual) ilman erillistä siirtoa; `renderOrder = z` piirtää
karkeammat ensin. Pohjaa vastaan sama `polygonOffset` −8 kuin
lepokerroksella (laskettu tests/pallolepokerros.test.mjs:ssä).

Häive: materiaali `transparent: true, opacity 0 → 1` ease-out 260 ms
(reduced motion: 0), valmiina `transparent: false` (nopeampi ja kirjoittaa
syvyyden). Ulos-häive vain, kun karkeampi peitto on jo valmiina sen
alla — ei koskaan kahta karttaa päällekkäin ilman toista kokonaan
peittävänä (v1641:n oppi), ei sädekorotusta (LEPOKERROS_KOROTUS 1), ei
kokoamista raahauksen tauolla (kerros ei "kokoa" mitään — se päivittää
yksittäisiä laattoja tasaisesti).

Muistikiintiö: 48 näkyvää + 24 LRU + häipyvät ≈ 80 laattaa × 1,33 Mt
(512² RGBA + mipmapit) ≈ 105 Mt näytönohjaimessa pahimmillaan;
tavallinen lähikuva 30–40 laattaa ≈ 50 Mt (lepokerros käyttää nyt yhden
4096 × 3072 kankaan = 50 Mt + mipmapit, pohja 200 Z8-laattaa ≈ 70 Mt).
Kiintiö `LAATTAKATTO_TAVUT` (96 Mt) purkaa LRU:ta pienemmäksi, jos
tekstuurikoko × määrä ylittää sen.

Pikselisuhde: kiinteä `min(dpr, 3)` (ei vaihtoa liikkeessä). Perustelu:
vaihto muuttaa piirtopuskurin koon (raskas kehys) ja kuvan tarkkuuden
silmin; iPhonen GPU piirtää 3 Mpx:n ja 40 laatan kehyksen helposti.
Mittaus luvussa 2.3 (c) on ohjelmistorasteroijan luku; jos omistajan
laite lämpenee, `PIKSELISUHDE_KATTO` on yksi vakio.

### 4.3 Rajapinnat muihin kerroksiin (mikä ei muutu)

| Kerros | Vaikutus | Mitä EI saa muuttaa |
| --- | --- | --- |
| Pisteet, reitit, helmet, html-merkit (js/pallolauta/merkit.js, reitit.js, lauta.js) | Ei muutosta: ne ovat säteillä ≥ 1,0015 R, kerros on säteellä 1,0 R syvyyssiirrolla −8 (sama kuin lepokerros). | Säteitä, renderOrdereita, `raycast`-ohituksia. |
| CSS2D-nimet (nimet.js) | Ei muutosta (DOM-kerros). | — |
| Nostot (nostot.js) | Poltettu-päätös luetaan pyramidin nostotasosta, kun kerros piirtää nostotason (E5). | Kortin avaus, osumatesti. |
| Napakannet (js/pallo.js lisaaNapakannet) | Ei muutosta: kannet 1,0015 R, kerros rajataan NAPAKANNEN_LEVEYDEN alle kuten nyt. | Kansien geometria. |
| Linssikalvot (js/pallolauta/linssit.js, polygonsData) | **Korjattu 6.9.2026 (E1:n vika, v1647–v1649):** pelkkä `renderOrder` EI riitä. Kerros kirjoittaa syvyyden ja vetää itsensä `polygonOffset`illa (−8) kameraa kohti — maailman mitassa d² (1/near − 1/far) / 2²⁴, korkeudella 1,1 noin 0,12 yksikköä eli enemmän kuin kalvon nosto pinnasta (0,15, mutta jänteen painuman jälkeen ruudun keskellä 0,03), joten laatta voitti syvyystestin ja kalvo näkyi vain tähtinä kalvopallon kärkien ympärillä. Kalvolla on nyt oma siirto `KALVON_SYVYYSSIIRTO` (−12, sama sääntö kuin vektoreilla): laattojen edellä neljä askelta joka etäisyydellä, syvyystesti yhä päällä. | Kalvojen korkeus (KALVON_SADE); siirto saa olla vain laattoja negatiivisempi, ei sädekorotus. |
| Lepokerros (luoLepokerros) | Korvautuu; puretaan E3:ssa testeineen. Puhtaat apufunktiot (alue, laatat, UV, verkko, taso, silmät, kerrokset, tiheys) SIIRTYVÄT uuteen moduuliin ja säilyvät. | — |
| Laatutilat LIIKE/LEPO (kytkeLaatunosto) | Kynnykset ja pikselisuhde eivät enää vaihdu; lepo/liike-tunnistus jää vain kerroksen päivitystahdin ohjaukseksi ja pohjan `teroita`-suodatukseen. `?laatu=aina`, kehittäjävipu ja `pakotaPallonLaatu` poistuvat E3:ssa (aina terävä). | Aikajanan ja avauslennon sopimus "terävä koko ajon ajan" täyttyy automaattisesti. |
| Avauslento (avaus.js valmistele) | Reitin esilataus siirtyy pyramidilaatoille (E4); pohjan käytävä tasoille 4–5. | Lennon koreografia. |
| sw.js SHELL | `./js/pallolaatat.js` lisätään pallo.js:n viereen (rivi 148). Pyramidilaatat kulkevat HTTP-välimuistissa (immutable, vuosi) kuten tasokartalla — ei uutta koria. | LAATTACACHE (pohjan Mercator-laatat, offline-esilataus). |
| build-standalone MODULES | Ei muutosta: pallo.js ja pallolauta/ eivät ole nipussa (laiska raja). tools/tarkista-niputus.mjs ei koske. | — |
| vendor-kansio, lisenssit | Ei uusia kirjastoja. | — |
| Tallennus ja pelitila | Ei muutosta (Raamattu: ei lautakohtaisia kenttiä). | — |

### 4.4 Riskit ja perääntyminen

| Riski | Todennäköisyys | Vastatoimi |
| --- | --- | --- |
| Muisti puhelimella (80 laattaa × 1,33 Mt) | keskitaso | Kiintiöt vakioina (LAATTAKATTO_NAKYVA, _MUISTI, _TAVUT); WebGL-kontekstin menetys putoaa jo nyt tasokartalle (turvatila). Mittari raportoi tekstuurimäärän. |
| Sauma pyramidin rajauksessa (84° N / 66° S) pohjaa vasten | matala | Sama kuin lepokerroksella nyt; pohja on samasta pyramidista. |
| Pyramidin ja pallon sarjan versioero | matala | Versiovahti kuten lepokerroksella: kerros ei piirrä viiva-/nostotasoa, jos versiot eroavat; Raamattu: sarjat poltetaan yhdessä. |
| Dekoodaus pääsäikeellä Safarissa (ei OffscreenCanvas/ImageBitmap) | matala (Safari 15+ tukee molempia) | Vara: `Image.decode()` ja tavallinen canvas, ≤ 2 laattaa/kehys. |
| Reunan laatat saapuvat hitaasti hitaalla verkolla → pohjan Z5 näkyy reunassa | keskitaso | Marginaali 1 laatta liikesuuntaan (E1 `VARA_LIIKE`), esilataus avauslennolle (E4); tämä on myös Google Earthin käytös. |
| Ristihäive näkyy "kahtena karttana" | matala | Häive vain karkeamman valmiin peiton päälle; ulos-häive vain peiton alta. Mittari: kuvasarjan ero ≤ raja. |
| Perääntyminen | — | `LAATTAKERROS_OLETUS = true` -vakio ja `?laattakerros=0` palauttavat vanhan koneen E1:ssä (E3:n siivous poistaa vanhan koneen vasta hyväksynnän jälkeen; siihen asti kytkin on olemassa). |

## 5. Todennus lukuina (mittari valmis)

`NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-liike.mjs --nakyma=puhelin`
(ja `--vaihe=zoom --dpr=1` kuvasarjalle) kirjoittaa JSON-raportin ja
kuvat. Hyväksymisrajat E1:lle (puhelin 390 × 844 dpr 3, 4×):

| Mitta | Ennen (2.1–2.2) | Vaadittu E1:n jälkeen |
| --- | --- | --- |
| Reunan leveys liikkeessä vs levossa (mediaani / p90) | 5/8 vs 2/4 px | liike = lepo ± 1 px, molemmat ≤ 3 / 5 px |
| Musteviivan paksuus liikkeessä | 8 px | ≤ 2 px (= lepo) |
| updatePov ms / kutsu liikkeessä (4×) | 6,8 (Z5) · 33 (Z8 aina) | ≤ 10 ms; max ≤ 40 ms (pohja Z5 + kerroksen valinta) |
| Laattapyyntöjä 4 s:n panoroinnissa | 188 | ≤ 120 (pyramidin 512 px:n laatat, 3 kerrosta) |
| Laattaverkkoja scenessä lähikuvassa (pohja + kerros) | 227–312 | ≤ 120 (pohja ≤ 60 + kerros ≤ 60) |
| Piirtokutsut / kehys lähikuvassa | 215–240 | ≤ 120 |
| Tekstuureja uudestaan levossa panoroinnin jälkeen | 210 | ≤ 20 (vain reunan uudet laatat) |
| Zoom 2,5 → 0,05: tyhjän (mustan pohjan) osuus keskialueella kuvasarjassa | 0,000 (kirjasto pitää karkean tason pohjalla) | 0,000 jokaisessa kuvassa |
| Zoom: perättäisten kuvien ero (mean ΔL) kun kamera liikkuu tasaisesti | 24–28 (2 s:n välein; poksahdukset eivät erotu näin harvasta sarjasta) | ei piikkiä yli 1,5 × naapurien keskiarvon; laitteella silmin: ei poksahdusta |
| Zoom: tason vaihtoja 8–10 s:ssa | 8–10, joista 2–4 edestakaisin (5 ↔ 6, 6 ↔ 7) | kerroksen taso monotoninen 2 → 7, ei edestakaisin; pohjan vaihdot (≤ 5) kerroksen alla |
| Laattoja pallon takapuolella | 45 / 111 (0,05) … 139 / 254 (aina) | kerros 0 (valinta näkyvästä alueesta); pohja saa olla kuten kirjasto tekee |
| Kehysajat p95 laitteella | — | omistajan puhelin: alle 33 ms (kontin rasteroija ei kelpaa tähän; JS-osuudet yllä ovat sen sijainen) |

## 6. Erät parvelle

Jokainen erä on yksi Opus-agentti, yksi commit worktreessä, muutoslokirivi
≤ 60 merkkiä, portit `node --test tests/*.test.mjs` (`# fail 0`),
`node tools/tarkista-kaksoisavaimet.mjs`, `node tools/tarkista-niputus.mjs`,
`node tools/tarkista-savukkeet.mjs`, `node tools/build-standalone.mjs`
ja erän omat savukkeet. Raamattuun ei kirjoiteta (Fable lisää
karttarivin, luku 8). Riippuvuudet:

```
E0 runko ──┬── E1 laattakerros ──(omistajan hyväksyntä puhelimella)── E3 siivous ──┬── E4 esilataus
           └── E2 mittarin vartiot (rinnakkain E1:n kanssa)                        └── E5 nostot
```

Rivinumerot tehtävänannoissa ovat v1642:sta (suunnitelman pohja);
main on jo v1644 (v1643 muutti js/pallolauta/lauta.js:n pisteitä,
v1644 CSS2D-kerroksen pinontaa) — ankkuri on aina funktion nimi, ei
rivi, ja jokainen erä tehdään tuoreen mainin päälle.

Rinnakkaiset erät eivät koske samoihin tiedostoihin: E1 = js/pallolaatat.js,
js/pallo.js (rakennaPallo, kytkeLaatunosto), tests/pallolaatat.test.mjs,
docs; E2 = tools/savukkeet/mittaa-pallon-liike.mjs, tools/savukkeet/README.md;
E4 = js/pallolauta/avaus.js, js/pallo.js (reitinLaatat/esilataaLentoreitti),
tests/pallo.test.mjs (esilataus-testit); E5 = js/pallolauta/nostot.js,
js/pallolauta/lauta.js (yksi rivi), tests/pallonostot*.test.mjs.

### E0 — Runko: laattakerroksen apufunktiot omaan moduuliin (ei käytösmuutosta)

```
TEHTÄVÄ E0 (Opus, yksi commit, worktree origin/mainin päällä): siirrä
lepokerroksen puhtaat apufunktiot js/pallo.js:stä uuteen moduuliin
js/pallolaatat.js SANATARKASTI (mekaaninen siirto; poistot ja lisäykset
täsmäävät). Lue ensin CLAUDE.md, docs/roolitus.md, js/tyohuone-raamattu.js
(rivit "PALLO LEVOSSA YHTA TERAVA KUIN TASOKARTTA" lisäyksineen) ja
docs/moduulit/pallon-liike-taydella-tarkkuudella.md luvut 4 ja 6.

SIIRRETTÄVÄT (js/pallo.js → js/pallolaatat.js, sama nimi, sama teksti,
kommentit mukana): vakiot LEPOKERROS_KORKEUSRAJA, LEPOKERROS_TERAVYYS,
LEPOKERROS_KATTOKERROIN, LEPOKERROS_LAATTAKATTO_MIN/MAX,
LEPOKERROS_KANGASKATTO, LEPOKERROS_TIHEYSOSUUS, LEPOKERROS_RUUDUKKO_AST/MIN/MAX,
LEPOKERROS_VARA_AST, LEPOKERROS_KOROTUS, LEPOKERROS_SYVYYSSIIRTO,
LEPOKERROS_HAIVE_SISAAN_MS, LEPOKERROS_LEPOVIIVE_MS, LEPOKERROS_KUVAKATTO,
LEPOKERROS_NAYTTEITA, LEPOKERROS_MITTAMATKA_PX, RAD, THREE_LINEAR,
THREE_LINEAR_MIPMAP_LINEAR, THREE_CLAMP; funktiot pallonPiste,
lepokerroksenAlue, lepokerroksenLaattakatto, lepokerroksenTasoRiittaa,
lepokerroksenTaso, lepokerroksenKerrokset, lepokerroksenLaatat,
lepokerroksenUV, lepokerroksenSuunnitelma, lepokerroksenSilmat,
lepokerroksenVerkko, luoLepokerroksenAjoitus. js/pallo.js tuo ne
uudesta moduulista (import) ja VIE ne edelleen (export { ... } from
'./pallolaatat.js'), jotta tests/pallolepokerros.test.mjs, savukkeet ja
js/pallolauta/ eivät muutu tässä erässä. luoLepokerros ja
kytkeLaatunosto JÄÄVÄT pallo.js:ään. Moduulin alkuun otsikkokommentti:
mikä moduuli on (laattakerroksen apurit; E1 tuo tähän itse kerroksen)
ja viittaus tähän suunnitelmaan.

MUUT MUUTOKSET: sw.js SHELL: './js/pallolaatat.js' heti './js/pallo.js':n
jälkeen (rivi ~148). tests/pallolepokerros.test.mjs: lisää yksi testi,
joka lukee js/pallo.js:n ja js/pallolaatat.js:n tekstinä ja vaatii, että
pallo.js ei enää määrittele siirrettyjä nimiä (regex "export function
lepokerroksenAlue" ei osu pallo.js:ään, osuu pallolaatat.js:ään).
docs/moduulit/karttapallo.md luku 10.3: yksi kappale "E0 tehty: siirto,
rivimäärät ennen/jälkeen". js/muutokset.js: ei riviä (ei julkaisua
tästä erästä; Fable lisää versiorivin julkaistessa).

EI SAA MUUTTAA: yhtäkään siirretyn funktion sisältöä; kytkeLaatunosto,
luoLepokerros, rakennaPallo; js/pallolauta/*; build-standalone (pallo.js
ei ole nipussa).

TODENNUS: `git diff --stat`; siirron sanatarkkuus: poistetut rivit
pallo.js:stä == lisätyt rivit pallolaatat.js:ään (ilman uutta
otsikkokommenttia ja import/export-rivejä) — todenna esim. `diff <(git
show HEAD:js/pallo.js | sed -n 'A,Bp') <(sed -n 'C,Dp' js/pallolaatat.js)`
ja kirjaa rivimäärät raporttiin (pallo.js 2067 → n, pallolaatat.js m).
Portit: node --test tests/*.test.mjs (# fail 0), node
tools/tarkista-niputus.mjs, node tools/tarkista-savukkeet.mjs, node
tools/build-standalone.mjs, NODE_USE_ENV_PROXY=1 node
tools/savukkeet/savuke-pallolauta.mjs (samat OK/FAIL-rivit kuin ennen;
lepokerroksen mittarit toimivat). Raportti Fablelle: commit-SHA,
rivimäärät, porttien tulokset.
```

### E1 — Laattakerros (isoin erä; E0:n jälkeen)

```
TEHTÄVÄ E1 (Opus, yksi commit, worktree E0:n mergen päällä): toteuta
laattakerros docs/moduulit/pallon-liike-taydella-tarkkuudella.md luvun 4
mukaan js/pallolaatat.js:ään ja kytke se palloon. Lue ensin CLAUDE.md,
docs/roolitus.md, Raamattu (rivit "PALLO LEVOSSA YHTA TERAVA KUIN
TASOKARTTA" lisäyksineen, "KAIKKI LIIKE ANIMOIDAAN PEHMEASTI"),
suunnitelman luvut 2–5 kokonaan, js/pallo.js kokonaan (erityisesti
luoLepokerros — kerros on sen laatta kerrallaan tehty, pysyvä muoto —
ja kytkeLaatunosto), js/pallolaatat.js (E0), js/laattapyramidi.js:n
ovet haePyramidinLuettelo/pyramidinKerrostasot/pyramidinLaattaUrl/
pyramidinLaattaOlemassa, tests/pallolepokerros.test.mjs ja
tools/savukkeet/mittaa-pallon-liike.mjs (todennus).

TOTEUTA js/pallolaatat.js:ään:
1. export function luoLaattakerros({ pallo, kotelo, ikkuna, renderer })
   → kahva { paivita(pov, liikkeessa), mittarit(), pura() }.
   Sisäinen tila: laatat Map('z/sarake/rivi' → { z, sarake, rivi, alue,
   tila: 'ladataan'|'valmis'|'virhe', verkko, materiaali, tekstuuri,
   kaytetty }), taso z hystereesillä (TERAVYYS 1,0 ylös, HYSTEREESI_ALAS
   0,7 alas), sukupolvi (liike keskeyttää saapuvien kuvien piirron ei —
   kerros ei peru latauksia, vain vanhentuneiden tietueiden lisäyksen
   sceneen), latausjono (etäisyys ruudun keskeltä, RINNAKKAIN 6),
   tekstuurien vientijono (TEKSTUUREJA_PER_KEHYS 2, ajetaan pallon
   renderöintisilmukan onBeforeRender-koukussa tai rAF:ssa).
   Vakiot (export, nimet täsmälleen): LAATTAKERROS_TERAVYYS = 1,
   LAATTAKERROS_HYSTEREESI_ALAS = 0.7, LAATTAKERROS_NAYTTEITA = 9,
   LAATTAKERROS_VARA_AST = 0.5, LAATTAKERROS_VARA_OSUUS = 0.03,
   LAATTAKERROS_LAATTAKATTO_NAKYVA = 48, LAATTAKERROS_LAATTAKATTO_MUISTI = 24,
   LAATTAKERROS_LAATTAKATTO_TAVUT = 96 * 1048576,
   LAATTAKERROS_RINNAKKAIN = 6, LAATTAKERROS_TEKSTUUREJA_PER_KEHYS = 2,
   LAATTAKERROS_HAIVE_MS = 260, LAATTAKERROS_PAIVITYSVALI_LIIKE_MS = 100,
   LAATTAKERROS_SILMAT_MIN = 16, LAATTAKERROS_SILMAT_MAX = 160,
   LAATTAKERROS_SYVYYSSIIRTO = -8, LAATTAKERROS_RENDER_ORDER_POHJA = -10,
   LAATTAKERROS_OLETUS = true.
   Käytä E0:n apureita: lepokerroksenAlue (näytteet 9 × 9),
   lepokerroksenLaatat (yksi laatta = oma "kartta": kansX0/kansY0 laatan
   omasta pikselipaikasta; kirjoita apuri laatanKartta(taso, sarake,
   rivi) joka palauttaa saman muodon kuin lepokerroksenLaatat yhdelle
   laatalle), lepokerroksenUV, lepokerroksenVerkko (alue = laatan
   lat/lon-alue, nx = ny = silmät), lepokerroksenTaso (tarve → z),
   lepokerroksenKerrokset (versiovahti; jos null → kerros ei käynnisty,
   mittarit.syy kertoo). Puhtaat uudet funktiot exporttina ja
   testattavina: laattakerroksenTaso(tasot, tarve, nykyinen) (hystereesi),
   laattakerroksenPeitto(laatta, valmiit, tasot) (peittotesti tasolla
   z + 1), laattakerroksenSilmat(asteet), laattakerroksenLRU(tietueet,
   katto, tavukatto) (mitkä puretaan).
2. Laatan luonti: kuvat createImageBitmap(fetch(url).blob()) —
   vara new Image() + decode(); OffscreenCanvas(512, 512) jos on, muuten
   document.createElement('canvas'); ctx.drawImage kerroksille
   järjestyksessä pohja → viiva → nosto (vain kerrokset, jotka
   lepokerroksenKerrokset sallii); tekstuuri kolmi.Texture(kangas)
   samoilla asetuksilla kuin luoLepokerros (colorSpace laatoilta,
   mipmapit WebGL2:ssa, LINEAR, CLAMP, anisotropy max); vienti
   renderer.initTexture jonosta; materiaali kolmi.LaattaMateriaali({ map,
   transparent: true, opacity: 0, depthWrite: true, polygonOffset: true,
   polygonOffsetFactor: 0, polygonOffsetUnits: LAATTAKERROS_SYVYYSSIIRTO });
   verkko renderOrder = LAATTAKERROS_RENDER_ORDER_POHJA + z; raycast = () => {};
   userData.laattakerros = { z, sarake, rivi }; lisäys kolmi.juuri-ryhmään.
   Häive sisään ease-out HAIVE_MS (reduced motion 0); valmiina
   transparent = false. Ulos-häive vain luvun 4.2 ehdolla.
3. Kytkentä js/pallo.js:ssä: rakennaPallo: kun laatat && globeTileEngineUrl:
   `pallo.globeTileEngineMaxLevel(Math.min(laattatasoMax(laatat),
   POHJAN_TASO_MAX))` missä export const POHJAN_TASO_MAX = 5, JOS
   laattakerrosPaalla() (uusi funktio js/ui-apurit.js:ään kuten
   laatuAinaPaalla: ?laattakerros=0 sammuttaa, oletus LAATTAKERROS_OLETUS).
   kytkeLaatunosto: kun kerros on päällä, asetaTila EI muuta kynnyksiä
   eikä pikselisuhdetta (kynnykset kirjaston oletus, pikselisuhde
   Math.min(dpr, LAATU_PIKSELISUHDE_LEPO) kerran asennuksessa), lepokerrosta
   ei luoda (luoLepokerros ohitetaan), ja laatuPov kutsuu
   kerros.paivita(kamera, liikkeessa) jokaisella updatePov-kutsulla (kerros
   harventaa itse) sekä lepoon()-ajastimesta liikkeessa = false. Kun
   kerros on pois (?laattakerros=0), kaikki toimii täsmälleen kuten
   v1642 — tämä on perääntymistie eikä sitä saa rikkoa.
   pallonLepokerros(pallo) palauttaa kerroksen kahvan, kun kerros on
   päällä (mittarit-muoto: tila, taso, laattoja, valmiita, hapyvia,
   pyyntoja, pyydetyt[], syy, kaytetytTavut — savukkeet laskevat
   pyramidipyynnöt pyydetyt-listasta kuten nyt).
4. Testit: tests/pallolaatat.test.mjs (uusi): hystereesi (0,7…1,0),
   peittotesti Kreikan laatikolla z6 → z7 (sama data kuin
   pallolepokerros.test.mjs:n laattatestissä), silmät (2,1° → 16, 68° →
   160, 0,25° tavoite välissä), LRU (näkyvät eivät koskaan pura,
   vanhin ensin, tavukatto), renderOrder/polygonOffset-vakiot, ja
   tekstitesti: pallo.js kutsuu globeTileEngineMaxLevel(...POHJAN_TASO_MAX)
   vain kerroksen ollessa päällä, ja asetaTila ei aseta kynnyksiä
   kerroksen ollessa päällä.
5. docs/moduulit/karttapallo.md luku 10.3: "Laattakerros (E1)" —
   mitatut luvut ennen/jälkeen taulukkona (suunnitelman luvun 5
   mitat). tools/savukkeet/README.md: mittaa-pallon-liike-rivi
   ajantasaiseksi, jos muutat mittaria (älä muuta sen mittoja — E2
   omistaa tiedoston; jos tarvitset muutoksen, kirjaa raporttiin).

EI SAA MUUTTAA: js/pallolauta/* (lauta.js:n lepokerros-accessor
toimii kahvan kautta ennallaan), merkkien säteet ja renderOrderit,
napakannet, lepokerroksen vanhaa polkua (?laattakerros=0), tallennusta,
Raamattua, tiedostoja tools/savukkeet/mittaa-* (E2).

TODENNUS (kirjaa raporttiin taulukkona ennen/jälkeen; suunnitelman
luku 5 rajat): NODE_USE_ENV_PROXY=1 node tools/savukkeet/
mittaa-pallon-liike.mjs --nakyma=puhelin --ulos=<kansio> (reuna liikkeessä
= levossa ±1 px, muste ≤ 2 px, updatePov ≤ 10 ms, laattaverkot ≤ 120,
dc ≤ 120, tekstuureja uudestaan levossa ≤ 20) ja --vaihe=zoom --dpr=1
--sarjams=10000 (tyhjä 0,000 joka kuvassa, ei ero-piikkiä, tason vaihdot
monotoniset) sekä sama --nakyma=tyopoyta. KATSO kuvat itse (montaasi:
lepo | liike | zoomin välikuvat) ja liitä polut. Savukkeet:
savuke-pallolauta.mjs, savuke-avauslento.mjs, savuke-siirtokoreografia
--lauta pallo, savuke-pallolaatat-offline.mjs (pohjan esilataus toimii
yhä), savuke-kartta-tila --lauta pallo. Portit kuten E0. Muutoslokirivi
(≤ 60 mrk) valmiiksi raporttiin, esim. 'Pallo: laattakerros, liike ja
zoom taydella tarkkuudella'. Jos jokin raja ei täyty, ÄLÄ säädä rajaa —
raportoi luku ja syy Fablelle.
```

### E2 — Mittarin vartiot (rinnakkain E1:n kanssa, E0:n jälkeen)

```
TEHTÄVÄ E2 (Opus, yksi commit): tee tools/savukkeet/mittaa-pallon-liike.mjs:stä
myös VARTIJA: uusi lippu --vartio, jolla ajo tulostaa OK/FAIL-rivit
suunnitelman docs/moduulit/pallon-liike-taydella-tarkkuudella.md luvun 5
rajoista (reuna liike = lepo ±1 px ja ≤ 3/5 px; muste liikkeessä ≤ 2 px;
updatePov ≤ 10 ms; laattaverkot ≤ 120; dc ≤ 120; tekstuureja uudestaan
levossa ≤ 20; zoomsarjassa tyhjä = 0 joka kuvassa; ero-piikki ≤ 1,5 ×
naapurien keskiarvo; tason vaihdot monotoniset) ja poistuu koodilla 1,
jos jokin FAIL. Ilman --vartio nykyinen raportti. Lisää myös
--proto-vaihtoehtojen poisto SEN JÄLKEEN kun E3 on mergattu (älä poista
nyt: ne dokumentoivat luvun 2.4 mittaukset) — kirjaa TODO-kommentti.
Lue ensin mittarin otsikkokommentti ja tools/savukkeet/README.md (lisää
rivi mittaa-pallon-liike ja mittaa-kirjastokokeilu taulukkoon:
mitä mittaa, miten ajetaan, mitkä ovat vartion rajat) sekä
tools/tarkista-savukkeet.mjs (ui.X-viittaukset: käytä vain
ui.pallolauta, ui.pallonInstanssi, ui.kartta.ajaKamera, ui.nakyvaAlue,
ui.mapPane, ui.game — kaikki toteutuksessa). EI SAA MUUTTAA: js/*,
tests/*, mittarin mittojen määritelmiä (reunan FWHM, musteraja 150) —
vertailukelpoisuus ennen/jälkeen. TODENNUS: ajo ennen E1:tä (v1642)
antaa FAIL-rivit juuri niistä mitoista, jotka luvun 2 taulukoissa ovat
punaisia (reuna 5/8, muste 8, tekstuurit 210, tason vaihdot 10), ja OK
muista; node tools/tarkista-savukkeet.mjs läpi. Raportti: commit-SHA,
vartion tuloste v1642:lla.
```

### E3 — Siivous: vanhat laatutilat, vipu ja lepokerros pois (E1:n hyväksynnän jälkeen)

```
TEHTÄVÄ E3 (Opus, yksi commit, E1 mergattuna ja omistajan
hyväksyttyä sen puhelimella): poista vanha liike/lepo-laatukone ja
lepokerroksen elinkaari, koska laattakerros on aina terävä. Lue ensin
suunnitelman luku 4.3 ja js/pallo.js kokonaan.
POISTA: js/pallo.js: kytkeLaatunoston kynnys- ja pikselisuhdevaihto
(LAATU_LEPOVIIVE_MS, LAATU_LIIKEVIIVE_MS, LAATU_TERAVYYS*, LAATU_KAUKORAJA,
laatuTeravyys, LAATU_PIKSELISUHDE_LIIKE, laattakynnykset, lepokerroin,
NAPAKERROIN_*, napakerroin — jätä asennaLaatunosto/kytkeLaatunosto
nimeltään mutta sisällöksi: pikselisuhde min(dpr, LAATU_PIKSELISUHDE_LEPO)
kerran, teroita() pohjan laatoille levossa, kerros.paivita-kutsut;
kommentoi otsikkoon miksi), luoLepokerros, luoLepokerroksenAjoitus,
LEPOKERROS_HAIVE_SISAAN_MS, LEPOKERROS_LEPOVIIVE_MS, LEPOKERROS_KUVAKATTO
(muut E0:n apurit jäävät, koska kerros käyttää niitä — tarkista grep),
pakotaPallonLaatu, pallonLaatuPakotettu, laatuPakotukset,
laatuKuuntelijat; js/ui-apurit.js: laatuAinaOsoitteesta, laatuAinaPaalla,
asetaLaatuAina, LAATU_AINA_AVAIN; index.html: kehittaja-laatu-aina-kytkin
(rivit ~221–225) ja js/main.js:n vipukoodi (rivit ~1464 ja ~1617);
js/aikajana.js rivit 163 ja 2962 (pakotaLaatu-metodi: jätä metodi
tyhjäksi no-opiksi, jos linssit kutsuvat sitä — tarkista grep);
js/pallolauta/avaus.js (import rivi 129, kutsut 432 ja 605 sekä
kommentit 44–48, 415–427); js/pallolauta/lauta.js (import rivi 67,
pyydaAloituksenLaatu/vapautaAloituksenLaatu rivit ~715–728 — kutsujat
jäävät, funktiot tyhjiksi tai poistetaan kutsujineen; kommentit 155,
562). tests: tests/pallo.test.mjs testit riveillä 339–373, 550–589,
690–704 (poista tai muuta kuvaamaan uutta tilaa: "kynnykset ovat
kirjaston oletus, pikselisuhde kiinteä"), tests/pallolauta.test.mjs
729–737, tests/aikajana.test.mjs 1157, tests/aikajana-pallolla.test.mjs
86–89, tests/aloitus-pallolla.test.mjs 207–209, tests/
pallolepokerros.test.mjs (siirrä säilyvät apuritestit tests/
pallolaatat.test.mjs:ään ja poista tiedosto). Savukkeet:
savuke-avauslento.mjs laatuPakotettu-kentät (rivit 244–276, 337, 371)
pois; savuke-pallolauta.mjs ja savuke-avauslento.mjs lepokerros-mittarit
→ kerroksen mittarit (sama kahva). tools/tee-etusivupallo.mjs: tarkista
grep — jos se viittaa laatunostoon, päivitä. Docs: karttapallo.md
luvut, joissa liike/lepo-laatutilat ja lepokerros kuvataan
nykytilana → lisää alkuun "KORVATTU laattakerroksella (E1/E3, pvm)" ja
viittaus tähän suunnitelmaan; CONTRIBUTING/README jos mainitsevat
?laatu=aina. EI SAA MUUTTAA: js/pallolaatat.js (kerroksen käytös),
merkit, reitit, nimet, nostot. TODENNUS: grep -rn "laatuAina\|
pakotaPallonLaatu\|luoLepokerros\|LAATU_LIIKEVIIVE\|laattakynnykset" js
tests tools index.html → 0 osumaa (paitsi muutokset.js:n historia);
kaikki portit; mittari --vartio OK (E2); savukkeet pallolauta,
avauslento, aikajana, siirtokoreografia --lauta pallo. Raportti:
poistetut rivit tiedostoittain.
```

### E4 — Avauslennon esilataus pyramidilaatoille (E3:n jälkeen; rinnakkain E5:n kanssa)

```
TEHTÄVÄ E4 (Opus, yksi commit): avauslennon käytävä esiladataan
laattakerroksen laatoille. Lue js/pallo.js (reitinLaatat,
esilataaLentoreitti, REITIN_*), js/pallolauta/avaus.js valmistele(),
js/pallolaatat.js (laatanKartta, lepokerroksenLaatat) ja suunnitelman
luku 4. TOTEUTA: js/pallolaatat.js: export function reitinPyramidilaatat({
pisteet, tasot = [5, 6], laskeutumistaso = 7, sade = 1 }) → pyramidin
laattaosoitteet (pohja + viiva + nosto niillä tasoilla, joilla ne
ovat; pyramidinLaattaOlemassa suodattaa) käytävälle; esilataus
selaimen HTTP-välimuistiin: fetch(url, { priority: 'low' }) rajoitettuna
(≤ 4 rinnakkain), ei palvelutyöntekijää (pyramidilaatat ovat immutable
kuten tasokartalla). js/pallo.js: REITIN_ESILATAUSTASOT → [4, 5] ja
REITIN_LASKEUTUMISTASO → 5 pohjalle (pohja ei nouse yli 5:n), ja
esilataaLentoreitti kutsuu lisäksi reitinPyramidilaatat-esilatausta.
Testit tests/pallo.test.mjs (esilataus: rivit 434–473) päivitetään
uusiin tasoihin ja tests/pallolaatat.test.mjs saa reitinPyramidilaatat-
testin (Lontoo → Ateena: laattoja n kpl, ei kaksoiskappaleita, vain
olemassa olevat). EI SAA MUUTTAA: sw.js LAATTACACHE:n logiikkaa,
lennon koreografiaa. TODENNUS: savuke-avauslento.mjs (kaappaukset
lennon keskeltä: reuna ≤ 3 px, ei pohjan Z5:tä näkyvissä koneen alla —
lisää vartio, joka mittaa reunan leveyden kaappauksesta
pallon-liike-mittarit.mjs:n reunanLeveys-funktiolla), pyramidipyynnöt
lennon aikana ≤ 20 (loput ehtivät koriin). Raportti: luvut.
```

### E5 — Nostojen poltettu-päätös pyramidista (E3:n jälkeen; rinnakkain E4:n kanssa)

```
TEHTÄVÄ E5 (Opus, yksi commit): kun laattakerros piirtää pyramidin
nostotason, elävän ja poltetun noston päätös on luettava pyramidin
luettelosta, ei pallon Mercator-sarjan luettelosta. Lue
js/pallolauta/nostot.js (onPoltettu-injektio rivi ~141),
js/pallolauta/lauta.js rivi 494, js/pallo.js pallonNostoOnPoltettu ja
js/laattapyramidi.js nostoOnPoltettu, js/fokuskohteet.js rivi ~2031.
TOTEUTA: js/pallolauta/lauta.js rivi 494: onPoltettu: (tunnus,
tiiviste) => (laattakerrosPaalla() ? nostoOnPoltettu(tunnus, tiiviste)
: pallonNostoOnPoltettu(tunnus, tiiviste)) (tuonnit); nostot.js:n
otsikkokommenttiin kappale miksi (kerros näyttää pyramidin nostot,
pallon sarja on sen alla). Testi tests/pallonostot.test.mjs tai
pallolauta.test.mjs: tekstitesti injektiosta. EI SAA MUUTTAA:
pallonNostoOnPoltettu (valikkopallo ja ?laattakerros=0 käyttävät sitä),
nostojen ladontaa. TODENNUS: node tools/tarkista-pallomerkit.mjs --maa
GRC,BGR (poltetut R-osumat = pyramidin nostotason luettelo; ei
kaksoisnostoja: elävä + poltettu samasta tunnuksesta = 0),
savuke-pallolauta.mjs vaihe 3. Raportti: luvut.
```

## 7. Mitä jää auki ja mitä Opus voi jatkaa

- Tason 8 (z8) poltto pyramidiin on yhä ainoa keino saada aidosti
  tarkempi lähikuva (Raamattu: omistajan päätös) — laattakerros ottaa
  sen käyttöön ilman koodimuutosta, kuten lepokerros nyt.
- Pohjan Mercator-sarjan tasot 6–8 jäävät ämpäriin varalle
  (?laattakerros=0); niiden polttoa ei tarvitse jatkaa, jos kerros
  hyväksytään — säästää ajoja.
- Valikkopallo (js/pallo.js avaaPallo) saa saman kerroksen
  rakennaPallon kautta; sitä ei ole erikseen mitattu.
- Jos omistajan puhelimella kehysajat eivät riitä (yli 33 ms p95),
  ensimmäiset säätövakiot ovat PIKSELISUHDE_KATTO (3 → 2) ja
  LAATTAKERROS_LAATTAKATTO_NAKYVA (48 → 32); molemmat ovat yksi luku.

## 8. Raamatun karttarivi (Fable lisää)

`'docs/moduulit/pallon-liike-taydella-tarkkuudella.md — pallon liike ja zoom täydellä tarkkuudella: mittaukset (rantaviivan paksuus, laattamoottorin hinta), kirjastovertailu (MapLibre, 3d-tiles-renderer, Cesium, OpenGlobus), valittu ratkaisu (oma laattakerros pyramidin laatoista Globe.gl:n sisällä) ja Opus-parven erät E0–E5 tehtävänantoineen (Fablemax 6.9.2026; SUUNNITELMA).',`

## 9. Mittarit, kokeilusivut ja kuvat

- `tools/savukkeet/mittaa-pallon-liike.mjs` — pelin pallon mittari
  (luku 2.0); `tools/savukkeet/pallon-liike-mittarit.mjs` — jaetut
  pikselimittarit (PNG-dekoodaus, reunan leveys, musteviiva, tyhjän
  osuus, kuvien ero); `tools/savukkeet/mittaa-kirjastokokeilu.mjs` —
  kirjastokokeilujen mittari; `tools/kokeilut/pallon-liike/{maplibre,
  kolmiulotteiset-laatat,openglobus,cesium}.html` — kokeilusivut
  (kirjastot CDN:stä, mittari reitittää Noden fetchillä; sivut
  toteuttavat yhteisen window.koe-rajapinnan).
- Kuvat (scratchpad, eivät reposssa — polut raportissa):
  `scratchpad/pallon-liike/kuvat/puhelin-ennen-*.png`, `puhelin-aina-*`,
  `puhelin-protoA*`, `puhelin-kartta-*`, `puhelin-koe-*`, montaasit
  `montaasi-ennen.png`, `montaasi-maplibre.png`, `montaasi-tri.png`,
  `montaasi-cesium.png`, `montaasi-kartta.png`; JSON-raportit samassa
  kansiossa.
