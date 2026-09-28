// DIORAAMAN RAKENNUS (Poikkileikkaus-linssi, Linnanrakentaja erä 1, 29.9.2026): yksi GameObject per tila,
// rakennettu rakennuskoneen (A1, tools/dioraama/rakenna.mjs) leipomasta glb:stä (DioraamaGlb.Lue, unityyn: true
// — koordinaatit ja kolmioiden kiertosuunta ovat jo Unity-avaruudessa, ei lisämuunnosta). Materiaali on jaettu
// PINNAN mukaan (ei tilan): kaikki tilat, joissa on esim. "kivi"-pintaa, käyttävät samaa Material-oliota.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaRakennus
    {
        static readonly int IdVari = Shader.PropertyToID("_Vari"), IdLampo = Shader.PropertyToID("_Lampo");
        static readonly Color OletusVari = new Color(0.72f, 0.68f, 0.61f), OletusLampo = new Color(1f, 0.6902f, 0.3765f);

        readonly Transform juuri;
        readonly Shader varjostin;
        readonly Dictionary<string, Material> materiaalit = new Dictionary<string, Material>();
        readonly Dictionary<string, GameObject> tilat = new Dictionary<string, GameObject>();

        public DioraamaRakennus(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaMaalattu");
        }

        public int TilojaLadattu => tilat.Count;
        public IReadOnlyDictionary<string, GameObject> Tilat => tilat;
        public int Kolmiot { get; private set; }
        public int Karjet { get; private set; }
        public int Materiaaleja => materiaalit.Count;
        public int Renderereita { get; private set; }

        public bool SisaltaaTilan(string id) => tilat.ContainsKey(id);

        /// <summary>Rakentaa yhden tilan glb-tavuista. Palauttaa false (ja kirjaa syyn), jos glb ei kelvannut —
        /// linssi ei kaadu, tila jää vain puuttumaan (dioraama-rajapinnat-20260929.md kohta 6).</summary>
        public bool LisaaTila(Rakennus rakennus, Tila tila, byte[] glbTavut, Action<string> kirjaa)
        {
            if (SisaltaaTilan(tila.Id)) return true;
            if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaMaalattu-varjostin puuttuu"); return false; }
            if (glbTavut == null || glbTavut.Length == 0) { kirjaa?.Invoke($"poikki: {tila.Id} glb tyhjä"); return false; }

            GlbMalli malli;
            try { malli = DioraamaGlb.Lue(glbTavut, true); }
            catch (Exception e) { kirjaa?.Invoke($"poikki: {tila.Id} glb virhe: {e.Message}"); return false; }
            if (malli?.Osat == null || malli.Osat.Count == 0) { kirjaa?.Invoke($"poikki: {tila.Id} glb ilman osia"); return false; }

            int kaikkiKarjet = 0;
            foreach (var osa in malli.Osat) kaikkiKarjet += (osa.Paikat?.Length ?? 0) / 3;
            var paikat = new Vector3[kaikkiKarjet];
            var normaalit = new Vector3[kaikkiKarjet];
            var uvt = new Vector2[kaikkiKarjet];
            var varit = new Color32[kaikkiKarjet];
            var materiaalitJarjestyksessa = new Material[malli.Osat.Count];
            var kolmiotOsittain = new int[malli.Osat.Count][];
            int kv = 0, kolmioita = 0;
            for (int oi = 0; oi < malli.Osat.Count; oi++)
            {
                var osa = malli.Osat[oi];
                int n = (osa.Paikat?.Length ?? 0) / 3;
                for (int i = 0; i < n; i++)
                {
                    paikat[kv + i] = new Vector3(osa.Paikat[i * 3], osa.Paikat[i * 3 + 1], osa.Paikat[i * 3 + 2]);
                    normaalit[kv + i] = osa.Normaalit != null && osa.Normaalit.Length >= (i + 1) * 3
                        ? new Vector3(osa.Normaalit[i * 3], osa.Normaalit[i * 3 + 1], osa.Normaalit[i * 3 + 2]) : Vector3.up;
                    uvt[kv + i] = osa.Uv != null && osa.Uv.Length >= (i + 1) * 2 ? new Vector2(osa.Uv[i * 2], osa.Uv[i * 2 + 1]) : Vector2.zero;
                    varit[kv + i] = osa.Varit != null && osa.Varit.Length >= (i + 1) * 4
                        ? new Color32(osa.Varit[i * 4], osa.Varit[i * 4 + 1], osa.Varit[i * 4 + 2], osa.Varit[i * 4 + 3])
                        : new Color32(255, 0, 0, 255);
                }
                int[] lahde = osa.Kolmiot ?? Array.Empty<int>();
                var kolmiot = new int[lahde.Length];
                for (int i = 0; i < lahde.Length; i++) kolmiot[i] = lahde[i] + kv;
                kolmiotOsittain[oi] = kolmiot;
                kolmioita += kolmiot.Length / 3;
                materiaalitJarjestyksessa[oi] = MateriaaliPinnalle(rakennus, osa.Pinta);
                kv += n;
            }

            var mesh = new Mesh { name = "Dioraama:" + tila.Id, indexFormat = IndexFormat.UInt32 };
            mesh.SetVertices(paikat);
            mesh.SetNormals(normaalit);
            mesh.SetUVs(0, uvt);
            mesh.SetColors(varit);
            mesh.subMeshCount = malli.Osat.Count;
            for (int oi = 0; oi < malli.Osat.Count; oi++) mesh.SetTriangles(kolmiotOsittain[oi], oi);
            mesh.RecalculateBounds();

            var go = new GameObject("Tila:" + tila.Id) { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var renderer = go.AddComponent<MeshRenderer>();
            renderer.sharedMaterials = materiaalitJarjestyksessa;
            renderer.shadowCastingMode = ShadowCastingMode.Off;
            renderer.receiveShadows = false;

            tilat[tila.Id] = go;
            Kolmiot += kolmioita;
            Karjet += kaikkiKarjet;
            Renderereita++;
            return true;
        }

        Material MateriaaliPinnalle(Rakennus rakennus, string pintaId)
        {
            string avain = pintaId ?? "?";
            if (materiaalit.TryGetValue(avain, out var m)) return m;
            Color vari = OletusVari;
            double hehku = 0;
            if (pintaId != null && rakennus.Pinnat != null && rakennus.Pinnat.TryGetValue(pintaId, out var pinta))
            {
                if (string.IsNullOrEmpty(pinta.Vari) || !ColorUtility.TryParseHtmlString(pinta.Vari, out vari)) vari = OletusVari;
                hehku = pinta.Hehku;
            }
            m = new Material(varjostin) { name = "Dioraama/" + avain };
            // sRGB-hex → lineaarinen (varjostin ei tee tätä materiaaliväreille, ks. DioraamaMaalattu.shader-kommentti).
            m.SetColor(IdVari, vari); // SetColor muuntaa sRGB:n lineaariseksi itse (lineaarinen väriavaruus)
            Color lampo = hehku > 0 ? Color.Lerp(OletusLampo, new Color(1f, 0.35f, 0.08f), Mathf.Clamp01((float)hehku)) : OletusLampo;
            m.SetColor(IdLampo, lampo);
            materiaalit[avain] = m;
            return m;
        }

        public void Tyhjenna()
        {
            foreach (var go in tilat.Values)
            {
                if (go == null) continue;
                var mf = go.GetComponent<MeshFilter>();
                if (mf != null && mf.sharedMesh != null) UnityEngine.Object.Destroy(mf.sharedMesh);
                UnityEngine.Object.Destroy(go);
            }
            tilat.Clear();
            foreach (var m in materiaalit.Values) if (m != null) UnityEngine.Object.Destroy(m);
            materiaalit.Clear();
            Kolmiot = 0; Karjet = 0; Renderereita = 0;
        }
    }
}
