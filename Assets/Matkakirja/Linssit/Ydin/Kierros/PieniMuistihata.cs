// PIENEN MUISTIN MUISTIHÄTÄ KAHDESSA PORTAASSA (juna 173, Päätoimittajan päätös f 10.10. 02.2x; Natiiviseppä, iPad Pro 13 8 Gt
// mittaukset R5–R15, raportti muistimittaus-juna173-20261010.md). Yksiportainen hätä (lataus seis alle 0,6 Gt) pysäytti päivityksen,
// jolloin Cesiumin välimuisti ei vapautunut: intron (A-polku) vapaa jäi 0,35–0,43 Gt:iin. Nyt:
//   taso 1 (vapaa < Taso1Gt) = esilatauskamerat (esikamera, reittikamerat, lähikamera) pois laattavalinnasta, päivitys jatkuu, jolloin
//   välimuisti (64 Mt) vapauttaa niiden laatat; kierroksen alussa reittikamerat olivat työjoukon suurin yksittäinen erä (99 → 55 %),
//   taso 2 (vapaa < Taso2Gt) = laattojen lataus seis (suspendUpdate), kuten ennen.
// Palautus porras kerrallaan, kun vapaata on taas raja + PalautusGt. Taso 1 pysyy vähintään PitoS viimeisestä alituksesta (PT 10.10.
// 02.5x, R16: ilman pitoa esilataus heilui intron aikana 15 kertaa päälle ja pois, ~250 laattaa ladattiin ja vapautettiin 2–3 s:n välein).
// Moottoriton: CesiumKaupunki kutsuu Muistivahdissa 0,5 s välein.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class PieniMuistihata
    {
        public const double Taso1Oletus = 0.8, Taso2Oletus = 0.5, PalautusOletus = 0.2, PitoS = 10;
        double viimeAlle = double.NegativeInfinity;

        /// <summary>0 = ei hätää, 1 = esilataus pois (päivitys jatkuu), 2 = lisäksi lataus seis.</summary>
        public int Taso { get; private set; }

        public void Nollaa() { Taso = 0; viimeAlle = double.NegativeInfinity; }

        /// <summary>Uusi mittaus (Gt; ≤ 0 = ei tiedossa, ei muutosta) hetkellä nytS (s; NaN = ei pitoa). taso1Gt ≤ taso2Gt poistaa tason 1
        /// (vertailuajo). true = taso muuttui.</summary>
        public bool Paivita(double vapaaGt, double nytS = double.NaN, double taso1Gt = Taso1Oletus, double taso2Gt = Taso2Oletus, double palautusGt = PalautusOletus)
        {
            if (vapaaGt <= 0) return false;
            if (vapaaGt < Math.Max(taso1Gt, taso2Gt) && !double.IsNaN(nytS)) viimeAlle = nytS;
            int ennen = Taso, uusi = Taso;
            if (vapaaGt < taso2Gt) uusi = 2;
            else if (uusi == 2 && vapaaGt > taso2Gt + palautusGt) uusi = 1;
            if (uusi < 2 && vapaaGt < taso1Gt) uusi = Math.Max(uusi, 1);
            if (uusi >= 1 && vapaaGt > Math.Max(taso1Gt, taso2Gt) + palautusGt && (double.IsNaN(nytS) || nytS - viimeAlle >= PitoS)) uusi = 0;
            Taso = uusi;
            return uusi != ennen;
        }
    }
}
