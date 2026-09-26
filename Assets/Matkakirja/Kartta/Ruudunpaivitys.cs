using System;
using System.Collections.Generic;
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
    /// Löydös S10 (Natiiviseppä 26.9.): TÄYDEN tilan katto <see cref="LiikeKatto"/> A/B-mittaukseen (komento `ruutu liike
    /// 120|60` komento.txt:ssä, Komennot.cs).
    /// </summary>
    [DefaultExecutionOrder(10000)]
    public sealed class Ruudunpaivitys : MonoBehaviour
    {
        public const float TaysiPitoS = 0.5f;
        public const int LepoFps = 30, KuumaFps = 30, KriittinenFps = 20;
        /// <summary>PAIKALLAAN-tilan piirtoväli kehyksinä (30 fps:llä 2 s).</summary>
        public const int PaikallaanVali = 60;
        public const float KuumaSkaala = 0.7f;

        /// <summary>KERROS (löydös 161 B, ElavaKerros): kuten PAIKALLAAN, mutta elävän kerroksen animaatiot piirtyvät omalla
        /// taajuudellaan (kartta talletettuna, vain Elava-layer).</summary>
        public enum Tila { Taysi, Lepo, Paikallaan, Kerros }

        public static Ruudunpaivitys Instanssi { get; private set; }

        /// <summary>
        /// Verhon aikana täysi taajuus (Valmius.Verhossa): Cesium etenee pääsäikeessä kehys kerrallaan, joten lepotilan 30 fps
        /// hidasti mustan ja aloitusverhon latausta. Kehittäjälippu A/B: PlayerPrefs matkakirja-verho-taysi 0 = pois.
        /// </summary>
        public static bool VerhoTaysi
        {
            get
            {
#if !MATKAKIRJA_APPSTORE
                if (verhoTaysi < 0) verhoTaysi = PlayerPrefs.GetInt("matkakirja-verho-taysi", 1);
                return verhoTaysi != 0;
#else
                return true;
#endif
            }
        }
        static int verhoTaysi = -1;
        /// <summary>Löydös 163: PAIKALLAAN-tilassa valmistuneet laattahaut, jotka herättivät piirron.</summary>
        public static int Vartija163 { get; private set; }
        long paikallaanHaut;
        /// <summary>UI rauhassa: ei animaatiota, kirjoituskonetta, pulun liikettä tai siirtymää (Natiivi-UI asettaa).</summary>
        public static Func<bool> UiRauhassa;
        /// <summary>Lisäehdot täydelle taajuudelle (esim. linssin ajo): mikä tahansa tosi = TÄYSI.</summary>
        public static readonly List<Func<bool>> Aktiivinen = new List<Func<bool>>();

        /// <summary>
        /// LÖYDÖS S10 (Natiiviseppä 26.9.2026): TÄYDEN tilan katto hertseinä liikkeen A/B-mittaukseen (120 vs 60 Hz,
        /// lämpö); 0 = näytön taajuus (oletus, ennallaan). Verhon aikana ei kattoa (Cesium etenee kehys kerrallaan).
        /// Komento `ruutu liike 120|60|pois` (Komennot.cs); KehysMittari kirjaa sen riville ("liikeKatto").
        /// </summary>
        public static int LiikeKatto;

        public Tila Nyt { get; private set; } = Tila.Taysi;
        public int Naytto { get; private set; } = 60;
        public string Syy { get; private set; } = "";

        static float herattyAsti;
        PalloKierto kierto;
        Camera kamera;
        Nappula nappula;
        float viimeLiike;
        bool kameraPois;
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
        static void Nollaa() { Instanssi = null; UiRauhassa = null; Aktiivinen.Clear(); herattyAsti = 0; LiikeKatto = 0; }

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
            // Elävä kerros (ElavaKerros): paikallaan, mutta Elava-kohteet animoivat → piirto joka kehys vain niille.
            int kerrosFps = 0;
            if (uusi == Tila.Paikallaan && !kameraPois && ElavaKerros.Tarvitaan(out kerrosFps)) { uusi = Tila.Kerros; Syy = "elävä kerros"; }
            else if (ElavaKerros.Pakota == ElavaKerros.Pakotus.Kerros && !kameraPois && uusi == Tila.Lepo && ElavaKerros.Tarvitaan(out kerrosFps)) { uusi = Tila.Kerros; Syy = "elävä kerros (pakotettu)"; }
            ElavaKerros.Pyyda(uusi == Tila.Kerros, kerrosFps);
            // VARTIJA 163: Cesiumin laattoja valmistui, kun ruutu ei piirrä (PAIKALLAAN). PallonLepo huomaa asteen muutoksen
            // yleensä itse; tämä kirjaa ja korjaa aukon (laatat saapuivat, ruutu ei päivittynyt).
            long haut = Laattapalvelin.CesiumValmiita;
            if (uusi == Tila.Paikallaan && Nyt == Tila.Paikallaan && haut != paikallaanHaut)
            {
                Vartija163++;
                if (Vartija163 <= 20 || Vartija163 % 100 == 0)
                    Debug.Log($"MATKAKIRJA VARTIJA 163: {haut - paikallaanHaut} laattaa saapui paikallaan-tilassa → herätys (#{Vartija163})");
                PallonLepo.Valmistui("vartija 163");
            }
            paikallaanHaut = haut;

            int katto = Lampo.Taso == Lampotaso.Kriittinen ? KriittinenFps : Lampo.Taso == Lampotaso.Kuuma ? KuumaFps : Naytto;
            int taysi = Syy == "verho" ? Naytto : LiikeLaatatPaatos.Katto(Naytto, LiikeKatto);   // löydös S10: liikkeen katto
            int fps = Math.Min(uusi == Tila.Taysi ? taysi : uusi == Tila.Kerros ? kerrosFps : LepoFps, katto);
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
            if (VerhoTaysi && Valmius.Verhossa) return "verho";
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
            // Pallo (Natiiviseppä, PallonLepo): kamera levossa, kaikki tilesetit valmiit ja vakaat, palvelin vapaa, herätys ohi
            // ja kartan animaatiot seis. Korvaa entisen Laattapalvelin.Kiireinen- ja ComputeLoadProgress-ehdon (Fable 25.9.).
            if (!PallonLepo.Lepaa(out var pallonSyy)) { syy = pallonSyy; return true; }
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
            // Myös normaalilämmössä perusarvo, jottei jäähtyminen kesken sumennuksen jätä kuumaa 0,7:ää (Natiiviseppä 25.9.).
            PalloSumennus.PerusSkaala = kuuma ? KuumaSkaala : (perusSkaala > 0f ? perusSkaala : (float?)null);
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
            $"näyttö {Naytto} Hz, liikkeen katto {(LiikeKatto > 0 ? LiikeKatto + " Hz" : "ei")}, lämpö {Lampo.Taso} (thermalState {Lampo.ThermalState}, virransäästö {Lampo.Virransaasto}), " +
            $"kamera {(kameraPois ? "pois" : "päällä")}, renderScale {(asetus != null ? asetus.renderScale : -1f):0.##}";
    }
}
