# Pallon vektoriviivat — rantaviivat ja rajat laattojen päälle pikselin levyisinä

*(Moduuli: karttapallo pelilautana (js/pallo.js, js/pallolauta/); tämä
dokumentti suunnittelee UUDEN moduulin js/pallovektorit.js, joka elää
laattakerroksen (docs/moduulit/pallon-liike-taydella-tarkkuudella.md,
erät E0–E5) rinnalla. Linjaukset: Raamattu › "PALLO LEVOSSA YHTA TERAVA
KUIN TASOKARTTA" ja sen lisäys "VEKTORIT SAMALLA" (omistaja 6.9.2026
ilta), "KYSYMYSKORTIT AINA" (5.9.2026: nimet ja rajat elävinä kuten
Google Earth), "FABLEMAX VAIN TARPEESEEN" (fablemax mittaa ja
suunnittelee, Opus-parvi toteuttaa). Tämä dokumentti kertoo MITEN —
ristiriidassa Raamattu voittaa. Laatija Fablemax 6.9.2026. SUUNNITELMA
JA TEHTÄVÄNANNOT: pelikoodia ei ole muutettu; mittari, aineistotyökalu ja
kokeilusivu ovat repossa (luku 9). Kaikki luvut on mitattu, ei arvattu;
mittausten rajoitukset luvussa 2.0.)*

## 0. Omistajan linjaus 6.9.2026 ilta, sanatarkasti

Fable ehdotti: *"rantaviivat ja nimet vektoreina laattojen päälle,
jolloin ne ovat aina tasan pikselin levyisiä"*, ja omistaja vastasi:

> "Tehdään se vektori juttu nyt samalla."

Aiemmin samana iltana: *"Tämä on pelin ehkä yksi keskeisimmistä
tekniikoista, niin käytetään siihen nyt kaikki resurssit, että saadaan
toimimaan."* ja *"Työn kestolla ei ole väliä, kunhan saadaan paras
mahdollinen lopputulos."* Ja 5.9.2026 kysymyskortilla: *"kaupunkien
nimet pallolaudalla ELAVINA tekstielementteina laattojen paalla (kuten
Google Earth: kuva laatoissa, nimet ja rajat elavina), laatoissa lisaksi
poltettuina varana"*.

Tavoite yhdessä lauseessa: **rantaviiva (ja maiden rajat) piirtyy
pallolle joka korkeudella ja joka hetki tasan tavoiteleveytensä
laitepikseleinä laattojen päällä, samalla musteella kuin poltettu viiva,
pisteiden ja nimien alla, eikä koskaan paksune tai sumene laatan mukana.**

## 1. Tiivistelmä ja suositus

1. **Poltettu rantaviiva on pohjalaatassa, ei viivatasolla** (tools/
   fokuskartta/piirto.js osio 7 "RANTAVIIVA": kaksi vetoa, 1,35 px:n
   muste rgba(58,40,25,0,9) ja 3,4 px:n usva rgba(74,52,33,0,20),
   paperivakiona joka tasolla; mitattu laatassa 1 px mediaani,
   laattapyramidi.md 6d). Viivataso (`viivat/z…`) sisältää reitit ja
   maiden rajat — sen voi jättää pallolla lataamatta yhdellä lipulla
   (js/pallo.js `lepokerroksenKerrokset` → `viiva: false`), mutta silloin
   katoaisivat myös reitit. Rantaviivan poisto pohjasta vaatii pohjan
   uusintapolton (4,2 h / 1,3 Gt). Päätös luvussa 4.5.
2. **Aineisto**: sama lähde kuin poltetulla viivalla — Natural Earth
   1:10m `ne_10m_ocean` samalla 0,006°:n harvennuksella
   (tools/fokuskartta/maailma.mjs meriRenkaat) ja sama
   rajaviivasto kuin viivatasolla (tools/fokuskartta/rajat-nykyiset.json.gz).
   Näin vektori osuu poltetun viivan päälle pikselilleen (mitattu
   luvussa 2.3), eikä reuna kaksinkertaistu levossa. Koko maailma
   täydellä tarkkuudella on 406 798 rantapistettä ja 72 815 rajapistettä
   eli **1,25 + 0,26 Mt** int16-deltakoodattuna ja gzipattuna; viidellä
   yksinkertaistustasolla ja 10°:n soluilla yksi näkymä lataa
   kymmeniä kilotavuja (luku 2.4). 1:50m ei riitä lähikuvaan (kärkiväli
   ~1 km = 2–4 px z7:llä) eikä osuisi poltetun viivan päälle.
3. **Toteutustapa**: three.js:n fat line (Line2/LineSegments2 +
   LineMaterial, leveys ruutupikseleinä varjostimessa) — luokat ovat jo
   Globe.gl:n nipussa (kirjasto rakentaa pathsDatan Line2:na), joten uutta
   kirjastoa ei tarvita eikä yhden tiedoston versio muutu. Yksi
   instanssoitu piirtokutsu solua kohti. Mittaukset luvussa 2.2:
   Globe.gl:n oma pathsData (yksi Line2 per viiva → sadat piirtokutsut)
   ja SVG-kalvo (kärkien projisointi joka kehys JavaScriptillä) hylätään
   luvuin; oma nauhavarjostin on Line2:n kanssa samaa tekniikkaa ja jää
   varapoluksi.
4. **Syvyysjärjestys ja horisontti** (mitattu, luku 2.3): viiva
   piirretään TÄSMÄLLEEN pinnan säteellä (nostettu viiva kulki
   lähikuvassa parallaksin takia 2–4 px poltetun vieressä), läpinäkyvien
   jonossa renderOrder −0,5:llä (laatat ja lepokerros ≤ −1, reitit 0,
   kalvot 1), ilman syvyyskirjoitusta, syvyystesti pallon pintaa vasten
   ja polygonOffset −12 (laattakerroksen −8:n edelle). Silloin viiva ei
   koskaan peitä pisteitä, nappulaa eikä reittejä (koepiste 0 kaikissa
   ajoissa), pallon takapuoli leikkautuu syvyystestillä, ja lepokerros
   (sama syvyyssiirto kuin E1:n laatoilla) ei syö viivaa (magentaa
   kerroksen kanssa / ilman 1,00–1,01). Opaakki viiva renderOrder 1:llä
   KATOSI lepokerroksen alle (1 px vs 4696) — kerros on transparent ja
   piirtyy kaikkien opaakkien jälkeen; sama koskisi E1:n häipyviä
   laattoja.
5. **Nimet eivät tarvitse muutosta**: kaupunkien nimet ovat jo CSS2D-
   elementtejä (js/pallolauta/nimet.js) DOM-kerroksessa WebGL:n päällä —
   ne ovat paperivakioita jo nyt. Laattoihin poltetut nimet ja nostot
   jäävät varana kuten omistaja 5.9. linjasi.
6. **Työ jaetaan eriin V0–V4** (luku 6): V0 aineistoputki ämpäriin, V1
   moduuli js/pallovektorit.js testeineen, V2 kytkentä pallolautaan ja
   vartija, V3 tyyli omistajan puhelimella (leveys, sävy, rajojen
   pistekuvio), V4 rantaviiva pois pohjalaatoista omalle tasolleen
   (omistajan päätös, samaan ajoon z8-polton kanssa). V0 ja V1 voivat
   alkaa heti E1:n rinnalla (eri tiedostot); V2 vasta E1:n mergen
   jälkeen.

## 2. Mittaukset

### 2.0 Miten mitattiin ja mitä luvut tarkoittavat

Mittari: `tools/savukkeet/mittaa-pallon-vektorit.mjs` (Playwright,
Chromium `/opt/pw-browsers/chromium`, ämpäri Noden fetchillä,
palvelutyöntekijä estetty). Kokeilusivu
`tools/kokeilut/pallon-vektorit/pallo.html` rakentaa PELIN OMAN pallon
(js/pallo.js rakennaPallo: laattamoottori, laatunosto, lepokerros,
napakannet — täsmälleen v1644:n koodi ilman peliä), lisää pallolaudan
kaupunkipisteet (pointsData, säde 0,03, korkeus 0,003) ja yhden CSS2D-
nimen, ja piirtää päälle rantaviivat ja rajat `tools/kokeilut/
pallon-vektorit/vektorit.js`:n neljällä tavalla kytkimen `?vektorit=`
takana. Aineisto tulee `tools/kokeilut/pallon-vektorit/tee-aineisto.mjs`:n
soluista. Puhelinkoko 390 × 844 dpr 3, työpöytä 1440 × 900 dpr 2;
CPU-hidastus 4× mittausjaksoilla. Kamera Ateenan ylle korkeuksiin 0,35
(omistajan kuvien näkymä), 0,08 (lähikuva) ja 2,5 (koko pallo);
panorointi 18,2° itään 4 s:ssa ja takaisin 8 s:ssa; zoom 2,5 → 0,05
logaritmisesti 8 s:ssa.

Mitat:

- **Vektoriviivan leveys** (laitepikseliä): `--vari=debug` piirtää viivan
  magentana, ja mittari laskee magentapikselien lyhyemmän
  vaaka/pystyjuoksun mediaanin, p75:n ja p90:n keskialueelta
  (60 % × 50 % kotelosta). Tämä on suora mitta viivan leveydestä.
