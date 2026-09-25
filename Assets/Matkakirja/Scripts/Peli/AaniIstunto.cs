// ÄÄNI-ISTUNTO HETI KÄYNNISTYKSESSÄ (Pelikoodari, omistajan löydös 49, build 11: "tuleehan kaikki äänet natiiviin
// myös? Vielä ei ole mitään"). Unityn oletusistunto on Ambient, jonka iPadin äänetön tila ja iPhonen kytkin
// mykistävät. Playback asetettiin ennen vasta ensimmäisestä puheesta (Puhe.cs, Aanisoitin.cs), joten tehosteet,
// musiikki ja pulu olivat siihen asti mykkiä — ja jos luento ei alkanut, koko peli. Web soi mykistettynäkin
// (Safarin <audio>), joten natiivi asettaa Playbackin (MixWithOthers) heti ja uudelleen etualalle palatessa:
// Unity voi palauttaa oman istuntonsa keskeytyksen tai taustalta paluun jälkeen.
//
// KUUNTELIJA (löydös 49, mitattu 25.9. klo 01.1x): generoidussa kohtauksessa Pallo.unity (Editor/Rakennus.cs LuoPallo)
// ei ole AudioListeneria, eikä kohtauksessa ole koskaan ollut (d464ffa 23.9. alkaen). Ilman kuuntelijaa Unity ei
// miksaa mitään: aani mittaa antoi rms 0 simulaattorissa ja isolla iPadilla (b12q), vaikka lähteet soivat @1,00,
// ja myös omasta klipistä soitettu 440 Hz:n siniääni (aani sini) oli hiljaa jokaisella istunnolla. Kaikki
// lähteet ovat 2D-ääniä (spatialBlend 0), joten kuuntelijan paikalla ei ole väliä: se lisätään tähän pysyvään
// olioon, jos kohtauksessa ei ole omaa.
//
// Unity palauttaa oman Ambient-istuntonsa, kun se käynnistää äänen uudelleen (mitattu: aani nollaa → Ambient),
// joten Playback asetetaan uudelleen myös OnAudioConfigurationChanged-tapahtumassa.
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
            VarmistaKuuntelija(go);
            Aseta("käynnistys");
            AudioSettings.OnAudioConfigurationChanged += _ =>
            {
                // Istunnon vaihto voi itse laukaista kokoonpanon muutoksen: enintään kerran sekunnissa, ettei synny kehää.
                if (Time.realtimeSinceStartup - viimeksiKokoonpanosta < 1f) return;
                viimeksiKokoonpanosta = Time.realtimeSinceStartup;
                Aseta("äänen kokoonpano");
            };
        }

        static float viimeksiKokoonpanosta = -10f;

        /// <summary>AudioListener pysyvään olioon, jos kohtauksessa ei ole kuuntelijaa (muuten mikään ei kuulu).</summary>
        static void VarmistaKuuntelija(GameObject go)
        {
            if (FindObjectsByType<AudioListener>(FindObjectsInactive.Exclude, FindObjectsSortMode.None).Length > 0) return;
            go.AddComponent<AudioListener>();
            Debug.Log("MATKAKIRJA ääni: kohtauksessa ei ollut AudioListeneria, lisätty (löydös 49)");
        }

        /// <summary>Aktiivisten kuuntelijoiden määrä (peli-komento aani mittaa).</summary>
        public static int Kuuntelijoita =>
            FindObjectsByType<AudioListener>(FindObjectsInactive.Exclude, FindObjectsSortMode.None).Length;

        void OnApplicationFocus(bool fokus) { if (fokus) Aseta("etualalle"); }
        void OnApplicationPause(bool tauolla) { if (!tauolla) Aseta("tauolta"); }

#if UNITY_IOS && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void MatkakirjaAani_Toisto();
        [DllImport("__Internal")] static extern string MatkakirjaAani_Tila();
        [DllImport("__Internal")] static extern string MatkakirjaAani_Vaihda(string luokka);

        /// <summary>Mittauksen istunnon vaihto (peli-komento aani istunto): playback | puhe | ambient.</summary>
        public static string Vaihda(string luokka)
        {
            try { var r = MatkakirjaAani_Vaihda(luokka ?? ""); Debug.Log("MATKAKIRJA ääni-istunto (" + luokka + "): " + r); return r.StartsWith("VIRHE") ? r : null; }
            catch (Exception e) { return e.Message; }
        }

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
        public static string Vaihda(string luokka) => "ei iOS";
#endif
    }
}
