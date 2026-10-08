// Kaupungin laattatarkkuus ja välimuisti muistibudjetista (juna 170, Natiiviseppä): entinen käytös säilyy kevennetyillä ja
// tuntemattomalla muistilla; täysi laiteluokka saa SSE:n lattiaan 0,5 asti ja välimuistin ylijäämästä.
using System;
using Matkakirja.Linssit.Kierros;

namespace Matkakirja.Linssit.Testit
{
    public static class KaupunkiMuistibudjettiTestit
    {
        static void Lahella(double odotettu, double saatu, string viesti) => Oleta.Tosi(Math.Abs(odotettu - saatu) < 1e-3, $"{viesti}: odotettu {odotettu}, saatu {saatu}");

        [Testi] static void TuntematonVapaaOnEntinen()
        {
            Lahella(1.71, KaupunkiMuistibudjetti.Valitse(-1, 1.71, true).Kerroin, "iPad Pro, ei tiedossa");
            Lahella(1.0, KaupunkiMuistibudjetti.Valitse(-1, 1.0, true).Kerroin, "iPhone, ei tiedossa");
            Oleta.Sama(KaupunkiMuistibudjetti.ValimuistiPerus, KaupunkiMuistibudjetti.Valitse(-1, 1.71, true).Valimuisti);
        }

        [Testi] static void KevennettyPitaaEntisenLattian()
        {
            // A-iPad / iPhone 15 Pro: lattia 1,3 (iPhone: näyttökerroin 1), välimuisti 256 Mt.
            Lahella(1.3, KaupunkiMuistibudjetti.Valitse(12, 1.6, false).Kerroin, "kevennetty iPad, paljon muistia");
            Lahella(1.0, KaupunkiMuistibudjetti.Valitse(8, 1.0, false).Kerroin, "kevennetty iPhone");
            Oleta.Sama(KaupunkiMuistibudjetti.ValimuistiPerus, KaupunkiMuistibudjetti.Valitse(12, 1.6, false).Valimuisti);
            Lahella(1.6, KaupunkiMuistibudjetti.Valitse(1.5, 1.6, false).Kerroin, "budjetti loppu → näyttökerroin");
        }

        [Testi] static void TaysiTerävoityyMuistinMukaan()
        {
            // M-iPad 8 Gt (vapaa ~5,5 Gt, budjetti 4): k = 1,71 × (2,4/4)^1,25 ≈ 0,90 → SSE ≈ 14; kasvu = budjetti → välimuisti perus.
            var m8 = KaupunkiMuistibudjetti.Valitse(5.5, 1.71, true);
            Oleta.Tosi(m8.Kerroin > 0.85 && m8.Kerroin < 0.95, "M-iPad 8 Gt: " + m8.Kerroin);
            Oleta.Sama(KaupunkiMuistibudjetti.ValimuistiPerus, m8.Valimuisti, "budjetti käytetty tarkkuuteen");
            // M-iPad 16 Gt (vapaa ~11 Gt): lattia 0,5 (SSE 8), kasvu ~6,5 Gt → ylijäämästä välimuisti 1,5 Gt:n kattoon asti.
            var m16 = KaupunkiMuistibudjetti.Valitse(11, 1.71, true);
            Lahella(0.5, m16.Kerroin, "M-iPad 16 Gt lattiassa");
            Oleta.Tosi(m16.Valimuisti > KaupunkiMuistibudjetti.ValimuistiPerus && m16.Valimuisti <= KaupunkiMuistibudjetti.ValimuistiMax, "välimuisti " + (m16.Valimuisti >> 20));
            // iPhone 17 Pro (vapaa ~4,5 Gt, budjetti 3): k = (2,4/3)^1,25 ≈ 0,76 → SSE ≈ 12.
            var i17 = KaupunkiMuistibudjetti.Valitse(4.5, 1.0, true);
            Oleta.Tosi(i17.Kerroin > 0.7 && i17.Kerroin < 0.8, "iPhone 17 Pro: " + i17.Kerroin);
            // Kasvu ei koskaan ylitä budjettia, kun kerroin ei ole lattiassa.
            foreach (var v in new[] { 2.5, 3.0, 4.0, 5.0, 6.0 })
            {
                var t = KaupunkiMuistibudjetti.Valitse(v, 1.71, true);
                if (t.Kerroin > KaupunkiMuistibudjetti.TaysiLattia + 1e-6 && t.Kerroin < 1.71 - 1e-6)
                    Oleta.Tosi(KaupunkiMuistibudjetti.Kasvu(t.Kerroin, 1.71) <= v - KaupunkiMuistibudjetti.MarginaaliGt + 1e-6, "kasvu ≤ budjetti " + v);
            }
        }
    }
}