- **Poltetun musteen leveys ja reuna**: samat mitat kuin
  mittaa-pallon-liike.mjs:ssä (luminanssi < 150 -juoksut; reunan FWHM).
- **Vuoto**: koko pallon näkymässä magentapikselit pallon kiekon
  ulkopuolella (viiva pistää horisontin yli) ja magentan kokonaismäärä
  (takapuolen leikkaus: vertailu `?syvyys=0`).
- **Koepiste**: kultainen levy rannikon kärjessä (Sounion) — magentaa
  levyn sisällä tarkoittaa, että viiva piirtyy pisteen PÄÄLLE.
- **Z-taistelu lepokerroksen kanssa**: magentan määrä lepokerroksen
  kanssa ja ilman; lepokerroksella on sama materiaali ja sama
  polygonOffset −8 kuin E1:n laattakerroksella.
- **Kehysajat, piirtokutsut, kolmiot**: rAF-välit ja renderer.info
  mittausjaksolla. HUOM: kontin Chromium piirtää ohjelmistorasteroijalla,
  joten absoluuttiset kehysajat eivät vastaa laitetta; niistä lukee
  vain tapojen keskinäisen suhteen ja JS-osuudet (paivitaMs, svgMs).

### 2.1 Poltettu rantaviiva laatoissa (nykytila)

| mitta | arvo | lähde |
| --- | --- | --- |
| muste | 1,35 px rgba(58,40,25,0,9), päällä 0,35 px:n rosoisuus; usva 3,4 px rgba(74,52,33,0,20) | piirto.js osio 7, PAPERI_S = 1 (generoi-laattapyramidi.mjs) |
| leveys laatassa | 1 px mediaani (L < 120) kaikilla tasoilla z0–z7 | laattapyramidi.md 6d |
| leveys ruudulla, puhelin dpr 3, levossa (lepokerros z7 1:1) | 1–2 px (muste mediaani 1, p75 2; reuna FWHM 2/4) | mittaa-pallon-liike 2.1 |
| leveys ruudulla, liikkeessä (Z5 venytettynä) | 8 px (muste), reuna 5/8 | mittaa-pallon-liike 2.1 |
| leveys ruudulla, työpöytä 2000 css-px lähin zoomi | z7 venyy 4,8× → 5–7 px sumea | Raamattu, PALLO LEVOSSA |
| geometria | ne_10m_ocean, harvennus 0,006° (piste ohitetaan, jos dlon ja dlat < 0,006), pyöristys 4 desimaaliin | maailma.mjs meriRenkaat |
| rajat viivatasolla | RAJATYYLI: 1,8 R rgba(96,74,46,0,52), pistekuvio 1,5 R / 3 R (R = reittiyksikkö, karttavakio) | maailmapiirto.js |

Rantaviiva on siis PAPERIVAKIO laatassa mutta KARTTAVAKIO ruudulla:
laatan venytys venyttää sen mukanaan. Vektoriviiva on paperivakio
ruudulla, eli Google Earthin tapa.

### 2.2 Toteutustavat — mitattu (puhelin 390 × 844 dpr 3, 4×, Ateena)

Viivan leveys laitepikseleinä (magentan lyhyemmän juoksun mediaani /
p75 / p90; ajot S1, S4, J, A ja T1). Viivan tavoite 1,5 laitepikseliä
piirtyy reunanpehmennyksen kanssa kahden pikselin juoksuina:

| näkymä (puhelin dpr 3) | poltettu muste ilman vektoreita (S2) | vektori 1,0 px (J) | vektori 1,5 px (S1/S4) | vektori 2,0 px (J) |
| --- | --- | --- | --- | --- |
| Ateena 0,35, levossa (Z8-laatat 0,74×) | 2 / 5 | 2 / 2 / 2 | 2 / 3 / 3 | 3 / 3 / 5 |
| lähikuva 0,08, levossa (lepokerros z7 venytettynä 2,5×) | **4 / 4** | 2 / 2 / 2 | 2 / 2 / 3 | 3 / 3 / 3 |
| koko pallo 2,5, levossa (taso 2, 10°:n solut) | 4 / 11 | 2 / 3 / 4 | 2 / 4 / 6 | 3 / 4 / 7 |
| Ateena 0,35, kesken panoroinnin (A, laatat Z8) | — | — | 2 / 3 / 3 | — |
| Ateena 0,35, kesken panoroinnin dpr 1 (T1, laatat Z5: muste 3 / 4 vs levossa 1 / 2) | 3 / 4 (T2) | — | 2 / 3 / 4 | — |
| zoomin portaat 1,0 / 0,35 / 0,1 / 0,05 dpr 1 (T1) | 2 / 1 / 1 / 2 (T2) | — | 2 / 2 / 2 / 2 | — |
| työpöytä 1440 × 900 dpr 2: Ateena / lähikuva / koko pallo (U1) | 1 / 3 / — (U2) | — | 2 / 2 / 2 (p90 4 / 3 / 5) | — |

**Vektoriviiva on sama leveys joka rivillä** — levossa, liikkeessä, zoomin
joka portaalla, puhelimella ja työpöydällä — kun poltettu muste vaihtelee
1:stä 4:ään ja liikkeessä Z5-laatoilla 8:aan (mittaa-pallon-liike 2.1).
Kuvat: `montaasi-line2-lepo-liike-zoom.png` (lepo | liike Z5 | zoom 0,05
| liike ilman vektoreita): liikkeessä poltettu rantaviiva on sulanut
sumeaksi vyöksi ja vektori on yhä terävä — juuri omistajan kuvaama vika
ja sen korjaus.

Hinta tapa tavalta (puhelin 390 × 844 **dpr 1**, CPU 4×, ajot T1–T5 ja T2
ilman vektoreita; kehysajat ohjelmistorasteroijalla — vain suhteet):

| tapa | piirtokutsut Ateena / koko pallo (oma osuus) | kolmiot Ateena | pano p50 / p95 (kehyksiä 4 s:ssa) | zoom p50 / p95 | oma JS per päivitys / per kehys | JS-keko Mt | koepiste (magentaa levyn sisällä) | z-taistelu lepokerroksen kanssa (magentaa kanssa / ilman) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ei vektoreita (T2) | 94 / 199 | 65 888 | **133 / 183 ms** (36) | 217 / 433 | — | 82–92 | 0 | — |
| **line2** (T1, korkeus 0) | 108 / 201 (+22 / +2) | 118 904 | 267 / 367 (18) | 283 / 2 033 ¹ | 0,3–0,6 ms / 0 | 89–92 | **0** | **0,999–1,014** |
| nauha (T3, oma varjostin, korkeus 0) | 108 / 201 (+22 / +2) | 83 560 | 283 / 450 (18) | 217 / 500 | 0,3 ms / 0 | 96–107 | 0 | **0,771** (kerros syö 23 %) |
| polut (T4, Globe.gl pathsData) | **657 / 9 190** (+1 923 / +13 917) | 103 784 | 333 / 617 (15) | **2 533 / 3 667** | 0,4 ms / 0 | **202–243** | 0 | 1,001 |
| svg (T5, kalvo, kärjet joka kehys) | 94 / 199 (+0) | 65 888 | 200 / 283 (23) | 533 / 1 083 | — / **21–69 ms** (4×:llä 85–275) | 99–112 | **8** (DOM piirtyy pisteiden päälle) | 1,011 |

¹ Yksi hidas kehys tason vaihdossa (max 2 033), sama ilmiö kuin
kirjaston laattamoottorilla; p50 sama kuin ilman vektoreita.

Vektorikerroksen omat pyynnöt ja tavut koko ajossa (kolme näkymää +
panorointi + zoom): T1 62 pyyntöä / 1,29 Mt Float32-muodossa (delta-gzip
noin 40 %: ~0,5 Mt); dpr 3 S1 164 pyyntöä / 1,73 Mt, koska taso 4 tulee
käyttöön jo Ateenan näkymässä (tarve 135 px/° > 125). Kaikki vuoden
välimuistissa versiopolussa.

Työpöytä 1440 × 900 dpr 2 (U1 vs U2): Ateena 0,35 valitsee tason 3
(51 solua, 37 813 janaa), piirtokutsut 491 vs 455, kolmiot 210 244 vs
62 032, keko 95 vs 87 Mt; leveys 2 / 3 / 4 levossa ja 2 / 3 / 4 kesken
panoroinnin; poltettu 2 / 3 levossa ja **4 / 5** zoomin portaalla 0,05
(vektori 2 / 2 / 3). Kuvat `montaasi-tyopoyta-lahi.png` (ilman | oikea
väri | magenta).

### 2.3 Syvyysjärjestys, horisontti ja lepokerros (line2, puhelin)

