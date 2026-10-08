// HISTORIAMOOTTORI: TYRMÄ (Siirtoseppä 7.10.2026; pelattavuusmalli-olavinlinna.md kohta 4.1, muunnelma 1 "Pulu tuo avaimet").
// Kulku: Istuu → (3 s) Pulu lentää ilmaraosta ja pudottaa avaimet olkiin → pelaaja poimii → avaa oven → kävelee käytävän päähän → ulos
// (himmennys, viimeisin tarkistuspiste). Vikasieto: 20 s ilman tekoa → Pulun vihje (taso 2), 60 s → Pulu avaa oven itse.
// Tyrmässä ei voi epäonnistua. Testattava: jokainen muunnelma ≤ 45 s (pelattavuusmalli kohta 11).
using System;

namespace Matkakirja.Linssit.Seikkailu
{
    public enum TyrmanVaihe { Istuu, AvaimetOlissa, AvaimetKadessa, OviAuki, Ulkona }

    public sealed class Tyrma
    {
        public const double PuluTuleeS = 3, VihjeS = 20, PuluAvaaS = 60, VesipoikaS = 6;
        /// <summary>Muunnelma: 1 Pulu tuo avaimet, 2 vesipojan ovi jää raolleen, 3 irtokivi ja ryömintä (vuorotellen).</summary>
        public readonly int Muunnelma;
        public Tyrma(int muunnelma = 1) { Muunnelma = muunnelma < 1 || muunnelma > 3 ? 1 : muunnelma; }
        /// <summary>Muunnelma 2: vesipoika jätti oven raolleen (kerran).</summary>
        public bool VesipoikaAvasi;
        public TyrmanVaihe Vaihe { get; private set; } = TyrmanVaihe.Istuu;
        public double Aika { get; private set; }
        double viimeTeko; bool vihjeAnnettu;
        /// <summary>Tapahtumat sovittimelle (kerran): Pulu pudotti avaimet, vihje, Pulu avasi oven.</summary>
        public bool PuluPudotti, Vihje, PuluAvasi;

        public void Paivita(double dt)
        {
            Aika += dt;
            if (Muunnelma == 1 && Vaihe == TyrmanVaihe.Istuu && Aika >= PuluTuleeS) { Vaihe = TyrmanVaihe.AvaimetOlissa; PuluPudotti = true; viimeTeko = Aika; }
            if (Muunnelma == 2 && Vaihe == TyrmanVaihe.Istuu && Aika >= VesipoikaS) { Vaihe = TyrmanVaihe.OviAuki; VesipoikaAvasi = true; viimeTeko = Aika; }
            if (Vaihe == TyrmanVaihe.OviAuki || Vaihe == TyrmanVaihe.Ulkona) return;
            if (!vihjeAnnettu && Aika - viimeTeko >= VihjeS) { vihjeAnnettu = true; Vihje = true; }
            if (Aika >= PuluAvaaS) { Vaihe = TyrmanVaihe.OviAuki; PuluAvasi = true; }
        }

        public bool Poimi() { if (Vaihe != TyrmanVaihe.AvaimetOlissa) return false; Vaihe = TyrmanVaihe.AvaimetKadessa; Teko(); return true; }
        public bool AvaaOvi() { if (Vaihe != TyrmanVaihe.AvaimetKadessa) return false; Vaihe = TyrmanVaihe.OviAuki; Teko(); return true; }
        public bool Ulos() { if (Vaihe != TyrmanVaihe.OviAuki) return false; Vaihe = TyrmanVaihe.Ulkona; return true; }
        /// <summary>Muunnelma 3: irtokivi irrotettu → ryömintäaukko auki.</summary>
        public bool KiviIrti() { if (Muunnelma != 3 || Vaihe != TyrmanVaihe.Istuu) return false; Vaihe = TyrmanVaihe.OviAuki; Teko(); return true; }
        /// <summary>Muunnelma 3: koputus tai raapaisu on tekoa (vihjeajastin alusta).</summary>
        public void Yritys() => Teko();
        void Teko() { viimeTeko = Aika; vihjeAnnettu = false; }
    }
}
