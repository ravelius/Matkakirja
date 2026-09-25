# Valmiit palikat, joita Matkakirja voisi hyödyntää

**Kartoitus 4.9.2026 · tutkijasessio (Opus) · omistajan pyyntö:**
*"Voisiko joku agentti kartoittaa mitä muita valmiita palikoita on
olemassa mitä matkakirja voisi hyödyntää eri kohdissa. Visuaalisuuden
lisäys, animaatiot, 3D?, uudet linssi suunnitelmat. Tähän asti kaikki
on koodattu alusta itse mutta jos näin kehittyneitä koodeja on
saatavilla niin näitähän kannattaa ehdottomasti hyödyntää."*

Tämä on **kartoitus, ei päätös**. Yksikään rivi ei ole linjaus ennen
kuin Fable kirjaa sen Raamattuun ja omistaja hyväksyy. Ehdokkaita
**58** (43 kirjastoa + 15 aineistolähdettä). Kaikki versionumerot ja
lisenssit on haettu lähteestä 4.9.2026 (npm-rekisteri, cdnjs API,
projektien LICENSE-tiedostot), ei muistista; koot on mitattu
lataamalla tiedosto ja pakkaamalla se (`gzip -9`), joten luvut ovat
yhteismitallisia.

---

## 0. Mitä peli tekee tällä hetkellä itse

Tämä ratkaisee, mihin valmis kirjasto ylipäätään mahtuu.

| pelin osa | tiedosto | tekniikka nyt | valmis kirjasto toisi |
|---|---|---|---|
| pelilauta ja kamera | `js/kartta.js` (4755 r.) | **SVG** + oma `ajaKamera` (rAF + oma easing), zoomiportaat, eleet, iOS-korjaukset | ei mitään — tämä on pelin sydän ja hiottu iOS:lle |
| karttapallo | `js/pallo.js` | **Globe.gl 2.46.2** (MIT) R2:n `vendor/`-polusta, oma laattapyramidi | jatkoa: nimet, kaaret, pilvet, yöpuoli |
| linssikerros | `js/linssit/kerros.js` + 13 linssiä | SVG-vektorit ≤400 elementtiä, muuten rasteroitu `<image>` | hiukkaset, WebGL-kerros, projektiot |
| aikajanalinssi | `js/aikajana.js` (2862 r.), `css/aikajana.css` (1589 r.) | oma kello, karuselli, ilmiöpaneeli, CSS-siirtymät | ajastus- ja sekvenssimoottori |
| lyhtyliekit | `js/lyhty.js` | oma liekkimalli (aaltojen summa, rAF) | ei mitään — 136 riviä, toimii, testattava |
| äänet | `js/sound.js` (1833 r.) syntetisoituna Web Audiolla, `js/ambience-stream.js`, `js/siirtymamusiikki.js`, `js/tehosteet.js` | oma Web Audio -graafi, ristihäivytykset | efektiketjut (kaiku, megafoni), näytteensoitto |
| sää | `js/saa.js` | Open-Meteo + oma SVG-graafi | valmis kuvaajakirjasto |
| lehdet | `js/lehti.js` (2304 r.) | oma sivupino ja taitto | sivunkääntö, tavutus |
| kohdekartat | `js/fokuskohteet.js`, `js/fokusniput.js` | SVG-merkit + zoomiriippuvat nimet | ei mitään |

**Johtopäätös heti alkuun:** pelin oma koodi on vahvinta juuri siellä,
missä valmiit kirjastot ovat heikoimpia (SVG-lauta, iOS-eleet,
pergamentti-ilme, suomenkielinen sisältö). Valmiit kirjastot ovat
vahvimpia siellä, missä peli ei vielä tee mitään: **3D-pallo,
hiukkaset, WebGL-datakerrokset, tähtitaivas, auringon geometria,
tavutus, sivunkääntö, äänitehosteketjut.** Kartoituksen kärki on
siksi *uudessa*, ei jo tehdyn korvaamisessa.

### Tekniset reunaehdot (näitä vasten jokainen ehdokas on arvioitu)

1. **Ei build-vaihetta.** Kirjaston on oltava UMD/IIFE (`<script>`,
   globaali) tai ESM, joka tuodaan dynaamisesti CDN:stä. Bare-import
   (`from 'three'`) vaatii `<script type="importmap">` — se toimii
   Safari 16.4+ / Chrome 89+ eli kaikilla pelin tukemilla, mutta se on
   uusi asia `index.html`:ään.
2. **Kirjastot tulevat R2:n `vendor/`-polusta, eivät reposta.** Malli on
   jo olemassa: `js/pallo.js` `PALLO_KIRJASTO`. Näin repo ei paisu,
   CDN-katko ei kaada peliä, ja service worker voi tallentaa kirjaston
   välimuistiin. **Suositus: kaikki alla olevat kirjastot samaa tietä.**
3. **Offline on normaalitila, ei poikkeus.** Kirjaston puuttuminen ei
   saa kaataa peliä; malli on `lataaPallokirjasto()`:n virhehaara.
4. **Yhden tiedoston versio (`dist/`) ei saa linssejä** eikä siis
   ulkoisia kirjastoja — se on jo hyväksytty raja
   (`docs/moduulit/linssit.md` 2.1).
5. **iOS Safari** on ensisijainen laite (natiivikuori `ios/`). WebGL2
   toimii, mutta muistikatto on matala: yksi WebGL-konteksti kerrallaan,
   ei kolmea. Web Audio vaatii eleen (jo hoidettu).
6. **Perustuslain pilari 5 (avoimuus, vapaat lisenssit)** rajaa pois
   GPL/AGPL/NC-lisenssit ja ei-OSI-lisenssit. Tämä pudotti kartoituksesta
   kuusi muuten hyvää palikkaa (luku 8).

---

## 1. Animaatiot ja siirtymät

Pelissä on jo kaksi omaa animaatiokonetta: kamera-ajo (`ajaKamera`,
rAF + easing) ja aikajanan CSS-siirtymät. Kirjasto kannattaa ottaa
vain, jos se tuo **sekvenssin** (monta asiaa peräkkäin, keskeytettävissä)
tai **liikeradan** (kohde kulkee kaarta pitkin) — molemmat ovat käsin
työläitä ja niitä tarvitaan virtalinssissä ja kamera-ajoissa.

