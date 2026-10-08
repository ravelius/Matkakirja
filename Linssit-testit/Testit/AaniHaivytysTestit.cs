// Taustaäänten vaimennus pallon latauskuvan ajaksi (omistaja TF 168, 9.10.2026).
namespace Matkakirja.Linssit.Testit
{
    public static class AaniHaivytysTestit
    {
        [Testi] static void PoisJaTakaisinPerustasoon()
        {
            var h = new AaniHaivytys();
            h.Aseta(true, 0.8);
            double t = 0;
            for (int i = 0; i < 100; i++) t = h.Askel(0.01);
            Oleta.Tosi(t < 0.0001 && h.Vaimennettu && !h.Kaynnissa, "0,6 s jälkeen hiljaa");
            h.Aseta(false, t);
            for (int i = 0; i < 100; i++) t = h.Askel(0.01);
            Oleta.Tosi(System.Math.Abs(t - 0.8) < 0.0001, "takaisin perustasoon 0,8");
        }

        [Testi] static void KeskenHaivytyksenUusiVaimennusEiTallennaValitasoa()
        {
            var h = new AaniHaivytys();
            h.Aseta(true, 1.0);
            double t = 0;
            for (int i = 0; i < 100; i++) t = h.Askel(0.01);
            h.Aseta(false, t);
            t = h.Askel(0.2);   // kesken paluun
            h.Aseta(true, t);
            Oleta.Tosi(System.Math.Abs(h.Perus - 1.0) < 1e-9, "perustaso pysyy 1,0");
            Oleta.Tosi(h.Askel(0.001) <= t + 1e-9, "suunta alas");
        }
    }
}
