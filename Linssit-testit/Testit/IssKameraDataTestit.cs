// ISS-kameran datamäärä 50 mm:n kaarikuvalle oikealla indeksillä ja otsakkeilla (INDEKSI_JSON + COG_OTSAKKEET=1; verkko):
// nykyinen haku vs. TasoKerroin 2 vs. + Ensisijainen (Päätoimittaja 1.10.: tavoite ~40 Mt).
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Matkakirja.Linssit.IssKamera;

namespace Matkakirja.Linssit.Testit
{
    static class IssKameraDataTestit
    {
        [Testi]
        static void Kaari50mmDatamaara()
        {
            var p = Environment.GetEnvironmentVariable("INDEKSI_JSON");
            if (string.IsNullOrEmpty(p) || Environment.GetEnvironmentVariable("COG_OTSAKKEET") != "1") return;
            var x = S2Indeksi.Jasenna(File.ReadAllText(p));
            foreach (var (nimi, k) in new[] { ("50 mm kaari", IssKameraSuunnitelmaTestit.Kamera(53.96, 26.79, 420, 62.00, 24.25, 37.5, 4096)),
                                              ("400 mm Helsinki", IssKameraSuunnitelmaTestit.Kamera(60.17, 24.94, 420, 60.17, 24.94, 300, 3240)) })
            {
                var n = Kuvasuunnitelma.Naytteet(k);
                double w = n.Min(q => q.LonMin), s = n.Min(q => q.LatMin), e = n.Max(q => q.LonMax), nn = n.Max(q => q.LatMax);
                var ruudut = Kuvasuunnitelma.Ruudut(n, x.Alueella(w, s, e, nn).Select(q => q.Ruutu())).Keys.ToList();
                var otsakkeet = new Dictionary<string, CogOtsake>();
                foreach (var ru in ruudut)
                {
                    var pr = System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo("curl", $"-s -r 0-16383 {ru.Url}") { RedirectStandardOutput = true, UseShellExecute = false });
                    var m = new MemoryStream(); pr.StandardOutput.BaseStream.CopyTo(m); pr.WaitForExit();
                    try { otsakkeet[ru.Tunnus] = CogOtsake.Jasenna(m.ToArray()); } catch { }
                }
                foreach (var (kerroin, ens, mos) in new[] { (1.0, false, false), (1.0, true, false), (1.0, true, true) })
                {
                    var ty = new KuvanTyosto { TasoKerroin = kerroin, Ensisijainen = ens };
                    var tyhja = new byte[256 * 256 * 4]; if (mos) ty.Mosaiikki = (z, xx, yy) => tyhja;
                    foreach (var ru in ruudut) if (otsakkeet.TryGetValue(ru.Tunnus, out var o)) ty.Data.Ruudut.Add((ru, o));
                    ty.Suunnittele(n);
                    long tavut = 0; int lkm = 0; var tasot = new int[5];
                    foreach (var (ru, o) in ty.Data.Ruudut) foreach (var l in ty.HaettavatLaatat(ru, o)) { tavut += o.Tasot[l.taso].Alue(l.tx, l.ty).pituus; lkm++; tasot[l.taso]++; }
                    int ml = mos ? ty.Lehdet().Count(l => KuvanTyosto.MosaiikinLaatta(l.z, l.x, l.y)) : 0;
                    Console.WriteLine($"  {nimi}: kerroin {kerroin}, ensisijainen {ens}, mosaiikki {ml} lehteä (~{ml * 0.025:0.0} Mt): {lkm} laattaa ({string.Join("/", tasot)}), {tavut / 1e6:0.0} Mt + otsakkeet {ruudut.Count * 2 * 16384 / 1e6:0.0} Mt");
                }
            }
        }
    }
}
