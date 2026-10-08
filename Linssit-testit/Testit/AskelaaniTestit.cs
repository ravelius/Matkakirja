// HISTORIAMOOTTORI (Siirtoseppä 7.10.2026): pelattavuusmalli 2.2 — pinnat × tila, pintamerkit, seinäsääntö (eri osa ei kuule).
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class AskelaaniTestit
    {
        const string Osat = "{\"versio\": 1, \"osat\": {" +
            "\"piha\": {\"rajat\": {\"min\": [0, 0, 0], \"max\": [10, 3, 10]}, \"naapurit\": [\"keittio\"]}," +
            "\"keittio\": {\"rajat\": {\"min\": [10, 0, 0], \"max\": [16, 3, 6]}, \"pinta\": \"puu\", \"naapurit\": [\"piha\"]}," +
            "\"kappeli\": {\"rajat\": {\"min\": [30, 0, 0], \"max\": [40, 3, 10]}}}}";
        const string Merkit = "[{\"nimi\": \"pinta:olki-1\", \"paikka\": [2, 0, 2], \"koko\": [2, 1, 2]}]";

        [Testi] static void PinnatJaTilat()
        {
            Oleta.Sama(18, Askelaani.Pinnat.Count * 3);   // 6 pintaa × 3 tilaa
            Oleta.Sama(2.5, Askelaani.Sade("kivi", Liiketapa.Kavely));
            Oleta.Sama(0.0, Askelaani.Sade("kivi", Liiketapa.Hiipiminen));
            Oleta.Sama(8.0, Askelaani.Sade("puu", Liiketapa.Juoksu));
            Oleta.Sama(2.0, Askelaani.Sade("vesi", Liiketapa.Hiipiminen));
            Oleta.Sama(2.5, Askelaani.Sade("tuntematon", Liiketapa.Kavely));
            var d = KavelyData.Lue(Osat, Merkit);
            Oleta.Sama("olki", Askelaani.Pinta(d, 2.3, 0, 1.6));
            Oleta.Sama("puu", Askelaani.Pinta(d, 12, 0, 3));
            Oleta.Sama("kivi", Askelaani.Pinta(d, 6, 0, 6));
        }

        [Testi] static void SeinasaantoEriOsaEiKuule()
        {
            var d = KavelyData.Lue(Osat, Merkit);
            Oleta.Sama("piha", Askelaani.Osa(d, 5, 1, 5));
            Oleta.Sama(2.5, Askelaani.Kuuluvuus(d, 2.5, "piha", "piha"));
            Oleta.Sama(1.25, Askelaani.Kuuluvuus(d, 2.5, "piha", "keittio"));
            Oleta.Sama(0.0, Askelaani.Kuuluvuus(d, 6, "piha", "kappeli"));
            // Kävely kivellä: 2,4 m → kuuluu (tutkii), 2,6 m → ei.
            double r = Askelaani.Sade("kivi", Liiketapa.Kavely);
            Oleta.Tosi(2.4 <= r && 2.6 > r, "kävely 2,4 m kuuluu, 2,6 m ei");
        }
    }
}
