// Elävä kartta, nostojen kokoluokat, unohdettu tila ja maakunnat (Assets/Matkakirja/Peli/KarttaMuste.cs).
using System.Collections.Generic;

namespace Matkakirja.Peli.Testit
{
    static class KarttaMusteTestit
    {
        static KarttaMuste Data()
        {
            var m = new KarttaMuste();
            m.LisaaNosto("kohde:delfoi", "GRC:fokida", KarttaMuste.Luokka("paakohde", 2));
            m.LisaaNosto("kohde:parnassos", "GRC:fokida", KarttaMuste.Luokka(null, 3));
            m.LisaaNosto("kohde:olympos", "GRC:pieria", KarttaMuste.Luokka(null, 1));
            m.LisaaNosto("kohde:egeanmeri", null, KarttaMuste.Luokka("kohde", 1));
            m.LisaaSalaisuus("GRC:fokida", "nosto:salaisuus-fokida");
            return m;
        }

        [Testi] static void LuokkaDatastaTaiTasosta()
        {
            Oleta.Sama(Kokoluokka.Paakohde, KarttaMuste.Luokka("paakohde", 3), "data voittaa tason");
            Oleta.Sama(Kokoluokka.Paakohde, KarttaMuste.Luokka(null, 1), "taso 1");
            Oleta.Sama(Kokoluokka.Kohde, KarttaMuste.Luokka("outo", 2), "taso 2");
            Oleta.Sama(Kokoluokka.Pieni, KarttaMuste.Luokka(null, 3), "taso 3");
            Oleta.Sama(Kokoluokka.Kohde, KarttaMuste.Luokka(null, null), "oletus");
        }

        [Testi] static void UnohdettuJaLoydetty()
        {
            var m = Data();
            var l = new HashSet<string>();
            var t = m.Tila(l, "kohde:parnassos");
            Oleta.Tosi(!t.Loydetty && t.Nakyy && t.Luokka == Kokoluokka.Pieni, "himmeä pieni jälki");
            m.Kirjaa(l, "kohde:parnassos");
            Oleta.Tosi(m.Tila(l, "kohde:parnassos").Loydetty, "löydetty täysi merkki");
            Oleta.Tosi(m.Tila(l, "tuntematon").Loydetty, "tuntematon (ei datassa) piirretään kuten ennen");
        }

        [Testi] static void MaakuntaHeraaJaValmistuu()
        {
            var m = Data();
            var l = new HashSet<string>();
            Oleta.Tosi(!m.Tila(l, "nosto:salaisuus-fokida").Nakyy, "salaisuus piilossa");
            var a = m.Kirjaa(l, "kohde:delfoi");
            Oleta.Tosi(a.Uusi && a.MaakuntaHeraa && !a.MaakuntaValmis && a.Loydetyt == 1 && a.Kaikki == 2, "ensimmäinen herättää, 1/2");
            Oleta.Tosi(m.Heranneet(l, "GRC:fokida") && !m.Heranneet(l, "GRC:pieria"), "vain fokida herännyt");
            var toisto = m.Kirjaa(l, "kohde:delfoi");
            Oleta.Tosi(!toisto.Uusi && !toisto.MaakuntaHeraa, "toinen avaus ei tapahtumia");
            var b = m.Kirjaa(l, "kohde:parnassos");
            Oleta.Tosi(b.MaakuntaValmis && !b.MaakuntaHeraa && b.Salaisuus == "nosto:salaisuus-fokida", "2/2 → salaisuus ilmestyy");
            var s = m.Tila(l, "nosto:salaisuus-fokida");
            Oleta.Tosi(s.Nakyy && !s.Loydetty && s.Salaisuus && s.Luokka == Kokoluokka.Paakohde, "salaisuus näkyy pääkohteena");
            var c = m.Kirjaa(l, "nosto:salaisuus-fokida");
            Oleta.Tosi(c.Uusi && !c.MaakuntaValmis && !c.MaakuntaHeraa, "salaisuuden löytö ei laukaise uudelleen");
            Oleta.Sama((2, 2), m.Laskuri(l, "GRC:fokida"), "salaisuus ei laskuriin");
        }

        [Testi] static void MaanMaakunnatJaMaakunnatonNosto()
        {
            var m = Data();
            var l = new HashSet<string>();
            var e = m.Kirjaa(l, "kohde:egeanmeri");
            Oleta.Tosi(e.Uusi && e.Maakunta == null && !e.MaakuntaHeraa, "meri ilman maakuntaa");
            var lista = new List<(string, int, int)>(m.Maakunnat(l, "grc"));
            Oleta.Sama(2, lista.Count, "fokida ja pieria");
            Oleta.Sama(("GRC:fokida", 0, 2), lista[0], "fokida 0/2");
        }
    
        // Omistaja 27.9.2026: kaikki nostot täytenä heti — ei "unohdettua" himmeää tilaa; salaisuus odottaa yhä.
        [Testi] static void KaikkiNostotTaysinaHeti()
        {
            var m = new KarttaMuste();
            m.LisaaNosto("a", "GRC:athos", Kokoluokka.Kohde);
            m.LisaaNosto("b", "GRC:athos", Kokoluokka.Pieni);
            m.LisaaSalaisuus("GRC:athos", "salaisuus");
            var loydetyt = new HashSet<string>();
            Oleta.Tosi(m.Tila(loydetyt, "a").Taysi, "löytämätön nosto ei ole täysi");
            Oleta.Tosi(!m.Tila(loydetyt, "a").Loydetty);
            Oleta.Tosi(!m.Tila(loydetyt, "salaisuus").Taysi, "salaisuus näkyi ennen maakunnan valmistumista");
            loydetyt.Add("a"); loydetyt.Add("b");
            Oleta.Tosi(m.Tila(loydetyt, "salaisuus").Taysi, "salaisuus ei ilmestynyt valmiissa maakunnassa");
        }
    }
}
