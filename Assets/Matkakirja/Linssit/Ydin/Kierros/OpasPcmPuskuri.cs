// PCM-VIRRAN ALKUPUSKURI (Päätoimittaja 6.10. 20.4x, juna 154; TF 151: "kertoja ei katkea"). Simussa 6.10. 20.38 Sydneyn Kysy-vastaus
// (15,0 s ääntä) latautui 18,5 s:ssa ja kierroksen pysähdys (10,6 s) 14,1 s:ssa: virta tuli reaaliaikaa hitaammin (0,75–0,81 ×),
// joten 1 s:n alkupuskuri alivuoti väistämättä 2–3 kertaa. Tavallisesti virta tulee 1,5–3,5 × reaaliaikaa, jolloin 1 s riittää.
// Nyt alkupuskuri mitoitetaan mitatusta latausnopeudesta: kun loppu tulee nopeudella r (ääni-s / s) ja koko kesto on T, soitto
// ei katkea, jos alussa puskurissa on B ≥ T · (1 − r / varmuus). Nopealla virralla B = PohjaS (ennallaan, nopea alku).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class OpasPcmPuskuri
    {
        /// <summary>Alkupuskuri nopealla virralla (s; Päätoimittaja 16.5x) ja yläraja hitaalla (s), sekä nopeuden mittauksen vähimmäisaika.</summary>
        public const double PohjaS = 1.0, MaxS = 10.0, MittausMinS = 0.5;
        /// <summary>Nopeusarvion varmuuskerroin (virran nopeus vaihtelee).</summary>
        public const double Varmuus = 1.15;

        /// <summary>Latausnopeus ääni-sekunteina sekunnissa ensimmäisestä tavusta (kulunut aika vähintään MittausMinS, joten lyhyellä
        /// mittauksella arvio on alaraja: 1 s ääntä alle 0,5 s:ssa = vähintään 2 × eli nopea virta).</summary>
        public static double Nopeus(double kirjoitettuS, double kulunutS) => kirjoitettuS / Math.Max(kulunutS, MittausMinS);

        /// <summary>Tarvittava alkupuskuri (s): kestoS = koko äänen arvioitu kesto (0 = tuntematon), nopeus = Nopeus(...).</summary>
        public static double Tarvitaan(double kestoS, double nopeus)
        {
            if (kestoS <= 0 || double.IsNaN(nopeus)) return PohjaS;
            double b = kestoS * (1 - nopeus / Varmuus);
            return Math.Max(PohjaS, Math.Min(MaxS, Math.Min(kestoS, b)));
        }
    }
}
