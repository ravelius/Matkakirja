// KAUPUNGIN YMPÄRISTÖVALO (Linssiseppä 2, 9.10.2026; PT junaan 171): Trilight-jako kartan ambientista.
using Matkakirja.Linssit.Ilmakeha;

namespace Matkakirja.Linssit.Testit
{
    public static class YmparistoValoTestit
    {
        static double Lum(double[] c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];

        [Testi] static void PaivallaTaivasKirkasJaViileaMaaTumma()
        {
            var (t, h, m) = YmparistoValo.Laske(0.18, 0.16, 0.13, 40, 0.45);   // kartan lämmin ambientti
            Oleta.Tosi(t[2] > t[0], "taivas sinertävä (ei ruskea varjosivu)");
            Oleta.Tosi(Lum(t) > Lum(h) && Lum(h) > Lum(m), "taivas > horisontti > maa");
            Oleta.Tosi(Lum(h) > 0.2126 * 0.18 + 0.7152 * 0.16 + 0.0722 * 0.13, "seinät (horisontti) kirkkaampia kuin ennen");
            Oleta.Tosi(m[0] > m[2], "maan heijastus lämmin");
        }

        [Testi] static void YollaHillitympiJaPilvisellaHarmaampi()
        {
            var (tp, _, _) = YmparistoValo.Laske(0.18, 0.16, 0.13, 40, 0.45);
            var (ty, _, _) = YmparistoValo.Laske(0.18, 0.16, 0.13, -10, 0.45);
            Oleta.Tosi(Lum(ty) < Lum(tp), "yöllä pienempi kerroin");
            var (tk, _, _) = YmparistoValo.Laske(0.18, 0.16, 0.13, 40, 0.0);
            var (tpi, _, _) = YmparistoValo.Laske(0.18, 0.16, 0.13, 40, 1.0);
            Oleta.Tosi(tk[2] / tk[0] > tpi[2] / tpi[0], "pilvisellä vähemmän sininen");
            Oleta.Sama(0.0, YmparistoValo.Paivaosuus(-6), "yö");
            Oleta.Sama(1.0, YmparistoValo.Paivaosuus(10), "päivä");
        }

        [Testi] static void MustaPohjaPysyyMustana()
        {
            var (t, h, m) = YmparistoValo.Laske(0, 0, 0, 40, 0.5);
            Oleta.Sama(0.0, Lum(t) + Lum(h) + Lum(m), "ei omaa valoa");
        }
    }
}
