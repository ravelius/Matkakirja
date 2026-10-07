// HISTORIAMOOTTORI (Siirtoseppä 7.10.2026): tyrmä muunnelma 1 — sujuva pako ≤ 45 s, 20 s → vihje kerran, 60 s → Pulu avaa oven.
using System;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class TyrmaTestit
    {
        static void Aja(Tyrma t, double s) { for (double x = 0; x < s; x += 0.1) t.Paivita(0.1); }

        [Testi] static void SujuvaPakoAlle45s()
        {
            var t = new Tyrma();
            Oleta.Tosi(!t.Poimi(), "ei avaimia ennen Pulua");
            Aja(t, Tyrma.PuluTuleeS + 0.1);
            Oleta.Tosi(t.PuluPudotti && t.Vaihe == TyrmanVaihe.AvaimetOlissa, "Pulu pudotti avaimet");
            Aja(t, 4); Oleta.Tosi(t.Poimi(), "poimi (2 m kävely)");
            Aja(t, 6); Oleta.Tosi(t.AvaaOvi(), "ovi (avain lukkoon)");
            Aja(t, 12); Oleta.Tosi(t.Ulos(), "käytävä");
            Oleta.Tosi(t.Aika <= 45, $"muunnelma 1 ≤ 45 s ({t.Aika:F0} s)");
        }

        [Testi] static void Muunnelmat2ja3()
        {
            var v = new Tyrma(2);
            Aja(v, Tyrma.VesipoikaS + 0.2);
            Oleta.Tosi(v.VesipoikaAvasi && v.Vaihe == TyrmanVaihe.OviAuki, "vesipoika jätti oven raolleen");
            Aja(v, 20); Oleta.Tosi(v.Ulos() && v.Aika <= 45, $"muunnelma 2 ≤ 45 s ({v.Aika:F0} s)");
            var k = new Tyrma(3);
            Aja(k, 8); k.Yritys(); Aja(k, 10);
            Oleta.Tosi(k.KiviIrti() && k.Vaihe == TyrmanVaihe.OviAuki, "irtokivi → aukko");
            Aja(k, 10); Oleta.Tosi(k.Ulos() && k.Aika <= 45, $"muunnelma 3 ≤ 45 s ({k.Aika:F0} s)");
            Oleta.Sama(1, new Tyrma(7).Muunnelma);
        }

        [Testi] static void VikasietoVihjeJaPuluAvaa()
        {
            var t = new Tyrma();
            Aja(t, Tyrma.PuluTuleeS + Tyrma.VihjeS + 0.5);
            Oleta.Tosi(t.Vihje, "20 s ilman tekoa → vihje");
            t.Vihje = false; Aja(t, 10); Oleta.Tosi(!t.Vihje, "vihje kerran");
            Aja(t, Tyrma.PuluAvaaS);
            Oleta.Tosi(t.PuluAvasi && t.Vaihe == TyrmanVaihe.OviAuki, "60 s → Pulu avaa oven");
        }
    }
}
