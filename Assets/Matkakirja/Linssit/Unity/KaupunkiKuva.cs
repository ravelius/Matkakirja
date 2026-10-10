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
using Matkakirja.Linssit;
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
        // VuorokausiPaalla oletuksena (Päätoimittaja 6.10. 21.0x kuittasi sävykolmikon 20.53: aamu kullanlämmin, päivä neutraali, ilta
        // hillitty; juna 154): automaattinen vuorokausi = kohteen paikallisen ajan sävy, ilman pelaajan valintaa.
        public static bool Sumu = false, Savytys = false, Volyymi = false, VuorokausiPaalla = true, Kupoli = false;
        /// <summary>Kaupungin ympäristövalo (LS2 9.10., PT junaan 171): kartan tasainen ambientti jaetaan taivaaseen, horisonttiin ja
        /// maahan omille malleille ja veneille (YmparistoValo). Asetus "ymparistovalo 0|1" kuvapareille.</summary>
        public static bool Ymparistovalo = true;
        public static float Kontrasti = 12f, Saturaatio = 10f, Hehku = 0f, Tunti = -1f;
        /// <summary>Terävöitys 0–1 (KaupunkiTerava, kuvanlaatulista kohta 1; oletus pois kuvapariin ja iPad-mittaukseen asti).</summary>
        public static float Terava = 0f;

        // ---- VUOROKAUDENAJAN VALINTA (omistaja 6.10. 19.0x, Natiivi-UI:n nappi vasemmassa yläkulmassa; juna 152) ----
        /// <summary>Pelaajan valinta "paiva" tai "yo" (Black Marble -valot, 6.10.). OMISTAJA 8.10. 09.1x: "Kuumailmapallo saisi käynnistyä
        /// oletuksena aina päivä vuorokauden ajassa, eli muutetaan pois se automaattitila" → oletus päivä, ☾ vaihtaa vain päivän ja yön
        /// (Natiivi-UI kirjoittaa "paiva"/"yo"; vanhat "auto"/"aamu"/"ilta" → päivä). Juna 166: Saatila.Aika (LIVE asettaa LiveAika).
        /// Pysyy, kunnes vaihdetaan (myös seuraavissa avauksissa). Vaihto näkyy heti seuraavassa kehyksessä ilman uudelleenlatausta.</summary>
        public static string Valinta
        {
            get => valinta;
            set
            {
                var v = value == "yo" ? "yo" : "paiva";
                if (v == valinta) return;
                valinta = v;
                Debug.Log($"MATKAKIRJA kaupunki: vuorokausi valittu {v}");
                Vaihtui?.Invoke(v);
            }
        }
        static string valinta = "paiva";
        /// <summary>Pallon säätehosteiden painot ja salama (OpasSovitin joka kehys, PalloSaaVaikutus; juna 166): harmaus laskee valotusta,
        /// saturaatiota ja kontrastia ja viilentää, horisontti harmaantuu, sumu tihenee; salama nostaa valotusta hetkeksi.</summary>
        public static Matkakirja.Linssit.Kierros.SaaPainot Saa;
        public static double Salama;
        internal static readonly Color SaaHarmaa = new Color(0.60f, 0.63f, 0.68f, 1f);
        /// <summary>Valinta tai voimassa oleva tila vaihtui (UI päivittää napin kuvakkeen).</summary>
        public static event System.Action<string> Vaihtui;
        /// <summary>Voimassa oleva tila "aamu" | "paiva" | "ilta" | "yo" (automaattisessa kohteen oman ajan mukaan).</summary>
        public static string Nyt { get; private set; } = "paiva";
        /// <summary>Valinnan tunti (aamu 7, päivä 12, ilta 18.30); −1 = automaattinen.</summary>
        internal static float ValinnanTunti => valinta == "aamu" ? 7f : valinta == "paiva" ? 12f : valinta == "ilta" ? 18.5f : valinta == "yo" ? 23f : -1f;
        /// <summary>Pakotettu tunti: asetustiedosto ensin (kuvaparit), sitten pelaajan valinta; −1 = auringon mukaan.</summary>
        internal static float TuntiNyt => Tunti >= 0 ? Tunti : ValinnanTunti;
        /// <summary>Pallon korin valo (PalloKori, Ydin KoriValaistus): auringon korkeus ja atsimuutti (°), taivaan laki ja horisontti
        /// sekä kaupunkikameran jälkikäsittelyn valotus (EV) ja suodin; päivittyy joka ruutu vuorokausisävyn mukana.</summary>
        public static float KoriAurinkoKorkeus = 50f, KoriAtsimuutti = 180f, KoriValotusEV;
        public static Color KoriLaki = new Color(0.35f, 0.55f, 0.85f), KoriHorisontti = new Color(0.75f, 0.8f, 0.85f), KoriSuodin = Color.white;
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
        static bool vanhaAllowMsaa, vanhaJalki, tallennettu, filmi;

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

            if (GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) vanhaMsaa = urp.msaaSampleCount;
            vanhaAllowMsaa = kamera.allowMSAA;
            var lisa = kamera.GetUniversalAdditionalCameraData();
            if (lisa != null) { vanhaJalki = lisa.renderPostProcessing; if (Volyymi) lisa.renderPostProcessing = true; }
            // ELOKUVAMAINEN JÄLKIKÄSITTELY (omistaja 9.10.; Natiiviseppä, juna 170): KaupunkiFilmi tarvitsee jälkikäsittelyn (palautetaan
            // Suljettu-kohdassa vanhaJalki-polulla); ei syvyystekstuuria (kaukainen pehmennys pois 9.10. 02.1x).
            filmi = KaupunkiFilmi.Kaytossa;
            if (lisa != null && filmi) lisa.renderPostProcessing = true;
            if (filmi) KaupunkiFilmi.Avaa();
            kameraNyt = kamera;
            AsetaReunat();
            Laatutaso.Muuttui -= AsetaReunat; Laatutaso.Muuttui += AsetaReunat;
            if (PieniMuisti && KaupunkiPassi.Ssao(null).Contains("päällä")) { ssaoPois = true; Debug.Log("MATKAKIRJA kaupunki: pieni muisti → " + KaupunkiPassi.Ssao(false)); }

            if (Volyymi) LuoVolyymi();
            ajo = new GameObject("KaupunkiKuva").AddComponent<KaupunkiKuvaAjo>();
            ajo.Aloita(k);
            Debug.Log($"MATKAKIRJA kaupunki: kuva päällä (SSE {(k.Kaytossa == CesiumKaupunki.Lahde.Google ? GoogleSse : MaastoSse)}/{RakennusSse}, MSAA {Msaa}x, aniso 8–16, sumu {(Sumu ? $"{AlkuKerroin}×/{AlkuMinM} m–{LoppuKerroin}×/{LoppuMinM} m" : "pois")}, {(!Volyymi ? "ei Volumea" : Savytys ? "Neutral" : "ei sävytystä")}, kontrasti {Kontrasti}, saturaatio {Saturaatio}, hehku {Hehku})");
        }

        // AJALLINEN REUNANPEHMENNYS (Natiiviseppä 8.10., juna 169/170): Laatutaso.Ajallinen → MSAA 1 ja TAA kaupunkikameralle
        // (jälkikäsittely päälle; overlayt KaupunkiKoosteessa, joten pinoa ei ole); muuten MSAA Msaa× kuten ennen. Muuttui (lämpö,
        // pakotus) vaihtaa kesken näkymän; kori, sää ja kortti siirtyvät koosteen ja pinon välillä omalla tarkistuksellaan.
        static Camera kameraNyt;
        /// <summary>PIENI MUISTI (juna 173, iPad Pro 13 M1 8 Gt jetsam Pariisissa): kaupunkikameran pinon pysyvät värikohteet A/B ja syvyys
        /// MSAA 4×:llä ~350–430 Mt 2732×2048:lla (URP: pinossa ei muistittomia MSAA-pintoja) + SSAO täydellä resoluutiolla ~69 Mt.
        /// Alle 12 Gt:n laitteilla MSAA 2× ja SSAO pois kaupungissa (~210–250 Mt). Isommilla (16 Gt iPad, Mac) ennallaan.</summary>
        public static bool PieniMuisti => SystemInfo.systemMemorySize > 0 && SystemInfo.systemMemorySize < 12000;
        /// <summary>Kytkimet (asetukset.json; LS1:n A-polku samalla käännöksellä): kaupunki.PieniMsaa 1|2|4 (oletus 2) ja
        /// kaupunki.PieniSkaala 0,7–1 (oletus 1 = pois): renderScale pienellä muistilla ilman STP:tä (pino säilyy, RT:t ×skaala²).</summary>
        public static int MsaaKatto => PieniMuisti ? Mathf.Clamp(PieniMsaaPakko > 0 ? PieniMsaaPakko : Matkakirja.Peli.Asetus.Kokonais("kaupunki.PieniMsaa", 2), 1, 4) : 4;
        public static float PieniSkaala => PieniMuisti ? Mathf.Clamp(PieniSkaalaPakko > 0f ? PieniSkaalaPakko : Matkakirja.Peli.Asetus.Luku("kaupunki.PieniSkaala", 1f), 0.7f, 1f) : 1f;
        /// <summary>Testikytkimet Documents/kaupunki-kuva-asetukset.txt: "pienimsaa 1|2|4", "pieniskaala 0.8" (−1 = asetukset.json).</summary>
        public static int PieniMsaaPakko = -1; public static float PieniSkaalaPakko = -1f;
        /// <summary>Pienen muistin kevyt lataus (CesiumKaupunki.LuoTileset): oletus päällä; "pienilataus 0" asetustiedostossa = entinen (testi).</summary>
        public static bool PieniLataus = true;
        static bool ssaoPois;
        /// <summary>Komento `opas ajallinen`: reunanpehmennys heti kesken näkymän (overlayt vaihtavat tilaa omalla tarkistuksellaan).</summary>
        public static void PaivitaReunat() => AsetaReunat();
        static void AsetaReunat()
        {
            var kamera = kameraNyt;
            if (kamera == null) return;
            bool taa = KaupunkiKooste.Kaytossa;
            // Skaalain (#4220 kohta 7, juna 172): ajallisena STP renderScalella 0,8–0,9 + terävöitys (KaupunkiSkaalain, Ydin); muuten ennallaan.
            var sk = Matkakirja.Linssit.Kierros.KaupunkiSkaalain.Valitse(taa, Matkakirja.Peli.Asetus.Kokonais("kaupunki.Skaalain", 1),
                Matkakirja.Peli.Asetus.Luku("kaupunki.RenderScale", Matkakirja.Linssit.Kierros.KaupunkiSkaalain.StpOletus), Terava);
            if (GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp)
            {
                urp.msaaSampleCount = taa ? 1 : Mathf.Min(Mathf.Max(1, Msaa), MsaaKatto);
                Ruudunpaivitys.MsaaKatto = MsaaKatto;
                if (skaalaTallessa < 0f) { skaalaTallessa = urp.renderScale; suodinTallessa = urp.upscalingFilter; }
                urp.renderScale = sk.Stp ? sk.RenderScale : Mathf.Min(skaalaTallessa, PieniSkaala);
                Ruudunpaivitys.SkaalaKatto = sk.Stp ? 1f : PieniSkaala;
                urp.upscalingFilter = sk.Stp ? UpscalingFilterSelection.STP : suodinTallessa;
            }
            if (taa) { var d = kamera.GetUniversalAdditionalCameraData(); if (d != null) d.renderPostProcessing = true; }
            Laatutaso.KaytaAjallista(kamera, taa);
            kamera.allowMSAA = !taa;
            KaupunkiTerava.Aseta(sk.Terava);
            Debug.Log($"MATKAKIRJA kaupunki: reunanpehmennys {(sk.Stp ? $"STP (renderScale {sk.RenderScale:F2}, terävöitys {sk.Terava:F2}, MSAA 1, overlayt koosteessa)" : taa ? "ajallinen (TAA, MSAA 1, overlayt koosteessa)" : $"MSAA {Mathf.Min(Mathf.Max(1, Msaa), MsaaKatto)}x{(PieniMuisti ? $" (pieni muisti {SystemInfo.systemMemorySize} Mt, renderScale {PieniSkaala:F2})" : "")}")}");
        }

        // Skaalaimen alkuperäiset URP-arvot (palautetaan sulkiessa; −1 = ei tallessa).
        static float skaalaTallessa = -1f;
        static UpscalingFilterSelection suodinTallessa;
        static void PalautaSkaalain()
        {
            if (skaalaTallessa < 0f) return;
            if (GraphicsSettings.currentRenderPipeline is UniversalRenderPipelineAsset urp) { urp.renderScale = skaalaTallessa; urp.upscalingFilter = suodinTallessa; }
            skaalaTallessa = -1f;
        }

        static void Suljettu(CesiumKaupunki k)
        {
            if (!tallennettu) return;
            tallennettu = false;
            Laatutaso.Muuttui -= AsetaReunat;
            if (kameraNyt != null) Laatutaso.KaytaAjallista(kameraNyt, false);
            if (ssaoPois) { ssaoPois = false; KaupunkiPassi.Ssao(true); }
            Ruudunpaivitys.MsaaKatto = 4; Ruudunpaivitys.SkaalaKatto = 1f; PieniMsaaPakko = -1; PieniSkaalaPakko = -1f; PieniLataus = true;
            PalautaSkaalain();
            kameraNyt = null;
            GoogleSse = 16f; MaastoSse = 10f; RakennusSse = 16f; Msaa = 4; // asetustiedosto luetaan uudelleen seuraavassa avauksessa
            AlkuKerroin = 15f; LoppuKerroin = 80f; AlkuMinM = 3000f; LoppuMinM = 15000f; Sumu = false; Savytys = false; Volyymi = false;
            Kontrasti = 12f; Saturaatio = 10f; Hehku = 0f; VuorokausiPaalla = true; Kupoli = false; Tunti = -1f; asetuksetMuokattu = default;
            Terava = 0f; KaupunkiTerava.Pois();
            KaupunkiYovalot.Pois(true); KaupunkiYovalot.Kaytossa = true;
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
            if (filmi) KaupunkiFilmi.Sulje();
            filmi = false;
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
                        case "pienimsaa": PieniMsaaPakko = (int)v; break;   // juna 173: pienen muistin MSAA-katto (testi)
                        case "pienilataus": PieniLataus = v != 0; break;   // juna 173: pienen muistin kevyt laattalataus (testi)
                        case "pieniskaala": PieniSkaalaPakko = v; break;   // juna 173: pienen muistin renderScale (testi)
                        case "laattapienennys": LaattaTekstuurit.Pakotettu = (int)v; break;   // proto 9.10.: Googlen laattakuvat 0 pois, 1 puolikas, 2 neljännes (uudet laatat)
                        case "sumu": Sumu = v != 0; break;
                        case "ilmakeha": KaupunkiIlmakeha.Pakotettu = v != 0; break;   // LS2 8.10.: fysikaalinen taivas, ilmaperspektiivi, pilvien varjot
                        case "ilmvalotus": KaupunkiIlmakeha.Valotus = v; break;
                        case "hamaravalotus": KaupunkiIlmakeha.HamaraValotus = v; break;
                        case "sumukarsinta": CesiumKaupunki.SumuKarsinta = v != 0; break;   // LS2 9.10.: kaukomaan testi (PT)
                        case "aluskerros": CesiumKaupunki.AluskerrosPakotettu = v != 0; break;
                        case "sininenhetki": KaupunkiIlmakeha.SininenHetki = v; break;
                        case "pilvet": KaupunkiIlmakeha.PilvetPakotettu = v != 0; break;   // LS2: pallon pilvikerros (kohta 6a), oletus kehityskaupungeissa
                        case "pilvipohja": KaupunkiIlmakeha.PilviKorkeusM = v; KaupunkiIlmakeha.PilviAsetettu = true; break;
                        case "pilvi-ilmasto": KaupunkiIlmakeha.PilviIlmasto = v != 0; break;   // LS2 10.10.: METAR-pohja ja -paksuus kaupungeittain
                        case "kuuro": Matkakirja.Linssit.Kierros.KaupunkiKuuro.KasinVoima = v; break;   // LS2 9.10.: kuvapari (LS1:n kuurot automaattisesti)
                        case "markyys": Matkakirja.Linssit.Kierros.KaupunkiKuuro.AsetaMarkyys(v); break;
                        case "kaukoutu": KaupunkiIlmakeha.KaukoUtu = v; break;
                        case "aerosoli": KaupunkiIlmakeha.Aerosoli = v != 0; break;   // LS2 9.10.: mitattu utu (AERONET) ämpäristä
                        case "kaukoutumitattu": KaupunkiIlmakeha.KaukoUtuMitattu = v; break;
                        case "apvoimamitattu": KaupunkiIlmakeha.ApVoimaMitattu = v; break;
                        case "aamusumu": KaupunkiIlmakeha.Aamusumu = v; break;
                        case "pilvipaksuus": KaupunkiIlmakeha.PilviPaksuusM = v; KaupunkiIlmakeha.PilviAsetettu = true; break;
                        case "vesi": KaupunkiVesi.Pakotettu = v != 0; break;   // LS2 8.10.: oma vesipinta (seuraava kaupungin avaus)
                        case "vesivari": KaupunkiVesi.Vari = v != 0; break;   // LS2 10.10.: mitattu veden väri (Sentinel-2)
                        case "vesivarikerroin": KaupunkiVesi.VariKerroin = v; break;
                        case "vesinosto": KaupunkiVesi.NostoM = v; KaupunkiVesi.NostoAsetettu = true; break;
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
                        case "ymparistovalo": Ymparistovalo = v != 0; break;
                        case "omatmallit": CesiumOmatMallit.Kaytossa = v != 0; break;
                        case "leikkaus": CesiumOmatMallit.LeikkausSallittu = v != 0; break;   // diagnostiikka (juna 173 jetsam): ei leikkausmaskia
                        case "leikkaustarkka": CesiumOmatMallit.LeikkausTarkka = v != 0; break;   // pienen muistin kevyt maski pois (vertailu)
                        case "hataraja": CesiumKaupunki.HataPieniGt = v; break;   // pienen muistin hätä 2 (lataus seis, Gt, testi)
                        case "hataraja1": CesiumKaupunki.HataPieni1Gt = v; break;   // pienen muistin hätä 1 (esilataus pois, Gt; 0 = ei tasoa 1, testi)
                        case "omavalo": CesiumOmatMallit.OmaValo = v != 0; break;   // LS2 9.10.: omien mallien valo (seuraava avaus)
                        case "omavalotus": CesiumOmatMallit.Valotus = v; break;
                        case "omavarjot": OmatVarjot.Paalla = v != 0; break;   // LS2 9.10.: omien mallien aurinkovarjot
                        case "omavarjomatka": OmatVarjot.MatkaAsetettu = v; break;
                        case "omajulkisivu": CesiumOmatMallit.Julkisivu = v; break;
                        case "omahehku": CesiumOmatMallit.Hehku = v; break;
                        case "omavarjo": CesiumOmatMallit.VarjoNosto = v; break;
                        case "terava": Terava = v; KaupunkiTerava.Aseta(v); break;
                        case "yovalot": KaupunkiYovalot.Kaytossa = v != 0; break;
                        case "yolamput": KaupunkiYovalot.OsmLamput = v != 0; break;
                        case "yoikkunadata": KaupunkiYovalot.IkkunaData = v != 0; break;
                        case "yoikkunakerroin": KaupunkiYovalot.IkkunaKerroin = v; break;
                        case "yoalueet": KaupunkiYovalot.AlueVoima = v; break;
                        case "yomaamerkit": KaupunkiYovalot.MaamerkkiVoima = v; break;   // julkisivuvalot (kuvapari: 0 = pois, 1,5 = oletus)
                        case "yohehku": KaupunkiYovalot.Hehku = v; break;
                        case "yopisteet": KaupunkiYovalot.Pisteet = v; break;
                        case "yosolu": KaupunkiYovalot.SoluM = v; break;
                        case "yoikkunat": KaupunkiYovalot.Ikkunat = v; break;
                        case "yoikkunaosuus": KaupunkiYovalot.IkkunaOsuus = v; break;
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
        AmbientMode vanhaAmbMoodi; Color vanhaAmbTaivas, vanhaAmbEkv, vanhaAmbMaa, ambPohja, ambViime; bool ambKirjoitettu;
        GameObject kupoli; Material kupoliMat; Mesh kupoliMesh; bool kupoliIlmakeha;
        float edellinenLoki = -999f, luettu;
        static readonly int IdHorisontti = Shader.PropertyToID("_TaivasHorisontti"), IdLaki = Shader.PropertyToID("_TaivasLaki"),
            IdKajo = Shader.PropertyToID("_TaivasKajo"), IdAurinko = Shader.PropertyToID("_TaivasAurinko"), IdParam = Shader.PropertyToID("_TaivasParam");

        public void Aloita(CesiumKaupunki k)
        {
            kaupunki = k;
            vanhaSumu = RenderSettings.fog; vanhaMoodi = RenderSettings.fogMode; vanhaVari = RenderSettings.fogColor;
            vanhaAlku = RenderSettings.fogStartDistance; vanhaLoppu = RenderSettings.fogEndDistance;
            vanhaTausta = k.Kamera != null ? k.Kamera.backgroundColor : Color.black;
            vanhaAmbMoodi = RenderSettings.ambientMode; vanhaAmbTaivas = RenderSettings.ambientSkyColor;
            vanhaAmbEkv = RenderSettings.ambientEquatorColor; vanhaAmbMaa = RenderSettings.ambientGroundColor; ambKirjoitettu = false;
        }

        public void Lopeta()
        {
            RenderSettings.fog = vanhaSumu; RenderSettings.fogMode = vanhaMoodi; RenderSettings.fogColor = vanhaVari;
            RenderSettings.fogStartDistance = vanhaAlku; RenderSettings.fogEndDistance = vanhaLoppu;
            if (kaupunki?.Kamera != null) kaupunki.Kamera.backgroundColor = vanhaTausta;
            if (ambKirjoitettu) PalautaYmparisto(true);
            if (kupoli != null) Destroy(kupoli);
            if (kupoliMat != null) Destroy(kupoliMat);
            if (kupoliMesh != null) Destroy(kupoliMesh);
        }

        /// <summary>Kaupungin ympäristövalo (LS2 9.10., PT junaan 171; Googlen laatat unlit, eivät muutu): Aurinko.Kompensoi kirjoittaa
        /// kartan tasaisen ambientin ruudun alussa (ambientLight = ambientSkyColor); tämä ajetaan sen jälkeen (DefaultExecutionOrder 5000)
        /// ja jakaa sen Trilightiksi. Pohja luetaan uudelleen vain, kun Aurinko on kirjoittanut uuden arvon (muuten oma arvo kertautuisi).</summary>
        void PaivitaYmparisto(float aurinkoAst, float pilvisyys)
        {
            var nyt = RenderSettings.ambientSkyColor;
            if (!ambKirjoitettu || Mathf.Abs(nyt.r - ambViime.r) + Mathf.Abs(nyt.g - ambViime.g) + Mathf.Abs(nyt.b - ambViime.b) > 1e-4f) ambPohja = nyt;
            if (!KaupunkiKuva.Ymparistovalo) { if (ambKirjoitettu) PalautaYmparisto(false); return; }
            var l = ambPohja.linear;
            var (t, h, m) = Matkakirja.Linssit.Ilmakeha.YmparistoValo.Laske(l.r, l.g, l.b, aurinkoAst, pilvisyys);
            Color C(double[] c) => new Color((float)c[0], (float)c[1], (float)c[2], ambPohja.a).gamma;
            RenderSettings.ambientMode = AmbientMode.Trilight;
            RenderSettings.ambientSkyColor = C(t); RenderSettings.ambientEquatorColor = C(h); RenderSettings.ambientGroundColor = C(m);
            ambViime = RenderSettings.ambientSkyColor; ambKirjoitettu = true;
        }

        /// <summary>Kartan tila takaisin: tasainen pohja (asetus pois) tai kaupungin avausta edeltävä tila (Lopeta).</summary>
        void PalautaYmparisto(bool alkuun)
        {
            RenderSettings.ambientMode = vanhaAmbMoodi;
            RenderSettings.ambientSkyColor = alkuun ? vanhaAmbTaivas : ambPohja;
            if (alkuun) { RenderSettings.ambientEquatorColor = vanhaAmbEkv; RenderSettings.ambientGroundColor = vanhaAmbMaa; }
            ambKirjoitettu = false;
        }

        /// <summary>Taivaskupoli (DioraamaTaivas-varjostin, Background-jono ilman syvyyskirjoitusta): piirtyy ensin, laatat sen päälle.
        /// Kaupungin kerroksella 15, koska pääkamera piirtää kaupunkinäkymässä vain sen.</summary>
        void LuoKupoli()
        {
            kupoliIlmakeha = KaupunkiIlmakeha.Paalla;
            kupoliMat = KaupunkiIlmakeha.TaivasMateriaali();   // fysikaalinen taivas (LS2 8.10.), muuten DioraamaTaivas
            if (kupoliMat == null)
            {
                var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaTaivas");
                if (varjostin == null) { Debug.Log("MATKAKIRJA kaupunki: taivasvarjostin puuttuu, kupoli pois"); return; }
                kupoliMat = new Material(varjostin) { name = "KaupunkiKuva:taivas" };
            }
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
            // Ilmakehän kupoli (LS2 8.10.): päälle/pois vaihtaa kupolin materiaalin (kupoli luodaan uudelleen).
            if (kupoli != null && kupoliIlmakeha != KaupunkiIlmakeha.Paalla) { Destroy(kupoli); kupoli = null; if (kupoliMat != null) Destroy(kupoliMat); if (kupoliMesh != null) Destroy(kupoliMesh); kupoliMat = null; kupoliMesh = null; }
            if ((KaupunkiKuva.Kupoli || KaupunkiKuva.SavyKaytossa || KaupunkiIlmakeha.Paalla) && kupoli == null) LuoKupoli();
            else if (!(KaupunkiKuva.Kupoli || KaupunkiKuva.SavyKaytossa || KaupunkiIlmakeha.Paalla) && kupoli != null) { Destroy(kupoli); kupoli = null; if (kupoliMat != null) Destroy(kupoliMat); if (kupoliMesh != null) Destroy(kupoliMesh); kupoliMat = null; kupoliMesh = null; }
            // Oletus: auringon todellinen korkeus kohteessa; pelaajan valinta tai asetuksen tunti avainkuvista.
            var savy = !KaupunkiKuva.SavyKaytossa ? KaupunkiValo.Paiva
                : pakko >= 0 ? KaupunkiValo.Tunnille(tunti) : KaupunkiValo.Korkeudelle(aurinko, aamupaiva);
            // LOPPUILTA YÖN SIJAAN (omistaja 9.10.: "yö voisi olla ennemmin loppu ilta niin että taivaassa näkyisi vielä purppuraa"; PT:
            // yötila lähes musta): kehityskaupungeissa (ilmakehä päällä) yön sävy on illan ja yön välissä (~−1,1 EV, lämmin taivaanranta);
            // ilmakehän aurinko −7° (KaupunkiIlmakeha.IltaAurinkoAst), kaupungin valot täysillä kuten yöllä.
            bool yoNyt = pakko >= 0 ? (tunti >= 21 || tunti < 5) : aurinko <= -8;
            if (KaupunkiKuva.SavyKaytossa && yoNyt && KaupunkiIlmakeha.IltaYolla && KaupunkiIlmakeha.Paalla)
                savy = Matkakirja.Linssit.Kierros.Savy.Valissa(KaupunkiValo.Ilta, KaupunkiValo.Yo, 0.75);   // PT 9.10.: sinertävämpi hämärä, valot erottuvat
            KaupunkiKuva.AsetaNyt(pakko >= 0 ? (tunti >= 21 || tunti < 5 ? "yo" : tunti < 9.5 ? "aamu" : tunti < 16 ? "paiva" : "ilta")
                : aurinko <= -8 ? "yo" : aurinko < 15 ? (aamupaiva ? "aamu" : "ilta") : "paiva");
            // Yövalot (kuvanlaatujärjestys kohta 2): hämärästä yöhön auringon tai valitun kellonajan mukaan.
            double yoOsuus = !KaupunkiKuva.SavyKaytossa ? 0 : pakko >= 0 ? Matkakirja.Linssit.Kierros.KaupunkiYovalot.OsuusTunnista(tunti)
                : Matkakirja.Linssit.Kierros.KaupunkiYovalot.OsuusAuringosta(aurinko);
            double ikkunaOsuus = !KaupunkiKuva.SavyKaytossa ? 0 : pakko >= 0 ? Matkakirja.Linssit.Kierros.KaupunkiYovalot.IkkunatTunnista(tunti)
                : Matkakirja.Linssit.Kierros.KaupunkiYovalot.IkkunatAuringosta(aurinko);
            KaupunkiYovalot.Paivita(this, georef0, kamera, yoOsuus, ikkunaOsuus);
            KaupunkiIlmakeha.YoOsuus = (float)yoOsuus;   // LS2: kaupungin valojen heijastus omaan veteen
            Color V(double[] x) => new Color((float)x[0], (float)x[1], (float)x[2], 1f);
            Color horisontti = V(savy.Horisontti);
            float harmaus = Mathf.SmoothStep(0f, 1f, (float)KaupunkiKuva.Saa.Harmaus);
            horisontti = Color.Lerp(horisontti, KaupunkiKuva.SaaHarmaa, 0.7f * harmaus);
            kamera.backgroundColor = horisontti;
            if (KaupunkiKuva.varit != null)
            {
                KaupunkiKuva.varit.postExposure.value = (float)savy.Valotus;
                KaupunkiKuva.varit.colorFilter.value = V(savy.Suodin);
                KaupunkiKuva.varit.contrast.value = KaupunkiKuva.SavyKaytossa ? (float)savy.Kontrasti : KaupunkiKuva.Kontrasti;
                KaupunkiKuva.varit.saturation.value = KaupunkiKuva.SavyKaytossa ? (float)savy.Saturaatio : KaupunkiKuva.Saturaatio;
            }
            if (KaupunkiKuva.valko != null) { KaupunkiKuva.valko.temperature.value = (float)savy.Lampotila; KaupunkiKuva.valko.tint.value = (float)savy.Savytys; }
            // Sää (juna 166): harmaus ja salama sävyn päälle.
            if (KaupunkiKuva.varit != null && (harmaus > 0.001f || KaupunkiKuva.Salama > 0.001))
            {
                // Juna 166 (video 165: liian vaisu): −1 EV, saturaatio −45, kontrasti −10, viileys −12.
                KaupunkiKuva.varit.postExposure.value += -1.0f * harmaus + 2.2f * (float)KaupunkiKuva.Salama;
                KaupunkiKuva.varit.saturation.value += -45f * harmaus;
                KaupunkiKuva.varit.contrast.value += -10f * harmaus;
                if (KaupunkiKuva.valko != null) KaupunkiKuva.valko.temperature.value += -12f * harmaus;
            }
            // Pallon kori (Linssiseppä 8.10.): sama valo kuin kaupungissa. Asetuksen tunnilla korkeus kellosta (6–18 → 0–55°).
            KaupunkiKuva.KoriAurinkoKorkeus = pakko >= 0 ? 55f * Mathf.Sin(Mathf.PI * ((float)tunti - 6f) / 12f) : (float)aurinko;
            KaupunkiKuva.KoriAtsimuutti = (float)auringonSuunta;
            KaupunkiKuva.KoriLaki = V(savy.TaivasYla); KaupunkiKuva.KoriHorisontti = horisontti;
            KaupunkiKuva.KoriValotusEV = KaupunkiKuva.varit != null ? KaupunkiKuva.varit.postExposure.value : 0f;
            KaupunkiKuva.KoriSuodin = KaupunkiKuva.varit != null ? KaupunkiKuva.varit.colorFilter.value : Color.white;
            // Ilmakehä (LS2 8.10.): sama aurinko kuin korilla; pilvisyys säästä, pilvikenttä liikkuu tuulen mukana.
            {
                var gr = kaupunki.Georef; float mt = gr != null ? gr.transform.lossyScale.x : 1f;
                float kork = gr != null ? Mathf.Max(30f, (kamera.transform.position.y - gr.transform.position.y) / Mathf.Max(1e-6f, mt)) : 300f;
                // LS1:n automaattiset kuurot (kierros-170 PalloKuurot, OpasSovitin.KuuroVoima): heijastuksella, ettei haara riipu toisesta.
                // Sään sade (PalloSaaVaikutus.Sade, PT junaan 171: sade = tummat matalat pilvet + märät kadut) samaan maksimiin.
                Matkakirja.Linssit.Kierros.KaupunkiKuuro.Voima = System.Math.Max(System.Math.Max(OpasKuuroVoima(), Matkakirja.Linssit.Kierros.KaupunkiKuuro.KasinVoima), KaupunkiKuva.Saa.Sade);
                Matkakirja.Linssit.Kierros.KaupunkiKuuro.Paivita(Time.deltaTime);
                KaupunkiIlmakeha.Paivita(lat, lon, kork, KaupunkiKuva.KoriAurinkoKorkeus, KaupunkiKuva.KoriAtsimuutti, Mathf.Lerp(0.45f, 0.95f, harmaus),
                    KaupunkiIlmakeha.TuuliMs * Time.time, mt);
                kaupunki.Vesi?.Paivita(kamera);
                PaivitaYmparisto(KaupunkiKuva.KoriAurinkoKorkeus, Mathf.Lerp(0.45f, 0.95f, harmaus));
            }
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
            float saaSumu = Mathf.SmoothStep(0f, 1f, (float)KaupunkiKuva.Saa.Sumu);
            if (!KaupunkiKuva.Sumu && saaSumu < 0.01f) { RenderSettings.fog = false; return; }
            var georef = kaupunki.Georef;
            float mitta = georef != null ? georef.transform.lossyScale.x : 1f;
            float korkeusM = georef != null ? Mathf.Max(30f, (kamera.transform.position.y - georef.transform.position.y) / Mathf.Max(1e-6f, mitta)) : 300f;
            RenderSettings.fog = true;
            RenderSettings.fogMode = FogMode.Linear;
            float alku = KaupunkiKuva.Sumu ? Mathf.Max(KaupunkiKuva.AlkuMinM, korkeusM * KaupunkiKuva.AlkuKerroin) : float.MaxValue;
            float loppu = KaupunkiKuva.Sumu ? Mathf.Max(KaupunkiKuva.LoppuMinM, korkeusM * KaupunkiKuva.LoppuKerroin) : float.MaxValue;
            // Sääsumu (juna 166): tiheä sumu alkaa lähes kamerasta, kevyt pilvisellä kaukana; tiheämpi kahdesta.
            if (saaSumu >= 0.01f)
            {
                alku = Mathf.Min(alku, Mathf.Max(60f, korkeusM * Mathf.Lerp(40f, 0.8f, saaSumu)));
                loppu = Mathf.Min(loppu, Mathf.Max(400f, korkeusM * Mathf.Lerp(200f, 6f, saaSumu)));
            }
            RenderSettings.fogStartDistance = alku * mitta;
            RenderSettings.fogEndDistance = loppu * mitta;
        }

        static System.Reflection.MemberInfo kuuroJasen; static bool kuuroHaettu;
        /// <summary>OpasSovitin.KuuroVoima (LS1, kierros-170), 0 jos ei vielä käännöksessä.</summary>
        static double OpasKuuroVoima()
        {
            if (!kuuroHaettu)
            {
                kuuroHaettu = true;
                var t = typeof(OpasSovitin);
                kuuroJasen = (System.Reflection.MemberInfo)t.GetField("KuuroVoima", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static)
                    ?? t.GetProperty("KuuroVoima", System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Static);
            }
            try
            {
                object v = kuuroJasen is System.Reflection.FieldInfo f ? f.GetValue(null) : kuuroJasen is System.Reflection.PropertyInfo p ? p.GetValue(null) : null;
                return v is double d ? d : v is float fl ? fl : 0;
            }
            catch (System.Exception) { return 0; }
        }
    }
}
