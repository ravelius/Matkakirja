// ELÄVÄT HETKET: hiljaiset äänet (Linssiseppä 26.9.2026; elävän kartan suunnitelma §5: "ääni hiljainen (tuuli, laivan
// kello kaukana)"). Syntetisoidut kuten keksintöjen tehosteet, joten äänitiedostoja ja lisenssejä ei tarvita:
//   TUULI  ruskehtava kohina kaistanpäästön läpi; kaista liukuu ja voima nousee ja laskee hetken mittaan puuskittain
//   KELLO  laivan kello kaukana: kaksi lyöntiä (ding-ding), kellon epäharmoniset osasävelet, pitkä vaimeneminen ja
//          kaukaisuus alipäästönä; alla hiljainen tuuli
//   SADE   kohiseva suhina ja satunnaiset pisaranapsahdukset
//   JUNA   kaukaiset höyrypuhallukset (kohinapurskeet 3,2 Hz) hiljaisen tuulen päällä
// Tasot ovat keksinnön kilahduksen luokkaa (huippu alle 0,1): taustaa, ei tapahtuma. Loppu häivytetään nollaan.
using System;

namespace Matkakirja.Linssit.Aanet
{
    public static class HetkienAanet
    {
        public const string Tuuli = "hetki-tuuli", Laiva = "hetki-laiva", Sade = "hetki-sade", Juna = "hetki-juna";
        public const double KestoS = 3.2, HaivytysS = 0.3;
        public const int Muunnelmia = 3;
        /// <summary>Laivan kellon lyönnit (s) ja nimellinen perustaajuus (Hz).</summary>
        public const double EkaLyontiS = 0.35, TokaLyontiS = 0.75, KellonHz = 880;
        static readonly double[] KellonSuhteet = { 0.5, 1.0, 1.19, 1.5, 2.0, 2.52, 3.0 };
        static readonly double[] KellonVoimat = { 0.35, 1.0, 0.45, 0.3, 0.4, 0.18, 0.12 };
        static readonly double[] KellonKestot = { 2.2, 1.6, 1.0, 0.9, 0.7, 0.5, 0.4 };

        public static string[] Nimet => new[] { Tuuli, Laiva, Sade, Juna };

        public static float[] Syntetisoi(string nimi, int taajuus, uint siemen)
        {
            var arpa = new Random((int)(siemen & 0x7fffffff));
            var kohina = new Kohina(siemen);
            var ulos = new float[Synteesi.Naytteita(KestoS, taajuus)];
            switch (nimi)
            {
                case Laiva:
                    Tuulta(ulos, taajuus, kohina, arpa, 0.5);
                    Kello(ulos, taajuus, EkaLyontiS, arpa);
                    Kello(ulos, taajuus, TokaLyontiS, arpa);
                    break;
                case Sade: Satoa(ulos, taajuus, kohina, arpa); break;
                case Juna:
                    Tuulta(ulos, taajuus, kohina, arpa, 0.45);
                    Puhalluksia(ulos, taajuus, kohina, arpa);
                    break;
                default: Tuulta(ulos, taajuus, kohina, arpa, 1); break;
            }
            Haivyta(ulos, taajuus);
            return ulos;
        }

        /// <summary>Hetken kaari 0–1–0 (pehmeä nousu ja lasku koko keston yli).</summary>
        static double Kaari(double t) => t <= 0 || t >= KestoS ? 0 : Math.Pow(Math.Sin(Math.PI * t / KestoS), 1.5);

        static void Tuulta(float[] ulos, int taajuus, Kohina kohina, Random arpa, double voima)
        {
            var s = new Biquad();
            double v1 = arpa.NextDouble() * 6.3, v2 = arpa.NextDouble() * 6.3, ruskea = 0;
            for (int n = 0; n < ulos.Length; n++)
            {
                double t = (double)n / taajuus;
                if (n % 64 == 0) s.Aseta(Suodin.Kaistanpaasto, 300 + 260 * Math.Sin(Math.PI * t / KestoS) + 70 * Math.Sin(2 * Math.PI * 0.7 * t + v1), 0.8, taajuus);
                ruskea = 0.97 * ruskea + 0.03 * kohina.Seuraava() * 6;
                double puuska = 0.78 + 0.22 * Math.Sin(2 * Math.PI * 0.45 * t + v2);
                ulos[n] += (float)(s.Suodata((float)ruskea) * 0.05 * voima * Kaari(t) * puuska);
            }
        }

