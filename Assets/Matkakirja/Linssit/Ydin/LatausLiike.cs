// LATAUSKUVAN LIIKE (Natiivi-UI 8.10.2026; omistaja 8.10. ~08.5x "Lataus kuvista pitää tehdä kevyesti animoituja … pallo heiluu
// hitaasti ruudulla ja köysi piirretään vektorina", Päätoimittaja: uusi pohja LATAUSKUVA). Puhdas ydin UI:n Latauskuva-pohjalle:
// liikkuvan kerroksen asento ajan funktiona (sinimuotoinen heilahdus ja pieni nousu–lasku neljännesjakson edellä, ei nykimistä;
// omistaja 8.10. 08.4x "heilunnaksi riittää hyvin vähäeleinen liike": ±0,5–0,75°, nousu ≤ 4 pt, jakso 7–8 s) ja köyden pisteet
// (kiintopiste → kerroksen mukana liikkuva kiinnityspiste, riippuma; myös ankkuriköysi korista maahan).
// Koordinaatit UI Toolkitin mukaan: y alas, positiivinen kulma myötäpäivään (style.rotate), nousu ylös (translate −y).
using System;

namespace Matkakirja.Linssit
{
    public static class LatausLiike
    {
        /// <summary>Pohjan rajat (tyylikirja pohjat.LATAUSKUVA; omistaja 8.10. 08.4x vähäeleinen): heilahdus ±0,5–0,75°, jakso 7–8 s,
        /// nousu 0–4 pt.</summary>
        public const double KulmaMin = 0.5, KulmaMax = 0.75, JaksoMin = 7, JaksoMax = 8, NousuMax = 4;

        public struct Profiili
        {
            /// <summary>Heilahduksen amplitudi (°), nousun amplitudi (pt), jakso (s) ja vaihe (rad; kerrokset eri tahtiin).</summary>
            public double KulmaAste, NousuPt, JaksoS, Vaihe;

            /// <summary>Oletus: ±0,6°, nousu 3 pt, jakso 7,5 s.</summary>
            public static Profiili Oletus => new Profiili { KulmaAste = 0.6, NousuPt = 3, JaksoS = 7.5 };

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

        /// <summary>Suurin kulmanopeus (°/s) profiililla: 2π·A/T (pohjan rajoilla enintään noin 0,67 °/s).</summary>
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

        /// <summary>Valokuvan hidas lähentyminen (Ken Burns, Päätoimittaja 8.10.): 1,00 → 1,04 / 8 s, sitten pehmeästi takaisin.</summary>
        public const double LahentyminenMaks = 1.04, LahentyminenS = 8;

        public struct Rajaus
        {
            /// <summary>Kuvan skaala (≥ 1) ja rajauksen ankkuri 0–1 (CSS background-position -prosentti: 0,5 = keskellä).</summary>
            public double Skaala, AnkkuriX, AnkkuriY;
        }

        /// <summary>
        /// Lähentyminen hetkellä t: u = (1 − cos(π t / 8 s)) / 2 kulkee 0 → 1 → 0 ilman hyppyä (jatkuva derivaatta); skaala 1 + 0,04·u ja
        /// ankkuri keskeltä suuntaan (sx, sy ∈ −1…1) u:n mukana, jolloin kuva liukuu ylimenevän 4 %:n verran.
        /// </summary>
        public static Rajaus Lahentyminen(double t, double sx, double sy)
        {
            double u = (1 - Math.Cos(Math.PI * Math.Max(0, t) / LahentyminenS)) / 2;
            sx = Math.Max(-1, Math.Min(1, double.IsNaN(sx) ? 0 : sx)); sy = Math.Max(-1, Math.Min(1, double.IsNaN(sy) ? 0 : sy));
            return new Rajaus { Skaala = 1 + (LahentyminenMaks - 1) * u, AnkkuriX = 0.5 + 0.5 * sx * u, AnkkuriY = 0.5 + 0.5 * sy * u };
        }

        /// <summary>Liikkeen suunta kuvan tunnisteesta (sama kuva → sama suunta): yksi neljästä vinosuunnasta.</summary>
        public static (double X, double Y) Suunta(string tunniste)
        {
            int h = 17;
            if (tunniste != null) foreach (char c in tunniste) h = unchecked(h * 31 + c);
            int i = (h & 0x7fffffff) % 4;
            return (i % 2 == 0 ? 0.8 : -0.8, i < 2 ? 0.6 : -0.6);
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
