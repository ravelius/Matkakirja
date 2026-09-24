// RADIOMASTOJEN GEOMETRIA: puhtaat osat (ei UnityEngineä; Kartta-testit/MastoGeometriaTestit.cs).
//
// Radiouudistus build 12 (suunnitelma docs/raportit/linssi-radiouudistus-suunnitelma-20260924.md luku 4, havainnekuva
// hyväksytty omistajalla 24.9.2026). Mittojen lähde on havainnekuvan piirtokoodi lahde/mastot.js (pelin repo, haara
// linssiseppa-radio-hamara2), jossa masto on kaksiulotteinen profiili korkeudella h. Tässä sama profiili avaruudessa:
//
//   Iso    harustettu ristikkomasto: kolmiopoikkileikkaus, leveys 0,07 h, ristikko 0,94 h (12 kenttää), antenni
//          1,0 h:hon; harukset korkeuksilla 0,36 / 0,68 / 0,95 h kolmeen suuntaan (120°), ankkuri 0,42 · t · h
//          maston juuresta (mastot.js: x2 = x + d · h · 0,42 · t)
//   Keski  itsekantava ristikkotorni: neliöpoikkileikkaus 0,26 h → 0,05 h, ristikko 0,9 h (7 kenttää), tasanne
//          0,62 h (leveys 0,12 h, korkeus 0,035 h), antenni 1,0 h:hon
//   Pieni  putkimasto: putki 0,1 h → 0,05 h 0,92 h:hon, poikkipuomi 0,72 h (0,22 × 0,05 h), antenni 1,0 h:hon
//
// Verkko on maston korkeuden yksiköissä (juuri y = 0, huippu y = 1), joten instanssin skaalaus (H, H · nousu, H)
// antaa maston korkeuden maailmassa (RadioMastot laskee H:n ruudun pisteistä). Kolmioita noin 250 (Iso), 200 (Keski)
// ja 50 (Pieni).
//
// VIIVAT RUUDUN PISTEINÄ (Natiivisepän laitekierros b12d 24.9.: 3D-sauvat ohenivat 30–64 pt:n mastossa alle pikselin,
// ja ristikosta jäi näkyviin vain tikku ja poikkipuu): ristikon tolpat, vinoristikko, vaakasauvat, antenni ja
// harukset ovat viivoja kuten havainnekuvan SVG:ssä. Viivan kärjissä on molemmat päätepisteet (uv2, uv3), puoli
// (uv.x = ±1) ja leveys pisteinä (uv.y); varjostin levittää nelikulmion ruudulla kohtisuoraan viivaa vastaan, joten
// leveys pysyy pisteinä maston koosta riippumatta (mastot.js: tolppa 1,1, ristikko 0,6, harus 0,5, antenni 1,4 pt).
// Kylkien täyttö on puoliläpinäkyvä levy (mastot.js: kyljet peitolla 0,55 ja 0,7), putki ja tasanne kiinteitä.
// Värit: viivat lähes mustat #1c1813 (omistajan palaute: tummat tolpat ja vinoristikko), harukset #2a241c peitolla
// 0,7, kylki #5d5242, putki #7d705d, tasanne ja puomi #3a3126.
using System;
using System.Collections.Generic;
using Num = System.Numerics;

namespace Matkakirja
{
    /// <summary>Proseduraalinen verkko ilman Unityä: kärjet, normaalit, värit (RGBA 0–255) ja kolmiot.</summary>
    public sealed class MastoVerkko
    {
        public readonly List<Num.Vector3> Paikat = new List<Num.Vector3>();
        public readonly List<Num.Vector3> Normaalit = new List<Num.Vector3>();
        public readonly List<uint> Varit = new List<uint>();
        public readonly List<int> Kolmiot = new List<int>();
        /// <summary>Viivan puoli (x = ±1) ja leveys pisteinä (y); kiinteällä pinnalla (0, 0).</summary>
        public readonly List<Num.Vector2> Viivat = new List<Num.Vector2>();
        /// <summary>Viivan päätepisteet (kiinteällä pinnalla molemmat = kärki).</summary>
        public readonly List<Num.Vector3> Alut = new List<Num.Vector3>(), Loput = new List<Num.Vector3>();

