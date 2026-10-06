// KAUPUNKIKUVAN PARANNUKSET (omistaja ja Päätoimittaja 5.10.2026, juna 144; Siirtoseppä Linssisepän CesiumKaupunki-koukuilla).
// Vain Cesium-kaupunkinäkymän ajaksi (CesiumKaupunki.Avattu → Suljettu), joten pallo, linna ja muut linssit eivät muutu:
//  - terävyys: tilesetien maximumScreenSpaceError pienemmäksi (Google pysyy 16:ssa: muistikatto, Päätoimittaja 5.10. 19.0x; maasto 10, OSM 16) (asetin luo tilesetin uudelleen → vain Avattu-kutsussa),
//    anisotrooppinen suodatus (ForceEnable, raja 8–16) ja MSAA 4x (URP-assetti + kameran allowMSAA), palautus sulkiessa;
//  - korkeussumu ja ilmaperspektiivi: lineaarinen RenderSettings-sumu taivaan sävyyn (vain FOG_LINEAR säilyy buildissa, ks.
//    Aurinko.cs SUMUVARIANTIT), etäisyys kameran korkeuden mukaan; asetetaan joka ruutu Aurinko.LateUpdaten JÄLKEEN
//    (DefaultExecutionOrder), koska Aurinko kirjoittaa sumun itse; arvot tallennetaan ja palautetaan;
//  - taivas: kameran taustaväri (CesiumKaupunki.Taivas) ja sumu samaan horisonttisävyyn, yläosa hieman sinisempi ei mahdollinen
//    SolidColorilla → sumu hoitaa horisontin;
//  - URP Volume: oma globaali profiili (Neutral-tonemappaus kuten linnassa, hillitty bloom), ei SSAO:ta (URP:ssa renderer-
//    ominaisuus, maksaa iPadilla), ei tilt-shiftiä. Kameran jälkikäsittely päälle näkymän ajaksi.
// Googlen kuvasisältöä ei muuteta (vain suodatus, näytteistys ja sumu). A/B: Documents/kaupunki-kuva-pois.txt (tai Paalla = false) → alkuperäinen.
//
// VUOROKAUDENAIKA JA TAIVAS (omistaja 6.10. 14.4x, Päätoimittaja: a = utu + gradienttitaivas, b = vuorokaudenajan värimaailma,
// junaan 150; Linssiseppä tekee, Siirtoseppä katselmoi): kohteen paikallinen aurinkoaika (Ydin Vuorokausi) → URP WhiteBalance +
// ColorAdjustments (valotus, suodin, kontrasti, saturaatio; ei tonemappausta: Neutral latisti kuvan), horisontin utu (vain
// kaukana: sumu alkaa 15 × kameran korkeus / 3 km) ja taivaskupoli liukuvärinä (DioraamaTaivas-varjostin, horisontti = udun
// väri, aamulla ja illalla auringon puolella kajo). Bloom vain jos Hehku > 0 (iPad-muistimittaus ensin). Viritys:
// "vuorokausi 0|1 tunti 7.5 kupoli 0|1" asetustiedostossa (tunti = paikallinen aurinkotunti, oletus nykyhetki).
using CesiumForUnity;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiKuva
    {
        /// <summary>A/B: false = Linssisepän alkuperäinen kaupunkikuva (vaikuttaa seuraavaan avaukseen).</summary>
        public static bool Paalla = true;
        // Linssiseppä 5.10. 18.5x: SSE 8 + MSAA 4x nosti simun RSS:n (Google) 7,7 Gt:iin → Google 12. Viritys ilman käännöstä:
        // Documents/kaupunki-kuva-asetukset.txt "google 16 msaa 4 sumu 1 sumualku 15 sumuloppu 80 sumualkumin 3000 sumuloppumin 15000 volume 1 savytys 1 kontrasti 12 saturaatio 10 hehku 0.2".
        public static float GoogleSse = 16f, MaastoSse = 10f, RakennusSse = 16f;
        public static int Msaa = 4;
        /// <summary>Sumun alku ja loppu kameran korkeuden kerrannaisina (vähintään AlkuMinM / LoppuMinM metriä).</summary>
        // A/B 5.10. 18.59: alku 6 × korkeus / 1,2 km haalisti koko Raatihuoneen kuvan → sumu vasta kauempana (horisontti).
        public static float AlkuKerroin = 15f, LoppuKerroin = 80f, AlkuMinM = 3000f, LoppuMinM = 15000f;
        // JUNAN OLETUS (Päätoimittajan sääntö 5.10. 19.1x): vain MSAA + aniso, kunnes kuvapari näyttää utu-, Volume-, vuorokausi-
        // ja kupolikuvan selvästi paremmiksi ja Päätoimittaja kuittaa (juna 150: kuvaparit aamu/päivä/ilta/yö + iPad-muisti);
        // viritys asetustiedostolla ("sumu 1 volume 1 vuorokausi 1 kupoli 1"). Ei tonemappausta (Neutral latisti kuvan).
        public static bool Sumu = false, Savytys = false, Volyymi = false, VuorokausiPaalla = false, Kupoli = false;
        public static float Kontrasti = 12f, Saturaatio = 10f, Hehku = 0f, Tunti = -1f;
        /// <summary>Terävöitys 0–1 (KaupunkiTerava, kuvanlaatulista kohta 1; oletus pois kuvapariin ja iPad-mittaukseen asti).</summary>
        public static float Terava = 0f;

        // ---- VUOROKAUDENAJAN VALINTA (omistaja 6.10. 19.0x, Natiivi-UI:n nappi vasemmassa yläkulmassa; juna 152) ----
        /// <summary>Pelaajan valinta: "auto" (kohteen oma aurinko), "aamu", "paiva", "ilta" ("yo" myöhemmin valojen kanssa).
        /// Pysyy, kunnes vaihdetaan (myös seuraavissa avauksissa). Vaihto näkyy heti seuraavassa kehyksessä ilman uudelleenlatausta.</summary>
        public static string Valinta
        {
            get => valinta;
            set
            {
                var v = value == "aamu" || value == "paiva" || value == "ilta" ? value : "auto";
                if (v == valinta) return;
                valinta = v;
                Debug.Log($"MATKAKIRJA kaupunki: vuorokausi valittu {v}");
                Vaihtui?.Invoke(v);
            }
        }
        static string valinta = "auto";
        /// <summary>Valinta tai voimassa oleva tila vaihtui (UI päivittää napin kuvakkeen).</summary>
        public static event System.Action<string> Vaihtui;
        /// <summary>Voimassa oleva tila "aamu" | "paiva" | "ilta" | "yo" (automaattisessa kohteen oman ajan mukaan).</summary>
        public static string Nyt { get; private set; } = "paiva";
        /// <summary>Valinnan tunti (aamu 7, päivä 12, ilta 18.30); −1 = automaattinen.</summary>
        internal static float ValinnanTunti => valinta == "aamu" ? 7f : valinta == "paiva" ? 12f : valinta == "ilta" ? 18.5f : -1f;
        /// <summary>Pakotettu tunti: asetustiedosto ensin (kuvaparit), sitten pelaajan valinta; −1 = auringon mukaan.</summary>
        internal static float TuntiNyt => Tunti >= 0 ? Tunti : ValinnanTunti;
        /// <summary>Sävytys käytössä: asetus tai pelaajan oma valinta (nappi kytkee sävyn päälle, vaikka oletus odottaa kuittausta).</summary>
        internal static bool SavyKaytossa => VuorokausiPaalla || valinta != "auto";
        internal static void AsetaNyt(string tila) { if (tila != Nyt) { Nyt = tila; Vaihtui?.Invoke(tila); } }

        /// <summary>Volume ja jälkikäsittely myöhemmin (pelaaja valitsi vuorokaudenajan kesken näkymän, Volume ei ollut päällä).</summary>
        internal static void VarmistaVolyymi(Camera kamera)
        {
            if (volyymiGo != null || kamera == null) return;
            var lisa = kamera.GetUniversalAdditionalCameraData();
            if (lisa != null) lisa.renderPostProcessing = true;
            LuoVolyymi();
        }
        internal static ColorAdjustments varit;
        internal static WhiteBalance valko;
        internal static SplitToning jako;

        static KaupunkiKuvaAjo ajo;
        static GameObject volyymiGo;
        static VolumeProfile profiili;
        // palautettavat
        static AnisotropicFiltering vanhaAniso;
        static int vanhaMsaa = -1;
        static bool vanhaAllowMsaa, vanhaJalki, tallennettu;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Rekisteroi()
        {
            CesiumKaupunki.Avattu -= Avattu; CesiumKaupunki.Avattu += Avattu;
            CesiumKaupunki.Suljettu -= Suljettu; CesiumKaupunki.Suljettu += Suljettu;
        }

        static void Avattu(CesiumKaupunki k)
        {
            // A/B ilman komentoa (LinssiOhjain on Linssisepän): Documents/kaupunki-kuva-pois.txt → alkuperäinen kuva.
            bool pois = System.IO.File.Exists(System.IO.Path.Combine(Application.persistentDataPath, "kaupunki-kuva-pois.txt"));
            if (!Paalla || pois || k?.Kamera == null) { if (pois) Debug.Log("MATKAKIRJA kaupunki: kuva pois (A/B)"); return; }
            LueAsetukset();
            // Avattu laukeaa myös Google → Ion -vaihdon jälkeen: tilesetit ovat uusia, muut asetukset jo voimassa.
            Sse(k.Pinta, k.Kaytossa == CesiumKaupunki.Lahde.Google ? GoogleSse : MaastoSse);
            Sse(k.Rakennukset, RakennusSse);
            if (tallennettu) return;
            tallennettu = true;
            var kamera = k.Kamera;

            vanhaAniso = QualitySettings.anisotropicFiltering;
            QualitySettings.anisotropicFiltering = AnisotropicFiltering.ForceEnable;
            Texture.SetGlobalAnisotropicFilteringLimits(8, 16);

            if (Msaa > 1 && GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp)
            { vanhaMsaa = urp.msaaSampleCount; urp.msaaSampleCount = Msaa; }
            vanhaAllowMsaa = kamera.allowMSAA; kamera.allowMSAA = true;
            var lisa = kamera.GetUniversalAdditionalCameraData();
            if (lisa != null) { vanhaJalki = lisa.renderPostProcessing; if (Volyymi) lisa.renderPostProcessing = true; }

            if (Volyymi) LuoVolyymi();
            ajo = new GameObject("KaupunkiKuva").AddComponent<KaupunkiKuvaAjo>();
            ajo.Aloita(k);
            Debug.Log($"MATKAKIRJA kaupunki: kuva päällä (SSE {(k.Kaytossa == CesiumKaupunki.Lahde.Google ? GoogleSse : MaastoSse)}/{RakennusSse}, MSAA {Msaa}x, aniso 8–16, sumu {(Sumu ? $"{AlkuKerroin}×/{AlkuMinM} m–{LoppuKerroin}×/{LoppuMinM} m" : "pois")}, {(!Volyymi ? "ei Volumea" : Savytys ? "Neutral" : "ei sävytystä")}, kontrasti {Kontrasti}, saturaatio {Saturaatio}, hehku {Hehku})");
        }

        static void Suljettu(CesiumKaupunki k)
        {
            if (!tallennettu) return;
            tallennettu = false;
            GoogleSse = 16f; MaastoSse = 10f; RakennusSse = 16f; Msaa = 4; // asetustiedosto luetaan uudelleen seuraavassa avauksessa
            AlkuKerroin = 15f; LoppuKerroin = 80f; AlkuMinM = 3000f; LoppuMinM = 15000f; Sumu = false; Savytys = false; Volyymi = false;
            Kontrasti = 12f; Saturaatio = 10f; Hehku = 0f; VuorokausiPaalla = false; Kupoli = false; Tunti = -1f; asetuksetMuokattu = default;
            Terava = 0f; KaupunkiTerava.Pois();
            varit = null; valko = null; jako = null;
            if (ajo != null) { ajo.Lopeta(); Object.Destroy(ajo.gameObject); ajo = null; }
            QualitySettings.anisotropicFiltering = vanhaAniso;
            Texture.SetGlobalAnisotropicFilteringLimits(-1, -1);
            if (vanhaMsaa > 0 && GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) urp.msaaSampleCount = vanhaMsaa;
            vanhaMsaa = -1;
            if (k?.Kamera != null)
            {
                k.Kamera.allowMSAA = vanhaAllowMsaa;
                var lisa = k.Kamera.GetUniversalAdditionalCameraData();
                if (lisa != null) lisa.renderPostProcessing = vanhaJalki;
            }
            if (volyymiGo != null) Object.Destroy(volyymiGo);
            if (profiili != null) Object.Destroy(profiili);
            volyymiGo = null; profiili = null;
            Debug.Log("MATKAKIRJA kaupunki: kuva palautettu");
        }

        static System.DateTime asetuksetMuokattu;

        /// <summary>Asetustiedosto; muuttumaton = true (Siirtosepän katselmointi: ei turhaa lukua joka sekunti, vain muokattuna).</summary>
        internal static bool LueAsetukset(bool vainMuuttunut = false)
        {
            try
            {
                var polku = System.IO.Path.Combine(Application.persistentDataPath, "kaupunki-kuva-asetukset.txt");
                if (!System.IO.File.Exists(polku)) return false;
                var aika = System.IO.File.GetLastWriteTimeUtc(polku);
                if (vainMuuttunut && aika == asetuksetMuokattu) return false;
                asetuksetMuokattu = aika;
                var o = System.IO.File.ReadAllText(polku).Split((char[])null, System.StringSplitOptions.RemoveEmptyEntries);
                for (int i = 0; i + 1 < o.Length; i += 2)
                {
                    if (!float.TryParse(o[i + 1], System.Globalization.NumberStyles.Float, System.Globalization.CultureInfo.InvariantCulture, out var v)) continue;
                    switch (o[i])
                    {
                        case "google": GoogleSse = v; break;
                        case "maasto": MaastoSse = v; break;
                        case "rakennus": RakennusSse = v; break;
                        case "msaa": Msaa = (int)v; break;
                        case "sumu": Sumu = v != 0; break;
                        case "sumualku": AlkuKerroin = v; break;
                        case "sumuloppu": LoppuKerroin = v; break;
                        case "sumualkumin": AlkuMinM = v; break;
                        case "sumuloppumin": LoppuMinM = v; break;
                        case "savytys": Savytys = v != 0; break;
                        case "volume": Volyymi = v != 0; break;
                        case "kontrasti": Kontrasti = v; break;
                        case "saturaatio": Saturaatio = v; break;
                        case "hehku": Hehku = v; break;
                        case "vuorokausi": VuorokausiPaalla = v != 0; break;
                        case "tunti": Tunti = v; break;
                        case "kupoli": Kupoli = v != 0; break;
                        case "terava": Terava = v; KaupunkiTerava.Aseta(v); break;
                    }
                }
                return true;
            }
            catch (System.Exception) { return false; }
        }

        static void Sse(Cesium3DTileset t, float sse)
        {
            if (t != null && t.maximumScreenSpaceError > sse) t.maximumScreenSpaceError = sse;
        }

        static void LuoVolyymi()
        {
            volyymiGo = new GameObject("KaupunkiKuva Volume");
            var v = volyymiGo.AddComponent<Volume>();
            v.isGlobal = true;
            v.priority = 60;
            profiili = ScriptableObject.CreateInstance<VolumeProfile>();
            profiili.name = "KaupunkiKuvaProfiili";
            var savy = profiili.Add<Tonemapping>(true);
            savy.mode.Override(Savytys ? TonemappingMode.Neutral : TonemappingMode.None); // Neutral kuten linnassa (Filmipino.asset)
            if (Hehku > 0f)   // bloom maksaa iPadilla koko ruudun passeja: vain asetuksella
            {
                var bloom = profiili.Add<Bloom>(true);
                bloom.threshold.Override(1.1f);
                bloom.intensity.Override(Hehku);
                bloom.scatter.Override(0.6f);
            }
            varit = profiili.Add<ColorAdjustments>(true);
            varit.contrast.Override(Kontrasti);
            varit.saturation.Override(Saturaatio);
            varit.postExposure.Override(0f);
            varit.colorFilter.Override(Color.white);
            valko = profiili.Add<WhiteBalance>(true);
            valko.temperature.Override(0f);
            valko.tint.Override(0f);
            // Lämmin valo, viileämmät varjot (Päätoimittaja 19.3x: ilta näytti tasaiselta oranssilta suodattimelta).
            jako = profiili.Add<SplitToning>(true);
            jako.shadows.Override(Color.gray); jako.highlights.Override(Color.gray); jako.balance.Override(10f);
            v.profile = profiili;
        }
    }

    /// <summary>Joka ruutu Aurinko.LateUpdaten jälkeen: korkeussumu taivaan sävyyn. Palauttaa sumun sulkiessa.</summary>
    [DefaultExecutionOrder(5000)]
    public sealed class KaupunkiKuvaAjo : MonoBehaviour
    {
        CesiumKaupunki kaupunki;
        bool vanhaSumu; FogMode vanhaMoodi; Color vanhaVari, vanhaTausta; float vanhaAlku, vanhaLoppu;
        GameObject kupoli; Material kupoliMat; Mesh kupoliMesh;
        float edellinenLoki = -999f, luettu;
        static readonly int IdHorisontti = Shader.PropertyToID("_TaivasHorisontti"), IdLaki = Shader.PropertyToID("_TaivasLaki"),
            IdKajo = Shader.PropertyToID("_TaivasKajo"), IdAurinko = Shader.PropertyToID("_TaivasAurinko"), IdParam = Shader.PropertyToID("_TaivasParam");

        public void Aloita(CesiumKaupunki k)
        {
            kaupunki = k;
            vanhaSumu = RenderSettings.fog; vanhaMoodi = RenderSettings.fogMode; vanhaVari = RenderSettings.fogColor;
            vanhaAlku = RenderSettings.fogStartDistance; vanhaLoppu = RenderSettings.fogEndDistance;
            vanhaTausta = k.Kamera != null ? k.Kamera.backgroundColor : Color.black;
        }

        public void Lopeta()
        {
            RenderSettings.fog = vanhaSumu; RenderSettings.fogMode = vanhaMoodi; RenderSettings.fogColor = vanhaVari;
            RenderSettings.fogStartDistance = vanhaAlku; RenderSettings.fogEndDistance = vanhaLoppu;
            if (kaupunki?.Kamera != null) kaupunki.Kamera.backgroundColor = vanhaTausta;
            if (kupoli != null) Destroy(kupoli);
            if (kupoliMat != null) Destroy(kupoliMat);
            if (kupoliMesh != null) Destroy(kupoliMesh);
        }

        /// <summary>Taivaskupoli (DioraamaTaivas-varjostin, Background-jono ilman syvyyskirjoitusta): piirtyy ensin, laatat sen päälle.
        /// Kaupungin kerroksella 15, koska pääkamera piirtää kaupunkinäkymässä vain sen.</summary>
        void LuoKupoli()
        {
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaTaivas");
            if (varjostin == null) { Debug.Log("MATKAKIRJA kaupunki: taivasvarjostin puuttuu, kupoli pois"); return; }
            kupoliMat = new Material(varjostin) { name = "KaupunkiKuva:taivas" };
            const int S = 32, K = 16;
            var p = new System.Collections.Generic.List<Vector3>(); var t = new System.Collections.Generic.List<int>();
            for (int k = 0; k <= K; k++)
            {
                float fi = Mathf.PI * k / K - Mathf.PI * 0.5f;
                for (int s = 0; s <= S; s++)
                {
                    float th = 2f * Mathf.PI * s / S;
                    p.Add(new Vector3(Mathf.Cos(fi) * Mathf.Sin(th), Mathf.Sin(fi), Mathf.Cos(fi) * Mathf.Cos(th)));
                }
            }
            for (int k = 0; k < K; k++)
                for (int s = 0; s < S; s++)
                {
                    int a = k * (S + 1) + s, b = a + S + 1;
                    t.Add(a); t.Add(b); t.Add(a + 1); t.Add(a + 1); t.Add(b); t.Add(b + 1);
                }
            kupoliMesh = new Mesh { name = "KaupunkiKuva:kupoli" };
            kupoliMesh.SetVertices(p); kupoliMesh.SetTriangles(t, 0);
            kupoliMesh.bounds = new Bounds(Vector3.zero, Vector3.one * 1e6f);   // ei koskaan karsita
            kupoli = new GameObject("KaupunkiKuva taivas") { layer = CesiumKaupunki.Kerros };
            kupoli.AddComponent<MeshFilter>().sharedMesh = kupoliMesh;
            var mr = kupoli.AddComponent<MeshRenderer>();
            mr.sharedMaterial = kupoliMat;
            mr.shadowCastingMode = ShadowCastingMode.Off; mr.receiveShadows = false;
        }

        void LateUpdate()
        {
            var kamera = kaupunki?.Kamera;
            if (kamera == null) return;
            var georef0 = kaupunki.Georef;
            // Kuvaparit ilman uudelleenavausta: asetustiedosto luetaan sekunnin välein (tunti, vuorokausi, sumu, kontrasti …).
            if (Time.realtimeSinceStartup - luettu > 1f) { luettu = Time.realtimeSinceStartup; KaupunkiKuva.LueAsetukset(true); }
            // Vuorokaudenaika kohteen paikallisesta aurinkoajasta (tai asetuksen tunnista).
            double lon = georef0 != null ? georef0.longitude : 0, lat = georef0 != null ? georef0.latitude : 0;
            float pakko = KaupunkiKuva.TuntiNyt;
            double tunti = pakko >= 0 ? pakko : KaupunkiValo.PaikallinenTunti(System.DateTime.UtcNow, lon);
            var (aurinko, aamupaiva, auringonSuunta) = KaupunkiValo.Aurinko(System.DateTime.UtcNow, lat, lon);
            if (pakko >= 0) auringonSuunta = KaupunkiValo.AtsimuuttiTunnista(tunti);
            if (KaupunkiKuva.SavyKaytossa) KaupunkiKuva.VarmistaVolyymi(kamera);
            // Kupoli asetuksen mukaan myös kesken näkymän (stillit 19.10: avattiin kupoli 0 → myöhempi "kupoli 1" ei luonut sitä,
            // ja taivas näkyi yhtenä horisontin värinä).
            if ((KaupunkiKuva.Kupoli || KaupunkiKuva.SavyKaytossa) && kupoli == null) LuoKupoli();
            else if (!(KaupunkiKuva.Kupoli || KaupunkiKuva.SavyKaytossa) && kupoli != null) { Destroy(kupoli); kupoli = null; if (kupoliMat != null) Destroy(kupoliMat); if (kupoliMesh != null) Destroy(kupoliMesh); kupoliMat = null; kupoliMesh = null; }
            // Oletus: auringon todellinen korkeus kohteessa; pelaajan valinta tai asetuksen tunti avainkuvista.
            var savy = !KaupunkiKuva.SavyKaytossa ? KaupunkiValo.Paiva
                : pakko >= 0 ? KaupunkiValo.Tunnille(tunti) : KaupunkiValo.Korkeudelle(aurinko, aamupaiva);
            KaupunkiKuva.AsetaNyt(pakko >= 0 ? (tunti < 9.5 ? "aamu" : tunti < 16 ? "paiva" : "ilta")
                : aurinko <= -8 ? "yo" : aurinko < 15 ? (aamupaiva ? "aamu" : "ilta") : "paiva");
            Color V(double[] x) => new Color((float)x[0], (float)x[1], (float)x[2], 1f);
            Color horisontti = V(savy.Horisontti);
            kamera.backgroundColor = horisontti;
            if (KaupunkiKuva.varit != null)
            {
                KaupunkiKuva.varit.postExposure.value = (float)savy.Valotus;
                KaupunkiKuva.varit.colorFilter.value = V(savy.Suodin);
                KaupunkiKuva.varit.contrast.value = KaupunkiKuva.SavyKaytossa ? (float)savy.Kontrasti : KaupunkiKuva.Kontrasti;
                KaupunkiKuva.varit.saturation.value = KaupunkiKuva.SavyKaytossa ? (float)savy.Saturaatio : KaupunkiKuva.Saturaatio;
            }
            if (KaupunkiKuva.valko != null) { KaupunkiKuva.valko.temperature.value = (float)savy.Lampotila; KaupunkiKuva.valko.tint.value = (float)savy.Savytys; }
            if (KaupunkiKuva.jako != null)
            {
                float lampo = KaupunkiKuva.SavyKaytossa ? Mathf.Clamp01((float)savy.Lampotila / 30f) : 0f;
                KaupunkiKuva.jako.highlights.value = Color.Lerp(Color.gray, new Color(1f, 0.82f, 0.62f), lampo * 0.6f);
                KaupunkiKuva.jako.shadows.value = Color.Lerp(Color.gray, new Color(0.45f, 0.55f, 0.75f), lampo * 0.5f);
            }
            if (kupoli != null)
            {
                // Kupoli kameran ympärille lähi- ja kaukotason väliin (piirtyy ensimmäisenä ilman syvyyttä, joten koko ei näy).
                float r = Mathf.Clamp(kamera.nearClipPlane * 50f, kamera.nearClipPlane * 2f, kamera.farClipPlane * 0.5f);
                kupoli.transform.SetPositionAndRotation(kamera.transform.position, Quaternion.identity);
                kupoli.transform.localScale = Vector3.one * r;
                // Kajo auringon puolella, kun aurinko on matalalla (−6…10°; asetuksen tunnilla aamu 6.30 ja ilta 19); x = itä, z = pohjoinen.
                float kajo = pakko >= 0
                    ? Mathf.Max(0f, 1f - Mathf.Abs((float)tunti - 6.5f) / 2f) + Mathf.Max(0f, 1f - Mathf.Abs((float)tunti - 19f) / 2f)
                    : Mathf.Max(0f, 1f - Mathf.Abs((float)aurinko - 2f) / 8f);
                float az = (float)auringonSuunta * Mathf.Deg2Rad;   // sama alihajapiste kuin sävyllä (asetuksen tunnilla kellosta)
                Shader.SetGlobalColor(IdHorisontti, horisontti);
                Shader.SetGlobalColor(IdLaki, V(savy.TaivasYla));
                var kajoVari = Color.Lerp(horisontti, Color.white, 0.25f); kajoVari.a = Mathf.Clamp01(kajo) * 0.7f;
                Shader.SetGlobalColor(IdKajo, kajoVari);
                Shader.SetGlobalVector(IdAurinko, new Vector4(Mathf.Sin(az), 0.1f, Mathf.Cos(az), 0f));
                Shader.SetGlobalVector(IdParam, Vector4.zero);
            }
            if (Time.realtimeSinceStartup - edellinenLoki > 30f)
            {
                edellinenLoki = Time.realtimeSinceStartup;
                Debug.Log($"MATKAKIRJA kaupunki: vuorokausi {(KaupunkiKuva.SavyKaytossa ? "päällä" : "pois")} ({KaupunkiKuva.Valinta}) tunti {tunti:F1}{(pakko >= 0 ? " (pakotettu)" : $", aurinko {aurinko:F0}°")}, valotus {savy.Valotus:F2} EV, lämpötila {savy.Lampotila:F0}, kupoli {(kupoli != null ? "päällä" : "pois")}");
            }
            RenderSettings.fogColor = horisontti;
            if (!KaupunkiKuva.Sumu) { RenderSettings.fog = false; return; }
            var georef = kaupunki.Georef;
            float mitta = georef != null ? georef.transform.lossyScale.x : 1f;
            float korkeusM = georef != null ? Mathf.Max(30f, (kamera.transform.position.y - georef.transform.position.y) / Mathf.Max(1e-6f, mitta)) : 300f;
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogStartDistance = Mathf.Max(KaupunkiKuva.AlkuMinM, korkeusM * KaupunkiKuva.AlkuKerroin) * mitta;
            RenderSettings.fogEndDistance = Mathf.Max(KaupunkiKuva.LoppuMinM, korkeusM * KaupunkiKuva.LoppuKerroin) * mitta;
        }
    }
}