| # | kirjasto | versio | lisenssi | koko (gz) | osoite |
|---|---|---|---|---|---|
| 1.1 | **Motion** (ent. Motion One) | 13.2.0 | MIT | **45 kt** | `https://cdn.jsdelivr.net/npm/motion@13.2.0/dist/motion.min.js` (UMD, globaali `Motion`) |
| 1.2 | **anime.js v4** | 4.5.0 | MIT | **39 kt** | `https://cdnjs.cloudflare.com/ajax/libs/animejs/4.5.0/anime.umd.min.js` |
| 1.3 | **Vivus** | 0.4.6 | MIT | **4 kt** | `https://cdn.jsdelivr.net/npm/vivus@0.4.6/dist/vivus.min.js` |
| 1.4 | **canvas-confetti** | 1.9.4 | ISC | **6 kt** | `https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.4/dist/confetti.browser.js` |
| 1.5 | **lottie-web (light)** | 5.13.0 | MIT | **46 kt** | `https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/build/player/lottie_light.min.js` |
| 1.6 | **Rive (canvas-runtime)** | 2.42.0 | MIT (ajonaikainen) | **98 kt** + WASM | `https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.42.0/rive.js` |
| 1.7 | **KUTE.js** | 2.2.6 | MIT | ~30 kt | `https://cdn.jsdelivr.net/npm/kute.js@2.2.6/dist/kute.min.js` |
| — | ~~GSAP~~ | 3.15.0 | **ei-permissiivinen** | 27 kt | ks. luku 8 |

**1.1 Motion** — *mihin:* aikajanalinssin sekvenssit, fokusvirran
korttien saapuminen, linssien avaus- ja sulkujaksot, pöllön kuplat.
*Mitä pelaajalle:* liikkeet jotka voi keskeyttää ja kelata (nyt CSS-
siirtymä on joko-tai), ja yhtenäinen jousi-tuntuma koko pelissä.
Rakentuu selaimen oman Web Animations API:n päälle, joten se on
GPU-kiihdytetty eikä syö rAF-budjettia kartalta. *Työmäärä:* 1 pv
kokeilu yhdessä paikassa (fokusvirta), 3–4 pv jos siirretään
aikajanan siirtymät. *Riskit:* pieni — API on pieni, poistaminen
helppoa; 45 kt on kuitenkin enemmän kuin moni luulee (mini-versio
`motion/mini` on ~5 kt mutta ei UMD:nä).

**1.2 anime.js v4** — sama käyttöala kuin Motionilla, mutta oma
ajastin (ei WAAPI). *Etu:* aikajana-API (`createTimeline`) on
täsmälleen se, mitä virtalinssin laivavirrat tarvitsevat: kymmeniä
kohteita samalla kellolla, yksi `pause()`. *Riski:* oma rAF-silmukka
kilpailee kartan ajon kanssa; 39 kt.

**1.3 Vivus** — *mihin:* **musteviiva piirtyy itsestään**. Isoisän
reitti kartalle, sähkeen alleviivaus, aarrekartan viiva, linssin
kaari. Neljä kilotavua, tekee yhden asian täydellisesti
(`stroke-dasharray`-animaatio SVG-poluille). Peli piirtää jo reittejä
SVG:llä, joten tämä on suora lisä. *Työmäärä:* 0,5 pv. *Riski:* ei
käytännössä mitään.

**1.4 canvas-confetti** — aarteen löytymisen juhla. 6 kt, ei
riippuvuuksia, oma canvas. *Huom:* pelin ilme on 1873, joten
konfetti pitäisi värittää pergamentiksi/kullaksi tai korvata
"paperisilppu"-hiukkasilla — muuten se rikkoo tyylin. *Työmäärä:*
0,5 pv. Harkinnanvarainen.

**1.5 Lottie / 1.6 Rive** — molemmat toistavat **muualla tehtyjä**
animaatioita. Ne olisivat oikea ratkaisu, jos pelillä olisi
animaattori. Nyt ei ole: Lottie-tiedosto syntyy After Effectsistä
tai LottieFilesin editorista, Rive-tiedosto Riven omasta editorista
(runtime on MIT ja ilmainen, editorin ilmaistaso on rajattu 3
tiedostoon, maksullinen taso 9 $/kk). **Suositus: ei nyt.** Poikkeus:
jos joskus halutaan yksi laadukas *animoitu tunnus* (matkakirjan logo
avautuu, kompassineula asettuu), yksi Lottie-tiedosto + 46 kt on
halvempi kuin viikko käsityötä.

---

## 2. Kartat ja maantiede

### 2.1 Kirjastot

| # | kirjasto | versio | lisenssi | koko (gz) | osoite |
|---|---|---|---|---|---|
| 2.1 | **d3-geo** | 3.1.1 | ISC | **12 kt** | `https://cdn.jsdelivr.net/npm/d3-geo@3.1.1/dist/d3-geo.min.js` |
| 2.2 | **d3-geo-projection** | 4.0.0 | ISC | **22 kt** | `https://cdn.jsdelivr.net/npm/d3-geo-projection@4.0.0/dist/d3-geo-projection.min.js` |
| 2.3 | **topojson-client** | 3.1.0 | ISC | **2 kt** | `https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js` |
| 2.4 | **Turf.js (koko)** | 7.4.0 | MIT | **138 kt** | `https://cdn.jsdelivr.net/npm/@turf/turf@7.4.0/turf.min.js` |
| 2.5 | **SunCalc** | 1.9.0 | BSD-2-Clause | **3 kt** | `https://cdnjs.cloudflare.com/ajax/libs/suncalc/1.9.0/suncalc.min.js` |
| 2.6 | **astronomy-engine** | 2.1.19 | MIT | **45 kt** | `https://cdn.jsdelivr.net/npm/astronomy-engine@2.1.19/astronomy.browser.min.js` |
| 2.7 | **satellite.js** | 6.0.1 | MIT | **11 kt** | `https://cdn.jsdelivr.net/npm/satellite.js@6.0.1/dist/satellite.min.js` |
| 2.8 | **MapLibre GL JS** | 5.24.0 | BSD-3-Clause | **268 kt** | `https://cdn.jsdelivr.net/npm/maplibre-gl@5.24.0/dist/maplibre-gl.js` |
| 2.9 | **PMTiles** | 4.5.0 | BSD-3-Clause | **7 kt** | `https://cdn.jsdelivr.net/npm/pmtiles@4.5.0/dist/pmtiles.js` |
| 2.10 | **deck.gl (standalone)** | 9.3.11 | MIT | **459 kt** | `https://cdn.jsdelivr.net/npm/deck.gl@9.3.11/dist.min.js` |
| 2.11 | **three-globe** | 2.45.2 | MIT | **364 kt** | `https://cdn.jsdelivr.net/npm/three-globe@2.45.2/dist/three-globe.min.js` |
| 2.12 | **OpenSeadragon** | 6.1.0 | BSD-3-Clause | **85 kt** | `https://cdn.jsdelivr.net/npm/openseadragon@6.1.0/build/openseadragon/openseadragon.min.js` |
| 2.13 | **Allmaps** (`@allmaps/openlayers`) | 1.0.0-beta.86 | MIT | ~150 kt | `https://cdn.jsdelivr.net/npm/@allmaps/openlayers@1.0.0-beta.86/dist/index.js` (ESM, vaatii OpenLayersin) |

