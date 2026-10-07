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
        public const double PuluTuleeS = 3, VihjeS = 20, PuluAvaaS = 60;
        public TyrmanVaihe Vaihe { get; private set; } = TyrmanVaihe.Istuu;
        public double Aika { get; private set; }
        double viimeTeko; bool vihjeAnnettu;
        /// <summary>Tapahtumat sovittimelle (kerran): Pulu pudotti avaimet, vihje, Pulu avasi oven.</summary>
        public bool PuluPudotti, Vihje, PuluAvasi;

        public void Paivita(double dt)
        {
            Aika += dt;
            if (Vaihe == TyrmanVaihe.Istuu && Aika >= PuluTuleeS) { Vaihe = TyrmanVaihe.AvaimetOlissa; PuluPudotti = true; viimeTeko = Aika; }
            if (Vaihe == TyrmanVaihe.OviAuki || Vaihe == TyrmanVaihe.Ulkona) return;
            if (!vihjeAnnettu && Aika - viimeTeko >= VihjeS) { vihjeAnnettu = true; Vihje = true; }
            if (Aika >= PuluAvaaS) { Vaihe = TyrmanVaihe.OviAuki; PuluAvasi = true; }
        }

        public bool Poimi() { if (Vaihe != TyrmanVaihe.AvaimetOlissa) return false; Vaihe = TyrmanVaihe.AvaimetKadessa; Teko(); return true; }
        public bool AvaaOvi() { if (Vaihe != TyrmanVaihe.AvaimetKadessa) return false; Vaihe = TyrmanVaihe.OviAuki; Teko(); return true; }
        public bool Ulos() { if (Vaihe != TyrmanVaihe.OviAuki) return false; Vaihe = TyrmanVaihe.Ulkona; return true; }
        void Teko() { viimeTeko = Aika; vihjeAnnettu = false; }
    }
}
