# Viron avoin 3D-data: Tallinnan vanhakaupunki (Raekoja plats 59.4372 N, 24.7453 E)

Selvitetty 7.10.2026, vain lukemista ja pieniä latauksia (kaikki < 50 Mt, ei kirjautumista). Merkinnät: V = vahvistettu lähteestä (URL mukana), A = arvio.
Koordinaatti L-EST97 (EPSG:3301): E 542292, N 6589053 (V, laskettu itse LCC 2SP -kaavalla, parametrit OBJ:n .prj-tiedostosta).

## Tärkein löytö

Suora, kirjautumaton lataus Tallinnan LoD2-rakennuksille (CityGML 33,0 Mt, OBJ 32,4 Mt, GDB 36,5 Mt):
`https://geoportaal.maaamet.ee/index.php?lang_id=1&plugin_act=otsing&andmetyyp=hooned_lod2&dl=1&page_id=833&f=hooned_lod2-Tallinn-citygml.zip` (V, ladattu 7.10.2026, HTTP 200)
`...&f=hooned_lod2-Tallinn-obj.zip` ja `...&f=hooned_lod2-Tallinn-gdb.zip` (V, HEAD 200; CityGML ja OBJ ladattu ja purettu).
Huom. sivun HTML antaa linkin suhteellisena (`index.php?...`), mutta sivun `<base href="https://geoportaal.maaamet.ee/">` vuoksi polku on juuressa, ei geo3d-kansiossa.
Ei laattajakoa Tallinnalle: koko Tallinna (49 816 rakennusta) yhtenä zip-tiedostona; erikseen myös koko Eesti (CityGML 321 MB, OBJ 292 MB, GDB 360 MB, yli 50 Mt, ei ladattu). Lähde: https://geoportaal.maaamet.ee/est/ruumiandmed/geo3d/laadi-3d-andmed-alla-p833.html (V).

## 1. Maa- ja Ruumiamet (Maa-amet)

