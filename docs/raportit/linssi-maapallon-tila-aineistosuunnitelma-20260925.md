# Maapallon tila -linssi (R36): aineistosuunnitelma (25.9.2026)

*Linssiseppä (Opus) Fablen käskystä 25.9. klo 01.3x. Täydentää suunnitelmaa
linssi-maapallon-tila-suunnitelma-20260924.md (linssin näkymät, kamera, tekstit, arkkitehtuuri) aineiston osalta:
lähteet, lisenssit, tiedostot ja kuvakoot sekä aikajana. Toteutus alkaa vasta pariteettikierroksen ja omistajan
build-kokeilun korjausten jälkeen (Raamattu, MAAPALLON TILA -LINSSI). Kaikki alla olevat osoitteet, koot ja
viimeiset havainnot on tarkistettu verkosta 25.9.2026 klo 01.3x ilman kirjautumista.*

## 0. Muutokset 24.9. suunnitelmaan

1. **Mannerjäätiköt (GRACE) pois** (Fable 24.9.): näkymiä on neljä: arktinen merijää, Etelämantereen merijää,
   lämpötila ja merenpinta. 24.9. suunnitelman luvut 1, 3 ja 6 mainitsevat vielä GRACEn; tämä dokumentti ohittaa ne.
2. **Merenpinta: NOAA STAR LSA on pysähtynyt.** Kaikki neljä LSA-sarjaa (free/keep × all_66/ref_90) päättyvät
   vuoden 2025 alkuun (viimeinen havainto 2025.127 eli 17.2.2025). Tilalle NASA JPL:n GMSL-sarja Zenodossa
   (CC BY 4.0, ilman kirjautumista, havainnot vuoden 2025 loppuun), luku 1.4.
3. **Vuodet aineiston mukaan, ei kalenterin**: syyskuun 2026 kuukausiaineisto ilmestyy vasta lokakuussa ja
   GISTEMP:n vuoden 2026 keskiarvo tammikuussa 2027. Katso luku 4.
4. **Pipeline on pelkkä Node (.mjs), ei Python-kirjastoja**: Macilla ei ole numpy/pyproj/netCDF4:ää, eikä niitä
   tarvita. Shapefile ja netCDF-3 luetaan suoraan tavuina, ja napastereografinen projektio puretaan Snyderin
   kaavalla.

## 1. Lähteet ja lisenssit

### 1.1 Merijää: NSIDC Sea Ice Index G02135 v4 (arktinen ja Etelämanner)

