// HISTORIAMOOTTORI V4 / E2: POIMINTA JA HEITTO (Siirtoseppä 7.10.2026; pystyleikkeen keittiön harhautus: Fogg heittää esineen,
// kolahdus kuuluu vartijalle, joka lähtee etsimään äänen luota).
// - Esineet merkeistä esine:<id> { paikka, glb, heitettava } (Linnanrakentajan kavely/merkit.json; glb osat.jsonin kansiossa, oma kuva),
//   DioraamaMaasto-varjostimella kuten vene. Törmäys pallolla kerroksessa DioraamaNayttamo.Kerros (kapseli astuu yli, 0,35 m).
// - Toiminto (E-näppäin, peliohjaimen X, Natiivi-UI:n toimintonappi heijastuksella, testi "poikki kavely toiminto"): kädessä → heitto
//   katseen suuntaan (7 m/s eteen, 3,5 m/s ylös), muuten lähin heitettävä 1,2 m:n säteeltä käteen.
// - Ensimmäinen kova osuma (> 1,5 m/s): ääni vartijoille (SeikkailuVartijat.Aani, 12 m) ja kolahdus 3D:nä kuulokehyksestä.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuEsineet : MonoBehaviour
    {
        public static SeikkailuEsineet Aktiivinen { get; private set; }
        public const float PoimintaM = 1.2f, HeittoEteen = 7f, HeittoYlos = 3.5f, KuuluuM = 12f;
        static readonly int IdKuva = Shader.PropertyToID("_Kuva");
        /// <summary>Kolahduksen klippi (rakennus.json aanet pikari-1); Sovitin asettaa.</summary>
        public static AudioClip KolahdusKlippi;
        /// <summary>Kolahdus (paikka): Sovitin soittaa kokin harhautusrepliikin, jos kokki on lähellä.</summary>
        public static event Action<Vector3> Kolahti;
        /// <summary>Testi / kosketusnappi: seuraava ruutu tekee toiminnon.</summary>
        public static bool ToimintoPyydetty;

        sealed class Esine { public string Id; public GameObject Go; public Rigidbody Rb; public bool Heitetty, Kuului; }
        readonly List<Esine> esineet = new List<Esine>();
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        Esine kadessa;
        Action<string> kirjaa;
        public string Lahin { get; private set; }
        public string Kadessa => kadessa?.Id;

        public static IEnumerator Lataa(KavelyData d, string juuri, Func<string, string> url, Transform isa, Action<string> kirjaa)
        {
            Poista();
            if (d == null) yield break;
            var go = new GameObject("Seikkailu esineet") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var se = go.AddComponent<SeikkailuEsineet>();
            se.kirjaa = kirjaa; Aktiivinen = se;
            var varjostin = Shader.Find("Matkakirja/Linssit/DioraamaMaasto");
            foreach (var m in d.Lajia("esine"))
            {
                if (string.IsNullOrEmpty(m.Glb) || !m.Heitettava) continue;
                byte[] b = null;
                yield return DioraamaLevyvalimuisti.Hae(url(juuri + m.Glb), 60, t => b = t);
                if (b == null || se == null) continue;
                GlbMalli malli;
                try { malli = DioraamaGlb.Lue(b, true); } catch (Exception ex) { kirjaa?.Invoke($"seikkailu: esine {m.Tunnus} glb virhe: {ex.Message}"); continue; }
                var eg = new GameObject("Esine:" + m.Tunnus) { layer = DioraamaNayttamo.Kerros };
                eg.transform.SetParent(go.transform, false);
                eg.transform.position = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
                Texture2D kuva = null;
                if (malli.Kuvat.Count > 0 && malli.Kuvat[0] != null)
                {
                    kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false) { name = "Esine:" + m.Tunnus };
                    if (kuva.LoadImage(malli.Kuvat[0], false)) se.luodut.Add(kuva); else { Destroy(kuva); kuva = null; }
                }
                var mat = varjostin != null ? new Material(varjostin) { name = "Esine:" + m.Tunnus } : null;
                if (mat != null) { if (kuva != null) mat.SetTexture(IdKuva, kuva); se.luodut.Add(mat); }
                var mesh = Mesh(malli); se.luodut.Add(mesh);
                eg.AddComponent<MeshFilter>().sharedMesh = mesh;
                var mr = eg.AddComponent<MeshRenderer>(); mr.sharedMaterial = mat; mr.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.On;
                var sc = eg.AddComponent<SphereCollider>(); sc.center = mesh.bounds.center; sc.radius = Mathf.Max(0.04f, mesh.bounds.extents.magnitude * 0.6f);
                var rb = eg.AddComponent<Rigidbody>(); rb.mass = 0.6f; rb.isKinematic = true; rb.interpolation = RigidbodyInterpolation.Interpolate;
                rb.collisionDetectionMode = CollisionDetectionMode.ContinuousDynamic;
                var e = new Esine { Id = m.Tunnus, Go = eg, Rb = rb };
                eg.AddComponent<Osuma>().Kun = (nopeus, kohta) => se.Osui(e, nopeus, kohta);
                se.esineet.Add(e);
            }
            kirjaa?.Invoke($"seikkailu: esineet {se.esineet.Count} ({string.Join(", ", se.esineet.ConvertAll(x => x.Id))})");
        }

        static Mesh Mesh(GlbMalli malli)
        {
            var p = new List<Vector3>(); var nr = new List<Vector3>(); var uv = new List<Vector2>(); var kol = new List<int>();
            foreach (var s in malli.Solmut)
                foreach (var o in s.Osat)
                {
                    int a = p.Count, k = (o.Paikat?.Length ?? 0) / 3;
                    for (int i = 0; i < k; i++)
                    {
                        p.Add(new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]));
                        nr.Add(o.Normaalit != null && o.Normaalit.Length >= (i + 1) * 3 ? new Vector3(o.Normaalit[i * 3], o.Normaalit[i * 3 + 1], o.Normaalit[i * 3 + 2]) : Vector3.up);
                        uv.Add(o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero);
                    }
                    foreach (int ix in o.Kolmiot ?? Array.Empty<int>()) kol.Add(ix + a);
                }
            var m = new Mesh { name = "Esine" };
            m.SetVertices(p); m.SetNormals(nr); m.SetUVs(0, uv); m.SetTriangles(kol, 0); m.RecalculateBounds();
            return m;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            if (p == null) return;
            // Lähin heitettävä (ei kädessä eikä lennossa).
            Esine lahin = null; float pd = PoimintaM * PoimintaM;
            var pp = p.transform.position + Vector3.up * 0.9f;
            foreach (var e in esineet)
            {
                if (e == kadessa || e.Go == null) continue;
                float d = (e.Go.transform.position - pp).sqrMagnitude;
                if (d < pd) { pd = d; lahin = e; }
            }
            Lahin = lahin?.Id;
            bool toiminto = ToimintoPyydetty;
            ToimintoPyydetty = false;
            var kb = Keyboard.current; var gp = Gamepad.current;
            if (kb != null && kb.eKey.wasPressedThisFrame) toiminto = true;
            if (gp != null && gp.buttonWest.wasPressedThisFrame) toiminto = true;
            if (!toiminto) return;
            if (kadessa != null) Heita(p);
            else if (lahin != null) Poimi(p, lahin);
        }

        void Poimi(SeikkailuPelaaja p, Esine e)
        {
            kadessa = e; e.Heitetty = false; e.Kuului = false;
            e.Rb.isKinematic = true;
            e.Go.transform.SetParent(p.Hahmo, true);
            e.Go.transform.localPosition = new Vector3(0.25f, 1.05f, 0.3f);
            kirjaa?.Invoke($"seikkailu: poimittu {e.Id}");
        }

        void Heita(SeikkailuPelaaja p)
        {
            var e = kadessa; kadessa = null;
            e.Go.transform.SetParent(transform, true);
            e.Rb.isKinematic = false;
            var eteen = p.Hahmo.forward; eteen.y = 0; eteen.Normalize();
            // Katseen suunta, jos kamera on käännetty (heitto sinne, minne pelaaja katsoo).
            var k = Quaternion.Euler(0, (float)p.Tila.KameraYaw, 0) * Vector3.forward;
            if (k.sqrMagnitude > 0.5f) eteen = k;
            e.Rb.linearVelocity = eteen * HeittoEteen + Vector3.up * HeittoYlos;
            e.Rb.angularVelocity = UnityEngine.Random.insideUnitSphere * 8f;
            e.Heitetty = true;
            kirjaa?.Invoke($"seikkailu: heitetty {e.Id} suuntaan {eteen}");
        }

        void Osui(Esine e, float nopeus, Vector3 kohta)
        {
            if (!e.Heitetty || e.Kuului || nopeus < 1.5f) return;
            e.Kuului = true;
            SeikkailuVartijat.Aani(kohta, KuuluuM);
            Kolahti?.Invoke(kohta);
            if (KolahdusKlippi != null)
            {
                var a = SeikkailuKuulija.Lahde("Kolahdus:" + e.Id, 2f, 30f);
                SeikkailuKuulija.Aseta(a, kohta);
                a.clip = KolahdusKlippi; a.pitch = UnityEngine.Random.Range(0.9f, 1.1f); a.Play();
                Destroy(a.gameObject, KolahdusKlippi.length + 0.2f);
            }
            kirjaa?.Invoke($"seikkailu: kolahdus {e.Id} ({nopeus:F1} m/s) @ {kohta} → vartijoille {KuuluuM} m");
        }

        sealed class Osuma : MonoBehaviour
        {
            public Action<float, Vector3> Kun;
            void OnCollisionEnter(Collision c) => Kun?.Invoke(c.relativeVelocity.magnitude, c.contactCount > 0 ? c.GetContact(0).point : transform.position);
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            foreach (var o in luodut) if (o != null) Destroy(o);
        }
    }
}
