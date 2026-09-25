using System.Globalization;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja
{
    /// <summary>
    /// LÄMPÖSÄÄDÖT (Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA kohta 3, PIKKUSÄÄDÖT KUVAPARILLA, Natiiviseppä 25.9.2026):
    ///
    ///   HDR     kytkin pallon kameralle (Camera.allowHDR). URP käyttää HDR-puskuria vain, kun sekä kamera että
    ///           Mobile_RPAsset (supportsHDR 1, puskuri 32-bittinen B10G11R11) sallivat, joten kameran kytkin riittää eikä
    ///           assettia (editorissa tiedosto) tarvitse kirjoittaa. OLETUS ENNALLAAN päällä (<see cref="HdrOletus"/>):
    ///           Natiiviseppä päättää kuvaparista ("HDR pois, jos ei näkyvää eroa"); oletuksen vaihto = tämä vakio.
    ///
    ///   VARJOT  päävalon varjot <see cref="Lampopaatos.VarjoTila"/>. NYKYTILA (selvitetty 25.9.): varjot ovat POIS.
    ///           Aurinko.Start asettaa valo.shadows = None (planeetan mittakaavassa varjokartta ei toimi), kohtauksen valo on
    ///           m_Shadows 0, maamerkit eivät heitä varjoa (Maamerkit: shadowCastingMode Off) ja Mobile_RPAssetin
    ///           shadowDistance on 50 m, joten varjokarttaa ei piirretä lainkaan. Oletus siis Pois, eikä ilme muutu.
    ///           Auto (kokeilu kuvapariin): varjot vain, kun maamerkki on ruudulla, ja shadowDistance kauimman ruudulla
    ///           olevan maamerkin tarpeesta (Lampopaatos.VarjoEtaisyys); Paalle = aina. Varjon heittävät vain maamerkit:
    ///           Cesiumin laatat eivät (koko näkyvän maaston varjokartta maksaisi paljon ja olisi karkea), mutta ne
    ///           vastaanottavat (MatkakirjaTileset on URP Lit).
    ///
    ///   LOKIT   Log ja Warning ilman pinoa (StackTraceLogType.None), Error, Assert ja Exception ScriptOnly. Lokia EI estetä
    ///           julkaisukäännöksessä (Laitetestaaja ja lämpömittaukset lukevat konsolia); vain pinon kokoaminen jokaiselle
    ///           riville jää pois. Sama ProjectSettingsissä (m_StackTraceTypes); käynnistys varmistaa laitteella.
    ///
    /// Komennot (Komennot.cs): hdr pois|paalle|oletus|tila, varjot pois|auto|paalle|tila.
    /// </summary>
    [DefaultExecutionOrder(9980)] // Maamerkkien LateUpdaten jälkeen (ruudulla tässä kehyksessä), PallonLepon (9990) ennen
    public sealed class LampoSaadot : MonoBehaviour
    {
        /// <summary>HDR:n oletus: ENNALLAAN päällä (kamera m_HDR 1, Mobile_RPAsset supportsHDR 1). Päätös kuvaparista.</summary>
        public const bool HdrOletus = true;
        /// <summary>Päävalon varjojen oletus: Pois = nykyinen ilme (varjot olivat jo pois, ks. luokan kuvaus).</summary>
        public const Lampopaatos.VarjoTila VarjoOletus = Lampopaatos.VarjoTila.Pois;

        /// <summary>HDR päällä (komento hdr).</summary>
        public static bool Hdr { get; set; } = HdrOletus;
        /// <summary>Päävalon varjot (komento varjot).</summary>
        public static Lampopaatos.VarjoTila Varjot { get; set; } = VarjoOletus;

        static LampoSaadot instanssi;
        Camera kamera;
        Light valo;
        Maamerkit maamerkit;
        UniversalRenderPipelineAsset asetus;
        float alkuperainenEtaisyys = -1f;
        bool varjotKaytetty, varjotNyt, laatatKasitelty, maamerkkiRuudulla;
        float tarve = float.NaN;
        int haettu = -1000;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa()
        {
            instanssi = null;
            Hdr = HdrOletus;
            Varjot = VarjoOletus;
#if !UNITY_EDITOR
            // Laitteella heti ensimmäisestä rivistä (editorin konsoli pitää omat asetuksensa).
            Application.SetStackTraceLogType(LogType.Log, StackTraceLogType.None);
            Application.SetStackTraceLogType(LogType.Warning, StackTraceLogType.None);
            Application.SetStackTraceLogType(LogType.Error, StackTraceLogType.ScriptOnly);
            Application.SetStackTraceLogType(LogType.Assert, StackTraceLogType.ScriptOnly);
            Application.SetStackTraceLogType(LogType.Exception, StackTraceLogType.ScriptOnly);
#endif
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var go = new GameObject("LampoSaadot");
            DontDestroyOnLoad(go);
            instanssi = go.AddComponent<LampoSaadot>();
        }

        void OnDestroy()
        {
            if (instanssi == this) instanssi = null;
            // Editorissa URP-asset on tiedosto: shadowDistance ei saa jäädä kokeilun arvoon.
            if (asetus != null && alkuperainenEtaisyys >= 0f) asetus.shadowDistance = alkuperainenEtaisyys;
        }

        void Etsi()
        {
            haettu = Time.frameCount;
            if (kamera == null) kamera = PallonLepo.Kamera;
            if (valo == null)
            {
                var au = FindAnyObjectByType<Aurinko>();
                valo = au != null && au.valo != null ? au.valo : RenderSettings.sun;
            }
            if (maamerkit == null) maamerkit = FindAnyObjectByType<Maamerkit>();
            if (asetus == null)
            {
                asetus = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
                if (asetus != null) alkuperainenEtaisyys = asetus.shadowDistance;
            }
        }

        void LateUpdate()
        {
            if (Time.frameCount - haettu >= 30 || kamera == null) Etsi();

            // HDR: vain muutos kirjoitetaan (oletuksella ei koske mihinkään).
            if (kamera != null && kamera.allowHDR != Hdr)
            {
                kamera.allowHDR = Hdr;
                Debug.Log("MATKAKIRJA lämpösäädöt: " + Kuvaus());
                PallonLepo.Muuttui("hdr");
            }
            PaivitaVarjot();
        }

        /// <summary>
        /// Päävalon varjot tilan mukaan. Pois-tilassa ei kosketa mihinkään, ennen kuin varjot on kerran kytketty
        /// (nykyinen ilme: Aurinko.Start on jo asettanut valon ilman varjoja).
        /// </summary>
        void PaivitaVarjot()
        {
            maamerkkiRuudulla = false;
            tarve = float.NaN;
            if (Varjot != Lampopaatos.VarjoTila.Pois && maamerkit != null) maamerkkiRuudulla = maamerkit.Ruudulla(out tarve);
            bool paalle = Lampopaatos.VarjotPaalla(Varjot, maamerkkiRuudulla);
            if (!varjotKaytetty && !paalle) return;
            if (!varjotKaytetty || paalle != varjotNyt)
            {
                varjotKaytetty = true;
                varjotNyt = paalle;
                if (paalle) LaatatEivatHeitaVarjoa();
                if (valo != null) valo.shadows = paalle ? LightShadows.Hard : LightShadows.None; // soft ei tuettu (Mobile_RPAsset)
                if (maamerkit != null) maamerkit.HeitaVarjot(paalle);
                Debug.Log("MATKAKIRJA lämpösäädöt: " + Kuvaus());
                PallonLepo.Muuttui("varjot");
            }
            if (asetus != null && alkuperainenEtaisyys >= 0f)
            {
                float etaisyys = paalle ? Lampopaatos.VarjoEtaisyys(tarve, alkuperainenEtaisyys) : alkuperainenEtaisyys;
                if (asetus.shadowDistance != etaisyys) asetus.shadowDistance = etaisyys;
            }
        }

        /// <summary>
        /// Cesiumin laatat eivät heitä varjoa (vain maamerkit): nykyiset laatat heti ja uudet luotaessa. Tehdään vasta, kun
        /// varjot kytketään ensimmäisen kerran (oletuksella ei koskaan), koska laattoja voi olla tuhansia.
        /// </summary>
        void LaatatEivatHeitaVarjoa()
        {
            if (laatatKasitelty) return;
            laatatKasitelty = true;
            foreach (var t in FindObjectsByType<Cesium3DTileset>(FindObjectsSortMode.None))
            {
                t.OnTileGameObjectCreated += LaattaLuotu;
                LaattaLuotu(t.gameObject);
            }
        }

        static void LaattaLuotu(GameObject go)
        {
            if (go == null) return;
            foreach (var r in go.GetComponentsInChildren<MeshRenderer>(true)) r.shadowCastingMode = ShadowCastingMode.Off;
        }

        /// <summary>Tila lokiin (komennot hdr tila ja varjot tila).</summary>
        public static string Kuvaus()
        {
            var ic = CultureInfo.InvariantCulture;
            var s = instanssi;
            var k = s != null ? s.kamera : PallonLepo.Kamera;
            var a = s != null ? s.asetus : GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            string hdr = $"HDR {(Hdr ? "päällä" : "pois")} (oletus {(HdrOletus ? "päällä" : "pois")}; kamera allowHDR " +
                         $"{(k != null ? k.allowHDR.ToString() : "-")}, URP supportsHDR {(a != null ? a.supportsHDR.ToString() : "-")}" +
                         $"{(a != null ? ", puskuri " + a.hdrColorBufferPrecision : "")})";
            string varjot = $"varjot {Varjot} (oletus {VarjoOletus}; nyt {(s != null && s.varjotNyt ? "päällä" : "pois")}, valo shadows " +
                            $"{(s != null && s.valo != null ? s.valo.shadows.ToString() : "-")}, shadowDistance " +
                            $"{(a != null ? a.shadowDistance.ToString("0.#", ic) : "-")} m (alkuperäinen " +
                            $"{(s != null ? s.alkuperainenEtaisyys.ToString("0.#", ic) : "-")} m), maamerkki ruudulla " +
                            $"{(s != null && s.maamerkkiRuudulla ? "kyllä, tarve " + s.tarve.ToString("0", ic) + " m" : "ei")})";
            return hdr + "; " + varjot;
        }
    }
}
