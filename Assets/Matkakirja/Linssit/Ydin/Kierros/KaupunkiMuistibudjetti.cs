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
        public const long ValimuistiPerus = 256L << 20, ValimuistiMax = 1536L << 20;

        /// <summary>Kaupungin arvioitu muistin kasvu (Gt) kertoimella k.</summary>
        public static double Kasvu(double k, double naytto) => KaupunkiGt * Math.Pow(Math.Max(1.0, naytto) / k, Eksponentti);

        /// <summary>SSE-kerroin ja Googlen välimuisti (tavua). vapaaGt ≤ 0 = ei tiedossa.</summary>
        public static (double Kerroin, long Valimuisti) Valitse(double vapaaGt, double naytto, bool taysi)
        {
            naytto = Math.Max(1.0, naytto);
            double lattia = taysi ? TaysiLattia : Math.Min(naytto, AlarajaKerroin);
            if (vapaaGt <= 0) return (Math.Min(naytto, Math.Max(AlarajaKerroin, naytto)), ValimuistiPerus);   // entinen: näyttökerroin
            double budjetti = vapaaGt - MarginaaliGt;
            if (budjetti <= 0.1) return (naytto, ValimuistiPerus);
            double k = naytto * Math.Pow(KaupunkiGt / budjetti, 1.0 / Eksponentti);
            k = Math.Min(naytto, Math.Max(lattia, k));
            long valimuisti = ValimuistiPerus;
            if (taysi)
            {
                double yli = budjetti - Kasvu(k, naytto);
                if (yli > 0.5) valimuisti = Math.Min(ValimuistiMax, Math.Max(ValimuistiPerus, (long)(yli / 2 * (1L << 30))));
            }
            return (k, valimuisti);
        }
    }
}
