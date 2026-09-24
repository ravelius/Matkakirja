using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Matkakirja
{
    /// <summary>
    /// FILMIEFEKTIPINO (ELOKUVALLINEN ALOITUSLENTO erä 3, Natiiviseppä 24.9.2026): lennon ajan URP-jälkikäsittely
    /// ja koneen heijastukset. Vain lennoilla (Nappula.Lento kytkee), muuten kamera piirtää ilman jälkikäsittelyä
    /// eikä pino maksa mitään. Budjetti 3–5 ms iPhonella.
    ///
    /// Profiili on asset (Rakennus.LuoPallo: Assets/Matkakirja/Asetukset/Filmipino.asset), koska URP karsii
    /// käännöksestä jälkikäsittelyvariantit, joita mikään kohtauksen profiili ei käytä: ajonaikana luotu profiili
    /// jäisi laitteella hiljaa vaikutuksettomaksi. Pinossa: sävy (Neutral), värisävy (lämmin valkotasapaino,
    /// kevyt kontrasti, split toning), bloom (auringon kiilto metallilla), vinjetti, filmirae ja lähikuvassa
    /// Gaussin syväterävyys koneen takana (kone terävä, maa pehmenee).
    ///
    /// Heijastusluotain: kone on peilaavaa alumiinia, joten ilman luotainta se heijastaa vain tasaista ympäristöä.
    /// Reaaliaikainen 128 px:n luotain seuraa konetta ja piirtää vain taivaan (cullingMask 0 → pelkkä skybox:
    /// Aurinko.taivas lennon ajan). Päivitys 1,5 s välein, koska taivas muuttuu hitaasti. Pallon laattojen
    /// piirto luotaimeen (maa koneen vatsassa) vasta mittauksen jälkeen: kuusi Cesium-piirtoa lisää.
    /// </summary>
    public sealed class Filmipino : MonoBehaviour
    {
        public static Filmipino Instanssi { get; private set; }

        public Camera kamera;
        public Volume volyymi;
        [Tooltip("Häivytyksen kesto sisään ja ulos (s).")]
        public float haivytysS = 0.8f;
        [Tooltip("Konetta seuraava heijastusluotain. Pois: iPad-simulaattorissa 24.9. luotain (vain skybox) antoi mustan\n" +
                 "kuution, ja täysmetallinen kone muuttui mustaksi. Takaisin, kun luotaimen piirto on todennettu laitteella.")]
        public bool heijastus = false;
        [Tooltip("Heijastusluotaimen päivitysväli (s).")]
        public float luotainValiS = 1.5f;

        bool paalla;
        float lahikuva;
        DepthOfField syvyys;
        ReflectionProbe luotain;
        int luotainPiirto = -1;
        float seuraavaLuotain;

        void Awake()
        {
            Instanssi = this;
            if (volyymi != null)
            {
                volyymi.weight = 0f;
                volyymi.enabled = false;
                // profile (ei sharedProfile): ajonaikainen kopio, jottei syväterävyyden säätö kirjoita assetiin editorissa.
                if (volyymi.profile != null) volyymi.profile.TryGet(out syvyys);
            }
        }

        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
        }

        /// <summary>Lennon alku ja loppu (Nappula). Häivyttyy haivytysS:n aikana.</summary>
        public void Paalle(bool paalle)
        {
            paalla = paalle;
            if (paalle)
            {
                if (volyymi != null) volyymi.enabled = true;
                Jalkikasittely(true);
                seuraavaLuotain = 0f;
            }
        }

        /// <summary>
        /// Joka kehys lennon aikana: lähikuvan osuus 0–1 (koneen koko ruudusta) ja kameran etäisyys koneeseen (m).
        /// Syväterävyys vain lähikuvassa: tarkennus koneeseen, maa sen takana pehmenee.
        /// </summary>
        public void Kuvaa(float lahikuvaOsuus, float koneEtaisyysM, Vector3 konePaikka)
        {
            lahikuva = Mathf.Clamp01(lahikuvaOsuus);
            if (syvyys != null)
            {
                bool paalle = lahikuva > 0.05f && koneEtaisyysM > 0f;
                syvyys.active = paalle;
                if (paalle)
                {
                    syvyys.gaussianStart.Override(koneEtaisyysM * 1.6f);
                    syvyys.gaussianEnd.Override(koneEtaisyysM * 7f);
                    syvyys.gaussianMaxRadius.Override(Mathf.Lerp(0.5f, 1.0f, lahikuva));
                }
            }
            if (heijastus) Luotain(konePaikka);
        }

        void Update()
        {
            if (volyymi == null || !volyymi.enabled) return;
            float askel = Time.unscaledDeltaTime / Mathf.Max(0.05f, haivytysS);
            volyymi.weight = Mathf.Clamp01(volyymi.weight + (paalla ? askel : -askel));
            if (!paalla && volyymi.weight <= 0f)
            {
                volyymi.enabled = false;
                Jalkikasittely(false);
                if (luotain != null) luotain.enabled = false;
            }
        }

        void Jalkikasittely(bool paalle)
        {
            if (kamera == null) return;
            var data = kamera.GetUniversalAdditionalCameraData();
            if (data != null) data.renderPostProcessing = paalle;
        }

        void Luotain(Vector3 paikka)
        {
            if (luotain == null)
            {
                var go = new GameObject("Konetta seuraava heijastusluotain");
                go.transform.SetParent(transform, false);
                luotain = go.AddComponent<ReflectionProbe>();
                luotain.mode = ReflectionProbeMode.Realtime;
                luotain.refreshMode = ReflectionProbeRefreshMode.ViaScripting;
                luotain.timeSlicingMode = ReflectionProbeTimeSlicingMode.IndividualFaces;
                luotain.resolution = 128;
                luotain.hdr = true;
                luotain.cullingMask = 0;          // vain skybox (taivas)
                luotain.clearFlags = ReflectionProbeClearFlags.Skybox;
                luotain.boxProjection = false;
                luotain.importance = 100;
                // Valtava laatikko: kone on aina sisällä, oli mittakaava mikä tahansa (kone skaalataan ruudun mukaan).
                luotain.size = Vector3.one * 1.0e7f;
                luotain.nearClipPlane = 1f;
                luotain.farClipPlane = 1000f;
            }
            if (!luotain.enabled) { luotain.enabled = true; seuraavaLuotain = 0f; }
            luotain.transform.position = paikka;
            if (Time.unscaledTime >= seuraavaLuotain && (luotainPiirto < 0 || luotain.IsFinishedRendering(luotainPiirto)))
            {
                luotainPiirto = luotain.RenderProbe();
                seuraavaLuotain = Time.unscaledTime + luotainValiS;
            }
        }
    }
}