**2.1–2.3 d3-geo + d3-geo-projection + topojson** — *mihin:*
`js/fokusmitat.js` tekee jo omat muunnokset (Miller-projektio laudalle),
mutta **jokainen uusi linssi, joka tuo maailmandataa, joutuu
projisoimaan sen laudalle**, ja `tools/`-putket joutuvat kääntämään
julisteita projektiosta toiseen (`tee-pallotekstuuri.mjs` tekee sen
käsin). d3-geo on 12 kt ja hoitaa Millerin, tasavälisen, ortografisen
ja kaikki muut kirjastotasoisesti — lisäksi `geoDistance`,
`geoInterpolate` (isokaari kahden kaupungin välillä!) ja
`geoCircle` (näkyvyysympyrä). *Mitä pelaajalle:* isoisän reitit
piirtyvät oikeina isokaarina eivätkä suorina viivoina, ja uusia
aineistoja saa laudalle päivässä eikä viikossa. *Työmäärä:* 1 pv
(apuri `js/geo.js`, joka kääntää GeoJSONin laudan pikseleiksi), sen
jälkeen jokainen linssi säästää 1–2 pv. **Tämä on kartoituksen
halvin iso voitto.** *Riskit:* ei juuri mitään — 12 kt, ISC, ei
riippuvuuksia, toimii sekä selaimessa että Node-putkissa.

**2.4 Turf.js** — geometrialaskenta: piste polygonin sisällä (mikä maa
on tämän kaupungin alla), puskurivyöhykkeet, yksinkertaistus
(`simplify` — juuri se, mitä aluelinssin rajat tarvitsevat, jotta
elementtikatto 400 ei ylity), keskipisteet nimien sijoitteluun.
*Suositus:* **älä ota koko 138 kt:n pakettia**, vaan osamodulit
(`@turf/simplify`, `@turf/boolean-point-in-polygon`, MIT, kukin
muutama kilotavu) tai käytä sitä vain `tools/`-putkissa Nodessa,
jolloin selain ei lataa siitä mitään. *Työmäärä:* 0,5 pv.

**2.5 SunCalc** — kolme kilotavua, jotka avaavat **neljä linssi-ideaa**
(luku 7): auringon nousu ja lasku, yön ja päivän raja kartalla,
hämärävyöhykkeet, kuun vaiheet ja kuun nousu. Antaa myös
kaupunkilehteen rivin *"Bombayssa aurinko nousi 6.14, isoisän
päiväkirjan päivänä"*. *Työmäärä:* 0,5 pv rajapinta, 2–3 pv koko
yökartta-linssi. *Riskit:* ei mitään. **Paras hyöty/koko-suhde koko
kartoituksessa.**

**2.6 astronomy-engine** — tarkempi kuin SunCalc: planeetat, kuun
vaiheet minuutilleen, pimennykset, tähtien näennäinen paikka annettuna
hetkenä. *Mihin:* **tähtitaivas 1873** — pelaaja näkee taivaan
sellaisena kuin isoisä sen näki Bombayssa 12.11.1873. Tämä on
tarinallisesti vahvin uusi linssi-idea koko listalla. *Työmäärä:*
4–6 pv (tähtiluettelo + piirto + tarina). *Riskit:* 45 kt, ja tarvitsee
tähtiluettelon (Yale Bright Star Catalog on julkista aineistoa).

**2.8 + 2.9 MapLibre GL + PMTiles** — *mihin:* **kohdekartat**
(kaupungin sisäiset kartat, 908 kohdetta) ja mahdollinen katutason
zoomi. PMTiles on yksi tiedosto R2:ssa, josta selain hakee vain
tarvitsemansa palan `Range`-pyynnöillä — täsmälleen sama malli kuin
pallon laatoilla, mutta vektorina, joten nimet ja tiet skaalautuvat
terävinä ja **pelin oma väripaletti voi tulla tyylitiedostosta**.
*Mitä pelaajalle:* Sarajevon basaarikorttelin oikeat kujat 1873-tyylillä
väritettynä. *Työmäärä:* 5–8 pv (tyyli on oma työnsä; tiilipaketin
rakentaminen `tools/`-putkeen 2 pv). *Riskit:* 268 kt on paljon;
oma WebGL-konteksti (iOS:llä ei saa olla auki yhtä aikaa pallon
kanssa); OSM-pohjaisen aineiston ODbL-attribuutio pakollinen.
**Suositus: pidä jäissä kunnes joku oikeasti pyytää katutasoa.**

**2.10 deck.gl** — WebGL-kerros isoille datamäärille: `ArcLayer`
(siirtomaiden laivareitit hehkuvina kaarina), `TripsLayer`
(animoitu matka ajassa — täsmälleen virtalinssin idea),
`HeatmapLayer`, `HexagonLayer`. *Mitä pelaajalle:* virtalinssi, jossa
liikkuu tuhat laivaa 60 kuvaa sekunnissa sen sijaan että SVG-katto
(400 elementtiä) rajoittaisi kymmeneen. *Työmäärä:* 6–10 pv (kerros
kartan päälle, koordinaattimuunnos, sulkeutuminen). *Riskit:* **459 kt**
on kartoituksen raskain palikka; toinen WebGL-konteksti; deck.gl:n
oma kameramalli ei ole sama kuin pelin `ajaKamera`, joten
synkronointi on oikeaa työtä. **Vaihtoehto:** sama efekti PixiJS:llä
(232 kt) tai omalla canvas-hiukkaskerroksella — linssisopimus jo
puhuu "hiukkasmoottorista Canvas-kerrokseen".

**2.11 three-globe** — Globe.gl:n moottori ilman sen kuorta. *Miksi
kiinnostava:* nykyinen Globe.gl-UMD **sisältää oman kopionsa
three.js r185:stä** (mitattu: 1,84 Mt raaka / 511 kt gz). Jos peliin
halutaan pallolle three.js-lisäosia (pilvet, tähtitausta,
jälkikäsittely, `troika-three-text`-nimet), ne tuovat *toisen* kopion
three.js:stä — kaksi eri `WebGLRenderer`-luokkaa samassa sivussa on
klassinen ja ikävä vika. Silloin oikea rakenne on: oma
`three@0.185.1` ESM + importmap + `three-globe` + lisäosat, jotka
kaikki jakavat saman three-instanssin. *Työmäärä:* 2 pv siirtoon,
jos ja kun pallolle halutaan lisää kerroksia. *Riski:* importmap on
uusi asia `index.html`:ssä; hyötyä ei ole ennen kuin lisäosia
todella tulee. **Suositus: älä siirrä nyt, mutta kirjaa tämä ehto
Raamattuun: "ensimmäinen pallolle tuleva three-lisäosa pakottaa
siirtymään three-globeen".**

**2.12 OpenSeadragon + 2.13 Allmaps** — *mihin:* **isoisän aikalaiskartat
pelin sisään**. Allmaps georeferoi IIIF-kuvakirjastojen (David Rumsey,
kansalliskirjastot) skannatut vanhat kartat ja tarjoaa ne laattoina;
OpenSeadragon näyttää jättikuvan sujuvasti puhelimessa. *Mitä
pelaajalle:* aito 1870-luvun kartta Bombaysta pelin kartan päällä
liu'utettavana, "näin isoisä sen näki". *Työmäärä:* 3–5 pv.
*Riskit:* jokaisen skannatun kartan **oma** lisenssi on tarkistettava
erikseen (kirjastojen aineistot ovat usein PD, mutta eivät aina);
Allmaps on yhä beta.

