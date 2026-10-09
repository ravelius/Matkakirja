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
            Lahella(1.6 * KaupunkiMuistibudjetti.KarkeinLisa, KaupunkiMuistibudjetti.Valitse(1.5, 1.6, false).Kerroin, "budjetti loppu → karkein (näyttö × KarkeinLisa)");
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
    
        // A3 (Linssiseppä 8.10.): lähikamera samasta budjetista: kokonaiskasvu mahtuu, kohteen ympärillä SSE 8, muu kuva ei tarkennu
        // lähikameran takia; kevennetty, tuntematon ja jo lattiassa oleva → ei lähikameraa.
        [Testi] static void LahitarkkuusSamastaBudjetista()
        {
            // Oletus: muu kuva ei karkene → budjetti on jo käytetty, ei lähikameraa (A3 pois päältä).
            Oleta.Sama(1.0, KaupunkiMuistibudjetti.ValitseLahella(5.5, 1.71, true).Lahi, "M-iPad 8 Gt oletuksella");
            // Päätoimittajan valinnalla (muu saa karkeutua 1,5 ×): kohteen ympärillä SSE 8 ja kokonaiskasvu budjetissa.
            var p = KaupunkiMuistibudjetti.Valitse(5.5, 1.71, true);
            var a = KaupunkiMuistibudjetti.ValitseLahella(5.5, 1.71, true, 1.5);
            Oleta.Tosi(a.Lahi > 1.0 && Math.Abs(a.Kerroin / a.Lahi - KaupunkiMuistibudjetti.TaysiLattia) < 1e-6, $"kohteen ympärillä SSE 8 (k {a.Kerroin:F2}, L {a.Lahi:F2})");
            Oleta.Tosi(a.Kerroin >= p.Kerroin - 1e-9 && a.Kerroin <= p.Kerroin * 1.5 + 1e-9, "muu kuva sallitulla välillä");
            Oleta.Tosi(KaupunkiMuistibudjetti.KasvuLahella(a.Kerroin, 1.71, a.Lahi) <= 5.5 - KaupunkiMuistibudjetti.MarginaaliGt + 1e-9, "mahtuu budjettiin");
            Oleta.Sama(1.0, KaupunkiMuistibudjetti.ValitseLahella(12, 1.6, false, 1.5).Lahi, "kevennetty ei");
            Oleta.Sama(1.0, KaupunkiMuistibudjetti.ValitseLahella(-1, 1.71, true, 1.5).Lahi, "tuntematon ei");
            Oleta.Sama(1.0, KaupunkiMuistibudjetti.ValitseLahella(14, 1.71, true, 1.5).Lahi, "16 Gt: koko kuva jo SSE 8, ei lähikameraa");
        }

        // Juna 173 (iPad Pro 13 M1 8 Gt, jetsam Pariisissa): vapaa 3,02 Gt kaupungin avautuessa → budjetti 1,52 Gt ei riitä
        // näyttökertoimella (kasvu 2,4 Gt) → kerroin karkenee yli näyttökertoimen, enintään ×KarkeinLisa, ja kasvu pienenee.
        [Testi] static void VahaMuistiKarkeneeYliNayttokertoimen()
        {
            var t = KaupunkiMuistibudjetti.Valitse(3.02, 1.70, true);
            Oleta.Tosi(t.Kerroin > 1.70 + 1e-6 && t.Kerroin <= 1.70 * KaupunkiMuistibudjetti.KarkeinLisa + 1e-9, "iPad 3,02 Gt: " + t.Kerroin);
            Oleta.Tosi(KaupunkiMuistibudjetti.Kasvu(t.Kerroin, 1.70) < KaupunkiMuistibudjetti.Kasvu(1.70, 1.70) * 0.75, "kasvu pienenee vähintään 25 %");
            // Riittävällä muistilla ennallaan (ei karkeampi kuin ennen).
            Oleta.Tosi(KaupunkiMuistibudjetti.Valitse(5.5, 1.71, true).Kerroin < 1.0, "M-iPad 5,5 Gt ennallaan");
        }

        // Juna 174: kehityskaupungin oma sisältö (0,3 Gt) vähennetään budjetista → kerroin karkeampi, kasvu mahtuu jäljelle jäävään.
        [Testi] static void OmaSisaltoVahennetaanBudjetista()
        {
            var ilman = KaupunkiMuistibudjetti.Valitse(5.5, 1.71, true);
            var oma = KaupunkiMuistibudjetti.Valitse(5.5, 1.71, true, KaupunkiMuistibudjetti.OmaSisaltoGt);
            Oleta.Tosi(oma.Kerroin > ilman.Kerroin, $"oma sisältö karkentaa: {ilman.Kerroin:F3} → {oma.Kerroin:F3}");
            Oleta.Tosi(KaupunkiMuistibudjetti.Kasvu(oma.Kerroin, 1.71) <= 5.5 - KaupunkiMuistibudjetti.MarginaaliGt - KaupunkiMuistibudjetti.OmaSisaltoGt + 1e-6, "kasvu mahtuu");
            Lahella(ilman.Kerroin, KaupunkiMuistibudjetti.Valitse(5.5, 1.71, true, 0).Kerroin, "omaGt 0 = ennallaan");
        }

        // Juna 173 (LS1 iPad 22.4x): pienellä muistilla kasvumalli ×1,75, kerroin enintään ×2,5 ja välimuisti 64 Mt; iPad 3,0 Gt vapaata
        // → kerroin yli 2,72:n (entinen katto), mallin kasvu mahtuu budjettiin tai kerroin on katossa.
        [Testi] static void PieniMuistiKalibroitu()
        {
            var t = KaupunkiMuistibudjetti.Valitse(3.0, 1.70, true, KaupunkiMuistibudjetti.OmaSisaltoGt, true);
            Oleta.Tosi(t.Kerroin > 1.70 * KaupunkiMuistibudjetti.KarkeinLisa + 1e-6, "pieni iPad karkeampi kuin entinen katto: " + t.Kerroin);
            Oleta.Tosi(t.Kerroin <= 1.70 * KaupunkiMuistibudjetti.PieniKarkeinLisa + 1e-9, "katossa enintään ×2,5");
            Oleta.Sama(KaupunkiMuistibudjetti.PieniValimuisti, t.Valimuisti, "välimuisti 64 Mt");
            Oleta.Sama(1.0, KaupunkiMuistibudjetti.ValitseLahella(3.0, 1.70, true, -1, 0.3, true).Lahi, "ei lähikameraa");
            // Isot laitteet ennallaan.
            Lahella(KaupunkiMuistibudjetti.Valitse(11, 1.71, true).Kerroin, KaupunkiMuistibudjetti.Valitse(11, 1.71, true, 0, false).Kerroin, "16 Gt ennallaan");
        }
    }
}