| Tiedosto | Osoite (https://noaadata.apps.nsidc.org/NOAA/G02135/ …) | Koko | Kattavuus 25.9.2026 |
|---|---|---|---|
| Syyskuun laajuuspolygonit | `north/monthly/shapefiles/shp_extent/09_Sep/extent_N_YYYY09_polygon_v4.0.zip` | 18–41 kt/vuosi | 1979–2025 (47 vuotta, ei aukkoja) |
| Helmikuun laajuuspolygonit | `south/monthly/shapefiles/shp_extent/02_Feb/extent_S_YYYY02_polygon_v4.0.zip` | ~18 kt/vuosi | 1979–2026 (48 vuotta) |
| Mediaanilaajuus 1981–2010 | `north/monthly/shapefiles/shp_median/median_extent_N_09_1981-2010_polyline_v4.0.zip` (ja `south/…/02`) | pieni | vakio |
| Kuukausiluvut | `north/monthly/data/N_09_extent_v4.0.csv`, `south/monthly/data/S_02_extent_v4.0.csv` | 2,3 kt | kuten polygonit |
| Päivittäinen laajuus | `north/daily/data/N_seaice_extent_daily_v4.0.csv`, `south/daily/data/S_seaice_extent_daily_v4.0.csv` | 1,9 Mt / 1,8 Mt | 26.10.1978 – 23.9.2026 |

- **Projektio**: NSIDC Sea Ice Polar Stereographic North/South (Hughes 1980 -ellipsoidi, EPSG:3411/3412),
  hila 25 km. Putki muuntaa pisteet asteiksi.
- **Pistemäärät (mitattu)**: pohjoinen 1979: 1 949 pistettä / 135 osaa; 2012: 1 094 / 82; 2025: 1 131 / 87;
  etelä 2026: 917 / 27. Yksinkertaistusta ei tarvita; reunan 25 km:n porraskuvio pehmennetään esityksessä
  (Chaikin, 2 kierrosta), ja tiedeliite kertoo hilan koon.
- **Luku linssiin**: vuoden minimi NSIDC:n tapaan 5 päivän liukuvana keskiarvona päivittäisestä CSV:stä.
  Tarkistus: 2026 pohjoinen 4,598 → **4,60 milj. km² 12.9.2026**, sama kuin NSIDC Arctic Sea Ice News.
  Etelä 2026: 2,58 milj. km² 26.2.2026. Syyskuun kuukausikeskiarvo (CSV) näytetään polygonin rinnalla
  eri nimellä ("syyskuun keskimääräinen laajuus"), ettei kahta lukua sekoiteta.
- **Lisenssi**: ei CC- eikä PD-leimaa; aineistosivun (nsidc.org/data/g02135) ehto on viittaus: "As a condition
  of using these data, you must cite the use of this data set." Kaupallista rajoitusta ei ole. Fable hyväksyi
  24.9. ("vapaa, viittaus ehtona" kelpaa). Merkintä linssissä "NASA / NSIDC", täysi viite tiedeliitteessä ja
  lähdeluettelossa aineistosivun nykyisessä muodossa: Fetterer, F., Knowles, K., Meier, W. N., Savoie, M.,
  Windnagel, A. K. & Stafford, T. (2025). Sea Ice Index, Version 4 (G02135). NSIDC. doi:10.7265/a98x-0f50.
  Putki kopioi viitteen sivulta haettaessa, koska tekijälista ja vuosi päivittyvät.
- **Huom. lähdetuote vaihtuu**: 2025 alkaen kuukausiluvut tulevat tuotteesta NSIDC-0803 (AMSR2), aiemmin
  NSIDC-0051. Putki tallentaa `source_dataset`-sarakkeen, ja tiedeliite mainitsee vaihdon.

### 1.2 Lämpötila: NASA GISTEMP v4

| Tiedosto | Osoite | Koko | Kattavuus |
|---|---|---|---|
| Hila 2° × 2°, kuukausittain, 1 200 km:n tasoitus | https://data.giss.nasa.gov/pub/gistemp/gistemp1200_GHCNv4_ERSSTv5.nc.gz | 25,9 Mt | 1/1880 – 8/2026 |
| Maailman vuosi- ja kuukausiluvut | https://data.giss.nasa.gov/gistemp/tabledata_v4/GLB.Ts+dSST.csv | 13 kt | vuosikeskiarvo (J-D) 1880–2025; 2026 tammi–elo |

- **Muoto**: netCDF-3 classic (`CDF\x01`), muuttuja `tempanomaly` (°C, vertailukausi 1951–1980), puuttuva arvo
  32767. Luetaan Nodessa suoraan ilman kirjastoa.
- **Vuosikeskiarvo ruuduittain**: keskiarvo vain, jos vuodessa on vähintään 9 kuukautta dataa; muuten ruutu
  on puuttuva (läpinäkyvä, ei nolla). Maailman luku otetaan aina CSV:n J-D-sarakkeesta, ei hilasta laskien.
- **Lisenssi**: Yhdysvaltain liittovaltion työ, public domain; erillistä lisenssitekstiä ei ole, NASA pyytää
  viittauksen: GISTEMP Team, 2026: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA Goddard
  Institute for Space Studies. Dataset accessed pp.kk.vvvv at data.giss.nasa.gov/gistemp/, sekä Lenssen, N.
  ym. (2024), J. Geophys. Res. Atmos. Merkintä linssissä "NASA GISS".

### 1.3 Pohjakuva

Astronautin kameran reliefi, tähtitaivas ja pilvikuori (NASA Blue Marble, jo pelissä ja lähdeluettelossa).
Uutta pohja-aineistoa ei tarvita.

### 1.4 Merenpinta: NASA JPL GMSL (Zenodo)

| Tiedosto | Osoite | Koko | Kattavuus |
|---|---|---|---|
| GMSL, trajektori ja ekstrapolaatio | https://zenodo.org/api/records/18649998/files/GMSL_extrap_1993_2050.2026_02_05.txt/content (tietue zenodo.org/records/18649998) | 72 kt | havainnot 1993.01 → 2025.99, ~7 pv:n välein (1 736 riviä) |

- **Sisältö**: sarake 1 vuosi desimaalina, 2 GMSL-vaihtelu (cm), 3 toisen asteen sovite, 4 nousunopeus (cm/v),
  5 ekstrapolaatio 2050:een (99900 = puuttuu). Lähde NASA-SSH (TOPEX/Poseidon, Jason-1–3, Sentinel-6 MF).
  Viimeinen havainto 2025.9945: +10,90 cm vs. 1993, nousunopeus nyt 0,44 cm/v.
- **Käytetään vain sarakkeita 1, 2 ja 4.** Ekstrapolaatiota 2050:een ei näytetä (ei ennusteita pelissä; tiedosto
  itse sanoo, ettei se ole projektio).
- **Lisenssi**: CC BY 4.0 (Zenodon metatieto `cc-by-4.0`, tarkistettu API:sta). Tekijät Josh Willis, Benjamin
  Hamlington ja Severine Fournier (NASA JPL). Viite: Willis, J., Hamlington, B. & Fournier, S. Global Mean Sea
  Level, Trajectory and Extrapolation. Zenodo. doi:10.5281/zenodo.18649998. Merkintä linssissä "NASA JPL".
- **Päivitys**: uusi versio vuosittain helmikuussa NASA:n GMSL-tiedotteen yhteydessä (tiedostonimessä päiväys).
  Putki hakee tietueen uusimman tiedoston API:sta (`files[].key`), ei kiinteää nimeä.

**Hylätyt** (Sonnet-agentin ja oma tarkistus 25.9.): NOAA STAR LSA (PD, mutta pysähtynyt 17.2.2025);
CU Sea Level Research Group (tuorein, kesäkuu 2026, mutta ei lisenssiä, vain "© Regents of the University of
Colorado"); NASA PO.DAAC `NASA_SSH_GMSL_INDICATOR` (Earthdata-kirjautuminen); CSIRO (päättyy 2014);
datahub.io (ei enää CSV-jakelua).

### 1.5 Merkinnät linssissä

Linssin alareunan merkintä näkymän mukaan: merijää "NASA / NSIDC", lämpötila "NASA GISS", merenpinta
"NASA JPL (CC BY 4.0)". Tiedeliitteessä kaikki täydet viitteet ja haettu-päivä; samat viitteet
lähdeluetteloon (Sisältökirjuri).

## 2. Putki: `tools/maapallon-tila/*.mjs` (Node 22, ei riippuvuuksia)

| Vaihe | Tiedosto | Tekee |
|---|---|---|
| 1 | `hae.mjs` | Lataa luvun 1 tiedostot välimuistiin `~/.cache/matkakirja/maapallon-tila/` (If-Modified-Since), kirjaa haetun ajan ja HTTP-otsakkeet |
| 2 | `merijaa.mjs` | Shapefile (.shp/.dbf) → Snyderin käänteinen napastereografinen → lat/lon, Chaikin 2 kierrosta, kokonaisluvut 1e-4° |
| 3 | `lampo.mjs` | netCDF-3 → vuosikeskiarvot → kvantisointi tavuiksi (luku 3) |
| 4 | `sarjat.mjs` | CSV:t → `sarjat.json` (merijään 5 pv:n minimit ja kuukausiluvut, GISTEMP J-D, merenpinta) |
| 5 | `tarkista.mjs` | Kultaiset tarkistukset: 2026 pohjoinen minimi 4,598 ± 0,001, 2012 = 3,387 (ennätys, 5 pv:n keskiarvo; yksittäisen päivän minimi 3,34), GISTEMP 2025 J-D = 1,19, vuosimäärät, ei aukkoja; tiedeliitteen luvut luetaan vain tästä tulosteesta |
| 6 | `vie.mjs` | gzip, `lahde`-kentät, versio, ämpäriin `virta/maapallon-tila/` vasta Fablen käskystä |

Jokaisessa tiedostossa on `lahde`: `{ url, viite, lisenssi, haettu, tuote }` kuten Siirtosepän skeemassa.

## 3. Tiedostot ja kuvakoot

### 3.1 Ämpäriin (striimataan, ei binaariin, offline ensimmäisen latauksen jälkeen)

| Tiedosto | Sisältö | Koko (arvio mitatusta) |
|---|---|---|
| `merijaa-pohjoinen.bin` | 47 syyskuuta (1979–2025, 2026 lokakuussa) + mediaani; Int32-parit 1e-4°, osien indeksi | ~0,6 Mt, gzip ~0,35 Mt |
| `merijaa-etela.bin` | 48 helmikuuta (1979–2026) + mediaani | ~0,4 Mt, gzip ~0,25 Mt |
| `lampo.bin` | 146 vuotta (1880–2025) × 90 × 180 tavua + otsake | 2,37 Mt, gzip ~1 Mt |
| `sarjat.json` | luvut ja kaaviot | < 60 kt |
| **Yhteensä** | | **~1,7 Mt siirtona** |

### 3.2 Näytönohjaimessa

| Kohde | Muoto | Koko |
|---|---|---|
| Lämpö | Texture2DArray 180 × 90 × 146, R8, bilineaarinen, vuosien välinen interpolointi shaderissa | 2,4 Mt |
| Lämmön kvantisointi | tavu 0 = puuttuu, 1–255 = −5…+5 °C (askel 0,039 °C); paletti leikkaa ±4 °C:ssa | — |
| Merijää | kaksi vuotta kerrallaan (nykyinen täytettynä, 1979 viivana) + mediaani katkoviivana; kolmioverkko taustasäikeessä | < 10 000 kolmiota / vuosi |
| Kuoret | lämpö 1,002 × säde, merijää 1,0015 × säde (vesistökerroksen kaava) | — |

### 3.3 Kuvat käyttöliittymään

| Kuva | Koko | Tekijä |
|---|---|---|
| Linssin ikoni valitsimeen | viivaikoni 24 × 24 (Ikonit.Viiva, SVG-polku kuten "satelliitti"): pallo, jonka yläosassa jäälautta | Natiivi-UI |
| Kaaviot (merijää, lämpö, merenpinta) | piirretään UI Toolkitissä vektoreina, ei kuvina | Natiivi-UI + Linssiseppä |
| Tiedeliitteen NASA SVS -kuvat | ei binaariin: tiedeliitteessä linkki SVS-sivuun; jos kuva halutaan, JPEG pitkä sivu 1 600 px, q80, ≤ 300 kt, vain PD-kuva ilman musiikkia | Sisältökirjuri (Commons-/SVS-tarkistus) |

## 4. Aikajana

### 4.1 Mitä linssissä on nyt (25.9.2026)

| Näkymä | Animaatio | Viimeinen luku | Huom. |
|---|---|---|---|
| Arktinen merijää | syyskuu 1979 → 2025 | 2026 minimi 4,60 milj. km² (12.9.), päivittäisestä | syyskuun 2026 polygoni lisätään lokakuussa |
| Etelämantereen merijää | helmikuu 1979 → 2026 | 2026 minimi 2,58 milj. km² (26.2.) | valmis |
| Lämpötila | 1880 → 2025 | 2025: +1,19 °C (vs. 1951–1980) | 2026 tammi–elo näytetään "kuluva vuosi" -merkinnällä, jos Fable hyväksyy (luku 5) |
| Merenpinta | 1993 → 2025 | +10,9 cm vs. 1993, nousu nyt 4,4 mm/v | seuraava versio helmikuussa 2027 |

### 4.2 Vuosittainen päivitys

| Kuukausi | Mitä | Toimi |
|---|---|---|
| lokakuu | NSIDC syyskuun kuukausipolygoni ja -luku | putki + vienti, uusi aineistoversio |
| tammikuu | GISTEMP edellisen vuoden J-D ja hila | putki + vienti |
| maaliskuu | NSIDC helmikuun polygoni (etelä) | putki + vienti |
| helmikuu | NASA JPL GMSL, uusi Zenodo-versio | putki + vienti |

Päivitys ei vaadi uutta sovellusversiota (striimattu aineisto, versio `lahde.haettu`-kentässä).

### 4.3 Toteutuksen järjestys (vasta pariteetin ja omistajan kokeilun jälkeen)

Erät 24.9. suunnitelman luvun 8 mukaan, aineisto ensin: erä 1 putki ja kultaiset tarkistukset (tämä dokumentti on
sen määrittely), erä 2 ydin, erä 3 merijää pallolle, erä 4 lämpökuori, erä 5 merenpinta, UI ja tiedeliite.

## 5. Päätökset (Fable 25.9.2026 klo 01.4x, suositukset hyväksytty)

1. **Lämpötila**: animaatio päättyy vuoteen 2025; kuluva vuosi vain tekstinä "tammi–elokuu 2026 +1,22 °C".
2. **Arktinen merijää 2026**: lukuna päivittäisestä aineistosta (5 pv:n minimi); polygoni lisätään lokakuun päivityksessä.
3. **Merenpinta**: NASA JPL GMSL Zenodosta; merkintä "NASA JPL (CC BY 4.0)", lisenssi `lahde`-kenttään
   DATALINSSIT-linjauksen mukaan; ekstrapolaatio 2050:een pois.

Toteutus vasta pariteettikierroksen ja omistajan build-kokeilun jälkeen (Raamattu).
