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

        [Testi] static void IltaikkunatSyttyvatEnnenKatuvaloja()
        {
            Oleta.Sama(0.0, KaupunkiYovalot.IkkunatAuringosta(20));
            Oleta.Sama(1.0, KaupunkiYovalot.IkkunatAuringosta(-3));
            Oleta.Tosi(KaupunkiYovalot.IkkunatAuringosta(1) > 0.5 && KaupunkiYovalot.OsuusAuringosta(1) == 0, "auringonlaskussa ikkunat, ei katuvaloja");
            Oleta.Tosi(Math.Abs(KaupunkiYovalot.IkkunatTunnista(18.5) - 0.6) < 1e-9, "illan valinta: ikkunat 60 %");
            Oleta.Sama(0.0, KaupunkiYovalot.IkkunatTunnista(12));
            Oleta.Sama(1.0, KaupunkiYovalot.IkkunatTunnista(23));
            for (double h = 0; h < 24; h += 0.25) Oleta.Tosi(KaupunkiYovalot.IkkunatTunnista(h) >= KaupunkiYovalot.OsuusTunnista(h) - 1e-9, $"ikkunat vähintään katuvalot klo {h}");
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

        [Testi] static void KaupunginTunnusJaKatutiedosto()
        {
            Oleta.Sama("koopenhamina", KaupunkiTiet.Tunnus("Kööpenhamina"));
            Oleta.Sama("pariisi", KaupunkiTiet.Tunnus("Pariisi"));
            Oleta.Sama("rio-de-janeiro", KaupunkiTiet.Tunnus("Rio de Janeiro"));
            var i = KaupunkiTiet.LueIndeksi(Matkakirja.Peli.MiniJson.Jasenna("{\"tiet\":[\"pariisi\",\"venetsia\"],\"aanikartta\":[\"rooma\"]}"));
            Oleta.Tosi(i.Contains("pariisi") && i.Contains("venetsia") && i.Count == 2, "vain tiet");
            Oleta.Sama(0, KaupunkiTiet.LueIndeksi(Matkakirja.Peli.MiniJson.Jasenna("[\"rooma\"]")).Count, "väärä muoto = tyhjä");
            var pj = Matkakirja.Peli.MiniJson.Jasenna("{\"tiet\":[\"pariisi\",\"venetsia\"],\"tiet_polut\":{\"pariisi\":\"kartta/tiet-v2/pariisi.json\",\"paha\":\"../x.json\"}}");
            var polut = KaupunkiTiet.LuePolut(pj);
            Oleta.Sama("kartta/tiet-v2/pariisi.json", KaupunkiTiet.Polku("pariisi", polut), "tiet_polut voittaa");
            Oleta.Sama("kartta/tiet-v1/venetsia.json", KaupunkiTiet.Polku("venetsia", polut), "muuten tiet-v1");
            Oleta.Tosi(!polut.ContainsKey("paha"), "polku ei saa nousta ylös");
            Oleta.Sama("kartta/tiet-v1/rooma.json", KaupunkiTiet.Polku("rooma", KaupunkiTiet.LuePolut(null)), "ilman luetteloa tiet-v1");
            var a = KaupunkiTiet.Alue((System.Collections.Generic.Dictionary<string, object>)Matkakirja.Peli.MiniJson.Jasenna("{\"keskus\":[48.85,2.35],\"r\":4000,\"tiet\":[]}"));
            Oleta.Tosi(a != null && Math.Abs(a.Value.lat - 48.85) < 1e-9 && a.Value.r == 4000);
        }
    }
}
