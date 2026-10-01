// ISS-kamera oikealla Karttasepän indeksillä (INDEKSI_JSON=<indeksi.json>): jäsennys ja 400/50 mm -kuvien ruudut.
// Tavuarvio otsakkeista vain lisäksi COG_OTSAKKEET=1 (verkko, curl).
using System;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraIndeksiOikeaTestit
    {
        [Testi]
        static void OikeaIndeksi()
        {
            var p = Environment.GetEnvironmentVariable("INDEKSI_JSON");
            if (string.IsNullOrEmpty(p)) return;
            var kello = System.Diagnostics.Stopwatch.StartNew();
            var x = S2Indeksi.Jasenna(File.ReadAllText(p));
            Console.WriteLine($"  indeksi {x.Versio}: {x.Ruudut.Count} ruutua, lut {(x.Lut != null ? "on" : "EI")}, jäsennys {kello.ElapsedMilliseconds} ms");
            Oleta.Tosi(x.Ruudut.Count > 1000 && x.Lut != null);
            foreach (var (nimi, k) in new[] {
                ("400 mm Helsinki", IssKameraSuunnitelmaTestit.Kamera(60.17, 24.94, 420, 60.17, 24.94, 400, 3240)),
                ("50 mm kaari", IssKameraSuunnitelmaTestit.Kamera(53.96, 26.79, 420, 62.00, 24.25, 37.5, 3240)) })
            {
                var n = Kuvasuunnitelma.Naytteet(k);
                double w = n.Min(q => q.LonMin), s = n.Min(q => q.LatMin), e = n.Max(q => q.LonMax), nn = n.Max(q => q.LatMax);
                var r = Kuvasuunnitelma.Ruudut(n, x.Alueella(w, s, e, nn).Select(q => q.Ruutu()));
                Console.WriteLine($"  {nimi}: {n.Count} solua, {r.Count} S2-ruutua, tarkin {r.Values.DefaultIfEmpty(0).Min():0} m");
                if (Environment.GetEnvironmentVariable("COG_OTSAKKEET") != "1") continue;
                long tavut = 0; int laattoja = 0;
                foreach (var ru in r.Keys)
                {
                    var pr = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r 0-65535 {ru.Url}") { RedirectStandardOutput = true, UseShellExecute = false });
                    var m = new MemoryStream(); pr.StandardOutput.BaseStream.CopyTo(m); pr.WaitForExit();
                    try { var o = CogOtsake.Jasenna(m.ToArray()); var l = Kuvasuunnitelma.Laatat(ru, o, n); laattoja += l.Count; tavut += Kuvasuunnitelma.Tavut(o, l); }
                    catch (Exception ex) { Console.WriteLine($"    {ru.Tunnus}: {ex.Message}"); }
                }
                Console.WriteLine($"    → {laattoja} COG-laattaa, {tavut / 1e6:0.0} Mt");
            }
        }
    }
}
