# Kaupungin kasvu -lavan datalähteet: Rooma ja Lontoo (liite, 24.9.2026)

*Liite suunnitelmaan linssi-taidemuseo-suunnitelma-20260924.md (luku 2B). Sonnet-agentti varmensi lisenssit lähteistä. Linssiseppä tarkisti pistokokein Zenodo 20800572 (cc-by-4.0) ja OSM-relaation 10129640 (Mura Aureliane, 134 jäsentä). Näyte-CSV:t (Reba ym.) ovat vain scratchpadissa.*


Selvitys tehty 24.9.2026. Kaikki lisenssit tarkistettu suoraan lähteen omalta
sivulta/metadatasta (ei muistista) — kunkin kohdan lopussa "varmennettu
24.9.2026 <mistä>". Lisenssisääntö: PD/CC0/CC BY/ODbL/muu jaa-samoin -ehto OK;
**NC-lisenssit (CC BY-NC, CC BY-NC-SA) hylätään**; ei NASA Earthdata -tunnusta
vaativia palveluja.

Pieniä näytetiedostoja (CSV) on ladattu scratchpadin `data/`-alikansioon:
`chandlerV2.csv` (1,4 Mt), `modelskiAncientV2.csv` (16 kt),
`modelskiModernV2.csv` (15 kt) — kaikki CC BY 4.0, ks. kohta 2.

---

## 1. HYDE 3.x (PBL / Utrecht University)

HYDE-sarjasta on kaksi eri lisenssillä olevaa julkaisukanavaa — **tämä on
tärkeä löydös**, koska ne poikkeavat toisistaan:

### HYDE 3.3 (uusin, 2024)
- **Sisältö**: väestö (kokonais-, kaupunki-, maaseutu-, tiheys) ja
  rakennettu ala hilana, sekä maankäyttö (pelto, laidun).
- **Aikakattavuus**: 10 000 eaa. – 2023 jaa.
- **Resoluutio**: 5 kaariminuuttia (n. 85 km² päiväntasaajalla).
- **Muoto**: ESRI ASCII grid.
- **Lisenssi**: **Creative Commons Attribution-NonCommercial-ShareAlike 4.0
  International (CC BY-NC-SA 4.0)** — luettu suoraan tietueen
  "License"-kentästä Utrechtin Yoda-julkaisualustalta
  (`public.yoda.uu.nl/geo/UU01/94FNH0.html`, DOI 10.24416/UU01-94FNH0).
  **NC-ehto → HYLÄTTY omistajan lisenssisäännöllä.**
- **Koko/URL**: doi.org/10.24416/UU01-94FNH0
- Huom: hakukoneiden yhteenvedot väittivät virheellisesti "CC BY 4.0" —
  tämä osoittaa, miksi lisenssi pitää lukea itse tietueesta.
- **Soveltuvuus**: EI KÄYTETTÄVÄ NC-ehdon takia, ellei omistaja erikseen
  hyväksy NC:tä (linjaus kieltää sen).

### HYDE 3.2 (2017, edeltäjä — SUOSITELLAAN)
- **Sisältö**: sama tyyppinen väestö+maankäyttö-hila kuin 3.3, mutta
  kattaa vain 10 000 eaa. – 2017 jaa. (ei siis aivan nykyhetkeen).
- **Resoluutio**: 5 kaariminuuttia, ASCII grid -muoto (essd-artikkelin
  mukaan).
- **Lisenssi**: **CC0 1.0 (public domain -omistautuminen)** — luettu
  suoraan DANS/EASY-arkiston (archaeology.datastations.nl) tietueen
  "License/Data Use Agreement" -kentästä, DOI 10.17026/dans-25g-gez3.
- **Koko**: 3 zip-tiedostoa, purettuna yhteensä **77,8 Gt** (tietueen oma
  huomautus) — ladataan vain tarvittavat vuodet/muuttujat.
