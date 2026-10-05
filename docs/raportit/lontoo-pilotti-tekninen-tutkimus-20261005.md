# Lontoo-pilotti: tekninen tutkimus (Linssiseppä LS2:n puolesta, 5.10.2026)

Tilaaja Päätoimittaja (5.10.). Pohja Karttasepän suunnitelma `lontoo-pilotti-suunnitelma-20261005.md` (a6bcf4b56/72ac25b44).
Ei pelikoodia. Mittaukset CesiumJS 1.146:lla headless-Chromiumissa (CesiumJS:n oma arviointitoken vain tähän kokeeseen,
ei mihinkään koodiin), lähteet Cesium for Unityn lähdekoodista (proto: com.cesium.unity 1.25.1) ja Cesiumin dokumenteista.
Kuvat: `proto-3d/lokit/linssiseppa-lontoo-tutkimus-20261005/` (kooste `lontoo-osm-s2-kooste.png`, 8 pysähdystä `kuvat/`).

## SUOSITUS (yksi)

**Lontoo rakennetaan nykyisen pallon päälle: maasto ja maakuva omasta ämpäristä, ionista vain OSM Buildings (96188),
origo asetetaan kerran lennon alussa Lontooseen, kamera lasketaan omana splinenä paikallisessa ENU-kehyksessä ja seuraavan
pysähdyksen laatat esiladataan piilokameralla (CesiumCameraManager.additionalCameras); kertoja käyttää linnan jaksomallia.**
Ennen rakentamista kaksi asiaa: (a) Karttaseppä tekee Lontoolle tarkemman S2-tason (z13–z14, natiivi 10 m), koska
s2-eurooppa/v1 päättyy z10:een (~95 m/px) eikä Thames edes erotu; (b) omistaja tietää, että ion Community on vain
ei-kaupalliseen ja kokeilevaan kehitykseen, joten julkaisussa rakennukset tulevat omasta ämpäristä (suunnitelman varapolku).

## 1. Cesium for Unity iOS:llä: suorituskyky ja muisti

| Asia | Tulos | Lähde |
|---|---|---|
| Versio | proto 1.25.1, uusin 1.26.0 (1.10.2026) | manifest.json, CHANGES.md |
| iOS-simulaattori | **toimii meillä** (pallo ja ISS-ajot simulla päivittäin); kirjasto on arm64-staattinen | oma käyttö, `lipo` |
| Nykyinen pallo | oma quantized-mesh (`julisteet/maasto/2026-09-24-maailma`, z0–12, GLO-30) + S2-overlay; SSE 16, välimuisti 512 Mt, 20 rinnakkaista, preloadAncestors/Siblings, forbidHoles | Pallo.unity:310–363 |
| Asetusten vaihto | jokainen Cesium3DTileset-asetus kutsuu RecreateTileset() → ei kesken lennon | Cesium3DTileset.cs |
| Latauksen edistyminen | `ComputeLoadProgress()` 0–100 (v1.6.0), arvio → odota ≥ 99 + aikaraja | Cesium3DTileset.cs:739 |
| Esilataus | `CesiumCameraManager.additionalCameras`: "used even when they are disabled … virtual camera that affects loading without rendering" | CesiumCameraManager.cs:88–98 |
| Pysäytys | `suspendUpdate` (LOD ja karsinta jäädytetään) | Cesium3DTileset.cs:638 |
| Levyvälimuisti | SQLite `cesium-request-cache.sqlite` temporaryCachePath:ssa; raja merkintämääränä (maxItems 4096), noudattaa Cache-Controlia | cesium-unity UnityExternals.cpp, cesium-native |
| Muistiriskit | iPhone-kaatumiset Google-tileseteillä (foorumi: SSE ↑, välimuisti ↓); 6/2026 raportti: tilesetin poisto ei vapauta natiivimuistia Unity 6000.3:lla (**EPÄVARMA**, mitattava) | community.cesium.com /33037, /46533 |

**Mitattu datamäärä (CesiumJS, 1180×820 ≈ iPad Air vaaka, 8 pysähdystä, purettu koko):**

