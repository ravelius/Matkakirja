// ISS-kameran GIBS-pilvet (synteettinen): maski, selkein päivä 7:stä, aukkojen paikkaus kerrosketjulla, pysyvä valkoinen
// pois (lumi), varjo auringosta poispäin, KuvanTyosto: valkoinen S2-pinta ei saa pilveä.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraGibsTestit
    {
        const int W = 40, H = 40;

        static byte[] Kuva(Func<int, int, (byte r, byte g, byte b)> f)
        {
            var k = new byte[W * H * 3];
            for (int y = 0; y < H; y++) for (int x = 0; x < W; x++) { var (r, g, b) = f(x, y); int i = (y * W + x) * 3; k[i] = r; k[i + 1] = g; k[i + 2] = b; }
            return k;
        }
        static readonly (byte, byte, byte) Meri = (20, 35, 60), Pilvi = (235, 236, 240), Lumi = (240, 242, 248);

        [Testi]
        static void MaskiErottaaPilvenHiekastaJaMeresta()
        {
            Oleta.Tosi(GibsPilvet.MaskiAlfa(235, 236, 240) > 0.99, "valkoinen pilvi");
            Oleta.Tosi(GibsPilvet.MaskiAlfa(210, 180, 140) < 0.01, "hiekka (lämmin sävy)");
            Oleta.Tosi(GibsPilvet.MaskiAlfa(150, 120, 90) < 0.01, "mutajoki");
            Oleta.Tosi(GibsPilvet.MaskiAlfa(20, 35, 60) < 0.01, "meri");
            double ohut = GibsPilvet.MaskiAlfa(150, 155, 165);
            Oleta.Tosi(ohut > 0.2 && ohut < 0.8, $"ohut pilvi osittain: {ohut}");
        }

        [Testi]
        static void SelkeinPaivaJaPysyvaValkoinenPois()
        {
            // Päivä 1: puolet pilveä; päivä 2: kaistale pilveä; päivä 3: pilvetön mutta dataa vain 40 % (ratarako) → ei valita.
            // Kaikkina päivinä sama lumialue (x < 5) → pinta, ei pilveä.
            var p = new List<(DateTime, byte[][])>();
            (byte, byte, byte) Lumella(int x, (byte, byte, byte) muu) => x < 5 ? Lumi : muu;
            p.Add((new DateTime(2026, 10, 4), new[] { Kuva((x, y) => Lumella(x, y < 20 ? Pilvi : Meri)), null, null, null }));
            p.Add((new DateTime(2026, 10, 3), new[] { Kuva((x, y) => Lumella(x, x >= 30 && x < 34 ? Pilvi : Meri)), null, null, null }));
            p.Add((new DateTime(2026, 10, 2), new[] { Kuva((x, y) => x >= 10 && x < 34 ? ((byte)0, (byte)0, (byte)0) : Lumella(x, Meri)), null, null, null }));
            var g = GibsPilvet.Kokoa(1000, 2000, W, H, p);
            Oleta.Sama(new DateTime(2026, 10, 3), g.Paiva, "selkein riittävän kattava päivä");
            Oleta.Tosi(g.Alfa[20 * W + 32] > 200, "valitun päivän pilvi mukana");
            Oleta.Tosi(g.Alfa[20 * W + 15] < 10, "päivän 1 pilvi ei mukana");
            Oleta.Tosi(g.Alfa[20 * W + 1] < 40, $"pysyvä lumi ei pilveä: {g.Alfa[20 * W + 1]}");
        }

        [Testi]
        static void RatarakoPaikataanSeuraavastaKerroksesta()
        {
            // SNPP: rako x 10–19 (musta); Terra samana päivänä: pilvi koko alueella → raon kohdalla Terran pilvi, muualla SNPP:n meri.
            var snpp = Kuva((x, y) => x >= 10 && x < 20 ? ((byte)0, (byte)0, (byte)0) : Meri);
            var terra = Kuva((x, y) => Pilvi);
            var g = GibsPilvet.Kokoa(0, 0, W, H, new List<(DateTime, byte[][])> { (new DateTime(2026, 10, 4), new[] { snpp, null, terra, null }) });
            Oleta.Tosi(g.Alfa[20 * W + 15] > 200, "raossa Terran pilvi");
            Oleta.Tosi(g.Alfa[20 * W + 30] < 10, "muualla SNPP (meri)");
        }

        [Testi]
        static void VarjoAuringostaPoispain()
        {
            // Pilvi keskellä; aurinko etelässä (az 180), matala → varjo pohjoiseen (pienempi y).
            var a = new byte[W * H]; var k = new byte[W * H];
            for (int y = 18; y < 22; y++) for (int x = 18; x < 22; x++) { a[y * W + x] = 255; k[y * W + x] = 255; }
            var (gx0, gy0) = GibsPilvet.Pikseli(60, 25);
            int x0 = (int)gx0 - 20, y0 = (int)gy0 - 20;
            var g = new GibsPilvet(x0, y0, W, H, a, k) { AurinkoAz = 180, AurinkoKorkeus = 45 };   // varjo 8–12 px pohjoiseen
            (double la, double lo) Piste(double gx, double gy)
            {
                double n = 256 * 512.0, lo = gx / n * 360 - 180, yy = Math.PI * (1 - 2 * gy / n);
                return (Math.Atan(Math.Sinh(yy)) * 180 / Math.PI, lo);
            }
            var (la1, lo1) = Piste(x0 + 20, y0 + 20);
            Oleta.Tosi(g.Nayte(la1, lo1).alfa > 0.9, "pilvi keskellä");
            var (la2, lo2) = Piste(x0 + 20, y0 + 10);
            var (la3, lo3) = Piste(x0 + 20, y0 + 30);
            Oleta.Tosi(g.Nayte(la2, lo2).varjo > 0.2, $"varjo pohjoispuolella: {g.Nayte(la2, lo2).varjo}");
            Oleta.Tosi(g.Nayte(la3, lo3).varjo < 0.02, $"ei varjoa eteläpuolella: {g.Nayte(la3, lo3).varjo}");
        }
    }
}
