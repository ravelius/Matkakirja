// DIORAAMAN LOKKIPARVET (Olavinlinna, tunnelma; Siirtoseppä 29.9.2026): Blenderin lokit:NN-tyhjä → parvi, joka
// kaartelee tyhjän ympärillä (DioraamaLokit.shader, kaikki liike kärkivarjostimessa dioraaman ajasta).
// extras: maara (lintuja, 6), sade (m, 20), korkeus (m tyhjän yläpuolella, 12). Mesh per lintumäärä jaetaan.
using System;
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaLokit
    {
        static readonly int IdSade = Shader.PropertyToID("_Sade"), IdKorkeus = Shader.PropertyToID("_Korkeus"),
            IdAika = Shader.PropertyToID("_Aika");
        public static readonly int IdLintuValo = Shader.PropertyToID("_DioraamaLintuValo");

        readonly Transform juuri;
        readonly Shader varjostin;
        readonly Dictionary<int, Mesh> meshit = new Dictionary<int, Mesh>();
        readonly List<(GameObject Go, Material M)> parvet = new List<(GameObject, Material)>();

        public DioraamaLokit(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaLokit");
            Shader.SetGlobalFloat(IdLintuValo, 1f);
        }

        public int Parvia => parvet.Count;

        public void LisaaTila(string tilaId, Transform tilanJuuri, List<DioraamaTyhja> tyhjat, Action<string> kirjaa)
        {
            if (tyhjat == null) return;
            foreach (var t in tyhjat)
            {
                if (t.Laji != "lokit") continue;
                if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaLokit-varjostin puuttuu"); return; }
                int maara = Mathf.Clamp(Mathf.RoundToInt(t.Luku("maara", 6f)), 1, 64);
                float sade = Mathf.Max(1f, t.Luku("sade", 20f)), korkeus = t.Luku("korkeus", 12f);
                var m = new Material(varjostin) { name = "Lokit:" + tilaId + "/" + t.Id };
                m.SetFloat(IdSade, sade);
                m.SetFloat(IdKorkeus, korkeus);
                var go = new GameObject("Lokit:" + tilaId + "/" + t.Id) { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                go.transform.position = tilanJuuri != null ? tilanJuuri.TransformPoint(t.Paikka) : t.Paikka;
                go.AddComponent<MeshFilter>().sharedMesh = Mesh(maara);
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = m;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                // Kärjet ovat origossa: rajat käsin koko radan kattaviksi.
                r.localBounds = new Bounds(new Vector3(0, korkeus, 0), new Vector3(sade * 2f + 4f, 8f, sade * 2f + 4f));
                parvet.Add((go, m));
            }
        }

        public void Paivita(double t, bool vahennettyLiike)
        {
            // Vähennetty liike: parvi pysähtyy (sama periaate kuin savulla), linnut jäävät näkyviin.
            float aika = vahennettyLiike ? 5f : (float)(t % 3600.0);
            foreach (var (_, m) in parvet) if (m != null) m.SetFloat(IdAika, aika);
        }

        Mesh Mesh(int maara)
        {
            if (meshit.TryGetValue(maara, out var m) && m != null) return m;
            var paikat = new Vector3[maara * 4];
            var osat = new Vector2[maara * 4];
            var siemenet = new Vector2[maara * 4];
            var kolmiot = new int[maara * 6];
            var sat = new System.Random(1475 + maara);
            for (int k = 0; k < maara; k++)
            {
                var s = new Vector2((float)sat.NextDouble(), (float)sat.NextDouble());
                osat[k * 4] = new Vector2(0, 0);     // etu
                osat[k * 4 + 1] = new Vector2(0, 1); // taka
                osat[k * 4 + 2] = new Vector2(-1, 0.5f);
                osat[k * 4 + 3] = new Vector2(1, 0.5f);
                for (int c = 0; c < 4; c++) siemenet[k * 4 + c] = s;
                kolmiot[k * 6] = k * 4; kolmiot[k * 6 + 1] = k * 4 + 2; kolmiot[k * 6 + 2] = k * 4 + 1;
                kolmiot[k * 6 + 3] = k * 4; kolmiot[k * 6 + 4] = k * 4 + 1; kolmiot[k * 6 + 5] = k * 4 + 3;
            }
            m = new Mesh { name = "DioraamaLokit" + maara };
            m.SetVertices(paikat);
            m.SetUVs(0, osat);
            m.SetUVs(1, siemenet);
            m.SetTriangles(kolmiot, 0);
            meshit[maara] = m;
            return m;
        }

        public void Tyhjenna()
        {
            foreach (var (go, m) in parvet)
            {
                if (go != null) UnityEngine.Object.Destroy(go);
                if (m != null) UnityEngine.Object.Destroy(m);
            }
            parvet.Clear();
            foreach (var m in meshit.Values) if (m != null) UnityEngine.Object.Destroy(m);
            meshit.Clear();
        }
    }
}
