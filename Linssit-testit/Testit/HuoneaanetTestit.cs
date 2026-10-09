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
    }
}
