// Astronautin kameran elinkaari vale-ympäristössä.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class AstronauttiLinssiTestit
    {
        sealed class ValeNakyma : IAstronautinNakyma
        {
            public readonly List<string> Loki = new List<string>();
            public double PilvienPeitto = -1, SumunPeitto = -1;
            public bool NimetNakyvissa;
            public int IssPaivityksia;
            public void Avaus(AvauksenVaihe v) => Loki.Add("avaus " + v);
            public void Kohteet(IReadOnlyList<Havaintokohde> k) => Loki.Add("kohteet " + k.Count);
            public void Nimet(bool n) { NimetNakyvissa = n; Loki.Add("nimet " + n); }
            public void Pilvet(double p, double k) => PilvienPeitto = p;
            public void Sumu(double p) => SumunPeitto = p;
            public void Tahdet(double p) => Loki.Add("tahdet " + p);
            public void Iss(LatLon p, IReadOnlyList<LatLon> k) => IssPaivityksia++;
            public void Kuva(Havaintokohde k, int i) => Loki.Add($"kuva {k.Tunnus} {i}");
            public void KuvaPois() => Loki.Add("kuva pois");
            public void Pois() => Loki.Add("pois");
        }

        static (AstronauttiLinssi l, ValeYmparisto y, ValeNakyma n) Luo()
        {
            string P(string x) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", x);
            var a = AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(P("satelliitti-data.json"))),
                MiniJson.Jasenna(File.ReadAllText(P("astronaut-kysymykset.json"))));
            var y = new ValeYmparisto();
            var n = new ValeNakyma();
            return (new AstronauttiLinssi(a, n), y, n);
        }

        static void Aja(AstronauttiLinssi l, ValeYmparisto y, double s)
        {
            double loppu = y.Kello + s;
            while (y.Kello < loppu) { y.Kello += 1 / 60.0; l.Paivita(); }
        }

        [Testi] static void AvausOdottaaLaattojaJaMinimiaikaa()
        {
            var (l, y, n) = Luo();
            l.Avaa(y);
            Oleta.Sama(AvauksenVaihe.Musta, l.Vaihe);
            Oleta.Sama(false, y.Vale.Nakyvat["laatat"], "reliefi pohjan tilalle");
            Oleta.Sama(y.KokoPallonKorkeus, y.Ajo.Value.Korkeus, "pimeässä avauskorkeuteen");
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Valmis;
            Aja(l, y, 1.0);
            Oleta.Sama(AvauksenVaihe.Musta, l.Vaihe, "ennen 1800 ms:a musta pysyy");
            Aja(l, y, 0.9);
            Oleta.Sama(AvauksenVaihe.OtsikkoPois, l.Vaihe);
            Oleta.Sama(y.KokoPallonKorkeus * 0.72, y.Ajo.Value.Korkeus, "zoomi lepokorkeuteen");
            Oleta.Sama(5f, y.AjonKesto);
            Oleta.Tosi(Math.Abs(y.AjonPehmennys(0.3) - Astronauttimatikka.AvausPehmennys(0.3)) < 1e-12, "kuutiollinen ease-in-out");
            Aja(l, y, 0.75);
            Oleta.Sama(AvauksenVaihe.MustaPois, l.Vaihe);
            Aja(l, y, 1.2);
            Oleta.Sama(AvauksenVaihe.Pois, l.Vaihe);
        }

        [Testi] static void KattoPaljastaaIlmanLaattoja()
        {
            var (l, y, _) = Luo();
            l.Avaa(y);
            Aja(l, y, 11.9);
            Oleta.Sama(AvauksenVaihe.Musta, l.Vaihe);
            Aja(l, y, 0.2);
            Oleta.Sama(AvauksenVaihe.OtsikkoPois, l.Vaihe);
        }

        [Testi] static void NimetPilvetJaSumuKorkeudesta()
        {
            var (l, y, n) = Luo();
            l.Avaa(y);
            double avaus = y.KokoPallonKorkeus;
            y.Asento = new Nakyma(0, 0, avaus * 0.26);
            Aja(l, y, 0.1);
            Oleta.Sama(false, n.NimetNakyvissa, "0,26 > 0,25: ei vielä nimiä");
            y.Asento = new Nakyma(0, 0, avaus * 0.24);
            Aja(l, y, 0.1);
            Oleta.Sama(true, n.NimetNakyvissa);
            y.Asento = new Nakyma(0, 0, avaus * 0.28);
            Aja(l, y, 0.1);
            Oleta.Sama(true, n.NimetNakyvissa, "hystereesi: pysyy 0,29:ään asti");
            y.Asento = new Nakyma(0, 0, avaus * 0.3);
            Aja(l, y, 0.1);
            Oleta.Sama(false, n.NimetNakyvissa);
            Oleta.Sama(Astronauttimatikka.PilvienPeitto(0.3, 1), n.PilvienPeitto);
            Oleta.Sama(Astronauttimatikka.SumunPeitto(0.3, 1), n.SumunPeitto);
            Oleta.Tosi(n.IssPaivityksia > 0);
        }

        [Testi] static void NapautusAvaaKuvanVastaPaljastuksenJalkeen()
        {
            var (l, y, n) = Luo();
            l.Avaa(y);
            l.Napauta("etna");
            Oleta.Tosi(!n.Loki.Any(x => x.StartsWith("kuva ")), "mustan aikana ei kuvaa");
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Luovutti;
            Aja(l, y, 0.1);
            l.Napauta("etna");
            Oleta.Sama("kuva etna 0", n.Loki.Last());
            l.SuljeKuva();
            Oleta.Sama("kuva pois", n.Loki.Last());
        }

        [Testi] static void SulkeminenPalauttaaPallon()
        {
            var (l, y, n) = Luo();
            var alku = y.Asento;
            l.Avaa(y);
            Aja(l, y, 3);
            l.Sulje();
            Oleta.Sama(true, y.Vale.Nakyvat["laatat"]);
            Oleta.Sama(true, y.Vale.Nakyvat["reitit"]);
            Oleta.Sama(true, y.PelikerroksetNakyvissa);
            Oleta.Tosi(!y.Vale.Rasterit.ContainsKey(AstronauttiLinssi.Kerros));
            Oleta.Sama(alku.Korkeus, y.Ajo.Value.Korkeus);
            Oleta.Sama(0f, y.AjonKesto);
            Oleta.Sama("pois", n.Loki.Last());
        }
    }
}
