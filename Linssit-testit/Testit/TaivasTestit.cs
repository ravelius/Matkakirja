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

        [Testi] static void PlaneetatTunnetuissaPaikoissa()
        {
            // Saturnuksen oppositio 21.9.2025 Kaloissa: RA noin 0 h 05 min (1,3°), Dec noin −3,5°.
            var sat = Planeetat.Paikka(Array.Find(Planeetat.Kaikki, x => x.Nimi == "Saturnus"),
                Iss.Aika.Jd(new DateTime(2025, 9, 21, 0, 0, 0, DateTimeKind.Utc)));
            var (ra, dec) = Planeetat.RaDec(sat.Suunta);
            double dra = ((ra - 1.3) + 540) % 360 - 180;
            Oleta.Tosi(Math.Abs(dra) < 2 && Math.Abs(dec + 3.5) < 2, $"Saturnus {ra:F1}° {dec:F1}°");
            Oleta.Tosi(Math.Abs(sat.Au - 8.4) < 0.3, $"Saturnus {sat.Au:F2} au");
            // Marsin oppositio 16.1.2025 Kaksosissa: RA noin 7 h 55 min (118,7°), Dec noin +25°.
            var mars = Planeetat.Paikka(Array.Find(Planeetat.Kaikki, x => x.Nimi == "Mars"),
                Iss.Aika.Jd(new DateTime(2025, 1, 16, 0, 0, 0, DateTimeKind.Utc)));
            var (mra, mdec) = Planeetat.RaDec(mars.Suunta);
            Oleta.Tosi(Math.Abs(mra - 118.7) < 3 && Math.Abs(mdec - 25) < 3, $"Mars {mra:F1}° {mdec:F1}°");
            Oleta.Tosi(Math.Abs(mars.Au - 0.64) < 0.05, $"Mars {mars.Au:F2} au");
        }

        [Testi] static void TahtikuviotOsuvatBsc5Tahtiin()
        {
            // Jokainen kuvion tähti löytää BSC5-parinsa 0,8°:n säteellä (kuvion paikat ovat oikein), ja pari on kirkas (mag < 5).
            string polku = System.IO.Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "tahdet-bsc5.json");
            var juuri = (Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(System.IO.File.ReadAllText(polku));
            var luettelo = new List<(double, double)>();
            var magnitudit = new List<double>();
            foreach (var o in (List<object>)juuri["tahdet"])
            {
                var r = (List<object>)o;
                luettelo.Add((Convert.ToDouble(r[0]), Convert.ToDouble(r[1])));
                magnitudit.Add(Convert.ToDouble(r[2]));
            }
            var napsautetut = Tahtikuviot.Napsauta(luettelo);
            Oleta.Sama(Tahtikuviot.Kaikki.Length, napsautetut.Count);
            int puuttuu = 0;
            for (int k = 0; k < napsautetut.Count; k++)
                for (int j = 0; j < napsautetut[k].Length; j++)
                {
                    var t = napsautetut[k][j];
                    int i = luettelo.FindIndex(l => { var e = Taivaslaskenta.Eci(l.Item1, l.Item2); return Math.Abs(e.x - t.x) + Math.Abs(e.y - t.y) + Math.Abs(e.z - t.z) < 1e-12; });
                    if (i < 0 || magnitudit[i] >= 5) { puuttuu++; Console.WriteLine($"      {Tahtikuviot.Kaikki[k].Nimi} tähti {j}: ei BSC5-paria"); }
                }
            Oleta.Sama(0, puuttuu, "kuvioiden tähdet ilman BSC5-paria");
            foreach (var k in Tahtikuviot.Kaikki)
                foreach (var (a, b) in k.Viivat) Oleta.Tosi(a < k.Tahdet.Length && b < k.Tahdet.Length, k.Nimi);
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
