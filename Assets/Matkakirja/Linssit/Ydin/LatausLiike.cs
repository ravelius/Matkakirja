// LATAUSKUVAN LIIKE (Natiivi-UI 8.10.2026; omistaja 8.10. ~08.5x "Lataus kuvista pitää tehdä kevyesti animoituja … pallo heiluu
// hitaasti ruudulla ja köysi piirretään vektorina", Päätoimittaja: uusi pohja LATAUSKUVA). Puhdas ydin UI:n Latauskuva-pohjalle:
// liikkuvan kerroksen asento ajan funktiona (sinimuotoinen heilahdus ±1–2° ja pieni nousu–lasku neljännesjakson edellä, jakso
// 6–8 s, ei nykimistä) ja köyden pisteet (kiintopiste → kerroksen mukana liikkuva kiinnityspiste, kevyt riippuma).
// Koordinaatit UI Toolkitin mukaan: y alas, positiivinen kulma myötäpäivään (style.rotate), nousu ylös (translate −y).
using System;

namespace Matkakirja.Linssit
{
    public static class LatausLiike
    {
        /// <summary>Pohjan rajat (tyylikirja pohjat.LATAUSKUVA): heilahdus ±1–2°, jakso 6–8 s, nousu 0–8 pt.</summary>
        public const double KulmaMin = 1, KulmaMax = 2, JaksoMin = 6, JaksoMax = 8, NousuMax = 8;

        public struct Profiili
        {
            /// <summary>Heilahduksen amplitudi (°), nousun amplitudi (pt), jakso (s) ja vaihe (rad; kerrokset eri tahtiin).</summary>
            public double KulmaAste, NousuPt, JaksoS, Vaihe;

            /// <summary>Oletus: ±1,5°, nousu 4 pt, jakso 7 s.</summary>
            public static Profiili Oletus => new Profiili { KulmaAste = 1.5, NousuPt = 4, JaksoS = 7 };

            /// <summary>Arvot pohjan rajoihin (ulkopuoliset tai puuttuvat arvot eivät tee liikkeestä nykivää tai pysähtynyttä).</summary>
            public Profiili Rajattu() => new Profiili
            {
                KulmaAste = Rajaa(Math.Abs(KulmaAste), KulmaMin, KulmaMax),
                NousuPt = Rajaa(Math.Abs(NousuPt), 0, NousuMax),
                JaksoS = Rajaa(JaksoS, JaksoMin, JaksoMax),
                Vaihe = double.IsNaN(Vaihe) || double.IsInfinity(Vaihe) ? 0 : Vaihe,
            };

            static double Rajaa(double v, double a, double b) => double.IsNaN(v) ? a : Math.Max(a, Math.Min(b, v));
        }

        public struct Asento
        {
            /// <summary>Kierto (°, + myötäpäivään) ja nousu (pt, + ylös).</summary>
            public double KulmaAste, NousuPt;
        }

        /// <summary>Asento hetkellä t (s): kulma = A·sin(ωt + φ), nousu = B·cos(ωt + φ) (heiluri: ylimmillään keskellä).</summary>
        public static Asento Tila(Profiili p, double t)
        {
            var q = p.Rajattu();
            double v = 2 * Math.PI / q.JaksoS * t + q.Vaihe;
            return new Asento { KulmaAste = q.KulmaAste * Math.Sin(v), NousuPt = q.NousuPt * Math.Cos(v) };
        }

        /// <summary>Suurin kulmanopeus (°/s) profiililla: 2π·A/T (pohjan rajoilla enintään noin 2,1 °/s).</summary>
        public static double SuurinKulmanopeus(Profiili p) { var q = p.Rajattu(); return 2 * Math.PI * q.KulmaAste / q.JaksoS; }

        /// <summary>
        /// Kerroksen piste (x, y; samoissa yksiköissä kuin kääntöpiste) asennossa a: kierto kääntöpisteen ympäri myötäpäivään
        /// (y alas) ja nousu ylös.
        /// </summary>
        public static (double X, double Y) Muunna(double x, double y, double kaantoX, double kaantoY, Asento a)
        {
            double r = a.KulmaAste * Math.PI / 180, c = Math.Cos(r), s = Math.Sin(r);
            double dx = x - kaantoX, dy = y - kaantoY;
            return (kaantoX + dx * c - dy * s, kaantoY + dx * s + dy * c - a.NousuPt);
        }

        /// <summary>
        /// Köyden neliöllisen Bézier-käyrän ohjauspiste: päiden puoliväli siirrettynä alas riippuma × köyden pituus (y alas).
        /// Riippuma 0 = suora viiva.
        /// </summary>
        public static (double X, double Y) Ohjauspiste(double x0, double y0, double x1, double y1, double riippuma)
        {
            double pituus = Math.Sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
            return ((x0 + x1) / 2, (y0 + y1) / 2 + Math.Max(0, riippuma) * pituus);
        }
    }
}
