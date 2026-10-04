// Cupolan kohteen valinta (omistaja 4.10.2026): alus siirtyy niin, että nykyinen katse osuu kohteeseen ja ilmansuunta säilyy.
using System;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class AlusSiirtoTestit
    {
        static double Km(LatLon a, double lat, double lon) => Ylilennot.MaaEtaisyysKm(a.Lat, a.Lon, lat, lon);

        [Testi] static void NollattuOnTodellinenRata()
        {
            var s = new AlusSiirto();
            var p = new LatLon(10, 20);
            Oleta.Sama(p, s.Paikka(p, 5));
            Oleta.Tosi(!s.Siirretty);
        }

        [Testi] static void KatseOsuuKohteeseenSamallaIlmansuunnalla()
        {
            // Rooma, katse 40° alas ja 30° radasta oikealle 420 km:stä; nykyinen katseen ilmansuunta 75°.
            var h = new IssHetki(new LatLon(30, -10), 420_000, 50);
            foreach (var (alas, suunta) in new[] { (40.0, 30.0), (55.0, 0.0), (70.0, -90.0), (90.0, 0.0) })
            {
                var nyt = IssKuvakulma.Ikkuna(h, alas, suunta);
                double kaari = IssKuvakulma.Kaari(h.Paikka.Lat, h.Paikka.Lon, nyt.Lat, nyt.Lon);
                var uusi = AlusSiirto.Kohteeseen(41.9, 12.5, kaari, suunta, nyt.Suuntima, h.Suuntima);
                var perilla = IssKuvakulma.Ikkuna(new IssHetki(uusi.Paikka, 420_000, uusi.Suunta), alas, suunta);
                Oleta.Tosi(Km(new LatLon(perilla.Lat, perilla.Lon), 41.9, 12.5) < 0.5, $"keskellä {alas}/{suunta}");
                Oleta.Tosi(Math.Abs(perilla.Kallistus - nyt.Kallistus) < 1e-6, $"kallistus {alas}");
                double ero = Math.Abs(((perilla.Suuntima - nyt.Suuntima) % 360 + 540) % 360 - 180);
                Oleta.Tosi(alas >= 90 || ero < 1e-3, $"ilmansuunta {alas}/{suunta}: {perilla.Suuntima} vs {nyt.Suuntima}");
            }
        }

        [Testi] static void KiertoVieAlapisteenJaSuunnanJaLiukuu()
        {
            var s = new AlusSiirto();
            var todellinen = new LatLon(-20, 100);
            s.Aseta(todellinen, 60, new LatLon(45, 10), 120, 0, 1.5);
            Oleta.Tosi(s.Siirtyy(0.5) && !s.Siirtyy(1.6));
            var a = s.Paikka(todellinen, 0);
            Oleta.Tosi(Km(a, -20, 100) < 0.01, "alussa todellinen");
            var b = s.Paikka(todellinen, 2);
            Oleta.Tosi(Km(b, 45, 10) < 0.01, "perillä kohteessa");
            // Rata jatkuu samaan suuntaan: todellinen piste eteenpäin 60°:n suunnassa → perillä 120°:n suunnassa.
            IssKuvakulma.Kohde(-20, 100, 60, 1, out double la, out double lo, out _);
            var c = s.Paikka(new LatLon(la, lo), 2);
            Oleta.Tosi(Math.Abs(IssKuvakulma.Suunta(45, 10, c.Lat, c.Lon) - 120) < 0.01, "suunta");
            var m = s.Paikka(todellinen, 0.75);
            Oleta.Tosi(Km(m, -20, 100) > 100 && Km(m, 45, 10) > 100, "välissä");
        }
    }
}
