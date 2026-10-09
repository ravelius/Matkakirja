// Historiaosiot lennoille (Pelikoodari opas/historia-v1, juna 170): luku, vuoro ja ei toistoa.
using System;
using System.Collections.Generic;
using System.IO;
using Matkakirja.Linssit.Kierros;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    static class OpasHistoriaTestit
    {
        [Testi] static void HistoriaosiotLuetaanJaVuorottelevat()
        {
            var json = File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", "historia-pariisi-v1.json"));
            var l = OpasHistoria.Lue(MiniJson.Jasenna(json));
            Oleta.Sama(8, l.Count, "Pariisin 8 osiota");
            Oleta.Tosi(l.TrueForAll(o => o.Sha.Length == 32 && o.KestoS > 20 && o.Lahteet.Count > 0 && !string.IsNullOrEmpty(o.Otsikko)), "sha, kesto, otsikko ja lähteet");
            int laskuri = 0, vuoroja = 0;
            for (int i = 0; i < 10; i++) if (OpasHistoria.Vuoro(ref laskuri, 20)) vuoroja++;
            Oleta.Sama(5, vuoroja, "joka 2. lähtö ilman siltalausetta");
            Oleta.Tosi(!OpasHistoria.Vuoro(ref laskuri, 8), "lyhyt lento: ei osiota");
            var kuultu = new HashSet<string>();
            for (int i = 0; i < l.Count; i++) { var s = OpasHistoria.Seuraava(l, kuultu); Oleta.Tosi(s != null && kuultu.Add(s.Tunnus), $"osio {i + 1} uusi"); }
            Oleta.Tosi(OpasHistoria.Seuraava(l, kuultu) == null, "ei toistoa kaupungissa");
        }
    }
}
