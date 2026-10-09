// TAUSTAÄÄNTEN VAIMENNUS (omistaja TF 168, 9.10.2026: "saisiko äänet pois taustalta kun kip latautuu?"): pehmeä häivytys kuuntelijan
// tasosta nollaan ja takaisin. Puhdas ydin: käyrä (smoothstep) ja perustason säilytys, ettei kesken häivytyksen alkanut uusi
// vaimennus tallenna välitasoa perustasoksi. UI:n AaniVaimennus ajaa tätä AudioListener.volume-tasolla (natiivissa ei ole
// AudioMixeriä; kaikki Unityn äänilähteet kulkevat kuuntelijan kautta).
using System;

namespace Matkakirja.Linssit
{
    public sealed class AaniHaivytys
    {
        public const double PoisS = 0.6, TakaisinS = 0.8;

        double alku, kohde, kesto, aika;
        bool kaynnissa;

        /// <summary>Kuuntelijan perustaso (taso ennen vaimennusta), johon palataan.</summary>
        public double Perus { get; private set; } = 1.0;
        public bool Vaimennettu { get; private set; }
        public bool Kaynnissa => kaynnissa;

        /// <summary>Aloittaa häivytyksen nykyisestä tasosta; vaimennettaessa perustaso tallennetaan vain levosta (ei kesken).</summary>
        public void Aseta(bool vaimenna, double nykyinen)
        {
            if (vaimenna == Vaimennettu) return;
            if (vaimenna && !kaynnissa) Perus = nykyinen;
            Vaimennettu = vaimenna;
            alku = nykyinen; kohde = vaimenna ? 0.0 : Perus; kesto = vaimenna ? PoisS : TakaisinS; aika = 0; kaynnissa = true;
        }

        /// <summary>Etenee dt sekuntia ja palauttaa uuden tason.</summary>
        public double Askel(double dt)
        {
            if (!kaynnissa) return Vaimennettu ? 0.0 : Perus;
            aika += Math.Max(0, dt);
            double u = kesto <= 0 ? 1 : Math.Min(1, aika / kesto);
            if (u >= 1) kaynnissa = false;
            double s = u * u * (3 - 2 * u);
            return alku + (kohde - alku) * s;
        }
    }
}
