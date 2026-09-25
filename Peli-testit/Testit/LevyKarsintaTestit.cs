// Levysiivouksen puhdas osa (Assets/Matkakirja/Kartta/LevyKarsinta.cs; Esilataaja erä 4, ESILATAUSPOLITIIKKA 2 Gt).
using System;
using System.IO;

namespace Matkakirja.Peli.Testit
{
    static class LevyKarsintaTestit
    {
        static readonly string[] Kansiot = { "kuvat", "aani", "sisalto" };

        static string Juuri()
        {
            var d = Path.Combine(Path.GetTempPath(), "levykarsinta-" + Guid.NewGuid().ToString("N"));
            Directory.CreateDirectory(d);
            return d;
        }

        static string Tee(string juuri, string polku, int tavuja, int ikaMin)
        {
            var p = Path.Combine(juuri, polku);
            Directory.CreateDirectory(Path.GetDirectoryName(p));
            File.WriteAllBytes(p, new byte[tavuja]);
            var t = DateTime.UtcNow.AddMinutes(-ikaMin);
            File.SetLastWriteTimeUtc(p, t);
            File.SetLastAccessTimeUtc(p, t);
            return p;
        }

        [Testi] static void AlleRajanEiPoisteta()
        {
            var j = Juuri();
            var a = Tee(j, "kuvat/a.jpg", 1000, 10);
            var tulos = LevyKarsinta.Aja(j, Kansiot, Path.Combine(j, "laatat"), 5000);
            Oleta.Tosi(File.Exists(a), "kuva jää");
            Oleta.Tosi(tulos.Contains("ei siivottavaa"), tulos);
            Directory.Delete(j, true);
        }

        [Testi] static void YliRajanPoistetaanVanhinKunnes90Prosenttia()
        {
            var j = Juuri();
            var vanha = Tee(j, "kuvat/vanha.jpg", 3000, 300);
            var keski = Tee(j, "aani/keski.mp3", 3000, 200);
            var uusi = Tee(j, "sisalto/2/uusi.json", 3000, 1);
            // 9000 t, raja 7000 → tavoite 6300: vanhin pois (6000 ≤ 6300), muut jäävät.
            LevyKarsinta.Aja(j, Kansiot, Path.Combine(j, "laatat"), 7000);
            Oleta.Tosi(!File.Exists(vanha), "vanhin poistettu");
            Oleta.Tosi(File.Exists(keski) && File.Exists(uusi), "uudemmat jäävät");
            Directory.Delete(j, true);
        }

        [Testi] static void LaatatLasketaanMuttaEiPoisteta()
        {
            var j = Juuri();
            var laatta = Tee(j, "laatat/z9/1.png", 5000, 1000);
            var kuva = Tee(j, "kuvat/a.jpg", 3000, 5);
            LevyKarsinta.Aja(j, Kansiot, Path.Combine(j, "laatat"), 6000);
            Oleta.Tosi(File.Exists(laatta), "laattaa ei poisteta täältä");
            Oleta.Tosi(!File.Exists(kuva), "kuva poistuu, koska laatat täyttävät rajan");
            Directory.Delete(j, true);
        }

        [Testi] static void KeskenOlevatJaVersiotiedostoJaavat()
        {
            var j = Juuri();
            var kesken = Tee(j, "aani/x.mp3.esilataus", 4000, 500);
            var versio = Tee(j, "sisalto/viimeisin.txt", 10, 500);
            var paketti = Tee(j, "sisalto/tiedostot/ab12", 100, 600);
            var muu = Tee(j, "kuvat/b.jpg", 4000, 400);
            LevyKarsinta.Aja(j, Kansiot, Path.Combine(j, "laatat"), 5000);
            Oleta.Tosi(File.Exists(kesken) && File.Exists(versio), "kesken oleva lataus ja viimeisin.txt jäävät");
            Oleta.Tosi(File.Exists(paketti), "paketin varasto sisalto/tiedostot jää (Siirtoseppä siivoaa)");
            Oleta.Tosi(!File.Exists(muu), "muu vanha pois");
            Directory.Delete(j, true);
        }
    }
}
