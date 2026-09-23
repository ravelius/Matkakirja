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

        [Tooltip("Kameran korkeus maanpinnasta metreinä.")]
        public double korkeus = 14_000_000.0;

        void Update()
        {
            if (georeferenssi == null) return;
            if (Application.isPlaying) pituus = (pituus + nopeus * Time.deltaTime) % 360.0;
            Aseta();
        }

        public void Aseta()
        {
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
