using System;

namespace Matkakirja
{
    /// <summary>
    /// VEKTORIVIIVOJEN LEVEYS (löydös 46 jatko: "paksu tumma kehä rantojen ympärillä" = Maaraja). Puhdas, testit
    /// Kartta-testit/Testit/ViivaleveysTestit.cs. Webin laki js/pallovektorit.js viivanLeveysCss: leveys css-pikseleinä
    /// liukuu lineaarisesti päätteiden [kaukana, lähellä] välillä ruudun tiheyden (laitepikseliä leveysastetta kohti
    /// ruudun keskellä) mukaan välillä VEKTORIT_LEVEYS_TIHEYS [25, 250]. Webin arvot (origin/main 24.9.2026):
    ///   korostus (pelaajan maan kehä)  [1,6; 3] css-px, peitto 1, RAJA_MUSTE #6b5539, piirtyy rannikkoviivan ALLE
    ///   rannikko                       [0,8; 1,2] css-px, peitto 0,58, RANTA_MUSTE #5a4330
    ///   rajat                          [0,65; 0,95] css-px, peitto 0,34, RAJA_MUSTE, katkoviiva RAJA_KATKO_YKS
    /// Natiivissa css-px = iOS-piste; laitepikselit = pisteet × PalloKierto.Pistekerroin (iPad 2, iPhone 3), sama kuin
    /// webin css × devicePixelRatio (LineMaterialin resoluutio on css-pikseleinä). Rajaviiva-varjostin piirtää täyden
    /// peiton leveydellä pt·k − 0,5 ja häivyttää reunan 1 laitepikselissä, joten puolen peiton leveys on pt·k + 0,5
    /// (webin pehmennys 0,65 laitepx kummallakin reunalla ytimen ulkopuolella).
    /// </summary>
    public static class Viivaleveys
    {
        public const double TiheysKaukana = 25.0, TiheysLahella = 250.0;
        public const double KorostusKaukana = 1.6, KorostusLahella = 3.0;
        public const double RannikkoKaukana = 0.8, RannikkoLahella = 1.2;
        /// <summary>Valtioiden rajat (web VEKTORIT_RAJA_LEVEYS_CSS [0,65; 0,95], katkoviiva, peitto 0,34).</summary>
        public const double RajaKaukana = 0.65, RajaLahella = 0.95;

        /// <summary>Webin viivanLeveysCss: leveys (css-px = pt) tiheyden mukaan.</summary>
        public static double Pt(double tiheys, double kaukana, double lahella)
        {
            double t = Math.Max(0.0, Math.Min(1.0, ((double.IsNaN(tiheys) ? 0.0 : tiheys) - TiheysKaukana) / (TiheysLahella - TiheysKaukana)));
            return kaukana + (lahella - kaukana) * t;
        }

        /// <summary>Pelaajan maan kehä (webin korostus) pisteinä; ohitus &gt; 0 = kiinteä leveys (komento "maaraja paksuus").</summary>
        public static double KehaPt(double tiheys, double ohitusPt = double.NaN) =>
            ohitusPt > 0 ? ohitusPt : Pt(tiheys, KorostusKaukana, KorostusLahella);

        /// <summary>Rajaviivan puolen peiton leveys laitepikseleinä: pt · kerroin + 0,5.</summary>
        public static double NakyvaLaitePx(double pt, double kerroin) => pt * kerroin + 0.5;
    }
}
