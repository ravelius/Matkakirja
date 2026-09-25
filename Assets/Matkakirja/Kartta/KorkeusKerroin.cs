using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// Korkeuserojen liioittelu (omistajan löydös 29, build 9 → 10): omistaja valitsi vertailukuvista (Alpit, Kreikka)
    /// oletukseksi 2 (<see cref="Oletus"/>); komennolla voi yhä kokeilla muita. Cesium for Unity 1.25 ei tunne vertical exaggerationia, joten maasto nostetaan
    /// tileset-varjostimen verteksivaiheessa (Shaders/Cesium/MatkakirjaTileset, generaattori Lahde~/tee_tileset.py):
    /// p' = p + n·max(h, 0)·(k − 1), h ellipsoidista. Meri ei kuoppaannu.
    ///
    /// Varjostin lukee globaalit _korkeusKerroin, _maaKeski (maan keskipiste Unityn maailmassa) ja _maaAkseli
    /// (napa-akseli). Georeferenssi on TrueOrigin eikä liiku (kamera liikkuu), joten keskipiste lasketaan
    /// asetettaessa. Asettamaton globaali on 0, jonka varjostin tulkitsee 1:ksi.
    ///
    /// Maanpinnan korkeudelle sijoitetut oliot (kaupunkimerkit, maamerkit) nostetaan samalla kaavalla
    /// <see cref="Lisays"/>-apurilla. Cesiumin laattojen rajaustilavuudet (culling, LOD) eivät tiedä liioittelusta:
    /// kerroin rajataan siksi välille [<see cref="Pienin"/>, <see cref="Suurin"/>].
    ///
    /// Komento (Komennot.cs, Documents/komento.txt): <c>korkeus 2.5</c>. Ei pysyvää tallennusta.
    ///
    /// RINNEVALON TASAUS (löydös 46): _maaKeski.w on varjostimen normaalien tasauksen paino (<see cref="Tasaus"/>,
    /// Karttavalo.cs); xyz on yhä maan keskipiste. Aurinko.cs asettaa painon joka kehys.
    /// </summary>
    public static class KorkeusKerroin
    {
        public const float Pienin = 1f;
        public const float Suurin = 3f;

        static readonly int KerroinId = Shader.PropertyToID("_korkeusKerroin");
        static readonly int KeskiId = Shader.PropertyToID("_maaKeski");
        static readonly int AkseliId = Shader.PropertyToID("_maaAkseli");
        static readonly int NollaId = Shader.PropertyToID("_maaNolla");
        static readonly int ItaId = Shader.PropertyToID("_maaIta");

        /// <summary>Pelin oletus: omistaja valitsi vertailukuvista kertoimen 2 (build 10).</summary>
        public const float Oletus = 2f;

        /// <summary>Voimassa oleva kerroin (1 = ennallaan).</summary>
        public static float Arvo { get; private set; } = Oletus;

        /// <summary>Rinnevalon tasauksen paino 0–1 (_maaKeski.w).</summary>
        public static float TasausArvo { get; private set; }
        static Vector3 keskiNyt;
        static bool keskiOn;

        /// <summary>
        /// Rinnevalon tasaus (löydös 46, Karttavalo.cs): tileset-varjostin kiertää normaalit kohti kameran alapisteen
        /// normaalia painolla w (0 = normaalit ennallaan). Kirjoittaa globaalin vain, kun arvo muuttuu.
        /// </summary>
        public static void Tasaus(float w)
        {
            w = Mathf.Clamp01(float.IsNaN(w) ? 0f : w);
            if (keskiOn && Mathf.Abs(w - TasausArvo) < 1e-4f) return;
            TasausArvo = w;
            if (!keskiOn) return; // Aseta kirjoittaa painon keskipisteen kanssa
            Shader.SetGlobalVector(KeskiId, new Vector4(keskiNyt.x, keskiNyt.y, keskiNyt.z, w));
        }

        /// <summary>
        /// Asettaa kertoimen heti (varjostimen globaalit). Georeferenssi haetaan kohtauksesta, jos sitä ei anneta.
        /// Palauttaa rajatun arvon.
        /// </summary>
        public static float Aseta(float kerroin, CesiumGeoreference georeferenssi = null)
        {
            Arvo = Mathf.Clamp(float.IsNaN(kerroin) ? 1f : kerroin, Pienin, Suurin);
            if (georeferenssi == null) georeferenssi = Object.FindAnyObjectByType<CesiumGeoreference>();
            if (georeferenssi != null)
            {
                var gt = georeferenssi.transform;
                Vector3 keski = gt.TransformPoint((float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero));
                Vector3 akseli = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(
                    new double3(0, 0, 1))).normalized;
                keskiNyt = keski;
                keskiOn = true;
                Shader.SetGlobalVector(KeskiId, new Vector4(keski.x, keski.y, keski.z, TasausArvo));
                Shader.SetGlobalVector(AkseliId, new Vector4(akseli.x, akseli.y, akseli.z, 0));
                // Pituusasteen akselit lennon varakartalle (KarttaKerrokset, tileset-varjostimen LentoVaraUV):
                // ECEF +X (lon 0°) ja +Y (lon 90° E) Unityn maailmassa.
                Vector3 nolla = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(
                    new double3(1, 0, 0))).normalized;
                Vector3 ita = gt.TransformDirection((float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(
                    new double3(0, 1, 0))).normalized;
                Shader.SetGlobalVector(NollaId, new Vector4(nolla.x, nolla.y, nolla.z, 0));
                Shader.SetGlobalVector(ItaId, new Vector4(ita.x, ita.y, ita.z, 0));
            }
            Shader.SetGlobalFloat(KerroinId, Arvo);
            return Arvo;
        }

        /// <summary>Liioiteltu korkeus: max(h, 0)·k; meren alla (h &lt; 0) ennallaan.</summary>
        public static double Sovita(double korkeusM) => korkeusM > 0 ? korkeusM * Arvo : korkeusM;

        /// <summary>
        /// Paljonko maanpinta nousee pisteessä, jonka korkeus on <paramref name="korkeusM"/> (metreinä, ylös pinnan
        /// normaalin suuntaan): max(h, 0)·(k − 1). Kun k = 1, 0.
        /// </summary>
        public static float Lisays(double korkeusM) => korkeusM > 0 ? (float)(korkeusM * (Arvo - 1f)) : 0f;
    }
}
