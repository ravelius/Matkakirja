# Unreal Engine vs Unity tähän hankkeeseen (3D-selvittäjä, 23.9.2026)

Jatko raportille docs/raportit/3d-selvitys-20260923.md. Hanke: yhden hengen tiimi ja
tekoälysessiot (Claude Opus, Codex) Mac Studiolla; natiivi iOS-peli (iPhone 13–16, iPad,
Android myöhemmin): pergamenttipallo omista laatoista, kallistettu näkymä ja pienet käveltävät
kohtaukset (Colosseum, Tutankhamonin hauta, pyramidit). Apuraha enintään 20 000 €.
**(EPÄVARMA)** = ei todennettu ensisijaisesta lähteestä.

## Suositus: Unity 6 (6.3 LTS)

Unrealin tunnetuimmat kuvanlaatuedut, Lumen ja Nanite, eivät ole käytössä iPhonella vuonna
2026. Siksi saavutettava kuvanlaatu iPhone 13:lla on kummassakin moottorissa suunnilleen sama.
Unity on selvästi parempi kolmessa asiassa, jotka ratkaisevat tämän hankkeen: tekoälysessiot
pystyvät tekemään siinä kaiken tekstinä ja komentoriviltä, Cesium for Unity toimii App Storessa
ilman avointa kaatumisvikaa, ja sovellus on todennäköisesti selvästi pienempi.

## Vertailutaulukko

| | Unreal Engine 5.8 | Unity 6.3 LTS | Etu |
|---|---|---|---|
| Lumen iOS:llä | Ei toimi ("currently does not work on iOS/tvOS/iPadOS") | — (URP: Adaptive Probe Volumes) | tasan |
| Nanite iOS:llä | Ei dokumentoitu; SM6 iOS:lle kokeellisena A15+ (5.8) | — (GPU Resident Drawer) | tasan |
| Renderöijä iPhonella | Mobiili deferred (SSAO, SSR, kontaktivarjot) | URP Forward+ / deferred, STP-skaalain | tasan |
| Kuvanlaatu työpöydällä | Paras | Hyvä | Unreal (ei merkitystä iOS-pelissä) |
| Cesium iOS-tila | Tuettu, mutta App Store -kaatuminen #1609 auki | Tuettu, ei avointa kaatumisvikaa | **Unity** |
| Cesium-ominaisuudet | Välillä ensin (GeoJSON-pisteet 2.29) | Kuukausittaiset julkaisut, lähes sama | Unreal lievästi |
| iOS-minimi | iOS 17, Xcode 26.1.1 | iOS 15 | Unity |
| Tyhjän sovelluksen koko | ~150–300 Mt **(EPÄVARMA)** | ~30–50 Mt **(EPÄVARMA)** | **Unity** |
| Käynnistysaika | Ei vertailumittausta **(EPÄVARMA)** | Sama | — |
| Tekoälysessiot | C++ kyllä; Blueprint binäärinä, agentit heikkoja | C# ja YAML-kohtaukset tekstinä | **Unity** |
| Headless-käännös ja testit | RunUAT, Gauntlet, Python-komentoskriptit | batchmode, -runTests, -executeMethod | Unity (kevyempi) |
| MCP | Virallinen, kokeellinen (5.8) | Virallinen (maksullinen AI-tilaus) + ilmainen CoplayDev | Unity |
| Lisenssi tässä hankkeessa | Ilmainen (5 % vasta > 1 M$) | Ilmainen (Personal < 200 k$) | tasan |
| Oppimiskäyrä yhdelle | Jyrkkä (C++, build-järjestelmä) | Loivempi | **Unity** |
| Mac-editori | Toimii; avoimia käynnistysongelmia M5 + macOS 26 | Natiivi Apple Silicon | Unity |
| Ilmaiset assetit | Fab (kaksiviikkoiset ilmaiset, käy kaikkiin moottoreihin) | Asset Store | Unreal lievästi |

## 1. Kuvanlaatu ja Nanite/Lumen iOS:llä

