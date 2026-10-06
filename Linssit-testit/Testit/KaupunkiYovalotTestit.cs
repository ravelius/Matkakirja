// Kaupungin yövalot (kuvanlaatujärjestys kohta 2, 6.10.2026): laattaruudukko, tekstuurikoordinaatti ja syttymisosuus.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiYovalotTestit
    {
        [Testi] static void RuudukkoKaupunginYmparille()
        {
            var l = KaupunkiYovalot.Laatat(48.857, 2.352);   // Pariisi
            Oleta.Sama(9, l.Count);
            Oleta.Tosi(l.Exists(x => x.rivi == 1 && x.sarake == 1 && x.nimi == "48_2"), "keskellä Pariisin laatta");
            Oleta.Tosi(l.Exists(x => x.rivi == 0 && x.sarake == 0 && x.nimi == "47_1"), "lounaiskulma");
            var lissabon = KaupunkiYovalot.Laatat(38.72, -9.14);
            Oleta.Tosi(lissabon.Exists(x => x.nimi == "38_-10"), "läntinen pituus miinusmerkillä");
            Oleta.Sama(0, KaupunkiYovalot.Laatat(-33.87, 151.21).Count, "Sydney ei kuulu (VAIN EUROOPPA)");
        }

        [Testi] static void TekstuurikoordinaattiEtelastaJaLannesta()
        {
            var k = KaupunkiYovalot.Kulma(48.857, 2.352);
            var (u, v) = KaupunkiYovalot.Uv(k, 48.857, 2.352);
            Oleta.Tosi(u > 1.0 / 3 && u < 2.0 / 3 && v > 1.0 / 3 && v < 2.0 / 3, "keskilaatassa");
            var (u0, v0) = KaupunkiYovalot.Uv(k, 47.0, 1.0);
            Oleta.Tosi(Math.Abs(u0) < 1e-12 && Math.Abs(v0) < 1e-12, "lounaiskulma = (0, 0)");
        }

        [Testi] static void ValotSyttyvatHamarassa()
        {
            Oleta.Sama(0.0, KaupunkiYovalot.OsuusAuringosta(5));
            Oleta.Sama(0.0, KaupunkiYovalot.OsuusAuringosta(-2));
            Oleta.Sama(1.0, KaupunkiYovalot.OsuusAuringosta(-8));
            Oleta.Tosi(Math.Abs(KaupunkiYovalot.OsuusAuringosta(-5) - 0.5) < 1e-9);
            Oleta.Sama(1.0, KaupunkiYovalot.OsuusTunnista(23));
            Oleta.Sama(0.0, KaupunkiYovalot.OsuusTunnista(12));
            Oleta.Sama(0.0, KaupunkiYovalot.OsuusTunnista(18.5), "illan valinta ilman valoja");
            Oleta.Tosi(KaupunkiYovalot.OsuusTunnista(5.25) > 0 && KaupunkiYovalot.OsuusTunnista(5.25) < 1);
        }

        [Testi] static void RuudukkoVaihtuuVastaKeskilaatanVaihtuessa()
        {
            var k = KaupunkiYovalot.Kulma(48.857, 2.352);
            Oleta.Tosi(!KaupunkiYovalot.Vaihtuu(k, 48.95, 2.9), "sama keskilaatta");
            Oleta.Tosi(KaupunkiYovalot.Vaihtuu(k, 49.1, 2.3), "pohjoiseen");
            Oleta.Tosi(KaupunkiYovalot.Vaihtuu(null, 0, 0));
        }

        [Testi] static void KadutRasteroidaanNauhoiksi()
        {
            var j = (System.Collections.Generic.Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna(
                "{\"tiet\":[{\"t\":\"primary\",\"p\":[[48.8584,2.2800],[48.8584,2.3100]]},{\"t\":\"footway\",\"p\":[[48.86,2.29],[48.87,2.29]]},{\"t\":\"x\",\"p\":[[1,2]]}]}");
            var tiet = KaupunkiTiet.Lue(j);
            Oleta.Sama(2, tiet.Count, "yksipisteinen ohitetaan");
            int n = 400; var m = KaupunkiTiet.Rasteroi(tiet, 48.8584, 2.2945, n, 2000);   // 5 m / px
            Oleta.Sama((byte)255, m[(n / 2) * n + n / 2], "pääkatu keskellä täysi");
            Oleta.Sama((byte)0, m[(n / 2 + 4) * n + n / 2], "20 m sivussa pimeä (leveys 16 m)");
            Oleta.Tosi(m[(n / 2 + 1) * n + n / 2] > 0, "nauha on leveä");
            Oleta.Sama((byte)0, m[(n / 2 + 40) * n + n / 2 - 18], "polku (footway) ei saa katuvaloa");
        }
    }
}
