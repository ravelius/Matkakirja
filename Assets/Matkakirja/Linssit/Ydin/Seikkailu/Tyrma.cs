// HISTORIAMOOTTORI: TYRMÄ (Siirtoseppä 7.10.2026; pelattavuusmalli-olavinlinna.md kohta 4.1, muunnelma 1 "Pulu tuo avaimet").
// Kulku: Istuu → (3 s) Pulu lentää ilmaraosta ja pudottaa avaimet olkiin → pelaaja poimii → avaa oven → kävelee käytävän päähän → ulos
// (himmennys, viimeisin tarkistuspiste). Vikasieto: 10 s ilman tekoa → vihje (taso 2, toistuu 15 s:n välein), 45 s → lukko aukeaa itse
// (11.10., PT 07.0x, Laitetestaaja 5. kierros: muunnelmissa 1 ja 3 ulos vasta 84–130 s, 60 s:n lukko ratkaisi; avaimet ja irtokivi
// jäivät löytämättä, 20 s:n vihje kerran ei riittänyt).
// Tyrmässä ei voi epäonnistua. Testattava: jokainen muunnelma ≤ 45 s (pelattavuusmalli kohta 11).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum TyrmanVaihe { Istuu, AvaimetOlissa, AvaimetKadessa, OviAuki, Ulkona }

    public sealed class Tyrma
    {
        public const double PuluTuleeS = 3, VihjeS = 10, VihjeValiS = 15, PuluAvaaS = 45, VesipoikaS = 6;
        /// <summary>Ovi auki mutta pelaaja yhä sisällä: oven vihje heti Pulun avatessa ja OviVihjeValiS:n välein (11.10., PT 06.0x,
        /// Laitetestaaja 4. kierros: muunnelma 3 lukko auki 630 s, ulos vasta 1015 s; pyydetty vihje vei ulos 14 s:ssa).</summary>
        public const double OviVihjeValiS = 20;
        /// <summary>Muunnelma: 1 Pulu tuo avaimet, 2 vesipojan ovi jää raolleen, 3 irtokivi ja ryömintä (vuorotellen).</summary>
        public readonly int Muunnelma;
        public Tyrma(int muunnelma = 1) { Muunnelma = muunnelma < 1 || muunnelma > 3 ? 1 : muunnelma; }
        /// <summary>Muunnelma 2: vesipoika jätti oven raolleen (kerran).</summary>
        public bool VesipoikaAvasi;
        public TyrmanVaihe Vaihe { get; private set; } = TyrmanVaihe.Istuu;
        public double Aika { get; private set; }
        double viimeTeko, vihjeAika = -1;
        /// <summary>Tapahtumat sovittimelle (kerran per tapahtuma): Pulu pudotti avaimet, vihje (VihjeS tekoa vaille, sitten
        /// VihjeValiS:n välein), Pulu avasi oven.</summary>
        public bool PuluPudotti, Vihje, PuluAvasi;
        /// <summary>Oven vihje (kerran per tapahtuma): ovi auki eikä pelaaja ole vielä ulkona.</summary>
        public bool OviVihje;
        /// <summary>Muunnelma 3: irtokivi irti, ryömintäaukko kulkukelpoinen (myös Pulun avattua oven).</summary>
        public bool AukkoAuki { get; private set; }
        double oviAukiAika = -1;

        public void Paivita(double dt)
        {
            Aika += dt;
            if (Muunnelma == 1 && Vaihe == TyrmanVaihe.Istuu && Aika >= PuluTuleeS) { Vaihe = TyrmanVaihe.AvaimetOlissa; PuluPudotti = true; viimeTeko = Aika; }
            if (Muunnelma == 2 && Vaihe == TyrmanVaihe.Istuu && Aika >= VesipoikaS) { Vaihe = TyrmanVaihe.OviAuki; VesipoikaAvasi = true; viimeTeko = Aika; }
            if (Vaihe == TyrmanVaihe.OviAuki)
            {
                if (oviAukiAika < 0) oviAukiAika = Aika;
                if (Aika - oviAukiAika >= OviVihjeValiS) { oviAukiAika = Aika; OviVihje = true; }
                return;
            }
            if (Vaihe == TyrmanVaihe.Ulkona) return;
            if (vihjeAika < 0 ? Aika - viimeTeko >= VihjeS : Aika - vihjeAika >= VihjeValiS) { vihjeAika = Aika; Vihje = true; }
            if (Aika >= PuluAvaaS) { Vaihe = TyrmanVaihe.OviAuki; PuluAvasi = true; OviVihje = true; oviAukiAika = Aika; }
        }

        public bool Poimi() { if (Vaihe != TyrmanVaihe.AvaimetOlissa) return false; Vaihe = TyrmanVaihe.AvaimetKadessa; Teko(); return true; }
        public bool AvaaOvi() { if (Vaihe != TyrmanVaihe.AvaimetKadessa) return false; Vaihe = TyrmanVaihe.OviAuki; Teko(); return true; }
        public bool Ulos() { if (Vaihe != TyrmanVaihe.OviAuki) return false; Vaihe = TyrmanVaihe.Ulkona; return true; }
        /// <summary>Muunnelma 3: irtokivi irrotettu → ryömintäaukko auki.</summary>
        public bool KiviIrti()
        {
            // Myös Pulun avattua oven (v8: kivi irti lukon jälkeen ei avannut aukkoa, pelaaja jäi aukon suulle).
            if (Muunnelma != 3 || AukkoAuki || Vaihe != TyrmanVaihe.Istuu && Vaihe != TyrmanVaihe.OviAuki) return false;
            AukkoAuki = true; Vaihe = TyrmanVaihe.OviAuki; Teko(); return true;
        }
        /// <summary>Muunnelma 3: koputus tai raapaisu on tekoa (vihjeajastin alusta).</summary>
        public void Yritys() => Teko();
        void Teko() { viimeTeko = Aika; vihjeAika = -1; }
    }
}