        public int Kolmioita => Kolmiot.Count / 3;

        void Karki(Num.Vector3 p, Num.Vector3 n, uint vari, Num.Vector2 viiva, Num.Vector3 a, Num.Vector3 b)
        {
            Paikat.Add(p); Normaalit.Add(n); Varit.Add(vari); Viivat.Add(viiva); Alut.Add(a); Loput.Add(b);
        }

        /// <summary>Viiva a → b, leveys pisteinä ruudulla (varjostin levittää).</summary>
        public void Viiva(Num.Vector3 a, Num.Vector3 b, float leveysPt, uint vari)
        {
            int i = Paikat.Count;
            var n = Num.Vector3.UnitY;
            Karki(a, n, vari, new Num.Vector2(-1, leveysPt), a, b);
            Karki(a, n, vari, new Num.Vector2(1, leveysPt), a, b);
            Karki(b, n, vari, new Num.Vector2(1, leveysPt), a, b);
            Karki(b, n, vari, new Num.Vector2(-1, leveysPt), a, b);
            Kolmiot.AddRange(new[] { i, i + 1, i + 2, i, i + 2, i + 3 });
        }

        /// <summary>Suorakulmainen levy (a, b, c, d vastapäivään normaalista katsottuna).</summary>
        public void Levy(Num.Vector3 a, Num.Vector3 b, Num.Vector3 c, Num.Vector3 d, Num.Vector3 normaali, uint vari)
        {
            int i = Paikat.Count;
            var n = Num.Vector3.Normalize(normaali);
            foreach (var p in new[] { a, b, c, d }) Karki(p, n, vari, Num.Vector2.Zero, p, p);
            Kolmiot.AddRange(new[] { i, i + 1, i + 2, i, i + 2, i + 3 });
        }

        /// <summary>Kolmion muotoinen sauva a → b (kolme kylkeä, ei päätyjä), säde r0 alussa ja r1 lopussa.</summary>
        public void Sauva(Num.Vector3 a, Num.Vector3 b, float r0, float r1, uint vari, int kylkia = 3)
        {
            var akseli = Num.Vector3.Normalize(b - a);
            var apu = Math.Abs(akseli.Y) < 0.9f ? Num.Vector3.UnitY : Num.Vector3.UnitX;
            var u = Num.Vector3.Normalize(Num.Vector3.Cross(akseli, apu));
            var v = Num.Vector3.Cross(akseli, u);
            for (int k = 0; k < kylkia; k++)
            {
                double k0 = 2 * Math.PI * k / kylkia, k1 = 2 * Math.PI * (k + 1) / kylkia, km = (k0 + k1) / 2;
                var s0 = u * (float)Math.Cos(k0) + v * (float)Math.Sin(k0);
                var s1 = u * (float)Math.Cos(k1) + v * (float)Math.Sin(k1);
                var n = u * (float)Math.Cos(km) + v * (float)Math.Sin(km);
                Levy(a + s0 * r0, a + s1 * r0, b + s1 * r1, b + s0 * r1, n, vari);
            }
        }

        /// <summary>Laatikko (kuusi tahkoa) keskipisteen ja puolikkaiden mittojen mukaan.</summary>
        public void Laatikko(Num.Vector3 k, Num.Vector3 puoli, uint vari)
        {
            var x = new Num.Vector3(puoli.X, 0, 0);
            var y = new Num.Vector3(0, puoli.Y, 0);
            var z = new Num.Vector3(0, 0, puoli.Z);
            Levy(k + x - y - z, k + x + y - z, k + x + y + z, k + x - y + z, Num.Vector3.UnitX, vari);
            Levy(k - x - y + z, k - x + y + z, k - x + y - z, k - x - y - z, -Num.Vector3.UnitX, vari);
            Levy(k - x + y - z, k - x + y + z, k + x + y + z, k + x + y - z, Num.Vector3.UnitY, vari);
            Levy(k - x - y + z, k - x - y - z, k + x - y - z, k + x - y + z, -Num.Vector3.UnitY, vari);
            Levy(k - x - y + z, k + x - y + z, k + x + y + z, k - x + y + z, Num.Vector3.UnitZ, vari);
            Levy(k + x - y - z, k - x - y - z, k - x + y - z, k + x + y - z, -Num.Vector3.UnitZ, vari);
        }
    }