| koe | tulos | johtopäätös |
| --- | --- | --- |
| Opaakki viiva, renderOrder 1, ei syvyyskirjoitusta (koe2) | lepokerroksen kanssa **1** magentapikseli, ilman 4 696 | lepokerros on `transparent: true` (häive) ja piirtyy KAIKKIEN opaakkien jälkeen; syvyyttä kirjoittamaton viiva jää sen alle. Sama kävisi E1:n häipyville laatoille. |
| Läpinäkyvien jono, renderOrder −0,5, polygonOffset −12, korkeus R·1,001 (koe3, S1, A) | kerroksen kanssa / ilman 4 802 / 4 795 (1,001); 14 620 / 14 621 | ei z-taistelua lepokerroksen (offset −8, sama kuin E1) kanssa. |
| Sama, korkeus 0 = pinnan säde (S4, T1) | 15 454 / 15 243 (1,014); 4 923 / 4 927 (0,999) | polygonOffset −12 riittää yksin — viivaa ei tarvitse nostaa. |
| **Parallaksi** nostetulla viivalla (S1 vs S4, `montaasi-korkeus.png`) | korkeus 0,001 (0,1 yksikköä): viiva kulkee lähikuvassa 2–4 laitepikseliä poltetun viivan VIERESSÄ ruudun laidoilla (0,1 / 8 yksikön etäisyys × 300 px = 3,75 px, laskettu ja nähty); korkeus 0: viiva kulkee poltetun päällä | VEKTORIT_KORKEUS = 0 — sama oppi kuin lepokerroksen "hyppy" v1641:ssä (LEPOKERROS_KOROTUS 1). |
| Koepiste (kultainen levy rannikon kärjessä, säde 5 css-px) | line2 / nauha / polut: magentaa levyn sisällä **0** kaikissa ajoissa (puhelin ja työpöytä); svg: 8 | WebGL-viiva jää pisteiden alle (opaakit piirretään ennen läpinäkyviä); SVG-kalvo on DOM ja piirtyy kaiken päälle — myös nappulan. |
| Nimet (CSS2D) | DOM-kerros, aina WebGL:n päällä (kuvat) | ei muutosta nimiin. |
| Horisontti: magentaa kiekon ulkopuolella koko pallon näkymässä | dpr 1: 26 / 23 790 px; dpr 3: 28–63 / 64 578 (≤ 0,1 %); syvyys=0 (T6/G): 14–104 | viiva pistää limbin yli puolen leveytensä verran, kuten Google Earthissä. Takapuolen leikkaa syvyystesti pallon pintaa vasten (kuva `debug-syvyys0-maailma.png`: ilman testiä takapuolen viivat kuultavat pinnan läpi); tästä kulmasta takapuolella on Tyynimeri, joten pikselimäärä ei erottele — vartija mittaa T6:n kulmasta lng −60. |
| Läpinäkyvien jono vs reitit | reitit renderOrder 0 ja korkeus 0,002 piirtyvät viivojen (−0,5) jälkeen ja päälle | sopimus luvussa 4.3. |
| Napakannet | opaakit R·1,0015 peittävät viivan 83,7°:n yläpuolella | ei rantaviivaa napojen täytteen päällä. |

Väri (tummimman kymmenyksen keskiarvo tummista pikseleistä, dpr 3):
poltettu muste levossa Ateena (26,16,8) — luku sisältää laattoihin
poltettujen nimiöiden musteen — ja lähikuva (59,48,35); vektori
rgb(58,40,25) @ 0,9 mitattuna (40,27,16) ja (45,30,18). Silmällä
(`montaasi-oikea-ateena-dpr3.png`, ilman | oikea väri): vektori
piirtyy Ateenan näkymässä **selvästi poltettua raskaampana**, koska
poltettu viiva on siinä näkymässä laatan 0,74×-pienennöksen läpi 1–2 px
ja vaalentunut, vektori 1,5 px täydellä musteella. Leveys ja peitto
ovat V3:n omistajapäätös (ehdokkaat 1,0 px @ 0,9 ja 1,5 px @ 0,7).
Rajojen pistekuvio (S5, `dashed` + katko maailmayksikköinä): piirtyi
ilman virhettä, mutta magentan määrä ei eronnut yhtenäisestä (45 334 vs
45 270) — kuvio on z7:n mitassa alle pikselin ja vaatii V3:ssa
silmämääräisen vedoksen.

### 2.4 Aineisto: pisteet, koot ja tasot

`tools/kokeilut/pallon-vektorit/tee-aineisto.mjs` (lähteet: ne_10m_ocean
harvennettuna kuten pyramidissa; rajat-nykyiset.json.gz). Douglas–Peucker
toleranssilla tol (asteina); solu 10° syvillä tasoilla, koko maailma
yhtenä soluna karkeilla (tol ≥ 0,03°).

| laji | taso k | tol (°) | 0,5 px:n tarkkuus tasolle (px/aste ≤ 0,5/tol) | solu | soluja | pisteitä | Float32 raaka | int16-delta | delta + gzip |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rannikko | 0 | 0,1 | z0–z2 (≤ 5 px/°) | maailma | 1 | 31 595 | 271 kt | 171 kt | 127 kt |
| rannikko | 1 | 0,03 | z3–z4 (≤ 17 px/°) | maailma | 1 | 74 655 | 607 kt | 339 kt | 280 kt |
| rannikko | 2 | 0,008 | z5 (≤ 62 px/°) | 10° | 378 | 178 874 | 1 453 kt | 772 kt | 638 kt |
| rannikko | 3 | 0,004 | z6 (≤ 125 px/°) | 10° | 378 | 256 224 | 2 058 kt | 1 074 kt | 854 kt |
| rannikko | 4 | 0 (lähde) | z7+ (240 px/°) | 10° | 378 | 406 798 | 3 234 kt | 1 662 kt | 1 254 kt |
| rajat | 0 | 0,1 | | maailma | 1 | 16 921 | 163 kt | 127 kt | 91 kt |
| rajat | 1 | 0,03 | | maailma | 1 | 20 990 | 195 kt | 143 kt | 105 kt |
| rajat | 2 | 0,008 | | 10° | 128 | 33 644 | 299 kt | 197 kt | 155 kt |
| rajat | 3 | 0,004 | | 10° | 128 | 44 730 | 386 kt | 240 kt | 188 kt |
| rajat | 4 | 0 (lähde) | | 10° | 130 | 72 815 | 605 kt | 350 kt | 263 kt |

Lähteiden raaka kärkimäärä: ne_10m_ocean 446 789 (10,2 Mt GeoJSON),
ne_10m_coastline 410 957, ne_50m_coastline 60 416 (1,6 Mt),
ne_110m_coastline 5 128; rajat 10m 77 295 → 72 815 harvennettuna.

Natural Earth 1:50m riittäisi kokoon (60 000 pistettä) mutta EI
tarkkuuteen eikä yhteensopivuuteen: 50m:n kärkiväli on noin 1 km eli
2–4 px z7:llä (240 px/aste = 460 m/px), kulmikkuus näkyisi lähikuvassa,
ja ennen kaikkea 50m-viiva ei kulje poltetun 10m-viivan päällä — reuna
kaksinkertaistuisi kaikkialla (generoi-maapolygonit.mjs mittasi 50m vs
10m eron: mediaani 0,46, max 1,43 lautayksikköä = 0,5–1,5 px z7:llä).
1:10m samalla harvennuksella on siis ainoa oikea lähde; sen koko (1,25
Mt koko maailma) on pienempi kuin yksi z7-laattarivi.

Solu 10° täydellä tasolla on keskimäärin 4,4 kt (delta, pakkaamaton);
Ateenan lähikuva (korkeus 0,08) tarvitsee 4–8 solua, saapumisnäkymä
(0,35, taso 2) 22 solua ≈ 45 kt. Yleiskuva lataa kerran koko maailman
tason 0 tai 1 (127–280 kt gzipattuna). Kaikki laatat ovat vuoden
välimuistissa versioidussa polussa kuten pyramidin laatat.

## 3. Vaihtoehdot ja hylkäykset

