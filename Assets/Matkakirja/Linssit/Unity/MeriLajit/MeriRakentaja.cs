using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    /// <summary>
    /// MEREN KORISTEIDEN LAATUTASO (omistaja 27.9.2026 klo 13.0x: "Nuo voisi tehdä korkeammalla laadulla"; speksi
    /// docs/raportit/meri-laatu-speksi-20260927.md). Rakentaja tuottaa verkon MeriMalli-varjostimelle samalla logiikalla kuin
    /// Symbolimallit.Rakentaja kategoriasymboleille ja erikoismalleille:
    ///   - tasavarjostus (kärjet tahkoittain, normaali tahkosta), kärkivärit lineaarisina;
    ///   - kärjen alfa kertoo tilan: 0 = B-seepiaramppi (värin valoisuus = rampin kohta: muste 0, seepia 1, paperi 2, ja valo
    ///     siirtää kohtaa alaspäin), 1 = korostus (oma väri, esim. punainen #9a3b2c, enintään noin 10 % alasta);
    ///   - UV1 = ääriviivan vaakasuunta osittain (AloitaOsa/LopetaOsa): osan kärki siirtyy osan keskeltä poispäin osan
    ///     puolileveyksillä normitettuna, ja varjostimen reunapiirto kasvattaa osaa 1,2 pt:n verran;
    ///   - erillinen vesiverkko (Vesi = true): vanavesi, keulakuohu, varjo ja roiskeet kärkiväreinä ja -alfoina sellaisenaan
    ///     (ei valoa, ei rampia), piirto ennen mallia ilman syvyyskirjoitusta.
    /// Mallin avaruus: +z eteen (keula), +y ylös, meren pinta y = 0; 1 yksikkö = lajin KokoPt pistettä ruudulla.
    /// </summary>
    public sealed class MeriRakentaja
    {
        // B-seepiaramppi sRGB:nä (Symbolimalli-varjostimen kohta 8): muste #3b2f22, seepia #8a6a44, paperi #efe4cc.
        public static readonly Color Muste = Hex(0x3b2f22, 0f), Seepia = Hex(0x8a6a44, 0f), Paperi = Hex(0xefe4cc, 0f);
        /// <summary>Pelin punainen korostus (#9a3b2c, tila 1): viiri, piipun raita, lipputanko.</summary>
        public static readonly Color Punainen = Hex(0x9a3b2c, 1f);
        /// <summary>Vaahto ja suihku (vesiverkko): paperia hieman vaaleampana.</summary>
        public static readonly Color Vaahto = Hex(0xfaf4e4, 1f);
        /// <summary>Veden varjo (vesiverkko): muste, alfa annetaan erikseen (0,10–0,20).</summary>
        public static readonly Color VarjoVari = Hex(0x3b2f22, 1f);

        static readonly Vector3 mL = new Vector3(0.0437f, 0.0284f, 0.0160f), sL = new Vector3(0.2542f, 0.1441f, 0.0578f), pL = new Vector3(0.8632f, 0.7758f, 0.6038f);

        /// <summary>Rampin kohta s (0 muste … 1 seepia … 2 paperi) sRGB-värinä tilassa 0; välit lineaarisesti kuten varjostimessa.</summary>
        public static Color Rampi(float s)
        {
            s = Mathf.Clamp(s, 0f, 2f);
            Vector3 l = s >= 1f ? Vector3.Lerp(sL, pL, s - 1f) : Vector3.Lerp(mL, sL, s);
            return new Color(Gamma(l.x), Gamma(l.y), Gamma(l.z), 0f);
        }

        static float Gamma(float x) => x <= 0.0031308f ? 12.92f * x : 1.055f * Mathf.Pow(x, 1f / 2.4f) - 0.055f;
        public static Color Hex(int rgb, float a) => new Color(((rgb >> 16) & 255) / 255f, ((rgb >> 8) & 255) / 255f, (rgb & 255) / 255f, a);
        /// <summary>Vesiverkon väri annetulla alfalla.</summary>
        public static Color Alfa(Color c, float a) { c.a = a; return c; }

        readonly List<Vector3> v = new List<Vector3>();
        readonly List<Vector3> n = new List<Vector3>();
        readonly List<Color> c = new List<Color>();
        readonly List<Vector2> u = new List<Vector2>();
        readonly List<int> t = new List<int>();
        readonly float reunaMinimi;
        int osaSyvyys, osaAlku;
        /// <summary>Vesitilan merkki UV1:ssä (varjostin: uv1.x > 5 = vesi; ääriviivapiirto ohittaa).</summary>
        public static readonly Vector2 VesiMerkki = new Vector2(9f, 9f);

        /// <summary>
        /// Vesitila: tästä eteenpäin kolmiot ovat vesikerrosta (vanavesi, keulakuohu, varjo, vaahto, roiskeet): kärkiväri ja
        /// -alfa sellaisenaan ilman valoa ja rampia, ei ääriviivaa. Vesikolmiot kannattaa rakentaa verkon alkuun, jolloin ne
        /// piirtyvät ennen runkoa (sama piirto, syvyystesti päällä).
        /// </summary>
        public bool Vesi { get; set; }

        /// <param name="reunaMinimi">Osa, jonka vaakasuora puolileveys on tätä pienempi (mallin yksiköissä), ei saa
        /// ääriviivaa (köydet, pienet varusteet: 1,2 pt:n viiva peittäisi ne möykyksi). Oletus 0,006 = noin 1,7 pt, kun
        /// KokoPt on 280.</param>
        public MeriRakentaja(float reunaMinimi = 0.006f) { this.reunaMinimi = reunaMinimi; }

        public int Kolmioita => t.Count / 3;

        /// <summary>Osan alku: sisäkkäiset kutsut kuuluvat uloimpaan osaan (ääriviiva lasketaan koko osalle).</summary>
        public void AloitaOsa() { if (osaSyvyys++ == 0) osaAlku = v.Count; }

        /// <summary>Osan loppu: ääriviivan suunnat osan kärjille sen vaakasuorista rajoista.</summary>
        public void LopetaOsa()
        {
            if (--osaSyvyys > 0 || osaAlku >= v.Count) return;
            float x0 = float.MaxValue, x1 = float.MinValue, z0 = float.MaxValue, z1 = float.MinValue;
            for (int i = osaAlku; i < v.Count; i++)
            {
                if (u[i].x > 5f) continue;
                x0 = Mathf.Min(x0, v[i].x); x1 = Mathf.Max(x1, v[i].x);
                z0 = Mathf.Min(z0, v[i].z); z1 = Mathf.Max(z1, v[i].z);
            }
            float cx = (x0 + x1) * 0.5f, cz = (z0 + z1) * 0.5f, hx = (x1 - x0) * 0.5f, hz = (z1 - z0) * 0.5f;
            if (x0 > x1 || Mathf.Max(hx, hz) < reunaMinimi) return;
            for (int i = osaAlku; i < v.Count; i++)
                if (u[i].x <= 5f) u[i] = new Vector2(hx > 1e-4f ? (v[i].x - cx) / hx : 0f, hz > 1e-4f ? (v[i].z - cz) / hz : 0f);
        }

        /// <summary>Kolmio (etupuoli Unityn myötäpäivään katsottuna). Väri sRGB:nä, alfa = tila (0 ramppi, 1 korostus)
        /// tai vesiverkossa peitto.</summary>
        public void Kolmio(Vector3 a, Vector3 b, Vector3 d, Color vari)
        {
            var normaali = Vector3.Cross(b - a, d - a);
            if (normaali.sqrMagnitude < 1e-14f) return;
            // Vesikerros makaa pinnalla: etupuoli aina ylös, muuten Cull Back piilottaisi sen (merilaivan agentin löydös 27.9.).
            if (Vesi && normaali.y < 0f) { var s = b; b = d; d = s; normaali = -normaali; }
            normaali.Normalize();
            AloitaOsa();
            int i = v.Count;
            var lin = vari.linear; lin.a = vari.a;
            v.Add(a); v.Add(b); v.Add(d);
            n.Add(normaali); n.Add(normaali); n.Add(normaali);
            c.Add(lin); c.Add(lin); c.Add(lin);
            var uu = Vesi ? VesiMerkki : Vector2.zero;
            u.Add(uu); u.Add(uu); u.Add(uu);
            t.Add(i); t.Add(i + 1); t.Add(i + 2);
            LopetaOsa();
        }

        /// <summary>Kolmio kärkikohtaisin värein (vesiverkon häivytykset).</summary>
        public void KolmioVarit(Vector3 a, Vector3 b, Vector3 d, Color ca, Color cb, Color cd)
        {
            var normaali = Vector3.Cross(b - a, d - a);
            if (normaali.sqrMagnitude < 1e-14f) return;
            if (Vesi && normaali.y < 0f) { var s = b; b = d; d = s; var sc = cb; cb = cd; cd = sc; normaali = -normaali; }
            normaali.Normalize();
            AloitaOsa();
            int i = v.Count;
            foreach (var (p, vari) in new[] { (a, ca), (b, cb), (d, cd) })
            {
                var lin = vari.linear; lin.a = vari.a;
                v.Add(p); n.Add(normaali); c.Add(lin); u.Add(Vesi ? VesiMerkki : Vector2.zero);
            }
            t.Add(i); t.Add(i + 1); t.Add(i + 2);
            LopetaOsa();
        }

        public void Nelio(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color vari) { AloitaOsa(); Kolmio(a, b, d, vari); Kolmio(a, d, e, vari); LopetaOsa(); }

        public void NelioVarit(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color ca, Color cb, Color cd, Color ce)
        { AloitaOsa(); KolmioVarit(a, b, d, ca, cb, cd); KolmioVarit(a, d, e, ca, cd, ce); LopetaOsa(); }

        /// <summary>Kaksipuolinen kalvo (purje, lippu, evä): molemmat puolet omilla normaaleillaan.</summary>
        public void Kalvo(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Color vari) { AloitaOsa(); Nelio(a, b, d, e, vari); Nelio(a, e, d, b, vari); LopetaOsa(); }
        public void KalvoKolmio(Vector3 a, Vector3 b, Vector3 d, Color vari) { AloitaOsa(); Kolmio(a, b, d, vari); Kolmio(a, d, b, vari); LopetaOsa(); }

        /// <summary>Kolmio, jonka etupuoli osoittaa suuntaan <paramref name="ulos"/> (järjestys käännetään tarvittaessa).</summary>
        public void KolmioUlos(Vector3 a, Vector3 b, Vector3 d, Vector3 ulos, Color vari)
        {
            if (Vector3.Dot(Vector3.Cross(b - a, d - a), ulos) < 0f) Kolmio(a, d, b, vari); else Kolmio(a, b, d, vari);
        }

        public void NelioUlos(Vector3 a, Vector3 b, Vector3 d, Vector3 e, Vector3 ulos, Color vari)
        { AloitaOsa(); KolmioUlos(a, b, d, ulos, vari); KolmioUlos(a, d, e, ulos, vari); LopetaOsa(); }

        /// <summary>Suorakulmainen laatikko: keskipohja p, koko (x, y, z); sivut ja katto (pohja pois, ei näy).</summary>
        public void Laatikko(Vector3 p, Vector3 koko, Color sivu, Color katto)
        {
            AloitaOsa();
            float x = koko.x * 0.5f, z = koko.z * 0.5f, y0 = p.y, y1 = p.y + koko.y;
            var a = new Vector3(p.x - x, y0, p.z - z); var b = new Vector3(p.x + x, y0, p.z - z);
            var d = new Vector3(p.x + x, y0, p.z + z); var e = new Vector3(p.x - x, y0, p.z + z);
            var up = Vector3.up * (y1 - y0);
            var keski = new Vector3(p.x, (y0 + y1) * 0.5f, p.z);
            NelioUlos(a, b, b + up, a + up, (a + b) * 0.5f - keski, sivu);
            NelioUlos(b, d, d + up, b + up, (b + d) * 0.5f - keski, sivu);
            NelioUlos(d, e, e + up, d + up, (d + e) * 0.5f - keski, sivu);
            NelioUlos(e, a, a + up, e + up, (e + a) * 0.5f - keski, sivu);
            NelioUlos(a + up, b + up, d + up, e + up, Vector3.up, katto);
            LopetaOsa();
        }

        /// <summary>Tanko pisteestä a pisteeseen b (maston, puomin, köyden tai piipun vaippa): säde r0 → r1, sivuja 3–12,
        /// päät kiinni. Köysille sivuja 3 ja säde ≥ 0,0008 yksikköä (noin 0,45 pt, MSAA on pois).</summary>
        public void Tanko(Vector3 a, Vector3 b, float r0, float r1, int sivuja, Color vari, bool paat = true)
        {
            var akseli = b - a;
            if (akseli.sqrMagnitude < 1e-12f) return;
            var z = akseli.normalized;
            var apu = Mathf.Abs(z.y) < 0.9f ? Vector3.up : Vector3.right;
            var x = Vector3.Cross(apu, z).normalized; var y = Vector3.Cross(z, x);
            AloitaOsa();
            for (int i = 0; i < sivuja; i++)
            {
                float a0 = i * Mathf.PI * 2f / sivuja, a1 = (i + 1) * Mathf.PI * 2f / sivuja;
                Vector3 s0 = x * Mathf.Cos(a0) + y * Mathf.Sin(a0), s1 = x * Mathf.Cos(a1) + y * Mathf.Sin(a1);
                NelioUlos(a + s0 * r0, a + s1 * r0, b + s1 * r1, b + s0 * r1, (s0 + s1) * 0.5f, vari);
                if (paat)
                {
                    KolmioUlos(a, a + s0 * r0, a + s1 * r0, -z, vari);
                    if (r1 > 1e-5f) KolmioUlos(b, b + s1 * r1, b + s0 * r1, z, vari);
                }
            }
            LopetaOsa();
        }

        public void Tanko(Vector3 a, Vector3 b, float r, int sivuja, Color vari) => Tanko(a, b, r, r, sivuja, vari);

        /// <summary>Pallo (oktaedrin jako 1 kertaa, 32 tahkoa): savupallo, suihkupallo, poiju.</summary>
        public void Pallo(Vector3 p, float r, Color vari, int jako = 1)
        {
            var kulmat = new[] { Vector3.up, Vector3.forward, Vector3.right, Vector3.back, Vector3.left, -Vector3.up };
            var tahkot = new List<(Vector3, Vector3, Vector3)>();
            for (int i = 0; i < 4; i++)
            {
                var s0 = kulmat[1 + i]; var s1 = kulmat[1 + (i + 1) % 4];
                tahkot.Add((kulmat[0], s1, s0)); tahkot.Add((kulmat[5], s0, s1));
            }
            for (int j = 0; j < jako; j++)
            {
                var uusi = new List<(Vector3, Vector3, Vector3)>();
                foreach (var (a, b, d) in tahkot)
                {
                    var ab = (a + b).normalized; var bd = (b + d).normalized; var da = (d + a).normalized;
                    uusi.Add((a, ab, da)); uusi.Add((ab, b, bd)); uusi.Add((da, bd, d)); uusi.Add((ab, bd, da));
                }
                tahkot = uusi;
            }
            AloitaOsa();
            foreach (var (a, b, d) in tahkot) KolmioUlos(p + a * r, p + b * r, p + d * r, a + b + d, vari);
            LopetaOsa();
        }

        /// <summary>
        /// Kaareva pinta ruudukkona: paikka(u, v) u, v ∈ [0, 1], jaot nu × nv; väri(u, v) tahkon keskeltä. Kaksipuolinen, jos
        /// kalvo (purje), muuten etupuoli suuntaan ulos(u, v) (runko, valaan selkä).
        /// </summary>
        public void Pinta(System.Func<float, float, Vector3> paikka, int nu, int nv, System.Func<float, float, Color> vari,
            bool kalvo, System.Func<float, float, Vector3> ulos = null)
        {
            AloitaOsa();
            for (int i = 0; i < nu; i++)
                for (int j = 0; j < nv; j++)
                {
                    float u0 = i / (float)nu, u1 = (i + 1) / (float)nu, v0 = j / (float)nv, v1 = (j + 1) / (float)nv;
                    Vector3 a = paikka(u0, v0), b = paikka(u1, v0), d = paikka(u1, v1), e = paikka(u0, v1);
                    var col = vari((u0 + u1) * 0.5f, (v0 + v1) * 0.5f);
                    if (kalvo) Kalvo(a, b, d, e, col);
                    else if (ulos != null) NelioUlos(a, b, d, e, ulos((u0 + u1) * 0.5f, (v0 + v1) * 0.5f), col);
                    else Nelio(a, b, d, e, col);
                }
            LopetaOsa();
        }

        /// <summary>Vesiverkon nauha (vanavesi): suunnassa kulkeva nelikulmioketju, leveys l0 → l1, alfa a0 → a1.</summary>
        public void Nauha(Vector3 alku, Vector3 suunta, float pituus, float l0, float l1, Color vari, float a0, float a1, int jaot)
        {
            suunta = suunta.normalized;
            var sivu = Vector3.Cross(Vector3.up, suunta).normalized;
            for (int i = 0; i < jaot; i++)
            {
                float q0 = i / (float)jaot, q1 = (i + 1) / (float)jaot;
                Vector3 p0 = alku + suunta * (pituus * q0), p1 = alku + suunta * (pituus * q1);
                float w0 = Mathf.Lerp(l0, l1, q0) * 0.5f, w1 = Mathf.Lerp(l0, l1, q1) * 0.5f;
                Color c0 = Alfa(vari, Mathf.Lerp(a0, a1, q0)), c1 = Alfa(vari, Mathf.Lerp(a0, a1, q1));
                NelioVarit(p0 - sivu * w0, p0 + sivu * w0, p1 + sivu * w1, p1 - sivu * w1, c0, c0, c1, c1);
            }
        }

        /// <summary>Vesiverkon pehmeä soikio (varjo, vaahtorengas): keskellä alfa a0, reunalla a1; säteet rx, rz; y = korkeus.</summary>
        public void Soikio(Vector3 keski, float rx, float rz, Color vari, float a0, float a1, int sektoreita = 20)
        {
            for (int i = 0; i < sektoreita; i++)
            {
                float k0 = i * Mathf.PI * 2f / sektoreita, k1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                var p0 = keski + new Vector3(Mathf.Cos(k0) * rx, 0f, Mathf.Sin(k0) * rz);
                var p1 = keski + new Vector3(Mathf.Cos(k1) * rx, 0f, Mathf.Sin(k1) * rz);
                KolmioVarit(keski, p1, p0, Alfa(vari, a0), Alfa(vari, a1), Alfa(vari, a1));
            }
        }

        /// <summary>Vesiverkon rengas (vaahtorengas): sisä- ja ulkosäde, sisällä alfa a0, ulkona a1.</summary>
        public void Rengas(Vector3 keski, float r0x, float r0z, float r1x, float r1z, Color vari, float a0, float a1, int sektoreita = 20)
        {
            for (int i = 0; i < sektoreita; i++)
            {
                float k0 = i * Mathf.PI * 2f / sektoreita, k1 = (i + 1) * Mathf.PI * 2f / sektoreita;
                Vector3 s0 = keski + new Vector3(Mathf.Cos(k0) * r0x, 0f, Mathf.Sin(k0) * r0z), s1 = keski + new Vector3(Mathf.Cos(k1) * r0x, 0f, Mathf.Sin(k1) * r0z);
                Vector3 u0 = keski + new Vector3(Mathf.Cos(k0) * r1x, 0f, Mathf.Sin(k0) * r1z), u1 = keski + new Vector3(Mathf.Cos(k1) * r1x, 0f, Mathf.Sin(k1) * r1z);
                NelioVarit(s0, s1, u1, u0, Alfa(vari, a0), Alfa(vari, a0), Alfa(vari, a1), Alfa(vari, a1));
            }
        }

        public Mesh Verkko(string nimi)
        {
            var m = new Mesh { name = "Meri-" + nimi };
            m.SetVertices(v); m.SetNormals(n); m.SetColors(c); m.SetUVs(1, u); m.SetTriangles(t, 0);
            m.RecalculateBounds();
            return m;
        }
    }
}
