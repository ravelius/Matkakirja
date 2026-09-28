// MAAN NIMINEN KAUPUNKI (Pelikoodarin Geysir-löydös 28.9.2026, web #3541): nimivertailu vain datan omalla paikalla
// ja vain, kun kaupunki ei ole maansa niminen; muuten pelkkä 12 km etäisyys (NostoSaannot.KaupunginSisainen).
using System.Collections.Generic;
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class MaanNiminenTestit
    {
        [Testi]
        static void MaanNiminenJaVertailuPaikka()
        {
            Oleta.Tosi(NostoSaannot.MaanNiminen("Islanti", "Islanti"), "Islanti");
            Oleta.Tosi(NostoSaannot.MaanNiminen(" Luxemburg", "luxemburg "), "kirjainkoko ja välit");
            Oleta.Tosi(!NostoSaannot.MaanNiminen("Reykjavík", "Islanti"), "eri nimi");
            Oleta.Tosi(!NostoSaannot.MaanNiminen("Pariisi", null), "maa tuntematon");
            Oleta.Sama("Olympia", NostoSaannot.VertailuPaikka("Olympia", "data"), "datan oma paikka");
            Oleta.Tosi(NostoSaannot.VertailuPaikka("Islanti", "maa") == null, "maan nimellä täytetty ei vertailuun");
            Oleta.Tosi(NostoSaannot.VertailuPaikka("Pariisi", "kaupunki") == null, "kaupunkiAvaimella täytetty ei vertailuun");
            Oleta.Sama("Rooma", NostoSaannot.VertailuPaikka("Rooma", null), "vanha paketti ilman kenttää");
        }

        [Testi]
        static void MaanNiminenKaupunkiVainEtaisyys()
        {
            // Geysir (64,31 N, −20,30 E) ~ 90 km Reykjavíkista; paikka "Islanti" (datan oma, pahimmassa tapauksessa).
            var keskukset = new List<NostoSaannot.Keskus>
            {
                new NostoSaannot.Keskus("Islanti", 64.146, -21.94, nimiTesti: false),
            };
            var syy = NostoSaannot.KaupunginSisainen("Islanti", 64.31, -20.30, false, keskukset, out var k);
            Oleta.Tosi(syy == NostoSaannot.Syy.Nakyy, $"Geysir näkyy (oli KaupunginNimi), saatu {syy}");
            // Sama kaupunki nimitestillä (ennen): piilossa nimen takia.
            keskukset[0] = new NostoSaannot.Keskus("Islanti", 64.146, -21.94);
            syy = NostoSaannot.KaupunginSisainen("Islanti", 64.31, -20.30, false, keskukset, out k);
            Oleta.Tosi(syy == NostoSaannot.Syy.KaupunginNimi, "nimitestillä piilossa (vanha käytös)");
            // Etäisyys pätee edelleen: 5 km päässä oleva on kaupungin sisällä.
            keskukset[0] = new NostoSaannot.Keskus("Islanti", 64.146, -21.94, nimiTesti: false);
            syy = NostoSaannot.KaupunginSisainen(null, 64.17, -21.90, false, keskukset, out k);
            Oleta.Tosi(syy == NostoSaannot.Syy.KaupunginSade, $"12 km:n sisällä piilossa, saatu {syy}");
        }
    }
}
