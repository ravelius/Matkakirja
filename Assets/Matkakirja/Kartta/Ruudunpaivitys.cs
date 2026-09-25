using System;
using System.Collections.Generic;
using CesiumForUnity;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja
{
    /// <summary>
    /// DYNAAMINEN RUUDUNPÄIVITYS (Raamattu LÄMPÖ JA VIRRANKULUTUS NATIIVISSA kohdat 1–2, omistaja 25.9.2026, Pelikoodari).
    /// Ainoa, joka kirjoittaa Application.targetFrameRaten ja OnDemandRendering.renderFrameIntervalin:
    ///   TÄYSI     näytön taajuus (120/60 Hz), kun jokin liikkuu: sormi ruudulla, pallon liuku/ajo/seuranta/portti
    ///             (PalloKierto.Liikkeessa), nappulan lento, <see cref="Herata"/>-kutsu (UI-animaatiot, linssiajot) tai
    ///             <see cref="Aktiivinen"/>-ehto. Pysyy 0,5 s viimeisestä liikkeestä.
    ///   LEPO      30 fps; piirto joka kehys, kun jokin muuttuu (laatat latautuvat, UI ei ole rauhassa).
    ///   PAIKALLAAN  30 fps silmukka, mutta piirto vain joka <see cref="PaikallaanVali"/>. kehys (webin lepopiirron
    ///             vastine): kamera levossa, laatat valmiit ja muuttumatta, UI rauhassa (<see cref="UiRauhassa"/>,
    ///             Natiivi-UI; ilman sitä ei koskaan PAIKALLAAN). Kosketus tai muutos palauttaa piirron heti.
    /// Koko ruudun peitossa (PalloKierto.Peitetty, esim. lehti) pallon kamera on pois: UI piirtyy omalla tahdillaan
    /// eikä Cesium valitse laattoja (välimuisti säilyy). Ennen piirto harvennettiin peitossa (renderFrameInterval 4),
    /// mikä hidasti myös UI:n (löydös 101).
    /// Lämpö (Lampo): Kuuma → katto 30 fps, renderScale 0,7 (PalloSumennus.PerusSkaala), bloom pois;
    /// Kriittinen → katto 20 fps.
    /// Testikomento `ruutu` (peli-komento.txt) kertoo tilan; `lampo …` pakottaa lämpötason.
    /// </summary>
    [DefaultExecutionOrder(10000)]
    public sealed class Ruudunpaivitys : MonoBehaviour
    {
        public const float TaysiPitoS = 0.5f;
        public const int LepoFps = 30, KuumaFps = 30, KriittinenFps = 20;
        /// <summary>PAIKALLAAN-tilan piirtoväli kehyksinä (30 fps:llä 2 s).</summary>
        public const int PaikallaanVali = 60;
        public const float KuumaSkaala = 0.7f;

        public enum Tila { Taysi, Lepo, Paikallaan }

        public static Ruudunpaivitys Instanssi { get; private set; }
        /// <summary>UI rauhassa: ei animaatiota, kirjoituskonetta, pulun liikettä tai siirtymää (Natiivi-UI asettaa).</summary>
        public static Func<bool> UiRauhassa;
        /// <summary>Lisäehdot täydelle taajuudelle (esim. linssin ajo): mikä tahansa tosi = TÄYSI.</summary>
        public static readonly List<Func<bool>> Aktiivinen = new List<Func<bool>>();

        public Tila Nyt { get; private set; } = Tila.Taysi;
        public int Naytto { get; private set; } = 60;
        public string Syy { get; private set; } = "";

        static float herattyAsti;
        PalloKierto kierto;
        Camera kamera;
        Nappula nappula;
        Cesium3DTileset pallo;
        float viimeLiike, edellinenAste = -1f;
        bool edellinenKiire, kameraPois;
        UniversalRenderPipelineAsset asetus;
        float perusSkaala = -1f;
        Lampotaso sovellettuLampo = Lampotaso.Normaali;
        Bloom bloom;
        bool bloomAlussa;

        /// <summary>Täysi taajuus vähintään s sekunniksi (UI-animaatio, siirtymä, linssiajo). Kutsu pääsäikeestä.</summary>
        public static void Herata(float s = TaysiPitoS)
        {
            float asti = Time.unscaledTime + s;
            if (asti > herattyAsti) herattyAsti = asti;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { Instanssi = null; UiRauhassa = null; Aktiivinen.Clear(); herattyAsti = 0; }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (Instanssi != null) return;
            var go = new GameObject("Ruudunpaivitys");
            DontDestroyOnLoad(go);
            go.AddComponent<Ruudunpaivitys>();
        }

        void Awake()
        {
            Instanssi = this;
            var t = Screen.currentResolution.refreshRateRatio.value;
            Naytto = t > 1 ? (int)Math.Round(t) : 60;
            Application.targetFrameRate = Naytto;
            OnDemandRendering.renderFrameInterval = 1;
            asetus = GraphicsSettings.currentRenderPipeline as UniversalRenderPipelineAsset;
            if (asetus != null) perusSkaala = asetus.renderScale;
            viimeLiike = Time.unscaledTime;
            Debug.Log($"MATKAKIRJA ruutu: näyttö {Naytto} Hz, lepo {LepoFps} fps, renderScale {perusSkaala:0.##}");
        }

        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
            OnDemandRendering.renderFrameInterval = 1;
            if (kamera != null && kameraPois) kamera.enabled = true;
            PalloSumennus.PerusSkaala = null;
            if (asetus != null && perusSkaala > 0f && !PalloKierto.PorttiSumea && !PalloKierto.KuvaSumea) asetus.renderScale = perusSkaala;
            if (bloom != null) bloom.active = bloomAlussa;
        }

        void Etsi()
        {
            if (kierto == null) { kierto = FindAnyObjectByType<PalloKierto>(); kamera = kierto != null ? kierto.GetComponent<Camera>() : null; }
            if (nappula == null) nappula = FindAnyObjectByType<Nappula>();
            if (pallo == null) pallo = FindAnyObjectByType<Cesium3DTileset>();
        }

        void LateUpdate()
        {
            Lampo.Paivita();
            if (Lampo.Taso != sovellettuLampo) SovellaLampo();
            if (Time.frameCount % 30 == 0 || kierto == null) Etsi();

            float nyt = Time.unscaledTime;
            string syy = LiikkeenSyy();
            if (syy != null) { viimeLiike = nyt; Syy = syy; }

            // Peitossa (koko ruudun lehti tms.) pallon kamera pois; UI piirtyy silti.
            bool peitto = kierto != null && kierto.Peitetty;
            if (kamera != null && peitto != kameraPois)
            {
                kameraPois = peitto;
                kamera.enabled = !peitto;
                Debug.Log($"MATKAKIRJA ruutu: pallon kamera {(peitto ? "pois (peitto)" : "päälle")}");
            }

            Tila uusi;
            if (nyt - viimeLiike < TaysiPitoS) uusi = Tila.Taysi;
            else if (Muuttuu(out var muutos)) { uusi = Tila.Lepo; Syy = muutos; }
            else { uusi = Tila.Paikallaan; Syy = "paikallaan"; }

            int katto = Lampo.Taso == Lampotaso.Kriittinen ? KriittinenFps : Lampo.Taso == Lampotaso.Kuuma ? KuumaFps : Naytto;
            int fps = Math.Min(uusi == Tila.Taysi ? Naytto : LepoFps, katto);
            int vali = uusi == Tila.Paikallaan ? PaikallaanVali : 1;
            if (Application.targetFrameRate != fps) Application.targetFrameRate = fps;
            if (OnDemandRendering.renderFrameInterval != vali) OnDemandRendering.renderFrameInterval = vali;
            if (uusi != Nyt) Nyt = uusi;
        }

        /// <summary>Syy täydelle taajuudelle tai null.</summary>
        string LiikkeenSyy()
        {
            if (Kosketus.activeTouches.Count > 0) return "kosketus";
            if (kierto != null && kierto.Liikkeessa && !kierto.Peitetty) return "pallo";
            if (nappula != null && nappula.Liikkeessa) return "lento";
            if (Time.unscaledTime < herattyAsti) return "herätys";
            for (int i = 0; i < Aktiivinen.Count; i++)
            {
                bool a;
                try { a = Aktiivinen[i](); } catch (Exception) { a = false; }
                if (a) return "aktiivinen";
            }
            return null;
        }

        /// <summary>Jokin muuttuu ilman liikettä (piirto joka kehys 30 fps:llä): laatat tai UI.</summary>
        bool Muuttuu(out string syy)
        {
            bool kiire = Laattapalvelin.Kiireinen;
            float aste = pallo != null && !kameraPois ? pallo.ComputeLoadProgress() : 100f;
            bool laatat = kiire || kiire != edellinenKiire || aste < 100f || aste != edellinenAste;
            edellinenKiire = kiire;
            edellinenAste = aste;
            if (laatat) { syy = "laatat"; return true; }
            bool rauhassa;
            try { rauhassa = UiRauhassa != null && UiRauhassa(); } catch (Exception) { rauhassa = false; }
            if (!rauhassa) { syy = UiRauhassa == null ? "ui (ei lepokyselyä)" : "ui"; return true; }
            syy = null;
            return false;
        }

        void SovellaLampo()
        {
            sovellettuLampo = Lampo.Taso;
            bool kuuma = Lampo.Kuuma;
            float skaala = kuuma ? KuumaSkaala : perusSkaala;
            // PalloSumennus (portti, kuvasumennus) palauttaa tähän arvoon; sen aikana renderScalea ei kirjoiteta.
            PalloSumennus.PerusSkaala = kuuma ? KuumaSkaala : (float?)null;
            if (asetus != null && skaala > 0f && !PalloKierto.PorttiSumea && !PalloKierto.KuvaSumea) asetus.renderScale = skaala;
            if (bloom == null && Filmipino.Instanssi != null && Filmipino.Instanssi.volyymi != null
                && Filmipino.Instanssi.volyymi.profile != null && Filmipino.Instanssi.volyymi.profile.TryGet(out bloom))
                bloomAlussa = bloom.active;
            if (bloom != null) bloom.active = !kuuma && bloomAlussa;
            Debug.Log($"MATKAKIRJA ruutu: lämpö {Lampo.Taso} → katto {(Lampo.Taso == Lampotaso.Kriittinen ? KriittinenFps : kuuma ? KuumaFps : Naytto)} fps, " +
                      $"renderScale {skaala:0.##}, bloom {(bloom != null ? (bloom.active ? "päällä" : "pois") : "-")}");
        }

        /// <summary>Tila testikomennolle `ruutu`.</summary>
        public string Kuvaus() =>
            $"tila {Nyt} ({Syy}), fps {Application.targetFrameRate}, piirtoväli {OnDemandRendering.renderFrameInterval}, " +
            $"näyttö {Naytto} Hz, lämpö {Lampo.Taso} (thermalState {Lampo.ThermalState}, virransäästö {Lampo.Virransaasto}), " +
            $"kamera {(kameraPois ? "pois" : "päällä")}, renderScale {(asetus != null ? asetus.renderScale : -1f):0.##}";
    }
}
