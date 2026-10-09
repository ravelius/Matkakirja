// ELÄVÄ KAUPUNKI: SAVU JA LIPUT, UNITY-OSA (Linssiseppä 9.10.2026; Päätoimittaja juna 171, suunnitelma B8). ElavaKaupunki luo, kun
// paketissa on "piiput" tai "liput" (tyokalut/elava_savu_liput.py; Ydin SavuJaLiput). Savupatsaat (ElavaSavu, kärkivarjostimen
// hiukkaset) lähimmistä savuavista piipuista SavuNakyvaM:n sisällä ja liput (tanko ElavaKohteella, kangas ElavaLippu) lähimmistä
// tangoista LippuNakyvaM:n sisällä, kumpaakin enintään Maarat[taso]. Pohja omasta korkeusmallista (ElavaKaupunki.MaaAlla, Map Tiles
// C4: ei Googlen laattojen korkeuksia); kunnes malli on muistissa, kohde on piilossa. Valinta päivitetään puolen sekunnin välein tai
// kameran siirryttyä. Tuuli joka kehys globaaleiksi _ElavaTuuli (savu) ja _ElavaLippuAalto (liput). Kytkimet `opas savu|liput 0|1`.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Elava;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class ElavaSavuLiput
    {
        public static bool SavuPaalla = true, LiputPaalla = true;
        static Material savuMat, lippuMat;
        static Mesh savuVerkko, tankoVerkko; static readonly Mesh[] kangasVerkot = new Mesh[3];
        static readonly int IdTuuli = Shader.PropertyToID("_ElavaTuuli"), IdAalto = Shader.PropertyToID("_ElavaLippuAalto"), IdSavu = Shader.PropertyToID("_Savu");

        readonly SavuJaLiput d; readonly Func<double, double, double> maaAlla; readonly int raja;
        readonly double[] piippuMaa, lippuMaa;
        readonly List<int> savuValitut = new List<int>(), lippuValitut = new List<int>();
        Renderer[] savut; Transform[] tangot, kankaat;
        readonly MaterialPropertyBlock mpb = new MaterialPropertyBlock();
        Vector3 edC = new Vector3(1e9f, 0, 0); float edAika = -9f;
        public int SavuNakyy { get; private set; }
        public int LippuNakyy { get; private set; }
        public (double X, double Z, double Ms) Tuuli { get; private set; }
        public bool Live { get; private set; }
        public int Piippuja => d.Piiput.Count;
        public int Savuavia => d.Savuavia;
        public int Lippuja => d.Liput.Count;
        public int Raja => raja;

        public ElavaSavuLiput(SavuJaLiput d, Func<double, double, double> maaAlla, int raja)
        {
            this.d = d; this.maaAlla = maaAlla; this.raja = raja;
            piippuMaa = new double[d.Piiput.Count]; lippuMaa = new double[d.Liput.Count];
            for (int i = 0; i < piippuMaa.Length; i++) piippuMaa[i] = double.NaN;
            for (int i = 0; i < lippuMaa.Length; i++) lippuMaa[i] = double.NaN;
        }

        static void Materiaalit()
        {
            if (savuMat != null || lippuMat != null) return;
            var s = Shader.Find("Matkakirja/Linssit/ElavaSavu"); var l = Shader.Find("Matkakirja/Linssit/ElavaLippu");
            if (s != null) savuMat = new Material(s) { name = "Elävä savu" };
            if (l != null) lippuMat = new Material(l) { name = "Elävä lippu", enableInstancing = true };
            // Savu: SavuHiukkasia nelikulmiota origossa; varjostin siirtää ne (rajat väljiksi, ettei patsas katoa kuvan reunalla).
            int n = SavuJaLiput.SavuHiukkasia;
            var p = new List<Vector3>(); var uv = new List<Vector2>(); var t = new List<int>();
            var r = new System.Random(20261009);
            for (int i = 0; i < n; i++)
            {
                int b = p.Count; float rr = (float)r.NextDouble();
                foreach (var (x, y) in new[] { (-1f, -1f), (1f, -1f), (1f, 1f), (-1f, 1f) }) { p.Add(new Vector3(x, y, 0)); uv.Add(new Vector2((float)i / n, rr)); }
                t.AddRange(new[] { b, b + 2, b + 1, b, b + 3, b + 2 });
            }
            savuVerkko = new Mesh { name = "Savupatsas" };
            savuVerkko.SetVertices(p); savuVerkko.SetUVs(0, uv); savuVerkko.SetTriangles(t, 0);
            savuVerkko.bounds = new Bounds(new Vector3(0, 80, 0), new Vector3(500, 260, 500)); savuVerkko.UploadMeshData(true);
            tankoVerkko = Tanko();
            for (int m = 0; m < 3; m++) kangasVerkot[m] = Kangas(m);
        }

        static Mesh Tanko()
        {
            // Yksikkötanko: säde 1, korkeus 1 (skaalataan), kuusi sivua, vaalea; nuppi ei näy pallon etäisyydeltä.
            var p = new List<Vector3>(); var no = new List<Vector3>(); var c = new List<Color32>(); var t = new List<int>();
            const int sivuja = 6;
            for (int i = 0; i <= sivuja; i++)
            {
                float a = i * Mathf.PI * 2 / sivuja; var nn = new Vector3(Mathf.Cos(a), 0, Mathf.Sin(a));
                p.Add(nn); p.Add(nn + Vector3.up); no.Add(nn); no.Add(nn); c.Add(new Color32(222, 222, 218, 255)); c.Add(new Color32(222, 222, 218, 255));
                if (i < sivuja) { int b = i * 2; t.AddRange(new[] { b, b + 1, b + 2, b + 2, b + 1, b + 3 }); }
            }
            var m = new Mesh { name = "Lipputanko" };
            m.SetVertices(p); m.SetNormals(no); m.SetColors(c); m.SetTriangles(t, 0); m.RecalculateBounds(); m.UploadMeshData(true);
            return m;
        }

        static Mesh Kangas(int maa)
        {
            // Yksikkökangas 8 × 5 kärkeä: x 0 → 1 (vapaa reuna), y 0 → −1; TEXCOORD0.z = maa (0 neutraali, 1 Ruotsi, 2 Ranska).
            const int nx = 8, ny = 5;
            var p = new List<Vector3>(); var uv = new List<Vector3>(); var t = new List<int>();
            for (int j = 0; j < ny; j++)
                for (int i = 0; i < nx; i++) { float u = i / (nx - 1f), v = j / (ny - 1f); p.Add(new Vector3(u, -v, 0)); uv.Add(new Vector3(u, v, maa)); }
            for (int j = 0; j < ny - 1; j++)
                for (int i = 0; i < nx - 1; i++) { int a = j * nx + i; t.AddRange(new[] { a, a + 1, a + nx, a + 1, a + nx + 1, a + nx }); }
            var m = new Mesh { name = "Lippukangas " + maa };
            m.SetVertices(p); m.SetUVs(0, uv); m.SetTriangles(t, 0);
            m.bounds = new Bounds(new Vector3(0.5f, -0.6f, 0), new Vector3(2.2f, 2.4f, 1.2f)); m.UploadMeshData(true);
            return m;
        }

        public void Rakenna(Transform juuri, int kerros, Material kohdeMat, Func<string, Transform, Mesh, Material, GameObject> olio)
        {
            Materiaalit();
            if (savuMat != null && d.Savuavia > 0)
            {
                savut = new Renderer[Math.Min(raja, d.Savuavia)];
                for (int i = 0; i < savut.Length; i++) { savut[i] = olio("savu", juuri, savuVerkko, savuMat).GetComponent<Renderer>(); savut[i].gameObject.SetActive(false); }
            }
            if (lippuMat != null && d.Liput.Count > 0)
            {
                int n = Math.Min(raja, d.Liput.Count);
                tangot = new Transform[n]; kankaat = new Transform[n];
                for (int i = 0; i < n; i++)
                {
                    tangot[i] = olio("lipputanko", juuri, tankoVerkko, kohdeMat).transform;
                    kankaat[i] = olio("lippu", tangot[i].parent, kangasVerkot[0], lippuMat).transform;
                    tangot[i].gameObject.SetActive(false); kankaat[i].gameObject.SetActive(false);
                }
            }
        }

        /// <summary>Joka kehys: kamera paketin ENU:ssa, tuuli LIVE-säästä (mistä-suunta, m/s; null = varatuuli kohti varaAst).</summary>
        public void Paivita(Vector3 c, double? mistaAst, double? ms, double varaAst)
        {
            Live = mistaAst.HasValue;
            Tuuli = SavuJaLiput.Tuuli(mistaAst, ms, varaAst);
            Shader.SetGlobalVector(IdTuuli, new Vector4((float)Tuuli.X, (float)Tuuli.Z, (float)Tuuli.Ms, 0));
            var a = SavuJaLiput.LipunAalto(Tuuli.Ms);
            Shader.SetGlobalVector(IdAalto, new Vector4((float)a.Amplitudi, (float)a.Kulmanopeus, (float)a.Aaltoluku, (float)a.Riippu));
            if ((c - edC).sqrMagnitude > 30f * 30f || Time.unscaledTime - edAika > 0.5f)
            {
                edC = c; edAika = Time.unscaledTime;
                Valitse(c);
            }
            if (kankaat != null)
            {
                var kierto = Quaternion.Euler(0, (float)SavuJaLiput.LipunSuuntima(Tuuli.X, Tuuli.Z), 0);
                for (int i = 0; i < LippuNakyy; i++) kankaat[i].localRotation = kierto;
            }
        }

        void Valitse(Vector3 c)
        {
            SavuNakyy = 0;
            if (savut != null)
            {
                if (SavuPaalla) savuValitut.AddRange(SavuJaLiput.Lahimmat(d.Piiput, p => (p.X, p.Z), c.x, c.z, SavuJaLiput.SavuNakyvaM, savut.Length, p => p.Savuaa));
                foreach (int i in savuValitut)
                {
                    if (double.IsNaN(piippuMaa[i])) piippuMaa[i] = maaAlla(d.Piiput[i].X, d.Piiput[i].Z);
                    if (double.IsNaN(piippuMaa[i])) continue;
                    var p = d.Piiput[i]; var r = savut[SavuNakyy++];
                    r.transform.localPosition = new Vector3((float)p.X, (float)(piippuMaa[i] + p.Korkeus), (float)p.Z);
                    mpb.SetVector(IdSavu, new Vector4((float)p.Voima, (float)p.Mittakaava, (float)p.Harmaus, (float)p.Vaihe));
                    r.SetPropertyBlock(mpb);
                    if (!r.gameObject.activeSelf) r.gameObject.SetActive(true);
                }
                savuValitut.Clear();
                for (int i = SavuNakyy; i < savut.Length; i++) if (savut[i].gameObject.activeSelf) savut[i].gameObject.SetActive(false);
            }
            LippuNakyy = 0;
            if (tangot != null)
            {
                if (LiputPaalla) lippuValitut.AddRange(SavuJaLiput.Lahimmat(d.Liput, l => (l.X, l.Z), c.x, c.z, SavuJaLiput.LippuNakyvaM, tangot.Length));
                foreach (int i in lippuValitut)
                {
                    if (double.IsNaN(lippuMaa[i])) lippuMaa[i] = maaAlla(d.Liput[i].X, d.Liput[i].Z);
                    if (double.IsNaN(lippuMaa[i])) continue;
                    var l = d.Liput[i]; int k = LippuNakyy++;
                    float tyvi = (float)(lippuMaa[i] + l.Tyvi), sade = 0.05f + 0.004f * (float)l.Korkeus;
                    tangot[k].localPosition = new Vector3((float)l.X, tyvi, (float)l.Z);
                    tangot[k].localScale = new Vector3(sade, (float)l.Korkeus, sade);
                    kankaat[k].localPosition = new Vector3((float)l.X, tyvi + (float)l.Korkeus - 0.15f, (float)l.Z);
                    kankaat[k].localScale = new Vector3((float)l.Leveys, (float)l.KangasKorkeus, (float)l.Leveys);
                    kankaat[k].GetComponent<MeshFilter>().sharedMesh = kangasVerkot[(int)l.Maa];
                    if (!tangot[k].gameObject.activeSelf) { tangot[k].gameObject.SetActive(true); kankaat[k].gameObject.SetActive(true); }
                }
                lippuValitut.Clear();
                for (int i = LippuNakyy; i < tangot.Length; i++) if (tangot[i].gameObject.activeSelf) { tangot[i].gameObject.SetActive(false); kankaat[i].gameObject.SetActive(false); }
            }
        }

        public string Tila() =>
            $"savu {SavuNakyy}/{Math.Min(raja, d.Savuavia)} näkyy ({d.Savuavia}/{d.Piiput.Count} piippua savuaa, {(SavuPaalla ? "päällä" : "pois")}), " +
            $"liput {LippuNakyy}/{Math.Min(raja, d.Liput.Count)} näkyy ({d.Liput.Count} tankoa, {(LiputPaalla ? "päällä" : "pois")}), " +
            $"tuuli {(Live ? "LIVE" : "vara")} {Math.Atan2(Tuuli.X, Tuuli.Z) * 180 / Math.PI:F0}° {Tuuli.Ms:F1} m/s";
    }
}