| vaihtoehto | mitattu (luku 2.2) | päätös |
| --- | --- | --- |
| (a) Globe.gl pathsData (`polut`) | leveys on ruutupikseleitä (kirjasto rakentaa Line2:n) ja terävä, MUTTA yksi Line2 per viiva: 1 923 piirtokutsua Ateenan näkymässä ja 13 917 koko pallolla (9 190 kehyksessä), zoom p50 2 533 ms vs 217, JS-keko 243 vs 82 Mt, jokainen solunvaihto rakentaa kerroksen uudestaan `pathsData`-tweenin läpi. | HYLÄTÄÄN. Kirjaston polkukerros on tehty kymmenille reiteille, ei tuhansille rannoille. |
| (b) three.js Line2 / LineSegments2 (`line2`) | luokat luetaan Globe.gl:n nipusta elävän polkuolion kautta — ei uutta kirjastoa, ei vendor-vientiä, dist ennallaan; yksi instanssoitu piirtokutsu solua kohti (+22 Ateenassa, +2 koko pallolla); leveys 2 / 3 / 3 joka tilassa; z-taistelu 1,00; koepiste 0; pano p50 267 vs 133 ms ohjelmistorasteroijalla (rasteroija maksaa fat linen 6 kolmiota × jana CPU:lla; näytönohjaimella työ on murto-osa — mitataan omistajan puhelimella V2:ssa). | **VALITAAN.** |
| (c) oma nauhageometria + varjostin (`nauha`) | sama leveys ja sama piirtokutsumäärä kuin (b), 4 kärkeä janaa kohti (kolmiot 83 560 vs 118 904), pano p50 283 — ei nopeampi; z-taistelu lepokerroksen kanssa 0,771 (oma varjostin ei toteuta LineMaterialin syvyyskäsittelyä: trimSegment, perspektiivikorjattu offset), ei katkoviivaa, ei alphaToCoverage. | VARAPOLKU, ei ensisijainen: sama tekniikka vähemmällä kypsyydellä. Jää kokeiluun (tools/kokeilut) dokumentoituna. |
| (d) SVG-kalvo (`svg`) | leveys terävä (non-scaling-stroke), mutta kärkien projisointi joka kehys 21–69 ms JavaScriptiä ilman hidastusta (85–275 ms 4×:llä) = pääsäie täynnä liikkeessä; kalvo on DOM ja piirtyy pisteiden, nappulan ja kaikkien WebGL-merkkien PÄÄLLE (koepiste 8); horisontti leikattava käsin. | HYLÄTÄÄN. Sama syy kuin bittikarttalinjauksessa: elävä vektoripiirto pääsäikeessä. |
| Aineisto Natural Earth 1:50m | 60 416 pistettä (1,6 Mt GeoJSON) — kevyt, mutta kärkiväli ~1 km = 2–4 px z7:llä ja eri geometria kuin poltettu 10m-viiva (50m vs 10m mediaaniero 0,46, max 1,43 lautayksikköä) | HYLÄTÄÄN: kaksoisreuna kaikkialla. |
| Aineisto NE 1:10m ilman harvennusta (446 789 pistettä) | +10 % pisteitä 0,006°-harvennukseen nähden, mutta EI osu poltettuun viivaan pikselilleen | HYLÄTÄÄN: sama harvennus kuin pyramidissa on ainoa yhteensopiva. |
| Yksinkertaistus lennossa Workerissa | DP koko maailmalle on 1,5 s Nodessa; tasot ovat kokonaisuudessaan 3,3 Mt gzipattuna | HYLÄTÄÄN: esilasketut tasot ämpärissä ovat halvempia kuin Worker ja välimuisti, ja solut mahdollistavat osittaisen latauksen. |
| Koko maailma kerralla vs solut | koko maailma täydellä tasolla 1,25 Mt gzipattuna + 406 798 janan geometria (10 Mt GPU) | Solut 10° syvillä tasoilla (Ateena 8–22 solua, 4–45 kt), koko maailma yhtenä tasoilla 0–1 (127–280 kt): yleiskuva lataa kerralla, lähikuva vain näkyvän. |
| Rantaviiva pois pohjalaatoista | ks. luku 4.5 | (ii) heti, (i) z8-polton kanssa. |

## 4. Valittu ratkaisu: js/pallovektorit.js

### 4.1 Idea yhdellä sivulla

Pallon pinnan päälle tulee KOLMAS kerros laattojen (E1) ja pelin
merkkien väliin: rantaviivat ja maiden rajat instanssoituina
"fat line" -janoina (three.js LineSegments2 + LineMaterial), joiden
leveys lasketaan varjostimessa ruutupikseleinä (`worldUnits: false`,
`resolution` = kotelon koko css-pikseleinä, `linewidth` = tavoiteleveys
laitepikseleinä / pikselisuhde). Viiva on siis paperivakio ruudulla:
sama leveys joka korkeudella, liikkeessä ja levossa, kuten CSS2D-nimet.
Geometria on sama kuin poltetulla viivalla (Natural Earth 10m,
harvennus 0,006°), joten levossa vektori kulkee poltetun viivan päällä
pikselilleen ja liikkeessä/zoomissa se pysyy terävänä, vaikka laatta
venyy.

Kerros on OMA MODUULI `js/pallovektorit.js`, jolla on yksi kahva ja
joka ei koske Globe.gl:n kerroksiin (pathsData, pointsData) eikä
laattakerroksen tiedostoihin (js/pallolaatat.js, js/pallo.js
rakennaPallo/kytkeLaatunosto). Kytkentä tehdään pallolaudassa
(js/pallolauta/lauta.js) kuten linssimoottori ja merkit.

### 4.2 Algoritmi (pseudokoodi, vakiot)

```
luoPallovektorit({ pallo, kotelo, ikkuna, reitit })  → { paivita, mittarit, pura, valmis }
  luokat  = line2Luokat(pallo, reitit)         // Line2/LineSegments2/LineSegmentsGeometry/LineMaterial
                                               // yhden nollamittaisen polun kautta (reitit.aseta('vektorit', …)),
                                               // poistetaan heti; ei uutta kirjastoa
  luettelo = fetch(<R2>/julisteet/pallo/vektorit/<VERSIO>/luettelo.json)
  materiaalit: rannikko = LineMaterial({ color: RANTA_MUSTE, opacity: RANTA_PEITTO, linewidth, transparent: true,
                depthWrite: false, depthTest: true, polygonOffset: true, polygonOffsetUnits: VEKTORIT_SYVYYSSIIRTO })
               rajat    = sama + dashed (katko maailmayksikköinä = karttavakio), RAJA_MUSTE, RAJA_LEVEYS

paivita(pov)                                   // controls 'change' + resize, jarru 60 ms; levossa ei mitään
  tahdista: linewidth = LEVEYS_LAITEPX / renderer.getPixelRatio(); resolution = (W, H)
  alue     = 7 × 7 näytettä ruudulta säde–pallo-leikkauksella (oma, ei kirjaston toGlobeCoords:
             se säteenjäljittää koko scenen, mitattu 585 ms) → lepokerroksenAlue(naytteet, pov.lng, { vara: 1° })
  tarve    = laitepikseliä/aste ruudun keskellä (40 px:n mittamatka, sama kuin lepokerroksella)
  k        = matalin taso, jonka toleranssi × tarve ≤ TERAVYYS_PX (0,5)   // tasot: 0,1 / 0,03 / 0,008 / 0,004 / 0
  solut    = luettelon solut (10°; tasoilla 0–1 koko maailma yhtenä), jotka leikkaavat alueen (sauman yli kierrettynä)
  jokaiselle (laji, k, solu): jos ei muistissa → fetch .bin (int16-delta) → janat xyz säteelle R (KORKEUS 0)
                              → LineSegmentsGeometry.setPositions → LineSegments2(materiaali) → juuri.add, visible = false
  näkyvät = tarvittavat; muut visible = false; LRU purkaa vanhimmat, kun soluja > SOLUKATTO (160)
  rajat näkyvissä vain kun tarve ≥ RAJAT_PX_ASTE (30 px/°, maanäkymästä sisäänpäin) — karkeilla tasoilla
  pistekuvio olisi tiheämpi kuin ruutu; omistaja päättää V3:ssa
  häive: solun materiaali kloonataan ja opacity 0 → tavoite 260 ms ease-out (reduced motion 0) — KAIKKI LIIKE ANIMOIDAAN
```

Vakiot (export, nimet täsmälleen): `PALLOVEKTORIT_VERSIO` (ämpärin
kansio), `VEKTORIT_LEVEYS_LAITEPX = 1.5`, `VEKTORIT_RAJA_LEVEYS_LAITEPX =
1.2`, `VEKTORIT_KORKEUS = 0` (TÄSMÄLLEEN pinnan säteellä — nostettu viiva
kulki lähikuvassa parallaksin takia 2–4 px poltetun viivan vieressä,
luku 2.3; järjestys hoidetaan syvyyssiirrolla kuten lepokerroksella),
`VEKTORIT_SYVYYSSIIRTO = -12` (laattakerroksen −8:n edelle), `VEKTORIT_RENDER_ORDER = -0.5` (laatat ja lepokerros ≤ −1,
reitit 0, kalvot 1), `VEKTORIT_TERAVYYS_PX = 0.5`, `VEKTORIT_JARRU_MS =
60`, `VEKTORIT_HAIVE_MS = 260`, `VEKTORIT_SOLUKATTO = 160`,
`VEKTORIT_RAJAT_PX_ASTE = 30`, `RANTA_MUSTE = '#3a2819'` (rgb 58,40,25 =
poltetun viivan muste), `RANTA_PEITTO = 0.9`, `RAJA_MUSTE = '#604a2e'`
(96,74,46), `RAJA_PEITTO = 0.52`, `RAJA_KATKO_YKS = [0.011, 0.022]`
(1,5 R piste / 3 R väli z7:n R:llä maailmayksikköinä).

Puhtaat, testattavat funktiot (export): `vektoritaso(lodit, tarve,
teravyys)`, `vektorisolut(alue, solu)` (sauman yli), `puraDelta(buf)`
(int16-delta → viivat), `vektorijanat(viivat, sade)` (Float32 xyz-parit),
`pinnanPiste(kamera, x, y, W, H, R)` (säde–pallo-leikkaus).

### 4.3 Rajapinnat muihin kerroksiin

