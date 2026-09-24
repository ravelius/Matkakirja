// Radiomastojen luvut ja käyrät (radiouudistus build 12, suunnitelma luvut 4–7).
using System;
using System.Linq;
using Matkakirja.Linssit.Radio;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public static class MastoTestit
    {
        static void Lahella(double odotettu, double saatu, double tol, string viesti) =>
            Oleta.Tosi(Math.Abs(odotettu - saatu) <= tol, $"{viesti}: odotettu {odotettu}, saatu {saatu}");

        [Testi] static void KokoAsukasluvusta()
        {
            Oleta.Sama(MastoKoko.Iso, Mastot.Koko(8_900_000), "Lontoo");
            Oleta.Sama(MastoKoko.Iso, Mastot.Koko(2_000_000), "raja 2 milj.");
            Oleta.Sama(MastoKoko.Iso, Mastot.Koko(2_100_000), "Pariisi");
            Oleta.Sama(MastoKoko.Keski, Mastot.Koko(1_999_999), "alle 2 milj.");
            Oleta.Sama(MastoKoko.Keski, Mastot.Koko(500_000), "raja 0,5 milj.");
            Oleta.Sama(MastoKoko.Pieni, Mastot.Koko(130_000), "Luxemburg");
            Oleta.Sama(MastoKoko.Pieni, Mastot.Koko(null), "puuttuva (Sahara)");
            Oleta.Sama(MastoKoko.Pieni, Mastot.Koko(36_749_906, alue: true), "Angola: valtion luku");
        }

        [Testi] static void AsukkaatLuetaanKaupungeista()
        {
            var k = MiniJson.Jasenna("{\"alkiot\":[{\"id\":\"lontoo\",\"nimi\":\"Lontoo\",\"maa\":\"GBR\",\"lat\":51.5,\"lon\":-0.1,\"asukkaat\":8900000}," +
                "{\"id\":\"bern\",\"nimi\":\"Bern\",\"maa\":\"CHE\",\"lat\":46.9,\"lon\":7.4},{\"id\":\"angola\",\"nimi\":\"Angola\",\"maa\":\"AGO\",\"lat\":-8.8,\"lon\":13.2,\"asukkaat\":36749906,\"asukkaatAlue\":true}]}");
            var a = RadioAineisto.Lue(null, MiniJson.Jasenna("{\"exportit\":{\"RADIOT\":{}}}"), k, null, null);
            Oleta.Sama(8_900_000L, a.Kaupungit.First(x => x.Id == "lontoo").Asukkaat, "Lontoo");
            Oleta.Tosi(a.Kaupungit.First(x => x.Id == "bern").Asukkaat == null, "Bern ilman kenttää");
            Oleta.Sama(MastoKoko.Iso, Mastot.Koko(a.Kaupungit.First(x => x.Id == "lontoo")), "Lontoo iso");
            Oleta.Sama(MastoKoko.Pieni, Mastot.Koko(a.Kaupungit.First(x => x.Id == "angola")), "Angola alue → pieni");
        }

        [Testi] static void KorkeusMitoitettu()
        {
            double m = Mastot.KorkeusM(MastoKoko.Iso, 2_600_000);
            Lahella(64 * 2_400_000.0 / 1024, m, 1, "iso 2 600 km:stä = 64 pt");
            // Lähemmäs mentäessä ruudulla hieman suurempi: korkeus / kameran korkeus kasvaa.
            Oleta.Tosi(Mastot.KorkeusM(MastoKoko.Iso, 500_000) / 500_000 > m / 2_600_000, "kasvaa lähellä");
            Oleta.Sama(3, Mastot.Valotasot(MastoKoko.Iso).Count, "isossa 3 valotasoa");
        }

        [Testi] static void VilkkuEpatahdissaJaToistettava()
        {
            var a = Mastot.Vilkku("FRA");
            Oleta.Sama(a, Mastot.Vilkku("FRA"), "sama asema, sama vilkku");
            Oleta.Tosi(a.jakso >= 1.2 && a.jakso <= 1.8, "jakso 1,5 ± 20 %");
            var vaiheet = new[] { "FRA", "DEU", "GBR", "ITA", "ESP", "FIN" }.Select(x => Math.Round(Mastot.Vilkku(x).vaihe, 2)).Distinct().Count();
            Oleta.Tosi(vaiheet >= 5, "vaiheet eroavat");
            // Palaa 0,45 s jakson alusta, sitten sammuu.
            var (j, v) = a;
            double alku = (1 - v) * j;
            Lahella(1, Mastot.VilkunValo("FRA", alku + 0.2), 1e-9, "palaa keskellä");
            Oleta.Sama(0.0, Mastot.VilkunValo("FRA", alku + 0.8), "sammunut");
            Oleta.Tosi(Mastot.VilkunValo("FRA", alku + 0.06) is > 0 and < 1, "pehmeä nousu");
        }

        [Testi] static void RenkaatSyntyvatJaKasvavat()
        {
            Oleta.Sama(0, Mastot.Renkaat(-0.1).Count, "ei ennen lukkoa");
            Oleta.Sama(1, Mastot.Renkaat(0.5).Count, "ensimmäinen");
            Oleta.Sama(3, Mastot.Renkaat(4.0).Count, "kolme näkyvissä");
            Oleta.Sama(3, Mastot.Renkaat(10.0).Count, "tasapaino");
            var r = Mastot.Renkaat(4.0);
            Oleta.Tosi(r[0] < r[1] && r[1] < r[2], "uusin pienin");
            Oleta.Tosi(r.All(x => x >= 0 && x <= 1), "osuudet 0…1");
        }

        [Testi] static void RahinaTasatehoinen()
        {
            for (double e = 0; e <= 0.5; e += 0.01)
            {
                var (l, r) = Mastot.Rahina(e);
                Lahella(1, l * l + r * r, 1e-9, $"teho e={e}");
            }
            Lahella(0, Mastot.Rahina(0).rahina, 1e-12, "asemalla pelkkä lähetys");
            Oleta.Sama(0.0, Mastot.Rahina(0.25).lahetys, "puolivälissä pelkkä rahina");
        }

        [Testi] static void KirkkausJaKameraAjo()
        {
            var k = new MastonKirkkaus();
            Oleta.Sama(0.25, k.Arvo, "lattia");
            for (int i = 0; i < 6; i++) k.Paivita(1, 1 / 60.0);
            Oleta.Tosi(k.Arvo > 0.9, "nousee 0,1 s:ssa");
            for (int i = 0; i < 6; i++) k.Paivita(0, 1 / 60.0);
            Oleta.Tosi(k.Arvo > 0.6, "laskee hitaammin");
            Lahella(2.28, Mastot.KameraAjonKesto(800), 1e-9, "saapuu lukkoon");
            Oleta.Sama(1.2, Mastot.KameraAjonKesto(100), "lyhyt");
            Lahella(1.6, Mastot.KaarenKorotus(5000), 1e-9, "korotus enintään 1,6");
        }
    }
}