        static void Kello(float[] ulos, int taajuus, double alkuS, Random arpa)
        {
            double f0 = Synteesi.Heita(KellonHz, arpa.NextDouble()), g = Synteesi.Heita(0.03, arpa.NextDouble(), 0.1);
            int alku = Synteesi.Naytteita(alkuS, taajuus);
            for (int i = 0; i < KellonSuhteet.Length; i++)
            {
                double f = f0 * KellonSuhteet[i];
                // Kaukaisuus: ylemmät osasävelet vaimenevat matkalla (alipäästö noin 2,4 kHz:ssä).
                double a = g * KellonVoimat[i] / (1 + Math.Pow(f / 2400, 2)), tau = KellonKestot[i] / 4.6, w = 2 * Math.PI * f;
                for (int n = alku; n < ulos.Length; n++)
                {
                    double t = (double)(n - alku) / taajuus;
                    double verho = Math.Min(1, t / 0.003) * Math.Exp(-t / tau);
                    if (verho < 1e-5 && t > 0.01) break;
                    ulos[n] += (float)(a * verho * Math.Sin(w * t));
                }
            }
        }

        static void Satoa(float[] ulos, int taajuus, Kohina kohina, Random arpa)
        {
            var yli = new Biquad();
            yli.Aseta(Suodin.Ylipaasto, 1500, 0.7, taajuus);
            var kaista = new Biquad();
            kaista.Aseta(Suodin.Kaistanpaasto, 4200, 0.9, taajuus);
            for (int n = 0; n < ulos.Length; n++)
            {
                double t = (double)n / taajuus;
                float x = kohina.Seuraava();
                ulos[n] += (float)((yli.Suodata(x) * 0.5 + kaista.Suodata(x) * 0.5) * 0.035 * Kaari(t));
            }
            // Pisarat: noin 40 sekunnissa, lyhyitä kaistanpäästettyjä napsahduksia satunnaisilla taajuuksilla.
            int pisaroita = (int)(40 * KestoS);
            for (int i = 0; i < pisaroita; i++)
            {
                double t0 = arpa.NextDouble() * KestoS, hz = 2000 + arpa.NextDouble() * 4000, g = 0.02 + arpa.NextDouble() * 0.03;
                var s = new Biquad();
                s.Aseta(Suodin.Kaistanpaasto, hz, 4, taajuus);
                int alku = Synteesi.Naytteita(t0, taajuus), pituus = Synteesi.Naytteita(0.006, taajuus);
                for (int n = alku; n < Math.Min(ulos.Length, alku + pituus * 3); n++)
                {
                    double u = (double)(n - alku) / pituus;
                    ulos[n] += (float)(s.Suodata(n - alku < pituus ? kohina.Seuraava() : 0f) * g * Kaari(t0) * Math.Exp(-u));
                }
            }
        }

        static void Puhalluksia(float[] ulos, int taajuus, Kohina kohina, Random arpa)
        {
            var s = new Biquad();
            s.Aseta(Suodin.Alipaasto, 650, 0.7, taajuus);
            double vali = 1 / Synteesi.Heita(3.2, arpa.NextDouble(), 0.08), vaihe = arpa.NextDouble() * vali;
            for (int n = 0; n < ulos.Length; n++)
            {
                double t = (double)n / taajuus, u = (t + vaihe) % vali;
                double verho = Math.Min(1, u / 0.012) * Math.Exp(-u / 0.09);
                ulos[n] += (float)(s.Suodata(kohina.Seuraava()) * 0.1 * verho * Kaari(t));
            }
        }

        /// <summary>Viimeiset HaivytysS nollaan (ei napsausta lopussa) ja ensimmäiset 5 ms nollasta.</summary>
        static void Haivyta(float[] ulos, int taajuus)
        {
            int loppu = Synteesi.Naytteita(HaivytysS, taajuus), alku = Synteesi.Naytteita(0.005, taajuus);
            for (int i = 0; i < Math.Min(alku, ulos.Length); i++) ulos[i] *= (float)i / alku;
            for (int i = 0; i < Math.Min(loppu, ulos.Length); i++) ulos[ulos.Length - 1 - i] *= (float)i / loppu;
        }
    }
}
