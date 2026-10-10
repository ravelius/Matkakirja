// REITTIHAHMON KULKU (Siirtoseppä 10.10.2026, PT erä 3): edestakainen kulku reitin pisteiden välillä vakionopeudella, tauko
// kummassakin päässä, deterministisesti ajasta t. Yksi kaava DioraamaHahmot- (2D-billboard) ja DioraamaHahmot3D-figuureille
// (ennen kaksi kopiota Unity-puolella, DioraamaHahmot.cs:n "tilapäinen poikkeama"); puhdas, joten Linssit-testit kattavat sen.
using System;

namespace Matkakirja.Linssit.Dioraama
{
    public sealed class ReittiKulku
    {
        public readonly Reitti Reitti;
        /// <summary>Kumulatiivinen matka pisteeseen i (0 ensimmäisessä).</summary>
        public readonly double[] Kumulatiivinen;
        public readonly double Matka, KulkuS, Nopeus, Tauko;

        public ReittiKulku(Reitti reitti)
        {
            Reitti = reitti;
            int n = reitti.Pisteet?.Count ?? 0;
            Kumulatiivinen = new double[Math.Max(1, n)];
            double summa = 0;
            for (int i = 1; i < n; i++) { summa += (reitti.Pisteet[i] - reitti.Pisteet[i - 1]).Pituus; Kumulatiivinen[i] = summa; }
            Matka = summa;
            Nopeus = reitti.Nopeus > 0 ? reitti.Nopeus : 1.0;
            KulkuS = summa / Nopeus;
            Tauko = Math.Max(0, reitti.Tauko);
        }

        /// <summary>Kierroksen kesto: meno, tauko, paluu, tauko.</summary>
        public double Kierto => 2 * KulkuS + 2 * Tauko;

        /// <summary>Paikka hetkellä t (vaihe 0..1 siirtää kierroksen alkua, jotta hahmot eivät kulje tahdissa). Suunta = segmentin
        /// suunta kulkusuuntaan (normalisoimaton; +1 menomatkalla ja sen päätepysähdyksellä, −1 paluumatkalla ja lähtöpisteen
        /// pysähdyksellä: pysähdyksissä matka on vakio, joten segmentti on sama kuin suunnan viimeinen askel). Taukoaika = aika tauon
        /// alusta, −1 liikkeellä. Ei pisteitä: (default, default, −1); yksi piste tai nollamatka: piste 0 paikallaan.</summary>
        public (V3 Paikka, V3 Suunta, double Taukoaika) Paikka(double t, double vaihe)
        {
            var pisteet = Reitti.Pisteet;
            if (pisteet == null || pisteet.Count == 0) return (default, default, -1);
            if (pisteet.Count == 1 || Matka <= 0 || Kierto <= 0) return (pisteet[0], default, -1);
            double v = Mod(t + vaihe * Kierto, Kierto);
            double matka; int merkki;
            if (v < KulkuS) { matka = v * Nopeus; merkki = 1; }
            else if (v < KulkuS + Tauko) { matka = Matka; merkki = 1; }
            else if (v < 2 * KulkuS + Tauko) { matka = Matka - (v - KulkuS - Tauko) * Nopeus; merkki = -1; }
            else { matka = 0; merkki = -1; }
            double taukoaika = v >= KulkuS && v < KulkuS + Tauko ? v - KulkuS : v >= 2 * KulkuS + Tauko ? v - 2 * KulkuS - Tauko : -1;

            int seg = 0;
            while (seg < Kumulatiivinen.Length - 2 && Kumulatiivinen[seg + 1] < matka) seg++;
            int segSeur = Math.Min(seg + 1, pisteet.Count - 1);
            double segAlku = Kumulatiivinen[seg], segLoppu = Kumulatiivinen[Math.Min(seg + 1, Kumulatiivinen.Length - 1)];
            double osuus = segLoppu > segAlku ? Math.Clamp((matka - segAlku) / (segLoppu - segAlku), 0.0, 1.0) : 0;
            return (V3.Lerp(pisteet[seg], pisteet[segSeur], osuus), (pisteet[segSeur] - pisteet[seg]) * merkki, taukoaika);
        }

        /// <summary>Deterministinen 0..1-vaihe merkkijonosta (FNV-1a).</summary>
        public static double VaiheYksikko(string id)
        {
            if (string.IsNullOrEmpty(id)) return 0;
            uint h = 2166136261;
            foreach (char c in id) { h ^= c; h *= 16777619; }
            return (h % 1000) / 1000.0;
        }

        static double Mod(double a, double m) => a - m * Math.Floor(a / m);
    }
}
