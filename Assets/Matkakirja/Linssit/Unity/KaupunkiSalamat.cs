// KAUKAISET SALAMAT, UNITY-OSA (Linssiseppä 9.10.2026; Päätoimittaja, junan 171 erä; Ydin KaukoSalamat): iskun pultti horisonttiin
// iskun suuntaan ja etäisyydelle, maasta pilven alapintaan (KaukoSalamat.PilviM), aina kameraan päin (pystyakselin ympäri).
// Nauhat: ydin (kapea, kirkas) ja hehku (leveä, himmeä), sivuhaara kapeampana. Kirkkaus KaukoSalamat.Kirkkaus → _Voima; samalla
// Linssiseppä 2:n pilvien välähdys (KaupunkiIlmakeha.Salama: suunta kamerasta salamaan). Ei korkeuksia Googlen laatoista: maa
// arvioidaan kameran korkeudesta maasta (OpasSovitin antaa).
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public static class KaupunkiSalamat
    {
        public const float YdinM = 5f, HehkuM = 60f, HaaraKerroin = 0.6f;
        static GameObject juuri; static MeshRenderer rend; static Mesh mesh; static Material mat;
        static readonly MaterialPropertyBlock lohko = new MaterialPropertyBlock();
        static readonly int IdVoima = Shader.PropertyToID("_Voima");
        static int nykySiemen = -1;

        /// <summary>Joka ruutu: isku (null = piiloon), kamera, kameran korkeus maasta (m) ja maailman mittakaava (Unity-yksikköä / m).</summary>
        public static void Paivita(KaukoSalamat.Isku? isku, Camera kam, float korkeusMaastaM, float mitta)
        {
            if (!(isku is KaukoSalamat.Isku i) || kam == null) { if (juuri != null && juuri.activeSelf) juuri.SetActive(false); return; }
            if (juuri == null && !Luo()) return;
            if (i.Siemen != nykySiemen) { Rakenna(i.Siemen, i.Haara); nykySiemen = i.Siemen; }
            float kirk = (float)KaukoSalamat.Kirkkaus(i.Aika, i.Siemen);
            var suunta = Quaternion.Euler(0f, (float)i.Suunta, 0f) * Vector3.forward;
            var c = kam.transform.position;
            float korkeus = (float)KaukoSalamat.PilviM * mitta;
            var maa = new Vector3(c.x, c.y - korkeusMaastaM * mitta, c.z) + suunta * ((float)i.EtaisyysM * mitta);
            juuri.transform.SetPositionAndRotation(maa, Quaternion.LookRotation(suunta, Vector3.up));
            juuri.transform.localScale = new Vector3(korkeus, korkeus, korkeus);
            lohko.SetFloat(IdVoima, kirk); rend.SetPropertyBlock(lohko);
            if (!juuri.activeSelf) juuri.SetActive(true);
            var pilvi = maa + Vector3.up * korkeus * 0.8f - c;
            if (kirk > 0.01f) KaupunkiIlmakeha.Salama(pilvi.normalized, kirk);
        }

        static bool Luo()
        {
            var sh = Shader.Find("Matkakirja/Linssit/KaupunkiSalama");
            if (sh == null) return false;
            mat = new Material(sh) { name = "Kaukainen salama" };
            juuri = new GameObject("Kaukainen salama");
            Object.DontDestroyOnLoad(juuri);
            mesh = new Mesh { name = "Salaman pultti" };
            juuri.AddComponent<MeshFilter>().sharedMesh = mesh;
            rend = juuri.AddComponent<MeshRenderer>(); rend.sharedMaterial = mat;
            rend.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off; rend.receiveShadows = false;
            juuri.SetActive(false);
            return true;
        }

        /// <summary>Pultin verkko korkeuden yksiköissä (y 0 … 1): ydin- ja hehkunauha pääpolulle ja haaralle.</summary>
        static void Rakenna(int siemen, bool haara)
        {
            var v = new List<Vector3>(); var col = new List<Color>(); var t = new List<int>();
            float k = 1f / (float)KaukoSalamat.PilviM;   // metri → korkeuden yksikkö
            var paa = KaukoSalamat.Muoto(siemen, 16);
            Nauha(paa, 0, HehkuM * k, new Color(0.55f, 0.65f, 1f, 0.28f), v, col, t);
            Nauha(paa, 0, YdinM * k, new Color(0.9f, 0.93f, 1f, 1f), v, col, t);
            if (haara)
            {
                var h = KaukoSalamat.Muoto(siemen, 7, true);
                double y0 = h[0].y; double x0 = 0; foreach (var p in paa) if (p.y <= y0) x0 = p.x;
                Nauha(h, x0, YdinM * k * HaaraKerroin, new Color(0.85f, 0.9f, 1f, 0.8f), v, col, t);
                Nauha(h, x0, HehkuM * k * HaaraKerroin, new Color(0.55f, 0.65f, 1f, 0.15f), v, col, t);
            }
            mesh.Clear(); mesh.SetVertices(v); mesh.SetColors(col); mesh.SetTriangles(t, 0);
            mesh.bounds = new Bounds(new Vector3(0f, 0.5f, 0f), new Vector3(1.5f, 1.2f, 0.5f));
        }

        /// <summary>Nauha polun pisteistä: kolme kärkeä poikki (reuna alfa 0, keskellä väri), puolileveys w.</summary>
        static void Nauha(List<(double x, double y)> pp, double dx, float w, Color vari, List<Vector3> v, List<Color> col, List<int> t)
        {
            int alku = v.Count; var reuna = new Color(vari.r, vari.g, vari.b, 0f);
            for (int i = 0; i < pp.Count; i++)
            {
                float x = (float)(pp[i].x + dx), y = (float)pp[i].y;
                v.Add(new Vector3(x - w, y, 0f)); v.Add(new Vector3(x, y, 0f)); v.Add(new Vector3(x + w, y, 0f));
                col.Add(reuna); col.Add(vari); col.Add(reuna);
                if (i == 0) continue;
                int a = alku + (i - 1) * 3, b = alku + i * 3;
                for (int j = 0; j < 2; j++) { t.Add(a + j); t.Add(b + j); t.Add(b + j + 1); t.Add(a + j); t.Add(b + j + 1); t.Add(a + j + 1); }
            }
        }
    }
}
