// Cupola päivänvaloon (arvioija 1.1 (75), Päätoimittaja 30.9.): yöpuolen LIVE-hetkestä seuraavaan päivänvaloon.
using System;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Iss;

namespace Matkakirja.Linssit.Testit
{
    public static class CupolaPaivaTestit
    {
        [Testi] static void SeuraavaPaivanvaloHelsingissa()
        {
            var hki = new LatLon(60.17, 24.94);
            // 30.9.2026 klo 00 UTC (03 Suomen aikaa): yö; aurinko nousee ~04.20 UTC ja on 14,5° korkeudella noin 3 h myöhemmin.
            var yo = new DateTime(2026, 9, 30, 0, 0, 0, DateTimeKind.Utc);
            Oleta.Tosi(Avaruuskavely.MaanAurinko(yo, hki) < Avaruuskavely.YoRaja, "keskiyöllä yöpuolella");
            var p = Avaruuskavely.SeuraavaPaivanvalo(_ => hki, yo, 12 * 3600);
            Oleta.Tosi(p.HasValue, "valo löytyy");
            double a = Avaruuskavely.MaanAurinko(p.Value, hki), ennen = Avaruuskavely.MaanAurinko(p.Value.AddSeconds(-2), hki);
            Oleta.Tosi(a >= Avaruuskavely.PaivaRaja && ennen < Avaruuskavely.PaivaRaja, $"ensimmäinen valoisa hetki ({p.Value:HH.mm} UTC, {a:0.000})");
            Oleta.Tosi(p.Value.Hour >= 5 && p.Value.Hour <= 9, $"aamupäivällä {p.Value:HH.mm} UTC");
            // Jo valoisassa: sama hetki; napayö hakuajassa: null.
            var paiva = new DateTime(2026, 9, 30, 10, 0, 0, DateTimeKind.Utc);
            Oleta.Sama(paiva, Avaruuskavely.SeuraavaPaivanvalo(_ => hki, paiva).Value, "päivällä ei siirretä");
            var napa = new LatLon(-89, 0);   // etelänapa syyskuussa: aurinko horisontissa, ei 14,5°:een
            Oleta.Tosi(!Avaruuskavely.SeuraavaPaivanvalo(_ => napa, yo, 6 * 3600).HasValue, "napa: ei päivänvaloa");
        }

        [Testi] static void KyydinAikaPaivaVainEiLivena()
        {
            var s = new Simukello(() => new DateTime(2026, 9, 30, 0, 0, 0, DateTimeKind.Utc));
            Oleta.Tosi(!KyydinAika.Kellosta(s, null, true).Paiva, "LIVEnä ei PÄIVÄ-kilpeä");
            s.KelaaHetkeen(new DateTime(2026, 9, 30, 0, 30, 0, DateTimeKind.Utc), vahennetty: true);
            Oleta.Tosi(KyydinAika.Kellosta(s, null, true).Paiva && KyydinAika.Kellosta(s, null, true).Nopeutettu, "siirrettynä PÄIVÄ, PALAA");
        }
    }
}
