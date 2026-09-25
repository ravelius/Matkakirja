// POTKURIT (Natiivi-UI 24.9.2026, Natiivisepän pyynnöstä): pyörittää lentokonemallin lapsiolioita,
// joiden nimi alkaa "Potkuri" (DC3.fbx: Potkuri_V ja Potkuri_O, origo navassa). Pyörimisakseli on
// potkurin paikallinen Z (Blenderin Y → Unityn +Z = koneen nokan suunta). Nopeus on tahallaan hidas
// (kuvataajuudella täysi kierrosluku näyttäisi stroboskoopilta paikallaan seisovalta).
//
// Suunta nimen mukaan, ei lapsijärjestyksen (Natiiviseppä 24.9., elokuvalento erä 2): dc3_hd.py rakentaa
// oikean (O) potkurin myötäpäivään takaa katsottuna, ja vasen (V) on sen peilikuva, joten V pyörii
// vastapäivään — muuten peilatut lavat kulkisivat takaperin. Unityn vasenkätisessä koordinaatistossa
// positiivinen kierto +Z:n ympäri on myötäpäivään +Z:n suuntaan (takaa) katsottuna.
//
// POTKURIKIEKKO (erä 2): jokaisen potkurin tasoon liike-epäterävä kiekko (Shaders/PotkuriKiekko), säde
// lapojen kärjistä. Kiekko on potkurin vanhemman lapsi, joten se ei pyöri lapojen mukana; haamulapojen
// hidas kierto on varjostimessa.
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    public sealed class Potkurit : MonoBehaviour
    {
        [Tooltip("Asteita sekunnissa.")]
        public float nopeus = 900f;
        public Vector3 akseli = Vector3.forward;

        readonly List<Transform> potkurit = new List<Transform>();
        readonly List<float> suunnat = new List<float>();

        void Awake()
        {
            foreach (var t in GetComponentsInChildren<Transform>(true))
                if (t.name.StartsWith("Potkuri") && !t.name.EndsWith(Kiekkopaate))
                {
                    potkurit.Add(t);
                    suunnat.Add(t.name.EndsWith("_V") ? -1f : 1f);
                }
        }

        void Update()
        {
            float a = nopeus * Time.deltaTime;
            for (int i = 0; i < potkurit.Count; i++)
                potkurit[i].Rotate(akseli, suunnat[i] * a, Space.Self);
        }

        // LÄMPÖERÄ (PallonLepo): kone näkyy (malli aktiivinen) = lavat ja PotkuriKiekon haamulavat (_Time) pyörivät.
        // Lennolla pallo on jo hereillä (Nappula.Liikkeessa, PalloKierto.Seurataan); tämä kattaa kaikki muut hetket.
        void OnEnable() => PallonLepo.Animoi(Pyorii, "potkurit");
        void OnDisable() => PallonLepo.Poista(Pyorii);
        bool Pyorii() => potkurit.Count > 0;

        const string Kiekkopaate = "_kiekko";

        /// <summary>Kiekot potkurien tasoon (Nappula kutsuu mallin luonnin jälkeen). Toinen kutsu ei tee mitään.</summary>
        public void Kiekot(Material materiaali)
        {
            if (materiaali == null) return;
            foreach (var p in potkurit)
            {
                if (p.parent == null || p.parent.Find(p.name + Kiekkopaate) != null) continue;
                // Säde ja taso potkurin omassa koordinaatistossa verkkojen laatikoiden kulmista (lavan kärjen
                // laatikko ylittää säteen vain jänteen puolikkaalla, ~1 %; verkkoja ei lueta: FBX ei ole luettava).
                float sade = 0f, z = 0f;
                int n = 0;
                foreach (var mf in p.GetComponentsInChildren<MeshFilter>())
                {
                    if (mf.sharedMesh == null) continue;
                    var b = mf.sharedMesh.bounds;
                    var m = p.worldToLocalMatrix * mf.transform.localToWorldMatrix;
                    for (int k = 0; k < 8; k++)
                    {
                        var c = m.MultiplyPoint3x4(b.center + Vector3.Scale(b.extents,
                            new Vector3((k & 1) == 0 ? -1 : 1, (k & 2) == 0 ? -1 : 1, (k & 4) == 0 ? -1 : 1)));
                        sade = Mathf.Max(sade, new Vector2(c.x, c.y).magnitude);
                        z += c.z;
                        n++;
                    }
                }
                if (sade <= 0f) continue;
                var go = new GameObject(p.name + Kiekkopaate);
                go.transform.SetParent(p.parent, false);
                go.transform.localPosition = p.localPosition + p.localRotation * Vector3.Scale(p.localScale, new Vector3(0, 0, z / n));
                go.transform.localRotation = p.localRotation;
                go.transform.localScale = p.localScale * sade;
                go.AddComponent<MeshFilter>().sharedMesh = Kiekko();
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
            }
        }

        static Mesh kiekko;

        /// <summary>Yksikkökiekko XY-tasossa (normaali +Z), uv napakoordinaattien pohjaksi (keskipiste 0,5).</summary>
        static Mesh Kiekko()
        {
            if (kiekko != null) return kiekko;
            const int osia = 64;
            var v = new Vector3[osia + 1];
            var uv = new Vector2[osia + 1];
            var nn = new Vector3[osia + 1];
            var t = new int[osia * 3];
            uv[0] = new Vector2(0.5f, 0.5f);
            nn[0] = Vector3.forward;
            for (int i = 0; i < osia; i++)
            {
                float a = i * Mathf.PI * 2f / osia;
                v[i + 1] = new Vector3(Mathf.Cos(a), Mathf.Sin(a), 0);
                uv[i + 1] = new Vector2(0.5f + 0.5f * Mathf.Cos(a), 0.5f + 0.5f * Mathf.Sin(a));
                nn[i + 1] = Vector3.forward;
                t[i * 3] = 0;
                t[i * 3 + 1] = i + 1;
                t[i * 3 + 2] = (i + 1) % osia + 1;
            }
            kiekko = new Mesh { name = "Potkurikiekko", vertices = v, uv = uv, normals = nn, triangles = t };
            kiekko.RecalculateBounds();
            return kiekko;
        }
    }
}