| Kerros | Vaikutus | Mitä EI saa muuttaa |
| --- | --- | --- |
| Laattakerros E1 (js/pallolaatat.js) ja lepokerros | Ei muutosta: laatat säteellä R, offset −8, renderOrder −10+z (opaakit häiveen jälkeen). Vektorit samalla säteellä R, offset −12, läpinäkyvien jono −0,5 → aina laattojen päällä, myös häipyvien (mitattu 1,00–1,01). | E1:n vakioita, rakennaPallo, kytkeLaatunosto. |
| Pisteet, helmet, nappula, kohteet (lauta.js, merkit.js) | Ei muutosta: opaakit renderOrder 0 piirretään ENNEN läpinäkyviä; vektori ei kirjoita syvyyttä eikä koskaan peitä niitä (koepiste: magentaa levyn sisällä 0). | Säteitä, renderOrdereita. |
| Reitit (reitit.js, Line2 transparent, renderOrder 0, korkeus 0,002) | Piirtyvät vektorien jälkeen ja päälle. Osarekisteriin lisätään hetkeksi osa `vektorit` (nollamittainen polku luokkien lukemiseksi) ja poistetaan heti. | Reittien mittoja; reittiviivan väriä. |
| CSS2D-nimet (nimet.js) | Ei muutosta: DOM-kerros WebGL:n päällä. | — |
| Linssikalvot (linssit.js, R·1,0015, renderOrder 1) | Piirtyvät vektorien jälkeen: kalvo sävyttää viivat kuten laatatkin. | Kalvon sädettä. |
| Napakannet (R·1,0015, opaakit) | Peittävät vektorit 83,7°:n yläpuolella (syvyystesti) — ei rantaviivaa napojen täytteen päällä. | — |
| sw.js SHELL | `./js/pallovektorit.js` pallolauta-rivien viereen. Vektoriaineisto kulkee HTTP-välimuistissa (immutable, versio polussa), ei koriin. | LAATTACACHE. |
| build-standalone MODULES | Ei muutosta: pallovektorit.js on laiskan rajan takana kuten pallo.js. | — |
| Tallennus, pelitila | Ei muutosta. | — |
| Kytkin | `?vektorit=0` (location.search moduulin omassa apurissa, EI js/ui-apurit.js:ssä, jota E3 muuttaa) ja `PALLOVEKTORIT_OLETUS = true`. | — |

### 4.4 Riskit ja perääntyminen

| Riski | Todennäköisyys | Vastatoimi |
| --- | --- | --- |
| Viiva pistää horisontin yli puolen leveytensä verran | varma, mitattu 47–63 px koko pallon näkymässä 23 807 magentapikselistä (0,2–0,3 %) | Sama kuin Google Earthissä; ilmakehän hehku peittää. Jos häiritsee: varjostimen häive limbillä (ei tässä). |
| Koko pallon näkymässä tason 1 viivat sulautuvat läiskiksi (p90 6 px) | tiheillä rannikoilla | Taso 0 (0,1°) yleiskuvaan: TERAVYYS_PX 0,5 → yleiskuvassa 1,0 (kuten LAATU_TERAVYYS_KAUKO); V3 säätää. |
| Kaukana kaupunkipiste (0,3 yks.) häviää viivalle (offset −12 × syvyysaskel > 0,3, kun korkeus > ~1,2) | kosmeettinen, piste on silloin 1–2 px; koepiste 0 kaikissa mitatuissa näkymissä (0,08–2,5) | Hyväksytään; vaihtoehto offset −9. |
| Vektori on Ateenan näkymässä poltettua viivaa raskaampi (1,5 px täysi muste vs 0,74×-pienennetty laatta) | varma, nähty `montaasi-oikea-ateena-dpr3.png` | V3: leveys 1,0 tai peitto 0,7 omistajan valinnalla; vakiot. |
| Lähikuvassa poltettu viiva (venytetty 2,5×, 4 px) on vektoria leveämpi | varma, mitattu | V4 (pohja ilman rantaviivaa) — vasta z8-polton kanssa. |
| Natural Earthin master-haara muuttuu → vektori ei enää osu poltettuun viivaan | matala (10m-rannikko vakaa vuosia) | V0 kirjaa luetteloon lähdetiedoston SHA-256:n; generoi-pyramidi.yml hakee saman URL:n (havainto: kumpikaan ei ole kiinnitetty tagiin). |
| Line2-luokkien luku nollamittaisen polun kautta rikkoutuu kirjaston päivityksessä | matala (2.46.2 vendorissa, versio polussa) | Vara: oma nauhavarjostin (luku 3, kokeilussa toimiva) ShaderMaterial-luokalla; jos luokkia ei saada, kerros jää pois eikä kaada palloa (mittarit.syy). |
| Puhelimen muisti: 160 solua × (24 B/jana) ≤ 10 Mt + 8 kt:n perusgeometria/solu | matala | SOLUKATTO vakiona; kaikki solut yhdessä materiaalissa per laji (kloonit vain häiveen ajan). |
| Perääntyminen | — | `?vektorit=0` ja `PALLOVEKTORIT_OLETUS`; kerros on oma moduuli, jonka voi jättää luomatta yhdellä rivillä lauta.js:ssä. |

### 4.5 Poltettu rantaviiva laatoissa — kolme vaihtoehtoa, päätös

| vaihtoehto | mitä | hinta | ulkoasu |
| --- | --- | --- | --- |
| (i) pohja ilman rantaviivakerrosta | viiva on POHJASSA (piirto.js osio 7), ei viivatasolla → uusi täysi pohja-ajo (4,2 h yhdellä säikeellä / ~50 min viidellä agentilla, 1,3–1,5 Gt) ja tasokartalle rantaviiva omalle läpinäkyvälle tasolleen (uusi `ranta/z…`, ~40 Mt) | suurin | puhtain: vain vektori, ei usvaa laatan alla |
| (ii) vektori peittää poltetun | ei polttoa; vektori 1,5 px samasta geometriasta poltetun 1,35 px:n päällä | 0 | levossa 1:1 sama viiva (luku 2.3); zoomissa z7:n yli poltettu viiva sumenee usvaksi vektorin alle (luku 2.2, korkeus 0,05) |
| (iii) viivataso lataamatta pallolla | `lepokerroksenKerrokset` viiva: false | 0 | EI ratkaise rantaviivaa (se ei ole viivatasolla) ja kadottaa reitit — hylätään |

