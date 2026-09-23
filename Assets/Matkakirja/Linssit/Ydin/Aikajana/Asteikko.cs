// AIKAJANAN ASTEIKKO (web js/aikajana.js luoAsteikko, vuosiaSittenLukema,
// vuosiaSittenPaikka, kellonAskel, kellonVuositeksti, kellonNaytto).
//
// Kello kulkee PAIKKANA, ja näytetty lukema lasketaan paikasta:
//   'vuosi'        paikka = vuosiluku (keksinnöt 1765–1928)
//   'vuosiaSitten' pysäkit tasavälein (ASTEIKON_VALI = 10), lukema
//                  interpoloidaan geometrisesti pysäkkien välillä, joten
//                  300 000 → 3 000 v. sitten etenee tasaisen tuntuisesti
//                  (ihmisen matka). 300 000 vuotta keksintöjen tahdilla
//                  olisi 22 tuntia.
using System;
using System.Collections.Generic;
using System.Linq;

namespace Matkakirja.Linssit.Aikajana
{
    public enum AsteikonLaji { Vuosi, VuosiaSitten }

    public sealed class Asteikko
    {
        public const double Vali = 10;               // ASTEIKON_VALI
        public const int KellonNumerot = 4;          // KELLON_NUMEROT
        public static readonly int[] KellonAskeleet = { 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000 };
        public const int MuutoksiaValilla = 6;       // KELLON_MUUTOKSIA_VALILLA
        public const double JaaRaja = 1900;          // KELLON_JAA_RAJA
        public const double Nykyhetki = 2000;        // KELLON_NYKYHETKI

        public AsteikonLaji Laji { get; private set; }
        public int Numerot { get; private set; }
        /// <summary>1 = kasvava (vuosi), −1 = laskeva (vuosia sitten).</summary>
        public int Suunta { get; private set; }
        public string Yksikko { get; private set; }
        public bool Ryhmitys { get; private set; }
        public double Alku { get; private set; }
        public double Loppu { get; private set; }

        /// <summary>vuosiaSitten-arvot suurimmasta pienimpään (tyhjä vuosi-asteikolla).</summary>
        public IReadOnlyList<double> Arvot => arvot;
        double[] arvot = Array.Empty<double>();

        /// <summary>Vuosi-asteikko (web luoAsteikko ilman asteikko-kenttää).</summary>
        public static Asteikko Vuosi(double alku, double loppu) => new Asteikko
        {
            Laji = AsteikonLaji.Vuosi, Numerot = KellonNumerot, Suunta = 1, Yksikko = "",
            Alku = alku, Loppu = loppu,
        };

        /// <summary>Vuosia sitten -asteikko pysäkkien vuosiaSitten-arvoista.</summary>
        public static Asteikko VuosiaSitten(IEnumerable<double> vuosiaSitten, string yksikko = "v. sitten")
        {
            var a = vuosiaSitten.Where(v => !double.IsNaN(v) && !double.IsInfinity(v))
                .OrderByDescending(v => v).ToArray();
            double suurin = a.Length > 0 ? a[0] : 0;
            return new Asteikko
            {
                Laji = AsteikonLaji.VuosiaSitten,
                Numerot = Math.Max(KellonNumerot, Math.Round(suurin, MidpointRounding.AwayFromZero).ToString("0").Length),
                Suunta = -1,
                Yksikko = yksikko ?? "v. sitten",
                Ryhmitys = true,
                Alku = -Vali / 2,
                Loppu = Math.Max(0, a.Length - 1) * Vali,
                arvot = a,
            };
        }

        public double Lukema(double paikka) => Laji == AsteikonLaji.Vuosi ? paikka : VuosiaSittenLukema(paikka, arvot);
        public double Paikka(double lukema) => Laji == AsteikonLaji.Vuosi ? lukema : VuosiaSittenPaikka(lukema, arvot);
        public double Askel(double lukema) => Laji == AsteikonLaji.Vuosi ? 1 : KellonAskel(lukema, arvot);
        public string Teksti(double lukema) => Laji == AsteikonLaji.Vuosi ? null : KellonVuositeksti(lukema);

