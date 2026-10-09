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

## Jatko-osa 9.10. 22.2x: simulaattoriajo ja A/B 6.3 vs 6.7 (omistaja 19.3x "testataan erillään")

Sama sisältö: A = Unity 6.3 käännös 3f1d54d1b (junan 173 runko), B = Unity 6.7 b4 samasta sisällöstä (natiiviseppa/unity-67 e0f6ab0ae,
7 rivin korjaukset). Simulaattori natiiviseppa-iPhone (CDA479DE), järjestys A1 B1 A2 B2, jokainen ajo on puhdas asennus. Vaiheet:
kartta, Pariisi ja Tukholma (opas, kiinteä kamera, Cesium-laatat), Olavinlinna (poikkileikkaus) ja ISS (satelliitti, kyyti Cupolaan),
60 s mittaus per vaihe. A1 ajettiin rauhallisella koneella. B1, A2 ja B2 uusittiin PT:n rauhallisessa ikkunassa (21.44–22.13), koska
ensimmäinen kierros osui LS1:n laitekäännöksiin. Lokit: proto-3d/lokit/natiiviseppa-ab67-20261009-yhdistetty/ (ab-tulos.md).

**Toimiiko 6.7 ajossa? KYLLÄ.** Kaikki vaiheet menivät läpi molemmilla, myös Cesium (Google-laatat, omat mallit, vesi), linnan
poikkileikkaus ja ISS-kyyti. Poikkeuksia (Exception) tai VIRHE-rivejä ei ollut kummassakaan, eikä yhtään PUUTE-merkintää.

| Vaihe | Kehys ms A / B | GPU ms A / B | Unity varattu Mt A / B | Tekstuurit Mt A / B |
|---|---|---|---|---|
| kartta | 31,9 / 33,4 (30 fps lepo) | 0,54 / 0,51 | 279 / 278 | 478 / 478 |
| Pariisi | 16,7 / 16,7 | 1,76 / 1,67 (−5 %) | 489 / 486 | 1496 / 1496 |
| Tukholma | 16,7 / 16,7 | 1,62 / 1,61 | 482 / 480 | 1622 / 1621 |
| Olavinlinna | 16,7 / 16,7 | 1,19 / 0,89 (−25 %) | 580 / 580 | 998 / 994 |
| ISS | 33,3 / 33,3 (30 fps) | 0,94 / 0,89 | 465 / 465 | 939 / 902 |

- Kehysajat ovat samat, koska simulaattori pysyy ruudunpäivityksen rajassa (60/30 fps). Simulaattori piirtää Macin GPU:lla, joten
  GPU-ero ei ole laitteen ero. Olavinlinnan −25 % toistui molemmissa B-ajoissa (1,12 ja 0,88 ms vs. A 1,30 ja 1,34 ms).
- Unityn muisti (varattu, tekstuurit) on sama ±1 %.
- Macin prosessin RSS ei kelpaa vertailuun: se vaihtelee macOS:n muistinpakkauksen mukaan (A2 Tukholma 0,8 Gt vs. A1 3,6 Gt).
  B oli molemmissa ajoissa korkeampi Olavinlinnassa ja ISS:ssä (4,4 vs. 2,6–3,5 Gt ja 3,9–4,2 vs. 2,1–2,4 Gt). Tämä tarkistetaan
  laitteella (jetsam-raja), koska se voi tarkoittaa, että kaupungin muistia vapautuu 6.7:ssä hitaammin.

**Laite-A/B (iPad Pro 13, ABAB)** tehdään seuraavaksi: 6.3-laiteappi on tallessa (9dba62a6), 6.7-laitekäännös tehdään T7:llä, kun
junan 173 laitetyöt ovat ohi, ja skripti on valmis. Mitattavat: kehysaika, GPU ms, vapaa muisti jetsam-rajaan ja lämpö. Tämä täydentää
suosituksen.

**Suositus ennallaan:** 6.7 toimii ja on suorituskyvyltään vähintään samaa tasoa. Vaihto tehdään vasta 6.7 LTS:n ja Cesiumin
6.7-tuen jälkeen, ja ennen sitä tarvitaan laite-ABAB:n muistitulos.