| Asetus | Rakennukset | ion-maasto | S2 (oma) | Yhteensä | Odotus/pysähdys (SwiftShader) |
|---|---|---|---|---|---|
| SSE 16 / maasto 2 (CesiumJS-oletus) | 87,3 Mt | 17,9 Mt | 1,2 Mt | ~106 Mt | 8–34 s |
| SSE 32 / maasto 4 (mobiili) | 77,7 Mt | 13,7 Mt | 1,2 Mt | ~93 Mt | 2–12 s |

- Greenwich (laaja näkymä horisonttiin) vie kolmanneksen (32–35 Mt rakennuksia). **Matala, kaupunkiin päin katsova
  kamera ja horisontin peitto (sumu/kallistus) on suurin säästö**, ei SSE.
- **Siirtokoko verkossa (gzip) on ~2,9× pienempi:** SSE 32 -ajo 87 Mt purettuna = **30,2 Mt siirtona** ionista
  (Playwright responseBodySize). Ilman ion-maastoa ~27 Mt/kylmä lento → 15 Gt/kk ≈ **500–550 kylmää lentoa**;
  suunnitelman arvio 30–80 Mt osuu alarajaan. Riittää pilottiin, ei julkaisuun.
- Headless-lennossa kehyksiä on vähän, joten siirtymien välilaatat jäävät osin mittaamatta → laitteella hieman enemmän.

**Mobiiliasetusten lähtöarvot (mitattava iPadilla):** rakennukset SSE 24–32, maasto nykyinen pallo (SSE 16);
välimuisti rakennuksille 128–192 Mt iPhone / 256 Mt iPad; 8–12 rinnakkaista; preloadAncestors päällä, preloadSiblings
pois; createPhysicsMeshes pois; showCreditsOnScreen päällä (OSM-attribuutio). Pallon oma välimuisti (512 Mt) kutistetaan
lennon ajaksi kuten IssKameraKuva tekee (64 Mt), muuten kaksi 512 Mt:n budjettia.

## 2. Kameran lentorata georeferoidussa maailmassa

- **Origo:** nyt kiinteä (Pallo.unity:849–856, Golden CO), origon siirtoa ei ole. Lontoon reitti mahtuu ~10 km:n säteelle
  (Greenwich–Buckingham ~10 km) → `SetOriginLongitudeLatitudeHeight` **kerran lennon alussa** Lontoon keskelle ja takaisin
  lopussa riittää: floatin tarkkuus 10 km:ssä on ~1 mm. **CesiumOriginShift-komponenttia ei tarvita** (se vaatisi
  GlobeAnchorin kaikkiin olioihin, ja foorumilla on ratkaisematon välkyntäraportti dynaamisella kameralla).
- **Rata:** Cinemachine ei ole manifestissa; Siirtosepän linnasuunnitelma tuo Cinemachine 3:n ja Timelinen junaan 143.
  Kun origo on lennon ajan kiinteä, Unityn paikalliset koordinaatit ovat stabiileja, joten Cinemachinen spline toimisi —
  mutta suositus on **oma Hermite/Catmull-Rom-spline ENU-kehyksessä** (pisteet lat/lon/korkeus → ECEF → Unity kerran
  lennon alussa), koska kameran on päivityttävä ennen Cesiumia (KyydinKameraEnnen-malli, DefaultExecutionOrder −50, muuten
  yhden kehyksen aukot) ja koska linnan Cinemachine-vaihe ei ole vielä junassa. Jos linnassa otetaan Cinemachine käyttöön,
  sama rata voidaan siirtää CinemachineSplineDollyyn myöhemmin.
- **LOD-odotus:** (1) piilokamera seuraavaan pysähdykseen `additionalCameras`-listaan heti lähestymisen alussa;
  (2) lähestymisen viimeiset 2–3 s hidastetaan; (3) pysähdyksessä odotetaan `ComputeLoadProgress() ≥ 99` enintään 5–8 s,
  kertoja odottaa kameraa (kuten linnassa). Mitattu: ilman esilatausta odotus oli 2–12 s / pysähdys (SSE 32, Mac Studion
  verkko, ohjelmistorenderöinti), joten esilataus on välttämätön.

## 3. Kertojan ajastus pysähdyksiin

