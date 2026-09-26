using System;
using System.Collections.Generic;
using CesiumForUnity;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// 3D-SYMBOLINOSTOT (omistajan löydös 160, suunnitelma proto-3d/lokit/suunnitelma-160-3d-symbolinostot.md hyväksytty
    /// 26.9.2026; build 21 -prototyyppi): tärkeimmät (tason 1) nostot kartalla liioitellun kokoisina low-poly-malleina.
    /// Omat mallit koodina (ei tiedostoja, ei tekstuureja, ei PD/CC-sekamalleja): yksi materiaali, kärkivärit Sisältökirjurin
    /// vari2-paletista (pinta #c8b898, valo #e8d8b8, varjo #887858, sage #7a9a92, terrakotta #b8785e), tasavarjostus.
    /// Prototyyppi: Akropolis, Delfoi ja Meteora (GRC taso 1, Pelikoodarin lista lokit/loydos160-arkkityypit.txt).
    ///
    /// NÄKYVYYS: malli näkyy, kun sen nosto on NostoKerroksen näytettävissä (samat säännöt kuin 155:n kuvamerkeillä: taso 1
    /// aina), pystyssä pinnan normaalin suuntaan, pohjoinen = mallin +Z, koko vakio ruudulla (<see cref="KokoPt"/>) kuten
    /// KaupunkiMerkit. Löytämätön himmeänä (pergamentti, 70 %). Horisonttiusva kuten 153:n nostoilla. Piilossa lennon, linssin
    /// ja aloitusportin aikana sekä pallon takana. Natiivi-UI piilottaa 2D-kuvamerkin, kun <see cref="OnMalli"/> on tosi.
    /// Kolmiobudjetti enintään 1 500 mallia kohden (Kolmioita-tila näyttää). Komennot `symbolit tila|pois|paalle|koko pt`.
    /// </summary>
    [DefaultExecutionOrder(120)]   // NostoKerroksen jälkeen: näytettävät tältä kehykseltä
    public sealed class Symbolimallit : MonoBehaviour
    {
        /// <summary>Mallin leveys ruudulla (pt), liioiteltu (omistaja).</summary>
        public static float KokoPt = 90f;
        public static bool Paalla = true;
        /// <summary>Esikatselu (komento `symbolit loydetty|himmea`): kaikki löydettyinä.</summary>
        public static bool PakotaLoydetty;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() { KokoPt = 90f; Paalla = true; PakotaLoydetty = false; instanssi = null; verkot.Clear(); }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista()
        {
            if (instanssi != null) return;
            var geo = FindAnyObjectByType<CesiumGeoreference>();
            if (geo == null) return;
            var go = new GameObject("Symbolimallit");
            go.transform.SetParent(geo.transform, false);
            instanssi = go.AddComponent<Symbolimallit>();
            instanssi.georeferenssi = geo;
        }

        static Symbolimallit instanssi;

        /// <summary>Mallit noston tunnisteen avainsanalla (Nosto.Id tai Tunnus päättyy tähän, esim. "kohde:akropolis").</summary>
        static readonly Dictionary<string, Func<Mesh>> Mallit = new Dictionary<string, Func<Mesh>>(StringComparer.Ordinal)
        {
            { "akropolis", Akropolis },
            { "delfoi", Delfoi },
            { "meteora", Meteora },
        };
        static readonly Dictionary<string, Mesh> verkot = new Dictionary<string, Mesh>();

        /// <summary>Onko nostolla 3D-malli (Natiivi-UI: 2D-kuvamerkki pois).</summary>
        public static bool OnMalli(string nostoId) => Paalla && Avain(nostoId) != null;

        static string Avain(string id)
        {
            if (string.IsNullOrEmpty(id)) return null;
            int k = id.LastIndexOf(':');
            string loppu = k >= 0 ? id.Substring(k + 1) : id;
            if (loppu.StartsWith("hahmotelma-", StringComparison.Ordinal)) loppu = loppu.Substring(11);
            return Mallit.ContainsKey(loppu) ? loppu : null;
        }

        /// <summary>Tila lokiin.</summary>
        public static string Tila()
        {
            if (instanssi == null) return "ei luotu";
            var sb = new System.Text.StringBuilder($"päällä {Paalla}, koko {KokoPt:0} pt, näkyvissä:");
            int n = 0;
            foreach (var p in instanssi.kappaleet) if (p.Value.r.enabled) { sb.Append(' ').Append(p.Key); n++; }
            if (n == 0) sb.Append(" ei yhtään");
            sb.Append("; kolmiot:");
            foreach (var p in verkot) sb.Append(' ').Append(p.Key).Append('=').Append(p.Value.triangles.Length / 3);
            return sb.ToString();
        }

        CesiumGeoreference georeferenssi;
        PalloKierto kierto;
        Camera kamera;
        Aurinko aurinko;
        Material materiaali;
        readonly Dictionary<string, (Transform t, MeshRenderer r, Vector3 paikka, Vector3 normaali, float himmea)> kappaleet =
            new Dictionary<string, (Transform, MeshRenderer, Vector3, Vector3, float)>();
        readonly HashSet<string> nyt = new HashSet<string>();
        MaterialPropertyBlock lohko;
        static readonly int HimmeaId = Shader.PropertyToID("_Himmea");

        void Start()
        {
            var s = Resources.Load<Shader>("Symbolimalli");
            if (s == null) { Debug.LogWarning("MATKAKIRJA symbolimallit: varjostin puuttuu"); enabled = false; return; }
            materiaali = new Material(s) { name = "Symbolimalli" };
            lohko = new MaterialPropertyBlock();
        }

        void LateUpdate()
        {
            if (kamera == null)
            {
                kierto = FindAnyObjectByType<PalloKierto>();
                kamera = kierto != null ? kierto.GetComponent<Camera>() : null;
                aurinko = FindAnyObjectByType<Aurinko>();
                if (kamera == null) return;
            }
            var kk = KarttaKerrokset.Instanssi;
            var nk = NostoKerros.Instanssi;
            bool sallittu = Paalla && nk != null && nk.Nakyvissa && !PalloKierto.PorttiSumea && !(kk != null && kk.LinssiPaalla)
                            && !(aurinko != null && aurinko.Paalla);
            nyt.Clear();
            if (sallittu)
                foreach (var s in nk.Naytettavat)
                {
                    string a = Avain(s.Id) ?? Avain(s.Tunnus);
                    if (a == null || nyt.Contains(a)) continue;
                    nyt.Add(a);
                    Paivita(a, s);
                }
            foreach (var p in kappaleet)
                if (!nyt.Contains(p.Key) && p.Value.r.enabled) { p.Value.r.enabled = false; PallonLepo.Muuttui("symbolimallit"); }
        }

        void Paivita(string avain, NostoKerros.Nosto s)
        {
            if (!kappaleet.TryGetValue(avain, out var k))
            {
                if (!verkot.TryGetValue(avain, out var verkko)) verkot[avain] = verkko = Mallit[avain]();
                var go = new GameObject("Symbolimalli-" + avain);
                go.transform.SetParent(transform, false);
                go.AddComponent<MeshFilter>().sharedMesh = verkko;
                var r = go.AddComponent<MeshRenderer>();
                r.sharedMaterial = materiaali;
                r.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                r.receiveShadows = false;
                var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(s.OmaLon, s.OmaLat, 0));
                var n = CesiumWgs84Ellipsoid.GeodeticSurfaceNormal(ecef);
                var nl = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(n)).normalized;
                var napa = new double3(0, 0, 1);
                var poh = math.normalize(napa - n * math.dot(napa, n));
                var pl = ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(poh)).normalized;
                go.transform.localPosition = (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
                go.transform.localRotation = Quaternion.LookRotation(pl, nl);
                k = (go.transform, r, go.transform.localPosition, nl, -1f);
                kappaleet[avain] = k;
            }
            var gt = georeferenssi.transform;
            Vector3 p = gt.TransformPoint(k.paikka);
            Vector3 kohti = kamera.transform.position - p;
            float etaisyys = kohti.magnitude;
            bool edessa = Vector3.Dot(gt.TransformDirection(k.normaali).normalized, kohti / Mathf.Max(1e-6f, etaisyys)) > 0.08f;
            if (k.r.enabled != edessa) { k.r.enabled = edessa; PallonLepo.Muuttui("symbolimallit"); }
            if (!edessa) return;
            float tanPuoli = Mathf.Tan(kamera.fieldOfView * 0.5f * Mathf.Deg2Rad);
            float piste = 2f * etaisyys * tanPuoli / (Screen.height / PalloKierto.Pistekerroin);
            float koko = piste * KokoPt / Mathf.Max(1e-9f, gt.lossyScale.x);
            var sk = Vector3.one * koko;
            if ((k.t.localScale - sk).sqrMagnitude > 1e-6f * koko * koko) k.t.localScale = sk;
            float h = s.Loydetty || PakotaLoydetty ? 0f : 1f;
            if (h != k.himmea)
            {
                lohko.SetFloat(HimmeaId, h);
                k.r.SetPropertyBlock(lohko);
                kappaleet[avain] = (k.t, k.r, k.paikka, k.normaali, h);
                PallonLepo.Muuttui("symbolimallit");
            }
        }

        // ---- Mallit (paikallinen: +Y ylös, +Z pohjoinen, leveys ~1) ----

        static readonly Color Pinta = Hex(0xc8b898), Valo = Hex(0xe8d8b8), Varjo = Hex(0x887858), Sage = Hex(0x7a9a92), Terrakotta = Hex(0xb8785e);
        static Color Hex(int v) => new Color(((v >> 16) & 255) / 255f, ((v >> 8) & 255) / 255f, (v & 255) / 255f);

        static Mesh Akropolis()
        {
            var r = new Rakentaja();
            // Kallio: epäsäännöllinen 11-kulmainen tasanne, itä–länsi-suunnassa pitkä.
            r.Kallio(Vector3.zero, 0.62f, 0.34f, 0.52f, 0.27f, 0.2f, 11, 7, Varjo, Pinta);
            // Parthenon kallion itäpäässä (8 × 17 pylvään temppeli yksinkertaistettuna 8 + 6 pylvästä sivulla).
            r.Temppeli(new Vector3(0.14f, 0.2f, 0.02f), 0.36f, 0.17f, 0.11f, 8, 5, Valo, Pinta);
            // Propylaia länsipäässä: matala porttirakennus.
            r.Laatikko(new Vector3(-0.38f, 0.2f, -0.02f), new Vector3(0.1f, 0.05f, 0.14f), Valo, Pinta);
            // Erekhtheion pohjoisreunalla.
            r.Laatikko(new Vector3(0.0f, 0.2f, 0.13f), new Vector3(0.12f, 0.06f, 0.06f), Valo, Terrakotta);
            return r.Verkko("Akropolis");
        }

        static Mesh Delfoi()
        {
            var r = new Rakentaja();
            // Parnassoksen rinne takana (pohjoinen): matala huipukas harjanne kiven sävyin, sage vain alarinteen kaistana.
            r.Kallio(new Vector3(0f, 0f, 0.24f), 0.86f, 0.34f, 0.16f, 0.06f, 0.36f, 13, 3, Varjo, Pinta);
            // Oliivipuita alarinteellä (sage vain pieninä kärkiväreinä, Fable: ei sinertävää pintaa).
            float[,] puut = { { -0.34f, 0.08f }, { -0.24f, 0.12f }, { 0.3f, 0.1f }, { 0.36f, 0.04f }, { -0.4f, -0.02f } };
            for (int i = 0; i < puut.GetLength(0); i++)
                r.Kartio(new Vector3(puut[i, 0], 0f, puut[i, 1]), 0.03f, 0.06f, 6, Oliivi);
            // Pengerrys ja Apollon temppeli raunioina: 6 pylvästä edessä eri korkeuksilla, stylobaatti.
            r.Laatikko(new Vector3(0.05f, 0f, -0.1f), new Vector3(0.5f, 0.05f, 0.3f), Pinta, Pinta);
            float[] korkeudet = { 0.16f, 0.1f, 0.16f, 0.16f, 0.07f, 0.16f };
            r.Laatikko(new Vector3(0.05f, 0.05f, -0.1f), new Vector3(0.4f, 0.025f, 0.18f), Valo, Valo);
            for (int i = 0; i < 6; i++)
                r.Pylvas(new Vector3(-0.13f + i * 0.072f, 0.075f, -0.17f), 0.017f, korkeudet[i], 6, Valo);
            for (int i = 0; i < 6; i += 2)
                r.Pylvas(new Vector3(-0.13f + i * 0.072f, 0.075f, -0.03f), 0.017f, korkeudet[5 - i] * 0.8f, 6, Valo);
            // Tholos alempana: pyöreä pylväskehä ja kartiokatto.
            var t = new Vector3(-0.3f, 0f, -0.28f);
            r.Kartio(t, 0.08f, 0.01f, 10, Pinta);
            for (int i = 0; i < 8; i++)
            {
                float a = i * Mathf.PI * 2f / 8f;
                r.Pylvas(t + new Vector3(Mathf.Cos(a), 0, Mathf.Sin(a)) * 0.055f, 0.01f, 0.09f, 5, Valo);
            }
            r.Kartio(t + Vector3.up * 0.09f, 0.075f, 0.04f, 10, Terrakotta);
            return r.Verkko("Delfoi");
        }

        static readonly Color Kivi = Hex(0xa89878);
        /// <summary>Sage lämpimämpänä oliivina (paletin sage #7a9a92 näytti kartalla sinertävältä pinnalta).</summary>
        static readonly Color Oliivi = Hex(0x7f8f6a);

        static Mesh Meteora()
        {
            var r = new Rakentaja();
            // Kolme pyöreähköä kalliopylvästä (kivi, tasanne pinta), luostari korkeimman päällä.
            r.Kallio(new Vector3(-0.22f, 0f, 0.06f), 0.26f, 0.22f, 0.2f, 0.17f, 0.4f, 9, 11, Kivi, Pinta);
            r.Kallio(new Vector3(0.14f, 0f, -0.08f), 0.32f, 0.27f, 0.25f, 0.21f, 0.52f, 10, 5, Kivi, Pinta);
            r.Kallio(new Vector3(0.04f, 0f, 0.26f), 0.22f, 0.18f, 0.16f, 0.13f, 0.3f, 8, 3, Kivi, Pinta);
            // Suuri Meteoron: päärakennus, punainen katto ja kupoli.
            var y = new Vector3(0.14f, 0.52f, -0.08f);
            r.Laatikko(y, new Vector3(0.18f, 0.06f, 0.11f), Valo, Valo);
            r.Harja(y + Vector3.up * 0.06f, new Vector3(0.18f, 0.045f, 0.11f), Terrakotta, Valo);
            r.Pylvas(y + new Vector3(-0.055f, 0.06f, 0f), 0.032f, 0.045f, 8, Valo);
            r.Kartio(y + new Vector3(-0.055f, 0.105f, 0f), 0.036f, 0.032f, 8, Terrakotta);
            return r.Verkko("Meteora");
        }

        /// <summary>Tasavarjostettu verkko (kärjet tahkoittain, normaali tahkosta), kärkivärit lineaarisina.</summary>
        sealed class Rakentaja
        {
            readonly List<Vector3> v = new List<Vector3>();
            readonly List<Vector3> n = new List<Vector3>();
            readonly List<Color> c = new List<Color>();
            readonly List<int> t = new List<int>();

            public void Kolmio(Vector3 a, Vector3 b, Vector3 d, Color vari)
            {
                var normaali = Vector3.Cross(b - a, d - a);
                if (normaali.sqrMagnitude < 1e-12f) return;
                normaali.Normalize();
                int i = v.Count;
                var lin = vari.linear;
                v.Add(a); v.Add(b); v.Add(d);
                n.Add(normaali); n.Add(normaali); n.Add(normaali);
                c.Add(lin); c.Add(lin); c.Add(lin);
                t.Add(i); t.Add(i + 1); t.Add(i + 2);
            }

            public void Nelio(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color vari) { Kolmio(a, b, d, vari); Kolmio(a, d, e, vari); }

            /// <summary>Suorakulmio: keskipohja p, koko (leveys x, korkeus y, syvyys z); sivut ja katto.</summary>
            public void Laatikko(Vector3 p, Vector3 koko, Color sivu, Color katto)
            {
                float x = koko.x * 0.5f, z = koko.z * 0.5f, y = koko.y;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                Vector3 up = Vector3.up * y;
                Nelio(A, A + up, B + up, B, sivu); Nelio(B, B + up, C + up, C, sivu);
                Nelio(C, C + up, D + up, D, sivu); Nelio(D, D + up, A + up, A, sivu);
                Nelio(A + up, D + up, C + up, B + up, katto);
            }

            /// <summary>Harjakatto itä–länsi-suunnassa: p = räystään keskikohta, koko = (leveys, harjan korkeus, syvyys).</summary>
            public void Harja(Vector3 p, Vector3 koko, Color katto, Color paaty)
            {
                float x = koko.x * 0.5f, z = koko.z * 0.5f;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                Vector3 H1 = p + new Vector3(-x, koko.y, 0), H2 = p + new Vector3(x, koko.y, 0);
                Nelio(A, H1, H2, B, katto); Nelio(C, H2, H1, D, katto);
                Kolmio(D, H1, A, paaty); Kolmio(B, H2, C, paaty);
            }

            public void Pylvas(Vector3 p, float r, float h, int sivuja, Color vari)
            {
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0, Mathf.Sin(a0)) * r, d1 = new Vector3(Mathf.Cos(a1), 0, Mathf.Sin(a1)) * r;
                    Nelio(p + d0, p + d0 + Vector3.up * h, p + d1 + Vector3.up * h, p + d1, vari);
                    Kolmio(p + Vector3.up * h, p + d1 + Vector3.up * h, p + d0 + Vector3.up * h, vari);
                }
            }

            public void Kartio(Vector3 p, float r, float h, int sivuja, Color vari)
            {
                Vector3 k = p + Vector3.up * h;
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Kolmio(p + new Vector3(Mathf.Cos(a0), 0, Mathf.Sin(a0)) * r, k, p + new Vector3(Mathf.Cos(a1), 0, Mathf.Sin(a1)) * r, vari);
                }
            }

            /// <summary>
            /// Epäsäännöllinen kallio: ellipsin säteet ala (rx, rz) ja ylä (tx, tz), korkeus h, kulmia k, siemen (toistettava
            /// kohina säteisiin). Sivut sivuvärillä, tasanne kattovärillä.
            /// </summary>
            public void Kallio(Vector3 p, float rx, float rz, float tx, float tz, float h, int k, int siemen, Color sivu, Color katto)
            {
                var ala = new Vector3[k]; var yla = new Vector3[k];
                var satunnainen = new System.Random(siemen);
                for (int i = 0; i < k; i++)
                {
                    float a = i * Mathf.PI * 2f / k;
                    float s = 0.85f + 0.3f * (float)satunnainen.NextDouble();
                    float s2 = s * (0.9f + 0.2f * (float)satunnainen.NextDouble());
                    ala[i] = p + new Vector3(Mathf.Cos(a) * rx * 0.5f * s, 0, Mathf.Sin(a) * rz * 0.5f * s);
                    yla[i] = p + new Vector3(Mathf.Cos(a) * tx * 0.5f * s2, h * (0.94f + 0.12f * (float)satunnainen.NextDouble()), Mathf.Sin(a) * tz * 0.5f * s2);
                }
                Vector3 keski = Vector3.zero;
                for (int i = 0; i < k; i++) keski += yla[i];
                keski /= k;
                for (int i = 0; i < k; i++)
                {
                    int j = (i + 1) % k;
                    Nelio(ala[i], yla[i], yla[j], ala[j], sivu);
                    Kolmio(keski, yla[j], yla[i], katto);
                }
            }

            /// <summary>Temppeli: keskipohja p, leveys (itä–länsi) l, syvyys s, pylväiden korkeus h, pylväitä päädyssä ja sivulla.</summary>
            public void Temppeli(Vector3 p, float l, float s, float h, int paatyyn, int sivulle, Color marmori, Color katto)
            {
                Laatikko(p, new Vector3(l, 0.02f, s), marmori, marmori);
                var y = p + Vector3.up * 0.02f;
                float r = 0.011f;
                for (int i = 0; i < paatyyn; i++)
                {
                    float z = -s * 0.42f + i * (s * 0.84f / (paatyyn - 1));
                    Pylvas(y + new Vector3(-l * 0.45f, 0, z), r, h, 6, marmori);
                    Pylvas(y + new Vector3(l * 0.45f, 0, z), r, h, 6, marmori);
                }
                for (int i = 1; i <= sivulle; i++)
                {
                    float x = -l * 0.45f + i * (l * 0.9f / (sivulle + 1));
                    Pylvas(y + new Vector3(x, 0, -s * 0.42f), r, h, 6, marmori);
                    Pylvas(y + new Vector3(x, 0, s * 0.42f), r, h, 6, marmori);
                }
                var ylla = y + Vector3.up * h;
                Laatikko(ylla, new Vector3(l * 0.98f, 0.022f, s * 0.98f), marmori, marmori);
                Harja(ylla + Vector3.up * 0.022f, new Vector3(l * 0.98f, 0.045f, s * 0.98f), katto, marmori);
            }

            public Mesh Verkko(string nimi)
            {
                var m = new Mesh { name = "Symbolimalli-" + nimi };
                m.SetVertices(v); m.SetNormals(n); m.SetColors(c); m.SetTriangles(t, 0);
                m.RecalculateBounds();
                return m;
            }
        }
    }
}