    public static class MastoGeometria
    {
        /// <summary>RGBA-väri pakattuna (r alimmassa tavussa).</summary>
        public static uint Vari(int r, int g, int b, int a = 255) => (uint)(r | (g << 8) | (b << 16) | (a << 24));

        public static readonly uint Teras = Vari(0x5d, 0x52, 0x42);
        public static readonly uint Harus = Vari(0x2a, 0x24, 0x1c);
        public static readonly uint Putki = Vari(0x7d, 0x70, 0x5d);
        public static readonly uint Tumma = Vari(0x3a, 0x31, 0x26);

        /// <summary>Verkko koon mukaan: 0 = Pieni, 1 = Keski, 2 = Iso (MastoKoko-järjestys).</summary>
        public static MastoVerkko Verkko(int koko) => koko switch { 2 => Iso(), 1 => Keski(), _ => Pieni() };

        static Num.Vector3 V(float x, float y, float z) => new Num.Vector3(x, y, z);

        public static readonly uint Viivan = Vari(0x1c, 0x18, 0x13);
        public static readonly uint Kylki = Vari(0x5d, 0x52, 0x42, 0x70);
        public static readonly uint HarusViiva = Vari(0x2a, 0x24, 0x1c, 0xb3);

        /// <summary>
        /// Ristikko: n kulmaa (säteet ala → yla), korkeus h, kenttiä osat. Kyljet puoliläpinäkyvinä levyinä, tolpat ja
        /// ristikko viivoina (mastot.js ristikko(): kaksi vinoa ja vaaka jokaisessa kentässä).
        /// </summary>
        static void Ristikko(MastoVerkko m, int n, float ala, float yla, float h, int osat, float tolppaPt, float sauvaPt)
        {
            Num.Vector3 Kulma(int i, float t)
            {
                double k = 2 * Math.PI * i / n + Math.PI / n;
                float r = ala + (yla - ala) * t;
                return V(r * (float)Math.Cos(k), h * t, r * (float)Math.Sin(k));
            }
            for (int i = 0; i < n; i++)
            {
                int j = (i + 1) % n;
                var a0 = Kulma(i, 0); var b0 = Kulma(j, 0); var a1 = Kulma(i, 1); var b1 = Kulma(j, 1);
                var normaali = Num.Vector3.Normalize(Num.Vector3.Cross(b0 - a0, a1 - a0));
                var keski = (a0 + b0) / 2; keski.Y = 0;
                if (Num.Vector3.Dot(normaali, keski) < 0) normaali = -normaali;
                m.Levy(a0, b0, b1, a1, normaali, Kylki);
                m.Viiva(a0, a1, tolppaPt, Viivan);
                for (int o = 0; o < osat; o++)
                {
                    float t0 = (float)o / osat, t1 = (float)(o + 1) / osat;
                    var p0 = Kulma(i, t0); var q0 = Kulma(j, t0); var p1 = Kulma(i, t1); var q1 = Kulma(j, t1);
                    m.Viiva(p0, q1, sauvaPt, Viivan);
                    m.Viiva(q0, p1, sauvaPt, Viivan);
                    m.Viiva(p1, q1, sauvaPt, Viivan);
                }
            }
        }

