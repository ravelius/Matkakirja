// PALLON KORIN VALAISTUS KAUPUNGIN VALOSTA (Linssiseppä 8.10.2026; omistaja 19.5x "Tee ja ota käyttöön kaikki mahdolliset grafiikan
// parannukset", Päätoimittaja: pallo Unreal-tasolle, kohta 1): kori ja köydet piirretään omalla kameralla ilman kaupungin valoja ja
// jälkikäsittelyä, joten niiden valo lasketaan tässä kaupunkinäkymän vuorokausisävystä (KaupunkiValo: auringon korkeus ja
// atsimuutti, taivaan laki ja horisontti) ja säästä (harmaus): aurinko lämpenee matalalla ja hiipuu horisontin alle, ambient tulee
// taivaalta ylhäältä ja maasta (horisontin sävy) alhaalta, sää harmaannuttaa ja himmentää. Yöllä pohja-ambient pitää korin
// näkyvissä; polttimen valo (kohta 2) lisätään varjostimessa. Suunnat ENU: x itä, y ylös, z pohjoinen (kaupunkinäkymän Unity-maailma).
// Puhdas C#: Linssit-testit (KoriValaistusTestit).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class KoriValaistus
    {
        public struct Tulos
        {
            public double AurinkoX, AurinkoY, AurinkoZ;   // yksikkövektori kohti aurinkoa (ENU)
            public double[] AurinkoVari, TaivasYla, TaivasAla;   // lineaarinen RGB
        }

        public const double AurinkoVoima = 0.65, YlaVoima = 0.55, AlaVoima = 0.32, YoPohja = 0.05;

        /// <summary>Kaupungin valo korille: aurinko (korkeus ja atsimuutti asteina), taivaan laki ja horisontti (RGB 0–1), sään harmaus 0–1.</summary>
        public static Tulos Laske(double korkeusAst, double atsimuuttiAst, double[] laki, double[] horisontti, double harmaus)
        {
            double A = Math.PI / 180, el = korkeusAst * A, az = atsimuuttiAst * A, h = Raja(harmaus);
            var t = new Tulos { AurinkoX = Math.Sin(az) * Math.Cos(el), AurinkoY = Math.Sin(el), AurinkoZ = Math.Cos(az) * Math.Cos(el) };
            double voima = Smooth(-2, 10, korkeusAst) * (1 - 0.75 * h);
            double lampo = 1 - Smooth(5, 30, korkeusAst);
            t.AurinkoVari = new double[3];
            double[] valko = { 1, 1, 0.97 }, ilta = { 1, 0.72, 0.45 };
            for (int i = 0; i < 3; i++) t.AurinkoVari[i] = (valko[i] + (ilta[i] - valko[i]) * lampo) * AurinkoVoima * voima;
            t.TaivasYla = new double[3]; t.TaivasAla = new double[3];
            double lk = Luma(laki), hk = Luma(horisontti);
            for (int i = 0; i < 3; i++)
            {
                double yla = Lerp(laki[i], lk, 0.5 * h), ala = Lerp(horisontti[i], hk, 0.5 * h);
                t.TaivasYla[i] = Math.Max(YoPohja, yla * YlaVoima);
                t.TaivasAla[i] = Math.Max(YoPohja * 0.6, ala * AlaVoima);
            }
            return t;
        }

        static double Luma(double[] c) => 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
        static double Lerp(double a, double b, double t) => a + (b - a) * t;
        static double Raja(double x) => Math.Max(0, Math.Min(1, x));
        static double Smooth(double a, double b, double x) { double t = Raja((x - a) / (b - a)); return t * t * (3 - 2 * t); }
    }
}