### 2.2 Aineistot (ei koodia, mutta ratkaisee mikä linssi on mahdollinen)

| aineisto | lisenssi | kelpaako | mihin |
|---|---|---|---|
| **Natural Earth** | julkinen (public domain) | **kyllä** (jo käytössä, `ne50.geojson`) | rajat, joet, järvet, kaupungit |
| **Köppen–Geiger, Beck ym. 2018** | CC BY 4.0 | **kyllä** | ilmastolinssi (jo suunnitelmissa) |
| **Glottolog 5.3** (`languages_and_dialects_geo.csv`) | CC BY 4.0 | **kyllä** | kielilinssi: 8000+ kieltä pisteinä |
| **Tektoniset laatat, Bird 2003 / fraxen** | ODC-BY 1.0 | **kyllä** (nimeäminen) | mannerlaattalinssi |
| **NOAA GFS -tuulikentät** | julkinen (USA:n valtio) | **kyllä** | tuulilinssi, purjereitit |
| **NASA Black Marble / Blue Marble** | NASA:n kuvakäytäntö (vapaa, nimeäminen) | **kyllä** | yökartta (`assets/linssit/yokartta.jpg` jo repossa) |
| **USGS-maanjäristykset, ETOPO/GEBCO** | julkinen | **kyllä** | järistys- ja syvyyslinssit |
| **OpenHistoricalMap** | ODbL 1.0 | **kyllä, ehdoin** | historialliset rajat vuosi kerrallaan |
| **OpenStreetMap / Protomaps-pohja** | ODbL 1.0 | **kyllä, ehdoin** | kohdekartat (PMTiles) |
| **OpenTopoMap-laatat** | CC BY-SA 3.0 + käyttöpolitiikka | **vain omaan ämpäriin renderöitynä** | topografia |
| **World Historical Gazetteer** | CC BY 4.0 | kyllä | historialliset paikannimet |
| **Kontur / GHSL -väestö** | CC BY 4.0 (tarkistettava julkaisukohtaisesti) | todennäköisesti | väestölinssi |
| **Smithsonian GVP (tulivuoret)** | oma käyttöehto | **tarkistettava** | tulivuorilinssi (F1) |
| ~~**historical-basemaps** (aourednik)~~ | **GPL-3.0** | **EI** | ks. luku 8 |
| ~~**CShapes 2.0**~~ | **CC BY-NC-SA 4.0** | **EI** | ks. luku 8 |

---

## 3. 3D ja efektit

| # | kirjasto | versio | lisenssi | koko (gz) | osoite |
|---|---|---|---|---|---|
| 3.1 | **three.js** | 0.185.1 | MIT | **87 kt** (ESM) | `https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js` |
| 3.2 | **camera-controls** | 3.1.2 | MIT | **20 kt** (ESM) | `https://cdn.jsdelivr.net/npm/camera-controls@3.1.2/dist/camera-controls.module.js` |
| 3.3 | **postprocessing** | 6.39.4 | Zlib | **112 kt** | `https://cdn.jsdelivr.net/npm/postprocessing@6.39.4/build/postprocessing.min.js` |
| 3.4 | **tsParticles (slim)** | 4.4.0 | MIT | **43 kt** | `https://cdn.jsdelivr.net/npm/@tsparticles/slim@4.4.0/tsparticles.slim.bundle.min.js` |
| 3.5 | **troika-three-text** | 0.52.5 | MIT | ~90 kt | `https://cdn.jsdelivr.net/npm/troika-three-text@0.52.5/dist/troika-three-text.umd.js` |
| 3.6 | **meshline** | 3.3.1 | MIT | ~5 kt | `https://cdn.jsdelivr.net/npm/meshline@3.3.1/dist/index.js` (ESM) |
| 3.7 | **ogl** | 1.0.11 | Unlicense | ~50 kt | kevyt WebGL-vaihtoehto three.js:lle |
| 3.8 | **simplex-noise** | 4.0.3 | MIT | ~3 kt | `https://cdn.jsdelivr.net/npm/simplex-noise@4.0.3/dist/esm/simplex-noise.js` |

**Tärkeä tekninen tosiasia:** three.js **ei enää julkaise UMD-buildia**
(tarkistettu: `build/three.min.js` → 404, `build/three.module.min.js`
→ 200), ja kaikki lisäosat (`examples/jsm/…`) tuovat `from 'three'`.
Siksi jokainen three-lisäosa vaatii `<script type="importmap">`
-lohkon `index.html`:ään. Se on yksi kertaluonteinen 10 rivin lisäys ja
toimii kaikilla pelin tukemilla selaimilla, mutta se on **päätös**, ei
detalji — ja kuten 2.11 kertoo, se pitää tehdä yhtä aikaa
Globe.gl → three-globe -siirron kanssa, jottei three.js:ää ole kahta.

**3.2 camera-controls** — *mihin:* pallon kamera. Globe.gl:n oma
`OrbitControls` ei osaa sulavaa "lennä kaupunkiin ja pysähdy"
-liikettä; camera-controls osaa (`dollyTo`, `moveTo`, `smoothTime`,
`truck`) ja on suunniteltu juuri Google Earth -tyyliseen sukellukseen.
*Mitä pelaajalle:* sukellus pallolta laudalle jatkuu yhtenä liikkeenä
sen sijaan että pallo sulkeutuisi ja lauta ilmestyisi. *Työmäärä:*
2–3 pv (edellyttää 2.11:n siirtoa). *Riski:* ESM + importmap.

**3.3 postprocessing** — bloom (lyhtyjen ja linssin valojen hehku
pallolla), vinjetointi, filmirakeisuus, syväterävyys.
*Mitä pelaajalle:* pallon ilme nousee "kirjaston demosta" pelin omaksi
— rakeinen, lämmin, kynttilänvaloinen. *Työmäärä:* 2 pv. *Riskit:*
Zlib-lisenssi on permissiivinen ja kelpaa; **iOS:llä
jälkikäsittelyketju maksaa täytenopeuden**, joten se pitää kytkeä pois
pienitehoisilla laitteilla (ja `prefers-reduced-motion`).

