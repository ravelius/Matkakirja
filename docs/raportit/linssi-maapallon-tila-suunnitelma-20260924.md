# Maapallon tila -linssi: suunnitelma (24.9.2026)

*Linssiseppä (Opus) Fablen pyynnöstä. Omistajan päätös 24.9.2026 klo 08.28 (raamattu-loki
paatokset-2026-09.md): uusi linssi on vain natiivissa, ja sen aineistot ovat NASA:n ja NSIDC:n
julkista aineistoa. Merkintä on "NASA / NSIDC", ja aineisto haetaan alkuperäislähteestä, ei X:stä.
Toteutus alkaa vasta pariteettikierroksen ja omistajan kokeilun korjausten jälkeen. Tämä on
pelkkä suunnitelma.*

## 0. Fablen päätökset 24.9.2026 (sitovat, ohittavat alla olevat vaihtoehdot)

1. NSIDC:n "vapaa, viittaus ehtona" kelpaa: täysi viite lähdeluetteloon ja linssiin merkintä "NASA / NSIDC".
2. Ei Earthdata-tunnusta. **GRACE (mannerjäätiköt) jää pois.** Merenpinta: **NOAA STAR LSA -CSV** ilman tunnusta,
   PD (Fable 24.9. klo 11.2x, datalähteet-raportti). Omistaja 24.9. klo 11.2x: ilmaiset datatilit sallittu
   (ECMWF/Copernicus, EOG, GBIF; ei Earthdata), ei NC-lisenssejä, jakoehdolliset samalla lisenssillä.
3. Linssin järjestys on heti astronautin kameran jälkeen, ja avauskynnys on sama kuin astronautilla.
   **Etelämantereen merijää tulee mukaan** (sama G02135, helmikuun minimi). Vuorijäätiköt (GLIMS) tulevat vaiheessa 2.
4. Toteutus vasta pariteettikierroksen ja omistajan kokeilun korjausten jälkeen.

Näkymät ovat siis: arktinen merijää, Etelämantereen merijää, lämpötila ja merenpinta (jos avoin lähde löytyy).

## 1. Linssi lyhyesti

Maa avaruudesta (astronautin kameran pohja), neljä näkymää:

1. **Merijää**: arktisen merijään syyskuun minimi 1979–2026 animaationa pohjoisnavan yllä.
2. **Lämpötila**: vuoden keskilämpötilan poikkeama koko pallolla 1880–2026.
3. **Merenpinta**: maapallon keskimääräinen merenpinta 1993–2026.
4. **Mannerjäätiköt**: Grönlannin ja Etelämantereen jäämassan muutos 2002–2026.

Jokaisessa näkymässä on pallo, vuosiluku, yksi numero ja lyhyt kertojan teksti. Vuodet käydään
läpi itsestään. Pelaaja voi vetää vuosia aikaselaimesta (sama nauha kuin ihmisen matkassa).

## 2. Aineistot ja lähteet

Lähteet on tarkistettu 24.9.2026 (Sonnet-agentti avasi sivut; ne, joita ei saatu auki, on merkitty).

