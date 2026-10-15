# Sopimus276: vaikutusauditointi

**Uusi sopimus edellyttää erillistä yhdistettyä atlasvientiä ja vesipintojen poistamista GLB:stä. Korkean tarkkuuden natiivityömalli säilyy käyttökelpoisena. Sopimuksen oletus kahden korkeusristiriidan ratkeamisesta datumilla ei pidä nykyisten suhteellisten korkeuslukujen tapauksessa.**

Kirje luettiin kokonaan. Kopion Git-blobSHA1 laskettiin tavuaineistosta ja vastaa annettua `857e9501022996e62b47cbd2f9ab5232678a93b2`-tunnistetta. Lähdecommit651ccbd… on toimeksiannon tieto; Git-palvelusta ei haettu uutta versiota. Kirje on OFFGAME-sopimus, ei integraatio- tai julkaisulupa.

## 1. Uusi pelivientiprofiili

Natiivin jaetut yksityiskohtameshit ja tarkat puut sopivat edelleen työmallin rakenteeksi. Pelivientiin tarvitaan erillinen adapteri: instanssien lopulliset transformaatiot leivotaan geometriaan ja puut/oksat sekä toistuvat arkkitehtuuriosat yhdistetään harvoiksi laattakohtaisiksi atlasmesheiksi. Vaatimus koskee myös kaiteita, pylväitä ja kivikehyksiä. Pelkkä GPU-instancingin poistaminen ja satojen tavallisten solmujen jättäminen ei täytä kirjettä.

Historiallisesta `export-round41-sprigs/glb/peking_1_5_lod0.glb`-tiedostosta luettiin glTF-JSON: 1368 solmua, 13 EXT_mesh_gpu_instancing-solmua ja enimmillään343 viittausta samaan meshiin. Se ei kelpaa uuteen profiiliin. Round44-sprigs-tila on yhä prepared-awaiting-full-export,0/96 GLB:tä. Näitä ei nimetä uudeksi pelitoimitukseksi eikä niiden instanssisäästöjä siirretä uuden profiilin budjettiin.

Kovat rajat säilyvät: **164326250 tavua tekstuureineen ja1397383 kolmiota kaikkien96 tiedoston summana** (32 laattaa ×3 LOD). Uudessa viennissä mukaan lasketaan kaikki leivotut toistot ja kaikkien materiaaliprimitiivien index-kolmiot. Yhteiset ulkoiset tekstuurit lasketaan tavubudjettiin kerran sovitun paketin tasolla; upotetut kopiot kuuluvat jokaisen GLB:n tavuihin. Budjettia ei ole nyt toteutuneesti läpäisty. Historiallinen round44:n pelkkä static-main-esitarkistus1557674 ei sekään ole tämän uuden profiilin mittaus.

Atlas tai objektien yhdistäminen ei yksin todista Cesiumin muistinkäyttöä: lopullisista GLB:istä on luettava solmu/mesh/materiaali/image-määrät ja tekstuurien monistuminen. Laitteen GPU-muisti jää myöhempään integraatiomittaukseen.

## 2. Vesi, origo ja DEM

`rakenna.py:28–29`: ENU-origo39.915896N,116.390814E ja paikallinen z=0 ellipsoidikorkeudella37.9 m. DEM-metatieto ilmoittaa Copernicus GLO-30 DSM:n, EGM2008→ellipsoidi-muunnoksen ja N=−9.158 m. Käsitelty maa on 5 m:n uudelleennäytteistys30 m:n lähteestä, rakennus-/puustojäänteiden korjauksineen; sitä ei pidetä kartoitusmittauksena. Metatiedoston ja maarasterin SHA:t vastaavat vesitasojen kirjattuja lähde-SHA:ita.

Vesitasot ovat veden sisäpuolisen käsitellyn maan mediaani +0.05 m näyttövara, eivät mitattuja vedenpintoja:

| Vesistö / OSM-ID | Ellipsoidi h (m) | Paikallinen z (m) | Pohjan/muurin tavoite z enintään (m) |
|---|---:|---:|---:|
| 筒子河 / `way/4845030` | 35.65 | -2.25 | -3.25 |
| 北海 / `relation/5451458` | 34.85 | -3.05 | -4.05 |
| 中海 / `relation/68127` | 34.85 | -3.05 | -4.05 |
| 南海 / `relation/3531212` | 35.35 | -2.55 | -3.55 |