**3.4 tsParticles** — sade, lumi, savu, tähtisade, tomu, kipinät;
valmiit esiasetukset ja `pause()`/`play()`. *Mihin:* kaupunkiin
saapumisen sää (`js/saa.js` tietää jo sään!), virtalinssin lasti- ja
savuhiukkaset, aarteen kimallus, siirtymän tomu. *Mitä pelaajalle:*
Bombayhin saapuessa sataa oikeasti, koska Open-Meteo sanoo niin —
tämä on juuri sitä "paikka ennen lajia", jota perustuslaki vaatii.
*Työmäärä:* 2 pv (kerros + kytkentä `saa.js`:ään), 3–4 pv jos
virtalinssi. *Riskit:* 43 kt; oma canvas kartan päälle (ei WebGL,
joten iOS kestää); jatkuva animaatio on kielletty SVG-linssikerroksessa
— tämä on DOM-canvas kartan *päällä*, kuten aikajanan kello, joten
sopimus sallii sen. Sama huomio kuin konfetilla: hiukkasten pitää
näyttää 1873:lta, ei diskolta.

**3.5 troika-three-text** — terävä tekstin piirto three-kohtaukseen
(SDF-fontit). *Mihin:* **maanosien ja merien nimet pallolle** — juuri
se, minkä omistaja merkitsi 4.9. "seuraavaksi harkittavaa" -listalle.
*Työmäärä:* 2 pv. *Riski:* vaatii 2.11:n siirron; fonttitiedosto R2:een.

---

## 4. 2D-piirto ja visualisointi

| # | kirjasto | versio | lisenssi | koko (gz) | osoite |
|---|---|---|---|---|---|
| 4.1 | **StPageFlip** (`page-flip`) | 2.0.7 | MIT | **10 kt** | `https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js` |
| 4.2 | **Observable Plot** | 0.6.17 | ISC | **67 kt** | `https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.17/dist/plot.umd.min.js` |
| 4.3 | **D3 (koko)** | 7.9.0 | BSD-3-Clause | **90 kt** | `https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js` |
| 4.4 | **Rough.js** | 4.6.6 | MIT | **8 kt** | `https://cdn.jsdelivr.net/npm/roughjs@4.6.6/bundled/rough.js` |
| 4.5 | **rough-notation** | 0.5.1 | MIT | **3 kt** | `https://cdn.jsdelivr.net/npm/rough-notation@0.5.1/lib/rough-notation.iife.js` |
| 4.6 | **textures** (d3-kuviot) | 1.2.3 | MIT | ~6 kt | `https://cdn.jsdelivr.net/npm/textures@1.2.3/dist/textures.js` |
| 4.7 | **PixiJS** | 8.20.1 | MIT | **232 kt** | `https://cdn.jsdelivr.net/npm/pixi.js@8.20.1/dist/pixi.min.js` |
| 4.8 | **Chart.js** | 4.5.1 | MIT | ~68 kt | `https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.js` |
| 4.9 | **vis-timeline** | 8.5.4 | Apache-2.0 TAI MIT | ~120 kt | `https://cdn.jsdelivr.net/npm/vis-timeline@8.5.4/standalone/umd/vis-timeline-graph2d.min.js` |
| 4.10 | **Konva / Fabric / Paper.js** | 10.3.3 / 7.4.0 / 0.12.18 | MIT | 60–120 kt | canvas-piirtokehykset |

**4.1 StPageFlip** — *mihin:* **matkakirjan ja lehden sivunkääntö.**
Kymmenen kilotavua, MIT, toimii tavallisilla DOM-elementeillä (eli
pelin nykyiset sivut kelpaavat sellaisenaan), tukee kosketusta,
"pehmeä paperi" -taivutuksen ja kovakantisen kirjan tilan. *Mitä
pelaajalle:* isoisän päiväkirja kääntyy kuin kirja — yksi ele, joka
myy koko pelin idean sekunnissa. *Työmäärä:* 2–3 pv (`js/lehti.js`
antaa sivut, StPageFlip hoitaa eleen; paluu vanhaan on yksi lippu).
*Riskit:* pieni; iOS:llä kääntö on CSS-transformia, joten se on
nopea; **on varmistettava ettei kääntö riko lukijaa (`js/lukija.js`)
eikä tarttuvaa otsikkoriviä.** **Tämä on kartoituksen näyttävin
pieni voitto.**

**4.2 Observable Plot** — *mihin:* `js/saa.js`:n vuosigraafi,
maalehden tunnusluvut, vertailulinssi, kaupungin kasvun lavalinssi,
tietäjätilastot. Yksi rivi koodia = yksi kuvaaja, ja tulos on SVG,
jonka voi tyylitellä pelin musteväreillä. *Mitä pelaajalle:* jokainen
maalehti voi saada oikean kuvaajan ilman että joku piirtää sen käsin.
*Työmäärä:* 1–2 pv ensimmäinen, sen jälkeen tunteja per kuvaaja.
*Riskit:* 67 kt sisältää oman d3:nsa; ilmeen yhtenäisyys vaatii oman
teematiedoston (0,5 pv).

**4.4 Rough.js + 4.5 rough-notation + 4.6 textures** — *mihin:*
**pelin oma ilme**, ei data. Rough.js piirtää SVG:n käsin piirretyn
näköisenä (viiva heiluu, viivoitus on epätasainen), rough-notation
alleviivaa ja ympyröi sanoja lehden tekstissä *animoiden*, textures
tekee viivoitus- ja pistekuvioita alueille (juuri se, mitä 1873-kartan
maakuviot kaipaavat). Yhteensä 17 kt. *Mitä pelaajalle:* kartta ja
lehti näyttävät piirretyiltä eivätkä generoiduilta; pöllön korostus
lehdessä on "kynällä ympyröity" eikä keltainen highlight.
*Työmäärä:* 1 pv kokeilu, 2–3 pv jos otetaan linssien selitteisiin ja
lehteen. *Riskit:* Rough.js kolminkertaistaa elementtimäärän
(linssikerroksen katto 400!) → käytä vain pienissä koristeissa tai
rasteroituna. **Erittäin hyvä ilme/koko-suhde.**

**4.7 PixiJS** — jos hiukkasia tarvitaan tuhansia (virtalinssin laivat,
tähtisade, tomu), Pixi on nopein 2D-WebGL-moottori ja huomattavasti
kevyempi kuin deck.gl. *Työmäärä:* 4–6 pv. *Riskit:* 232 kt, oma
WebGL-konteksti, iOS-muisti. **Ota vasta jos tsParticles + canvas ei
riitä.**

---

## 5. Ääni

Peli syntetisoi äänensä itse (`js/sound.js`, 1833 riviä) ja se on
tietoinen valinta ("peli pysyy kevyenä ja toimii offline"). Kirjasto
ei korvaa sitä; kirjasto voi tuoda **efektiketjut** ja **näytteiden
hallinnan**, joita ei ole.

