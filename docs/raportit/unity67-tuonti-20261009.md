# Unity 6.7 -tuonti (Natiiviseppä, 9.10.2026)

Omistajan kysymys 17.3x (PT). Kokeiltiin 6000.7.0b4:ää (beta) junan 173 rungon kopiossa. Päähaaraa EI vaihdettu: vaihto tehdään vasta
LTS:n jälkeen ja omistajan luvalla.

- Editori: T7 `/Volumes/T7 4TB/koodaus/Unity/6000.7.0b4` (iOS + Mac IL2CPP). Hubin oletus pysyy 6000.3.24f1:ssä.
- Kopio: proto-haara `natiiviseppa/unity-67` 931920957 (= juna-173 69756d35a + korjaukset) T7:llä
  `/Volumes/T7 4TB/koodaus/proto-natiiviseppa-unity67`. Lokit ovat sen `tulokset/`-kansiossa.

## Kääntyykö? KYLLÄ, 7 rivin korjauksilla

| Vaihe | Tulos |
|---|---|
| Tuonti (paketit) | 68 pakettia, URP 17.3.0 → **17.7.0** automaattisesti. Cesium 1.25.1 ja Steam Audio 4.8.1 kääntyvät sellaisenaan |
| Skriptit | 7 virhettä omassa koodissa (alla) → korjattu → 0 virhettä |
| LuoPallo | OK, 180 s |
| iOS-simulaattorivienti (IL2CPP) | **Succeeded**, 0 virhettä, 462 s. Steam Audion simulaattorikorjaus toimii (6 liitännäistä pois) |
| Varjostimet | 101 omaa varjostinta käännetty, ei yhtään "Shader error" -riviä (OmaMalli ja DioraamaValaistu mukana) |
| xcodebuild (simulaattori, Release) | **BUILD SUCCEEDED**, 281 s |
| .app | 455 Mt (6.3:lla sama runko 535 Mt; erotusta ei vielä selvitetty) |

Ajat on mitattu puhtaalta pöydältä (uusi Library, nice 15, ComfyUI samaan aikaan 19 Gt). 6.3:n ajat ovat inkrementaalisia
(26 s / 45 s / 151 s), joten niitä ei voi verrata suoraan.

## Mitä hajosi (ja korjaus)
1. `Object.GetInstanceID()` on 6.5:stä alkaen käännösvirhe (CS0619, EntityId on 8 tavua): 6 kutsua tiedostoissa SeikkailuValot,
   AjattelijaPaat, KaupunkiPalloKuva ja OpasMetrolinja. Kokeessa käytettiin `GetHashCode()`:ia (identiteettiavaimet). Oikea siirto
   tehdään `EntityId`-tyypillä, kun vaihto tehdään.
2. `UniversalCameraData.GetGPUProjectionMatrix` poistui (KaupunkiPassi, pelkkä diagnostiikkateksti) →
   `GL.GetGPUProjectionMatrix(cam.GetProjectionMatrix(0), true)`.
3. Varoituksia on 268. Uusia vanhentuneita rajapintoja ovat `FindObjectsSortMode` (160), `unityBackgroundScaleMode` (16),
   `MeshWriteData.uvRegion` (8) ja `Camera.useOcclusionCulling` (8). Ne eivät estä käännöstä, mutta ne siivotaan vaihdon yhteydessä.

Varautumiskohdat, jotka EIVÄT hajonneet: RenderGraph on jo käytössä (Compatibility Mode poistui 6.4:ssä), dynaaminen batchaus on jo
pois, ja ReplayKitiä, GameCenteriä ja DEVELOPMENT_BUILD-määritettä ei käytetä.

## Mitä EI vielä tiedetä
- **Ajonaikainen toiminta ja suorituskyky:** appia ei ajettu, koska simuvuoro tulee Julkaisijalta ja laitteelle tarvitaan oma käännös.
  Cesiumin ajonaikainen yhteensopivuus 6.7:n kanssa on avoin. Cesium tukee virallisesti vain 6.5:een asti (1.25.0); uusin on 1.26.0
  (1.10.), eikä 6.7 ole sen tukilistalla.
- Mac-käännös ja laitekäännös (arm64-laite, TestFlight-allekirjoitus) jäivät kokeilematta.
- Uudet ominaisuudet (Surface Cache GI, URP:n SSR, fast build -varjostimet) ovat käytettävissä 17.7:ssä, mutta niitä ei kokeiltu.
  SSR vaatii omilta HLSL-varjostimilta oman näytteistyskutsun.

## Suositus
1. **Ei vaihdeta nyt.** 6.7 on beta, ja LTS on tulossa Q4/2026.
2. Vaihto itsessään on pieni: 7 riviä koodia, ja paketit päivittyvät itsestään. Varsinainen riski on Cesium.
   **Odotetaan, että Cesium ilmoittaa 6.7-tuen** (tai vähintään 6.6-tuen ja 6.7-kokeen), ja tehdään sitten
   simulaattoriajo ja laite-TF sisäisille testaajille ennen päähaaraan vientiä.
3. Seuraava askel tässä kopiossa, jos omistaja haluaa: simulaattorin savuajo (käynnistys, pallo, Pariisi, Olavinlinna; Julkaisijan
   NYT-vuoro) ja Mac-käännös. Ne kertovat ajonaikaiset viat ennen LTS:ää.
