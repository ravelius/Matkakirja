// DIORAAMAN SAVU JA LEIVOTUN VALON LIEKKIPISTEET (Olavinlinna uudella tavalla, Siirtoseppä 29.9.2026; työnjako:
// Linnanrakentaja = Blender-mallit ja leivottu valo, Siirtoseppä = Unityn valo ja efektit).
//
// TYHJÄT: Blenderin glb:n mesh-ttömät solmut nimillä "valo:<id>", "liekki:<id>" ja "ikkuna:<id>" (custom properties
// → glTF extras). Paikka lasketaan koko solmuhierarkian läpi (GlbSolmu TRS, DioraamaGlb.Lue unityyn: true), joten
// tulos on tilan GameObjectin (juuri, identiteetti) avaruudessa.
//
// SAVU: liekki:-tyhjän yllä (extras: savu 0…1, oletus 1; korkeus m, oletus 1,2; koko m = liekin korkeus, oletus
// 0,45). Yksi jaettu mesh (Hiukkasia nelikulmiota, kaikki kärjet origossa; uv0 = kulma, uv1 = siemen ja vaihe),
// DioraamaSavu.shader laskee kaiken kärkivarjostimessa ajasta _SavuAika (sama dioraaman t kuin liekeillä, joten
// "poikki aika" pysäyttää savunkin). Materiaali per emitteri (korkeus, peitto), ei per ruutu CPU-työtä.
//
// LIEKKIPISTEET: DioraamaLeivottu.shaderin lämmin lepatus liekkien lähellä (_DioraamaLiekkiPisteet[8],
// _DioraamaLiekkiMaara). Pisteet ovat maailmassa; säde extras.sade (oletus 2,5 m).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>Yksi Blenderin tyhjä: laji (valo | liekki | ikkuna), tunnus, paikka ja suunta tilan avaruudessa.</summary>
    public sealed class DioraamaTyhja
    {
        public string Laji, Id;
        public Vector3 Paikka;
        public Quaternion Suunta = Quaternion.identity;
        public Dictionary<string, object> Extras;

        public float Luku(string avain, float oletus) =>
            Extras != null && Extras.TryGetValue(avain, out var v) && v is double d ? (float)d : oletus;

        /// <summary>Lukee glb:n tyhjät (solmut ilman meshiä, nimi "laji:id"); maailmapaikka koko hierarkian läpi.</summary>
        public static List<DioraamaTyhja> Lue(GlbMalli malli)
        {
            var tulos = new List<DioraamaTyhja>();
            if (malli?.Solmut == null) return tulos;
            var mat = new Matrix4x4[malli.Solmut.Count];
            var valmis = new bool[malli.Solmut.Count];
            Matrix4x4 Maailma(int i, int syvyys)
            {
                if (valmis[i]) return mat[i];
                var s = malli.Solmut[i];
                var oma = Matrix4x4.TRS(new Vector3(s.Translation[0], s.Translation[1], s.Translation[2]),
                    new Quaternion(s.Rotation[0], s.Rotation[1], s.Rotation[2], s.Rotation[3]).normalized,
                    new Vector3(s.Scale[0], s.Scale[1], s.Scale[2]));
                // Syvyysraja suojaa virheelliseltä (syklin sisältävältä) children-kentältä.
                var m = s.Vanhempi >= 0 && s.Vanhempi < mat.Length && syvyys < 64 ? Maailma(s.Vanhempi, syvyys + 1) * oma : oma;
                mat[i] = m; valmis[i] = true;
                return m;
            }
            for (int i = 0; i < malli.Solmut.Count; i++)
            {
                var s = malli.Solmut[i];
                if (s.Osat.Count > 0 || string.IsNullOrEmpty(s.Nimi)) continue;
                int kaksoispiste = s.Nimi.IndexOf(':');
                if (kaksoispiste <= 0) continue;
                string laji = s.Nimi.Substring(0, kaksoispiste).ToLowerInvariant();
                if (laji != "valo" && laji != "liekki" && laji != "ikkuna") continue;
                var m = Maailma(i, 0);
                tulos.Add(new DioraamaTyhja
                {
                    Laji = laji, Id = s.Nimi.Substring(kaksoispiste + 1), Extras = s.Extras,
                    Paikka = m.GetColumn(3), Suunta = m.rotation,
                });
            }
            return tulos;
        }
    }

    public sealed class DioraamaSavu
    {
        const int Hiukkasia = 24;
        static readonly int IdAika = Shader.PropertyToID("_SavuAika"), IdKorkeus = Shader.PropertyToID("_Korkeus"),
            IdKoko = Shader.PropertyToID("_Koko"), IdPeitto = Shader.PropertyToID("_Peitto"),
            IdPisteet = Shader.PropertyToID("_DioraamaLiekkiPisteet"), IdMaara = Shader.PropertyToID("_DioraamaLiekkiMaara");
        public const int LiekkipisteitaEnintaan = 8;

        readonly Transform juuri;
        readonly Shader varjostin;
        Mesh mesh;
        readonly List<(GameObject Go, Material M)> emitterit = new List<(GameObject, Material)>();
        readonly List<Vector4> liekkipisteet = new List<Vector4>();
        readonly Vector4[] pistePuskuri = new Vector4[LiekkipisteitaEnintaan];

        public DioraamaSavu(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaSavu");
            PaivitaLiekkipisteet();
        }

        public int Emittereita => emitterit.Count;

        /// <summary>Tilan liekki:-tyhjät savuksi ja lepatuspisteiksi. tilanJuuri = tilan GameObject (tyhjien avaruus).</summary>
        public void LisaaTila(string tilaId, Transform tilanJuuri, List<DioraamaTyhja> tyhjat, Action<string> kirjaa)
        {
            if (tyhjat == null) return;
            foreach (var t in tyhjat)
            {
                if (t.Laji != "liekki") continue;
                Vector3 maailma = tilanJuuri != null ? tilanJuuri.TransformPoint(t.Paikka) : t.Paikka;
                if (liekkipisteet.Count < LiekkipisteitaEnintaan) liekkipisteet.Add(new Vector4(maailma.x, maailma.y, maailma.z, t.Luku("sade", 2.5f)));
                float savu = Mathf.Clamp01(t.Luku("savu", 1f));
                if (savu <= 0f) continue;
                if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaSavu-varjostin puuttuu"); continue; }
                VarmistaMesh();
                float koko = Mathf.Max(0.05f, t.Luku("koko", 0.45f));
                var m = new Material(varjostin) { name = "Savu:" + tilaId + "/" + t.Id };
                m.SetFloat(IdKorkeus, Mathf.Max(0.1f, t.Luku("korkeus", 1.2f)));
                m.SetVector(IdKoko, new Vector4(0.3f * koko, 1.3f * koko, 0, 0));
                m.SetFloat(IdPeitto, 0.35f * savu);
                var go = new GameObject("Savu:" + tilaId + "/" + t.Id) { layer = DioraamaNayttamo.Kerros };
                go.transform.SetParent(juuri, false);
                // Savu alkaa liekin kärjestä (≈ koko) eikä pesän pohjalta.
                go.transform.position = maailma + Vector3.up * koko * 0.8f;
                go.AddComponent<MeshFilter>().sharedMesh = mesh;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = m;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                emitterit.Add((go, m));
            }
            PaivitaLiekkipisteet();
            kirjaa?.Invoke($"poikki: {tilaId} savu {emitterit.Count} emitteriä, liekkipisteitä {liekkipisteet.Count}");
        }

        /// <summary>Dioraaman aika t (sama kuin liekeillä); vähennetty liike jäädyttää savun.</summary>
        public void Paivita(double t, bool vahennettyLiike)
        {
            float aika = vahennettyLiike ? 2.5f : (float)(t % 3600.0);
            foreach (var (_, m) in emitterit) if (m != null) m.SetFloat(IdAika, aika);
        }

        void PaivitaLiekkipisteet()
        {
            for (int i = 0; i < pistePuskuri.Length; i++) pistePuskuri[i] = i < liekkipisteet.Count ? liekkipisteet[i] : Vector4.zero;
            Shader.SetGlobalVectorArray(IdPisteet, pistePuskuri);
            Shader.SetGlobalFloat(IdMaara, liekkipisteet.Count);
        }

        void VarmistaMesh()
        {
            if (mesh != null) return;
            var paikat = new Vector3[Hiukkasia * 4];
            var kulmat = new Vector2[Hiukkasia * 4];
            var siemenet = new Vector2[Hiukkasia * 4];
            var kolmiot = new int[Hiukkasia * 6];
            var satunnainen = new System.Random(1873);
            for (int k = 0; k < Hiukkasia; k++)
            {
                var siemen = new Vector2((float)satunnainen.NextDouble(), (k + 0.5f * (float)satunnainen.NextDouble()) / Hiukkasia);
                kulmat[k * 4] = new Vector2(-1, -1); kulmat[k * 4 + 1] = new Vector2(1, -1);
                kulmat[k * 4 + 2] = new Vector2(1, 1); kulmat[k * 4 + 3] = new Vector2(-1, 1);
                for (int c = 0; c < 4; c++) siemenet[k * 4 + c] = siemen;
                kolmiot[k * 6] = k * 4; kolmiot[k * 6 + 1] = k * 4 + 1; kolmiot[k * 6 + 2] = k * 4 + 2;
                kolmiot[k * 6 + 3] = k * 4; kolmiot[k * 6 + 4] = k * 4 + 2; kolmiot[k * 6 + 5] = k * 4 + 3;
            }
            mesh = new Mesh { name = "DioraamaSavu" };
            mesh.SetVertices(paikat);
            mesh.SetUVs(0, kulmat);
            mesh.SetUVs(1, siemenet);
            mesh.SetTriangles(kolmiot, 0);
            // Kaikki kärjet ovat origossa: rajat käsin koko nousun kattaviksi, muuten savu karsiutuisi näkyvistä.
            mesh.bounds = new Bounds(new Vector3(0, 1.5f, 0), new Vector3(3f, 4f, 3f));
        }

        public void Tyhjenna()
        {
            foreach (var (go, m) in emitterit)
            {
                if (go != null) UnityEngine.Object.Destroy(go);
                if (m != null) UnityEngine.Object.Destroy(m);
            }
            emitterit.Clear();
            liekkipisteet.Clear();
            PaivitaLiekkipisteet();
            if (mesh != null) UnityEngine.Object.Destroy(mesh);
            mesh = null;
        }
    }
}
