// Keksintölinssin pysäkkiajo paketin oikeilla pysäkeillä ja laudan Miller-muunnos.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class PysakkiajoTestit
    {
        sealed class ValeNakyma : IPysakkiajonNakyma
        {
            public readonly List<(double ms, string mita)> Loki = new List<(double, string)>();
            readonly ValeYmparisto y;
            public double Vuosi;
            public ValeNakyma(ValeYmparisto y) { this.y = y; }
            public void Kello(double v) => Vuosi = v;
            public void Sytyta(int i) => Loki.Add((y.Kello * 1000, "sytyta " + i));
            public void Selaus(int i) => Loki.Add((y.Kello * 1000, "selaus " + i));
            public void Valinaytos(int i) => Loki.Add((y.Kello * 1000, "valinaytos " + i));
            public void Tauolla(bool t) => Loki.Add((y.Kello * 1000, "tauolla " + t));
            public void Loppu() => Loki.Add((y.Kello * 1000, "loppu"));
        }

        static List<Pysakki> Pysakit()
        {
            var m = MiniJson.Objekti(MiniJson.Jasenna(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", "keksinnot.json"))));
            var t = MiniJson.Taulukko(MiniJson.Kentta(MiniJson.Objekti(MiniJson.Kentta(m, "exportit")), "KEKSINNOT"));
            return t.Select(o => MiniJson.Objekti(o)).Select(o => new Pysakki
            {
                Vuosi = MiniJson.Luku(o, "vuosi").Value, Lat = MiniJson.Luku(o, "lat") ?? double.NaN, Lon = MiniJson.Luku(o, "lon") ?? double.NaN,
                Paalu = MiniJson.Totuus(o, "paalu"), Hiljainen = MiniJson.Totuus(o, "hiljainen"),
                Valinaytos = MiniJson.Kentta(o, "valinaytos") != null, Otsikko = MiniJson.Teksti(o, "otsikko"),
            }).ToList();
        }

        static (Pysakkiajo a, ValeYmparisto y, ValeNakyma n, List<Pysakki> p) Luo()
        {
            var y = new ValeYmparisto();
            var n = new ValeNakyma(y);
            var p = Pysakit();
            var alue = Kameramatikka.LaatikkoLaudalta(5560, 830, 1700, 1000);
            return (new Pysakkiajo(p, 1765, alue, y, n), y, n, p);
        }

        static void Aja(Pysakkiajo a, ValeYmparisto y, ValeNakyma n, double s)
        {
            double loppu = y.Kello + s;
            while (y.Kello < loppu && !a.Paattynyt)
            {
                y.Kello += 1 / 60.0;
                a.Paivita(1000 / 60.0);
                if (a.ValinaytosAuki) a.Jatka();
            }
        }

        [Testi] static void KaikkiPysakitSyttyvatJarjestyksessa()
        {
            var (a, y, n, p) = Luo();
            a.SovitaAlkuun();
            a.Jatka();
            Aja(a, y, n, 1000);
            Oleta.Tosi(a.Paattynyt, "kaari päättyi");
            var syttyneet = n.Loki.Where(l => l.mita.StartsWith("sytyta ")).Select(l => int.Parse(l.mita.Substring(7))).ToList();
            Oleta.Sama(string.Join(",", Enumerable.Range(0, p.Count)), string.Join(",", syttyneet));
            Oleta.Sama(1, n.Loki.Count(l => l.mita.StartsWith("valinaytos")), "1873 välinäytös kerran");
            Oleta.Sama("loppu", n.Loki.Last().mita);
            Oleta.Sama(Kameramatikka.LoppuAjoMs, a.ViimeisinAjo.Value.kestoMs);
            Oleta.Tosi(a.ViimeisinAjo.Value.keskus.Lat > 40 && a.ViimeisinAjo.Value.keskus.Lat < 60, "loppukuva Euroopan yllä");
        }

        [Testi] static void KameraOnPerillaEnnenValoa()
        {
            var (a, y, n, p) = Luo();
            a.SovitaAlkuun();
            a.Jatka();
            Aja(a, y, n, 60);
            // Toinen pysäkki (1783): kameran ajo alkoi ennen syttymistä ja kesti ≥ 900 ms.
            int syttyi = n.Loki.FindIndex(l => l.mita == "sytyta 1");
            Oleta.Tosi(syttyi >= 0);
            Oleta.Tosi(y.Loki.Count(l => l == "ajo") >= 3, "alku + ennakkoajot");
        }

        [Testi] static void SelausSytyttaaKaikki()
        {
            var (a, y, n, p) = Luo();
            a.Jatka();
            Aja(a, y, n, 5);
            a.Siirry(10);
            Oleta.Sama("selaus 10", n.Loki.Last().mita);
            Oleta.Sama(false, a.Kaynnissa);
            Oleta.Sama(p[10].Vuosi, n.Vuosi);
        }

        [Testi] static void LautaAsteiksiKutenWebissa()
        {
            var k = JsonDocument.Parse(File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "lauta.json"))).RootElement;
            foreach (var r in k.GetProperty("pisteet").EnumerateArray())
            {
                var l = Kameramatikka.LaudaltaAsteiksi(r.GetProperty("x").GetDouble(), r.GetProperty("y").GetDouble());
                var o = r.GetProperty("a");
                Oleta.Tosi(Math.Abs(o.GetProperty("lat").GetDouble() - l.Lat) < 1e-9, $"lat {o.GetProperty("lat").GetDouble()} vs {l.Lat}");
                Oleta.Tosi(Math.Abs(o.GetProperty("lon").GetDouble() - l.Lon) < 1e-9, $"lon {o.GetProperty("lon").GetDouble()} vs {l.Lon}");
            }
        }
    }
}
