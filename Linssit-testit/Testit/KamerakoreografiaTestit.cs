// Kamerakoreografia (Raamattu KAMERA-AJOT 24.9.2026): käyrien päät, nopeudet ja ylitys sekä aikajanan kohta.
using System;
using System.Linq;
using Matkakirja.Linssit.Kamera;

namespace Matkakirja.Linssit.Testit
{
    public static class KamerakoreografiaTestit
    {
        const double H = 1e-4;
        static double Nopeus(Kayra k, double t) => (Kamerakayrat.Arvo(k, Math.Min(1, t + H)) - Kamerakayrat.Arvo(k, Math.Max(0, t - H))) / (Math.Min(1, t + H) - Math.Max(0, t - H));
        static readonly Kayra[] Kaikki = (Kayra[])Enum.GetValues(typeof(Kayra));

        [Testi] static void PaatNollassaJaYkkosessa()
        {
            foreach (var k in Kaikki)
            {
                Oleta.Tosi(Math.Abs(Kamerakayrat.Arvo(k, 0)) < 1e-12, k + " alku");
                Oleta.Tosi(Math.Abs(Kamerakayrat.Arvo(k, 1) - 1) < 1e-12, k + " loppu");
                Oleta.Tosi(Math.Abs(Kamerakayrat.Arvo(k, 2) - 1) < 1e-12 && Math.Abs(Kamerakayrat.Arvo(k, -1)) < 1e-12, k + " rajaus");
            }
        }

        [Testi] static void EiHyppyaEikaNykaysta()
        {
            // Lähtö levosta kaikilla paitsi Jarruttava (jatkaa vauhdista) ja Tasainen; pysähdys kaikilla paitsi Kiihtyva ja Tasainen.
            foreach (var k in Kaikki)
            {
                if (k != Kayra.Jarruttava && k != Kayra.Tasainen) Oleta.Tosi(Nopeus(k, 0) < 0.05, k + " lähtönopeus " + Nopeus(k, 0));
                if (k != Kayra.Kiihtyva && k != Kayra.Tasainen) Oleta.Tosi(Math.Abs(Nopeus(k, 1)) < 0.05, k + " loppunopeus " + Nopeus(k, 1));
            }
        }

        [Testi] static void KuminauhaYlittaaHieman()
        {
            foreach (var k in new[] { Kayra.Kuminauha, Kayra.SyoksyKuminauha })
            {
                double max = Enumerable.Range(0, 1001).Max(i => Kamerakayrat.Arvo(k, i / 1000.0));
                Oleta.Tosi(max > 1.005 && max < 1.06, k + " ylitys " + max);
                double iso = Enumerable.Range(0, 1001).Max(i => Kamerakayrat.Arvo(k, i / 1000.0, 1.7));
                Oleta.Tosi(iso > max, k + " parametri kasvattaa ylitystä");
                Oleta.Tosi(Enumerable.Range(0, 1001).All(i => Kamerakayrat.Arvo(k, i / 1000.0, 0) <= 1 + 1e-12), k + " parametri 0: ei ylitystä");
            }
            foreach (var k in new[] { Kayra.Pehmea, Kayra.Kiihtyva, Kayra.Jarruttava, Kayra.Nousu, Kayra.Syoksy, Kayra.Tasainen })
                for (int i = 1; i <= 1000; i++)
                    Oleta.Tosi(Kamerakayrat.Arvo(k, i / 1000.0) >= Kamerakayrat.Arvo(k, (i - 1) / 1000.0) - 1e-12, k + " monotoninen");
        }

        [Testi] static void NousuAikaisinSyoksyMyohaan()
        {
            double Huippu(Kayra k) => Enumerable.Range(1, 999).Select(i => i / 1000.0).OrderByDescending(t => Nopeus(k, t)).First();
            Oleta.Tosi(Huippu(Kayra.Nousu) < 0.4, "nousun huippunopeus " + Huippu(Kayra.Nousu));
            Oleta.Tosi(Huippu(Kayra.Syoksy) > 0.6, "syöksyn huippunopeus " + Huippu(Kayra.Syoksy));
            Oleta.Tosi(Math.Abs(Huippu(Kayra.Pehmea) - 0.5) < 0.01, "pehmeän huippu keskellä");
        }

        [Testi] static void KetjunKohta()
        {
            var k = new Kameraketju(new[]
            {
                new Kameravaihe(0, 0, 1e7, 2, Kayra.Nousu),
                Kameravaihe.Tauko(1),
                new Kameravaihe(1, 17, 1.8e7, 4, Kayra.SyoksyKuminauha),
            });
            Oleta.Sama(7.0, k.KestoS);
            Oleta.Sama((0, 0.5), k.Kohta(1));
            Oleta.Sama(1, k.Kohta(2.5).Vaihe);
            Oleta.Tosi(k.Vaiheet[1].Pito, "tauko on pito");
            Oleta.Sama((2, 0.25), k.Kohta(4));
            Oleta.Sama((2, 1.0), k.Kohta(99));
            Oleta.Sama((-1, 0.0), new Kameraketju(null).Kohta(1));
        }

        [Testi] static void TempoMatkanMukaan()
        {
            Oleta.Sama(Kayra.Pehmea, Kamerakayrat.Matkalle(Kamerakayrat.Kulma(48.85, 2.35, 50.85, 4.35)));      // Pariisi–Bryssel
            Oleta.Sama(Kayra.Kuminauha, Kamerakayrat.Matkalle(Kamerakayrat.Kulma(48.85, 2.35, 41.9, 12.5)));    // Pariisi–Rooma
            Oleta.Sama(Kayra.SyoksyKuminauha, Kamerakayrat.Matkalle(Kamerakayrat.Kulma(48.85, 2.35, 35.7, 139.7))); // Pariisi–Tokio
            Oleta.Tosi(Math.Abs(Kamerakayrat.Kulma(0, 0, 0, 90) - 90) < 1e-9, "neljännesympyrä");
            var f = Kamerakayrat.Matkalle(48.85, 2.35, 35.7, 139.7);
            Oleta.Tosi(Enumerable.Range(0, 101).Max(i => f(i / 100.0)) > 1, "pitkä matka joustaa perille");
            var paluu = Kamerakayrat.Funktio(Kayra.Kuminauha, Kamerakayrat.PaluunYlitys);
            double yli = Enumerable.Range(0, 1001).Max(i => paluu(i / 1000.0));
            Oleta.Tosi(yli > 1 && yli < Enumerable.Range(0, 1001).Max(i => Kamerakayrat.Arvo(Kayra.Kuminauha, i / 1000.0)), "paluun jousto kevyempi");
        }
    }
}