Zhongnanhai koostuu tässä kahdesta eri tasosta: Zhonghai−3.05 ja Nanhai−2.55. Niitä ei saa yhdistää yhdeksi luvuksi ilman uutta lähdepäätöstä. Kirje nimeää peliväritunnisteet vallihauta0 ja Beihai1; Zhongnanhain puuttuvaa pelitunnistemääritystä ei keksitä tässä.

Nykyinen `stage2_geometry.build_waters` nimeää pinnat `water-<osmID>` ja `rakenna.py:311` antaa ne vientiin (`extras + waters`). Vie_laatta valitsee ne export-objekteiksi. Vesi ei siis nykyisessä lähdepolussa jää automaattisesti pois GLB:stä. Tuleva preview-adapteri voi nimetä ne `VESI_<vesistö>`, mutta poissulku on varmistettava myös semanttisista waterOSMID-/materiaaliattribuuteista sekä lopullisen GLB-geometrian tarkastuksella.

**Vähintään1 m:n vedenalainen rakenne ei nyt täyty:** `visible_ground_z` laskee preview-maata vain0.25 m veden alle. `stage8_shore.coping` käyttää Beihain saarikiviverhouksen alarajaa−3.25: Beihain pinnasta−3.05 tämä on vain0.20 m. Street/ground-aineisto ilmoittaa waterExcludedFromGroundAndStreetMeshes=true, eikä sen pintalajeissa ole altaan pohjaa. Tämä ei todista kaikkien tallennetun natiivin vedenalaisten pintojen kattavuutta, mutta lähdepolut eivät anna vaadittua1 m:n pohja-/muuritakuuta. Tarvitaan erillinen pohja- ja rantamuuriportti säilyttäen kuivan rantaviivan ja saarten XY-lähdemuoto.

Vesipinnan poissulkeminen ei poista vedenalaisen pohjan tai seinämän tarvetta: pelivesi on rantavyöhykkeellä läpikuultava. Uutta Blender-vesiefektiä tai pelin vesi/taivas/fog-putkea ei tarvita coffer48:n yhteyteen.

## 3. Kaksi suhteellista korkeusristiriitaa

| Kohde | Peritty suhteellinen lähdekorkeus | Nykyinen suhteellinen geometria | Ero | Näytön rajaus |
|---|---:|---:|---:|---|
| `way/638449347` | 41.000000 m | 36.649999847 m | 4.350000153 m | actual saved owner-labelled instances |
| `way/688124109` | 29.700000 m | 8.102058112 m | 21.597941888 m | selected source independently constructed; not saved-scene ownership measurement |

Taihedian: prosessoidun ENU-aineiston41 m on `korkeus_lahde=osm-osat`; alkuperäisessä OSM:ssa osa `way/638449354` sisältää height=41 ja min_height=27. Vanhemman parent-wayn omassa tagilistassa ei ole height-tagiä. Tarkka owner-rakenne syntyy `stage8_precise_hall.build`-lähteestä; auditissa tallennetun scenen378 owner-labelled instanssin korkein kärki on36.649999847 m lähdemaan yläpuolella. Ero4.350000153 m ylittää2.05 m toleranssin.

`way/688124109`:29.7 m on prosessoidun ENU-aineiston **3dglobfp-kk-arvio**, ei alkuperäisen OSM-wayn height-tagi. `stage6_geometry.adjust_heritage:224–230` vaihtaa suhteellisen rakenneparametrin tavoiteperäiseen7.5 m arvioon. Valitusta lähteestä erikseen rakennettu geometria ulottuu8.102058112 m maasta;21.597941888 m ero ylittää1.485 m toleranssin. Tämä auditin luku ei ole tallennetun scenen ownership-mittaus.

Datum ja rakennuksen suhteellinen korkeus ovat eri suureita. Kun h on ellipsoidikorkeus, H ortometrinen korkeus ja N geoidikorkeus, `h = H + N`. Saman rakennuspaikan huipulle ja maalle pätee:

```text
H_top − H_ground
= (h_top − N) − (h_ground − N)
= h_top − h_ground

(h_top + C) − (h_ground + C) = h_top − h_ground
```

Siis yhteinen datum/origosiirto ei muuta suhteellista korkeutta tai näitä eroja. Metatiedon vakio-N:llä37.9 m:n ellipsoidiorigo vastaa H0=47.058 m; tämä muuttaa korkeuden absoluuttista merkintää, ei41/36.65- tai29.7/8.102-eroa. Saman XY:n ylä-/alapisteen geoidikorjaus kumoutuu myös paikasta riippuvassa N-mallissa.

