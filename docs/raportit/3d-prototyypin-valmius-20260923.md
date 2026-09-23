# 3D-prototyypin valmius — tarkistuslista aloitukseen (3D-selvittäjä, 23.9.2026)

Valmistelu päätöstä odottaessa; mitään ei ole asennettu eikä koodattu. Pohjana
3d-selvitys-20260923.md ja 3d-unreal-vs-unity-20260923.md. **(EPÄVARMA)** = ei todennettu.

## Mac Studion nykytila (luettu 23.9.2026, käyttäjä koodaus)

| Asia | Tila | Merkitys |
|---|---|---|
| macOS | 26.6.2 | OK |
| Xcode | **27.0** (27A266a) | Unity 6.3 suosittaa "Xcode 16 or later"; Xcode 27 -yhteensopivuutta ei ole erikseen mainittu **(EPÄVARMA, testataan ensimmäisellä käännöksellä)** |
| RAM | 64 Gt | Riittää editorille ja CI:lle rinnakkain |
| Levytila | **68 Gt vapaana** | Unity-editori + iOS-moduuli ~10–15 Gt, projektin Library 5–20 Gt → riittää, mutta tiukka pitkällä aikavälillä **(EPÄVARMA koot)** |
| Unity, Godot | Ei asennettu | — |
| Homebrew | On | Unity CLI ja Godot voi asentaa brew'llä |
| git-lfs | **Puuttuu** | Tarvitaan 3D-mallien ja tekstuurien versiointiin |
| Koodinallekirjoitusidentiteetit | **0** käyttäjällä koodaus | Laitteelle/TestFlightiin tarvitaan Apple Developer -tili ja sertifikaatti |

## A. Unity 6.3 LTS + Cesium for Unity

### A1. Omistajan tehtävät (ei voi delegoida sessioille)