| # | kirjasto | versio | lisenssi | koko (gz) | osoite |
|---|---|---|---|---|---|
| 5.1 | **Tuna** (Web Audio -efektit) | 1.1.3 | MIT | **10 kt** | `https://cdn.jsdelivr.net/npm/tunajs@1.1.3/tuna.js` |
| 5.2 | **Howler.js** | 2.2.4 | MIT | **10 kt** | `https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.4/howler.min.js` |
| 5.3 | **Tone.js** | 15.1.22 (cdnjs tarjoaa 15.5.36 = `next`) | MIT | **77 kt** | `https://cdn.jsdelivr.net/npm/tone@15.1.22/build/Tone.min.js` |
| 5.4 | **wavesurfer.js** | 7.12.11 | BSD-3-Clause | ~30 kt | aaltomuoto luennan alle |
| 5.5 | **soundfont-player / Tonal** | 0.12.0 / 6.4.3 | MIT | 10–40 kt | soittimet ja musiikkiteoria |

**5.1 Tuna** — *mihin:* **radiolinssi, megafonikuulutukset,
puhelinlinja, luolakaiku.** Valmiit efektisolmut: `Convolver` (tilan
kaiku), `Filter`, `Bitcrusher`, `Overdrive`, `Chorus`, `Phaser`,
`Tremolo`, `WahWah`. Näiden käsin kirjoittaminen Web Audiolla on
päiviä; Tunalla se on rivi. *Mitä pelaajalle:* siirtomaalinssin
megafonikuulutus **kuulostaa megafonilta**, radiolinssin asema rätisee
oikein, ja Livian ääni luolassa saa luolan kaiun. *Työmäärä:* 1–2 pv
(efektiketju `sound.js`:n masterin eteen valinnaisena). *Riskit:*
kirjasto on vanha (2021) mutta pieni ja vakaa; ei riippuvuuksia.
**Halvin ääniparannus.**

**5.2 Howler.js** — näytteiden soitto, sprite-äänet, feidaus,
iOS-lukituksen kierto. Peli tekee tämän jo itse
(`js/ambience-stream.js`, `js/media.js`) ja tekee sen hyvin. *Ota
vain jos joku näiden ylläpito alkaa haitata.* Ei suositella nyt.

**5.3 Tone.js** — synteesi, sekvensserit, tempo, efektit. *Mihin:*
linssien musiikki *generoidaan nyt etukäteen* ElevenLabsilla ja
tallennetaan R2:een — se on hyvä ratkaisu (offline, laatu, kustannus).
Tone.js olisi vaihtoehto "musiikki syntyy pelissä ja reagoi
tilanteeseen", mutta 77 kt + iOS-audiokuorma + ilmeinen laatuero
puhuvat sitä vastaan. **Ei suositella.**

---

## 6. Teksti ja typografia

| # | kirjasto | versio | lisenssi | koko (gz) | osoite |
|---|---|---|---|---|---|
| 6.1 | **Hyphenopoly** | 6.1.0 | MIT | **3 kt** + `fi.wasm` **1 kt** | `https://cdn.jsdelivr.net/npm/hyphenopoly@6.1.0/Hyphenopoly_Loader.js` |
| 6.2 | **opentype.js** | 2.0.0 | MIT | **66 kt** | `https://cdn.jsdelivr.net/npm/opentype.js@2.0.0/dist/opentype.min.js` |
| 6.3 | **Vivus** (ks. 1.3) | 0.4.6 | MIT | 4 kt | musteviivan piirtyminen |
| 6.4 | **Splitting.js** | 1.1.0 | MIT | ~5 kt | `https://cdn.jsdelivr.net/npm/splitting@1.1.0/dist/splitting.min.js` |
| 6.5 | **typeset** (Knuth–Plass) | 0.3.5 | MIT | ~10 kt | tasapalstan optimaalinen rivitys |
| — | **SVG `<textPath>`** | — | natiivi | **0 kt** | kaareva teksti kartalle ilman kirjastoa |

**6.1 Hyphenopoly** — *mihin:* **lehden tasatut palstat.** Suomi on
pitkien sanojen kieli, ja tasattu palsta ilman tavutusta repeää
(`docs/moduulit/kaupunkilehti.md` -mallin taitto). Selainten oma
`hyphens: auto` toimii Safarissa ja Chromessa suomen kielellä, mutta
**ei kaikissa vanhemmissa Androideissa eikä canvas-piirrossa**.
Hyphenopoly on 4 kt yhteensä ja tavuttaa täsmälleen suomen sääntöjen
mukaan. *Työmäärä:* 0,5 pv. *Riskit:* WASM-tiedosto R2:een; jos
`hyphens: auto` riittää mittausten mukaan, tätä ei tarvita —
**mittaa ensin**.

**6.2 opentype.js** — muuttaa tekstin poluiksi. *Mihin:*
**kirjoituskoneanimaatio, jossa muste piirtyy kirjain kerrallaan**
(polku + Vivus), isoisän käsiala päiväkirjassa, kaiverretut otsikot.
*Mitä pelaajalle:* päiväkirjan teksti "kirjoittuu" käsialalla luennan
tahdissa — sama vaikutus kuin nykyinen rivi-kerrallaan-latominen, mutta
sata kertaa kauniimpi. *Työmäärä:* 3–4 pv (fontin valinta ja lisenssi
on oma työnsä). *Riskit:* 66 kt; polkuina piirretty teksti ei ole
ruudunlukijalle luettavaa (tarvitaan `aria-label` rinnalle) — pelissä
on lukija, joten tämä on aito vaatimus, ei muodollisuus.

**6.4 Splitting.js** — pilkkoo tekstin kirjaimiksi/sanoiksi CSS-
animaatiota varten (5 kt). Kevyt tapa saada otsikot "asettumaan
paikoilleen" ilman opentype.js:ää. *Työmäärä:* 0,5 pv.

**Muistutus:** kaareva teksti kartalla (maiden ja merien nimet
kaartuvina) ei vaadi kirjastoa lainkaan — SVG `<textPath>` tekee sen
natiivisti ja peli piirtää jo SVG:tä. Se on ilmainen visuaalinen
parannus `js/karttanimet.js`:ään.

---

## 7. Uudet linssi-ideat, jotka valmis data + kirjasto mahdollistaa

Linssikatalogissa (`docs/linssikatalogi.md`) on jo ~40 *sisältölinssiä*
(aikajanat, aluelinssit, virtalinssit). Nämä ovat eri lajia:
**ilmiölinssejä**, joissa itse maailma on data ja kirjasto tekee
laskennan. Jokainen on erillinen ehdotus, ei suunnitelma.

