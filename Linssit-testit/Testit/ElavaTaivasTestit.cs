// Elävä taivas (Päätoimittaja 9.10., juna 170): lintuparvi päivällä harvoin ja kameran ohi, lentokone ohittaa kaukaa, majakka kiertää.
using System;
using Matkakirja.Linssit.Elava;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    static class ElavaTaivasTestit
    {
        [Testi] static void LintuparviOhittaaKameranPaivalla()
        {
            var e = new ElavaTaivas(5); int parvia = 0; ElavaTaivas.Lintuparvi ed = null; double lahin = double.MaxValue;
            for (double t = 0; t < 1200; t += 0.5)
            {
                e.Paivita(t, 0, 300, 0, true);
                if (e.Parvi != null && e.Parvi != ed) { parvia++; ed = e.Parvi; }
                if (e.Parvi != null) { var b = e.Lintu(0, t); lahin = Math.Min(lahin, Math.Sqrt(b.x * b.x + b.z * b.z)); }
            }
            Oleta.Tosi(parvia >= 5 && parvia <= 14, $"20 min: {parvia} parvea (harvoin)");
            Oleta.Tosi(lahin >= ElavaTaivas.ParviLahinM - 60 && lahin <= ElavaTaivas.ParviKaukaisinM + 60, $"ohittaa kameran {lahin:F0} m:n päästä");
            var y = new ElavaTaivas(5); for (double t = 0; t < 1200; t += 0.5) { y.Paivita(t, 0, 300, 0, false); Oleta.Tosi(y.Parvi == null, "yöllä ei lintuparvia"); }
            var v = new ElavaTaivas(1); for (double t = 0; t < 400 && v.Parvi == null; t += 0.5) v.Paivita(t, 0, 300, 0, true);
            var a0 = v.Lintu(0, v.Parvi.Alku + 10); var a1 = v.Lintu(1, v.Parvi.Alku + 10); var a2 = v.Lintu(2, v.Parvi.Alku + 10);
            double ux = Math.Sin(v.Parvi.Suunta * Math.PI / 180), uz = Math.Cos(v.Parvi.Suunta * Math.PI / 180);
            Oleta.Tosi((a1.x - a0.x) * ux + (a1.z - a0.z) * uz < -3 && (a2.x - a0.x) * ux + (a2.z - a0.z) * uz < -3, "V: johtaja kärjessä");
        }

        [Testi] static void LentokoneKaukanaJaValonheittimetHarvoin()
        {
            var e = new ElavaTaivas(3); e.AloitaKone(10, 0, 0); double lahin = double.MaxValue;
            for (double t = 10; t < 10 + ElavaTaivas.KoneKestoS; t += 1) { var p = e.KonePaikka(t); lahin = Math.Min(lahin, Math.Sqrt(p.x * p.x + p.z * p.z)); Oleta.Tosi(Math.Abs(p.y - ElavaTaivas.KoneKorkeusM) < 1e-9, "korkeus vakio"); }
            Oleta.Tosi(lahin >= ElavaTaivas.KoneOhitusMinM - 10 && lahin <= ElavaTaivas.KoneOhitusMaxM + 10, $"ohitus {lahin:F0} m");
            e.Paivita(10 + ElavaTaivas.KoneKestoS + 1, 0, 300, 0, true); Oleta.Tosi(e.Lentokone == null, "kone poistuu ylityksen jälkeen");
            // Valonheittimet: vain yöllä, harvoin, kaupungin laidalta, hitaasti.
            var y = new ElavaTaivas(9); int heittimia = 0; ElavaTaivas.Heitin edH = null; double maxKaanto = 0;
            for (double t = 0; t < 1800; t += 0.5)
            {
                y.Paivita(t, 0, 300, 0, false, true);
                var h = y.Valonheitin; if (h == null) continue;
                if (h != edH) { heittimia++; edH = h; double d = Math.Sqrt(h.X * h.X + h.Z * h.Z); Oleta.Tosi(d >= ElavaTaivas.HeitinMinM - 1 && d <= ElavaTaivas.HeitinMaxM + 1, $"laidalla {d:F0} m"); }
                double ds = Math.Abs(KierrosLento.Kiedo(y.Keila(0, t + 0.5).suunta - y.Keila(0, t).suunta)) / 0.5; maxKaanto = Math.Max(maxKaanto, ds);
                var k = y.Keila(h.Maara - 1, t); Oleta.Tosi(k.nousu >= 54 && k.nousu <= 76, "keila taivaalle");
            }
            Oleta.Tosi(heittimia >= 3 && heittimia <= 8, $"30 min yötä: {heittimia} valonheitintä (harvoin)");
            Oleta.Tosi(maxKaanto < 6, $"hidas pyyhkäisy ({maxKaanto:F1} °/s)");
            var p2 = new ElavaTaivas(9); for (double t = 0; t < 1800; t += 0.5) { p2.Paivita(t, 0, 300, 0, true, false); Oleta.Tosi(p2.Valonheitin == null, "päivällä ei valonheittimiä"); }
        }
    }
}
