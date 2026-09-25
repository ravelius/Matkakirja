// Löydös 80 / esilatauspolitiikan kohta 1: buildin laattapaketti (Kartta/Laattapaketti.cs).
// Oikea paketti (tyokalut/laattapaketti.mjs): LAATTAPAKETTI=<polku> ./kaanna.sh Laattapaketti
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class LaattapakettiTestit
    {
        const string Pohja = "julisteet/pallo/laatat/2026-09-25-pohja-20260925/";
        const string Maasto = "julisteet/maasto/2026-09-24-maailma/";

        static byte[] Tavut(string t) => Encoding.UTF8.GetBytes(t);

        static Laattapaketti Koe(out MemoryStream virta)
        {
            var sarjat = new List<(string, string)> { (Pohja, "pohja"), (Maasto, "maasto") };
            var rivit = new List<Laattapaketti.Rivi>
            {
                new Laattapaketti.Rivi(0, "1/0/1.jpg", Tavut("pohja 1/0/1")),
                new Laattapaketti.Rivi(0, "0/0/0.jpg", Tavut("pohja 0")),
                new Laattapaketti.Rivi(1, "layer.json", Tavut("{\"tiles\":[]}")),
                new Laattapaketti.Rivi(1, "0/1/0.terrain__v-2026-09-24-maailma", Tavut("maasto 0/1/0")),
                new Laattapaketti.Rivi(1, "tyhja.terrain", new byte[0]),
            };
            virta = new MemoryStream();
            Laattapaketti.Kirjoita(virta, sarjat, rivit);
            return Laattapaketti.Lue(new MemoryStream(virta.ToArray()));
        }

        [Testi]
        static void KirjoitusJaLukuSamat()
        {
            var p = Koe(out _);
            Oleta.Sama(5, p.Laattoja);
            Oleta.Sama(2, p.Sarjat.Count);
            Oleta.Sama("pohja", p.Sarjat[0].Nimi);
            Oleta.Sama(Maasto, p.Sarjat[1].Etuliite);
            Oleta.Sama(2, p.Sarjat[0].Laattoja);
            Oleta.Sama(3, p.Sarjat[1].Laattoja);
            Oleta.Sama("pohja 1/0/1", Encoding.UTF8.GetString(p.Hae(Pohja + "1/0/1.jpg")));
            Oleta.Sama("pohja 0", Encoding.UTF8.GetString(p.Hae(Pohja + "0/0/0.jpg")));
            Oleta.Sama("maasto 0/1/0", Encoding.UTF8.GetString(p.Hae(Maasto + "0/1/0.terrain__v-2026-09-24-maailma")));
            Oleta.Sama(0, p.Hae(Maasto + "tyhja.terrain").Length);
            Oleta.Sama(4, p.Osumia);
        }

        [Testi]
        static void PuuttuvaEiOsu()
        {
            var p = Koe(out _);
            Oleta.Tosi(p.Hae(Pohja + "2/0/0.jpg") == null);
            Oleta.Tosi(!p.Onko(Pohja + "2/0/0.jpg"));
            Oleta.Tosi(!p.Onko(null));
            // Toisen sarjan (uusi pohja) sama laatta ei osu.
            Oleta.Tosi(!p.Onko("julisteet/pallo/laatat/2026-10-01-pohja/0/0/0.jpg"));
            Oleta.Sama(0, p.Osumia);
        }

        [Testi]
        static void MaastonKyselyAvaimeksi()
        {
            // Cesium pyytää maastolaatan tiles-mallin ?v=…:llä ja lisää extensions=…; avain on sama kuin levyllä.
            string pyynto = Maasto + "0/1/0.terrain?v=2026-09-24-maailma&extensions=octvertexnormals";
            Oleta.Sama(Maasto + "0/1/0.terrain__v-2026-09-24-maailma", Laattapaketti.Avain(pyynto));
            Oleta.Sama(Maasto + "0/1/0.terrain", Laattapaketti.Avain(Maasto + "0/1/0.terrain?extensions=octvertexnormals"));
            Oleta.Sama(Pohja + "0/0/0.jpg", Laattapaketti.Avain(Pohja + "0/0/0.jpg"));
            Oleta.Sama("a/b__v-x_y-z_w", Laattapaketti.Avain("a/b?v=x/y=z&w"));
            var p = Koe(out _);
            Oleta.Tosi(p.Onko(Laattapaketti.Avain(pyynto)));
        }

        [Testi]
        static void RajausOhittaaVanhanSarjan()
        {
            var p = Koe(out _);
            var pois = p.Rajaa(new HashSet<string>(StringComparer.Ordinal) { Maasto, "julisteet/pallo/laatat/2026-10-01-pohja/" });
            Oleta.Sama(1, pois.Count);
            Oleta.Tosi(pois[0].StartsWith("pohja"), pois[0]);
            Oleta.Tosi(!p.Sarjat[0].Kaytossa && p.Sarjat[1].Kaytossa);
            Oleta.Tosi(p.Hae(Pohja + "0/0/0.jpg") == null, "pois käytöstä olevan sarjan laatta");
            Oleta.Tosi(!p.Onko(Pohja + "0/0/0.jpg"));
            Oleta.Tosi(p.Onko(Maasto + "layer.json"));
        }

        [Testi]
        static void RikkinainenHylataan()
        {
            Koe(out var virta);
            var ok = virta.ToArray();
            var taika = (byte[])ok.Clone();
            taika[0] = (byte)'X';
            Oleta.Tosi(Heittaa(taika), "taika");
            var katkennut = new byte[ok.Length - 3];
            Array.Copy(ok, katkennut, katkennut.Length);
            Oleta.Tosi(Heittaa(katkennut), "data katkennut");
            var lyhyt = new byte[40];
            Array.Copy(ok, lyhyt, lyhyt.Length);
            Oleta.Tosi(Heittaa(lyhyt), "hakemisto katkennut");
            Oleta.Tosi(Laattapaketti.Avaa("/ei/ole/laattapaketti.bin", out var virhe) == null && virhe != null);
        }

        static bool Heittaa(byte[] b)
        {
            try { Laattapaketti.Lue(new MemoryStream(b)); return false; }
            catch (Exception) { return true; }
        }

        [Testi]
        static void LaattojenMaarat()
        {
            int m = 0, g = 0;
            foreach (var _ in Laattapaketti.Mercator(0, 5)) m++;
            foreach (var _ in Laattapaketti.Maantieteellinen(0, 5)) g++;
            Oleta.Sama(1365, m);
            Oleta.Sama(2730, g);
            Oleta.Sama("p/3/5/2.jpg", Laattapaketti.Tayta("p/{z}/{x}/{reverseY}.jpg", 3, 5, 2));
        }

        /// <summary>Oikea paketti (tyokalut/laattapaketti.mjs): hakemisto, sarjat, JPEGit ehjiä, haku nopea.</summary>
        [Testi]
        static void OikeaPaketti()
        {
            string polku = Environment.GetEnvironmentVariable("LAATTAPAKETTI");
            if (string.IsNullOrEmpty(polku)) { Console.WriteLine("      (LAATTAPAKETTI ei asetettu, ohitetaan)"); return; }
            var kello = System.Diagnostics.Stopwatch.StartNew();
            using var p = Laattapaketti.Avaa(polku, out var virhe);
            Oleta.Tosi(p != null, virhe);
            double avaus = kello.Elapsed.TotalMilliseconds;
            var nimet = new List<string>();
            foreach (var s in p.Sarjat) nimet.Add(s.Nimi);
            Oleta.Sama("pohja maasto bmng-bathy vektorit napakalotit", string.Join(" ", nimet));
            Oleta.Sama(1365, p.Sarjat[0].Laattoja);
            Oleta.Tosi(p.Onko(p.Sarjat[1].Etuliite + "layer.json"), "layer.json");
            Oleta.Tosi(p.Onko(p.Sarjat[1].Etuliite + "5/63/31.terrain__v-2026-09-24-maailma"), "maasto z5");
            Oleta.Tosi(p.Onko(p.Sarjat[3].Etuliite + "luettelo.json"), "vektorien luettelo");
            kello.Restart();
            int jpg = 0;
            long tavut = 0;
            foreach (var (z, x, y) in Laattapaketti.Mercator(0, 5))
            {
                var b = p.Hae(p.Sarjat[0].Etuliite + z + "/" + x + "/" + y + ".jpg");
                Oleta.Tosi(b != null && b.Length > 4 && b[0] == 0xFF && b[1] == 0xD8, $"pohja {z}/{x}/{y}");
                bool loppu = false;
                for (int i = b.Length - 2; i >= Math.Max(2, b.Length - 18) && !loppu; i--) loppu = b[i] == 0xFF && b[i + 1] == 0xD9;
                Oleta.Tosi(loppu, $"pohjan loppu {z}/{x}/{y}");
                jpg++;
                tavut += b.Length;
            }
            double haku = kello.Elapsed.TotalMilliseconds;
            Console.WriteLine($"      {p.Laattoja} laattaa, {new FileInfo(polku).Length / 1048576.0:0.00} Mt, avaus {avaus:0} ms, " +
                              $"{jpg} pohjalaattaa ({tavut / 1048576.0:0.0} Mt) {haku:0} ms");
        }
    }
}
