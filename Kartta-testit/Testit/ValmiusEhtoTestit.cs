// Löydös 80 / BUILD 16: verhon tasaantumisehto (Kartta/ValmiusEhto.cs).
using Matkakirja;

namespace Matkakirja.Kartta.Testit
{
    static class ValmiusEhtoTestit
    {
        /// <summary>Syöttää kehykset 60 Hz:llä aste(t)-funktiosta; palauttaa ensimmäisen kelpaavan ajan tai −1.</summary>
        static double EnsimmainenValmis(System.Func<double, float> aste, double kesto = 5.0)
        {
            var e = new ValmiusEhto();
            for (int i = 0; i * (1.0 / 60) <= kesto; i++)
            {
                double t = i / 60.0;
                if (e.Paivita(t, aste(t))) return t;
            }
            return -1;
        }

        [Testi]
        static void TasainenYli90KelpaaIkkunanJalkeen()
        {
            double t = EnsimmainenValmis(_ => 92f);
            Oleta.Tosi(t >= ValmiusEhto.Ikkuna - 1e-9 && t < ValmiusEhto.Ikkuna + 0.05, $"t {t:0.000}");
        }

        [Testi]
        static void Alle90EiKoskaan()
        {
            Oleta.Sama(-1.0, EnsimmainenValmis(_ => 89.9f));
        }

        [Testi]
        static void NousuEstaa()
        {
            // 90 → 100 % tahdilla 5 %/s: nousee 1,5 %-yks / 300 ms (> Nousu), joten alle KorkeaRajan ei kelpaa; 96 %:ssa
            // (t = 1,2 s) nousu ≤ KorkeaNousu kelpaa (verho-96).
            double t = EnsimmainenValmis(s => (float)System.Math.Min(100.0, 90.0 + 5.0 * s));
            Oleta.Tosi(System.Math.Abs(t - 1.2) < 0.02, $"t {t:0.000}");
            // Nopea nousu 10 %/s (3 %-yks / 300 ms > KorkeaNousu) ei kelpaa 96 %:ssa, vaan vasta 100 %:ssa (t = 1 s).
            double n = EnsimmainenValmis(s => (float)System.Math.Min(100.0, 90.0 + 10.0 * s));
            Oleta.Tosi(System.Math.Abs(n - 1.0) < 0.02, $"nopea t {n:0.000}");
            // Hidas nousu 2 %/s (0,6 %-yks / 300 ms) kelpaa, kun ikkuna on katettu.
            double h = EnsimmainenValmis(s => (float)System.Math.Min(99.0, 91.0 + 2.0 * s));
            Oleta.Tosi(h >= 0.3 - 1e-9 && h < 0.35, $"hidas t {h:0.000}");
        }

        [Testi]
        static void SataHetiKehysrajanJalkeen()
        {
            double t = EnsimmainenValmis(_ => 100f);
            Oleta.Tosi(System.Math.Abs(t - (ValmiusEhto.MinKehykset - 1) / 60.0) < 1e-9, $"t {t:0.000}");
        }

        [Testi]
        static void NotkahdusJaPalautusOdottaa()
        {
            // Aste notkahtaa 95 → 85 kohdassa 1,0 s (uusi kerros) ja palaa 95:een 1,1 s: nousu ikkunan alimmasta > 1,
            // joten odotetaan, kunnes notkahdus on pudonnut ikkunasta (noin 1,1 + 0,3 s). Pelkkä lasku ei estä (ei nousua).
            var e = new ValmiusEhto();
            double valmis = -1;
            for (int i = 0; i <= 180; i++)
            {
                double t = i / 60.0;
                float a = t < 0.5 ? 80f : t >= 1.0 && t < 1.1 ? 85f : 95f;
                if (t >= 0.5 && t < 1.0) { e.Paivita(t, a); continue; }   // ehto voi täyttyä jo ennen notkahdusta; ei tässä
                if (t >= 1.0 && e.Paivita(t, a) && valmis < 0) valmis = t;
            }
            Oleta.Tosi(valmis > 1.37 && valmis < 1.43, $"valmis {valmis:0.000}");
        }

        [Testi]
        static void NollausAloittaaAlusta()
        {
            var e = new ValmiusEhto();
            for (int i = 0; i < 60; i++) e.Paivita(i / 60.0, 95f);
            Oleta.Tosi(e.Paivita(1.0, 95f), "ennen nollausta valmis");
            e.Nollaa();
            Oleta.Tosi(!e.Paivita(1.1, 95f), "nollauksen jälkeen ei heti");
            Oleta.Sama(1, e.Kehykset);
        }
    }
}