| # | linssi | data (lisenssi) | kirjasto | työmäärä | mitä pelaajalle |
|---|---|---|---|---|---|
| L1 | **Yö ja päivä** | SunCalc-laskenta + NASA Black Marble (vapaa) | SunCalc 3 kt | 2–3 pv | Terminaattoriviiva liukuu kartalla; pelaaja näkee, että isoisän lähtiessä Lontoosta Bombayssa oli jo pimeää. Yökuvassa syttyvät nykymaailman valot — 1873:n ja tämän päivän ero yhdellä silmäyksellä. |
| L2 | **Tähtitaivas 1873** | Yale Bright Star Catalog (julkinen) | astronomy-engine 45 kt (+ three tai SVG) | 4–6 pv | Taivas siinä kaupungissa, sinä yönä, jonka päiväkirja kertoo. Etelänristi ilmestyy ensi kerran päiväntasaajan eteläpuolella — navigoinnin oppitunti ilman oppikirjaa. |
| L3 | **Kuun vaiheet ja vuorovesi** | SunCalc | SunCalc | 1–2 pv | Päiväkirjan päivämäärä → kuun vaihe kuvana. Selittää miksi laiva lähti juuri silloin. |
| L4 | **Tuulet ja purjereitit** | NOAA GFS (julkinen) | canvas-hiukkaset tai deck.gl | 5–8 pv | Passaatituulet virtaavat kartalla; pelaaja ymmärtää, miksi purjelaivareitit kiersivät niin kuin kiersivät. (Esikuva: cambecc/earth, MIT.) |
| L5 | **Merivirrat** | NASA/NOAA OSCAR (julkinen) | sama moottori kuin L4 | +2 pv L4:n päälle | Golfvirta ja Humboldt selittävät ilmaston ja kalastuksen. |
| L6 | **Mannerlaatat ja tuliperäisyys** | Bird 2003 / fraxen (ODC-BY), USGS (julkinen) | d3-geo + Turf | 3–4 pv | Laattojen rajat, järistykset ja tulivuoret samalla kartalla — Tulirengas näkyväksi. Kytkeytyy katalogin F1:een ja F4:ään. |
| L7 | **Historialliset rajat vuosi kerrallaan** | **OpenHistoricalMap (ODbL)** | MapLibre tai oma SVG | 6–10 pv | Aluelinssin (Kiinan dynastiat, Napoleon) datapohja **ilman GPL-ongelmaa** — ks. luku 8, tämä on ainoa löytynyt kelvollinen lähde. |
| L8 | **Kielet** | Glottolog 5.3 (CC BY 4.0) | d3-geo + Turf | 3–4 pv | 8000 kieltä pisteinä, kielikunnat väreinä; napautus kertoo puhujamäärän. Kytkeytyy Raamatun ideaan "kielten leviäminen". |
| L9 | **Väestö ja kaupungistuminen** | Kontur/GHSL (CC BY 4.0, varmistettava) | deck.gl `HexagonLayer` tai rasteri | 4–6 pv | Missä ihmiset ovat — ja miten se on muuttunut 1873:sta. |
| L10 | **Ilmasto (Köppen)** | Beck ym. 2018 (CC BY 4.0) | rasteroitu linssi | 3 pv | Jo suunniteltu (`linssit.md` 2. luvun esimerkki); data on valmis ja lisenssi kunnossa. |
| L11 | **Aikavyöhykkeet ja "80 päivässä"** | Natural Earth / IANA tz (julkinen) | d3-geo | 2 pv | Foggin päivä, jonka hän voitti päivämääräraja ylittäessään — pelin oma tarina kartalla. |
| L12 | **Isoisän kartat päällekkäin** | IIIF-kirjastot (kartan oma lisenssi) | Allmaps + OpenSeadragon | 3–5 pv | Aito 1870-luvun kartta liu'utettavana pelin kartan päällä. |
| L13 | **Sää nyt** | Open-Meteo (jo käytössä!) | tsParticles | 2 pv | Kaupunkiin saapuessa sataa, jos siellä sataa nyt. Data on jo pelissä (`js/saa.js`) — puuttuu vain hiukkaskerros. |

**Suosikit tästä joukosta:** L1 (halpa ja taianomainen), L13 (data on
jo pelissä), L2 (tarinallisesti vahvin), L7 (avaa jumissa olevan
aluelinssin).

---

## 8. Mitä EI kannata ottaa

**Lisenssi estää (perustuslain pilari 5: vapaat lisenssit):**

* **GSAP 3.15.0** — ei OSI-lisenssiä. npm-kentässä lukee *"Standard
  'no charge' license: https://gsap.com/standard-license"*. Käyttö on
  nykyään maksutonta myös kaupallisesti ja kaikki lisäosat ovat
  ilmaisia, mutta **lisenssi on Webflow'n oma, ei MIT/BSD**, ja se
  sisältää kilpailurajoituksen. Peli on avoimen lisenssin peli;
  Motion (MIT) ja anime.js (MIT) tekevät saman asian. **Ei.**
* **historical-basemaps (aourednik)** — LICENSE-tiedosto on
  **GPL-3.0**. Tämä on se ilmeisin historiallisten rajojen aineisto,
  ja se on nimenomaan se, jonka Raamattu käskee tarkistaa
  ("rajaaineiston lisenssi tarkistetaan ennen kayttoa"). **Tarkistettu:
  ei kelpaa.** Käytä OpenHistoricalMapia (ODbL).
* **CShapes 2.0** (rajat 1886–2019) — CC BY-**NC**-SA. Ei kaupalliseen
  peliin. **Ei.**
* **TypeIt 8.8.7** ja **Typed.js 3.0.0** (kirjoituskoneanimaatiot) —
  molemmat **GPL-3.0**. Sama efekti syntyy 20 rivillä omaa koodia,
  ja peli tekee sen jo (`js/aikajana.js` rivi kerrallaan luennan
  tahdissa). **Ei.**
* **Shepherd.js 15.3.0** ja **intro.js 8.5.0** (opastuskierrokset) —
  **AGPL-3.0**. Pelin oma opas (`js/opas.js`) riittää. **Ei.**
* **ScrollReveal 4.0.9** — GPL-3.0. **Ei.**
* **p5.js 2.3.2** — LGPL-2.1; teknisesti mahdollinen mutta turha
  raskas kerros sen päälle mitä peli jo osaa. **Ei.**
* **peaks.js** — LGPL-3.0. **Ei.**

**Lisenssi kelpaa, mutta ei kannata:**

* **Leaflet / OpenLayers** — pelilauta ei ole slippy map, vaan
  taideteos. Nämä toisivat mukanaan koko karttakäyttöliittymän, jota
  peli ei halua. (Poikkeus: Allmaps-liitännäinen 2.13 tarvitsee
  OpenLayersin — silloinkin vain vanhojen karttojen katseluun.)
* **Tone.js** — musiikki generoidaan etukäteen R2:een; 77 kt
  selainsynteesiä ei paranna sitä.
* **Howler.js** — peli tekee jo saman itse, iOS-kikat mukaan lukien.
* **Lottie / Rive** — mahtavia työkaluja **animaattorille**. Tässä
  projektissa ei ole animaattoria, joten ne olisivat tyhjä latausrasite.
  (Yksi poikkeus mainittu kohdassa 1.5.)
* **deck.gl** ensimmäisenä hiukkasratkaisuna — 459 kt ja toinen
  WebGL-konteksti. Kokeile tsParticles (43 kt) tai oma canvas ensin;
  ota deck.gl vasta jos mitattu tarve ylittää ne.
* **MapLibre GL** ennen kuin katutason kohdekartoista on päätös —
  268 kt makaisi käyttämättä.
