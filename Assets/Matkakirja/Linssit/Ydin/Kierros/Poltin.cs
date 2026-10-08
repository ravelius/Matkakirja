// PALLON POLTIN (Linssiseppä 8.10.2026; Päätoimittaja: pallo Unreal-tasolle kohta 2, fysiikkasääntö: poltin vain kun pallo nousee):
// liekin voimakkuus 0–1 silmän pystynopeudesta. Syttyy, kun nousu ylittää NousuRaja (sama kuin korin liekin humahdus,
// PalloKori.PystyRaja), nousee SyttyS:ssa, palaa nousun ajan vähintään PurskeS ja hiipuu SammuS:ssa. Lepatus deterministisestä
// kohinasta (kaksi siniä + hidas vaihtelu), ei satunnaislukuja (testattava). Valo korille ja liekkikuva sovittimessa (PalloKori).
// Puhdas C#: Linssit-testit (PoltinTestit).
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class Poltin
    {
        public const double NousuRaja = 1.8, SyttyS = 0.15, SammuS = 0.45, PurskeS = 1.2;
        double aika, palanut = double.MaxValue, taso;
        /// <summary>Liekin voimakkuus 0–1 (ilman lepatusta).</summary>
        public double Taso => taso;
        /// <summary>Liekki palaa (nousu tai purske kesken).</summary>
        public bool Palaa { get; private set; }
        /// <summary>Syttyi tässä päivityksessä (äänen tahdistus).</summary>
        public bool Syttyi { get; private set; }

        public void Paivita(double dt, double pystyNopeusMs)
        {
            dt = Math.Max(0, Math.Min(0.25, dt)); aika += dt;
            bool nousee = pystyNopeusMs > NousuRaja;
            Syttyi = nousee && !Palaa;
            if (Syttyi) palanut = 0;
            if (Palaa || nousee) palanut += dt;
            Palaa = nousee || palanut < PurskeS;
            double tavoite = Palaa ? 1 : 0;
            taso = tavoite > taso ? Math.Min(1, taso + dt / SyttyS) : Math.Max(0, taso - dt / SammuS);
        }

        /// <summary>Lepatus 0,75–1,05 × Taso (deterministinen aikafunktio).</summary>
        public double Liekki => taso * (0.9 + 0.08 * Math.Sin(aika * 23.0) + 0.05 * Math.Sin(aika * 37.0 + 1.3) + 0.02 * Math.Sin(aika * 4.1));
    }
}
