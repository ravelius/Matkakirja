using System;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Pallon valo (LENNON ESITYS, omistaja 23.9.2026): tavallisesti valo kulkee kameran mukana,
    /// jolloin näkyvä puolipallo on aina valaistu. Lennon ajaksi valo vaihtuu aurinkoon, joka
    /// paistaa pelin kellonajan mukaan (Aika tai paikallinen aamu koneen kohdalla), ja palaa laskeutuessa.
    /// Maaston varjot syntyvät pinnan normaaleista (valo matalalta = pitkät rinnevarjot); oikeat
    /// heittovarjot eivät toimi planeetan mittakaavassa.
    /// Sumu: etäisyyssumu lennon ajaksi (Cesiumin URP Lit -varjostin lukee RenderSettings.fogin).
    /// </summary>
    public class Aurinko : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;
        public Light valo;
        [Tooltip("Kameravalon suunta kameraan nähden (paikallinen kierto).")]
        public Vector3 kameraKierto = new Vector3(10f, -15f, 0f);
        [Tooltip("Siirtymä kameravalon ja auringon välillä, sekunteja.")]
        public float siirtymaS = 1.5f;
        public Color sumuVari = new Color(0.86f, 0.80f, 0.68f);
        [Tooltip("Lennon taivas (Matkakirja/Taivas): sininen ilmakehä auringon ajaksi, muuten pelin tausta.")]
        public Material taivas;

        /// <summary>
        /// Aika, jonka mukaan aurinko paistaa (UTC). null = pelin paikallinen aika: aurinko on
        /// koneen kohdalla kello <see cref="paikallinenTunti"/> (pelin "aamu"), joten lento ei
        /// ole yöllä laitteen kellonajasta riippumatta. Pelikoodari voi asettaa pelin kellon.
        /// </summary>
        public Func<DateTime> Aika;
        [Tooltip("Paikallinen aurinkoaika koneen kohdalla, kun Aika = null (10 = aamupäivä, pitkät rinnevarjot).")]
        public double paikallinenTunti = 10.0;

        double kohdePituus;

        /// <summary>Kohta (koneen pituusaste), jonka paikallinen aika määrää auringon, kun Aika = null.</summary>
        public void Kohde(double pituusAste) => kohdePituus = pituusAste;

        /// <summary>Kokeilu (komento "lentoharmaa sumu pois"): etäisyyssumu pois lennolta.</summary>
        public static bool SumuEstetty;

        /// <summary>Paistaako aurinko (lento) vai kameravalo.</summary>
        public bool Paalla { get; private set; }

        float osuus;           // 0 = kameravalo, 1 = aurinko
        double sumuAlku, sumuLoppu;
        bool sumu;
        Quaternion kameraSuhde;

        void Start()
        {
            if (valo == null) valo = GetComponent<Light>();
            if (georeferenssi == null) georeferenssi = FindAnyObjectByType<CesiumGeoreference>();
            kameraSuhde = Quaternion.Euler(kameraKierto);
        }

        /// <summary>Aurinko päälle (lennon alku) tai pois (laskeutuminen).</summary>
        public void Aseta(bool paalle) => Paalla = paalle;

        /// <summary>Etäisyyssumu metreinä kamerasta (alku, loppu); loppu &lt;= 0 = sumu pois.</summary>
        public void Sumu(double alku, double loppu)
        {
            sumu = loppu > 0;
            sumuAlku = alku;
            sumuLoppu = loppu;
        }

        void LateUpdate()
        {
            if (valo == null) return;
            float tavoite = Paalla ? 1f : 0f;
            osuus = Mathf.MoveTowards(osuus, tavoite, Time.unscaledDeltaTime / Mathf.Max(0.05f, siirtymaS));
            var kamera = transform.parent;
            Quaternion kameraValo = kamera != null ? kamera.rotation * kameraSuhde : transform.rotation;
            Quaternion kierto = kameraValo;
            if (osuus > 0f && georeferenssi != null)
            {
                double3 kohti = Aika != null ? AurinkoEcef(Aika()) : AurinkoPaikallinen(DateTime.UtcNow, kohdePituus, paikallinenTunti);
                var suunta = georeferenssi.transform.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(kohti));
                var aurinko = Quaternion.LookRotation(-suunta, kamera != null ? kamera.up : Vector3.up);
                float s = osuus * osuus * (3f - 2f * osuus);
                kierto = Quaternion.Slerp(kameraValo, aurinko, s);
            }
            valo.transform.rotation = kierto;
            Taivas(kamera != null ? kamera.GetComponent<Camera>() : null);

            RenderSettings.fog = sumu && !SumuEstetty;
            if (sumu)
            {
                RenderSettings.fogMode = FogMode.Linear;
                RenderSettings.fogColor = sumuVari;
                RenderSettings.fogStartDistance = (float)sumuAlku;
                RenderSettings.fogEndDistance = (float)sumuLoppu;
            }
        }

        bool taivasPaalla;

        /// <summary>
        /// Sininen taivas lennon ajaksi (häivytys samalla osuudella kuin aurinko): kameran tausta vaihtuu
        /// skyboxiin, jonka väri lasketaan pallon reunan kulmasta. Muulloin pelin oma yksivärinen tausta
        /// (linssit, esim. astronautin musta avaruus, asettavat sen KarttaKerrokset.Taustavarilla).
        /// </summary>
        void Taivas(Camera kamera)
        {
            if (taivas == null || kamera == null || georeferenssi == null) return;
            if (osuus <= 0f)
            {
                if (taivasPaalla) { kamera.clearFlags = CameraClearFlags.SolidColor; taivasPaalla = false; }
                return;
            }
            if (!taivasPaalla)
            {
                RenderSettings.skybox = taivas;
                kamera.clearFlags = CameraClearFlags.Skybox;
                taivasPaalla = true;
            }
            var gt = georeferenssi.transform;
            Vector3 keskus = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
            Vector3 kohti = keskus - kamera.transform.position;
            float d = kohti.magnitude;
            float r = (float)CesiumWgs84Ellipsoid.GetMaximumRadius() * gt.lossyScale.x;
            taivas.SetVector("_Nadir", kohti / Mathf.Max(1f, d));
            taivas.SetFloat("_Raja", Mathf.Asin(Mathf.Clamp01(r / Mathf.Max(r, d))));
            taivas.SetColor("_Tausta", kamera.backgroundColor);
            taivas.SetFloat("_Osuus", osuus * osuus * (3f - 2f * osuus));
        }

        /// <summary>Aurinko niin, että pituusasteella lon on paikallinen aurinkoaika tunti (deklinaatio päivämäärästä).</summary>
        public static double3 AurinkoPaikallinen(DateTime utc, double lon, double tunti)
        {
            double3 v = AurinkoEcef(utc);
            double dekl = math.asin(v.z);
            double pituus = math.radians(lon - (tunti - 12.0) * 15.0);
            return new double3(math.cos(dekl) * math.cos(pituus), math.cos(dekl) * math.sin(pituus), math.sin(dekl));
        }

        /// <summary>
        /// Suunta maan keskipisteestä aurinkoon (ECEF, yksikkövektori): auringon alapiste
        /// deklinaatiosta ja aikayhtälöstä (NOAA:n likiarvo, tarkkuus ~0,5°).
        /// </summary>
        public static double3 AurinkoEcef(DateTime utc)
        {
            double paiva = utc.DayOfYear - 1 + (utc.Hour - 12 + utc.Minute / 60.0) / 24.0;
            double g = 2 * math.PI / 365.0 * paiva;
            double deklinaatio = 0.006918 - 0.399912 * math.cos(g) + 0.070257 * math.sin(g)
                - 0.006758 * math.cos(2 * g) + 0.000907 * math.sin(2 * g)
                - 0.002697 * math.cos(3 * g) + 0.00148 * math.sin(3 * g);
            double aikayhtalo = 229.18 * (0.000075 + 0.001868 * math.cos(g) - 0.032077 * math.sin(g)
                - 0.014615 * math.cos(2 * g) - 0.040849 * math.sin(2 * g)); // minuutteja
            double minuutit = utc.Hour * 60 + utc.Minute + utc.Second / 60.0;
            double pituus = math.radians(-(minuutit + aikayhtalo - 720.0) / 4.0);
            return new double3(math.cos(deklinaatio) * math.cos(pituus), math.cos(deklinaatio) * math.sin(pituus), math.sin(deklinaatio));
        }
    }
}
