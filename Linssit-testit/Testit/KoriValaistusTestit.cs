// KORIN VALAISTUS (Linssiseppä 8.10.2026): päivä kirkkaampi kuin ilta ja yö, ilta lämpimämpi, sade himmentää auringon, yöllä kori näkyy.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KoriValaistusTestit
    {
        static readonly double[] PaivaLaki = { 0.35, 0.55, 0.85 }, PaivaHor = { 0.75, 0.8, 0.85 }, YoLaki = { 0.02, 0.03, 0.06 }, YoHor = { 0.05, 0.05, 0.08 };
        static double S(double[] c) => c[0] + c[1] + c[2];

        [Testi] static void PaivaIltaYoJaSade()
        {
            var paiva = KoriValaistus.Laske(50, 180, PaivaLaki, PaivaHor, 0);
            var ilta = KoriValaistus.Laske(4, 260, PaivaLaki, PaivaHor, 0);
            var yo = KoriValaistus.Laske(-20, 0, YoLaki, YoHor, 0);
            var sade = KoriValaistus.Laske(50, 180, PaivaLaki, PaivaHor, 1);
            Oleta.Tosi(S(paiva.AurinkoVari) > S(ilta.AurinkoVari) && S(ilta.AurinkoVari) > S(yo.AurinkoVari), "aurinko päivä > ilta > yö");
            Oleta.Tosi(yo.AurinkoVari[0] == 0 && S(yo.TaivasYla) > 0.1, "yöllä ei aurinkoa, pohja-ambient pitää korin näkyvissä");
            Oleta.Tosi(ilta.AurinkoVari[2] / ilta.AurinkoVari[0] < paiva.AurinkoVari[2] / paiva.AurinkoVari[0] - 0.2, "ilta-aurinko lämpimämpi");
            Oleta.Tosi(S(sade.AurinkoVari) < 0.4 * S(paiva.AurinkoVari), "sade himmentää auringon");
            Oleta.Tosi(Math.Abs(sade.TaivasYla[0] - sade.TaivasYla[2]) < Math.Abs(paiva.TaivasYla[0] - paiva.TaivasYla[2]), "sade harmaannuttaa taivaan");
            Oleta.Tosi(Math.Abs(paiva.AurinkoY - Math.Sin(50 * Math.PI / 180)) < 1e-9 && paiva.AurinkoZ < -0.5, "suunta: 180° = etelä (−z), korkeus y");
            // Keskipäivän kokonaisvalo samaa luokkaa kuin vanha kiinteä valo (0,55 + 0,45 · cos): ei yli- eikä alivalotusta.
            double huippu = S(paiva.AurinkoVari) / 3 + S(paiva.TaivasYla) / 3;
            Oleta.Tosi(huippu > 0.8 && huippu < 1.3, $"keskipäivän valo {huippu:F2}");
        }
    }
}
