// LATAUSKUVAN LIIKE (Natiivi-UI 8.10.2026; omistaja 8.10. ~08.5x "Lataus kuvista pitää tehdä kevyesti animoituja … pallo heiluu
// hitaasti ruudulla ja köysi piirretään vektorina", Päätoimittaja: uusi pohja LATAUSKUVA). Puhdas ydin UI:n Latauskuva-pohjalle:
// liikkuvan kerroksen asento ajan funktiona (sinimuotoinen heilahdus ja pieni nousu–lasku neljännesjakson edellä, ei nykimistä;
// omistaja 8.10. 08.4x "heilunnaksi riittää hyvin vähäeleinen liike": ±0,5–0,75°, nousu ≤ 4 pt, jakso 7–8 s) ja köyden pisteet
// (kiintopiste → kerroksen mukana liikkuva kiinnityspiste, riippuma; myös ankkuriköysi korista maahan).
// TUULI (omistaja 10.10.2026 16.5x Pariisin latauskuvasta: "kuumailmapallon köysi pitää taipua aidosti ja pallo pitää liikkua
// selkeästi tuulessa heiluen"; PT: kumoaa pallon osalta vähäeleisen linjan): Profiili.Tuuli = kallistus ±2–3°, sivuliike ±10–15 pt,
// jakso 5–7 s, puuskat (kolmen siniaallon summa, sileä: ei nykimistä) ja viive (kori seuraa palloa). Ankkuriköysi ketjukäyränä
// (Ketjukayra): vakiopituinen köysi, jonka painuma ja kaari seuraavat korin paikkaa joka ruudussa.
// Koordinaatit UI Toolkitin mukaan: y alas, positiivinen kulma myötäpäivään (style.rotate), nousu ylös (translate −y).
using System;

namespace Matkakirja.Linssit
{
    public static class LatausLiike
    {
        /// <summary>Pohjan rajat (tyylikirja pohjat.LATAUSKUVA; omistaja 8.10. 08.4x vähäeleinen): heilahdus ±0,5–0,75°, jakso 7–8 s,
        /// nousu 0–4 pt.</summary>
        public const double KulmaMin = 0.5, KulmaMax = 0.75, JaksoMin = 7, JaksoMax = 8, NousuMax = 4;

        /// <summary>Tuuliprofiilin rajat (omistaja 10.10. 16.5x, kuumailmapallo): kallistus ±2–3°, sivuliike ±10–15 pt, jakso 5–7 s.</summary>
        public const double TuuliKulmaMin = 2, TuuliKulmaMax = 3, TuuliSivuMin = 10, TuuliSivuMax = 15, TuuliJaksoMin = 5, TuuliJaksoMax = 7,
            ViiveMax = 1.5;

        public struct Profiili
        {
            /// <summary>Heilahduksen amplitudi (°), nousun amplitudi (pt), jakso (s) ja vaihe (rad; kerrokset eri tahtiin).</summary>
            public double KulmaAste, NousuPt, JaksoS, Vaihe;

            /// <summary>Tuuliliike (TUULI): sivuliike SivuPt, puuskat (0–1: kahden lisäaallon paino) ja viive (s; sama tuuli myöhemmin:
            /// kori seuraa palloa). Kaikki tuulikerrokset käyttävät samaa tuulta (Vaihe ei koske tuulta, jotta kori ja pallo pysyvät yhdessä).</summary>
            public bool Tuuli;
            public double SivuPt, Puuska, ViiveS;

            /// <summary>Oletus: ±0,6°, nousu 3 pt, jakso 7,5 s.</summary>
            public static Profiili Oletus => new Profiili { KulmaAste = 0.6, NousuPt = 3, JaksoS = 7.5 };

            /// <summary>Arvot pohjan rajoihin (ulkopuoliset tai puuttuvat arvot eivät tee liikkeestä nykivää tai pysähtynyttä).</summary>
            public Profiili Rajattu() => Tuuli ? new Profiili
            {
                Tuuli = true,
                KulmaAste = Rajaa(Math.Abs(KulmaAste), TuuliKulmaMin * 0.5, TuuliKulmaMax),   // kori saa kallistua palloa vähemmän
                SivuPt = Rajaa(Math.Abs(SivuPt), TuuliSivuMin, TuuliSivuMax),
                NousuPt = Rajaa(Math.Abs(NousuPt), 0, NousuMax),
                JaksoS = Rajaa(JaksoS, TuuliJaksoMin, TuuliJaksoMax),
                Puuska = Rajaa(Puuska, 0, 1),
                ViiveS = Rajaa(ViiveS, 0, ViiveMax),
            } : new Profiili
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
            /// <summary>Kierto (°, + myötäpäivään), nousu (pt, + ylös) ja sivuliike (pt, + oikealle; vain tuulessa).</summary>
            public double KulmaAste, NousuPt, SivuPt;
        }

        /// <summary>Asento hetkellä t (s): kulma = A·sin(ωt + φ), nousu = B·cos(ωt + φ) (heiluri: ylimmillään keskellä).</summary>
        public static Asento Tila(Profiili p, double t)
        {
            var q = p.Rajattu();
            if (q.Tuuli)
            {
                // Tuuli kallistaa ja työntää samaan suuntaan (kallistus myötätuuleen: + oikealle = myötäpäivään); nousu neljännesjakson
                // edellä kuten heilurissa.
                double tt = t - q.ViiveS, w = Tuulivoima(tt, q.JaksoS, q.Puuska), wn = Tuulivoima(tt + q.JaksoS / 4, q.JaksoS, q.Puuska);
                return new Asento { KulmaAste = q.KulmaAste * w, SivuPt = q.SivuPt * w, NousuPt = q.NousuPt * wn };
            }
            double v = 2 * Math.PI / q.JaksoS * t + q.Vaihe;
            return new Asento { KulmaAste = q.KulmaAste * Math.Sin(v), NousuPt = q.NousuPt * Math.Cos(v) };
        }

