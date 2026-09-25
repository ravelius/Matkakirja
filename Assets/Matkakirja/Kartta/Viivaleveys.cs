using System;

namespace Matkakirja
{
    /// <summary>
    /// VEKTORIVIIVOJEN LEVEYS (löydös 46 jatko: "paksu tumma kehä rantojen ympärillä" = Maaraja). Puhdas, testit
    /// Kartta-testit/Testit/ViivaleveysTestit.cs. Webin laki js/pallovektorit.js viivanLeveysCss: leveys css-pikseleinä
    /// liukuu lineaarisesti päätteiden [kaukana, lähellä] välillä ruudun tiheyden (laitepikseliä leveysastetta kohti
    /// ruudun keskellä) mukaan välillä VEKTORIT_LEVEYS_TIHEYS [25, 250]. Webin arvot (origin/main 24.9.2026):
    ///   korostus (pelaajan maan kehä)  [1,6; 3] css-px, peitto 1, RAJA_MUSTE #6b5539, piirtyy rannikkoviivan ALLE
    ///                                  (natiivissa löydös 127:n jälkeen kevyempi ja vain maiden välillä, ks. KEHÄN PAINO)
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

        // ---- KEHÄN PAINO (omistajan löydös 127, build 16 → 17: "raja joka tapauksessa kevyempi") ----
        //
        // WEBISSÄ EI OLE KEVYEMPÄÄ VASTINETTA: webin korostus on yhä [1,6; 3] css-px täydellä RAJA_MUSTEella (KOROSTUS_PEITTO 1,
        // js/pallovektorit.js origin/main 25.9.), ja muiden maiden raja on [0,65; 0,95] katkoviivana peitolla 0,34. Kevyempi
        // paino on näiden väliltä: yhtenäinen ja yhä selvästi naapurien rajaa leveämpi, jotta oma maa erottuu, mutta mustetta
        // (leveys × peitto) Kevyt noin puolet (lähellä 1,8 × 0,8 = 1,44 vs. 3) ja Kevein noin neljännes (1,2 × 0,6 = 0,72)
        // webin korostuksesta; Kevein on webin rantaviivan leveys [0,8; 1,2]. Leveys liukuu tiheyden mukaan samalla lailla
        // (Pt). Peitto on webin sRGB-sekoituksena; natiivi muuntaa sen lineaariseksi maan pohjalla (KehaPeittoNatiivi),
        // kuten aluerajoilla, koska kehä kulkee nyt vain maalla maiden välissä.

        /// <summary>Pelaajan maan kehän paino: Web = webin korostus (build 16 asti), Kevyt ja Kevein = löydös 127.</summary>
        public enum KehanPaino { Web, Kevyt, Kevein }
        public const double KevytKaukana = 1.0, KevytLahella = 1.8, KevytPeitto = 0.8;
        public const double KeveinKaukana = 0.8, KeveinLahella = 1.2, KeveinPeitto = 0.6;

        /// <summary>
        /// Pelaajan maan kehä pisteinä painolla (oletus Web = webin korostus); ohitus &gt; 0 = kiinteä leveys (komento
        /// "maaraja paksuus").
        /// </summary>
        public static double KehaPt(double tiheys, double ohitusPt = double.NaN, KehanPaino paino = KehanPaino.Web) =>
            ohitusPt > 0 ? ohitusPt
            : paino == KehanPaino.Kevyt ? Pt(tiheys, KevytKaukana, KevytLahella)
            : paino == KehanPaino.Kevein ? Pt(tiheys, KeveinKaukana, KeveinLahella)
            : Pt(tiheys, KorostusKaukana, KorostusLahella);

        /// <summary>Kehän peitto webin sRGB-sekoituksena (Web = KOROSTUS_PEITTO 1).</summary>
        public static double KehaPeitto(KehanPaino paino) =>
            paino == KehanPaino.Kevyt ? KevytPeitto : paino == KehanPaino.Kevein ? KeveinPeitto : 1.0;

        /// <summary>Kehän peitto natiivin lineaarisessa sekoituksessa maan pohjalla (1 pysyy 1:nä).</summary>
        public static double KehaPeittoNatiivi(KehanPaino paino) =>
            NimiLadonta.LineaarinenAlfa(Vektorisolut.RajaMuste, KehaPeitto(paino), NimiLadonta.PohjaMaa);

        /// <summary>Komennon sana painoksi: web|nykyinen → Web, kevyt → Kevyt, kevein → Kevein; muu = false.</summary>
        public static bool LueKehanPaino(string sana, out KehanPaino paino)
        {
            switch (sana)
            {
                case "web": case "nykyinen": paino = KehanPaino.Web; return true;
                case "kevyt": paino = KehanPaino.Kevyt; return true;
                case "kevein": paino = KehanPaino.Kevein; return true;
                default: paino = KehanPaino.Web; return false;
            }
        }

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

