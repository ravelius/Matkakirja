using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Kiertää kameraa maapallon ympäri: pallo näyttää pyörivän itään.
    /// Kameran paikka lasketaan ECEF-koordinaateista georeferenssin kautta,
    /// joten Unityn akselien suunnasta ei tarvitse arvata mitään.
    /// </summary>
    [ExecuteAlways]
    public class PalloKierto : MonoBehaviour
    {
        public CesiumGeoreference georeferenssi;

        [Tooltip("Pituusasteita sekunnissa.")]
        public double nopeus = 6.0;

        [Tooltip("Kameran leveysaste (astetta).")]
        public double leveys = 25.0;

        [Tooltip("Aloituspituusaste (astetta).")]
        public double pituus = 10.0;

        [Tooltip("Kuinka suuren osan kapeammasta kuvakulmasta pallo täyttää (0–1).")]
        public double taytto = 0.92;

        void Update()
        {
            if (georeferenssi == null) return;
            if (Application.isPlaying) pituus = (pituus + nopeus * Time.deltaTime) % 360.0;
            Aseta();
        }

        /// <summary>
        /// Korkeus, jolla pallo mahtuu kuvan kapeampaan suuntaan: pystynäytöllä
        /// vaakakulma on pystykulmaa pienempi.
        /// </summary>
        double Korkeus()
        {
            var kamera = GetComponent<Camera>();
            double pysty = math.radians(kamera != null ? kamera.fieldOfView : 40.0) / 2.0;
            double suhde = kamera != null ? kamera.aspect : 1.0;
            double vaaka = math.atan(math.tan(pysty) * suhde);
            double puoli = math.min(pysty, vaaka);
            double r = CesiumWgs84Ellipsoid.GetMaximumRadius();
            return r / math.sin(puoli * taytto) - r;
        }

        public void Aseta()
        {
            double korkeus = Korkeus();
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
        }
    }
}
