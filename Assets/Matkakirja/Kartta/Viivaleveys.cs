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

        /// <summary>Aluerajojen (maakunnat) häive sisään ja ulos, s (web VEKTORIT_HAIVE_MS 260, js/pallovektorit.js).</summary>
        public const float AluerajaHaiveS = 0.26f;

        /// <summary>
        /// ALUERAJOJEN NÄKYVYYS (omistajan löydös 74 d, build 12: ihmisen matkan avaruuspallossa maakuntien rajat
        /// piirtyivät mustana läiskänä Euroopan päälle, koska vakioleveä viiva ei ohene kaukana). Webin sääntö
        /// vektoriviivoille: rajat vasta tiheydestä VEKTORIT_RAJAT_PX_ASTE 30 laitepikseliä/aste (js/pallovektorit.js:171
        /// ja :1691 "tarve >= VEKTORIT_RAJAT_PX_ASTE"; natiivissa Vektorisolut.RajatTiheys), ja webin maakuntakerros on
        /// pois linssin ajan (js/pallolauta/lauta.js:5098 maakunnat?.asetaMaa(linssiPaalla() ? null : …)).
        /// Palauttaa uuden peiton kertoimen 0–1: liukuu kohti tavoitetta (1 = sallittu ja tiheys ≥ min) nopeudella
        /// 1 / <paramref name="kestoS"/> sekunnissa. NaN-tiheys = kaukana.
        /// </summary>
        public static float AluerajaHaive(float nyt, bool sallittu, double tiheys, double minTiheys, float dt,
            float kestoS = AluerajaHaiveS)
        {
            bool nakyy = sallittu && !double.IsNaN(tiheys) && tiheys >= minTiheys;
            float tavoite = nakyy ? 1f : 0f;
            float nykyinen = float.IsNaN(nyt) ? 0f : Math.Max(0f, Math.Min(1f, nyt));
            if (!(kestoS > 0f)) return tavoite;
            float askel = Math.Max(0f, dt) / kestoS;
            return nykyinen < tavoite ? Math.Min(tavoite, nykyinen + askel) : Math.Max(tavoite, nykyinen - askel);
        }
    }
}