- **URL**: https://doi.org/10.17026/dans-25g-gez3
- **Soveltuvuus kaupunkirajat/laajuus-animaatioon**: **välttävä-hyvä**.
  Hila on karkea (85 km²/solu) eikä anna kaupungin tarkkaa muotoa, mutta
  antaa nopeasti urbaanin väestön/rakennetun alan tiheyden karkeana
  taustakerroksena koko aikajanalle CC0-lisenssillä. Ei riitä yksin
  polygonin ääriviivaksi lähelle nykyaikaa, mutta hyvä "tausta ja
  kalibrointi" 1800-luvulle ja aiemmalle.

*Varmennettu 24.9.2026: HYDE 3.3 -lisenssi luettu suoraan
public.yoda.uu.nl:n tietuesivulta (jina.ai-lukijan kautta, koska sivu
torjuu botit Anubis-suojauksella); HYDE 3.2 -lisenssi luettu suoraan
archaeology.datastations.nl (DANS/EASY) -tietuesivulta.*

---

## 2. Reba, Reitsma & Seto 2016 — "Spatializing 6,000 years of global urbanization"

Data on **Figsharessa kolmena erillisenä settinä**, EI tarvitse NASA
Earthdata -tunnusta (SEDACin uudelleenjulkaisu sen sijaan vaatisi — ks.
alla, vältä sitä).

| Aineisto | DOI | Aikakattavuus | Koko | Lisenssi |
|---|---|---|---|---|
| Chandler Population Data | 10.6084/m9.figshare.2059494 | 2250 eaa.–1975 jaa. | 4,25 Mt (2 CSV) | CC BY 4.0 |
| Modelski Ancient Period Data | 10.6084/m9.figshare.2059497 | 3700 eaa.–1000 jaa. | 33,5 kt | CC BY 4.0 |
| Modelski Modern Period Data | 10.6084/m9.figshare.2059500 | 2000 jaa. (293 kaupunkia) | 45,2 kt | CC BY 4.0 |

Lisenssi luettu suoraan Figsharen API:sta (`api.figshare.com/v2/articles/…`
→ kentät `license.name = "CC BY 4.0"`, `license.url =
creativecommons.org/licenses/by/4.0/`) — ei hakukoneen tulkintaa.

**Sarakkeet**: City, OtherName, Country, Latitude, Longitude, Certainty
(1–3), sitten yksi sarake per vuosi (esim. `AD_1650`) väkiluvulla.

**Rooman ja Lontoon rivit (poimittu ja tarkistettu ladatusta CSV:stä)**:

Rooma (Modelski Ancient, BC_500…AD_500 + Chandler AD_600… jatko):
```
BC 500: 100 000   BC 400: 150 000   BC 300: 250 000   BC 200: 210 000
BC 100: 400 000   AD 1:   800 000   AD 100: 1 000 000 AD 200: 1 200 000
AD 300: 1 000 000 AD 400: 800 000  AD 500: 100 000
--- Chandler jatkaa samalle riville ---
AD 600: 50 000    AD 800: 50 000    AD 1000: 35 000   AD 1300: 30 000
AD 1377: 17 000   AD 1500: 38 000   AD 1600: 102 000  AD 1700: 138 000
AD 1800: 142 000  AD 1875: 252 000  AD 1900: 438 000  AD 1950: 1 665 000
AD 1975: 3 600 000
```

Lontoo (Chandler-data, ei ole Modelski Ancient -setissä koska perustettu
vasta n. 47 jaa.):
```
BC 100: 30 000    AD 1200: 40 000   AD 1300: 45 000   AD 1348: 65 000
AD 1500: 50 000   AD 1600: 187 000  AD 1650: 410 000  AD 1700: 550 000
AD 1750: 676 000  AD 1800: 861 000  AD 1841: 1 948 417 AD 1875: 4 241 000
AD 1900: 6 480 000 AD 1925: 7 742 000 AD 1950: 8 860 000 AD 1975: 10 500 000
```
(Huom: em. arvot ovat pisteväkilukuja, ei polygoneja — sijaintitieto on
yksi piste/kaupunki, ei laajuus. Käy siis väestökäyrään, ei suoraan
rajageometriaan.)

