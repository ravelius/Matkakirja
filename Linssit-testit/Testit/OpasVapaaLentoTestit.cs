// Oppaan vapaa tila (omistaja 6.10.2026, juna 152): vasen tappi liikuttaa katsesuunnassa, oikea kääntää ja nostaa, kallistus
// korkeuden mukaan, maasto ei läpi.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    static class OpasVapaaLentoTestit
    {
        static double Tasainen(double lat, double lon) => 200;   // maa 200 m

        static OpasVapaaLento Alussa(double suunta = 0)
        {
            var l = new OpasVapaaLento();
            // Praha: katsepiste 50,087/14,421, 600 m:n päästä 60° kallistuksella.
            l.Aloita(new Kuvakulma(50.087, 14.421, 600, 60, suunta, 200), Tasainen);
            return l;
        }

        static void Aja(OpasVapaaLento l, double s, double vx, double vy, double ox, double oy)
        {
            for (double t = 0; t < s; t += 1 / 60.0) l.Paivita(1 / 60.0, vx, vy, ox, oy, Tasainen);
        }

        [Testi]
        static void AloitusKatsepisteestaTaaksepain()
        {
            var l = Alussa();
            Oleta.Tosi(Math.Abs(l.KorkeusM - 300) < 1, $"korkeus 600·cos60 = 300: {l.KorkeusM:0.0}");
            Oleta.Tosi(l.Lat < 50.087, $"kamera katsepisteen eteläpuolella (katse pohjoiseen): {l.Lat:0.0000}");
        }

        [Testi]
        static void EteenSuunnanMukaan()
        {
            var l = Alussa(90);   // katse itään
            double lon0 = l.Lon, lat0 = l.Lat;
            Aja(l, 3, 0, 1, 0, 0);
            // TF 167 (9.10.): vauhti 0,25 × korkeus (ennen 0,6): 3 s:ssa > 0,0012° (ennen 0,003°).
            Oleta.Tosi(l.Lon > lon0 + 0.0012 && Math.Abs(l.Lat - lat0) < 1e-4, $"itään: {l.Lon - lon0:0.0000}, lat {l.Lat - lat0:0.00000}");
            double lat1 = l.Lat;
            Aja(l, 2, 1, 0, 0, 0);   // sivulle oikealle = etelään, kun katse itään
            Oleta.Tosi(l.Lat < lat1 - 0.001, $"oikealle = etelään: {l.Lat - lat1:0.0000}");
        }

        [Testi]
        static void KaantoJaNousu()
        {
            var l = Alussa(0);
            double lat0 = l.Lat, lon0 = l.Lon;
            Aja(l, 1, 0, 0, 1, 0);
            Oleta.Tosi(l.Suunta > 0.55 * OpasVapaaLento.KaantoAstS && l.Suunta < OpasVapaaLento.KaantoAstS, $"kääntyy oikealle: {l.Suunta:0}° (TF 167: {OpasVapaaLento.KaantoAstS} °/s)");
            Oleta.Tosi(Math.Abs(l.Lat - lat0) < 1e-6 && Math.Abs(l.Lon - lon0) < 1e-6, "kääntö paikallaan");
            double h0 = l.KorkeusM;
            Aja(l, 2, 0, 0, 0, 1);
            Oleta.Tosi(l.KorkeusM > h0 * 1.3, $"nousee: {h0:0} → {l.KorkeusM:0} m (TF 167: nousu 0,21 × korkeus/s)");
            Oleta.Tosi(l.Kallistus < OpasVapaaLento.KallistusKorkeudelle(h0), "ylempänä jyrkemmin alas");
        }

        [Testi]
        static void RakennusNostaaEnnakolta()
        {
            // 150 m korkea rakennus 400–600 m kameran pohjoispuolella (pinta 200 + 150): matala lento pohjoiseen nousee yli ajoissa.
            var l = Alussa(0);
            Aja(l, 10, 0, 0, 0, -1);   // alas minimikorkeuteen (240 m)
            double lat0 = l.Lat;
            Func<double, double, double> pinta = (la, lo) => { double m = (la - lat0) * 111320; return m > 400 && m < 600 ? 350 : 200; };
            double minVali = double.MaxValue;
            for (double t = 0; t < 30; t += 1 / 60.0)
            {
                l.Paivita(1 / 60.0, 0, 1, 0, 0, pinta);
                double m = (l.Lat - lat0) * 111320;
                if (m > 400 && m < 600) minVali = Math.Min(minVali, l.KorkeusAbsM - 350);
            }
            Oleta.Tosi(minVali >= OpasVapaaLento.MinKorkeusM * 0.5, $"rakennuksen kohdalla vähintään 20 m katon yllä: {minVali:0} m");
        }

        [Testi]
        static void MaastoEiLapi()
        {
            var l = Alussa(0);
            Aja(l, 10, 0, 0, 0, -1);
            Oleta.Sama(OpasVapaaLento.MinKorkeusM, l.KorkeusM, "laskeutuu vain minimikorkeuteen");
            var k = l.Kuvakulma(Tasainen);
            Oleta.Tosi(k.KatseKorkeusM == 200 && k.EtaisyysM > OpasVapaaLento.MinKorkeusM, $"katse maassa: {k}");
        }

        [Testi]
        static void RistikkotorniKehalta()
        {
            // Kapea 300 m korkea torni 30 m kameran itäpuolella (vain 8 m leveä): pistenäyte kamerassa ei osu, kehä 20/45 m osuu.
            var l = Alussa(0);
            Aja(l, 10, 0, 0, 0, -1);
            double lat0 = l.Lat, lon0 = l.Lon, mLon = 111320 * Math.Cos(lat0 * Math.PI / 180);
            Func<double, double, double> pinta = (la, lo) =>
            {
                double x = (lo - lon0) * mLon - 30, y = (la - lat0) * 111320;
                return Math.Abs(x) < 25 && Math.Abs(y) < 25 ? 500 : 200;   // torni ±25 m (näyteruudun karkeus) kehän sisällä
            };
            for (double t = 0; t < 3; t += 1 / 60.0) l.Paivita(1 / 60.0, 0, 0, 0, 0, pinta);
            Oleta.Tosi(l.KorkeusAbsM >= 500 + OpasVapaaLento.MinKorkeusM * 0.9, $"torni naapurustossa → kamera sen yllä: {l.KorkeusAbsM:0} m");
        }

        [Testi]
        static void LuotainPysayttaaJaNostaa()
        {
            // Syvyysluotain (Eiffel, koe-152 14b): pistenäytteet näkevät vain maan (200 m), luotain näkee ristikon 25 m edessä.
            var l = Alussa(0);
            Func<double, double, double> maa = (la, lo) => 200;
            for (double t = 0; t < 1; t += 1 / 60.0) l.Paivita(1 / 60.0, 0, 0, 0, 0, maa);
            double h0 = l.KorkeusAbsM, lat0 = l.Lat;
            l.EsteM = 62;   // Eiffel-toisto 19.1x: ristikko 62 m:ssä täytti ruudun
            for (double t = 0; t < 2; t += 1 / 60.0) l.Paivita(1 / 60.0, 0, 1, 0, -1, maa);   // täysi eteen + alas
            double eteen = (l.Lat - lat0) * 111320;
            Oleta.Tosi(eteen < 5, $"este 62 m edessä → ei eteenpäin: {eteen:0.0} m");
            Oleta.Tosi(l.KorkeusAbsM > h0 + 5, $"este → nousu, ei laskua: {h0:0} → {l.KorkeusAbsM:0} m");
            Oleta.Tosi(Math.Abs(l.ToiveSuuntaEro) < 1, $"toive eteen: {l.ToiveSuuntaEro:0}°");
            // Taaksepäin toive kääntää luotaimen; kun luotain näkee taakse vapaata, liike sallitaan.
            l.Paivita(1 / 60.0, 0, -1, 0, 0, maa);
            Oleta.Tosi(Math.Abs(Math.Abs(l.ToiveSuuntaEro) - 180) < 1, $"toive taakse: {l.ToiveSuuntaEro:0}°");
            l.EsteM = double.PositiveInfinity; double lat1 = l.Lat;
            for (double t = 0; t < 1; t += 1 / 60.0) l.Paivita(1 / 60.0, 0, -1, 0, 0, maa);
            Oleta.Tosi((lat1 - l.Lat) * 111320 > 5, $"vapaa taakse → liikkuu: {(lat1 - l.Lat) * 111320:0} m");
        }

        [Testi]
        static void LuotainAllaNostaa()
        {
            // Ristikon taso 25 m kameran alla (pistenäyte osuu maahan): kamera nousee eikä laskeudu.
            var l = Alussa(0);
            Func<double, double, double> maa = (la, lo) => 35;
            for (double t = 0; t < 1; t += 1 / 60.0) l.Paivita(1 / 60.0, 0, 0, 0, -1, maa);
            double h0 = l.KorkeusAbsM; l.EsteAllaM = 25;
            for (double t = 0; t < 1; t += 1 / 60.0) l.Paivita(1 / 60.0, 0, 0, 0, -1, maa);
            Oleta.Tosi(l.KorkeusAbsM > h0 + 3, $"taso alla 25 m → nousu: {h0:0} → {l.KorkeusAbsM:0} m");
        }

        [Testi]
        static void LuotainKuvaErottaaMaanJaTornin()
        {
            const int W = 48, H = 32; const double fov = 100, alas = 35, korkeus = 40;
            double tanV = Math.Tan(fov * 0.5 * Math.PI / 180), tanH = tanV * W / H, ca = Math.Cos(alas * Math.PI / 180), sa = Math.Sin(alas * Math.PI / 180);
            // Tasainen maa 40 m alla: säde (sivu, ylös, eteen) osuu maahan kun ylös < 0; silmäsyvyys = t (kameran z).
            double[] Kuva(double tornissaM)
            {
                var z = new double[W * H];
                for (int y = 0; y < H; y++)
                    for (int x = 0; x < W; x++)
                    {
                        double nx = ((x + 0.5) / W * 2 - 1) * tanH, ny = ((y + 0.5) / H * 2 - 1) * tanV;
                        double ylos = ny * ca - sa, eteen = ca + ny * sa;   // per yksikkö silmäsyvyyttä
                        double t = ylos < 0 ? korkeus / -ylos : double.PositiveInfinity;
                        if (tornissaM > 0 && eteen > 0) t = Math.Min(t, tornissaM / eteen);   // pystyseinä eteen-etäisyydellä
                        z[y * W + x] = t > 400 ? double.PositiveInfinity : t;
                    }
                return z;
            }
            var maa = OpasLuotainKuva.Tulkitse(Kuva(0), W, H, fov, alas);
            Oleta.Tosi(double.IsInfinity(maa.vaaka), $"pelkkä maa 40 m alla ei ole vaakaeste: {maa.vaaka:0}");
            Oleta.Tosi(Math.Abs(maa.alla - korkeus) < 2, $"maa alla 40 m: {maa.alla:0}");
            Oleta.Tosi(maa.alaKeski < maa.ylaKeski || double.IsNaN(maa.ylaKeski), $"alarivit lähempänä: {maa.alaKeski:0} < {maa.ylaKeski:0}");
            var torni = OpasLuotainKuva.Tulkitse(Kuva(62), W, H, fov, alas);
            Oleta.Tosi(Math.Abs(torni.vaaka - 62) < 3, $"seinä 62 m edessä: {torni.vaaka:0}");
        }
    }
}