| Näkymä | Aineisto | Tarkka lähde | Muoto ja kattavuus | Lisenssi | Viite |
|---|---|---|---|---|---|
| Merijää | NSIDC Sea Ice Index G02135 v4 | nsidc.org/data/g02135/versions/4; tiedostot noaadata.apps.nsidc.org/NOAA/G02135/ | kuukauden laajuuden shapefilet (syyskuu 1979–2026) ja mediaanilaajuus 1981–2010; päivittäinen laajuus CSV:nä (minimipäivä ja luku); 25 km:n hila | NSIDC: valtion rahoittama, "useimmat aineistot public domainia"; viittaus on käytön ehto (nsidc.org/about/data-use-and-copyright) | Fetterer, F., Knowles, K., Meier, W. N., Savoie, M. & Windnagel, A. K. (2017). Sea Ice Index, Version 4 (G02135). NSIDC. doi:10.7265/a98x-0f50 |
| Merijää, 2026 | NSIDC Arctic Sea Ice News | nsidc.org/arcticseaicenews | 12.9.2026: 4,60 milj. km² (1,78 milj. mi²), jaettu 10. pienin (2008, 2010 ja 2025 samassa) | kuten yllä | NSIDC Arctic Sea Ice News, syyskuu 2026 |
| Merijää, vertailu | NASA SVS -visualisoinnit arktisesta minimistä | svs.gsfc.nasa.gov (haku "Arctic sea ice minimum") | valmiit kuvasarjat ja videot, vain tiedeliitteeseen | public domain (svs.gsfc.nasa.gov/help); **lisensoitu musiikki ei ole PD**, joten ääniraitaa ei käytetä | "NASA's Scientific Visualization Studio" |
| Lämpötila | NASA GISTEMP v4 | data.giss.nasa.gov/gistemp/ (data_v4.html) | hila `gistemp1200_GHCNv4_ERSSTv5.nc.gz` (2° × 2°, kuukausittain 1880–, ~23 Mt); maailman vuosiluku `tabledata_v4/GLB.Ts+dSST.csv` | Yhdysvaltain liittovaltion työ, public domain; kiitosmaininta pyydetään | GISTEMP Team, 2026: GISS Surface Temperature Analysis (GISTEMP), version 4. NASA GISS + Lenssen ym. |
| Merenpinta (Fable 24.9. klo 11.2x) | NOAA STAR LSA Global Mean Sea Level (satelliittialtimetria) | www.star.nesdis.noaa.gov/socd/lsa/SeaLevelRise/LSA_SLR_timeseries_global.php; CSV `slr/slr_sla_gbl_free_all_66.csv` (ja `…_ref_90`), ladattavissa ilman tunnusta (tarkistettu 24.9.) | CSV, 1992–, ~10 pv:n välein, < 1 Mt | NOAA, Yhdysvaltain liittovaltion työ, PD | NOAA/NESDIS/STAR Laboratory for Satellite Altimetry |
| ~~Merenpinta~~ (vaatii kirjautumisen) | NASA GMSL-indikaattori (satelliittialtimetria) | PO.DAAC `NASA_SSH_GMSL_INDICATOR` (sealevel.nasa.gov) | tekstitiedosto, 1993– | NASA, public domain; **tiedosto vaatii Earthdata-kirjautumisen** | Willis, Hamlington & Fournier 2023, doi:10.5281/zenodo.7702315 |
| Merenpinta, vertailu | NASA SVS 5516 "Global Mean Sea Level 1993–2024" | svs.gsfc.nasa.gov/5516 | video ja kuvat | public domain | "NASA's Scientific Visualization Studio" |
| ~~Mannerjäätiköt~~ (pois, Fable 24.9.) | GRACE/GRACE-FO JPL mascon -aikasarjat (Grönlanti, Etelämanner) | PO.DAAC, DOI:t 10.5067/TEMSC-GT613 ja 10.5067/TEMSC-AT613 | aikasarja (Gt), 2002– | NASA/JPL, public domain | **VARMISTAMATTA**: PO.DAAC ei vastannut agentin ympäristöstä. Tuotenimi ja viite tarkistetaan ennen toteutusta. |
| Vuorijäätiköt (valinnainen) | GLIMS-jäätikkörajat | nsidc.org/data/nsidc-0272 | shapefile | public domain, viittaus pyydetään | GLIMS, viiteteksti varmistamatta |

**Kaksi huomiota Fablelle.**
- NSIDC kuuluu Coloradon yliopistoon, joten se ei ole liittovaltion virasto. Sea Ice Index on valtion rahoittama ja käytännössä vapaa, mutta viittaus on käytön ehto. Siksi merkintä "NASA / NSIDC" ja täysi viite lähdeluettelossa ovat molemmat pakollisia.
- WGMS:n vuorijäätikkösarjat eivät ole NASA:n eivätkä NSIDC:n, joten ne jätetään pois ilman omistajan erillistä lupaa.

## 3. Animaation muoto: vektorit ja hila, ei kuvasarjaa

| | Kuvasarja (SVS:n tai NSIDC:n PNG:t) | Vektori- ja hila-aineisto pallolle (suositus) |
|---|---|---|
| Terävyys | kiinteä resoluutio ja projektio, sumenee zoomatessa | terävä joka korkeudella; merijää polygonina, lämpö hilana shaderissa |
| Koko | 48 × 1–3 Mt = 50–150 Mt | merijää ~1–2 Mt, lämpö ~1 Mt (ks. luku 6) |
| Välivaiheet | hyppää vuodesta toiseen | vuosien välinen häivytys GPU:lla, aikaselaimen veto on sulava |
| Tyyli | SVS:n värit ja tekstit | pelin paletti (web-linssien sävyt) |
| Kamera | yksi kuvakulma | vapaa, kuten astronautin kamerassa |

SVS-kuvat ja -videot käytetään vain tiedeliitteessä ("Katso NASA:n visualisointi").