**SEDAC-varoitus**: sama data on uudelleenjulkaistu NASA SEDACissa nimellä
"Historical Urban Population, v1" (DOI 10.7927/H4ZG6QBX). SEDACin oma
kuvaus sanoo käyttöehdon olevan "non-commercial… share-alike" eli
todennäköisesti CC BY-NC-SA — **vältä SEDAC-versiota**, käytä alkuperäisiä
Figshare-tiedostoja, jotka ovat aidosti CC BY 4.0 ja lataa suoraan ilman
tunnusta.

**Soveltuvuus**: **välttävä** rajageometrialle (piste+väkiluku, ei
polygoni), mutta **hyvä** väestökäyrän/koon indikaattorina, josta laajuus
voi arvioida (esim. tunnettu asukastiheysoletus → pinta-ala-arvio) tai
värikoodattuna pallona kartalla.

*Varmennettu 24.9.2026: figshare API (api.figshare.com/v2/articles/2059494,
2059497, 2059500) ja artikkelin (Reba, Reitsma & Seto 2016, Scientific
Data 3:160034) Data Citations -osio PMC-kopiosta (PMC4896125).*

---

## 3. Layers of London (layersoflondon.org)

**Sivustoa ei voitu suoraan lukea tässä istunnossa** — se torjuu
automatisoidut hakupyynnöt Anubis-bottisuojauksella ja CAPTCHA:lla (myös
jina.ai-lukijaproxy sai "Human Verification" -sivun). Tieto perustuu siis
toissijaisiin lähteisiin (MOLA:n projektikuvaus, Mapping London -blogi),
**ei ole täysin lähteestä itsestään varmennettu — merkitty epävarmaksi**.

- Ylläpitäjä: Institute of Historical Research (Lontoon yliopisto),
  kumppaneina mm. British Library, The National Archives, Historic
  England, MOLA.
- Yleinen linja (toissijaisten lähteiden mukaan): "vektorit ja
  georeferoidut karttarasterit ovat Layers of London CC-BY -lisenssillä",
  MUTTA osa raster-kuvista on kolmansien osapuolten tekijänoikeuden alla
  eikä niitä saa jakaa vapaasti — **lisenssi pitää tarkistaa kerroskohtaisesti
  käsin sivustolta ennen käyttöä**, koska tässä istunnossa se ei ollut
  mahdollista.
- Sovellus on avointa lähdekoodia GitHubissa (`layersoflondon/application`,
  GPL-3.0) — tämä koskee vain ohjelmistoa, ei karttadataa.
- **Ei voitu vahvistaa** onko 1746 Roque, 1682 Morgan tai 1890-luvun OS
  -kerrokset CC BY vai NC — nämä pitää tarkistaa manuaalisesti selaimella
  (sivun bottiesto estää automaation).

**Suositus**: älä nojaa Layers of Londoniin ilman manuaalista
kerroskohtaista lisenssitarkistusta. Käytä sen sijaan alla olevaa
varmennettua Zenodo-aineistoa 1890-luvun OS-kartoille (kohta 4).

*Varmennettu 24.9.2026: EI VOITU VARMENTAA SUORAAN LÄHTEESTÄ — sivusto
torjuu botit (Anubis + CAPTCHA). Tieto toissijaisista lähteistä
(mola.org.uk, mappinglondon.co.uk), merkitty epävarmaksi.*

---

## 4. Lontoon kasvu muuten

### 4a. National Library of Scotland — georeferoidut OS-kartat
- **Ei voitu varmentaa suoraan** — `maps.nls.uk/copyright.html` ja
  `/geo/explore/` palauttavat automatisoiduille pyynnöille HTTP 405 tai
  CAPTCHA-seinän myös jina.ai-proxyn kautta.
- Toissijaisten hakutulosten mukaan georeferoidut kartat ovat
  "CC-BY (NLS)" -uudelleenkäyttölisenssillä, mutta osa in-copyright
  OS-kartoista vaatii erillisen tilauksen/luvan (ei siis kaikki avoimia).
  **Merkitty epävarmaksi** — tarkista käsin selaimella ennen käyttöä.
