// Kukkaron palaute (Peli/Kukkaro.cs): monen päivän matkan kulut yhtenä päivityksenä, matkakulun tunnistus.
namespace Matkakirja.Peli.Testit
{
    public static class KukkaroTestit
    {
        [Testi] static void YksiYoPitaaOmanRivinsa()
        {
            var k = new Kulukertyma();
            Oleta.Tosi(k.Tyhja && k.Syy() == null, "tyhjä");
            k.Yo(10, 0, "Yö matkalla: ruoka £10");
            k.Kerry(-10);
            Oleta.Sama("Yö matkalla: ruoka £10", k.Syy());
            Oleta.Sama(-10, k.Muutos);
        }

        [Testi] static void MontaYotaYhdeksiRiviksi()
        {
            // Omistaja 11.10.2026: monen päivän matkalla kulut lasketaan yhteen yhdeksi päivitykseksi.
            var k = new Kulukertyma();
            k.Yo(10, 0, "Yö matkalla: ruoka £10"); k.Kerry(-10);
            k.Yo(12, 0, "Yö matkalla: ruoka £12"); k.Kerry(-12);
            k.Yo(8, 20, "Yö kaupungissa Pariisi: ruoka £8, majoitus £20"); k.Kerry(-28);
            Oleta.Sama("Matkakulut, 3 yötä: ruoka £30, majoitus £20", k.Syy());
            Oleta.Sama(-50, k.Muutos);
            k.Tyhjenna();
            Oleta.Tosi(k.Tyhja && k.Syy() == null, "tyhjennys");
            k.Yo(9, 0, "a"); k.Yo(9, 0, "b");
            Oleta.Sama("Matkakulut, 2 yötä: ruoka £18", k.Syy(), "ilman majoitusta");
        }

        [Testi] static void MatkakuluTunnistetaanJaNakyyViisiSekuntia()
        {
            Oleta.Tosi(Kulukertyma.OnMatkakulu("Yö kaupungissa Ateena: ruoka £10, majoitus £25"));
            Oleta.Tosi(Kulukertyma.OnMatkakulu("Matkakulut, 3 yötä: ruoka £30"));
            Oleta.Tosi(!Kulukertyma.OnMatkakulu("Bussimatka −5 puntaa"));
            Oleta.Tosi(!Kulukertyma.OnMatkakulu(null));
            Oleta.Sama(5000, Kulukertyma.MatkakulunNakyvyysMs);
        }
    }
}
