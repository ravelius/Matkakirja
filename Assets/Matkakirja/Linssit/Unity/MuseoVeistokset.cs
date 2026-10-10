// TAIDEMUSEON PATSAAT LAITTEELLA (Natiiviseppä 10.10.2026; PT 11.2x, suunnitelma 6.4: veistokset ≤ 40 Mt/sali, vain näkyvä osa).
// Paketti tyokalut/veisto_blender.py + astc6.py: <juuri>patsaat/<id>/{malli.glb (yksi mesh, float, origo pohjan keskellä, todellinen koko),
// vari.astcm (2048 ASTC 6×6 + mipit), veisto.json}. Lukija DioraamaGlb (taustasäikeessä), materiaali MuseoValaistu (valot maailman paikasta
// kuten teoksilla). Valinta VeistosValinta: lähimmät kameraa ensin budjettiin asti, yli 30 m ei; muut puretaan (mesh + tekstuuri pois).
// Paikat antaa MuseoRakennus (Sali.Veistospaikat, LS1): Isa = jalustan yläpinnan keskipiste, suunta katseen mukaan.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Museo;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class MuseoVeistokset : MonoBehaviour
    {
        public sealed class Veistospaikka { public string Patsas; public Transform Isa; }

        /// <summary>Patsaspakettien juuri (…/taidemuseo/&lt;maa&gt;/astc-v1/patsaat/); null = ei patsaita.</summary>
        public string Juuri;
        public Func<IList<Veistospaikka>> Paikat;
        public Func<Material> Pohjamateriaali;   // MuseoValaistu-marmori (LS1), kopioidaan per patsas
        public Action<string> Kirjaa;

        sealed class Ladattu { public GameObject Go; public Mesh Mesh; public Texture2D Kuva; public Material Mat; public long Tavut; }
        readonly Dictionary<string, Ladattu> ladatut = new Dictionary<string, Ladattu>();
        readonly Dictionary<string, long> arviot = new Dictionary<string, long>();
        readonly HashSet<string> haussa = new HashSet<string>(), puuttuu = new HashSet<string>();
        readonly List<(string, double, long)> ehdokkaat = new List<(string, double, long)>();
        float seuraava;
        public long Tavut { get; private set; }

        public void Paivita(Camera kamera)
        {
            if (Juuri == null || Paikat == null || kamera == null || Time.unscaledTime < seuraava) return;
            seuraava = Time.unscaledTime + 0.5f;
            var paikat = Paikat();
            if (paikat == null) return;
            ehdokkaat.Clear();
            var kp = kamera.transform.position;
            foreach (var p in paikat)
            {
                if (p?.Patsas == null || p.Isa == null || puuttuu.Contains(p.Patsas)) continue;
                long t = ladatut.TryGetValue(p.Patsas, out var l) ? l.Tavut : arviot.TryGetValue(p.Patsas, out var a) ? a : MuseoMuisti.VeistosTavut(80000, 150000, 2048, 2048);
                ehdokkaat.Add((p.Patsas, Vector3.Distance(kp, p.Isa.position), t));
            }
            var halutut = new HashSet<string>(VeistosValinta.Valitse(ehdokkaat));
            foreach (var id in new List<string>(ladatut.Keys)) if (!halutut.Contains(id)) Pura(id);
            foreach (var p in paikat)
                if (p?.Patsas != null && halutut.Contains(p.Patsas) && !ladatut.ContainsKey(p.Patsas) && haussa.Add(p.Patsas))
                    StartCoroutine(Lataa(p.Patsas, p.Isa));
        }

        IEnumerator Lataa(string id, Transform isa)
        {
            byte[] glb = null, astc = null;
            yield return MuseoTekstuurit.Hae(Juuri + id + "/malli.glb", b => glb = b);
            if (glb != null) yield return MuseoTekstuurit.Hae(Juuri + id + "/vari.astcm", b => astc = b);
            if (glb == null) { haussa.Remove(id); puuttuu.Add(id); Kirjaa?.Invoke($"museo: patsas {id} puuttuu ({Juuri}{id}/malli.glb)"); yield break; }
            var tyo = Task.Run(() => DioraamaGlb.Lue(glb, true));
            while (!tyo.IsCompleted) yield return null;
            haussa.Remove(id);
            if (tyo.IsFaulted || tyo.Result.Osat.Count == 0 || isa == null) { puuttuu.Add(id); Kirjaa?.Invoke($"museo: patsas {id} glb-virhe {tyo.Exception?.InnerException?.Message}"); yield break; }
            var osa = tyo.Result.Osat[0];
            int n = osa.Paikat.Length / 3;
            var mesh = new Mesh { name = "Patsas " + id, indexFormat = n > 65000 ? IndexFormat.UInt32 : IndexFormat.UInt16 };
            var p = new Vector3[n]; var nn = new Vector3[n]; var uv = new Vector2[n];
            for (int i = 0; i < n; i++)
            {
                p[i] = new Vector3(osa.Paikat[3 * i], osa.Paikat[3 * i + 1], osa.Paikat[3 * i + 2]);
                if (osa.Normaalit != null) nn[i] = new Vector3(osa.Normaalit[3 * i], osa.Normaalit[3 * i + 1], osa.Normaalit[3 * i + 2]);
                if (osa.Uv != null) uv[i] = new Vector2(osa.Uv[2 * i], 1f - osa.Uv[2 * i + 1]);   // glTF v alas → Unity v ylös
            }
            mesh.vertices = p; mesh.normals = nn; mesh.uv = uv;
            mesh.SetIndices(osa.Kolmiot, MeshTopology.Triangles, 0);
            mesh.RecalculateBounds();
            mesh.UploadMeshData(true);   // CPU-kopio pois
            var kuva = astc != null ? DioraamaAstc.Lue(astc, "Patsas " + id) : null;
            var pohja = Pohjamateriaali?.Invoke();
            var mat = pohja != null ? new Material(pohja) : new Material(Shader.Find("Universal Render Pipeline/Unlit"));
            mat.name = "Patsas " + id;
            if (kuva != null) mat.mainTexture = kuva;
            var go = new GameObject("Patsas " + id) { layer = isa.gameObject.layer };
            go.transform.SetParent(isa, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>(); r.sharedMaterial = mat; r.shadowCastingMode = ShadowCastingMode.Off;
            long tavut = MuseoMuisti.VeistosTavut(n, osa.Kolmiot.Length / 3, kuva != null ? kuva.width : 0, kuva != null ? kuva.height : 0);
            arviot[id] = tavut;
            ladatut[id] = new Ladattu { Go = go, Mesh = mesh, Kuva = kuva, Mat = mat, Tavut = tavut };
            Tavut += tavut;
            Kirjaa?.Invoke($"museo: patsas {id} {osa.Kolmiot.Length / 3} kolmiota, {tavut / 1e6:F1} Mt (yht {Tavut / 1e6:F1} Mt)");
        }

        void Pura(string id)
        {
            if (!ladatut.TryGetValue(id, out var l)) return;
            if (l.Go != null) Destroy(l.Go);
            if (l.Mesh != null) Destroy(l.Mesh);
            if (l.Kuva != null) Destroy(l.Kuva);
            if (l.Mat != null) Destroy(l.Mat);
            Tavut -= l.Tavut; ladatut.Remove(id);
        }

        public void Vapauta()
        {
            StopAllCoroutines();
            foreach (var id in new List<string>(ladatut.Keys)) Pura(id);
            haussa.Clear(); puuttuu.Clear(); Tavut = 0;
        }

        void OnDestroy() => Vapauta();
    }
}
