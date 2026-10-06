// Kysymyksen odotusportaat (juna 150): 5 s → ODOTUS5, 12 s → ODOTUS12, 25 s → VIRHE ja myöhäinen vastaus hylätään.
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KysyOdotusTestit
    {
        static List<KysyOdotus.Tapahtuma> Aja(KysyOdotus o, double s)
        {
            var t = new List<KysyOdotus.Tapahtuma>();
            for (double a = 0; a < s; a += 0.1) { var e = o.Paivita(0.1); if (e != KysyOdotus.Tapahtuma.Ei) t.Add(e); }
            return t;
        }

        [Testi] static void PortaatJarjestyksessa()
        {
            var o = new KysyOdotus(); o.Aloita(); int nro = o.Numero;
            var t = Aja(o, 30);
            Oleta.Sama(3, t.Count); Oleta.Tosi(t[0] == KysyOdotus.Tapahtuma.Odotus5 && t[1] == KysyOdotus.Tapahtuma.Odotus12 && t[2] == KysyOdotus.Tapahtuma.Virhe);
            Oleta.Tosi(!o.Kelpaa(nro), "VIRHE-lauseen jälkeen vastaus hylätään");
        }

        [Testi] static void VastausAjoissaPysayttaa()
        {
            var o = new KysyOdotus(); o.Aloita(); int nro = o.Numero;
            var t = Aja(o, 6); o.Alkoi(); t.AddRange(Aja(o, 30));
            Oleta.Sama(1, t.Count, "vain ODOTUS5"); Oleta.Tosi(o.Kelpaa(nro));
            var p = new KysyOdotus(); p.Aloita(); Oleta.Sama(0, Aja(p, 4.5).Count, "alle 5 s: ei lausetta");
        }

        [Testi] static void UusiKysymysJaVirhe()
        {
            var o = new KysyOdotus(); o.Aloita(); int eka = o.Numero; o.Aloita();
            Oleta.Tosi(!o.Kelpaa(eka) && o.Kelpaa(o.Numero), "uudempi kysymys ohittaa vanhan vastauksen");
            Oleta.Tosi(!o.Epaonnistui(eka) && o.Epaonnistui(o.Numero), "workerin virhe vain voimassa olevalle");
            Oleta.Sama(0, Aja(o, 30).Count, "virheen jälkeen ei portaita");
        }
    }
}
