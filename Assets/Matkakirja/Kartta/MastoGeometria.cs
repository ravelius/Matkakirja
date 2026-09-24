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
// antaa maston korkeuden maailmassa (Mastot.KorkeusM). Kolmioita LOD0:ssa noin 300 (Iso), 210 (Keski) ja 60 (Pieni).
// Ristikon sauvat ovat tasolevyjä kyljen tasossa (normaali kyljen ulkonormaali); varjostin piirtää molemmat puolet.
// Värit (mastot.js): teräs #5d5242, harukset #2a241c, putki #7d705d, tasanne ja puomi #3a3126. Hämärässä varjostin
// tummentaa ne samalla kertoimella kuin kartan (mustahko ristikko kuten havainnekuvassa).
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

        public int Kolmioita => Kolmiot.Count / 3;

        /// <summary>Suorakulmainen levy (a, b, c, d vastapäivään normaalista katsottuna).</summary>
        public void Levy(Num.Vector3 a, Num.Vector3 b, Num.Vector3 c, Num.Vector3 d, Num.Vector3 normaali, uint vari)
        {
            int i = Paikat.Count;
            var n = Num.Vector3.Normalize(normaali);
            foreach (var p in new[] { a, b, c, d }) { Paikat.Add(p); Normaalit.Add(n); Varit.Add(vari); }
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

        /// <summary>Litteä sauva kyljen tasossa: a → b, leveys w, normaali = kyljen ulkonormaali.</summary>
        public void Lista(Num.Vector3 a, Num.Vector3 b, float w, Num.Vector3 normaali, uint vari)
        {
            var sivu = Num.Vector3.Normalize(Num.Vector3.Cross(b - a, normaali)) * (w / 2);
            Levy(a - sivu, a + sivu, b + sivu, b - sivu, normaali, vari);
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

        /// <summary>Ristikko: kulmien ympyrän säteet ala- ja yläpäässä, kulmia n, kenttiä osat, korkeus h.</summary>
        static void Ristikko(MastoVerkko m, int n, float ala, float yla, float h, int osat, float jalka, float sauva)
        {
            Num.Vector3 Kulma(int i, float t)
            {
                double k = 2 * Math.PI * i / n + Math.PI / n;
                float r = ala + (yla - ala) * t;
                return V(r * (float)Math.Cos(k), h * t, r * (float)Math.Sin(k));
            }
            // Jalat: yksi kolmiosauva kulmaa kohden.
            // Jalka ohenee kapenevassa tornissa puoleen matkaa kulmien suhteesta (Keski 0,6 ×, Iso ennallaan).
            float jalkaYla = jalka * (0.5f + 0.5f * yla / Math.Max(ala, 1e-4f));
            for (int i = 0; i < n; i++) m.Sauva(Kulma(i, 0), Kulma(i, 1), jalka, jalkaYla, Teras);
            // Kyljet: vaakasauva jokaisen kentän yläreunassa ja X-ristikko kentän sisällä (mastot.js: kaksi vinoa ja vaaka).
            for (int i = 0; i < n; i++)
            {
                int j = (i + 1) % n;
                for (int o = 0; o < osat; o++)
                {
                    float t0 = (float)o / osat, t1 = (float)(o + 1) / osat;
                    var a0 = Kulma(i, t0); var b0 = Kulma(j, t0); var a1 = Kulma(i, t1); var b1 = Kulma(j, t1);
                    var normaali = Num.Vector3.Normalize(Num.Vector3.Cross(b0 - a0, a1 - a0));
                    // Ulospäin: kyljen keskipiste akselilta poispäin.
                    var keski = (a0 + b0) / 2; keski.Y = 0;
                    if (Num.Vector3.Dot(normaali, keski) < 0) normaali = -normaali;
                    m.Lista(a0, b1, sauva, normaali, Teras);
                    m.Lista(b0, a1, sauva, normaali, Teras);
                    m.Lista(a1, b1, sauva, normaali, Teras);
                }
            }
        }

        /// <summary>Harustettu ristikkomasto (Iso, noin 280 kolmiota).</summary>
        public static MastoVerkko Iso()
        {
            var m = new MastoVerkko();
            const float lev = 0.07f, h = 0.94f;
            // Kolmion sivu lev → kulmien ympyrän säde lev / √3.
            float r = lev / (float)Math.Sqrt(3);
            Ristikko(m, 3, r, r, h, 12, 0.005f, 0.0045f);
            m.Sauva(V(0, h, 0), V(0, 1, 0), 0.006f, 0.003f, Tumma);
            // Harukset kolmeen suuntaan: kaksi ristikkäistä listaa, ettei harus katoa sivulta katsottuna.
            foreach (float t in new[] { 0.36f, 0.68f, 0.95f })
                for (int s = 0; s < 3; s++)
                {
                    double k = 2 * Math.PI * s / 3 + Math.PI / 6;
                    var ylos = V(0, t, 0);
                    var ankkuri = V(0.42f * t * (float)Math.Cos(k), 0, 0.42f * t * (float)Math.Sin(k));
                    var suunta = Num.Vector3.Normalize(ankkuri - ylos);
                    var sivu = Num.Vector3.Normalize(Num.Vector3.Cross(suunta, Num.Vector3.UnitY));
                    var toinen = Num.Vector3.Cross(suunta, sivu);
                    m.Lista(ylos, ankkuri, 0.005f, sivu, Harus);
                    m.Lista(ylos, ankkuri, 0.005f, toinen, Harus);
                }
            return m;
        }

        /// <summary>Itsekantava ristikkotorni (Keski, noin 210 kolmiota).</summary>
        public static MastoVerkko Keski()
        {
            var m = new MastoVerkko();
            const float h = 0.9f;
            // Neliön sivu s → kulmien ympyrän säde s / √2.
            float s2 = (float)Math.Sqrt(2);
            Ristikko(m, 4, 0.26f / s2, 0.05f / s2, h, 7, 0.009f, 0.006f);
            m.Laatikko(V(0, 0.62f + 0.0175f, 0), V(0.06f, 0.0175f, 0.06f), Tumma);
            m.Sauva(V(0, h, 0), V(0, 1, 0), 0.008f, 0.004f, Tumma);
            return m;
        }

        /// <summary>Putkimasto (Pieni, noin 60 kolmiota).</summary>
        public static MastoVerkko Pieni()
        {
            var m = new MastoVerkko();
            m.Sauva(V(0, 0, 0), V(0, 0.92f, 0), 0.05f, 0.025f, Putki, 10);
            m.Laatikko(V(0, 0.72f + 0.025f, 0), V(0.11f, 0.025f, 0.02f), Tumma);
            m.Laatikko(V(0, 0.72f + 0.025f, 0), V(0.02f, 0.025f, 0.11f), Tumma);
            m.Sauva(V(0, 0.92f, 0), V(0, 1, 0), 0.01f, 0.005f, Tumma);
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

        /// <summary>Maavalon säde (m): 110 km × (0,6 + 0,4 × kirkkaus) (suunnitelma luku 5).</summary>
        public static float MaavalonSadeM(float kirkkaus) => 110_000f * (0.6f + 0.4f * Math.Min(1f, Math.Max(0f, kirkkaus)));

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
