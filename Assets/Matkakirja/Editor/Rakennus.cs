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
        /// Sama kansio kuin js/pallo.js:n PALLO_LAATAT. Slippy-rivi 0 on pohjoisin,
        /// Cesiumin {y} eteläisin, joten osoitteessa on {reverseY}.
        /// </summary>
        public const string LaattaUrl =
            "https://media.matkakirja.app/julisteet/pallo/laatat/2026-09-21-pohja-20260921a/{z}/{x}/{reverseY}.jpg";
        public const int LaattaMaxTaso = 8;

        public static void LuoPallo()
        {
            var kohtaus = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            var georefGo = new GameObject("CesiumGeoreference");
            var georef = georefGo.AddComponent<CesiumGeoreference>();
            georef.originPlacement = CesiumGeoreferenceOriginPlacement.TrueOrigin;

            var palloGo = new GameObject("Pallo");
            palloGo.transform.SetParent(georefGo.transform, false);
            var pallo = palloGo.AddComponent<Cesium3DTileset>();
            pallo.tilesetSource = CesiumDataSource.FromEllipsoid;
            pallo.showCreditsOnScreen = false;

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
            merkit.fontti = AssetDatabase.LoadAssetAtPath<TMPro.TMP_FontAsset>(TmpFontti)
                ?? throw new Exception("TMP-fonttia ei löydy (aja.sh luo tuo sen): (" + TmpFontti + ")");

            var kameraGo = new GameObject("Kamera") { tag = "MainCamera" };
            var kamera = kameraGo.AddComponent<Camera>();
            kamera.clearFlags = CameraClearFlags.SolidColor;
            kamera.backgroundColor = new Color(0.10f, 0.08f, 0.06f);
            kamera.nearClipPlane = 10_000f;
            kamera.farClipPlane = 100_000_000f;
            kamera.fieldOfView = 40f;
            var kierto = kameraGo.AddComponent<PalloKierto>();
            kierto.georeferenssi = georef;
            merkit.kamera = kamera;
            var mittari = kameraGo.AddComponent<KehysMittari>();
            mittari.pallo = kierto;

            // Valo kulkee kameran mukana: näkyvä puolipallo on aina valaistu.
            var valoGo = new GameObject("Valo");
            valoGo.transform.SetParent(kameraGo.transform, false);
            valoGo.transform.localRotation = Quaternion.Euler(10f, -15f, 0f);
            var valo = valoGo.AddComponent<Light>();
            valo.type = LightType.Directional;
            valo.intensity = 1.1f;
            valo.color = new Color(1f, 0.97f, 0.9f);
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

        public const string TmpFontti = "Assets/TextMesh Pro/Resources/Fonts & Materials/LiberationSans SDF.asset";

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
            // Release-käännös: Development-tila hidastaa ja näyttää kehityskonsolin.
            EditorUserBuildSettings.development = false;
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

        /// <summary>Xcode-projekti laitteelle: Build/laite.</summary>
        public static void IosLaite()
        {
            AsetaIos(iOSSdkVersion.DeviceSDK);
            Kaanna("Build/laite");
        }
    }
}