        public static double VuosiaSittenLukema(double paikka, IReadOnlyList<double> arvot, double vali = Vali)
        {
            if (arvot == null || arvot.Count == 0) return 0;
            if (arvot.Count == 1) return arvot[0];
            double p = Math.Max(0, Math.Min(paikka, (arvot.Count - 1) * vali));
            int i = Math.Min(arvot.Count - 2, (int)Math.Floor(p / vali));
            if (i < 0) return arvot[0];
            double f = Math.Max(0, Math.Min(1, p / vali - i));
            double a = arvot[i], b = arvot[i + 1];
            if (!(a > 0) || !(b > 0)) return a + (b - a) * f;
            return a * Math.Pow(b / a, f);
        }

        public static double VuosiaSittenPaikka(double vuosia, IReadOnlyList<double> arvot, double vali = Vali)
        {
            if (arvot == null || arvot.Count == 0) return 0;
            double loppu = (arvot.Count - 1) * vali;
            if (double.IsNaN(vuosia) || double.IsInfinity(vuosia)) return 0;
            if (vuosia >= arvot[0]) return 0;
            if (vuosia <= arvot[arvot.Count - 1]) return loppu;
            for (int i = 0; i < arvot.Count - 1; i++)
            {
                double a = arvot[i], b = arvot[i + 1];
                if (!(vuosia <= a && vuosia >= b)) continue;
                if (a == b) return i * vali;
                double f = (a > 0 && b > 0) ? Math.Log(vuosia / a) / Math.Log(b / a) : (vuosia - a) / (b - a);
                return (i + Math.Max(0, Math.Min(1, f))) * vali;
            }
            return loppu;
        }

        public static int ValinAskel(double alku, double loppu, int muutoksia = MuutoksiaValilla)
        {
            double tavoite = Math.Abs(alku - loppu) / Math.Max(1, muutoksia);
            int askel = KellonAskeleet[0];
            foreach (var tikas in KellonAskeleet) if (tikas <= tavoite) askel = tikas;
            return askel;
        }

        public static int KellonAskel(double lukema, IReadOnlyList<double> arvot)
        {
            if (arvot == null || arvot.Count < 2) return KellonAskeleet[0];
            double a = Math.Abs(lukema);
            for (int i = 0; i < arvot.Count - 1; i++)
                if (a <= arvot[i] && a >= arvot[i + 1]) return ValinAskel(arvot[i], arvot[i + 1]);
            return a > arvot[0]
                ? ValinAskel(arvot[0], arvot[1])
                : ValinAskel(arvot[arvot.Count - 2], arvot[arvot.Count - 1]);
        }

        /// <summary>Alle 1900 v. sitten: "n. 1300 jaa." tai "n. 500 eKr."; muuten null.</summary>
        public static string KellonVuositeksti(double lukema, double raja = JaaRaja)
        {
            if (!(double.IsFinite(lukema) && lukema < raja)) return null;
            // Math.round pyöristää puolikkaat ylöspäin (myös negatiiviset).
            double vuosi = Math.Floor(Nykyhetki - lukema + 0.5);
            return vuosi > 0 ? $"n. {vuosi:0} jaa." : $"n. {Math.Abs(vuosi):0} eKr.";
        }

        /// <summary>Kellon näyttämä luku askeleen tarkkuudella; laskeva pyöristää ylös.</summary>
        public static double KellonNaytto(double lukema, double askel = 1, int suunta = 1)
        {
            double yksikot = Math.Max(0, lukema) / askel;
            return (suunta < 0 ? Math.Ceiling(yksikot) : Math.Floor(yksikot)) * askel;
        }
    }
}
