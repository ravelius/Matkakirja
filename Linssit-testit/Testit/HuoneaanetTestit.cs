// HUONEEN ÄÄNET PELAAJAN HUONEESTA (Siirtoseppä 10.10.2026, PT:n jono): kävelyosa → dioraaman tila, jonka äänimaisema soi
// pelattavassa palassa (KavelyData.AaniTila). Osat ja tilat Olavinlinnan PelattavaPala.Versio-datasta.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;

namespace Matkakirja.Linssit.Testit
{
    public static class HuoneaanetTestit
    {
        static string Lue(string n) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "olavinlinna-" + PelattavaPala.Versio + "-" + n));

        [Testi] static void KavelyosaLoytaaHuoneenAanet()
        {
            var d = KavelyData.Lue(Lue("osat.json"), Lue("merkit.json"));
            var tilat = new List<string>();
            foreach (var t in DioraamaData.Lue(Lue("rakennus.json")).Tilat) tilat.Add(t.Id);
            Oleta.Sama("keittio-g102", d.AaniTila("keittio-G102", tilat));
            Oleta.Sama("kappeli", d.AaniTila("kappeli-kavely", tilat));
            Oleta.Sama("kierreportaat", d.AaniTila("kirkkotorni-portaat", tilat));   // v46o: osan tila-kenttä (LR)
            Oleta.Sama("keskushalli", d.AaniTila("palatsi", tilat));
            Oleta.Sama((string)null, d.AaniTila("pikkupiha", tilat));
            Oleta.Sama((string)null, d.AaniTila(null, tilat));
        }

        [Testi] static void OsanTilaKenttaVoittaaPaattelyn()
        {
            var d = KavelyData.Lue("{\"osat\":{\"kirkkotorni-portaat\":{\"tila\":\"kierreportaat\"}}}", "{\"merkit\":[]}");
            Oleta.Sama("kierreportaat", d.AaniTila("kirkkotorni-portaat", new[] { "kierreportaat", "kappeli" }));
        }

        /// <summary>Syke hälytyksessä (SykeSekoitus, PT 10.10.): pehmeä ristihäivytys 1,5 s, tasateho, paluu rauhalliseen, puhe −6 dB.</summary>
        [Testi] static void SykeRistihaivyttyyNopeaan()
        {
            double o = 0;
            o = SykeSekoitus.Osuus(o, true, 0.75); Oleta.Tosi(Math.Abs(o - 0.5) < 1e-9, "puolessa välissä 0,75 s:n jälkeen");
            var (r, n, sr, sn) = SykeSekoitus.Tasot(100, o, false);
            double v = 0.55 + 0.35 * 0.6;
            Oleta.Tosi(Math.Abs(r * r + n * n - v * v) < 1e-9, "tasateho: r² + n² = v²");
            Oleta.Tosi(Math.Abs(sr - 100 / 70.0) < 1e-9 && Math.Abs(sn - 1.0) < 1e-9, "sävelkorkeus kummankin omasta tahdista");
            o = SykeSekoitus.Osuus(o, true, 5); Oleta.Sama(1.0, o);
            o = SykeSekoitus.Osuus(o, false, 1.5); Oleta.Sama(0.0, o);
            var (rp, _, _, _) = SykeSekoitus.Tasot(70, 0, true);
            Oleta.Tosi(Math.Abs(20 * Math.Log10(rp / 0.55) + 6.02) < 0.01, "puheen aikana −6 dB");
        }
    }
}
