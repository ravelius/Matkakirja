// ILMAKEHÄN TAULUKOT (Linssiseppä 2, 8.10.2026; PT: pallon maisema Unreal-tasolle, kohdat 1–2: fysikaalinen taivas ja ilmaperspektiivi).
// Karttasepän LUT-työkalun (tools/ilmakeha/ilmakeha-lut.mjs) tiedostot Resources/Ilmakeha/*.bytes (RGBAHalf LE, x nopein) ja
// ilmakeha.json (mitat, kaavat). Tämä on varjostimen CPU-vertailu: samat UV-kaavat ja suodatus (bilineaarinen, kolmas akseli taso-
// ja aurinkosuunnassa lineaarisesti), joten testi voi verrata varjostimen tulosta ja Karttasepän näytepisteitä ilman Unityä.
//  lapaisy 256×64: Hillaire 2020 -UV (korkeus, mu) → läpäisy ilmakehän ylärajalle.
//  taivas 96×64×(3×32): UE SkyViewLut (katseen zeniitti tiheä horisontissa, atsimuutti auringosta cos φ = 1 − 2v²) × auringon zeniitti
//   0–100° × korkeustaso 0,5 / 1,5 / 3 km.
//  ilmaperspektiivi 32×32×(3×32): etäisyys d = u²·200 km × cos γ = 1 − 2v² × auringon zeniitti × taso; RGB L_in, A keskim. läpäisy.
using System;

namespace Matkakirja.Linssit.Ilmakeha
{
    public struct Rgba
    {
        public double R, G, B, A;
        public Rgba(double r, double g, double b, double a) { R = r; G = g; B = b; A = a; }
        public static Rgba operator +(Rgba x, Rgba y) => new Rgba(x.R + y.R, x.G + y.G, x.B + y.B, x.A + y.A);
        public static Rgba operator *(Rgba x, double k) => new Rgba(x.R * k, x.G * k, x.B * k, x.A * k);
        public static Rgba Lerp(Rgba x, Rgba y, double t) => x * (1 - t) + y * t;
        public override string ToString() => $"({R:G4}, {G:G4}, {B:G4}, {A:G4})";
    }

    /// <summary>RGBAHalf-taulukko (x nopein, sitten y, sitten z).</summary>
    public sealed class Taulukko
    {
        public readonly int W, H, D; readonly float[] d;

        public Taulukko(byte[] tavut, int w, int h, int dd = 1)
        {
            if (tavut.Length != w * h * dd * 8) throw new ArgumentException($"koko {tavut.Length} ≠ {w}×{h}×{dd}×8");
            W = w; H = h; D = dd; d = new float[w * h * dd * 4];
            for (int i = 0; i < d.Length; i++) d[i] = Puoli(BitConverter.ToUInt16(tavut, i * 2));
        }

        public Rgba Tekseli(int x, int y, int z = 0)
        {
            int i = ((z * H + y) * W + x) * 4;
            return new Rgba(d[i], d[i + 1], d[i + 2], d[i + 3]);
        }

        /// <summary>Bilineaarinen näyte tasossa z (u, v ∈ [0,1], tekseli = u·(W−1) kuten Karttasepän UV:t).</summary>
        public Rgba Nayte(double u, double v, int z = 0)
        {
            double fx = Rajaa(u) * (W - 1), fy = Rajaa(v) * (H - 1);
            int x0 = (int)Math.Floor(fx), y0 = (int)Math.Floor(fy), x1 = Math.Min(W - 1, x0 + 1), y1 = Math.Min(H - 1, y0 + 1);
            double tx = fx - x0, ty = fy - y0;
            return Rgba.Lerp(Rgba.Lerp(Tekseli(x0, y0, z), Tekseli(x1, y0, z), tx), Rgba.Lerp(Tekseli(x0, y1, z), Tekseli(x1, y1, z), tx), ty);
        }

        static double Rajaa(double x) => x < 0 ? 0 : x > 1 ? 1 : x;

        /// <summary>IEEE 754 binary16 → float.</summary>
        public static float Puoli(ushort h)
        {
            int s = h >> 15, e = (h >> 10) & 0x1F, m = h & 0x3FF;
            double v = e == 0 ? m * Math.Pow(2, -24) : e == 31 ? (m == 0 ? double.PositiveInfinity : double.NaN) : (1 + m / 1024.0) * Math.Pow(2, e - 15);
            return (float)(s == 1 ? -v : v);
        }
    }

    public sealed class IlmakehaLut
    {
        public const double Rkm = 6360, RTkm = 6460, ApEtaisyysKm = 200, AurinkoMaxAst = 100;
        public static readonly double[] TasotM = { 500, 1500, 3000 };
        public const int TasoSyvyys = 32;
        public readonly Taulukko Lapaisy, Taivas, Ap, ApLapaisy;

        public IlmakehaLut(byte[] lapaisy, byte[] taivas, byte[] ap, byte[] apLapaisy)
        {
            Lapaisy = new Taulukko(lapaisy, 256, 64);
            Taivas = new Taulukko(taivas, 96, 64, 3 * TasoSyvyys);
            Ap = new Taulukko(ap, 32, 32, 3 * TasoSyvyys);
            if (apLapaisy != null) ApLapaisy = new Taulukko(apLapaisy, 32, 32, 3 * TasoSyvyys);
        }