PÄÄTÖS: (ii) heti (V1–V3) ja (i) OMISTAJAN PÄÄTÖKSELLÄ samaan ajoon
z8-polton kanssa (Raamattu: "aidosti tarkempi lähikuva vaatii pyramidin
z8-tason polton — omistajan päätös"). Perustelu: pohja on poltettava
uudestaan joka tapauksessa z8:aa varten, ja rantaviivan siirto omalle
tasolleen samassa ajossa on 0 lisätuntia; erillisenä ajona se olisi
4 h ja 1,3 Gt pelkän usvan takia. Tasokartta pysyy ennallaan: se lataa
uuden rantatason laattojen päälle (pohja → ranta → viiva → nosto), joten
sen kuva ei muutu tavullakaan. Maiden rajat: poltettu pisteviiva on
karttavakio ja katoaa kauempaa itsestään; lähellä vektoriraja kulkee sen
päällä samasta datasta. Jos kaksoisreuna näkyy V3:n puhelinkatselmissa,
viivataso poltetaan `--eirajat`-lipulla (9 min) — lippu lisätään V4:ssä.

### 4.6 Nimet

Kaupunkien nimet ovat jo eläviä CSS2D-elementtejä (js/pallolauta/
nimet.js, ladonta ruutuavaruudessa) — paperivakio, ei muutosta.
Laattoihin poltetut nimet (nostotaso) ja maastonimet jäävät varana
(omistaja 5.9.2026) ja sumenevat laatan mukana kuten ennenkin; niiden
siirto eläviksi on oma päätös (Raamattu, NOSTON RUUTUKATTO "avoin
jatkokysymys").

## 5. Todennus lukuina (mittari valmis)

`NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-vektorit.mjs
--aineisto=<kansio> --tapa=<line2|peli> --vari=debug --nakyma=puhelin`
(ja `--nakyma=tyopoyta`, `--dpr=1` kehysmääriin) kirjoittaa JSON-raportin
ja kuvat. Hyväksymisrajat V2:lle (`--vartio` toteutetaan V2:ssa):

| mitta | ennen (ilman vektoreita) | vaadittu V2:n jälkeen |
| --- | --- | --- |
| Vektoriviivan leveys (magentan mediaani / p90), puhelin dpr 3: Ateena 0,35, lähikuva 0,08, kesken panoroinnin, zoomin portaat 1,0 / 0,35 / 0,1 / 0,05 | poltettu muste 1–4 / 5–11 px tilan mukaan | **kaikissa 2 / ≤ 4 px** (1,5 laitepikseliä + reunanpehmennys; koko pallon näkymässä p90 ≤ 6) — sama luku joka rivillä |
| Sama työpöydällä dpr 2 | poltettu 1–5 px | 2 / ≤ 4 px joka rivillä |
| Koepiste: magentaa levyn sisällä | — | 0 |
| Z-taistelu: magentaa laattakerroksen (E1) kanssa / ilman | — | 0,97…1,03 |
| Horisontti: magentaa kiekon ulkopuolella / kaikki | — | ≤ 0,3 %; takapuoli (kulma lng −60, korkeus 2,5): magentaa vain kiekon etupuolella (syvyys=0-vertailussa määrä kasvaa) |
| Piirtokutsut: oma osuus Ateena / koko pallo | — | ≤ 60 / ≤ 4 |
| paivitaMs (kerroksen JS per päivitys) | — | ≤ 5 ms (4×) |
| Pano p50 kehys (dpr 1, 4×, ohjelmistorasteroija) | 133 ms | ≤ 2,2 × ilman vektoreita — ja OMISTAJAN PUHELIMELLA: ei havaittavaa eroa (jos on, PIKSELISUHDE ja solukatto ovat säätövakiot; vara ?vektorit=0) |
| Pyynnöt kerroksesta Ateenan saapumisnäkymässä | — | ≤ 30 (solut), tavua ≤ 150 kt |
| Zoom 2,5 → 0,05: taso monotoninen 1 → 4 | — | ei edestakaista vaihtoa (hystereesi tarvitaan, jos vartija näkee) |
| Tasokartta (?lauta=kartta) | — | ei muutosta: kerros on pallolaudan oma |

## 6. Erät parvelle

Jokainen erä on yksi Opus-agentti, yksi commit worktreessä, muutoslokirivi
≤ 60 merkkiä, portit `node --test tests/*.test.mjs` (`# fail 0`),
`node tools/tarkista-kaksoisavaimet.mjs`, `node tools/tarkista-niputus.mjs`,
`node tools/tarkista-savukkeet.mjs`, `node tools/build-standalone.mjs`
ja erän omat savukkeet. Raamattuun ei kirjoiteta (Fable lisää
karttarivin, luku 8). Riippuvuudet E-eriin:

```
V0 aineistoputki (tools, workflow) ──┐
V1 moduuli js/pallovektorit.js ──────┴── V2 kytkentä lauta.js + vartija ── V3 tyyli puhelimella ── V4 rantaviiva pois pohjasta (omistaja, z8-polton kanssa)
E0 → E1 laattakerros ────────────────────┘ (V2 vasta E1:n mergen jälkeen; ei rinnakkain E5:n kanssa, joka koskee samaa lauta.js:ää)
```

Rinnakkaiset erät eivät koske samoihin tiedostoihin: V0 =
tools/tee-pallovektorit.mjs, .github/workflows/tee-pallovektorit.yml,
tests/pallovektorit-aineisto.test.mjs; V1 = js/pallovektorit.js,
tests/pallovektorit.test.mjs, sw.js (yksi rivi); V2 =
js/pallolauta/lauta.js (yksi lohko + pura), tools/savukkeet/
mittaa-pallon-vektorit.mjs (--vartio), tools/savukkeet/README.md,
docs/moduulit/karttapallo.md 10.3; V3 = js/pallovektorit.js (vakiot);
V4 = tools/generoi-laattapyramidi.mjs, tools/fokuskartta/piirto.js,
tools/fokuskartta/maailmapiirto.js, tools/tee-pallolaatat.mjs,
js/laattapyramidi.js, js/pallolaatat.js (E1:n jälkeen), workflow.
E1 (js/pallolaatat.js, js/pallo.js), E2 (mittaa-pallon-liike.mjs), E4
(avaus.js) ja V-erät eivät kosketa toistensa tiedostoja; E5 ja V2
koskevat molemmat lauta.js:ää eri kohdissa — ajetaan peräkkäin.

### V0 — Aineistoputki: vektorit ämpäriin (heti, rinnakkain E1:n kanssa)

```
TEHTÄVÄ V0 (Opus, yksi commit, worktree origin/mainin päällä): tee
tuotantotyökalu tools/tee-pallovektorit.mjs ja työnkulku
.github/workflows/tee-pallovektorit.yml, jotka kirjoittavat rantaviivat ja
maiden rajat tasoittain yksinkertaistettuina ja 10°:n soluihin
leikattuina ämpäriin polkuun julisteet/pallo/vektorit/<versio>/. Lue ensin
CLAUDE.md, docs/roolitus.md, Raamattu (rivit "PALLO LEVOSSA YHTA TERAVA
KUIN TASOKARTTA" lisäyksineen, erityisesti VEKTORIT SAMALLA),
docs/moduulit/pallon-vektoriviivat.md luvut 2.4 ja 4 kokonaan,
tools/kokeilut/pallon-vektorit/tee-aineisto.mjs (MALLI: lähteet, DP,
solut, delta — sama logiikka tuotantoon), tools/fokuskartta/maailma.mjs
(meriRenkaat, rannikotRenkaista), tools/fokuskartta/rajat.mjs
(lueRajaviivasto), .github/workflows/tee-pallolaatat.yml ja
generoi-pyramidi.yml (Natural Earthin nouto rivillä ~235, R2-vienti).

TOTEUTA:
1. tools/tee-pallovektorit.mjs: --ne=<kansio> (ne_10m_ocean.geojson;
   workflow noutaa saman URL:n kuin generoi-pyramidi.yml), --ulos, --versio
   (oletus päivä + kirjain, esim. 2026-09-07a), --lodit=0.1,0.03,0.008,0.004,0,
   --solu=10, --yksisolu=0.03, --kuiva. Rannikko: meriRenkaat(kansio,
   { harvennus: 0.006 }) → rannikotRenkaista(laatikko lat0 −90, lat1 90)
   — TÄSMÄLLEEN sama kutsu kuin pyramidissa, jotta geometria on sama.
   Rajat: lueRajaviivasto('nykyiset').viivat. Douglas–Peucker asteina
   (kopioi dp tee-aineisto.mjs:stä). Solut: viiva katkaistaan solun
   vaihtuessa ja rajapiste kuuluu molempiin (soluihin). Tiedostomuoto
   PER SOLU (<laji>/l<k>/<sarake>_<rivi>.bin): peräkkäin viivoja, kukin
   int32 n, int32 lon0·1e4, int32 lat0·1e4, sitten (n−1) × (int16 dlon,
   int16 dlat) 1e-4°-yksikköinä, little-endian; delta rajataan
   ±32767:ään (viiva katkaistaan uuteen osaan, jos ylittyy — kirjaa
   montako). luettelo.json: { versio, lahteet: { ocean: { url, sha256 },
   rajat: 'nykyiset' }, harvennus: 0.006, lodit, solu, yksiSoluRaja,
   lajit: { rannikko: { tasot: [{ k, tol, solu, soluja, viivoja, pisteita,
   tiedostot: { '<s>_<r>': { tavua, viivoja, pisteita } } }] }, rajat: … } }.
   Tulosta mittaustaulukko (tee-aineisto.mjs:n console.table) ja
   kirjoita mitat.json.
2. Workflow tee-pallovektorit.yml (workflow_dispatch: versio, kuiva):
   nouto raw.githubusercontent.com/nvkelso/natural-earth-vector/master/
   geojson/ne_10m_ocean.geojson (sama kuin pyramidi), ajo, vienti
   `aws s3 sync` polkuun julisteet/pallo/vektorit/<versio>/ välimuistilla
   'public, max-age=31536000, immutable' ja content-type
   application/octet-stream (.bin) / application/json (luettelo, max-age
   3600). Salaisuustarkistus kuten tee-pallolaatat.yml.
3. tests/pallovektorit-aineisto.test.mjs: dp (toleranssi 0 = ei muutosta;
   suora kolmen pisteen viiva → 2 pistettä), solujako (sauman yli, viiva
   katkeaa ja rajapiste on molemmissa), deltakoodaus ↔ purku (kirjoita
   työkaluun export function puraDelta — SAMA purkaja kopioidaan V1:een
   js/pallovektorit.js:ään; testi lukee molemmat tekstinä ja vaatii, että
   funktion runko on sama) pienellä synteettisellä aineistolla; ±32767:n
   katkaisu.
4. docs/moduulit/pallon-vektoriviivat.md luku 9: rivi "V0 tehty:
   versio, taulukko, sha256".

EI SAA MUUTTAA: js/*, tools/fokuskartta/*, generoi-pyramidi.yml,
tee-aineisto.mjs (kokeilu jää dokumentiksi).

TODENNUS: node tools/tee-pallovektorit.mjs --ne=<kansio> --ulos=/tmp/v
--kuiva ja ilman: tason 4 rannikko 406 798 pistettä, 378 solua, delta
≈ 1,66 Mt; rajat 72 815 pistettä; sha256 luettelossa. Portit kuten
yllä. Raportti Fablelle: commit-SHA, taulukko, luettelon koko; workflow'n
ajaa Fable (PYRAMIDIAJOT ILMAN ERILLISTA LUPAA).
```

### V1 — Moduuli js/pallovektorit.js (heti, rinnakkain V0:n ja E1:n kanssa)

```
TEHTÄVÄ V1 (Opus, yksi commit, worktree origin/mainin päällä): toteuta
js/pallovektorit.js docs/moduulit/pallon-vektoriviivat.md luvun 4 mukaan
— KOKEILUN tools/kokeilut/pallon-vektorit/vektorit.js tapa 'line2' on
valmis malli (luokat elävästä pallosta, materiaalit, solut, taso,
säde–pallo-leikkaus), mutta tuotantomoduuli on siistitty: yksi tapa,
int16-delta-aineisto ämpäristä, LRU, häive, kytkin. Lue ensin CLAUDE.md,
docs/roolitus.md, Raamattu (VEKTORIT SAMALLA, KAIKKI LIIKE ANIMOIDAAN),
suunnitelman luvut 2–4 kokonaan, vektorit.js kokonaan, js/pallo.js
(kolmiulotteinen, pallonPiste, lepokerroksenAlue, luoLepokerros —
häiveen ja purun malli), js/pallolauta/reitit.js (aseta-osarekisteri),
js/pallolauta/linssit.js (three heijastuksella) ja
tests/pallolepokerros.test.mjs (testityyli).

TOTEUTA js/pallovektorit.js:
1. export function luoPallovektorit({ pallo, kotelo, ikkuna = globalThis,
   reitit }) → { paivita(), mittarit(), pura(), valmis }. Vakiot ja
   puhtaat funktiot täsmälleen luvun 4.2 nimillä (export). Luokat:
   reitit.aseta('vektorit', [{ avain: 'vektorit-luokat', pisteet: [[0, 0], [0, 0]],
   paksuus: 1, vari: 'rgba(0,0,0,0)' }]) → odota (≤ 100 × 50 ms) kunnes
   scenessä on olio type 'Line2' → luokat = constructor-ketju kuten
   vektorit.js line2Luokat → reitit.aseta('vektorit', []). Jos luokkia ei
   saada: mittarit.syy = 'Line2-luokkia ei saatu', kerros ei käynnisty,
   pallo toimii ilman.
2. Aineisto: PALLOVEKTORIT_JUURI = `${R2}julisteet/pallo/vektorit/${PALLOVEKTORIT_VERSIO}/`
   (R2 kuten js/pallo.js), luettelo fetch (cache 'no-cache' kuten
   laatat.json), solut fetch → arrayBuffer → puraDelta (V0:n muoto; ennen
   V0:n valmistumista testaa tee-aineisto.mjs:n Float32-muodolla vain
   testeissä — tuotantopurkaja on delta). Näkyvä alue säde–pallo-
   leikkauksella (pinnanPiste), taso vektoritaso(), solut vektorisolut(),
   LRU (SOLUKATTO), häive kloonatulla materiaalilla 260 ms → jaettu
   materiaali häiveen jälkeen (materiaalien määrä palaa kahteen).
   Rajat vain kun tarve ≥ VEKTORIT_RAJAT_PX_ASTE. Kytkin:
   pallovektoritPaalla(ikkuna) lukee ?vektorit=0|1 ja localStorage-avaimen
   'matkakirja-pallovektorit' (oletus PALLOVEKTORIT_OLETUS = true) —
   moduulin omassa apurissa, EI js/ui-apurit.js:ssä.
3. mittarit(): { tila, syy, lod, tol, tarvePxAste, soluja, ladattu, janoja,
   tavua, pyyntoja, pyydetyt[], paivitaMs, rakennusMs, linewidthCss,
   pikselisuhde, alue } — savukkeet ja vartija lukevat tämän.
4. pura(): ohjaimien kuuntelija pois, oliot scenestä, geometriat ja
   materiaalit dispose, reitit.aseta('vektorit', []).
5. sw.js SHELL: './js/pallovektorit.js' './js/pallolauta/'-rivien viereen.
6. tests/pallovektorit.test.mjs: vektoritaso (tarve 6 px/° → taso 1;
   62 → 2; 125 → 3; 240 → 4; pakotus), vektorisolut (Kreikan laatikko
   → 4 solua; sauman yli lon 175…185 → solut molemmin puolin; koko
   maailma tasolla 0 → ['0_0']), puraDelta (synteettinen puskuri),
   vektorijanat (kaksi pistettä → yksi jana säteellä R, x/y/z =
   pallonPiste), pinnanPiste (kamera z-akselilla, ruudun keski → lat 0
   lon 0; ohi pallon → null), vakioiden arvot (RENDER_ORDER −0,5 <
   reittien 0; SYVYYSSIIRTO −12 < LEPOKERROS_SYVYYSSIIRTO −8; KORKEUS
   === 0 — parallaksi, luku 2.3),
   ja tekstitesti: moduuli ei tuo js/ui-apurit.js:ää eikä js/pallolaatat.js:ää.

EI SAA MUUTTAA: js/pallo.js, js/pallolaatat.js, js/pallolauta/* (V2
kytkee), js/ui-apurit.js, Raamattua, kokeilua tools/kokeilut/*.

TODENNUS: node --test tests/pallovektorit.test.mjs (# fail 0), portit;
kokeilusivua saa käyttää silmätarkistukseen vaihtamalla sen tuonnin
väliaikaisesti (ei committiin): `NODE_USE_ENV_PROXY=1 node
tools/savukkeet/mittaa-pallon-vektorit.mjs --aineisto=<tee-aineisto.mjs:n
kansio> --tapa=line2 --vari=debug --vaihe=lepo --dpr=1` antaa
vertailuluvut (luku 2.3). Raportti Fablelle: commit-SHA, rivimäärät,
porttien tulokset, mittarit()-esimerkki.
```

### V2 — Kytkentä pallolautaan ja vartija (E1:n mergen jälkeen; ei rinnakkain E5:n kanssa)

```
TEHTÄVÄ V2 (Opus, yksi commit, worktree E1:n ja V0–V1:n mergen päällä):
kytke js/pallovektorit.js pallolautaan ja tee mittarista vartija. Lue
ensin suunnitelman luvut 4.3 ja 5, js/pallolauta/lauta.js kokonaan
(rakennaPallo-kutsu, kamera, reitit, lauta-olion pura), js/pallovektorit.js
ja tools/savukkeet/mittaa-pallon-vektorit.mjs.

TOTEUTA:
1. js/pallolauta/lauta.js: import { luoPallovektorit, pallovektoritPaalla }
   from '../pallovektorit.js'; heti `const reitit = luoReitit(...)`:n
   jälkeen: `const vektorit = pallovektoritPaalla() ? luoPallovektorit({
   pallo, kotelo, reitit }) : null;` (kommentti: Raamattu VEKTORIT SAMALLA,
   suunnitelma luku 4). lauta-olioon `vektorit: () => vektorit`
   (mittarit savukkeille, kuten lepokerros: () => …). pura(): `vektorit?.pura()`
   ennen `pallo._destructor?.()`. EI muita muutoksia lauta.js:ään.
2. Kokeilusivu tools/kokeilut/pallon-vektorit/pallo.html: lisää
   `?vektorit=peli`, joka käyttää tuotantomoduulia (luoPallovektorit,
   aineisto ämpäristä) — silloin mittari mittaa tuotantokoodia; kokeilun
   omat tavat jäävät.
3. tools/savukkeet/mittaa-pallon-vektorit.mjs: lippu --vartio (kuten
   E2:n mittaa-pallon-liike --vartio): OK/FAIL-rivit luvun 5 rajoista
   tuotantotavalla (--tapa=peli --vari=debug) ja poistumiskoodi 1, jos
   FAIL. tools/savukkeet/README.md: rivi mittaa-pallon-vektorit
   (mitä mittaa, miten ajetaan, vartion rajat). tools/tarkista-savukkeet.mjs
   läpi (mittari ei käytä ui.X:ää).
4. docs/moduulit/karttapallo.md luku 10.3: kappale "Vektoriviivat (V2)"
   mitatuin luvuin ennen/jälkeen; suunnitelman luku 9: "V2 tehty".

EI SAA MUUTTAA: js/pallovektorit.js:n käytöstä (V3 säätää vakiot),
js/pallolaatat.js, js/pallo.js, muita lauta.js:n kohtia (E5:n
onPoltettu-rivi), tools/savukkeet/mittaa-pallon-liike.mjs (E2).

TODENNUS: NODE_USE_ENV_PROXY=1 node tools/savukkeet/mittaa-pallon-vektorit.mjs
--aineisto=<…> --tapa=peli --vari=debug --vartio --nakyma=puhelin ja
--nakyma=tyopoyta: kaikki OK (luku 5); savuke-pallolauta.mjs,
savuke-avauslento.mjs, savuke-siirtokoreografia --lauta pallo,
savuke-kartta-tila --lauta pallo samat OK/FAIL-rivit kuin ennen. KATSO
kuvat (lepo/liike/zoom-montaasi) ja liitä polut. Muutoslokirivi (≤ 60
mrk) valmiiksi, esim. 'Pallo: rantaviivat ja rajat vektoreina laattojen
paalle'. Jos jokin raja ei täyty, ÄLÄ säädä rajaa — raportoi luku ja syy.
```

### V3 — Tyyli omistajan puhelimella (V2:n jälkeen)

```
TEHTÄVÄ V3 (Fable omistajan kanssa, Opus toteuttaa vakiomuutokset):
omistaja katsoo puhelimella kolme vedosta (kehittäjävipu tai
?vektorit-parametrit): leveys 1,0 / 1,5 / 2,0 laitepikseliä, sävy
poltettu muste (58,40,25) / hitusen vaaleampi, rajat pistekuviolla vs
yhtenäisenä hentona, rajojen näkyvyysraja (maanäkymästä vs aina).
Toteutus: vain js/pallovektorit.js:n vakiot (+ tests/pallovektorit.test.mjs
arvot) ja tarvittaessa `?leveys=` `?rajat=` -parametrit kytkinapuriin.
Kaksoisreunan tarkistus: jos poltettu pisteviiva ja vektoriraja
erottuvat kahtena, kirjaa V4:ään viivatason uusintapoltto --eirajat.
EI SAA MUUTTAA: muita tiedostoja. TODENNUS: --vartio OK molemmilla
näkymillä; kuvat omistajalle.
```

### V4 — Rantaviiva pois pohjalaatoista omalle tasolleen (omistajan päätös; samaan ajoon z8-polton kanssa)

```
TEHTÄVÄ V4 (Opus, yksi commit; VAIN omistajan päätöksellä ja yhdessä
pyramidin uusintapolton (z8) kanssa — ks. suunnitelman luku 4.5):
rantaviivan muste (piirto.js osio 7, molemmat vedot) siirretään
pohjasta OMALLE LÄPINÄKYVÄLLE TASOLLE `ranta/z…` (z0–z7/z8, sama
ruudukko kuin viivataso), jonka tasokartta lataa pohjan päälle
(pohja → ranta → viiva → nosto) ja jonka laattakerros E1 ja
tee-pallolaatat JÄTTÄVÄT POIS pallolla (vektori korvaa). Lue
generoi-laattapyramidi.mjs (VIIVATASO-malli: peite, kansio, luettelo
`viivataso`), js/laattapyramidi.js (viivatasonTasot, pyramidinKerrostasot),
js/pallolaatat.js (E1: kerrosten kokoaminen, lepokerroksenKerrokset),
tools/tee-pallolaatat.mjs teeLukija. TOTEUTA: (1) generoi-laattapyramidi
--rantataso --rantaversio <v> (oma ajo kuten --viivataso; peite = rannikon
laatikot marginaalilla) ja pohja-ajolle lippu --ilman-rantaviivaa
(piirto.js osio 7 ohitetaan tyyliparametrilla, EI oletuksena — vanhat
lehdet ja pilotit eivät muutu); luetteloon `rantataso: { versio, tasot }`
ja lisäksi `pohja.rantaviiva: false`; (2) js/laattapyramidi.js: kolmas
läpinäkyvä kerros `pyramidi-rantataso` pohjan ja viivatason väliin,
pyramidinKerrostasot palauttaa { ranta: true } -tason; (3)
js/pallolaatat.js: kerroksen kokoaminen ohittaa ranta-tason, kun
pallovektorit on päällä (pallovektoritPaalla()), muuten piirtää sen; (4)
tools/tee-pallolaatat.mjs: sama sääntö (--ilman-rantaa); (5) workflow-
lippu generoi-pyramidi.yml:ään. Vanha peli ilman `rantataso`-kenttää:
luettelossa pohja.rantaviiva puuttuu → piirtää kuten ennen (sama
julkaisujärjestys kuin viivatasolla: selain ensin, taso ämpäriin,
vasta sitten rannaton pohja). EI SAA MUUTTAA: rantaviivan ulkoasua
tasokartalla (todennus: tasokartan kaappaus ennen/jälkeen, ero 0
Ateenan otoksessa), vektorikerrosta. TODENNUS: tests/laattapyramidi*,
savuke-laattapyramidi, mittaa-pallon-vektorit --vartio: poltetun
musteen paksuus pallolla zoomissa 0,05 = vektorin paksuus (usva pois).
```

## 7. Mitä jää auki ja mitä Opus voi jatkaa

- **Leveys ja sävy** ovat omistajan silmän asia (V3): mitattuna 1,5 px
  täydellä musteella on Ateenan näkymässä poltettua raskaampi.
- **Rajat**: pistekuvion näkyvyys ja näkyvyysraja (maanäkymästä vai
  aina) V3:ssa; poltetun pisteviivan ja vektorirajan kaksoisreuna
  tarkistetaan puhelimella — tarvittaessa viivataso `--eirajat` (V4).
- **Rantaviivan usva lähizoomissa** poistuu vasta V4:llä (pohja ilman
  rantaviivaa) — mitattu: lähikuvassa 0,08 poltettu 4 px, vektori 2 px.
- **Kehyshinta oikealla näytönohjaimella** on mitattava omistajan
  puhelimella (ohjelmistorasteroija ei kelpaa siihen); fat line on
  Google Earthin ja Mapboxin tapa, ja 7 000–35 000 janaa on GPU:lle
  pieni työ, mutta luku on saatava laitteelta.
- **Natural Earthin versio**: pyramidi ja V0 hakevat master-haaran —
  kiinnitys tagiin on oma pieni erä (koskee generoi-pyramidi.yml:ää).
- **Yleiskuvan sulautuminen** (p90 6 px): taso 0 yleiskuvaan tai
  ohuempi viiva kaukana — V3.
- **Valikkopallo** (js/pallo.js avaaPallo) ei saa kerrosta V2:ssa
  (kytkentä on pallolaudassa); lisäys on yksi rivi, jos halutaan.
- Kokeilun `nauha` jää dokumentoiduksi varapoluksi; ShaderMaterial-luokan
  saa myös ilmakehän materiaalista (scene: ShaderMaterial × 1), jolloin
  nollamittaista polkua ei tarvita — jos Line2-luokkien luku joskus
  rikkoutuu.

## 8. Raamatun karttarivi (Fable lisää)

`'docs/moduulit/pallon-vektoriviivat.md — pallon vektoriviivat: rantaviivat ja maiden rajat laattojen päälle tasan pikselin levyisinä (Line2 Globe.gl:n omasta nipusta, sama Natural Earth 10m -geometria kuin poltetulla viivalla, viisi yksinkertaistustasoa 10°:n soluina ämpärissä): mittaukset (leveys levossa, liikkeessä ja zoomissa, syvyysjärjestys, horisontti, kehyshinta), hylätyt tavat (pathsData, SVG, oma nauha) ja Opus-parven erät V0–V4 tehtävänantoineen (Fablemax 6.9.2026; SUUNNITELMA, toteutus Opus-parvella laattakerroksen E1:n rinnalla).',`

## 9. Mittarit, kokeilusivut ja kuvat

**V0 tehty 6.9.2026** (`tools/tee-pallovektorit.mjs`,
`.github/workflows/tee-pallovektorit.yml`,
`tests/pallovektorit-aineisto.test.mjs`): tuotantoputki kirjoittaa
int16-deltamuotoiset solutiedostot polkuun
`julisteet/pallo/vektorit/<versio>/<laji>/l<k>/<sarake>_<rivi>.bin` ja
`luettelo.json` (76 kt, kaikkien 1 524 solun tavut, viivat ja pisteet).
Lähde `ne_10m_ocean.geojson` sha256
`f9696a1337c746a0f6c8c13bc60d0f230d2ef8d105198d5657726c8f8e763fc2`
(noudettu 6.9.2026 samasta osoitteesta kuin generoi-pyramidi.yml),
rajat `nykyiset`, harvennus 0,006°. Ajo 1,5 s, tulos 9,0 Mt.

| laji | k | tol | solu | soluja | viivoja | pisteitä | delta kt | + gzip kt | katkoja |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rannikko | 0 | 0,1 | maailma | 1 | 6 069 | 31 595 | 171 | 127 | 82 |
| rannikko | 1 | 0,03 | maailma | 1 | 6 069 | 74 655 | 339 | 280 | 20 |
| rannikko | 2 | 0,008 | 10° | 378 | 6 069 | 178 874 | 765 | 635 | 14 |
| rannikko | 3 | 0,004 | 10° | 378 | 6 069 | 256 224 | 1 067 | 851 | 14 |
| rannikko | 4 | 0 | 10° | 378 | 6 069 | 406 798 | 1 656 | 1 251 | 0 |
| rajat | 0 | 0,1 | maailma | 1 | 7 848 | 16 921 | 127 | 91 | 21 |
| rajat | 1 | 0,03 | maailma | 1 | 7 848 | 20 990 | 143 | 105 | 21 |
| rajat | 2 | 0,008 | 10° | 128 | 7 848 | 33 644 | 195 | 154 | 19 |
| rajat | 3 | 0,004 | 10° | 128 | 7 848 | 44 730 | 239 | 187 | 17 |
| rajat | 4 | 0 | 10° | 130 | 7 848 | 72 815 | 349 | 263 | 0 |

Pistemäärät ja solumäärät ovat luvun 2.4 mittauksia myöten samat, eli
tuotanto lukee saman geometrian kuin poltettu viiva. Kaksi eroa
kokeiluun, molemmat tarkoituksellisia: (1) `katkoja` on niiden janojen
määrä, joissa yksi askel ylitti int16:n ±3,2767° ja viiva katkaistiin
uuteen osaan — kaikki ovat leveyspiireillä yli ±79° (Etelämantereen
jäähyllyn reuna, Pohjois-Grönlanti), maapinnalla alle 150 km ja
tarkimmilla tasoilla niitä ei ole yhtään; (2) solun vaihtuessa uusi osa
alkaa rajapisteellä KERRAN — kokeilu toisti pisteen, jolloin jokaiseen
saumaan jäi nollamittainen jana (LineSegments2 piirtäisi sen pisteenä).
Ero tavuissa on 0,4 %.

- `tools/savukkeet/mittaa-pallon-vektorit.mjs` — mittari (luku 2.0).
- `tools/kokeilut/pallon-vektorit/pallo.html` — kokeilusivu pelin omalla
  pallolla; `vektorit.js` — neljä toteutustapaa; `tee-aineisto.mjs` —
  aineisto tasoittain ja soluittain, mitat.
- Kuvat (scratchpad, eivät repossa — polut raportissa):
  `scratchpad/pallon-vektorit/kuvat/{puhelin,tyopoyta}-<tunniste>-*.png`
  ja JSON-raportit samassa kansiossa (ajot: A–J rinnakkain, S1–S5
  lepo dpr 3, T1–T6 liike ja zoom dpr 1, U1–U3 työpöytä); montaasit
  `montaasi-line2-lepo-liike-zoom.png`, `montaasi-korkeus.png`,
  `montaasi-oikea-ateena-dpr3.png`, `montaasi-tyopoyta-lahi.png`,
  `montaasi-tavat-maailma.png`, `montaasi-lahi-dpr3.png`.
- Ajoapurit scratchpadissa: `aja.sh`, `sarja.sh`, `tiivista.mjs`
  (JSON → taulukkorivit), `montaasi.mjs` (PNG-montaasi ilman PIL:iä).

