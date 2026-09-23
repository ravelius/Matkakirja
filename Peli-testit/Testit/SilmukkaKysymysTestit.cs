// Silmukka kysymysmoottorin kanssa (erä 4): sama kulku kuin
// Peli-testit/silmukka-kysymys.txt PeliOhjaimessa (uusi-peli 12345, Kysely
// kytkeytyy → esivalinta purkautuu, bussi Lontooseen, tutki, vastaa oikea,
// jatka, liftaus Pariisiin). Odotetut arvot on kirjattu README-silmukka.md:hen.
// ./kaanna.sh SilmukkaKysymys
using System.Linq;
using Matkakirja.Natiivi;

namespace Matkakirja.Peli.Testit
{
    public static class SilmukkaKysymysTestit
    {
        [Testi] static void BussiLontooseenTutkiminenJaLiftausTakaisin()
        {
            var m = Matka.UusiPeli(KultaisetApu.Verkko, new Satunnainen(12345), "Fogg", "pariisi", KultaisetApu.Laattamaarat);
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe, "ilman Kyselyä liftaus esivalittu");
            var k = new Kysely(m, KyselyTestit.Data);
            Oleta.Tosi(m.ArvioiEsivalinta(), "esivalinta purkautuu");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Tosi(m.Kulkutavat().Contains(Kulkutapa.Pysy), "Pysy tarjolla Pariisissa");
            Oleta.Tosi(!m.ArvioiEsivalinta(), "toinen kutsu ei tee mitään");
            Loyto loyto = null;
            m.Loysi += (p, l) => loyto = l;

            var t = PeliApu.Matkusta(m, "lontoo", Kulkutapa.Bussi);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama("lontoo", t.Saapui);
            Oleta.Sama(250, m.Tila.Pelaaja.Raha, "bussi 50");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Tosi(k.TehtavaTarjolla(m.Tila.Pelaaja), "Lontoossa tehtävä");

            Oleta.Tosi(k.Tutki().Ok, "tutki");
            var q = m.Tila.Kysely.Kysymys;
            Oleta.Sama(Vaihe.Kysymys, m.Tila.Vaihe);
            Oleta.Tosi(q.Kaari && q.Laji == KysymysMuoto.Visa, "kohtaaminen");
            Oleta.Sama(3, q.Oikea, "oikea");
            var d = KysymysApu.Nakyma(k, q);
            Oleta.Sama("Lontoo · kohtaaminen", d.Otsikko);
            var ko = new Kohtaamiset();
            ko.LueTarinakaari(System.IO.File.ReadAllText(System.IO.Path.Combine(KultaisetApu.Paketti, "tarinakaari.json")));
            ko.LueKohtaamiset(System.IO.File.ReadAllText(System.IO.Path.Combine(KultaisetApu.Paketti, "kohtaamiset.json")));
            Oleta.Tosi(!KysymysApu.LisaaKohtaaminen(d, q, ko, false), "kaaren tervehdys ei kuluta kaupungin tervehdystä");
            Oleta.Tosi(d.Tervehdys != null && d.Tervehdys.Contains("Leila"), d.Tervehdys);

            Oleta.Tosi(k.Vastaa(q.Oikea).Ok, "vastaa");
            Oleta.Sama("pieniAarre", loyto?.WebTulos, "laatta");
            Oleta.Sama(440, m.Tila.Pelaaja.Raha, "löytö +190");
            d = KysymysApu.Nakyma(k, q, loyto);
            Oleta.Sama("Löysit: Kourallinen hopeakolikoita · +190 £", d.Loyto);
            KysymysApu.LisaaKohtaaminen(d, q, ko, false);
            Oleta.Tosi(d.Tervehdys == null, "ei tervehdystä vastauksen jälkeen");
            Oleta.Tosi(d.RepliikkiLoyto && d.Repliikki.StartsWith(ko.Kaupunki("lontoo").KaariAarre), "kaaren aarre + löytörepliikki");
            Oleta.Tosi(d.Repliikki.EndsWith(ko.Kaupunki("lontoo").Loyto), d.Repliikki);

            Oleta.Tosi(k.Sulje().Ok, "sulje");
            Oleta.Sama(Vaihe.Toiminta, m.Tila.Vaihe);
            Oleta.Sama(Vuorokaudenaika.Keskipaiva, m.Tila.Vuorokaudenaika());
            Oleta.Tosi(!k.TehtavaTarjolla(m.Tila.Pelaaja), "Lontoo tehty");

            t = PeliApu.Matkusta(m, "pariisi", Kulkutapa.Maa);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama(2, t.Noppa, "noppa");
            Oleta.Sama("e:lontoo|pariisi:2", t.Kohde.Avain, "reitillä");
            Oleta.Sama(Vuorokaudenaika.Ilta, m.Tila.Vuorokaudenaika());
            Oleta.Sama(Vaihe.Heitto, m.Tila.Vaihe, "Heitä-nappi");
            t = PeliApu.Matkusta(m, "pariisi", Kulkutapa.Maa);
            Oleta.Tosi(t.Ok, t.Virhe);
            Oleta.Sama("pariisi", t.Saapui, "noppa 2 perille");
            Oleta.Sama(440, m.Tila.Pelaaja.Raha);
            Oleta.Sama(Vuorokaudenaika.Yo, m.Tila.Vuorokaudenaika());
            Oleta.Tosi(k.TehtavaTarjolla(m.Tila.Pelaaja), "Pariisi tutkimatta");
        }
    }
}
