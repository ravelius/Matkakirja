using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class OpasSallitutTestit
    {
        const string Json = "{\"tiet\":[],\"sallitut\":[{\"id\":\"pariisi\",\"nimi\":\"Pariisi\",\"lat\":48.8566,\"lon\":2.3522,\"r_m\":6000},"
            + "{\"nimi\":\"Kööpenhamina\",\"lat\":55.6761,\"lon\":12.5683,\"r_m\":4000},{\"nimi\":\"rikki\",\"lat\":1,\"lon\":1,\"r_m\":0},{\"lat\":2,\"lon\":2,\"r_m\":5}]}";

        static List<OpasSallitut.Kaupunki> L() => OpasSallitut.Lue(Matkakirja.Peli.MiniJson.Jasenna(Json));

        [Testi] static void LukuJaHaku()
        {
            var l = L();
            Oleta.Sama(2, l.Count, "säde 0 ja nimetön pois");
            Oleta.Sama("koopenhamina", l[1].Id, "id nimestä tunnuksella");
            Oleta.Sama("Pariisi", OpasSallitut.Sisalla(l, 48.8584, 2.2945)?.Nimi, "Eiffel 5,2 km keskeltä");
            Oleta.Tosi(OpasSallitut.Sisalla(l, 48.80, 2.13) == null, "Versailles ulkona");
            Oleta.Tosi(OpasSallitut.Sallittu(l, 55.68, 12.57) && !OpasSallitut.Sallittu(l, 59.33, 18.07), "Tukholma ei listalla");
            Oleta.Tosi(OpasSallitut.Sallittu(new List<OpasSallitut.Kaupunki>(), 0, 0) && OpasSallitut.Sallittu(null, 0, 0), "tyhjä = ei rajausta");
            Oleta.Sama("Kööpenhamina", OpasSallitut.Nimella(l, "kööpenhamina")?.Nimi);
            Oleta.Tosi(OpasSallitut.Nimella(l, "Tukholma") == null);
            Oleta.Sama(0, OpasSallitut.Lue(Matkakirja.Peli.MiniJson.Jasenna("{\"tiet\":[]}")).Count, "kenttä puuttuu");
            Oleta.Sama("Pariisi", OpasSallitut.Alue(l, 48.9376, 2.3522)?.Nimi, "9 km pohjoiseen: ulkona, mutta alle 2 × r");
            Oleta.Tosi(OpasSallitut.Alue(l, 48.80, 2.13) == null, "Versailles 17 km: yli 2 × r");
            Oleta.Tosi(OpasSallitut.Alue(l, 49.2, 2.35) == null, "38 km: ei aluetta");
        }

        [Testi] static void VapaaLiikePysahtyyPehmeastiReunalle()
        {
            var k = L()[0];
            double lat = k.Lat, lon = k.Lon, askel = 20.0 / 111195.0;   // 20 m pohjoiseen per askel
            double edellinen = askel;
            for (int i = 0; i < 1000; i++)
            {
                var (dLat, dLon) = OpasSallitut.Rajaa(k, lat, lon, askel, 0);
                Oleta.Tosi(dLat <= edellinen + 1e-12, "nopeus ei kasva reunaa kohti");
                edellinen = dLat; lat += dLat; lon += dLon;
            }
            double r = KierrosLento.EtaisyysM(lat, lon, k.Lat, k.Lon);
            Oleta.Tosi(r <= k.RM + 0.01 && r > k.RM - 30, $"pysähtyi reunalle ({r:F1} m)");
            var (sLat, _) = OpasSallitut.Rajaa(k, lat, lon, -askel, 0);
            Oleta.Tosi(Math.Abs(sLat + askel) < 1e-12, "sisäänpäin vapaasti");
            var (pLat, pLon) = OpasSallitut.Rajaa(k, k.Lat + 1000 / 111195.0, k.Lon, 0, askel);
            Oleta.Tosi(pLat == 0 && Math.Abs(pLon - askel) < 1e-12, "keskellä sivuttain vapaasti");
        }

        [Testi] static void VapaaLentoEiYlitaReunaa()
        {
            var alue = new OpasSallitut.Kaupunki { Nimi = "Testi", Lat = 48.8566, Lon = 2.3522, RM = 800 };
            var v = new OpasVapaaLento();
            v.Aloita(new Kuvakulma(alue.Lat, alue.Lon, 300, 60, 0, 0), (la, lo) => 0);
            v.Alue = alue;
            double suurin = 0;
            for (int i = 0; i < 3000; i++) { v.Paivita(0.05, 0, 1, 0, 0, (la, lo) => 0); suurin = Math.Max(suurin, KierrosLento.EtaisyysM(v.Lat, v.Lon, alue.Lat, alue.Lon)); }
            Oleta.Tosi(suurin <= alue.RM + 0.5 && suurin > alue.RM - 50, $"täysi kaasu 150 s: enintään {suurin:F1} m (r {alue.RM})");
        }
    }
}