Olavinlinnassa **ei ole Timelinea**: kertoja on `KertojaJakso`-lista (DioraamaData.cs:448; Id, Teksti, Aani, Tila, Kamera,
KestoS), jakson kesto `max(kesto, äänen KestoS + 0,5)` (PoikkileikkausLinssi.cs:347), ääni odottaa kameraa ja latausta
enintään 4 s (DioraamaAanet.cs:274–305), napautus ohittaa, `EsilataaKertoja()`. **Suositus: sama malli Lontooseen.**
Yksi ElevenLabs-otto koko tekstistä (muistisääntö) → kohdistuksen sana-aikaleimoista jaksorajat (8 pysähdystä) → jaksot
ovat leikkeitä samasta tiedostosta (alku/loppu s). Avainsanat `avainsanat[].t_s`-kentästä kuten linnassa. Timeline tulee
vasta, jos linna siirtyy siihen junassa 143; silloin Lontoo seuraa samaa.

## 4. Mitä Lontoo näyttää ilman Googlea

Kooste `lontoo-osm-s2-kooste.png` (rakennukset yhdellä pergamenttisävyllä):
- **OSM Buildings on Keski-Lontoossa yllättävän hyvä:** Tower Bridge torneineen, Towerin muurit ja tornit, St Paul'sin kupoli
  ja lyhty, parlamenttitalo ja Westminster Abbey osina (OSM building:part), rautatieasemat ja korttelit. Kattomuodot
  puuttuvat (litteät), ikkunoita ja tekstuureja ei ole → sopii pelin "pienoismalli"-estetiikkaan, kun sävytetään.
- **Maakuva on heikoin lenkki:** s2-eurooppa/v1 = z6–z10 (laatat.json: "80 m:n overview") → Lontoossa ~95 m/px. Thames,
  puistot ja kadut eivät erotu; maa on vihreänharmaata sumua. Tarvitaan Lontoon S2 z13–z14 (natiivi 10 m, ~6–12 m/px):
  40 × 40 km ≈ 700–2 800 laattaa, arviolta 20–80 Mt ämpärissä (**EPÄVARMA**, Karttaseppä mitoittaa).
- **Tyylitys Unityssä:** metadatapohjaista per-rakennus-tyyliä ei ole (Cesium foorumi 9/2025). Koko tilesetin oma
  materiaali (opaqueMaterial) toimii → yksi pergamentti/seepia-sävy + korkeusgradientti varjostimessa. Tunnusrakennukset
  (Tower, St Paul's, Westminster) voi myöhemmin korvata omilla malleilla piilottamalla OSM-massan alueelta.
- ion World Terrain ei tuo Lontooseen mitään omaan maastoon verrattuna (tasainen, GLO-30 riittää) → jätetään pois:
  kiintiö −15 %, ei toista maastotilesetiä eikä z-taistelua pallon kanssa.

## Riskit ja avoimet

1. **ion Community = "personal and non-commercial use" tai "exploratory commercial development"** ja raja 50 k$
   (cesium.com/platform/cesium-ion/pricing). Pilotti on kokeilua → ok; julkaisuun rakennukset omasta ämpäristä
   (OSM → 3D Tiles omalla putkella, ODbL-attribuutio) tai maksullinen taso. Omistajan päätös ennen julkaisua.
2. Tilesetin poiston muistivuoto Unity 6000.3:lla (raportti 6/2026) → mittaa iPadilla lennon jälkeen `os_proc_available_memory`.
3. Mittaustyökalu puuttuu: ei huippumuistin lokia; lisätään jaksoloki (KehysMittari + os_proc_available_memory + tavut).

## Liite: mittausympäristö

`proto-3d/tyokalut/linssiseppa-ajot/lontoo-koe/aja.mjs` (Playwright, Chromium SwiftShader 1180×820, kahdeksan pysähdystä, hyppy/lento 8 s),
`index.html` (CesiumJS 1.146 World Terrain + createOsmBuildingsAsync + oma S2 UrlTemplate). Tavut XHR-vastauksista (purettu); tulokset lokikansion tulos-*.json. S2-laatat haettava ämpäristä paikallisesti (ei CORSia).