        /// <summary>
        /// Tuulen voima −1…1 hetkellä t: perusaalto (jakso T) + puuskat (kaksi epäsuhtaista lisäaaltoa 1,9× ja 3,7× taajuudella, paino
        /// puuska): sileä (jatkuva derivaatta), ei toistu tarkasti perusjakson välein, normitettu niin, ettei |w| ylitä 1.
        /// </summary>
        public static double Tuulivoima(double t, double jaksoS, double puuska)
        {
            double v = 2 * Math.PI / Math.Max(0.1, jaksoS) * t, a = 0.35 * puuska, b = 0.18 * puuska;
            return (Math.Sin(v) + a * Math.Sin(1.9 * v + 0.7) + b * Math.Sin(3.7 * v + 2.1)) / (1 + a + b);
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
            return (kaantoX + dx * c - dy * s + a.SivuPt, kaantoY + dx * s + dy * c - a.NousuPt);
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
        /// Peittävä sovitus (aspect-fill, omistaja 8.10.: kierrossa ei mustia palkkeja): kuva (kuvasuhde l/k) peittää ruudun w × h
        /// kokonaan; vaakasuunnassa keskitetty, pystysuunnassa keskitetty tai, jos ylaOsuus ≥ 0, kuvan yläreuna −ylaOsuus × korkeus
        /// (leveä vaakaruutu: pallon kupu näkyviin), kuitenkin niin, ettei alareuna nouse ruudun alareunan yläpuolelle.
        /// </summary>
        public static (double X, double Y, double L, double K) Peita(double w, double h, double kuvasuhde, double ylaOsuus = -1)
        {
            w = Math.Max(1, w); h = Math.Max(1, h);
            if (!(kuvasuhde > 0) || double.IsInfinity(kuvasuhde)) kuvasuhde = w / h;
            double l = Math.Max(w, h * kuvasuhde), k = l / kuvasuhde;
            double y = ylaOsuus >= 0 ? Math.Max(-ylaOsuus * k, h - k) : (h - k) / 2;
            return ((w - l) / 2, y, l, k);
        }

        /// <summary>Latauskuvan rajaus ruudulle: 0 = puhelin pysty, 1 = iPad pysty, 2 = vaaka (myös puhelin vaaka).</summary>
        public static int Rajausindeksi(double w, double h) =>
            w > h ? 2 : Math.Min(w, h) / Math.Max(Math.Max(w, h), 1) >= 0.6 ? 1 : 0;

        /// <summary>
        /// KETJUKÄYRÄ (ankkuriköysi, omistaja 10.10. 16.5x "köysi pitää taipua aidosti"): vakiopituinen köysi pisteestä (x0, y0) pisteeseen
        /// (x1, y1) (y alas) riippuu painovoiman suuntaan, n + 1 pistettä. Pituus ≤ päiden etäisyys → suora (kireä köysi). Lähes
        /// pystysuora köysi (vaakaväli alle 0,5) ratkaistaan pienellä sivuvälillä, jotta käyrä ei hajoa.
        /// Ratkaisu: sqrt(L² − v²) = 2a·sinh(h / 2a) puolitushaulla, sitten y = a·cosh((x − xm)/a) + c (y ylös).
        /// </summary>
        public static (double X, double Y)[] Ketjukayra(double x0, double y0, double x1, double y1, double pituus, int n = 24)
        {
            n = Math.Max(2, n);
            var p = new (double X, double Y)[n + 1];
            double d = Math.Sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
            if (!(pituus > d * 1.0005) || d <= 0)
            {
                for (int i = 0; i <= n; i++) { double u = (double)i / n; p[i] = (x0 + (x1 - x0) * u, y0 + (y1 - y0) * u); }
                return p;
            }
            // y ylös, vasen pää ensin.
            bool kaanna = x1 < x0;
            double ax = kaanna ? x1 : x0, ay = -(kaanna ? y1 : y0), bx = kaanna ? x0 : x1, by = -(kaanna ? y0 : y1);
            double h = Math.Max(0.5, bx - ax), v = by - ay;
            double k = Math.Sqrt(pituus * pituus - v * v) / h;   // sinh(z)/z = k, z = h / 2a
            double lo = 1e-6, hi = 1;
            while (Math.Sinh(hi) / hi < k) hi *= 2;
            for (int i = 0; i < 80; i++) { double m = (lo + hi) / 2; if (Math.Sinh(m) / m < k) lo = m; else hi = m; }
            double a = h / (2 * (lo + hi) / 2);
            // Keskikohta xm: v = a(cosh((h − xm)/a) − cosh(−xm/a)) → xm = h/2 − a·asinh(v / (2a·sinh(h/2a))).
            double xm = h / 2 - a * Asinh(v / (2 * a * Math.Sinh(h / (2 * a))));
            double c = ay - a * Math.Cosh(-xm / a);
            for (int i = 0; i <= n; i++)
            {
                double u = (double)i / n, x = h * u;
                double y = a * Math.Cosh((x - xm) / a) + c;
                // Sivuväli alle 0,5: x skaalataan takaisin todelliseen väliin (käyrä pysyy päissä).
                double xx = ax + (bx - ax) * u;
                p[kaanna ? n - i : i] = (xx, -y);
            }
            p[kaanna ? n : 0] = (ax, -ay); p[kaanna ? 0 : n] = (bx, -by);
            return p;
        }

        static double Asinh(double x) => Math.Log(x + Math.Sqrt(x * x + 1));

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
