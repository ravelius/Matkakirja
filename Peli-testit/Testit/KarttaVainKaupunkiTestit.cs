// KARTALLA VAIN KAUPUNGIN OMA KAPPALE (omistaja 10.10.2026, PT 11.1x; web js/kaupunkimusiikki.js KARTTA_VAIN_KAUPUNKI,
// tests/kartta-vain-kaupunki.test.mjs): kartalla soi vain kaupungin oma kappale, kun pelaaja on siinä kaupungissa. Pois
// alueraidat, maanosaraidat, pohjavire, saapumistunnukset ja matkan siirtymäraidat; tilaraidat, aiheet ja linssien raidat
// ennallaan. Vanha ketju (KarttaVainKaupunki = false) on MusiikkiVaihe2Testeissä ja AanisoitinTesteissä.
using System.Collections.Generic;

namespace Matkakirja.Peli.Testit
{
    static class KarttaVainKaupunkiTestit
    {
        static string Yhdista(IEnumerable<string> l) => "[" + string.Join("|", l) + "]";
        static string P(string tunnus) => "assets/audio/" + tunnus + "-lyria.mp3";

        static AaniTila Uusi()
        {
            var t = AaniTaulut.Oletus();
            t.Maat["ateena"] = "GRC"; t.Maat["wien"] = "AUT"; t.Maat["lontoo"] = "GBR";
            return new AaniTila(t, new Satunnainen(1).Seuraava);
        }

        [Testi] static void OletuksenaPaalla() => Oleta.Tosi(AaniTaulut.Oletus().KarttaVainKaupunki, "sääntö päällä oletuksena");

        [Testi] static void KetjussaVainKaupunkiJaTilat()
        {
            var v = new Musiikkivalitsin(AaniTaulut.Oletus());
            Oleta.Sama(Yhdista(new[] { P("musa-kaupunki-ateena") }), Yhdista(v.Ketju(null, "ateena", "GRC")), "Ateena: vain oma");
            Oleta.Sama("[]", Yhdista(v.Ketju(null, "wien", "AUT")), "Wien ilman omaa kappaletta: ei alue-, maanosa- eikä pohjaraitaa");
            Oleta.Sama("[]", Yhdista(v.Ketju(null, "jalkamatka", null)), "matkalla: ei musiikkia");
            Oleta.Sama(Yhdista(new[] { P("musa-lehti"), P("musa-kaupunki-ateena") }), Yhdista(v.Ketju(new[] { "lehti" }, "ateena", "GRC")), "tilaraita ennallaan");
            Oleta.Sama(Yhdista(new[] { P("musa-lehti") }), Yhdista(v.Ketju(new[] { "lehti" }, "wien", "AUT")), "tilaraita kaupungin ulkopuolella");
        }

        [Testi] static void KaupungistaLahtiessaKappaleHaipyy()
        {
            var s = Uusi();
            s.Paikka("ateena", "kaupunki");
            Oleta.Tosi(s.Toive(Kanava.Pohja).Url?.Contains("/musa-kaupunki-ateena-") == true, "Ateenan oma: " + s.Toive(Kanava.Pohja).Url);
            s.Paikka("jalkamatka", "metsa");
            Oleta.Sama(null, s.Toive(Kanava.Pohja).Url, "matkalla hiljaa");
            Oleta.Tosi(s.Toive(Kanava.Maisema).Url != null, "äänimaisema soi");
            s.Paikka("wien", "kaupunki");
            Oleta.Sama(null, s.Toive(Kanava.Pohja).Url, "Wien: ei musiikkia");
        }

        [Testi] static void EiTulomusiikkiaEikaSiirtymaraitaa()
        {
            var s = Uusi();
            s.Paikka("lontoo", "kaupunki");
            s.UusiKaupunki("lontoo");
            Oleta.Sama(null, s.Toive(Kanava.Aarre).Url, "ei saapumistunnusta");
            foreach (var laji in new[] { "jalan", "laiva", "lento" })
            {
                s.Siirtyma(laji);
                Oleta.Sama(null, s.Toive(Kanava.Siirtyma).Url, "ei siirtymäraitaa: " + laji);
            }
            s.Siirtyma("keksinnot");
            Oleta.Tosi(s.Toive(Kanava.Siirtyma).Url?.Contains("linssi-keksinnot") == true, "linssin raita soi: " + s.Toive(Kanava.Siirtyma).Url);
            s.Siirtyma(null);
            s.MatkaLoppui();
            Oleta.Tosi(s.Toive(Kanava.Aarre).Url?.Contains("musa-loppu") == true, "matkan loppu ennallaan");
        }
    }
}
