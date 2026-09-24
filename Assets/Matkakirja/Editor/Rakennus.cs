using System;
using System.IO;
using System.Linq;
using CesiumForUnity;
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Matkakirja.Editori
{
    /// <summary>
    /// Komentorivin ovet (-executeMethod). Kohtaus rakennetaan koodista, jotta
    /// sen voi luoda uudelleen ilman käsityötä editorissa.
    ///
    ///   Unity -batchmode -quit -projectPath . -executeMethod Matkakirja.Editori.Rakennus.LuoPallo
    ///   Unity -batchmode -quit -projectPath . -buildTarget iOS -executeMethod Matkakirja.Editori.Rakennus.IosSimulaattori
    /// </summary>
    public static class Rakennus
    {
        public const string PalloKohtaus = "Assets/Matkakirja/Scenes/Pallo.unity";

        /// <summary>
        /// Pelin oma pallolaatasto (Web Mercator, z0–8, 256 px, jpg) ämpärissä.
        /// Karttasepän poltto 23a (sama sävy kuin isoisän linssin rajaton 23a-sarja; web on
        /// vielä 22c:ssä), docs/raportit/natiivi-laattaosoitteet-20260923.md. Slippy-rivi 0 on pohjoisin,
        /// Cesiumin {y} eteläisin, joten osoitteessa on {reverseY}.
        /// </summary>
        public const string LaattaUrl =
            "https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-23a-pohja-20260923a/{z}/{x}/{reverseY}.jpg";
        public const int LaattaMaxTaso = 8;

        /// <summary>
        /// Karttasepän maasto (quantized-mesh-1.0, EPSG:4326, Copernicus GLO-30/90), poltto 2026-09-24-maailma:
        /// koko maailma z0–z12 (korvaa 23b:n, jonka DEM päättyi 41° N:iin). Korkeudet ovat merenpinnasta (EGM2008),
        /// ei ellipsoidista; Ranskassa ero on noin 50 m, mikä ei näy pallolla.
        /// </summary>
        public const string MaastoUrl = "https://media.matkakirja.app/julisteet/maasto/2026-09-24-maailma/layer.json";

        public static void LuoPallo()
        {
            UiPaneeliPohja();
            var kohtaus = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            var georefGo = new GameObject("CesiumGeoreference");
            var georef = georefGo.AddComponent<CesiumGeoreference>();
            georef.originPlacement = CesiumGeoreferenceOriginPlacement.TrueOrigin;

            var palloGo = new GameObject("Pallo");
            palloGo.transform.SetParent(georefGo.transform, false);
            var pallo = palloGo.AddComponent<Cesium3DTileset>();
            // Maasto oletuksena (23b: rajasaumat korjattu, iPad-kokeilu 23.9.). Kytkin
            // Komennot: maasto paalle/pois, valinta muistetaan Documents/maasto.txt:ssä.
            pallo.tilesetSource = CesiumDataSource.FromUrl;
            pallo.url = MaastoUrl;
            pallo.showCreditsOnScreen = false;
            // Peli ei käytä fysiikkaa: Cesium paistoi jokaiselle laatalle törmäysverkon (iPad-loki 23.9.).
            pallo.createPhysicsMeshes = false;

            var kerros = palloGo.AddComponent<CesiumUrlTemplateRasterOverlay>();
            kerros.templateUrl = LaattaUrl;
            kerros.projection = CesiumUrlTemplateRasterOverlayProjection.WebMercator;
            kerros.minimumLevel = 0;
            kerros.maximumLevel = LaattaMaxTaso;
            kerros.tileWidth = 256;
            kerros.tileHeight = 256;

            var kannet = georefGo.AddComponent<NapaKannet>();
            kannet.georeferenssi = georef;
            // Sävyt sovitettu mitattuihin laattoihin 82°:n kohdalla (simulaattorikaappaus 23.9.).
            kannet.pohjoinen = KansiMateriaali("Napakansi-pohjoinen", new Color32(0xba, 0xb6, 0xa6, 0xff));
            kannet.etela = KansiMateriaali("Napakansi-etela", new Color32(0xdc, 0xd6, 0xc6, 0xff));

            var merkit = georefGo.AddComponent<KaupunkiMerkit>();
            merkit.georeferenssi = georef;
            merkit.pisteMateriaali = Materiaali("Kaupunkipiste", "Matkakirja/Piste", new Color32(0x3b, 0x2f, 0x22, 0xff));
            merkit.fontti = Fontti();

            // Reitit: värit ja katkot verkkopelin js/pallolauta/reitit.js REITIN_VARIT ja *_KATKO_AST.
            var reitit = georefGo.AddComponent<Reitit>();
            reitit.georeferenssi = georef;
            reitit.maa = Viiva("Reitti-maa", new Color32(74, 58, 36, 107), 2.5f, new Vector4(0.16f, 0.5f, 0, 0));
            reitit.meri = Viiva("Reitti-meri", new Color32(61, 85, 112, 107), 2.5f, new Vector4(0.16f, 0.5f, 0, 0));
            reitit.lento = Viiva("Reitti-lento", new Color32(150, 54, 40, 153), 2.5f, new Vector4(0.35f, 0.6f, 0.35f / 2.4f, 0));
            reitit.korostus = Viiva("Reitti-korostus", new Color32(96, 40, 26, 230), 4f, new Vector4(0.35f, 0.6f, 0.35f / 1.2f, 0));
            merkit.reitit = reitit;

            georefGo.AddComponent<Laattapalvelin>();
            var alueet = georefGo.AddComponent<Alueet>();
            alueet.rasteriPohja = LaattaUrl.Replace("{reverseY}", "{y}");
            alueet.maastoLayer = MaastoUrl;
            var kerrokset = georefGo.AddComponent<KarttaKerrokset>();
            kerrokset.pallo = pallo;
            kerrokset.pohja = kerros;
            kerrokset.merkit = merkit;
            kerrokset.reitit = reitit;
            kerrokset.napakannet = kannet;
            var maat = georefGo.AddComponent<MaaKartta>();
            maat.georeferenssi = georef;
            maat.kerrokset = kerrokset;
            maat.materiaali = Materiaali("Maatayttö", "Matkakirja/MaaTaytto", Color.white);
            kerrokset.maaKartta = maat;
            var maakunnat = georefGo.AddComponent<MaaKartta>();
            maakunnat.georeferenssi = georef;
            maakunnat.kerrokset = kerrokset;
            maakunnat.materiaali = maat.materiaali;
            maakunnat.kokoelma = "maakuntarajat";
            maakunnat.piilotaKaupungit = false;
            maakunnat.jonoLisa = 1;
            maakunnat.toleranssi = 0.1;
            // Maakunnat ovat Euroopassa (FRA DEU ITA ESP GBR POL AUT CHE): 44° × 26° → 4096 × 2420, noin 1,2 km/teksel.
            maakunnat.rajaus = new Vector4(-12f, 35f, 32f, 61f);
            // Rajat vektoriviivoina (Fable 24.9.): täyttö 1,2 km:n tunnuskartasta, rajan tarkkuus aineistosta.
            maakunnat.rajaMateriaali = Materiaali("Rajaviiva", "Matkakirja/Rajaviiva", new Color(0.23f, 0.18f, 0.13f, 0.8f));
            kerrokset.maakunnat = maakunnat;
            var nappula = georefGo.AddComponent<Nappula>();
            nappula.georeferenssi = georef;
            nappula.materiaali = Materiaali("Nappula", "Matkakirja/Nappula", Color.white);
            kerrokset.nappula = nappula;
            nappula.koneMalli = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Matkakirja/Kartta/Malli/DC3.fbx");
            // Hopea mutta pergamenttia tummempi, jotta kone erottuu kartasta; raita pelin punaisella.
            nappula.koneMateriaali = Materiaali("Kone", "Universal Render Pipeline/Lit", new Color(0.55f, 0.57f, 0.60f));
            nappula.koneMateriaali.SetFloat("_Metallic", 0.6f);
            nappula.koneMateriaali.SetFloat("_Smoothness", 0.55f);
            nappula.raitaMateriaali = Materiaali("KoneRaita", "Universal Render Pipeline/Lit", new Color32(0x9a, 0x3b, 0x2c, 0xff));
            nappula.ikkunaMateriaali = Materiaali("KoneIkkuna", "Universal Render Pipeline/Lit", new Color(0.12f, 0.10f, 0.09f));
            var savuGo = new GameObject("Savujana");
            savuGo.transform.SetParent(georefGo.transform, false);
            nappula.savu = savuGo.AddComponent<Savujana>();
            nappula.savu.georeferenssi = georef;
            nappula.savu.materiaali = Materiaali("Savu", "Matkakirja/Savu", Color.white);
            var valot = georefGo.AddComponent<AiheValot>();
            valot.georeferenssi = georef;
            valot.materiaali = Materiaali("Karttavalo", "Matkakirja/Valopiste", Color.white);
            var pisteet = georefGo.AddComponent<Karttapisteet>();
            pisteet.georeferenssi = georef;
            pisteet.materiaali = valot.materiaali;
            kerrokset.pisteet = pisteet;

            var korttiGo = new GameObject("Käyttöliittymä");
            var kortti = korttiGo.AddComponent<NimiKortti>();
            kortti.fontti = merkit.fontti;
            merkit.kortti = kortti;

            var kameraGo = new GameObject("Kamera") { tag = "MainCamera" };
            var kamera = kameraGo.AddComponent<Camera>();
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = new Color(0.10f, 0.08f, 0.06f);
            kamera.nearClipPlane = 10_000f;
            kamera.farClipPlane = 100_000_000f;
            kamera.fieldOfView = 50f; // webin PALLO_FOV (js/pallolauta/kamera.js), pystysuunta kuten three.js
            var kierto = kameraGo.AddComponent<PalloKierto>();
            kierto.georeferenssi = georef;
            merkit.kamera = kamera;
            merkit.kierto = kierto;
            var komennot = kameraGo.AddComponent<Komennot>();
            komennot.kierto = kierto;
            komennot.merkit = merkit;
            var mittari = kameraGo.AddComponent<KehysMittari>();
            mittari.pallo = kierto;
            // Nykyisen maan nostot (webin pallon nostokerros); Natiivi-UI piirtää merkit.
            var nostoKerros = georefGo.AddComponent<NostoKerros>();
            nostoKerros.kierto = kierto;
            nostoKerros.merkit = merkit;
            nostoKerros.nappula = nappula;

            // Valo kulkee kameran mukana: näkyvä puolipallo on aina valaistu.
            var valoGo = new GameObject("Valo");
            valoGo.transform.SetParent(kameraGo.transform, false);
            valoGo.transform.localRotation = Quaternion.Euler(10f, -15f, 0f);
            var valo = valoGo.AddComponent<Light>();
            valo.type = LightType.Directional;
            valo.intensity = 1.1f;
            valo.color = new Color(1f, 0.97f, 0.9f);
            // Lennon ajaksi valo vaihtuu aurinkoon (LENNON ESITYS), muuten kameravalo.
            var aurinko = valoGo.AddComponent<Aurinko>();
            aurinko.georeferenssi = georef;
            aurinko.valo = valo;
            nappula.aurinko = aurinko;
            aurinko.taivas = Materiaali("Taivas", "Matkakirja/Taivas", new Color(0.80f, 0.87f, 0.94f));
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.45f, 0.42f, 0.38f);

            kierto.Aseta();
            // Korkeus lasketaan laitteen kuvasuhteesta käynnistyksessä, ei editorin.
            kierto.korkeus = 0.0;

            Directory.CreateDirectory(Path.GetDirectoryName(PalloKohtaus));
            if (!EditorSceneManager.SaveScene(kohtaus, PalloKohtaus))
                throw new Exception("Kohtauksen tallennus epäonnistui: " + PalloKohtaus);
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(PalloKohtaus, true) };
            AssetDatabase.SaveAssets();
            Debug.Log("MATKAKIRJA: kohtaus luotu " + PalloKohtaus);
        }

        public const string UiPaneeli = "Assets/Matkakirja/UI/Resources/MatkakirjaUI/Paneeli.asset";

        /// <summary>
        /// Natiivi-UI:n PanelSettings-pohja (UiKerros lataa Resources/MatkakirjaUI/Paneeli ja
        /// instansioi sen kerroksittain). Koodissa luodulla PanelSettingsillä ei ole
        /// shaderiviitteitä, joten iOS-käännöksestä puuttuisivat UI:n shaderit: editorissa
        /// ne asettaa PanelSettingsin oma InitializeShaders (Reset kutsuu sitä vain valikosta).
        /// </summary>
        static void UiPaneeliPohja()
        {
            if (AssetDatabase.LoadAssetAtPath<UnityEngine.UIElements.PanelSettings>(UiPaneeli) != null) return;
            if (!AssetDatabase.IsValidFolder(Path.GetDirectoryName(UiPaneeli))) return; // UI ei vielä mukana
            var ps = ScriptableObject.CreateInstance<UnityEngine.UIElements.PanelSettings>();
            var init = typeof(UnityEngine.UIElements.PanelSettings).GetMethod("InitializeShaders",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Public);
            if (init == null) throw new Exception("PanelSettings.InitializeShaders puuttuu (Unityn versio?)");
            init.Invoke(ps, null);
            AssetDatabase.CreateAsset(ps, UiPaneeli);
            AssetDatabase.SaveAssets();
            Debug.Log("MATKAKIRJA: UI-paneelipohja luotu " + UiPaneeli);
        }

        public const string TmpFontti = "Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF.asset";

        public const string FonttiTiedosto = "Assets/Matkakirja/Fontit/EBGaramond.ttf";
        public const string FonttiAsset = "Assets/Matkakirja/Fontit/EBGaramond SDF.asset";

        /// <summary>
        /// EB Garamond (OFL, Fontit/OFL.txt) TextMeshPro-fonttina. Atlas täyttyy
        /// dynaamisesti ajossa, joten kaikki nimien merkit (á ä é ö š ž ’) toimivat.
        /// </summary>
        static TMPro.TMP_FontAsset Fontti()
        {
            var olemassa = AssetDatabase.LoadAssetAtPath<TMPro.TMP_FontAsset>(FonttiAsset);
            if (olemassa != null) return olemassa;
            var ttf = AssetDatabase.LoadAssetAtPath<Font>(FonttiTiedosto)
                ?? throw new Exception("Fonttia ei löydy: " + FonttiTiedosto);
            var fa = TMPro.TMP_FontAsset.CreateFontAsset(ttf, 90, 9,
                UnityEngine.TextCore.LowLevel.GlyphRenderMode.SDFAA, 1024, 1024,
                TMPro.AtlasPopulationMode.Dynamic, true);
            fa.name = "EBGaramond SDF";
            AssetDatabase.CreateAsset(fa, FonttiAsset);
            fa.material.name = "EBGaramond SDF Material";
            AssetDatabase.AddObjectToAsset(fa.material, fa);
            foreach (var t in fa.atlasTextures) { t.name = "EBGaramond SDF Atlas"; AssetDatabase.AddObjectToAsset(t, fa); }
            AssetDatabase.SaveAssets();
            return AssetDatabase.LoadAssetAtPath<TMPro.TMP_FontAsset>(FonttiAsset);
        }

        static Material Viiva(string nimi, Color vari, float paksuus, Vector4 katko)
        {
            var m = Materiaali(nimi, "Matkakirja/Viiva", vari);
            m.SetFloat("_Paksuus", paksuus);
            m.SetVector("_Katko", katko);
            EditorUtility.SetDirty(m);
            return m;
        }

        static Material KansiMateriaali(string nimi, Color vari) => Materiaali(nimi, "Matkakirja/Napakansi", vari);

        /// <summary>Materiaali assetiksi annetulla shaderilla ja värillä.</summary>
        static Material Materiaali(string nimi, string shader, Color vari)
        {
            string polku = $"Assets/Matkakirja/Materiaalit/{nimi}.mat";
            Directory.CreateDirectory(Path.GetDirectoryName(polku));
            var m = new Material(Shader.Find(shader) ?? throw new Exception("Shaderia ei löydy: " + shader));
            m.SetColor("_BaseColor", vari);
            AssetDatabase.DeleteAsset(polku);
            AssetDatabase.CreateAsset(m, polku);
            return AssetDatabase.LoadAssetAtPath<Material>(polku);
        }

        static void AsetaIos(iOSSdkVersion sdk)
        {
            PlayerSettings.companyName = "Matkakirja";
            PlayerSettings.productName = "Matkakirja 3D";
            PlayerSettings.SetApplicationIdentifier(UnityEditor.Build.NamedBuildTarget.iOS, "app.matkakirja.proto3d");
            PlayerSettings.SetScriptingBackend(UnityEditor.Build.NamedBuildTarget.iOS, ScriptingImplementation.IL2CPP);
            PlayerSettings.iOS.sdkVersion = sdk;
            PlayerSettings.iOS.simulatorSdkArchitecture = AppleMobileArchitectureSimulator.ARM64;
            PlayerSettings.iOS.targetOSVersionString = "17.0";
            // Omistajan Personal Team (ilmainen provisiointi, 7 päivää).
            PlayerSettings.iOS.appleDeveloperTeamID = "F72JLS57C5";
            PlayerSettings.iOS.appleEnableAutomaticSigning = true;
            PlayerSettings.defaultInterfaceOrientation = UIOrientation.AutoRotation;
            Kuvake();
        }

        /// <summary>Pelin kompassiruusukuvake (sama kuin iOS-kuoressa) kaikkiin iOS-kokoihin, myös App Storen 1024 px.</summary>
        public const string KuvakeTiedosto = "Assets/Matkakirja/Kuvake/Kuvake-1024.png";

        static void Kuvake()
        {
            var tex = AssetDatabase.LoadAssetAtPath<Texture2D>(KuvakeTiedosto);
            if (tex == null) throw new Exception("Kuvaketta ei löydy: " + KuvakeTiedosto);
            var kohde = UnityEditor.Build.NamedBuildTarget.iOS;
            foreach (var laji in PlayerSettings.GetSupportedIconKinds(kohde))
            {
                var kuvakkeet = PlayerSettings.GetPlatformIcons(kohde, laji);
                foreach (var k in kuvakkeet)
                    for (int kerros = 0; kerros < k.maxLayerCount; kerros++) k.SetTexture(tex, kerros);
                PlayerSettings.SetPlatformIcons(kohde, laji, kuvakkeet);
            }
        }

        static void Kaanna(string kansio, BuildOptions lisat = BuildOptions.None)
        {
            if (!File.Exists(PalloKohtaus)) LuoPallo();
            var asetukset = new BuildPlayerOptions
            {
                scenes = new[] { PalloKohtaus },
                locationPathName = kansio,
                target = BuildTarget.iOS,
                options = lisat,
            };
            // Release-käännös oletuksena: Development-tila hidastaa ja näyttää kehityskonsolin.
            EditorUserBuildSettings.development = (lisat & BuildOptions.Development) != 0;
            var raportti = BuildPipeline.BuildPlayer(asetukset);
            var s = raportti.summary;
            Debug.Log($"MATKAKIRJA: käännös {s.result}, {s.totalTime.TotalSeconds:F0} s, virheitä {s.totalErrors}, {kansio}");
            if (s.result != BuildResult.Succeeded)
            {
                foreach (var v in raportti.steps.SelectMany(a => a.messages).Where(m => m.type == LogType.Error))
                    Debug.LogError("MATKAKIRJA: " + v.content);
                EditorApplication.Exit(1);
            }
        }

        /// <summary>Xcode-projekti simulaattorille: Build/iOS-sim.</summary>
        public static void IosSimulaattori()
        {
            AsetaIos(iOSSdkVersion.SimulatorSDK);
            Kaanna("Build/iOS-sim");
        }

        /// <summary>
        /// Xcode-projekti laitteelle: Build/laite. MATKAKIRJA_KEHITYS=1 = Development-käännös
        /// (ProfilerRecorderin aikamerkit, esim. Natiivi-UI:n `ui piikit`); ei koskaan TestFlightiin.
        /// </summary>
        public static void IosLaite()
        {
            AsetaIos(iOSSdkVersion.DeviceSDK);
            bool kehitys = Environment.GetEnvironmentVariable("MATKAKIRJA_KEHITYS") == "1";
            Kaanna("Build/laite", kehitys ? BuildOptions.Development : BuildOptions.None);
        }

        /// <summary>
        /// Xcode-projekti TestFlightiin: Build/testflight (Julkaisija arkistoi ja lähettää
        /// pilviallekirjoituksella). Ympäristömuuttujat:
        ///   MATKAKIRJA_BUNDLE_ID  (oletus app.matkakirja.proto3d)
        ///   MATKAKIRJA_TEAM       maksullisen tiimin Team ID (oletus Personal Team F72JLS57C5)
        ///   MATKAKIRJA_VERSIO     CFBundleShortVersionString (oletus 0.1.0)
        ///   MATKAKIRJA_BUILD      CFBundleVersion, kasvava kokonaisluku (pakollinen)
        ///   MATKAKIRJA_APPSTORE   1 = App Store -käännös (määrite MATKAKIRJA_APPSTORE)
        ///   MATKAKIRJA_KANSIO     vientikansio (oletus Build/testflight; rinnakkainen erä esim. Build/testflight-2)
        /// Info.plistiin ITSAppUsesNonExemptEncryption = false (vain HTTPS).
        /// </summary>
        public static void IosTestFlight()
        {
            string Ymp(string nimi, string oletus) =>
                string.IsNullOrEmpty(Environment.GetEnvironmentVariable(nimi)) ? oletus : Environment.GetEnvironmentVariable(nimi);
            var build = Ymp("MATKAKIRJA_BUILD", null)
                ?? throw new Exception("MATKAKIRJA_BUILD puuttuu (kasvava build-numero)");
            AsetaIos(iOSSdkVersion.DeviceSDK);
            PlayerSettings.SetApplicationIdentifier(UnityEditor.Build.NamedBuildTarget.iOS,
                Ymp("MATKAKIRJA_BUNDLE_ID", "app.matkakirja.proto3d"));
            PlayerSettings.iOS.appleDeveloperTeamID = Ymp("MATKAKIRJA_TEAM", "F72JLS57C5");
            PlayerSettings.bundleVersion = Ymp("MATKAKIRJA_VERSIO", "0.1.0");
            PlayerSettings.iOS.buildNumber = build;
            // MATKAKIRJA_APPSTORE=1: App Store -käännös (linssien kehittäjätila pois, kynnykset aina;
            // Linssiseppä/Fable 23.9.). Sisäinen TestFlight ilman määritettä.
            var kohde = UnityEditor.Build.NamedBuildTarget.iOS;
            string maaritteet = PlayerSettings.GetScriptingDefineSymbols(kohde);
            bool appStore = Ymp("MATKAKIRJA_APPSTORE", "0") == "1";
            if (appStore) PlayerSettings.SetScriptingDefineSymbols(kohde, (maaritteet + ";MATKAKIRJA_APPSTORE").Trim(';'));
            TestFlightVienti = true;
            try { Kaanna(Ymp("MATKAKIRJA_KANSIO", "Build/testflight")); }
            finally
            {
                TestFlightVienti = false;
                if (appStore) PlayerSettings.SetScriptingDefineSymbols(kohde, maaritteet);
            }
            Debug.Log($"MATKAKIRJA: TestFlight-vienti {PlayerSettings.applicationIdentifier} " +
                      $"{PlayerSettings.bundleVersion} ({build}), tiimi {PlayerSettings.iOS.appleDeveloperTeamID}");
        }

        static bool TestFlightVienti;

        /// <summary>
        /// Build-numero (PlayerSettings.iOS.buildNumber = CFBundleVersion) Xcode-projektin
        /// StreamingAssetsiin (Data/Raw/rakennus.txt): BuildNumeroSilta lukee sen Natiivi-UI:n
        /// "Peli päivittyi" -vertailuun. Ei kirjoita repoon.
        /// </summary>
        [UnityEditor.Callbacks.PostProcessBuild(180)]
        static void BuildNumeroTiedostoon(BuildTarget kohde, string polku)
        {
            if (kohde != BuildTarget.iOS) return;
            string kansio = Path.Combine(polku, "Data", "Raw");
            Directory.CreateDirectory(kansio);
            File.WriteAllText(Path.Combine(kansio, "rakennus.txt"), PlayerSettings.iOS.buildNumber ?? "");
        }

        /// <summary>Laattapalvelin (127.0.0.1) vaatii ATS-poikkeuksen paikalliselle verkolle.</summary>
        [UnityEditor.Callbacks.PostProcessBuild(190)]
        static void PaikallinenVerkkoPlist(BuildTarget kohde, string polku)
        {
            if (kohde != BuildTarget.iOS) return;
            var plistPolku = Path.Combine(polku, "Info.plist");
            var plist = new UnityEditor.iOS.Xcode.PlistDocument();
            plist.ReadFromFile(plistPolku);
            var ats = plist.root["NSAppTransportSecurity"]?.AsDict() ?? plist.root.CreateDict("NSAppTransportSecurity");
            ats.SetBoolean("NSAllowsLocalNetworking", true);
            // Radiolinssi (AVPlayer): Icecast-asemista osa on http-osoitteissa; poikkeus koskee vain
            // AVFoundationin mediaa, ei muuta verkkoliikennettä (App Storen hyväksymä avain).
            ats.SetBoolean("NSAllowsArbitraryLoadsForMedia", true);
            // Pöllön sanelu (Pelikoodari, Scripts/Peli/Sanelu.cs): ilman näitä Sanelu.Saatavilla = false.
            plist.root.SetString("NSMicrophoneUsageDescription",
                "Matkakirja käyttää mikrofonia, kun kysyt pöllöltä ääneen. Ääntä ei tallenneta.");
            plist.root.SetString("NSSpeechRecognitionUsageDescription",
                "Puheesi muutetaan tekstiksi, jotta pöllö ymmärtää kysymyksesi. Tunnistus tehdään laitteella aina, kun se on mahdollista.");
            plist.WriteToFile(plistPolku);
        }

        [UnityEditor.Callbacks.PostProcessBuild(200)]
        static void TestFlightPlist(BuildTarget kohde, string polku)
        {
            if (kohde != BuildTarget.iOS || !TestFlightVienti) return;
            var plistPolku = Path.Combine(polku, "Info.plist");
            var plist = new UnityEditor.iOS.Xcode.PlistDocument();
            plist.ReadFromFile(plistPolku);
            plist.root.SetBoolean("ITSAppUsesNonExemptEncryption", false);
            plist.WriteToFile(plistPolku);
        }
    }
}
