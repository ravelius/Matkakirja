using CesiumForUnity;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Pallon pohjakerros: koko maapallon tasakulmainen kuva (pelin z4-pallotekstuuri
    /// 2048×1024) sovelluksen mukana. Se peittää navat Mercator-laattojen rajan (85°)
    /// yläpuolella ja näkyy heti käynnistyksessä ennen kuin laatat saapuvat.
    /// Osoite asetetaan ajossa, koska StreamingAssetsin polku riippuu alustasta.
    /// </summary>
    [DefaultExecutionOrder(-1000)]
    [RequireComponent(typeof(CesiumUrlTemplateRasterOverlay))]
    public class PohjaKerros : MonoBehaviour
    {
        public string tiedosto = "pohja-2048.jpg";
        public CesiumUrlTemplateRasterOverlay kerros;

        void Awake()
        {
            if (kerros == null) kerros = GetComponent<CesiumUrlTemplateRasterOverlay>();
            string polku = System.IO.Path.Combine(Application.streamingAssetsPath, tiedosto);
            kerros.templateUrl = polku.Contains("://") ? polku : "file://" + polku;
        }
    }
}