- **Merijää**: syyskuun laajuuspolygoni per vuosi. Ne yksinkertaistetaan Douglas–Peuckerilla noin 5 km:n tarkkuuteen, ja pallolle tehdään kolmioverkko hieman pinnan yläpuolelle (kuten vesistöjen kerros). Kaksi vuotta näytetään yhtä aikaa: nykyinen täytettynä ja vertailuvuosi 1979 ohuena viivana. Mediaani 1981–2010 on katkoviiva. Numero tulee päivittäisestä CSV:stä, esimerkiksi "12.9.2026: 4,60 milj. km²".
- **Lämpötila**: GISTEMP:n kuukausista lasketaan vuosikeskiarvo 1880–2026. Arvot kvantisoidaan tavuiksi (−4…+4 °C, 0,05 °C:n askel), eli 90 × 180 × 147 = 2,4 Mt ennen pakkausta. Tekstuuritaulukko piirretään pallokuoreen 1,002 × säde (Pilvikuoren kaava), ja kahden vuoden välillä interpoloidaan shaderissa. Paletti on jakautuva sini–puna, ja nolla on läpinäkyvä, jotta reliefi näkyy. Hilan puuttuvat arvot (varhaiset vuosikymmenet, napa-alueet) ovat läpinäkyviä, ei nollaa.
- **Merenpinta**: numero ja kaavio (mm vs. 1993). Maailman keskiarvo ei ole paikkatietoa, joten pallolla ei piirretä keksittyä karttaa. Kamera kiertää hitaasti. Paikallinen merenpinnan trendikartta on vaihe 2, jos NASA:lta löytyy tarkistettu hila.
- **Mannerjäätiköt**: kumulatiivinen muutos (Gt) Grönlannille ja Etelämantereelle kahtena kaaviona. Pallolla korostetaan kyseinen mannerjäätikkö (rajaus maarajoista tai GLIMS:stä), eikä sen sisälle maalata keksittyä jakaumaa.

## 4. Näkymät ja kamera (pohjana astronautin kamera)

- **Avaus kuten astronautin kamerassa**: musta ruutu ja otsikkokortti "Maapallon tila", laatat valmiiksi, häivytys ja laskeutuminen. Pohjalla on astronautin reliefi (kylläisyys 0,8), tähtitaivas ja pilvikuori. Pilvet ovat pois merijää- ja lämpönäkymissä, koska ne peittäisivät aineiston. ISS ja havaintopisteet eivät ole mukana.
- **Merijää**: kamera 90° N:n yllä, noin 0,55 × koko pallon korkeus, ja pohjoinen ylhäällä kuten NSIDC:n kuvissa. Animaatio kulkee 1979→2026 0,6 s/vuosi (~29 s). Tauko 1979:ssä ja 2026:ssa (kertojan teksti). Pienimmät vuodet otetaan CSV:stä sellaisinaan, eikä niistä väitetä mitään ilman lähdettä.
- **Lämpötila**: koko pallo, kamera kiertää 3°/s. Animaatio kulkee 1880→2026 0,2 s/vuosi (~30 s). Vuosiluvun vieressä on maailman keskiarvo, esimerkiksi "+1,2 °C vs. 1951–1980".
- **Merenpinta ja mannerjäätiköt**: kamera Grönlannin ja Etelämantereen välillä, 8 s kummallekin, kaavio alareunassa.
- **Näkymän vaihto**: ylärivin välilehdet (kuten keksintöjen ja ihmisen matkan ylärivi). Aikaselain vaihtaa vuosiasteikon näkymän mukaan. Linssimuisti (LinssiMuisti) muistaa näkymän ja vuoden.

## 5. Tekstit (kohderyhmä 13+ ja aikuiset, pilarit 2 ja 4)

- Yksi kertojan teksti per näkymä, lisäksi 1–2 taukotekstiä ja tiedeliite (lähteet, menetelmä ja "mitä luku tarkoittaa").
- Tekstit ovat asiallisia ja numeroihin nojaavia: ei kaunistella eikä kauhistella, ei moralisointia eikä poliittisia kannanottoja. Jokainen luku on peräisin taulukon lähteestä, ja lähde on tiedeliitteessä.
- Yksiköt ovat metrisiä ja suomalaisia (4,60 milj. km², °C, mm, Gt; tuhaterottimena sitova välilyönti).
- Tekstit kirjoittaa Sisältökirjuri ja hyväksyy Fable. Merijään minimin nosto arktisiin kohteisiin ja astronautin tiedeliitteeseen on Sisältökirjurin erillinen tehtävä (omistajan kortti).

## 6. Koko ämpärissä ja striimaus

| Tiedosto | Arvio (gzip) |
|---|---|
| `virta/maapallon-tila/merijaa.json` (48 syyskuun polygonia + mediaani, ~5 km) | 1–2 Mt |
| `virta/maapallon-tila/lampo.bin` (147 × 90 × 180 tavua + otsake) | ~1 Mt |
| `virta/maapallon-tila/sarjat.json` (merijään minimit, GISTEMP:n maailman sarja, GMSL, GRACE) | < 50 kt |
| **Yhteensä** | **~3 Mt** |

