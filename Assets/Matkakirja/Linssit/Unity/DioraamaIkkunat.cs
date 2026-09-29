// DIORAAMAN IKKUNAKEILAT (Olavinlinna, Siirtoseppä 29.9.2026): Blenderin ikkuna:-tyhjästä huoneeseen laskeva
// valokeila pölyineen (DioraamaKeila.shader). Tyhjän paikallinen +Y (Blenderissä tyhjän Z-akseli) osoittaa keilan
// suunnan huoneeseen; ikkunan leveys on tyhjän X, korkeus Z.
// extras: leveys (m, 0,6), korkeus (m, 1,0), pituus (m, 4), levenema (0,3), voima (0,25), vari ("#fff0d8"),
// poly (0–1, 1). Mesh rakennetaan kerran ja jaetaan; materiaali per ikkuna. Aika = dioraaman t kuten savulla.
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaIkkunat
    {
        const int Polya = 40;
        static readonly int IdVari = Shader.PropertyToID("_Vari"), IdVoima = Shader.PropertyToID("_Voima"),
            IdPituus = Shader.PropertyToID("_Pituus"), IdKoko = Shader.PropertyToID("_Koko"),
            IdLevenema = Shader.PropertyToID("_Levenema"), IdPoly = Shader.PropertyToID("_Poly"), IdAika = Shader.PropertyToID("_Aika");

        readonly Transform juuri;
        readonly Shader varjostin;
        Mesh mesh;
        readonly List<(GameObject Go, Material M)> keilat = new List<(GameObject, Material)>();

        public DioraamaIkkunat(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaKeila");
        }

        public int Keiloja => keilat.Count;

        public void LisaaTila(string tilaId, Transform tilanJuuri, List<DioraamaTyhja> tyhjat, Action<string> kirjaa)
        {
            if (tyhjat == null) return;
            foreach (var t in tyhjat)
            {
                if (t.Laji != "ikkuna") continue;
                if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaKeila-varjostin puuttuu"); return; }
                VarmistaMesh();
                float pituus = Mathf.Max(0.2f, t.Luku("pituus", 4f));
                var m = new Material(varjostin) { name = "Keila:" + tilaId + "/" + t.Id };
                Color vari = new Color(1f, 0.9412f, 0.8471f);
                if (t.Extras != null && t.Extras.TryGetValue("vari", out var v) && v is string hex) ColorUtility.TryParseHtmlString(hex, out vari);
                m.SetColor(IdVari, vari);
                m.SetFloat(IdVoima, Mathf.Max(0f, t.Luku("voima", 0.25f)));
                m.SetFloat(IdPituus, pituus);
                m.SetVector(IdKoko, new Vector4(Mathf.Max(0.05f, t.Luku("leveys", 0.6f)), Mathf.Max(0.05f, t.Luku("korkeus", 1f)), 0, 0));
                m.SetFloat(IdLevenema, Mathf.Max(0f, t.Luku("levenema", 0.3f)));
                m.SetFloat(IdPoly, Mathf.Clamp01(t.Luku("poly", 1f)));
                var go = new GameObject("Keila:" + tilaId + "/" + t.Id) { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                go.transform.position = tilanJuuri != null ? tilanJuuri.TransformPoint(t.Paikka) : t.Paikka;
                go.transform.rotation = (tilanJuuri != null ? tilanJuuri.rotation : Quaternion.identity) * t.Suunta;
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = m;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                // Kärjet ovat yksikkömuodossa (varjostin venyttää): rajat käsin koko keilan kattaviksi.
                r.localBounds = new Bounds(new Vector3(0, pituus * 0.5f, 0), new Vector3(4f, pituus + 1f, 4f));
                keilat.Add((go, m));
            }
        }

        public void Paivita(double t, bool vahennettyLiike)
        {
            float aika = vahennettyLiike ? 10f : (float)(t % 3600.0);
            foreach (var (_, m) in keilat) if (m != null) m.SetFloat(IdAika, aika);
        }

        void VarmistaMesh()
        {
            if (mesh != null) return;
            var paikat = new List<Vector3>();
            var uvt = new List<Vector2>();
            var lajit = new List<Vector2>();
            var kolmiot = new List<int>();
            void Nelio(Vector3 a, Vector3 b, Vector3 c, Vector3 d, Vector2 ua, Vector2 ub, Vector2 uc, Vector2 ud, Vector2 laji)
            {
                int k = paikat.Count;
                paikat.Add(a); paikat.Add(b); paikat.Add(c); paikat.Add(d);
                uvt.Add(ua); uvt.Add(ub); uvt.Add(uc); uvt.Add(ud);
                for (int i = 0; i < 4; i++) lajit.Add(laji);
                kolmiot.Add(k); kolmiot.Add(k + 1); kolmiot.Add(k + 2);
                kolmiot.Add(k); kolmiot.Add(k + 2); kolmiot.Add(k + 3);
            }
            // Keilan sivut: x = ±1 ja z = ±1 (kulmamerkit), y = 0 kärki / 1 pää; uv = (poikki, pitkin).
            var keila = Vector2.zero;
            Nelio(new Vector3(-1, 0, -1), new Vector3(-1, 0, 1), new Vector3(-1, 1, 1), new Vector3(-1, 1, -1), new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1), keila);
            Nelio(new Vector3(1, 0, -1), new Vector3(1, 0, 1), new Vector3(1, 1, 1), new Vector3(1, 1, -1), new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1), keila);
            Nelio(new Vector3(-1, 0, -1), new Vector3(1, 0, -1), new Vector3(1, 1, -1), new Vector3(-1, 1, -1), new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1), keila);
            Nelio(new Vector3(-1, 0, 1), new Vector3(1, 0, 1), new Vector3(1, 1, 1), new Vector3(-1, 1, 1), new Vector2(0, 0), new Vector2(1, 0), new Vector2(1, 1), new Vector2(0, 1), keila);
            // Pöly: kaikki kärjet origossa, uv = kulma, laji = (1, siemen).
            var satunnainen = new System.Random(1475);
            for (int k = 0; k < Polya; k++)
            {
                var laji = new Vector2(1f, (float)satunnainen.NextDouble());
                Nelio(Vector3.zero, Vector3.zero, Vector3.zero, Vector3.zero, new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1), laji);
            }
            mesh = new Mesh { name = "DioraamaKeila" };
            mesh.SetVertices(paikat);
            mesh.SetUVs(0, uvt);
            mesh.SetUVs(1, lajit);
            mesh.SetTriangles(kolmiot, 0);
        }

        public void Tyhjenna()
        {
            foreach (var (go, m) in keilat)
            {
                if (go != null) UnityEngine.Object.Destroy(go);
                if (m != null) UnityEngine.Object.Destroy(m);
            }
            keilat.Clear();
            if (mesh != null) UnityEngine.Object.Destroy(mesh);
            mesh = null;
        }
    }
}
