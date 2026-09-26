// Verhon valmiusehto (Assets/Matkakirja/Kartta/ValmiusEhto.cs): 90 %:n tasaantuminen ja 96 %:n porras (1.0.24).
namespace Matkakirja.Peli.Testit
{
    static class ValmiusEhtoTestit
    {
        static bool Aja(ValmiusEhto e, double alku, double loppu, System.Func<double, float> aste)
        {
            bool ok = false;
            for (double t = alku; t <= loppu + 1e-9; t += 1.0 / 60) ok = e.Paivita(t, aste(t));
            return ok;
        }

        [Testi] static void NousevaYhdeksankymppiEiKelpaa()
        {
            var e = new ValmiusEhto();
            Oleta.Tosi(!Aja(e, 0, 1, t => 90f + (float)t * 5f), "nousu 5 %/s ei ole tasaantunut");
        }

        [Testi] static void TasainenYhdeksankymppiKelpaa()
        {
            var e = new ValmiusEhto();
            Oleta.Tosi(Aja(e, 0, 1, t => 92f), "tasainen 92 %");
        }

        [Testi] static void HeiluvaYli96Kelpaa()
        {
            // Portin kierto: 98,9 ↔ 100 joka toinen kehys (lokit/aloitusverho-katto).
            var e = new ValmiusEhto();
            int i = 0;
            Oleta.Tosi(Aja(e, 0, 1, t => (i++ % 2 == 0) ? 98.9f : 99.9f), "heilunta 1 %-yks 96 %:n yllä");
        }

        [Testi] static void JatkuvaNousuYli96EiKelpaa()
        {
            // 96 → 99,6 %:iin tasaisesti (12 %-yks/s): ikkunassa nousua 3,6 > 2,5, eli lataus etenee yhä.
            var e = new ValmiusEhto();
            Oleta.Tosi(!Aja(e, 0, 0.3, t => 96f + (float)t * 12f), "jatkuva nousu 96 %:n yllä");
        }
    }
}
