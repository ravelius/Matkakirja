using System;
using System.Runtime.InteropServices;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>Laitteen lämpötaso pelin kannalta.</summary>
    public enum Lampotaso { Normaali, Kuuma, Kriittinen }

    /// <summary>
    /// LÄMPÖTILA JA VIRRANSÄÄSTÖ (Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA kohta 2, omistaja 25.9.2026, Pelikoodari):
    /// iOS:n thermalState (Plugins/iOS/MatkakirjaLampo.mm) ja Low Power Mode luetaan kahden sekunnin välein
    /// (Paivita joka kehys: LampoMittari ja Ruudunpaivitys). serious tai virransäästö = Kuuma (katto 30 fps, renderScale 0,7, bloom pois,
    /// Esilataajan tasot Kohdekaupungit ja Muu seis); critical = Kriittinen (katto 20 fps, muuten kuten Kuuma).
    /// Testikomento `lampo normaali|kuuma|kriittinen|auto` pakottaa tason (simulaattorissa thermalState on aina 0).
    /// </summary>
    public static class Lampo
    {
#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern int MatkakirjaLampo_Tila();
        [DllImport("__Internal")] static extern int MatkakirjaLampo_Virransaasto();
#else
        static int MatkakirjaLampo_Tila() => 0;
        static int MatkakirjaLampo_Virransaasto() => 0;
#endif
        public static Lampotaso Taso { get; private set; }
        /// <summary>iOS:n raaka-arvot viimeisimmästä luvusta (0–3, virransäästö).</summary>
        public static int ThermalState { get; private set; }
        public static bool Virransaasto { get; private set; }
        /// <summary>Pakotettu taso (testikomento) tai null = laitteen mukaan.</summary>
        public static Lampotaso? Pakotettu { get; set; }
        public static bool Kuuma => Taso != Lampotaso.Normaali;
        public static event Action<Lampotaso> Muuttui;

        static float seuraava;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Taso = Lampotaso.Normaali; Pakotettu = null; seuraava = 0; Muuttui = null; }

        /// <summary>Pääsäie, joka kehys: lukee laitteen tilan kahden sekunnin välein (ja heti, kun pakotus muuttuu).</summary>
        public static void Paivita(bool heti = false)
        {
            if (!heti && Time.unscaledTime < seuraava) return;
            seuraava = Time.unscaledTime + 2f;
            try { ThermalState = MatkakirjaLampo_Tila(); Virransaasto = MatkakirjaLampo_Virransaasto() != 0; }
            catch (Exception) { ThermalState = 0; Virransaasto = false; }
            var uusi = Pakotettu ?? (ThermalState >= 3 ? Lampotaso.Kriittinen
                : ThermalState == 2 || Virransaasto ? Lampotaso.Kuuma : Lampotaso.Normaali);
            if (uusi == Taso) return;
            Taso = uusi;
            Debug.Log($"MATKAKIRJA lämpö: {Taso} (thermalState {ThermalState}, virransäästö {Virransaasto}{(Pakotettu != null ? ", pakotettu" : "")})");
            Muuttui?.Invoke(Taso);
        }
    }
}
