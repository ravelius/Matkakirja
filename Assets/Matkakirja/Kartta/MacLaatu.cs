using System;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// MACIN AUTOMAATTINEN LAATU (Päätoimittaja 7.10.2026 klo 01.2x, omistaja: natiivi Mac myös MacBook Air M4:llä, 16 Gt,
    /// ilman tuuletinta; Natiiviseppä). Vain natiivi Mac -sovellus; iOS:n muistikatto ja näyttökerroin ennallaan.
    ///
    /// 1) PROFIILI käynnistyksessä fyysisen muistin mukaan (MatkakirjaMacSyote_Laite): Googlen 3D-kaupungin SSE ilman iPhonen
    ///    näyttökerrointa ja käyttämättömien laattojen välimuisti. Vähäinen vapaa muisti (alle VahanVapaanGt) karkeuttaa yhden
    ///    portaan. CesiumKaupunki (LS1) lukee GoogleSse- ja Valimuisti-arvot avatessaan.
    /// 2) KUORMA (≥ 1, pehmeä): tavoite on lämmön (thermalState: fair 1,25, serious 1,6, critical 2,2; virransäästö 1,25) ja
    ///    kehysajan maksimi. Kehysaika mitataan vain täydellä taajuudella (Ruudunpaivitys.Tila.Taysi, tavoite ≥ 60 fps; ei
    ///    käynnistyksen 20 s:n eikä latausverhon aikana, nykäys rajataan 50 ms:iin):
    ///    keskiarvo yli 25 ms (alle 40 fps, alaraja 30 lähestyy) nostaa kehyskuormaa 5 %/s, alle 18 ms laskee 2 %/s.
    ///    Kuorma seuraa tavoitetta eksponentiaalisesti (nousu 6 s, lasku 20 s), joten laatu ei hyppää. CesiumKaupunki
    ///    karkeuttaa laattavalintaa kuormalla (karkea kamera, ei tilesetin uudelleenluontia). Lampo hoitaa serious-tason
    ///    fps-katon ja renderScalen kuten iOS:llä (MatkakirjaMacSyote_Laite → Lampo.ThermalState).
    /// 3) LOKI: "MATKAKIRJA mac-laatu: profiili …" käynnistyksessä ja "kuorma …", kun kuorma muuttuu ≥ 0,1.
    /// </summary>
    public sealed class MacLaatu : MonoBehaviour
    {
        public const double VahanVapaanGt = 6.0;
        const float KehysYla = 0.025f, KehysAla = 0.018f;

        public static bool Kaytossa { get; private set; }
        public static string Profiili { get; private set; } = "-";
        /// <summary>Googlen 3D-kaupungin SSE (ilman näyttökerrointa); 0 = ei Mac-profiilia.</summary>
        public static float GoogleSse { get; private set; }
        /// <summary>Käyttämättömien laattojen välimuisti tavuina; 0 = ei Mac-profiilia.</summary>
        public static long Valimuisti { get; private set; }
        /// <summary>Pehmeä kuormakerroin (1 = täysi laatu); laattavalinta karkeutuu tällä.</summary>
        public static float Kuorma { get; private set; } = 1f;
        public static double FyysinenGt { get; private set; }
        public static double VapaaGt { get; private set; } = -1;
        public static int ThermalState { get; private set; }
        public static bool Virransaasto { get; private set; }

        float kehysKa = -1f, kehysKuorma = 1f, kirjattuKuorma = 1f, seuraavaLaite;

#if UNITY_STANDALONE_OSX && !UNITY_EDITOR
        [System.Runtime.InteropServices.DllImport("MatkakirjaMacSyote")]
        static extern void MatkakirjaMacSyote_Laite(double[] ulos);

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Luo()
        {
            var go = new GameObject("MacLaatu");
            DontDestroyOnLoad(go);
            go.AddComponent<MacLaatu>();
        }
#endif

        /// <summary>Lukee muistin, thermalStaten ja virransäästön (Lampo kutsuu 2 s:n välein); muualla kuin Macilla ei mitään.</summary>
        public static void LueLaite()
        {
#if UNITY_STANDALONE_OSX && !UNITY_EDITOR
            var u = new double[4];
            try { MatkakirjaMacSyote_Laite(u); }
            catch (Exception) { return; }
            FyysinenGt = u[0] / (1L << 30);
            VapaaGt = u[1] > 0 ? u[1] / (1L << 30) : -1;
            ThermalState = (int)u[2];
            Virransaasto = u[3] > 0.5;
#endif
        }

        /// <summary>Profiili fyysisestä muistista (GiB): Googlen SSE ja välimuisti; vähän vapaata → porras karkeammaksi.</summary>
        public static (string nimi, float sse, long valimuisti) ValitseProfiili(double fyysinenGt, double vapaaGt)
        {
            (string, float, long) p = fyysinenGt >= 48 ? ("iso (≥ 48 Gt)", 6f, 2048L << 20)
                : fyysinenGt >= 24 ? ("keski (24–48 Gt)", 8f, 1024L << 20)
                : fyysinenGt >= 15 ? ("kevyt (16 Gt)", 10f, 512L << 20)
                : ("pieni (≤ 8 Gt)", 12f, 256L << 20);
            if (vapaaGt >= 0 && vapaaGt < VahanVapaanGt)
                p = (p.Item1 + ", vähän vapaata", Mathf.Min(p.Item2 + 2f, 14f), Math.Max(256L << 20, p.Item3 / 2));
            return p;
        }

        void Awake()
        {
            LueLaite();
            (Profiili, GoogleSse, Valimuisti) = ValitseProfiili(FyysinenGt, VapaaGt);
            Kaytossa = true;
            Debug.Log($"MATKAKIRJA mac-laatu: profiili {Profiili}, muisti {FyysinenGt:F0} Gt (vapaa {VapaaGt:F1} Gt), " +
                      $"Google-SSE {GoogleSse:F0}, välimuisti {Valimuisti >> 20} Mt, thermalState {ThermalState}, virransäästö {Virransaasto}");
        }

        void Update()
        {
            float dt = Time.unscaledDeltaTime;
            if (Time.unscaledTime >= seuraavaLaite) { seuraavaLaite = Time.unscaledTime + 2f; LueLaite(); }

            // Kehysaika vain täydellä taajuudella (lepo ja paikallaan piirtävät tarkoituksella harvemmin).
            var r = Ruudunpaivitys.Instanssi;
            // Ei käynnistyksen 20 s:n eikä latausverhon aikana (Mac Studio -mittaus 7.10.: latausnykäykset 80 ms nostivat kuorman
            // 1,5:een ennen kaupunkia), ja yksittäinen nykäys rajataan 50 ms:iin, jottei se hallitse keskiarvoa.
            bool taysi = r != null && r.Nyt == Ruudunpaivitys.Tila.Taysi && Application.targetFrameRate >= 60
                && r.Syy != "verho" && !Valmius.Verhossa && Time.realtimeSinceStartup > 20f;
            if (taysi && dt > 0f && dt < 0.5f)
            {
                float d = Mathf.Min(dt, 0.05f);
                kehysKa = kehysKa < 0f ? d : Mathf.Lerp(kehysKa, d, 1f - Mathf.Exp(-dt / 2f));
                if (kehysKa > KehysYla) kehysKuorma = Mathf.Min(2f, kehysKuorma * (1f + 0.05f * dt));
                else if (kehysKa < KehysAla) kehysKuorma = Mathf.Max(1f, kehysKuorma * (1f - 0.02f * dt));
            }

            float lampo = ThermalState >= 3 ? 2.2f : ThermalState == 2 ? 1.6f : ThermalState == 1 || Virransaasto ? 1.25f : 1f;
            float tavoite = Mathf.Max(lampo, kehysKuorma);
            float tau = tavoite > Kuorma ? 6f : 20f;
            Kuorma = Mathf.Lerp(Kuorma, tavoite, 1f - Mathf.Exp(-dt / tau));
            if (Mathf.Abs(Kuorma - kirjattuKuorma) >= 0.1f)
            {
                kirjattuKuorma = Kuorma;
                Debug.Log($"MATKAKIRJA mac-laatu: kuorma {Kuorma:F2} (thermalState {ThermalState}, virransäästö {Virransaasto}, " +
                          $"kehys {kehysKa * 1000f:F1} ms → {kehysKuorma:F2}, vapaa {VapaaGt:F1} Gt)");
            }
        }
    }
}
