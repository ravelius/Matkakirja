// ASTRONAUTIN AVARUUS (web js/linssit/satelliitti-avaruus.js AVARUUDEN_TAUSTA #04060e,
// ILMAKEHAN_VARI #7fb6ff, ILMAKEHAN_KORKEUS 0,25): tumma avaruus pallon taakse ja
// ilmakehän sininen hehku pallon reunalle.
//
//   tausta    KarttaKerrokset.Taustavari (Natiivisepän rajapinta); purku palauttaa
//             pelin oman taustan (null)
//   hehku     kuori R × 1,25 (Ilmakeha-varjostin, three-glow-mesh: coefficient 0,1,
//             power 3,5, takapinnat, pallon kiekko hylätään)
//
// Hehku häivytetään sisään linssin avautuessa (0,6 s); molemmat puretaan kerroksen mukana.
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class Avaruus : MonoBehaviour
    {
        public const float IlmakehanKorkeus = 0.25f;
        const float HaivytysS = 0.6f;
        static readonly Color Tausta = new Color32(4, 6, 14, 255);
        static readonly Color Ilmakeha = new Color32(127, 182, 255, 255);
        const int Sektorit = 96, Kehat = 48;

        Material hehku;
        Mesh kuori;
        float peitto;

        public static Avaruus Luo(CesiumGeoreference georeferenssi, Transform isanta)
        {
            var go = new GameObject("Avaruus");
            go.transform.SetParent(isanta, false);
            var a = go.AddComponent<Avaruus>();
            a.Rakenna(georeferenssi);
            return a;
        }

        void Rakenna(CesiumGeoreference g)
        {
            // Tausta Natiivisepän rajapinnalla (kameran tausta); null palauttaa pelin oman.
            KarttaKerrokset.Instanssi?.Taustavari(Tausta);

            var hehkuVarjostin = Resources.Load<Shader>("Varjostimet/Ilmakeha");
            if (hehkuVarjostin == null) { Debug.LogWarning("MATKAKIRJA linssit: Ilmakeha-varjostin puuttuu"); return; }
            double sade = CesiumWgs84Ellipsoid.GetMaximumRadius();
            double3 keskus = g.TransformEarthCenteredEarthFixedPositionToUnity(double3.zero);
            var k = new GameObject("Ilmakeha");
            k.transform.SetParent(transform, false);
            k.transform.localPosition = (Vector3)(float3)keskus;
            // Pallokuori ECEF-akseleilla (akseleiden suunnalla ei ole väliä: kuori on pyöreä).
            int n = (Kehat + 1) * (Sektorit + 1);
            var paikat = new Vector3[n];
            float rk = (float)(sade * (1 + IlmakehanKorkeus));
            int i = 0;
            for (int kk = 0; kk <= Kehat; kk++)
            {
                float lat = Mathf.PI * (0.5f - kk / (float)Kehat);
                for (int s = 0; s <= Sektorit; s++, i++)
                {
                    float lon = 2 * Mathf.PI * s / Sektorit;
                    paikat[i] = new Vector3(Mathf.Cos(lat) * Mathf.Cos(lon), Mathf.Sin(lat), Mathf.Cos(lat) * Mathf.Sin(lon)) * rk;
                }
            }
            var kolmiot = new int[Kehat * Sektorit * 6];
            int t2 = 0;
            for (int kk = 0; kk < Kehat; kk++)
                for (int s = 0; s < Sektorit; s++)
                {
                    int a0 = kk * (Sektorit + 1) + s, b = a0 + 1, c = a0 + Sektorit + 1, d = c + 1;
                    kolmiot[t2++] = a0; kolmiot[t2++] = b; kolmiot[t2++] = c;
                    kolmiot[t2++] = b; kolmiot[t2++] = d; kolmiot[t2++] = c;
                }
            // Varjostin piirtää takapinnat (Cull Front), joten kierron suunnalla on väliä vain
            // siten, että toinen puoli näkyy; Cull Front + tämä kierto näyttää kaukaisen puolen.
            kuori = new Mesh { name = "Ilmakeha", indexFormat = IndexFormat.UInt32, vertices = paikat, triangles = kolmiot };
            kuori.RecalculateBounds();
            k.AddComponent<MeshFilter>().sharedMesh = kuori;
            var kr = k.AddComponent<MeshRenderer>();
            hehku = new Material(hehkuVarjostin);
            hehku.SetColor("_Vari", Ilmakeha);
            hehku.SetFloat("_Ontto", (float)sade);
            hehku.SetFloat("_Peitto", 0);
            kr.sharedMaterial = hehku;
            kr.shadowCastingMode = ShadowCastingMode.Off;
        }

        void Update()
        {
            peitto = Mathf.MoveTowards(peitto, 1f, Time.unscaledDeltaTime / HaivytysS);
            if (hehku != null) hehku.SetFloat("_Peitto", peitto);
        }

        void OnDestroy()
        {
            KarttaKerrokset.Instanssi?.Taustavari(null);
            if (hehku != null) Destroy(hehku);
            if (kuori != null) Destroy(kuori);
        }
    }
}