Uusi DEM voi parantaa absoluuttista sijoitusta, mutta suhteellisten mittojen yhteensovitus vaatii erillisen lähde-/rakennusosatulkinnan. Pelkän maan siirto huipun pysyessä paikallaan muuttaa fyysistä geometriaa eikä ole datum-muunnos. Nykyinen GLO-30-aineisto on jo muunnettu ellipsoidiin; EGM2008-korjausta ei lisätä uudelleen. Molemmat lähderistiriidat pysyvät avoimina ja sourceTolerancePassed=false.

## 4. Materiaalit ja vertailuvalaistus

Kirjeen mukaan pelin OmaMalli lukee PBR-kartat: karheusG, metalliB, occlusionR, emissive; tangenttikehys lasketaan pikselissä. Alfalehti MASK0.5, kaksipuolinen; BLEND ei lupaa jatkuvaa läpikuultavuutta. JPEG/PNG toimitetaan, KTX2-pakkaus jää peliputkeen. BaseColoriin ei leivota aurinkoa, suoria varjoja, taivasta tai sumua; AO on sallittu.

Nykyisen native47-preview-raportin todellinen kuvaus on AgX / Medium High Contrast, exposure≈−0.05. Se on olemassa oleva vertailupreview, ei kirjeen Standard/Neutral-pelivastaavuustodiste. Tuleva sopimusvertailu tehdään erikseen tasaisessa päivänvalossa ilman bloomia/mistiä ja säilyttäen alkuperäiset RGB:t sekä lukitut historialliset vertailut.

## Toimitusportit

1. Preserve current detailed native model as production/visual source. Build a separate disposable export adapter using baked instance transforms and few atlas-sharing merged meshes per tile/LOD/material family; do not replace native tree detail merely to imitate the new delivery profile.
2. Final delivery must contain96 files/32 tiles x3 LODs in REPLACE chains, metres and +Y up, baked azimuth and explicit ENU/WGS84 ellipsoid-origin metadata. Read final GLB JSON and geometry, not exporter config alone.
3. Reject EXT_mesh_gpu_instancing in extensionsUsed, extensionsRequired or node extensions. Reject hundreds of aliases of one mesh. Bake all tree, sprig and repeated architectural instances, including heritage coffer/rail/columns, then merge spatially per tile and material; preserve tile ownership and transformed normals.
4. Use shared atlas content with compatible UVs, opaque or MASK0.5 double-sided foliage. Joining objects without atlas/material consolidation is not proof of low Cesium memory; measure final node/mesh/material/image counts and duplicated texture bytes, then future device GPU memory separately.
5. Recompute actual index-based triangle totals across every material primitive in all96 final GLBs after baking instances. Preserve hard aggregate1,397,383-triangle and164,326,250-byte caps, including shared external textures counted once where applicable. No old stored-prototype triangle or instancing-byte saving is transferable credit.
6. Exclude every water surface from final GLBs by semantic water metadata and material as well as VESI_ preview names. Current water-* naming and export inclusion must change only in the dedicated export/preview adapter; do not rely on a naming-only filter. Read back all final GLBs for water geometry absence.
7. Provide four source water IDs and levels, keeping Zhonghai and Nanhai separate. Declare local37.9 ellipsoid datum, origin lat/lon, already-converted Copernicus GLO-30 source and uncertainty; do not flatten both Zhongnanhai levels or invent surveyed water heights.
8. Add/verify basin floor and all shoreline-wall submerged support at or below water localZ-1, preserving dry shoreline XY/islands and existing land datum. Current source preview-.25 rule and Beihai coping-.20 depth fail the minimum; water-excluded ground is not a basin floor.
9. Do not implement an additional game water/sky/fog/postprocessing effect in coffer48 or native47 closure. Preserve original RGB; future contract comparison preview can use Standard/Neutral without silently rewriting the fixed historical comparison cameras/images.
10. Keep both historical relative-height conflicts explicit and failed. Correct absolute georeferencing separately; never shift terrain alone, relabel relative height as elevation or add the geoid correction twice to force a height match.

Tässä työssä luettiin kopioitu kirje, paikallinen lähdeaineisto, aiemmat auditit ja yksi historiallinen GLB-JSON. Ei Blenderiä, peliä, vientiajoa, mallin/lähteen/parametrien muutoksia, viestejä tai delegointia. Vain tämän auditoinnin MD- ja JSON-tiedostot kirjoitettiin T7:lle.
