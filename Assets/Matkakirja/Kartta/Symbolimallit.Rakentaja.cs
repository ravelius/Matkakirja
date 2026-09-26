using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// SYMBOLIMALLIEN RAKENTAJA JA PALETTI (löydös 160): tasavarjostetut low-poly-verkot koodina, yksi materiaali ja
    /// kärkivärit Sisältökirjurin vari2-paletista (pinta #c8b898, valo #e8d8b8, varjo #887858, sage #7a9a92, terrakotta
    /// #b8785e). Erotettu Symbolimallit.cs:stä, jotta prototyypin erikoismallit (Akropolis, Delfoi, Meteora) ja
    /// arkkityyppikirjasto (Symbolimallit.Arkkityypit.cs) käyttävät samaa rakentajaa.
    /// </summary>
    public sealed partial class Symbolimallit
    {
        static readonly Color Pinta = Hex(0xc8b898), Valo = Hex(0xe8d8b8), Varjo = Hex(0x887858), Sage = Hex(0x7a9a92), Terrakotta = Hex(0xb8785e);
        static Color Hex(int v) => new Color(((v >> 16) & 255) / 255f, ((v >> 8) & 255) / 255f, (v & 255) / 255f);

        static readonly Color Kivi = Hex(0xa89878);
        /// <summary>Pergamentti (varjostimen _Paperi 0,93 / 0,89 / 0,78): suurten ylhäältä näkyvien pintojen vaalein sävy
        /// (1.0.27-kokeilu, Linssisepän tyyliohje B).</summary>
        static readonly Color Paperi = Hex(0xede3c7);
        /// <summary>Sage lämpimämpänä oliivina (paletin sage #7a9a92 näytti kartalla sinertävältä pinnalta).</summary>
        static readonly Color Oliivi = Hex(0x7f8f6a);

        // ---- Maakontakti (löydös 175c kohta 5, Linssiseppä) ----

        /// <summary>Maakontaktilevyn säde mallin leveydestä (0,6 ×).</summary>
        public const float PohjaSade = 0.6f;
        /// <summary>
        /// Maavarjon siirto mallin paikallisessa avaruudessa (1.0.27-kokeilu, Linssisepän tyyliohje D): 0,06 yksikköä
        /// kaakkoon (+X itä, −Z etelä), koska valo tulee luoteesta. Levy ei enää ole mallin juuren alla keskellä, joten
        /// ylhäältä katsottuna varjo näkyy mallin kaakkoispuolella.
        /// </summary>
        public static readonly Vector3 PohjaSiirto = new Vector3(0.0424f, 0f, -0.0424f);
        /// <summary>Levyn peitto keskellä (varjo #887858), laskee reunalla nollaan.</summary>
        const float PohjaPeitto = 0.42f;
        static readonly int PohjaId = Shader.PropertyToID("_Pohja"), ZTestId = Shader.PropertyToID("_ZTest"),
            ZWriteId = Shader.PropertyToID("_ZWrite"), ReunaId = Shader.PropertyToID("_Reuna"), CullId = Shader.PropertyToID("_Cull");
        static Mesh pohjaVerkko;

        /// <summary>
        /// Pehmeä varjolevy mallin alle: säde 1 paikallisen XZ-tason origossa, 24 sektoria ja kolme rengasta; kärkivärinä
        /// varjo, alfa keskellä <see cref="PohjaPeitto"/> ja reunalla 0 (smoothstep-lasku, ei kovaa reunaa). Etupuoli +Y.
        /// </summary>
        static Mesh PohjaVerkko()
        {
            if (pohjaVerkko != null) return pohjaVerkko;
            const int sektoreita = 24;
            float[] renkaat = { 0.35f, 0.7f, 1f };
            var v = new List<Vector3> { Vector3.zero };
            var c = new List<Color>();
            var lin = Varjo.linear;
            c.Add(new Color(lin.r, lin.g, lin.b, PohjaPeitto));
            foreach (float r in renkaat)
            {
                var vari = new Color(lin.r, lin.g, lin.b, PohjaPeitto * (1f - Mathf.SmoothStep(0f, 1f, r)));
                for (int i = 0; i < sektoreita; i++)
                {
                    float a = i * Mathf.PI * 2f / sektoreita;
                    v.Add(new Vector3(Mathf.Cos(a) * r, 0f, Mathf.Sin(a) * r));
                    c.Add(vari);
                }
            }
            var t = new List<int>();
            void Kolmio(int a, int b, int d)
            {
                // Etupuoli ylös (Unity: Cross(b − a, d − a) osoittaa katsojaan päin).
                if (Vector3.Cross(v[b] - v[a], v[d] - v[a]).y < 0f) (b, d) = (d, b);
                t.Add(a); t.Add(b); t.Add(d);
            }
            for (int i = 0; i < sektoreita; i++) Kolmio(0, 1 + i, 1 + (i + 1) % sektoreita);
            for (int j = 0; j + 1 < renkaat.Length; j++)
                for (int i = 0; i < sektoreita; i++)
                {
                    int q = (i + 1) % sektoreita, s0 = 1 + j * sektoreita, s1 = s0 + sektoreita;
                    Kolmio(s0 + i, s1 + i, s1 + q);
                    Kolmio(s0 + i, s1 + q, s0 + q);
                }
            var n = new List<Vector3>(v.Count);
            var uv = new List<Vector2>(v.Count);
            for (int i = 0; i < v.Count; i++) { n.Add(Vector3.up); uv.Add(Vector2.zero); }
            pohjaVerkko = new Mesh { name = "Symbolimalli-maakontakti" };
            pohjaVerkko.SetVertices(v); pohjaVerkko.SetNormals(n); pohjaVerkko.SetColors(c); pohjaVerkko.SetUVs(1, uv); pohjaVerkko.SetTriangles(t, 0);
            pohjaVerkko.RecalculateBounds();
            return pohjaVerkko;
        }

        /// <summary>Mallin leveys levyn mitoitukseen: verkon rajojen suurempi vaakamitta (X tai Z).</summary>
        static float Leveys(Mesh m)
        {
            var s = m.bounds.size;
            return Mathf.Max(0.1f, Mathf.Max(s.x, s.z));
        }

        /// <summary>Mallin pohjan ulottuma origosta (X, Z) verkon rajoista: jalan nosto liioitellussa perspektiivissä.</summary>
        static Vector2 Puoli(Mesh m)
        {
            var b = m.bounds;
            return new Vector2(Mathf.Max(Mathf.Abs(b.min.x), Mathf.Abs(b.max.x)), Mathf.Max(Mathf.Abs(b.min.z), Mathf.Abs(b.max.z)));
        }

        /// <summary>Levyn materiaali mallin materiaalista: _Pohja 1, ZTest Always, ZWrite Off, piirto ensimmäisenä (ennen
        /// ääriviivaa ja mallia).</summary>
        static Material PohjaMateriaali(Material malli)
        {
            var m = new Material(malli) { name = malli.name + " (maakontakti)" };
            m.SetFloat(PohjaId, 1f);
            m.SetFloat(ZTestId, (float)UnityEngine.Rendering.CompareFunction.Always);
            m.SetFloat(ZWriteId, 0f);
            m.renderQueue = malli.renderQueue - 2;
            return m;
        }

        /// <summary>
        /// Ääriviivan materiaali (1.0.27-kokeilu, Linssisepän tyyliohje C; varjostimen kohta 6): _Reuna 1, Cull Off, ZWrite Off,
        /// ZTest LEqual (maasto peittää kuten mallinkin), piirto maakontaktin jälkeen ja ennen mallia, joten malli peittää
        /// kasvatetun verkon keskiosan ja jäljelle jää ääriviiva. Leveys instanssin tai lohkon _Tila.z:ssa.
        /// </summary>
        static Material ReunaMateriaali(Material malli)
        {
            var m = new Material(malli) { name = malli.name + " (ääriviiva)" };
            m.SetFloat(ReunaId, 1f);
            m.SetFloat(CullId, (float)UnityEngine.Rendering.CullMode.Off);
            m.SetFloat(ZWriteId, 0f);
            m.renderQueue = malli.renderQueue - 1;
            return m;
        }

        /// <summary>Tasavarjostettu verkko (kärjet tahkoittain, normaali tahkosta), kärkivärit lineaarisina.</summary>
        sealed partial class Rakentaja
        {
            readonly List<Vector3> v = new List<Vector3>();
            readonly List<Vector3> n = new List<Vector3>();
            readonly List<Color> c = new List<Color>();
            readonly List<int> t = new List<int>();
            /// <summary>
            /// Ääriviivan suunta kärjittäin (UV1, 1.0.27-kokeilu, Linssisepän tyyliohje C): vaakasuora siirto osan
            /// keskipisteestä osan puolileveyksillä normitettuna, eli osan reunalla (±1, ±1). Varjostimen reunaviivapiirto
            /// siirtää kärkeä tämän verran kertaa leveys (_Tila.z, mallin yksiköissä), joten jokainen osa (laatikko, torni,
            /// katto …) kasvaa vaakatasossa vakioleveyden verran ja ääriviiva on ruudulla yhtä leveä kaikilla osilla.
            /// </summary>
            readonly List<Vector2> u = new List<Vector2>();
            int osaSyvyys, osaAlku;
            /// <summary>Osa, jonka vaakasuora puolileveys on tätä pienempi (mallin yksiköissä), ei saa ääriviivaa.</summary>
            const float ReunaMinimi = 0.035f;

            /// <summary>Osan alku: sisäkkäiset kutsut (esim. Doorilainen → Pylvas) kuuluvat uloimpaan osaan.</summary>
            void Alku() { if (osaSyvyys++ == 0) osaAlku = v.Count; }

            /// <summary>Osan loppu: ääriviivan suunnat osan kärjille sen vaakasuorista rajoista.</summary>
            void Loppu()
            {
                if (--osaSyvyys > 0) return;
                if (osaAlku >= v.Count) return;
                float x0 = float.MaxValue, x1 = float.MinValue, z0 = float.MaxValue, z1 = float.MinValue;
                for (int i = osaAlku; i < v.Count; i++)
                {
                    x0 = Mathf.Min(x0, v[i].x); x1 = Mathf.Max(x1, v[i].x);
                    z0 = Mathf.Min(z0, v[i].z); z1 = Mathf.Max(z1, v[i].z);
                }
                float cx = (x0 + x1) * 0.5f, cz = (z0 + z1) * 0.5f, hx = (x1 - x0) * 0.5f, hz = (z1 - z0) * 0.5f;
                // Pienet osat (hampaat, risti, ikkunat) ilman ääriviivaa: 1,2 pt:n viiva peittäisi ne mustaksi möykyksi.
                if (Mathf.Max(hx, hz) < ReunaMinimi) return;
                for (int i = osaAlku; i < v.Count; i++)
                    u[i] = new Vector2(hx > 1e-3f ? (v[i].x - cx) / hx : 0f, hz > 1e-3f ? (v[i].z - cz) / hz : 0f);
            }

            public void Kolmio(Vector3 a, Vector3 b, Vector3 d, Color vari)
            {
                var normaali = Vector3.Cross(b - a, d - a);
                if (normaali.sqrMagnitude < 1e-12f) return;
                normaali.Normalize();
                Alku();
                int i = v.Count;
                var lin = vari.linear;
                v.Add(a); v.Add(b); v.Add(d);
                n.Add(normaali); n.Add(normaali); n.Add(normaali);
                c.Add(lin); c.Add(lin); c.Add(lin);
                u.Add(Vector2.zero); u.Add(Vector2.zero); u.Add(Vector2.zero);
                t.Add(i); t.Add(i + 1); t.Add(i + 2);
                Loppu();
            }

            public void Nelio(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color vari) { Alku(); Kolmio(a, b, d, vari); Kolmio(a, d, e, vari); Loppu(); }

            /// <summary>Suorakulmio: keskipohja p, koko (leveys x, korkeus y, syvyys z); sivut ja katto.</summary>
            public void Laatikko(Vector3 p, Vector3 koko, Color sivu, Color katto)
            {
                Alku();
                float x = koko.x * 0.5f, z = koko.z * 0.5f, y = koko.y;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                Vector3 up = Vector3.up * y;
                Nelio(A, A + up, B + up, B, sivu); Nelio(B, B + up, C + up, C, sivu);
                Nelio(C, C + up, D + up, D, sivu); Nelio(D, D + up, A + up, A, sivu);
                Nelio(A + up, D + up, C + up, B + up, katto);
                Loppu();
            }

            /// <summary>Harjakatto itä–länsi-suunnassa: p = räystään keskikohta, koko = (leveys, harjan korkeus, syvyys).</summary>
            public void Harja(Vector3 p, Vector3 koko, Color katto, Color paaty)
            {
                Alku();
                float x = koko.x * 0.5f, z = koko.z * 0.5f;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                Vector3 H1 = p + new Vector3(-x, koko.y, 0), H2 = p + new Vector3(x, koko.y, 0);
                Nelio(A, H1, H2, B, katto); Nelio(C, H2, H1, D, katto);
                Kolmio(D, H1, A, paaty); Kolmio(B, H2, C, paaty);
                Loppu();
            }

            public void Pylvas(Vector3 p, float r, float h, int sivuja, Color vari)
            {
                Alku();
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0, Mathf.Sin(a0)) * r, d1 = new Vector3(Mathf.Cos(a1), 0, Mathf.Sin(a1)) * r;
                    Nelio(p + d0, p + d0 + Vector3.up * h, p + d1 + Vector3.up * h, p + d1, vari);
                    Kolmio(p + Vector3.up * h, p + d1 + Vector3.up * h, p + d0 + Vector3.up * h, vari);
                }
                Loppu();
            }

            public void Kartio(Vector3 p, float r, float h, int sivuja, Color vari)
            {
                Alku();
                Vector3 k = p + Vector3.up * h;
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Kolmio(p + new Vector3(Mathf.Cos(a0), 0, Mathf.Sin(a0)) * r, k, p + new Vector3(Mathf.Cos(a1), 0, Mathf.Sin(a1)) * r, vari);
                }
                Loppu();
            }

            /// <summary>
            /// Epäsäännöllinen kallio: ellipsin säteet ala (rx, rz) ja ylä (tx, tz), korkeus h, kulmia k, siemen (toistettava
            /// kohina säteisiin). Sivut sivuvärillä, tasanne kattovärillä.
            /// </summary>
            public void Kallio(Vector3 p, float rx, float rz, float tx, float tz, float h, int k, int siemen, Color sivu, Color katto)
            {
                Alku();
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
                Loppu();
            }

            /// <summary>
            /// Monirenkainen kallio (siistimpi, vähemmän laatikkomainen kuin Kallio): renkaat (korkeus, halkaisija x, halkaisija z)
            /// alhaalta ylös samalla kulmajaolla ja toistettavalla säteen kohinalla (siemen). huippu = lakipisteen korkeus
            /// (NaN = tasainen laki ylimmän renkaan keskipisteestä). Sivut sivuvärillä, laki kattovärillä.
            /// </summary>
            public void Rengaskallio(Vector3 p, (float h, float dx, float dz)[] renkaat, float huippu, int k, int siemen, Color sivu, Color katto,
                float vaihtelu = 0.2f)
            {
                Alku();
                var sat = new System.Random(siemen);
                var kohina = new float[k];
                for (int i = 0; i < k; i++) kohina[i] = 1f - vaihtelu * 0.5f + vaihtelu * (float)sat.NextDouble();
                var pisteet = new Vector3[renkaat.Length, k];
                for (int j = 0; j < renkaat.Length; j++)
                    for (int i = 0; i < k; i++)
                    {
                        float a = i * Mathf.PI * 2f / k;
                        float s = Mathf.Lerp(kohina[i], kohina[(i + 1) % k], 0.3f * j / Mathf.Max(1, renkaat.Length - 1));
                        pisteet[j, i] = p + new Vector3(Mathf.Cos(a) * renkaat[j].dx * 0.5f * s, renkaat[j].h, Mathf.Sin(a) * renkaat[j].dz * 0.5f * s);
                    }
                for (int j = 0; j + 1 < renkaat.Length; j++)
                    for (int i = 0; i < k; i++)
                    {
                        int q = (i + 1) % k;
                        Nelio(pisteet[j, i], pisteet[j + 1, i], pisteet[j + 1, q], pisteet[j, q], sivu);
                    }
                int y = renkaat.Length - 1;
                Vector3 keski = Vector3.zero;
                for (int i = 0; i < k; i++) keski += pisteet[y, i];
                keski /= k;
                if (!float.IsNaN(huippu)) keski = new Vector3(keski.x, p.y + huippu, keski.z);
                for (int i = 0; i < k; i++) Kolmio(keski, pisteet[y, (i + 1) % k], pisteet[y, i], katto);
                Loppu();
            }

            /// <summary>Doorilainen pylväs: 8-kulmainen runko, ehjänä pylväänpää (echinus + abakus).</summary>
            public void Doorilainen(Vector3 p, float r, float h, Color vari, bool paa)
            {
                Alku();
                Pylvas(p, r, h, 8, vari);
                if (paa)
                {
                    Rengaskallio(p + Vector3.up * h, new[] { (0f, r * 2f, r * 2f), (0.008f, r * 2.8f, r * 2.8f) }, float.NaN, 8, 1, vari, vari);
                    Laatikko(p + Vector3.up * (h + 0.008f), new Vector3(r * 3f, 0.006f, r * 3f), vari, vari);
                }
                Loppu();
            }

            /// <summary>Temppeli: keskipohja p, leveys (itä–länsi) l, syvyys s, pylväiden korkeus h, pylväitä päädyssä ja sivulla.</summary>
            public void Temppeli(Vector3 p, float l, float s, float h, int paatyyn, int sivulle, Color marmori, Color katto)
            {
                Alku();
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
                Loppu();
            }

            public Mesh Verkko(string nimi)
            {
                var m = new Mesh { name = "Symbolimalli-" + nimi };
                m.SetVertices(v); m.SetNormals(n); m.SetColors(c); m.SetUVs(1, u); m.SetTriangles(t, 0);
                m.RecalculateBounds();
                return m;
            }

            // ---- Arkkityyppien apurit (löydös 160, Symbolimallit.Arkkityypit.cs) ----

            /// <summary>Kolmio, jonka etupuoli osoittaa pois pisteestä <paramref name="keski"/> (kupera kappale): järjestys
            /// käännetään tarvittaessa, joten mallin voi kirjoittaa välittämättä kiertosuunnasta.</summary>
            public void KolmioKeskelta(Vector3 a, Vector3 b, Vector3 d, Vector3 keski, Color vari) => KolmioUlos(a, b, d, (a + b + d) / 3f - keski, vari);

            public void NelioKeskelta(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Vector3 keski, Color vari) =>
                NelioUlos(a, b, d, e, (a + b + d + e) / 4f - keski, vari);

            /// <summary>Kolmio, jonka etupuoli (Unityn myötäpäivä) on suuntaan <paramref name="ulos"/>.</summary>
            public void KolmioUlos(Vector3 a, Vector3 b, Vector3 d, Vector3 ulos, Color vari)
            {
                if (Vector3.Dot(Vector3.Cross(b - a, d - a), ulos) < 0f) Kolmio(a, d, b, vari);
                else Kolmio(a, b, d, vari);
            }

            public void NelioUlos(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Vector3 ulos, Color vari)
            {
                Alku();
                KolmioUlos(a, b, d, ulos, vari);
                KolmioUlos(a, d, e, ulos, vari);
                Loppu();
            }

            /// <summary>Kaksipuolinen nelikulmio (myllyn siivet, purje): varjostin karsii takapinnat, joten molemmat puolet.</summary>
            public void Kalvo(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color vari) { Alku(); Nelio(a, b, d, e, vari); Nelio(a, e, d, b, vari); Loppu(); }

            /// <summary>Kaksipuolinen kolmio (purje).</summary>
            public void KalvoKolmio(Vector3 a, Vector3 b, Vector3 d, Color vari) { Alku(); Kolmio(a, b, d, vari); Kolmio(a, d, b, vari); Loppu(); }

            /// <summary>Kapeneva vaippa ilman kansia (torni, jonka päälle tulee katto): keskipohja p, säteet r0 → r1,
            /// korkeus h; kulma = ensimmäisen kärjen suunta (rad).</summary>
            public void Vaippa(Vector3 p, float r0, float r1, float h, int sivuja, Color vari, float kulma = 0f)
            {
                Alku();
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = kulma + i * Mathf.PI * 2f / sivuja, a1 = kulma + (i + 1) * Mathf.PI * 2f / sivuja;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0, Mathf.Sin(a1));
                    Nelio(p + d0 * r0, p + Vector3.up * h + d0 * r1, p + Vector3.up * h + d1 * r1, p + d1 * r0, vari);
                }
                Loppu();
            }

            /// <summary>Suorakulmainen pyramidi (tornin kypärä): keskipohja p, pohja lx × lz, korkeus h; 4 kolmiota.</summary>
            public void Pyramidi(Vector3 p, float lx, float lz, float h, Color vari)
            {
                Alku();
                float x = lx * 0.5f, z = lz * 0.5f;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                Vector3 T = p + Vector3.up * h, k = p + Vector3.up * (h * 0.25f);
                KolmioKeskelta(A, B, T, k, vari); KolmioKeskelta(B, C, T, k, vari);
                KolmioKeskelta(C, D, T, k, vari); KolmioKeskelta(D, A, T, k, vari);
                Loppu();
            }

            /// <summary>Harjakatto pohjois–etelä-suunnassa (päädyt etelään ja pohjoiseen, kaupunkitalojen rivi): p = räystään
            /// keskikohta, koko = (leveys, harjan korkeus, syvyys).</summary>
            public void HarjaZ(Vector3 p, Vector3 koko, Color katto, Color paaty)
            {
                Alku();
                float x = koko.x * 0.5f, z = koko.z * 0.5f;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                Vector3 H1 = p + new Vector3(0, koko.y, -z), H2 = p + new Vector3(0, koko.y, z), k = p + Vector3.up * (koko.y * 0.3f);
                NelioKeskelta(A, H1, H2, D, k, katto); NelioKeskelta(B, C, H2, H1, k, katto);
                KolmioKeskelta(A, B, H1, k, paaty); KolmioKeskelta(D, H2, C, k, paaty);
                Loppu();
            }

            // ---- Katot räystäskaistalla (1.0.27-kokeilu, Linssisepän tarkennus 3) ----
            // Lappeen alareunassa kapea vaalea kaista (räystäs), muu lape kattovärillä: ylhäältä katsottuna katon muoto ja
            // harjan suunta erottuvat sävyerona myös ilman valon suuntaa. Osuus = kaistan osuus lappeen pituudesta.

            /// <summary>Räystäskaistan oletusosuus lappeesta.</summary>
            public const float RaystasOsuus = 0.2f;

            /// <summary>Harjakatto räystäskaistalla; pitkinX = harja itä–länsi-suunnassa, muuten pohjois–etelä. p = räystään
            /// keskikohta, koko = (leveys, harjan korkeus, syvyys). 10 kolmiota.</summary>
            public void HarjaRaystas(Vector3 p, Vector3 koko, bool pitkinX, Color katto, Color raystas, Color paaty, float osuus = RaystasOsuus)
            {
                Alku();
                float x = koko.x * 0.5f, z = koko.z * 0.5f;
                Vector3 A = p + new Vector3(-x, 0, -z), B = p + new Vector3(x, 0, -z), C = p + new Vector3(x, 0, z), D = p + new Vector3(-x, 0, z);
                var k = p + Vector3.up * (koko.y * 0.3f);
                if (pitkinX)
                {
                    Vector3 H1 = p + new Vector3(-x, koko.y, 0), H2 = p + new Vector3(x, koko.y, 0);
                    Lape(A, B, H2, H1, k, katto, raystas, osuus);
                    Lape(C, D, H1, H2, k, katto, raystas, osuus);
                    KolmioKeskelta(D, H1, A, k, paaty); KolmioKeskelta(B, H2, C, k, paaty);
                }
                else
                {
                    Vector3 H1 = p + new Vector3(0, koko.y, -z), H2 = p + new Vector3(0, koko.y, z);
                    Lape(D, A, H1, H2, k, katto, raystas, osuus);
                    Lape(B, C, H2, H1, k, katto, raystas, osuus);
                    KolmioKeskelta(A, B, H1, k, paaty); KolmioKeskelta(D, H2, C, k, paaty);
                }
                Loppu();
            }

            /// <summary>Lape räystäältä r0 → r1 harjalle (h1 on r1:n ja h0 r0:n yläpuolella): kaista räystäsvärillä, loput
            /// kattovärillä.</summary>
            void Lape(Vector3 r0, Vector3 r1, Vector3 h1, Vector3 h0, Vector3 keski, Color katto, Color raystas, float osuus)
            {
                Vector3 a = Vector3.Lerp(r0, h0, osuus), b = Vector3.Lerp(r1, h1, osuus);
                NelioKeskelta(r0, r1, b, a, keski, raystas);
                NelioKeskelta(a, b, h1, h0, keski, katto);
            }

            /// <summary>Kartiokatto räystäskaistalla: pohja p, säde r, korkeus h. 3 × sivuja kolmiota.</summary>
            public void KartioRaystas(Vector3 p, float r, float h, int sivuja, Color katto, Color raystas, float osuus = RaystasOsuus)
            {
                Alku();
                Vector3 k = p + Vector3.up * h, keski = p + Vector3.up * (h * 0.3f), q = p + Vector3.up * (h * osuus);
                float rq = r * (1f - osuus);
                for (int i = 0; i < sivuja; i++)
                {
                    float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                    Vector3 d0 = new Vector3(Mathf.Cos(a0), 0, Mathf.Sin(a0)), d1 = new Vector3(Mathf.Cos(a1), 0, Mathf.Sin(a1));
                    NelioKeskelta(p + d0 * r, p + d1 * r, q + d1 * rq, q + d0 * rq, keski, raystas);
                    KolmioKeskelta(q + d0 * rq, q + d1 * rq, k, keski, katto);
                }
                Loppu();
            }

            /// <summary>Pyramidikatto räystäskaistalla (tornin kypärä): keskipohja p, pohja lx × lz, korkeus h. 12 kolmiota.</summary>
            public void PyramidiRaystas(Vector3 p, float lx, float lz, float h, Color katto, Color raystas, float osuus = RaystasOsuus)
            {
                Alku();
                float x = lx * 0.5f, z = lz * 0.5f, s = 1f - osuus;
                var ala = new[] { p + new Vector3(-x, 0, -z), p + new Vector3(x, 0, -z), p + new Vector3(x, 0, z), p + new Vector3(-x, 0, z) };
                var q = p + Vector3.up * (h * osuus);
                var yla = new[] { q + new Vector3(-x * s, 0, -z * s), q + new Vector3(x * s, 0, -z * s), q + new Vector3(x * s, 0, z * s), q + new Vector3(-x * s, 0, z * s) };
                Vector3 T = p + Vector3.up * h, keski = p + Vector3.up * (h * 0.25f);
                for (int i = 0; i < 4; i++)
                {
                    int j = (i + 1) % 4;
                    NelioKeskelta(ala[i], ala[j], yla[j], yla[i], keski, raystas);
                    KolmioKeskelta(yla[i], yla[j], T, keski, katto);
                }
                Loppu();
            }

            /// <summary>
            /// Kaari (silta, portti, luolan suu) itä–länsi-suuntaisessa seinässä z0..z1: keskikohta cx, jänneväli leveys,
            /// syntykohta ys, nousu (puolet leveydestä = puoliympyrä), seinän yläreuna yt, n lohkoa. Etu- ja takapinta
            /// kaaren ja yläreunan väliltä sekä kaaren alapinta (holvi) omalla värillään; pilarit ja kansi erikseen.
            /// </summary>
            public void Kaari(float cx, float leveys, float ys, float nousu, float yt, float z0, float z1, int n, Color pinta, Color alapinta)
            {
                Alku();
                for (int i = 0; i < n; i++)
                {
                    float a0 = Mathf.PI * (1f - (float)i / n), a1 = Mathf.PI * (1f - (float)(i + 1) / n);
                    float x0 = cx + Mathf.Cos(a0) * leveys * 0.5f, y0 = ys + Mathf.Sin(a0) * nousu;
                    float x1 = cx + Mathf.Cos(a1) * leveys * 0.5f, y1 = ys + Mathf.Sin(a1) * nousu;
                    NelioUlos(new Vector3(x0, y0, z0), new Vector3(x0, yt, z0), new Vector3(x1, yt, z0), new Vector3(x1, y1, z0), Vector3.back, pinta);
                    NelioUlos(new Vector3(x0, y0, z1), new Vector3(x0, yt, z1), new Vector3(x1, yt, z1), new Vector3(x1, y1, z1), Vector3.forward, pinta);
                    var ulos = new Vector3(cx - (x0 + x1) * 0.5f, ys - (y0 + y1) * 0.5f, 0f);
                    NelioUlos(new Vector3(x0, y0, z0), new Vector3(x1, y1, z0), new Vector3(x1, y1, z1), new Vector3(x0, y0, z1), ulos, alapinta);
                }
                Loppu();
            }

            /// <summary>Puoliellipsin viuhka pystytasossa (luolan suu, portin varjo): keski = pohjan keskipiste, säteet rx
            /// ja ry, n kolmiota, etupuoli suuntaan ulos.</summary>
            public void Viuhka(Vector3 keski, float rx, float ry, int n, Vector3 ulos, Color vari)
            {
                Alku();
                for (int i = 0; i < n; i++)
                {
                    float a0 = Mathf.PI * i / n, a1 = Mathf.PI * (i + 1) / n;
                    KolmioUlos(keski, keski + new Vector3(Mathf.Cos(a0) * rx, Mathf.Sin(a0) * ry, 0f),
                        keski + new Vector3(Mathf.Cos(a1) * rx, Mathf.Sin(a1) * ry, 0f), ulos, vari);
                }
                Loppu();
            }

            /// <summary>Muurin hampaat: n laatikkoa (koko) tasaisesti janalla a → b (laatikoiden keskipohjat).</summary>
            public void Hampaat(Vector3 a, Vector3 b, int n, Vector3 koko, Color sivu, Color katto)
            {
                for (int i = 0; i < n; i++) Laatikko(Vector3.Lerp(a, b, (i + 0.5f) / n), koko, sivu, katto);
            }

            /// <summary>Kolmioiden määrä tähän asti (budjetin tarkistus).</summary>
            public int Kolmioita => t.Count / 3;
        }
    }
}
