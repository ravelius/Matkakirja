// ISS-kameran valotusmalli julisteen teknisiin tietoihin: päivä 400 mm nopea aika ja f/8, 50 mm lyhyempi aika ISO 100:lla,
// yöllä aukko auki ja ISO ≤ 6400, pelaajan kompensaatio nostaa ISO:a tai aikaa.
using System;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraValotusTestit
    {
        [Testi]
        static void PaivaYoJaKompensaatio()
        {
            var p400 = Valotus.Laske(400, 420, 53);
            Oleta.Sama(8.0, p400.aukko); Oleta.Tosi(p400.aika <= 1.0 / 1000 && p400.iso >= 100 && p400.iso <= 400, $"{p400}");
            var p50 = Valotus.Laske(50, 1000, 50);
            Oleta.Tosi(p50.aika <= 1.0 / 1000 && p50.iso == 100, $"{p50}");
            var yo = Valotus.Laske(50, 1000, -15);
            Oleta.Tosi(yo.aukko <= 4 && yo.iso <= 6400 && yo.aika >= 1.0 / 125, $"{yo}");
            var kirkas = Valotus.Laske(400, 420, 53, 1);
            Oleta.Tosi(kirkas.iso > p400.iso || kirkas.aika > p400.aika, $"{kirkas}");
            Oleta.Sama("1/1000 s", Valotus.AikaTeksti(1.0 / 1000)); Oleta.Sama("f/5.6", Valotus.AukkoTeksti(5.6)); Oleta.Sama("f/8", Valotus.AukkoTeksti(8));
            Console.WriteLine($"  400 mm päivä {Valotus.AukkoTeksti(p400.aukko)} {Valotus.AikaTeksti(p400.aika)} ISO {p400.iso}; 50 mm {Valotus.AukkoTeksti(p50.aukko)} {Valotus.AikaTeksti(p50.aika)} ISO {p50.iso}; yö {Valotus.AukkoTeksti(yo.aukko)} {Valotus.AikaTeksti(yo.aika)} ISO {yo.iso}");
        }
    }
}
