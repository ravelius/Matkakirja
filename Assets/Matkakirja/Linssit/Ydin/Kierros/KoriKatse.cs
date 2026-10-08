// KATSE YLÖS KORISTA (omistaja 8.10. 21.1x "Miten pelaaja voi katsoa pallossa ylöspäin?", PT 22.0x hyväksyi): korinäkymässä
// (kaupunkitila, PalloKori näkyvissä) yhden sormen pystyveto nostaa katsetta oppaan kehyksen päälle enintään YlinAst
// horisontin yläpuolelle, jolloin kupu näkyy. Kun ote irtoaa, katse palaa pehmeästi kehykseen (kriittisesti vaimennettu jousi,
// ei ylitystä). Veto liikkuu sormen mukana (astetta / pikseli = kenttäkulma / ruudun korkeus). Puhdas C#: KoriKatseTestit.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class KoriKatse
    {
        public const double YlinAst = 45, Omega = 6.0;   // jousi: lähes perillä ~0,8 s:ssa, nollassa ~1,5 s:ssa
        /// <summary>Lisäkallistus ylöspäin oppaan kehyksen päälle (°, ≥ 0).</summary>
        public double Ylos { get; private set; }
        public bool Vetaa { get; private set; }
        double nopeus;

        static double Raja(double korkeuskulmaAst) => Math.Max(0, YlinAst - korkeuskulmaAst);

        public void Paina() { Vetaa = true; nopeus = 0; }
        public void Nosta() { Vetaa = false; nopeus = 0; }

        /// <summary>Sormen pystysiirto (px, ylös +) kehyksen katseen korkeuskulmalla (°, alas negatiivinen).</summary>
        public void Liiku(double dyPx, double asteitaPikselille, double korkeuskulmaAst)
        {
            if (!Vetaa) return;
            Ylos = Math.Max(0, Math.Min(Raja(korkeuskulmaAst), Ylos + dyPx * asteitaPikselille));
        }

        public void Paivita(double dt, double korkeuskulmaAst)
        {
            dt = Math.Max(0, Math.Min(0.1, dt));
            if (!Vetaa && Ylos > 0)
            {
                // Kriittisesti vaimennettu: x'' = −2ωx' − ω²x (puoliksi implisiittinen Euler, vakaa pienillä askelilla).
                nopeus += (-2 * Omega * nopeus - Omega * Omega * Ylos) * dt;
                Ylos = Math.Max(0, Ylos + nopeus * dt);
                if (Ylos < 0.2) { Ylos = 0; nopeus = 0; }
            }
            Ylos = Math.Min(Ylos, Raja(korkeuskulmaAst));
        }
    }
}
