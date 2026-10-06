# Ruotsin avoin 3D-data: Visbyn innerkaupunki (Stora torget 57.6393 N, 18.2948 E)

Tehty 7.10.2026 (UTC 6.10. illalla). Vain lukemista: ei kirjautumista, ei tiedostolatauksia (vain HTTP HEAD-kutsut ja pienet julkiset metadata-JSONit), ei committeja.
Merkinnät: **V** = vahvistettu lähteestä luettuna (URL mukana), **A** = arvio.

---

## 1. Lantmäteriet

### 1.0 Yleiskuva, lisenssi ja pääsy (koskee kaikkia alla olevia)

- V: Lantmäteriet julkaisee lataustuotteet kolmella avoimella STAC-katalogilla, joiden metadata on luettavissa ILMAN kirjautumista (access-control-allow-origin: *):
  - korkeus: https://api.lantmateriet.se/stac-hojd/v1/ (kuvaus: "avgiftsfria ... CC BY 4.0")
  - ortokuvat: https://api.lantmateriet.se/stac-bild/v1/ (kuvaus: CC BY 4.0, "användningen prövas juridiskt enligt GDPR, du behöver godkänna särskilda användningsvillkor")
  - vektori: https://api.lantmateriet.se/stac-vektor/v1/ (CC BY 4.0; "för vissa informationsmängder prövas användningen enligt fastighetsregisterlagen ja/tai GDPR, särskilda användningsvillkor")
