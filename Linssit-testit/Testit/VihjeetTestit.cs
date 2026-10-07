// HISTORIAMOOTTORI (Siirtoseppä 7.10.2026): pelattavuusmalli 5 — pyyntö nostaa tasoa (≤ 3, väli 10 s), vaarassa vain katse,
// 180 s → taso 2 kerran, vaarassa ei, huoneen ensimmäisellä minuutilla ei, edistys nollaa.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class VihjeetTestit
    {
        static int Aja(Vihjeet v, double s, bool vaara = false) { int n = 0; for (double t = 0; t < s; t += 0.5) if (v.Paivita(0.5, vaara, false) == 2) n++; return n; }

        [Testi] static void PyyntoNostaaTasoa()
        {
            var v = new Vihjeet();
            Oleta.Sama(1, v.Pyyda(false));
            Oleta.Sama(0, v.Pyyda(false));   // alle 10 s
            Aja(v, 10); Oleta.Sama(2, v.Pyyda(false));
            Aja(v, 10); Oleta.Sama(3, v.Pyyda(false));
            Aja(v, 10); Oleta.Sama(3, v.Pyyda(false));
            Aja(v, 10); Oleta.Sama(1, v.Pyyda(true));   // vaarassa vain katse
            v.Edistys(); Aja(v, 10); Oleta.Sama(1, v.Pyyda(false));
        }

        [Testi] static void JumiAntaaTason2Kerran()
        {
            var v = new Vihjeet(); v.UusiHuone();
            Oleta.Sama(1, Aja(v, 400));
            v.Edistys(); Oleta.Sama(0, Aja(v, 170));
            Oleta.Sama(0, Aja(v, 30, vaara: true));   // vaarassa ei itsestään
            Oleta.Sama(1, Aja(v, 5));
            var w = new Vihjeet { Tyrmassa = true }; Aja(w, 60); w.UusiHuone();
            Oleta.Sama(0, Aja(w, 59));   // huoneen ensimmäinen minuutti
            Oleta.Sama(1, Aja(w, 5));
        }
    }
}
