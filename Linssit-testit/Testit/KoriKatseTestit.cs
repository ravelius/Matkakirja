// KATSE YLÖS KORISTA (8.10.): veto nostaa katsetta sormen mukana, raja +45° horisontin yläpuolelle, irrotus palauttaa kehykseen
// pehmeästi ilman ylitystä noin sekunnissa.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KoriKatseTestit
    {
        [Testi] static void VetoRajaJaPaluu()
        {
            var k = new KoriKatse();
            k.Liiku(100, 0.1, -20); Oleta.Tosi(k.Ylos == 0, "ilman painallusta ei liiku");
            k.Paina(); k.Liiku(100, 0.1, -20);
            Oleta.Tosi(Math.Abs(k.Ylos - 10) < 1e-9, "sormen mukana 10°");
            k.Liiku(5000, 0.1, -20);
            Oleta.Tosi(Math.Abs(k.Ylos - 65) < 1e-9, $"raja: −20° + 65° = +45° ({k.Ylos})");
            k.Liiku(-100, 0.1, -20); Oleta.Tosi(Math.Abs(k.Ylos - 55) < 1e-9, "alas vetäen laskee");
            for (int i = 0; i < 60; i++) k.Paivita(1 / 60.0, -20);
            Oleta.Tosi(Math.Abs(k.Ylos - 55) < 1e-9, "pysyy, kun sormi on alhaalla");
            k.Nosta();
            double ed = k.Ylos; double t = 0;
            while (k.Ylos > 0 && t < 5) { k.Paivita(1 / 60.0, -20); Oleta.Tosi(k.Ylos <= ed + 1e-12, "laskee monotonisesti (ei ylitystä)"); ed = k.Ylos; t += 1 / 60.0; }
            Oleta.Tosi(k.Ylos == 0 && t < 2.5, $"palaa kehykseen {t:F2} s:ssa");
            k.Paina(); k.Liiku(300, 0.1, 40); Oleta.Tosi(k.Ylos <= 5 + 1e-9, "kehys jo 40° ylhäällä: lisää enintään 5°");
        }
    }
}
