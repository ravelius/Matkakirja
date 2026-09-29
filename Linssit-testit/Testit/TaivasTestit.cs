// Tähtitaivas (Linssiseppä 29.9.2026, vain natiivi): horisonttimuunnos, aurinko, taivaan sävy ja linssin elinkaari.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Taivas;

namespace Matkakirja.Linssit.Testit
{
    public static class TaivasTestit
    {
        const double Helsinki = 60.17, HelsinkiLon = 24.94;

        [Testi] static void PohjantahtiLeveydenKorkeudella()
        {
            // Polaris (RA 37,95°, Dec +89,26°) on aina noin leveyden korkeudella pohjoisessa, vuorokaudenajasta riippumatta.
            var polaris = Taivaslaskenta.Eci(37.95, 89.26);
            for (int h = 0; h < 24; h += 6)
            {
                double jd = Iss.Aika.Jd(new DateTime(2026, 9, 29, h, 0, 0, DateTimeKind.Utc));
                var p = Taivaslaskenta.Horisonttiin(polaris, Helsinki, Taivaslaskenta.Lst(jd, HelsinkiLon));
                Oleta.Tosi(Math.Abs(p.Korkeus - Helsinki) < 1.0, $"klo {h}: korkeus {p.Korkeus:F2}");
                Oleta.Tosi(p.Atsimuutti < 2 || p.Atsimuutti > 358, $"klo {h}: atsimuutti {p.Atsimuutti:F1}");
            }
        }

        [Testi] static void AurinkoKeskipaivallaJaYolla()
        {
            // Syyspäiväntasauksen tienoilla (22.9.) Helsingin keskipäivän (noin 10.20 UTC) aurinko on noin 90 − 60 = 30° etelässä.
            double jd = Iss.Aika.Jd(new DateTime(2026, 9, 22, 10, 20, 0, DateTimeKind.Utc));
            var a = Taivaslaskenta.Aurinko(jd, Helsinki, HelsinkiLon);
            Oleta.Tosi(Math.Abs(a.Korkeus - 29.9) < 1.5, $"korkeus {a.Korkeus:F1}");
            Oleta.Tosi(Math.Abs(a.Atsimuutti - 180) < 5, $"atsimuutti {a.Atsimuutti:F1}");
            var yo = Taivaslaskenta.Aurinko(Iss.Aika.Jd(new DateTime(2026, 9, 22, 22, 20, 0, DateTimeKind.Utc)), Helsinki, HelsinkiLon);
            Oleta.Tosi(yo.Korkeus < -25, $"keskiyö {yo.Korkeus:F1}");
        }

        [Testi] static void NakyvyysJaSavy()
        {
            Oleta.Sama(0.0, Taivaslaskenta.TahtienNakyvyys(5));
            Oleta.Sama(1.0, Taivaslaskenta.TahtienNakyvyys(-20));
            Oleta.Tosi(Taivaslaskenta.TahtienNakyvyys(-8) > 0.2 && Taivaslaskenta.TahtienNakyvyys(-8) < 0.8);
            // Sävy on jatkuva avainkohtien yli ja yöllä tumma.
            double prev = double.NaN;
            for (double k = 12; k >= -20; k -= 0.5)
            {
                var (z, _) = Taivaslaskenta.Savy(k);
                double v = z.r + z.g + z.b;
                if (!double.IsNaN(prev)) Oleta.Tosi(Math.Abs(v - prev) < 0.12, $"hyppy {k}: {prev:F3} → {v:F3}");
                prev = v;
            }
            Oleta.Tosi(prev < 0.06, "yö on tumma");
        }

        sealed class ValeNakyma : ITaivaanNakyma
        {
            public readonly List<string> Loki = new List<string>();
            public void Avaa(double lat, double lon) => Loki.Add($"avaa {lat:F1} {lon:F1}");
            public void Paivita(double jd) => Loki.Add("paivita");
            public void Sulje() => Loki.Add("sulje");
        }

        [Testi] static void AvausJaSulku()
        {
            var y = new ValeYmparisto();
            var n = new ValeNakyma();
            var l = new TahtitaivasLinssi(n);
            l.Avaa(y);
            Oleta.Tosi(l.Auki);
            Oleta.Sama($"avaa {y.Asento.Lat:F1} {y.Asento.Lon:F1}", n.Loki[0], "paikka = kameran katsekohde");
            Oleta.Sama(false, y.PelikerroksetNakyvissa);
            l.Paivita();
            Oleta.Sama("paivita", n.Loki[^1]);
            l.Sulje();
            Oleta.Sama("sulje", n.Loki[^1]);
            Oleta.Sama(true, y.PelikerroksetNakyvissa);
            Oleta.Tosi(Iss.IssNyt.Simu.Live);
            Oleta.Tosi(!Linssirekisteri.Avauskynnykset.ContainsKey("tahdet"), "vain kehittäjätilassa");
        }
    }
}
