// MATKAKIRJAN SILTA STEAM AUDIOON (Linssiseppä, 9.10.2026; omistaja 11.0x, PT hyväksyi: HRTF-koe-erä pallon 3D-äänille).
// Oma tiedosto (ei Valven), Steam Audion assemblyssä (SteamAudioUnity), jotta pelin koodi (Assembly-CSharp) kutsuu vain tätä
// aina olemassa olevaa rajapintaa: Valven luokkien jäsenet ovat #if STEAMAUDIO_ENABLED -lohkoissa, ja define tulee vain Steam
// Audion asmdefin versionDefinesistä. Ilman definea (esim. Peli-testit/unity-tarkistus.sh, joka kääntää Plugins-kansion
// firstpassina) tämä kääntyy tyngiksi: Kaynnista() palauttaa false ja Virhe kertoo syyn.
// Alustus vasta Kaynnista()-kutsusta (SteamAudioManagerin automaattinen alustus on poistettu käytöstä, ks. LAHTEET.md).
// Lähde: HRTF (oletus-HRTF libphononin sisällä), ilma-absorptio (simulaatio) ja etäisyysvaimennus Steam Audiolla Unityn
// AudioSourcen omalla käyrällä (CurveDriven: virittämät tasot säilyvät); ei okkluusiota, heijastuksia eikä polkuja.
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace SteamAudio
{
    public static class MatkakirjaSteamAudio
    {
        /// <summary>Spatialisoijan nimi ProjectSettings/AudioManager.assetissa (m_SpatializerPlugin).</summary>
        public const string SpatialisoijanNimi = "Steam Audio Spatializer";

        public static string Virhe { get; private set; }
        static readonly List<AudioSource> lahteet = new List<AudioSource>();

        /// <summary>Unityn valitsema spatialisoija (player lukee sen AudioManagerista; ajonaikaista vaihtoa ei ole).</summary>
        public static string Spatialisoija
        {
            get { try { return UnityEngine.AudioSettings.GetSpatializerPluginName() ?? ""; } catch (Exception) { return "?"; } }
        }

        /// <summary>Steam Audion lähteiden määrä (elävät AudioSourcet, joilla SteamAudioSource).</summary>
        public static int Lahteita
        {
            get { lahteet.RemoveAll(a => a == null); return lahteet.Count; }
        }

        static void Uudelleen(AudioSource a)
        {
            // spatialize vaikuttaa vasta seuraavassa Playssa: soiva silmukka käynnistetään samasta kohdasta.
            if (a == null || !a.isPlaying || a.clip == null) return;
            int t = a.timeSamples;
            a.Stop();
            a.Play();
            if (t >= 0 && t < a.clip.samples) a.timeSamples = t;
        }

#if STEAMAUDIO_ENABLED
        static bool alustettu;
        static int sukupolvi;
        static float kuulijaTarkistettu = -10f;

        public static bool Alustettu => alustettu && SteamAudioManager.Singleton != null;

        public static bool HrtfLadattu
        {
            get
            {
                try { return Alustettu && SteamAudioManager.CurrentHRTF != null && SteamAudioManager.CurrentHRTF.Get() != IntPtr.Zero; }
                catch (Exception) { return false; }
            }
        }

        /// <summary>Alustaa Steam Audion (konteksti, oletus-HRTF, simulaattori, tyhjä kohtaus, kuulija). Idempotentti.</summary>
        public static bool Kaynnista()
        {
            sukupolvi++;   // peruu odottavan sammutuksen
            if (Alustettu) return true;
            if (Spatialisoija != SpatialisoijanNimi)
            {
                Virhe = $"spatialisoija on '{Spatialisoija}', ei '{SpatialisoijanNimi}' (AudioManager.asset m_SpatializerPlugin)";
                return false;
            }
            try
            {
                Virhe = null;
                SteamAudioManager.Initialize(ManagerInitReason.Playing);
                // Kohtaus on jo ladattu (automaattinen alustus olisi tapahtunut ennen sitä): tyhjä Steam Audio -kohtaus,
                // jotta suora simulaatio (ilma-absorptio) ajetaan LateUpdatessa, ja kuulija + kamera heti.
                SteamAudioManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene(), SteamAudioManager.Context, false);
                SteamAudioManager.ScheduleCommitScene();
                SteamAudioManager.NotifyMainCameraChanged();
                EtsiKuulija();
                kuulijaTarkistettu = Time.unscaledTime;
                alustettu = true;
                if (!HrtfLadattu) Virhe = "HRTF ei latautunut (iplHRTFCreate, ks. loki)";
                Debug.Log($"MATKAKIRJA steamaudio: alustettu, HRTF {(HrtfLadattu ? "ladattu" : "EI")}, " +
                          $"{UnityEngine.AudioSettings.outputSampleRate} Hz");
                return true;
            }
            catch (Exception e)
            {
                Virhe = e.GetType().Name + ": " + e.Message;
                Debug.LogException(e);
                alustettu = false;   // puolittainen alustus jää paikalleen; komento yrittää uudelleen (kehittäjäkoe)
                return false;
            }
        }

        /// <summary>Irrottaa kaikki lähteet heti ja sammuttaa Steam Audion viiveen jälkeen (äänisäie ehtii pois efektistä).</summary>
        public static void Sammuta(float viiveS = 0.5f)
        {
            for (int i = lahteet.Count - 1; i >= 0; i--) Irrota(lahteet[i]);
            lahteet.Clear();
            if (!Alustettu) { alustettu = false; return; }
            int oma = ++sukupolvi;
            SteamAudioManager.Singleton.StartCoroutine(SammutaViiveella(oma, viiveS));
        }

        static IEnumerator SammutaViiveella(int oma, float viiveS)
        {
            yield return new WaitForSecondsRealtime(viiveS);
            if (oma != sukupolvi || !Alustettu || lahteet.Count > 0) yield break;
            var go = SteamAudioManager.Singleton.gameObject;
            try { SteamAudioManager.ShutDown(); }
            catch (Exception e) { Virhe = "sammutus: " + e.Message; Debug.LogException(e); }
            alustettu = false;
            UnityEngine.Object.Destroy(go);
            Debug.Log("MATKAKIRJA steamaudio: sammutettu");
        }

        /// <summary>Kuulija uudelleen noin sekunnin välein, jos se on kadonnut (kameran vaihto, kohtauksen vaihto).</summary>
        public static void Paivita()
        {
            if (!Alustettu || Time.unscaledTime - kuulijaTarkistettu < 1f) return;
            kuulijaTarkistettu = Time.unscaledTime;
            if (kuulija == null || !kuulija.isActiveAndEnabled) EtsiKuulija();
        }

        static AudioListener kuulija;

        /// <summary>Aktiivinen AudioListener Steam Audiolle (pallossa Kamera-olio; Valven oma haku ottaa ensimmäisen, myös pois päältä olevan).</summary>
        static void EtsiKuulija()
        {
            kuulija = null;
            foreach (var l in UnityEngine.Object.FindObjectsByType<AudioListener>(FindObjectsSortMode.None))
                if (l.isActiveAndEnabled) { kuulija = l; break; }
            SteamAudioManager.NotifyAudioListenerChangedTo(kuulija != null ? kuulija.transform : null);
        }

        /// <summary>Steam Audio lähteeseen (vaatii Kaynnista()). 3D-lähde (spatialBlend 1); palauttaa false, jos ei alustettu.</summary>
        public static bool Liita(AudioSource a)
        {
            if (a == null || !Alustettu) return false;
            var s = a.GetComponent<SteamAudioSource>();
            if (s == null)
            {
                s = a.gameObject.AddComponent<SteamAudioSource>();
                s.directBinaural = true;
                s.interpolation = HRTFInterpolation.Bilinear;
                s.distanceAttenuation = true;
                s.distanceAttenuationInput = DistanceAttenuationInput.CurveDriven;
                s.airAbsorption = true;
                s.airAbsorptionInput = AirAbsorptionInput.SimulationDefined;
                s.directivity = false;
                s.occlusion = false;
                s.transmission = false;
                s.reflections = false;
                s.pathing = false;
            }
            if (!a.spatialize)
            {
                a.spatialize = true;
                a.spatializePostEffects = false;
                Uudelleen(a);
            }
            if (!lahteet.Contains(a)) lahteet.Add(a);
            return true;
        }
#else
        public static bool Alustettu => false;
        public static bool HrtfLadattu => false;

        public static bool Kaynnista()
        {
            Virhe = "STEAMAUDIO_ENABLED puuttuu (Steam Audion assembly käännetty ilman definea)";
            return false;
        }

        public static void Sammuta(float viiveS = 0.5f)
        {
            for (int i = lahteet.Count - 1; i >= 0; i--) Irrota(lahteet[i]);
            lahteet.Clear();
        }

        public static void Paivita() { }

        public static bool Liita(AudioSource a) => false;
#endif

        /// <summary>Steam Audio pois lähteestä: SteamAudioSource pois heti ja spatialize = false (Unityn oma panorointi).</summary>
        public static void Irrota(AudioSource a)
        {
            if (a == null) return;
            var s = a.GetComponent<SteamAudioSource>();
            if (s != null) UnityEngine.Object.DestroyImmediate(s);
            if (a.spatialize)
            {
                a.spatialize = false;
                Uudelleen(a);
            }
            lahteet.Remove(a);
        }
    }
}