* **Kirjaston lataaminen suoraan cdnjs/jsdelivr-osoitteesta
  tuotannossa** — kaikki kirjastot **R2:n `vendor/`-polkuun** kuten
  Globe.gl. Syyt: offline, palvelutyöntekijän välimuisti, ei
  kolmannen osapuolen saatavuusriskiä, ei ulkopuolista seurantaa.
  CDN-osoitteet tässä raportissa ovat **kokeiluja ja versiontarkistusta
  varten**, eivät tuotantoon.
* **Oman kamera-ajon, lyhtyliekin tai `js/sound.js`:n korvaaminen** —
  ne ovat pelin omaa ilmettä ja hiottu iOS:lle. Kirjasto ei tee niistä
  parempia, vain erilaisia.

---

## 9. TOP 10 Fablelle — priorisoitu

Järjestysperuste: **(pelaajan kokema hyöty) ÷ (koko + työmäärä + riski)**,
ja etusijalla se, mitä peli ei tee lainkaan.

| sija | palikka | koko (gz) | työ | miksi juuri tämä |
|---|---|---|---|---|
| **1** | **SunCalc 1.9.0** (BSD-2) | 3 kt | 0,5 pv + 2 pv linssi | Kolme kilotavua avaa neljä linssiä (yö/päivä, kuun vaiheet, auringonnousu, hämärä) ja rikastaa jokaista kaupunkilehteä yhdellä rivillä, joka sitoo isoisän päivämäärän taivaaseen. Halvin ja taianomaisin lisä koko listalla. |
| **2** | **StPageFlip 2.0.7** (MIT) | 10 kt | 2–3 pv | Matkakirja **kääntyy kuin kirja**. Yksi ele, joka kertoo mistä pelissä on kyse. Toimii nykyisillä DOM-sivuilla, paluu vanhaan on yksi lippu. |
| **3** | **d3-geo 3.1.1 + d3-geo-projection 4.0.0 + topojson-client** (ISC) | 36 kt yhteensä | 1 pv apuri | Ei näy pelaajalle suoraan, mutta **jokainen tuleva karttalinssi halpenee 1–2 päivää** ja isoisän reitit piirtyvät oikeina isokaarina. Tämä on infrastruktuuri, joka kannattaa asentaa ennen seuraavaa linssiä, ei sen jälkeen. |
| **4** | **tsParticles slim 4.4.0** (MIT) | 43 kt | 2 pv | Sade, lumi, savu, tomu, kimallus. Sään data on jo pelissä (`js/saa.js`) — puuttuu vain kerros, joka näyttää sen. Antaa myös virtalinssille sen hiukkasmoottorin, jonka Raamattu jo lupaa. |
| **5** | **Tuna 1.1.3** (MIT) | 10 kt | 1–2 pv | Megafoni kuulostaa megafonilta, radio rätisee, luola kaikuu. Web Audio -efektiketjut ovat päivien käsityö; tämä on rivi koodia. Sopii suoraan siirtomaalinssin kuulutuksiin ja radiolinssiin. |
| **6** | **Vivus 0.4.6 + Rough.js 4.6.6 + rough-notation 0.5.1** (MIT) | 15 kt yhteensä | 1–2 pv | **Ilmepaketti.** Muste piirtyy, viivat heiluvat käsin piirretyn tavoin, pöllön korostus on kynällä ympyröity. Halvin tapa nostaa koko pelin visuaalista tasoa ilman että mikään rakenne muuttuu. |
| **7** | **Motion 13.2.0** (MIT) | 45 kt | 1 pv kokeilu | Keskeytettävät, kelattavat sekvenssit selaimen omalla WAAPI:lla. Aloita **yhdestä** paikasta (fokusvirran korttien saapuminen); jos tuntuma paranee, laajenna. Jos ei, poista — riski on nolla. |
| **8** | **Observable Plot 0.6.17** (ISC) | 67 kt | 1–2 pv | Maalehtien ja `js/saa.js`:n kuvaajat ilman käsityötä; avaa lavalinssin "kaupungin kasvu kerros kerrokselta", jonka omistaja tilasi 26.8. |
| **9** | **Hyphenopoly 6.1.0** (MIT) | 4 kt | 0,5 pv | Suomen tavutus tasattuihin palstoihin. **Mittaa ensin**, riittääkö `hyphens: auto`; jos ei, tämä on neljä kilotavua. |
| **10** | **three-globe 2.45.2 + camera-controls 3.1.2 + postprocessing 6.39.4 + troika-three-text** (MIT/Zlib) | ~580 kt yhteensä | 5–8 pv | **Pallon toinen vaihe:** maanosien nimet, sulava sukellus yhtenä liikkeenä, hehku ja filmirakeisuus. Iso urakka ja vaatii importmapin + Globe.gl:n vaihdon three-globeen (jottei three.js:ää ole kahta kopiota) — mutta juuri tämä tekee pallosta pelin, ei demon. **Aloita vasta kun 1–9 ovat pöydällä.** |

**Yhteenveto sijoista 1–6:** 117 kt pakattuna, noin 9 työpäivää, ja
niissä on yö ja päivä kartalla, kirjan sivunkääntö, sade ikkunassa,
megafoni, musteviiva ja käsin piirretty ilme. Se on paras
tuotto/panos-suhde, joka tästä kartoituksesta löytyi.

---

## 10. Ennen kuin mitään otetaan käyttöön

1. **Fable kirjaa Raamattuun** valitun palikan ja perustelun (uudet
   oleelliset linjaukset vain Raamattuun, omistajan linjaus 15.8.2026).
2. **Kirjasto R2:n `vendor/`-polkuun** ja `js/pallo.js`:n mallin
   mukainen laiska lataus + virhehaara. Repoon ei kirjastoja.
3. **Lisenssitiedosto mukaan** ämpäriin ja maininta pelin
   lähdesivulle (`js/lahteet.js`) — pilari 5 vaatii, ja MIT/BSD
   vaativat lisenssitekstin säilyttämisen jakelussa.
4. **iOS-mittaus ennen ja jälkeen** (kuvataajuus, muisti) jokaisesta
   WebGL- tai hiukkaslisäyksestä; `prefers-reduced-motion` sammuttaa.
5. **Linssisopimuksen rajat pätevät**: SVG-kerroksessa ei jatkuvia
   animaatioita eikä suodattimia — hiukkaset ja WebGL kuuluvat kartan
   *päälle* omaan kerrokseensa, kuten aikajanan kello.
6. **Yhden tiedoston versio** (`dist/`) jää ilman näitä, kuten se jää
   ilman linssejä — se on jo hyväksytty raja.

---

*Kartoituksen teki tutkijasessio 4.9.2026. Kaikki versionumerot,
lisenssit ja koot on haettu lähteestä samana päivänä; CDN-osoitteet on
testattu (HTTP 200). Raportti ei muuta yhtäkään pelin tiedostoa eikä
ole linjaus ennen Raamattu-kirjausta.*