- Epicin oma dokumentaatio: **"Lumen currently does not work on iOS/tvOS/iPadOS devices."**
  Mobiili-Lumen vaatii korkean tason Android-laitteen (Vulkan SM5).
  [Lumen on mobile](https://dev.epicgames.com/documentation/unreal-engine/using-lumen-global-illumination-on-mobile-in-unreal-engine?lang=en-US)
- UE 5.8 (17.6.2026) tuo kokeellisen Shader Model 6:n iOS:lle A15:stä alkaen; SM6:ta vaativat
  renderöintiominaisuudet tulevat Epicin mukaan myöhemmissä versioissa.
  [5.8 release notes](https://dev.epicgames.com/documentation/unreal-engine/unreal-engine-5-8-release-notes)
- Nanite on Macilla vaatinut M2:n; iPhonella sitä ei ole dokumentoitu tuotantokäyttöön
  **(EPÄVARMA)**. [Epic roadmap](https://portal.productboard.com/epicgames/1-unreal-engine-public-roadmap/c/1151-support-for-nanite-on-apple-m2-devices-beta)
- iPhonella Unreal käyttää mobiilirenderöijää (5.8:ssa oletuksena deferred, SSAO, SSR, decalit,
  kontaktivarjot); työpöytärenderöijä iOS:llä on beta ja raskas.
  [Mobile rendering modes](https://dev.epicgames.com/documentation/unreal-engine/mobile-feature-levels-and-rendering-modes-in-unreal-engine?lang=en-US) ·
  [Tom Looman: 5.8](https://tomlooman.com/unreal-engine-5-8-performance-highlights/)
- Unity: HDRP ei toimi iOS:llä, joten URP. URP 17:ssä Adaptive Probe Volumes, GPU Resident
  Drawer (Metal tukee) ja STP-skaalain mobiilipolulla.
  [HDRP requirements](https://docs.unity3d.com/Packages/com.unity.render-pipelines.high-definition@14.0/manual/System-Requirements.html) ·
  [GPU Resident Drawer](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/gpu-resident-drawer.html) ·
  [STP](https://docs.unity3d.com/6000.3/Documentation/Manual/urp/stp/stp-upscaler.html) ·
  [URP 17](https://docs.unity3d.com/6000.0/Documentation/Manual/urp/whats-new/urp-whats-new.html)
- **Johtopäätös**: kummassakin moottorissa iPhone 13:n katto on leivottu/luotainvalaistus,
  mobiilirenderöijä, skaalain ja käsin tehdyt LODit. Käveltävien kohtausten laatu riippuu
  malleista ja valaistuksen leivonnasta, ei moottorista (arvio).

## 2. Cesium for Unreal vs Cesium for Unity

- Molemmat saavat kuukausijulkaisut ja lähes samat ominaisuudet (URL-template-rasterit,
  materiaalit, alinäkymät, fly-to). Unreal saa välillä ominaisuuden ensin.
  [Cesium 8/2026](https://cesium.com/blog/2026/08/04/cesium-releases-in-august-2026/) ·
  [7/2026](https://cesium.com/blog/2026/07/01/cesium-releases-in-july-2026/)
- **Cesium for Unreal #1609 (auki, avattu 7.2.2025, päivitetty 12.5.2026)**: arkistoitu .ipa
  kaatuu käynnistyksessä allokaattoriristiriitaan, kun symbolit karsitaan. Kiertotie: muuta
  generoidun Xcode-projektin strip-vaihe (`strip -no_code_signature_warning -x -S -D …`) ja
  käännä uudelleen — jokaisessa julkaisukäännöksessä.
  [#1609](https://github.com/CesiumGS/cesium-unreal/issues/1609) ·
  [Cesium-foorumi](https://community.cesium.com/t/solved-ios-apps-distributed-to-the-app-store-crash/29401/6)
- Cesium ei aja pakkaustestejä muille alustoille kuin Windowsille
  ([#1430](https://github.com/CesiumGS/cesium-unreal/issues/1430)).
- Cesium for Unity: iOS virallisesti tuettu; aiemmat iOS-linkitysvirheet korjattu
  ([#598](https://github.com/CesiumGS/cesium-unity/issues/598)); yksi macOS/iOS-leikkausvälkyntä auki
  ([#650](https://github.com/CesiumGS/cesium-unity/issues/650)).
  [Supported platforms](https://cesium.com/learn/cesium-unity/ref-doc/supported-platforms.html)
- Googlen 3D-laatat koskevat molempia samoin (EU-rajoitus, ks. 3d-google-laatat-eu-20260923.md).

## 3. iOS-käännös, App Store, koko ja käynnistys

- Unreal 5.8: Xcode 26.1.1, macOS 15+, iOS 17+, iPhone 11+.
  [Requirements](https://dev.epicgames.com/documentation/en-us/unreal-engine/ios-ipados-and-tvos-development-requirements-for-unreal-engine)
  Unreal meni rikki Xcode 26:n kanssa, kunnes Epicin `Apple_SDK.json` päivitettiin
  ([forum](https://forums.unrealengine.com/t/unreal-engine-5-6-1-also-5-8-will-not-work-on-macos-26-0-xcode-26-0/2681509)).
  TestFlight- ja App Review -kaatumisia käynnistyksessä on raportoitu toistuvasti
  ([Apple forums 749159](https://developer.apple.com/forums/thread/749159),
  [774701](https://developer.apple.com/forums/thread/774701)).
- Unity 6.3: iOS 15+, vie Xcode-projektin, joka käännetään xcodebuildilla.
  [Requirements](https://docs.unity3d.com/6000.3/Documentation/Manual/ios-requirements-and-compatibility.html) ·
  [Build process](https://docs.unity3d.com/6000.3/Documentation/Manual/iphone-BuildProcess.html)
- Koko: tyhjä Unreal 150–300 Mt vs Unity 30–50 Mt — yhden studion kokemus ilman menetelmää
  **(EPÄVARMA)** ([Ocean View Games](https://oceanviewgames.co.uk/blog/posts/unity-vs-godot-vs-unreal-mobile-games)).
- Käynnistysaika: vertailumittausta ei löytynyt **(EPÄVARMA)**. Unity 6:ssa oli vanhoilla
  iPadeilla 30 s käynnistysregressio, korjattu 6000.0.38f1:ssä
  ([Unity forum](https://discussions.unity.com/t/slow-app-startup-time-on-ios-with-unity-6/1539404)).
- Prototyypin viikko 1 mittaa koon ja käynnistysajan omalla käännöksellä.

## 4. Blueprint vs C# tekoälysessioille

- **Blueprint** on binääri-.uasset, jota agentti ei lue eikä diffaa
  ([Sackbird](https://www.sackbirdstudios.com/news/uasset-binary-problem)). CraftBench-UE
  (19.9.2026, UE 5.8): "C++ completion rates exceed Blueprint by 30.0 and 42.9 percentage
  points", ja Blueprint-palautuksista 42–50 % epäonnistui ajonaikaisissa tarkistuksissa
  ([arXiv 2609.23142](https://arxiv.org/abs/2609.23142)). Unrealissa agentit tekisivät siis
  kaiken C++:lla, jonka käännöskierros on pitkä; Live Coding Macilla **(EPÄVARMA)**.
- **C#** ja Unityn tekstimuotoiset kohtaukset ja prefabit (YAML) ovat agentille luettavia.
  [Text scene format](https://docs.unity3d.com/Manual//TextSceneFormat.html)

Konkreettiset headless-tehtävät, jotka Opus/Codex voi ajaa Mac Studiolla:

| Tehtävä | Unity | Unreal |
|---|---|---|
| iOS-käännös | `Unity -batchmode -quit -buildTarget iOS -executeMethod Build.iOS` → `xcodebuild archive` | `RunUAT BuildCookRun -platform=IOS -cook -stage -package` |
| Automaattitestit | `-runTests -testPlatform EditMode/PlayMode -testResults tulos.xml` | Automation-testit, Gauntlet (myös iOS-laitteella) |
| Kohtauksen generointi koodista | Editoriskripti `-executeMethod` (esim. sijoita kohteet JSONista) | Python-editoriskripti `-run=pythonscript` |
| Kuvakaappaus visuaalitarkistukseen | PlayMode-testi `ScreenCapture` | Automation screenshot -testi |
| Sisällön tuonti js/packsista | Editoriskripti JSON → ScriptableObject | Python/C++ commandlet → DataAsset |
| MCP (editorin ohjaus) | CoplayDev MCP (MIT, 47 työkalua, testit ja käännökset), virallinen AI Assistant (maksullinen) | Virallinen kokeellinen (ei autentikointia, uusi työkalu vaatii editorin uudelleenkäynnistyksen) |

Lähteet: [Unity CLI](https://docs.unity3d.com/Manual/CommandLineArguments.html) ·
[CoplayDev unity-mcp](https://github.com/CoplayDev/unity-mcp) ·
[Unity MCP -blogi 5/2026](https://unity.com/blog/unity-ai-mcp-how-to-get-started) ·
[Unreal Python](https://dev.epicgames.com/documentation/en-us/unreal-engine/scripting-the-unreal-editor-using-python) ·
[Gauntlet](https://dev.epicgames.com/documentation/unreal-engine/gauntlet-automation-framework-overview-in-unreal-engine) ·
[Unreal MCP](https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor?lang=en-US)

## 5. Lisenssit

- **Unreal**: ilmainen; 5 % rojalti vasta tuotteen elinkaaren yli 1 M$ bruttotuloista
  ([Epic license](https://www.unrealengine.com/license)).
- **Unity Personal**: ilmainen alle 200 000 $ vuotuisilla tuloilla + rahoituksella; 20 000 €:n
  apuraha jää selvästi alle. Splash-ruutu valinnainen Unity 6:ssa. Pro 2 310 $/paikka/v.
  [Unity pricing](https://unity.com/products/pricing-updates)
- Kumpikin on tälle hankkeelle maksuton.

## 6. Oppimiskäyrä, yhteisö ja PD/CC-assetit

- Yhden hengen tiimille Unity on loivempi: C# ja yksi Xcode-vienti vs C++, UnrealBuildTool ja
  suuri editori (arvio). Unreal Macilla toimii, mutta M5 + macOS 26 -käynnistysongelmia on
  raportoitu ([forum](https://forums.unrealengine.com/t/unreal-engine-5-6-5-7-fails-to-start-on-apple-m5-macos-26/2720365)).
- Fab antaa ilmaisia paketteja kahden viikon välein, ja Fabin Standard License sallii käytön
  missä tahansa moottorissa ([Fab licenses](https://dev.epicgames.com/documentation/fab/licenses-and-pricing-in-fab?lang=en-US)).
  Megascans oli kaikille ilmainen vain vuoden 2024 loppuun
  ([CG Channel](https://www.cgchannel.com/2024/10/epic-games-has-made-megascans-free-to-all-but-only-until-the-end-of-2024/)).
- PD/CC-mallit käyvät molempiin (glTF/FBX): Smithsonianin yli 2 000 CC0-mallia
  ([CG Channel](https://www.cgchannel.com/2020/03/get-2000-free-3d-models-from-the-smithsonian-collection/)),
  Poly Haven (CC0), Sketchfabin CC-mallit. Lisenssit tarkistetaan samoin kuin Commons-kuvat.

## 7. Riskit

**Unreal**
1. Lumen ei toimi iOS:llä ja Nanite/SM6 on kokeellinen → kuvanlaatuetu ei toteudu.
2. Cesium #1609: käsin tehtävä strip-kiertotie jokaiseen App Store -käännökseen.
3. Xcode/macOS-päivitykset ovat rikkoneet työkaluketjun.
4. Suuri sovelluskoko **(EPÄVARMA)**.
5. Blueprint heikko agenteille; kaikki C++:lla ja hitaalla käännöskierroksella.

**Unity**
1. Cesium-ominaisuudet tulevat välillä Unrealiin ensin.
2. Virallinen MCP vaatii maksullisen AI-tilauksen (ilmainen CoplayDev kattaa).
3. Kohtaus-YAML ja .meta-GUID:t rikkoutuvat käsin muokatessa → kohtaukset editoriskripteillä.
4. Unityn hinnoitteluhistoria (runtime fee peruttiin 2024) — luottamusriski, ei nykyinen kustannus.
   [Game Developer](https://www.gamedeveloper.com/business/unity-is-killing-its-controversial-runtime-fee)

## Johtopäätös

Unity 6.3 LTS. Unreal olisi perusteltu vain, jos pääalusta olisi työpöytä tai konsoli ja
kuvanlaatu tärkein kriteeri; iPhone-ensisijaisessa, tekoälysessioiden tekemässä pelissä
Unrealin edut eivät realisoidu ja haitat osuvat suoraan työtapaan. Ennen sitoutumista
kahden viikon piikki (prototyyppisuunnitelman viikot 1 ja 3): Cesium for Unity omilla
laatoilla TestFlightin kautta iPhone 13:lle, yksi URP-kohtaus (APV + STP), ja CoplayDev-MCP
ajamassa iOS-käännöksen.
