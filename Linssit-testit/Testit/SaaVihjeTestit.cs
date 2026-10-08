// Säätilan ensikerran vihje (omistaja 8.10.2026): 15 s pallon käynnistymisestä, näkyy 5 s, vain kerran; ei LIVEssä; napautus sulkee.
namespace Matkakirja.Linssit.Testit
{
    public static class SaaVihjeTestit
    {
        [Testi] static void TuleeKerran15SekunninJalkeen5Sekunniksi()
        {
            var v = new SaaVihje(false);
            v.Alkoi(100);
            Oleta.Tosi(!v.Nakyy(114.9, false, false), "ei ennen 15 s");
            Oleta.Tosi(v.Nakyy(115, false, false) && v.Nahty, "15 s: näkyy ja merkitty");
            Oleta.Tosi(v.Nakyy(119.9, false, false), "näkyy 5 s");
            Oleta.Tosi(!v.Nakyy(120, false, false), "5 s jälkeen pois");
            v.Alkoi(200);
            Oleta.Tosi(!v.Nakyy(230, false, false), "seuraavalla kerralla ei enää");
            var uusi = new SaaVihje(true); uusi.Alkoi(0);
            Oleta.Tosi(!uusi.Nakyy(20, false, false), "tallennettu lippu estää");
        }

        [Testi] static void EsteSiirtaaJaLiveEstaa()
        {
            var v = new SaaVihje(false);
            v.Alkoi(0);
            Oleta.Tosi(!v.Nakyy(16, false, true), "valikko auki → odottaa");
            Oleta.Tosi(v.Nakyy(18, false, false), "este poistui → näkyy");
            var l = new SaaVihje(false);
            l.Alkoi(0);
            Oleta.Tosi(!l.Nakyy(20, true, false) && l.Nahty, "LIVE päällä → ei vihjettä, ei myöhemminkään");
            var m = new SaaVihje(false);
            m.Alkoi(0); m.Nakyy(15, false, false);
            Oleta.Tosi(!m.Nakyy(16, true, false), "LIVE päälle kesken → vihje pois");
        }

        [Testi] static void NapautusJaSulkuOdotuksessa()
        {
            var v = new SaaVihje(false);
            v.Alkoi(0); v.Nakyy(15, false, false);
            v.Suljettu();
            Oleta.Tosi(!v.Nakyy(16, false, false) && v.Nahty, "napautus sulkee");
            var w = new SaaVihje(false);
            w.Alkoi(0); w.Loppui();
            Oleta.Tosi(!w.Nakyy(30, false, false) && !w.Nahty, "pallo suljettiin ennen 15 s → ei vihjettä, ei merkitty");
            w.Alkoi(40);
            Oleta.Tosi(w.Nakyy(55, false, false), "seuraava käynnistys alusta");
        }
    }
}
