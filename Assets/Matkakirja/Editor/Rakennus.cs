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
            // Ei reikiä lataamattomien laattojen kohdalle (lennon lähikuva 24.9.: taivas näkyi maaston läpi):
            // vanhempi laatta pysyy, kunnes kaikki lapset ovat ladattuja.
            pallo.forbidHoles = true;
            // Oma tileset-materiaali: Cesiumin oletuskaavio + raster-paikkojen globaali alfa (huntu häivytetään zoomin
            // mukaan, Fable 24.9.). Kopio Cesiumin oletusmateriaalista (renderQueue, avainsanat), varjostin vaihdettu.
            pallo.opaqueMaterial = TilesetMateriaali();

            var kerros = palloGo.AddComponent<CesiumUrlTemplateRasterOverlay>();
            kerros.templateUrl = LaattaUrl;
            kerros.projection = CesiumUrlTemplateRasterOverlayProjection.WebMercator;
            kerros.minimumLevel = 0;
            kerros.maximumLevel = LaattaMaxTaso;
            kerros.tileWidth = 256;
            kerros.tileHeight = 256;

            var kannet = georefGo.AddComponent<NapaKannet>();
            kannet.georeferenssi = georef;
            // Materiaalit ovat varjostimen pohjia: NapaKannet asettaa värit ajossa (webin sävyt ×
            // laattojenSavy) ja kopioi kalottien materiaalit näistä.
            kannet.pohjoinen = KansiMateriaali("Napakansi-pohjoinen", NapaKannet.KansiPohjoinen);
            kannet.etela = KansiMateriaali("Napakansi-etela", NapaKannet.KansiEtela);

            var merkit = georefGo.AddComponent<KaupunkiMerkit>();
            merkit.georeferenssi = georef;
            merkit.pisteMateriaali = Materiaali("Kaupunkipiste", "Matkakirja/Piste", new Color32(0x3b, 0x2f, 0x22, 0xff));
            merkit.fontti = Fontti();
            // Aloitusvalinnan huomiorengas: web .pallolauta-huomio, --kulta #eab84e.
            merkit.rengasMateriaali = Materiaali("Kaupunkirengas", "Matkakirja/Rengas", new Color32(0xea, 0xb8, 0x4e, 0xff));

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
            var varitaso = georefGo.AddComponent<Varitaso>();
            varitaso.pallo = pallo;
            kerrokset.varitaso = varitaso;
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
            // Pelaajan maan ääriviiva (löydös 2, osa 3): webin korostuskehä, sama maa kuin väritasolla.
            var maaraja = georefGo.AddComponent<Maaraja>();
            maaraja.georeferenssi = georef;
            maaraja.varitaso = varitaso;
            maaraja.materiaali = maakunnat.rajaMateriaali;
            kerrokset.maaraja = maaraja;
            var nappula = georefGo.AddComponent<Nappula>();
            nappula.georeferenssi = georef;
            nappula.materiaali = Materiaali("Nappula", "Matkakirja/Nappula", Color.white);
            kerrokset.nappula = nappula;
            nappula.koneMalli = AssetDatabase.LoadAssetAtPath<GameObject>("Assets/Matkakirja/Kartta/Malli/DC3.fbx");
            // Kone: yksi 4K-atlas (albedo, normaali, maski; ELOKUVALLINEN ALOITUSLENTO erä 1, 24.9.2026).
            // Punainen raita (#9a3b2c) on atlaksessa; KoneRaita jää vain vanhan mallin "Raita"-osalle.
            nappula.koneMateriaali = KoneMateriaali();
            nappula.raitaMateriaali = Materiaali("KoneRaita", "Universal Render Pipeline/Lit", new Color32(0x9a, 0x3b, 0x2c, 0xff));
            // Lasi: tumma, heijastava (taivaan heijastus tulee heijastusluotaimesta, erä 3).
            nappula.ikkunaMateriaali = Materiaali("KoneIkkuna", "Universal Render Pipeline/Lit", new Color(0.025f, 0.03f, 0.035f));
            nappula.ikkunaMateriaali.SetFloat("_Metallic", 0.25f);
            nappula.ikkunaMateriaali.SetFloat("_Smoothness", 0.95f);
            nappula.kiekkoMateriaali = Materiaali("PotkuriKiekko", "Matkakirja/PotkuriKiekko", new Color(0.30f, 0.31f, 0.33f));
            // MAAMERKIT (omistajan kortti 24.9.): kaupunkien 3D-tunnusrakennukset, Kartta/Maamerkit/LUE.md.
            var maamerkit = georefGo.AddComponent<Maamerkit>();
            maamerkit.georeferenssi = georef;
            maamerkit.mallit = Maamerkit.Oletustaulukko()
                .Select(r => MaamerkkiMalli(r.id)).Where(m => m != null).ToArray();
            // Sisältöpaketin GLB-mallit kloonaavat tämän materiaalin (URP Lit pysyy buildissa).
            maamerkit.pohjaMateriaali = maamerkit.mallit.FirstOrDefault(m => m.id == "lontoo")?.materiaali
                                        ?? maamerkit.mallit.FirstOrDefault()?.materiaali;
            nappula.maamerkit = maamerkit;
            var savuGo = new GameObject("Savujana");
            savuGo.transform.SetParent(georefGo.transform, false);
            nappula.savu = savuGo.AddComponent<Savujana>();
            nappula.savu.georeferenssi = georef;
            nappula.savu.materiaali = Materiaali("Savu", "Matkakirja/Savu", Color.white);
            // Lähtösumu ja pilvimeri (LENNON PINTA, omistaja 24.9. klo 13.5x).
            var usvaGo = new GameObject("Usvalevy");
            usvaGo.transform.SetParent(georefGo.transform, false);
            nappula.usva = usvaGo.AddComponent<Usvalevy>();
            nappula.usva.georeferenssi = georef;
            nappula.usva.materiaali = Materiaali("Usva", "Matkakirja/Usva", new Color(0.93f, 0.94f, 0.96f));
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
            // Aloitusportin sumennus (web .start-gate blur 6px, löydös 17): materiaali vie shaderin käännökseen.
            kierto.sumennusMateriaali = Materiaali("Sumennus", "Matkakirja/Sumennus", Color.white);
            merkit.kamera = kamera;
            merkit.kierto = kierto;
            // Siirtokohteet kartalla (web vaihe 'move', Pelikoodarin tilaus 24.9.): PeliOhjain syöttää kohteet.
            var siirtokohteet = georefGo.AddComponent<Siirtokohdemerkit>();
            siirtokohteet.georeferenssi = georef;
            siirtokohteet.kamera = kamera;
            siirtokohteet.kierto = kierto;
            siirtokohteet.fontti = merkit.fontti;
            siirtokohteet.materiaali = Materiaali("Siirtokohde", "Matkakirja/Kohdemerkki", Color.white);
            // Aloitusvalinnan kohdemerkit (web kohdeElementti huomio: true) samalla varjostimella ja materiaalilla.
            merkit.kohdemerkkiMateriaali = siirtokohteet.materiaali;
            maaraja.kierto = kierto;
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
            // Alue-, meri- ja valtamerinimet maahan painettuina (löydös 38, build 11). Fontit: Liberation Serif
            // (Fable 24.9.2026) SDF-assetteina, kun ne on tehty; puuttuessa natiivin serif (merkit.fontti) varalla.
            var nimet = georefGo.AddComponent<Nimikerros>();
            nimet.georeferenssi = georef;
            nimet.kamera = kamera;
            nimet.kierto = kierto;
            nimet.merkit = merkit;
            nimet.nappula = nappula;
            nimet.fonttiPysty = Fontti(NimiTtfPysty, NimiFonttiPysty, "LiberationSerif-Regular SDF");
            nimet.fonttiKursiivi = Fontti(NimiTtfKursiivi, NimiFonttiKursiivi, "LiberationSerif-Italic SDF");
            // ZTest Always kuten Rajaviiva: maahan painettu teksti ei jää korotetun maaston alle. Viite vie varjostimen käännökseen.
            nimet.varjostin = Shader.Find("TextMeshPro/Distance Field Overlay");
            nimet.aaltoMateriaali = Materiaali("Aaltomerkki", "Matkakirja/Rajaviiva", new Color(58 / 255f, 66 / 255f, 84 / 255f, 0.62f));

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
            // Filmiefektipino (elokuvalento erä 3): profiili assetiksi, jottei URP karsi jälkikäsittelyvariantteja.
            var pino = kameraGo.AddComponent<Filmipino>();
            pino.kamera = kamera;
            var pinoGo = new GameObject("Filmipino");
            var volyymi = pinoGo.AddComponent<UnityEngine.Rendering.Volume>();
            volyymi.isGlobal = true;
            volyymi.priority = 10;
            volyymi.weight = 0f;
            volyymi.sharedProfile = FilmipinoProfiili();
            pino.volyymi = volyymi;
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

        /// <summary>Aluenimien fontit (Nimikerros.fonttiPysty ja fonttiKursiivi): Liberation Serif SDF, kun Natiiviseppä on ne tehnyt.</summary>
        public const string NimiFonttiPysty = "Assets/Matkakirja/Fontit/LiberationSerif-Regular SDF.asset";
        public const string NimiFonttiKursiivi = "Assets/Matkakirja/Fontit/LiberationSerif-Italic SDF.asset";
        /// <summary>Liberation Serif 2.1.5 (SIL OFL 1.1, Fontit/LiberationSerif-OFL.txt; lähde ja SHA-256 Fontit/LiberationSerif-LAHDE.txt).</summary>
        public const string NimiTtfPysty = "Assets/Matkakirja/Fontit/LiberationSerif-Regular.ttf";
        public const string NimiTtfKursiivi = "Assets/Matkakirja/Fontit/LiberationSerif-Italic.ttf";

        public const string FonttiTiedosto = "Assets/Matkakirja/Fontit/EBGaramond.ttf";
        public const string FonttiAsset = "Assets/Matkakirja/Fontit/EBGaramond SDF.asset";

        /// <summary>
        /// EB Garamond (OFL, Fontit/OFL.txt) TextMeshPro-fonttina. Atlas täyttyy
        /// dynaamisesti ajossa, joten kaikki nimien merkit (á ä é ö š ž ’) toimivat.
        /// </summary>
        static TMPro.TMP_FontAsset Fontti() => Fontti(FonttiTiedosto, FonttiAsset, "EBGaramond SDF")
            ?? throw new Exception("Fonttia ei löydy: " + FonttiTiedosto);

        /// <summary>TTF → dynaaminen SDF-asset (luodaan kerran; null, jos TTF puuttuu).</summary>
        static TMPro.TMP_FontAsset Fontti(string ttfPolku, string assetPolku, string nimi)
        {
            var olemassa = AssetDatabase.LoadAssetAtPath<TMPro.TMP_FontAsset>(assetPolku);
            if (olemassa != null) return olemassa;
            var ttf = AssetDatabase.LoadAssetAtPath<Font>(ttfPolku);
            if (ttf == null) return null;
            var fa = TMPro.TMP_FontAsset.CreateFontAsset(ttf, 90, 9,
                UnityEngine.TextCore.LowLevel.GlyphRenderMode.SDFAA, 1024, 1024,
                TMPro.AtlasPopulationMode.Dynamic, true);
            fa.name = nimi;
            AssetDatabase.CreateAsset(fa, assetPolku);
            fa.material.name = nimi + " Material";
            AssetDatabase.AddObjectToAsset(fa.material, fa);
            foreach (var t in fa.atlasTextures) { t.name = nimi + " Atlas"; AssetDatabase.AddObjectToAsset(t, fa); }
            AssetDatabase.SaveAssets();
            return AssetDatabase.LoadAssetAtPath<TMPro.TMP_FontAsset>(assetPolku);
        }

        static Material Viiva(string nimi, Color vari, float paksuus, Vector4 katko)
        {
            var m = Materiaali(nimi, "Matkakirja/Viiva", vari);
            m.SetFloat("_Paksuus", paksuus);
            m.SetVector("_Katko", katko);
            EditorUtility.SetDirty(m);
            return m;
        }

        static Material TilesetMateriaali()
        {
            const string polku = "Assets/Matkakirja/Materiaalit/Pallo.mat";
            var varjostin = Shader.Find("Matkakirja/MatkakirjaTileset");
            if (varjostin == null) { Debug.LogWarning("MATKAKIRJA rakennus: MatkakirjaTileset puuttuu, Cesiumin oletus"); return null; }
            var oletus = AssetDatabase.LoadAssetAtPath<Material>(
                "Packages/com.cesium.unity/Source/Runtime/Resources/CesiumDefaultTilesetMaterial.mat");
            var m = oletus != null ? new Material(oletus) : new Material(varjostin);
            m.shader = varjostin;
            if (oletus != null) m.renderQueue = oletus.renderQueue;
            AssetDatabase.DeleteAsset(polku);
            AssetDatabase.CreateAsset(m, polku);
            return AssetDatabase.LoadAssetAtPath<Material>(polku);
        }

        static Material KansiMateriaali(string nimi, Color vari) => Materiaali(nimi, "Matkakirja/Napakansi", vari);

        public const string MaamerkkiKansio = "Assets/Matkakirja/Kartta/Maamerkit";

        /// <summary>
        /// Maamerkin prefab (Maamerkit/&lt;id&gt;.fbx) ja URP Lit -materiaali atlaksella (Tekstuurit/&lt;id&gt;_vari.png,
        /// albedo + leivottu AO, sRGB). null, jos FBX puuttuu.
        /// </summary>
        static Maamerkit.Malli MaamerkkiMalli(string id)
        {
            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>($"{MaamerkkiKansio}/{id}.fbx");
            if (prefab == null) { Debug.LogWarning("MATKAKIRJA maamerkit: mallia ei löydy: " + id); return null; }
            var m = Materiaali("Maamerkki-" + id, "Universal Render Pipeline/Lit", Color.white);
            var atlas = AssetDatabase.LoadAssetAtPath<Texture2D>($"{MaamerkkiKansio}/Tekstuurit/{id}_vari.png");
            if (atlas != null) m.SetTexture("_BaseMap", atlas);
            else Debug.LogWarning("MATKAKIRJA maamerkit: atlasta ei löydy: " + id);
            m.SetFloat("_Metallic", 0f);
            m.SetFloat("_Smoothness", 0.15f);
            EditorUtility.SetDirty(m);
            return new Maamerkit.Malli { id = id, prefab = prefab, materiaali = m };
        }

        public const string KoneTekstuurit = "Assets/Matkakirja/Kartta/Malli/Tekstuurit/";

        /// <summary>
        /// DC-3:n atlasmateriaali (URP/Lit): _BaseMap = DC3_vari (sRGB), _BumpMap = DC3_normaali,
        /// _MetallicGlossMap = DC3_maski (R metallisuus, A sileys; G = peittävyys → myös _OcclusionMap).
        /// Ilman tekstuureja (esim. ennen tuontia) palataan vanhaan tasaiseen hopeaan.
        /// </summary>
        static Material KoneMateriaali()
        {
            var vari = AssetDatabase.LoadAssetAtPath<Texture2D>(KoneTekstuurit + "DC3_vari.png");
            var normaali = AssetDatabase.LoadAssetAtPath<Texture2D>(KoneTekstuurit + "DC3_normaali.png");
            var maski = AssetDatabase.LoadAssetAtPath<Texture2D>(KoneTekstuurit + "DC3_maski.png");
            if (vari == null || normaali == null || maski == null)
            {
                Debug.LogWarning("MATKAKIRJA rakennus: DC-3:n tekstuureja ei löydy, kone tasaisella hopealla");
                // Hopea mutta pergamenttia tummempi, jotta kone erottuu kartasta.
                var tasainen = Materiaali("Kone", "Universal Render Pipeline/Lit", new Color(0.55f, 0.57f, 0.60f));
                tasainen.SetFloat("_Metallic", 0.6f);
                tasainen.SetFloat("_Smoothness", 0.55f);
                return tasainen;
            }
            var m = Materiaali("Kone", "Universal Render Pipeline/Lit", Color.white);
            m.SetTexture("_BaseMap", vari);
            m.SetTexture("_MainTex", vari);
            m.SetTexture("_BumpMap", normaali);
            m.SetFloat("_BumpScale", 1f);
            m.EnableKeyword("_NORMALMAP");
            m.SetTexture("_MetallicGlossMap", maski);
            m.EnableKeyword("_METALLICSPECGLOSSMAP");
            m.SetFloat("_Metallic", 1f);
            m.SetFloat("_Smoothness", 1f);               // kartan A-kanavan kerroin
            m.SetFloat("_SmoothnessTextureChannel", 0f); // sileys metallikartan alfasta
            m.SetTexture("_OcclusionMap", maski);        // URP lukee peittävyyden G-kanavasta
            m.SetFloat("_OcclusionStrength", 1f);
            m.EnableKeyword("_OCCLUSIONMAP");
            EditorUtility.SetDirty(m);
            return m;
        }

        const string FilmipinoPolku = "Assets/Matkakirja/Asetukset/Filmipino.asset";

        /// <summary>
        /// Lennon jälkikäsittelyprofiili (Filmipino.cs). Arvot hillittyjä: filmin tuntu, ei suodinta. Syväterävyys
        /// on profiilissa pois päältä; Filmipino kytkee sen lähikuvassa ja asettaa etäisyydet.
        /// </summary>
        static UnityEngine.Rendering.VolumeProfile FilmipinoProfiili()
        {
            Directory.CreateDirectory(Path.GetDirectoryName(FilmipinoPolku));
            AssetDatabase.DeleteAsset(FilmipinoPolku);
            var p = ScriptableObject.CreateInstance<UnityEngine.Rendering.VolumeProfile>();
            AssetDatabase.CreateAsset(p, FilmipinoPolku);
            T Lisaa<T>() where T : UnityEngine.Rendering.VolumeComponent
            {
                var k = p.Add<T>(false);
                k.name = typeof(T).Name;
                AssetDatabase.AddObjectToAsset(k, p);
                return k;
            }
            var savy = Lisaa<UnityEngine.Rendering.Universal.Tonemapping>();
            savy.mode.Override(UnityEngine.Rendering.Universal.TonemappingMode.Neutral);
            var vari = Lisaa<UnityEngine.Rendering.Universal.ColorAdjustments>();
            vari.contrast.Override(8f);
            vari.saturation.Override(-6f);
            var valko = Lisaa<UnityEngine.Rendering.Universal.WhiteBalance>();
            valko.temperature.Override(7f);
            var jako = Lisaa<UnityEngine.Rendering.Universal.SplitToning>();
            jako.shadows.Override(new Color(0.46f, 0.52f, 0.58f));
            jako.highlights.Override(new Color(0.62f, 0.56f, 0.46f));
            var hehku = Lisaa<UnityEngine.Rendering.Universal.Bloom>();
            hehku.threshold.Override(0.95f);
            hehku.intensity.Override(0.3f);
            hehku.scatter.Override(0.6f);
            hehku.highQualityFiltering.Override(false);
            hehku.maxIterations.Override(5);
            var vinjetti = Lisaa<UnityEngine.Rendering.Universal.Vignette>();
            vinjetti.intensity.Override(0.24f);
            vinjetti.smoothness.Override(0.45f);
            var rae = Lisaa<UnityEngine.Rendering.Universal.FilmGrain>();
            rae.type.Override(UnityEngine.Rendering.Universal.FilmGrainLookup.Thin1);
            rae.intensity.Override(0.22f);
            rae.response.Override(0.8f);
            var syvyys = Lisaa<UnityEngine.Rendering.Universal.DepthOfField>();
            syvyys.mode.Override(UnityEngine.Rendering.Universal.DepthOfFieldMode.Gaussian);
            syvyys.highQualitySampling.Override(false);
            syvyys.active = false;
            EditorUtility.SetDirty(p);
            AssetDatabase.SaveAssets();
            return AssetDatabase.LoadAssetAtPath<UnityEngine.Rendering.VolumeProfile>(FilmipinoPolku);
        }

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
            // Tiimi MATKAKIRJA_TEAM-ympäristömuuttujasta (Fable 24.9.2026: kehityskäännökset maksulliseen
            // Developer Program -tiimiin RCD77XPB7M, samireivinen@me.com; Personal Team F72JLS57C5 pois kokonaan).
            var tiimi = Environment.GetEnvironmentVariable("MATKAKIRJA_TEAM");
            PlayerSettings.iOS.appleDeveloperTeamID = string.IsNullOrEmpty(tiimi) ? Tiimi : tiimi;
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
            // Laitteen kehityskäännös omalla App ID:llä maksullisessa tiimissä (omistaja 24.9.2026): erillinen appi
            // TestFlightin fi.matkakirja.peli -version rinnalla. app.matkakirja.proto3d kuuluu Personal Teamille eikä
            // rekisteröidy maksulliseen tiimiin; simulaattorikäännökset (ei allekirjoitusta) pitävät sen.
            PlayerSettings.SetApplicationIdentifier(UnityEditor.Build.NamedBuildTarget.iOS, LaiteBundleId);
            bool kehitys = Environment.GetEnvironmentVariable("MATKAKIRJA_KEHITYS") == "1";
            Kaanna("Build/laite", kehitys ? BuildOptions.Development : BuildOptions.None);
        }

        /// <summary>Omistajan Developer Program -tiimi (samireivinen@me.com; TestFlight ja kehityskäännökset).</summary>
        const string Tiimi = "RCD77XPB7M";
        /// <summary>Laitteen kehityskäännöksen App ID (tyokalut/ipad.sh ID).</summary>
        const string LaiteBundleId = "fi.matkakirja.peli.kehitys";

        /// <summary>
        /// Xcode-projekti TestFlightiin: Build/testflight (Julkaisija arkistoi ja lähettää
        /// pilviallekirjoituksella). Ympäristömuuttujat:
        ///   MATKAKIRJA_BUNDLE_ID  (oletus app.matkakirja.proto3d)
        ///   MATKAKIRJA_TEAM       tiimin Team ID (oletus Developer Program -tiimi <see cref="Tiimi"/>)
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
            PlayerSettings.iOS.appleDeveloperTeamID = Ymp("MATKAKIRJA_TEAM", Tiimi);
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

        /// <summary>
        /// Radion VU-mittari (MatkakirjaRadio.mm: MTAudioProcessingTap) tarvitsee MediaToolbox-kehyksen,
        /// jota Unityn iOS-projekti ei linkitä oletuksena.
        /// </summary>
        [UnityEditor.Callbacks.PostProcessBuild(195)]
        static void Kehykset(BuildTarget kohde, string polku)
        {
            if (kohde != BuildTarget.iOS) return;
            string projektiPolku = UnityEditor.iOS.Xcode.PBXProject.GetPBXProjectPath(polku);
            var projekti = new UnityEditor.iOS.Xcode.PBXProject();
            projekti.ReadFromFile(projektiPolku);
            projekti.AddFrameworkToProject(projekti.GetUnityFrameworkTargetGuid(), "MediaToolbox.framework", false);
            projekti.WriteToFile(projektiPolku);
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

    /// <summary>
    /// DC-3:n tekstuurien tuontiasetukset nimen perusteella (Malli/Tekstuurit/): 4K, mipit, anisotropia;
    /// *_normaali = NormalMap, *_maski = lineaarinen (sRGB pois, alfa kartasta), *_vari = sRGB ilman alfaa.
    /// Ajetaan jokaisessa tuonnissa, joten .meta-tiedostoon ei tarvitse asettaa mitään käsin.
    /// </summary>
    sealed class KoneTekstuurienTuonti : AssetPostprocessor
    {
        void OnPreprocessTexture()
        {
            if (!assetPath.StartsWith(Rakennus.KoneTekstuurit)) return;
            var ti = (TextureImporter)assetImporter;
            string nimi = Path.GetFileNameWithoutExtension(assetPath);
            ti.maxTextureSize = 4096;
            ti.mipmapEnabled = true;
            ti.anisoLevel = 4;
            ti.filterMode = FilterMode.Trilinear;
            ti.wrapMode = TextureWrapMode.Clamp;
            if (nimi.EndsWith("_normaali"))
            {
                ti.textureType = TextureImporterType.NormalMap;
                ti.sRGBTexture = false;
            }
            else if (nimi.EndsWith("_maski"))
            {
                ti.textureType = TextureImporterType.Default;
                ti.sRGBTexture = false;
                ti.alphaSource = TextureImporterAlphaSource.FromInput;
                ti.alphaIsTransparency = false;
            }
            else
            {
                ti.textureType = TextureImporterType.Default;
                ti.sRGBTexture = true;
                ti.alphaSource = TextureImporterAlphaSource.None;
            }
        }
    }
}
