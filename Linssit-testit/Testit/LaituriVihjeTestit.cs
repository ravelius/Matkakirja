// PULUN ENSIVIHJE LAITURILLA (Linssiseppä 2, 8.10.2026; omistajan palaute (6)): LaituriVihje antaa vihjeen kerran, riidan alkaessa tai
// 15 s nousun jälkeen, odottaa vaaran yli, ja jää pois, jos pelaaja löytää portin itse tai poistuu laiturilta. Data: portti on v45b:ssä
// vesiportin osassa, ja kurinalainen pelaaja (ThiefAjuri) on 15 s:n kohdalla vielä kaukana portista, joten vihje ehtii.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class LaituriVihjeTestit
    {
        const double Dt = 1 / 30.0;

        static int Aja(LaituriVihje v, double s, bool laiturilla = true, double porttiin = 20, bool vaara = false)
        {
            int n = 0; for (double t = 0; t < s; t += Dt) if (v.Paivita(Dt, laiturilla, porttiin, vaara)) n++;
            return n;
        }

        [Testi] static void ViisitoistaSekuntiaNousunJalkeenKerran()
        {
            var v = new LaituriVihje();
            Oleta.Sama(0, Aja(v, 14.5), "ei ennen 15 s");
            Oleta.Sama(1, Aja(v, 1), "15 s: Pulu lentää porttia kohti");
            Oleta.Sama(0, Aja(v, 120), "vain kerran");
            Oleta.Tosi(v.Annettu && v.Valmis, "annettu");
        }

        [Testi] static void RiitaAntaaHeti()
        {
            var v = new LaituriVihje(); Aja(v, 4);
            v.RiitaAlkoi();
            Oleta.Sama(1, Aja(v, Dt * 1.5), "riidan alkaessa heti");
        }

        [Testi] static void RiitaEnnenLaituriaEiLaske()
        {
            var v = new LaituriVihje();
            v.RiitaAlkoi();   // pelaaja vielä veneessä
            Oleta.Sama(0, Aja(v, 10), "riita ennen nousua ei anna vihjettä");
        }

        [Testi] static void VaarassaOdotetaan()
        {
            var v = new LaituriVihje(); Aja(v, 2);
            Oleta.Sama(0, Aja(v, 20, vaara: true), "vaarassa ei");
            Oleta.Sama(1, Aja(v, 0.1), "vaaran jälkeen heti");
        }

        [Testi] static void PorttiLoydettyTaiLaituriltaPoistuttuEiVihjetta()
        {
            var v = new LaituriVihje(); Aja(v, 5);
            Oleta.Sama(0, Aja(v, 30, porttiin: 2), "portti löytyi itse");
            Oleta.Tosi(v.Valmis && !v.Annettu, "valmis ilman vihjettä");
            var w = new LaituriVihje(); Aja(w, 5);
            Oleta.Sama(0, Aja(w, 30, laiturilla: false), "laiturilta poistuttu");
            Oleta.Sama(0, Aja(w, 30), "palattua ei enää");
        }

        [Testi] static void PorttiDatassaJaVihjeEhtiiKurinalaiselle()
        {
            var d = Huonesimulaatio.Data;
            var portti = MVihjeet.Paikka(d, LaituriVihje.Kohde);
            Oleta.Tosi(portti != null, $"{LaituriVihje.Kohde} datassa");
            var p = portti.Value;
            Oleta.Sama("vesiportti", Askelaani.Osa(d, p.X, p.Y, p.Z), "portti vesiportin osassa");
            var tulos = ThiefAjuri.AjaHuone(Huonesimulaatio.Uusi(), 2);
            Oleta.Tosi(tulos.Loppu != null, "huone 2 läpi");
            var t15 = tulos.Tilat.Find(w => w.T >= LaituriVihje.OdotusS);
            double porttiin = t15 == null ? 0 : Huonesimulaatio.Etaisyys2(t15.PX, t15.PZ, p.X, p.Z);
            Console.WriteLine($"      15 s nousun jälkeen pelaaja {porttiin:F1} m portista (osa {(t15 == null ? "-" : Askelaani.Osa(d, t15.PX, t15.PY, t15.PZ))})");
            Oleta.Tosi(t15 != null && porttiin > LaituriVihje.LoydettyM, "vihje ehtii ennen portin löytymistä");
        }
    }
}
