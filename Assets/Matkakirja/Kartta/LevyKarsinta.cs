using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Matkakirja
{
    /// <summary>
    /// Levysiivouksen puhdas osa (ei UnityEngineä; Peli-testit/Testit/LevyKarsintaTestit.cs). Laskee kansioiden ja
    /// laattavälimuistin yhteiskoon ja poistaa kansioista vanhimmasta (viimeisin käyttö tai kirjoitus), kunnes summa on
    /// 90 %:ssa rajasta. Laattoja ei poisteta (Laattapalvelin karsii ne itse). Palauttaa kuvauksen lokiin.
    /// </summary>
    public static class LevyKarsinta
    {
        public static string Aja(string juuri, string[] kansiot, string laattaKansio, long raja)
        {
            var tiedostot = new List<FileInfo>();
            foreach (var k in kansiot)
            {
                var d = new DirectoryInfo(Path.Combine(juuri, k));
                if (d.Exists) tiedostot.AddRange(d.EnumerateFiles("*", SearchOption.AllDirectories));
            }
            long omat = tiedostot.Sum(f => f.Length);
            long laatat = 0;
            var ld = new DirectoryInfo(laattaKansio);
            if (ld.Exists) laatat = ld.EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length);
            long yhteensa = omat + laatat;
            string koot = string.Join(", ", kansiot.Select(k => $"{k} {Mt(Koko(Path.Combine(juuri, k)))}"));
            if (yhteensa <= raja)
                return $"{Mt(yhteensa)} Mt / {Mt(raja)} Mt ({koot}, laatat {Mt(laatat)}), ei siivottavaa";
            long tavoite = raja * 9 / 10;
            int poistettu = 0;
            long vapautettu = 0;
            foreach (var f in tiedostot.OrderBy(Kaytetty))
            {
                if (yhteensa <= tavoite) break;
                // Kesken olevat lataukset (.esi, .esilataus, .lataus) ja sisällön versiotiedosto jäävät.
                if (f.Name == "viimeisin.txt" || f.Extension == ".esi" || f.Extension == ".esilataus" || f.Extension == ".lataus") continue;
                try { long n = f.Length; f.Delete(); yhteensa -= n; vapautettu += n; poistettu++; }
                catch (IOException) { }
                catch (UnauthorizedAccessException) { }
            }
            return $"siivottu {poistettu} tiedostoa ({Mt(vapautettu)} Mt), nyt {Mt(yhteensa)} Mt / {Mt(raja)} Mt ({koot}, laatat {Mt(laatat)})";
        }

        static DateTime Kaytetty(FileInfo f) => f.LastAccessTimeUtc > f.LastWriteTimeUtc ? f.LastAccessTimeUtc : f.LastWriteTimeUtc;

        static long Koko(string kansio)
        {
            var d = new DirectoryInfo(kansio);
            return d.Exists ? d.EnumerateFiles("*", SearchOption.AllDirectories).Sum(f => f.Length) : 0;
        }

        static long Mt(long tavut) => tavut / 1048576;
    }
}