        // --- UV-kaavat (ilmakeha.json) -----------------------------------------------------------------------------------------

        /// <summary>Läpäisy-LUT (Hillaire): korkeus (m) ja mu = cos(katseen zeniitti) → (u, v).</summary>
        public static (double u, double v) LapaisyUv(double korkeusM, double mu)
        {
            double r = Rkm + korkeusM / 1000, H = Math.Sqrt(RTkm * RTkm - Rkm * Rkm), rho = Math.Sqrt(Math.Max(0, r * r - Rkm * Rkm));
            double d = -r * mu + Math.Sqrt(Math.Max(0, r * r * (mu * mu - 1) + RTkm * RTkm));
            double dMin = RTkm - r, dMax = rho + H;
            return ((d - dMin) / (dMax - dMin), rho / H);
        }

        /// <summary>Maahan osuva suunta (läpäisy 0, varjostin tarkistaa).</summary>
        public static bool OsuuMaahan(double korkeusM, double mu)
        {
            double r = Rkm + korkeusM / 1000; return mu < 0 && r * r * (mu * mu - 1) + Rkm * Rkm >= 0;
        }

        /// <summary>Taivas-LUT: katseen zeniitti (rad) korkeustasolla → u (UE SkyViewLut, tiheä horisontissa).</summary>
        public static double TaivasU(double korkeusM, double zeniittiRad)
        {
            double r = Rkm + korkeusM / 1000, beta = Math.Acos(Math.Sqrt(r * r - Rkm * Rkm) / r), zha = Math.PI - beta;
            return zeniittiRad < zha ? (1 - Math.Sqrt(Math.Max(0, 1 - zeniittiRad / zha))) / 2 : 0.5 + 0.5 * Math.Sqrt(Math.Max(0, (zeniittiRad - zha) / beta));
        }

        /// <summary>Atsimuutti auringosta (rad, 0–π) → v: cos φ = 1 − 2v².</summary>
        public static double AtsimuuttiV(double phiRad) => Math.Sqrt(Math.Max(0, (1 - Math.Cos(phiRad)) / 2));

        /// <summary>Auringon zeniitti (astetta) → kerros w ∈ [0,1] tason sisällä (0–100°).</summary>
        public static double AurinkoW(double zeniittiAst) => Math.Max(0, Math.Min(1, zeniittiAst / AurinkoMaxAst));

        // --- Näytteet ----------------------------------------------------------------------------------------------------------

        public Rgba LapaisyNayte(double korkeusM, double mu)
        {
            if (OsuuMaahan(korkeusM, mu)) return new Rgba(0, 0, 0, 1);
            var (u, v) = LapaisyUv(korkeusM, mu); return Lapaisy.Nayte(u, v);
        }

        /// <summary>Taivaan radianssi (auringon irradianssi 1): kamera korkeudella, katseen zeniitti, atsimuutti auringosta, auringon zeniitti.</summary>
        public Rgba TaivasNayte(double korkeusM, double zeniittiRad, double phiRad, double aurinkoZenAst) =>
            Tasoissa(Taivas, korkeusM, aurinkoZenAst, (taso, z) => Taivas.Nayte(TaivasU(TasotM[taso], zeniittiRad), AtsimuuttiV(phiRad), z));

        /// <summary>Ilmaperspektiivi: kamerasta etäisyydellä d (m) olevan pinnan sironta (RGB) ja keskim. läpäisy (A).</summary>
        public Rgba IlmaperspektiiviNayte(double korkeusM, double etaisyysM, double cosGamma, double aurinkoZenAst)
        {
            double u = Math.Sqrt(Math.Max(0, etaisyysM / 1000 / ApEtaisyysKm)), v = Math.Sqrt(Math.Max(0, (1 - cosGamma) / 2));
            return Tasoissa(Ap, korkeusM, aurinkoZenAst, (taso, z) => Ap.Nayte(u, v, z));
        }

        /// <summary>Kolmas akseli: aurinkokerrokset (w·31) lineaarisesti tason sisällä ja tasot (0,5 / 1,5 / 3 km) lineaarisesti korkeudessa.</summary>
        static Rgba Tasoissa(Taulukko t, double korkeusM, double aurinkoZenAst, Func<int, int, Rgba> nayte)
        {
            double fw = AurinkoW(aurinkoZenAst) * (TasoSyvyys - 1); int w0 = (int)Math.Floor(fw), w1 = Math.Min(TasoSyvyys - 1, w0 + 1); double tw = fw - w0;
            Rgba Taso(int taso) => Rgba.Lerp(nayte(taso, taso * TasoSyvyys + w0), nayte(taso, taso * TasoSyvyys + w1), tw);
            if (korkeusM <= TasotM[0]) return Taso(0);
            if (korkeusM >= TasotM[TasotM.Length - 1]) return Taso(TasotM.Length - 1);
            int i = korkeusM < TasotM[1] ? 0 : 1; double th = (korkeusM - TasotM[i]) / (TasotM[i + 1] - TasotM[i]);
            return Rgba.Lerp(Taso(i), Taso(i + 1), th);
        }
    }
}
