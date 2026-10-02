// ISS-KAMERA: julisteen tekniset tiedot (omistaja 1.10.2026 Päätoimittajan kautta: "400 mm · f/8 · 1/1000 s · ISO 200" —
// realistisesti kuvaputken valotusmallista, ei laitemerkkejä). Malli:
//   näkymän valoisuus EV100  auringon korkeudesta kohteessa: täysi päivä 15 (≥ 30°), matalalla 13 (10°), laskussa 10 (0°),
//                            porvarillinen hämärä 6 (−6°), yö ja kaupunkien valot 3 (≤ −12°), välit lineaarisesti
//   liike                    maa liikkuu ISS:stä katsottuna ~7,2 km/s; kulmanopeus ω = v / etäisyys. Kenno 36 mm / 6000 px
//                            (6 µm): aika ≤ (6 µm / polttoväli) / ω, jottei liike-epäterävyys ylitä pikseliä
//   aukko                    f/8 pitkillä (≥ 200 mm), f/5.6 keskipitkillä, f/4 laajoilla; yöllä avataan kunnes ISO ≤ 6400
//   ISO                      100 · 2^(EV(aukko, aika) − EV100 − kompensaatio), pyöristys standardisarjaan (1/3 EV)
// Pelaajan valotussäätö (Kyytipino.Valotus − 0,5 EV) on kompensaatio: kirkkaampi kuva = pidempi aika tai korkeampi ISO.
using System;

namespace Matkakirja.Linssit.IssKamera
{
    public static class Valotus
    {
        static readonly double[] Ajat = { 1.0 / 8000, 1.0 / 6400, 1.0 / 5000, 1.0 / 4000, 1.0 / 3200, 1.0 / 2500, 1.0 / 2000, 1.0 / 1600,
            1.0 / 1250, 1.0 / 1000, 1.0 / 800, 1.0 / 640, 1.0 / 500, 1.0 / 400, 1.0 / 320, 1.0 / 250, 1.0 / 200, 1.0 / 160, 1.0 / 125,
            1.0 / 100, 1.0 / 80, 1.0 / 60, 1.0 / 50, 1.0 / 40, 1.0 / 30, 1.0 / 25, 1.0 / 20, 1.0 / 15, 1.0 / 13, 1.0 / 10, 1.0 / 8 };
        static readonly int[] Isot = { 100, 125, 160, 200, 250, 320, 400, 500, 640, 800, 1000, 1250, 1600, 2000, 2500, 3200, 4000,
            5000, 6400, 8000, 10000, 12800, 16000, 20000, 25600 };
        static readonly double[] Aukot = { 2.8, 4, 5.6, 8 };

        /// <summary>Näkymän valoisuus (EV100) auringon korkeudesta kohteessa (astetta).</summary>
        public static double Ev100(double aurinko)
        {
            double[] k = { -12, -6, 0, 10, 30 }, e = { 3, 6, 10, 13, 15 };
            if (aurinko <= k[0]) return e[0];
            if (aurinko >= k[4]) return e[4];
            for (int i = 0; i < 4; i++)
                if (aurinko <= k[i + 1]) return e[i] + (e[i + 1] - e[i]) * (aurinko - k[i]) / (k[i + 1] - k[i]);
            return e[4];
        }

        /// <summary>(aukko, aika s, ISO) polttovälille (mm), etäisyydelle kohteeseen (km), auringon korkeudelle ja kompensaatiolle (EV).</summary>
        public static (double aukko, double aika, int iso) Laske(double mm, double etaisyysKm, double aurinko, double kompensaatio = 0)
        {
            double ev = Ev100(aurinko) - kompensaatio;
            double omega = 7.2 / Math.Max(1, etaisyysKm);                 // rad/s
            double raja = (0.006 / mm) / omega;                            // s: liike ≤ 1 pikseli
            double aukko = mm >= 200 ? 8 : mm >= 70 ? 5.6 : 4;
            double aika = Ajat[0];
            foreach (var t in Ajat) if (t <= raja) aika = t;               // pisin sallittu
            // Päivällä ei pidempää kuin tarvitaan ISO 100:aan (kirkas maa → nopea aika).
            double tarve = aukko * aukko / Math.Pow(2, ev);                // ISO 100 -aika
            if (tarve < aika) { aika = Ajat[0]; foreach (var t in Ajat) if (t <= tarve * 1.12) aika = t; }
            int Iso(double n, double t) => Pyoreista(100 * Math.Pow(2, Math.Log(n * n / t, 2) - ev));
            int iso = Iso(aukko, aika);
            for (int i = Array.IndexOf(Aukot, aukko) - 1; iso > 6400 && i >= 0; i--) { aukko = Aukot[i]; iso = Iso(aukko, aika); }
            return (aukko, aika, iso);
        }

        static int Pyoreista(double iso)
        {
            int paras = Isot[0];
            foreach (var i in Isot) if (Math.Abs(Math.Log(i / iso)) < Math.Abs(Math.Log(paras / iso))) paras = i;
            return paras;
        }

        /// <summary>Julisteen muoto: "1/1000 s" tai "1/8 s".</summary>
        public static string AikaTeksti(double s) => s >= 1 ? $"{s:0} s" : $"1/{Math.Round(1 / s):0} s";

        /// <summary>Aukko "f/8" tai "f/5.6".</summary>
        public static string AukkoTeksti(double n) => "f/" + (n == Math.Floor(n) ? n.ToString("0") : n.ToString("0.0", System.Globalization.CultureInfo.InvariantCulture));
    }
}
