# Datalähteet linsseille: julkiset ja avoimet aineistot maapallolle (24.9.2026)

*Selvitys omistajan tilauksesta (loki 24.9.2026: "datalähteiden selvitys"). Tekijä on Opus-agentti Fablen pyynnöstä.
Lisenssit on tarkistettu verkosta 24.9.2026 klo 10.30–11.15 (WebSearch/WebFetch). Kohdat, joita en saanut
varmistettua alkuperäissivulta, on merkitty **tarkistettava**. Tämä on pelkkä selvitys, ei päätös.
Sitovat linjaukset tekee Fable (Raamattu, Karttalinssit).*

Lähtökohdat:
- Peli ei ole avointa lähdekoodia (kaikki oikeudet pidätetään); se on ilmainen ja rahaa kerätään vain lisätoiminnoista (omistaja 24.9.). Media on vain PD- tai CC-lisensoitua tai avointa dataa attribuutiolla.
- Data esiprosessoidaan kerran ja striimataan pelin omasta ämpäristä (kuten `virta/maapallon-tila/`).
- Fablen päätös 24.9. (Maapallon tila -suunnitelma): **ei Earthdata-tunnusta eikä muita uusia tunnuksia** ilman erillistä
  lupaa. Siksi merkitsen jokaiseen lähteeseen, tarvitaanko kirjautuminen tai avain.
- Lisenssiluokat tässä raportissa:
  - **Avoin**: PD, CC0, CC BY, OGL, Etalab 2.0 tai "vapaa, viittaus ehtona".
  - **Avoin, jakoehto**: ODbL, CC BY-SA tai GPL. Käyttö on sallittua, mutta johdettu tietokanta jaetaan samalla ehdolla.
  - **Rajoitettu (NC)**: ei-kaupallinen, esimerkiksi CC BY-NC tai oma käyttöehto. Peli on ilmainen, mutta NC ei ole
    projektin määritelmän mukaan avoin. **Ei käytetä ilman omistajan päätöstä.**
  - **Suljettu**: uudelleenjakelu kielletty tai vaatii kirjallisen luvan.