        /// <summary>Harustettu ristikkomasto (Iso, noin 250 kolmiota).</summary>
        public static MastoVerkko Iso()
        {
            var m = new MastoVerkko();
            const float lev = 0.07f, h = 0.94f;
            // Kolmion sivu lev → kulmien ympyrän säde lev / √3.
            float r = lev / (float)Math.Sqrt(3);
            Ristikko(m, 3, r, r, h, 12, 1.1f, 0.6f);
            m.Viiva(V(0, h, 0), V(0, 1, 0), 1.4f, Viivan);
            // Harukset kolmeen suuntaan (mastot.js: korkeuksilta 0,36 / 0,68 / 0,95, ankkuri 0,42 · t).
            foreach (float t in new[] { 0.36f, 0.68f, 0.95f })
                for (int s = 0; s < 3; s++)
                {
                    double k = 2 * Math.PI * s / 3 + Math.PI / 6;
                    m.Viiva(V(0, t, 0), V(0.42f * t * (float)Math.Cos(k), 0, 0.42f * t * (float)Math.Sin(k)), 0.5f, HarusViiva);
                }
            return m;
        }

        /// <summary>Itsekantava ristikkotorni (Keski, noin 200 kolmiota).</summary>
        public static MastoVerkko Keski()
        {
            var m = new MastoVerkko();
            const float h = 0.9f;
            // Neliön sivu s → kulmien ympyrän säde s / √2.
            float s2 = (float)Math.Sqrt(2);
            Ristikko(m, 4, 0.26f / s2, 0.05f / s2, h, 7, 1.1f, 0.6f);
            m.Laatikko(V(0, 0.62f + 0.0175f, 0), V(0.06f, 0.0175f, 0.06f), Tumma);
            m.Viiva(V(0, h, 0), V(0, 1, 0), 1.2f, Viivan);
            return m;
        }

        /// <summary>Putkimasto (Pieni, noin 50 kolmiota).</summary>
        public static MastoVerkko Pieni()
        {
            var m = new MastoVerkko();
            m.Sauva(V(0, 0, 0), V(0, 0.92f, 0), 0.05f, 0.025f, Putki, 10);
            m.Laatikko(V(0, 0.72f + 0.025f, 0), V(0.11f, 0.025f, 0.02f), Tumma);
            m.Laatikko(V(0, 0.72f + 0.025f, 0), V(0.02f, 0.025f, 0.11f), Tumma);
            m.Viiva(V(0, 0.92f, 0), V(0, 1, 0), 1.0f, Viivan);
            return m;
        }

        // ---- Näkyvyys ja osumatesti ----

        /// <summary>
        /// Onko piste p pallon takana kamerasta c katsottuna: jana c → p kulkee pallon (keskus o, säde r) läpi ennen
        /// p:tä. Mastoille säde on juuren etäisyys keskipisteestä (paikallinen pinta) miinus pieni vara, joten juuri
        /// itse ei karsiudu ja maston yli horisontin nouseva huippu näkyy.
        /// </summary>
        public static bool PallonTakana(Num.Vector3 c, Num.Vector3 p, Num.Vector3 o, float r)
        {
            // Kaksoistarkkuus: maailmankoordinaatit ovat noin 6,4e6 m.
            double dx = p.X - c.X, dy = p.Y - c.Y, dz = p.Z - c.Z;
            double ox = o.X - c.X, oy = o.Y - c.Y, oz = o.Z - c.Z;
            double dd = dx * dx + dy * dy + dz * dz;
            if (dd <= 0) return false;
            double t = (ox * dx + oy * dy + oz * dz) / dd;
            if (t <= 0 || t >= 1) return false;   // lähin kohta kameran takana tai pisteen takana: ei peitä
            double qx = dx * t - ox, qy = dy * t - oy, qz = dz * t - oz;
            return qx * qx + qy * qy + qz * qz < (double)r * r;
        }

        /// <summary>
        /// Napautuksen osuma (suunnitelma luku 4: 44 × 44 pt maston puolivälissä): lähin keskipiste, jonka neliö
        /// (puoli = 22 pt pikseleinä) sisältää pisteen; -1 = ei osumaa. xs/ys ovat näkyvien mastojen puolivälit.
        /// </summary>
        public static int Osuma(float[] xs, float[] ys, int maara, float x, float y, float puoli)
        {
            int paras = -1;
            float parasD = float.MaxValue;
            for (int i = 0; i < maara; i++)
            {
                float dx = Math.Abs(x - xs[i]), dy = Math.Abs(y - ys[i]);
                if (dx > puoli || dy > puoli) continue;
                float d = dx * dx + dy * dy;
                if (d < parasD) { parasD = d; paras = i; }
            }
            return paras;
        }

