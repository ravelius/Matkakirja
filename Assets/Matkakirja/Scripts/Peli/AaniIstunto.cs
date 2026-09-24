// ÄÄNI-ISTUNTO HETI KÄYNNISTYKSESSÄ (Pelikoodari, omistajan löydös 49, build 11: "tuleehan kaikki äänet natiiviin
// myös? Vielä ei ole mitään"). Unityn oletusistunto on Ambient, jonka iPadin äänetön tila ja iPhonen kytkin
// mykistävät. Playback asetettiin ennen vasta ensimmäisestä puheesta (Puhe.cs, Aanisoitin.cs), joten tehosteet,
// musiikki ja pulu olivat siihen asti mykkiä — ja jos luento ei alkanut, koko peli. Web soi mykistettynäkin
// (Safarin <audio>), joten natiivi asettaa Playbackin (MixWithOthers) heti ja uudelleen etualalle palatessa:
// Unity voi palauttaa oman istuntonsa keskeytyksen tai taustalta paluun jälkeen.
using System;
using System.Runtime.InteropServices;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class AaniIstunto : MonoBehaviour
    {
        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            var go = new GameObject("MatkakirjaAaniIstunto");
            go.hideFlags = HideFlags.HideInHierarchy;
            DontDestroyOnLoad(go);
            go.AddComponent<AaniIstunto>();
            Aseta("käynnistys");
        }

        void OnApplicationFocus(bool fokus) { if (fokus) Aseta("etualalle"); }
        void OnApplicationPause(bool tauolla) { if (!tauolla) Aseta("tauolta"); }

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaAani_Toisto();
        [DllImport("__Internal")] static extern string MatkakirjaAani_Tila();

        /// <summary>Playback + MixWithOthers + setActive (MatkakirjaAani.mm).</summary>
        public static void Aseta(string syy)
        {
            try { MatkakirjaAani_Toisto(); Debug.Log("MATKAKIRJA ääni-istunto (" + syy + "): " + Tila()); }
            catch (Exception e) { Debug.LogWarning("MATKAKIRJA ääni-istunto: " + e.Message); }
        }

        /// <summary>Istunnon luokka, tila, voimakkuus ja reitti tekstinä (peli-komento aani mittaa).</summary>
        public static string Tila()
        {
            try { return MatkakirjaAani_Tila(); }
            catch (Exception e) { return "ei luettavissa: " + e.Message; }
        }
#else
        public static void Aseta(string syy) { }
        public static string Tila() => "ei iOS";
#endif
    }
}
