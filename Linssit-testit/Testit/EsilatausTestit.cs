using System.Collections.Generic;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Astronautti;

namespace Matkakirja.Linssit.Testit
{
    /// <summary>Linssien esilatauslistat (ESILATAUSPOLITIIKKA kohta 6: koko kaari pienenä, kaksi ensimmäistä täysinä).</summary>
    public static class EsilatausTestit
    {
        [Testi] static void IhmisenMatkaKertomuksenJarjestyksessa()
        {
            var a = new IhmisenMatkaAineisto();
            a.Paikat.Add(new Loytopaikka { Tunnus = "omo", Kuva = "https://x/omo.jpg" });
            a.Paikat.Add(new Loytopaikka { Tunnus = "jebel", Kuva = "https://x/jebel.jpg" });
            a.Paikat.Add(new Loytopaikka { Tunnus = "lisa", Kuva = "https://x/lisa.jpg" });
            a.Paikat.Add(new Loytopaikka { Tunnus = "ilman", Kuva = null });
            a.Kertomus.Add(new KertomusJakso { Id = "avaus" });
            a.Kertomus.Add(new KertomusJakso { Id = "j1", Kohde = "jebel" });
            a.Kertomus.Add(new KertomusJakso { Id = "j2", Kohde = "omo" });
            a.Kertomus.Add(new KertomusJakso { Id = "j3", Kohde = "jebel" });
            var l = LinssienEsilataus.IhmisenMatka(a);
            Oleta.Sama("https://x/jebel.jpg,https://x/omo.jpg,https://x/lisa.jpg", string.Join(",", l.Kaari), "jaksot ensin, sitten muut, ei kaksoiskappaleita");
            Oleta.Sama("https://x/jebel.jpg,https://x/omo.jpg", string.Join(",", l.Taysina), "kaksi ensimmäistä pysäkkiä");
        }

        [Testi] static void KeksinnotOsoiteTaiCommonsNimi()
        {
            var a = new KeksinnotAineisto();
            a.Pysakit.Add(new Pysakki { Kuva = new Kuvatieto { Tiedosto = "Printing press.jpg" } });
            a.Pysakit.Add(new Pysakki { Kuva = new Kuvatieto { Osoite = "https://x/kompassi.jpg", Tiedosto = "Kompassi.jpg" } });
            a.Pysakit.Add(new Pysakki { Kuva = null });
            a.Pysakit.Add(new Pysakki { Kuva = new Kuvatieto { Tiedosto = "Hoyrykone.jpg" } });
            var l = LinssienEsilataus.Keksinnot(a);
            Oleta.Sama(3, l.Kaari.Count);
            Oleta.Sama("https://x/kompassi.jpg", l.Kaari[1], "osoite ennen Commons-nimeä (sama reitti kuin näkymässä)");
            Oleta.Sama(2, l.Taysina.Count);
        }

        [Testi] static void AstronauttiPikkukuvatJaKaksiIsoa()
        {
            var a = new AstronauttiAineisto();
            for (int i = 0; i < 3; i++)
            {
                var k = new Havaintokohde { Tunnus = "k" + i };
                k.Havainnot.Add(new Havainto { Id = "vanha", Aika = "1990", Kuva = $"https://x/{i}-vanha.jpg", Pikku = $"https://x/{i}-vanha-p.jpg" });
                k.Havainnot.Add(new Havainto { Id = "uusi", Aika = "2020", Kuva = $"https://x/{i}-uusi.jpg", Pikku = i == 2 ? null : $"https://x/{i}-uusi-p.jpg" });
                a.Kohteet.Add(k);
            }
            var l = LinssienEsilataus.Astronautti(a);
            Oleta.Sama("https://x/0-uusi-p.jpg,https://x/1-uusi-p.jpg,https://x/2-uusi.jpg", string.Join(",", l.Kaari), "oletushavainto (uusin), pikku tai iso");
            Oleta.Sama("https://x/0-uusi.jpg,https://x/1-uusi.jpg", string.Join(",", l.Taysina));
        }

        [Testi] static void TyhjaAineistoEiKaada()
        {
            Oleta.Sama(0, LinssienEsilataus.IhmisenMatka(null).Kaari.Count);
            Oleta.Sama(0, LinssienEsilataus.Keksinnot(null).Taysina.Count);
            Oleta.Sama(0, LinssienEsilataus.Astronautti(new AstronauttiAineisto()).Kaari.Count);
        }
    }
}
