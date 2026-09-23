using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.EnhancedTouch;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja
{
    /// <summary>
    /// Pallon kamera: katsoo aina maan keskipisteeseen paikasta (pituus, leveys, korkeus).
    ///
    /// Ohjaus: yhden sormen veto pyörittää palloa, irrotus jättää liukuman, joka
    /// hiipuu pehmeästi. Kahden sormen nipistys zoomaa, ja sormien keskipisteen siirto
    /// pyörittää samalla. Ennen ensimmäistä kosketusta pallo pyörii itsestään.
    ///
    /// Kameran paikka lasketaan ECEF-koordinaateista georeferenssin kautta, joten
    /// Unityn akselien suunnasta ei tarvitse arvata mitään.
    /// </summary>
    [ExecuteAlways]
    public class PalloKierto : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;

        [Header("Paikka")]
        public double pituus = 10.0;
        public double leveys = 25.0;
        [Tooltip("Korkeus maanpinnasta metreinä; 0 = koko pallo kuvaan.")]
        public double korkeus = 0.0;

        [Header("Itsestään pyöriminen")]
        [Tooltip("Pituusasteita sekunnissa ennen ensimmäistä kosketusta.")]
        public double nopeus = 6.0;

        [Header("Ohjaus")]
        [Tooltip("Liukuman hiipumisen aikavakio sekunteina.")]
        public double liukuAika = 0.35;
        [Tooltip("Pienin korkeus metreinä (laattojen z8 riittää tähän).")]
        public double minKorkeus = 250_000.0;
        [Tooltip("Kuinka suuren osan kapeammasta kuvakulmasta pallo täyttää kaukaisimmillaan.")]
        public double taytto = 0.92;
        public double maxLeveys = 80.0;

        /// <summary>Onko sormi ruudulla tai liukuma käynnissä (kehysmittari lukee).</summary>
        public bool Liikkeessa => edellinenSormia > 0 || math.lengthsq(liuku) > 1e-4;

        bool kosketettu;
        double2 liuku;        // astetta sekunnissa (pituus, leveys)
        double2 vetoNopeus;   // sama suodatettuna vedon aikana
        float2 edellinenKeski;
        float edellinenVali;
        int edellinenSormia;

        void OnEnable()
        {
            if (Application.isPlaying) EnhancedTouchSupport.Enable();
        }

        void OnDisable()
        {
            if (Application.isPlaying) EnhancedTouchSupport.Disable();
        }

        void Update()
        {
            if (georeferenssi == null) return;
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            if (Application.isPlaying) Ohjaa(Time.unscaledDeltaTime);
            Aseta();
        }

        /// <summary>Korkeus, jolla koko pallo mahtuu kuvan kapeampaan suuntaan.</summary>
        public double MaxKorkeus()
        {
            var kamera = GetComponent<Camera>();
            double pysty = math.radians(kamera != null ? kamera.fieldOfView : 40.0) / 2.0;
            double vaaka = math.atan(math.tan(pysty) * (kamera != null ? kamera.aspect : 1.0));
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            return r / math.sin(math.min(pysty, vaaka) * taytto) - r;
        }

        /// <summary>
        /// Montako astetta maapallon kaarta yksi näytön pikseli on. Lähellä pintaa
        /// sormen alla oleva kohta seuraa sormea; kaukana veto on rauhallisempi.
        /// </summary>
        double AstettaPikselille()
        {
            var kamera = GetComponent<Camera>();
            double fov = math.radians(kamera != null ? kamera.fieldOfView : 40.0);
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            double kaari = 2.0 * korkeus * math.tan(fov / 2.0) / r;
            return math.degrees(math.min(kaari, math.PI)) / math.max(1, Screen.height);
        }

        void Ohjaa(double dt)
        {
            var sormet = Kosketus.activeTouches;
            int n = sormet.Count;
            float2 keski = 0;
            float vali = 0;

            if (n > 0)
            {
                for (int i = 0; i < n; i++) keski += (float2)sormet[i].screenPosition;
                keski /= n;
                if (n >= 2) vali = math.distance(sormet[0].screenPosition, sormet[1].screenPosition);
            }
            else if (Mouse.current != null && Mouse.current.leftButton.isPressed)
            {
                n = 1;
                keski = Mouse.current.position.ReadValue();
            }

            if (n > 0)
            {
                kosketettu = true;
                liuku = 0;
                // Sormien määrän vaihtuessa aloitetaan uusi veto ilman hyppyä.
                if (n == edellinenSormia)
                {
                    Kierra(keski - edellinenKeski, dt);
                    if (n >= 2 && edellinenVali > 1f && vali > 1f)
                        korkeus = math.clamp(korkeus * edellinenVali / vali, minKorkeus, MaxKorkeus());
                }
                edellinenKeski = keski;
                edellinenVali = vali;
            }
            else
            {
                if (edellinenSormia > 0) liuku = vetoNopeus;
                vetoNopeus = 0;
                if (math.lengthsq(liuku) > 1e-4)
                {
                    Siirra(liuku * dt);
                    liuku *= math.exp(-dt / liukuAika);
                }
                else if (!kosketettu)
                {
                    pituus = (pituus + nopeus * dt) % 360.0;
                }
            }
            edellinenSormia = n;
        }

        void Kierra(float2 pikselit, double dt)
        {
            double a = AstettaPikselille();
            double cos = math.max(0.3, math.cos(math.radians(leveys)));
            // Veto oikealle tuo lännen näkyviin (pallo pyörii sormen mukana).
            var muutos = new double2(-pikselit.x * a / cos, -pikselit.y * a);
            Siirra(muutos);
            if (dt > 0)
            {
                // Liukuman nopeus: lyhyt eksponentiaalinen keskiarvo viimeisistä kehyksistä.
                double paino = 1.0 - math.exp(-dt / 0.05);
                vetoNopeus = math.lerp(vetoNopeus, muutos / dt, paino);
            }
        }

        void Siirra(double2 muutos)
        {
            pituus = ((pituus + muutos.x) % 360.0 + 540.0) % 360.0 - 180.0;
            leveys = math.clamp(leveys + muutos.y, -maxLeveys, maxLeveys);
        }

        public void Aseta()
        {
            if (georeferenssi == null) return;
            if (korkeus <= 0.0) korkeus = MaxKorkeus();
            double3 ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(
                new double3(pituus, leveys, korkeus));
            double3 paikka = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
            double3 keskus = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            double3 pohjoinen = georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(
                new double3(0, 0, 1_000_000.0)) - keskus;

            var p = georeferenssi.transform.TransformPoint((float3)paikka);
            var k = georeferenssi.transform.TransformPoint((float3)keskus);
            var ylos = georeferenssi.transform.TransformDirection((float3)math.normalize(pohjoinen));
            transform.SetPositionAndRotation(p, Quaternion.LookRotation(k - p, ylos));

            // Leikkaustasot seuraavat korkeutta: lähellä pintaa tarkkuus riittää.
            var kamera = GetComponent<Camera>();
            if (kamera != null)
            {
                double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
                kamera.nearClipPlane = (float)math.max(100.0, korkeus * 0.02);
                kamera.farClipPlane = (float)(korkeus + 2.0 * r);
            }
        }
    }
}