        // ---- MAAKUNTARAJAT (omistajan löydös 113, build 14: liian voimakkaat) ----
        //
        // WEBIN LÄHDE: web ei piirrä maakuntarajoja vektorina (js/pallomaakunnat.js on pelkkä täyttö, pallovektorit.js
        // piirtää vain rannat, valtionrajat ja pelaajan maan kehän). Rajat ovat NIMIÖTASON RASTERISSA:
        // tools/fokuskartta/maailmapiirto.js:4550–4551 RAJAN_LEVEYDET { 6: 1,0, 7: 1,5, 8: 2,2 } px ja RAJAN_VARI
        // rgba(70, 48, 29, 0,45), piirto :4897–4907 (pyöreä liitos ja pää). Tuotannon nimiötaso 2026-09-22g-nimiot
        // (julisteet/pyramidi/pyramidi.json nimiotaso.nimiot raja-*: FRA+DEU, ITA, ESP, GBR, POL, AUT, CHE, tasot 6–8),
        // 512 px:n Miller-laatat, z6 = 43 200 px / 360° = 120 px pituusastetta kohti. Pallo valitsee tason ruudun
        // tiheydestä (js/pallolaatat.js lepokerroksenTaso: matalin taso, jonka leveys/360 ≥ laitepx/leveysaste), joten
        // viiva on ruudulla leveys_px · tiheys · cos φ / tason_px_aste laitepikseliä ja näkyy vasta z6:sta.
        // Pallomaakuntien täyttö (peitto 0,34) piirtyy RASTERIN PÄÄLLE, joten webissä viivan peitto on 0,45 · 0,66.
        // Mitattu (lokit/maakunnat-kaikki/web, iPhone @2x): 1-ranska.jpg tiheys ~142 → ~1,0 laitepx (z6: puhelimen
        // laattakatto pudotti tason, sääntö antaisi z7:n 0,6 px), 2-provence.jpg ~615 → ~2,4 laitepx (z8: 2,0 px);
        // muste neutraalin tumma (RGB-pudotus 38/39/37 = seepia, ei ruoste).

        /// <summary>Pyramidin z6:n tiheys, px pituusastetta kohti (tason z tiheys 120 · 2^(z − 6)).</summary>
        public const double AluerajaZ6PxAste = 120.0;
        /// <summary>Web RAJAN_LEVEYDET tasoille 6, 7, 8 (laatan pikseleinä).</summary>
        public static readonly double[] AluerajaLeveysPx = { 1.0, 1.5, 2.2 };
        /// <summary>Viiva näkyy vasta z6:lla: z5 (60 px/°) riittää tiheyteen 60 asti.</summary>
        public const double AluerajaMinTiheys = AluerajaZ6PxAste / 2;
        /// <summary>Web RAJAN_VARI (sRGB 0–1) ja peitto; pallomaakuntien täyttö 0,34 on rasterin päällä.</summary>
        public static readonly double[] AluerajaMuste = { 70 / 255.0, 48 / 255.0, 29 / 255.0 };
        public const double AluerajaPeittoWeb = 0.45 * (1 - 0.34);
        /// <summary>Sama lineaarisessa sekoituksessa maan pohjalla (NimiLadonta.LineaarinenAlfa, PohjaMaa).</summary>
        public static readonly double AluerajaPeittoNatiivi =
            NimiLadonta.LineaarinenAlfa(AluerajaMuste, AluerajaPeittoWeb, NimiLadonta.PohjaMaa);

        /// <summary>Webin pallon pyramiditaso ruudun tiheydelle (laitepx/leveysaste): 0…8, syvin 8.</summary>
        public static int AluerajaTaso(double tiheys)
        {
            if (double.IsNaN(tiheys) || tiheys <= 0) return 0;
            for (int z = 0; z < 8; z++)
                if (AluerajaZ6PxAste * Math.Pow(2, z - 6) >= tiheys) return z;
            return 8;
        }

        /// <summary>Webin maakuntarajan leveys ruudulla laitepikseleinä (0 alle z6:n); lat = näkymän keskikohdan leveys.</summary>
        public static double AluerajaLaitePx(double tiheys, double lat)
        {
            int z = AluerajaTaso(tiheys);
            if (z < 6) return 0;
            double cos = Math.Max(0.05, Math.Cos((double.IsNaN(lat) ? 0 : lat) * Math.PI / 180.0));
            return AluerajaLeveysPx[z - 6] * tiheys * cos / (AluerajaZ6PxAste * Math.Pow(2, z - 6));
        }

        /// <summary>
        /// Rajaviiva-varjostimen paksuus (pt) ja peiton kerroin, joilla viivan poikkileikkauksen peitto (∫ alfa) on
        /// <paramref name="laitePx"/>: täysi ydin pt·k − 0,5 + reunat antavat pt·k + 0,5, kun puolileveys px = pt·k/2 + 0,75
        /// on vähintään 1; ohuemmalla px² (pt 0 → 0,5625), ja sitä ohuempi viiva himmenee peitolla.
        /// </summary>
        public static (double Pt, double Alfa) AluerajaPiirto(double laitePx, double kerroin)
        {
            if (!(laitePx > 0) || !(kerroin > 0)) return (0, 0);
            if (laitePx >= 1) return ((laitePx - 0.5) / kerroin, 1);
            if (laitePx >= 0.5625) return (2 * (Math.Sqrt(laitePx) - 0.75) / kerroin, 1);
            return (0, laitePx / 0.5625);
        }
    }
}