- Tiedostot eivät ole binaarissa eivätkä sisältöpaketin kokoelmissa. Ne striimataan kuten isoisä 1873, eli LinssiSisalto.HaeVirrasta: koekansio → välimuisti → ämpäri. Binaarille tarvitaan uusi HaeVirrastaTavut, jolla on sama välimuisti. Offline toimii ensimmäisen latauksen jälkeen. Odotuspeite näkyy, kunnes merijää ja sarjat ovat valmiit, ja lämpö latautuu taustalla.
- Jokaisessa tiedostossa on `lahde`-kentät (url, viite, haettu, lisenssi) kuten Siirtosepän skeemassa. Skeeman versio sovitaan Siirtosepän kanssa.
- **Päivitys**: aineistoputki (`tools/maapallon-tila/*.mjs`) ajetaan kerran vuodessa lokakuussa NSIDC:n syyskuun minimin jälkeen, sekä GISTEMP:n vuositaulukon ilmestyttyä tammikuussa.

## 7. Toteutuksen arkkitehtuuri (vasta hyväksynnän jälkeen)

- **Ydin** (`Linssit/Ydin/MaapallonTila/`, ilman Unityä, testattava kuten muut): aineiston jäsennys, vuosikello ja interpolointi, näkymätila, tekstien ajoitus. Kultaiset testit tehdään aineistoputken tulosteesta.
- **Unity**: `MaapallonTilaSovitin` LinssiOhjaimeen. MerijaaKerros (polygonit pallolle), LampoKuori (Texture2DArray ja shader), kameran ajot astronautin matikalla. Profilointimerkit `Update.Linssi.maapallon-tila.*`.
- **Natiivi-UI**: ylärivin välilehdet, aikaselain, kaaviokortit ja tiedeliite.
- **Linssien tiedot**: tunnus `maapallon-tila`, nimi "Maapallon tila". Järjestys ja avauskynnys ovat Fablen päätettäviä, koska linssiä ei ole webissä eikä webin kynnyslistassa.

## 8. Työarvio

| Erä | Sisältö | Tekijä | Arvio |
|---|---|---|---|
| 1 | Aineistoputki: haku, yksinkertaistus, kvantisointi, lahde-kentät, ämpäriin | Linssiseppä (+ Siirtoseppä: skeema, lataus) | 1 työpäivä |
| 2 | Ydin ja kultaiset testit | Linssiseppä | 1 päivä |
| 3 | Merijää pallolle ja avaus | Linssiseppä | 1 päivä |
| 4 | Lämpötilakuori (shader, interpolointi, paletti) | Linssiseppä | 1 päivä |
| 5 | Etelämantereen merijää, merenpinta ja kaaviot; UI:n välilehdet, aikaselain, tiedeliite | Linssiseppä + Natiivi-UI | 1–1,5 päivää |
| 6 | Tekstit | Sisältökirjuri + Fable | 0,5 päivää |
| 7 | iPad: kuvat, suorituskyky (ei yli 16 ms:n kehyksiä), offline | Linssiseppä + Laitetestaaja | 0,5 päivää |

Yhteensä noin 6–7 roolipäivää, joista Linssisepän osuus on noin 5.

## 9. Riskit ja avoimet kysymykset

1. **Earthdata-kirjautuminen**: PO.DAAC:n GMSL ja GRACE vaativat NASA Earthdata -tunnuksen. Jos Macin avaimissa ei ole tunnusta, omistajan pitää luoda se (tiliä en luo itse). Vaihtoehto: SVS:n julkaisemat aikasarjatiedostot, jos sellaiset on tarkistettu.
2. **GRACE-tuotteiden nimet ja lisenssi on varmistamatta** (PO.DAAC ei vastannut). Ne tarkistetaan ennen erää 1.
3. **Numeroiden tarkistus**: kaikki tekstissä esiintyvät luvut (ennätysvuodet, mediaanit, °C, mm, Gt) luetaan aineistosta putkessa, eikä niitä kirjoiteta käsin.
4. **Tiedot päivittyvät**: vuoden 2026 minimi saattaa vielä tarkentua NSIDC:n lopullisessa raportissa (lokakuu). Putki merkitsee haetun päivän.
5. **Suorituskyky**: kolmioitu merijää (48 polygonia) ja 2,4 Mt:n tekstuuritaulukko luodaan taustasäikeessä ja ladataan vaiheittain, jotta avauksen kehykset eivät pitene (piikkimittauksen oppi 24.9.).
6. **Päätettävää (Fable ja omistaja)**: linssin järjestys ja avauskynnys; tuleeko vuorijäätikkönäkymä (GLIMS) mukaan; ja tarvitaanko näkymä myös Etelämantereen merijäälle (sama aineisto G02135, pieni lisätyö).
