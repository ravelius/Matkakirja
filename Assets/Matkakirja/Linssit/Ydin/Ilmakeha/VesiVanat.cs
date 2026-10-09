// LAIVOJEN VANAT OMALLA VESIPINNALLA (Linssiseppä 2, 9.10.2026; omistaja TF 168: "pitäisi tulla jokin vana vedessä niiden perässä",
// PT: junaan 170). LS1:n ElavaKaupunki ilmoittaa joka kehys jokaisen näkyvän veneen (KaupunkiVesi.Vana); tämä valitsee kameraa
// lähimmät VanojaMax (vanhentuneet pois) varjostimelle, ja Vaahto on VesiPinta-varjostimen CPU-vertailu (sama kaava testeille):
//  - keskivana: turbulentti vaahtojuova perässä, levenee ja häipyy pituuden mukana (pituus = PituusKerroin × veneen pituus);
//  - Kelvinin kiila: kaksi aaltoharjaa 19,47° (tan 0,354) perän kulmista, vaimeampi vaahto;
//  - keula-aalto: pieni vaahtokaari keulan edessä.
// Voimakkuus kasvaa nopeuden mukaan (täysi NopeusTaysiMs:ssä); paikallaan oleva vene ei jätä vanaa.
// OMISTAJA TF 169 (PT 9.10. 10.0x): "pieni vana perässä, joka näkyy koko ajan" → lyhyempi (3,5 × pituus), kapeampi ja himmeämpi; ElavaKaupunki
// häivyttää vanan tauolla 4 s:ssa ja käynnistyksessä 2 s:ssa (ei ajoittaisia suihkuja).
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Ilmakeha
{
    public sealed class VesiVanat
    {
        public const int VanojaMax = 16;
        public const double VanhentuuS = 0.5, PituusKerroin = 3.5, NopeusTaysiMs = 6, KiilaTan = 0.354, LeveysOsuus = 0.14;

        public struct Vana { public double X, Z, Dx, Dz, Nopeus, Pituus, Aika; }
        readonly Dictionary<int, Vana> vanat = new Dictionary<int, Vana>();

        /// <summary>Veneen i tila (maailman x, z; suunta yksikkövektorina; nopeus m/s; veneen pituus m; aika s).</summary>
        public void Aseta(int i, double x, double z, double dx, double dz, double nopeus, double pituus, double aika)
        {
            double l = Math.Sqrt(dx * dx + dz * dz);
            if (l < 1e-6) { dx = 0; dz = 1; l = 1; }
            vanat[i] = new Vana { X = x, Z = z, Dx = dx / l, Dz = dz / l, Nopeus = Math.Max(0, nopeus), Pituus = Math.Max(1, pituus), Aika = aika };
        }

        /// <summary>Kameraa lähimmät tuoreet vanat (vanhentuneet poistetaan).</summary>
        public List<Vana> Valitse(double kx, double kz, double aika, int max = VanojaMax)
        {
            foreach (var k in new List<int>(vanat.Keys)) if (aika - vanat[k].Aika > VanhentuuS) vanat.Remove(k);
            var l = new List<Vana>(vanat.Values);
            l.Sort((a, b) => ((a.X - kx) * (a.X - kx) + (a.Z - kz) * (a.Z - kz)).CompareTo((b.X - kx) * (b.X - kx) + (b.Z - kz) * (b.Z - kz)));
            if (l.Count > max) l.RemoveRange(max, l.Count - max);
            return l;
        }

        public int Maara => vanat.Count;

        /// <summary>Vaahdon määrä 0–1+ pisteessä (taakse = matka perän suuntaan veneen keskeltä m, sivu = etäisyys kulkulinjasta m).</summary>
        public static double Vaahto(double taakse, double sivu, double pituus, double nopeus)
        {
            sivu = Math.Abs(sivu);
            double L = pituus * PituusKerroin, n = Math.Min(1, nopeus / NopeusTaysiMs), leveys = Math.Max(2, pituus * LeveysOsuus);
            if (taakse < -pituus * 0.6 || taakse > L || n <= 0) return 0;
            double t = Math.Max(0, taakse) / L, haivy = (1 - t) * (1 - t) * n;
            double keski = taakse > 0 ? Math.Exp(-sivu * sivu / (leveys * leveys * (1 + taakse * 0.02))) : 0;
            double varsi = KiilaTan * Math.Max(0, taakse) + leveys * 0.5, kaari = Math.Exp(-Math.Pow((sivu - varsi) / (2.5 + taakse * 0.05), 2));
            double keula = Math.Exp(-Math.Pow((taakse + pituus * 0.5) / (pituus * 0.15), 2)) * Math.Exp(-sivu * sivu / (leveys * leveys));
            return (keski * 0.45 + kaari * 0.12) * haivy + keula * 0.25 * n;
        }
    }
}
