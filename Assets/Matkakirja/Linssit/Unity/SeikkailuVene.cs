// HISTORIAMOOTTORI V2: VENESAAPUMINEN UNITYSSA (Siirtoseppä 7.10.2026; ydin Matkakirja.Linssit.Seikkailu.Venesaapuminen).
// - Vene: Linnanrakentajan rekvisiitta ymparisto.mallit[] "vene" ("maailmaan": false), solmut omina GameObjecteinaan (runko,
//   airo_o, airo_v, peramela; tyhjät istuin_soutaja ja kamera_pera), oma kuva DioraamaMaasto-varjostimella kuten ympäristön mallit.
// - Soutu: glb:n "soutu"-leike (airojen kierto) näytteistetään Ytimen soutukellosta (DioraamaSekoitin.Nayte); sama kello
//   soutajan ele_soutu-leikkeelle (V2c, soutu.json: hahmo istuin_soutaja-lapseksi skaalalla 0,9753).
// - Keinunta: nousu ±3 cm ja keulan nousu vedon tahdissa (työntö), kevyt kallistus; vähennetyllä liikkeellä pois.
// - Kamera: CinemachineCamera kamera_pera-solmussa (y = vesi + 1,2 m, katse keulaan), DioraamaCinemachine.PaivitaPelaaja ajaa sen
//   lepokameroiden yli; perillä Sovitin luo pelaajan laiturille ja aivot blendaavat olan yli -kameraan.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using Unity.Cinemachine;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVene
    {
        public static SeikkailuVene Aktiivinen { get; private set; }
        static readonly int IdKuva = Shader.PropertyToID("_Kuva");

        readonly Venesaapuminen ydin;
        readonly GameObject juuri;
        readonly Transform[] solmut;
        readonly GlbMalli malli;
        readonly GlbAnimaatio soutu;
        readonly float[] t, r, s;
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        public CinemachineCamera Kamera { get; private set; }
        public Transform IstuinSoutaja { get; private set; }
        public double Alku { get; private set; }
        public Venesaapuminen Ydin => ydin;

        SeikkailuVene(Venesaapuminen ydin, GlbMalli malli, Texture2D kuva, Transform isa, int kerros)
        {
            this.ydin = ydin; this.malli = malli;
            juuri = new GameObject("Seikkailu vene") { layer = kerros };
            juuri.transform.SetParent(isa, false);
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaMaasto");
            var mat = varjostin != null ? new Material(varjostin) { name = "Vene" } : null;
            if (mat != null) { if (kuva != null) mat.SetTexture(IdKuva, kuva); luodut.Add(mat); }
            if (kuva != null) luodut.Add(kuva);
            solmut = new Transform[malli.Solmut.Count];
            for (int i = 0; i < malli.Solmut.Count; i++)
            {
                var g = malli.Solmut[i];
                var go = new GameObject(g.Nimi) { layer = kerros };
                go.transform.localPosition = new Vector3(g.Translation[0], g.Translation[1], g.Translation[2]);
                go.transform.localRotation = new Quaternion(g.Rotation[0], g.Rotation[1], g.Rotation[2], g.Rotation[3]);
                go.transform.localScale = new Vector3(g.Scale[0], g.Scale[1], g.Scale[2]);
                solmut[i] = go.transform;
                if (g.Osat.Count > 0 && mat != null)
                {
                    var m = Mesh(g); luodut.Add(m);
                    go.AddComponent<MeshFilter>().sharedMesh = m;
                    var mr = go.AddComponent<MeshRenderer>(); mr.sharedMaterial = mat;
                    mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.On; mr.receiveShadows = true;
                }
            }
            for (int i = 0; i < solmut.Length; i++)
                solmut[i].SetParent(malli.Solmut[i].Vanhempi >= 0 ? solmut[malli.Solmut[i].Vanhempi] : juuri.transform, false);
            int n = malli.Solmut.Count;
            t = new float[n * 3]; r = new float[n * 4]; s = new float[n * 3];
            soutu = malli.Animaatio("soutu");
            IstuinSoutaja = Solmu("istuin_soutaja");
            // Kamera perässä: katse keulaan (glTF keula +z → Unityssa paikallinen −z), hieman alas.
            var kp = Solmu("kamera_pera") ?? juuri.transform;
            var cg = new GameObject("CM vene") { layer = kerros };
            cg.transform.SetParent(kp, false);
            cg.transform.localRotation = Quaternion.LookRotation(Vector3.back) * Quaternion.Euler(6f, 0f, 0f);
            Kamera = cg.AddComponent<CinemachineCamera>();
            var lens = LensSettings.Default; lens.FieldOfView = 52f; lens.NearClipPlane = 0.1f; lens.FarClipPlane = 4000f;
            Kamera.Lens = lens;
            Kamera.Priority = 0;
        }

        Transform Solmu(string nimi) { for (int i = 0; i < solmut.Length; i++) if (malli.Solmut[i].Nimi == nimi) return solmut[i]; return null; }

        static Mesh Mesh(GlbSolmu g)
        {
            var p = new List<Vector3>(); var nr = new List<Vector3>(); var uv = new List<Vector2>(); var kol = new List<int>();
            foreach (var o in g.Osat)
            {
                int a = p.Count, k = (o.Paikat?.Length ?? 0) / 3;
                for (int i = 0; i < k; i++)
                {
                    p.Add(new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]));
                    nr.Add(o.Normaalit != null && o.Normaalit.Length >= (i + 1) * 3 ? new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]) : Vector3.up);
                    // glTF:n UV:n origo vasen ylä → Unityn vasen ala.
                    uv.Add(o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero);
                }
                foreach (int ix in o.Kolmiot ?? Array.Empty<int>()) kol.Add(ix + a);
            }
            var m = new Mesh { name = "Vene:" + g.Nimi, indexFormat = p.Count > 65000 ? UnityEngine.Rendering.IndexFormat.UInt32 : UnityEngine.Rendering.IndexFormat.UInt16 };
            m.SetVertices(p); m.SetNormals(nr); m.SetUVs(0, uv); m.SetTriangles(kol, 0); m.RecalculateBounds();
            return m;
        }

        /// <summary>Lataa veneen glb:n (ja upotetun kuvan) ja aloittaa saapumisen hetkellä alku (Time.unscaledTimeAsDouble).</summary>
        public static IEnumerator Aloita(string glbUrl, Venesaapuminen ydin, Transform isa, int kerros, Action<string> kirjaa)
        {
            Poista();
            byte[] b = null;
            yield return DioraamaLevyvalimuisti.Hae(glbUrl, 120, x => b = x);
            if (b == null) { kirjaa?.Invoke("seikkailu: vene ei latautunut " + glbUrl); yield break; }
            GlbMalli m;
            try { m = DioraamaGlb.Lue(b, true); } catch (Exception e) { kirjaa?.Invoke("seikkailu: vene glb virhe: " + e.Message); yield break; }
            Texture2D kuva = null;
            if (m.Kuvat.Count > 0 && m.Kuvat[0] != null)
            {
                kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false) { name = "Vene", filterMode = FilterMode.Trilinear, anisoLevel = 4 };
                if (kuva.LoadImage(m.Kuvat[0], false)) { kuva.Compress(true); kuva.Apply(true, true); }
                else { UnityEngine.Object.Destroy(kuva); kuva = null; }
            }
            var v = new SeikkailuVene(ydin, m, kuva, isa, kerros) { Alku = Time.unscaledTimeAsDouble };
            Aktiivinen = v;
            v.Paivita(false);
            kirjaa?.Invoke($"seikkailu: vene {m.Solmut.Count} solmua, soutu {(v.soutu != null ? v.soutu.Kesto.ToString("F2") + " s" : "puuttuu")}, reitti {ydin.Pituus:F0} m / {ydin.KestoS:F0} s");
        }

        public double Aika => Time.unscaledTimeAsDouble - Alku;

        /// <summary>Asettaa veneen ja airot ajan mukaan. Palauttaa Ytimen tilan.</summary>
        public VeneTila Paivita(bool vahennettyLiike)
        {
            double aika = Aika;
            var tila = ydin.Tila(aika);
            // Ytimen suunta glTF:ssä (x, z etelä) → Unity (x, −z); keula on Unityssa paikallinen −z.
            var suunta = new Vector3((float)tila.SuuntaX, 0f, (float)-tila.SuuntaZ);
            var kierto = Quaternion.LookRotation(-suunta, Vector3.up);
            float vaihe = (float)(tila.SoutuAika / Venesaapuminen.SoutuS) * Mathf.PI * 2f;
            float voima = Mathf.Clamp01((float)tila.Nopeus / 2f);
            float nousu = 0f, keula = 0f, kallistus = 0f;
            if (!vahennettyLiike)
            {
                float a = (float)aika;
                nousu = 0.03f * Mathf.Sin(a * 1.3f) + 0.015f * Mathf.Sin(vaihe) * voima;
                keula = (1.6f * Mathf.Sin(vaihe - 0.6f) * voima) + 0.5f * Mathf.Sin(a * 0.9f);
                kallistus = 0.8f * Mathf.Sin(a * 0.7f + 1.1f);
            }
            juuri.transform.localPosition = new Vector3((float)tila.X, (float)tila.Y + nousu, (float)-tila.Z);
            juuri.transform.localRotation = kierto * Quaternion.Euler(-keula, 0f, kallistus);
            if (soutu != null)
            {
                for (int n = 0; n < malli.Solmut.Count; n++)
                {
                    var g = malli.Solmut[n];
                    Array.Copy(g.Translation, 0, t, n * 3, 3); Array.Copy(g.Rotation, 0, r, n * 4, 4); Array.Copy(g.Scale, 0, s, n * 3, 3);
                }
                DioraamaSekoitin.Nayte(soutu, (float)tila.SoutuAika, t, r, s);
                foreach (var k in soutu.Kanavat)
                {
                    var tr = solmut[k.Solmu];
                    int i = k.Solmu;
                    if (k.Polku == 0) tr.localPosition = new Vector3(t[i * 3], t[i * 3 + 1], t[i * 3 + 2]);
                    else if (k.Polku == 1) tr.localRotation = new Quaternion(r[i * 4], r[i * 4 + 1], r[i * 4 + 2], r[i * 4 + 3]);
                    else tr.localScale = new Vector3(s[i * 3], s[i * 3 + 1], s[i * 3 + 2]);
                }
            }
            return tila;
        }

        public static void Poista()
        {
            var v = Aktiivinen; Aktiivinen = null;
            if (v == null) return;
            if (v.juuri != null) UnityEngine.Object.Destroy(v.juuri);
            foreach (var o in v.luodut) if (o != null) UnityEngine.Object.Destroy(o);
        }
    }
}