- V: Itse tiedostot eivät lataudu ilman tunnuksia. Testasin HEAD-kutsulla viisi dl1.lantmateriet.se-osoitetta (DTM 1 m, DTM-ruutu, piste­pilvi, ortokuva 2026, ortokuva Visby 2011) ja byggnad-zipin: kaikki palauttivat `401 Unauthorized`, `www-authenticate: Basic realm="Authorization Server"`.
- V: Lantmäteriän oma lataus­ohje: "Innan guiden kan användas behöver produkten ha beställts via Geotorget och behörighet till produkten finnas ... Autentisera dig med användarnamn och lösenord. Privata användare anger inloggningsuppgifter för Geotorget. Organisationsanvändare autentiserar sig med det systemkonto som behörigheten till produkten finns på." (https://www.lantmateriet.se/contentassets/6b85c93c6954407e855c896da5a415f2/guide_radiant_earth_markhojdmodell.pdf)
- V: Geotorgetin sovelluskoodista (https://geotorget.lantmateriet.se/geodataprodukter/assets/index-CkIQ2s_B.js): sivulla on "Logga in", "Skapa konto" ja "Fortsätt som gäst"; teksti "Logga in för att använda Geotorget ... Som inloggad användare kan du bland annat beställa Lantmäteriets geodataprodukter, ansöka om att teckna avtal ...". Eli ilmainen tili ja tuotteen tilaus (beställning) tarvitaan ennen latausta.
- A: Yksityishenkilön Geotorget-tili + ilmainen tilaus riittää CC BY -tuotteiden lataukseen (STAC-selain tai skripti Basic-authilla). Yritystili/sopimus (avtal) ei näytä olevan pakollinen avoimille tuotteille, mutta GDPR-tuotteissa (ortokuva, rakennukset, pistepilvi) käyttötarkoitus on kuvattava hakemuksessa (ks. 1.6).
- Latausreitit: V STAC (yllä) + Geotorget Beställning; sitemapin mukaan tuotteet mm. "markhojdmodell-nedladdning-grid-50", "ythojdmodell-nedladdning", "byggnad-nedladdning-vektor", "topografi-10-nedladdning-vektor", "ortofoto-historiska-nedladdning" (https://geotorget.lantmateriet.se/geodataprodukter/sitemap.xml). A: ATOM-syöte ja WMS/WMTS-rajapinnat ovat olemassa (OAuth-avaimin, ei tutkittu tarkemmin).

### 1.1 Lisenssiristiriita: CC0 vai CC BY 4.0

- V: Lantmäteriän englanninkielinen avoimen datan sivu sanoo edelleen CC0 ja että lähdemaininta on vapaaehtoinen (https://www.lantmateriet.se/en/geodata/our-products/open-data/). Sivu viittaa Geotorgetin tuotelistaan.
- V: Mutta kaikki kolme STAC-katalogia (korkeus, kuva, vektori) ja jokainen Visbyn kohdalla löytynyt kokoelma on merkitty `license: CC-BY-4.0`. Pistepilvi (Laserdata Skog) on merkitty `other` ja linkki johtaa käyttöehtoihin, jotka ovat CC BY 4.0 + GDPR-ehto (alla).
- V: Käyttöehdot "värdefulla datamängder" (päivätty 2025-02-01, DNR LM2025/009266): "Geodataprodukterna tillgängliggörs enligt licensen CC BY 4.0 ... får fritt använda, sprida, göra om, modifiera och bygga vidare på informationen även i kommersiella sammanhang." (https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/anvandningsvillkor_for_vardefulla_datamangder.pdf). Perustuu lakiin 2022:818 (öppna datalagen).
- A: CC0-sivu on vanhentunut tai koskee vain osaa tuotteista; kaikki tässä tarvittavat tuotteet ovat nykyisin CC BY 4.0. Suunnittele CC BY 4.0:n mukaan (turvallisempi).
- Vaadittu tekijämaininta (V, sama PDF kohta 3.1): kun julkaiset tai levität tuotetta tai sen jäljennöstä, ilmoita (a) datan lähde tuotteen nimellä, (b) ©Lantmäteriet, (c) että tietoa on käsitelty (jos on), (d) että CC BY 4.0 koskee kyseistä tuotetta. Jos ei käytännöllistä suoraan datan yhteydessä, saa antaa mukana tulevassa dokumentaatiossa, metadatassa tai linkillä.
- A: Pelin Tekijät/Lähteet-ruutu + malli-ämpärin LAHTEET-tiedosto riittää "dokumentaatio"-vaatimukseen.

### 1.2 Laserkeilaus (pistepilvi)

- V: Visbyn Stora torgin kohdalta STAC (stac-hojd) palauttaa pistepilven `dsm-skoglig-copc` = "Laserdata Skog", kohde `24e003-639_69`, keilaus 2024-03-16, formaatti COPC/LAZ, tiedosto 491 414 413 tavua (~469 Mt, yli 50 Mt:n rajan, EI ladattu). Metadata (julkinen): https://dl1.lantmateriet.se/hojd/pub/pointcloud/sls/24e003/m24e003-639_69_info.json
- V: Mitattu tiheys tälle ruudulle: `density` 1,54 pistettä/m², keskimääräinen pisteväli 0,81 m, pinta-ala 56,5 km². Koordinaatisto SWEREF99 TM + RH2000 (EPSG:5845).
- V: Tuotteen dokumentaatio (Laserdata Nedladdning, skog, https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/hojddata/pb_laserdata_nedladdning_skog.pdf): suunniteltu tiheys 1-2 pistettä/m²; luokat 1 luokittelematon, 2 maa, 7 matala kohina, 9 vesi, 17 silta (vain taso 3), 18 korkea kohina. Ei omaa rakennusluokkaa (rakennukset jäävät luokkaan 1).
- V: Käyttöehdot (päivätty 2026-05-20, DNR LM2026/077164): CC BY 4.0, mutta lisäksi kohta 4: aineisto "kan innehålla personuppgifter enligt GDPR"; "Licenstagaren är personuppgiftsansvarig enligt GDPR" (https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/anvandningsvillkor-for-laserdata-nedladdning-skog.pdf). Lantmäteriet voi sulkea pääsyn ilman perustetta (kohta 5.2).
- Laserdata NH (0,5-1 pistettä/m², luokat maa/vesi/silta/luokittelematon, LAZ): V tiedon tuotteen olemassaolosta hakutuloksista (https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/hojddata/pb_laserdata_nedladdning_nh.pdf, sivu ei auennut, luin vain hakutuloksen tiivistelmän), A: Visbyn kohdalla STAC antaa vain Skog-version, jonka tiheys on parempi, joten NH:ta ei tarvita.
- A: 1,5 p/m² ja 0,8 m:n pisteväli riittää kattokorkeuksiin ja suuriin kattopintoihin (harja, räystäs, harja­suunta), mutta ei kapeiden (2-4 m) kujien julkisivuihin eikä pieniin yksityiskohtiin kuten tornien rintavarustukseen. Ei automaattista LOD2-mallia ilman käsin korjausta.

### 1.3 Korkeusmalli (Markhöjdmodell)

- V: STAC-kokoelma `dtm-cog` "Markhöjdmodell", 1 m ruudukko, GeoTIFF/COG, CC-BY-4.0 (https://api.lantmateriet.se/stac-hojd/v1/collections/dtm-cog). Lisäksi aluekohtainen `mhm-63_6` (Gotland kuuluu tähän; asiasanat Gotland), sama 1 m ruudukko.
- V: Stora torgin kohdalla kaksi vaihtoehtoa: (a) `63925_6950_25.tif` 2,5 km:n ruutu, 4 550 530 tavua (4,3 Mt, pieni), mittauspäivä 2024-02-03, luftburen laserskanning, sijaintivarmuus taso 0,3 m, korkeus 0,1 m (https://dl1.lantmateriet.se/hojd/pub/grid1m/63_6/55/63925_6950_25_ursprung.json); (b) `m639_69.tif` 86 Mt (yli rajan), item 2025-03-07, mukana myös katkoviivat (brytgeometri GPKG, 172 kt).
- V: 50 cm:n malli on olemassa tuotteena Geotorgetin sitemapin mukaan (markhojdmodell-nedladdning-grid-50) mutta ei STAC-katalogissa; A: tilataan Geotorget Beställning -reittiä, ei varmistettu kattaako Visbyn.
- V: Ythöjdmodell (pintamalli) nedladdning on listattu sitemapissa; A: ei STAC-kokoelmaa Visbylle, joten pintamalli johdetaan pistepilvestä.
- Lisenssi: V CC BY 4.0 (yllä). Muoto: V GeoTIFF/COG. Kirjautuminen: V 401 ilman tunnuksia.

### 1.4 Rakennukset (Byggnad / Topografi 10)

- V: STAC-kokoelma `byggnader` ("Byggnader kommunindelat i geopackage"), CC-BY-4.0. Visbyn kohdalla item 0980 "Byggnader för Gotlands kommun", `byggnad_kn0980.zip`, 13 219 292 tavua (12,6 Mt), päivitetty 2026-10-02, EPSG:3006 (https://api.lantmateriet.se/stac-vektor/v1/search?collections=byggnader&bbox=18.294,57.639,18.295,57.6396). Lataus: 401, vaatii Geotorget-tunnukset.
- V: Tuote "Byggnad Nedladdning, vektor": rakennukset ja laitokset (kaksi hakutulosta: "four layers" vs "nine layers" eri versioissa), vastaa Topografi 10 -teemoja rakennusrakenteet/laitosalueet/lentokentät, sopii mittakaavaan 1:5 000-1:20 000 (hakutulos, tuotedokumentti ei auennut: https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/pb-byggnad-nedladdning-vektor.pdf palautti 404).
- A: Geometria on 2D-pohjapiirros (polygonit + pisteet pienille rakennuksille) tyyppitiedolla; ei korkeus- eikä kattomuotokenttää. Ei 3D:tä. Korkeus saadaan pistepilvestä/DTM:stä (nDSM = pintamalli miinus maa).
- V: Lantmäteriän "Byggnader i NGP" -dokumentti ja kansalliset LOD-määritykset (NS LOD 0/2.1/2.2/2.3) ovat määrityksiä; A: avointa valtakunnallista 3D-rakennusmallia (LOD1/LOD2) ei ole ladattavissa, enkä löytänyt sellaista STAC-katalogeista (vain höjd/bild/vektor/karta; karta = topowebb, militärkartor).
- GDPR: A: Byggnad-tuote kuuluu "personuppgifter"-ehtoihin (OSM-yhteisön keskustelussa Lantmäteriet on perustellut CC BY + lisäehdot rakennus- ja osoitetiedon henkilötieto­riskillä; https://community.openstreetmap.org/t/oppna-data-fran-lantmateriet/72615/110, ei itse varmennettu tuotekohtaisesti).

### 1.5 Ortokuvat (Ortofoto)

- V: Visbyn kohdalla STAC (stac-bild) palautti 25 kuvaa. Uusin: `orto-f2-2026` (kuvattu 2026-04-12, Gotland F2), sitten 2024, 2022, 2020, 2018, 2016, 2014, 2012, 2010 sekä erilliset Visby-taajamaortot 2011 ja 2008 (`orto-visby-2011` bbox 18.22-18.40 E, 57.58-57.70 N) ja historialliset 1958-2003. Kokoelmalisenssi CC-BY-4.0.
- V: Tiedostokoko: 2026 F2 -ruutu 601 205 507 tavua (~573 Mt), Visby 2011 ~141 Mt (kaikki yli 50 Mt, EI ladattu). Muoto GeoTIFF/COG (RGB; `i` = infrapuna-versio erikseen).
- A: Resoluutio: kansiotunnus `se0_16m_sweref` viittaa 16 cm:n pikseliin (2020-luvun F2), `se0_25*` 25 cm:iin (2014-2018), `se0_5*` 50 cm:iin (2007-2012). Ei vahvistettu tuotedokumentista (sivu 404).
- V: STAC-kuvaus: "Din användning kommer att prövas juridiskt, i enlighet med dataskyddsförordningen (GDPR), och du behöver godkänna särskilda användningsvillkor."
- V: Käyttöehdot henkilötietoja sisältäville arvokkaille tietoaineistoille (v1.1, 2025-03-04, https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/anvandningsvillkor_for_vardefulla_datamangder_pu.pdf): CC BY 4.0 + käyttäjä on henkilötietojen rekisterinpitäjä; saa käsitellä vain hakemuksessa ilmoitettuihin tarkoituksiin, jotka Lantmäteriet on hyväksynyt päätöksellä (3.3); vain tarpeellinen maantieteellinen valinta (3.4); tallennus vain EU/ETA:ssa, yhdysvaltalainen pilvi vain jos EU-USA Data Privacy Framework -päätös voimassa ja toimittaja mukana (3.5); Lantmäteriet voi tehdä pistokokeita ja peruuttaa päätöksen (4.1-4.2).
- A: Tämä PU-ehto koskee ortokuvaa (STAC kertoo GDPR-käsittelystä) ja todennäköisesti rakennuksia; hakemuksessa kerrottava "kaupallinen mobiilipeli, johdetut 3D-mallit/tekstuurit julkisessa pilviämpärissä".

### 1.6 Muu Lantmäteriet

- V: Topografisk webbkarta (raster, offline-käyttöön) CC-BY-4.0 stac-karta-katalogissa; militärkartat (nmk50/nmk250) lisenssi `other`, ei käyttöön.
- V: Fastighetsindelning, belägenhetsadresser, marktäcke (maanpeite!), ortnamn (paikannimet) CC-BY-4.0 stac-vektor-katalogissa. A: Marktäcke (kommunindelat GPKG) on hyödyllinen kasvillisuus/nurmi/vesi-maskiksi; ortnamn nimistöön (ei historiallisia).

---

## 2. Region Gotland / Riksantikvarieämbetet (RAÄ)

- V: RAÄ:n avoin data -portaalissa lukee "( CC0 )" ja "Här kan du ladda ned och få information om Riksantikvarieämbetets öppna data och API:er" (https://www.raa.se/hitta-information/oppna-data/). Portaali: https://www.raa.se/hitta-information/oppna-data/oppna-data-portal/.
- V: Bebyggelseregistret (BeBR): "You are free to use the text in the database under the Creative Commons license CC0. ... photographs ... license and photographer's name beneath each photograph. ... available in various formats, like WMS, WFS and geopackage" (https://www.raa.se/in-english/digital-services/about-bebr/). Eli teksti CC0, kuvilla oma lisenssi (tarkista kuvakohtaisesti), geodata WMS/WFS/GeoPackage.
- V: BeBR sisältää n. 85 000 hakukelpoista kohdetta (lokakuu 2025), joista n. 13 000 byggnadsminne/kyrkominne (määrä RAÄ:n hakutuloksesta, ei itse varmennettu; lisenssi- ja formaattitiedot luettu sivulta https://www.raa.se/?p=61824).
- V: Visby ringmur on fast fornlämning (Kulturmiljöregistret/Fornsök, RAÄ), mutta Fornsökin ja K-samsökin tarkkaa lisenssiä ja pistegeometrian laatua en varmentanut.
- A: RAÄ:n data on attribuutti- ja sijaintitietoa (pisteet tai alueet, historiatekstit, suojelustatus), EI 3D-malleja eikä rakennuskorkeuksia. Käyttö: kohteiden valinta, nimet, historiallinen taustateksti (CC0-tekstit sellaisenaan käyttökelpoisia). Latausportaali ei näyttänyt vaativan tiliä (A, ei testattu tiedoston latauksella).
- V: RAÄ:n 3D-ohjeessa mainitaan vain suositus julkaista 3D-malleja Sketchfabiin tai Wikimedia Commonsiin; ei omia aineistolistauksia (https://www.raa.se/in-english/outreach-and-exhibitions/guide-for-publishing-3d-models/). Ei Visby-3D-mallia.
- Region Gotland: V Gotland.se:n karttatiimi tuottaa dronekuvista 3D-malleja suunnitteluun ja "public can see" -visualisointeja (https://govlaunch.com/projects/gotland-se-creates-immersive-planning-experiences-with-3d-models-based-on-drone-imagery). En löytänyt julkaistua avoimen datan latausta, lisenssiä enkä dataportal-hakemistoa; gotland.se/oppnadata ohjasi tavalliselle tilastosivulle. A: Visbyn kaupungin 3D-malli on katseltavissa, mutta ei ole ladattavissa vapaalla lisenssillä; kysy (regiongotland@gotland.se, V yhteystieto https://gotland.se) jos halutaan.
- V: Visby on UNESCO-kohde vuodesta 1995, Region Gotlandilla on maailmanperintökoordinaattori (https://www.lansstyrelsen.se/gotland/besoksmal/kulturmiljoer/visby-innerstad.html). A: Ei 3D-skannauksia avoimena.

---

## 3. OpenStreetMap (Overpass, 6.10.2026 22.11 UTC, tietokannan aikaleima 22.11)

Kyselyt: https://overpass-api.de/api/interpreter (POST, User-Agent pakollinen, muuten 406). Kysely 1: bbox 57.63795,18.2923,57.64065,18.2973 (~300 x 300 m, Stora torget keskellä). Kysely 2 (koko innerstad + ympäristö): 57.632,18.280,57.648,18.305.

### 3.1 Rakennukset, 300 x 300 m Stora torgin ympäriltä (V, laskettu)

| Mittari | Määrä | Osuus |
|---|---|---|
| building-alueet yhteensä | 167 | 100 % |
| building:part (Simple 3D Buildings -osat) | 0 | 0 % |
| height | 0 | 0 % |
| building:levels | 40 | 24 % |
| roof:levels | 36 | 22 % |
| roof:shape | 0 | 0 % |
| roof:height / roof:material / roof:colour | 0 / 0 / 0 | 0 % |
| building:material | 0 | 0 % |
| addr:housenumber | 20 | 12 % |
| start_date | 0 | 0 % |
| nimi (name) | 5 | 3 % |
| wikidata | 3 | 2 % |

Rakennustyypit: house 80, yes 70, apartments 6, retail 3, school 2, residential 2, ruins 1, office 1, hotel 1, church 1 (V). Kerrosmäärä: 1 krs 13, 2 krs 16, 3 krs 8, 4 krs 3.

### 3.2 Laajempi alue (57.632-57.648, 18.280-18.305, sisältää innerstadin ja ulkopuolista) (V)

- 1 573 rakennusta; height 1 (vain Visby vattentorn, 42 m); building:levels 175 (11 %); roof:levels 149 (9 %); roof:shape 14 (0,9 %: 12 gabled, 1 pyramidal, 1 many); building:part 0; building:material 11; wikidata 23; historic 13.
- Rakennustyypit: yes 976, house 383, apartments 47, detached 29, residential 23, garage 22, retail 17, tower 12, school 7, ruins 7, hotel 7.
- Johtopäätös (A): OSM antaa hyvän pohjapiirron (167 / 1 573 rakennusta), mutta kattomuotoa ja korkeutta ei käytännössä ole; Simple 3D Buildings -osia ei ole yhtään. building:levels on käyttökelpoinen karkeana korkeusarviona (n. 3 m/krs) vain 11-24 %:lle rakennuksista. Kaikki muu korkeus on johdettava laserdatasta.

### 3.3 Kaupunginmuuri (Ringmuren) ja tornit OSM:ssä (V, laskettu)

- Muuri: relaatio 14377275 "Visby ringmur" (wikidata Q1474383, `name:fi=Kehämuuri`) + 12 `barrier=city_wall` -viivaa (mm. 455294736, 471666618, 1120321665 nimellä "Ringmuren", Valdemarsmuren 1251166884). Muuri on siis mallinnettu, mutta ilman korkeutta (height/min_height 0).
- Portit: 15 solmua `historic=city_gate` tai portti-entrance: Söderport, Österport, Norderport, Snäckgärdsporten, Sankt Göransporten, Fiskarporten, Dalmansporten, Donnersporten, Lilla Strandporten, Skansport, Kärleksporten, Brunnsporten, Kejsarporten jne. Ne ovat pisteitä, ei 3D.
- Tornit: 12 `building=tower` + `man_made=tower` + `tower:type=defensive` -aluetta: Kruttornet (roof:shape=pyramidal), Snäckgärdstornet, Silverhättan, Dalmanstornet (roof:shape=gabled, ruins), Kejsartornet (gabled), Stor Cristin, Jungfrutornet (wikidata Q19784841), Långa Lisa (building:levels=6), Tranhustornet, 3 nimeämätöntä (yksi Österportin ruiini).
- Vertailu: V Wikipedia: nykyisin säilynyt 27 maatornia (marktorn) ja 9 satulatornia (sadeltorn), alun perin 29 + 22-23; muuri 3,4-3,6 km, korkeus jopa 11 m (https://sv.wikipedia.org/wiki/Visby_ringmur). OSM:ssä 12 tornia / 36 säilynyttä = noin 33 % kattavuus (A, koska nimeämättömien tornien täydellinen vastaavuus ei varmistettu).
- Johtopäätös (A): Muurin linja ja nimetyt portit riittävät sijoitteluun, mutta tornien kattavuus on vajaa ja muurin korkeus/paksuus puuttuu; tornit ja muuri kannattaa mallintaa käsin Wikipedia/RAÄ-tietojen ja Lantmäteriän pistepilven (muurin harja ~ jopa 11 m) perusteella.

### 3.4 OSM-lisenssi

- A: ODbL 1.0, tekijämaininta "© OpenStreetMap contributors" ja share-alike tietokannalle. Jos pelin datassa jaetaan OSM:stä poimittua geometriaa sellaisenaan (esim. rakennuspohjat JSONina julkisessa ämpärissä), se on todennäköisesti johdettu tietokanta, jonka pitäisi julkaista ODbL:llä. Pelkkä käsin mallinnettu 3D-malli, jossa OSM oli vain ohjeena, on "produced work" (vain attribuutiovelvoite). Tulkintaa ei ole varmistettu lakimiehellä.

---

## 4. Suositus pelikäyttöön (kaupallinen mobiilipeli, mallit julkisessa ämpärissä)

1. Ensisijainen runko: Lantmäteriän CC BY 4.0 -aineisto (maa, korkeus, rakennukset, pistepilvi). Se sallii kaupallisen käytön ja jaon, kunhan tekijämaininta tehdään. Pidä CC BY 4.0 lähtöoletuksena äläkä nojaa vanhaan "CC0"-tekstiin.
2. Mitä ladataan (kun omistaja on luonut Geotorget-tilin ja tilannut tuotteet):
   - Markhöjdmodell 1 m, ruutu 63925_6950_25 (4,3 Mt, 2024, ±0,1 m korkeus). Ei GDPR-ongelmaa (A, mutta tuote kuuluu samaan CC BY -käyttöehtoon).
   - Byggnader Gotlands kommun (12,6 Mt GPKG): pohjapiirrot.
   - Laserdata Skog -pistepilvi 24e003-639_69 (469 Mt, 1,5 p/m²): rakennuskorkeudet ja kattoharjat; leikkaa Visbyn innerstad (~1 km²) ja jätä loput pois (ehdon 3.4 "vain tarpeellinen alue").
   - Ortofoto F2 2026 tai 2024 (~570 Mt/ruutu): vain tekstuuri- tai väriviitteeksi, EI julkaista sellaisenaan.
3. Johdettu 3D (A): rakennuspohja (Lantmäteriet tai OSM) + nDSM (pistepilvi miinus DTM) antaa kattokorkeuden, harjan suunnan ja karkean kattomuodon; tornit, portit ja ringmur mallinnetaan käsin (OSM antaa vain 12/36 tornia, ei korkeutta); julkisivut tyylitellään omilla tekstuureilla. 1,5 p/m² ei riitä julkisivuun.
4. Tekijämaininta (kopioi peliin ja LAHTEET.md:hen): "Korkeusmalli, Laserdata Nedladdning skog, Byggnad Nedladdning vektor: © Lantmäteriet, bearbetad, CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Karttatiedot: © OpenStreetMap contributors, ODbL." RAÄ:n teksti CC0 (maininta vapaaehtoinen, suositeltava).
5. Riskit:
   - R1 (tärkein): GDPR-ehdot. Pistepilven ehdon 4.2 mukaan käyttäjä on rekisterinpitäjä; ortokuvan/rakennusten PU-ehdossa hakemus ja Lantmäteriän päätös rajaavat käyttötarkoituksen ja tallennuksen EU/ETA:han. Pidä julkinen ämpäri EU-alueella tai varmista Data Privacy Framework -yhteensopivuus (A). Kirjaa hakemukseen "johdetut tyylitellyt 3D-mallit", ei raakadatan uudelleenjulkaisua.
   - R2: Pääsyn sulkeminen ilman perusteita (ehdot 4.2/5.2) ja yksipuoliset ehtomuutokset; säilytä oma kopio johdetuista malleista, kirjaa aineiston versio ja ehtojen päiväys (V: 2025-02-01, 2025-03-04, 2026-05-20).
   - R3: Lisenssi-ilmoitus on ristiriitainen (CC0-sivu vs CC BY STAC); jos halutaan varmuus, kysy geodatasupport@lm.se (A, osoite hakutuloksesta).
   - R4: Ortokuvissa näkyy henkilöitä ja ajoneuvoja; älä julkaise ortokuvan tekstuureja, käytä vain väripalettia tai käsinmaalattuja tekstuureja.
   - R5: OSM ODbL -share-alike, jos OSM-geometriaa jaetaan sellaisenaan.
   - R6: Region Gotlandin/Riksantikvarien 3D-malleja ei ole avoimena; älä oleta niitä saatavan.
6. Seuraava askel (omistajan toimi): luo Geotorget-tili ja tilaa ilmaiset tuotteet (Markhöjdmodell, Byggnad Nedladdning vektor, Laserdata Nedladdning skog, Ortofoto); minä en kirjaudu enkä luo tiliä. Tämän jälkeen putki voidaan ajaa STAC-haulla (bbox 18.290,57.634,18.302,57.646 kattaa innerstadin).

## Lähteiden pikalista

- https://api.lantmateriet.se/stac-hojd/v1/ , /stac-bild/v1/ , /stac-vektor/v1/ , /stac-karta/v1/
- https://www.lantmateriet.se/en/geodata/our-products/open-data/
- https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/anvandningsvillkor_for_vardefulla_datamangder.pdf
- https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/anvandningsvillkor_for_vardefulla_datamangder_pu.pdf
- https://www.lantmateriet.se/globalassets/geodata/geodataprodukter/anvandningsvillkor-for-laserdata-nedladdning-skog.pdf
- https://www.lantmateriet.se/contentassets/6b85c93c6954407e855c896da5a415f2/guide_radiant_earth_markhojdmodell.pdf
- https://www.raa.se/hitta-information/oppna-data/ , https://www.raa.se/in-english/digital-services/about-bebr/
- https://sv.wikipedia.org/wiki/Visby_ringmur
- https://overpass-api.de/api/interpreter (kyselyt ja tulokset väliaikaisia, ei säilytetty)