        /// <summary>
        /// Valon mittakaava (havainnekuvan mastot.js: r × max(0,7, mittakaava)): maston koko ruudulla suhteessa
        /// 2 600 km:n viitekorkeuteen. Maston korkeus maailmassa ∝ korkeus^0,85 (Mastot.KorkeusM), joten ruudulla
        /// ∝ korkeus^−0,15. Rajattu 0,7…1,6.
        /// </summary>
        public static float ValonMittakaava(double kameranKorkeusM)
        {
            double k = Math.Pow(Math.Max(1000, kameranKorkeusM) / 2_600_000.0, -0.15);
            return (float)Math.Min(1.6, Math.Max(0.7, k));
        }

        /// <summary>
        /// Maavalon säde (m): 110 km hiljaisella, 140 km täydellä kirkkaudella (suunnitelma luvut 3 ja 5; b12d-palaute:
        /// 110–140 km, maavalo ei erottunut).
        /// </summary>
        public static float MaavalonSadeM(float kirkkaus) => 110_000f + 30_000f * Math.Min(1f, Math.Max(0f, kirkkaus));

        /// <summary>
        /// Maston korkeus maailmassa (m), jotta se näkyy ruudulla tavoitePx:n korkuisena. pxPerM = maston juuren
        /// kohdalla mitattu ruudun pikselimäärä metriä kohden pinnan normaalin suunnassa (sisältää perspektiivin ja
        /// lyhenemisen sin φ, φ = näkösäteen ja maston välinen kulma). Lyheneminen korvataan vain 40°:n kallistukseen
        /// asti: jyrkemmin ylhäältä katsottuna masto lyhenee luonnollisesti (suunnitelma luku 4: 0°:ssa lyhyt).
        /// </summary>
        public static float KorkeusRuudulle(float tavoitePx, float pxPerM, float sinPhi, float sinViite = 0.6427876f)
        {
            if (pxPerM <= 0 || tavoitePx <= 0) return 0;
            float s = Math.Max(1e-3f, sinPhi);
            float pxPerMKohtisuora = pxPerM / s;
            return tavoitePx / (pxPerMKohtisuora * Math.Max(s, sinViite));
        }

        /// <summary>
        /// Maston koon kasvu zoomatessa (Mastot.KorkeusM:n laki: maailmassa ∝ korkeus^0,85, ruudulla ∝ korkeus^−0,15),
        /// 1 kameran etäisyydellä 2 600 km (PalloKierto.korkeus = etäisyys katsottavaan pisteeseen). Rajattu 0,6…2,5.
        /// </summary>
        public static float Kasvu(double kameranEtaisyysM) =>
            (float)Math.Min(2.5, Math.Max(0.6, Math.Pow(Math.Max(1000, kameranEtaisyysM) / 2_600_000.0, -0.15)));

        /// <summary>sRGB-komponentti (0–1) lineaariseksi (varjostimen uniformit ovat lineaarisia).</summary>
        public static float Lineaarinen(float s) => s <= 0.04045f ? s / 12.92f : (float)Math.Pow((s + 0.055f) / 1.055f, 2.4f);

        /// <summary>Hämärän kerroin ja lisäys (suunnitelma luku 3, omistaja 24.9. klo 20.0x), lineaarisessa tilassa.</summary>
        public static readonly float[] HamaraKerroin = { 0.18f, 0.17f, 0.24f };
        public static readonly float[] HamaraLisa = { 0.006f, 0.006f, 0.016f };

        /// <summary>lerp(pohja, pohja × kerroin + lisä, h) lineaarisella värillä (sama kaava kuin varjostimissa).</summary>
        public static float Hamara(float pohja, int kanava, float h)
        {
            h = Math.Min(1f, Math.Max(0f, h));
            float ham = pohja * HamaraKerroin[kanava] + HamaraLisa[kanava];
            return pohja + (ham - pohja) * h;
        }
    }
}