### 1.1 Lisenssi (V)
- Nimi: "Republic of Estonia Land and Spatial Development Board opendata licence 01.01.2025" (Maa- ja Ruumiameti avaandmete litsents). Katalogi toteaa: "Creative Commons vaste CC BY 4.0" (eli CC BY 4.0 -vastine, ei virallinen CC-lisenssi). Lähteet: https://geoportaal.maaruum.ee/opendata-licence (ohjaa PDF:ään https://geoportaal.maaruum.ee/docs/Avaandmed/ETAK_open_data_licence.pdf, luettu) ja https://metadata.geoportaal.ee/geonetwork/srv/api/records/85d8aaab-e411-4445-b142-2c4b5d18eb8b
- Oikeudet (PDF:stä): maksuton, määräämätön aika, "commercial or non-commercial purposes", johdannaiset, yhdistely, uudelleenjakelu sallittu. Ehtoja saa laajentaa/tiukentaa jaettaessa yhdistettynä muuhun dataan, mutta Maa-amet-osan ehdot pysyvät voimassa.
- Velvoitteet: (a) viittaus alkuperään julkaistaessa ja uudelleenjaettaessa; viittauksessa pitää olla lisenssinantajan nimi, aineiston nimi ja aineiston ikä/poimintapäivä. (b) Kolmansille jaettaessa data mukana joko sopimus tai viite https://geoportaal.maaruum.ee/opendata-licence. (c) Lisenssinantajan kirjallisesta pyynnöstä lähdeviite on poistettava tuotteesta (outo kohta, ks. riskit).
- Vastuuvapaus: data "as is", ei takuita; oikeudet päättyvät automaattisesti ehtojen rikkomiseen. Palvelun jatkuvuutta ei taata.
- Tekijänoikeus säilyy Maa-ametilla (PDF).
- Sanatarkka esimerkkimaininta LoD2-aineistolle (metatiedoista, V): "Hoonete 3D LoD2 ruumiandmed, Maa- ja Ruumiamet" / englanniksi "3D models LoD2 of buildings, Republic of Estonia Land and Spatial Development Board". Lisenssi-PDF:n tyylin mukaan suositeltava täysi muoto (A, koottu PDF:n säännöstä "nimi + aineisto + ikä"): "3D buildings LoD2 2020-2022 (ALS), Republic of Estonia Land and Spatial Development Board, extracted 26.09.2026. Open data licence: https://geoportaal.maaruum.ee/opendata-licence"
- Muut aineistot: ortokuva "Orthophoto 21.05.2024, Republic of Estonia Land and Spatial Development Board" (PDF:n esimerkki, V); korkeusdata "Elevation data 2021-2024: Republic of Estonia Land and Spatial Development Board"; reljeefivarjostus "Reljeefivarjutus, Maa- ja Ruumiamet" (https://geoportaal.maaamet.ee/est/ruumiandmed/kaldaerofotod-p823.html tai vastaava sivu, V sivun tekstistä); kaldaerofoto "Foto: Maa- ja Ruumiamet Kaldaerofoto" (V, https://geoportaal.maaamet.ee/est/ruumiandmed/kaldaerofotod-p633.html).

### 1.2 LoD2-rakennukset (V, analysoitu ladatusta CityGML:stä)
- Aineisto: "Eesti 3D hoonete LoD2 andmekogu", luotu automaattisesti ALS-pistepilvestä + ETAK-rakennusten pohjista, yli 800 000 rakennusta; päivitys kerran vuodessa (kalenterivuoden 1. neljännes), attribuutit päivittyvät useammin. Formaatit: CityGML, Esri GDB, Wavefront OBJ, SLPK (SLPK mainittu metatiedoissa; Tallinnan latauslistalla vain gdb/citygml/obj). CRS EPSG:3301. Lähde: metadata-linkki yllä.
- Tiedosto ladatussa Tallinna-zipissä: yksi `hooned_lod2-Tallinn.gml` (568 MB purettuna), CityGML 2.0, 49 816 Building-objektia. OBJ-zip: .obj 183 MB + .mtl + .prj + .fwt; ei tekstuureja (Number of Texture Coordinates 0). OBJ:n koordinaatit ovat paikallisessa origossa (esim. x -3773, y -8594, z -102,8 vs. GML:n z 33,6 eli z-siirtymä ja xy-siirtymä; origo ei ole dokumentoitu tiedostossa, johdettavissa GML:stä; A).
- GML-koordinaattijärjestys: N E Z (pohjoinen ensin). Esim. `6584173.41 538094.21 33.61` (V).
- Attribuutit rakennuksittain (V): ETAK-id, EHR-koodi, ADS-oid, osoite (xAL), tyyp/tyyp_tekst, lod2_muutmisaeg, als_aasta, measuredHeight. Geometria on vain `lod2MultiSurface` (pelkät polygonit; EI RoofSurface/WallSurface-semantiikkaa, EI tekstuureja).
- Alue 300 x 300 m Raekoja platsin ympärillä: 131 rakennusta (V; keskipiste-bbox ±150 m; 114 "Elu- või ühiskondlik hoone", 17 "Kõrval- või tootmishoone"). Lähtödata ALS 2020 madal (129 kpl) ja 2022 madal (2 kpl), eli Tallinnan vanankaupungin ALS-data on 2020–2022. Keskimäärin 55 polygonia/rakennus.
- Raekoja plats 1 (Raatihuone): etak_581316_hooned, korkeus 27,13 m, 39 polygonia (V). Korkeus on selvästi alle tornin huipun (~64 m historiallisesti), joten torninhuippu ei ole mallissa kokonaan (A: ohut torni jää ALS:ssa pois). Korkein kohde ±150 m: 88,42 m (etak_581173, Niguliste/Nikolaikirche-alue, 259 polygonia; A kohteesta).
- Laatu (A): automaattinen malli, kattomuodot karkeita, vanhankaupungin ahtaat tiilikatot ja kaltevat julkisivut approksimoituja; ei julkisivudetaljeja, ikkunoita, ovia. Sopii massamalliksi/siluetiksi.
- LoD1 (laatikkomallit) myös ladattavissa samalla kaavalla (`andmetyyp=hooned_lod1`, `f=hooned_lod1-Tallinn-obj.zip`; V linkkilistasta, ei ladattu).
- LoD3: Maa-ametilla EI ole LoD3-aineistoa. Sivu https://geoportaal.maaamet.ee/est/ruumiandmed/geo3d/3d-andmed-p822.html mainitsee vain LOD1 ja LOD2 (V). Ei LoD3 Tallinnan vanastakaupungista Maa-ametilta.
- Muut 3D-kerrokset samalla sivulla (V): katusealused, sillat/liikennerakenteet (LoD1), kasvihuoneet, puut (analyyttiset ja realistiset, ALS-pohjaiset; Tallinnalle vegetatsioon-GDB/GPKG), 3D-kartta https://3d.maaamet.ee/kaart/ (katseluohjelma).

### 1.3 Ortokuvat (V)
- Asulat (madallento, "Asulate madallennu fotod") Tallinnalle: 1:2000-karttalehti 589542 (E 542000–543000, N 6589000–6590000, 1 km x 1 km; Raekoja plats sijaitsee lehden eteläreunalla, N 6589053; V, tarkistettu .tfw:stä). Karttalehden 589542 lataus: GeoTIFF 2023-04-14, 25,9 Mt zip, 10 000 x 10 000 px, pikselikoko 0,10 m (10 cm/px) (V, ladattu ja luettu .tfw: 0.100). JPEG-pakattu, YCbCr. Raekoja platsin eteläpuoli voi olla viereisellä lehdellä 588542 (A).
- Saatavilla vuosittain 1994–2023 (V listasta): 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2014, 2008, 2005, 2003, 2000, 1994; formaatteina GeoTIFF ja ECW. Vuoden 2008 on suurin, 121 Mt.
- Latausmenettely (V): `https://geoportaal.maaamet.ee/index.php?lang_id=1&plugin_act=otsing&kaardiruut=589542&andmetyyp=ortofoto_asulad_rgb&dl=1&page_id=610&f=589542_OF_RGB_GeoTIFF_2023_04_14.zip` -> HTTP 200, 25 940 029 tavua, application/zip, ei kirjautumista. Lehtiluettelon saa kyselyllä `...&page_id=610&kaardiruut=589542&andmetyyp=ortofoto_asulad_rgb` (palauttaa HTML-linkit). Linkkien `no_cache`-parametri ei ole pakollinen testissä (A: testattu `f=`-polulla ilman no_cachea, toimi).
- Koko maan ortot (korkeammalta, ei kaupunkitarkkuutta; A: ~20–40 cm).
- Lisenssi: sama avaandmetelinssi, esimerkkimaininta "Orthophoto: Maa- ja Ruumiamet" tai PDF:n muoto "Orthophoto 14.04.2023, Republic of Estonia Land and Spatial Development Board" (V/A).

### 1.4 Laserkeilaus, DEM, korkeusmallit (V, sivu https://geoportaal.maaamet.ee/est/ruumiandmed/korgusandmed/laadi-korgusandmed-alla-p614.html)
- Pistepilvi LAZ 1:2000-lehdittäin; lehti 589542: 2024_tava 62,1 Mt, 2023_madal 257 Mt, 2022_madal 290 Mt, 2021_madal 302,5 Mt, 2020_madal 248 Mt jne. (V listasta; yli 50 Mt eivät ladattu, vain 2024_tava 62 Mt on lähellä rajaa, ei ladattu). Pistetiheys: A (madallento tyypillisesti kymmeniä pisteitä/m2, ei tarkistettu).
- DTM 1 m, 5 m, 10 m GeoTIFF/XYZ; DSM 1 m ja 5 m (absoluuttikorkeus), nDSM 1 m/5 m, CHM 4 m; 1:2000-lehdelle 589542 DSM 1 m GeoTIFF (`589542_dsm_1m.tif`, 3,8 Mt, ladattu, 1000 x 1000 px float32; V). Esimerkki: 1:20000-lehti 5442 antaa `5442_dtm_10m.tif` 3,7 Mt (V); 1:10000-lehti 54421 antaa värillisen reljeefivarjostuksen 0,25 m (`54421_shade_color.tif`, 34,1 Mt) (V).
- Koko Eesti DTM 5 m 7,7 GB, 10 m 2 GB, 25 m 343 Mt (V; yli 50 Mt ei ladattu).
- Lisenssi sama. Maininta: "Elevation data 2021-2024: Republic of Estonia Land and Spatial Development Board" (V PDF:stä).

### 1.5 Viistoilmakuvat / julkisivukuvat (V, https://geoportaal.maaamet.ee/est/ruumiandmed/kaldaerofotod-p633.html)
- Kaldaerofotod: ~5,5 milj. kuvaa vuodesta 2006 (tilanne 1.1.2022), kuvattu yleensä 1000–3800 m korkeudesta, osa lentokoneen ikkunasta, vuodesta 2014 fotorobotti (täysi resoluutio katsottavissa). Geopaikannettu, mutta sijaintitarkkuus vaihtelee. "Kaldaerofotod on avaandmed", maininta: "Foto: Maa- ja Ruumiamet Kaldaerofoto". Katselu/lataus Fotoladu-kartta-sovelluksessa (sovellus, ei suoraa ATOM/WFS-latausta; ei testattu, A).
- Julkisivukuvia (maanpinnalta) Maa-ametilla ei ole löytynyt (V: ei mainintaa sivuilla). Korkeus 1–3,8 km tarkoittaa, että julkisivutekstuuri on kelvotonta, ainoastaan viistokuva kattojen ja yleisilmeen referenssiksi.

### 1.6 Kirjautuminen ja palvelut
- Kaikki ylläolevat lataukset toimivat ilman kirjautumista (V: HEAD ja GET onnistuivat, 200).
- Latausten käyttöehtona "Andmeid alla laadides nõustute avaandmete kasutamise tingimustega" (V, ilmoitus latauspaikoilla), ei erillistä klikkausta/hyväksyntälomaketta, joka estäisi suoran GET-latauksen.
- Andmed.eesti.ee-portaalin tietue on JavaScript-sovellus: https://andmed.eesti.ee/datasets/eesti-3d-hoonete-lod2-andmekogum (V: sivun vastaus oli vain tyhjä kuori; tiedot haettu metadata.geoportaal.ee:stä).
- WMS/WFS/ATOM: 3D-rakennuksille ei löytynyt WFS/ATOM-syötettä (A: ei etsitty tyhjentävästi); tiedostolataus on pääreitti.

## 2. Tallinnan kaupungin omat aineistot

- Tallinn City Model (Tallinnan kaupunkimalli): www.tallinn.ee ja gis.tallinn.ee/linnamudel, katselusovellus (V: https://gis.tallinn.ee/linnamudel/ vastaa 200, sivulla vain otsikko "Tallinna linnamudel"; sisältö JS-sovellus). Uutinen 4.4.2025 (https://ehitusleht.ee/tallinna-3d-linnamudel-on-nuud-veel-detailsem/, V): tekstuuroitu LoD2-malli koko kaupungille (toimittaja Hexagon, yhteistyössä Digital Construction Cluster), yli 100 LoD3-kohdetta, mm. teletorni, Kadriorgin linna, uusi kaupunginteatteri. Aiempi Vanhankaupungin 3D (121 ha) mainittu Postimeesin uutisessa (https://www.postimees.ee/801878/tallinna-vanalinna-3d-mudel-sai-valmis, A: vain hakutulos, ei avattu). **Ei löytynyt tietoa, että tekstuuroitu malli tai LoD3 olisi ladattavissa avoimena datana; uutinen ei kerro lisenssistä (V: artikkelissa ei ole mainintaa).**
- Tallinnan geoportaali (https://www.tallinn.ee/et/geoportaal/ruumiandmed): tarjoaa Tallinnan aluskartan (1:2000), rakennusten mittoja, osoitteita jne. ladattavaksi; "Geoportaali litsentsileping" -sopimus (https://www.tallinn.ee/et/geoportaal/geoportaali-litsentsileping). Hakutulosten mukaan (A, hakukonetiivistelmä, ei luettu lähteestä): yksinkertainen lisenssisopimus, vaatii alkuperän maininnan muodossa "Tallinna aluskaart: Tallinna Strateegiakeskus 2021". Sivusto www.tallinn.ee palautti 403 (Cloudflare-haaste, `cf-mitigated: challenge`) sekä curlille että WebFetchille; en yrittänyt kiertää bottisuojaa, joten lisenssin sanamuotoa ei ole vahvistettu. Tämä on avoin kohta.
- Tietue "Tallinna aluskaardi 3D hoonete kuubikud CAD" (andmed.eesti.ee, https://andmed.eesti.ee/datasets/tallinna-aluskaardi-3d-hoonete-kuubikud-cad): rakennuskuutiot Tallinnan aluskartan kattokorkeuksilla, CAD, ~53–55 Mt/versio, päivitys 4x/vuosi (A, hakutulos; sivu JS-sovellus, ei luettu). Laatikkomalli, ei lisäarvoa Maa-amet LoD2:een nähden.
- Johtopäätös (A): Tallinnan oma malli (Hexagon-tekstuuri) ei ole varmistetusti avointa dataa; Tallinnan geoportaalin muu data on avointa, mutta ehdot lukematta. Ei suositella lähteeksi ennen kuin lisenssi on luettu selaimella tai pyydetty kaupungilta (Tallinna Strateegiakeskus).

## 3. OSM-kattavuus (V, Overpass API 7.10.2026, OSM-data 6.10.2026 22.18 UTC)

Bbox: 59.4358,24.7418 – 59.4386,24.7488 (~310 x 310 m). Kysely: `way/relation["building"]` ja `["building:part"]`. Huom. Overpass palautti ensin 406/504 (kuormitus); onnistui uudelleenyrityksellä. Data ODbL (V, https://www.openstreetmap.org/copyright).

| Mittari | building (295 kpl) | building:part (215 kpl) |
|---|---|---|
| height | 144 (49 %) | 115 (53 %) |
| building:levels | 99 (34 %) | 84 (39 %) |
| height tai levels | 187 (63 %) | n/a |
| roof:shape | 57 (19 %) | 168 (78 %) |
| roof:height | 3 | 86 |
| roof:colour | 27 | 139 |
| roof:material | 39 | 193 |
| building:colour | 29 | 143 |
| building:material | 3 | 84 |
| min_height | 0 | 31 |

- 295 rakennusobjektia (290 way, 5 relation) + 215 building:part -osaa = Simple 3D Buildings on laajalti käytössä (V).
- Rakennuksilla height tai levels tai roof:shape: 189/295 (64 %). Kun huomioidaan myös osat, kattomuoto kattaa 168/215 osasta; yhteenlaskettuna kattomuotoja ~225 objektilla.
- roof:shape-jakauma rakennuksilla: gabled 28, skillion 8, hipped 8, many 4, side_hipped 2, mansard 2, gambrel 2, pyramidal 1, half-hipped 1, quadruple_saltbox 1 (V). Osissa: gabled 69, skillion 32, flat 25, hipped 10, pyramidal 10, ilman muotoa 47.
- building-arvo "yes" 218 kpl, apartments 52, commercial 5, hotel 3, church 3, retail 3. Osoite (addr:housenumber) 275/295 (93 %); nimiä vain 9; heritage-tagi 1, start_date 1 (V) – kulttuuriperintötietoa OSM:ssä niukasti.
- Arvio (A): OSM-kattavuus on selvästi parempi kuin tyypillisessä eurooppalaisessa kaupungissa; kattomuodot ja värit (roof:colour/material) hyödyllisiä proseduraaliseen mallinnukseen. Yli 35 % rakennuksista ilman height/levels -tietoa, jolloin korkeus on täydennettävä Maa-amet LoD2:sta (measuredHeight).
- Lisenssiriski: ODbL (jaettu tietokanta, share-alike) – ei sovi suoraan tekijänoikeudelliseen "ei-share-alike" malleihin; tuotettu 3D-mallin geometria voi katsoa johdannaiseksi tietokannaksi (A, oikeudellinen arvio tarvitaan). Käyttö parametritietona, jonka päälle mallinnetaan itse, on turvallisempaa kuin geometrian kopiointi (A, ei oikeudellinen neuvo).

## Suositus pelikäyttöön

Käyttöehto: Maa- ja Ruumiameti avaandmete litsents, CC BY 4.0 -vastine. Kaupallinen käyttö, johdannaiset ja uudelleenjakelu sallittu. Jaettaessa malleja julkisesta ämpäristä riittää lähdeviite (nimi + aineisto + ikä/poimintapäivä) ja viite lisenssi-URL:iin. Suositus (A):
1. **Pohja-aineisto:** Maa-amet LoD2 (`hooned_lod2-Tallinn-obj.zip`/CityGML, 33 Mt, ei kirjautumista). Käytä massa-/korkeusmallina ja ETAK/EHR/ADS-tunnisteina; sovella käsin tai proseduraalisesti julkisivut, kattotiilet ja tornit. 131 rakennusta bbox:ssa; kiinteän tuotannon vaihe: rajaa bbox CityGML:stä (koordinaattikuvio yllä, N E Z).
2. **Katto- ja julkisivuparametrit:** OSM:n building:part -osat (roof:shape, colour, material, height) auttavat korjaamaan LoD2:n karkeita kattoja; mutta ODbL, joten ellei oikeudellinen selvitys sano toisin, käytä vain faktatietoa (korkeus, kattomuoto) omien mallien ohjaukseen, älä kopioi geometriaa.
3. **Ortokuva:** lehti 589542, 10 cm/px, 2023 (25,9 Mt) -> tekstuuri maapinnalle/katoille; sama lisenssi, mainintamuoto "Orthophoto 14.04.2023, Republic of Estonia Land and Spatial Development Board". DSM 1 m (3,8 Mt) maanmuodoille.
4. **Tallinnan oma malli:** ei käytetä, ennen kuin lisenssi on vahvistettu; viestiketju: Tallinna Strateegiakeskus / geoportaal (avoin kohta).

Riskit:
- LoD2 on ALS 2020–2022 -pohjainen, automaattinen, ei tekstuureja eikä julkisivudetaljeja; Raatihuoneen torni (27 m malli vs. n. 64 m todellisuus) ja muut ohuet huiput puuttuvat tai ovat matalia; täydennä käsin (A).
- Vanhankaupungin kapeat kadut: ortokuvat ovat nadiiri ja katot varjostavat julkisivuja, ei julkisivutekstuureja ilmasta (A). Julkisivukuvat on otettava itse tai Commonsista (PD/CC) pelin kuvasääntöjen mukaan.
- Lisenssin kohta "viittaus poistettava kirjallisesta pyynnöstä" (V, PDF) on epätavallinen ehto; ei estä käyttöä, mutta käytännössä tekisi attribuutiosta poistettavan, jos Maa-amet pyytää. Seuraa ehtoja ja kirjaa lataushetken PDF:n versio (01.01.2025) repoon/dokumentaatioon.
- "As is"-takuuvapaus ja palvelun jatkuvuutta ei taata; lataa ja arkistoi paikallisesti (zip-tiedostot ovat pieniä).
- Aineiston päivittyminen: LoD2 päivittyy vuosittain; latauspäivä on kirjattava maininnan "ikä"-kohtaan (V).
- Tallinnan geoportaalin sanamuoto ja Hexagon-mallin saatavuus: ei vahvistettu (Cloudflare 403).
- OSM:n ODbL-share-alike (A, ks. yllä).
- CityGML on iso (568 MB purettuna); kaikki 49 816 rakennusta on suodatettava bbox:lla (Python-skripti analysoi ~1 min).

## Latauslinkit (V)
- LoD2 Tallinna CityGML: https://geoportaal.maaamet.ee/index.php?lang_id=1&plugin_act=otsing&andmetyyp=hooned_lod2&dl=1&page_id=833&f=hooned_lod2-Tallinn-citygml.zip
- LoD2 Tallinna OBJ: ...&f=hooned_lod2-Tallinn-obj.zip
- LoD2 Tallinna GDB: ...&f=hooned_lod2-Tallinn-gdb.zip
- Ortokuva 589542 (2023): https://geoportaal.maaamet.ee/index.php?lang_id=1&plugin_act=otsing&kaardiruut=589542&andmetyyp=ortofoto_asulad_rgb&dl=1&page_id=610&f=589542_OF_RGB_GeoTIFF_2023_04_14.zip
- DSM 1 m 589542: https://geoportaal.maaamet.ee/index.php?lang_id=1&plugin_act=otsing&kaardiruut=589542&andmetyyp=ndsm_abs_1m_geotiff&dl=1&page_id=614&f=589542_dsm_1m.tif
- Lisenssi: https://geoportaal.maaruum.ee/opendata-licence
- Metatiedot: https://metadata.geoportaal.ee/geonetwork/srv/api/records/85d8aaab-e411-4445-b142-2c4b5d18eb8b

Työtiedostot (ei repossa, väliaikaisia): LoD2-OBJ ja ortolehdet 588542/589542; rajattu koeaineisto proto-3d/_valmiit/tallinna-koe/koe-lod2/.
