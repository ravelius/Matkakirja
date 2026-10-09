// KAUPUNGIN YMPÄRISTÖVALO OMILLE MALLEILLE JA VENEILLE (Linssiseppä 2, 9.10.2026; PT: junaan 171, "ruskeat ja pahvimaiset
// varjosivut"). Googlen laatoissa valo on leivottu (unlit), mutta omat mallit (CesiumDefaultTilesetShader) ja veneet valaistaan
// auringolla + ympäristövalolla, joka oli kartan tasainen lämmin ambientti (Aurinko.Kompensoi). Kaupunkinäkymässä se jaetaan
// kolmeen (Unityn Trilight): taivas (viileä, kirkas), horisontti (neutraali, kirkkaampi) ja maa (lämmin heijastus, tumma).
// Pohja on kartan ambientti samassa ruudussa (yö/päivä ja kompensointi säilyvät); tämä vain jakaa sen suunnittain.
using System;

namespace Matkakirja.Linssit.Ilmakeha
{
    public static class YmparistoValo
    {
        /// <summary>Kertoimet pohjan luminanssiin: päivällä (aurinko ≥ 10°) ja yöllä (≤ −6°), välillä liukuen.</summary>
        public const double TaivasPaiva = 2.0, TaivasYo = 1.15, HorisonttiPaiva = 1.6, HorisonttiYo = 1.0, MaaPaiva = 0.6, MaaYo = 0.45;
        static readonly double[] SiniPaiva = { 0.80, 0.92, 1.18 }, SiniYo = { 0.70, 0.85, 1.30 }, Harmaa = { 0.97, 0.99, 1.04 },
            Lammin = { 1.08, 0.98, 0.85 };

        public static double Paivaosuus(double aurinkoAst) { double t = Math.Max(0, Math.Min(1, (aurinkoAst + 6) / 16)); return t * t * (3 - 2 * t); }

        /// <summary>Taivas, horisontti ja maa lineaarisena RGB:nä pohja-ambientista (lineaarinen RGB), auringon korkeudesta (°) ja
        /// pilvisyydestä 0–1 (pilvisellä taivas harmaampi).</summary>
        public static (double[] taivas, double[] horisontti, double[] maa) Laske(double r, double g, double b, double aurinkoAst, double pilvisyys)
        {
            double L = 0.2126 * r + 0.7152 * g + 0.0722 * b, p = Paivaosuus(aurinkoAst), pil = Math.Max(0, Math.Min(1, pilvisyys));
            double kt = Lerp(TaivasYo, TaivasPaiva, p), kh = Lerp(HorisonttiYo, HorisonttiPaiva, p), km = Lerp(MaaYo, MaaPaiva, p);
            var taivas = new double[3]; var horisontti = new double[3]; var maa = new double[3];
            for (int i = 0; i < 3; i++)
            {
                double sini = Lerp(SiniYo[i], SiniPaiva[i], p);
                taivas[i] = L * kt * Lerp(sini, Harmaa[i], pil * 0.7);
                // Horisontti (pystyseinät) neutraalin viileänä, ei kartan lämmintä sävyä (kuvapari 9.10. 08.3x: julkisivu +4–7 RGB, yhä ruskea).
                horisontti[i] = L * kh * Harmaa[i];
                maa[i] = L * km * Lammin[i];
            }
            return (taivas, horisontti, maa);
        }

        static double Lerp(double a, double b, double t) => a + (b - a) * t;
    }
}