1. **Unity ID -tili** (unity.com) ja **Unity Personal -lisenssi**: ilmainen, koska tulot +
   rahoitus < 200 000 $ (apuraha ≤ 20 000 €). Kirjautuminen ja aktivointi Mac Studiolla
   kerran (Unity Hub tai `unity auth login`); tunnuksia ei anneta sessioille.
   [Unity pricing](https://unity.com/products/pricing-updates)
2. **Apple Developer Program** (99 $/v), jos ei vielä ole: laitteelle asennus ja TestFlight.
   Xcoden Accounts-asetuksiin kirjautuminen käyttäjällä koodaus, jotta automaattinen
   allekirjoitus toimii; Team ID sessioille (ei salaisuus).
3. **Cesium ion -tili** (ilmainen Community): tarvitaan vain, jos käytetään ionin sisältöä
   (Cesium World Terrain kallistettuun maastonäkymään, OSM Buildings). Pelkkä
   pergamenttipallo omista laatoista ei tarvitse ionia. Community on vain ei-kaupalliseen
   käyttöön → prototyyppiin kelpaa, julkaisuun tarvitaan Commercial (149 $/kk) tai oma
   maastoaineisto. ion-avain ympäristömuuttujaan, ei repoon.
   [Quickstart](https://cesium.com/learn/unity/unity-quickstart/) ·
   [ion pricing](https://cesium.com/platform/cesium-ion/pricing/)
4. **Uusi GitHub-repo** (ks. A3) ja päätös, saako sen CI käyttää samaa Mac-runneria.
5. Hyväksyntä asennuksille (levytila, git-lfs).

### A2. Asennukset (sessio voi tehdä, kun omistaja on hyväksynyt)

1. Unity CLI: `brew install --cask unity-cli` → `unity --version`.
   [Unity CLI](https://docs.unity.com/en-us/unity-cli/use-unity-cli)
   (Vaihtoehto: Unity Hub + Hub CLI `-- --headless install --version … -m ios`, preview-tilassa.
   [Hub CLI](https://docs.unity.com/en-us/hub/use-hub-cli))
2. Editori ja iOS-moduuli: `unity install 6000.3.24f1 -m ios` (uusin 6.3 LTS -paikkaus 21.9.2026
   mukaan 6000.3.24f1 **(EPÄVARMA, tarkista `unity releases`)**; tuki joulukuuhun 2027).
   [Unity 6 support](https://unity.com/releases/unity-6/support)
3. `brew install git-lfs && git lfs install`.
4. Projekti URP-pohjalla (Cesium vaatii URP tai HDRP; iOS:llä vain URP).
5. Cesium for Unity: Project Settings → Package Manager → Scoped Registry
   - Name: `Cesium`, URL: `https://unity.pkg.cesium.com`, Scope: `com.cesium.unity`
   - Package Manager → My Registries → Cesium for Unity → Install.
   Tekstinä `Packages/manifest.json`-tiedoston `scopedRegistries`-lohkoon, jolloin sessio voi
   lisätä sen ilman editorin käsityötä.
6. Testikehys: `com.unity.test-framework` (mukana oletuksena).
7. (Valinnainen) MCP editorin ohjaukseen: CoplayDev unity-mcp (MIT, ilmainen).
   [GitHub](https://github.com/CoplayDev/unity-mcp)

### A3. Hakemistorakenne: oma repo

**Suositus: uusi repo (esim. `ravelius/Matkakirja-natiivi`), ei tämän repon alihakemisto.**
- Unityn Library/, Temp/ ja binääriassetit paisuttaisivat tämän repon historiaa (sama syy kuin
  dist/-kansion kieltämisessä CLAUDE.md:ssä) ja sotkisivat nykyiset node --test -portit ja
  Pages-julkaisun.
- Sisältö pysyy yhdessä lähteessä: tähän repoon tulee myöhemmin vientityökalu
  (`tools/vie-natiiviin.mjs`: js/packs → JSON), jonka tuloksen natiivirepo hakee.

Ehdotettu rakenne natiivirepoon:
```
Matkakirja-natiivi/
  Assets/
    Matkakirja/Scripts/      C#-ajonaikainen koodi
    Matkakirja/Editor/       editoriskriptit: käännös, kohtausten generointi, sisällön tuonti
    Matkakirja/Tests/EditMode, PlayMode
    Matkakirja/Scenes/       Pallo.unity, kohteet/Colosseum.unity …
    Matkakirja/Shaders/      pergamentti-Shader Graph
    Matkakirja/Sisalto/      tuotu JSON (generoitu, ei käsin)
  Packages/manifest.json     Cesium-rekisteri
  ProjectSettings/
  .gitignore                 Library/ Temp/ Logs/ UserSettings/ Build/
  .gitattributes             LFS: *.fbx *.glb *.png *.psd *.wav …
  docs/                      päätökset, mittaukset
```
Asetus: Editor → Asset Serialization **Force Text** (kohtaukset YAML-tekstinä agenteille).

### A4. Komennot Macilla (CI ja sessiot)

```bash
# EditMode- ja PlayMode-testit
Unity -batchmode -nographics -projectPath . -runTests -testPlatform EditMode -testResults tulokset/editmode.xml -logFile -
Unity -batchmode -projectPath . -runTests -testPlatform PlayMode -testResults tulokset/playmode.xml -logFile -

# iOS: Xcode-projektin vienti editoriskriptillä, sitten käännös
Unity -batchmode -quit -nographics -projectPath . -buildTarget iOS -executeMethod Kaannos.iOS -logFile -
xcodebuild -project Build/iOS/Unity-iPhone.xcodeproj -scheme Unity-iPhone -configuration Release -destination 'generic/platform=iOS Simulator' build
xcodebuild -project Build/iOS/Unity-iPhone.xcodeproj -scheme Unity-iPhone -configuration Release -archivePath Build/Matkakirja.xcarchive archive
```
Lähteet: [Command line](https://docs.unity3d.com/6000.3/Documentation/Manual/EditorCommandLineArguments.html) ·
[Test Framework CLI](https://docs.unity3d.com/Packages/com.unity.test-framework@1.4/manual/reference-command-line.html) ·
[iOS build process](https://docs.unity3d.com/6000.3/Documentation/Manual/iphone-BuildProcess.html)

Huomiot:
- Sama projektikansio ei voi olla auki kahdessa Unity-instanssissa → CI:lle oma checkout ja
  vuorottelu (kuten suorituskykysavukkeissa: yksi työntekijä).
- Muistion mukaan push laukaisee CI:n samalle Macille; natiivirepon CI:n ajot eivät saa osua
  omistajan mittausikkunoihin.
- Personal-lisenssin aktivointi CI:ssä vaatii tunnukset (manuaalinen aktivointi poistettu);
  ratkaisu: runner ajaa Mac Studion jo aktivoitua editoria samalla käyttäjällä.
  [GameCI #246](https://github.com/game-ci/cli/pull/246)
- Simulaattoriajot sovitaan Laitetestaajan kanssa (ainoa simulaattorin käyttäjä).

### A5. Ensimmäisen päivän hyväksymiskriteerit

1. Tyhjä URP-projekti kääntyy `-batchmode`-komennolla iOS-Xcode-projektiksi ja
   `xcodebuild`illa simulaattoriin (todentaa Xcode 27 -yhteensopivuuden).
2. EditMode-testi ajetaan komentoriviltä ja tuottaa XML-tuloksen.
3. Cesium-paketti asentuu manifestista; ellipsoidipallo + nykyinen laattapyramidi
   `CesiumUrlTemplateRasterOverlay`-komponentilla näkyy editorissa.
4. Kirjataan: editorin ja moduulien koko, Library-kansion koko, puhtaan käännöksen kesto.

## B. Godot 4.7 (B-vaihtoehto, lyhyesti)

**Omistaja**: ei lisenssiä eikä tiliä (MIT); Apple Developer -tili kuten yllä. Cesium ion vain,
jos Battle Roadin 3D Tiles -liitännäinen porataan iOS:lle (ei virallista iOS-tukea).
[3D Tiles for Godot](https://github.com/Battle-Road-Labs/3D-Tiles-For-Godot)

**Asennus**: `brew install --cask godot` (4.7.x) + saman version vientipohjat (Editor → Manage
Export Templates, ~1 Gt). Tuplatarkkuutta tarvittaessa oma editori- ja pohjakäännös (SCons),
arviolta päivän työ **(EPÄVARMA)**.
[Exporting for iOS](https://docs.godotengine.org/en/stable/tutorials/export/exporting_for_ios.html) ·
[Large world coordinates](https://docs.godotengine.org/en/stable/tutorials/physics/large_world_coordinates.html)

**Rakenne**: oma repo; kaikki tekstinä (`.gd`, `.tscn`, `.tres`), LFS binääriassetteihin,
`.godot/` gitignoreen.

**Komennot**:
```bash
godot --headless --path . -s addons/gut/gut_cmdln.gd -gexit          # GUT-testit
godot --headless --path . --export-release "iOS" build/ios/Matkakirja.xcodeproj
xcodebuild -project build/ios/Matkakirja.xcodeproj -scheme Matkakirja -destination 'generic/platform=iOS Simulator' build
```
[Command line](https://docs.godotengine.org/en/stable/tutorials/editor/command_line_tutorial.html) ·
[GUT](https://github.com/bitwes/Gut)

**Huom**: iOS-simulaattori tukee Godotissa vain Compatibility-renderöijää → suorituskyky
mitataan oikealla laitteella.

## Avoimet päätökset omistajalle

1. Moottori (Unity suositus, Godot B).
2. Uusi repo natiiviversiolle ja sen nimi.
3. Levytila: riittääkö 68 Gt, vai siivotaanko/ulkoinen levy.
4. Apple Developer -tili ja Xcode-kirjautuminen käyttäjälle koodaus.
5. Cesium ion Community -tili prototyyppiin (tarvitaan vain maastonäkymään).