- Kattaa mm. 1890-luvun OS Town Plans Lontoosta suurella mittakaavalla.

*Varmennettu 24.9.2026: EI VOITU VARMENTAA SUORAAN — sivusto palauttaa
405/CAPTCHA automatisoiduille pyynnöille. Toissijainen lähde: hakutulokset.*

### 4b. Map of Early Modern London (MoEML) — Agas-kartta
- MoEML:n oma editio "Civitas Londinum" (ns. Agas-kartta, rekonstruoitu
  n. 1561/1633 puupiirroksesta) on **CC BY-NC-SA 4.0** — luettu MoEML:n
  omalta citing-sivulta (mapoflondon.uvic.ca/citing.htm).
  **HYLÄTTY NC-ehdon takia.**
- **PD-vaihtoehto löytyi**: George Vertuen 1737 kuparipiirros samasta
  kadonneesta 1561 Agas/Civitas Londinum -kartasta, skannattu
  Ranskan kansalliskirjaston (BnF) kokoelmasta ja ladattu Wikimedia
  Commonsiin 8 osana (esim. tiedosto "Civitas Londinum A(n)no D(omi)ni
  circiter MDLX. Vertue Soc. Antiq. Lond - excudit 1737 -
  btv1b530778715 (1 of 8).jpg"), **lisenssi: Public domain**,
  resoluutio 6539×4538 px per osa.

*Varmennettu 24.9.2026: MoEML-lisenssi mapoflondon.uvic.ca/citing.htm;
Commons-tiedoston lisenssi Wikimedia Commons -API:sta
(`action=query&prop=imageinfo&iiprop=extmetadata`).*

### 4c. Lontoon rakennetun alueen laajuus / "growth of London" -kartat (PD, Commons)
Haettu ja lisenssi tarkistettu suoraan Wikimedia Commons -API:sta (ei
hakukoneesta):

| Tiedosto | Lisenssi | Koko (px) | Sisältö |
|---|---|---|---|
| File:London plan 1300.jpg | Public domain | 1140×902 | Lontoon kartta v. 1300 |
| File:London c.1381, plain map.png | Public domain | 800×492 | Lontoo v. 1381 |
| File:London vicinity 1200 1600.jpg | Public domain | 1136×910 | Lontoon ympäristö 1200–1600 |
| File:London core settlements c.1560.jpg | **CC BY-SA 4.0** (ei PD, mutta avoin) | 2371×1612 | Lontoon ydinasutus n. 1560 |
| File:London 1815 map.jpg | Public domain | 8534×5571 (korkea res.) | Koko Lontoon kartta 1815 |

**Soveltuvuus**: **hyvä** manuaaliseen digitointiin (rajaviivan
piirtämiseen historiallisesta kartasta) muutamalle aikaleikkeelle
1300–1815; ei ole valmiiksi polygonimuodossa.

*Varmennettu 24.9.2026: Wikimedia Commons API, `action=query&
prop=imageinfo&iiprop=extmetadata|size`, LicenseShortName-kenttä
luettu suoraan kunkin tiedoston metadatasta.*

### 4d. Roman Londinium -muuri
- OpenStreetMapissa Lontoon roomalainen kaupunginmuuri on kartoitettu
  **pirstaleisesti** (yksittäisinä pisteinä/lyhyinä osuuksina, esim.
  Nominatim-haku löysi noden "Roman city wall" Tower Hillin luota,
  ODbL 1.0 -lisenssillä) — **ei yhtä yhtenäistä relaatiota** kuten Rooman
  Aurelianuksen muurilla (ks. kohta 5a). Koko muurin kierto pitää koota
  useista OSM-kohteista tai digitoida itse esim. Museum of Londonin
  tutkimusten pohjalta (ei tarkistettu tässä avoimen lisenssin datasettiä
  Museum of London GIS:lle — vaatisi erillisen selvityksen).
- **Soveltuvuus**: välttävä sellaisenaan, vaatii koostamista/digitointia.

*Varmennettu 24.9.2026: OpenStreetMap Nominatim-haku
(nominatim.openstreetmap.org, licence-kenttä "ODbL 1.0" vastauksessa).*

### 4e. Lontoon rakennettujen alueiden 1891–1896 rakennusjalanjäljet (Zenodo — ERINOMAINEN LÖYDÖS)
- **Nimi**: "A Layer of Late Victorian London: The Building Footprints
  from the 1:1,056 Ordnance Survey Map (1891-1896)"
- **Muoto**: GeoPackage (raaka + korjattu versio), n. 1,3 miljoonaa
  rakennuksen jalanjälkeä, syväoppimalla irrotettu (tarkkuus 97 %,
  saanti 95 %).
- **Kattavuus**: n. 450 km² Suur-Lontoota, 753 georeferoitua karttalehteä.
- **Koko**: yhteensä 1,5 Gt (annotaatiot 224,1 Mt + korjattu 640,1 Mt +
  raaka 649,9 Mt) — liian iso ladattavaksi tähän scratchpadiin, mutta
  metatieto varmennettu.
- **Lisenssi**: **CC BY 4.0**.
- **URL**: https://zenodo.org/records/20800572
- **Soveltuvuus**: **hyvä-erinomainen** — valmis vektoriaineisto, josta
  rakennetun alueen ääriviiva (konveksi peite / alpha-shape) on
  suoraviivaista laskea 1890-luvun Lontoolle ilman itse digitointia.

*Varmennettu 24.9.2026: Zenodo-tietueen metadata (zenodo.org/records/20800572),
lisenssikenttä luettu suoraan tietuesivulta.*

---

## 5. Rooma

### 5a. Serviuksen ja Aurelianuksen muurit (OpenStreetMap, ODbL)
- **Aurelianuksen muuri**: OSM-relaatio **10129640** ("Mura Aureliane"),
  134 jäsentä (way-segmenttejä), tagit mm. `historic=citywalls`,
  `historic:civilization=ancient_roman`, `wikidata=Q625149`,
  UNESCO-viite. **Valmis, käyttökelpoinen polygoni/viivarelaatio koko
  muurin kierrolle** — haettu suoraan `api.openstreetmap.org/api/0.6/
  relation/10129640.json`.
- **Serviuksen muuri**: ei löytynyt yhtä kokoavaa relaatiota — kartoitettu
  pirstaleisemmin yksittäisinä jäänteinä/way-kohteina (esim. Aventinuksen,
  Caeliuksen osuudet). Muurin täysi 4. vuosisadan eaa. kierto vaatii
  koostamista useista OSM-kohteista tai digitointia sekundäärilähteistä
  (esim. Platner-kartta, ks. 7).
- **Lisenssi**: OpenStreetMap = **ODbL 1.0** (Open Database License) —
  vakiolisenssi, jaa-samoin-ehdolla, hyväksytty omistajan säännöllä.
- **Overpass-malli**: Overpass-rajapinta torjui tässä ympäristössä
  automatisoidut POST-kyselyt (HTTP 406) — relaatio haettiin sen sijaan
  suoraan OSM:n omasta REST-API:sta (`/api/0.6/relation/<id>.json`),
  mikä toimii tuotannossa hyvin korvaavana reittinä jos Overpass-palvelin
  torjuu pyyntöjä.

*Varmennettu 24.9.2026: api.openstreetmap.org/api/0.6/relation/
10129640.json (suora API-vastaus, tagit ja jäsenmäärä luettu vastauksesta).*

### 5b. Nollin kartta 1748 (Pianta Grande di Roma)
- **PD-skannaus löytyi valmiina Wikimedia Commonsista**: "Nuova pianta di
  Roma data in luce da Giambattista Nolli l'anno MDCCXLVII" — Cleveland
  Museum of Artin kokoelmasta Internet Archiven kautta, **täysi levy
  14000×11956 px TIF**, **lisenssi: Public domain**.
- Stanfordin interaktiivinen/georeferoitu versio (nolli.stanford.edu)
  mainittiin hakutuloksissa "public domain" -lisenssillä, mutta sen omaa
  käyttöehtosivua ei tässä istunnossa avattu suoraan — käytä ensisijaisesti
  Commons-skannausta, joka on suoraan varmennettu, ja georeferoi se itse
  tunnetuilla maamerkeillä (esim. QGIS georeferointityökalu) kaupungin
  1748-rajan digitointia varten.
- **Soveltuvuus**: **hyvä** manuaaliseen digitointiin — korkea resoluutio,
  varmennettu PD, mutta ei valmiiksi georeferoitu/vektoroitu tässä
  löydetyssä versiossa.

*Varmennettu 24.9.2026: Wikimedia Commons API
(File:Nuova pianta di Roma… clevelandart-2020.276-nuova-pianta-di-roma.tif),
LicenseShortName = "Public domain".*

### 5c. Pleiades
- **Lisenssi**: **CC BY 3.0** — luettu pleiades.stoa.org/downloads-sivulta
  ("sharing and remixing permitted under terms of the Creative Commons
  Attribution 3.0 License").
- **Muodot**: JSON (suositeltu), CSV (QGIS-yhteensopiva), KML, RDF/Turtle.
- **Rooma mukana**: kyllä — paikka "Roma", Pleiades-tunniste **423025**,
  koordinaatit 12.4913°E, 41.8900°N — vahvistettu suoraan
  `pleiades.stoa.org/places/423025/json`-rajapinnasta.
- **Soveltuvuus**: välttävä-hyvä paikannimien/pisteiden ristiviittaukseen,
  ei sellaisenaan laajuuspolygoni.

*Varmennettu 24.9.2026: pleiades.stoa.org/downloads (lisenssiteksti) ja
pleiades.stoa.org/places/423025/json (Rooman tietue).*

### 5d. Digital Atlas of the Roman Empire (DARE)
- **Lisenssi**: **CC BY-SA 3.0** koko sisällölle — sekä data että
  karttatiilet — luettu suoraan DARE:n API-dokumentaatiosivulta
  (`imperium.ahlfeldt.se/print.php?doc=info_api`): "All content on the
  Digital Atlas of the Roman Empire (DARE) is published under the
  Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0) license."
- **GeoJSON-rajapinta**: `imperium.ahlfeldt.se/api/geojson.php`
  (bbox/piste/tunniste-parametrit, CORS-tuki).
- **Soveltuvuus**: hyvä roomalaisen valtakunnan paikkojen/teiden
  taustakerrokseksi, ei suoraan Rooman kaupungin laajuuspolygoni.

*Varmennettu 24.9.2026: imperium.ahlfeldt.se/print.php?doc=info_api.*

### 5e. Lanciani — Forma Urbis Romae
- Rodolfo Lancianin 1893–1901 46-arkkinen 1:1000-mittakaavainen
  arkeologinen kartta on **julkinen (PD)** — saatavilla mm. Wikimedia
  Commonsista (PDF-kokoversio "File:Rodolfo Lanciani - Forma Urbis Romae
  - Overview.pdf") ja PICRYListä yksittäisinä tauluina ilman
  attribuutiovaatimusta.
- **Soveltuvuus**: hyvä antiikin Rooman topografian taustaksi, ei
  suoraan ajallinen laajuuskartta vaan yksi aikaleike (n. 1. vuosis. jaa.
  rekonstruktio).

*Varmennettu 24.9.2026: Wikimedia Commons -tiedoston lisenssikenttä
(haettu hakutuloksena, PICRYL vahvistaa "public domain / free for
commercial use").*

### 5f. Rooman väkiluku vuosisadoittain
Ks. kohta 2 yllä — tarkat, lähteestä varmennetut CC BY 4.0 -arvot
Chandler/Modelski-datasta (100 000 asukasta 500 eaa. → n. 1 200 000
huipussaan n. 200 jaa. → 17 000 pohjalukema 1377 → 3 600 000 v. 1975).
Nämä ovat piste-väkilukuja, ei polygoneja.

---

## 6. GHSL Built-up (EU JRC)

- **Nimi**: GHS-BUILT-S R2023A (Global Human Settlement Layer, Built-up
  Surface Grid).
- **Ylläpitäjä**: Euroopan komission yhteinen tutkimuskeskus (JRC),
  yhdessä DG REGIOn ja DG DEFISin kanssa, Copernicus-ohjelman data
  (Sentinel-2, Landsat).
- **Aikakattavuus**: 1975–2030, 5 vuoden välein (multitemporaalinen).
- **Resoluutio**: **100 m ja 1 km**, projektio World Mollweide
  (EPSG:54009).
- **Muoto**: pakatut GeoTIFF:t — joko koko maailman tiedosto per
  tuote/epookki/resoluutio, tai 1000×1000 km Mollweide-laatat
  (nimeämiskäytäntö `R<rivi>_C<sarake>.zip`); 100 m -laattojen koko
  17–40 Mt/laatta. Arvot = ennustettu rakennettu ala (m²) per solu.
- **Lisenssi**: **CC BY 4.0** — luettu suoraan JRC:n
  "Use conditions and how to cite" -sivulta
  (`human-settlement.emergency.copernicus.eu/GHSLhowToCite.php`):
  sallii kopioinnin, jakelun, muokkauksen ja kaupallisen käytön kunhan
  lähde mainitaan (viittaus Pesaresi ym. 2024 -julkaisuun).
- **URL**: https://human-settlement.emergency.copernicus.eu/ghs_buS2023.php
- **Soveltuvuus**: **hyvä** — valmis rasterikerros nykyaikaisen
  kaupunkilaajuuden animointiin 1975→2030, mutta ei ulotu kauas
  historiaan (vain 50 vuotta).

*Varmennettu 24.9.2026:
human-settlement.emergency.copernicus.eu/GHSLhowToCite.php (lisenssiteksti)
ja ghs_buS2023.php + hakutulosten tekninen dokumentaatio (resoluutio,
laattakoko).*

---

## 7. Wikimedia Commons — koonti PD-kartoista

Kaikki alla varmennettu suoraan Commons-API:sta
(`commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&
iiprop=extmetadata`), ei hakukoneen tulkintana:

| Tiedosto | Kaupunki | Lisenssi | Koko (px) |
|---|---|---|---|
| File:Platner - Ancient Rome city growth.jpg | Rooma | Public domain | 750×729 |
| File:Map of ancient Rome.svg | Rooma (Servius+Aurelianus-muurit) | **CC0** | 1481×1424 |
| File:Nuova pianta di Roma…Nolli…(clevelandart).tif | Rooma (Nolli 1748) | Public domain | 14000×11956 |
| File:London plan 1300.jpg | Lontoo | Public domain | 1140×902 |
| File:London c.1381, plain map.png | Lontoo | Public domain | 800×492 |
| File:London vicinity 1200 1600.jpg | Lontoo | Public domain | 1136×910 |
| File:London core settlements c.1560.jpg | Lontoo | CC BY-SA 4.0 | 2371×1612 |
| File:London 1815 map.jpg | Lontoo | Public domain | 8534×5571 |
| File:Civitas Londinum…Vertue…1737 (1 of 8).jpg | Lontoo (Agas/1561) | Public domain | 6539×4538 |

*Varmennettu 24.9.2026: Wikimedia Commons API, kenttä
`imageinfo[0].extmetadata.LicenseShortName.value` luettu jokaiselle
tiedostolle erikseen.*

---

## Yhteenveto ja ehdotus: 6–12 aikaleikettä Roomalle ja Lontoolle

Periaate: käytä valmista geodataa (OSM, GHSL, Zenodo-rakennusjalanjäljet,
HYDE 3.2) niiltä aikakausilta kun sellaista on, ja digitoi loput itse
varmennetuista PD-kartoista (Commons/Nolli/Vertue).

### Rooma — ehdotetut leikkeet
1. **n. 750 eaa.** (perustaminen) — ei valmista geodataa; pieni
   arvioitu piste/polygoni sekundäärilähteistä (esim. Palatinus-kukkula),
   merkitään selvästi arvioksi.
2. **n. 378 eaa.** (Serviuksen muuri) — digitoi OSM:n hajanaisista
   muurijäänteistä + "Map of ancient Rome.svg" (CC0) referenssinä.
3. **n. 200 jaa.** (huippuväkiluku, Aurelianuksen muurin alue jo
   asuttu vaikka muuri valmistui myöhemmin 271–275) — **valmis OSM-
   relaatio 10129640** antaa suoraan polygonin (ODbL).
4. **1748** — digitoi Nollin PD-kartan (Commons, 14000×11956 px)
   rakennetun alueen raja itse georeferoimalla.
5. **1871** (Italian pääkaupunki) — HYDE 3.2 -hila (CC0) taustaksi +
   tunnettu asutusalue sekundäärilähteistä.
6. **1930–1950** — HYDE 3.2 -hila (CC0), viimeiset kattavat vuodet.
7. **2020-luku** — **GHSL Built-up 2020/2025** (CC BY 4.0), valmis
   rasteri.

→ 3 valmista geodataleikettä (Aurelianus/OSM, HYDE-hila×2, GHSL),
loput (750 eaa., 378 eaa., 1748, 1871) vaativat itse digitointia PD-
lähteistä tai arviointia sekundäärikirjallisuudesta.

### Lontoo — ehdotetut leikkeet
1. **n. 200 jaa.** (Londinium, roomalaismuuri) — OSM-pisteet
   hajanaisia; digitoi kokonaisuus sekundäärilähteistä (esim. Museum
   of London -julkaisut) tai Commons-kartoista.
2. **1300** — digitoi Commons "London plan 1300.jpg" (PD).
3. **1560** — digitoi Commons "London core settlements c.1560.jpg"
   (CC BY-SA 4.0) tai Vertuen 1737 Agas-kopio (PD, korkea resoluutio).
4. **1815** — digitoi Commons "London 1815 map.jpg" (PD, 8534×5571,
   riittää tarkkaan digitointiin).
5. **1891–1896** — **valmis vektoriaineisto**: Zenodo-rakennusjalanjäljet
   (CC BY 4.0) → laske alueen ääriviiva (alpha-shape) suoraan, EI
   manuaalista digitointia tarvita.
6. **1950–1970** — HYDE 3.2 -hila (CC0) tai virallinen "Greater London
   Built-up Area" -raja (tarkista ONS/ArcGIS-lisenssi erikseen, ei
   varmennettu tässä selvityksessä).
7. **2020-luku** — **GHSL Built-up** (CC BY 4.0), valmis rasteri.

→ 2 valmista geodataleikettä sellaisenaan (Zenodo 1891-96, GHSL nykyaika),
HYDE-hila taustaksi, loput (Londinium, 1300, 1560, 1815) digitoidaan PD-
kartoista.

### Ei-varmennetut/hylätyt kohdat, jotka pitää tarkistaa erikseen manuaalisesti
- **Layers of London** — koko sivusto oli tässä istunnossa botti-torjunnan
  (Anubis+CAPTCHA) takia lukukelvoton; kerroskohtainen lisenssi
  tarkistettava käsin selaimella ennen minkään sen kerroksen käyttöä.
- **National Library of Scotland** — samasta syystä (405/CAPTCHA)
  lisenssiä ei voitu lukea suoraan; toissijaiset lähteet viittaavat
  "CC-BY (NLS)":ään mutta osa on in-copyright ja vaatii tilauksen.
- **MoEML Agas-kartta** — varmennettu **CC BY-NC-SA 4.0 → HYLÄTTY**;
  käytä sen sijaan PD Vertue 1737 -kopiota Commonsista.
- **HYDE 3.3** — varmennettu **CC BY-NC-SA 4.0 → HYLÄTTY**; käytä HYDE
  3.2:ta (CC0), joka kattaa vain vuoteen 2017 mutta on täysin avoin.
- **SEDACin uudelleenjulkaisema Reba-data** — todennäköisesti NC;
  käytä alkuperäisiä Figshare-tiedostoja (varmennettu CC BY 4.0).