Omistajan esimerkki (X, @milos_gis: metsäpalot ja aerosolit Euroopassa 3 kuukauden ajalta) perustuu todennäköisesti
NASA FIRMS -paloaineistoon ja Copernicus CAMS -aerosolikenttään. En pystynyt varmistamaan tätä, koska X ei aukea
työkaluille. Molemmat lähteet ovat alla (luku 2.5), ja niille on oma linssi-ideansa (luku 4, #1–2).

---

## 1. Tiivistelmä: 15 tärkeintä lähdettä

1. **NASA GIBS (WMTS)** on satojen valmiiden kerrosten kanava ilman kirjautumista: palot, aerosolit, yövalot, lumi, kasvillisuus ja SST. Se sopii nopeimmaksi prototyypiksi.
2. **ICOADS R3** sisältää laivahavainnot vuodesta 1662 (CC BY 4.0). Vuoden 1873 laivat ja niiden sää voidaan näyttää pisteinä, ja kytkös isoisän matkaan on vahvin.
3. **NOAA 20th Century Reanalysis v3** tarjoaa sääkartat vuodesta 1836 (NOAA, vapaa). Sillä voi näyttää, millainen sää oli isoisän matkapäivinä.
4. **NOAA ERSST v5** on meren pintalämpötila vuodesta 1854 (NOAA, PD). Se näyttää meren lämpenemisen isoisän vuodesta tähän päivään.
5. **HYDE 3.3** kattaa väestön ja pellot 10 000 eaa.–2023 (CC BY 4.0). Se on pohja ihmisen matkalle (C7) ja "maailma 1870" -hetkelle.
6. **Maddison Project 2023** sisältää BKT:n ja väestön maittain vuodesta 1 jaa. (CC BY 4.0). Vuosi 1870 on vertailupiste.
7. **RICardo** on kahdenvälinen maailmankauppa 1787–1938 (ODbL). Sen varaan voi rakentaa virtalinssit S1–S4 ja kauppavirrat 1873.
8. **NASA FIRMS** näyttää palot lähes reaaliajassa. Viimeiset 7 päivää saa CSV:nä ilman kirjautumista, mutta arkisto vaatii Earthdatan.
9. **Copernicus CAMS** on aerosolien ja ilmanlaadun malli (CC BY 4.0 2.7.2025 alkaen, ilmainen ECMWF-tili). Se on omistajan esimerkin savu.
10. **IBTrACS** sisältää trooppisten myrskyjen radat 1840-luvulta tähän päivään (NOAA). Radat animoituvat helposti, ja aineistossa on myös vuoden 1873 myrskyt.
11. **USGS ComCat + NOAA NCEI Hazards** kattavat maanjäristykset, tulivuoret ja tsunamit (PD), NCEI:n osalta vuodesta 2150 eaa.
12. **Black Marble (GIBS) / EOG VIIRS -yövalot** (PD / CC BY 4.0) sopivat "ennen ja nyt" -linssiin: maailma 1873 oli pimeä.
13. **HYG 4.2 + JPL Horizons** tuovat tähtitaivaan ja planeetat mihin tahansa hetkeen (CC BY-SA 4.0 / NASA), esimerkiksi isoisän yöhön tai Venuksen ylikulkuun 1874.
14. **Glottolog + Wikidata** sisältävät kielet ja kulttuurikohteet (CC BY 4.0 / CC0). UNESCOn oma lista ei ole avoin, joten maailmanperintökohteet haetaan Wikidatasta.
15. **World Bank Global Shipping Density** on nykyinen laivaliikenne 500 m:n ruudukolla (CC BY 4.0), ja sen pari ICOADS 1873 tekee ennen ja nyt -vertailun.

---

## 2. Lähteet aihealueittain

Sarakkeet: **Ämpäriin** = voiko aineiston esiprosessoida kertaalleen ämpäriin (kyllä/ei/osittain).
**Tunnus** = tarvitaanko kirjautuminen tai avain (– = ei tarvita).

### 2.1 Ilmasto ja lämpötila

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| GISTEMP v4 | NASA GISS | pintalämpötilan poikkeama | maailma, 2°, kk, 1880– | NetCDF, CSV | PD (liittovaltion työ), kiitos pyydetään | ~23 Mt gz | – | kyllä | https://data.giss.nasa.gov/gistemp/ |
| NOAAGlobalTemp v6 | NOAA NCEI | pintalämpötilan poikkeama | maailma, 5°, kk, 1850– | NetCDF, ASCII | PD (NOAA) | ~50 Mt | – | kyllä | https://www.ncei.noaa.gov/products/land-based-station/noaa-global-temp |
| HadCRUT5 | Met Office + CRU | lämpötilan poikkeama, 200 jäsenen ensemble | maailma, 5°, kk, 1850– | NetCDF, CSV | Open Government Licence v3 (© Crown) | ~100 Mt (mean) | – | kyllä | https://www.metoffice.gov.uk/hadobs/hadcrut5/ |
| Berkeley Earth | Berkeley Earth | lämpötila (maa 1750–, maailma 1850–) | 1°, kk | NetCDF | **Rajoitettu: CC BY-NC 4.0** | ~400 Mt | – | ei ilman lupaa | https://berkeleyearth.org/data/ |
| ERSST v5 | NOAA NCEI | meren pintalämpötila | maailma, 2°, kk, **1854–** | NetCDF | PD (NOAA), viite doi:10.7289/V5T72FNM | ~280 Mt | – | kyllä | https://www.ncei.noaa.gov/products/extended-reconstructed-sst |
| 20th Century Reanalysis v3 | NOAA PSL + CIRES + DOE | 4D-sääkentät: paine, tuuli, lämpö, sade | maailma, ~1° (75 km), 3 h, **1836–2015** | NetCDF-4 | NOAA, vapaa; kiitosteksti pyydetään | yksi muuttuja/vuosi ~0,3–1 Gt, osajoukko | – | kyllä (valitut vuodet) | https://psl.noaa.gov/data/20thC_Rean/ |
| ERA5 | ECMWF / Copernicus C3S | reanalyysi: tuuli, lämpö, sade, pilvet | maailma, 0,25°, tunti, 1940– | NetCDF, GRIB | **CC BY 4.0** (CDS 2.7.2025 alkaen) | valtava, osajoukko | ilmainen ECMWF-tili (CDS); AWS-kopio ilman tunnusta | kyllä (kk-keskiarvot) | https://cds.climate.copernicus.eu/ · https://registry.opendata.aws/ecmwf-era5/ |
| Köppen–Geiger 1901–2099 (Beck ym. 2023) | GloH2O / Princeton | ilmastovyöhykkeet, 6 jaksoa, SSP-skenaariot | maailma, 1 km–0,5° | GeoTIFF | CC BY 4.0 | 125 Mt zip | – | kyllä | https://www.gloh2o.org/koppen/ |
| WorldClim 2.1 | WorldClim | ilmastonormaalit 1970–2000 | 30"–10' | GeoTIFF | **tarkistettava** (sivun mukaan akateeminen ja ei-kaupallinen käyttö) | 0,1–10 Gt | – | ei ennen tarkistusta | https://www.worldclim.org/ |
| CHELSA 2.1 | WSL | ilmastonormaalit ja aikasarjat | 30" | GeoTIFF | **tarkistettava** (ilmoitettu CC BY 4.0) | suuri | – | tarkistuksen jälkeen | https://chelsa-climate.org/ |

### 2.2 Sää, tuulet, sateet ja myrskyt

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| ECMWF Open Data (IFS, AIFS) | ECMWF | ennusteet: tuuli, paine, sade, lämpö | maailma, 0,25°, 0–15 vrk | GRIB2 | CC BY 4.0 (koko reaaliaikaluettelo avoin 1.10.2025) | ~GB/ajo, osajoukko | – | osittain (päivittäinen ajo) | https://www.ecmwf.int/en/forecasts/datasets/open-data |
| NOAA GFS | NOAA NCEP | ennusteet (nullschool-tyylin tuulihiukkaset) | maailma, 0,25°, 16 vrk | GRIB2 | PD (NOAA) | osajoukko ~10 Mt/kenttä | – | osittain | https://registry.opendata.aws/noaa-gfs-bdp-pds/ |
| Open-Meteo API | Open-Meteo | ennuste-, historia- (ERA5) ja ilmasto-API | piste tai alue, 1940– | JSON-API | data CC BY 4.0; ei-kaupallinen käyttö ilmainen (10 000 kutsua/vrk) | API | – (ei avainta) | ei (reaaliaika), tai välimuisti | https://open-meteo.com/en/license |
| GPCP v2.3 / v3.2 | NOAA PSL / NASA GSFC | sademäärä | maailma, 2,5°/0,5°, kk, 1979/1983– | NetCDF | PD (NOAA PSL -kopio) | ~10–100 Mt | – (PSL) | kyllä | https://psl.noaa.gov/data/gridded/data.gpcp.html |
| CHIRPS v2/v3 | UCSB Climate Hazards Center | sademäärä maalla | 50–60° S–N, 0,05°, päivä/kk, 1981– | GeoTIFF, NetCDF | PD (tekijä luopunut oikeuksista, CC0-tyyppinen) | kk-sarja ~10 Gt | – | kyllä (karkeistettuna) | https://www.chc.ucsb.edu/data/chirps |
| IBTrACS v4 | NOAA NCEI | trooppisten myrskyjen radat ja voimakkuus | maailma, 3 h, **1840-luku–** | CSV, SHP, NetCDF | NOAA, julkinen (ei erillistä CC-merkintää; liittovaltion aineisto) | ~300 Mt CSV | – | kyllä | https://www.ncei.noaa.gov/products/international-best-track-archive |
| HURDAT2 | NOAA NHC | Atlantin ja Tyynenmeren hurrikaanit | **1851–** | teksti | PD (NOAA) | < 10 Mt | – | kyllä | https://www.nhc.noaa.gov/data/#hurdat |
| OVATION Aurora | NOAA SWPC | revontuliennuste 30 min | napa-alueet, 1° | JSON | PD (NOAA), viittaus | ~1 Mt | – | ei (reaaliaika) | https://services.swpc.noaa.gov/json/ovation_aurora_latest.json |
| LIS/OTD salamailmasto | NASA GHRC | salamatiheys (salamoita/km²/v) | 0,5°, 1995–2014 | HDF/NetCDF | PD (NASA) | < 100 Mt | Earthdata **tarkistettava** | kyllä | https://ghrc.nsstc.nasa.gov/ |

### 2.3 Jää, lumi ja merenpinta

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Sea Ice Index G02135 v4 | NSIDC (NOAA/NASA) | merijään laajuus (napa-alueet) | 25 km, pv/kk, 1978– | SHP, CSV, GeoTIFF | vapaa, viittaus ehtona (NSIDC) | ~1 Gt koko, kuukaudet pieniä | – | kyllä | https://nsidc.org/data/g02135/versions/4 |
| Randolph Glacier Inventory 7.0 | GLIMS / NSIDC-0770 | vuorijäätiköiden rajat | maailma, ~2000 | SHP | CC BY 4.0 | ~1 Gt | NSIDC:n latauksessa voi olla Earthdata, **tarkistettava** | kyllä | https://www.glims.org/rgi_user_guide/ |
| GLIMS | NSIDC-0272 | jäätiköiden rajat ajan mukaan | maailma, 1850-luvun kartoista nykyhetkeen | SHP | PD, viittaus pyydetään | ~Gt | tarkistettava | kyllä | https://nsidc.org/data/nsidc-0272 |
| LSA Global Mean Sea Level | NOAA STAR | maailman keskimerenpinta (altimetria) | 1992–, ~10 pv | CSV, NetCDF | PD (NOAA) | < 1 Mt | – | kyllä | https://www.star.nesdis.noaa.gov/socd/lsa/SeaLevelRise/LSA_SLR_timeseries_global.php |
| PSMSL | National Oceanography Centre | vuorovesimittarit (Amsterdam 1700-l., Brest 1807–) | ~1 500 asemaa, kk/v | teksti | vapaa, viittaus pyydetään (ei CC-merkintää) | ~50 Mt | – | kyllä | https://psmsl.org/data/obtaining/ |
| Merenpinta 800 000 v (Spratt & Lisiecki 2016) | NOAA Paleo-arkisto | merenpinnan käyrä jääkausien yli | maailma, ~1 ka | teksti | NOAA WDS Paleo, vapaa; **tarkistettava** | < 1 Mt | – | kyllä | https://www.ncei.noaa.gov/access/paleo-search/ (haku "Spratt Lisiecki") |
| MODIS-lumipeite (GIBS) | NASA | päivittäinen lumi- ja jääpeite | maailma, 500 m, 2000– | WMTS (PNG/JPEG) | NASA, avoin, kiitosteksti | laatat | – | kyllä (valitut päivät) | https://nasa-gibs.github.io/gibs-api-docs/ |

Huom.: Merenpinnan korvaava lähde, jota Maapallon tila -suunnitelma kaipasi, on **NOAA STAR LSA**. CSV on suoraan
ladattavissa ilman kirjautumista, esimerkiksi `slr_sla_gbl_free_all_66.csv`. GRACE jää Fablen päätöksellä pois (Earthdata).

### 2.4 Meret

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| ETOPO 2022 | NOAA NCEI | korkeus + syvyys | 15"/30"/60" | GeoTIFF, NetCDF | PD (NOAA) | 60" ~0,5 Gt | – | kyllä | https://www.ncei.noaa.gov/products/etopo-global-relief-model |
| GEBCO 2025/2026 | GEBCO (IHO/IOC) | merenpohjan syvyys | 15" | NetCDF, GeoTIFF | PD, lähde mainittava, ei virallisuusvaikutelmaa | ~7,5 Gt | – | kyllä | https://www.gebco.net/data-products/gridded-bathymetry-data |
| OISST v2.1 | NOAA NCEI | päivittäinen SST ja merijää | 0,25°, 1981– | NetCDF | PD (NOAA) | ~1,5 Mt/pv | – | kyllä | https://www.ncei.noaa.gov/products/optimum-interpolation-sst |
| World Ocean Atlas 2023 | NOAA NCEI | lämpö, suolaisuus ja happi syvyyksittäin | 1°/0,25°, klimatologia | NetCDF | PD (NOAA) | ~Gt | – | kyllä | https://www.ncei.noaa.gov/products/world-ocean-atlas |
| Coral Reef Watch | NOAA | korallien lämpöstressi (DHW) | 5 km, pv, 1985– | NetCDF | PD (NOAA) | ~10 Mt/pv | – | kyllä | https://coralreefwatch.noaa.gov/ |
| Allen Coral Atlas | ASU + kumppanit | koralliriuttojen geomorfologia ja pohja | trooppiset riutat, 5 m | GeoJSON (WFS), GeoTIFF | CC BY 4.0 | aluekohtainen | ilmainen tili bulkkilataukseen (WFS ilman) | kyllä | https://allencoralatlas.org/ |
| Copernicus Marine (CMEMS) | Mercator Ocean / EU | virrat, SST, merijää, klorofylli, aallot | maailma, 1/12°, 1993– | NetCDF, Zarr | Copernicus Marine -lisenssi: ilmainen, attribuutio | osajoukko | ilmainen tili | kyllä | https://marine.copernicus.eu/ |
| OSCAR-merivirrat | NASA PO.DAAC | pintavirrat | 0,25°, 1993– | NetCDF | PD (NASA) | ~Gt | **Earthdata** | ei (Fablen linja) | https://podaac.jpl.nasa.gov/ |
| OBIS | UNESCO-IOC | merilajien havainnot | maailma | GeoParquet (AWS) | lähdekohtainen CC0 / CC BY / CC BY-NC; koko aineisto CC BY-NC | ~100 Gt, suodatetaan | – | kyllä (vain CC0/CC BY -lähteet) | https://registry.opendata.aws/obis/ |
| Global Fishing Watch | GFW | kalastusaktiivisuus (AIS) | 0,1°, 2012–2024 | CSV | **Rajoitettu: CC BY-NC 4.0** | ~Gt | ilmainen tili | ei ilman lupaa | https://globalfishingwatch.org/datasets-and-code/ |
| WDPA | UNEP-WCMC | suojelualueet | maailma | SHP, GDB | **Suljettu: uudelleenjakelu kielletty ilman lupaa**, ei kaupallinen | ~1 Gt | – | ei | https://www.protectedplanet.net/en/legal |

### 2.5 Ilmakehä, ilmanlaatu ja palot

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| FIRMS (MODIS/VIIRS) | NASA LANCE | aktiiviset palot (pisteet, FRP) | maailma, 375 m/1 km | CSV, SHP, KML, API | NASA, täysin avoin; kiitosteksti ja NASA:n vastuuvapauslauseke | 7 pv ~10–50 Mt | 24 h/48 h/7 pv: –; arkisto: **Earthdata**; API: MAP_KEY (sähköposti) | kyllä (7 pv tilannekuvat ajastettuna) | https://firms.modaps.eosdis.nasa.gov/active_fire/ |
| FIRMS-arkisto 2000– | NASA | palot vuosittain | maailma | CSV, SHP | kuten yllä | ~Gt | **Earthdata** | kyllä, jos tunnus sallitaan | https://firms.modaps.eosdis.nasa.gov/download/ |
| CAMS (analyysi, ennuste, EAC4-reanalyysi 2003–) | ECMWF / Copernicus | aerosolit (AOD), savu, PM2.5, NO₂, O₃, CO, pöly | maailma, 0,4–0,75°, 3 h | NetCDF, GRIB | **CC BY 4.0** (ADS 2.7.2025 alkaen); suositusteksti "Generated using Copernicus Atmosphere Monitoring Service information [vuosi]" | osajoukko ~100 Mt/kk | ilmainen ECMWF-tili (ADS) | kyllä | https://ads.atmosphere.copernicus.eu/ |
| GIBS-kerrokset: AOD, palot, SO₂, pöly | NASA ESDIS | valmiit visualisoinnit (MODIS, VIIRS, OMPS) | maailma, 250 m–2 km, pv, 2000– | WMTS, WMS | NASA, avoin; kiitosteksti | laatat | – | kyllä (valitut päivät) | https://nasa-gibs.github.io/gibs-api-docs/ |
| OpenAQ | OpenAQ | ilmanlaatuasemien mittaukset | maailma, asemat, 2016– | CSV.gz (AWS S3), API | CC BY 4.0 (alkuperäislähteiden ehdot voivat poiketa) | asemakohtainen | S3: –; API-avain ilmainen | kyllä | https://registry.opendata.aws/openaq/ |
| EDGAR | EU JRC | päästöt (CO₂, CH₄, NOx, PM) maittain ja hilana | 0,1°, 1970–2024 | NetCDF, TXT | CC BY 4.0 | ~Gt | – | kyllä | https://edgar.jrc.ec.europa.eu/ |
| Sentinel-5P TROPOMI | ESA / Copernicus | NO₂, SO₂, CH₄ ja aerosoli-indeksi | maailma, 5,5 km, pv, 2018– | NetCDF | Copernicus Sentinel -data: vapaa, "Contains modified Copernicus Sentinel data [vuosi]" | suuri | ilmainen Copernicus Data Space -tili | kyllä (kk-keskiarvot) | https://dataspace.copernicus.eu/ |
| WHO Ambient Air Quality DB | WHO | PM2.5/PM10/NO₂ kaupungeittain | ~7 000 kaupunkia | XLSX | **Rajoitettu: CC BY-NC-SA 3.0 IGO** | < 10 Mt | – | ei ilman lupaa | https://www.who.int/data/gho/data/themes/air-pollution/who-air-quality-database |
| GWIS / EFFIS | EU JRC / Copernicus EMS | palaneet alueet ja paloindeksit | maailma / Eurooppa | SHP, WMS | **tarkistettava** (Copernicus EMS, todennäköisesti vapaa + attribuutio) | – | – | tarkistuksen jälkeen | https://gwis.jrc.ec.europa.eu/ |

### 2.6 Valo yöllä ja valosaaste

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Black Marble 2012/2016 (GIBS) | NASA | pilvetön yökuva (visualisointi) | maailma, 500 m | WMTS, JPEG | NASA, avoin (PD-kuvapolitiikka), kiitosteksti | laatat / 3 600×1 800–86 400×43 200 px | – | kyllä | https://nasa-gibs.github.io/gibs-api-docs/ · https://earthobservatory.nasa.gov/features/NightLights |
| Black Marble VNP46A1–A4 | NASA GSFC | yövalon radianssi pv/kk/v | 500 m, 2012– | HDF5 | PD (NASA) | ~Gt | **Earthdata** | ei (Fablen linja) | https://blackmarble.gsfc.nasa.gov/ |
| EOG VIIRS Nighttime Lights (VNL v2) | Payne Institute / Colorado School of Mines | vuosi- ja kuukausikoosteet | 15", 2012– | GeoTIFF | CC BY 4.0 (valtaosa tuotteista) | ~1–10 Gt/v | ilmainen EOG-tili | kyllä | https://eogdata.mines.edu/products/vnl/ |
| World Atlas of Artificial Night Sky Brightness (Falchi ym. 2016) | GFZ / ISTIL | taivaan kirkkaus zeniitissä | 30" | GeoTIFF 2,9 Gt | **Rajoitettu: CC BY-NC 4.0** | 2,9 Gt, pyyntölomake | lomake | ei ilman lupaa | https://doi.org/10.5880/GFZ.1.4.2016.001 |

### 2.7 Maa, kasvillisuus, metsät, maaperä ja satelliittipohjat

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Hansen Global Forest Change v1.12/1.13 | Univ. of Maryland | metsäpeite 2000, katovuosi | 30 m, 2000–2024/2025, 10°-laatat | GeoTIFF | CC BY 4.0 | ~1 Tt koko, karkeistetaan | – | kyllä (karkeistettuna) | https://storage.googleapis.com/earthenginepartners-hansen/GFC-2024-v1.12/download.html |
| ESA WorldCover 2020/2021 | ESA | maanpeite, 11 luokkaa | 10 m | COG (AWS) | CC BY 4.0 | ~Tt, karkeistetaan | – | kyllä | https://esa-worldcover.org/ |
| RESOLVE Ecoregions 2017 | RESOLVE | 846 ekoaluetta ja 14 biomia | maailma | SHP | CC BY 4.0 | 150 Mt | – | kyllä | https://ecoregions.world/ |
| MODIS NDVI / Blue Marble -kerrokset (GIBS) | NASA | kasvillisuusindeksi, tosivärit | 250 m–1 km, 2000– | WMTS | NASA, avoin | laatat | – | kyllä | https://nasa-gibs.github.io/gibs-api-docs/ |
| Blue Marble Next Generation | NASA Visible Earth | 12 kuukauden pilvetön maapallo (2004) | 500 m | JPEG/PNG | NASA, PD-kuvapolitiikka | 12 × ~50–500 Mt | – | kyllä | https://visibleearth.nasa.gov/collection/1484/blue-marble |
| Sentinel-2 cloudless | EOX | pilvetön mosaiikki | 10 m | WMTS, GeoTIFF | **2016: CC BY 4.0; 2018–2024: CC BY-NC-SA 4.0 (rajoitettu)** | suuri | – | vain 2016 | https://s2maps.eu/ |
| Landsat Collection 2 | USGS / NASA | satelliittikuvat 1972– | 30 m | COG (AWS) | PD (USGS) | valtava | – (AWS requester pays) | osittain | https://www.usgs.gov/landsat-missions |
| SoilGrids 2.0 | ISRIC | maaperän ominaisuudet (pH, hiili, savi, WRB-luokat) | 250 m, 6 syvyyttä | COG, WCS | CC BY 4.0 | ~Gt/muuttuja | – | kyllä (karkeistettuna) | https://soilgrids.org/ |
| HYDE 3.3 | PBL + Utrechtin yliopisto | väestö, pellot, laitumet, kaupunkiväestö | 5', **10 000 eaa.–2023** | ESRI ASCII grid | CC BY 4.0 (DOI 10.24416/UU01-94FNH0) | ~Gt, vuosi kerrallaan | – | kyllä | https://doi.org/10.24416/UU01-94FNH0 |
| MapSPAM 2020 | IFPRI | 46 viljelykasvin ala, sato ja tuotanto | 5', 2020 (myös 2000/2005/2010) | GeoTIFF, CSV | CC BY 4.0 (IFPRI Dataverse; 2020-versio **tarkistettava**) | ~Gt | – | kyllä | https://www.mapspam.info/data/ |

### 2.8 Vesistöt ja pohjavesi

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| HydroRIVERS / HydroLAKES / HydroBASINS | WWF / McGill (HydroSHEDS) | joet virtaamineen, järvet, valuma-alueet | maailma, 15" | SHP, GDB | CC BY 4.0 | satoja Mt | – | kyllä | https://www.hydrosheds.org/products/hydrorivers |
| JRC Global Surface Water | EU JRC / Google | pintaveden esiintyminen ja muutos | 30 m, 1984–2021 | GeoTIFF-laatat | Copernicus: vapaa, rajoittamaton; "Source: EC JRC/Google" | ~Gt | – | kyllä | https://global-surface-water.appspot.com/download |
| Natural Earth -joet ja -järvet | NACIS | yleistetyt joet ja järvet | 1:10m–1:110m | SHP, GeoJSON | PD | < 50 Mt | – | kyllä | https://www.naturalearthdata.com/ |
| Aqueduct 4.0 | WRI | vesistressi ja tulvariski | valuma-alueet | GDB, CSV | CC BY 4.0 | ~Gt | – | kyllä | https://www.wri.org/aqueduct |
| WHYMAP | BGR / UNESCO | pohjavesivarannot maailmankarttana | 1:25M | SHP, PDF | **tarkistettava** | < 100 Mt | – | tarkistuksen jälkeen | https://www.whymap.org/ |
| GRACE / GRACE-FO | NASA JPL | vesivaraston muutos (pohjavesi + jää) | ~300 km, kk, 2002– | NetCDF | PD (NASA) | < 1 Gt | **Earthdata** | ei (Fablen päätös 24.9.) | https://podaac.jpl.nasa.gov/ |

### 2.9 Maanjäristykset, tulivuoret ja tsunamit

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| USGS ComCat | USGS | maanjäristykset (reaaliaika + luettelo) | maailma, 1900-luku– | GeoJSON, CSV, API | PD (USGS) | M≥5 kaikki ~50 Mt | – | kyllä (+ reaaliaikasyöte) | https://earthquake.usgs.gov/fdsnws/event/1/ |
| NCEI Significant Earthquakes / Volcanoes / Tsunamis | NOAA NCEI | ~5 700 merkittävää järistystä, 800+ purkausta, tsunamit ja vaikutukset | **2150 eaa.–** | JSON (HazEL-API), TSV | PD (NOAA) | < 20 Mt | – | kyllä | https://www.ngdc.noaa.gov/hazel/ |
| Volcanoes of the World (GVP) | Smithsonian | holoseenin tulivuoret ja purkaukset (VEI) | maailma, 12 000 v | XLSX, WFS | **Rajoitettu**: Smithsonianin käyttöehdot (henkilökohtainen, opetus, ei-kaupallinen); viittaus | < 10 Mt | – | ei ilman lupaa (NCEI:n tulivuoriluettelo on PD-vaihtoehto) | https://volcano.si.edu/ |
| EM-DAT | UCLouvain CRED | katastrofit ja uhrit | maailma, 1900– | XLSX | **Rajoitettu**: ei-kaupallinen, rekisteröityminen | < 10 Mt | tili | ei ilman lupaa | https://www.emdat.be/ |

### 2.10 Eläimet ja luonnon monimuotoisuus

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Movebank (+ Data Repository) | Max Planck -instituutti | GPS-seurannat: kurjet, haikarat, gnut, kilpikonnat, valaat | tutkimuksittain | CSV | **tutkimuskohtainen**: CC0, CC BY tai CC BY-NC | Mt–Gt | julkiset lataukset ilman, osa vaatii tilin | kyllä (vain CC0/CC BY -tutkimukset) | https://www.movebank.org/cms/movebank-content/data-policy |
| GBIF | GBIF | lajihavainnot (2,5 mrd+) | maailma | CSV, Darwin Core, Parquet | tietuekohtainen CC0 / CC BY / CC BY-NC | suodatettuna Mt–Gt | ilmainen tili lataukseen | kyllä (CC0/CC BY -suodatus) | https://www.gbif.org/ |
| eBird Status & Trends | Cornell Lab | lintujen viikoittainen runsaus | 3 km, viikko | GeoTIFF | **Rajoitettu**: ei-kaupallinen, käyttöehdot + avain | Gt | avain | ei ilman lupaa | https://science.ebird.org/en/status-and-trends |
| IUCN Red List -levinneisyysalueet | IUCN | lajien levinneisyys | maailma | SHP | **Suljettu/rajoitettu**: ei-kaupallinen, ei uudelleenjakelua | Gt | tili | ei | https://www.iucnredlist.org/resources/spatial-data-download |

### 2.11 Väestö, kaupungit ja muuttoliike

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| GHSL (GHS-POP, GHS-BUILT, SMOD, UCDB) | EU JRC | väestö, rakennettu ala, kaupunkiluokitus | 100 m–1 km, 1975–2030 (5 v) | GeoTIFF, GPKG | CC BY 4.0 | 1 km/vuosi ~100 Mt | – | kyllä | https://human-settlement.emergency.copernicus.eu/datasets.php |
| WorldPop | Southamptonin yliopisto | väestö | 100 m / 1 km, 2000–2030 | GeoTIFF | CC BY 4.0 | 1 km ~0,5 Gt/v | – | kyllä | https://hub.worldpop.org/ |
| GPWv4 | CIESIN (ent. SEDAC) | väestö | 30", 2000–2020 | GeoTIFF | CC BY 4.0 | ~Gt | **Earthdata** (SEDAC siirtyi Earthdataan 2025) | ei (Fablen linja); GHSL korvaa | https://www.earthdata.nasa.gov/data/projects/gpw |
| Historical Urban Population 3700 eaa.–2000 (Reba, Reitsma & Seto 2016) | Yale / SEDAC | ~1 700 kaupungin väestö (Chandler + Modelski) geokoodattuna | maailma, pisteet | CSV, SHP | CC BY 4.0 | < 5 Mt | SEDAC-kopio: **Earthdata**; artikkelin data **tarkistettava** | kyllä | https://www.nature.com/articles/sdata201634 |
| UN World Population Prospects 2024 | UN DESA | väestö, ikärakenne, hedelmällisyys ja elinajanodote | maat, 1950–2100 | CSV | CC BY 3.0 IGO | ~1 Gt koko, osat pieniä | – | kyllä | https://population.un.org/wpp/ |
| Bilateral migration flows (Abel & Cohen) | IIASA / Abel | maiden väliset muuttovirrat 5 v jaksoissa | 200 maata, 1990–2020 | CSV | **tarkistettava** (figshare; lisenssisivu ei auennut) | < 50 Mt | – | tarkistuksen jälkeen | https://figshare.com/collections/Bilateral_international_migration_flow_estimates_for_200_countries/4470464 |
| Gapminder | Gapminder | väestö, elinajanodote, tulot 1800– | maat | CSV | CC BY 4.0 | < 50 Mt | – | kyllä | https://www.gapminder.org/data/ |
| Our World in Data | Oxfordin yliopisto / GCDL | tuhansia aikasarjoja | maat | CSV, API | CC BY 4.0 (OWID:n oma); **kolmansien osapuolten data omalla lisenssillä** | pieni | – | kyllä (lähde kerrallaan) | https://ourworldindata.org/ |
| GeoNames | GeoNames | 12 milj. paikannimeä ja kaupunkien väkiluvut | maailma | TSV | CC BY 4.0 | ~0,4 Gt | – | kyllä | https://www.geonames.org/ |

### 2.12 Talous, kauppa ja energia

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Maddison Project Database 2023 | Groningenin yliopisto (GGDC) | BKT/asukas ja väestö | 169 maata, **1 jaa.–2022** | XLSX, Stata, CSV | CC BY 4.0 | < 5 Mt | – | kyllä | https://www.rug.nl/ggdc/historicaldevelopment/maddison/releases/maddison-project-database-2023 |
| World Development Indicators | Maailmanpankki | 1 400 indikaattoria | maat, 1960– | CSV, API | CC BY 4.0 | ~200 Mt | – | kyllä | https://datacatalog.worldbank.org/ |
| Gridded GDP per capita (Kummu ym. 2025) | Aalto-yliopisto | BKT/asukas hallintoalueittain ja hilana | 5', 1990–2022 | GeoTIFF, GPKG | CC BY 4.0 | ~Gt | – | kyllä | https://doi.org/10.5281/zenodo.10976733 |
| BACI | CEPII | kahdenvälinen tavarakauppa (HS6) | 200 maata, 1995– | CSV | Etalab Open Licence 2.0 (lähde mainittava) | ~Gt | – (ilmainen) | kyllä (maatasolle koottuna) | https://www.cepii.fr/CEPII/en/bdd_modele/bdd_modele_item.asp?id=37 |
| RICardo | Sciences Po (médialab) | kahdenväliset kauppavirrat | 373 raportoijaa, **1787–1938** | CSV | **ODbL 1.0** | < 100 Mt | – | kyllä | https://github.com/medialab/ricardo_data |
| Global Power Plant Database 1.3 | WRI | ~35 000 voimalaa: tyyppi, teho, sijainti | maailma, päivitetty 2021 | CSV | CC BY 4.0 | ~10 Mt | – | kyllä | https://github.com/wri/global-power-plant-database |
| Global Energy Monitor -trackerit | GEM | hiili-, kaasu-, aurinko- ja tuulivoimalat, putket, kaivokset, avausvuodet | maailma, ajantasainen | XLSX, GeoJSON | CC BY 4.0 | ~10–100 Mt | lomake (sähköposti) | kyllä | https://globalenergymonitor.org/ |
| Global Solar Atlas | Maailmanpankki / Solargis | auringon säteily ja PV-potentiaali | 250 m–1 km | GeoTIFF | CC BY 4.0 | ~Gt | – | kyllä | https://globalsolaratlas.info/ |
| Global Wind Atlas 4 | DTU / Maailmanpankki | tuulen nopeus ja teho korkeuksittain | 250 m / 1 km | GeoTIFF | CC BY 4.0 | ~Gt | – | kyllä | https://globalwindatlas.info/ |
| Ember Electricity Data | Ember | sähköntuotanto lähteittäin | maat, 2000– | CSV, API | CC BY 4.0 | < 10 Mt | – | kyllä | https://ember-energy.org/data/ |

### 2.13 Liikenne: laivat, lennot, rautatiet ja kaapelit

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| ICOADS Release 3.0 | NOAA + NCAR + kumppanit | 455 milj. meriraporttia: laivan sijainti, päivä, sää, tunnus | **1662–2014** (+ NRT) | IMMA1 (teksti), NetCDF | CC BY 4.0 (NCAR RDA) | 1873 ~Mt–kymmeniä Mt | – (RDA:n suuret tilaukset voivat vaatia tilin, **tarkistettava**) | kyllä | https://rda.ucar.edu/datasets/d548000/ · https://icoads.noaa.gov/ |
| CLIWOC 2.1 | EU-hanke / PANGAEA | brittiläisten, hollantilaisten, ranskalaisten ja espanjalaisten laivojen lokikirjat | **1750–1854** | TSV (zip) | CC BY 3.0 | ~100 Mt | – | kyllä | https://doi.pangaea.de/10.1594/PANGAEA.611088 |
| Global Shipping Traffic Density | Maailmanpankki / IMF | AIS-tiheys 6 alustyypille | 0,005°, 2015–2021 | GeoTIFF (zip) | CC BY 4.0 | 510 Mt (kaikki) | – | kyllä (karkeistettuna) | https://datacatalog.worldbank.org/search/dataset/0037580/global-shipping-traffic-density |
| EMODnet Vessel Density | EMODnet / EU | alustiheys tyypeittäin (h/km²/kk) | EU:n vedet, 1 km, 2017– | GeoTIFF | CC BY 4.0 | ~Gt | – | kyllä | https://emodnet.ec.europa.eu/en/human-activities |
| NGA World Port Index | US NGA | ~3 700 satamaa ominaisuuksineen | maailma | CSV, SHP | PD (US) | < 5 Mt | – | kyllä | https://msi.nga.mil/Publications/WPI |
| adsb.lol globe_history | adsb.lol | kaikki vastaanotetut lentojäljet päivittäin | maailma (vastaanotinpeitto), 2023– | JSON.gz (GitHub releases) | ODbL 1.0 | ~Gt/vrk | – | kyllä (yksi päivä koottuna) | https://www.adsb.lol/docs/open-data/historical/ |
| OurAirports | OurAirports | 80 000+ lentokenttää | maailma | CSV | PD (Unlicense) | ~10 Mt | – | kyllä | https://ourairports.com/data/ |
| OpenFlights | OpenFlights | lentoreitit (2014, vanhentunut) | maailma | CSV | ODbL | < 5 Mt | – | kyllä (merkitään vuosi 2014) | https://openflights.org/data.php |
| OpenSky Network | OpenSky | ADS-B-lentotiedot | maailma | Parquet, API | **Rajoitettu**: vain voittoa tavoittelematon tutkimus ja opetus; osa Zenodo-aineistoista CC BY | – | tili | ei (paitsi CC BY -Zenodo-aineistot) | https://opensky-network.org/about/terms-of-use |
| OpenStreetMap / OpenRailwayMap | OSM-säätiö | rautatiet (myös `start_date`), tiet, putket, merikaapelit | maailma | PBF, GeoJSON | ODbL 1.0 | Geofabrik-otteet | – | kyllä | https://www.openrailwaymap.org/ · https://www.openstreetmap.org/copyright |
| Natural Earth -rautatiet, -satamat ja -lentokentät | NACIS | yleistetyt | 1:10m | SHP | PD | < 20 Mt | – | kyllä | https://www.naturalearthdata.com/ |
| Euroopan rautatiet 1830–2010 (Martí-Henneberg) | Lleidan yliopisto | rautatiet 10 vuoden välein | Eurooppa | SHP | **tarkistettava** (latauspaikka ja lisenssi eivät löytyneet) | – | – | ei ennen tarkistusta | https://www.scirp.org/html/13-8401140_18790.htm |
| TeleGeography Submarine Cable Map | TeleGeography | nykyiset ja suunnitellut merikaapelit | maailma | GeoJSON (API) | **Rajoitettu**: kartan data CC BY-NC-SA 3.0; kuvakaappaukset CC BY-SA 4.0 | < 10 Mt | – | ei ilman lupaa (vaihtoehto: OSM:n merikaapelit, ODbL) | https://www2.telegeography.com/cite-telegeography-map |
| Historialliset kaapelikartat 1858–1914 | Wikimedia Commons / LoC | esim. Eastern Telegraph Companyn kartat | kuvat | JPEG/TIFF | PD (tekijänoikeus rauennut) | – | – | kyllä (digitoidaan käsin viivoiksi) | https://commons.wikimedia.org/ |
| SlaveVoyages | SlaveVoyages-konsortio | 36 000 orjalaivamatkaa | Atlantti 1514–1866 | CSV | historialliset kentät PD; **imputoidut kentät ja arviot CC BY-NC 3.0 US** | < 50 Mt | – | osittain (vain PD-kentät) | https://www.slavevoyages.org/ |
| Sound Toll Registers Online | Groningenin yliopisto / Tresoar | 1,8 milj. Juutinrauman ohitusta lasteineen | **1497–1857** | tietokanta | **tarkistettava** | – | – | tarkistuksen jälkeen | https://www.soundtoll.nl/ |

### 2.14 Terveys

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Malaria Atlas Project | Telethon Kids / Oxford | malarian esiintyvyys ja ilmaantuvuus | Afrikka + maailma, 5 km, 2000– | GeoTIFF, WCS | CC BY 3.0 (MAP:n avoimen pääsyn linjaus; tuotteittain **tarkistettava**) | ~100 Mt/v | – | kyllä | https://malariaatlas.org/open-access-policy/ |
| WHO Global Health Observatory | WHO | elinajanodote, rokotukset, kuolinsyyt | maat | CSV, OData-API | **Rajoitettu: CC BY-NC-SA 3.0 IGO** | pieni | – | ei ilman lupaa (UN WPP ja OWID ovat avoimia vaihtoehtoja) | https://www.who.int/data/gho |
| IHME Global Burden of Disease | IHME | tautitaakka | maat | CSV | **Rajoitettu**: IHME:n ei-kaupalliset ehdot (**tarkistettava**) | – | tili | ei | https://vizhub.healthdata.org/gbd-results/ |
| healthsites.io | Healthsites | sairaalat ja terveysasemat | maailma | SHP, GeoJSON | ODbL | ~Gt | API-avain | kyllä | https://healthsites.io/ |

### 2.15 Kieli, kulttuuri ja paikat

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| Glottolog 5.x | MPI-EVA | 8 000+ kieltä sijainteineen, kielisukupuut, uhanalaisuus | maailma | CLDF (CSV), JSON | CC BY 4.0 | ~5 Mt | – | kyllä | https://glottolog.org/meta/downloads |
| WALS | MPI-EVA | kielten rakennepiirteet kartalla | 2 600 kieltä | CLDF | CC BY 4.0 | < 10 Mt | – | kyllä | https://wals.info/ |
| Grambank | MPI-EVA | 195 kielioppipiirrettä | 2 400 kieltä | CLDF | CC BY 4.0 | < 20 Mt | – | kyllä | https://grambank.clld.org/ |
| D-PLACE | MPI-EVA | kulttuurien piirteet (asuminen, elinkeinot) | 1 400 yhteisöä | CLDF | CC BY 4.0 | < 20 Mt | – | kyllä | https://d-place.org/ |
| Wikidata | Wikimedia | koordinaatit kaikelle: maailmanperintökohteet, observatoriot, museot, taistelut, perustamisvuodet | maailma | SPARQL, JSON | **CC0** | kyselyittäin | – | kyllä | https://www.wikidata.org/ |
| Pleiades | ISAW (NYU) | 40 000+ antiikin paikkaa | Välimeri–Lähi-itä–Intia | CSV, JSON, KML, GPKG | CC BY 3.0 | ~100 Mt | – | kyllä | https://pleiades.stoa.org/downloads |
| World Historical Gazetteer | Pittsburghin yliopisto | historiallisia paikannimiä aineistoittain | maailma | LPF-JSON, TSV | aineistokohtainen (usein CC BY 4.0), **tarkistettava** | – | – | aineistoittain | https://whgazetteer.org/ |
| UNESCO World Heritage List | UNESCO WHC | maailmanperintökohteet | maailma | XML/KML-syötteet | **Suljettu**: "All rights reserved", uudelleenjulkaisuun kirjallinen lupa | – | – | ei; **käytä Wikidataa** (P1435) | https://whc.unesco.org/en/syndication/ |

### 2.16 Historialliset kartat ja rajat

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| historical-basemaps | A. Ourednik | maiden rajat 53 ajankohtana (123 000 eaa.–2010) | maailma | GeoJSON | **GPL-3.0** (jakoehto; jo käytössä Q1:ssä) | ~50 Mt | – | kyllä | https://github.com/aourednik/historical-basemaps |
| CShapes 2.0 | ETH Zürich ICR | valtioiden ja siirtomaiden rajat päivän tarkkuudella | maailma, **1886–2019** | SHP, GeoJSON | **Rajoitettu: CC BY-NC-SA 4.0** | ~50 Mt | – | ei ilman lupaa | https://icr.ethz.ch/data/cshapes/ |
| Library of Congress, Geography & Map Division | LoC | skannatut historialliset kartat | maailma, 1500– | JPEG2000/TIFF, IIIF | pääosin PD / "no known restrictions" (kohdekohtainen merkintä) | – | – | kyllä (georeferoidaan, esim. Allmaps) | https://www.loc.gov/maps/ |
| David Rumsey Map Collection | Stanford | 135 000 karttaa, osa georeferoitu | maailma, 1500– | JPEG, GeoTIFF | **Rajoitettu: skannaukset CC BY-NC-SA 3.0** | – | – | ei ilman lupaa (etsi sama kartta LoC:sta tai Commonsista) | https://www.davidrumsey.com/about/copyright-and-permissions |
| Wikimedia Commons: PD-kartat | Wikimedia | esim. Stieler 1875 (Q2), Bartholomew'n isokrooninen kartta 1914 | – | JPEG/TIFF | tiedostokohtainen PD | – | – | kyllä | https://commons.wikimedia.org/ |
| ORBIS | Stanford | Rooman valtakunnan tie-, joki- ja meriverkko matka-aikoineen | 632 paikkaa | CSV, GeoJSON | koodi MIT, data CC BY (Stanford PURL), **tarkistettava** | < 10 Mt | – | tarkistuksen jälkeen | https://orbis.stanford.edu/ |
| DARMC | Harvard | antiikin ja keskiajan tiet, laivanhylyt, kaivokset | Eurooppa–Välimeri | SHP, KMZ | **tarkistettava** (luultavasti CC BY-NC-SA 4.0) | – | – | ei ennen tarkistusta | https://darmc.harvard.edu/ |

### 2.17 Tähtitaivas

| Nimi | Ylläpitäjä | Sisältö | Kattavuus | Muoto | Lisenssi | Koko / lataus | Tunnus | Ämpäriin | URL |
|---|---|---|---|---|---|---|---|---|---|
| HYG 4.2 | Astronomy Nexus | 120 000 tähteä (Hipparcos, Yale, Gliese): sijainti, kirkkaus, väri, nimet | koko taivas | CSV | CC BY-SA 4.0 | ~30 Mt | – | kyllä | https://codeberg.org/astronexus/hyg |
| Deep Star Maps 2020 | NASA SVS | 1,7 mrd tähden taivaspanoraama (Linnunrata) | koko taivas, jopa 64k | EXR, TIFF, JPG | NASA, PD | 0,1–3 Gt | – | kyllä (8k–16k) | https://svs.gsfc.nasa.gov/4851 |
| Gaia DR3 | ESA | 1,8 mrd tähteä | koko taivas | CSV, VOTable | **Rajoitettu: CC BY-NC 3.0 IGO** | Tt | – | ei ilman lupaa (Deep Star Maps käyttää Gaiaa ja on PD) | https://www.cosmos.esa.int/web/gaia-users/license |
| Yale Bright Star Catalog 5 | Yale / CDS | 9 110 kirkkainta tähteä | koko taivas | teksti | **tarkistettava** (vakiintunut vapaa tiedekäyttö) | < 2 Mt | – | tarkistuksen jälkeen (HYG sisältää sen) | http://tdc-www.harvard.edu/catalogs/bsc5.html |
| Stellarium Sky Cultures | Stellarium | tähtikuviot ja nimet eri kulttuureista | 40+ kulttuuria | JSON | kulttuurikohtainen, suositus CC BY-SA | < 10 Mt | – | kyllä (kulttuureittain) | https://github.com/Stellarium/stellarium-skycultures |
| d3-celestial -data | O. Frohn | tähtikuvioiden viivat, rajat ja Linnunradan ääriviivat GeoJSON-muodossa | koko taivas | GeoJSON | BSD-3-Clause (repon lisenssi; **tarkistettava** datatiedostoittain) | < 10 Mt | – | kyllä | https://github.com/ofrohn/d3-celestial |
| JPL Horizons | NASA JPL | planeettojen, Kuun ja Auringon paikat mille tahansa hetkelle ja paikalle | −9999–9999 | API (teksti/JSON) | NASA/JPL, vapaa; viittaus | pieni | – | kyllä (esilasketut hetket) | https://ssd.jpl.nasa.gov/horizons/ |
| NASA Eclipse (Espenak) | NASA GSFC | pimennysten ja ylikulkujen reitit | −2000–3000 | teksti, KMZ | NASA, vapaa, viittaus "Eclipse Predictions by Fred Espenak, NASA's GSFC" (**tarkistettava**) | pieni | – | kyllä | https://eclipse.gsfc.nasa.gov/ |

### 2.18 Satelliittikuvat ja reaaliaikaiset kanavat (yhteenveto)

| Nimi | Ylläpitäjä | Sisältö | Muoto | Lisenssi | Tunnus | URL |
|---|---|---|---|---|---|---|
| NASA GIBS / Worldview | NASA ESDIS | 1 000+ kerrosta, päivittäin 2000– | WMTS, WMS, GetCapabilities | NASA, avoin; kiitosteksti | – | https://nasa-gibs.github.io/gibs-api-docs/ |
| NASA Earth Observatory -kuvat | NASA | toimitetut kuvat ja sarjat (Earth at Night, jäätiköt ennen/nyt) | JPEG/PNG | NASA, PD-kuvapolitiikka (logot eivät) | – | https://earthobservatory.nasa.gov/ |
| NASA SVS | NASA GSFC | visualisoinnit (merijää, CO₂, virrat) | video, kuva, data | PD; **lisensoitu musiikki ei ole PD** | – | https://svs.gsfc.nasa.gov/ |
| Copernicus Data Space | ESA / EU | Sentinel-1/2/3/5P | JP2, NetCDF, COG | Sentinel-data vapaa, "Contains modified Copernicus Sentinel data [vuosi]" | ilmainen tili | https://dataspace.copernicus.eu/ |

### 2.19 Suomen avoimet lähteet (kohderyhmä suomalainen)

| Nimi | Ylläpitäjä | Sisältö | Muoto | Lisenssi | Tunnus | URL |
|---|---|---|---|---|---|---|
| Ilmatieteen laitoksen avoin data | IL | havainnot 1800-luvulta (Helsinki 1844–), tutka, salamat, ennusteet | WFS, GRIB, CSV | CC BY 4.0 | – | https://www.ilmatieteenlaitos.fi/avoin-data |
| Maanmittauslaitos | MML | maastokartat, korkeusmalli, nimistö, ortokuvat | GeoTIFF, GPKG, WMTS | CC BY 4.0 | API-avain (ilmainen) | https://www.maanmittauslaitos.fi/avoindata |
| SYKE | Suomen ympäristökeskus | vesistöt, järvet, valuma-alueet, CORINE | SHP, GeoTIFF | CC BY 4.0 | – | https://www.syke.fi/avoindata |
| Tilastokeskus | Tilastokeskus | väestö ruuduittain 1 km | GPKG, CSV | CC BY 4.0 | – | https://stat.fi/org/avoindata.html |
| Kansallisarkisto / Finna | KA, Kansalliskirjasto | historialliset kartat (esim. isojakokartat, Senaatin kartasto) | JPEG, IIIF | aineistokohtainen, usein CC BY 4.0 tai PD, **tarkistettava** | – | https://www.finna.fi/ |

**Lähteitä yhteensä**: 145 riviä 19 aihealueella (luvut 2.1–2.19). Avoimia ilman tunnusta on noin 80.

---

## 3. Yhdistäminen olemassa oleviin linssi-ideoihin (linssikatalogi A–Q ja Osa 3)

| Katalogin osa | Linssit | Mikä lähde palvelee | Mitä data tuo |
|---|---|---|---|
| A Uskonnot | A1–A7, P1 | Wikidata (pyhäpaikat, luostarit, perustamisvuodet), Pleiades (antiikin pyhäköt), World Historical Gazetteer | pysäkkien koordinaatit ja vuosiluvut koneellisesti; P1:n levinneisyyden pisteaineisto |
| B Tiede ja tekniikka | B4, B5, B6, B7 | Wikidata (observatoriot, yliopistot), historialliset kaapelikartat (Commons, PD), LoC-kartat (B7:n vanhat kartat pallolle) | B6: observatoriot pisteinä + HYG-taivas; B7: PD-kartta verhottuna pallolle |
| C Löytöretket ja liikkuminen | C1, C2, C4, C5 | **CLIWOC** (purjelaivojen reitit 1750–1854), **ICOADS** (1873:n laivat), **NSIDC-merijää** (C2), **20CRv3** (Foggin ja isoisän reittien sää), World Port Index | C5 saa aidon vuoden 1872–73 laivaliikenteen ja sään reitin ympärille |
| C7 Ihmisen matka | C7 | **GEBCO/ETOPO + Spratt & Lisiecki -merenpintakäyrä** (Beringia, Sahul, Doggerland), **HYDE 3.3** (väestö 10 000 eaa.–), Glottolog (austronesialaiset kielet L1:n jatkoksi) | rannikko liikkuu jääkauden merenpinnan mukana, ja maasillat näkyvät |
| D Kaupungit ja valtakunnat | D1–D6 | **Reba ym. (kaupunkiväestö 3700 eaa.–)**, Pleiades, ORBIS (D1/M2 Rooman tiet, tarkistettava), historical-basemaps (GPL), Sound Toll Registers (D3 Hansa, tarkistettava) | kaupunkien koko muuttuu pallolla vuosisadoittain |
| E Taide ja kulttuuri | E4–E6 | Wikidata (museot, näyttelyt, rakennukset + perustamisvuosi) | kaikki pysäkit yhdellä SPARQL-kyselyllä |
| F Luonto ja ympäristö | F1 tulivuoret | **NCEI Significant Volcanic Eruptions (PD)**, GIBS SO₂ (nykypurkaukset); GVP vain luvalla | Tambora 1815 ja Krakatau 1883 VEI-arvoineen |
| | F2/U3 muuttoreitit | **Movebank** (CC0/CC BY -tutkimukset), OBIS (valaat), GBIF | oikeat GPS-jäljet animoituna vuodenkierrossa |
| | F3 kasvien matkat | **MapSPAM 2020** (missä peruna, kahvi, tee ja sokeri kasvavat nyt), HYDE (pellot 1870) | alkuperäalue → nykyinen viljelyalue |
| | F4 maanjäristykset | **NCEI Significant Earthquakes (2150 eaa.–)**, USGS ComCat | Lissabon 1755, San Francisco 1906 ja Messina 1908 aineistosta |
| G Arki | G1 taudit | Malaria Atlas (CC BY 3.0), UN WPP (elinajanodote 1950–), Gapminder (1800–) | elinajanodote 1873 vs. nyt maittain |
| | G2 raha | **Maddison** (BKT/asukas 1870), RICardo | varallisuuden kartta 1870 vs. 2022 |
| | G6 posti ja sähkösanoma | historialliset kaapelikartat (PD) + OSM-merikaapelit (ODbL) | kaapeliverkko 1873 vs. nyt |
| H–L Maanosat | H1–L4 | Wikidata, Pleiades, Glottolog, HYDE (väestö), historical-basemaps | pysäkit ja taustakartta; L1: GEBCO + Glottolog (austronesialaiset) |
| M–O Aluelinssit | M1–O6 | **historical-basemaps (GPL-3.0)** ensisijainen; CShapes 2.0 (1886–) vain omistajan NC-päätöksellä; Maddison ja HYDE (väestö alueittain) | rajapolygonit avainvuosiksi; O4/O5: HYDE:n asutus leviää |
| N3 | N3 | historical-basemaps (1938, 1945), Wikidata (taistelut) | – |
| P Leviämiset | P1, P3, P4, P5 | Glottolog (P3 kielisukupuut), OSM:n rautatiet `start_date`-kentällä (P4), Martí-Henneberg (P4, tarkistettava), Wikidata (P5 painopaikat) | P4:n rataverkko piirtyy vuosi vuodelta |
| Q1 Isoisän linssi 1873 | Q1 | **ICOADS 1873** (laivat), **20CRv3 1873** (sää), **ERSST 1873** (meri), **HYDE 1870** (väestö, pellot), **Reba** (kaupungit 1875), **RICardo 1873** (kauppa), **Maddison 1870**, HYG + Horizons (taivas 1873) | koko "maailma 1873" -hetki datana: kaikki kerrokset samalle vuodelle |
| Q2 Atlaslehti | Q2 | Commons/LoC Stieler 1875 (PD) | – (jo valittu) |
| Osa 3 virtalinssit | S1 siirtomaat | historical-basemaps, CShapes (NC) | alueen värin vaihto vuosittain |
| | S2 kolmiokauppa | SlaveVoyages (historialliset kentät PD; imputoidut NC) | laivakohtaiset reitit ja vuodet; NC-kentät vain luvalla |
| | S3 maustereitit ja tee | **RICardo** (kauppavirrat 1787–), CLIWOC (VOC-laivat), ICOADS | virran paksuus todellisesta kaupan arvosta |
| | S4 hopea ja kulta | RICardo, Wikidata (kaivokset) | – |
| | S5 turkikset ja valaat | ICOADS (osa valaanpyytäjien lokeista; **tarkistettava**), OBIS (valaiden nykylevinneisyys) | – |
| | S6 luonnonvarat | **Global Energy Monitor** (kaivokset, öljy, kaasu), GPPD, EDGAR (päästöt) | nykyhetken pää virralle |
| | S7 musta kulta | GEM Oil & Gas Extraction Tracker (kentät ja avausvuodet) | kentät syttyvät avausvuosinaan |
| | T1 siirtolaisuus | RICardo (satamat), Abel & Cohen (nykyvirrat 1990–2020, tarkistettava), UN WPP | historiallinen vs. nykyinen muuttovirta |
| | U1 sähkösanomakaapelit | historialliset kaapelikartat (PD, digitoidaan), OSM-merikaapelit | kaapelit 1851–1902 → nykyverkko |
| | U2 postireitit | ICOADS (höyrylaivojen sijainnit 1873), World Port Index | todelliset höyrylinjat |

---

## 4. Uudet linssi-ideat, jotka data mahdollistaa

Vaikeus: **helppo** = valmis kuva- tai CSV-aineisto, alle 2 päivää; **keski** = esiprosessointi + oma kerros;
**vaikea** = iso data, hiukkasvirta tai monta lähdettä. Sopivuus 1873: ★★★ = sidottavissa isoisän matkaan,
★★ = luonteva "ennen ja nyt", ★ = nykyhetken linssi.

| # | Linssi | Mitä pelaaja näkee (1 lause) | Lähteet | Aikasarja | Vaikeus | 1873 |
|---|---|---|---|---|---|---|
| 1 | **Maailma palaa** | Viimeisen viikon palot hehkuvat pallolla, ja valitun kuukauden palot syttyvät ja sammuvat päivä kerrallaan. | FIRMS 7 pv (ei tunnusta), GIBS-palokerros | animoitu | keski | ★ (Peshtigo 1871 ja Chicago 1871 pysäkkeinä) |
| 2 | **Savun tie** (omistajan esimerkki) | Palojen ja pölyn aerosolipilvet kulkevat mantereelta toiselle kolmen kuukauden ajan. | CAMS AOD (CC BY 4.0, tili), vaihtoehtona GIBS MODIS AOD | animoitu | vaikea | ★ (Krakatau 1883: auringonlaskut punaisina ympäri maailman) |
| 3 | **Isoisän sää** | Pelaaja valitsee päiväkirjan päivän, ja pallolle piirtyvät sen päivän matalapaineet ja tuulet vuonna 1873. | 20CRv3 | animoitu (päivä) | vaikea | ★★★ |
| 4 | **Laivat 1873** | Jokainen vuoden 1873 laivahavainto piirtyy pisteenä, ja reitit piirtyvät vähitellen kuukausi kerrallaan. | ICOADS R3 | animoitu | keski | ★★★ |
| 5 | **Meriliikenne ennen ja nyt** | Liukusäädin vaihtaa ICOADS 1873:n harvat reitit nykypäivän AIS-tiheyteen. | ICOADS + Maailmanpankin laivatiheys | staattinen vertailu | helppo | ★★★ |
| 6 | **Purjelaivojen tuulet** | 1750–1854 lokikirjojen reitit ja tuulihavainnot näyttävät, miksi laivat kiersivät Atlantin kaarena. | CLIWOC | animoitu | keski | ★★ |
| 7 | **Yön valot ennen ja nyt** | Pallo pimenee yöksi: nyt kaupungit loistavat, ja vuoden 1873 asetuksella palaa vain kaasuvalojen kaupunkeja. | Black Marble (GIBS), EOG VNL, Reba (kaupungit 1875) | staattinen + vertailu | helppo | ★★ |
| 8 | **Näetkö Linnunradan?** | Valitun paikan taivas: tähtien määrä vähenee valosaasteen mukaan, ja vuoden 1873 taivas on täynnä tähtiä. | HYG, Deep Star Maps, EOG VNL (Falchin atlas vain luvalla) | staattinen | keski | ★★ |
| 9 | **Isoisän tähtitaivas** | Päiväkirjan yön taivas planeettoineen oikeasta paikasta nähtynä, ja Venuksen ylikulku 9.12.1874 omana pysäkkinään. | HYG, JPL Horizons, Stellarium-tähtikuviot, NASA Eclipse | animoitu (yö) | keski | ★★★ |
| 10 | **Revontulet nyt** | Revontuliovaali elää napojen ympärillä reaaliajassa, ja vertailuna on suuri revontulimyrsky helmikuussa 1872. | NOAA OVATION | reaaliaika | helppo | ★★ |
| 11 | **Myrskyjen radat** | Kaikki trooppiset myrskyt 1850-luvulta alkaen piirtyvät vuosi kerrallaan, ja voimakkuus näkyy värinä. | IBTrACS, HURDAT2 | animoitu | helppo | ★★★ (1873 Nova Scotian hurrikaani) |
| 12 | **Maa järisee** | Viimeisen 30 päivän järistykset sykkivät, ja historiasta nousevat Lissabon 1755 ja muut merkittävät. | USGS ComCat, NCEI | reaaliaika + historia | helppo | ★★ |
| 13 | **Tulen vuoret** | Merkittävät purkaukset 4 000 vuoden ajalta, ja purkauksen koko (VEI) näkyy renkaana. | NCEI Volcanoes, GIBS SO₂ | animoitu | helppo | ★★ (Krakatau 1883 kymmenen vuotta matkan jälkeen) |
| 14 | **Lämpenevä meri** | Meren pintalämpö 1854→nyt: vuoden 1873 meri on vertailupohja, ja poikkeama värjää pallon. | ERSST v5 | animoitu | keski | ★★★ |
| 15 | **Ilmastovyöhykkeet liikkuvat** | Köppenin vyöhykkeet 1901–1930 → 1991–2020 → 2071–2099, jolloin Sahara ja tundra siirtyvät. | Köppen–Geiger (Beck 2023) | jaksot | helppo | ★★ |
| 16 | **Pellot valtaavat maan** | Viljelyksen leviäminen 10 000 eaa.→nyt, ja vuosi 1870 on merkkipaalu. | HYDE 3.3 | animoitu | keski | ★★★ |
| 17 | **Ihmisiä pallolla** | Väestötiheys kasvaa ja keskittyy: 1870 (HYDE) → 1975–2030 (GHSL). | HYDE, GHSL | animoitu | keski | ★★★ |
| 18 | **Kaupungit kasvavat** | Maailman suurimmat kaupungit 3700 eaa.→2000 pylväinä, ja kärkikymmenikkö vaihtuu. | Reba ym., GHSL UCDB | animoitu | helppo | ★★★ (vuoden 1875 kärkikaupungit isoisän reitillä) |
| 19 | **Maailmantalouden painopiste** | Talouden painopiste vaeltaa Aasiasta Eurooppaan ja takaisin vuodesta 1 jaa. nykyhetkeen. | Maddison | animoitu | keski | ★★★ |
| 20 | **Kauppavirrat 1873** | Maiden väliset kauppavirrat valuvat nuolina, ja paksuus kertoo arvon (RICardo). Nykyvertailu tehdään BACIlla. | RICardo, BACI | animoitu + vertailu | keski | ★★★ |
| 21 | **Metsät katoavat** | Metsäkato 2001–2024 punaisena vuosi vuodelta. Pellot 1870 (HYDE) kertovat, mitä raivattiin ennen. | Hansen GFC, HYDE | animoitu | vaikea (datamäärä) | ★★ |
| 22 | **Pisaran matka** | Pelaaja napauttaa maata, ja pisara virtaa jokia pitkin mereen, jolloin valuma-alue valaistuu. | HydroRIVERS, HydroBASINS | interaktiivinen | keski | ★★ (Niili, Kongo ja Mississippi isoisän tutkimusmatkoilla) |
| 23 | **Kielten kirjo** | 8 000 kieltä pisteinä, joissa kielisuku on värinä ja uhanalaiset kielet himmenevät. | Glottolog, Grambank | staattinen | helppo | ★★ (monet kielet olivat 1873 elinvoimaisia) |
| 24 | **Mitä maa kasvaa** | Kahvin, teen, riisin ja perunan viljelyalueet, joiden alle maaperän pH ja ilmastovyöhyke valaisevat syyn. | MapSPAM, SoilGrids, Köppen | staattinen | keski | ★★ (F3 kasvien matkat) |
| 25 | **Sähkö syttyy** | Voimalaitokset syttyvät avausvuosinaan: hiili, vesi, ydin, tuuli ja aurinko. Vuonna 1873 ei vielä yhtään. | Global Energy Monitor, GPPD, Ember | animoitu | keski | ★★ |
| 26 | **Tuulet nyt** | Nullschool-tyyliset tuulihiukkaset huomisen ennusteesta, ja vertailuna isoisän 1873 tuulet samasta kuukaudesta. | ECMWF Open Data tai GFS, 20CRv3 | animoitu | vaikea | ★★ |
| 27 | **Ilma jota hengitämme** | Asemien PM2.5-pallot ja EDGAR-päästöhila kertovat, mistä saaste tulee. | OpenAQ, EDGAR | staattinen + kk | keski | ★ (hiilisavu 1873 Lontoossa pysäkkinä) |
| 28 | **Eläinten matkat** | Kurkien, haikaroiden, gnujen ja merikilpikonnien GPS-jäljet liikkuvat vuodenkierrossa. | Movebank (CC0/CC BY), OBIS | animoitu | keski | ★ (F2) |
| 29 | **Korallien helle** | Lämpöstressin viikot värjäävät riutat, ja korallien vaalenemisvuodet sykkivät. | Coral Reef Watch, Allen Coral Atlas | animoitu | keski | ★ |
| 30 | **Jääkauden rannat** | Merenpinta laskee 120 m, jolloin Beringia, Doggerland ja Sahul nousevat ja uppoavat uudelleen. | GEBCO/ETOPO, Spratt & Lisiecki | animoitu | helppo | ★★ (C7:n tausta) |
| 31 | **80 päivää → 80 tuntia** | Matka-ajan kartta Lontoosta: Bartholomew'n isokrooninen kartta 1914 (PD) rinnakkain nykyisten lentoyhteyksien kanssa. | Commons (PD), OurAirports, OpenFlights (2014) | staattinen vertailu | keski | ★★★ (Fogg 1872 ja isoisä 1873) |
| 32 | **Lentävä maapallo** | Yhden vuorokauden kaikki lennot valojuovina (adsb.lol), ja vertailuna Foggin laivareitti. | adsb.lol (ODbL) | animoitu (24 h) | vaikea | ★★ |
| 33 | **Sähkeet 1873 ja nyt** | Vuoden 1873 kaapelit (digitoitu PD-kartoista) välähtävät, ja nykyinen merikaapeliverkko häivytetään päälle. | Commons/LoC-kaapelikartat, OSM-merikaapelit | vertailu | keski | ★★★ (pelin sähkeet) |
| 34 | **Elinajan kartta** | Elinajanodote maittain 1800→nyt: vuonna 1873 kaikkialla alle 45 vuotta. | Gapminder, UN WPP | animoitu | helppo | ★★★ |
| 35 | **Suomen sää 1844→nyt** | Helsingin ja muiden asemien pitkät sarjat pylväinä Suomen päällä. | Ilmatieteen laitos (CC BY 4.0) | animoitu | helppo | ★★ |

---

## 5. Lisenssi- ja attribuutiotaulukko

Teksti näytetään linssin tiedeliitteessä ja pelin lähdeluettelossa. Sama teksti tallennetaan ämpärin tiedoston
`lahde`-kenttään (url, viite, haettu, lisenssi), kuten Siirtosepän skeemassa. Suomenkielinen muoto on sallittu,
jos alkuperäinen nimi ja lisenssi säilyvät.

| Lähde | Lisenssi | Vaadittu tai suositeltu attribuutio |
|---|---|---|
| NASA (GISTEMP, GIBS, FIRMS, SVS, Black Marble, Blue Marble, Horizons) | PD / NASA-avoin | GISTEMP: "GISTEMP Team, 2026: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA GISS" · GIBS: "We acknowledge the use of imagery provided by services from NASA's Global Imagery Browse Services (GIBS), part of NASA's ESDIS" · FIRMS: "We acknowledge the use of data and/or imagery from NASA's FIRMS, part of NASA's LANCE and ESDIS" + NASA:n vastuuvapauslauseke · SVS: "NASA's Scientific Visualization Studio" |
| NSIDC G02135 | vapaa, viittaus ehtona | Fetterer, F. ym. (2017). Sea Ice Index, Version 4 (G02135). NSIDC. doi:10.7265/a98x-0f50 + merkintä "NASA / NSIDC" |
| NOAA (ERSST, OISST, ETOPO, IBTrACS, HURDAT2, NCEI Hazards, STAR LSA, WOA, CRW, SWPC, WPI) | PD (liittovaltio) | tuotteen viite, esim. "Huang ym. (2017) NOAA ERSST v5, doi:10.7289/V5T72FNM"; "NOAA NCEI/WDS Global Significant Earthquake Database, doi:10.7289/V5TD9V7K" |
| NOAA 20CRv3 | NOAA, vapaa | "20th Century Reanalysis V3 data provided by the NOAA/OAR/ESRL PSL, Boulder, Colorado, USA" + Slivinski ym. 2019 |
| USGS ComCat, Landsat | PD | "U.S. Geological Survey" (+ tuote) |
| HadCRUT5 | OGL v3 | "© British Crown Copyright, Met Office, provided under an Open Government License" + Morice ym. 2021 |
| Copernicus: ERA5, CAMS, CMEMS, Sentinel | CC BY 4.0 (CDS/ADS 2.7.2025–); CMEMS oma avoin lisenssi; Sentinel vapaa | "Generated using Copernicus Atmosphere Monitoring Service information [vuosi]" · "Contains modified Copernicus Climate Change Service information [vuosi]" · "E.U. Copernicus Marine Service Information" + DOI · "Contains modified Copernicus Sentinel data [vuosi]" |
| ECMWF Open Data | CC BY 4.0 | "ECMWF, CC BY 4.0" + tuotenimi |
| JRC (GHSL, EDGAR, GSW) | CC BY 4.0 / Copernicus | GHSL: "Schiavina ym. GHS-POP R2023A, European Commission JRC" · EDGAR: "Crippa ym. (2024) EDGAR, European Commission JRC" · GSW: "Source: EC JRC/Google" |
| GEBCO | PD, lähde mainittava | "GEBCO Compilation Group (2025) GEBCO 2025 Grid (doi:10.5285/…)"; ei viittausta virallisuuteen |
| Natural Earth, OurAirports | PD | ei vaadita; kohteliaisuutena "Made with Natural Earth" |
| Maddison 2023 | CC BY 4.0 | "Maddison Project Database, version 2023 by Bolt & van Zanden, doi:10.34894/INZBF2" |
| HYDE 3.3 | CC BY 4.0 | "Klein Goldewijk, K. (2024) HYDE 3.3, Utrecht University, doi:10.24416/UU01-94FNH0" |
| Reba ym. 2016 | CC BY 4.0 | "Reba, Reitsma & Seto (2016) Scientific Data 3:160034" |
| ICOADS R3 | CC BY 4.0 | "Freeman ym. (2017) ICOADS Release 3.0, NCAR RDA ds548.0" |
| CLIWOC | CC BY 3.0 | "Jones, P.D. ym. (2007) CLIWOC release 2.1, PANGAEA, doi:10.1594/PANGAEA.611088" |
| Maailmanpankki (WDI, laivatiheys, Solar/Wind Atlas) | CC BY 4.0 | "The World Bank" + aineiston nimi; laivatiheys: "IMF World Seaborne Trade Monitoring System (Cerdeiro ym. 2020)"; Wind: "Global Wind Atlas 4.0, DTU Wind + World Bank" |
| WRI (GPPD, Aqueduct), GEM, Ember, WorldPop, Köppen (Beck), Hansen, RESOLVE, SoilGrids, HydroSHEDS, Allen Coral Atlas, EMODnet, Glottolog, WALS, Grambank, D-PLACE, Gapminder, OWID, GeoNames, OpenAQ, Kummu, IL, MML, SYKE, Tilastokeskus | CC BY 4.0 | tekijä + aineisto + vuosi + "CC BY 4.0"; esim. "Hansen/UMD/Google/USGS/NASA, Global Forest Change 2000–2024 v1.12"; "Lehner & Grill 2013, HydroSHEDS"; "Glottolog 5.x, Hammarström ym." |
| UN WPP 2024 | CC BY 3.0 IGO | "United Nations, DESA, Population Division (2024). World Population Prospects 2024" |
| Pleiades | CC BY 3.0 | "Pleiades, pleiades.stoa.org" + haettu päivä |
| Malaria Atlas Project | CC BY 3.0 | "Malaria Atlas Project" + tuote ja vuosi |
| BACI | Etalab 2.0 | "CEPII BACI" + linkki |
| RICardo, adsb.lol, OSM, OpenFlights, healthsites | ODbL 1.0 | "© OpenStreetMap contributors, ODbL" / "RICardo, Sciences Po, ODbL" / "adsb.lol, ODbL"; **johdettu tietokanta jaetaan ODbL:llä** |
| historical-basemaps | GPL-3.0 | "A. Ourednik, historical-basemaps, GPL-3.0"; johdettu aineisto GPL:llä (jo linjattu Q1:ssä) |
| HYG 4.2, Stellarium-kulttuurit | CC BY-SA 4.0 | "HYG Database, astronexus.com, CC BY-SA 4.0"; johdettu tähtiluettelo samalla lisenssillä |
| Wikidata | CC0 | ei vaadita; suositus "Wikidata" |
| PSMSL | vapaa, viittaus | "Holgate ym. (2013) + PSMSL (2026)" |
| **Rajoitetut (NC), vain omistajan päätöksellä** | CC BY-NC tai oma ehto | Berkeley Earth, Falchi-atlas, GFW, OBIS (kokonaisuus), eBird S&T, Gaia DR3, CShapes 2.0, David Rumsey, TeleGeography, WHO GHO, IHME, EM-DAT, Smithsonian GVP, OpenSky, SlaveVoyagesin imputoidut kentät, Sentinel-2 cloudless 2018– |
| **Suljetut** | uudelleenjakelu kielletty | WDPA, IUCN Red List -levinneisyydet, UNESCO WHC -syötteet |

---

## 6. Tekninen huomio per muototyyppi

Kaikille yhteistä: työkaluputki `tools/<linssi>/*.mjs` tai Python-skripti ajetaan Macilla. Tulos menee ämpäriin
`virta/<linssi>/` ja saa `lahde`-kentät. Pallo käyttää ekvirektangulaarista (EPSG:4326) pohjaa, joten
rasterit viedään ensin siihen projektioon ja vektorit pidetään lat/lon-muodossa.

**NetCDF / GRIB (ilmasto, sää, meri: GISTEMP, ERSST, 20CRv3, ERA5, CAMS, ECMWF)**
- Luku `xarray` + `netCDF4` / `cfgrib` (GRIB), tai `gdal_translate NETCDF:"f.nc":var`.
- Aikasarja: valitaan muuttuja ja aika-akseli, lasketaan kuukausi- tai vuosikeskiarvot ja rajataan tarvittava tarkkuus
  (esim. 1° → 360×180).
- Kvantisointi tavuiksi (uint8, esim. −4…+4 °C 256 askeleeseen) tai uint16. Puuttuva arvo on oma koodi (0 tai 255),
  ja shader piirtää sen läpinäkyvänä.
- Pakkaus: pino `.bin`-tiedostona (otsake + T×H×W tavua, gzip/brotli) → Unityssä `Texture2DArray`, webissä
  `DataTexture`. Vuosien välinen interpolointi tehdään shaderissa (Maapallon tila -suunnitelman malli).
- Tuulet ja virrat (u, v): kaksi kanavaa RG-tekstuuriin → GPU-hiukkasadvektio (nullschool-malli). 20CRv3:n 3 tunnin
  askel riittää "isoisän päivä" -animaatioon.
- Tiheät päivittäiset kentät (CAMS AOD 90 vrk): vaihtoehtona on 10-bittinen video (HEVC/AV1) ekvirektangulaarisena
  ja purku tekstuuriin. Tämä on pienempi kuin tavupino, mutta laatu on häviöllinen.

**GeoTIFF / COG (maanpeite, metsä, väestö, yövalot: Hansen, WorldCover, GHSL, EOG, SoilGrids)**
- `gdalwarp -t_srs EPSG:4326 -tr 0.05 0.05 -r average` (jatkuva) tai `-r mode` (luokat) karkeistaa pallotasolle.
- `gdal_translate -ot Byte -scale min max 1 255` tai `gdaldem color-relief` värjää paletilla (paletti sovitetaan pelin sävyyn).
- Laattapyramidi: `gdal2tiles.py --xyz` tai `rio-tiler`/`rio-cogeo` → PNG/WebP-laatat tai **PMTiles** (yksi tiedosto
  ämpärissä, HTTP Range -haut). Pallon napa-alueille tarvitaan ekvirektangulaariset laatat, ei Web Mercatoria.
- Isot (Hansen 30 m) aineistot karkeistetaan ensin 10°-laatoittain ja yhdistetään vasta sitten (`gdalbuildvrt`),
  jotta muisti riittää.

**ESRI ASCII grid (HYDE)**: `gdal_translate` → GeoTIFF, minkä jälkeen käsittely jatkuu kuten GeoTIFF. Aikasarja
(1870, 1880, …) kvantisoidaan yhdeksi tavupinoksi.

**Vektorit: Shapefile / GeoJSON / GPKG (rajat, joet, ekoalueet, merijää)**
- `ogr2ogr -f GeoJSON -t_srs EPSG:4326` → `mapshaper -simplify 5% keep-shapes` (Douglas–Peucker/Visvalingam)
  → **TopoJSON** (jaetut rajat pienenevät) tai `tippecanoe` → MVT/PMTiles.
- Pallolle polygonit kolmioidaan (earcut) ja nostetaan hieman pinnan yläpuolelle, kuten vesistökerros ja merijää.
- Aikaversioidut rajat (historical-basemaps, CShapes): yksi tiedosto per avainvuosi tai `alku`/`loppu`-kentät
  yhdessä tiedostossa.

**CSV / Parquet -pisteet (FIRMS, ICOADS, IBTrACS, USGS, Reba, GEM, OurAirports)**
- Suodatus `duckdb`:llä (lukee CSV:n ja Parquetin suoraan, myös S3:sta): vain tarvittavat sarakkeet ja vuodet.
- Binaarimuoto: lajitellaan ajan mukaan, lat/lon int16 (0,01°) tai float32, aika minuutteina alusta (uint32),
  arvo uint8 → yksi `.bin` + pieni hakemisto kuukausittain. Animaatio lukee vain kuluvan ikkunan.
- Reitit (ICOADS-laivat, IBTrACS-myrskyt, Movebank): pisteet ryhmitellään tunnuksen mukaan polyline-muotoon,
  harvennetaan (esim. 1 piste / 6 h) ja piirretään isoympyräinterpoloituna.
- ICOADS IMMA1 on kiinteäleveyksistä tekstiä. Jäsennys tehdään `pyicoads`-tyyppisellä lukijalla tai omalla
  sarakemäärittelyllä (vuosi, kk, pv, tunti, lat, lon, ID, SST, paine, tuuli).

**WMTS / WMS (GIBS, Allen Coral Atlas, EMODnet)**
- Esihaetaan kiinteillä zoomeilla ja päivillä ämpäriin (GIBS:n EPSG:4326-laattaskeema sopii suoraan pallolle).
  Nopein prototyyppi on suora haku GIBS:stä, mutta tuotannossa striimataan omasta ämpäristä (offline ja
  sulavuus). Kiitosteksti näytetään.
- GetCapabilities kertoo kerroksen päivät. Päiväsarja tehdään hakemalla sama laatta monelle `TIME=`-arvolle.

**API (Open-Meteo, OVATION, USGS-syöte, Horizons, Wikidata SPARQL)**
- Reaaliaikaiset ovat toissijaisia. Suositus on ajastettu haku (esim. kerran tunnissa CI:ssä tai Macilla) →
  tilannekuva ämpäriin → peli lukee aina ämpärin. Tällöin peli ei riipu kolmannen osapuolen saatavuudesta,
  eikä käyttäjä ohita lähteen kiintiöitä.
- Horizons ja Wikidata: esilasketaan kerran (esim. planeettojen paikat kaikille päiväkirjan päiville) ja tallennetaan JSON:na.

**Historialliset skannatut kartat (LoC, Commons)**: georeferointi Allmapsilla (IIIF + GCP:t, avoin työkalu) tai
`gdal_translate -gcp` + `gdalwarp` → ekvirektangulaarinen tekstuuri (Q2:n malli).

---

## 7. Suositeltu toteutusjärjestys: ensimmäiset 10 datalinssiä

Perusteet: (1) avoin lisenssi ilman uusia tunnuksia, (2) vahva sidos isoisän vuoteen 1873 tai pelin tarinaan,
(3) visuaalinen vaikutus ja omistajan toiveet, (4) toteutuksen riski. Aloitetaan helpolla ja uudelleenkäytettävällä
(pistemoottori, rasteripino, virtamoottori), jolloin myöhemmät linssit ovat halvempia.

| # | Linssi | Lähteet | Miksi tässä kohdassa |
|---|---|---|---|
| 1 | **Maapallon tila** (jo suunniteltu) | NSIDC G02135, GISTEMP, **NOAA STAR LSA -merenpinta** | Päätös on jo tehty. Tämä selvitys löysi merenpinnalle kirjautumattoman NOAA STAR -CSV:n (PD), joka täyttää suunnitelman aukon. Rakentaa rasteripinon ja aikaselaimen, joita linssit 3, 5 ja 7 käyttävät. |
| 2 | **Laivat 1873** (#4) + ennen ja nyt (#5) | ICOADS R3 (CC BY 4.0), Maailmanpankin laivatiheys (CC BY 4.0) | Vahvin kytkös isoisän matkaan: oikeat vuoden 1873 laivat. Pieni data vuoden suodatuksen jälkeen. Rakentaa pistemoottorin, jota käyttävät myrskyt, järistykset ja palot. |
| 3 | **Yön valot ennen ja nyt** (#7) | Black Marble (GIBS, ei tunnusta), EOG VNL, Reba (kaupungit 1875) | Helppo ja näyttävä. Valmis kuva ja yksi pistekerros. Ennen ja nyt -asetelma on selvä. |
| 4 | **Maailma palaa + savun tie** (#1, #2) | FIRMS 7 pv (ei tunnusta), GIBS AOD; CAMS vasta tilin hyväksynnän jälkeen | Omistajan oma esimerkki. Ensimmäinen versio tehdään ilman tunnuksia (FIRMS NRT + GIBS). CAMS:n 3 kuukauden savuanimaatio vaatii ilmaisen ECMWF-tilin, eli omistajan kortin. |
| 5 | **Myrskyjen radat** (#11) | IBTrACS, HURDAT2 | Pistemoottorin helppo jatko, animoitava ja 1850-luvulta alkaen. Vuoden 1873 myrskyt ovat pysäkkeinä. |
| 6 | **Maa järisee + tulen vuoret** (#12, #13) | USGS, NCEI Hazards (PD) | Palvelee katalogin F1:tä ja F4:ää suoraan. Pieni data, ja lisänä reaaliaikainen syöte. GVP jätetään pois (NC). |
| 7 | **Ihmisiä ja peltoja 10 000 eaa.–2023** (#16, #17, #18) | HYDE 3.3, GHSL, Reba | Toimii C7 Ihmisen matkan taustana ja Q1:n "maailma 1870" -hetkenä. Käyttää rasteripinoa (1) ja pisteitä (2). |
| 8 | **Kauppavirrat 1873** (#20) | RICardo (ODbL), BACI (Etalab) | Ensimmäinen dataan perustuva virtalinssi. Osa 3:n S1–S4 saa todellisen kaupan arvon, ja tästä syntyy virtamoottorin datarajapinta. |
| 9 | **Isoisän sää ja tähtitaivas** (#3, #9) | 20CRv3, HYG, JPL Horizons | Ainutlaatuinen pelin tarinalle: päiväkirjan päivän sää ja taivas. Vaikein (tuulihiukkaset), joten se tulee kun rasteri- ja pistemoottorit ovat valmiit. |
| 10 | **Lämpenevä meri 1854→nyt** (#14) + ilmastovyöhykkeet (#15) | ERSST v5, Köppen–Geiger | Maapallon tilan (1) luonteva jatko samalla moottorilla. Vuoden 1873 meri on vertailupohja. |

**Päätettävää Fablelle ja omistajalle** (korttiehdotukset):
1. Saako **ilmaisia tilejä** luoda datan hakua varten: ECMWF (CAMS, ERA5), EOG, Copernicus Data Space ja GBIF?
   Earthdata on Fablen linjauksella pois. Ilman näitä linssit 1–3 ja 5–10 onnistuvat silti; vain CAMS-savu vaatii tilin.
2. **NC-lisenssit**: hyväksytäänkö yksikään (esim. CShapes 2.0 aluelinsseihin, Falchin valosaasteatlas, GVP)?
   Suositus: ei. Jokaiselle on avoin vaihtoehto (historical-basemaps, EOG + HYG, NCEI).
3. **ODbL- ja CC BY-SA -jakoehto** (RICardo, adsb.lol, HYG): ämpärin johdettu aineisto julkaistaan samalla
   lisenssillä, ja se kirjataan `lahde`-kenttään. Jakoehto koskee vain johdettua aineistoa, ei pelin koodia; linjaus on Raamatussa (DATALINSSIT, 24.9.).

---

## Liite: tarkistetut lisenssisivut (24.9.2026)

- FIRMS: https://firms.modaps.eosdis.nasa.gov/active_fire/ · https://firms.modaps.eosdis.nasa.gov/download/
- Copernicus-lisenssi ja CC BY -siirtymä 2.7.2025: https://forum.ecmwf.int/t/cc-by-licence-to-replace-licence-to-use-copernicus-products-on-02-july-2025/13464 · https://apps.ecmwf.int/datasets/licences/cams
- GIBS: https://nasa-gibs.github.io/gibs-api-docs/access-basics/
- EOG VNL: https://eogdata.mines.edu/products/vnl/
- HYDE 3.3: https://public.yoda.uu.nl/geo/UU01/AEZZIT.html (sivu esti työkalun; lisenssi CC BY 4.0 hakutuloksesta ja pastclim-dokumentaatiosta)
- Maddison: https://www.rug.nl/ggdc/historicaldevelopment/maddison/releases/maddison-project-database-2023
- Smithsonian GVP: https://volcano.si.edu/gvp_termsofuse.cfm (403 työkalulle; ehdot hakutuloksesta)
- Movebank: https://www.movebank.org/cms/movebank-content/data-policy
- TeleGeography: https://www2.telegeography.com/cite-telegeography-map
- Reba ym.: https://www.nature.com/articles/sdata201634
- CLIWOC: https://doi.pangaea.de/10.1594/PANGAEA.611088 (CC BY 3.0 varmistettu sivulta)
- SlaveVoyages: https://legacy.slavevoyages.org/blog/legal
- Falchi: https://dataservices.gfz-potsdam.de/ (CC BY-NC 4.0 13.11.2019 alkaen)
- WRI GPPD: https://github.com/wri/global-power-plant-database
- GEM: https://globalenergymonitor.org/creative-commons-public-license/
- Maailmanpankin laivatiheys: https://datacatalog.worldbank.org/search/dataset/0037580/global-shipping-traffic-density (CC BY 4.0 varmistettu sivulta)
- EMODnet: https://emodnet.ec.europa.eu/geonetwork/srv/api/records/0f2f3ff1-30ef-49e1-96e7-8ca78d58a07c
- OurAirports: https://github.com/davidmegginson/ourairports-data
- Berkeley Earth: https://berkeleyearth.org/data/ (CC BY-NC 4.0 varmistettu sivulta)
- ECMWF Open Data: https://www.ecmwf.int/en/about/media-centre/news/2025/ecmwf-makes-its-entire-real-time-catalogue-open-all
- Open-Meteo: https://open-meteo.com/en/license
- CHIRPS: https://www.chc.ucsb.edu/data/chirps
- Köppen–Geiger: https://www.nature.com/articles/s41597-023-02549-6
- WorldPop: https://hub.worldpop.org/Global1_2000-2020 · GHSL: https://human-settlement.emergency.copernicus.eu/datasets.php
- Glottolog: https://glottolog.org/meta/downloads · UNESCO WHC: https://whc.unesco.org/en/syndication/ · Pleiades: https://pleiades.stoa.org/downloads
- Hansen GFC: https://storage.googleapis.com/earthenginepartners-hansen/GFC-2024-v1.12/download.html · RESOLVE: https://ecoregions.world/
- HydroSHEDS: https://www.hydrosheds.org/page/license · SoilGrids: https://docs.isric.org/globaldata/soilgrids/SoilGrids_faqs.html
- GEBCO: https://www.gebco.net/data-products/gridded-bathymetry-data/terms-of-use
- Global Fishing Watch: https://globalfishingwatch.org/our-apis/documentation/docs/license-rate-limits
- OpenAQ: https://docs.openaq.org/resources/licenses · Malaria Atlas: https://malariaatlas.org/open-access-policy/
- PSMSL: https://psmsl.org/data/obtaining/ · NOAA STAR LSA: https://www.star.nesdis.noaa.gov/socd/lsa/SeaLevelRise/LSA_SLR_products.php
- HadCRUT5: https://www.metoffice.gov.uk/hadobs/hadcrut5/terms_and_conditions.html · ERSST: https://www.ncei.noaa.gov/products/extended-reconstructed-sst
- 20CRv3: https://psl.noaa.gov/data/20thC_Rean/ · ICOADS: https://rda.ucar.edu/datasets/d548000/
- HYG: https://codeberg.org/astronexus/hyg · Deep Star Maps: https://svs.gsfc.nasa.gov/4851 · Gaia: https://www.cosmos.esa.int/web/gaia-users/license (CC BY-NC 3.0 IGO varmistettu sivulta)
- CShapes: https://icr.ethz.ch/data/cshapes/ · EOX: https://eox.at/2025/03/sentinel-2-cloudless-2024/ · David Rumsey: https://www.davidrumsey.com/about/copyright-and-permissions
- UN WPP: https://population.un.org/wpp/ · Kummu: https://www.nature.com/articles/s41597-025-04487-x · historical-basemaps: https://github.com/aourednik/historical-basemaps
- eBird: https://science.ebird.org/en/status-and-trends/products-access-terms-of-use · WDPA: https://www.protectedplanet.net/en/legal
- Global Wind Atlas: https://globalwindatlas.info/ · EM-DAT: https://doc.emdat.be/docs/legal/terms-of-use/ · OpenSky: https://opensky-network.org/about/terms-of-use
- Stellarium: https://github.com/Stellarium/stellarium-skycultures · NCEI Hazards: https://www.ngdc.noaa.gov/hazel/
- RICardo: https://zenodo.org/records/1119592 · BACI: https://www.cepii.fr/DATA_DOWNLOAD/baci/doc/baci_webpage.html · adsb.lol: https://github.com/adsblol/globe_history_2025
- EDGAR: https://edgar.jrc.ec.europa.eu/ · OVATION: https://services.swpc.noaa.gov/json/ · OBIS: https://manual.obis.org/policy.html
- Natural Earth: https://www.naturalearthdata.com/about/terms-of-use/ · JRC GSW: https://global-surface-water.appspot.com/download
- WHO: https://www.who.int/about/policies/publishing/copyright · SEDAC → Earthdata: https://www.earthdata.nasa.gov/news/data-from-sedac-available-again-earthdata-search
- MapSPAM: https://www.mapspam.info/data/ · Allen Coral Atlas: https://allencoralatlas.org/resources/ · CMEMS: https://marine.copernicus.eu/user-corner/service-commitments-and-licence
