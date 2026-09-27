// Astronautin kameran kuvaselain (omistajan toive 27.9.2026 klo 23.5x, Linssisepän suositus
// docs/raportit/astronautin-kuvaselain-20260928.md): maailmankierros, naapurit ja kameran liuku kuvan kohteen ylle.
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.Astronautti;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class AstronauttiKierrosTestit
    {
        static AstronauttiAineisto Aineisto()
        {
            string P(string x) => Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "paketti", x);
            return AstronauttiAineisto.Lue(MiniJson.Jasenna(File.ReadAllText(P("satelliitti-data.json"))),
                MiniJson.Jasenna(File.ReadAllText(P("astronaut-kysymykset.json"))));
        }

        static Havaintokohde K(string t, double lat, double lon, int kuvia = 1)
        {
            var k = new Havaintokohde { Tunnus = t, Nimi = t, Lat = lat, Lon = lon };
            for (int i = 0; i < kuvia; i++) k.Havainnot.Add(new Havainto { Id = t + i, Kuva = t + i + ".jpg" });
            return k;
        }

        static double Pituus(IReadOnlyList<Havaintokohde> k, int[] r)
        {
            double s = 0;
            for (int i = 0; i < r.Length; i++)
            {
                var a = k[r[i]]; var b = k[r[(i + 1) % r.Length]];
                s += AstronauttiKierros.Etaisyys(a.Lat, a.Lon, b.Lat, b.Lon);
            }
            return s;
        }

        [Testi] static void KierrosKayKaikissaKerranLansiAlkuunMyotapaivaan()
        {
            var a = Aineisto();
            var r = AstronauttiKierros.Laske(a.Kohteet);
            int kelpaa = a.Kohteet.Count(k => !double.IsNaN(k.Lat) && k.Havainnot.Count > 0);
            Oleta.Sama(kelpaa, r.Length, "jokainen kuvallinen kohde");
            Oleta.Sama(r.Length, r.Distinct().Count(), "kerran");
            double lansi = a.Kohteet.Where(k => !double.IsNaN(k.Lon) && k.Havainnot.Count > 0).Min(k => k.Lon);
            Oleta.Sama(lansi, a.Kohteet[r[0]].Lon, "alku läntisin");
            Oleta.Tosi(a.Kohteet[r[1]].Lat >= a.Kohteet[r[r.Length - 1]].Lat, "myötäpäivään: pohjoisempi naapuri ensin");
            Oleta.Tosi(r.SequenceEqual(AstronauttiKierros.Laske(a.Kohteet)), "deterministinen");
        }

        [Testi] static void KierrosOnLyhyempiKuinLahinNaapuri()
        {
            // Neliön kulmat ristiin järjestettynä: 2-opt suoristaa, pituus = piiri.
            var k = new List<Havaintokohde> { K("a", 0, 0), K("b", 10, 10), K("c", 0, 10), K("d", 10, 0) };
            var r = AstronauttiKierros.Laske(k);
            double piiri = 4 * AstronauttiKierros.Etaisyys(0, 0, 0, 10);
            Oleta.Tosi(Pituus(k, r) <= piiri * 1.02, $"kierros {Pituus(k, r):0.0000} ≤ piiri {piiri:0.0000}");
            // Oikea aineisto: keskimääräinen askel lyhyt (naapuri on kartalla vieressä), eikä yksikään hyppy ole puolta maapalloa.
            var a = Aineisto();
            var ra = AstronauttiKierros.Laske(a.Kohteet);
            double km = Pituus(a.Kohteet, ra) * 6371 / ra.Length;
            Oleta.Tosi(km < 2500, $"keskimääräinen askel {km:0} km");
            for (int i = 0; i < ra.Length; i++)
            {
                var x = a.Kohteet[ra[i]]; var y = a.Kohteet[ra[(i + 1) % ra.Length]];
                Oleta.Tosi(AstronauttiKierros.Etaisyys(x.Lat, x.Lon, y.Lat, y.Lon) * 6371 < 12000, $"{x.Tunnus}→{y.Tunnus}");
            }
        }

        [Testi] static void NaapuriKiertaaYmpariJaPalaa()
        {
            var r = new[] { 4, 2, 7 };
            Oleta.Sama(2, AstronauttiKierros.Naapuri(r, 4, 1));
            Oleta.Sama(7, AstronauttiKierros.Naapuri(r, 4, -1), "alusta taaksepäin loppuun");
            Oleta.Sama(4, AstronauttiKierros.Naapuri(r, 7, 1), "lopusta eteenpäin alkuun");
            Oleta.Sama(-1, AstronauttiKierros.Naapuri(r, 5, 1), "ei kierroksella");
            // Edestakaisin samaan kohteeseen.
            Oleta.Sama(4, AstronauttiKierros.Naapuri(r, AstronauttiKierros.Naapuri(r, 4, 1), -1));
        }

        sealed class ValeAstroNakyma : IAstronautinNakyma
        {
            public readonly List<string> Loki = new List<string>();
            public void Avaus(AvauksenVaihe v) { }
            public void Kohteet(IReadOnlyList<Havaintokohde> k) { }
            public void Nimet(bool n) { }
            public void Pilvet(double p, double k) { }
            public void Sumu(double p) { }
            public void Tahdet(double p) { }
            public void Iss(Aikajana.LatLon p, IReadOnlyList<Aikajana.LatLon> k) { }
            public void Kuva(Havaintokohde k, int i) => Loki.Add($"kuva {k.Tunnus} {i}");
            public void KuvaPois() => Loki.Add("kuva pois");
            public void Pois() { }
        }

        static (AstronauttiLinssi l, ValeYmparisto y, ValeAstroNakyma n, AstronauttiAineisto a) Auki()
        {
            var a = Aineisto();
            var y = new ValeYmparisto();
            var n = new ValeAstroNakyma();
            var l = new AstronauttiLinssi(a, n);
            l.Avaa(y);
            y.Vale.Tilat[AstronauttiLinssi.Kerros] = KerrosTila.Valmis;
            double loppu = y.Kello + 2.2;
            while (y.Kello < loppu) { y.Kello += 1 / 60.0; l.Paivita(); }
            return (l, y, n, a);
        }

        [Testi] static void KuvaKeskittaaPallonKohteeseen()
        {
            var (l, y, n, a) = Auki();
            var k = a.Kohteet.First(x => x.Havainnot.Count > 0 && !double.IsNaN(x.Lat));
            l.Napauta(k.Tunnus);
            Oleta.Sama($"kuva {k.Tunnus} {k.OletusIndeksi}", n.Loki.Last());
            Oleta.Sama(k.Lat, y.Ajo.Value.Lat, "kamera kohteen leveydelle");
            Oleta.Sama(k.Lon, y.Ajo.Value.Lon, "ja pituudelle");
            Oleta.Tosi(y.Ajo.Value.Korkeus <= y.KokoPallonKorkeus * AstronauttiLinssi.KuvanKorkeus + 1, "enintään lepokorkeus");
            Oleta.Sama(AstronauttiLinssi.KuvaanAjoS, y.AjonKesto, "liuku");
        }

        [Testi] static void NaapuriAvaaViereisenJaGalleriaJatkaa()
        {
            var (l, y, n, a) = Auki();
            var r = AstronauttiKierros.Laske(a.Kohteet);
            var eka = a.Kohteet[r[0]];
            l.Napauta(eka.Tunnus);
            var seur = l.KatsoNaapuri(1);
            Oleta.Sama(a.Kohteet[r[1]].Tunnus, seur.Tunnus, "katso ei avaa");
            Oleta.Sama(eka, l.AvoinKuva);
            l.Naapuri(1);
            Oleta.Sama(seur, l.AvoinKuva);
            Oleta.Sama($"kuva {seur.Tunnus} {seur.OletusIndeksi}", n.Loki.Last(), "alanappi: oletuskuva");
            Oleta.Sama(seur.Lat, y.Ajo.Value.Lat, "kamera liukuu naapuriin");
            l.Naapuri(-1, galleria: true);
            Oleta.Sama(eka, l.AvoinKuva, "takaisin samaa tietä");
            Oleta.Sama($"kuva {eka.Tunnus} {eka.Havainnot.Count - 1}", n.Loki.Last(), "galleria taaksepäin: viimeinen kuva");
            l.Naapuri(-1, galleria: true);
            var viim = a.Kohteet[r[r.Length - 1]];
            Oleta.Sama($"kuva {viim.Tunnus} {viim.Havainnot.Count - 1}", n.Loki.Last(), "alusta ympäri loppuun");
            l.SuljeKuva();
            Oleta.Sama(null, l.Naapuri(1), "kuva kiinni: ei naapuria");
        }
    }
}
