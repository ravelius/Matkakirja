// Kukkaron palaute (Peli/Kukkaro.cs): monen päivän matkan kulut yhtenä päivityksenä, matkakulun tunnistus.
using System.Linq;

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

        [Testi] static void LippuJaPaivakuluYhdeksiLeimaksiEiTilarivilla()
        {
            // Omistaja 11.10.2026 ("ettei tule tuplakortteja"): bussilippu näkyi leimassa JA tilarivillä, ja
            // samassa tallennuksessa päiväkulu jäi pois. Nyt yksi leima, eikä rahariviä tilarivillä.
            var tapahtumat = new[] { "Bussimatka −£5", "Saavuit: Pariisi" };
            var leima = Kulukertyma.Yhdista(null, tapahtumat.Where(r => Kulukertyma.OnRaharivi(r)), "Yö kaupungissa Pariisi: ruoka £10, majoitus £25");
            Oleta.Sama("Bussimatka −£5 · Yö kaupungissa Pariisi: ruoka £10, majoitus £25", leima);
            Oleta.Tosi(Kulukertyma.OnMatkakulu(leima), "5 s");
            Oleta.Tosi(Kulukertyma.OnMatkakulu("Bussimatka −£5") && Kulukertyma.OnMatkakulu("Laivamatka −£40"), "lippu yksinään 5 s");
            Oleta.Sama("Saavuit: Pariisi", Kulukertyma.IlmanRaharivia(tapahtumat), "tilarivillä ei punta-riviä");
            Oleta.Sama(null, Kulukertyma.IlmanRaharivia(new[] { "Bussimatka −£5" }), "pelkkä lippu: ei tilariviä");
            // Pelistreak on oma kuplansa: sen rivi ei mene leimaan.
            Oleta.Tosi(!Kulukertyma.OnRaharivi("Putki 3 päivää +£15", "Putki 3 päivää +£15"));
            // Sama rivi kahdesta lähteestä (tapahtumat + kysymyksen lisät) vain kerran.
            Oleta.Sama("Löytöpalkkio +£50", Kulukertyma.Yhdista(null, new[] { "Löytöpalkkio +£50", "Löytöpalkkio +£50" }, null));
            Oleta.Sama("Vihje · Bussimatka −£5", Kulukertyma.Yhdista("Vihje", new[] { "Bussimatka −£5" }, null));
        }

        [Testi] static void ReitinLaivalippuJaKulutYhteenvetoonKerran()
        {
            var k = new Kulukertyma();
            k.Yo(10, 0, "Yö matkalla: ruoka £10"); k.Kerry(-50); k.Rivi("Laivamatka −£40"); k.Rivi("Laivamatka −£40");
            k.Yo(10, 0, "Yö matkalla: ruoka £10"); k.Kerry(-10);
            Oleta.Sama(1, k.Rivit.Count, "lippu kerran");
            Oleta.Sama("Laivamatka −£40 · Matkakulut, 2 yötä: ruoka £20", Kulukertyma.Yhdista(null, k.Rivit, k.Syy()));
            k.Tyhjenna();
            Oleta.Tosi(k.Tyhja, "purun jälkeen tyhjä: seuraava tallennus ei toista leimaa");
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
