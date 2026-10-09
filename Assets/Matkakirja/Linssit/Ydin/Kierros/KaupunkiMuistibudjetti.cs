// KAUPUNGIN LAATTOJEN TARKKUUS JA VÄLIMUISTI MUISTIBUDJETISTA (omistaja 8.10.2026 19.5x "lisää muistin käyttöä niin paljon kuin
// pystyy"; Päätoimittaja ja raportti pallo-unreal-vertailu-20261008.md kohta 4: laitekohtainen SSE 8–12 ja välimuisti 0,5–1,5 Gt;
// Natiiviseppä, juna 170). Moottoriton: CesiumKaupunki (Unity) kutsuu kaupungin avautuessa os_proc_available_memory():n arvolla.
//
// MALLI (CesiumKaupunki 6.10., mitattu simussa): Googlen 3D-laattojen muistin kasvu SSE-kertoimella k on
// KaupunkiGt × (näyttökerroin / k)^Eksponentti (Akropolis: k 1,71 → 0,94 Gt, 1,0 → 1,45 Gt; SSE 8 eli k 0,5 → RSS 7,7 Gt simussa).
// Kerroin valitaan niin, että kasvu mahtuu budjettiin (vapaa − MarginaaliGt). Lattia: täyden laiteluokan laitteilla (M-iPad, iPhone
// 16/17, Mac) TaysiLattia 0,5 (SSE 8); muilla entinen AlarajaKerroin 1,3 (Päätoimittaja 6.10.) mutta ei yli näyttökertoimen.
// VÄLIMUISTI (käyttämättömät laatat, maximumCachedBytes) kasvaa vain täydellä laiteluokalla, kun SSE on jo lattiassa ja budjettia
// jää: puolet ylijäämästä, välillä 256 Mt … 1,5 Gt. Vapaa ei tiedossa (editori, simulaattori, Mac) → entinen käytös täsmälleen.
using System;

namespace Matkakirja.Linssit.Kierros
{
    public static class KaupunkiMuistibudjetti
    {
        public const double MarginaaliGt = 1.5, KaupunkiGt = 2.4, Eksponentti = 0.8;
        public const double AlarajaKerroin = 1.3, TaysiLattia = 0.5;
        /// <summary>Karkein kerroin näyttökertoimeen nähden, kun budjetti ei riitä näyttökertoimellakaan (juna 173: iPad Pro 13 kaatui
        /// Pariisissa jetsamiin, vapaa 3,02 Gt kaupungin avautuessa → kasvu näyttökertoimella 2,4 Gt > budjetti 1,5 Gt). Ennen 173:a
        /// kerroin pysähtyi näyttökertoimeen; nyt se karkenee enintään ×1,6 (esim. iPad 1,70 → 2,72, Google-SSE 27 → 44).</summary>
        public const double KarkeinLisa = 1.6;
        /// <summary>Kehityskaupungin oma sisältö (omat mallit, vesi, ilmakehän taulukot, äänet, intro; juna 174, Opus-erittely 9.10.:
        /// ~0,3 Gt), joka ei ole Googlen laattoja: vähennetään budjetista ennen kertoimen valintaa.</summary>
        public const double OmaSisaltoGt = 0.3;
        public const long ValimuistiPerus = 256L << 20, ValimuistiMax = 1536L << 20;

        /// <summary>Kaupungin arvioitu muistin kasvu (Gt) kertoimella k.</summary>
        public static double Kasvu(double k, double naytto) => KaupunkiGt * Math.Pow(Math.Max(1.0, naytto) / k, Eksponentti);

