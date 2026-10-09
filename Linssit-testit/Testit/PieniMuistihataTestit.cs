// Pienen muistin hätä kahdessa portaassa (juna 173, PT 10.10. 02.2x f): taso 1 alle 0,8 Gt (esilataus pois), taso 2 alle 0,5 Gt
// (lataus seis), palautus porras kerrallaan raja + 0,2 Gt:n yli.
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class PieniMuistihataTestit
    {
        [Testi] static void PortaatJaPalautus()
        {
            var h = new PieniMuistihata();
            Oleta.Tosi(!h.Paivita(1.2) && h.Taso == 0, "1,2 Gt: ei hätää");
            Oleta.Tosi(h.Paivita(0.79) && h.Taso == 1, "alle 0,8: taso 1");
            Oleta.Tosi(!h.Paivita(0.95) && h.Taso == 1, "0,95: taso 1 pysyy (palautus vasta yli 1,0)");
            Oleta.Tosi(h.Paivita(0.49) && h.Taso == 2, "alle 0,5: taso 2");
            Oleta.Tosi(!h.Paivita(0.65) && h.Taso == 2, "0,65: taso 2 pysyy (palautus vasta yli 0,7)");
            Oleta.Tosi(h.Paivita(0.72) && h.Taso == 1, "yli 0,7: lataus jatkuu, esilataus yhä pois");
            Oleta.Tosi(h.Paivita(1.01) && h.Taso == 0, "yli 1,0: hätä ohi");
        }

        [Testi] static void SuoraanTasolle2JaTakaisin()
        {
            var h = new PieniMuistihata();
            Oleta.Tosi(h.Paivita(0.3) && h.Taso == 2, "0,3 Gt suoraan tasolle 2");
            Oleta.Tosi(h.Paivita(1.5) && h.Taso == 0, "1,5 Gt suoraan ohi");
            Oleta.Tosi(!h.Paivita(-1) && !h.Paivita(0) && h.Taso == 0, "ei tiedossa: ei muutosta");
            h.Paivita(0.6);
            h.Nollaa();
            Oleta.Tosi(h.Taso == 0, "nollaus avauksessa");
        }

        [Testi] static void Taso1PoisVertailuun()
        {
            // Asetus "hataraja1 0": vain lataus seis (alle 0,5), jatkuu yli 0,7 kuten yksiportainen hätä.
            var h = new PieniMuistihata();
            Oleta.Tosi(!h.Paivita(0.6, double.NaN, 0) && h.Taso == 0, "0,6: ei tasoa 1");
            Oleta.Tosi(h.Paivita(0.45, double.NaN, 0) && h.Taso == 2, "alle 0,5: seis");
            Oleta.Tosi(!h.Paivita(0.69, double.NaN, 0) && h.Taso == 2, "0,69: seis pysyy");
            Oleta.Tosi(h.Paivita(0.71, double.NaN, 0) && h.Taso == 0, "yli 0,7: ohi");
        }

        [Testi] static void Taso1PysyyVahintaan10s()
        {
            // R16: ilman pitoa esilataus heilui 2–3 s:n välein; taso 1 pysyy 10 s viimeisestä alituksesta.
            var h = new PieniMuistihata();
            Oleta.Tosi(h.Paivita(0.75, 100) && h.Taso == 1, "100 s: alle 0,8 → taso 1");
            Oleta.Tosi(!h.Paivita(1.25, 100.5) && h.Taso == 1, "100,5 s: 1,25 Gt, pito jatkuu");
            Oleta.Tosi(!h.Paivita(0.78, 105) && h.Taso == 1, "105 s: uusi alitus siirtää pitoa");
            Oleta.Tosi(!h.Paivita(1.3, 114.9) && h.Taso == 1, "114,9 s: alle 10 s alituksesta");
            Oleta.Tosi(h.Paivita(1.3, 115) && h.Taso == 0, "115 s: pito ohi → esilataus jatkuu");
            Oleta.Tosi(h.Paivita(0.45, 120) && h.Taso == 2 && h.Paivita(0.75, 120.5) && h.Taso == 1, "taso 2 → 1 ilman pitoa");
        }
    }
}
