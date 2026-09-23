// Lennon pilvisumun ajastus (Ydin/Pilvet/LentoPilvet.cs PilviVerho).
using Matkakirja.Linssit.Pilvet;

namespace Matkakirja.Linssit.Testit
{
    public static class LentoPilvetTestit
    {
        static void Lahella(double odotettu, double saatu, string mita) =>
            Oleta.Tosi(System.Math.Abs(odotettu - saatu) < 1e-9, $"{mita}: odotettu {odotettu}, saatu {saatu}");

        [Testi] static void HaivytysSisaanJaUlos()
        {
            var v = new PilviVerho();
            Lahella(0, v.Peitto(0), "alussa ei pilviä");
            Oleta.Tosi(!v.Nakyvissa(0));
            v.Nayta(10);
            Lahella(0, v.Peitto(10), "häivytyksen alku");
            Lahella(PilviVerho.OletusPeitto / 2, v.Peitto(10 + PilviVerho.OletusHaivytysS / 2), "puolivälissä puolet (smoothstep)");
            Lahella(PilviVerho.OletusPeitto, v.Peitto(10 + PilviVerho.OletusHaivytysS), "täysi");
            Oleta.Tosi(v.Nakyvissa(11));
            v.Piilota(20, 2);
            Lahella(PilviVerho.OletusPeitto, v.Peitto(20), "piilotus alkaa täydestä");
            Lahella(0, v.Peitto(22), "piilotettu");
            Oleta.Tosi(!v.Nakyvissa(22.1));
        }

        [Testi] static void KeskeytettyHaivytysJatkaaNykyisesta()
        {
            var v = new PilviVerho();
            v.Nayta(0, 2);
            double puoli = v.Peitto(1);
            v.Piilota(1, 2);
            Lahella(puoli, v.Peitto(1), "ei hyppyä");
            Oleta.Tosi(v.Peitto(2) < puoli, "laskee");
            v.Nayta(3, 0);
            Lahella(PilviVerho.OletusPeitto, v.Peitto(3), "kesto 0 = heti");
        }

        [Testi] static void AjelehdintaJaKorkeusraja()
        {
            var v = new PilviVerho();
            Lahella(0, v.Kierto(100), "ei kiertoa ennen ensimmäistä näyttöä");
            v.Nayta(100);
            Lahella(60 * PilviVerho.AjelehdintaAstettaS, v.Kierto(160), "3° minuutissa");
            v.Piilota(200);
            v.Nayta(300);
            Lahella(200 * PilviVerho.AjelehdintaAstettaS, v.Kierto(300), "jatkuu lennosta toiseen");
            Lahella(9_000, PilviVerho.Rajaa(9_000, 1_000_000), "pyydetty kameran alla");
            Lahella(60_000, PilviVerho.Rajaa(200_000, 100_000), "kameran alle");
            Lahella(PilviVerho.VahimmaisKorkeus, PilviVerho.Rajaa(500, 1_000), "vähimmäiskorkeus");
        }
    }
}