        /// <summary>SSE-kerroin ja Googlen välimuisti (tavua). vapaaGt ≤ 0 = ei tiedossa.</summary>
        public static (double Kerroin, long Valimuisti) Valitse(double vapaaGt, double naytto, bool taysi, double omaGt = 0)
        {
            naytto = Math.Max(1.0, naytto);
            double lattia = taysi ? TaysiLattia : Math.Min(naytto, AlarajaKerroin);
            if (vapaaGt <= 0) return (Math.Min(naytto, Math.Max(AlarajaKerroin, naytto)), ValimuistiPerus);   // entinen: näyttökerroin
            double budjetti = vapaaGt - MarginaaliGt - Math.Max(0, omaGt), karkein = naytto * KarkeinLisa;
            if (budjetti <= 0.1) return (karkein, ValimuistiPerus);
            double k = naytto * Math.Pow(KaupunkiGt / budjetti, 1.0 / Eksponentti);
            k = Math.Min(karkein, Math.Max(lattia, k));
            long valimuisti = ValimuistiPerus;
            if (taysi)
            {
                double yli = budjetti - Kasvu(k, naytto);
                if (yli > 0.5) valimuisti = Math.Min(ValimuistiMax, Math.Max(ValimuistiPerus, (long)(yli / 2 * (1L << 30))));
            }
            return (k, valimuisti);
        }

        // ---- LÄHITARKKUUS SAMASTA BUDJETISTA (Linssiseppä 8.10., suunnitelma A3; PT: yksi muistibudjetti) ----
        // Pysähdyksellä kohdetta kohti suunnattu kapea lisäkamera (kenttäkulma / L) valitsee kohteen ympäriltä laatat kertoimella k / L.
        // Lisäkamera kattaa ~1/L² kuvasta, joten sen kasvu on Kasvu(k / L) / L² = Kasvu(k) · L^(Eksponentti − 2). Yhteinen valinta: kohteen
        // ympärillä tavoite TaysiLattia (SSE 8) eli k = L · TaysiLattia, ja L pienin, jolla Kasvu(k) · (1 + L^(e − 2)) mahtuu budjettiin.
        // L = 1 → ei lisäkameraa (koko kuva jo lattiassa tai budjetti ei riitä). Vain täysi laiteluokka ja tunnettu vapaa muisti;
        // muuten Valitse sellaisenaan ja L = 1. HUOM: Valitse käyttää jo koko budjetin muun kuvan tarkkuuteen, joten lähikamera mahtuu
        // vain, jos muu kuva saa karkeutua (karkeneminen = sallittu k / k0). Oletus 1,0 = ei karkene → L = 1 (A3 ei käytössä);
        // esim. M-iPad 8 Gt tarvitsisi 1,45 (muu SSE 14 → 21, kohde SSE 8). Päätös Päätoimittajalle.
        public const double LahiMax = 3.0;

        /// <summary>Kasvu (Gt) kertoimella k ja lähikameralla L (1 = ei lähikameraa).</summary>
        public static double KasvuLahella(double k, double naytto, double lahi) => Kasvu(k, naytto) * (1 + (lahi > 1.0001 ? Math.Pow(lahi, Eksponentti - 2) : 0));

        /// <summary>SSE-kerroin, välimuisti ja lähikameran kerroin L samasta budjetista.</summary>
        public static double Karkeneminen = 1.0;

        public static (double Kerroin, long Valimuisti, double Lahi) ValitseLahella(double vapaaGt, double naytto, bool taysi, double karkeneminen = -1, double omaGt = 0)
        {
            if (karkeneminen <= 0) karkeneminen = Karkeneminen;
            var (k0, v0) = Valitse(vapaaGt, naytto, taysi, omaGt);
            naytto = Math.Max(1.0, naytto);
            if (!taysi || vapaaGt <= 0 || k0 <= TaysiLattia * 1.05) return (k0, v0, 1.0);
            double budjetti = vapaaGt - MarginaaliGt - Math.Max(0, omaGt);
            for (double l = 1.1; l <= LahiMax + 1e-9; l += 0.05)
            {
                double k = l * TaysiLattia;
                if (k > naytto) break;
                if (k < k0 * 0.999) continue;   // muu kuva ei saa tarkentua lähikameran takia (k0 on jo budjetin raja)
                if (k > k0 * karkeneminen + 1e-9) break;   // eikä karkeutua yli sallitun
                if (KasvuLahella(k, naytto, l) <= budjetti) return (k, v0, l);
            }
            return (k0, v0, 1.0);
        }
    }
}
